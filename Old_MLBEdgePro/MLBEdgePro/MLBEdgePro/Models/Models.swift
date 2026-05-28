//
//  Models.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import Foundation

// MARK: - API Models (lenient decoding — API may evolve)

nonisolated struct GameSummary: Identifiable, Codable, Hashable {
    let gamePk: Int
    let homeTeam: TeamRef
    let awayTeam: TeamRef
    let gameTime: String?
    let venue: String?
    let venueId: Int?
    let status: String?

    var id: Int { gamePk }

    var matchup: String { "\(awayTeam.abbreviation) @ \(homeTeam.abbreviation)" }
    var matchupFull: String { "\(awayTeam.name) @ \(homeTeam.name)" }
    var displayTime: String { gameTime ?? "TBD" }
}

nonisolated struct TeamRef: Codable, Hashable {
    let id: Int
    let name: String
    let abbreviation: String
}

nonisolated struct PropPrediction: Identifiable, Codable, Hashable {
    let propId: String
    let playerId: Int
    let playerName: String
    let teamAbbreviation: String?
    let propType: String           // "Hits 1+", "HR", "Total Bases 2+", etc.
    let line: Double?
    let modelProbability: Double   // 0..1
    let fanduelImpliedProbability: Double // 0..1
    let fanduelOdds: Int?          // American odds, e.g. -150 or +130

    var id: String { propId }

    /// Positive = model thinks it's more likely than the book implies (value).
    var edge: Double { modelProbability - fanduelImpliedProbability }
    var edgePercent: Double { edge * 100 }
    var modelPercent: Double { modelProbability * 100 }
    var bookPercent: Double { fanduelImpliedProbability * 100 }

    var oddsString: String {
        guard let o = fanduelOdds else { return "—" }
        return o > 0 ? "+\(o)" : "\(o)"
    }
}

// MARK: - Enrichment Models (weather, pitchers, lineups)

struct WeatherInfo: Codable, Hashable {
    let windSpeedMph: Double
    let windDirection: String // e.g., "Out to LF", "In from CF"
    let hrBoost: Double       // -1.0 to +1.0, positive favors HRs
}

struct Pitcher: Codable, Hashable {
    let name: String
    let era: Double?
    let hand: String? // "R" or "L"
}

struct LineupEntry: Codable, Hashable, Identifiable {
    var id: String { name + String(battingOrder) }
    let name: String
    let battingOrder: Int
    let hand: String?
}

struct GameDetails: Codable, Hashable {
    let homePitcher: Pitcher?
    let awayPitcher: Pitcher?
    let homeLineup: [LineupEntry]
    let awayLineup: [LineupEntry]
}

// MARK: - Local Persistence Models (history / verification)

struct VerifiedProp: Identifiable, Codable, Hashable {
    enum Outcome: String, Codable { case correct, incorrect, pending }
    let id: String
    let gamePk: Int
    let playerName: String
    let propType: String
    let line: Double?
    let modelProbability: Double
    let bookProbability: Double
    let date: Date
    var outcome: Outcome
    var actualValue: Double?      // user-entered actual stat (e.g. 2 hits)
    var notes: String?
}

// MARK: - MLB Teams (static seed used for picker, theming, fallback)

nonisolated struct MLBTeam: Identifiable, Hashable {
    let id: Int
    let name: String
    let abbreviation: String
    let city: String
    let primaryHex: String

    var fullName: String { "\(city) \(name)" }
    /// PNG team logo from MLB's midfield CDN (AsyncImage-renderable).
    /// Use APIClient.teamLogoURL(id:size:) directly when you want a specific size.
    var logoURL: URL? { URL(string: "https://midfield.mlbstatic.com/v1/team/\(id)/spots/96") }
}

