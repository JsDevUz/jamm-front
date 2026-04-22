import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Type,
  Users,
} from "lucide-react";
import {
  AvatarButton,
  AvatarFallback,
  AvatarImage,
  IconSlot,
  NavButton,
  NavLabel,
  ProfileAvatarWrap,
  SidebarContainer,
  Spacer,
} from "./styles/ServerSidebar.styles";

const TeacherSidebarShell = styled(SidebarContainer)`
  width: 78px;
  height: 100%;
  min-height: 0;
  border-right: none;
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);

  @media (max-width: 700px) {
    width: 100%;
    min-height: 78px;
    height: auto;
    border-right: 1px solid var(--border-color);
    justify-content: flex-start;
    align-items: stretch;
    gap: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    pointer-events: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    & > button {
      flex: 0 0 auto;
      width: 76px;
      min-width: 76px;
    }
  }
`;

const teacherNavItems = [
  { id: "dashboard", icon: LayoutDashboard, labelKey: "teacher.nav.dashboard", label: "Dashboard" },
  { id: "courses", icon: BookOpen, labelKey: "teacher.nav.courses", label: "Kurslar" },
  { id: "students", icon: Users, labelKey: "teacher.nav.students", label: "O'quvchilar" },
  { id: "attendance", icon: ClipboardCheck, labelKey: "teacher.nav.attendance", label: "Davomat" },
  { id: "mastery", icon: GraduationCap, labelKey: "teacher.nav.mastery", label: "O'zlashtirish" },
  { id: "tests", icon: FileText, labelKey: "teacher.nav.tests", label: "Testlar" },
  { id: "sentenceBuilder", icon: Type, labelKey: "teacher.nav.sentenceBuilder", label: "Gap tuzish" },
];

export default function TeacherSidebarExpanded({
  activeNav,
  onSelectNav,
  displayName,
  avatar,
  onProfileClick,
}) {
  const { t } = useTranslation();
  const avatarLetter = (displayName || "U").charAt(0).toUpperCase();

  return (
    <TeacherSidebarShell>
      {teacherNavItems.map((item) => {
        const active = activeNav === item.id;
        const label = t(item.labelKey, { defaultValue: item.label });
        return (
          <NavButton
            key={item.id}
            $active={active}
            onClick={() => onSelectNav?.(item.id)}
            data-tooltip={label}
            aria-label={label}
            title={label}
          >
            <IconSlot $active={active}>
              <item.icon size={20} />
            </IconSlot>
            <NavLabel $active={active}>{label}</NavLabel>
          </NavButton>
        );
      })}

      <Spacer />

      <AvatarButton
        type="button"
        $active={false}
        $premium={false}
        onClick={onProfileClick}
        data-tooltip={displayName}
        aria-label={displayName}
        title={displayName}
      >
        <IconSlot $active={false}>
          <ProfileAvatarWrap>
            {avatar ? (
              <AvatarImage src={avatar} alt={displayName} />
            ) : (
              <AvatarFallback>{avatarLetter}</AvatarFallback>
            )}
          </ProfileAvatarWrap>
        </IconSlot>
      </AvatarButton>
    </TeacherSidebarShell>
  );
}
