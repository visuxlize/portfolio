//
//  RootView.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import SwiftUI

struct RootView: View {
    @Environment(AppState.self) private var app

    var body: some View {
        ZStack {
            switch app.phase {
            case .splash:
                SplashView()
                    .transition(.opacity)
            case .auth:
                AuthView()
                    .transition(.opacity.combined(with: .move(edge: .bottom)))
            case .teamPicker:
                TeamPickerView()
                    .transition(.opacity.combined(with: .move(edge: .trailing)))
            case .home:
                HomeTabView()
                    .transition(.opacity)
            }
        }
        .animation(.spring(response: 0.55, dampingFraction: 0.85), value: app.phase)
    }
}

// MARK: - Splash

struct SplashView: View {
    @Environment(AppState.self) private var app
    @State private var pulse = false
    @State private var rotate = false

    var body: some View {
        ZStack {
            AppBackground()

            VStack(spacing: 24) {
                ZStack {
                    Circle()
                        .fill(
                            RadialGradient(
                                colors: [Color.amberAccent.opacity(0.55), .clear],
                                center: .center, startRadius: 5, endRadius: 180
                            )
                        )
                        .frame(width: 320, height: 320)
                        .scaleEffect(pulse ? 1.05 : 0.9)
                        .blur(radius: 4)

                    Image(systemName: "baseball.fill")
                        .font(.system(size: 96, weight: .black))
                        .foregroundStyle(
                            LinearGradient(colors: [.amberGlow, .amberAccent, .amberDeep],
                                           startPoint: .top, endPoint: .bottom)
                        )
                        .shadow(color: .amberAccent.opacity(0.7), radius: 24)
                        .rotationEffect(.degrees(rotate ? 360 : 0))
                }

                VStack(spacing: 6) {
                    Text("MLB EDGE")
                        .font(.system(size: 34, weight: .black, design: .rounded))
                        .tracking(6)
                        .foregroundStyle(.white)
                    Text("Find the value. Beat the book.")
                        .font(.system(size: 13, weight: .medium, design: .rounded))
                        .foregroundStyle(Color.textSecondary)
                        .tracking(1.2)
                }
                .opacity(pulse ? 1 : 0.4)
            }
        }
        .onAppear {
            withAnimation(.easeInOut(duration: 1.6).repeatForever(autoreverses: true)) { pulse = true }
            withAnimation(.linear(duration: 14).repeatForever(autoreverses: false)) { rotate = true }
            Task {
                try? await Task.sleep(for: .seconds(1.7))
                app.bootSplashFinished()
            }
        }
    }
}
