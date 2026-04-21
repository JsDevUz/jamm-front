import React from "react";
import styled, { keyframes } from "styled-components";
import {
  BookOpen,
  GraduationCap,
  MessageCircle,
  PencilRuler,
  Settings,
  Shield,
  Star,
  X,
} from "lucide-react";

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

const loadingSpin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const ProfileOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  animation: ${modalOverlayIn} 0.18s ease;
  opacity: ${(props) => (props.$closing ? 0 : 1)};
  transition: opacity 0.18s ease;

  @media (max-width: 768px) {
    padding: 0;
    align-items: stretch;
  }
`;

const ProfileModal = styled.div`
  width: min(920px, 100%);
  min-height: min(620px, calc(100vh - 36px));
  max-height: calc(100vh - 36px);
  border-radius: 24px;
  border: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
  background: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
  color: var(--text-color);
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  overflow: hidden;
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.45);
  position: relative;
  animation: ${modalSurfaceIn} 0.22s ease;
  opacity: ${(props) => (props.$closing ? 0 : 1)};
  transform: ${(props) =>
    props.$closing ? "translateY(12px) scale(0.985)" : "translateY(0) scale(1)"};
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    min-height: min(720px, calc(100vh - 20px));
    max-height: calc(100vh - 20px);
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    overflow-y: auto;
  }
`;

const ProfileCloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 14px;
  background: color-mix(in srgb, var(--secondary-color) 82%, transparent);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition:
    background-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 82%, transparent);
    transform: translateY(-1px);
  }
`;

const ProfileSidebar = styled.div`
  position: relative;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--secondary-color) 88%, var(--background-color)) 0%,
    color-mix(in srgb, var(--tertiary-color) 86%, var(--background-color)) 100%
  );
  padding: 22px;
  border-right: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
  display: flex;
  flex-direction: column;

  @media (max-width: 920px) {
    border-right: none;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
    padding: 58px 18px 18px;
  }
`;

const ProfileBanner = styled.div`
  height: 148px;
  border-radius: 20px;
  background: var(--primary-color);
  position: relative;
  margin-bottom: 56px;
`;

const ProfileBannerSettingsButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 14px;
  background: color-mix(in srgb, var(--background-color) 52%, transparent);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition:
    transform 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    background: color-mix(in srgb, var(--hover-color) 72%, transparent);
  }
`;

const ProfileLargeAvatar = styled.div`
  position: absolute;
  left: 22px;
  bottom: -34px;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  padding: 6px;
  background: color-mix(in srgb, var(--background-color) 92%, var(--secondary-color));
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.3);
`;

const ProfileLargeAvatarInner = styled.div`
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
  font-size: 1.95rem;
  font-weight: 800;
`;

const ProfileLargeAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ProfileStatus = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: var(--success-color);
  border: 3px solid color-mix(in srgb, var(--background-color) 92%, var(--secondary-color));
`;

const ProfileName = styled.h3`
  margin: 0;
  font-size: 1.55rem;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
`;

const ProfileHandle = styled.div`
  margin-top: 4px;
  color: var(--text-secondary-color);
  font-size: 0.92rem;
`;

const ProfileBio = styled.p`
  margin: 16px 0 0;
  color: var(--text-color);
  font-size: 0.92rem;
  line-height: 1.55;
`;

const ProfileMetaList = styled.div`
  margin-top: 22px;
  display: grid;
  gap: 14px;
`;

const ProfileMetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProfileMetaLabel = styled.div`
  color: var(--text-muted-color);
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const ProfileMetaValue = styled.div`
  color: var(--text-color);
  font-size: 0.92rem;
  font-weight: 700;
`;

const ProfileQuickActions = styled.div`
  margin: 4px 0 18px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
`;

const ProfileMain = styled.div`
  padding: 62px 24px 24px;
  display: flex;
  flex-direction: column;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 20px 16px 18px;
  }
`;

const ProfileTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  border-bottom: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
  margin-bottom: 18px;
  overflow-x: auto;
`;

const ProfileTab = styled.button`
  border: none;
  background: transparent;
  color: ${(props) =>
    props.$active ? "var(--text-color)" : "var(--text-secondary-color)"};
  font-size: 0.94rem;
  font-weight: 800;
  padding: 0 0 12px;
  position: relative;
  cursor: pointer;
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 3px;
    border-radius: 999px;
    background: var(--text-color);
    opacity: ${(props) => (props.$active ? 1 : 0)};
    transform: scaleX(${(props) => (props.$active ? 1 : 0.4)});
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }
`;

const ProfilePanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
`;

const ProfilePanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
`;

const ProfilePanelHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 520px;
  min-width: 0;
`;

const ProfilePanelTitle = styled.h4`
  margin: 0;
  font-size: 1.45rem;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
`;

const ProfilePanelText = styled.p`
  margin: 0;
  color: var(--text-secondary-color);
  font-size: 0.92rem;
  line-height: 1.55;
`;

const ProfilePanelActionButton = styled.button`
  min-height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid
    ${(props) =>
      props.$primary
        ? "color-mix(in srgb, var(--primary-color) 68%, transparent)"
        : "color-mix(in srgb, var(--border-color) 82%, transparent)"};
  background: ${(props) =>
    props.$primary
      ? "color-mix(in srgb, var(--primary-color) 18%, transparent)"
      : "color-mix(in srgb, var(--background-color) 10%, transparent)"};
  color: ${(props) => (props.$primary ? "var(--primary-color)" : "var(--text-color)")};
  font-size: 0.82rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${(props) =>
      props.$primary
        ? "color-mix(in srgb, var(--primary-color) 100%, white 0%)"
        : "var(--primary-color)"};
    background: ${(props) =>
      props.$primary
        ? "color-mix(in srgb, var(--primary-color) 22%, transparent)"
        : "color-mix(in srgb, var(--primary-color) 12%, transparent)"};
  }
`;

const ProfileList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 4px;
`;

const ProfileListItem = styled.button`
  width: 100%;
  border: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
  border-radius: 18px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--secondary-color) 92%, black 8%) 0%,
    color-mix(in srgb, var(--tertiary-color) 90%, black 10%) 100%
  );
  color: inherit;
  text-align: left;
  padding: 14px;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 12px;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
`;

const ProfileListIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--hover-color) 80%, transparent);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 1rem;
  font-weight: 800;
`;

const ProfileListImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ProfileListBody = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProfileListTitle = styled.div`
  color: var(--text-color);
  font-size: 0.98rem;
  font-weight: 800;
  line-height: 1.2;
`;

const ProfileListSubtitle = styled.div`
  color: var(--text-secondary-color);
  font-size: 0.84rem;
  line-height: 1.45;
`;

const ProfileListMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ProfileMetaChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hover-color) 78%, transparent);
  color: var(--text-secondary-color);
  font-size: 0.74rem;
  font-weight: 700;
`;

const ProfileListEmpty = styled.div`
  border-radius: 18px;
  border: 1px dashed color-mix(in srgb, var(--border-color) 72%, transparent);
  padding: 16px;
  color: var(--text-secondary-color);
  font-size: 0.9rem;
  line-height: 1.55;
`;

const LoadMoreHint = styled.div`
  padding: 10px 0 4px;
  color: var(--text-muted-color);
  font-size: 0.78rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const LoadMoreSpinner = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 999px;
  border: 2px solid color-mix(in srgb, var(--text-muted-color) 26%, transparent);
  border-top-color: var(--primary-color);
  animation: ${loadingSpin} 0.75s linear infinite;
`;

const getPostPreviewText = (post) =>
  String(post?.content || post?.markdown || post?.description || "")
    .replace(/\s+/g, " ")
    .trim();

