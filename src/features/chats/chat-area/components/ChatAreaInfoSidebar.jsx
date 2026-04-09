import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Bookmark, Edit2, Link2, X } from "lucide-react";
import { toast } from "react-hot-toast";
import ImageLightbox from "../../../../shared/ui/media/ImageLightbox";
import UserNameWithDecoration from "../../../../shared/ui/users/UserNameWithDecoration";
import useChatAreaUiStore from "../store/useChatAreaUiStore";
import { RESOLVED_APP_BASE_URL } from "../../../../config/env";
import {
  mobileFullscreenPane,
  mobileTopSafePadding,
} from "../../../../shared/styles/mobileSafeArea";

const RightSidebar = styled.div`
  width: 350px;
  background-color: var(--secondary-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;

  @media (max-width: 1024px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    box-shadow: -4px 0 16px var(--shadow-color, rgba(0, 0, 0, 0.2));
  }

  @media (max-width: 768px) {
    ${mobileFullscreenPane};
    z-index: 9999;
    animation: slideInFromRight 0.3s ease-out;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const SidebarHeader = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-color);
  ${mobileTopSafePadding(12, 16, 12, 16)};

  @media (max-width: 768px) {
    height: auto;
    min-height: 56px;
  }
`;

const SidebarCloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  height: 20px;

  &:hover {
    color: var(--text-color);
  }
`;

const SidebarTitle = styled.span`
  flex: 1;
  text-align: center;
`;

const SidebarHeaderSpacer = styled.div`
  width: 28px;
`;

const SidebarContent = styled.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

const GroupProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LargeAvatar = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 16px;
  overflow: hidden;
  background: ${(props) => (props.$savedMessages ? "var(--primary-color)" : "var(--primary-color)")};
  cursor: ${(props) => (props.$clickable ? "zoom-in" : "default")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GroupName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  > span {
    justify-content: center;
  }
`;

const GroupStatus = styled.div`
  font-size: 14px;
  color: var(--text-secondary-color);
`;

const GroupInfoCard = styled.div`
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1px solid var(--border-color);
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  text-transform: uppercase;
`;

const InfoValue = styled.div`
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
  word-break: break-word;
`;

const InfoLink = styled.button`
  font-size: 14px;
  color: var(--primary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

const ShowMoreBtn = styled.button`
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 500;
  margin-left: 8px;
  background: transparent;
  border: none;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`;

const SectionTitle = styled.h4`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--text-muted-color);
  margin: 0;
`;

const MembersList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberItem = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  gap: 14px;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background: transparent;
  transition: background-color 0.2s;
  text-align: left;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const MemberAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const AdminBadge = styled.span`
  font-size: 11px;
  color: var(--primary-color);
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: auto;
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--border-color);
  margin: 0 -16px;
`;

const MentionToken = styled.span`
  color: var(--primary-color);
  cursor: pointer;
`;

const UserStatusText = styled.span`
  color: ${(props) =>
    props.$online ? "var(--primary-color)" : "var(--text-muted-color)"};
`;

const UsernameInfoLink = styled(InfoLink)`
  color: var(--primary-color);
  font-weight: 500;
`;

const LinkIcon = styled(Link2)`
  color: ${(props) => props.$muted ? "var(--text-muted-color)" : "var(--primary-color)"};
`;

const MemberMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MemberNameRow = styled.span`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;

  > span {
    min-width: 0;
  }
`;

const MemberStatus = styled.span`
  font-size: 12px;
  color: ${(props) =>
    props.$online ? "var(--primary-color)" : "var(--text-muted-color)"};
`;

const EmptyMembersText = styled.div`
  font-size: 13px;
  color: var(--text-muted-color);
