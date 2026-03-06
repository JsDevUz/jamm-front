import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import {
  Plus,
  Trash,
  ChevronRight,
  X,
  Upload,
  Search,
  Shield,
  Loader,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import useUpdateGroupAvatar from "../hooks/useUpdateGroupAvatar";
import { useChats } from "../contexts/ChatsContext";
import useUploadAvatar from "../hooks/useUploadAvatar";
import { toast } from "react-hot-toast";
import { PlusBtn } from "./ProfilePage";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Dialog = styled.div`
  background-color: var(--secondary-color, #2f3136);
  width: 440px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`;

const Header = styled.div`
  padding: 24px;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color, #ffffff);
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: var(--text-muted-color, #b9bbbe);
  font-size: 14px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-muted-color, #b9bbbe);
  cursor: pointer;

  &:hover {
    color: var(--text-color, #ffffff);
  }
`;

const Content = styled.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color, #b9bbbe);
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: var(--input-color, #202225);
  color: var(--text-color, #ffffff);
  font-size: 14px;
  outline: none;

  &:focus {
    background-color: #40444b;
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
  border: 2px dashed var(--text-muted-color, #b9bbbe);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-muted-color, #b9bbbe);
  flex-direction: column;
  gap: 4px;
  font-size: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: var(--text-color, #ffffff);
    color: var(--text-color, #ffffff);
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

const UserSearch = styled.div`
  position: relative;
  margin-bottom: 8px;
`;
// remove scrollbar
const UserList = styled.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color, #202225);
  border-radius: 16px;
  background-color: var(--tertiary-color, #36393f);
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
  justify-content: space-between;

  &:hover {
    background-color: var(--secondary-color, #2f3136);
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
  background-color: var(--primary-color, #5865f2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;

const UserName = styled.span`
  font-size: 14px;
  color: var(--text-color, #ffffff);
  font-weight: 500;
`;

const Footer = styled.div`
  background-color: var(--tertiary-color, #36393f);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 24px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  ${(props) =>
    props.primary
      ? `
    background-color: var(--primary-color, #5865F2);
    color: white;
    &:hover { background-color: var(--hover-color, #4752C4); }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `
      : `
    background-color: transparent;
    color: var(--text-color, #ffffff);
    &:hover { background-color: rgba(255,255,255,0.05); }
  `}

  ${(props) =>
    props.danger &&
    `
    color: #ed4245;
    &:hover { background-color: rgba(237, 66, 69, 0.1); }
  `}
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
`;

const SwitchBase = styled.div`
  width: 32px;
  height: 18px;
  background-color: ${(props) => (props.active ? "#43b581" : "#72767d")};
  border-radius: 9px;
  position: relative;
  transition: background-color 0.2s;
`;

const SwitchThumb = styled.div`
  width: 14px;
  height: 14px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${(props) => (props.active ? "16px" : "2px")};
  transition: left 0.2s;
`;

const AdminRightsDialog = ({
  isOpen,
  onClose,
  user,
  permissions,
  onTogglePerm,
  onDismissAdmin,
  isOwner,
}) => {
  if (!isOpen || !user) return null;

  const PERMISSION_OPTIONS = [
    { id: "edit_group_info", label: "Guruh ma'lumotlarini tahrirlash" },
    { id: "add_members", label: "A'zo qo'shish" },
    { id: "remove_members", label: "A'zo o'chirish" },
    { id: "delete_others_messages", label: "Xabarlarni o'chirish" },
    { id: "add_admins", label: "Admin qo'shish" },
    { id: "pin_messages", label: "Xabarlarni biriktirish" },
  ];

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()} style={{ width: "380px" }}>
        <Header style={{ padding: "20px" }}>
          <Title style={{ fontSize: "18px" }}>Admin huquqlari</Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <div style={{ padding: "0 24px 20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              paddingBottom: 16,
              borderBottom: "1px solid var(--border-color, #202225)",
            }}
          >
            <Avatar style={{ width: 44, height: 44, fontSize: 16 }}>
              {user.avatar?.length > 1 ? (
                <img
                  src={user.avatar}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              ) : (
                (user.name || user.username || "").charAt(0)
              )}
            </Avatar>
            <div>
              <div style={{ color: "white", fontWeight: 600, fontSize: 15 }}>
                {user.name || user.username}
              </div>
              <div style={{ color: "#b9bbbe", fontSize: 13 }}>
                @{user.username}
              </div>
            </div>
          </div>

          <Label style={{ marginBottom: 10, display: "block" }}>HUQUQLAR</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {PERMISSION_OPTIONS.map((opt) => {
              const active = permissions.includes(opt.id);
              return (
                <SwitchContainer
                  key={opt.id}
                  onClick={() => onTogglePerm(opt.id)}
                >
                  <span style={{ color: "#dcddde", fontSize: 14 }}>
                    {opt.label}
                  </span>
                  <SwitchBase active={active}>
                    <SwitchThumb active={active} />
                  </SwitchBase>
                </SwitchContainer>
              );
            })}
          </div>
        </div>

        <Footer
          style={{
            padding: "16px 20px",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <Button primary onClick={onClose}>
            Saqlash
          </Button>
          <Button danger onClick={onDismissAdmin}>
            Adminlikni bekor qilish
          </Button>
        </Footer>
      </Dialog>
    </Overlay>
  );
};

const AddMemberDialog = ({
  isOpen,
  onClose,
  onSelect,
  selectedUsers,
  users,
  searchGlobalUsers,
}) => {
  const [searchUser, setSearchUser] = useState("");
  const [apiResults, setApiResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchUser.trim()) {
        setApiResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchGlobalUsers(searchUser);
        setApiResults(results);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchUser, searchGlobalUsers]);

  const combinedUsers = [
    ...users,
    ...apiResults.filter((apiU) => !users.some((u) => u.id === apiU.id)),
  ];

  const filteredUsers = combinedUsers.filter(
    (user) =>
      (user.name?.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchUser.toLowerCase())) &&
      !selectedUsers.includes(user.id),
  );

  const isFull = selectedUsers.length >= 40;

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()} style={{ width: "400px" }}>
        <Header style={{ padding: "20px" }}>
          <Title style={{ fontSize: "20px" }}>
            A'zo qo'shish ({selectedUsers.length}/40)
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <div style={{ padding: "0 24px 24px" }}>
          <UserSearch>
            <Input
              placeholder="Ism yoki @username orqali qidirish"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              style={{ paddingLeft: 30, width: "100%" }}
              autoFocus
            />
            <div
              style={{
                position: "absolute",
                left: 10,
                top: 12,
                color: "#aaa",
              }}
            >
              {isSearching ? (
                <Loader size={14} className="animate-spin" />
              ) : (
                <Search size={14} />
              )}
            </div>
          </UserSearch>

          <UserList style={{ maxHeight: "300px", marginTop: 12 }}>
            {searchUser.trim() === "" ? (
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
                <UserItem key={user.id} onClick={() => onSelect(user.id)}>
                  <UserInfo>
                    <Avatar>
                      {user.avatar?.length > 1 ? (
                        <img
                          src={user.avatar}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          alt=""
                        />
                      ) : (
                        (user.name || user.username || "").charAt(0)
                      )}
                    </Avatar>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <UserName>{user.name || user.username}</UserName>
                      <div style={{ fontSize: 11, color: "#b9bbbe" }}>
                        @{user.username}
                      </div>
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
        </div>

        <Footer style={{ padding: "12px 24px" }}>
          <Button onClick={onClose}>Yopish</Button>
        </Footer>
      </Dialog>
    </Overlay>
  );
};

const EditGroupDialog = ({
  isOpen,
  onClose,
  onSave,
  group = {},
  users = [],
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const { searchGlobalUsers } = useChats();
  const fileInputRef = useRef(null);

  const updateAvatarMutation = useUpdateGroupAvatar({
    onSuccess: (url) => setImageUrl(url),
    onError: () => toast.error("Rasm yuklashda xatolik yuz berdi"),
  });

  const [admins, setAdmins] = useState([]);
  const [showAdminPanelFor, setShowAdminPanelFor] = useState(null);

  const currentUser = useAuthStore((state) => state.user);
  const currentUserId = currentUser?.id || currentUser?._id;

  const isOwner = String(group.createdBy) === String(currentUserId);
  const myAdminRecord = admins.find(
    (a) => String(a.userId || a.id || a._id) === String(currentUserId),
  );
  const checkPerm = (perm) =>
    isOwner || (myAdminRecord && myAdminRecord.permissions.includes(perm));

  const canEditInfo = checkPerm("edit_group_info");
  const canAddMembers = checkPerm("add_members");
  const canRemoveMembers = checkPerm("remove_members");
  const canAddAdmins = checkPerm("add_admins");

  useEffect(() => {
    if (isOpen && group) {
      setName(group.name || "");
      setDescription(group.description || "");
      setImageUrl(group.avatar || "");
      setSelectedUsers(
        group.members
          ? group.members.map((m) => String(m.id || m._id || m))
          : [],
      );
      setAdmins(
        group.admins
          ? group.admins.map((a) => ({
              ...a,
              userId: String(a.userId || a.id || a._id),
            }))
          : [],
      );
      setIsAddMemberOpen(false);
    }
  }, [isOpen, group]);

  /* Old debounced search effects moved to AddMemberDialog */

  const toggleUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      // Also remove from admins if removed from members
      setAdmins((prev) => prev.filter((a) => (a.userId || a.id) !== userId));
    } else {
      if (selectedUsers.length >= 40) {
        toast.error("Guruhga maksimal 40ta odam qo'shish mumkin");
        return;
      }
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const combinedUsers = [...users];

  const allUsersMap = new Map();
  group.members?.forEach((m) => allUsersMap.set(m.id || m._id || m, m));
  users.forEach((u) => allUsersMap.set(u.id || u.jammId || u._id, u));

  const currentMembers = selectedUsers
    .map((id) => allUsersMap.get(id))
    .filter(Boolean);

  const toggleAdminPerm = (userId, perm) => {
    const sUserId = String(userId);
    setAdmins((prev) => {
      const existing = prev.find((a) => String(a.userId || a.id) === sUserId);
      if (existing) {
        const hasPerm = existing.permissions.includes(perm);
        const nextPerms = hasPerm
          ? existing.permissions.filter((p) => p !== perm)
          : [...existing.permissions, perm];
        if (nextPerms.length === 0) {
          return prev.filter((a) => String(a.userId || a.id) !== sUserId);
        }
        return prev.map((a) =>
          String(a.userId || a.id) === sUserId
            ? { ...a, permissions: nextPerms }
            : a,
        );
      } else {
        // If adding an admin, they MUST be a member
        setSelectedUsers((prevSelected) => {
          if (!prevSelected.includes(sUserId)) {
            return [...prevSelected, sUserId];
          }
          return prevSelected;
        });
        return [...prev, { userId: sUserId, permissions: [perm] }];
      }
    });
  };

  const handleSaveWrapper = () => {
    console.log(selectedUsers);

    const data = {
      name,
      description,
      avatar: imageUrl,
      members: selectedUsers,
    };
    if (canAddAdmins) {
      data.admins = admins;
    }
    onSave(data);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Fayl hajmi juda katta (maksimum 2MB)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    updateAvatarMutation.mutate({
      chatId: group.id || group._id,
      formData,
    });
  };
  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Guruhni tahrirlash</Title>
          <Subtitle>Guruh ma'lumotlarini o'zgartirish</Subtitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </Header>

        <Content>
          <ImageUpload>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
              disabled={!canEditInfo}
            />
            <UploadCircle
              onClick={() => {
                if (canEditInfo && fileInputRef.current)
                  fileInputRef.current.click();
              }}
              style={{ cursor: canEditInfo ? "pointer" : "not-allowed" }}
            >
              {updateAvatarMutation.isPending ? (
                <Loader
                  size={24}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : imageUrl?.length > 1 ? (
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
              placeholder="Guruh nomi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!canEditInfo}
            />
          </InputGroup>

          <InputGroup>
            <Label>Guruh haqida (ixtiyoriy)</Label>
            <Input
              placeholder="Guruh maqsadini yozing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!canEditInfo}
            />
          </InputGroup>

          <UserSelection>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Label>Mavjud a'zolar ({currentMembers.length}/40)</Label>
              {canAddMembers && (
                <PlusBtn onClick={() => setIsAddMemberOpen(true)}>
                  <Plus size={16} />
                </PlusBtn>
              )}
            </div>
            <UserList>
              {currentMembers.map((user) => {
                const uid = String(user.id || user._id);
                const adminRecord = admins.find(
                  (a) => String(a.userId || a.id) === uid,
                );

                return (
                  <div
                    key={uid}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <UserItem>
                      <UserInfo>
                        <Avatar>
                          {user.avatar?.length > 1 ? (
                            <img
                              src={user.avatar}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              alt=""
                            />
                          ) : (
                            (user.name || user.username || "").charAt(0)
                          )}
                        </Avatar>
                        <UserName>
                          {user.name || user.nickname || user.username}
                        </UserName>
                        {uid === group.createdBy && (
                          <Shield size={14} color="#f1c40f" />
                        )}
                        {uid !== group.createdBy && adminRecord && (
                          <Shield size={14} color="#5865F2" />
                        )}
                      </UserInfo>

                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          alignItems: "center",
                        }}
                      >
                        {uid !== group.createdBy && (
                          <button
                            onClick={() => setShowAdminPanelFor(uid)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: adminRecord ? "#5865f2" : "#b9bbbe",
                              cursor: "pointer",
                              fontSize: 12,
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              padding: "4px 8px",
                              borderRadius: 4,
                            }}
                          >
                            {adminRecord ? "Admin" : "Unsigned"}
                            <ChevronRight size={14} />
                          </button>
                        )}
                        {canRemoveMembers && uid !== group.createdBy && (
                          <button
                            onClick={() => toggleUser(uid)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#ed4245",
                              cursor: "pointer",
                              padding: 6,
                              borderRadius: 4,
                            }}
                          >
                            <Trash size={16} />
                          </button>
                        )}
                      </div>
                    </UserItem>
                  </div>
                );
              })}
            </UserList>
          </UserSelection>
        </Content>

        <Footer>
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button primary onClick={handleSaveWrapper} disabled={!name.trim()}>
            Saqlash
          </Button>
        </Footer>
      </Dialog>

      {/* Admin Rights Sub-Dialog */}
      {showAdminPanelFor && (
        <AdminRightsDialog
          isOpen={!!showAdminPanelFor}
          onClose={() => setShowAdminPanelFor(null)}
          user={allUsersMap.get(showAdminPanelFor)}
          permissions={
            admins.find(
              (a) => String(a.userId || a.id) === String(showAdminPanelFor),
            )?.permissions || []
          }
          onTogglePerm={(permId) => toggleAdminPerm(showAdminPanelFor, permId)}
          onDismissAdmin={() => {
            setAdmins((prev) =>
              prev.filter(
                (a) => String(a.userId || a.id) !== String(showAdminPanelFor),
              ),
            );
            setShowAdminPanelFor(null);
          }}
          isOwner={isOwner}
        />
      )}

      {/* Add Member Sub-Dialog */}
      {isAddMemberOpen && (
        <AddMemberDialog
          isOpen={isAddMemberOpen}
          onClose={() => setIsAddMemberOpen(false)}
          onSelect={(uid) => {
            toggleUser(uid);
            setIsAddMemberOpen(false);
          }}
          selectedUsers={selectedUsers}
          users={users}
          searchGlobalUsers={searchGlobalUsers}
        />
      )}
    </Overlay>
  );
};

export default EditGroupDialog;
