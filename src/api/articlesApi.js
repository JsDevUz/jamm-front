import axiosInstance from "./axiosInstance";

export const fetchArticles = async (page = 1, limit = 20, sort = "newest") => {
  const { data } = await axiosInstance.get(
    `/articles?page=${page}&limit=${limit}&sort=${encodeURIComponent(sort)}`,
  );
  return data;
};

export const searchArticles = async (query, limit = 20) => {
  const { data } = await axiosInstance.get(
    `/articles/search?q=${encodeURIComponent(query)}&limit=${limit}`,
  );
  return data;
};

export const fetchUserArticles = async (identifier) => {
  const { data } = await axiosInstance.get(`/articles/user/${identifier}`);
  return data;
};

export const fetchLikedArticles = async () => {
  const { data } = await axiosInstance.get("/articles/liked");
  return data;
};

export const getArticle = async (articleId) => {
  const { data } = await axiosInstance.get(`/articles/${articleId}`);
  return data;
};

export const getArticleContent = async (articleId) => {
  const { data } = await axiosInstance.get(`/articles/${articleId}/content`);
  return data;
};

export const createArticle = async (payload) => {
  const { data } = await axiosInstance.post("/articles", payload);
  return data;
};

export const updateArticle = async (articleId, payload) => {
  const { data } = await axiosInstance.patch(`/articles/${articleId}`, payload);
  return data;
};

export const deleteArticle = async (articleId) => {
  const { data } = await axiosInstance.delete(`/articles/${articleId}`);
  return data;
};

export const likeArticle = async (articleId) => {
  const { data } = await axiosInstance.post(`/articles/${articleId}/like`);
  return data;
};

export const viewArticle = async (articleId) => {
  const { data } = await axiosInstance.post(`/articles/${articleId}/view`);
  return data;
};

export const getArticleComments = async (articleId, page = 1, limit = 10) => {
  const { data } = await axiosInstance.get(
    `/articles/${articleId}/comments?page=${page}&limit=${limit}`,
  );
  return data;
};

export const addArticleComment = async ({ articleId, content }) => {
  const { data } = await axiosInstance.post(`/articles/${articleId}/comments`, {
    content,
  });
  return data;
};

export const addArticleReply = async ({
  articleId,
  commentId,
  content,
  replyToUser,
}) => {
  const { data } = await axiosInstance.post(
    `/articles/${articleId}/comments/${commentId}/reply`,
    {
      content,
      replyToUser,
    },
  );
  return data;
};

export const uploadArticleImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axiosInstance.post("/articles/upload-image", formData);
  return data;
};
