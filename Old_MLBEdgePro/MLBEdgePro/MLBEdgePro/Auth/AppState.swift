//
//  AppState.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import Foundation
import SwiftUI

@Observable
final class AppState {
    enum Phase: Equatable {
        case splash
        case auth
        case teamPicker
        case home
    }

    var phase: Phase = .splash

    // Auth (mock — local only)
    var email: String = ""
    var isAuthenticated: Bool = false

    // Favorite team
    var favoriteTeamId: Int?

    // Verified history (persisted to UserDefaults)
    var verifiedProps: [VerifiedProp] = []

    private let kAuth = "mlbedge.isAuthenticated"
    private let kEmail = "mlbedge.email"
    private let kFavorite = "mlbedge.favoriteTeamId"
    private let kHistory = "mlbedge.verifiedProps.v1"

    init() {
        load()
        if isAuthenticated {
            phase = favoriteTeamId == nil ? .teamPicker : .home
        }
    }

    func bootSplashFinished() {
        if isAuthenticated {
            phase = favoriteTeamId == nil ? .teamPicker : .home
        } else {
            phase = .auth
        }
    }

    func signIn(email: String) {
        self.email = email
        self.isAuthenticated = true
        persist()
        phase = favoriteTeamId == nil ? .teamPicker : .home
    }

    func signOut() {
        isAuthenticated = false
        email = ""
        persist()
        phase = .auth
    }

    func selectFavorite(_ team: MLBTeam) {
        favoriteTeamId = team.id
        persist()
        phase = .home
    }

    var favoriteTeam: MLBTeam? {
        guard let id = favoriteTeamId else { return nil }
        return MLBTeams.by(id: id)
    }

    // MARK: History

    func addOrUpdate(verified: VerifiedProp) {
        if let idx = verifiedProps.firstIndex(where: { $0.id == verified.id }) {
            verifiedProps[idx] = verified
        } else {
            verifiedProps.insert(verified, at: 0)
        }
        persistHistory()
    }

    func remove(verifiedId: String) {
        verifiedProps.removeAll { $0.id == verifiedId }
        persistHistory()
    }

    /// Lightweight "smarten" weight: ratio of correct outcomes among verified props.
    var modelAccuracy: Double {
        let verified = verifiedProps.filter { $0.outcome != .pending }
        guard !verified.isEmpty else { return 0 }
        let correct = verified.filter { $0.outcome == .correct }.count
        return Double(correct) / Double(verified.count)
    }

    var verifiedCount: Int { verifiedProps.filter { $0.outcome != .pending }.count }

    // MARK: Persistence

    private func load() {
        let d = UserDefaults.standard
        isAuthenticated = d.bool(forKey: kAuth)
        email = d.string(forKey: kEmail) ?? ""
        if d.object(forKey: kFavorite) != nil {
            favoriteTeamId = d.integer(forKey: kFavorite)
        }
        if let data = d.data(forKey: kHistory),
           let decoded = try? JSONDecoder().decode([VerifiedProp].self, from: data) {
            verifiedProps = decoded
        }
    }

    private func persist() {
        let d = UserDefaults.standard
        d.set(isAuthenticated, forKey: kAuth)
        d.set(email, forKey: kEmail)
        if let id = favoriteTeamId { d.set(id, forKey: kFavorite) } else { d.removeObject(forKey: kFavorite) }
    }

    private func persistHistory() {
        if let data = try? JSONEncoder().encode(verifiedProps) {
            UserDefaults.standard.set(data, forKey: kHistory)
        }
    }
}
