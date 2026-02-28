import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  X,
  Upload,
  Loader,
  Search,
  Check,
  Shield,
  UserMinus,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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

const UserList = styled.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color, #202225);
  border-radius: 4px;
  background-color: var(--tertiary-color, #36393f);
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
    &:hover { text-decoration: underline; }
  `}
`;

const EditGroupDialog = ({
  isOpen,
  onClose,
  onSave,
  group = {},
  users = [],
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  const [admins, setAdmins] = useState([]);
  const [showAdminPanelFor, setShowAdminPanelFor] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
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
      setSearchUser("");
      setShowAdminPanelFor(null);
    }
  }, [isOpen, group]);

  if (!isOpen) return null;

  const toggleUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      // Also remove from admins if removed from members
      setAdmins((prev) => prev.filter((a) => (a.userId || a.id) !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchUser.toLowerCase()) &&
      u.type === "user" &&
      !u.isSavedMessages &&
      searchUser.trim() !== "",
  );

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

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Fayl hajmi juda katta (maksimum 2MB)");
      return;
    }

    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${API_URL}/chats/${group.id || group._id}/avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        },
      );
      if (res.ok) {
        const url = await res.text();
        setImageUrl(url);
      } else {
        alert("Rasm yuklashda xatolik yuz berdi");
      }
    } catch {
      alert("Tarmoq xatosi");
    } finally {
      setUploadingAvatar(false);
    }
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
              {uploadingAvatar ? (
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
            <Label>Mavjud a'zolar ({currentMembers.length})</Label>
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

                      <div style={{ display: "flex", gap: 8 }}>
                        {canAddAdmins && uid !== group.createdBy && (
                          <button
                            onClick={() =>
                              setShowAdminPanelFor(
                                String(showAdminPanelFor) === uid ? null : uid,
                              )
                            }
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#b9bbbe",
                              cursor: "pointer",
                              fontSize: 12,
                            }}
                          >
                            Admin
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
                            }}
                          >
                            <UserMinus size={16} />
                          </button>
                        )}
                      </div>
                    </UserItem>

                    {showAdminPanelFor === uid && (
                      <div
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "var(--input-color, #202225)",
                          fontSize: 13,
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                        }}
                      >
                        {[
                          {
                            id: "edit_group_info",
                            label: "Ma'lumotlarni tahrirlash",
                          },
                          { id: "add_members", label: "A'zo qo'shish" },
                          { id: "remove_members", label: "A'zo o'chirish" },
                          {
                            id: "delete_others_messages",
                            label: "Xabarlarni o'chirish",
                          },
                          { id: "add_admins", label: "Admin qo'shish" },
                        ].map((perm) => {
                          const has =
                            adminRecord?.permissions?.includes(perm.id) ||
                            false;
                          return (
                            <label
                              key={perm.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                cursor: "pointer",
                                color: "#b9bbbe",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={has}
                                onChange={() => toggleAdminPerm(uid, perm.id)}
                              />
                              {perm.label}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </UserList>
          </UserSelection>

          {canAddMembers && (
            <UserSelection>
              <Label>Yangi a'zo qo'shish</Label>
              <UserSearch>
                <Input
                  placeholder="User qidirish..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  style={{ paddingLeft: 30, width: "100%" }}
                />
                <Search
                  size={14}
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 12,
                    color: "#aaa",
                  }}
                />
              </UserSearch>
              {searchUser.trim() !== "" && (
                <UserList>
                  {filteredUsers.length === 0 ? (
                    <div
                      style={{
                        padding: 12,
                        color: "#b9bbbe",
                        fontSize: 13,
                        textAlign: "center",
                      }}
                    >
                      Hech kim topilmadi
                    </div>
                  ) : (
                    filteredUsers.map((user) => (
                      <UserItem
                        key={user.id}
                        selected={selectedUsers.includes(user.id)}
                        onClick={() => toggleUser(user.id)}
                      >
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
                              user.name.charAt(0)
                            )}
                          </Avatar>
                          <UserName>{user.name}</UserName>
                        </UserInfo>
                        {selectedUsers.includes(user.id) && (
                          <Check
                            size={16}
                            color="var(--primary-color, #5865F2)"
                          />
                        )}
                      </UserItem>
                    ))
                  )}
                </UserList>
              )}
            </UserSelection>
          )}
        </Content>

        <Footer>
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button primary onClick={handleSaveWrapper} disabled={!name.trim()}>
            Saqlash
          </Button>
        </Footer>
      </Dialog>
    </Overlay>
  );
};

export default EditGroupDialog;
