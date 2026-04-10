import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  FileVideo,
  Link as LinkIcon,
  Upload,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import { useCourses } from "../../../contexts/CoursesContext";
import useAuthStore from "../../../store/authStore";
import axiosInstance from "../../../api/axiosInstance";
import { APP_LIMITS, isPremiumUser } from "../../../constants/appLimits";
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
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);

  @media (max-width: 640px) {
    width: 100%;
    max-height: calc(100vh - 24px);
    border-radius: 18px;
  }
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 14px;
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 640px) {
    padding: 16px 16px 12px;
  }
`;

const HeaderText = styled.div`
  display: grid;
  gap: 4px;
`;

const DialogTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
`;

const DialogSubtitle = styled.p`
  font-size: 13px;
  line-height: 1.45;
  color: var(--text-muted-color);
`;

const DialogBody = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px 18px 18px;
  overflow-y: auto;

  @media (max-width: 640px) {
    gap: 12px;
    padding: 14px 16px 16px;
  }
`;

const InputGroup = styled.div`
  display: grid;
  gap: 6px;
  min-width: 0;
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
  padding: 10px 12px;
  border: 1px solid
    ${(props) =>
      props.$outlined
        ? "color-mix(in srgb, var(--border-color) 80%, var(--text-muted-color) 20%)"
        : "transparent"};
  border-radius: 10px;
  background: ${(props) =>
    props.$outlined ? "var(--secondary-color)" : "var(--input-color)"};
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
  min-height: 88px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 10px;
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

const Notice = styled.div`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--warning-color) 28%, transparent);
  background: color-mix(in srgb, var(--warning-color) 10%, transparent);
  color: var(--warning-color);
  font-size: 13px;
  line-height: 1.45;
`;

const ModeTabs = styled.div`
  display: flex;
  gap: 6px;
  padding: 4px;
  border-radius: 10px;
  background: var(--input-color);
`;

const ModeTab = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  padding: 9px 10px;
  border: none;
  border-radius: 8px;
  background: ${(props) =>
    props.$active ? "var(--primary-color)" : "transparent"};
  color: ${(props) =>
    props.$active ? "white" : "var(--text-secondary-color)"};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;

  &:hover {
    color: ${(props) => (props.$active ? "white" : "var(--text-color)")};
    background: ${(props) =>
      props.$active ? "var(--primary-color)" : "var(--hover-color)"};
  }
`;

const FileInputContainer = styled.div`
  display: grid;
  gap: 10px;
`;

const FileInputLabel = styled.label`
  display: grid;
  justify-items: center;
  gap: 6px;
  padding: 22px 16px;
  border-radius: 12px;
  border: 1px dashed var(--border-color);
  background: var(--input-color);
  color: var(--text-secondary-color);
  cursor: pointer;
  text-align: center;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
`;

const FileDetails = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);
`;

const FileText = styled.div`
  min-width: 0;
`;

const FileName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
`;

const FileMeta = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: var(--text-muted-color);
`;

const MediaNamesList = styled.div`
  display: grid;
  gap: 8px;
`;

const MediaNamesCard = styled.div`
  display: grid;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
`;

const MediaNamesHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MediaNamesIndex = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary-color);
`;

const RemoveFileButton = styled.button`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted-color);
  cursor: pointer;

  &:hover {
    color: var(--danger-color);
    background: color-mix(in srgb, var(--danger-color) 14%, transparent);
  }
`;

const UploadStatusCard = styled.div`
  display: grid;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
`;

const UploadStatusTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-color);
  font-size: 13px;
  font-weight: 600;
`;

const UploadStatusMeta = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in srgb, var(--border-color) 72%, transparent);
`;

const ProgressFill = styled.div`
  width: ${(props) => props.$width || "0%"};
  height: 100%;
  border-radius: inherit;
  background: var(--primary-color);
  transition: width 0.18s ease;
