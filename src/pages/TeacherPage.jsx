import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronDown,
  ClipboardCheck,
  Copy,
  Eye,
  FileText,
  GraduationCap,
  Link2,
  MoreHorizontal,
  LayoutDashboard,
  MessageCircle,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  XCircle,
   CheckCircle2,
  Shield,
  Trash2,
  Type,
  UserX,
  Users,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useCourses } from "../contexts/CoursesContext";
import { useChats } from "../contexts/ChatsContext";
import useAuthStore from "../store/authStore";
import ConfirmDialog from "../shared/ui/dialogs/ConfirmDialog";
import TeacherSidebarExpanded from "../features/navigation/TeacherSidebarExpanded";
import HomeworkSubmissionPlayer from "../features/calls/components/HomeworkSubmissionPlayer";
import {
  createSentenceBuilderShareLink,
  createTestShareLink,
  deleteSentenceBuilderDeck,
  deleteSentenceBuilderShareLink,
  deleteTest,
  deleteTestShareLink,
  fetchMyTests,
  fetchSentenceBuilderResults,
  fetchSentenceBuilderShareLinks,
  fetchSentenceBuilders,
  fetchTestById,
  fetchTestResults,
  fetchTestShareLinks,
} from "../api/arenaApi";
import { RESOLVED_APP_BASE_URL } from "../config/env";
import { APP_LIMITS, isPremiumUser } from "../constants/appLimits";

const MODAL_EXIT_DURATION_MS = 220;

const getTooltipText = (content) => {
  if (content === null || content === undefined || content === false) {
    return undefined;
  }

  if (Array.isArray(content)) {
    const text = content
      .map((item) => getTooltipText(item))
      .filter(Boolean)
      .join(" ")
      .trim();
    return text || undefined;
  }

  if (typeof content === "string" || typeof content === "number") {
    const text = String(content).trim();
    return text || undefined;
  }

  return undefined;
};

const twoLineClamp = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const CreateCourseDialog = lazy(() =>
  import("../features/courses/components").then((module) => ({
    default: module.CreateCourseDialog,
  })),
);
const AddLessonDialog = lazy(() =>
  import("../features/courses/components").then((module) => ({
    default: module.AddLessonDialog,
  })),
);
const TeacherLessonContentWorkspace = lazy(() =>
  import("../features/courses/components/TeacherLessonContentWorkspace"),
);
const CreateSentenceBuilderDialog = lazy(
  () => import("../features/arena/components/CreateSentenceBuilderDialog"),
);
const CreateTestDialog = lazy(
  () => import("../features/arena/components/CreateTestDialog"),
);
const ArenaResultsPane = lazy(
  () => import("../features/arena/components/ArenaResultsPane"),
);
const TestResultsDialog = lazy(
  () => import("../features/arena/components/TestResultsDialog"),
);
const ShareLinksDialog = lazy(
  () => import("../features/arena/components/ShareLinksDialog"),
);

const Shell = styled.div`
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  height: var(--app-height, 100dvh);
  min-height: var(--app-height, 100dvh);
  overflow: hidden;
  background: var(--background-color);

  @media (max-width: 700px) {
    min-height: 0;
  }
`;

const Layout = styled.div`
  height: var(--app-height, 100dvh);
  max-height: var(--app-height, 100dvh);
  width: 100%;
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr);
  align-items: stretch;
  min-width: 0;
  min-height: 0;

  @media (max-width: 700px) {
    height: var(--app-height, 100dvh);
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
    overflow: hidden;
  }
`;

const Panel = styled.div`
  width: 100%;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  min-height: 0;
  height: 100%;
  overflow: hidden;
`;

const Sidebar = styled.div`
  min-width: 0;
  min-height: 0;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;

  @media (max-width: 700px) {
    order: 2;
    height: auto;
  }
`;

const SidebarShell = styled.div`
  min-height: 100%;
  height: 100%;
  display: block;
`;
const SidebarMenu = styled.div`
  min-width: 0;
  min-height: 100%;
  height: 100%;
  display: grid;
`;

const SidebarCard = styled.div`
  min-height: 100%;
  height: 100%;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SidebarCardBody = styled.div`
  padding: 12px;
  display: grid;
  gap: 12px;
  justify-items: center;
`;

const SidebarDivider = styled.div`
  height: 1px;
  background: var(--border-color);
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
`;

const BrandIdentity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 0;
`;

const BrandLogo = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const BrandMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 2px;
`;

const BrandName = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


const MenuGroup = styled.div`
  display: grid;
  gap: 6px;
  width: 100%;
`;

const GroupTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted-color);
  padding: 0 2px;
`;

const ProfileCard = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: auto;
`;

const ProfileAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary-color) 16%, transparent);
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 2px;
`;

const ProfileName = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileSub = styled.div`
  font-size: 11px;
  color: var(--text-muted-color);
`;

const Main = styled(Panel)`
  min-width: 0;
  min-height: 0;
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-self: stretch;
  overflow: hidden;

  @media (max-width: 700px) {
    order: 1;
  }
`;

const MainScroll = styled.div`
  flex: 1 1 0;
  width: 100%;
  height: 100%;
  max-height: 100%;
  min-width: 0;
  min-height: 0;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  display: grid;
  gap: 12px;
  align-content: start;

  @media (max-width: 900px) {
    padding: 12px;
  }

  @media (max-width: 700px) {
    padding:
      calc(12px + env(safe-area-inset-top, 0px))
      max(12px, env(safe-area-inset-right, 0px))
      calc(76px + env(safe-area-inset-bottom, 0px))
      max(12px, env(safe-area-inset-left, 0px));
  }
`;

const CollapseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
  }
`;

const NavList = styled.div`
  display: grid;
  gap: 8px;
  width: 100%;
`;

const SidebarCoursesWrap = styled.div`
  display: grid;
  gap: 8px;
`;

const NavButton = styled.button`
  position: relative;
  width: 100%;
  border: 1px solid ${({ $active }) => ($active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${({ $active }) =>
    $active
      ? "color-mix(in srgb, var(--primary-color) 10%, var(--background-color))"
      : "var(--background-color)"};
  color: ${({ $active }) => ($active ? "var(--text-color)" : "var(--text-secondary-color)")};
  border-radius: 16px;
  padding: ${({ $collapsed }) => ($collapsed ? "12px" : "12px 14px")};
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  gap: ${({ $collapsed }) => ($collapsed ? "0" : "10px")};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  overflow: visible;

  &:hover {
    border-color: var(--primary-color);
    color: var(--text-color);
  }

  ${({ $collapsed }) =>
    $collapsed
      ? `
    &::after {
      content: attr(data-label);
      position: absolute;
      left: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%);
      white-space: nowrap;
      padding: 8px 10px;
      border-radius: 10px;
      background: var(--text-color);
      color: var(--background-color);
      font-size: 12px;
      font-weight: 700;
      opacity: 0;
      pointer-events: none;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
      transition: opacity 0.16s ease;
      z-index: 5;
    }

    &:hover::after {
      opacity: 1;
    }
  `
      : ""}
`;

const NavText = styled.span`
  display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
`;

const NavButtonAside = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  transform: rotate(${({ $expanded }) => ($expanded ? "180deg" : "0deg")});
  transition: transform 0.22s ease;
`;

const CourseAccordion = styled.div`
  display: grid;
  gap: 6px;
  max-height: ${({ $expanded }) => ($expanded ? "420px" : "0")};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  overflow: hidden;
  transition:
    max-height 0.28s ease,
    opacity 0.2s ease;
`;

const CourseAccordionInner = styled.div`
  display: grid;
  gap: 6px;
  padding: 2px 0 0 10px;
  border-left: 1px solid var(--border-color);
  margin-left: 14px;
`;

const CourseAccordionItem = styled.button`
  width: 100%;
  min-height: 38px;
  border: 1px solid ${({ $active }) => ($active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${({ $active }) =>
    $active
      ? "color-mix(in srgb, var(--primary-color) 8%, var(--background-color))"
      : "var(--background-color)"};
  color: ${({ $active }) => ($active ? "var(--text-color)" : "var(--text-secondary-color)")};
  border-radius: 12px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    color: var(--text-color);
    transform: translateX(2px);
  }
`;

const CourseAccordionTitle = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 700;
`;

const CourseAccordionMeta = styled.span`
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted-color);
`;

const RailButton = styled.button`
  position: relative;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? "var(--primary-color)" : "transparent")};
  background: ${({ $active }) =>
    $active
      ? "color-mix(in srgb, var(--primary-color) 12%, transparent)"
      : "transparent"};
  color: ${({ $active }) => ($active ? "var(--primary-color)" : "var(--text-secondary-color)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
  }

  &::after {
    content: attr(data-label);
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    padding: 8px 10px;
    border-radius: 10px;
    background: var(--text-color);
    color: var(--background-color);
    font-size: 12px;
    font-weight: 700;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
    transition: opacity 0.16s ease;
    z-index: 6;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const StatGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content:'space-between'
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  flex: 1 0 auto;
`;

const StatIconSlot = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted-color);
  flex-shrink: 0;
`;

const StatCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const StatLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 900;
  line-height: 1.1;
  color: var(--text-color);
`;

const StatSub = styled.div`
  font-size: 11px;
  color: var(--text-secondary-color);
`;

const SectionCard = styled.div`
  padding: 14px;
  border-radius: 14px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  display: grid;
  gap: 10px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const PageTitleBlock = styled.div`
  display: grid;
  gap: 8px;
`;

const PageTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 800;
  color: var(--text-color);

  @media (max-width: 720px) {
    font-size: 18px;
  }
`;

const PageDescription = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted-color);
  max-width: 780px;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PrimaryButton = styled.button`
  border: none;
  background: var(--primary-color);
  color: white;
  border-radius: 12px;
  padding: 11px 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.92;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GhostButton = styled.button`
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary-color);
  border-radius: 12px;
  padding: 11px 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DangerButton = styled(GhostButton)`
  color: var(--danger-color);

  &:hover {
    color: var(--danger-color);
    background: color-mix(in srgb, var(--danger-color) 8%, transparent);
  }
`;

const SearchWrap = styled.div`
  position: relative;
`;

const SearchIconWrap = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted-color);
  display: flex;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 14px 0 40px;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: var(--text-muted-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`;

const GridTwo = styled.div`
  display: grid;
  grid-template-columns: ${({ $left }) => $left || "minmax(320px, 380px) minmax(0, 1fr)"};
  gap: 12px;
  min-height: 0;
  align-items: start;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

const Stack = styled.div`
  display: grid;
  gap: 8px;
  min-height: 0;
`;

const FillPane = styled.div`
  min-width: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 960px) {
    min-height: 0;
    display: block;
    overflow: auto;
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 14px;
`;

const CourseShowcaseCard = styled.button`
  position: relative;
  width: 100%;
  border: 1px solid ${({ $active }) => ($active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${({ $active }) =>
    $active
      ? "color-mix(in srgb, var(--primary-color) 8%, var(--background-color))"
      : "var(--background-color)"};
  border-radius: 20px;
  padding: 16px 10px;
  text-align: left;
  display: grid;
  gap: 14px;
  cursor: pointer;

  &:hover {
    border-color: var(--primary-color);
  }
`;

const CourseShowcaseMedia = styled.div`
  position: relative;
  height: 190px;
  width: calc(100% + 20px);
  margin: -16px -10px 0;
  border-radius: 20px 20px 0px 0px;
  overflow: hidden;
  background: var(--secondary-color);
  border-bottom: 1px solid var(--border-color);
`;

const CourseShowcaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CourseShowcaseFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--primary-color) 10%, var(--secondary-color));
  color: var(--primary-color);
  font-size: 28px;
  font-weight: 900;
`;

const CourseImageBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 700;
  background: color-mix(in srgb, var(--background-color) 84%, transparent);
  backdrop-filter: blur(8px);
  color: var(--text-color);
  border: 1px solid var(--border-color);
`;

const CourseMenuButton = styled.button`
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--background-color) 88%, var(--secondary-color));
  color: ${({ $tone }) =>
    $tone === "danger" ? "var(--danger-color)" : "var(--text-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow:
    0 10px 24px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition:
    border-color 0.18s ease,
    color 0.18s ease,
    background 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    border-color: ${({ $tone }) =>
      $tone === "danger" ? "var(--danger-color)" : "var(--primary-color)"};
    color: ${({ $tone }) =>
      $tone === "danger" ? "var(--danger-color)" : "var(--primary-color)"};
    background: ${({ $tone }) =>
      $tone === "danger"
        ? "color-mix(in srgb, var(--danger-color) 10%, var(--background-color))"
        : "color-mix(in srgb, var(--primary-color) 10%, var(--background-color))"};
    transform: translateY(-1px);
    box-shadow:
      0 14px 28px rgba(15, 23, 42, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow:
      0 10px 24px rgba(15, 23, 42, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
`;

const CourseShowcaseTop = styled.div`
  display: grid;
  gap: 8px;
`;

const CourseShowcaseTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  line-height: 1.3;
  color: var(--text-color);
`;

const CourseShowcaseDescription = styled.div`
  font-size: 13px;
  line-height: 1.55;
  color: var(--text-muted-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CourseShowcaseMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CourseMetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 700;
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  border: 1px solid var(--border-color);
`;

const CourseMetricsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  gap: 8px;
`;

const CourseMetric = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  font-size: 12px;
  font-weight: 700;
`;

const CourseLessonPreview = styled.div`
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  border-radius: 16px;
  padding: 12px;
  display: grid;
  gap: 4px;
`;

const CourseLessonPreviewTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`;

const ListCard = styled.button`
  width: 100%;
  border: 1px solid ${({ $active }) => ($active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${({ $active }) => ($active ? "var(--secondary-color)" : "var(--background-color)")};
  border-radius: 12px;
  padding: 10px 12px;
  text-align: left;
  display: grid;
  gap: 6px;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: var(--primary-color);
    background: var(--secondary-color);
  }
`;

const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: var(--text-color);
`;

const CardMeta = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.5;
`;

const MiniGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const MiniStat = styled.div`
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  border-radius: 8px;
  padding: 3px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MiniLabel = styled.div`
  font-size: 11px;
  color: var(--text-muted-color);
`;

const MiniValue = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: var(--text-color);
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  gap: 8px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $tone }) => {
    if ($tone === "warning") {
      return "color-mix(in srgb, var(--warning-color) 10%, transparent)";
    }
    if ($tone === "success") {
      return "color-mix(in srgb, var(--success-color, #43b581) 10%, transparent)";
    }
    if ($tone === "danger") {
      return "color-mix(in srgb, var(--danger-color) 10%, transparent)";
    }
    return "color-mix(in srgb, var(--primary-color) 10%, transparent)";
  }};
  color: ${({ $tone }) => {
    if ($tone === "warning") return "var(--warning-color)";
    if ($tone === "success") return "var(--success-color, #43b581)";
    if ($tone === "danger") return "var(--danger-color)";
    return "var(--primary-color)";
  }};
`;

const EmptyState = styled.div`
  padding: 24px;
  border: 1px dashed var(--border-color);
  border-radius: 18px;
  background: var(--background-color);
  display: grid;
  gap: 8px;
`;

const EmptyTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: var(--text-color);
`;

const EmptyText = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-muted-color);
`;

const InlineLoading = styled.div`
  padding: 24px;
  font-size: 14px;
  color: var(--text-muted-color);
`;

const ScrollArea = styled.div`
  max-height: ${({ $height }) => $height || "460px"};
  overflow-y: auto;
  padding-right: 2px;
`;

const StudentTableCard = styled.div`
  width: 100%;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 100%;
  border-radius: 22px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  overflow: ${({ $noClip }) => ($noClip ? "visible" : "hidden")};
  display: flex;
  flex-direction: column;
  align-self: start;

  @media (max-width: 960px) {
    flex: 0 0 auto;
    min-height: 0;
    overflow: visible;
  }
`;

const StudentTableHeader = styled.div`
  flex: 0 0 auto;
  min-width: 0;
  overflow: hidden;
  padding: 12px 18px;
  border-bottom: 1px solid var(--border-color);
  border-radius: 22px 22px 0 0;
  display: grid;
  gap: 8px;

  @media (max-width: 960px) {
    overflow: visible;
    padding: 14px;
  }
`;

const StudentTableToolbar = styled.div`
  min-width: 0;
  display: grid;
  gap: 12px;
`;

const StudentTableInfo = styled.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`;

const StudentTableControls = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 240px);
  align-items: center;
  gap: 12px;
  min-width: 0;

  @media (max-width: 1180px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const StudentTableTitle = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: var(--text-color);
`;

const StudentTableSubtitle = styled.div`
  font-size: 12px;
  line-height: 1.45;
  color: var(--text-muted-color);
`;

const StudentSearchWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  min-width: 0;
`;

const StudentFilterSelect = styled.select`
  width: 100%;
  height: 44px;
  min-width: 0;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 40px 0 14px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, var(--text-muted-color) 50%),
    linear-gradient(135deg, var(--text-muted-color) 50%, transparent 50%);
  background-position:
    calc(100% - 18px) calc(50% - 2px),
    calc(100% - 12px) calc(50% - 2px);
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const StudentSearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted-color);
  display: flex;
`;

const StudentSearchInput = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 16px 0 44px;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: var(--text-muted-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`;

const StudentTableScroll = styled.div`
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: auto;

  @media (max-width: 960px) {
    flex: 0 0 auto;
    min-height: auto;
    overflow: visible;
  }
`;

const StudentTableGrid = styled.div`
  min-width: ${({ $scoreboard }) => ($scoreboard ? "1700px" : "1020px")};
  display: grid;

  @media (max-width: 960px) {
    min-width: 0;
  }
`;

const StudentTableHeadRow = styled.div`
  display: grid;
  grid-template-columns: ${({ $scoreboard, $withActions }) =>
    $scoreboard
      ? "minmax(240px, 1.3fr) minmax(190px, 1.05fr) repeat(5, minmax(112px, 0.6fr)) 120px 145px 120px 120px 84px"
      : $withActions
      ? "minmax(280px, 1.6fr) minmax(240px, 1.45fr) 150px 180px 140px 140px 94px"
      : "minmax(280px, 1.6fr) minmax(240px, 1.45fr) 150px 180px 140px 140px"};
  gap: 18px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--secondary-color) 55%, transparent);

  @media (max-width: 960px) {
    display: none;
  }
`;

const StudentTableHeadCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary-color);
`;

const StudentCountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 800;
`;

const StudentTableBody = styled.div`
  display: grid;

  @media (max-width: 960px) {
    gap: 12px;
    padding: 12px 12px 18px;
  }
`;

const ArenaTeacherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
  align-items: start;
  align-content: start;
  justify-content: start;
`;

const ArenaTeacherCard = styled.button`
  position: relative;
  z-index: ${({ $raised }) => ($raised ? 12 : 1)};
  width: 100%;
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  border-radius: 22px;
  padding: 20px;
  display: grid;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const ArenaTeacherCardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const ArenaTeacherMenuWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const ArenaTeacherMenuButton = styled.button`
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

const ArenaTeacherMenuDropdown = styled.div`
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

const ArenaTeacherMenuItem = styled.button`
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${({ $danger }) =>
    $danger ? "rgba(239, 68, 68, 0.08)" : "transparent"};
  color: ${({ $danger }) => ($danger ? "#ef4444" : "var(--text-color)")};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ $danger }) =>
      $danger ? "rgba(239, 68, 68, 0.12)" : "var(--tertiary-color)"};
  }
`;

const ArenaTeacherCardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--text-color);
`;

const ArenaTeacherCardDesc = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`;

const ArenaTeacherMeta = styled.div`
  color: var(--text-muted-color);
  font-size: 13px;
`;

const ArenaTeacherHint = styled.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
`;

const ArenaTeacherEmpty = styled.div`
  border: 1px dashed var(--border-color);
  border-radius: 22px;
  padding: 46px 24px;
  text-align: center;
  color: var(--text-muted-color);
  background: color-mix(in srgb, var(--secondary-color) 40%, transparent);
`;

const ArenaTeacherPane = styled.div`
  min-width: 0;
  min-height: 0;
  display: block;
`;

const ArenaTeacherBody = styled.div`
  padding: 18px;
  overflow: visible;
  display: grid;
  align-content: start;

  @media (max-width: 900px) {
    padding: 14px;
  }
`;

const StudentTableRow = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ $scoreboard, $withActions }) =>
    $scoreboard
      ? "minmax(240px, 1.3fr) minmax(190px, 1.05fr) repeat(5, minmax(112px, 0.6fr)) 120px 145px 120px 120px 84px"
      : $withActions
      ? "minmax(280px, 1.6fr) minmax(240px, 1.45fr) 150px 180px 140px 140px 94px"
      : "minmax(280px, 1.6fr) minmax(240px, 1.45fr) 150px 180px 140px 140px"};
  gap: 18px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-color);
  background: transparent;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: color-mix(in srgb, var(--primary-color) 5%, transparent);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    padding: 14px;
    border: 1px solid var(--border-color);
    border-radius: 18px;
    background: var(--background-color);

    &:last-child {
      border-bottom: 1px solid var(--border-color);
    }
  }
`;

const StudentCell = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;

  @media (max-width: 960px) {
    width: 100%;

    &[data-label] {
      display: grid;
      grid-template-columns: minmax(92px, auto) minmax(0, 1fr);
      align-items: start;
      gap: 10px;
    }

    &[data-label]::before {
      content: attr(data-label);
      padding-top: 2px;
      font-size: 11px;
      font-weight: 800;
      line-height: 1.4;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--text-muted-color);
    }
  }
`;

const StudentIdentity = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StudentAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  overflow: hidden;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.04em;
  border: 1px solid color-mix(in srgb, white 18%, transparent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
  background: ${({ $seed }) => {
    const colors = [
      "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
      "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
      "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
      "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)",
      "linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)",
      "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    ];
    return colors[Math.abs(Number($seed || 0)) % colors.length];
  }};
`;

const StudentAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StudentMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`;

const StudentName = styled.div.attrs((props) => ({
  title: getTooltipText(props.children),
}))`
  font-size: 15px;
  font-weight: 800;
  color: var(--text-color);
  line-height: 1.35;
  ${twoLineClamp}
`;

const StudentSubline = styled.div.attrs((props) => ({
  title: getTooltipText(props.children),
}))`
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.45;
  ${twoLineClamp}
`;

const CourseCellWrap = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CourseMiniThumb = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
`;

const CourseMiniImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CourseCellMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`;

const CourseCellTitle = styled.div.attrs((props) => ({
  title: getTooltipText(props.children),
}))`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.35;
  ${twoLineClamp}
`;

const CourseCellSub = styled.div.attrs((props) => ({
  title: getTooltipText(props.children),
}))`
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.45;
  ${twoLineClamp}
`;

const ProgressCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProgressRing = styled.svg`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  transform: rotate(-90deg);
`;

const ProgressValue = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: var(--text-color);
`;

const ScoreCellValue = styled.div`
  display: grid;
  gap: 3px;
`;

const ScoreCellMain = styled.span`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
`;

const ScoreCellHint = styled.span`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
`;

const TariffPill = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  font-size: 12px;
  font-weight: 700;
`;

const DateCellText = styled.div.attrs((props) => ({
  title: getTooltipText(props.children),
}))`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary-color);
  line-height: 1.45;
  ${twoLineClamp}
`;

const CellValue = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: var(--text-color);
`;

const TableEmptyState = styled.div`
  padding: 28px 18px;
  font-size: 14px;
  color: var(--text-muted-color);

  @media (max-width: 960px) {
    padding: 8px 4px 2px;
  }
`;

const CourseTableGrid = styled.div`
  min-width: 980px;
  display: grid;

  @media (max-width: 960px) {
    min-width: 0;
  }
`;

const CourseTableHeadRow = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 1.7fr) 170px 120px 130px 130px 140px 76px;
  gap: 18px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--secondary-color) 55%, transparent);

  @media (max-width: 960px) {
    display: none;
  }
`;

const CourseTableHeadCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary-color);
`;

const CourseTableBody = styled.div`
  display: grid;

  @media (max-width: 960px) {
    gap: 12px;
    padding: 12px;
  }
`;

const CourseTableRow = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(320px, 1.7fr) 170px 120px 130px 130px 140px 76px;
  gap: 18px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-color);
  background: ${({ $active }) =>
    $active
      ? "color-mix(in srgb, var(--primary-color) 6%, transparent)"
      : "transparent"};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: color-mix(in srgb, var(--primary-color) 5%, transparent);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    padding: 14px;
    border: 1px solid var(--border-color);
    border-radius: 18px;
    background: ${({ $active }) =>
      $active
        ? "color-mix(in srgb, var(--primary-color) 8%, var(--background-color))"
        : "var(--background-color)"};

    &:last-child {
      border-bottom: 1px solid var(--border-color);
    }
  }
`;

const CourseTableCell = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;

  @media (max-width: 960px) {
    width: 100%;

    &[data-label] {
      display: grid;
      grid-template-columns: minmax(92px, auto) minmax(0, 1fr);
      align-items: start;
      gap: 10px;
    }

    &[data-label]::before {
      content: attr(data-label);
      padding-top: 2px;
      font-size: 11px;
      font-weight: 800;
      line-height: 1.4;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--text-muted-color);
    }
  }
`;

const CourseIdentity = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CourseTableThumb = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  color: var(--primary-color);
  font-size: 18px;
  font-weight: 900;
`;

const CourseTableImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CourseIdentityMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`;

const CourseIdentityTitle = styled.div.attrs((props) => ({
  title: getTooltipText(props.children),
}))`
  font-size: 16px;
  font-weight: 800;
  color: var(--text-color);
  line-height: 1.35;
  ${twoLineClamp}
`;

const CourseIdentitySub = styled.div.attrs((props) => ({
  title: getTooltipText(props.children),
}))`
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.45;
  ${twoLineClamp}
`;

const CourseMetricText = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`;

const CourseAccessPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  font-size: 12px;
  font-weight: 700;
`;

const CourseTableCard = styled(StudentTableCard)``;

const TableHeaderTop = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CourseActionCell = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 960px) {
    justify-content: flex-start;
    padding-top: 4px;
  }
`;

const StudentModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(10, 14, 22, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition:
    opacity ${MODAL_EXIT_DURATION_MS}ms ease,
    backdrop-filter ${MODAL_EXIT_DURATION_MS}ms ease;
`;

const StudentModalPanel = styled.div`
  width: min(100%, 980px);
  max-height: min(92vh, 980px);
  overflow: auto;
  border-radius: 28px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.24);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "14px")})
    scale(${({ $visible }) => ($visible ? 1 : 0.985)});
  transition:
    opacity ${MODAL_EXIT_DURATION_MS}ms ease,
    transform ${MODAL_EXIT_DURATION_MS}ms ease;
`;

const StudentModalHeader = styled.div`
  padding: 24px;
  display: grid;
  gap: 20px;
  border-bottom: 1px solid var(--border-color);
`;

const StudentModalTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const StudentModalIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
  width: 100%;
`;

const StudentModalAvatar = styled(StudentAvatar)`
  width: 96px;
  height: 96px;
  font-size: 32px;
`;

const StudentModalMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 8px;
  width: 100%;
`;

const StudentModalMetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
  color: var(--text-muted-color);
`;

const StudentModalStatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 800;
`;

const StudentModalName = styled.h3`
  margin: 0;
  font-size: 44px;
  line-height: 1;
  font-weight: 900;
  color: var(--text-color);

  @media (max-width: 760px) {
    font-size: 32px;
  }
`;

const StudentModalNameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-width: 0;

  @media (max-width: 760px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const StudentModalSubline = styled.div`
  font-size: 15px;
  color: var(--text-muted-color);
`;

const StudentModalClose = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
    border-color: var(--primary-color);
  }
`;

const StudentModalActions = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
`;

const StudentModalPrimaryAction = styled.button`
  min-height: 40px;
  width: fit-content;
  border-radius: 14px;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    opacity: 0.94;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const StudentModalSecondaryAction = styled.button`
  height: 56px;
  border-radius: 18px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
    border-color: var(--primary-color);
  }
`;

const StudentModalBody = styled.div`
  padding: 24px;
  display: grid;
  gap: 20px;
`;

const LessonContentModalPanel = styled(StudentModalPanel)`
  width: min(100%, 1240px);
  height: calc(100vh - 20px);
  max-height: calc(100vh - 20px);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  overflow: hidden;
  background: var(--background-color);
`;

const LessonContentModalHeader = styled.div`
  padding: 18px 22px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const LessonContentModalMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`;

const LessonContentModalEyebrow = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const LessonContentModalTitle = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: var(--text-color);
  line-height: 1.15;
`;

const LessonContentModalSubline = styled.div`
  font-size: 13px;
  color: var(--text-secondary-color);
`;

const LessonContentModalBody = styled.div`
  min-height: 0;
  overflow: auto;
  background: var(--background-color);
`;

const LessonMasteryPanel = styled.div`
  padding: 20px 22px 24px;
  display: grid;
  gap: 18px;
`;

const LessonMasteryIntro = styled.div`
  display: grid;
  gap: 6px;
`;

const LessonMasteryTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: var(--text-color);
`;

const LessonMasteryText = styled.div`
  font-size: 13px;
  color: var(--text-secondary-color);
`;

const LessonMasteryTable = styled.div`
  min-width: 1010px;
  display: grid;
`;

const LessonMasteryHead = styled.div`
  display: grid;
  grid-template-columns: minmax(230px, 1.45fr) 120px 150px 140px 130px 130px 120px;
  gap: 16px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--secondary-color) 55%, transparent);
`;

const LessonMasteryRow = styled.div`
  display: grid;
  grid-template-columns: minmax(230px, 1.45fr) 120px 150px 140px 130px 130px 120px;
  gap: 16px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const LessonMasteryCell = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
`;

const LessonMasteryAction = styled.button`
  height: 38px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`;

const StudentModalTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StudentModalTab = styled.button`
  border-radius: 18px;
  border: 1px solid ${({ $active }) => ($active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${({ $active }) =>
    $active
      ? "color-mix(in srgb, var(--primary-color) 10%, transparent)"
      : "var(--secondary-color)"};
  color: ${({ $active }) => ($active ? "var(--primary-color)" : "var(--text-secondary-color)")};
  padding: 12px 18px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
`;

const StudentModalSection = styled.div`
  display: grid;
  gap: 12px;
`;

const CourseModalLessonList = styled.div`
  display: grid;
  gap: 12px;
`;

const CourseModalLessonCard = styled.div`
  border: 1px solid var(--border-color);
  background: var(--background-color);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CourseModalLessonMain = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`;

const CourseModalLessonIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 16px;
  border: 1px solid
    ${({ $status }) =>
      $status === "published"
        ? "color-mix(in srgb, var(--success-color, #43b581) 42%, var(--border-color))"
        : "color-mix(in srgb, var(--warning-color) 42%, var(--border-color))"};
  background: ${({ $status }) =>
    $status === "published"
      ? "color-mix(in srgb, var(--success-color, #43b581) 10%, transparent)"
      : "color-mix(in srgb, var(--warning-color) 10%, transparent)"};
  color: ${({ $status }) =>
    $status === "published"
      ? "var(--success-color, #43b581)"
      : "var(--warning-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CourseModalLessonMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`;

const CourseModalLessonOrder = styled.div`
  font-size: 13px;
  color: var(--text-muted-color);
`;

const CourseModalLessonTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: var(--text-color);
`;

const CourseModalLessonSubline = styled.div`
  font-size: 14px;
  color: var(--text-secondary-color);
`;

const CourseModalLessonActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 760px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const StudentModalSectionTitle = styled.div`
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--text-muted-color);
  text-transform: uppercase;
`;

const StudentInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const StudentInfoCard = styled.div`
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  border-radius: 20px;
  padding: 18px;
  display: grid;
  gap: 6px;
`;

const StudentInfoLabel = styled.div`
  font-size: 13px;
  color: var(--text-muted-color);
`;

const StudentInfoValue = styled.div`
  font-size: 17px;
  font-weight: 800;
  color: var(--text-color);
  word-break: break-word;
`;

const StudentTimelineHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 800;
  color: var(--text-secondary-color);
`;

const StudentTimelineCard = styled.div`
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  border-radius: 22px;
  padding: 18px;
  display: grid;
  gap: 16px;
`;

const StudentLessonList = styled.div`
  display: grid;
  gap: 12px;
`;

const StudentLessonCard = styled.div`
  border: 1px solid var(--border-color);
  background: var(--background-color);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StudentLessonMain = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`;

const StudentLessonStatusIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid
    ${({ $status }) =>
      $status === "completed"
        ? "color-mix(in srgb, var(--success-color, #43b581) 50%, var(--border-color))"
        : $status === "current"
          ? "color-mix(in srgb, var(--primary-color) 50%, var(--border-color))"
          : "var(--border-color)"};
  color: ${({ $status }) =>
    $status === "completed"
      ? "var(--success-color, #43b581)"
      : $status === "current"
        ? "var(--primary-color)"
        : "var(--text-muted-color)"};
  background: ${({ $status }) =>
    $status === "completed"
      ? "color-mix(in srgb, var(--success-color, #43b581) 10%, transparent)"
      : $status === "current"
        ? "color-mix(in srgb, var(--primary-color) 10%, transparent)"
        : "var(--secondary-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StudentLessonMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`;

const StudentLessonModule = styled.div`
  font-size: 13px;
  color: var(--text-muted-color);
`;

const StudentLessonTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: var(--text-color);
`;

const StudentLessonStatusText = styled.div`
  font-size: 14px;
  color: var(--text-secondary-color);
`;

const StudentLessonAside = styled.div`
  display: grid;
  gap: 10px;
  justify-items: end;

  @media (max-width: 760px) {
    width: 100%;
    justify-items: start;
  }
`;

const StudentLessonBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  background: ${({ $status }) =>
    $status === "current"
      ? "color-mix(in srgb, var(--primary-color) 12%, transparent)"
      : $status === "completed"
        ? "color-mix(in srgb, var(--success-color, #43b581) 12%, transparent)"
        : "var(--secondary-color)"};
  color: ${({ $status }) =>
    $status === "current"
      ? "var(--primary-color)"
      : $status === "completed"
        ? "var(--success-color, #43b581)"
        : "var(--text-secondary-color)"};
  border: 1px solid var(--border-color);
`;

const StudentLessonBadgeLabel = styled.span`
  color: var(--text-muted-color);
  font-weight: 700;
`;

const StudentLessonTimestamp = styled.div`
  font-size: 13px;
  color: var(--text-muted-color);
`;

const StudentLessonFacts = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 760px) {
    justify-content: flex-start;
  }
`;

const StudentLessonFact = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 6px 10px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  font-size: 12px;
`;

const StudentLessonFactLabel = styled.span`
  color: var(--text-muted-color);
  font-weight: 700;
`;

const StudentLessonFactValue = styled.strong`
  color: var(--text-color);
  font-weight: 800;
`;

const ApprovalCard = styled.div`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const ApprovalActions = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 6px;
`;

const DetailLessonList = styled.div`
  display: grid;
  gap: 14px;
`;

const DetailLessonCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 22px;
  background: var(--background-color);
  padding: 18px;
  display: grid;
  gap: 16px;
`;

const DetailLessonHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const DetailLessonMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 6px;
`;

const DetailLessonEyebrow = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const DetailLessonTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: var(--text-color);
`;

const DetailLessonSubline = styled.div`
  font-size: 14px;
  color: var(--text-secondary-color);
`;

const DetailMetricRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DetailMetricPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  font-size: 12px;
  font-weight: 700;
`;

const AttendanceStatusGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MasteryMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const AttendanceStatusButton = styled.button`
  min-height: 40px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid ${({ $active }) => ($active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${({ $active }) => ($active ? "var(--primary-color)" : "var(--secondary-color)")};
  color: ${({ $active }) => ($active ? "#fff" : "var(--text-color)")};
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: opacity 0.2s ease, border-color 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const MasteryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MasteryMetricCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: var(--secondary-color);
  padding: 14px;
  display: grid;
  gap: 6px;
`;

const MasteryMetricLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const MasteryMetricValue = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: var(--text-color);
`;

const MasteryMetricHint = styled.div`
  font-size: 13px;
  color: var(--text-secondary-color);
`;

const HomeworkReviewList = styled.div`
  display: grid;
  gap: 12px;
`;

const HomeworkReviewCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: color-mix(in srgb, var(--secondary-color) 86%, var(--background-color) 14%);
  padding: 16px;
  display: grid;
  gap: 14px;
`;

const HomeworkCompactList = styled.div`
  display: grid;
  gap: 10px;
`;

const HomeworkCompactCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--background-color);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
`;

const HomeworkCompactHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const HomeworkInlineReviewGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 160px) minmax(0, 1fr);
  gap: 12px;
  align-items: start;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const HomeworkReviewSummaryGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 160px) minmax(0, 1fr);
  gap: 10px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const HomeworkReviewSummaryBox = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  padding: 10px 12px;
  min-width: 0;
`;

const HomeworkReviewSummaryLabel = styled.div`
  font-size: 11px;
  font-weight: 800;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const HomeworkReviewSummaryValue = styled.div`
  margin-top: 4px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 800;
  line-height: 1.35;
  word-break: break-word;
`;

const HomeworkReviewHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const HomeworkReviewTitle = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: var(--text-color);
`;

const HomeworkReviewMeta = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: var(--text-muted-color);
`;

const HomeworkSubmissionBody = styled.div`
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  padding: 12px;
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
`;

const HomeworkPreviewFrame = styled.div`
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  background: #0a0a0a;
`;

const HomeworkPreviewImage = styled.img`
  display: block;
  width: 100%;
  max-height: 360px;
  object-fit: contain;
  background: #0a0a0a;
`;

const HomeworkPreviewVideo = styled.video`
  display: block;
  width: 100%;
  max-height: 360px;
  background: #0a0a0a;
`;

const HomeworkPreviewIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 420px;
  border: 0;
  background: #0a0a0a;
`;

const HomeworkReviewActions = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 150px) minmax(260px, 1fr) auto auto;
  gap: 12px;
  align-items: end;
  padding-top: 2px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HomeworkModalPanel = styled(StudentModalPanel)`
  width: min(100%, 1040px);
`;

const ExerciseResultList = styled.div`
  display: grid;
  gap: 12px;
`;

const ExerciseResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ExerciseResultCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: var(--background-color);
  padding: 14px;
  display: grid;
  gap: 12px;
`;

const ExerciseResultHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const ExerciseResultTitle = styled.div`
  min-width: 0;
  font-size: 14px;
  font-weight: 800;
  color: var(--text-color);
`;

const ExerciseResultStat = styled.div`
  min-width: 0;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  padding: 10px 12px;
`;

const ExerciseResultStatTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const ExerciseResultLabel = styled.div`
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-muted-color);
`;

const ExerciseResultValue = styled.div`
  margin-top: 4px;
  color: var(--text-color);
  font-size: 17px;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
`;

const ExerciseAnswerToggle = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${({ $active }) =>
    $active
      ? "color-mix(in srgb, var(--primary-color) 14%, transparent)"
      : "var(--background-color)"};
  color: ${({ $active }) => ($active ? "var(--primary-color)" : "var(--text-muted-color)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;

const ExerciseAnswerList = styled.div`
  display: grid;
  gap: 10px;
`;

const ExerciseAnswerCard = styled.div`
  border: 1px solid
    ${({ $correct }) =>
      $correct
        ? "color-mix(in srgb, var(--success-color, #22c55e) 38%, var(--border-color))"
        : "color-mix(in srgb, var(--danger-color, #ef4444) 38%, var(--border-color))"};
  border-radius: 14px;
  background: ${({ $correct }) =>
    $correct
      ? "color-mix(in srgb, var(--success-color, #22c55e) 7%, var(--background-color))"
      : "color-mix(in srgb, var(--danger-color, #ef4444) 7%, var(--background-color))"};
  padding: 12px;
`;

const ExerciseQuestionTitle = styled.div`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 8px;
`;

const ExerciseOptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  padding: 7px 9px;
  color: ${({ $correct, $selected }) =>
    $correct
      ? "var(--success-color, #22c55e)"
      : $selected
        ? "var(--danger-color, #ef4444)"
        : "var(--text-secondary-color)"};
  background: ${({ $correct, $selected }) =>
    $correct
      ? "color-mix(in srgb, var(--success-color, #22c55e) 13%, transparent)"
      : $selected
        ? "color-mix(in srgb, var(--danger-color, #ef4444) 13%, transparent)"
        : "transparent"};
  font-size: 13px;
`;

const HomeworkReviewField = styled.label`
  display: grid;
  gap: 8px;
`;

const HomeworkReviewLabel = styled.span`
  font-size: 12px;
  font-weight: 800;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const HomeworkReviewInput = styled.input`
  width: 100%;
  min-height: 54px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  color: var(--text-color);
  padding: 0 16px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff 45%, transparent);

  &::placeholder {
    color: var(--text-muted-color);
    font-weight: 700;
  }

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color) 14%, transparent);
  }
`;

const HomeworkReviewTextarea = styled.textarea`
  width: 100%;
  min-height: 72px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  color: var(--text-color);
  padding: 14px 16px;
  font-size: 16px;
  line-height: 1.45;
  resize: vertical;
  box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff 45%, transparent);

  &::placeholder {
    color: var(--text-muted-color);
    font-weight: 600;
  }

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color) 14%, transparent);
  }
`;

const LessonControlSection = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: var(--background-color);
  padding: 16px;
  display: grid;
  gap: 14px;
`;

const LessonControlTitle = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const MasteryEditorGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 160px) minmax(0, 1fr);
  gap: 12px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MasterySaveRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const FieldGroup = styled.label`
  display: grid;
  gap: 8px;
`;

const FieldLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const FieldInput = styled.input`
  width: 100%;
  min-height: 54px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  color: var(--text-color);
  padding: 0 16px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff 45%, transparent);

  &::placeholder {
    color: var(--text-muted-color);
    font-weight: 700;
  }

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color) 14%, transparent);
  }
`;

const FieldTextarea = styled.textarea`
  width: 100%;
  min-height: 72px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  color: var(--text-color);
  padding: 14px 16px;
  font-size: 16px;
  line-height: 1.45;
  resize: vertical;
  box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff 45%, transparent);

  &::placeholder {
    color: var(--text-muted-color);
    font-weight: 600;
  }

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color) 14%, transparent);
  }
`;

const InlineSecondaryButton = styled.button`
  min-height: 46px;
  padding: 0 16px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const InlinePrimaryButton = styled.button`
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
  border: 1px solid var(--primary-color);
  background: var(--primary-color);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EmptyDetailState = styled.div`
  border: 1px dashed var(--border-color);
  border-radius: 18px;
  padding: 22px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 14px;
`;

const getEntityId = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value._id || value.id || value.userId || "";
};

const getCourseId = (course) => String(course?._id || course?.id || "");

const getLessonId = (lesson) =>
  String(lesson?._id || lesson?.id || lesson?.urlSlug || "");

const getInitials = (value) => {
  const parts = String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
};

const getApprovedMembers = (course) =>
  (course?.members || []).filter((member) => member.status === "approved");

const getPendingMembers = (course) =>
  (course?.members || []).filter((member) => member.status === "pending");

const getPublishedLessons = (course) =>
  (course?.lessons || []).filter(
    (lesson) => (lesson.status || "published") === "published",
  );

const getDisplayLessons = (course) => {
  const publishedLessons = getPublishedLessons(course);
  return publishedLessons.length ? publishedLessons : course?.lessons || [];
};

const getMemberAttendanceRecord = (lesson, userId) =>
  (lesson?.attendance || []).find(
    (record) => String(getEntityId(record?.userId || record)) === String(userId || ""),
  );

const isLessonCompletedForMember = (lesson, userId) => {
  const record = getMemberAttendanceRecord(lesson, userId);
  if (!record) return false;

  const progressPercent = Math.max(0, Number(record?.progressPercent || 0));
  if (progressPercent >= 95) return true;

  const durationSeconds = Math.max(
    0,
    Number(record?.lessonDurationSeconds || lesson?.durationSeconds || 0),
  );
  const farthestPoint = Math.max(
    0,
    Number(record?.maxPositionSeconds || record?.lastPositionSeconds || 0),
  );

  if (!durationSeconds) {
    return progressPercent >= 70;
  }

  const remainingSeconds = durationSeconds - farthestPoint;
  const watchedRatio = farthestPoint / durationSeconds;

  return remainingSeconds <= 8 || watchedRatio >= 0.97;
};

const getEnrollmentProgress = (course, userId) => {
  const lessons = getDisplayLessons(course);
  if (!lessons.length) return 0;

  const completedLessons = lessons.filter((lesson) => {
    const record = getMemberAttendanceRecord(lesson, userId);
    return Boolean(record && isLessonCompletedForMember(lesson, userId));
  }).length;

  return Math.round((completedLessons / lessons.length) * 100);
};

const getEnrollmentCurrentLesson = (course, userId) => {
  const lessons = getDisplayLessons(course);
  if (!lessons.length) return "";

  const currentLesson =
    lessons.find((lesson) => {
      const record = getMemberAttendanceRecord(lesson, userId);
      return !record || !isLessonCompletedForMember(lesson, userId);
    }) || lessons[lessons.length - 1];

  return currentLesson?.title || "";
};

const getHomeworkAssignments = (lesson) => {
  // Server returns either a flat array (mirror collections) or
  // `{ assignments: [...] }` (course detail endpoint). Accept both.
  const raw = Array.isArray(lesson)
    ? lesson
    : Array.isArray(lesson?.assignments)
      ? lesson.assignments
      : Array.isArray(lesson?.homework)
    ? lesson.homework
    : Array.isArray(lesson?.homework?.assignments)
      ? lesson.homework.assignments
      : Array.isArray(lesson?.homeworkAssignments)
        ? lesson.homeworkAssignments
        : [];
  return raw.filter((assignment) => assignment?.enabled !== false);
};

const getHomeworkSubmissionForUser = (assignment, userId) =>
  (assignment?.submissions || []).find(
    (item) =>
      [
        item?.userId,
        item?.studentId,
        item?.memberId,
        item?.user,
        item?.student,
        item?.createdBy,
        item,
      ].some(
        (value) => String(getEntityId(value)) === String(userId || ""),
      ),
  );

