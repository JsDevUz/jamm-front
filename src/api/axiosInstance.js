import axios from "axios";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
      logout();
      window.location.href = "/login";
    }

    if (status === 429) {
      toast.error(
        "Siz juda ko'p so'rov yubordingiz. Iltimos birozdan so'ng urinib ko'ring.",
      );
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
