import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  Copy,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useCourses } from "../contexts/CoursesContext";
import { useChats } from "../contexts/ChatsContext";
import useAuthStore from "../store/authStore";
import ConfirmDialog from "../shared/ui/dialogs/ConfirmDialog";

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

const Shell = styled.div`
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  min-height: var(--app-height, 100dvh);
  background: var(--background-color);
  padding: 18px;

  @media (max-width: 900px) {
    padding: 12px;
  }
`;

const Layout = styled.div`
  min-height: calc(var(--app-height, 100dvh) - 36px);
  width: 100%;
  display: grid;
  grid-template-columns: 268px minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
  min-width: 0;
`;

const Panel = styled.div`
  width: 100%;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  min-height: 0;
  height: calc(100vh - 36px);
  overflow: hidden;
`;

const Sidebar = styled(Panel)`
  background: transparent;
  border: none;
  border-radius: 0;
  overflow: visible;
  min-height: 100%;
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
`;

const SidebarDivider = styled.div`
  height: 1px;
  background: var(--border-color);
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const BrandIdentity = styled.div`
  display: flex;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  justify-self: stretch;
`;

const MainScroll = styled.div`
  flex: 1;
  min-height: 0;
  padding: 18px;
  overflow-y: auto;
  display: grid;
  gap: 16px;

  @media (max-width: 900px) {
    padding: 14px;
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

const StatCard = styled.div`
  padding: 14px;
  border-radius: 18px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  display: grid;
  gap: 6px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

const StatValue = styled.div`
  font-size: 26px;
  font-weight: 900;
  line-height: 1;
  color: var(--text-color);
`;

const StatSub = styled.div`
  font-size: 12px;
  color: var(--text-secondary-color);
`;

const SectionCard = styled.div`
  padding: 18px;
  border-radius: 22px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  display: grid;
  gap: 14px;
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
  font-size: 30px;
  line-height: 1.05;
  font-weight: 900;
  color: var(--text-color);

  @media (max-width: 720px) {
    font-size: 24px;
  }
`;

const PageDescription = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
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
  gap: 16px;
  min-height: 0;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

const Stack = styled.div`
  display: grid;
  gap: 12px;
  min-height: 0;
`;

const FillPane = styled.div`
  min-width: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
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
  background: ${({ $active }) =>
    $active
      ? "color-mix(in srgb, var(--primary-color) 8%, var(--background-color))"
      : "var(--background-color)"};
  border-radius: 18px;
  padding: 14px;
  text-align: left;
  display: grid;
  gap: 10px;
  cursor: pointer;

  &:hover {
    border-color: var(--primary-color);
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
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`;

const MiniStat = styled.div`
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  border-radius: 14px;
  padding: 10px;
  display: grid;
  gap: 4px;
`;

const MiniLabel = styled.div`
  font-size: 11px;
  color: var(--text-muted-color);
`;

const MiniValue = styled.div`
  font-size: 15px;
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-self: start;
`;

const StudentTableHeader = styled.div`
  flex: 0 0 auto;
  min-width: 0;
  overflow: hidden;
  padding: 12px 18px;
  border-bottom: 1px solid var(--border-color);
  display: grid;
  gap: 8px;
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
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex-wrap: wrap;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: stretch;
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
  flex: 1 1 360px;
  max-width: 100%;
  min-width: 220px;
`;

const StudentFilterSelect = styled.select`
  flex: 0 0 240px;
  height: 44px;
  min-width: 200px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  cursor: pointer;

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
`;

const StudentTableGrid = styled.div`
  min-width: 1020px;
  display: grid;
`;

const StudentTableHeadRow = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 1.6fr) minmax(240px, 1.45fr) 150px 180px 140px 140px;
  gap: 18px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--secondary-color) 55%, transparent);
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
`;

const StudentTableRow = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(280px, 1.6fr) minmax(240px, 1.45fr) 150px 180px 140px 140px;
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
`;

const StudentCell = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
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

const StudentName = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StudentSubline = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const CourseCellTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CourseCellSub = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const DateCellText = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary-color);
`;

const TableEmptyState = styled.div`
  padding: 28px 18px;
  font-size: 14px;
  color: var(--text-muted-color);
`;

const CourseTableGrid = styled.div`
  min-width: 980px;
  display: grid;
`;

const CourseTableHeadRow = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 1.7fr) 170px 120px 130px 130px 140px 76px;
  gap: 18px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--secondary-color) 55%, transparent);
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
`;

const CourseTableCell = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
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

const CourseIdentityTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CourseIdentitySub = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
`;

const StudentModalPanel = styled.div`
  width: min(100%, 980px);
  max-height: min(92vh, 980px);
  overflow: auto;
  border-radius: 28px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.24);
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const StudentModalPrimaryAction = styled.button`
  height: 56px;
  border-radius: 18px;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 15px;
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
  min-width: 860px;
  display: grid;
`;

const LessonMasteryHead = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 1.6fr) 130px 130px 130px 140px 120px;
  gap: 16px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--secondary-color) 55%, transparent);
`;

const LessonMasteryRow = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 1.6fr) 130px 130px 130px 140px 120px;
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
  gap: 6px;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  font-size: 12px;
  font-weight: 700;
`;

const ApprovalCard = styled.div`
  padding: 14px;
  border-radius: 18px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  display: grid;
  gap: 10px;
`;

const ApprovalActions = styled.div`
  display: flex;
  
  flex-wrap: wrap;
  gap: 8px;
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

const MasteryEditorGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 140px) minmax(0, 1fr) auto;
  gap: 12px;
  align-items: end;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
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
  min-height: 46px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  color: var(--text-color);
  padding: 0 14px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FieldTextarea = styled.textarea`
  width: 100%;
  min-height: 56px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  color: var(--text-color);
  padding: 10px 14px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
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

const NAV_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard },
  { id: "courses", icon: BookOpen },
  { id: "students", icon: Users },
  { id: "attendance", icon: ClipboardCheck },
  { id: "mastery", icon: GraduationCap },
];

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

const getHomeworkAssignments = (lesson) =>
  (Array.isArray(lesson?.homework) ? lesson.homework : []).filter(
    (assignment) => assignment?.enabled !== false,
  );

const getHomeworkSubmissionForUser = (assignment, userId) =>
  (assignment?.submissions || []).find(
    (item) => String(getEntityId(item?.userId || item)) === String(userId || ""),
  );

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
    patchCourseLesson,
    joinCourseRoom,
    leaveCourseRoom,
  } = useCourses();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [coursesMenuExpanded, setCoursesMenuExpanded] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStudentCourseFilter, setSelectedStudentCourseFilter] = useState(
    "all",
  );
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedStudentRow, setSelectedStudentRow] = useState(null);
  const [selectedAttendanceRow, setSelectedAttendanceRow] = useState(null);
  const [selectedMasteryRow, setSelectedMasteryRow] = useState(null);
  const [selectedMasteryLessonFocusId, setSelectedMasteryLessonFocusId] = useState(null);
  const [studentModalTab, setStudentModalTab] = useState("overview");
  const [savingAttendanceKey, setSavingAttendanceKey] = useState("");
  const [savingMasteryKey, setSavingMasteryKey] = useState("");
  const [masteryDrafts, setMasteryDrafts] = useState({});
  const [studentMasteryDrafts, setStudentMasteryDrafts] = useState({});
  const [collapsedMasteryLessons, setCollapsedMasteryLessons] = useState({});
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
  }, [loading, selectedCourseId, teacherCourses]);

  useEffect(() => {
    if (!selectedCourseId) {
      setSelectedLessonId(null);
    }
  }, [selectedCourseId]);

  useEffect(() => {
    if (activeSection === "courses") {
      setCoursesMenuExpanded(true);
    }
  }, [activeSection]);

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
      selectedAttendanceRow &&
      !teacherCourses.some(
        (course) => getCourseId(course) === getCourseId(selectedAttendanceRow.course),
      )
    ) {
      setSelectedAttendanceRow(null);
    }
  }, [selectedAttendanceRow, teacherCourses]);

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
      return;
    }

    const nextDrafts = {};
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
    });
    setStudentMasteryDrafts(nextDrafts);
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
          };
        }),
      ),
    [filteredStudents, t],
  );

  const courseFilteredStudentRows = useMemo(() => {
    if (selectedStudentCourseFilter === "all") {
      return filteredStudentRows;
    }

    return filteredStudentRows.filter(
      (row) =>
        getCourseId(row.course) === String(selectedStudentCourseFilter || ""),
    );
  }, [filteredStudentRows, selectedStudentCourseFilter]);

  const filteredStudentCount = useMemo(
    () => new Set(courseFilteredStudentRows.map((row) => row.studentId)).size,
    [courseFilteredStudentRows],
  );

  const attendanceRows = useMemo(
    () =>
      courseFilteredStudentRows.map((row) => ({
        ...row,
        ...getAttendanceSummary(row.course, row.memberId),
      })),
    [courseFilteredStudentRows],
  );

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

  const selectedAttendanceLessonRows = useMemo(() => {
    if (!selectedAttendanceRow?.course) return [];

    return getDisplayLessons(selectedAttendanceRow.course).map((lesson, index) => {
      const lessonId = getLessonId(lesson) || `${selectedAttendanceRow.id}-attendance-${index}`;
      const attendanceRecord = getMemberAttendanceRecord(
        lesson,
        selectedAttendanceRow.memberId,
      );
      const progressPercent = Math.max(
        0,
        Math.min(100, Number(attendanceRecord?.progressPercent || 0)),
      );

      return {
        id: lessonId,
        index,
        title: lesson.title || `${index + 1}-dars`,
        description: (lesson.description || "").trim(),
        status: attendanceRecord?.status || "unmarked",
        progressPercent,
        watchedLabel:
          progressPercent > 0
            ? `${progressPercent}% progress`
            : t("teacher.workspace.noActivityYet", {
                defaultValue: "Faollik hali yo'q",
              }),
        markedAt: attendanceRecord?.markedAt || attendanceRecord?.lastWatchedAt || null,
      };
    });
  }, [selectedAttendanceRow, t]);

  const selectedStudentAttendanceLessonRows = useMemo(() => {
    if (!selectedStudentRow?.course) return [];

    return getDisplayLessons(selectedStudentRow.course).map((lesson, index) => {
      const lessonId = getLessonId(lesson) || `${selectedStudentRow.id}-student-attendance-${index}`;
      const attendanceRecord = getMemberAttendanceRecord(
        lesson,
        selectedStudentRow.memberId,
      );
      const progressPercent = Math.max(
        0,
        Math.min(100, Number(attendanceRecord?.progressPercent || 0)),
      );

      return {
        id: lessonId,
        index,
        title: lesson.title || `${index + 1}-dars`,
        description: (lesson.description || "").trim(),
        status: attendanceRecord?.status || "unmarked",
        progressPercent,
        watchedLabel:
          progressPercent > 0
            ? `${progressPercent}% progress`
            : t("teacher.workspace.noActivityYet", {
                defaultValue: "Faollik hali yo'q",
              }),
        markedAt: attendanceRecord?.markedAt || attendanceRecord?.lastWatchedAt || null,
      };
    });
  }, [selectedStudentRow, t]);

  const selectedStudentAttendanceSummary = useMemo(
    () =>
      selectedStudentRow?.course
        ? getAttendanceSummary(selectedStudentRow.course, selectedStudentRow.memberId)
        : {
            attendancePercent: 0,
            completedLessons: 0,
            totalLessons: 0,
            activeLessons: 0,
          },
    [selectedStudentRow],
  );

  const selectedMasteryLessonRows = useMemo(() => {
    if (!selectedMasteryRow?.course) return [];

    const rows = getDisplayLessons(selectedMasteryRow.course).map((lesson, index) => {
      const lessonId = getLessonId(lesson) || `${selectedMasteryRow.id}-mastery-${index}`;
      const homework = getHomeworkLessonSummary(lesson, selectedMasteryRow.memberId);
      const exercise = getExerciseLessonSummary(lesson, selectedMasteryRow.memberId);
      const oral = getLessonOralAssessmentForUser(lesson, selectedMasteryRow.memberId);
      const draft = masteryDrafts[lessonId] || {};
      const isGraded = hasSavedOralAssessment(oral);

      return {
        id: lessonId,
        index,
        title: lesson.title || `${index + 1}-dars`,
        description: (lesson.description || "").trim(),
        homework,
        exercise,
        oralScore:
          draft.score !== undefined
            ? draft.score
            : oral?.score === null || oral?.score === undefined
              ? ""
              : String(oral.score),
        oralNote:
          draft.note !== undefined ? draft.note : oral?.note || "",
        isGraded,
        updatedAt: oral?.updatedAt || oral?.createdAt || null,
      };
    });

    if (!selectedMasteryLessonFocusId) {
      return rows;
    }

    return rows.filter((lesson) => lesson.id === String(selectedMasteryLessonFocusId));
  }, [masteryDrafts, selectedMasteryLessonFocusId, selectedMasteryRow]);

  const selectedStudentMasteryLessonRows = useMemo(() => {
    if (!selectedStudentRow?.course) return [];

    return getDisplayLessons(selectedStudentRow.course).map((lesson, index) => {
      const lessonId = getLessonId(lesson) || `${selectedStudentRow.id}-student-mastery-${index}`;
      const homework = getHomeworkLessonSummary(lesson, selectedStudentRow.memberId);
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
        exercise,
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
  }, [selectedStudentRow, studentMasteryDrafts]);

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

    return masteryRows
      .filter((row) => getCourseId(row.course) === getCourseId(selectedCourse))
      .map((row) => {
        const homework = getHomeworkLessonSummary(
          selectedLessonContent,
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

        return {
          ...row,
          homework,
          exercise,
          oralScore:
            oral?.score === null || oral?.score === undefined
              ? "—"
              : `${oral.score}/100`,
          oralSaved: hasSavedOralAssessment(oral),
        };
      });
  }, [masteryRows, selectedCourse, selectedLessonContent]);

  const handleApprove = useCallback(
    async (courseId, userId) => {
      try {
        await approveUser(courseId, userId);
        toast.success(t("teacher.students.approved"));
      } catch {
        toast.error(t("teacher.students.approveError"));
      }
    },
    [approveUser, t],
  );

  const handleRemoveStudent = useCallback(
    async (courseId, userId) => {
      if (!window.confirm(t("teacher.students.confirmRemove"))) {
        return;
      }

      try {
        await removeUser(courseId, userId);
        toast.success(t("teacher.students.remove"));
      } catch {
        toast.error(t("teacher.students.removeError"));
      }
    },
    [removeUser, t],
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
      }
    } catch {
      toast.error(t("teacher.courses.deleteError"));
    } finally {
      setIsDeletingCourse(false);
    }
  }, [courseToDelete, removeCourse, selectedCourseId, t]);

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

  const handleAttendanceStatusSave = useCallback(
    async (row, lessonId, status) => {
      if (!row?.course || !row.memberId || !lessonId) return;

      const courseId = getCourseId(row.course);
      const saveKey = `${row.memberId}-${lessonId}`;
      setSavingAttendanceKey(saveKey);

      try {
        await setLessonAttendanceStatus(courseId, lessonId, row.memberId, status);
        setSelectedAttendanceRow((prev) => {
          if (!prev || prev.id !== row.id) return prev;

          const nextCourse = patchLessonAttendanceStatus(
            prev.course,
            lessonId,
            row.memberId,
            status,
          );

          return {
            ...prev,
            course: nextCourse,
            ...getAttendanceSummary(nextCourse, row.memberId),
          };
        });
        setSelectedStudentRow((prev) => {
          if (!prev || prev.id !== row.id) return prev;

          const nextCourse = patchLessonAttendanceStatus(
            prev.course,
            lessonId,
            row.memberId,
            status,
          );

          return {
            ...prev,
            course: nextCourse,
            ...getAttendanceSummary(nextCourse, row.memberId),
            ...getMasterySummary(nextCourse, row.memberId),
          };
        });
        await fetchCourses();
        toast.success(
          t("teacher.workspace.attendanceSaved", {
            defaultValue: "Davomat saqlandi",
          }),
        );
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            t("teacher.workspace.attendanceSaveError", {
              defaultValue: "Davomatni saqlab bo'lmadi",
            }),
        );
      } finally {
        setSavingAttendanceKey("");
      }
    },
    [fetchCourses, setLessonAttendanceStatus, t],
  );

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
    async (row, lessonId) => {
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

      const saveKey = `${row.memberId}-${lessonId}`;
      setSavingMasteryKey(saveKey);

      try {
        const attendanceStatus = score === 0 ? "absent" : "present";
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
        setSelectedAttendanceRow((prev) => {
          if (!prev || prev.id !== row.id) return prev;

          const nextCourse = patchLessonAttendanceStatus(
            prev.course,
            lessonId,
            row.memberId,
            attendanceStatus,
          );

          return {
            ...prev,
            course: nextCourse,
            ...getAttendanceSummary(nextCourse, row.memberId),
          };
        });
        setMasteryDrafts((prev) => ({
          ...prev,
          [lessonId]: {
            score: score === null ? "" : String(score),
            note: draft.note || "",
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
      masteryDrafts,
      patchCourseLesson,
      setLessonAttendanceStatus,
      setLessonOralAssessment,
      t,
    ],
  );

  const handleStudentMasterySave = useCallback(
    async (row, lessonId) => {
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
    },
    [teacherCourses],
  );

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
          <StatLabel>{t("teacher.stats.courses")}</StatLabel>
          <StatValue>{teacherCourses.length}</StatValue>
          <StatSub>{t("teacher.stats.managedCourses")}</StatSub>
        </StatCard>
        <StatCard>
          <StatLabel>{t("teacher.stats.students")}</StatLabel>
          <StatValue>{totalStudents}</StatValue>
          <StatSub>{t("teacher.stats.approved")}</StatSub>
        </StatCard>
        <StatCard>
          <StatLabel>{t("teacher.stats.lessons")}</StatLabel>
          <StatValue>{totalLessons}</StatValue>
          <StatSub>{t("teacher.stats.published")}</StatSub>
        </StatCard>
        <StatCard>
          <StatLabel>{t("teacher.stats.pending")}</StatLabel>
          <StatValue>{totalPending}</StatValue>
          <StatSub>{t("teacher.stats.awaitingApproval")}</StatSub>
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
                <div>
                  <CardTitle>{member.name || member.username || t("common.userFallback")}</CardTitle>
                  <CardMeta>{course.title || course.name}</CardMeta>
                </div>
                <ApprovalActions>
                  <PrimaryButton
                    type="button"
                    onClick={() => handleApprove(getCourseId(course), memberId)}
                  >
                    <Check size={14} />
                    {t("teacher.students.approve")}
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
                      "Kursni tanlang va shu sahifaning o‘zida uning barcha darslarini boshqaring. Endi alohida modal ishlatilmaydi.",
                  })}
                </StudentTableSubtitle>
              </StudentTableInfo>

              <PrimaryButton type="button" onClick={openCourseLessonCreator}>
                <Plus size={15} />
                {t("teacher.workspace.addLesson", {
                  defaultValue: "Yangi dars qo'shish",
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

                    <CourseTableCell>
                      <DateCellText>
                        {(lesson.description || "").trim() ||
                          t("teacher.workspace.lessonDescriptionFallback", {
                            defaultValue: "Bu dars uchun tavsif kiritilmagan.",
                          })}
                      </DateCellText>
                    </CourseTableCell>

                    <CourseTableCell>
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

                    <CourseTableCell>
                      <CourseMetricText>{lessonMediaCount}</CourseMetricText>
                    </CourseTableCell>

                    <CourseTableCell>
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
          <StudentTableGrid>
            <StudentTableHeadRow>
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

                return (
                  <StudentTableRow
                    key={row.id}
                    type="button"
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

                    <StudentCell>
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

                    <StudentCell>
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

                    <StudentCell>
                      <DateCellText>{row.currentLessonTitle || "—"}</DateCellText>
                    </StudentCell>

                    <StudentCell>
                      <TariffPill>{row.tariffLabel}</TariffPill>
                    </StudentCell>

                    <StudentCell>
                      <DateCellText>{formatShortDate(row.joinedAt)}</DateCellText>
                    </StudentCell>
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

  const renderAttendance = () => (
    <FillPane>
      <StudentTableCard>
        <StudentTableHeader>
          <StudentTableToolbar>
            <StudentTableInfo>
              <StudentTableTitle>{t("teacher.nav.attendance")}</StudentTableTitle>
              <StudentTableSubtitle>
                {t("teacher.workspace.attendanceSubtitle", {
                  defaultValue:
                    "Har bir o'quvchining kurslar bo'yicha davomat holati, faol darslari va oxirgi faolligi shu yerda ko'rinadi.",
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
          <StudentTableGrid>
            <StudentTableHeadRow>
              <StudentTableHeadCell>
                {t("teacher.nav.attendance")}
                <StudentCountBadge>{attendanceRows.length}</StudentCountBadge>
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.table.course", {
                  defaultValue: "Kurs",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.attendanceRate", {
                  defaultValue: "Davomat",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.attendedLessons", {
                  defaultValue: "Qatnashgan darslar",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.lastActivity", {
                  defaultValue: "Oxirgi faollik",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("createCourse.accessType", {
                  defaultValue: "Tarif",
                })}
              </StudentTableHeadCell>
            </StudentTableHeadRow>

            <StudentTableBody>
              {attendanceRows.map((row) => {
                const studentInitial = getInitials(row.name);
                const courseLabel = row.course.title || row.course.name;
                const courseInitial = (courseLabel || "?").charAt(0).toUpperCase();

                return (
                  <StudentTableRow
                    key={`attendance-${row.id}`}
                    type="button"
                    onClick={() => {
                      setSelectedAttendanceRow(row);
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
                          <StudentSubline>
                            {row.status === "pending"
                              ? t("teacher.students.pending")
                              : t("teacher.students.approved")}
                          </StudentSubline>
                        </StudentMeta>
                      </StudentIdentity>
                    </StudentCell>

                    <StudentCell>
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

                    <StudentCell>
                      <ProgressCell>
                        <ProgressValue>{row.attendancePercent}%</ProgressValue>
                      </ProgressCell>
                    </StudentCell>

                    <StudentCell>
                      <DateCellText>
                        {row.activeLessons}/{row.totalLessons}
                      </DateCellText>
                    </StudentCell>

                    <StudentCell>
                      <DateCellText>{formatShortDate(row.lastActivityAt)}</DateCellText>
                    </StudentCell>

                    <StudentCell>
                      <TariffPill>{row.tariffLabel}</TariffPill>
                    </StudentCell>
                  </StudentTableRow>
                );
              })}

              {!attendanceRows.length ? (
                <TableEmptyState>
                  {t("teacher.workspace.emptyAttendance", {
                    defaultValue:
                      "Davomat ma'lumotlari topilmadi. Kurs yoki qidiruv filtrini o'zgartirib ko'ring.",
                  })}
                </TableEmptyState>
              ) : null}
            </StudentTableBody>
          </StudentTableGrid>
        </StudentTableScroll>
      </StudentTableCard>
    </FillPane>
  );

  const renderMastery = () => (
    <FillPane>
      <StudentTableCard>
        <StudentTableHeader>
          <StudentTableToolbar>
            <StudentTableInfo>
              <StudentTableTitle>{t("teacher.nav.mastery")}</StudentTableTitle>
              <StudentTableSubtitle>
                {t("teacher.workspace.masterySubtitle", {
                  defaultValue:
                    "O'quvchining kurs bo'yicha o'zlashtirish darajasi, tugallangan darslari va o'rtacha progress ko'rsatkichlari shu yerda turadi.",
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
          <StudentTableGrid>
            <StudentTableHeadRow>
              <StudentTableHeadCell>
                {t("teacher.nav.mastery")}
                <StudentCountBadge>{masteryRows.length}</StudentCountBadge>
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.table.course", {
                  defaultValue: "Kurs",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.masteryRate", {
                  defaultValue: "O'zlashtirish",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.completedLessons", {
                  defaultValue: "Tugallangan darslar",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("teacher.workspace.averageProgress", {
                  defaultValue: "O'rtacha progress",
                })}
              </StudentTableHeadCell>
              <StudentTableHeadCell>
                {t("coursePlayer.adminPane.currentLesson", {
                  defaultValue: "Joriy dars",
                })}
              </StudentTableHeadCell>
            </StudentTableHeadRow>

            <StudentTableBody>
              {masteryRows.map((row) => {
                const studentInitial = getInitials(row.name);
                const courseLabel = row.course.title || row.course.name;
                const courseInitial = (courseLabel || "?").charAt(0).toUpperCase();

                return (
                  <StudentTableRow
                    key={`mastery-${row.id}`}
                    type="button"
                    onClick={() => {
                      setSelectedMasteryLessonFocusId(null);
                      setSelectedMasteryRow(row);
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
                          <StudentSubline>{row.tariffLabel}</StudentSubline>
                        </StudentMeta>
                      </StudentIdentity>
                    </StudentCell>

                    <StudentCell>
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

                    <StudentCell>
                      <ProgressCell>
                        <ProgressValue>{row.masteryPercent}%</ProgressValue>
                      </ProgressCell>
                    </StudentCell>

                    <StudentCell>
                      <DateCellText>
                        {row.completedLessons}/{row.totalLessons}
                      </DateCellText>
                    </StudentCell>

                    <StudentCell>
                      <DateCellText>{row.averageProgressPercent}%</DateCellText>
                    </StudentCell>

                    <StudentCell>
                      <DateCellText>{row.currentLessonTitle || "—"}</DateCellText>
                    </StudentCell>
                  </StudentTableRow>
                );
              })}

              {!masteryRows.length ? (
                <TableEmptyState>
                  {t("teacher.workspace.emptyMastery", {
                    defaultValue:
                      "O'zlashtirish ma'lumotlari topilmadi. Kurs yoki qidiruv filtrini o'zgartirib ko'ring.",
                  })}
                </TableEmptyState>
              ) : null}
            </StudentTableBody>
          </StudentTableGrid>
        </StudentTableScroll>
      </StudentTableCard>
    </FillPane>
  );

  return (
    <Shell>
      <Layout>
        <Sidebar>
          <SidebarShell>
            <SidebarMenu>
              <SidebarCard>
                <SidebarCardBody>
                  <BrandRow>
                    <BrandIdentity>
                      <BrandLogo>
                        <Shield size={15} />
                      </BrandLogo>
                      <BrandMeta>
                        <BrandName>{t("teacher.brand")}</BrandName>
                      </BrandMeta>
                    </BrandIdentity>
                  </BrandRow>

                 
                </SidebarCardBody>

                <SidebarDivider />

                <SidebarCardBody>
                  <MenuGroup>
                    <GroupTitle>
                      {t("teacher.workspace.menu", {
                        defaultValue: "Menu",
                      })}
                    </GroupTitle>
                    <NavList>
                      {NAV_ITEMS.map(({ id, icon: Icon }) =>
                        id === "courses" ? (
                          <SidebarCoursesWrap key={id}>
                            <NavButton
                              type="button"
                              $active={activeSection === id}
                              $collapsed={false}
                              onClick={() => {
                                setActiveSection("courses");
                                setCoursesMenuExpanded((prev) => !prev);
                              }}
                            >
                              <Icon size={16} />
                              <NavText>{t(`teacher.nav.${id}`)}</NavText>
                              <NavButtonAside $expanded={coursesMenuExpanded}>
                                <ChevronDown size={15} />
                              </NavButtonAside>
                            </NavButton>

                            <CourseAccordion $expanded={coursesMenuExpanded}>
                              <CourseAccordionInner>
                                {teacherCourses.map((course) => {
                                  const courseId = getCourseId(course);
                                  const isActive =
                                    activeSection === "courses" &&
                                    courseId === String(selectedCourseId || "");

                                  return (
                                    <CourseAccordionItem
                                      key={courseId}
                                      type="button"
                                      $active={isActive}
                                      onClick={() => {
                                        setActiveSection("courses");
                                        setSelectedCourseId(courseId);
                                      }}
                                    >
                                      <CourseAccordionTitle>
                                        {course.title || course.name}
                                      </CourseAccordionTitle>
                                      <CourseAccordionMeta>
                                        {course.lessons?.length || 0}
                                      </CourseAccordionMeta>
                                    </CourseAccordionItem>
                                  );
                                })}

                                <CourseAccordionItem
                                  type="button"
                                  $active={false}
                                  onClick={() => {
                                    setActiveSection("courses");
                                    setCreateOpen(true);
                                  }}
                                >
                                  <CourseAccordionTitle>
                                    {t("teacher.workspace.addCourseMenu", {
                                      defaultValue: "Yangi qo'shish",
                                    })}
                                  </CourseAccordionTitle>
                                  <CourseAccordionMeta>
                                    <Plus size={14} />
                                  </CourseAccordionMeta>
                                </CourseAccordionItem>
                              </CourseAccordionInner>
                            </CourseAccordion>
                          </SidebarCoursesWrap>
                        ) : (
                          <NavButton
                            key={id}
                            type="button"
                            $active={activeSection === id}
                            $collapsed={false}
                            onClick={() => setActiveSection(id)}
                          >
                            <Icon size={16} />
                            <NavText>{t(`teacher.nav.${id}`)}</NavText>
                          </NavButton>
                        ),
                      )}
                    </NavList>
                  </MenuGroup>
                </SidebarCardBody>

                <SidebarDivider />

                <ProfileCard>
                  <ProfileAvatar>
                    {currentUser?.avatar ? (
                      <AvatarImage src={currentUser.avatar} alt={currentUserName} />
                    ) : (
                      currentUserInitial
                    )}
                  </ProfileAvatar>
                  <ProfileMeta>
                    <ProfileName>{currentUserName}</ProfileName>
                    <ProfileSub>
                      {t("teacher.workspace.instructorMode", {
                        defaultValue: "Instructor mode",
                      })}
                    </ProfileSub>
                  </ProfileMeta>
                </ProfileCard>
              </SidebarCard>
            </SidebarMenu>
          </SidebarShell>
        </Sidebar>

        <Main>
          <MainScroll>
            {activeSection === "dashboard" ? renderDashboard() : null}
            {activeSection === "courses" ? renderCourses() : null}
            {activeSection === "students" ? renderStudents() : null}
            {activeSection === "attendance" ? renderAttendance() : null}
            {activeSection === "mastery" ? renderMastery() : null}
          </MainScroll>
        </Main>
      </Layout>

      <Suspense fallback={null}>
        <CreateCourseDialog
          isOpen={createOpen}
          onClose={() => setCreateOpen(false)}
          onCreated={(courseId) => {
            setCreateOpen(false);
            setSelectedCourseId(String(courseId));
            setActiveSection("courses");
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

      <Suspense fallback={null}>
        {selectedCourse && selectedLessonContent ? (
          <StudentModalOverlay onClick={closeLessonContentManager}>
            <LessonContentModalPanel onClick={(event) => event.stopPropagation()}>
              <LessonContentModalHeader>
                <LessonContentModalMeta>
                  <LessonContentModalEyebrow>
                    {t("teacher.workspace.openLessonContent", {
                      defaultValue: "Kontent qo'shish",
                    })}
                  </LessonContentModalEyebrow>
                  <LessonContentModalTitle>
                    {selectedLessonContent.title ||
                      t("teacher.table.lessons", {
                        defaultValue: "Dars",
                      })}
                  </LessonContentModalTitle>
                  <LessonContentModalSubline>
                    {selectedCourse.title || selectedCourse.name}
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
                      key={`${getCourseId(selectedCourse)}-${getLessonId(selectedLessonContent)}`}
                      courseId={getCourseId(selectedCourse)}
                      courseTitle={selectedCourse.title || selectedCourse.name}
                      lesson={selectedLessonContent}
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
                              "Shu dars uchun uyga vazifa, mashq va og'zaki baholarni o'quvchilar kesimida ko'ring.",
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
                                <DateCellText>{row.homework.scoreLabel}</DateCellText>
                              </LessonMasteryCell>

                              <LessonMasteryCell>
                                <DateCellText>{row.exercise.scoreLabel}</DateCellText>
                              </LessonMasteryCell>

                              <LessonMasteryCell>
                                <DateCellText>{row.oralScore}</DateCellText>
                              </LessonMasteryCell>

                              <LessonMasteryCell>
                                <CourseAccessPill>{row.masteryPercent}%</CourseAccessPill>
                              </LessonMasteryCell>

                              <LessonMasteryCell>
                                <LessonMasteryAction
                                  type="button"
                                  onClick={() => {
                                    setSelectedMasteryLessonFocusId(
                                      getLessonId(selectedLessonContent),
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

      {selectedAttendanceRow ? (
        <StudentModalOverlay onClick={() => setSelectedAttendanceRow(null)}>
          <StudentModalPanel onClick={(event) => event.stopPropagation()}>
            <StudentModalHeader>
              <StudentModalTop>
                <StudentModalIdentity>
                  <StudentModalAvatar $seed={selectedAttendanceRow.studentId?.length || 0}>
                    <AvatarImageWithFallback
                      src={selectedAttendanceRow.avatar}
                      alt={selectedAttendanceRow.name}
                    >
                      {getInitials(selectedAttendanceRow.name)}
                    </AvatarImageWithFallback>
                  </StudentModalAvatar>

                  <StudentModalMeta>
                    <StudentModalMetaRow>
                      <span>
                        {selectedAttendanceRow.course.title ||
                          selectedAttendanceRow.course.name}
                      </span>
                      <span>•</span>
                      <StudentModalStatusBadge>
                        <ClipboardCheck size={12} />
                        {selectedAttendanceRow.attendancePercent}%{" "}
                        {t("teacher.workspace.attendanceRate", {
                          defaultValue: "davomat",
                        })}
                      </StudentModalStatusBadge>
                    </StudentModalMetaRow>
                    <StudentModalName>{selectedAttendanceRow.name}</StudentModalName>
                    <StudentModalSubline>
                      {t("teacher.workspace.attendanceModalSubtitle", {
                        defaultValue:
                          "Har bir dars uchun qatnashgan, kechikkan yoki kelmagan statusini shu joydan belgilang.",
                      })}
                    </StudentModalSubline>
                  </StudentModalMeta>
                </StudentModalIdentity>

                <StudentModalClose
                  type="button"
                  onClick={() => setSelectedAttendanceRow(null)}
                >
                  <X size={18} />
                </StudentModalClose>
              </StudentModalTop>
            </StudentModalHeader>

            <StudentModalBody>
              <StudentInfoGrid>
                <StudentInfoCard>
                  <StudentInfoLabel>
                    {t("teacher.workspace.attendedLessons", {
                      defaultValue: "Qatnashgan darslar",
                    })}
                  </StudentInfoLabel>
                  <StudentInfoValue>
                    {selectedAttendanceRow.activeLessons}/{selectedAttendanceRow.totalLessons}
                  </StudentInfoValue>
                </StudentInfoCard>
                <StudentInfoCard>
                  <StudentInfoLabel>
                    {t("teacher.workspace.lastActivity", {
                      defaultValue: "Oxirgi faollik",
                    })}
                  </StudentInfoLabel>
                  <StudentInfoValue>
                    {formatShortDate(selectedAttendanceRow.lastActivityAt)}
                  </StudentInfoValue>
                </StudentInfoCard>
              </StudentInfoGrid>

              <StudentModalSection>
                <StudentModalSectionTitle>
                  {t("teacher.workspace.lessonAttendance", {
                    defaultValue: "Darslar bo'yicha davomat",
                  })}
                </StudentModalSectionTitle>

                {selectedAttendanceLessonRows.length ? (
                  <DetailLessonList>
                    {selectedAttendanceLessonRows.map((lesson) => {
                      const saveKey = `${selectedAttendanceRow.memberId}-${lesson.id}`;
                      const saving = savingAttendanceKey === saveKey;
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
                              <DetailMetricPill>{lesson.watchedLabel}</DetailMetricPill>
                              <DetailMetricPill>
                                {lesson.markedAt
                                  ? formatShortDate(lesson.markedAt)
                                  : t("teacher.workspace.notMarkedYet", {
                                      defaultValue: "Hali belgilanmagan",
                                    })}
                              </DetailMetricPill>
                            </DetailMetricRow>
                          </DetailLessonHeader>

                          <AttendanceStatusGroup>
                            {[
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
                            ].map((option) => (
                              <AttendanceStatusButton
                                key={option.id}
                                type="button"
                                $active={lesson.status === option.id}
                                disabled={saving}
                                onClick={() =>
                                  handleAttendanceStatusSave(
                                    selectedAttendanceRow,
                                    lesson.id,
                                    option.id,
                                  )
                                }
                              >
                                {saving && lesson.status !== option.id
                                  ? t("common.saving")
                                  : option.label}
                              </AttendanceStatusButton>
                            ))}
                          </AttendanceStatusGroup>
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

      {selectedMasteryRow ? (
        <StudentModalOverlay
          onClick={() => {
            setSelectedMasteryLessonFocusId(null);
            setSelectedMasteryRow(null);
          }}
        >
          <StudentModalPanel onClick={(event) => event.stopPropagation()}>
            <StudentModalHeader>
              <StudentModalTop>
                <StudentModalIdentity>
                  <StudentModalAvatar $seed={selectedMasteryRow.studentId?.length || 0}>
                    <AvatarImageWithFallback
                      src={selectedMasteryRow.avatar}
                      alt={selectedMasteryRow.name}
                    >
                      {getInitials(selectedMasteryRow.name)}
                    </AvatarImageWithFallback>
                  </StudentModalAvatar>

                  <StudentModalMeta>
                    <StudentModalMetaRow>
                      <span>
                        {selectedMasteryRow.course.title ||
                          selectedMasteryRow.course.name}
                      </span>
                      <span>•</span>
                      <StudentModalStatusBadge>
                        <GraduationCap size={12} />
                        {selectedMasteryRow.masteryPercent}%{" "}
                        {t("teacher.workspace.masteryRate", {
                          defaultValue: "o'zlashtirish",
                        })}
                      </StudentModalStatusBadge>
                    </StudentModalMetaRow>
                    <StudentModalName>{selectedMasteryRow.name}</StudentModalName>
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
              <StudentInfoGrid>
                <StudentInfoCard>
                  <StudentInfoLabel>
                    {t("teacher.workspace.completedLessons", {
                      defaultValue: "Tugallangan darslar",
                    })}
                  </StudentInfoLabel>
                  <StudentInfoValue>
                    {selectedMasteryRow.completedLessons}/{selectedMasteryRow.totalLessons}
                  </StudentInfoValue>
                </StudentInfoCard>
                <StudentInfoCard>
                  <StudentInfoLabel>
                    {t("teacher.workspace.averageProgress", {
                      defaultValue: "O'rtacha progress",
                    })}
                  </StudentInfoLabel>
                  <StudentInfoValue>
                    {selectedMasteryRow.averageProgress}%
                  </StudentInfoValue>
                </StudentInfoCard>
              </StudentInfoGrid>

              <StudentModalSection>
                <StudentModalSectionTitle>
                  {t("teacher.workspace.lessonGrades", {
                    defaultValue: "Darslar bo'yicha baholash",
                  })}
                </StudentModalSectionTitle>

                {selectedMasteryLessonRows.length ? (
                  <DetailLessonList>
                    {selectedMasteryLessonRows.map((lesson) => {
                      const saveKey = `${selectedMasteryRow.memberId}-${lesson.id}`;
                      const saving = savingMasteryKey === saveKey;
                      const collapsed = collapsedMasteryLessons[lesson.id];
                      const scoreDisplay =
                        lesson.oralScore === "" ? "—" : `${lesson.oralScore}/100`;
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

                          {collapsed ? (
                            <DetailMetricRow>
                              <DetailMetricPill>
                                {t("teacher.workspace.gradedSummary", {
                                  defaultValue: "Baholangan",
                                })}
                              </DetailMetricPill>
                              <DetailMetricPill>
                                {t("teacher.workspace.teacherScoreValue", {
                                  defaultValue: "Baho: {{score}}",
                                  score: scoreDisplay,
                                })}
                              </DetailMetricPill>
                              <InlineSecondaryButton
                                type="button"
                                onClick={() =>
                                  setCollapsedMasteryLessons((prev) => ({
                                    ...prev,
                                    [lesson.id]: false,
                                  }))
                                }
                              >
                                <Pencil size={15} />
                                {t("common.edit", {
                                  defaultValue: "Tahrirlash",
                                })}
                              </InlineSecondaryButton>
                            </DetailMetricRow>
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

                              <InlinePrimaryButton
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                  handleMasterySave(selectedMasteryRow, lesson.id)
                                }
                              >
                                {saving
                                  ? t("common.saving")
                                  : t("common.save", {
                                      defaultValue: "Saqlash",
                                    })}
                              </InlinePrimaryButton>
                            </MasteryEditorGrid>
                          )}
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

      {selectedStudentRow ? (
        <StudentModalOverlay onClick={() => setSelectedStudentRow(null)}>
          <StudentModalPanel onClick={(event) => event.stopPropagation()}>
            <StudentModalHeader>
              <StudentModalTop>
                <StudentModalIdentity>
                  <StudentModalAvatar $seed={selectedStudentRow.studentId?.length || 0}>
                    <AvatarImageWithFallback
                      src={selectedStudentRow.avatar}
                      alt={selectedStudentRow.name}
                    >
                      {getInitials(selectedStudentRow.name)}
                    </AvatarImageWithFallback>
                  </StudentModalAvatar>

                  <StudentModalMeta>
                    <StudentModalMetaRow>
                      <span>
                        ID:{selectedStudentRow.memberId || selectedStudentRow.studentId}
                      </span>
                      <span>•</span>
                      <StudentModalStatusBadge>
                        <RefreshCw size={12} />
                        {selectedStudentRow.status === "pending"
                          ? t("teacher.students.pending")
                          : t("teacher.students.approved")}
                      </StudentModalStatusBadge>
                    </StudentModalMetaRow>
                    <StudentModalName>{selectedStudentRow.name}</StudentModalName>
                    <StudentModalSubline>
                      {selectedStudentRow.joinedAt
                        ? t("teacher.workspace.joinedDate", {
                            date: formatShortDate(selectedStudentRow.joinedAt),
                            defaultValue: `Qo'shilgan ${formatShortDate(
                              selectedStudentRow.joinedAt,
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

              <StudentModalActions>
                <StudentModalPrimaryAction
                  type="button"
                  onClick={handleStudentChatOpen}
                  disabled={isStartingChat}
                >
                  <MessageCircle size={18} />
                  {isStartingChat
                    ? t("common.loading")
                    : t("teacher.workspace.writeToStudent", {
                        defaultValue: "Yozish",
                      })}
                </StudentModalPrimaryAction>

                <StudentModalSecondaryAction
                  type="button"
                  onClick={() => {
                    setSelectedStudentRow(null);
                    openCourseWorkspace(getCourseId(selectedStudentRow.course), {
                      openAdmin: true,
                    });
                  }}
                >
                  <Shield size={18} />
                  {t("teacher.workspace.studentActions", {
                    defaultValue: "Harakatlar",
                  })}
                </StudentModalSecondaryAction>
              </StudentModalActions>
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
                    <StudentModalSectionTitle>
                      {t("teacher.workspace.info", {
                        defaultValue: "Ma'lumot",
                      })}
                    </StudentModalSectionTitle>

                    <StudentInfoGrid>
                      <StudentInfoCard>
                        <StudentInfoLabel>
                          {t("teacher.table.course", {
                            defaultValue: "Mahsulot nomi",
                          })}
                        </StudentInfoLabel>
                        <StudentInfoValue>
                          {selectedStudentRow.course.title || selectedStudentRow.course.name}
                        </StudentInfoValue>
                      </StudentInfoCard>
                      <StudentInfoCard>
                        <StudentInfoLabel>
                          {t("teacher.workspace.joinedAt", {
                            defaultValue: "Kirish muddati",
                          })}
                        </StudentInfoLabel>
                        <StudentInfoValue>
                          {formatShortDate(selectedStudentRow.joinedAt)}
                        </StudentInfoValue>
                      </StudentInfoCard>
                      <StudentInfoCard>
                        <StudentInfoLabel>
                          {t("coursePlayer.adminPane.currentLesson", {
                            defaultValue: "Ishga tushirish",
                          })}
                        </StudentInfoLabel>
                        <StudentInfoValue>
                          {selectedStudentRow.currentLessonTitle || "—"}
                        </StudentInfoValue>
                      </StudentInfoCard>
                      <StudentInfoCard>
                        <StudentInfoLabel>
                          {t("createCourse.accessType", {
                            defaultValue: "Tarif",
                          })}
                        </StudentInfoLabel>
                        <StudentInfoValue>{selectedStudentRow.tariffLabel}</StudentInfoValue>
                      </StudentInfoCard>
                    </StudentInfoGrid>
                  </StudentModalSection>

                  <StudentModalSection>
                    <StudentTimelineHeader>
                      <span>{t("teacher.workspace.allEducation", { defaultValue: "Barcha ta'lim" })}</span>
                      <span>
                        • {selectedStudentRow.progressPercent}% (
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
                                  <StudentLessonFact>
                                    {lesson.watchCount}x
                                  </StudentLessonFact>
                                ) : null}
                                {lesson.lastPositionSeconds > 0 ? (
                                  <StudentLessonFact>
                                    {t("teacher.workspace.lastPoint", {
                                      defaultValue: "Oxirgi nuqta",
                                    })}{" "}
                                    {formatPlaybackTime(lesson.lastPositionSeconds)}
                                  </StudentLessonFact>
                                ) : null}
                                {lesson.maxPositionSeconds > 0 ? (
                                  <StudentLessonFact>
                                    {t("teacher.workspace.furthestPoint", {
                                      defaultValue: "Eng uzoq",
                                    })}{" "}
                                    {formatPlaybackTime(lesson.maxPositionSeconds)}
                                  </StudentLessonFact>
                                ) : null}
                                {lesson.lessonDurationSeconds > 0 ? (
                                  <StudentLessonFact>
                                    {formatPlaybackTime(lesson.lessonDurationSeconds)}
                                  </StudentLessonFact>
                                ) : null}
                              </StudentLessonFacts>

                              {lesson.status === "current" ? (
                                <StudentLessonBadge $status="current">
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
                  <StudentInfoGrid>
                    <StudentInfoCard>
                      <StudentInfoLabel>
                        {t("teacher.workspace.attendanceRate", {
                          defaultValue: "Davomat",
                        })}
                      </StudentInfoLabel>
                      <StudentInfoValue>
                        {selectedStudentAttendanceSummary.attendancePercent}%
                      </StudentInfoValue>
                    </StudentInfoCard>
                    <StudentInfoCard>
                      <StudentInfoLabel>
                        {t("teacher.workspace.attendedLessons", {
                          defaultValue: "Qatnashgan darslar",
                        })}
                      </StudentInfoLabel>
                      <StudentInfoValue>
                        {selectedStudentAttendanceSummary.activeLessons}/
                        {selectedStudentAttendanceSummary.totalLessons}
                      </StudentInfoValue>
                    </StudentInfoCard>
                    <StudentInfoCard>
                      <StudentInfoLabel>
                        {t("teacher.workspace.masteryRate", {
                          defaultValue: "O'zlashtirish",
                        })}
                      </StudentInfoLabel>
                      <StudentInfoValue>
                        {selectedStudentMasterySummary.masteryPercent}%
                      </StudentInfoValue>
                    </StudentInfoCard>
                    <StudentInfoCard>
                      <StudentInfoLabel>
                        {t("teacher.workspace.averageProgress", {
                          defaultValue: "O'rtacha progress",
                        })}
                      </StudentInfoLabel>
                      <StudentInfoValue>
                        {selectedStudentMasterySummary.averageProgress}%
                      </StudentInfoValue>
                    </StudentInfoCard>
                  </StudentInfoGrid>

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
                        const saveKey = `${selectedStudentRow.memberId}-${lesson.id}`;
                        const saving = savingMasteryKey === saveKey;

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
                              </DetailMetricRow>
                            </DetailLessonHeader>

                            <MasteryMetricsGrid>
                              <MasteryMetricCard>
                                <MasteryMetricLabel>
                                  {t("coursePlayer.homework.title", {
                                    defaultValue: "Uyga vazifa",
                                  })}
                                </MasteryMetricLabel>
                                <MasteryMetricValue>{lesson.homework.scoreLabel}</MasteryMetricValue>
                              </MasteryMetricCard>

                              <MasteryMetricCard>
                                <MasteryMetricLabel>
                                  {t("teacher.workspace.exercise", {
                                    defaultValue: "Mashq",
                                  })}
                                </MasteryMetricLabel>
                                <MasteryMetricValue>{lesson.exercise.scoreLabel}</MasteryMetricValue>
                              </MasteryMetricCard>

                              <MasteryMetricCard>
                                <MasteryMetricLabel>
                                  {t("teacher.workspace.teacherScoreLabel", {
                                    defaultValue: "O'qituvchi bahosi",
                                  })}
                                </MasteryMetricLabel>
                                <MasteryMetricValue>
                                  {lesson.oralScoreDisplay}
                                </MasteryMetricValue>
                              </MasteryMetricCard>
                            </MasteryMetricsGrid>

                            <AttendanceStatusGroup>
                              {[
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
                              ].map((option) => (
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
                                  {saving && lesson.attendanceStatus !== option.id
                                    ? t("common.saving")
                                    : option.label}
                                </AttendanceStatusButton>
                              ))}
                            </AttendanceStatusGroup>

                            <MasteryEditorGrid>
                              <FieldGroup>
                                <FieldLabel>
                                  {t("teacher.workspace.teacherScoreLabel", {
                                    defaultValue: "O'qituvchi bahosi",
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

                              <InlinePrimaryButton
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                  handleStudentMasterySave(selectedStudentRow, lesson.id)
                                }
                              >
                                {saving
                                  ? t("common.saving")
                                  : t("common.save", {
                                      defaultValue: "Saqlash",
                                    })}
                              </InlinePrimaryButton>
                            </MasteryEditorGrid>
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
