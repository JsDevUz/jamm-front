import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Camera,
  Check,
  Clock3,
  Code2,
  GraduationCap,
  Lock,
  Loader,
  MessageCircle,
  PencilRuler,
  PlayCircle,
  Search,
  Settings,
  Shield,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { APP_LIMITS, getTierLimit, isPremiumUser } from "../../../constants/appLimits";
import axiosInstance from "../../../api/axiosInstance";
import { fetchCourses } from "../../../api/coursesApi";
import { useTheme } from "../../../contexts/ThemeContext";
import usePremiumUpgradeModalStore from "../../../app/store/usePremiumUpgradeModalStore";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import toast from "react-hot-toast";
import { ProfileUtilityPanel } from "../../profile/components";
import useAuthStore from "../../../store/authStore";
import { getCourseNavigationPath } from "../utils/courseNavigation";
import NewSettingsModal from "./NewSettingsModal";

const DEFAULT_COURSE_IMAGE = "/default-course-image.jpg";

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const modalOverlayIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalSurfaceIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const iconPickers = [
  {
    match: /design|ui|ux|figma|brand|creative/i,
    Icon: PencilRuler,
  },
  {
    match: /web|front|back|code|dev|react|js|javascript|typescript|node/i,
    Icon: Code2,
  },
];

const DASHBOARD_CACHE_TTL_MS = 2 * 60 * 1000;
const coursesHomeDashboardCache = new Map();

function getCoursesHomeCache(cacheKey) {
  if (!cacheKey) return null;
  return coursesHomeDashboardCache.get(cacheKey) || null;
}

function setCoursesHomeCache(cacheKey, value) {
  if (!cacheKey) return;
  coursesHomeDashboardCache.set(cacheKey, {
    ...value,
    updatedAt: Date.now(),
  });
}

function formatPhone(value = "") {
  const raw = String(value || "").trim();
  const digits = raw.replace(/\D/g, "");

  if (!digits.length) {
    return "+998";
  }

  let localDigits = digits;
  if (localDigits.startsWith("998")) {
    localDigits = localDigits.slice(3);
  }
  localDigits = localDigits.slice(0, 9);

  let formatted = "+998";
  if (localDigits.length > 0) formatted += ` ${localDigits.slice(0, 2)}`;
  if (localDigits.length > 2) formatted += ` ${localDigits.slice(2, 5)}`;
  if (localDigits.length > 5) formatted += ` ${localDigits.slice(5, 7)}`;
  if (localDigits.length > 7) formatted += ` ${localDigits.slice(7, 9)}`;

  return formatted;
}

function normalizeProfileForm(data = {}) {
  return {
    nickname: data.nickname || "",
    username: data.username || "",
    phone: formatPhone(data.phone),
    avatar: data.avatar || "",
    bio: data.bio || "",
  };
}

function normalizePhoneForPayload(value = "") {
  return String(value || "").replace(/\s/g, "");
}

const PageRoot = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  background: var(--background-color);
`;

const PageInner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: calc(22px + env(safe-area-inset-top, 0px)) 16px 110px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 28px 24px 72px;
  }

  @media (min-width: 1100px) {
    padding: 36px 32px 80px;
  }
`;

const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`;

const HeroIdentity = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 14px;
`;

const HeroAvatar = styled.button`
  width: 54px;
  height: 54px;
  border-radius: 18px;
  overflow: hidden;
  flex-shrink: 0;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #6674ff 0%, #4f5bd5 100%);
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const HeroAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const HeroText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const HeroGreeting = styled.div`
  color: var(--text-color);
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroSubtitle = styled.div`
  color: var(--text-secondary-color);
  font-size: 0.88rem;
  line-height: 1.35;

  @media (min-width: 768px) {
    font-size: 0.95rem;
  }
`;

const SearchButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: var(--secondary-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--primary-color) 38%, var(--border-color));
    color: var(--primary-color);
    background: color-mix(in srgb, var(--secondary-color) 82%, white 18%);
  }
`;

const AccountCard = styled.div`
  border-radius: 18px;
  background: transparent;
  border: none;
  overflow: hidden;
`;

const AccountCardBanner = styled.div`
  height: 118px;
  background: var(--scrollbar-thumb-color);
`;

const AccountCardBody = styled.div`
  padding: 0 16px 16px;
`;

const AccountIdentityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: -26px;
  padding-bottom: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AccountIdentityLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AccountIdentityAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  padding: 4px;
  background: color-mix(in srgb, var(--background-color) 92%, var(--secondary-color));
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.3);
`;

const AccountIdentityAvatarInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  background: linear-gradient(
    160deg,
    color-mix(in srgb, var(--primary-color) 88%, white 12%) 0%,
    color-mix(in srgb, var(--primary-color) 76%, black 24%) 100%
  );
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  font-weight: 800;
`;

const AccountIdentityAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AccountIdentityName = styled.div`
  color: var(--text-color);
  font-size: 0.96rem;
  font-weight: 800;
`;

const AccountActionButton = styled.button`
  border: none;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--primary-color) 88%, white 12%) 0%,
    color-mix(in srgb, var(--primary-color) 78%, black 22%) 100%
  );
  color: #ffffff;
  padding: 10px 14px;
  font-size: 0.84rem;
  font-weight: 800;
  cursor: pointer;
`;

const AccountFieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AccountFieldRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$single ? "1fr" : "minmax(0, 1fr) auto"};
  gap: 12px;
  align-items: center;
  padding: 13px 14px;
  border-radius: 14px;
  background: transparent;
  border: none;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AccountFieldMeta = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AccountFieldLabel = styled.div`
  color: var(--text-color);
  font-size: 0.84rem;
  font-weight: 800;
`;

const AccountFieldValue = styled.div`
  color: var(--text-secondary-color);
  font-size: 0.84rem;
  line-height: 1.5;
