import React from "react";

const BadgeIcon = ({
  width = 20,
  height = 20,
  color = "#ff4fb3",
  className,
  style,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: "4px",
      filter: "drop-shadow(0 0 8px rgba(255, 79, 179, 0.28))",
      ...style,
    }}
  >
    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91-1.01-1.01-2.52-1.27-3.91-.81-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81-1.01 1.01-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91 1.01 1.01 2.52 1.27 3.91.81.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81 1.01-1.01 1.27-2.52.81-3.91 1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
  </svg>
);

const OfficalBadge = ({ width, height, color, className, style }) => {
  return (
    <BadgeIcon
      width={width}
      height={height}
      color={color}
      className={className}
      style={style}
    />
  );
};

export default OfficalBadge;
