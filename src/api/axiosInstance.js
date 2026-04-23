import axios from "axios";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import usePremiumUpgradeModalStore from "../app/store/usePremiumUpgradeModalStore";
import { API_BASE_URL } from "../config/env";
import i18n from "../i18n";

const PREMIUM_LIMIT_ERROR_PATTERN =
  /premium|tarif|maksimal|limit|obuna/i;
const APP_UNLOCK_TOKEN_KEY = "jamm-app-unlock-token";
const APP_LOCK_ARMED_KEY = "jamm-app-lock-armed";
const APP_LOCK_REQUIRED_EVENT = "jamm-app-lock-required";
const APP_LOCK_CLEARED_EVENT = "jamm-app-lock-cleared";
const APP_LOCK_TOAST_SHOWN_KEY = "jamm-app-lock-toast-shown";

const APP_LOCK_EXEMPT_PATHS = [
  "/auth/me",
  "/auth/logout",
  "/users/me/app-lock/verify",
  "/users/me/app-lock/logout-clear",
  "/users/me/app-lock/lock-session",
];

const isPublicArenaPath = () =>
  typeof window !== "undefined" &&
  (window.location.pathname.startsWith("/arena") ||
    window.location.pathname.startsWith("/join/"));

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const normalizePathname = (rawUrl = "") => {
  try {
    return new URL(rawUrl, API_BASE_URL).pathname;
  } catch {
    return String(rawUrl || "");
  }
};

const isAppLockExemptRequest = (config) => {
  const pathname = normalizePathname(config?.url);
  return APP_LOCK_EXEMPT_PATHS.some((path) => pathname.startsWith(path));
};

const isClientAppLocked = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const currentUser = useAuthStore.getState().user;
  if (!currentUser?.appLockEnabled) {
    return false;
  }

  return (
    sessionStorage.getItem(APP_LOCK_ARMED_KEY) === "1" ||
    currentUser?.appLockSessionUnlocked === false
  );
};

const waitForAppUnlock = () =>
  new Promise((resolve) => {
    if (typeof window === "undefined" || !isClientAppLocked()) {
      resolve();
      return;
    }

    const handleUnlock = () => {
      window.removeEventListener(APP_LOCK_CLEARED_EVENT, handleUnlock);
      resolve();
    };

    window.addEventListener(APP_LOCK_CLEARED_EVENT, handleUnlock);
  });

axiosInstance.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    if (isClientAppLocked() && !isAppLockExemptRequest(config)) {
      window.dispatchEvent(new CustomEvent(APP_LOCK_REQUIRED_EVENT));
      await waitForAppUnlock();
    }

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
      const { logout, user, initialized } = useAuthStore.getState();
      // Guest users (initialized but no user) should not be redirected to login
      if (initialized && !user) return Promise.reject(error);
      logout({ redirect: !isPublicArenaPath() });
    }

    if (status === 423 && error.response?.data?.message === "APP_LOCK_REQUIRED") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(APP_LOCK_ARMED_KEY, "1");
        window.dispatchEvent(new CustomEvent(APP_LOCK_REQUIRED_EVENT));
        if (sessionStorage.getItem(APP_LOCK_TOAST_SHOWN_KEY) !== "1") {
          sessionStorage.setItem(APP_LOCK_TOAST_SHOWN_KEY, "1");
          toast.error(i18n.t("profileUtility.security.unlockRequiredToast"));
        }
      }
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
