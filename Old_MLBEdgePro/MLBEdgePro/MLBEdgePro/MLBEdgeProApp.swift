//
//  MLBEdgeProApp.swift
//  MLBEdgePro
//
//  Created by Andres Marte on 5/18/26.
//

import SwiftUI

@main
struct MLBEdgeApp: App {
    @State private var app = AppState()
    @State private var api = APIClient.shared

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(app)
                .environment(api)
                .preferredColorScheme(.dark)
                .tint(.amberAccent)
        }
    }
}
