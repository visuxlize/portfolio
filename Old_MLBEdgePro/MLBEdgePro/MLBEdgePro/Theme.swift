//
//  Theme.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import SwiftUI

extension Color {
    static let bgBase = Color(red: 10/255, green: 14/255, blue: 20/255)
    static let bgAccent = Color(red: 45/255, green: 20/255, blue: 11/255)
    static let amberAccent = Color(red: 255/255, green: 120/255, blue: 40/255)
    static let amberDeep = Color(red: 200/255, green: 80/255, blue: 20/255)
    static let amberGlow = Color(red: 255/255, green: 165/255, blue: 80/255)
    static let glass = Color.white.opacity(0.05)
    static let glassStroke = Color.white.opacity(0.10)
    static let textSecondary = Color.white.opacity(0.6)
    static let textTertiary = Color.white.opacity(0.4)
    static let success = Color(red: 80/255, green: 200/255, blue: 130/255)
    static let danger = Color(red: 235/255, green: 80/255, blue: 90/255)
}

/// App-wide animated radial backdrop used behind every screen.
struct AppBackground: View {
    var body: some View {
        ZStack {
            Color.bgBase.ignoresSafeArea()

            // Warm radial glow center-bottom
            RadialGradient(
                colors: [Color.bgAccent.opacity(0.95), Color.bgBase.opacity(0)],
                center: .init(x: 0.5, y: 0.85),
                startRadius: 20,
                endRadius: 480
            )
            .ignoresSafeArea()

            // Subtle amber spotlight top-trailing
            RadialGradient(
                colors: [Color.amberAccent.opacity(0.18), .clear],
                center: .init(x: 0.95, y: 0.05),
                startRadius: 10,
                endRadius: 260
            )
            .ignoresSafeArea()
            .blendMode(.plusLighter)
        }
    }
}

struct GlassCard: ViewModifier {
    var cornerRadius: CGFloat = 20
    func body(content: Content) -> some View {
        content
            .background(
                ZStack {
                    Color.black.opacity(0.35)
                    LinearGradient(
                        colors: [Color.white.opacity(0.05), .clear],
                        startPoint: .top, endPoint: .bottom
                    )
                }
            )
            .clipShape(.rect(cornerRadius: cornerRadius))
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius)
                    .stroke(Color.glassStroke, lineWidth: 1)
            )
            .shadow(color: .black.opacity(0.4), radius: 18, x: 0, y: 10)
    }
}

extension View {
    func glassCard(cornerRadius: CGFloat = 20) -> some View {
        modifier(GlassCard(cornerRadius: cornerRadius))
    }
}

/// A press-to-scale + haptic button style used for primary CTAs.
struct AmberButtonStyle: ButtonStyle {
    var prominent: Bool = true
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 16, weight: .bold, design: .rounded))
            .foregroundStyle(prominent ? Color.white : Color.amberAccent)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(
                ZStack {
                    if prominent {
                        LinearGradient(
                            colors: [Color.amberGlow, Color.amberAccent, Color.amberDeep],
                            startPoint: .topLeading, endPoint: .bottomTrailing
                        )
                    } else {
                        Color.white.opacity(0.06)
                    }
                }
            )
            .clipShape(.rect(cornerRadius: 16))
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .stroke(prominent ? Color.white.opacity(0.25) : Color.amberAccent.opacity(0.3), lineWidth: 1)
            )
            .shadow(color: prominent ? Color.amberAccent.opacity(0.45) : .clear, radius: 18, y: 8)
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(.spring(response: 0.28, dampingFraction: 0.7), value: configuration.isPressed)
    }
}

/// Subtle chip / pill style for secondary toggles.
struct ChipStyle: ViewModifier {
    var isSelected: Bool
    func body(content: Content) -> some View {
        content
            .font(.system(size: 13, weight: .semibold, design: .rounded))
            .foregroundStyle(isSelected ? Color.white : Color.textSecondary)
            .padding(.horizontal, 14)
            .padding(.vertical, 8)
            .background(
                Capsule().fill(isSelected ? Color.amberAccent : Color.white.opacity(0.06))
            )
            .overlay(
                Capsule().stroke(isSelected ? Color.clear : Color.white.opacity(0.10), lineWidth: 1)
            )
    }
}

extension View {
    func chip(isSelected: Bool) -> some View { modifier(ChipStyle(isSelected: isSelected)) }
}
