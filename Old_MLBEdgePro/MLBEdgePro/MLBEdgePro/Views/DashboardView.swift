//
//  DashboardView.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import SwiftUI

struct DashboardView: View {
    @Environment(AppState.self) private var app
    @Environment(APIClient.self) private var api

    @State private var games: [GameSummary] = []
    @State private var allProps: [Int: [PropPrediction]] = [:] // gamePk -> props
    @State private var isLoading: Bool = true

    private var topEdges: [PropPrediction] {
        allProps.values.flatMap { $0 }
            .sorted { $0.edge > $1.edge }
            .prefix(6)
            .map { $0 }
    }

    private var favoriteGame: GameSummary? {
        guard let fav = app.favoriteTeam else { return nil }
        return games.first { $0.homeTeam.id == fav.id || $0.awayTeam.id == fav.id }
    }

    private var otherGames: [GameSummary] {
        guard let fav = favoriteGame else { return games }
        return games.filter { $0.gamePk != fav.gamePk }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                AppBackground()

                ScrollView {
                    VStack(alignment: .leading, spacing: 22) {
                        header

                        if let fav = favoriteGame {
                            HeroGameCard(game: fav,
                                         topEdge: allProps[fav.gamePk]?.max(by: { $0.edge < $1.edge }))
                        } else {
                            FavoritePromptCard()
                        }

                        SectionHeader(title: "Today's Top Edges", subtitle: "Model vs FanDuel")

                        if isLoading && topEdges.isEmpty {
                            VStack(spacing: 12) {
                                ForEach(0..<3, id: \.self) { _ in SkeletonRow() }
                            }
                            .padding(.horizontal, 18)
                        } else {
                            VStack(spacing: 12) {
                                ForEach(topEdges) { prop in
                                    PropEdgeRow(prop: prop, gamePk: gamePk(for: prop))
                                }
                            }
                            .padding(.horizontal, 18)
                        }

                        SectionHeader(title: "All Games", subtitle: "\(games.count) scheduled")

                        VStack(spacing: 12) {
                            ForEach(otherGames) { game in
                                NavigationLink {
                                    GameDetailView(game: game,
                                                   props: allProps[game.gamePk] ?? [])
                                } label: {
                                    GameScoreCard(game: game,
                                                  edgeCount: (allProps[game.gamePk] ?? [])
                                                    .filter { $0.edge > 0.04 }.count)
                                }
                                .buttonStyle(.plain)
                                .simultaneousGesture(TapGesture().onEnded { Haptics.tap() })
                            }
                        }
                        .padding(.horizontal, 18)

                        Spacer(minLength: 40)
                    }
                    .padding(.top, 8)
                }
                .scrollIndicators(.hidden)
                .refreshable { await load(force: true) }
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    HStack(spacing: 8) {
                        Image(systemName: "baseball.fill")
                            .foregroundStyle(Color.amberAccent)
                        Text("MLB EDGE")
                            .font(.system(size: 15, weight: .black, design: .rounded))
                            .tracking(2)
                            .foregroundStyle(.white)
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    if let team = app.favoriteTeam {
                        NavigationLink {
                            SettingsView()
                        } label: {
                            ZStack {
                                Circle()
                                    .fill(Color.white.opacity(0.08))
                                    .frame(width: 44, height: 44)
                                    .overlay(Circle().stroke(Color.white.opacity(0.15), lineWidth: 1))
                                // Attempt to load team logo; fall back to abbreviation
                                if let url = APIClient.teamLogoURL(id: team.id) {
                                    AsyncImage(url: url) { phase in
                                        switch phase {
                                        case .success(let img):
                                            img.resizable().scaledToFit()
                                                .frame(width: 28, height: 28)
                                        default:
                                            Text(team.abbreviation)
                                                .font(.system(size: 12, weight: .black, design: .rounded))
                                                .foregroundStyle(.white)
                                        }
                                    }
                                } else {
                                    Text(team.abbreviation)
                                        .font(.system(size: 12, weight: .black, design: .rounded))
                                        .foregroundStyle(.white)
                                }
                            }
                            .accessibilityLabel("Edit favorite team")
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .task { await load(force: false) }
        }
    }

    @ViewBuilder
    private var header: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(greeting)
                .font(.system(size: 14, weight: .medium, design: .rounded))
                .foregroundStyle(Color.textSecondary)
            Text("Your Edge, \(Date.now.formatted(.dateTime.weekday(.wide)))")
                .font(.system(size: 26, weight: .black, design: .rounded))
                .foregroundStyle(.white)
        }
        .padding(.horizontal, 18)
    }

