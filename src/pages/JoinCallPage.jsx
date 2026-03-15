import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getMeetById, saveMeet } from "../utils/meetStore";
import { Loader, Mic, MicOff, Video, VideoOff } from "lucide-react";
import useAuthStore from "../store/authStore";
import useMeetCallStore from "../store/meetCallStore";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`;

const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #0b0d0f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: rgba(32, 34, 37, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 44px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  animation: ${fadeIn} 0.3s ease;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
`;

const Logo = styled.div`
  font-size: 40px;
  margin-bottom: 12px;
`;
const Title = styled.h1`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px;
`;
const Sub = styled.p`
  color: #8e9297;
  font-size: 14px;
  margin: 0 0 24px;
  line-height: 1.5;
`;

const RoomIdBox = styled.code`
  display: block;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 14px;
  color: #7289da;
  font-size: 13px;
  margin-bottom: 24px;
  word-break: break-all;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 16px;
  color: #fff;
  font-size: 15px;
  outline: none;
  margin-bottom: 14px;
  transition: border-color 0.2s;
  &:focus {
    border-color: #7289da;
  }
  &::placeholder {
    color: #4f545c;
  }
`;

const JoinBtn = styled.button`
  width: 100%;
  padding: 13px;
  background: #7289da;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #677bc4;
  }
`;

const Err = styled.p`
  color: #f04747;
  font-size: 13px;
  margin: 8px 0 0;
`;

const SpinLoader = styled(Loader)`
  animation: ${pulse} 1.2s linear infinite;
`;

const MediaControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 18px;
`;

const MediaBtn = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  background: ${(p) =>
    p.$active ? "rgba(255,255,255,0.09)" : "rgba(240,71,71,0.15)"};
  color: ${(p) => (p.$active ? "#fff" : "#f04747")};
  border: 1px solid
    ${(p) => (p.$active ? "rgba(255,255,255,0.1)" : "rgba(240,71,71,0.3)")};
  &:hover {
    background: ${(p) =>
      p.$active ? "rgba(255,255,255,0.15)" : "rgba(240,71,71,0.25)"};
  }
`;

const MediaLabel = styled.span`
  display: block;
  font-size: 10px;
  margin-top: 4px;
  color: ${(p) => (p.$active ? "#b9bbbe" : "#f04747")};
`;

// ─── Main page ────────────────────────────────────────────────────────────────

const JoinCallPage = () => {
  const { roomId } = useParams();
  const [stage, setStage] = useState("checking");
  const [meet, setMeet] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [initialMic, setInitialMic] = useState(false);
  const [initialCam, setInitialCam] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const hasEditedNameRef = useRef(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const bootstrapAuth = useAuthStore((state) => state.bootstrapAuth);
  const startCall = useMeetCallStore((state) => state.startCall);
  const activeCall = useMeetCallStore((state) => state.activeCall);
  const defaultDisplayName =
    user?.nickname ||
    user?.name ||
    user?.displayName ||
    user?.fullName ||
    user?.username ||
    "";

  useEffect(() => {
    if (!initialized) {
      bootstrapAuth().catch(() => {});
    }
  }, [bootstrapAuth, initialized]);

  useEffect(() => {
    let active = true;
    const fetchMeet = async () => {
      if (!initialized) {
        return;
      }

      const stored = await getMeetById(roomId);
      if (!active) return;

      if (stored) {
        setMeet(stored);
        // Determine creator by comparing creator ObjectId with current user's _id
        const currentUserId = user?._id || user?.id;
        const creatorId =
          typeof stored.creator === "object"
            ? stored.creator?._id || stored.creator
            : stored.creator;
        const amICreator = String(creatorId) === String(currentUserId);
        setIsCreator(amICreator);

        if (amICreator) {
          if (!hasEditedNameRef.current) {
            setName(defaultDisplayName || "Host");
          }
          setStage("call");
        } else {
          if (!hasEditedNameRef.current) {
            setName(defaultDisplayName);
          }
          setStage("form");
        }
      } else {
        // Meet not in DB — treat current user as guest (link shared externally)
        if (!hasEditedNameRef.current) {
          setName(defaultDisplayName);
        }
        setStage("form");
      }
    };
    fetchMeet();
    return () => {
      active = false;
    };
  }, [defaultDisplayName, initialized, roomId, user]);

  useEffect(() => {
    if (stage !== "form" || hasEditedNameRef.current || name.trim()) {
      return;
    }

    if (defaultDisplayName) {
      setName(defaultDisplayName);
    }
  }, [defaultDisplayName, name, stage]);

  const handleJoin = async () => {
    if (!name.trim()) {
      setError("Iltimos ismingizni kiriting");
      return;
    }
    await saveMeet({
      roomId,
      title: meet?.title || "Meet",
      isPrivate: meet?.isPrivate || false,
      isCreator: false,
    });
    setStage("call");
  };

  useEffect(() => {
    if (stage !== "call" || !roomId) return;

    const fallbackPath =
      sessionStorage.getItem("meet_return_path") || "/chats";

    startCall({
      roomId,
      chatTitle: meet?.title || "Meet",
      displayName: name.trim(),
      isCreator,
      isPrivate: meet?.isPrivate || false,
      initialMicOn: initialMic,
      initialCamOn: initialCam,
      returnPath: fallbackPath,
    });
  }, [
    stage,
    roomId,
    meet?.title,
    meet?.isPrivate,
    name,
    isCreator,
    initialMic,
    initialCam,
    startCall,
  ]);

  if (stage === "checking") {
    return (
      <Page>
        <Card>
          <SpinLoader size={32} color="#7289da" />
        </Card>
      </Page>
    );
  }

  if (stage === "call") {
    return <Page>{!activeCall && <Card><SpinLoader size={32} color="#7289da" /></Card>}</Page>;
  }

  // stage === "form"
  return (
    <Page>
      <Card>
        <Logo>📹</Logo>
        <Title>Video Callga qo'shilish</Title>
        <Sub>Siz quyidagi callga taklif qilindingiz:</Sub>
        <RoomIdBox>{roomId}</RoomIdBox>
        <Input
          autoFocus
          value={name}
          onChange={(e) => {
            hasEditedNameRef.current = true;
            setName(e.target.value);
          }}
          placeholder="Ismingizni kiriting"
          onKeyDown={(e) => e.key === "Enter" && handleJoin()}
        />
        <MediaControls>
          <div style={{ textAlign: "center" }}>
            <MediaBtn
              $active={initialMic}
              onClick={() => setInitialMic((p) => !p)}
            >
              {initialMic ? <Mic size={22} /> : <MicOff size={22} />}
            </MediaBtn>
            <MediaLabel $active={initialMic}>
              {initialMic ? "Yoniq" : "O'chiq"}
            </MediaLabel>
          </div>
          <div style={{ textAlign: "center" }}>
            <MediaBtn
              $active={initialCam}
              onClick={() => setInitialCam((p) => !p)}
            >
              {initialCam ? <Video size={22} /> : <VideoOff size={22} />}
            </MediaBtn>
            <MediaLabel $active={initialCam}>
              {initialCam ? "Yoniq" : "O'chiq"}
            </MediaLabel>
          </div>
        </MediaControls>
        {error && <Err>{error}</Err>}
        <JoinBtn onClick={handleJoin}>🎥 Callga kirish</JoinBtn>
      </Card>
    </Page>
  );
};

export default JoinCallPage;
