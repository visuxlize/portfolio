//
//  APIClient.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import Foundation

@Observable
final class APIClient {
    static let shared = APIClient()

    let baseURL = "https://mlb-edge-api.onrender.com"
    private let openWeatherKey = "b98275660961570bcbb8240f696d056f"
    nonisolated(unsafe) private let decoder: JSONDecoder = {
        let d = JSONDecoder()
        d.keyDecodingStrategy = .convertFromSnakeCase
        return d
    }()

    func fetchTodayGames() async -> [GameSummary] {
        // Format today's date as YYYY-MM-DD in the user's current calendar
        let df = DateFormatter()
        df.calendar = .current
        df.dateFormat = "yyyy-MM-dd"
        let dateStr = df.string(from: Date())
        guard let url = URL(string: "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=\(dateStr)") else { return MockData.games }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            struct Schedule: Decodable {
                struct DateItem: Decodable { let games: [GameItem] }
                struct GameItem: Decodable {
                    let gamePk: Int
                    let gameDate: String?
                    let status: Status
                    let teams: Teams
                    let venue: Venue?
                    struct Status: Decodable { let abstractGameState: String? }
                    struct Teams: Decodable {
                        let home: Side
                        let away: Side
                        struct Side: Decodable { let team: Team }
                        struct Team: Decodable { let id: Int; let name: String; let abbreviation: String? }
                    }
                    struct Venue: Decodable { let id: Int?; let name: String? }
                }
                let dates: [DateItem]
            }
            let schedule = try decoder.decode(Schedule.self, from: data)
            let games = schedule.dates.flatMap { $0.games }.map { g -> GameSummary in
                let homeAbbr = g.teams.home.team.abbreviation ?? abbreviate(name: g.teams.home.team.name)
                let awayAbbr = g.teams.away.team.abbreviation ?? abbreviate(name: g.teams.away.team.name)
                return GameSummary(
                    gamePk: g.gamePk,
                    homeTeam: TeamRef(id: g.teams.home.team.id, name: g.teams.home.team.name, abbreviation: homeAbbr),
                    awayTeam: TeamRef(id: g.teams.away.team.id, name: g.teams.away.team.name, abbreviation: awayAbbr),
                    gameTime: timeString(from: g.gameDate),
                    venue: g.venue?.name,
                    venueId: g.venue?.id,
                    status: g.status.abstractGameState
                )
            }
            return games.isEmpty ? MockData.games : games
        } catch {
            return MockData.games
        }
    }
    private func timeString(from iso: String?) -> String? {
        guard let iso, let date = ISO8601DateFormatter().date(from: iso) else { return nil }
        let f = DateFormatter()
        f.timeStyle = .short
        f.timeZone = .current
        return f.string(from: date)
    }
    private func abbreviate(name: String) -> String { String(name.prefix(3)).uppercased() }

    func fetchProps(gamePk: Int) async -> [PropPrediction] {
        guard let url = URL(string: "\(baseURL)/props/\(gamePk)") else { return MockData.props(for: gamePk) }
        do {
            var req = URLRequest(url: url)
            req.timeoutInterval = 8
            let (data, _) = try await URLSession.shared.data(for: req)
            let props = try decoder.decode([PropPrediction].self, from: data)
            return props.isEmpty ? MockData.props(for: gamePk) : props
        } catch {
            return MockData.props(for: gamePk)
        }
    }
    
    func fetchWeather(gamePk: Int) async -> WeatherInfo? {
        guard let url = URL(string: "\(baseURL)/games/\(gamePk)/weather") else { return MockData.weather(for: gamePk) }
        do {
            var req = URLRequest(url: url)
            req.timeoutInterval = 8
            let (data, _) = try await URLSession.shared.data(for: req)
            let w = try decoder.decode(WeatherInfo.self, from: data)
            return w
        } catch {
            return MockData.weather(for: gamePk)
        }
    }

    func fetchWeather(venueId: Int) async -> WeatherInfo? {
        // Fetch venue to get coordinates
        guard let venueURL = URL(string: "https://statsapi.mlb.com/api/v1/venues/\(venueId)") else { return nil }
        do {
            let (vdata, _) = try await URLSession.shared.data(from: venueURL)
            struct VenueResp: Decodable { struct Venue: Decodable { let location: Location? }; let venues: [Venue]
                struct Location: Decodable { let latitude: Double?; let longitude: Double? }
            }
            let vr = try decoder.decode(VenueResp.self, from: vdata)
            guard let loc = vr.venues.first?.location, let lat = loc.latitude, let lon = loc.longitude else { return nil }
            // OpenWeatherMap current conditions
            guard let wurl = URL(string: "https://api.openweathermap.org/data/2.5/weather?lat=\(lat)&lon=\(lon)&appid=\(openWeatherKey)&units=imperial") else { return nil }
            let (wdata, _) = try await URLSession.shared.data(from: wurl)
            struct OW: Decodable { struct Wind: Decodable { let speed: Double?; let deg: Double? }; let wind: Wind? }
            let ow = try JSONDecoder().decode(OW.self, from: wdata)
            let speed = ow.wind?.speed ?? 0
            let deg = ow.wind?.deg ?? 0
            let dir = windDirection(from: deg)
            // Heuristic HR boost from wind speed only; can be refined with park vectors
            let boost = computeHRBoost(venueId: venueId, windDeg: deg, windSpeedMph: speed)
            return WeatherInfo(windSpeedMph: speed, windDirection: dir, hrBoost: boost)
        } catch {
            return nil
        }
    }

    private func windDirection(from deg: Double) -> String {
        // Basic 16-wind compass
        let dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
        let idx = Int((deg + 11.25) / 22.5) & 15
        return dirs[idx]
    }

    // MARK: - Park wind/HR model
    // Bearing is the out-to-center-field azimuth (degrees) used to project tail/head wind components.
    // Factors >1 boost HR likelihood; <1 suppress.
    private let cfBearingByVenueId: [Int: Double] = [
        // Example seeds; defaults will apply when missing
        3313: 0,      // Yankee Stadium (approx CF due north)
        22:  25,      // Fenway Park (approx)
        10:  0,       // Dodger Stadium (approx)
        2395: 0,      // Minute Maid Park (approx)
        2680: 10      // Citizens Bank Park (approx)
    ]
    private let hrParkFactorByVenueId: [Int: Double] = [
        3313: 1.06,   // Yankee Stadium HR friendly
        22:   1.02,   // Fenway
        10:   0.98,   // Dodger Stadium slightly suppressing
        2395: 1.01,
        2680: 1.03
    ]

    private func computeHRBoost(venueId: Int, windDeg: Double, windSpeedMph: Double) -> Double {
        let cfBearing = cfBearingByVenueId[venueId] ?? 0 // default CF due north
        // Angle difference between wind direction (from) and CF bearing (to). Tailwind when aligned.
        let diff = abs(((windDeg - cfBearing) + 540).truncatingRemainder(dividingBy: 360) - 180)
        // Projected tail/head component: +1 tailwind, -1 headwind
        let component = cos(diff * .pi / 180)
        // Normalize wind effect: beyond ~20 mph we cap influence
        let speedScale = min(1.0, max(0.0, (windSpeedMph - 5.0) / 15.0))
        let base = component * speedScale // -1...+1 scaled
        let park = hrParkFactorByVenueId[venueId] ?? 1.0
        // Convert to % boost in a bounded range; park factor scales effect
        let boost = base * 0.12 * park // up to ~±12%
        // Clamp to sensible bounds
        return max(-0.15, min(0.18, boost))
    }

    func fetchGameDetails(gamePk: Int) async -> GameDetails? {
        guard let url = URL(string: "https://statsapi.mlb.com/api/v1/game/\(gamePk)/feed/live") else { return MockData.details(for: gamePk) }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            struct Feed: Decodable {
                struct GameData: Decodable {
                    struct Prob: Decodable { let away: Person?; let home: Person? }
                    let probablePitchers: Prob?
                    struct Person: Decodable { let id: Int?; let fullName: String? }
                }
                struct Live: Decodable {
                    struct Box: Decodable {
                        struct TeamBox: Decodable { let players: [String: Player] }
                        struct Player: Decodable {
                            let person: Person; let battingOrder: String?; let stats: Stats?
                            struct Person: Decodable {
                                let fullName: String?; let primaryPosition: Position?
                                let primaryNumber: String?; let id: Int?; let batSide: Handed?
                            }
                            struct Handed: Decodable { let code: String? }
                            struct Position: Decodable { let abbreviation: String? }
                        }
                        struct Stats: Decodable { let pitching: Pitching? }
                        struct Pitching: Decodable { let era: String? }
                        let teams: Teams
                        struct Teams: Decodable { let home: TeamBox; let away: TeamBox }
                    }
                    let boxscore: Box
                }
                let gameData: GameData
                let liveData: Live
            }
            let feed = try JSONDecoder().decode(Feed.self, from: data)

            // Probable pitchers — id and name
            let awaySPName = feed.gameData.probablePitchers?.away?.fullName
            let homeSPName = feed.gameData.probablePitchers?.home?.fullName
            let awaySPId   = feed.gameData.probablePitchers?.away?.id
            let homeSPId   = feed.gameData.probablePitchers?.home?.id

            // Hydrate pitcher details (ERA + throwing hand) via the people endpoint.
            // We do this in parallel so the request is fast even on slow networks.
            async let awayPitcher = pitcherInfo(id: awaySPId, fallbackName: awaySPName)
            async let homePitcher = pitcherInfo(id: homeSPId, fallbackName: homeSPName)

            // Lineups: take battingOrder 1..9 from players
            func lineup(from box: Feed.Live.Box.TeamBox) -> [LineupEntry] {
                var entries: [(Int, String, String?)] = []
                for p in box.players.values {
                    if let bo = p.battingOrder, let order = Int(bo.prefix(1)), order >= 1 && order <= 9 {
                        let name = p.person.fullName ?? "Player"
                        let hand = p.person.batSide?.code
                        entries.append((order, name, hand))
                    }
                }
                return entries.sorted { $0.0 < $1.0 }.map { LineupEntry(name: $0.1, battingOrder: $0.0, hand: $0.2) }
            }
            let away = lineup(from: feed.liveData.boxscore.teams.away)
            let home = lineup(from: feed.liveData.boxscore.teams.home)
            let details = GameDetails(
                homePitcher: await homePitcher,
                awayPitcher: await awayPitcher,
                homeLineup: home,
                awayLineup: away
            )
            return details
        } catch {
            return MockData.details(for: gamePk)
        }
    }

    /// Hydrate a probable pitcher with season ERA and throwing hand using the
    /// /api/v1/people/{id} endpoint with the season pitching stats group hydrate.
    /// Returns a sensible placeholder if id is nil or the call fails so the UI
    /// always shows *something*.
    private func pitcherInfo(id: Int?, fallbackName: String?) async -> Pitcher? {
        guard let id else {
            guard let name = fallbackName else { return nil }
            return Pitcher(name: name, era: nil, hand: nil)
        }
        let urlStr = "https://statsapi.mlb.com/api/v1/people/\(id)?hydrate=stats(group=[pitching],type=[season])"
        guard let url = URL(string: urlStr) else {
            return Pitcher(name: fallbackName ?? "TBD", era: nil, hand: nil)
        }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            struct PeopleResp: Decodable {
                struct Person: Decodable {
                    let fullName: String?
                    let pitchHand: Hand?
                    let stats: [StatGroup]?
                    struct Hand: Decodable { let code: String? }
                    struct StatGroup: Decodable {
                        let splits: [Split]?
                        struct Split: Decodable {
                            let stat: Stat?
                            struct Stat: Decodable { let era: String? }
                        }
                    }
                }
                let people: [Person]
            }
            let resp = try JSONDecoder().decode(PeopleResp.self, from: data)
            let person = resp.people.first
            let eraStr = person?.stats?.first?.splits?.first?.stat?.era
            let era = eraStr.flatMap { Double($0) }
            return Pitcher(
                name: person?.fullName ?? fallbackName ?? "TBD",
                era: era,
                hand: person?.pitchHand?.code
            )
        } catch {
            return Pitcher(name: fallbackName ?? "TBD", era: nil, hand: nil)
        }
    }

    // MARK: - MLB CDN helpers
    //
    // Why this layout:
    // - SwiftUI's AsyncImage cannot render SVG, so we MUST request PNG endpoints.
    // - MLB's "midfield" CDN serves PNG sprites for both teams and players at a
    //   chosen pixel size, which is exactly what AsyncImage wants.
    // - We expose primary + fallback URL helpers so the view layer can try one,
    //   and fall back if the primary 404s.

    /// Primary team logo (PNG, transparent background). Renders at the requested
    /// pixel size on MLB's midfield CDN. Pass the MLB team id (e.g. 147 = Yankees).
    static func teamLogoURL(id: Int, size: Int = 96) -> URL? {
        URL(string: "https://midfield.mlbstatic.com/v1/team/\(id)/spots/\(size)")
    }

    /// Fallback: ESPN serves a 500x500 PNG keyed by lowercase team abbreviation
    /// (e.g. "nyy", "bos"). Useful if midfield is ever down or for an alt look.
    static func teamLogoFallbackURL(abbreviation: String) -> URL? {
        let abbr = abbreviation.lowercased()
        // ESPN uses "chw" for White Sox, not "cws", and "wsh" for Nationals.
        let normalized: String = {
            switch abbr {
            case "cws": return "chw"
            case "ath": return "oak" // ESPN still uses "oak" for the Athletics
            default: return abbr
            }
        }()
        return URL(string: "https://a.espncdn.com/i/teamlogos/mlb/500/\(normalized).png")
    }

    /// Player headshot. MLB's midfield CDN serves a clean PNG cutout of the
    /// player's current team headshot at any size. `id` is the MLB person id
    /// (e.g. 592450 = Aaron Judge).
    static func playerHeadshotURL(id: Int, size: Int = 240) -> URL? {
        URL(string: "https://midfield.mlbstatic.com/v1/people/\(id)/spots/\(size)")
    }

    /// Fallback headshot served by the older content.mlb.com host.
    static func playerHeadshotFallbackURL(id: Int) -> URL? {
        URL(string: "https://content.mlb.com/images/headshots/current/60x60/\(id).png")
    }

    /// Ballpark backdrop photo. There is no free MLB API for stadium photography,
    /// so we maintain a curated map of MLB venueId → Wikimedia Commons photo URL.
    /// Wikimedia URLs are stable (file names persist) and CC-licensed for reuse
    /// with attribution. If the venue isn't in the map we return nil and the
    /// view falls back to a team-colored gradient.
    static func venueBackdropURL(venueId: Int?) -> URL? {
        guard let vid = venueId, let url = ballparkPhotoByVenueId[vid] else { return nil }
        return URL(string: url)
    }

    /// Older name-based lookup, kept so existing views compile during migration.
    /// Prefer the venueId variant — name matching is brittle (e.g. sponsorship
    /// renames). This tries a fuzzy match against the venue name table.
    static func venueBackdropURL(venueName: String?) -> URL? {
        guard let name = venueName?.lowercased(), !name.isEmpty else { return nil }
        if let hit = ballparkPhotoByName.first(where: { name.contains($0.key) }) {
            return URL(string: hit.value)
        }
        return nil
    }

    // MARK: - Ballpark photo data
    //
    // All URLs point to Wikimedia Commons "thumb" endpoints rendered at 1200px wide,
    // which is plenty of resolution for a 160pt header but small enough to load
    // fast on cellular. To swap an image, find the file page on commons.wikimedia.org,
    // copy the filename, and update the URL keeping the /thumb/.../.../1200px- shape.

    private static let ballparkPhotoByVenueId: [Int: String] = [
        // AL East
        3313: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Yankee_Stadium_inside_view_2024.jpg/1200px-Yankee_Stadium_inside_view_2024.jpg",      // Yankee Stadium
        2:    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Fenway_Park_2013.jpg/1200px-Fenway_Park_2013.jpg",                                   // Fenway Park
        14:   "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Oriole_Park_at_Camden_Yards_from_the_upper_deck.jpg/1200px-Oriole_Park_at_Camden_Yards_from_the_upper_deck.jpg", // Camden Yards
        12:   "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Tropicana_Field_2007.jpg/1200px-Tropicana_Field_2007.jpg",                          // Tropicana Field
        14422:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Rogers_Centre_roof_open%2C_June_2018.jpg/1200px-Rogers_Centre_roof_open%2C_June_2018.jpg", // Rogers Centre

        // AL Central
        4:    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Guaranteed_Rate_Field_2019.jpg/1200px-Guaranteed_Rate_Field_2019.jpg",              // Guaranteed Rate / Rate Field
        5:    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Progressive_Field_2016.jpg/1200px-Progressive_Field_2016.jpg",                      // Progressive Field
        2394: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Comerica_Park_Detroit.jpg/1200px-Comerica_Park_Detroit.jpg",                        // Comerica Park
        7:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Kauffman_Stadium_2017.jpg/1200px-Kauffman_Stadium_2017.jpg",                        // Kauffman Stadium
        3312: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Target_Field_2014.jpg/1200px-Target_Field_2014.jpg",                                // Target Field

        // AL West
        2395: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Minute_Maid_Park_2014.jpg/1200px-Minute_Maid_Park_2014.jpg",                        // Minute Maid Park
        1:    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Angel_Stadium_2018.jpg/1200px-Angel_Stadium_2018.jpg",                              // Angel Stadium
        10:   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Oakland_Coliseum_2018.jpg/1200px-Oakland_Coliseum_2018.jpg",                        // Oakland Coliseum (Athletics)
        680:  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/T-Mobile_Park_2019.jpg/1200px-T-Mobile_Park_2019.jpg",                              // T-Mobile Park
        5325: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Globe_Life_Field_in_April_2020.jpg/1200px-Globe_Life_Field_in_April_2020.jpg",      // Globe Life Field

        // NL East
        4705: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Truist_Park_2017.jpg/1200px-Truist_Park_2017.jpg",                                  // Truist Park
        4169: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/LoanDepot_Park_2022.jpg/1200px-LoanDepot_Park_2022.jpg",                            // loanDepot park
        3289: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Citi_Field_2009.jpg/1200px-Citi_Field_2009.jpg",                                    // Citi Field
        2681: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Citizens_Bank_Park_2011.jpg/1200px-Citizens_Bank_Park_2011.jpg",                    // Citizens Bank Park
        3309: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Nationals_Park_2018.jpg/1200px-Nationals_Park_2018.jpg",                            // Nationals Park

        // NL Central
        17:   "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Wrigley_Field_2019.jpg/1200px-Wrigley_Field_2019.jpg",                              // Wrigley Field
        2602: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Great_American_Ball_Park_2019.jpg/1200px-Great_American_Ball_Park_2019.jpg",        // Great American Ball Park
        32:   "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/American_Family_Field_exterior_2021.jpg/1200px-American_Family_Field_exterior_2021.jpg", // American Family Field
        31:   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PNC_Park_2018.jpg/1200px-PNC_Park_2018.jpg",                                        // PNC Park
        2889: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Busch_Stadium_2018.jpg/1200px-Busch_Stadium_2018.jpg",                              // Busch Stadium

        // NL West
        15:   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chase_Field_2018.jpg/1200px-Chase_Field_2018.jpg",                                  // Chase Field
        19:   "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Coors_Field_2019.jpg/1200px-Coors_Field_2019.jpg",                                  // Coors Field
        22:   "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Dodger_Stadium_field_from_upper_deck_2015-10-04.jpg/1200px-Dodger_Stadium_field_from_upper_deck_2015-10-04.jpg", // Dodger Stadium
        2680: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Petco_Park_2016.jpg/1200px-Petco_Park_2016.jpg",                                    // Petco Park
        2395208: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Oracle_Park_2019.jpg/1200px-Oracle_Park_2019.jpg",                               // Oracle Park (placeholder id; see name map)
        2395207: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Oracle_Park_2019.jpg/1200px-Oracle_Park_2019.jpg",
    ]

    /// Name-based fallback. Keys are lowercase substrings searched against the
    /// venue name returned by /api/v1/schedule. This catches venueIds we haven't
    /// confirmed yet (Oracle Park, sponsorship renames, etc.).
    private static let ballparkPhotoByName: [String: String] = [
        "yankee":       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Yankee_Stadium_inside_view_2024.jpg/1200px-Yankee_Stadium_inside_view_2024.jpg",
        "fenway":       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Fenway_Park_2013.jpg/1200px-Fenway_Park_2013.jpg",
        "camden":       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Oriole_Park_at_Camden_Yards_from_the_upper_deck.jpg/1200px-Oriole_Park_at_Camden_Yards_from_the_upper_deck.jpg",
        "tropicana":    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Tropicana_Field_2007.jpg/1200px-Tropicana_Field_2007.jpg",
        "rogers centre":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Rogers_Centre_roof_open%2C_June_2018.jpg/1200px-Rogers_Centre_roof_open%2C_June_2018.jpg",
        "guaranteed":   "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Guaranteed_Rate_Field_2019.jpg/1200px-Guaranteed_Rate_Field_2019.jpg",
        "rate field":   "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Guaranteed_Rate_Field_2019.jpg/1200px-Guaranteed_Rate_Field_2019.jpg",
        "progressive":  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Progressive_Field_2016.jpg/1200px-Progressive_Field_2016.jpg",
        "comerica":     "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Comerica_Park_Detroit.jpg/1200px-Comerica_Park_Detroit.jpg",
        "kauffman":     "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Kauffman_Stadium_2017.jpg/1200px-Kauffman_Stadium_2017.jpg",
        "target field": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Target_Field_2014.jpg/1200px-Target_Field_2014.jpg",
        "minute maid":  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Minute_Maid_Park_2014.jpg/1200px-Minute_Maid_Park_2014.jpg",
        "angel stadium":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Angel_Stadium_2018.jpg/1200px-Angel_Stadium_2018.jpg",
        "coliseum":     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Oakland_Coliseum_2018.jpg/1200px-Oakland_Coliseum_2018.jpg",
        "t-mobile":     "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/T-Mobile_Park_2019.jpg/1200px-T-Mobile_Park_2019.jpg",
        "globe life":   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Globe_Life_Field_in_April_2020.jpg/1200px-Globe_Life_Field_in_April_2020.jpg",
        "truist":       "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Truist_Park_2017.jpg/1200px-Truist_Park_2017.jpg",
        "loandepot":    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/LoanDepot_Park_2022.jpg/1200px-LoanDepot_Park_2022.jpg",
        "citi field":   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Citi_Field_2009.jpg/1200px-Citi_Field_2009.jpg",
        "citizens bank":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Citizens_Bank_Park_2011.jpg/1200px-Citizens_Bank_Park_2011.jpg",
        "nationals park":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Nationals_Park_2018.jpg/1200px-Nationals_Park_2018.jpg",
        "wrigley":      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Wrigley_Field_2019.jpg/1200px-Wrigley_Field_2019.jpg",
        "great american":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Great_American_Ball_Park_2019.jpg/1200px-Great_American_Ball_Park_2019.jpg",
        "american family":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/American_Family_Field_exterior_2021.jpg/1200px-American_Family_Field_exterior_2021.jpg",
        "pnc park":     "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PNC_Park_2018.jpg/1200px-PNC_Park_2018.jpg",
        "busch":        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Busch_Stadium_2018.jpg/1200px-Busch_Stadium_2018.jpg",
        "chase field":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chase_Field_2018.jpg/1200px-Chase_Field_2018.jpg",
        "coors":        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Coors_Field_2019.jpg/1200px-Coors_Field_2019.jpg",
        "dodger":       "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Dodger_Stadium_field_from_upper_deck_2015-10-04.jpg/1200px-Dodger_Stadium_field_from_upper_deck_2015-10-04.jpg",
        "petco":        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Petco_Park_2016.jpg/1200px-Petco_Park_2016.jpg",
        "oracle":       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Oracle_Park_2019.jpg/1200px-Oracle_Park_2019.jpg",
    ]
}

