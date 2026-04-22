import axiosInstance from "./axiosInstance";

// --- Courses CRUD ---
export const fetchCourses = async (page = 1, limit = 15) => {
  const { data } = await axiosInstance.get(
    `/courses?page=${page}&limit=${limit}`,
  );
  return data;
};

export const getCourse = async (courseId) => {
  const { data } = await axiosInstance.get(`/courses/${courseId}`);
  return data;
};

export const searchCourses = async (query, limit = 20) => {
  const { data } = await axiosInstance.get(
    `/courses/search?q=${encodeURIComponent(query)}&limit=${limit}`,
  );
  return data;
};

export const createCourse = async (payload) => {
  const { data } = await axiosInstance.post("/courses", payload);
  return data;
};

export const updateCourse = async (courseId, payload) => {
  const { data } = await axiosInstance.patch(`/courses/${courseId}`, payload);
  return data;
};

export const uploadCourseImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axiosInstance.post("/courses/upload-image", formData);
  return data;
};

export const removeCourse = async (courseId) => {
  await axiosInstance.delete(`/courses/${courseId}`);
};

// --- Lessons ---
export const addLesson = async ({ courseId, ...lessonData }) => {
  const { data } = await axiosInstance.post(
    `/courses/${courseId}/lessons`,
    lessonData,
  );
  return data;
};

export const removeLesson = async ({ courseId, lessonId }) => {
  await axiosInstance.delete(`/courses/${courseId}/lessons/${lessonId}`);
};

export const updateLesson = async ({ courseId, lessonId, ...lessonData }) => {
  const { data } = await axiosInstance.patch(
    `/courses/${courseId}/lessons/${lessonId}`,
    lessonData,
  );
  return data;
};

