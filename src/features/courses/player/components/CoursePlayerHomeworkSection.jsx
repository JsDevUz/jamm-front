import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp, Edit2, Plus, Trash2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { useCourses } from "../../../../contexts/CoursesContext";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import axiosInstance from "../../../../api/axiosInstance";
import { getHomeworkSubmissionPlaybackToken } from "../../../../api/coursesApi";
import { APP_LIMITS, isPremiumUser } from "../../../../constants/appLimits";
import { API_BASE_URL } from "../../../../config/env";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../../../shared/ui/dialogs/ModalShell";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonRow,
} from "../../../../shared/ui/feedback/Skeleton";
import {
  AssignmentTabButton,
  AssignmentTabs,
  HomeworkActions,
  HomeworkBody,
  HomeworkButton,
  HomeworkCard,
  HomeworkField,
  HomeworkFieldLabel,
  HomeworkFieldRow,
  HomeworkFileInput,
  HomeworkFileLabel,
  HomeworkFileMeta,
  HomeworkForm,
  HomeworkHeader,
  HomeworkHint,
  HomeworkInput,
  HomeworkMeta,
  HomeworkSection,
  HomeworkSelect,
  HomeworkTextarea,
  HomeworkTitle,
  SubmissionAudio,
  SubmissionFileMeta,
  SubmissionHeader,
  SubmissionImage,
  SubmissionLink,
  SubmissionList,
  SubmissionName,
  SubmissionPdf,
  SubmissionPreview,
  SubmissionRow,
  SubmissionStatus,
  SubmissionText,
  SubmissionVideo,
} from "./CoursePlayerHomeworkSection.styles";

const HOMEWORK_TYPES = ["text", "audio", "video", "pdf", "photo"];
const HOMEWORK_FILE_CONFIG = {
  photo: {
    maxBytes: APP_LIMITS.homeworkPhotoBytes,
    extensions: [".jpg", ".jpeg", ".png", ".webp", ".gif"],
  },
  audio: {
    maxBytes: APP_LIMITS.homeworkAudioBytes,
    extensions: [".mp3", ".wav", ".m4a", ".aac", ".ogg"],
  },
  video: {
    maxBytes: APP_LIMITS.homeworkVideoBytes,
    extensions: [".mp4", ".mov", ".webm", ".mkv", ".m4v"],
  },
  pdf: {
    maxBytes: APP_LIMITS.homeworkPdfBytes,
    extensions: [".pdf"],
  },
};

const formatFileSize = (bytes) => {
  if (!bytes) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** index).toFixed(2))} ${units[index]}`;
};

const createDraftAssignmentId = () =>
  `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const createDraftAssignment = () => ({
  assignmentId: createDraftAssignmentId(),
  enabled: true,
  title: "",
  description: "",
  type: "text",
  deadline: null,
  maxScore: 100,
  submissionCount: 0,
  selfSubmission: null,
  submissions: [],
});

const getHomeworkAssignmentLimit = (user) =>
  isPremiumUser(user)
    ? APP_LIMITS.lessonHomeworkPerLesson.premium
    : APP_LIMITS.lessonHomeworkPerLesson.ordinary;

const HomeworkHlsVideoPreview = ({
  courseId,
  lessonId,
  assignmentId,
  submissionUserId,
}) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [playbackUrl, setPlaybackUrl] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadPlayback = async () => {
      try {
        const data = await getHomeworkSubmissionPlaybackToken({
          courseId,
          lessonId,
          assignmentId,
          userId: submissionUserId,
        });
        if (mounted) {
          const nextStreamUrl = data?.streamUrl || "";
          const absoluteStreamUrl = nextStreamUrl.startsWith("http")
            ? nextStreamUrl
            : `${API_BASE_URL}${nextStreamUrl}`;
          setPlaybackUrl(absoluteStreamUrl);
        }
      } catch {
        if (mounted) {
          setPlaybackUrl("");
        }
      }
    };

    loadPlayback();
    return () => {
      mounted = false;
    };
  }, [assignmentId, courseId, lessonId, submissionUserId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playbackUrl) return;

    let cancelled = false;

    const attach = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = playbackUrl;
        return;
      }

      const module = await import("hls.js");
      if (cancelled) return;

      const Hls = module.default;
      if (!Hls.isSupported()) return;

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        xhrSetup: (xhr, url) => {
          const requestUrl = String(url || "");
          const isCdnAsset = /^https?:\/\/files\.jamm\.uz\//i.test(requestUrl);
          xhr.withCredentials = false;
          void isCdnAsset;
        },
        fetchSetup: (context, initParams) => {
          const requestUrl = String(context?.url || "");
          const isCdnAsset = /^https?:\/\/files\.jamm\.uz\//i.test(requestUrl);
          return new Request(requestUrl, {
            ...initParams,
            credentials: isCdnAsset ? "omit" : "include",
            headers: initParams?.headers,
          });
        },
      });

      hlsRef.current = hls;
      hls.loadSource(playbackUrl);
      hls.attachMedia(video);
    };

    attach();

    return () => {
      cancelled = true;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [playbackUrl]);

  if (!playbackUrl) {
    return <SubmissionFileMeta>{t("common.loading")}</SubmissionFileMeta>;
  }

  return (
    <SubmissionPreview>
      <SubmissionVideo ref={videoRef} controls preload="metadata" />
    </SubmissionPreview>
  );
};

