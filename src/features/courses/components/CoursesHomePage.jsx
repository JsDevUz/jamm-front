import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock3,
  Code2,
  GraduationCap,
  PencilRuler,
  PlayCircle,
  Star,
} from "lucide-react";
import { fetchCourses } from "../../../api/coursesApi";
import useAuthStore from "../../../store/authStore";

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const iconPickers = [
  {
    match: /design|ui|ux|figma|brand|creative/i,
    Icon: PencilRuler,
  },
  {
    match: /web|front|back|code|dev|react|js|javascript|typescript|node/i,
    Icon: Code2,
  },
];

const PageRoot = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  background:
    radial-gradient(
      circle at top,
      rgba(250, 166, 26, 0.12) 0%,
      transparent 42%
    ),
    var(--background-color);
`;

const PageInner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 22px 16px 110px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 28px 24px 72px;
  }

  @media (min-width: 1100px) {
    padding: 36px 32px 80px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;

  & + & {
    margin-top: 28px;
  }

  @media (min-width: 768px) {
    gap: 18px;

    & + & {
      margin-top: 40px;
    }
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: var(--text-color);
  font-size: 1.85rem;
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.03em;

  @media (min-width: 768px) {
    font-size: 2.1rem;
  }
`;

const ContinueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const ContinueCard = styled.button`
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 14px;
  background: var(--secondary-color);
  color: inherit;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 14px;
  cursor: pointer;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 18px 40px rgba(0, 0, 0, 0.18);

  @media (min-width: 768px) {
    min-height: 220px;
    padding: 18px;
    gap: 16px;
  }
`;

const ContinueHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const ContinueIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(250, 166, 26, 0.14);
  color: var(--warning-color);
`;

const ContinueText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContinueCategory = styled.div`
  color: var(--text-muted-color);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const ContinueName = styled.div`
  color: var(--text-color);
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: var(--tertiary-color);
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${({ $value }) => `${$value}%`};
  min-width: ${({ $value }) => ($value > 0 ? "22px" : "0px")};
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    #ffb347 0%,
    var(--warning-color) 100%
  );
`;

const ContinueMeta = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  color: var(--text-secondary-color);
  font-size: 0.74rem;
  font-weight: 600;

  @media (max-width: 430px) {
    grid-template-columns: 1fr;
  }
`;

const MetaPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  white-space: nowrap;
`;

const ContinueAction = styled.div`
  margin-top: auto;
  color: var(--warning-color);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const RecommendedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const RecommendedCard = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 28px;
  background: var(--secondary-color);
  color: inherit;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 20px 44px rgba(0, 0, 0, 0.16);

  @media (min-width: 768px) {
    padding: 14px;
    gap: 12px;
  }
`;

const CoverFrame = styled.div`
  position: relative;
  aspect-ratio: 0.82;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  background:
    radial-gradient(
      circle at top left,
      rgba(250, 166, 26, 0.18),
      transparent 48%
    ),
    ${({ $gradient }) =>
      $gradient ||
      "linear-gradient(160deg, var(--secondary-color), var(--tertiary-color))"};
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);

  @media (min-width: 768px) {
    aspect-ratio: 0.9;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CoverFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.86);
`;

const CoverBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 9px;
  border-radius: 999px;
  background: var(--warning-color);
  color: white;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const CoverMeta = styled.div`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: white;
  font-size: 0.76rem;
  font-weight: 700;
`;

const CoverMetaPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding: 7px 9px;
  border-radius: 999px;
  background: rgba(14, 18, 26, 0.58);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const CourseTitle = styled.div`
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (min-width: 768px) {
    font-size: 1.06rem;
  }
`;

const CourseAuthor = styled.div`
  color: var(--text-secondary-color);
  font-size: 0.82rem;
  line-height: 1.25;
  min-height: 1.1rem;
`;

const CourseFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 430px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

const RatingRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary-color);
  font-size: 0.82rem;
  font-weight: 700;
