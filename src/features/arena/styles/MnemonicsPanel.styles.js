import styled from "styled-components";

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-color);
`;

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-muted-color);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;

export const CardText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted-color);
`;

export const ExerciseTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ExerciseTab = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 12px;
  border: 1px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "var(--border-color)")};
  border-radius: 999px;
  background: ${(props) =>
    props.$active ? "rgba(88, 101, 242, 0.12)" : "var(--background-color)"};
  color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--text-color)"};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const FieldLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
`;

export const Select = styled.select`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 13px;
`;

export const ConfigInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 13px;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 14px;
  border: 0;
  border-radius: 10px;
  background: var(--primary-color);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--tertiary-color);
  color: var(--text-color);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

export const Stage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: stretch;
`;

export const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StatChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 0 10px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--background-color);
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 600;
`;

export const NumberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--background-color);
  color: var(--text-color);
  font-size: clamp(28px, 5vw, 52px);
  font-weight: 800;
  letter-spacing: 0.24em;
  text-align: center;
  word-break: break-word;
`;

export const Countdown = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--warning-color);
`;

export const Input = styled.input`
  width: 100%;
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.14em;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const ResultBanner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border: 1px solid
    ${(props) =>
      props.$correct ? "var(--success-color)" : "var(--danger-color)"};
  border-radius: 12px;
  background: var(--background-color);
`;

export const ResultTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) =>
    props.$correct ? "var(--success-color)" : "var(--danger-color)"};
`;

export const ResultLine = styled.div`
  font-size: 13px;
  color: var(--text-muted-color);
  word-break: break-word;
`;

export const SummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: 84px 1fr 1fr 64px;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--background-color);
  font-size: 12px;
  color: var(--text-muted-color);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryValue = styled.div`
  color: var(--text-color);
  font-weight: 700;
  word-break: break-word;
`;

export const StatusPill = styled.div`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: ${(props) =>
    props.$correct ? "rgba(34, 197, 94, 0.14)" : "rgba(239, 68, 68, 0.14)"};
  color: ${(props) =>
    props.$correct ? "var(--success-color)" : "var(--danger-color)"};
  font-size: 11px;
  font-weight: 700;

  @media (max-width: 640px) {
    justify-self: start;
  }
`;

export const HintList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--text-muted-color);
  font-size: 13px;
`;
