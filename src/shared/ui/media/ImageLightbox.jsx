import React, { useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.button`
  position: fixed;
  inset: 0;
  border: none;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 12000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: zoom-out;
`;

const Image = styled.img`
  max-width: min(92vw, 1080px);
  max-height: 92vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.02);
`;

export default function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!src) return null;

  return (
    <Overlay type="button" onClick={onClose} aria-label="Rasmni yopish">
      <Image
        src={src}
        alt={alt || "Image preview"}
        onClick={(event) => event.stopPropagation()}
      />
    </Overlay>
  );
}
