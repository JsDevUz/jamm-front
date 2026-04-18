import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, Eye, ExternalLink, Plus, Trash2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../../../../api/axiosInstance";
import { APP_LIMITS, getTierLimit } from "../../../../constants/appLimits";
import { useCourses } from "../../../../contexts/CoursesContext";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import {
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../../../shared/ui/dialogs/ModalShell";
import {
  EmptyMaterials,
  MaterialActions,
  MaterialButton,
  MaterialButtonRow,
  MaterialCard,
  MaterialField,
  MaterialFileInput,
  MaterialForm,
  MaterialInput,
  MaterialLabel,
  MaterialLink,
  MaterialMeta,
  MaterialName,
  MaterialPreviewFrame,
  MaterialSub,
  MaterialsHeader,
  MaterialsHint,
  MaterialsList,
  MaterialsSection,
  MaterialsTitle,
  MaterialsTitleWrap,
  MaterialsViewer,
} from "./CoursePlayerMaterialsSection.styles";

const formatFileSize = (bytes) => {
  if (!bytes) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** index).toFixed(2))} ${units[index]}`;
};

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

const getMaterialKey = (item) =>
  String(item?.materialId || item?._id || item?.id || item?.fileUrl || "");

const CoursePlayerMaterialsSection = () => {
  const { t } = useTranslation();
  const {
    getLessonMaterials,
    upsertLessonMaterial,
    deleteLessonMaterial,
    updateLesson,
  } = useCourses();
  const { admin, courseId, currentLessonData, currentUser } = useCoursePlayerContext();
  const lessonId =
    currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [previewMaterial, setPreviewMaterial] = useState(null);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialFile, setMaterialFile] = useState(null);
  const [isSavingMaterial, setIsSavingMaterial] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isSavingVideo, setIsSavingVideo] = useState(false);
  const materialFileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);

  const lessonMediaItems = useMemo(
    () => normalizeLessonMediaItems(currentLessonData),
    [currentLessonData],
  );
  const videoLimit = useMemo(
    () => getTierLimit(APP_LIMITS.lessonVideosPerLesson, currentUser),
    [currentUser],
  );

  const loadMaterials = useCallback(async () => {
    if (!courseId || !lessonId) {
      setItems([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getLessonMaterials(courseId, lessonId);
      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch (error) {
      console.error(error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [courseId, getLessonMaterials, lessonId]);

  useEffect(() => {
    loadMaterials();
  }, [loadMaterials]);

  useEffect(() => {
    if (!items.length) {
      setSelectedMaterialId(null);
      setPreviewMaterial(null);
      return;
    }

    const hasSelected = items.some(
      (item) => getMaterialKey(item) === String(selectedMaterialId || ""),
    );
    if (!hasSelected) {
      setSelectedMaterialId(getMaterialKey(items[0]) || null);
    }
  }, [items, selectedMaterialId]);

  useEffect(() => {
    if (!previewMaterial) return;

    const hasPreviewTarget = items.some(
      (item) => getMaterialKey(item) === getMaterialKey(previewMaterial),
    );

    if (!hasPreviewTarget) {
      setPreviewMaterial(null);
    }
  }, [items, previewMaterial]);

  useEffect(() => {
    setPreviewMaterial(null);
  }, [lessonId]);

  useEffect(() => {
    setVideoTitle(currentLessonData?.title || "");
  }, [currentLessonData?.title]);

  const uploadFile = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axiosInstance.post("/courses/upload-media", formData);
    return data;
  }, []);

  const resetMaterialForm = useCallback(() => {
    setMaterialTitle("");
    setMaterialFile(null);
    if (materialFileInputRef.current) {
      materialFileInputRef.current.value = "";
    }
  }, []);

  const resetVideoForm = useCallback(() => {
    setVideoFile(null);
    if (videoFileInputRef.current) {
      videoFileInputRef.current.value = "";
    }
  }, []);

  const handleSaveMaterial = useCallback(async () => {
    if (!courseId || !lessonId || !materialFile) return;

    const fileName = String(materialFile.name || "").toLowerCase();
    if (!fileName.endsWith(".pdf")) {
      toast.error(
        t("coursePlayer.materials.errors.pdfOnly", {
          defaultValue: "Faqat PDF fayl yuklash mumkin",
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
      resetMaterialForm();
      await loadMaterials();
      toast.success(
        t("coursePlayer.materials.saved", {
          defaultValue: "Material saqlandi",
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || t("coursePlayer.materials.uploadError"),
      );
    } finally {
      setIsSavingMaterial(false);
    }
  }, [
    courseId,
    lessonId,
    loadMaterials,
    materialFile,
    materialTitle,
    resetMaterialForm,
    t,
    uploadFile,
    upsertLessonMaterial,
  ]);

  const handleDeleteMaterial = useCallback(
    async (materialId) => {
      try {
        await deleteLessonMaterial(courseId, lessonId, materialId);
        await loadMaterials();
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message || t("coursePlayer.materials.deleteError"),
        );
      }
    },
    [courseId, deleteLessonMaterial, lessonId, loadMaterials, t],
  );

  const handleSaveVideo = useCallback(async () => {
    if (!courseId || !lessonId || !videoFile) return;

    if (lessonMediaItems.length >= videoLimit) {
      toast.error(
        t("coursePlayer.materials.errors.videoLimit", {
          count: videoLimit,
          defaultValue: `Bu darsga maksimal ${videoLimit} ta video qo'shish mumkin`,
        }),
      );
      return;
    }

    const nextTotalBytes =
      lessonMediaItems.reduce((sum, item) => sum + Number(item.fileSize || 0), 0) +
      Number(videoFile.size || 0);
    if (nextTotalBytes > APP_LIMITS.lessonMediaBytes) {
      toast.error(
        t("coursePlayer.materials.errors.videoTooLarge", {
          size: Math.round(APP_LIMITS.lessonMediaBytes / (1024 * 1024)),
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
      const nextMediaItems = [
        ...lessonMediaItems.map((item) => ({
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
      ];

      await updateLesson(courseId, lessonId, {
        mediaItems: nextMediaItems,
      });
      resetVideoForm();
      toast.success(
        t("coursePlayer.materials.videoSaved", {
          defaultValue: "Dars videosi saqlandi",
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          t("coursePlayer.materials.errors.videoUpload", {
            defaultValue: "Videoni yuklab bo'lmadi",
          }),
      );
    } finally {
      setIsSavingVideo(false);
    }
  }, [
    courseId,
    lessonId,
    lessonMediaItems,
    resetVideoForm,
    t,
    updateLesson,
    uploadFile,
    videoFile,
    videoLimit,
    videoTitle,
  ]);

  const handleDeleteVideo = useCallback(
    async (mediaIndex) => {
      try {
        const nextMediaItems = lessonMediaItems
          .filter((_, index) => index !== mediaIndex)
          .map((item) => ({
            title: item.title,
            videoUrl: item.videoUrl,
            fileUrl: item.fileUrl,
            fileName: item.fileName,
            fileSize: item.fileSize,
            durationSeconds: item.durationSeconds,
            streamType: item.streamType,
            streamAssets: item.streamAssets,
            hlsKeyAsset: item.hlsKeyAsset,
          }));

        await updateLesson(courseId, lessonId, {
          mediaItems: nextMediaItems,
        });
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
            t("coursePlayer.materials.errors.videoDelete", {
              defaultValue: "Videoni o'chirib bo'lmadi",
            }),
        );
      }
    },
    [courseId, lessonId, lessonMediaItems, t, updateLesson],
  );
  const selectedMaterial =
    items.find(
      (item) => getMaterialKey(item) === String(selectedMaterialId || ""),
    ) || items[0] || null;
  const isPreviewOpen = Boolean(getMaterialKey(previewMaterial)) && Boolean(previewMaterial?.fileUrl);

  return (
    <>
      <MaterialsSection $admin={admin}>
        <MaterialsHeader>
          <MaterialsTitleWrap>
            <MaterialsTitle>{t("coursePlayer.materials.title")}</MaterialsTitle>
            <MaterialsHint>
              {admin
                ? t("coursePlayer.materials.adminHint")
                : t("coursePlayer.materials.studentHint")}
            </MaterialsHint>
          </MaterialsTitleWrap>
        </MaterialsHeader>

        {admin ? (
          <MaterialsList>
            <MaterialCard>
              <MaterialMeta>
                <MaterialName>
                  {t("coursePlayer.materials.videoTitle", {
                    defaultValue: "Dars videosi",
                  })}
                </MaterialName>
                <MaterialSub>
                  {t("coursePlayer.materials.videoHint", {
                    count: videoLimit,
                    defaultValue:
                      "Dars uchun video yoki lesson media faylini shu yerda qo'shing.",
                  })}
                </MaterialSub>
              </MaterialMeta>

              <MaterialForm>
                <MaterialField>
                  <MaterialLabel>
                    {t("coursePlayer.materials.fields.videoTitle", {
                      defaultValue: "Video nomi",
                    })}
                  </MaterialLabel>
                  <MaterialInput
                    value={videoTitle}
                    onChange={(event) => setVideoTitle(event.target.value)}
                    placeholder={t("coursePlayer.materials.fields.videoTitlePlaceholder", {
                      defaultValue: "Masalan: 1-dars video",
                    })}
                  />
                </MaterialField>

                <MaterialField>
                  <MaterialLabel>
                    {t("coursePlayer.materials.fields.videoFile", {
                      defaultValue: "Video fayli",
                    })}
                  </MaterialLabel>
                  <MaterialFileInput
                    ref={videoFileInputRef}
                    type="file"
                    accept="video/*,.mp4,.mov,.webm,.mkv,.m4v"
                    onChange={(event) => setVideoFile(event.target.files?.[0] || null)}
                  />
                </MaterialField>

                {videoFile ? (
                  <MaterialSub>
                    {videoFile.name} · {formatFileSize(videoFile.size)}
                  </MaterialSub>
                ) : null}

                <MaterialButtonRow>
                  <MaterialButton
                    type="button"
                    $primary
                    disabled={!videoFile || isSavingVideo}
                    onClick={handleSaveVideo}
                  >
                    {isSavingVideo ? (
                      t("coursePlayer.materials.uploadingVideo", {
                        defaultValue: "Yuklanmoqda...",
                      })
                    ) : (
                      <>
                        <Upload size={14} />
                        {t("coursePlayer.materials.addVideo", {
                          defaultValue: "Video qo'shish",
                        })}
                      </>
                    )}
                  </MaterialButton>
                </MaterialButtonRow>
              </MaterialForm>
            </MaterialCard>

            {lessonMediaItems.length ? (
              lessonMediaItems.map((item, index) => (
                <MaterialCard key={item.mediaId || item.fileUrl || index}>
                  <MaterialMeta>
                    <MaterialName>{item.title || `Video ${index + 1}`}</MaterialName>
                    <MaterialSub>
                      {item.fileName || item.videoUrl || item.fileUrl} ·{" "}
                      {formatFileSize(item.fileSize || 0)}
                    </MaterialSub>
                  </MaterialMeta>
                  <MaterialActions>
                    <MaterialLink
                      href={item.videoUrl || item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={14} />
                    </MaterialLink>
                    <MaterialButton
                      type="button"
                      $iconOnly
                      onClick={() => handleDeleteVideo(index)}
                    >
                      <Trash2 size={14} />
                    </MaterialButton>
                  </MaterialActions>
                </MaterialCard>
              ))
            ) : (
              <MaterialCard>
                <MaterialMeta>
                  <MaterialName>
                    {t("coursePlayer.materials.emptyMedia", {
                      defaultValue: "Hali dars videosi qo'shilmagan",
                    })}
                  </MaterialName>
                </MaterialMeta>
              </MaterialCard>
            )}

            <MaterialCard>
              <MaterialMeta>
                <MaterialName>
                  {t("coursePlayer.materials.materialsTitle", {
                    defaultValue: "Dars materiallari",
                  })}
                </MaterialName>
                <MaterialSub>
                  {t("coursePlayer.materials.dialogSubtitle")}
                </MaterialSub>
              </MaterialMeta>

              <MaterialForm>
                <MaterialField>
                  <MaterialLabel>{t("coursePlayer.materials.fields.title")}</MaterialLabel>
                  <MaterialInput
                    value={materialTitle}
                    onChange={(event) => setMaterialTitle(event.target.value)}
                    placeholder={t("coursePlayer.materials.fields.titlePlaceholder")}
                  />
                </MaterialField>

                <MaterialField>
                  <MaterialLabel>{t("coursePlayer.materials.fields.file")}</MaterialLabel>
                  <MaterialFileInput
                    ref={materialFileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={(event) => setMaterialFile(event.target.files?.[0] || null)}
                  />
                </MaterialField>

                {materialFile ? (
                  <MaterialSub>
                    {materialFile.name} · {formatFileSize(materialFile.size)}
                  </MaterialSub>
                ) : null}

                <MaterialButtonRow>
                  <MaterialButton
                    type="button"
                    $primary
                    disabled={!materialFile || isSavingMaterial}
                    onClick={handleSaveMaterial}
                  >
                    {isSavingMaterial ? (
                      t("coursePlayer.materials.uploadingMaterial", {
                        defaultValue: "Yuklanmoqda...",
                      })
                    ) : (
                      <>
                        <Plus size={14} />
                        {t("coursePlayer.materials.add")}
                      </>
                    )}
                  </MaterialButton>
                </MaterialButtonRow>
              </MaterialForm>
            </MaterialCard>
          </MaterialsList>
        ) : null}

        {loading ? null : items.length ? (
          admin ? (
            <MaterialsList>
              {items.map((item) => {
                return (
                  <MaterialCard key={getMaterialKey(item)}>
                    <MaterialMeta>
                      <MaterialName>{item.title || item.fileName}</MaterialName>
                      <MaterialSub>
                        {item.fileName} · {formatFileSize(item.fileSize || 0)}
                      </MaterialSub>
                    </MaterialMeta>
                    <MaterialActions>
                      <MaterialLink href={item.fileUrl} target="_blank" rel="noreferrer">
                        <ExternalLink size={14} />
                      </MaterialLink>
                      <MaterialButton
                        type="button"
                        $iconOnly
                        onClick={() => handleDeleteMaterial(item.materialId || item._id || item.id)}
                      >
                        <Trash2 size={14} />
                      </MaterialButton>
                    </MaterialActions>
                  </MaterialCard>
                );
              })}
            </MaterialsList>
          ) : (
            <MaterialsViewer>
              <MaterialsList>
                {items.map((item) => {
                  const isActive =
                    String(item.materialId) === String(selectedMaterial?.materialId || "");

                  return (
                    <MaterialCard
                      key={getMaterialKey(item)}
                      style={{
                        borderColor: isActive ? "var(--primary-color)" : "var(--border-color)",
                      }}
                    >
                      <MaterialMeta>
                        <MaterialName>{item.title || item.fileName}</MaterialName>
                        <MaterialSub>
                          {item.fileName} · {formatFileSize(item.fileSize || 0)}
                        </MaterialSub>
                      </MaterialMeta>
                      <MaterialActions>
                        <MaterialButton
                          type="button"
                          $iconOnly
                          onClick={() => {
                            setSelectedMaterialId(getMaterialKey(item));
                            setPreviewMaterial(item);
                          }}
                          title={t("common.view", { defaultValue: "Ko'rish" })}
                          aria-label={t("common.view", { defaultValue: "Ko'rish" })}
                        >
                          <Eye size={14} />
                        </MaterialButton>
                        <MaterialLink
                          href={item.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          download
                          title={t("common.download", { defaultValue: "Yuklab olish" })}
                          aria-label={t("common.download", { defaultValue: "Yuklab olish" })}
                        >
                          <Download size={14} />
                        </MaterialLink>
                      </MaterialActions>
                    </MaterialCard>
                  );
                })}
              </MaterialsList>
            </MaterialsViewer>
          )
        ) : (
          <EmptyMaterials>
            {t("coursePlayer.materials.emptyState", {
              defaultValue: "Dars materiallari mavjud emas",
            })}
          </EmptyMaterials>
        )}
      </MaterialsSection>

      {isPreviewOpen ? (
        <ModalOverlay onClick={() => setPreviewMaterial(null)}>
          <ModalPanel
            $width="min(100%, 1100px)"
            $maxHeight="92vh"
            onClick={(event) => event.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitleBlock>
                <ModalTitle>
                  {previewMaterial.title || previewMaterial.fileName || "PDF material"}
                </ModalTitle>
                <ModalSubtitle>
                  {previewMaterial.fileName} · {formatFileSize(previewMaterial.fileSize || 0)}
                </ModalSubtitle>
              </ModalTitleBlock>
              <ModalCloseButton
                type="button"
                onClick={() => setPreviewMaterial(null)}
                aria-label="Close"
              >
                <X size={18} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody $padding="12px">
              <MaterialPreviewFrame
                src={previewMaterial.fileUrl}
                title={previewMaterial.title || previewMaterial.fileName || "Lesson material"}
              />
            </ModalBody>
          </ModalPanel>
        </ModalOverlay>
      ) : null}
    </>
  );
};

export default CoursePlayerMaterialsSection;
