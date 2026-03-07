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

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppGate>
          <Toaster position="top-center" containerStyle={{ zIndex: 99999 }} />
          <ChatsProvider>
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
  );
}

export default App;
