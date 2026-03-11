import React, { useState, useRef } from "react";
import styled from "styled-components";
import { X, Upload, Check, Search, Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import useUploadAvatar from "../../../hooks/useUploadAvatar";
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

const CreateGroupDialog = ({ isOpen, onClose, onCreate, users = [] }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const fileInputRef = useRef(null);

  const uploadAvatarMutation = useUploadAvatar({
    onSuccess: (url) => setImageUrl(url),
    onError: () => toast.error("Rasm yuklashda xatolik yuz berdi"),
  });

  if (!isOpen) return null;

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
    onClose();
  };

  const toggleUser = (userId) => {
    const targetUser = users.find((user) => String(user.id) === String(userId));
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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase()) &&
      user.type === "user" && // Ensure we only list users, not groups
      !user.isSavedMessages &&
      searchUser.trim() !== "",
  );

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
            <Label>Ishtirokchilar ({selectedUsers.length}/40)</Label>
            <UserSearch>
              <Input
                placeholder="User qidirish..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                style={{ paddingLeft: 30 }}
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
                      style={{
                        opacity: user.disableGroupInvites ? 0.55 : 1,
                        pointerEvents: user.disableGroupInvites ? "none" : "auto",
                      }}
                      onClick={() => toggleUser(user.id)}
                    >
                      <UserInfo>
                        <Avatar>{user.avatar || user.name.charAt(0)}</Avatar>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <UserName>{user.name}</UserName>
                          {user.isOfficialProfile ? (
                            <UserBadge>{user.officialBadgeLabel || "Rasmiy"}</UserBadge>
                          ) : null}
                        </div>
                      </UserInfo>
                      {selectedUsers.includes(user.id) && (
                        <Check size={16} color="var(--primary-color)" />
                      )}
                    </UserItem>
                  ))
                )}
              </UserList>
            )}
          </UserSelection>
        </ModalBody>

        <ModalFooter $padding="14px 18px" $background="var(--tertiary-color)">
          <DialogActionButton $variant="ghost" onClick={onClose}>
            Bekor qilish
          </DialogActionButton>
          <DialogActionButton
            $variant="primary"
            onClick={handleSubmit}
            disabled={!name.trim()}
          >
            Guruh yaratish
          </DialogActionButton>
        </ModalFooter>
      </ModalPanel>
    </ModalOverlay>
  );
};

export default CreateGroupDialog;
