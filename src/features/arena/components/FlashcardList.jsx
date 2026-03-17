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
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateFlashcardDialog from "./CreateFlashcardDialog";
import useAuthStore from "../../../store/authStore";
import PremiumUpgradeModal from "../../../app/components/PremiumUpgradeModal";
import ArenaHeader from "./ArenaHeader";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";
import FlashcardReviewMode from "./FlashcardReviewMode";
import FlashcardClassicMode from "./FlashcardClassicMode";
import FlashcardTestMode from "./FlashcardTestMode";
import FlashcardGameMode from "./FlashcardGameMode";
import {
  FlashcardDeckViewDialog,
  FlashcardMembersDialog,
  FlashcardTrainingPickerDialog,
} from "./FlashcardDialogs";

const FLASHCARD_PROMPT_SIDE_STORAGE_KEY = "jamm-flashcard-prompt-side-v1";

// ─── AnimatedShell ─────────────────────────────────────────────────────────
// Animatsiya shu yerda — faqat bir marta mount bo'ladi.
// classicIndex yoki boshqa state o'zgansa qayta render qilmaydi,
// chunki u asosiy ro'yxat sahifasida ekan (classicDeck === null).
const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const AnimatedShell = styled.div`
  display: contents;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    height: 100%;
    animation: ${slideInFromRight} 0.3s ease-out;
  }
`;

// ─── Container ─────────────────────────────────────────────────────────────
// Animatsiyasiz — faqat layout va pozitsiya.
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
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    height: var(--app-height, 100dvh);
    min-height: var(--app-height, 100dvh);
  }
`;

const ClassicTopBar = styled.div`
  display: grid;
  grid-template-columns: 52px 1fr 52px;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  min-height: 64px;
`;

const ClassicTopIconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--border-color) 88%, transparent);
  background: transparent;
  color: var(--text-color);
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
    transform: translateY(-1px);
  }
`;

const ClassicTopCounter = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--text-color);
`;

const ClassicProgressTrack = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  margin: 10px 0 18px;
  background: color-mix(in srgb, var(--secondary-color) 82%, transparent);
  overflow: hidden;
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
  height: calc(100dvh - 110px);
  padding: 0 35px;
  overflow-x: hidden;

  @media (max-width: 768px) {
    height: calc(var(--app-height, 100dvh) - 110px);
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
  position: absolute;
  top: 50%;
  ${(props) => (props.$side === "left" ? "left: 0px;" : "right: 0px;")}
  min-width: 64px;
  min-height: 56px;
  padding: 0 18px;
  border-radius: ${(props) =>
    props.$side === "left" ? "0 999px 999px 0" : "999px 0 0 999px"};
  border: 2px solid
    ${(props) =>
      props.$side === "left"
        ? "color-mix(in srgb, var(--danger-color, #f59e0b) 78%, var(--border-color))"
        : "color-mix(in srgb, var(--success-color, #10b981) 78%, var(--border-color))"};
  background: ${(props) =>
    props.$side === "left"
      ? "color-mix(in srgb, var(--danger-color, #f59e0b) 10%, var(--background-color))"
      : "color-mix(in srgb, var(--success-color, #10b981) 10%, var(--background-color))"};
  color: ${(props) =>
    props.$side === "left"
      ? "var(--danger-color, #f59e0b)"
      : "var(--success-color, #10b981)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 900;
  line-height: 1;
  z-index: 4;
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
        : "rgba(255, 255, 255, 0.04)"};
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
  padding: 20px 0 8px;
  perspective: 1800px;
  perspective-origin: center center;
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
  top: 300px;
  left: 50%;
  width: min(100%, 820px);
  height: min(68vh, 720px);
  min-height: min(68vh, 720px);
  max-height: 100%;
  border-radius: 34px;
  background: color-mix(in srgb, var(--secondary-color) 96%, var(--background-color));
  border: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
  transform: translate(-50%, -50%)
             translate3d(${(props) => props.$offsetX || 0}px, ${(props) => props.$offsetY || 0}px, -100px)
             rotate(${(props) => props.$rotate || 0}deg)
             scale(${(props) => props.$scale || 1});
  opacity: ${(props) => props.$opacity || 1};
  z-index: ${(props) => props.$zIndex || 1};
  pointer-events: none;
  transition: none;

  @media (max-width: 768px) {
    width: min(100%, 820px);
    height: min(64vh, 640px);
    min-height: min(64vh, 640px);
  }
`;

