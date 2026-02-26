import React, { useState } from "react";
import styled from "styled-components";
import { X, Upload, Check, Search } from "lucide-react";

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
  background-color: var(--secondary-color);
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
  color: var(--text-color);
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: var(--text-muted-color);
  font-size: 14px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;

  &:hover {
    color: var(--text-color);
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
  color: var(--text-muted-color);
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: var(--input-color);
  color: var(--text-color);
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
  border-radius: 4px;
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

const Footer = styled.div`
  background-color: var(--tertiary-color);
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
    background-color: var(--primary-color);
    color: white;
    &:hover { background-color: var(--hover-color); }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `
      : `
    background-color: transparent;
    color: var(--text-color);
    &:hover { text-decoration: underline; }
  `}
`;

const CreateGroupDialog = ({ isOpen, onClose, onCreate, users = [] }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

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
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase()) &&
      user.type === "user", // Ensure we only list users, not groups
  );

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Guruh yaratish</Title>
          <Subtitle>Do'stlaringiz bilan muloqot qiling</Subtitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </Header>

        <Content>
          <ImageUpload>
            <UploadCircle
              onClick={() => {
                const url = prompt("Rasm URL manzilini kiriting:");
                if (url) setImageUrl(url);
              }}
            >
              {imageUrl ? (
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
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </InputGroup>

          <InputGroup>
            <Label>Guruh haqida (ixtiyoriy)</Label>
            <Input
              placeholder="Guruh maqsadini yozing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputGroup>

          <UserSelection>
            <Label>Ishtirokchilar ({selectedUsers.length})</Label>
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
            <UserList>
              {filteredUsers.map((user) => (
                <UserItem
                  key={user.id}
                  selected={selectedUsers.includes(user.id)}
                  onClick={() => toggleUser(user.id)}
                >
                  <UserInfo>
                    <Avatar>{user.avatar || user.name.charAt(0)}</Avatar>
                    <UserName>{user.name}</UserName>
                  </UserInfo>
                  {selectedUsers.includes(user.id) && (
                    <Check size={16} color="var(--primary-color)" />
                  )}
                </UserItem>
              ))}
            </UserList>
          </UserSelection>
        </Content>

        <Footer>
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button primary onClick={handleSubmit} disabled={!name.trim()}>
            Guruh yaratish
          </Button>
        </Footer>
      </Dialog>
    </Overlay>
  );
};

export default CreateGroupDialog;
