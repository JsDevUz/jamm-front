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
  ArrowLeft,
  SkipBack,
  SkipForward,
  Share2,
  Users,
  X,
  Shield,
  AlertCircle,
  Star,
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
  NoteStatusText,
  RatingForm,
  RatingStars,
  RatingStarButton,
  ReviewSaveButton,
  NotionSurface,
  NotionSurfaceBody,
  NotionSurfaceFrame,
  NotionSurfaceHeader,
  NotionSurfaceText,
  NotionSurfaceTitle,
} from "../player/styles/CoursePlayer.styles";
import {
  formatCommentTime,
  formatTime,
  formatViews,
  getEntityId,
  getYouTubeId,
} from "../player/utils/coursePlayerUtils";

function hasLessonActivity(lesson) {
  const hasAttendanceProgress =
    Number(lesson?.selfAttendance?.progressPercent || 0) > 0 ||
    lesson?.selfAttendance?.status === "present" ||
    lesson?.selfAttendance?.status === "late";
  const hasHomeworkSubmission = Array.isArray(lesson?.homework?.assignments)
    ? lesson.homework.assignments.some((assignment) => Boolean(assignment?.selfSubmission))
    : false;
  const hasLinkedTestProgress = Array.isArray(lesson?.linkedTests)
    ? lesson.linkedTests.some((test) => {
        const progress = test?.selfProgress;
        return (
          Number(progress?.attemptsCount || 0) > 0 ||
          Number(progress?.percent || 0) > 0 ||
          Boolean(progress?.completedAt)
        );
      })
    : false;

  return hasAttendanceProgress || hasHomeworkSubmission || hasLinkedTestProgress;
}

const getLessonLearningTaskStatus = (lesson) => {
  const tests = Array.isArray(lesson?.linkedTests) ? lesson.linkedTests : [];
  const homeworkAssignments = Array.isArray(lesson?.homework?.assignments)
    ? lesson.homework.assignments
    : [];

  return {
    tests: {
      count: tests.length,
      completed: tests.filter((test) => {
        const progress = test?.selfProgress;
        return (
          Boolean(progress?.passed) ||
          Number(progress?.attemptsCount || 0) > 0 ||
          Number(progress?.percent || 0) > 0 ||
          Boolean(progress?.completedAt)
        );
      }).length,
    },
    homework: {
      count: homeworkAssignments.length,
      completed: homeworkAssignments.filter((assignment) =>
        Boolean(assignment?.selfSubmission),
      ).length,
    },
  };
};

const clampPercent = (value) =>
  Math.min(100, Math.max(0, Number(value || 0)));

function normalizeNotionBlocks(recordMap) {
  const blockMap = recordMap?.block || {};
  const entries = Object.values(blockMap)
    .map((entry) => entry?.value?.value || entry?.value || null)
    .filter((entry) => entry && entry.id && entry.type);

  if (!entries.length) {
    return [];
  }

  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const rootPage =
    entries.find((entry) => entry?.type === "page" && Array.isArray(entry?.content)) ||
    entries.find((entry) => entry?.type === "page") ||
    null;

  if (!rootPage) {
    return entries;
  }

  const ordered = [rootPage];
  const seen = new Set([rootPage.id]);

  const visit = (blockId) => {
    const child = byId.get(blockId);
    if (!child || seen.has(child.id)) {
      return;
    }
    ordered.push(child);
    seen.add(child.id);
    if (Array.isArray(child.content)) {
      child.content.forEach(visit);
    }
  };

  (Array.isArray(rootPage.content) ? rootPage.content : []).forEach(visit);

  entries.forEach((entry) => {
    if (!seen.has(entry.id)) {
      ordered.push(entry);
      seen.add(entry.id);
    }
  });

  return ordered;
}

function getNotionTitleSegments(block) {
  return Array.isArray(block?.properties?.title) ? block.properties.title : [];
}

function getNotionPlainText(block) {
  return getNotionTitleSegments(block)
    .map((segment) => String(segment?.[0] || ""))
    .join("");
}

