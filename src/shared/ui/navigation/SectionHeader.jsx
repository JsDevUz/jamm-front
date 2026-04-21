import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Plus, Search } from "lucide-react";
import useAuthStore from "../../../store/authStore";

const Header = styled.div`
  padding: 14px 16px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);

  @media (max-width: 768px) {
    padding:
      calc(14px + env(safe-area-inset-top, 0px))
      max(16px, env(safe-area-inset-right, 0px))
      12px
      max(16px, env(safe-area-inset-left, 0px));
  }
`;

const HeaderPrimary = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileTrigger = styled.button`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border: none;
  border-radius: 14px;
  padding: 0;
  overflow: hidden;
  background: color-mix(in srgb, var(--primary-color) 88%, white 12%);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  transition:
    transform 0.16s ease,
    filter 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Title = styled.h2`
  margin: 0;
  min-width: 0;
  color: var(--text-color);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.01em;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => (props.$primary ? "#fff" : "var(--text-color)")};
  background: ${(props) => (props.$primary ? "var(--primary-color)" : "var(--input-color)")};
  transition: transform 0.16s ease, filter 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.06);
  }
`;

const AddButton = styled(IconButton)`
  width: 38px;
  height: 38px;
  border-radius: 13px;
`;

export default function SectionHeader({
  title,
  onSearch,
  onAdd,
  showProfile = false,
  hideAdd = false,
  addIcon = null,
  searchTitle = "Search",
  addTitle = "Create",
  searchTargetProps = {},
  addTargetProps = {},
}) {
  const currentUser = useAuthStore((state) => state.user);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const avatarFallback = useMemo(() => {
    const rawName =
      currentUser?.nickname || currentUser?.username || currentUser?.email || "J";
    return String(rawName).trim().charAt(0).toUpperCase() || "J";
  }, [currentUser?.email, currentUser?.nickname, currentUser?.username]);

  return (
    <>
      <Header>
        <HeaderPrimary>
          {showProfile ? (
            <ProfileTrigger
              type="button"
              title="Open profile"
              aria-label="Open profile"
              onClick={() => setIsSettingsOpen(true)}
            >
              {currentUser?.avatar ? (
                <ProfileImage src={currentUser.avatar} alt={currentUser?.nickname || "Profile"} />
              ) : (
                avatarFallback
              )}
            </ProfileTrigger>
          ) : null}
          <Title>{title}</Title>
        </HeaderPrimary>
        <Actions>
          <IconButton type="button" onClick={onSearch} title={searchTitle} {...searchTargetProps}>
            <Search size={20} />
          </IconButton>
          {!hideAdd ? (
            <AddButton type="button" $primary onClick={onAdd} title={addTitle} {...addTargetProps}>
              {addIcon || <Plus size={20} />}
            </AddButton>
          ) : null}
        </Actions>
      </Header>
     
    </>
  );
}
