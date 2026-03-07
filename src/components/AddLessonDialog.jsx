import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  X,
  Video,
  Link as LinkIcon,
  Upload,
  FileVideo,
  Loader2,
} from "lucide-react";
import { useCourses } from "../contexts/CoursesContext";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import { ButtonWrapper } from "./BlogsSidebar";
import axiosInstance from "../api/axiosInstance";
import { APP_LIMITS } from "../constants/appLimits";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Dialog = styled.div`
  width: 480px;
  max-width: 95vw;
  max-height: 90vh;
  background-color: var(--secondary-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;
  display: flex;
  flex-direction: column;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
`;

const DialogTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--input-color);
  color: var(--text-secondary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
  }
`;

const DialogBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  border: 1px solid transparent;
  border-radius: 8px;
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
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`;

const TabContainer = styled.div`
  display: flex;
  background-color: var(--input-color);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 4px;
  padding: 4px;
  gap: 4px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background-color: ${(props) =>
    props.active ? "var(--primary-color)" : "transparent"};
  color: ${(props) => (props.active ? "white" : "var(--text-secondary-color)")};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? "var(--primary-color)" : "var(--hover-color)"};
    color: ${(props) => (props.active ? "white" : "var(--text-color)")};
  }
`;

const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: var(--input-color);
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary-color);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background-color: rgba(88, 101, 242, 0.05);
  }

  svg {
    margin-bottom: 10px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--input-color);
  border-radius: 8px;
  border: 1px solid var(--primary-color);
`;

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
`;

const FileSize = styled.span`
  color: var(--text-muted-color);
  font-size: 12px;
`;

const RemoveFileButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: #ed4245;
    background: rgba(237, 66, 69, 0.1);
  }
`;

const UploadStatusCard = styled.div`
  padding: 12px 14px;
  border-radius: 10px;
  background: var(--input-color);
  border: 1px solid var(--border-color);
  display: grid;
  gap: 8px;
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
  color: var(--text-muted-color);
  font-size: 12px;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--border-color) 72%, transparent);
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${(props) => props.$width || "0%"};
  height: 100%;
  border-radius: inherit;
  background: var(--primary-color);
  transition: width 0.18s ease;
