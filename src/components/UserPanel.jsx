import React, { useState } from "react";
import styled from "styled-components";
import { Mic, Headphones, Settings, Volume2, X, Star } from "lucide-react";
import useAuthStore from "../store/authStore";
import OfficalBadge from "../shared/ui/badges/OfficalBadge";

const PanelContainer = styled.div`
  width: 60px;
  background-color: #292b2f;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  flex-shrink: 0;
  position: relative;

  /* Mobile responsive */
  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    flex-direction: row;
    padding: 8px 16px;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    height: 50px;
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #7289da;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: #5a6caf;
  }

  ${(props) =>
    props.isPremium &&
    `
    border: 2px solid #ffaa00;
    box-shadow: 0 0 10px rgba(255, 170, 0, 0.3);
  `}
`;

const StatusIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3ba55d;
  border: 3px solid #292b2f;
`;

const UserControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: auto;

  /* Mobile responsive */
  @media (max-width: 768px) {
    margin-top: 0;
    flex-direction: row;
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const ControlButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3ba55d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &:hover {
    background-color: #2d7d46;
  }

  ${(props) =>
    props.deafen &&
    `
    background-color: #3ba55d;
  `}

  ${(props) =>
    props.muted &&
    `
    background-color: #ed4245;
  `}

  ${(props) =>
    props.settings &&
    `
    background-color: #4a4d52;
    color: #b9bbbe;

    &:hover {
      background-color: #5a5d62;
      color: #dcddde;
    }
  `}
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const UserPanel = () => {
  const [isDeafened, setIsDeafened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleDeafen = () => {
    setIsDeafened(!isDeafened);
    if (!isDeafened) {
      setIsMuted(true);
    }
  };

  const toggleMute = () => {
    if (!isDeafened) {
      setIsMuted(!isMuted);
    }
  };

  const user = useAuthStore((state) => state.user);
  const isPremium = user?.premiumStatus === "active";
  const nameInitial = (user?.nickname || user?.username || "JD")
    .substring(0, 2)
    .toUpperCase();

  return (
    <PanelContainer>
      <UserAvatar
        isPremium={isPremium}
        title={isPremium ? "Premium User" : "Normal User"}
      >
        {nameInitial}
        {isPremium && (
          <div
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              backgroundColor: "#ffaa00",
              borderRadius: "50%",
              padding: 2,
              border: "2px solid #292b2f",
            }}
          >
            <OfficalBadge width={10} height={10} color="#fff" />
          </div>
        )}
        <StatusIndicator />
      </UserAvatar>

      <UserControls>
        <ControlButton
          muted={isMuted}
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <X size={20} /> : <Mic size={20} />}
        </ControlButton>

        <ControlButton
          deafen={isDeafened}
          onClick={toggleDeafen}
          title={isDeafened ? "Undeafen" : "Deafen"}
        >
          {isDeafened ? <Headphones size={20} /> : <Volume2 size={20} />}
        </ControlButton>

        <ControlButton settings title="User Settings">
          <Settings size={20} />
        </ControlButton>
      </UserControls>
    </PanelContainer>
  );
};

export default UserPanel;
