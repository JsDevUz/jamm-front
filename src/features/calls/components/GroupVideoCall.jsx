import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes, css } from "styled-components";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
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
  Circle,
  Maximize,
  Hand,
  Lock,
  UserMinus,
  Link2,
  ArrowLeft,
  Timer,
  CheckSquare,
  User,
  ShieldAlert,
  Minimize2,
} from "lucide-react";
import { useWebRTC } from "../../../hooks/useWebRTC";
import useAuthStore from "../../../store/authStore";
import useMeetCallStore from "../../../store/meetCallStore";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";
import { updateMeetPrivacy } from "../../../utils/meetStore";

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
  --call-bg: var(--background-color);
  --call-surface: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
  --call-panel: color-mix(in srgb, var(--input-color) 90%, black 10%);
  --call-border: color-mix(in srgb, var(--border-color) 80%, transparent);
  --call-text: var(--text-color);
  --call-muted: var(--text-muted-color);
  --call-success: var(--success-color);
  --call-warning: var(--warning-color);
  --call-danger: var(--danger-color);
  --call-primary: var(--primary-color);
  position: fixed;
  inset: ${(p) => (p.$minimized ? "auto 20px 20px auto" : "0")};
  width: ${(p) => (p.$minimized ? "320px" : "auto")};
  height: ${(p) => (p.$minimized ? "180px" : "auto")};
  z-index: 10000;
  background: var(--call-bg);
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease-out;
  border-radius: ${(p) => (p.$minimized ? "18px" : "0")};
  border: ${(p) => (p.$minimized ? "1px solid var(--call-border)" : "none")};
  box-shadow: ${(p) =>
    p.$minimized ? "0 20px 50px rgba(0,0,0,0.45)" : "none"};
  overflow: hidden;
`;

const FloatingActionBar = styled.div`
  position: absolute;
  bottom: 88px;
  right: 14px;
  z-index: 10020;
  display: flex;
  gap: 8px;
  pointer-events: none;
`;

const FloatingActionBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--call-border);
  background: color-mix(in srgb, var(--call-surface) 74%, transparent);
  backdrop-filter: blur(10px);
  color: var(--call-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.16s ease, transform 0.16s ease;

  &:hover {
    background: color-mix(in srgb, var(--call-panel) 92%, transparent);
    transform: translateY(-1px);
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: color-mix(in srgb, var(--call-bg) 78%, transparent);
  border-bottom: 1px solid var(--call-border);
  backdrop-filter: blur(10px);
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: calc(12px + env(safe-area-inset-top, 0px)) 14px 12px;
  }
`;

const CallInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;
const CallTitle = styled.span`
  color: var(--call-text);
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;
const CallSub = styled.span`
  color: var(--call-muted);
  font-size: 11px;
  font-family: monospace;
`;

const TopActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

const TinyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 13px;
  border-radius: 8px;
  border: 1px solid
    ${(p) =>
      p.$danger
        ? "color-mix(in srgb, var(--call-danger) 30%, transparent)"
        : "var(--call-border)"};
  background: ${(p) =>
    p.$danger
      ? "color-mix(in srgb, var(--call-danger) 10%, transparent)"
      : "color-mix(in srgb, var(--call-panel) 88%, transparent)"};
  color: ${(p) => (p.$danger ? "var(--call-danger)" : "var(--call-text)")};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  &:hover {
    background: ${(p) =>
      p.$danger
        ? "color-mix(in srgb, var(--call-danger) 18%, transparent)"
        : "color-mix(in srgb, var(--call-panel) 96%, transparent)"};
    color: ${(p) => (p.$danger ? "var(--call-danger)" : "var(--call-text)")};
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const PiPFrame = styled.div`
  width: 100%;
  height: 100%;
  background: var(--call-bg);
  display: flex;
  flex-direction: column;
`;

const MinimizedBody = styled.button`
  flex: 1;
  border: none;
  background: var(--call-surface);
  color: var(--call-text);
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const MiniTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const MiniMeta = styled.div`
  color: var(--call-muted);
  font-size: 12px;
  line-height: 1.5;
`;

const MiniActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  padding: 16px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.24) 0%,
    rgba(0, 0, 0, 0.08) 36%,
    rgba(0, 0, 0, 0.58) 100%
  );
`;

// ─── Video Grid ───────────────────────────────────────────────────────────────

const VideoGrid = styled.div`
  flex: 1;
  display: grid;
  padding: 14px;
  gap: 10px;
  overflow: hidden;
  min-width: 0;
  min-height: 0;

  ${(p) => {
    const n = p.$count;

    if (n === 1) {
      return css`
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: minmax(0, 1fr);
      `;
    }

    if (n === 2) {
      return css`
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: minmax(0, 1fr);

        @media (max-width: 768px) {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: repeat(2, minmax(0, 1fr));
        }
      `;
    }

    if (n === 3) {
      return css`
        grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
        grid-template-rows: repeat(2, minmax(0, 1fr));

        & > *:nth-child(1) {
          grid-column: 2;
          grid-row: 1 / span 2;
        }

        & > *:nth-child(2) {
          grid-column: 1;
          grid-row: 1;
        }

        & > *:nth-child(3) {
          grid-column: 1;
          grid-row: 2;
        }

        @media (max-width: 768px) {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: repeat(3, minmax(0, 1fr));

          & > *:nth-child(1),
          & > *:nth-child(2),
          & > *:nth-child(3) {
            grid-column: auto;
            grid-row: auto;
          }
        }
      `;
    }

    if (n === 4) {
      return css`
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));
      `;
    }

    if (n <= 6) {
      return css`
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));

        @media (max-width: 768px) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(${Math.ceil(n / 2)}, minmax(0, 1fr));
        }
      `;
    }

    return css`
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-auto-rows: minmax(0, 1fr);

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    `;
  }}
`;

const StageLayout = styled.div`
  flex: 1;
  display: grid;
  gap: 12px;
  padding: 14px;
  min-width: 0;
  min-height: 0;
  position: relative;
  grid-template-columns: ${(p) =>
    p.$mobile
      ? "minmax(0, 1fr)"
      : p.$immersive
        ? "minmax(0, 1fr) minmax(240px, 0.34fr)"
        : "minmax(0, 1fr) minmax(220px, 0.3fr)"};
  grid-template-rows: minmax(0, 1fr);
  overflow: hidden;

  @media (max-width: 768px) {
    padding-top: ${(p) => (p.$mobileCompactCount > 0 ? "108px" : "14px")};
  }
`;

const StageMain = styled.div`
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border-radius: 18px;
  background: color-mix(in srgb, var(--call-surface) 92%, black 8%);
  border: 1px solid var(--call-border);
  padding: 4px;
  box-sizing: border-box;
`;

const StageRail = styled.div`
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StageRailGrid = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: grid;
  gap: 10px;
  align-content: start;
  grid-template-columns: ${(p) => {
    if (p.$mobile && p.$immersive) return "1fr";
    if (p.$mobile) return "repeat(2, minmax(0, 1fr))";
    return p.$immersive ? "repeat(2, minmax(0, 1fr))" : "1fr";
  }};
  grid-auto-rows: ${(p) => (p.$immersive ? "minmax(120px, 1fr)" : "minmax(132px, 1fr)")};
  padding-right: ${(p) => (p.$mobile && !p.$immersive ? "0" : "4px")};
