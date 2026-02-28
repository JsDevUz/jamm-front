import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import JammLayout from "./components/JammLayout";
import ServerPage from "./pages/ServerPage";
import AuthPage from "./pages/AuthPage";
import JoinCallPage from "./pages/JoinCallPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatsProvider, useChats } from "./contexts/ChatsContext";
import { PresenceProvider } from "./contexts/PresenceContext";
import { CoursesProvider } from "./contexts/CoursesContext";
import "./App.css";
import "./styles/theme.css";

// Auth guard — redirects to /login if no token
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function SlugResolver() {
  const { nav } = useParams();
  const navigate = useNavigate();
  const { resolveChatSlug } = useChats();

  React.useEffect(() => {
    // List of known internal nav routes that should NOT be resolved as slugs
    const knownRoutes = [
      "home",
      "users",
      "groups",
      "a",
      "channels",
      "courses",
      "meets",
      "login",
      "register",
      "join",
    ];

    if (!nav || knownRoutes.includes(nav)) {
      return; // Handle normally
    }

    // Try resolving the slug as a username or privateurl
    resolveChatSlug(nav)
      .then((res) => {
        if (res && res.jammId) {
          navigate(`/a/${res.jammId}`, { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      })
      .catch((err) => {
        console.error("Slug resolution failed:", err.message);
        navigate("/home", { replace: true });
      });
  }, [nav, navigate, resolveChatSlug]);

  return <AppWrapper />;
}

// Wrapper component to handle URL params
function AppWrapper() {
  const { nav, channelId } = useParams();
  const navigate = useNavigate();

  return (
    <JammLayout
      initialNav={nav || "home"}
      initialChannel={channelId || "0"}
      navigate={navigate}
    />
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ChatsProvider>
          <PresenceProvider>
            <CoursesProvider>
              <Routes>
                {/* Public routes — no login required */}
                <Route path="/login" element={<AuthPage />} />
                <Route path="/join/:roomId" element={<JoinCallPage />} />

                {/* Protected routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <ServerPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/:nav"
                  element={
                    <ProtectedRoute>
                      <SlugResolver />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/:nav/:channelId"
                  element={
                    <ProtectedRoute>
                      <AppWrapper />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </CoursesProvider>
          </PresenceProvider>
        </ChatsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
