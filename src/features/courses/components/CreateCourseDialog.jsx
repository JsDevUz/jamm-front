import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  Bold,
  Heading1,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useCourses } from "../../../contexts/CoursesContext";
import * as coursesApi from "../../../api/coursesApi";
import { APP_LIMITS } from "../../../constants/appLimits";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalTitle,
} from "../../../shared/ui/dialogs/ModalShell";
import MarkdownRenderer from "../../articles/components/MarkdownRenderer";

const CATEGORY_OPTIONS = [
  { key: "ai", value: "AI & ML" },
  { key: "business", value: "Business" },
  { key: "design", value: "Design" },
  { key: "finance", value: "Finance" },
  { key: "it", value: "IT" },
  { key: "language", value: "Language" },
  { key: "management", value: "Management" },
  { key: "marketing", value: "Marketing" },
  { key: "mobile", value: "Mobile" },
  { key: "science", value: "Science" },
  { key: "school", value: "School" },
  { key: "softSkills", value: "Soft Skills" },
  { key: "smm", value: "SMM" },
  { key: "testPrep", value: "Test Prep" },
];

const LANGUAGE_SUGGESTIONS = [
  "O'zbek",
  "English",
  "Русский",
  "Türkçe",
  "Deutsch",
  "العربية",
];

const ImageUploadArea = styled.button`
  width: 100%;
  min-height: 176px;
  border: 1px dashed
    ${(props) => (props.$hasImage ? "transparent" : "var(--border-color)")};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  background: ${(props) =>
    props.$hasImage ? "var(--surface-2, rgba(255,255,255,0.02))" : "var(--input-color)"};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  padding: 16px;
  color: var(--text-color);
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: auto 12px 12px 12px;
  border-radius: 10px;
  background: rgba(18, 18, 22, 0.72);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 12px;
  text-align: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 176px;
  object-fit: cover;
  border-radius: 16px;
  display: block;
`;

const UploadText = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
  text-align: center;
  max-width: 320px;
  line-height: 1.5;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary-color);
`;

const MetaText = styled.span`
  font-size: 12px;
  color: var(--text-muted-color);
