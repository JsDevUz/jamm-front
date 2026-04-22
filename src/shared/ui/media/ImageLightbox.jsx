import React, { useEffect } from "react";
import styled from "styled-components";
import { X } from "lucide-react";

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

const CloseButton = styled.button`
  position: absolute;
  top: max(18px, calc(18px + env(safe-area-inset-top, 0px)));
  right: max(18px, calc(18px + env(safe-area-inset-right, 0px)));
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition:
    transform 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.2);
  }
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
      <CloseButton
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose?.();
        }}
        aria-label="Rasmni yopish"
      >
        <X size={20} />
      </CloseButton>
      <Image
        src={src}
        alt={alt || "Image preview"}
        onClick={(event) => event.stopPropagation()}
      />
    </Overlay>
  );
}
