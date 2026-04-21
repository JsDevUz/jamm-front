import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
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
import { getCourseMemberStatus } from "../features/courses/utils/courseNavigation";

const PageShell = styled.div`
  width: 100vw;
  flex: 1 1 auto;
  min-height: var(--app-height, 100dvh);
  height: var(--app-height, 100dvh);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background: #050505;
  color: #f7f7fb;
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
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HeroCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  background: #000;
  object-fit: cover;
`;

const HeroIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: block;
  border: 0;
  background: #000;
`;

const HeroFallback = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;
  background: #121214;
  color: rgba(255, 255, 255, 0.86);
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
  background: rgba(0, 0, 0, 0.34);
  text-align: center;
  padding: 24px;
`;

const PlayBadge = styled.div`
  width: 78px;
  height: 78px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
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
  color: #fff;
`;

const Headline = styled.div`
  display: grid;
  gap: 10px;
`;

const MobileOfferCard = styled.div`
  display: none;
  border-radius: 20px;
  background: #121214;
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  color: #fff;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: clamp(16px, 1.45vw, 21px);
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.78);
  max-width: 920px;
`;

const BestsellerBadge = styled.div`
  width: fit-content;
  padding: 9px 14px;
  border-radius: 12px;
  background: #efe98d;
  color: #3b3609;
  font-size: 14px;
  font-weight: 900;
`;

const RatingRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.86);
`;

const RatingScore = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #f7b63f;
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
  color: rgba(255, 255, 255, 0.84);
`;

const MetaLine = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const AccentText = styled.span`
  color: #ba9cff;
  font-weight: 800;
`;

const SectionCard = styled.section`
  border-radius: 22px;
  background: #1a1a1d;
  border: 1px solid rgba(255, 255, 255, 0.07);
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
  color: #fff;
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
  color: rgba(255, 255, 255, 0.92);
`;

const LearnIcon = styled.div`
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
`;

const SectionAction = styled.button`
  width: fit-content;
  border: 0;
  background: transparent;
  color: #ba9cff;
  padding: 0;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`;

const CurriculumMeta = styled.div`
  font-size: 15px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.74);
`;

const CurriculumSection = styled.div`
  display: grid;
  gap: 6px;
`;

const CurriculumHeader = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  color: #fff;
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
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 640px) {
    grid-template-columns: 32px minmax(0, 1fr) auto;
    gap: 12px;
  }
`;

const LessonIndex = styled.div`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.68);
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
  color: #fff;
  font-weight: 600;
`;

const LessonMeta = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.68);
`;

const LessonPlay = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const IncludesList = styled.div`
  display: grid;
  gap: 14px;
  font-size: clamp(15px, 1.2vw, 18px);
  color: rgba(255, 255, 255, 0.92);
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
  color: rgba(255, 255, 255, 0.9);
`;

const DescriptionBody = styled.div`
  display: grid;
  gap: 12px;
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.58;
  color: rgba(255, 255, 255, 0.9);
`;

const DescriptionParagraph = styled.p`
  margin: 0;
`;

const PurchaseCard = styled.div`
  position: sticky;
  top: 24px;
  border-radius: 22px;
  background: #111113;
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  color: #fff;
`;

const OldPrice = styled.div`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: line-through;
`;

const OfferText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #d6653b;
  font-size: 14px;
  font-weight: 800;
`;

const PurchaseButton = styled.button`
  width: 100%;
  min-height: 54px;
  border: 0;
  border-radius: 14px;
  background: #a837ff;
  color: #fff;
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
  color: rgba(255, 255, 255, 0.75);
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
  background: #18181a;
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 18px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 15px;
  line-height: 1.5;
