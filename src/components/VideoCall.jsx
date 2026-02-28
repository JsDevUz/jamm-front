import React, { useState, useRef, useEffect } from "react";
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
  MessageSquare,
  X,
  Users,
  Settings,
} from "lucide-react";

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

const VideoCallHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #18191c;
  border-bottom: 1px solid #40444b;
`;

const CallInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CallStatus = styled.div`
  color: #dcddde;
  font-size: 16px;
  font-weight: 600;
`;

const CallTimer = styled.div`
  color: #b9bbbe;
  font-size: 14px;
`;

const VideoCallMain = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const MainVideoArea = styled.div`
  flex: 1;
  position: relative;
  background-color: #36393f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoVideoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #b9bbbe;
`;

const UserAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: 600;
`;

const ParticipantsSidebar = styled.div`
  width: 300px;
  background-color: #2f3136;
  border-left: 1px solid #40444b;
  display: flex;
  flex-direction: column;
`;

const ParticipantsHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #40444b;
  color: #dcddde;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ParticipantsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
`;

const ParticipantItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #40444b;
  }
`;

const ParticipantAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  flex-shrink: 0;
`;

const ParticipantInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ParticipantName = styled.div`
  color: #dcddde;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ParticipantStatus = styled.div`
  color: #72767d;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatusIcon = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.speaking ? "#43b581" : "#72767d")};
`;

const SelfVideo = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 200px;
  height: 150px;
  background-color: #36393f;
  border-radius: 12px;
  border: 2px solid #40444b;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    border-color: #7289da;
  }
`;

const SelfVideoContent = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ControlBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(to top, rgba(24, 25, 28, 0.9), transparent);
  display: flex;
  justify-content: center;
  gap: 16px;
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
    background-color: #40444b;
    color: #dcddde;
    
    &:hover {
      background-color: #4a4d52;
      transform: scale(1.1);
    }
  `}

  ${(props) =>
    props.active &&
    `
    background-color: #43b581;
    color: white;
  `}
`;

const ChatPanel = styled.div`
  position: absolute;
  right: ${(props) => (props.isOpen ? "0" : "-400px")};
  top: 0;
  bottom: 0;
  width: 400px;
  background-color: #2f3136;
  border-left: 1px solid #40444b;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 10001;
`;

const ChatHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #40444b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #36393f;
`;

const ChatTitle = styled.div`
  color: #dcddde;
  font-weight: 600;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChatMessage = styled.div`
  display: flex;
  gap: 8px;
`;

const ChatMessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
`;

const ChatMessageContent = styled.div`
  flex: 1;
`;

const ChatMessageAuthor = styled.div`
  color: #7289da;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const ChatMessageText = styled.div`
  color: #dcddde;
  font-size: 14px;
  line-height: 1.4;
`;

const ChatInput = styled.div`
  padding: 16px;
  border-top: 1px solid #40444b;
  background-color: #36393f;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  background-color: #40444b;
  border-radius: 8px;
  padding: 8px 12px;
`;

const ChatInputField = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: #dcddde;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #72767d;
  }
`;

const ChatSendButton = styled.button`
  background: none;
  border: none;
  color: #7289da;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4a4d52;
  }
`;

const VideoCall = ({ isOpen, onClose, user }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: user || "Alice",
      isSpeaking: false,
      isMuted: false,
      hasVideo: true,
    },
    { id: 2, name: "Bob", isSpeaking: false, isMuted: true, hasVideo: false },
    {
      id: 3,
      name: "Charlie",
      isSpeaking: true,
      isMuted: false,
      hasVideo: true,
    },
  ]);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Simulate call timer
      const timer = setInterval(() => {
        setCallTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    // Simulate participant speaking changes
    const interval = setInterval(() => {
      setParticipants((prev) =>
        prev.map((p) => ({
          ...p,
          isSpeaking: Math.random() > 0.8,
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          author: "You",
          text: chatInput,
          timestamp: new Date(),
        },
      ]);
      setChatInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <VideoCallContainer>
      <VideoCallHeader>
        <CallInfo>
          <CallStatus>📹 Video Call with {user || "Alice"}</CallStatus>
          <CallTimer>{formatTime(callTime)}</CallTimer>
        </CallInfo>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#dcddde",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            <MessageSquare size={20} />
          </button>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#dcddde",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            <X size={20} />
          </button>
        </div>
      </VideoCallHeader>

      <VideoCallMain>
        <MainVideoArea>
          <MainVideo ref={remoteVideoRef} autoPlay playsInline />
          <NoVideoPlaceholder>
            <UserAvatar>{(user || "Alice")[0]}</UserAvatar>
            <div>Waiting for {user || "Alice"} to join...</div>
          </NoVideoPlaceholder>
        </MainVideoArea>

        <ParticipantsSidebar>
          <ParticipantsHeader>
            <span>Participants ({participants.length})</span>
            <Users size={16} />
          </ParticipantsHeader>
          <ParticipantsList>
            {participants.map((participant) => (
              <ParticipantItem key={participant.id}>
                <ParticipantAvatar>{participant.name[0]}</ParticipantAvatar>
                <ParticipantInfo>
                  <ParticipantName>{participant.name}</ParticipantName>
                  <ParticipantStatus>
                    <StatusIcon speaking={participant.isSpeaking} />
                    {participant.isMuted && <MicOff size={12} />}
                    {!participant.hasVideo && <VideoOff size={12} />}
                  </ParticipantStatus>
                </ParticipantInfo>
              </ParticipantItem>
            ))}
          </ParticipantsList>
        </ParticipantsSidebar>

        <SelfVideo>
          <SelfVideoContent ref={localVideoRef} autoPlay muted playsInline />
        </SelfVideo>

        <ControlBar>
          <ControlButton onClick={() => setIsMuted(!isMuted)} active={!isMuted}>
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </ControlButton>

          <ControlButton
            onClick={() => setIsVideoOff(!isVideoOff)}
            active={!isVideoOff}
          >
            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
          </ControlButton>

          <ControlButton
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            active={isScreenSharing}
          >
            {isScreenSharing ? <MonitorOff size={24} /> : <Monitor size={24} />}
          </ControlButton>

          <ControlButton variant="primary" onClick={onClose}>
            <PhoneOff size={24} />
          </ControlButton>
        </ControlBar>
      </VideoCallMain>

      <ChatPanel isOpen={isChatOpen}>
        <ChatHeader>
          <ChatTitle>Call Chat</ChatTitle>
          <button
            onClick={() => setIsChatOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "#dcddde",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={16} />
          </button>
        </ChatHeader>

        <ChatMessages>
          {chatMessages.map((message) => (
            <ChatMessage key={message.id}>
              <ChatMessageAvatar>{message.author[0]}</ChatMessageAvatar>
              <ChatMessageContent>
                <ChatMessageAuthor>{message.author}</ChatMessageAuthor>
                <ChatMessageText>{message.text}</ChatMessageText>
              </ChatMessageContent>
            </ChatMessage>
          ))}
        </ChatMessages>

        <ChatInput>
          <ChatInputWrapper>
            <ChatInputField
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <ChatSendButton onClick={handleSendMessage}>
              <MessageSquare size={16} />
            </ChatSendButton>
          </ChatInputWrapper>
        </ChatInput>
      </ChatPanel>
    </VideoCallContainer>
  );
};

export default VideoCall;
