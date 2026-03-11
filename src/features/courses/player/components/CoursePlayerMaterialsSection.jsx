import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../../../../api/axiosInstance";
import { useCourses } from "../../../../contexts/CoursesContext";
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
  SkeletonRow,
} from "../../../../shared/ui/feedback/Skeleton";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import {
  EmptyMaterials,
  MaterialActions,
  MaterialCard,
  MaterialField,
  MaterialFileInput,
  MaterialInput,
  MaterialsHeaderActions,
  MaterialLabel,
  MaterialLink,
  MaterialMeta,
  MaterialName,
  MaterialSub,
  MaterialsAction,
  MaterialsHeader,
  MaterialsHint,
  MaterialsList,
  MaterialsSection,
  MaterialsTitle,
  MaterialsTitleWrap,
} from "./CoursePlayerMaterialsSection.styles";

const formatFileSize = (bytes) => {
  if (!bytes) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** index).toFixed(2))} ${units[index]}`;
};

const CoursePlayerMaterialsSection = ({
  forceExpanded = false,
  showCollapseToggle = true,
}) => {
  const { t } = useTranslation();
  const { getLessonMaterials, upsertLessonMaterial, deleteLessonMaterial } = useCourses();
  const { admin, courseId, currentLessonData } = useCoursePlayerContext();
  const lessonId =
    currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(admin);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSectionOpen(admin);
  }, [admin]);

  useEffect(() => {
    if (forceExpanded) {
      setIsSectionOpen(true);
    }
  }, [forceExpanded]);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setTitle("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedFile || !courseId || !lessonId) return;

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const { data } = await axiosInstance.post("/courses/upload-media", formData);
      await upsertLessonMaterial(courseId, lessonId, {
        title: title.trim() || selectedFile.name.replace(/\.pdf$/i, ""),
        fileUrl: data.fileUrl || data.url || "",
        fileName: data.fileName || selectedFile.name,
        fileSize: data.fileSize || selectedFile.size || 0,
      });
      await loadMaterials();
      closeDialog();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || t("coursePlayer.materials.uploadError"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [
    closeDialog,
    courseId,
    lessonId,
    loadMaterials,
    selectedFile,
    t,
    title,
    upsertLessonMaterial,
  ]);

  const handleDelete = useCallback(
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

  return (
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
          <MaterialsHeaderActions>
          {admin ? (
            <MaterialsAction
              type="button"
              onClick={() => setIsDialogOpen(true)}
              title={t("coursePlayer.materials.add")}
              aria-label={t("coursePlayer.materials.add")}
            >
              <Plus size={15} />
            </MaterialsAction>
          ) : null}
          {showCollapseToggle ? (
            <MaterialsAction
              type="button"
              onClick={() => setIsSectionOpen((prev) => !prev)}
              title={
                isSectionOpen
                  ? t("coursePlayer.materials.collapse")
                  : t("coursePlayer.materials.expand")
              }
              aria-label={
                isSectionOpen
                  ? t("coursePlayer.materials.collapse")
                  : t("coursePlayer.materials.expand")
              }
            >
              {isSectionOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </MaterialsAction>
          ) : null}
        </MaterialsHeaderActions>
      </MaterialsHeader>

      {(forceExpanded || isSectionOpen) ? loading ? (
        <MaterialsList>
          {[0, 1, 2].map((item) => (
            <MaterialCard key={item}>
              <MaterialMeta>
                <Skeleton width="132px" height="13px" borderRadius="8px" />
                <Skeleton width="184px" height="11px" borderRadius="8px" mb="0" />
              </MaterialMeta>
              <SkeletonRow gap="6px" mb="0">
                <Skeleton width="30px" height="30px" borderRadius="9px" mb="0" />
                {admin ? (
                  <Skeleton width="30px" height="30px" borderRadius="9px" mb="0" />
                ) : null}
              </SkeletonRow>
            </MaterialCard>
          ))}
        </MaterialsList>
      ) : items.length ? (
        <MaterialsList>
          {items.map((item) => (
            <MaterialCard key={item.materialId}>
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
                {admin ? (
                  <MaterialsAction
                    type="button"
                    onClick={() => handleDelete(item.materialId)}
                    title={t("common.delete")}
                    aria-label={t("common.delete")}
                  >
                    <Trash2 size={14} />
                  </MaterialsAction>
                ) : null}
              </MaterialActions>
            </MaterialCard>
          ))}
        </MaterialsList>
      ) : (
        <EmptyMaterials>{t("coursePlayer.materials.empty")}</EmptyMaterials>
      ) : null}

      {isDialogOpen ? (
        <ModalOverlay onClick={closeDialog} $zIndex={10031}>
          <ModalPanel
            onClick={(event) => event.stopPropagation()}
            $width="min(100%, 420px)"
            $mobileFull={false}
          >
            <ModalHeader>
              <ModalTitleBlock>
                <ModalTitle>{t("coursePlayer.materials.dialogTitle")}</ModalTitle>
                <ModalSubtitle>
                  {t("coursePlayer.materials.dialogSubtitle")}
                </ModalSubtitle>
              </ModalTitleBlock>
              <ModalCloseButton type="button" onClick={closeDialog}>
                <X size={15} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <MaterialField>
                <MaterialLabel>{t("coursePlayer.materials.fields.title")}</MaterialLabel>
                <MaterialInput
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder={t("coursePlayer.materials.fields.titlePlaceholder")}
                />
              </MaterialField>
              <MaterialField>
                <MaterialLabel>{t("coursePlayer.materials.fields.file")}</MaterialLabel>
                <MaterialFileInput
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
                />
              </MaterialField>
              {selectedFile ? (
                <MaterialSub>
                  <FileText size={14} /> {selectedFile.name} ·{" "}
                  {formatFileSize(selectedFile.size || 0)}
                </MaterialSub>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <DialogActionButton type="button" $variant="ghost" onClick={closeDialog}>
                {t("common.cancel")}
              </DialogActionButton>
              <DialogActionButton
                type="button"
                onClick={handleSubmit}
                disabled={!selectedFile || isSubmitting}
              >
                {t("common.save")}
              </DialogActionButton>
            </ModalFooter>
          </ModalPanel>
        </ModalOverlay>
      ) : null}
    </MaterialsSection>
  );
};

export default CoursePlayerMaterialsSection;