export default function NewProfileModal({
  open,
  closing,
  currentUser,
  displayName,
  avatarLetter,
  createdAtLabel,
  isCeoUser,
  profileTabs,
  activeProfileTab,
  profileArticlesLoading,
  visibleItems,
  hasMoreVisibleItems,
  isLoadingMoreItems,
  currentUserId,
  onClose,
  onOpenAccountSettings,
  showSettingsButton = Boolean(onOpenAccountSettings),
  profileActions = [],
  showTeacherAction = true,
  showAdminAction = isCeoUser,
  onSetTab,
  onListScroll,
  onNavigate,
  onCourseNavigate,
  getPublishedLessons,
  getMemberStatus,
  formatCreatedDate,
}) {
  if (!open) return null;

  return (
    <ProfileOverlay $closing={closing} onClick={onClose}>
      <ProfileModal $closing={closing} onClick={(event) => event.stopPropagation()}>
        <ProfileCloseButton
          type="button"
          aria-label="Close profile preview"
          onClick={onClose}
        >
          <X size={22} />
        </ProfileCloseButton>

        <ProfileSidebar>
          <ProfileBanner>
            {showSettingsButton ? (
              <ProfileBannerSettingsButton
                type="button"
                aria-label="Open account settings"
                onClick={onOpenAccountSettings}
              >
                <Settings size={18} />
              </ProfileBannerSettingsButton>
            ) : null}
            <ProfileLargeAvatar>
              <ProfileLargeAvatarInner>
                {currentUser?.avatar ? (
                  <ProfileLargeAvatarImage src={currentUser.avatar} alt={displayName} />
                ) : (
                  avatarLetter
                )}
                <ProfileStatus />
              </ProfileLargeAvatarInner>
            </ProfileLargeAvatar>
          </ProfileBanner>

          {profileActions.length || showTeacherAction || showAdminAction ? (
            <ProfileQuickActions>
              {profileActions.map((action) => {
                const ActionIcon = action.icon;
                return (
                  <ProfilePanelActionButton
                    key={action.id || action.label}
                    type="button"
                    $primary={action.primary}
                    onClick={action.onClick}
                  >
                    {ActionIcon ? <ActionIcon size={16} /> : null}
                    {action.label}
                  </ProfilePanelActionButton>
                );
              })}
              {showTeacherAction ? (
                <ProfilePanelActionButton
                  type="button"
                  onClick={() => onNavigate("/teacher")}
                >
                  <GraduationCap size={16} />
                  Ustoz sahifasi
                </ProfilePanelActionButton>
              ) : null}
              {showAdminAction ? (
                <ProfilePanelActionButton
                  type="button"
                  $primary
                  onClick={() => onNavigate("/admin")}
                >
                  <Shield size={16} />
                  CEO paneli
                </ProfilePanelActionButton>
              ) : null}
            </ProfileQuickActions>
          ) : null}

          <ProfileName>{displayName}</ProfileName>
          <ProfileHandle>
            @{currentUser?.username || currentUser?.nickname || "jamm-user"}
          </ProfileHandle>
          <ProfileBio>
            {currentUser?.bio ||
              "Jamm ichida gurunglar, maqolalar va darslaringizni bir joydan boshqaradigan profilingiz."}
          </ProfileBio>

          <ProfileMetaList>
            <ProfileMetaItem>
              <ProfileMetaLabel>A'zo bo'lgan sana</ProfileMetaLabel>
              <ProfileMetaValue>{createdAtLabel}</ProfileMetaValue>
            </ProfileMetaItem>
            <ProfileMetaItem>
              <ProfileMetaLabel>Email</ProfileMetaLabel>
              <ProfileMetaValue>{currentUser?.email || "Ko'rsatilmagan"}</ProfileMetaValue>
            </ProfileMetaItem>
          </ProfileMetaList>
        </ProfileSidebar>

        <ProfileMain>
          <ProfileTabs>
            {profileTabs.map((tab) => (
              <ProfileTab
                key={tab.id}
                type="button"
                $active={tab.id === activeProfileTab.id}
                onClick={() => onSetTab(tab.id)}
              >
                {tab.label}
              </ProfileTab>
            ))}
          </ProfileTabs>

          <ProfilePanel>
            <ProfilePanelHeader>
              <ProfilePanelHeaderText>
                <ProfilePanelTitle>{activeProfileTab.title}</ProfilePanelTitle>
                <ProfilePanelText>{activeProfileTab.description}</ProfilePanelText>
              </ProfilePanelHeaderText>
            </ProfilePanelHeader>

            <ProfileList onScroll={onListScroll}>
              {activeProfileTab.id === "posts"
                ? visibleItems.map((post) => {
                    const previewText = getPostPreviewText(post);

                    return (
                    <ProfileListItem
                      key={post._id || post.id}
                      type="button"
                      $clickable
                      onClick={() => onNavigate("/feed")}
                    >
                      <ProfileListIcon>
                        <MessageCircle size={18} />
                      </ProfileListIcon>
                      <ProfileListBody>
                        <ProfileListTitle>Gurung</ProfileListTitle>
                        <ProfileListSubtitle>
                          {previewText || "Gurung matni mavjud emas."}
                        </ProfileListSubtitle>
                        <ProfileListMeta>
                          <ProfileMetaChip>
                            <Star size={12} />
                            {post.likes || 0} like
                          </ProfileMetaChip>
                          <ProfileMetaChip>
                            <MessageCircle size={12} />
                            {post.comments || 0} izoh
                          </ProfileMetaChip>
                          <ProfileMetaChip>{formatCreatedDate(post.createdAt)}</ProfileMetaChip>
                        </ProfileListMeta>
                      </ProfileListBody>
                    </ProfileListItem>
                  );
                })
                : null}

              {activeProfileTab.id === "articles"
                ? (profileArticlesLoading && visibleItems.length === 0
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <ProfileListItem key={`article-skeleton-${index}`} type="button">
                          <ProfileListIcon>
                            <PencilRuler size={18} />
                          </ProfileListIcon>
                          <ProfileListBody>
                            <ProfileListTitle>Yuklanmoqda...</ProfileListTitle>
                            <ProfileListSubtitle>
                              Maqolalaringiz tayyorlanmoqda.
                            </ProfileListSubtitle>
                          </ProfileListBody>
                        </ProfileListItem>
                      ))
                    : visibleItems.map((article) => (
                        <ProfileListItem
                          key={article._id}
                          type="button"
                          $clickable
                          onClick={() => onNavigate(`/articles/${article._id}`)}
                        >
                          <ProfileListIcon>
                            {article.coverImage ? (
                              <ProfileListImage
                                src={article.coverImage}
                                alt={article.title}
                              />
                            ) : (
                              <PencilRuler size={18} />
                            )}
                          </ProfileListIcon>
                          <ProfileListBody>
                            <ProfileListTitle>
                              {article.title || "Nomsiz maqola"}
                            </ProfileListTitle>
                            <ProfileListSubtitle>
                              {article.excerpt ||
                                article.description ||
                                "Maqola tavsifi mavjud emas."}
                            </ProfileListSubtitle>
                            <ProfileListMeta>
                              <ProfileMetaChip>
                                <Star size={12} />
                                {article.likes || 0} like
                              </ProfileMetaChip>
                              <ProfileMetaChip>
                                {formatCreatedDate(article.createdAt || article.updatedAt)}
                              </ProfileMetaChip>
                            </ProfileListMeta>
                          </ProfileListBody>
                        </ProfileListItem>
                      )))
                : null}

              {activeProfileTab.id === "courses"
                ? visibleItems.map((course) => (
                    <ProfileListItem
                      key={course._id}
                      type="button"
                      $clickable
                      onClick={() => onCourseNavigate(course)}
                    >
                      <ProfileListIcon>
                        {course.image ? (
                          <ProfileListImage src={course.image} alt={course.name} />
                        ) : (
                          <GraduationCap size={18} />
                        )}
                      </ProfileListIcon>
                      <ProfileListBody>
                        <ProfileListTitle>
                          {course.name || course.title || "Kurs"}
                        </ProfileListTitle>
                        <ProfileListSubtitle>
                          {course.description || "Kurs tavsifi kiritilmagan."}
                        </ProfileListSubtitle>
                        <ProfileListMeta>
                          <ProfileMetaChip>
                            <BookOpen size={12} />
                            {getPublishedLessons(course).length} dars
                          </ProfileMetaChip>
                          <ProfileMetaChip>
                            {getMemberStatus(course, currentUserId) === "owner"
                              ? "Muallif"
                              : "Qo'shilgan"}
                          </ProfileMetaChip>
                        </ProfileListMeta>
                      </ProfileListBody>
                    </ProfileListItem>
                  ))
                : null}

              {!profileArticlesLoading && visibleItems.length === 0 ? (
                <ProfileListEmpty>
                  {activeProfileTab.id === "posts"
                    ? "Hozircha ko'rsatish uchun gurunglar topilmadi."
                    : activeProfileTab.id === "articles"
                      ? "Hozircha maqolalar topilmadi."
                      : "Hozircha darslar yoki kurslar topilmadi."}
                </ProfileListEmpty>
              ) : null}

              {hasMoreVisibleItems ? (
                <LoadMoreHint>
                  {isLoadingMoreItems ? <LoadMoreSpinner /> : null}
                  {isLoadingMoreItems
                    ? "Yuklanmoqda..."
                    : "Pastga scroll qiling, yana ko'proq yuklanadi."}
                </LoadMoreHint>
              ) : null}
            </ProfileList>
          </ProfilePanel>
        </ProfileMain>
      </ProfileModal>
    </ProfileOverlay>
  );
}
