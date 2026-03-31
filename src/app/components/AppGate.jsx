import React from "react";
import { useLocation } from "react-router-dom";
import useProfileDecorationsStore from "../../store/profileDecorationsStore";
import useAuthStore from "../../store/authStore";
import { API_BASE_URL } from "../../config/env";
import {
  SystemLoadingScreen,
  SystemStateScreen,
} from "./SystemStateScreen";

const initialStatus = {
  loading: true,
  maintenanceMode: false,
  maintenanceMessage: "",
};

export default function AppGate({ children }) {
  const [status, setStatus] = React.useState(initialStatus);
  const [showLoading, setShowLoading] = React.useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const authLoading = useAuthStore((state) => state.loading);
  const bootstrapAuth = useAuthStore((state) => state.bootstrapAuth);
  const fetchDecorations = useProfileDecorationsStore(
    (state) => state.fetchDecorations,
  );

  React.useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  React.useEffect(() => {
    let cancelled = false;

    const loadStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/app/status`, {
          credentials: "include",
        });
        const data = await response.json();

        if (!cancelled) {
          setStatus({
            loading: false,
            maintenanceMode: Boolean(data?.maintenanceMode),
            maintenanceMessage: data?.maintenanceMessage || "",
          });
        }
      } catch {
        if (!cancelled) {
          setStatus({
            loading: false,
            maintenanceMode: false,
            maintenanceMessage: "",
          });
        }
      }
    };

    loadStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    if (!user?._id && !user?.id) return;
    fetchDecorations();
  }, [fetchDecorations, user?._id, user?.id]);

  React.useEffect(() => {
    if (!status.loading) {
      setShowLoading(false);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowLoading(true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [status.loading]);

  if (location.pathname === "/blocked") {
    return (
      <SystemStateScreen
        title="Hisob bloklangan"
        description="Hisobingiz bloklangan. Qo'llab-quvvatlash bilan bog'laning."
      />
    );
  }

  if ((status.loading || !initialized || authLoading) && showLoading) {
    return <SystemLoadingScreen />;
  }

  if (status.loading || !initialized || authLoading) {
    return null;
  }

  if (location.pathname === "/maintenance" || status.maintenanceMode) {
    return (
      <SystemStateScreen
        title="Texnik ishlar olib borilmoqda"
        description={
          status.maintenanceMessage ||
          "Iltimos, birozdan keyin qayta urinib ko'ring."
        }
      />
    );
  }

  return children;
}
