import React from "react";
import { useLocation } from "react-router-dom";
import {
  SystemLoadingScreen,
  SystemStateScreen,
} from "./SystemStateScreen";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const initialStatus = {
  loading: true,
  maintenanceMode: false,
  maintenanceMessage: "",
};

export default function AppGate({ children }) {
  const [status, setStatus] = React.useState(initialStatus);
  const location = useLocation();

  React.useEffect(() => {
    let cancelled = false;

    const loadStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/app/status`, {
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

  if (location.pathname === "/blocked") {
    return (
      <SystemStateScreen
        title="Hisob bloklangan"
        description="Hisobingiz bloklangan. Qo'llab-quvvatlash bilan bog'laning."
      />
    );
  }

  if (status.loading) {
    return <SystemLoadingScreen />;
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