    private var greeting: String {
        let h = Calendar.current.component(.hour, from: .now)
        switch h {
        case 5..<12: return "Good morning"
        case 12..<17: return "Good afternoon"
        default: return "Good evening"
        }
    }

    private func gamePk(for prop: PropPrediction) -> Int {
        for (pk, list) in allProps where list.contains(where: { $0.id == prop.id }) { return pk }
        return 0
    }

    private func load(force: Bool) async {
        if !force && !games.isEmpty { return }
        isLoading = true
        let g = await api.fetchTodayGames()
        await MainActor.run { self.games = g }
        // Fetch props for first 6 games in parallel for snappy UI
        let pks = g.prefix(6).map { $0.gamePk }
        await withTaskGroup(of: (Int, [PropPrediction]).self) { group in
            for pk in pks {
                group.addTask { (pk, await api.fetchProps(gamePk: pk)) }
            }
            var collected: [Int: [PropPrediction]] = [:]
            for await (pk, props) in group { collected[pk] = props }
            await MainActor.run {
                self.allProps = collected
                self.isLoading = false
            }
        }
    }
}

// MARK: - Hero card

struct HeroGameCard: View {
    let game: GameSummary
    let topEdge: PropPrediction?

    private var homeTeam: MLBTeam? { MLBTeams.by(id: game.homeTeam.id) }
    private var awayTeam: MLBTeam? { MLBTeams.by(id: game.awayTeam.id) }

