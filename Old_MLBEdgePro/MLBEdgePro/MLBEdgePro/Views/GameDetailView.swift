//
//  GameDetailView.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import SwiftUI

struct GameDetailView: View {
    let game: GameSummary
    @State var props: [PropPrediction]

    @Environment(APIClient.self) private var api
    @Environment(AppState.self) private var app
    @State private var isLoading: Bool = false
    @State private var filter: Filter = .topEdge
    @State private var verifyingProp: PropPrediction?
    @State private var weather: WeatherInfo?

    enum Filter: String, CaseIterable, Identifiable {
        case topEdge = "Top Edge"
        case hits = "Hits"
        case hr = "Home Runs"
        case bases = "Bases"
        case all = "All"
        var id: String { rawValue }
    }

    private var homeTeam: MLBTeam? { MLBTeams.by(id: game.homeTeam.id) }
    private var awayTeam: MLBTeam? { MLBTeams.by(id: game.awayTeam.id) }

    private var filtered: [PropPrediction] {
        switch filter {
        case .topEdge: return props.sorted { $0.edge > $1.edge }
        case .hits:    return props.filter { $0.propType.localizedCaseInsensitiveContains("hit") }
        case .hr:      return props.filter { $0.propType.localizedCaseInsensitiveContains("home run") || $0.propType.localizedCaseInsensitiveContains("hr") }
        case .bases:   return props.filter { $0.propType.localizedCaseInsensitiveContains("base") }
        case .all:     return props
        }
    }

