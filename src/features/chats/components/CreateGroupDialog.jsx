import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { X, Upload, Search, Loader, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import useUploadAvatar from "../../../hooks/useUploadAvatar";
import { searchUsers as searchUsersApi } from "../../../api/chatApi";
import { APP_LIMITS } from "../../../constants/appLimits";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../../shared/ui/dialogs/ModalShell";

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color);
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background-color: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const ImageUpload = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const UploadCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px dashed var(--text-muted-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-muted-color);
  flex-direction: column;
  gap: 4px;
  font-size: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: var(--text-color);
    color: var(--text-color);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserSelection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const SelectionIconButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`;

const UserSearch = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

const UserList = styled.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background-color: var(--tertiary-color);
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
  justify-content: space-between;

  &:hover {
    background-color: var(--secondary-color);
  }

  ${(props) =>
    props.selected &&
    `
    background-color: rgba(88, 101, 242, 0.1);
    &:hover { background-color: rgba(88, 101, 242, 0.2); }
  `}
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;

const UserName = styled.span`
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
`;

const UserBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
`;

const EmptyMembers = styled.div`
  padding: 18px 14px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
  text-align: center;
  background: color-mix(in srgb, var(--tertiary-color) 70%, transparent);
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  background: var(--tertiary-color);
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }
`;

const RemoveMemberButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #ed4245;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: rgba(237, 66, 69, 0.1);
  }
`;

const FooterActionAnchor = styled.div`
  position: relative;
  display: inline-flex;
`;

const FooterTooltip = styled.div`
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.95);
  color: white;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
  z-index: 20;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    right: 12px;
    top: 100%;
    border-width: 6px 6px 0 6px;
    border-style: solid;
    border-color: rgba(15, 23, 42, 0.95) transparent transparent transparent;
  }