`;

function formatDuration(totalSeconds = 0) {
  const normalized = Math.max(0, Math.round(Number(totalSeconds || 0)));
  const hours = Math.floor(normalized / 3600);
  const minutes = Math.floor((normalized % 3600) / 60);

  if (hours <= 0) {
    return `${Math.max(1, minutes)} minutes`;
  }

  if (!minutes) {
    return `${hours} hours`;
  }

  return `${hours} hours, ${minutes} minutes`;
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

function formatPrice(price, accessType) {
  const normalized = Number(price || 0);
  if (accessType === "free_open" || normalized <= 0) {
    return "Free";
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

function normalizeLessonMediaItems(lesson) {
  if (Array.isArray(lesson?.mediaItems) && lesson.mediaItems.length) {
    return lesson.mediaItems.map((item, index) => ({
      mediaId: item?.mediaId || item?._id || `media-${index}`,
      title: item?.title || lesson?.title || `Video ${index + 1}`,
      videoUrl: item?.videoUrl || "",
      fileUrl: item?.fileUrl || "",
    }));
  }

  if (lesson?.videoUrl || lesson?.fileUrl) {
    return [
      {
        mediaId: "primary",
        title: lesson?.title || "Video",
        videoUrl: lesson?.videoUrl || "",
        fileUrl: lesson?.fileUrl || "",
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

function getCreatedByLabel(createdBy) {
  if (!createdBy) return "Instructor";
  if (typeof createdBy === "string") return "Instructor";
  return createdBy.name || createdBy.nickname || createdBy.username || "Instructor";
}

function getCreatedAtLabel(course) {
  const value = course?.updatedAt || course?.createdAt;
  if (!value) return "Recently updated";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently updated";

  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${month}.${date.getFullYear()}`;
}

function buildLearningItems(course) {
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
    `${course?.name || "This course"} bo'yicha asosiy tushunchalarni o'rganasiz`,
    "Bosqichma-bosqich darslar orqali amaliy ko'nikma hosil qilasiz",
    "Har bir modulni mustaqil ishlash darajasigacha olib borasiz",
  ];
}

function buildRequirements(course) {
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
    requirements.push(`${course.lessonLanguage} tilini tushunish foydali bo'ladi`);
  }

  requirements.push("Internet va telefon yoki kompyuter kifoya qiladi");
  requirements.push("Boshlash uchun oldindan chuqur tajriba shart emas");

  return requirements;
}

