import React from "react";
import { Route, Routes } from "react-router-dom";
import ServerPage from "../../pages/ServerPage";
import AuthPage from "../../pages/AuthPage";
import JoinCallPage from "../../pages/JoinCallPage";
import ProtectedRoute from "./ProtectedRoute";
import AppWrapper from "./AppWrapper";
import SlugResolver from "./SlugResolver";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/maintenance" element={null} />
      <Route path="/blocked" element={null} />

      <Route path="/login" element={<AuthPage />} />
      <Route path="/join/:roomId" element={<JoinCallPage />} />

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
            <ServerPage />
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
  );
}
