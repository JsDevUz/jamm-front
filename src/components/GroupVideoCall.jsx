import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Copy,
  Check,
  Users,
  Loader,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Monitor,
  MonitorOff,
} from "lucide-react";
import { useWebRTC } from "../hooks/useWebRTC";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #0b0d0f;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease-out;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
`;

const CallInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const CallTitle = styled.span`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`;
const CallSub = styled.span`
  color: #72767d;
  font-size: 11px;
  font-family: monospace;
`;

const TopActions = styled.div`
  display: flex;
  gap: 8px;
`;

const TinyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 13px;
  border-radius: 8px;
  border: 1px solid
    ${(p) => (p.$danger ? "rgba(240,71,71,0.3)" : "rgba(255,255,255,0.1)")};
  background: ${(p) =>
    p.$danger ? "rgba(240,71,71,0.1)" : "rgba(255,255,255,0.06)"};
  color: ${(p) => (p.$danger ? "#f04747" : "#b9bbbe")};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  &:hover {
    background: ${(p) =>
      p.$danger ? "rgba(240,71,71,0.2)" : "rgba(255,255,255,0.12)"};
    color: ${(p) => (p.$danger ? "#ff6060" : "#fff")};
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

// ─── Video Grid ───────────────────────────────────────────────────────────────

const VideoGrid = styled.div`
  flex: 1;
  display: grid;
  padding: 14px;
  gap: 10px;
  overflow: hidden;
  ${(p) => {
    const n = p.$count;
    if (n === 1)
      return css`
        grid-template-columns: 1fr;
      `;
    if (n === 2)
      return css`
        grid-template-columns: 1fr 1fr;
      `;
    if (n <= 4)
      return css`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      `;
    return css`
      grid-template-columns: repeat(3, 1fr);
    `;
  }}
`;

const VideoTile = styled.div`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: #1e2124;
  border: 2px solid
    ${(p) => (p.$isLocal ? "rgba(114,137,218,0.4)" : "rgba(255,255,255,0.05)")};
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: ${(p) => (p.$isLocal ? "scaleX(-1)" : "none")};
  }
`;

const TileLabel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const NoCamera = styled.div`
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  color: #4f545c;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7289da, #5e73bc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  color: white;
`;

// ─── Waiting Room Panel ───────────────────────────────────────────────────────

const WaitingPanel = styled.div`
  width: 280px;
  flex-shrink: 0;
  background: #18191c;
  border-left: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
`;

const PanelHead = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const KnockCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 12px;
  animation: ${slideIn} 0.2s ease;
`;

const KnockName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const KnockActions = styled.div`
  display: flex;
  gap: 6px;
`;

const KnockBtn = styled.button`
  flex: 1;
  padding: 6px;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.15s;
  ${(p) =>
    p.$approve
      ? `background: rgba(67,181,129,0.14); color: #43b581; border: 1px solid rgba(67,181,129,0.3); &:hover { background: rgba(67,181,129,0.24); }`
      : `background: rgba(240,71,71,0.12); color: #f04747; border: 1px solid rgba(240,71,71,0.25); &:hover { background: rgba(240,71,71,0.22); }`}
`;

const EmptyWaiting = styled.div`
  text-align: center;
  color: #4f545c;
  font-size: 13px;
  padding: 28px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.12s;
  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

const MemberAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #7289da, #5e73bc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
`;

const MemberInfo = styled.div`
  flex: 1;
  min-width: 0;
  color: #dcddde;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemberIcons = styled.div`
  display: flex;
  gap: 4px;
  color: #4f545c;
  flex-shrink: 0;
`;

const SectionLabel = styled.div`
  color: #72767d;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 14px 4px;
`;

const NotifBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #f04747;
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const DrawerClose = styled.button`
  background: none;
  border: none;
  color: #72767d;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
  &:hover {
    color: #fff;
  }
`;

// ─── Controls ─────────────────────────────────────────────────────────────────

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
`;

const CtrlBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  ${(p) =>
    p.$danger
      ? `background: #f04747; color: white; &:hover { background: #d84040; transform: scale(1.08); }`
      : p.$active
        ? `background: rgba(255,255,255,0.09); color: #fff; &:hover { background: rgba(255,255,255,0.15); }`
        : `background: rgba(240,71,71,0.15); color: #f04747; border: 1px solid rgba(240,71,71,0.3); &:hover { background: rgba(240,71,71,0.25); }`}
