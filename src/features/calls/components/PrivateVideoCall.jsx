import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  Maximize2,
  Mic,
  MicOff,
  Minimize2,
  Monitor,
  MonitorOff,
  PhoneOff,
  RefreshCcw,
  Smartphone,
  Video,
  VideoOff,
  Volume2,
} from "lucide-react";
import { useWebRTC } from "../../../hooks/useWebRTC";
import useAuthStore from "../../../store/authStore";

const attachLivekitTrackOrStream = (node, { track = null, stream = null } = {}) => {
  if (!node) return;

  if (track?.attach) {
    track.attach(node);
    return;
  }

  if (node.srcObject !== stream) {
    node.srcObject = stream || null;
  }
};

const detachLivekitTrackOrStream = (node, { track = null } = {}) => {
  if (!node) return;

  if (track?.detach) {
    try {
      track.detach(node);
    } catch {}
  }

  if (node.srcObject) {
    node.srcObject = null;
  }
};

const Overlay = styled.div`
  --call-bg: var(--background-color);
  --call-surface: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
  --call-panel: color-mix(in srgb, var(--input-color) 88%, black 12%);
  --call-border: color-mix(in srgb, var(--border-color) 82%, transparent);
  --call-text: var(--text-color);
  --call-muted: var(--text-muted-color);
  --call-tint: color-mix(in srgb, var(--primary-color) 16%, transparent);
  --call-danger: var(--danger-color);
  position: fixed;
  inset: ${(props) => (props.$minimized ? "auto 16px 16px auto" : "0")};
  width: ${(props) => (props.$minimized ? "320px" : "auto")};
  height: ${(props) => (props.$minimized ? "180px" : "auto")};
  z-index: 10000;
  background: ${(props) =>
    props.$minimized ? "var(--call-surface)" : "var(--call-bg)"};
  border: ${(props) =>
    props.$minimized ? "1px solid var(--call-border)" : "none"};
  border-radius: ${(props) => (props.$minimized ? "16px" : "0")};
  box-shadow: ${(props) =>
    props.$minimized ? "0 16px 40px rgba(0, 0, 0, 0.35)" : "none"};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${(props) => (props.$minimized ? "0" : "0")};
    box-sizing: border-box;
    background: ${(props) => (props.$minimized ? "var(--call-surface)" : "var(--call-bg)")};
  }
`;

const PiPFrame = styled.div`
  width: 100%;
  height: 100%;
  background: var(--background-color);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--call-border);
  background: color-mix(in srgb, var(--call-surface) 90%, transparent);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    margin: 0;
    border-radius: 0;
    padding:
      calc(10px + env(safe-area-inset-top, 0px))
      calc(14px + env(safe-area-inset-right, 0px))
      12px
      calc(14px + env(safe-area-inset-left, 0px));
  }
`;

const HeaderText = styled.div`
  min-width: 0;
  display: grid;
  gap: 2px;
`;

const Title = styled.div`
  color: var(--call-text);
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.div`
  color: var(--call-muted);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--call-border);
  background: var(--call-panel);
  color: var(--call-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
  background: color-mix(in srgb, var(--call-bg) 88%, black 12%);

  @media (max-width: 768px) {
    margin: 0;
    border-radius: 0;
    overflow: hidden;
  }
`;

const MainStage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const VideoStage = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: black;
  transform: ${(props) => (props.$mirror ? "scaleX(-1)" : "none")};
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--call-panel) 88%, black 12%);
  color: var(--call-muted);
  padding: 20px;
  text-align: center;
`;

const PlaceholderInner = styled.div`
  display: grid;
  gap: 10px;
  justify-items: center;
`;

const Avatar = styled.div`
  width: ${(props) => (props.$small ? "44px" : "72px")};
  height: ${(props) => (props.$small ? "44px" : "72px")};
  border-radius: 50%;
  border: 1px solid var(--call-border);
  background: var(--call-panel);
  color: var(--call-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.$small ? "16px" : "24px")};
  font-weight: 800;
`;

const Label = styled.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--call-border);
  background: rgba(0, 0, 0, 0.46);
  color: white;
  font-size: 12px;
  font-weight: 700;
`;

const RemoteState = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--call-border);
  background: rgba(0, 0, 0, 0.42);
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

const LocalTile = styled.button`
  position: absolute;
  right: 16px;
  bottom: 84px;
  width: 188px;
  height: 132px;
  border-radius: 14px;
  border: 1px solid var(--call-border);
  background: var(--call-panel);
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  padding: 0;

  @media (max-width: 768px) {
    width: 144px;
    height: 104px;
    right: 12px;
    bottom: calc(78px + env(safe-area-inset-bottom, 0px));
  }
