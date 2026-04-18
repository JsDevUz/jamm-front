import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Play,
  Pause,
  Settings2,
  Copy,
  Maximize,
  Minimize,
  Clock,
  Heart,
  BookOpen,
  Video,
  UserPlus,
  CheckCircle,
  ListVideo,
  Lock,
  LogIn,
  AlertCircle,
  ArrowLeft,
  SkipBack,
  SkipForward,
  Share2,
  Users,
  X,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCourses } from "../../../contexts/CoursesContext";
import { useChats } from "../../../contexts/ChatsContext";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { getLessonPlaybackToken } from "../../../api/coursesApi";
import { API_BASE_URL } from "../../../config/env";
import { CoursePlayerProvider } from "../player/context/CoursePlayerContext";
import CoursePlayerHomeworkSection from "../player/components/CoursePlayerHomeworkSection";
import CoursePlayerLessonTestsSection from "../player/components/CoursePlayerLessonTestsSection";
import CoursePlayerMaterialsSection from "../player/components/CoursePlayerMaterialsSection";
import CoursePlayerCommentsSection from "../player/components/CoursePlayerCommentsSection";
import CoursePlayerPlaylistPanel from "../player/components/CoursePlayerPlaylistPanel";
import {
  AvatarImage,
  BufferedProgress,
  CompactEnrollmentSection,
  ControlButton,
  ControlsBar,
  ControlsLeft,
  ControlsRight,
  ControlsRow,
  CreatorAvatar,
  CreatorCount,
  CreatorMeta,
  CreatorName,
  CenterControlsRow,
  EnrollmentActions,
  EnrollmentInfo,
  FloatingBackButton,
  LikeButton,
  LoadingOverlay,
  LessonDescriptionBody,
  LessonDescriptionCard,
  LessonDescriptionHeader,
  LessonDescriptionTitle,
  LessonDescriptionToggle,
  LockedIcon,
  LockedText,
  LockedTitle,
  LockedView,
  MetaItem,
  NoCourseIcon,
  NoCourseSelected,
  NoCourseText,
  NoCourseTitle,
  NonSelectableVideo,
  PlaybackErrorOverlay,
  PlaybackErrorText,
  PlayerContainer,
  ProgressContainer,
  ProgressThumb,
  ProgressSegmentDivider,
  ProgressFilled,
  ProgressHoverTooltip,
  RoundedEnrollButton,
  MobileSettingsSheetOverlay,
  MobileSettingsSheetPanel,
  MobileSettingsSheetHandle,
  MobileSettingsSheetHeader,
  MobileSettingsSheetTitle,
  MobileSettingsSheetClose,
  MobileSettingsSheetBody,
  SpeedMenu,
  SpeedMenuAnchor,
  SpeedMenuHeader,
  SpeedOption,
  SpeedSection,
  SegmentList,
  SegmentOption,
  SegmentOptionTitle,
  SegmentOptionMeta,
  SpeedToggleButton,
  Spinner,
  TopBar,
  TopBarLeft,
  TopBarTitle,
  TopBarTitleWrap,
  TopBarSubtitle,
  TransparentVideoOverlay,
  VideoInfo,
  VideoMeta,
  VideoOverlay,
  VideoSection,
  VideoTitle,
  VideoWrapper,
  MainPlayButton,
  SeekControlButton,
  YouTubeIframe,
  PlayerTabsBar,
  PlayerTab,
  PlayerTabContent,
  CourseInfoCard,
  CourseInfoTitle,
  CourseInfoDescription,
  CourseInfoMeta,
  CourseInfoMetaItem,
  ShareRow,
  ShareLabel,
  ShareButton,
  NotesArea,
} from "../player/styles/CoursePlayer.styles";
import {
  formatCommentTime,
  formatTime,
  formatViews,
  getEntityId,
  getYouTubeId,
} from "../player/utils/coursePlayerUtils";


