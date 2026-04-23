import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Clock, PhoneOff, Volume2 } from "lucide-react";
import { playOutgoingRingtone } from "../utils/ringtone";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10001;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.06), transparent 38%),
    linear-gradient(180deg, #141518 0%, #0d0e11 100%);
`;

const Card = styled.div`
  width: min(100%, 460px);
  padding: 34px 28px 28px;
  border-radius: 34px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(18, 19, 23, 0.84);
  box-shadow: 0 28px 64px rgba(0, 0, 0, 0.36);
  backdrop-filter: blur(18px);
  display: grid;
  justify-items: center;
  gap: 18px;
  text-align: center;
`;

const Avatar = styled.div`
  width: 124px;
  height: 124px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(115, 135, 255, 0.44), rgba(255, 255, 255, 0.16));
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
  font-weight: 800;
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.24);
`;

const Name = styled.div`
  color: #f5f7fb;
  font-size: 28px;
  font-weight: 800;
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(245, 247, 251, 0.72);
  font-size: 14px;
  font-weight: 600;
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(115, 135, 255, 0.88);
  animation: pulse 1.2s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || "0s"};

  @keyframes pulse {
    0%,
    100% {
      transform: scale(0.8);
      opacity: 0.45;
    }
    50% {
      transform: scale(1.15);
      opacity: 1;
    }
  }
`;

const CancelButton = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: none;
  background: #ff5a67;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.24);
`;

const OutgoingCallRequest = ({ isOpen, onCancel, target }) => {
  const [callingTime, setCallingTime] = useState(0);
  const audioIntervalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    playOutgoingRingtone();
    audioIntervalRef.current = setInterval(() => {
      playOutgoingRingtone();
    }, 1500);

    const timer = setInterval(() => {
      setCallingTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const targetName = target?.nickname || target?.username || target?.name || "Unknown";
  const mins = Math.floor(callingTime / 60)
    .toString()
    .padStart(2, "0");
  const secs = (callingTime % 60).toString().padStart(2, "0");

  return (
    <Overlay>
      <Card>
        <Avatar>{targetName.charAt(0).toUpperCase()}</Avatar>
        <Name>{targetName}</Name>
        <Status>
          <Volume2 size={15} />
          Ringing...
        </Status>
        <Status>
          <Clock size={15} />
          {mins}:{secs}
        </Status>
        <Dots>
          <Dot />
          <Dot $delay="0.2s" />
          <Dot $delay="0.4s" />
        </Dots>
        <CancelButton type="button" onClick={onCancel}>
          <PhoneOff size={28} />
        </CancelButton>
      </Card>
    </Overlay>
  );
};

export default OutgoingCallRequest;
