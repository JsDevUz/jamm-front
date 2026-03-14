import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Article = styled.div`
  color: var(--text-color);
  line-height: 1.8;
  word-break: break-word;

  h1,
  h2,
  h3 {
    margin: 1.4em 0 0.55em;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  h2 {
    font-size: clamp(1.45rem, 3vw, 2.1rem);
  }

  h3 {
    font-size: 1.2rem;
  }

  p,
  ul,
  ol,
  blockquote,
  pre {
    margin: 0 0 1.15em;
  }

  ul,
  ol {
    padding-left: 1.25rem;
  }

  li + li {
    margin-top: 0.4rem;
  }

  blockquote {
    margin-left: 0;
    padding: 0.95rem 1rem 0.95rem 1.1rem;
    border-left: 3px solid rgba(88, 101, 242, 0.55);
    color: var(--text-secondary-color);
    background: rgba(88, 101, 242, 0.06);
    border-radius: 0 16px 16px 0;
    font-style: italic;
  }

  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    background: rgba(17, 24, 39, 0.08);
    padding: 0.15rem 0.35rem;
    border-radius: 6px;
    font-size: 0.92em;
  }

  pre {
    background: #101827;
    color: #f8fafc;
    padding: 1rem 1.1rem;
    border-radius: 18px;
    overflow-x: auto;
  }

  pre code {
    background: transparent;
    padding: 0;
    color: inherit;
  }

  img {
    display: block;
    width: 100%;
    max-width: 100%;
    border-radius: 20px;
    margin: 1.2rem 0;
    object-fit: cover;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
  }

  a {
    color: #2d6cdf;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  hr {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 1.6rem 0;
  }
`;

const ImageButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
`;

const LightboxOverlay = styled.button`
  position: fixed;
  inset: 0;
  border: none;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(6px);
  z-index: 12000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: zoom-out;
`;

const LightboxImage = styled.img`
  max-width: min(94vw, 1600px);
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 18px;
  object-fit: contain;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
`;

const DropdownBlock = styled.details`
  margin: 0 0 1.2em;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
`;

const DropdownSummary = styled.summary`
  list-style: none;
  cursor: pointer;
  padding: 0.95rem 1rem;
  font-weight: 700;
  color: var(--text-color);
  background: rgba(148, 163, 184, 0.08);
  user-select: none;

  &::-webkit-details-marker {
    display: none;
  }
`;

const DropdownContent = styled.div`
  padding: 1rem 1rem 0.2rem;
