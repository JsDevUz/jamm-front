import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Eye,
  FileText,
  LayoutTemplate,
  Link,
  Plus,
  Sparkles,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react";
import styled from "styled-components";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axiosInstance";
import { APP_LIMITS } from "../../../constants/appLimits";
import { useCourses } from "../../../contexts/CoursesContext";
import useMeetCallStore from "../../../store/meetCallStore";
import useAuthStore from "../../../store/authStore";
import { saveMeet, removeMeet, getMeetById } from "../../../utils/meetStore";
import {
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../../shared/ui/dialogs/ModalShell";

const TABS = ["content", "materials", "homework", "tests"];
const HOMEWORK_TYPES = ["text", "audio", "video", "pdf", "photo"];
const LESSON_VIDEO_LIMIT = 3;
const LESSON_MATERIAL_LIMIT = 3;
const LESSON_HOMEWORK_LIMIT = 3;
const LESSON_TEST_LIMIT = 3;

const getMaterialRequestId = (item) =>
  String(item?.materialId || item?._id || item?.id || "");

const getMaterialRenderKey = (item, index = 0) =>
  getMaterialRequestId(item) ||
  String(item?.fileUrl || item?.fileName || `material-${index}`);

const WorkspaceShell = styled.div`
  --workspace-bg: var(--background-color);
  --workspace-surface: var(--secondary-color);
  --workspace-surface-alt: color-mix(in srgb, var(--secondary-color) 72%, var(--background-color));
  --workspace-border: var(--border-color);
  --workspace-text: var(--text-color);
  --workspace-muted: var(--text-secondary-color);
  --workspace-soft-text: var(--text-muted-color);
  --workspace-primary: var(--primary-color);
  --workspace-primary-soft: color-mix(in srgb, var(--primary-color) 10%, var(--secondary-color));
  --workspace-danger: var(--danger-color, #db3b22);
  --workspace-danger-soft: color-mix(in srgb, var(--danger-color, #db3b22) 12%, var(--secondary-color));
  min-height: 100%;
  height: 100%;
  background: var(--workspace-bg);
  display: grid;
  gap: 14px;
  padding: 16px;

  @media (max-width: 900px) {
    padding: 12px;
    gap: 10px;
  }
`;

const Hero = styled.section`
  border: 1px solid var(--workspace-border);
  border-radius: 16px;
  background: var(--workspace-surface);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 14px 16px;
  }
`;

const HeroMeta = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

const HeroDesc = styled.p`
  margin: 0;
  font-size: 13px;
  color: var(--workspace-muted);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 480px;
`;

const HeroTitle = styled.h2`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: var(--workspace-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const HeroButton = styled.button`
  height: 36px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.$primary ? "var(--workspace-primary)" : "var(--workspace-border)")};
  background: ${(props) => (props.$primary ? "var(--workspace-primary)" : "var(--workspace-surface)")};
  color: ${(props) => (props.$primary ? "#ffffff" : "var(--workspace-text)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;



const TabsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TabButton = styled.button`
  height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${(props) => (props.$active ? "var(--workspace-primary)" : "var(--workspace-border)")};
  background: ${(props) => (props.$active ? "var(--workspace-primary-soft)" : "var(--workspace-surface)")};
  color: ${(props) => (props.$active ? "var(--workspace-primary)" : "var(--workspace-muted)")};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.9fr);
  gap: 18px;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`;

const PanelCard = styled.section`
  border: 1px solid var(--workspace-border);
  border-radius: 14px;
  background: var(--workspace-surface);
  padding: 18px;
  display: grid;
  gap: 14px;

  @media (max-width: 900px) {
    padding: 14px;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;


const PanelActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TinyButton = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.$danger ? "var(--workspace-danger)" : "var(--workspace-border)")};
  background: ${(props) => (props.$danger ? "var(--workspace-danger-soft)" : "var(--workspace-surface-alt)")};
  color: ${(props) => (props.$danger ? "var(--workspace-danger)" : "var(--workspace-text)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 14px;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns || 2}, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 7px;
`;

const FieldLabel = styled.span`
  font-size: 12px;
  font-weight: 800;
  color: var(--workspace-soft-text);
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const FieldInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--workspace-border);
  background: var(--workspace-surface-alt);
  color: var(--workspace-text);
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: var(--workspace-primary);
    background: var(--workspace-surface);
  }
`;

const FieldTextarea = styled.textarea`
  width: 100%;
  min-width: 0;
  min-height: 96px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--workspace-border);
  background: var(--workspace-surface-alt);
  color: var(--workspace-text);
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: var(--workspace-primary);
    background: var(--workspace-surface);
  }
`;

const FieldSelect = styled.select`
  width: 100%;
  min-width: 0;
  height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--workspace-border);
  background: var(--workspace-surface-alt);
  color: var(--workspace-text);
  font-size: 14px;
  outline: none;
`;

const FileBox = styled.label`
  min-height: 90px;
  border: 1px dashed var(--workspace-border);
  border-radius: 12px;
  background: var(--workspace-surface-alt);
  display: grid;
  place-items: center;
  gap: 6px;
  text-align: center;
  padding: 14px;
  cursor: pointer;
  color: var(--workspace-muted);
  font-size: 13px;

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const HelperText = styled.div`
  font-size: 13px;
  color: var(--workspace-soft-text);
  line-height: 1.5;
`;

const ContentList = styled.div`
  display: grid;
  gap: 12px;
`;

const ContentCard = styled.div`
  border: 1px solid var(--workspace-border);
  border-radius: 10px;
  background: var(--workspace-surface-alt);
  padding: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const ContentMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 6px;
`;

const ContentTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--workspace-text);
  line-height: 1.3;
`;

const ContentSub = styled.div`
  font-size: 13px;
  color: var(--workspace-muted);
  line-height: 1.6;
  word-break: break-word;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${(props) => props.$accent || "var(--workspace-surface-alt)"};
  color: ${(props) => props.$color || "var(--workspace-muted)"};
  font-size: 12px;
  font-weight: 800;
`;

const EmptyState = styled.div`
  border: 1px dashed var(--workspace-border);
  border-radius: 12px;
  padding: 18px;
  background: var(--workspace-surface-alt);
  text-align: center;
  display: grid;
  gap: 6px;
`;

const EmptyTitle = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: var(--workspace-text);
`;

const EmptyText = styled.div`
  font-size: 14px;
  color: var(--workspace-muted);
  line-height: 1.6;
`;

const PdfLibraryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
`;

const PdfLibraryCard = styled.div`
  min-height: 168px;
  border-radius: 18px;
  border: 1px solid var(--workspace-border);
  background: linear-gradient(
    180deg,
    var(--workspace-surface) 0%,
    var(--workspace-surface-alt) 100%
  );
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
`;

const PdfPreviewBadge = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--workspace-primary-soft);
  color: var(--workspace-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const PdfLibraryTitle = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: var(--workspace-text);
  line-height: 1.4;
  word-break: break-word;
`;

const PdfLibraryMeta = styled.div`
  display: grid;
  gap: 6px;
  font-size: 12px;
  color: var(--workspace-muted);
`;

const AsideCard = styled.div`
  border: 1px solid var(--workspace-border);
  border-radius: 14px;
  background: var(--workspace-surface);
  padding: 16px;
  display: grid;
  gap: 10px;
`;

const AsideTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--workspace-text);
`;

const AsideText = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: var(--workspace-muted);
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--workspace-primary);
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
`;

const normalizeLessonMediaItems = (lesson) => {
  if (Array.isArray(lesson?.mediaItems) && lesson.mediaItems.length) {
    return lesson.mediaItems.map((item, index) => ({
      mediaId: item?.mediaId || item?._id || `media-${index}`,
      title: item?.title || lesson?.title || `Video ${index + 1}`,
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

  if (lesson?.videoUrl || lesson?.fileUrl) {
    return [
      {
        mediaId: "primary",
        title: lesson?.title || "Video",
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
};

const formatFileSize = (bytes) => {
  if (!bytes) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** index).toFixed(2))} ${units[index]}`;
};

