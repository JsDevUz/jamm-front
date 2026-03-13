import axios from "axios";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import usePremiumUpgradeModalStore from "../app/store/usePremiumUpgradeModalStore";
import { API_BASE_URL } from "../config/env";
import i18n from "../i18n";

const PREMIUM_LIMIT_ERROR_PATTERN =
  /premium|tarif|maksimal|limit|obuna/i;
const APP_UNLOCK_TOKEN_KEY = "jamm-app-unlock-token";

const isPublicArenaPath = () =>
  typeof window !== "undefined" &&
  window.location.pathname.startsWith("/arena");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const unlockToken = sessionStorage.getItem(APP_UNLOCK_TOKEN_KEY);
    if (unlockToken) {
      config.headers = config.headers || {};
      config.headers["X-App-Unlock-Token"] = unlockToken;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const config = error.config;
    const status = error.response?.status;

    if (status === 401) {
      const { logout } = useAuthStore.getState();
      logout({ redirect: !isPublicArenaPath() });
    }

    if (status === 423 && error.response?.data?.message === "APP_LOCK_REQUIRED") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("jamm-app-lock-armed", "1");
        window.dispatchEvent(new CustomEvent("jamm-app-lock-required"));
      }
      toast.error(i18n.t("profileUtility.security.unlockRequiredToast"));
      return Promise.reject(error);
    }

    if (status === 423) {
      const { logout } = useAuthStore.getState();
      logout({ redirect: false });
      window.location.href = "/blocked";
    }

    if (status === 503 && window.location.pathname !== "/maintenance") {
      window.location.href = "/maintenance";
    }

    if (status === 429) {
      toast.error(
        "Siz juda ko'p so'rov yubordingiz. Iltimos birozdan so'ng urinib ko'ring.",
      );
    }

    if (
      status === 403 &&
      !config?._skipPremiumModal &&
      PREMIUM_LIMIT_ERROR_PATTERN.test(String(error.response?.data?.message || ""))
    ) {
      const { openPremiumUpgradeModal } = usePremiumUpgradeModalStore.getState();
      openPremiumUpgradeModal({
        message: String(error.response?.data?.message || ""),
        source: "server-403",
      });
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
