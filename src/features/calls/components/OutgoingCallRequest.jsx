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
  padding: calc(env(safe-area-inset-top, 0px) + 28px) 28px
    calc(env(safe-area-inset-bottom, 0px) + 28px);
  text-align: center;

  @media (max-width: 768px) {
    padding: calc(env(safe-area-inset-top, 0px) + 22px) 22px
      calc(env(safe-area-inset-bottom, 0px) + 22px);
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
  gap: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  backdrop-filter: blur(18px);
`;

const CenterStage = styled.div`
  display: grid;
  justify-items: center;
  gap: 20px;
`;

const AvatarHalo = styled.div`
  display: grid;
  place-items: center;
  height: 188px;
  width: 188px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 0 0 12px rgba(255, 255, 255, 0.06),
    0 0 0 26px rgba(255, 255, 255, 0.03),
    0 34px 76px rgba(33, 22, 87, 0.24);

  @media (max-width: 768px) {
    height: 164px;
    width: 164px;
  }
`;

const Avatar = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(50, 35, 20, 0.28);
  color: #fff;
  font-size: 58px;
  font-weight: 700;
  display: grid;
  place-items: center;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    font-size: 50px;
  }
`;

const Name = styled.div`
  font-size: clamp(30px, 4vw, 58px);
  font-weight: 400;
  line-height: 1.02;
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(18px, 2vw, 30px);
  font-weight: 400;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 22px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: 14px;
  }
`;

const Control = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  display: grid;
  justify-items: center;
  gap: 12px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.8 : 1)};
`;

const ControlCircle = styled.span`
  display: inline-flex;
  height: ${(props) => (props.$primary ? "94px" : "82px")};
  width: ${(props) => (props.$primary ? "94px" : "82px")};
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
    height: ${(props) => (props.$primary ? "88px" : "76px")};
    width: ${(props) => (props.$primary ? "88px" : "76px")};
  }
`;

const ControlLabel = styled.span`
  font-size: 15px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const getTargetName = (target) =>
  target?.nickname || target?.username || target?.name || "Unknown";

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
            <Clock3 size={16} />
            {callType === "video" ? "Video qo'ng'iroq" : "Audio qo'ng'iroq"}
          </MetaPill>
        </TopMeta>

        <CenterStage>
          <AvatarHalo>
            <Avatar>
              {target?.avatar ? (
                <img src={target.avatar} alt={targetName} />
              ) : (
                targetName.charAt(0).toUpperCase()
              )}
            </Avatar>
          </AvatarHalo>
          <Name>{targetName}</Name>
          <Status>
            <Clock3 size={18} />
            jiringlamoqda {timeLabel}
          </Status>
        </CenterStage>

        <ControlRow>
          <Control type="button" disabled>
            <ControlCircle>
              <Volume2 size={34} />
            </ControlCircle>
            <ControlLabel>karnay</ControlLabel>
          </Control>
          <Control type="button" disabled>
            <ControlCircle>
              <Video size={32} />
            </ControlCircle>
            <ControlLabel>{callType === "video" ? "video" : "audio"}</ControlLabel>
          </Control>
          <Control type="button" disabled>
            <ControlCircle>
              <MicOff size={34} />
            </ControlCircle>
            <ControlLabel>sukut</ControlLabel>
          </Control>
          <Control type="button" onClick={onCancel}>
            <ControlCircle $danger $primary>
              <PhoneOff size={36} />
            </ControlCircle>
            <ControlLabel>tugatish</ControlLabel>
          </Control>
        </ControlRow>
      </Content>
    </Overlay>
  );
}