`;

const DialogFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 18px 18px;
  border-top: 1px solid var(--border-color);

  @media (max-width: 640px) {
    padding: 12px 16px 16px;
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

const Button = styled.button`
  min-width: 110px;
  padding: 10px 16px;
  border: 1px solid
    ${(props) => (props.$primary ? "var(--primary-color)" : "var(--border-color)")};
  border-radius: 10px;
  background: ${(props) => (props.$primary ? "var(--primary-color)" : "var(--input-color)")};
  color: ${(props) => (props.$primary ? "white" : "var(--text-color)")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.18s ease, transform 0.18s ease;

  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.92)};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-1px)")};
  }

  &:disabled {
    opacity: 0.56;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 640px) {
    width: ${(props) => (props.$grow ? "100%" : "auto")};
  }
`;

const LoadingLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const getLessonId = (lesson) => lesson?._id || lesson?.id || lesson?.urlSlug || "";

const AddLessonDialog = ({
  isOpen,
  onClose,
  courseId,
  lesson = null,
  onSaved,
}) => {
  const { t } = useTranslation();
  const { addLesson, updateLesson, publishLesson } = useCourses();
  const currentUser = useAuthStore((state) => state.user);
  const isPremium = isPremiumUser(currentUser);
  const lessonVideosLimit = isPremium
    ? APP_LIMITS.lessonVideosPerLesson.premium
    : APP_LIMITS.lessonVideosPerLesson.ordinary;
  const isEditMode = Boolean(lesson);
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadMethod, setUploadMethod] = useState("upload");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFiles, setVideoFiles] = useState([]);
  const [videoTitleDrafts, setVideoTitleDrafts] = useState([]);
  const [existingUploadRemoved, setExistingUploadRemoved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedBytes, setUploadedBytes] = useState(0);
  const [totalUploadBytes, setTotalUploadBytes] = useState(0);
  const [uploadPhase, setUploadPhase] = useState("idle");

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setVideoFiles([]);
    setVideoTitleDrafts([]);
    setExistingUploadRemoved(false);
    setUploadProgress(0);
    setUploadedBytes(0);
    setTotalUploadBytes(0);
    setUploadPhase("idle");
    setUploadMethod("upload");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (lesson) {
      setTitle(lesson.title || "");
      setDescription(lesson.description || "");
      setVideoUrl(lesson.type === "video" ? lesson.videoUrl || "" : "");
      setUploadMethod(lesson.type === "video" ? "url" : "upload");
      setExistingUploadRemoved(false);
      setVideoFiles([]);
      setVideoTitleDrafts(
        (
          Array.isArray(lesson.mediaItems) && lesson.mediaItems.length
            ? lesson.mediaItems
            : lesson.videoUrl || lesson.fileUrl
              ? [lesson]
              : []
        ).map(
          (item, index) =>
            item.title ||
            item.fileName?.replace(/\.[^.]+$/u, "") ||
            `${lesson.title || t("addLesson.lessonName")} ${index + 1}`,
        ),
      );
      setUploadProgress(0);
      setUploadedBytes(0);
      setTotalUploadBytes(0);
      setUploadPhase("idle");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    resetForm();
  }, [isOpen, lesson, resetForm, t]);

  const existingUploadInfo = useMemo(() => {
    if (!lesson || uploadMethod !== "upload" || existingUploadRemoved) return null;
    if (lesson.type !== "file") return null;
    const items =
      Array.isArray(lesson.mediaItems) && lesson.mediaItems.length
        ? lesson.mediaItems
        : lesson.videoUrl || lesson.fileUrl
          ? [
              {
                fileName: lesson.fileName || lesson.title,
                fileSize: lesson.fileSize || 0,
                videoUrl: lesson.videoUrl || "",
                fileUrl: lesson.fileUrl || "",
                streamType: lesson.streamType || "direct",
                streamAssets: Array.isArray(lesson.streamAssets)
                  ? lesson.streamAssets
                  : [],
                hlsKeyAsset: lesson.hlsKeyAsset || "",
              },
            ]
          : [];

    return items.map((item, index) => ({
      id: item.mediaId || item._id || `existing-${index}`,
      title: item.title || "",
      name: item.fileName || item.title || `${lesson.title} ${index + 1}`,
      size: item.fileSize || 0,
      durationSeconds: item.durationSeconds || 0,
      videoUrl: item.videoUrl || "",
      fileUrl: item.fileUrl || "",
      streamType: item.streamType || "direct",
      streamAssets: Array.isArray(item.streamAssets) ? item.streamAssets : [],
      hlsKeyAsset: item.hlsKeyAsset || "",
    }));
  }, [existingUploadRemoved, lesson, uploadMethod]);

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / 1024 ** index).toFixed(2))} ${units[index]}`;
  };

  const hasMediaInForm = useMemo(() => {
    if (uploadMethod === "url") {
      return Boolean(videoUrl.trim());
    }

    return Boolean(videoFiles.length || existingUploadInfo?.length);
  }, [existingUploadInfo, uploadMethod, videoFiles, videoUrl]);

  const totalSelectedUploadBytes = useMemo(
    () => videoFiles.reduce((sum, item) => sum + Number(item.size || 0), 0),
    [videoFiles],
  );

  const effectiveMediaTitleDrafts = useMemo(() => {
    if (videoFiles.length) {
      return videoFiles.map(
        (_, index) =>
          videoTitleDrafts[index] ||
          videoFiles[index]?.name?.replace(/\.[^.]+$/u, "") ||
          `${title.trim() || t("addLesson.lessonName")} ${index + 1}`,
      );
    }

    if (existingUploadInfo?.length) {
      return existingUploadInfo.map(
        (item, index) =>
          videoTitleDrafts[index] ||
          item.title ||
          item.name?.replace(/\.[^.]+$/u, "") ||
          `${title.trim() || t("addLesson.lessonName")} ${index + 1}`,
      );
    }

    return [];
  }, [existingUploadInfo, t, title, videoFiles, videoTitleDrafts]);

  const isDraftLesson = lesson?.status === "draft";
  const lessonId = getLessonId(lesson);

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const nextFiles = Array.from(event.target.files || []);
    if (!nextFiles.length) return;
    if (nextFiles.length > lessonVideosLimit) {
      toast.error(
        t("addLesson.videoCountLimitError", { count: lessonVideosLimit }),
      );
      event.target.value = "";
      return;
    }
    const totalBytes = nextFiles.reduce(
      (sum, file) => sum + Number(file.size || 0),
      0,
    );
    if (totalBytes > APP_LIMITS.lessonMediaBytes) {
      toast.error(t("addLesson.totalUploadLimitError"));
      event.target.value = "";
      return;
    }
    setVideoFiles(nextFiles);
    setVideoTitleDrafts(
      nextFiles.map(
        (file, index) =>
          file.name.replace(/\.[^.]+$/u, "") ||
          `${title.trim() || t("addLesson.lessonName")} ${index + 1}`,
      ),
    );
    setExistingUploadRemoved(false);
    setUploadProgress(0);
    setUploadedBytes(0);
    setTotalUploadBytes(totalBytes || 0);
    setUploadPhase("idle");
  };

  const handleRemoveSelectedMedia = () => {
    setVideoFiles([]);
    setVideoTitleDrafts([]);
    setVideoUrl("");
    if (uploadMethod === "upload") {
      setExistingUploadRemoved(true);
    }
    setUploadProgress(0);
    setUploadedBytes(0);
    setTotalUploadBytes(0);
    setUploadPhase("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const buildPayload = async () => {
    const basePayload = {
      title: title.trim(),
      description: description.trim(),
      type: "video",
      videoUrl: "",
      fileUrl: "",
      fileName: "",
        fileSize: 0,
        durationSeconds: 0,
        streamType: "direct",
      streamAssets: [],
      hlsKeyAsset: "",
      mediaItems: [],
    };

    if (uploadMethod === "url") {
      return {
        ...basePayload,
        type: "video",
        videoUrl: videoUrl.trim(),
      };
    }

    if (videoFiles.length) {
      const uploadedMediaItems = [];
      const totalBytes = videoFiles.reduce(
        (sum, item) => sum + Number(item.size || 0),
        0,
      );
      let uploadedSoFar = 0;

      for (let index = 0; index < videoFiles.length; index += 1) {
        const videoFile = videoFiles[index];
        const formData = new FormData();
        formData.append("file", videoFile);

        const { data } = await axiosInstance.post("/courses/upload-media", formData, {
          onUploadProgress: (event) => {
            const currentLoaded = event.loaded || 0;
            const percent = totalBytes
              ? Math.min(
                  100,
                  Math.round(((uploadedSoFar + currentLoaded) / totalBytes) * 100),
                )
              : 0;
            setUploadPhase(percent >= 100 ? "processing" : "uploading");
            setTotalUploadBytes(totalBytes);
            setUploadedBytes(Math.min(uploadedSoFar + currentLoaded, totalBytes));
            setUploadProgress(percent);
          },
        });

        uploadedSoFar += Number(videoFile.size || 0);
        uploadedMediaItems.push({
          title:
            effectiveMediaTitleDrafts[index] ||
            (videoFiles.length > 1
              ? `${title.trim() || t("addLesson.lessonName")} ${index + 1}`
              : title.trim()),
          videoUrl: data.manifestUrl || "",
          fileUrl: data.fileUrl || data.url || "",
          fileName: data.fileName || videoFile.name,
          fileSize: data.fileSize || videoFile.size || 0,
          durationSeconds: Number(data.durationSeconds || 0),
          streamType: data.streamType || "direct",
          streamAssets: Array.isArray(data.assetKeys) ? data.assetKeys : [],
          hlsKeyAsset: data.hlsKeyAsset || "",
        });
      }

      const primaryItem = uploadedMediaItems[0] || null;

      return {
        ...basePayload,
        type: "file",
        videoUrl: primaryItem?.videoUrl || "",
        fileUrl: primaryItem?.fileUrl || "",
        fileName: primaryItem?.fileName || "",
        fileSize: primaryItem?.fileSize || 0,
        streamType: primaryItem?.streamType || "direct",
        streamAssets: primaryItem?.streamAssets || [],
        hlsKeyAsset: primaryItem?.hlsKeyAsset || "",
        mediaItems: uploadedMediaItems,
      };
    }

    if (existingUploadInfo?.length && lesson) {
      const normalizedExistingItems = existingUploadInfo.map((item, index) => ({
        title:
          effectiveMediaTitleDrafts[index] ||
          `${title.trim() || lesson.title} ${existingUploadInfo.length > 1 ? index + 1 : ""}`.trim(),
        videoUrl: item.videoUrl || "",
        fileUrl: item.fileUrl || "",
        fileName: item.name || "",
        fileSize: item.size || 0,
        durationSeconds: item.durationSeconds || 0,
        streamType: item.streamType || "direct",
        streamAssets: item.streamAssets || [],
        hlsKeyAsset: item.hlsKeyAsset || "",
      }));
      return {
        ...basePayload,
        type: "file",
        videoUrl: normalizedExistingItems[0]?.videoUrl || "",
        fileUrl: normalizedExistingItems[0]?.fileUrl || "",
        fileName: normalizedExistingItems[0]?.fileName || "",
        fileSize: normalizedExistingItems[0]?.fileSize || 0,
        streamType: normalizedExistingItems[0]?.streamType || "direct",
        streamAssets: normalizedExistingItems[0]?.streamAssets || [],
        hlsKeyAsset: normalizedExistingItems[0]?.hlsKeyAsset || "",
        mediaItems: normalizedExistingItems,
      };
    }

    return {
      ...basePayload,
      type: "file",
      mediaItems: [],
    };
  };

  const handleSubmit = async ({ publish = false }) => {
    if (!title.trim() || isSubmitting) return;
    if (publish && !hasMediaInForm) return;

    setIsSubmitting(true);
    setUploadPhase(
      uploadMethod === "upload" && videoFiles.length ? "uploading" : "saving",
    );

    try {
      const payload = await buildPayload();
      let nextStatus = "draft";

      if (isEditMode) {
        setUploadPhase("saving");
        await updateLesson(courseId, lessonId, payload);
        if (publish) {
          await publishLesson(courseId, lessonId);
          nextStatus = "published";
        } else if (!payload.videoUrl && !payload.fileUrl) {
          nextStatus = "draft";
        } else {
          nextStatus = lesson?.status || "draft";
        }
      } else {
        setUploadPhase("saving");
        await addLesson(
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
          publish ? "published" : "draft",
          payload.mediaItems || [],
        );
        nextStatus = publish ? "published" : "draft";
      }

      onSaved?.({
        lessonId,
        status: nextStatus,
        mode: isEditMode ? "edit" : "create",
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(t("addLesson.uploadError"));
    } finally {
      setIsSubmitting(false);
      setUploadPhase("idle");
    }
  };

  const submitLabel = isEditMode
    ? isDraftLesson
      ? t("addLesson.saveDraft")
      : t("addLesson.saveChanges")
    : t("addLesson.createDraft");
  const publishLabel = isDraftLesson
    ? t("addLesson.publish")
    : t("addLesson.saveAndPublish");

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
          {isEditMode && isDraftLesson && (
            <Notice>{t("addLesson.draftNotice")}</Notice>
          )}

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
            <Label>{t("addLesson.source")}</Label>
            <ModeTabs>
              <ModeTab
                type="button"
                $active={uploadMethod === "upload"}
                onClick={() => {
                  setUploadMethod("upload");
                  setVideoUrl("");
                }}
              >
                <Upload style={{flexShrink:0}} size={14} />
                {t("addLesson.uploadTab")}
              </ModeTab>
              <ModeTab
                type="button"
                $active={uploadMethod === "url"}
                onClick={() => {
                  setUploadMethod("url");
                  setExistingUploadRemoved(true);
                  setVideoFiles([]);
                }}
              >
                <LinkIcon size={14} />
                {" "}
                {t("addLesson.youtubeTab")}
              </ModeTab>
            </ModeTabs>
            <HelperText>
              {t("addLesson.videoCountLimitHint", { count: lessonVideosLimit })}
            </HelperText>
          </InputGroup>

          {uploadMethod === "upload" ? (
            <InputGroup>
              <Label>{t("addLesson.fileLabel")}</Label>
              <FileInputContainer>
                {!videoFiles.length && !existingUploadInfo?.length ? (
                  <FileInputLabel>
                    <Upload size={22} />
                    <strong>{t("addLesson.fileDropTitle")}</strong>
                    <HelperText>{t("addLesson.fileDropMeta")}</HelperText>
                    <HelperText>
                      {t("addLesson.videoCountLimitHint", { count: lessonVideosLimit })}
                    </HelperText>
                    <HiddenFileInput
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      multiple={lessonVideosLimit > 1}
                      onChange={handleFileChange}
                    />
                  </FileInputLabel>
                ) : (
                  <FileInfo>
                    <FileDetails>
                      <FileVideo size={18} color="var(--primary-color)" />
                      <FileText>
                        <FileName>
                          {videoFiles.length
                            ? videoFiles.length === 1
                              ? videoFiles[0]?.name
                              : t("addLesson.multiFileCount", { count: videoFiles.length })
                            : existingUploadInfo?.length === 1
                              ? existingUploadInfo[0]?.name
                              : t("addLesson.multiFileCount", {
                                  count: existingUploadInfo?.length || 0,
                                })}
                        </FileName>
                        <FileMeta>
                          {formatFileSize(
                            totalSelectedUploadBytes ||
                              existingUploadInfo?.reduce(
                                (sum, item) => sum + Number(item.size || 0),
                                0,
                              ) ||
                              0,
                          )}
                        </FileMeta>
                      </FileText>
                    </FileDetails>
                    <RemoveFileButton
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleRemoveSelectedMedia}
                    >
                      <X size={16} />
                    </RemoveFileButton>
                  </FileInfo>
                )}

                {effectiveMediaTitleDrafts.length ? (
                  <MediaNamesList>
                    {effectiveMediaTitleDrafts.map((mediaTitle, index) => (
                      <MediaNamesCard key={`media-title-${index}`}>
                        <MediaNamesHead>
                          <MediaNamesIndex>
                            {t("addLesson.videoNameLabel", { index: index + 1 })}
                          </MediaNamesIndex>
                          <HelperText>
                            {videoFiles[index]?.name ||
                              existingUploadInfo?.[index]?.name ||
                              ""}
                          </HelperText>
                        </MediaNamesHead>
                        <Input
                          $outlined
                          type="text"
                          value={mediaTitle}
                          maxLength={APP_LIMITS.lessonTitleChars}
                          placeholder={t("addLesson.videoNamePlaceholder")}
                          onChange={(event) =>
                            setVideoTitleDrafts((prev) => {
                              const next = [...prev];
                              next[index] = event.target.value.slice(
                                0,
                                APP_LIMITS.lessonTitleChars,
                              );
                              return next;
                            })
                          }
                        />
                      </MediaNamesCard>
                    ))}
                  </MediaNamesList>
                ) : null}

                {isSubmitting && uploadMethod === "upload" && (
                  <UploadStatusCard>
                    <UploadStatusTop>
                      <span>
                        {uploadPhase === "processing"
                          ? t("addLesson.processing")
                          : uploadPhase === "saving"
                            ? t("addLesson.savingLesson")
                            : t("addLesson.uploading")}
                      </span>
                      <span>
                        {uploadPhase === "processing" || uploadPhase === "saving"
                          ? t("addLesson.preparing")
                          : `${uploadProgress}%`}
                      </span>
                    </UploadStatusTop>
                    <ProgressTrack>
                      <ProgressFill
                        $width={
                          uploadPhase === "processing" || uploadPhase === "saving"
                            ? "100%"
                            : `${uploadProgress}%`
                        }
                      />
                    </ProgressTrack>
                    <UploadStatusMeta>
                      {uploadPhase === "processing"
                        ? t("addLesson.processingMeta")
                        : uploadPhase === "saving"
                          ? t("addLesson.savingMeta")
                          : `${formatFileSize(uploadedBytes)} / ${formatFileSize(
                              totalUploadBytes || totalSelectedUploadBytes || 0,
                            )}`}
                    </UploadStatusMeta>
                  </UploadStatusCard>
                )}
              </FileInputContainer>
            </InputGroup>
          ) : (
            <InputGroup>
              <Label>{t("addLesson.youtubeLabel")}</Label>
              <Input
                type="url"
                value={videoUrl}
                placeholder="https://youtu.be/..."
                onChange={(event) => setVideoUrl(event.target.value)}
              />
              <HelperText>{t("addLesson.optionalMediaHint")}</HelperText>
            </InputGroup>
          )}

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
            disabled={!title.trim() || isSubmitting}
            onClick={() => handleSubmit({ publish: false })}
          >
            {isSubmitting && uploadPhase !== "idle" ? (
              <LoadingLabel>
                <Spinner size={15} />
                {uploadPhase === "processing"
                  ? t("addLesson.processingShort")
                  : uploadPhase === "saving"
                    ? t("addLesson.savingShort")
                    : `${uploadProgress}%`}
              </LoadingLabel>
            ) : (
              submitLabel
            )}
          </Button>
          <Button
            type="button"
            $primary
            $grow
            disabled={!title.trim() || !hasMediaInForm || isSubmitting}
            onClick={() => handleSubmit({ publish: true })}
          >
            {publishLabel}
          </Button>
        </DialogFooter>
      </Dialog>
    </Overlay>
  );
};

export default AddLessonDialog;