`;

const Price = styled.div`
  color: var(--text-color);
  font-size: 0.92rem;
  font-weight: 800;
  white-space: nowrap;
`;

const SkeletonBlock = styled.div`
  width: 100%;
  border-radius: 18px;
  background: linear-gradient(
    90deg,
    var(--secondary-color) 0%,
    var(--hover-color) 50%,
    var(--secondary-color) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.35s linear infinite;
`;

const ContinueSkeleton = styled.div`
  border-radius: 24px;
  border: 1px solid var(--border-color);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--secondary-color);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 18px 40px rgba(0, 0, 0, 0.18);

  @media (min-width: 768px) {
    min-height: 220px;
    padding: 18px;
  }
`;

const RecommendedSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmptyCard = styled.div`
  border-radius: 24px;
  border: 1px dashed var(--border-color);
  padding: 18px;
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  font-size: 0.92rem;
  line-height: 1.45;
`;

function pickCourseIcon(category = "", title = "") {
  const target = `${category} ${title}`;
  const found = iconPickers.find((item) => item.match.test(target));
  return found?.Icon || GraduationCap;
}

function formatCompactDuration(seconds, t) {
  const normalized = Math.max(0, Number(seconds || 0));
  if (!normalized) return t("coursesHome.durationUnknown");

  const totalMinutes = Math.max(1, Math.round(normalized / 60));
  if (totalMinutes < 60) {
    return `${totalMinutes}${t("coursesHome.minuteShort")}`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!minutes) {
    return `${hours}${t("coursesHome.hourShort")}`;
  }

  return `${hours}${t("coursesHome.hourShort")} ${minutes}${t("coursesHome.minuteShort")}`;
}

function formatRemainingTime(seconds, remainingLessons, t) {
  const normalized = Math.max(0, Number(seconds || 0));
  if (!normalized) {
    if (remainingLessons <= 0) {
      return t("coursesHome.completed");
    }

    return t("coursesHome.lessonsLeft", { count: remainingLessons });
  }

  const totalMinutes = Math.max(1, Math.round(normalized / 60));
  if (totalMinutes < 60) {
    return t("coursesHome.minutesLeft", { count: totalMinutes });
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!minutes) {
    return t("coursesHome.hoursLeft", { count: hours });
  }

  return t("coursesHome.hoursMinutesLeft", { hours, minutes });
}

function formatPrice(price, accessType, t) {
  const normalizedPrice = Number(price || 0);
  if (accessType === "free_open" || normalizedPrice <= 0) {
    return t("coursesHome.freePrice");
  }

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: normalizedPrice % 1 === 0 ? 0 : 2,
  }).format(normalizedPrice);
}

function getCourseHref(course, lessonSlug) {
  const base = `/my-courses/${course.urlSlug || course._id}`;
  return lessonSlug ? `${base}/${lessonSlug}` : base;
}

function getEntityId(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value._id || value.id || value.userId || "";
}

function getMemberStatus(course, userId) {
  if (!userId || !course) return "none";
  if (String(getEntityId(course.createdBy || "")) === String(userId)) {
    return "owner";
  }

  const member = Array.isArray(course.members)
    ? course.members.find(
        (item) => String(getEntityId(item?.userId || item)) === String(userId),
      )
    : null;

  return member?.status || "none";
}

function getPublishedLessons(course) {
  return Array.isArray(course?.lessons)
    ? course.lessons.filter((lesson) => (lesson?.status || "published") !== "draft")
    : [];
}

function getLessonDurationSeconds(lesson) {
  const directDuration = Math.max(0, Number(lesson?.durationSeconds || 0));
  const mediaDuration = Array.isArray(lesson?.mediaItems)
    ? lesson.mediaItems.reduce(
        (sum, item) => sum + Math.max(0, Number(item?.durationSeconds || 0)),
        0,
      )
    : 0;

  return Math.max(directDuration, mediaDuration);
}

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

function toContinueCard(course) {
  const lessons = getPublishedLessons(course);
  if (!lessons.length) return null;

  const progressRows = lessons.map((lesson, index) => ({
    lesson,
    index,
    hasActivity: hasLessonActivity(lesson),
    isUnlocked: lesson?.isUnlocked !== false,
    durationSeconds: getLessonDurationSeconds(lesson),
  }));

  const completedLessons = progressRows.filter((item) => item.hasActivity).length;
  const progressPercent =
    lessons.length > 0
      ? Math.max(4, Math.round((completedLessons / lessons.length) * 100))
      : 0;
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
  const remainingRows = progressRows.filter((item) => !item.hasActivity);
  const remainingDurationSeconds = remainingRows.reduce(
    (sum, item) => sum + item.durationSeconds,
    0,
  );

  return {
    _id: course._id,
    urlSlug: course.urlSlug,
    title: course.name || course.title,
    category: course.category || "Course",
    gradient: course.gradient || "",
    thumbnailUrl: course.image || "",
    totalLessons: lessons.length,
    completedLessons,
    progressPercent,
    remainingDurationSeconds,
    remainingLessons: remainingRows.length,
    resumeLessonSlug: resumeEntry?.lesson?.urlSlug || "",
  };
}

function toRecommendedCard(course) {
  const lessons = getPublishedLessons(course);
  const totalDurationSeconds = lessons.reduce(
    (sum, lesson) => sum + getLessonDurationSeconds(lesson),
    0,
  );

  return {
    _id: course._id,
    urlSlug: course.urlSlug,
    title: course.name || course.title,
    category: course.category || "Course",
    gradient: course.gradient || "",
    thumbnailUrl: course.image || "",
    ownerName: "",
    rating: Number(course.rating || 4.7),
    ratingCount: Number(course.membersCount || course.members?.length || 0),
    price: Number(course.price || 0),
    accessType: course.accessType || "free_request",
    totalLessons: lessons.length,
    totalDurationSeconds,
  };
}

export default function CoursesHomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);
  const [dashboard, setDashboard] = useState({
    continueLearning: [],
    recommendedCourses: [],
  });
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchCourses(1, 60);
      const courses = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];
      const currentUserId = currentUser?._id || currentUser?.id || "";
      const continueLearning = courses
        .filter((course) => getMemberStatus(course, currentUserId) === "approved")
        .map(toContinueCard)
        .filter(Boolean)
        .slice(0, 8);
      const recommendedCourses = courses
        .filter((course) => getMemberStatus(course, currentUserId) === "none")
        .map(toRecommendedCard)
        .slice(0, 8);

      setDashboard({
        continueLearning,
        recommendedCourses,
      });
    } catch {
      setDashboard({
        continueLearning: [],
        recommendedCourses: [],
      });
    } finally {
      setLoading(false);
    }
  }, [currentUser?._id, currentUser?.id]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <PageRoot>
      <PageInner>
        <Section>
          <SectionTitle>{t("coursesHome.continueLearning")}</SectionTitle>
          {loading ? (
            <ContinueGrid>
              {Array.from({ length: 4 }).map((_, index) => (
                <ContinueSkeleton key={index}>
                  <SkeletonBlock style={{ height: 42, width: 42, borderRadius: 14 }} />
                  <SkeletonBlock style={{ height: 16 }} />
                  <SkeletonBlock style={{ height: 10, width: "48%" }} />
                  <SkeletonBlock style={{ height: 10, borderRadius: 999 }} />
                  <SkeletonBlock style={{ height: 12, width: "84%" }} />
                  <SkeletonBlock style={{ height: 13, width: "56%" }} />
                </ContinueSkeleton>
              ))}
            </ContinueGrid>
          ) : dashboard.continueLearning.length > 0 ? (
            <ContinueGrid>
              {dashboard.continueLearning.map((course) => {
                const Icon = pickCourseIcon(course.category, course.title);
                return (
                  <ContinueCard
                    key={course._id}
                    type="button"
                    onClick={() =>
                      navigate(getCourseHref(course, course.resumeLessonSlug))
                    }
                  >
                    <ContinueHeader>
                      <ContinueIcon>
                        <Icon size={20} />
                      </ContinueIcon>
                      <ContinueText>
                        <ContinueName>{course.title}</ContinueName>
                        <ContinueCategory>{course.category}</ContinueCategory>
                      </ContinueText>
                    </ContinueHeader>

                    <ProgressTrack>
                      <ProgressFill $value={course.progressPercent || 0} />
                    </ProgressTrack>

                    <ContinueMeta>
                      <MetaPill>
                        <BookOpen size={13} />
                        {t("coursesHome.lessonProgress", {
                          completed: course.completedLessons || 0,
                          total: course.totalLessons || 0,
                        })}
                      </MetaPill>
                      <MetaPill>
                        <Clock3 size={13} />
                        {formatRemainingTime(
                          course.remainingDurationSeconds,
                          course.remainingLessons,
                          t,
                        )}
                      </MetaPill>
                    </ContinueMeta>

                    <ContinueAction>
                      <PlayCircle size={15} />
                      {t("coursesHome.resumeCourse")}
                    </ContinueAction>
                  </ContinueCard>
                );
              })}
            </ContinueGrid>
          ) : (
            <EmptyCard>{t("coursesHome.emptyContinue")}</EmptyCard>
          )}
        </Section>

        <Section>
          <SectionTitle>{t("coursesHome.recommendedForYou")}</SectionTitle>
          {loading ? (
            <RecommendedGrid>
              {Array.from({ length: 4 }).map((_, index) => (
                <RecommendedSkeleton key={index}>
                  <SkeletonBlock style={{ aspectRatio: "0.82", borderRadius: 24 }} />
                  <SkeletonBlock style={{ height: 17 }} />
                  <SkeletonBlock style={{ height: 13, width: "72%" }} />
                  <SkeletonBlock style={{ height: 14, width: "88%" }} />
                </RecommendedSkeleton>
              ))}
            </RecommendedGrid>
          ) : dashboard.recommendedCourses.length > 0 ? (
            <RecommendedGrid>
              {dashboard.recommendedCourses.map((course, index) => {
                const Icon = pickCourseIcon(course.category, course.title);
                const isNew = index < 2;
                return (
                  <RecommendedCard
                    key={course._id}
                    type="button"
                    onClick={() => navigate(getCourseHref(course))}
                  >
                    <CoverFrame $gradient={course.gradient}>
                      {course.thumbnailUrl ? (
                        <CoverImage src={course.thumbnailUrl} alt={course.title} />
                      ) : (
                        <CoverFallback>
                          <Icon size={44} strokeWidth={1.7} />
                        </CoverFallback>
                      )}

                      {isNew ? <CoverBadge>{t("coursesHome.newBadge")}</CoverBadge> : null}

                      <CoverMeta>
                        <CoverMetaPill>
                          <PlayCircle size={14} />
                          {course.totalLessons > 0
                            ? t("coursesHome.lessonCountShort", {
                                count: course.totalLessons,
                              })
                            : t("coursesHome.courseLabel")}
                        </CoverMetaPill>
                        <CoverMetaPill>
                          {formatCompactDuration(course.totalDurationSeconds, t)}
                        </CoverMetaPill>
                      </CoverMeta>
                    </CoverFrame>

                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseAuthor>
                      {course.ownerName || t("coursesHome.unknownInstructor")}
                    </CourseAuthor>
                    <CourseFooter>
                      <RatingRow>
                        <Star
                          size={14}
                          fill="var(--warning-color)"
                          color="var(--warning-color)"
                        />
                        {Number(course.rating || 0).toFixed(1)} ({course.ratingCount || 0})
                      </RatingRow>
                      <Price>
                        {formatPrice(course.price, course.accessType, t)}
                      </Price>
                    </CourseFooter>
                  </RecommendedCard>
                );
              })}
            </RecommendedGrid>
          ) : (
            <EmptyCard>{t("coursesHome.emptyRecommended")}</EmptyCard>
          )}
        </Section>
      </PageInner>
    </PageRoot>
  );
}
