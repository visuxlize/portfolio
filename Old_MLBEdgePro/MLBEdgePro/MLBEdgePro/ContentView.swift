
import SwiftUI

struct ContentView: View {
    var body: some View { RootView() }
}

#Preview {
    RootView()
        .environment(AppState())
        .environment(APIClient.shared)
        .preferredColorScheme(.dark)
}
