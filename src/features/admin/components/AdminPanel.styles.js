import styled from "styled-components";

export const PanelShell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  height: 100%;
  background: var(--background-color);
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px 10px;
  border-bottom: 1px solid var(--border-color);
  min-width: 0;

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 12px 12px 10px;
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 0 0 auto;
  min-width: 180px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
  color: var(--text-color);
`;

export const Description = styled.p`
  margin: 0;
  font-size: 13px;
  color: var(--text-secondary-color);
`;

export const HeaderActions = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 1fr) auto auto;
  gap: 8px;
  align-items: center;
  width: 100%;
  min-width: 0;

  @media (max-width: 900px) {
    grid-template-columns: minmax(220px, 1fr) auto;
  }

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;

export const FilterSelect = styled.select`
  height: 36px;
  min-width: 150px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 10px;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const ActionButton = styled.button`
  height: 36px;
  border-radius: 10px;
  border: 1px solid ${({ $variant }) =>
    $variant === "primary" ? "var(--primary-color)" : "var(--border-color)"};
  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--primary-color)" : "var(--secondary-color)"};
  color: ${({ $variant }) =>
    $variant === "primary" ? "#fff" : "var(--text-color)"};
  padding: 0 12px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }
`;

export const TabRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 720px) {
    padding: 10px 12px;
  }
`;

export const TabButton = styled.button`
  height: 34px;
  border-radius: 999px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--primary-color)" : "var(--border-color)"};
  background: ${({ $active }) =>
    $active
      ? "color-mix(in srgb, var(--primary-color) 12%, transparent)"
      : "var(--secondary-color)"};
  color: ${({ $active }) =>
    $active ? "var(--primary-color)" : "var(--text-secondary-color)"};
  padding: 0 12px;
  white-space: nowrap;
  font-weight: 700;
  cursor: pointer;
`;

export const TableScroller = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  padding: 12px 16px 16px;
  scrollbar-gutter: stable;
  touch-action: pan-x pan-y;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 720px) {
    padding: 10px 12px 14px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: 960px;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  overflow: hidden;

  th,
  td {
    padding: 10px 12px;
    font-size: 13px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  td {
    background: color-mix(
      in srgb,
      var(--secondary-color) 72%,
      var(--background-color)
    );
    color: var(--text-color);
    opacity: 1;
    font-weight: 600;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--tertiary-color);
    color: var(--text-secondary-color);
  }

  tr:last-child td {
    border-bottom: none;
  }

  [data-theme="light"] & td {
    background: #f5f6f8;
    color: #2e3338;
  }

  [data-theme="dark"] & td {
    background: color-mix(in srgb, var(--secondary-color) 88%, transparent);
    color: var(--text-color);
  }
`;

export const MetaBadge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 26px;
  border-radius: 999px;
  padding: 0 10px;
  background: ${({ $tone }) =>
    $tone === "success"
      ? "rgba(34, 197, 94, 0.14)"
      : $tone === "danger"
        ? "rgba(239, 68, 68, 0.14)"
        : "color-mix(in srgb, var(--primary-color) 12%, transparent)"};
  color: ${({ $tone }) =>
    $tone === "success"
      ? "var(--success-color)"
      : $tone === "danger"
        ? "var(--danger-color)"
        : "var(--primary-color)"};
  font-size: 12px;
  font-weight: 700;
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  border-radius: 14px;
  border: 1px dashed var(--border-color);
  background: var(--secondary-color);
  color: var(--text-secondary-color);
`;

export const FooterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px 14px;
  border-top: 1px solid var(--border-color);
`;

export const FooterMeta = styled.div`
  font-size: 13px;
  color: var(--text-secondary-color);
`;

export const Pager = styled.div`
  display: flex;
  gap: 8px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(8, 12, 24, 0.52);
  backdrop-filter: blur(10px);
`;

export const ModalCard = styled.div`
  width: min(520px, 100%);
  border-radius: 18px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
`;

export const ModalBody = styled.div`
  padding: 16px;
  display: grid;
  gap: 12px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary-color);
`;

export const FieldInput = styled.input`
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 16px 16px;
  border-top: 1px solid var(--border-color);
`;