`;

const INLINE_RE = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|_([^_]+)_)/g;

const renderInline = (text, keyPrefix) => {
  if (!text) return null;

  const parts = [];
  let lastIndex = 0;
  let match;
  let index = 0;

  while ((match = INLINE_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <React.Fragment key={`${keyPrefix}-${index++}`}>
          {text.slice(lastIndex, match.index)}
        </React.Fragment>,
      );
    }

    if (match[2] && match[3]) {
      parts.push(
        <a
          key={`${keyPrefix}-${index++}`}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
        >
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      parts.push(<code key={`${keyPrefix}-${index++}`}>{match[4]}</code>);
    } else if (match[5]) {
      parts.push(<strong key={`${keyPrefix}-${index++}`}>{match[5]}</strong>);
    } else if (match[6]) {
      parts.push(<em key={`${keyPrefix}-${index++}`}>{match[6]}</em>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(
      <React.Fragment key={`${keyPrefix}-${index++}`}>
        {text.slice(lastIndex)}
      </React.Fragment>,
    );
  }

  return parts;
};

const flushParagraph = (paragraphLines, blocks, keyRef) => {
  if (!paragraphLines.length) return;
  const text = paragraphLines.join(" ");
  blocks.push(<p key={`p-${keyRef.current++}`}>{renderInline(text, "p")}</p>);
  paragraphLines.length = 0;
};

const flushList = (listState, blocks, keyRef) => {
  if (!listState.items.length) return;
  const Tag = listState.type === "ol" ? "ol" : "ul";
  blocks.push(
    <Tag key={`list-${keyRef.current++}`}>
      {listState.items.map((item, index) => (
        <li key={`${listState.type}-${index}`}>
          {renderInline(item, `${listState.type}-${index}`)}
        </li>
      ))}
    </Tag>,
  );
  listState.type = null;
  listState.items = [];
};

const flushDropdown = (dropdownState, blocks, keyRef, options) => {
  if (!dropdownState.active) return;

  const content = buildBlocks(dropdownState.lines.join("\n"), options);
  blocks.push(
    <DropdownBlock key={`dropdown-${keyRef.current++}`}>
      <DropdownSummary>{dropdownState.title || "Dropdown"}</DropdownSummary>
      <DropdownContent>{content}</DropdownContent>
    </DropdownBlock>,
  );

  dropdownState.active = false;
  dropdownState.title = "";
  dropdownState.lines = [];
};

const buildBlocks = (markdown, options = {}) => {
  const { onImageClick } = options;
  const lines = String(markdown || "").replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  const paragraphLines = [];
  const listState = { type: null, items: [] };
  const dropdownState = { active: false, title: "", lines: [] };
  const keyRef = { current: 0 };

  let inCodeBlock = false;
  let codeLines = [];

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith(":::dropdown")) {
      flushParagraph(paragraphLines, blocks, keyRef);
      flushList(listState, blocks, keyRef);
      dropdownState.active = true;
      dropdownState.title = trimmed.replace(":::dropdown", "").trim();
      dropdownState.lines = [];
      return;
    }

    if (trimmed === ":::" && dropdownState.active) {
      flushParagraph(paragraphLines, blocks, keyRef);
      flushList(listState, blocks, keyRef);
      flushDropdown(dropdownState, blocks, keyRef, options);
      return;
    }

    if (dropdownState.active) {
      dropdownState.lines.push(line);
      return;
    }

    if (trimmed.startsWith("```")) {
      flushParagraph(paragraphLines, blocks, keyRef);
      flushList(listState, blocks, keyRef);

      if (inCodeBlock) {
        blocks.push(
          <pre key={`code-${keyRef.current++}`}>
            <code>{codeLines.join("\n")}</code>
          </pre>,
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (!trimmed) {
      flushParagraph(paragraphLines, blocks, keyRef);
      flushList(listState, blocks, keyRef);
      return;
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph(paragraphLines, blocks, keyRef);
      flushList(listState, blocks, keyRef);
      const level = headingMatch[1].length;
      const Tag = `h${level}`;
      blocks.push(
        <Tag key={`h-${keyRef.current++}`}>
          {renderInline(headingMatch[2], `h-${keyRef.current}`)}
        </Tag>,
      );
      return;
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      flushParagraph(paragraphLines, blocks, keyRef);
      flushList(listState, blocks, keyRef);
      const imageSrc = imageMatch[2];
      const imageAlt = imageMatch[1] || "Article image";
      const imageNode = (
        <img
          key={`img-node-${keyRef.current}`}
          src={imageSrc}
          alt={imageAlt}
        />
      );

      blocks.push(
        onImageClick ? (
          <ImageButton
            key={`img-${keyRef.current++}`}
            type="button"
            onClick={() => onImageClick({ src: imageSrc, alt: imageAlt })}
            aria-label="Rasmni kattalashtirish"
          >
            {imageNode}
          </ImageButton>
        ) : (
          React.cloneElement(imageNode, { key: `img-${keyRef.current++}` })
        ),
      );
      return;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph(paragraphLines, blocks, keyRef);
      flushList(listState, blocks, keyRef);
      blocks.push(<hr key={`hr-${keyRef.current++}`} />);
      return;
    }

    const quoteMatch = trimmed.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph(paragraphLines, blocks, keyRef);
      flushList(listState, blocks, keyRef);
      blocks.push(
        <blockquote key={`quote-${keyRef.current++}`}>
          {renderInline(quoteMatch[1], `quote-${keyRef.current}`)}
        </blockquote>,
      );
      return;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph(paragraphLines, blocks, keyRef);
      if (listState.type && listState.type !== "ol") {
        flushList(listState, blocks, keyRef);
      }
      listState.type = "ol";
      listState.items.push(orderedMatch[1]);
      return;
    }

    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      flushParagraph(paragraphLines, blocks, keyRef);
      if (listState.type && listState.type !== "ul") {
        flushList(listState, blocks, keyRef);
      }
      listState.type = "ul";
      listState.items.push(bulletMatch[1]);
      return;
    }

    flushList(listState, blocks, keyRef);
    paragraphLines.push(trimmed);
  });

  flushParagraph(paragraphLines, blocks, keyRef);
  flushList(listState, blocks, keyRef);
  flushDropdown(dropdownState, blocks, keyRef, options);

  if (inCodeBlock && codeLines.length) {
    blocks.push(
      <pre key={`code-${keyRef.current++}`}>
        <code>{codeLines.join("\n")}</code>
      </pre>,
    );
  }

  return blocks;
};

const MarkdownRenderer = ({ content, className, enableImageLightbox = false }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    if (!lightboxImage) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxImage]);

  return (
    <>
      <Article className={className}>
        {buildBlocks(content, {
          onImageClick: enableImageLightbox ? setLightboxImage : null,
        })}
      </Article>

      {lightboxImage && (
        <LightboxOverlay
          type="button"
          onClick={() => setLightboxImage(null)}
          aria-label="Rasmni yopish"
        >
          <LightboxImage
            src={lightboxImage.src}
            alt={lightboxImage.alt || "Article image"}
          />
        </LightboxOverlay>
      )}
    </>
  );
};

export default MarkdownRenderer;
