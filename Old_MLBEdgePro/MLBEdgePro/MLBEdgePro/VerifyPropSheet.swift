//
//  VerifyPropSheet.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//


import SwiftUI

struct VerifyPropSheet: View {
    let prop: PropPrediction
    let gamePk: Int

    @Environment(AppState.self) private var app
    @Environment(\.dismiss) private var dismiss

    @State private var actualValue: String = ""
    @State private var notes: String = ""
    @State private var outcome: VerifiedProp.Outcome = .pending

    var body: some View {
        ZStack {
            AppBackground()

            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    VStack(alignment: .leading, spacing: 6) {
                        Text("VERIFY RESULT")
                            .font(.system(size: 11, weight: .black, design: .rounded))
                            .tracking(2)
                            .foregroundStyle(Color.amberAccent)
                        Text(prop.playerName)
                            .font(.system(size: 26, weight: .black, design: .rounded))
                            .foregroundStyle(.white)
                        Text(prop.propType)
                            .font(.subheadline)
                            .foregroundStyle(Color.textSecondary)
                    }

                    HStack(spacing: 12) {
                        StatTile(label: "Model", value: "\(Int(prop.modelPercent))%", accent: true)
                        StatTile(label: "Book", value: "\(Int(prop.bookPercent))%")
                        StatTile(label: "Edge",
                                 value: String(format: "%@%.1f%%",
                                               prop.edge >= 0 ? "+" : "",
                                               prop.edgePercent),
                                 accent: prop.edge > 0)
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        Text("Did the bet hit?")
                            .font(.system(size: 14, weight: .bold, design: .rounded))
                            .foregroundStyle(.white)

                        HStack(spacing: 12) {
                            OutcomeButton(title: "Correct", systemImage: "checkmark.circle.fill",
                                          tint: .success, isSelected: outcome == .correct) {
                                Haptics.success()
                                outcome = .correct
                            }
                            OutcomeButton(title: "Incorrect", systemImage: "xmark.circle.fill",
                                          tint: .danger, isSelected: outcome == .incorrect) {
                                Haptics.warning()
                                outcome = .incorrect
                            }
                        }
                    }

                    VStack(alignment: .leading, spacing: 8) {
                        Text("Actual Value")
                            .font(.system(size: 14, weight: .bold, design: .rounded))
                            .foregroundStyle(.white)
                        Text("Enter the player's real stat (e.g. hits = 2). This feeds back into the model weights.")
                            .font(.caption)
                            .foregroundStyle(Color.textSecondary)
                        HStack {
                            Image(systemName: "number")
                                .foregroundStyle(Color.amberAccent)
                            TextField("", text: $actualValue,
                                      prompt: Text("e.g. 2").foregroundStyle(Color.textTertiary))
                                .keyboardType(.decimalPad)
                                .foregroundStyle(.white)
                        }
                        .padding(14)
                        .glassCard(cornerRadius: 12)
                    }

                    VStack(alignment: .leading, spacing: 8) {
                        Text("Notes")
                            .font(.system(size: 14, weight: .bold, design: .rounded))
                            .foregroundStyle(.white)
                        TextField("", text: $notes,
                                  prompt: Text("Weather, lineup change, pitcher matchup…")
                                    .foregroundStyle(Color.textTertiary),
                                  axis: .vertical)
                            .lineLimit(3...5)
                            .foregroundStyle(.white)
                            .padding(14)
                            .glassCard(cornerRadius: 12)
                    }

                    Button(action: save) {
                        HStack(spacing: 8) {
                            Image(systemName: "brain.head.profile")
                            Text("Smarten Model")
                        }
                    }
                    .buttonStyle(AmberButtonStyle())
                    .disabled(outcome == .pending)
                    .opacity(outcome == .pending ? 0.5 : 1)
                }
                .padding(20)
            }
            .scrollDismissesKeyboard(.interactively)
        }
    }

    private func save() {
        guard outcome != .pending else { return }
        let v = VerifiedProp(
            id: prop.id,
            gamePk: gamePk,
            playerName: prop.playerName,
            propType: prop.propType,
            line: prop.line,
            modelProbability: prop.modelProbability,
            bookProbability: prop.fanduelImpliedProbability,
            date: .now,
            outcome: outcome,
            actualValue: Double(actualValue.replacingOccurrences(of: ",", with: ".")),
            notes: notes.isEmpty ? nil : notes
        )
        app.addOrUpdate(verified: v)
        Haptics.success()
        dismiss()
    }
}

private struct OutcomeButton: View {
    let title: String
    let systemImage: String
    let tint: Color
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Image(systemName: systemImage)
                    .font(.system(size: 26, weight: .bold))
                    .foregroundStyle(isSelected ? Color.white : tint)
                Text(title)
                    .font(.system(size: 13, weight: .bold, design: .rounded))
                    .foregroundStyle(isSelected ? Color.white : Color.textSecondary)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 18)
            .background(
                isSelected
                    ? AnyShapeStyle(LinearGradient(colors: [tint.opacity(0.7), tint],
                                                   startPoint: .top, endPoint: .bottom))
                    : AnyShapeStyle(Color.white.opacity(0.05))
            )
            .clipShape(.rect(cornerRadius: 14))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .stroke(isSelected ? Color.white.opacity(0.3) : Color.white.opacity(0.1), lineWidth: 1)
            )
            .shadow(color: isSelected ? tint.opacity(0.4) : .clear, radius: 12, y: 4)
        }
        .buttonStyle(.plain)
    }
}

struct StatTile: View {
    let label: String
    let value: String
    var accent: Bool = false
    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.system(size: 18, weight: .black, design: .rounded))
                .foregroundStyle(accent ? Color.amberAccent : .white)
            Text(label.uppercased())
                .font(.system(size: 10, weight: .black, design: .rounded))
                .tracking(1.5)
                .foregroundStyle(Color.textTertiary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .glassCard(cornerRadius: 12)
    }
}
