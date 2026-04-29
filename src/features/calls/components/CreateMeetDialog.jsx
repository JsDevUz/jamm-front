import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { CheckCircle2, Copy, Link2, Play, ShieldCheck, Sparkles, Video, X } from "lucide-react";
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
  width: 46px;
  height: 46px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    color-mix(in srgb, var(--primary-color) 72%, #22c55e)
  );
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 12px 28px color-mix(in srgb, var(--primary-color) 28%, transparent);
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
  display: grid;
  gap: 12px;
  min-width: 0;
  overflow: hidden;
  padding: 14px;
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--primary-color) 8%, transparent),
      transparent 42%
    ),
    var(--background-color);
`;

const UrlHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
`;

const UrlLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: var(--text-secondary-color);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const ReadyPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: color-mix(in srgb, #22c55e 13%, transparent);
  color: #16a34a;
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
  flex-shrink: 0;
`;

const UrlRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
  min-width: 0;
`;

const UrlField = styled.div`
  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;
  border-radius: 12px;
  padding: 12px 14px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.45;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  word-break: normal;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--text-muted-color) 38%, transparent) transparent;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-muted-color) 38%, transparent);
  }
`;

const CopyButton = styled.button`
  width: 48px;
  min-width: 48px;
  min-height: 44px;
  padding: 0;
  border: none;
  border-radius: 14px;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  gap: 8px;
  font-weight: 800;
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
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 18px 18px;
  border-top: 1px solid var(--border-color);
  background: var(--secondary-color);

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ErrorCard = styled.div`
  padding: 14px 16px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--danger-color) 12%, transparent);
  color: var(--danger-color);
  font-size: 13px;
  line-height: 1.5;
`;

const BodyStack = styled.div`
  display: grid;
  gap: 14px;
  min-width: 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  min-width: 0;

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const InfoCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--background-color);
`;

const InfoIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  color: var(--primary-color);
  flex-shrink: 0;
`;

const InfoText = styled.div`
  min-width: 0;
  display: grid;
  gap: 2px;
`;

const InfoTitle = styled.div`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 800;
  line-height: 1.3;
`;

const InfoHint = styled.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.35;
`;

const FooterNote = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.4;
`;

const StartButton = styled(DialogActionButton)`
  min-width: 132px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 520px) {
    width: 100%;
  }
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

        const existingMeet = Array.isArray(existingMeets)
          ? existingMeets.find((item) => !item?.courseId && !item?.lessonId)
          : null;

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
        $width="min(100%, 560px)"
        $maxHeight="min(90vh, 620px)"
        $radius="22px"
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
              <SkeletonBlock $height="78px" $radius="16px" />
            </SkeletonStack>
          ) : error ? (
            <ErrorCard>{error}</ErrorCard>
          ) : (
            <BodyStack>
              <UrlCard>
                <UrlHeader>
                  <UrlLabel>
                    <Link2 size={14} />
                    Meet havolasi
                  </UrlLabel>
                  <ReadyPill>
                    <CheckCircle2 size={14} />
                    Tayyor
                  </ReadyPill>
                </UrlHeader>
                <UrlRow>
                  <UrlField>{meetUrl}</UrlField>
                  <CopyButton
                    type="button"
                    onClick={handleCopy}
                    aria-label="Meet havolasini nusxalash"
                    title="Meet havolasini nusxalash"
                  >
                    <Copy size={18} />
                  </CopyButton>
                </UrlRow>
              </UrlCard>
              <InfoGrid>
                <InfoCard>
                  <InfoIcon>
                    <ShieldCheck size={16} />
                  </InfoIcon>
                  <InfoText>
                    <InfoTitle>Saqlangan xona</InfoTitle>
                    <InfoHint>Mavjud faol meet bo'lsa, shu havola qayta ishlatiladi.</InfoHint>
                  </InfoText>
                </InfoCard>
                <InfoCard>
                  <InfoIcon>
                    <Sparkles size={16} />
                  </InfoIcon>
                  <InfoText>
                    <InfoTitle>Tez ulashish</InfoTitle>
                    <InfoHint>Havolani yuboring yoki darhol uchrashuvni boshlang.</InfoHint>
                  </InfoText>
                </InfoCard>
              </InfoGrid>
            </BodyStack>
          )}
        </ModalBody>

        <Footer>
          <StartButton
            type="button"
            disabled={isLoading || !meet?.roomId || Boolean(error)}
            onClick={handleStart}
          >
            <Play size={16} fill="currentColor" />
            Boshlash
          </StartButton>
        </Footer>
      </ModalPanel>
    </ModalOverlay>
  );
};

export default CreateMeetDialog;
