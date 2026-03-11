import React from "react";
import styled from "styled-components";
import { ArrowLeft, GraduationCap } from "lucide-react";
import {
  ProfileMobileBackButton,
  ProfilePaneBody,
  ProfilePaneEmptyIcon,
  ProfilePaneEmptyState,
  ProfilePaneHeader,
  ProfilePaneTitle,
} from "../ui";

const MobileBackBtn = styled(ProfileMobileBackButton)``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

const Card = styled.button`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  background: var(--secondary-color);
  cursor: pointer;
  text-align: left;
  padding: 0;
  transition:
    transform 0.16s ease,
    border-color 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--text-muted-color);
  }
`;

const Thumb = styled.div`
  height: 108px;
  background: var(--primary-color);
  background-image: ${(props) => (props.$image ? `url(${props.$image})` : "none")};
  background-size: cover;
  background-position: center;
  color: white;
  font-size: 34px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
`;

const Content = styled.div`
  padding: 10px 12px 12px;
`;

const Title = styled.h4`
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileCoursesPane = ({ courses, onBack, onOpenCourse }) => {
  return (
    <div data-tour="profile-pane-courses" style={{ display: "contents" }}>
      <ProfilePaneHeader>
        <MobileBackBtn onClick={onBack}>
          <ArrowLeft size={20} />
        </MobileBackBtn>
        <ProfilePaneTitle>Darslar</ProfilePaneTitle>
      </ProfilePaneHeader>

      <ProfilePaneBody>
        {courses.length === 0 ? (
          <ProfilePaneEmptyState>
            <ProfilePaneEmptyIcon>
              <GraduationCap size={28} color="var(--text-muted-color)" />
            </ProfilePaneEmptyIcon>
            <span>Siz qo'shgan darslar yo'q</span>
          </ProfilePaneEmptyState>
        ) : (
          <Grid>
            {courses.map((course) => (
              <Card
                key={course._id || course.id}
                onClick={() => onOpenCourse(course)}
              >
                <Thumb $image={course.image}>
                  {!course.image && (course.name || "?").charAt(0)}
                </Thumb>
                <Content>
                  <Title>{course.name}</Title>
                  <Meta>
                    {(course.lessonCount ?? (course.lessons || []).length) > 0
                      ? `${course.lessonCount ?? course.lessons.length} ta dars`
                      : "Hali dars yo'q"}
                  </Meta>
                </Content>
              </Card>
            ))}
          </Grid>
        )}
      </ProfilePaneBody>
    </div>
  );
};

export default ProfileCoursesPane;
