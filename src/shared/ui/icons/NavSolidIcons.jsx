import React from "react";

function IconBase({ size = 20, color = "currentColor", children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { fill: color })
          : child,
      )}
    </svg>
  );
}

export function FeedSolidIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 2.75a2.5 2.5 0 0 0-1.77.73l-6.5 6.5A2.5 2.5 0 0 0 3 11.75v7A2.25 2.25 0 0 0 5.25 21H9.5a.75.75 0 0 0 .75-.75v-4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v4a.75.75 0 0 0 .75.75h4.25A2.25 2.25 0 0 0 21 18.75v-7a2.5 2.5 0 0 0-.73-1.77l-6.5-6.5A2.5 2.5 0 0 0 12 2.75Z" />
    </IconBase>
  );
}

export function ChatsSolidIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5.75 4A3.75 3.75 0 0 0 2 7.75v6A3.75 3.75 0 0 0 5.75 17.5h1.97c.3 0 .6.11.82.31l2.82 2.35c1.05.88 2.64.13 2.64-1.24v-.67c0-.41.34-.75.75-.75h2.5A3.75 3.75 0 0 0 21 13.75v-6A3.75 3.75 0 0 0 17.25 4H5.75Zm2 4.25c0-.41.34-.75.75-.75h6.5a.75.75 0 0 1 0 1.5H8.5a.75.75 0 0 1-.75-.75Zm0 3.5c0-.41.34-.75.75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z" />
    </IconBase>
  );
}

export function ArticlesSolidIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6 3.25A2.75 2.75 0 0 0 3.25 6v12A2.75 2.75 0 0 0 6 20.75h12A2.75 2.75 0 0 0 20.75 18V6A2.75 2.75 0 0 0 18 3.25H6Zm1.75 3.5c0-.41.34-.75.75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm0 4c0-.41.34-.75.75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm0 4c0-.41.34-.75.75-.75h4.5a.75.75 0 0 1 0 1.5H8.5a.75.75 0 0 1-.75-.75Z" />
      <path d="M15.75 3.25H18A2.75 2.75 0 0 1 20.75 6v9.25h-3.5A1.5 1.5 0 0 1 15.75 13.75V3.25Z" opacity="0.22" />
    </IconBase>
  );
}

export function CoursesSolidIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6 4.25A2.75 2.75 0 0 0 3.25 7v10A2.75 2.75 0 0 0 6 19.75h10A2.75 2.75 0 0 0 18.75 17V7A2.75 2.75 0 0 0 16 4.25H6Zm2 2.5c0-.41.34-.75.75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 8 6.75Zm0 3.5c0-.41.34-.75.75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 8 10.25Zm0 3.5c0-.41.34-.75.75-.75h2.75a.75.75 0 0 1 0 1.5H8.75a.75.75 0 0 1-.75-.75Z" />
      <path d="M18.75 8.25h.5A1.5 1.5 0 0 1 20.75 9.75v5.5a1.5 1.5 0 0 1-1.5 1.5h-.5v-8.5Z" opacity="0.28" />
    </IconBase>
  );
}

export function AdminSolidIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5.5 3A2.5 2.5 0 0 0 3 5.5v4A2.5 2.5 0 0 0 5.5 12h4A2.5 2.5 0 0 0 12 9.5v-4A2.5 2.5 0 0 0 9.5 3h-4Zm9 0A2.5 2.5 0 0 0 12 5.5v4a2.5 2.5 0 0 0 2.5 2.5h4A2.5 2.5 0 0 0 21 9.5v-4A2.5 2.5 0 0 0 18.5 3h-4Zm-9 9A2.5 2.5 0 0 0 3 14.5v4A2.5 2.5 0 0 0 5.5 21h4a2.5 2.5 0 0 0 2.5-2.5v-4A2.5 2.5 0 0 0 9.5 12h-4Zm9 0a2.5 2.5 0 0 0-2.5 2.5v4a2.5 2.5 0 0 0 2.5 2.5h4a2.5 2.5 0 0 0 2.5-2.5v-4a2.5 2.5 0 0 0-2.5-2.5h-4Z" />
    </IconBase>
  );
}
