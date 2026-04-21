import styled from "styled-components";

export const MaterialsSection = styled.div`
  margin: ${(props) => (props.$admin ? "5px 8px" : "10px 16px 10px")};
  border-radius: ${(props) => (props.$admin ? "12px" : "0")};
  border: ${(props) => (props.$admin ? "1px solid var(--border-color)" : "none")};
  padding: ${(props) => (props.$admin ? "14px" : "0")};
  background: ${(props) => (props.$admin ? "var(--secondary-color)" : "transparent")};
  display: grid;
  gap: 8px;

  @media (max-width: 768px) {
    padding: ${(props) => (props.$admin ? "12px" : "0")};
    border-radius: ${(props) => (props.$admin ? "12px" : "0")};
  }
`;

export const MaterialsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const MaterialsHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MaterialsTitleWrap = styled.div`
  display: grid;
  gap: 4px;
`;

export const MaterialsTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`;

export const MaterialsHint = styled.p`
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.45;
`;

export const MaterialsAction = styled.button`
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 9px;
  background: var(--input-color);
  color: var(--text-color);
  cursor: pointer;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`;

export const MaterialsList = styled.div`
  display: grid;
  gap: 8px;
`;

export const MaterialsViewer = styled.div`
  display: grid;
  gap: 10px;
`;

export const MaterialCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: transparent;
`;

export const MaterialMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 3px;
`;

export const MaterialName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MaterialSub = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const MaterialActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

export const MaterialLink = styled.a`
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
`;

export const EmptyMaterials = styled.div`
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  border: none;
  border-radius: 0;
  color: var(--text-muted-color);
  font-size: 13px;
  font-weight: 600;
  text-align: center;
`;

export const MaterialPreviewFrame = styled.iframe`
  width: 100%;
  min-height: 520px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: white;

  @media (max-width: 768px) {
    min-height: 420px;
  }
`;

export const MaterialField = styled.div`
  display: grid;
  gap: 6px;
  margin: 8px 0;
`;

export const MaterialLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const MaterialInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--input-color);
  color: var(--text-color);
  outline: none;
`;

export const MaterialFileInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--input-color);
  color: var(--text-color);
  outline: none;
`;

export const MaterialForm = styled.div`
  display: grid;
  gap: 10px;
`;

export const MaterialButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`;

export const MaterialButton = styled.button`
  padding: ${(props) => (props.$iconOnly ? "8px" : "9px 12px")};
  min-width: ${(props) => (props.$iconOnly ? "34px" : "auto")};
  min-height: ${(props) => (props.$iconOnly ? "34px" : "auto")};
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.$primary ? "var(--primary-color)" : "var(--border-color)")};
  background: ${(props) => (props.$primary ? "var(--primary-color)" : "var(--secondary-color)")};
  color: ${(props) => (props.$primary ? "white" : "var(--text-color)")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:disabled {
    opacity: 0.56;
    cursor: not-allowed;
  }
`;