export default function CoursePreviewPage() {
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
    () => normalizeLessonMediaItems(firstPreviewLesson),
    [firstPreviewLesson],
  );
  const firstPreviewMedia = firstPreviewMediaItems[0] || null;
  const previewMediaUrl =
    firstPreviewMedia?.fileUrl || firstPreviewMedia?.videoUrl || "";
  const previewYoutubeId = getYouTubeId(
    firstPreviewMedia?.videoUrl || firstPreviewLesson?.videoUrl || "",
  );
  const hasLessonPreview = Boolean(previewYoutubeId || previewMediaUrl);

  const totalDurationSeconds = useMemo(
    () => lessons.reduce((sum, lesson) => sum + getLessonDurationSeconds(lesson), 0),
    [lessons],
  );

  const learningItems = useMemo(() => buildLearningItems(course), [course]);
  const requirements = useMemo(() => buildRequirements(course), [course]);
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
          title: course?.name || "Course preview",
          text: course?.description || "",
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      toast.success("Kurs havolasi nusxalandi");
    } catch {
      toast.error("Kurs havolasini ulashib bo'lmadi");
    }
  }, [course?.description, course?.name]);

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
        toast.success("So'rovingiz yuborildi");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Kursga yozilishda xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  }, [canOpenCourse, course?.accessType, enrollInCourse, isSubmitting, myCoursePath, navigate, resourceId]);

  if (loading) {
    return (
      <PageShell>
        <LoadingWrap>Kurs preview yuklanmoqda...</LoadingWrap>
      </PageShell>
    );
  }

  if (notFound || !course) {
    return (
      <PageShell>
        <LoadingWrap>
          <EmptyState>
            <div>Bunday kurs topilmadi yoki preview hozircha mavjud emas.</div>
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
      ? "Request sent"
      : canOpenCourse
        ? "Open course"
        : isFreeCourse
          ? "Enroll now"
          : "Buy now";

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
        <PriceValue>{formatPrice(course.price, course.accessType)}</PriceValue>
        {oldPrice ? <OldPrice>{oldPrice}</OldPrice> : null}
      </div>

      {oldPrice ? (
        <OfferText>
          <Clock3 size={22} />
          50% off - limited time price
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
        {isSubmitting ? "Loading..." : ctaLabel}
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
          title={firstPreviewLesson?.title || course?.name || "Course preview"}
        />
      );
    }

    if (previewMediaUrl) {
      return (
        <HeroVideo
          src={previewMediaUrl}
          controls
          preload="metadata"
          playsInline
          poster={course.image || undefined}
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
              {course.description || `${course.category || "Course"} bo'yicha amaliy va qulay kurs preview sahifasi.`}
            </Subtitle>
            <BestsellerBadge>
              {course.category || "Bestseller"}
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
              <div>({ratingCount.toLocaleString()} ratings)</div>
              <div>{studentCount.toLocaleString()} students</div>
            </RatingRow>
            <MetaStack>
              <MetaLine>
                Created by <AccentText>{getCreatedByLabel(course.createdBy)}</AccentText>
              </MetaLine>
              <MetaLine>
                <Clock3 size={18} />
                Last updated {getCreatedAtLabel(course)}
              </MetaLine>
              <MetaLine>
                <Globe size={18} />
                {course.lessonLanguage || "English"}
              </MetaLine>
              <MetaLine>
                <FileText size={18} />
                {course.lessonLanguage || "English"} subtitles
              </MetaLine>
            </MetaStack>
          </Headline>

          <MobileOfferCard>
            {purchaseBlock}
          </MobileOfferCard>

          <SectionCard>
            <SectionTitle>What you'll learn</SectionTitle>
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
                {showAllLearn ? "Show less" : "Show more"}
              </SectionAction>
            ) : null}
          </SectionCard>

          <PlainSection>
            <SectionTitle style={{ marginBottom: 10 }}>Curriculum</SectionTitle>
            <CurriculumMeta>
              1 section • {lessons.length} lectures • {formatDuration(totalDurationSeconds)} total length
            </CurriculumMeta>
          </PlainSection>

          <CurriculumSection>
            <CurriculumHeader type="button" onClick={() => setCurriculumOpen((prev) => !prev)}>
              <span>Section 1 - {course.name}</span>
              {curriculumOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </CurriculumHeader>

            {curriculumOpen ? (
              lessons.length ? (
                <LessonRows>
                  {visibleLessons.map((lesson, index) => (
                    <LessonRow key={lesson._id || lesson.urlSlug || index}>
                      <LessonIndex>{index + 1}</LessonIndex>
                      <LessonInfo>
                        <LessonTitle>{lesson.title || `Lesson ${index + 1}`}</LessonTitle>
                        <LessonMeta>
                          Video • {formatCompactDuration(getLessonDurationSeconds(lesson))}
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
                  Curriculum preview tez orada to‘ldiriladi. Hozircha kurs haqida asosiy ma’lumotlar,
                  tavsif va yozilish imkoniyati ochiq turadi.
                </EmptyCurriculumCard>
              )
            ) : null}

            {lessons.length > 6 ? (
              <SectionAction type="button" onClick={() => setShowAllLessons((prev) => !prev)}>
                {showAllLessons ? "Show less sections" : `${lessons.length - 6} more sections`}
              </SectionAction>
            ) : null}
          </CurriculumSection>

          <PlainSection>
            <SectionTitle style={{ marginBottom: 18 }}>This course includes</SectionTitle>
            <IncludesList>
              <IncludeItem>
                <Clock3 size={24} />
                <span>{formatDuration(totalDurationSeconds)} on-demand video</span>
              </IncludeItem>
              <IncludeItem>
                <FileText size={24} />
                <span>{lessons.length} support sections</span>
              </IncludeItem>
              <IncludeItem>
                <Infinity size={24} />
                <span>Full lifetime access</span>
              </IncludeItem>
              <IncludeItem>
                <Smartphone size={24} />
                <span>Access on mobile, desktop and TV</span>
              </IncludeItem>
              <IncludeItem>
                <Award size={24} />
                <span>Certificate of completion</span>
              </IncludeItem>
            </IncludesList>
          </PlainSection>

          <PlainSection>
            <SectionTitle style={{ marginBottom: 18 }}>Requirements</SectionTitle>
            <RequirementsList>
              {requirements.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </RequirementsList>
          </PlainSection>

          <PlainSection>
            <SectionTitle style={{ marginBottom: 18 }}>Description</SectionTitle>
            <DescriptionBody>
              {extractDescriptionItems(course.description || "").length ? (
                extractDescriptionItems(course.description || "").map((item, index) => (
                  <DescriptionParagraph key={`${item}-${index}`}>
                    {item}
                  </DescriptionParagraph>
                ))
              ) : (
                <DescriptionParagraph>
                  {course.description || "Bu kurs uchun tavsif hali to'ldirilmagan."}
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
                  <span>{studentCount.toLocaleString()} students</span>
                </IncludeItem>
                <IncludeItem>
                  <BookOpen size={20} />
                  <span>{lessons.length} lessons</span>
                </IncludeItem>
                <IncludeItem>
                  <Globe size={20} />
                  <span>{course.lessonLanguage || "English"}</span>
                </IncludeItem>
              </IncludesList>
            </PurchaseBody>
          </PurchaseCard>
        </SideColumn>
      </PageInner>

    </PageShell>
  );
}
