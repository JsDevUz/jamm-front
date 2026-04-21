import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  FileText,
  Globe,
  Infinity,
  Play,
  Share2,
  Smartphone,
  Star,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCourses } from "../contexts/CoursesContext";
import { getLessonPlaybackToken } from "../api/coursesApi";
import { getCourseMemberStatus } from "../features/courses/utils/courseNavigation";
import { API_BASE_URL } from "../config/env";

const PageShell = styled.div`
  width: 100vw;
  flex: 1 1 auto;
  min-height: var(--app-height, 100dvh);
  height: var(--app-height, 100dvh);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background: var(--background-color);
  color: var(--text-color);
`;

const PageInner = styled.div`
  width: min(100%, 1240px);
  margin: 0 auto;
  padding: 22px 20px 120px;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
  gap: 28px;

  @media (max-width: 980px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 18px 16px 128px;
    gap: 22px;
  }

  @media (max-width: 640px) {
    padding: calc(18px + env(safe-area-inset-top, 0px)) 16px calc(132px + env(safe-area-inset-bottom, 0px));
  }
`;

const MainColumn = styled.div`
  min-width: 0;
  display: grid;
  gap: 22px;
`;

const SideColumn = styled.aside`
  min-width: 0;

  @media (max-width: 980px) {
    display: none;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const IconButton = styled.button`
  width: 42px;
  height: 42px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HeroCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
`;

const HeroImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
`;

const HeroVideo = styled.video`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: block;
  background: var(--tertiary-color);
  object-fit: cover;
`;

const HeroIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: block;
  border: 0;
  background: var(--tertiary-color);
`;

const HeroFallback = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 800;
  text-align: center;
  padding: 24px;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: color-mix(in srgb, var(--background-color) 44%, transparent);
  text-align: center;
  padding: 24px;
`;

const PlayBadge = styled.div`
  width: 78px;
  height: 78px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--secondary-color) 72%, transparent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  @media (max-width: 640px) {
    width: 68px;
    height: 68px;
  }
`;

const HeroText = styled.div`
  font-size: clamp(16px, 1.9vw, 22px);
  font-weight: 800;
  color: var(--text-color);
`;

const Headline = styled.div`
  display: grid;
  gap: 10px;
`;

const MobileOfferCard = styled.div`
  display: none;
  border-radius: 20px;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  padding: 18px;
  gap: 14px;

  @media (max-width: 980px) {
    display: grid;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(28px, 3.1vw, 46px);
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 900;
  color: var(--text-color);
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: clamp(16px, 1.45vw, 21px);
  line-height: 1.45;
  color: var(--text-secondary-color);
  max-width: 920px;
`;

const BestsellerBadge = styled.div`
  width: fit-content;
  padding: 9px 14px;
  border-radius: 12px;
  background: var(--active-color);
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 900;
`;

const RatingRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-secondary-color);
`;

const RatingScore = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--warning-color);
  font-weight: 900;
`;

const Stars = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const MetaStack = styled.div`
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary-color);
`;

const MetaLine = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const AccentText = styled.span`
  color: var(--primary-color);
  font-weight: 800;
`;

const SectionCard = styled.section`
  border-radius: 22px;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  padding: 22px;
  display: grid;
  gap: 18px;

  @media (max-width: 640px) {
    padding: 18px;
    gap: 16px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: clamp(22px, 2.1vw, 34px);
  line-height: 1.12;
  font-weight: 900;
  color: var(--text-color);
`;

