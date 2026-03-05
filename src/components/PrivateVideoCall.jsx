import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useWebRTC } from "../hooks/useWebRTC";
import useAuthStore from "../store/authStore";

const VideoCallContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #202225;
  z-index: 10000;
  display: flex;
  flex-direction: column;
`;

const VideoCallMain = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const FullVideoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: relative;
`;

const SmallVideoContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 150px;
  background-color: #2f3136;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10001;

  ${(props) => {
    const positions = {
      "top-left": { top: "20px", left: "20px" },
      "top-right": { top: "20px", right: "20px" },
      "bottom-left": { bottom: "80px", left: "20px" },
      "bottom-right": { bottom: "80px", right: "20px" },
    };
    return positions[props.position] || positions["bottom-right"];
  }}

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  }
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #2f3136;
`;

const NoVideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2f3136;
  color: #dcddde;
`;

const UserAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #dcddde;
  margin-bottom: 8px;
`;

const UserStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #b9bbbe;
`;

const ControlBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(32, 34, 37, 0.9) 20%,
    rgba(32, 34, 37, 0.95) 100%
  );
  padding: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  backdrop-filter: blur(10px);
`;

const ControlButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 24px;

  ${(props) =>
    props.variant === "primary"
      ? `
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: #c82333;
      transform: scale(1.1);
    }
  `
      : `
    background-color: ${
      props.$active ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"
    };
    color: white;
    backdrop-filter: blur(10px);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
  `}
`;

const PrivateVideoCall = ({
  isOpen,
  onClose,
  roomId,
  remoteUser,
  isCaller,
}) => {
  const currentUser = useAuthStore((state) => state.user);
  const displayName = currentUser?.nickname || currentUser?.username || "You";

  const {
    localStream,
    remoteStreams,
    isMicOn,
    isCamOn,
    toggleMic,
    toggleCam,
    leaveCall,
    error,
    isScreenSharing,
    toggleScreenShare,
    screenStream,
    remoteScreenStreams,
  } = useWebRTC({
    roomId,
    displayName,
    enabled: isOpen && !!roomId,
    isCreator: isCaller,
    isPrivate: false,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [smallVideoPosition, setSmallVideoPosition] = useState("bottom-right");

  const remotePeer = remoteStreams[0];
  const hasRemoteVideo = !!remotePeer?.stream;

  const localVideoRef = useCallback(
    (node) => {
      if (node && localStream) {
        node.srcObject = localStream;
      }
    },
    [localStream],
  );

  const remoteVideoRef = useCallback(
    (node) => {
      if (node && remotePeer?.stream) {
        node.srcObject = remotePeer.stream;
      }
    },
    [remotePeer?.stream],
  );

  const remoteScreenRef = useCallback(
    (node) => {
      if (node && remoteScreenStreams.length > 0) {
        node.srcObject = remoteScreenStreams[0].stream;
      }
    },
    [remoteScreenStreams],
  );

  // Auto-close call when remote peer leaves (1:1 specific)
  const hasJoinedRef = useRef(false);
  useEffect(() => {
    if (remoteStreams.length > 0) {
      hasJoinedRef.current = true;
    } else if (hasJoinedRef.current) {
      // Remote peer was here but now gone
      onClose();
    }
  }, [remoteStreams, onClose]);

  const handleSmallVideoClick = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleLeave = useCallback(() => {
    leaveCall();
    onClose();
  }, [leaveCall, onClose]);

  if (!isOpen) return null;

  const isRemoteCamOff = false; // We can add this to useWebRTC later if needed

  return (
    <VideoCallContainer>
      <VideoCallMain>
        {/* Full Screen Video (Remote) */}
        <FullVideoContainer>
          {remoteScreenStreams.length > 0 ? (
            <VideoElement ref={remoteScreenRef} autoPlay playsInline />
          ) : hasRemoteVideo ? (
            <VideoElement ref={remoteVideoRef} autoPlay playsInline />
          ) : (
            <NoVideoPlaceholder>
              <UserAvatar>{remoteUser?.name?.[0] || "?"}</UserAvatar>
              <UserName>{remoteUser?.name || "User"}</UserName>
              <UserStatus>Qo'ng'iroqqa ulanmoqda...</UserStatus>
            </NoVideoPlaceholder>
          )}
        </FullVideoContainer>

        {/* Small Video (Local) */}
        <SmallVideoContainer
          position={smallVideoPosition}
          onClick={handleSmallVideoClick}
        >
          {isCamOn && localStream ? (
            <VideoElement
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              style={{ transform: "scaleX(-1)" }}
            />
          ) : (
            <NoVideoPlaceholder>
              <UserAvatar style={{ width: 40, height: 40, fontSize: 16 }}>
                Siz
              </UserAvatar>
            </NoVideoPlaceholder>
          )}
        </SmallVideoContainer>

        <ControlBar>
          <ControlButton onClick={toggleMic} $active={isMicOn}>
            {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
          </ControlButton>

          <ControlButton onClick={toggleCam} $active={isCamOn}>
            {isCamOn ? <Video size={24} /> : <VideoOff size={24} />}
          </ControlButton>

          <ControlButton onClick={toggleScreenShare} $active={isScreenSharing}>
            {isScreenSharing ? <MonitorOff size={24} /> : <Monitor size={24} />}
          </ControlButton>

          <ControlButton variant="primary" onClick={handleLeave}>
            <PhoneOff size={24} />
          </ControlButton>
        </ControlBar>
      </VideoCallMain>
    </VideoCallContainer>
  );
};

export default PrivateVideoCall;
