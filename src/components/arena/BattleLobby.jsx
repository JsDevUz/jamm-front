import React, { useState } from "react";
import styled from "styled-components";
import { useArena } from "../../contexts/ArenaContext";
import useAuthStore from "../../store/authStore";
import {
  Users,
  Copy,
  CheckCircle,
  Plus,
  ArrowLeft,
  LogOut,
  Link2,
  Clock,
  Sparkles,
  User,
  Swords,
} from "lucide-react";
import toast from "react-hot-toast";
import BattleHistoryList from "./BattleHistoryList";
import ArenaHeader from "./ArenaHeader";
import BattleHistoryDialog from "./BattleHistoryDialog";
import CreateBattleDialog from "./CreateBattleDialog";
import { History as HistoryIcon } from "lucide-react";
import { PlusBtn } from "../ProfilePage";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    background-color: var(--background-color);
    animation: slideInFromRight 0.3s ease-out;
    padding: 20px;
    overflow-y: auto;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;
const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color, #b9bbbe);
`;

const JoinBox = styled.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const SingleLineJoin = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => props.bgColor || "var(--primary-color)"};
  color: white;
  border: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;

// --- Lobby Styles ---
const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const PlayerRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

const AvatarName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: var(--text-color);
`;

const ScoreBadge = styled.span`
  background-color: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
`;

// --- Question Area ---
const QuestionBox = styled.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const OptionBtn = styled.button`
  padding: 16px;
  background-color: var(--background-color);
  border: 2px solid var(--border-color);
  color: var(--text-color);
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary-color);
  }

  ${(props) =>
    props.selected &&
    `
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  `}
`;

