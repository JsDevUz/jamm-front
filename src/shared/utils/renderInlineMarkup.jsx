import React from "react";

const INLINE_MARKUP_RE = /\*\*(.+?)\*\*|_(.+?)_/g;

export const renderInlineMarkup = (raw) => {
  if (!raw) return "";

  const parts = [];
  let key = 0;
  let lastIndex = 0;
  let match;

  while ((match = INLINE_MARKUP_RE.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{raw.slice(lastIndex, match.index)}</span>);
    }

    if (match[1] !== undefined) {
      parts.push(<strong key={key++}>{match[1]}</strong>);
    } else {
      parts.push(<em key={key++}>{match[2]}</em>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < raw.length) {
    parts.push(<span key={key++}>{raw.slice(lastIndex)}</span>);
  }

  return parts.length ? parts : raw;
};
