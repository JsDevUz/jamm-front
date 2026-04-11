import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHotkeys } from "react-hotkeys-hook";
import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowRight,
  ArrowLeft,
  Circle,
  Diamond,
  Eraser,
  Maximize,
  Minimize2,
  Minus,
  MousePointer2,
  Pencil,
  Plus,
  Redo2,
  Square,
  Trash2,
  Triangle,
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
import Spinner from "../../../shared/ui/feedback/Spinner";

const WHITEBOARD_APPEND_BATCH_LIMIT = 24;
const WHITEBOARD_SWATCHES = [
  "#0f172a",
  "#dc2626",
  "#2563eb",
  "#059669",
  "#d97706",
  "#7c3aed",
];
const WHITEBOARD_FILL_SWATCHES = ["", "#ffffff", ...WHITEBOARD_SWATCHES];
const WHITEBOARD_BRUSH_PRESETS = [3, 6, 10];
const WHITEBOARD_SHAPE_EDGE_OPTIONS = ["sharp", "rounded"];
const WHITEBOARD_BOARD_TAB_ID = "board";
const WHITEBOARD_MIN_ZOOM = 0.5;
const WHITEBOARD_MAX_ZOOM = 3;
const WHITEBOARD_MIN_PDF_RENDER_WIDTH = 120;
const WHITEBOARD_MIN_BOARD_BASE_WIDTH = 120;
const WHITEBOARD_MIN_BOARD_BASE_HEIGHT = 120;
const WHITEBOARD_PDF_RENDER_VERSION = "v3";
const WHITEBOARD_PDF_BUFFER_CACHE_MAX_ITEMS = 12;
const WHITEBOARD_MAX_TEXT_CHARS = 240;
const WHITEBOARD_VIEWPORT_TOP_SAFE_SPACE = 92;
const WHITEBOARD_VIEWPORT_BOTTOM_SAFE_SPACE = 176;
const WHITEBOARD_SELECTION_PADDING = 5;
const WHITEBOARD_BOARD_POINT_MIN = -0.5;
const WHITEBOARD_BOARD_POINT_MAX = 1.5;
const WHITEBOARD_TEXT_EDITOR_HORIZONTAL_PADDING = 0;
const WHITEBOARD_TEXT_EDITOR_VERTICAL_PADDING = 0;
const WHITEBOARD_TEXT_FONT_OPTIONS = [
  {
    id: "sans",
    label: "Sans",
    family: '"Trebuchet MS", "Segoe UI", sans-serif',
  },
  {
    id: "serif",
    label: "Serif",
    family: 'Georgia, "Times New Roman", serif',
  },
  {
    id: "mono",
    label: "Mono",
    family: '"SFMono-Regular", "Courier New", monospace',
  },
  {
    id: "hand",
    label: "Hand",
    family: '"Comic Sans MS", "Trebuchet MS", cursive',
  },
];
const WHITEBOARD_TEXT_SIZE_OPTIONS = [
  { id: "s", label: "S", fontSize: 20 },
  { id: "m", label: "M", fontSize: 28 },
  { id: "l", label: "L", fontSize: 36 },
  { id: "xl", label: "XL", fontSize: 48 },
];
const WHITEBOARD_TEXT_ALIGN_OPTIONS = ["left", "center", "right"];
const WHITEBOARD_SHAPE_TOOLS = ["rectangle", "diamond", "triangle", "circle"];
const WHITEBOARD_VECTOR_TOOLS = [...WHITEBOARD_SHAPE_TOOLS, "arrow"];

const getPdfViewportTopInset = (interactive) =>
  interactive ? WHITEBOARD_VIEWPORT_TOP_SAFE_SPACE : 0;

const getPdfViewportBottomInset = (interactive) =>
  interactive ? WHITEBOARD_VIEWPORT_BOTTOM_SAFE_SPACE : 0;

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

const isMobileSafariBrowser = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent || "";
  const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
  const isSafariEngine = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS/.test(userAgent);
  return isIOSDevice && isSafariEngine;
};

const PDF_DEBUG_ENABLED = true;
const pdfBufferCache = new Map();
const pdfBufferPromiseCache = new Map();

const serializePdfError = (error) => {
  if (!error) {
    return null;
  }

  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
  };
};

const logPdfDebug = (step, payload = {}) => {
  if (!PDF_DEBUG_ENABLED || typeof console === "undefined") {
    return;
  }

  console.info(`[WhiteboardPDF] ${step}`, {
    ...payload,
    workerSrc: pdfjsLib.GlobalWorkerOptions.workerSrc,
    pageHref: typeof window !== "undefined" ? window.location.href : "",
  });
};

const touchPdfBufferCacheEntry = (targetUrl, pdfBytes) => {
  if (!targetUrl || !pdfBytes) {
    return;
  }

  if (pdfBufferCache.has(targetUrl)) {
    pdfBufferCache.delete(targetUrl);
  }
  pdfBufferCache.set(targetUrl, pdfBytes);

  if (pdfBufferCache.size > WHITEBOARD_PDF_BUFFER_CACHE_MAX_ITEMS) {
    const oldestKey = pdfBufferCache.keys().next().value;
    if (oldestKey) {
      pdfBufferCache.delete(oldestKey);
    }
  }
};

const clampUnit = (value) => Math.min(1, Math.max(0, value));
const clampStoredCoordinate = (value, surfaceMode = "page") => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) {
    return 0;
  }

  if (surfaceMode === "board") {
    return Math.min(WHITEBOARD_BOARD_POINT_MAX, Math.max(WHITEBOARD_BOARD_POINT_MIN, nextValue));
  }

  return clampUnit(nextValue);
};
const clampViewportRatio = (value) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) {
    return 0;
  }

  return Math.min(1, Math.max(0, nextValue));
};
const formatRecordingElapsed = (elapsedMs) => {
  const totalSeconds = Math.max(0, Math.floor((Number(elapsedMs) || 0) / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};
const getSelectedPagesKey = (selectedPages) =>
  Array.isArray(selectedPages) && selectedPages.length > 0
    ? selectedPages.join(",")
    : "__all__";
const getInitialVisiblePdfPages = (tab, pageDescriptors = []) => {
  const descriptorPages = Array.isArray(pageDescriptors)
    ? pageDescriptors
        .map((page) => Number(page?.pageNumber))
        .filter((pageNumber) => Number.isFinite(pageNumber) && pageNumber > 0)
    : [];

  if (descriptorPages.length > 0) {
    return descriptorPages.slice(0, 2);
  }

  if (
    tab?.type === "pdf" &&
    tab?.selectedPagesMode === "custom" &&
    Array.isArray(tab.selectedPages)
  ) {
    const selectedPages = tab.selectedPages
      .map((pageNumber) => Number(pageNumber))
      .filter((pageNumber) => Number.isFinite(pageNumber) && pageNumber > 0);

    if (selectedPages.length > 0) {
      return selectedPages.slice(0, 2);
    }
  }

  return [1, 2];
};

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

const getTextValue = (value) =>
  typeof value === "string" ? value.slice(0, WHITEBOARD_MAX_TEXT_CHARS) : "";

const isShapeTool = (tool) => WHITEBOARD_SHAPE_TOOLS.includes(tool);

const isVectorTool = (tool) => WHITEBOARD_VECTOR_TOOLS.includes(tool);

const normalizeFillColor = (value) =>
  typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value.trim())
    ? value.trim().toLowerCase()
    : "";

const normalizeShapeEdge = (value) =>
  WHITEBOARD_SHAPE_EDGE_OPTIONS.includes(value) ? value : "sharp";

const normalizeVectorRotation = (value) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) {
    return 0;
  }

  const turn = Math.PI * 2;
  let normalized = nextValue % turn;
  if (normalized > Math.PI) {
    normalized -= turn;
  } else if (normalized < -Math.PI) {
    normalized += turn;
  }

  return normalized;
};

const rotateScenePoint = (point, center, angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = point.x - center.x;
  const dy = point.y - center.y;

  return {
    x: center.x + dx * cos - dy * sin,
    y: center.y + dx * sin + dy * cos,
  };
};

const getVectorRotation = (stroke) =>
  isShapeTool(stroke?.tool) ? normalizeVectorRotation(stroke?.rotation) : 0;

const getShapeEdge = (stroke) =>
  ["rectangle", "diamond", "triangle"].includes(stroke?.tool)
    ? normalizeShapeEdge(stroke?.edgeStyle)
    : "sharp";

const getShapeTransform = (stroke, width, height, zoomScale = 1, surfaceMode = "page") => {
  if (!isShapeTool(stroke?.tool)) {
    return null;
  }

  const endpoints = getVectorEndpoints(stroke, width, height, zoomScale, surfaceMode);
  if (!endpoints) {
    return null;
  }

  const minX = Math.min(endpoints.start.x, endpoints.end.x);
  const maxX = Math.max(endpoints.start.x, endpoints.end.x);
  const minY = Math.min(endpoints.start.y, endpoints.end.y);
  const maxY = Math.max(endpoints.start.y, endpoints.end.y);

  return {
    scale: 1,
    surfaceWidth: width,
    surfaceHeight: height,
    zoomScale,
    surfaceMode,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    widthPx: Math.max(12, maxX - minX),
    heightPx: Math.max(12, maxY - minY),
    rotation: getVectorRotation(stroke),
  };
};

const createShapeStrokeFromTransform = (stroke, transform) => {
  if (
    !stroke ||
    !transform ||
    !Number.isFinite(transform.surfaceWidth) ||
    !Number.isFinite(transform.surfaceHeight)
  ) {
    return stroke;
  }

  const halfWidth = Math.max(6, transform.widthPx / 2);
  const halfHeight = Math.max(6, transform.heightPx / 2);
  const startPoint = unprojectScreenPoint(
    {
      x: transform.centerX - halfWidth,
      y: transform.centerY - halfHeight,
    },
    transform.surfaceWidth,
    transform.surfaceHeight,
    transform.zoomScale,
    transform.surfaceMode,
  );
  const endPoint = unprojectScreenPoint(
    {
      x: transform.centerX + halfWidth,
      y: transform.centerY + halfHeight,
    },
    transform.surfaceWidth,
    transform.surfaceHeight,
    transform.zoomScale,
    transform.surfaceMode,
  );

  return {
    ...stroke,
    points: [
      startPoint,
      endPoint,
    ],
    rotation: normalizeVectorRotation(transform.rotation),
    edgeStyle: getShapeEdge(stroke),
  };
};

const createTextStrokeFromTransform = (stroke, transform) => {
  if (
    !stroke ||
    !transform ||
    !Number.isFinite(transform.surfaceWidth) ||
    !Number.isFinite(transform.surfaceHeight)
  ) {
    return stroke;
  }

  const safeWidth = Math.max(18, Number(transform.widthPx) || 0);
  const safeHeight = Math.max(12, Number(transform.heightPx) || 0);
  const safeFontPixelSize = Math.min(
    240,
    Math.max(8, Number(transform.fontPixelSize) || Number(stroke?.fontPixelSize) || 16),
  );
  const left = transform.centerX - safeWidth / 2;
  const top = transform.centerY - safeHeight / 2;
  const pointPx = getTextPointFromBox({
    left,
    top,
    width: safeWidth,
    align: normalizeTextAlign(stroke?.textAlign),
  });
  const nextPoint = unprojectScreenPoint(
    pointPx,
    transform.surfaceWidth,
    transform.surfaceHeight,
    transform.zoomScale,
    transform.surfaceMode,
  );

  return {
    ...stroke,
    points: [nextPoint],
    fontPixelSize: safeFontPixelSize,
    textSize: getNearestTextSizePreset(safeFontPixelSize).id,
    rotation: normalizeVectorRotation(transform.rotation),
  };
};

