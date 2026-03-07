import axiosInstance from "./axiosInstance";

// --- Feed ---
export const fetchFeed = async (type = "foryou", page = 1, limit = 10) => {
  const { data } = await axiosInstance.get(
    `/posts/feed?type=${type}&page=${page}&limit=${limit}`,
  );
  return data;
};

// --- Posts CRUD ---
export const createPost = async (content) => {
  const { data } = await axiosInstance.post("/posts", { content });
  return data;
};

export const updatePost = async (postId, content) => {
  const { data } = await axiosInstance.patch(`/posts/${postId}`, { content });
  return data;
};

export const deletePost = async (postId) => {
  await axiosInstance.delete(`/posts/${postId}`);
};

// --- Interactions ---
export const likePost = async (postId) => {
  const { data } = await axiosInstance.post(`/posts/${postId}/like`);
  return data;
};

export const viewPost = async (postId) => {
  const { data } = await axiosInstance.post(`/posts/${postId}/view`);
  return data;
};

// --- Comments ---
export const addComment = async ({ postId, content }) => {
  const { data } = await axiosInstance.post(`/posts/${postId}/comments`, {
    content,
  });
  return data;
};

export const addReply = async ({ postId, commentId, content, replyToUser }) => {
  const { data } = await axiosInstance.post(
    `/posts/${postId}/comments/${commentId}/reply`,
    { content, replyToUser },
  );
  return data;
};

export const getComments = async (postId, page = 1, limit = 10) => {
  const { data } = await axiosInstance.get(
    `/posts/${postId}/comments?page=${page}&limit=${limit}`,
  );
  return data;
};

// --- User posts ---
export const fetchUserPosts = async (userId) => {
  const { data } = await axiosInstance.get(`/posts/user/${userId}`);
  return data;
};

export const fetchLikedPosts = async () => {
  const { data } = await axiosInstance.get("/posts/liked");
  return data;
};

// --- Follow ---
export const toggleFollow = async (userId) => {
  const { data } = await axiosInstance.post(`/users/${userId}/follow`);
  return data;
};

// --- Profile ---
export const getPublicProfile = async (userId) => {
  const { data } = await axiosInstance.get(`/users/${userId}/profile`);
  return data;
};
