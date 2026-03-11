import styled from "styled-components";

export const PanelShell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  background: var(--bg-color);
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px 10px;
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
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
  color: var(--text-secondary);
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
`;

export const SearchInput = styled.input`
  width: 220px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-bg);
  color: var(--text-color);
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;

export const FilterSelect = styled.select`
  height: 36px;
  min-width: 120px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-bg);
  color: var(--text-color);
  padding: 0 10px;
`;

export const ActionButton = styled.button`
  height: 36px;
  border-radius: 10px;
  border: 1px solid ${({ $variant }) =>
    $variant === "primary" ? "var(--primary-color)" : "var(--border-color)"};
  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--primary-color)" : "var(--secondary-bg)"};
  color: ${({ $variant }) =>
    $variant === "primary" ? "#fff" : "var(--text-color)"};
  padding: 0 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const TabRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
`;

export const TabButton = styled.button`
  height: 34px;
  border-radius: 999px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--primary-color)" : "var(--border-color)"};
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb), 0.12)" : "var(--secondary-bg)"};
  color: ${({ $active }) =>
    $active ? "var(--primary-color)" : "var(--text-secondary)"};
  padding: 0 12px;
  white-space: nowrap;
  font-weight: 700;
  cursor: pointer;
`;

export const TableScroller = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 12px 16px 16px;
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: 820px;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--secondary-bg);
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

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--tertiary-bg);
    color: var(--text-secondary);
  }

  tr:last-child td {
    border-bottom: none;
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
        : "rgba(var(--primary-rgb), 0.12)"};
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
  background: var(--secondary-bg);
  color: var(--text-secondary);
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
  color: var(--text-secondary);
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
  background: var(--bg-color);
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
  color: var(--text-secondary);
`;

export const FieldInput = styled.input`
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-bg);
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
