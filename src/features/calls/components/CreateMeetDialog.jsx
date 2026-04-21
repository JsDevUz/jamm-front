import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Copy, Video, X } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../../shared/ui/dialogs/ModalShell";
import {
  getMeets,
  isValidMeetRoomId,
  removeMeet,
  saveMeet,
} from "../../../utils/meetStore";

const HeaderIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const HeaderMeta = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
`;

const SkeletonStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const shimmer = `
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--input-color) 88%, transparent) 0%,
    color-mix(in srgb, white 8%, var(--input-color)) 50%,
    color-mix(in srgb, var(--input-color) 88%, transparent) 100%
  );
  background-size: 220% 100%;
  animation: meetDialogShimmer 1.1s linear infinite;
`;

const SkeletonBlock = styled.div`
  border-radius: ${(props) => props.$radius || "14px"};
  height: ${(props) => props.$height || "18px"};
  width: ${(props) => props.$width || "100%"};
  ${shimmer}

  @keyframes meetDialogShimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`;

const UrlCard = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--secondary-color);
`;

const UrlField = styled.div`
  flex: 1;
  min-width: 0;
  border-radius: 12px;
  padding: 12px 14px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.45;
  word-break: break-all;
`;

const CopyButton = styled.button`
  width: 48px;
  border: none;
  border-radius: 14px;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    transform 0.18s ease,
    opacity 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.04);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const HelperText = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 13px;
  line-height: 1.5;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 18px 18px;
  background: var(--secondary-color);
`;

const ErrorCard = styled.div`
  padding: 14px 16px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--danger-color) 12%, transparent);
  color: var(--danger-color);
  font-size: 13px;
  line-height: 1.5;
`;

const randomMeetToken = () =>
  Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

const buildMeetPayload = () => {
  const token = randomMeetToken().toLowerCase();
  const roomId = `meet-${token}`;

  return {
    roomId,
    title: roomId,
    isPrivate: false,
    isCreator: true,
  };
};

const CreateMeetDialog = ({ isOpen, onClose, onStart }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [meet, setMeet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
      setMeet(null);
      setError("");
      return;
    }

    let isActive = true;

    const loadMeet = async () => {
      setIsLoading(true);
      setError("");

      try {
        const existingMeets = await getMeets();

        if (!isActive) return;

        const existingMeet = Array.isArray(existingMeets) ? existingMeets[0] : null;

        if (isValidMeetRoomId(existingMeet?.roomId)) {
          setMeet(existingMeet);
          setIsLoading(false);
          return;
        }

        if (existingMeet?.roomId) {
          await removeMeet(existingMeet.roomId);
        }

        const payload = buildMeetPayload();
        const createdMeet = await saveMeet(payload);

        if (!isActive) return;

        setMeet(createdMeet || payload);
      } catch (loadError) {
        if (!isActive) return;
        setError("Meet tayyorlab bo‘lmadi. Qaytadan urinib ko‘ring.");
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadMeet();

    return () => {
      isActive = false;
    };
  }, [isOpen]);

  const meetUrl = useMemo(() => {
    if (!meet?.roomId || typeof window === "undefined") return "";
    return `${window.location.origin}/join/${meet.roomId}`;
  }, [meet]);

  const handleCopy = async () => {
    if (!meetUrl) return;

    try {
      await navigator.clipboard.writeText(meetUrl);
      toast.success("Meet havolasi nusxalandi");
    } catch {
      toast.error("Havolani nusxalab bo‘lmadi");
    }
  };

  const handleStart = () => {
    if (!meet?.roomId) return;
    onStart?.(meet.roomId);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay $zIndex={10000} onClick={onClose} $backdrop="blur(10px)">
      <ModalPanel
        $width="min(100%, 460px)"
        $maxHeight="min(88vh, 420px)"
        $mobileFull
        onClick={(event) => event.stopPropagation()}
      >
        <ModalHeader>
          <HeaderMeta>
            <HeaderIcon>
              <Video size={20} />
            </HeaderIcon>
            <ModalTitleBlock>
              <ModalTitle>Meet yaratish</ModalTitle>
              <ModalSubtitle>
                Havolani ulashing yoki to‘g‘ridan-to‘g‘ri boshlang.
              </ModalSubtitle>
            </ModalTitleBlock>
          </HeaderMeta>
          <ModalCloseButton type="button" onClick={onClose}>
            <X size={18} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody $padding="18px">
          {isLoading ? (
            <SkeletonStack>
              <SkeletonBlock $height="64px" $radius="16px" />
            </SkeletonStack>
          ) : error ? (
            <ErrorCard>{error}</ErrorCard>
          ) : (
            <SkeletonStack>
              <UrlCard>
                <UrlField>{meetUrl}</UrlField>
                <CopyButton
                  type="button"
                  onClick={handleCopy}
                  aria-label="Meet havolasini nusxalash"
                  title="Meet havolasini nusxalash"
                >
                  <Copy size={18} />
                </CopyButton>
              </UrlCard>
              {/* <HelperText>
                Sizda hozir faqat bitta faol meet havolasi saqlanadi. Dialog
                ochilganda mavjud meet bo‘lsa, o‘sha ko‘rsatiladi.
              </HelperText> */}
            </SkeletonStack>
          )}
        </ModalBody>

        <Footer>
          <DialogActionButton
            type="button"
            disabled={isLoading || !meet?.roomId || Boolean(error)}
            onClick={handleStart}
          >
            Boshlash
          </DialogActionButton>
        </Footer>
      </ModalPanel>
    </ModalOverlay>
  );
};

export default CreateMeetDialog;
