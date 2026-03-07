import React from "react";
import styled from "styled-components";

const MentionText = styled.button`
  pointer-events: auto;
  color: var(--primary-color);
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  border: none;
  background: transparent;

  &:hover {
    background: var(--active-color);
  }
`;

const MessageLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    border-bottom-color: var(--primary-color);
  }
`;

const parseMessageContent = (content) => {
  const mentionRegex = /@(\w+)/g;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = [];
  const matches = [];
  let lastIndex = 0;
  let match;

  while ((match = mentionRegex.exec(content)) !== null) {
    matches.push({
      type: "mention",
      index: match.index,
      length: match[0].length,
      username: match[1],
      content: match[0],
    });
  }

  while ((match = urlRegex.exec(content)) !== null) {
    matches.push({
      type: "url",
      index: match.index,
      length: match[0].length,
      url: match[0],
      content: match[0],
    });
  }

  matches.sort((left, right) => left.index - right.index);

  matches.forEach((entry) => {
    if (entry.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.substring(lastIndex, entry.index),
      });
    }

    parts.push(entry);
    lastIndex = entry.index + entry.length;
  });

  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      content: content.substring(lastIndex),
    });
  }

  return parts.length ? parts : [{ type: "text", content }];
};

export const renderChatMessageContent = (content, onMentionClick) => {
  return parseMessageContent(content).map((part, index) => {
    if (part.type === "mention") {
      return (
        <MentionText
          key={`${part.type}-${index}`}
          onClick={(event) => onMentionClick(part.username, event)}
        >
          {part.content}
        </MentionText>
      );
    }

    if (part.type === "url") {
      return (
        <MessageLink
          key={`${part.type}-${index}`}
          href={part.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part.content}
        </MessageLink>
      );
    }

    return <span key={`${part.type}-${index}`}>{part.content}</span>;
  });
};

