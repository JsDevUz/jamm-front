import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHotkeys } from "react-hotkeys-hook";
import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";
import {
  ArrowLeft,
  Eraser,
  Loader2,
  Maximize,
  Minimize2,
  Minus,
  Pencil,
  Plus,
  Redo2,
  Trash2,
  Type,
  Undo2,
  X,
} from "lucide-react";
import { TbVacuumCleaner } from "react-icons/tb";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../../shared/ui/dialogs/ModalShell";

const WHITEBOARD_APPEND_BATCH_LIMIT = 24;
const WHITEBOARD_SWATCHES = [
  "#0f172a",
  "#dc2626",
  "#2563eb",
  "#059669",
  "#d97706",
  "#7c3aed",
];
const WHITEBOARD_BOARD_TAB_ID = "board";
const WHITEBOARD_MIN_ZOOM = 0.5;
const WHITEBOARD_MAX_ZOOM = 3;
const WHITEBOARD_MIN_PDF_RENDER_WIDTH = 120;
const WHITEBOARD_PDF_RENDER_VERSION = "v3";
const WHITEBOARD_MAX_TEXT_CHARS = 240;

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url,
).toString();

const clampUnit = (value) => Math.min(1, Math.max(0, value));
const getSelectedPagesKey = (selectedPages) =>
  Array.isArray(selectedPages) && selectedPages.length > 0
    ? selectedPages.join(",")
    : "__all__";

const createWhiteboardStrokeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `wb-${crypto.randomUUID()}`;
  }

  return `wb-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
};

const getDistanceToSegment = (point, start, end) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  if (dx === 0 && dy === 0) {
    return Math.hypot(point.x - start.x, point.y - start.y);
  }

  const t = Math.max(
    0,
    Math.min(
      1,
      ((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy),
    ),
  );
  const projectedX = start.x + t * dx;
  const projectedY = start.y + t * dy;

  return Math.hypot(point.x - projectedX, point.y - projectedY);
};

const drawStroke = (ctx, stroke, width, height) => {
  const points = Array.isArray(stroke?.points) ? stroke.points : [];
  if (points.length === 0) {
    return;
  }

  if (stroke?.tool === "text") {
    const point = points[0];
    const rawText =
      typeof stroke?.text === "string" ? stroke.text.slice(0, WHITEBOARD_MAX_TEXT_CHARS) : "";
    const text = rawText.trim();
    if (!text) {
      return;
    }

    const fontSize = Math.max(16, Math.round((Number(stroke?.size) || 4) * 4));
    const lineHeight = Math.round(fontSize * 1.24);
    const lines = text.split(/\r?\n/);

    ctx.save();
    ctx.font = `700 ${fontSize}px sans-serif`;
    ctx.fillStyle = stroke?.color || "#0f172a";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    lines.forEach((line, index) => {
      ctx.fillText(line, point.x * width, point.y * height + index * lineHeight);
    });
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(2, Number(stroke?.size) || 4);
  ctx.globalCompositeOperation =
    stroke?.tool === "eraser" ? "destination-out" : "source-over";
  ctx.strokeStyle = stroke?.tool === "eraser" ? "#000000" : stroke?.color || "#0f172a";
  ctx.fillStyle = stroke?.tool === "eraser" ? "#000000" : stroke?.color || "#0f172a";

  if (points.length === 1) {
    const point = points[0];
    ctx.beginPath();
    ctx.arc(point.x * width, point.y * height, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x * width, points[0].y * height);
  points.slice(1).forEach((point) => {
    ctx.lineTo(point.x * width, point.y * height);
  });
  ctx.stroke();
  ctx.restore();
};

const getPdfTabPageStrokes = (tab, pageNumber) =>
  tab?.pages?.find((page) => page.pageNumber === pageNumber)?.strokes || [];

const formatPdfLibraryDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatPdfLibrarySize = (bytes) => {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${parseFloat((bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1))} ${units[index]}`;
};

const resolvePdfPageRotation = (page) => {
  const rotation = Number(page?.rotate);
  if (!Number.isFinite(rotation)) {
    return 0;
  }

  const normalizedRotation = ((Math.round(rotation) % 360) + 360) % 360;
  return [0, 90, 180, 270].includes(normalizedRotation) ? normalizedRotation : 0;
};

const waitForAnimationFrame = () =>
  new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      resolve();
    });
  });

const measureTextStrokeBounds = (ctx, stroke, width, height) => {
  const points = Array.isArray(stroke?.points) ? stroke.points : [];
  const point = points[0];
  const rawText =
    typeof stroke?.text === "string" ? stroke.text.slice(0, WHITEBOARD_MAX_TEXT_CHARS) : "";
  const text = rawText.trim();
  if (!ctx || !point || !text) {
    return null;
  }

  const fontSize = Math.max(16, Math.round((Number(stroke?.size) || 4) * 4));
  const lineHeight = Math.round(fontSize * 1.24);
  const lines = text.split(/\r?\n/);

  ctx.save();
  ctx.font = `700 ${fontSize}px sans-serif`;
  const textWidth = lines.reduce((maxWidth, line) => {
    const metrics = ctx.measureText(line || " ");
    return Math.max(maxWidth, metrics.width);
  }, 0);
  ctx.restore();

  return {
    left: point.x * width,
    top: point.y * height,
    right: point.x * width + textWidth,
    bottom: point.y * height + lines.length * lineHeight,
  };
};

const TileRoot = styled.div`
  position: relative;
  border-radius: ${(p) => (p.$compact ? "20px" : "14px")};
  overflow: hidden;
  background: var(--call-panel);
  min-width: 0;
  min-height: 0;
  height: 100%;
  isolation: isolate;
  border: 2px solid
    ${(p) =>
      p.$active
        ? "color-mix(in srgb, var(--call-primary) 72%, transparent)"
        : "var(--call-border)"};
  box-shadow: ${(p) =>
    p.$active ? "0 0 0 1px rgba(255,255,255,0.12), 0 18px 36px rgba(0,0,0,0.24)" : "none"};
  cursor: ${(p) => (p.$clickable ? "pointer" : "default")};
  transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: ${(p) => (p.$clickable ? "translateY(-1px)" : "none")};
    border-color: ${(p) =>
      p.$active
        ? "color-mix(in srgb, var(--call-primary) 84%, white 8%)"
        : "color-mix(in srgb, var(--call-primary) 42%, transparent)"};
  }
`;

const FullscreenBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.55);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 5px;
  cursor: pointer;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transition: opacity 0.15s;
  z-index: 7;

  &:hover {
    background: rgba(15, 23, 42, 0.8);
  }

  @media (max-width: 768px) {
    opacity: 1;
  }
`;

const WorkspaceShell = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at top left, rgba(255,255,255,0.06), transparent 36%),
    linear-gradient(180deg, #fbfbfd, #f3f5f8);
`;

const WorkspaceChrome = styled.div`
  position: relative;
  z-index: 5;
  padding: 12px 12px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TabsBar = styled.div`
  display: flex;
  align-items: flex-end;
  min-width: 0;
`;

const TabsScroller = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: flex-end;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 2px;
  padding-right: 2px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const WorkspaceTabButton = styled.button`
  border: 1px solid
    ${(p) =>
      p.$active
        ? "rgba(15, 23, 42, 0.14)"
        : "rgba(15, 23, 42, 0.08)"};
  background: ${(p) =>
    p.$active
      ? "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(247,248,250,0.98))"
      : "linear-gradient(180deg, rgba(239,241,245,0.95), rgba(228,232,238,0.95))"};
  color: var(--call-text);
  border-radius: 14px 14px 0 0;
  min-width: 120px;
  max-width: 220px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  cursor: ${(p) => (p.$disabled ? "default" : "pointer")};
  box-shadow: ${(p) => (p.$active ? "0 -1px 0 rgba(255,255,255,0.7) inset" : "none")};
  opacity: ${(p) => (p.$disabled && !p.$active ? 0.82 : 1)};
  transform: translateY(${(p) => (p.$active ? "1px" : "0")});
`;

const TabTitle = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 700;
`;

const TabCloseButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: rgba(15, 23, 42, 0.6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: rgba(15, 23, 42, 0.08);
    color: rgba(15, 23, 42, 0.86);
  }
