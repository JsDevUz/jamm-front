import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GlobalSearchPage from "../../features/search/GlobalSearchPage";
import useAuthStore from "../../store/authStore";
const AuthPage = lazy(() => import("../../pages/AuthPage"));
const JoinCallPage = lazy(() => import("../../pages/JoinCallPage"));
const LandingPage = lazy(() => import("../../pages/LandingPage"));
const AppWrapper = lazy(() => import("./AppWrapper"));
const SlugResolver = lazy(() => import("./SlugResolver"));

// Public-only route component - redirects authenticated users to chats
const PublicRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  
  if (!initialized) {
    return null; // or a loading spinner
  }
  
  if (user) {
    return <Navigate to="/chats" replace />;
  }
  
  return children;
};

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/maintenance" element={null} />
        <Route path="/blocked" element={null} />

        <Route 
          path="/" 
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } 
        />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/join/:roomId" element={<JoinCallPage />} />
        <Route path="/join-call/:roomId" element={<JoinCallPage />} />
        <Route
          path="/meets"
          element={
            <ProtectedRoute>
              <Navigate to="/users" replace />
            </ProtectedRoute>
          }
        />
        <Route path="/arena" element={<AppWrapper forcedNav="arena" />} />
        <Route path="/arena/:resourceId" element={<AppWrapper forcedNav="arena" />} />
        <Route
          path="/arena/:resourceId/:lessonId"
          element={<AppWrapper forcedNav="arena" />}
        />
        <Route
          path="/arena/quiz/:resourceId"
          element={<AppWrapper forcedNav="arena" />}
        />
        <Route
          path="/arena/quiz/:resourceId/:lessonId"
          element={<AppWrapper forcedNav="arena" />}
        />
        <Route
          path="/arena/quiz-link/:resourceId"
          element={<AppWrapper forcedNav="arena" />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/chats" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Navigate to="/chats" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/a/:chatId"
          element={
            <ProtectedRoute>
              <SlugResolver />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <GlobalSearchPage />
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
          path="/:nav/:resourceId"
          element={
            <ProtectedRoute>
              <AppWrapper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:nav/:resourceId/:lessonId"
          element={
            <ProtectedRoute>
              <AppWrapper />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
