import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import toast from "react-hot-toast";
import { useArena } from "../../../contexts/ArenaContext";
import {
  Plus,
  PlayCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  RefreshCw,
  Link2,
  Users,
  LogOut,
  User,
  Download,
  Eye,
  X,
  Pencil,
  Trash2,
  MoreHorizontal,
  Undo2,
  Volume2,
  Star,
  Settings,
  Play,
  FolderOpen,
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateFlashcardDialog from "./CreateFlashcardDialog";
import useAuthStore from "../../../store/authStore";
import PremiumUpgradeModal from "../../../app/components/PremiumUpgradeModal";
import ArenaHeader from "./ArenaHeader";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";
import * as arenaApi from "../../../api/arenaApi";
import FlashcardReviewMode from "./FlashcardReviewMode";
import FlashcardClassicMode from "./FlashcardClassicMode";
import FlashcardTestMode from "./FlashcardTestMode";
import FlashcardGameMode from "./FlashcardGameMode";
import {
  FlashcardDeckViewDialog,
  FlashcardFolderViewDialog,
  FlashcardMembersDialog,
  FlashcardTrainingPickerDialog,
} from "./FlashcardDialogs";
import { APP_LIMITS, isPremiumUser } from "../../../constants/appLimits";
import { mobileFullscreenPane } from "../../../shared/styles/mobileSafeArea";

const FLASHCARD_PROMPT_SIDE_STORAGE_KEY = "jamm-flashcard-prompt-side-v1";

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    ${mobileFullscreenPane};
    z-index: 9999;
    background-color: var(--background-color);
    animation: ${(props) =>
      props.$disableEntryAnimation
        ? "none"
        : css`${slideInFromRight} 0.3s ease-out`};
    padding: ${(props) => (props.$fullscreen ? "0" : "20px")};
    overflow-y: ${(props) => (props.$fullscreen ? "hidden" : "auto")};
    overflow-x: hidden;
    box-sizing: border-box;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const classicExitRight = keyframes`
  from {
    transform: translate(-50%, -50%) translate3d(${(props) => props.$startX || 0}px, 0, 0) rotate(${(props) => (props.$startX || 0) / 16}deg) scale(1.02);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -50%) translate3d(160vw, 10vh, 0) rotate(35deg) scale(0.9);
    opacity: 0;
  }
`;

const classicExitLeft = keyframes`
  from {
    transform: translate(-50%, -50%) translate3d(${(props) => props.$startX || 0}px, 0, 0) rotate(${(props) => (props.$startX || 0) / 16}deg) scale(1.02);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -50%) translate3d(-160vw, 10vh, 0) rotate(-35deg) scale(0.9);
    opacity: 0;
  }
`;

const dialogIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeIn} 0.18s ease-out;
`;

const Dialog = styled.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  height: min(80vh, 720px);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${dialogIn} 0.22s ease-out;
`;

const DialogContent = styled.div`
  flex: 1;
  min-height: 0;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SettingsGrid = styled.div`
  display: grid;
  gap: 10px;
`;

const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`;

const DirectionSelect = styled.select`
  width: 100%;
  min-height: 42px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 12px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const CreateBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const FolderBar = styled.div`
  margin: 0 0 16px;
`;

const FolderScroller = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  min-width: 0;
  padding: 0 2px 4px;
`;

const FolderChip = styled.button`
  flex: 0 0 auto;
  min-height: 38px;
  max-width: 200px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--tertiary-color)"};
  color: ${(props) => (props.$active ? "#fff" : "var(--text-color)")};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

const FolderAddButton = styled.button`
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  position: sticky;
  right: 0;
  z-index: 1;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Card = styled.div`
  position: relative;
  z-index: ${(props) => (props.$raised ? 12 : 1)};
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    border-color: var(--text-muted-color);
    transform: translateY(-2px);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  color: var(--text-color);
`;

const CardMetaText = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;

const CardDesc = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`;

const CardHint = styled.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
`;

const skeletonPulse = keyframes`
  0% {
    opacity: 0.48;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.48;
  }
`;

const SkeletonCard = styled(Card)`
  cursor: default;
  pointer-events: none;

  &:hover {
    border-color: var(--border-color);
    transform: none;
  }
`;

const SkeletonBlock = styled.div`
  border-radius: ${(props) => props.$radius || "10px"};
  background: color-mix(in srgb, var(--text-muted-color) 12%, var(--secondary-color));
  height: ${(props) => props.$height || "14px"};
  width: ${(props) => props.$width || "100%"};
  animation: ${skeletonPulse} 1.1s ease-in-out infinite;
`;

const MenuWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const MenuButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MenuItem = styled.button`
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${(props) =>
    props.$danger ? "rgba(239, 68, 68, 0.08)" : "transparent"};
  color: ${(props) => (props.$danger ? "#ef4444" : "var(--text-color)")};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.$danger ? "rgba(239, 68, 68, 0.12)" : "var(--tertiary-color)"};
  }
`;

const DeckPreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding: 4px;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
  }
`;

const PreviewItem = styled.div`
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PreviewRow = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`;

const PreviewLabel = styled.span`
  color: var(--text-muted-color);
  min-width: 60px;
  font-weight: 500;
`;

const PreviewContent = styled.span`
  color: var(--text-color);
  word-break: break-word;
`;

const Meta = styled.div`
  font-size: 14px;
  color: var(--text-muted-color);
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
`;
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    color: var(--text-color);
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StudyBtn = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

// --- Study Mode Styles ---
const StudyArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  gap: 24px;
  box-sizing: border-box;
`;

const ModeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ModeCard = styled.button`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  &:hover {
    border-color: var(--text-muted-color);
    background: var(--tertiary-color);
  }
`;

const ModeTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const ModeDesc = styled.span`
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted-color);
`;

const FlashcardBox = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: var(--text-color);
  box-sizing: border-box;
`;

const BackBtn = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  &:hover {
    color: var(--text-color);
  }

  @media (max-width: 768px) {
    margin-top: calc(8px + env(safe-area-inset-top, 0px));
  }
`;

const RevealBtn = styled.button`
  padding: 12px 24px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: var(--border-color);
  }
`;

const Ratings = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RatingBtn = styled.button`
  flex: 1;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => {
      if (props.type === "fail") return "rgba(239, 68, 68, 0.35)";
      if (props.type === "hard") return "rgba(249, 115, 22, 0.35)";
      if (props.type === "good") return "rgba(59, 130, 246, 0.35)";
      if (props.type === "easy") return "rgba(34, 197, 94, 0.35)";
      return "var(--border-color)";
    }};
  background: ${(props) => {
    if (props.type === "fail") return "rgba(239, 68, 68, 0.12)";
    if (props.type === "hard") return "rgba(249, 115, 22, 0.12)";
    if (props.type === "good") return "rgba(59, 130, 246, 0.12)";
    if (props.type === "easy") return "rgba(34, 197, 94, 0.12)";
    return "var(--secondary-color)";
  }};
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.16s ease,
    filter 0.16s ease,
    background 0.16s ease;

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }
`;

const ClassicControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const ClassicActionBtn = styled.button`
  min-width: 52px;
  height: 46px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: ${(props) =>
    props.$variant === "fail"
      ? "rgba(239, 68, 68, 0.12)"
      : props.$variant === "success"
        ? "rgba(34, 197, 94, 0.12)"
        : "var(--secondary-color)"};
  color: ${(props) =>
    props.$variant === "fail"
      ? "#ef4444"
      : props.$variant === "success"
        ? "#22c55e"
        : "var(--text-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
  }
`;

const StudyMeta = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
`;

const ClassicDeckShell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ClassicFullscreenShell = styled.div`
  position: relative;
  width: min(100%, 1180px);
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  border-radius: 0;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: hidden;
  overscroll-behavior: none;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;
    margin: 0;
    border-radius: 0;
  }
`;

const ClassicTopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  min-height: 72px;

  @media (max-width: 768px) {
    padding: calc(12px + env(safe-area-inset-top, 0px)) 20px 12px;
    min-height: calc(68px + env(safe-area-inset-top, 0px));
  }
`;

const ClassicTopIconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--border-color) 76%, transparent);
  background: color-mix(in srgb, var(--secondary-color) 86%, transparent);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: color-mix(in srgb, var(--secondary-color) 86%, transparent);
    border-color: color-mix(in srgb, var(--text-muted-color) 32%, transparent);
    color: var(--text-color);
    transform: translateY(-1px);
  }
`;

const ClassicTopCounter = styled.div`
  text-align: center;
  font-size: 0;
  opacity: 0;
  pointer-events: none;
`;

const ClassicProgressTrack = styled.div`
  display: none;
`;

const ClassicProgressFill = styled.div`
  height: 100%;
  width: ${(props) => `${props.$progress}%`};
  background: color-mix(in srgb, var(--text-color) 82%, transparent);
  transition: width 0.22s ease;
`;

const ClassicViewport = styled.div`
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  padding: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  overscroll-behavior: none;

  @media (max-width: 768px) {
    height: var(--app-height, 100dvh);
  }
`;

const ClassicSummaryBar = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ClassicFloatingCounter = styled.div`
  display: none;
`;

const ClassicSummaryPill = styled.div`
  min-height: 52px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid
    ${(props) =>
      props.$tone === "success"
        ? "rgba(121, 241, 203, 0.34)"
        : props.$tone === "danger"
          ? "rgba(255, 164, 87, 0.34)"
          : "rgba(163, 176, 217, 0.22)"};
  background: ${(props) =>
    props.$tone === "success"
      ? "rgba(121, 241, 203, 0.1)"
      : props.$tone === "danger"
        ? "rgba(255, 164, 87, 0.1)"
        : "color-mix(in srgb, var(--text-color) 5%, transparent)"};
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 18px;
    font-weight: 800;
  }

  span {
    color: var(--text-muted-color);
    font-size: 12px;
    font-weight: 700;
  }
