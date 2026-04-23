import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Clock, Phone, PhoneOff } from "lucide-react";
import { playIncomingRingtone } from "../utils/ringtone";

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
  gap: 20px;
  text-align: center;

  @media (max-width: 640px) {
    border-radius: 28px;
    padding: 28px 22px 22px;
  }
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

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 6px;
`;

const ActionButton = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.$accept ? "#4fc67c" : "#ff5a67")};
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.24);
`;

const IncomingCallRequest = ({ isOpen, onAccept, onReject, caller }) => {
  const [ringingTime, setRingingTime] = useState(0);
  const audioIntervalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    playIncomingRingtone();
    audioIntervalRef.current = setInterval(() => {
      playIncomingRingtone();
    }, 2000);

    const timer = setInterval(() => {
      setRingingTime((prev) => prev + 1);
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

  const callerName = caller?.nickname || caller?.username || caller?.name || "Unknown";
  const mins = Math.floor(ringingTime / 60)
    .toString()
    .padStart(2, "0");
  const secs = (ringingTime % 60).toString().padStart(2, "0");

  return (
    <Overlay>
      <Card>
        <Avatar>{callerName.charAt(0).toUpperCase()}</Avatar>
        <Name>{callerName}</Name>
        <Status>
          <Clock size={15} />
          {mins}:{secs}
        </Status>
        <Actions>
          <ActionButton type="button" $accept onClick={onAccept}>
            <Phone size={28} />
          </ActionButton>
          <ActionButton type="button" onClick={onReject}>
            <PhoneOff size={28} />
          </ActionButton>
        </Actions>
      </Card>
    </Overlay>
  );
};

export default IncomingCallRequest;
