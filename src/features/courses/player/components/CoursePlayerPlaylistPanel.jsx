import React from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  ListVideo,
  Lock,
  Pencil,
  Play,
  Plus,
  Trash2,
} from "lucide-react";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import toast from "react-hot-toast";
import { RESOLVED_APP_BASE_URL } from "../../../../config/env";
import {
  AddLessonBtn,
  CopyLessonBtn,
  DeleteLessonBtn,
  DraftBadge,
  EmptyLessons,
  EmptyLessonsHint,
  EditLessonBtn,
  FreeBadge,
  LessonTitleText,
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
  PublishLessonBtn,
} from "./CoursePlayerPlaylistPanel.styles";

const CoursePlayerPlaylistPanel = () => {
  const { t } = useTranslation();
  const {
    activeLesson,
    admin,
    canAccessLesson,
    canAccessLessons,
    course,
    formatViews,
    handleLessonClick,
    handlePublishLesson,
    onClose,
    openLessonCreator,
    openLessonEditor,
    playlistCollapsed,
    setLessonToDelete,
    setPlaylistCollapsed,
  } = useCoursePlayerContext();

  const handleCopyLessonLink = async (event, lesson) => {
    event.stopPropagation();

    try {
      const courseSlug = course?.urlSlug || course?._id || course?.id;
      const lessonSlug = lesson?.urlSlug || lesson?._id || lesson?.id;
      await navigator.clipboard.writeText(
        `${RESOLVED_APP_BASE_URL}/courses/${courseSlug}/${lessonSlug}`,
      );
      toast.success("Lesson havolasi nusxalandi");
    } catch {
      toast.error("Lesson havolasini nusxalab bo'lmadi");
    }
  };

  const handleCopyCourseLink = async () => {
    try {
      const courseSlug = course?.urlSlug || course?._id || course?.id;

      if (!courseSlug) {
        toast.error("Kurs havolasini nusxalab bo'lmadi");
        return;
      }

      await navigator.clipboard.writeText(
        `${RESOLVED_APP_BASE_URL}/courses/${courseSlug}`,
      );
      toast.success("Kurs havolasi nusxalandi");
    } catch {
      toast.error("Kurs havolasini nusxalab bo'lmadi");
    }
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
          <CopyLessonBtn
            onClick={handleCopyCourseLink}
            title="Kurs havolasini nusxalash"
          >
            <Copy size={14} />
          </CopyLessonBtn>
          {admin && (
            <AddLessonBtn
              onClick={openLessonCreator}
              title={t("addLesson.createDraft")}
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
                {t("coursePlayer.locked.noLessonsTitle")}
                <br />
                <EmptyLessonsHint>
                  {t("coursePlayer.locked.noLessonsAdmin")}
                </EmptyLessonsHint>
              </>
            ) : (
              t("coursePlayer.locked.noLessonsUser")
            )}
          </EmptyLessons>
        ) : (
          course.lessons.map((lesson, index) => {
            const canOpen = canAccessLesson(index);
            const isActive = canOpen && activeLesson === index;
            const hasLessonMedia = Boolean(
              (Array.isArray(lesson.mediaItems) && lesson.mediaItems.length) ||
                lesson.videoUrl ||
                lesson.fileUrl,
            );

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
                        <LessonTitleText>{lesson.title}</LessonTitleText>
                        {lesson.status === "draft" && (
                          <DraftBadge>{t("coursePlayer.playlist.draft")}</DraftBadge>
                        )}
                        {index === 0 && !canAccessLessons && (
                          <FreeBadge>{t("coursePlayer.playlist.free")}</FreeBadge>
                        )}
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

                <CopyLessonBtn
                  onClick={(event) => handleCopyLessonLink(event, lesson)}
                  title="Lesson havolasini nusxalash"
                >
                  <Copy size={14} />
                </CopyLessonBtn>

                {admin && (
                  <>
                    <EditLessonBtn
                      onClick={(event) => {
                        event.stopPropagation();
                        openLessonEditor(lesson);
                      }}
                      title={t("coursePlayer.playlist.edit")}
                    >
                      <Pencil size={14} />
                    </EditLessonBtn>
                    {lesson.status === "draft" && hasLessonMedia && (
                      <PublishLessonBtn
                        onClick={(event) => {
                          event.stopPropagation();
                          handlePublishLesson(lesson);
                        }}
                        title={t("addLesson.publish")}
                      >
                        <Check size={14} />
                      </PublishLessonBtn>
                    )}
                    <DeleteLessonBtn
                      onClick={(event) => {
                        event.stopPropagation();
                        setLessonToDelete(lesson._id);
                      }}
                      title={t("common.delete")}
                    >
                      <Trash2 size={14} />
                    </DeleteLessonBtn>
                  </>
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