`;

const AddTabButton = styled.button`
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.92);
  color: var(--call-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const ToolButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid
    ${(p) =>
      p.$active
        ? "color-mix(in srgb, var(--call-primary) 48%, transparent)"
        : "rgba(15, 23, 42, 0.08)"};
  background: ${(p) =>
    p.$active
      ? "color-mix(in srgb, var(--call-primary) 12%, white 88%)"
      : "rgba(255, 255, 255, 0.9)"};
  color: ${(p) => (p.$danger ? "var(--call-danger)" : "var(--call-text)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SwatchButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: 2px solid ${(p) => (p.$active ? "#0f172a" : "rgba(255,255,255,0.86)")};
  background: ${(p) => p.$swatch};
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.14);
`;

const SliderWrap = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(15, 23, 42, 0.74);
  font-size: 12px;
  font-weight: 700;

  input {
    width: 112px;
  }
`;

const ZoomReadout = styled.div`
  min-width: 58px;
  text-align: center;
  font-size: 12px;
  font-weight: 800;
  color: rgba(15, 23, 42, 0.72);
`;

const WorkspaceBody = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  padding: ${(p) => (p.$compact ? "0" : "10px 10px 10px")};
`;

const BoardSurface = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 0 18px 18px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.98), rgba(247,248,250,0.98)),
    linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
    linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px);
  background-size: auto, 32px 32px, 32px 32px;
  overflow: hidden;
`;

const PdfViewport = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: ${(p) => (p.$interactive ? "auto" : "hidden")};
  overflow-x: ${(p) => (p.$allowHorizontal ? "auto" : "hidden")};
  border-radius: 0 0 18px 18px;
  background:
    linear-gradient(180deg, rgba(239,242,247,0.98), rgba(228,232,238,0.98)),
    radial-gradient(circle at top, rgba(255,255,255,0.38), transparent 45%);
  padding: 20px;
  overscroll-behavior: contain;
  touch-action: ${(p) => (p.$interactive ? "pan-x pan-y" : "none")};
`;

const PdfStack = styled.div`
  width: max-content;
  min-width: 100%;
  max-width: none;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

const PdfPageFrame = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.14);
`;

const PdfPageCanvas = styled.canvas`
  display: block;
  width: 100%;
  height: auto;
`;

const PdfPagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background:
    linear-gradient(135deg, rgba(239,242,247,0.95), rgba(224,228,236,0.98)),
    linear-gradient(90deg, rgba(255,255,255,0.3), transparent 42%);
`;

const StrokeLayerRoot = styled.div`
  position: absolute;
  inset: 0;
`;

const StrokeCanvasEl = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
  pointer-events: ${(p) => (p.$interactive ? "auto" : "none")};
  cursor: ${(p) =>
    p.$interactive
      ? p.$tool === "eraser"
        ? "cell"
        : p.$tool === "text"
          ? "text"
          : "crosshair"
      : "default"};
`;

const TextDraftPopover = styled.div`
  position: absolute;
  z-index: 6;
  min-width: 180px;
  max-width: min(360px, calc(100% - 24px));
  transform: translate(-8px, -8px);
`;

const TextDraftInput = styled.textarea`
  width: 100%;
  min-height: 72px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--call-primary) 44%, transparent);
  background: rgba(255, 255, 255, 0.96);
  color: var(--call-text);
  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.16);
  resize: none;
  outline: none;
  font: 700 16px/1.35 inherit;
`;

const TileLabel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  color: white;
  font-size: ${(p) => (p.$compact ? "11px" : "12px")};
  font-weight: 600;
  padding: ${(p) => (p.$compact ? "4px 8px" : "3px 10px")};
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  max-width: calc(100% - 20px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 6;
`;

const EmptyState = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: rgba(15, 23, 42, 0.58);
  font-size: ${(p) => (p.$compact ? "11px" : "13px")};
  font-weight: 600;
  text-align: center;
  pointer-events: none;
`;

const PdfStatus = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  color: rgba(15, 23, 42, 0.68);
  font-size: 14px;
  font-weight: 700;
`;

const PageBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 4;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.64);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  backdrop-filter: blur(6px);
`;

const HiddenInput = styled.input`
  display: none;
`;

const PdfLibraryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

const PdfLibraryCard = styled.button`
  min-height: 124px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.98);
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  transition: transform 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 28px rgba(15, 23, 42, 0.12);
  }
`;

const PdfLibraryTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--call-text);
  line-height: 1.35;
  word-break: break-word;
`;

const PdfLibraryMeta = styled.div`
  font-size: 12px;
  color: rgba(15, 23, 42, 0.62);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PdfUploadCard = styled(PdfLibraryCard)`
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgba(15, 23, 42, 0.72);
  border-style: dashed;
`;

const PdfLibraryEmpty = styled.div`
  padding: 12px 4px 2px;
  color: rgba(15, 23, 42, 0.62);
  font-size: 13px;
  font-weight: 600;
`;

const PdfPickerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

const PdfPickerMeta = styled.div`
  font-size: 12px;
  color: rgba(15, 23, 42, 0.62);
`;

const PageSelectionToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const PageSelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(182px, 1fr));
  gap: 14px;
`;

const PagePreviewCard = styled.button`
  position: relative;
  border-radius: 18px;
  border: 1px solid
    ${(p) =>
      p.$active
        ? "color-mix(in srgb, var(--call-primary) 48%, transparent)"
        : "rgba(15, 23, 42, 0.08)"};
  background: ${(p) =>
    p.$active
      ? "color-mix(in srgb, var(--call-primary) 12%, white 88%)"
      : "rgba(255,255,255,0.96)"};
  color: var(--call-text);
  cursor: pointer;
  overflow: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: ${(p) =>
    p.$active ? "0 16px 30px rgba(59, 130, 246, 0.14)" : "0 12px 24px rgba(15, 23, 42, 0.08)"};
  transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${(p) =>
      p.$active ? "0 18px 34px rgba(59, 130, 246, 0.18)" : "0 16px 28px rgba(15, 23, 42, 0.12)"};
  }
`;

const PagePreviewViewport = styled.div`
  position: relative;
  width: 100%;
  min-height: 224px;
  border-radius: 14px;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(241,245,249,0.98), rgba(226,232,240,0.98)),
    linear-gradient(135deg, rgba(255,255,255,0.32), transparent 42%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PagePreviewCanvas = styled.canvas`
  display: block;
  width: 100%;
  height: auto;
  background: #fff;
`;

const PagePreviewPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(15, 23, 42, 0.44);
  font-size: 13px;
  font-weight: 800;
`;

const PagePreviewFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const PagePreviewNumber = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: var(--call-text);
`;

const PagePreviewStatus = styled.div`
  font-size: 11px;
  font-weight: 800;
  color: ${(p) => (p.$active ? "var(--call-primary)" : "rgba(15, 23, 42, 0.46)")};
