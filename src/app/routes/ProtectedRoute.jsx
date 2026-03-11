import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { SystemLoadingScreen } from "../components/SystemStateScreen";

export default function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const loading = useAuthStore((state) => state.loading);
  const bootstrapAuth = useAuthStore((state) => state.bootstrapAuth);
  const [showLoading, setShowLoading] = React.useState(false);

  React.useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  React.useEffect(() => {
    if (!loading || initialized) {
      setShowLoading(false);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowLoading(true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [initialized, loading]);

  if ((!initialized || loading) && showLoading) {
    return <SystemLoadingScreen />;
  }

  if (!initialized || loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