const LearnList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 18px;

  @media (max-width: 860px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const LearnItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.45;
  color: var(--text-color);
`;

const LearnIcon = styled.div`
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  background: var(--hover-color);
`;

const SectionAction = styled.button`
  width: fit-content;
  border: 0;
  background: transparent;
  color: var(--primary-color);
  padding: 0;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`;

const CurriculumMeta = styled.div`
  font-size: 15px;
  line-height: 1.4;
  color: var(--text-secondary-color);
`;

const CurriculumSection = styled.div`
  display: grid;
  gap: 6px;
`;

const CurriculumHeader = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  color: var(--text-color);
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: clamp(17px, 1.3vw, 22px);
  font-weight: 700;
  text-align: left;
  cursor: pointer;
`;

const LessonRows = styled.div`
  display: grid;
`;

const LessonRow = styled.div`
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 14px 0;
  border-top: 1px solid var(--border-color);

  @media (max-width: 640px) {
    grid-template-columns: 32px minmax(0, 1fr) auto;
    gap: 12px;
  }
`;

const LessonIndex = styled.div`
  font-size: 18px;
  color: var(--text-muted-color);
  text-align: right;
`;

const LessonInfo = styled.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`;

const LessonTitle = styled.div`
  font-size: clamp(15px, 1.15vw, 18px);
  line-height: 1.34;
  color: var(--text-color);
  font-weight: 600;
`;

const LessonMeta = styled.div`
  font-size: 14px;
  color: var(--text-muted-color);
`;

const LessonPlay = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
`;

const IncludesList = styled.div`
  display: grid;
  gap: 14px;
  font-size: clamp(15px, 1.2vw, 18px);
  color: var(--text-color);
`;

const IncludeItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const RequirementsList = styled.ul`
  margin: 0;
  padding-left: 22px;
  display: grid;
  gap: 10px;
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.5;
  color: var(--text-color);
`;

const DescriptionBody = styled.div`
  display: grid;
  gap: 12px;
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.58;
  color: var(--text-color);
`;

const DescriptionParagraph = styled.p`
  margin: 0;
`;

const PurchaseCard = styled.div`
  position: sticky;
  top: 24px;
  border-radius: 22px;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  overflow: hidden;
`;

const PurchaseBody = styled.div`
  padding: 18px;
  display: grid;
  gap: 14px;
`;

const PriceValue = styled.div`
  font-size: clamp(28px, 2.4vw, 42px);
  line-height: 1;
  font-weight: 900;
  color: var(--text-color);
`;

const OldPrice = styled.div`
  font-size: 18px;
  color: var(--text-muted-color);
  text-decoration: line-through;
`;

const OfferText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--danger-color);
  font-size: 14px;
  font-weight: 800;
`;

const PurchaseButton = styled.button`
  width: 100%;
  min-height: 54px;
  border: 0;
  border-radius: 14px;
  background: var(--primary-color);
  color: var(--background-color);
  font-size: clamp(18px, 1.4vw, 22px);
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const LoadingWrap = styled.div`
  min-height: var(--app-height, 100dvh);
  display: grid;
  place-items: center;
  text-align: center;
  color: var(--text-secondary-color);
  padding: 24px;
`;

const EmptyState = styled.div`
  display: grid;
  gap: 14px;
  max-width: 460px;
`;

const PlainSection = styled.section`
  display: grid;
  gap: 14px;
`;

const EmptyCurriculumCard = styled.div`
  border-radius: 18px;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  padding: 18px;
  color: var(--text-secondary-color);
  font-size: 15px;
  line-height: 1.5;
`;

function formatDuration(totalSeconds = 0, t) {
  const normalized = Math.max(0, Math.round(Number(totalSeconds || 0)));
  const hours = Math.floor(normalized / 3600);
  const minutes = Math.floor((normalized % 3600) / 60);

  if (hours <= 0) {
    return t("coursePreview.duration.minutes", {
      count: Math.max(1, minutes),
    });
  }

  if (!minutes) {
    return t("coursePreview.duration.hours", { count: hours });
  }

  return t("coursePreview.duration.hoursMinutes", {
    hours,
    minutes,
  });
}

function formatCompactDuration(totalSeconds = 0) {
  const normalized = Math.max(0, Math.round(Number(totalSeconds || 0)));
  const hours = Math.floor(normalized / 3600);
  const minutes = Math.floor((normalized % 3600) / 60);

  if (hours <= 0) {
    return `${Math.max(1, minutes)}m`;
  }

  return `${hours}h ${minutes}m`;
}

function formatPrice(price, accessType, t) {
  const normalized = Number(price || 0);
  if (accessType === "free_open" || normalized <= 0) {
    return t("coursePreview.free");
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: normalized % 1 === 0 ? 0 : 2,
  }).format(normalized);
}

function getLessonDurationSeconds(lesson) {
  const directDuration = Math.max(0, Number(lesson?.durationSeconds || 0));
  if (directDuration > 0) return directDuration;

  if (Array.isArray(lesson?.mediaItems)) {
    return lesson.mediaItems.reduce(
      (sum, item) => sum + Math.max(0, Number(item?.durationSeconds || 0)),
      0,
    );
  }

  return 0;
}

