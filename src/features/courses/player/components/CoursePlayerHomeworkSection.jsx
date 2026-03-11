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
  EmptyHomework,
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
          const isCdnAsset = /^https?:\/\/files\.tayn\.uz\//i.test(requestUrl);
          xhr.withCredentials = false;
          void isCdnAsset;
        },
        fetchSetup: (context, initParams) => {
          const requestUrl = String(context?.url || "");
          const isCdnAsset = /^https?:\/\/files\.tayn\.uz\//i.test(requestUrl);
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
  const [loading, setLoading] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [isAssignmentEditorOpen, setIsAssignmentEditorOpen] = useState(false);
  const [isStudentSectionOpen, setIsStudentSectionOpen] = useState(false);
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

  useEffect(() => {
    if (forceExpanded) {
      setIsStudentSectionOpen(true);
    }
  }, [forceExpanded]);

  useEffect(() => {
    if (!courseId || !lessonId) return;
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
  };

  const handleReview = async (userId, status) => {
    const data = await reviewLessonHomework(
      courseId,
      lessonId,
      selectedAssignment.assignmentId,
      userId,
      {
        status,
        score:
          reviewScore[userId] === "" || reviewScore[userId] === undefined
            ? null
            : Number(reviewScore[userId]),
        feedback: reviewFeedback[userId] || "",
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

  return (
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
        {!admin && showCollapseToggle ? (
          <HomeworkButton
            type="button"
            onClick={() => setIsStudentSectionOpen((prev) => !prev)}
            aria-label={
              isStudentSectionOpen
                ? t("coursePlayer.homework.collapse")
                : t("coursePlayer.homework.expand")
            }
            title={
              isStudentSectionOpen
                ? t("coursePlayer.homework.collapse")
                : t("coursePlayer.homework.expand")
            }
          >
            {isStudentSectionOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </HomeworkButton>
        ) : null}
      </HomeworkHeader>

      {!admin && !(forceExpanded || isStudentSectionOpen) ? null : renderAssignmentTabs()}

      {admin ? (
        <>
          <HomeworkActions>
            <HomeworkButton
              type="button"
              $primary
              $iconOnly
              onClick={handleCreateAssignment}
              disabled={!canAddMoreAssignments}
              aria-label={t("coursePlayer.homework.addAnother")}
              title={t("coursePlayer.homework.addAnother")}
            >
              <Plus size={14} />
            </HomeworkButton>
            {selectedAssignment ? (
              <HomeworkButton
                type="button"
                $iconOnly
                onClick={() => setIsAssignmentEditorOpen((prev) => !prev)}
                aria-label={isAssignmentEditorOpen ? t("common.cancel") : t("common.edit")}
                title={isAssignmentEditorOpen ? t("common.cancel") : t("common.edit")}
              >
                {isAssignmentEditorOpen ? <X size={14} /> : <Edit2 size={14} />}
              </HomeworkButton>
            ) : null}
            {selectedAssignment ? (
              <HomeworkButton
                type="button"
                $iconOnly
                onClick={handleDeleteAssignment}
                aria-label={t("coursePlayer.homework.delete")}
                title={t("coursePlayer.homework.delete")}
              >
                <Trash2 size={14} />
              </HomeworkButton>
            ) : null}
          </HomeworkActions>

          {loading ? (
            <HomeworkCard>
              <SkeletonRow gap="10px" mb="0">
                <SkeletonCircle size="30px" />
                <Skeleton width="36%" height="14px" borderRadius="8px" mb="0" />
              </SkeletonRow>
              <Skeleton width="100%" height="42px" borderRadius="10px" />
              <Skeleton width="100%" height="68px" borderRadius="10px" />
              <SkeletonRow gap="8px" mb="0">
                <Skeleton width="50%" height="38px" borderRadius="10px" mb="0" />
                <Skeleton width="50%" height="38px" borderRadius="10px" mb="0" />
              </SkeletonRow>
            </HomeworkCard>
          ) : !selectedAssignment && !isAssignmentEditorOpen ? (
            <EmptyHomework>{t("coursePlayer.homework.emptyAssignments")}</EmptyHomework>
          ) : null}
          {!canAddMoreAssignments ? (
            <HomeworkHint>
              {t("coursePlayer.homework.errors.limitReached", {
                count: homeworkAssignmentLimit,
              })}
            </HomeworkHint>
          ) : null}

          {selectedAssignment ? (
            <>
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
                      ? new Date(selectedAssignment.deadline).toLocaleString()
                      : t("coursePlayer.homework.noDeadline")}
                  </span>
                  <span>
                    {t("coursePlayer.homework.maxScore")}: {selectedAssignment.maxScore}
                  </span>
                  <span>
                    {t("coursePlayer.homework.submissions")}:{" "}
                    {selectedAssignment.submissionCount || 0}
                  </span>
                </HomeworkMeta>
              </HomeworkCard>

              {selectedAssignment.submissions?.length ? (
                <SubmissionList>
                  {selectedAssignment.submissions.map((submission) => (
                    <SubmissionRow key={String(submission.userId)}>
                      <SubmissionHeader>
                        <SubmissionName>{submission.userName}</SubmissionName>
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
                      {submission.status === "submitted" ? (
                        <>
                          <HomeworkInput
                            type="number"
                            min="0"
                            max={selectedAssignment.maxScore || 100}
                            value={reviewScore[submission.userId] ?? submission.score ?? ""}
                            placeholder={t("coursePlayer.homework.fields.score")}
                            onChange={(event) =>
                              setReviewScore((prev) => ({
                                ...prev,
                                [submission.userId]: event.target.value,
                              }))
                            }
                          />
                          <HomeworkTextarea
                            value={
                              reviewFeedback[submission.userId] ??
                              submission.feedback ??
                              ""
                            }
                            placeholder={t("coursePlayer.homework.fields.feedback")}
                            onChange={(event) =>
                              setReviewFeedback((prev) => ({
                                ...prev,
                                [submission.userId]: event.target.value,
                              }))
                            }
                          />
                          <HomeworkActions>
                            <HomeworkButton
                              type="button"
                              onClick={() =>
                                handleReview(String(submission.userId), "needs_revision")
                              }
                            >
                              {t("coursePlayer.homework.needsRevision")}
                            </HomeworkButton>
                            <HomeworkButton
                              type="button"
                              $primary
                              onClick={() =>
                                handleReview(String(submission.userId), "reviewed")
                              }
                            >
                              {t("coursePlayer.homework.review")}
                            </HomeworkButton>
                          </HomeworkActions>
                        </>
                      ) : null}
                    </SubmissionRow>
                  ))}
                </SubmissionList>
              ) : (
                <EmptyHomework>{t("coursePlayer.homework.emptySubmissions")}</EmptyHomework>
              )}
            </>
          ) : null}
        </>
      ) : !(forceExpanded || isStudentSectionOpen) ? null : assignments.length ? (
        selectedAssignment ? (
          <>
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
              </HomeworkMeta>
            </HomeworkCard>

            <HomeworkCard>
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

                  <HomeworkActions>
                    <HomeworkButton
                      type="button"
                      $primary
                      disabled={!canSubmitStudentHomework || isUploading}
                      onClick={handleSubmitHomework}
                    >
                      {isUploading
                        ? t("coursePlayer.homework.uploading")
                        : canResubmit
                          ? t("coursePlayer.homework.resubmit")
                          : t("coursePlayer.homework.submit")}
                    </HomeworkButton>
                  </HomeworkActions>
                </>
              ) : (
                <HomeworkHint>
                  {t("coursePlayer.homework.alreadySubmitted")}
                </HomeworkHint>
              )}
            </HomeworkCard>
          </>
        ) : (
          <EmptyHomework>{t("coursePlayer.homework.emptyAssignments")}</EmptyHomework>
        )
      ) : (
        <EmptyHomework>{t("coursePlayer.homework.disabledStudent")}</EmptyHomework>
      )}

      {admin && isAssignmentEditorOpen ? (
        <ModalOverlay onClick={() => setIsAssignmentEditorOpen(false)} $zIndex={10030}>
          <ModalPanel
            onClick={(event) => event.stopPropagation()}
            $width="min(100%, 560px)"
            $maxHeight="88vh"
          >
            <ModalHeader $padding="14px 16px">
              <ModalTitleBlock>
                <ModalTitle>
                  {selectedAssignment?.title
                    ? t("coursePlayer.homework.editDialogTitle")
                    : t("coursePlayer.homework.createDialogTitle")}
                </ModalTitle>
                <ModalSubtitle>{t("coursePlayer.homework.dialogSubtitle")}</ModalSubtitle>
              </ModalTitleBlock>
              <ModalCloseButton onClick={() => setIsAssignmentEditorOpen(false)}>
                <X size={16} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody $padding="14px 16px 16px">
              <HomeworkForm>
                <HomeworkField>
                  <HomeworkFieldLabel>
                    {t("coursePlayer.homework.fields.title")}
                  </HomeworkFieldLabel>
                  <HomeworkInput
                    value={title}
                    placeholder={t("coursePlayer.homework.fields.title")}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </HomeworkField>
                <HomeworkField>
                  <HomeworkFieldLabel>
                    {t("coursePlayer.homework.fields.description")}
                  </HomeworkFieldLabel>
                  <HomeworkTextarea
                    value={description}
                    placeholder={t("coursePlayer.homework.fields.description")}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </HomeworkField>
                <HomeworkFieldRow>
                  <HomeworkField>
                    <HomeworkFieldLabel>
                      {t("coursePlayer.homework.typeLabel")}
                    </HomeworkFieldLabel>
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
                    <HomeworkFieldLabel>
                      {t("coursePlayer.homework.deadline")}
                    </HomeworkFieldLabel>
                    <HomeworkInput
                      type="datetime-local"
                      value={deadline}
                      onChange={(event) => setDeadline(event.target.value)}
                    />
                  </HomeworkField>
                </HomeworkFieldRow>
                <HomeworkFieldRow>
                  <HomeworkField>
                    <HomeworkFieldLabel>
                      {t("coursePlayer.homework.maxScore")}
                    </HomeworkFieldLabel>
                    <HomeworkInput
                      type="number"
                      min="1"
                      max="100"
                      value={maxScore}
                      onChange={(event) => setMaxScore(event.target.value)}
                    />
                  </HomeworkField>
                </HomeworkFieldRow>
              </HomeworkForm>
            </ModalBody>
            <ModalFooter $padding="12px 16px">
              <DialogActionButton
                $variant="ghost"
                onClick={() => setIsAssignmentEditorOpen(false)}
              >
                {t("common.cancel")}
              </DialogActionButton>
              <DialogActionButton onClick={handleSaveHomework}>
                {t("coursePlayer.homework.save")}
              </DialogActionButton>
            </ModalFooter>
          </ModalPanel>
        </ModalOverlay>
      ) : null}
    </HomeworkSection>
  );
};

export default CoursePlayerHomeworkSection;
