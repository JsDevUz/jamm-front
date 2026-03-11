import styled from "styled-components";

export const GradingSection = styled.div`
  padding: 18px 24px 24px;
  display: grid;
  gap: 14px;
`;

export const GradingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const GradingTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;

export const GradingMuted = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const GradingCard = styled.div`
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  display: grid;
  gap: 10px;
`;

export const GradingSectionTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const SummaryBox = styled.div`
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
`;

export const SummaryLabel = styled.div`
  font-size: 11px;
  color: var(--text-muted-color);
`;

export const SummaryValue = styled.div`
  margin-top: 3px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`;

export const CompactTable = styled.div`
  display: grid;
  gap: 8px;

  @media (max-width: 820px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$columns === 5
      ? "minmax(180px, 1.65fr) repeat(4, minmax(88px, 0.8fr))"
      : props.$columns === 7
        ? "minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr)) auto"
      : "minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr))"};
  gap: 10px;
  padding: 0 2px;
  font-size: 11px;
  color: var(--text-muted-color);
  min-width: max-content;

  @media (max-width: 820px) {
    display: grid;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$columns === 5
      ? "minmax(180px, 1.65fr) repeat(4, minmax(88px, 0.8fr))"
      : props.$columns === 7
        ? "minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr)) auto"
      : "minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr))"};
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  min-width: max-content;

  @media (max-width: 820px) {
    grid-template-columns: ${(props) =>
      props.$columns === 5
        ? "minmax(180px, 1.65fr) repeat(4, minmax(88px, 0.8fr))"
        : props.$columns === 7
          ? "minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr)) auto"
          : "minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr))"};
    gap: 10px;
  }
`;

export const UserCell = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tertiary-color);
  color: white;
  font-size: 12px;
  font-weight: 700;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UserMeta = styled.div`
  min-width: 0;
`;

export const UserName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserSubMeta = styled.div`
  margin-top: 2px;
  font-size: 11px;
  color: var(--text-muted-color);
`;

export const ValueCell = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  min-width: 0;

  @media (max-width: 820px) {
    display: block;
  }
`;

export const MobileLabel = styled.span`
  display: none;
  color: var(--text-muted-color);
  font-weight: 500;

  @media (max-width: 820px) {
    display: none;
  }
`;

export const StatusBadge = styled.div`
  justify-self: start;
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;

white-space: nowrap;
  color: ${(props) =>
    props.$status === "excellent"
      ? "var(--success-color)"
      : props.$status === "good"
        ? "var(--primary-color)"
        : props.$status === "average"
          ? "var(--warning-color)"
          : "var(--danger-color)"};
  background: ${(props) =>
    props.$status === "excellent"
      ? "color-mix(in srgb, var(--success-color) 12%, transparent)"
      : props.$status === "good"
        ? "color-mix(in srgb, var(--primary-color) 12%, transparent)"
        : props.$status === "average"
          ? "color-mix(in srgb, var(--warning-color) 12%, transparent)"
          : "color-mix(in srgb, var(--danger-color) 12%, transparent)"};
`;

export const ActionCell = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 820px) {
    justify-content: flex-start;
  }
`;

export const EmptyState = styled.div`
  padding: 14px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted-color);
`;

export const InlineField = styled.input`
  width: 100%;
  min-width: 0;
  padding: 7px 9px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 12px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const InlineTextarea = styled.textarea`
  width: 100%;
  min-width: 0;
  min-height: 58px;
  padding: 7px 9px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 12px;
  line-height: 1.45;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const InlineStack = styled.div`
  display: grid;
  gap: 6px;
`;

export const TinyButton = styled.button`
  padding: 4px 6px;
  border-radius: 8px;
  border: 1px solid var(--primary-color);
  background: var(--primary-color);
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  justify-self: start;
`;

export const InlineSummary = styled.div`
  display: grid;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
`;

export const InlineMuted = styled.div`
  font-size: 11px;
  line-height: 1.4;
  color: var(--text-muted-color);
  white-space: pre-wrap;
`;
