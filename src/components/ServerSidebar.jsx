import React from "react";
import styled from "styled-components";
import {
  Flame,
  MessagesSquare,
  GraduationCap,
  Settings,
  Video,
  Star,
} from "lucide-react";
import { useChats } from "../contexts/ChatsContext";
import useAuthStore from "../store/authStore";

const SidebarContainer = styled.div`
  width: 72px;
  height: 100vh;
  background-color: var(--tertiary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 700px) {
    /* Floating bottom nav */
    position: fixed;
    bottom: 12px;
    left: 14px;
    right: 14px;
    width: auto;
    height: auto;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px 12px;
    border-radius: 20px;
    background: rgba(var(--tertiary-color-rgb, 32, 34, 37), 0.7);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
    z-index: 100;
    overflow: visible;
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
  flex-shrink: 0;

  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
    transform: scale(1.1);
  }

  ${(p) =>
    p.active &&
    `background-color: var(--primary-color); color: white; border-radius: 50%;`}

  @media (max-width: 700px) {
    margin-bottom: 0;
    width: 44px;
    height: 44px;
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

/* ── Spacer to push avatar to the bottom ── */
const Spacer = styled.div`
  flex: 1;

  @media (max-width: 700px) {
    display: none;
  }
`;

/* ── Profile Avatar Button ── */
const AvatarButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid
    ${(p) =>
      p.active
        ? "var(--primary-color)"
        : p.premium
          ? "#faa61a"
          : "var(--border-color)"};
  background: linear-gradient(135deg, #5865f2, #9b59b6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 0;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: ${(p) => (p.active ? "0 0 0 2px rgba(88,101,242,0.4)" : "none")};

  &:hover {
    transform: scale(1.08);
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(88, 101, 242, 0.4);
  }

  @media (max-width: 700px) {
    margin-bottom: 0;
    width: 40px;
    height: 40px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 16px;
    font-weight: 800;
    color: white;
    line-height: 1;
  }
`;

const navItems = [
  { id: "feed", icon: Flame, label: "Gurunglar" },
  { id: "chats", icon: MessagesSquare, label: "Chatlar" },
  { id: "meets", icon: Video, label: "Video Meetlar" },
  { id: "courses", icon: GraduationCap, label: "Kurslar" },
];

const ServerSidebar = ({ onSelectNav, onOpenSettings, onOpenPremium }) => {
  const { selectedNav, setSelectedNav } = useChats();
  const currentUser = useAuthStore((state) => state.user);

  const handleNav = (id) => {
    if (onSelectNav) {
      onSelectNav(id);
    } else {
      setSelectedNav(id);
    }
  };

  const displayName = currentUser?.nickname || currentUser?.username || "U";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const isPremium = currentUser?.premiumStatus === "active";

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

        <Spacer />

        {/* Profile Avatar */}
        <AvatarButton
          active={selectedNav === "profile"}
          premium={isPremium ? 1 : 0}
          onClick={() => handleNav("profile")}
          title={`${displayName} — Profilim`}
        >
          {currentUser?.avatar ? (
            <img src={currentUser.avatar} alt={displayName} />
          ) : (
            <span>{avatarLetter}</span>
          )}
        </AvatarButton>
      </SidebarContainer>
    </>
  );
};

export default ServerSidebar;
