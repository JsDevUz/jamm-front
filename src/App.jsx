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
import { ChatsProvider } from "./contexts/ChatsContext";
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

// Wrapper component to handle URL params
function AppWrapper() {
  const { nav, channelId } = useParams();
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <ChatsProvider>
        <JammLayout
          initialNav={nav || "home"}
          initialChannel={channelId || "0"}
          navigate={navigate}
        />
      </ChatsProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
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
              <AppWrapper />
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
    </Router>
  );
}

export default App;
