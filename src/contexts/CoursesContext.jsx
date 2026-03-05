import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { io } from "socket.io-client";
import * as coursesApi from "../api/coursesApi";

const CoursesContext = createContext(null);

const API_URL = "http://localhost:3000";

// Get current user from Zustand auth-storage
const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.user || null;
  } catch {
    return null;
  }
};

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coursesPage, setCoursesPage] = useState(1);
  const [coursesHasMore, setCoursesHasMore] = useState(true);
  const socketRef = useRef(null);

  const currentUser = getCurrentUser();

  // Fetch all courses from API
  const fetchCourses = useCallback(async (page = 1) => {
    try {
      if (page === 1) setLoading(true);
      const res = await coursesApi.fetchCourses(page, 15);
      const data = res?.data || [];
      const totalPages = res?.totalPages || 1;

      // Map _id to id for compatibility with existing frontend components
      const mapped = data.map((c) => ({
        ...c,
        id: c._id,
        createdBy: c.createdBy,
      }));
      setCourses((prev) => (page === 1 ? mapped : [...prev, ...mapped]));
      setCoursesPage(page);
      setCoursesHasMore(page < totalPages);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      if (page === 1) setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Moved to CourseSidebar for lazy loading
  }, []);

  // Connect to /courses socket namespace for real-time enrollment updates
  useEffect(() => {
    let token = null;
    try {
      const raw = localStorage.getItem("auth-storage");
      if (raw) {
        token = JSON.parse(raw)?.state?.token || null;
      }
    } catch {}
    if (!token) return;

    const socketUrl = API_URL.replace("http", "ws") + "/courses";

    socketRef.current = io(socketUrl, {
      auth: { token },
      transports: ["websocket"],
    });

    const handleEvent = (data) => {
      console.log("Course socket event receive:", data);
      fetchCourses();
    };

    socketRef.current.on("course_enrolled", handleEvent);
    socketRef.current.on("member_approved", handleEvent);
    socketRef.current.on("member_rejected", handleEvent);
    socketRef.current.on("member_approved_broadcast", handleEvent);
    socketRef.current.on("member_rejected_broadcast", handleEvent);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [fetchCourses]);

  const joinCourseRoom = useCallback((courseId) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("join_course", { courseId });
    }
  }, []);

  const leaveCourseRoom = useCallback((courseId) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("leave_course", { courseId });
    }
  }, []);

  const createCourse = useCallback(
    async (name, description, image, category, price, accessType) => {
      try {
        const data = await coursesApi.createCourse({
          name,
          description,
          image,
          category,
          price,
          accessType,
        });
        await fetchCourses();
        return data._id;
      } catch (err) {
        console.error("Error creating course:", err);
        throw err;
      }
    },
    [fetchCourses],
  );

  const removeCourse = useCallback(
    async (courseId) => {
      try {
        await coursesApi.removeCourse(courseId);
        await fetchCourses();
        return true;
      } catch (err) {
        console.error("Error deleting course:", err);
        throw err;
      }
    },
    [fetchCourses],
  );

  const addLesson = useCallback(
    async (
      courseId,
      title,
      videoUrl,
      description,
      type = "video",
      fileUrl = "",
      fileName = "",
      fileSize = 0,
    ) => {
      try {
        await coursesApi.addLesson({
          courseId,
          title,
          videoUrl,
          description,
          type,
          fileUrl,
          fileName,
          fileSize,
        });
        await fetchCourses();
      } catch (err) {
        console.error("Error adding lesson:", err);
      }
    },
    [fetchCourses],
  );

  const getLessonComments = useCallback(
    async (courseId, lessonId, page = 1, limit = 15) => {
      try {
        return await coursesApi.getLessonComments(
          courseId,
          lessonId,
          page,
          limit,
        );
      } catch (err) {
        console.error("Error getting lesson comments:", err);
        return { data: [], totalPages: 1 };
      }
    },
    [],
  );

  const removeLesson = useCallback(
    async (courseId, lessonId) => {
      try {
        await coursesApi.removeLesson({ courseId, lessonId });
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
        await coursesApi.addComment({ courseId, lessonId, text });
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
        await coursesApi.addReply({ courseId, lessonId, commentId, text });
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
        await coursesApi.enrollInCourse(courseId);
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
        await coursesApi.approveUser({ courseId, userId });
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
        await coursesApi.removeUser({ courseId, userId });
        await fetchCourses();
      } catch (err) {
        console.error("Error removing user:", err);
      }
    },
    [fetchCourses],
  );

  const incrementViews = useCallback(async (courseId, lessonId) => {
    try {
      await coursesApi.incrementViews({ courseId, lessonId });
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
      const course = courses.find((c) => (c._id || c.id) === courseId);
      return course?.createdBy === currentUser._id;
    },
    [courses, currentUser],
  );

  const isEnrolled = useCallback(
    (courseId) => {
      if (!currentUser) return "none";
      const course = courses.find((c) => (c._id || c.id) === courseId);
      if (course?.createdBy === currentUser._id) return "admin";
      const member = course?.members?.find(
        (m) => (m._id || m.id || m.userId) === currentUser._id,
      );
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
    removeCourse,
    addLesson,
    removeLesson,
    getLessonComments,
    addComment,
    addReply,
    enrollInCourse,
    approveUser,
    removeUser,
    incrementViews,
    isAdmin,
    isEnrolled,
    loading,
    coursesPage,
    coursesHasMore,
    fetchCourses,
    joinCourseRoom,
    leaveCourseRoom,
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
