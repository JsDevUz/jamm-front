import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Phone, User, LogIn, Loader, CheckCircle, XCircle } from "lucide-react";
import useAuthStore from "../store/authStore";
import { API_BASE_URL } from "../config/env";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.92) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Modal = styled.div`
  background: rgba(32, 34, 37, 0.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 36px 40px;
  min-width: 380px;
  max-width: 440px;
  width: 100%;
  box-shadow:
    0 32px 64px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  animation: ${fadeIn} 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Subtitle = styled.p`
  color: #8e9297;
  font-size: 14px;
  margin: 0 0 28px;
  line-height: 1.5;
`;

const Label = styled.label`
  display: block;
  color: #b9bbbe;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #7289da;
    box-shadow: 0 0 0 3px rgba(114, 137, 218, 0.25);
  }

  &::placeholder {
    color: #4f545c;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  color: #4f545c;
  font-size: 13px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
`;

const Btn = styled.button`
  width: 100%;
  padding: 13px 20px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  ${(p) =>
    p.$primary
      ? `
    background: #7289da;
    color: white;
    &:hover { background: #677bc4; transform: translateY(-1px); }
  `
      : `
    background: rgba(255,255,255,0.06);
    color: #b9bbbe;
    border: 1px solid rgba(255,255,255,0.08);
    &:hover { background: rgba(255,255,255,0.1); color: white; }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusBox = styled.div`
  text-align: center;
  padding: 24px 0;
  color: #b9bbbe;

  svg {
    margin-bottom: 12px;
  }
  h3 {
    margin: 0 0 6px;
    color: #ffffff;
    font-size: 18px;
  }
  p {
    margin: 0;
    font-size: 14px;
  }
`;

/**
 * JoinCallModal
 *
 * Props:
 *   chatId – the chat/group ID that has an active call
 *   onCallReady(roomId) – called when the guest is approved and can enter
 *   onClose – close modal without joining
 */
const JoinCallModal = ({ chatId, onCallReady, onClose }) => {
  const [guestName, setGuestName] = useState("");
  const [mode, setMode] = useState("choose"); // choose | ghost | waiting | approved | rejected
  const [requestId, setRequestId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pollRef = useRef(null);

  // Read logged-in user from Zustand store
  const currentUser = useAuthStore((state) => state.user);

  const sendJoinRequest = async (name, userId) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/chats/${chatId}/call/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, userId }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Xatolik yuz berdi");
      }
      const { requestId } = await res.json();
      setRequestId(requestId);
      setMode("waiting");
      startPolling(requestId);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = (reqId) => {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/chats/${chatId}/call/join/${reqId}/status`,
        );
        if (!res.ok) return;
        const data = await res.json();

        if (data.status === "approved") {
          clearInterval(pollRef.current);
          setMode("approved");
          setTimeout(() => onCallReady(data.roomId), 1200);
        } else if (data.status === "rejected") {
          clearInterval(pollRef.current);
          setMode("rejected");
        }
      } catch {}
    }, 2000);
  };

  useEffect(() => () => clearInterval(pollRef.current), []);

  // If logged in, skip the choose screen and go straight to waiting
  const handleLoggedInJoin = () => {
    const name =
      currentUser.nickname || currentUser.username || "Foydalanuvchi";
    sendJoinRequest(name, currentUser._id || currentUser.id);
  };

  const handleGhostJoin = () => {
    if (!guestName.trim()) {
      setError("Iltimos ismingizni kiriting");
      return;
    }
    sendJoinRequest(guestName.trim(), null);
  };

  const handleLoginRedirect = () => {
    window.location.href = `/auth?redirect=/join-call/${chatId}`;
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  if (mode === "waiting") {
    return (
      <Overlay onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <StatusBox>
            <Loader
              size={40}
              color="#7289da"
              style={{ animation: "spin 1.2s linear infinite" }}
            />
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <h3>Ruxsat kutilmoqda…</h3>
            <p>Call creatori sizni qabul qilishini kuting</p>
          </StatusBox>
          <Btn
            onClick={() => {
              clearInterval(pollRef.current);
              onClose();
            }}
          >
            Bekor qilish
          </Btn>
        </Modal>
      </Overlay>
    );
  }

  if (mode === "approved") {
    return (
      <Overlay>
        <Modal>
          <StatusBox>
            <CheckCircle size={48} color="#43b581" />
            <h3>Ruxsat berildi!</h3>
            <p>Callga ulanmoqdasiz…</p>
          </StatusBox>
        </Modal>
      </Overlay>
    );
  }

  if (mode === "rejected") {
    return (
      <Overlay onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <StatusBox>
            <XCircle size={48} color="#f04747" />
            <h3>Rad etildi</h3>
            <p>Call creatori sizni qabul qilmadi</p>
          </StatusBox>
          <Btn onClick={onClose}>Yopish</Btn>
        </Modal>
      </Overlay>
    );
  }

  // Ghost name entry mode
  if (mode === "ghost") {
    return (
      <Overlay onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <Title>
            <Phone size={20} color="#7289da" /> Callga qo'shilish
          </Title>
          <Subtitle>
            Login qilmasdan ism kiritib qo'shiling. Creator ruxsat beradi.
          </Subtitle>

          <Label>Ismingiz</Label>
          <Input
            autoFocus
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Masalan: Ali"
            onKeyDown={(e) => e.key === "Enter" && handleGhostJoin()}
          />
          {error && (
            <p style={{ color: "#f04747", fontSize: 13, marginTop: 8 }}>
              {error}
            </p>
          )}

          <ButtonRow>
            <Btn $primary onClick={handleGhostJoin} disabled={loading}>
              {loading ? <Loader size={16} /> : <User size={16} />}
              {loading ? "So'rov yuborilmoqda…" : "Qo'shilish"}
            </Btn>
            <Btn onClick={() => setMode("choose")}>Orqaga</Btn>
          </ButtonRow>
        </Modal>
      </Overlay>
    );
  }

  // Default: choose mode
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>
          <Phone size={20} color="#7289da" /> Video Callga qo'shilish
        </Title>
        <Subtitle>
          {currentUser
            ? `${currentUser.nickname || currentUser.username} sifatida qo'shilasizmi?`
            : "Qanday qo'shilmoqchisiz?"}
        </Subtitle>

        <ButtonRow>
          {currentUser ? (
            <Btn $primary onClick={handleLoggedInJoin} disabled={loading}>
              {loading ? <Loader size={16} /> : <CheckCircle size={16} />}
              {loading
                ? "Yuborilmoqda…"
                : `${currentUser.nickname || currentUser.username} sifatida qo'shilish`}
            </Btn>
          ) : (
            <>
              <Btn $primary onClick={() => setMode("ghost")}>
                <User size={16} /> Mehmon sifatida (ism bilan)
              </Btn>
              <Divider>yoki</Divider>
              <Btn onClick={handleLoginRedirect}>
                <LogIn size={16} /> Login qilib qo'shilish
              </Btn>
            </>
          )}
        </ButtonRow>
      </Modal>
    </Overlay>
  );
};

export default JoinCallModal;
