import React from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Eye, ListVideo, Lock, Play, Plus, Trash2 } from "lucide-react";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import {
  AddLessonBtn,
  DeleteLessonBtn,
  EmptyLessons,
  EmptyLessonsHint,
  FreeBadge,
  LessonInfo,
  LessonItem,
  LessonList,
  LessonMeta,
  LessonMetaItem,
  LessonNumber,
  LessonTitle,
  LockedLessonTitle,
  MobileBackBtn,
  PlaylistActions,
  PlaylistCount,
  PlaylistHeader,
  PlaylistPanel,
  PlaylistTitle,
  PlaylistToggle,
} from "./CoursePlayerPlaylistPanel.styles";

const CoursePlayerPlaylistPanel = () => {
  const {
    activeLesson,
    admin,
    canAccessLesson,
    canAccessLessons,
    course,
    formatViews,
    handleLessonClick,
    onClose,
    playlistCollapsed,
    setIsAddLessonOpen,
    setLessonToDelete,
    setPlaylistCollapsed,
  } = useCoursePlayerContext();

  return (
    <PlaylistPanel>
      <PlaylistHeader>
        <PlaylistTitle>
          <MobileBackBtn onClick={onClose}>
            <ArrowLeft size={20} />
          </MobileBackBtn>
          <ListVideo size={18} />
          Darslar
        </PlaylistTitle>
        <PlaylistActions>
          <PlaylistCount>{course.lessons.length} ta dars</PlaylistCount>
          {admin && (
            <AddLessonBtn
              onClick={() => setIsAddLessonOpen(true)}
              title="Dars qo'shish"
            >
              <Plus size={16} />
            </AddLessonBtn>
          )}
          <PlaylistToggle onClick={() => setPlaylistCollapsed(!playlistCollapsed)}>
            {playlistCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </PlaylistToggle>
        </PlaylistActions>
      </PlaylistHeader>

      <LessonList $collapsed={playlistCollapsed}>
        {course.lessons.length === 0 ? (
          <EmptyLessons>
            {admin ? (
              <>
                Hali darslar yo'q.
                <br />
                <EmptyLessonsHint>+ tugmasini bosib dars qo'shing</EmptyLessonsHint>
              </>
            ) : (
              "Hali darslar qo'shilmagan"
            )}
          </EmptyLessons>
        ) : (
          course.lessons.map((lesson, index) => {
            const canOpen = canAccessLesson(index);
            const isActive = canOpen && activeLesson === index;

            return (
              <LessonItem
                key={lesson._id}
                $active={isActive}
                $interactive={canOpen}
                onClick={() => canOpen && handleLessonClick(index)}
              >
                <LessonNumber $active={isActive}>
                  {isActive ? (
                    <Play size={12} fill="white" />
                  ) : canOpen ? (
                    index + 1
                  ) : (
                    <Lock size={12} />
                  )}
                </LessonNumber>

                <LessonInfo>
                  {canOpen ? (
                    <>
                      <LessonTitle $active={activeLesson === index}>
                        {lesson.title}
                        {index === 0 && !canAccessLessons && <FreeBadge>Bepul</FreeBadge>}
                      </LessonTitle>
                      <LessonMeta>
                        <LessonMetaItem>
                          <Eye size={11} />
                          {formatViews(lesson.views)}
                        </LessonMetaItem>
                      </LessonMeta>
                    </>
                  ) : (
                    <LockedLessonTitle>
                      <Lock size={12} />
                      {index + 1}-dars
                    </LockedLessonTitle>
                  )}
                </LessonInfo>

                {admin && (
                  <DeleteLessonBtn
                    onClick={(event) => {
                      event.stopPropagation();
                      setLessonToDelete(lesson._id);
                    }}
                    title="O'chirish"
                  >
                    <Trash2 size={14} />
                  </DeleteLessonBtn>
                )}
              </LessonItem>
            );
          })
        )}
      </LessonList>
    </PlaylistPanel>
  );
};

export default CoursePlayerPlaylistPanel;
