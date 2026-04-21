import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GlobalSearchPage from "../../features/search/GlobalSearchPage";
import useAuthStore from "../../store/authStore";
const AuthPage = lazy(() => import("../../pages/AuthPage"));
const JoinCallPage = lazy(() => import("../../pages/JoinCallPage"));
const LandingPage = lazy(() => import("../../pages/LandingPage"));
const AppWrapper = lazy(() => import("./AppWrapper"));
const SlugResolver = lazy(() => import("./SlugResolver"));
const TeacherPage = lazy(() => import("../../pages/TeacherPage"));
const CoursePreviewPage = lazy(() => import("../../pages/CoursePreviewPage"));

// Public-only route component - redirects authenticated users to courses
const PublicRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  
  if (!initialized) {
    return null; // or a loading spinner
  }
  
  if (user) {
    return <Navigate to="/courses" replace />;
  }
  
  return children;
};

export default function AppRoutes() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <Suspense fallback={null}>
      <Routes location={backgroundLocation || location}>
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
              <Navigate to="/courses" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Navigate to="/courses" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <AppWrapper forcedNav="courses" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses/:resourceId"
          element={
            <ProtectedRoute>
              <AppWrapper forcedNav="courses" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses/:resourceId/:lessonId"
          element={
            <ProtectedRoute>
              <AppWrapper forcedNav="courses" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <AppWrapper forcedNav="home" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:resourceId"
          element={
            <ProtectedRoute>
              <CoursePreviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:resourceId/:lessonId"
          element={
            <ProtectedRoute>
              <CoursePreviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <TeacherPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses"
          element={
            <ProtectedRoute>
              <TeacherPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses/:courseId"
          element={
            <ProtectedRoute>
              <TeacherPage />
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
      {backgroundLocation ? (
        <Routes>
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <GlobalSearchPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      ) : null}
    </Suspense>
  );
}