`;

const AccountGhostButton = styled.button`
  border: none;
  border-radius: 12px;
  background: color-mix(in srgb, var(--hover-color) 72%, transparent);
  color: var(--text-color);
  padding: 10px 14px;
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 92%, transparent);
    transform: translateY(-1px);
  }
`;

const AccountSection = styled.div`
  margin-top: 18px;
  border-radius: 18px;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AccountSectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AccountSectionTitle = styled.div`
  color: var(--text-color);
  font-size: 0.92rem;
  font-weight: 800;
`;

const AccountSectionText = styled.div`
  color: var(--text-secondary-color);
  font-size: 0.82rem;
  line-height: 1.5;
`;

const AccountSelect = styled.select`
  width: min(240px, 100%);
  height: 42px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
  background: color-mix(in srgb, var(--background-color) 18%, transparent);
  color: var(--text-color);
  padding: 0 12px;
  font-size: 0.84rem;
  font-weight: 700;
  outline: none;
`;

const DangerButton = styled.button`
  align-self: flex-start;
  border: none;
  border-radius: 12px;
  background: color-mix(in srgb, var(--danger-color) 16%, transparent);
  color: color-mix(in srgb, var(--danger-color) 76%, white 24%);
  padding: 10px 14px;
  font-size: 0.84rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: color-mix(in srgb, var(--danger-color) 22%, transparent);
    transform: translateY(-1px);
  }
`;

const InlineProfileEditOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1650;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  @media (max-width: 768px) {
    padding: 10px;
    align-items: stretch;
  }
`;

const InlineProfileEditModal = styled.div`
  width: min(560px, 100%);
  max-height: calc(100vh - 36px);
  border-radius: 22px;
  border: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
  background: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
  color: var(--text-color);
  overflow: hidden;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.42);
  animation: ${modalSurfaceIn} 0.2s ease;

  @media (max-width: 768px) {
    width: 100%;
    max-height: calc(100vh - 20px);
  }
`;

const InlineProfileEditHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
`;

const InlineProfileEditTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
`;

const InlineProfileEditBody = styled.div`
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 18px;
`;

const InlineProfileAvatarWrap = styled.button`
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: none;
  padding: 0;
  margin-bottom: 18px;
  background: none;
  cursor: pointer;
`;

const InlineProfileAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(
    160deg,
    color-mix(in srgb, var(--primary-color) 88%, white 12%) 0%,
    color-mix(in srgb, var(--primary-color) 76%, black 24%) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  font-weight: 800;
  color: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InlineProfileAvatarOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transition: opacity 0.18s ease;

  ${InlineProfileAvatarWrap}:hover & {
    opacity: 1;
  }
`;

const InlineProfileField = styled.div`
  margin-bottom: 14px;
`;

const InlineProfileLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  color: var(--text-muted-color);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const InlineProfileInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  color: var(--text-color);
  padding: 11px 13px;
  font-size: 0.92rem;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const InlineProfileTextarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  color: var(--text-color);
  padding: 11px 13px;
  font-size: 0.92rem;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const InlineProfileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InlineProfileSave = styled.button`
  height: 42px;
  padding: 0 16px;
  border: none;
  border-radius: 12px;
  background: var(--primary-color);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.56 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const InlineProfileStatus = styled.div`
  min-height: 20px;
  color: ${(props) => (props.$error ? "var(--danger-color)" : "var(--success-color)")};
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;

  & + & {
    margin-top: 28px;
  }

  @media (min-width: 768px) {
    gap: 18px;

    & + & {
      margin-top: 40px;
    }
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: var(--text-color);
  font-size: 1.85rem;
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.03em;

  @media (min-width: 768px) {
    font-size: 2.1rem;
  }
`;

const ContinueGrid = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2px 2px 8px;
  margin: 0 -2px;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    gap: 16px;
    padding-bottom: 10px;
  }
`;

const ContinueCard = styled.button`
  width: 320px;
  min-width: 320px;
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 16px;
  background: var(--secondary-color);
  color: inherit;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 0 0 auto;
  cursor: pointer;
  scroll-snap-align: start;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (min-width: 768px) {
    min-height: 190px;
    padding: 18px;
    gap: 16px;
  }
`;

const ContinueHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const ContinueIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: color-mix(in srgb, var(--warning-color) 14%, var(--secondary-color));
  color: var(--warning-color);
`;

const ContinueText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContinueCategory = styled.div`
  color: var(--text-muted-color);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const ContinueName = styled.div`
  color: var(--text-color);
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--border-color) 72%, var(--secondary-color));
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${({ $value }) => `${$value}%`};
  min-width: ${({ $value }) => ($value > 0 ? "22px" : "0px")};
  height: 100%;
  border-radius: inherit;
  background: var(--warning-color);
`;

const ContinueMeta = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  color: var(--text-secondary-color);
  font-size: 0.74rem;
  font-weight: 600;

  @media (max-width: 430px) {
    grid-template-columns: 1fr;
  }
`;

const MetaPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  white-space: nowrap;
`;

const ContinueAction = styled.div`
  margin-top: auto;
  color: var(--warning-color);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const RecommendedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 14px;

  @media (max-width: 430px) {
    gap: 10px;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const RecommendedCard = styled.button`
  width: 100%;
  align-self: start;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: var(--secondary-color);
  color: inherit;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  box-shadow: 0 10px 24px var(--shadow-color, rgba(0, 0, 0, 0.08));
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px var(--shadow-color-strong, rgba(0, 0, 0, 0.12));
  }

  @media (min-width: 768px) {
    gap: 10px;
  }
`;

const CoverFrame = styled.div`
  position: relative;
  aspect-ratio: 1.34;
  min-height: 0;
  overflow: hidden;
  border-radius: 0;
  border: none;
  background: var(--tertiary-color);

  @media (min-width: 768px) {
    aspect-ratio: 1.34;
  }

  @media (max-width: 430px) {
    aspect-ratio: auto;
    height: clamp(104px, 29vw, 132px);
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CoverFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--warning-color);

  svg {
    width: 38px;
    height: 38px;
  }

  @media (max-width: 430px) {
    align-items: flex-start;
    padding-top: 36px;

    svg {
      width: 34px;
      height: 34px;
    }
  }