const withAlpha = (hex, alpha = 1) => {
  const normalized = normalizeFillColor(hex);
  if (!normalized) {
    return "transparent";
  }

  const red = parseInt(normalized.slice(1, 3), 16);
  const green = parseInt(normalized.slice(3, 5), 16);
  const blue = parseInt(normalized.slice(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const getVectorEndpoints = (stroke, width, height, zoomScale = 1, surfaceMode = "page") => {
  const points = Array.isArray(stroke?.points) ? stroke.points : [];
  const start = points[0];
  const end = points[1] || points[0];
  if (!start || !end) {
    return null;
  }

  return {
    start: projectStoredPoint(start, width, height, zoomScale, surfaceMode),
    end: projectStoredPoint(end, width, height, zoomScale, surfaceMode),
  };
};

const buildVectorPath = (tool, start, end, rotation = 0, edgeStyle = "sharp") => {
  if (typeof Path2D === "undefined") {
    return null;
  }

  const path = new Path2D();
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const radiusX = Math.max(0, (maxX - minX) / 2);
  const radiusY = Math.max(0, (maxY - minY) / 2);
  const center = { x: centerX, y: centerY };
  const rotateLocalPoint = (x, y) =>
    rotateScenePoint(
      {
        x: centerX + x,
        y: centerY + y,
      },
      center,
      rotation,
    );
  const appendPolygon = (points) => {
    if (!points.length) {
      return;
    }

    path.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach((point) => {
      path.lineTo(point.x, point.y);
    });
    path.closePath();
  };
  const appendRoundedPolygon = (points, radius) => {
    if (points.length < 3) {
      appendPolygon(points);
      return;
    }

    const safeRadius = Math.max(0, radius);
    for (let index = 0; index < points.length; index += 1) {
      const prev = points[(index - 1 + points.length) % points.length];
      const current = points[index];
      const next = points[(index + 1) % points.length];
      const prevDx = current.x - prev.x;
      const prevDy = current.y - prev.y;
      const nextDx = next.x - current.x;
      const nextDy = next.y - current.y;
      const prevLength = Math.hypot(prevDx, prevDy) || 1;
      const nextLength = Math.hypot(nextDx, nextDy) || 1;
      const cornerRadius = Math.min(safeRadius, prevLength / 2, nextLength / 2);
      const startPoint = {
        x: current.x - (prevDx / prevLength) * cornerRadius,
        y: current.y - (prevDy / prevLength) * cornerRadius,
      };
      const endPoint = {
        x: current.x + (nextDx / nextLength) * cornerRadius,
        y: current.y + (nextDy / nextLength) * cornerRadius,
      };

      if (index === 0) {
        path.moveTo(startPoint.x, startPoint.y);
      } else {
        path.lineTo(startPoint.x, startPoint.y);
      }
      path.quadraticCurveTo(current.x, current.y, endPoint.x, endPoint.y);
    }
    path.closePath();
  };
  const normalizedEdgeStyle = normalizeShapeEdge(edgeStyle);
  const shapeCornerRadius = Math.min(radiusX, radiusY, 18);

  switch (tool) {
    case "rectangle": {
      const rectPoints = [
        rotateLocalPoint(-radiusX, -radiusY),
        rotateLocalPoint(radiusX, -radiusY),
        rotateLocalPoint(radiusX, radiusY),
        rotateLocalPoint(-radiusX, radiusY),
      ];
      if (normalizedEdgeStyle === "rounded" && typeof path.roundRect === "function" && rotation === 0) {
        path.roundRect(minX, minY, maxX - minX, maxY - minY, Math.max(4, shapeCornerRadius));
      } else if (normalizedEdgeStyle === "rounded") {
        appendRoundedPolygon(rectPoints, Math.max(4, shapeCornerRadius));
      } else {
        appendPolygon(rectPoints);
      }
      return path;
    }
    case "diamond": {
      const diamondPoints = [
        rotateLocalPoint(0, -radiusY),
        rotateLocalPoint(radiusX, 0),
        rotateLocalPoint(0, radiusY),
        rotateLocalPoint(-radiusX, 0),
      ];
      if (normalizedEdgeStyle === "rounded") {
        appendRoundedPolygon(diamondPoints, Math.max(4, Math.min(radiusX, radiusY) * 0.22));
      } else {
        appendPolygon(diamondPoints);
      }
      return path;
    }
    case "triangle": {
      const trianglePoints = [
        rotateLocalPoint(0, -radiusY),
        rotateLocalPoint(radiusX, radiusY),
        rotateLocalPoint(-radiusX, radiusY),
      ];
      if (normalizedEdgeStyle === "rounded") {
        appendRoundedPolygon(
          trianglePoints,
          Math.max(4, Math.min(radiusX, radiusY) * 0.18),
        );
      } else {
        appendPolygon(trianglePoints);
      }
      return path;
    }
    case "circle":
      path.ellipse(centerX, centerY, radiusX, radiusY, rotation, 0, Math.PI * 2);
      return path;
    case "arrow": {
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      const headLength = Math.max(12, Math.hypot(end.x - start.x, end.y - start.y) * 0.14);
      path.moveTo(start.x, start.y);
      path.lineTo(end.x, end.y);
      path.moveTo(end.x, end.y);
      path.lineTo(
        end.x - headLength * Math.cos(angle - Math.PI / 7),
        end.y - headLength * Math.sin(angle - Math.PI / 7),
      );
      path.moveTo(end.x, end.y);
      path.lineTo(
        end.x - headLength * Math.cos(angle + Math.PI / 7),
        end.y - headLength * Math.sin(angle + Math.PI / 7),
      );
      return path;
    }
    default:
      return null;
  }
};

const normalizeTextFontFamily = (value) =>
  WHITEBOARD_TEXT_FONT_OPTIONS.find((option) => option.id === value)?.id || "sans";

const getTextFontFamily = (value) =>
  WHITEBOARD_TEXT_FONT_OPTIONS.find((option) => option.id === value)?.family ||
  WHITEBOARD_TEXT_FONT_OPTIONS[0].family;

const normalizeTextSizePreset = (value) =>
  WHITEBOARD_TEXT_SIZE_OPTIONS.find((option) => option.id === value)?.id || "m";

const getNearestTextSizePreset = (fontSize) =>
  WHITEBOARD_TEXT_SIZE_OPTIONS.reduce((closest, option) =>
    Math.abs(option.fontSize - fontSize) < Math.abs(closest.fontSize - fontSize)
      ? option
      : closest,
  WHITEBOARD_TEXT_SIZE_OPTIONS[1]);

const getTextSizePresetValue = (value, fallbackBrushSize) => {
  const matchedPreset = WHITEBOARD_TEXT_SIZE_OPTIONS.find((option) => option.id === value);
  if (matchedPreset) {
    return matchedPreset.fontSize;
  }

  return Math.max(16, Math.round((Number(fallbackBrushSize) || 4) * 4));
};

const normalizeTextAlign = (value) =>
  WHITEBOARD_TEXT_ALIGN_OPTIONS.includes(value) ? value : "left";

const getSceneScale = (zoomScale) => {
  const nextScale = Number(zoomScale);
  if (!Number.isFinite(nextScale) || nextScale <= 0) {
    return 1;
  }

  return nextScale;
};

const isBoardZoomOutView = (surfaceMode, zoomScale) =>
  surfaceMode === "board" && getSceneScale(zoomScale) < 0.999;

const projectStoredPoint = (
  point,
  width,
  height,
  zoomScale = 1,
  surfaceMode = "page",
) => {
  const scale = getSceneScale(zoomScale);
  const x = Number(point?.x);
  const y = Number(point?.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return { x: 0, y: 0 };
  }

  if (isBoardZoomOutView(surfaceMode, scale)) {
    return {
      x: width * 0.5 + (x - 0.5) * width * scale,
      y: height * 0.5 + (y - 0.5) * height * scale,
    };
  }

  return {
    x: x * width,
    y: y * height,
  };
};

const unprojectScreenPoint = (
  point,
  width,
  height,
  zoomScale = 1,
  surfaceMode = "page",
) => {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const scale = getSceneScale(zoomScale);
  const x = Number(point?.x);
  const y = Number(point?.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return { x: 0, y: 0 };
  }

  if (isBoardZoomOutView(surfaceMode, scale)) {
    return {
      x: clampStoredCoordinate(0.5 + (x / safeWidth - 0.5) / scale, surfaceMode),
      y: clampStoredCoordinate(0.5 + (y / safeHeight - 0.5) / scale, surfaceMode),
    };
  }

  return {
    x: clampStoredCoordinate(x / safeWidth, surfaceMode),
    y: clampStoredCoordinate(y / safeHeight, surfaceMode),
  };
};

const getSceneDimensions = (width, height, zoomScale) => {
  const scale = getSceneScale(zoomScale);
  return {
    scale,
    sceneWidth: width / scale,
    sceneHeight: height / scale,
  };
};

const getTextLayout = (ctx, value, size, options = {}) => {
  const rawText = getTextValue(value);
  const normalizedText = rawText.trim();
  const fontFamilyId = normalizeTextFontFamily(options.fontFamily);
  const fontFamily = getTextFontFamily(fontFamilyId);
  const textSize = normalizeTextSizePreset(options.textSize);
  const explicitFontSize = Number(options.fontPixelSize);
  const fontSize = Math.max(
    8,
    Number.isFinite(explicitFontSize)
      ? explicitFontSize
      : getTextSizePresetValue(textSize, size),
  );
  const lineHeight = Math.round(fontSize * 1.24);
  const lines = normalizedText ? normalizedText.split(/\r?\n/) : [""];
  const textAlign = normalizeTextAlign(options.textAlign);

  let textWidth = 0;
  if (ctx) {
    ctx.save();
    ctx.font = `700 ${fontSize}px ${fontFamily}`;
    textWidth = lines.reduce((maxWidth, line) => {
      const metrics = ctx.measureText(line || " ");
      return Math.max(maxWidth, metrics.width);
    }, 0);
    ctx.restore();
  }

  return {
    rawText,
    text: normalizedText,
    fontFamilyId,
    fontFamily,
    textSize,
    textAlign,
    fontSize,
    lineHeight,
    lines,
    textWidth,
    textHeight: Math.max(lineHeight, lines.length * lineHeight),
  };
};

const drawStroke = (ctx, stroke, width, height, zoomScale = 1, surfaceMode = "page") => {
  const points = Array.isArray(stroke?.points) ? stroke.points : [];
  if (points.length === 0) {
    return;
  }

  const scale = getSceneScale(zoomScale);

  if (stroke?.tool === "text") {
    const point = points[0];
    const layout = getTextLayout(ctx, stroke?.text, stroke?.size, {
      fontFamily: stroke?.fontFamily,
      textSize: stroke?.textSize,
      textAlign: stroke?.textAlign,
      fontPixelSize: stroke?.fontPixelSize,
    });
    const text = layout.text;
    if (!text) {
      return;
    }

    const anchor = projectStoredPoint(point, width, height, zoomScale, surfaceMode);
    const scaledTextWidth = layout.textWidth * scale;
    const scaledTextHeight = layout.textHeight * scale;
    const scaledLineHeight = layout.lineHeight * scale;
    const scaledFontSize = layout.fontSize * scale;
    const textLeft =
      layout.textAlign === "center"
        ? anchor.x - scaledTextWidth / 2
        : layout.textAlign === "right"
          ? anchor.x - scaledTextWidth
          : anchor.x;
    const centerX = textLeft + scaledTextWidth / 2;
    const centerY = anchor.y + scaledTextHeight / 2;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Number.isFinite(Number(stroke?.rotation)) ? Number(stroke.rotation) : 0);
    ctx.translate(-centerX, -centerY);
    ctx.font = `700 ${scaledFontSize}px ${layout.fontFamily}`;
    ctx.fillStyle = stroke?.color || "#0f172a";
    ctx.textAlign = layout.textAlign;
    ctx.textBaseline = "top";
    layout.lines.forEach((line, index) => {
      ctx.fillText(
        line,
        anchor.x,
        anchor.y + index * scaledLineHeight,
      );
    });
    ctx.restore();
    return;
  }

  if (isVectorTool(stroke?.tool)) {
    const endpoints = getVectorEndpoints(stroke, width, height, zoomScale, surfaceMode);
    if (!endpoints) {
      return;
    }

    const path = buildVectorPath(
      stroke.tool,
      endpoints.start,
      endpoints.end,
      getVectorRotation(stroke),
      getShapeEdge(stroke),
    );
    if (!path) {
      return;
    }

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(1, (Number(stroke?.size) || 4) * scale);
    ctx.strokeStyle = stroke?.color || "#0f172a";
    if (isShapeTool(stroke.tool) && normalizeFillColor(stroke?.fillColor)) {
      ctx.fillStyle = withAlpha(stroke.fillColor, 0.18);
      ctx.fill(path);
    }
    ctx.stroke(path);
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(1, (Number(stroke?.size) || 4) * scale);
  ctx.globalCompositeOperation =
    stroke?.tool === "eraser" ? "destination-out" : "source-over";
  ctx.strokeStyle = stroke?.tool === "eraser" ? "#000000" : stroke?.color || "#0f172a";
  ctx.fillStyle = stroke?.tool === "eraser" ? "#000000" : stroke?.color || "#0f172a";

  if (points.length === 1) {
    const point = projectStoredPoint(points[0], width, height, zoomScale, surfaceMode);
    ctx.beginPath();
    ctx.arc(point.x, point.y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  const projectedPoints = points.map((point) =>
    projectStoredPoint(point, width, height, zoomScale, surfaceMode),
  );
  const drawSmoothPolyline = (polylinePoints) => {
    if (polylinePoints.length < 2) {
      return;
    }

    if (polylinePoints.length === 2) {
      ctx.moveTo(polylinePoints[0].x, polylinePoints[0].y);
      ctx.lineTo(polylinePoints[1].x, polylinePoints[1].y);
      return;
    }

    ctx.moveTo(polylinePoints[0].x, polylinePoints[0].y);
    for (let index = 1; index < polylinePoints.length - 1; index += 1) {
      const current = polylinePoints[index];
      const next = polylinePoints[index + 1];
      const midPoint = {
        x: (current.x + next.x) / 2,
        y: (current.y + next.y) / 2,
      };
      ctx.quadraticCurveTo(current.x, current.y, midPoint.x, midPoint.y);
    }
    const penultimate = polylinePoints[polylinePoints.length - 2];
    const last = polylinePoints[polylinePoints.length - 1];
    ctx.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
  };

  ctx.beginPath();
  drawSmoothPolyline(projectedPoints);
  ctx.stroke();
  ctx.restore();
};

const appendDistinctPoint = (points, point) => {
  if (!point) {
    return false;
  }

  const lastPoint = points[points.length - 1];
  if (lastPoint && lastPoint.x === point.x && lastPoint.y === point.y) {
    return false;
  }

  points.push(point);
  return true;
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

const isPublicCdnPdfUrl = (fileUrl) => /^https?:\/\/files\./i.test(String(fileUrl || "").trim());

const buildPdfProxyUrl = (fileUrl) => {
  const normalizedUrl = String(fileUrl || "").trim();
  logPdfDebug("build-url", {
    fileUrl,
    normalizedUrl,
    isPublicCdn: isPublicCdnPdfUrl(normalizedUrl),
  });
  return normalizedUrl;
};

const fetchPdfDocumentBuffer = async (targetUrl) => {
  const cachedBytes = pdfBufferCache.get(targetUrl);
  if (cachedBytes instanceof Uint8Array && cachedBytes.byteLength > 0) {
    logPdfDebug("buffer-fetch:cache-hit", {
      targetUrl,
      byteLength: cachedBytes.byteLength,
    });
    const loadingTask = pdfjsLib.getDocument({
      data: cachedBytes.slice(),
      disableRange: true,
      disableStream: true,
      disableAutoFetch: true,
    });
    const pdfDocument = await loadingTask.promise;
    logPdfDebug("buffer-fetch:pdf-ready", {
      targetUrl,
      numPages: pdfDocument?.numPages,
      fromCache: true,
    });
    return pdfDocument;
  }

  if (pdfBufferPromiseCache.has(targetUrl)) {
    logPdfDebug("buffer-fetch:await-pending", { targetUrl });
    const pendingBytes = await pdfBufferPromiseCache.get(targetUrl);
    const loadingTask = pdfjsLib.getDocument({
      data: pendingBytes.slice(),
      disableRange: true,
      disableStream: true,
      disableAutoFetch: true,
    });
    const pdfDocument = await loadingTask.promise;
    logPdfDebug("buffer-fetch:pdf-ready", {
      targetUrl,
      numPages: pdfDocument?.numPages,
      fromPendingCache: true,
    });
    return pdfDocument;
  }

  logPdfDebug("buffer-fetch:start", { targetUrl });
  const pdfBytesPromise = (async () => {
    const response = await fetch(targetUrl, {
      credentials: "omit",
      cache: "default",
      headers: {
        Accept: "application/pdf",
      },
    });
    if (!response.ok) {
      logPdfDebug("buffer-fetch:http-error", {
        targetUrl,
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`PDF fetch failed with ${response.status}`);
    }

    logPdfDebug("buffer-fetch:response", {
      targetUrl,
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get("content-type"),
      contentLength: response.headers.get("content-length"),
      acceptRanges: response.headers.get("accept-ranges"),
      contentRange: response.headers.get("content-range"),
      cacheControl: response.headers.get("cache-control"),
    });

    const pdfBuffer = await response.arrayBuffer();
    const pdfBytes = new Uint8Array(pdfBuffer);
    const pdfSignature = String.fromCharCode(...pdfBytes.slice(0, 5));
    logPdfDebug("buffer-fetch:bytes", {
      targetUrl,
      byteLength: pdfBytes.byteLength,
      signature: pdfSignature,
    });
    if (pdfSignature !== "%PDF-") {
      logPdfDebug("buffer-fetch:invalid-signature", {
        targetUrl,
        signature: pdfSignature,
      });
      throw new Error("PDF response did not return a valid PDF file");
    }
    touchPdfBufferCacheEntry(targetUrl, pdfBytes);
    return pdfBytes;
  })();

  pdfBufferPromiseCache.set(targetUrl, pdfBytesPromise);

  try {
    const pdfBytes = await pdfBytesPromise;
    const loadingTask = pdfjsLib.getDocument({
      data: pdfBytes.slice(),
      disableRange: true,
      disableStream: true,
      disableAutoFetch: true,
    });
    loadingTask.onProgress = (progress) => {
      logPdfDebug("buffer-fetch:progress", {
        targetUrl,
        loaded: progress?.loaded,
        total: progress?.total,
      });
    };
    const pdfDocument = await loadingTask.promise;
    logPdfDebug("buffer-fetch:pdf-ready", {
      targetUrl,
      numPages: pdfDocument?.numPages,
      fromCache: false,
    });
    return pdfDocument;
  } catch (error) {
    logPdfDebug("buffer-fetch:pdf-error", {
      targetUrl,
      error: serializePdfError(error),
    });
    throw error;
  } finally {
    pdfBufferPromiseCache.delete(targetUrl);
  }
};

const loadPdfDocument = async (fileUrl, options = {}) => {
  const targetUrl = buildPdfProxyUrl(fileUrl);
  const preferBuffer = Boolean(options.preferBuffer);
  logPdfDebug("load:start", {
    fileUrl,
    targetUrl,
    preferBuffer,
    isPublicCdn: isPublicCdnPdfUrl(targetUrl),
  });

  if (preferBuffer || isPublicCdnPdfUrl(targetUrl)) {
    logPdfDebug("load:prefer-buffer", { targetUrl });
    return fetchPdfDocumentBuffer(targetUrl);
  }

  try {
    logPdfDebug("load:url-anon:start", { targetUrl });
    const loadingTask = pdfjsLib.getDocument({
      url: targetUrl,
      withCredentials: false,
    });
    loadingTask.onProgress = (progress) => {
      logPdfDebug("load:url-anon:progress", {
        targetUrl,
        loaded: progress?.loaded,
        total: progress?.total,
      });
    };
    const pdfDocument = await loadingTask.promise;
    logPdfDebug("load:url-anon:ready", {
      targetUrl,
      numPages: pdfDocument?.numPages,
    });
    return pdfDocument;
  } catch (publicUrlError) {
    logPdfDebug("load:url-anon:error", {
      targetUrl,
      error: serializePdfError(publicUrlError),
    });
    try {
      logPdfDebug("load:url-auth:start", { targetUrl });
      const authenticatedLoadingTask = pdfjsLib.getDocument({
        url: targetUrl,
        withCredentials: true,
      });
      authenticatedLoadingTask.onProgress = (progress) => {
        logPdfDebug("load:url-auth:progress", {
          targetUrl,
          loaded: progress?.loaded,
          total: progress?.total,
        });
      };
      const pdfDocument = await authenticatedLoadingTask.promise;
      logPdfDebug("load:url-auth:ready", {
        targetUrl,
        numPages: pdfDocument?.numPages,
      });
      return pdfDocument;
    } catch (credentialedUrlError) {
      logPdfDebug("load:url-auth:error", {
        targetUrl,
        error: serializePdfError(credentialedUrlError),
      });
      try {
        logPdfDebug("load:fallback-buffer", { targetUrl });
        return await fetchPdfDocumentBuffer(targetUrl);
      } catch (fetchIncludeError) {
        logPdfDebug("load:fallback-buffer:error", {
          targetUrl,
          error: serializePdfError(fetchIncludeError),
        });
        throw fetchIncludeError || credentialedUrlError || publicUrlError;
      }
    }
  }
};

const measureTextStrokeBounds = (
  ctx,
  stroke,
  width,
  height,
  zoomScale = 1,
  surfaceMode = "page",
) => {
  const scale = getSceneScale(zoomScale);
  const points = Array.isArray(stroke?.points) ? stroke.points : [];
  const point = points[0];
  const layout = getTextLayout(ctx, stroke?.text, stroke?.size, {
    fontFamily: stroke?.fontFamily,
    textSize: stroke?.textSize,
    textAlign: stroke?.textAlign,
    fontPixelSize: stroke?.fontPixelSize,
  });
  const text = layout.text;
  if (!ctx || !point || !text) {
    return null;
  }

  const anchor = projectStoredPoint(point, width, height, zoomScale, surfaceMode);
  const scaledTextWidth = layout.textWidth * scale;
  const scaledTextHeight = layout.textHeight * scale;
  const left =
    layout.textAlign === "center"
      ? anchor.x - scaledTextWidth / 2
      : layout.textAlign === "right"
        ? anchor.x - scaledTextWidth
        : anchor.x;

  return {
    left,
    top: anchor.y,
    right: left + scaledTextWidth,
    bottom: anchor.y + scaledTextHeight,
    width: scaledTextWidth,
    height: scaledTextHeight,
    fontSize: layout.fontSize * scale,
    lineHeight: layout.lineHeight * scale,
  };
};

const inflateSelectionBounds = (bounds, padding = WHITEBOARD_SELECTION_PADDING) => {
  if (!bounds) {
    return null;
  }

  return {
    ...bounds,
    left: bounds.left - padding,
    top: bounds.top - padding,
    width: bounds.width + padding * 2,
    height: bounds.height + padding * 2,
  };
};

const getTextPointFromBox = ({ left, top, width, align }) => ({
  x: align === "center" ? left + width / 2 : align === "right" ? left + width : left,
  y: top,
});

const getStrokeSelectionBounds = (
  stroke,
  width,
  height,
  zoomScale,
  measureCtx,
  surfaceMode = "page",
) => {
  if (!stroke || width <= 0 || height <= 0) {
    return null;
  }

  if (stroke.tool === "text") {
    const bounds = measureTextStrokeBounds(
      measureCtx,
      stroke,
      width,
      height,
      zoomScale,
      surfaceMode,
    );
    if (!bounds) {
      return null;
    }

    const layout = getTextLayout(measureCtx, stroke.text, stroke.size, {
      fontFamily: stroke.fontFamily,
      textSize: stroke.textSize,
      textAlign: stroke.textAlign,
      fontPixelSize: stroke.fontPixelSize,
    });
    return {
      kind: "text",
      rotation: Number(stroke.rotation) || 0,
      scale: 1,
      surfaceWidth: width,
      surfaceHeight: height,
      zoomScale,
      surfaceMode,
      widthPx: bounds.width,
      heightPx: bounds.height,
      centerX: bounds.left + bounds.width / 2,
      centerY: bounds.top + bounds.height / 2,
      contentLeft: bounds.left,
      contentTop: bounds.top,
      contentWidth: bounds.width,
      contentHeight: bounds.height,
      point: stroke.points?.[0] || null,
      textAlign: layout.textAlign,
      fontPixelSize: layout.fontSize,
      left: bounds.left - WHITEBOARD_SELECTION_PADDING,
      top: bounds.top - WHITEBOARD_SELECTION_PADDING,
      width: bounds.width + WHITEBOARD_SELECTION_PADDING * 2,
      height: bounds.height + WHITEBOARD_SELECTION_PADDING * 2,
    };
  }

  const transform = getShapeTransform(stroke, width, height, zoomScale, surfaceMode);
  if (!transform) {
    return null;
  }

  return {
    kind: "shape",
    ...transform,
    left:
      (transform.centerX - transform.widthPx / 2) -
      WHITEBOARD_SELECTION_PADDING,
    top:
      (transform.centerY - transform.heightPx / 2) -
      WHITEBOARD_SELECTION_PADDING,
    width: transform.widthPx + WHITEBOARD_SELECTION_PADDING * 2,
    height: transform.heightPx + WHITEBOARD_SELECTION_PADDING * 2,
  };
};

const hitTestVectorStroke = (
  ctx,
  stroke,
  pointerPx,
  width,
  height,
  zoomScale = 1,
  surfaceMode = "page",
) => {
  const scale = getSceneScale(zoomScale);
  const endpoints = getVectorEndpoints(stroke, width, height, zoomScale, surfaceMode);
  if (!ctx || !endpoints) {
    return false;
  }

  const path = buildVectorPath(
    stroke.tool,
    endpoints.start,
    endpoints.end,
    getVectorRotation(stroke),
    getShapeEdge(stroke),
  );
  if (!path) {
    return false;
  }

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(10, (Number(stroke?.size) || 4) * scale + 8);
  const hitStroke = ctx.isPointInStroke(path, pointerPx.x, pointerPx.y);
  const hitFill =
    isShapeTool(stroke?.tool) &&
    normalizeFillColor(stroke?.fillColor) &&
    ctx.isPointInPath(path, pointerPx.x, pointerPx.y);
  ctx.restore();

  return Boolean(hitStroke || hitFill);
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
  opacity: ${(p) => (p.$visible ? 1 : 0.92)};
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
  padding: 10px 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const WorkspaceDivider = styled.div`
  flex: 0 0 auto;
  height: 1px;
  margin: 0 10px;
  background: linear-gradient(
    90deg,
    rgba(15, 23, 42, 0.04),
    rgba(15, 23, 42, 0.12) 14%,
    rgba(15, 23, 42, 0.12) 86%,
    rgba(15, 23, 42, 0.04)
  );
`;

const TabsBar = styled.div`
  display: flex;
  align-items: flex-end;
  min-width: 0;
  padding: 4px 4px 0;
  border-radius: 18px 18px 0 0;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.96), rgba(241,244,249,0.92)),
    radial-gradient(circle at top left, rgba(99, 102, 241, 0.08), transparent 38%);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-bottom: none;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.78),
    0 14px 28px rgba(15, 23, 42, 0.08);
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
  position: relative;
  border: 1px solid
    ${(p) =>
      p.$active
        ? "rgba(99, 102, 241, 0.24)"
        : "rgba(15, 23, 42, 0.08)"};
  border-bottom-color: ${(p) => (p.$active ? "rgba(255,255,255,0.96)" : "rgba(15, 23, 42, 0.06)")};
  background: ${(p) =>
    p.$active
      ? "linear-gradient(180deg, rgba(255,255,255,1), rgba(250,251,255,0.98))"
      : "linear-gradient(180deg, rgba(232,236,243,0.96), rgba(223,228,237,0.92))"};
  color: ${(p) => (p.$active ? "rgba(15, 23, 42, 0.96)" : "rgba(15, 23, 42, 0.68)")};
  border-radius: 16px 16px 0 0;
  min-width: 132px;
  max-width: 240px;
  height: 46px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  cursor: ${(p) => (p.$disabled ? "default" : "pointer")};
  box-shadow: ${(p) =>
    p.$active
      ? "0 14px 24px rgba(99, 102, 241, 0.12), inset 0 1px 0 rgba(255,255,255,0.88)"
      : "inset 0 1px 0 rgba(255,255,255,0.52)"};
  opacity: ${(p) => (p.$disabled && !p.$active ? 0.84 : 1)};
  transform: translateY(${(p) => (p.$active ? "1px" : "3px")});
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    background 0.16s ease,
    color 0.16s ease,
    border-color 0.16s ease;

  &:hover {
    transform: translateY(${(p) => (p.$active ? "1px" : "2px")});
    color: rgba(15, 23, 42, 0.92);
    border-color: ${(p) =>
      p.$active ? "rgba(99, 102, 241, 0.3)" : "rgba(15, 23, 42, 0.12)"};
  }

  &::after {
    content: "";
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 0;
    height: 2px;
    border-radius: 999px;
    background: ${(p) =>
      p.$active ? "linear-gradient(90deg, #6366f1, #8b5cf6)" : "transparent"};
  }
`;

const TabTitle = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.01em;
`;

const TabCloseButton = styled.button`
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: none;
  background: rgba(15, 23, 42, 0.04);
  color: rgba(15, 23, 42, 0.56);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.16s ease, color 0.16s ease, transform 0.16s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.1);
    color: rgba(15, 23, 42, 0.9);
    transform: scale(1.04);
  }
`;

const AddTabButton = styled.button`
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  align-self: center;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(244,246,251,0.92));
  color: rgba(15, 23, 42, 0.74);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.82),
    0 10px 20px rgba(15, 23, 42, 0.08);
  transition: transform 0.16s ease, color 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    color: rgba(15, 23, 42, 0.92);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.9),
      0 14px 24px rgba(15, 23, 42, 0.1);
  }
`;

const Toolbar = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.1);
  width: fit-content;
  max-width: calc(100% - 24px);
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  pointer-events: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    max-width: calc(100% - 16px);
  }
`;

const ToolbarMain = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
  flex: 0 0 auto;
`;

const ToolbarSpacer = styled.div`
  flex: 1 1 auto;
  min-width: 8px;

  @media (max-width: 768px) {
    flex: 0 0 0;
    min-width: 0;
  }
`;

const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
`;

const FloatingTopToolbar = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 8;
  display: flex;
  justify-content: center;
  width: 100%;
  pointer-events: none;

  @media (max-width: 768px) {
    top: 8px;
  }
`;

const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  flex: 0 0 auto;
`;

const ToolbarDivider = styled.div`
  width: 1px;
  align-self: stretch;
  background: rgba(15, 23, 42, 0.12);
  margin: 0 2px;
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
  color: ${(p) => (p.$danger ? "var(--call-danger)" : "#111111")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ToolOptionButton = styled.button`
  position: relative;
  width: 36px;
  height: 36px;
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
  color: #111111;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${(p) => (p.$active ? "0 8px 18px rgba(84, 91, 255, 0.12)" : "none")};
  transition: border-color 0.16s ease, background 0.16s ease, color 0.16s ease, box-shadow 0.16s ease;
`;

const ToolHotkey = styled.span`
  position: absolute;
  right: 5px;
  bottom: 4px;
  font-size: 9px;
  line-height: 1;
  font-weight: 600;
  color: rgba(15, 23, 42, 0.66);
`;

const RecordToolbarButton = styled.button`
  height: 36px;
  min-width: ${(p) => (p.$recording ? "118px" : "82px")};
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid
    ${(p) =>
      p.$recording
        ? "rgba(220, 38, 38, 0.34)"
        : "rgba(220, 38, 38, 0.18)"};
  background: ${(p) =>
    p.$recording
      ? "linear-gradient(180deg, rgba(255, 240, 240, 0.98), rgba(255, 229, 229, 0.94))"
      : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,245,245,0.92))"};
  color: #dc2626;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: ${(p) => (p.$recording ? "0 10px 24px rgba(220, 38, 38, 0.16)" : "none")};
  transition:
    border-color 0.16s ease,
    background 0.16s ease,
    transform 0.16s ease,
    box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(220, 38, 38, 0.12);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const RecordDot = styled.span`
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
  border-radius: 999px;
  background: #dc2626;
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.14);
`;

const RecordStopGlyph = styled.span`
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
  border-radius: 2px;
  background: currentColor;
`;

const RecordToolbarLabel = styled.span`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

const RecordToolbarTime = styled.span`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
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

const FillSwatchButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 2px solid ${(p) => (p.$active ? "#0f172a" : "rgba(255,255,255,0.86)")};
  background: ${(p) =>
    p.$transparent
      ? "linear-gradient(45deg, rgba(226,232,240,0.85) 25%, transparent 25%, transparent 50%, rgba(226,232,240,0.85) 50%, rgba(226,232,240,0.85) 75%, transparent 75%, transparent)"
      : p.$swatch};
  background-size: ${(p) => (p.$transparent ? "10px 10px" : "auto")};
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.14);
  cursor: pointer;