`;

const AddMemberDialog = ({
  isOpen,
  onClose,
  onSelect,
  selectedUsers,
  users,
}) => {
  const MIN_SEARCH_LENGTH = 3;
  const [searchUser, setSearchUser] = useState("");
  const [apiResults, setApiResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const normalizedSearchUser = searchUser.trim();
  const hasMinimumSearchLength =
    normalizedSearchUser.length >= MIN_SEARCH_LENGTH;

  useEffect(() => {
    if (!isOpen) {
      setSearchUser("");
      setApiResults([]);
      setIsSearching(false);
      return undefined;
    }

    const timer = setTimeout(async () => {
      if (!normalizedSearchUser || !hasMinimumSearchLength) {
        setApiResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchUsersApi(normalizedSearchUser);
        setApiResults(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error("Group user search failed:", error);
        setApiResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [hasMinimumSearchLength, isOpen, normalizedSearchUser]);

  const combinedUsers = [
    ...users,
    ...apiResults
      .map((user) => ({
        id: user.id || user._id,
        name: user.name || user.nickname || user.username,
        username: user.username,
        avatar: user.avatar || "",
        isOfficialProfile: user.isOfficialProfile,
        officialBadgeLabel: user.officialBadgeLabel,
        disableGroupInvites: user.disableGroupInvites,
      }))
      .filter((user) => user.id),
  ].filter(
    (user, index, list) =>
      list.findIndex((candidate) => String(candidate.id) === String(user.id)) ===
      index,
  );

  const filteredUsers = combinedUsers.filter((user) => {
    const query = normalizedSearchUser.toLowerCase();
    if (!query) return false;
    if (!hasMinimumSearchLength) return false;

    return (
      !selectedUsers.includes(String(user.id)) &&
      !user.isSavedMessages &&
      (user.name?.toLowerCase().includes(query) ||
        user.username?.toLowerCase().includes(query))
    );
  });

  if (!isOpen) return null;

  const isFull = selectedUsers.length >= 40;

  return (
    <ModalOverlay onClick={onClose} $zIndex={10000}>
      <ModalPanel
        $width="min(100%, 440px)"
        $maxHeight="min(82vh, 640px)"
        $radius="18px"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader $padding="18px">
          <ModalTitleBlock>
            <ModalTitle>A'zo qo'shish</ModalTitle>
            <ModalSubtitle>{selectedUsers.length}/40 tanlangan</ModalSubtitle>
          </ModalTitleBlock>
          <ModalCloseButton onClick={onClose}>
            <X size={18} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody $padding="16px 18px 18px">
          <UserSearch>
            <Input
              type="search"
              name="group-member-search"
              placeholder="Ism yoki @username orqali qidirish"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              style={{ paddingLeft: 30, width: "100%" }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="search"
              enterKeyHint="search"
              autoFocus
            />
            {isSearching ? (
              <Loader
                size={14}
                style={{
                  position: "absolute",
                  left: 10,
                  top: 12,
                  color: "#aaa",
                  animation: "spin 1s linear infinite",
                }}
              />
            ) : (
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: 10,
                  top: 12,
                  color: "#aaa",
                }}
              />
            )}
          </UserSearch>

          <UserList style={{ maxHeight: "320px", marginTop: 12 }}>
            {normalizedSearchUser === "" ? (
              <div
                style={{
                  padding: 20,
                  textAlign: "center",
                  color: "#b9bbbe",
                  fontSize: 14,
                }}
              >
                Qidirishni boshlang...
              </div>
            ) : !hasMinimumSearchLength ? (
              <div
                style={{
                  padding: 20,
                  textAlign: "center",
                  color: "#b9bbbe",
                  fontSize: 14,
                }}
              >
                Kamida 3 ta belgi kiriting
              </div>
            ) : filteredUsers.length === 0 ? (
              <div
                style={{
                  padding: 20,
                  textAlign: "center",
                  color: "#b9bbbe",
                  fontSize: 14,
                }}
              >
                Hech kim topilmadi
              </div>
            ) : (
              filteredUsers.map((user) => (
                <UserItem
                  key={user.id}
                  style={{
                    opacity: user.disableGroupInvites ? 0.55 : 1,
                    pointerEvents: user.disableGroupInvites || isFull ? "none" : "auto",
                  }}
                  onClick={() => onSelect(String(user.id))}
                >
                  <UserInfo>
                    <Avatar>
                      {user.avatar?.length > 1 ? (
                        <img src={user.avatar} alt={user.name || user.username} />
                      ) : (
                        (user.name || user.username || "").charAt(0)
                      )}
                    </Avatar>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <UserName>{user.name || user.username}</UserName>
                      {user.username ? (
                        <div style={{ fontSize: 11, color: "#b9bbbe" }}>
                          @{user.username}
                        </div>
                      ) : null}
                      {user.isOfficialProfile ? (
                        <UserBadge>{user.officialBadgeLabel || "Rasmiy"}</UserBadge>
                      ) : null}
                    </div>
                  </UserInfo>
                  {isFull ? (
                    <div style={{ fontSize: 10, color: "#ed4245" }}>
                      Guruh to'la
                    </div>
                  ) : (
                    <Plus size={16} color="var(--primary-color)" />
                  )}
                </UserItem>
              ))
            )}
          </UserList>
        </ModalBody>

        <ModalFooter $padding="14px 18px" $background="var(--tertiary-color)">
          <DialogActionButton $variant="ghost" onClick={onClose}>
            Yopish
          </DialogActionButton>
        </ModalFooter>
      </ModalPanel>
    </ModalOverlay>
  );
};

const CreateGroupDialog = ({ isOpen, onClose, onCreate, users = [] }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [showCreateTooltip, setShowCreateTooltip] = useState(false);
  const fileInputRef = useRef(null);

  const uploadAvatarMutation = useUploadAvatar({
    onSuccess: (url) => setImageUrl(url),
    onError: () => toast.error("Rasm yuklashda xatolik yuz berdi"),
  });

  useEffect(() => {
    if (!showCreateTooltip) return undefined;
    const timer = window.setTimeout(() => {
      setShowCreateTooltip(false);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [showCreateTooltip]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    onCreate({
      name,
      description,
      image: imageUrl,
      members: selectedUsers,
    });

    // Reset form
    setName("");
    setDescription("");
    setImageUrl("");
    setSelectedUsers([]);
    setIsAddMemberOpen(false);
    onClose();
  };

  const toggleUser = (userId) => {
    const targetUser = allUsersMap.get(String(userId));
    if (targetUser?.disableGroupInvites || targetUser?.isOfficialProfile) {
      return;
    }
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      if (selectedUsers.length >= 39) {
        toast.error("Guruhga maksimal 40ta odam qo'shish mumkin");
        return;
      }
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const allUsersMap = useMemo(() => {
    const map = new Map();
    users.forEach((user) => {
      const id = user.id || user._id || user.jammId;
      if (!id) return;
      map.set(String(id), {
        ...user,
        id: String(id),
        name: user.name || user.nickname || user.username,
      });
    });
    return map;
  }, [users]);

  const currentMembers = selectedUsers
    .map((id) => allUsersMap.get(String(id)))
    .filter(Boolean);
  const hasGroupName = Boolean(name.trim());
  const needsMembers = selectedUsers.length === 0;

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Fayl hajmi juda katta (maksimum 2MB)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    uploadAvatarMutation.mutate(formData);
  };

  return (
    <ModalOverlay onClick={onClose} $zIndex={9999}>
      <ModalPanel
        $width="min(100%, 520px)"
        $maxHeight="min(86vh, 760px)"
        $radius="18px"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader $padding="18px">
          <ModalTitleBlock>
            <ModalTitle>Guruh yaratish</ModalTitle>
            <ModalSubtitle>Do'stlaringiz bilan muloqot qiling</ModalSubtitle>
          </ModalTitleBlock>
          <ModalCloseButton onClick={onClose}>
            <X size={18} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody $padding="16px 18px 18px">
          <ImageUpload>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
            <UploadCircle
              onClick={() => {
                if (fileInputRef.current) fileInputRef.current.click();
              }}
            >
              {uploadAvatarMutation.isPending ? (
                <Loader
                  size={24}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : imageUrl ? (
                <img src={imageUrl} alt="Group" />
              ) : (
                <>
                  <Upload size={24} />
                  <span>UPLOAD</span>
                </>
              )}
            </UploadCircle>
          </ImageUpload>

          <InputGroup>
            <Label>Guruh nomi</Label>
            <Input
              placeholder="Yangi guruh"
              value={name}
              onChange={(e) =>
                setName(e.target.value.slice(0, APP_LIMITS.groupNameChars))
              }
              maxLength={APP_LIMITS.groupNameChars}
              autoFocus
            />
          </InputGroup>

          <InputGroup>
            <Label>Guruh haqida (ixtiyoriy)</Label>
            <Input
              placeholder="Guruh maqsadini yozing..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value.slice(0, APP_LIMITS.groupDescriptionChars),
                )
              }
              maxLength={APP_LIMITS.groupDescriptionChars}
            />
          </InputGroup>

          <UserSelection>
            <SelectionHeader>
              <Label>Ishtirokchilar ({selectedUsers.length}/40)</Label>
              <SelectionIconButton
                type="button"
                onClick={() => setIsAddMemberOpen(true)}
                title="A'zo qo'shish"
              >
                <Plus size={16} />
              </SelectionIconButton>
            </SelectionHeader>

            {currentMembers.length === 0 ? (
              <EmptyMembers>
                Kamida 1 ta odam qo'shing. A'zo tanlash alohida oynada ochiladi.
              </EmptyMembers>
            ) : (
              <MemberList>
                {currentMembers.map((user) => (
                  <MemberRow key={user.id}>
                    <UserInfo>
                      <Avatar>
                        {user.avatar?.length > 1 ? (
                          <img src={user.avatar} alt={user.name || user.username} />
                        ) : (
                          (user.name || user.username || "").charAt(0)
                        )}
                      </Avatar>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <UserName>{user.name || user.username}</UserName>
                        {user.username ? (
                          <div style={{ fontSize: 11, color: "#b9bbbe" }}>
                            @{user.username}
                          </div>
                        ) : null}
                        {user.isOfficialProfile ? (
                          <UserBadge>{user.officialBadgeLabel || "Rasmiy"}</UserBadge>
                        ) : null}
                      </div>
                    </UserInfo>
                    <RemoveMemberButton
                      type="button"
                      onClick={() => toggleUser(String(user.id))}
                      title="A'zoni olib tashlash"
                    >
                      <Trash2 size={16} />
                    </RemoveMemberButton>
                  </MemberRow>
                ))}
              </MemberList>
            )}
          </UserSelection>
        </ModalBody>

        <ModalFooter $padding="14px 18px" $background="var(--tertiary-color)">
          <DialogActionButton $variant="ghost" onClick={onClose}>
            Bekor qilish
          </DialogActionButton>
          <FooterActionAnchor>
            {showCreateTooltip && selectedUsers.length === 0 && (
              <FooterTooltip>Kamida 1 ta a'zo qo'shing</FooterTooltip>
            )}
            <DialogActionButton
              $variant="primary"
              onClick={() => {
                if (needsMembers) {
                  setShowCreateTooltip(true);
                  return;
                }
                handleSubmit();
              }}
              disabled={!hasGroupName}
              aria-disabled={needsMembers}
              style={
                needsMembers
                  ? { opacity: 0.55, cursor: "not-allowed" }
                  : undefined
              }
            >
              Guruh yaratish
            </DialogActionButton>
          </FooterActionAnchor>
        </ModalFooter>
      </ModalPanel>

      <AddMemberDialog
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onSelect={toggleUser}
        selectedUsers={selectedUsers}
        users={users}
      />
    </ModalOverlay>
  );
};

export default CreateGroupDialog;
