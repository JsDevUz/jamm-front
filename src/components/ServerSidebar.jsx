import React, { useState } from "react";
import styled from "styled-components";
import {
  LayoutDashboard,
  Users2,
  GraduationCap,
  Settings,
  Video,
  User,
  Star,
} from "lucide-react";
import SettingsDialog from "./SettingsDialog";
import { useChats } from "../contexts/ChatsContext";

const SidebarContainer = styled.div`
  width: 72px;
  height: 100vh;
  background-color: var(--tertiary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  flex-shrink: 0;
  @media (min-width: 769px) {
    overflow-y: auto;
    overflow-x: hidden;
  }
  @media (max-width: 768px) {
    width: 72px;
    justify-content: flex-start;
    overflow-y: auto;
  }
  @media (max-width: 480px) {
    width: 60px;
    padding: 8px 0;
  }
`;

const NavButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: var(--text-secondary-color);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
    transform: scale(1.1);
  }
  ${(p) =>
    p.active &&
    `background-color: var(--primary-color); color: white; border-radius: 50%;`}
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    margin-right: 0;
    flex-shrink: 0;
  }
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-bottom: 6px;
  }
`;

const Divider = styled.div`
  height: 2px;
  width: 20px;
  background-color: var(--border-color);
  margin: 8px 16px;
  border-radius: 1px;
  @media (max-width: 768px) {
    width: 32px;
    height: 1px;
    margin: 8px 0;
  }
`;

const navItems = [
  { id: "home", icon: LayoutDashboard, label: "Dashboard" },
  { id: "users", icon: User, label: "Foydalanuvchilar" },
  { id: "groups", icon: Users2, label: "Guruhlar" },
  { id: "meets", icon: Video, label: "Video Meetlar" },
  { id: "courses", icon: GraduationCap, label: "Kurslar" },
];

const ServerSidebar = ({ onSelectNav, onOpenSettings, onOpenPremium }) => {
  const { selectedNav, setSelectedNav } = useChats();

  // Use either the passed onSelectNav or the context-based setSelectedNav
  const handleNav = (id) => {
    if (onSelectNav) {
      onSelectNav(id);
    } else {
      setSelectedNav(id);
    }
  };

  return (
    <>
      <SidebarContainer>
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            active={selectedNav === item.id}
            onClick={() => handleNav(item.id)}
            title={item.label}
          >
            <item.icon size={20} />
          </NavButton>
        ))}

        <Divider />

        <NavButton title="Premium" onClick={onOpenPremium}>
          <Star size={20} color="#ffaa00" fill="#ffaa00" />
        </NavButton>

        <NavButton title="Sozlamalar" onClick={onOpenSettings}>
          <Settings size={20} />
        </NavButton>
      </SidebarContainer>
    </>
  );
};

export default ServerSidebar;