`;

const StageRailLabel = styled.div`
  color: var(--call-muted);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 10px;
  padding-left: 4px;
`;

const MobileImmersiveRail = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  width: min(28vw, 122px);
  max-height: calc(100% - 36px);
  display: grid;
  gap: 8px;
  overflow: auto;
  z-index: 7;
`;

const MobileTopRail = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 8;
  display: grid;
  gap: 8px;
  width: min(30vw, 126px);
  max-width: 126px;
  justify-items: stretch;
`;

const MobileTopRailTile = styled.div`
  width: 100%;
  height: min(20vw, 96px);
  min-height: 76px;
`;

const StageActions = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 8;
  display: flex;
  gap: 8px;
`;

const StageActionBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.58);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.16s ease, background 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(0, 0, 0, 0.72);
  }
`;

const VideoTile = styled.div`
  position: relative;
  border-radius: ${(p) => (p.$compact ? "20px" : "14px")};
  overflow: hidden;
  background: var(--call-panel);
  min-width: 0;
  min-height: 0;
  height: 100%;
  isolation: isolate;
  border: 2px solid
    ${(p) =>
      p.$isLocal
        ? "color-mix(in srgb, var(--call-primary) 44%, transparent)"
        : "var(--call-border)"};
  box-shadow: ${(p) =>
    p.$active ? "0 0 0 1px rgba(255,255,255,0.12), 0 18px 36px rgba(0,0,0,0.24)" : "none"};
  cursor: ${(p) => (p.$clickable ? "pointer" : "default")};
  transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: ${(p) => (p.$clickable ? "translateY(-1px)" : "none")};
    border-color: ${(p) =>
      p.$active
        ? "color-mix(in srgb, var(--call-primary) 78%, white 6%)"
        : "color-mix(in srgb, var(--call-primary) 42%, transparent)"};
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: ${(p) => (p.$screenShare ? "contain" : "cover")};
    display: block;
    transform: ${(p) => (p.$mirror ? "scaleX(-1)" : "none")};
    background: ${(p) =>
      p.$screenShare
        ? "color-mix(in srgb, var(--call-surface) 94%, black 6%)"
        : "black"};

    @media (max-width: 768px) {
      object-fit: contain;
    }
  }
`;

const TileLabel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  color: white;
  font-size: ${(p) => (p.$compact ? "11px" : "12px")};
  font-weight: 600;
  padding: ${(p) => (p.$compact ? "4px 8px" : "3px 10px")};
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  max-width: calc(100% - 20px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoCamera = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${(p) => (p.$compact ? "76px" : "120px")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${(p) => (p.$compact ? "6px" : "10px")};
  color: var(--call-muted);
`;

const Avatar = styled.div`
  width: ${(p) => (p.$compact ? "44px" : "60px")};
  height: ${(p) => (p.$compact ? "44px" : "60px")};
  border-radius: 50%;
  background: var(--call-panel);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(p) => (p.$compact ? "20px" : "26px")};
  font-weight: 700;
  color: var(--call-text);
`;

// ─── Waiting Room Panel ───────────────────────────────────────────────────────

const WaitingBackdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10030;
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const WaitingPanel = styled.div`
  width: min(520px, 100%);
  max-height: min(78dvh, 720px);
  background: color-mix(in srgb, var(--call-surface) 96%, transparent);
  border: 1px solid var(--call-border);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
  animation: ${slideIn} 0.2s ease;
`;

const PanelHead = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid var(--call-border);
  background: color-mix(in srgb, var(--call-panel) 92%, transparent);
  color: var(--call-text);
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
  -webkit-overflow-scrolling: touch;
`;

const PrivacyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px 14px;
  border-bottom: 1px solid color-mix(in srgb, var(--call-border) 82%, transparent);
  margin-bottom: 10px;
`;

const PrivacyMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    color: var(--call-text);
    font-size: 13px;
  }

  span {
    color: var(--call-muted);
    font-size: 12px;
    line-height: 1.4;
  }
`;

const PrivacyToggle = styled.button`
  position: relative;
  width: 52px;
  height: 30px;
  border: none;
  border-radius: 999px;
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--warning-color) 72%, black 8%)"
      : "color-mix(in srgb, var(--call-border) 82%, transparent)"};
  cursor: pointer;
  transition: background 0.18s ease, opacity 0.18s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${(props) => (props.$active ? "25px" : "3px")};
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: white;
    transition: left 0.18s ease;
  }
`;

const KnockCard = styled.div`
  background: color-mix(in srgb, var(--call-panel) 88%, transparent);
  border: 1px solid var(--call-border);
  border-radius: 10px;
  padding: 12px;
  animation: ${slideIn} 0.2s ease;
`;

const KnockName = styled.div`
  color: var(--call-text);
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
      ? `background: color-mix(in srgb, var(--call-success) 14%, transparent); color: var(--call-success); border: 1px solid color-mix(in srgb, var(--call-success) 30%, transparent); &:hover { background: color-mix(in srgb, var(--call-success) 24%, transparent); }`
      : `background: color-mix(in srgb, var(--call-danger) 12%, transparent); color: var(--call-danger); border: 1px solid color-mix(in srgb, var(--call-danger) 25%, transparent); &:hover { background: color-mix(in srgb, var(--call-danger) 22%, transparent); }`}
`;

const EmptyWaiting = styled.div`
  text-align: center;
  color: var(--call-muted);
  font-size: 13px;
  padding: 28px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  transition: background 0.12s;
  &:hover {
    background: color-mix(in srgb, var(--call-panel) 88%, transparent);
  }
`;

const MemberAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--call-panel);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--call-text);
`;

const MemberInfo = styled.div`
  flex: 1;
  min-width: 0;
  color: var(--call-text);
  font-size: 13px;
  font-weight: 500;
  display: grid;
  gap: 6px;
`;

const MemberName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemberStatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  color: var(--call-muted);
  font-size: 11px;
`;

const MemberStatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  border-radius: 999px;
  border: 1px solid
    ${(props) =>
      props.$tone === "danger"
        ? "color-mix(in srgb, var(--call-danger) 30%, transparent)"
        : "color-mix(in srgb, var(--call-success) 30%, transparent)"};
  background: ${(props) =>
    props.$tone === "danger"
      ? "color-mix(in srgb, var(--call-danger) 12%, transparent)"
      : "color-mix(in srgb, var(--call-success) 12%, transparent)"};
  color: ${(props) =>
    props.$tone === "danger"
      ? "var(--call-danger)"
      : "var(--call-success)"};
`;

const MemberIcons = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
  color: var(--call-muted);
  flex-shrink: 0;