export default function TeacherLessonContentWorkspace({
  courseId,
  courseTitle,
  lesson,
}) {
  const { t } = useTranslation();
  const {
    getLessonMaterials,
    getCourseMaterialLibrary,
    upsertLessonMaterial,
    deleteLessonMaterial,
    getLessonHomework,
    upsertLessonHomework,
    deleteLessonHomework,
    getLessonLinkedTests,
    upsertLessonLinkedTest,
    deleteLessonLinkedTest,
    updateLesson,
    publishLesson,
  } = useCourses();

  const lessonId = lesson?._id || lesson?.id || lesson?.urlSlug;
  const lessonMediaItems = useMemo(() => normalizeLessonMediaItems(lesson), [lesson]);
  const videoLimit = LESSON_VIDEO_LIMIT;

  const [activeTab, setActiveTab] = useState("media");
  const [materials, setMaterials] = useState([]);
  const [homeworkData, setHomeworkData] = useState({ assignments: [] });
  const [linkedTests, setLinkedTests] = useState([]);
  const [loadingBlocks, setLoadingBlocks] = useState(true);

  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isSavingVideo, setIsSavingVideo] = useState(false);
  const [notionUrl, setNotionUrl] = useState(lesson?.notionUrl || "");
  const [savedNotionUrl, setSavedNotionUrl] = useState(lesson?.notionUrl || "");
  const [isSavingNotion, setIsSavingNotion] = useState(false);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialFile, setMaterialFile] = useState(null);
  const [isSavingMaterial, setIsSavingMaterial] = useState(false);
  const [deletingVideoIndex, setDeletingVideoIndex] = useState(null);
  const [deletingMaterialId, setDeletingMaterialId] = useState("");
  const [isPdfLibraryOpen, setIsPdfLibraryOpen] = useState(false);
  const [pdfLibraryItems, setPdfLibraryItems] = useState([]);
  const [isPdfLibraryLoading, setIsPdfLibraryLoading] = useState(false);
  const [isLinkingLibraryMaterial, setIsLinkingLibraryMaterial] = useState(false);
  const [linkingLibraryMaterialKey, setLinkingLibraryMaterialKey] = useState("");

  const [editingHomeworkId, setEditingHomeworkId] = useState(null);
  const [homeworkTitle, setHomeworkTitle] = useState("");
  const [homeworkDescription, setHomeworkDescription] = useState("");
  const [homeworkType, setHomeworkType] = useState("text");
  const [homeworkDeadline, setHomeworkDeadline] = useState("");
  const [homeworkMaxScore, setHomeworkMaxScore] = useState(100);
  const [isSavingHomework, setIsSavingHomework] = useState(false);
  const [deletingHomeworkId, setDeletingHomeworkId] = useState(null);

  const [editingTestId, setEditingTestId] = useState(null);
  const [testUrl, setTestUrl] = useState("");
  const [testMinScore, setTestMinScore] = useState(0);
  const [isSavingTest, setIsSavingTest] = useState(false);
  const [deletingTestId, setDeletingTestId] = useState(null);
  const [lessonStatus, setLessonStatus] = useState(lesson?.status || "draft");
  const [isPublishingLesson, setIsPublishingLesson] = useState(false);
  const [isStartingLessonMeet, setIsStartingLessonMeet] = useState(false);

  const currentUser = useAuthStore((state) => state.user);
  const startCall = useMeetCallStore((state) => state.startCall);

  const lessonMeetRoomId = useMemo(() => {
    if (!courseId || !lessonId) return "";
    // Stable per-lesson roomId so re-opens reuse the same room.
    const safeCourse = String(courseId).slice(-12);
    const safeLesson = String(lessonId).replace(/[^a-zA-Z0-9_-]/g, "").slice(-12);
    return `lesson-${safeCourse}-${safeLesson}`.slice(0, 64);
  }, [courseId, lessonId]);

  const handleStartLessonMeet = useCallback(async () => {
    if (!currentUser?._id || !courseId || !lessonId || !lessonMeetRoomId) return;
    setIsStartingLessonMeet(true);
    try {
      // Reuse existing room if it's already bound to this lesson; otherwise create.
      const existing = await getMeetById(lessonMeetRoomId);
      if (!existing) {
        try {
          await saveMeet({
            roomId: lessonMeetRoomId,
            title: lesson?.title || courseTitle || "Dars",
            isPrivate: false,
            isCreator: true,
            courseId,
            lessonId: String(lessonId),
          });
        } catch (err) {
          // 403 → user already has another active meet; advise them.
          if (err?.response?.status === 403) {
            toast.error(
              t("teacher.lessonWorkspace.meetAlreadyActive", {
                defaultValue: "Sizda boshqa faol meet bor. Avval uni yoping.",
              }),
            );
            return;
          }
          throw err;
        }
      }
      startCall({
        roomId: lessonMeetRoomId,
        chatTitle: lesson?.title || courseTitle || "Dars",
        displayName: currentUser?.nickname || currentUser?.username || "Teacher",
        isCreator: true,
        isPrivate: false,
        initialMicOn: true,
        initialCamOn: true,
        roomCreatorId: String(currentUser?._id || ""),
        returnPath:
          typeof window !== "undefined" ? window.location.pathname : "/teacher",
      });
    } catch (err) {
      console.error("Failed to start lesson meet", err);
      toast.error(
        t("teacher.lessonWorkspace.meetStartFailed", {
          defaultValue: "Meetni boshlab bo'lmadi",
        }),
      );
    } finally {
      setIsStartingLessonMeet(false);
    }
  }, [
    courseId,
    courseTitle,
    currentUser,
    lesson?.title,
    lessonId,
    lessonMeetRoomId,
    startCall,
    t,
  ]);

  const videoInputRef = useRef(null);
  const materialInputRef = useRef(null);

  const homeworkAssignments = homeworkData?.assignments || [];
  const homeworkCount = homeworkAssignments.length;
  const materialsCount = materials.length;
  const testsCount = linkedTests.length;
  const effectiveNotionUrl = savedNotionUrl?.trim() || "";
  const effectiveLessonStatus = lessonStatus || "draft";
  const hasPublishedMedia = lessonMediaItems.length > 0 || !!effectiveNotionUrl;

  const refreshContent = useCallback(async () => {
    if (!courseId || !lessonId) return;

    try {
      setLoadingBlocks(true);
      const [materialsRes, homeworkRes, testsRes] = await Promise.all([
        getLessonMaterials(courseId, lessonId),
        getLessonHomework(courseId, lessonId),
        getLessonLinkedTests(courseId, lessonId),
      ]);

      setMaterials(Array.isArray(materialsRes?.items) ? materialsRes.items : []);
      setHomeworkData(homeworkRes || { assignments: [] });
      setLinkedTests(Array.isArray(testsRes?.items) ? testsRes.items : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBlocks(false);
    }
  }, [
    courseId,
    getLessonHomework,
    getLessonLinkedTests,
    getLessonMaterials,
    lessonId,
  ]);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  useEffect(() => {
    setActiveTab("content");
    setVideoTitle(lesson?.title || "");
    setVideoFile(null);
    setNotionUrl(lesson?.notionUrl || "");
    setSavedNotionUrl(lesson?.notionUrl || "");
    setMaterialTitle("");
    setMaterialFile(null);
    setIsPdfLibraryOpen(false);
    setPdfLibraryItems([]);
    setEditingHomeworkId(null);
    setHomeworkTitle("");
    setHomeworkDescription("");
    setHomeworkType("text");
    setHomeworkDeadline("");
    setHomeworkMaxScore(100);
    setEditingTestId(null);
    setTestUrl("");
    setTestMinScore(0);
    setLessonStatus(lesson?.status || "draft");
  }, [lessonId, lesson?.title, lesson?.notionUrl, lesson?.status]);

  const uploadFile = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axiosInstance.post("/courses/upload-media", formData);
    return data;
  }, []);

  const handleSaveVideo = useCallback(async () => {
    if (!courseId || !lessonId || !videoFile) return;

    if (lessonMediaItems.length >= videoLimit) {
      toast.error(
        t("teacher.lessonWorkspace.videoLimit", {
          defaultValue: `Bu darsga maksimal ${videoLimit} ta video qo'shish mumkin`,
        }),
      );
      return;
    }

    const totalBytes =
      lessonMediaItems.reduce((sum, item) => sum + Number(item.fileSize || 0), 0) +
      Number(videoFile.size || 0);

    if (totalBytes > APP_LIMITS.lessonMediaBytes) {
      toast.error(
        t("teacher.lessonWorkspace.mediaLimit", {
          defaultValue: "Dars media hajmi limitidan oshib ketdi",
        }),
      );
      return;
    }

    try {
      setIsSavingVideo(true);
      const uploaded = await uploadFile(videoFile);
      const uploadedUrl =
        uploaded?.fileUrl || uploaded?.manifestUrl || uploaded?.url || "";

      await updateLesson(courseId, lessonId, {
        mediaItems: [
          ...lessonMediaItems.map((item) => ({
            mediaId: item.mediaId,
            title: item.title,
            videoUrl: item.videoUrl,
            fileUrl: item.fileUrl,
            fileName: item.fileName,
            fileSize: item.fileSize,
            durationSeconds: item.durationSeconds,
            streamType: item.streamType,
            streamAssets: item.streamAssets,
            hlsKeyAsset: item.hlsKeyAsset,
          })),
          {
            title: videoTitle.trim() || videoFile.name.replace(/\.[^.]+$/, ""),
            videoUrl: uploadedUrl,
            fileUrl: uploadedUrl,
            fileName: uploaded?.fileName || videoFile.name,
            fileSize: uploaded?.fileSize || videoFile.size || 0,
            durationSeconds: Number(uploaded?.durationSeconds || 0),
            streamType: uploaded?.streamType || "direct",
            streamAssets: Array.isArray(uploaded?.assetKeys) ? uploaded.assetKeys : [],
            hlsKeyAsset: uploaded?.hlsKeyAsset || "",
          },
        ],
      });

      setVideoFile(null);
      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
      toast.success(
        t("teacher.lessonWorkspace.videoSaved", {
          defaultValue: "Video saqlandi",
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          t("teacher.lessonWorkspace.videoSaveError", {
            defaultValue: "Videoni saqlab bo'lmadi",
          }),
      );
    } finally {
      setIsSavingVideo(false);
    }
  }, [
    courseId,
    lessonId,
    lessonMediaItems,
    t,
    updateLesson,
    uploadFile,
    videoFile,
    videoLimit,
    videoTitle,
  ]);

  const handleSaveNotion = useCallback(async () => {
    if (!courseId || !lessonId) return;
    const trimmed = notionUrl.trim();
    if (!trimmed) return;

    try {
      setIsSavingNotion(true);
      await updateLesson(courseId, lessonId, { notionUrl: trimmed });
      setSavedNotionUrl(trimmed);
      toast.success(
        t("teacher.lessonWorkspace.notionSaved", {
          defaultValue: "Notion havola saqlandi",
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          t("teacher.lessonWorkspace.notionSaveError", {
            defaultValue: "Notion havolani saqlab bo'lmadi",
          }),
      );
    } finally {
      setIsSavingNotion(false);
    }
  }, [courseId, lessonId, notionUrl, t, updateLesson]);

  const handleDeleteVideo = useCallback(
    async (mediaIndex) => {
      if (mediaIndex === null || mediaIndex === undefined) return;

      try {
        setDeletingVideoIndex(mediaIndex);
        await updateLesson(courseId, lessonId, {
          mediaItems: lessonMediaItems
            .filter((_, index) => index !== mediaIndex)
            .map((item) => ({
              mediaId: item.mediaId,
              title: item.title,
              videoUrl: item.videoUrl,
              fileUrl: item.fileUrl,
              fileName: item.fileName,
              fileSize: item.fileSize,
              durationSeconds: item.durationSeconds,
              streamType: item.streamType,
              streamAssets: item.streamAssets,
              hlsKeyAsset: item.hlsKeyAsset,
            })),
        });
        toast.success(
          t("teacher.lessonWorkspace.videoDeleted", {
            defaultValue: "Video o'chirildi",
            }),
        );
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
            t("teacher.lessonWorkspace.videoDeleteError", {
              defaultValue: "Videoni o'chirib bo'lmadi",
            }),
        );
      } finally {
        setDeletingVideoIndex(null);
      }
    },
    [courseId, lessonId, lessonMediaItems, t, updateLesson],
  );

  const handleSaveMaterial = useCallback(async () => {
    if (!courseId || !lessonId || !materialFile) return;

    if (materialsCount >= LESSON_MATERIAL_LIMIT) {
      toast.error(
        t("teacher.lessonWorkspace.materialLimit", {
          count: LESSON_MATERIAL_LIMIT,
          defaultValue: `Bu darsga maksimal ${LESSON_MATERIAL_LIMIT} ta PDF yuklash mumkin`,
        }),
      );
      return;
    }

    const fileName = String(materialFile.name || "").toLowerCase();
    if (!fileName.endsWith(".pdf")) {
      toast.error(
        t("teacher.lessonWorkspace.materialPdfOnly", {
          defaultValue: "Bu yerga faqat PDF fayl yuklanadi",
        }),
      );
      return;
    }

    try {
      setIsSavingMaterial(true);
      const uploaded = await uploadFile(materialFile);
      await upsertLessonMaterial(courseId, lessonId, {
        title: materialTitle.trim() || materialFile.name.replace(/\.pdf$/i, ""),
        fileUrl: uploaded?.fileUrl || uploaded?.manifestUrl || uploaded?.url || "",
        fileName: uploaded?.fileName || materialFile.name,
        fileSize: uploaded?.fileSize || materialFile.size || 0,
      });
      setMaterialTitle("");
      setMaterialFile(null);
      if (materialInputRef.current) {
        materialInputRef.current.value = "";
      }
      await refreshContent();
      toast.success(
        t("teacher.lessonWorkspace.materialSaved", {
          defaultValue: "Material saqlandi",
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          t("teacher.lessonWorkspace.materialSaveError", {
            defaultValue: "Materialni saqlab bo'lmadi",
          }),
      );
    } finally {
      setIsSavingMaterial(false);
    }
  }, [
    courseId,
    lessonId,
    materialFile,
    materialTitle,
    materialsCount,
    refreshContent,
    t,
    uploadFile,
    upsertLessonMaterial,
  ]);

  const openPdfLibrary = useCallback(async () => {
    if (!courseId || isPdfLibraryLoading) return;

    try {
      setIsPdfLibraryOpen(true);
      setIsPdfLibraryLoading(true);
      const data = await getCourseMaterialLibrary(courseId);
      setPdfLibraryItems(Array.isArray(data?.items) ? data.items : []);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          t("teacher.lessonWorkspace.materialLibraryLoadError", {
            defaultValue: "PDF kutubxonani yuklab bo'lmadi",
          }),
      );
      setIsPdfLibraryOpen(false);
    } finally {
      setIsPdfLibraryLoading(false);
    }
  }, [courseId, getCourseMaterialLibrary, isPdfLibraryLoading, t]);

  const handleSelectLibraryMaterial = useCallback(
    async (item) => {
      if (!courseId || !lessonId || !item?.fileUrl) return;

      if (materialsCount >= LESSON_MATERIAL_LIMIT) {
        toast.error(
          t("teacher.lessonWorkspace.materialLimit", {
            count: LESSON_MATERIAL_LIMIT,
            defaultValue: `Bu darsga maksimal ${LESSON_MATERIAL_LIMIT} ta PDF yuklash mumkin`,
          }),
        );
        return;
      }

      const alreadyLinked = materials.some(
        (material) => String(material?.fileUrl || "") === String(item?.fileUrl || ""),
      );
      if (alreadyLinked) {
        toast(
          t("teacher.lessonWorkspace.materialAlreadyLinked", {
            defaultValue: "Bu PDF allaqachon shu darsga biriktirilgan",
          }),
        );
        return;
      }

      const libraryMaterialKey = getMaterialRenderKey(item);

      try {
        setIsLinkingLibraryMaterial(true);
        setLinkingLibraryMaterialKey(libraryMaterialKey);
        await upsertLessonMaterial(courseId, lessonId, {
          title:
            materialTitle.trim() ||
            item.title ||
            String(item.fileName || "").replace(/\.pdf$/i, ""),
          fileUrl: item.fileUrl,
          fileName: item.fileName || "",
          fileSize: Number(item.fileSize || 0),
        });
        await refreshContent();
        setMaterialTitle("");
        setMaterialFile(null);
        if (materialInputRef.current) {
          materialInputRef.current.value = "";
        }
        setIsPdfLibraryOpen(false);
        toast.success(
          t("teacher.lessonWorkspace.materialLinked", {
            defaultValue: "PDF kutubxonadan biriktirildi",
          }),
        );
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
            t("teacher.lessonWorkspace.materialSaveError", {
              defaultValue: "Materialni saqlab bo'lmadi",
            }),
        );
      } finally {
        setIsLinkingLibraryMaterial(false);
        setLinkingLibraryMaterialKey("");
      }
    },
    [
      courseId,
      lessonId,
      materialTitle,
      materials,
      materialsCount,
      refreshContent,
      t,
      upsertLessonMaterial,
    ],
  );

  const handleDeleteMaterial = useCallback(
    async (materialId) => {
      if (!materialId) {
        toast.error(
          t("teacher.lessonWorkspace.materialDeleteError", {
            defaultValue: "Material ID topilmadi. Sahifani yangilab qayta urinib ko'ring",
          }),
        );
        return;
      }

      try {
        setDeletingMaterialId(String(materialId));
        await deleteLessonMaterial(courseId, lessonId, materialId);
        await refreshContent();
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
            t("teacher.lessonWorkspace.materialDeleteError", {
              defaultValue: "Materialni o'chirib bo'lmadi",
            }),
        );
      } finally {
        setDeletingMaterialId("");
      }
    },
    [courseId, deleteLessonMaterial, lessonId, refreshContent, t],
  );

  const selectHomework = useCallback((assignment) => {
    if (!assignment) {
      setEditingHomeworkId(null);
      setHomeworkTitle("");
      setHomeworkDescription("");
      setHomeworkType("text");
      setHomeworkDeadline("");
      setHomeworkMaxScore(100);
      return;
    }

    setEditingHomeworkId(assignment.assignmentId || null);
    setHomeworkTitle(assignment.title || "");
    setHomeworkDescription(assignment.description || "");
    setHomeworkType(assignment.type || "text");
    setHomeworkDeadline(
      assignment.deadline ? String(assignment.deadline).slice(0, 16) : "",
    );
    setHomeworkMaxScore(Number(assignment.maxScore || 100));
  }, []);

  const handleSaveHomework = useCallback(async () => {
    if (!courseId || !lessonId || !homeworkTitle.trim()) return;

    if (!editingHomeworkId && homeworkCount >= LESSON_HOMEWORK_LIMIT) {
      toast.error(
        t("teacher.lessonWorkspace.homeworkLimit", {
          count: LESSON_HOMEWORK_LIMIT,
          defaultValue: `Bu darsga maksimal ${LESSON_HOMEWORK_LIMIT} ta uyga vazifa qo'shish mumkin`,
        }),
      );
      return;
    }

    try {
      setIsSavingHomework(true);
      const result = await upsertLessonHomework(courseId, lessonId, {
        assignmentId: editingHomeworkId || undefined,
        enabled: true,
        title: homeworkTitle.trim(),
        description: homeworkDescription.trim(),
        type: homeworkType,
        deadline: homeworkDeadline || null,
        maxScore: Number(homeworkMaxScore || 100),
      });

      setHomeworkData(result || { assignments: [] });
      const nextAssignments = result?.assignments || [];
      const target =
        nextAssignments.find(
          (assignment) => assignment.assignmentId === editingHomeworkId,
        ) || nextAssignments[nextAssignments.length - 1] || null;
      selectHomework(target);
      toast.success(
        t("teacher.lessonWorkspace.homeworkSaved", {
          defaultValue: "Uyga vazifa saqlandi",
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          t("teacher.lessonWorkspace.homeworkSaveError", {
            defaultValue: "Uyga vazifani saqlab bo'lmadi",
          }),
      );
    } finally {
      setIsSavingHomework(false);
    }
  }, [
    courseId,
    editingHomeworkId,
    homeworkCount,
    homeworkDeadline,
    homeworkDescription,
    homeworkMaxScore,
    homeworkTitle,
    homeworkType,
    lessonId,
    selectHomework,
    t,
    upsertLessonHomework,
  ]);

  const handleDeleteHomework = useCallback(
    async (assignmentId) => {
      if (!assignmentId) return;
      try {
        setDeletingHomeworkId(assignmentId);
        const result = await deleteLessonHomework(courseId, lessonId, assignmentId);
        setHomeworkData(result || { assignments: [] });
        selectHomework(result?.assignments?.[0] || null);
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
            t("teacher.lessonWorkspace.homeworkDeleteError", {
              defaultValue: "Uyga vazifani o'chirib bo'lmadi",
            }),
        );
      } finally {
        setDeletingHomeworkId(null);
      }
    },
    [courseId, deleteLessonHomework, lessonId, selectHomework, t],
  );

  const selectLinkedTest = useCallback((item) => {
    if (!item) {
      setEditingTestId(null);
      setTestUrl("");
      setTestMinScore(0);
      return;
    }

    setEditingTestId(item.linkedTestId || null);
    setTestUrl(item.url || "");
    setTestMinScore(Number(item.minimumScore || 0));
  }, []);

  const handleSaveTest = useCallback(async () => {
    if (!courseId || !lessonId || !testUrl.trim()) return;

    if (!editingTestId && testsCount >= LESSON_TEST_LIMIT) {
      toast.error(
        t("teacher.lessonWorkspace.testLimit", {
          count: LESSON_TEST_LIMIT,
          defaultValue: `Bu darsga maksimal ${LESSON_TEST_LIMIT} ta test biriktirish mumkin`,
        }),
      );
      return;
    }

    try {
      setIsSavingTest(true);
      const result = await upsertLessonLinkedTest(courseId, lessonId, {
        linkedTestId: editingTestId || undefined,
        url: testUrl.trim(),
        minimumScore: Math.max(0, Number(testMinScore || 0)),
        requiredToUnlock: true,
      });
      const nextItems = Array.isArray(result?.items) ? result.items : [];
      setLinkedTests(nextItems);
      const target =
        nextItems.find((item) => item.linkedTestId === editingTestId) ||
        nextItems[nextItems.length - 1] ||
        null;
      selectLinkedTest(target);
      toast.success(
        t("teacher.lessonWorkspace.testSaved", {
          defaultValue: "Test ulandi",
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          t("teacher.lessonWorkspace.testSaveError", {
            defaultValue: "Testni ulab bo'lmadi",
          }),
      );
    } finally {
      setIsSavingTest(false);
    }
  }, [
    courseId,
    editingTestId,
    lessonId,
    selectLinkedTest,
    t,
    testsCount,
    testMinScore,
    testUrl,
    upsertLessonLinkedTest,
  ]);

  const handleDeleteTest = useCallback(
    async (linkedTestId) => {
      if (!linkedTestId) return;
      try {
        setDeletingTestId(linkedTestId);
        const result = await deleteLessonLinkedTest(courseId, lessonId, linkedTestId);
        const nextItems = Array.isArray(result?.items) ? result.items : [];
        setLinkedTests(nextItems);
        selectLinkedTest(nextItems[0] || null);
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
            t("teacher.lessonWorkspace.testDeleteError", {
              defaultValue: "Testni olib tashlab bo'lmadi",
            }),
        );
      } finally {
        setDeletingTestId(null);
      }
    },
    [courseId, deleteLessonLinkedTest, lessonId, selectLinkedTest, t],
  );

  const handlePickNewPdf = useCallback(() => {
    materialInputRef.current?.click();
  }, []);

  const handlePublish = useCallback(async () => {
    if (!courseId || !lessonId) return;

    try {
      setIsPublishingLesson(true);
      await publishLesson(courseId, lessonId);
      setLessonStatus("published");
      toast.success(
        t("teacher.lessonWorkspace.lessonPublished", {
          defaultValue: "Dars e'lon qilindi",
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          t("teacher.lessonWorkspace.publishError", {
            defaultValue: "Darsni e'lon qilib bo'lmadi",
          }),
      );
    } finally {
      setIsPublishingLesson(false);
    }
  }, [courseId, lessonId, publishLesson, t]);

const renderContent = () => (
    <PanelGrid>
      {/* ---- VIDEO SECTION ---- */}
      <PanelCard>
        <AsideTitle style={{ marginBottom: 12 }}>
          <Video size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
          {t("teacher.lessonWorkspace.videoSection", { defaultValue: "Video" })}
        </AsideTitle>
        <FormGrid>
          <Field>
            <FieldLabel>
              {t("teacher.lessonWorkspace.videoTitleField", {
                defaultValue: "Video nomi",
              })}
            </FieldLabel>
            <FieldInput
              value={videoTitle}
              onChange={(event) => setVideoTitle(event.target.value)}
              placeholder={t("teacher.lessonWorkspace.videoTitlePlaceholder", {
                defaultValue: "Masalan: 1-dars asosiy video",
              })}
            />
          </Field>

          <Field>
            <FieldLabel>
              {t("teacher.lessonWorkspace.videoUploadField", {
                defaultValue: "Video yuklash",
              })}
            </FieldLabel>
            <FileBox>
              <Video size={24} />
              <div>
                {videoFile
                  ? `${videoFile.name} • ${formatFileSize(videoFile.size)}`
                  : t("teacher.lessonWorkspace.videoDropHint", {
                      defaultValue: "MP4, MOV, WEBM yoki boshqa video fayl tanlang",
                    })}
              </div>
              <HelperText>
                {t("teacher.lessonWorkspace.videoLimitNote", {
                  defaultValue: `Limit: ${LESSON_VIDEO_LIMIT} video, umumiy ${Math.round(
                    APP_LIMITS.lessonMediaBytes / (1024 * 1024),
                  )}MB`,
                })}
              </HelperText>
              <HiddenFileInput
                ref={videoInputRef}
                type="file"
                accept="video/*,.mp4,.mov,.webm,.mkv,.m4v"
                onChange={(event) => setVideoFile(event.target.files?.[0] || null)}
              />
            </FileBox>
          </Field>
        </FormGrid>

        <PanelActions>
          <HeroButton
            type="button"
            $primary
            disabled={!videoFile || isSavingVideo}
            onClick={handleSaveVideo}
          >
            <Upload size={16} />
            {isSavingVideo
              ? t("teacher.lessonWorkspace.uploading", { defaultValue: "Yuklanmoqda..." })
              : t("teacher.lessonWorkspace.saveVideo", { defaultValue: "Videoni saqlash" })}
          </HeroButton>
        </PanelActions>
      </PanelCard>

      <AsideCard>
        <AsideTitle>
          {t("teacher.lessonWorkspace.currentVideos", {
            defaultValue: "Joriy videolar",
          })}
        </AsideTitle>
        {lessonMediaItems.length ? (
          <ContentList>
            {lessonMediaItems.map((item, index) => (
              <ContentCard key={item.mediaId || item.fileUrl || index}>
                <ContentMeta>
                  <ContentTitle>{item.title || `Video ${index + 1}`}</ContentTitle>
                  <ContentSub>
                    {item.fileName || item.videoUrl || item.fileUrl}
                  </ContentSub>
                  <BadgeRow>
                    <Badge>{formatFileSize(item.fileSize || 0)}</Badge>
                    <Badge>{item.streamType || "direct"}</Badge>
                  </BadgeRow>
                </ContentMeta>
                <PanelActions>
                  <TinyButton
                    type="button"
                    as="a"
                    href={item.videoUrl || item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ArrowUpRight size={14} />
                    {t("teacher.lessonWorkspace.open", { defaultValue: "Ochish" })}
                  </TinyButton>
                  <TinyButton
                    type="button"
                    $danger
                    disabled={deletingVideoIndex === index}
                    onClick={() => handleDeleteVideo(index)}
                  >
                    <Trash2 size={14} />
                    {deletingVideoIndex === index
                      ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
                      : t("common.delete")}
                  </TinyButton>
                </PanelActions>
              </ContentCard>
            ))}
          </ContentList>
        ) : (
          <EmptyState>
            <EmptyTitle>
              {t("teacher.lessonWorkspace.noVideos", {
                defaultValue: "Video hali qo'shilmagan",
              })}
            </EmptyTitle>
          </EmptyState>
        )}
      </AsideCard>

      {/* ---- NOTION SECTION ---- */}
      <PanelCard>
        <AsideTitle style={{ marginBottom: 12 }}>
          <Link size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
          {t("teacher.lessonWorkspace.notionSection", { defaultValue: "Notion havola" })}
        </AsideTitle>
        <FormGrid>
          <Field>
            <FieldLabel>
              {t("teacher.lessonWorkspace.notionUrlField", {
                defaultValue: "Notion sahifa URL",
              })}
            </FieldLabel>
            <FieldInput
              value={notionUrl}
              onChange={(e) => setNotionUrl(e.target.value)}
              placeholder="https://notion.so/..."
            />
          </Field>
        </FormGrid>
        <PanelActions>
          <HeroButton
            type="button"
            $primary
            disabled={!notionUrl.trim() || isSavingNotion}
            onClick={handleSaveNotion}
          >
            <Upload size={16} />
            {isSavingNotion
              ? t("common.saving", { defaultValue: "Saqlanmoqda..." })
              : t("teacher.lessonWorkspace.saveNotion", { defaultValue: "Havolani saqlash" })}
          </HeroButton>
          {effectiveNotionUrl && (
            <TinyButton
              type="button"
              as="a"
              href={effectiveNotionUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={14} />
              {t("teacher.lessonWorkspace.openNotion", { defaultValue: "Ochish" })}
            </TinyButton>
          )}
        </PanelActions>
        {effectiveNotionUrl && (
          <HelperText style={{ marginTop: 8 }}>
            {t("teacher.lessonWorkspace.savedNotionUrl", { defaultValue: "Saqlangan:" })}{" "}
            {effectiveNotionUrl}
          </HelperText>
        )}
      </PanelCard>

      <AsideCard>
        <AsideTitle>
          {t("teacher.lessonWorkspace.contentStatus", { defaultValue: "Kontent holati" })}
        </AsideTitle>
        <EmptyState>
          <EmptyTitle>
            {hasPublishedMedia
              ? t("teacher.lessonWorkspace.contentReady", { defaultValue: "Kontent tayyor" })
              : t("teacher.lessonWorkspace.noContent", { defaultValue: "Kontent yo'q" })}
          </EmptyTitle>
          <EmptyText>
            {hasPublishedMedia
              ? t("teacher.lessonWorkspace.contentReadyText", {
                  defaultValue: "Video yoki Notion havola qo'shilgan. Darsni e'lon qilish mumkin.",
                })
              : t("teacher.lessonWorkspace.noContentText", {
                  defaultValue: "Darsni e'lon qilish uchun video yoki Notion havolasidan birini qo'shing.",
                })}
          </EmptyText>
        </EmptyState>
      </AsideCard>
    </PanelGrid>
  );

  const renderMaterials = () => (
    <PanelGrid>
      <PanelCard>
        <FormGrid>
          <Field>
            <FieldLabel>
              {t("teacher.lessonWorkspace.materialTitleField", {
                defaultValue: "Material nomi",
              })}
            </FieldLabel>
            <FieldInput
              value={materialTitle}
              onChange={(event) => setMaterialTitle(event.target.value)}
              placeholder={t("teacher.lessonWorkspace.materialTitlePlaceholder", {
                defaultValue: "Masalan: Dars slaydlari",
              })}
            />
          </Field>

          <Field>
            <FieldLabel>
              {t("teacher.lessonWorkspace.materialUploadField", {
                defaultValue: "PDF yuklash",
              })}
            </FieldLabel>
            <FileBox
              as="button"
              type="button"
              disabled={isPdfLibraryLoading || isSavingMaterial || isLinkingLibraryMaterial}
              onClick={openPdfLibrary}
            >
              <FileText size={24} />
              <div>
                {materialFile
                  ? `${materialFile.name} • ${formatFileSize(materialFile.size)}`
                  : isPdfLibraryLoading
                    ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
                  : t("teacher.lessonWorkspace.materialDropHint", {
                      defaultValue: "PDF kutubxonani ochish yoki yangi PDF tanlash",
                  })}
              </div>
              <HelperText>
                {t("teacher.lessonWorkspace.materialLimitNote", {
                  count: LESSON_MATERIAL_LIMIT,
                  defaultValue: `Limit: ${LESSON_MATERIAL_LIMIT} ta PDF`,
                })}
              </HelperText>
            </FileBox>
            <HiddenFileInput
              ref={materialInputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={(event) => {
                setMaterialFile(event.target.files?.[0] || null);
                setIsPdfLibraryOpen(false);
              }}
            />
          </Field>
        </FormGrid>

        <PanelActions>
          <HeroButton
            type="button"
            $primary
            disabled={!materialFile || isSavingMaterial}
            onClick={handleSaveMaterial}
          >
            <Upload size={16} />
            {isSavingMaterial
              ? t("teacher.lessonWorkspace.uploading", { defaultValue: "Yuklanmoqda..." })
              : t("teacher.lessonWorkspace.saveMaterial", { defaultValue: "Materialni saqlash" })}
          </HeroButton>
          <TinyButton
            type="button"
            disabled={isSavingMaterial || isLinkingLibraryMaterial || isPdfLibraryLoading}
            onClick={openPdfLibrary}
          >
            <FileText size={14} />
            {isPdfLibraryLoading
              ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
              : t("teacher.lessonWorkspace.openPdfLibrary", {
                  defaultValue: "PDF kutubxona",
                })}
          </TinyButton>
        </PanelActions>
      </PanelCard>

      <AsideCard>
        <AsideTitle>
          {t("teacher.lessonWorkspace.materialLibrary", {
            defaultValue: "Materiallar kutubxonasi",
          })}
        </AsideTitle>
        {materialsCount ? (
          <PdfLibraryGrid>
            {materials.map((item, index) => {
              const materialId = getMaterialRequestId(item);
              const materialKey = getMaterialRenderKey(item, index);
              const isDeletingCurrentMaterial =
                Boolean(materialId) && deletingMaterialId === materialId;

              return (
                <PdfLibraryCard key={materialKey}>
                  <ContentMeta>
                    <PdfPreviewBadge>
                      <FileText size={20} />
                    </PdfPreviewBadge>
                    <PdfLibraryTitle>{item.title || item.fileName}</PdfLibraryTitle>
                    <PdfLibraryMeta>
                      <span>{item.fileName}</span>
                      <span>{formatFileSize(item.fileSize || 0)}</span>
                    </PdfLibraryMeta>
                  </ContentMeta>
                  <PanelActions>
                    <TinyButton
                      type="button"
                      as="a"
                      href={item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Eye size={14} />
                      {t("teacher.lessonWorkspace.preview", { defaultValue: "Ko'rish" })}
                    </TinyButton>
                    <TinyButton
                      type="button"
                      as="a"
                      href={item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      <ArrowUpRight size={14} />
                      {t("common.download", { defaultValue: "Yuklash" })}
                    </TinyButton>
                    <TinyButton
                      type="button"
                      $danger
                      disabled={!materialId || isDeletingCurrentMaterial}
                      onClick={() => handleDeleteMaterial(materialId)}
                    >
                      <Trash2 size={14} />
                      {isDeletingCurrentMaterial
                        ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
                        : t("common.delete")}
                    </TinyButton>
                  </PanelActions>
                </PdfLibraryCard>
              );
            })}
          </PdfLibraryGrid>
        ) : (
          <EmptyState>
            <EmptyTitle>
              {t("teacher.lessonWorkspace.noMaterials", {
                defaultValue: "Material hali qo'shilmagan",
              })}
            </EmptyTitle>
            <EmptyText>
              {t("teacher.lessonWorkspace.noMaterialsText", {
                defaultValue: "PDF qo'llanma yoki slaydlarni biriktirsangiz o'quvchilar uchun ancha qulay bo'ladi.",
              })}
            </EmptyText>
          </EmptyState>
        )}
      </AsideCard>
    </PanelGrid>
  );

  const renderHomework = () => (
    <PanelGrid>
      <PanelCard>
        <PanelHeader>
          <PanelActions>
            <TinyButton
              type="button"
              disabled={homeworkCount >= LESSON_HOMEWORK_LIMIT}
              onClick={() => selectHomework(null)}
            >
              <Plus size={14} />
              {t("teacher.lessonWorkspace.newHomework", {
                defaultValue: "Yangi vazifa",
              })}
            </TinyButton>
          </PanelActions>
        </PanelHeader>

        <FormGrid>
          <Field>
            <FieldLabel>{t("coursePlayer.homework.fields.title")}</FieldLabel>
            <FieldInput
              value={homeworkTitle}
              onChange={(event) => setHomeworkTitle(event.target.value)}
              placeholder={t("coursePlayer.homework.fields.title")}
            />
          </Field>

          <Field>
            <FieldLabel>{t("coursePlayer.homework.fields.description")}</FieldLabel>
            <FieldTextarea
              value={homeworkDescription}
              onChange={(event) => setHomeworkDescription(event.target.value)}
              placeholder={t("coursePlayer.homework.fields.description")}
            />
          </Field>

          <FieldRow>
            <Field>
              <FieldLabel>{t("coursePlayer.homework.typeLabel")}</FieldLabel>
              <FieldSelect
                value={homeworkType}
                onChange={(event) => setHomeworkType(event.target.value)}
              >
                {HOMEWORK_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {t(`coursePlayer.homework.types.${type}`)}
                  </option>
                ))}
              </FieldSelect>
            </Field>

            <Field>
              <FieldLabel>{t("coursePlayer.homework.deadline")}</FieldLabel>
              <FieldInput
                type="datetime-local"
                value={homeworkDeadline}
                onChange={(event) => setHomeworkDeadline(event.target.value)}
              />
            </Field>
          </FieldRow>

          <Field>
            <FieldLabel>{t("coursePlayer.homework.maxScore")}</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              max="100"
              value={homeworkMaxScore}
              onChange={(event) => setHomeworkMaxScore(event.target.value)}
            />
          </Field>
        </FormGrid>

        <PanelActions>
          {editingHomeworkId ? (
            <TinyButton
              type="button"
              $danger
              disabled={deletingHomeworkId === editingHomeworkId}
              onClick={() => handleDeleteHomework(editingHomeworkId)}
            >
              <Trash2 size={14} />
              {deletingHomeworkId === editingHomeworkId
                ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
                : t("common.delete")}
            </TinyButton>
          ) : null}
          <HeroButton
            type="button"
            $primary
            disabled={!homeworkTitle.trim() || isSavingHomework}
            onClick={handleSaveHomework}
          >
            <LayoutTemplate size={16} />
            {isSavingHomework
              ? t("teacher.lessonWorkspace.saving", { defaultValue: "Saqlanmoqda..." })
              : t("teacher.lessonWorkspace.saveHomework", {
                  defaultValue: "Uyga vazifani saqlash",
                })}
          </HeroButton>
        </PanelActions>
      </PanelCard>

      <AsideCard>
        <AsideTitle>
          {t("teacher.lessonWorkspace.homeworkBoard", {
            defaultValue: "Vazifalar board",
          })}
        </AsideTitle>
        {homeworkCount ? (
          <ContentList>
            {homeworkAssignments.map((assignment, index) => (
              <ContentCard key={assignment.assignmentId || index}>
                <ContentMeta>
                  <ContentTitle>{assignment.title}</ContentTitle>
                  <ContentSub>{assignment.description || "—"}</ContentSub>
                  <BadgeRow>
                    <Badge>{t(`coursePlayer.homework.types.${assignment.type || "text"}`)}</Badge>
                    <Badge>
                      {t("coursePlayer.homework.submissions")}:{" "}
                      {assignment.submissionCount || 0}
                    </Badge>
                  </BadgeRow>
                </ContentMeta>
                <PanelActions>
                  <TinyButton type="button" onClick={() => selectHomework(assignment)}>
                    {t("common.edit")}
                  </TinyButton>
                  <TinyButton
                    type="button"
                    $danger
                    disabled={deletingHomeworkId === assignment.assignmentId}
                    onClick={() => handleDeleteHomework(assignment.assignmentId)}
                  >
                    <Trash2 size={14} />
                    {deletingHomeworkId === assignment.assignmentId
                      ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
                      : t("common.delete")}
                  </TinyButton>
                </PanelActions>
              </ContentCard>
            ))}
          </ContentList>
        ) : (
          <EmptyState>
            <EmptyTitle>
              {t("teacher.lessonWorkspace.noHomework", {
                defaultValue: "Uyga vazifa hali yo'q",
              })}
            </EmptyTitle>
            <EmptyText>
              {t("teacher.lessonWorkspace.noHomeworkText", {
                defaultValue: "Kamida bitta assignment qo'shsangiz, dars yakunida task oqimi tayyor bo'ladi.",
              })}
            </EmptyText>
          </EmptyState>
        )}
      </AsideCard>
    </PanelGrid>
  );

  const renderTests = () => (
    <PanelGrid>
      <PanelCard>
        <PanelHeader>
          <PanelActions>
            <TinyButton
              type="button"
              disabled={testsCount >= LESSON_TEST_LIMIT}
              onClick={() => selectLinkedTest(null)}
            >
              <Plus size={14} />
              {t("teacher.lessonWorkspace.newTestLink", {
                defaultValue: "Yangi test",
              })}
            </TinyButton>
          </PanelActions>
        </PanelHeader>

        <FormGrid>
          <Field>
            <FieldLabel>
              {t("teacher.lessonWorkspace.testUrlField", {
                defaultValue: "Test linki",
              })}
            </FieldLabel>
            <FieldInput
              value={testUrl}
              onChange={(event) => setTestUrl(event.target.value)}
              placeholder={t("teacher.lessonWorkspace.testUrlPlaceholder", {
                defaultValue: "https://... yoki arena test linki",
              })}
            />
          </Field>

          <Field>
            <FieldLabel>
              {t("teacher.lessonWorkspace.minimumScore", {
                defaultValue: "Minimum score",
              })}
            </FieldLabel>
            <FieldInput
              type="number"
              min="0"
              max="100"
              value={testMinScore}
              onChange={(event) => setTestMinScore(event.target.value)}
            />
            <HelperText>
              {t("teacher.lessonWorkspace.minimumScoreHint", {
                defaultValue:
                  "0 qo'ysangiz keyingi dars darhol ochiladi. 0 dan katta bo'lsa shu ball yoki undan yuqori natija olinmaguncha keyingi dars ochilmaydi.",
              })}
            </HelperText>
          </Field>
        </FormGrid>

        <PanelActions>
          {editingTestId ? (
            <TinyButton
              type="button"
              $danger
              disabled={deletingTestId === editingTestId}
              onClick={() => handleDeleteTest(editingTestId)}
            >
              <Trash2 size={14} />
              {deletingTestId === editingTestId
                ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
                : t("common.delete")}
            </TinyButton>
          ) : null}
          <HeroButton
            type="button"
            $primary
            disabled={!testUrl.trim() || isSavingTest}
            onClick={handleSaveTest}
          >
            <Sparkles size={16} />
            {isSavingTest
              ? t("teacher.lessonWorkspace.saving", { defaultValue: "Saqlanmoqda..." })
              : t("teacher.lessonWorkspace.saveTest", { defaultValue: "Testni ulash" })}
          </HeroButton>
        </PanelActions>
      </PanelCard>

      <AsideCard>
        <AsideTitle>
          {t("teacher.lessonWorkspace.testsBoard", {
            defaultValue: "Ulangan testlar",
          })}
        </AsideTitle>
        {testsCount ? (
          <ContentList>
            {linkedTests.map((item) => (
              <ContentCard key={item.linkedTestId}>
                <ContentMeta>
                  <ContentTitle>{item.title || item.resourceTitle || item.url}</ContentTitle>
                  <ContentSub>{item.url || item.resourceType || "—"}</ContentSub>
                  <BadgeRow>
                    <Badge>
                      {t("teacher.lessonWorkspace.minimumScoreShort", {
                        defaultValue: "Min",
                      })}
                      : {item.minimumScore || 0}
                    </Badge>
                    <Badge>
                      {(item.minimumScore || 0) > 0
                        ? t("teacher.lessonWorkspace.unlockByScore", {
                            defaultValue: "Ball bilan unlock",
                          })
                        : t("teacher.lessonWorkspace.instantUnlock", {
                            defaultValue: "Darhol unlock",
                          })}
                    </Badge>
                  </BadgeRow>
                </ContentMeta>
                <PanelActions>
                  {item.url ? (
                    <ActionLink href={item.url} target="_blank" rel="noreferrer">
                      <ArrowUpRight size={14} />
                      {t("teacher.lessonWorkspace.open", { defaultValue: "Ochish" })}
                    </ActionLink>
                  ) : null}
                  <TinyButton type="button" onClick={() => selectLinkedTest(item)}>
                    {t("common.edit")}
                  </TinyButton>
                  <TinyButton
                    type="button"
                    $danger
                    disabled={deletingTestId === item.linkedTestId}
                    onClick={() => handleDeleteTest(item.linkedTestId)}
                  >
                    <Trash2 size={14} />
                    {deletingTestId === item.linkedTestId
                      ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
                      : t("common.delete")}
                  </TinyButton>
                </PanelActions>
              </ContentCard>
            ))}
          </ContentList>
        ) : (
          <EmptyState>
            <EmptyTitle>
              {t("teacher.lessonWorkspace.noTests", {
                defaultValue: "Test hali ulanmagan",
              })}
            </EmptyTitle>
            <EmptyText>
              {t("teacher.lessonWorkspace.noTestsText", {
                defaultValue: "Arena test linkini biriktirib, darsni interaktiv qiling.",
              })}
            </EmptyText>
          </EmptyState>
        )}
      </AsideCard>
    </PanelGrid>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "materials":
        return renderMaterials();
      case "homework":
        return renderHomework();
      case "tests":
        return renderTests();
      case "content":
      default:
        return renderContent();
    }
  };

  return (
    <WorkspaceShell>
      <Hero>
        <HeroMeta>
          <HeroTitle>{lesson?.title || "Nomsiz"}</HeroTitle>
          <HeroDesc>
            {(lesson?.description || "").trim() ||
              t("teacher.workspace.lessonDescriptionFallback", {
                defaultValue: "Bu dars uchun tavsif kiritilmagan.",
              })}
          </HeroDesc>
        </HeroMeta>

        <HeroActions>
          <Badge
            $accent={effectiveLessonStatus === "draft" ? "#fff3dc" : "#eaffef"}
            $color={effectiveLessonStatus === "draft" ? "#9a6a00" : "#1c8b48"}
          >
            {effectiveLessonStatus === "draft"
              ? t("coursePlayer.playlist.draft", { defaultValue: "Draft" })
              : t("coursePlayer.adminPane.published", { defaultValue: "Published" })}
          </Badge>
          {effectiveLessonStatus === "draft" ? (
            <HeroButton
              type="button"
              $primary
              disabled={!hasPublishedMedia || isPublishingLesson}
              onClick={handlePublish}
            >
              <CheckCircle2 size={14} />
              {isPublishingLesson
                ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
                : t("teacher.lessonWorkspace.publishLesson", {
                    defaultValue: "Darsni e'lon qilish",
                  })}
            </HeroButton>
          ) : null}
          <HeroButton
            type="button"
            $primary
            disabled={isStartingLessonMeet || !lessonId}
            onClick={handleStartLessonMeet}
          >
            <Video size={14} />
            {isStartingLessonMeet
              ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
              : t("teacher.lessonWorkspace.startLessonMeet", {
                  defaultValue: "Dars meetini boshlash",
                })}
          </HeroButton>
        </HeroActions>
      </Hero>

      <TabsRow>
        {TABS.map((tab) => {
          const count =
            tab === "content"
              ? lessonMediaItems.length + (effectiveNotionUrl ? 1 : 0)
              : tab === "materials"
                ? materialsCount
                : tab === "homework"
                  ? homeworkCount
                  : testsCount;
          const label =
            tab === "content"
              ? t("teacher.lessonWorkspace.tabs.content", { defaultValue: "Kontent" })
              : tab === "materials"
                ? t("teacher.lessonWorkspace.tabs.materials", { defaultValue: "Materials" })
                : tab === "homework"
                  ? t("teacher.lessonWorkspace.tabs.homework", { defaultValue: "Homework" })
                  : t("teacher.lessonWorkspace.tabs.tests", { defaultValue: "Tests" });
          return (
            <TabButton
              key={tab}
              type="button"
              $active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "content" ? <LayoutTemplate size={14} /> : null}
              {tab === "materials" ? <FileText size={14} /> : null}
              {tab === "homework" ? <BookOpen size={14} /> : null}
              {tab === "tests" ? <Sparkles size={14} /> : null}
              {label} ({count})
            </TabButton>
          );
        })}
      </TabsRow>

      {loadingBlocks ? (
        <EmptyState>
          <EmptyTitle>{t("common.loading")}</EmptyTitle>
          <EmptyText>
            {t("teacher.lessonWorkspace.loadingText", {
              defaultValue: "Lesson workspace yuklanmoqda...",
            })}
          </EmptyText>
        </EmptyState>
      ) : (
        renderActiveTab()
      )}

      {isPdfLibraryOpen ? (
        <ModalOverlay onClick={() => setIsPdfLibraryOpen(false)} $zIndex={10040}>
          <ModalPanel
            $width="min(100%, 980px)"
            $maxHeight="88vh"
            onClick={(event) => event.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitleBlock>
                <ModalTitle>
                  {t("teacher.lessonWorkspace.materialLibrary", {
                    defaultValue: "Materiallar kutubxonasi",
                  })}
                </ModalTitle>
                <ModalSubtitle>
                  {t("teacher.lessonWorkspace.materialLibraryHint", {
                    defaultValue:
                      "Oldin yuklangan PDF'ni tanlasangiz storage'da duplicate fayl yaratilmaydi.",
                  })}
                </ModalSubtitle>
              </ModalTitleBlock>
              <ModalCloseButton type="button" onClick={() => setIsPdfLibraryOpen(false)}>
                <X size={18} />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <PanelActions style={{ marginBottom: 14 }}>
                <HeroButton type="button" $primary onClick={handlePickNewPdf}>
                  <Upload size={16} />
                  {t("teacher.lessonWorkspace.pickNewPdf", {
                    defaultValue: "Yangi PDF tanlash",
                  })}
                </HeroButton>
              </PanelActions>
              {isPdfLibraryLoading ? (
                <EmptyState>
                  <EmptyTitle>{t("common.loading")}</EmptyTitle>
                  <EmptyText>
                    {t("teacher.lessonWorkspace.loadingPdfLibrary", {
                      defaultValue: "PDF kutubxona yuklanmoqda...",
                    })}
                  </EmptyText>
                </EmptyState>
              ) : pdfLibraryItems.length ? (
                <PdfLibraryGrid>
                  {pdfLibraryItems.map((item) => (
                    <PdfLibraryCard key={`${item.fileUrl}-${item.materialId || item.lessonId}`}>
                      <ContentMeta>
                        <PdfPreviewBadge>
                          <FileText size={20} />
                        </PdfPreviewBadge>
                        <PdfLibraryTitle>{item.title || item.fileName}</PdfLibraryTitle>
                        <PdfLibraryMeta>
                          <span>{item.fileName}</span>
                          <span>{formatFileSize(item.fileSize || 0)}</span>
                          <span>
                            {t("teacher.lessonWorkspace.fromLesson", {
                              defaultValue: "Dars",
                            })}
                            : {item.lessonTitle || "—"}
                          </span>
                        </PdfLibraryMeta>
                      </ContentMeta>
                      <PanelActions>
                        <TinyButton
                          type="button"
                          onClick={() => handleSelectLibraryMaterial(item)}
                          disabled={isLinkingLibraryMaterial || isPdfLibraryLoading}
                        >
                          <Link size={14} />
                          {linkingLibraryMaterialKey === getMaterialRenderKey(item)
                            ? t("teacher.lessonWorkspace.linkingMaterial", {
                                defaultValue: "Biriktirilmoqda...",
                              })
                            : t("teacher.lessonWorkspace.usePdfLink", {
                                defaultValue: "Linkni ishlatish",
                              })}
                        </TinyButton>
                        <TinyButton
                          type="button"
                          as="a"
                          href={item.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Eye size={14} />
                          {t("teacher.lessonWorkspace.preview", { defaultValue: "Ko'rish" })}
                        </TinyButton>
                      </PanelActions>
                    </PdfLibraryCard>
                  ))}
                </PdfLibraryGrid>
              ) : (
                <EmptyState>
                  <EmptyTitle>
                    {t("teacher.lessonWorkspace.noMaterials", {
                      defaultValue: "Material hali qo'shilmagan",
                    })}
                  </EmptyTitle>
                  <EmptyText>
                    {t("teacher.lessonWorkspace.noPdfLibraryText", {
                      defaultValue: "Kutubxonada reuse qilish uchun avval kamida bitta PDF yuklang.",
                    })}
                  </EmptyText>
                </EmptyState>
              )}
            </ModalBody>
          </ModalPanel>
        </ModalOverlay>
      ) : null}
    </WorkspaceShell>
  );
}
