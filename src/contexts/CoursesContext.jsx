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
import useAuthStore from "../store/authStore";

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
  const hasLoadedCoursesRef = useRef(false);
  const socketRef = useRef(null);
  const authUser = useAuthStore((state) => state.user);

  const currentUser = authUser || getCurrentUser();

  const getEntityId = useCallback((value) => {
    if (!value) return null;
    if (typeof value === "string") return value;
    return value._id || value.id || value.userId || null;
  }, []);

  const findCourseByIdentifier = useCallback(
    (courseId) =>
      courses.find(
        (course) =>
          String(course._id || course.id) === String(courseId) ||
          String(course.urlSlug || "") === String(courseId),
      ),
    [courses],
  );

  const updateCourseMembers = useCallback((courseId, updater) => {
    setCourses((prev) =>
      prev.map((course) => {
        const matches =
          String(course._id || course.id) === String(courseId) ||
          String(course.urlSlug || "") === String(courseId);

        if (!matches) return course;

        const nextMembers = updater(Array.isArray(course.members) ? course.members : []);
        return {
          ...course,
          members: nextMembers,
        };
      }),
    );
  }, []);

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
      if (page === 1) {
        hasLoadedCoursesRef.current = true;
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      if (page === 1) setLoading(false);
    }
  }, []);

  const ensureCoursesLoaded = useCallback(async () => {
    if (hasLoadedCoursesRef.current) return;
    await fetchCourses(1);
  }, [fetchCourses]);

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
      streamType = "direct",
      streamAssets = [],
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
          streamType,
          streamAssets,
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
      const course = findCourseByIdentifier(courseId);
      const currentUserId = getEntityId(currentUser);
      if (!course || !currentUserId) return;

      const optimisticStatus =
        course.accessType === "free_open" ? "approved" : "pending";
      const optimisticMember = {
        userId: currentUserId,
        name: currentUser.nickname || currentUser.username,
        avatar:
          currentUser.avatar ||
          (currentUser.nickname || currentUser.username || "")
            .substring(0, 2)
            .toUpperCase(),
        status: optimisticStatus,
        joinedAt: new Date().toISOString(),
      };

      updateCourseMembers(courseId, (members) => {
        const filtered = members.filter(
          (member) =>
            String(getEntityId(member.userId || member)) !==
            String(currentUserId),
        );
        return [...filtered, optimisticMember];
      });

      try {
        await coursesApi.enrollInCourse(courseId);
      } catch (err) {
        console.error("Error enrolling:", err);
        await fetchCourses();
        throw err;
      }
    },
    [
      currentUser,
      fetchCourses,
      findCourseByIdentifier,
      getEntityId,
      updateCourseMembers,
    ],
  );

  const approveUser = useCallback(
    async (courseId, userId) => {
      updateCourseMembers(courseId, (members) =>
        members.map((member) =>
          String(getEntityId(member.userId || member)) === String(userId)
            ? { ...member, status: "approved" }
            : member,
        ),
      );

      try {
        await coursesApi.approveUser({ courseId, userId });
      } catch (err) {
        console.error("Error approving user:", err);
        await fetchCourses();
        throw err;
      }
    },
    [fetchCourses, getEntityId, updateCourseMembers],
  );

  const removeUser = useCallback(
    async (courseId, userId) => {
      updateCourseMembers(courseId, (members) =>
        members.filter(
          (member) =>
            String(getEntityId(member.userId || member)) !== String(userId),
        ),
      );

      try {
        await coursesApi.removeUser({ courseId, userId });
      } catch (err) {
        console.error("Error removing user:", err);
        await fetchCourses();
        throw err;
      }
    },
    [fetchCourses, getEntityId, updateCourseMembers],
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

  const toggleLessonLike = useCallback(async (courseId, lessonId) => {
    try {
      const { liked, likes } = await coursesApi.toggleLessonLike({
        courseId,
        lessonId,
      });
      setCourses((prev) =>
        prev.map((course) => {
          const matchesCourse =
            String(course.id || course._id) === String(courseId) ||
            String(course.urlSlug || "") === String(courseId);
          if (!matchesCourse) return course;
          return {
            ...course,
            lessons: (course.lessons || []).map((lesson) => {
              const matchesLesson =
                String(lesson.id || lesson._id) === String(lessonId) ||
                String(lesson.urlSlug || "") === String(lessonId);
              return matchesLesson ? { ...lesson, liked, likes } : lesson;
            }),
          };
        }),
      );
      return { liked, likes };
    } catch (err) {
      console.error("Error toggling lesson like:", err);
      throw err;
    }
  }, []);

  const fetchLikedLessons = useCallback(async () => {
    try {
      return await coursesApi.fetchLikedLessons();
    } catch (err) {
      console.error("Error fetching liked lessons:", err);
      return [];
    }
  }, []);

  const isAdmin = useCallback(
    (courseId) => {
      if (!currentUser) return false;
      const course = findCourseByIdentifier(courseId);
      return (
        String(getEntityId(course?.createdBy) || "") ===
        String(getEntityId(currentUser) || "")
      );
    },
    [currentUser, findCourseByIdentifier, getEntityId],
  );

  const isEnrolled = useCallback(
    (courseId) => {
      if (!currentUser) return "none";
      const course = findCourseByIdentifier(courseId);
      const currentUserId = String(getEntityId(currentUser) || "");
      if (String(getEntityId(course?.createdBy) || "") === currentUserId) {
        return "admin";
      }
      const member = course?.members?.find(
        (m) => String(getEntityId(m.userId || m)) === currentUserId,
      );
      if (!member) return "none";
      return member.status;
    },
    [currentUser, findCourseByIdentifier, getEntityId],
  );

  const value = {
    courses,
    currentUser: currentUser
      ? {
          id: getEntityId(currentUser),
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
    toggleLessonLike,
    fetchLikedLessons,
    isAdmin,
    isEnrolled,
    loading,
    coursesPage,
    coursesHasMore,
    fetchCourses,
    ensureCoursesLoaded,
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