`;

const ClassicCardStage = styled.div`
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: 24px 20px 32px;
  margin: 0 auto;
  perspective: 1800px;
  perspective-origin: center center;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;

const ClassicGhostCard = styled.div`
  position: absolute;
  inset: 34px 18px 44px 18px;
  border-radius: 34px;
  background: color-mix(in srgb, var(--secondary-color) 88%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
  transform: translateX(${(props) => props.$offsetX || 0}px)
    translateY(${(props) => props.$offsetY || 0}px)
    rotate(${(props) => props.$rotate || 0}deg)
    scale(${(props) => props.$scale || 1});
  opacity: ${(props) => props.$opacity || 0.42};
  pointer-events: none;
  z-index: ${(props) => props.$zIndex || 1};
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
`;

const ClassicStackCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(360px, calc(100% - 48px));
  height: min(480px, calc(100% - 48px));
  max-height: min(520px, calc(100% - 48px));
  max-width: min(380px, calc(100% - 48px));
  border-radius: 32px;
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--secondary-color) 94%, var(--text-color) 6%) 0%,
    var(--secondary-color) 100%
  );
  border: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
  transform: translate(-50%, -50%)
             translate3d(${(props) => props.$offsetX || 0}px, ${(props) => props.$offsetY || 0}px, -100px)
             rotate(${(props) => props.$rotate || 0}deg)
             scale(${(props) => props.$scale || 1});
  opacity: ${(props) => props.$opacity || 1};
  z-index: ${(props) => props.$zIndex || 1};
  pointer-events: none;
  transition:
    transform 0.48s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.36s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);

  @media (max-width: 768px) {
    width: min(340px, calc(100% - 40px));
    height: min(440px, calc(100% - 40px));
    border-radius: 28px;
  }
`;

const classicCardSurfaceCss = css`
  border-radius: 44px;
  border: 1px solid color-mix(in srgb, var(--border-color) 76%, transparent);
  background: var(--secondary-color);
  box-shadow: none;
`;

const ClassicNextPreviewCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(360px, calc(100% - 48px));
  height: min(480px, calc(100% - 48px));
  max-height: min(520px, calc(100% - 48px));
  max-width: min(380px, calc(100% - 48px));
  border-radius: 32px;
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--secondary-color) 94%, var(--text-color) 6%) 0%,
    var(--secondary-color) 100%
  );
  border: 1px solid color-mix(in srgb, var(--border-color) 76%, transparent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  pointer-events: none;
  overflow: hidden;
  transform: translate(-50%, -50%)
    translate3d(${(props) => props.$offsetX || 0}px, ${(props) => props.$offsetY || 0}px, 0)
    rotate(${(props) => props.$rotate || 0}deg)
    scale(${(props) => props.$scale || 1});
  opacity: ${(props) => props.$opacity ?? 1};
  z-index: ${(props) => props.$zIndex || 4};
  transition:
    transform 0.48s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.36s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);

  @media (max-width: 768px) {
    width: min(340px, calc(100% - 40px));
    height: min(440px, calc(100% - 40px));
    border-radius: 28px;
    padding: 16px;
  }
`;

const ClassicNextPreviewWord = styled.div`
  max-width: 100%;
  font-size: clamp(32px, 6vw, 56px);
  line-height: 1.08;
  font-weight: 700;
  color: var(--text-color);
  text-align: center;
  word-break: break-word;
  letter-spacing: -0.02em;
  opacity: 0.85;
`;

const ClassicSwipeCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(360px, calc(100% - 48px));
  height: min(480px, calc(100% - 48px));
  max-height: min(520px, calc(100% - 48px));
  max-width: min(380px, calc(100% - 48px));
  border-radius: 32px;
  cursor: grab;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  backface-visibility: hidden;
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--secondary-color) 94%, var(--text-color) 6%) 0%,
    var(--secondary-color) 100%
  );
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.32);
  border: 1px solid color-mix(in srgb, var(--border-color) 76%, transparent);

  /* Transform – asosiy harakatlar uchun */
  transform: ${(props) => {
    if (props.$exiting) {
      if (props.$exitDirection === "left") {
        return `translate(-50%, -50%) translate3d(${props.$leftExitOffsetX || 58}px, ${props.$leftExitOffsetY || 74}px, ${props.$leftExitTranslateZ || -280}px) rotate(${props.$leftExitRotate || -5.2}deg) scale(${props.$leftExitScale || 0.99})`;
      }

      return `translate(-50%, -50%) translate3d(140vw, 6vh, 0) rotate(24deg) scale(0.92)`;
    }

    return `translate(-50%, -50%)
            translate3d(${props.$dragX || 0}px, 0, 0)
            rotate(${((props.$dragX || 0) / 26).toFixed(2)}deg)
            scale(${props.$dragging ? 1.008 : 1})`;
  }};

  opacity: ${(props) =>
    props.$exiting ? (props.$exitDirection === "left" ? 1 : 0) : 1};

  /* Transition ni juda ehtiyotkorlik bilan boshqaramiz */
  transition: ${(props) =>
    props.$dragging
      ? "none"                                                // drag paytida hech qanday transition bo‘lmasin
      : props.$exiting && props.$exitDirection === "left"
        ? "transform 0.56s cubic-bezier(0.18, 0.88, 0.24, 1), opacity 0.2s linear"
        : props.$exiting
          ? "transform 0.36s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease-out"
        : props.$isFirst
          ? "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease-out"
          : "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.18s linear"};

  /* Keyingi kartalarda faqat kirish animatsiyasini bloklaymiz, lekin chiqish va drag saqlanib qoladi */
  ${(props) =>
    !props.$isFirst &&
    !props.$exiting &&
    !props.$dragging &&
    css`
      transition: transform 0.35s ease, opacity 0.2s linear !important;
      animation: none !important;
    `}

  user-select: none;
  touch-action: none;
  overflow: hidden;
  pointer-events: ${(props) => (props.$exiting ? "none" : "auto")};
  z-index: ${(props) =>
    props.$exiting && props.$exitDirection === "left" ? 1 : 6};

  @media (max-width: 768px) {
    width: min(340px, calc(100% - 40px));
    height: min(440px, calc(100% - 40px));
    border-radius: 28px;
  }
`;
const ClassicOutgoingCard = styled(ClassicSwipeCard)`
  position: absolute;
  z-index: 8;
  pointer-events: none;
  animation: ${(props) =>
      props.$direction === "left" ? classicExitLeft : classicExitRight}
    0.5s cubic-bezier(0.25, 1, 0.5, 1) both;
`;

const ClassicFlipLayer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  will-change: transform;
  padding: 20px 18px 24px;
  border-radius: 32px;
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--secondary-color) 94%, var(--text-color) 6%) 0%,
    var(--secondary-color) 100%
  );
  transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
  transform: rotateY(${(props) => (props.$flipped ? 180 : 0)}deg) translateZ(0);
  border: 1px solid color-mix(in srgb, var(--border-color) 76%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--text-color) 6%, transparent);

  @media (max-width: 768px) {
    border-radius: 28px;
    padding: 18px 16px 20px;
  }
`;

const ClassicCardFace = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  padding: 16px 18px 20px;
  -webkit-transform-style: preserve-3d;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 14px 16px 18px;
  }
`;

const ClassicCardFront = styled(ClassicCardFace)`
  transform: rotateY(0deg) translateZ(1px);
`;

const ClassicCardBack = styled(ClassicCardFace)`
  transform: rotateY(180deg) translateZ(1px);
`;

const ClassicCardToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: auto;
  color: color-mix(in srgb, var(--text-color) 92%, transparent);
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 4;
  transform: translateZ(8px);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  padding: 4px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--text-color) 8%, transparent);

  @media (max-width: 768px) {
    top: 14px;
    left: 14px;
  }
`;

const ClassicCardToolbarSpacer = styled(ClassicCardToolbar)`
  position: relative;
  top: auto;
  left: auto;
  width: 100%;
  align-self: stretch;
  justify-content: flex-start;
  pointer-events: none;
`;

const ClassicToolbarIcon = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  touch-action: manipulation;
  transition: all 0.2s ease;

  &:hover {
    background: color-mix(in srgb, var(--text-color) 10%, transparent);
    color: var(--text-color);
  }
`;

const ClassicCardBody = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px 16px;
  position: relative;
  z-index: 1;
  transform: translateZ(8px);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
`;

const ClassicCardContent = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: min(100%, 520px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.$hasImage ? "16px" : "0")};
  position: relative;
`;

const ClassicSecondarySlot = styled.div`
  position: ${(props) => (props.$hasImage ? "relative" : "absolute")};
  left: ${(props) => (props.$hasImage ? "auto" : "50%")};
  top: ${(props) => (props.$hasImage ? "auto" : "50%")};
  width: min(100%, 460px);
  min-height: clamp(56px, 8vh, 92px);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) =>
    props.$hasImage
      ? "none"
      : "translate(-50%, calc(-50% + clamp(88px, 10vh, 124px)))"};
`;

const ClassicCardImage = styled.img`
  max-width: 100%;
  max-height: 150px;
  border-radius: 18px;
  object-fit: contain;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  @media (max-width: 768px) {
    max-height: 132px;
  }
`;

const ClassicCardWord = styled.div`
  max-width: 100%;
  font-size: clamp(42px, 7vw, 72px);
  line-height: 1.08;
  font-weight: 700;
  color: var(--text-color);
  text-align: center;
  word-break: break-word;
  filter: blur(${(props) => `${(props.$blur || 0).toFixed(2)}px`});
  opacity: ${(props) => 1 - (props.$fade || 0) * 0.55};
  transition:
    filter 0.12s ease,
    opacity 0.12s ease,
    transform 0.36s cubic-bezier(0.22, 1, 0.36, 1);
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translate3d(0, ${(props) => props.$offsetY || "0px"}, 10px);
  letter-spacing: -0.02em;