`;

const formatLastSeenLabel = (value) => {
  if (!value) return "Offline";

  const parsed = dayjs(value);
  if (!parsed.isValid()) {
    return "Offline";
  }

  return parsed.isSame(dayjs(), "day")
    ? `Oxirgi marta: ${parsed.format("HH:mm")}`
    : `Oxirgi marta: ${parsed.format("DD.MM HH:mm")}`;
};

const MentionsText = ({ text }) => {
  if (!text) return null;
  const parts = text.split(/(@\w+)/g);

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("@") ? (
          <MentionToken key={index}>
            {part}
          </MentionToken>
        ) : (
          part
        ),
      )}
    </>
  );
};

const ChatAreaInfoSidebar = ({
  currentChat,
  displayChat,
  currentUser,
  onlineCount,
  isUserOnline,
  getUserLastSeen,
  onMemberClick,
  onCopyLink,
  onClose,
}) => {
  const [isAvatarPreviewOpen, setIsAvatarPreviewOpen] = useState(false);
  const isInfoSidebarOpen = useChatAreaUiStore(
    (state) => state.isInfoSidebarOpen,
  );
  const isDescriptionExpanded = useChatAreaUiStore(
    (state) => state.isDescriptionExpanded,
  );
  const closeInfoSidebar = useChatAreaUiStore((state) => state.closeInfoSidebar);
  const openEditGroupDialog = useChatAreaUiStore(
    (state) => state.openEditGroupDialog,
  );
  const toggleDescriptionExpanded = useChatAreaUiStore(
    (state) => state.toggleDescriptionExpanded,
  );

  if (!isInfoSidebarOpen || !currentChat) return null;

  const currentUserId = currentUser?._id || currentUser?.id;
  const myAdminRecord = currentChat.admins?.find(
    (admin) => (admin.userId || admin.id || admin._id) === currentUserId,
  );
  const canEditAnything =
    currentChat.type === "group" &&
    (currentChat.createdBy === currentUserId ||
      (myAdminRecord && myAdminRecord.permissions?.length > 0));

  const otherUser =
    currentChat.type === "user"
      ? currentChat.members?.find((member) => {
          const memberId = member._id || member.id;
          return String(memberId) !== String(currentUserId);
        })
      : null;
  const otherUserId = otherUser?._id || otherUser?.id;
  const otherUserLastSeen =
    (otherUserId ? getUserLastSeen?.(otherUserId) : null) ||
    otherUser?.lastSeen ||
    otherUser?.lastActive ||
    null;

  return (
    <RightSidebar>
      <SidebarHeader>
        <SidebarCloseButton
          onClick={() => {
            if (onClose) {
              onClose();
            } else {
              closeInfoSidebar();
            }
          }}
        >
          <X size={20} />
        </SidebarCloseButton>
        <SidebarTitle>
          {currentChat.type === "user"
            ? "Foydalanuvchi haqida"
            : "Guruh ma'lumotlari"}
        </SidebarTitle>
        {canEditAnything ? (
          <SidebarCloseButton onClick={openEditGroupDialog}>
            <Edit2 size={18} />
          </SidebarCloseButton>
        ) : (
          <SidebarHeaderSpacer />
        )}
      </SidebarHeader>

      <SidebarContent>
        <GroupProfile>
          <LargeAvatar
            $savedMessages={currentChat?.isSavedMessages}
            $clickable={Boolean(currentChat?.avatar?.length > 1)}
            onClick={() => {
              if (currentChat?.avatar?.length > 1) {
                setIsAvatarPreviewOpen(true);
              }
            }}
          >
            {currentChat?.isSavedMessages ? (
              <Bookmark size={40} color="white" fill="white" />
            ) : currentChat?.avatar?.length > 1 ? (
              <img src={currentChat.avatar} alt={currentChat.name} />
            ) : (
              currentChat.name.charAt(0)
            )}
          </LargeAvatar>
          <ImageLightbox
            src={isAvatarPreviewOpen ? currentChat?.avatar : null}
            alt={currentChat?.name}
            onClose={() => setIsAvatarPreviewOpen(false)}
          />
          <GroupName>
            <UserNameWithDecoration
              user={
                currentChat.type === "user" && otherUser
                  ? otherUser
                  : {
                      name: currentChat.name,
                      premiumStatus: currentChat.premiumStatus,
                      selectedProfileDecorationId:
                        currentChat.selectedProfileDecorationId,
                      customProfileDecorationImage:
                        currentChat.customProfileDecorationImage,
                    }
              }
              fallback={currentChat.name}
              size="lg"
            />
          </GroupName>
          <GroupStatus>
            {currentChat.type === "user" ? (
              otherUser ? (
                otherUser.isOfficialProfile ? (
                  <UserStatusText $online={false}>
                    {otherUser.officialBadgeLabel || "Rasmiy"}
                  </UserStatusText>
                ) : (
                  <UserStatusText
                    $online={isUserOnline(otherUserId)}
                  >
                    {isUserOnline(otherUserId)
                      ? "Online"
                      : formatLastSeenLabel(otherUserLastSeen)}
                  </UserStatusText>
                )
              ) : null
            ) : (
              <>
                {currentChat.members?.length || 0} a'zo
                {onlineCount > 0 && ` · ${onlineCount} online`}
              </>
            )}
          </GroupStatus>
        </GroupProfile>

        {currentChat.type === "user" && !currentChat?.isSavedMessages && otherUser && (
          <GroupInfoCard>
            <InfoItem>
              <InfoLabel>foydalanuvchi nomi</InfoLabel>
              <UsernameInfoLink
                onClick={() => {
                  if (otherUser.username) {
                    navigator.clipboard.writeText(`@${otherUser.username}`);
                    toast.success("Nusxa olindi!");
                  }
                }}
              >
                <span>@{otherUser.username || "user"}</span>
                <LinkIcon size={20} />
              </UsernameInfoLink>
            </InfoItem>

            {otherUser.bio && (
              <>
                <Divider />
                <InfoItem>
                  <InfoLabel>tarjimayi hol</InfoLabel>
                  <InfoValue>
                    <MentionsText text={otherUser.bio} />
                  </InfoValue>
                </InfoItem>
              </>
            )}

            {otherUser.jammId && (
              <>
                <Divider />
                <InfoItem>
                  <InfoLabel>jamm id</InfoLabel>
                  <InfoValue>#{otherUser.jammId}</InfoValue>
                </InfoItem>
              </>
            )}
          </GroupInfoCard>
        )}

        {currentChat.type === "group" && (
          <GroupInfoCard>
            {(displayChat?.privateurl || displayChat?.urlSlug) && (
              <InfoItem>
                <InfoLabel>havolani ulashish</InfoLabel>
                <InfoLink
                  onClick={() =>
                    onCopyLink(displayChat.privateurl || displayChat.urlSlug)
                  }
                >
                  <span>
                    {RESOLVED_APP_BASE_URL}/
                    {displayChat.privateurl || displayChat.urlSlug}
                  </span>
                  <LinkIcon size={20} $muted />
                </InfoLink>
              </InfoItem>
            )}

            {currentChat.description && (
              <>
                <Divider />
                <InfoItem>
                  <InfoLabel>tasnif</InfoLabel>
                  <InfoValue>
                    <MentionsText
                      text={
                        !isDescriptionExpanded && currentChat.description.length > 100
                          ? `${currentChat.description.substring(0, 100)}...`
                          : currentChat.description
                      }
                    />
                    {currentChat.description.length > 100 && (
                      <ShowMoreBtn onClick={toggleDescriptionExpanded}>
                        {isDescriptionExpanded ? "yopish" : "yana"}
                      </ShowMoreBtn>
                    )}
                  </InfoValue>
                </InfoItem>
              </>
            )}
          </GroupInfoCard>
        )}

        {displayChat?.type === "group" && (
          <InfoSection>
            <SectionTitle>A'zolar</SectionTitle>
            <MembersList>
              {displayChat.members?.length ? (
                displayChat.members.map((memberData) => {
                  const member =
                    typeof memberData === "object" ? memberData : null;
                  if (!member) return null;

                  const memberId = member._id || member.id;
                  const memberName =
                    member.name ||
                    member.nickname ||
                    member.username ||
                    "Foydalanuvchi";
                  const isAdmin = currentChat.admins?.some(
                    (admin) => (admin.userId || admin.id || admin._id) === memberId,
                  );
                  const isOwner = currentChat.createdBy === memberId;
                  const memberLastSeen =
                    getUserLastSeen?.(memberId) ||
                    member.lastSeen ||
                    member.lastActive ||
                    null;

                  return (
                    <MemberItem
                      key={memberId}
                      onClick={() => onMemberClick(member)}
                    >
                      <MemberAvatar>
                        {member.avatar?.length > 1 ? (
                          <img src={member.avatar} alt={memberName} />
                        ) : (
                          memberName.charAt(0)
                        )}
                      </MemberAvatar>
                      <MemberMeta>
                        <MemberNameRow>
                          <UserNameWithDecoration
                            user={member}
                            fallback={memberName}
                            size="sm"
                          />
                        </MemberNameRow>
                        <MemberStatus
                          $online={!member.isOfficialProfile && isUserOnline(memberId)}
                        >
                          {member.isOfficialProfile
                            ? member.officialBadgeLabel || "Rasmiy"
                            : isUserOnline(memberId)
                              ? "Online"
                              : formatLastSeenLabel(memberLastSeen)}
                        </MemberStatus>
                      </MemberMeta>
                      {isOwner ? (
                        <AdminBadge>Ega</AdminBadge>
                      ) : isAdmin ? (
                        <AdminBadge>Admin</AdminBadge>
                      ) : null}
                    </MemberItem>
                  );
                })
              ) : (
                <EmptyMembersText>A'zolar ro'yxati mavjud emas</EmptyMembersText>
              )}
            </MembersList>
          </InfoSection>
        )}
      </SidebarContent>
    </RightSidebar>
  );
};

export default ChatAreaInfoSidebar;