`;

const MemberActionBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.$danger
        ? "color-mix(in srgb, var(--call-danger) 32%, transparent)"
        : props.$success
          ? "color-mix(in srgb, var(--call-success) 32%, transparent)"
          : "var(--call-border)"};
  background: ${(props) =>
    props.$danger
      ? "color-mix(in srgb, var(--call-danger) 14%, transparent)"
      : props.$success
        ? "color-mix(in srgb, var(--call-success) 14%, transparent)"
        : "color-mix(in srgb, var(--call-panel) 92%, transparent)"};
  color: ${(props) =>
    props.$danger
      ? "var(--call-danger)"
      : props.$success
        ? "var(--call-success)"
        : "var(--call-text)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.16s ease, background 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${(props) =>
      props.$danger
        ? "color-mix(in srgb, var(--call-danger) 20%, transparent)"
        : props.$success
          ? "color-mix(in srgb, var(--call-success) 20%, transparent)"
          : "color-mix(in srgb, var(--call-panel) 100%, transparent)"};
  }
`;

const SectionLabel = styled.div`
  color: var(--call-muted);
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
  background: var(--call-danger);
  color: white;
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
  color: var(--call-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
  &:hover {
    color: var(--call-text);
  }
`;

// ─── Controls ─────────────────────────────────────────────────────────────────

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  align-self: center;
  width: max-content;
  max-width: calc(100% - 24px);
  margin: 0 auto calc(14px + env(safe-area-inset-bottom, 0px));
  padding: 12px 16px;
  background: rgba(24, 24, 27, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 30px;
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.32);
  flex-shrink: 0;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
`;

const CtrlBtn = styled.button`
  width: ${(p) => (p.$danger ? "92px" : "62px")};
  height: 58px;
  border-radius: ${(p) => (p.$danger ? "22px" : "20px")};
  border: 1px solid
    ${(p) =>
      p.$danger
        ? "rgba(255,255,255,0.06)"
        : p.$state === "off"
          ? "rgba(244, 114, 182, 0.16)"
          : p.$state === "accent"
            ? "rgba(250, 166, 26, 0.18)"
            : "rgba(255,255,255,0.06)"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  position: relative;
  flex-shrink: 0;
  ${(p) =>
    p.$danger
      ? `background: #d64a3a; color: white; &:hover { background: #c63f30; transform: translateY(-1px); }`
      : p.$state === "off"
        ? `background: rgba(247, 200, 204, 0.96); color: #7b241f; &:hover { background: rgba(248, 214, 217, 1); transform: translateY(-1px); }`
        : p.$state === "accent"
          ? `background: rgba(54, 54, 56, 0.98); color: #faa61a; &:hover { background: rgba(66, 66, 68, 1); transform: translateY(-1px); }`
          : `background: rgba(54, 54, 56, 0.98); color: #f5f5f5; &:hover { background: rgba(66, 66, 68, 1); transform: translateY(-1px); }`}

  @media (max-width: 480px) {
    width: ${(p) => (p.$danger ? "84px" : "58px")};
    height: 54px;
  }
`;

const ControlDivider = styled.div`
  width: 1px;
  height: 34px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  flex-shrink: 0;
`;

const CenterBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: var(--call-muted);
  font-size: 15px;
`;

const Spin = styled(Loader)`
  animation: ${pulse} 1.2s linear infinite;
`;

const recPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const RecBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(240, 71, 71, 0.15);
  border: 1px solid rgba(240, 71, 71, 0.3);
  border-radius: 20px;
  padding: 4px 12px 4px 8px;
  color: #f04747;
  font-size: 11px;
  font-weight: 700;
  animation: ${recPulse} 1.5s ease infinite;
`;

const RecordMenu = styled.div`
  position: absolute;
  bottom: 62px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e2124;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 6px;
  min-width: 220px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
  animation: ${slideIn} 0.15s ease;
  z-index: 100;
`;

const RecordOption = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #dcddde;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.12s;
  text-align: left;
  &:hover {
    background: rgba(114, 137, 218, 0.15);
    color: #fff;
  }
`;

const RecordOptionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.$bg || "rgba(255,255,255,0.06)"};
  flex-shrink: 0;
`;

// ─── VideoEl ──────────────────────────────────────────────────────────────────

const FullscreenBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.55);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 5px;
  cursor: pointer;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transition: opacity 0.15s;
  z-index: 5;
  &:hover {
    background: rgba(114, 137, 218, 0.7);
  }

  @media (max-width: 768px) {
    opacity: 1;
  }
`;

