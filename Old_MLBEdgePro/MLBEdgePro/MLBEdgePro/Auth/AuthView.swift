//
//  AuthView.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import SwiftUI

struct AuthView: View {
    @Environment(AppState.self) private var app
    @State private var isLogin: Bool = true
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var showError: Bool = false
    @FocusState private var focused: Field?

    enum Field { case email, password }

    var body: some View {
        ZStack {
            AppBackground()

            ScrollView {
                VStack(spacing: 28) {
                    Spacer().frame(height: 40)

                    // Hero
                    ZStack {
                        Circle()
                            .fill(RadialGradient(colors: [.amberAccent.opacity(0.5), .clear],
                                                 center: .center, startRadius: 4, endRadius: 140))
                            .frame(width: 240, height: 240)
                            .blur(radius: 6)

                        Image(systemName: "baseball.fill")
                            .font(.system(size: 78, weight: .black))
                            .foregroundStyle(
                                LinearGradient(colors: [.amberGlow, .amberAccent, .amberDeep],
                                               startPoint: .top, endPoint: .bottom)
                            )
                            .shadow(color: .amberAccent.opacity(0.6), radius: 24)
                    }
                    .frame(height: 160)

                    VStack(spacing: 6) {
                        Text(isLogin ? "Welcome Back" : "Create Account")
                            .font(.system(size: 30, weight: .black, design: .rounded))
                            .foregroundStyle(.white)
                        Text(isLogin ? "Sign in to access today's edges." : "Build your edge — start in seconds.")
                            .font(.system(size: 14, weight: .medium, design: .rounded))
                            .foregroundStyle(Color.textSecondary)
                            .multilineTextAlignment(.center)
                    }

                    VStack(spacing: 14) {
                        AuthField(icon: "envelope.fill",
                                  placeholder: "Email",
                                  text: $email,
                                  keyboard: .emailAddress,
                                  isSecure: false)
                            .focused($focused, equals: .email)
                            .submitLabel(.next)
                            .onSubmit { focused = .password }

                        AuthField(icon: "lock.fill",
                                  placeholder: "Password",
                                  text: $password,
                                  keyboard: .default,
                                  isSecure: true)
                            .focused($focused, equals: .password)
                            .submitLabel(.go)
                            .onSubmit(submit)

                        if showError {
                            Text("Enter a valid email and a password (6+ chars).")
                                .font(.caption)
                                .foregroundStyle(Color.danger)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .transition(.opacity)
                        }
                    }

                    Button(action: submit) {
                        HStack(spacing: 10) {
                            Text(isLogin ? "Sign In" : "Create Account")
                            Image(systemName: "arrow.right")
                        }
                    }
                    .buttonStyle(AmberButtonStyle())

                    HStack(spacing: 6) {
                        Text(isLogin ? "Don't have an account?" : "Already a member?")
                            .foregroundStyle(Color.textSecondary)
                        Button {
                            Haptics.selection()
                            withAnimation(.spring) { isLogin.toggle() }
                        } label: {
                            Text(isLogin ? "Sign Up" : "Sign In")
                                .foregroundStyle(Color.amberAccent)
                                .fontWeight(.semibold)
                        }
                    }
                    .font(.system(size: 14, weight: .medium, design: .rounded))

                    Spacer(minLength: 30)
                }
                .padding(.horizontal, 22)
            }
            .scrollDismissesKeyboard(.interactively)
        }
    }

    private func submit() {
        guard email.contains("@"), email.contains("."), password.count >= 6 else {
            withAnimation { showError = true }
            Haptics.error()
            return
        }
        Haptics.success()
        app.signIn(email: email)
    }
}

private struct AuthField: View {
    let icon: String
    let placeholder: String
    @Binding var text: String
    let keyboard: UIKeyboardType
    let isSecure: Bool

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 15, weight: .semibold))
                .foregroundStyle(Color.amberAccent)
                .frame(width: 22)

            Group {
                if isSecure {
                    SecureField("", text: $text, prompt: Text(placeholder).foregroundStyle(Color.textTertiary))
                } else {
                    TextField("", text: $text, prompt: Text(placeholder).foregroundStyle(Color.textTertiary))
                        .keyboardType(keyboard)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                }
            }
            .foregroundStyle(.white)
            .font(.system(size: 16, weight: .medium, design: .rounded))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 16)
        .glassCard(cornerRadius: 14)
    }
}