`;

const HelperText = styled.p`
  margin: 0;
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.5;
`;

const Input = styled.input`
  padding: 12px 14px;
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
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
  padding: 12px 14px;
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 180px;
  font-family: inherit;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`;

const SelectField = styled.select`
  padding: 12px 14px;
  background-color: var(--input-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const InlineSwitch = styled.div`
  display: inline-flex;
  width: fit-content;
  padding: 4px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  gap: 4px;
`;

const SwitchButton = styled.button`
  border: 0;
  border-radius: 9px;
  background: ${(props) =>
    props.$active ? "var(--menu-theme-active-bg, rgba(88, 101, 242, 0.16))" : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--text-secondary-color)"};
  font-size: 13px;
  font-weight: 600;
  padding: 10px 14px;
  cursor: pointer;
`;

const MarkdownToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
`;

const ToolButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--surface-color, transparent);
  color: var(--text-secondary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PreviewBox = styled.div`
  min-height: 180px;
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  overflow: auto;
`;

const EmptyPreview = styled.div`
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.6;
`;

const ErrorText = styled.div`
  margin-top: 4px;
  color: var(--danger-color);
  font-size: 14px;
`;

const UploadStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted-color);
`;

const resetState = {
  name: "",
  description: "",
  imageUrl: "",
  category: "IT",
  lessonLanguage: "O'zbek",
  deliveryType: "recorded",
  accessType: "free_request",
  price: 0,
  imageMode: "upload",
  descriptionMode: "write",
};

const CreateCourseDialog = ({ isOpen, onClose, onCreated, onOpenPremium }) => {
  const { t } = useTranslation();
  const { createCourse } = useCourses();
  const [name, setName] = useState(resetState.name);
  const [description, setDescription] = useState(resetState.description);
  const [imageUrl, setImageUrl] = useState(resetState.imageUrl);
  const [category, setCategory] = useState(resetState.category);
  const [lessonLanguage, setLessonLanguage] = useState(resetState.lessonLanguage);
  const [deliveryType, setDeliveryType] = useState(resetState.deliveryType);
  const [price, setPrice] = useState(resetState.price);
  const [accessType, setAccessType] = useState(resetState.accessType);
  const [imageMode, setImageMode] = useState(resetState.imageMode);
  const [descriptionMode, setDescriptionMode] = useState(resetState.descriptionMode);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const categoryOptions = useMemo(
    () =>
      CATEGORY_OPTIONS.map((option) => ({
        value: option.value,
        label: t(`createCourse.categories.${option.key}`),
      })),
    [t],
  );

  if (!isOpen) return null;

  const resetForm = () => {
    setName(resetState.name);
    setDescription(resetState.description);
    setImageUrl(resetState.imageUrl);
    setCategory(resetState.category);
    setLessonLanguage(resetState.lessonLanguage);
    setDeliveryType(resetState.deliveryType);
    setPrice(resetState.price);
    setAccessType(resetState.accessType);
    setImageMode(resetState.imageMode);
    setDescriptionMode(resetState.descriptionMode);
    setError("");
  };

  const handleClose = () => {
    if (isSubmitting || isUploadingImage) return;
    resetForm();
    onClose();
  };

  const insertMarkdown = (prefix, suffix = "", placeholder = "matn") => {
    const textarea = descriptionInputRef.current;
    if (!textarea) {
      setDescription((prev) => `${prev}${prefix}${placeholder}${suffix}`);
      return;
    }

    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const selected = description.slice(start, end) || placeholder;
    const nextValue =
      description.slice(0, start) +
      prefix +
      selected +
      suffix +
      description.slice(end);

    setDescription(nextValue.slice(0, APP_LIMITS.courseDescriptionChars));

    requestAnimationFrame(() => {
      textarea.focus();
      const nextCursor = start + prefix.length + selected.length + suffix.length;
      textarea.setSelectionRange(nextCursor, nextCursor);
    });
  };

  const handleImageUploadClick = () => {
    if (imageMode !== "upload" || isUploadingImage) return;
    fileInputRef.current?.click();
  };

  const handleImageFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > APP_LIMITS.courseImageBytes) {
      setError(t("createCourse.imageTooLarge"));
      event.target.value = "";
      return;
    }

    setError("");
    setIsUploadingImage(true);

    try {
      const response = await coursesApi.uploadCourseImage(file);
      setImageUrl(response?.url || "");
      setImageMode("upload");
    } catch (uploadError) {
      setError(uploadError?.response?.data?.message || uploadError?.message || t("createCourse.uploadError"));
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) return;

    setError("");
    setIsSubmitting(true);

    try {
      const courseId = await createCourse({
        name: name.trim(),
        description: description.trim(),
        image: imageUrl.trim(),
        category: category.trim(),
        lessonLanguage: lessonLanguage.trim(),
        deliveryType,
        price: accessType === "paid" ? Number(price || 0) : 0,
        accessType,
      });

      resetForm();
      onCreated(courseId);
    } catch (err) {
      const message = err?.message || "";
      if (message.includes("Premium") || message.includes("maksimal")) {
        onClose();
        if (onOpenPremium) onOpenPremium();
      } else {
        setError(message || t("createCourse.error"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClose();
  };

  return (
    <ModalOverlay onClick={handleClose} onKeyDown={handleKeyDown}>
      <ModalPanel
        $width="min(100%, 760px)"
        $maxWidth="95vw"
        $maxHeight="min(90vh, 920px)"
        $radius="20px"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader $padding="16px 18px">
          <ModalTitle>{t("createCourse.title")}</ModalTitle>
          <ModalCloseButton onClick={handleClose} disabled={isSubmitting || isUploadingImage}>
            <X size={18} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody $padding="16px 18px 18px">
          <Section>
            <InputGroup>
              <Label>{t("createCourse.cover")}</Label>
              <InlineSwitch>
                <SwitchButton
                  type="button"
                  $active={imageMode === "upload"}
                  onClick={() => setImageMode("upload")}
                >
                  {t("createCourse.imageModes.upload")}
                </SwitchButton>
                <SwitchButton
                  type="button"
                  $active={imageMode === "link"}
                  onClick={() => setImageMode("link")}
                >
                  {t("createCourse.imageModes.link")}
                </SwitchButton>
              </InlineSwitch>

              <ImageUploadArea
                type="button"
                onClick={handleImageUploadClick}
                $hasImage={Boolean(imageUrl)}
              >
                {imageUrl ? (
                  <>
                    <PreviewImage
                      src={imageUrl}
                      alt="Course"
                      onError={() => setImageUrl("")}
                    />
                    {imageMode === "upload" ? (
                      <ImageOverlay>{t("createCourse.imageChange")}</ImageOverlay>
                    ) : null}
                  </>
                ) : (
                  <>
                    {isUploadingImage ? (
                      <Loader2 size={28} className="spin" />
                    ) : imageMode === "upload" ? (
                      <Upload size={30} color="var(--text-muted-color)" />
                    ) : (
                      <ImageIcon size={30} color="var(--text-muted-color)" />
                    )}
                    <UploadText>
                      {imageMode === "upload"
                        ? t("createCourse.imagePrompt")
                        : t("createCourse.imageLinkPrompt")}
                    </UploadText>
                  </>
                )}
              </ImageUploadArea>

              <HiddenFileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
              />

              {imageMode === "link" ? (
                <Input
                  type="url"
                  placeholder="https://example.com/course-cover.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              ) : (
                <HelperText>{t("createCourse.imageUploadHint")}</HelperText>
              )}

              {isUploadingImage ? (
                <UploadStatus>
                  <Loader2 size={14} className="spin" />
                  <span>{t("createCourse.uploadingImage")}</span>
                </UploadStatus>
              ) : null}
            </InputGroup>

            <ResponsiveGrid>
              <InputGroup>
                <LabelRow>
                  <Label>{t("createCourse.name")}</Label>
                  <MetaText>
                    {name.length}/{APP_LIMITS.courseNameChars}
                  </MetaText>
                </LabelRow>
                <Input
                  type="text"
                  placeholder={t("createCourse.namePlaceholder")}
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value.slice(0, APP_LIMITS.courseNameChars))
                  }
                  maxLength={APP_LIMITS.courseNameChars}
                  autoFocus
                />
              </InputGroup>

              <InputGroup>
                <Label>{t("createCourse.category")}</Label>
                <SelectField
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>
              </InputGroup>

              <InputGroup>
                <Label>{t("createCourse.lessonLanguage")}</Label>
                <Input
                  list="course-language-options"
                  placeholder={t("createCourse.lessonLanguagePlaceholder")}
                  value={lessonLanguage}
                  onChange={(e) => setLessonLanguage(e.target.value.slice(0, 40))}
                  maxLength={40}
                />
                <datalist id="course-language-options">
                  {LANGUAGE_SUGGESTIONS.map((language) => (
                    <option key={language} value={language} />
                  ))}
                </datalist>
              </InputGroup>

              <InputGroup>
                <Label>{t("createCourse.deliveryType")}</Label>
                <SelectField
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                >
                  <option value="recorded">
                    {t("createCourse.delivery.recorded")}
                  </option>
                  <option value="ongoing">
                    {t("createCourse.delivery.ongoing")}
                  </option>
                </SelectField>
              </InputGroup>

              <InputGroup>
                <Label>{t("createCourse.accessType")}</Label>
                <SelectField
                  value={accessType}
                  onChange={(e) => setAccessType(e.target.value)}
                >
                  <option value="free_request">
                    {t("createCourse.access.freeRequest")}
                  </option>
                  <option value="free_open">
                    {t("createCourse.access.freeOpen")}
                  </option>
                  <option value="paid">{t("createCourse.access.paid")}</option>
                </SelectField>
              </InputGroup>

              <InputGroup>
                <Label>{t("createCourse.price")}</Label>
                <Input
                  type="number"
                  min="0"
                  placeholder={t("createCourse.pricePlaceholder")}
                  value={accessType === "paid" ? price : 0}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  disabled={accessType !== "paid"}
                />
              </InputGroup>
            </ResponsiveGrid>

            <InputGroup>
              <LabelRow>
                <Label>{t("createCourse.description")}</Label>
                <MetaText>
                  {description.length}/{APP_LIMITS.courseDescriptionChars}
                </MetaText>
              </LabelRow>

              <InlineSwitch>
                <SwitchButton
                  type="button"
                  $active={descriptionMode === "write"}
                  onClick={() => setDescriptionMode("write")}
                >
                  {t("createCourse.descriptionModes.write")}
                </SwitchButton>
                <SwitchButton
                  type="button"
                  $active={descriptionMode === "preview"}
                  onClick={() => setDescriptionMode("preview")}
                >
                  {t("createCourse.descriptionModes.preview")}
                </SwitchButton>
              </InlineSwitch>

              <MarkdownToolbar>
                <ToolButton
                  type="button"
                  title={t("createCourse.markdown.bold")}
                  onClick={() => insertMarkdown("**", "**")}
                >
                  <Bold size={16} />
                </ToolButton>
                <ToolButton
                  type="button"
                  title={t("createCourse.markdown.italic")}
                  onClick={() => insertMarkdown("_", "_")}
                >
                  <Italic size={16} />
                </ToolButton>
                <ToolButton
                  type="button"
                  title={t("createCourse.markdown.heading")}
                  onClick={() => insertMarkdown("## ", "", t("createCourse.markdown.headingPlaceholder"))}
                >
                  <Heading1 size={16} />
                </ToolButton>
                <ToolButton
                  type="button"
                  title={t("createCourse.markdown.list")}
                  onClick={() => insertMarkdown("- ", "", t("createCourse.markdown.listPlaceholder"))}
                >
                  <List size={16} />
                </ToolButton>
                <ToolButton
                  type="button"
                  title={t("createCourse.markdown.link")}
                  onClick={() => insertMarkdown("[", "](https://)", t("createCourse.markdown.linkPlaceholder"))}
                >
                  <LinkIcon size={16} />
                </ToolButton>
              </MarkdownToolbar>

              {descriptionMode === "write" ? (
                <TextArea
                  ref={descriptionInputRef}
                  placeholder={t("createCourse.descriptionPlaceholder")}
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value.slice(0, APP_LIMITS.courseDescriptionChars),
                    )
                  }
                  maxLength={APP_LIMITS.courseDescriptionChars}
                />
              ) : (
                <PreviewBox>
                  {description.trim() ? (
                    <MarkdownRenderer content={description} />
                  ) : (
                    <EmptyPreview>{t("createCourse.previewEmpty")}</EmptyPreview>
                  )}
                </PreviewBox>
              )}
            </InputGroup>

            {error ? <ErrorText>{error}</ErrorText> : null}
          </Section>
        </ModalBody>

        <ModalFooter $padding="14px 18px">
          <DialogActionButton
            $variant="ghost"
            onClick={handleClose}
            disabled={isSubmitting || isUploadingImage}
          >
            {t("common.cancel")}
          </DialogActionButton>
          <DialogActionButton
            $variant="primary"
            onClick={handleCreate}
            disabled={!name.trim() || isSubmitting || isUploadingImage}
          >
            {isSubmitting ? t("createCourse.creating") : t("common.create")}
          </DialogActionButton>
        </ModalFooter>
      </ModalPanel>
    </ModalOverlay>
  );
};

export default CreateCourseDialog;
