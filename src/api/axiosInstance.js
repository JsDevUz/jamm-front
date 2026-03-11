import axios from "axios";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import usePremiumUpgradeModalStore from "../app/store/usePremiumUpgradeModalStore";
import { API_BASE_URL } from "../config/env";

const PREMIUM_LIMIT_ERROR_PATTERN =
  /premium|tarif|maksimal|limit|obuna/i;

const isPublicArenaPath = () =>
  typeof window !== "undefined" &&
  window.location.pathname.startsWith("/arena");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
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