`;

const BrushPresetWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(15, 23, 42, 0.74);
  font-size: 12px;
  font-weight: 700;
`;

const BrushPresetGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const BrushPresetButton = styled.button`
  width: 48px;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BrushPresetStroke = styled.span`
  display: block;
  width: 18px;
  height: ${(p) => `${p.$size}px`};
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.88);
`;

const EdgePreviewShape = styled.span`
  width: 18px;
  height: 18px;
  position: relative;
  display: inline-block;

  &::before {
    content: "";
    position: absolute;
    inset: 2px;
    border: 2px dashed #111111;
    border-radius: ${(p) => (p.$rounded ? "6px" : "1px")};
    background: transparent;
  }
`;

const PickerWrap = styled.div`
  position: relative;
`;

const CurrentValueButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 12px;
  border: 1px solid
    ${(p) =>
      p.$active
        ? "color-mix(in srgb, var(--call-primary) 44%, transparent)"
        : "rgba(15, 23, 42, 0.08)"};
  background: ${(p) =>
    p.$active
      ? "color-mix(in srgb, var(--call-primary) 12%, white 88%)"
      : "rgba(255, 255, 255, 0.9)"};
  color: #111111;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CurrentColorDot = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.9);
  background: ${(p) => p.$swatch};
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.14);
`;

const CurrentFillSwatch = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 2px solid rgba(15, 23, 42, 0.12);
  background: ${(p) =>
    p.$transparent
      ? "linear-gradient(45deg, rgba(226,232,240,0.85) 25%, transparent 25%, transparent 50%, rgba(226,232,240,0.85) 50%, rgba(226,232,240,0.85) 75%, transparent 75%, transparent)"
      : p.$swatch};
  background-size: ${(p) => (p.$transparent ? "10px 10px" : "auto")};
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.1);
`;

const PickerPopover = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 10;
  padding: 10px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.14);
  backdrop-filter: blur(12px);
`;

const PickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PickerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
`;

const TextControlGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.9);
`;

const TextPillButton = styled.button`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid
    ${(p) =>
      p.$active
        ? "color-mix(in srgb, var(--call-primary) 44%, transparent)"
        : "transparent"};
  background: ${(p) =>
    p.$active
      ? "color-mix(in srgb, var(--call-primary) 12%, white 88%)"
      : "transparent"};
  color: #111111;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ZoomReadout = styled.div`
  min-width: 58px;
  text-align: center;
  font-size: 12px;
  font-weight: 800;
  color: rgba(15, 23, 42, 0.72);
`;

const FloatingControls = styled.div`
  position: absolute;
  left: 18px;
  bottom: 18px;
  z-index: 6;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  pointer-events: none;

  @media (max-width: 768px) {
    left: 14px;
    bottom: 14px;
    gap: 10px;
  }
`;

const FloatingGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border-radius: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  backdrop-filter: none;
  pointer-events: auto;
`;

const FloatingZoomValue = styled.div`
  min-width: 62px;
  text-align: center;
  font-size: 16px;
  line-height: 1;
  font-weight: 500;
  color: rgba(15, 23, 42, 0.92);
`;

const WorkspaceBody = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  padding: ${(p) => (p.$compact ? "0" : "0 10px 10px")};
`;

const BoardViewport = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 0 0 18px 18px;
  overscroll-behavior: contain;
  touch-action: none;
  background:
    radial-gradient(circle, rgba(148, 163, 184, 0.3) 1.4px, transparent 1.5px),
    linear-gradient(180deg, rgba(255,255,255,0.985), rgba(247,248,250,0.985));
  background-size: 40px 40px, auto;
  background-position: 0 0, 0 0;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BoardViewportContent = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoardCanvasFrame = styled.div`
  position: relative;
  flex: 0 0 auto;
`;

const BoardSurface = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 0 18px 18px;
  background: transparent;
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
  padding: 0 20px;
  scroll-padding-top: ${WHITEBOARD_VIEWPORT_TOP_SAFE_SPACE}px;
  scroll-padding-bottom: ${WHITEBOARD_VIEWPORT_BOTTOM_SAFE_SPACE}px;
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

const PdfViewportSpacer = styled.div`
  width: 100%;
  flex: 0 0 auto;
  height: ${(p) => `${p.$size || 0}px`};
  pointer-events: none;
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
      ? p.$tool === "select"
        ? "default"
        : p.$tool === "eraser"
        ? "cell"
        : p.$tool === "text"
          ? "text"
          : "crosshair"
      : "default"};
`;

const TextEditorOverlay = styled.div`
  position: absolute;
  z-index: 6;
  pointer-events: auto;
`;

const TextSelectionBox = styled.div`
  position: relative;
  min-width: 96px;
  min-height: 42px;
  border-radius: 8px;
  background: transparent;
  box-shadow: none;
`;

const TextInlineInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: ${WHITEBOARD_TEXT_EDITOR_VERTICAL_PADDING}px
    ${WHITEBOARD_TEXT_EDITOR_HORIZONTAL_PADDING}px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #111827;
  resize: none;
  outline: none;
  overflow: hidden;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.24;
  white-space: pre;
`;

const TextSelectionHandle = styled.button`
  position: absolute;
  top: -26px;
  left: 50%;
  width: 18px;
  height: 18px;
  padding: 0;
  transform: translateX(-50%);
  border-radius: 999px;
  border: 2px solid #6b6cff;
  background: #fff;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.14);
  cursor: grab;
`;

const TextSelectionCorner = styled.span`
  position: absolute;
  width: 12px;
  height: 12px;
  pointer-events: none;
  border-radius: 4px;
  border: 2px solid #6b6cff;
  background: #fff;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.12);
  ${(p) => p.$top && "top: -8px;"}
  ${(p) => p.$bottom && "bottom: -8px;"}
  ${(p) => p.$left && "left: -8px;"}
  ${(p) => p.$right && "right: -8px;"}
`;

const ShapeSelectionOverlay = styled.div`
  position: absolute;
  z-index: 6;
  pointer-events: auto;
  transform-origin: center center;
`;

const ShapeSelectionBox = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 2px solid #6b6cff;
  border-radius: 2px;
  background: transparent;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  cursor: move;
`;

const ShapeSelectionRotateHandle = styled.button`
  position: absolute;
  top: -30px;
  left: 50%;
  width: 18px;
  height: 18px;
  padding: 0;
  transform: translateX(-50%);
  border-radius: 999px;
  border: 2px solid #6b6cff;
  background: #fff;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.14);
  cursor: grab;
`;

const ShapeSelectionCornerButton = styled.button`
  position: absolute;
  width: 14px;
  height: 14px;
  padding: 0;
  border-radius: 4px;
  border: 2px solid #6b6cff;
  background: #fff;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.12);
  ${(p) => p.$top && "top: -9px;"}
  ${(p) => p.$bottom && "bottom: -9px;"}
  ${(p) => p.$left && "left: -9px;"}
  ${(p) => p.$right && "right: -9px;"}
  cursor: ${(p) =>
    p.$top && p.$left
      ? "nwse-resize"
      : p.$top && p.$right
        ? "nesw-resize"
        : p.$bottom && p.$left
          ? "nesw-resize"
          : "nwse-resize"};
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
  grid-auto-flow: column;
  grid-auto-columns: 168px;
  gap: 14px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 6px;
  align-items: start;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