`;

const PdfPickerPageCard = ({ pdfDocument, pageNumber, active = false, onClick }) => {
  const { t, i18n } = useTranslation();
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(pageNumber <= 6);
  const [renderState, setRenderState] = useState("idle");
  const locale = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const fallbackCopy =
    locale === "uz"
      ? {
          pageLabel: `${pageNumber}-sahifa`,
          selected: "Tanlangan",
          select: "Tanlash",
        }
      : locale === "ru"
        ? {
            pageLabel: `${pageNumber} стр.`,
            selected: "Выбрано",
            select: "Выбрать",
          }
        : {
            pageLabel: `Page ${pageNumber}`,
            selected: "Selected",
            select: "Select",
          };
  const rawPageLabel = t("groupCall.whiteboard.pageShort", { current: pageNumber });
  const rawSelectedLabel = t("groupCall.whiteboard.pageSelected");
  const rawSelectLabel = t("groupCall.whiteboard.pageSelect");
  const pageLabel =
    !rawPageLabel ||
    rawPageLabel === "groupCall.whiteboard.pageShort" ||
    rawPageLabel.includes("{{")
      ? fallbackCopy.pageLabel
      : rawPageLabel;
  const selectedLabel =
    !rawSelectedLabel || rawSelectedLabel === "groupCall.whiteboard.pageSelected"
      ? fallbackCopy.selected
      : rawSelectedLabel;
  const selectLabel =
    !rawSelectLabel || rawSelectLabel === "groupCall.whiteboard.pageSelect"
      ? fallbackCopy.select
      : rawSelectLabel;

  useEffect(() => {
    const element = cardRef.current;
    if (!element || isVisible) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nextEntry = entries[0];
        if (!nextEntry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        rootMargin: "240px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  useEffect(() => {
    let disposed = false;

    const renderPage = async () => {
      if (!pdfDocument || !isVisible) {
        return;
      }

      setRenderState("loading");

      try {
        const page = await pdfDocument.getPage(pageNumber);
        if (disposed) {
          return;
        }

        const baseViewport = page.getViewport({
          scale: 1,
          rotation: resolvePdfPageRotation(page),
        });
        const targetWidth = 180;
        const scale = targetWidth / Math.max(1, baseViewport.width);
        const viewport = page.getViewport({
          scale,
          rotation: resolvePdfPageRotation(page),
        });
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) {
          return;
        }

        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.round(viewport.width * pixelRatio);
        canvas.height = Math.round(viewport.height * pixelRatio);
        canvas.style.width = `${Math.round(viewport.width)}px`;
        canvas.style.height = `${Math.round(viewport.height)}px`;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.clearRect(0, 0, viewport.width, viewport.height);

        const renderTask = page.render({
          canvasContext: context,
          viewport,
        });
        await renderTask.promise;

        if (!disposed) {
          setRenderState("ready");
        }
      } catch (error) {
        if (!disposed) {
          setRenderState("error");
        }
      }
    };

    renderPage();

    return () => {
      disposed = true;
    };
  }, [isVisible, pageNumber, pdfDocument]);

  return (
    <PagePreviewCard ref={cardRef} type="button" $active={active} onClick={onClick}>
      <PagePreviewViewport>
        <PagePreviewCanvas ref={canvasRef} />
        {renderState !== "ready" ? (
          <PagePreviewPlaceholder>
            {renderState === "loading" ? <Loader2 size={18} className="spin" /> : pageNumber}
          </PagePreviewPlaceholder>
        ) : null}
      </PagePreviewViewport>
      <PagePreviewFooter>
        <PagePreviewNumber>{pageLabel}</PagePreviewNumber>
        <PagePreviewStatus $active={active}>
          {active ? selectedLabel : selectLabel}
        </PagePreviewStatus>
      </PagePreviewFooter>
    </PagePreviewCard>
  );
};

const StrokeCanvas = ({
  strokes,
  interactive = false,
  tool = "pen",
  color = "#0f172a",
  brushSize = 4,
  textPlaceholder = "Text",
  tabId,
  pageNumber,
  onStrokeStart,
  onStrokeAppend,
  onStrokeRemove,
}) => {
  const canvasRef = useRef(null);
  const surfaceRef = useRef(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const pointerStateRef = useRef(null);
  const pendingPointsRef = useRef([]);
  const flushTimeoutRef = useRef(null);
  const textInputRef = useRef(null);
  const [textDraft, setTextDraft] = useState(null);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const { width, height } = canvasSizeRef.current;
    if (!canvas || width <= 0 || height <= 0) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, width, height);
    (Array.isArray(strokes) ? strokes : []).forEach((stroke) => {
      drawStroke(ctx, stroke, width, height);
    });
  }, [strokes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const surface = surfaceRef.current;
    if (!canvas || !surface) {
      return undefined;
    }

    const resizeCanvas = () => {
      const rect = surface.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const ratio = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      canvasSizeRef.current = { width, height };
      redrawCanvas();
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(surface);

    return () => {
      resizeObserver.disconnect();
    };
  }, [redrawCanvas]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  useEffect(() => {
    if (tool !== "text") {
      setTextDraft(null);
    }
  }, [tool]);

  useEffect(() => {
    if (textDraft) {
      window.setTimeout(() => {
        textInputRef.current?.focus();
      }, 0);
    }
  }, [textDraft]);

  const flushPendingPoints = useCallback(() => {
    const activeStroke = pointerStateRef.current;
    if (!activeStroke || pendingPointsRef.current.length === 0) {
      return;
    }

    while (pendingPointsRef.current.length > 0) {
      const pointsBatch = pendingPointsRef.current.splice(
        0,
        WHITEBOARD_APPEND_BATCH_LIMIT,
      );
      onStrokeAppend?.({
        tabId,
        pageNumber,
        strokeId: activeStroke.strokeId,
        points: pointsBatch,
      });
    }
  }, [onStrokeAppend, pageNumber, tabId]);

  const scheduleFlush = useCallback(() => {
    if (flushTimeoutRef.current || pendingPointsRef.current.length === 0) {
      return;
    }

    flushTimeoutRef.current = window.setTimeout(() => {
      flushTimeoutRef.current = null;
      flushPendingPoints();
    }, 24);
  }, [flushPendingPoints]);

  useEffect(
    () => () => {
      if (flushTimeoutRef.current) {
        window.clearTimeout(flushTimeoutRef.current);
      }
    },
    [],
  );

  const resolvePoint = useCallback((event) => {
    const surface = surfaceRef.current;
    if (!surface) {
      return null;
    }

    const rect = surface.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return null;
    }

    return {
      x: clampUnit((event.clientX - rect.left) / rect.width),
      y: clampUnit((event.clientY - rect.top) / rect.height),
    };
  }, []);

  const findTouchedStrokeId = useCallback(
    (point) => {
      const { width, height } = canvasSizeRef.current;
      if (!width || !height) {
        return null;
      }

      const pointerPx = {
        x: point.x * width,
        y: point.y * height,
      };

      for (let index = strokes.length - 1; index >= 0; index -= 1) {
        const stroke = strokes[index];
        const strokePoints = Array.isArray(stroke?.points) ? stroke.points : [];
        if (strokePoints.length === 0) {
          continue;
        }

        const hitPadding = Math.max(8, (Number(stroke.size) || 4) / 2 + 6);
        if (stroke?.tool === "text") {
          const measureCtx = canvasRef.current?.getContext("2d");
          const bounds = measureTextStrokeBounds(measureCtx, stroke, width, height);
          if (
            bounds &&
            pointerPx.x >= bounds.left - hitPadding &&
            pointerPx.x <= bounds.right + hitPadding &&
            pointerPx.y >= bounds.top - hitPadding &&
            pointerPx.y <= bounds.bottom + hitPadding
          ) {
            return stroke.id;
          }
          continue;
        }

        if (strokePoints.length === 1) {
          const singlePoint = {
            x: strokePoints[0].x * width,
            y: strokePoints[0].y * height,
          };
          if (Math.hypot(pointerPx.x - singlePoint.x, pointerPx.y - singlePoint.y) <= hitPadding) {
            return stroke.id;
          }
          continue;
        }

        for (let pointIndex = 1; pointIndex < strokePoints.length; pointIndex += 1) {
          const start = {
            x: strokePoints[pointIndex - 1].x * width,
            y: strokePoints[pointIndex - 1].y * height,
          };
          const end = {
            x: strokePoints[pointIndex].x * width,
            y: strokePoints[pointIndex].y * height,
          };

          if (getDistanceToSegment(pointerPx, start, end) <= hitPadding) {
            return stroke.id;
          }
        }
      }

      return null;
    },
    [strokes],
  );

  const eraseWholeStrokeAtPoint = useCallback(
    (point) => {
      const activePointer = pointerStateRef.current;
      if (!activePointer) {
        return;
      }

      const strokeId = findTouchedStrokeId(point);
      if (!strokeId || activePointer.removedStrokeIds?.has(strokeId)) {
        return;
      }

      activePointer.removedStrokeIds?.add(strokeId);
      onStrokeRemove?.({ tabId, pageNumber, strokeId });
    },
    [findTouchedStrokeId, onStrokeRemove, pageNumber, tabId],
  );

  const stopDrawing = useCallback(
    (event) => {
      if (
        !pointerStateRef.current ||
        (event?.pointerId && pointerStateRef.current.pointerId !== event.pointerId)
      ) {
        return;
      }

      if (flushTimeoutRef.current) {
        window.clearTimeout(flushTimeoutRef.current);
        flushTimeoutRef.current = null;
      }
      flushPendingPoints();

      const canvas = canvasRef.current;
      if (canvas && event?.pointerId) {
        try {
          canvas.releasePointerCapture(event.pointerId);
        } catch {}
      }

      pointerStateRef.current = null;
    },
    [flushPendingPoints],
  );

  const commitTextDraft = useCallback(() => {
    if (!interactive || !textDraft) {
      setTextDraft(null);
      return;
    }

    const nextText =
      typeof textDraft.value === "string"
        ? textDraft.value.replace(/\s+$/g, "").slice(0, WHITEBOARD_MAX_TEXT_CHARS)
        : "";
    if (!nextText.trim()) {
      setTextDraft(null);
      return;
    }

    onStrokeStart?.({
      tabId,
      pageNumber,
      strokeId: createWhiteboardStrokeId(),
      tool: "text",
      color,
      size: brushSize,
      point: textDraft.point,
      text: nextText,
    });
    setTextDraft(null);
  }, [brushSize, color, interactive, onStrokeStart, pageNumber, tabId, textDraft]);

  const handlePointerDown = useCallback(
    (event) => {
      if (!interactive || event.button !== 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const point = resolvePoint(event);
      if (!point) {
        return;
      }

      if (tool === "text") {
        setTextDraft({
          point,
          value: "",
        });
        return;
      }

      if (tool === "stroke-eraser") {
        pointerStateRef.current = {
          pointerId: event.pointerId,
          strokeId: null,
          removedStrokeIds: new Set(),
        };

        canvasRef.current?.setPointerCapture?.(event.pointerId);
        eraseWholeStrokeAtPoint(point);
        return;
      }

      const strokeId = createWhiteboardStrokeId();
      pointerStateRef.current = {
        pointerId: event.pointerId,
        strokeId,
        removedStrokeIds: null,
      };
      pendingPointsRef.current = [];

      canvasRef.current?.setPointerCapture?.(event.pointerId);
      onStrokeStart?.({
        tabId,
        pageNumber,
        strokeId,
        tool,
        color,
        size: brushSize,
        point,
      });
    },
    [
      brushSize,
      color,
      eraseWholeStrokeAtPoint,
      interactive,
      onStrokeStart,
      pageNumber,
      resolvePoint,
      tabId,
      tool,
    ],
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (
        !interactive ||
        !pointerStateRef.current ||
        pointerStateRef.current.pointerId !== event.pointerId
      ) {
        return;
      }

      if (typeof event.buttons === "number" && (event.buttons & 1) !== 1) {
        stopDrawing(event);
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const point = resolvePoint(event);
      if (!point) {
        return;
      }

      if (tool === "stroke-eraser") {
        eraseWholeStrokeAtPoint(point);
        return;
      }

      const lastPoint =
        pendingPointsRef.current[pendingPointsRef.current.length - 1] || null;
      if (lastPoint && lastPoint.x === point.x && lastPoint.y === point.y) {
        return;
      }

      pendingPointsRef.current.push(point);
      if (pendingPointsRef.current.length >= WHITEBOARD_APPEND_BATCH_LIMIT) {
        flushPendingPoints();
        return;
      }

      scheduleFlush();
    },
    [
      eraseWholeStrokeAtPoint,
      flushPendingPoints,
      interactive,
      resolvePoint,
      scheduleFlush,
      stopDrawing,
      tool,
    ],
  );

  useEffect(() => {
    if (!interactive) {
      return undefined;
    }

    const handleWindowPointerEnd = () => {
      if (!pointerStateRef.current) {
        return;
      }

      stopDrawing({
        pointerId: pointerStateRef.current.pointerId,
      });
    };

    window.addEventListener("pointerup", handleWindowPointerEnd);
    window.addEventListener("pointercancel", handleWindowPointerEnd);

    return () => {
      window.removeEventListener("pointerup", handleWindowPointerEnd);
      window.removeEventListener("pointercancel", handleWindowPointerEnd);
    };
  }, [interactive, stopDrawing]);

  return (
    <StrokeLayerRoot ref={surfaceRef}>
      <StrokeCanvasEl
        ref={canvasRef}
        $interactive={interactive}
        $tool={tool}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrawing}
        onPointerCancel={stopDrawing}
      />
      {interactive && tool === "text" && textDraft ? (
        <TextDraftPopover
          style={{
            left: `${textDraft.point.x * 100}%`,
            top: `${textDraft.point.y * 100}%`,
          }}
        >
          <TextDraftInput
            ref={textInputRef}
            value={textDraft.value}
            maxLength={WHITEBOARD_MAX_TEXT_CHARS}
            placeholder={textPlaceholder}
            onChange={(event) => {
              const nextValue = event.target.value.slice(0, WHITEBOARD_MAX_TEXT_CHARS);
              setTextDraft((prev) => (prev ? { ...prev, value: nextValue } : prev));
            }}
            onBlur={commitTextDraft}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                setTextDraft(null);
                return;
              }

              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                commitTextDraft();
              }
            }}
          />
        </TextDraftPopover>
      ) : null}
    </StrokeLayerRoot>
  );
};

const WhiteboardTile = ({
  label,
  workspace,
  compact = false,
  interactive = false,
  isActive = false,
  isMobile = false,
  canFullscreen = false,
  isFullscreen = false,
  onToggleFullscreen,
  onSelect,
  tool = "pen",
  color = "#0f172a",
  brushSize = 4,
  onToolChange,
  onColorChange,
  onBrushSizeChange,
  onClear,
  onClearPage,
  onUndo,
  onRedo,
  onStrokeStart,
  onStrokeAppend,
  onStrokeRemove,
  onTabActivate,
  onPdfUpload,
  onPdfOpen,
  onTabRemove,
  onPdfViewportChange,
  showToolbar = false,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const pdfViewportRef = useRef(null);
  const scrollSyncRef = useRef({ lock: false, timeoutId: null, lastTabId: "" });
  const pdfDocumentRef = useRef(null);
  const pdfPickerDocumentRef = useRef(null);
  const pdfPickerDocumentKeyRef = useRef("");
  const pdfObserverRef = useRef(null);
  const pdfPageCountCacheRef = useRef({});
  const pinchStateRef = useRef({
    active: false,
    distance: 0,
    zoom: 1,
  });
  const zoomFrameRef = useRef(0);
  const [pdfMeta, setPdfMeta] = useState({
    status: "idle",
    fileUrl: "",
    selectedPagesKey: "__all__",
    pages: [],
    error: "",
  });
  const [pdfUploadPending, setPdfUploadPending] = useState(false);
  const [pdfRenderWidth, setPdfRenderWidth] = useState(0);
  const [currentPdfPage, setCurrentPdfPage] = useState(1);
  const [isPdfLibraryOpen, setIsPdfLibraryOpen] = useState(false);
  const [visiblePdfPages, setVisiblePdfPages] = useState([]);
  const [pdfPageMetrics, setPdfPageMetrics] = useState({});
  const [pdfPickerState, setPdfPickerState] = useState({
    status: "idle",
    item: null,
    pageCount: 0,
    selectedPages: [],
    error: "",
  });

  const tabs = Array.isArray(workspace?.tabs) ? workspace.tabs : [];
  const pdfLibrary = Array.isArray(workspace?.pdfLibrary) ? workspace.pdfLibrary : [];
  const activeTab =
    tabs.find((tab) => tab.id === workspace?.activeTabId) ||
    tabs.find((tab) => tab.id === WHITEBOARD_BOARD_TAB_ID) ||
    null;
  const boardTab = tabs.find((tab) => tab.id === WHITEBOARD_BOARD_TAB_ID) || null;
  const hasBoardStrokes = Array.isArray(boardTab?.strokes) && boardTab.strokes.length > 0;
  const activePdfZoom =
    activeTab?.type === "pdf"
      ? Math.min(WHITEBOARD_MAX_ZOOM, Math.max(WHITEBOARD_MIN_ZOOM, Number(activeTab.zoom) || 1))
      : 1;
  const activePdfWidth =
    activeTab?.type === "pdf" && pdfRenderWidth > 0
      ? Math.max(
          WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          Math.round(pdfRenderWidth * activePdfZoom),
        )
      : Math.max(WHITEBOARD_MIN_PDF_RENDER_WIDTH, pdfRenderWidth || WHITEBOARD_MIN_PDF_RENDER_WIDTH);
  const activeTabSelectedPagesKey =
    activeTab?.type === "pdf"
      ? activeTab.selectedPagesMode === "custom"
        ? `custom:${getSelectedPagesKey(activeTab.selectedPages)}`
        : "__all__"
      : "__all__";

  const emitPdfViewport = useCallback(
    ({ zoom, scrollRatio, viewportPageNumber, viewportPageOffsetRatio, viewportLeftRatio }) => {
      if (!activeTab || activeTab.type !== "pdf") {
        return;
      }

      const viewport = pdfViewportRef.current;
      const effectiveScrollRatio =
        typeof scrollRatio === "number"
          ? scrollRatio
          : viewport
            ? (() => {
                const scrollHeight = Math.max(
                  0,
                  viewport.scrollHeight - viewport.clientHeight,
                );
                return scrollHeight > 0 ? viewport.scrollTop / scrollHeight : 0;
              })()
            : 0;
      const effectiveLeftRatio =
        typeof viewportLeftRatio === "number"
          ? viewportLeftRatio
          : viewport
            ? (() => {
                const scrollWidth = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
                return scrollWidth > 0 ? viewport.scrollLeft / scrollWidth : 0;
              })()
            : 0;
      const computedAnchor =
        viewport && activeTab
          ? (() => {
              const nextPages = Array.isArray(pdfMeta.pages) ? pdfMeta.pages : [];
              for (const pageMeta of nextPages) {
                const element = document.getElementById(
                  `pdf-page-frame-${activeTab.id}-${pageMeta.pageNumber}`,
                );
                if (!(element instanceof HTMLElement)) {
                  continue;
                }

                const pageTop = element.offsetTop;
                const pageHeight = Math.max(1, element.offsetHeight);
                if (viewport.scrollTop < pageTop + pageHeight || pageMeta === nextPages[nextPages.length - 1]) {
                  const offsetRatio = Math.min(
                    1,
                    Math.max(0, (viewport.scrollTop - pageTop) / pageHeight),
                  );
                  return {
                    pageNumber: pageMeta.pageNumber,
                    offsetRatio,
                  };
                }
              }

              return {
                pageNumber: 1,
                offsetRatio: 0,
              };
            })()
          : {
              pageNumber: 1,
              offsetRatio: 0,
            };

      onPdfViewportChange?.({
        tabId: activeTab.id,
        scrollRatio: effectiveScrollRatio,
        viewportPageNumber:
          typeof viewportPageNumber === "number"
            ? viewportPageNumber
            : computedAnchor.pageNumber,
        viewportPageOffsetRatio:
          typeof viewportPageOffsetRatio === "number"
            ? viewportPageOffsetRatio
            : computedAnchor.offsetRatio,
        viewportLeftRatio: effectiveLeftRatio,
        zoom:
          typeof zoom === "number"
            ? Math.min(WHITEBOARD_MAX_ZOOM, Math.max(WHITEBOARD_MIN_ZOOM, zoom))
            : undefined,
      });
    },
    [activeTab, onPdfViewportChange, pdfMeta.pages],
  );

  useEffect(() => {
    return () => {
      pdfPickerDocumentRef.current?.destroy?.();
      pdfPickerDocumentRef.current = null;
      pdfPickerDocumentKeyRef.current = "";
    };
  }, []);

  useEffect(() => {
    setCurrentPdfPage(1);
    setVisiblePdfPages([1, 2]);
    setPdfPageMetrics({});
  }, [activeTab?.id]);

  const handleTileClick = useCallback(() => {
    onSelect?.();
  }, [onSelect]);

  const handleToggleFullscreen = useCallback(
    (event) => {
      event.stopPropagation();
      onToggleFullscreen?.();
    },
    [onToggleFullscreen],
  );

  useEffect(() => {
    const viewport = pdfViewportRef.current;
    if (!viewport) {
      return undefined;
    }

    const updateWidth = () => {
      setPdfRenderWidth(
        Math.max(
          WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          Math.floor(viewport.clientWidth - 40),
        ),
      );
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(viewport);
    return () => {
      resizeObserver.disconnect();
    };
  }, [activeTab?.id]);

  const updateCurrentPdfPage = useCallback(() => {
    const viewport = pdfViewportRef.current;
    if (!viewport || !activeTab || activeTab.type !== "pdf") {
      return;
    }

    const viewportCenter = viewport.scrollTop + viewport.clientHeight / 2;
    let closestPage = 1;
    let closestDistance = Number.POSITIVE_INFINITY;

    pdfMeta.pages.forEach((pageMeta) => {
      const element = document.getElementById(
        `pdf-page-frame-${activeTab.id}-${pageMeta.pageNumber}`,
      );
      if (!(element instanceof HTMLElement)) {
        return;
      }

      const pageCenter = element.offsetTop + element.offsetHeight / 2;
      const distance = Math.abs(pageCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPage = pageMeta.pageNumber;
      }
    });

    setCurrentPdfPage(closestPage);
  }, [activeTab, pdfMeta.pages]);

  useEffect(() => {
    let disposed = false;

    if (!activeTab || activeTab.type !== "pdf" || compact) {
      pdfDocumentRef.current?.destroy?.();
      pdfDocumentRef.current = null;
      setPdfMeta({
        status: "idle",
        fileUrl: "",
        selectedPagesKey: "__all__",
        pages: [],
        error: "",
      });
      return undefined;
    }

    if (
      pdfMeta.status === "ready" &&
      pdfMeta.fileUrl === activeTab.fileUrl &&
      pdfMeta.selectedPagesKey === activeTabSelectedPagesKey &&
      pdfDocumentRef.current
    ) {
      return undefined;
    }

    pdfDocumentRef.current?.destroy?.();
    pdfDocumentRef.current = null;
    const staleCanvases = document.querySelectorAll(
      `[id^="pdf-page-${activeTab.id}-"]`,
    );
    staleCanvases.forEach((element) => {
      if (element instanceof HTMLCanvasElement) {
        delete element.dataset.renderKey;
        delete element.dataset.pendingRenderKey;
        delete element.dataset.stableRenderKey;
      }
    });
    setPdfMeta({
      status: "loading",
      fileUrl: activeTab.fileUrl,
      selectedPagesKey: activeTabSelectedPagesKey,
      pages: [],
      error: "",
    });

    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: activeTab.fileUrl,
          withCredentials: false,
        });
        const pdfDocument = await loadingTask.promise;
        const firstPage = await pdfDocument.getPage(1);
        const firstViewport = firstPage.getViewport({
          scale: 1,
          rotation: resolvePdfPageRotation(firstPage),
        });
        const selectedPages =
          activeTab.selectedPagesMode === "custom"
            ? Array.isArray(activeTab.selectedPages)
              ? activeTab.selectedPages
              : []
            : Array.from({ length: pdfDocument.numPages }, (_, index) => index + 1);
        const pageDescriptors = selectedPages.map((pageNumber) => ({
          pageNumber,
          baseWidth: firstViewport.width,
          baseHeight: firstViewport.height,
        }));

        if (disposed) {
          await pdfDocument.destroy();
          return;
        }

        pdfDocumentRef.current = pdfDocument;
        setPdfMeta({
          status: "ready",
          fileUrl: activeTab.fileUrl,
          selectedPagesKey: activeTabSelectedPagesKey,
          pages: pageDescriptors,
          error: "",
        });
      } catch (error) {
        if (!disposed) {
          setPdfMeta({
            status: "error",
            fileUrl: activeTab.fileUrl,
            selectedPagesKey: activeTabSelectedPagesKey,
            pages: [],
            error: error?.message || "PDF load failed",
          });
        }
      }
    };

    loadPdf();

    return () => {
      disposed = true;
    };
  }, [
    activeTab?.fileUrl,
    activeTab?.id,
    activeTab?.type,
    activeTabSelectedPagesKey,
    compact,
    pdfMeta.fileUrl,
    pdfMeta.selectedPagesKey,
    pdfMeta.status,
  ]);

  useEffect(() => {
    let disposed = false;

    if (
      compact ||
      !activeTab ||
      activeTab.type !== "pdf" ||
      pdfMeta.status !== "ready" ||
      pdfMeta.fileUrl !== activeTab.fileUrl ||
      pdfRenderWidth <= 0 ||
      !pdfDocumentRef.current
    ) {
      return undefined;
    }

    const visiblePageSet = new Set(visiblePdfPages);
    if (visiblePageSet.size === 0) {
      return undefined;
    }

    const renderPages = async () => {
      try {
        const pdfDocument = pdfDocumentRef.current;
        for (const pageMeta of pdfMeta.pages) {
          if (disposed) {
            break;
          }
          if (!visiblePageSet.has(pageMeta.pageNumber)) {
            continue;
          }

          const canvas = document.getElementById(
            `pdf-page-${activeTab.id}-${pageMeta.pageNumber}`,
          );
          if (!(canvas instanceof HTMLCanvasElement)) {
            continue;
          }

          const renderSignature = `${WHITEBOARD_PDF_RENDER_VERSION}:${activeTab.fileUrl}:${pageMeta.pageNumber}:${Math.round(
            activePdfWidth,
          )}:${Math.round(activePdfZoom * 1000)}`;
          if (canvas.dataset.renderKey === renderSignature) {
            continue;
          }
          canvas.dataset.pendingRenderKey = renderSignature;

          const page = await pdfDocument.getPage(pageMeta.pageNumber);
          if (disposed || canvas.dataset.pendingRenderKey !== renderSignature) {
            continue;
          }
          const rotation = resolvePdfPageRotation(page);
          const baseViewport = page.getViewport({ scale: 1, rotation });
          const scale = activePdfWidth / baseViewport.width;
          const viewport = page.getViewport({ scale, rotation });
          const ratio = Math.min(2, window.devicePixelRatio || 1);
          const context = canvas.getContext("2d");
          if (!context) {
            continue;
          }
          const needsStabilizationPass =
            rotation !== 0 && canvas.dataset.stableRenderKey !== renderSignature;
          const renderCanvas = document.createElement("canvas");
          const renderContext = renderCanvas.getContext("2d");
          if (!renderContext) {
            continue;
          }

          renderCanvas.width = Math.floor(viewport.width * ratio);
          renderCanvas.height = Math.floor(viewport.height * ratio);
          renderContext.setTransform(ratio, 0, 0, ratio, 0, 0);

          const renderIntoCanvas = async () => {
            renderContext.clearRect(0, 0, viewport.width, viewport.height);
            const renderTask = page.render({
              canvasContext: renderContext,
              viewport,
            });
            await renderTask.promise;
          };

          await renderIntoCanvas();
          if (disposed || canvas.dataset.pendingRenderKey !== renderSignature) {
            continue;
          }

          if (needsStabilizationPass) {
            await waitForAnimationFrame();
            if (disposed || canvas.dataset.pendingRenderKey !== renderSignature) {
              continue;
            }
            await renderIntoCanvas();
            if (disposed || canvas.dataset.pendingRenderKey !== renderSignature) {
              continue;
            }
            canvas.dataset.stableRenderKey = renderSignature;
          }

          canvas.width = renderCanvas.width;
          canvas.height = renderCanvas.height;
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(renderCanvas, 0, 0);
          canvas.dataset.renderKey = renderSignature;
          delete canvas.dataset.pendingRenderKey;
          setPdfPageMetrics((prev) => {
            const nextWidth = viewport.width;
            const nextHeight = viewport.height;
            const current = prev[pageMeta.pageNumber];
            if (
              current &&
              Math.abs(current.width - nextWidth) < 1 &&
              Math.abs(current.height - nextHeight) < 1
            ) {
              return prev;
            }

            return {
              ...prev,
              [pageMeta.pageNumber]: {
                width: nextWidth,
                height: nextHeight,
              },
            };
          });
        }
      } catch {}
    };

    renderPages();

    return () => {
      disposed = true;
    };
  }, [
    activeTab?.fileUrl,
    activeTab?.id,
    activeTab?.type,
    compact,
    pdfMeta,
    pdfRenderWidth,
    activePdfZoom,
    activePdfWidth,
    visiblePdfPages,
  ]);

  useEffect(() => {
    const viewport = pdfViewportRef.current;
    if (
      !viewport ||
      !activeTab ||
      activeTab.type !== "pdf" ||
      compact ||
      pdfMeta.status !== "ready"
    ) {
      return undefined;
    }

    pdfObserverRef.current?.disconnect?.();
    const observer = new IntersectionObserver(
      (entries) => {
        const nextPages = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Number(entry.target.getAttribute("data-page-number")))
          .filter((pageNumber) => Number.isFinite(pageNumber) && pageNumber > 0);

        if (nextPages.length === 0) {
          return;
        }

        setVisiblePdfPages((prev) =>
          Array.from(new Set([...prev, ...nextPages])).sort((left, right) => left - right),
        );
      },
      {
        root: viewport,
        rootMargin: "180% 0px 180% 0px",
        threshold: 0.01,
      },
    );

    pdfObserverRef.current = observer;
    pdfMeta.pages.forEach((pageMeta) => {
      const element = document.getElementById(
        `pdf-page-frame-${activeTab.id}-${pageMeta.pageNumber}`,
      );
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeTab?.id, activeTab?.type, compact, pdfMeta.pages, pdfMeta.status]);

  useEffect(() => {
    const viewport = pdfViewportRef.current;
    if (!viewport || interactive || !activeTab || activeTab.type !== "pdf") {
      return undefined;
    }

    const blockScroll = (event) => {
      event.preventDefault();
    };

    viewport.addEventListener("wheel", blockScroll, { passive: false });
    viewport.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      viewport.removeEventListener("wheel", blockScroll);
      viewport.removeEventListener("touchmove", blockScroll);
    };
  }, [activeTab?.id, activeTab?.type, interactive]);

  const handlePdfZoomChange = useCallback(
    (nextZoom) => {
      if (!interactive || !activeTab || activeTab.type !== "pdf") {
        return;
      }

      emitPdfViewport({
        zoom: nextZoom,
      });
    },
    [activeTab, emitPdfViewport, interactive],
  );

  useEffect(() => {
    const viewport = pdfViewportRef.current;
    if (!viewport || !interactive || !activeTab || activeTab.type !== "pdf") {
      return undefined;
    }

    const getTouchDistance = (touches) => {
      if (!touches || touches.length < 2) {
        return 0;
      }

      const firstTouch = touches[0];
      const secondTouch = touches[1];
      return Math.hypot(
        secondTouch.clientX - firstTouch.clientX,
        secondTouch.clientY - firstTouch.clientY,
      );
    };

    const scheduleZoom = (nextZoom) => {
      if (zoomFrameRef.current) {
        window.cancelAnimationFrame(zoomFrameRef.current);
      }

      zoomFrameRef.current = window.requestAnimationFrame(() => {
        zoomFrameRef.current = 0;
        handlePdfZoomChange(nextZoom);
      });
    };

    const handleWheelZoom = (event) => {
      if (!event.ctrlKey && !event.metaKey) {
        return;
      }

      event.preventDefault();
      const zoomDelta = event.deltaY > 0 ? -0.08 : 0.08;
      scheduleZoom(activePdfZoom + zoomDelta);
    };

    const handleTouchStart = (event) => {
      if (event.touches.length < 2) {
        pinchStateRef.current.active = false;
        return;
      }

      pinchStateRef.current = {
        active: true,
        distance: getTouchDistance(event.touches),
        zoom: activePdfZoom,
      };
    };

    const handleTouchMove = (event) => {
      if (!pinchStateRef.current.active || event.touches.length < 2) {
        return;
      }

      const nextDistance = getTouchDistance(event.touches);
      if (!nextDistance || !pinchStateRef.current.distance) {
        return;
      }

      event.preventDefault();
      const zoomRatio = nextDistance / pinchStateRef.current.distance;
      scheduleZoom(pinchStateRef.current.zoom * zoomRatio);
    };

    const handleTouchEnd = () => {
      pinchStateRef.current.active = false;
    };

    viewport.addEventListener("wheel", handleWheelZoom, { passive: false });
    viewport.addEventListener("touchstart", handleTouchStart, { passive: true });
    viewport.addEventListener("touchmove", handleTouchMove, { passive: false });
    viewport.addEventListener("touchend", handleTouchEnd);
    viewport.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      if (zoomFrameRef.current) {
        window.cancelAnimationFrame(zoomFrameRef.current);
        zoomFrameRef.current = 0;
      }
      viewport.removeEventListener("wheel", handleWheelZoom);
      viewport.removeEventListener("touchstart", handleTouchStart);
      viewport.removeEventListener("touchmove", handleTouchMove);
      viewport.removeEventListener("touchend", handleTouchEnd);
      viewport.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [activePdfZoom, activeTab?.id, activeTab?.type, handlePdfZoomChange, interactive]);

  useEffect(() => {
    const viewport = pdfViewportRef.current;
    if (!viewport || !activeTab || activeTab.type !== "pdf") {
      return;
    }

    const targetFrame = document.getElementById(
      `pdf-page-frame-${activeTab.id}-${activeTab.viewportPageNumber || 1}`,
    );
    const pageAnchorTop =
      targetFrame instanceof HTMLElement
        ? targetFrame.offsetTop +
          targetFrame.offsetHeight *
            Math.min(1, Math.max(0, Number(activeTab.viewportPageOffsetRatio) || 0))
        : null;
    const scrollHeight = viewport.scrollHeight - viewport.clientHeight;
    const nextTop =
      typeof pageAnchorTop === "number"
        ? pageAnchorTop
        : scrollHeight > 0
          ? scrollHeight * (activeTab.scrollRatio || 0)
          : 0;
    const scrollWidth = viewport.scrollWidth - viewport.clientWidth;
    const nextLeft =
      scrollWidth > 0
        ? scrollWidth * (Number(activeTab.viewportLeftRatio) || 0)
        : 0;

    if (
      Math.abs(viewport.scrollTop - nextTop) < 4 &&
      Math.abs(viewport.scrollLeft - nextLeft) < 4
    ) {
      scrollSyncRef.current.lastTabId = activeTab.id;
      return;
    }

    scrollSyncRef.current.lock = true;
    viewport.scrollTop = nextTop;
    viewport.scrollLeft = nextLeft;
    window.setTimeout(() => {
      scrollSyncRef.current.lock = false;
    }, 60);
    scrollSyncRef.current.lastTabId = activeTab.id;
    window.setTimeout(() => {
      updateCurrentPdfPage();
    }, 0);
  }, [
    activeTab?.id,
    activeTab?.scrollRatio,
    activeTab?.type,
    activeTab?.viewportLeftRatio,
    activeTab?.viewportPageNumber,
    activeTab?.viewportPageOffsetRatio,
    pdfMeta.pages.length,
    pdfMeta.status,
    updateCurrentPdfPage,
  ]);

  useEffect(() => {
    const viewport = pdfViewportRef.current;
    if (!viewport || !activeTab || activeTab.type !== "pdf") {
      return;
    }

    if (activePdfZoom <= 1.001) {
      viewport.scrollLeft = 0;
    }
  }, [activePdfZoom, activeTab?.id, activeTab?.type]);

  const handlePdfScroll = useCallback(() => {
    const viewport = pdfViewportRef.current;
    if (
      !interactive ||
      !activeTab ||
      activeTab.type !== "pdf" ||
      !viewport ||
      scrollSyncRef.current.lock
    ) {
      return;
    }

    const scrollHeight = viewport.scrollHeight - viewport.clientHeight;
    const scrollRatio = scrollHeight > 0 ? viewport.scrollTop / scrollHeight : 0;
    updateCurrentPdfPage();

    if (scrollSyncRef.current.timeoutId) {
      window.clearTimeout(scrollSyncRef.current.timeoutId);
    }

    scrollSyncRef.current.timeoutId = window.setTimeout(() => {
      emitPdfViewport({
        scrollRatio,
      });
    }, 72);
  }, [activeTab, emitPdfViewport, interactive, updateCurrentPdfPage]);

  const handleTabSelect = useCallback(
    (event, tabId) => {
      event.stopPropagation();
      if (!interactive) {
        return;
      }
      onTabActivate?.(tabId);
    },
    [interactive, onTabActivate],
  );

  const handleTabRemove = useCallback(
    (event, tabId) => {
      event.stopPropagation();
      onTabRemove?.(tabId);
    },
    [onTabRemove],
  );

  const handlePdfAddClick = useCallback(
    (event) => {
      event.stopPropagation();
      setIsPdfLibraryOpen(true);
    },
    [],
  );

  const handlePdfLibraryClose = useCallback(() => {
    pdfPickerDocumentRef.current?.destroy?.();
    pdfPickerDocumentRef.current = null;
    pdfPickerDocumentKeyRef.current = "";
    setIsPdfLibraryOpen(false);
    setPdfPickerState({
      status: "idle",
      item: null,
      pageCount: 0,
      selectedPages: [],
      error: "",
    });
  }, []);

  const handlePdfLibrarySelect = useCallback(
    async (item) => {
      if (!item?.fileUrl) {
        return;
      }

      if (
        pdfPickerDocumentRef.current &&
        pdfPickerDocumentKeyRef.current === item.id
      ) {
        const cachedPageCount =
          pdfPageCountCacheRef.current[item.id] ||
          pdfPickerDocumentRef.current.numPages ||
          0;
        setPdfPickerState({
          status: "ready",
          item,
          pageCount: cachedPageCount,
          selectedPages: [],
          error: "",
        });
        return;
      }

      const cachedPageCount = pdfPageCountCacheRef.current[item.id];
      if (pdfPickerDocumentRef.current) {
        pdfPickerDocumentRef.current.destroy?.();
        pdfPickerDocumentRef.current = null;
        pdfPickerDocumentKeyRef.current = "";
      }

      setPdfPickerState({
        status: "loading",
        item,
        pageCount: cachedPageCount || 0,
        selectedPages: [],
        error: "",
      });

      try {
        const loadingTask = pdfjsLib.getDocument({
          url: item.fileUrl,
          withCredentials: false,
        });
        const pdfDocument = await loadingTask.promise;
        const pageCount = pdfDocument.numPages || 0;
        pdfPageCountCacheRef.current[item.id] = pageCount;
        pdfPickerDocumentRef.current = pdfDocument;
        pdfPickerDocumentKeyRef.current = item.id;

        setPdfPickerState({
          status: "ready",
          item,
          pageCount,
          selectedPages: [],
          error: "",
        });
      } catch (error) {
        setPdfPickerState({
          status: "error",
          item,
          pageCount: 0,
          selectedPages: [],
          error: error?.message || "PDF load failed",
        });
      }
    },
    [],
  );

  const handlePdfFileChange = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) {
        return;
      }

      setPdfUploadPending(true);
      try {
        const result = await onPdfUpload?.(file);
        if (result?.ok && result?.item) {
          handlePdfLibrarySelect(result.item);
        }
      } finally {
        setPdfUploadPending(false);
      }
    },
    [handlePdfLibrarySelect, onPdfUpload],
  );

  const handlePdfPickerBack = useCallback(() => {
    pdfPickerDocumentRef.current?.destroy?.();
    pdfPickerDocumentRef.current = null;
    pdfPickerDocumentKeyRef.current = "";
    setPdfPickerState({
      status: "idle",
      item: null,
      pageCount: 0,
      selectedPages: [],
      error: "",
    });
  }, []);

  const handleTogglePageSelection = useCallback((pageNumber) => {
    setPdfPickerState((prev) => {
      const selectedPages = prev.selectedPages.includes(pageNumber)
        ? prev.selectedPages.filter((entry) => entry !== pageNumber)
        : [...prev.selectedPages, pageNumber].sort((left, right) => left - right);

      return {
        ...prev,
        selectedPages,
      };
    });
  }, []);

  const handleSelectAllPages = useCallback(() => {
    setPdfPickerState((prev) => ({
      ...prev,
      selectedPages: Array.from({ length: prev.pageCount }, (_, index) => index + 1),
    }));
  }, []);

  const handleClearPageSelection = useCallback(() => {
    setPdfPickerState((prev) => ({
      ...prev,
      selectedPages: [],
    }));
  }, []);

  const handleOpenSelectedPages = useCallback(() => {
    if (!pdfPickerState.item || pdfPickerState.selectedPages.length === 0) {
      return;
    }

    const result = onPdfOpen?.(pdfPickerState.item, {
      selectedPages: pdfPickerState.selectedPages,
    });
    if (result?.ok) {
      handlePdfLibraryClose();
    }
  }, [handlePdfLibraryClose, onPdfOpen, pdfPickerState]);

  const handleUndo = useCallback(() => {
    if (activeTab?.type === "pdf") {
      onUndo?.({
        tabId: activeTab.id,
        pageNumber: currentPdfPage,
      });
      return;
    }

    onUndo?.({
      tabId: WHITEBOARD_BOARD_TAB_ID,
    });
  }, [activeTab, currentPdfPage, onUndo]);

  const handleRedo = useCallback(() => {
    if (activeTab?.type === "pdf") {
      onRedo?.({
        tabId: activeTab.id,
        pageNumber: currentPdfPage,
      });
      return;
    }

    onRedo?.({
      tabId: WHITEBOARD_BOARD_TAB_ID,
    });
  }, [activeTab, currentPdfPage, onRedo]);

  const helperText = useMemo(() => {
    if (hasBoardStrokes) {
      return "";
    }

    if (interactive) {
      return t("groupCall.whiteboard.emptyCreator");
    }

    return t("groupCall.whiteboard.emptyViewer");
  }, [hasBoardStrokes, interactive, t]);

  const currentPageLabel = useMemo(() => {
    if (!activeTab || activeTab.type !== "pdf" || pdfMeta.pages.length === 0) {
      return "";
    }

    return t("groupCall.whiteboard.pageLabel", {
      current: currentPdfPage,
      total: pdfMeta.pages.length,
    });
  }, [activeTab, currentPdfPage, pdfMeta.pages.length, t]);

  const shortcutTitle = useCallback((label, shortcut) => `${label} (${shortcut})`, []);

  const penTitle = shortcutTitle(t("groupCall.whiteboard.pen"), "P");
  const eraserTitle = shortcutTitle(t("groupCall.whiteboard.eraser"), "E");
  const textTitle = shortcutTitle(t("groupCall.whiteboard.text"), "T");
  const strokeEraserTitle = shortcutTitle(t("groupCall.whiteboard.strokeEraser"), "X");
  const undoTitle = shortcutTitle(t("groupCall.whiteboard.undo"), "Ctrl/Cmd+Z");
  const redoTitle = shortcutTitle(t("groupCall.whiteboard.redo"), "Ctrl/Cmd+Shift+Z");
  const zoomOutTitle = shortcutTitle(t("groupCall.whiteboard.zoomOut"), "-");
  const zoomInTitle = shortcutTitle(t("groupCall.whiteboard.zoomIn"), "+");
  const clearTitle = shortcutTitle(t("groupCall.whiteboard.clear"), "Backspace");

  const shouldShowChrome = !compact;
  const shouldShowToolbar = showToolbar;

  useHotkeys(
    "p",
    () => onToolChange?.("pen"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "e",
    () => onToolChange?.("eraser"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "t",
    () => onToolChange?.("text"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "x",
    () => onToolChange?.("stroke-eraser"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "mod+z",
    () => handleUndo(),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [handleUndo, interactive, isPdfLibraryOpen],
  );

  useHotkeys(
    "mod+shift+z, mod+y",
    () => handleRedo(),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [handleRedo, interactive, isPdfLibraryOpen],
  );

  useHotkeys(
    "-",
    () => {
      if (activeTab?.type === "pdf") {
        handlePdfZoomChange(activePdfZoom - 0.1);
      }
    },
    {
      enabled: interactive && !isPdfLibraryOpen && activeTab?.type === "pdf",
      preventDefault: true,
    },
    [activePdfZoom, activeTab?.type, handlePdfZoomChange, interactive, isPdfLibraryOpen],
  );

  useHotkeys(
    "+,=",
    () => {
      if (activeTab?.type === "pdf") {
        handlePdfZoomChange(activePdfZoom + 0.1);
      }
    },
    {
      enabled: interactive && !isPdfLibraryOpen && activeTab?.type === "pdf",
      preventDefault: true,
    },
    [activePdfZoom, activeTab?.type, handlePdfZoomChange, interactive, isPdfLibraryOpen],
  );

  useHotkeys(
    "[",
    () => onBrushSizeChange?.(Math.max(2, brushSize - 1)),
    {
      enabled: interactive && !isPdfLibraryOpen && tool !== "stroke-eraser",
      preventDefault: true,
    },
    [brushSize, interactive, isPdfLibraryOpen, onBrushSizeChange, tool],
  );

  useHotkeys(
    "]",
    () => onBrushSizeChange?.(Math.min(24, brushSize + 1)),
    {
      enabled: interactive && !isPdfLibraryOpen && tool !== "stroke-eraser",
      preventDefault: true,
    },
    [brushSize, interactive, isPdfLibraryOpen, onBrushSizeChange, tool],
  );

  useHotkeys(
    "backspace",
    () => {
      if (activeTab?.type === "pdf") {
        onClearPage?.({
          tabId: activeTab.id,
          pageNumber: currentPdfPage,
        });
        return;
      }

      onClear?.({
        tabId: WHITEBOARD_BOARD_TAB_ID,
      });
    },
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [activeTab, currentPdfPage, interactive, isPdfLibraryOpen, onClear, onClearPage],
  );

  return (
    <TileRoot
      $compact={compact}
      $active={isActive}
      $clickable={Boolean(onSelect)}
      onClick={handleTileClick}
    >
      {canFullscreen ? (
        <FullscreenBtn
          type="button"
          $visible={isActive || compact || isMobile || isFullscreen}
          onClick={handleToggleFullscreen}
          aria-label={
            isFullscreen
              ? t("groupCall.whiteboard.exitFullscreen")
              : t("groupCall.whiteboard.enterFullscreen")
          }
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize size={14} />}
        </FullscreenBtn>
      ) : null}

      <WorkspaceShell>
        {shouldShowChrome ? (
          <WorkspaceChrome onClick={(event) => event.stopPropagation()}>
            <TabsBar>
              <TabsScroller>
                {tabs.map((tab) => {
                  const title =
                    tab.type === "board"
                      ? t("groupCall.whiteboard.boardTab")
                      : tab.title || tab.fileName;

                  return (
                    <WorkspaceTabButton
                      key={tab.id}
                      type="button"
                      $active={activeTab?.id === tab.id}
                      $disabled={!interactive}
                      onClick={(event) => handleTabSelect(event, tab.id)}
                    >
                      <TabTitle>{title}</TabTitle>
                      {tab.type === "pdf" && interactive ? (
                        <TabCloseButton
                          type="button"
                          onClick={(event) => handleTabRemove(event, tab.id)}
                          aria-label={t("groupCall.whiteboard.closeTab")}
                        >
                          <X size={14} />
                        </TabCloseButton>
                      ) : null}
                    </WorkspaceTabButton>
                  );
                })}
                {interactive ? (
                  <>
                  <HiddenInput
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfFileChange}
                  />
                  <AddTabButton
                    type="button"
                    onClick={handlePdfAddClick}
                    aria-label={t("groupCall.whiteboard.addPdf")}
                    title={t("groupCall.whiteboard.addPdf")}
                  >
                    {pdfUploadPending ? <Loader2 size={16} className="spin" /> : <Plus size={16} />}
                  </AddTabButton>
                  </>
                ) : null}
              </TabsScroller>
            </TabsBar>

            {shouldShowToolbar ? (
              <Toolbar>
                <ToolbarGroup>
                  <ToolButton
                    type="button"
                    $active={tool === "pen"}
                    onClick={() => onToolChange?.("pen")}
                    aria-label={t("groupCall.whiteboard.pen")}
                    title={penTitle}
                  >
                    <Pencil size={16} />
                  </ToolButton>
                  <ToolButton
                    type="button"
                    $active={tool === "eraser"}
                    onClick={() => onToolChange?.("eraser")}
                    aria-label={t("groupCall.whiteboard.eraser")}
                    title={eraserTitle}
                  >
                    <Eraser size={16} />
                  </ToolButton>
                  <ToolButton
                    type="button"
                    $active={tool === "text"}
                    onClick={() => onToolChange?.("text")}
                    aria-label={t("groupCall.whiteboard.text")}
                    title={textTitle}
                  >
                    <Type size={16} />
                  </ToolButton>
                  <ToolButton
                    type="button"
                    $active={tool === "stroke-eraser"}
                    onClick={() => onToolChange?.("stroke-eraser")}
                    aria-label={t("groupCall.whiteboard.strokeEraser")}
                    title={strokeEraserTitle}
                  >
                    <TbVacuumCleaner size={18} />
                  </ToolButton>
                  {WHITEBOARD_SWATCHES.map((swatch) => (
                    <SwatchButton
                      key={swatch}
                      type="button"
                      $swatch={swatch}
                      $active={(tool === "pen" || tool === "text") && color.toLowerCase() === swatch}
                      onClick={() => {
                        onToolChange?.(tool === "text" ? "text" : "pen");
                        onColorChange?.(swatch);
                      }}
                      aria-label={t("groupCall.whiteboard.colorSwatch", {
                        color: swatch,
                      })}
                    />
                  ))}
                </ToolbarGroup>

                <ToolbarGroup>
                  <ToolButton
                    type="button"
                    onClick={handleUndo}
                    aria-label={t("groupCall.whiteboard.undo")}
                    title={undoTitle}
                  >
                    <Undo2 size={16} />
                  </ToolButton>
                  <ToolButton
                    type="button"
                    onClick={handleRedo}
                    aria-label={t("groupCall.whiteboard.redo")}
                    title={redoTitle}
                  >
                    <Redo2 size={16} />
                  </ToolButton>
                  {activeTab?.type === "pdf" ? (
                    <>
                      <ToolButton
                        type="button"
                        onClick={() => handlePdfZoomChange(activePdfZoom - 0.1)}
                        aria-label={t("groupCall.whiteboard.zoomOut")}
                        title={zoomOutTitle}
                      >
                        <Minus size={16} />
                      </ToolButton>
                      <ZoomReadout>{Math.round(activePdfZoom * 100)}%</ZoomReadout>
                      <ToolButton
                        type="button"
                        onClick={() => handlePdfZoomChange(activePdfZoom + 0.1)}
                        aria-label={t("groupCall.whiteboard.zoomIn")}
                        title={zoomInTitle}
                      >
                        <Plus size={16} />
                      </ToolButton>
                    </>
                  ) : null}
                  <SliderWrap>
                    <span>{t("groupCall.whiteboard.size")}</span>
                    <input
                      type="range"
                      min="2"
                      max="24"
                      step="1"
                      value={brushSize}
                      onChange={(event) =>
                        onBrushSizeChange?.(Number(event.target.value) || 4)
                      }
                      disabled={tool === "stroke-eraser"}
                    />
                  </SliderWrap>
                  <ToolButton
                    type="button"
                    $danger
                    onClick={() =>
                      activeTab?.type === "pdf"
                        ? onClearPage?.({
                            tabId: activeTab.id,
                            pageNumber: currentPdfPage,
                          })
                        : onClear?.()
                    }
                    aria-label={t("groupCall.whiteboard.clear")}
                    title={clearTitle}
                  >
                    <Trash2 size={16} />
                  </ToolButton>
                </ToolbarGroup>
              </Toolbar>
            ) : null}
          </WorkspaceChrome>
        ) : null}

        <WorkspaceBody $compact={compact}>
          {activeTab?.type === "pdf" && !compact ? (
            <PdfViewport
              ref={pdfViewportRef}
              onScroll={handlePdfScroll}
              $interactive={interactive}
              $allowHorizontal={interactive && activePdfZoom > 1.001}
            >
              {pdfMeta.status === "loading" ? (
                <PdfStatus>
                  <Loader2 size={18} className="spin" />
                  <span>{t("groupCall.whiteboard.loadingPdf")}</span>
                </PdfStatus>
              ) : null}
              {pdfMeta.status === "error" ? (
                <PdfStatus>{t("groupCall.whiteboard.pdfLoadFailed")}</PdfStatus>
              ) : null}

              <PdfStack>
                {pdfMeta.pages.map((pageMeta) => {
                  const pageMetric = pdfPageMetrics[pageMeta.pageNumber];
                  const pageHeight =
                    pageMetric?.height ||
                    (pdfRenderWidth > 0 && pageMeta.baseWidth > 0
                      ? Math.round(
                          (activePdfWidth * pageMeta.baseHeight) /
                            pageMeta.baseWidth,
                        )
                      : 720);
                  const shouldRenderPage =
                    visiblePdfPages.includes(pageMeta.pageNumber) || pageMeta.pageNumber <= 2;
                  const pageStrokes = getPdfTabPageStrokes(activeTab, pageMeta.pageNumber);

                  return (
                    <PdfPageFrame
                      key={pageMeta.pageNumber}
                      id={`pdf-page-frame-${activeTab.id}-${pageMeta.pageNumber}`}
                      data-page-number={pageMeta.pageNumber}
                      style={{
                        width: `${activePdfWidth}px`,
                        minWidth: `${activePdfWidth}px`,
                        height: `${pageHeight}px`,
                      }}
                    >
                      <PageBadge>
                        {t("groupCall.whiteboard.pageShort", {
                          current: pageMeta.pageNumber,
                        })}
                      </PageBadge>
                      {shouldRenderPage ? (
                        <PdfPageCanvas
                          id={`pdf-page-${activeTab.id}-${pageMeta.pageNumber}`}
                        />
                      ) : (
                        <PdfPagePlaceholder />
                      )}
                      <StrokeCanvas
                        strokes={pageStrokes}
                        interactive={interactive}
                        tool={tool}
                        color={color}
                        brushSize={brushSize}
                        tabId={activeTab.id}
                        pageNumber={pageMeta.pageNumber}
                        onStrokeStart={onStrokeStart}
                        onStrokeAppend={onStrokeAppend}
                        onStrokeRemove={onStrokeRemove}
                        textPlaceholder={t("groupCall.whiteboard.textPlaceholder")}
                      />
                    </PdfPageFrame>
                  );
                })}
              </PdfStack>
              {!pdfMeta.pages.length && pdfMeta.status === "ready" ? (
                <PdfStatus>{t("groupCall.whiteboard.emptyPdf")}</PdfStatus>
              ) : null}
            </PdfViewport>
          ) : (
            <BoardSurface>
              <StrokeCanvas
                strokes={boardTab?.strokes || []}
                interactive={interactive}
                tool={tool}
                color={color}
                brushSize={brushSize}
                tabId={WHITEBOARD_BOARD_TAB_ID}
                onStrokeStart={onStrokeStart}
                onStrokeAppend={onStrokeAppend}
                onStrokeRemove={onStrokeRemove}
                textPlaceholder={t("groupCall.whiteboard.textPlaceholder")}
              />
              {!hasBoardStrokes ? <EmptyState $compact={compact}>{helperText}</EmptyState> : null}
            </BoardSurface>
          )}
        </WorkspaceBody>
      </WorkspaceShell>

      {!isFullscreen ? (
        <TileLabel $compact={compact}>
          {activeTab?.type === "pdf" && currentPageLabel ? `${label} · ${currentPageLabel}` : label}
        </TileLabel>
      ) : null}

      {interactive && isPdfLibraryOpen ? (
        <ModalOverlay
          onClick={handlePdfLibraryClose}
          $overlay="rgba(7, 10, 18, 0.62)"
          $zIndex={1200}
        >
          <ModalPanel
            $width="min(100%, 780px)"
            $maxHeight="min(82vh, 720px)"
            onClick={(event) => event.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitleBlock>
                <ModalTitle>
                  {pdfPickerState.status === "idle"
                    ? t("groupCall.whiteboard.pdfLibraryTitle")
                    : t("groupCall.whiteboard.pdfPagePickerTitle")}
                </ModalTitle>
                <ModalSubtitle>
                  {pdfPickerState.status === "idle"
                    ? t("groupCall.whiteboard.pdfLibrarySubtitle")
                    : t("groupCall.whiteboard.pdfPagePickerSubtitle")}
                </ModalSubtitle>
              </ModalTitleBlock>
              <ModalCloseButton
                type="button"
                onClick={handlePdfLibraryClose}
                aria-label={t("common.close")}
              >
                <X size={16} />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              {pdfPickerState.status === "idle" ? (
                <>
                  <PdfLibraryGrid>
                    {pdfLibrary.map((item) => (
                      <PdfLibraryCard
                        key={item.id}
                        type="button"
                        onClick={() => handlePdfLibrarySelect(item)}
                      >
                        <PdfLibraryTitle>{item.title || item.fileName}</PdfLibraryTitle>
                        <PdfLibraryMeta>
                          <span>{item.fileName}</span>
                          <span>
                            {formatPdfLibrarySize(item.fileSize)} · {formatPdfLibraryDate(item.createdAt)}
                          </span>
                        </PdfLibraryMeta>
                      </PdfLibraryCard>
                    ))}

                    <PdfUploadCard type="button" onClick={() => fileInputRef.current?.click()}>
                      {pdfUploadPending ? <Loader2 size={22} className="spin" /> : <Plus size={22} />}
                      <PdfLibraryTitle>{t("groupCall.whiteboard.uploadPdfCard")}</PdfLibraryTitle>
                      <PdfLibraryMeta>
                        <span>{t("groupCall.whiteboard.uploadPdfCardHint")}</span>
                      </PdfLibraryMeta>
                    </PdfUploadCard>
                  </PdfLibraryGrid>

                  {!pdfLibrary.length ? (
                    <PdfLibraryEmpty>
                      {t("groupCall.whiteboard.pdfLibraryEmpty")}
                    </PdfLibraryEmpty>
                  ) : null}
                </>
              ) : (
                <>
                  <PdfPickerHeader>
                    <DialogActionButton $variant="ghost" onClick={handlePdfPickerBack}>
                      <ArrowLeft size={16} />
                    </DialogActionButton>
                    <div>
                      <PdfLibraryTitle>
                        {pdfPickerState.item?.title || pdfPickerState.item?.fileName || ""}
                      </PdfLibraryTitle>
                      <PdfPickerMeta>
                        {pdfPickerState.pageCount
                          ? t("groupCall.whiteboard.pageCountLabel", {
                              count: pdfPickerState.pageCount,
                            })
                          : ""}
                      </PdfPickerMeta>
                    </div>
                  </PdfPickerHeader>

                  {pdfPickerState.status === "loading" ? (
                    <PdfStatus>
                      <Loader2 size={18} className="spin" />
                      <span>{t("groupCall.whiteboard.loadingPdfPages")}</span>
                    </PdfStatus>
                  ) : null}

                  {pdfPickerState.status === "error" ? (
                    <PdfLibraryEmpty>{t("groupCall.whiteboard.pdfPagesLoadFailed")}</PdfLibraryEmpty>
                  ) : null}

                  {pdfPickerState.status === "ready" ? (
                    <>
                      <PageSelectionToolbar>
                        <DialogActionButton $variant="ghost" onClick={handleSelectAllPages}>
                          {t("groupCall.whiteboard.selectAllPages")}
                        </DialogActionButton>
                        <DialogActionButton $variant="ghost" onClick={handleClearPageSelection}>
                          {t("groupCall.whiteboard.clearPageSelection")}
                        </DialogActionButton>
                        <PdfPickerMeta>
                          {t("groupCall.whiteboard.selectedPagesCount", {
                            count: pdfPickerState.selectedPages.length,
                          })}
                        </PdfPickerMeta>
                      </PageSelectionToolbar>

                      <PageSelectionGrid>
                        {Array.from({ length: pdfPickerState.pageCount }, (_, index) => {
                          const pageNumber = index + 1;
                          return (
                            <PdfPickerPageCard
                              key={pageNumber}
                              pdfDocument={pdfPickerDocumentRef.current}
                              active={pdfPickerState.selectedPages.includes(pageNumber)}
                              pageNumber={pageNumber}
                              onClick={() => handleTogglePageSelection(pageNumber)}
                            />
                          );
                        })}
                      </PageSelectionGrid>
                    </>
                  ) : null}
                </>
              )}
            </ModalBody>

            {pdfPickerState.status !== "idle" ? (
              <ModalFooter>
                <DialogActionButton $variant="ghost" onClick={handlePdfPickerBack}>
                  {t("groupCall.whiteboard.backToLibrary")}
                </DialogActionButton>
                <DialogActionButton
                  onClick={handleOpenSelectedPages}
                  disabled={pdfPickerState.selectedPages.length === 0}
                >
                  {t("groupCall.whiteboard.openSelectedPages")}
                </DialogActionButton>
              </ModalFooter>
            ) : null}
          </ModalPanel>
        </ModalOverlay>
      ) : null}
    </TileRoot>
  );
};

export default WhiteboardTile;