`;

const ControlBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 18px 18px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.28) 24%,
    rgba(0, 0, 0, 0.64) 100%
  );

  @media (max-width: 768px) {
    padding:
      14px
      calc(18px + env(safe-area-inset-right, 0px))
      calc(18px + env(safe-area-inset-bottom, 0px))
      calc(18px + env(safe-area-inset-left, 0px));
  }
`;

const ControlButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid
    ${(props) =>
      props.$danger ? "transparent" : "color-mix(in srgb, white 12%, transparent)"};
  background: ${(props) =>
    props.$danger
      ? "var(--call-danger)"
      : props.$active
        ? "rgba(255, 255, 255, 0.16)"
        : "rgba(0, 0, 0, 0.38)"};
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MiniBody = styled.button`
  flex: 1;
  border: none;
  background: var(--call-surface);
  padding: 0;
  color: var(--call-text);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const MiniPreview = styled.div`
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--call-panel) 88%, black 12%);
`;

const MiniPreviewVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: black;
  transform: ${(props) => (props.$mirror ? "scaleX(-1)" : "none")};
`;

const MiniOverlay = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.28) 0%,
    rgba(0, 0, 0, 0.08) 34%,
    rgba(0, 0, 0, 0.56) 100%
  );
`;

const MiniMeta = styled.div`
  color: rgba(255, 255, 255, 0.82);
  font-size: 12px;
  line-height: 1.45;
`;

const MiniStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.82);
`;

const detectMobileCallViewport = () => {
  if (typeof window === "undefined") return false;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
  const mobileViewport = window.matchMedia?.("(max-width: 768px)")?.matches;
  return Boolean(coarsePointer || mobileViewport);
};

