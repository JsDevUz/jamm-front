import styled from "styled-components";

export const SectionWrap = styled.div`
  padding: 14px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const HeaderMeta = styled.div`
  display: grid;
  gap: 4px;
  min-width: 0;
`;

export const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`;

export const MutedText = styled.p`
  margin: 0;
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.45;
`;

export const IconActionButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Card = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

export const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 11px;
  color: var(--text-muted-color);
`;

export const CardTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.4;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: ${(props) =>
    props.$tone === "success"
      ? "var(--success-color)"
      : props.$tone === "warning"
        ? "var(--warning-color)"
        : "var(--text-muted-color)"};
  background: ${(props) =>
    props.$tone === "success"
      ? "color-mix(in srgb, var(--success-color) 10%, transparent)"
      : props.$tone === "warning"
        ? "color-mix(in srgb, var(--warning-color) 10%, transparent)"
        : "var(--secondary-color)"};
  border: 1px solid
    ${(props) =>
      props.$tone === "success"
        ? "color-mix(in srgb, var(--success-color) 22%, var(--border-color))"
        : props.$tone === "warning"
          ? "color-mix(in srgb, var(--warning-color) 22%, var(--border-color))"
          : "var(--border-color)"};
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.$primary ? "var(--primary-color)" : "var(--border-color)")};
  background: ${(props) => (props.$primary ? "var(--primary-color)" : "var(--secondary-color)")};
  color: ${(props) => (props.$primary ? "#fff" : "var(--text-color)")};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const InlineMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const EmptyState = styled.div`
  padding: 14px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  color: var(--text-muted-color);
  font-size: 12px;
  background: var(--secondary-color);
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldWide = styled(Field)`
  grid-column: 1 / -1;
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-color);
`;

export const Input = styled.input`
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  outline: none;
`;

export const ToggleRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

export const ToggleButton = styled.button`
  min-height: 40px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--primary-color) 10%, transparent)"
      : "var(--input-color)"};
  color: ${(props) => (props.$active ? "var(--primary-color)" : "var(--text-color)")};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const SkeletonCard = styled.div`
  height: 92px;
  border-radius: 12px;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.06) 50%,
      transparent 100%
    );
    animation: lessonTestSkeleton 1.2s infinite;
  }

  @keyframes lessonTestSkeleton {
    to {
      transform: translateX(100%);
    }
  }
`;
