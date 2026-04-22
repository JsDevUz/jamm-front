import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { SystemLoadingScreen } from "../components/SystemStateScreen";

export default function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const loading = useAuthStore((state) => state.loading);
  const bootstrapAuth = useAuthStore((state) => state.bootstrapAuth);

  React.useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  if (!initialized || loading) {
    return <SystemLoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
