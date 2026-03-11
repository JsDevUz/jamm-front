import React from "react";
import styled from "styled-components";
import {
  ArrowLeft,
  Edit2,
  Eye,
  Heart,
  MessageCircle,
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react";
import PremiumBadge from "../../../shared/ui/badges/PremiumBadge";
import {
  ProfileMobileBackButton,
  ProfilePaneBody,
  ProfilePaneEmptyIcon,
  ProfilePaneEmptyState,
  ProfilePaneHeader,
  ProfilePaneTitle,
} from "../ui";
import { SidebarIconButton } from "../../../shared/ui/buttons/IconButton";

const MobileBackBtn = styled(ProfileMobileBackButton)``;
const ButtonWrapper = styled(SidebarIconButton)``;

const PostCard = styled.div`
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
  transition: background 0.15s;

  &:hover {
    background: var(--hover-color);
  }

  &:first-child {
    border-top: 1px solid var(--border-color);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const PostAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostMeta = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0 0 2px;
    color: var(--text-color);
    font-size: 13px;
    font-weight: 700;
  }

  span {
    color: var(--text-muted-color);
    font-size: 11px;
  }
`;

const PostText = styled.div`
  color: var(--text-color);
  font-size: 13px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${(props) =>
    props.$active ? props.$activeColor || "#ed4245" : "var(--text-muted-color)"};
  font-size: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const OwnerActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const ProfilePostsPane = ({
  posts,
  isOwnProfile,
  userAvatar,
  displayName,
  isPremium,
  formatTime,
  renderText,
  likePost,
  onEditPost,
  onDeletePost,
  onCreatePost,
  onBack,
}) => {
  return (
    <div data-tour="profile-pane-groups" style={{ display: "contents" }}>
      <ProfilePaneHeader>
        <MobileBackBtn onClick={onBack}>
          <ArrowLeft size={20} />
        </MobileBackBtn>
        <ProfilePaneTitle>Gurunglar</ProfilePaneTitle>
        {isOwnProfile ? (
          <ButtonWrapper onClick={onCreatePost} title="Gurung yarating">
            <Plus size={16} />
          </ButtonWrapper>
        ) : null}
      </ProfilePaneHeader>

      {posts.length === 0 ? (
        <ProfilePaneBody>
          <ProfilePaneEmptyState>
            <ProfilePaneEmptyIcon>
              <MessageSquare size={28} color="var(--text-muted-color)" />
            </ProfilePaneEmptyIcon>
            <span>Birinchi gurungi yozing!</span>
          </ProfilePaneEmptyState>
        </ProfilePaneBody>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id}>
            <PostHeader>
              <PostAvatar>
                {userAvatar ? (
                  <img src={userAvatar} alt={displayName} />
                ) : (
                  displayName.charAt(0).toUpperCase()
                )}
              </PostAvatar>
              <PostMeta>
                <h4>
                  {displayName}
                  <PremiumBadge isPremium={isPremium} />
                </h4>
                <span>{formatTime(post.createdAt)}</span>
              </PostMeta>
            </PostHeader>

            <PostText>{renderText(post.content)}</PostText>

            <PostActions>
              <ActionBtn
                $active={post.liked}
                $activeColor="#ed4245"
                onClick={() => likePost(post._id)}
              >
                <Heart size={16} fill={post.liked ? "#ed4245" : "none"} />
                {post.likes}
              </ActionBtn>

              <ActionBtn $activeColor="#5865f2">
                <MessageCircle size={16} />
                {post.comments}
              </ActionBtn>

              <ActionBtn $activeColor="var(--text-muted-color)">
                <Eye size={16} />
                {post.views}
              </ActionBtn>
            </PostActions>

            {isOwnProfile ? (
              <OwnerActions>
                <ActionBtn
                  $activeColor="var(--primary-color)"
                  onClick={() => onEditPost(post)}
                >
                  <Edit2 size={16} />
                  Tahrirlash
                </ActionBtn>
                <ActionBtn
                  $activeColor="#ed4245"
                  onClick={() => onDeletePost(post)}
                >
                  <Trash2 size={16} />
                  O'chirish
                </ActionBtn>
              </OwnerActions>
            ) : null}
          </PostCard>
        ))
      )}
    </div>
  );
};

export default ProfilePostsPane;
