import React, { useState } from "react";
import styled from "styled-components";
import { Plus, Users, Lock, CheckCircle, Clock } from "lucide-react";
import { useCourses } from "../contexts/CoursesContext";
import CreateCourseDialog from "./CreateCourseDialog";

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
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;

const CreateButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 14px rgba(88, 101, 242, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SearchContainer = styled.div`
  padding: 8px 16px 12px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  background-color: var(--input-color);
  border: none;
  border-radius: 6px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(88, 101, 242, 0.3);
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
  gap: 4px;
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

const CourseSidebar = ({ selectedCourse, onSelectCourse }) => {
  const { courses, isAdmin, isEnrolled } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredCourses = React.useMemo(() => {
    if (!searchQuery) {
      return courses.filter((course) => {
        const status = isEnrolled(course.id);
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

  return (
    <>
      <SidebarContainer>
        <HeaderSection>
          <HeaderTitle>Kurslar</HeaderTitle>
          <CreateButton
            onClick={() => setIsCreateOpen(true)}
            title="Yangi kurs yaratish"
          >
            <Plus size={20} />
          </CreateButton>
        </HeaderSection>

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Kurslarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <CourseList>
          {filteredCourses.length === 0 ? (
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
            filteredCourses.map((course) => {
              const statusInfo = getStatusLabel(course.id);
              const totalMembers = course.members.filter(
                (m) => m.status === "approved",
              ).length;
              return (
                <CourseItem
                  key={course.id}
                  active={selectedCourse === course.id}
                  onClick={() => onSelectCourse(course.id)}
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
                      {course.lessons.length > 0
                        ? `${course.lessons.length} ta dars`
                        : "Hali dars yo'q"}
                      {statusInfo && (
                        <StatusBadge status={isEnrolled(course.id)}>
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
                  </CourseMeta>
                </CourseItem>
              );
            })
          )}
        </CourseList>
      </SidebarContainer>

      <CreateCourseDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={(courseId) => {
          setIsCreateOpen(false);
          onSelectCourse(courseId);
        }}
      />
    </>
  );
};

export default CourseSidebar;
