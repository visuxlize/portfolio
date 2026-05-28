//
//  TeamPickerView.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import SwiftUI

struct TeamPickerView: View {
    @Environment(AppState.self) private var app
    @State private var query: String = ""
    @State private var pendingId: Int?

    private var teams: [MLBTeam] {
        let q = query.trimmingCharacters(in: .whitespaces).lowercased()
        guard !q.isEmpty else { return MLBTeams.all }
        return MLBTeams.all.filter {
            $0.name.lowercased().contains(q) ||
            $0.city.lowercased().contains(q) ||
            $0.abbreviation.lowercased().contains(q)
        }
    }

    var body: some View {
        ZStack {
            AppBackground()

            VStack(spacing: 0) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Pick Your Team")
                        .font(.system(size: 30, weight: .black, design: .rounded))
                        .foregroundStyle(.white)
                    Text("We'll surface their game and props on top of your dashboard.")
                        .font(.system(size: 14, weight: .medium, design: .rounded))
                        .foregroundStyle(Color.textSecondary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 22)
                .padding(.top, 24)

                // Search
                HStack(spacing: 10) {
                    Image(systemName: "magnifyingglass")
                        .foregroundStyle(Color.amberAccent)
                    TextField("", text: $query,
                              prompt: Text("Search team or city").foregroundStyle(Color.textTertiary))
                        .foregroundStyle(.white)
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
                .glassCard(cornerRadius: 14)
                .padding(.horizontal, 22)
                .padding(.top, 18)

                ScrollView {
                    LazyVGrid(columns: [GridItem(.flexible(), spacing: 12),
                                         GridItem(.flexible(), spacing: 12)],
                              spacing: 12) {
                        ForEach(teams) { team in
                            TeamTile(team: team, isSelected: pendingId == team.id)
                                .onTapGesture {
                                    Haptics.selection()
                                    withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                                        pendingId = team.id
                                    }
                                }
                        }
                    }
                    .padding(.horizontal, 22)
                    .padding(.top, 16)
                    .padding(.bottom, 120)
                }
                .scrollIndicators(.hidden)
            }

            // Bottom CTA
            VStack {
                Spacer()
                Button {
                    guard let id = pendingId, let team = MLBTeams.by(id: id) else { return }
                    Haptics.success()
                    app.selectFavorite(team)
                } label: {
                    HStack(spacing: 8) {
                        Text(pendingId == nil ? "Select a team" : "Continue")
                        if pendingId != nil { Image(systemName: "arrow.right") }
                    }
                }
                .buttonStyle(AmberButtonStyle())
                .disabled(pendingId == nil)
                .opacity(pendingId == nil ? 0.55 : 1)
                .padding(.horizontal, 22)
                .padding(.bottom, 24)
                .background(
                    LinearGradient(colors: [.clear, Color.bgBase],
                                   startPoint: .top, endPoint: .bottom)
                        .frame(height: 140)
                        .allowsHitTesting(false)
                )
            }
        }
    }
}

private struct TeamTile: View {
    let team: MLBTeam
    let isSelected: Bool

    var body: some View {
        VStack(spacing: 10) {
            ZStack {
                Circle()
                    .fill(Color(hex: team.primaryHex).opacity(0.25))
                    .frame(width: 64, height: 64)
                    .overlay(Circle().stroke(Color.white.opacity(0.08), lineWidth: 1))
                Text(team.abbreviation)
                    .font(.system(size: 18, weight: .black, design: .rounded))
                    .foregroundStyle(.white)
            }

            Text(team.fullName)
                .font(.system(size: 13, weight: .semibold, design: .rounded))
                .foregroundStyle(.white)
                .multilineTextAlignment(.center)
                .lineLimit(2)
                .frame(height: 34)

            if isSelected {
                HStack(spacing: 4) {
                    Image(systemName: "checkmark.circle.fill")
                    Text("Selected")
                }
                .font(.caption2.bold())
                .foregroundStyle(Color.amberAccent)
            } else {
                Text(team.city)
                    .font(.caption2)
                    .foregroundStyle(Color.textTertiary)
            }
        }
        .padding(.vertical, 14)
        .frame(maxWidth: .infinity)
        .glassCard(cornerRadius: 18)
        .overlay(
            RoundedRectangle(cornerRadius: 18)
                .stroke(isSelected ? Color.amberAccent : .clear, lineWidth: 2)
        )
        .shadow(color: isSelected ? Color.amberAccent.opacity(0.35) : .clear, radius: 14, y: 6)
        .scaleEffect(isSelected ? 1.02 : 1)
    }
}

extension Color {
    init(hex: String) {
        var h = hex.trimmingCharacters(in: .whitespacesAndNewlines)
        if h.hasPrefix("#") { h.removeFirst() }
        var v: UInt64 = 0
        Scanner(string: h).scanHexInt64(&v)
        let r = Double((v >> 16) & 0xFF) / 255
        let g = Double((v >> 8) & 0xFF) / 255
        let b = Double(v & 0xFF) / 255
        self = Color(red: r, green: g, blue: b)
    }
}
