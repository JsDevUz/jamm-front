import styled from "styled-components";

export const MnemonicsPanelShell = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 16px; */

  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: var(--background-color);
    padding: 20px;
    overflow-y: auto;
    box-sizing: border-box;
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

export const SetupCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px 24px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--secondary-color);
`;

export const ModeTabs = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
`;

export const ModeTab = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border: 0;
  background: transparent;
  color: ${(props) =>
    props.$active ? "var(--text-color)" : "var(--text-muted-color)"};
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${(props) => (props.$active ? "var(--primary-color)" : "transparent")};
  }
`;

export const SetupTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;

export const ConfigGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
`;

export const ConfigRow = styled.label`
  display: grid;
  grid-template-columns: minmax(180px, 320px) 140px auto;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const ConfigLabel = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`;

export const ConfigInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 50px;
  padding: 0 14px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 16px;
  font-weight: 700;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const ConfigHint = styled.p`
  margin: 0;
  font-size: 13px;
  color: var(--text-muted-color);
`;

export const ConfigActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const LeaderboardCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--tertiary-color);
`;

export const LeaderboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const LeaderboardTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  color: var(--text-color);
`;

export const LeaderboardHint = styled.span`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LeaderboardRow = styled.div`
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 10px;
  border: 1px solid ${(props) =>
    props.$highlight ? "var(--primary-color)" : "var(--border-color)"};
  border-radius: 10px;
  background: ${(props) =>
    props.$highlight
      ? "color-mix(in srgb, var(--primary-color) 10%, var(--background-color) 90%)"
      : "var(--background-color)"};

  @media (max-width: 768px) {
    grid-template-columns: 28px minmax(0, 1fr);
    padding: 10px;
    gap: 8px;
  }
`;

export const LeaderboardRank = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: var(--text-muted-color);
`;

export const LeaderboardUser = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LeaderboardAvatar = styled.div`
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  font-size: 12px;
  font-weight: 800;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const LeaderboardName = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  > span:last-child {
    font-size: 11px;
    color: var(--text-muted-color);
  }
`;

export const LeaderboardMetric = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
  white-space: nowrap;

  @media (max-width: 768px) {
    grid-column: 2 / -1;
    font-size: 12px;
  }
`;

export const LeaderboardEmpty = styled.div`
  padding: 14px 0;
  font-size: 13px;
  color: var(--text-muted-color);
`;

export const TopActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 35px;
  padding: 0 8px;
  border: 0;
  border-radius: 12px;
  background: var(--primary-color);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
`;

export const SecondaryAction = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--tertiary-color);
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

export const StagePanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StageHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);

  @media (max-width: 900px) {
    grid-template-columns: 1fr auto;
  }
`;

export const StageTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: var(--primary-color);
`;

export const StageMeta = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 18px;
  color: var(--text-muted-color);
  font-size: 15px;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`;

export const StageMetaValue = styled.span`
  color: var(--text-color);
  font-size: 24px;
  font-weight: 500;
`;

export const FinishedButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 16px;
  border: 0;
  border-radius: 12px;
  background: var(--success-color);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
`;

export const TrainingCanvas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100px;
  padding: 18px;
  border: 1px solid color-mix(in srgb, var(--text-color) 28%, transparent);
  background: color-mix(in srgb, var(--secondary-color) 55%, var(--background-color) 45%);
  overflow: auto;

  @media (max-width: 768px) {
    min-height: 420px;
    padding: 14px;
  }
`;

export const DigitGrid = styled.div`
  display: flex;
  overflow: auto;
  align-items: flex-start;
  gap: 0;
`;

export const DigitIndex = styled.div`
  min-width: 28px;
  margin-right: 8px;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted-color);
`;

export const DigitCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border: 1px solid color-mix(in srgb, var(--text-color) 35%, transparent);
  background: ${(props) =>
    props.$active ? "var(--warning-color)" : "var(--background-color)"};
  color: var(--text-color);
  font-size: 32px;
  font-weight: 500;

  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
    font-size: 24px;
  }
`;

export const NumberStage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 180px;
`;

export const NumberValue = styled.div`
  min-width: min(100%, 720px);
  min-height: 136px;
  padding: 16px 28px;
  border-radius: 8px;
  background: var(--background-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(40px, 8vw, 74px);
  font-weight: 500;
  text-align: center;

  @media (max-width: 768px) {
    min-height: 100px;
    font-size: 40px;
  }
`;

export const WordStage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  align-items: start;
`;

export const WordPreviewColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const WordPreviewItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;

  span {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-muted-color);
  }

  strong {
    display: inline-flex;
    align-items: center;
    min-height: 34px;
    padding: 0 14px;
    border-radius: 8px;
    background: ${(props) =>
      props.$active ? "var(--warning-color)" : "var(--background-color)"};
    color: var(--text-color);
    font-size: 14px;
    font-weight: 700;
  }
`;

export const WordInputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 24px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const WordInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

export const WordInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 0 14px;
  border: 1px solid ${(props) =>
    props.$active ? "var(--warning-color)" : "var(--border-color)"};
  border-radius: 8px;
  background: ${(props) =>
    props.$active ? "color-mix(in srgb, var(--warning-color) 22%, var(--background-color) 78%)" : "var(--background-color)"};
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const Keypad = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: auto;
`;

export const KeypadButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 74px;
  min-height: 64px;
  padding: 0 14px;
  border: 0;
  border-radius: 10px;
  background: var(--primary-color);
  color: #fff;
  font-size: 22px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    min-width: 58px;
    min-height: 52px;
    font-size: 18px;
  }
`;

export const ResultPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$wide ? "repeat(auto-fit, minmax(260px, 1fr))" : "repeat(auto-fit, minmax(120px, 1fr))"};
  gap: 10px;
`;

export const ResultCell = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$wide ? "row" : "column")};
  width: 100%;
  border: 1px solid color-mix(in srgb, var(--text-color) 35%, transparent);
  overflow: hidden;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: ${(props) => (props.$wide ? "52px" : "54px")};
    padding: 0 10px;
    font-size: ${(props) => (props.$wide ? "18px" : "24px")};
    font-weight: 500;
    text-align: center;
  }

  span:first-child {
    flex: 1;
    background: var(--background-color);
    color: var(--text-color);
  }

  span:last-child {
    flex: 1;
    background: ${(props) =>
      props.$correct
        ? "color-mix(in srgb, var(--success-color) 85%, white 15%)"
        : "color-mix(in srgb, var(--danger-color) 80%, white 20%)"};
    color: var(--text-color);
  }
`;