function normalizeLessonMediaItems(lesson, t) {
  if (Array.isArray(lesson?.mediaItems) && lesson.mediaItems.length) {
    return lesson.mediaItems.map((item, index) => ({
      mediaId: item?.mediaId || item?._id || `media-${index}`,
      title:
        item?.title ||
        lesson?.title ||
        t("coursePreview.videoNumber", { count: index + 1 }),
      videoUrl: item?.videoUrl || "",
      fileUrl: item?.fileUrl || "",
      streamType: item?.streamType || lesson?.streamType || "direct",
      streamAssets: Array.isArray(item?.streamAssets) ? item.streamAssets : [],
      hlsKeyAsset: item?.hlsKeyAsset || lesson?.hlsKeyAsset || "",
    }));
  }

  if (lesson?.videoUrl || lesson?.fileUrl) {
    return [
      {
        mediaId: "primary",
        title: lesson?.title || t("coursePreview.video"),
        videoUrl: lesson?.videoUrl || "",
        fileUrl: lesson?.fileUrl || "",
        streamType: lesson?.streamType || "direct",
        streamAssets: Array.isArray(lesson?.streamAssets) ? lesson.streamAssets : [],
        hlsKeyAsset: lesson?.hlsKeyAsset || "",
      },
    ];
  }

  return [];
}

function getYouTubeId(value = "") {
  const target = String(value || "").trim();
  if (!target) return "";

  const shortMatch = target.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (shortMatch?.[1]) return shortMatch[1];

  const longMatch = target.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (longMatch?.[1]) return longMatch[1];

  const embedMatch = target.match(/embed\/([a-zA-Z0-9_-]{6,})/);
  if (embedMatch?.[1]) return embedMatch[1];

  return "";
}

function toAbsoluteMediaUrl(value = "") {
  const target = String(value || "").trim();
  if (!target) return "";
  if (/^https?:\/\//i.test(target)) return target;
  return API_BASE_URL ? `${API_BASE_URL}${target.startsWith("/") ? "" : "/"}${target}` : target;
}

function isHlsMedia(url = "", streamType = "") {
  const normalizedUrl = String(url || "").split("?")[0].toLowerCase();
  return streamType === "hls" || normalizedUrl.endsWith(".m3u8");
}

function getMediaSource(item) {
  if (item?.videoUrl) return item.videoUrl;
  if (Array.isArray(item?.streamAssets) && item.streamAssets.length) {
    return String(item.streamAssets[0] || "");
  }
  return item?.fileUrl || "";
}

function PreviewHeroVideo({ src, streamType, poster, courseId, lessonId, mediaId }) {
  const videoRef = useRef(null);
  const fallbackSrc = useMemo(() => toAbsoluteMediaUrl(src), [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || (!fallbackSrc && !(courseId && lessonId))) return undefined;
    let cancelled = false;
    let hlsInstance = null;

    const attachSource = async (sourceUrl, sourceStreamType) => {
      const resolvedSource = toAbsoluteMediaUrl(sourceUrl);
      const shouldUseHls = isHlsMedia(resolvedSource, sourceStreamType);

      if (!shouldUseHls) {
        video.removeAttribute("crossorigin");
        video.src = resolvedSource;
        return;
      }

      video.crossOrigin = "anonymous";

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = resolvedSource;
        return;
      }

      const module = await import("hls.js");
      if (cancelled) return;

      const Hls = module.default;
      if (!Hls?.isSupported?.()) {
        video.src = resolvedSource;
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

      hlsInstance = hls;
      hls.loadSource(resolvedSource);
      hls.attachMedia(video);
    };

    const preparePreviewPlayback = async () => {
      let nextSrc = fallbackSrc;
      let nextStreamType = streamType || "direct";

      if (courseId && lessonId) {
        try {
          const { streamUrl, streamType: tokenStreamType } =
            await getLessonPlaybackToken(courseId, lessonId, mediaId);
          if (!cancelled && streamUrl) {
            nextSrc = streamUrl;
            nextStreamType = tokenStreamType || nextStreamType;
          }
        } catch {
          nextSrc = fallbackSrc;
        }
      }

      if (!cancelled && nextSrc) {
        attachSource(nextSrc, nextStreamType);
      }
    };

    preparePreviewPlayback();

    return () => {
      cancelled = true;
      if (hlsInstance) {
        hlsInstance.destroy();
      }
      video.removeAttribute("src");
      video.load();
    };
  }, [courseId, fallbackSrc, lessonId, mediaId, streamType]);

  return (
    <HeroVideo
      ref={videoRef}
      controls
      preload="metadata"
      playsInline
      poster={poster || undefined}
    />
  );
}