enum MLBTeams {
    static let all: [MLBTeam] = [
        .init(id: 109, name: "D-backs",   abbreviation: "ARI", city: "Arizona",      primaryHex: "A71930"),
        .init(id: 144, name: "Braves",    abbreviation: "ATL", city: "Atlanta",      primaryHex: "13274F"),
        .init(id: 110, name: "Orioles",   abbreviation: "BAL", city: "Baltimore",    primaryHex: "DF4601"),
        .init(id: 111, name: "Red Sox",   abbreviation: "BOS", city: "Boston",       primaryHex: "BD3039"),
        .init(id: 112, name: "Cubs",      abbreviation: "CHC", city: "Chicago",      primaryHex: "0E3386"),
        .init(id: 145, name: "White Sox", abbreviation: "CWS", city: "Chicago",      primaryHex: "27251F"),
        .init(id: 113, name: "Reds",      abbreviation: "CIN", city: "Cincinnati",   primaryHex: "C6011F"),
        .init(id: 114, name: "Guardians", abbreviation: "CLE", city: "Cleveland",    primaryHex: "00385D"),
        .init(id: 115, name: "Rockies",   abbreviation: "COL", city: "Colorado",     primaryHex: "33006F"),
        .init(id: 116, name: "Tigers",    abbreviation: "DET", city: "Detroit",      primaryHex: "0C2340"),
        .init(id: 117, name: "Astros",    abbreviation: "HOU", city: "Houston",      primaryHex: "EB6E1F"),
        .init(id: 118, name: "Royals",    abbreviation: "KC",  city: "Kansas City",  primaryHex: "004687"),
        .init(id: 108, name: "Angels",    abbreviation: "LAA", city: "Los Angeles",  primaryHex: "BA0021"),
        .init(id: 119, name: "Dodgers",   abbreviation: "LAD", city: "Los Angeles",  primaryHex: "005A9C"),
        .init(id: 146, name: "Marlins",   abbreviation: "MIA", city: "Miami",        primaryHex: "00A3E0"),
        .init(id: 158, name: "Brewers",   abbreviation: "MIL", city: "Milwaukee",    primaryHex: "12284B"),
        .init(id: 142, name: "Twins",     abbreviation: "MIN", city: "Minnesota",    primaryHex: "002B5C"),
        .init(id: 121, name: "Mets",      abbreviation: "NYM", city: "New York",     primaryHex: "002D72"),
        .init(id: 147, name: "Yankees",   abbreviation: "NYY", city: "New York",     primaryHex: "0C2340"),
        .init(id: 133, name: "Athletics", abbreviation: "ATH", city: "Oakland",      primaryHex: "003831"),
        .init(id: 143, name: "Phillies",  abbreviation: "PHI", city: "Philadelphia", primaryHex: "E81828"),
        .init(id: 134, name: "Pirates",   abbreviation: "PIT", city: "Pittsburgh",   primaryHex: "FDB827"),
        .init(id: 135, name: "Padres",    abbreviation: "SD",  city: "San Diego",    primaryHex: "2F241D"),
        .init(id: 137, name: "Giants",    abbreviation: "SF",  city: "San Francisco",primaryHex: "FD5A1E"),
        .init(id: 136, name: "Mariners",  abbreviation: "SEA", city: "Seattle",      primaryHex: "0C2C56"),
        .init(id: 138, name: "Cardinals", abbreviation: "STL", city: "St. Louis",    primaryHex: "C41E3A"),
        .init(id: 139, name: "Rays",      abbreviation: "TB",  city: "Tampa Bay",    primaryHex: "092C5C"),
        .init(id: 140, name: "Rangers",   abbreviation: "TEX", city: "Texas",        primaryHex: "003278"),
        .init(id: 141, name: "Blue Jays", abbreviation: "TOR", city: "Toronto",      primaryHex: "134A8E"),
        .init(id: 120, name: "Nationals", abbreviation: "WSH", city: "Washington",   primaryHex: "AB0003"),
    ]

    static func by(id: Int) -> MLBTeam? { all.first { $0.id == id } }
    static func by(abbreviation: String) -> MLBTeam? { all.first { $0.abbreviation.caseInsensitiveCompare(abbreviation) == .orderedSame } }
}

// MARK: - Mock seed data (offline fallback so UI is always alive)