const classicCardSurfaceCss = css`
  border-radius: 30px;
  border: 1px solid
    color-mix(in srgb, var(--border-color) 78%, transparent);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--secondary-color) 94%, var(--background-color)) 0%,
    color-mix(in srgb, var(--tertiary-color) 96%, var(--background-color)) 100%
  );
`;

const ClassicNextPreviewCard = styled.div`
  position: absolute;
  top: 300px;
  left: 50%;
  width: min(100%, 820px);
  height: min(68vh, 720px);
  min-height: min(68vh, 720px);
  max-height: 100%;
  ${classicCardSurfaceCss};
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
  transition: none;

  @media (max-width: 768px) {
    height: min(64vh, 640px);
    min-height: min(64vh, 640px);
    padding: 20px;
  }
`;

const ClassicNextPreviewWord = styled.div`
  max-width: 100%;
  font-size: clamp(30px, 5vw, 60px);
  line-height: 1.08;
  font-weight: 800;
  color: color-mix(in srgb, var(--text-color) 90%, transparent);
  text-align: center;
  word-break: break-word;
  opacity: 0.92;
`;

const ClassicSwipeCard = styled.div`
  position: absolute;
  top: 300px;
  left: 50%;
  width: min(100%, 820px);
  height: min(68vh, 720px);
  min-height: min(68vh, 720px);
  max-height: 100%;
  border-radius: 36px;
  cursor: grab;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  backface-visibility: hidden;

  /* Transform – asosiy harakatlar uchun */
  transform: ${(props) => {
    if (props.$exiting) {
      const exitX = props.$exitDirection === "right" ? "160vw" : "-160vw";
      const exitRotate = props.$exitDirection === "right" ? "35deg" : "-35deg";
      return `translate(-50%, -50%) translate3d(${exitX}, 10vh, 0) rotate(${exitRotate}) scale(0.9)`;
    }

    return `translate(-50%, -50%)
            translate3d(${props.$dragX || 0}px, 0, 0)
            rotate(${((props.$dragX || 0) / 16).toFixed(2)}deg)
            rotateX(${((props.$dragX || 0) / -140).toFixed(2)}deg)
            scale(${props.$dragging ? 1.02 : 1})`;
  }};

  opacity: ${(props) => (props.$exiting ? 0 : 1)};

  /* Transition ni juda ehtiyotkorlik bilan boshqaramiz */
  transition: ${(props) =>
    props.$dragging
      ? "none"                                                // drag paytida hech qanday transition bo‘lmasin
      : props.$exiting
        ? "transform 0.55s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.45s ease-out"
        : props.$isFirst
          ? "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease-out"
          : "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s linear"};

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
  touch-action: pan-y;
  overflow: hidden;
  pointer-events: ${(props) => (props.$exiting ? "none" : "auto")};
  z-index: 6;

  @media (max-width: 768px) {
    height: min(64vh, 640px);
    min-height: min(64vh, 640px);
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
  padding: 28px;
  ${classicCardSurfaceCss};
  transition: transform 0.62s cubic-bezier(0.22, 1, 0.36, 1);
  transform: rotateY(${(props) => (props.$flipped ? 180 : 0)}deg) translateZ(0);
  border: 1px solid
    ${(props) =>
      props.$swipeTone === "success"
        ? `color-mix(in srgb, var(--success-color, #10b981) ${30 + (props.$swipeStrength || 0) * 45}%, var(--border-color))`
        : props.$swipeTone === "danger"
          ? `color-mix(in srgb, var(--danger-color, #ef4444) ${30 + (props.$swipeStrength || 0) * 45}%, var(--border-color))`
          : "color-mix(in srgb, var(--border-color) 78%, transparent)"};
  background: linear-gradient(
    180deg,
    ${(props) =>
        props.$swipeTone === "success"
          ? `color-mix(in srgb, var(--success-color, #10b981) ${10 + (props.$swipeStrength || 0) * 18}%, var(--secondary-color))`
          : props.$swipeTone === "danger"
            ? `color-mix(in srgb, var(--danger-color, #ef4444) ${10 + (props.$swipeStrength || 0) * 18}%, var(--secondary-color))`
            : "color-mix(in srgb, var(--secondary-color) 94%, var(--background-color))"}
      0%,
    ${(props) =>
        props.$swipeTone === "success"
          ? `color-mix(in srgb, var(--success-color, #10b981) ${6 + (props.$swipeStrength || 0) * 14}%, var(--tertiary-color))`
          : props.$swipeTone === "danger"
            ? `color-mix(in srgb, var(--danger-color, #ef4444) ${6 + (props.$swipeStrength || 0) * 14}%, var(--tertiary-color))`
            : "color-mix(in srgb, var(--tertiary-color) 96%, var(--background-color))"}
      100%
  );
  box-shadow: none;
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
  padding: 20px;
  -webkit-transform-style: preserve-3d;
  overflow: hidden;
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
  justify-content: space-between;
  gap: 12px;
  color: color-mix(in srgb, var(--text-color) 92%, transparent);
  position: relative;
  z-index: 2;
  transform: translateZ(6px);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const ClassicCardToolbarSpacer = styled(ClassicCardToolbar)`
  width: 100%;
  align-self: stretch;
  justify-content: flex-start;
  pointer-events: none;
`;

const ClassicToolbarIcon = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--border-color) 78%, transparent);
  background: color-mix(
    in srgb,
    var(--secondary-color) 88%,
    var(--background-color)
  );
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  touch-action: manipulation;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 78%, transparent);
  }
