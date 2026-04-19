import React from "react";
import { MdSchool, MdAdminPanelSettings } from "react-icons/md";
import { PiArticleMediumFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { useChats } from "../../contexts/ChatsContext";
import useAuthStore from "../../store/authStore";
import {
  AdminSolidIcon,
  FeedSolidIcon,
} from "../../shared/ui/icons/NavSolidIcons";
import {
  AvatarButton,
  AvatarFallback,
  AvatarImage,
  IconSlot,
  NavBadge,
  NavButton,
  NavLabel,
  ProfileAvatarWrap,
  ProfileStatusDot,
  SidebarContainer,
  SidebarHeader,
  SidebarTitle,
  Spacer,
} from "./styles/ServerSidebar.styles";

import {FaFire} from "react-icons/fa";
import {GoHomeFill} from "react-icons/go";
import {HiMiniChatBubbleLeftRight} from "react-icons/hi2";
const baseNavItems = [
  { id: "home", icon: GoHomeFill, labelKey: "navigation.home" },
  { id: "feed", icon: FaFire, labelKey: "navigation.feed" },
  { id: "chats", icon: HiMiniChatBubbleLeftRight, labelKey: "navigation.chats" },
  { id: "articles", icon: PiArticleMediumFill, labelKey: "navigation.articles" },
  { id: "courses", icon: MdSchool, labelKey: "navigation.courses" },
];

export default function ServerSidebarExpanded({ onSelectNav, onPreloadNav }) {
  const { t } = useTranslation();
  const { chats, selectedNav, setSelectedNav } = useChats();
  const currentUser = useAuthStore((state) => state.user);

  const totalUnreadCount = chats.reduce(
    (total, chat) => total + Math.max(0, Number(chat.unread) || 0),
    0,
  );

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
  const navItems =
    currentUser?.officialBadgeKey === "ceo"
      ? [
          ...baseNavItems,
          { id: "admin", icon: MdAdminPanelSettings, labelKey: "navigation.admin" },
        ]
      : baseNavItems;

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarTitle>
          {t("teacher.workspace.menu", {
            defaultValue: "Menu",
          })}
        </SidebarTitle>
      </SidebarHeader>

      {navItems.map((item) => {
        const active =
          item.id === "chats"
            ? ["chats", "users", "groups", "meets"].includes(selectedNav)
            : selectedNav === item.id;

        return (
          <NavButton
            key={item.id}
            $active={active}
            onClick={() => handleNav(item.id)}
            onMouseEnter={() => onPreloadNav && onPreloadNav(item.id)}
            data-tooltip={t(item.labelKey)}
          >
            <IconSlot $active={active}>
              <item.icon size={20} />
              {item.id === "chats" && totalUnreadCount > 0 ? (
                <NavBadge>{totalUnreadCount}</NavBadge>
              ) : null}
            </IconSlot>
            <NavLabel $active={active}>
              {t(item.labelKey)}
            </NavLabel>
          </NavButton>
        );
      })}

      <Spacer />

      <AvatarButton
        data-tour="nav-profile"
        $active={selectedNav === "profile"}
        $premium={isPremium}
        onClick={() => handleNav("profile")}
        onMouseEnter={() => onPreloadNav && onPreloadNav("profile")}
        data-tooltip={`${displayName} — ${t("navigation.profile")}`}
      >
        <IconSlot $active={selectedNav === "profile"}>
          <ProfileAvatarWrap>
            {currentUser?.avatar ? (
              <AvatarImage src={currentUser.avatar} alt={displayName} />
            ) : (
              <AvatarFallback>{avatarLetter}</AvatarFallback>
            )}
            <ProfileStatusDot />
          </ProfileAvatarWrap>
        </IconSlot>
        <NavLabel $active={selectedNav === "profile"}>
          {t("navigation.profile")}
        </NavLabel>
      </AvatarButton>
    </SidebarContainer>
  );
}