`;

const ClassicPromptHint = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted-color);
  font-size: clamp(12px, 1.1vw, 13px);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 600;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  filter: blur(${(props) => (props.$visible ? "0px" : "6px")});
  transform: translateY(${(props) => (props.$visible ? "0" : "8px")})
    scale(${(props) => (props.$visible ? 1 : 0.96)});
  transition:
    opacity 0.32s ease,
    filter 0.35s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  padding: 0 20px;
  text-align: center;

  @media (max-width: 768px) {
    bottom: 18px;
    font-size: 11px;
  }
`;

const ClassicAnswerPanel = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  filter: blur(${(props) => (props.$visible ? "0px" : "10px")});
  transform: translateY(${(props) => (props.$visible ? "0" : "14px")})
    scale(${(props) => (props.$visible ? 1 : 0.965)});
  transition:
    opacity 0.4s ease,
    filter 0.42s ease,
    transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
`;

const ClassicSwipeStamp = styled.div`
  position: absolute;
  top: clamp(18px, 2.4vw, 28px);
  ${(props) =>
    props.$side === "right"
      ? css`
          right: clamp(18px, 2.4vw, 28px);
        `
      : css`
          left: clamp(18px, 2.4vw, 28px);
        `}
  min-width: clamp(118px, 16vw, 190px);
  padding: clamp(7px, 1vw, 10px) clamp(12px, 1.4vw, 16px);
  border-radius: 16px;
  border: 3px solid
    ${(props) =>
      props.$tone === "success"
        ? "rgba(42, 135, 111, 0.9)"
        : "rgba(137, 82, 90, 0.9)"};
  color: ${(props) =>
    props.$tone === "success"
      ? "rgba(42, 135, 111, 0.92)"
      : "rgba(137, 82, 90, 0.92)"};
  background: rgba(35, 45, 62, 0.16);
  opacity: ${(props) => props.$opacity || 0};
  transform: rotate(${(props) => (props.$side === "right" ? "8deg" : "-8deg")})
    scale(${(props) => (props.$opacity ? 0.94 + props.$opacity * 0.08 : 0.94)});
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(18px, 3.2vw, 28px);
  line-height: 1;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: none;
  transition:
    opacity 0.18s ease,
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  z-index: 4;
`;

const ClassicCardHint = styled.div`
  color: var(--text-muted-color);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const ClassicBottomRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: auto;
  padding: 16px 24px 20px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 14px 20px 16px;
    gap: 14px;
  }
`;

const ClassicGhostAction = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 18px;
  border: 1px solid rgba(118, 133, 166, 0.25);
  background: color-mix(in srgb, var(--secondary-color) 88%, transparent);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);

  &:hover {
    background: color-mix(in srgb, var(--secondary-color) 96%, var(--text-color) 4%);
    border-color: color-mix(in srgb, var(--border-color) 82%, var(--text-color) 18%);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
    border-radius: 16px;
  }
`;

const ClassicPrimaryAction = styled(ClassicGhostAction)`
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--primary-color) 0%, color-mix(in srgb, var(--primary-color) 85%, black) 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

  &:hover {
    background: linear-gradient(135deg, color-mix(in srgb, var(--primary-color) 90%, white) 0%, var(--primary-color) 100%);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 58px;
    height: 58px;
    border-radius: 18px;
  }
`;

const ResultActions = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TestOptions = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TestOptionBtn = styled.button`
  appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  min-height: 54px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid
    ${(props) =>
      props.$selected ? "var(--primary-color)" : "var(--border-color)"};
  background: ${(props) =>
    props.$selected
      ? "color-mix(in srgb, var(--primary-color) 18%, var(--secondary-color))"
      : "var(--secondary-color)"};
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.16s ease,
    border-color 0.16s ease,
    transform 0.16s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${(props) =>
        props.$selected
          ? "color-mix(in srgb, var(--primary-color) 22%, var(--secondary-color))"
          : "var(--tertiary-color)"};
      border-color: ${(props) =>
        props.$selected ? "var(--primary-color)" : "var(--text-muted-color)"};
    }
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: none;
  }

  @media (hover: none), (pointer: coarse) {
    &:hover,
    &:active,
    &:focus,
    &:focus-visible {
      background: ${(props) =>
        props.$selected
          ? "color-mix(in srgb, var(--primary-color) 18%, var(--secondary-color))"
          : "var(--secondary-color)"};
      border-color: ${(props) =>
        props.$selected ? "var(--primary-color)" : "var(--border-color)"};
      box-shadow: none;
      outline: none;
    }
  }

  ${(props) =>
    props.$selected &&
    css`
      transform: translateY(-1px);
    `}
`;

