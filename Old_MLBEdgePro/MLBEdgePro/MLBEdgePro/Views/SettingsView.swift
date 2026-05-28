//
//  SettingsView.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import SwiftUI

struct SettingsView: View {
    @Environment(AppState.self) private var app
    @State private var showTeamSheet: Bool = false
    @State private var confirmSignOut: Bool = false

    var body: some View {
        NavigationStack {
            ZStack {
                AppBackground()

                ScrollView {
                    VStack(spacing: 18) {
                        // Profile
                        HStack(spacing: 14) {
                            ZStack {
                                Circle()
                                    .fill(LinearGradient(colors: [.amberGlow, .amberDeep],
                                                          startPoint: .topLeading, endPoint: .bottomTrailing))
                                    .frame(width: 64, height: 64)
                                Text(initials)
                                    .font(.system(size: 22, weight: .black, design: .rounded))
                                    .foregroundStyle(.white)
                            }
                            VStack(alignment: .leading, spacing: 2) {
                                Text(app.email.isEmpty ? "Member" : app.email)
                                    .font(.system(size: 15, weight: .bold, design: .rounded))
                                    .foregroundStyle(.white)
                                Text("MLB Edge Pro")
                                    .font(.caption)
                                    .foregroundStyle(Color.amberAccent)
                            }
                            Spacer()
                        }
                        .padding(16)
                        .glassCard()

                        // Favorite team
                        SettingsCard(title: "Favorite Team") {
                            Button {
                                Haptics.tap()
                                showTeamSheet = true
                            } label: {
                                HStack(spacing: 14) {
                                    if let team = app.favoriteTeam {
                                        ZStack {
                                            Circle().fill(Color(hex: team.primaryHex))
                                                .frame(width: 44, height: 44)
                                                .overlay(Circle().stroke(Color.white.opacity(0.15), lineWidth: 1))
                                            Text(team.abbreviation)
                                                .font(.system(size: 12, weight: .black, design: .rounded))
                                                .foregroundStyle(.white)
                                        }
                                        VStack(alignment: .leading, spacing: 2) {
                                            Text(team.fullName)
                                                .font(.system(size: 15, weight: .bold, design: .rounded))
                                                .foregroundStyle(.white)
                                            Text("Featured on dashboard")
                                                .font(.caption)
                                                .foregroundStyle(Color.textSecondary)
                                        }
                                    } else {
                                        Image(systemName: "star.fill")
                                            .font(.title3)
                                            .foregroundStyle(Color.amberAccent)
                                            .frame(width: 44, height: 44)
                                            .background(Circle().fill(Color.amberAccent.opacity(0.15)))
                                        Text("Choose a team")
                                            .font(.system(size: 15, weight: .bold, design: .rounded))
                                            .foregroundStyle(.white)
                                    }
                                    Spacer()
                                    Image(systemName: "chevron.right")
                                        .foregroundStyle(Color.textSecondary)
                                }
                            }
                            .buttonStyle(.plain)
                        }

                        // Stats
                        SettingsCard(title: "Your Model") {
                            HStack(spacing: 12) {
                                StatTile(label: "Verified", value: "\(app.verifiedCount)")
                                StatTile(label: "Accuracy",
                                         value: "\(Int(app.modelAccuracy * 100))%",
                                         accent: true)
                            }
                        }

                        // About
                        SettingsCard(title: "About") {
                            VStack(spacing: 0) {
                                row(icon: "doc.text.fill", title: "Terms of Service")
                                divider
                                row(icon: "lock.shield.fill", title: "Privacy Policy")
                                divider
                                row(icon: "envelope.fill", title: "Contact Support")
                            }
                        }

                        Button {
                            Haptics.warning()
                            confirmSignOut = true
                        } label: {
                            HStack(spacing: 8) {
                                Image(systemName: "rectangle.portrait.and.arrow.right")
                                Text("Sign Out")
                            }
                            .font(.system(size: 15, weight: .bold, design: .rounded))
                            .foregroundStyle(Color.danger)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 16)
                            .background(Color.danger.opacity(0.10))
                            .clipShape(.rect(cornerRadius: 14))
                            .overlay(
                                RoundedRectangle(cornerRadius: 14)
                                    .stroke(Color.danger.opacity(0.3), lineWidth: 1)
                            )
                        }
                        .buttonStyle(.plain)

                        Text("MLB Edge · v1.0")
                            .font(.caption2)
                            .foregroundStyle(Color.textTertiary)
                            .padding(.top, 6)

                        Spacer(minLength: 40)
                    }
                    .padding(.horizontal, 18)
                    .padding(.top, 8)
                }
                .scrollIndicators(.hidden)
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.large)
            .toolbarColorScheme(.dark, for: .navigationBar)
            .sheet(isPresented: $showTeamSheet) {
                TeamPickerSheet()
                    .presentationDetents([.large])
                    .presentationDragIndicator(.visible)
            }
            .confirmationDialog("Sign out?",
                                isPresented: $confirmSignOut,
                                titleVisibility: .visible) {
                Button("Sign Out", role: .destructive) {
                    Haptics.success()
                    app.signOut()
                }
                Button("Cancel", role: .cancel) {}
            }
        }
    }

    private var initials: String {
        let e = app.email
        guard !e.isEmpty, let first = e.first else { return "M" }
        return String(first).uppercased()
    }

    @ViewBuilder
    private var divider: some View { Divider().background(Color.white.opacity(0.08)) }

    @ViewBuilder
    private func row(icon: String, title: String) -> some View {
        Button {
            Haptics.tap()
        } label: {
            HStack(spacing: 12) {
                Image(systemName: icon)
                    .font(.system(size: 14))
                    .foregroundStyle(Color.amberAccent)
                    .frame(width: 24)
                Text(title)
                    .font(.system(size: 14, weight: .semibold, design: .rounded))
                    .foregroundStyle(.white)
                Spacer()
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(Color.textTertiary)
            }
            .padding(.vertical, 14)
        }
        .buttonStyle(.plain)
    }
}

