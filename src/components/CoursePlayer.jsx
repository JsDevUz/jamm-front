import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Clock,
  Eye,
  BookOpen,
  Plus,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Shield,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ListVideo,
  Trash2,
  LogIn,
  X,
  Lock,
  MessageCircle,
  Send,
  CornerDownRight,
  FileText,
  Download,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useCourses } from "../contexts/CoursesContext";
import { useChats } from "../contexts/ChatsContext";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import AddLessonDialog from "./AddLessonDialog";
import ConfirmDialog from "./ConfirmDialog";
import useAuthStore from "../store/authStore";

/* ============================
   LAYOUT CONTAINERS
   ============================ */
const PlayerContainer = styled.div`
  flex: 1;
  display: flex;
  height: 100vh;
  background-color: var(--background-color);
  overflow: hidden;

  @media (max-width: 1300px) {
    flex-direction: column;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    animation: slideInFromRight 0.3s ease-out;
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

const VideoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-y: auto;

  @media (max-width: 1300px) {
    flex: none;
    overflow: visible;
  }
`;

/* ============================
   CUSTOM VIDEO PLAYER
   ============================ */
const VideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  overflow: hidden;

  &:fullscreen {
    aspect-ratio: auto;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const YouTubeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  /* Transparent overlay to block right-click on iframe */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 60px; /* Leave bottom area for YouTube controls */
    z-index: 1;
    pointer-events: none;
  }

  /* Prevent text/element selection */
  user-select: none;
  -webkit-user-select: none;
`;

const YouTubeIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 30%,
    transparent 70%,
    rgba(0, 0, 0, 0.4) 100%
  );
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: ${(props) => (props.isYoutube ? "none" : "auto")};
`;

const TopBar = styled.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopBarTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  pointer-events: ${(props) => (props.isYoutube ? "none" : "auto")};
`;

const CenterPlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(88, 101, 242, 0.8);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${(props) => (props.visible && !props.isYoutube ? 1 : 0)};
  pointer-events: ${(props) =>
    props.visible && !props.isYoutube ? "auto" : "none"};
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(88, 101, 242, 0.5);

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: rgba(88, 101, 242, 1);
  }
`;

const ControlsBar = styled.div`
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: height 0.15s ease;

  &:hover {
    height: 6px;
  }
`;

const ProgressFilled = styled.div`
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
  position: relative;
  transition: width 0.1s linear;

  &::after {
    content: "";
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    box-shadow: 0 0 4px rgba(88, 101, 242, 0.5);
    opacity: 0;
    transition: opacity 0.15s;
  }

  ${ProgressContainer}:hover &::after {
    opacity: 1;
  }
`;

const BufferedProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ControlButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.1);
  }
`;

const TimeDisplay = styled.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  user-select: none;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VolumeSlider = styled.input`
  width: 0;
  opacity: 0;
  transition: all 0.3s ease;
  accent-color: var(--primary-color);
  cursor: pointer;
  height: 4px;

  ${VolumeContainer}:hover & {
    width: 70px;
    opacity: 1;
  }
`;

/* ============================
   VIDEO INFO SECTION
   ============================ */
const VideoInfo = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`;

const VideoTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const VideoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-muted-color);
`;

const ViewCount = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-secondary-color);
  font-weight: 500;
`;

/* ============================
   ENROLLMENT & ADMIN
   ============================ */
const EnrollmentSection = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;
`;

const EnrollmentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MemberAvatars = styled.div`
  display: flex;
  align-items: center;
`;

const MiniAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${(props) => props.bg || "var(--primary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: 700;
  border: 2px solid var(--background-color);
  margin-left: ${(props) => (props.index > 0 ? "-8px" : "0")};
  position: relative;
  z-index: ${(props) => 10 - (props.index || 0)};
`;

const MemberCountBadge = styled.div`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EnrollButton = styled.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;

  ${(props) => {
    switch (props.variant) {
      case "enroll":
        return `
          background: var(--primary-color);
          color: white;
          box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);
          &:hover { box-shadow: 0 4px 14px rgba(88, 101, 242, 0.5); transform: translateY(-1px); }
        `;
      case "pending":
        return `
          background: rgba(250, 166, 26, 0.15);
          color: var(--warning-color);
          cursor: default;
        `;
      case "enrolled":
        return `
          background: rgba(67, 181, 129, 0.15);
          color: var(--success-color);
          cursor: default;
        `;
      case "admin":
        return `
          background: rgba(88, 101, 242, 0.15);
          color: var(--primary-color);
          cursor: pointer;
          &:hover { background: rgba(88, 101, 242, 0.25); }
        `;
      default:
        return `background: var(--input-color); color: var(--text-color);`;
    }
  }}
`;

/* Admin Members Panel */
const AdminPanel = styled.div`
  background: var(--secondary-color);
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
  max-height: ${(props) => (props.open ? "400px" : "0")};
  transition: max-height 0.3s ease;
  flex-shrink: 0;
`;

const AdminPanelInner = styled.div`
  padding: 16px 24px;
`;

const AdminSectionTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted-color);
  margin-bottom: 12px;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  gap: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`;

const MemberAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
`;

const MemberStatus = styled.div`
  font-size: 12px;
  color: ${(props) =>
    props.pending ? "var(--warning-color)" : "var(--success-color)"};
`;

const MemberActions = styled.div`
  display: flex;
  gap: 6px;
`;

const ActionBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  ${(props) =>
    props.approve
      ? `
    background: rgba(67, 181, 129, 0.15);
    color: var(--success-color);
    &:hover { background: rgba(67, 181, 129, 0.3); }
  `
      : `
    background: rgba(240, 71, 71, 0.15);
    color: var(--danger-color);
    &:hover { background: rgba(240, 71, 71, 0.3); }
  `}
`;

/* Locked Course View */
const LockedView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  gap: 16px;
`;

const LockedIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

/* ============================
   PLAYLIST PANEL (Right Side)
   ============================ */
const PlaylistPanel = styled.div`
  width: 380px;
  height: 100vh;
  background-color: var(--secondary-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 1300px) {
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 1px solid var(--border-color);
    flex: none;
  }
`;

const PlaylistHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const PlaylistTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`;

const MobileBackBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 4px;
  margin-right: 8px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PlaylistActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlaylistCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted-color);
  background: var(--input-color);
  padding: 2px 8px;
  border-radius: 10px;
`;

const AddLessonBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const PlaylistToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 4px;

  @media (max-width: 1300px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const LessonList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;

  @media (max-width: 1300px) {
    max-height: ${(props) => (props.collapsed ? "0" : "500px")};
    overflow: ${(props) => (props.collapsed ? "hidden" : "auto")};
    transition: max-height 0.3s ease;
  }
`;

const LessonItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;

  &:hover {
    background-color: var(--hover-color);
  }

  ${(props) =>
    props.active &&
    `
    background-color: var(--active-color);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--primary-color);
      border-radius: 0 2px 2px 0;
    }
  `}
`;

const LessonNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;

  ${(props) =>
    props.active
      ? `
    background: var(--primary-color);
    color: white;
    box-shadow: 0 2px 8px rgba(88, 101, 242, 0.4);
  `
      : `
    background: var(--input-color);
    color: var(--text-secondary-color);
  `}
`;

const LessonInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const LessonTitle = styled.div`
  font-size: 14px;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  color: ${(props) =>
    props.active ? "var(--text-color)" : "var(--text-secondary-color)"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
`;

const LessonMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted-color);
`;

const LessonMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const DeleteLessonBtn = styled.button`
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 6px;
  background: none;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.15s;

  ${LessonItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(240, 71, 71, 0.15);
    color: var(--danger-color);
  }
`;

const EmptyLessons = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 14px;
`;

/* ============================
   NO COURSE SELECTED
   ============================ */
const NoCourseSelected = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary-color);
  gap: 16px;
  padding: 40px;
  text-align: center;
`;

const NoCourseIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #7c8cf8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(88, 101, 242, 0.3);
`;

const NoCourseTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
`;

const NoCourseText = styled.p`
  font-size: 14px;
  color: var(--text-muted-color);
  max-width: 300px;
  line-height: 1.5;
`;

/* ============================
   COMMENTS SECTION
   ============================ */
const CommentsSection = styled.div`
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
`;

const CommentsSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const CommentsTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentsCount = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted-color);
`;

const MinimapCommentsBox = styled.div`
  background: var(--input-color);
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: var(--hover-color);
  }
`;

const TopCommentPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TopCommentText = styled.span`
  font-size: 13px;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CommentInputArea = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: flex-start;
`;

const CommentAvatar = styled.div`
  width: ${(props) => (props.small ? "28px" : "36px")};
  height: ${(props) => (props.small ? "28px" : "36px")};
  border-radius: 50%;
  background: ${(props) =>
    props.isAdmin
      ? "var(--primary-color)"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${(props) => (props.small ? "10px" : "13px")};
  font-weight: 700;
  flex-shrink: 0;
`;

const CommentInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid transparent;
  border-radius: 20px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
    background-color: var(--secondary-color);
  }
`;

const CommentInputActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const CommentBtn = styled.button`
  padding: 6px 16px;
  border-radius: 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${(props) =>
    props.primary
      ? `
    background: var(--primary-color);
    color: white;
    &:hover { opacity: 0.9; }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
  `
      : `
    background: transparent;
    color: var(--text-secondary-color);
    &:hover { color: var(--text-color); }
  `}
`;

const CommentThread = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const CommentBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const CommentAuthor = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) =>
    props.isAdmin ? "var(--primary-color)" : "var(--text-color)"};
`;

const AdminBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(88, 101, 242, 0.15);
  color: var(--primary-color);
`;

const CommentTime = styled.span`
  font-size: 12px;
  color: var(--text-muted-color);
`;

const CommentText = styled.p`
  font-size: 14px;
  color: var(--text-secondary-color);
  line-height: 1.5;
  margin-bottom: 6px;
  word-break: break-word;
`;

const ReplyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted-color);
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 12px;
  transition: all 0.15s;

  &:hover {
    color: var(--primary-color);
    background: rgba(88, 101, 242, 0.08);
  }
`;

const RepliesContainer = styled.div`
  margin-left: 48px;
  margin-top: 12px;
  padding-left: 16px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ReplyInputArea = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: 48px;
  margin-top: 8px;
`;

const ReplyInput = styled.input`
  flex: 1;
  padding: 8px 14px;
  background-color: var(--input-color);
  border: 1px solid transparent;
  border-radius: 18px;
  color: var(--text-color);
  font-size: 13px;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`;

const SendBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

const NoComments = styled.div`
  text-align: center;
  padding: 20px;
  color: var(--text-muted-color);
  font-size: 14px;
`;

const ShowAllCommentsBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary-color);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  margin-top: 4px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }
`;

const LockedLessonTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted-color);
  font-style: italic;