`;

const PagePreviewCard = styled.button`
  position: relative;
  width: 168px;
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
  min-height: 188px;
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
  const [isVisible, setIsVisible] = useState(pageNumber <= 2);
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

    const scrollRoot = element.closest("[data-pdf-picker-scroll-root]");

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
        root: scrollRoot instanceof HTMLElement ? scrollRoot : null,
        rootMargin: "120px 240px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  useEffect(() => {
    let disposed = false;

    const renderPreview = async ({ targetWidth, pixelRatio }) => {
      logPdfDebug("picker-preview:start", {
        pageNumber,
        targetWidth,
        pixelRatio,
      });
      const page = await pdfDocument.getPage(pageNumber);
      if (disposed) {
        return false;
      }

      const baseViewport = page.getViewport({
        scale: 1,
        rotation: resolvePdfPageRotation(page),
      });
      const scale = targetWidth / Math.max(1, baseViewport.width);
      const viewport = page.getViewport({
        scale,
        rotation: resolvePdfPageRotation(page),
      });
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d", { alpha: false });
      if (!canvas || !context) {
        return false;
      }

      const safePixelRatio = Math.max(1, Math.min(2, pixelRatio));
      canvas.width = Math.round(viewport.width * safePixelRatio);
      canvas.height = Math.round(viewport.height * safePixelRatio);
      canvas.style.width = `${Math.round(viewport.width)}px`;
      canvas.style.height = `${Math.round(viewport.height)}px`;
      context.setTransform(safePixelRatio, 0, 0, safePixelRatio, 0, 0);
      context.clearRect(0, 0, viewport.width, viewport.height);

      const renderTask = page.render({
        canvasContext: context,
        viewport,
      });
      await renderTask.promise;
      page.cleanup?.();
      logPdfDebug("picker-preview:ready", {
        pageNumber,
        targetWidth,
        pixelRatio,
        viewportWidth: viewport.width,
        viewportHeight: viewport.height,
      });
      return true;
    };

    const renderPage = async () => {
      if (!pdfDocument || !isVisible) {
        return;
      }

      setRenderState("loading");

      try {
        const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
        const isMobileSafari = isMobileSafariBrowser();
        const primaryRendered = await renderPreview({
          targetWidth: isMobileSafari ? 122 : isSmallScreen ? 138 : 156,
          pixelRatio: isMobileSafari ? 1 : isSmallScreen ? 1 : window.devicePixelRatio || 1,
        });
        if (!primaryRendered) {
          throw new Error("Preview canvas unavailable");
        }

        if (!disposed) {
          setRenderState("ready");
        }
      } catch (error) {
        logPdfDebug("picker-preview:primary-error", {
          pageNumber,
          error: serializePdfError(error),
        });
        try {
          const fallbackRendered = await renderPreview({
            targetWidth: 128,
            pixelRatio: 1,
          });
          if (!disposed && fallbackRendered) {
            setRenderState("ready");
            return;
          }
        } catch (fallbackError) {
          logPdfDebug("picker-preview:fallback-error", {
            pageNumber,
            error: serializePdfError(fallbackError),
          });
        }

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
            {renderState === "loading" ? <Spinner size={18} /> : pageNumber}
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
  fillColor = "",
  shapeEdge = "sharp",
  brushSize = 4,
  zoomScale = 1,
  textFontFamily = "sans",
  textSize = "m",
  textAlign = "left",
  textPlaceholder = "Text",
  tabId,
  pageNumber,
  surfaceMode = "page",
  onStrokeStart,
  onStrokeAppend,
  onStrokeRemove,
  onStrokeUpdate,
  onToolChange,
  onTextEditorStateChange,
}) => {
  const canvasRef = useRef(null);
  const surfaceRef = useRef(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const pointerStateRef = useRef(null);
  const pendingPointsRef = useRef([]);
  const flushTimeoutRef = useRef(null);
  const textInputRef = useRef(null);
  const textEditorRef = useRef(null);
  const dragStateRef = useRef(null);
  const shapeTransformStateRef = useRef(null);
  const textCommitLockRef = useRef(false);
  const latestTextStyleRef = useRef({
    color,
    size: brushSize,
    fontFamily: textFontFamily,
    textSize,
    textAlign,
    fontPixelSize: getTextSizePresetValue(textSize, brushSize),
  });
  const fallbackMeasureCanvasRef = useRef(null);
  const draftStrokeRef = useRef(null);
  const [surfaceSize, setSurfaceSize] = useState({ width: 0, height: 0 });
  const [textEditor, setTextEditor] = useState(null);
  const [selectedShapeId, setSelectedShapeId] = useState("");
  const [shapePreviewStroke, setShapePreviewStroke] = useState(null);
  latestTextStyleRef.current = {
    color,
    size: brushSize,
    fontFamily: textFontFamily,
    textSize,
    textAlign,
    fontPixelSize: getTextSizePresetValue(textSize, brushSize),
  };

  const getMeasureContext = useCallback(() => {
    const liveContext = canvasRef.current?.getContext("2d");
    if (liveContext) {
      return liveContext;
    }

    if (!fallbackMeasureCanvasRef.current && typeof document !== "undefined") {
      fallbackMeasureCanvasRef.current = document.createElement("canvas");
    }

    return fallbackMeasureCanvasRef.current?.getContext("2d") || null;
  }, []);

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
    const editingStrokeId = textEditor?.strokeId || "";
    const previewShapeStrokeId = shapePreviewStroke?.id || "";
    const draftStrokeId = draftStrokeRef.current?.id || "";
    (Array.isArray(strokes) ? strokes : []).forEach((stroke) => {
      if (
        (editingStrokeId && stroke?.id === editingStrokeId) ||
        (previewShapeStrokeId && stroke?.id === previewShapeStrokeId) ||
        (draftStrokeId && stroke?.id === draftStrokeId)
      ) {
        return;
      }
      drawStroke(ctx, stroke, width, height, zoomScale, surfaceMode);
    });
    if (shapePreviewStroke) {
      drawStroke(ctx, shapePreviewStroke, width, height, zoomScale, surfaceMode);
    }
    if (draftStrokeRef.current) {
      drawStroke(ctx, draftStrokeRef.current, width, height, zoomScale, surfaceMode);
    }
  }, [shapePreviewStroke, strokes, surfaceMode, textEditor?.strokeId, zoomScale]);

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
      setSurfaceSize({ width, height });
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
    redrawCanvas();
  }, [redrawCanvas, textEditor?.strokeId]);

  useEffect(() => {
    textEditorRef.current = textEditor;
  }, [textEditor]);

  useEffect(() => {
    onTextEditorStateChange?.(textEditor);

    return () => {
      onTextEditorStateChange?.(null);
    };
  }, [onTextEditorStateChange, textEditor]);

  const selectedStroke = useMemo(() => {
    if (!selectedShapeId) {
      return null;
    }

    if (shapePreviewStroke?.id === selectedShapeId) {
      return shapePreviewStroke;
    }

    return (Array.isArray(strokes) ? strokes : []).find(
      (stroke) =>
        stroke.id === selectedShapeId &&
        (isShapeTool(stroke.tool) || stroke.tool === "text"),
    ) || null;
  }, [selectedShapeId, shapePreviewStroke, strokes]);

  useEffect(() => {
    if (!selectedShapeId) {
      return;
    }

    const sourceStroke = (Array.isArray(strokes) ? strokes : []).find((stroke) =>
      stroke.id === selectedShapeId &&
      (isShapeTool(stroke.tool) || stroke.tool === "text"),
    );
    if (!sourceStroke) {
      setSelectedShapeId("");
      setShapePreviewStroke(null);
    }
  }, [selectedShapeId, strokes]);

  useEffect(() => {
    if (tool === "text" || tool === "pen" || tool === "eraser" || tool === "stroke-eraser") {
      setShapePreviewStroke(null);
    }
  }, [tool]);

  const getLiveTextEditorValue = useCallback(() => {
    const activeEditor = textEditorRef.current;
    if (!activeEditor) {
      return null;
    }

    const liveValue =
      typeof textInputRef.current?.value === "string"
        ? textInputRef.current.value
        : activeEditor.value;

    return {
      ...activeEditor,
      value: liveValue,
    };
  }, []);

  useEffect(() => {
    if (tool !== "text" && !textEditorRef.current) {
      return;
    }

    setTextEditor((prev) =>
      prev
        ? {
            ...prev,
            color,
            size: brushSize,
            fontFamily: textFontFamily,
            textSize,
            textAlign,
            fontPixelSize: getTextSizePresetValue(textSize, brushSize),
          }
        : prev,
    );
  }, [brushSize, color, textAlign, textFontFamily, textSize, tool]);

  const flushPendingPoints = useCallback(() => {
    const activeStroke = pointerStateRef.current;
    if (!activeStroke || pendingPointsRef.current.length === 0) {
      return;
    }

    while (pendingPointsRef.current.length > 0) {
      const pointsBatch = pendingPointsRef.current.splice(0, WHITEBOARD_APPEND_BATCH_LIMIT);
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

    return unprojectScreenPoint(
      {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
      rect.width,
      rect.height,
      zoomScale,
      surfaceMode,
    );
  }, [surfaceMode, zoomScale]);

  const findTouchedStrokeId = useCallback(
    (point) => {
      const { width, height } = canvasSizeRef.current;
      if (!width || !height) {
        return null;
      }

      const scale = getSceneScale(zoomScale);
      const pointerPx = {
        x: point.x * width,
        y: point.y * height,
      };
      const projectedPointer = projectStoredPoint(point, width, height, zoomScale, surfaceMode);
      const measureCtx = getMeasureContext();

      for (let index = strokes.length - 1; index >= 0; index -= 1) {
        const stroke = strokes[index];
        const strokePoints = Array.isArray(stroke?.points) ? stroke.points : [];
        if (strokePoints.length === 0) {
          continue;
        }

        const hitPadding = Math.max(8, ((Number(stroke.size) || 4) * scale) / 2 + 6);
        if (stroke?.tool === "text") {
          const bounds = measureTextStrokeBounds(
            measureCtx,
            stroke,
            width,
            height,
            zoomScale,
            surfaceMode,
          );
          if (
            bounds &&
            projectedPointer.x >= bounds.left - hitPadding &&
            projectedPointer.x <= bounds.right + hitPadding &&
            projectedPointer.y >= bounds.top - hitPadding &&
            projectedPointer.y <= bounds.bottom + hitPadding
          ) {
            return stroke.id;
          }
          continue;
        }

        if (isVectorTool(stroke?.tool)) {
          if (
            hitTestVectorStroke(
              measureCtx,
              stroke,
              projectedPointer,
              width,
              height,
              zoomScale,
              surfaceMode,
            )
          ) {
            return stroke.id;
          }
          continue;
        }

        if (strokePoints.length === 1) {
          const singlePoint = projectStoredPoint(
            strokePoints[0],
            width,
            height,
            zoomScale,
            surfaceMode,
          );
          if (
            Math.hypot(projectedPointer.x - singlePoint.x, projectedPointer.y - singlePoint.y) <=
            hitPadding
          ) {
            return stroke.id;
          }
          continue;
        }

        for (let pointIndex = 1; pointIndex < strokePoints.length; pointIndex += 1) {
          const start = projectStoredPoint(
            strokePoints[pointIndex - 1],
            width,
            height,
            zoomScale,
            surfaceMode,
          );
          const end = projectStoredPoint(
            strokePoints[pointIndex],
            width,
            height,
            zoomScale,
            surfaceMode,
          );

          if (getDistanceToSegment(projectedPointer, start, end) <= hitPadding) {
            return stroke.id;
          }
        }
      }

      return null;
    },
    [getMeasureContext, strokes, surfaceMode, zoomScale],
  );

  const findTouchedTextStroke = useCallback(
    (point) => {
      const { width, height } = canvasSizeRef.current;
      if (!width || !height) {
        return null;
      }

      const scale = getSceneScale(zoomScale);
      const projectedPointer = projectStoredPoint(point, width, height, zoomScale, surfaceMode);
      const measureCtx = getMeasureContext();

      for (let index = strokes.length - 1; index >= 0; index -= 1) {
        const stroke = strokes[index];
        if (stroke?.tool !== "text") {
          continue;
        }

        const bounds = measureTextStrokeBounds(
          measureCtx,
          stroke,
          width,
          height,
          zoomScale,
          surfaceMode,
        );
        const hitPadding = Math.max(10, (Number(stroke?.size) || 4) * scale + 6);
        if (
          bounds &&
          projectedPointer.x >= bounds.left - hitPadding &&
          projectedPointer.x <= bounds.right + hitPadding &&
          projectedPointer.y >= bounds.top - hitPadding &&
          projectedPointer.y <= bounds.bottom + hitPadding
        ) {
          return stroke;
        }
      }

      return null;
    },
    [getMeasureContext, strokes, surfaceMode, zoomScale],
  );

  const findTouchedSelectableStroke = useCallback(
    (point) => {
      const { width, height } = canvasSizeRef.current;
      if (!width || !height) {
        return null;
      }

      const projectedPointer = projectStoredPoint(point, width, height, zoomScale, surfaceMode);
      const measureCtx = getMeasureContext();

      for (let index = strokes.length - 1; index >= 0; index -= 1) {
        const stroke = strokes[index];
        if (stroke?.tool === "text") {
          const bounds = getStrokeSelectionBounds(
            stroke,
            width,
            height,
            zoomScale,
            measureCtx,
            surfaceMode,
          );
          const hitPadding = WHITEBOARD_SELECTION_PADDING + 6;
          if (
            bounds &&
            projectedPointer.x >= bounds.left - hitPadding &&
            projectedPointer.x <= bounds.left + bounds.width + hitPadding &&
            projectedPointer.y >= bounds.top - hitPadding &&
            projectedPointer.y <= bounds.top + bounds.height + hitPadding
          ) {
            return stroke;
          }
          continue;
        }

        if (isShapeTool(stroke?.tool)) {
          const bounds = getStrokeSelectionBounds(
            stroke,
            width,
            height,
            zoomScale,
            measureCtx,
            surfaceMode,
          );
          const hitPadding = WHITEBOARD_SELECTION_PADDING + 8;
          if (
            bounds &&
            projectedPointer.x >= bounds.left - hitPadding &&
            projectedPointer.x <= bounds.left + bounds.width + hitPadding &&
            projectedPointer.y >= bounds.top - hitPadding &&
            projectedPointer.y <= bounds.top + bounds.height + hitPadding
          ) {
            return stroke;
          }
          if (
            hitTestVectorStroke(
              measureCtx,
              stroke,
              projectedPointer,
              width,
              height,
              zoomScale,
              surfaceMode,
            )
          ) {
            return stroke;
          }
        }
      }

      return null;
    },
    [getMeasureContext, strokes, surfaceMode, zoomScale],
  );

  const commitTextEditor = useCallback(
    (editorValue = textEditorRef.current, { close = true } = {}) => {
      if (!editorValue) {
        if (close) {
          setTextEditor(null);
        }
        return false;
      }

      const nextText = getTextValue(editorValue.value).replace(/\s+$/g, "");
      const hasText = Boolean(nextText.trim());
      if (textCommitLockRef.current) {
        return false;
      }
      textCommitLockRef.current = true;

      if (editorValue.strokeId) {
        if (!hasText) {
          onStrokeRemove?.({
            tabId,
            pageNumber,
            strokeId: editorValue.strokeId,
          });
        } else {
          onStrokeUpdate?.({
            tabId,
            pageNumber,
            strokeId: editorValue.strokeId,
            point: editorValue.point,
            text: nextText,
            color: editorValue.color,
            size: editorValue.size,
            fontFamily: editorValue.fontFamily,
            textSize: editorValue.textSize,
            textAlign: editorValue.textAlign,
            fontPixelSize: editorValue.fontPixelSize,
            rotation: editorValue.rotation,
          });
        }
      } else if (hasText) {
        onStrokeStart?.({
          tabId,
          pageNumber,
          strokeId: createWhiteboardStrokeId(),
          tool: "text",
          color: editorValue.color,
          size: editorValue.size,
          point: editorValue.point,
          text: nextText,
          fontFamily: editorValue.fontFamily,
          textSize: editorValue.textSize,
          textAlign: editorValue.textAlign,
          fontPixelSize: editorValue.fontPixelSize,
          rotation: editorValue.rotation,
        });
      }

      if (close) {
        setTextEditor(null);
      }

      window.requestAnimationFrame(() => {
        textCommitLockRef.current = false;
      });

      return true;
    },
    [onStrokeRemove, onStrokeStart, onStrokeUpdate, pageNumber, tabId],
  );

  useEffect(() => {
    if (!textEditor) {
      return;
    }

    window.setTimeout(() => {
      textInputRef.current?.focus();
      textInputRef.current?.setSelectionRange?.(textEditor.value.length, textEditor.value.length);
    }, 0);
  }, [textEditor]);

  useEffect(() => {
    const activeEditor = textEditorRef.current;
    if (!activeEditor?.strokeId) {
      return;
    }

    const sourceStroke = (Array.isArray(strokes) ? strokes : []).find(
      (stroke) => stroke.id === activeEditor.strokeId,
    );
    if (!sourceStroke) {
      setTextEditor(null);
    }
  }, [strokes]);

  useHotkeys(
    "esc",
    () => {
      if (!interactive || tool !== "select" || textEditorRef.current || !selectedShapeId) {
        return;
      }

      onStrokeRemove?.({
        tabId,
        pageNumber,
        strokeId: selectedShapeId,
      });
      setSelectedShapeId("");
      setShapePreviewStroke(null);
    },
    {
      enabled: interactive && tool === "select" && !textEditor && Boolean(selectedShapeId),
      preventDefault: true,
    },
    [
      interactive,
      onStrokeRemove,
      pageNumber,
      selectedShapeId,
      tabId,
      textEditor,
      tool,
    ],
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
      const activePointer = pointerStateRef.current;

      if (activePointer?.isVector) {
        const originPoint = activePointer.originPoint;
        const lastPoint = activePointer.lastPoint || originPoint;

        if (originPoint && lastPoint) {
          onStrokeStart?.({
            tabId,
            pageNumber,
            strokeId: activePointer.strokeId,
            tool,
            color,
            size: brushSize,
            fillColor: isShapeTool(tool) ? fillColor : "",
            edgeStyle: isShapeTool(tool) ? normalizeShapeEdge(shapeEdge) : undefined,
            points: [originPoint, lastPoint],
          });
          if (isShapeTool(tool)) {
            setSelectedShapeId(activePointer.strokeId);
            setShapePreviewStroke(null);
            onToolChange?.("select");
          }
        }

        draftStrokeRef.current = null;
        redrawCanvas();
      } else {
        flushPendingPoints();
        draftStrokeRef.current = null;
        redrawCanvas();
      }

      const canvas = canvasRef.current;
      if (canvas && event?.pointerId) {
        try {
          canvas.releasePointerCapture(event.pointerId);
        } catch {}
      }

      pointerStateRef.current = null;
    },
    [
      brushSize,
      color,
      fillColor,
      shapeEdge,
      flushPendingPoints,
      onStrokeStart,
      onToolChange,
      pageNumber,
      redrawCanvas,
      tabId,
      tool,
    ],
  );

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

      if (tool === "select") {
        const touchedShapeStroke = findTouchedSelectableStroke(point);
        setShapePreviewStroke(null);
        setSelectedShapeId(touchedShapeStroke?.id || "");
        if (textEditorRef.current) {
          commitTextEditor(textEditorRef.current);
        }
        if (touchedShapeStroke) {
          const { width, height } = canvasSizeRef.current;
          const transformBounds = getStrokeSelectionBounds(
            touchedShapeStroke,
            width,
            height,
            zoomScale,
            getMeasureContext(),
            surfaceMode,
          );
          const surfaceRect = surfaceRef.current?.getBoundingClientRect();
          if (transformBounds && surfaceRect?.width && surfaceRect?.height) {
            shapeTransformStateRef.current = {
              pointerId: event.pointerId,
              mode: "move",
              stroke: touchedShapeStroke,
              startTransform: transformBounds,
              startPointerScene: {
                x: (event.clientX - surfaceRect.left) / Math.max(1, transformBounds.scale),
                y: (event.clientY - surfaceRect.top) / Math.max(1, transformBounds.scale),
              },
              scale: transformBounds.scale,
              surfaceRect,
              lastStroke: touchedShapeStroke,
            };
          }
        }
        return;
      }

      if (tool === "text") {
        const touchedTextStroke = findTouchedTextStroke(point);
        const activeEditor = textEditorRef.current;
        if (
          activeEditor &&
          (!touchedTextStroke ||
            !activeEditor.strokeId ||
            touchedTextStroke.id !== activeEditor.strokeId)
        ) {
          commitTextEditor(activeEditor);
        }

        setSelectedShapeId("");
        setShapePreviewStroke(null);

        if (touchedTextStroke) {
          setTextEditor({
            strokeId: touchedTextStroke.id,
            point: touchedTextStroke.points?.[0] || point,
            value: touchedTextStroke.text || "",
            color: touchedTextStroke.color || latestTextStyleRef.current.color,
            size: touchedTextStroke.size || latestTextStyleRef.current.size,
            fontFamily:
              touchedTextStroke.fontFamily || latestTextStyleRef.current.fontFamily,
            textSize: touchedTextStroke.textSize || latestTextStyleRef.current.textSize,
            textAlign: touchedTextStroke.textAlign || latestTextStyleRef.current.textAlign,
            fontPixelSize:
              Number(touchedTextStroke.fontPixelSize) ||
              getTextSizePresetValue(
                touchedTextStroke.textSize || latestTextStyleRef.current.textSize,
                touchedTextStroke.size || latestTextStyleRef.current.size,
            ),
            rotation: Number(touchedTextStroke.rotation) || 0,
          });
          onToolChange?.("select");
          return;
        }

        setTextEditor({
          strokeId: "",
          point,
          value: "",
          color: latestTextStyleRef.current.color,
          size: latestTextStyleRef.current.size,
          fontFamily: latestTextStyleRef.current.fontFamily,
          textSize: latestTextStyleRef.current.textSize,
          textAlign: latestTextStyleRef.current.textAlign,
          fontPixelSize: latestTextStyleRef.current.fontPixelSize,
          rotation: 0,
        });
        onToolChange?.("select");
        return;
      }

      if (textEditorRef.current) {
        commitTextEditor(textEditorRef.current);
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

      if (isVectorTool(tool)) {
        pointerStateRef.current = {
          pointerId: event.pointerId,
          strokeId: createWhiteboardStrokeId(),
          removedStrokeIds: null,
          originPoint: point,
          lastPoint: point,
          isVector: true,
        };
        draftStrokeRef.current = {
          id: pointerStateRef.current.strokeId,
          tool,
          color,
          fillColor: isShapeTool(tool) ? fillColor : "",
          edgeStyle: isShapeTool(tool) ? normalizeShapeEdge(shapeEdge) : undefined,
          size: brushSize,
          points: [point, point],
        };
        canvasRef.current?.setPointerCapture?.(event.pointerId);
        redrawCanvas();
        return;
      }

      const strokeId = createWhiteboardStrokeId();
      pointerStateRef.current = {
        pointerId: event.pointerId,
        strokeId,
        removedStrokeIds: null,
        draftPoints: [point],
      };
      pendingPointsRef.current = [];
      draftStrokeRef.current = {
        id: strokeId,
        tool,
        color,
        size: brushSize,
        points: [point],
      };

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
      redrawCanvas();
    },
    [
      brushSize,
      color,
      commitTextEditor,
      eraseWholeStrokeAtPoint,
      fillColor,
      shapeEdge,
      findTouchedSelectableStroke,
      findTouchedTextStroke,
      interactive,
      onStrokeStart,
      onToolChange,
      pageNumber,
      redrawCanvas,
      resolvePoint,
      tabId,
      tool,
      zoomScale,
      getMeasureContext,
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

      const rawEvents =
        typeof event.getCoalescedEvents === "function" ? event.getCoalescedEvents() : [];
      const resolvedPoints =
        (rawEvents.length > 0 ? rawEvents : [event])
          .map((pointerEvent) => resolvePoint(pointerEvent))
          .filter(Boolean);
      if (resolvedPoints.length === 0) {
        return;
      }

      if (tool === "stroke-eraser") {
        resolvedPoints.forEach((point) => {
          eraseWholeStrokeAtPoint(point);
        });
        return;
      }

      if (pointerStateRef.current?.isVector) {
        const point = resolvedPoints[resolvedPoints.length - 1];
        pointerStateRef.current.lastPoint = point;
        draftStrokeRef.current = draftStrokeRef.current
          ? {
              ...draftStrokeRef.current,
              points: [pointerStateRef.current.originPoint, point],
              color,
              fillColor: isShapeTool(tool) ? fillColor : "",
              edgeStyle: isShapeTool(tool) ? normalizeShapeEdge(shapeEdge) : undefined,
              size: brushSize,
            }
          : draftStrokeRef.current;
        redrawCanvas();
        return;
      }

      const activePointer = pointerStateRef.current;
      if (!activePointer) {
        return;
      }

      const nextPendingPoints = pendingPointsRef.current;
      const nextDraftPoints = Array.isArray(activePointer.draftPoints)
        ? activePointer.draftPoints
        : [];
      let hasNewPoint = false;
      resolvedPoints.forEach((point) => {
        hasNewPoint = appendDistinctPoint(nextPendingPoints, point) || hasNewPoint;
        appendDistinctPoint(nextDraftPoints, point);
      });

      if (!hasNewPoint) {
        return;
      }

      activePointer.draftPoints = nextDraftPoints;
      draftStrokeRef.current = draftStrokeRef.current
        ? {
            ...draftStrokeRef.current,
            color,
            size: brushSize,
            points: [...nextDraftPoints],
          }
        : draftStrokeRef.current;
      redrawCanvas();

      if (pendingPointsRef.current.length >= WHITEBOARD_APPEND_BATCH_LIMIT) {
        flushPendingPoints();
        return;
      }

      scheduleFlush();
    },
    [
      eraseWholeStrokeAtPoint,
      flushPendingPoints,
      fillColor,
      shapeEdge,
      interactive,
      redrawCanvas,
      resolvePoint,
      scheduleFlush,
      stopDrawing,
      tool,
      brushSize,
      color,
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

  useEffect(() => {
    const handleDragMove = (event) => {
      const dragState = dragStateRef.current;
      if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
      }

      const startScreenPoint = projectStoredPoint(
        dragState.startPoint,
        dragState.surfaceRect.width,
        dragState.surfaceRect.height,
        zoomScale,
        surfaceMode,
      );
      const nextPoint = unprojectScreenPoint(
        {
          x: startScreenPoint.x + (event.clientX - dragState.startClientX),
          y: startScreenPoint.y + (event.clientY - dragState.startClientY),
        },
        dragState.surfaceRect.width,
        dragState.surfaceRect.height,
        zoomScale,
        surfaceMode,
      );

      dragState.lastPoint = nextPoint;
      setTextEditor((prev) => (prev ? { ...prev, point: nextPoint } : prev));
    };

    const handleDragEnd = (event) => {
      const dragState = dragStateRef.current;
      if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
      }

      dragStateRef.current = null;
      const activeEditor = textEditorRef.current;
      if (
        activeEditor?.strokeId &&
        (dragState.lastPoint.x !== dragState.startPoint.x ||
          dragState.lastPoint.y !== dragState.startPoint.y)
      ) {
        onStrokeUpdate?.({
          tabId,
          pageNumber,
          strokeId: activeEditor.strokeId,
          point: dragState.lastPoint,
          text: getTextValue(activeEditor.value),
          color: activeEditor.color,
          size: activeEditor.size,
          fontFamily: activeEditor.fontFamily,
          textSize: activeEditor.textSize,
          textAlign: activeEditor.textAlign,
          fontPixelSize: activeEditor.fontPixelSize,
          rotation: activeEditor.rotation,
        });
      }
    };

    window.addEventListener("pointermove", handleDragMove);
    window.addEventListener("pointerup", handleDragEnd);
    window.addEventListener("pointercancel", handleDragEnd);

    return () => {
      window.removeEventListener("pointermove", handleDragMove);
      window.removeEventListener("pointerup", handleDragEnd);
      window.removeEventListener("pointercancel", handleDragEnd);
    };
  }, [onStrokeUpdate, pageNumber, surfaceMode, tabId, zoomScale]);

  const selectedStrokeBounds = useMemo(() => {
    return getStrokeSelectionBounds(
      selectedStroke,
      surfaceSize.width,
      surfaceSize.height,
      zoomScale,
      getMeasureContext(),
      surfaceMode,
    );
  }, [
    getMeasureContext,
    selectedStroke,
    surfaceMode,
    surfaceSize.height,
    surfaceSize.width,
    zoomScale,
  ]);

  useEffect(() => {
    const getScenePointFromEvent = (event, transformState) => {
      const surfaceRect = transformState?.surfaceRect;
      const scale = transformState?.scale || 1;
      if (!surfaceRect?.width || !surfaceRect?.height || !scale) {
        return null;
      }

      return {
        x: (event.clientX - surfaceRect.left) / scale,
        y: (event.clientY - surfaceRect.top) / scale,
      };
    };

    const handleShapeTransformMove = (event) => {
      const transformState = shapeTransformStateRef.current;
      if (!transformState || transformState.pointerId !== event.pointerId) {
        return;
      }

      event.preventDefault();
      const pointerScene = getScenePointFromEvent(event, transformState);
      if (!pointerScene) {
        return;
      }

      let nextTransform = null;
      if (transformState.mode === "move") {
        nextTransform = {
          ...transformState.startTransform,
          centerX:
            transformState.startTransform.centerX +
            (pointerScene.x - transformState.startPointerScene.x),
          centerY:
            transformState.startTransform.centerY +
            (pointerScene.y - transformState.startPointerScene.y),
        };
      } else if (transformState.mode === "rotate") {
        const nextAngle = Math.atan2(
          pointerScene.y - transformState.startTransform.centerY,
          pointerScene.x - transformState.startTransform.centerX,
        );
        nextTransform = {
          ...transformState.startTransform,
          rotation:
            transformState.startTransform.rotation +
            (nextAngle - transformState.startAngle),
        };
      } else if (transformState.mode === "resize") {
        const rotatedPointer = rotateScenePoint(
          pointerScene,
          transformState.fixedCornerWorld,
          -transformState.startTransform.rotation,
        );
        const fixedLocal = rotateScenePoint(
          transformState.fixedCornerWorld,
          transformState.fixedCornerWorld,
          -transformState.startTransform.rotation,
        );
        const vectorLocal = {
          x: rotatedPointer.x - fixedLocal.x,
          y: rotatedPointer.y - fixedLocal.y,
        };
        const signX = transformState.corner?.includes("right") ? 1 : -1;
        const signY = transformState.corner?.includes("bottom") ? 1 : -1;
        let widthPx = Math.max(18, Math.abs(vectorLocal.x));
        let heightPx = Math.max(18, Math.abs(vectorLocal.y));
        let fontPixelSize = transformState.startTransform.fontPixelSize;
        let centerOffsetLocal = {
          x: vectorLocal.x / 2,
          y: vectorLocal.y / 2,
        };

        if (transformState.stroke?.tool === "text") {
          const widthRatio = widthPx / Math.max(1, transformState.startTransform.widthPx);
          const heightRatio = heightPx / Math.max(1, transformState.startTransform.heightPx);
          const uniformScale = Math.max(0.25, Math.max(widthRatio, heightRatio));
          widthPx = transformState.startTransform.widthPx * uniformScale;
          heightPx = transformState.startTransform.heightPx * uniformScale;
          fontPixelSize = Math.max(
            8,
            (transformState.startTransform.fontPixelSize || 16) * uniformScale,
          );
          centerOffsetLocal = {
            x: signX * widthPx / 2,
            y: signY * heightPx / 2,
          };
        }
        const centerWorld = rotateScenePoint(
          {
            x: transformState.fixedCornerWorld.x + centerOffsetLocal.x,
            y: transformState.fixedCornerWorld.y + centerOffsetLocal.y,
          },
          transformState.fixedCornerWorld,
          transformState.startTransform.rotation,
        );

        nextTransform = {
          ...transformState.startTransform,
          centerX: centerWorld.x,
          centerY: centerWorld.y,
          widthPx,
          heightPx,
          fontPixelSize,
        };
      }

      if (!nextTransform) {
        return;
      }

      const nextStroke =
        transformState.stroke?.tool === "text"
          ? createTextStrokeFromTransform(transformState.stroke, nextTransform)
          : createShapeStrokeFromTransform(transformState.stroke, nextTransform);
      shapeTransformStateRef.current = {
        ...transformState,
        lastStroke: nextStroke,
      };
      setShapePreviewStroke(nextStroke);
    };

    const handleShapeTransformEnd = (event) => {
      const transformState = shapeTransformStateRef.current;
      if (!transformState || transformState.pointerId !== event.pointerId) {
        return;
      }

      shapeTransformStateRef.current = null;
      const nextStroke = transformState.lastStroke;
      setShapePreviewStroke(null);
      if (!nextStroke) {
        return;
      }

      onStrokeUpdate?.({
        tabId,
        pageNumber,
        strokeId: nextStroke.id,
        points: nextStroke.points,
        text: nextStroke.tool === "text" ? nextStroke.text : undefined,
        color: nextStroke.tool === "text" ? nextStroke.color : undefined,
        size: nextStroke.tool === "text" ? nextStroke.size : undefined,
        fontFamily: nextStroke.tool === "text" ? nextStroke.fontFamily : undefined,
        textSize: nextStroke.tool === "text" ? nextStroke.textSize : undefined,
        textAlign: nextStroke.tool === "text" ? nextStroke.textAlign : undefined,
        fontPixelSize: nextStroke.tool === "text" ? nextStroke.fontPixelSize : undefined,
        rotation: nextStroke.rotation,
      });
    };

    window.addEventListener("pointermove", handleShapeTransformMove);
    window.addEventListener("pointerup", handleShapeTransformEnd);
    window.addEventListener("pointercancel", handleShapeTransformEnd);

    return () => {
      window.removeEventListener("pointermove", handleShapeTransformMove);
      window.removeEventListener("pointerup", handleShapeTransformEnd);
      window.removeEventListener("pointercancel", handleShapeTransformEnd);
    };
  }, [onStrokeUpdate, pageNumber, tabId]);

  const beginShapeTransform = useCallback(
    (event, mode, corner = null) => {
      if (!interactive || tool !== "select" || !selectedStroke || !selectedStrokeBounds) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const surfaceRect = surfaceRef.current?.getBoundingClientRect();
      if (!surfaceRect?.width || !surfaceRect?.height) {
        return;
      }

      const startPointerScene = {
        x: (event.clientX - surfaceRect.left) / Math.max(1, selectedStrokeBounds.scale),
        y: (event.clientY - surfaceRect.top) / Math.max(1, selectedStrokeBounds.scale),
      };
      const baseState = {
        pointerId: event.pointerId,
        mode,
        stroke: selectedStroke,
        startTransform: selectedStrokeBounds,
        startPointerScene,
        scale: selectedStrokeBounds.scale,
        surfaceRect,
        lastStroke: selectedStroke,
      };

      if (mode === "rotate") {
        shapeTransformStateRef.current = {
          ...baseState,
          startAngle: Math.atan2(
            startPointerScene.y - selectedStrokeBounds.centerY,
            startPointerScene.x - selectedStrokeBounds.centerX,
          ),
        };
        return;
      }

      if (mode === "resize" && corner) {
        const signX = corner.includes("right") ? 1 : -1;
        const signY = corner.includes("bottom") ? 1 : -1;
        const fixedCornerLocal = {
          x: -signX * selectedStrokeBounds.widthPx / 2,
          y: -signY * selectedStrokeBounds.heightPx / 2,
        };
        const fixedCornerWorld = rotateScenePoint(
          {
            x: selectedStrokeBounds.centerX + fixedCornerLocal.x,
            y: selectedStrokeBounds.centerY + fixedCornerLocal.y,
          },
          {
            x: selectedStrokeBounds.centerX,
            y: selectedStrokeBounds.centerY,
          },
          selectedStrokeBounds.rotation,
        );
        shapeTransformStateRef.current = {
          ...baseState,
          fixedCornerWorld,
          corner,
        };
        return;
      }

      shapeTransformStateRef.current = baseState;
    },
    [interactive, selectedStroke, selectedStrokeBounds, tool],
  );

  const textEditorBounds = useMemo(() => {
    if (!textEditor) {
      return null;
    }

    const { width, height } = canvasSizeRef.current;
    if (!width || !height) {
      return null;
    }

    const scale = getSceneScale(zoomScale);
    const layout = getTextLayout(
      getMeasureContext(),
      textEditor.value || textPlaceholder,
      textEditor.size,
      {
        fontFamily: textEditor.fontFamily,
        textSize: textEditor.textSize,
        textAlign: textEditor.textAlign,
        fontPixelSize: textEditor.fontPixelSize,
      },
    );
    const anchor = projectStoredPoint(textEditor.point, width, height, zoomScale, surfaceMode);

    return {
      left:
        textEditor.textAlign === "center"
          ? anchor.x - layout.textWidth * scale / 2
          : textEditor.textAlign === "right"
            ? anchor.x - layout.textWidth * scale
            : anchor.x,
      top: anchor.y,
      width: Math.max(
        96,
        Math.ceil(
          layout.textWidth * scale + WHITEBOARD_TEXT_EDITOR_HORIZONTAL_PADDING * 2,
        ),
      ),
      height: Math.max(
        42,
        Math.ceil(
          layout.textHeight * scale + WHITEBOARD_TEXT_EDITOR_VERTICAL_PADDING * 2,
        ),
      ),
      fontSize: layout.fontSize * scale,
      lineHeight: layout.lineHeight * scale,
    };
  }, [getMeasureContext, surfaceMode, textEditor, textPlaceholder, zoomScale]);

  const handleTextDragStart = useCallback(
    (event) => {
      if (!interactive || !textEditorRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const surfaceRect = surfaceRef.current?.getBoundingClientRect();
      if (!surfaceRect?.width || !surfaceRect?.height) {
        return;
      }

      dragStateRef.current = {
        pointerId: event.pointerId,
        startClientX: event.clientX,
        startClientY: event.clientY,
        startPoint: textEditorRef.current.point,
        lastPoint: textEditorRef.current.point,
        surfaceRect,
      };
    },
    [interactive],
  );

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
      {interactive && tool === "select" && selectedStrokeBounds ? (
        <ShapeSelectionOverlay
          style={{
            left: `${selectedStrokeBounds.left}px`,
            top: `${selectedStrokeBounds.top}px`,
            width: `${selectedStrokeBounds.width}px`,
            height: `${selectedStrokeBounds.height}px`,
            transform: `rotate(${selectedStrokeBounds.rotation}rad)`,
          }}
        >
          <ShapeSelectionRotateHandle
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onPointerDown={(event) => beginShapeTransform(event, "rotate")}
            aria-label={selectedStroke?.tool === "text" ? "Rotate text" : "Rotate shape"}
          />
          <ShapeSelectionBox
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onPointerDown={(event) => beginShapeTransform(event, "move")}
            aria-label={selectedStroke?.tool === "text" ? "Move text" : "Move shape"}
          >
            <>
              <ShapeSelectionCornerButton
                type="button"
                $top
                $left
                onMouseDown={(event) => event.preventDefault()}
                onPointerDown={(event) => beginShapeTransform(event, "resize", "top-left")}
                aria-label={selectedStroke?.tool === "text" ? "Resize text" : "Resize shape"}
              />
              <ShapeSelectionCornerButton
                type="button"
                $top
                $right
                onMouseDown={(event) => event.preventDefault()}
                onPointerDown={(event) => beginShapeTransform(event, "resize", "top-right")}
                aria-label={selectedStroke?.tool === "text" ? "Resize text" : "Resize shape"}
              />
              <ShapeSelectionCornerButton
                type="button"
                $bottom
                $left
                onMouseDown={(event) => event.preventDefault()}
                onPointerDown={(event) => beginShapeTransform(event, "resize", "bottom-left")}
                aria-label={selectedStroke?.tool === "text" ? "Resize text" : "Resize shape"}
              />
              <ShapeSelectionCornerButton
                type="button"
                $bottom
                $right
                onMouseDown={(event) => event.preventDefault()}
                onPointerDown={(event) => beginShapeTransform(event, "resize", "bottom-right")}
                aria-label={selectedStroke?.tool === "text" ? "Resize text" : "Resize shape"}
              />
            </>
          </ShapeSelectionBox>
        </ShapeSelectionOverlay>
      ) : null}
      {interactive && textEditor && textEditorBounds ? (
        <TextEditorOverlay
          style={{
            left: `${textEditorBounds.left}px`,
            top: `${textEditorBounds.top}px`,
          }}
        >
          <TextSelectionBox
            style={{
              width: `${textEditorBounds.width}px`,
              minHeight: `${textEditorBounds.height}px`,
            }}
          >
            <TextInlineInput
              ref={textInputRef}
              value={textEditor.value}
              maxLength={WHITEBOARD_MAX_TEXT_CHARS}
              placeholder={textPlaceholder}
              wrap="off"
              spellCheck={false}
              style={{
                minHeight: `${textEditorBounds.height}px`,
                fontSize: `${textEditorBounds.fontSize}px`,
                lineHeight: `${textEditorBounds.lineHeight}px`,
                color: textEditor.color,
                fontFamily: getTextFontFamily(textEditor.fontFamily),
                textAlign: textEditor.textAlign,
              }}
              onChange={(event) => {
                const nextValue = event.target.value.slice(0, WHITEBOARD_MAX_TEXT_CHARS);
                textEditorRef.current = textEditorRef.current
                  ? { ...textEditorRef.current, value: nextValue }
                  : textEditorRef.current;
                setTextEditor((prev) => (prev ? { ...prev, value: nextValue } : prev));
              }}
              onBlur={() => {
                if (!dragStateRef.current) {
                  commitTextEditor(getLiveTextEditorValue());
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.preventDefault();
                  setTextEditor(null);
                  return;
                }

                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  commitTextEditor(getLiveTextEditorValue());
                }
              }}
            />
          </TextSelectionBox>
        </TextEditorOverlay>
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
  fillColor = "",
  shapeEdge = "sharp",
  brushSize = 4,
  textFontFamily = "sans",
  textSize = "m",
  textAlign = "left",
  onToolChange,
  onColorChange,
  onFillColorChange,
  onShapeEdgeChange,
  onBrushSizeChange,
  onTextFontFamilyChange,
  onTextSizeChange,
  onTextAlignChange,
  onClear,
  onClearPage,
  onUndo,
  onRedo,
  onStrokeStart,
  onStrokeAppend,
  onStrokeRemove,
  onStrokeUpdate,
  onTabActivate,
  onPdfUpload,
  onPdfOpen,
  onTabRemove,
  onPdfViewportChange,
  onBoardZoomChange,
  onRecordSurfaceChange,
  onToggleRecording,
  isRecording = false,
  recordingElapsedMs = 0,
  recordingReady = false,
  showToolbar = false,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const pdfViewportRef = useRef(null);
  const boardViewportRef = useRef(null);
  const boardFrameRef = useRef(null);
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
  const boardPinchStateRef = useRef({
    active: false,
    distance: 0,
    zoom: 1,
    boardX: 0,
    boardY: 0,
  });
  const boardZoomAnchorRef = useRef(null);
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
  const [pdfViewportHeight, setPdfViewportHeight] = useState(0);
  const [activeTextEditorState, setActiveTextEditorState] = useState(null);
  const [boardViewportSize, setBoardViewportSize] = useState({
    width: 0,
    height: 0,
  });
  const [currentPdfPage, setCurrentPdfPage] = useState(1);
  const [isPdfLibraryOpen, setIsPdfLibraryOpen] = useState(false);
  const [visiblePdfPages, setVisiblePdfPages] = useState([]);
  const [pdfPageMetrics, setPdfPageMetrics] = useState({});
  const [boardZoom, setBoardZoom] = useState(1);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isFillPickerOpen, setIsFillPickerOpen] = useState(false);
  const [isEdgePickerOpen, setIsEdgePickerOpen] = useState(false);
  const [isSizePickerOpen, setIsSizePickerOpen] = useState(false);
  const [isTextFontPickerOpen, setIsTextFontPickerOpen] = useState(false);
  const [isTextSizePickerOpen, setIsTextSizePickerOpen] = useState(false);
  const [isTextAlignPickerOpen, setIsTextAlignPickerOpen] = useState(false);
  const [clearConfirmTarget, setClearConfirmTarget] = useState(null);
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
  const syncedBoardZoom = Math.min(
    WHITEBOARD_MAX_ZOOM,
    Math.max(WHITEBOARD_MIN_ZOOM, Number(boardTab?.zoom) || 1),
  );
  const syncedBoardBaseWidth = Math.max(
    WHITEBOARD_MIN_BOARD_BASE_WIDTH,
    Math.round(Number(boardTab?.viewportBaseWidth) || boardViewportSize.width || 0) || 0,
  );
  const syncedBoardBaseHeight = Math.max(
    WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
    Math.round(Number(boardTab?.viewportBaseHeight) || boardViewportSize.height || 0) || 0,
  );

  const handlePdfViewportRef = useCallback(
    (node) => {
      pdfViewportRef.current = node;
      if (activeTab?.type === "pdf") {
        onRecordSurfaceChange?.(node, "pdf");
      }
    },
    [activeTab?.type, onRecordSurfaceChange],
  );

  const handleBoardViewportRef = useCallback(
    (node) => {
      boardViewportRef.current = node;
      if (!activeTab || activeTab.type !== "pdf") {
        onRecordSurfaceChange?.(node, "board");
      }
    },
    [activeTab, onRecordSurfaceChange],
  );

  useEffect(() => {
    if (!onRecordSurfaceChange) {
      return undefined;
    }

    const surfaceNode = activeTab?.type === "pdf" ? pdfViewportRef.current : boardViewportRef.current;
    onRecordSurfaceChange(surfaceNode, activeTab?.type === "pdf" ? "pdf" : "board");

    return () => {
      onRecordSurfaceChange(null, null);
    };
  }, [activeTab?.id, activeTab?.type, onRecordSurfaceChange]);
  const activeBoardZoom = Math.min(
    WHITEBOARD_MAX_ZOOM,
    Math.max(WHITEBOARD_MIN_ZOOM, Number(boardZoom) || syncedBoardZoom || 1),
  );
  const activeBoardBaseWidth = Math.max(
    WHITEBOARD_MIN_BOARD_BASE_WIDTH,
    syncedBoardBaseWidth,
  );
  const activeBoardBaseHeight = Math.max(
    WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
    syncedBoardBaseHeight,
  );
  const activePdfZoom =
    activeTab?.type === "pdf"
      ? Math.min(WHITEBOARD_MAX_ZOOM, Math.max(WHITEBOARD_MIN_ZOOM, Number(activeTab.zoom) || 1))
      : 1;
  const basePdfPage = pdfMeta.pages[0] || null;
  const basePdfAspectRatio =
    basePdfPage?.baseWidth && basePdfPage?.baseHeight
      ? basePdfPage.baseWidth / basePdfPage.baseHeight
      : 0;
  const syncedViewportVisibleHeightRatio =
    activeTab?.type === "pdf"
      ? clampViewportRatio(activeTab.viewportVisibleHeightRatio)
      : 0;
  const syncedViewportVisibleWidthRatio =
    activeTab?.type === "pdf"
      ? clampViewportRatio(activeTab.viewportVisibleWidthRatio)
      : 0;
  const localBoardBaseWidth = Math.max(
    WHITEBOARD_MIN_BOARD_BASE_WIDTH,
    Math.round(boardViewportSize.width || 0) || activeBoardBaseWidth,
  );
  const localBoardBaseHeight = Math.max(
    WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
    Math.round(boardViewportSize.height || 0) || activeBoardBaseHeight,
  );
  const activeBoardContainScale = Math.min(
    1,
    localBoardBaseWidth / Math.max(1, activeBoardBaseWidth),
    localBoardBaseHeight / Math.max(1, activeBoardBaseHeight),
  );
  const getBoardRenderScale = useCallback(
    (logicalZoom) => Math.max(0.05, (Number(logicalZoom) || 1) * activeBoardContainScale),
    [activeBoardContainScale],
  );
  const activeBoardRenderScale = getBoardRenderScale(activeBoardZoom);
  const syncedGuestPdfWidthFromHeight =
    !interactive &&
    activeTab?.type === "pdf" &&
    pdfViewportHeight > 0 &&
    basePdfAspectRatio > 0 &&
    syncedViewportVisibleHeightRatio > 0
      ? Math.max(
          WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          Math.round((pdfViewportHeight / syncedViewportVisibleHeightRatio) * basePdfAspectRatio),
        )
      : 0;
  const syncedGuestPdfWidthFromWidth =
    !interactive &&
    activeTab?.type === "pdf" &&
    pdfRenderWidth > 0 &&
    syncedViewportVisibleWidthRatio > 0
      ? Math.max(
          WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          Math.round(pdfRenderWidth / syncedViewportVisibleWidthRatio),
        )
      : 0;
  const syncedGuestPdfWidth =
    syncedGuestPdfWidthFromWidth > 0 && syncedGuestPdfWidthFromHeight > 0
      ? Math.min(syncedGuestPdfWidthFromWidth, syncedGuestPdfWidthFromHeight)
      : syncedGuestPdfWidthFromWidth || syncedGuestPdfWidthFromHeight;
  const activePdfViewportBaseWidth =
    activeTab?.type === "pdf" && Number.isFinite(Number(activeTab.viewportBaseWidth))
      ? Math.max(
          WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          Math.round(Number(activeTab.viewportBaseWidth)),
        )
      : Math.max(
          WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          pdfRenderWidth || WHITEBOARD_MIN_PDF_RENDER_WIDTH,
        );
  const activePdfWidth =
    !interactive && syncedGuestPdfWidth > 0
      ? syncedGuestPdfWidth
      : activeTab?.type === "pdf" && pdfRenderWidth > 0
      ? Math.max(
          WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          Math.round(pdfRenderWidth * activePdfZoom),
        )
      : Math.max(WHITEBOARD_MIN_PDF_RENDER_WIDTH, pdfRenderWidth || WHITEBOARD_MIN_PDF_RENDER_WIDTH);
  const activePdfRenderScale =
    activeTab?.type === "pdf"
      ? activePdfWidth / activePdfViewportBaseWidth
      : 1;
  const activeTabSelectedPagesKey =
    activeTab?.type === "pdf"
      ? activeTab.selectedPagesMode === "custom"
        ? `custom:${getSelectedPagesKey(activeTab.selectedPages)}`
        : "__all__"
      : "__all__";
  const initialVisiblePdfPages = useMemo(
    () => getInitialVisiblePdfPages(activeTab, pdfMeta.pages),
    [activeTab, pdfMeta.pages],
  );

  const emitPdfViewport = useCallback(
    ({
      zoom,
      scrollRatio,
      viewportPageNumber,
      viewportPageOffsetRatio,
      viewportLeftRatio,
      viewportVisibleHeightRatio,
      viewportVisibleWidthRatio,
      viewportBaseWidth,
    }) => {
      if (!activeTab || activeTab.type !== "pdf") {
        return;
      }

      const viewport = pdfViewportRef.current;
      const topInset = getPdfViewportTopInset(interactive);
      const bottomInset = getPdfViewportBottomInset(interactive);
      const visibleViewportHeight = viewport
        ? Math.max(1, viewport.clientHeight - topInset - bottomInset)
        : 1;
      const visibleViewportWidth = viewport
        ? Math.max(1, viewport.clientWidth - 40)
        : Math.max(1, pdfRenderWidth);
      const effectiveScrollRatio =
        typeof scrollRatio === "number"
          ? scrollRatio
          : viewport
            ? (() => {
                const scrollHeight = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
                const anchoredScrollTop = Math.min(
                  scrollHeight,
                  Math.max(0, viewport.scrollTop + topInset),
                );
                return scrollHeight > 0 ? anchoredScrollTop / scrollHeight : 0;
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
                const anchoredScrollTop = viewport.scrollTop + topInset;
                if (
                  anchoredScrollTop < pageTop + pageHeight ||
                  pageMeta === nextPages[nextPages.length - 1]
                ) {
                  const offsetRatio = Math.min(
                    1,
                    Math.max(0, (anchoredScrollTop - pageTop) / pageHeight),
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
      const computedVisibleHeightRatio =
        typeof viewportVisibleHeightRatio === "number"
          ? clampViewportRatio(viewportVisibleHeightRatio)
          : viewport && activeTab
            ? (() => {
                const targetPageNumber =
                  typeof viewportPageNumber === "number"
                    ? viewportPageNumber
                    : computedAnchor.pageNumber;
                const targetFrame = document.getElementById(
                  `pdf-page-frame-${activeTab.id}-${targetPageNumber}`,
                );
                if (!(targetFrame instanceof HTMLElement)) {
                  return 0;
                }

                const pageHeight = Math.max(1, targetFrame.offsetHeight);
                return clampViewportRatio(visibleViewportHeight / pageHeight);
              })()
            : 0;
      const computedVisibleWidthRatio =
        typeof viewportVisibleWidthRatio === "number"
          ? clampViewportRatio(viewportVisibleWidthRatio)
          : viewport && activeTab
            ? (() => {
                const targetPageNumber =
                  typeof viewportPageNumber === "number"
                    ? viewportPageNumber
                    : computedAnchor.pageNumber;
                const targetFrame = document.getElementById(
                  `pdf-page-frame-${activeTab.id}-${targetPageNumber}`,
                );
                if (!(targetFrame instanceof HTMLElement)) {
                  return 0;
                }

                const pageWidth = Math.max(1, targetFrame.offsetWidth);
                return clampViewportRatio(visibleViewportWidth / pageWidth);
              })()
            : 0;

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
        viewportVisibleHeightRatio: computedVisibleHeightRatio,
        viewportVisibleWidthRatio: computedVisibleWidthRatio,
        viewportBaseWidth:
          typeof viewportBaseWidth === "number"
            ? Math.max(
                WHITEBOARD_MIN_PDF_RENDER_WIDTH,
                Math.round(viewportBaseWidth),
              )
            : Math.max(
                WHITEBOARD_MIN_PDF_RENDER_WIDTH,
                pdfRenderWidth || WHITEBOARD_MIN_PDF_RENDER_WIDTH,
              ),
        zoom:
          typeof zoom === "number"
            ? Math.min(WHITEBOARD_MAX_ZOOM, Math.max(WHITEBOARD_MIN_ZOOM, zoom))
            : undefined,
      });
    },
    [activeTab, interactive, onPdfViewportChange, pdfMeta.pages, pdfRenderWidth],
  );

  useEffect(() => {
    return () => {
      pdfPickerDocumentRef.current?.destroy?.();
      pdfPickerDocumentRef.current = null;
      pdfPickerDocumentKeyRef.current = "";
    };
  }, []);

  useEffect(() => {
    const nextVisiblePages =
      initialVisiblePdfPages.length > 0 ? initialVisiblePdfPages : [1, 2];
    setCurrentPdfPage(nextVisiblePages[0] || 1);
    setVisiblePdfPages((prev) => {
      if (
        prev.length === nextVisiblePages.length &&
        prev.every((pageNumber, index) => pageNumber === nextVisiblePages[index])
      ) {
        return prev;
      }

      return nextVisiblePages;
    });
    setPdfPageMetrics({});
  }, [activeTab?.id, activeTabSelectedPagesKey, initialVisiblePdfPages]);

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
      setPdfViewportHeight(Math.max(1, Math.floor(viewport.clientHeight - 40)));
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(viewport);
    return () => {
      resizeObserver.disconnect();
    };
  }, [activeTab?.id]);

  useEffect(() => {
    const viewport = boardViewportRef.current;
    if (!viewport) {
      return undefined;
    }

    const updateBoardViewportSize = () => {
      setBoardViewportSize({
        width: Math.max(1, Math.floor(viewport.clientWidth)),
        height: Math.max(1, Math.floor(viewport.clientHeight)),
      });
    };

    updateBoardViewportSize();
    const resizeObserver = new ResizeObserver(updateBoardViewportSize);
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeTab?.id]);

  useEffect(() => {
    if (!interactive || activeTab?.type === "pdf") {
      return;
    }

    const nextViewportBaseWidth = Math.max(
      WHITEBOARD_MIN_BOARD_BASE_WIDTH,
      Math.round(boardViewportSize.width || 0) || WHITEBOARD_MIN_BOARD_BASE_WIDTH,
    );
    const nextViewportBaseHeight = Math.max(
      WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
      Math.round(boardViewportSize.height || 0) || WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
    );

    if (
      Math.abs(nextViewportBaseWidth - syncedBoardBaseWidth) < 2 &&
      Math.abs(nextViewportBaseHeight - syncedBoardBaseHeight) < 2
    ) {
      return;
    }

    onBoardZoomChange?.({
      tabId: WHITEBOARD_BOARD_TAB_ID,
      zoom: activeBoardZoom,
      viewportBaseWidth: nextViewportBaseWidth,
      viewportBaseHeight: nextViewportBaseHeight,
    });
  }, [
    activeBoardZoom,
    activeTab?.type,
    boardViewportSize.height,
    boardViewportSize.width,
    interactive,
    onBoardZoomChange,
    syncedBoardBaseHeight,
    syncedBoardBaseWidth,
  ]);

  const getBoardViewportAnchor = useCallback(
    (anchorX, anchorY, zoomValue = activeBoardRenderScale) => {
      const viewport = boardViewportRef.current;
      const frame = boardFrameRef.current;
      if (!viewport) {
        return {
          boardX: 0,
          boardY: 0,
          frameOffsetLeft: 0,
          frameOffsetTop: 0,
        };
      }

      const safeZoom = Math.max(WHITEBOARD_MIN_ZOOM, Number(zoomValue) || 1);
      const frameOffsetLeft = frame ? frame.offsetLeft : 0;
      const frameOffsetTop = frame ? frame.offsetTop : 0;

      return {
        boardX:
          (viewport.scrollLeft + anchorX - frameOffsetLeft) / safeZoom,
        boardY:
          (viewport.scrollTop + anchorY - frameOffsetTop) / safeZoom,
        frameOffsetLeft,
        frameOffsetTop,
      };
    },
    [activeBoardRenderScale],
  );

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
        logPdfDebug("viewer-load:start", {
          tabId: activeTab.id,
          fileUrl: activeTab.fileUrl,
          selectedPagesMode: activeTab.selectedPagesMode,
          selectedPages: activeTab.selectedPages,
        });
        const pdfDocument = await loadPdfDocument(activeTab.fileUrl);
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
        logPdfDebug("viewer-load:ready", {
          tabId: activeTab.id,
          fileUrl: activeTab.fileUrl,
          numPages: pdfDocument?.numPages,
          selectedPagesCount: pageDescriptors.length,
          firstViewportWidth: firstViewport.width,
          firstViewportHeight: firstViewport.height,
        });
        setPdfMeta({
          status: "ready",
          fileUrl: activeTab.fileUrl,
          selectedPagesKey: activeTabSelectedPagesKey,
          pages: pageDescriptors,
          error: "",
        });
      } catch (error) {
        logPdfDebug("viewer-load:error", {
          tabId: activeTab.id,
          fileUrl: activeTab.fileUrl,
          error: serializePdfError(error),
        });
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

    const visiblePageSet = new Set(
      (visiblePdfPages.length > 0 ? visiblePdfPages : initialVisiblePdfPages).filter(
        (pageNumber) => Number.isFinite(pageNumber) && pageNumber > 0,
      ),
    );
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
          const ratio = isMobileSafariBrowser()
            ? 1
            : Math.min(2, window.devicePixelRatio || 1);
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
    initialVisiblePdfPages,
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

  useEffect(() => {
    if (!interactive || !activeTab || activeTab.type !== "pdf" || pdfRenderWidth <= 0) {
      return;
    }

    const nextViewportBaseWidth = Math.max(
      WHITEBOARD_MIN_PDF_RENDER_WIDTH,
      pdfRenderWidth || WHITEBOARD_MIN_PDF_RENDER_WIDTH,
    );
    if (
      Math.abs(
        nextViewportBaseWidth -
          Math.max(
            WHITEBOARD_MIN_PDF_RENDER_WIDTH,
            Number(activeTab.viewportBaseWidth) || WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          ),
      ) < 2
    ) {
      return;
    }

    emitPdfViewport({
      viewportBaseWidth: nextViewportBaseWidth,
    });
  }, [activeTab, emitPdfViewport, interactive, pdfRenderWidth]);

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

  const handleBoardZoomChange = useCallback(
    (nextZoom, anchor = null) => {
      if (!interactive || activeTab?.type === "pdf") {
        return;
      }

      const clampedZoom = Math.min(
        WHITEBOARD_MAX_ZOOM,
        Math.max(WHITEBOARD_MIN_ZOOM, nextZoom),
      );
      const nextRenderZoom = getBoardRenderScale(clampedZoom);
      const viewport = boardViewportRef.current;
      const frame = boardFrameRef.current;

      if (viewport) {
        const viewportRect = viewport.getBoundingClientRect();
        const fallbackAnchorX = viewport.clientWidth / 2;
        const fallbackAnchorY = viewport.clientHeight / 2;
        const anchorX =
          anchor && Number.isFinite(anchor.clientX)
            ? anchor.clientX - viewportRect.left
            : fallbackAnchorX;
        const anchorY =
          anchor && Number.isFinite(anchor.clientY)
            ? anchor.clientY - viewportRect.top
            : fallbackAnchorY;
        const frameOffsetLeft = frame ? frame.offsetLeft : 0;
        const frameOffsetTop = frame ? frame.offsetTop : 0;
        const boardAnchor = getBoardViewportAnchor(anchorX, anchorY, activeBoardRenderScale);
        const boardX =
          anchor && Number.isFinite(anchor.boardX) ? anchor.boardX : boardAnchor.boardX;
        const boardY =
          anchor && Number.isFinite(anchor.boardY) ? anchor.boardY : boardAnchor.boardY;

        boardZoomAnchorRef.current = {
          renderZoom: nextRenderZoom,
          boardX,
          boardY,
          anchorX,
          anchorY,
          frameOffsetLeft,
          frameOffsetTop,
        };
      }

      setBoardZoom(clampedZoom);
      onBoardZoomChange?.({
        tabId: WHITEBOARD_BOARD_TAB_ID,
        zoom: clampedZoom,
        viewportBaseWidth: Math.max(
          WHITEBOARD_MIN_BOARD_BASE_WIDTH,
          Math.round(boardViewportSize.width || 0) || WHITEBOARD_MIN_BOARD_BASE_WIDTH,
        ),
        viewportBaseHeight: Math.max(
          WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
          Math.round(boardViewportSize.height || 0) || WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
        ),
      });
    },
    [
      activeBoardRenderScale,
      activeTab?.type,
      boardViewportSize.height,
      boardViewportSize.width,
      getBoardRenderScale,
      getBoardViewportAnchor,
      interactive,
      onBoardZoomChange,
    ],
  );

  const activeWorkspaceZoom = activeTab?.type === "pdf" ? activePdfZoom : activeBoardZoom;

  const handleWorkspaceZoomChange = useCallback(
    (nextZoom) => {
      if (activeTab?.type === "pdf") {
        handlePdfZoomChange(nextZoom);
        return;
      }

      handleBoardZoomChange(nextZoom);
    },
    [activeTab?.type, handleBoardZoomChange, handlePdfZoomChange],
  );

  useEffect(() => {
    setBoardZoom(syncedBoardZoom);
  }, [syncedBoardZoom]);

  useEffect(() => {
    if (activeTab?.type === "pdf") {
      boardZoomAnchorRef.current = null;
      boardPinchStateRef.current.active = false;
      return undefined;
    }

    const viewport = boardViewportRef.current;
    const pendingAnchor = boardZoomAnchorRef.current;
    if (
      !viewport ||
      !pendingAnchor ||
      Math.abs(pendingAnchor.renderZoom - activeBoardRenderScale) > 0.001
    ) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
      const frameOffsetLeft = boardFrameRef.current ? boardFrameRef.current.offsetLeft : 0;
      const frameOffsetTop = boardFrameRef.current ? boardFrameRef.current.offsetTop : 0;
      viewport.scrollLeft = Math.min(
        maxScrollLeft,
        Math.max(
          0,
          frameOffsetLeft +
            pendingAnchor.boardX * activeBoardRenderScale -
            pendingAnchor.anchorX,
        ),
      );
      viewport.scrollTop = Math.min(
        maxScrollTop,
        Math.max(
          0,
          frameOffsetTop +
            pendingAnchor.boardY * activeBoardRenderScale -
            pendingAnchor.anchorY,
        ),
      );
      boardZoomAnchorRef.current = null;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeBoardRenderScale, activeTab?.type]);

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
    const viewport = boardViewportRef.current;
    if (!viewport || !interactive || activeTab?.type === "pdf") {
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

    const getTouchCenter = (touches) => {
      const [firstTouch, secondTouch] = touches;
      return {
        clientX: (firstTouch.clientX + secondTouch.clientX) / 2,
        clientY: (firstTouch.clientY + secondTouch.clientY) / 2,
      };
    };

    const scheduleZoom = (nextZoom, anchor) => {
      if (zoomFrameRef.current) {
        window.cancelAnimationFrame(zoomFrameRef.current);
      }

      zoomFrameRef.current = window.requestAnimationFrame(() => {
        zoomFrameRef.current = 0;
        handleBoardZoomChange(nextZoom, anchor);
      });
    };

    const handleWheelZoom = (event) => {
      if (!event.ctrlKey && !event.metaKey) {
        return;
      }

      event.preventDefault();
      const zoomDelta = event.deltaY > 0 ? -0.08 : 0.08;
      scheduleZoom(activeBoardZoom + zoomDelta, {
        clientX: event.clientX,
        clientY: event.clientY,
      });
    };

    const handleTouchStart = (event) => {
      if (event.touches.length < 2) {
        boardPinchStateRef.current.active = false;
        return;
      }

      const center = getTouchCenter(event.touches);
      const viewportRect = viewport.getBoundingClientRect();
      const anchorX = center.clientX - viewportRect.left;
      const anchorY = center.clientY - viewportRect.top;
      boardPinchStateRef.current = {
        active: true,
        distance: getTouchDistance(event.touches),
        zoom: activeBoardZoom,
        ...getBoardViewportAnchor(anchorX, anchorY, activeBoardRenderScale),
      };
    };

    const handleTouchMove = (event) => {
      if (!boardPinchStateRef.current.active || event.touches.length < 2) {
        return;
      }

      const nextDistance = getTouchDistance(event.touches);
      if (!nextDistance || !boardPinchStateRef.current.distance) {
        return;
      }

      event.preventDefault();
      const center = getTouchCenter(event.touches);
      const viewportRect = viewport.getBoundingClientRect();
      const anchorX = center.clientX - viewportRect.left;
      const anchorY = center.clientY - viewportRect.top;
      const zoomRatio = nextDistance / boardPinchStateRef.current.distance;
      const nextZoom = Math.min(
        WHITEBOARD_MAX_ZOOM,
        Math.max(WHITEBOARD_MIN_ZOOM, boardPinchStateRef.current.zoom * zoomRatio),
      );

      if (Math.abs(nextZoom - activeBoardZoom) > 0.001) {
        scheduleZoom(nextZoom, {
          clientX: center.clientX,
          clientY: center.clientY,
          boardX: boardPinchStateRef.current.boardX,
          boardY: boardPinchStateRef.current.boardY,
        });
        return;
      }

      const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
      const frameOffsetLeft = boardFrameRef.current ? boardFrameRef.current.offsetLeft : 0;
      const frameOffsetTop = boardFrameRef.current ? boardFrameRef.current.offsetTop : 0;
      viewport.scrollLeft = Math.min(
        maxScrollLeft,
        Math.max(
          0,
          frameOffsetLeft +
            boardPinchStateRef.current.boardX * activeBoardRenderScale -
            anchorX,
        ),
      );
      viewport.scrollTop = Math.min(
        maxScrollTop,
        Math.max(
          0,
          frameOffsetTop +
            boardPinchStateRef.current.boardY * activeBoardRenderScale -
            anchorY,
        ),
      );
    };

    const handleTouchEnd = () => {
      boardPinchStateRef.current.active = false;
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
  }, [
    activeBoardRenderScale,
    activeBoardZoom,
    activeTab?.type,
    getBoardViewportAnchor,
    handleBoardZoomChange,
    interactive,
  ]);

  useEffect(() => {
    const viewport = pdfViewportRef.current;
    if (!viewport || !activeTab || activeTab.type !== "pdf") {
      return;
    }

    const targetFrame = document.getElementById(
      `pdf-page-frame-${activeTab.id}-${activeTab.viewportPageNumber || 1}`,
    );
    const topInset = getPdfViewportTopInset(interactive);
    const pageAnchorTop =
      targetFrame instanceof HTMLElement
        ? targetFrame.offsetTop +
          targetFrame.offsetHeight *
            Math.min(1, Math.max(0, Number(activeTab.viewportPageOffsetRatio) || 0))
        : null;
    const scrollHeight = viewport.scrollHeight - viewport.clientHeight;
    const nextTop =
      typeof pageAnchorTop === "number"
        ? Math.max(0, pageAnchorTop - topInset)
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
    activeTab?.viewportVisibleWidthRatio,
    activeTab?.viewportPageNumber,
    activeTab?.viewportPageOffsetRatio,
    interactive,
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
    const topInset = getPdfViewportTopInset(interactive);
    const anchoredScrollTop = Math.min(
      scrollHeight,
      Math.max(0, viewport.scrollTop + topInset),
    );
    const scrollRatio = scrollHeight > 0 ? anchoredScrollTop / scrollHeight : 0;
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
        logPdfDebug("picker-load:start", {
          itemId: item.id,
          fileUrl: item.fileUrl,
          title: item.title,
        });
        const pdfDocument = await loadPdfDocument(item.fileUrl);
        const pageCount = pdfDocument.numPages || 0;
        pdfPageCountCacheRef.current[item.id] = pageCount;
        pdfPickerDocumentRef.current = pdfDocument;
        pdfPickerDocumentKeyRef.current = item.id;

        logPdfDebug("picker-load:ready", {
          itemId: item.id,
          fileUrl: item.fileUrl,
          pageCount,
        });
        setPdfPickerState({
          status: "ready",
          item,
          pageCount,
          selectedPages: [],
          error: "",
        });
      } catch (error) {
        logPdfDebug("picker-load:error", {
          itemId: item.id,
          fileUrl: item.fileUrl,
          error: serializePdfError(error),
        });
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

  const requestClearConfirmation = useCallback(() => {
    if (!interactive) {
      return;
    }

    if (activeTab?.type === "pdf") {
      setClearConfirmTarget({
        type: "pdf",
        tabId: activeTab.id,
        pageNumber: currentPdfPage,
      });
      return;
    }

    setClearConfirmTarget({
      type: "board",
      tabId: WHITEBOARD_BOARD_TAB_ID,
    });
  }, [activeTab, currentPdfPage, interactive]);

  const handleConfirmClear = useCallback(() => {
    if (!clearConfirmTarget) {
      return;
    }

    if (clearConfirmTarget.type === "pdf") {
      onClearPage?.({
        tabId: clearConfirmTarget.tabId,
        pageNumber: clearConfirmTarget.pageNumber,
      });
    } else {
      onClear?.({
        tabId: clearConfirmTarget.tabId || WHITEBOARD_BOARD_TAB_ID,
      });
    }

    setClearConfirmTarget(null);
  }, [clearConfirmTarget, onClear, onClearPage]);

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

  const selectTitle = shortcutTitle(t("groupCall.whiteboard.select"), "1");
  const penTitle = shortcutTitle(t("groupCall.whiteboard.pen"), "2");
  const textTitle = shortcutTitle(t("groupCall.whiteboard.text"), "3");
  const eraserTitle = shortcutTitle(t("groupCall.whiteboard.eraser"), "4");
  const strokeEraserTitle = shortcutTitle(t("groupCall.whiteboard.strokeEraser"), "5");
  const arrowTitle = shortcutTitle(t("groupCall.whiteboard.arrow"), "6");
  const rectangleTitle = shortcutTitle(t("groupCall.whiteboard.rectangle"), "7");
  const diamondTitle = shortcutTitle(t("groupCall.whiteboard.diamond"), "8");
  const triangleTitle = shortcutTitle(t("groupCall.whiteboard.triangle"), "9");
  const circleTitle = shortcutTitle(t("groupCall.whiteboard.circle"), "0");
  const undoTitle = shortcutTitle(t("groupCall.whiteboard.undo"), "Ctrl/Cmd+Z");
  const redoTitle = shortcutTitle(t("groupCall.whiteboard.redo"), "Ctrl/Cmd+Shift+Z");
  const zoomOutTitle = shortcutTitle(t("groupCall.whiteboard.zoomOut"), "-");
  const zoomInTitle = shortcutTitle(t("groupCall.whiteboard.zoomIn"), "+");
  const clearTitle = shortcutTitle(t("groupCall.whiteboard.clear"), "Backspace");
  const recordTitle = isRecording
    ? t("groupCall.whiteboard.stopRecording")
    : t("groupCall.whiteboard.record");
  const recordElapsedLabel = formatRecordingElapsed(recordingElapsedMs);
  const activeBrushPreset = WHITEBOARD_BRUSH_PRESETS.reduce((closest, preset) =>
    Math.abs(preset - brushSize) < Math.abs(closest - brushSize) ? preset : closest,
  WHITEBOARD_BRUSH_PRESETS[0]);
  const activeFillColor = normalizeFillColor(fillColor);
  const activeShapeEdge = normalizeShapeEdge(shapeEdge);
  const activeTextFontFamily = normalizeTextFontFamily(textFontFamily);
  const resolvedTextFontFamily = normalizeTextFontFamily(
    activeTextEditorState?.fontFamily || activeTextFontFamily,
  );
  const activeTextSize = normalizeTextSizePreset(textSize);
  const resolvedTextSize = normalizeTextSizePreset(activeTextEditorState?.textSize || activeTextSize);
  const activeTextAlign = normalizeTextAlign(textAlign);
  const resolvedTextAlign = normalizeTextAlign(activeTextEditorState?.textAlign || activeTextAlign);
  const textControlsVisible = tool === "text" || Boolean(activeTextEditorState);
  const shapeToolActive = isShapeTool(tool);
  const edgeToolActive = ["rectangle", "diamond", "triangle"].includes(tool);

  const shouldShowChrome = !compact;
  const shouldShowToolbar = showToolbar;
  const pdfLibraryModal =
    interactive && isPdfLibraryOpen ? (
      <ModalOverlay
        onClick={handlePdfLibraryClose}
        $overlay="rgba(7, 10, 18, 0.72)"
        $zIndex={10060}
        $paddingMobile="0px"
      >
        <ModalPanel
          $width="min(100%, 780px)"
          $maxHeight="min(82vh, 720px)"
          $mobileFull
          $radius="22px"
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
                    {pdfUploadPending ? <Spinner size={22} /> : <Plus size={22} />}
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
                    <Spinner size={18} />
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

                    <PageSelectionGrid data-pdf-picker-scroll-root>
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
    ) : null;

  const clearConfirmModal =
    interactive && clearConfirmTarget ? (
      <ModalOverlay
        onClick={() => setClearConfirmTarget(null)}
        $overlay="rgba(7, 10, 18, 0.72)"
        $zIndex={10070}
      >
        <ModalPanel
          $width="min(100%, 420px)"
          $radius="22px"
          onClick={(event) => event.stopPropagation()}
        >
          <ModalHeader>
            <ModalTitleBlock>
              <ModalTitle>{t("groupCall.whiteboard.clearConfirmTitle")}</ModalTitle>
              <ModalSubtitle>
                {clearConfirmTarget.type === "pdf"
                  ? t("groupCall.whiteboard.clearPageConfirmDescription")
                  : t("groupCall.whiteboard.clearBoardConfirmDescription")}
              </ModalSubtitle>
            </ModalTitleBlock>
            <ModalCloseButton
              type="button"
              onClick={() => setClearConfirmTarget(null)}
              aria-label={t("common.cancel")}
            >
              <X size={16} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalFooter>
            <DialogActionButton
              type="button"
              onClick={() => setClearConfirmTarget(null)}
            >
              {t("common.cancel")}
            </DialogActionButton>
            <DialogActionButton type="button" $danger onClick={handleConfirmClear}>
              {t("groupCall.whiteboard.clearConfirmAction")}
            </DialogActionButton>
          </ModalFooter>
        </ModalPanel>
      </ModalOverlay>
    ) : null;

  useHotkeys(
    "1",
    () => onToolChange?.("select"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "2",
    () => onToolChange?.("pen"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "3",
    () => onToolChange?.("text"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "4",
    () => onToolChange?.("eraser"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "5",
    () => onToolChange?.("stroke-eraser"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "6",
    () => onToolChange?.("arrow"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "7",
    () => onToolChange?.("rectangle"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "8",
    () => onToolChange?.("diamond"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "9",
    () => onToolChange?.("triangle"),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, onToolChange],
  );

  useHotkeys(
    "0",
    () => onToolChange?.("circle"),
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
      handleWorkspaceZoomChange(activeWorkspaceZoom - 0.1);
    },
    {
      enabled: interactive && !isPdfLibraryOpen,
      preventDefault: true,
    },
    [activeWorkspaceZoom, handleWorkspaceZoomChange, interactive, isPdfLibraryOpen],
  );

  useHotkeys(
    "+,=",
    () => {
      handleWorkspaceZoomChange(activeWorkspaceZoom + 0.1);
    },
    {
      enabled: interactive && !isPdfLibraryOpen,
      preventDefault: true,
    },
    [activeWorkspaceZoom, handleWorkspaceZoomChange, interactive, isPdfLibraryOpen],
  );

  useHotkeys(
    "[",
    () => onBrushSizeChange?.(Math.max(2, brushSize - 1)),
    {
      enabled:
        interactive &&
        !isPdfLibraryOpen &&
        tool !== "stroke-eraser" &&
        tool !== "text",
      preventDefault: true,
    },
    [brushSize, interactive, isPdfLibraryOpen, onBrushSizeChange, tool],
  );

  useHotkeys(
    "]",
    () => onBrushSizeChange?.(Math.min(24, brushSize + 1)),
    {
      enabled:
        interactive &&
        !isPdfLibraryOpen &&
        tool !== "stroke-eraser" &&
        tool !== "text",
      preventDefault: true,
    },
    [brushSize, interactive, isPdfLibraryOpen, onBrushSizeChange, tool],
  );

  useHotkeys(
    "backspace",
    () => requestClearConfirmation(),
    { enabled: interactive && !isPdfLibraryOpen, preventDefault: true },
    [interactive, isPdfLibraryOpen, requestClearConfirmation],
  );

  useEffect(() => {
    if (!interactive) {
      setIsColorPickerOpen(false);
      setIsFillPickerOpen(false);
      setIsEdgePickerOpen(false);
      setIsSizePickerOpen(false);
      setIsTextFontPickerOpen(false);
      setIsTextSizePickerOpen(false);
      setIsTextAlignPickerOpen(false);
      return undefined;
    }

    const handlePointerDownOutside = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const pickerRoots = document.querySelectorAll("[data-whiteboard-picker-root]");
      const clickedInsidePicker = Array.from(pickerRoots).some((root) => root.contains(target));
      if (!clickedInsidePicker) {
        setIsColorPickerOpen(false);
        setIsFillPickerOpen(false);
        setIsEdgePickerOpen(false);
        setIsSizePickerOpen(false);
        setIsTextFontPickerOpen(false);
        setIsTextSizePickerOpen(false);
        setIsTextAlignPickerOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, [interactive]);

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
                    {pdfUploadPending ? <Spinner size={16} /> : <Plus size={16} />}
                  </AddTabButton>
                  </>
                ) : null}
              </TabsScroller>
            </TabsBar>

          </WorkspaceChrome>
        ) : null}

        {!compact ? <WorkspaceDivider /> : null}

        <WorkspaceBody $compact={compact}>
          {shouldShowToolbar ? (
            <FloatingTopToolbar onClick={(event) => event.stopPropagation()}>
              <Toolbar>
                <ToolbarMain>
                  <ToolbarGroup>
                    <ToolOptionButton
                      type="button"
                      $active={tool === "select"}
                      onClick={() => onToolChange?.("select")}
                      aria-label={t("groupCall.whiteboard.select")}
                      title={selectTitle}
                    >
                      <MousePointer2 size={14} />
                      <ToolHotkey>1</ToolHotkey>
                    </ToolOptionButton>
                    <ToolOptionButton
                      type="button"
                      $active={tool === "pen"}
                      onClick={() => onToolChange?.("pen")}
                      aria-label={t("groupCall.whiteboard.pen")}
                      title={penTitle}
                    >
                      <Pencil size={14} />
                      <ToolHotkey>2</ToolHotkey>
                    </ToolOptionButton>
                    <ToolOptionButton
                      type="button"
                      $active={tool === "text"}
                      onClick={() => onToolChange?.("text")}
                      aria-label={t("groupCall.whiteboard.text")}
                      title={textTitle}
                    >
                      <Type size={14} />
                      <ToolHotkey>3</ToolHotkey>
                    </ToolOptionButton>
                    <ToolOptionButton
                      type="button"
                      $active={tool === "eraser"}
                      onClick={() => onToolChange?.("eraser")}
                      aria-label={t("groupCall.whiteboard.eraser")}
                      title={eraserTitle}
                    >
                      <Eraser size={14} />
                      <ToolHotkey>4</ToolHotkey>
                    </ToolOptionButton>
                    <ToolOptionButton
                      type="button"
                      $active={tool === "stroke-eraser"}
                      onClick={() => onToolChange?.("stroke-eraser")}
                      aria-label={t("groupCall.whiteboard.strokeEraser")}
                      title={strokeEraserTitle}
                    >
                      <TbVacuumCleaner size={15} />
                      <ToolHotkey>5</ToolHotkey>
                    </ToolOptionButton>
                    <ToolOptionButton
                      type="button"
                      $active={tool === "arrow"}
                      onClick={() => onToolChange?.("arrow")}
                      aria-label={t("groupCall.whiteboard.arrow")}
                      title={arrowTitle}
                    >
                      <ArrowRight size={14} />
                      <ToolHotkey>6</ToolHotkey>
                    </ToolOptionButton>
                    <ToolOptionButton
                      type="button"
                      $active={tool === "rectangle"}
                      onClick={() => onToolChange?.("rectangle")}
                      aria-label={t("groupCall.whiteboard.rectangle")}
                      title={rectangleTitle}
                    >
                      <Square size={14} />
                      <ToolHotkey>7</ToolHotkey>
                    </ToolOptionButton>
                    <ToolOptionButton
                      type="button"
                      $active={tool === "diamond"}
                      onClick={() => onToolChange?.("diamond")}
                      aria-label={t("groupCall.whiteboard.diamond")}
                      title={diamondTitle}
                    >
                      <Diamond size={14} />
                      <ToolHotkey>8</ToolHotkey>
                    </ToolOptionButton>
                    <ToolOptionButton
                      type="button"
                      $active={tool === "triangle"}
                      onClick={() => onToolChange?.("triangle")}
                      aria-label={t("groupCall.whiteboard.triangle")}
                      title={triangleTitle}
                    >
                      <Triangle size={14} />
                      <ToolHotkey>9</ToolHotkey>
                    </ToolOptionButton>
                    <ToolOptionButton
                      type="button"
                      $active={tool === "circle"}
                      onClick={() => onToolChange?.("circle")}
                      aria-label={t("groupCall.whiteboard.circle")}
                      title={circleTitle}
                    >
                      <Circle size={14} />
                      <ToolHotkey>0</ToolHotkey>
                    </ToolOptionButton>
                    {textControlsVisible ? (
                      <>
                      <TextControlGroup>
                        <PickerWrap data-whiteboard-picker-root>
                          <CurrentValueButton
                            type="button"
                            $active
                            onClick={() => {
                              setIsTextFontPickerOpen((prev) => !prev);
                              setIsTextSizePickerOpen(false);
                              setIsTextAlignPickerOpen(false);
                              setIsColorPickerOpen(false);
                              setIsFillPickerOpen(false);
                              setIsEdgePickerOpen(false);
                              setIsSizePickerOpen(false);
                            }}
                            aria-label="Font family"
                            title="Font family"
                          >
                            <span
                              style={{
                                fontFamily: getTextFontFamily(resolvedTextFontFamily),
                                fontSize: 12,
                                fontWeight: 700,
                                color: "#111111",
                              }}
                            >
                              {WHITEBOARD_TEXT_FONT_OPTIONS.find(
                                (option) => option.id === resolvedTextFontFamily,
                              )?.label?.slice(0, 1) || "S"}
                            </span>
                          </CurrentValueButton>
                          {isTextFontPickerOpen ? (
                            <PickerPopover>
                              <PickerColumn>
                                {WHITEBOARD_TEXT_FONT_OPTIONS.map((option) => (
                                  <TextPillButton
                                    key={option.id}
                                    type="button"
                                    $active={resolvedTextFontFamily === option.id}
                                    style={{ fontFamily: option.family }}
                                    onClick={() => {
                                      onTextFontFamilyChange?.(option.id);
                                      setIsTextFontPickerOpen(false);
                                    }}
                                    aria-label={option.label}
                                    title={option.label}
                                  >
                                    {option.label}
                                  </TextPillButton>
                                ))}
                              </PickerColumn>
                            </PickerPopover>
                          ) : null}
                        </PickerWrap>
                      </TextControlGroup>

                      <TextControlGroup>
                        <PickerWrap data-whiteboard-picker-root>
                          <CurrentValueButton
                            type="button"
                            $active
                            onClick={() => {
                              setIsTextSizePickerOpen((prev) => !prev);
                              setIsTextFontPickerOpen(false);
                              setIsTextAlignPickerOpen(false);
                              setIsColorPickerOpen(false);
                              setIsFillPickerOpen(false);
                              setIsEdgePickerOpen(false);
                              setIsSizePickerOpen(false);
                            }}
                            aria-label="Text size"
                            title="Text size"
                          >
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: "#111111",
                              }}
                            >
                              {WHITEBOARD_TEXT_SIZE_OPTIONS.find(
                                (option) => option.id === resolvedTextSize,
                              )?.label || "M"}
                            </span>
                          </CurrentValueButton>
                          {isTextSizePickerOpen ? (
                            <PickerPopover>
                              <PickerColumn>
                                {WHITEBOARD_TEXT_SIZE_OPTIONS.map((option) => (
                                  <TextPillButton
                                    key={option.id}
                                    type="button"
                                    $active={resolvedTextSize === option.id}
                                    onClick={() => {
                                      onTextSizeChange?.(option.id);
                                      setIsTextSizePickerOpen(false);
                                    }}
                                    aria-label={`Text size ${option.label}`}
                                    title={`Text size ${option.label}`}
                                  >
                                    {option.label}
                                  </TextPillButton>
                                ))}
                              </PickerColumn>
                            </PickerPopover>
                          ) : null}
                        </PickerWrap>
                      </TextControlGroup>

                      <TextControlGroup>
                        <PickerWrap data-whiteboard-picker-root>
                          <CurrentValueButton
                            type="button"
                            $active
                            onClick={() => {
                              setIsTextAlignPickerOpen((prev) => !prev);
                              setIsTextFontPickerOpen(false);
                              setIsTextSizePickerOpen(false);
                              setIsColorPickerOpen(false);
                              setIsFillPickerOpen(false);
                              setIsEdgePickerOpen(false);
                              setIsSizePickerOpen(false);
                            }}
                            aria-label="Text align"
                            title="Text align"
                          >
                            {resolvedTextAlign === "center" ? (
                              <AlignCenter size={14} />
                            ) : resolvedTextAlign === "right" ? (
                              <AlignRight size={14} />
                            ) : (
                              <AlignLeft size={14} />
                            )}
                          </CurrentValueButton>
                          {isTextAlignPickerOpen ? (
                            <PickerPopover>
                              <PickerColumn>
                                <TextPillButton
                                  type="button"
                                  $active={resolvedTextAlign === "left"}
                                  onClick={() => {
                                    onTextAlignChange?.("left");
                                    setIsTextAlignPickerOpen(false);
                                  }}
                                  aria-label="Align left"
                                  title="Align left"
                                >
                                  <AlignLeft size={14} />
                                </TextPillButton>
                                <TextPillButton
                                  type="button"
                                  $active={resolvedTextAlign === "center"}
                                  onClick={() => {
                                    onTextAlignChange?.("center");
                                    setIsTextAlignPickerOpen(false);
                                  }}
                                  aria-label="Align center"
                                  title="Align center"
                                >
                                  <AlignCenter size={14} />
                                </TextPillButton>
                                <TextPillButton
                                  type="button"
                                  $active={resolvedTextAlign === "right"}
                                  onClick={() => {
                                    onTextAlignChange?.("right");
                                    setIsTextAlignPickerOpen(false);
                                  }}
                                  aria-label="Align right"
                                  title="Align right"
                                >
                                  <AlignRight size={14} />
                                </TextPillButton>
                              </PickerColumn>
                            </PickerPopover>
                          ) : null}
                        </PickerWrap>
                      </TextControlGroup>
                      </>
                    ) : null}
                  </ToolbarGroup>
                  <ToolbarDivider aria-hidden="true" />

                  <ToolbarGroup>
                    <PickerWrap data-whiteboard-picker-root>
                    <CurrentValueButton
                      type="button"
                      onClick={() => {
                        setIsColorPickerOpen((prev) => !prev);
                        setIsFillPickerOpen(false);
                        setIsEdgePickerOpen(false);
                        setIsSizePickerOpen(false);
                        setIsTextFontPickerOpen(false);
                        setIsTextSizePickerOpen(false);
                        setIsTextAlignPickerOpen(false);
                      }}
                      aria-label={t("groupCall.whiteboard.pen")}
                    >
                      <CurrentColorDot $swatch={color.toLowerCase()} />
                    </CurrentValueButton>
                    {isColorPickerOpen ? (
                      <PickerPopover>
                        <PickerColumn>
                          {WHITEBOARD_SWATCHES.map((swatch) => (
                            <SwatchButton
                              key={swatch}
                              type="button"
                              $swatch={swatch}
                              $active={color.toLowerCase() === swatch}
                              onClick={() => {
                                onColorChange?.(swatch);
                                setIsColorPickerOpen(false);
                              }}
                              aria-label={t("groupCall.whiteboard.colorSwatch", {
                                color: swatch,
                              })}
                            />
                          ))}
                        </PickerColumn>
                      </PickerPopover>
                    ) : null}
                  </PickerWrap>
                    {shapeToolActive ? (
                      <PickerWrap data-whiteboard-picker-root>
                      <CurrentValueButton
                        type="button"
                        onClick={() => {
                          setIsFillPickerOpen((prev) => !prev);
                          setIsColorPickerOpen(false);
                          setIsEdgePickerOpen(false);
                          setIsSizePickerOpen(false);
                          setIsTextFontPickerOpen(false);
                          setIsTextSizePickerOpen(false);
                          setIsTextAlignPickerOpen(false);
                        }}
                        aria-label={t("groupCall.whiteboard.background")}
                      >
                        <CurrentFillSwatch
                          $swatch={activeFillColor}
                          $transparent={!activeFillColor}
                        />
                      </CurrentValueButton>
                      {isFillPickerOpen ? (
                        <PickerPopover>
                          <PickerColumn>
                            {WHITEBOARD_FILL_SWATCHES.map((swatch) => (
                              <FillSwatchButton
                                key={swatch || "__transparent__"}
                                type="button"
                                $swatch={swatch}
                                $transparent={!swatch}
                                $active={activeFillColor === swatch}
                                onClick={() => {
                                  onFillColorChange?.(swatch);
                                  setIsFillPickerOpen(false);
                                }}
                                aria-label={
                                  swatch
                                    ? t("groupCall.whiteboard.backgroundSwatch", {
                                        color: swatch,
                                      })
                                    : t("groupCall.whiteboard.transparentFill")
                                }
                                title={
                                  swatch
                                    ? t("groupCall.whiteboard.backgroundSwatch", {
                                        color: swatch,
                                      })
                                    : t("groupCall.whiteboard.transparentFill")
                                }
                              />
                            ))}
                          </PickerColumn>
                        </PickerPopover>
                      ) : null}
                      </PickerWrap>
                    ) : null}
                    {edgeToolActive ? (
                      <PickerWrap data-whiteboard-picker-root>
                      <CurrentValueButton
                        type="button"
                        onClick={() => {
                          setIsEdgePickerOpen((prev) => !prev);
                          setIsColorPickerOpen(false);
                          setIsFillPickerOpen(false);
                          setIsSizePickerOpen(false);
                          setIsTextFontPickerOpen(false);
                          setIsTextSizePickerOpen(false);
                          setIsTextAlignPickerOpen(false);
                        }}
                        aria-label={t("groupCall.whiteboard.edge")}
                        title={t("groupCall.whiteboard.edge")}
                      >
                        <EdgePreviewShape $rounded={activeShapeEdge === "rounded"} />
                      </CurrentValueButton>
                      {isEdgePickerOpen ? (
                        <PickerPopover>
                          <PickerColumn>
                            <TextPillButton
                              type="button"
                              $active={activeShapeEdge === "sharp"}
                              onClick={() => {
                                onShapeEdgeChange?.("sharp");
                                setIsEdgePickerOpen(false);
                              }}
                              aria-label={t("groupCall.whiteboard.edgeSharp")}
                              title={t("groupCall.whiteboard.edgeSharp")}
                            >
                              <EdgePreviewShape />
                            </TextPillButton>
                            <TextPillButton
                              type="button"
                              $active={activeShapeEdge === "rounded"}
                              onClick={() => {
                                onShapeEdgeChange?.("rounded");
                                setIsEdgePickerOpen(false);
                              }}
                              aria-label={t("groupCall.whiteboard.edgeRounded")}
                              title={t("groupCall.whiteboard.edgeRounded")}
                            >
                              <EdgePreviewShape $rounded />
                            </TextPillButton>
                          </PickerColumn>
                        </PickerPopover>
                      ) : null}
                      </PickerWrap>
                    ) : null}
                    {tool !== "text" ? (
                      <PickerWrap data-whiteboard-picker-root>
                      <CurrentValueButton
                        type="button"
                        onClick={() => {
                          setIsSizePickerOpen((prev) => !prev);
                          setIsColorPickerOpen(false);
                          setIsFillPickerOpen(false);
                          setIsEdgePickerOpen(false);
                          setIsTextFontPickerOpen(false);
                          setIsTextSizePickerOpen(false);
                          setIsTextAlignPickerOpen(false);
                        }}
                        aria-label={t("groupCall.whiteboard.size")}
                      >
                        <BrushPresetStroke $size={activeBrushPreset} />
                      </CurrentValueButton>
                      {isSizePickerOpen ? (
                        <PickerPopover>
                          <PickerColumn>
                            {WHITEBOARD_BRUSH_PRESETS.map((preset) => (
                              <BrushPresetButton
                                key={preset}
                                type="button"
                                $active={activeBrushPreset === preset}
                                onClick={() => {
                                  onBrushSizeChange?.(preset);
                                  setIsSizePickerOpen(false);
                                }}
                                disabled={tool === "stroke-eraser"}
                                aria-label={`${t("groupCall.whiteboard.size")} ${preset}`}
                                title={`${t("groupCall.whiteboard.size")} ${preset}`}
                              >
                                <BrushPresetStroke $size={preset} />
                              </BrushPresetButton>
                            ))}
                          </PickerColumn>
                        </PickerPopover>
                      ) : null}
                      </PickerWrap>
                    ) : null}
                  </ToolbarGroup>
                </ToolbarMain>

                <ToolbarSpacer />
                <ToolbarDivider aria-hidden="true" />
                <ToolbarRight>
                  <RecordToolbarButton
                    type="button"
                    $recording={isRecording}
                    onClick={() => onToggleRecording?.()}
                    disabled={!recordingReady && !isRecording}
                    aria-label={recordTitle}
                    title={recordTitle}
                  >
                    {isRecording ? <RecordStopGlyph aria-hidden="true" /> : <RecordDot aria-hidden="true" />}
                    {isRecording ? (
                      <RecordToolbarTime>{recordElapsedLabel}</RecordToolbarTime>
                    ) : (
                      <RecordToolbarLabel>REC</RecordToolbarLabel>
                    )}
                  </RecordToolbarButton>
                </ToolbarRight>
              </Toolbar>
            </FloatingTopToolbar>
          ) : null}

          {activeTab?.type === "pdf" && !compact ? (
            <PdfViewport
              ref={handlePdfViewportRef}
              data-record-surface-type="pdf"
              onScroll={handlePdfScroll}
              $interactive={interactive}
              $allowHorizontal={interactive && activePdfZoom > 1.001}
            >
              {pdfMeta.status === "loading" ? (
                <PdfStatus>
                  <Spinner size={18} />
                  <span>{t("groupCall.whiteboard.loadingPdf")}</span>
                </PdfStatus>
              ) : null}
              {pdfMeta.status === "error" ? (
                <PdfStatus>{t("groupCall.whiteboard.pdfLoadFailed")}</PdfStatus>
              ) : null}

              <PdfStack>
                {interactive ? (
                  <PdfViewportSpacer $size={WHITEBOARD_VIEWPORT_TOP_SAFE_SPACE} />
                ) : null}
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
                    visiblePdfPages.includes(pageMeta.pageNumber) ||
                    initialVisiblePdfPages.includes(pageMeta.pageNumber);
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
                        fillColor={fillColor}
                        shapeEdge={shapeEdge}
                        brushSize={brushSize}
                        zoomScale={activePdfRenderScale}
                        textFontFamily={textFontFamily}
                        textSize={textSize}
                        textAlign={textAlign}
                        tabId={activeTab.id}
                        pageNumber={pageMeta.pageNumber}
                        onStrokeStart={onStrokeStart}
                        onStrokeAppend={onStrokeAppend}
                        onStrokeRemove={onStrokeRemove}
                        onStrokeUpdate={onStrokeUpdate}
                        onToolChange={onToolChange}
                        onTextEditorStateChange={setActiveTextEditorState}
                        surfaceMode="page"
                        textPlaceholder={t("groupCall.whiteboard.textPlaceholder")}
                      />
                    </PdfPageFrame>
                  );
                })}
                {interactive ? (
                  <PdfViewportSpacer $size={WHITEBOARD_VIEWPORT_BOTTOM_SAFE_SPACE} />
                ) : null}
              </PdfStack>
              {!pdfMeta.pages.length && pdfMeta.status === "ready" ? (
                <PdfStatus>{t("groupCall.whiteboard.emptyPdf")}</PdfStatus>
              ) : null}
            </PdfViewport>
          ) : (
            <BoardViewport ref={handleBoardViewportRef} data-record-surface-type="board">
              <BoardViewportContent>
                <BoardCanvasFrame
                  ref={boardFrameRef}
                  style={{
                    width: `${Math.max(
                      1,
                      Math.round(localBoardBaseWidth),
                      Math.round(localBoardBaseWidth * activeBoardRenderScale),
                    )}px`,
                    height: `${Math.max(
                      1,
                      Math.round(localBoardBaseHeight),
                      Math.round(localBoardBaseHeight * activeBoardRenderScale),
                    )}px`,
                  }}
                >
                  <BoardSurface>
                    <StrokeCanvas
                      strokes={boardTab?.strokes || []}
                      interactive={interactive}
                      tool={tool}
                      color={color}
                        fillColor={fillColor}
                        shapeEdge={shapeEdge}
                        brushSize={brushSize}
                        zoomScale={activeBoardRenderScale}
                        textFontFamily={textFontFamily}
                        textSize={textSize}
                        textAlign={textAlign}
                      tabId={WHITEBOARD_BOARD_TAB_ID}
                      onStrokeStart={onStrokeStart}
                      onStrokeAppend={onStrokeAppend}
                      onStrokeRemove={onStrokeRemove}
                      onStrokeUpdate={onStrokeUpdate}
                      onToolChange={onToolChange}
                      onTextEditorStateChange={setActiveTextEditorState}
                      surfaceMode="board"
                      textPlaceholder={t("groupCall.whiteboard.textPlaceholder")}
                    />
                    {!hasBoardStrokes ? (
                      <EmptyState $compact={compact}>{helperText}</EmptyState>
                    ) : null}
                  </BoardSurface>
                </BoardCanvasFrame>
              </BoardViewportContent>
            </BoardViewport>
          )}

          {interactive ? (
            <FloatingControls>
              <FloatingGroup>
                <ToolButton
                  type="button"
                  onClick={() => handleWorkspaceZoomChange(activeWorkspaceZoom - 0.1)}
                  aria-label={t("groupCall.whiteboard.zoomOut")}
                  title={zoomOutTitle}
                >
                  <Minus size={16} />
                </ToolButton>
                <FloatingZoomValue>{Math.round(activeWorkspaceZoom * 100)}%</FloatingZoomValue>
                <ToolButton
                  type="button"
                  onClick={() => handleWorkspaceZoomChange(activeWorkspaceZoom + 0.1)}
                  aria-label={t("groupCall.whiteboard.zoomIn")}
                  title={zoomInTitle}
                >
                  <Plus size={16} />
                </ToolButton>
              </FloatingGroup>

              <FloatingGroup>
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
                <ToolButton
                  type="button"
                  onClick={requestClearConfirmation}
                  aria-label={t("groupCall.whiteboard.clear")}
                  title={clearTitle}
                >
                  <Trash2 size={16} />
                </ToolButton>
              </FloatingGroup>
            </FloatingControls>
          ) : null}
        </WorkspaceBody>
      </WorkspaceShell>

      {!isFullscreen ? (
        <TileLabel $compact={compact}>
          {activeTab?.type === "pdf" && currentPageLabel ? `${label} · ${currentPageLabel}` : label}
        </TileLabel>
      ) : null}

      {typeof document !== "undefined" && pdfLibraryModal
        ? createPortal(pdfLibraryModal, document.body)
        : null}
      {typeof document !== "undefined" && clearConfirmModal
        ? createPortal(clearConfirmModal, document.body)
        : null}
    </TileRoot>
  );
};

export default WhiteboardTile;