const floatOne = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  25% { transform: translate3d(16px, -18px, 0) scale(1.03); }
  50% { transform: translate3d(-10px, -34px, 0) scale(0.98); }
  75% { transform: translate3d(20px, -8px, 0) scale(1.02); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const floatTwo = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  20% { transform: translate3d(-20px, -16px, 0) scale(0.98); }
  45% { transform: translate3d(10px, -30px, 0) scale(1.04); }
  75% { transform: translate3d(-14px, -10px, 0) scale(1.01); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const floatThree = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  30% { transform: translate3d(12px, -26px, 0) scale(1.02); }
  55% { transform: translate3d(-16px, -18px, 0) scale(0.99); }
  85% { transform: translate3d(6px, -4px, 0) scale(1.03); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const floatFour = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  35% { transform: translate3d(-18px, -28px, 0) scale(1.04); }
  60% { transform: translate3d(14px, -12px, 0) scale(0.99); }
  85% { transform: translate3d(-10px, -2px, 0) scale(1.02); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const flashcardStudyUi = {
  Container,
  StudyArea,
  BackBtn,
  Title,
  FlashcardBox,
  RevealBtn,
  Ratings,
  RatingBtn,
  StudyMeta,
  PreviewItem,
  PreviewRow,
  PreviewLabel,
  PreviewContent,
  ResultActions,
  StudyBtn,
  ClassicFullscreenShell,
  ClassicTopBar,
  ClassicTopIconButton,
  ClassicTopCounter,
  ClassicGhostAction,
  ClassicProgressTrack,
  ClassicProgressFill,
  ClassicViewport,
  ClassicFloatingCounter,
  ClassicCardStage,
  ClassicStackCard,
  ClassicNextPreviewCard,
  ClassicCardToolbarSpacer,
  ClassicToolbarIcon,
  ClassicCardBody,
  ClassicCardContent,
  ClassicCardImage,
  ClassicNextPreviewWord,
  ClassicSwipeCard,
  ClassicFlipLayer,
  ClassicCardFront,
  ClassicCardToolbar,
  ClassicCardWord,
  ClassicSecondarySlot,
  ClassicPromptHint,
  ClassicCardBack,
  ClassicAnswerPanel,
  ClassicSwipeStamp,
  TestOptions,
  TestOptionBtn,
};

const flashcardDialogUi = {
  Overlay,
  Dialog,
  HeaderRow,
  Title,
  DialogContent,
  ButtonWrapper,
  StudyBtn,
  DeckPreviewList,
  PreviewItem,
  PreviewRow,
  PreviewLabel,
  PreviewContent,
  SettingsGrid,
  FieldLabel,
  DirectionSelect,
  ModeOptions,
  ModeCard,
  ModeTitle,
  ModeDesc,
};

const NO_FOLDER_FILTER_ID = "__no-folder__";

const getDeckFolderIdentifier = (deck) => {
  if (!deck?.folderId) return "";
  if (typeof deck.folderId === "string") return String(deck.folderId);
  return String(deck.folderId.urlSlug || deck.folderId._id || deck.folderId.id || "");
};

const getDeckIdentifier = (deck) =>
  String(deck?._id || deck?.id || deck?.urlSlug || "");

const getDeckCreatedAtValue = (deck) => {
  const timestamp = new Date(deck?.createdAt || 0).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const getFolderIdentifier = (folder) =>
  String(folder?.urlSlug || folder?._id || folder?.id || "");

const FlashcardList = ({ initialDeckId, onBack }) => {
  const {
    flashcardDecks,
    flashcardsPage,
    flashcardsHasMore,
    fetchFlashcards,
    reviewFlashcard,
    fetchFlashcardDeck,
    fetchFlashcardFolder,
    joinFlashcardDeck,
    joinFlashcardFolder,
    leaveFlashcardDeck,
    leaveFlashcardFolder,
    deleteFlashcardDeck,
  } = useArena();
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?._id || user?.id || null;
  const [studyingDeck, setStudyingDeck] = useState(null);
  const [viewingDeck, setViewingDeck] = useState(null);
  const [viewingFolder, setViewingFolder] = useState(null);
  const [folders, setFolders] = useState([]);
  const [selectedFolderFilter, setSelectedFolderFilter] = useState(NO_FOLDER_FILTER_ID);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showingBack, setShowingBack] = useState(false);
  const [showMembersForDeck, setShowMembersForDeck] = useState(null);
  const [joiningDeck, setJoiningDeck] = useState(null);
  const [joiningFolder, setJoiningFolder] = useState(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null);
  const [isFolderEditorOpen, setIsFolderEditorOpen] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");
  const [isSavingFolder, setIsSavingFolder] = useState(false);
  const [deckToDelete, setDeckToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [isDeletingFolder, setIsDeletingFolder] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [trainingPickerDeck, setTrainingPickerDeck] = useState(null);
  const [classicDeck, setClassicDeck] = useState(null);
  const [classicQueue, setClassicQueue] = useState([]);
  const [classicIndex, setClassicIndex] = useState(0);
  const [classicShowBack, setClassicShowBack] = useState(false);
  const [classicAnswers, setClassicAnswers] = useState([]);
  const [classicCompleted, setClassicCompleted] = useState(false);
  const [classicDragX, setClassicDragX] = useState(0);
  const [classicDragging, setClassicDragging] = useState(false);
  const [classicExitDirection, setClassicExitDirection] = useState(null);
  const [classicExitFlipped, setClassicExitFlipped] = useState(false);
  const [testDeck, setTestDeck] = useState(null);
  const [testQueue, setTestQueue] = useState([]);
  const [testIndex, setTestIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [selectedTestOption, setSelectedTestOption] = useState(null);
  const [gameDeck, setGameDeck] = useState(null);
  const [gameQueue, setGameQueue] = useState([]);
  const [skipNextListEntryAnimation, setSkipNextListEntryAnimation] =
    useState(false);
  const [promptSide, setPromptSide] = useState(() => {
    if (typeof window === "undefined") return "front";
    const saved = window.localStorage.getItem(
      FLASHCARD_PROMPT_SIDE_STORAGE_KEY,
    );
    return saved === "back" ? "back" : "front";
  });
  const [isDeckListLoading, setIsDeckListLoading] = useState(
    flashcardDecks.length === 0,
  );
  const gameBoardRef = useRef(null);
  const classicPointerStateRef = useRef({
    active: false,
    startX: 0,
    dragStarted: false,
  });
  const classicHistoryRef = useRef([]);
  const classicMissedIdsRef = useRef(new Set());
  const speechVoicesRef = useRef([]);
  const internalBackStatePushedRef = useRef(false);
  const closingFromBrowserBackRef = useRef(false);
  const closingFromManualActionRef = useRef(false);

  const isPremium = isPremiumUser(user);
  const hasActiveTrainingMode = Boolean(
    studyingDeck || classicDeck || testDeck || gameDeck,
  );

  const closeActiveTrainingMode = () => {
    setSkipNextListEntryAnimation(true);
    setStudyingDeck(null);
    setShowingBack(false);
    setTrainingPickerDeck(null);
    setClassicDeck(null);
    setClassicQueue([]);
    setClassicIndex(0);
    setClassicShowBack(false);
    setClassicAnswers([]);
    setClassicCompleted(false);
    setClassicDragX(0);
    setClassicDragging(false);
    setClassicExitDirection(null);
    setClassicExitFlipped(false);
    setTestDeck(null);
    setTestQueue([]);
    setTestIndex(0);
    setTestAnswers([]);
    setTestCompleted(false);
    setSelectedTestOption(null);
    setGameDeck(null);
    setGameQueue([]);
  };

  const closeActiveTrainingModeManually = () => {
    closingFromManualActionRef.current = true;
    closeActiveTrainingMode();
  };

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 768) {
      return undefined;
    }

    const handlePopState = () => {
      if (!internalBackStatePushedRef.current || !hasActiveTrainingMode) return;
      closingFromBrowserBackRef.current = true;
      internalBackStatePushedRef.current = false;
      closeActiveTrainingMode();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [hasActiveTrainingMode]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 768) return;

    if (hasActiveTrainingMode && !internalBackStatePushedRef.current) {
      window.history.pushState(
        { ...(window.history.state || {}), flashcardTrainingLayer: true },
        "",
        window.location.href,
      );
      internalBackStatePushedRef.current = true;
      return;
    }

    if (!hasActiveTrainingMode && internalBackStatePushedRef.current) {
      if (closingFromBrowserBackRef.current) {
        closingFromBrowserBackRef.current = false;
        internalBackStatePushedRef.current = false;
        return;
      }

      if (closingFromManualActionRef.current) {
        closingFromManualActionRef.current = false;
        internalBackStatePushedRef.current = false;
        window.history.replaceState(
          { ...(window.history.state || {}), flashcardTrainingLayer: false },
          "",
          window.location.href,
        );
        return;
      }

      internalBackStatePushedRef.current = false;
      window.history.back();
    }
  }, [hasActiveTrainingMode]);

  useEffect(() => {
    if (hasActiveTrainingMode || !skipNextListEntryAnimation) return;

    const clearAnimationSkip = window.setTimeout(() => {
      setSkipNextListEntryAnimation(false);
    }, 0);

    return () => window.clearTimeout(clearAnimationSkip);
  }, [hasActiveTrainingMode, skipNextListEntryAnimation]);
  const limit = isPremium
    ? APP_LIMITS.flashcardsCreated.premium
    : APP_LIMITS.flashcardsCreated.ordinary;
  const myDecks = flashcardDecks.filter(
    (deck) =>
      (deck.createdBy?._id || deck.createdBy) === (user?._id || user?.id),
  );
  const currentCount = myDecks.length;
  const ownedFolders = useMemo(
    () =>
      folders.filter(
        (folder) =>
          String(folder.createdBy?._id || folder.createdBy?.id || folder.createdBy || "") ===
          String(user?._id || user?.id || ""),
      ),
    [folders, user?._id, user?.id],
  );
  const joinedFolders = useMemo(
    () =>
      folders.filter((folder) =>
        folder?.members?.some((member) => {
          const memberUserId =
            member?.userId?._id || member?.userId?.id || member?.userId || null;
          return memberUserId && currentUserId
            ? String(memberUserId) === String(currentUserId)
            : false;
        }),
      ),
    [currentUserId, folders],
  );
  const selectedFolder = useMemo(() => {
    if (selectedFolderFilter === NO_FOLDER_FILTER_ID) return null;
    return (
      folders.find((folder) => getFolderIdentifier(folder) === selectedFolderFilter) ||
      (getFolderIdentifier(viewingFolder) === selectedFolderFilter ? viewingFolder : null)
    );
  }, [folders, selectedFolderFilter, viewingFolder]);
  const visibleFolderChips = useMemo(() => {
    const baseFolders = [...ownedFolders];
    joinedFolders.forEach((folder) => {
      if (!baseFolders.some((item) => getFolderIdentifier(item) === getFolderIdentifier(folder))) {
        baseFolders.push(folder);
      }
    });

    if (!selectedFolder) return baseFolders;
    if (baseFolders.some((folder) => getFolderIdentifier(folder) === selectedFolderFilter)) {
      return baseFolders;
    }
    return [...baseFolders, selectedFolder];
  }, [joinedFolders, ownedFolders, selectedFolder, selectedFolderFilter]);
  const filteredDecks = useMemo(() => {
    if (selectedFolderFilter === NO_FOLDER_FILTER_ID) {
      return flashcardDecks
        .filter((deck) => !getDeckFolderIdentifier(deck))
        .sort((a, b) => getDeckCreatedAtValue(b) - getDeckCreatedAtValue(a));
    }

    const pagedFolderDecks = flashcardDecks.filter(
      (deck) => getDeckFolderIdentifier(deck) === selectedFolderFilter,
    );

    if (!Array.isArray(selectedFolder?.decks) || selectedFolder.decks.length === 0) {
      return pagedFolderDecks;
    }

    const pagedDeckMap = new Map(
      pagedFolderDecks.map((deck) => [getDeckIdentifier(deck), deck]),
    );
    const seenDeckIds = new Set();
    const mergedDecks = selectedFolder.decks.map((deck) => {
      const deckId = getDeckIdentifier(deck);
      if (deckId) {
        seenDeckIds.add(deckId);
      }
      return pagedDeckMap.get(deckId) || deck;
    });

    pagedFolderDecks.forEach((deck) => {
      const deckId = getDeckIdentifier(deck);
      if (!deckId || seenDeckIds.has(deckId)) return;
      seenDeckIds.add(deckId);
      mergedDecks.push(deck);
    });

    return mergedDecks.sort(
      (a, b) => getDeckCreatedAtValue(b) - getDeckCreatedAtValue(a),
    );
  }, [flashcardDecks, selectedFolder, selectedFolderFilter]);
  const selectedFolderOwnerId =
    selectedFolder?.createdBy?._id ||
    selectedFolder?.createdBy?.id ||
    selectedFolder?.createdBy ||
    null;
  const hasMoreFilteredDecks =
    selectedFolderFilter === NO_FOLDER_FILTER_ID && flashcardsHasMore;
  const isSelectedOwnFolder =
    selectedFolderOwnerId && currentUserId
      ? String(selectedFolderOwnerId) === String(currentUserId)
      : false;

  const handleCreateClick = () => {
    if (currentCount >= limit) {
      if (!isPremium) {
        setIsUpgradeModalOpen(true);
      } else {
        toast.error(`Siz maksimal limitga yetgansiz (${limit}/${limit}).`);
      }
      return;
    }
    setIsCreateOpen(true);
  };

  const loadFolders = async () => {
    try {
      const response = await arenaApi.fetchFlashcardFolders();
      setFolders(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching flashcard folders:", error);
    }
  };

  const hasFetched = React.useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    if (flashcardDecks.length > 0) {
      hasFetched.current = true;
      setIsDeckListLoading(false);
      return;
    }
    setIsDeckListLoading(true);
    fetchFlashcards(1).finally(() => {
      hasFetched.current = true;
      setIsDeckListLoading(false);
    });
  }, [fetchFlashcards, flashcardDecks.length]);

  useEffect(() => {
    void loadFolders();
  }, []);

  const fetchMoreData = () => {
    if (selectedFolderFilter !== NO_FOLDER_FILTER_ID) {
      return;
    }
    if (flashcardsHasMore) {
      fetchFlashcards(flashcardsPage + 1);
    }
  };

  useEffect(() => {
    const checkDeepLink = async () => {
      if (initialDeckId && !studyingDeck) {
        const deckData = await fetchFlashcardDeck(initialDeckId);
        if (deckData) {
          setViewingDeck(deckData);
          setViewingFolder(null);
          return;
        }

        const folderData = await fetchFlashcardFolder(initialDeckId);
        if (folderData) {
          setSelectedFolderFilter(getFolderIdentifier(folderData) || NO_FOLDER_FILTER_ID);
          setViewingFolder(folderData);
          setViewingDeck(null);
        }
      }
    };
    checkDeepLink();
  }, [fetchFlashcardDeck, fetchFlashcardFolder, initialDeckId, studyingDeck]);

  useEffect(() => {
    if (!openMenuId) return undefined;
    const handleOutsideClick = () => setOpenMenuId(null);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openMenuId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(FLASHCARD_PROMPT_SIDE_STORAGE_KEY, promptSide);
  }, [promptSide]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return undefined;
    }

    const synth = window.speechSynthesis;
    const syncVoices = () => {
      const voices = synth.getVoices?.() || [];
      if (voices.length > 0) {
        speechVoicesRef.current = voices;
      }
    };

    syncVoices();
    synth.addEventListener?.("voiceschanged", syncVoices);

    return () => {
      synth.removeEventListener?.("voiceschanged", syncVoices);
    };
  }, []);

  const getPromptText = (card) =>
    promptSide === "front" ? card?.front : card?.back;
  const getPromptImage = (card) =>
    promptSide === "front" ? card?.frontImage : card?.backImage;
  const getAnswerText = (card) =>
    promptSide === "front" ? card?.back : card?.front;
  const getAnswerImage = (card) =>
    promptSide === "front" ? card?.backImage : card?.frontImage;
  const getClassicCardKey = (card) =>
    String(card?._id || `${card?.front || ""}::${card?.back || ""}`);

  const resetClassicCardMotion = () => {
    setClassicDragX(0);
    setClassicDragging(false);
    setClassicExitDirection(null);
    setClassicExitFlipped(false);
    classicPointerStateRef.current = {
      active: false,
      startX: 0,
      dragStarted: false,
    };
  };

  const pushClassicHistorySnapshot = () => {
    classicHistoryRef.current.push({
      queue: [...classicQueue],
      index: classicIndex,
      answers: [...classicAnswers],
      showBack: classicShowBack,
      completed: classicCompleted,
      missedIds: [...classicMissedIdsRef.current],
    });
  };

  const resolveSpeechVoice = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return null;

    const voices =
      speechVoicesRef.current.length > 0
        ? speechVoicesRef.current
        : window.speechSynthesis.getVoices?.() || [];

    if (!voices.length) return null;

    const isArabic = /[\u0600-\u06FF]/.test(text);
    if (isArabic) {
      return (
        voices.find((voice) => voice.lang === "ar-SA") ||
        voices.find((voice) => voice.lang === "ar_AE") ||
        voices.find((voice) => voice.lang?.toLowerCase().startsWith("ar")) ||
        null
      );
    }

    return (
      voices.find((voice) => voice.lang === "en-US") ||
      voices.find((voice) => voice.lang?.toLowerCase().startsWith("en")) ||
      null
    );
  };

  const speakClassicCard = (side, event) => {
    event?.stopPropagation?.();
    const card = classicQueue[classicIndex];
    const text =
      (side === "answer" ? getAnswerText(card) : getPromptText(card)) || "";
    if (!text || typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    const synth = window.speechSynthesis;
    const isArabic = /[\u0600-\u06FF]/.test(text);
    const voice = resolveSpeechVoice(text);

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isArabic ? "ar-SA" : "en-US";
    utterance.rate = isArabic ? 0.9 : 0.92;
    utterance.pitch = 1;

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || utterance.lang;
    }

    const runSpeak = () => {
      try {
        synth.resume?.();
      } catch {}
      synth.speak(utterance);
    };

    window.setTimeout(runSpeak, isArabic ? 40 : 0);
  };

  const startStudy = async (deckMetadata, isRestart = false) => {
    const deck = await fetchFlashcardDeck(deckMetadata._id);
    if (!deck) return;

    const now = new Date();
    const cardsToStudy = isRestart
      ? deck.cards
      : deck.cards.filter((c) => new Date(c.nextReviewDate) <= now);

    if (cardsToStudy.length === 0) {
      toast("Hozircha yodlash kerak bo'lgan so'zlar yo'q! Kutib turing.", {
        icon: "ℹ️",
      });
      return;
    }

    setViewingDeck(null);
    setStudyingDeck(deck);
    setReviewQueue(cardsToStudy);
    setCurrentCardIndex(0);
    setShowingBack(false);
  };

  const openTrainingPicker = async (deckMetadata) => {
    const deck = await fetchFlashcardDeck(deckMetadata._id);
    if (!deck) return;
    setTrainingPickerDeck(deck);
  };

  const resetClassicSession = (deck, cards) => {
    setViewingDeck(null);
    setTrainingPickerDeck(null);
    setStudyingDeck(null);
    classicHistoryRef.current = [];
    classicMissedIdsRef.current = new Set();
    setClassicDeck(deck);
    setClassicQueue(cards);
    setClassicIndex(0);
    setClassicShowBack(false);
    setClassicAnswers([]);
    setClassicCompleted(false);
    setClassicExitDirection(null);
    setClassicExitFlipped(false);
  };

  const buildTestOptions = (deck, currentCard) => {
    const wrongOptions = (deck.cards || [])
      .filter(
        (card) =>
          card._id !== currentCard._id &&
          getAnswerText(card) !== getAnswerText(currentCard),
      )
      .map((card) => getAnswerText(card))
      .filter(Boolean);

    const uniqueWrongOptions = [...new Set(wrongOptions)];
    const shuffledWrong = uniqueWrongOptions.sort(() => Math.random() - 0.5);
    const options = [
      getAnswerText(currentCard),
      ...shuffledWrong.slice(0, 3),
    ].filter(Boolean);
    return options.sort(() => Math.random() - 0.5);
  };

  const resetTestSession = (deck, cards) => {
    setViewingDeck(null);
    setTrainingPickerDeck(null);
    setStudyingDeck(null);
    setClassicDeck(null);
    setTestDeck(deck);
    setTestQueue(cards);
    setTestIndex(0);
    setTestAnswers([]);
    setTestCompleted(false);
    setSelectedTestOption(null);
  };

  const resetGameSession = (deck, cards) => {
    setViewingDeck(null);
    setTrainingPickerDeck(null);
    setStudyingDeck(null);
    setClassicDeck(null);
    setTestDeck(null);
    setGameDeck(deck);
    setGameQueue(cards);
  };

  const startTestStudy = (deckMetadata) => {
    const deck =
      trainingPickerDeck?._id === deckMetadata._id
        ? trainingPickerDeck
        : viewingDeck?._id === deckMetadata._id
          ? viewingDeck
          : deckMetadata;
    resetTestSession(deck, [...(deck.cards || [])]);
  };

  const startGameStudy = (deckMetadata) => {
    const deck =
      trainingPickerDeck?._id === deckMetadata._id
        ? trainingPickerDeck
        : viewingDeck?._id === deckMetadata._id
          ? viewingDeck
          : deckMetadata;
    resetGameSession(deck, [...(deck.cards || [])]);
  };

  const handleTestAnswer = (selectedOption) => {
    const currentCard = testQueue[testIndex];
    if (!currentCard || selectedTestOption) return;

    if (typeof document !== "undefined") {
      document.activeElement?.blur?.();
    }

    setSelectedTestOption(selectedOption);

    window.setTimeout(() => {
      const isCorrect = selectedOption === getAnswerText(currentCard);
      const nextAnswers = [
        ...testAnswers,
        {
          card: currentCard,
          selectedOption,
          isCorrect,
        },
      ];
      setTestAnswers(nextAnswers);

      if (testIndex + 1 >= testQueue.length) {
        setTestCompleted(true);
        setSelectedTestOption(null);
        return;
      }

      setTestIndex((prev) => prev + 1);
      setSelectedTestOption(null);
    }, 180);
  };

  const restartTestMissed = () => {
    if (!testDeck) return;
    const missedCards = testAnswers
      .filter((item) => !item.isCorrect)
      .map((item) => item.card);
    if (missedCards.length === 0) {
      toast("Hamma javob to'g'ri topildi.", { icon: "👏" });
      return;
    }
    resetTestSession(testDeck, missedCards);
  };

  const restartTestAll = () => {
    if (!testDeck) return;
    resetTestSession(testDeck, [...(testDeck.cards || [])]);
  };

  const currentTestCard = testQueue[testIndex] || null;
  const currentTestOptions = useMemo(() => {
    if (!testDeck || !currentTestCard) return [];
    return buildTestOptions(testDeck, currentTestCard);
  }, [testDeck, currentTestCard]);

  useEffect(() => {
    if (!currentTestCard || typeof document === "undefined") return;
    document.activeElement?.blur?.();
  }, [testIndex, currentTestCard]);

  const restartGameAll = () => {
    if (!gameDeck) return;
    resetGameSession(gameDeck, [...(gameDeck.cards || [])]);
  };

  const startClassicStudy = (deckMetadata) => {
    const deck =
      trainingPickerDeck?._id === deckMetadata._id
        ? trainingPickerDeck
        : viewingDeck?._id === deckMetadata._id
          ? viewingDeck
          : deckMetadata;
    resetClassicSession(deck, [...(deck.cards || [])]);
  };

  const handleClassicAnswer = (known) => {
    const currentCard = classicQueue[classicIndex];
    if (!currentCard) return;
    const isLast = classicIndex + 1 >= classicQueue.length;

    setClassicAnswers((prev) => [
      ...prev,
      {
        card: currentCard,
        known,
      },
    ]);
    setClassicShowBack(false);
    if (!isLast) {
      setClassicIndex((prev) => prev + 1);
    }
  };

  const handleClassicReplay = () => {
    const previousSnapshot = classicHistoryRef.current.pop();
    if (!previousSnapshot) return;
    setClassicQueue(previousSnapshot.queue);
    setClassicIndex(previousSnapshot.index);
    setClassicAnswers(previousSnapshot.answers);
    setClassicShowBack(previousSnapshot.showBack);
    setClassicCompleted(previousSnapshot.completed);
    classicMissedIdsRef.current = new Set(previousSnapshot.missedIds);
    resetClassicCardMotion();
  };

  const commitClassicSwipe = (direction, swipeOffset) => {
    const currentCard = classicQueue[classicIndex];
    if (!currentCard || (direction !== "left" && direction !== "right")) return;

    pushClassicHistorySnapshot();

    if (direction === "left") {
      classicMissedIdsRef.current.add(getClassicCardKey(currentCard));
    } else {
      const cardKey = getClassicCardKey(currentCard);
      const wasMissed = classicMissedIdsRef.current.has(cardKey);
      classicMissedIdsRef.current.delete(cardKey);
      setClassicAnswers((prev) => [
        ...prev,
        {
          card: currentCard,
          known: !wasMissed,
        },
      ]);
    }

    setClassicExitDirection(direction);
    setClassicDragX(swipeOffset);
    setClassicDragging(false);
    setClassicExitFlipped(classicShowBack);
  };

  const handleClassicKeyboardSwipe = (action) => {
    if (classicCompleted || classicExitDirection) return;
    const currentCard = classicQueue[classicIndex];
    if (!currentCard) return;

    if (action === "flip") {
      setClassicShowBack((prev) => !prev);
      return;
    }

    if (action !== "left" && action !== "right") {
      return;
    }

    const swipeOffset = action === "right" ? 96 : -96;
    commitClassicSwipe(action, swipeOffset);
  };

  useEffect(() => {
    if (!classicDeck || classicCompleted) return;
    resetClassicCardMotion();
  }, [classicDeck, classicIndex, classicCompleted]);

  useEffect(() => {
    if (typeof document === "undefined" || !classicDeck || classicCompleted) {
      return undefined;
    }

    if (window.innerWidth > 768) {
      return undefined;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousBodyOverscroll = body.style.overscrollBehavior;
    const previousHtmlOverscroll = documentElement.style.overscrollBehavior;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    documentElement.style.overscrollBehavior = "none";

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.overscrollBehavior = previousBodyOverscroll;
      documentElement.style.overscrollBehavior = previousHtmlOverscroll;
    };
  }, [classicDeck, classicCompleted]);

  useEffect(() => {
    if (!classicExitDirection) return undefined;
    const timer = window.setTimeout(() => {
      if (classicExitDirection === "left") {
        setClassicQueue((prev) => {
          const next = [...prev];
          const [cycledCard] = next.splice(classicIndex, 1);
          if (cycledCard) {
            next.push(cycledCard);
          }
          return next;
        });
        setClassicIndex((prev) => Math.min(prev, Math.max(classicQueue.length - 1, 0)));
      } else {
        const isLast = classicIndex + 1 >= classicQueue.length;
        if (isLast) {
          setClassicCompleted(true);
        } else {
          setClassicIndex((prev) => prev + 1);
        }
      }
      setClassicShowBack(false);
      resetClassicCardMotion();
    }, classicExitDirection === "left" ? 560 : 360);
    return () => window.clearTimeout(timer);
  }, [classicExitDirection, classicIndex, classicQueue.length]);

  const restartClassicMissed = () => {
    if (!classicDeck) return;
    const missedCards = classicAnswers
      .filter((item) => !item.known)
      .map((item) => item.card);
    if (missedCards.length === 0) {
      toast("Hamma kartani topdingiz.", { icon: "👏" });
      return;
    }
    resetClassicSession(classicDeck, missedCards);
  };

  const restartClassicAll = () => {
    if (!classicDeck) return;
    resetClassicSession(classicDeck, [...(classicDeck.cards || [])]);
  };

  const handleClassicPointerDown = (event) => {
    if (classicCompleted || classicExitDirection) return;
    event.preventDefault?.();
    classicPointerStateRef.current = {
      active: true,
      startX: event.clientX,
      dragStarted: false,
    };
    setClassicDragging(false);
  };

  const handleClassicPointerMove = (event) => {
    if (
      !classicPointerStateRef.current.active ||
      classicCompleted ||
      classicExitDirection
    )
      return;

    event.preventDefault?.();

    const deltaX = event.clientX - classicPointerStateRef.current.startX;
    if (Math.abs(deltaX) > 6) {
      classicPointerStateRef.current.dragStarted = true;
      setClassicDragging(true);
    }

    if (classicPointerStateRef.current.dragStarted) {
      setClassicDragX(deltaX);
    }
  };

  const handleClassicPointerEnd = () => {
    if (
      !classicPointerStateRef.current.active ||
      classicCompleted ||
      classicExitDirection
    )
      return;

    const deltaX = classicDragX;
    const wasDragging = classicPointerStateRef.current.dragStarted;
    classicPointerStateRef.current.active = false;
    classicPointerStateRef.current.dragStarted = false;
    setClassicDragging(false);

    if (!wasDragging) {
      setClassicDragX(0);
      setClassicShowBack((prev) => !prev);
      return;
    }

    if (Math.abs(deltaX) >= 72) {
      const direction = deltaX > 0 ? "right" : "left";
      const currentCard = classicQueue[classicIndex];
      if (!currentCard) return;
      commitClassicSwipe(direction, deltaX);
      return;
    }

    setClassicDragX(0);
  };

  const handleCopyLink = (deckIdentifier) => {
    if (!deckIdentifier) {
      toast.error("Lug'at havolasi hali tayyor emas.");
      return;
    }
    const url = `${RESOLVED_APP_BASE_URL}/arena/flashcards/${deckIdentifier}`;
    navigator.clipboard.writeText(url);
    toast.success("Lug'at havolasi nusxalandi!");
  };

  const getClassicStackLayout = (depth) => {
    const cappedDepth = Math.min(depth, 5);
    const layoutMap = {
      1: { offsetX: 0, offsetY: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 5 },
      2: { offsetX: 18, offsetY: 12, rotate: -4, scale: 0.998, opacity: 1, zIndex: 4 },
      3: { offsetX: -14, offsetY: 22, rotate: 4.5, scale: 0.998, opacity: 1, zIndex: 3 },
      4: { offsetX: 8, offsetY: -12, rotate: -5, scale: 0.996, opacity: 1, zIndex: 2 },
      5: { offsetX: 24, offsetY: 30, rotate: -3, scale: 0.99, opacity: 1, zIndex: 1 },
    };

    return layoutMap[cappedDepth] || layoutMap[5];
  };

  const handleDeleteDeck = async () => {
    if (!deckToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteFlashcardDeck(deckToDelete._id);
      const deletedDeckId = getDeckIdentifier(deckToDelete);
      const deletedDeckFolderId = getDeckFolderIdentifier(deckToDelete);
      setFolders((prev) =>
        prev.map((folder) => {
          if (getFolderIdentifier(folder) !== deletedDeckFolderId) return folder;
          const nextDecks = (folder.decks || []).filter(
            (deck) => getDeckIdentifier(deck) !== deletedDeckId,
          );
          return {
            ...folder,
            decks: nextDecks,
            deckCount: nextDecks.length,
          };
        }),
      );
      setViewingFolder((prev) => {
        if (!prev || !deletedDeckFolderId) return prev;
        if (getFolderIdentifier(prev) !== deletedDeckFolderId) return prev;
        const nextDecks = (prev?.decks || []).filter(
          (deck) => getDeckIdentifier(deck) !== deletedDeckId,
        );
        return {
          ...prev,
          decks: nextDecks,
          deckCount: nextDecks.length,
        };
      });
      if (viewingDeck?._id === deckToDelete._id) setViewingDeck(null);
      if (studyingDeck?._id === deckToDelete._id) setStudyingDeck(null);
      if (showMembersForDeck?._id === deckToDelete._id) {
        setShowMembersForDeck(null);
      }
      toast.success("Lug'at va unga tegishli progresslar o'chirildi.");
      setDeckToDelete(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Lug'atni o'chirishda xatolik yuz berdi.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteFolder = async () => {
    if (!folderToDelete || isDeletingFolder) return;

    const folderId = getFolderIdentifier(folderToDelete);
    if (!folderId) {
      toast.error("Papka topilmadi.");
      return;
    }

    setIsDeletingFolder(true);
    try {
      let folderPayload = folderToDelete;
      try {
        folderPayload = await fetchFlashcardFolder(folderId);
      } catch {}

      const localFolderDecks = flashcardDecks.filter(
        (deck) => getDeckFolderIdentifier(deck) === folderId,
      );
      const deckIds = Array.from(
        new Set(
          [
            ...(Array.isArray(folderPayload?.decks) ? folderPayload.decks : []),
            ...(Array.isArray(folderToDelete?.decks) ? folderToDelete.decks : []),
            ...localFolderDecks,
          ]
            .map((deck) => String(deck?._id || deck?.id || deck?.urlSlug || "").trim())
            .filter(Boolean),
        ),
      );

      for (const deckId of deckIds) {
        await deleteFlashcardDeck(deckId);
      }

      await arenaApi.deleteFlashcardFolder(folderId);
      if (getFolderIdentifier(viewingFolder) === folderId) {
        setViewingFolder(null);
      }
      if (selectedFolderFilter === folderId) {
        setSelectedFolderFilter(NO_FOLDER_FILTER_ID);
      }
      await Promise.all([fetchFlashcards(1), loadFolders()]);
      toast.success("Papka va ichidagi lug'atlar o'chirildi.");
      setFolderToDelete(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Papkani o'chirishda xatolik yuz berdi.",
      );
    } finally {
      setIsDeletingFolder(false);
    }
  };

  const onJoin = async (deckId) => {
    const res = await joinFlashcardDeck(deckId);
    if (res.success) {
      setJoiningDeck(null);
      fetchFlashcards();
      if (viewingDeck && viewingDeck._id === deckId) {
        const updatedDeck = await fetchFlashcardDeck(deckId);
        setViewingDeck(updatedDeck);
      }
    }
  };

  const onJoinFolder = async (folderId) => {
    if (!folderId) return;
    setJoiningFolder(folderId);
    const res = await joinFlashcardFolder(folderId);
    if (res.success) {
      const updatedFolder =
        res.data || (await fetchFlashcardFolder(folderId));
      const resolvedFolderId = getFolderIdentifier(updatedFolder) || folderId;
      setSelectedFolderFilter(resolvedFolderId);
      setViewingFolder(updatedFolder || null);
      await Promise.all([fetchFlashcards(1), loadFolders()]);
      toast.success("Papkaga qo'shildingiz.");
    } else {
      toast.error("Papkaga qo'shilishda xatolik yuz berdi.");
    }
    setJoiningFolder(null);
  };

  const onLeaveFolder = async (folderId) => {
    if (!folderId) return;
    if (
      !window.confirm(
        "Haqiqatdan ham ushbu papkadan chiqmoqchimisiz?",
      )
    ) {
      return;
    }

    setJoiningFolder(folderId);
    const res = await leaveFlashcardFolder(folderId);
    if (res.success) {
      setViewingFolder(null);
      fetchFlashcards(1);
      loadFolders();
      setSelectedFolderFilter(NO_FOLDER_FILTER_ID);
      toast.success("Papkadan chiqdingiz.");
    } else {
      toast.error("Papkadan chiqishda xatolik yuz berdi.");
    }
    setJoiningFolder(null);
  };

  const openDeckFromFolder = async (deck) => {
    if (!deck?._id) return;
    const fullDeck = await fetchFlashcardDeck(deck._id);
    if (fullDeck) {
      setViewingFolder(null);
      setViewingDeck(fullDeck);
    }
  };

  const openDeckPreview = async (deck) => {
    if (!deck?._id) return;
    const fullDeck = await fetchFlashcardDeck(deck._id);
    if (fullDeck) {
      setViewingDeck(fullDeck);
      setOpenMenuId(null);
    }
  };

  const handleCopyFolderLink = (folderIdentifier) => {
    if (!folderIdentifier) {
      toast.error("Papka havolasi hali tayyor emas.");
      return;
    }
    const url = `${RESOLVED_APP_BASE_URL}/arena/flashcard-folders/${folderIdentifier}`;
    navigator.clipboard.writeText(url);
    toast.success("Papka havolasi nusxalandi!");
  };

  const handleSaveFolder = async () => {
    if (!folderTitle.trim()) {
      toast.error("Papka nomini kiriting");
      return;
    }

    if (isSavingFolder) {
      return;
    }

    try {
      setIsSavingFolder(true);
      const created = await arenaApi.createFlashcardFolder({
        title: folderTitle.trim(),
        isPublic: true,
      });
      await loadFolders();
      setSelectedFolderFilter(getFolderIdentifier(created) || NO_FOLDER_FILTER_ID);
      setFolderTitle("");
      setIsFolderEditorOpen(false);
      toast.success("Papka yaratildi");
    } catch (error) {
      toast.error("Papka yaratishda xatolik yuz berdi");
    } finally {
      setIsSavingFolder(false);
    }
  };

  const onLeave = async (deckId) => {
    if (
      window.confirm(
        "Haqiqatdan ham ushbu lug'atdan chiqmoqchimisiz? Progressingiz o'chib ketadi.",
      )
    ) {
      const res = await leaveFlashcardDeck(deckId);
      if (res.success) {
        fetchFlashcards();
        if (viewingDeck && viewingDeck._id === deckId) {
          setViewingDeck(null);
        }
      }
    }
  };

  const handleRating = async (quality) => {
    const currentCard = reviewQueue[currentCardIndex];
    if (!currentCard) return;

    const cardId = currentCard._id;
    const deckId = studyingDeck._id;

    reviewFlashcard(deckId, cardId, quality).catch((err) => console.error(err));

    if (quality < 3) {
      setReviewQueue((prev) => [...prev, currentCard]);
      setCurrentCardIndex((prev) => prev + 1);
      setShowingBack(false);
    } else {
      if (currentCardIndex + 1 < reviewQueue.length) {
        setCurrentCardIndex((prev) => prev + 1);
        setShowingBack(false);
      } else {
        toast.success("Barakalla! Ushbu to'plamni yodlashni tugatdingiz.", {
          duration: 4000,
        });
        setStudyingDeck(null);
        fetchFlashcards();
      }
    }
  };

  const viewingDeckOwnerId =
    viewingDeck?.createdBy?._id || viewingDeck?.createdBy?.id || null;
  const isViewingOwnDeck =
    viewingDeckOwnerId && currentUserId
      ? String(viewingDeckOwnerId) === String(currentUserId)
      : false;
  const hasJoinedViewingDeck = Boolean(
    viewingDeck?.members?.some((member) => {
      const memberUserId =
        member?.userId?._id || member?.userId?.id || member?.userId || null;
      return memberUserId && currentUserId
        ? String(memberUserId) === String(currentUserId)
        : false;
    }),
  );
  const viewingFolderOwnerId =
    viewingFolder?.createdBy?._id || viewingFolder?.createdBy?.id || viewingFolder?.createdBy || null;
  const isViewingOwnFolder =
    viewingFolderOwnerId && currentUserId
      ? String(viewingFolderOwnerId) === String(currentUserId)
      : false;
  const hasJoinedViewingFolder = Boolean(
    viewingFolder?.members?.some((member) => {
      const memberUserId =
        member?.userId?._id || member?.userId?.id || member?.userId || null;
      return memberUserId && currentUserId
        ? String(memberUserId) === String(currentUserId)
        : false;
    }),
  );

  // ─── Mode renders (animatsiyasiz, to'g'ridan-to'g'ri) ─────────────────────
  if (studyingDeck) {
    return (
      <FlashcardReviewMode
        ui={flashcardStudyUi}
        studyingDeck={studyingDeck}
        reviewQueue={reviewQueue}
        currentCardIndex={currentCardIndex}
        showingBack={showingBack}
        setStudyingDeck={setStudyingDeck}
        setShowingBack={setShowingBack}
        onClose={closeActiveTrainingModeManually}
        getPromptImage={getPromptImage}
        getPromptText={getPromptText}
        getAnswerImage={getAnswerImage}
        getAnswerText={getAnswerText}
        handleRating={handleRating}
      />
    );
  }

  if (classicDeck) {
    return (
      <FlashcardClassicMode
        ui={flashcardStudyUi}
        classicDeck={classicDeck}
        classicQueue={classicQueue}
        classicIndex={classicIndex}
        classicAnswers={classicAnswers}
        classicCompleted={classicCompleted}
        classicDragX={classicDragX}
        classicDragging={classicDragging}
        classicExitDirection={classicExitDirection}
        classicExitFlipped={classicExitFlipped}
        classicShowBack={classicShowBack}
        setClassicDeck={setClassicDeck}
        setClassicQueue={setClassicQueue}
        setClassicAnswers={setClassicAnswers}
        setClassicCompleted={setClassicCompleted}
        onClose={closeActiveTrainingModeManually}
        handleClassicReplay={handleClassicReplay}
        handleClassicKeyboardSwipe={handleClassicKeyboardSwipe}
        getClassicStackLayout={getClassicStackLayout}
        getPromptImage={getPromptImage}
        getPromptText={getPromptText}
        getAnswerImage={getAnswerImage}
        getAnswerText={getAnswerText}
        handleClassicPointerDown={handleClassicPointerDown}
        handleClassicPointerMove={handleClassicPointerMove}
        handleClassicPointerEnd={handleClassicPointerEnd}
        speakClassicCard={speakClassicCard}
        restartClassicMissed={restartClassicMissed}
        restartClassicAll={restartClassicAll}
      />
    );
  }

  if (testDeck) {
    return (
      <FlashcardTestMode
        ui={flashcardStudyUi}
        testDeck={testDeck}
        testQueue={testQueue}
        testAnswers={testAnswers}
        testCompleted={testCompleted}
        testIndex={testIndex}
        currentTestCard={currentTestCard}
        currentTestOptions={currentTestOptions}
        selectedTestOption={selectedTestOption}
        setTestDeck={setTestDeck}
        setTestQueue={setTestQueue}
        setTestAnswers={setTestAnswers}
        setTestCompleted={setTestCompleted}
        onClose={closeActiveTrainingModeManually}
        handleTestAnswer={handleTestAnswer}
        restartTestMissed={restartTestMissed}
        restartTestAll={restartTestAll}
        getPromptImage={getPromptImage}
        getPromptText={getPromptText}
        getAnswerText={getAnswerText}
      />
    );
  }

  if (gameDeck) {
    return (
      <FlashcardGameMode
        ui={flashcardStudyUi}
        gameDeck={gameDeck}
        gameQueue={gameQueue}
        promptSide={promptSide}
        setGameDeck={setGameDeck}
        setGameQueue={setGameQueue}
        onClose={closeActiveTrainingModeManually}
      />
    );
  }

  return (
      <Container $disableEntryAnimation={skipNextListEntryAnimation}>
        <ArenaHeader
          title="Flashcards"
          count={currentCount}
          onBack={() => onBack && onBack()}
          rightContent={
            <ButtonWrapper onClick={handleCreateClick}>
              <Plus size={18} />
            </ButtonWrapper>
          }
        />

        <FolderBar>
          <FolderScroller>
            <FolderAddButton
              type="button"
              onClick={() => setIsFolderEditorOpen(true)}
            >
              <Plus size={16} />
            </FolderAddButton>
            <FolderChip
              type="button"
              $active={selectedFolderFilter === NO_FOLDER_FILTER_ID}
              onClick={() => setSelectedFolderFilter(NO_FOLDER_FILTER_ID)}
            >
              Foldersiz
            </FolderChip>
            {visibleFolderChips.map((folder) => {
              const folderId = getFolderIdentifier(folder);
              const isActive = selectedFolderFilter === folderId;
              return (
                <FolderChip
                  key={folderId}
                  type="button"
                  $active={isActive}
                  onClick={() => setSelectedFolderFilter(folderId)}
                  title={folder.title || "Folder"}
                >
                  <FolderOpen size={14} />
                  <span>{folder.title || "Folder"}</span>
                </FolderChip>
              );
            })}
          </FolderScroller>
        </FolderBar>

        <InfiniteScroll
          dataLength={filteredDecks.length}
          next={fetchMoreData}
          hasMore={hasMoreFilteredDecks}
          loader={
            <h4
              style={{
                textAlign: "center",
                color: "var(--text-muted-color)",
                marginTop: "16px",
              }}
            >
              Yuklanmoqda...
            </h4>
          }
          style={{ overflow: "visible" }}
        >
          <HeaderRow style={{ marginBottom: "16px" }}>
            <Title style={{ marginBottom: 0, fontSize: "22px" }}>Lug'atlar</Title>
            {selectedFolder ? (
              <HeaderActions>
                {isSelectedOwnFolder ? (
                  <ButtonWrapper
                    onClick={() => setFolderToDelete(selectedFolder)}
                    title="Papkani o'chirish"
                  >
                    <Trash2 size={18} />
                  </ButtonWrapper>
                ) : null}
                <ButtonWrapper
                  onClick={() => setViewingFolder(selectedFolder)}
                  title="Papkani ko'rish"
                >
                  <Eye size={18} />
                </ButtonWrapper>
                <ButtonWrapper
                  onClick={() => handleCopyFolderLink(getFolderIdentifier(selectedFolder))}
                  title="Papka havolasini nusxalash"
                >
                  <Link2 size={18} />
                </ButtonWrapper>
              </HeaderActions>
            ) : null}
          </HeaderRow>
          <Grid>
            {isDeckListLoading && filteredDecks.length === 0
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonCard key={`flashcard-skeleton-${index}`}>
                    <CardTop>
                      <SkeletonBlock $height="20px" $width="56%" />
                      <SkeletonBlock $height="34px" $width="34px" $radius="10px" />
                    </CardTop>
                    <SkeletonBlock $height="14px" $width="44%" />
                    <SkeletonBlock $height="14px" $width="62%" />
                    <CardHint>
                      <SkeletonBlock $height="14px" $width="180px" />
                    </CardHint>
                  </SkeletonCard>
                ))
              : null}
            {filteredDecks.map((deck) => {
              const isOwner =
                (deck.createdBy?._id || deck.createdBy) ===
                (user?._id || user?.id);
              const creatorName = deck.createdBy?.nickname || "Noma'lum";

              return (
                <Card
                  key={deck._id}
                  $raised={openMenuId === deck._id}
                  onClick={() => {
                    setOpenMenuId(null);
                    openTrainingPicker(deck);
                  }}
                >
                  <CardTop>
                    <CardTitle>{deck.title}</CardTitle>
                    <MenuWrap
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <MenuButton
                        onClick={() =>
                          setOpenMenuId((prev) =>
                            prev === deck._id ? null : deck._id,
                          )
                        }
                      >
                        <MoreHorizontal size={16} />
                      </MenuButton>
                      {openMenuId === deck._id && (
                        <MenuDropdown
                          onClick={(event) => event.stopPropagation()}
                        >
                          <MenuItem
                            onClick={() => {
                              void openDeckPreview(deck);
                            }}
                          >
                            <Eye size={14} />
                            Ko'rish
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleCopyLink(deck.urlSlug);
                              setOpenMenuId(null);
                            }}
                          >
                            <Link2 size={14} />
                            Havola nusxalash
                          </MenuItem>
                          {isOwner ? (
                            <>
                              <MenuItem
                                onClick={() => {
                                  setShowMembersForDeck(deck);
                                  setOpenMenuId(null);
                                }}
                              >
                                <Users size={14} />
                                A'zolar
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setEditingDeck(deck);
                                  setOpenMenuId(null);
                                }}
                              >
                                <Pencil size={14} />
                                Tahrirlash
                              </MenuItem>
                              <MenuItem
                                $danger
                                onClick={() => {
                                  setDeckToDelete(deck);
                                  setOpenMenuId(null);
                                }}
                              >
                                <Trash2 size={14} />
                                O'chirish
                              </MenuItem>
                            </>
                          ) : (
                            <MenuItem
                              onClick={() => {
                                onLeave(deck._id);
                                setOpenMenuId(null);
                              }}
                            >
                              <LogOut size={14} />
                              Lug'atdan chiqish
                            </MenuItem>
                          )}
                        </MenuDropdown>
                      )}
                    </MenuWrap>
                  </CardTop>
                  <Meta>Jami so'zlar: {deck.cardCount || deck.cards?.length || 0}</Meta>
                  <Meta>
                    {isOwner ? "Siz yaratgan" : `Muallif: ${creatorName}`}
                  </Meta>
                  <CardHint>
                    <PlayCircle size={14} />
                    Boshlash uchun kartani bosing
                  </CardHint>
                </Card>
              );
            })}
            {!isDeckListLoading && filteredDecks.length === 0 && (
              <Meta>
                {selectedFolderFilter === NO_FOLDER_FILTER_ID
                  ? "Foldersiz lug'atlar hozircha yo'q."
                  : "Bu papkada hozircha lug'at yo'q."}
              </Meta>
            )}
          </Grid>
        </InfiniteScroll>

        {viewingDeck && (
          <FlashcardDeckViewDialog
            ui={flashcardDialogUi}
            viewingDeck={viewingDeck}
            setViewingDeck={setViewingDeck}
            isViewingOwnDeck={isViewingOwnDeck}
            hasJoinedViewingDeck={hasJoinedViewingDeck}
            onJoin={onJoin}
            openTrainingPicker={openTrainingPicker}
          />
        )}

        {viewingFolder && (
          <FlashcardFolderViewDialog
            ui={flashcardDialogUi}
            viewingFolder={viewingFolder}
            setViewingFolder={setViewingFolder}
            isViewingOwnFolder={isViewingOwnFolder}
            hasJoinedViewingFolder={hasJoinedViewingFolder}
            onJoinFolder={onJoinFolder}
            onLeaveFolder={onLeaveFolder}
            onOpenDeck={openDeckFromFolder}
            joiningFolder={joiningFolder}
          />
        )}

        {showMembersForDeck && (
          <FlashcardMembersDialog
            ui={flashcardDialogUi}
            showMembersForDeck={showMembersForDeck}
            setShowMembersForDeck={setShowMembersForDeck}
          />
        )}

        {(isCreateOpen || editingDeck) && (
          <CreateFlashcardDialog
            onClose={() => {
              setIsCreateOpen(false);
              setEditingDeck(null);
            }}
            initialDeck={editingDeck}
            folders={ownedFolders}
          />
        )}

        {isFolderEditorOpen && (
          <Overlay onClick={() => setIsFolderEditorOpen(false)}>
            <Dialog onClick={(event) => event.stopPropagation()}>
              <HeaderRow
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid var(--border-color)",
                }}
              >
                <Title style={{ marginBottom: 0, fontSize: "22px" }}>
                  Yangi folder
                </Title>
                <ButtonWrapper onClick={() => setIsFolderEditorOpen(false)}>
                  <X size={20} />
                </ButtonWrapper>
              </HeaderRow>
              <DialogContent>
                <FieldLabel htmlFor="flashcard-folder-title">Folder nomi</FieldLabel>
                <DirectionSelect
                  as="input"
                  id="flashcard-folder-title"
                  value={folderTitle}
                  onChange={(event) => setFolderTitle(event.target.value)}
                  placeholder="Masalan: IELTS so'zlari"
                />
                <StudyBtn
                  style={{ marginTop: 0 }}
                  onClick={handleSaveFolder}
                  disabled={!folderTitle.trim() || isSavingFolder}
                >
                  <Plus size={18} /> {isSavingFolder ? "Saqlanmoqda..." : "Saqlash"}
                </StudyBtn>
              </DialogContent>
            </Dialog>
          </Overlay>
        )}

        {trainingPickerDeck && (
          <FlashcardTrainingPickerDialog
            ui={flashcardDialogUi}
            trainingPickerDeck={trainingPickerDeck}
            setTrainingPickerDeck={setTrainingPickerDeck}
            promptSide={promptSide}
            setPromptSide={setPromptSide}
            startStudy={startStudy}
            startClassicStudy={startClassicStudy}
            startTestStudy={startTestStudy}
            startGameStudy={startGameStudy}
          />
        )}

        <PremiumUpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          onUpgrade={() => {
            setIsUpgradeModalOpen(false);
            window.location.href = "/premium";
          }}
        />

        <ConfirmDialog
          isOpen={Boolean(deckToDelete)}
          onClose={() => {
            if (!isDeleting) setDeckToDelete(null);
          }}
          title="Lug'atni o'chirish"
          description={`${
            deckToDelete?.title || "Bu lug'at"
          } o'chirilsa, unga tegishli barcha progresslar ham o'chadi. Bu amalni bekor qilib bo'lmaydi.`}
          confirmText={isDeleting ? "O'chirilmoqda..." : "O'chirish"}
          cancelText="Bekor qilish"
          onConfirm={handleDeleteDeck}
          isDanger
        />

        <ConfirmDialog
          isOpen={Boolean(folderToDelete)}
          onClose={() => {
            if (!isDeletingFolder) setFolderToDelete(null);
          }}
          title="Papkani o'chirish"
          description={`${
            folderToDelete?.title || "Bu papka"
          } o'chirilsa, ichidagi barcha lug'atlar, kartalar va progresslar ham o'chadi. Bu amalni bekor qilib bo'lmaydi.`}
          confirmText={isDeletingFolder ? "O'chirilmoqda..." : "O'chirish"}
          cancelText="Bekor qilish"
          onConfirm={handleDeleteFolder}
          isDanger
        />
      </Container>
  );
};

export default FlashcardList;
