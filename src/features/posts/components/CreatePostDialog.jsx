import React, { useEffect, useRef, useState } from "react";
import { Bold, Hash, ImagePlus, Italic, Loader2, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import { APP_LIMITS, countWords, isPremiumUser } from "../../../constants/appLimits";
import { uploadPostImage } from "../../../api/postsApi";
import { generatePostImagePlaceholder } from "../utils/postImagePlaceholder";
import {
  AttachmentCard,
  AttachmentRemoveButton,
  AttachmentsGrid,
  AttachmentStatus,
  AuthorName,
  AvatarSmall,
  CharCounter,
  ComposerBody,
  Dialog,
  DialogHeader,
  DialogTitle,
  Overlay,
  Spacer,
  SubmitBtn,
  Textarea,
  TextareaWrapper,
  ToolBtn,
  ToolDivider,
  Toolbar,
} from "../styles/CreatePostDialog.styles";

const CreatePostDialog = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  initialContent = "",
  initialImages = [],
  title = "Yangi Gurung",
  submitLabel = "Yuborish",
  allowImages = true,
}) => {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setText(initialContent || "");
      setAttachments(
        (initialImages || []).map((image, index) => ({
          id: image.url || `initial-${index}`,
          url: image.url,
          blurDataUrl: image.blurDataUrl || image.url,
          width: image.width || null,
          height: image.height || null,
          name: "image",
          uploading: false,
          error: null,
        })),
      );
      setTimeout(() => textareaRef.current?.focus(), 80);
      return;
    }

    setText("");
    setAttachments([]);
    setUploading(false);
  }, [initialContent, initialImages, isOpen]);

  const isPremium = isPremiumUser(currentUser);
  const canUseImages = allowImages && isPremium;

  const handleSubmit = async () => {
    const nextContent = text.trim();
    const readyImages = attachments
      .filter((image) => image.url && !image.uploading && !image.error)
      .map(({ url, blurDataUrl, width, height }) => ({
        url,
        blurDataUrl,
        width,
        height,
      }));

    if (!nextContent && readyImages.length === 0) return;
    if (countWords(text) > APP_LIMITS.postWords) return;
    await onSubmit({
      content: nextContent,
      images: allowImages ? readyImages : undefined,
    });
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") onClose();
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      handleSubmit();
    }
  };

  const insertMarkdown = (prefix, suffix = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = text.slice(start, end);
    const before = text.slice(0, start);
    const after = text.slice(end);
    const wrappedText = `${before}${prefix}${selected}${suffix}${after}`;

    if (countWords(wrappedText) > APP_LIMITS.postWords) return;

    setText(wrappedText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleImageButtonClick = () => {
    if (!allowImages) return;

    if (!isPremium) {
      toast.error("Feedga rasm qo'shish faqat premium foydalanuvchilar uchun");
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileSelection = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) return;
    if (!canUseImages) return;

    const remainingSlots = APP_LIMITS.postImagesPerPost.premium - attachments.length;
    if (remainingSlots <= 0) {
      toast.error("Har bir gurung uchun maksimal 3 ta rasm qo'shish mumkin");
      return;
    }

    const pickedFiles = files.slice(0, remainingSlots);
    if (pickedFiles.length < files.length) {
      toast.error("Faqat dastlabki 3 ta rasm tanlandi");
    }

    setUploading(true);

    for (const file of pickedFiles) {
      if (file.size > APP_LIMITS.postImageBytes) {
        toast.error(`${file.name} maksimal 5MB bo'lishi kerak`);
        continue;
      }

      const tempId = `${file.name}-${file.size}-${Date.now()}-${Math.random()}`;

      try {
        const placeholder = await generatePostImagePlaceholder(file);
        setAttachments((prev) => [
          ...prev,
          {
            id: tempId,
            url: "",
            blurDataUrl: placeholder.blurDataUrl,
            width: placeholder.width,
            height: placeholder.height,
            name: file.name,
            uploading: true,
            error: null,
          },
        ]);

        const response = await uploadPostImage(file);
        if (!response?.url) {
          throw new Error("Upload failed");
        }

        setAttachments((prev) =>
          prev.map((image) =>
            image.id === tempId
              ? {
                  ...image,
                  url: response.url,
                  uploading: false,
                  error: null,
                }
              : image,
          ),
        );
      } catch (error) {
        setAttachments((prev) =>
          prev.map((image) =>
            image.id === tempId
              ? {
                  ...image,
                  uploading: false,
                  error: "Yuklanmadi",
                }
              : image,
          ),
        );
        toast.error(`${file.name} rasmni yuklab bo'lmadi`);
      }
    }

    setUploading(false);
  };

  const removeAttachment = (attachmentId) => {
    setAttachments((prev) => prev.filter((image) => image.id !== attachmentId));
  };

  if (!isOpen) return null;

  const displayName = currentUser?.nickname || currentUser?.username || "Siz";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const usedWords = countWords(text);

  return (
    <Overlay onClick={(event) => event.target === event.currentTarget && onClose()}>
      <Dialog>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <ButtonWrapper onClick={onClose}>
            <X size={18} />
          </ButtonWrapper>
        </DialogHeader>

        <ComposerBody>
          <AvatarSmall>
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={displayName} />
            ) : (
              avatarLetter
            )}
          </AvatarSmall>
          <TextareaWrapper>
            <AuthorName>{displayName}</AuthorName>
            <Textarea
              ref={textareaRef}
              value={text}
              onChange={(event) => {
                if (countWords(event.target.value) <= APP_LIMITS.postWords) {
                  setText(event.target.value);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Fikringizni yozing… markdown qo'llab-quvvatlanadi: **qalin**, _kursiv_, #teg"
              spellCheck={false}
            />
            <CharCounter $warn={usedWords > APP_LIMITS.postWords - 10}>
              {usedWords}/{APP_LIMITS.postWords} so'z
            </CharCounter>
            {attachments.length ? (
              <AttachmentsGrid>
                {attachments.map((attachment) => (
                  <AttachmentCard key={attachment.id}>
                    <img
                      src={attachment.url || attachment.blurDataUrl}
                      alt={attachment.name || "Rasm"}
                    />
                    <AttachmentRemoveButton
                      type="button"
                      onClick={() => removeAttachment(attachment.id)}
                    >
                      <X size={14} />
                    </AttachmentRemoveButton>
                    {attachment.uploading || attachment.error ? (
                      <AttachmentStatus>
                        {attachment.uploading ? (
                          <>
                            <Loader2 size={14} />
                            Yuklanmoqda
                          </>
                        ) : (
                          attachment.error
                        )}
                      </AttachmentStatus>
                    ) : null}
                  </AttachmentCard>
                ))}
              </AttachmentsGrid>
            ) : null}
          </TextareaWrapper>
        </ComposerBody>

        <Toolbar>
          <ToolBtn title="Qalin (Ctrl+B)" onClick={() => insertMarkdown("**", "**")}>
            <Bold size={15} />
          </ToolBtn>
          <ToolBtn title="Kursiv (Ctrl+I)" onClick={() => insertMarkdown("_", "_")}>
            <Italic size={15} />
          </ToolBtn>
          <ToolBtn title="Teg qo'shish" onClick={() => insertMarkdown("#")}>
            <Hash size={15} />
          </ToolBtn>

          {allowImages ? (
            <ToolBtn
              title={
                isPremium
                  ? "Rasm qo'shish"
                  : "Rasm qo'shish faqat premium foydalanuvchilar uchun"
              }
              onClick={handleImageButtonClick}
            >
              <ImagePlus size={15} />
            </ToolBtn>
          ) : null}

          <ToolDivider />

          <Spacer />

          <SubmitBtn
            disabled={
              (!text.trim() && attachments.filter((item) => item.url).length === 0) ||
              attachments.some((item) => item.uploading) ||
              uploading
            }
            onClick={handleSubmit}
          >
            <Send size={14} />
            {submitLabel}
          </SubmitBtn>
        </Toolbar>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          multiple
          hidden
          onChange={handleFileSelection}
        />
      </Dialog>
    </Overlay>
  );
};

export default CreatePostDialog;