`;

const CoverBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 5px 9px;
  border-radius: 999px;
  background: var(--warning-color);
  color: white;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  @media (max-width: 430px) {
    top: 8px;
    left: 8px;
    padding: 4px 7px;
    font-size: 0.56rem;
  }
`;

const CoverMeta = styled.div`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: white;
  font-size: 0.76rem;
  font-weight: 700;

  @media (max-width: 430px) {
    left: 8px;
    right: 8px;
    bottom: 8px;
    gap: 5px;
    font-size: 0.7rem;
  }
`;

const CoverMetaPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  max-width: 100%;
  padding: 5px 0;
  border-radius: 999px;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CourseTitle = styled.div`
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0 14px;

  @media (min-width: 768px) {
    font-size: 1.06rem;
    padding: 0 16px;
  }

  @media (max-width: 430px) {
    font-size: 0.92rem;
    padding: 0 10px;
  }
`;

const CourseAuthor = styled.div`
  color: var(--text-secondary-color);
  font-size: 0.82rem;
  line-height: 1.25;
  min-height: 1.1rem;
  padding: 0 14px;

  @media (min-width: 768px) {
    padding: 0 16px;
  }

  @media (max-width: 430px) {
    font-size: 0.74rem;
    padding: 0 10px;
  }
`;

const CourseFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 14px 14px;

  @media (max-width: 430px) {
    flex-direction: row;
    align-items: center;
    gap: 6px;
    padding: 0 10px 10px;
  }

  @media (min-width: 768px) {
    padding: 0 16px 16px;
  }
`;

const RatingRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary-color);
  font-size: 0.82rem;
  font-weight: 700;
`;

const Price = styled.div`
  color: var(--text-color);
  font-size: 0.92rem;
  font-weight: 800;
  white-space: nowrap;
`;

const SkeletonBlock = styled.div`
  width: 100%;
  border-radius: 18px;
  background: linear-gradient(
    90deg,
    var(--secondary-color) 0%,
    var(--hover-color) 50%,
    var(--secondary-color) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.35s linear infinite;
`;

const ContinueSkeleton = styled.div`
  border-radius: 18px;
  border: 1px solid var(--border-color);
  padding: 16px;
  display: flex;
  min-width: 320px;
  height: 160px;
  flex-direction: column;
  gap: 12px;
  background: var(--secondary-color);

  @media (min-width: 768px) {
    min-height: 190px;
    padding: 18px;
  }
`;

const RecommendedSkeleton = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: var(--secondary-color);
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  box-shadow: 0 10px 24px var(--shadow-color, rgba(0, 0, 0, 0.08));
`;

const EmptyCard = styled.div`
  border-radius: 24px;
  border: 1px dashed var(--border-color);
  padding: 18px;
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  font-size: 0.92rem;
  line-height: 1.45;
`;

function pickCourseIcon(category = "", title = "") {
  const target = `${category} ${title}`;
  const found = iconPickers.find((item) => item.match.test(target));
  return found?.Icon || GraduationCap;
}

function formatCompactDuration(seconds, t) {
  const normalized = Math.max(0, Number(seconds || 0));
  if (!normalized) return t("coursesHome.durationUnknown");

  const totalMinutes = Math.max(1, Math.round(normalized / 60));
  if (totalMinutes < 60) {
    return `${totalMinutes}${t("coursesHome.minuteShort")}`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!minutes) {
    return `${hours}${t("coursesHome.hourShort")}`;
  }

  return `${hours}${t("coursesHome.hourShort")} ${minutes}${t("coursesHome.minuteShort")}`;
}

function formatRemainingTime(seconds, remainingLessons, t) {
  const normalized = Math.max(0, Number(seconds || 0));
  if (!normalized) {
    if (remainingLessons <= 0) {
      return t("coursesHome.completed");
    }

    return t("coursesHome.lessonsLeft", { count: remainingLessons });
  }

  const totalMinutes = Math.max(1, Math.round(normalized / 60));
  if (totalMinutes < 60) {
    return t("coursesHome.minutesLeft", { count: totalMinutes });
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!minutes) {
    return t("coursesHome.hoursLeft", { count: hours });
  }

  return t("coursesHome.hoursMinutesLeft", { hours, minutes });
}

function formatPrice(price, accessType, t) {
  const normalizedPrice = Number(price || 0);
  if (accessType === "free_open" || normalizedPrice <= 0) {
    return t("coursesHome.freePrice");
  }

  return `${new Intl.NumberFormat("uz-UZ", {
    maximumFractionDigits: normalizedPrice % 1 === 0 ? 0 : 2,
  }).format(normalizedPrice)} so'm`;
}

function getEntityId(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value._id || value.id || value.userId || "";
}

function formatCreatedDate(value) {
  if (!value) return "Yaqinda";
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return "Yaqinda";
  }
}

function getMemberStatus(course, userId) {
  if (!userId || !course) return "none";
  if (String(getEntityId(course.createdBy || "")) === String(userId)) {
    return "owner";
  }

  const member = Array.isArray(course.members)
    ? course.members.find(
        (item) => String(getEntityId(item?.userId || item)) === String(userId),
      )
    : null;

  return member?.status || "none";
}

function getPublishedLessons(course) {
  return Array.isArray(course?.lessons)
    ? course.lessons.filter((lesson) => (lesson?.status || "published") !== "draft")
    : [];
}

function getLessonDurationSeconds(lesson) {
  const directDuration = Math.max(0, Number(lesson?.durationSeconds || 0));
  const mediaDuration = Array.isArray(lesson?.mediaItems)
    ? lesson.mediaItems.reduce(
        (sum, item) => sum + Math.max(0, Number(item?.durationSeconds || 0)),
        0,
      )
    : 0;

  return Math.max(directDuration, mediaDuration);
}

