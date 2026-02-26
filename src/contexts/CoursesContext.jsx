import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const CoursesContext = createContext(null);

const API_URL = "http://localhost:3000";

// Helper to get auth headers
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Get current user from localStorage
const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = getCurrentUser();

  // Fetch all courses from API
  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/courses`, { headers: getHeaders() });
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      // Map _id to id for compatibility with existing frontend components
      const mapped = data.map((c) => ({
        ...c,
        id: c._id,
        createdBy: c.createdBy,
        members: (c.members || []).map((m) => ({
          ...m,
          id: m.userId,
        })),
        lessons: (c.lessons || []).map((l) => ({
          ...l,
          id: l._id,
          comments: (l.comments || []).map((cm) => ({
            ...cm,
            id: cm._id,
            replies: (cm.replies || []).map((r) => ({
              ...r,
              id: r._id,
            })),
          })),
        })),
      }));
      setCourses(mapped);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const createCourse = useCallback(
    async (name, description, image) => {
      try {
        const res = await fetch(`${API_URL}/courses`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ name, description, image }),
        });
        if (!res.ok) throw new Error("Failed to create course");
        await fetchCourses();
        const data = await res.json();
        return data._id;
      } catch (err) {
        console.error("Error creating course:", err);
      }
    },
    [fetchCourses],
  );

  const addLesson = useCallback(
    async (courseId, title, videoUrl, description) => {
      try {
        await fetch(`${API_URL}/courses/${courseId}/lessons`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ title, videoUrl, description }),
        });
        await fetchCourses();
      } catch (err) {
        console.error("Error adding lesson:", err);
      }
    },
    [fetchCourses],
  );

  const removeLesson = useCallback(
    async (courseId, lessonId) => {
      try {
        await fetch(`${API_URL}/courses/${courseId}/lessons/${lessonId}`, {
          method: "DELETE",
          headers: getHeaders(),
        });
        await fetchCourses();
      } catch (err) {
        console.error("Error removing lesson:", err);
      }
    },
    [fetchCourses],
  );

  const addComment = useCallback(
    async (courseId, lessonId, text) => {
      try {
        await fetch(
          `${API_URL}/courses/${courseId}/lessons/${lessonId}/comments`,
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ text }),
          },
        );
        await fetchCourses();
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    },
    [fetchCourses],
  );

  const addReply = useCallback(
    async (courseId, lessonId, commentId, text) => {
      try {
        await fetch(
          `${API_URL}/courses/${courseId}/lessons/${lessonId}/comments/${commentId}/replies`,
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ text }),
          },
        );
        await fetchCourses();
      } catch (err) {
        console.error("Error adding reply:", err);
      }
    },
    [fetchCourses],
  );

  const enrollInCourse = useCallback(
    async (courseId) => {
      try {
        await fetch(`${API_URL}/courses/${courseId}/enroll`, {
          method: "POST",
          headers: getHeaders(),
        });
        await fetchCourses();
      } catch (err) {
        console.error("Error enrolling:", err);
      }
    },
    [fetchCourses],
  );

  const approveUser = useCallback(
    async (courseId, userId) => {
      try {
        await fetch(
          `${API_URL}/courses/${courseId}/members/${userId}/approve`,
          {
            method: "PATCH",
            headers: getHeaders(),
          },
        );
        await fetchCourses();
      } catch (err) {
        console.error("Error approving user:", err);
      }
    },
    [fetchCourses],
  );

  const removeUser = useCallback(
    async (courseId, userId) => {
      try {
        await fetch(`${API_URL}/courses/${courseId}/members/${userId}`, {
          method: "DELETE",
          headers: getHeaders(),
        });
        await fetchCourses();
      } catch (err) {
        console.error("Error removing user:", err);
      }
    },
    [fetchCourses],
  );

  const incrementViews = useCallback(async (courseId, lessonId) => {
    try {
      await fetch(`${API_URL}/courses/${courseId}/lessons/${lessonId}/views`, {
        method: "PATCH",
        headers: getHeaders(),
      });
      // Update locally without full refetch for performance
      setCourses((prev) =>
        prev.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            lessons: course.lessons.map((l) =>
              l.id === lessonId ? { ...l, views: l.views + 1 } : l,
            ),
          };
        }),
      );
    } catch (err) {
      console.error("Error incrementing views:", err);
    }
  }, []);

  const isAdmin = useCallback(
    (courseId) => {
      if (!currentUser) return false;
      const course = courses.find((c) => c.id === courseId);
      return course?.createdBy === currentUser._id;
    },
    [courses, currentUser],
  );

  const isEnrolled = useCallback(
    (courseId) => {
      if (!currentUser) return "none";
      const course = courses.find((c) => c.id === courseId);
      if (course?.createdBy === currentUser._id) return "admin";
      const member = course?.members.find((m) => m.id === currentUser._id);
      if (!member) return "none";
      return member.status;
    },
    [courses, currentUser],
  );

  const value = {
    courses,
    currentUser: currentUser
      ? {
          id: currentUser._id,
          name: currentUser.nickname || currentUser.username,
          avatar: (currentUser.nickname || currentUser.username || "")
            .substring(0, 2)
            .toUpperCase(),
          isAdmin: true,
        }
      : null,
    createCourse,
    addLesson,
    removeLesson,
    addComment,
    addReply,
    enrollInCourse,
    approveUser,
    removeUser,
    incrementViews,
    isAdmin,
    isEnrolled,
    loading,
    fetchCourses,
  };

  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const ctx = useContext(CoursesContext);
  if (!ctx) throw new Error("useCourses must be used within CoursesProvider");
  return ctx;
};

export default CoursesContext;
