import axiosInstance from "./axiosInstance";

export const fetchBlogs = async (page = 1, limit = 20) => {
  const { data } = await axiosInstance.get(
    `/blogs?page=${page}&limit=${limit}`,
  );
  return data;
};

export const fetchUserBlogs = async (identifier) => {
  const { data } = await axiosInstance.get(`/blogs/user/${identifier}`);
  return data;
};

export const fetchLikedBlogs = async () => {
  const { data } = await axiosInstance.get("/blogs/liked");
  return data;
};

export const getBlog = async (blogId) => {
  const { data } = await axiosInstance.get(`/blogs/${blogId}`);
  return data;
};

export const getBlogContent = async (blogId) => {
  const { data } = await axiosInstance.get(`/blogs/${blogId}/content`);
  return data;
};

export const createBlog = async (payload) => {
  const { data } = await axiosInstance.post("/blogs", payload);
  return data;
};

export const updateBlog = async (blogId, payload) => {
  const { data } = await axiosInstance.patch(`/blogs/${blogId}`, payload);
  return data;
};

export const deleteBlog = async (blogId) => {
  const { data } = await axiosInstance.delete(`/blogs/${blogId}`);
  return data;
};

export const likeBlog = async (blogId) => {
  const { data } = await axiosInstance.post(`/blogs/${blogId}/like`);
  return data;
};

export const viewBlog = async (blogId) => {
  const { data } = await axiosInstance.post(`/blogs/${blogId}/view`);
  return data;
};

export const getBlogComments = async (blogId, page = 1, limit = 10) => {
  const { data } = await axiosInstance.get(
    `/blogs/${blogId}/comments?page=${page}&limit=${limit}`,
  );
  return data;
};

export const addBlogComment = async ({ blogId, content }) => {
  const { data } = await axiosInstance.post(`/blogs/${blogId}/comments`, {
    content,
  });
  return data;
};

export const addBlogReply = async ({
  blogId,
  commentId,
  content,
  replyToUser,
}) => {
  const { data } = await axiosInstance.post(
    `/blogs/${blogId}/comments/${commentId}/reply`,
    {
      content,
      replyToUser,
    },
  );
  return data;
};

export const uploadBlogImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axiosInstance.post("/blogs/upload-image", formData);
  return data;
};
