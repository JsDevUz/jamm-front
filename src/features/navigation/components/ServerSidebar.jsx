import React from "react";
import { BookOpen, Flame, GraduationCap, MessagesSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useChats } from "../../../contexts/ChatsContext";
import useAuthStore from "../../../store/authStore";
import {
  AvatarButton,
  AvatarFallback,
  AvatarImage,
  NavButton,
  SidebarContainer,
  Spacer,
} from "../styles/ServerSidebar.styles";

const navItems = [
  { id: "feed", icon: Flame, labelKey: "navigation.feed" },
  { id: "blogs", icon: BookOpen, labelKey: "navigation.blogs" },
  { id: "chats", icon: MessagesSquare, labelKey: "navigation.chats" },
  { id: "courses", icon: GraduationCap, labelKey: "navigation.courses" },
];

export default function ServerSidebar({ onSelectNav }) {
  const { t } = useTranslation();
  const { selectedNav, setSelectedNav } = useChats();
  const currentUser = useAuthStore((state) => state.user);

  const handleNav = (navId) => {
    if (onSelectNav) {
      onSelectNav(navId);
      return;
    }

    setSelectedNav(navId);
  };

  const displayName = currentUser?.nickname || currentUser?.username || "U";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const isPremium = currentUser?.premiumStatus === "active";

  return (
    <SidebarContainer>
      {navItems.map((item) => (
        <NavButton
          key={item.id}
          $active={
            item.id === "chats"
              ? ["chats", "users", "groups", "meets"].includes(selectedNav)
              : selectedNav === item.id
          }
          onClick={() => handleNav(item.id)}
          title={t(item.labelKey)}
        >
          <item.icon size={20} />
        </NavButton>
      ))}

      <Spacer />

      <AvatarButton
        $active={selectedNav === "profile"}
        $premium={isPremium}
        onClick={() => handleNav("profile")}
        title={`${displayName} — ${t("navigation.profile")}`}
      >
        {currentUser?.avatar ? (
          <AvatarImage src={currentUser.avatar} alt={displayName} />
        ) : (
          <AvatarFallback>{avatarLetter}</AvatarFallback>
        )}
      </AvatarButton>
    </SidebarContainer>
  );
}
