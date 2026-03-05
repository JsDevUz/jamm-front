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
import { PostsProvider } from "./contexts/PostsContext";
import { ArenaProvider } from "./contexts/ArenaContext";
import { CallProvider, useCall } from "./contexts/CallContext";
import IncomingCallRequest from "./components/IncomingCallRequest";
import OutgoingCallRequest from "./components/OutgoingCallRequest";
import PrivateVideoCall from "./components/PrivateVideoCall";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "./styles/theme.css";
import useAuthStore from "./store/authStore";

function CallComponents() {
  const {
    incomingCall,
    outgoingCall,
    activeCall,
    acceptCall,
    rejectCall,
    cancelCall,
    endActiveCall,
  } = useCall();

  return (
    <>
      {incomingCall && (
        <IncomingCallRequest
          isOpen={!!incomingCall}
          caller={incomingCall.fromUser}
          onAccept={acceptCall}
          onReject={rejectCall}
        />
      )}
      {outgoingCall && (
        <OutgoingCallRequest
          isOpen={!!outgoingCall}
          target={outgoingCall.targetUser}
          onCancel={cancelCall}
        />
      )}
      {activeCall && (
        <PrivateVideoCall
          isOpen={!!activeCall}
          roomId={activeCall.roomId}
          remoteUser={activeCall.remoteUser}
          isCaller={activeCall.isCaller}
          onClose={endActiveCall}
        />
      )}
    </>
  );
}

// Auth guard — redirects to /login if no token
function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function SlugResolver() {
  const { nav, channelId } = useParams();
  const navigate = useNavigate();
  const { resolveChatSlug } = useChats();
  const [isResolving, setIsResolving] = React.useState(false);

  const knownRoutes = [
    "home",
    "feed",
    "chats",
    "users",
    "groups",
    "channels",
    "courses",
    "arena",
    "meets",
    "profile",
    "login",
    "register",
    "join",
  ];

  React.useEffect(() => {
    // Determine which slug to resolve:
    // - /a/:channelId route → nav is undefined, channelId has the slug
    // - /:nav route → nav has the slug (if unknown), channelId is undefined
    let slugToResolve;

    if (!nav && channelId) {
      // We're on the /a/:channelId route
      slugToResolve = channelId;
    } else if (nav && !knownRoutes.includes(nav) && nav !== "a") {
      // We're on /:nav with an unknown nav value → treat as slug
      slugToResolve = nav;
    } else {
      // Known route (chats, users, groups, etc.) — render AppWrapper normally
      return;
    }

    setIsResolving(true);

    resolveChatSlug(slugToResolve)
      .then((res) => {
        if (res && res.jammId) {
          const target =
            res.type === "group" || res.isGroup
              ? `/groups/${res.jammId}`
              : `/users/${res.jammId}`;
          navigate(target, { replace: true });
        } else {
          navigate("/home", { replace: true });
          setIsResolving(false);
        }
      })
      .catch(() => {
        navigate("/home", { replace: true });
        setIsResolving(false);
      });
  }, [nav, channelId, navigate, resolveChatSlug]);

  if (isResolving) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      >
        Yuklanmoqda...
      </div>
    );
  }

  return <AppWrapper />;
}

// Wrapper component to handle URL params
function AppWrapper({ forcedNav }) {
  const { nav, channelId, lessonId } = useParams();
  const navigate = useNavigate();

  return (
    <JammLayout
      initialNav={forcedNav || nav || "feed"}
      initialChannel={channelId || "0"}
      initialLesson={lessonId}
      navigate={navigate}
    />
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Toaster position="top-center" containerStyle={{ zIndex: 99999 }} />
        <ChatsProvider>
          <PresenceProvider>
            <CallProvider>
              <CoursesProvider>
                <ArenaProvider>
                  <PostsProvider>
                    <CallComponents />
                    <Routes>
                      {/* Public routes — no login required */}
                      <Route path="/login" element={<AuthPage />} />
                      <Route path="/join/:roomId" element={<JoinCallPage />} />

                      {/* Publicly accessible Arena routes (for guests) */}
                      <Route
                        path="/arena"
                        element={<AppWrapper forcedNav="arena" />}
                      />
                      <Route
                        path="/arena/:channelId"
                        element={<AppWrapper forcedNav="arena" />}
                      />
                      <Route
                        path="/arena/:channelId/:lessonId"
                        element={<AppWrapper forcedNav="arena" />}
                      />
                      <Route
                        path="/arena/quiz/:channelId"
                        element={<AppWrapper forcedNav="arena" />}
                      />
                      <Route
                        path="/arena/quiz/:channelId/:lessonId"
                        element={<AppWrapper forcedNav="arena" />}
                      />

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
                        path="/a/:channelId"
                        element={
                          <ProtectedRoute>
                            <SlugResolver />
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
                      <Route
                        path="/:nav/:channelId/:lessonId"
                        element={
                          <ProtectedRoute>
                            <AppWrapper />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </PostsProvider>
                </ArenaProvider>
              </CoursesProvider>
            </CallProvider>
          </PresenceProvider>
        </ChatsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
