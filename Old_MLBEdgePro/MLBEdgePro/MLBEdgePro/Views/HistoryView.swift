//
//  HistoryView.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import SwiftUI

struct HistoryView: View {
    @Environment(AppState.self) private var app

    private var verified: [VerifiedProp] { app.verifiedProps.filter { $0.outcome != .pending } }

    var body: some View {
        NavigationStack {
            ZStack {
                AppBackground()

                ScrollView {
                    VStack(alignment: .leading, spacing: 22) {
                        AccuracyHeader(accuracy: app.modelAccuracy,
                                       count: app.verifiedCount,
                                       correct: verified.filter { $0.outcome == .correct }.count)

                        if verified.isEmpty {
                            EmptyHistoryCard()
                                .padding(.horizontal, 18)
                        } else {
                            SectionHeader(title: "Verified Props", subtitle: "\(verified.count) entries")

                            VStack(spacing: 12) {
                                ForEach(verified) { v in
                                    HistoryRow(item: v) {
                                        Haptics.warning()
                                        app.remove(verifiedId: v.id)
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
            .navigationTitle("History")
            .navigationBarTitleDisplayMode(.large)
            .toolbarColorScheme(.dark, for: .navigationBar)
        }
    }
}

private struct AccuracyHeader: View {
    let accuracy: Double
    let count: Int
    let correct: Int

    @State private var animated: Double = 0

    var body: some View {
        VStack(spacing: 16) {
            ZStack {
                Circle()
                    .stroke(Color.white.opacity(0.08), lineWidth: 12)
                Circle()
                    .trim(from: 0, to: animated)
                    .stroke(
                        LinearGradient(colors: [.amberGlow, .amberAccent, .amberDeep],
                                       startPoint: .topLeading, endPoint: .bottomTrailing),
                        style: StrokeStyle(lineWidth: 12, lineCap: .round)
                    )
                    .rotationEffect(.degrees(-90))

                VStack(spacing: 2) {
                    Text("\(Int(accuracy * 100))%")
                        .font(.system(size: 38, weight: .black, design: .rounded))
                        .foregroundStyle(.white)
                        .contentTransition(.numericText())
                    Text("MODEL ACCURACY")
                        .font(.system(size: 9, weight: .black, design: .rounded))
                        .tracking(2)
                        .foregroundStyle(Color.amberAccent)
                }
            }
            .frame(width: 160, height: 160)

            HStack(spacing: 12) {
                StatTile(label: "Verified", value: "\(count)")
                StatTile(label: "Correct", value: "\(correct)", accent: true)
                StatTile(label: "Wrong", value: "\(count - correct)")
            }
        }
        .padding(20)
        .glassCard()
        .padding(.horizontal, 18)
        .onAppear {
            withAnimation(.spring(response: 0.9, dampingFraction: 0.85)) {
                animated = max(0.001, accuracy)
            }
        }
        .onChange(of: accuracy) { _, new in
            withAnimation(.spring(response: 0.9, dampingFraction: 0.85)) {
                animated = max(0.001, new)
            }
        }
    }
}

private struct EmptyHistoryCard: View {
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "checkmark.seal")
                .font(.system(size: 40))
                .foregroundStyle(Color.amberAccent)
            Text("No verified props yet")
                .font(.system(size: 17, weight: .black, design: .rounded))
                .foregroundStyle(.white)
            Text("Open a game, tap a prop, and use Verify Result after the game finishes. Your data trains the model.")
                .font(.callout)
                .foregroundStyle(Color.textSecondary)
                .multilineTextAlignment(.center)
        }
        .padding(24)
        .frame(maxWidth: .infinity)
        .glassCard()
    }
}

private struct HistoryRow: View {
    let item: VerifiedProp
    let onDelete: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            ZStack {
                Circle().fill((item.outcome == .correct ? Color.success : Color.danger).opacity(0.15))
                    .frame(width: 44, height: 44)
                Image(systemName: item.outcome == .correct ? "checkmark" : "xmark")
                    .font(.system(size: 18, weight: .black))
                    .foregroundStyle(item.outcome == .correct ? Color.success : Color.danger)
            }

            VStack(alignment: .leading, spacing: 2) {
                Text(item.playerName)
                    .font(.system(size: 15, weight: .bold, design: .rounded))
                    .foregroundStyle(.white)
                Text(item.propType)
                    .font(.caption)
                    .foregroundStyle(Color.textSecondary)
                if let v = item.actualValue {
                    Text("Actual: \(formatted(v))")
                        .font(.caption2)
                        .foregroundStyle(Color.amberAccent)
                }
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 2) {
                Text(String(format: "%.0f%%", item.modelProbability * 100))
                    .font(.system(size: 14, weight: .black, design: .rounded))
                    .foregroundStyle(.white)
                Text(item.date.formatted(.dateTime.month().day()))
                    .font(.caption2)
                    .foregroundStyle(Color.textTertiary)
            }
        }
        .padding(12)
        .glassCard()
        .swipeActions(edge: .trailing, allowsFullSwipe: true) {
            Button(role: .destructive, action: onDelete) {
                Label("Delete", systemImage: "trash")
            }
        }
        .contextMenu {
            Button(role: .destructive, action: onDelete) {
                Label("Delete", systemImage: "trash")
            }
        }
    }

    private func formatted(_ v: Double) -> String {
        v.truncatingRemainder(dividingBy: 1) == 0
            ? String(format: "%.0f", v)
            : String(format: "%.1f", v)
    }
}
