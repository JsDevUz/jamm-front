import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import { useCourses } from "../../../contexts/CoursesContext";
import { APP_LIMITS } from "../../../constants/appLimits";
import Spinner from "../../../shared/ui/feedback/Spinner";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10040;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);

  @media (max-width: 640px) {
    padding: 12px;
  }
`;

const Dialog = styled.div`
  width: min(100%, 560px);
  max-width: 100%;
  max-height: min(90vh, 760px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);

  @media (max-width: 640px) {
    width: 100%;
    max-height: calc(100vh - 24px);
  }
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 14px;
  border-bottom: 1px solid var(--border-color);
`;

const HeaderText = styled.div`
  display: grid;
  gap: 4px;
`;

const DialogTitle = styled.h2`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
`;

const DialogSubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--text-muted-color);
`;

const DialogBody = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px 18px 18px;
  overflow-y: auto;
`;

const InputGroup = styled.div`
  display: grid;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Input = styled.input`
  width: 100%;
  min-width: 0;
  padding: 12px 13px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-width: 0;
  min-height: 110px;
  padding: 12px 13px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.45;
  font-family: inherit;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`;

const HelperText = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.45;
`;

const InfoCard = styled.div`
  display: grid;
  gap: 6px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
`;

const InfoTitle = styled.div`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
`;

const InfoText = styled.div`
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.5;
`;

const DialogFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 18px 18px;
  border-top: 1px solid var(--border-color);

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid
    ${(props) => (props.$primary ? "var(--primary-color)" : "var(--border-color)")};
  background: ${(props) => (props.$primary ? "var(--primary-color)" : "var(--input-color)")};
  color: ${(props) => (props.$primary ? "white" : "var(--text-color)")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.18s ease, transform 0.18s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

function buildMediaItemsFromLesson(lesson, title) {
  if (Array.isArray(lesson?.mediaItems) && lesson.mediaItems.length) {
    return lesson.mediaItems.map((item) => ({
      mediaId: item?.mediaId || item?._id || "",
      title: item?.title || title,
      videoUrl: item?.videoUrl || "",
      fileUrl: item?.fileUrl || "",
      fileName: item?.fileName || "",
      fileSize: Number(item?.fileSize || 0),
      durationSeconds: Number(item?.durationSeconds || 0),
      streamType: item?.streamType || "direct",
      streamAssets: Array.isArray(item?.streamAssets) ? item.streamAssets : [],
      hlsKeyAsset: item?.hlsKeyAsset || "",
    }));
  }

  if (lesson?.type === "file" && (lesson?.videoUrl || lesson?.fileUrl)) {
    return [
      {
        mediaId: lesson?._id || lesson?.id || "",
        title,
        videoUrl: lesson?.videoUrl || "",
        fileUrl: lesson?.fileUrl || "",
        fileName: lesson?.fileName || "",
        fileSize: Number(lesson?.fileSize || 0),
        durationSeconds: Number(lesson?.durationSeconds || 0),
        streamType: lesson?.streamType || "direct",
        streamAssets: Array.isArray(lesson?.streamAssets) ? lesson.streamAssets : [],
        hlsKeyAsset: lesson?.hlsKeyAsset || "",
      },
    ];
  }

  return [];
}

function buildLessonPayload({ lesson, title, description }) {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();
  const mediaItems = buildMediaItemsFromLesson(lesson, trimmedTitle);
  const primaryMedia = mediaItems[0] || null;

  return {
    title: trimmedTitle,
    description: trimmedDescription,
    type: lesson?.type || "file",
    videoUrl: primaryMedia?.videoUrl || lesson?.videoUrl || "",
    fileUrl: primaryMedia?.fileUrl || lesson?.fileUrl || "",
    fileName: primaryMedia?.fileName || lesson?.fileName || "",
    fileSize: primaryMedia?.fileSize || Number(lesson?.fileSize || 0),
    durationSeconds:
      primaryMedia?.durationSeconds || Number(lesson?.durationSeconds || 0),
    streamType: primaryMedia?.streamType || lesson?.streamType || "direct",
    streamAssets: primaryMedia?.streamAssets || lesson?.streamAssets || [],
    hlsKeyAsset: primaryMedia?.hlsKeyAsset || lesson?.hlsKeyAsset || "",
    mediaItems,
  };
}

const AddLessonDialog = ({
  isOpen,
  onClose,
  courseId,
  lesson = null,
  onSaved,
}) => {
  const { t } = useTranslation();
  const { addLesson, updateLesson } = useCourses();
  const isEditMode = Boolean(lesson);
  const lessonId = lesson?._id || lesson?.id || lesson?.urlSlug || null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (lesson) {
      setTitle(lesson.title || "");
      setDescription(lesson.description || "");
      return;
    }

    resetForm();
  }, [isOpen, lesson, resetForm]);

  const payload = useMemo(
    () =>
      buildLessonPayload({
        lesson,
        title,
        description,
      }),
    [description, lesson, title],
  );

  const handleSubmit = async () => {
    if (!payload.title || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (isEditMode && lessonId) {
        await updateLesson(courseId, lessonId, payload);
        onSaved?.({
          lessonId,
          status: lesson?.status || "draft",
          mode: "edit",
        });
      } else {
        const savedCourse = await addLesson(
          courseId,
          payload.title,
          payload.videoUrl,
          payload.description,
          payload.type,
          payload.fileUrl,
          payload.fileName,
          payload.fileSize,
          payload.streamType,
          payload.streamAssets,
          payload.hlsKeyAsset,
          "draft",
          payload.mediaItems || [],
        );
        const createdLesson = Array.isArray(savedCourse?.lessons)
          ? savedCourse.lessons[savedCourse.lessons.length - 1]
          : null;

        onSaved?.({
          lessonId:
            createdLesson?._id ||
            createdLesson?.id ||
            createdLesson?.urlSlug ||
            null,
          status: "draft",
          mode: "create",
        });
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(t("addLesson.submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(event) => event.stopPropagation()}>
        <DialogHeader>
          <HeaderText>
            <DialogTitle>
              {isEditMode ? t("addLesson.editTitle") : t("addLesson.title")}
            </DialogTitle>
            <DialogSubtitle>
              {isEditMode
                ? t("addLesson.editSubtitle")
                : t("addLesson.createSubtitle")}
            </DialogSubtitle>
          </HeaderText>
          <ButtonWrapper onClick={onClose}>
            <X size={18} />
          </ButtonWrapper>
        </DialogHeader>

        <DialogBody>
          <InfoCard>
            <InfoTitle>{t("addLesson.contentAfterCreateTitle")}</InfoTitle>
            <InfoText>{t("addLesson.contentAfterCreateText")}</InfoText>
          </InfoCard>

          <InputGroup>
            <Label>{t("addLesson.lessonName")}</Label>
            <Input
              type="text"
              value={title}
              autoFocus
              maxLength={APP_LIMITS.lessonTitleChars}
              placeholder={t("addLesson.lessonNamePlaceholder")}
              onChange={(event) =>
                setTitle(event.target.value.slice(0, APP_LIMITS.lessonTitleChars))
              }
            />
            <HelperText>
              {title.length}/{APP_LIMITS.lessonTitleChars}
            </HelperText>
          </InputGroup>

          <InputGroup>
            <Label>{t("addLesson.description")}</Label>
            <TextArea
              value={description}
              maxLength={APP_LIMITS.lessonDescriptionChars}
              placeholder={t("addLesson.descriptionPlaceholder")}
              onChange={(event) =>
                setDescription(
                  event.target.value.slice(0, APP_LIMITS.lessonDescriptionChars),
                )
              }
            />
            <HelperText>
              {description.length}/{APP_LIMITS.lessonDescriptionChars}
            </HelperText>
          </InputGroup>
        </DialogBody>

        <DialogFooter>
          <Button type="button" onClick={onClose} disabled={isSubmitting}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            $primary
            disabled={!payload.title || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <LoadingLabel>
                <Spinner size={15} />
                {t("addLesson.savingShort")}
              </LoadingLabel>
            ) : isEditMode ? (
              t("addLesson.saveChanges")
            ) : (
              t("addLesson.createDraft")
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </Overlay>
  );
};

export default AddLessonDialog;