    var body: some View {
        NavigationLink {
            GameDetailView(game: game, props: [])
        } label: {
            VStack(alignment: .leading, spacing: 0) {
                ZStack {
                    LinearGradient(
                        colors: [
                            Color(hex: awayTeam?.primaryHex ?? "2D140B").opacity(0.7),
                            Color.bgAccent,
                            Color(hex: homeTeam?.primaryHex ?? "2D140B").opacity(0.7)
                        ],
                        startPoint: .leading, endPoint: .trailing
                    )

                    HStack(spacing: 24) {
                        teamEmblem(awayTeam, abbr: game.awayTeam.abbreviation)
                        VStack(spacing: 6) {
                            Text("VS")
                                .font(.system(size: 11, weight: .black, design: .rounded))
                                .tracking(2)
                                .foregroundStyle(Color.amberAccent)
                            Text(game.displayTime)
                                .font(.system(size: 13, weight: .semibold, design: .rounded))
                                .foregroundStyle(.white)
                        }
                        teamEmblem(homeTeam, abbr: game.homeTeam.abbreviation)
                    }
                    .padding(.vertical, 26)
                }
                .frame(height: 160)

                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text("Your Game")
                                .font(.caption.bold())
                                .foregroundStyle(Color.amberAccent)
                                .tracking(1.5)
                            Text(game.matchupFull)
                                .font(.system(size: 17, weight: .bold, design: .rounded))
                                .foregroundStyle(.white)
                                .lineLimit(1)
                            if let v = game.venue {
                                Text(v)
                                    .font(.caption)
                                    .foregroundStyle(Color.textSecondary)
                            }
                        }
                        Spacer()
                        Image(systemName: "chevron.right")
                            .foregroundStyle(Color.textSecondary)
                    }

                    if let topEdge {
                        Divider().background(Color.white.opacity(0.08))
                        HStack(alignment: .center, spacing: 12) {
                            EdgeBadge(value: topEdge.edgePercent)
                            VStack(alignment: .leading, spacing: 2) {
                                Text(topEdge.playerName)
                                    .font(.system(size: 14, weight: .bold, design: .rounded))
                                    .foregroundStyle(.white)
                                Text(topEdge.propType)
                                    .font(.caption)
                                    .foregroundStyle(Color.textSecondary)
                            }
                            Spacer()
                            Text(topEdge.oddsString)
                                .font(.system(size: 14, weight: .black, design: .rounded))
                                .foregroundStyle(.white)
                        }
                    }
                }
                .padding(16)
                .background(Color.black.opacity(0.55))
            }
            .clipShape(.rect(cornerRadius: 22))
            .overlay(
                RoundedRectangle(cornerRadius: 22)
                    .stroke(Color.amberAccent.opacity(0.35), lineWidth: 1)
            )
            .shadow(color: .black.opacity(0.5), radius: 22, y: 12)
            .padding(.horizontal, 18)
        }
        .buttonStyle(.plain)
        .simultaneousGesture(TapGesture().onEnded { Haptics.tap() })
    }

    @ViewBuilder
    private func teamEmblem(_ team: MLBTeam?, abbr: String) -> some View {
        VStack(spacing: 8) {
            ZStack {
                Circle()
                    .fill(Color.black.opacity(0.5))
                    .frame(width: 76, height: 76)
                    .overlay(Circle().stroke(Color.white.opacity(0.15), lineWidth: 1))
                if let id = team?.id, let url = APIClient.teamLogoURL(id: id) {
                    AsyncImage(url: url) { phase in
                        switch phase {
                        case .success(let img): img.resizable().scaledToFit().frame(width: 52, height: 52)
                        default:
                            Text(abbr)
                                .font(.system(size: 22, weight: .black, design: .rounded))
                                .foregroundStyle(.white)
                        }
                    }
                } else {
                    Text(abbr)
                        .font(.system(size: 22, weight: .black, design: .rounded))
                        .foregroundStyle(.white)
                }
            }
            Text(team?.name ?? abbr)
                .font(.caption.bold())
                .foregroundStyle(.white.opacity(0.85))
        }
        .frame(maxWidth: .infinity)
    }
}

