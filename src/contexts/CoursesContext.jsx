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
import { buildSocketNamespaceUrl } from "../config/env";

const CoursesContext = createContext(null);

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coursesPage, setCoursesPage] = useState(1);
  const [coursesHasMore, setCoursesHasMore] = useState(true);
  const hasLoadedCoursesRef = useRef(false);
  const socketRef = useRef(null);
  const authUser = useAuthStore((state) => state.user);

  const currentUser = authUser;

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

  const upsertCourse = useCallback((coursePayload) => {
    if (!coursePayload) return null;

    const mapped = {
      ...coursePayload,
      id: coursePayload._id || coursePayload.id,
      createdBy: coursePayload.createdBy,
    };

    setCourses((prev) => {
      const existingIndex = prev.findIndex(
        (course) =>
          String(course._id || course.id) === String(mapped._id || mapped.id) ||
          String(course.urlSlug || "") === String(mapped.urlSlug || ""),
      );

      if (existingIndex === -1) {
        return [mapped, ...prev];
      }

      const next = [...prev];
      next[existingIndex] = {
        ...next[existingIndex],
        ...mapped,
      };
      return next;
    });

    return mapped;
  }, []);

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

  const ensureCourseLoaded = useCallback(
    async (courseId) => {
      const existing = findCourseByIdentifier(courseId);
      if (existing) return existing;

      await ensureCoursesLoaded();

      const afterListLoad = findCourseByIdentifier(courseId);
      if (afterListLoad) return afterListLoad;

      const detailedCourse = await coursesApi.getCourse(courseId);
      return upsertCourse(detailedCourse);
    },
    [ensureCoursesLoaded, findCourseByIdentifier, upsertCourse],
  );

  useEffect(() => {
    // Moved to CourseSidebar for lazy loading
  }, []);

  // Connect to /courses socket namespace for real-time enrollment updates
  useEffect(() => {
    if (!currentUser?._id && !currentUser?.id) return;

    const socketUrl = buildSocketNamespaceUrl("/courses");

    socketRef.current = io(socketUrl, {
      withCredentials: true,
      transports: ["websocket"],
    });

    const handleEvent = () => {
      fetchCourses(1);
    };

    socketRef.current.on("course_enrolled", handleEvent);
    socketRef.current.on("member_approved", handleEvent);
    socketRef.current.on("member_rejected", handleEvent);
    socketRef.current.on("member_approved_broadcast", handleEvent);
    socketRef.current.on("member_rejected_broadcast", handleEvent);
    socketRef.current.on("lesson_attendance_updated", handleEvent);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [currentUser, fetchCourses]);

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
    async (payload) => {
      try {
        const data = await coursesApi.createCourse(payload);
        await fetchCourses();
        return data._id;
      } catch (err) {
        console.error("Error creating course:", err);
        throw err;
      }
    },
    [fetchCourses],
  );

  const updateCourse = useCallback(
    async (courseId, payload) => {
      try {
        const data = await coursesApi.updateCourse(courseId, payload);
        await fetchCourses();
        return data;
      } catch (err) {
        console.error("Error updating course:", err);
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
      hlsKeyAsset = "",
      status = "draft",
      mediaItems = [],
    ) => {
      try {
        const data = await coursesApi.addLesson({
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
          hlsKeyAsset,
          status,
          mediaItems,
        });
        await fetchCourses();
        return data;
      } catch (err) {
        console.error("Error adding lesson:", err);
        throw err;
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

  const updateLesson = useCallback(
    async (courseId, lessonId, payload) => {
      try {
        await coursesApi.updateLesson({ courseId, lessonId, ...payload });
        await fetchCourses();
      } catch (err) {
        console.error("Error updating lesson:", err);
        throw err;
      }
    },
    [fetchCourses],
  );

  const publishLesson = useCallback(
    async (courseId, lessonId) => {
      try {
        await coursesApi.publishLesson({ courseId, lessonId });
        await fetchCourses();
      } catch (err) {
        console.error("Error publishing lesson:", err);
        throw err;
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

  const patchCourseLesson = useCallback((courseId, lessonId, lessonPatcher) => {
    setCourses((prev) =>
      prev.map((course) => {
        const courseMatches =
          String(course._id || course.id || "") === String(courseId || "") ||
          String(course.urlSlug || "") === String(courseId || "");
        if (!courseMatches) return course;
        return {
          ...course,
          lessons: (course.lessons || []).map((lesson) => {
            const lessonMatches =
              String(lesson._id || lesson.id || "") === String(lessonId || "") ||
              String(lesson.urlSlug || "") === String(lessonId || "");
            if (!lessonMatches) return lesson;
            return lessonPatcher(lesson);
          }),
        };
      }),
    );
  }, []);

  const upsertLessonNote = useCallback(
    async (courseId, lessonId, text) => {
      try {
        const result = await coursesApi.upsertLessonNote({
          courseId,
          lessonId,
          text,
        });
        patchCourseLesson(courseId, lessonId, (lesson) => ({
          ...lesson,
          selfNote: result,
        }));
        return result;
      } catch (err) {
        console.error("Error saving lesson note:", err);
        throw err;
      }
    },
    [patchCourseLesson],
  );

  const upsertCourseReview = useCallback(
    async (courseId, payload) => {
      try {
        const result = await coursesApi.upsertCourseReview({
          courseId,
          ...payload,
        });
        upsertCourse(result);
        return result;
      } catch (err) {
        console.error("Error saving course review:", err);
        throw err;
      }
    },
    [upsertCourse],
  );

  const fetchLikedLessons = useCallback(async () => {
    try {
      return await coursesApi.fetchLikedLessons();
    } catch (err) {
      console.error("Error fetching liked lessons:", err);
      return [];
    }
  }, []);

  const getLessonAttendance = useCallback(async (courseId, lessonId) => {
    try {
      return await coursesApi.getLessonAttendance(courseId, lessonId);
    } catch (err) {
      console.error("Error fetching lesson attendance:", err);
      throw err;
    }
  }, []);

  const markOwnAttendance = useCallback(
    async (courseId, lessonId, progressPercent, extra = {}) => {
      try {
        const result = await coursesApi.markOwnAttendance({
          courseId,
          lessonId,
          progressPercent,
          ...extra,
        });

        // Optimistically update selfAttendance in local state so progress
        // bars reflect the change immediately without waiting for a socket refetch.
        if (progressPercent > 0) {
          setCourses((prev) =>
            prev.map((course) => {
              const matches =
                String(course._id || course.id) === String(courseId) ||
                String(course.urlSlug || "") === String(courseId);
              if (!matches) return course;
              return {
                ...course,
                lessons: (course.lessons || []).map((lesson) => {
                  const lessonMatches =
                    String(lesson._id || lesson.id || lesson.urlSlug) === String(lessonId);
                  if (!lessonMatches) return lesson;
                  const prevPercent = Number(lesson.selfAttendance?.progressPercent || 0);
                  const nextPercent = Math.max(progressPercent, prevPercent);
                  return {
                    ...lesson,
                    selfAttendance: {
                      progressPercent: nextPercent,
                      status: nextPercent >= 70 ? "present" : nextPercent > 0 ? "late" : "absent",
                    },
                  };
                }),
              };
            }),
          );
        }

        return result;
      } catch (err) {
        console.error("Error marking own attendance:", err);
        throw err;
      }
    },
    [],
  );

  const setLessonAttendanceStatus = useCallback(
    async (courseId, lessonId, userId, status) => {
      try {
        return await coursesApi.setLessonAttendanceStatus({
          courseId,
          lessonId,
          userId,
          status,
        });
      } catch (err) {
        console.error("Error setting lesson attendance:", err);
        throw err;
      }
    },
    [],
  );

  const getLessonHomework = useCallback(async (courseId, lessonId) => {
    try {
      return await coursesApi.getLessonHomework(courseId, lessonId);
    } catch (err) {
      console.error("Error fetching lesson homework:", err);
      throw err;
    }
  }, []);

  const getLessonLinkedTests = useCallback(async (courseId, lessonId) => {
    try {
      return await coursesApi.getLessonLinkedTests(courseId, lessonId);
    } catch (err) {
      console.error("Error fetching lesson linked tests:", err);
      throw err;
    }
  }, []);

  const upsertLessonLinkedTest = useCallback(
    async (courseId, lessonId, payload) => {
      try {
        const result = await coursesApi.upsertLessonLinkedTest({
          courseId,
          lessonId,
          ...payload,
        });
        await fetchCourses();
        return result;
      } catch (err) {
        console.error("Error upserting lesson linked test:", err);
        throw err;
      }
    },
    [fetchCourses],
  );

  const deleteLessonLinkedTest = useCallback(
    async (courseId, lessonId, linkedTestId) => {
      try {
        const result = await coursesApi.deleteLessonLinkedTest({
          courseId,
          lessonId,
          linkedTestId,
        });
        await fetchCourses();
        return result;
      } catch (err) {
        console.error("Error deleting lesson linked test:", err);
        throw err;
      }
    },
    [fetchCourses],
  );

  const submitLessonLinkedTestAttempt = useCallback(
    async ({
      courseId,
      lessonId,
      linkedTestId,
      answers,
      sentenceBuilderAnswers,
    }) => {
      try {
        const result = await coursesApi.submitLessonLinkedTestAttempt({
          courseId,
          lessonId,
          linkedTestId,
          answers,
          sentenceBuilderAnswers,
        });
        await fetchCourses();
        return result;
      } catch (err) {
        console.error("Error submitting lesson linked test attempt:", err);
        throw err;
      }
    },
    [fetchCourses],
  );

  const upsertLessonHomework = useCallback(
    async (courseId, lessonId, payload) => {
      try {
        return await coursesApi.upsertLessonHomework({
          courseId,
          lessonId,
          ...payload,
        });
      } catch (err) {
        console.error("Error upserting lesson homework:", err);
        throw err;
      }
    },
    [],
  );

  const submitLessonHomework = useCallback(
    async (courseId, lessonId, payload) => {
      try {
        return await coursesApi.submitLessonHomework({
          courseId,
          lessonId,
          ...payload,
        });
      } catch (err) {
        console.error("Error submitting lesson homework:", err);
        throw err;
      }
    },
    [],
  );

  const reviewLessonHomework = useCallback(
    async (courseId, lessonId, assignmentId, userId, payload) => {
      try {
        return await coursesApi.reviewLessonHomework({
          courseId,
          lessonId,
          assignmentId,
          userId,
          ...payload,
        });
      } catch (err) {
        console.error("Error reviewing lesson homework:", err);
        throw err;
      }
    },
    [],
  );

  const deleteLessonHomework = useCallback(
    async (courseId, lessonId, assignmentId) => {
      try {
        return await coursesApi.deleteLessonHomework({
          courseId,
          lessonId,
          assignmentId,
        });
      } catch (err) {
        console.error("Error deleting lesson homework:", err);
        throw err;
      }
    },
    [],
  );

  const getLessonMaterials = useCallback(async (courseId, lessonId) => {
    try {
      return await coursesApi.getLessonMaterials(courseId, lessonId);
    } catch (err) {
      console.error("Error fetching lesson materials:", err);
      throw err;
    }
  }, []);

  const getCourseMaterialLibrary = useCallback(async (courseId) => {
    try {
      return await coursesApi.getCourseMaterialLibrary(courseId);
    } catch (err) {
      console.error("Error fetching course material library:", err);
      throw err;
    }
  }, []);

  const upsertLessonMaterial = useCallback(
    async (courseId, lessonId, payload) => {
      try {
        return await coursesApi.upsertLessonMaterial({
          courseId,
          lessonId,
          ...payload,
        });
      } catch (err) {
        console.error("Error upserting lesson material:", err);
        throw err;
      }
    },
    [],
  );

  const deleteLessonMaterial = useCallback(
    async (courseId, lessonId, materialId) => {
      try {
        return await coursesApi.deleteLessonMaterial({
          courseId,
          lessonId,
          materialId,
        });
      } catch (err) {
        console.error("Error deleting lesson material:", err);
        throw err;
      }
    },
    [],
  );

  const getLessonGrading = useCallback(async (courseId, lessonId) => {
    try {
      return await coursesApi.getLessonGrading(courseId, lessonId);
    } catch (err) {
      console.error("Error fetching lesson grading:", err);
      throw err;
    }
  }, []);

  const setLessonOralAssessment = useCallback(
    async (courseId, lessonId, userId, payload) => {
      try {
        return await coursesApi.setLessonOralAssessment({
          courseId,
          lessonId,
          userId,
          ...payload,
        });
      } catch (err) {
        console.error("Error setting lesson oral assessment:", err);
        throw err;
      }
    },
    [],
  );

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
    currentUser,
    createCourse,
    updateCourse,
    removeCourse,
    addLesson,
    updateLesson,
    publishLesson,
    removeLesson,
    getLessonComments,
    addComment,
    addReply,
    enrollInCourse,
    approveUser,
    removeUser,
    incrementViews,
    toggleLessonLike,
    upsertLessonNote,
    upsertCourseReview,
    fetchLikedLessons,
    getLessonAttendance,
    markOwnAttendance,
    setLessonAttendanceStatus,
    getLessonLinkedTests,
    upsertLessonLinkedTest,
    deleteLessonLinkedTest,
    submitLessonLinkedTestAttempt,
    getLessonHomework,
    upsertLessonHomework,
    submitLessonHomework,
    reviewLessonHomework,
    deleteLessonHomework,
    getLessonMaterials,
    getCourseMaterialLibrary,
    upsertLessonMaterial,
    deleteLessonMaterial,
    getLessonGrading,
    setLessonOralAssessment,
    patchCourseLesson,
    isAdmin,
    isEnrolled,
    loading,
    coursesPage,
    coursesHasMore,
    fetchCourses,
    ensureCoursesLoaded,
    ensureCourseLoaded,
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
