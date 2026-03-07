import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { X, Globe, EyeOff, Play, Info } from "lucide-react";
import { useArena } from "../../contexts/ArenaContext";
import { ButtonWrapper } from "../BlogsSidebar";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  backdrop-filter: blur(4px);
`;

const Content = styled.div`
  background: var(--secondary-color);
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-color);
  animation: scaleIn 0.2s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 20px;
    color: var(--text-color);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Select = styled.select`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const VisibilityToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const VisibilityOption = styled.div`
  background: ${(props) =>
    props.active ? "var(--hover-color)" : "var(--tertiary-color)"};
  border: 1px solid
    ${(props) =>
      props.active ? "var(--primary-color)" : "var(--border-color)"};
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  text-align: center;

  svg {
    color: ${(props) =>
      props.active ? "var(--primary-color)" : "var(--text-muted-color)"};
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: ${(props) =>
      props.active ? "var(--text-color)" : "var(--text-muted-color)"};
  }

  &:hover {
    border-color: var(--primary-color);
  }
`;

const InfoBox = styled.div`
  background: rgba(52, 152, 219, 0.1);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 10px;
  font-size: 13px;
  color: var(--text-muted-color);
  line-height: 1.4;

  svg {
    flex-shrink: 0;
    color: #3498db;
  }
`;

const CreateButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CreateBattleDialog = ({ isOpen, onClose }) => {
  const { myTests, createBattle, fetchMyTests } = useArena();
  const [selectedTestId, setSelectedTestId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [visibility, setVisibility] = useState("public");

  useEffect(() => {
    if (!isOpen) return;
    fetchMyTests(1);
  }, [fetchMyTests, isOpen]);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!selectedTestId || !roomName.trim()) return;
    createBattle(selectedTestId, roomName, "solo", visibility);
    onClose();
    setRoomName("");
    setSelectedTestId("");
  };

  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>Yangi Bellashuv Xonasi</h2>
          <ButtonWrapper onClick={onClose}>
            <X size={20} />
          </ButtonWrapper>
        </Header>

        <Section>
          <Label>Bellashuv nomi</Label>
          <Input
            placeholder="Masalan: Juma kungi bellashuv"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </Section>

        <Section>
          <Label>Testni tanlang</Label>
          <Select
            value={selectedTestId}
            onChange={(e) => setSelectedTestId(e.target.value)}
          >
            <option value="">--- Test tanlang ---</option>
            {myTests.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
          </Select>
          {myTests.length === 0 && (
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-muted-color)",
                lineHeight: 1.5,
              }}
            >
              Hali test topilmadi. Test yaratgan bo'lsangiz, ro'yxat
              yangilanmoqda.
            </div>
          )}
        </Section>

        <Section>
          <Label>Maxfiylik sozlamasi</Label>
          <VisibilityToggle>
            <VisibilityOption
              active={visibility === "public"}
              onClick={() => setVisibility("public")}
            >
              <Globe size={24} />
              <span>Publik</span>
            </VisibilityOption>
            <VisibilityOption
              active={visibility === "unlisted"}
              onClick={() => setVisibility("unlisted")}
            >
              <EyeOff size={24} />
              <span>Maxfiy</span>
            </VisibilityOption>
          </VisibilityToggle>
        </Section>

        <InfoBox>
          <Info size={16} />
          {visibility === "public"
            ? "Ushbu xona barcha uchun ochiq va 'Aktiv Bellashuvlar' ro'yxatida ko'rinadi."
            : "Ushbu xona ro'yxatda ko'rinmaydi. Faqat xona ID sini bilganlargina qo'shila oladi."}
        </InfoBox>

        <CreateButton
          onClick={handleCreate}
          disabled={!selectedTestId || !roomName.trim()}
        >
          <Play size={18} fill="white" /> Xonani Yaratish
        </CreateButton>
      </Content>
    </Overlay>
  );
};

export default CreateBattleDialog;