`;

/* ============================
   HELPER FUNCTIONS
   ============================ */
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0)
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatViews(views) {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
  if (views >= 1000) return (views / 1000).toFixed(1) + "K";
  return views.toString();
}

function formatCommentTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  if (isNaN(diff)) return "Noma'lum vaqt"; // Fallback for invalid dates

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Hozirgina";
  if (minutes < 60) return `${minutes} daqiqa oldin`;
  if (hours < 24) return `${hours} soat oldin`;
  if (days < 30) return `${days} kun oldin`;
  return date.toLocaleDateString("uz-UZ");
}

/* ============================
   MAIN COMPONENT
   ============================ */
const CoursePlayer = ({ courseId, initialLessonSlug, onClose }) => {
  const navigate = useNavigate();
  const { createChat } = useChats();
  const token = useAuthStore((s) => s.token);
  const {
    courses,
    currentUser,
    isAdmin,
    isEnrolled,
    enrollInCourse,
    approveUser,
    removeUser,
    incrementViews,
    removeLesson,
    getLessonComments,
    addComment,
    addReply,
    joinCourseRoom,
    leaveCourseRoom,
  } = useCourses();

  const [activeLesson, setActiveLesson] = useState(0);
  const [playlistCollapsed, setPlaylistCollapsed] = useState(false);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [paginatedComments, setPaginatedComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsHasMore, setCommentsHasMore] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [isDeletingLesson, setIsDeletingLesson] = useState(false);

  // Video player state
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackError, setPlaybackError] = useState(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [hasCountedView, setHasCountedView] = useState(false);
  const hideControlsTimer = useRef(null);
  // Secure streaming state
  const [blobUrl, setBlobUrl] = useState(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  // Player enhancements
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverX, setHoverX] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  const course = courses.find(
    (c) =>
      c._id === courseId ||
      c.urlSlug === courseId ||
      String(c.id) === String(courseId),
  );
  const lessons = course?.lessons || [];
  const currentLesson = lessons[activeLesson] || null;

  const fetchComments = useCallback(
    async (page = 1) => {
      if (!courseId || !currentLesson?._id) return;
      try {
        if (page === 1) setIsLoadingComments(true);
        const res = await getLessonComments(
          courseId,
          currentLesson._id,
          page,
          10,
        );
        const newComments = res.data || [];
        const totalPages = res.totalPages || 1;

        setPaginatedComments((prev) =>
          page === 1 ? newComments : [...prev, ...newComments],
        );
        setCommentsPage(page);
        setCommentsHasMore(page < totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        if (page === 1) setIsLoadingComments(false);
      }
    },
    [courseId, currentLesson?._id, getLessonComments],
  );

  useEffect(() => {
    if (commentsExpanded) {
      fetchComments(1);
    }
  }, [currentLesson?._id, commentsExpanded, fetchComments]);

  const enrollmentStatus = isEnrolled(courseId);
  const admin = course ? isAdmin(courseId) : false;
  console.log(admin);

  const currentUserId = currentUser?._id || currentUser?.id;
  const isOwner = course?.createdBy?._id === currentUserId;

  const handleDeleteLessonConfirm = async () => {
    if (!lessonToDelete) return;
    try {
      setIsDeletingLesson(true);
      await removeLesson(courseId, lessonToDelete);
      if (activeLesson >= course.lessons.length - 1 && activeLesson > 0) {
        setActiveLesson(activeLesson - 1);
      }
      setLessonToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("Darsni o'chirishda xatolik yuz berdi");
    } finally {
      setIsDeletingLesson(false);
    }
  };

  // React to initial URL parameter for direct lesson links
  useEffect(() => {
    if (course && initialLessonSlug) {
      const idx = course.lessons.findIndex(
        (l) =>
          l.urlSlug === initialLessonSlug ||
          String(l._id) === initialLessonSlug ||
          String(l.id) === initialLessonSlug,
      );
      if (idx !== -1 && idx !== activeLesson) {
        setActiveLesson(idx);
      }
    }
  }, [course, initialLessonSlug]); // Intentionally not including activeLesson to avoid infinite loops if it changes via UI
  const myMemberRecord = course?.members?.find((m) => {
    const memId = m.userId?._id || m.userId || m._id || m.id;
    return memId === currentUserId;
  });

  const enrollStatus = myMemberRecord ? myMemberRecord.status : "none";
  const canAccessLessons = isOwner || enrollStatus === "approved" || admin;
  const canAccessLesson = useCallback(
    (index) => canAccessLessons || index === 0,
    [canAccessLessons],
  );

  // Reset state when course changes
  useEffect(() => {
    setActiveLesson(0);
    setPlaylistCollapsed(false);
    setIsAdminPanelOpen(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setHasCountedView(false);
  }, [courseId]);

  const isPreviewMode = !canAccessLessons && activeLesson === 0;

  // Track views — fire once per lesson per session, after 10 seconds
  const viewedLessonsRef = useRef(new Set());

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);

    const lessonId = currentLesson?._id || currentLesson?.id;
    if (
      !courseId ||
      !lessonId ||
      !canAccessLesson(activeLesson) ||
      viewedLessonsRef.current.has(lessonId)
    ) {
      return;
    }

    // Track views after 10 seconds of being on the lesson
    const viewTimer = setTimeout(() => {
      incrementViews(courseId, lessonId);
      viewedLessonsRef.current.add(lessonId);
    }, 10000);

    return () => clearTimeout(viewTimer);
  }, [activeLesson, courseId, currentLesson, canAccessLesson, incrementViews]);

  // Video player handlers
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    setPlaybackError(null);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name === "NotSupportedError") {
            setPlaybackError(
              "Bu video formatini brauzeringiz qo'llab-quvvatlamaydi (masalan .mov bevosita Chrome'da ishlamasligi mumkin).",
            );
          } else {
            console.error("Playback error:", error);
            setPlaybackError("Videoni ishga tushirishda xatolik yuz berdi.");
          }
          setIsPlaying(false);
        });
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);

    // Update buffered
    const video = videoRef.current;
    if (video.buffered.length > 0) {
      setBuffered(
        (video.buffered.end(video.buffered.length - 1) / video.duration) * 100,
      );
    }
  }, []);

  const handleDuration = useCallback((duration) => {
    setDuration(duration);
  }, []);

  const handleSeek = useCallback(
    (e) => {
      if (!videoRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    },
    [duration],
  );

  const handleVolumeChange = useCallback((e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    setIsMuted(val === 0);
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const toggleFullscreen = useCallback(() => {
    if (!videoWrapperRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      videoWrapperRef.current.requestFullscreen();
      setIsFullscreen(true);
    }
  }, []);

  const skipForward = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime += 10;
  }, []);

  const skipBackward = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime -= 10;
  }, []);

  const handleSpeedChange = useCallback((speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setShowSettings(false);
  }, []);

  const handleProgressHover = useCallback(
    (e) => {
      if (!duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      setHoverTime(percent * duration);
      setHoverX(e.clientX - rect.left);
    },
    [duration],
  );

  const showControlsHandler = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  // Keyboard shortcuts (placed here so togglePlay/toggleFullscreen/toggleMute are already defined)
  useEffect(() => {
    const handleKey = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          if (videoRef.current) videoRef.current.currentTime += 10;
          break;
        case "ArrowLeft":
          if (videoRef.current) videoRef.current.currentTime -= 10;
          break;
        case "ArrowUp":
          e.preventDefault();
          if (videoRef.current) {
            const newVol = Math.min(1, (videoRef.current.volume || 0) + 0.1);
            videoRef.current.volume = newVol;
            setVolume(newVol);
            setIsMuted(false);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (videoRef.current) {
            const newVol = Math.max(0, (videoRef.current.volume || 0) - 0.1);
            videoRef.current.volume = newVol;
            setVolume(newVol);
            setIsMuted(newVol === 0);
          }
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [togglePlay, toggleFullscreen, toggleMute]);

  const handleLessonClick = (index) => {
    setActiveLesson(index);
    const lessonData = course.lessons[index];
    if (lessonData) {
      const lessonSlug = lessonData.urlSlug || lessonData._id || lessonData.id;
      const courseSlug = course.urlSlug || course._id || course.id;
      // Update URL without full page reload
      window.history.replaceState(
        null,
        "",
        `/courses/${courseSlug}/${lessonSlug}`,
      );
    }
  };

  const playNextLesson = useCallback(() => {
    if (course && activeLesson < course.lessons.length - 1) {
      setActiveLesson((prev) => prev + 1);
    }
  }, [course, activeLesson]);

  // Derived values needed for Blob URL useEffect (must be before early return)
  const currentLessonData = course?.lessons?.[activeLesson];
  const isYouTube = currentLessonData?.videoUrl?.includes("youtu");
  const isLocalVideo = currentLessonData?.type === "file";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const lessonIdentifier =
    currentLessonData?.urlSlug ||
    currentLessonData?._id ||
    currentLessonData?.id;
  const streamEndpointUrl = `${API_URL}/courses/${courseId}/lessons/${lessonIdentifier}/stream`;

  // Secure Blob URL: fetch with Authorization header so token is never in the DOM
  // This MUST live before any early returns to satisfy React's rules of hooks.
  useEffect(() => {
    if (!isLocalVideo || !lessonIdentifier || !canAccessLesson(activeLesson)) {
      setBlobUrl(null);
      return;
    }
    let objectUrl = null;
    const controller = new AbortController();
    const fetchVideo = async () => {
      setIsLoadingVideo(true);
      setBlobUrl(null);
      setPlaybackError(null);
      try {
        const res = await fetch(streamEndpointUrl, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`Stream error: ${res.status}`);
        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
      } catch (err) {
        if (err.name !== "AbortError") {
          setPlaybackError("Videoni yuklab olishda xatolik yuz berdi.");
        }
      } finally {
        setIsLoadingVideo(false);
      }
    };
    fetchVideo();
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [lessonIdentifier, activeLesson, isLocalVideo, token, streamEndpointUrl]);

  if (!course) {
    return (
      <NoCourseSelected>
        <NoCourseIcon>
          <BookOpen size={36} color="white" />
        </NoCourseIcon>
        <NoCourseTitle>Kursni tanlang</NoCourseTitle>
        <NoCourseText>
          Chap tarafdagi ro'yxatdan kursni tanlang yoki yangi kurs yarating.
        </NoCourseText>
      </NoCourseSelected>
    );
  }

  const approvedMembers = course.members.filter((m) => m.status === "approved");
  const pendingMembers = course.members.filter((m) => m.status === "pending");

  // Extract YouTube video ID from various URL formats
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = isYouTube ? getYouTubeId(currentLessonData.videoUrl) : null;

  return (
    <>
      <PlayerContainer>
        <VideoSection>
          {/* VIDEO PLAYER */}
          {canAccessLesson(activeLesson) && currentLessonData ? (
            <>
              {isYouTube && youtubeId ? (
                /* YouTube Video */
                <VideoWrapper ref={videoWrapperRef}>
                  <YouTubeIframe
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={currentLessonData.title}
                  />
                  {/* Overlay just to provide mobile back button if youtube hides controls */}
                  <VideoOverlay
                    visible={true}
                    style={{ pointerEvents: "none", background: "transparent" }}
                  >
                    <TopBar>
                      <MobileBackBtn
                        onClick={() => onClose()}
                        style={{
                          pointerEvents: "auto",
                          color: "white",
                          background: "rgba(0,0,0,0.5)",
                          borderRadius: "50%",
                          padding: "8px",
                        }}
                      >
                        <ArrowLeft size={20} />
                      </MobileBackBtn>
                    </TopBar>
                  </VideoOverlay>
                </VideoWrapper>
              ) : (
                /* Regular Video - use HTML5 video player */
                <VideoWrapper
                  ref={videoWrapperRef}
                  onMouseMove={showControlsHandler}
                  onMouseLeave={() => {
                    if (isPlaying) setShowControls(false);
                  }}
                  onClick={togglePlay}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {/* Buffering Spinner */}
                  {(isLoadingVideo || isBuffering) && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        background: "rgba(0,0,0,0.3)",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          border: "4px solid rgba(255,255,255,0.2)",
                          borderTop: "4px solid var(--primary-color)",
                          borderRadius: "50%",
                          animation: "spin 0.9s linear infinite",
                        }}
                      />
                      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                  )}
                  <StyledVideo
                    ref={videoRef}
                    src={
                      isLocalVideo
                        ? blobUrl || undefined
                        : currentLessonData.videoUrl
                    }
                    controlsList="nodownload"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onWaiting={() => setIsBuffering(true)}
                    onCanPlay={() => setIsBuffering(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        setDuration(videoRef.current.duration);
                        videoRef.current.playbackRate = playbackSpeed;
                      }
                    }}
                    onError={(e) => {
                      if (!isLoadingVideo)
                        setPlaybackError(
                          "Videoni ishga tushirishda xatolik yuz berdi.",
                        );
                    }}
                    onEnded={playNextLesson}
                    style={{ userSelect: "none", WebkitUserSelect: "none" }}
                  />

                  {/* Error Overlay */}
                  {playbackError && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0, 0, 0, 0.8)",
                        color: "#ef4444",
                        padding: "20px",
                        textAlign: "center",
                        zIndex: 20,
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <AlertCircle size={48} />
                      <p
                        style={{
                          fontWeight: 600,
                          maxWidth: "400px",
                          lineHeight: 1.5,
                        }}
                      >
                        {playbackError}
                      </p>
                    </div>
                  )}

                  {/* Center play button when paused */}
                  <CenterPlayButton
                    visible={!isPlaying && !playbackError}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                  >
                    <Play size={32} fill="white" color="white" />
                  </CenterPlayButton>

                  {/* Controls overlay */}
                  <VideoOverlay
                    visible={showControls || !isPlaying}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TopBar>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <MobileBackBtn
                          onClick={() => onClose()}
                          style={{ color: "white" }}
                        >
                          <ArrowLeft size={20} />
                        </MobileBackBtn>
                        <TopBarTitle>{currentLessonData.title}</TopBarTitle>
                      </div>
                    </TopBar>

                    <ControlsBar>
                      <ProgressContainer
                        onMouseMove={(e) => {
                          handleProgressHover(e);
                          e.stopPropagation();
                        }}
                        onMouseLeave={() => setHoverTime(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSeek(e);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <BufferedProgress style={{ width: `${buffered}%` }} />
                        <ProgressFilled
                          style={{
                            width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                          }}
                        />
                        {/* Hover time tooltip */}
                        {hoverTime !== null && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "14px",
                              left: hoverX,
                              transform: "translateX(-50%)",
                              background: "rgba(0,0,0,0.85)",
                              color: "white",
                              fontSize: "11px",
                              fontWeight: 600,
                              padding: "3px 7px",
                              borderRadius: "4px",
                              whiteSpace: "nowrap",
                              pointerEvents: "none",
                              zIndex: 20,
                              letterSpacing: "0.5px",
                            }}
                          >
                            {formatTime(hoverTime)}
                          </div>
                        )}
                      </ProgressContainer>

                      <ControlsRow>
                        <ControlsLeft>
                          <ControlButton onClick={togglePlay}>
                            {isPlaying ? (
                              <Pause size={20} />
                            ) : (
                              <Play size={20} fill="white" />
                            )}
                          </ControlButton>
                          <ControlButton onClick={skipBackward} title="-10s">
                            <SkipBack size={18} />
                          </ControlButton>
                          <ControlButton onClick={skipForward} title="+10s">
                            <SkipForward size={18} />
                          </ControlButton>
                          <VolumeContainer>
                            <ControlButton onClick={toggleMute}>
                              {isMuted ? (
                                <VolumeX size={18} />
                              ) : (
                                <Volume2 size={18} />
                              )}
                            </ControlButton>
                            <VolumeSlider
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                            />
                          </VolumeContainer>
                          <TimeDisplay>
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </TimeDisplay>
                        </ControlsLeft>
                        <ControlsRight>
                          {/* Speed Selector */}
                          <div
                            style={{ position: "relative" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ControlButton
                              title="Tezlik"
                              onClick={() => setShowSettings((v) => !v)}
                              style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                width: "auto",
                                padding: "0 8px",
                                borderRadius: "4px",
                                border: showSettings
                                  ? "1px solid var(--primary-color)"
                                  : "1px solid rgba(255,255,255,0.2)",
                                color:
                                  playbackSpeed !== 1
                                    ? "var(--primary-color)"
                                    : "white",
                              }}
                            >
                              {playbackSpeed}x
                            </ControlButton>
                            {showSettings && (
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: "44px",
                                  right: 0,
                                  background: "rgba(15,15,20,0.97)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                  minWidth: "110px",
                                  boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                                  zIndex: 50,
                                }}
                              >
                                <div
                                  style={{
                                    padding: "8px 12px",
                                    fontSize: "11px",
                                    color: "rgba(255,255,255,0.5)",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    borderBottom:
                                      "1px solid rgba(255,255,255,0.08)",
                                  }}
                                >
                                  Tezlik
                                </div>
                                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                                  <div
                                    key={speed}
                                    onClick={() => handleSpeedChange(speed)}
                                    style={{
                                      padding: "9px 16px",
                                      fontSize: "13px",
                                      cursor: "pointer",
                                      color:
                                        playbackSpeed === speed
                                          ? "var(--primary-color)"
                                          : "white",
                                      fontWeight:
                                        playbackSpeed === speed ? 700 : 400,
                                      background:
                                        playbackSpeed === speed
                                          ? "rgba(88,101,242,0.1)"
                                          : "transparent",
                                      transition: "background 0.15s",
                                    }}
                                    onMouseEnter={(e) =>
                                      (e.currentTarget.style.background =
                                        "rgba(255,255,255,0.06)")
                                    }
                                    onMouseLeave={(e) =>
                                      (e.currentTarget.style.background =
                                        playbackSpeed === speed
                                          ? "rgba(88,101,242,0.1)"
                                          : "transparent")
                                    }
                                  >
                                    {speed === 1 ? "Oddiy (1x)" : `${speed}x`}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <ControlButton onClick={toggleFullscreen}>
                            {isFullscreen ? (
                              <Minimize size={18} />
                            ) : (
                              <Maximize size={18} />
                            )}
                          </ControlButton>
                        </ControlsRight>
                      </ControlsRow>
                    </ControlsBar>
                  </VideoOverlay>
                </VideoWrapper>
              )}

              {/* Video info */}
              <VideoInfo>
                <VideoTitle>
                  {activeLesson + 1}-dars: {currentLessonData.title}
                </VideoTitle>
                <VideoMeta>
                  <ViewCount>
                    <Eye size={14} />
                    {formatViews(currentLessonData.views)} ko'rish
                  </ViewCount>
                  <MetaItem>
                    <BookOpen size={14} />
                    {course.name}
                  </MetaItem>
                </VideoMeta>
              </VideoInfo>

              {/* COMMENTS SECTION */}
              <CommentsSection>
                <CommentsSectionHeader>
                  <CommentsTitle>Izohlar</CommentsTitle>
                  <CommentsCount>
                    {currentLessonData.comments?.length || 0}
                  </CommentsCount>
                </CommentsSectionHeader>

                {/* Minimalist Comments Box */}
                {!commentsExpanded ? (
                  <MinimapCommentsBox onClick={() => setCommentsExpanded(true)}>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted-color)",
                      }}
                    >
                      Izoh yozing...
                    </div>
                  </MinimapCommentsBox>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 16,
                      }}
                    >
                      <button
                        onClick={() => setCommentsExpanded(false)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--text-secondary-color)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        <ChevronUp size={16} /> Yig'ish
                      </button>
                    </div>

                    {/* Comment input */}
                    <CommentInputArea>
                      <CommentAvatar isAdmin={admin}>
                        {currentUser.avatar?.length > 1 ? (
                          <img
                            src={currentUser.avatar}
                            alt="avatar"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          (currentUser.name || "?").charAt(0)
                        )}
                      </CommentAvatar>
                      <CommentInputWrapper>
                        <CommentInput
                          placeholder="Izoh qoldiring..."
                          value={commentText}
                          onChange={(e) => {
                            setCommentText(e.target.value);
                            if (!showCommentInput && e.target.value)
                              setShowCommentInput(true);
                          }}
                          onFocus={() => setShowCommentInput(true)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && commentText.trim()) {
                              addComment(
                                courseId,
                                currentLessonData._id,
                                commentText.trim(),
                              );
                              setCommentText("");
                              setShowCommentInput(false);
                            }
                          }}
                        />
                        {showCommentInput && (
                          <CommentInputActions>
                            <CommentBtn
                              onClick={() => {
                                setShowCommentInput(false);
                                setCommentText("");
                              }}
                            >
                              Bekor qilish
                            </CommentBtn>
                            <CommentBtn
                              primary
                              disabled={!commentText.trim()}
                              onClick={() => {
                                if (!commentText.trim()) return;
                                addComment(
                                  courseId,
                                  currentLessonData._id,
                                  commentText.trim(),
                                ).then(() => fetchComments(1));
                                setCommentText("");
                                setShowCommentInput(false);
                              }}
                            >
                              Yuborish
                            </CommentBtn>
                          </CommentInputActions>
                        )}
                      </CommentInputWrapper>
                    </CommentInputArea>

                    {/* Comments List */}
                    <InfiniteScroll
                      dataLength={paginatedComments.length}
                      next={() => fetchComments(commentsPage + 1)}
                      hasMore={commentsHasMore}
                      loader={
                        <div
                          style={{
                            textAlign: "center",
                            padding: "10px",
                            color: "var(--text-muted-color)",
                            fontSize: "12px",
                          }}
                        >
                          Yuklanmoqda...
                        </div>
                      }
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        paddingBottom: "32px",
                      }}
                      scrollableTarget={
                        null
                      } /* Usually CoursePlayer has window scroll or container scroll, adjust if needed */
                    >
                      {paginatedComments.map((comment) => (
                        <CommentThread key={comment._id}>
                          <CommentItem>
                            <CommentAvatar
                              isAdmin={comment.userId === course.createdBy}
                            >
                              {comment.userAvatar?.length > 1 ? (
                                <img
                                  src={comment.userAvatar}
                                  alt="avatar"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                comment.userName.charAt(0)
                              )}
                            </CommentAvatar>
                            <CommentBody>
                              <CommentHeader>
                                <CommentAuthor
                                  isAdmin={comment.userId === course.createdBy}
                                >
                                  {comment.userName}
                                </CommentAuthor>
                                {comment.userId === course.createdBy && (
                                  <AdminBadge>Admin</AdminBadge>
                                )}
                                <CommentTime>
                                  {formatCommentTime(comment.createdAt)}
                                </CommentTime>
                              </CommentHeader>
                              <CommentText>{comment.text}</CommentText>
                              <ReplyButton
                                onClick={() =>
                                  setReplyingTo(
                                    replyingTo === comment._id
                                      ? null
                                      : comment._id,
                                  )
                                }
                              >
                                Javob berish
                              </ReplyButton>
                            </CommentBody>
                          </CommentItem>

                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <RepliesContainer>
                              {comment.replies.map((reply) => (
                                <CommentItem key={reply._id}>
                                  <CommentAvatar
                                    small
                                    isAdmin={reply.userId === course.createdBy}
                                  >
                                    {reply.userAvatar?.length > 1 ? (
                                      <img
                                        src={reply.userAvatar}
                                        alt="avatar"
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          borderRadius: "50%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    ) : (
                                      reply.userName.charAt(0)
                                    )}
                                  </CommentAvatar>
                                  <CommentBody>
                                    <CommentHeader>
                                      <CommentAuthor
                                        isAdmin={
                                          reply.userId === course.createdBy
                                        }
                                      >
                                        {reply.userName}
                                      </CommentAuthor>
                                      {reply.userId === course.createdBy && (
                                        <AdminBadge>Admin</AdminBadge>
                                      )}
                                      <CommentTime>
                                        {formatCommentTime(reply.createdAt)}
                                      </CommentTime>
                                    </CommentHeader>
                                    <CommentText>{reply.text}</CommentText>
                                  </CommentBody>
                                </CommentItem>
                              ))}
                            </RepliesContainer>
                          )}

                          {/* Reply input */}
                          {replyingTo === comment._id && (
                            <ReplyInputArea>
                              <CommentAvatar small isAdmin={admin}>
                                {currentUser.avatar?.length > 1 ? (
                                  <img
                                    src={currentUser.avatar}
                                    alt="avatar"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  (currentUser.name || "?").charAt(0)
                                )}
                              </CommentAvatar>
                              <ReplyInput
                                placeholder="Javob yozing..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && replyText.trim()) {
                                    addReply(
                                      courseId,
                                      currentLessonData._id,
                                      comment._id,
                                      replyText.trim(),
                                    ).then(() => fetchComments(1));
                                    setReplyText("");
                                    setReplyingTo(null);
                                  }
                                }}
                                autoFocus
                              />
                              <SendBtn
                                disabled={!replyText.trim()}
                                onClick={() => {
                                  if (!replyText.trim()) return;
                                  addReply(
                                    courseId,
                                    currentLessonData._id,
                                    comment._id,
                                    replyText.trim(),
                                  );
                                  setReplyText("");
                                  setReplyingTo(null);
                                }}
                              >
                                <Send size={14} />
                              </SendBtn>
                            </ReplyInputArea>
                          )}
                        </CommentThread>
                      ))}
                    </InfiniteScroll>
                  </>
                )}
              </CommentsSection>
            </>
          ) : canAccessLesson(activeLesson) && course.lessons.length === 0 ? (
            <LockedView>
              <LockedIcon>
                <ListVideo size={32} color="var(--text-muted-color)" />
              </LockedIcon>
              <h3 style={{ color: "var(--text-color)", fontWeight: 700 }}>
                Hali darslar qo'shilmagan
              </h3>
              <p style={{ color: "var(--text-muted-color)", fontSize: 14 }}>
                {admin
                  ? "O'ng tarafdagi + tugmasini bosib dars qo'shing."
                  : "Tez orada darslar qo'shiladi."}
              </p>
            </LockedView>
          ) : (
            <LockedView>
              <LockedIcon>
                {enrollStatus === "pending" ? (
                  <Clock size={32} color="var(--warning-color)" />
                ) : (
                  <LogIn size={32} color="var(--text-muted-color)" />
                )}
              </LockedIcon>
              <h3 style={{ color: "var(--text-color)", fontWeight: 700 }}>
                {enrollStatus === "pending"
                  ? "So'rov yuborildi"
                  : "Kursga yoziling"}
              </h3>
              <p
                style={{
                  color: "var(--text-muted-color)",
                  fontSize: 14,
                  maxWidth: 350,
                }}
              >
                {enrollStatus === "pending"
                  ? "Sizning so'rovingiz admin tomonidan ko'rib chiqilmoqda. Iltimos kuting."
                  : "Darslarni ko'rish uchun avval kursga yozilish kerak. Admin tasdiqlangandan keyin darslarni ko'rishingiz mumkin."}
              </p>
            </LockedView>
          )}

          {/* YouTube-like Author & Enrollment Section */}
          <EnrollmentSection
            style={{ padding: "12px 24px", borderBottom: "none" }}
          >
            <EnrollmentInfo>
              <MiniAvatar style={{ width: 40, height: 40, fontSize: 16 }}>
                {course?.createdBy?.avatar ? (
                  <img
                    src={course.createdBy.avatar}
                    alt="author"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  (
                    course?.createdBy?.name ||
                    course?.createdBy?.username ||
                    "?"
                  )
                    .charAt(0)
                    .toUpperCase()
                )}
              </MiniAvatar>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontWeight: 600,
                    color: "var(--text-color)",
                    fontSize: 15,
                  }}
                >
                  {course?.createdBy?.name ||
                    course?.createdBy?.username ||
                    "Muallif"}
                </span>
                <span
                  style={{ fontSize: 12, color: "var(--text-muted-color)" }}
                >
                  {course?.members?.length || 0} talaba
                </span>
              </div>
            </EnrollmentInfo>

            <div style={{ display: "flex", gap: "8px" }}>
              {admin ? (
                <EnrollButton
                  variant="admin"
                  onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
                  style={{ borderRadius: "20px", padding: "8px 16px" }}
                >
                  <Shield size={16} />
                  Boshqarish
                  {isAdminPanelOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </EnrollButton>
              ) : enrollStatus === "pending" ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <EnrollButton
                    variant="pending"
                    style={{ borderRadius: "20px" }}
                  >
                    <Clock size={16} />
                    Kutilmoqda
                  </EnrollButton>
                  <EnrollButton
                    variant="admin"
                    onClick={() =>
                      removeUser(courseId, currentUser?.id || currentUser?._id)
                    }
                    style={{ borderRadius: "20px" }}
                  >
                    Bekor qilish
                  </EnrollButton>
                </div>
              ) : enrollStatus === "approved" ? (
                <EnrollButton
                  variant="enrolled"
                  style={{ borderRadius: "20px" }}
                >
                  <CheckCircle size={16} />
                  Obuna bo'lingan
                </EnrollButton>
              ) : course?.accessType === "paid" && enrollStatus === "none" ? (
                <EnrollButton
                  variant="enroll"
                  style={{ borderRadius: "20px" }}
                  onClick={async () => {
                    try {
                      await enrollInCourse(courseId);
                      const authorId = course.createdBy._id || course.createdBy;
                      const chatRes = await createChat({
                        isGroup: false,
                        memberIds: [authorId],
                      });
                      if (chatRes) {
                        const slug =
                          chatRes.urlSlug ||
                          chatRes.jammId ||
                          chatRes._id ||
                          chatRes.id ||
                          chatRes;
                        navigate(`/a/${slug}`);
                      }
                    } catch (err) {
                      console.error(err);
                      toast.error("Xatolik yuz berdi: Chat yaratib bo'lmadi");
                    }
                  }}
                >
                  <UserPlus size={16} />
                  Sotib olish: {course?.price?.toLocaleString() || 0} so'm
                </EnrollButton>
              ) : enrollStatus === "none" ? (
                <EnrollButton
                  variant="enroll"
                  onClick={() => enrollInCourse(courseId)}
                  style={{ borderRadius: "20px" }}
                >
                  <UserPlus size={16} />
                  Obuna bo'lish {course?.price > 0 && `(${course.price})`}
                </EnrollButton>
              ) : null}
            </div>
          </EnrollmentSection>

          {/* Admin Members Panel */}
          {admin && (
            <AdminPanel open={isAdminPanelOpen}>
              <AdminPanelInner>
                {pendingMembers.length > 0 && (
                  <>
                    <AdminSectionTitle>
                      Kutayotganlar ({pendingMembers.length})
                    </AdminSectionTitle>
                    {pendingMembers.map((member) => (
                      <MemberRow key={member.userId || member._id || member.id}>
                        <MemberAvatar>
                          {member.avatar?.length > 1 ? (
                            <img
                              src={member.avatar}
                              alt="avatar"
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            member.name.charAt(0)
                          )}
                        </MemberAvatar>
                        <MemberInfo>
                          <MemberName>{member.name}</MemberName>
                          <MemberStatus pending>Kutmoqda</MemberStatus>
                        </MemberInfo>
                        <MemberActions>
                          <ActionBtn
                            approve
                            onClick={() =>
                              approveUser(
                                courseId,
                                member.userId || member._id || member.id,
                              )
                            }
                            title="Tasdiqlash"
                          >
                            <UserCheck size={16} />
                          </ActionBtn>
                          <ActionBtn
                            onClick={() =>
                              removeUser(
                                courseId,
                                member.userId || member._id || member.id,
                              )
                            }
                            title="Rad etish"
                          >
                            <UserX size={16} />
                          </ActionBtn>
                        </MemberActions>
                      </MemberRow>
                    ))}
                  </>
                )}
                <AdminSectionTitle
                  style={{ marginTop: pendingMembers.length > 0 ? 16 : 0 }}
                >
                  A'zolar ({approvedMembers.length})
                </AdminSectionTitle>
                {approvedMembers.length === 0 ? (
                  <div
                    style={{
                      color: "var(--text-muted-color)",
                      fontSize: 13,
                      padding: "8px 0",
                    }}
                  >
                    Hali a'zolar yo'q
                  </div>
                ) : (
                  approvedMembers.map((member) => (
                    <MemberRow key={member.userId || member._id || member.id}>
                      <MemberAvatar>
                        {member.avatar?.length > 1 ? (
                          <img
                            src={member.avatar}
                            alt="avatar"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </MemberAvatar>
                      <MemberInfo>
                        <MemberName>{member.name}</MemberName>
                        <MemberStatus>Tasdiqlangan</MemberStatus>
                      </MemberInfo>
                      <MemberActions>
                        <ActionBtn
                          onClick={() =>
                            removeUser(
                              courseId,
                              member.userId || member._id || member.id,
                            )
                          }
                          title="Chiqarish"
                        >
                          <UserX size={16} />
                        </ActionBtn>
                      </MemberActions>
                    </MemberRow>
                  ))
                )}
              </AdminPanelInner>
            </AdminPanel>
          )}
        </VideoSection>

        {/* PLAYLIST PANEL */}
        <PlaylistPanel>
          <PlaylistHeader>
            <PlaylistTitle>
              <MobileBackBtn onClick={() => onClose()}>
                <ArrowLeft size={20} />
              </MobileBackBtn>
              <ListVideo size={18} />
              Darslar
            </PlaylistTitle>
            <PlaylistActions>
              <PlaylistCount>{course.lessons.length} ta dars</PlaylistCount>
              {admin && (
                <AddLessonBtn
                  onClick={() => setIsAddLessonOpen(true)}
                  title="Dars qo'shish"
                >
                  <Plus size={16} />
                </AddLessonBtn>
              )}
              <PlaylistToggle
                onClick={() => setPlaylistCollapsed(!playlistCollapsed)}
              >
                {playlistCollapsed ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronUp size={20} />
                )}
              </PlaylistToggle>
            </PlaylistActions>
          </PlaylistHeader>

          <LessonList collapsed={playlistCollapsed}>
            {course.lessons.length === 0 ? (
              <EmptyLessons>
                {admin ? (
                  <>
                    Hali darslar yo'q.
                    <br />
                    <span style={{ fontSize: 12 }}>
                      + tugmasini bosib dars qo'shing
                    </span>
                  </>
                ) : (
                  "Hali darslar qo'shilmagan"
                )}
              </EmptyLessons>
            ) : (
              course.lessons.map((lesson, index) => (
                <LessonItem
                  key={lesson._id}
                  active={canAccessLesson(index) && activeLesson === index}
                  onClick={() =>
                    canAccessLesson(index) && handleLessonClick(index)
                  }
                  style={{
                    cursor: canAccessLesson(index) ? "pointer" : "default",
                  }}
                >
                  <LessonNumber
                    active={canAccessLesson(index) && activeLesson === index}
                  >
                    {canAccessLesson(index) && activeLesson === index ? (
                      <Play size={12} fill="white" />
                    ) : canAccessLesson(index) ? (
                      index + 1
                    ) : (
                      <Lock size={12} />
                    )}
                  </LessonNumber>
                  <LessonInfo>
                    {canAccessLesson(index) ? (
                      <>
                        <LessonTitle active={activeLesson === index}>
                          {lesson.title}
                          {index === 0 && !canAccessLessons && (
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "1px 6px",
                                borderRadius: 4,
                                background: "rgba(67, 181, 129, 0.15)",
                                color: "var(--success-color)",
                                marginLeft: 6,
                                verticalAlign: "middle",
                              }}
                            >
                              Bepul
                            </span>
                          )}
                        </LessonTitle>
                        <LessonMeta>
                          <LessonMetaItem>
                            <Eye size={11} />
                            {formatViews(lesson.views)}
                          </LessonMetaItem>
                        </LessonMeta>
                      </>
                    ) : (
                      <LockedLessonTitle>
                        <Lock size={12} />
                        {index + 1}-dars
                      </LockedLessonTitle>
                    )}
                  </LessonInfo>
                  {admin && (
                    <DeleteLessonBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        setLessonToDelete(lesson._id);
                      }}
                      title="O'chirish"
                    >
                      <Trash2 size={14} />
                    </DeleteLessonBtn>
                  )}
                </LessonItem>
              ))
            )}
          </LessonList>
        </PlaylistPanel>
      </PlayerContainer>

      <AddLessonDialog
        isOpen={isAddLessonOpen}
        onClose={() => setIsAddLessonOpen(false)}
        courseId={courseId}
        onCreated={(lessonId) => {
          setIsAddLessonOpen(false);
          setActiveLesson(course.lessons.length);
        }}
      />

      <ConfirmDialog
        isOpen={!!lessonToDelete}
        onClose={() => setLessonToDelete(null)}
        title="Darsni o'chirish"
        description="Rostdan ham bu darsni o'chirmoqchimisiz? Agar unga video biriktirilgan bo'lsa, u ham o'chib ketadi."
        confirmText={isDeletingLesson ? "O'chirilmoqda..." : "Ha, o'chirish"}
        cancelText="Beqor qilish"
        onConfirm={handleDeleteLessonConfirm}
        isDanger={true}
      />
    </>
  );
};

export default CoursePlayer;
