import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Users,
  Lock,
  CheckCircle,
  Clock,
  Trash2,
  BookOpen,
  Swords,
  Layers,
  Type,
  Brain,
} from "lucide-react";
import { useCourses } from "../../../contexts/CoursesContext";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateCourseDialog from "./CreateCourseDialog";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import SectionHeader from "../../../shared/ui/navigation/SectionHeader";

const DEFAULT_COURSE_GRADIENT = "linear-gradient(135deg, rgb(240, 147, 251), rgb(245, 87, 108))";

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
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  color: white;
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
  gap: 8px;
  flex-shrink: 0;
`;

const MemberCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-muted-color);
`;

const LessonCount = styled.div`
  font-size: 11px;
  color: var(--text-muted-color);
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
    isAdmin,
    isEnrolled,
    removeCourse,
    fetchCourses,
    ensureCoursesLoaded,
  } = useCourses();

  React.useEffect(() => {
    if (viewMode === "courses") {
      ensureCoursesLoaded();
    }
  }, [ensureCoursesLoaded, viewMode]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const arenaItems = React.useMemo(
    () => [
      {
        key: "tests",
        title: t("courseSidebar.arena.testsTitle"),
        description: t("courseSidebar.arena.testsDescription"),
        icon: <BookOpen size={20} color="white" />,
        gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
        path: "/arena/quiz",
      },
      {
        key: "flashcards",
        title: t("courseSidebar.arena.flashcardsTitle"),
        description: t("courseSidebar.arena.flashcardsDescription"),
        icon: <Layers size={20} color="white" />,
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        path: "/arena/flashcard",
      },
      {
        key: "sentenceBuilders",
        title: t("courseSidebar.arena.sentencesTitle"),
        description: t("courseSidebar.arena.sentencesDescription"),
        icon: <Type size={20} color="white" />,
        gradient: "linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)",
        path: "/arena/sentence-builder",
      },
      {
        key: "mnemonics",
        title: t("courseSidebar.arena.mnemonicsTitle"),
        description: t("courseSidebar.arena.mnemonicsDescription"),
        icon: <Brain size={20} color="white" />,
        gradient: "linear-gradient(135deg, #64748b 0%, #334155 100%)",
        path: "/arena/minemonika",
      },
      {
        key: "battles",
        title: t("courseSidebar.arena.battlesTitle"),
        description: t("courseSidebar.arena.battlesDescription"),
        icon: <Swords size={20} color="white" />,
        gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
        path: "/arena/battle",
      },
    ],
    [t],
  );

  const filteredCourses = React.useMemo(
    () =>
      courses.filter((course) => {
        const status = isEnrolled(course._id);
        return (
          status === "admin" || status === "approved" || status === "pending"
        );
      }),
    [courses, isEnrolled],
  );

  const getStatusLabel = (courseId) => {
    const status = isEnrolled(courseId);
    switch (status) {
      case "admin":
        return { text: t("courseSidebar.status.admin"), icon: null };
      case "approved":
        return { text: t("courseSidebar.status.approved"), icon: null };
      case "pending":
        return { text: t("courseSidebar.status.pending"), icon: null };
      default:
        return null;
    }
  };

  const handleSelectCourse = (course) => {
    onSelectCourse(course._id);

    const slug = course.urlSlug || course._id;
    navigate(`/courses/${slug}`);
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;
    try {
      setIsDeleting(true);
      await removeCourse(courseToDelete._id);
      if (
        selectedCourse === courseToDelete._id ||
        selectedCourse === courseToDelete.urlSlug
      ) {
        onSelectCourse(null);
        navigate("/courses", { replace: true });
      }
      setCourseToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error(t("courseSidebar.deleteError"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <SidebarContainer>
        <SectionHeader
          title={
            viewMode === "arena"
              ? t("courseSidebar.tabs.arena")
              : t("navigation.courses")
          }
          onSearch={() =>
            navigate("/search?tab=courses", {
              state: { from: `${location.pathname}${location.search}` },
            })
          }
          onAdd={() => setIsCreateOpen(true)}
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
              navigate("/courses");
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
                  <CourseThumbnailFallback $gradient={DEFAULT_COURSE_GRADIENT}>
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
                    const statusInfo = getStatusLabel(course._id);
                    const totalMembers =
                      course.membersCount ??
                      (course.members || []).filter(
                        (m) => m.status === "approved",
                      ).length;
                    const lessonCount =
                      course.lessonCount ?? (course.lessons || []).length;
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
                            <CourseThumbnailImage src={course.image} alt={course.name} />
                          ) : (
                            <CourseThumbnailFallback
                              $gradient={getCourseGradientCss(course.gradient)}
                            >
                              {course.name.charAt(0)}
                            </CourseThumbnailFallback>
                          )}
                        </CourseThumbnail>
                        <CourseInfo>
                          <CourseName>{course.name}</CourseName>
                          <CourseDescription>
                            {lessonCount > 0
                              ? t("courseSidebar.lessonCount", {
                                  count: lessonCount,
                                })
                              : t("courseSidebar.noLessons")}
                            {statusInfo && (
                              <StatusBadge status={isEnrolled(course._id)}>
                                {statusInfo.icon}
                                {statusInfo.text}
                              </StatusBadge>
                            )}
                          </CourseDescription>
                        </CourseInfo>
                        <CourseMeta>
                          <MemberCount>
                            <Users size={12} />
                            {totalMembers}
                          </MemberCount>
                          {isAdmin(course._id) && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setCourseToDelete(course);
                              }}
                              style={{
                                color: "var(--text-muted-color)",
                                cursor: "pointer",
                                padding: "2px",
                                borderRadius: "4px",
                                display: "flex",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.color =
                                  "var(--danger-color)";
                                e.currentTarget.style.backgroundColor =
                                  "rgba(239, 68, 68, 0.1)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.color =
                                  "var(--text-muted-color)";
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                              }}
                              title={t("courseSidebar.deleteAction")}
                            >
                              <Trash2 size={14} />
                            </div>
                          )}
                        </CourseMeta>
                      </CourseItem>
                    );
                  })}
                </InfiniteScroll>
              )}
            </CourseList>
          </>
        )}
      </SidebarContainer>

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

      <ConfirmDialog
        isOpen={!!courseToDelete}
        onClose={() => setCourseToDelete(null)}
        title={t("courseSidebar.deleteTitle")}
        description={
          <Trans
            i18nKey="courseSidebar.deleteDescription"
            values={{ name: courseToDelete?.name || "" }}
            components={{ bold: <b /> }}
          />
        }
        confirmText={
          isDeleting
            ? t("courseSidebar.deleteConfirmLoading")
            : t("courseSidebar.deleteConfirm")
        }
        cancelText={t("courseSidebar.deleteCancel")}
        onConfirm={handleDeleteConfirm}
        isDanger={true}
      />
    </>
  );
};

export default CourseSidebar;
