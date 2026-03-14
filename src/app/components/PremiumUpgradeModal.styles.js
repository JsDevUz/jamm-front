import styled from "styled-components";

export const Hero = styled.div`
  display: grid;
  gap: 8px;
`;

export const HeroRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const HeroTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--text-color);
`;

export const HeroText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted-color);
    display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  color: var(--text-muted-color);
`;

export const AlertBox = styled.div`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--warning-color) 22%, var(--border-color));
  background: color-mix(in srgb, var(--warning-color) 10%, transparent);
  color: var(--text-color);
  font-size: 12px;
  line-height: 1.5;
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const PlanCard = styled.div`
  border: 1px solid
    ${(props) =>
      props.$premium
        ? "color-mix(in srgb, var(--primary-color) 32%, var(--border-color))"
        : "var(--border-color)"};
  background: ${(props) =>
    props.$premium
      ? "color-mix(in srgb, var(--primary-color) 8%, var(--input-color))"
      : "var(--input-color)"};
  border-radius: 14px;
  padding: 14px;
  display: grid;
  gap: 10px;
  min-width: 0;
`;

export const PlanName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  color: ${(props) => (props.$premium ? "var(--primary-color)" : "var(--text-color)")};
`;

export const PlanMeta = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const SectionList = styled.div`
  display: grid;
  gap: 12px;
`;

export const SectionCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--input-color);
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  color: var(--text-color);
`;

export const SectionDescription = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--text-muted-color);
`;

export const LimitsTable = styled.div`
  display: grid;
`;
export const TableHeadCell = styled.div`
min-width: 0;
white-space: nowrap ;
text-align: ${(props) => (props.$alignRight ? "right" : "left")};
`;
export const TableHead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) 110px 110px;
  gap: 10px;
  padding: 9px 14px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted-color);
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr) 82px 82px;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) 110px 110px;
  gap: 10px;
  padding: 10px 14px;
  align-items: center;
  border-bottom: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr) 82px 82px;
  }
`;

export const RowLabel = styled.div`
  min-width: 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--text-color);
`;

export const RowValue = styled.div`
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  color: ${(props) =>
    props.$premium ? "var(--primary-color)" : "var(--text-secondary-color)"};
  text-align: right;
  white-space: nowrap;
`;

export const FooterNote = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  color: var(--text-muted-color);
`;
