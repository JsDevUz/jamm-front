import React from "react";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: var(--text-color);
  margin: 0;
`;

const CountBadge = styled.span`
  font-size: 14px;
  margin-top: 6px;
  color: var(--text-muted-color);
`;

const MobileBackBtn = styled.button`
  display: flex;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 4px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;

  // @media (max-width: 768px) {
  //   display: flex;
  // }
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: ${(props) => props.bgColor || "var(--primary-color)"};
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: absolute;
  right: 0;
`;

const CenterSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ArenaHeader = ({ title, count, limit, onBack, rightContent }) => {
  return (
    <HeaderRow style={{ justifyContent: "center", position: "relative" }}>
      <LeftSide style={{ position: "absolute", left: 0 }}>
        {onBack ? (
          <MobileBackBtn onClick={onBack}>
            <ArrowLeft size={20} />
          </MobileBackBtn>
        ) : (
          <div style={{ width: "40px" }}></div>
        )}
      </LeftSide>

      <CenterSide>
        <Title>{title}</Title>
        {count !== undefined && limit !== undefined && (
          <CountBadge>
            ({count}/{limit})
          </CountBadge>
        )}
      </CenterSide>

      <RightSide>{rightContent}</RightSide>
    </HeaderRow>
  );
};

export default ArenaHeader;
