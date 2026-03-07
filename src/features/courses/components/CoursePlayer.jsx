import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Clock,
  Eye,
  Heart,
  BookOpen,
  UserCheck,
  UserX,
  UserPlus,
  Shield,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ListVideo,
  LogIn,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useCourses } from "../../../contexts/CoursesContext";
import { useChats } from "../../../contexts/ChatsContext";
import { useNavigate } from "react-router-dom";
import AddLessonDialog from "./AddLessonDialog";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import useAuthStore from "../../../store/authStore";
import { getLessonPlaybackToken } from "../../../api/coursesApi";
import { CoursePlayerProvider } from "../player/context/CoursePlayerContext";
import CoursePlayerCommentsSection from "../player/components/CoursePlayerCommentsSection";
import CoursePlayerPlaylistPanel from "../player/components/CoursePlayerPlaylistPanel";
import {
  ActionBtn,
  AdminPanel,
  AdminPanelInner,
  AdminSectionTitle,
  AvatarImage,
  BufferedProgress,
  CenterPlayButton,
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
  EnrollmentActions,
  EnrollmentInfo,
  FloatingBackButton,
  LikeButton,
  LoadingOverlay,
  LockedIcon,
  LockedText,
  LockedTitle,
  LockedView,
  ManageEnrollButton,
  MemberActions,
  MemberAvatar,
  MemberAvatarImage,
  MemberInfo,
  MemberName,
  MemberRow,
  MemberStatus,
  MetaItem,
  NoCourseIcon,
  NoCourseSelected,
  NoCourseText,
  NoCourseTitle,
  NonSelectableVideo,
  PendingMembersEmptyText,
  PlaybackErrorOverlay,
  PlaybackErrorText,
  PlayerBackButton,
  PlayerContainer,
  ProgressContainer,
  ProgressFilled,
  ProgressHoverTooltip,
  RoundedEnrollButton,
  SpeedMenu,
  SpeedMenuAnchor,
  SpeedMenuHeader,
  SpeedOption,
  SpeedToggleButton,
  Spinner,
  TimeDisplay,
  TopBar,
  TopBarLeft,
  TopBarTitle,
  TransparentVideoOverlay,
  VideoInfo,
  VideoMeta,
  VideoOverlay,
  VideoSection,
  VideoTitle,
  VideoWrapper,
  ViewCount,
  VolumeContainer,
  VolumeSlider,
  YouTubeIframe,
} from "../player/styles/CoursePlayer.styles";
import {
  formatCommentTime,
  formatTime,
  formatViews,
  getEntityId,
  getYouTubeId,
} from "../player/utils/coursePlayerUtils";
const CoursePlayer = ({ courseId, initialLessonSlug, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createChat } = useChats();
  const {
    courses,
    currentUser,
    isAdmin,
    isEnrolled,
    enrollInCourse,
    approveUser,
    removeUser,
    incrementViews,
    removeLesson,
    getLessonComments,
    addComment,
    addReply,
    toggleLessonLike,
    joinCourseRoom,
    leaveCourseRoom,
  } = useCourses();

  const [activeLesson, setActiveLesson] = useState(0);
  const [playlistCollapsed, setPlaylistCollapsed] = useState(false);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [paginatedComments, setPaginatedComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsHasMore, setCommentsHasMore] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [isDeletingLesson, setIsDeletingLesson] = useState(false);

  // Video player state
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const hlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackError, setPlaybackError] = useState(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [hasCountedView, setHasCountedView] = useState(false);
  const hideControlsTimer = useRef(null);
  // Secure streaming state
  const [playbackUrl, setPlaybackUrl] = useState(null);
  const [playbackStreamType, setPlaybackStreamType] = useState("direct");
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  // Player enhancements
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverX, setHoverX] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  const course = courses.find(
    (c) =>
      c._id === courseId ||
      c.urlSlug === courseId ||
      String(c.id) === String(courseId),
  );
  const lessons = course?.lessons || [];
  const currentLesson = lessons[activeLesson] || null;

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
    if (commentsExpanded) {
      fetchComments(1);
    }
  }, [currentLesson?._id, commentsExpanded, fetchComments]);

  const enrollmentStatus = isEnrolled(courseId);
  const admin = course ? isAdmin(courseId) : false;
  const currentUserId = getEntityId(currentUser);
  const ownerId = getEntityId(course?.createdBy);
  const isOwner = String(ownerId || "") === String(currentUserId || "");

  const handleDeleteLessonConfirm = async () => {
    if (!lessonToDelete) return;
    try {
      setIsDeletingLesson(true);
      await removeLesson(courseId, lessonToDelete);
      if (activeLesson >= course.lessons.length - 1 && activeLesson > 0) {
        setActiveLesson(activeLesson - 1);
      }
      setLessonToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error(t("coursePlayer.errors.deleteLesson"));
    } finally {
      setIsDeletingLesson(false);
    }
  };

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
  const enrollStatus = enrollmentStatus;
  const canAccessLessons = isOwner || enrollStatus === "approved" || admin;
  const canAccessLesson = useCallback(
    (index) => canAccessLessons || index === 0,
    [canAccessLessons],
  );

  // Reset state when course changes
  useEffect(() => {
    setActiveLesson(0);
    setPlaylistCollapsed(false);
    setIsAdminPanelOpen(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setHasCountedView(false);
  }, [courseId]);

  const isPreviewMode = !canAccessLessons && activeLesson === 0;

  // Track views — fire once per lesson per session, after 10 seconds
  const viewedLessonsRef = useRef(new Set());

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);

    const lessonId = currentLesson?._id || currentLesson?.id;
    if (
      !courseId ||
      !lessonId ||
      !canAccessLesson(activeLesson) ||
      viewedLessonsRef.current.has(lessonId)
    ) {
      return;
    }

    // Track views after 10 seconds of being on the lesson
    const viewTimer = setTimeout(() => {
      incrementViews(courseId, lessonId);
      viewedLessonsRef.current.add(lessonId);
    }, 10000);

    return () => clearTimeout(viewTimer);
  }, [activeLesson, courseId, currentLesson, canAccessLesson, incrementViews]);

  // Video player handlers
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    setPlaybackError(null);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
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
  }, [isPlaying]);

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
  }, []);

  const handleDuration = useCallback((duration) => {
    setDuration(duration);
  }, []);

  const handleSeek = useCallback(
    (e) => {
      if (!videoRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    },
    [duration],
  );

  const handleVolumeChange = useCallback((e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    setIsMuted(val === 0);
  }, []);

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
    if (!videoWrapperRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      videoWrapperRef.current.requestFullscreen();
      setIsFullscreen(true);
    }
  }, []);

  const skipForward = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime += 10;
  }, []);

  const skipBackward = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime -= 10;
  }, []);

  const handleSpeedChange = useCallback((speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setShowSettings(false);
  }, []);

  const handleProgressHover = useCallback(
    (e) => {
      if (!duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      setHoverTime(percent * duration);
      setHoverX(e.clientX - rect.left);
    },
    [duration],
  );

  const showControlsHandler = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

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
    setActiveLesson(index);
    const lessonData = course.lessons[index];
    if (lessonData) {
      const lessonSlug = lessonData.urlSlug || lessonData._id || lessonData.id;
      const courseSlug = course.urlSlug || course._id || course.id;
      // Update URL without full page reload
      window.history.replaceState(
        null,
        "",
        `/courses/${courseSlug}/${lessonSlug}`,
      );
    }
  };

  const playNextLesson = useCallback(() => {
    if (course && activeLesson < course.lessons.length - 1) {
      setActiveLesson((prev) => prev + 1);
    }
  }, [course, activeLesson]);

  // Derived values needed for secure playback setup.
  const currentLessonData = course?.lessons?.[activeLesson];
  const isYouTube = currentLessonData?.videoUrl?.includes("youtu");
  const isLocalVideo = currentLessonData?.type === "file";
  const isHlsVideo =
    isLocalVideo &&
    (currentLessonData?.streamType === "hls" ||
      currentLessonData?.videoUrl?.endsWith(".m3u8") ||
      playbackStreamType === "hls");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const lessonIdentifier =
    currentLessonData?.urlSlug ||
    currentLessonData?._id ||
    currentLessonData?.id;

  // Secure stream URL: mint a short-lived playback token, then let the browser
  // request byte ranges directly instead of downloading the full file as a Blob.
  useEffect(() => {
    if (!isLocalVideo || !lessonIdentifier || !canAccessLesson(activeLesson)) {
      setPlaybackUrl(null);
      setPlaybackStreamType("direct");
      return;
    }
    let cancelled = false;
    const preparePlayback = async () => {
      setIsLoadingVideo(true);
      setPlaybackUrl(null);
      setPlaybackStreamType("direct");
      setPlaybackError(null);
      try {
        const { streamUrl, streamType } = await getLessonPlaybackToken(
          courseId,
          lessonIdentifier,
        );
        if (cancelled || !streamUrl) return;

        const absoluteStreamUrl = streamUrl.startsWith("http")
          ? streamUrl
          : `${API_URL}${streamUrl}`;
        setPlaybackStreamType(streamType || "direct");
        setPlaybackUrl(absoluteStreamUrl);
      } catch (err) {
        if (!cancelled) setPlaybackError(t("coursePlayer.errors.playbackToken"));
      } finally {
        if (!cancelled) setIsLoadingVideo(false);
      }
    };

    preparePlayback();

    return () => {
      cancelled = true;
    };
  }, [
    activeLesson,
    canAccessLesson,
    courseId,
    isLocalVideo,
    lessonIdentifier,
    API_URL,
  ]);

  useEffect(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const video = videoRef.current;
    if (!video || !playbackUrl || !isHlsVideo) return;

    let cancelled = false;

    const attachHls = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
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

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        xhrSetup: (xhr) => {
          xhr.withCredentials = true;
        },
      });
      hlsRef.current = hls;
      hls.loadSource(playbackUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data?.fatal) {
          setPlaybackError(t("coursePlayer.errors.hlsPlayback"));
          hls.destroy();
          hlsRef.current = null;
        }
      });
    };

    attachHls();

    return () => {
      cancelled = true;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isHlsVideo, playbackUrl]);

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

  const approvedMembers = course.members.filter((m) => m.status === "approved");
  const pendingMembers = course.members.filter((m) => m.status === "pending");

  const youtubeId = isYouTube ? getYouTubeId(currentLessonData.videoUrl) : null;

  const coursePlayerContextValue = {
    addComment,
    addReply,
    admin,
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
    setIsAddLessonOpen,
    setLessonToDelete,
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
          {canAccessLesson(activeLesson) && currentLessonData ? (
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
                  onClick={togglePlay}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {(isLoadingVideo || isBuffering) && (
                    <LoadingOverlay>
                      <Spinner />
                    </LoadingOverlay>
                  )}
                  <NonSelectableVideo
                    ref={videoRef}
                    src={
                      isLocalVideo
                        ? isHlsVideo
                          ? undefined
                          : playbackUrl || undefined
                        : currentLessonData.videoUrl
                    }
                    preload="metadata"
                    crossOrigin="use-credentials"
                    controlsList="nodownload"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onWaiting={() => setIsBuffering(true)}
                    onCanPlay={() => setIsBuffering(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        setDuration(videoRef.current.duration);
                        videoRef.current.playbackRate = playbackSpeed;
                      }
                    }}
                    onError={(e) => {
                      if (!isLoadingVideo)
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

                  <CenterPlayButton
                    $visible={!isPlaying && !playbackError}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                  >
                    <Play size={32} fill="white" color="white" />
                  </CenterPlayButton>

                  <VideoOverlay
                    $visible={showControls || !isPlaying}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TopBar>
                      <TopBarLeft>
                        <PlayerBackButton onClick={() => onClose()}>
                          <ArrowLeft size={20} />
                        </PlayerBackButton>
                        <TopBarTitle>{currentLessonData.title}</TopBarTitle>
                      </TopBarLeft>
                    </TopBar>

                    <ControlsBar>
                      <ProgressContainer
                        onMouseMove={(e) => {
                          handleProgressHover(e);
                          e.stopPropagation();
                        }}
                        onMouseLeave={() => setHoverTime(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSeek(e);
                        }}
                      >
                        <BufferedProgress $width={buffered} />
                        <ProgressFilled
                          $width={duration ? (currentTime / duration) * 100 : 0}
                        />
                        {hoverTime !== null && (
                          <ProgressHoverTooltip $left={hoverX}>
                            {formatTime(hoverTime)}
                          </ProgressHoverTooltip>
                        )}
                      </ProgressContainer>

                      <ControlsRow>
                        <ControlsLeft>
                          <ControlButton onClick={togglePlay}>
                            {isPlaying ? (
                              <Pause size={20} />
                            ) : (
                              <Play size={20} fill="white" />
                            )}
                          </ControlButton>
                          <ControlButton onClick={skipBackward} title="-10s">
                            <SkipBack size={18} />
                          </ControlButton>
                          <ControlButton onClick={skipForward} title="+10s">
                            <SkipForward size={18} />
                          </ControlButton>
                          <VolumeContainer>
                            <ControlButton onClick={toggleMute}>
                              {isMuted ? (
                                <VolumeX size={18} />
                              ) : (
                                <Volume2 size={18} />
                              )}
                            </ControlButton>
                            <VolumeSlider
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                            />
                          </VolumeContainer>
                          <TimeDisplay>
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </TimeDisplay>
                        </ControlsLeft>
                        <ControlsRight>
                          <SpeedMenuAnchor onClick={(e) => e.stopPropagation()}>
                            <SpeedToggleButton
                              title={t("coursePlayer.speed.title")}
                              onClick={() => setShowSettings((v) => !v)}
                              $active={showSettings}
                              $accent={playbackSpeed !== 1}
                            >
                              {playbackSpeed}x
                            </SpeedToggleButton>
                            {showSettings && (
                              <SpeedMenu>
                                <SpeedMenuHeader>{t("coursePlayer.speed.title")}</SpeedMenuHeader>
                                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                                  <SpeedOption
                                    key={speed}
                                    onClick={() => handleSpeedChange(speed)}
                                    $active={playbackSpeed === speed}
                                  >
                                    {speed === 1
                                      ? t("coursePlayer.speed.normal")
                                      : `${speed}x`}
                                  </SpeedOption>
                                ))}
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
                  <ViewCount>
                    <Eye size={14} />
                    {formatViews(currentLessonData.views)} {t("coursePlayer.meta.views")}
                  </ViewCount>
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
                  <MetaItem>
                    <BookOpen size={14} />
                    {course.name}
                  </MetaItem>
                </VideoMeta>
              </VideoInfo>

              <CoursePlayerCommentsSection />
            </>
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
                {enrollStatus === "pending" ? (
                  <Clock size={32} color="var(--warning-color)" />
                ) : (
                  <LogIn size={32} color="var(--text-muted-color)" />
                )}
              </LockedIcon>
              <LockedTitle>
                {enrollStatus === "pending"
                  ? t("coursePlayer.locked.pendingTitle")
                  : t("coursePlayer.locked.enrollTitle")}
              </LockedTitle>
              <LockedText $wide>
                {enrollStatus === "pending"
                  ? t("coursePlayer.locked.pendingDescription")
                  : t("coursePlayer.locked.enrollDescription")}
              </LockedText>
            </LockedView>
          )}

          {/* YouTube-like Author & Enrollment Section */}
          <CompactEnrollmentSection>
            <EnrollmentInfo>
              <CreatorAvatar>
                {course?.createdBy?.avatar ? (
                  <AvatarImage
                    src={course.createdBy.avatar}
                    alt="author"
                  />
                ) : (
                  (
                    course?.createdBy?.name ||
                    course?.createdBy?.username ||
                    "?"
                  )
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
                <CreatorCount>
                  {t("coursePlayer.creator.students", {
                    count: course?.members?.length || 0,
                  })}
                </CreatorCount>
              </CreatorMeta>
            </EnrollmentInfo>

            <EnrollmentActions>
              {admin ? (
                <ManageEnrollButton
                  $variant="admin"
                  onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
                >
                  <Shield size={16} />
                  {t("coursePlayer.actions.manage")}
                  {isAdminPanelOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </ManageEnrollButton>
              ) : enrollStatus === "pending" ? (
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
              ) : enrollStatus === "approved" ? (
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
                      const authorId = ownerId;
                      const chatRes = await createChat({
                        isGroup: false,
                        memberIds: [authorId],
                      });

                      if (chatRes) {
                        navigate(`/users/${chatRes?.jammId}`);
                      }
                    } catch (err) {
                      console.error(err);
                      toast.error(t("coursePlayer.errors.chatCreate"));
                    }
                  }}
                >
                  <UserPlus size={16} />
                  {t("coursePlayer.actions.buy", {
                    price: course?.price?.toLocaleString() || 0,
                  })}
                </RoundedEnrollButton>
              ) : enrollStatus === "none" ? (
                <RoundedEnrollButton
                  $variant="enroll"
                  onClick={() => enrollInCourse(courseId)}
                >
                  <UserPlus size={16} />
                  {t("coursePlayer.actions.enroll")}{" "}
                  {course?.price > 0 && `(${course.price})`}
                </RoundedEnrollButton>
              ) : null}
            </EnrollmentActions>
          </CompactEnrollmentSection>

          {/* Admin Members Panel */}
          {admin && (
            <AdminPanel $open={isAdminPanelOpen}>
              <AdminPanelInner>
                {pendingMembers.length > 0 && (
                  <>
                    <AdminSectionTitle>
                      {t("coursePlayer.members.pendingTitle", {
                        count: pendingMembers.length,
                      })}
                    </AdminSectionTitle>
                    {pendingMembers.map((member) => (
                      <MemberRow key={member.userId || member._id || member.id}>
                        <MemberAvatar>
                          {member.avatar?.length > 1 ? (
                            <MemberAvatarImage src={member.avatar} alt="avatar" />
                          ) : (
                            member.name.charAt(0)
                          )}
                        </MemberAvatar>
                        <MemberInfo>
                          <MemberName>{member.name}</MemberName>
                          <MemberStatus $pending>
                            {t("coursePlayer.members.pending")}
                          </MemberStatus>
                        </MemberInfo>
                        <MemberActions>
                          <ActionBtn
                            $approve
                            onClick={() =>
                              approveUser(
                                courseId,
                                member.userId || member._id || member.id,
                              )
                            }
                            title={t("coursePlayer.actions.approve")}
                          >
                            <UserCheck size={16} />
                          </ActionBtn>
                          <ActionBtn
                            onClick={() =>
                              removeUser(
                                courseId,
                                member.userId || member._id || member.id,
                              )
                            }
                            title={t("coursePlayer.actions.reject")}
                          >
                            <UserX size={16} />
                          </ActionBtn>
                        </MemberActions>
                      </MemberRow>
                    ))}
                  </>
                )}
                <AdminSectionTitle $spaced={pendingMembers.length > 0}>
                  {t("coursePlayer.members.approvedTitle", {
                    count: approvedMembers.length,
                  })}
                </AdminSectionTitle>
                {approvedMembers.length === 0 ? (
                  <PendingMembersEmptyText>
                    {t("coursePlayer.members.empty")}
                  </PendingMembersEmptyText>
                ) : (
                  approvedMembers.map((member) => (
                    <MemberRow key={member.userId || member._id || member.id}>
                      <MemberAvatar>
                        {member.avatar?.length > 1 ? (
                          <MemberAvatarImage src={member.avatar} alt="avatar" />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </MemberAvatar>
                      <MemberInfo>
                        <MemberName>{member.name}</MemberName>
                        <MemberStatus>{t("coursePlayer.members.approved")}</MemberStatus>
                      </MemberInfo>
                      <MemberActions>
                        <ActionBtn
                          onClick={() =>
                            removeUser(
                              courseId,
                              member.userId || member._id || member.id,
                            )
                          }
                          title={t("coursePlayer.actions.remove")}
                        >
                          <UserX size={16} />
                        </ActionBtn>
                      </MemberActions>
                    </MemberRow>
                  ))
                )}
              </AdminPanelInner>
            </AdminPanel>
          )}
        </VideoSection>

        <CoursePlayerPlaylistPanel />
      </PlayerContainer>

      <AddLessonDialog
        isOpen={isAddLessonOpen}
        onClose={() => setIsAddLessonOpen(false)}
        courseId={courseId}
        onCreated={(lessonId) => {
          setIsAddLessonOpen(false);
          setActiveLesson(course.lessons.length);
        }}
      />

      <ConfirmDialog
        isOpen={!!lessonToDelete}
        onClose={() => setLessonToDelete(null)}
        title={t("coursePlayer.deleteLesson.title")}
        description={t("coursePlayer.deleteLesson.description")}
        confirmText={
          isDeletingLesson
            ? t("coursePlayer.deleteLesson.confirmLoading")
            : t("coursePlayer.deleteLesson.confirm")
        }
        cancelText={t("coursePlayer.deleteLesson.cancel")}
        onConfirm={handleDeleteLessonConfirm}
        isDanger={true}
      />
    </CoursePlayerProvider>
  );
};

export default CoursePlayer;