`;

const ClassicCardBody = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 18px 8px;
  position: relative;
  z-index: 1;
  transform: translateZ(8px);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const ClassicCardImage = styled.img`
  max-width: 100%;
  max-height: 220px;
  border-radius: 18px;
  object-fit: contain;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  @media (max-width: 768px) {
    max-height: 180px;
  }
`;

const ClassicCardWord = styled.div`
  max-width: 100%;
  font-size: clamp(36px, 7vw, 74px);
  line-height: 1.05;
  font-weight: 800;
  color: var(--text-color);
  text-align: center;
  word-break: break-word;
  filter: blur(${(props) => `${(props.$blur || 0).toFixed(2)}px`});
  opacity: ${(props) => 1 - (props.$fade || 0) * 0.55};
  transition:
    filter 0.12s ease,
    opacity 0.12s ease;
  text-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(10px);
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
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
  padding: 0 22px;
  flex-shrink: 0;
`;

const ClassicGhostAction = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--border-color) 78%, transparent);
  background: color-mix(in srgb, var(--secondary-color) 84%, transparent);
  color: color-mix(in srgb, var(--text-color) 92%, transparent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 78%, transparent);
  }
`;

const ClassicPrimaryAction = styled(ClassicGhostAction)`
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: var(--primary-color);
  border-color: color-mix(in srgb, var(--primary-color) 78%, transparent);
  color: white;

  &:hover {
    background: color-mix(in srgb, var(--primary-color) 88%, white 12%);
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
  ClassicCardImage,
  ClassicNextPreviewWord,
  ClassicSwipeCard,
  ClassicFlipLayer,
  ClassicCardFront,
  ClassicCardToolbar,
  ClassicCardWord,
  ClassicCardBack,
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

const FlashcardList = ({ initialDeckId, onBack }) => {
  const {
    flashcardDecks,
    flashcardsPage,
    flashcardsHasMore,
    fetchFlashcards,
    reviewFlashcard,
    fetchFlashcardDeck,
    joinFlashcardDeck,
    leaveFlashcardDeck,
    deleteFlashcardDeck,
  } = useArena();
  const user = useAuthStore((state) => state.user);
  const [studyingDeck, setStudyingDeck] = useState(null);
  const [viewingDeck, setViewingDeck] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showingBack, setShowingBack] = useState(false);
  const [showMembersForDeck, setShowMembersForDeck] = useState(null);
  const [joiningDeck, setJoiningDeck] = useState(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null);
  const [deckToDelete, setDeckToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
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
  const [promptSide, setPromptSide] = useState(() => {
    if (typeof window === "undefined") return "front";
    const saved = window.localStorage.getItem(
      FLASHCARD_PROMPT_SIDE_STORAGE_KEY,
    );
    return saved === "back" ? "back" : "front";
  });
  const gameBoardRef = useRef(null);
  const classicPointerStateRef = useRef({
    active: false,
    startX: 0,
    dragStarted: false,
  });
  const speechVoicesRef = useRef([]);

  const isPremium = user?.premiumStatus === "premium";
  const limit = isPremium ? 10 : 4;
  const myDecks = flashcardDecks.filter(
    (deck) =>
      (deck.createdBy?._id || deck.createdBy) === (user?._id || user?.id),
  );
  const currentCount = myDecks.length;

  const handleCreateClick = () => {
    if (currentCount >= limit) {
      if (!isPremium) {
        setIsUpgradeModalOpen(true);
      } else {
        toast.error("Siz maksimal limitga yetgansiz (10/10).");
      }
      return;
    }
    setIsCreateOpen(true);
  };

  const hasFetched = React.useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    if (flashcardDecks.length > 0) {
      hasFetched.current = true;
      return;
    }
    fetchFlashcards(1).finally(() => {
      hasFetched.current = true;
    });
  }, [fetchFlashcards, flashcardDecks.length]);

  const fetchMoreData = () => {
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
        }
      }
    };
    checkDeepLink();
  }, [initialDeckId]);

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
    if (classicIndex === 0 || classicAnswers.length === 0) return;
    const nextAnswers = [...classicAnswers];
    nextAnswers.pop();
    setClassicAnswers(nextAnswers);
    setClassicIndex((prev) => Math.max(prev - 1, 0));
    setClassicShowBack(false);
    setClassicCompleted(false);
    resetClassicCardMotion();
  };

  useEffect(() => {
    if (!classicDeck || classicCompleted) return;
    resetClassicCardMotion();
  }, [classicDeck, classicIndex, classicCompleted]);

  useEffect(() => {
    if (!classicExitDirection) return undefined;
    const timer = window.setTimeout(() => {
      const isLast = classicIndex + 1 >= classicQueue.length;
      if (isLast) {
        setClassicCompleted(true);
      } else {
        setClassicIndex((prev) => prev + 1);
      }
      setClassicShowBack(false);
      resetClassicCardMotion();
    }, 500);
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

    const deltaX = event.clientX - classicPointerStateRef.current.startX;
    if (Math.abs(deltaX) > 8) {
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

    if (Math.abs(deltaX) >= 110) {
      const direction = deltaX > 0 ? "right" : "left";
      const currentCard = classicQueue[classicIndex];
      if (!currentCard) return;
      const known = direction === "right";

      setClassicExitDirection(direction);
      setClassicDragX(deltaX);
      setClassicDragging(false);
      setClassicExitFlipped(classicShowBack);
      setClassicAnswers((prev) => [
        ...prev,
        {
          card: currentCard,
          known,
        },
      ]);
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
    const cappedDepth = Math.min(depth, 6);

    if (cappedDepth === 1) {
      return {
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        zIndex: 5,
      };
    }

    return {
      offsetX: depth % 2 === 0 ? -10 - cappedDepth * 2 : 10 + cappedDepth * 2,
      offsetY: 10 + cappedDepth * 12,
      rotate: depth % 2 === 0 ? -2.6 - cappedDepth * 0.35 : 2.6 + cappedDepth * 0.35,
      scale: Math.max(0.88, 0.97 - cappedDepth * 0.022),
      opacity: Math.max(0.16, 0.78 - cappedDepth * 0.1),
      zIndex: Math.max(1, 5 - cappedDepth),
    };
  };

  const handleDeleteDeck = async () => {
    if (!deckToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteFlashcardDeck(deckToDelete._id);
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
  const currentUserId = user?._id || user?.id || null;
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
        handleClassicReplay={handleClassicReplay}
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
      />
    );
  }

  // ─── Asosiy ro'yxat sahifasi ───────────────────────────────────────────────
  // AnimatedShell faqat shu yerda — bir marta mount bo'ladi.
  // classicIndex o'zgansa bu branch render bo'lmaydi (classicDeck === null),
  // shuning uchun slideInFromRight animatsiyasi qayta ishlamaydi.
  return (
    <AnimatedShell>
      <Container>
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

        <InfiniteScroll
          dataLength={flashcardDecks.length}
          next={fetchMoreData}
          hasMore={flashcardsHasMore}
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
          <Grid>
            {flashcardDecks.map((deck) => {
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
                              setViewingDeck(deck);
                              setOpenMenuId(null);
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
                  <Meta>Jami so'zlar: {deck.cards?.length || 0}</Meta>
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
            {flashcardDecks.length === 0 && (
              <Meta>Sizda hozircha lug'atlar yo'q.</Meta>
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
          />
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
      </Container>
    </AnimatedShell>
  );
};

export default FlashcardList;
