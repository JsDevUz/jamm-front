import axiosInstance from "./axiosInstance";

export const fetchLivekitConfig = async () => {
  const { data } = await axiosInstance.get("/livekit/config");
  return data;
};

export const createLivekitToken = async (payload) => {
  const { data } = await axiosInstance.post("/livekit/token", payload);
  return data;
};