function extractDescriptionItems(description = "") {
  const lines = String(description || "")
    .split(/\n+/)
    .map((line) => line.replace(/^[-*#\d.\s]+/, "").trim())
    .filter(Boolean);

  if (lines.length >= 3) {
    return lines;
  }

  return String(description || "")
    .split(/[.!?]+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 18);
}

function getCreatedByLabel(createdBy, t) {
  if (!createdBy) return t("coursePreview.instructor");
  if (typeof createdBy === "string") return t("coursePreview.instructor");
  return (
    createdBy.name ||
    createdBy.nickname ||
    createdBy.username ||
    t("coursePreview.instructor")
  );
}

function getCreatedAtLabel(course, t) {
  const value = course?.updatedAt || course?.createdAt;
  if (!value) return t("coursePreview.recentlyUpdated");

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return t("coursePreview.recentlyUpdated");

  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${month}.${date.getFullYear()}`;
}

function buildLearningItems(course, t) {
  const explicitItems = Array.isArray(course?.previewLearn)
    ? course.previewLearn
        .map((item) => String(item || "").trim())
        .filter(Boolean)
    : [];

  if (explicitItems.length) {
    return explicitItems.slice(0, 8);
  }

  const descriptionItems = extractDescriptionItems(course?.description || "");
  if (descriptionItems.length) {
    return descriptionItems.slice(0, 6);
  }

  const lessonTitles = (course?.lessons || [])
    .map((lesson) => String(lesson?.title || "").trim())
    .filter(Boolean);

  if (lessonTitles.length) {
    return lessonTitles.slice(0, 6);
  }

  return [
    t("coursePreview.learningFallback.main", {
      name: course?.name || t("coursePreview.thisCourse"),
    }),
    t("coursePreview.learningFallback.practice"),
    t("coursePreview.learningFallback.independent"),
  ];
}

function buildRequirements(course, t) {
  const explicitItems = Array.isArray(course?.previewRequirements)
    ? course.previewRequirements
        .map((item) => String(item || "").trim())
        .filter(Boolean)
    : [];

  if (explicitItems.length) {
    return explicitItems.slice(0, 8);
  }

  const requirements = [];

  if (course?.lessonLanguage) {
    requirements.push(
      t("coursePreview.requirementsFallback.language", {
        language: course.lessonLanguage,
      }),
    );
  }

  requirements.push(t("coursePreview.requirementsFallback.device"));
  requirements.push(t("coursePreview.requirementsFallback.experience"));

  return requirements;
}

export default function CoursePreviewPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resourceId } = useParams();
  const {
    courses,
    ensureCourseLoaded,
    enrollInCourse,
    isEnrolled,
    currentUser,
  } = useCourses();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showAllLearn, setShowAllLearn] = useState(false);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [curriculumOpen, setCurriculumOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadCourse = async () => {
      if (!resourceId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setNotFound(false);

      try {
        await ensureCourseLoaded(resourceId);
        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) {
          setNotFound(true);
          setLoading(false);
        }
      }
    };

    loadCourse();

    return () => {
      cancelled = true;
    };
  }, [ensureCourseLoaded, resourceId]);

  const course = useMemo(
    () =>
      courses.find(
        (item) =>
          String(item._id || item.id) === String(resourceId || "") ||
          String(item.urlSlug || "") === String(resourceId || ""),
      ) || null,
    [courses, resourceId],
  );

  const lessons = useMemo(
    () =>
      Array.isArray(course?.lessons)
        ? course.lessons.filter((lesson) => (lesson?.status || "published") !== "draft")
        : [],
    [course],
  );
  const firstPreviewLesson = lessons[0] || null;
  const firstPreviewMediaItems = useMemo(
    () => normalizeLessonMediaItems(firstPreviewLesson, t),
    [firstPreviewLesson, t],
  );
  const firstPreviewMedia = firstPreviewMediaItems[0] || null;
  const previewMediaUrl = getMediaSource(firstPreviewMedia);
  const previewYoutubeId = getYouTubeId(
    firstPreviewMedia?.videoUrl || firstPreviewLesson?.videoUrl || "",
  );
  const hasLessonPreview = Boolean(previewYoutubeId || previewMediaUrl);

  const totalDurationSeconds = useMemo(
    () => lessons.reduce((sum, lesson) => sum + getLessonDurationSeconds(lesson), 0),
    [lessons],
  );

  const learningItems = useMemo(() => buildLearningItems(course, t), [course, t]);
  const requirements = useMemo(() => buildRequirements(course, t), [course, t]);
  const visibleLearnItems = showAllLearn ? learningItems : learningItems.slice(0, 4);
  const visibleLessons = showAllLessons ? lessons : lessons.slice(0, 6);
  const courseSlug = course?.urlSlug || course?._id || course?.id || resourceId;
  const memberStatus = getCourseMemberStatus(course, currentUser?.id);
  const contextEnrollStatus =
    isEnrolled(course?._id || course?.id || resourceId) || isEnrolled(resourceId);
  const enrollStatus =
    memberStatus === "owner"
      ? "admin"
      : memberStatus !== "none"
        ? memberStatus
        : contextEnrollStatus;
  const canOpenCourse = enrollStatus === "approved" || enrollStatus === "admin";
  const myCoursePath = `/my-courses/${courseSlug}`;
  const studentCount = Number(
    course?.membersCount || course?.totalMembersCount || course?.members?.length || 0,
  );
  const rating = Number(course?.rating || 0);
  const ratingCount = Number(course?.ratingCount || studentCount || 0);
  const isFreeCourse =
    course?.accessType === "free_open" || Number(course?.price || 0) <= 0;

  useEffect(() => {
    if (loading || !course || !canOpenCourse) return;
    navigate(myCoursePath, { replace: true });
  }, [canOpenCourse, course, loading, myCoursePath, navigate]);

  const handleShare = useCallback(async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: course?.name || t("coursePreview.shareTitle"),
          text: course?.description || "",
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      toast.success(t("coursePreview.toasts.shareCopied"));
    } catch {
      toast.error(t("coursePreview.toasts.shareError"));
    }
  }, [course?.description, course?.name, t]);

  const handleEnroll = useCallback(async () => {
    if (!resourceId || isSubmitting) return;

    if (canOpenCourse) {
      navigate(myCoursePath);
      return;
    }

    setIsSubmitting(true);
    try {
      await enrollInCourse(resourceId);

      if (course?.accessType === "free_open") {
        navigate(myCoursePath);
      } else {
        toast.success(t("coursePreview.toasts.requestSent"));
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || t("coursePreview.toasts.enrollError"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [canOpenCourse, course?.accessType, enrollInCourse, isSubmitting, myCoursePath, navigate, resourceId, t]);

  if (loading) {
    return (
      <PageShell>
        <LoadingWrap>{t("coursePreview.loading")}</LoadingWrap>
      </PageShell>
    );
  }

  if (notFound || !course) {
    return (
      <PageShell>
        <LoadingWrap>
          <EmptyState>
            <div>{t("coursePreview.notFound")}</div>
            <IconButton type="button" onClick={() => navigate("/courses")}>
              <ArrowLeft size={20} />
            </IconButton>
          </EmptyState>
        </LoadingWrap>
      </PageShell>
    );
  }

  const ctaLabel =
    enrollStatus === "pending"
      ? t("coursePreview.cta.requestSent")
      : canOpenCourse
        ? t("coursePreview.cta.openCourse")
        : isFreeCourse
          ? t("coursePreview.cta.enrollNow")
          : t("coursePreview.cta.buyNow");

  const oldPrice =
    !isFreeCourse && Number(course.price || 0) > 0
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        }).format(Number(course.price || 0) * 2)
      : "";

  const purchaseBlock = (
    <>
      <div>
        <PriceValue>{formatPrice(course.price, course.accessType, t)}</PriceValue>
        {oldPrice ? <OldPrice>{oldPrice}</OldPrice> : null}
      </div>

      {oldPrice ? (
        <OfferText>
          <Clock3 size={22} />
          {t("coursePreview.offer")}
        </OfferText>
      ) : null}

      <PurchaseButton
        type="button"
        disabled={isSubmitting || enrollStatus === "pending"}
        onClick={() => {
          if (canOpenCourse) {
            navigate(myCoursePath);
            return;
          }
          handleEnroll();
        }}
      >
        {isSubmitting ? t("common.loading") : ctaLabel}
      </PurchaseButton>
    </>
  );

  const renderPreviewHero = () => {
    if (previewYoutubeId) {
      return (
        <HeroIframe
          src={`https://www.youtube.com/embed/${previewYoutubeId}?rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={firstPreviewLesson?.title || course?.name || t("coursePreview.shareTitle")}
        />
      );
    }

    if (previewMediaUrl) {
      return (
        <PreviewHeroVideo
          src={previewMediaUrl}
          streamType={firstPreviewMedia?.streamType || firstPreviewLesson?.streamType}
          poster={course.image}
        />
      );
    }

    if (course.image) {
      return <HeroImage src={course.image} alt={course.name} />;
    }

    return <HeroFallback>{course.name}</HeroFallback>;
  };

  return (
    <PageShell>
      <PageInner>
        <MainColumn>
          <TopBar>
            <IconButton type="button" onClick={() => navigate(-1)}>
              <ArrowLeft size={26} />
            </IconButton>
            <IconButton type="button" onClick={handleShare}>
              <Share2 size={24} />
            </IconButton>
          </TopBar>

          <HeroCard>
            {renderPreviewHero()}
          </HeroCard>

          <Headline>
            <Title>{course.name}</Title>
            <Subtitle>
              {course.description ||
                t("coursePreview.descriptionFallback", {
                  category: course.category || t("common.course"),
                })}
            </Subtitle>
            <BestsellerBadge>
              {course.category || t("coursePreview.bestseller")}
            </BestsellerBadge>
            <RatingRow>
              <RatingScore>
                {rating.toFixed(1)}
                <Stars>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={18} fill="currentColor" />
                  ))}
                </Stars>
              </RatingScore>
              <div>
                {t("coursePreview.ratings", {
                  count: ratingCount,
                  formatted: ratingCount.toLocaleString(),
                })}
              </div>
              <div>
                {t("coursePreview.students", {
                  count: studentCount,
                  formatted: studentCount.toLocaleString(),
                })}
              </div>
            </RatingRow>
            <MetaStack>
              <MetaLine>
                {t("coursePreview.createdBy")}{" "}
                <AccentText>{getCreatedByLabel(course.createdBy, t)}</AccentText>
              </MetaLine>
              <MetaLine>
                <Clock3 size={18} />
                {t("coursePreview.lastUpdated", {
                  date: getCreatedAtLabel(course, t),
                })}
              </MetaLine>
              <MetaLine>
                <Globe size={18} />
                {course.lessonLanguage || t("coursePreview.defaultLanguage")}
              </MetaLine>
              <MetaLine>
                <FileText size={18} />
                {t("coursePreview.subtitles", {
                  language: course.lessonLanguage || t("coursePreview.defaultLanguage"),
                })}
              </MetaLine>
            </MetaStack>
          </Headline>

          <MobileOfferCard>
            {purchaseBlock}
          </MobileOfferCard>

          <SectionCard>
            <SectionTitle>{t("coursePreview.whatYouLearn")}</SectionTitle>
            <LearnList>
              {visibleLearnItems.map((item, index) => (
                <LearnItem key={`${item}-${index}`}>
                  <LearnIcon>
                    <Check size={22} />
                  </LearnIcon>
                  <span>{item}</span>
                </LearnItem>
              ))}
            </LearnList>
            {learningItems.length > 4 ? (
              <SectionAction type="button" onClick={() => setShowAllLearn((prev) => !prev)}>
                {showAllLearn
                  ? t("coursePreview.showLess")
                  : t("coursePreview.showMore")}
              </SectionAction>
            ) : null}
          </SectionCard>

          <PlainSection>
            <SectionTitle style={{ marginBottom: 10 }}>
              {t("coursePreview.curriculum")}
            </SectionTitle>
            <CurriculumMeta>
              {t("coursePreview.curriculumMeta", {
                sections: 1,
                lectures: lessons.length,
                duration: formatDuration(totalDurationSeconds, t),
              })}
            </CurriculumMeta>
          </PlainSection>

          <CurriculumSection>
            <CurriculumHeader type="button" onClick={() => setCurriculumOpen((prev) => !prev)}>
              <span>{t("coursePreview.sectionTitle", { index: 1, name: course.name })}</span>
              {curriculumOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </CurriculumHeader>

            {curriculumOpen ? (
              lessons.length ? (
                <LessonRows>
                  {visibleLessons.map((lesson, index) => (
                    <LessonRow key={lesson._id || lesson.urlSlug || index}>
                      <LessonIndex>{index + 1}</LessonIndex>
                      <LessonInfo>
                        <LessonTitle>
                          {lesson.title ||
                            t("coursePreview.lessonNumber", {
                              count: index + 1,
                            })}
                        </LessonTitle>
                        <LessonMeta>
                          {t("coursePreview.lessonMeta", {
                            duration: formatCompactDuration(
                              getLessonDurationSeconds(lesson),
                            ),
                          })}
                        </LessonMeta>
                      </LessonInfo>
                      <LessonPlay>
                        <Play size={18} />
                      </LessonPlay>
                    </LessonRow>
                  ))}
                </LessonRows>
              ) : (
                <EmptyCurriculumCard>
                  {t("coursePreview.emptyCurriculum")}
                </EmptyCurriculumCard>
              )
            ) : null}

            {lessons.length > 6 ? (
              <SectionAction type="button" onClick={() => setShowAllLessons((prev) => !prev)}>
                {showAllLessons
                  ? t("coursePreview.showLessSections")
                  : t("coursePreview.moreSections", {
                      count: lessons.length - 6,
                    })}
              </SectionAction>
            ) : null}
          </CurriculumSection>

          <PlainSection>
            <SectionTitle style={{ marginBottom: 18 }}>
              {t("coursePreview.includesTitle")}
            </SectionTitle>
            <IncludesList>
              <IncludeItem>
                <Clock3 size={24} />
                <span>
                  {t("coursePreview.includes.video", {
                    duration: formatDuration(totalDurationSeconds, t),
                  })}
                </span>
              </IncludeItem>
              <IncludeItem>
                <FileText size={24} />
                <span>
                  {t("coursePreview.includes.sections", {
                    count: lessons.length,
                  })}
                </span>
              </IncludeItem>
              <IncludeItem>
                <Infinity size={24} />
                <span>{t("coursePreview.includes.lifetime")}</span>
              </IncludeItem>
              <IncludeItem>
                <Smartphone size={24} />
                <span>{t("coursePreview.includes.devices")}</span>
              </IncludeItem>
              <IncludeItem>
                <Award size={24} />
                <span>{t("coursePreview.includes.certificate")}</span>
              </IncludeItem>
            </IncludesList>
          </PlainSection>

          <PlainSection>
            <SectionTitle style={{ marginBottom: 18 }}>
              {t("coursePreview.requirementsTitle")}
            </SectionTitle>
            <RequirementsList>
              {requirements.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </RequirementsList>
          </PlainSection>

          <PlainSection>
            <SectionTitle style={{ marginBottom: 18 }}>
              {t("coursePreview.descriptionTitle")}
            </SectionTitle>
            <DescriptionBody>
              {extractDescriptionItems(course.description || "").length ? (
                extractDescriptionItems(course.description || "").map((item, index) => (
                  <DescriptionParagraph key={`${item}-${index}`}>
                    {item}
                  </DescriptionParagraph>
                ))
              ) : (
                <DescriptionParagraph>
                  {course.description || t("coursePreview.noDescription")}
                </DescriptionParagraph>
              )}
            </DescriptionBody>
          </PlainSection>
        </MainColumn>

        <SideColumn>
          <PurchaseCard>
            <HeroCard style={{ borderRadius: 0, border: 0 }}>
              {renderPreviewHero()}
            </HeroCard>

            <PurchaseBody>
              {purchaseBlock}

              <IncludesList style={{ gap: 14, fontSize: 18 }}>
                <IncludeItem>
                  <Users size={20} />
                  <span>
                    {t("coursePreview.students", {
                      count: studentCount,
                      formatted: studentCount.toLocaleString(),
                    })}
                  </span>
                </IncludeItem>
                <IncludeItem>
                  <BookOpen size={20} />
                  <span>
                    {t("coursePreview.lessonsCount", {
                      count: lessons.length,
                    })}
                  </span>
                </IncludeItem>
                <IncludeItem>
                  <Globe size={20} />
                  <span>
                    {course.lessonLanguage || t("coursePreview.defaultLanguage")}
                  </span>
                </IncludeItem>
              </IncludesList>
            </PurchaseBody>
          </PurchaseCard>
        </SideColumn>
      </PageInner>

    </PageShell>
  );
}
