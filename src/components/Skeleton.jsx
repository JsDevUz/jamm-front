import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    background-color: var(--border-color, #e0e0e0);
  }
  50% {
    background-color: var(--tertiary-color, #f5f5f5);
  }
  100% {
    background-color: var(--border-color, #e0e0e0);
  }
`;

export const Skeleton = styled.div`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "20px"};
  border-radius: ${(props) => props.borderRadius || "4px"};
  margin-bottom: ${(props) => props.mb || "8px"};
  animation: ${pulse} 1.5s ease-in-out infinite;
  display: ${(props) => props.display || "block"};
`;

export const SkeletonCircle = styled(Skeleton)`
  width: ${(props) => props.size || "40px"};
  height: ${(props) => props.size || "40px"};
  border-radius: 50%;
  margin-bottom: ${(props) => props.mb || "0"};
`;

export const SkeletonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.gap || "12px"};
  margin-bottom: ${(props) => props.mb || "16px"};
  width: 100%;
`;
