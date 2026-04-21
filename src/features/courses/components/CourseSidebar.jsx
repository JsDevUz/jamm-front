import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Lock,
  CheckCircle,
  BookOpen,
  Swords,
  Layers,
  Type,
  Brain,
} from "lucide-react";
import { useCourses } from "../../../contexts/CoursesContext";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateCourseDialog from "./CreateCourseDialog";
import SectionHeader from "../../../shared/ui/navigation/SectionHeader";
import useHorizontalSwipeNavigation from "../../../shared/hooks/useHorizontalSwipeNavigation";
import { getCourseNavigationPath } from "../utils/courseNavigation";

const DEFAULT_COURSE_IMAGE = "/default-course-image.jpg";

const DEFAULT_COURSE_GRADIENT =
  "linear-gradient(135deg, color-mix(in srgb, var(--primary-color) 16%, var(--secondary-color)) 0%, color-mix(in srgb, var(--primary-color) 8%, var(--secondary-color)) 100%)";

const getCourseGradientCss = (gradient) => {
  const matches = String(gradient || "").match(
    /(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))/g,
  );

  if (matches && matches.length >= 2) {
    return `linear-gradient(135deg, ${matches[0]}, ${matches[1]})`;
  }

  if (matches && matches.length === 1) {
    return `linear-gradient(135deg, ${matches[0]}, ${matches[0]})`;
  }

  return DEFAULT_COURSE_GRADIENT;
};

const SidebarContainer = styled.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: var(--app-height, 100dvh);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const NavTab = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 10px;
  border-radius: 0;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--text-muted-color)"};
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: var(--text-color);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0;
    height: 2px;
    border-radius: 999px;
    background: ${(props) =>
      props.$active ? "var(--primary-color)" : "transparent"};
  }
`;

const CourseList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.15s ease;
  color: var(--text-secondary-color);
  gap: 12px;
  position: relative;

  &:hover {
    background-color: var(--hover-color);
  }

  ${(props) =>
    props.$active &&
    `
    background-color: var(--active-color);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 4px;
      bottom: 4px;
      width: 3px;
      background: var(--primary-color);
      border-radius: 0 3px 3px 0;
    }
  `}
`;

const CourseThumbnail = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.2),
    0 10px 24px rgba(0, 0, 0, 0.12);
`;

const CourseThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CourseThumbnailFallback = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.$gradient || DEFAULT_COURSE_GRADIENT};
  color: ${(props) =>
    props.$gradient && props.$gradient !== DEFAULT_COURSE_GRADIENT
      ? "white"
      : "var(--primary-color)"};
  font-weight: 700;
  font-size: 18px;
`;

const CourseInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CourseName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CourseDescription = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CourseMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
  min-width: 48px;
`;

const CourseProgressWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  width: 48px;
`;

const CourseProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background: var(--input-color);
  border-radius: 999px;
  overflow: hidden;
`;

const CourseProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: ${(props) =>
    props.$done ? "var(--success-color)" : "var(--primary-color)"};
  width: ${(props) => Math.min(100, Math.max(0, props.$percent || 0))}%;
  transition: width 0.3s ease;
`;

const CourseProgressLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: ${(props) =>
    props.$done ? "var(--success-color)" : "var(--text-muted-color)"};
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;

  ${(props) => {
    switch (props.status) {
      case "admin":
        return `background: rgba(88, 101, 242, 0.15); color: var(--primary-color);`;
      case "approved":
        return `background: rgba(67, 181, 129, 0.15); color: var(--success-color);`;
      case "pending":
        return `background: rgba(250, 166, 26, 0.15); color: var(--warning-color);`;
      default:
        return `background: var(--input-color); color: var(--text-muted-color);`;
    }
  }}
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  gap: 12px;
`;

const EmptyIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
`;