function hasLessonActivity(lesson) {
  const hasAttendanceProgress =
    Number(lesson?.selfAttendance?.progressPercent || 0) > 0 ||
    lesson?.selfAttendance?.status === "present" ||
    lesson?.selfAttendance?.status === "late";
  const hasHomeworkSubmission = Array.isArray(lesson?.homework?.assignments)
    ? lesson.homework.assignments.some((assignment) => Boolean(assignment?.selfSubmission))
    : false;
  const hasLinkedTestProgress = Array.isArray(lesson?.linkedTests)
    ? lesson.linkedTests.some((test) => {
        const progress = test?.selfProgress;
        return (
          Number(progress?.attemptsCount || 0) > 0 ||
          Number(progress?.percent || 0) > 0 ||
          Boolean(progress?.completedAt)
        );
      })
    : false;

  return hasAttendanceProgress || hasHomeworkSubmission || hasLinkedTestProgress;
}

function toContinueCard(course) {
  const lessons = getPublishedLessons(course);
  if (!lessons.length) return null;

  const progressRows = lessons.map((lesson, index) => ({
    lesson,
    index,
    hasActivity: hasLessonActivity(lesson),
    isUnlocked: lesson?.isUnlocked !== false,
    durationSeconds: getLessonDurationSeconds(lesson),
  }));

  const completedLessons = progressRows.filter((item) => item.hasActivity).length;
  const progressPercent =
    lessons.length > 0
      ? Math.max(4, Math.round((completedLessons / lessons.length) * 100))
      : 0;
  const lastActiveIndex = progressRows.reduce(
    (lastIndex, item) => (item.hasActivity ? item.index : lastIndex),
    -1,
  );
  const resumeEntry =
    progressRows.find(
      (item) => item.isUnlocked && item.index > lastActiveIndex && !item.hasActivity,
    ) ||
    progressRows.find((item) => item.isUnlocked && item.hasActivity) ||
    progressRows.find((item) => item.isUnlocked) ||
    progressRows[0];
  const remainingRows = progressRows.filter((item) => !item.hasActivity);
  const remainingDurationSeconds = remainingRows.reduce(
    (sum, item) => sum + item.durationSeconds,
    0,
  );

  return {
    _id: course._id,
    urlSlug: course.urlSlug,
    title: course.name || course.title,
    category: course.category || "Course",
    gradient: course.gradient || "",
    thumbnailUrl: course.image || DEFAULT_COURSE_IMAGE,
    totalLessons: lessons.length,
    completedLessons,
    progressPercent,
    remainingDurationSeconds,
    remainingLessons: remainingRows.length,
    resumeLessonSlug: resumeEntry?.lesson?.urlSlug || "",
  };
}

function toRecommendedCard(course) {
  const lessons = getPublishedLessons(course);
  const totalDurationSeconds = lessons.reduce(
    (sum, lesson) => sum + getLessonDurationSeconds(lesson),
    0,
  );

  return {
    _id: course._id,
    urlSlug: course.urlSlug,
    title: course.name || course.title,
    category: course.category || "Course",
    gradient: course.gradient || "",
    thumbnailUrl: course.image || DEFAULT_COURSE_IMAGE,
    ownerName: "",
    rating: Number(course.rating || 0),
    ratingCount: Number(
      course.ratingCount || course.membersCount || course.members?.length || 0,
    ),
    price: Number(course.price || 0),
    accessType: course.accessType || "free_request",
    totalLessons: lessons.length,
    totalDurationSeconds,
  };
}