export const publishLesson = async ({ courseId, lessonId }) => {
  const { data } = await axiosInstance.patch(
    `/courses/${courseId}/lessons/${lessonId}/publish`,
  );
  return data;
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

export const upsertLessonNote = async ({ courseId, lessonId, text }) => {
  const { data } = await axiosInstance.patch(
    `/courses/${courseId}/lessons/${lessonId}/note`,
    { text },
  );
  return data;
};

export const upsertCourseReview = async ({ courseId, rating, text }) => {
  const { data } = await axiosInstance.patch(`/courses/${courseId}/review`, {
    rating,
    text,
  });
  return data;
};

export const fetchLikedLessons = async () => {
  const { data } = await axiosInstance.get("/courses/liked-lessons");
  return data;
};

export const getLessonAttendance = async (courseId, lessonId) => {
  const { data } = await axiosInstance.get(
    `/courses/${courseId}/lessons/${lessonId}/attendance`,
  );
  return data;
};

export const markOwnAttendance = async ({
  courseId,
  lessonId,
  progressPercent,
  lastPositionSeconds,
  lessonDurationSeconds,
  watchIncrement,
}) => {
  const { data } = await axiosInstance.post(
    `/courses/${courseId}/lessons/${lessonId}/attendance/self`,
    {
      progressPercent,
      lastPositionSeconds,
      lessonDurationSeconds,
      watchIncrement,
    },
  );
  return data;
};

export const setLessonAttendanceStatus = async ({
  courseId,
  lessonId,
  userId,
  status,
}) => {
  const { data } = await axiosInstance.patch(
    `/courses/${courseId}/lessons/${lessonId}/attendance/${userId}`,
    { status },
  );
  return data;
};

export const getLessonHomework = async (courseId, lessonId) => {
  const { data } = await axiosInstance.get(
    `/courses/${courseId}/lessons/${lessonId}/homework`,
  );
  return data;
};

export const getLessonLinkedTests = async (courseId, lessonId) => {
  const { data } = await axiosInstance.get(
    `/courses/${courseId}/lessons/${lessonId}/tests`,
  );
  return data;
};

export const upsertLessonLinkedTest = async ({
  courseId,
  lessonId,
  ...payload
}) => {
  const { data } = await axiosInstance.patch(
    `/courses/${courseId}/lessons/${lessonId}/tests`,
    payload,
  );
  return data;
};

export const deleteLessonLinkedTest = async ({
  courseId,
  lessonId,
  linkedTestId,
}) => {
  const { data } = await axiosInstance.delete(
    `/courses/${courseId}/lessons/${lessonId}/tests/${linkedTestId}`,
  );
  return data;
};

export const submitLessonLinkedTestAttempt = async ({
  courseId,
  lessonId,
  linkedTestId,
  answers,
  sentenceBuilderAnswers,
}) => {
  const { data } = await axiosInstance.post(
    `/courses/${courseId}/lessons/${lessonId}/tests/${linkedTestId}/submit`,
    {
      answers: Array.isArray(answers) ? answers : [],
      sentenceBuilderAnswers: Array.isArray(sentenceBuilderAnswers)
        ? sentenceBuilderAnswers
        : [],
    },
  );
  return data;
};

export const upsertLessonHomework = async ({
  courseId,
  lessonId,
  ...payload
}) => {
  const { data } = await axiosInstance.patch(
    `/courses/${courseId}/lessons/${lessonId}/homework`,
    payload,
  );
  return data;
};

export const submitLessonHomework = async ({
  courseId,
  lessonId,
  assignmentId,
  ...payload
}) => {
  const { data } = await axiosInstance.post(
    `/courses/${courseId}/lessons/${lessonId}/homework/${assignmentId}/submit`,
    payload,
  );
  return data;
};

export const reviewLessonHomework = async ({
  courseId,
  lessonId,
  assignmentId,
  userId,
  ...payload
}) => {
  const { data } = await axiosInstance.patch(
    `/courses/${courseId}/lessons/${lessonId}/homework/${assignmentId}/review/${userId}`,
    payload,
  );
  return data;
};

export const deleteLessonHomework = async ({
  courseId,
  lessonId,
  assignmentId,
}) => {
  const { data } = await axiosInstance.delete(
    `/courses/${courseId}/lessons/${lessonId}/homework/${assignmentId}`,
  );
  return data;
};

export const getLessonPlaybackToken = async (
  courseId,
  lessonId,
  mediaId,
  client = "web",
) => {
  const params = {
    params: {
      client,
      ...(mediaId ? { mediaId } : {}),
    },
  };
  const { data } = await axiosInstance.get(
    `/courses/${courseId}/lessons/${lessonId}/playback-token`,
    params,
  );
  return data;
};

export const getLessonMaterials = async (courseId, lessonId) => {
  const { data } = await axiosInstance.get(
    `/courses/${courseId}/lessons/${lessonId}/materials`,
  );
  return data;
};

export const getCourseMaterialLibrary = async (courseId) => {
  const { data } = await axiosInstance.get(`/courses/${courseId}/materials/library`);
  return data;
};

export const upsertLessonMaterial = async ({
  courseId,
  lessonId,
  ...payload
}) => {
  const { data } = await axiosInstance.patch(
    `/courses/${courseId}/lessons/${lessonId}/materials`,
    payload,
  );
  return data;
};

export const deleteLessonMaterial = async (
  courseIdOrParams,
  lessonIdArg,
  materialIdArg,
) => {
  const params =
    courseIdOrParams && typeof courseIdOrParams === "object"
      ? courseIdOrParams
      : {
          courseId: courseIdOrParams,
          lessonId: lessonIdArg,
          materialId: materialIdArg,
        };
  const { courseId, lessonId, materialId } = params;

  if (!courseId || !lessonId || !materialId) {
    throw new Error("deleteLessonMaterial requires courseId, lessonId, and materialId");
  }

  const { data } = await axiosInstance.delete(
    `/courses/${courseId}/lessons/${lessonId}/materials/${materialId}`,
  );
  return data;
};

export const getLessonGrading = async (courseId, lessonId) => {
  const { data } = await axiosInstance.get(
    `/courses/${courseId}/lessons/${lessonId}/grading`,
  );
  return data;
};

export const setLessonOralAssessment = async ({
  courseId,
  lessonId,
  userId,
  score,
  note,
}) => {
  const { data } = await axiosInstance.patch(
    `/courses/${courseId}/lessons/${lessonId}/oral-assessment/${userId}`,
    { score, note },
  );
  return data;
};

export const getHomeworkSubmissionPlaybackToken = async ({
  courseId,
  lessonId,
  assignmentId,
  userId,
}) => {
  const { data } = await axiosInstance.get(
    `/courses/${courseId}/lessons/${lessonId}/homework/${assignmentId}/submissions/${userId}/playback-token`,
  );
  return data;
};