const CourseSidebar = ({
  selectedCourse,
  onSelectCourse,
  onOpenPremium,
  hideCreateCourse = false,
  viewMode = "courses",
  onToggleViewMode,
  activeArenaTab,
  setActiveArenaTab,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    courses,
    loading,
    coursesPage,
    coursesHasMore,
    isEnrolled,
    fetchCourses,
    ensureCoursesLoaded,
    currentUser,
  } = useCourses();

  React.useEffect(() => {
    if (viewMode === "courses") {
      ensureCoursesLoaded();
    }
  }, [ensureCoursesLoaded, viewMode]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const getCurrentUserId = (user) => {
    if (!user) return null;
    return user._id || user.id || null;
  };

  const getCourseProgress = (course) => {
    const userId = getCurrentUserId(currentUser);
    const lessons = course.lessons || [];
    const total = lessons.filter((l) => l.status !== "draft").length;
    if (!total) return { percent: 0, watched: 0, total: 0, done: false };

    let totalPercent = 0;
    let watchedCount = 0;

    lessons.forEach((lesson) => {
      if (lesson.status === "draft") return;
      let p = 0;
      if (lesson.selfAttendance) {
        p = Math.min(100, Math.max(0, Number(lesson.selfAttendance.progressPercent || 0)));
      } else if (userId && Array.isArray(lesson.attendance)) {
        const record = lesson.attendance.find(
          (r) => String(r.userId?._id || r.userId || r) === String(userId),
        );
        p = Math.min(100, Math.max(0, Number(record?.progressPercent || 0)));
      }
      totalPercent += p;
      if (p >= 70) watchedCount += 1;
    });

    const avg = total ? Math.round(totalPercent / total) : 0;
    return { percent: avg, watched: watchedCount, total, done: watchedCount === total && total > 0 };
  };
  const arenaItems = React.useMemo(
    () => [
      {
        key: "tests",
        title: t("courseSidebar.arena.testsTitle"),
        description: t("courseSidebar.arena.testsDescription"),
        icon: <BookOpen size={20} />,
        gradient: "var(--primary-color)",
        path: "/arena/quiz",
      },
      {
        key: "flashcards",
        title: t("courseSidebar.arena.flashcardsTitle"),
        description: t("courseSidebar.arena.flashcardsDescription"),
        icon: <Layers size={20} />,
        gradient: "var(--primary-color)",
        path: "/arena/flashcard",
      },
      {
        key: "sentenceBuilders",
        title: t("courseSidebar.arena.sentencesTitle"),
        description: t("courseSidebar.arena.sentencesDescription"),
        icon: <Type size={20} />,
        gradient: "var(--primary-color)",
        path: "/arena/sentence-builder",
      },
      {
        key: "mnemonics",
        title: t("courseSidebar.arena.mnemonicsTitle"),
        description: t("courseSidebar.arena.mnemonicsDescription"),
        icon: <Brain size={20} />,
        gradient: "var(--primary-color)",
        path: "/arena/minemonika",
      },
      {
        key: "battles",
        title: t("courseSidebar.arena.battlesTitle"),
        description: t("courseSidebar.arena.battlesDescription"),
        icon: <Swords size={20} />,
        gradient: "var(--primary-color)",
        path: "/arena/battle",
      },
    ],
    [t],
  );

  const filteredCourses = React.useMemo(
    () =>
      courses.filter((course) => {
        const status = isEnrolled(course._id);
        return status === "admin" || status === "approved";
      }),
    [courses, isEnrolled],
  );

  const handleSelectCourse = (course) => {
    onSelectCourse(course._id);
    const userId = currentUser?._id || currentUser?.id || "";
    navigate(getCourseNavigationPath(course, userId));
  };

  const openCreateCourse = () => {
    if (hideCreateCourse) return;
    setIsCreateOpen(true);
  };

  const tabSwipeHandlers = useHorizontalSwipeNavigation({
    onSwipeLeft: () => {
      if (viewMode === "arena") return;
      if (onToggleViewMode) onToggleViewMode("arena");
      onSelectCourse(null);
      navigate("/arena");
    },
    onSwipeRight: () => {
      if (viewMode === "courses") return;
      if (onToggleViewMode) onToggleViewMode("courses");
      navigate("/my-courses");
    },
  });

  return (
    <>
      <SidebarContainer {...tabSwipeHandlers}>
        <SectionHeader
          title={
            viewMode === "arena"
              ? t("courseSidebar.tabs.arena")
              : t("navigation.courses")
          }
          onSearch={() =>
            navigate("/search", {
              state: { backgroundLocation: location, initialTab: "courses" },
            })
          }
          onAdd={openCreateCourse}
          hideAdd={hideCreateCourse}
          searchTitle={
            viewMode === "arena"
              ? t("courseSidebar.arena.searchPlaceholder", {
                  defaultValue: "Arena qidirish...",
                })
              : t("courseSidebar.searchPlaceholder")
          }
          addTitle={t("courseSidebar.createTitle")}
          searchTargetProps={{ "data-tour": "courses-search" }}
          addTargetProps={{ "data-tour": "courses-create" }}
        />

        <TabsContainer data-tour="courses-tabs">
          <NavTab
            $active={viewMode === "courses"}
            onClick={() => {
              if (onToggleViewMode) onToggleViewMode("courses");
              navigate("/my-courses");
            }}
          >
            {t("courseSidebar.tabs.courses")}
          </NavTab>
          <NavTab
            $active={viewMode === "arena"}
            onClick={() => {
              if (onToggleViewMode) onToggleViewMode("arena");
              onSelectCourse(null);
              navigate("/arena");
            }}
          >
            {t("courseSidebar.tabs.arena")}
          </NavTab>
        </TabsContainer>

        {viewMode === "arena" ? (
          <CourseList>
            {arenaItems.map((item) => (
              <CourseItem
                key={item.key}
                $active={activeArenaTab === item.key}
                onClick={() => {
                  if (setActiveArenaTab) setActiveArenaTab(item.key);
                  navigate(item.path);
                }}
              >
                <CourseThumbnail>
                  <CourseThumbnailFallback $gradient={item.gradient}>
                    {item.icon}
                  </CourseThumbnailFallback>
                </CourseThumbnail>
                <CourseInfo>
                  <CourseName>{item.title}</CourseName>
                  <CourseDescription>{item.description}</CourseDescription>
                </CourseInfo>
              </CourseItem>
            ))}
          </CourseList>
        ) : (
          <>
            <CourseList id="sidebarCoursesArea" data-tour="courses-list">
              {loading ? null : filteredCourses.length === 0 ? (
                <EmptyState>
                  <EmptyIcon>
                    <Lock size={24} />
                  </EmptyIcon>
                  <span>{t("courseSidebar.emptyTitle")}</span>
                  <span style={{ fontSize: 12 }}>
                    {t("courseSidebar.emptyDescription")}
                  </span>
                </EmptyState>
              ) : (
                <InfiniteScroll
                  dataLength={filteredCourses.length}
                  next={() => fetchCourses(coursesPage + 1)}
                  hasMore={coursesHasMore}
                  loader={
                    <div
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        color: "var(--text-muted-color)",
                        fontSize: "12px",
                      }}
                    >
                      {t("common.loading")}
                    </div>
                  }
                  endMessage={
                    filteredCourses.length > 0 ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          color: "var(--text-muted-color)",
                          fontSize: "12px",
                        }}
                      >
                        {t("courseSidebar.allShown")}
                      </div>
                    ) : null
                  }
                  scrollableTarget="sidebarCoursesArea"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "visible",
                  }}
                >
                  {filteredCourses.map((course) => {
                    const lessonCount =
                      course.lessonCount ?? (course.lessons || []).length;
                    const progress = getCourseProgress(course);
                    return (
                      <CourseItem
                        key={course._id}
                        $active={
                          selectedCourse === course._id ||
                          selectedCourse === course.urlSlug
                        }
                        onClick={() => handleSelectCourse(course)}
                      >
                        <CourseThumbnail>
                          {course.image ? (
                            <CourseThumbnailImage
                              src={course.image}
                              alt={course.name}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <CourseThumbnailFallback
                            $gradient={getCourseGradientCss(course.gradient)}
                            style={{ display: course.image ? "none" : "flex" }}
                          >
                            {course.name.charAt(0)}
                          </CourseThumbnailFallback>
                        </CourseThumbnail>
                        <CourseInfo>
                          <CourseName>{course.name}</CourseName>
                          <CourseDescription>
                            {lessonCount > 0
                              ? t("courseSidebar.lessonCount", {
                                  count: lessonCount,
                                })
                              : t("courseSidebar.noLessons")}
                          </CourseDescription>
                        </CourseInfo>
                        {progress.total > 0 && (
                          <CourseMeta>
                            <CourseProgressWrap>
                              <CourseProgressLabel $done={progress.done}>
                                {progress.done ? (
                                  <CheckCircle size={10} style={{ display: "inline", marginRight: 2 }} />
                                ) : null}
                                {progress.percent}%
                              </CourseProgressLabel>
                              <CourseProgressBar>
                                <CourseProgressFill $percent={progress.percent} $done={progress.done} />
                              </CourseProgressBar>
                              <CourseProgressLabel $done={false} style={{ color: "var(--text-muted-color)", fontWeight: 400 }}>
                                {progress.watched}/{progress.total}
                              </CourseProgressLabel>
                            </CourseProgressWrap>
                          </CourseMeta>
                        )}
                      </CourseItem>
                    );
                  })}
                </InfiniteScroll>
              )}
            </CourseList>
          </>
        )}
      </SidebarContainer>

      {!hideCreateCourse ? (
        <CreateCourseDialog
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreated={(courseId) => {
            setIsCreateOpen(false);
            const c = courses.find((iter) => iter._id === courseId);
            if (c) handleSelectCourse(c);
            else onSelectCourse(courseId);
          }}
          onOpenPremium={onOpenPremium}
        />
      ) : null}

    </>
  );
};

export default CourseSidebar;