`;

const DialogFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${(props) =>
    props.primary
      ? `
    background: var(--primary-color);
    color: white;
    box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);

    &:hover {
      box-shadow: 0 4px 14px rgba(88, 101, 242, 0.5);
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `
      : `
    background: var(--input-color);
    color: var(--text-color);

    &:hover {
      background: var(--hover-color);
    }
  `}
`;

const AddLessonDialog = ({ isOpen, onClose, courseId }) => {
  const { addLesson } = useCourses();
  const currentUser = useAuthStore((state) => state.user);
  const isPremium = currentUser?.premiumStatus === "active";

  const [title, setTitle] = useState("");
  const [uploadMethod, setUploadMethod] = useState(
    isPremium ? "upload" : "url",
  ); // "upload" | "url"
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedBytes, setUploadedBytes] = useState(0);
  const [totalUploadBytes, setTotalUploadBytes] = useState(0);
  const [uploadPhase, setUploadPhase] = useState("idle");
  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (isOpen) {
      setUploadMethod(isPremium ? "upload" : "url");
    }
  }, [isOpen, isPremium]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setUploadProgress(0);
      setUploadedBytes(0);
      setTotalUploadBytes(e.target.files[0].size || 0);
      setUploadPhase("idle");
    }
  };

  const handleRemoveFile = () => {
    setVideoFile(null);
    setUploadProgress(0);
    setUploadedBytes(0);
    setTotalUploadBytes(0);
    setUploadPhase("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isFormValid = () => {
    if (!title.trim()) return false;
    if (uploadMethod === "url" && !videoUrl.trim()) return false;
    if (uploadMethod === "upload" && !videoFile) return false;
    return true;
  };

  const handleAdd = async () => {
    if (!isFormValid() || isUploading) return;
    setIsUploading(true);
    setUploadPhase(uploadMethod === "upload" ? "uploading" : "saving");
    setUploadProgress(0);
    setUploadedBytes(0);
    setTotalUploadBytes(videoFile?.size || 0);

    try {
      let finalFileUrl = "";
      let finalFileName = "";
      let finalFileSize = 0;
      let finalVideoUrl = "";
      let finalStreamType = "direct";
      let finalStreamAssets = [];
      let type = "video";

      if (uploadMethod === "upload" && videoFile && isPremium) {
        const formData = new FormData();
        formData.append("file", videoFile);

        const { data } = await axiosInstance.post("/courses/upload-media", formData, {
          onUploadProgress: (event) => {
            const total = event.total || videoFile.size || 0;
            const loaded = event.loaded || 0;
            const percent = total
              ? Math.min(100, Math.round((loaded / total) * 100))
              : 0;

            setUploadPhase(percent >= 100 ? "processing" : "uploading");
            setTotalUploadBytes(total);
            setUploadedBytes(loaded);
            setUploadProgress(percent);
          },
        });

        finalStreamType = data.streamType || "direct";
        finalFileUrl = data.url || "";
        finalVideoUrl = data.manifestUrl || "";
        finalFileName = data.fileName;
        finalFileSize = data.fileSize;
        finalStreamAssets = Array.isArray(data.assetKeys) ? data.assetKeys : [];
        type = "file";
      } else {
        setUploadPhase("saving");
        finalVideoUrl = videoUrl.trim();
        type = "video";
      }

      setUploadPhase("saving");
      await addLesson(
        courseId,
        title.trim(),
        finalVideoUrl,
        description.trim(),
        type,
        finalFileUrl,
        finalFileName,
        finalFileSize,
        finalStreamType,
        finalStreamAssets,
      );

      setTitle("");
      setVideoUrl("");
      setVideoFile(null);
      setDescription("");
      setUploadMethod(isPremium ? "upload" : "url");
      setUploadProgress(0);
      setUploadedBytes(0);
      setTotalUploadBytes(0);
      setUploadPhase("idle");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Yuklashda xatolik yuz berdi");
    } finally {
      setIsUploading(false);
      if (uploadPhase !== "idle") {
        setUploadPhase("idle");
      }
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Yangi dars qo'shish</DialogTitle>
          <ButtonWrapper onClick={onClose}>
            <X size={18} />
          </ButtonWrapper>
        </DialogHeader>

        <DialogBody>
          <InputGroup>
            <Label>Dars nomi *</Label>
            <Input
              type="text"
              placeholder="Masalan: React Hooks asoslari"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value.slice(0, APP_LIMITS.lessonTitleChars))
              }
              maxLength={APP_LIMITS.lessonTitleChars}
              autoFocus
            />
          </InputGroup>

          <InputGroup>
            <Label>Video/Fayl manbasi *</Label>
            {isPremium ? (
              <TabContainer>
                <Tab
                  active={uploadMethod === "upload"}
                  onClick={() => setUploadMethod("upload")}
                  type="button"
                >
                  Fayl yuklash (Max 100MB)
                </Tab>
                <Tab
                  active={uploadMethod === "url"}
                  onClick={() => setUploadMethod("url")}
                  type="button"
                >
                  YouTube URL
                </Tab>
              </TabContainer>
            ) : (
              <div
                style={{
                  padding: "8px",
                  background: "rgba(251, 191, 36, 0.1)",
                  color: "#fbbf24",
                  borderRadius: "8px",
                  fontSize: "13px",
                  marginBottom: "8px",
                }}
              >
                Fayl yuklash uchun Premium obuna talab qilinadi. Bepul tarifda
                faqat YouTube URL orqali video qo'shishingiz mumkin.
              </div>
            )}
          </InputGroup>

          {uploadMethod === "upload" && isPremium ? (
            <InputGroup>
              <Label>Video/Fayl *</Label>
              <FileInputContainer>
                {!videoFile ? (
                  <FileInputLabel>
                    <Upload size={24} />
                    <span style={{ marginBottom: "4px", fontWeight: 600 }}>
                      Faylni yuklang yoki shu yerga tashlang
                    </span>
                    <span style={{ fontSize: "12px" }}>
                      MP4, WEBM, MOV (Max: 100MB)
                    </span>
                    <HiddenFileInput
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </FileInputLabel>
                ) : (
                  <>
                    <FileInfo>
                      <FileDetails>
                        <FileVideo size={20} color="var(--primary-color)" />
                        <div>
                          {videoFile.name}
                          <FileSize
                            style={{ display: "block", marginTop: "2px" }}
                          >
                            {formatFileSize(videoFile.size)}
                          </FileSize>
                        </div>
                      </FileDetails>
                      <RemoveFileButton
                        onClick={handleRemoveFile}
                        disabled={isUploading}
                      >
                        <X size={16} />
                      </RemoveFileButton>
                    </FileInfo>

                    {isUploading && (
                      <UploadStatusCard>
                        <UploadStatusTop>
                          <span>
                            {uploadPhase === "processing"
                              ? "Video qayta ishlanmoqda..."
                              : uploadPhase === "saving"
                                ? "Dars saqlanmoqda..."
                                : "Yuklanmoqda..."}
                          </span>
                          <span>
                            {uploadPhase === "processing" || uploadPhase === "saving"
                              ? "Tayyorlanmoqda"
                              : `${uploadProgress}%`}
                          </span>
                        </UploadStatusTop>
                        <ProgressTrack>
                          <ProgressFill
                            $width={
                              uploadPhase === "processing" ||
                              uploadPhase === "saving"
                                ? "100%"
                                : `${uploadProgress}%`
                            }
                          />
                        </ProgressTrack>
                        <UploadStatusMeta>
                          {uploadPhase === "processing"
                            ? "Fayl serverga bordi, endi HLS segmentlarga bo'linmoqda."
                            : uploadPhase === "saving"
                              ? "Oxirgi ma'lumotlar saqlanmoqda."
                              : `${formatFileSize(uploadedBytes)} / ${formatFileSize(
                                  totalUploadBytes || videoFile.size || 0,
                                )}`}
                        </UploadStatusMeta>
                      </UploadStatusCard>
                    )}
                  </>
                )}
              </FileInputContainer>
            </InputGroup>
          ) : (
            <InputGroup>
              <Label>YouTube Video URL *</Label>
              <Input
                type="url"
                placeholder="https://youtu.be/..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </InputGroup>
          )}

          <InputGroup>
            <Label>Tavsif (ixtiyoriy)</Label>
            <TextArea
              placeholder="Dars haqida qisqacha..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value.slice(0, APP_LIMITS.lessonDescriptionChars),
                )
              }
              maxLength={APP_LIMITS.lessonDescriptionChars}
            />
          </InputGroup>
        </DialogBody>

        <DialogFooter>
          <Button onClick={onClose} disabled={isUploading}>
            Bekor qilish
          </Button>
          <Button
            primary
            disabled={!isFormValid() || isUploading}
            onClick={handleAdd}
          >
            {isUploading ? (
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Loader2 size={16} className="spin" />
                {uploadPhase === "processing"
                  ? "Qayta ishlanmoqda..."
                  : uploadPhase === "saving"
                    ? "Saqlanmoqda..."
                    : uploadMethod === "upload"
                      ? `${uploadProgress}%`
                      : "Yuborilmoqda..."}
              </span>
            ) : (
              "Qo'shish"
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </Overlay>
  );
};

export default AddLessonDialog;