export default function CoursesHomePage() {
  const MODAL_CLOSE_DURATION = 180;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const openPremiumUpgradeModal = usePremiumUpgradeModalStore(
    (state) => state.openPremiumUpgradeModal,
  );
  const currentUser = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);
  const currentUserId = currentUser?._id || currentUser?.id || "";
  const coursesHomeCacheKey = currentUserId || "guest";
  const [dashboard, setDashboard] = useState(() => {
    const cached = getCoursesHomeCache(coursesHomeCacheKey);
    return (
      cached?.dashboard || {
        continueLearning: [],
        recommendedCourses: [],
      }
    );
  });
  const [loading, setLoading] = useState(
    () => !getCoursesHomeCache(coursesHomeCacheKey),
  );
  const [allCourses, setAllCourses] = useState(
    () => getCoursesHomeCache(coursesHomeCacheKey)?.allCourses || [],
  );
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isAccountMobilePanelOpen, setIsAccountMobilePanelOpen] = useState(false);
  const [isAccountSettingsClosing, setIsAccountSettingsClosing] = useState(false);
  const [accountSettingsSection, setAccountSettingsSection] =
    useState("my-account");
  const [profileForm, setProfileForm] = useState(() =>
    normalizeProfileForm(currentUser || {}),
  );
  const [initialProfileForm, setInitialProfileForm] = useState(() =>
    normalizeProfileForm(currentUser || {}),
  );
  const [profileEditLoading, setProfileEditLoading] = useState(false);
  const [profileEditSaving, setProfileEditSaving] = useState(false);
  const [profileEditStatus, setProfileEditStatus] = useState(null);
  const [pendingAvatarFile, setPendingAvatarFile] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState("");
  const avatarInputRef = useRef(null);

  const loadDashboard = useCallback(async ({ showLoader = false } = {}) => {
    if (showLoader) {
      setLoading(true);
    }

    try {
      const response = await fetchCourses(1, 60);
      const courses = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];
      setAllCourses(courses);
      const continueLearning = courses
        .filter((course) => getMemberStatus(course, currentUserId) === "approved")
        .map(toContinueCard)
        .filter(Boolean)
        .slice(0, 8);
      const recommendedCourses = courses
        .map(toRecommendedCard)
        .slice(0, 8);

      const nextDashboard = {
        continueLearning,
        recommendedCourses,
      };

      setDashboard(nextDashboard);
      setCoursesHomeCache(coursesHomeCacheKey, {
        dashboard: nextDashboard,
        allCourses: courses,
      });
    } catch {
      if (!getCoursesHomeCache(coursesHomeCacheKey)) {
        setDashboard({
          continueLearning: [],
          recommendedCourses: [],
        });
      }
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }, [coursesHomeCacheKey, currentUserId]);

  useEffect(() => {
    const cached = getCoursesHomeCache(coursesHomeCacheKey);

    if (cached) {
      setDashboard(cached.dashboard);
      setAllCourses(cached.allCourses || []);
      setLoading(false);

      if (Date.now() - cached.updatedAt < DASHBOARD_CACHE_TTL_MS) {
        return;
      }

      loadDashboard();
      return;
    }

    setDashboard({
      continueLearning: [],
      recommendedCourses: [],
    });
    setAllCourses([]);
    loadDashboard({ showLoader: true });
  }, [coursesHomeCacheKey, loadDashboard]);

  const displayName =
    currentUser?.nickname || currentUser?.username || currentUser?.name || "User";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const settingsMenuItems = [
    { id: "my-account", label: "My Account", icon: Settings },
    { id: "appearance", label: t("profile.tabs.appearance"), icon: Settings },
    { id: "language", label: t("profile.tabs.language"), icon: Search },
    { id: "security", label: t("profile.tabs.security"), icon: BookOpen },
    { id: "premium", label: t("profile.tabs.premium"), icon: Star },
    { id: "support", label: t("profile.tabs.support"), icon: MessageCircle },
    { id: "favorites", label: t("profile.tabs.favorites"), icon: Star },
    { id: "learn", label: t("profile.tabs.learn"), icon: GraduationCap },
  ];
  const isPremiumActive = isPremiumUser(currentUser);
  const createdAtTimeLabel = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString()
    : "Yaqinda";
  const tierCourseLimit = getTierLimit(APP_LIMITS.coursesCreated, currentUser);
  const tierArticleLimit = getTierLimit(APP_LIMITS.articlesPerUser, currentUser);
  const tierGroupLimit = getTierLimit(APP_LIMITS.groupsCreated, currentUser);

  const closeAccountSettings = useCallback(() => {
    setIsAccountSettingsClosing(true);
    window.setTimeout(() => {
      setIsAccountSettingsOpen(false);
      setIsAccountSettingsClosing(false);
    }, MODAL_CLOSE_DURATION);
  }, [MODAL_CLOSE_DURATION]);

  const openProfilePreview = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const handleCourseNavigate = useCallback(
    (course, lessonSlug = "") => {
      const currentUserId = currentUser?._id || currentUser?.id || "";
      navigate(getCourseNavigationPath(course, currentUserId, lessonSlug));
    },
    [currentUser?._id, currentUser?.id, navigate],
  );

  const openAccountSettings = useCallback(() => {
    setIsAccountSettingsClosing(false);
    setIsAccountSettingsOpen(true);
    setIsAccountMobilePanelOpen(false);
  }, []);

  const openProfileEditDialog = useCallback(() => {
    setIsProfileEditOpen(true);
  }, []);

  const handleAccountSectionSelect = useCallback((sectionId) => {
    setAccountSettingsSection(sectionId);
    setIsAccountMobilePanelOpen(true);
  }, []);

  const handleSettingsNavigate = useCallback(
    (to) => {
      closeAccountSettings();
      window.setTimeout(() => navigate(to), MODAL_CLOSE_DURATION);
    },
    [closeAccountSettings, navigate, MODAL_CLOSE_DURATION],
  );

  const handleCopyValue = useCallback(async (value) => {
    try {
      await navigator.clipboard?.writeText?.(value);
    } catch {
      // no-op
    }
  }, []);

  useEffect(() => {
    if (!isProfileEditOpen) return;

    let cancelled = false;

    const loadProfile = async () => {
      setProfileEditLoading(true);
      try {
        const { data } = await axiosInstance.get("/users/me");
        if (cancelled) return;
        const normalized = normalizeProfileForm(data);
        setProfileForm(normalized);
        setInitialProfileForm(normalized);
        setPendingAvatarFile(null);
        setAvatarPreviewUrl("");
        setAuth(data);
      } catch {
        if (cancelled) return;
        const fallback = normalizeProfileForm(currentUser || {});
        setProfileForm(fallback);
        setInitialProfileForm(fallback);
      } finally {
        if (!cancelled) {
          setProfileEditLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [isProfileEditOpen, setAuth]);

  useEffect(
    () => () => {
      if (avatarPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    },
    [avatarPreviewUrl],
  );

  const closeProfileEditDialog = useCallback(() => {
    if (avatarPreviewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }
    setAvatarPreviewUrl("");
    setPendingAvatarFile(null);
    setProfileEditStatus(null);
    setIsProfileEditOpen(false);
  }, [avatarPreviewUrl]);

  const handleProfileFormChange = useCallback((field, value) => {
    setProfileForm((prev) => ({
      ...prev,
      [field]: field === "phone" ? formatPhone(value) : value,
    }));
  }, []);

  const handleProfileAvatarChange = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Fayl hajmi juda katta (maksimum 2MB)");
      return;
    }

    if (avatarPreviewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setPendingAvatarFile(file);
    setAvatarPreviewUrl(objectUrl);
  }, [avatarPreviewUrl]);

  const handleProfileFormSave = useCallback(async () => {
    const payload = {};

    if (profileForm.nickname !== initialProfileForm.nickname) {
      payload.nickname = profileForm.nickname;
    }
    if (profileForm.username !== initialProfileForm.username) {
      payload.username = profileForm.username;
    }
    if ((profileForm.bio || "") !== (initialProfileForm.bio || "")) {
      payload.bio = profileForm.bio || "";
    }
    if (
      normalizePhoneForPayload(profileForm.phone) !==
      normalizePhoneForPayload(initialProfileForm.phone)
    ) {
      payload.phone = normalizePhoneForPayload(profileForm.phone);
    }

    if (
      payload.nickname &&
      (payload.nickname.length < 3 || payload.nickname.length > APP_LIMITS.nicknameChars)
    ) {
      setProfileEditStatus({
        type: "error",
        message: `Nickname 3 tadan ${APP_LIMITS.nicknameChars} tagacha bo'lishi kerak`,
      });
      return;
    }

    if (
      payload.username &&
      !/^[a-zA-Z0-9]{8,30}$/.test(payload.username)
    ) {
      setProfileEditStatus({
        type: "error",
        message: "Username kamida 8 ta harf va raqamdan iborat bo'lishi kerak",
      });
      return;
    }

    if (payload.bio && payload.bio.length > APP_LIMITS.bioChars) {
      setProfileEditStatus({
        type: "error",
        message: `Bio ko'pi bilan ${APP_LIMITS.bioChars} ta belgi bo'lishi kerak`,
      });
      return;
    }

    if (
      Object.prototype.hasOwnProperty.call(payload, "phone") &&
      profileForm.phone &&
      !/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(profileForm.phone)
    ) {
      setProfileEditStatus({
        type: "error",
        message: "Telefon '+998 XX XXX XX XX' formatida bo'lishi kerak",
      });
      return;
    }

    if (!pendingAvatarFile && Object.keys(payload).length === 0) {
      closeProfileEditDialog();
      return;
    }

    setProfileEditSaving(true);
    setProfileEditStatus(null);

    try {
      if (pendingAvatarFile) {
        const formData = new FormData();
        formData.append("file", pendingAvatarFile);
        const { data: avatarData } = await axiosInstance.post(
          "/users/upload-avatar",
          formData,
        );
        payload.avatar = avatarData?.avatar || "";
      }

      const { data } = await axiosInstance.patch("/users/me", payload);
      setAuth(data);
      const normalized = normalizeProfileForm(data);
      setProfileForm(normalized);
      setInitialProfileForm(normalized);
      setPendingAvatarFile(null);
      setProfileEditStatus({ type: "success", message: "Profil saqlandi" });
      window.setTimeout(() => {
        closeProfileEditDialog();
      }, 700);
    } catch (error) {
      const message = Array.isArray(error?.response?.data?.message)
        ? error.response.data.message[0]
        : error?.response?.data?.message || "Tarmoq xatosi yuz berdi";
      setProfileEditStatus({ type: "error", message });
    } finally {
      setProfileEditSaving(false);
    }
  }, [
    closeProfileEditDialog,
    initialProfileForm,
    pendingAvatarFile,
    profileForm,
    setAuth,
  ]);

  const renderAccountSettingsContent = () => {
    if (accountSettingsSection === "appearance") {
      return (
        <AccountSection>
          <AccountSectionHeader>
            <AccountSectionTitle>
              {t("profileUtility.appearance.groupTitle")}
            </AccountSectionTitle>
            <AccountSectionText>
              {t("profileUtility.appearance.groupDescription")}
            </AccountSectionText>
          </AccountSectionHeader>
          <AccountFieldRow>
            <AccountFieldMeta>
              <AccountFieldLabel>
                {t("profileUtility.appearance.themeLabel")}
              </AccountFieldLabel>
              <AccountFieldValue>
                {t("profileUtility.appearance.themeDescription")}
              </AccountFieldValue>
            </AccountFieldMeta>
            <AccountSelect
              value={theme}
              onChange={(event) => toggleTheme(event.target.value)}
            >
              <option value="dark">{t("theme.dark")}</option>
              <option value="light">{t("theme.light")}</option>
            </AccountSelect>
          </AccountFieldRow>
        </AccountSection>
      );
    }

    if (accountSettingsSection === "language") {
      return (
        <AccountSection>
          <AccountSectionHeader>
            <AccountSectionTitle>
              {t("profileUtility.language.groupTitle")}
            </AccountSectionTitle>
            <AccountSectionText>
              {t("profileUtility.language.groupDescription")}
            </AccountSectionText>
          </AccountSectionHeader>
          <AccountFieldRow>
            <AccountFieldMeta>
              <AccountFieldLabel>
                {t("profileUtility.language.languageLabel")}
              </AccountFieldLabel>
              <AccountFieldValue>
                {t("profileUtility.language.languageDescription")}
              </AccountFieldValue>
            </AccountFieldMeta>
            <AccountSelect
              value={i18n.resolvedLanguage || "uz"}
              onChange={(event) => {
                localStorage.setItem("language", event.target.value);
                i18n.changeLanguage(event.target.value);
              }}
            >
              <option value="uz">{t("language.uz")}</option>
              <option value="en">{t("language.en")}</option>
              <option value="ru">{t("language.ru")}</option>
            </AccountSelect>
          </AccountFieldRow>
        </AccountSection>
      );
    }

    if (
      ["security", "premium", "support", "favorites", "learn"].includes(
        accountSettingsSection,
      )
    ) {
      return (
        <ProfileUtilityPanel
          section={accountSettingsSection}
          currentUser={currentUser}
          onBack={() => setAccountSettingsSection("my-account")}
          embedded
        />
      );
    }

    return (
      <>
        <AccountCard>
          <AccountCardBanner />
          <AccountCardBody>
            <AccountIdentityRow>
              <AccountIdentityLeft>
                <AccountIdentityAvatar>
                  <AccountIdentityAvatarInner>
                    {currentUser?.avatar ? (
                      <AccountIdentityAvatarImage
                        src={currentUser.avatar}
                        alt={displayName}
                      />
                    ) : (
                      avatarLetter
                    )}
                  </AccountIdentityAvatarInner>
                </AccountIdentityAvatar>
                <AccountIdentityName>{displayName}</AccountIdentityName>
              </AccountIdentityLeft>
              <AccountActionButton type="button" onClick={openProfileEditDialog}>
                Edit User Profile
              </AccountActionButton>
            </AccountIdentityRow>

            <AccountFieldList>
              <AccountFieldRow $single>
                <AccountFieldMeta>
                  <AccountFieldLabel>Display Name</AccountFieldLabel>
                  <AccountFieldValue>{displayName}</AccountFieldValue>
                </AccountFieldMeta>
              </AccountFieldRow>

              <AccountFieldRow $single>
                <AccountFieldMeta>
                  <AccountFieldLabel>Username</AccountFieldLabel>
                  <AccountFieldValue>
                    {currentUser?.username || currentUser?.nickname || "jamm-user"}
                  </AccountFieldValue>
                </AccountFieldMeta>
              </AccountFieldRow>

              <AccountFieldRow $single>
                <AccountFieldMeta>
                  <AccountFieldLabel>Email</AccountFieldLabel>
                  <AccountFieldValue>
                    {currentUser?.email || "Ko'rsatilmagan"}
                  </AccountFieldValue>
                </AccountFieldMeta>
              </AccountFieldRow>
            </AccountFieldList>
          </AccountCardBody>
        </AccountCard>
      </>
    );
  };

  return (
    <PageRoot>
      <PageInner>
        <HeroHeader>
          <HeroIdentity>
            <HeroAvatar
              type="button"
              aria-label="Open profile preview"
              onClick={openProfilePreview}
            >
              {currentUser?.avatar ? (
                <HeroAvatarImage src={currentUser.avatar} alt={displayName} />
              ) : (
                avatarLetter
              )}
            </HeroAvatar>

            <HeroText>
              <HeroGreeting>{`Salom ${displayName}`}</HeroGreeting>
              <HeroSubtitle>Barchasini bir yerda toping.</HeroSubtitle>
            </HeroText>
          </HeroIdentity>

          <SearchButton
            type="button"
            aria-label="Search courses"
            data-tour="courses-search"
            onClick={() =>
              navigate("/search", {
                state: { backgroundLocation: location, initialTab: "courses" },
              })
            }
          >
            <Search size={20} />
          </SearchButton>
        </HeroHeader>

        <Section>
          <SectionTitle>{t("coursesHome.continueLearning")}</SectionTitle>
          {loading ? (
            <ContinueGrid>
              {Array.from({ length: 4 }).map((_, index) => (
                <ContinueSkeleton key={index}>
                  <ContinueHeader>
                    <SkeletonBlock style={{ height: 42, width: 42, borderRadius: 12, flexShrink: 0 }} />
                    <ContinueText>
                      <SkeletonBlock style={{ height: 18, width: "78%", borderRadius: 8 }} />
                      <SkeletonBlock style={{ height: 10, width: "38%", borderRadius: 8 }} />
                    </ContinueText>
                  </ContinueHeader>
                  <SkeletonBlock style={{ height: 10, borderRadius: 999 }} />
                  <ContinueMeta>
                    <SkeletonBlock style={{ height: 14, width: "88%", borderRadius: 8 }} />
                    <SkeletonBlock style={{ height: 14, width: "74%", borderRadius: 8 }} />
                  </ContinueMeta>
                  <SkeletonBlock style={{ height: 16, width: "42%", borderRadius: 8, marginTop: "auto" }} />
                </ContinueSkeleton>
              ))}
            </ContinueGrid>
          ) : dashboard.continueLearning.length > 0 ? (
            <ContinueGrid>
              {dashboard.continueLearning.map((course) => {
                const Icon = pickCourseIcon(course.category, course.title);
                return (
                  <ContinueCard
                    key={course._id}
                    type="button"
                    onClick={() => handleCourseNavigate(course, course.resumeLessonSlug)}
                  >
                    <ContinueHeader>
                      <ContinueIcon>
                        <Icon size={20} />
                      </ContinueIcon>
                      <ContinueText>
                        <ContinueName>{course.title}</ContinueName>
                        <ContinueCategory>{course.category}</ContinueCategory>
                      </ContinueText>
                    </ContinueHeader>

                    <ProgressTrack>
                      <ProgressFill $value={course.progressPercent || 0} />
                    </ProgressTrack>

                    <ContinueMeta>
                      <MetaPill>
                        <BookOpen size={13} />
                        {t("coursesHome.lessonProgress", {
                          completed: course.completedLessons || 0,
                          total: course.totalLessons || 0,
                        })}
                      </MetaPill>
                      <MetaPill>
                        <Clock3 size={13} />
                        {formatRemainingTime(
                          course.remainingDurationSeconds,
                          course.remainingLessons,
                          t,
                        )}
                      </MetaPill>
                    </ContinueMeta>

                    <ContinueAction>
                      <PlayCircle size={15} />
                      {t("coursesHome.resumeCourse")}
                    </ContinueAction>
                  </ContinueCard>
                );
              })}
            </ContinueGrid>
          ) : (
            <EmptyCard>{t("coursesHome.emptyContinue")}</EmptyCard>
          )}
        </Section>

        <Section>
          <SectionTitle>{t("coursesHome.recommendedForYou")}</SectionTitle>
          {loading ? (
            <RecommendedGrid>
              {Array.from({ length: 4 }).map((_, index) => (
                <RecommendedSkeleton key={index}>
                  <SkeletonBlock style={{ aspectRatio: "1.34", borderRadius: 0 }} />
                  <SkeletonBlock style={{ height: 20, width: "78%", borderRadius: 8, margin: "0 14px" }} />
                  <SkeletonBlock style={{ height: 14, width: "52%", borderRadius: 8, margin: "0 14px" }} />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "0 14px 14px",
                    }}
                  >
                    <SkeletonBlock style={{ height: 14, width: "34%", borderRadius: 8 }} />
                    <SkeletonBlock style={{ height: 16, width: "22%", borderRadius: 8 }} />
                  </div>
                </RecommendedSkeleton>
              ))}
            </RecommendedGrid>
          ) : dashboard.recommendedCourses.length > 0 ? (
            <RecommendedGrid>
              {dashboard.recommendedCourses.map((course, index) => {
                const Icon = pickCourseIcon(course.category, course.title);
                const isNew = index < 2;
                return (
                  <RecommendedCard
                    key={course._id}
                    type="button"
                    onClick={() => handleCourseNavigate(course)}
                  >
                    <CoverFrame $gradient={course.gradient}>
                      {course.thumbnailUrl ? (
                        <CoverImage src={course.thumbnailUrl} alt={course.title} />
                      ) : (
                        <CoverFallback>
                          <Icon size={44} strokeWidth={1.7} />
                        </CoverFallback>
                      )}

                      {isNew ? <CoverBadge>{t("coursesHome.newBadge")}</CoverBadge> : null}

                      <CoverMeta>
                        <CoverMetaPill>
                          <PlayCircle size={14} />
                          {course.totalLessons > 0
                            ? t("coursesHome.lessonCountShort", {
                                count: course.totalLessons,
                              })
                            : t("coursesHome.courseLabel")}
                        </CoverMetaPill>
                        <CoverMetaPill>
                          {formatCompactDuration(course.totalDurationSeconds, t)}
                        </CoverMetaPill>
                      </CoverMeta>
                    </CoverFrame>

                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseAuthor>
                      {course.ownerName || t("coursesHome.unknownInstructor")}
                    </CourseAuthor>
                    <CourseFooter>
                      <RatingRow>
                        <Star
                          size={14}
                          fill="var(--warning-color)"
                          color="var(--warning-color)"
                        />
                        {Number(course.rating || 0).toFixed(1)} ({course.ratingCount || 0})
                      </RatingRow>
                      <Price>
                        {formatPrice(course.price, course.accessType, t)}
                      </Price>
                    </CourseFooter>
                  </RecommendedCard>
                );
              })}
            </RecommendedGrid>
          ) : (
            <EmptyCard>{t("coursesHome.emptyRecommended")}</EmptyCard>
          )}
        </Section>
      </PageInner>

      <NewSettingsModal
        open={isAccountSettingsOpen}
        closing={isAccountSettingsClosing}
        currentUser={currentUser}
        displayName={displayName}
        avatarLetter={avatarLetter}
        settingsMenuItems={settingsMenuItems}
        accountSettingsSection={accountSettingsSection}
        isAccountMobilePanelOpen={isAccountMobilePanelOpen}
        content={renderAccountSettingsContent()}
        onClose={closeAccountSettings}
        onSectionSelect={handleAccountSectionSelect}
        onBackMobile={() => setIsAccountMobilePanelOpen(false)}
        onLogout={() => setIsLogoutConfirmOpen(true)}
      />

      {isProfileEditOpen ? (
        <InlineProfileEditOverlay onClick={closeProfileEditDialog}>
          <InlineProfileEditModal onClick={(event) => event.stopPropagation()}>
            <InlineProfileEditHeader>
              <InlineProfileEditTitle>Profilni tahrirlash</InlineProfileEditTitle>
              <AccountCloseButton type="button" onClick={closeProfileEditDialog}>
                <X size={18} />
              </AccountCloseButton>
            </InlineProfileEditHeader>

            <InlineProfileEditBody>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileAvatarChange}
                style={{ display: "none" }}
              />

              <InlineProfileAvatarWrap
                type="button"
                onClick={() => avatarInputRef.current?.click()}
              >
                <InlineProfileAvatar>
                  {avatarPreviewUrl || profileForm.avatar ? (
                    <img
                      src={avatarPreviewUrl || profileForm.avatar}
                      alt={displayName}
                    />
                  ) : (
                    avatarLetter
                  )}
                </InlineProfileAvatar>
                <InlineProfileAvatarOverlay>
                  <Camera size={18} />
                </InlineProfileAvatarOverlay>
              </InlineProfileAvatarWrap>

              {profileEditLoading ? (
                <InlineProfileStatus>Yuklanmoqda...</InlineProfileStatus>
              ) : (
                <>
                  <InlineProfileField>
                    <InlineProfileLabel>Nickname</InlineProfileLabel>
                    <InlineProfileInput
                      value={profileForm.nickname}
                      onChange={(event) =>
                        handleProfileFormChange("nickname", event.target.value)
                      }
                    />
                  </InlineProfileField>

                  <InlineProfileField>
                    <InlineProfileLabel>Username</InlineProfileLabel>
                    <InlineProfileInput
                      value={profileForm.username}
                      onChange={(event) =>
                        handleProfileFormChange("username", event.target.value)
                      }
                    />
                  </InlineProfileField>

                  <InlineProfileField>
                    <InlineProfileLabel>Telefon</InlineProfileLabel>
                    <InlineProfileInput
                      value={profileForm.phone}
                      onChange={(event) =>
                        handleProfileFormChange("phone", event.target.value)
                      }
                    />
                  </InlineProfileField>

                  <InlineProfileField>
                    <InlineProfileLabel>Bio</InlineProfileLabel>
                    <InlineProfileTextarea
                      value={profileForm.bio}
                      onChange={(event) =>
                        handleProfileFormChange("bio", event.target.value)
                      }
                    />
                  </InlineProfileField>
                </>
              )}

              <InlineProfileActions>
                <InlineProfileSave
                  type="button"
                  disabled={profileEditLoading || profileEditSaving}
                  onClick={handleProfileFormSave}
                >
                  {profileEditSaving ? <Loader size={16} className="spin" /> : <Check size={16} />}
                  Saqlash
                </InlineProfileSave>
                <InlineProfileStatus $error={profileEditStatus?.type === "error"}>
                  {profileEditStatus?.message || ""}
                </InlineProfileStatus>
              </InlineProfileActions>
            </InlineProfileEditBody>
          </InlineProfileEditModal>
        </InlineProfileEditOverlay>
      ) : null}

      <ConfirmDialog
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        title="Hisobdan chiqilsinmi?"
        description="Joriy qurilmadagi sessiya yopiladi va siz login sahifasiga qaytasiz."
        confirmText="Log out"
        cancelText="Bekor qilish"
        isDanger
        onConfirm={() => {
          setIsLogoutConfirmOpen(false);
          logout();
        }}
      />
    </PageRoot>
  );
}
