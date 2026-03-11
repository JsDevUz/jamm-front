import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useCourses } from "../../../contexts/CoursesContext";
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

const ImageUploadArea = styled.div`
  width: 100%;
  height: 140px;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.hasImage
      ? `
    border: none;
  `
      : `
    &:hover {
      border-color: var(--primary-color);
      background-color: rgba(88, 101, 242, 0.05);
    }
  `}
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
  font-size: 14px;
  font-weight: 500;

  ${ImageUploadArea}:hover & {
    opacity: 1;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const UploadText = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary-color);
`;

const Input = styled.input`
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`;

const SelectField = styled.select`
  padding: 10px 14px;
  background-color: var(--input-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  outline: none;
`;

const ErrorText = styled.div`
  margin-top: 8px;
  color: var(--danger-color);
  font-size: 14px;
`;

const CreateCourseDialog = ({ isOpen, onClose, onCreated, onOpenPremium }) => {
  const { t } = useTranslation();
  const { createCourse } = useCourses();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("IT");
  const [price, setPrice] = useState(0);
  const [accessType, setAccessType] = useState("free_request");
  const fileInputRef = useRef(null);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!name.trim()) return;
    setError("");
    setIsSubmitting(true);

    try {
      const courseId = await createCourse(
        name.trim(),
        description.trim(),
        imageUrl,
        category,
        price,
        accessType,
      );
      setName("");
      setDescription("");
      setImageUrl("");
      setCategory("IT");
      setPrice(0);
      setAccessType("free_request");
      onCreated(courseId);
    } catch (err) {
      if (err.message.includes("Premium") || err.message.includes("maksimal")) {
        onClose();
        if (onOpenPremium) onOpenPremium();
      } else {
        setError(err.message || t("createCourse.error"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <ModalOverlay onClick={onClose} onKeyDown={handleKeyDown}>
      <ModalPanel
        $width="min(100%, 520px)"
        $maxWidth="95vw"
        $maxHeight="min(88vh, 760px)"
        $radius="18px"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader $padding="16px 18px">
          <ModalTitle>{t("createCourse.title")}</ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <X size={18} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody $padding="16px 18px 18px">
          <ImageUploadArea hasImage={!!imageUrl}>
            {imageUrl ? (
              <>
                <PreviewImage
                  src={imageUrl}
                  alt="Course"
                  onError={() => setImageUrl("")}
                />
                <ImageOverlay>{t("createCourse.imageChange")}</ImageOverlay>
              </>
            ) : (
              <>
                <ImageIcon size={32} color="var(--text-muted-color)" />
                <UploadText>{t("createCourse.imagePrompt")}</UploadText>
              </>
            )}
          </ImageUploadArea>

          <InputGroup>
            <Label>{t("createCourse.imageUrl")}</Label>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={handleImageUrlChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>{t("createCourse.name")}</Label>
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
              <option value="IT">{t("createCourse.categories.it")}</option>
              <option value="SMM">{t("createCourse.categories.smm")}</option>
              <option value="Til o'rganish">{t("createCourse.categories.language")}</option>
              <option value="Mobile">{t("createCourse.categories.mobile")}</option>
              <option value="Design">{t("createCourse.categories.design")}</option>
            </SelectField>
          </InputGroup>

          <InputGroup>
            <Label>{t("createCourse.accessType")}</Label>
            <SelectField
              value={accessType}
              onChange={(e) => setAccessType(e.target.value)}
            >
              <option value="free_request">{t("createCourse.access.freeRequest")}</option>
              <option value="free_open">{t("createCourse.access.freeOpen")}</option>
              <option value="paid">{t("createCourse.access.paid")}</option>
            </SelectField>
          </InputGroup>

          {accessType === "paid" && (
            <InputGroup>
              <Label>{t("createCourse.price")}</Label>
              <Input
                type="number"
                min="0"
                placeholder={t("createCourse.pricePlaceholder")}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </InputGroup>
          )}

          <InputGroup>
            <Label>{t("createCourse.description")}</Label>
            <TextArea
              placeholder={t("createCourse.descriptionPlaceholder")}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value.slice(0, APP_LIMITS.courseDescriptionChars),
                )
              }
              maxLength={APP_LIMITS.courseDescriptionChars}
            />
          </InputGroup>

          {error && <ErrorText>{error}</ErrorText>}
        </ModalBody>

        <ModalFooter $padding="14px 18px">
          <DialogActionButton
            $variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {t("common.cancel")}
          </DialogActionButton>
          <DialogActionButton
            $variant="primary"
            onClick={handleCreate}
            disabled={!name.trim() || isSubmitting}
          >
            {isSubmitting ? t("createCourse.creating") : t("common.create")}
          </DialogActionButton>
        </ModalFooter>
      </ModalPanel>
    </ModalOverlay>
  );
};

export default CreateCourseDialog;
