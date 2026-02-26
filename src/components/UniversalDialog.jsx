import React, { useState } from "react";
import styled from "styled-components";
import { X, Video, Users, Calendar, Clock } from "lucide-react";

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogContainer = styled.div`
  background-color: #36393f;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  /* Mobile responsive */
  @media (max-width: 768px) {
    width: 95%;
    max-width: 95%;
    padding: 16px;
    margin: 0 16px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    padding: 12px;
    margin: 0;
    border-radius: 8px;
  }
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const DialogTitle = styled.h2`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4a4d52;
    color: #dcddde;
  }
`;

const DialogContent = styled.div`
  color: #dcddde;
  margin-bottom: 24px;
`;

const Description = styled.p`
  color: #b9bbbe;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #dcddde;
`;

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #4a4d52;
  border-radius: 8px;
  color: #7289da;
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  font-size: 14px;
`;

const FeatureTitle = styled.div`
  font-weight: 600;
  margin-bottom: 2px;
`;

const FeatureDescription = styled.div`
  color: #b9bbbe;
  font-size: 12px;
`;

const CallOptions = styled.div`
  background-color: #2f3136;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

const OptionTitle = styled.h3`
  color: #dcddde;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const OptionDescription = styled.p`
  color: #b9bbbe;
  font-size: 14px;
  margin-bottom: 16px;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  display: block;
  color: #b9bbbe;
  font-size: 14px;
  margin-bottom: 8px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  background-color: #40444b;
  border: 1px solid #202225;
  border-radius: 6px;
  color: #dcddde;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #7289da;
  }

  &::placeholder {
    color: #72767d;
  }
`;

const DialogActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === "primary"
      ? `
    background-color: #7289da;
    color: white;
    
    &:hover {
      background-color: #677bc4;
      transform: translateY(-1px);
    }
  `
      : `
    background-color: #4a4d52;
    color: #dcddde;
    
    &:hover {
      background-color: #5a5d62;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const UniversalDialog = ({ isOpen, onClose, onCreateCall }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreateCall = () => {
    if (title.trim()) {
      onCreateCall({
        title: title.trim(),
        description: description.trim(),
        isPrivate,
      });
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <DialogOverlay onClick={handleClose}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>
            <Video size={24} />
            Create Group Video Call
          </DialogTitle>
          <CloseButton onClick={handleClose}>
            <X size={20} />
          </CloseButton>
        </DialogHeader>

        <DialogContent>
          <Description>
            Create a group video call room where multiple participants can join
            and collaborate.
          </Description>

          <FeatureList>
            <FeatureItem>
              <FeatureIcon>
                <Users size={16} />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Multiple Participants</FeatureTitle>
                <FeatureDescription>
                  Invite up to 50 people to join your video call
                </FeatureDescription>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <Video size={16} />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>HD Video Quality</FeatureTitle>
                <FeatureDescription>
                  Crystal clear video with adaptive quality
                </FeatureDescription>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <Clock size={16} />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Unlimited Duration</FeatureTitle>
                <FeatureDescription>
                  No time limits on your group conversations
                </FeatureDescription>
              </FeatureText>
            </FeatureItem>
          </FeatureList>

          <CallOptions>
            <OptionTitle>Call Details</OptionTitle>
            <OptionDescription>
              Set up your video call room with a title and optional description.
            </OptionDescription>

            <InputGroup>
              <InputLabel>Call Title *</InputLabel>
              <InputField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter call title..."
                maxLength={100}
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>Kimlar qo'shila oladi?</InputLabel>
              <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    color: "#dcddde",
                    fontSize: 14,
                  }}
                >
                  <input
                    type="radio"
                    name="privacy"
                    checked={!isPrivate}
                    onChange={() => setIsPrivate(false)}
                    style={{ accentColor: "#7289da" }}
                  />
                  🌐 Barcha — ruxsatsiz
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    color: "#dcddde",
                    fontSize: 14,
                  }}
                >
                  <input
                    type="radio"
                    name="privacy"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(true)}
                    style={{ accentColor: "#7289da" }}
                  />
                  🔒 Faqat mening ruxsatim bilan
                </label>
              </div>
              {isPrivate && (
                <p
                  style={{ color: "#8e9297", fontSize: 12, margin: "4px 0 0" }}
                >
                  Mehmonlar siz ruxsat berguncha kutadi
                </p>
              )}
            </InputGroup>

            <InputGroup>
              <InputLabel>Description (Optional)</InputLabel>
              <InputField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this call about?"
                maxLength={500}
              />
            </InputGroup>
          </CallOptions>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="primary"
            onClick={handleCreateCall}
            disabled={!title.trim()}
          >
            Create Call
          </Button>
        </DialogActions>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default UniversalDialog;