const BattleLobby = ({ initialRoomId, onBack }) => {
  const {
    tests,
    activeBattle,
    joinBattle,
    startBattle,
    submitAnswer,
    nextQuestion,
    endBattle,
    leaveBattle,
    guestName,
    setGuestSession,
    activeBattles,
    fetchActiveBattles,
    socketRef,
    fetchTests,
  } = useArena();

  React.useEffect(() => {
    fetchTests();
  }, [fetchTests]);
  const [roomIdInput, setRoomIdInput] = useState("");
  const [tempGuestName, setTempGuestName] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  React.useEffect(() => {
    if (initialRoomId && initialRoomId !== "0" && !activeBattle) {
      joinBattle(initialRoomId);
    }
  }, [initialRoomId, activeBattle, joinBattle]);

  React.useEffect(() => {
    if (!activeBattle) {
      fetchActiveBattles();
      const interval = setInterval(fetchActiveBattles, 10000); // Polling every 10s
      return () => clearInterval(interval);
    }
  }, [activeBattle, fetchActiveBattles]);

  // Derive Current Test
  const currentTest = activeBattle
    ? tests.find((t) => t._id === activeBattle.testId)
    : null;
  const isHost =
    activeBattle && user && String(activeBattle.hostId) === String(user._id);

  const handleJoin = () => {
    if (!roomIdInput.trim()) return;
    joinBattle(roomIdInput.trim());
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/arena/battle/${activeBattle.roomId}`;
    navigator.clipboard.writeText(url);
    toast.success("Havola nusxalandi!");
  };

  // --- Render Logic ---
  const getHeaderAndContent = () => {
    // 1. Guest Name Entry
    if (!token && !guestName) {
      return {
        headerProps: {
          title: "Ismingizni kiriting",
          onBack: onBack,
        },
        content: (
          <JoinBox>
            <p style={{ color: "var(--text-muted-color)", margin: 0 }}>
              Bellashuvda qatnashish uchun ismingizni kiriting.
            </p>
            <Input
              placeholder="Ismingiz..."
              value={tempGuestName}
              onChange={(e) => setTempGuestName(e.target.value)}
            />
            <Button
              onClick={() =>
                tempGuestName.trim() && setGuestSession(tempGuestName.trim())
              }
            >
              Kirish
            </Button>
          </JoinBox>
        ),
      };
    }

    // 2. Join Battle / Room Selection
    if (!activeBattle) {
      return {
        headerProps: {
          title: "Bellashuvlar",
          onBack: onBack,
          rightContent: (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setShowHistory(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-color)",
                  cursor: "pointer",
                  padding: "8px",
                  display: "flex",
                }}
              >
                <HistoryIcon size={20} />
              </button>
            </div>
          ),
        },
        content: (
          <div style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}>
            <JoinBox>
              <Label>Xona ID si orqali qo'shilish</Label>
              <SingleLineJoin>
                <Input
                  placeholder="Masalan: battle_1234_567"
                  value={roomIdInput}
                  onChange={(e) => setRoomIdInput(e.target.value)}
                />
                <Button onClick={handleJoin} style={{ width: "auto" }}>
                  <Plus size={20} />
                </Button>
              </SingleLineJoin>
            </JoinBox>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Label
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <Sparkles size={16} color="var(--primary-color)" /> Aktiv
                  Bellashuvlar ({activeBattles?.length || 0})
                </Label>

                <PlusBtn onClick={() => setShowCreate(true)}>
                  <Plus size={16} />
                </PlusBtn>
              </div>

              {activeBattles && activeBattles.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {activeBattles.map((b) => (
                    <PlayerRow key={b.roomId}>
                      <AvatarName
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "2px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          <Swords size={14} color="var(--text-color)" />
                          {b.roomName || "Noma'lum Bellashuv"}
                        </div>
                      </AvatarName>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            color: "var(--text-muted-color)",
                          }}
                        >
                          <User size={12} style={{ marginRight: "4px" }} />
                          <span>{b.participantsCount}</span>
                        </span>
                        <Button
                          style={{
                            width: "auto",
                            padding: "6px 12px",
                            fontSize: "13px",
                          }}
                          onClick={() => {
                            console.log("Joining battle:", b.roomId);
                            joinBattle(b.roomId);
                          }}
                        >
                          Kirish
                        </Button>
                      </div>
                    </PlayerRow>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    border: "1px dashed var(--border-color)",
                    borderRadius: "12px",
                    color: "var(--text-muted-color)",
                    fontSize: "14px",
                  }}
                >
                  Hozircha ochiq bellashuvlar yo'q. <br /> O'zingiz yangi xona
                  yarating!
                </div>
              )}
            </div>
          </div>
        ),
      };
    }

    // 3. Lobby State (Waiting)
    if (activeBattle.status === "waiting") {
      return {
        headerProps: {
          title: "Kutish Zali",
          rightContent: (
            <button
              onClick={() => leaveBattle(activeBattle.roomId)}
              style={{
                background: "#e74c3c",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LogOut size={18} />
            </button>
          ),
        },
        content: (
          <div style={{ maxWidth: "450px", margin: "0 auto", width: "100%" }}>
            <div
              style={{
                background: "#333",
                padding: "12px",
                fontSize: "13px",
                borderRadius: "8px",
                marginBottom: "20px",
                border: "1px solid var(--border-color)",
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <User size={12} />:{" "}
                <b>
                  {user?.nickname || user?.username || guestName || "Mehmon"}
                </b>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted-color)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span> Xona ID: {activeBattle.roomId} </span>
                <button
                  onClick={handleCopyLink}
                  style={{
                    marginLeft: 12,
                    background: "none",
                    border: "none",
                    color: "var(--primary-color)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <PlayerList>
              {activeBattle.participants.map((p) => (
                <PlayerRow key={p.userId}>
                  <AvatarName>
                    <User size={12} /> {p.nickname}{" "}
                    {p.userId === activeBattle.hostId && "(Host)"}
                  </AvatarName>
                </PlayerRow>
              ))}
            </PlayerList>

            {isHost && (
              <Button
                onClick={() => startBattle(activeBattle.roomId)}
                style={{ marginTop: 24, fontSize: 18, padding: 16 }}
              >
                Musobaqani Boshlash! 🚀
              </Button>
            )}
          </div>
        ),
      };
    }

    // 4. Playing State
    if (activeBattle.status === "playing") {
      if (!currentTest)
        return {
          headerProps: { title: "Yuklanmoqda..." },
          content: <div>Testni yuklab bo'lmadi...</div>,
        };

      const currentQ = currentTest.questions[activeBattle.currentQuestionIndex];
      const myParticipantData = activeBattle.participants.find(
        (p) => p.socketId === socketRef.current?.id,
      );

      if (!currentQ) {
        if (isHost) endBattle(activeBattle.roomId);
        return {
          headerProps: { title: "Tugadi" },
          content: (
            <div>Barcha savollar tugadi... Natijalar hisoblanmoqda...</div>
          ),
        };
      }

      return {
        headerProps: {
          title: `Savol ${activeBattle.currentQuestionIndex + 1} / ${currentTest.questions.length}`,
          rightContent: (
            <ScoreBadge>
              Sizning ballingiz: {myParticipantData?.score || 0}
            </ScoreBadge>
          ),
        },
        content: (
          <>
            <QuestionBox>
              <h2 style={{ color: "var(--text-color)" }}>
                {currentQ.questionText}
              </h2>

              <OptionContainer>
                {currentQ.options.map((opt, idx) => (
                  <OptionBtn
                    key={idx}
                    selected={myParticipantData?.lastAnswerIndex === idx}
                    disabled={myParticipantData?.hasAnsweredCurrent}
                    onClick={() => {
                      submitAnswer(activeBattle.roomId, idx);
                    }}
                  >
                    {opt}
                  </OptionBtn>
                ))}
              </OptionContainer>
            </QuestionBox>

            <div style={{ marginTop: 32 }}>
              <h3 style={{ color: "var(--text-color)" }}>Jonli Natijalar</h3>
              <PlayerList>
                {activeBattle.participants.map((p) => (
                  <PlayerRow key={p.userId}>
                    <AvatarName>
                      {p.hasAnsweredCurrent ? (
                        <CheckCircle color="#2ecc71" size={16} />
                      ) : (
                        <Clock color="#3498db" size={16} />
                      )}
                      {p.nickname}
                    </AvatarName>
                    <ScoreBadge>{p.score} ball</ScoreBadge>
                  </PlayerRow>
                ))}
              </PlayerList>
            </div>
          </>
        ),
      };
    }

    // 5. Finished State
    if (activeBattle.status === "finished") {
      return {
        headerProps: {
          title: "🏆 Yakuniy Natijalar",
        },
        content: (
          <>
            <PlayerList>
              {activeBattle.participants.map((p, idx) => (
                <PlayerRow key={p.userId} style={{ padding: 24 }}>
                  <AvatarName style={{ fontSize: 20 }}>
                    {idx === 0
                      ? "🥇"
                      : idx === 1
                        ? "🥈"
                        : idx === 2
                          ? "🥉"
                          : `${idx + 1}.`}
                    {p.nickname}
                  </AvatarName>
                  <ScoreBadge style={{ fontSize: 20 }}>
                    {p.score} ball
                  </ScoreBadge>
                </PlayerRow>
              ))}
            </PlayerList>
            <Button onClick={() => leaveBattle()} style={{ marginTop: 32 }}>
              Bellashuvni tark etish
            </Button>
          </>
        ),
      };
    }

    return { headerProps: { title: "Bilimlar Bellashuvi" }, content: null };
  };

  const { headerProps, content } = getHeaderAndContent();

  return (
    <Container>
      <ArenaHeader {...headerProps} />
      {content}
      <BattleHistoryDialog
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
      <CreateBattleDialog
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </Container>
  );
};

export default BattleLobby;
