import React from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ListVideo,
  Lock,
  Play,
} from "lucide-react";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import { useCourses } from "../../../../contexts/CoursesContext";
import {
  DraftBadge,
  EmptyLessons,
  FreeBadge,
  LessonTitleText,
  LessonInfo,
  LessonItem,
  LessonList,
  LessonNumber,
  LessonProgressBar,
  LessonProgressFill,
  LessonProgressRow,
  LessonProgressPercent,
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
  const { t } = useTranslation();
  const {
    activeLesson,
    canAccessLesson,
    canAccessLessons,
    course,
    handleLessonClick,
    onClose,
    playlistCollapsed,
    setPlaylistCollapsed,
  } = useCoursePlayerContext();
  const { currentUser } = useCourses();

  const getLessonProgress = (lesson) => {
    // selfAttendance is a pre-filtered record returned by the API for the current user.
    // Fall back to scanning the full attendance array for optimistic local updates.
    const userId = currentUser?._id || currentUser?.id;
    let percent = 0;
    if (lesson.selfAttendance) {
      percent = Math.min(100, Math.max(0, Number(lesson.selfAttendance.progressPercent || 0)));
    } else if (userId && Array.isArray(lesson.attendance)) {
      const record = lesson.attendance.find(
        (r) => String(r.userId?._id || r.userId || r) === String(userId),
      );
      percent = Math.min(100, Math.max(0, Number(record?.progressPercent || 0)));
    }
    return { percent, done: percent >= 70 };
  };

  return (
    <PlaylistPanel>
      <PlaylistHeader>
        <PlaylistTitle>
          <MobileBackBtn onClick={onClose}>
            <ArrowLeft size={20} />
          </MobileBackBtn>
          <ListVideo size={18} />
          {t("courseSidebar.lessons")}
        </PlaylistTitle>
        <PlaylistActions>
          <PlaylistCount>
            {t("coursePlayer.playlist.count", { count: course.lessons.length })}
          </PlaylistCount>
          <PlaylistToggle onClick={() => setPlaylistCollapsed(!playlistCollapsed)}>
            {playlistCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </PlaylistToggle>
        </PlaylistActions>
      </PlaylistHeader>

      <LessonList $collapsed={playlistCollapsed}>
        {course.lessons.length === 0 ? (
          <EmptyLessons>
            {t("coursePlayer.locked.noLessonsUser")}
          </EmptyLessons>
        ) : (
          course.lessons.map((lesson, index) => {
            const canOpen = canAccessLesson(index);
            const isActive = canOpen && activeLesson === index;
            const lessonProgress = canOpen ? getLessonProgress(lesson) : null;

            return (
              <LessonItem
                key={lesson._id}
                $active={isActive}
                $interactive={canOpen}
                onClick={() => canOpen && handleLessonClick(index)}
              >
                <LessonNumber $active={isActive} $done={lessonProgress?.done && !isActive}>
                  {isActive ? (
                    <Play size={12} fill="white" />
                  ) : lessonProgress?.done ? (
                    <CheckCircle size={14} />
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
                        <LessonTitleText>{lesson.title}</LessonTitleText>
                        {lesson.status === "draft" && (
                          <DraftBadge>{t("coursePlayer.playlist.draft")}</DraftBadge>
                        )}
                        {index === 0 && !canAccessLessons && (
                          <FreeBadge>{t("coursePlayer.playlist.free")}</FreeBadge>
                        )}
                      </LessonTitle>
                      {lessonProgress && (
                        <LessonProgressRow>
                          <LessonProgressBar>
                            <LessonProgressFill $percent={lessonProgress.percent} $done={lessonProgress.done} />
                          </LessonProgressBar>
                          <LessonProgressPercent $done={lessonProgress.done}>
                            {lessonProgress.percent}%
                          </LessonProgressPercent>
                        </LessonProgressRow>
                      )}
                    </>
                  ) : (
                    <LockedLessonTitle>
                      <Lock size={12} />
                      {index + 1}-dars
                    </LockedLessonTitle>
                  )}
                </LessonInfo>

              </LessonItem>
            );
          })
        )}
      </LessonList>
    </PlaylistPanel>
  );
};

export default CoursePlayerPlaylistPanel;
