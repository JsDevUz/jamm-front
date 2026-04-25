import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Clock3, MicOff, PhoneOff, Video, Volume2 } from "lucide-react";
import { playOutgoingRingtone } from "../utils/ringtone";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10001;
  overflow: hidden;
  background:
    radial-gradient(circle at 14% 22%, rgba(130, 180, 247, 0.3), transparent 28%),
    radial-gradient(circle at 82% 14%, rgba(178, 114, 237, 0.3), transparent 24%),
    linear-gradient(180deg, #7d63d8 0%, #6f82db 100%);
  color: #fff;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: calc(env(safe-area-inset-top, 0px) + 24px) 24px
    calc(env(safe-area-inset-bottom, 0px) + 24px);
  text-align: center;

  @media (max-width: 768px) {
    padding: calc(env(safe-area-inset-top, 0px) + 18px) 18px
      calc(env(safe-area-inset-bottom, 0px) + 18px);
  }
`;

const TopMeta = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const MetaPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  backdrop-filter: blur(18px);
`;

const CenterStage = styled.div`
  display: grid;
  justify-items: center;
  gap: 16px;
`;

const AvatarHalo = styled.div`
  display: grid;
  place-items: center;
  height: 154px;
  width: 154px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 0 0 9px rgba(255, 255, 255, 0.06),
    0 0 0 20px rgba(255, 255, 255, 0.03),
    0 26px 60px rgba(33, 22, 87, 0.24);

  @media (max-width: 768px) {
    height: 132px;
    width: 132px;
  }
`;

const Avatar = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background:
    radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.32), transparent 30%),
    linear-gradient(135deg, color-mix(in srgb, var(--primary-color, #5865f2) 92%, #ffffff 8%), #4f7cf7);
  color: #fff;
  font-size: 46px;
  font-weight: 700;
  display: grid;
  place-items: center;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const Name = styled.div`
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 400;
  line-height: 1.02;
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(14px, 1.35vw, 18px);
  font-weight: 400;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 16px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 10px;
  }
`;

const Control = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  display: grid;
  justify-items: center;
  gap: 10px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.8 : 1)};
`;

const ControlCircle = styled.span`
  display: inline-flex;
  height: ${(props) => (props.$primary ? "48px" : "48px")};
  width: ${(props) => (props.$primary ? "48px" : "48px")};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) =>
    props.$danger ? "#ff5544" : "rgba(255, 255, 255, 0.18)"};
  box-shadow:
    0 22px 48px rgba(21, 12, 60, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    height: ${(props) => (props.$primary ? "48px" : "48px")};
    width: ${(props) => (props.$primary ? "48px" : "48px")};
  }
`;

const ControlLabel = styled.span`
  font-size: 13px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const getTargetName = (target) =>
  target?.nickname || target?.username || target?.name || "Unknown";

const getAvatarInitials = (name) => {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return "?";
  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};

export default function OutgoingCallRequest({
  isOpen,
  onCancel,
  target,
  callType = "video",
}) {
  const [callingTime, setCallingTime] = useState(0);
  const audioIntervalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    playOutgoingRingtone();
    audioIntervalRef.current = window.setInterval(() => {
      playOutgoingRingtone();
    }, 2200);

    const timer = window.setInterval(() => {
      setCallingTime((prev) => prev + 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
      if (audioIntervalRef.current) {
        window.clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
      }
    };
  }, [isOpen]);

  const targetName = useMemo(() => getTargetName(target), [target]);
  const timeLabel = useMemo(() => {
    const mins = Math.floor(callingTime / 60)
      .toString()
      .padStart(2, "0");
    const secs = (callingTime % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }, [callingTime]);

  if (!isOpen) return null;

  return (
    <Overlay>
      <Content>
        <TopMeta>
          <MetaPill>
            <Clock3 size={14} />
            {callType === "video" ? "Video qo'ng'iroq" : "Audio qo'ng'iroq"}
          </MetaPill>
        </TopMeta>

        <CenterStage>
          <AvatarHalo>
            <Avatar>
              {target?.avatar ? (
                <img src={target.avatar} alt={targetName} />
              ) : (
                getAvatarInitials(targetName)
              )}
            </Avatar>
          </AvatarHalo>
          <Name>{targetName}</Name>
          <Status>
            <Clock3 size={16} />
            jiringlamoqda {timeLabel}
          </Status>
        </CenterStage>

        <ControlRow>
          <Control type="button" disabled>
            <ControlCircle>
              <Volume2 size={20} />
            </ControlCircle>
            <ControlLabel>karnay</ControlLabel>
          </Control>
          <Control type="button" disabled>
            <ControlCircle>
              <Video size={20} />
            </ControlCircle>
            <ControlLabel>{callType === "video" ? "video" : "audio"}</ControlLabel>
          </Control>
          <Control type="button" disabled>
            <ControlCircle>
              <MicOff size={20} />
            </ControlCircle>
            <ControlLabel>sukut</ControlLabel>
          </Control>
          <Control type="button" onClick={onCancel}>
            <ControlCircle $danger $primary>
              <PhoneOff size={20} />
            </ControlCircle>
            <ControlLabel>tugatish</ControlLabel>
          </Control>
        </ControlRow>
      </Content>
    </Overlay>
  );
}