    var body: some View {
        ZStack {
            AppBackground()

            ScrollView {
                VStack(spacing: 20) {
                    headerCard

                    HStack(spacing: 8) {
                        ForEach(Filter.allCases) { f in
                            Button {
                                Haptics.selection()
                                withAnimation(.spring(response: 0.3, dampingFraction: 0.8)) { filter = f }
                            } label: {
                                Text(f.rawValue).chip(isSelected: filter == f)
                            }
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 18)

                    AnalysisCard(game: game, props: props)
                        .padding(.horizontal, 18)

                    if isLoading && props.isEmpty {
                        ProgressView()
                            .tint(.amberAccent)
                            .padding(.top, 40)
                    } else if filtered.isEmpty {
                        VStack(spacing: 8) {
                            Image(systemName: "magnifyingglass")
                                .font(.title)
                                .foregroundStyle(Color.textTertiary)
                            Text("No props match this filter.")
                                .font(.subheadline)
                                .foregroundStyle(Color.textSecondary)
                        }
                        .padding(.vertical, 40)
                    } else {
                        VStack(spacing: 12) {
                            ForEach(filtered) { prop in
                                PropDetailRow(prop: prop) {
                                    Haptics.medium()
                                    verifyingProp = prop
                                }
                            }
                        }
                        .padding(.horizontal, 18)
                    }

                    Spacer(minLength: 40)
                }
                .padding(.top, 8)
            }
            .scrollIndicators(.hidden)
        }
        .navigationTitle(game.matchup)
        .navigationBarTitleDisplayMode(.inline)
        .task {
            if props.isEmpty {
                isLoading = true
                let r = await api.fetchProps(gamePk: game.gamePk)
                await MainActor.run {
                    self.props = r
                    self.isLoading = false
                }
            }

            // Fetch weather preferring venueId if available
            let w: WeatherInfo?
            if let vid = game.venueId {
                w = await api.fetchWeather(venueId: vid)
            } else {
                w = await api.fetchWeather(gamePk: game.gamePk)
            }
            await MainActor.run { self.weather = w }
        }
        .sheet(item: $verifyingProp) { prop in
            VerifyPropSheet(prop: prop, gamePk: game.gamePk)
                .presentationDetents([.medium, .large])
                .presentationDragIndicator(.visible)
        }
    }

    @ViewBuilder
    private var headerCard: some View {
        ZStack {
            // Ballpark backdrop — prefer venueId lookup (stable) and fall back
            // to a fuzzy name match if the schedule didn't include a venueId.
            // If neither resolves, we render the team-colored gradient below.
            let backdrop = APIClient.venueBackdropURL(venueId: game.venueId)
                ?? APIClient.venueBackdropURL(venueName: game.venue)
            if let url = backdrop {
                AsyncImage(url: url) { phase in
                    switch phase {
                    case .success(let img):
                        img.resizable().scaledToFill()
                            .overlay(Color.black.opacity(0.35)) // darken so text stays legible
                    default:
                        LinearGradient(
                            colors: [
                                Color(hex: awayTeam?.primaryHex ?? "2D140B").opacity(0.45),
                                Color.bgAccent.opacity(0.8),
                                Color(hex: homeTeam?.primaryHex ?? "2D140B").opacity(0.45)
                            ],
                            startPoint: .leading, endPoint: .trailing
                        )
                    }
                }
                .frame(height: 160)
                .clipped()
            } else {
                // No backdrop available — render gradient at the same height
                // so the header doesn't collapse and the layout stays consistent.
                LinearGradient(
                    colors: [
                        Color(hex: awayTeam?.primaryHex ?? "2D140B").opacity(0.45),
                        Color.bgAccent.opacity(0.8),
                        Color(hex: homeTeam?.primaryHex ?? "2D140B").opacity(0.45)
                    ],
                    startPoint: .leading, endPoint: .trailing
                )
                .frame(height: 160)
            }

            VStack(spacing: 14) {
                HStack(spacing: 22) {
                    teamBlock(team: awayTeam, abbr: game.awayTeam.abbreviation, name: game.awayTeam.name)
                    VStack(spacing: 4) {
                        Text("@")
                            .font(.system(size: 18, weight: .black, design: .rounded))
                            .foregroundStyle(Color.amberAccent)
                        Text(game.displayTime)
                            .font(.system(size: 12, weight: .semibold, design: .rounded))
                            .foregroundStyle(Color.white)
                    }
                    teamBlock(team: homeTeam, abbr: game.homeTeam.abbreviation, name: game.homeTeam.name)
                }
                if let v = game.venue {
                    HStack(spacing: 6) {
                        Image(systemName: "mappin.and.ellipse").font(.caption2)
                        Text(v).font(.caption)
                    }
                    .foregroundStyle(Color.white.opacity(0.85))
                    .padding(.top, 2)
                }
            }
            .padding(.vertical, 18)
            .frame(maxWidth: .infinity)
            .background(Color.black.opacity(0.35))
        }
        .glassCard(cornerRadius: 22)
        .padding(.horizontal, 18)
    }

    @ViewBuilder
    private func teamBlock(team: MLBTeam?, abbr: String, name: String) -> some View {
        VStack(spacing: 8) {
            ZStack {
                Circle().fill(Color(hex: team?.primaryHex ?? "1A1A1A")).frame(width: 60, height: 60)
                    .overlay(Circle().stroke(Color.white.opacity(0.18), lineWidth: 1))
                if let id = team?.id, let url = APIClient.teamLogoURL(id: id) {
                    AsyncImage(url: url) { phase in
                        switch phase {
                        case .success(let img): img.resizable().scaledToFit().frame(width: 40, height: 40)
                        default:
                            Text(abbr)
                                .font(.system(size: 16, weight: .black, design: .rounded))
                                .foregroundStyle(.white)
                        }
                    }
                } else {
                    Text(abbr)
                        .font(.system(size: 16, weight: .black, design: .rounded))
                        .foregroundStyle(.white)
                }
            }
            Text(name)
                .font(.system(size: 13, weight: .bold, design: .rounded))
                .foregroundStyle(.white)
        }
    }
}

struct PropDetailRow: View {
    let prop: PropPrediction
    let onVerify: () -> Void

