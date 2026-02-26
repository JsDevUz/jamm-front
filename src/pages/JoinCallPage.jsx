import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useParams } from "react-router-dom";
import GroupVideoCall from "../components/GroupVideoCall";
import { useWebRTC } from "../hooks/useWebRTC";
import { getMeetById, saveMeet } from "../utils/meetStore";
import { Clock, XCircle, Loader } from "lucide-react";

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

const SmallBtn = styled.button`
  padding: 10px 22px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #b9bbbe;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
  }
`;

const StatusIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;
const StatusTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;
const StatusSub = styled.div`
  color: #8e9297;
  font-size: 13px;
  margin-bottom: 20px;
`;

const SpinLoader = styled(Loader)`
  animation: ${pulse} 1.2s linear infinite;
`;

// ─── Guest sub-component (handles waiting/rejected/joined states) ────────────

const GuestCall = ({ roomId, guestName, meet }) => {
  const { joinStatus, error, leaveCall } = useWebRTC({
    roomId,
    displayName: guestName,
    enabled: true,
    isCreator: false,
    isPrivate: meet?.isPrivate || false,
  });

  if (joinStatus === "connecting") {
    return (
      <Page>
        <Card>
          <StatusIcon>
            <SpinLoader size={40} color="#7289da" />
          </StatusIcon>
          <StatusTitle>Ulanmoqda…</StatusTitle>
        </Card>
      </Page>
    );
  }

  if (joinStatus === "waiting") {
    return (
      <Page>
        <Card>
          <StatusIcon>
            <Clock size={48} color="#faa61a" />
          </StatusIcon>
          <StatusTitle>Ruxsat kutilmoqda…</StatusTitle>
          <StatusSub>Call yaratuvchisi sizga ruxsat berishini kuting</StatusSub>
          <SmallBtn onClick={leaveCall}>Bekor qilish</SmallBtn>
        </Card>
      </Page>
    );
  }

  if (joinStatus === "rejected" || error) {
    return (
      <Page>
        <Card>
          <StatusIcon>
            <XCircle size={48} color="#f04747" />
          </StatusIcon>
          <StatusTitle>Rad etildi</StatusTitle>
          <StatusSub>
            {error || "Call yaratuvchisi so'rovingizni rad etdi"}
          </StatusSub>
          <SmallBtn onClick={() => (window.location.href = "/")}>
            Bosh sahifaga
          </SmallBtn>
        </Card>
      </Page>
    );
  }

  // joined — render the call
  return (
    <GroupVideoCall
      isOpen
      onClose={() => window.history.back()}
      roomId={roomId}
      chatTitle={meet?.title || "Guruh Call"}
      isCreator={false}
      isPrivate={meet?.isPrivate || false}
    />
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const JoinCallPage = () => {
  const { roomId } = useParams();
  const [stage, setStage] = useState("checking"); // checking | form | call
  const [meet, setMeet] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = getMeetById(roomId);
    setMeet(stored);

    if (stored?.isCreator) {
      // Creator — auto-join, skip the name form
      const user = (() => {
        try {
          return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
          return null;
        }
      })();
      setName(user?.nickname || user?.username || "Host");
      setStage("call");
    } else {
      // Guest — pre-fill name if logged in, then show form
      const user = (() => {
        try {
          return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
          return null;
        }
      })();
      setName(user?.nickname || user?.username || "");
      setStage("form");
    }
  }, [roomId]);

  const handleJoin = () => {
    if (!name.trim()) {
      setError("Iltimos ismingizni kiriting");
      return;
    }
    // Save guest meet to history
    saveMeet({
      roomId,
      title: meet?.title || "Guruh Call",
      isPrivate: meet?.isPrivate || false,
      isCreator: false,
    });
    setStage("call");
  };

  if (stage === "checking") {
    return (
      <Page>
        <Card>
          <Loader size={32} color="#7289da" />
        </Card>
      </Page>
    );
  }

  if (stage === "call") {
    if (meet?.isCreator) {
      // Creator — render call directly (no GuestCall state machine needed)
      return (
        <GroupVideoCall
          isOpen
          onClose={() => window.history.back()}
          roomId={roomId}
          chatTitle={meet?.title || "Guruh Call"}
          isCreator
          isPrivate={meet?.isPrivate || false}
        />
      );
    }
    return <GuestCall roomId={roomId} guestName={name} meet={meet} />;
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
          onChange={(e) => setName(e.target.value)}
          placeholder="Ismingizni kiriting"
          onKeyDown={(e) => e.key === "Enter" && handleJoin()}
        />
        {error && <Err>{error}</Err>}
        <JoinBtn onClick={handleJoin}>🎥 Callga kirish</JoinBtn>
      </Card>
    </Page>
  );
};

export default JoinCallPage;