const VideoEl = ({
  stream,
  muted = false,
  isLocal = false,
  label,
  isCamOn = true,
  isScreenShare = false,
  canFullscreen = false,
  isFullscreen = false,
  onToggleFullscreen,
  onSelect,
  isActive = false,
  compact = false,
  handRaised = false,
}) => {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !stream || !isCamOn) return undefined;

    if (node.srcObject !== stream) {
      node.srcObject = stream;
    }

    let cancelled = false;
    let retryTimeoutId = null;

    const ensurePlayback = () => {
      if (cancelled || !ref.current) return;

      const playPromise = ref.current.play?.();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          if (cancelled) return;
          retryTimeoutId = window.setTimeout(() => {
            ensurePlayback();
          }, 180);
        });
      }
    };

    const handleReady = () => {
      ensurePlayback();
    };

    node.onloadedmetadata = handleReady;
    node.oncanplay = handleReady;
    ensurePlayback();

    return () => {
      cancelled = true;
      if (retryTimeoutId) {
        window.clearTimeout(retryTimeoutId);
      }
      if (node) {
        node.onloadedmetadata = null;
        node.oncanplay = null;
      }
    };
  }, [isCamOn, stream]);

  const handleTileClick = useCallback(() => {
    onSelect?.();
  }, [onSelect]);

  const handleToggleFullscreen = useCallback(
    (event) => {
      event.stopPropagation();
      onToggleFullscreen?.();
    },
    [onToggleFullscreen],
  );

  return (
    <VideoTile
      $isLocal={isLocal}
      $compact={compact}
      $mirror={isLocal && !isScreenShare}
      $screenShare={isScreenShare}
      $active={isActive}
      $clickable={Boolean(onSelect)}
      onClick={handleTileClick}
    >
      {canFullscreen ? (
        <FullscreenBtn
          type="button"
          $visible={isActive || compact}
          onClick={handleToggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen tile" : "Fullscreen tile"}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize size={14} />}
        </FullscreenBtn>
      ) : null}
      {handRaised ? (
        <span
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            fontSize: 24,
            zIndex: 5,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
          }}
        >
          <Hand size={20} color="#faa61a" fill="#faa61a" />
        </span>
      ) : null}
      {isCamOn && stream ? (
        <video ref={ref} autoPlay playsInline muted={muted} />
      ) : (
        <NoCamera $compact={compact}>
          <Avatar $compact={compact}>{label?.charAt(0)?.toUpperCase() || "?"}</Avatar>
        </NoCamera>
      )}
      <TileLabel $compact={compact}>
        {!isCamOn && !isScreenShare && <VideoOff size={11} />}
        {label}
        {isLocal && t("groupCall.localSuffix")}
      </TileLabel>
    </VideoTile>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const GroupVideoCall = ({
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  isMinimized = false,
  roomId,
  chatTitle,
  displayName: preferredDisplayName,
  isCreator = true,
  isPrivate = false,
  initialMicOn = true,
  initialCamOn = true,
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [fullscreenTileId, setFullscreenTileId] = useState(null);
  const [lastSpeakerPeerId, setLastSpeakerPeerId] = useState(null);
  const [pipWindow, setPipWindow] = useState(null);
  const [pipContainer, setPipContainer] = useState(null);
  const pipCloseIntentRef = useRef(false);
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 720,
  }));

  const currentUser = useAuthStore((state) => state.user);
  const updateActiveCall = useMeetCallStore((state) => state.updateActiveCall);

  const displayName =
    preferredDisplayName?.trim() ||
    currentUser?.nickname ||
    currentUser?.username ||
    t("groupCall.guest");

  const {
    localStream,
    remoteStreams,
    remotePeerStates,
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
    micLocked,
    camLocked,
    toggleMic,
    toggleCam,
    leaveCall,
    error,
    roomTitle,
    roomIsPrivate,
    remoteIsRecording,
    emitRecording,
    forceMuteMic,
    forceMuteCam,
    allowMic,
    allowCam,
    isHandRaised,
    raisedHands,
    toggleHandRaise,
    kickPeer,
    setRoomPrivacy,
    networkQuality,
    qualityProfile,
  } = useWebRTC({
    roomId,
    displayName,
    enabled: isOpen && !!roomId,
    isCreator,
    isPrivate,
    chatTitle,
    initialMicOn,
    initialCamOn,
  });

  const [privacyUpdating, setPrivacyUpdating] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    updateActiveCall?.({ isPrivate: roomIsPrivate });
  }, [roomIsPrivate, updateActiveCall]);

  const handleToggleRoomPrivacy = useCallback(async () => {
    if (!isCreator || privacyUpdating) return;

    const nextIsPrivate = !roomIsPrivate;
    setPrivacyUpdating(true);
    setRoomPrivacy(nextIsPrivate);
    updateActiveCall?.({ isPrivate: nextIsPrivate });

    try {
      await updateMeetPrivacy(roomId, nextIsPrivate);
      toast.success(
        nextIsPrivate
          ? "Endi kirish tasdiq bilan bo'ladi"
          : "Endi kirish tasdiqsiz bo'ladi",
      );
    } catch (error) {
      setRoomPrivacy(!nextIsPrivate);
      updateActiveCall?.({ isPrivate: !nextIsPrivate });
      toast.error("Meet kirish sozlamasini saqlab bo'lmadi");
    } finally {
      setPrivacyUpdating(false);
    }
  }, [
    isCreator,
    privacyUpdating,
    roomIsPrivate,
    roomId,
    setRoomPrivacy,
    updateActiveCall,
  ]);

  // ─── Recording logic ─────────────────────────────────────────────────────────
  const [isRecording, setIsRecording] = useState(false);
  const [showRecordMenu, setShowRecordMenu] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const canvasRef = useRef(null);
  const drawIntervalRef = useRef(null);
  const recordScreenStreamRef = useRef(null);

  const mixAllAudio = useCallback(() => {
    const audioCtx = new AudioContext();
    const dest = audioCtx.createMediaStreamDestination();
    const allStreams = [
      localStream,
      ...remoteStreams.map((r) => r.stream),
    ].filter(Boolean);
    allStreams.forEach((s) => {
      const audioTracks = s.getAudioTracks();
      if (audioTracks.length > 0) {
        const source = audioCtx.createMediaStreamSource(
          new MediaStream(audioTracks),
        );
        source.connect(dest);
      }
    });
    return dest.stream;
  }, [localStream, remoteStreams]);

  const startRecording = useCallback(
    async (mode) => {
      try {
        setShowRecordMenu(false);
        let videoStream;

        if (mode === "screen") {
          // Record screen share via getDisplayMedia
          const screen = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false,
          });
          recordScreenStreamRef.current = screen;
          videoStream = screen;
          // Auto stop when user stops share
          screen.getVideoTracks()[0].onended = () => stopRecording();
        } else {
          // Record all tiles via canvas composite
          const canvas = document.createElement("canvas");
          canvas.width = 1280;
          canvas.height = 720;
          canvasRef.current = canvas;
          const ctx = canvas.getContext("2d");
          const drawFrame = () => {
            const videos = document.querySelectorAll("video");
            const count = videos.length || 1;
            const cols = count <= 1 ? 1 : count <= 4 ? 2 : 3;
            const rows = Math.ceil(count / cols);
            const w = canvas.width / cols;
            const h = canvas.height / rows;
            ctx.fillStyle = "#0b0d0f";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            videos.forEach((video, i) => {
              const col = i % cols;
              const row = Math.floor(i / cols);
              try {
                ctx.drawImage(video, col * w, row * h, w, h);
              } catch {}
            });
          };
          drawIntervalRef.current = setInterval(drawFrame, 33);
          videoStream = canvas.captureStream(30);
        }

        // Mix all audio
        const mixedAudio = mixAllAudio();

        // Combine video + audio
        const combined = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...mixedAudio.getAudioTracks(),
        ]);

        chunksRef.current = [];
        const recorder = new MediaRecorder(combined, {
          mimeType: "video/webm;codecs=vp9,opus",
        });
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
        mediaRecorderRef.current = recorder;
        recorder.start(1000);

        setIsRecording(true);
        emitRecording(true);
      } catch (err) {
        console.error("Recording error:", err);
        setShowRecordMenu(false);
      }
    },
    [mixAllAudio, emitRecording],
  );

  const stopRecording = useCallback(() => {
    if (drawIntervalRef.current) {
      clearInterval(drawIntervalRef.current);
      drawIntervalRef.current = null;
    }
    if (recordScreenStreamRef.current) {
      recordScreenStreamRef.current.getTracks().forEach((t) => t.stop());
      recordScreenStreamRef.current = null;
    }
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `meet-${roomId}-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        chunksRef.current = [];
      };
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    emitRecording(false);
  }, [roomId, emitRecording]);

  const handleLeave = () => {
    try {
      if (isRecording) stopRecording();
    } catch (e) {
      console.error("Failed to stop recording:", e);
    }

    try {
      leaveCall();
    } catch (e) {
      console.error("Failed to leave call:", e);
    }

    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${RESOLVED_APP_BASE_URL}/join/${roomId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closePiPWindow = useCallback(() => {
    if (pipWindow && !pipWindow.closed) {
      pipCloseIntentRef.current = true;
      pipWindow.close();
    }
    setPipWindow(null);
    setPipContainer(null);
  }, [pipWindow]);

  useEffect(() => {
    if (!isMinimized || !pipWindow) return undefined;

    const handlePageHide = () => {
      setPipWindow(null);
      setPipContainer(null);
      if (pipCloseIntentRef.current) {
        pipCloseIntentRef.current = false;
        return;
      }
      onMaximize?.();
    };

    pipWindow.addEventListener("pagehide", handlePageHide);
    return () => {
      pipWindow.removeEventListener("pagehide", handlePageHide);
    };
  }, [isMinimized, onMaximize, pipWindow]);

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

  const handleMinimizeToggle = useCallback(async () => {
    if (isMinimized) {
      onMaximize?.();
      return;
    }

    const documentPiP = window?.documentPictureInPicture;
    if (!documentPiP?.requestWindow) {
      onMinimize?.();
      return;
    }

    try {
      const nextPipWindow = await documentPiP.requestWindow({
        width: 360,
        height: 220,
      });

      nextPipWindow.document.body.innerHTML = "";
      nextPipWindow.document.body.style.margin = "0";
      nextPipWindow.document.body.style.background = "#0b0d0f";
      nextPipWindow.document.body.style.overflow = "hidden";

      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules]
            .map((rule) => rule.cssText)
            .join("");
          const style = document.createElement("style");
          style.textContent = cssRules;
          nextPipWindow.document.head.appendChild(style);
        } catch {
          if (styleSheet.href) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = styleSheet.type;
            link.media = styleSheet.media;
            link.href = styleSheet.href;
            nextPipWindow.document.head.appendChild(link);
          }
        }
      });

      const mountNode = nextPipWindow.document.createElement("div");
      mountNode.style.width = "100%";
      mountNode.style.height = "100%";
      nextPipWindow.document.body.appendChild(mountNode);

      pipCloseIntentRef.current = false;
      setPipWindow(nextPipWindow);
      setPipContainer(mountNode);
      onMinimize?.();
    } catch (error) {
      console.error("Document PiP ochilmadi:", error);
      onMinimize?.();
    }
  }, [isMinimized, onMaximize, onMinimize]);

  const handleMaximizeFromPiP = useCallback(() => {
    onMaximize?.();
  }, [onMaximize]);

  if (!isOpen || !roomId) return null;

  const participantsCount = 1 + remoteStreams.length;
  const primaryRemote = remoteStreams[0] || null;
  const primaryRemoteState = primaryRemote
    ? remotePeerStates[primaryRemote.peerId]
    : null;
  const primaryRemoteCameraVisible =
    Boolean(primaryRemote?.stream) &&
    primaryRemoteState?.hasVideo !== false &&
    primaryRemoteState?.videoMuted !== true;
  const minimizedPreviewStream =
    remoteScreenStreams[0]?.stream ||
    (primaryRemoteCameraVisible ? primaryRemote?.stream : null) ||
    screenStream ||
    (isCamOn ? localStream : null) ||
    localStream ||
    null;
  const minimizedPreviewMirror =
    !remoteScreenStreams[0]?.stream &&
    !primaryRemoteCameraVisible &&
    !screenStream &&
    Boolean(localStream);
  const minimizedPreviewRef = useCallback(
    (node) => {
      if (node && minimizedPreviewStream) {
        if (node.srcObject !== minimizedPreviewStream) {
          node.srcObject = minimizedPreviewStream;
        }
        const playPromise = node.play?.();
        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }
      }
    },
    [minimizedPreviewStream],
  );
  const isMobileViewport = viewport.width <= 768;
  const isLandscapeViewport = viewport.width > viewport.height;

  const callTiles = useMemo(() => {
    const tiles = [
      {
        id: "local",
        peerId: "local",
        stream: localStream,
        label: displayName,
        isLocal: true,
        isScreenShare: false,
        hasVideo: Boolean(localStream) && isCamOn,
        handRaised: false,
        isCamOn,
        muted: true,
      },
    ];

    if (screenStream) {
      tiles.unshift({
        id: "local-screen",
        peerId: "local",
        stream: screenStream,
        label: `${displayName} · Ekran`,
        isLocal: true,
        isScreenShare: true,
        hasVideo: true,
        handRaised: false,
        isCamOn: true,
        muted: true,
      });
    }

    remoteStreams.forEach(({ peerId, stream, displayName: remoteName }) => {
      const peerState = remotePeerStates[peerId];
      const isRemoteCamOn =
        peerState?.hasVideo !== false && peerState?.videoMuted !== true;

      tiles.push({
        id: peerId,
        peerId,
        stream,
        label: remoteName,
        isLocal: false,
        isScreenShare: false,
        hasVideo: Boolean(stream) && isRemoteCamOn,
        handRaised: raisedHands.has(peerId),
        isCamOn: isRemoteCamOn,
        muted: false,
      });
    });

    remoteScreenStreams.forEach(({ peerId, stream, displayName: remoteName }) => {
      tiles.unshift({
        id: `screen-${peerId}`,
        peerId,
        stream,
        label: `${remoteName} · Ekran`,
        isLocal: false,
        isScreenShare: true,
        hasVideo: Boolean(stream),
        handRaised: false,
        isCamOn: true,
        muted: false,
      });
    });

    return tiles;
  }, [
    displayName,
    isCamOn,
    localStream,
    raisedHands,
    remotePeerStates,
    remoteScreenStreams,
    remoteStreams,
    screenStream,
  ]);

  const tileCount = callTiles.length;
  const defaultStageTileId =
    callTiles.find((tile) => tile.isScreenShare && tile.hasVideo)?.id || null;

  useEffect(() => {
    setSelectedTileId((current) =>
      current && callTiles.some((tile) => tile.id === current) ? current : null,
    );
  }, [callTiles]);

  useEffect(() => {
    setFullscreenTileId((current) => {
      if (!current) return null;
      const currentTile = callTiles.find((tile) => tile.id === current);
      if (!currentTile?.hasVideo) {
        return null;
      }
      return current;
    });
  }, [callTiles]);

  useEffect(() => {
    if (!remoteStreams.length) {
      setLastSpeakerPeerId(null);
      return;
    }

    setLastSpeakerPeerId((current) => {
      if (current && remoteStreams.some((streamItem) => streamItem.peerId === current)) {
        return current;
      }
      return remoteStreams[0]?.peerId || null;
    });
  }, [remoteStreams]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof (window.AudioContext || window.webkitAudioContext) !== "function" ||
      remoteStreams.length === 0
    ) {
      return undefined;
    }

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContextCtor();
    let rafId = 0;
    let disposed = false;
    let lastCommittedPeerId = null;
    let lastCommitAt = 0;

    const analysers = remoteStreams
      .map(({ peerId, stream }) => {
        const peerState = remotePeerStates[peerId];
        const audioTracks =
          stream
            ?.getAudioTracks?.()
            ?.filter(
              (track) => track.readyState === "live" && peerState?.audioMuted !== true,
            ) || [];

        if (audioTracks.length === 0) return null;

        try {
          const source = audioContext.createMediaStreamSource(new MediaStream(audioTracks));
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.82;
          source.connect(analyser);

          return {
            peerId,
            source,
            analyser,
            data: new Uint8Array(analyser.frequencyBinCount),
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    if (!analysers.length) {
      audioContext.close().catch(() => {});
      return undefined;
    }

    audioContext.resume?.().catch(() => {});

    const detectSpeaker = () => {
      if (disposed) return;

      let strongestPeerId = null;
      let strongestLevel = 0;

      analysers.forEach((item) => {
        item.analyser.getByteTimeDomainData(item.data);

        let totalDelta = 0;
        for (let index = 0; index < item.data.length; index += 1) {
          totalDelta += Math.abs(item.data[index] - 128);
        }

        const averageDelta = totalDelta / item.data.length;
        if (averageDelta > strongestLevel) {
          strongestLevel = averageDelta;
          strongestPeerId = item.peerId;
        }
      });

      if (strongestPeerId && strongestLevel > 10) {
        const now = performance.now();
        if (strongestPeerId !== lastCommittedPeerId || now - lastCommitAt > 1200) {
          lastCommittedPeerId = strongestPeerId;
          lastCommitAt = now;
          setLastSpeakerPeerId((current) =>
            current === strongestPeerId ? current : strongestPeerId,
          );
        } else {
          lastCommitAt = now;
        }
      }

      rafId = window.requestAnimationFrame(detectSpeaker);
    };

    rafId = window.requestAnimationFrame(detectSpeaker);

    return () => {
      disposed = true;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      analysers.forEach((item) => {
        try {
          item.source.disconnect();
        } catch {}
        try {
          item.analyser.disconnect();
        } catch {}
      });
      audioContext.close().catch(() => {});
    };
  }, [remotePeerStates, remoteStreams]);

  const activeStageTileId = fullscreenTileId || selectedTileId || defaultStageTileId;
  const activeStageTile = callTiles.find((tile) => tile.id === activeStageTileId) || null;
  const sideTiles = callTiles.filter((tile) => tile.id !== activeStageTileId);
  const hasStageLayout = Boolean(activeStageTile);

  const mobileCompactTiles = useMemo(() => {
    if (!isMobileViewport || !hasStageLayout) return [];

    const selfTile =
      sideTiles.find((tile) => tile.id === "local") ||
      callTiles.find((tile) => tile.id === "local") ||
      null;

    const speakingTile =
      sideTiles.find(
        (tile) =>
          !tile.isLocal &&
          !tile.isScreenShare &&
          tile.peerId === lastSpeakerPeerId,
      ) ||
      sideTiles.find((tile) => !tile.isLocal && !tile.isScreenShare) ||
      sideTiles.find((tile) => !tile.isLocal) ||
      null;

    const compactTiles = [];
    if (selfTile) compactTiles.push(selfTile);
    if (speakingTile && speakingTile.id !== selfTile?.id) compactTiles.push(speakingTile);
    return compactTiles.slice(0, 2);
  }, [callTiles, hasStageLayout, isMobileViewport, lastSpeakerPeerId, sideTiles]);

  const qualityTone =
    networkQuality === "poor"
      ? "var(--call-warning)"
      : networkQuality === "limited"
        ? "var(--call-primary)"
        : "var(--call-success)";

  const handleStageSelect = useCallback((tileId) => {
    setSelectedTileId((current) => (current === tileId ? null : tileId));
    setFullscreenTileId((current) => (current === tileId ? null : current));
  }, []);

  const handleToggleTileFullscreen = useCallback(
    (tileId) => {
      const tile = callTiles.find((entry) => entry.id === tileId);
      if (!tile?.hasVideo) return;

      setSelectedTileId(tileId);
      setFullscreenTileId((current) => (current === tileId ? null : tileId));
    },
    [callTiles],
  );

  const handleResetStage = useCallback(() => {
    setFullscreenTileId(null);
    setSelectedTileId(null);
  }, []);

  const renderCallTile = (
    tile,
    { compact = false, selectable = true, showFullscreenControl = true } = {},
  ) => (
    <VideoEl
      key={tile.id}
      stream={tile.stream}
      muted={tile.muted}
      isLocal={tile.isLocal}
      label={tile.label}
      isCamOn={tile.isCamOn}
      isScreenShare={tile.isScreenShare}
      canFullscreen={showFullscreenControl && tile.hasVideo}
      isFullscreen={fullscreenTileId === tile.id}
      onToggleFullscreen={() => handleToggleTileFullscreen(tile.id)}
      onSelect={selectable ? () => handleStageSelect(tile.id) : undefined}
      isActive={activeStageTileId === tile.id}
      compact={compact}
      handRaised={tile.handRaised}
    />
  );

  const handleScreenShareToggle = useCallback(async () => {
    const isIOS =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream;
    const supportsScreenShare =
      typeof navigator !== "undefined" &&
      Boolean(navigator.mediaDevices?.getDisplayMedia);

    if (!isScreenSharing && (!supportsScreenShare || isIOS)) {
      toast.error(t("groupCall.screenShareUnavailable"));
      return;
    }

    const success = await toggleScreenShare();

    if (!isScreenSharing && success === false) {
      toast.error(t("groupCall.screenShareFailed"));
    }
  }, [isScreenSharing, t, toggleScreenShare]);

  const topBarContent = (
    <TopBar>
      <CallInfo>
        <CallTitle>
          {roomTitle || chatTitle || "Meet"}
          {roomIsPrivate && (
            <span
              style={{
                fontSize: 11,
                color: "#faa61a",
                marginLeft: 8,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <ShieldAlert size={12} /> {t("groupCall.privateBadge")}
            </span>
          )}
        </CallTitle>
        <CallSub>{roomId}</CallSub>
      </CallInfo>
      <TopActions>
        {(isRecording || remoteIsRecording) && (
          <RecBadge>
            <Circle size={8} fill="#f04747" /> {t("groupCall.recording")}
          </RecBadge>
        )}
        <TinyBtn
          as="div"
          style={{
            cursor: "default",
            color: qualityTone,
            borderColor: qualityTone,
          }}
        >
          {qualityProfile.label}
        </TinyBtn>
        {(onMinimize || isMinimized) && (
          <TinyBtn onClick={handleMinimizeToggle}>
            {isMinimized ? <Maximize size={13} /> : <Minimize2 size={13} />}
            {isMinimized ? t("groupCall.open") : t("groupCall.minimize")}
          </TinyBtn>
        )}
        <TinyBtn onClick={handleCopy}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? t("groupCall.copied") : t("groupCall.copyLink")}
        </TinyBtn>
        {!isMinimized && (
          <TinyBtn
            onClick={() => setShowDrawer((p) => !p)}
            style={{ position: "relative" }}
          >
            <Users size={13} />
            {participantsCount}
            {isCreator && knockRequests.length > 0 && (
              <NotifBadge>{knockRequests.length}</NotifBadge>
            )}
          </TinyBtn>
        )}
      </TopActions>
    </TopBar>
  );

  const minimizedContent = (
    <>
      {topBarContent}

      <MinimizedBody
        type="button"
        onClick={pipContainer ? handleMaximizeFromPiP : onMaximize}
      >
        <MiniPreview>
          {minimizedPreviewStream ? (
            <MiniPreviewVideo
              ref={minimizedPreviewRef}
              autoPlay
              muted={minimizedPreviewMirror}
              playsInline
              $mirror={minimizedPreviewMirror}
            />
          ) : null}
        </MiniPreview>
        <MiniOverlay>
          <div>
            <MiniTitle>{roomTitle || chatTitle || t("groupCall.roomDefault")}</MiniTitle>
            <MiniMeta>
              {t("groupCall.participants", { count: participantsCount })} •{" "}
              {roomIsPrivate ? t("groupCall.privateRoom") : t("groupCall.publicRoom")}
            </MiniMeta>
          </div>
          <MiniActions>
            <MiniMeta>{roomId}</MiniMeta>
            {isMicOn ? <Mic size={16} color="#43b581" /> : <MicOff size={16} color="#f04747" />}
            {isCamOn ? <Video size={16} color="#43b581" /> : <VideoOff size={16} color="#f04747" />}
          </MiniActions>
        </MiniOverlay>
      </MinimizedBody>
    </>
  );

  if (isMinimized && pipContainer) {
    return createPortal(<PiPFrame>{minimizedContent}</PiPFrame>, pipContainer);
  }

  return (
    <Overlay $minimized={isMinimized}>
      {isMinimized ? (
        <MinimizedBody type="button" onClick={onMaximize}>
          <MiniPreview>
            {minimizedPreviewStream ? (
              <MiniPreviewVideo
                ref={minimizedPreviewRef}
                autoPlay
                muted={minimizedPreviewMirror}
                playsInline
                $mirror={minimizedPreviewMirror}
              />
            ) : null}
          </MiniPreview>
          <MiniOverlay>
            <div>
            <MiniTitle>{roomTitle || chatTitle || t("groupCall.roomDefault")}</MiniTitle>
            <MiniMeta>
                {t("groupCall.participants", { count: participantsCount })} •{" "}
                {roomIsPrivate ? t("groupCall.privateRoom") : t("groupCall.publicRoom")}
              </MiniMeta>
            </div>
            <MiniActions>
              <MiniMeta>{roomId}</MiniMeta>
              {isMicOn ? <Mic size={16} color="#43b581" /> : <MicOff size={16} color="#f04747" />}
              {isCamOn ? <Video size={16} color="#43b581" /> : <VideoOff size={16} color="#f04747" />}
            </MiniActions>
          </MiniOverlay>
        </MinimizedBody>
      ) : (
      <>
      {topBarContent}
      <Body>
        {error ? (
          <CenterBox>
            <AlertCircle size={38} color="#f04747" />
            <span>{error}</span>
            <TinyBtn onClick={onClose}>{t("groupCall.close")}</TinyBtn>
          </CenterBox>
        ) : joinStatus === "connecting" ? (
          <CenterBox>
            <Spin size={38} color="#7289da" />
            <span>{t("groupCall.connecting")}</span>
          </CenterBox>
        ) : joinStatus === "waiting" ? (
          <CenterBox>
            <Clock size={48} color="#faa61a" />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
              {t("groupCall.waiting")}
            </span>
            <span>{t("groupCall.waitingDescription")}</span>
            <TinyBtn onClick={handleLeave}>{t("common.cancel")}</TinyBtn>
          </CenterBox>
        ) : joinStatus === "rejected" ? (
          <CenterBox>
            <XCircle size={48} color="#f04747" />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
              {t("groupCall.rejected")}
            </span>
            <span>{t("groupCall.rejectedDescription")}</span>
            <TinyBtn onClick={onClose}>{t("groupCall.close")}</TinyBtn>
          </CenterBox>
        ) : hasStageLayout && activeStageTile ? (
          <StageLayout
            $mobile={isMobileViewport}
            $immersive={Boolean(fullscreenTileId)}
            $landscape={isLandscapeViewport}
            $mobileCompactCount={mobileCompactTiles.length}
          >
            {isMobileViewport && mobileCompactTiles.length > 0 ? (
              <MobileTopRail>
                {mobileCompactTiles.map((tile) => (
                  <MobileTopRailTile key={`compact-${tile.id}`}>
                    {renderCallTile(tile, {
                      compact: true,
                      showFullscreenControl: false,
                    })}
                  </MobileTopRailTile>
                ))}
              </MobileTopRail>
            ) : null}

            <StageMain>
              <div style={{ height: "100%" }}>
                {renderCallTile(activeStageTile, {
                  selectable: false,
                  showFullscreenControl: false,
                })}
              </div>
              <StageActions>
                {selectedTileId && !fullscreenTileId ? (
                  <StageActionBtn type="button" onClick={handleResetStage}>
                    <ArrowLeft size={18} />
                  </StageActionBtn>
                ) : null}
                {activeStageTile.hasVideo ? (
                  <StageActionBtn
                    type="button"
                    onClick={() => handleToggleTileFullscreen(activeStageTile.id)}
                  >
                    {fullscreenTileId === activeStageTile.id ? (
                      <Minimize2 size={18} />
                    ) : (
                      <Maximize size={18} />
                    )}
                  </StageActionBtn>
                ) : null}
              </StageActions>
            </StageMain>

            {!isMobileViewport ? (
              <StageRail>
                {sideTiles.length > 0 ? <StageRailLabel>Qolganlar</StageRailLabel> : null}
                <StageRailGrid
                  $mobile={isMobileViewport}
                  $immersive={Boolean(fullscreenTileId)}
                >
                  {sideTiles.map((tile) =>
                    renderCallTile(tile, {
                      compact: true,
                    }),
                  )}
                </StageRailGrid>
              </StageRail>
            ) : null}
          </StageLayout>
        ) : (
          <VideoGrid $count={tileCount}>
            {callTiles.map((tile) => renderCallTile(tile))}
          </VideoGrid>
        )}

        {/* Members Drawer */}
        {showDrawer && (
          <WaitingBackdrop onClick={() => setShowDrawer(false)}>
          <WaitingPanel onClick={(event) => event.stopPropagation()}>
            <PanelHead>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Users size={15} color="#7289da" />
                {t("groupCall.members", { count: participantsCount })}
              </span>
              <DrawerClose onClick={() => setShowDrawer(false)}>
                <XCircle size={16} />
              </DrawerClose>
            </PanelHead>
            <PanelBody>
              {/* Waiting section — only creator of private room */}
              {isCreator && (
                <>
                  <PrivacyRow>
                    <PrivacyMeta>
                      <strong>Meetga kirishni tasdiqlash</strong>
                      <span>
                        {roomIsPrivate
                          ? "Yoqilgan. Yangi kiruvchilar avval kutadi."
                          : "O‘chiq. Link bilan kirganlar darrov qo‘shiladi."}
                      </span>
                    </PrivacyMeta>
                    <PrivacyToggle
                      type="button"
                      $active={roomIsPrivate}
                      disabled={privacyUpdating}
                      onClick={handleToggleRoomPrivacy}
                      aria-label="Meetga kirish tasdiqlash rejimini almashtirish"
                    />
                  </PrivacyRow>

                  {roomIsPrivate ? (
                    <>
                      <SectionLabel
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Timer size={12} />{" "}
                        {t("groupCall.waitingMembers", {
                          count: knockRequests.length,
                        })}
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
                            <KnockName
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <User size={14} /> {n}
                            </KnockName>
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
                  ) : null}
                </>
              )}

              {/* Joined members */}
              <SectionLabel
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <CheckSquare size={12} color="#43b581" /> Qo'shilganlar (
                {participantsCount})
              </SectionLabel>
              {/* Local user */}
              <MemberRow>
                <MemberAvatar>
                  {displayName?.charAt(0)?.toUpperCase() || "?"}
                </MemberAvatar>
                <MemberInfo>
                  <MemberName>{displayName} (Sen)</MemberName>
                  <MemberStatusRow>
                    <MemberStatusBadge $tone={isMicOn ? "success" : "danger"}>
                      {isMicOn ? (
                        <Mic size={11} />
                      ) : (
                        <MicOff size={11} />
                      )}
                      {isMicOn ? "Mikrofon on" : "Mikrofon off"}
                    </MemberStatusBadge>
                    <MemberStatusBadge $tone={isCamOn ? "success" : "danger"}>
                      {isCamOn ? (
                        <Video size={11} />
                      ) : (
                        <VideoOff size={11} />
                      )}
                      {isCamOn ? "Kamera on" : "Kamera off"}
                    </MemberStatusBadge>
                  </MemberStatusRow>
                </MemberInfo>
                <MemberIcons>
                  {isMicOn ? (
                    <Mic size={13} color="var(--call-success)" />
                  ) : (
                    <MicOff size={13} color="var(--call-danger)" />
                  )}
                  {isCamOn ? (
                    <Video size={13} color="var(--call-success)" />
                  ) : (
                    <VideoOff size={13} color="var(--call-danger)" />
                  )}
                </MemberIcons>
              </MemberRow>
              {/* Remote peers */}
              {remoteStreams.map(({ peerId, displayName: n }) => {
                const peerState = remotePeerStates[peerId] || {};
                const isPeerMicOn =
                  peerState.hasAudio !== false && peerState.audioMuted !== true;
                const isPeerCamOn =
                  peerState.hasVideo !== false && peerState.videoMuted !== true;

                return (
                  <MemberRow key={peerId}>
                    <MemberAvatar>
                      {n?.charAt(0)?.toUpperCase() || "?"}
                    </MemberAvatar>
                    <MemberInfo>
                      <MemberName>
                        {raisedHands.has(peerId) && (
                          <Hand size={14} color="#faa61a" fill="#faa61a" />
                        )}
                        {n}
                      </MemberName>
                      <MemberStatusRow>
                        <MemberStatusBadge
                          $tone={isPeerMicOn ? "success" : "danger"}
                        >
                          {isPeerMicOn ? (
                            <Mic size={11} />
                          ) : (
                            <MicOff size={11} />
                          )}
                          {isPeerMicOn ? "Mikrofon on" : "Mikrofon off"}
                        </MemberStatusBadge>
                        <MemberStatusBadge
                          $tone={isPeerCamOn ? "success" : "danger"}
                        >
                          {isPeerCamOn ? (
                            <Video size={11} />
                          ) : (
                            <VideoOff size={11} />
                          )}
                          {isPeerCamOn ? "Kamera on" : "Kamera off"}
                        </MemberStatusBadge>
                      </MemberStatusRow>
                    </MemberInfo>
                    <MemberIcons>
                      {isCreator ? (
                        <>
                          <MemberActionBtn
                            onClick={() =>
                              isPeerMicOn ? forceMuteMic(peerId) : allowMic(peerId)
                            }
                            title={isPeerMicOn ? "Mic o'chirish" : "Mic yoqish"}
                            $danger={!isPeerMicOn}
                            $success={isPeerMicOn}
                          >
                            {isPeerMicOn ? <MicOff size={16} /> : <Mic size={16} />}
                          </MemberActionBtn>
                          <MemberActionBtn
                            onClick={() =>
                              isPeerCamOn ? forceMuteCam(peerId) : allowCam(peerId)
                            }
                            title={isPeerCamOn ? "Cam o'chirish" : "Cam yoqish"}
                            $danger={!isPeerCamOn}
                            $success={isPeerCamOn}
                          >
                            {isPeerCamOn ? (
                              <VideoOff size={16} />
                            ) : (
                              <Video size={16} />
                            )}
                          </MemberActionBtn>
                          <MemberActionBtn
                            onClick={() => kickPeer(peerId)}
                            title="Chiqarib yuborish"
                            $danger
                          >
                            <UserMinus size={16} />
                          </MemberActionBtn>
                        </>
                      ) : (
                        <>
                          {isPeerMicOn ? (
                            <Mic size={13} color="var(--call-success)" />
                          ) : (
                            <MicOff size={13} color="var(--call-danger)" />
                          )}
                          {isPeerCamOn ? (
                            <Video size={13} color="var(--call-success)" />
                          ) : (
                            <VideoOff size={13} color="var(--call-danger)" />
                          )}
                        </>
                      )}
                    </MemberIcons>
                  </MemberRow>
                );
              })}
            </PanelBody>
          </WaitingPanel>
          </WaitingBackdrop>
        )}
      </Body>
      </>
        )}

      {!isMinimized && <ControlBar>
        <CtrlBtn
          $state={isMicOn ? "on" : "off"}
          onClick={toggleMic}
          style={micLocked ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          {isMicOn ? <Mic size={21} /> : <MicOff size={21} />}
          {micLocked && (
            <Lock
              size={10}
              style={{ position: "absolute", bottom: 4, right: 4 }}
            />
          )}
        </CtrlBtn>
        <CtrlBtn
          $state={isCamOn ? "on" : "off"}
          onClick={toggleCam}
          style={camLocked ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          {isCamOn ? <Video size={21} /> : <VideoOff size={21} />}
          {camLocked && (
            <Lock
              size={10}
              style={{ position: "absolute", bottom: 4, right: 4 }}
            />
          )}
        </CtrlBtn>
        {!isMobileViewport && (
          <CtrlBtn $state={isScreenSharing ? "accent" : "neutral"} onClick={handleScreenShareToggle}>
            {isScreenSharing ? <MonitorOff size={21} /> : <Monitor size={21} />}
          </CtrlBtn>
        )}
        <CtrlBtn
          $state={isHandRaised ? "accent" : "neutral"}
          onClick={toggleHandRaise}
        >
          <Hand size={21} />
        </CtrlBtn>
        {isCreator && !isMobileViewport && (
          <div style={{ position: "relative" }}>
            <CtrlBtn
              $state={isRecording ? "accent" : "neutral"}
              onClick={() =>
                isRecording ? stopRecording() : setShowRecordMenu((p) => !p)
              }
            >
              <Circle size={21} fill={isRecording ? "#f04747" : "none"} />
            </CtrlBtn>
            {showRecordMenu && !isRecording && (
              <RecordMenu>
                <RecordOption onClick={() => startRecording("screen")}>
                  <RecordOptionIcon $bg="rgba(114,137,218,0.15)">
                    <Monitor size={16} color="#7289da" />
                  </RecordOptionIcon>
                  <div>
                    <div style={{ fontWeight: 600 }}>Ekranni yozish</div>
                    <div style={{ fontSize: 11, color: "#72767d" }}>
                      Faqat ekran + barcha ovozlar
                    </div>
                  </div>
                </RecordOption>
                <RecordOption onClick={() => startRecording("all")}>
                  <RecordOptionIcon $bg="rgba(240,71,71,0.12)">
                    <Circle size={16} color="#f04747" />
                  </RecordOptionIcon>
                  <div>
                    <div style={{ fontWeight: 600 }}>Hammasini yozish</div>
                    <div style={{ fontSize: 11, color: "#72767d" }}>
                      Barcha oynalar + barcha ovozlar
                    </div>
                  </div>
                </RecordOption>
              </RecordMenu>
            )}
          </div>
        )}
        <ControlDivider />
        <CtrlBtn $danger onClick={handleLeave}>
          <PhoneOff size={21} />
        </CtrlBtn>
      </ControlBar>}
    </Overlay>
  );
};

export default GroupVideoCall;