    var body: some View {
        VStack(spacing: 12) {
            HStack(spacing: 12) {
                EdgeBadge(value: prop.edgePercent)
                VStack(alignment: .leading, spacing: 2) {
                    Text(prop.playerName)
                        .font(.system(size: 16, weight: .bold, design: .rounded))
                        .foregroundStyle(.white)
                    HStack(spacing: 6) {
                        if let a = prop.teamAbbreviation {
                            Text(a).font(.caption2.bold()).foregroundStyle(Color.amberAccent)
                        }
                        Text(prop.propType)
                            .font(.caption)
                            .foregroundStyle(Color.textSecondary)
                    }
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text(prop.oddsString)
                        .font(.system(size: 15, weight: .black, design: .rounded))
                        .foregroundStyle(.white)
                    Text("FanDuel")
                        .font(.caption2)
                        .foregroundStyle(Color.textTertiary)
                }
            }

            // Probability bars
            VStack(spacing: 8) {
                ProbBar(label: "Model", value: prop.modelProbability, color: .amberAccent)
                ProbBar(label: "Book", value: prop.fanduelImpliedProbability, color: .white.opacity(0.5))
            }

            Button(action: onVerify) {
                HStack(spacing: 8) {
                    Image(systemName: "checkmark.seal.fill")
                    Text("Verify Result")
                }
                .font(.system(size: 13, weight: .bold, design: .rounded))
                .foregroundStyle(Color.amberAccent)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 10)
                .background(Color.amberAccent.opacity(0.12))
                .clipShape(.rect(cornerRadius: 10))
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(Color.amberAccent.opacity(0.35), lineWidth: 1)
                )
            }
            .buttonStyle(.plain)
        }
        .padding(14)
        .glassCard()
    }
}

struct ProbBar: View {
    let label: String
    let value: Double
    let color: Color

    var body: some View {
        HStack(spacing: 10) {
            Text(label)
                .font(.system(size: 11, weight: .bold, design: .rounded))
                .foregroundStyle(Color.textSecondary)
                .frame(width: 44, alignment: .leading)
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(Color.white.opacity(0.08))
                    Capsule().fill(color)
                        .frame(width: max(6, geo.size.width * value))
                }
            }
            .frame(height: 6)
            Text("\(Int(value * 100))%")
                .font(.system(size: 11, weight: .black, design: .rounded))
                .foregroundStyle(.white)
                .frame(width: 36, alignment: .trailing)
        }
    }
}

struct AnalysisCard: View {
    let game: GameSummary
    let props: [PropPrediction]

    private var homeAbbr: String { game.homeTeam.abbreviation }
    private var awayAbbr: String { game.awayTeam.abbreviation }

    private var hrProps: [PropPrediction] {
        props.filter { $0.propType.localizedCaseInsensitiveContains("home run") || $0.propType.localizedCaseInsensitiveContains("hr") }
    }

    // Simple model: sum edges by team; higher total suggests likely winner
    private var teamEdgeTotals: (home: Double, away: Double) {
        let home = props.filter { $0.teamAbbreviation == homeAbbr }.map { $0.edge }.reduce(0, +)
        let away = props.filter { $0.teamAbbreviation == awayAbbr }.map { $0.edge }.reduce(0, +)
        return (home, away)
    }

    private var likelyWinnerText: String {
        let t = teamEdgeTotals
        if abs(t.home - t.away) < 0.02 { // ~2% edge diff considered even
            return "Too close to call — edges are balanced."
        }
        if t.home > t.away {
            return "Lean: \(homeAbbr) — stronger player edges and matchup indicators."
        } else {
            return "Lean: \(awayAbbr) — stronger player edges and matchup indicators."
        }
    }

    private var windNote: String? {
        // Placeholder: In a real app, pull weather from API. Here infer from HR edges magnitude.
        let avgHrEdge = hrProps.map { $0.edge }.reduce(0, +) / max(1, Double(hrProps.count))
        if avgHrEdge > 0.06 { return "Wind likely aiding fly balls — HR props show elevated edges." }
        if avgHrEdge < -0.03 { return "Wind likely suppressing carry — HR props show reduced edges." }
        return nil
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Game Analysis")
                .font(.system(size: 12, weight: .black, design: .rounded))
                .tracking(1.5)
                .foregroundStyle(Color.amberAccent)
            Text(likelyWinnerText)
                .font(.system(size: 14, weight: .bold, design: .rounded))
                .foregroundStyle(.white)
            if let wind = windNote {
                HStack(spacing: 6) {
                    Image(systemName: "wind")
                    Text(wind)
                }
                .font(.caption)
                .foregroundStyle(Color.textSecondary)
            }
        }
        .padding(14)
        .glassCard()
    }
}