function renderRichTextSegments(segments, keyPrefix) {
  if (!Array.isArray(segments) || !segments.length) {
    return null;
  }

  return segments.map((segment, index) => {
    const text = String(segment?.[0] || "");
    const marks = Array.isArray(segment?.[1]) ? segment[1] : [];
    const style = {};
    let href = "";

    marks.forEach((mark) => {
      const [type, value] = Array.isArray(mark) ? mark : [];
      if (type === "b") style.fontWeight = 700;
      if (type === "i") style.fontStyle = "italic";
      if (type === "s") style.textDecoration = "line-through";
      if (type === "_") style.textDecoration = "underline";
      if (type === "c") {
        style.fontFamily = "ui-monospace, SFMono-Regular, Menlo, monospace";
        style.background = "rgba(255,255,255,0.08)";
        style.padding = "0.12em 0.35em";
        style.borderRadius = "6px";
        style.fontSize = "0.92em";
      }
      if (type === "a") href = String(value || "");
    });

    const content = text.split("\n").map((part, lineIndex, array) => (
      <React.Fragment key={`${keyPrefix}-${index}-${lineIndex}`}>
        {part}
        {lineIndex < array.length - 1 ? <br /> : null}
      </React.Fragment>
    ));

    if (href) {
      return (
        <a
          key={`${keyPrefix}-${index}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          style={style}
        >
          {content}
        </a>
      );
    }

    return (
      <span key={`${keyPrefix}-${index}`} style={style}>
        {content}
      </span>
    );
  });
}

function NotionBlockRenderer({ recordMap }) {
  const blocks = useMemo(() => normalizeNotionBlocks(recordMap), [recordMap]);

  if (!blocks.length) {
    return null;
  }

  const rendered = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const type = String(block?.type || "");

    if (type === "page") {
      rendered.push(
        <div key={block.id} className="jamm-notion-page-title">
          {renderRichTextSegments(
            getNotionTitleSegments(block),
            `page-${block.id}`,
          )}
        </div>,
      );
      continue;
    }

    if (type === "bulleted_list" || type === "numbered_list") {
      const isOrdered = type === "numbered_list";
      const items = [];
      let cursor = index;
      while (cursor < blocks.length && blocks[cursor]?.type === type) {
        const listBlock = blocks[cursor];
        items.push(
          <li key={listBlock.id}>
            {renderRichTextSegments(
              getNotionTitleSegments(listBlock),
              `list-${listBlock.id}`,
            )}
          </li>,
        );
        cursor += 1;
      }

      rendered.push(
        isOrdered ? (
          <ol key={`list-${block.id}`} className="jamm-notion-list">
            {items}
          </ol>
        ) : (
          <ul key={`list-${block.id}`} className="jamm-notion-list">
            {items}
          </ul>
        ),
      );
      index = cursor - 1;
      continue;
    }

    if (type === "text" || type === "paragraph") {
      rendered.push(
        <p key={block.id} className="jamm-notion-paragraph">
          {renderRichTextSegments(
            getNotionTitleSegments(block),
            `text-${block.id}`,
          )}
        </p>,
      );
      continue;
    }

    if (type === "header") {
      rendered.push(
        <h2 key={block.id} className="jamm-notion-heading jamm-notion-heading-lg">
          {renderRichTextSegments(
            getNotionTitleSegments(block),
            `header-${block.id}`,
          )}
        </h2>,
      );
      continue;
    }

    if (type === "sub_header") {
      rendered.push(
        <h3 key={block.id} className="jamm-notion-heading jamm-notion-heading-md">
          {renderRichTextSegments(
            getNotionTitleSegments(block),
            `subheader-${block.id}`,
          )}
        </h3>,
      );
      continue;
    }

    if (type === "sub_sub_header") {
      rendered.push(
        <h4 key={block.id} className="jamm-notion-heading jamm-notion-heading-sm">
          {renderRichTextSegments(
            getNotionTitleSegments(block),
            `subsubheader-${block.id}`,
          )}
        </h4>,
      );
      continue;
    }

    if (type === "to_do") {
      const checked = block?.properties?.checked?.[0]?.[0] === "Yes";
      rendered.push(
        <label key={block.id} className="jamm-notion-todo">
          <input type="checkbox" checked={checked} readOnly />
          <span>
            {renderRichTextSegments(
              getNotionTitleSegments(block),
              `todo-${block.id}`,
            )}
          </span>
        </label>,
      );
      continue;
    }

    if (type === "quote") {
      rendered.push(
        <blockquote key={block.id} className="jamm-notion-quote">
          {renderRichTextSegments(
            getNotionTitleSegments(block),
            `quote-${block.id}`,
          )}
        </blockquote>,
      );
      continue;
    }

    if (type === "callout") {
      rendered.push(
        <div key={block.id} className="jamm-notion-callout">
          <div className="jamm-notion-callout-icon">
            {block?.format?.page_icon || "💡"}
          </div>
          <div className="jamm-notion-callout-text">
            {renderRichTextSegments(
              getNotionTitleSegments(block),
              `callout-${block.id}`,
            )}
          </div>
        </div>,
      );
      continue;
    }

    if (type === "divider") {
      rendered.push(<hr key={block.id} className="jamm-notion-divider" />);
      continue;
    }

    if (type === "code") {
      rendered.push(
        <pre key={block.id} className="jamm-notion-code">
          <code>{getNotionPlainText(block)}</code>
        </pre>,
      );
      continue;
    }

    if (type === "image") {
      const src = block?.properties?.source?.[0]?.[0] || "";
      if (!src) {
        continue;
      }
      const absoluteUrl = src.startsWith("http")
        ? src
        : `https://www.notion.so/image/${encodeURIComponent(src)}`;
      rendered.push(
        <img
          key={block.id}
          className="jamm-notion-image"
          src={absoluteUrl}
          alt={getNotionPlainText(block) || "Notion image"}
        />,
      );
      continue;
    }
  }

  return <div className="jamm-notion-root">{rendered}</div>;
}

function LessonNotionSurface({
  notionUrl,
  title,
  compact = false,
  onReadComplete,
}) {
  const { t } = useTranslation();
  const bodyRef = useRef(null);
  const [recordMap, setRecordMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const readCompleteRef = useRef(false);

  const markReadComplete = useCallback(() => {
    if (readCompleteRef.current) return;
    readCompleteRef.current = true;
    onReadComplete?.();
  }, [onReadComplete]);

  const checkReadCompletion = useCallback(() => {
    const element = bodyRef.current;
    if (!element || loading || error || !recordMap) return;

    const remaining =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    if (remaining <= 48) {
      markReadComplete();
    }
  }, [error, loading, markReadComplete, recordMap]);

  useEffect(() => {
    if (!notionUrl) return;
    let cancelled = false;
    readCompleteRef.current = false;
    setLoading(true);
    setError("");
    setRecordMap(null);

    fetch(`${API_BASE_URL}/courses/proxy/notion?url=${encodeURIComponent(notionUrl)}`, {
      credentials: "include",
    })
      .then(async (r) => {
        if (!r.ok) {
          let message = "Notion sahifani yuklab bo'lmadi";
          try {
            const payload = await r.json();
            if (typeof payload?.message === "string" && payload.message.trim()) {
              message = payload.message.trim();
            } else if (Array.isArray(payload?.message) && payload.message.length > 0) {
              message = String(payload.message[0] || message);
            }
          } catch {
            try {
              const text = await r.text();
              if (text.trim()) {
                message = text.trim();
              }
            } catch {
              // ignore secondary parse failure
            }
          }
          throw new Error(message);
        }
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        setRecordMap(data?.recordMap || null);
      })
      .catch((nextError) => {
        if (!cancelled) {
          setError(
            nextError instanceof Error && nextError.message.trim()
              ? nextError.message.trim()
              : "Notion sahifani yuklab bo'lmadi",
          );
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [notionUrl]);

  useEffect(() => {
    if (!recordMap || loading || error) return undefined;
    const frameId = window.requestAnimationFrame(checkReadCompletion);
    return () => window.cancelAnimationFrame(frameId);
  }, [checkReadCompletion, error, loading, recordMap]);

  if (!notionUrl) return null;

  return (
    <NotionSurface $compact={compact}>
      <NotionSurfaceBody
        ref={bodyRef}
        $compact={compact}
        onScroll={checkReadCompletion}
      >
        {loading && <NotionSurfaceText>{t("common.loading", { defaultValue: "Yuklanmoqda..." })}</NotionSurfaceText>}
        {Boolean(error) && (
          <NotionSurfaceText>
            {error}.{" "}
            <a href={notionUrl} target="_blank" rel="noreferrer">Bu yerda oching</a>
          </NotionSurfaceText>
        )}
        {recordMap && <NotionBlockRenderer recordMap={recordMap} />}
      </NotionSurfaceBody>
    </NotionSurface>
  );
}


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
    upsertLessonNote,
    upsertCourseReview,
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
  const [materialsStatus, setMaterialsStatus] = useState({
    loading: true,
    count: 0,
  });
  const [homeworkStatus, setHomeworkStatus] = useState({
    loading: true,
    count: 0,
    completed: 0,
  });
  const [lessonTestsStatus, setLessonTestsStatus] = useState({
    loading: true,
    count: 0,
    completed: 0,
  });
  const [notes, setNotes] = useState("");
  const [noteStatus, setNoteStatus] = useState("");
  const [courseReviewRating, setCourseReviewRating] = useState(0);
  const [courseReviewText, setCourseReviewText] = useState("");
  const [courseReviewSaving, setCourseReviewSaving] = useState(false);
  const clickActionTimerRef = useRef(null);
  const noteSaveTimerRef = useRef(null);
  const noteBaselineRef = useRef("");
  const noteLessonKeyRef = useRef("");
  // Refs for attendance tracking — declared early so derived values below can write to them.
  const overallCurrentTimeRef = useRef(0);
  const totalLessonDurationRef = useRef(0);
  const attendanceEligibleRef = useRef(false);
  const currentLessonIdRef = useRef("");
  const attendanceLastFlushedSecondRef = useRef({});
  const attendanceLessonConfigRef = useRef({});
  const attendanceNotionReadRef = useRef({});
  const attendanceTestsStatusRef = useRef({});
  const attendanceHomeworkStatusRef = useRef({});

  // Video player state
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const playerContainerRef = useRef(null);
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

  const scrollPlayerToTop = useCallback((behavior = "auto") => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior });
    }

    const container = playerContainerRef.current;
    if (!container) return;

    if (typeof container.scrollTo === "function") {
      container.scrollTo({ top: 0, behavior });
    } else {
      container.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => setIsMobileViewport(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    scrollPlayerToTop("auto");
  }, [activeLesson, scrollPlayerToTop]);

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
  const currentLessonNotionUrl = String(currentLessonData?.notionUrl || "").trim();
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
  const currentLessonAttendanceId =
    currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug || "";
  const currentLessonAttendanceKey = String(currentLessonAttendanceId || "");
  const lessonIdentifier =
    currentLessonData?.urlSlug ||
    currentLessonData?._id ||
    currentLessonData?.id;
  const shouldShowMaterialsEmptyState =
    !hasLessonTests &&
    !materialsStatus.loading &&
    !homeworkStatus.loading &&
    materialsStatus.count === 0 &&
    homeworkStatus.count === 0;
  const currentLessonHasMedia = Boolean(
    lessonMediaItems.length || currentLessonData?.videoUrl || currentLessonData?.fileUrl,
  );
  const currentLessonHasVideoMedia = currentLessonHasMedia;
  const currentLessonHasRenderableContent = Boolean(
    currentLessonHasVideoMedia || currentLessonNotionUrl,
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
  const currentMediaIdentifier =
    currentMediaItem?.mediaId ||
    currentMediaItem?._id ||
    currentMediaItem?.fileUrl ||
    currentMediaItem?.videoUrl ||
    String(activeMediaIndex);
  const currentLessonHeaderTitle = currentLessonData
    ? `${activeLesson + 1}-dars: ${currentLessonData.title || course?.name || "Dars"}`
    : course?.name || "Dars";
  const playbackSourceLabel =
    playbackStreamType === "hls"
      ? "Adaptive"
      : playbackStreamType === "direct"
        ? "Direct"
        : playbackStreamType || "Direct";

  useEffect(() => {
    setMaterialsStatus({ loading: true, count: 0 });
    setHomeworkStatus({ loading: true, count: 0, completed: 0 });
    setLessonTestsStatus({ loading: true, count: 0, completed: 0 });
  }, [lessonIdentifier]);

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
        `${window.location.origin}/my-courses/${courseSlug}/${lessonSlug}`,
      );
      toast.success("Dars havolasi nusxalandi");
    } catch {
      toast.error("Dars havolasini nusxalab bo'lmadi");
    }
  }, [course, currentLessonData]);

  useEffect(() => {
    const lessonKey = String(
      currentLessonData?._id ||
        currentLessonData?.id ||
        currentLessonData?.urlSlug ||
        "",
    );
    const nextNote = String(currentLessonData?.selfNote?.text || "");
    noteLessonKeyRef.current = lessonKey;
    noteBaselineRef.current = nextNote;
    setNotes(nextNote);
    setNoteStatus("");

    if (noteSaveTimerRef.current) {
      clearTimeout(noteSaveTimerRef.current);
      noteSaveTimerRef.current = null;
    }
  }, [
    currentLessonData?._id,
    currentLessonData?.id,
    currentLessonData?.urlSlug,
    currentLessonData?.selfNote?.text,
  ]);

  useEffect(
    () => () => {
      if (noteSaveTimerRef.current) {
        clearTimeout(noteSaveTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const lessonKey = noteLessonKeyRef.current;
    if (!courseId || !lessonKey || notes === noteBaselineRef.current) return undefined;

    setNoteStatus("Saqlanmoqda...");
    if (noteSaveTimerRef.current) {
      clearTimeout(noteSaveTimerRef.current);
    }

    noteSaveTimerRef.current = setTimeout(async () => {
      try {
        const saved = await upsertLessonNote(courseId, lessonKey, notes);
        noteBaselineRef.current = String(saved?.text ?? notes);
        setNoteStatus("Saqlandi");
      } catch (error) {
        setNoteStatus("Saqlab bo'lmadi");
      }
    }, 700);

    return () => {
      if (noteSaveTimerRef.current) {
        clearTimeout(noteSaveTimerRef.current);
      }
    };
  }, [courseId, notes, upsertLessonNote]);

  useEffect(() => {
    setCourseReviewRating(Number(course?.selfReview?.rating || 0));
    setCourseReviewText(String(course?.selfReview?.text || ""));
  }, [course?.selfReview?.rating, course?.selfReview?.text]);

  const handleSaveCourseReview = useCallback(async () => {
    if (!courseId || !courseReviewRating) return;
    setCourseReviewSaving(true);
    try {
      await upsertCourseReview(courseId, {
        rating: courseReviewRating,
        text: courseReviewText,
      });
      toast.success(
        course?.selfReview
          ? "Rating va sharh yangilandi"
          : "Rating va sharh saqlandi",
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Ratingni saqlab bo'lmadi",
      );
    } finally {
      setCourseReviewSaving(false);
    }
  }, [
    course?.selfReview,
    courseId,
    courseReviewRating,
    courseReviewText,
    upsertCourseReview,
  ]);


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
    courseId,
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
  const canTrackOwnAttendance =
    canAccessActiveLesson && (enrollStatus === "approved" || isOwner);
  const resumeLessonIndex = useMemo(() => {
    if (!course?.lessons?.length) return 0;

    const progressRows = course.lessons.map((lesson, index) => ({
      index,
      lesson,
      hasActivity: hasLessonActivity(lesson),
      isUnlocked: canAccessLesson(index),
    }));
    const lastActiveIndex = progressRows.reduce(
      (lastIndex, item) => (item.hasActivity ? item.index : lastIndex),
      -1,
    );
    const resumeEntry =
      progressRows.find(
        (item) => item.isUnlocked && item.index > lastActiveIndex && !item.hasActivity,
      ) ||
      progressRows.find((item) => item.isUnlocked && item.hasActivity) ||
      progressRows.find((item) => item.isUnlocked) ||
      progressRows[0];

    return Math.max(0, Number(resumeEntry?.index || 0));
  }, [canAccessLesson, course?.lessons]);
  const resumeLessonData = course?.lessons?.[resumeLessonIndex] || null;

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
    if (!course || initialLessonSlug) return;
    if (activeLesson === resumeLessonIndex) return;
    setActiveLesson(resumeLessonIndex);
  }, [activeLesson, course, initialLessonSlug, resumeLessonIndex]);

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
    const resumeLessonId =
      resumeLessonData?.urlSlug || resumeLessonData?._id || resumeLessonData?.id;
    const currentLessonId =
      currentLessonData?.urlSlug || currentLessonData?._id || currentLessonData?.id;

    // On hard refresh, wait until the URL-selected lesson is applied to local state
    // before writing a replacement URL. Otherwise we can bounce between lesson 1 and
    // the requested lesson slug during hydration.
    if (requestedLessonId && String(requestedLessonId) !== String(currentLessonId || "")) {
      return;
    }

    // When entering the course root without a lesson slug, wait until the
    // resume lesson is selected locally before syncing the URL.
    if (
      !requestedLessonId &&
      resumeLessonId &&
      String(resumeLessonId) !== String(currentLessonId || "")
    ) {
      return;
    }

    const courseSlug = course.urlSlug || course._id || course.id;
    const coursePath = `/my-courses/${courseSlug}`;
    const lessonSlug =
      currentLessonData?.urlSlug ||
      currentLessonData?._id ||
      currentLessonData?.id;

    const nextPath = lessonSlug
      ? `${coursePath}/${lessonSlug}`
      : coursePath;

    if (
      (window.location.pathname === coursePath ||
        window.location.pathname === `${coursePath}/` ||
        window.location.pathname.startsWith(`${coursePath}/`)) &&
      window.location.pathname !== nextPath
    ) {
      navigate(nextPath, { replace: true });
    }
  }, [course, currentLessonData, initialLessonSlug, inlineMode, navigate, resumeLessonData]);

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
  const attendanceInFlightPayloadRef = useRef(new Set());
  const attendanceLastSentPayloadRef = useRef({});

  useEffect(() => {
    if (!currentLessonAttendanceKey) return;

    const taskStatus = getLessonLearningTaskStatus(currentLessonData);
    attendanceLessonConfigRef.current[currentLessonAttendanceKey] = {
      hasVideo: currentLessonHasVideoMedia,
      hasNotion: Boolean(currentLessonNotionUrl),
    };
    attendanceTestsStatusRef.current[currentLessonAttendanceKey] = taskStatus.tests;
    attendanceHomeworkStatusRef.current[currentLessonAttendanceKey] =
      taskStatus.homework;
  }, [
    currentLessonAttendanceKey,
    currentLessonData,
    currentLessonHasVideoMedia,
    currentLessonNotionUrl,
  ]);

  useEffect(() => {
    if (!currentLessonAttendanceKey || lessonTestsStatus.loading) return;
    attendanceTestsStatusRef.current[currentLessonAttendanceKey] = {
      count: Number(lessonTestsStatus.count || 0),
      completed: Number(lessonTestsStatus.completed || 0),
    };
  }, [currentLessonAttendanceKey, lessonTestsStatus]);

  useEffect(() => {
    if (!currentLessonAttendanceKey || homeworkStatus.loading) return;
    attendanceHomeworkStatusRef.current[currentLessonAttendanceKey] = {
      count: Number(homeworkStatus.count || 0),
      completed: Number(homeworkStatus.completed || 0),
    };
  }, [currentLessonAttendanceKey, homeworkStatus]);

  const getCompositeAttendancePercent = useCallback((lessonKey) => {
    const config = attendanceLessonConfigRef.current[lessonKey] || {};
    const units = [];

    if (config.hasVideo) {
      units.push(clampPercent(attendanceTrackedPercentRef.current[lessonKey]));
    }

    if (config.hasNotion) {
      units.push(attendanceNotionReadRef.current[lessonKey] ? 100 : 0);
    }

    const testsStatus = attendanceTestsStatusRef.current[lessonKey] || {};
    const testsCount = Number(testsStatus.count || 0);
    if (testsCount > 0) {
      units.push(
        clampPercent((Number(testsStatus.completed || 0) / testsCount) * 100),
      );
    }

    const homeworkTaskStatus =
      attendanceHomeworkStatusRef.current[lessonKey] || {};
    const homeworkCount = Number(homeworkTaskStatus.count || 0);
    if (homeworkCount > 0) {
      units.push(
        clampPercent(
          (Number(homeworkTaskStatus.completed || 0) / homeworkCount) * 100,
        ),
      );
    }

    if (!units.length) return 0;
    return clampPercent(
      units.reduce((sum, value) => sum + value, 0) / units.length,
    );
  }, []);

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
      attendanceLastFlushedSecondRef.current[key] = 0;
      attendanceNotionReadRef.current[key] = false;
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

      // Send the composite lesson progress. Each available lesson part
      // (video, Notion page, linked tests, homework) contributes equally.
      const progressPercent = getCompositeAttendancePercent(lessonKey);
      const normalizedLastPosition = Number(lastPositionSeconds || 0);
      const shouldSendPosition = normalizedLastPosition > 0;
      const shouldSendWatchIncrement = Number(watchIncrement || 0) > 0;
      const shouldSendProgress = progressPercent > 0;

      if (
        !shouldSendProgress &&
        !shouldSendPosition &&
        !shouldSendWatchIncrement
      ) {
        return;
      }

      if (!force && progressPercent < 10 && !shouldSendWatchIncrement) return;

      const requestPayload = {
        progressPercent: Number(progressPercent.toFixed(2)),
        lastPositionSeconds: shouldSendPosition
          ? Math.floor(normalizedLastPosition)
          : undefined,
        lessonDurationSeconds:
          Number(lessonDurationSeconds || 0) > 0
            ? Math.floor(Number(lessonDurationSeconds))
            : undefined,
        watchIncrement: shouldSendWatchIncrement ? 1 : 0,
      };
      const payloadKey = JSON.stringify(requestPayload);
      const inFlightKey = `${courseId}:${lessonKey}:${payloadKey}`;

      if (
        attendanceInFlightPayloadRef.current.has(inFlightKey) ||
        (!shouldSendWatchIncrement &&
          attendanceLastSentPayloadRef.current[lessonKey] === payloadKey)
      ) {
        return;
      }

      // Reset pending accumulator - tracked stays so we can keep comparing.
      attendancePendingPercentRef.current[lessonKey] = 0;
      attendanceInFlightPayloadRef.current.add(inFlightKey);

      try {
        await markOwnAttendance(courseId, lessonKey, requestPayload.progressPercent, {
          lastPositionSeconds: requestPayload.lastPositionSeconds,
          lessonDurationSeconds: requestPayload.lessonDurationSeconds,
          watchIncrement: requestPayload.watchIncrement,
        });
        if (!shouldSendWatchIncrement) {
          attendanceLastSentPayloadRef.current[lessonKey] = payloadKey;
        }
      } catch (error) {
        console.error(error);
      } finally {
        attendanceInFlightPayloadRef.current.delete(inFlightKey);
      }
    },
    [courseId, getCompositeAttendancePercent, markOwnAttendance],
  );

  const handleNotionReadComplete = useCallback(() => {
    const lessonKey = currentLessonAttendanceKey;
    if (
      !lessonKey ||
      !canTrackOwnAttendance
    ) {
      return;
    }

    attendanceNotionReadRef.current[lessonKey] = true;
    flushOwnAttendance(lessonKey, {
      force: true,
      lastPositionSeconds: overallCurrentTimeRef.current,
      lessonDurationSeconds: totalLessonDurationRef.current,
    });
  }, [
    canTrackOwnAttendance,
    currentLessonAttendanceKey,
    flushOwnAttendance,
  ]);

  useEffect(() => {
    if (
      !currentLessonAttendanceKey ||
      !canTrackOwnAttendance ||
      lessonTestsStatus.loading ||
      Number(lessonTestsStatus.count || 0) <= 0 ||
      Number(lessonTestsStatus.completed || 0) <= 0
    ) {
      return;
    }

    flushOwnAttendance(currentLessonAttendanceKey, {
      force: true,
      lastPositionSeconds: overallCurrentTimeRef.current,
      lessonDurationSeconds: totalLessonDurationRef.current,
    });
  }, [
    canTrackOwnAttendance,
    currentLessonAttendanceKey,
    flushOwnAttendance,
    lessonTestsStatus,
  ]);

  useEffect(() => {
    if (
      !currentLessonAttendanceKey ||
      !canTrackOwnAttendance ||
      homeworkStatus.loading ||
      Number(homeworkStatus.count || 0) <= 0 ||
      Number(homeworkStatus.completed || 0) <= 0
    ) {
      return;
    }

    flushOwnAttendance(currentLessonAttendanceKey, {
      force: true,
      lastPositionSeconds: overallCurrentTimeRef.current,
      lessonDurationSeconds: totalLessonDurationRef.current,
    });
  }, [
    canTrackOwnAttendance,
    currentLessonAttendanceKey,
    flushOwnAttendance,
    homeworkStatus,
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
    const hasTrackableLessonWork =
      currentLessonHasVideoMedia ||
      Boolean(currentLessonNotionUrl) ||
      Number(lessonTestsStatus.count || 0) > 0 ||
      Number(homeworkStatus.count || 0) > 0;
    attendanceEligibleRef.current =
      Boolean(currentLessonAttendanceKey) &&
      canTrackOwnAttendance &&
      hasTrackableLessonWork;
  }, [
    canTrackOwnAttendance,
    currentLessonAttendanceKey,
    currentLessonHasVideoMedia,
    currentLessonNotionUrl,
    homeworkStatus.count,
    lessonTestsStatus.count,
  ]);

  // Flush when video pauses — fire only when isPlaying transitions to false.
  const wasPLayingRef = useRef(false);
  useEffect(() => {
    if (isPlaying) {
      wasPLayingRef.current = true;
      return;
    }
    if (!wasPLayingRef.current) return; // was already paused, skip
    wasPLayingRef.current = false;
    if (!currentLessonAttendanceKey) return;
    flushOwnAttendance(currentLessonAttendanceKey, {
      force: true,
      lastPositionSeconds: overallCurrentTimeRef.current,
      lessonDurationSeconds: totalLessonDurationRef.current,
    });
  }, [currentLessonAttendanceKey, flushOwnAttendance, isPlaying]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);

    if (
      !currentLessonAttendanceKey ||
      !canTrackOwnAttendance ||
      !currentLessonHasMedia
    ) {
      return;
    }

    const sessionKey = `${courseId}:${currentLessonAttendanceKey}`;
    if (attendanceSessionLoggedRef.current === sessionKey) {
      return;
    }

    attendanceSessionLoggedRef.current = sessionKey;
    flushOwnAttendance(currentLessonAttendanceKey, {
      force: true,
      watchIncrement: 1,
      lastPositionSeconds: overallCurrentTimeRef.current,
      lessonDurationSeconds: totalLessonDurationRef.current,
    });
  }, [
    canTrackOwnAttendance,
    courseId,
    currentLessonAttendanceKey,
    currentLessonHasMedia,
    flushOwnAttendance,
  ]);

  // Flush on lesson unmount (lesson switch or component teardown).
  useEffect(() => {
    return () => {
      if (currentLessonAttendanceKey) {
        flushOwnAttendance(currentLessonAttendanceKey, {
          force: true,
          lastPositionSeconds: overallCurrentTimeRef.current,
          lessonDurationSeconds: totalLessonDurationRef.current,
        });
      }
    };
  }, [currentLessonAttendanceKey, flushOwnAttendance]);

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

    const lastFlushedSecond = Number(attendanceLastFlushedSecondRef.current[lessonKey] || 0);
    const crossedTenSecondMark =
      now >= 10 && Math.floor(now / 10) > Math.floor(lastFlushedSecond / 10);

    if (crossedTenSecondMark) {
      attendanceLastFlushedSecondRef.current[lessonKey] = now;
      flushOwnAttendanceRef.current(lessonKey, {
        force: false,
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

  useEffect(() => {
    if (!playbackError) return;

    toast.error(playbackError, {
      id: "course-player-playback-error",
    });
    setPlaybackError(null);
  }, [playbackError]);

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

  const handleLessonClick = useCallback((index) => {
    const lessonData = course?.lessons?.[index];
    if (!lessonData) return;

    setActiveLesson(index);
    setPlayerTab("materials");
    if (!inlineMode) {
      const lessonSlug = lessonData.urlSlug || lessonData._id || lessonData.id;
      const courseSlug = course.urlSlug || course._id || course.id;
      navigate(`/my-courses/${courseSlug}/${lessonSlug}`);
    }
  }, [course, inlineMode, navigate]);

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
          currentMediaItem?.mediaId || currentMediaItem?._id,
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
    activeMediaIndex,
    canAccessActiveLesson,
    courseId,
    currentMediaIdentifier,
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
  const handleLeaveCourse = async () => {
    if (!courseId || !currentUserId) return;

    try {
      await removeUser(courseId, currentUserId);
      toast.success(
        t("coursePlayer.actions.leftCourse", {
          defaultValue: "Kurs tark etildi",
        }),
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          t("coursePlayer.errors.leaveCourse", {
            defaultValue: "Kursni tark etib bo'lmadi",
          }),
      );
    }
  };

  const compactEnrollmentSection = (
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
        {isOwner ? (
          <RoundedEnrollButton $variant="owner">
            <CheckCircle size={16} />
            {t("coursePlayer.actions.ownerCourse", {
              defaultValue: "Sizning kursingiz",
            })}
          </RoundedEnrollButton>
        ) : enrollStatus === "pending" ? (
          <>
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
          </>
        ) : enrollStatus === "approved" && !isOwner && !admin ? (
          <RoundedEnrollButton $variant="leave" onClick={handleLeaveCourse}>
            <X size={16} />
            {t("coursePlayer.actions.leave", {
              defaultValue: "Kursni tark etish",
            })}
          </RoundedEnrollButton>
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
                const chatRes = await createChat({
                  isGroup: false,
                  memberIds: [ownerId],
                });
                if (chatRes?.jammId) navigate(`/users/${chatRes.jammId}`);
              } catch (err) {
                console.error(err);
                toast.error(
                  err?.response?.data?.message ||
                    t("coursePlayer.errors.chatCreate"),
                );
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
  );

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
      <PlayerContainer ref={playerContainerRef}>
        <VideoSection>
          {/* VIDEO PLAYER */}
          {canAccessLesson(activeLesson) &&
          currentLessonData &&
          currentLessonHasRenderableContent ? (
            <>
              {currentLessonHasVideoMedia ? (
                isYouTube && youtubeId ? (
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
                    onPlay={handlePlay}
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
                )
              ) : (
                <LessonNotionSurface
                  notionUrl={currentLessonNotionUrl}
                  title={currentLessonData.title}
                  onReadComplete={handleNotionReadComplete}
                />
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

              {currentLessonHasVideoMedia && currentLessonNotionUrl ? (
                <LessonNotionSurface
                  notionUrl={currentLessonNotionUrl}
                  title={currentLessonData.title}
                  onReadComplete={handleNotionReadComplete}
                />
              ) : null}

              {compactEnrollmentSection}

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
                  <CoursePlayerMaterialsSection
                    showEmptyState={shouldShowMaterialsEmptyState}
                    onContentStateChange={setMaterialsStatus}
                  />
                  {hasLessonTests ? (
                    <CoursePlayerLessonTestsSection
                      forceExpanded
                      showCollapseToggle={false}
                      onContentStateChange={setLessonTestsStatus}
                    />
                  ) : null}
                  <CoursePlayerHomeworkSection
                    forceExpanded
                    showCollapseToggle={false}
                    onContentStateChange={setHomeworkStatus}
                  />
                </div>

                {/* COMMENTS TAB */}
                <div style={{ display: playerTab === "comments" ? "contents" : "none" }}>
                  <CoursePlayerCommentsSection />
                </div>

                {/* MORE TAB */}
                {playerTab === "more" && (
                  <>
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
                      <CourseInfoTitle>Kursga rating qo'ying</CourseInfoTitle>
                      <CourseInfoDescription>
                        Umumiy rating: {Number(course.rating || 0).toFixed(1)} ·{" "}
                        {course.ratingCount || 0} ta sharh
                      </CourseInfoDescription>
                      <RatingForm>
                        <RatingStars aria-label="Kurs ratingi">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <RatingStarButton
                              key={value}
                              type="button"
                              $active={value <= courseReviewRating}
                              onClick={() => setCourseReviewRating(value)}
                              aria-label={`${value} yulduz`}
                            >
                              <Star
                                size={18}
                                fill={
                                  value <= courseReviewRating
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </RatingStarButton>
                          ))}
                        </RatingStars>
                        <NotesArea
                          placeholder="Kurs haqida qisqa sharh qoldiring..."
                          value={courseReviewText}
                          onChange={(event) =>
                            setCourseReviewText(event.target.value)
                          }
                        />
                        <ReviewSaveButton
                          type="button"
                          disabled={!courseReviewRating || courseReviewSaving}
                          onClick={handleSaveCourseReview}
                        >
                          {courseReviewSaving
                            ? "Saqlanmoqda..."
                            : course?.selfReview
                              ? "Sharhni yangilash"
                              : "Sharh qoldirish"}
                        </ReviewSaveButton>
                      </RatingForm>
                    </CourseInfoCard>
                    <CourseInfoCard>
                      <CourseInfoTitle>{t("coursePlayer.tabs.notes")}</CourseInfoTitle>
                      <NotesArea
                        placeholder={t("coursePlayer.tabs.notesPlaceholder")}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                      <NoteStatusText>{noteStatus}</NoteStatusText>
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
