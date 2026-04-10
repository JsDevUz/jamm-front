import React from "react";
import styled from "styled-components";

const SpinnerRoot = styled.span`
  display: inline-block;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 999px;
  border-style: solid;
  border-width: ${({ $thickness }) => `${$thickness}px`};
  border-color: currentColor currentColor currentColor transparent;
  animation: sharedUiSpinnerRotate 0.8s linear infinite;
  box-sizing: border-box;
  flex: 0 0 auto;

  @keyframes sharedUiSpinnerRotate {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function Spinner({
  size = 18,
  thickness,
  color = "currentColor",
  style,
  className,
  ...props
}) {
  const numericSize = Number(size) > 0 ? Number(size) : 18;
  const numericThickness =
    Number(thickness) > 0 ? Number(thickness) : Math.max(2, Math.round(numericSize / 9));

  return (
    <SpinnerRoot
      aria-hidden="true"
      $size={numericSize}
      $thickness={numericThickness}
      className={className}
      style={{ color, ...style }}
      {...props}
    />
  );
}