enum MockData {
    static let games: [GameSummary] = [
        .init(gamePk: 745001,
              homeTeam: .init(id: 147, name: "Yankees",   abbreviation: "NYY"),
              awayTeam: .init(id: 111, name: "Red Sox",   abbreviation: "BOS"),
              gameTime: "7:05 PM ET", venue: "Yankee Stadium", venueId: nil, status: "Scheduled"),
        .init(gamePk: 745002,
              homeTeam: .init(id: 119, name: "Dodgers",   abbreviation: "LAD"),
              awayTeam: .init(id: 137, name: "Giants",    abbreviation: "SF"),
              gameTime: "10:10 PM ET", venue: "Dodger Stadium", venueId: nil, status: "Scheduled"),
        .init(gamePk: 745003,
              homeTeam: .init(id: 117, name: "Astros",    abbreviation: "HOU"),
              awayTeam: .init(id: 140, name: "Rangers",   abbreviation: "TEX"),
              gameTime: "8:10 PM ET", venue: "Minute Maid Park", venueId: nil, status: "Scheduled"),
        .init(gamePk: 745004,
              homeTeam: .init(id: 143, name: "Phillies",  abbreviation: "PHI"),
              awayTeam: .init(id: 144, name: "Braves",    abbreviation: "ATL"),
              gameTime: "6:40 PM ET", venue: "Citizens Bank Park", venueId: nil, status: "Scheduled"),
        .init(gamePk: 745005,
              homeTeam: .init(id: 135, name: "Padres",    abbreviation: "SD"),
              awayTeam: .init(id: 109, name: "D-backs",   abbreviation: "ARI"),
              gameTime: "9:40 PM ET", venue: "Petco Park", venueId: nil, status: "Scheduled"),
    ]

    static func props(for gamePk: Int) -> [PropPrediction] {
        [
            .init(propId: "\(gamePk)-1", playerId: 592450, playerName: "Aaron Judge",
                  teamAbbreviation: "NYY", propType: "Hits 1+", line: 0.5,
                  modelProbability: 0.78, fanduelImpliedProbability: 0.66, fanduelOdds: -195),
            .init(propId: "\(gamePk)-2", playerId: 660271, playerName: "Shohei Ohtani",
                  teamAbbreviation: "LAD", propType: "Total Bases 2+", line: 1.5,
                  modelProbability: 0.61, fanduelImpliedProbability: 0.48, fanduelOdds: +110),
            .init(propId: "\(gamePk)-3", playerId: 605141, playerName: "Mookie Betts",
                  teamAbbreviation: "LAD", propType: "Home Run", line: 0.5,
                  modelProbability: 0.21, fanduelImpliedProbability: 0.16, fanduelOdds: +520),
            .init(propId: "\(gamePk)-4", playerId: 665742, playerName: "Juan Soto",
                  teamAbbreviation: "NYY", propType: "Hits 2+", line: 1.5,
                  modelProbability: 0.42, fanduelImpliedProbability: 0.38, fanduelOdds: +160),
            .init(propId: "\(gamePk)-5", playerId: 545361, playerName: "Mike Trout",
                  teamAbbreviation: "LAA", propType: "Total Bases 1+", line: 0.5,
                  modelProbability: 0.71, fanduelImpliedProbability: 0.74, fanduelOdds: -285),
        ]
    }

    static func weather(for gamePk: Int) -> WeatherInfo? {
        // Simple deterministic mock based on gamePk parity
        let windy = (gamePk % 2 == 0)
        return WeatherInfo(windSpeedMph: windy ? 14 : 6,
                           windDirection: windy ? "Out to CF" : "Left to Right",
                           hrBoost: windy ? 0.08 : -0.02)
    }

    static func details(for gamePk: Int) -> GameDetails? {
        // Lightweight, generic mock data
        let homePitch = Pitcher(name: "Home SP", era: 3.42, hand: "R")
        let awayPitch = Pitcher(name: "Away SP", era: 4.18, hand: "L")
        let home = (1...9).map { i in LineupEntry(name: "Home Hitter \(i)", battingOrder: i, hand: i % 2 == 0 ? "R" : "L") }
        let away = (1...9).map { i in LineupEntry(name: "Away Hitter \(i)", battingOrder: i, hand: i % 2 == 0 ? "L" : "R") }
        return GameDetails(homePitcher: homePitch, awayPitcher: awayPitch, homeLineup: home, awayLineup: away)
    }
}