const CoursePlayerHomeworkSection = ({
  forceExpanded = false,
  showCollapseToggle = true,
  onContentStateChange,
}) => {
  const { t } = useTranslation();
  const {
    getLessonHomework,
    upsertLessonHomework,
    submitLessonHomework,
    reviewLessonHomework,
    deleteLessonHomework,
  } = useCourses();
  const { admin, courseId, currentLessonData, currentUser } = useCoursePlayerContext();
  const lessonId =
    currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;
  const fileInputRef = useRef(null);

  const [homeworkData, setHomeworkData] = useState({ assignments: [] });
  const [loading, setLoading] = useState(true);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [isAssignmentEditorOpen, setIsAssignmentEditorOpen] = useState(false);
  const [isStudentSectionOpen, setIsStudentSectionOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [maxScore, setMaxScore] = useState(100);
  const [homeworkType, setHomeworkType] = useState("text");
  const [submissionText, setSubmissionText] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [submissionFile, setSubmissionFile] = useState(null);
  const [existingSubmissionFile, setExistingSubmissionFile] = useState(null);
  const [reviewScore, setReviewScore] = useState({});
  const [reviewFeedback, setReviewFeedback] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const assignments = homeworkData?.assignments || [];
  const homeworkAssignmentLimit = useMemo(
    () => getHomeworkAssignmentLimit(currentUser),
    [currentUser],
  );
  const canAddMoreAssignments = assignments.length < homeworkAssignmentLimit;
  const selectedAssignment =
    assignments.find(
      (assignment) => String(assignment.assignmentId) === String(selectedAssignmentId),
    ) || null;

  const currentHomeworkType = admin
    ? homeworkType
    : selectedAssignment?.type || "text";
  const isTextHomework = currentHomeworkType === "text";
  const canResubmit =
    selectedAssignment?.selfSubmission?.status === "needs_revision";
  const hasLockedSubmission =
    Boolean(selectedAssignment?.selfSubmission) && !canResubmit;
  const completedAssignmentsCount = useMemo(
    () =>
      assignments.filter((assignment) => Boolean(assignment?.selfSubmission))
        .length,
    [assignments],
  );

  useEffect(() => {
    if (forceExpanded) {
      setIsStudentSectionOpen(true);
    }
  }, [forceExpanded]);

  useEffect(() => {
    onContentStateChange?.({
      loading,
      count: assignments.length,
      completed: completedAssignmentsCount,
    });
  }, [
    assignments.length,
    completedAssignmentsCount,
    loading,
    onContentStateChange,
  ]);

  useEffect(() => {
    if (!courseId || !lessonId) {
      setHomeworkData({ assignments: [] });
      setLoading(false);
      return undefined;
    }
    let cancelled = false;

    const loadHomework = async () => {
      try {
        setLoading(true);
        const data = await getLessonHomework(courseId, lessonId);
        if (cancelled) return;
        setHomeworkData(data || { assignments: [] });
        const firstAssignment = data?.assignments?.[0] || null;
        setSelectedAssignmentId(firstAssignment?.assignmentId || null);
        setIsAssignmentEditorOpen(false);
      } catch (error) {
        if (!cancelled) {
          setHomeworkData({ assignments: [] });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadHomework();
    return () => {
      cancelled = true;
    };
  }, [courseId, getLessonHomework, lessonId]);

  useEffect(() => {
    if (!selectedAssignment) {
      setIsSubmitModalOpen(false);
      setTitle("");
      setDescription("");
      setDeadline("");
      setMaxScore(100);
      setHomeworkType("text");
      setSubmissionText("");
      setSubmissionLink("");
      setExistingSubmissionFile(null);
      setSubmissionFile(null);
      return;
    }

    setTitle(selectedAssignment.title || "");
    setDescription(selectedAssignment.description || "");
    setDeadline(
      selectedAssignment.deadline
        ? String(selectedAssignment.deadline).slice(0, 16)
        : "",
    );
    setMaxScore(selectedAssignment.maxScore || 100);
    setHomeworkType(selectedAssignment.type || "text");
    setSubmissionText(selectedAssignment.selfSubmission?.text || "");
    setSubmissionLink(selectedAssignment.selfSubmission?.link || "");
    setExistingSubmissionFile(
      selectedAssignment.selfSubmission?.fileUrl
        ? {
            fileUrl: selectedAssignment.selfSubmission.fileUrl,
            fileName: selectedAssignment.selfSubmission.fileName,
            fileSize: selectedAssignment.selfSubmission.fileSize,
            streamType: selectedAssignment.selfSubmission.streamType,
          }
        : null,
    );
    setSubmissionFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [selectedAssignment]);

  const typeOptions = useMemo(
    () =>
      HOMEWORK_TYPES.map((type) => ({
        value: type,
        label: t(`coursePlayer.homework.types.${type}`),
      })),
    [t],
  );

  const canSubmitStudentHomework = isTextHomework
    ? Boolean(submissionText.trim() || submissionLink.trim())
    : Boolean(submissionFile || existingSubmissionFile || submissionLink.trim());
  const currentHomeworkFileLimitMb = useMemo(() => {
    const config = HOMEWORK_FILE_CONFIG[currentHomeworkType];
    return config ? Math.round(config.maxBytes / (1024 * 1024)) : 0;
  }, [currentHomeworkType]);

  const validateHomeworkText = () => {
    if (submissionText.length > APP_LIMITS.homeworkTextChars) {
      toast.error(
        t("coursePlayer.homework.errors.textTooLong", {
          count: APP_LIMITS.homeworkTextChars,
        }),
      );
      return false;
    }

    if (submissionLink.length > APP_LIMITS.homeworkLinkChars) {
      toast.error(
        t("coursePlayer.homework.errors.linkTooLong", {
          count: APP_LIMITS.homeworkLinkChars,
        }),
      );
      return false;
    }

    return true;
  };

  const validateHomeworkFile = (file, type) => {
    const config = HOMEWORK_FILE_CONFIG[type];
    if (!config || !file) return true;

    const normalizedName = String(file.name || "").toLowerCase();
    const hasValidExtension = config.extensions.some((extension) =>
      normalizedName.endsWith(extension),
    );

    if (!hasValidExtension) {
      toast.error(
        t("coursePlayer.homework.errors.invalidFileType", {
          type: t(`coursePlayer.homework.types.${type}`),
        }),
      );
      return false;
    }

    if (Number(file.size || 0) > Number(config.maxBytes || 0)) {
      toast.error(
        t("coursePlayer.homework.errors.fileTooLarge", {
          type: t(`coursePlayer.homework.types.${type}`),
          size: Math.round(config.maxBytes / (1024 * 1024)),
        }),
      );
      return false;
    }

    return true;
  };

  const renderSubmissionPreview = (submission, type, assignmentId) => {
    if (!submission?.fileUrl) return null;

    if (type === "photo") {
      return (
        <SubmissionPreview>
          <SubmissionImage
            src={submission.fileUrl}
            alt={submission.fileName || "submission"}
          />
        </SubmissionPreview>
      );
    }

    if (type === "audio") {
      return (
        <SubmissionPreview>
          <SubmissionAudio controls preload="none" src={submission.fileUrl} />
        </SubmissionPreview>
      );
    }

    if (type === "video") {
      if (submission.streamType === "hls") {
        return (
          <HomeworkHlsVideoPreview
            courseId={courseId}
            lessonId={lessonId}
            assignmentId={assignmentId}
            submissionUserId={String(submission.userId)}
          />
        );
      }

      return (
        <SubmissionPreview>
          <SubmissionVideo controls preload="metadata" src={submission.fileUrl} />
        </SubmissionPreview>
      );
    }

    if (type === "pdf") {
      return (
        <SubmissionPreview>
          <SubmissionPdf src={submission.fileUrl} title={submission.fileName || "PDF"} />
        </SubmissionPreview>
      );
    }

    return null;
  };

  const handleAssignmentSelect = (assignment) => {
    setSelectedAssignmentId(assignment?.assignmentId || null);
    setIsAssignmentEditorOpen(false);
  };

  const handleCreateAssignment = () => {
    if (!canAddMoreAssignments) {
      toast.error(
        t("coursePlayer.homework.errors.limitReached", {
          count: homeworkAssignmentLimit,
        }),
      );
      return;
    }
    const next = createDraftAssignment();
    setHomeworkData((prev) => ({
      assignments: [...(prev?.assignments || []), next],
    }));
    setSelectedAssignmentId(next.assignmentId);
    setIsAssignmentEditorOpen(true);
    setTitle("");
    setDescription("");
    setDeadline("");
    setMaxScore(100);
    setHomeworkType("text");
    setSubmissionText("");
    setSubmissionLink("");
    setExistingSubmissionFile(null);
    setSubmissionFile(null);
  };

  const handleCancelAssignmentEditor = () => {
    if (!selectedAssignment?.assignmentId?.startsWith?.("draft-")) {
      setIsAssignmentEditorOpen(false);
      return;
    }

    setHomeworkData((prev) => ({
      assignments: (prev?.assignments || []).filter(
        (assignment) => assignment.assignmentId !== selectedAssignment.assignmentId,
      ),
    }));
    setSelectedAssignmentId(assignments[0]?.assignmentId || null);
    setIsAssignmentEditorOpen(false);
  };

  const handleSaveHomework = async () => {
    const data = await upsertLessonHomework(courseId, lessonId, {
      assignmentId: selectedAssignment?.assignmentId || undefined,
      enabled: true,
      title,
      description,
      type: homeworkType,
      deadline: deadline || null,
      maxScore: Number(maxScore || 100),
    });
    setHomeworkData(data);
    const latestAssignments = data?.assignments || [];
    const target =
      latestAssignments.find(
        (assignment) =>
          assignment.assignmentId === selectedAssignment?.assignmentId,
      ) || latestAssignments[latestAssignments.length - 1];
    setSelectedAssignmentId(target?.assignmentId || null);
    setIsAssignmentEditorOpen(false);
  };

  const handleDeleteAssignment = async () => {
    if (!selectedAssignment?.assignmentId) {
      setHomeworkData((prev) => ({
        assignments: (prev?.assignments || []).filter(
          (assignment) => assignment !== selectedAssignment,
        ),
      }));
      setSelectedAssignmentId(assignments[0]?.assignmentId || null);
      setIsAssignmentEditorOpen(false);
      return;
    }

    const data = await deleteLessonHomework(
      courseId,
      lessonId,
      selectedAssignment.assignmentId,
    );
    setHomeworkData(data);
    setSelectedAssignmentId(data?.assignments?.[0]?.assignmentId || null);
    setIsAssignmentEditorOpen(false);
  };

  const handleFileChange = (event) => {
    const nextFile = event.target.files?.[0];
    if (!nextFile) return;
    if (!validateHomeworkFile(nextFile, currentHomeworkType)) {
      event.target.value = "";
      return;
    }
    setSubmissionFile(nextFile);
    setExistingSubmissionFile(null);
  };

  const uploadHomeworkFile = async () => {
    if (!submissionFile) return null;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", submissionFile);
      const { data } = await axiosInstance.post("/courses/upload-media", formData);
      const uploadedFileUrl = data.fileUrl || data.manifestUrl || data.url || "";
      if (!uploadedFileUrl) {
        throw new Error("Homework upload did not return a file URL");
      }
      return {
        fileUrl: uploadedFileUrl,
        fileName: data.fileName || submissionFile.name,
        fileSize: data.fileSize || submissionFile.size || 0,
        streamType: data.streamType || "direct",
        streamAssets: Array.isArray(data.assetKeys) ? data.assetKeys : [],
        hlsKeyAsset: data.hlsKeyAsset || "",
      };
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitHomework = async () => {
    if (!selectedAssignment?.assignmentId) {
      toast.error(t("coursePlayer.homework.errors.saveFirst"));
      return;
    }

    if (!validateHomeworkText()) {
      return;
    }

    if (
      !isTextHomework &&
      !submissionFile &&
      !existingSubmissionFile &&
      !submissionLink.trim()
    ) {
      toast.error(t("coursePlayer.homework.errors.fileOrLinkRequired"));
      return;
    }

    if (isTextHomework && !submissionText.trim() && !submissionLink.trim()) {
      toast.error(t("coursePlayer.homework.errors.textOrLinkRequired"));
      return;
    }

    let uploaded = null;
    if (!isTextHomework && submissionFile) {
      uploaded = await uploadHomeworkFile();
    }

    const data = await submitLessonHomework(courseId, lessonId, {
      assignmentId: selectedAssignment.assignmentId,
      text: submissionText,
      link: submissionLink,
      fileUrl: uploaded?.fileUrl || existingSubmissionFile?.fileUrl || "",
      fileName: uploaded?.fileName || existingSubmissionFile?.fileName || "",
      fileSize: uploaded?.fileSize || existingSubmissionFile?.fileSize || 0,
      streamType:
        uploaded?.streamType || existingSubmissionFile?.streamType || "direct",
      streamAssets: uploaded?.streamAssets || [],
      hlsKeyAsset: uploaded?.hlsKeyAsset || "",
    });
    setHomeworkData(data);
    setSelectedAssignmentId(selectedAssignment.assignmentId);
    setIsSubmitModalOpen(false);
  };

  const handleReview = async (submission, status) => {
    const userId = submission?.userId;
    if (!userId) return;

    const data = await reviewLessonHomework(
      courseId,
      lessonId,
      selectedAssignment.assignmentId,
      userId,
      {
        status,
        score:
          reviewScore[userId] === "" || reviewScore[userId] === undefined
            ? submission?.score ?? null
            : Number(reviewScore[userId]),
        feedback:
          reviewFeedback[userId] === undefined
            ? submission?.feedback || ""
            : reviewFeedback[userId] || "",
      },
    );
    setHomeworkData(data);
  };

  const renderAssignmentTabs = () =>
    assignments.length ? (
      <AssignmentTabs>
        {assignments.map((assignment, index) => (
          <AssignmentTabButton
            key={assignment.assignmentId || `draft-${index}`}
            type="button"
            $active={
              String(assignment.assignmentId || "") ===
              String(selectedAssignment?.assignmentId || "")
            }
            onClick={() => handleAssignmentSelect(assignment)}
          >
            {assignment.title || t("coursePlayer.homework.assignmentLabel", { index: index + 1 })}
          </AssignmentTabButton>
        ))}
      </AssignmentTabs>
    ) : null;

  if (!loading && !assignments.length && !admin) return null;

  const renderAdminAssignmentEditor = () => (
    <HomeworkCard>
      <HomeworkTitle>
        {selectedAssignment?.assignmentId
          ? t("coursePlayer.homework.editDialogTitle")
          : t("coursePlayer.homework.createDialogTitle")}
      </HomeworkTitle>
      <HomeworkHint>{t("coursePlayer.homework.dialogSubtitle")}</HomeworkHint>

      <HomeworkForm>
        <HomeworkField>
          <HomeworkFieldLabel>{t("coursePlayer.homework.fields.title")}</HomeworkFieldLabel>
          <HomeworkInput
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t("coursePlayer.homework.fields.title")}
          />
        </HomeworkField>

        <HomeworkField>
          <HomeworkFieldLabel>
            {t("coursePlayer.homework.fields.description")}
          </HomeworkFieldLabel>
          <HomeworkTextarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={t("coursePlayer.homework.fields.description")}
          />
        </HomeworkField>

        <HomeworkFieldRow>
          <HomeworkField>
            <HomeworkFieldLabel>{t("coursePlayer.homework.typeLabel")}</HomeworkFieldLabel>
            <HomeworkSelect
              value={homeworkType}
              onChange={(event) => setHomeworkType(event.target.value)}
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </HomeworkSelect>
          </HomeworkField>

          <HomeworkField>
            <HomeworkFieldLabel>{t("coursePlayer.homework.deadline")}</HomeworkFieldLabel>
            <HomeworkInput
              type="datetime-local"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
            />
          </HomeworkField>
        </HomeworkFieldRow>

        <HomeworkField>
          <HomeworkFieldLabel>{t("coursePlayer.homework.maxScore")}</HomeworkFieldLabel>
          <HomeworkInput
            type="number"
            min="0"
            max="100"
            value={maxScore}
            onChange={(event) => setMaxScore(event.target.value)}
          />
        </HomeworkField>
      </HomeworkForm>

      <HomeworkActions>
        {selectedAssignment ? (
          <HomeworkButton type="button" onClick={handleDeleteAssignment}>
            <Trash2 size={14} />
            {t("coursePlayer.homework.delete")}
          </HomeworkButton>
        ) : null}
        <HomeworkButton
          type="button"
          onClick={handleCancelAssignmentEditor}
        >
          {t("common.cancel")}
        </HomeworkButton>
        <HomeworkButton
          type="button"
          $primary
          disabled={!title.trim()}
          onClick={handleSaveHomework}
        >
          {t("coursePlayer.homework.save")}
        </HomeworkButton>
      </HomeworkActions>
    </HomeworkCard>
  );

  const renderAdminAssignmentSummary = () =>
    selectedAssignment ? (
      <HomeworkCard>
        <HomeworkTitle>{selectedAssignment.title}</HomeworkTitle>
        <HomeworkBody>{selectedAssignment.description}</HomeworkBody>
        <HomeworkMeta>
          <span>
            {t("coursePlayer.homework.typeLabel")}:{" "}
            {t(`coursePlayer.homework.types.${selectedAssignment.type || "text"}`)}
          </span>
          <span>
            {t("coursePlayer.homework.deadline")}:{" "}
            {selectedAssignment.deadline
              ? new Date(selectedAssignment.deadline).toLocaleDateString()
              : t("coursePlayer.homework.noDeadline")}
          </span>
          <span>
            {t("coursePlayer.homework.maxScore")}: {selectedAssignment.maxScore}
          </span>
          <span>
            {t("coursePlayer.homework.submissions")}:{" "}
            {selectedAssignment.submissionCount || selectedAssignment.submissions?.length || 0}
          </span>
        </HomeworkMeta>
        <HomeworkActions>
          <HomeworkButton
            type="button"
            onClick={() => setIsAssignmentEditorOpen(true)}
          >
            <Edit2 size={14} />
            {t("common.edit")}
          </HomeworkButton>
          <HomeworkButton type="button" onClick={handleDeleteAssignment}>
            <Trash2 size={14} />
            {t("coursePlayer.homework.delete")}
          </HomeworkButton>
        </HomeworkActions>
      </HomeworkCard>
    ) : (
      <HomeworkCard>
        <HomeworkHint>{t("coursePlayer.homework.emptyAssignments")}</HomeworkHint>
      </HomeworkCard>
    );

  const renderAdminSubmissions = () => {
    if (!selectedAssignment) return null;

    const submissions = Array.isArray(selectedAssignment.submissions)
      ? selectedAssignment.submissions
      : [];

    return (
      <HomeworkCard>
        <HomeworkTitle>{t("coursePlayer.homework.submissions")}</HomeworkTitle>
        {!submissions.length ? (
          <HomeworkHint>{t("coursePlayer.homework.emptySubmissions")}</HomeworkHint>
        ) : (
          <SubmissionList>
            {submissions.map((submission) => {
              const submissionUserId = String(submission.userId || "");
              const nextScore =
                reviewScore[submissionUserId] ?? submission.score ?? "";
              const nextFeedback =
                reviewFeedback[submissionUserId] ?? submission.feedback ?? "";

              return (
                <SubmissionRow key={submissionUserId || submission.submittedAt}>
                  <SubmissionHeader>
                    <div>
                      <SubmissionName>
                        {submission.userName || t("common.userFallback")}
                      </SubmissionName>
                      <HomeworkFileMeta>
                        {submission.submittedAt
                          ? new Date(submission.submittedAt).toLocaleString()
                          : t("common.loading")}
                      </HomeworkFileMeta>
                    </div>
                    <SubmissionStatus $status={submission.status}>
                      {t(`coursePlayer.homework.status.${submission.status}`)}
                    </SubmissionStatus>
                  </SubmissionHeader>

                  {submission.text ? (
                    <SubmissionText>{submission.text}</SubmissionText>
                  ) : null}

                  {submission.link ? (
                    <SubmissionLink
                      href={submission.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {submission.link}
                    </SubmissionLink>
                  ) : null}

                  {submission.fileUrl ? (
                    <>
                      <SubmissionLink
                        href={submission.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {submission.fileName || t("coursePlayer.homework.fileUploaded")}
                      </SubmissionLink>
                      <SubmissionFileMeta>
                        {formatFileSize(submission.fileSize || 0)}
                      </SubmissionFileMeta>
                      {renderSubmissionPreview(
                        submission,
                        selectedAssignment.type || "text",
                        selectedAssignment.assignmentId,
                      )}
                    </>
                  ) : null}

                  <HomeworkFieldRow>
                    <HomeworkField>
                      <HomeworkFieldLabel>
                        {t("coursePlayer.homework.fields.score")}
                      </HomeworkFieldLabel>
                      <HomeworkInput
                        type="number"
                        min="0"
                        max={selectedAssignment.maxScore || 100}
                        value={nextScore}
                        onChange={(event) =>
                          setReviewScore((prev) => ({
                            ...prev,
                            [submissionUserId]: event.target.value,
                          }))
                        }
                      />
                    </HomeworkField>

                    <HomeworkField>
                      <HomeworkFieldLabel>
                        {t("coursePlayer.homework.fields.feedback")}
                      </HomeworkFieldLabel>
                      <HomeworkTextarea
                        value={nextFeedback}
                        onChange={(event) =>
                          setReviewFeedback((prev) => ({
                            ...prev,
                            [submissionUserId]: event.target.value,
                          }))
                        }
                        placeholder={t("coursePlayer.homework.fields.feedback")}
                      />
                    </HomeworkField>
                  </HomeworkFieldRow>

                  <HomeworkActions>
                    <HomeworkButton
                      type="button"
                      onClick={() => handleReview(submission, "needs_revision")}
                    >
                      {t("coursePlayer.homework.needsRevision")}
                    </HomeworkButton>
                    <HomeworkButton
                      type="button"
                      $primary
                      onClick={() => handleReview(submission, "reviewed")}
                    >
                      {t("coursePlayer.homework.review")}
                    </HomeworkButton>
                  </HomeworkActions>
                </SubmissionRow>
              );
            })}
          </SubmissionList>
        )}
      </HomeworkCard>
    );
  };

  const renderStudentSubmissionForm = () => (
    <>
      {selectedAssignment.selfSubmission ? (
        <>
          <HomeworkMeta>
            <span>
              {t("coursePlayer.homework.statusLabel")}:{" "}
              {t(
                `coursePlayer.homework.status.${selectedAssignment.selfSubmission.status}`,
              )}
            </span>
            <span>
              {t("coursePlayer.homework.scoreLabel")}:{" "}
              {selectedAssignment.selfSubmission.score ?? "-"}
            </span>
          </HomeworkMeta>
          {selectedAssignment.selfSubmission.text ? (
            <HomeworkBody>{selectedAssignment.selfSubmission.text}</HomeworkBody>
          ) : null}
          {selectedAssignment.selfSubmission.link ? (
            <SubmissionLink
              href={selectedAssignment.selfSubmission.link}
              target="_blank"
              rel="noreferrer"
            >
              {selectedAssignment.selfSubmission.link}
            </SubmissionLink>
          ) : null}
          {selectedAssignment.selfSubmission.fileUrl ? (
            <>
              <SubmissionLink
                href={selectedAssignment.selfSubmission.fileUrl}
                target="_blank"
                rel="noreferrer"
              >
                {selectedAssignment.selfSubmission.fileName ||
                  t("coursePlayer.homework.fileUploaded")}
              </SubmissionLink>
              <SubmissionFileMeta>
                {formatFileSize(
                  selectedAssignment.selfSubmission.fileSize || 0,
                )}
              </SubmissionFileMeta>
              {renderSubmissionPreview(
                selectedAssignment.selfSubmission,
                selectedAssignment.type || "text",
                selectedAssignment.assignmentId,
              )}
            </>
          ) : null}
        </>
      ) : null}
      {selectedAssignment.selfSubmission?.feedback ? (
        <HomeworkBody>{selectedAssignment.selfSubmission.feedback}</HomeworkBody>
      ) : null}

      {!hasLockedSubmission ? (
        <>
          {selectedAssignment.type === "text" ? (
            <HomeworkTextarea
              value={submissionText}
              placeholder={t("coursePlayer.homework.fields.answer")}
              onChange={(event) => setSubmissionText(event.target.value)}
            />
          ) : (
            <>
              {!submissionFile && !existingSubmissionFile ? (
                <HomeworkFileLabel>
                  <Upload size={18} />
                  <span>{t("coursePlayer.homework.fields.file")}</span>
                  <HomeworkFileMeta>
                    {t("coursePlayer.homework.fileHint", {
                      type: t(`coursePlayer.homework.types.${currentHomeworkType}`),
                      size: currentHomeworkFileLimitMb,
                    })}
                  </HomeworkFileMeta>
                  <HomeworkFileInput
                    ref={fileInputRef}
                    type="file"
                    accept={
                      currentHomeworkType === "audio"
                        ? "audio/*"
                        : currentHomeworkType === "video"
                          ? "video/*"
                          : currentHomeworkType === "pdf"
                            ? "application/pdf"
                            : "image/*"
                    }
                    onChange={handleFileChange}
                  />
                </HomeworkFileLabel>
              ) : (
                <SubmissionFileMeta>
                  {(submissionFile?.name || existingSubmissionFile?.fileName) ??
                    t("coursePlayer.homework.fileUploaded")}
                  {" • "}
                  {formatFileSize(
                    submissionFile?.size || existingSubmissionFile?.fileSize || 0,
                  )}
                </SubmissionFileMeta>
              )}
              <HomeworkInput
                value={submissionText}
                placeholder={t("coursePlayer.homework.fields.note")}
                onChange={(event) => setSubmissionText(event.target.value)}
              />
            </>
          )}

          <HomeworkInput
            value={submissionLink}
            placeholder={t("coursePlayer.homework.fields.link")}
            onChange={(event) => setSubmissionLink(event.target.value)}
          />
        </>
      ) : (
        <HomeworkHint>
          {t("coursePlayer.homework.alreadySubmitted")}
        </HomeworkHint>
      )}
    </>
  );

  const renderStudentSubmissionSummary = (assignment) => {
    const submission = assignment?.selfSubmission;
    if (!submission) return null;

    return (
      <HomeworkCard>
        <HomeworkTitle>{t("coursePlayer.homework.submit")}</HomeworkTitle>
        <HomeworkMeta>
          <span>
            {t("coursePlayer.homework.statusLabel")}:{" "}
            {t(`coursePlayer.homework.status.${submission.status}`)}
          </span>
          <span>
            {t("coursePlayer.homework.scoreLabel")}: {submission.score ?? "-"}
          </span>
        </HomeworkMeta>
        {submission.text ? <HomeworkBody>{submission.text}</HomeworkBody> : null}
        {submission.link ? (
          <SubmissionLink href={submission.link} target="_blank" rel="noreferrer">
            {submission.link}
          </SubmissionLink>
        ) : null}
        {submission.fileUrl ? (
          <>
            <SubmissionLink
              href={submission.fileUrl}
              target="_blank"
              rel="noreferrer"
            >
              {submission.fileName || t("coursePlayer.homework.fileUploaded")}
            </SubmissionLink>
            <SubmissionFileMeta>
              {formatFileSize(submission.fileSize || 0)}
            </SubmissionFileMeta>
            {renderSubmissionPreview(
              submission,
              assignment.type || "text",
              assignment.assignmentId,
            )}
          </>
        ) : null}
        {submission.feedback ? <HomeworkBody>{submission.feedback}</HomeworkBody> : null}
      </HomeworkCard>
    );
  };

  const openStudentSubmitModal = (assignment) => {
    handleAssignmentSelect(assignment);
    setIsSubmitModalOpen(true);
  };

  const renderStudentAssignmentCard = (assignment, index) => {
    const hasSubmitted = Boolean(assignment.selfSubmission);
    const canSubmitAgain = assignment.selfSubmission?.status === "needs_revision";

    return (
      <React.Fragment key={assignment.assignmentId || `assignment-${index}`}>
        <HomeworkCard>
          <HomeworkTitle>
            {assignment.title ||
              t("coursePlayer.homework.assignmentLabel", { index: index + 1 })}
          </HomeworkTitle>
          {assignment.description ? (
            <HomeworkBody>{assignment.description}</HomeworkBody>
          ) : null}
          <HomeworkMeta>
            <span>
              {t("coursePlayer.homework.typeLabel")}:{" "}
              {t(`coursePlayer.homework.types.${assignment.type || "text"}`)}
            </span>
            <span>
              {t("coursePlayer.homework.deadline")}:{" "}
              {assignment.deadline
                ? new Date(assignment.deadline).toLocaleDateString()
                : t("coursePlayer.homework.noDeadline")}
            </span>
            <span>
              {t("coursePlayer.homework.maxScore")}: {assignment.maxScore}
            </span>
          </HomeworkMeta>
          <HomeworkActions>
            <HomeworkButton
              type="button"
              $primary={!hasSubmitted || canSubmitAgain}
              onClick={() => openStudentSubmitModal(assignment)}
            >
              {canSubmitAgain
                ? t("coursePlayer.homework.resubmit")
                : hasSubmitted
                  ? t(`coursePlayer.homework.status.${assignment.selfSubmission.status}`)
                  : t("coursePlayer.homework.submit")}
            </HomeworkButton>
          </HomeworkActions>
        </HomeworkCard>
        {renderStudentSubmissionSummary(assignment)}
      </React.Fragment>
    );
  };

  return (
    <>
      <HomeworkSection>
        <HomeworkHeader>
          <div>
            <HomeworkTitle>{t("coursePlayer.homework.title")}</HomeworkTitle>
            <HomeworkHint>
              {loading
                ? t("common.loading")
                : admin
                  ? t("coursePlayer.homework.adminHint")
                  : t("coursePlayer.homework.studentHint")}
            </HomeworkHint>
          </div>
          {admin ? (
            <HomeworkActions>
              <HomeworkButton
                type="button"
                disabled={!canAddMoreAssignments}
                onClick={handleCreateAssignment}
              >
                <Plus size={14} />
                {t("coursePlayer.homework.addAnother")}
              </HomeworkButton>
              {selectedAssignment ? (
                <HomeworkButton
                  type="button"
                  onClick={() => setIsAssignmentEditorOpen((prev) => !prev)}
                >
                  <Edit2 size={14} />
                  {t("common.edit")}
                </HomeworkButton>
              ) : null}
            </HomeworkActions>
          ) : null}
        </HomeworkHeader>

        {admin ? renderAssignmentTabs() : null}

        {admin ? (
          <>
            {isAssignmentEditorOpen
              ? renderAdminAssignmentEditor()
              : renderAdminAssignmentSummary()}
            {renderAdminSubmissions()}
          </>
        ) : null}

        {admin ? null : !(forceExpanded || isStudentSectionOpen) ? null : assignments.length ? (
          assignments.map(renderStudentAssignmentCard)
        ) : null}
      </HomeworkSection>

      {!admin && selectedAssignment && isSubmitModalOpen ? (
        <ModalOverlay onClick={() => setIsSubmitModalOpen(false)}>
          <ModalPanel
            $width="min(100%, 760px)"
            $maxHeight="90vh"
            onClick={(event) => event.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitleBlock>
                <ModalTitle>{selectedAssignment.title}</ModalTitle>
                <ModalSubtitle>
                  {t(`coursePlayer.homework.types.${selectedAssignment.type || "text"}`)}
                </ModalSubtitle>
              </ModalTitleBlock>
              <ModalCloseButton
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody $padding="18px">
              <HomeworkForm>
                {renderStudentSubmissionForm()}
              </HomeworkForm>
            </ModalBody>
            {!hasLockedSubmission ? (
              <ModalFooter>
                <DialogActionButton
                  type="button"
                  $variant="ghost"
                  onClick={() => setIsSubmitModalOpen(false)}
                >
                  {t("common.cancel")}
                </DialogActionButton>
                <DialogActionButton
                  type="button"
                  disabled={!canSubmitStudentHomework || isUploading}
                  onClick={handleSubmitHomework}
                >
                  {isUploading
                    ? t("coursePlayer.homework.uploading")
                    : canResubmit
                      ? t("coursePlayer.homework.resubmit")
                      : t("coursePlayer.homework.submit")}
                </DialogActionButton>
              </ModalFooter>
            ) : null}
          </ModalPanel>
        </ModalOverlay>
      ) : null}
    </>
  );
};

export default CoursePlayerHomeworkSection;
