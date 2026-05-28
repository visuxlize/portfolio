//
//  HomeTabView.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import SwiftUI

struct HomeTabView: View {
    @State private var selection: Int = 0

    var body: some View {
        TabView(selection: $selection) {
            DashboardView()
                .tabItem { Label("Edges", systemImage: "chart.line.uptrend.xyaxis") }
                .tag(0)

            HistoryView()
                .tabItem { Label("History", systemImage: "clock.arrow.circlepath") }
                .tag(1)

            SettingsView()
                .tabItem { Label("Settings", systemImage: "gearshape.fill") }
                .tag(2)
        }
        .tint(.amberAccent)
        .onChange(of: selection) { _, _ in Haptics.selection() }
        .toolbarBackground(Color.bgBase.opacity(0.95), for: .tabBar)
        .toolbarBackground(.visible, for: .tabBar)
    }
}
