import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Clock3, Phone, PhoneOff, Video } from "lucide-react";
import { playIncomingRingtone } from "../utils/ringtone";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10001;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 20%, rgba(116, 173, 244, 0.26), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(156, 104, 234, 0.28), transparent 24%),
    linear-gradient(180deg, #7e63d8 0%, #6d73d9 100%);
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
  box-shadow: 0 18px 40px rgba(33, 29, 83, 0.14);
`;

const CenterStage = styled.div`
  display: grid;
  justify-items: center;
  gap: 20px;
`;

const AvatarWrap = styled.div`
  display: grid;
  place-items: center;
  height: 182px;
  width: 182px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 0 0 10px rgba(255, 255, 255, 0.06),
    0 32px 72px rgba(31, 22, 87, 0.24);

  @media (max-width: 768px) {
    height: 162px;
    width: 162px;
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
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(18px, 2vw, 30px);
  font-weight: 400;
`;

const BottomActions = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 24px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 16px;
    justify-content: space-between;
  }
`;

const Action = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  display: grid;
  justify-items: center;
  gap: 12px;
  cursor: pointer;
`;

const ActionCircle = styled.span`
  display: inline-flex;
  height: ${(props) => (props.$primary ? "94px" : "82px")};
  width: ${(props) => (props.$primary ? "94px" : "82px")};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) =>
    props.$accept
      ? "#62d553"
      : props.$danger
        ? "#ff5544"
        : "rgba(255, 255, 255, 0.18)"};
  box-shadow:
    0 22px 48px rgba(21, 12, 60, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    height: ${(props) => (props.$primary ? "88px" : "76px")};
    width: ${(props) => (props.$primary ? "88px" : "76px")};
  }
`;

const ActionLabel = styled.span`
  font-size: 15px;
  font-weight: 400;
  opacity: 0.96;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const getCallerName = (caller) =>
  caller?.nickname || caller?.username || caller?.name || "Unknown";

export default function IncomingCallRequest({
  isOpen,
  onAccept,
  onReject,
  caller,
  callType = "video",
}) {
  const [ringingTime, setRingingTime] = useState(0);
  const audioIntervalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    playIncomingRingtone();
    audioIntervalRef.current = window.setInterval(() => {
      playIncomingRingtone();
    }, 2600);

    const timer = window.setInterval(() => {
      setRingingTime((prev) => prev + 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
      if (audioIntervalRef.current) {
        window.clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
      }
    };
  }, [isOpen]);

  const callerName = useMemo(() => getCallerName(caller), [caller]);
  const timeLabel = useMemo(() => {
    const mins = Math.floor(ringingTime / 60)
      .toString()
      .padStart(2, "0");
    const secs = (ringingTime % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }, [ringingTime]);

  if (!isOpen) return null;

  return (
    <Overlay>
      <Content>
        <TopMeta>
          <MetaPill>
            <Clock3 size={16} />
            {callType === "video" ? "Kiruvchi video qo'ng'iroq" : "Kiruvchi audio qo'ng'iroq"}
          </MetaPill>
        </TopMeta>

        <CenterStage>
          <AvatarWrap>
            <Avatar>
              {caller?.avatar ? (
                <img src={caller.avatar} alt={callerName} />
              ) : (
                callerName.charAt(0).toUpperCase()
              )}
            </Avatar>
          </AvatarWrap>
          <Name>{callerName}</Name>
          <Status>
            <Clock3 size={18} />
            {timeLabel}
          </Status>
        </CenterStage>

        <BottomActions>
          <Action type="button" onClick={onAccept}>
            <ActionCircle $accept $primary>
              {callType === "video" ? <Video size={34} /> : <Phone size={34} />}
            </ActionCircle>
            <ActionLabel>{callType === "video" ? "qabul qilish" : "javob berish"}</ActionLabel>
          </Action>
          <Action type="button" onClick={onReject}>
            <ActionCircle $danger $primary>
              <PhoneOff size={36} />
            </ActionCircle>
            <ActionLabel>rad etish</ActionLabel>
          </Action>
        </BottomActions>
      </Content>
    </Overlay>
  );
}
