import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatsProvider } from "./contexts/ChatsContext";
import { PresenceProvider } from "./contexts/PresenceContext";
import { CoursesProvider } from "./contexts/CoursesContext";
import { PostsProvider } from "./contexts/PostsContext";
import { ArenaProvider } from "./contexts/ArenaContext";
import { CallProvider } from "./contexts/CallContext";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "./styles/theme.css";
import AppGate from "./app/components/AppGate";
import CallOverlays from "./app/components/CallOverlays";
import MeetCallHost from "./app/components/MeetCallHost";
import AppRoutes from "./app/routes/AppRoutes";
import RouteMetadataManager from "./app/components/RouteMetadataManager";

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider>
          <AppGate>
            <Toaster
              position="top-center"
              gutter={10}
              containerStyle={{
                zIndex: 99999,
                top: "calc(env(safe-area-inset-top, 0px) + 10px)",
                left: "max(10px, env(safe-area-inset-left, 0px))",
                right: "max(10px, env(safe-area-inset-right, 0px))",
              }}
              toastOptions={{
                style: {
                  marginTop: 0,
                },
              }}
            />
            <ChatsProvider>
              <RouteMetadataManager />
              <PresenceProvider>
                <CallProvider>
                  <CoursesProvider>
                    <ArenaProvider>
                      <PostsProvider>
                        <CallOverlays />
                        <MeetCallHost />
                        <AppRoutes />
                      </PostsProvider>
                    </ArenaProvider>
                  </CoursesProvider>
                </CallProvider>
              </PresenceProvider>
            </ChatsProvider>
          </AppGate>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