`;

const CenterBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #b9bbbe;
  font-size: 15px;
`;

const Spin = styled(Loader)`
  animation: ${pulse} 1.2s linear infinite;
`;

// ─── VideoEl ──────────────────────────────────────────────────────────────────

const VideoEl = ({
  stream,
  muted = false,
  isLocal = false,
  label,
  isCamOn = true,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && stream) ref.current.srcObject = stream;
  }, [stream]);
  return (
    <VideoTile $isLocal={isLocal}>
      {isCamOn && stream ? (
        <video ref={ref} autoPlay playsInline muted={muted} />
      ) : (
        <NoCamera>
          <Avatar>{label?.charAt(0)?.toUpperCase() || "?"}</Avatar>
          <span style={{ fontSize: 12 }}>{label}</span>
        </NoCamera>
      )}
      <TileLabel>
        {!isCamOn && <VideoOff size={11} />}
        {label}
        {isLocal && " (Sen)"}
      </TileLabel>
    </VideoTile>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const GroupVideoCall = ({
  isOpen,
  onClose,
  roomId,
  chatTitle,
  isCreator = true,
  isPrivate = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const displayName =
    currentUser?.nickname || currentUser?.username || "Mehmon";

  const {
    localStream,
    remoteStreams,
    screenStream,
    remoteScreenStreams,
    isScreenSharing,
    toggleScreenShare,
    knockRequests,
    approveKnock,
    rejectKnock,
    joinStatus,
    isMicOn,
    isCamOn,
    toggleMic,
    toggleCam,
    leaveCall,
    error,
    roomTitle,
  } = useWebRTC({
    roomId,
    displayName,
    enabled: isOpen && !!roomId,
    isCreator,
    isPrivate,
    chatTitle,
  });

  const handleLeave = () => {
    leaveCall();
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${roomId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !roomId) return null;

  const totalTiles =
    1 +
    remoteStreams.length +
    (screenStream ? 1 : 0) +
    remoteScreenStreams.length;

  return (
    <Overlay>
      <TopBar>
        <CallInfo>
          <CallTitle>
            {roomTitle || chatTitle || "Meet"}
            {isPrivate && (
              <span style={{ fontSize: 11, color: "#faa61a", marginLeft: 8 }}>
                🔒 Private
              </span>
            )}
          </CallTitle>
          <CallSub>{roomId}</CallSub>
        </CallInfo>
        <TopActions>
          <TinyBtn onClick={handleCopy}>
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Nusxalandi!" : "Link"}
          </TinyBtn>
          <TinyBtn
            onClick={() => setShowDrawer((p) => !p)}
            style={{ position: "relative" }}
          >
            <Users size={13} />
            {totalTiles}
            {isCreator && knockRequests.length > 0 && (
              <NotifBadge>{knockRequests.length}</NotifBadge>
            )}
          </TinyBtn>
        </TopActions>
      </TopBar>

      <Body>
        {error ? (
          <CenterBox>
            <AlertCircle size={38} color="#f04747" />
            <span>{error}</span>
            <TinyBtn onClick={onClose}>Yopish</TinyBtn>
          </CenterBox>
        ) : joinStatus === "connecting" ? (
          <CenterBox>
            <Spin size={38} color="#7289da" />
            <span>Ulanmoqda…</span>
          </CenterBox>
        ) : joinStatus === "waiting" ? (
          <CenterBox>
            <Clock size={48} color="#faa61a" />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
              Ruxsat kutilmoqda…
            </span>
            <span>Call yaratuvchisi sizga ruxsat berishini kuting</span>
            <TinyBtn onClick={handleLeave}>Bekor qilish</TinyBtn>
          </CenterBox>
        ) : joinStatus === "rejected" ? (
          <CenterBox>
            <XCircle size={48} color="#f04747" />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
              Rad etildi
            </span>
            <span>Call yaratuvchisi so'rovingizni rad etdi</span>
            <TinyBtn onClick={onClose}>Yopish</TinyBtn>
          </CenterBox>
        ) : (
          <VideoGrid $count={totalTiles}>
            <VideoEl
              stream={localStream}
              muted
              isLocal
              label={displayName}
              isCamOn={isCamOn}
            />
            {/* Local screen share tile */}
            {screenStream && (
              <VideoEl
                stream={screenStream}
                muted
                label={`🖥️ ${displayName} (Ekran)`}
                isCamOn
              />
            )}
            {remoteStreams.map(({ peerId, stream, displayName: n }) => (
              <VideoEl key={peerId} stream={stream} label={n} isCamOn />
            ))}
            {/* Remote screen share tiles */}
            {remoteScreenStreams.map(({ peerId, stream, displayName: n }) => (
              <VideoEl
                key={`screen-${peerId}`}
                stream={stream}
                label={`🖥️ ${n} (Ekran)`}
                isCamOn
              />
            ))}
          </VideoGrid>
        )}

        {/* Members Drawer */}
        {showDrawer && (
          <WaitingPanel>
            <PanelHead>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Users size={15} color="#7289da" />
                A'zolar ({totalTiles})
              </span>
              <DrawerClose onClick={() => setShowDrawer(false)}>
                <XCircle size={16} />
              </DrawerClose>
            </PanelHead>
            <PanelBody>
              {/* Waiting section — only creator of private room */}
              {isCreator && isPrivate && (
                <>
                  <SectionLabel>
                    ⏳ Kutayotganlar ({knockRequests.length})
                  </SectionLabel>
                  {knockRequests.length === 0 ? (
                    <div
                      style={{
                        padding: "8px 14px",
                        color: "#4f545c",
                        fontSize: 12,
                      }}
                    >
                      Hech kim kutmayapti
                    </div>
                  ) : (
                    knockRequests.map(({ peerId, displayName: n }) => (
                      <KnockCard key={peerId}>
                        <KnockName>👤 {n}</KnockName>
                        <KnockActions>
                          <KnockBtn
                            $approve
                            onClick={() => approveKnock(peerId)}
                          >
                            <CheckCircle size={12} /> Qabul
                          </KnockBtn>
                          <KnockBtn onClick={() => rejectKnock(peerId)}>
                            <XCircle size={12} /> Rad
                          </KnockBtn>
                        </KnockActions>
                      </KnockCard>
                    ))
                  )}
                </>
              )}

              {/* Joined members */}
              <SectionLabel>✅ Qo'shilganlar ({totalTiles})</SectionLabel>
              {/* Local user */}
              <MemberRow>
                <MemberAvatar>
                  {displayName?.charAt(0)?.toUpperCase() || "?"}
                </MemberAvatar>
                <MemberInfo>{displayName} (Sen)</MemberInfo>
                <MemberIcons>
                  {isMicOn ? (
                    <Mic size={13} color="#43b581" />
                  ) : (
                    <MicOff size={13} color="#f04747" />
                  )}
                  {isCamOn ? (
                    <Video size={13} color="#43b581" />
                  ) : (
                    <VideoOff size={13} color="#f04747" />
                  )}
                </MemberIcons>
              </MemberRow>
              {/* Remote peers */}
              {remoteStreams.map(({ peerId, displayName: n }) => (
                <MemberRow key={peerId}>
                  <MemberAvatar>
                    {n?.charAt(0)?.toUpperCase() || "?"}
                  </MemberAvatar>
                  <MemberInfo>{n}</MemberInfo>
                  <MemberIcons>
                    <Mic size={13} color="#43b581" />
                    <Video size={13} color="#43b581" />
                  </MemberIcons>
                </MemberRow>
              ))}
            </PanelBody>
          </WaitingPanel>
        )}
      </Body>

      <ControlBar>
        <CtrlBtn $active={isMicOn} onClick={toggleMic}>
          {isMicOn ? <Mic size={21} /> : <MicOff size={21} />}
        </CtrlBtn>
        <CtrlBtn $active={isCamOn} onClick={toggleCam}>
          {isCamOn ? <Video size={21} /> : <VideoOff size={21} />}
        </CtrlBtn>
        <CtrlBtn $active={isScreenSharing} onClick={toggleScreenShare}>
          {isScreenSharing ? <MonitorOff size={21} /> : <Monitor size={21} />}
        </CtrlBtn>
        <CtrlBtn $danger onClick={handleLeave}>
          <PhoneOff size={21} />
        </CtrlBtn>
      </ControlBar>
    </Overlay>
  );
};

export default GroupVideoCall;