const formatHomeworkFileSize = (bytes) => {
  const size = Number(bytes || 0);
  if (!size) return "";
  const units = ["B", "KB", "MB", "GB"];
  let value = size;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

const getHomeworkFileExtension = (url, name) => {
  const candidate = String(name || url || "").split("?")[0].split("#")[0];
  const dot = candidate.lastIndexOf(".");
  return dot >= 0 ? candidate.slice(dot + 1).toLowerCase() : "";
};

const detectHomeworkSubmissionType = (submission, assignmentType) => {
  const explicit = String(assignmentType || "").toLowerCase();
  const ext = getHomeworkFileExtension(
    submission?.fileUrl || submission?.link,
    submission?.fileName,
  );
  if (explicit === "video" || ["mp4", "mov", "webm", "m4v"].includes(ext)) return "video";
  if (explicit === "audio" || ["mp3", "wav", "ogg", "m4a", "aac", "weba"].includes(ext)) {
    return "audio";
  }
  if (explicit === "pdf" || ext === "pdf") return "pdf";
  if (explicit === "photo" || ["png", "jpg", "jpeg", "gif", "webp", "avif", "heic"].includes(ext)) {
    return "image";
  }
  return "other";
};

const getHomeworkLessonSummary = (lesson, userId) => {
  const assignments = getHomeworkAssignments(lesson);
  if (!assignments.length) {
    return {
      enabled: false,
      status: "missing",
      reviewedCount: 0,
      submittedCount: 0,
      percent: null,
      scoreLabel: "—",
    };
  }

  let submittedCount = 0;
  let reviewedCount = 0;
  const percents = [];

  assignments.forEach((assignment) => {
    const submission = getHomeworkSubmissionForUser(assignment, userId);
    if (!submission) return;

    submittedCount += 1;
    if (submission?.status === "reviewed") {
      reviewedCount += 1;
      const maxScore = Math.max(1, Number(assignment?.maxScore || 100));
      const score = Math.max(0, Number(submission?.score || 0));
      percents.push(Math.round((score / maxScore) * 100));
    }
  });

  const percent = percents.length
    ? Math.round(percents.reduce((sum, value) => sum + value, 0) / percents.length)
    : null;

  return {
    enabled: true,
    status:
      reviewedCount === assignments.length && assignments.length > 0
        ? "reviewed"
        : submittedCount > 0
          ? "submitted"
          : "missing",
    reviewedCount,
    submittedCount,
    percent,
    scoreLabel:
      percent === null
        ? `${submittedCount}/${assignments.length}`
        : `${percent}%`,
  };
};

const getExerciseLessonSummary = (lesson, userId) => {
  const linkedTests = Array.isArray(lesson?.linkedTests) ? lesson.linkedTests : [];
  if (!linkedTests.length) {
    return {
      enabled: false,
      completedCount: 0,
      totalCount: 0,
      averagePercent: null,
      scoreLabel: "—",
    };
  }

  const attempts = linkedTests
    .map((linkedTest) => {
      if (Array.isArray(linkedTest?.progress) && linkedTest.progress.length) {
        return linkedTest.progress.find(
          (item) => String(getEntityId(item?.userId || item)) === String(userId || ""),
        );
      }

      const selfProgressUserId = getEntityId(linkedTest?.selfProgress?.userId);
      if (selfProgressUserId && String(selfProgressUserId) === String(userId || "")) {
        return linkedTest.selfProgress;
      }

      return null;
    })
    .filter(Boolean);

  const percents = attempts.map((progress) =>
    Number(progress?.bestPercent ?? progress?.percent ?? 0),
  );

  const averagePercent = percents.length
    ? Math.round(percents.reduce((sum, value) => sum + value, 0) / percents.length)
    : null;

  return {
    enabled: true,
    completedCount: attempts.length,
    totalCount: linkedTests.length,
    averagePercent,
    scoreLabel:
      averagePercent === null
        ? `${attempts.length}/${linkedTests.length}`
        : `${averagePercent}%`,
  };
};

const createScoreBucket = () => ({ earned: 0, total: 0 });

const addScore = (bucket, earned, total) => {
  const normalizedTotal = Math.max(0, Number(total || 0));
  if (!normalizedTotal) return;
  const normalizedEarned = Math.max(0, Math.min(normalizedTotal, Number(earned || 0)));
  bucket.earned += normalizedEarned;
  bucket.total += normalizedTotal;
};

const formatScoreBucket = (bucket) => {
  const earned = Math.round(Number(bucket?.earned || 0));
  const total = Math.round(Number(bucket?.total || 0));
  return total ? `${earned}/${total}` : "—";
};

const sumScoreBuckets = (...buckets) =>
  buckets.reduce(
    (acc, bucket) => ({
      earned: acc.earned + Number(bucket?.earned || 0),
      total: acc.total + Number(bucket?.total || 0),
    }),
    createScoreBucket(),
  );

const formatScoreBucketWithPercent = (bucket) => {
  const earned = Math.round(Number(bucket?.earned || 0));
  const total = Math.round(Number(bucket?.total || 0));
  if (!total) return "—";
  const percent = Math.round((earned / total) * 100);
  return `${earned}/${total} • ${percent}%`;
};

const formatCompletionWithPercent = (completed, total, percent) => {
  const normalizedTotal = Math.max(0, Number(total || 0));
  if (!normalizedTotal) return "—";
  const normalizedCompleted = Math.max(
    0,
    Math.min(normalizedTotal, Number(completed || 0)),
  );
  const normalizedPercent =
    percent === null || percent === undefined
      ? 0
      : Math.max(0, Math.min(100, Math.round(Number(percent || 0))));
  return `${normalizedCompleted}/${normalizedTotal} • ${normalizedPercent}%`;
};

const getBucketPercent = (bucket) => {
  const total = Number(bucket?.total || 0);
  if (!total) return null;
  return Math.round((Number(bucket?.earned || 0) / total) * 100);
};

const averageKnownPercents = (...values) => {
  const percents = values
    .filter((value) => value !== null && value !== undefined)
    .map((value) => Math.max(0, Math.min(100, Number(value || 0))));
  if (!percents.length) return 0;
  return Math.round(
    percents.reduce((sum, value) => sum + value, 0) / percents.length,
  );
};

const getLessonAttendanceScoreBucket = (lesson, userId) => {
  const bucket = createScoreBucket();
  addScore(bucket, getMemberAttendanceRecord(lesson, userId) ? 1 : 0, 1);
  return bucket;
};

const getLessonHomeworkScoreBucket = (lesson, userId) => {
  const bucket = createScoreBucket();
  getHomeworkAssignments(lesson).forEach((assignment) => {
    const maxScore = Math.max(1, Number(assignment?.maxScore || 100));
    const submission = getHomeworkSubmissionForUser(assignment, userId);
    const hasScore =
      submission?.score !== null &&
      submission?.score !== undefined &&
      submission?.score !== "";
    addScore(bucket, hasScore ? Number(submission.score || 0) : 0, maxScore);
  });
  return bucket;
};

const getLessonExerciseScoreBucket = (lesson, userId) => {
  const bucket = createScoreBucket();
  (Array.isArray(lesson?.linkedTests) ? lesson.linkedTests : []).forEach((linkedTest) => {
    const progress = getExerciseProgressForUser(linkedTest, userId);
    const correct = progress?.correctCount ?? progress?.correct ?? progress?.score;
    const total = progress?.totalQuestions ?? progress?.total ?? progress?.questionsCount;

    if (progress && total !== null && total !== undefined && Number(total) > 0) {
      addScore(bucket, Number(correct || 0), Number(total));
      return;
    }

    const percent = progress
      ? Number(progress?.bestPercent ?? progress?.percent ?? progress?.score ?? 0)
      : 0;
    addScore(bucket, percent, 100);
  });
  return bucket;
};

const getCourseScoreSummary = (course, userId) => {
  const lessons = getDisplayLessons(course);
  const attendance = createScoreBucket();
  const homework = createScoreBucket();
  const exercise = createScoreBucket();
  const teacher = createScoreBucket();

  lessons.forEach((lesson) => {
    addScore(
      attendance,
      getMemberAttendanceRecord(lesson, userId) ? 1 : 0,
      1,
    );

    getHomeworkAssignments(lesson).forEach((assignment) => {
      const maxScore = Math.max(1, Number(assignment?.maxScore || 100));
      const submission = getHomeworkSubmissionForUser(assignment, userId);
      addScore(
        homework,
        submission?.status === "reviewed" ? Number(submission?.score || 0) : 0,
        maxScore,
      );
    });

    (Array.isArray(lesson?.linkedTests) ? lesson.linkedTests : []).forEach((linkedTest) => {
      const progress = getExerciseProgressForUser(linkedTest, userId);
      const percent = progress
        ? Number(progress?.bestPercent ?? progress?.percent ?? progress?.score ?? 0)
        : 0;
      addScore(exercise, percent, 100);
    });

    const oral = getLessonOralAssessmentForUser(lesson, userId);
    addScore(
      teacher,
      hasSavedOralAssessment(oral) ? Number(oral?.score || 0) : 0,
      100,
    );
  });

  return {
    attendance,
    homework,
    exercise,
    teacher,
    total: sumScoreBuckets(attendance, homework, exercise, teacher),
  };
};

const getExerciseProgressForUser = (linkedTest, userId) => {
  const userCandidates = [
    userId,
    getEntityId(userId),
  ].filter(Boolean).map(String);

  const matchesUser = (value) => {
    const id = String(getEntityId(value) || value || "");
    return userCandidates.includes(id);
  };

  if (Array.isArray(linkedTest?.progress) && linkedTest.progress.length) {
    return (
      linkedTest.progress.find((item) =>
        [
          item?.userId,
          item?.studentId,
          item?.memberId,
          item?.user,
          item?.student,
          item,
        ].some(matchesUser),
      ) || null
    );
  }

  if (linkedTest?.selfProgress && matchesUser(linkedTest.selfProgress.userId)) {
    return linkedTest.selfProgress;
  }

  return null;
};

const getLessonOralAssessmentForUser = (lesson, userId) =>
  (lesson?.oralAssessments || []).find(
    (item) => String(getEntityId(item?.userId || item)) === String(userId || ""),
  ) || null;

const hasSavedOralAssessment = (assessment) =>
  Boolean(
    assessment &&
      ((assessment.score !== null && assessment.score !== undefined) ||
        String(assessment.note || "").trim()),
  );

const patchLessonAttendanceStatus = (course, lessonId, userId, status) => {
  if (!course) return course;

  return {
    ...course,
    lessons: (course.lessons || []).map((lesson) => {
      if (getLessonId(lesson) !== String(lessonId || "")) return lesson;

      const nextAttendance = Array.isArray(lesson.attendance) ? [...lesson.attendance] : [];
      const existingIndex = nextAttendance.findIndex(
        (record) => String(getEntityId(record?.userId || record)) === String(userId || ""),
      );
      const existingRecord = existingIndex >= 0 ? nextAttendance[existingIndex] : null;
      const nextRecord = {
        ...(existingRecord || {}),
        userId: existingRecord?.userId || userId,
        status,
        markedAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        nextAttendance[existingIndex] = nextRecord;
      } else {
        nextAttendance.push(nextRecord);
      }

      return {
        ...lesson,
        attendance: nextAttendance,
      };
    }),
  };
};

const patchLessonOralAssessment = (course, lessonId, userId, score, note) => {
  if (!course) return course;

  return {
    ...course,
    lessons: (course.lessons || []).map((lesson) => {
      if (getLessonId(lesson) !== String(lessonId || "")) return lesson;

      const nextAssessments = Array.isArray(lesson.oralAssessments)
        ? [...lesson.oralAssessments]
        : [];
      const existingIndex = nextAssessments.findIndex(
        (item) => String(getEntityId(item?.userId || item)) === String(userId || ""),
      );
      const nextAssessment = {
        ...(existingIndex >= 0 ? nextAssessments[existingIndex] : {}),
        userId,
        score,
        note,
        updatedAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        nextAssessments[existingIndex] = nextAssessment;
      } else {
        nextAssessments.push(nextAssessment);
      }

      return {
        ...lesson,
        oralAssessments: nextAssessments,
      };
    }),
  };
};

const getAttendanceSummary = (course, userId) => {
  const lessons = getDisplayLessons(course);
  if (!lessons.length) {
    return {
      attendancePercent: 0,
      completedLessons: 0,
      totalLessons: 0,
      activeLessons: 0,
      lastActivityAt: null,
    };
  }

  let completedLessons = 0;
  let activeLessons = 0;
  let lastActivityAt = null;

  lessons.forEach((lesson) => {
    const record = getMemberAttendanceRecord(lesson, userId);
    if (!record) return;

    const progressPercent = Math.max(0, Number(record?.progressPercent || 0));
    if (progressPercent > 0) {
      activeLessons += 1;
    }
    if (isLessonCompletedForMember(lesson, userId)) {
      completedLessons += 1;
    }

    const activityCandidate = record?.lastWatchedAt || record?.markedAt || null;
    if (activityCandidate) {
      const activityTime = new Date(activityCandidate).getTime();
      const latestTime = lastActivityAt ? new Date(lastActivityAt).getTime() : 0;
      if (!Number.isNaN(activityTime) && activityTime > latestTime) {
        lastActivityAt = activityCandidate;
      }
    }
  });

  return {
    attendancePercent: Math.round((activeLessons / lessons.length) * 100),
    completedLessons,
    totalLessons: lessons.length,
    activeLessons,
    lastActivityAt,
  };
};

const getMasterySummary = (course, userId) => {
  const lessons = getDisplayLessons(course);
  if (!lessons.length) {
    return {
      masteryPercent: 0,
      completedLessons: 0,
      totalLessons: 0,
      averageProgressPercent: 0,
    };
  }

  let completedLessons = 0;
  let totalProgressPercent = 0;

  lessons.forEach((lesson) => {
    const record = getMemberAttendanceRecord(lesson, userId);
    const progressPercent = Math.max(0, Number(record?.progressPercent || 0));
    totalProgressPercent += progressPercent;

    if (isLessonCompletedForMember(lesson, userId)) {
      completedLessons += 1;
    }
  });

  const completionPercent = Math.round((completedLessons / lessons.length) * 100);
  const averageProgressPercent = Math.round(totalProgressPercent / lessons.length);

  return {
    masteryPercent: Math.round((completionPercent + averageProgressPercent) / 2),
    completedLessons,
    totalLessons: lessons.length,
    averageProgressPercent,
  };
};

const formatEnrollmentPlan = (course, t) => {
  if (course?.accessType === "paid" || Number(course?.price || 0) > 0) {
    return t("teacher.workspace.planPremium", {
      defaultValue: "Premium",
    });
  }

  if (course?.accessType === "free_open") {
    return t("teacher.workspace.planOpen", {
      defaultValue: "Open",
    });
  }

  return t("teacher.workspace.planRequest", {
    defaultValue: "So'rov",
  });
};

const formatShortDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("uz-UZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

function useAnimatedModalState(value) {
  const [renderValue, setRenderValue] = useState(value);
  const [isVisible, setIsVisible] = useState(Boolean(value));

  useEffect(() => {
    if (value) {
      setRenderValue(value);
      const frameId = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => window.cancelAnimationFrame(frameId);
    }

    setIsVisible(false);
    const timeoutId = window.setTimeout(() => {
      setRenderValue(null);
    }, MODAL_EXIT_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [value]);

  return { renderValue, isVisible };
}

function AvatarImageWithFallback({
  src,
  alt,
  children,
  ImageComponent = StudentAvatarImage,
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  if (!showImage) {
    return children;
  }

  return (
    <ImageComponent
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}

export default function TeacherPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId: routeCourseId } = useParams();
  const { createChat } = useChats();
  const currentUser = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const {
    courses,
    loading,
    isAdmin,
    ensureCoursesLoaded,
    fetchCourses,
    approveUser,
    removeUser,
    removeCourse,
    removeLesson,
    setLessonAttendanceStatus,
    setLessonOralAssessment,
    getLessonHomework,
    reviewLessonHomework,
    patchCourseLesson,
    joinCourseRoom,
    leaveCourseRoom,
  } = useCourses();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [selectedStudentCourseFilter, setSelectedStudentCourseFilter] = useState(
    "all",
  );
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedStudentRow, setSelectedStudentRow] = useState(null);
  const [selectedMasteryRow, setSelectedMasteryRow] = useState(null);
  const [selectedMasteryLessonFocusId, setSelectedMasteryLessonFocusId] = useState(null);
  const [studentModalTab, setStudentModalTab] = useState("overview");
  const [savingMasteryKey, setSavingMasteryKey] = useState("");
  const [approvingMemberKey, setApprovingMemberKey] = useState("");
  const [removingStudentKey, setRemovingStudentKey] = useState("");
  const [teacherTests, setTeacherTests] = useState([]);
  const [teacherSentenceBuilders, setTeacherSentenceBuilders] = useState([]);
  const [testsLoading, setTestsLoading] = useState(false);
  const [sentenceBuildersLoading, setSentenceBuildersLoading] = useState(false);
  const [teacherArenaMenuId, setTeacherArenaMenuId] = useState(null);
  const [teacherTestToDelete, setTeacherTestToDelete] = useState(null);
  const [teacherSentenceBuilderToDelete, setTeacherSentenceBuilderToDelete] =
    useState(null);
  const [isDeletingArenaItem, setIsDeletingArenaItem] = useState(false);
  const [showSbDialog, setShowSbDialog] = useState(false);
  const [sbEditingDeck, setSbEditingDeck] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  // Share link dialog state
  const [shareDeck, setShareDeck] = useState(null);
  const [shareMode, setShareMode] = useState("persist");
  const [shareGroupName, setShareGroupName] = useState("");
  const [shareShowResults, setShareShowResults] = useState(true);
  const [shareTimeLimit, setShareTimeLimit] = useState(0);
  const [shareLinks, setShareLinks] = useState([]);
  const [loadingShareLinks, setLoadingShareLinks] = useState(false);
  const [creatingShareLink, setCreatingShareLink] = useState(false);
  const [deletingShareLinkId, setDeletingShareLinkId] = useState(null);
  // Results pane state (sentence builder)
  const [resultsDeck, setResultsDeck] = useState(null);
  const [resultsData, setResultsData] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  // Test create/edit dialog state
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [testEditingItem, setTestEditingItem] = useState(null);
  // Test share link dialog state
  const [shareTest, setShareTest] = useState(null);
  const [shareTestMode, setShareTestMode] = useState("persist");
  const [shareTestGroupName, setShareTestGroupName] = useState("");
  const [shareTestShowResults, setShareTestShowResults] = useState(true);
  const [shareTestTimeLimit, setShareTestTimeLimit] = useState(0);
  const [shareTestLinks, setShareTestLinks] = useState([]);
  const [loadingTestShareLinks, setLoadingTestShareLinks] = useState(false);
  const [creatingTestShareLink, setCreatingTestShareLink] = useState(false);
  const [deletingTestShareLinkId, setDeletingTestShareLinkId] = useState(null);
  // Test results state
  const [selectedTestForResults, setSelectedTestForResults] = useState(null);
  const [masteryDrafts, setMasteryDrafts] = useState({});
  const [studentMasteryDrafts, setStudentMasteryDrafts] = useState({});
  const [masteryHomeworkCache, setMasteryHomeworkCache] = useState({});
  const [masteryHomeworkLoading, setMasteryHomeworkLoading] = useState({});
  const [homeworkReviewDrafts, setHomeworkReviewDrafts] = useState({});
  const [savingHomeworkReviewKey, setSavingHomeworkReviewKey] = useState("");
  const [selectedHomeworkReview, setSelectedHomeworkReview] = useState(null);
  const [selectedExerciseAnswer, setSelectedExerciseAnswer] = useState(null);
  const [exerciseAnswerDetails, setExerciseAnswerDetails] = useState({});
  const [exerciseAnswerLoading, setExerciseAnswerLoading] = useState({});
  const [collapsedMasteryLessons, setCollapsedMasteryLessons] = useState({});
  const [collapsedStudentMasteryLessons, setCollapsedStudentMasteryLessons] =
    useState({});
  const [isStartingChat, setIsStartingChat] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [courseLessonDialogOpen, setCourseLessonDialogOpen] = useState(false);
  const [editingCourseLesson, setEditingCourseLesson] = useState(null);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [isDeletingLesson, setIsDeletingLesson] = useState(false);
  const [lessonContentLessonId, setLessonContentLessonId] = useState(null);
  const [lessonContentModalTab, setLessonContentModalTab] = useState("content");
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeletingCourse, setIsDeletingCourse] = useState(false);

  useEffect(() => {
    ensureCoursesLoaded();
  }, [ensureCoursesLoaded]);

  const teacherCourses = useMemo(
    () => courses.filter((course) => isAdmin(course._id || course.id)),
    [courses, isAdmin],
  );

  useEffect(() => {
    const courseIds = teacherCourses
      .map((course) => getCourseId(course))
      .filter(Boolean);

    if (!courseIds.length) return undefined;

    courseIds.forEach((courseId) => joinCourseRoom(courseId));

    return () => {
      courseIds.forEach((courseId) => leaveCourseRoom(courseId));
    };
  }, [joinCourseRoom, leaveCourseRoom, teacherCourses]);

  useEffect(() => {
    if (location.pathname === "/teacher/courses") {
      setSelectedCourseId(null);
      setSelectedLessonId(null);
      return;
    }

    if (routeCourseId) {
      setSelectedCourseId(String(routeCourseId));
      return;
    }

    if (!teacherCourses.length) {
      setSelectedCourseId(null);
      return;
    }

    if (!selectedCourseId) {
      setSelectedCourseId(getCourseId(teacherCourses[0]));
      return;
    }

    const exists = teacherCourses.some(
      (course) => getCourseId(course) === String(selectedCourseId || ""),
    );

    if (!exists && !loading) {
      setSelectedCourseId(getCourseId(teacherCourses[0]));
    }
  }, [loading, location.pathname, routeCourseId, selectedCourseId, teacherCourses]);

  useEffect(() => {
    if (!selectedCourseId) {
      setSelectedLessonId(null);
    }
  }, [selectedCourseId]);

  useEffect(() => {
    if (location.pathname.startsWith("/teacher/courses")) {
      setActiveSection("courses");
    }
  }, [location.pathname]);

  const selectedCourse = useMemo(
    () =>
      teacherCourses.find(
        (course) => getCourseId(course) === String(selectedCourseId || ""),
      ) || null,
    [selectedCourseId, teacherCourses],
  );

  const selectedLessonContent = useMemo(
    () =>
      (selectedCourse?.lessons || []).find(
        (lesson) => getLessonId(lesson) === String(lessonContentLessonId || ""),
      ) || null,
    [lessonContentLessonId, selectedCourse],
  );

  useEffect(() => {
    if (lessonContentLessonId && !selectedLessonContent) {
      setLessonContentLessonId(null);
    }
  }, [lessonContentLessonId, selectedLessonContent]);

  useEffect(() => {
    if (lessonContentLessonId) {
      setLessonContentModalTab("content");
    }
  }, [lessonContentLessonId]);

  useEffect(() => {
    if (
      selectedMasteryRow &&
      !teacherCourses.some(
        (course) => getCourseId(course) === getCourseId(selectedMasteryRow.course),
      )
    ) {
      setSelectedMasteryRow(null);
    }
  }, [selectedMasteryRow, teacherCourses]);

  useEffect(() => {
    if (!selectedMasteryRow) {
      setSelectedMasteryLessonFocusId(null);
    }
  }, [selectedMasteryRow]);

  useEffect(() => {
    if (!teacherArenaMenuId) return undefined;

    const handleOutsideClick = () => setTeacherArenaMenuId(null);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [teacherArenaMenuId]);

  useEffect(() => {
    if (activeSection !== "tests" || teacherTests.length) {
      return;
    }

    let cancelled = false;
    setTestsLoading(true);

    fetchMyTests(1, 12)
      .then((response) => {
        if (cancelled) return;
        const items = Array.isArray(response)
          ? response
          : response?.items || response?.tests || response?.data || [];
        setTeacherTests(Array.isArray(items) ? items : []);
      })
      .catch(() => {
        if (!cancelled) {
          toast.error(
            t("teacher.workspace.testsLoadError", {
              defaultValue: "Testlarni yuklab bo'lmadi",
            }),
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setTestsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeSection, teacherTests.length, t]);

  useEffect(() => {
    if (activeSection !== "sentenceBuilder" || teacherSentenceBuilders.length) {
      return;
    }

    let cancelled = false;
    setSentenceBuildersLoading(true);

    fetchSentenceBuilders(1, 12)
      .then((response) => {
        if (cancelled) return;
        const items = Array.isArray(response)
          ? response
          : response?.items ||
            response?.decks ||
            response?.sentenceBuilders ||
            response?.data ||
            [];
        setTeacherSentenceBuilders(Array.isArray(items) ? items : []);
      })
      .catch(() => {
        if (!cancelled) {
          toast.error(
            t("teacher.workspace.sentenceBuilderLoadError", {
              defaultValue: "Gap tuzish kartalarini yuklab bo'lmadi",
            }),
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setSentenceBuildersLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeSection, teacherSentenceBuilders.length, t]);

  useEffect(() => {
    if (!selectedMasteryRow?.course) {
      setMasteryDrafts({});
      setCollapsedMasteryLessons({});
      return;
    }

    const nextDrafts = {};
    const nextCollapsed = {};
    getDisplayLessons(selectedMasteryRow.course).forEach((lesson) => {
      const lessonId = getLessonId(lesson);
      if (!lessonId) return;
      const oral = getLessonOralAssessmentForUser(lesson, selectedMasteryRow.memberId);
      nextDrafts[lessonId] = {
        score:
          oral?.score === null || oral?.score === undefined ? "" : String(oral.score),
        note: oral?.note || "",
      };
      if (hasSavedOralAssessment(oral)) {
        nextCollapsed[lessonId] = true;
      }
    });
    setMasteryDrafts(nextDrafts);
    setCollapsedMasteryLessons(nextCollapsed);
  }, [selectedMasteryRow]);

  useEffect(() => {
    if (!selectedStudentRow?.course) {
      setStudentMasteryDrafts({});
      setCollapsedStudentMasteryLessons({});
      return;
    }

    const nextDrafts = {};
    const nextCollapsed = {};
    getDisplayLessons(selectedStudentRow.course).forEach((lesson, index) => {
      const lessonId =
        getLessonId(lesson) || `${selectedStudentRow.id}-student-mastery-${index}`;
      const oral = getLessonOralAssessmentForUser(lesson, selectedStudentRow.memberId);
      const attendanceRecord = getMemberAttendanceRecord(
        lesson,
        selectedStudentRow.memberId,
      );
      nextDrafts[lessonId] = {
        score:
          oral?.score === null || oral?.score === undefined ? "" : String(oral.score),
        note: oral?.note || "",
        attendanceStatus: attendanceRecord?.status || "",
      };
      if (hasSavedOralAssessment(oral)) {
        nextCollapsed[lessonId] = true;
      }
    });
    setStudentMasteryDrafts(nextDrafts);
    setCollapsedStudentMasteryLessons(nextCollapsed);
  }, [selectedStudentRow]);

  useEffect(() => {
    if (!selectedCourse) {
      setSelectedLessonId(null);
      return;
    }

    const lessons = selectedCourse.lessons || [];
    if (!lessons.length) {
      setSelectedLessonId(null);
      return;
    }

    const hasSelectedLesson = lessons.some(
      (lesson) => getLessonId(lesson) === String(selectedLessonId || ""),
    );

    if (!hasSelectedLesson) {
      setSelectedLessonId(getLessonId(lessons[0]));
    }
  }, [selectedCourse, selectedLessonId]);

  const totalStudents = useMemo(() => {
    const ids = new Set();
    teacherCourses.forEach((course) => {
      getApprovedMembers(course).forEach((member) => {
        ids.add(String(getEntityId(member.userId || member)));
      });
    });
    return ids.size;
  }, [teacherCourses]);

  const totalLessons = useMemo(
    () =>
      teacherCourses.reduce(
        (sum, course) => sum + Number(course?.lessons?.length || 0),
        0,
      ),
    [teacherCourses],
  );

  const totalPending = useMemo(
    () =>
      teacherCourses.reduce(
        (sum, course) => sum + Number(getPendingMembers(course).length),
        0,
      ),
    [teacherCourses],
  );

  const pendingApprovals = useMemo(
    () =>
      teacherCourses.flatMap((course) =>
        getPendingMembers(course).map((member) => ({
          course,
          member,
          memberId: String(getEntityId(member.userId || member)),
        })),
      ),
    [teacherCourses],
  );

  const studentItems = useMemo(() => {
    const map = new Map();

    teacherCourses.forEach((course) => {
      (course.members || []).forEach((member) => {
        const memberId = String(getEntityId(member.userId || member));
        if (!memberId) return;

        if (!map.has(memberId)) {
          map.set(memberId, {
            id: memberId,
            name:
              member.name ||
              member.username ||
              member.userId?.nickname ||
              member.userId?.username ||
              t("common.userFallback"),
            avatar: member.avatar || member.userId?.avatar || "",
            enrollments: [],
          });
        }

        map.get(memberId).enrollments.push({
          course,
          member,
          status: member.status || "unknown",
          joinedAt: member.joinedAt || member.requestedAt || null,
        });
      });
    });

    return Array.from(map.values());
  }, [teacherCourses, t]);

  const query = search.trim().toLowerCase();

  const filteredCourses = useMemo(() => {
    if (!query) return teacherCourses;
    return teacherCourses.filter((course) =>
      `${course.title || course.name || ""} ${course.category || ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [query, teacherCourses]);

  const filteredCourseLessons = useMemo(() => {
    const lessons = selectedCourse?.lessons || [];
    if (!query) return lessons;

    return lessons.filter((lesson, index) =>
      `${lesson.title || `${index + 1}-dars`} ${lesson.description || ""} ${
        lesson.status || ""
      }`
        .toLowerCase()
        .includes(query),
    );
  }, [query, selectedCourse]);

  const filteredStudents = useMemo(() => {
    if (!query) return studentItems;
    return studentItems.filter((student) =>
      `${student.name} ${student.enrollments
        .map(({ course }) => course.title || course.name || "")
        .join(" ")}`
        .toLowerCase()
        .includes(query),
    );
  }, [query, studentItems]);

  const filteredStudentRows = useMemo(
    () =>
      filteredStudents.flatMap((student) =>
        student.enrollments.map(({ course, member, status, joinedAt }) => {
          const memberId = String(getEntityId(member.userId || member));
          return {
            id: `${student.id}-${getCourseId(course)}`,
            studentId: student.id,
            name: student.name,
            avatar: student.avatar || member.avatar || member.userId?.avatar || "",
            status,
            joinedAt,
            course,
            memberId,
            progressPercent: getEnrollmentProgress(course, memberId),
            currentLessonTitle: getEnrollmentCurrentLesson(course, memberId),
            tariffLabel: formatEnrollmentPlan(course, t),
            scoreSummary: getCourseScoreSummary(course, memberId),
          };
        }),
      ),
    [filteredStudents, t],
  );

  const courseFilteredStudentRows = useMemo(() => {
    const rows =
      selectedStudentCourseFilter === "all"
        ? filteredStudentRows
        : filteredStudentRows.filter(
        (row) =>
          getCourseId(row.course) === String(selectedStudentCourseFilter || ""),
      );

    return [...rows].sort((a, b) => {
      const aTotal = a.scoreSummary?.total || {};
      const bTotal = b.scoreSummary?.total || {};
      const earnedDiff = Number(bTotal.earned || 0) - Number(aTotal.earned || 0);
      if (earnedDiff) return earnedDiff;

      const aPercent = getBucketPercent(aTotal) ?? -1;
      const bPercent = getBucketPercent(bTotal) ?? -1;
      if (bPercent !== aPercent) return bPercent - aPercent;

      return Number(bTotal.total || 0) - Number(aTotal.total || 0);
    });
  }, [filteredStudentRows, selectedStudentCourseFilter]);

  const filteredStudentCount = useMemo(
    () => new Set(courseFilteredStudentRows.map((row) => row.studentId)).size,
    [courseFilteredStudentRows],
  );

  const renderScoreCell = (bucket) => {
    const total = Math.round(Number(bucket?.total || 0));
    return (
      <ScoreCellValue>
        <ScoreCellMain>{formatScoreBucket(bucket)}</ScoreCellMain>
      </ScoreCellValue>
    );
  };

  const masteryRows = useMemo(
    () =>
      courseFilteredStudentRows.map((row) => ({
        ...row,
        ...getMasterySummary(row.course, row.memberId),
      })),
    [courseFilteredStudentRows],
  );

  const selectedStudentLessonRows = useMemo(() => {
    if (!selectedStudentRow?.course) return [];

    const lessons = getDisplayLessons(selectedStudentRow.course);
    const currentLessonTitle = selectedStudentRow.currentLessonTitle || "";

    return lessons.map((lesson, index) => {
      const record = getMemberAttendanceRecord(lesson, selectedStudentRow.memberId);
      const progressPercent = Math.max(
        0,
        Math.min(100, Number(record?.progressPercent || 0)),
      );
      const hasPlaybackActivity =
        progressPercent > 0 ||
        Number(record?.maxPositionSeconds || record?.lastPositionSeconds || 0) > 0;

      let status = "upcoming";
      if (isLessonCompletedForMember(lesson, selectedStudentRow.memberId)) {
        status = "completed";
      } else if (
        lesson.title === currentLessonTitle ||
        hasPlaybackActivity
      ) {
        status = "current";
      }

      return {
        id: getLessonId(lesson) || `${selectedStudentRow.id}-lesson-${index}`,
        index,
        title: lesson.title || `${index + 1}-dars`,
        status,
        progressPercent,
        hasPlaybackActivity,
        lastWatchedAt: record?.lastWatchedAt || record?.markedAt || null,
        watchCount: Number(record?.watchCount || 0),
        lastPositionSeconds: Number(record?.lastPositionSeconds || 0),
        maxPositionSeconds: Number(record?.maxPositionSeconds || 0),
        lessonDurationSeconds: Number(
          record?.lessonDurationSeconds || lesson?.durationSeconds || 0,
        ),
      };
    });
  }, [selectedStudentRow]);

  useEffect(() => {
    if (!selectedMasteryRow?.course || !getLessonHomework) return undefined;

    let cancelled = false;
    const courseId = getCourseId(selectedMasteryRow.course);
    const lessons = getDisplayLessons(selectedMasteryRow.course);

    lessons.forEach((lesson, index) => {
      const lessonId = getLessonId(lesson) || `${selectedMasteryRow.id}-mastery-${index}`;
      if (!courseId || !lessonId) return;
      const cacheKey = `${courseId}:${lessonId}`;
      if (masteryHomeworkCache[cacheKey] || masteryHomeworkLoading[cacheKey]) return;

      setMasteryHomeworkLoading((prev) => ({ ...prev, [cacheKey]: true }));
      getLessonHomework(courseId, lessonId)
        .then((data) => {
          if (cancelled) return;
          setMasteryHomeworkCache((prev) => ({
            ...prev,
            [cacheKey]: data || { assignments: [] },
          }));
        })
        .catch(() => {
          if (cancelled) return;
          setMasteryHomeworkCache((prev) => ({
            ...prev,
            [cacheKey]: { assignments: getHomeworkAssignments(lesson) },
          }));
        })
        .finally(() => {
          if (cancelled) return;
          setMasteryHomeworkLoading((prev) => ({ ...prev, [cacheKey]: false }));
        });
    });

    return () => {
      cancelled = true;
    };
  }, [getLessonHomework, selectedMasteryRow]);

  useEffect(() => {
    if (!selectedStudentRow?.course || !getLessonHomework) return undefined;

    let cancelled = false;
    const courseId = getCourseId(selectedStudentRow.course);
    const lessons = getDisplayLessons(selectedStudentRow.course);

    lessons.forEach((lesson, index) => {
      const lessonId =
        getLessonId(lesson) || `${selectedStudentRow.id}-student-mastery-${index}`;
      if (!courseId || !lessonId) return;
      const cacheKey = `${courseId}:${lessonId}`;
      if (masteryHomeworkCache[cacheKey] || masteryHomeworkLoading[cacheKey]) return;

      setMasteryHomeworkLoading((prev) => ({ ...prev, [cacheKey]: true }));
      getLessonHomework(courseId, lessonId)
        .then((data) => {
          if (cancelled) return;
          setMasteryHomeworkCache((prev) => ({
            ...prev,
            [cacheKey]: data || { assignments: [] },
          }));
        })
        .catch(() => {
          if (cancelled) return;
          setMasteryHomeworkCache((prev) => ({
            ...prev,
            [cacheKey]: { assignments: getHomeworkAssignments(lesson) },
          }));
        })
        .finally(() => {
          if (cancelled) return;
          setMasteryHomeworkLoading((prev) => ({ ...prev, [cacheKey]: false }));
        });
    });

    return () => {
      cancelled = true;
    };
  }, [getLessonHomework, selectedStudentRow]);

  useEffect(() => {
    if (!selectedCourse || !selectedLessonContent || !getLessonHomework) {
      return undefined;
    }

    let cancelled = false;
    const courseId = getCourseId(selectedCourse);
    const lessonId = getLessonId(selectedLessonContent);
    if (!courseId || !lessonId) return undefined;

    const cacheKey = `${courseId}:${lessonId}`;
    if (masteryHomeworkCache[cacheKey] || masteryHomeworkLoading[cacheKey]) {
      return undefined;
    }

    setMasteryHomeworkLoading((prev) => ({ ...prev, [cacheKey]: true }));
    getLessonHomework(courseId, lessonId)
      .then((data) => {
        if (cancelled) return;
        setMasteryHomeworkCache((prev) => ({
          ...prev,
          [cacheKey]: data || { assignments: [] },
        }));
      })
      .catch(() => {
        if (cancelled) return;
        setMasteryHomeworkCache((prev) => ({
          ...prev,
          [cacheKey]: { assignments: getHomeworkAssignments(selectedLessonContent) },
        }));
      })
      .finally(() => {
        if (cancelled) return;
        setMasteryHomeworkLoading((prev) => ({ ...prev, [cacheKey]: false }));
      });

    return () => {
      cancelled = true;
    };
  }, [getLessonHomework, selectedCourse, selectedLessonContent]);

  const selectedMasteryLessonRows = useMemo(() => {
    if (!selectedMasteryRow?.course) return [];

    const courseId = getCourseId(selectedMasteryRow.course);
    const rows = getDisplayLessons(selectedMasteryRow.course).map((lesson, index) => {
      const lessonId = getLessonId(lesson) || `${selectedMasteryRow.id}-mastery-${index}`;
      const homeworkData = masteryHomeworkCache[`${courseId}:${lessonId}`];
      const homeworkSource = homeworkData ? { ...lesson, homework: homeworkData } : lesson;
      const homework = getHomeworkLessonSummary(homeworkSource, selectedMasteryRow.memberId);
      const exercise = getExerciseLessonSummary(lesson, selectedMasteryRow.memberId);
      const oral = getLessonOralAssessmentForUser(lesson, selectedMasteryRow.memberId);
      const attendanceRecord = getMemberAttendanceRecord(lesson, selectedMasteryRow.memberId);
      const draft = masteryDrafts[lessonId] || {};
      const isGraded = hasSavedOralAssessment(oral);

      return {
        id: lessonId,
        index,
        title: lesson.title || `${index + 1}-dars`,
        description: (lesson.description || "").trim(),
        homework,
        homeworkAssignments: getHomeworkAssignments(homeworkSource),
        homeworkLoading:
          Boolean(masteryHomeworkLoading[`${courseId}:${lessonId}`]) &&
          !homeworkData,
        exercise,
        exerciseTests: Array.isArray(lesson.linkedTests) ? lesson.linkedTests : [],
        oralScore:
          draft.score !== undefined
            ? draft.score
            : oral?.score === null || oral?.score === undefined
              ? ""
              : String(oral.score),
        oralNote:
          draft.note !== undefined ? draft.note : oral?.note || "",
        attendanceStatus:
          draft.attendanceStatus !== undefined
            ? draft.attendanceStatus
            : attendanceRecord?.status || "",
        isGraded,
        updatedAt: oral?.updatedAt || oral?.createdAt || null,
      };
    });

    if (!selectedMasteryLessonFocusId) {
      return rows;
    }

    return rows.filter((lesson) => lesson.id === String(selectedMasteryLessonFocusId));
  }, [
    masteryDrafts,
    masteryHomeworkCache,
    masteryHomeworkLoading,
    selectedMasteryLessonFocusId,
    selectedMasteryRow,
  ]);

  const selectedStudentMasteryLessonRows = useMemo(() => {
    if (!selectedStudentRow?.course) return [];

    const courseId = getCourseId(selectedStudentRow.course);
    return getDisplayLessons(selectedStudentRow.course).map((lesson, index) => {
      const lessonId = getLessonId(lesson) || `${selectedStudentRow.id}-student-mastery-${index}`;
      const homeworkData = masteryHomeworkCache[`${courseId}:${lessonId}`];
      const homeworkSource = homeworkData ? { ...lesson, homework: homeworkData } : lesson;
      const homework = getHomeworkLessonSummary(homeworkSource, selectedStudentRow.memberId);
      const exercise = getExerciseLessonSummary(lesson, selectedStudentRow.memberId);
      const oral = getLessonOralAssessmentForUser(lesson, selectedStudentRow.memberId);
      const attendanceRecord = getMemberAttendanceRecord(
        lesson,
        selectedStudentRow.memberId,
      );
      const draft = studentMasteryDrafts[lessonId] || {};

      return {
        id: lessonId,
        index,
        title: lesson.title || `${index + 1}-dars`,
        description: (lesson.description || "").trim(),
        homework,
        homeworkAssignments: getHomeworkAssignments(homeworkSource),
        homeworkLoading:
          Boolean(masteryHomeworkLoading[`${courseId}:${lessonId}`]) &&
          !homeworkData,
        exercise,
        exerciseTests: Array.isArray(lesson.linkedTests) ? lesson.linkedTests : [],
        oralScore:
          draft.score !== undefined
            ? draft.score
            : oral?.score === null || oral?.score === undefined
              ? ""
              : String(oral.score),
        oralScoreDisplay:
          oral?.score === null || oral?.score === undefined
            ? "—"
            : `${oral.score}/100`,
        oralNote: draft.note !== undefined ? draft.note : oral?.note || "",
        attendanceStatus:
          draft.attendanceStatus !== undefined
            ? draft.attendanceStatus
            : attendanceRecord?.status || "",
        updatedAt: oral?.updatedAt || oral?.createdAt || null,
        isGraded: hasSavedOralAssessment(oral),
      };
    });
  }, [
    masteryHomeworkCache,
    masteryHomeworkLoading,
    selectedStudentRow,
    studentMasteryDrafts,
  ]);

  const selectedStudentMasterySummary = useMemo(
    () =>
      selectedStudentRow?.course
        ? getMasterySummary(selectedStudentRow.course, selectedStudentRow.memberId)
        : {
            masteryPercent: 0,
            completedLessons: 0,
            totalLessons: 0,
            averageProgress: 0,
          },
    [selectedStudentRow],
  );

  const selectedLessonMasteryRows = useMemo(() => {
    if (!selectedCourse || !selectedLessonContent) return [];

    const courseId = getCourseId(selectedCourse);
    const lessonId = getLessonId(selectedLessonContent);
    const homeworkData = masteryHomeworkCache[`${courseId}:${lessonId}`];
    const homeworkSource = homeworkData
      ? { ...selectedLessonContent, homework: homeworkData }
      : selectedLessonContent;

    return masteryRows
      .filter((row) => getCourseId(row.course) === getCourseId(selectedCourse))
      .map((row) => {
        const homework = getHomeworkLessonSummary(
          homeworkSource,
          row.memberId,
        );
        const exercise = getExerciseLessonSummary(
          selectedLessonContent,
          row.memberId,
        );
        const oral = getLessonOralAssessmentForUser(
          selectedLessonContent,
          row.memberId,
        );
        const attendanceScore = getLessonAttendanceScoreBucket(
          selectedLessonContent,
          row.memberId,
        );
        const attendancePercent = getBucketPercent(attendanceScore);
        const homeworkCompletedCount =
          homework.percent === null || homework.percent === undefined
            ? homework.submittedCount
            : homework.reviewedCount;
        const homeworkTotalCount = getHomeworkAssignments(homeworkSource).length;
        const exercisePercent =
          exercise.averagePercent === null || exercise.averagePercent === undefined
            ? null
            : exercise.averagePercent;
        const teacherPercent =
          oral?.score === null || oral?.score === undefined
            ? null
            : Number(oral.score || 0);
        const lessonMasteryPercent = averageKnownPercents(
          attendancePercent,
          homework.percent,
          exercisePercent,
          teacherPercent,
        );

        return {
          ...row,
          homework,
          exercise,
          attendanceScoreLabel: formatScoreBucketWithPercent(attendanceScore),
          homeworkScoreLabel: formatCompletionWithPercent(
            homeworkCompletedCount,
            homeworkTotalCount,
            homework.percent,
          ),
          exerciseScoreLabel: formatCompletionWithPercent(
            exercise.completedCount,
            exercise.totalCount,
            exercise.averagePercent,
          ),
          oralScore:
            oral?.score === null || oral?.score === undefined
              ? "—"
              : `${oral.score}/100`,
          oralSaved: hasSavedOralAssessment(oral),
          lessonMasteryPercent,
        };
      });
  }, [masteryHomeworkCache, masteryRows, selectedCourse, selectedLessonContent]);

  const getMemberActionKey = useCallback(
    (courseId, userId) => `${String(courseId || "")}:${String(userId || "")}`,
    [],
  );

  const handleApprove = useCallback(
    async (courseId, userId) => {
      const actionKey = getMemberActionKey(courseId, userId);
      try {
        setApprovingMemberKey(actionKey);
        await approveUser(courseId, userId);
        toast.success(t("teacher.students.approved"));
      } catch {
        toast.error(t("teacher.students.approveError"));
      } finally {
        setApprovingMemberKey("");
      }
    },
    [approveUser, getMemberActionKey, t],
  );

  const handleRemoveStudent = useCallback(
    async (courseId, userId) => {
      if (!window.confirm(t("teacher.students.confirmRemove"))) {
        return;
      }

      const actionKey = getMemberActionKey(courseId, userId);
      try {
        setRemovingStudentKey(actionKey);
        await removeUser(courseId, userId);
        toast.success(t("teacher.students.remove"));
      } catch {
        toast.error(t("teacher.students.removeError"));
      } finally {
        setRemovingStudentKey("");
      }
    },
    [getMemberActionKey, removeUser, t],
  );

  const handleDeleteCourse = useCallback(async () => {
    if (!courseToDelete) return;

    const courseId = getCourseId(courseToDelete);
    setIsDeletingCourse(true);

    try {
      await removeCourse(courseId);
      toast.success(t("teacher.courses.deleted"));
      setCourseToDelete(null);
      if (String(selectedCourseId || "") === courseId) {
        setSelectedCourseId(null);
        setSelectedLessonId(null);
        navigate("/teacher/courses");
      }
    } catch {
      toast.error(t("teacher.courses.deleteError"));
    } finally {
      setIsDeletingCourse(false);
    }
  }, [courseToDelete, navigate, removeCourse, selectedCourseId, t]);

  const handleDeleteLessonConfirm = useCallback(async () => {
    if (!lessonToDelete || !selectedCourse) return;

    try {
      setIsDeletingLesson(true);
      await removeLesson(getCourseId(selectedCourse), getLessonId(lessonToDelete));
      setLessonToDelete(null);
    } catch {
      toast.error(
        t("coursePlayer.errors.deleteLesson", {
          defaultValue: "Darsni o‘chirib bo‘lmadi",
        }),
      );
    } finally {
      setIsDeletingLesson(false);
    }
  }, [lessonToDelete, removeLesson, selectedCourse, t]);

  const handleDeleteTeacherTest = useCallback(async () => {
    if (!teacherTestToDelete) return;

    try {
      setIsDeletingArenaItem(true);
      await deleteTest(teacherTestToDelete._id || teacherTestToDelete.id);
      setTeacherTests((prev) =>
        prev.filter(
          (item) =>
            String(item._id || item.id) !==
            String(teacherTestToDelete._id || teacherTestToDelete.id),
        ),
      );
      setTeacherTestToDelete(null);
      toast.success(
        t("teacher.workspace.testDeleted", {
          defaultValue: "Test o'chirildi",
        }),
      );
    } catch {
      toast.error(
        t("teacher.workspace.testDeleteError", {
          defaultValue: "Testni o'chirib bo'lmadi",
        }),
      );
    } finally {
      setIsDeletingArenaItem(false);
    }
  }, [t, teacherTestToDelete]);

  const handleDeleteTeacherSentenceBuilder = useCallback(async () => {
    if (!teacherSentenceBuilderToDelete) return;

    try {
      setIsDeletingArenaItem(true);
      await deleteSentenceBuilderDeck(
        teacherSentenceBuilderToDelete._id || teacherSentenceBuilderToDelete.id,
      );
      setTeacherSentenceBuilders((prev) =>
        prev.filter(
          (item) =>
            String(item._id || item.id) !==
            String(
              teacherSentenceBuilderToDelete._id ||
                teacherSentenceBuilderToDelete.id,
            ),
        ),
      );
      setTeacherSentenceBuilderToDelete(null);
      toast.success(
        t("teacher.workspace.sentenceBuilderDeleted", {
          defaultValue: "Gap tuzish decki o'chirildi",
        }),
      );
    } catch {
      toast.error(
        t("teacher.workspace.sentenceBuilderDeleteError", {
          defaultValue: "Gap tuzish deckini o'chirib bo'lmadi",
        }),
      );
    } finally {
      setIsDeletingArenaItem(false);
    }
  }, [t, teacherSentenceBuilderToDelete]);

  const refreshSentenceBuilders = useCallback(async () => {
    setSentenceBuildersLoading(true);
    try {
      const response = await fetchSentenceBuilders(1, 12);
      const items = Array.isArray(response)
        ? response
        : response?.items || response?.decks || response?.sentenceBuilders || response?.data || [];
      setTeacherSentenceBuilders(Array.isArray(items) ? items : []);
    } catch {
      // silent
    } finally {
      setSentenceBuildersLoading(false);
    }
  }, []);

  const openShareDialog = useCallback(async (deck) => {
    setTeacherArenaMenuId(null);
    setShareDeck(deck);
    setShareMode("persist");
    setShareGroupName("");
    setShareShowResults(true);
    setShareTimeLimit(0);
    setLoadingShareLinks(true);
    try {
      const data = await fetchSentenceBuilderShareLinks(deck._id);
      setShareLinks(Array.isArray(data) ? data : []);
    } finally {
      setLoadingShareLinks(false);
    }
  }, []);

  const handleCreateShareLink = useCallback(async () => {
    if (!shareDeck || creatingShareLink) return;
    if (shareMode === "persist" && !shareGroupName.trim()) {
      toast.error("Guruh nomini kiriting");
      return;
    }
    setCreatingShareLink(true);
    try {
      const created = await createSentenceBuilderShareLink(shareDeck._id, {
        persistResults: shareMode === "persist",
        groupName: shareMode === "persist" ? shareGroupName.trim() : "",
        showResults: shareShowResults,
        timeLimit: Number(shareTimeLimit) || 0,
      });
      setShareLinks((prev) => [created, ...prev]);
      const url = `${RESOLVED_APP_BASE_URL}/arena/sentence-builder/${created.shortCode}`;
      await navigator.clipboard.writeText(url);
      toast.success("Havola yaratildi va nusxalandi.");
      setShareGroupName("");
      setShareShowResults(true);
      setShareTimeLimit(0);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Havolani yaratishda xatolik yuz berdi");
    } finally {
      setCreatingShareLink(false);
    }
  }, [shareDeck, creatingShareLink, shareMode, shareGroupName, shareShowResults, shareTimeLimit]);

  const handleCopyShareLink = useCallback(async (shortCode) => {
    try {
      await navigator.clipboard.writeText(
        `${RESOLVED_APP_BASE_URL}/arena/sentence-builder/${shortCode}`,
      );
      toast.success("Havola nusxalandi.");
    } catch {
      toast.error("Havolani nusxalab bo'lmadi");
    }
  }, []);

  const handleDeleteShareLink = useCallback(async (shareLinkId) => {
    if (!shareDeck || deletingShareLinkId) return;
    setDeletingShareLinkId(shareLinkId);
    try {
      await deleteSentenceBuilderShareLink(shareDeck._id, shareLinkId);
      setShareLinks((prev) => prev.filter((item) => item._id !== shareLinkId));
      toast.success("Havola o'chirildi.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Havolani o'chirishda xatolik yuz berdi");
    } finally {
      setDeletingShareLinkId(null);
    }
  }, [shareDeck, deletingShareLinkId]);

  const handleLoadResults = useCallback(async (deck) => {
    setTeacherArenaMenuId(null);
    setResultsDeck(deck);
    setLoadingResults(true);
    try {
      const response = await fetchSentenceBuilderResults(deck._id, { page: 1, limit: 500 });
      setResultsData(response?.data || []);
    } finally {
      setLoadingResults(false);
    }
  }, []);

  // Test share links — load when shareTest changes (mirrors TestList useEffect)
  useEffect(() => {
    if (!shareTest?._id) {
      setShareTestLinks([]);
      return;
    }
    setLoadingTestShareLinks(true);
    fetchTestShareLinks(shareTest._id)
      .then((data) => setShareTestLinks(Array.isArray(data) ? data : []))
      .catch(() => setShareTestLinks([]))
      .finally(() => setLoadingTestShareLinks(false));
  }, [shareTest]);

  const openTestShareDialog = useCallback((test) => {
    setTeacherArenaMenuId(null);
    setShareTest(test);
    setShareTestMode("persist");
    setShareTestGroupName("");
    setShareTestShowResults(true);
    setShareTestTimeLimit(0);
  }, []);

  const handleCreateTestShareLink = useCallback(async () => {
    if (!shareTest || creatingTestShareLink) return;
    setCreatingTestShareLink(true);
    try {
      const response = await createTestShareLink(shareTest._id, {
        persistResults: shareTestMode !== "ephemeral",
        groupName: shareTestMode === "persist" ? shareTestGroupName.trim() : "",
        showResults: shareTestShowResults,
        timeLimit: Number(shareTestTimeLimit) || 0,
      });
      const url = `${RESOLVED_APP_BASE_URL}/arena/quiz-link/${response.shortCode}`;
      await navigator.clipboard.writeText(url);
      setShareTestLinks((prev) => [response, ...prev]);
      toast.success("Qisqa test havolasi nusxalandi!");
      setShareTestGroupName("");
      setShareTestMode("persist");
      setShareTestShowResults(true);
      setShareTestTimeLimit(0);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Test havolasini yaratishda xatolik yuz berdi.",
      );
    } finally {
      setCreatingTestShareLink(false);
    }
  }, [shareTest, creatingTestShareLink, shareTestMode, shareTestGroupName, shareTestShowResults, shareTestTimeLimit]);

  const handleCopyTestExistingLink = useCallback(async (shortCode) => {
    const url = `${RESOLVED_APP_BASE_URL}/arena/quiz-link/${shortCode}`;
    await navigator.clipboard.writeText(url);
    toast.success("Test havolasi nusxalandi!");
  }, []);

  const handleDeleteTestShareLink = useCallback(async (shareLinkId) => {
    if (!shareTest?._id) return;
    setDeletingTestShareLinkId(shareLinkId);
    try {
      await deleteTestShareLink(shareTest._id, shareLinkId);
      setShareTestLinks((prev) => prev.filter((item) => item._id !== shareLinkId));
      toast.success("Havola o'chirildi.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Havolani o'chirishda xatolik yuz berdi");
    } finally {
      setDeletingTestShareLinkId(null);
    }
  }, [shareTest]);

  const refreshTests = useCallback(async () => {
    setTestsLoading(true);
    try {
      const response = await fetchMyTests(1, 12);
      const items = Array.isArray(response)
        ? response
        : response?.items || response?.tests || response?.data || [];
      setTeacherTests(Array.isArray(items) ? items : []);
    } catch {
      // silent
    } finally {
      setTestsLoading(false);
    }
  }, []);

  const openCourseEditor = useCallback((course) => {
    setEditingCourse(course);
    setCreateOpen(false);
  }, []);

  const openCourseLessonCreator = useCallback(() => {
    setEditingCourseLesson(null);
    setCourseLessonDialogOpen(true);
  }, []);

  const openCourseLessonEditor = useCallback((lesson) => {
    setEditingCourseLesson(lesson);
    setCourseLessonDialogOpen(true);
  }, []);

  const openLessonContentManager = useCallback((lesson) => {
    setLessonContentLessonId(getLessonId(lesson));
  }, []);

  const closeLessonContentManager = useCallback(() => {
    setLessonContentLessonId(null);
  }, []);

  const handleCopyCourseLink = useCallback(
    async (course) => {
      try {
        const courseSlug = course?.urlSlug || course?._id || course?.id;
        if (!courseSlug) {
          throw new Error("Missing course slug");
        }

        await navigator.clipboard.writeText(
          `${window.location.origin}/my-courses/${courseSlug}`,
        );
        toast.success(t("coursePlayer.playlist.copyCourseSuccess"));
      } catch {
        toast.error(
          t("coursePlayer.playlist.copyFailed", {
            defaultValue: "Havolani nusxalab bo‘lmadi",
          }),
        );
      }
    },
    [t],
  );

  const handleStudentChatOpen = useCallback(async () => {
    if (!selectedStudentRow?.memberId) return;

    try {
      setIsStartingChat(true);
      const chat = await createChat({
        isGroup: false,
        memberIds: [selectedStudentRow.memberId],
      });
      const chatSlug = chat?.urlSlug || chat?.jammId || chat?._id || chat?.id;
      if (chatSlug) {
        setSelectedStudentRow(null);
        navigate(`/users/${chatSlug}`);
      }
    } catch {
      toast.error(
        t("teacher.workspace.studentChatError", {
          defaultValue: "O‘quvchi bilan chat ochilmadi",
        }),
      );
    } finally {
      setIsStartingChat(false);
    }
  }, [createChat, navigate, selectedStudentRow, t]);

  const handleMasteryDraftChange = useCallback((lessonId, field, value) => {
    setMasteryDrafts((prev) => ({
      ...prev,
      [lessonId]: {
        ...(prev[lessonId] || {}),
        [field]: value,
      },
    }));
  }, []);

  const handleStudentMasteryDraftChange = useCallback((lessonId, field, value) => {
    setStudentMasteryDrafts((prev) => ({
      ...prev,
      [lessonId]: {
        ...(prev[lessonId] || {}),
        [field]: value,
      },
    }));
  }, []);

  const handleMasterySave = useCallback(
    async (row, lessonInput) => {
      const lessonId =
        typeof lessonInput === "string" ? lessonInput : lessonInput?.id || "";
      const lessonRow = typeof lessonInput === "string" ? null : lessonInput;
      if (!row?.course || !row.memberId || !lessonId) return;

      const courseId = getCourseId(row.course);
      const draft = masteryDrafts[lessonId] || {};
      const rawScore = draft.score;
      const score =
        rawScore === "" || rawScore === undefined || rawScore === null
          ? null
          : Number(rawScore);

      if (score !== null && (!Number.isFinite(score) || score < 0 || score > 100)) {
        toast.error(
          t("teacher.workspace.scoreRangeError", {
            defaultValue: "Baho 0 dan 100 gacha bo'lishi kerak",
          }),
        );
        return;
      }

      const homeworkReviewUpdates = [];
      for (const assignment of lessonRow?.homeworkAssignments || []) {
        const assignmentId = assignment?.assignmentId;
        const submission = getHomeworkSubmissionForUser(assignment, row.memberId);
        if (!assignmentId || !submission) continue;

        const userId = String(row.memberId || "");
        const draftKey = `${lessonId}:${assignmentId}:${userId}`;
        const homeworkDraft = homeworkReviewDrafts[draftKey];
        if (!homeworkDraft) continue;

        const rawHomeworkScore =
          homeworkDraft.score !== undefined
            ? homeworkDraft.score
            : submission.score ?? "";
        const maxScore = Math.max(1, Number(assignment.maxScore || 100));
        const homeworkScore =
          rawHomeworkScore === "" ||
          rawHomeworkScore === null ||
          rawHomeworkScore === undefined
            ? null
            : Number(rawHomeworkScore);

        if (
          homeworkScore !== null &&
          (!Number.isFinite(homeworkScore) ||
            homeworkScore < 0 ||
            homeworkScore > maxScore)
        ) {
          toast.error(
            t("teacher.workspace.scoreRangeError", {
              defaultValue: "Baho 0 dan 100 gacha bo'lishi kerak",
            }),
          );
          return;
        }

        const feedback =
          homeworkDraft.feedback !== undefined
            ? homeworkDraft.feedback
            : submission.feedback || "";
        const currentScore =
          submission.score === null || submission.score === undefined
            ? null
            : Number(submission.score);
        const normalizedCurrentScore = Number.isFinite(currentScore)
          ? currentScore
          : null;
        const scoreChanged = homeworkScore !== normalizedCurrentScore;
        const feedbackChanged = feedback !== (submission.feedback || "");

        if (!scoreChanged && !feedbackChanged) continue;

        homeworkReviewUpdates.push({
          assignmentId,
          draftKey,
          feedback,
          score: homeworkScore,
        });
      }

      const saveKey = `${row.memberId}-${lessonId}`;
      setSavingMasteryKey(saveKey);

      try {
        const attendanceStatus =
          draft.attendanceStatus || (score === 0 ? "absent" : "present");
        await setLessonOralAssessment(courseId, lessonId, row.memberId, {
          score,
          note: draft.note || "",
        });
        await setLessonAttendanceStatus(
          courseId,
          lessonId,
          row.memberId,
          attendanceStatus,
        );
        for (const update of homeworkReviewUpdates) {
          await reviewLessonHomework(
            courseId,
            lessonId,
            update.assignmentId,
            row.memberId,
            {
              status: "reviewed",
              score: update.score,
              feedback: update.feedback,
            },
          );
        }

        if (homeworkReviewUpdates.length && getLessonHomework) {
          const nextHomework = await getLessonHomework(courseId, lessonId);
          setMasteryHomeworkCache((prev) => ({
            ...prev,
            [`${courseId}:${lessonId}`]: nextHomework || { assignments: [] },
          }));
          setHomeworkReviewDrafts((prev) => {
            const next = { ...prev };
            homeworkReviewUpdates.forEach((update) => {
              next[update.draftKey] = {
                score: update.score === null ? "" : String(update.score),
                feedback: update.feedback,
              };
            });
            return next;
          });
        }

        setSelectedMasteryRow((prev) => {
          if (!prev || prev.id !== row.id) return prev;

          const withAssessment = patchLessonOralAssessment(
            prev.course,
            lessonId,
            row.memberId,
            score,
            draft.note || "",
          );
          const nextCourse = patchLessonAttendanceStatus(
            withAssessment,
            lessonId,
            row.memberId,
            attendanceStatus,
          );

          return {
            ...prev,
            course: nextCourse,
            ...getMasterySummary(nextCourse, row.memberId),
          };
        });
        setMasteryDrafts((prev) => ({
          ...prev,
          [lessonId]: {
            score: score === null ? "" : String(score),
            note: draft.note || "",
            attendanceStatus,
          },
        }));
        setCollapsedMasteryLessons((prev) => ({
          ...prev,
          [lessonId]: true,
        }));
        await fetchCourses();
        // fetchCourses() list API may not return oralAssessments, so re-apply
        // the saved assessment directly into the in-memory courses state so
        // reopening the mastery panel shows the correct graded value.
        patchCourseLesson(courseId, lessonId, (lesson) => {
          const nextAssessments = Array.isArray(lesson.oralAssessments)
            ? [...lesson.oralAssessments]
            : [];
          const existingIndex = nextAssessments.findIndex(
            (item) =>
              String(getEntityId(item?.userId || item)) ===
              String(row.memberId || ""),
          );
          const nextAssessment = {
            userId: row.memberId,
            score,
            note: draft.note || "",
            updatedAt: new Date().toISOString(),
          };
          if (existingIndex >= 0) {
            nextAssessments[existingIndex] = nextAssessment;
          } else {
            nextAssessments.push(nextAssessment);
          }
          return { ...lesson, oralAssessments: nextAssessments };
        });
        toast.success(
          t("teacher.workspace.masterySaved", {
            defaultValue: "Baho saqlandi",
          }),
        );
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            t("teacher.workspace.masterySaveError", {
              defaultValue: "Bahoni saqlab bo'lmadi",
            }),
        );
      } finally {
        setSavingMasteryKey("");
      }
    },
    [
      fetchCourses,
      getLessonHomework,
      homeworkReviewDrafts,
      masteryDrafts,
      patchCourseLesson,
      reviewLessonHomework,
      setLessonAttendanceStatus,
      setLessonOralAssessment,
      t,
    ],
  );

  const handleHomeworkReviewDraftChange = useCallback((key, field, value) => {
    setHomeworkReviewDrafts((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [field]: value,
      },
    }));
  }, []);

  const renderHomeworkSubmissionPreview = useCallback(
    (submission, assignment, lessonId, userId) => {
      if (!submission) return null;
      const fileUrl = submission.fileUrl || submission.link || "";
      const mediaType = detectHomeworkSubmissionType(
        submission,
        assignment?.type || "text",
      );

      if (mediaType === "video" || submission.streamType === "hls") {
        return (
          <HomeworkPreviewFrame>
            <HomeworkSubmissionPlayer
              courseId={getCourseId(
                selectedHomeworkReview?.row?.course || selectedMasteryRow?.course,
              )}
              lessonId={lessonId}
              assignmentId={assignment?.assignmentId}
              submissionUserId={userId}
              streamType={submission.streamType || "direct"}
              fallbackUrl={fileUrl}
            />
          </HomeworkPreviewFrame>
        );
      }

      if (!fileUrl) return null;
      if (mediaType === "image") {
        return (
          <HomeworkPreviewFrame>
            <a href={fileUrl} target="_blank" rel="noreferrer">
              <HomeworkPreviewImage
                src={fileUrl}
                alt={submission.fileName || assignment?.title || "Uyga vazifa"}
              />
            </a>
          </HomeworkPreviewFrame>
        );
      }
      if (mediaType === "audio") {
        return (
          <audio controls preload="metadata" style={{ width: "100%" }} src={fileUrl} />
        );
      }
      if (mediaType === "pdf") {
        return (
          <HomeworkPreviewFrame>
            <HomeworkPreviewIframe
              title={submission.fileName || assignment?.title || "PDF"}
              src={fileUrl}
            />
          </HomeworkPreviewFrame>
        );
      }
      return null;
    },
    [selectedHomeworkReview?.row?.course, selectedMasteryRow?.course],
  );

  const handleMasteryHomeworkReview = useCallback(
    async ({ row, lessonId, assignment, submission, status }) => {
      if (!row?.course || !lessonId || !assignment?.assignmentId || !submission) return;

      const courseId = getCourseId(row.course);
      const userId = String(row.memberId || "");
      const draftKey = `${lessonId}:${assignment.assignmentId}:${userId}`;
      const draft = homeworkReviewDrafts[draftKey] || {};
      const rawScore =
        draft.score !== undefined ? draft.score : submission.score ?? "";
      const maxScore = Math.max(1, Number(assignment.maxScore || 100));
      const score =
        rawScore === "" || rawScore === null || rawScore === undefined
          ? null
          : Math.max(0, Math.min(maxScore, Number(rawScore)));

      if (score !== null && !Number.isFinite(score)) {
        toast.error(
          t("teacher.workspace.scoreRangeError", {
            defaultValue: "Baho 0 dan 100 gacha bo'lishi kerak",
          }),
        );
        return;
      }

      setSavingHomeworkReviewKey(draftKey);
      try {
        const nextPayload = {
          status,
          score,
          feedback:
            draft.feedback !== undefined ? draft.feedback : submission.feedback || "",
        };
        await reviewLessonHomework(
          courseId,
          lessonId,
          assignment.assignmentId,
          userId,
          nextPayload,
        );
        const nextHomework = await getLessonHomework(courseId, lessonId);
        setMasteryHomeworkCache((prev) => ({
          ...prev,
          [`${courseId}:${lessonId}`]: nextHomework || { assignments: [] },
        }));
        setHomeworkReviewDrafts((prev) => ({
          ...prev,
          [draftKey]: {
            score: score === null ? "" : String(score),
            feedback: nextPayload.feedback,
          },
        }));
        await fetchCourses();
        toast.success(
          t("coursePlayer.homework.reviewed", {
            defaultValue: "Tekshirildi",
          }),
        );
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            t("coursePlayer.homework.errors.reviewFailed", {
              defaultValue: "Uyga vazifani tekshirib bo'lmadi",
            }),
        );
      } finally {
        setSavingHomeworkReviewKey("");
      }
    },
    [
      fetchCourses,
      getLessonHomework,
      homeworkReviewDrafts,
      reviewLessonHomework,
      t,
    ],
  );

  const handleExerciseAnswerOpen = useCallback(
    async ({ test, testId, userId }) => {
      if (!testId || !userId) return;
      const detailKey = `${testId}:${userId}`;

      setSelectedExerciseAnswer({
        test,
        detailKey,
        title: test?.title || test?.name || "Mashq",
      });

      if (exerciseAnswerDetails[detailKey] || exerciseAnswerLoading[detailKey]) {
        return;
      }

      setExerciseAnswerLoading((prev) => ({ ...prev, [detailKey]: true }));
      try {
        const [testDetail, resultsResponse] = await Promise.all([
          fetchTestById(testId),
          fetchTestResults(testId, { page: 1, limit: 500 }),
        ]);
        const histories = Array.isArray(resultsResponse)
          ? resultsResponse
          : resultsResponse?.data || [];
        const matchingAttempt = histories
          .flatMap((history) =>
            (history.participants || []).map((participant) => ({
              history,
              participant,
            })),
          )
          .find(({ participant }) =>
            [
              participant?.userId,
              participant?.studentId,
              participant?.memberId,
              participant,
            ].some(
              (value) => String(getEntityId(value)) === String(userId || ""),
            ),
          );
        const participant = matchingAttempt?.participant || null;
        const questions = (testDetail?.questions || []).map((question, index) => {
          const result = (participant?.results || []).find(
            (item) => Number(item.questionIndex) === index,
          );
          const userAnswerIndex = Array.isArray(participant?.answers)
            ? Number(participant.answers[index])
            : null;
          const correctOptionIndex = Number(
            result?.correctOptionIndex ?? question.correctOptionIndex,
          );
          const normalizedUserIndex = Number.isFinite(userAnswerIndex)
            ? userAnswerIndex
            : null;

          return {
            questionIndex: index,
            questionText: question.questionText || "",
            options: Array.isArray(question.options) ? question.options : [],
            userAnswerIndex: normalizedUserIndex,
            correctOptionIndex,
            correct: result
              ? Boolean(result.correct)
              : normalizedUserIndex !== null &&
                normalizedUserIndex === correctOptionIndex,
          };
        });
        const detail = {
          score: participant?.score || 0,
          total: participant?.total || questions.length,
          attemptedAt: matchingAttempt?.history?.createdAt || null,
          questions,
        };
        setExerciseAnswerDetails((prev) => ({
          ...prev,
          [detailKey]: detail || null,
        }));
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            t("teacher.workspace.testDetailLoadError", {
              defaultValue: "Javob kalitlarini yuklab bo'lmadi",
            }),
        );
        setSelectedExerciseAnswer(null);
      } finally {
        setExerciseAnswerLoading((prev) => ({ ...prev, [detailKey]: false }));
      }
    },
    [exerciseAnswerDetails, exerciseAnswerLoading, t],
  );

  const handleStudentMasterySave = useCallback(
    async (row, lessonInput) => {
      const lessonId =
        typeof lessonInput === "string" ? lessonInput : lessonInput?.id || "";
      const lessonRow = typeof lessonInput === "string" ? null : lessonInput;
      if (!row?.course || !row.memberId || !lessonId) return;

      const courseId = getCourseId(row.course);
      const draft = studentMasteryDrafts[lessonId] || {};
      const rawScore = draft.score;
      const score =
        rawScore === "" || rawScore === undefined || rawScore === null
          ? null
          : Number(rawScore);

      if (score !== null && (!Number.isFinite(score) || score < 0 || score > 100)) {
        toast.error(
          t("teacher.workspace.scoreRangeError", {
            defaultValue: "Baho 0 dan 100 gacha bo'lishi kerak",
          }),
        );
        return;
      }

      const homeworkReviewUpdates = [];
      for (const assignment of lessonRow?.homeworkAssignments || []) {
        const assignmentId = assignment?.assignmentId;
        const submission = getHomeworkSubmissionForUser(assignment, row.memberId);
        if (!assignmentId || !submission) continue;

        const userId = String(row.memberId || "");
        const draftKey = `${lessonId}:${assignmentId}:${userId}`;
        const homeworkDraft = homeworkReviewDrafts[draftKey];
        if (!homeworkDraft) continue;

        const rawHomeworkScore =
          homeworkDraft.score !== undefined
            ? homeworkDraft.score
            : submission.score ?? "";
        const maxScore = Math.max(1, Number(assignment.maxScore || 100));
        const homeworkScore =
          rawHomeworkScore === "" ||
          rawHomeworkScore === null ||
          rawHomeworkScore === undefined
            ? null
            : Number(rawHomeworkScore);

        if (
          homeworkScore !== null &&
          (!Number.isFinite(homeworkScore) ||
            homeworkScore < 0 ||
            homeworkScore > maxScore)
        ) {
          toast.error(
            t("teacher.workspace.scoreRangeError", {
              defaultValue: "Baho 0 dan 100 gacha bo'lishi kerak",
            }),
          );
          return;
        }

        const feedback =
          homeworkDraft.feedback !== undefined
            ? homeworkDraft.feedback
            : submission.feedback || "";
        const currentScore =
          submission.score === null || submission.score === undefined
            ? null
            : Number(submission.score);
        const normalizedCurrentScore = Number.isFinite(currentScore)
          ? currentScore
          : null;
        if (homeworkScore === normalizedCurrentScore && feedback === (submission.feedback || "")) {
          continue;
        }

        homeworkReviewUpdates.push({
          assignmentId,
          draftKey,
          feedback,
          score: homeworkScore,
        });
      }

      const saveKey = `${row.memberId}-${lessonId}`;
      setSavingMasteryKey(saveKey);

      try {
        const currentLesson = (row.course?.lessons || []).find(
          (lesson) => getLessonId(lesson) === String(lessonId || ""),
        );
        const existingAttendance =
          getMemberAttendanceRecord(currentLesson, row.memberId)?.status || "";
        const attendanceStatus =
          draft.attendanceStatus || existingAttendance || (score === 0 ? "absent" : "present");
        await setLessonOralAssessment(courseId, lessonId, row.memberId, {
          score,
          note: draft.note || "",
        });
        await setLessonAttendanceStatus(
          courseId,
          lessonId,
          row.memberId,
          attendanceStatus,
        );
        for (const update of homeworkReviewUpdates) {
          await reviewLessonHomework(
            courseId,
            lessonId,
            update.assignmentId,
            row.memberId,
            {
              status: "reviewed",
              score: update.score,
              feedback: update.feedback,
            },
          );
        }

        if (homeworkReviewUpdates.length && getLessonHomework) {
          const nextHomework = await getLessonHomework(courseId, lessonId);
          setMasteryHomeworkCache((prev) => ({
            ...prev,
            [`${courseId}:${lessonId}`]: nextHomework || { assignments: [] },
          }));
          setHomeworkReviewDrafts((prev) => {
            const next = { ...prev };
            homeworkReviewUpdates.forEach((update) => {
              next[update.draftKey] = {
                score: update.score === null ? "" : String(update.score),
                feedback: update.feedback,
              };
            });
            return next;
          });
        }

        setSelectedStudentRow((prev) => {
          if (!prev || prev.id !== row.id) return prev;

          const withAssessment = patchLessonOralAssessment(
            prev.course,
            lessonId,
            row.memberId,
            score,
            draft.note || "",
          );
          const nextCourse = patchLessonAttendanceStatus(
            withAssessment,
            lessonId,
            row.memberId,
            attendanceStatus,
          );

          return {
            ...prev,
            course: nextCourse,
            ...getAttendanceSummary(nextCourse, row.memberId),
            ...getMasterySummary(nextCourse, row.memberId),
          };
        });

        await fetchCourses();
        setCollapsedStudentMasteryLessons((prev) => ({
          ...prev,
          [lessonId]: true,
        }));
        toast.success(
          t("teacher.workspace.masterySaved", {
            defaultValue: "Baholash saqlandi",
          }),
        );
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            t("teacher.workspace.masterySaveError", {
              defaultValue: "Bahoni saqlab bo'lmadi",
            }),
        );
      } finally {
        setSavingMasteryKey("");
      }
    },
    [
      fetchCourses,
      getLessonHomework,
      homeworkReviewDrafts,
      reviewLessonHomework,
      setLessonAttendanceStatus,
      setLessonOralAssessment,
      studentMasteryDrafts,
      t,
    ],
  );

  const openCourseWorkspace = useCallback(
    (courseId, { lessonId = null } = {}) => {
      const nextCourse =
        teacherCourses.find(
          (course) => getCourseId(course) === String(courseId || ""),
        ) || null;
      const fallbackLessonId = nextCourse?.lessons?.length
        ? getLessonId(nextCourse.lessons[0])
        : null;

      setSelectedCourseId(courseId);
      setSelectedLessonId(lessonId || fallbackLessonId || null);
      setActiveSection("courses");
      navigate(`/teacher/courses/${courseId}`);
    },
    [navigate, teacherCourses],
  );

  const handleSectionChange = useCallback(
    (sectionId) => {
      setActiveSection(sectionId);
      if (sectionId === "courses") {
        navigate("/teacher/courses");
        return;
      }
      navigate("/teacher");
    },
    [navigate],
  );

  const handleBackToCourses = useCallback(() => {
    setSelectedLessonId(null);
    setSelectedCourseId(null);
    setActiveSection("courses");
    navigate("/teacher/courses");
  }, [navigate]);

  if (initialized && !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!initialized) {
    return null;
  }

  if (currentUser && !currentUser.isInstructor) {
    return <Navigate to="/chats" replace />;
  }

  const currentUserName =
    currentUser?.nickname || currentUser?.username || t("common.userFallback");
  const currentUserInitial = currentUserName.charAt(0).toUpperCase();
  const lessonContentModalSource = useMemo(
    () =>
      selectedCourse && selectedLessonContent
        ? {
            course: selectedCourse,
            lesson: selectedLessonContent,
          }
        : null,
    [selectedCourse, selectedLessonContent],
  );
  const {
    renderValue: lessonContentModalData,
    isVisible: isLessonContentModalVisible,
  } = useAnimatedModalState(lessonContentModalSource);
  const {
    renderValue: animatedMasteryRow,
    isVisible: isMasteryModalVisible,
  } = useAnimatedModalState(selectedMasteryRow);
  const {
    renderValue: animatedStudentRow,
    isVisible: isStudentModalVisible,
  } = useAnimatedModalState(selectedStudentRow);
  const studentModalRow = animatedStudentRow || selectedStudentRow;
  const studentModalCourse = studentModalRow?.course || null;
  const studentModalCourseLabel =
    studentModalCourse?.title || studentModalCourse?.name || "—";

  const formatPlaybackTime = (value) => {
    const totalSeconds = Math.max(0, Math.round(Number(value || 0)));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const formatDateTime = (value) => {
    if (!value) return "—";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat("uz-UZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderSectionHeader = (title, description, actions = null) => (
    <SectionCard>
      <PageHeader>
        <PageTitleBlock>
          <PageTitle>{title}</PageTitle>
          <PageDescription>{description}</PageDescription>
        </PageTitleBlock>
        {actions ? <ActionRow>{actions}</ActionRow> : null}
      </PageHeader>
    </SectionCard>
  );

  const renderDashboard = () => (
    <>
      {renderSectionHeader(
        t("teacher.nav.dashboard"),
        t("teacher.workspace.dashboardSubtitle", {
          defaultValue:
            "Asosiy ko‘rsatkichlar, tezkor approvallar va kurslar bo‘yicha umumiy holat shu yerda turadi.",
        }),
      )}

      <StatGrid>
        <StatCard>
          <StatIconSlot><BookOpen size={14} /></StatIconSlot>
          <StatCardBody>
            <StatValue>{teacherCourses.length}</StatValue>
            <StatLabel>{t("teacher.stats.courses")}</StatLabel>
          </StatCardBody>
        </StatCard>
        <StatCard>
          <StatIconSlot><Users size={14} /></StatIconSlot>
          <StatCardBody>
            <StatValue>{totalStudents}</StatValue>
            <StatLabel>{t("teacher.stats.students")}</StatLabel>
          </StatCardBody>
        </StatCard>
        <StatCard>
          <StatIconSlot><FileText size={14} /></StatIconSlot>
          <StatCardBody>
            <StatValue>{totalLessons}</StatValue>
            <StatLabel>{t("teacher.stats.lessons")}</StatLabel>
          </StatCardBody>
        </StatCard>
        <StatCard>
          <StatIconSlot><ClipboardCheck size={14} /></StatIconSlot>
          <StatCardBody>
            <StatValue>{totalPending}</StatValue>
            <StatLabel>{t("teacher.stats.pending")}</StatLabel>
          </StatCardBody>
        </StatCard>
      </StatGrid>

      <GridTwo $left="minmax(0, 1.05fr) minmax(320px, 0.95fr)">
        <SectionCard>
          <PageTitleBlock>
            <CardTitle>{t("teacher.dashboard.recentCourses")}</CardTitle>
            <CardMeta>
              {t("teacher.workspace.dashboardCoursesHint", {
                defaultValue:
                  "Kurs tanlasangiz, bevosita kurs workspace bo‘limiga o‘tasiz.",
              })}
            </CardMeta>
          </PageTitleBlock>
          <Stack>
            {teacherCourses.slice(0, 5).map((course) => {
              const courseId = getCourseId(course);
              return (
                <ListCard
                  key={courseId}
                  type="button"
                  $active={courseId === String(selectedCourseId || "")}
                  onClick={() =>
                    openCourseWorkspace(courseId, {
                      openAdmin: true,
                    })
                  }
                >
                  <CardTitle>{course.title || course.name}</CardTitle>
                  <CardMeta>{course.category || t("teacher.table.course")}</CardMeta>
                  <MiniGrid>
                    <MiniStat>
                      <MiniLabel>{t("teacher.table.lessons")}</MiniLabel>
                      <MiniValue>{course.lessons?.length || 0}</MiniValue>
                    </MiniStat>
                    <MiniStat>
                      <MiniLabel>{t("teacher.table.students")}</MiniLabel>
                      <MiniValue>{getApprovedMembers(course).length}</MiniValue>
                    </MiniStat>
                    <MiniStat>
                      <MiniLabel>{t("teacher.table.pending")}</MiniLabel>
                      <MiniValue>{getPendingMembers(course).length}</MiniValue>
                    </MiniStat>
                  </MiniGrid>
                </ListCard>
              );
            })}
          </Stack>
        </SectionCard>

        <SectionCard>
          <PageTitleBlock>
            <CardTitle>
              {t("teacher.workspace.pendingQueue", {
                defaultValue: "Kutilayotgan so‘rovlar",
              })}
            </CardTitle>
            <CardMeta>
              {t("teacher.workspace.pendingHint", {
                defaultValue:
                  "Tasdiqlash va o‘chirish amallari shu yerdan ham ishlaydi.",
              })}
            </CardMeta>
          </PageTitleBlock>
          <Stack>
            {pendingApprovals.slice(0, 5).map(({ course, member, memberId }) => (
              <ApprovalCard key={`${getCourseId(course)}-${memberId}`}>
                {(() => {
                  const actionKey = getMemberActionKey(getCourseId(course), memberId);
                  const isApproving = approvingMemberKey === actionKey;

                  return (
                    <>
                      <div>
                        <CardTitle>{member.name || member.username || t("common.userFallback")}</CardTitle>
                        <CardMeta>{course.title || course.name}</CardMeta>
                      </div>
                      <ApprovalActions>
                        <PrimaryButton
                          type="button"
                          disabled={isApproving}
                          onClick={() => handleApprove(getCourseId(course), memberId)}
                        >
                          <Check size={14} />
                          {isApproving
                            ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
                            : t("teacher.students.approve")}
                        </PrimaryButton>
                        <GhostButton
                          type="button"
                          onClick={() => openCourseWorkspace(getCourseId(course))}
                        >
                          {t("teacher.workspace.openCourse", {
                            defaultValue: "Kursni ochish",
                          })}
                        </GhostButton>
                      </ApprovalActions>
                    </>
                  );
                })()}
              </ApprovalCard>
            ))}

            {!pendingApprovals.length ? (
              <EmptyState>
                <EmptyTitle>
                  {t("teacher.workspace.noPending", {
                    defaultValue: "Kutilayotgan so‘rov yo‘q",
                  })}
                </EmptyTitle>
                <EmptyText>
                  {t("teacher.workspace.noPendingText", {
                    defaultValue: "Dashboard toza. Endi kurslar va darslar bilan ishlash mumkin.",
                  })}
                </EmptyText>
              </EmptyState>
            ) : null}
          </Stack>
        </SectionCard>
      </GridTwo>
    </>
  );



  const renderCourses = () => (
    <FillPane>
      {!selectedCourse ? (
        <CourseTableCard>
          <StudentTableHeader>
            <StudentTableToolbar>
              <TableHeaderTop>
                <StudentTableInfo>
                  <StudentTableTitle>
                    {t("teacher.nav.courses", {
                      defaultValue: "Kurslar",
                    })}
                  </StudentTableTitle>
                  <StudentTableSubtitle>
                    {t("teacher.workspace.coursesSubtitle", {
                      defaultValue:
                        "Kursni tanlang va uning ichidagi darslar jadvaliga o‘ting.",
                    })}
                  </StudentTableSubtitle>
                </StudentTableInfo>

                <PrimaryButton
                  type="button"
                  onClick={() => {
                    setEditingCourse(null);
                    setCreateOpen(true);
                  }}
                >
                  <Plus size={15} />
                  {t("teacher.workspace.addCourseMenu", {
                    defaultValue: "Yangi qo'shish",
                  })}
                </PrimaryButton>
              </TableHeaderTop>

              <StudentTableControls>
                <StudentSearchWrap>
                  <StudentSearchIcon>
                    <Search size={16} />
                  </StudentSearchIcon>
                  <StudentSearchInput
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={t("teacher.courses.search")}
                  />
                </StudentSearchWrap>
              </StudentTableControls>
            </StudentTableToolbar>
          </StudentTableHeader>

          <StudentTableScroll>
            <StudentTableGrid>
              <StudentTableHeadRow>
                <StudentTableHeadCell>
                  {t("teacher.nav.courses", { defaultValue: "Kurslar" })}
                  <StudentCountBadge>{filteredCourses.length}</StudentCountBadge>
                </StudentTableHeadCell>
                <StudentTableHeadCell>
                  {t("teacher.workspace.lessonDescriptionLabel", {
                    defaultValue: "Tavsif",
                  })}
                </StudentTableHeadCell>
                <StudentTableHeadCell>
                  {t("teacher.table.lessons", { defaultValue: "Darslar" })}
                </StudentTableHeadCell>
                <StudentTableHeadCell>
                  {t("teacher.table.students", { defaultValue: "O'quvchilar" })}
                </StudentTableHeadCell>
                <StudentTableHeadCell>
                  {t("teacher.table.access", { defaultValue: "Ruxsat" })}
                </StudentTableHeadCell>
                <StudentTableHeadCell />
              </StudentTableHeadRow>

              <StudentTableBody>
                {filteredCourses.map((course, index) => {
                  const courseId = getCourseId(course);
                  return (
                    <StudentTableRow
                      key={courseId || index}
                      type="button"
                      onClick={() => openCourseWorkspace(courseId)}
                    >
                      <StudentCell>
                        <CourseCellWrap>
                          <CourseMiniThumb>
                            {course.image ? (
                              <CourseMiniImage src={course.image} alt={course.title || course.name} />
                            ) : (
                              <BookOpen size={16} />
                            )}
                          </CourseMiniThumb>
                          <CourseCellMeta>
                            <CourseCellTitle>{course.title || course.name}</CourseCellTitle>
                            <CourseCellSub>
                              {course.category || t("teacher.table.course")}
                            </CourseCellSub>
                          </CourseCellMeta>
                        </CourseCellWrap>
                      </StudentCell>

                      <StudentCell data-label="Tavsif">
                        <DateCellText>
                          {(course.description || "").trim() ||
                            t("teacher.workspace.lessonDescriptionFallback", {
                              defaultValue: "Bu kurs uchun tavsif kiritilmagan.",
                            })}
                        </DateCellText>
                      </StudentCell>

                      <StudentCell data-label="Darslar">
                        <CellValue>{course.lessons?.length || 0}</CellValue>
                      </StudentCell>

                      <StudentCell data-label="O'quvchilar">
                        <CellValue>{getApprovedMembers(course).length}</CellValue>
                      </StudentCell>

                      <StudentCell data-label="Ruxsat">
                        <CourseAccessPill>
                          {formatEnrollmentPlan(course, t)}
                        </CourseAccessPill>
                      </StudentCell>

                      <CourseActionCell onClick={(event) => event.stopPropagation()}>
                        <CourseMenuButton
                          type="button"
                          title={t("common.edit")}
                          aria-label={t("common.edit")}
                          onClick={() => openCourseEditor(course)}
                        >
                          <Pencil size={15} />
                        </CourseMenuButton>

                        <CourseMenuButton
                          type="button"
                          title={t("common.delete")}
                          aria-label={t("common.delete")}
                          $tone="danger"
                          onClick={() => setCourseToDelete(course)}
                        >
                          <Trash2 size={15} />
                        </CourseMenuButton>
                      </CourseActionCell>
                    </StudentTableRow>
                  );
                })}

                {!filteredCourses.length ? (
                  <TableEmptyState>
                    {search
                      ? t("teacher.courses.noResults")
                      : t("teacher.courses.empty")}
                  </TableEmptyState>
                ) : null}
              </StudentTableBody>
            </StudentTableGrid>
          </StudentTableScroll>
        </CourseTableCard>
      ) : null}

      {selectedCourse ? (
      <CourseTableCard>
        <StudentTableHeader>
          <StudentTableToolbar>
            <TableHeaderTop>
              <StudentTableInfo>
                <StudentTableTitle>
                  {t("teacher.workspace.lessonsPageTitle", {
                    defaultValue: "Darslar",
                  })}
                </StudentTableTitle>
                <StudentTableSubtitle>
                  {t("teacher.workspace.lessonsPageSubtitle", {
                    defaultValue:
                      "Tanlangan kurs darslarini shu yerda ko‘ring, tahrirlang va yangi dars qo‘shing.",
                  })}
                </StudentTableSubtitle>
              </StudentTableInfo>

              <ActionRow>
                <GhostButton type="button" onClick={handleBackToCourses}>
                  <ChevronLeft size={16} />
                  {t("common.back", {
                    defaultValue: "Orqaga",
                  })}
                </GhostButton>

                <GhostButton
                  type="button"
                  onClick={() => openCourseEditor(selectedCourse)}
                >
                  <Pencil size={15} />
                  {t("common.edit", {
                    defaultValue: "Tahrirlash",
                  })}
                </GhostButton>

                <PrimaryButton type="button" onClick={openCourseLessonCreator}>
                  <Plus size={15} />
                  {t("teacher.workspace.addLesson", {
                    defaultValue: "Yangi dars qo'shish",
                  })}
                </PrimaryButton>
              </ActionRow>
            </TableHeaderTop>

            <StudentTableControls>
              <StudentSearchWrap>
                <StudentSearchIcon>
                  <Search size={16} />
                </StudentSearchIcon>
                <StudentSearchInput
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t("teacher.workspace.lessonSearchPlaceholder", {
                    defaultValue: "Dars qidirish...",
                  })}
                />
              </StudentSearchWrap>
            </StudentTableControls>
          </StudentTableToolbar>
        </StudentTableHeader>

        <StudentTableScroll>
          <CourseTableGrid>
            <CourseTableHeadRow>
              <CourseTableHeadCell>
                {t("teacher.table.lessons", {
                  defaultValue: "Darslar",
                })}
                <StudentCountBadge>{filteredCourseLessons.length}</StudentCountBadge>
              </CourseTableHeadCell>
              <CourseTableHeadCell>
                {t("teacher.workspace.lessonDescriptionLabel", {
                  defaultValue: "Tavsif",
                })}
              </CourseTableHeadCell>
              <CourseTableHeadCell>
                {t("teacher.workspace.lessonStatus", {
                  defaultValue: "Holati",
                })}
              </CourseTableHeadCell>
              <CourseTableHeadCell>
                {t("teacher.workspace.lessonMediaCount", {
                  defaultValue: "Media",
                })}
              </CourseTableHeadCell>
              <CourseTableHeadCell>
                {t("teacher.workspace.lessonContentActions", {
                  defaultValue: "Kontent",
                })}
              </CourseTableHeadCell>
              <CourseTableHeadCell />
            </CourseTableHeadRow>

            <CourseTableBody>
              {filteredCourseLessons.map((lesson, index) => {
                const lessonId = getLessonId(lesson);
                const lessonStatus = lesson.status || "published";
                const lessonMediaCount = Array.isArray(lesson.mediaItems)
                  ? lesson.mediaItems.length
                  : lesson.videoUrl || lesson.fileUrl
                    ? 1
                    : 0;
                const lessonTitle = lesson.title || `${index + 1}-dars`;

                return (
                  <CourseTableRow
                    key={lessonId || `${index}`}
                    type="button"
                    $active={lessonId === String(selectedLessonId || "")}
                    onClick={() => {
                      setSelectedLessonId(lessonId);
                      openLessonContentManager(lesson);
                    }}
                  >
                    <CourseTableCell>
                      <CourseIdentity>
                        <CourseModalLessonIcon $status={lessonStatus}>
                          <BookOpen size={18} />
                        </CourseModalLessonIcon>
                        <CourseIdentityMeta>
                          <CourseIdentityTitle>{lessonTitle}</CourseIdentityTitle>
                          <CourseIdentitySub>
                            {t("coursePlayer.adminPane.lessonNumber", {
                              index: index + 1,
                              defaultValue: `Dars ${index + 1}`,
                            })}
                          </CourseIdentitySub>
                        </CourseIdentityMeta>
                      </CourseIdentity>
                    </CourseTableCell>

                    <CourseTableCell data-label="Tavsif">
                      <DateCellText>
                        {(lesson.description || "").trim() ||
                          t("teacher.workspace.lessonDescriptionFallback", {
                            defaultValue: "Bu dars uchun tavsif kiritilmagan.",
                          })}
                      </DateCellText>
                    </CourseTableCell>

                    <CourseTableCell data-label="Holati">
                      <CourseAccessPill>
                        {lessonStatus === "draft"
                          ? t("coursePlayer.playlist.draft", {
                              defaultValue: "Draft",
                            })
                          : t("coursePlayer.adminPane.published", {
                              defaultValue: "Published",
                            })}
                      </CourseAccessPill>
                    </CourseTableCell>

                    <CourseTableCell data-label="Media">
                      <CourseMetricText>{lessonMediaCount}</CourseMetricText>
                    </CourseTableCell>

                    <CourseTableCell data-label="Kontent">
                      <DateCellText>
                        {t("teacher.workspace.lessonContentSummary", {
                          defaultValue: "Video, material, uyga vazifa, test",
                        })}
                      </DateCellText>
                    </CourseTableCell>

                    <CourseActionCell onClick={(event) => event.stopPropagation()}>
                      <CourseMenuButton
                        type="button"
                        title={t("common.edit")}
                        aria-label={t("common.edit")}
                        onClick={() => openCourseLessonEditor(lesson)}
                      >
                        <Pencil size={15} />
                      </CourseMenuButton>

                      <CourseMenuButton
                        type="button"
                        title={t("common.delete")}
                        aria-label={t("common.delete")}
                        $tone="danger"
                        onClick={() => setLessonToDelete(lesson)}
                      >
                        <Trash2 size={15} />
                      </CourseMenuButton>
                    </CourseActionCell>
                  </CourseTableRow>
                );
              })}

              {!selectedCourse ? (
                <TableEmptyState>
                  {t("teacher.workspace.selectCourseForLessons", {
                    defaultValue: "Darslarni ko‘rish uchun kurs tanlang",
                  })}
                </TableEmptyState>
              ) : null}

              {selectedCourse && !filteredCourseLessons.length ? (
                <TableEmptyState>
                  {search
                    ? t("teacher.courses.noResults")
                    : t("teacher.workspace.noLessonsYet", {
                        defaultValue: "Darslar hali yo‘q",
                      })}
                </TableEmptyState>
              ) : null}
            </CourseTableBody>
          </CourseTableGrid>
        </StudentTableScroll>
      </CourseTableCard>
      ) : null}
    </FillPane>
  );

  const renderStudents = () => (
    <FillPane>
      <StudentTableCard>
        <StudentTableHeader>
          <StudentTableToolbar>
            <StudentTableInfo>
              <StudentTableTitle>{t("teacher.nav.students")}</StudentTableTitle>
              <StudentTableSubtitle>
                {t("teacher.workspace.studentsSubtitle", {
                  defaultValue:
                    "Barcha o‘quvchilar va kurslarga bog‘langan statuslari shu yerda. Kerak bo‘lsa shu sahifadan approve yoki remove qiling.",
                })}
              </StudentTableSubtitle>
            </StudentTableInfo>

            <StudentTableControls>
              <StudentSearchWrap>
                <StudentSearchIcon>
                  <Search size={16} />
                </StudentSearchIcon>
                <StudentSearchInput
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t("teacher.students.search")}
                />
              </StudentSearchWrap>

              <StudentFilterSelect
                value={selectedStudentCourseFilter}
                onChange={(event) =>
                  setSelectedStudentCourseFilter(event.target.value)
                }
              >
                <option value="all">
                  {t("teacher.workspace.allCourses", {
                    defaultValue: "Barcha kurslar",
                  })}
                </option>
                {teacherCourses.map((course) => (
                  <option key={getCourseId(course)} value={getCourseId(course)}>
                    {course.title || course.name}
                  </option>
                ))}
              </StudentFilterSelect>
            </StudentTableControls>
          </StudentTableToolbar>
        </StudentTableHeader>

        <StudentTableScroll>
          <StudentTableGrid $scoreboard>
            <StudentTableHeadRow $withActions $scoreboard>
              <StudentTableHeadCell>
                {t("teacher.nav.students")}{" "}
                <StudentCountBadge>{filteredStudentCount}</StudentCountBadge>
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.table.course", {
                  defaultValue: "Mahsulot",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.attendanceRate", {
                  defaultValue: "Davomat",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("coursePlayer.homework.title", {
                  defaultValue: "Uy vazifa",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.exercise", {
                  defaultValue: "Mashq",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.teacherScoreLabel", {
                  defaultValue: "Ustoz bahosi",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.totalScore", {
                  defaultValue: "Umumiy ball",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.progress", {
                  defaultValue: "Progress",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("coursePlayer.adminPane.currentLesson", {
                  defaultValue: "Joriy dars",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("createCourse.accessType", {
                  defaultValue: "Tarif",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.joinedAt", {
                  defaultValue: "Kirish muddati",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("common.actions", { defaultValue: "Amallar" })}
              </StudentTableHeadCell>
            </StudentTableHeadRow>

            <StudentTableBody>
              {courseFilteredStudentRows.map((row) => {
                const normalizedProgress = Math.max(
                  0,
                  Math.min(100, Number(row.progressPercent || 0)),
                );
                const radius = 12;
                const circumference = 2 * Math.PI * radius;
                const dashOffset =
                  circumference - (normalizedProgress / 100) * circumference;
                const studentInitial = getInitials(row.name);
                const courseLabel = row.course.title || row.course.name;
                const courseInitial = (courseLabel || "?").charAt(0).toUpperCase();
	                const subtitle =
	                  row.status === "pending"
	                    ? t("teacher.students.pending")
                    : row.joinedAt
                      ? t("teacher.workspace.joinedDate", {
                          date: formatShortDate(row.joinedAt),
                          defaultValue: `Qo'shilgan ${formatShortDate(row.joinedAt)}`,
                        })
	                      : t("teacher.students.approved");
	                const removeActionKey = getMemberActionKey(
	                  getCourseId(row.course),
	                  row.memberId || row.studentId,
	                );
	                const isRemovingStudent = removingStudentKey === removeActionKey;

	                return (
                  <StudentTableRow
                    key={row.id}
                    type="button"
                    $withActions
                    $scoreboard
                    onClick={() => {
                      setSelectedStudentRow(row);
                      setStudentModalTab("overview");
                    }}
                  >
                    <StudentCell>
                      <StudentIdentity>
                        <StudentAvatar $seed={row.studentId?.length || 0}>
                          <AvatarImageWithFallback src={row.avatar} alt={row.name}>
                            {studentInitial}
                          </AvatarImageWithFallback>
                        </StudentAvatar>
                        <StudentMeta>
                          <StudentName>{row.name}</StudentName>
                          <StudentSubline>{subtitle}</StudentSubline>
                        </StudentMeta>
                      </StudentIdentity>
                    </StudentCell>

                    <StudentCell data-label="Kurs">
                      <CourseCellWrap>
                        <CourseMiniThumb>
                          {row.course.image ? (
                            <CourseMiniImage src={row.course.image} alt={courseLabel} />
                          ) : (
                            courseInitial
                          )}
                        </CourseMiniThumb>
                        <CourseCellMeta>
                          <CourseCellTitle>{courseLabel}</CourseCellTitle>
                          <CourseCellSub>
                            {row.course.category ||
                              t("teacher.workspace.courseCategory", {
                                defaultValue: "Kategoriya ko‘rsatilmagan",
                              })}
                          </CourseCellSub>
                        </CourseCellMeta>
                      </CourseCellWrap>
                    </StudentCell>

                    <StudentCell data-label="Davomat">
                      {renderScoreCell(row.scoreSummary?.attendance)}
                    </StudentCell>

                    <StudentCell data-label="Uy vazifa">
                      {renderScoreCell(row.scoreSummary?.homework)}
                    </StudentCell>

                    <StudentCell data-label="Mashq">
                      {renderScoreCell(row.scoreSummary?.exercise)}
                    </StudentCell>

                    <StudentCell data-label="Ustoz bahosi">
                      {renderScoreCell(row.scoreSummary?.teacher)}
                    </StudentCell>

                    <StudentCell data-label="Umumiy ball">
                      {renderScoreCell(row.scoreSummary?.total)}
                    </StudentCell>

                    <StudentCell data-label="Progress">
                      <ProgressCell>
                        <ProgressRing viewBox="0 0 32 32" aria-hidden="true">
                          <circle
                            cx="16"
                            cy="16"
                            r={radius}
                            fill="none"
                            stroke="var(--border-color)"
                            strokeWidth="4"
                          />
                          <circle
                            cx="16"
                            cy="16"
                            r={radius}
                            fill="none"
                            stroke="var(--primary-color)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                          />
                        </ProgressRing>
                        <ProgressValue>{normalizedProgress}%</ProgressValue>
                      </ProgressCell>
                    </StudentCell>

                    <StudentCell data-label="Joriy dars">
                      <DateCellText>{row.currentLessonTitle || "—"}</DateCellText>
                    </StudentCell>

                    <StudentCell data-label="Tarif">
                      <TariffPill>{row.tariffLabel}</TariffPill>
                    </StudentCell>

                    <StudentCell data-label="Kirish">
                      <DateCellText>{formatShortDate(row.joinedAt)}</DateCellText>
                    </StudentCell>

	                    <CourseActionCell onClick={(event) => event.stopPropagation()}>
	                      <CourseMenuButton
	                        type="button"
	                        disabled={isRemovingStudent}
	                        title={
	                          isRemovingStudent
	                            ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
	                            : t("teacher.students.kick", {
	                                defaultValue: "Kick qilish",
	                              })
	                        }
	                        aria-label={
	                          isRemovingStudent
	                            ? t("common.loading", { defaultValue: "Yuklanmoqda..." })
	                            : t("teacher.students.kick", {
	                                defaultValue: "Kick qilish",
	                              })
	                        }
	                        $tone="danger"
	                        onClick={() =>
	                          handleRemoveStudent(
                            getCourseId(row.course),
	                            row.memberId || row.studentId,
	                          )
	                        }
	                      >
	                        {isRemovingStudent ? <RefreshCw size={15} /> : <UserX size={15} />}
	                      </CourseMenuButton>
	                    </CourseActionCell>
                  </StudentTableRow>
                );
              })}

              {!courseFilteredStudentRows.length ? (
                <TableEmptyState>
                  {t("teacher.workspace.emptyStudents", {
                    defaultValue:
                      "O‘quvchi topilmadi. Qidiruv so‘rovini o‘zgartirib ko‘ring.",
                  })}
                </TableEmptyState>
              ) : null}
            </StudentTableBody>
          </StudentTableGrid>
        </StudentTableScroll>
      </StudentTableCard>
    </FillPane>
  );

  const renderTests = () => (
    <ArenaTeacherPane>
      <StudentTableCard $noClip>
        <StudentTableHeader>
          <StudentTableToolbar>
            <TableHeaderTop>
              <StudentTableInfo>
                <StudentTableTitle>
                  {t("teacher.nav.tests", {
                    defaultValue: "Testlar",
                  })}
                </StudentTableTitle>
                <StudentTableSubtitle>
                  {t("teacher.workspace.testsSubtitle", {
                    defaultValue:
                      "Arena bo'limidagi testlaringiz shu yerda kartalar ko'rinishida chiqadi.",
                  })}
                </StudentTableSubtitle>
              </StudentTableInfo>

              <PrimaryButton
                type="button"
                onClick={() => {
                  setTestEditingItem(null);
                  setShowTestDialog(true);
                }}
              >
                <Plus size={15} />
                {t("common.add", {
                  defaultValue: "Yangi qo'shish",
                })}
              </PrimaryButton>
            </TableHeaderTop>
          </StudentTableToolbar>
        </StudentTableHeader>

        <ArenaTeacherBody>
          {testsLoading ? (
            <ArenaTeacherEmpty>
              {t("common.loading", {
                defaultValue: "Yuklanmoqda...",
              })}
            </ArenaTeacherEmpty>
          ) : teacherTests.length ? (
            <ArenaTeacherGrid>
              {teacherTests.map((test) => (
                <ArenaTeacherCard
                  key={test._id || test.id || test.urlSlug}
                  $raised={teacherArenaMenuId === `test-${test._id || test.id}`}
                  type="button"
                  onClick={() =>
                    navigate(`/arena/quiz/${test.urlSlug || test._id || test.id}`)
                  }
                >
                  <ArenaTeacherCardTop>
                    <ArenaTeacherCardTitle>{test.title}</ArenaTeacherCardTitle>
                    <ArenaTeacherMenuWrap
                      onClick={(event) => event.stopPropagation()}
                    >
                      <ArenaTeacherMenuButton
                        type="button"
                        onClick={() =>
                          setTeacherArenaMenuId((prev) =>
                            prev === `test-${test._id || test.id}`
                              ? null
                              : `test-${test._id || test.id}`,
                          )
                        }
                      >
                        <MoreHorizontal size={16} />
                      </ArenaTeacherMenuButton>
                      {teacherArenaMenuId === `test-${test._id || test.id}` ? (
                        <ArenaTeacherMenuDropdown
                          onClick={(event) => event.stopPropagation()}
                        >
                          <ArenaTeacherMenuItem
                            type="button"
                            onClick={() => {
                              navigate(
                                `/arena/quiz/${test.urlSlug || test._id || test.id}`,
                              );
                              setTeacherArenaMenuId(null);
                            }}
                          >
                            <Eye size={14} />
                            {t("common.open", {
                              defaultValue: "Ochish",
                            })}
                          </ArenaTeacherMenuItem>
                          <ArenaTeacherMenuItem
                            type="button"
                            onClick={() => {
                              setTestEditingItem(test);
                              setShowTestDialog(true);
                              setTeacherArenaMenuId(null);
                            }}
                          >
                            <Pencil size={14} />
                            {t("common.edit", { defaultValue: "Tahrirlash" })}
                          </ArenaTeacherMenuItem>
                          <ArenaTeacherMenuItem
                            type="button"
                            onClick={() => openTestShareDialog(test)}
                          >
                            <Link2 size={14} />
                            {t("teacher.workspace.createLink", { defaultValue: "Havola yaratish" })}
                          </ArenaTeacherMenuItem>
                          <ArenaTeacherMenuItem
                            type="button"
                            onClick={() => {
                              setTeacherArenaMenuId(null);
                              setSelectedTestForResults(test);
                            }}
                          >
                            <BarChart3 size={14} />
                            {t("teacher.workspace.viewResults", { defaultValue: "Natijalarni ko'rish" })}
                          </ArenaTeacherMenuItem>
                          <ArenaTeacherMenuItem
                            type="button"
                            $danger
                            onClick={() => {
                              setTeacherTestToDelete(test);
                              setTeacherArenaMenuId(null);
                            }}
                          >
                            <Trash2 size={14} />
                            {t("common.delete", { defaultValue: "O'chirish" })}
                          </ArenaTeacherMenuItem>
                        </ArenaTeacherMenuDropdown>
                      ) : null}
                    </ArenaTeacherMenuWrap>
                  </ArenaTeacherCardTop>
                  <ArenaTeacherCardDesc>
                    {test.description ||
                      t("teacher.workspace.noDescription", {
                        defaultValue: "Tavsif yo'q",
                      })}
                  </ArenaTeacherCardDesc>
                  <ArenaTeacherMeta>
                    {t("teacher.workspace.questionsCount", {
                      defaultValue: "Savollar soni: {{count}}",
                      count: test.questions?.length || 0,
                    })}
                  </ArenaTeacherMeta>
                  <ArenaTeacherMeta>
                    {t("teacher.workspace.creatorLabel", {
                      defaultValue: "Tuzuvchi: {{name}}",
                      name:
                        test.createdBy?.nickname ||
                        test.createdBy?.username ||
                        currentUserName,
                    })}
                  </ArenaTeacherMeta>
                  <ArenaTeacherHint>
                    <ClipboardCheck size={14} />
                    {t("teacher.workspace.openArenaCard", {
                      defaultValue: "Ochish uchun kartani bosing",
                    })}
                  </ArenaTeacherHint>
                </ArenaTeacherCard>
              ))}
            </ArenaTeacherGrid>
          ) : (
            <ArenaTeacherEmpty>
              {t("teacher.workspace.noTestsYet", {
                defaultValue: "Hozircha testlar mavjud emas.",
              })}
            </ArenaTeacherEmpty>
          )}
        </ArenaTeacherBody>
      </StudentTableCard>
    </ArenaTeacherPane>
  );

  const sbShareLimit = isPremiumUser(currentUser)
    ? APP_LIMITS.sentenceBuilderShareLinksPerDeck.premium
    : APP_LIMITS.sentenceBuilderShareLinksPerDeck.ordinary;

  const testShareLimit = isPremiumUser(currentUser)
    ? APP_LIMITS.testShareLinksPerTest.premium
    : APP_LIMITS.testShareLinksPerTest.ordinary;

  const normalizedResultItems = useMemo(
    () =>
      (resultsData || []).map((attempt, attemptIndex) => ({
        id: attempt._id || `${attempt.participantName}-${attempt.createdAt}-${attemptIndex}`,
        participantName: attempt.participantName || "Foydalanuvchi",
        groupName: attempt.groupName || "",
        createdAt: attempt.createdAt,
        score: Number(attempt.score || 0),
        total: Number(attempt.total || 0),
        accuracy: Number(attempt.accuracy || 0),
        breakdowns: (attempt.items || []).map((item, itemIndex) => ({
          questionIndex: item.questionIndex !== undefined ? item.questionIndex : itemIndex,
          prompt: item.prompt || `Savol #${itemIndex + 1}`,
          isCorrect: Boolean(item.isCorrect),
          selectedTokens: item.selectedTokens || [],
          expectedTokens: item.expectedTokens || [],
          mistakes: item.mistakes || [],
        })),
      })),
    [resultsData],
  );

  const renderSentenceBuilder = () => (
    <ArenaTeacherPane>
      <StudentTableCard $noClip>
        <StudentTableHeader>
          <StudentTableToolbar>
            <TableHeaderTop>
              <StudentTableInfo>
                <StudentTableTitle>
                  {t("teacher.nav.sentenceBuilder", {
                    defaultValue: "Gap tuzish",
                  })}
                </StudentTableTitle>
                <StudentTableSubtitle>
                  {t("teacher.workspace.sentenceBuilderSubtitle", {
                    defaultValue:
                      "Arena bo'limidagi gap tuzish decklari shu yerda kartalar ko'rinishida chiqadi.",
                  })}
                </StudentTableSubtitle>
              </StudentTableInfo>

              <PrimaryButton
                type="button"
                onClick={() => {
                  setSbEditingDeck(null);
                  setShowSbDialog(true);
                }}
              >
                <Plus size={15} />
                {t("common.add", {
                  defaultValue: "Yangi qo'shish",
                })}
              </PrimaryButton>
            </TableHeaderTop>
          </StudentTableToolbar>
        </StudentTableHeader>

        <ArenaTeacherBody>
          {sentenceBuildersLoading ? (
            <ArenaTeacherEmpty>
              {t("common.loading", {
                defaultValue: "Yuklanmoqda...",
              })}
            </ArenaTeacherEmpty>
          ) : teacherSentenceBuilders.length ? (
            <ArenaTeacherGrid>
              {teacherSentenceBuilders.map((deck) => (
                <ArenaTeacherCard
                  key={deck._id || deck.id || deck.shortCode}
                  $raised={
                    teacherArenaMenuId ===
                    `sentence-${deck._id || deck.id || deck.shortCode}`
                  }
                  type="button"
                  onClick={() =>
                    navigate(
                      `/arena/sentence-builder/${deck.shortCode || deck._id || deck.id}`,
                    )
                  }
                >
                  <ArenaTeacherCardTop>
                    <ArenaTeacherCardTitle>{deck.title}</ArenaTeacherCardTitle>
                    <ArenaTeacherMenuWrap
                      onClick={(event) => event.stopPropagation()}
                    >
                      <ArenaTeacherMenuButton
                        type="button"
                        onClick={() =>
                          setTeacherArenaMenuId((prev) =>
                            prev ===
                            `sentence-${deck._id || deck.id || deck.shortCode}`
                              ? null
                              : `sentence-${deck._id || deck.id || deck.shortCode}`,
                          )
                        }
                      >
                        <MoreHorizontal size={16} />
                      </ArenaTeacherMenuButton>
                      {teacherArenaMenuId ===
                      `sentence-${deck._id || deck.id || deck.shortCode}` ? (
                        <ArenaTeacherMenuDropdown
                          onClick={(event) => event.stopPropagation()}
                        >
                          <ArenaTeacherMenuItem
                            type="button"
                            onClick={() => {
                              navigate(
                                `/arena/sentence-builder/${
                                  deck.shortCode || deck._id || deck.id
                                }`,
                              );
                              setTeacherArenaMenuId(null);
                            }}
                          >
                            <Eye size={14} />
                            {t("common.open", { defaultValue: "Ochish" })}
                          </ArenaTeacherMenuItem>
                          <ArenaTeacherMenuItem
                            type="button"
                            onClick={() => {
                              setSbEditingDeck(deck);
                              setShowSbDialog(true);
                              setTeacherArenaMenuId(null);
                            }}
                          >
                            <Pencil size={14} />
                            {t("common.edit", { defaultValue: "Tahrirlash" })}
                          </ArenaTeacherMenuItem>
                          <ArenaTeacherMenuItem
                            type="button"
                            onClick={() => openShareDialog(deck)}
                          >
                            <Link2 size={14} />
                            {t("teacher.workspace.createLink", { defaultValue: "Havola yaratish" })}
                          </ArenaTeacherMenuItem>
                          <ArenaTeacherMenuItem
                            type="button"
                            onClick={() => handleLoadResults(deck)}
                          >
                            <BarChart3 size={14} />
                            {t("teacher.workspace.viewResults", { defaultValue: "Natijalarni ko'rish" })}
                          </ArenaTeacherMenuItem>
                          <ArenaTeacherMenuItem
                            type="button"
                            $danger
                            onClick={() => {
                              setTeacherSentenceBuilderToDelete(deck);
                              setTeacherArenaMenuId(null);
                            }}
                          >
                            <Trash2 size={14} />
                            {t("common.delete", { defaultValue: "O'chirish" })}
                          </ArenaTeacherMenuItem>
                        </ArenaTeacherMenuDropdown>
                      ) : null}
                    </ArenaTeacherMenuWrap>
                  </ArenaTeacherCardTop>
                  <ArenaTeacherCardDesc>
                    {deck.description ||
                      t("teacher.workspace.noDescription", {
                        defaultValue: "Tavsif yo'q",
                      })}
                  </ArenaTeacherCardDesc>
                  <ArenaTeacherMeta>
                    {t("teacher.workspace.questionsCount", {
                      defaultValue: "Savollar soni: {{count}}",
                      count: deck.items?.length || 0,
                    })}
                  </ArenaTeacherMeta>
                  <ArenaTeacherHint>
                    <Type size={14} />
                    {t("teacher.workspace.openArenaCard", {
                      defaultValue: "Ochish uchun kartani bosing",
                    })}
                  </ArenaTeacherHint>
                </ArenaTeacherCard>
              ))}
            </ArenaTeacherGrid>
          ) : (
            <ArenaTeacherEmpty>
              {t("teacher.workspace.noSentenceBuildersYet", {
                defaultValue: "Hozircha gap tuzish decklari mavjud emas.",
              })}
            </ArenaTeacherEmpty>
          )}
        </ArenaTeacherBody>
      </StudentTableCard>
    </ArenaTeacherPane>
  );

  return (
    <Shell>
      <Layout>
        <Sidebar>
          <TeacherSidebarExpanded
            activeNav={activeSection}
            onSelectNav={handleSectionChange}
            displayName={currentUserName}
            avatar={currentUser?.avatar}
            onProfileClick={() => navigate("/courses")}
          />
        </Sidebar>

        <Main>
          <MainScroll>
            {activeSection === "dashboard" ? renderDashboard() : null}
            {activeSection === "courses" ? renderCourses() : null}
            {activeSection === "students" ? renderStudents() : null}
            {activeSection === "tests" ? renderTests() : null}
            {activeSection === "sentenceBuilder" ? renderSentenceBuilder() : null}
          </MainScroll>
        </Main>
      </Layout>

      <Suspense fallback={null}>
        <CreateCourseDialog
          isOpen={createOpen || !!editingCourse}
          course={editingCourse}
          onClose={() => {
            setCreateOpen(false);
            setEditingCourse(null);
          }}
          onCreated={(courseId) => {
            setCreateOpen(false);
            setEditingCourse(null);
            setSelectedCourseId(String(courseId));
            setActiveSection("courses");
            navigate(`/teacher/courses/${courseId}`);
          }}
          onUpdated={(updatedCourse) => {
            const updatedCourseId = getCourseId(updatedCourse || editingCourse);
            setCreateOpen(false);
            setEditingCourse(null);
            if (updatedCourseId && String(selectedCourseId || "") === String(updatedCourseId)) {
              setSelectedCourseId(String(updatedCourseId));
            }
          }}
        />
      </Suspense>

      <Suspense fallback={null}>
        <AddLessonDialog
          isOpen={courseLessonDialogOpen && !!selectedCourse}
          onClose={() => {
            setCourseLessonDialogOpen(false);
            setEditingCourseLesson(null);
          }}
          courseId={getCourseId(selectedCourse)}
          lesson={editingCourseLesson}
          onSaved={() => {
            setCourseLessonDialogOpen(false);
            setEditingCourseLesson(null);
          }}
        />
      </Suspense>

      <ConfirmDialog
        isOpen={!!courseToDelete}
        onClose={() => {
          if (!isDeletingCourse) {
            setCourseToDelete(null);
          }
        }}
        title={t("teacher.courses.confirmDelete")}
        description={t("teacher.workspace.deleteCourseText", {
          defaultValue:
            "Bu kurs o‘chirilsa, shu kursga bog‘langan teacher workspace ham yopiladi.",
        })}
        confirmText={
          isDeletingCourse ? t("common.saving") : t("common.delete")
        }
        cancelText={t("common.cancel")}
        onConfirm={handleDeleteCourse}
        isDanger
      />

      <ConfirmDialog
        isOpen={!!lessonToDelete}
        onClose={() => {
          if (!isDeletingLesson) {
            setLessonToDelete(null);
          }
        }}
        title={t("teacher.workspace.deleteLessonTitle", {
          defaultValue: "Darsni o‘chirish",
        })}
        description={t("teacher.workspace.deleteLessonText", {
          defaultValue: "Bu dars kurs ichidan butunlay o‘chiriladi.",
        })}
        confirmText={isDeletingLesson ? t("common.saving") : t("common.delete")}
        cancelText={t("common.cancel")}
        onConfirm={handleDeleteLessonConfirm}
        isDanger
      />

      <ConfirmDialog
        isOpen={!!teacherTestToDelete}
        onClose={() => {
          if (!isDeletingArenaItem) {
            setTeacherTestToDelete(null);
          }
        }}
        title={t("teacher.workspace.deleteTestTitle", {
          defaultValue: "Testni o'chirish",
        })}
        description={t("teacher.workspace.deleteTestText", {
          defaultValue: "Bu test butunlay o'chiriladi. Bu amalni bekor qilib bo'lmaydi.",
        })}
        confirmText={isDeletingArenaItem ? t("common.saving") : t("common.delete")}
        cancelText={t("common.cancel")}
        onConfirm={handleDeleteTeacherTest}
        isDanger
      />

      <ConfirmDialog
        isOpen={!!teacherSentenceBuilderToDelete}
        onClose={() => {
          if (!isDeletingArenaItem) {
            setTeacherSentenceBuilderToDelete(null);
          }
        }}
        title={t("teacher.workspace.deleteSentenceBuilderTitle", {
          defaultValue: "Gap tuzish deckini o'chirish",
        })}
        description={t("teacher.workspace.deleteSentenceBuilderText", {
          defaultValue:
            "Bu gap tuzish decki butunlay o'chiriladi. Bu amalni bekor qilib bo'lmaydi.",
        })}
        confirmText={isDeletingArenaItem ? t("common.saving") : t("common.delete")}
        cancelText={t("common.cancel")}
        onConfirm={handleDeleteTeacherSentenceBuilder}
        isDanger
      />

      <Suspense fallback={null}>
        {/* ── Sentence builder dialogs ── */}
        {showSbDialog && (
          <CreateSentenceBuilderDialog
            initialDeck={sbEditingDeck}
            onClose={() => {
              setShowSbDialog(false);
              setSbEditingDeck(null);
              refreshSentenceBuilders();
            }}
          />
        )}
        {resultsDeck && (
          <ArenaResultsPane
            title="Gap tuzish natijalari"
            subtitle={`"${resultsDeck.title}" bo'yicha ishlagan talabalar, ularning to'g'ri javoblari va har bir bo'lakdagi xatolari.`}
            searchPlaceholder="Talaba yoki guruh qidirish..."
            loading={loadingResults}
            results={normalizedResultItems}
            onClose={() => setResultsDeck(null)}
          />
        )}
        <ShareLinksDialog
          isOpen={Boolean(shareDeck)}
          onClose={() => {
            setShareDeck(null);
            setShareMode("persist");
            setShareGroupName("");
            setShareShowResults(true);
            setShareTimeLimit(0);
          }}
          title="Gap tuzish havolasini yaratish"
          itemTitle={shareDeck?.title || ""}
          limit={sbShareLimit}
          currentCount={shareLinks.length}
          mode={shareMode}
          onModeChange={setShareMode}
          groupName={shareGroupName}
          onGroupNameChange={setShareGroupName}
          showResults={shareShowResults}
          onShowResultsChange={setShareShowResults}
          timeLimit={shareTimeLimit}
          onTimeLimitChange={setShareTimeLimit}
          onCreate={handleCreateShareLink}
          isCreating={creatingShareLink}
          links={shareLinks}
          loadingLinks={loadingShareLinks}
          onCopyLink={handleCopyShareLink}
          onDeleteLink={handleDeleteShareLink}
          deletingLinkId={deletingShareLinkId}
          linkPrefix="/arena/sentence-builder/"
        />

        {/* ── Test dialogs ── */}
        <CreateTestDialog
          isOpen={showTestDialog}
          onClose={() => {
            setShowTestDialog(false);
            setTestEditingItem(null);
            refreshTests();
          }}
          initialTest={testEditingItem}
        />
        {selectedTestForResults && (
          <TestResultsDialog
            test={selectedTestForResults}
            onClose={() => setSelectedTestForResults(null)}
          />
        )}
        <ShareLinksDialog
          isOpen={Boolean(shareTest)}
          onClose={() => {
            setShareTest(null);
            setShareTestMode("persist");
            setShareTestGroupName("");
            setShareTestShowResults(true);
            setShareTestTimeLimit(0);
          }}
          title="Test havolasini yaratish"
          itemTitle={shareTest?.title || ""}
          limit={testShareLimit}
          currentCount={shareTestLinks.length}
          mode={shareTestMode}
          onModeChange={setShareTestMode}
          groupName={shareTestGroupName}
          onGroupNameChange={setShareTestGroupName}
          showResults={shareTestShowResults}
          onShowResultsChange={setShareTestShowResults}
          timeLimit={shareTestTimeLimit}
          onTimeLimitChange={setShareTestTimeLimit}
          onCreate={handleCreateTestShareLink}
          isCreating={creatingTestShareLink}
          links={shareTestLinks}
          loadingLinks={loadingTestShareLinks}
          onCopyLink={handleCopyTestExistingLink}
          onDeleteLink={handleDeleteTestShareLink}
          deletingLinkId={deletingTestShareLinkId}
          linkPrefix="/arena/quiz-link/"
        />
      </Suspense>

      <Suspense fallback={null}>
        {lessonContentModalData ? (
          <StudentModalOverlay
            $visible={isLessonContentModalVisible}
            onClick={closeLessonContentManager}
          >
            <LessonContentModalPanel
              $visible={isLessonContentModalVisible}
              onClick={(event) => event.stopPropagation()}
            >
              <LessonContentModalHeader>
                <LessonContentModalMeta>
                  <LessonContentModalEyebrow>
                    {t("teacher.workspace.openLessonContent", {
                      defaultValue: "Kontent qo'shish",
                    })}
                  </LessonContentModalEyebrow>
                  <LessonContentModalTitle>
                    {lessonContentModalData.lesson.title ||
                      t("teacher.table.lessons", {
                        defaultValue: "Dars",
                      })}
                  </LessonContentModalTitle>
                  <LessonContentModalSubline>
                    {lessonContentModalData.course.title ||
                      lessonContentModalData.course.name}
                  </LessonContentModalSubline>
                </LessonContentModalMeta>

                <StudentModalClose
                  type="button"
                  onClick={closeLessonContentManager}
                >
                  <X size={18} />
                </StudentModalClose>
              </LessonContentModalHeader>

              <LessonContentModalBody>
                <LessonMasteryPanel>
                  <StudentModalTabs>
                    <StudentModalTab
                      type="button"
                      $active={lessonContentModalTab === "content"}
                      onClick={() => setLessonContentModalTab("content")}
                    >
                      <BookOpen size={16} />
                      {t("teacher.workspace.contentTab", {
                        defaultValue: "Kontent",
                      })}
                    </StudentModalTab>
                    <StudentModalTab
                      type="button"
                      $active={lessonContentModalTab === "mastery"}
                      onClick={() => setLessonContentModalTab("mastery")}
                    >
                      <GraduationCap size={16} />
                      {t("teacher.nav.mastery", {
                        defaultValue: "O'zlashtirish",
                      })}
                    </StudentModalTab>
                  </StudentModalTabs>

                  {lessonContentModalTab === "content" ? (
                    <TeacherLessonContentWorkspace
                      key={`${getCourseId(lessonContentModalData.course)}-${getLessonId(
                        lessonContentModalData.lesson,
                      )}`}
                      courseId={getCourseId(lessonContentModalData.course)}
                      courseTitle={
                        lessonContentModalData.course.title ||
                        lessonContentModalData.course.name
                      }
                      lesson={lessonContentModalData.lesson}
                    />
                  ) : (
                    <StudentModalSection>
                      <LessonMasteryIntro>
                        <LessonMasteryTitle>
                          {t("teacher.workspace.lessonMasteryTitle", {
                            defaultValue: "Dars bo'yicha o'zlashtirish",
                          })}
                        </LessonMasteryTitle>
                        <LessonMasteryText>
                          {t("teacher.workspace.lessonMasteryText", {
                            defaultValue:
                              "Shu dars uchun davomat, uyga vazifa, mashq va og'zaki baholarni o'quvchilar kesimida ko'ring.",
                          })}
                        </LessonMasteryText>
                      </LessonMasteryIntro>

                      <StudentTableScroll>
                        <LessonMasteryTable>
                          <LessonMasteryHead>
                            <StudentTableHeadCell>
                              {t("teacher.nav.students", {
                                defaultValue: "O'quvchilar",
                              })}
                            </StudentTableHeadCell>
                            <StudentTableHeadCell>
                              {t("teacher.workspace.attendanceRate", {
                                defaultValue: "Davomat",
                              })}
                            </StudentTableHeadCell>
                            <StudentTableHeadCell>
                              {t("coursePlayer.homework.title", {
                                defaultValue: "Uyga vazifa",
                              })}
                            </StudentTableHeadCell>
                            <StudentTableHeadCell>
                              {t("teacher.workspace.exercise", {
                                defaultValue: "Mashq",
                              })}
                            </StudentTableHeadCell>
                            <StudentTableHeadCell>
                              {t("teacher.workspace.teacherScoreLabel", {
                                defaultValue: "Sizning bahongiz",
                              })}
                            </StudentTableHeadCell>
                            <StudentTableHeadCell>
                              {t("teacher.workspace.masteryRate", {
                                defaultValue: "O'zlashtirish",
                              })}
                            </StudentTableHeadCell>
                            <StudentTableHeadCell>
                              {t("teacher.workspace.studentActions", {
                                defaultValue: "Harakatlar",
                              })}
                            </StudentTableHeadCell>
                          </LessonMasteryHead>

                          {selectedLessonMasteryRows.map((row) => (
                            <LessonMasteryRow key={`lesson-mastery-${row.id}`}>
                              <LessonMasteryCell>
                                <StudentIdentity>
                                  <StudentAvatar $seed={row.studentId?.length || 0}>
                                    <AvatarImageWithFallback src={row.avatar} alt={row.name}>
                                      {getInitials(row.name)}
                                    </AvatarImageWithFallback>
                                  </StudentAvatar>
                                  <StudentMeta>
                                    <StudentName>{row.name}</StudentName>
                                    <StudentSubline>{row.tariffLabel}</StudentSubline>
                                  </StudentMeta>
                                </StudentIdentity>
                              </LessonMasteryCell>

                              <LessonMasteryCell>
                                <DateCellText>{row.attendanceScoreLabel}</DateCellText>
                              </LessonMasteryCell>

                              <LessonMasteryCell>
                                <DateCellText>{row.homeworkScoreLabel}</DateCellText>
                              </LessonMasteryCell>

                              <LessonMasteryCell>
                                <DateCellText>{row.exerciseScoreLabel}</DateCellText>
                              </LessonMasteryCell>

                              <LessonMasteryCell>
                                <DateCellText>{row.oralScore}</DateCellText>
                              </LessonMasteryCell>

                              <LessonMasteryCell>
                                <CourseAccessPill>
                                  {row.lessonMasteryPercent}%
                                </CourseAccessPill>
                              </LessonMasteryCell>

                              <LessonMasteryCell>
                                <LessonMasteryAction
                                  type="button"
                                  onClick={() => {
                                    setSelectedMasteryLessonFocusId(
                                      getLessonId(lessonContentModalData.lesson),
                                    );
                                    setSelectedMasteryRow(row);
                                  }}
                                >
                                  {row.oralSaved
                                    ? t("common.edit", {
                                        defaultValue: "Tahrirlash",
                                      })
                                    : t("teacher.workspace.gradeStudent", {
                                        defaultValue: "Baholash",
                                      })}
                                </LessonMasteryAction>
                              </LessonMasteryCell>
                            </LessonMasteryRow>
                          ))}

                          {!selectedLessonMasteryRows.length ? (
                            <TableEmptyState>
                              {t("teacher.workspace.noStudentsForLessonMastery", {
                                defaultValue:
                                  "Bu dars uchun ko'rsatish mumkin bo'lgan o'quvchilar topilmadi.",
                              })}
                            </TableEmptyState>
                          ) : null}
                        </LessonMasteryTable>
                      </StudentTableScroll>
                    </StudentModalSection>
                  )}
                </LessonMasteryPanel>
              </LessonContentModalBody>
            </LessonContentModalPanel>
          </StudentModalOverlay>
        ) : null}
      </Suspense>

      {animatedMasteryRow ? (
        <StudentModalOverlay
          $visible={isMasteryModalVisible}
          onClick={() => {
            setSelectedMasteryLessonFocusId(null);
            setSelectedMasteryRow(null);
          }}
        >
          <StudentModalPanel
            $visible={isMasteryModalVisible}
            onClick={(event) => event.stopPropagation()}
          >
            <StudentModalHeader>
              <StudentModalTop>
                <StudentModalIdentity>
                  <StudentModalAvatar $seed={animatedMasteryRow.studentId?.length || 0}>
                    <AvatarImageWithFallback
                      src={animatedMasteryRow.avatar}
                      alt={animatedMasteryRow.name}
                    >
                      {getInitials(animatedMasteryRow.name)}
                    </AvatarImageWithFallback>
                  </StudentModalAvatar>

                  <StudentModalMeta>
                    <StudentModalMetaRow>
                      <span>
                        {animatedMasteryRow.course.title ||
                          animatedMasteryRow.course.name}
                      </span>
                      <span>•</span>
                      <StudentModalStatusBadge>
                        <GraduationCap size={12} />
                        {animatedMasteryRow.masteryPercent}%{" "}
                        {t("teacher.workspace.masteryRate", {
                          defaultValue: "o'zlashtirish",
                        })}
                      </StudentModalStatusBadge>
                    </StudentModalMetaRow>
                    <StudentModalName>{animatedMasteryRow.name}</StudentModalName>
                    <StudentModalSubline>
                      {t("teacher.workspace.masteryModalSubtitle", {
                        defaultValue:
                          "Har bir dars uchun uyga vazifa, mashq va siz qo'yadigan baho bir joyda ko'rinadi.",
                      })}
                    </StudentModalSubline>
                  </StudentModalMeta>
                </StudentModalIdentity>

                <StudentModalClose
                  type="button"
                  onClick={() => {
                    setSelectedMasteryLessonFocusId(null);
                    setSelectedMasteryRow(null);
                  }}
                >
                  <X size={18} />
                </StudentModalClose>
              </StudentModalTop>
            </StudentModalHeader>

            <StudentModalBody>
              {!selectedMasteryLessonFocusId ? (
                <StudentInfoGrid>
                  <StudentInfoCard>
                    <StudentInfoLabel>
                      {t("teacher.workspace.completedLessons", {
                        defaultValue: "Tugallangan darslar",
                      })}
                    </StudentInfoLabel>
                    <StudentInfoValue>
                      {animatedMasteryRow.completedLessons}/{animatedMasteryRow.totalLessons}
                    </StudentInfoValue>
                  </StudentInfoCard>
                  <StudentInfoCard>
                    <StudentInfoLabel>
                      {t("teacher.workspace.averageProgress", {
                        defaultValue: "O'rtacha progress",
                      })}
                    </StudentInfoLabel>
                    <StudentInfoValue>
                      {animatedMasteryRow.averageProgress}%
                    </StudentInfoValue>
                  </StudentInfoCard>
                </StudentInfoGrid>
              ) : null}

              <StudentModalSection>
                <StudentModalSectionTitle>
                  {t("teacher.workspace.lessonGrades", {
                    defaultValue: "Darslar bo'yicha baholash",
                  })}
                </StudentModalSectionTitle>

                {selectedMasteryLessonRows.length ? (
                  <DetailLessonList>
                    {selectedMasteryLessonRows.map((lesson) => {
                      const saveKey = `${animatedMasteryRow.memberId}-${lesson.id}`;
                      const saving = savingMasteryKey === saveKey;
                      const collapsed = collapsedMasteryLessons[lesson.id];
                      const scoreDisplay =
                        lesson.oralScore === "" ? "—" : `${lesson.oralScore}/100`;
                      const attendanceOptions = [
                        {
                          id: "present",
                          label: t("teacher.workspace.present", {
                            defaultValue: "Kirdi",
                          }),
                        },
                        {
                          id: "late",
                          label: t("teacher.workspace.late", {
                            defaultValue: "Kechikdi",
                          }),
                        },
                        {
                          id: "absent",
                          label: t("teacher.workspace.absent", {
                            defaultValue: "Kirmadi",
                          }),
                        },
                      ];
                      const attendanceDisplay =
                        attendanceOptions.find(
                          (option) => option.id === lesson.attendanceStatus,
                        )?.label ||
                        t("teacher.workspace.notMarked", {
                          defaultValue: "Belgilanmagan",
                        });
                      return (
                        <DetailLessonCard key={lesson.id}>
                          <DetailLessonHeader>
                            <DetailLessonMeta>
                              <DetailLessonEyebrow>
                                {t("coursePlayer.adminPane.lessonNumber", {
                                  index: lesson.index + 1,
                                  defaultValue: `Dars ${lesson.index + 1}`,
                                })}
                              </DetailLessonEyebrow>
                              <DetailLessonTitle>{lesson.title}</DetailLessonTitle>
                              <DetailLessonSubline>
                                {lesson.description ||
                                  t("teacher.workspace.lessonDescriptionFallback", {
                                    defaultValue: "Bu dars uchun tavsif kiritilmagan.",
                                  })}
                              </DetailLessonSubline>
                            </DetailLessonMeta>

                            <DetailMetricRow>
                              <DetailMetricPill>
                                {lesson.isGraded
                                  ? lesson.updatedAt
                                  ? t("teacher.workspace.updatedDate", {
                                      date: formatShortDate(lesson.updatedAt),
                                      defaultValue: `Yangilangan ${formatShortDate(
                                        lesson.updatedAt,
                                      )}`,
                                    })
                                  : t("teacher.workspace.gradedSummary", {
                                      defaultValue: "Baholangan",
                                    })
                                  : t("teacher.workspace.notGradedYet", {
                                      defaultValue: "Hali baholanmagan",
                                    })}
                              </DetailMetricPill>
                              {collapsed ? (
                                <ExerciseAnswerToggle
                                  type="button"
                                  $active={false}
                                  onClick={() =>
                                    setCollapsedMasteryLessons((prev) => ({
                                      ...prev,
                                      [lesson.id]: false,
                                    }))
                                  }
                                  aria-label={t("common.edit", {
                                    defaultValue: "Tahrirlash",
                                  })}
                                  title={t("common.edit", {
                                    defaultValue: "Tahrirlash",
                                  })}
                                >
                                  <Pencil size={15} />
                                </ExerciseAnswerToggle>
                              ) : null}
                            </DetailMetricRow>
                          </DetailLessonHeader>

                          <MasteryGrid>
                            <MasteryMetricCard>
                              <MasteryMetricLabel>
                                {t("coursePlayer.homework.title", {
                                  defaultValue: "Uyga vazifa",
                                })}
                              </MasteryMetricLabel>
                              <MasteryMetricValue>{lesson.homework.scoreLabel}</MasteryMetricValue>
                              <MasteryMetricHint>
                                {lesson.homework.enabled
                                  ? t("teacher.workspace.homeworkSummary", {
                                      defaultValue:
                                        "Yuborilgan: {{submitted}} | Tekshirilgan: {{reviewed}}",
                                      submitted: lesson.homework.submittedCount,
                                      reviewed: lesson.homework.reviewedCount,
                                    })
                                  : t("teacher.workspace.noHomeworkAssigned", {
                                      defaultValue: "Uyga vazifa biriktirilmagan",
                                    })}
                              </MasteryMetricHint>
                            </MasteryMetricCard>

                            <MasteryMetricCard>
                              <MasteryMetricLabel>
                                {t("teacher.workspace.exercise", {
                                  defaultValue: "Mashq",
                                })}
                              </MasteryMetricLabel>
                              <MasteryMetricValue>{lesson.exercise.scoreLabel}</MasteryMetricValue>
                              <MasteryMetricHint>
                                {lesson.exercise.enabled
                                  ? t("teacher.workspace.exerciseSummary", {
                                      defaultValue:
                                        "Bajarilgan: {{done}} / {{total}} test",
                                      done: lesson.exercise.completedCount,
                                      total: lesson.exercise.totalCount,
                                    })
                                  : t("teacher.workspace.noExercisesAssigned", {
                                      defaultValue: "Mashq biriktirilmagan",
                                    })}
                              </MasteryMetricHint>
                            </MasteryMetricCard>

                            <MasteryMetricCard>
                              <MasteryMetricLabel>
                                {t("teacher.workspace.teacherScore", {
                                  defaultValue: "Mening bahom",
                                })}
                              </MasteryMetricLabel>
                              <MasteryMetricValue>{scoreDisplay}</MasteryMetricValue>
                              <MasteryMetricHint>
                                {collapsed
                                  ? t("teacher.workspace.gradedSummary", {
                                      defaultValue: "Baholangan",
                                    })
                                  : lesson.oralNote ||
                                    t("teacher.workspace.noTeacherNote", {
                                      defaultValue: "Izoh kiritilmagan",
                                    })}
                              </MasteryMetricHint>
                            </MasteryMetricCard>
                          </MasteryGrid>

                          <LessonControlSection>
                            <LessonControlTitle>
                              {t("teacher.workspace.lessonAttendance", {
                                defaultValue: "Davomat",
                              })}
                            </LessonControlTitle>
                            {collapsed ? (
                              <HomeworkReviewSummaryGrid>
                                <HomeworkReviewSummaryBox>
                                  <HomeworkReviewSummaryLabel>
                                    {t("teacher.workspace.lessonAttendance", {
                                      defaultValue: "Davomat",
                                    })}
                                  </HomeworkReviewSummaryLabel>
                                  <HomeworkReviewSummaryValue>
                                    {attendanceDisplay}
                                  </HomeworkReviewSummaryValue>
                                </HomeworkReviewSummaryBox>
                              </HomeworkReviewSummaryGrid>
                            ) : (
                              <AttendanceStatusGroup>
                                {attendanceOptions.map((option) => (
                                  <AttendanceStatusButton
                                    key={option.id}
                                    type="button"
                                    $active={lesson.attendanceStatus === option.id}
                                    disabled={saving}
                                    onClick={() =>
                                      handleMasteryDraftChange(
                                        lesson.id,
                                        "attendanceStatus",
                                        option.id,
                                      )
                                    }
                                  >
                                    {option.label}
                                  </AttendanceStatusButton>
                                ))}
                              </AttendanceStatusGroup>
                            )}
                          </LessonControlSection>

                          <LessonControlSection>
                            <LessonControlTitle>
                              {t("teacher.workspace.teacherScore", {
                                defaultValue: "Mening bahom",
                              })}
                            </LessonControlTitle>
                            {collapsed ? (
                              <HomeworkReviewSummaryGrid>
                                <HomeworkReviewSummaryBox>
                                  <HomeworkReviewSummaryLabel>
                                    {t("teacher.workspace.teacherScore", {
                                      defaultValue: "Mening bahom",
                                    })}
                                  </HomeworkReviewSummaryLabel>
                                  <HomeworkReviewSummaryValue>
                                    {scoreDisplay}
                                  </HomeworkReviewSummaryValue>
                                </HomeworkReviewSummaryBox>
                                <HomeworkReviewSummaryBox>
                                  <HomeworkReviewSummaryLabel>
                                    {t("teacher.workspace.note", {
                                      defaultValue: "Izoh",
                                    })}
                                  </HomeworkReviewSummaryLabel>
                                  <HomeworkReviewSummaryValue>
                                    {lesson.oralNote ||
                                      t("teacher.workspace.noTeacherNote", {
                                        defaultValue: "Izoh kiritilmagan",
                                      })}
                                  </HomeworkReviewSummaryValue>
                                </HomeworkReviewSummaryBox>
                              </HomeworkReviewSummaryGrid>
                            ) : (
                              <MasteryEditorGrid>
                                <FieldGroup>
                                  <FieldLabel>
                                    {t("teacher.workspace.teacherScore", {
                                      defaultValue: "Mening bahom",
                                    })}
                                  </FieldLabel>
                                  <FieldInput
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={lesson.oralScore}
                                    onChange={(event) =>
                                      handleMasteryDraftChange(
                                        lesson.id,
                                        "score",
                                        event.target.value,
                                      )
                                    }
                                    placeholder="0-100"
                                  />
                                </FieldGroup>

                                <FieldGroup>
                                  <FieldLabel>
                                    {t("teacher.workspace.note", {
                                      defaultValue: "Izoh",
                                    })}
                                  </FieldLabel>
                                  <FieldTextarea
                                    rows={2}
                                    value={lesson.oralNote}
                                    onChange={(event) =>
                                      handleMasteryDraftChange(
                                        lesson.id,
                                        "note",
                                        event.target.value,
                                      )
                                    }
                                    placeholder={t(
                                      "teacher.workspace.scoreNotePlaceholder",
                                      {
                                        defaultValue: "Qisqa fikr yoki tavsiya yozing",
                                      },
                                    )}
                                  />
                                </FieldGroup>
                              </MasteryEditorGrid>
                            )}
                          </LessonControlSection>

                          {lesson.homeworkAssignments?.length ? (
                            <LessonControlSection>
                              <LessonControlTitle>
                                {t("coursePlayer.homework.title", {
                                  defaultValue: "Uyga vazifa",
                                })}
                              </LessonControlTitle>
                            <HomeworkCompactList>
                              {lesson.homeworkAssignments.map((assignment, assignmentIndex) => {
                                const submission = getHomeworkSubmissionForUser(
                                  assignment,
                                  animatedMasteryRow.memberId,
                                );
                                const draftKey = `${lesson.id}:${assignment.assignmentId}:${animatedMasteryRow.memberId}`;
                                const draft = homeworkReviewDrafts[draftKey] || {};
                                const nextScore =
                                  draft.score !== undefined
                                    ? draft.score
                                    : submission?.score ?? "";
                                const nextFeedback =
                                  draft.feedback !== undefined
                                    ? draft.feedback
                                    : submission?.feedback || "";

                                return (
                                  <HomeworkCompactCard
                                    key={assignment.assignmentId || assignmentIndex}
                                  >
                                    <HomeworkCompactHeader>
                                      <div>
                                        <HomeworkReviewTitle>
                                          {assignment.title ||
                                            t("coursePlayer.homework.assignmentLabel", {
                                              index: assignmentIndex + 1,
                                              defaultValue: `Vazifa ${assignmentIndex + 1}`,
                                            })}
                                        </HomeworkReviewTitle>
                                        <HomeworkReviewMeta>
                                          {assignment.description ||
                                            t("teacher.workspace.noTeacherNote", {
                                              defaultValue: "Izoh kiritilmagan",
                                            })}
                                        </HomeworkReviewMeta>
                                      </div>
                                      <DetailMetricRow>
                                        <DetailMetricPill>
                                        {submission
                                          ? t(
                                              `coursePlayer.homework.status.${submission.status}`,
                                              {
                                                defaultValue:
                                                  submission.status === "reviewed"
                                                    ? "Tekshirilgan"
                                                    : submission.status === "needs_revision"
                                                      ? "Qayta ishlash kerak"
                                                      : "Yuborilgan",
                                              },
                                            )
                                          : t("coursePlayer.homework.notSubmitted", {
                                              defaultValue: "Yuborilmagan",
                                            })}
                                        </DetailMetricPill>
                                        <ExerciseAnswerToggle
                                          type="button"
                                          $active={false}
                                          onClick={() =>
                                            setSelectedHomeworkReview({
                                              row: animatedMasteryRow,
                                              lessonId: lesson.id,
                                              assignment,
                                              assignmentIndex,
                                              submission,
                                            })
                                          }
                                          aria-label="Uyga vazifani ko'rish"
                                          title="Uyga vazifani ko'rish"
                                        >
                                          <Eye size={15} />
                                        </ExerciseAnswerToggle>
                                      </DetailMetricRow>
                                    </HomeworkCompactHeader>

                                    {submission && !collapsed ? (
                                      <HomeworkInlineReviewGrid>
                                        <HomeworkReviewField>
                                          <HomeworkReviewLabel>
                                            {t("coursePlayer.homework.fields.score", {
                                              defaultValue: "Ball",
                                            })}
                                          </HomeworkReviewLabel>
                                          <HomeworkReviewInput
                                            type="number"
                                            min="0"
                                            max={assignment.maxScore || 100}
                                            value={nextScore}
                                            onChange={(event) =>
                                              handleHomeworkReviewDraftChange(
                                                draftKey,
                                                "score",
                                                event.target.value,
                                              )
                                            }
                                            placeholder={`0-${assignment.maxScore || 100}`}
                                          />
                                        </HomeworkReviewField>
                                        <HomeworkReviewField>
                                          <HomeworkReviewLabel>
                                            {t("coursePlayer.homework.fields.feedback", {
                                              defaultValue: "Izoh / Feedback",
                                            })}
                                          </HomeworkReviewLabel>
                                          <HomeworkReviewTextarea
                                            rows={2}
                                            value={nextFeedback}
                                            onChange={(event) =>
                                              handleHomeworkReviewDraftChange(
                                                draftKey,
                                                "feedback",
                                                event.target.value,
                                              )
                                            }
                                            placeholder={t(
                                              "coursePlayer.homework.fields.feedback",
                                              {
                                                defaultValue: "Qisqa izoh yozing",
                                              },
                                            )}
                                          />
                                        </HomeworkReviewField>
                                      </HomeworkInlineReviewGrid>
                                    ) : null}

                                    {submission && collapsed ? (
                                      <HomeworkReviewSummaryGrid>
                                        <HomeworkReviewSummaryBox>
                                          <HomeworkReviewSummaryLabel>
                                            {t("coursePlayer.homework.fields.score", {
                                              defaultValue: "Ball",
                                            })}
                                          </HomeworkReviewSummaryLabel>
                                          <HomeworkReviewSummaryValue>
                                            {submission.score === null ||
                                            submission.score === undefined
                                              ? "—"
                                              : `${submission.score}/${assignment.maxScore || 100}`}
                                          </HomeworkReviewSummaryValue>
                                        </HomeworkReviewSummaryBox>
                                        <HomeworkReviewSummaryBox>
                                          <HomeworkReviewSummaryLabel>
                                            {t("coursePlayer.homework.fields.feedback", {
                                              defaultValue: "Izoh / Feedback",
                                            })}
                                          </HomeworkReviewSummaryLabel>
                                          <HomeworkReviewSummaryValue>
                                            {submission.feedback ||
                                              t("teacher.workspace.noTeacherNote", {
                                                defaultValue: "Izoh kiritilmagan",
                                              })}
                                          </HomeworkReviewSummaryValue>
                                        </HomeworkReviewSummaryBox>
                                      </HomeworkReviewSummaryGrid>
                                    ) : null}
                                  </HomeworkCompactCard>
                                );
                              })}
                            </HomeworkCompactList>
                            </LessonControlSection>
                          ) : lesson.homeworkLoading ? (
                            <EmptyDetailState>
                              {t("common.loading", {
                                defaultValue: "Yuklanmoqda...",
                              })}
                            </EmptyDetailState>
                          ) : null}

                          {lesson.exerciseTests?.length ? (
                            <LessonControlSection>
                              <LessonControlTitle>
                                {t("teacher.workspace.exercise", {
                                  defaultValue: "Mashqlar",
                                })}
                              </LessonControlTitle>
                              <ExerciseResultList>
                                {lesson.exerciseTests.map((test, testIndex) => {
                                  const progress = getExerciseProgressForUser(
                                    test,
                                    animatedMasteryRow.memberId,
                                  );
                                  const percent =
                                    progress?.bestPercent ??
                                    progress?.percent ??
                                    progress?.score ??
                                    null;
                                  const correct =
                                    progress?.correctCount ??
                                    progress?.correct ??
                                    progress?.score ??
                                    null;
                                  const total =
                                    progress?.totalQuestions ??
                                    progress?.total ??
                                    progress?.questionsCount ??
                                    null;
                                  const attempts =
                                    progress?.attemptsCount ??
                                    progress?.attempts ??
                                    progress?.attemptCount ??
                                    null;
                                  const completedAt =
                                    progress?.completedAt ||
                                    progress?.lastAttemptAt ||
                                    progress?.submittedAt ||
                                    progress?.updatedAt ||
                                    null;
                                  const testId =
                                    test.testId ||
                                    test.resourceId ||
                                    test._id ||
                                    test.id ||
                                    "";
                                  const detailKey = `${testId}:${animatedMasteryRow.memberId}`;
                                  const answersLoading = Boolean(exerciseAnswerLoading[detailKey]);

                                  return (
                                    <ExerciseResultCard
                                      key={
                                        test.testId ||
                                        test.resourceId ||
                                        test._id ||
                                        test.id ||
                                        testIndex
                                      }
                                    >
                                      <ExerciseResultHeader>
                                        <ExerciseResultTitle>
                                          {test.title ||
                                            test.name ||
                                            t("teacher.workspace.exercise", {
                                              defaultValue: "Mashq",
                                            })}
                                        </ExerciseResultTitle>
                                        <DetailMetricPill>
                                          {progress
                                            ? t("teacher.workspace.completed", {
                                                defaultValue: "Ishlangan",
                                              })
                                            : t("teacher.workspace.notCompleted", {
                                                defaultValue: "Ishlamagan",
                                              })}
                                        </DetailMetricPill>
                                      </ExerciseResultHeader>

                                      {progress ? (
                                        <>
                                          <ExerciseResultGrid>
                                            <ExerciseResultStat>
                                              <ExerciseResultLabel>
                                                {t("teacher.workspace.result", {
                                                  defaultValue: "Natija",
                                                })}
                                              </ExerciseResultLabel>
                                              <ExerciseResultValue>
                                                {percent === null || percent === undefined
                                                  ? "—"
                                                  : `${Math.round(Number(percent) || 0)}%`}
                                              </ExerciseResultValue>
                                            </ExerciseResultStat>
                                            <ExerciseResultStat>
                                              <ExerciseResultStatTop>
                                                <ExerciseResultLabel>
                                                  {t("teacher.workspace.correctAnswers", {
                                                    defaultValue: "To'g'ri",
                                                  })}
                                                </ExerciseResultLabel>
                                                {testId ? (
                                                  <ExerciseAnswerToggle
                                                    type="button"
                                                    $active={
                                                      selectedExerciseAnswer?.detailKey === detailKey
                                                    }
                                                    disabled={answersLoading}
                                                    onClick={() =>
                                                      handleExerciseAnswerOpen({
                                                        test,
                                                        testId,
                                                        userId: animatedMasteryRow.memberId,
                                                      })
                                                    }
                                                    aria-label="Javob kalitlarini ko'rish"
                                                    title="Javob kalitlarini ko'rish"
                                                  >
                                                    <Eye size={15} />
                                                  </ExerciseAnswerToggle>
                                                ) : null}
                                              </ExerciseResultStatTop>
                                              <ExerciseResultValue>
                                                {correct === null || correct === undefined
                                                  ? "—"
                                                  : total === null || total === undefined
                                                    ? correct
                                                    : `${correct}/${total}`}
                                              </ExerciseResultValue>
                                            </ExerciseResultStat>
                                            <ExerciseResultStat>
                                              <ExerciseResultLabel>
                                                {t("teacher.workspace.attempts", {
                                                  defaultValue: "Urinishlar",
                                                })}
                                              </ExerciseResultLabel>
                                              <ExerciseResultValue>
                                                {attempts === null || attempts === undefined
                                                  ? "—"
                                                  : attempts}
                                              </ExerciseResultValue>
                                            </ExerciseResultStat>
                                            <ExerciseResultStat>
                                              <ExerciseResultLabel>
                                                {t("teacher.workspace.lastAttempt", {
                                                  defaultValue: "Oxirgi urinish",
                                                })}
                                              </ExerciseResultLabel>
                                              <ExerciseResultValue>
                                                {completedAt
                                                  ? formatDateTime(completedAt)
                                                  : "—"}
                                              </ExerciseResultValue>
                                            </ExerciseResultStat>
                                          </ExerciseResultGrid>
                                        </>
                                      ) : (
                                        <HomeworkSubmissionBody>
                                          {t("teacher.workspace.exerciseNotWorked", {
                                            defaultValue:
                                              "Bu mashq bo'yicha natija hali yo'q.",
                                          })}
                                        </HomeworkSubmissionBody>
                                      )}
                                    </ExerciseResultCard>
                                  );
                                })}
                              </ExerciseResultList>
                            </LessonControlSection>
                          ) : null}

                          {!collapsed ? (
                            <MasterySaveRow>
                              <InlinePrimaryButton
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                  handleMasterySave(animatedMasteryRow, lesson)
                                }
                              >
                                {saving
                                  ? t("common.saving")
                                  : t("common.save", {
                                      defaultValue: "Saqlash",
                                    })}
                              </InlinePrimaryButton>
                            </MasterySaveRow>
                          ) : null}
                        </DetailLessonCard>
                      );
                    })}
                  </DetailLessonList>
                ) : (
                  <EmptyDetailState>
                    {t("teacher.workspace.noLessonsYet", {
                      defaultValue: "Darslar hali yo'q",
                    })}
                  </EmptyDetailState>
                )}
              </StudentModalSection>
            </StudentModalBody>
          </StudentModalPanel>
        </StudentModalOverlay>
      ) : null}

      {selectedHomeworkReview ? (() => {
        const { row, lessonId, assignment, assignmentIndex, submission } =
          selectedHomeworkReview;
        const userId = row?.memberId || "";

        return (
          <StudentModalOverlay
            $visible
            onClick={() => setSelectedHomeworkReview(null)}
          >
            <HomeworkModalPanel $visible onClick={(event) => event.stopPropagation()}>
              <StudentModalHeader>
                <StudentModalTop>
                  <StudentModalMeta>
                    <StudentModalMetaRow>
                      <StudentModalStatusBadge>
                        {submission
                          ? t(
                              `coursePlayer.homework.status.${submission.status}`,
                              {
                                defaultValue:
                                  submission.status === "reviewed"
                                    ? "Tekshirilgan"
                                    : submission.status === "needs_revision"
                                      ? "Qayta ishlash kerak"
                                      : "Yuborilgan",
                              },
                            )
                          : t("coursePlayer.homework.notSubmitted", {
                              defaultValue: "Yuborilmagan",
                            })}
                      </StudentModalStatusBadge>
                      {submission?.submittedAt ? (
                        <span>{formatDateTime(submission.submittedAt)}</span>
                      ) : null}
                    </StudentModalMetaRow>
                    <DetailLessonTitle>
                      {assignment?.title ||
                        t("coursePlayer.homework.assignmentLabel", {
                          index: assignmentIndex + 1,
                          defaultValue: `Vazifa ${assignmentIndex + 1}`,
                        })}
                    </DetailLessonTitle>
                    <StudentModalSubline>
                      {assignment?.description ||
                        t("teacher.workspace.noTeacherNote", {
                          defaultValue: "Izoh kiritilmagan",
                        })}
                    </StudentModalSubline>
                  </StudentModalMeta>
                  <StudentModalClose
                    type="button"
                    onClick={() => setSelectedHomeworkReview(null)}
                  >
                    <X size={18} />
                  </StudentModalClose>
                </StudentModalTop>
              </StudentModalHeader>

              <StudentModalBody>
                {submission ? (
                  <HomeworkReviewCard>
                    <DetailMetricRow>
                      {submission.fileName || submission.fileUrl ? (
                        <DetailMetricPill
                          as="a"
                          href={submission.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Link2 size={13} />
                          {submission.fileName ||
                            t("coursePlayer.homework.fileUploaded", {
                              defaultValue: "Fayl yuklangan",
                            })}
                          {submission.fileSize
                            ? ` · ${formatHomeworkFileSize(submission.fileSize)}`
                            : ""}
                        </DetailMetricPill>
                      ) : null}
                      {submission.link && !submission.fileUrl ? (
                        <DetailMetricPill
                          as="a"
                          href={submission.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Link2 size={13} />
                          {submission.link}
                        </DetailMetricPill>
                      ) : null}
                    </DetailMetricRow>

                    {submission.text ? (
                      <HomeworkSubmissionBody>{submission.text}</HomeworkSubmissionBody>
                    ) : null}

                    {renderHomeworkSubmissionPreview(
                      submission,
                      assignment,
                      lessonId,
                      userId,
                    )}
                  </HomeworkReviewCard>
                ) : (
                  <EmptyDetailState>
                    {t("coursePlayer.homework.emptySubmissions", {
                      defaultValue: "Hali javob yuborilmagan",
                    })}
                  </EmptyDetailState>
                )}
              </StudentModalBody>
            </HomeworkModalPanel>
          </StudentModalOverlay>
        );
      })() : null}

      {selectedExerciseAnswer ? (() => {
        const detailKey = selectedExerciseAnswer.detailKey;
        const detail = exerciseAnswerDetails[detailKey];
        const loadingDetail = exerciseAnswerLoading[detailKey];

        return (
          <StudentModalOverlay
            $visible
            onClick={() => setSelectedExerciseAnswer(null)}
          >
            <HomeworkModalPanel $visible onClick={(event) => event.stopPropagation()}>
              <StudentModalHeader>
                <StudentModalTop>
                  <StudentModalMeta>
                    <StudentModalMetaRow>
                      <StudentModalStatusBadge>
                        {t("teacher.workspace.correctAnswers", {
                          defaultValue: "To'g'ri",
                        })}
                      </StudentModalStatusBadge>
                    </StudentModalMetaRow>
                    <DetailLessonTitle>{selectedExerciseAnswer.title}</DetailLessonTitle>
                    <StudentModalSubline>
                      {t("teacher.workspace.answerKeys", {
                        defaultValue:
                          "Savollar, o'quvchi tanlagan javob va to'g'ri javoblar.",
                      })}
                    </StudentModalSubline>
                  </StudentModalMeta>
                  <StudentModalClose
                    type="button"
                    onClick={() => setSelectedExerciseAnswer(null)}
                  >
                    <X size={18} />
                  </StudentModalClose>
                </StudentModalTop>
              </StudentModalHeader>
              <StudentModalBody>
                {loadingDetail ? (
                  <EmptyDetailState>
                    {t("common.loading", { defaultValue: "Yuklanmoqda..." })}
                  </EmptyDetailState>
                ) : detail?.questions?.length ? (
                  <ExerciseAnswerList>
                    {detail.questions.map((question) => {
                      const correctIdx = Number(question.correctOptionIndex);
                      const userIdx = question.userAnswerIndex;
                      return (
                        <ExerciseAnswerCard
                          key={question.questionIndex}
                          $correct={question.correct}
                        >
                          <ExerciseQuestionTitle>
                            {question.questionIndex + 1}. {question.questionText}
                          </ExerciseQuestionTitle>
                          {(question.options || []).map((option, optionIndex) => {
                            const isCorrect = optionIndex === correctIdx;
                            const isSelected = optionIndex === userIdx;
                            return (
                              <ExerciseOptionRow
                                key={optionIndex}
                                $correct={isCorrect}
                                $selected={isSelected}
                              >
                                {isSelected ? (
                                  <strong>→</strong>
                                ) : (
                                  <span style={{ width: 10 }} />
                                )}
                                <span style={{ flex: 1 }}>{option}</span>
                                {isCorrect ? <CheckCircle2 size={14} /> : null}
                                {isSelected && !isCorrect ? (
                                  <XCircle size={14} />
                                ) : null}
                              </ExerciseOptionRow>
                            );
                          })}
                          {userIdx === null || userIdx === undefined ? (
                            <HomeworkReviewMeta>
                              {t("teacher.workspace.notAnswered", {
                                defaultValue: "Javob bermagan",
                              })}
                            </HomeworkReviewMeta>
                          ) : null}
                        </ExerciseAnswerCard>
                      );
                    })}
                  </ExerciseAnswerList>
                ) : (
                  <EmptyDetailState>
                    {t("teacher.workspace.noAnswerDetails", {
                      defaultValue: "Savol-javob ma'lumotlari saqlanmagan.",
                    })}
                  </EmptyDetailState>
                )}
              </StudentModalBody>
            </HomeworkModalPanel>
          </StudentModalOverlay>
        );
      })() : null}

      {animatedStudentRow ? (
        <StudentModalOverlay
          $visible={isStudentModalVisible}
          onClick={() => setSelectedStudentRow(null)}
        >
          <StudentModalPanel
            $visible={isStudentModalVisible}
            onClick={(event) => event.stopPropagation()}
          >
            <StudentModalHeader>
              <StudentModalTop>
                <StudentModalIdentity>
                  <StudentModalAvatar $seed={animatedStudentRow.studentId?.length || 0}>
                    <AvatarImageWithFallback
                      src={animatedStudentRow.avatar}
                      alt={animatedStudentRow.name}
                    >
                      {getInitials(animatedStudentRow.name)}
                    </AvatarImageWithFallback>
                  </StudentModalAvatar>

                  <StudentModalMeta>
                    <StudentModalMetaRow>
                      <span>
                        ID:{animatedStudentRow.memberId || animatedStudentRow.studentId}
                      </span>
                      <span>•</span>
                      <StudentModalStatusBadge>
                        <RefreshCw size={12} />
                        {animatedStudentRow.status === "pending"
                          ? t("teacher.students.pending")
                          : t("teacher.students.approved")}
                      </StudentModalStatusBadge>
                    </StudentModalMetaRow>
                    <StudentModalNameRow>
                      <StudentModalName>{animatedStudentRow.name}</StudentModalName>
                      <StudentModalPrimaryAction
                        type="button"
                        onClick={handleStudentChatOpen}
                        disabled={isStartingChat}
                      >
                        <MessageCircle size={15} />
                        {isStartingChat
                          ? t("common.loading")
                          : t("teacher.workspace.writeToStudent", {
                              defaultValue: "O'quvchiga yozish",
                            })}
                      </StudentModalPrimaryAction>
                    </StudentModalNameRow>
                    <StudentModalSubline>
                      {animatedStudentRow.joinedAt
                        ? t("teacher.workspace.joinedDate", {
                            date: formatShortDate(animatedStudentRow.joinedAt),
                            defaultValue: `Qo'shilgan ${formatShortDate(
                              animatedStudentRow.joinedAt,
                            )}`,
                          })
                        : t("teacher.students.approved")}
                    </StudentModalSubline>
                  </StudentModalMeta>
                </StudentModalIdentity>

                <StudentModalClose
                  type="button"
                  onClick={() => setSelectedStudentRow(null)}
                >
                  <X size={18} />
                </StudentModalClose>
              </StudentModalTop>
            </StudentModalHeader>

            <StudentModalBody>
              <StudentModalTabs>
                <StudentModalTab
                  type="button"
                  $active={studentModalTab === "overview"}
                  onClick={() => setStudentModalTab("overview")}
                >
                  <BookOpen size={16} />
                  {t("teacher.workspace.allEducation", {
                    defaultValue: "Barcha ta'lim",
                  })}
                </StudentModalTab>
                <StudentModalTab
                  type="button"
                  $active={studentModalTab === "mastery"}
                  onClick={() => setStudentModalTab("mastery")}
                >
                  <GraduationCap size={16} />
                  {t("teacher.nav.mastery", {
                    defaultValue: "O'zlashtirish",
                  })}
                </StudentModalTab>
              </StudentModalTabs>

              {studentModalTab === "overview" ? (
                <>
                  <StudentModalSection>
                    <StudentTimelineHeader>
                      <span>{t("teacher.workspace.allEducation", { defaultValue: "Barcha ta'lim" })}</span>
                      <span>
                        • {studentModalRow?.progressPercent || 0}% (
                        {selectedStudentLessonRows.filter(
                          (lesson) => lesson.status === "completed",
                        ).length}
                        /{selectedStudentLessonRows.length || 0})
                      </span>
                    </StudentTimelineHeader>

                    <StudentTimelineCard>
                      <StudentLessonList>
                        {selectedStudentLessonRows.map((lesson) => (
                          <StudentLessonCard key={lesson.id}>
                            <StudentLessonMain>
                              <StudentLessonStatusIcon $status={lesson.status}>
                                {lesson.status === "completed" ? (
                                  <Check size={18} />
                                ) : lesson.status === "current" ? (
                                  <RefreshCw size={18} />
                                ) : (
                                  <BookOpen size={18} />
                                )}
                              </StudentLessonStatusIcon>

                              <StudentLessonMeta>
                                <StudentLessonModule>
                                  Modul {lesson.index + 1}
                                </StudentLessonModule>
                                <StudentLessonTitle>{lesson.title}</StudentLessonTitle>
                                <StudentLessonStatusText>
                                  {lesson.status === "completed"
                                    ? t("teacher.workspace.lessonDone", {
                                        defaultValue: "Bajarildi",
                                      })
                                    : lesson.hasPlaybackActivity &&
                                        lesson.lastPositionSeconds > 0
                                      ? t("teacher.workspace.partialWatchStatus", {
                                          defaultValue: `${formatPlaybackTime(
                                            lesson.lastPositionSeconds,
                                          )} gacha ko‘rgan`,
                                        })
                                      : lesson.status === "current"
                                        ? t("teacher.workspace.lessonCurrent", {
                                            defaultValue: "Amaliyotda",
                                          })
                                        : t("teacher.workspace.lessonPending", {
                                            defaultValue: "Boshlanmagan",
                                          })}
                                </StudentLessonStatusText>
                              </StudentLessonMeta>
                            </StudentLessonMain>

                            <StudentLessonAside>
                              <StudentLessonFacts>
                                {lesson.watchCount > 0 ? (
                                  <StudentLessonFact
                                    title={t("teacher.workspace.watchCount", {
                                      defaultValue: "Ko‘rishlar soni",
                                    })}
                                  >
                                    <StudentLessonFactLabel>
                                      {t("teacher.workspace.watchCountShort", {
                                        defaultValue: "Ko‘rishlar",
                                      })}
                                    </StudentLessonFactLabel>
                                    <StudentLessonFactValue>
                                      {lesson.watchCount}x
                                    </StudentLessonFactValue>
                                  </StudentLessonFact>
                                ) : null}
                                {lesson.lastPositionSeconds > 0 ? (
                                  <StudentLessonFact
                                    title={t("teacher.workspace.lastPoint", {
                                      defaultValue: "Oxirgi nuqta",
                                    })}
                                  >
                                    <StudentLessonFactLabel>
                                      {t("teacher.workspace.lastPoint", {
                                        defaultValue: "Oxirgi nuqta",
                                      })}
                                    </StudentLessonFactLabel>
                                    <StudentLessonFactValue>
                                      {formatPlaybackTime(lesson.lastPositionSeconds)}
                                    </StudentLessonFactValue>
                                  </StudentLessonFact>
                                ) : null}
                                {lesson.maxPositionSeconds > 0 ? (
                                  <StudentLessonFact
                                    title={t("teacher.workspace.furthestPoint", {
                                      defaultValue: "Eng uzoq ko‘rilgan nuqta",
                                    })}
                                  >
                                    <StudentLessonFactLabel>
                                      {t("teacher.workspace.furthestPoint", {
                                        defaultValue: "Eng uzoq",
                                      })}
                                    </StudentLessonFactLabel>
                                    <StudentLessonFactValue>
                                      {formatPlaybackTime(lesson.maxPositionSeconds)}
                                    </StudentLessonFactValue>
                                  </StudentLessonFact>
                                ) : null}
                                {lesson.lessonDurationSeconds > 0 ? (
                                  <StudentLessonFact
                                    title={t("teacher.workspace.lessonDuration", {
                                      defaultValue: "Dars davomiyligi",
                                    })}
                                  >
                                    <StudentLessonFactLabel>
                                      {t("teacher.workspace.duration", {
                                        defaultValue: "Davomiyligi",
                                      })}
                                    </StudentLessonFactLabel>
                                    <StudentLessonFactValue>
                                      {formatPlaybackTime(lesson.lessonDurationSeconds)}
                                    </StudentLessonFactValue>
                                  </StudentLessonFact>
                                ) : null}
                              </StudentLessonFacts>

                              {lesson.status === "current" ? (
                                <StudentLessonBadge $status="current">
                                  <StudentLessonBadgeLabel>
                                    {t("teacher.workspace.status", {
                                      defaultValue: "Holat",
                                    })}
                                  </StudentLessonBadgeLabel>
                                  {lesson.hasPlaybackActivity &&
                                  lesson.lastPositionSeconds > 0
                                    ? t("teacher.workspace.partialWatchBadge", {
                                        defaultValue: "Qisman ko‘rgan",
                                      })
                                    : t("teacher.workspace.current", {
                                        defaultValue: "Joriy",
                                      })}
                                </StudentLessonBadge>
                              ) : null}
                              {lesson.status === "completed" ? (
                                <StudentLessonBadge $status="completed">
                                  <StudentLessonBadgeLabel>
                                    {t("teacher.workspace.result", {
                                      defaultValue: "Natija",
                                    })}
                                  </StudentLessonBadgeLabel>
                                  {lesson.progressPercent}%
                                </StudentLessonBadge>
                              ) : null}
                              <StudentLessonTimestamp>
                                {lesson.lastWatchedAt
                                  ? `${t("teacher.workspace.lastActivity", {
                                      defaultValue: "Oxirgi harakat",
                                    })} ${formatDateTime(lesson.lastWatchedAt)}`
                                  : t("teacher.workspace.notWatchedYet", {
                                      defaultValue: "Hali ko‘rilmagan",
                                    })}
                              </StudentLessonTimestamp>
                            </StudentLessonAside>
                          </StudentLessonCard>
                        ))}
                      </StudentLessonList>
                    </StudentTimelineCard>
                  </StudentModalSection>
                </>
              ) : null}

              {studentModalTab === "mastery" ? (
                <StudentModalSection>
                  <StudentTimelineHeader>
                    <span>
                      {t("teacher.workspace.lessonGrades", {
                        defaultValue: "Darslar bo'yicha baholash",
                      })}
                    </span>
                    <span>
                      • {selectedStudentMasterySummary.masteryPercent}%
                    </span>
                  </StudentTimelineHeader>

                  {selectedStudentMasteryLessonRows.length ? (
                    <DetailLessonList>
                      {selectedStudentMasteryLessonRows.map((lesson) => {
                        const saveKey = `${studentModalRow?.memberId || "unknown"}-${lesson.id}`;
                        const saving = savingMasteryKey === saveKey;
                        const collapsed = collapsedStudentMasteryLessons[lesson.id];
                        const scoreDisplay =
                          lesson.oralScore === "" ? "—" : `${lesson.oralScore}/100`;
                        const attendanceOptions = [
                          {
                            id: "present",
                            label: t("teacher.workspace.present", {
                              defaultValue: "Kirdi",
                            }),
                          },
                          {
                            id: "late",
                            label: t("teacher.workspace.late", {
                              defaultValue: "Kechikdi",
                            }),
                          },
                          {
                            id: "absent",
                            label: t("teacher.workspace.absent", {
                              defaultValue: "Kirmadi",
                            }),
                          },
                        ];
                        const attendanceDisplay =
                          attendanceOptions.find(
                            (option) => option.id === lesson.attendanceStatus,
                          )?.label ||
                          t("teacher.workspace.notMarked", {
                            defaultValue: "Belgilanmagan",
                          });

                        return (
                          <DetailLessonCard key={lesson.id}>
                            <DetailLessonHeader>
                              <DetailLessonMeta>
                                <DetailLessonEyebrow>
                                  {t("coursePlayer.adminPane.lessonNumber", {
                                    index: lesson.index + 1,
                                    defaultValue: `Dars ${lesson.index + 1}`,
                                  })}
                                </DetailLessonEyebrow>
                                <DetailLessonTitle>{lesson.title}</DetailLessonTitle>
                                <DetailLessonSubline>
                                  {lesson.description ||
                                    t("teacher.workspace.lessonDescriptionFallback", {
                                      defaultValue: "Bu dars uchun tavsif kiritilmagan.",
                                    })}
                                </DetailLessonSubline>
                              </DetailLessonMeta>

                              <DetailMetricRow>
                                <DetailMetricPill>
                                  {lesson.attendanceStatus === "present"
                                    ? t("teacher.workspace.present", {
                                        defaultValue: "Kirdi",
                                      })
                                    : lesson.attendanceStatus === "late"
                                      ? t("teacher.workspace.late", {
                                          defaultValue: "Kechikdi",
                                        })
                                      : lesson.attendanceStatus === "absent"
                                        ? t("teacher.workspace.absent", {
                                            defaultValue: "Kirmadi",
                                          })
                                        : t("teacher.workspace.notMarkedYet", {
                                            defaultValue: "Hali belgilanmagan",
                                          })}
                                </DetailMetricPill>
                                <DetailMetricPill>
                                  {lesson.updatedAt
                                    ? formatShortDate(lesson.updatedAt)
                                    : t("teacher.workspace.notMarkedYet", {
                                        defaultValue: "Hali baholanmagan",
                                      })}
                                </DetailMetricPill>
                                {collapsed ? (
                                  <ExerciseAnswerToggle
                                    type="button"
                                    $active={false}
                                    onClick={() =>
                                      setCollapsedStudentMasteryLessons((prev) => ({
                                        ...prev,
                                        [lesson.id]: false,
                                      }))
                                    }
                                    aria-label={t("common.edit", {
                                      defaultValue: "Tahrirlash",
                                    })}
                                    title={t("common.edit", {
                                      defaultValue: "Tahrirlash",
                                    })}
                                  >
                                    <Pencil size={15} />
                                  </ExerciseAnswerToggle>
                                ) : null}
                              </DetailMetricRow>
                            </DetailLessonHeader>

                            <MasteryGrid>
                              <MasteryMetricCard>
                                <MasteryMetricLabel>
                                  {t("coursePlayer.homework.title", {
                                    defaultValue: "Uyga vazifa",
                                  })}
                                </MasteryMetricLabel>
                                <MasteryMetricValue>{lesson.homework.scoreLabel}</MasteryMetricValue>
                                <MasteryMetricHint>
                                  {lesson.homework.enabled
                                    ? t("teacher.workspace.homeworkSummary", {
                                        defaultValue:
                                          "Yuborilgan: {{submitted}} | Tekshirilgan: {{reviewed}}",
                                        submitted: lesson.homework.submittedCount,
                                        reviewed: lesson.homework.reviewedCount,
                                      })
                                    : t("teacher.workspace.noHomeworkAssigned", {
                                        defaultValue: "Uyga vazifa biriktirilmagan",
                                      })}
                                </MasteryMetricHint>
                              </MasteryMetricCard>

                              <MasteryMetricCard>
                                <MasteryMetricLabel>
                                  {t("teacher.workspace.exercise", {
                                    defaultValue: "Mashq",
                                  })}
                                </MasteryMetricLabel>
                                <MasteryMetricValue>{lesson.exercise.scoreLabel}</MasteryMetricValue>
                                <MasteryMetricHint>
                                  {lesson.exercise.enabled
                                    ? t("teacher.workspace.exerciseSummary", {
                                        defaultValue:
                                          "Bajarilgan: {{done}} / {{total}} test",
                                        done: lesson.exercise.completedCount,
                                        total: lesson.exercise.totalCount,
                                      })
                                    : t("teacher.workspace.noExercisesAssigned", {
                                        defaultValue: "Mashq biriktirilmagan",
                                      })}
                                </MasteryMetricHint>
                              </MasteryMetricCard>

                              <MasteryMetricCard>
                                <MasteryMetricLabel>
                                  {t("teacher.workspace.teacherScoreLabel", {
                                    defaultValue: "O'qituvchi bahosi",
                                  })}
                                </MasteryMetricLabel>
                                <MasteryMetricValue>
                                  {scoreDisplay}
                                </MasteryMetricValue>
                                <MasteryMetricHint>
                                  {lesson.oralNote ||
                                    t("teacher.workspace.noTeacherNote", {
                                      defaultValue: "Izoh kiritilmagan",
                                    })}
                                </MasteryMetricHint>
                              </MasteryMetricCard>
                            </MasteryGrid>

                            <LessonControlSection>
                              <LessonControlTitle>
                                {t("teacher.workspace.lessonAttendance", {
                                  defaultValue: "Davomat",
                                })}
                              </LessonControlTitle>
                              {collapsed ? (
                                <HomeworkReviewSummaryGrid>
                                  <HomeworkReviewSummaryBox>
                                    <HomeworkReviewSummaryLabel>
                                      {t("teacher.workspace.lessonAttendance", {
                                        defaultValue: "Davomat",
                                      })}
                                    </HomeworkReviewSummaryLabel>
                                    <HomeworkReviewSummaryValue>
                                      {attendanceDisplay}
                                    </HomeworkReviewSummaryValue>
                                  </HomeworkReviewSummaryBox>
                                </HomeworkReviewSummaryGrid>
                              ) : (
                                <AttendanceStatusGroup>
                                  {attendanceOptions.map((option) => (
                                    <AttendanceStatusButton
                                      key={option.id}
                                      type="button"
                                      $active={lesson.attendanceStatus === option.id}
                                      disabled={saving}
                                      onClick={() =>
                                        handleStudentMasteryDraftChange(
                                          lesson.id,
                                          "attendanceStatus",
                                          option.id,
                                        )
                                      }
                                    >
                                      {option.label}
                                    </AttendanceStatusButton>
                                  ))}
                                </AttendanceStatusGroup>
                              )}
                            </LessonControlSection>

                            <LessonControlSection>
                              <LessonControlTitle>
                                {t("teacher.workspace.teacherScore", {
                                  defaultValue: "Mening bahom",
                                })}
                              </LessonControlTitle>
                              {collapsed ? (
                                <HomeworkReviewSummaryGrid>
                                  <HomeworkReviewSummaryBox>
                                    <HomeworkReviewSummaryLabel>
                                      {t("teacher.workspace.teacherScore", {
                                        defaultValue: "Mening bahom",
                                      })}
                                    </HomeworkReviewSummaryLabel>
                                    <HomeworkReviewSummaryValue>
                                      {scoreDisplay}
                                    </HomeworkReviewSummaryValue>
                                  </HomeworkReviewSummaryBox>
                                  <HomeworkReviewSummaryBox>
                                    <HomeworkReviewSummaryLabel>
                                      {t("teacher.workspace.note", {
                                        defaultValue: "Izoh",
                                      })}
                                    </HomeworkReviewSummaryLabel>
                                    <HomeworkReviewSummaryValue>
                                      {lesson.oralNote ||
                                        t("teacher.workspace.noTeacherNote", {
                                          defaultValue: "Izoh kiritilmagan",
                                        })}
                                    </HomeworkReviewSummaryValue>
                                  </HomeworkReviewSummaryBox>
                                </HomeworkReviewSummaryGrid>
                              ) : (
                                <MasteryEditorGrid>
                                  <FieldGroup>
                                    <FieldLabel>
                                      {t("teacher.workspace.teacherScore", {
                                        defaultValue: "Mening bahom",
                                      })}
                                    </FieldLabel>
                                    <FieldInput
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={lesson.oralScore}
                                      onChange={(event) =>
                                        handleStudentMasteryDraftChange(
                                          lesson.id,
                                          "score",
                                          event.target.value,
                                        )
                                      }
                                      placeholder="0-100"
                                    />
                                  </FieldGroup>

                                  <FieldGroup>
                                    <FieldLabel>
                                      {t("teacher.workspace.note", {
                                        defaultValue: "Izoh",
                                      })}
                                    </FieldLabel>
                                    <FieldTextarea
                                      rows={2}
                                      value={lesson.oralNote}
                                      onChange={(event) =>
                                        handleStudentMasteryDraftChange(
                                          lesson.id,
                                          "note",
                                          event.target.value,
                                        )
                                      }
                                      placeholder={t(
                                        "teacher.workspace.scoreNotePlaceholder",
                                        {
                                          defaultValue: "Qisqa fikr yoki tavsiya yozing",
                                        },
                                      )}
                                    />
                                  </FieldGroup>
                                </MasteryEditorGrid>
                              )}
                            </LessonControlSection>

                            {lesson.homeworkAssignments?.length ? (
                              <LessonControlSection>
                                <LessonControlTitle>
                                  {t("coursePlayer.homework.title", {
                                    defaultValue: "Uyga vazifa",
                                  })}
                                </LessonControlTitle>
                                <HomeworkCompactList>
                                  {lesson.homeworkAssignments.map((assignment, assignmentIndex) => {
                                    const submission = getHomeworkSubmissionForUser(
                                      assignment,
                                      studentModalRow?.memberId,
                                    );
                                    const draftKey = `${lesson.id}:${assignment.assignmentId}:${studentModalRow?.memberId}`;
                                    const draft = homeworkReviewDrafts[draftKey] || {};
                                    const nextScore =
                                      draft.score !== undefined
                                        ? draft.score
                                        : submission?.score ?? "";
                                    const nextFeedback =
                                      draft.feedback !== undefined
                                        ? draft.feedback
                                        : submission?.feedback || "";

                                    return (
                                      <HomeworkCompactCard
                                        key={assignment.assignmentId || assignmentIndex}
                                      >
                                        <HomeworkCompactHeader>
                                          <div>
                                            <HomeworkReviewTitle>
                                              {assignment.title ||
                                                t("coursePlayer.homework.assignmentLabel", {
                                                  index: assignmentIndex + 1,
                                                  defaultValue: `Vazifa ${assignmentIndex + 1}`,
                                                })}
                                            </HomeworkReviewTitle>
                                            <HomeworkReviewMeta>
                                              {assignment.description ||
                                                t("teacher.workspace.noTeacherNote", {
                                                  defaultValue: "Izoh kiritilmagan",
                                                })}
                                            </HomeworkReviewMeta>
                                          </div>
                                          <DetailMetricRow>
                                            <DetailMetricPill>
                                              {submission
                                                ? t(
                                                    `coursePlayer.homework.status.${submission.status}`,
                                                    {
                                                      defaultValue:
                                                        submission.status === "reviewed"
                                                          ? "Tekshirilgan"
                                                          : submission.status ===
                                                              "needs_revision"
                                                            ? "Qayta ishlash kerak"
                                                            : "Yuborilgan",
                                                    },
                                                  )
                                                : t("coursePlayer.homework.notSubmitted", {
                                                    defaultValue: "Yuborilmagan",
                                                  })}
                                            </DetailMetricPill>
                                            <ExerciseAnswerToggle
                                              type="button"
                                              $active={false}
                                              onClick={() =>
                                                setSelectedHomeworkReview({
                                                  row: studentModalRow,
                                                  lessonId: lesson.id,
                                                  assignment,
                                                  assignmentIndex,
                                                  submission,
                                                })
                                              }
                                              aria-label="Uyga vazifani ko'rish"
                                              title="Uyga vazifani ko'rish"
                                            >
                                              <Eye size={15} />
                                            </ExerciseAnswerToggle>
                                          </DetailMetricRow>
                                        </HomeworkCompactHeader>

                                        {submission && !collapsed ? (
                                          <HomeworkInlineReviewGrid>
                                            <HomeworkReviewField>
                                              <HomeworkReviewLabel>
                                                {t("coursePlayer.homework.fields.score", {
                                                  defaultValue: "Ball",
                                                })}
                                              </HomeworkReviewLabel>
                                              <HomeworkReviewInput
                                                type="number"
                                                min="0"
                                                max={assignment.maxScore || 100}
                                                value={nextScore}
                                                onChange={(event) =>
                                                  handleHomeworkReviewDraftChange(
                                                    draftKey,
                                                    "score",
                                                    event.target.value,
                                                  )
                                                }
                                                placeholder={`0-${assignment.maxScore || 100}`}
                                              />
                                            </HomeworkReviewField>
                                            <HomeworkReviewField>
                                              <HomeworkReviewLabel>
                                                {t("coursePlayer.homework.fields.feedback", {
                                                  defaultValue: "Izoh / Feedback",
                                                })}
                                              </HomeworkReviewLabel>
                                              <HomeworkReviewTextarea
                                                rows={2}
                                                value={nextFeedback}
                                                onChange={(event) =>
                                                  handleHomeworkReviewDraftChange(
                                                    draftKey,
                                                    "feedback",
                                                    event.target.value,
                                                  )
                                                }
                                                placeholder={t(
                                                  "coursePlayer.homework.fields.feedback",
                                                  {
                                                    defaultValue: "Qisqa izoh yozing",
                                                  },
                                                )}
                                              />
                                            </HomeworkReviewField>
                                          </HomeworkInlineReviewGrid>
                                        ) : null}

                                        {submission && collapsed ? (
                                          <HomeworkReviewSummaryGrid>
                                            <HomeworkReviewSummaryBox>
                                              <HomeworkReviewSummaryLabel>
                                                {t("coursePlayer.homework.fields.score", {
                                                  defaultValue: "Ball",
                                                })}
                                              </HomeworkReviewSummaryLabel>
                                              <HomeworkReviewSummaryValue>
                                                {submission.score === null ||
                                                submission.score === undefined
                                                  ? "—"
                                                  : `${submission.score}/${assignment.maxScore || 100}`}
                                              </HomeworkReviewSummaryValue>
                                            </HomeworkReviewSummaryBox>
                                            <HomeworkReviewSummaryBox>
                                              <HomeworkReviewSummaryLabel>
                                                {t("coursePlayer.homework.fields.feedback", {
                                                  defaultValue: "Izoh / Feedback",
                                                })}
                                              </HomeworkReviewSummaryLabel>
                                              <HomeworkReviewSummaryValue>
                                                {submission.feedback ||
                                                  t("teacher.workspace.noTeacherNote", {
                                                    defaultValue: "Izoh kiritilmagan",
                                                  })}
                                              </HomeworkReviewSummaryValue>
                                            </HomeworkReviewSummaryBox>
                                          </HomeworkReviewSummaryGrid>
                                        ) : null}
                                      </HomeworkCompactCard>
                                    );
                                  })}
                                </HomeworkCompactList>
                              </LessonControlSection>
                            ) : lesson.homeworkLoading ? (
                              <EmptyDetailState>
                                {t("common.loading", {
                                  defaultValue: "Yuklanmoqda...",
                                })}
                              </EmptyDetailState>
                            ) : null}

                            {lesson.exerciseTests?.length ? (
                              <LessonControlSection>
                                <LessonControlTitle>
                                  {t("teacher.workspace.exercise", {
                                    defaultValue: "Mashqlar",
                                  })}
                                </LessonControlTitle>
                                <ExerciseResultList>
                                  {lesson.exerciseTests.map((test, testIndex) => {
                                    const progress = getExerciseProgressForUser(
                                      test,
                                      studentModalRow?.memberId,
                                    );
                                    const percent =
                                      progress?.bestPercent ??
                                      progress?.percent ??
                                      progress?.score ??
                                      null;
                                    const correct =
                                      progress?.correctCount ??
                                      progress?.correct ??
                                      progress?.score ??
                                      null;
                                    const total =
                                      progress?.totalQuestions ??
                                      progress?.total ??
                                      progress?.questionsCount ??
                                      null;
                                    const attempts =
                                      progress?.attemptsCount ??
                                      progress?.attempts ??
                                      progress?.attemptCount ??
                                      null;
                                    const completedAt =
                                      progress?.completedAt ||
                                      progress?.lastAttemptAt ||
                                      progress?.submittedAt ||
                                      progress?.updatedAt ||
                                      null;
                                    const testId =
                                      test.testId ||
                                      test.resourceId ||
                                      test._id ||
                                      test.id ||
                                      "";
                                    const detailKey = `${testId}:${studentModalRow?.memberId}`;
                                    const answersLoading = Boolean(
                                      exerciseAnswerLoading[detailKey],
                                    );

                                    return (
                                      <ExerciseResultCard
                                        key={
                                          test.testId ||
                                          test.resourceId ||
                                          test._id ||
                                          test.id ||
                                          testIndex
                                        }
                                      >
                                        <ExerciseResultHeader>
                                          <ExerciseResultTitle>
                                            {test.title ||
                                              test.name ||
                                              t("teacher.workspace.exercise", {
                                                defaultValue: "Mashq",
                                              })}
                                          </ExerciseResultTitle>
                                          <DetailMetricPill>
                                            {progress
                                              ? t("teacher.workspace.completed", {
                                                  defaultValue: "Ishlangan",
                                                })
                                              : t("teacher.workspace.notCompleted", {
                                                  defaultValue: "Ishlamagan",
                                                })}
                                          </DetailMetricPill>
                                        </ExerciseResultHeader>

                                        {progress ? (
                                          <ExerciseResultGrid>
                                            <ExerciseResultStat>
                                              <ExerciseResultLabel>
                                                {t("teacher.workspace.result", {
                                                  defaultValue: "Natija",
                                                })}
                                              </ExerciseResultLabel>
                                              <ExerciseResultValue>
                                                {percent === null ||
                                                percent === undefined
                                                  ? "—"
                                                  : `${Math.round(Number(percent) || 0)}%`}
                                              </ExerciseResultValue>
                                            </ExerciseResultStat>
                                            <ExerciseResultStat>
                                              <ExerciseResultStatTop>
                                                <ExerciseResultLabel>
                                                  {t("teacher.workspace.correctAnswers", {
                                                    defaultValue: "To'g'ri",
                                                  })}
                                                </ExerciseResultLabel>
                                                {testId ? (
                                                  <ExerciseAnswerToggle
                                                    type="button"
                                                    $active={
                                                      selectedExerciseAnswer?.detailKey ===
                                                      detailKey
                                                    }
                                                    disabled={answersLoading}
                                                    onClick={() =>
                                                      handleExerciseAnswerOpen({
                                                        test,
                                                        testId,
                                                        userId: studentModalRow?.memberId,
                                                      })
                                                    }
                                                    aria-label="Javob kalitlarini ko'rish"
                                                    title="Javob kalitlarini ko'rish"
                                                  >
                                                    <Eye size={15} />
                                                  </ExerciseAnswerToggle>
                                                ) : null}
                                              </ExerciseResultStatTop>
                                              <ExerciseResultValue>
                                                {correct === null || correct === undefined
                                                  ? "—"
                                                  : total === null || total === undefined
                                                    ? correct
                                                    : `${correct}/${total}`}
                                              </ExerciseResultValue>
                                            </ExerciseResultStat>
                                            <ExerciseResultStat>
                                              <ExerciseResultLabel>
                                                {t("teacher.workspace.attempts", {
                                                  defaultValue: "Urinishlar",
                                                })}
                                              </ExerciseResultLabel>
                                              <ExerciseResultValue>
                                                {attempts === null || attempts === undefined
                                                  ? "—"
                                                  : attempts}
                                              </ExerciseResultValue>
                                            </ExerciseResultStat>
                                            <ExerciseResultStat>
                                              <ExerciseResultLabel>
                                                {t("teacher.workspace.lastAttempt", {
                                                  defaultValue: "Oxirgi urinish",
                                                })}
                                              </ExerciseResultLabel>
                                              <ExerciseResultValue>
                                                {completedAt
                                                  ? formatDateTime(completedAt)
                                                  : "—"}
                                              </ExerciseResultValue>
                                            </ExerciseResultStat>
                                          </ExerciseResultGrid>
                                        ) : (
                                          <HomeworkSubmissionBody>
                                            {t("teacher.workspace.exerciseNotWorked", {
                                              defaultValue:
                                                "Bu mashq bo'yicha natija hali yo'q.",
                                            })}
                                          </HomeworkSubmissionBody>
                                        )}
                                      </ExerciseResultCard>
                                    );
                                  })}
                                </ExerciseResultList>
                              </LessonControlSection>
                            ) : null}

                            {!collapsed ? (
                              <MasterySaveRow>
                                <InlinePrimaryButton
                                  type="button"
                                  disabled={saving}
                                  onClick={() =>
                                    handleStudentMasterySave(studentModalRow, lesson)
                                  }
                                >
                                  {saving
                                    ? t("common.saving")
                                    : t("common.save", {
                                        defaultValue: "Saqlash",
                                      })}
                                </InlinePrimaryButton>
                              </MasterySaveRow>
                            ) : null}
                          </DetailLessonCard>
                        );
                      })}
                    </DetailLessonList>
                  ) : (
                    <EmptyDetailState>
                      {t("teacher.workspace.noLessonsYet", {
                        defaultValue: "Darslar hali yo'q",
                      })}
                    </EmptyDetailState>
                  )}
                </StudentModalSection>
              ) : null}
            </StudentModalBody>
          </StudentModalPanel>
        </StudentModalOverlay>
      ) : null}
    </Shell>
  );
}