const CoursePlayer = ({
  courseId,
  initialLessonSlug,
  onClose = () => {},
  inlineMode = false,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createChat } = useChats();
  const {
    courses,
    currentUser,
    isAdmin,
    isEnrolled,
    enrollInCourse,
    markOwnAttendance,
    approveUser,
    removeUser,
    incrementViews,
    getLessonComments,
    addComment,
    addReply,
    toggleLessonLike,
    joinCourseRoom,
    leaveCourseRoom,
  } = useCourses();

  const [activeLesson, setActiveLesson] = useState(0);
  const [playlistCollapsed, setPlaylistCollapsed] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [mediaDurations, setMediaDurations] = useState({});
  const [playbackRequested, setPlaybackRequested] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [paginatedComments, setPaginatedComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsHasMore, setCommentsHasMore] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [playerTab, setPlayerTab] = useState("materials");
  const [notes, setNotes] = useState("");
  const clickActionTimerRef = useRef(null);
  // Refs for attendance tracking — declared early so derived values below can write to them.
  const overallCurrentTimeRef = useRef(0);
  const totalLessonDurationRef = useRef(0);
  const attendanceEligibleRef = useRef(false);
  const currentLessonIdRef = useRef("");
  const attendanceLastFlushedPercentRef = useRef({});

  // Video player state
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const hlsRef = useRef(null);
  const hlsInitializingRef = useRef(false);
  const hlsNonFatalErrorCountRef = useRef(0);
  const loadedDurationKeysRef = useRef(new Set());
  const playbackRequestSeqRef = useRef(0);
  const pendingSeekTimeRef = useRef(null);
  const shouldAutoplayNextMediaRef = useRef(false);
  const shouldAutoplayAfterLoadRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackError, setPlaybackError] = useState(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const hideControlsTimer = useRef(null);
  // Secure streaming state
  const [playbackUrl, setPlaybackUrl] = useState(null);
  const [playbackStreamType, setPlaybackStreamType] = useState("direct");
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  // Player enhancements
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverX, setHoverX] = useState(0);
  const [hoverSegmentLabel, setHoverSegmentLabel] = useState("");
  const [isBuffering, setIsBuffering] = useState(false);

  const isIgnorablePlaybackError = useCallback((error) => {
    if (!error) return false;
    const message = String(error?.message || "").toLowerCase();
    return (
      error.name === "AbortError" ||
      message.includes("interrupted by a call to pause") ||
      message.includes("play() request was interrupted")
    );
  }, []);

  const resetControlsHideTimer = useCallback(() => {
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current);
    }

    if (!isPlaying) return;

    hideControlsTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 3200);
  }, [isPlaying]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => setIsMobileViewport(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const course = courses.find(
    (c) =>
      c._id === courseId ||
      c.urlSlug === courseId ||
      String(c.id) === String(courseId),
  );
  const lessons = course?.lessons || [];
  const currentLesson = lessons[activeLesson] || null;
  const currentLessonData = course?.lessons?.[activeLesson];
  const hasLessonTests = Boolean(currentLessonData?.linkedTests?.length);
  const lessonMediaItems =
    Array.isArray(currentLessonData?.mediaItems) && currentLessonData.mediaItems.length
      ? currentLessonData.mediaItems
      : currentLessonData?.videoUrl || currentLessonData?.fileUrl
        ? [
            {
              mediaId: "primary",
              title: currentLessonData?.title || "",
              videoUrl: currentLessonData?.videoUrl || "",
              fileUrl: currentLessonData?.fileUrl || "",
              fileName: currentLessonData?.fileName || "",
              fileSize: currentLessonData?.fileSize || 0,
              durationSeconds: currentLessonData?.durationSeconds || 0,
              streamType: currentLessonData?.streamType || "direct",
              streamAssets: Array.isArray(currentLessonData?.streamAssets)
                ? currentLessonData.streamAssets
                : [],
            },
          ]
        : [];
  const currentMediaItem = lessonMediaItems[activeMediaIndex] || lessonMediaItems[0] || null;
  const isYouTube =
    currentLessonData?.type === "video" &&
    currentLessonData?.videoUrl?.includes("youtu");
  const isLocalVideo = Boolean(
    currentMediaItem?.videoUrl || currentMediaItem?.fileUrl,
  );
  const lessonIdentifier =
    currentLessonData?.urlSlug ||
    currentLessonData?._id ||
    currentLessonData?.id;
  const currentLessonHasMedia = Boolean(
    lessonMediaItems.length || currentLessonData?.videoUrl || currentLessonData?.fileUrl,
  );
  const mediaKeys = useMemo(
    () =>
      lessonMediaItems.map(
        (item, index) =>
          String(item?.mediaId || item?._id || item?.fileUrl || item?.videoUrl || index),
      ),
    [lessonMediaItems],
  );
  const currentMediaKey = String(
    currentMediaItem?.mediaId ||
      currentMediaItem?._id ||
      currentMediaItem?.fileUrl ||
      currentMediaItem?.videoUrl ||
      activeMediaIndex,
  );
  const currentLessonHeaderTitle = currentLessonData
    ? `${activeLesson + 1}-dars: ${currentLessonData.title || course?.name || "Dars"}`
    : course?.name || "Dars";
  const playbackSourceLabel =
    playbackStreamType === "hls"
      ? "Adaptive"
      : playbackStreamType === "direct"
        ? "Direct"
        : playbackStreamType || "Direct";

  const handleCopyCurrentLessonLink = useCallback(async () => {
    const courseSlug = course?.urlSlug || course?._id || course?.id;
    const lessonSlug =
      currentLessonData?.urlSlug || currentLessonData?._id || currentLessonData?.id;

    if (!courseSlug || !lessonSlug) {
      toast.error("Dars havolasini nusxalab bo'lmadi");
      return;
    }

    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/courses/${courseSlug}/${lessonSlug}`,
      );
      toast.success("Dars havolasi nusxalandi");
    } catch {
      toast.error("Dars havolasini nusxalab bo'lmadi");
    }
  }, [course, currentLessonData]);


  useEffect(() => {
    if (
      !playbackRequested ||
      !courseId ||
      !lessonIdentifier ||
      lessonMediaItems.length <= 1
    ) {
      return undefined;
    }

    let cancelled = false;
    const cleanups = [];

    const loadMediaDurations = async () => {
      const HlsModule = await import("hls.js").catch(() => null);
      const Hls = HlsModule?.default;

      await Promise.all(
        lessonMediaItems.map(async (item, index) => {
          const key = mediaKeys[index];
          if (loadedDurationKeysRef.current.has(key)) return;

          try {
            const { streamUrl, streamType } = await getLessonPlaybackToken(
              courseId,
              lessonIdentifier,
              item?.mediaId,
            );
            if (!streamUrl || cancelled) return;

            const absoluteStreamUrl = streamUrl.startsWith("http")
              ? streamUrl
              : `${API_BASE_URL}${streamUrl}`;

            const probeVideo = document.createElement("video");
            probeVideo.preload = "metadata";
            probeVideo.muted = true;

            const saveDuration = () => {
              const nextDuration = Number(probeVideo.duration || 0);
              if (!cancelled && nextDuration > 0) {
                loadedDurationKeysRef.current.add(key);
                setMediaDurations((prev) => ({
                  ...prev,
                  [key]: nextDuration,
                }));
              }
            };

            const cleanup = () => {
              probeVideo.removeAttribute("src");
              probeVideo.load();
            };

            if (
              streamType === "hls" ||
              absoluteStreamUrl.endsWith(".m3u8") ||
              item?.streamType === "hls"
            ) {
              if (probeVideo.canPlayType("application/vnd.apple.mpegurl")) {
                probeVideo.onloadedmetadata = saveDuration;
                probeVideo.src = absoluteStreamUrl;
                cleanups.push(cleanup);
                return;
              }

              if (Hls?.isSupported?.()) {
                const hls = new Hls({
                  enableWorker: true,
                  lowLatencyMode: false,
                });
                hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
                  const nextDuration = Number(
                    data?.details?.totalduration || data?.details?.averagetargetduration || 0,
                  );
                  if (!cancelled && nextDuration > 0) {
                    loadedDurationKeysRef.current.add(key);
                    setMediaDurations((prev) => ({
                      ...prev,
                      [key]: nextDuration,
                    }));
                  }
                });
                hls.loadSource(absoluteStreamUrl);
                hls.attachMedia(probeVideo);
                cleanups.push(() => {
                  hls.destroy();
                  cleanup();
                });
                return;
              }
            }

            probeVideo.onloadedmetadata = saveDuration;
            probeVideo.src = absoluteStreamUrl;
            cleanups.push(cleanup);
          } catch (error) {
            console.error("Failed to preload media duration:", error);
          }
        }),
      );
    };

    loadMediaDurations();

    return () => {
      cancelled = true;
      cleanups.forEach((cleanup) => {
        try {
          cleanup();
        } catch {}
      });
    };
  }, [
    API_BASE_URL,
    courseId,
    getLessonPlaybackToken,
    lessonIdentifier,
    lessonMediaItems,
    mediaKeys,
    playbackRequested,
  ]);

  const segmentDurations = useMemo(() => {
    const persisted = lessonMediaItems.map((item) =>
      Number(item?.durationSeconds || 0),
    );
    const hasPersistedDurations = persisted.some((item) => item > 0);
    if (hasPersistedDurations) {
      return persisted.map((item, index) =>
        Number(mediaDurations[mediaKeys[index]] || 0) || (item > 0 ? item : 1),
      );
    }

    const known = mediaKeys.map((key) => Number(mediaDurations[key] || 0));
    const hasAllKnownDurations =
      known.length > 0 && known.every((item) => Number(item) > 0);
    if (hasAllKnownDurations) return known;

    return lessonMediaItems.map(() => 1);
  }, [lessonMediaItems, mediaDurations, mediaKeys]);
  const playbackSegmentDurations = useMemo(
    () =>
      segmentDurations.map((item, index) =>
        index === activeMediaIndex
          ? Math.max(Number(item || 0), Number(duration || 0))
          : Number(item || 0),
      ),
    [activeMediaIndex, duration, segmentDurations],
  );
  const totalLessonDuration = useMemo(
    () =>
      playbackSegmentDurations.reduce((sum, item) => sum + Number(item || 0), 0),
    [playbackSegmentDurations],
  );
  const elapsedBeforeCurrentMedia = useMemo(
    () =>
      playbackSegmentDurations
        .slice(0, activeMediaIndex)
        .reduce((sum, item) => sum + Number(item || 0), 0),
    [activeMediaIndex, playbackSegmentDurations],
  );
  const overallCurrentTime = elapsedBeforeCurrentMedia + currentTime;
  overallCurrentTimeRef.current = overallCurrentTime;
  totalLessonDurationRef.current = totalLessonDuration;
  const _currentLessonId = currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;
  currentLessonIdRef.current = String(_currentLessonId || "");
  const overallProgressPercent = totalLessonDuration
    ? (overallCurrentTime / totalLessonDuration) * 100
    : duration
      ? (currentTime / duration) * 100
      : 0;
  const segmentBoundaries = useMemo(() => {
    if (!segmentDurations.length || !totalLessonDuration) return [];
    let cumulative = 0;
    return segmentDurations.slice(0, -1).map((segment) => {
      cumulative += Number(segment || 0);
      return (cumulative / totalLessonDuration) * 100;
    });
  }, [segmentDurations, totalLessonDuration]);
  const segmentLabels = useMemo(
    () =>
      lessonMediaItems.map((item, index) => ({
        key: mediaKeys[index],
        title:
          item?.title || `${currentLessonData?.title || "Video"} ${index + 1}`,
      })),
    [currentLessonData?.title, lessonMediaItems, mediaKeys],
  );

  const fetchComments = useCallback(
    async (page = 1) => {
      if (!courseId || !currentLesson?._id) return;
      try {
        if (page === 1) setIsLoadingComments(true);
        const res = await getLessonComments(
          courseId,
          currentLesson._id,
          page,
          10,
        );
        const newComments = res.data || [];
        const totalPages = res.totalPages || 1;

        setPaginatedComments((prev) =>
          page === 1 ? newComments : [...prev, ...newComments],
        );
        setCommentsPage(page);
        setCommentsHasMore(page < totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        if (page === 1) setIsLoadingComments(false);
      }
    },
    [courseId, currentLesson?._id, getLessonComments],
  );

  useEffect(() => {
    fetchComments(1);
  }, [currentLesson?._id, fetchComments]);

  const enrollmentStatus = isEnrolled(courseId);
  const admin = course ? isAdmin(courseId) : false;
  // CoursePlayer is now strictly view-only; teacher content management lives in /teacher.
  const playerAdmin = false;
  const currentUserId = getEntityId(currentUser);
  const ownerId = getEntityId(course?.createdBy);
  const isOwner = String(ownerId || "") === String(currentUserId || "");

  // React to initial URL parameter for direct lesson links
  useEffect(() => {
    if (course && initialLessonSlug) {
      const idx = course.lessons.findIndex(
        (l) =>
          l.urlSlug === initialLessonSlug ||
          String(l._id) === initialLessonSlug ||
          String(l.id) === initialLessonSlug,
      );
      if (idx !== -1 && idx !== activeLesson) {
        setActiveLesson(idx);
      }
    }
  }, [course, initialLessonSlug]); // Intentionally not including activeLesson to avoid infinite loops if it changes via UI

  useEffect(() => {
    if (!course) return;
    if (inlineMode) return;

    const requestedLesson = initialLessonSlug
      ? course.lessons.find(
          (lesson) =>
            lesson.urlSlug === initialLessonSlug ||
            String(lesson._id) === initialLessonSlug ||
            String(lesson.id) === initialLessonSlug,
        )
      : null;
    const requestedLessonId =
      requestedLesson?.urlSlug || requestedLesson?._id || requestedLesson?.id;
    const currentLessonId =
      currentLessonData?.urlSlug || currentLessonData?._id || currentLessonData?.id;

    // On hard refresh, wait until the URL-selected lesson is applied to local state
    // before writing a replacement URL. Otherwise we can bounce between lesson 1 and
    // the requested lesson slug during hydration.
    if (requestedLessonId && String(requestedLessonId) !== String(currentLessonId || "")) {
      return;
    }

    const courseSlug = course.urlSlug || course._id || course.id;
    const coursePath = `/courses/${courseSlug}`;
    const lessonSlug =
      currentLessonData?.urlSlug ||
      currentLessonData?._id ||
      currentLessonData?.id;

    const nextPath = lessonSlug
      ? `${coursePath}/${lessonSlug}`
      : coursePath;

    if (
      window.location.pathname.startsWith(`${coursePath}/`) &&
      window.location.pathname !== nextPath
    ) {
      navigate(nextPath, { replace: true });
    }
  }, [course, currentLessonData, initialLessonSlug, inlineMode, navigate]);
  const enrollStatus = enrollmentStatus;
  const canAccessLessons = isOwner || enrollStatus === "approved" || admin;
  const hasPassedRequiredTestsBeforeLesson = useCallback(
    (index) => {
      if (isOwner || admin || !course) return true;
      if (enrollStatus !== "approved") return index === 0;
      if (index === 0) return true;

      for (let lessonIndex = 0; lessonIndex < index; lessonIndex += 1) {
        const previousLesson = course.lessons?.[lessonIndex];
        if (!previousLesson || previousLesson.status === "draft") continue;

        const requiredTests = Array.isArray(previousLesson.linkedTests)
          ? previousLesson.linkedTests.filter(
              (item) => Number(item?.minimumScore || 0) > 0,
            )
          : [];

        const hasUnpassedRequiredTest = requiredTests.some(
          (item) => !item?.selfProgress?.passed,
        );
        if (hasUnpassedRequiredTest) return false;
      }

      return true;
    },
    [admin, course, enrollStatus, isOwner],
  );
  const canAccessLesson = useCallback(
    (index) => {
      if (admin || isOwner) return true;
      if (!canAccessLessons) return index === 0;
      return hasPassedRequiredTestsBeforeLesson(index);
    },
    [admin, canAccessLessons, hasPassedRequiredTestsBeforeLesson, isOwner],
  );
  const canAccessActiveLesson = canAccessLesson(activeLesson);

  // Reset state when course changes
  useEffect(() => {
    setActiveLesson(0);
    setPlaylistCollapsed(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRequested(false);
    setPlaybackUrl(null);
    setPlaybackStreamType("direct");
  }, [courseId]);

  useEffect(() => {
    if (!lessonMediaItems.length) {
      setActiveMediaIndex(0);
      return;
    }
    if (activeMediaIndex > lessonMediaItems.length - 1) {
      setActiveMediaIndex(0);
    }
  }, [activeMediaIndex, lessonMediaItems.length]);

  useEffect(() => {
    setCurrentTime(0);
    setBuffered(0);
    setPlaybackError(null);
    setDuration(
      Number(mediaDurations[currentMediaKey] || currentMediaItem?.durationSeconds || 0),
    );
  }, [activeMediaIndex, currentMediaItem?.durationSeconds, currentMediaKey, mediaDurations]);

  const isPreviewMode = !canAccessLessons && activeLesson === 0;

  // Track views — fire once per lesson per session after 20% progress
  const viewedLessonsRef = useRef(new Set());
  const attendanceTrackedPercentRef = useRef({});
  const attendancePendingPercentRef = useRef({});
  const attendanceLastTimeRef = useRef({});
  const attendanceSessionLoggedRef = useRef("");

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setActiveMediaIndex(0);
    setPlaybackRequested(false);
    setPlaybackUrl(null);
    setPlaybackStreamType("direct");
    setDescriptionExpanded(false);
    const lessonId =
      currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;
    if (lessonId) {
      const key = String(lessonId);
      attendanceLastTimeRef.current[key] = 0;
      // Reset per-session accumulated deltas so they don't carry over
      // to the next session and inflate the total on the backend.
      attendanceTrackedPercentRef.current[key] = 0;
      attendancePendingPercentRef.current[key] = 0;
      attendanceLastFlushedPercentRef.current[key] = 0;
    }
    attendanceSessionLoggedRef.current = "";
  }, [activeLesson, courseId]);

  useEffect(() => {
    if (
      !currentLessonData ||
      !currentLessonHasMedia ||
      !isLocalVideo ||
      !canAccessActiveLesson ||
      playbackRequested
    ) {
      return;
    }

    shouldAutoplayAfterLoadRef.current = false;
    setPlaybackRequested(true);
  }, [
    activeLesson,
    canAccessActiveLesson,
    currentLessonData,
    currentLessonHasMedia,
    isLocalVideo,
    playbackRequested,
  ]);

  const flushOwnAttendance = useCallback(
    async (
      lessonId,
      {
        force = false,
        lastPositionSeconds,
        lessonDurationSeconds,
        watchIncrement = 0,
      } = {},
    ) => {
      const lessonKey = String(lessonId || "");
      if (!lessonKey) return;

      // Send the absolute tracked percent for this session (not a delta).
      // Backend stores Math.max(existing, incoming) so re-watches don't inflate the total.
      const trackedPercent = Math.min(
        100,
        Number(attendanceTrackedPercentRef.current[lessonKey] || 0),
      );
      const normalizedLastPosition = Number(lastPositionSeconds || 0);
      const shouldSendPosition = normalizedLastPosition > 0;
      const shouldSendWatchIncrement = Number(watchIncrement || 0) > 0;
      const shouldSendProgress = trackedPercent > 0;

      if (
        !shouldSendProgress &&
        !shouldSendPosition &&
        !shouldSendWatchIncrement
      ) {
        return;
      }

      if (!force && trackedPercent < 10 && !shouldSendWatchIncrement) return;

      // Reset pending accumulator — tracked stays so we can keep comparing.
      attendancePendingPercentRef.current[lessonKey] = 0;

      try {
        await markOwnAttendance(courseId, lessonKey, Number(trackedPercent.toFixed(2)), {
          lastPositionSeconds: shouldSendPosition ? normalizedLastPosition : undefined,
          lessonDurationSeconds:
            Number(lessonDurationSeconds || 0) > 0
              ? Number(lessonDurationSeconds)
              : undefined,
          watchIncrement: shouldSendWatchIncrement ? 1 : 0,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [courseId, markOwnAttendance],
  );

  useEffect(() => {
    const lessonId =
      currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;

    if (
      !lessonId ||
      admin ||
      enrollStatus !== "approved" ||
      !currentLessonHasMedia ||
      !canAccessLesson(activeLesson)
    ) {
      return;
    }

    const sessionKey = `${courseId}:${lessonId}`;
    if (attendanceSessionLoggedRef.current === sessionKey) {
      return;
    }

    attendanceSessionLoggedRef.current = sessionKey;
    // Read current position from ref to avoid re-firing when time changes.
    flushOwnAttendance(lessonId, {
      force: true,
      watchIncrement: 1,
      lastPositionSeconds: overallCurrentTimeRef.current,
      lessonDurationSeconds: totalLessonDurationRef.current,
    });
  }, [
    activeLesson,
    admin,
    canAccessLesson,
    courseId,
    currentLessonData,
    currentLessonHasMedia,
    enrollStatus,
    flushOwnAttendance,
  ]);

  useEffect(() => {
    const lessonId =
      currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;

    if (
      !courseId ||
      !lessonId ||
      !duration ||
      !canAccessLesson(activeLesson) ||
      viewedLessonsRef.current.has(String(lessonId))
    ) {
      return;
    }

    const progressPercent = Math.round(overallProgressPercent);
    if (progressPercent < 20) return;

    viewedLessonsRef.current.add(String(lessonId));
    incrementViews(courseId, lessonId).catch((error) => {
      console.error(error);
      viewedLessonsRef.current.delete(String(lessonId));
    });
  }, [
    activeLesson,
    canAccessLesson,
    courseId,
    currentLessonData,
    overallProgressPercent,
    incrementViews,
  ]);

  // Keep a ref so handleTimeUpdate can access flushOwnAttendance without stale closure.
  const flushOwnAttendanceRef = useRef(flushOwnAttendance);
  useEffect(() => { flushOwnAttendanceRef.current = flushOwnAttendance; }, [flushOwnAttendance]);

  // Sync eligibility flag — cheap effect, no time-varying deps.
  useEffect(() => {
    const lessonId = currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;
    attendanceEligibleRef.current =
      Boolean(lessonId) &&
      !admin &&
      enrollStatus === "approved" &&
      currentLessonHasMedia &&
      Boolean(totalLessonDuration) &&
      canAccessLesson(activeLesson);
  }, [activeLesson, admin, canAccessLesson, currentLessonData, currentLessonHasMedia, enrollStatus, totalLessonDuration]);

  // Flush when video pauses — fire only when isPlaying transitions to false.
  const wasPLayingRef = useRef(false);
  useEffect(() => {
    if (isPlaying) {
      wasPLayingRef.current = true;
      return;
    }
    if (!wasPLayingRef.current) return; // was already paused, skip
    wasPLayingRef.current = false;
    const lessonId =
      currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;
    if (!lessonId) return;
    flushOwnAttendance(lessonId, {
      force: true,
      lastPositionSeconds: overallCurrentTimeRef.current,
      lessonDurationSeconds: totalLessonDurationRef.current,
    });
  }, [currentLessonData, flushOwnAttendance, isPlaying]);

  // Flush on lesson unmount (lesson switch or component teardown).
  useEffect(() => {
    const lessonId =
      currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;
    return () => {
      if (lessonId) {
        flushOwnAttendance(lessonId, {
          force: true,
          lastPositionSeconds: overallCurrentTimeRef.current,
          lessonDurationSeconds: totalLessonDurationRef.current,
        });
      }
    };
  }, [currentLessonData, flushOwnAttendance]);

  // Video player handlers
  const togglePlay = useCallback(() => {
    if (isLocalVideo && !playbackUrl) {
      shouldAutoplayAfterLoadRef.current = true;
      setPlaybackRequested(true);
      setPlaybackError(null);
      return;
    }

    if (!videoRef.current) return;
    setPlaybackError(null);
    if (isPlaying) {
      shouldAutoplayAfterLoadRef.current = false;
      shouldAutoplayNextMediaRef.current = false;
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (isIgnorablePlaybackError(error)) {
            return;
          }
          if (error.name === "NotSupportedError") {
            setPlaybackError(
              t("coursePlayer.errors.formatNotSupported"),
            );
          } else {
            console.error("Playback error:", error);
            setPlaybackError(t("coursePlayer.errors.playback"));
          }
          setIsPlaying(false);
        });
      }
    }
  }, [isIgnorablePlaybackError, isLocalVideo, isPlaying, playbackUrl, t]);

  const attemptQueuedAutoplay = useCallback(() => {
    if (
      !videoRef.current ||
      (!shouldAutoplayAfterLoadRef.current &&
        !shouldAutoplayNextMediaRef.current)
    ) {
      return;
    }

    shouldAutoplayAfterLoadRef.current = false;
    shouldAutoplayNextMediaRef.current = false;
    videoRef.current.play().catch((error) => {
      if (isIgnorablePlaybackError(error)) {
        return;
      }
      console.error("Queued autoplay error:", error);
    });
  }, [isIgnorablePlaybackError]);

  const skipForward = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime += 10;
  }, []);

  const skipBackward = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime -= 10;
  }, []);

  const handlePlayerSurfaceClick = useCallback(() => {
    if (clickActionTimerRef.current) {
      clearTimeout(clickActionTimerRef.current);
    }

    clickActionTimerRef.current = setTimeout(() => {
      setShowSettings(false);
      setShowControls((prev) => {
        const next = !prev;
        if (next) {
          resetControlsHideTimer();
        } else if (hideControlsTimer.current) {
          clearTimeout(hideControlsTimer.current);
        }
        return next;
      });
      clickActionTimerRef.current = null;
    }, 220);
  }, [resetControlsHideTimer]);

  const handlePlayerSurfaceDoubleClick = useCallback((event) => {
    if (!videoWrapperRef.current) return;
    if (clickActionTimerRef.current) {
      clearTimeout(clickActionTimerRef.current);
      clickActionTimerRef.current = null;
    }

    const rect = videoWrapperRef.current.getBoundingClientRect();
    const clickedLeftHalf = event.clientX - rect.left < rect.width / 2;

    if (clickedLeftHalf) {
      skipBackward();
    } else {
      skipForward();
    }
  }, [skipBackward, skipForward]);

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);

    // Update buffered
    const video = videoRef.current;
    if (video.buffered.length > 0) {
      setBuffered(
        (video.buffered.end(video.buffered.length - 1) / video.duration) * 100,
      );
    }

    // Progress tracking — runs every video frame but only sends network request
    // when 10% accumulates or the 70% threshold is crossed. All reads come from
    // refs so this callback never needs to be recreated.
    if (!attendanceEligibleRef.current) return;
    const lessonKey = currentLessonIdRef.current;
    if (!lessonKey) return;
    const now = overallCurrentTimeRef.current;
    const totalDur = totalLessonDurationRef.current;
    if (!totalDur) return;

    const lastTrackedTime = Number(attendanceLastTimeRef.current[lessonKey] ?? now);
    const timeDelta = now - lastTrackedTime;
    attendanceLastTimeRef.current[lessonKey] = now;

    if (timeDelta <= 0 || timeDelta > 2.5) return;

    const watchedPercentDelta = (timeDelta / totalDur) * 100;
    if (watchedPercentDelta <= 0) return;

    const prevTrackedPercent = Number(attendanceTrackedPercentRef.current[lessonKey] || 0);
    const nextTrackedPercent = Math.min(100, prevTrackedPercent + watchedPercentDelta);
    attendanceTrackedPercentRef.current[lessonKey] = nextTrackedPercent;

    const crossedPresentThreshold = nextTrackedPercent >= 70 && prevTrackedPercent < 70;

    // Flush when crossing 70%, or every 10 absolute percentage points since last flush.
    const lastFlushed = Number(attendanceLastFlushedPercentRef.current[lessonKey] || 0);
    const crossedNextFlushPoint = Math.floor(nextTrackedPercent / 10) > Math.floor(lastFlushed / 10);

    if (crossedPresentThreshold || crossedNextFlushPoint) {
      attendanceLastFlushedPercentRef.current[lessonKey] = nextTrackedPercent;
      flushOwnAttendanceRef.current(lessonKey, {
        force: crossedPresentThreshold,
        lastPositionSeconds: now,
        lessonDurationSeconds: totalDur,
      });
    }
  }, []);

  const handleDuration = useCallback((duration) => {
    setDuration(duration);
  }, []);

  const resetActiveMediaPlayback = useCallback(() => {
    setIsPlaying(false);
    setIsBuffering(false);
    setPlaybackError(null);
    setPlaybackUrl(null);
    setPlaybackStreamType("direct");

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const video = videoRef.current;
    if (video) {
      try {
        video.pause();
      } catch {}
      video.removeAttribute("src");
      video.load();
    }
  }, []);

  const formatHlsPlaybackError = useCallback(
    (data) => {
      const detail = String(data?.details || "").trim();
      const innerMessage = String(data?.error?.message || "").trim();
      const reason = detail || innerMessage;

      if (reason) {
        return t("coursePlayer.errors.hlsPlaybackWithReason", {
          reason,
          defaultValue: `HLS videoni ishga tushirib bo'lmadi: ${reason}`,
        });
      }

      return t("coursePlayer.errors.hlsPlayback", {
        defaultValue: "HLS videoni ishga tushirishda xatolik yuz berdi.",
      });
    },
    [t],
  );

  const handleSeek = useCallback(
    (e) => {
      if (!videoRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const targetTotalTime =
        percent * (totalLessonDuration || duration || 0);

      if (lessonMediaItems.length <= 1 || !totalLessonDuration) {
        videoRef.current.currentTime = percent * duration;
        return;
      }

      let elapsed = 0;
      for (let index = 0; index < segmentDurations.length; index += 1) {
        const segmentDuration = Number(segmentDurations[index] || 0);
        const nextElapsed = elapsed + segmentDuration;
        if (targetTotalTime <= nextElapsed || index === segmentDurations.length - 1) {
          if (index !== activeMediaIndex) {
            shouldAutoplayNextMediaRef.current = isPlaying;
            resetActiveMediaPlayback();
            setActiveMediaIndex(index);
            pendingSeekTimeRef.current = Math.max(0, targetTotalTime - elapsed);
            setCurrentTime(0);
          } else {
            videoRef.current.currentTime = Math.max(0, targetTotalTime - elapsed);
          }
          break;
        }
        elapsed = nextElapsed;
      }
    },
    [
      activeMediaIndex,
      duration,
      isPlaying,
      lessonMediaItems.length,
      resetActiveMediaPlayback,
      segmentDurations,
      totalLessonDuration,
    ],
  );

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const toggleFullscreen = useCallback(() => {
    const wrapper = videoWrapperRef.current;
    const video = videoRef.current;
    if (!wrapper && !video) return;

    const doc = document;
    const isCurrentlyFullscreen =
      Boolean(doc.fullscreenElement) ||
      Boolean(doc.webkitFullscreenElement) ||
      Boolean(video?.webkitDisplayingFullscreen);

    if (isCurrentlyFullscreen) {
      setShowSettings(false);
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch?.(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (video?.webkitExitFullscreen) {
        video.webkitExitFullscreen();
      }
      setIsFullscreen(false);
      return;
    }

    if (wrapper?.requestFullscreen) {
      setShowSettings(false);
      wrapper
        .requestFullscreen()
        .then?.(() => setIsFullscreen(true))
        .catch?.(() => {
          if (video?.webkitEnterFullscreen) {
            video.webkitEnterFullscreen();
            setIsFullscreen(true);
          }
        });
      return;
    }

    if (wrapper?.webkitRequestFullscreen) {
      setShowSettings(false);
      wrapper.webkitRequestFullscreen();
      setIsFullscreen(true);
      return;
    }

    if (video?.webkitEnterFullscreen) {
      setShowSettings(false);
      video.webkitEnterFullscreen();
      setIsFullscreen(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const syncFullscreenState = () => {
      setIsFullscreen(
        Boolean(document.fullscreenElement) ||
          Boolean(document.webkitFullscreenElement) ||
          Boolean(video?.webkitDisplayingFullscreen),
      );
    };

    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState);
    video?.addEventListener?.("webkitbeginfullscreen", syncFullscreenState);
    video?.addEventListener?.("webkitendfullscreen", syncFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      document.removeEventListener("webkitfullscreenchange", syncFullscreenState);
      video?.removeEventListener?.("webkitbeginfullscreen", syncFullscreenState);
      video?.removeEventListener?.("webkitendfullscreen", syncFullscreenState);
    };
  }, [currentMediaKey]);

  useEffect(() => {
    if (!isMobileViewport && showSettings) {
      setShowSettings(false);
    }
  }, [isMobileViewport, showSettings]);

  useEffect(
    () => () => {
      if (clickActionTimerRef.current) {
        clearTimeout(clickActionTimerRef.current);
      }
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
    },
    [],
  );

  const handleSpeedChange = useCallback((speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setShowSettings(false);
  }, []);

  const handleSegmentSelect = useCallback(
    (index) => {
      if (index === activeMediaIndex) {
        setShowSettings(false);
        return;
      }

      shouldAutoplayNextMediaRef.current = isPlaying;
      pendingSeekTimeRef.current = 0;
      setCurrentTime(0);
      resetActiveMediaPlayback();
      setActiveMediaIndex(index);
      setShowSettings(false);
      setShowControls(true);
      resetControlsHideTimer();
    },
    [activeMediaIndex, isPlaying, resetActiveMediaPlayback, resetControlsHideTimer],
  );

  const renderSettingsContent = useCallback(
    () => (
      <>
        <SpeedMenuHeader>{t("coursePlayer.speed.title")}</SpeedMenuHeader>
        <SpeedSection>
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
            <SpeedOption
              key={speed}
              onClick={() => handleSpeedChange(speed)}
              $active={playbackSpeed === speed}
            >
              {speed === 1 ? t("coursePlayer.speed.normal") : `${speed}x`}
            </SpeedOption>
          ))}
        </SpeedSection>
        {lessonMediaItems.length > 1 ? (
          <SegmentList>
            <SpeedMenuHeader>Playlist</SpeedMenuHeader>
            {segmentLabels.map((segment, index) => (
              <SegmentOption
                key={segment.key}
                onClick={() => handleSegmentSelect(index)}
                $active={index === activeMediaIndex}
              >
                <SegmentOptionTitle $active={index === activeMediaIndex}>
                  {segment.title || `Video ${index + 1}`}
                </SegmentOptionTitle>
                <SegmentOptionMeta>
                  {index + 1}/{lessonMediaItems.length} ·{" "}
                  {formatTime(Number(segmentDurations[index] || 0))}
                </SegmentOptionMeta>
              </SegmentOption>
            ))}
          </SegmentList>
        ) : null}
      </>
    ),
    [
      activeMediaIndex,
      formatTime,
      handleSegmentSelect,
      handleSpeedChange,
      lessonMediaItems.length,
      playbackSpeed,
      segmentDurations,
      segmentLabels,
      t,
    ],
  );

  const handleProgressHover = useCallback(
    (e) => {
      if (!duration && !totalLessonDuration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      const nextHoverTime = percent * (totalLessonDuration || duration);
      let cumulative = 0;
      let nextSegmentIndex = 0;
      for (let index = 0; index < segmentDurations.length; index += 1) {
        cumulative += Number(segmentDurations[index] || 0);
        nextSegmentIndex = index;
        if (nextHoverTime <= cumulative || index === segmentDurations.length - 1) {
          break;
        }
      }
      setHoverTime(nextHoverTime);
      setHoverX(e.clientX - rect.left);
      setHoverSegmentLabel(segmentLabels[nextSegmentIndex]?.title || "");
    },
    [duration, segmentDurations, segmentLabels, totalLessonDuration],
  );

  const showControlsHandler = useCallback(() => {
    setShowControls(true);
    resetControlsHideTimer();
  }, [resetControlsHideTimer]);

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
      return;
    }

    resetControlsHideTimer();
  }, [activeMediaIndex, isPlaying, resetControlsHideTimer]);

  // Keyboard shortcuts (placed here so togglePlay/toggleFullscreen/toggleMute are already defined)
  useEffect(() => {
    const handleKey = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          if (videoRef.current) videoRef.current.currentTime += 10;
          break;
        case "ArrowLeft":
          if (videoRef.current) videoRef.current.currentTime -= 10;
          break;
        case "ArrowUp":
          e.preventDefault();
          if (videoRef.current) {
            const newVol = Math.min(1, (videoRef.current.volume || 0) + 0.1);
            videoRef.current.volume = newVol;
            setVolume(newVol);
            setIsMuted(false);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (videoRef.current) {
            const newVol = Math.max(0, (videoRef.current.volume || 0) - 0.1);
            videoRef.current.volume = newVol;
            setVolume(newVol);
            setIsMuted(newVol === 0);
          }
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [togglePlay, toggleFullscreen, toggleMute]);

  const handleLessonClick = (index) => {
    const lessonData = course.lessons[index];
    if (!lessonData) return;

    setActiveLesson(index);
    setPlayerTab("materials");
    if (!inlineMode && lessonData) {
      const lessonSlug = lessonData.urlSlug || lessonData._id || lessonData.id;
      const courseSlug = course.urlSlug || course._id || course.id;
      navigate(`/courses/${courseSlug}/${lessonSlug}`);
    }
  };

  const playNextLesson = useCallback(() => {
    if (activeMediaIndex < lessonMediaItems.length - 1) {
      shouldAutoplayNextMediaRef.current = true;
      resetActiveMediaPlayback();
      setActiveMediaIndex((prev) => prev + 1);
      return;
    }
    if (course && activeLesson < course.lessons.length - 1) {
      setActiveLesson((prev) => prev + 1);
    }
  }, [activeLesson, activeMediaIndex, course, lessonMediaItems.length, resetActiveMediaPlayback]);

  // Derived values needed for secure playback setup.
  const isHlsVideo =
    isLocalVideo &&
    (currentMediaItem?.streamType === "hls" ||
      currentMediaItem?.videoUrl?.endsWith(".m3u8") ||
      playbackStreamType === "hls");

  // Secure stream URL: mint a short-lived playback token, then let the browser
  // request byte ranges directly instead of downloading the full file as a Blob.
  useEffect(() => {
    if (
      !playbackRequested ||
      !isLocalVideo ||
      !lessonIdentifier ||
      !canAccessActiveLesson
    ) {
      setPlaybackUrl(null);
      setPlaybackStreamType("direct");
      setIsLoadingVideo(false);
      return;
    }
    let cancelled = false;
    const requestSeq = playbackRequestSeqRef.current + 1;
    playbackRequestSeqRef.current = requestSeq;
    const preparePlayback = async () => {
      setIsLoadingVideo(true);
      setPlaybackUrl(null);
      setPlaybackStreamType("direct");
      setPlaybackError(null);
      try {
        const { streamUrl, streamType } = await getLessonPlaybackToken(
          courseId,
          lessonIdentifier,
          currentMediaItem?.mediaId,
        );
        if (
          cancelled ||
          playbackRequestSeqRef.current !== requestSeq ||
          !streamUrl
        ) {
          return;
        }

        const absoluteStreamUrl = streamUrl.startsWith("http")
          ? streamUrl
          : `${API_BASE_URL}${streamUrl}`;
        setPlaybackStreamType(streamType || "direct");
        setPlaybackUrl(absoluteStreamUrl);
      } catch (err) {
        if (!cancelled && playbackRequestSeqRef.current === requestSeq) {
          setPlaybackError(t("coursePlayer.errors.playbackToken"));
        }
      } finally {
        if (!cancelled && playbackRequestSeqRef.current === requestSeq) {
          setIsLoadingVideo(false);
        }
      }
    };

    preparePlayback();

    return () => {
      cancelled = true;
    };
  }, [
    activeLesson,
    canAccessActiveLesson,
    courseId,
    currentMediaItem?.mediaId,
    isLocalVideo,
    lessonIdentifier,
    playbackRequested,
  ]);

  useEffect(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    hlsInitializingRef.current = false;
    hlsNonFatalErrorCountRef.current = 0;

    const video = videoRef.current;
    if (!video || !playbackUrl || !isHlsVideo) return;

    let cancelled = false;

    const attachHls = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari native HLS — set src directly
        video.src = playbackUrl;
        return;
      }

      const module = await import("hls.js");
      if (cancelled) return;

      const Hls = module.default;
      if (!Hls.isSupported()) {
        setPlaybackError(t("coursePlayer.errors.hlsUnsupported"));
        return;
      }

      const DefaultLoader = Hls.DefaultConfig.loader;
      class SegmentCacheFriendlyLoader extends DefaultLoader {
        load(context, config, callbacks) {
          const requestUrl = String(context?.url || "");
          const isCdnAsset = /^https?:\/\/files\.jamm\.uz\//i.test(requestUrl);
          if (isCdnAsset) {
            delete context.rangeStart;
            delete context.rangeEnd;
          }
          return super.load(context, config, callbacks);
        }
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        // Retry config — be patient with Backblaze B2 latency spikes
        manifestLoadingMaxRetry: 4,
        manifestLoadingRetryDelay: 1000,
        levelLoadingMaxRetry: 4,
        levelLoadingRetryDelay: 1000,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 1000,
        loader: SegmentCacheFriendlyLoader,
        xhrSetup: (xhr, url) => {
          const requestUrl = String(url || "");
          const isCdnAsset = /^https?:\/\/files\.jamm\.uz\//i.test(requestUrl);
          xhr.withCredentials = !isCdnAsset;
        },
        fetchSetup: (context, initParams) => {
          const requestUrl = String(context?.url || "");
          const isCdnAsset = /^https?:\/\/files\.jamm\.uz\//i.test(requestUrl);
          const headers = new Headers(initParams?.headers || {});
          if (isCdnAsset) {
            headers.delete("Range");
          }
          return new Request(requestUrl, {
            ...initParams,
            credentials: isCdnAsset ? "omit" : "include",
            headers,
          });
        },
      });

      hlsInitializingRef.current = true;
      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        hlsInitializingRef.current = false;
        if (videoRef.current) {
          videoRef.current.playbackRate = videoRef.current.playbackRate || 1;
        }
        attemptQueuedAutoplay();
      });

      hls.loadSource(playbackUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (cancelled) return;

        if (data?.fatal) {
          console.error("HLS fatal error:", data);
          setIsBuffering(false);
          setPlaybackError(formatHlsPlaybackError(data));
          hls.destroy();
          hlsRef.current = null;
          hlsInitializingRef.current = false;
          return;
        }

        // Track non-fatal errors — if too many accumulate, surface the error
        hlsNonFatalErrorCountRef.current += 1;
        if (hlsNonFatalErrorCountRef.current > 10) {
          console.error("Too many HLS non-fatal errors:", data);
          setIsBuffering(false);
          setPlaybackError(formatHlsPlaybackError(data));
          hls.destroy();
          hlsRef.current = null;
          hlsInitializingRef.current = false;
        }
      });
    };

    attachHls();

    return () => {
      cancelled = true;
      hlsInitializingRef.current = false;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  // playbackSpeed intentionally excluded — handled by a separate effect below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptQueuedAutoplay, formatHlsPlaybackError, isHlsVideo, playbackUrl, t]);

  // Apply playbackSpeed changes to existing video/HLS without destroying HLS
  useEffect(() => {
    if (videoRef.current && playbackSpeed) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (
      !playbackUrl ||
      isHlsVideo ||
      !shouldAutoplayAfterLoadRef.current ||
      !videoRef.current
    ) {
      return undefined;
    }

    let cancelled = false;
    const video = videoRef.current;

    const runQueuedPlay = () => {
      if (cancelled || !videoRef.current || !shouldAutoplayAfterLoadRef.current) {
        return;
      }

      shouldAutoplayAfterLoadRef.current = false;
      videoRef.current.play().catch((error) => {
        if (isIgnorablePlaybackError(error)) {
          return;
        }
        console.error("Deferred playback error:", error);
      });
    };

    const onCanPlay = () => {
      video.removeEventListener("canplay", onCanPlay);
      runQueuedPlay();
    };

    const frame = requestAnimationFrame(() => {
      if (video.readyState >= 2) {
        runQueuedPlay();
      } else {
        video.addEventListener("canplay", onCanPlay, { once: true });
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [isHlsVideo, isIgnorablePlaybackError, playbackUrl]);

  if (!course) {
    return (
      <NoCourseSelected>
        <NoCourseIcon>
          <BookOpen size={36} color="white" />
        </NoCourseIcon>
        <NoCourseTitle>{t("coursePlayer.empty.title")}</NoCourseTitle>
        <NoCourseText>
          {t("coursePlayer.empty.description")}
        </NoCourseText>
      </NoCourseSelected>
    );
  }

  const youtubeId = isYouTube ? getYouTubeId(currentLessonData.videoUrl) : null;

  const coursePlayerContextValue = {
    addComment,
    addReply,
    admin: playerAdmin,
    course,
    courseId,
    currentLessonData,
    currentUser,
    fetchComments,
    formatCommentTime,
    formatViews,
    handleLessonClick,
    onClose,
    paginatedComments,
    playlistCollapsed,
    replyingTo,
    replyText,
    setCommentText,
    setCommentsExpanded,
    setPlaylistCollapsed,
    setReplyText,
    setReplyingTo,
    setShowCommentInput,
    showCommentInput,
    commentsExpanded,
    commentsHasMore,
    commentsPage,
    commentText,
    activeLesson,
    canAccessLesson,
    canAccessLessons,
  };

  return (
    <CoursePlayerProvider value={coursePlayerContextValue}>
      <PlayerContainer>
        <VideoSection>
          {/* VIDEO PLAYER */}
          {canAccessLesson(activeLesson) && currentLessonData && currentLessonHasMedia ? (
            <>
              {isYouTube && youtubeId ? (
                <VideoWrapper ref={videoWrapperRef}>
                  <YouTubeIframe
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={currentLessonData.title}
                  />
                  <TransparentVideoOverlay $visible>
                    <TopBar>
                      <FloatingBackButton onClick={() => onClose()}>
                        <ArrowLeft size={20} />
                      </FloatingBackButton>
                    </TopBar>
                  </TransparentVideoOverlay>
                </VideoWrapper>
              ) : (
                <VideoWrapper
                  ref={videoWrapperRef}
                  onMouseMove={showControlsHandler}
                  onMouseLeave={() => {
                    if (isPlaying) setShowControls(false);
                  }}
                  onClick={handlePlayerSurfaceClick}
                  onDoubleClick={handlePlayerSurfaceDoubleClick}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {(isLoadingVideo || isBuffering) && (
                    <LoadingOverlay>
                      <Spinner />
                    </LoadingOverlay>
                  )}
                  <NonSelectableVideo
                    key={currentMediaKey}
                    ref={videoRef}
                    src={
                      isLocalVideo
                        ? isHlsVideo
                          ? undefined
                          : playbackUrl || undefined
                        : currentMediaItem?.videoUrl || currentLessonData.videoUrl
                    }
                    preload="metadata"
                    playsInline
                    controls={false}
                    crossOrigin={isHlsVideo ? "anonymous" : undefined}
                    controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
                    disablePictureInPicture
                    disableRemotePlayback
                    onContextMenu={(e) => e.preventDefault()}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onWaiting={() => setIsBuffering(true)}
                    onCanPlay={() => {
                      setIsBuffering(false);
                      attemptQueuedAutoplay();
                    }}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        const nextDuration = Number(videoRef.current.duration || 0);
                        const currentMediaKey = String(
                          currentMediaItem?.mediaId ||
                            currentMediaItem?._id ||
                            currentMediaItem?.fileUrl ||
                            currentMediaItem?.videoUrl ||
                            activeMediaIndex,
                        );
                        setDuration(nextDuration);
                        setMediaDurations((prev) => ({
                          ...prev,
                          [currentMediaKey]: nextDuration,
                        }));
                        if (pendingSeekTimeRef.current !== null) {
                          videoRef.current.currentTime = pendingSeekTimeRef.current;
                          pendingSeekTimeRef.current = null;
                        }
                        videoRef.current.playbackRate = playbackSpeed;
                        attemptQueuedAutoplay();
                      }
                    }}
                    onError={(e) => {
                      if (!isLoadingVideo && !hlsInitializingRef.current)
                        setPlaybackError(
                          t("coursePlayer.errors.playback"),
                        );
                    }}
                    onEnded={playNextLesson}
                  />

                  {playbackError && (
                    <PlaybackErrorOverlay>
                      <AlertCircle size={48} />
                      <PlaybackErrorText>{playbackError}</PlaybackErrorText>
                    </PlaybackErrorOverlay>
                  )}

                  <VideoOverlay
                    $visible={showControls || !isPlaying}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TopBar>
                      <TopBarLeft>
                        <FloatingBackButton onClick={() => onClose()}>
                          <ArrowLeft size={20} />
                        </FloatingBackButton>
                        <TopBarTitleWrap>
                          <TopBarTitle>{currentLessonHeaderTitle}</TopBarTitle>
                          <TopBarSubtitle>
                            {(course?.name || "Jamm Course")} · {playbackSourceLabel}
                          </TopBarSubtitle>
                        </TopBarTitleWrap>
                      </TopBarLeft>
                    </TopBar>

                    <CenterControlsRow>
                      <SeekControlButton
                        onClick={(e) => {
                          e.stopPropagation();
                          skipBackward();
                          setShowControls(true);
                          resetControlsHideTimer();
                        }}
                        aria-label="10 soniya orqaga"
                      >
                        <SkipBack size={20} />
                      </SeekControlButton>

                      <MainPlayButton
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                        aria-label={isPlaying ? "Videoni to'xtatish" : "Videoni ijro etish"}
                      >
                        {isPlaying ? (
                          <Pause size={24} />
                        ) : (
                          <Play size={24} fill="white" color="white" />
                        )}
                      </MainPlayButton>

                      <SeekControlButton
                        onClick={(e) => {
                          e.stopPropagation();
                          skipForward();
                          setShowControls(true);
                          resetControlsHideTimer();
                        }}
                        aria-label="10 soniya oldinga"
                      >
                        <SkipForward size={20} />
                      </SeekControlButton>
                    </CenterControlsRow>

                    <ControlsBar>
                      <ProgressContainer
                        onMouseMove={(e) => {
                          handleProgressHover(e);
                          e.stopPropagation();
                        }}
                        onMouseLeave={() => {
                          setHoverTime(null);
                          setHoverSegmentLabel("");
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSeek(e);
                        }}
                      >
                        <BufferedProgress $width={buffered} />
                        <ProgressFilled $width={overallProgressPercent} />
                        <ProgressThumb $left={overallProgressPercent} />
                        {segmentBoundaries.map((left) => (
                          <ProgressSegmentDivider key={left} $left={left} />
                        ))}
                        {hoverTime !== null && (
                          <ProgressHoverTooltip $left={hoverX}>
                            {hoverSegmentLabel ? <strong>{hoverSegmentLabel}</strong> : null}
                            <span>{formatTime(hoverTime)}</span>
                          </ProgressHoverTooltip>
                        )}
                      </ProgressContainer>

                      <ControlsRow>
                        <ControlsLeft>
                          <SpeedToggleButton as="div" $active={false}>
                            {activeMediaIndex + 1}/{Math.max(lessonMediaItems.length, 1)}
                          </SpeedToggleButton>
                          <TopBarTitle as="div" style={{ fontSize: 13, fontWeight: 600 }}>
                            {formatTime(overallCurrentTime)} /{" "}
                            {formatTime(totalLessonDuration || duration)}
                          </TopBarTitle>
                        </ControlsLeft>
                        <ControlsRight>
                          <SpeedMenuAnchor onClick={(e) => e.stopPropagation()}>
                            <SpeedToggleButton
                              title={t("coursePlayer.speed.title")}
                              onClick={() => setShowSettings((v) => !v)}
                              $active={showSettings}
                              $accent={playbackSpeed !== 1}
                            >
                              <Settings2 size={14} />
                              Sozlamalar
                            </SpeedToggleButton>
                            {!isMobileViewport && showSettings && (
                              <SpeedMenu>
                                {renderSettingsContent()}
                              </SpeedMenu>
                            )}
                          </SpeedMenuAnchor>
                          <ControlButton onClick={toggleFullscreen}>
                            {isFullscreen ? (
                              <Minimize size={18} />
                            ) : (
                              <Maximize size={18} />
                            )}
                          </ControlButton>
                        </ControlsRight>
                      </ControlsRow>
                    </ControlsBar>
                  </VideoOverlay>
                </VideoWrapper>
              )}

              {/* Video info */}
              <VideoInfo>
                <VideoTitle>
                  {t("coursePlayer.meta.lesson", {
                    index: activeLesson + 1,
                    title: currentLessonData.title,
                  })}
                </VideoTitle>
                <VideoMeta>
                  <LikeButton
                    onClick={() =>
                      toggleLessonLike(courseId, currentLessonData._id)
                    }
                    $liked={currentLessonData.liked}
                  >
                    <Heart
                      size={14}
                      fill={currentLessonData.liked ? "currentColor" : "none"}
                    />
                    {currentLessonData.likes || 0} {t("coursePlayer.meta.likes")}
                  </LikeButton>
                  <LikeButton
                    onClick={handleCopyCurrentLessonLink}
                    title="Dars havolasini nusxalash"
                    aria-label="Dars havolasini nusxalash"
                  >
                    <Copy size={14} />
                    {t("common.copy")}
                  </LikeButton>
                  {lessonMediaItems.length > 1 ? (
                    <MetaItem>
                      <Video size={14} />
                      {activeMediaIndex + 1}/{lessonMediaItems.length}
                    </MetaItem>
                  ) : null}
                </VideoMeta>
              </VideoInfo>

              {/* Player tabs */}
              <PlayerTabsBar>
                <PlayerTab
                  $active={playerTab === "materials"}
                  onClick={() => setPlayerTab("materials")}
                >
                  {t("coursePlayer.tabs.materials")}
                </PlayerTab>
                <PlayerTab
                  $active={playerTab === "comments"}
                  onClick={() => {
                    setPlayerTab("comments");
                    setCommentsExpanded(true);
                  }}
                >
                  {t("coursePlayer.tabs.comments")}
                </PlayerTab>
                <PlayerTab
                  $active={playerTab === "more"}
                  onClick={() => setPlayerTab("more")}
                >
                  {t("coursePlayer.tabs.more")}
                </PlayerTab>
              </PlayerTabsBar>

              <PlayerTabContent>
                {/* MATERIALS TAB */}
                <div style={{ display: playerTab === "materials" ? "contents" : "none" }}>
                  <CoursePlayerMaterialsSection />
                  {hasLessonTests ? (
                    <CoursePlayerLessonTestsSection
                      forceExpanded
                      showCollapseToggle={false}
                    />
                  ) : null}
                  <CoursePlayerHomeworkSection
                    forceExpanded
                    showCollapseToggle={false}
                  />
                </div>

                {/* COMMENTS TAB */}
                <div style={{ display: playerTab === "comments" ? "contents" : "none" }}>
                  <CoursePlayerCommentsSection />
                </div>

                {/* MORE TAB */}
                {playerTab === "more" && (
                  <>
                    <CompactEnrollmentSection>
                      <EnrollmentInfo>
                        <CreatorAvatar>
                          {course?.createdBy?.avatar ? (
                            <AvatarImage src={course.createdBy.avatar} alt="author" />
                          ) : (
                            (course?.createdBy?.name || course?.createdBy?.username || "?")
                              .charAt(0)
                              .toUpperCase()
                          )}
                        </CreatorAvatar>
                        <CreatorMeta>
                          <CreatorName>
                            {course?.createdBy?.name ||
                              course?.createdBy?.username ||
                              t("coursePlayer.creator.author")}
                          </CreatorName>
                        </CreatorMeta>
                      </EnrollmentInfo>
                      <EnrollmentActions>
                        {enrollStatus === "pending" ? (
                          <EnrollmentActions>
                            <RoundedEnrollButton $variant="pending">
                              <Clock size={16} />
                              {t("coursePlayer.actions.pending")}
                            </RoundedEnrollButton>
                            <RoundedEnrollButton
                              $variant="admin"
                              onClick={() => removeUser(courseId, currentUserId)}
                            >
                              {t("coursePlayer.actions.cancel")}
                            </RoundedEnrollButton>
                          </EnrollmentActions>
                        ) : enrollStatus === "approved" || admin ? (
                          <RoundedEnrollButton $variant="enrolled">
                            <CheckCircle size={16} />
                            {t("coursePlayer.actions.enrolled")}
                          </RoundedEnrollButton>
                        ) : course?.accessType === "paid" && enrollStatus === "none" ? (
                          <RoundedEnrollButton
                            $variant="enroll"
                            onClick={async () => {
                              try {
                                await enrollInCourse(courseId);
                                const chatRes = await createChat({ isGroup: false, memberIds: [ownerId] });
                                if (chatRes) navigate(`/users/${chatRes?.jammId}`);
                              } catch (err) {
                                console.error(err);
                                toast.error(t("coursePlayer.errors.chatCreate"));
                              }
                            }}
                          >
                            <UserPlus size={16} />
                            {t("coursePlayer.actions.buy", { price: course?.price?.toLocaleString() || 0 })}
                          </RoundedEnrollButton>
                        ) : enrollStatus === "none" ? (
                          <RoundedEnrollButton $variant="enroll" onClick={() => enrollInCourse(courseId)}>
                            <UserPlus size={16} />
                            {t("coursePlayer.actions.enroll")}{" "}
                            {course?.price > 0 && `(${course.price})`}
                          </RoundedEnrollButton>
                        ) : null}
                      </EnrollmentActions>
                    </CompactEnrollmentSection>
                    <CourseInfoCard>
                      <CourseInfoTitle>{course.name}</CourseInfoTitle>
                      {course.description ? (
                        <CourseInfoDescription>{course.description}</CourseInfoDescription>
                      ) : null}
                      <CourseInfoMeta>
                        <CourseInfoMetaItem>
                          <Users size={14} />
                          {t("coursePlayer.creator.students", {
                            count: course?.members?.length || 0,
                          })}
                        </CourseInfoMetaItem>
                        <CourseInfoMetaItem>
                          <ListVideo size={14} />
                          {course.lessons.length} {t("courseSidebar.lessons")}
                        </CourseInfoMetaItem>
                      </CourseInfoMeta>
                      {currentLessonData?.description ? (
                        <LessonDescriptionCard>
                          <LessonDescriptionHeader>
                            <LessonDescriptionTitle>
                              {t("coursePlayer.description.title")}
                            </LessonDescriptionTitle>
                            {currentLessonData.description.length > 180 ? (
                              <LessonDescriptionToggle
                                type="button"
                                onClick={() => setDescriptionExpanded((prev) => !prev)}
                              >
                                {descriptionExpanded
                                  ? t("coursePlayer.description.less")
                                  : t("coursePlayer.description.more")}
                              </LessonDescriptionToggle>
                            ) : null}
                          </LessonDescriptionHeader>
                          <LessonDescriptionBody $expanded={descriptionExpanded}>
                            {currentLessonData.description}
                          </LessonDescriptionBody>
                        </LessonDescriptionCard>
                      ) : null}
                    </CourseInfoCard>
                    <CourseInfoCard>
                      <CourseInfoTitle>{t("coursePlayer.tabs.notes")}</CourseInfoTitle>
                      <NotesArea
                        placeholder={t("coursePlayer.tabs.notesPlaceholder")}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </CourseInfoCard>
                  </>
                )}
              </PlayerTabContent>
            </>
          ) : canAccessLesson(activeLesson) && currentLessonData ? (
            <LockedView>
              <LockedIcon>
                {currentLessonData.status === "draft" ? (
                  <Video size={32} color="var(--warning-color)" />
                ) : (
                  <AlertCircle size={32} color="var(--text-muted-color)" />
                )}
              </LockedIcon>
              <LockedTitle>
                {currentLessonData.status === "draft"
                  ? t("coursePlayer.locked.draftTitle")
                  : t("coursePlayer.locked.missingMediaTitle")}
              </LockedTitle>
              <LockedText $wide>
                {currentLessonData.status === "draft"
                  ? admin
                    ? t("coursePlayer.locked.draftAdminDescription")
                    : t("coursePlayer.locked.draftDescription")
                  : admin
                    ? t("coursePlayer.locked.missingMediaAdminDescription")
                    : t("coursePlayer.locked.missingMediaDescription")}
              </LockedText>
            </LockedView>
          ) : canAccessLesson(activeLesson) && course.lessons.length === 0 ? (
            <LockedView>
              <LockedIcon>
                <ListVideo size={32} color="var(--text-muted-color)" />
              </LockedIcon>
              <LockedTitle>{t("coursePlayer.locked.noLessonsTitle")}</LockedTitle>
              <LockedText>
                {admin
                  ? t("coursePlayer.locked.noLessonsAdmin")
                  : t("coursePlayer.locked.noLessonsUser")}
              </LockedText>
            </LockedView>
          ) : (
            <LockedView>
              <LockedIcon>
                {Array.isArray(currentLessonData?.accessLockedByTests) &&
                currentLessonData.accessLockedByTests.length > 0 ? (
                  <Shield size={32} color="var(--warning-color)" />
                ) : enrollStatus === "pending" ? (
                  <Clock size={32} color="var(--warning-color)" />
                ) : (
                  <LogIn size={32} color="var(--text-muted-color)" />
                )}
              </LockedIcon>
              <LockedTitle>
                {Array.isArray(currentLessonData?.accessLockedByTests) &&
                currentLessonData.accessLockedByTests.length > 0
                  ? t("coursePlayer.lessonTests.lockedTitle")
                  : enrollStatus === "pending"
                  ? t("coursePlayer.locked.pendingTitle")
                  : t("coursePlayer.locked.enrollTitle")}
              </LockedTitle>
              <LockedText $wide>
                {Array.isArray(currentLessonData?.accessLockedByTests) &&
                currentLessonData.accessLockedByTests.length > 0
                  ? t("coursePlayer.lessonTests.lockedDescription")
                  : enrollStatus === "pending"
                  ? t("coursePlayer.locked.pendingDescription")
                  : t("coursePlayer.locked.enrollDescription")}
              </LockedText>
            </LockedView>
          )}

        </VideoSection>

        <CoursePlayerPlaylistPanel />
      </PlayerContainer>

      {isMobileViewport && showSettings ? (
        <MobileSettingsSheetOverlay onClick={() => setShowSettings(false)}>
          <MobileSettingsSheetPanel onClick={(event) => event.stopPropagation()}>
            <MobileSettingsSheetHandle />
            <MobileSettingsSheetHeader>
              <MobileSettingsSheetTitle>
                {t("coursePlayer.speed.title")}
              </MobileSettingsSheetTitle>
              <MobileSettingsSheetClose
                type="button"
                onClick={() => setShowSettings(false)}
                aria-label="Sozlamalarni yopish"
              >
                <X size={18} />
              </MobileSettingsSheetClose>
            </MobileSettingsSheetHeader>
            <MobileSettingsSheetBody>{renderSettingsContent()}</MobileSettingsSheetBody>
          </MobileSettingsSheetPanel>
        </MobileSettingsSheetOverlay>
      ) : null}
    </CoursePlayerProvider>
  );
};

export default CoursePlayer;
