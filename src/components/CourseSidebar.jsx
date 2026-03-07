import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Plus,
  Users,
  Lock,
  CheckCircle,
  Clock,
  Trash2,
  BookOpen,
  Swords,
  Layers,
  Type,
} from "lucide-react";
import { useCourses } from "../contexts/CoursesContext";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateCourseDialog from "./CreateCourseDialog";
import ConfirmDialog from "./ConfirmDialog";
import SidebarSearchField from "./SidebarSearchField";
import { ButtonWrapper } from "./BlogsSidebar";

const SidebarContainer = styled.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh);
  }
`;

const HeaderSection = styled.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  height: 56ppx;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;

const CreateButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background-color: var(--hover-color);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  padding: 16px 16px 0 16px;
  gap: 8px;
`;

const NavTab = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "var(--primary-color)" : "var(--background-color)"};
  color: ${(props) => (props.active ? "white" : "var(--text-color)")};
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
  }
`;

const HeaderSearch = styled(SidebarSearchField)`
  flex: 1;
  min-width: 0;
  margin-right: 12px;
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
    props.active &&
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
  background: ${(props) =>
    props.gradient || "linear-gradient(135deg, #667eea, #764ba2)"};
  background-image: ${(props) => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 12px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
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
  console.log(selectedCourse);

  const navigate = useNavigate(); // Added this line
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
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    if (viewMode === "courses") {
      ensureCoursesLoaded();
    }
  }, [ensureCoursesLoaded, viewMode]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredCourses = React.useMemo(() => {
    if (!searchQuery) {
      return courses.filter((course) => {
        const status = isEnrolled(course._id);
        return (
          status === "admin" || status === "approved" || status === "pending"
        );
      });
    }
    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [courses, searchQuery, isEnrolled]);

  const getStatusLabel = (courseId) => {
    const status = isEnrolled(courseId);
    switch (status) {
      case "admin":
        return { text: "Admin", icon: null };
      case "approved":
        return { text: "A'zo", icon: <CheckCircle size={10} /> };
      case "pending":
        return { text: "Kutilmoqda", icon: <Clock size={10} /> };
      default:
        return null;
    }
  };

  const handleSelectCourse = (course) => {
    onSelectCourse(course._id);

    const slug = course.urlSlug || course._id;
    window.history.replaceState(null, "", `/courses/${slug}`);
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;
    try {
      setIsDeleting(true);
      await removeCourse(courseToDelete._id);
      if (selectedCourse === courseToDelete._id) {
        onSelectCourse(null);
        window.history.replaceState(null, "", `/courses`);
      }
      setCourseToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("Kursni o'chirishda xatolik yuz berdi");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <SidebarContainer>
        <TabsContainer>
          <NavTab
            active={viewMode === "courses"}
            onClick={() => {
              if (onToggleViewMode) onToggleViewMode("courses");
              navigate("/courses");
            }}
          >
            <BookOpen size={16} /> Kurslar
          </NavTab>
          <NavTab
            active={viewMode === "arena"}
            onClick={() => {
              if (onToggleViewMode) onToggleViewMode("arena");
              onSelectCourse(null);
              navigate("/arena");
            }}
          >
            <Swords size={16} /> Maydon
          </NavTab>
        </TabsContainer>

        {viewMode === "arena" ? (
          <CourseList style={{ paddingTop: "16px" }}>
            <CourseItem
              active={activeArenaTab === "tests"}
              onClick={() => {
                if (setActiveArenaTab) setActiveArenaTab("tests");
                navigate("/arena/quiz");
              }}
            >
              <CourseThumbnail gradient="linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)">
                <BookOpen size={20} color="white" />
              </CourseThumbnail>
              <CourseInfo>
                <CourseName>Testlar</CourseName>
                <CourseDescription>Ochiq testlarni ishlash</CourseDescription>
              </CourseInfo>
            </CourseItem>

            <CourseItem
              active={activeArenaTab === "flashcards"}
              onClick={() => {
                if (setActiveArenaTab) setActiveArenaTab("flashcards");
                navigate("/arena/flashcard");
              }}
            >
              <CourseThumbnail gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
                <Layers size={20} color="white" />
              </CourseThumbnail>
              <CourseInfo>
                <CourseName>Flashcards</CourseName>
                <CourseDescription>Lug'atlarni yodlash</CourseDescription>
              </CourseInfo>
            </CourseItem>

            <CourseItem
              active={activeArenaTab === "sentenceBuilders"}
              onClick={() => {
                if (setActiveArenaTab) setActiveArenaTab("sentenceBuilders");
                navigate("/arena/sentence-builder");
              }}
            >
              <CourseThumbnail gradient="linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)">
                <Type size={20} color="white" />
              </CourseThumbnail>
              <CourseInfo>
                <CourseName>Gap tuzish</CourseName>
                <CourseDescription>Bo'laklardan gap yig'ish</CourseDescription>
              </CourseInfo>
            </CourseItem>

            <CourseItem
              active={activeArenaTab === "battles"}
              onClick={() => {
                if (setActiveArenaTab) setActiveArenaTab("battles");
                navigate("/arena/battle");
              }}
            >
              <CourseThumbnail gradient="linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)">
                <Swords size={20} color="white" />
              </CourseThumbnail>
              <CourseInfo>
                <CourseName>Bilimlar bellashuvi</CourseName>
                <CourseDescription>Real vaqt musobaqa</CourseDescription>
              </CourseInfo>
            </CourseItem>
          </CourseList>
        ) : (
          <>
            <HeaderSection>
              <HeaderSearch
                type="text"
                placeholder="Kurslarni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <ButtonWrapper
                onClick={() => setIsCreateOpen(true)}
                title="Yangi kurs yaratish"
              >
                <Plus size={18} />
              </ButtonWrapper>
            </HeaderSection>

            <CourseList id="sidebarCoursesArea">
              {loading ? null : filteredCourses.length === 0 ? (
                <EmptyState>
                  <EmptyIcon>
                    <Lock size={24} />
                  </EmptyIcon>
                  <span>Hozircha kurslar yo'q</span>
                  <span style={{ fontSize: 12 }}>
                    Yangi kurs yaratish uchun + tugmasini bosing
                  </span>
                </EmptyState>
              ) : (
                <InfiniteScroll
                  dataLength={filteredCourses.length}
                  next={() => fetchCourses(coursesPage + 1)}
                  hasMore={coursesHasMore && !searchQuery}
                  loader={
                    <div
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        color: "var(--text-muted-color)",
                        fontSize: "12px",
                      }}
                    >
                      Yuklanmoqda...
                    </div>
                  }
                  endMessage={
                    filteredCourses.length > 0 && !searchQuery ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          color: "var(--text-muted-color)",
                          fontSize: "12px",
                        }}
                      >
                        Barcha kurslar ko'rsatildi.
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
                    const totalMembers = (course.members || []).filter(
                      (m) => m.status === "approved",
                    ).length;
                    return (
                      <CourseItem
                        key={course._id}
                        active={
                          selectedCourse === course._id ||
                          selectedCourse === course.urlSlug
                        }
                        onClick={() => handleSelectCourse(course)}
                      >
                        <CourseThumbnail
                          src={course.image}
                          gradient={course.gradient}
                        >
                          {!course.image && course.name.charAt(0)}
                        </CourseThumbnail>
                        <CourseInfo>
                          <CourseName>{course.name}</CourseName>
                          <CourseDescription>
                            {(course.lessons || []).length > 0
                              ? `${course.lessons.length} ta dars`
                              : "Hali dars yo'q"}
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
                              title="Kursni o'chirish"
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
        title="Kursni o'chirish"
        description={
          <>
            Rostdan ham <b>{courseToDelete?.name}</b> kursni o'chirmoqchimisiz?
            Bu amalni keyin tiklab bo'lmaydi va kursga tegishli barcha videolar,
            fayllar va ma'lumotlar o'chib ketadi.
          </>
        }
        confirmText={isDeleting ? "O'chirilmoqda..." : "Ha, o'chirish"}
        cancelText="Yo'q, qolsin"
        onConfirm={handleDeleteConfirm}
        isDanger={true}
      />
    </>
  );
};

export default CourseSidebar;