const PrivateVideoCall = ({
  isOpen,
  onClose,
  roomId,
  remoteUser,
  isCaller,
}) => {
  const { t } = useTranslation();
  const currentUser = useAuthStore((state) => state.user);
  const displayName = currentUser?.nickname || currentUser?.username || t("privateCall.localLabel");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLocalPrimary, setIsLocalPrimary] = useState(false);
  const [pipWindow, setPipWindow] = useState(null);
  const [pipContainer, setPipContainer] = useState(null);
  const [isMobileViewport, setIsMobileViewport] = useState(detectMobileCallViewport);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const pipCloseIntentRef = useRef(false);

  const {
    localStream,
    livekitLocalMedia,
    remoteStreams,
    remotePeerStates,
    isMicOn,
    isCamOn,
    toggleMic,
    toggleCam,
    leaveCall,
    error,
    isScreenSharing,
    toggleScreenShare,
    switchCamera,
    canSwitchCamera,
    screenStream,
    remoteScreenStreams,
    joinStatus,
  } = useWebRTC({
    roomId,
    displayName,
    enabled: isOpen && !!roomId,
    isCreator: isCaller,
    isPrivate: false,
  });

  const remotePeer = remoteStreams[0];
  const remotePeerState = remotePeer ? remotePeerStates[remotePeer.peerId] : null;
  const isReadablePeerName = (value) => {
    if (!value || typeof value !== "string") return false;
    const normalized = value.trim();
    if (!normalized) return false;
    if (normalized === roomId) return false;
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(normalized)) {
      return false;
    }
    if (/^[A-Za-z0-9_-]{18,}$/.test(normalized)) {
      return false;
    }
    return true;
  };
  const remoteName =
    remoteUser?.nickname ||
    remoteUser?.username ||
    remoteUser?.name ||
    (isReadablePeerName(remotePeer?.displayName) ? remotePeer.displayName : null) ||
    t("privateCall.remoteLabel");
  const remoteCameraVisible =
    (Boolean(remotePeer?.stream) || Boolean(remotePeer?.videoTrack)) &&
    remotePeerState?.hasVideo !== false &&
    remotePeerState?.videoMuted !== true;
  const localCameraVisible =
    (Boolean(localStream) || Boolean(livekitLocalMedia.cameraTrack)) && isCamOn;
  const swapAvailable =
    localCameraVisible &&
    (Boolean(remoteScreenStreams[0]?.stream) ||
      Boolean(remoteScreenStreams[0]?.videoTrack) ||
      remoteCameraVisible);
  const remoteVideoRef = useCallback(
    (node) => {
      attachLivekitTrackOrStream(node, {
        track: remotePeer?.videoTrack || null,
        stream: remotePeer?.stream || null,
      });
    },
    [remotePeer?.stream, remotePeer?.videoTrack],
  );
  const localVideoRef = useCallback(
    (node) => {
      attachLivekitTrackOrStream(node, {
        track: livekitLocalMedia.cameraTrack,
        stream: localStream,
      });
    },
    [livekitLocalMedia.cameraTrack, localStream],
  );
  const remoteScreenRef = useCallback(
    (node) => {
      attachLivekitTrackOrStream(node, {
        track: remoteScreenStreams[0]?.videoTrack || null,
        stream: remoteScreenStreams[0]?.stream || null,
      });
    },
    [remoteScreenStreams],
  );
  const remoteAudioRef = useCallback(
    (node) => {
      attachLivekitTrackOrStream(node, {
        track: remoteScreenStreams[0]?.audioTrack || remotePeer?.audioTrack || null,
        stream: remoteScreenStreams[0]?.stream || remotePeer?.stream || null,
      });
    },
    [remotePeer?.audioTrack, remotePeer?.stream, remoteScreenStreams],
  );
  const miniPreviewStream =
    remoteScreenStreams[0]?.stream ||
    (remoteCameraVisible ? remotePeer?.stream : null) ||
    localStream ||
    null;
  const miniPreviewTrack =
    remoteScreenStreams[0]?.videoTrack ||
    (remoteCameraVisible ? remotePeer?.videoTrack : null) ||
    livekitLocalMedia.cameraTrack ||
    null;
  const miniPreviewShouldMirror =
    !remoteScreenStreams[0]?.stream &&
    !remoteScreenStreams[0]?.videoTrack &&
    !remoteCameraVisible &&
    (Boolean(localStream) || Boolean(livekitLocalMedia.cameraTrack));
  const miniVideoRef = useCallback(
    (node) => {
      attachLivekitTrackOrStream(node, {
        track: miniPreviewTrack,
        stream: miniPreviewStream,
      });
    },
    [miniPreviewStream, miniPreviewTrack],
  );
  useEffect(() => {
    if (!swapAvailable && isLocalPrimary) {
      setIsLocalPrimary(false);
    }
  }, [isLocalPrimary, swapAvailable]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleViewportChange = () => {
      setIsMobileViewport(detectMobileCallViewport());
    };

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);
    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    if (!isMobileViewport) return;

    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      if (audio.setSinkId) {
        audio.setSinkId(isSpeakerOn ? "default" : "");
      }
    });

    const videoElements = document.querySelectorAll("video");
    videoElements.forEach((video) => {
      if (video.setSinkId) {
        video.setSinkId(isSpeakerOn ? "default" : "");
      }
    });
  }, [isMobileViewport, isSpeakerOn]);

  const handleSwapFeeds = useCallback(() => {
    if (!swapAvailable) return;
    setIsLocalPrimary((prev) => !prev);
  }, [swapAvailable]);

  const mainShowsLocal = isLocalPrimary && localCameraVisible;
  const tileShowsRemote = mainShowsLocal;

  const handleLeave = useCallback(() => {
    leaveCall();
    onClose();
  }, [leaveCall, onClose]);

  const closePiPWindow = useCallback(() => {
    if (pipWindow && !pipWindow.closed) {
      pipCloseIntentRef.current = true;
      pipWindow.close();
    }
    setPipWindow(null);
    setPipContainer(null);
  }, [pipWindow]);

  useEffect(() => {
    if (!isOpen && pipWindow) {
      closePiPWindow();
    }
  }, [closePiPWindow, isOpen, pipWindow]);

  useEffect(() => {
    if (!isMinimized && pipWindow) {
      closePiPWindow();
    }
  }, [closePiPWindow, isMinimized, pipWindow]);

  useEffect(() => {
    if (!isMinimized || !pipWindow) return undefined;
    const handlePageHide = () => {
      setPipWindow(null);
      setPipContainer(null);
      if (pipCloseIntentRef.current) {
        pipCloseIntentRef.current = false;
        return;
      }
      setIsMinimized(false);
    };
    pipWindow.addEventListener("pagehide", handlePageHide);
    return () => pipWindow.removeEventListener("pagehide", handlePageHide);
  }, [isMinimized, pipWindow]);

  const handleMinimize = useCallback(async () => {
    if (isMinimized) {
      setIsMinimized(false);
      return;
    }

    const documentPiP = window?.documentPictureInPicture;
    if (!documentPiP?.requestWindow) {
      setIsMinimized(true);
      return;
    }

    try {
      const nextPipWindow = await documentPiP.requestWindow({
        width: 340,
        height: 210,
      });

      nextPipWindow.document.body.innerHTML = "";
      nextPipWindow.document.body.style.margin = "0";
      nextPipWindow.document.body.style.background = "var(--background-color)";
      nextPipWindow.document.body.style.overflow = "hidden";

      const stylesheetLoadTasks = [...document.styleSheets].map((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
          const style = document.createElement("style");
          style.textContent = cssRules;
          nextPipWindow.document.head.appendChild(style);
          return Promise.resolve();
        } catch {
          if (!styleSheet.href) {
            return Promise.resolve();
          }

          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = styleSheet.href;

          const loadTask = new Promise((resolve) => {
            link.onload = () => resolve();
            link.onerror = () => resolve();
          });

          nextPipWindow.document.head.appendChild(link);
          return loadTask;
        }
      });

      await Promise.all(stylesheetLoadTasks);

      const mountNode = nextPipWindow.document.createElement("div");
      mountNode.style.width = "100%";
      mountNode.style.height = "100%";
      nextPipWindow.document.body.appendChild(mountNode);

      pipCloseIntentRef.current = false;
      setPipWindow(nextPipWindow);
      setPipContainer(mountNode);
      setIsMinimized(true);
    } catch {
      setIsMinimized(true);
    }
  }, [isMinimized]);

  const miniContent = (
    <>
      <Header>
        <HeaderText>
          <Title>{remoteName}</Title>
          <Subtitle>{joinStatus === "joined" ? roomId : t("groupCall.connecting")}</Subtitle>
        </HeaderText>
        <HeaderActions>
          <ActionButton type="button" onClick={() => setIsMinimized(false)}>
            <Maximize2 size={16} />
          </ActionButton>
          <ActionButton type="button" onClick={handleLeave}>
            <PhoneOff size={16} />
          </ActionButton>
        </HeaderActions>
      </Header>
      <MiniBody type="button" onClick={() => setIsMinimized(false)}>
        <MiniPreview>
          {miniPreviewStream ? (
            <MiniPreviewVideo
              ref={miniVideoRef}
              autoPlay
              muted={miniPreviewShouldMirror}
              playsInline
              $mirror={miniPreviewShouldMirror}
            />
          ) : (
            <Placeholder>
              <PlaceholderInner>
                <Avatar>{remoteName?.charAt(0)?.toUpperCase() || "?"}</Avatar>
                <MiniMeta>{remoteName}</MiniMeta>
              </PlaceholderInner>
            </Placeholder>
          )}
        </MiniPreview>
        <MiniOverlay>
          <div>
            <Title>{remoteName}</Title>
            <MiniMeta>
              {remotePeerState?.connectionState || joinStatus || t("privateCall.calling")}
            </MiniMeta>
          </div>
          <MiniStatus>
            {isMicOn ? <Mic size={16} color="#43b581" /> : <MicOff size={16} color="#f04747" />}
            {isCamOn ? <Video size={16} color="#43b581" /> : <VideoOff size={16} color="#f04747" />}
            {isScreenSharing ? <Monitor size={16} color="var(--primary-color)" /> : null}
          </MiniStatus>
        </MiniOverlay>
      </MiniBody>
    </>
  );

  if (!isOpen) return null;
  if (isMinimized && pipContainer) {
    return createPortal(<PiPFrame>{miniContent}</PiPFrame>, pipContainer);
  }

  return (
    <Overlay $minimized={isMinimized}>
      {isMinimized ? (
        miniContent
      ) : (
        <>
          <Header>
            <HeaderText>
              <Title>{remoteName || t("privateCall.titleFallback")}</Title>
              <Subtitle>
                {error
                  ? error
                  : joinStatus === "joined"
                    ? roomId
                    : t("groupCall.connecting")}
              </Subtitle>
            </HeaderText>
        <HeaderActions>
          {isMobileViewport ? (
            <ActionButton
              type="button"
              onClick={() => setIsSpeakerOn((prev) => !prev)}
              aria-label={isSpeakerOn ? "Use earpiece" : "Use speaker"}
              title={isSpeakerOn ? "Use earpiece" : "Use speaker"}
            >
              {isSpeakerOn ? <Volume2 size={16} /> : <Smartphone size={16} />}
            </ActionButton>
          ) : null}
          {isMobileViewport && canSwitchCamera ? (
            <ActionButton
              type="button"
              onClick={switchCamera}
              aria-label={t("privateCall.switchCamera", "Switch camera")}
              title={t("privateCall.switchCamera", "Switch camera")}
            >
              <RefreshCcw size={16} />
            </ActionButton>
          ) : null}
          <ActionButton type="button" onClick={handleMinimize}>
            <Minimize2 size={16} />
          </ActionButton>
              {/* <ActionButton type="button" onClick={handleLeave}>
                <PhoneOff size={16} />
              </ActionButton> */}
            </HeaderActions>
          </Header>

          <Body>
            <MainStage>
              <audio ref={remoteAudioRef} autoPlay playsInline style={{ display: "none" }} />
              {mainShowsLocal ? (
                <VideoStage ref={localVideoRef} autoPlay muted playsInline $mirror />
              ) : remoteScreenStreams.length > 0 ? (
                <VideoStage ref={remoteScreenRef} autoPlay playsInline />
              ) : remoteCameraVisible ? (
                <VideoStage ref={remoteVideoRef} autoPlay playsInline />
              ) : (
                <Placeholder>
                  <PlaceholderInner>
                    <Avatar>
                      {(mainShowsLocal ? displayName : remoteName)?.charAt(0)?.toUpperCase() || "?"}
                    </Avatar>
                    <Title>{mainShowsLocal ? displayName : remoteName}</Title>
                    <Subtitle>
                      {error ||
                        (joinStatus === "joined"
                          ? t("privateCall.calling")
                          : t("groupCall.connecting"))}
                    </Subtitle>
                  </PlaceholderInner>
                </Placeholder>
              )}

              <RemoteState>
                {mainShowsLocal ? <Mic size={14} /> : remotePeerState?.audioMuted ? <MicOff size={14} /> : <Mic size={14} />}
                {mainShowsLocal ? (
                  localCameraVisible ? <Video size={14} /> : <VideoOff size={14} />
                ) : remotePeerState?.videoMuted || remotePeerState?.hasVideo === false ? (
                  <VideoOff size={14} />
                ) : (
                  <Video size={14} />
                )}
                <span>{mainShowsLocal ? displayName : remoteName}</span>
              </RemoteState>

              {remoteScreenStreams.length > 0 ? (
                <Label>
                  <Monitor size={14} />
                  {t("privateCall.screenShareLabel")}
                </Label>
              ) : null}

              <LocalTile
                type="button"
                onClick={handleSwapFeeds}
                aria-label={swapAvailable ? t("privateCall.swapFeeds", "Swap video feeds") : t("privateCall.localLabel")}
              >
                {tileShowsRemote && remoteScreenStreams.length > 0 ? (
                  <VideoStage ref={remoteScreenRef} autoPlay playsInline />
                ) : tileShowsRemote && remoteCameraVisible ? (
                  <VideoStage ref={remoteVideoRef} autoPlay playsInline />
                ) : localCameraVisible ? (
                  <VideoStage
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    $mirror
                  />
                ) : (
                  <Placeholder>
                    <PlaceholderInner>
                      <Avatar $small>
                        {(tileShowsRemote ? remoteName : displayName)?.charAt(0)?.toUpperCase() || "?"}
                      </Avatar>
                      <MiniMeta>{tileShowsRemote ? remoteName : t("privateCall.localLabel")}</MiniMeta>
                    </PlaceholderInner>
                  </Placeholder>
                )}
              </LocalTile>

              <ControlBar>
                <ControlButton type="button" $active={isMicOn} onClick={toggleMic}>
                  {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
                </ControlButton>
                <ControlButton type="button" $active={isCamOn} onClick={toggleCam}>
                  {isCamOn ? <Video size={22} /> : <VideoOff size={22} />}
                </ControlButton>
                {!isMobileViewport ? (
                  <ControlButton
                    type="button"
                    $active={isScreenSharing}
                    onClick={toggleScreenShare}
                  >
                    {isScreenSharing ? <MonitorOff size={22} /> : <Monitor size={22} />}
                  </ControlButton>
                ) : canSwitchCamera ? (
                  <ControlButton
                    type="button"
                    onClick={switchCamera}
                    aria-label={t("privateCall.switchCamera", "Switch camera")}
                    title={t("privateCall.switchCamera", "Switch camera")}
                  >
                    <RefreshCcw size={22} />
                  </ControlButton>
                ) : null}
                <ControlButton type="button" $danger onClick={handleLeave}>
                  <PhoneOff size={22} />
                </ControlButton>
              </ControlBar>
            </MainStage>
          </Body>
        </>
      )}
    </Overlay>
  );
};

export default PrivateVideoCall;