struct FavoritePromptCard: View {
    var body: some View {
        NavigationLink {
            SettingsView()
        } label: {
            HStack(spacing: 14) {
                Image(systemName: "star.fill")
                    .font(.title2)
                    .foregroundStyle(Color.amberAccent)
                VStack(alignment: .leading, spacing: 2) {
                    Text("No favorite team")
                        .font(.system(size: 15, weight: .bold, design: .rounded))
                        .foregroundStyle(.white)
                    Text("Pick one in Settings to feature their game.")
                        .font(.caption)
                        .foregroundStyle(Color.textSecondary)
                }
                Spacer()
                Image(systemName: "chevron.right").foregroundStyle(Color.textSecondary)
            }
            .padding(16)
            .glassCard()
            .padding(.horizontal, 18)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Game card

struct GameScoreCard: View {
    let game: GameSummary
    let edgeCount: Int

    private var homeTeam: MLBTeam? { MLBTeams.by(id: game.homeTeam.id) }
    private var awayTeam: MLBTeam? { MLBTeams.by(id: game.awayTeam.id) }

    var body: some View {
        HStack(spacing: 14) {
            VStack(spacing: 6) {
                teamCircle(awayTeam, abbr: game.awayTeam.abbreviation)
                Text(game.awayTeam.abbreviation)
                    .font(.caption2.bold())
                    .foregroundStyle(.white)
            }

            VStack(spacing: 4) {
                Text("@")
                    .font(.system(size: 13, weight: .black, design: .rounded))
                    .foregroundStyle(Color.amberAccent)
                Text(game.displayTime)
                    .font(.system(size: 11, weight: .semibold, design: .rounded))
                    .foregroundStyle(Color.textSecondary)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
            }
            .frame(width: 60)

            VStack(spacing: 6) {
                teamCircle(homeTeam, abbr: game.homeTeam.abbreviation)
                Text(game.homeTeam.abbreviation)
                    .font(.caption2.bold())
                    .foregroundStyle(.white)
            }

            Spacer(minLength: 4)

            VStack(alignment: .trailing, spacing: 4) {
                if edgeCount > 0 {
                    HStack(spacing: 4) {
                        Image(systemName: "flame.fill")
                            .font(.caption2)
                        Text("\(edgeCount)")
                            .font(.system(size: 13, weight: .black, design: .rounded))
                    }
                    .foregroundStyle(Color.amberAccent)
                    .padding(.horizontal, 8).padding(.vertical, 4)
                    .background(Capsule().fill(Color.amberAccent.opacity(0.15)))
                    Text("edges")
                        .font(.caption2)
                        .foregroundStyle(Color.textTertiary)
                } else {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(Color.textSecondary)
                }
            }
        }
        .padding(14)
        .glassCard()
    }

    @ViewBuilder
    private func teamCircle(_ team: MLBTeam?, abbr: String) -> some View {
        ZStack {
            Circle()
                .fill(Color(hex: team?.primaryHex ?? "1A1A1A"))
                .frame(width: 44, height: 44)
                .overlay(Circle().stroke(Color.white.opacity(0.15), lineWidth: 1))
            if let id = team?.id, let url = APIClient.teamLogoURL(id: id) {
                AsyncImage(url: url) { phase in
                    switch phase {
                    case .success(let img): img.resizable().scaledToFit().frame(width: 30, height: 30)
                    default:
                        Text(abbr)
                            .font(.system(size: 11, weight: .black, design: .rounded))
                            .foregroundStyle(.white)
                            .minimumScaleFactor(0.7)
                            .lineLimit(1)
                            .padding(.horizontal, 4)
                    }
                }
            } else {
                Text(abbr)
                    .font(.system(size: 11, weight: .black, design: .rounded))
                    .foregroundStyle(.white)
                    .minimumScaleFactor(0.7)
                    .lineLimit(1)
                    .padding(.horizontal, 4)
            }
        }
    }
}

// MARK: - Prop row

struct PropEdgeRow: View {
    let prop: PropPrediction
    let gamePk: Int

    var body: some View {
        HStack(spacing: 12) {
            if let url = APIClient.playerHeadshotURL(id: prop.playerId) {
                AsyncImage(url: url) { phase in
                    switch phase {
                    case .success(let img): img.resizable().scaledToFill()
                            .frame(width: 38, height: 38)
                            .clipShape(Circle())
                            .overlay(Circle().stroke(Color.white.opacity(0.15), lineWidth: 1))
                    default:
                        Circle().fill(Color.white.opacity(0.06)).frame(width: 38, height: 38)
                    }
                }
            } else {
                Circle().fill(Color.white.opacity(0.06)).frame(width: 38, height: 38)
            }
            EdgeBadge(value: prop.edgePercent)

            VStack(alignment: .leading, spacing: 2) {
                Text(prop.playerName)
                    .font(.system(size: 15, weight: .bold, design: .rounded))
                    .foregroundStyle(.white)
                    .lineLimit(1)
                HStack(spacing: 6) {
                    if let abbr = prop.teamAbbreviation {
                        Text(abbr)
                            .font(.caption2.bold())
                            .foregroundStyle(Color.amberAccent)
                    }
                    Text(prop.propType)
                        .font(.caption)
                        .foregroundStyle(Color.textSecondary)
                        .lineLimit(1)
                }
            }

            Spacer(minLength: 6)

            VStack(alignment: .trailing, spacing: 2) {
                Text(prop.oddsString)
                    .font(.system(size: 14, weight: .black, design: .rounded))
                    .foregroundStyle(.white)
                Text("FD")
                    .font(.caption2)
                    .foregroundStyle(Color.textTertiary)
            }

            ProbabilityRing(model: prop.modelProbability, book: prop.fanduelImpliedProbability)
                .frame(width: 38, height: 38)
        }
        .padding(12)
        .glassCard()
    }
}

struct EdgeBadge: View {
    let value: Double // already percent, can be negative
    var body: some View {
        let isPositive = value >= 0
        VStack(spacing: 1) {
            Text(String(format: "%@%.1f", isPositive ? "+" : "", value))
                .font(.system(size: 13, weight: .black, design: .rounded))
                .foregroundStyle(.white)
                .minimumScaleFactor(0.7)
            Text("EDGE")
                .font(.system(size: 8, weight: .black, design: .rounded))
                .tracking(1)
                .foregroundStyle(.white.opacity(0.8))
        }
        .frame(width: 56, height: 44)
        .background(
            LinearGradient(
                colors: isPositive
                    ? [Color.amberGlow, Color.amberAccent]
                    : [Color.white.opacity(0.1), Color.white.opacity(0.04)],
                startPoint: .top, endPoint: .bottom
            )
        )
        .clipShape(.rect(cornerRadius: 10))
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .stroke(Color.white.opacity(isPositive ? 0.25 : 0.1), lineWidth: 1)
        )
        .shadow(color: isPositive ? Color.amberAccent.opacity(0.4) : .clear, radius: 8, y: 3)
    }
}

struct ProbabilityRing: View {
    let model: Double
    let book: Double

    var body: some View {
        ZStack {
            Circle()
                .stroke(Color.white.opacity(0.08), lineWidth: 4)
            Circle()
                .trim(from: 0, to: book)
                .stroke(Color.white.opacity(0.4), style: StrokeStyle(lineWidth: 4, lineCap: .round))
                .rotationEffect(.degrees(-90))
            Circle()
                .trim(from: 0, to: model)
                .stroke(Color.amberAccent, style: StrokeStyle(lineWidth: 4, lineCap: .round))
                .rotationEffect(.degrees(-90))
            Text("\(Int(model * 100))")
                .font(.system(size: 11, weight: .black, design: .rounded))
                .foregroundStyle(.white)
        }
    }
}

// MARK: - Section header / skeleton

struct SectionHeader: View {
    let title: String
    let subtitle: String?
    var body: some View {
        HStack(alignment: .firstTextBaseline) {
            Text(title)
                .font(.system(size: 17, weight: .black, design: .rounded))
                .foregroundStyle(.white)
            if let subtitle {
                Text(subtitle)
                    .font(.caption)
                    .foregroundStyle(Color.textTertiary)
            }
            Spacer()
        }
        .padding(.horizontal, 18)
    }
}

private struct SkeletonRow: View {
    @State private var shimmer = false
    var body: some View {
        HStack(spacing: 12) {
            RoundedRectangle(cornerRadius: 10).fill(Color.white.opacity(0.06)).frame(width: 56, height: 44)
            VStack(alignment: .leading, spacing: 6) {
                RoundedRectangle(cornerRadius: 4).fill(Color.white.opacity(0.06)).frame(height: 12)
                RoundedRectangle(cornerRadius: 4).fill(Color.white.opacity(0.04)).frame(height: 10).frame(maxWidth: 120, alignment: .leading)
            }
            Spacer()
            Circle().fill(Color.white.opacity(0.06)).frame(width: 38, height: 38)
        }
        .padding(12)
        .glassCard()
        .opacity(shimmer ? 1 : 0.6)
        .onAppear {
            withAnimation(.easeInOut(duration: 1.0).repeatForever(autoreverses: true)) { shimmer = true }
        }
    }
}