private struct SettingsCard<Content: View>: View {
    let title: String
    @ViewBuilder var content: () -> Content
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title.uppercased())
                .font(.system(size: 11, weight: .black, design: .rounded))
                .tracking(2)
                .foregroundStyle(Color.amberAccent)
                .padding(.horizontal, 4)
            VStack(spacing: 0) { content() }
                .padding(14)
                .glassCard()
        }
    }
}

private struct TeamPickerSheet: View {
    @Environment(AppState.self) private var app
    @Environment(\.dismiss) private var dismiss
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
                HStack {
                    Text("Favorite Team")
                        .font(.system(size: 22, weight: .black, design: .rounded))
                        .foregroundStyle(.white)
                    Spacer()
                    Button("Done") {
                        Haptics.success()
                        if let id = pendingId, let t = MLBTeams.by(id: id) {
                            app.selectFavorite(t)
                            // selectFavorite changes phase; we still want to close the sheet:
                        }
                        dismiss()
                    }
                    .foregroundStyle(Color.amberAccent)
                    .fontWeight(.bold)
                }
                .padding(.horizontal, 22)
                .padding(.top, 22)

                HStack(spacing: 10) {
                    Image(systemName: "magnifyingglass")
                        .foregroundStyle(Color.amberAccent)
                    TextField("", text: $query,
                              prompt: Text("Search team or city").foregroundStyle(Color.textTertiary))
                        .foregroundStyle(.white)
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)
                }
                .padding(14)
                .glassCard(cornerRadius: 14)
                .padding(.horizontal, 22)
                .padding(.top, 16)

                ScrollView {
                    LazyVStack(spacing: 8) {
                        ForEach(teams) { team in
                            Button {
                                Haptics.selection()
                                pendingId = team.id
                            } label: {
                                HStack(spacing: 12) {
                                    ZStack {
                                        Circle().fill(Color(hex: team.primaryHex))
                                            .frame(width: 36, height: 36)
                                            .overlay(Circle().stroke(Color.white.opacity(0.15), lineWidth: 1))
                                        Text(team.abbreviation)
                                            .font(.system(size: 11, weight: .black, design: .rounded))
                                            .foregroundStyle(.white)
                                    }
                                    VStack(alignment: .leading, spacing: 1) {
                                        Text(team.fullName)
                                            .font(.system(size: 14, weight: .bold, design: .rounded))
                                            .foregroundStyle(.white)
                                        Text(team.city)
                                            .font(.caption2)
                                            .foregroundStyle(Color.textSecondary)
                                    }
                                    Spacer()
                                    if (pendingId ?? app.favoriteTeamId) == team.id {
                                        Image(systemName: "checkmark.circle.fill")
                                            .foregroundStyle(Color.amberAccent)
                                    }
                                }
                                .padding(12)
                                .background(
                                    Color.white.opacity((pendingId ?? app.favoriteTeamId) == team.id ? 0.06 : 0.0)
                                )
                                .clipShape(.rect(cornerRadius: 12))
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 22)
                    .padding(.top, 14)
                    .padding(.bottom, 40)
                }
                .scrollIndicators(.hidden)
            }
        }
        .onAppear { pendingId = app.favoriteTeamId }
    }
}
