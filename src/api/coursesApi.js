import axiosInstance from "./axiosInstance";

// --- Courses CRUD ---
export const fetchCourses = async (page = 1, limit = 15) => {
  const { data } = await axiosInstance.get(
    `/courses?page=${page}&limit=${limit}`,
  );
  return data;
};

export const createCourse = async (payload) => {
  const { data } = await axiosInstance.post("/courses", payload);
  return data;
};

export const removeCourse = async (courseId) => {
  await axiosInstance.delete(`/courses/${courseId}`);
};

// --- Lessons ---
export const addLesson = async ({ courseId, ...lessonData }) => {
  await axiosInstance.post(`/courses/${courseId}/lessons`, lessonData);
};

export const removeLesson = async ({ courseId, lessonId }) => {
  await axiosInstance.delete(`/courses/${courseId}/lessons/${lessonId}`);
};

// --- Comments ---
export const getLessonComments = async (
  courseId,
  lessonId,
  page = 1,
  limit = 15,
) => {
  const { data } = await axiosInstance.get(
    `/courses/${courseId}/lessons/${lessonId}/comments?page=${page}&limit=${limit}`,
  );
  return data;
};

export const addComment = async ({ courseId, lessonId, text }) => {
  await axiosInstance.post(
    `/courses/${courseId}/lessons/${lessonId}/comments`,
    { text },
  );
};

export const addReply = async ({ courseId, lessonId, commentId, text }) => {
  await axiosInstance.post(
    `/courses/${courseId}/lessons/${lessonId}/comments/${commentId}/replies`,
    { text },
  );
};

// --- Enrollment ---
export const enrollInCourse = async (courseId) => {
  await axiosInstance.post(`/courses/${courseId}/enroll`);
};

export const approveUser = async ({ courseId, userId }) => {
  await axiosInstance.patch(`/courses/${courseId}/members/${userId}/approve`);
};

export const removeUser = async ({ courseId, userId }) => {
  await axiosInstance.delete(`/courses/${courseId}/members/${userId}`);
};

// --- Views ---
export const incrementViews = async ({ courseId, lessonId }) => {
  await axiosInstance.patch(`/courses/${courseId}/lessons/${lessonId}/views`);
};

export const toggleLessonLike = async ({ courseId, lessonId }) => {
  const { data } = await axiosInstance.post(
    `/courses/${courseId}/lessons/${lessonId}/like`,
  );
  return data;
};

export const fetchLikedLessons = async () => {
  const { data } = await axiosInstance.get("/courses/liked-lessons");
  return data;
};

export const getLessonPlaybackToken = async (courseId, lessonId) => {
  const { data } = await axiosInstance.get(
    `/courses/${courseId}/lessons/${lessonId}/playback-token`,
  );
  return data;
};
