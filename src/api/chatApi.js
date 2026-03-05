import axiosInstance from "./axiosInstance";

// --- Avatar ---
export const uploadAvatar = async (formData) => {
  const { data } = await axiosInstance.post("/chats/upload-avatar", formData);
  return data;
};

export const updateGroupAvatar = async ({ chatId, formData }) => {
  const { data } = await axiosInstance.post(
    `/chats/${chatId}/avatar`,
    formData,
  );
  return data;
};

// --- Chats CRUD ---
export const fetchChats = async () => {
  const { data } = await axiosInstance.get("/chats");
  return data;
};

export const createChat = async (dto) => {
  const { data } = await axiosInstance.post("/chats", dto);
  return data;
};

export const editChat = async ({ chatId, dto }) => {
  const { data } = await axiosInstance.patch(`/chats/${chatId}`, dto);
  return data;
};

// --- Messages ---
export const fetchMessages = async (chatId, page = 1, limit = 30) => {
  const { data } = await axiosInstance.get(
    `/chats/${chatId}/messages?page=${page}&limit=${limit}`,
  );
  return data;
};

export const sendMessage = async ({ chatId, content, replayToId }) => {
  const { data } = await axiosInstance.post(`/chats/${chatId}/messages`, {
    content,
    replayToId,
  });
  return data;
};

export const deleteMessage = async (messageId) => {
  await axiosInstance.delete(`/chats/messages/${messageId}`);
};

// --- Chat resolution & groups ---
export const resolveChatSlug = async (slug) => {
  const { data } = await axiosInstance.get(`/chats/resolve/${slug}`);
  return data;
};

export const previewGroupChat = async (slug) => {
  const { data } = await axiosInstance.get(`/chats/preview/${slug}`);
  return data;
};

export const joinGroupChat = async (slug) => {
  const { data } = await axiosInstance.post(`/chats/${slug}/join-link`);
  return data;
};

// --- Users ---
export const searchUsers = async (query) => {
  const { data } = await axiosInstance.get(`/users/search?q=${query}`);
  return data;
};

export const getUserByUsername = async (username) => {
  const { data } = await axiosInstance.get(`/users/by-username/${username}`);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

export const getPublicProfile = async (identifier) => {
  const { data } = await axiosInstance.get(`/users/${identifier}/profile`);
  return data;
};
