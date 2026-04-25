import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHotkeys } from "react-hotkeys-hook";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorkerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
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

const WHITEBOARD_APPEND_BATCH_LIMIT = 32;
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
const WHITEBOARD_MOBILE_PDF_MAX_RENDER_EDGE = 3072;
const WHITEBOARD_CANVAS_MAX_EDGE = 8192;
const WHITEBOARD_CANVAS_MAX_PIXELS = 24000000;
const WHITEBOARD_MOBILE_CANVAS_MAX_EDGE = 4096;
const WHITEBOARD_MOBILE_CANVAS_MAX_PIXELS = 8000000;
const WHITEBOARD_MOBILE_SAFARI_CANVAS_MAX_EDGE = 3072;
const WHITEBOARD_MOBILE_SAFARI_CANVAS_MAX_PIXELS = 4500000;
const WHITEBOARD_MIN_BOARD_BASE_WIDTH = 120;
const WHITEBOARD_MIN_BOARD_BASE_HEIGHT = 120;
const WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT = 120;
const WHITEBOARD_PDF_RENDER_VERSION = "v3";
const WHITEBOARD_PDF_BUFFER_CACHE_MAX_ITEMS = 48;
const WHITEBOARD_MAX_TEXT_CHARS = 240;
const WHITEBOARD_VIEWPORT_TOP_SAFE_SPACE = 92;
const WHITEBOARD_VIEWPORT_BOTTOM_SAFE_SPACE = 176;
const WHITEBOARD_SELECTION_PADDING = 5;
const WHITEBOARD_TRANSFORM_GUIDE_THRESHOLD = 10;
const WHITEBOARD_OBJECT_SNAP_THRESHOLD = 8;
const WHITEBOARD_SPACING_GUIDE_MAX_DISTANCE = 180;
const WHITEBOARD_SPACING_GUIDE_MIN_OVERLAP = 18;
const WHITEBOARD_BOARD_POINT_MIN = -0.5;
const WHITEBOARD_BOARD_POINT_MAX = 1.5;
const WHITEBOARD_BOARD_POINT_SPAN =
  WHITEBOARD_BOARD_POINT_MAX - WHITEBOARD_BOARD_POINT_MIN;
const WHITEBOARD_WHEEL_ZOOM_SENSITIVITY = 0.0062;
const WHITEBOARD_PINCH_ZOOM_EXPONENT = 1.0;
const WHITEBOARD_ZOOM_COMMIT_DELAY_MS = 140;
const WHITEBOARD_BUTTON_ZOOM_IN_FACTOR = 1.25;
const WHITEBOARD_BUTTON_ZOOM_OUT_FACTOR = 0.8;
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

const isMobilePdfBrowser = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent || "";
  return /iPhone|iPad|iPod|Android/i.test(userAgent);
};

const getSafeWhiteboardCanvasPixelRatio = (width, height) => {
  const safeWidth = Math.max(1, Number(width) || 1);
  const safeHeight = Math.max(1, Number(height) || 1);
  const mobileSafari = isMobileSafariBrowser();
  const mobileBrowser = mobileSafari || isMobilePdfBrowser();
  const maxEdge = mobileSafari
    ? WHITEBOARD_MOBILE_SAFARI_CANVAS_MAX_EDGE
    : mobileBrowser
      ? WHITEBOARD_MOBILE_CANVAS_MAX_EDGE
      : WHITEBOARD_CANVAS_MAX_EDGE;
  const maxPixels = mobileSafari
    ? WHITEBOARD_MOBILE_SAFARI_CANVAS_MAX_PIXELS
    : mobileBrowser
      ? WHITEBOARD_MOBILE_CANVAS_MAX_PIXELS
      : WHITEBOARD_CANVAS_MAX_PIXELS;
  const deviceRatio =
    typeof window === "undefined" ? 1 : Number(window.devicePixelRatio) || 1;
  const preferredRatio = mobileBrowser ? 1 : Math.min(2, deviceRatio);
  const edgeRatio = Math.min(maxEdge / safeWidth, maxEdge / safeHeight);
  const pixelRatio = Math.sqrt(maxPixels / Math.max(1, safeWidth * safeHeight));

  return Math.max(0.01, Math.min(preferredRatio, edgeRatio, pixelRatio));
};

const buildPdfDocumentInit = (source) => {
  const mobileSafeMode = isMobilePdfBrowser();
  return {
    ...source,
    ...(mobileSafeMode
      ? {
          disableRange: true,
          disableStream: true,
          disableAutoFetch: true,
          isOffscreenCanvasSupported: false,
          isImageDecoderSupported: false,
          useWorkerFetch: false,
          useWasm: false,
          enableHWA: false,
        }
      : {}),
  };
};

const PDF_DEBUG_ENABLED = true;
const pdfBufferCache = new Map();
const pdfBufferPromiseCache = new Map();
const pdfDocumentCache = new Map();
const pdfDocumentPromiseCache = new Map();

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

const isPdfDocumentUsable = (pdfDocument) => {
  if (!pdfDocument || typeof pdfDocument !== "object") {
    return false;
  }

  if (pdfDocument.destroyed === true) {
    return false;
  }

  if (pdfDocument._transport?.destroyed === true) {
    return false;
  }

  return typeof pdfDocument.getPage === "function";
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

const touchPdfDocumentCacheEntry = (targetUrl, pdfDocument) => {
  if (!targetUrl || !isPdfDocumentUsable(pdfDocument)) {
    if (targetUrl) {
      pdfDocumentCache.delete(targetUrl);
      pdfDocumentPromiseCache.delete(targetUrl);
    }
    return;
  }

  if (pdfDocumentCache.has(targetUrl)) {
    pdfDocumentCache.delete(targetUrl);
  }
  pdfDocumentCache.set(targetUrl, pdfDocument);

  if (pdfDocumentCache.size > WHITEBOARD_PDF_BUFFER_CACHE_MAX_ITEMS) {
    const oldestKey = pdfDocumentCache.keys().next().value;
    if (oldestKey) {
      const oldestDocument = pdfDocumentCache.get(oldestKey);
      if (oldestDocument && oldestDocument !== pdfDocument) {
        try {
          oldestDocument.destroy?.();
        } catch {}
      }
      pdfDocumentCache.delete(oldestKey);
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
  const x = Number(point?.x);
  const y = Number(point?.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return { x: 0, y: 0 };
  }

  if (surfaceMode === "board") {
    const boardWidth = Math.max(1, width);
    const boardHeight = Math.max(1, height);
    return {
      x:
        ((clampStoredCoordinate(x, surfaceMode) - WHITEBOARD_BOARD_POINT_MIN) /
          WHITEBOARD_BOARD_POINT_SPAN) *
        boardWidth,
      y:
        ((clampStoredCoordinate(y, surfaceMode) - WHITEBOARD_BOARD_POINT_MIN) /
          WHITEBOARD_BOARD_POINT_SPAN) *
        boardHeight,
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
  const x = Number(point?.x);
  const y = Number(point?.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return { x: 0, y: 0 };
  }

  if (surfaceMode === "board") {
    return {
      x: clampStoredCoordinate(
        WHITEBOARD_BOARD_POINT_MIN + (x / safeWidth) * WHITEBOARD_BOARD_POINT_SPAN,
        surfaceMode,
      ),
      y: clampStoredCoordinate(
        WHITEBOARD_BOARD_POINT_MIN + (y / safeHeight) * WHITEBOARD_BOARD_POINT_SPAN,
        surfaceMode,
      ),
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

// ─── Bounding-box helpers (computed once per stroke, cached on stroke object) ──

const computeStrokeBBox = (stroke) => {
  const points = Array.isArray(stroke?.points) ? stroke.points : [];
  if (points.length === 0) return { minX: 0, minY: 0, maxX: 1, maxY: 1 };
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < points.length; i++) {
    const px = Number(points[i]?.x);
    const py = Number(points[i]?.y);
    if (px < minX) minX = px;
    if (px > maxX) maxX = px;
    if (py < minY) minY = py;
    if (py > maxY) maxY = py;
  }
  // Add a small margin for stroke width (0.02 in normalized space)
  const margin = 0.02;
  return { minX: minX - margin, minY: minY - margin, maxX: maxX + margin, maxY: maxY + margin };
};

// Get or compute cached bbox — stored as non-enumerable to avoid JSON issues
const getStrokeBBox = (stroke) => {
  if (!stroke) return null;
  if (stroke.__bbox) return stroke.__bbox;
  const bbox = computeStrokeBBox(stroke);
  try {
    Object.defineProperty(stroke, "__bbox", { value: bbox, writable: true, configurable: true, enumerable: false });
  } catch (_) { /* frozen objects: skip */ }
  return bbox;
};

// Invalidate cached bbox when points change
const invalidateStrokeBBox = (stroke) => {
  if (stroke && stroke.__bbox) {
    try { Object.defineProperty(stroke, "__bbox", { value: null, writable: true, configurable: true, enumerable: false }); } catch (_) {}
  }
};

// Returns true if stroke bbox overlaps the viewport (in normalized 0-1 coords)
// viewport: { left, top, right, bottom } in normalized coords
const isStrokeInViewport = (stroke, viewport, surfaceMode) => {
  // Board mode uses -0.5..1.5 range so always include
  if (surfaceMode === "board") return true;
  const bbox = getStrokeBBox(stroke);
  if (!bbox) return true;
  return bbox.maxX >= viewport.left && bbox.minX <= viewport.right &&
         bbox.maxY >= viewport.top  && bbox.minY <= viewport.bottom;
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

// Minimum squared distance between stored points (normalized 0-1 space)
// 0.0003 ≈ 0.03% of canvas — filters jitter without visible quality loss
const POINT_SIMPLIFY_SQ_DIST = 0.0003 * 0.0003;

const appendDistinctPoint = (points, point) => {
  if (!point) return false;

  const lastPoint = points[points.length - 1];
  if (!lastPoint) {
    points.push(point);
    return true;
  }

  const dx = point.x - lastPoint.x;
  const dy = point.y - lastPoint.y;
  if (dx * dx + dy * dy < POINT_SIMPLIFY_SQ_DIST) {
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
    const loadingTask = pdfjsLib.getDocument(
      buildPdfDocumentInit({
        data: cachedBytes.slice(),
        disableRange: true,
        disableStream: true,
        disableAutoFetch: true,
      }),
    );
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
    const loadingTask = pdfjsLib.getDocument(
      buildPdfDocumentInit({
        data: pendingBytes.slice(),
        disableRange: true,
        disableStream: true,
        disableAutoFetch: true,
      }),
    );
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
    
    try {
      const response = await fetch(targetUrl, {
        credentials: "omit",
        cache: "default",
        headers: {
          Accept: "application/pdf",
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
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
    } catch (error) {
      clearTimeout(timeoutId);
      logPdfDebug("buffer-fetch:error", {
        targetUrl,
        error: error?.message || String(error),
      });
      throw error;
    }
  })();

  pdfBufferPromiseCache.set(targetUrl, pdfBytesPromise);

  try {
    const pdfBytes = await pdfBytesPromise;
    const loadingTask = pdfjsLib.getDocument(
      buildPdfDocumentInit({
        data: pdfBytes.slice(),
        disableRange: true,
        disableStream: true,
        disableAutoFetch: true,
      }),
    );
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
  const cachedDocument = pdfDocumentCache.get(targetUrl);
  logPdfDebug("load:start", {
    fileUrl,
    targetUrl,
    preferBuffer,
    isPublicCdn: isPublicCdnPdfUrl(targetUrl),
  });

  if (cachedDocument && isPdfDocumentUsable(cachedDocument)) {
    logPdfDebug("load:document-cache-hit", {
      targetUrl,
      numPages: cachedDocument?.numPages,
    });
    touchPdfDocumentCacheEntry(targetUrl, cachedDocument);
    return cachedDocument;
  }

  if (cachedDocument && !isPdfDocumentUsable(cachedDocument)) {
    pdfDocumentCache.delete(targetUrl);
  }

  if (pdfDocumentPromiseCache.has(targetUrl)) {
    logPdfDebug("load:document-cache-await", { targetUrl });
    return pdfDocumentPromiseCache.get(targetUrl);
  }

  const loadTaskPromise = (async () => {
    if (preferBuffer || isPublicCdnPdfUrl(targetUrl) || isMobilePdfBrowser()) {
      logPdfDebug("load:prefer-buffer", { targetUrl });
      const pdfDocument = await fetchPdfDocumentBuffer(targetUrl);
      touchPdfDocumentCacheEntry(targetUrl, pdfDocument);
      return pdfDocument;
    }

    try {
      logPdfDebug("load:url-anon:start", { targetUrl });
      const loadingTask = pdfjsLib.getDocument(
        buildPdfDocumentInit({
          url: targetUrl,
          withCredentials: false,
        }),
      );
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
      touchPdfDocumentCacheEntry(targetUrl, pdfDocument);
      return pdfDocument;
    } catch (publicUrlError) {
      logPdfDebug("load:url-anon:error", {
        targetUrl,
        error: serializePdfError(publicUrlError),
      });
      try {
        logPdfDebug("load:url-auth:start", { targetUrl });
        const authenticatedLoadingTask = pdfjsLib.getDocument(
          buildPdfDocumentInit({
            url: targetUrl,
            withCredentials: true,
          }),
        );
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
        touchPdfDocumentCacheEntry(targetUrl, pdfDocument);
        return pdfDocument;
      } catch (credentialedUrlError) {
        logPdfDebug("load:url-auth:error", {
          targetUrl,
          error: serializePdfError(credentialedUrlError),
        });
        try {
          logPdfDebug("load:fallback-buffer", { targetUrl });
          const pdfDocument = await fetchPdfDocumentBuffer(targetUrl);
          touchPdfDocumentCacheEntry(targetUrl, pdfDocument);
          return pdfDocument;
        } catch (fetchIncludeError) {
          logPdfDebug("load:fallback-buffer:error", {
            targetUrl,
            error: serializePdfError(fetchIncludeError),
          });
          throw fetchIncludeError || credentialedUrlError || publicUrlError;
        }
      }
    }
  })();

  pdfDocumentPromiseCache.set(targetUrl, loadTaskPromise);
  try {
    return await loadTaskPromise;
  } finally {
    pdfDocumentPromiseCache.delete(targetUrl);
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

const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);
const roundScenePixel = (value) => Math.round((Number(value) || 0) * 2) / 2;
const amplifyZoomRatio = (ratio, exponent = WHITEBOARD_PINCH_ZOOM_EXPONENT) => {
  const safeRatio = Math.max(0.01, Number(ratio) || 1);
  return Math.exp(Math.log(safeRatio) * exponent);
};

const getTransformMetrics = (transform) => {
  if (!transform) {
    return null;
  }

  const widthPx = Math.max(1, Number(transform.widthPx) || 0);
  const heightPx = Math.max(1, Number(transform.heightPx) || 0);
  const centerX = Number(transform.centerX) || 0;
  const centerY = Number(transform.centerY) || 0;

  return {
    centerX,
    centerY,
    widthPx,
    heightPx,
    left: centerX - widthPx / 2,
    right: centerX + widthPx / 2,
    top: centerY - heightPx / 2,
    bottom: centerY + heightPx / 2,
  };
};

const getGuideMetricsFromBounds = (bounds) =>
  getTransformMetrics({
    centerX: bounds?.centerX,
    centerY: bounds?.centerY,
    widthPx: bounds?.widthPx,
    heightPx: bounds?.heightPx,
  });

const getTransformSnapPoints = (transform) => {
  if (!transform) {
    return [];
  }

  const centerX = Number(transform.centerX) || 0;
  const centerY = Number(transform.centerY) || 0;
  const halfWidth = Math.max(0.5, (Number(transform.widthPx) || 0) / 2);
  const halfHeight = Math.max(0.5, (Number(transform.heightPx) || 0) / 2);
  const rotation = Number(transform.rotation) || 0;
  const center = { x: centerX, y: centerY };
  const localPoints = [
    { x: 0, y: 0 },
    { x: -halfWidth, y: -halfHeight },
    { x: 0, y: -halfHeight },
    { x: halfWidth, y: -halfHeight },
    { x: halfWidth, y: 0 },
    { x: halfWidth, y: halfHeight },
    { x: 0, y: halfHeight },
    { x: -halfWidth, y: halfHeight },
    { x: -halfWidth, y: 0 },
  ];

  return localPoints.map((point) =>
    rotateScenePoint(
      {
        x: centerX + point.x,
        y: centerY + point.y,
      },
      center,
      rotation,
    ),
  );
};

const getResizeHandlePoint = (transform, corner) => {
  if (!transform || !corner) {
    return null;
  }

  const centerX = Number(transform.centerX) || 0;
  const centerY = Number(transform.centerY) || 0;
  const halfWidth = Math.max(0.5, (Number(transform.widthPx) || 0) / 2);
  const halfHeight = Math.max(0.5, (Number(transform.heightPx) || 0) / 2);
  const rotation = Number(transform.rotation) || 0;
  const center = { x: centerX, y: centerY };
  const localPoint = {
    x: corner.includes("right") ? halfWidth : -halfWidth,
    y: corner.includes("bottom") ? halfHeight : -halfHeight,
  };

  return rotateScenePoint(
    {
      x: centerX + localPoint.x,
      y: centerY + localPoint.y,
    },
    center,
    rotation,
  );
};

const buildGuideLine = (orientation, position, sourceMetrics, candidateMetrics, kind = "snap") => {
  if (!sourceMetrics || !candidateMetrics || !Number.isFinite(position)) {
    return null;
  }

  if (orientation === "vertical") {
    const top = Math.max(0, Math.min(sourceMetrics.top, candidateMetrics.top) - 16);
    const bottom = Math.max(sourceMetrics.bottom, candidateMetrics.bottom) + 16;
    return {
      orientation,
      position,
      start: top,
      size: Math.max(0, bottom - top),
      kind,
    };
  }

  const left = Math.max(0, Math.min(sourceMetrics.left, candidateMetrics.left) - 16);
  const right = Math.max(sourceMetrics.right, candidateMetrics.right) + 16;
  return {
    orientation,
    position,
    start: left,
    size: Math.max(0, right - left),
    kind,
  };
};

const getAxisOverlap = (startA, endA, startB, endB) =>
  Math.min(endA, endB) - Math.max(startA, startB);

const findNearestSpacingGuides = (transform, candidates) => {
  const metrics = getTransformMetrics(transform);
  if (!metrics || !Array.isArray(candidates) || !candidates.length) {
    return [];
  }

  let bestHorizontal = null;
  let bestVertical = null;

  candidates.forEach((candidate) => {
    const candidateMetrics = candidate?.metrics;
    if (!candidateMetrics) {
      return;
    }

    const verticalOverlap = getAxisOverlap(
      metrics.top,
      metrics.bottom,
      candidateMetrics.top,
      candidateMetrics.bottom,
    );
    if (verticalOverlap >= WHITEBOARD_SPACING_GUIDE_MIN_OVERLAP) {
      if (candidateMetrics.right <= metrics.left) {
        const distance = metrics.left - candidateMetrics.right;
        if (
          distance <= WHITEBOARD_SPACING_GUIDE_MAX_DISTANCE &&
          (!bestHorizontal || distance < bestHorizontal.distance)
        ) {
          const top = Math.max(metrics.top, candidateMetrics.top);
          const bottom = Math.min(metrics.bottom, candidateMetrics.bottom);
          bestHorizontal = {
            orientation: "horizontal",
            position: (top + bottom) / 2,
            start: candidateMetrics.right,
            size: distance,
            kind: "spacing",
            label: `${Math.round(distance)}`,
          };
        }
      }

      if (candidateMetrics.left >= metrics.right) {
        const distance = candidateMetrics.left - metrics.right;
        if (
          distance <= WHITEBOARD_SPACING_GUIDE_MAX_DISTANCE &&
          (!bestHorizontal || distance < bestHorizontal.distance)
        ) {
          const top = Math.max(metrics.top, candidateMetrics.top);
          const bottom = Math.min(metrics.bottom, candidateMetrics.bottom);
          bestHorizontal = {
            orientation: "horizontal",
            position: (top + bottom) / 2,
            start: metrics.right,
            size: distance,
            kind: "spacing",
            label: `${Math.round(distance)}`,
          };
        }
      }
    }

    const horizontalOverlap = getAxisOverlap(
      metrics.left,
      metrics.right,
      candidateMetrics.left,
      candidateMetrics.right,
    );
    if (horizontalOverlap >= WHITEBOARD_SPACING_GUIDE_MIN_OVERLAP) {
      if (candidateMetrics.bottom <= metrics.top) {
        const distance = metrics.top - candidateMetrics.bottom;
        if (
          distance <= WHITEBOARD_SPACING_GUIDE_MAX_DISTANCE &&
          (!bestVertical || distance < bestVertical.distance)
        ) {
          const left = Math.max(metrics.left, candidateMetrics.left);
          const right = Math.min(metrics.right, candidateMetrics.right);
          bestVertical = {
            orientation: "vertical",
            position: (left + right) / 2,
            start: candidateMetrics.bottom,
            size: distance,
            kind: "spacing",
            label: `${Math.round(distance)}`,
          };
        }
      }

      if (candidateMetrics.top >= metrics.bottom) {
        const distance = candidateMetrics.top - metrics.bottom;
        if (
          distance <= WHITEBOARD_SPACING_GUIDE_MAX_DISTANCE &&
          (!bestVertical || distance < bestVertical.distance)
        ) {
          const left = Math.max(metrics.left, candidateMetrics.left);
          const right = Math.min(metrics.right, candidateMetrics.right);
          bestVertical = {
            orientation: "vertical",
            position: (left + right) / 2,
            start: metrics.bottom,
            size: distance,
            kind: "spacing",
            label: `${Math.round(distance)}`,
          };
        }
      }
    }
  });

  return [bestHorizontal, bestVertical].filter(Boolean);
};

const resolveBalancedSpacingSnap = (transform, candidates) => {
  const metrics = getTransformMetrics(transform);
  if (!metrics || !Array.isArray(candidates) || !candidates.length) {
    return {
      transform,
      guideLines: [],
    };
  }

  let bestHorizontal = null;
  let bestVertical = null;

  const filteredCandidates = candidates.filter((candidate) => candidate?.metrics);

  filteredCandidates.forEach((leftCandidate) => {
    filteredCandidates.forEach((rightCandidate) => {
      if (leftCandidate.id === rightCandidate.id) {
        return;
      }

      const leftMetrics = leftCandidate.metrics;
      const rightMetrics = rightCandidate.metrics;
      const overlap = getAxisOverlap(
        metrics.top,
        metrics.bottom,
        Math.max(leftMetrics.top, rightMetrics.top),
        Math.min(leftMetrics.bottom, rightMetrics.bottom),
      );
      if (
        overlap < WHITEBOARD_SPACING_GUIDE_MIN_OVERLAP ||
        leftMetrics.right > metrics.left ||
        rightMetrics.left < metrics.right ||
        leftMetrics.right >= rightMetrics.left
      ) {
        return;
      }

      const desiredCenterX = (leftMetrics.right + rightMetrics.left) / 2;
      const distance = Math.abs(desiredCenterX - metrics.centerX);
      const gap = (rightMetrics.left - leftMetrics.right - metrics.widthPx) / 2;
      if (
        gap < 0 ||
        gap > WHITEBOARD_SPACING_GUIDE_MAX_DISTANCE ||
        distance > WHITEBOARD_OBJECT_SNAP_THRESHOLD
      ) {
        return;
      }

      if (!bestHorizontal || distance < bestHorizontal.distance) {
        bestHorizontal = {
          desiredCenterX,
          distance,
          leftMetrics,
          rightMetrics,
          gap,
        };
      }
    });
  });

  filteredCandidates.forEach((topCandidate) => {
    filteredCandidates.forEach((bottomCandidate) => {
      if (topCandidate.id === bottomCandidate.id) {
        return;
      }

      const topMetrics = topCandidate.metrics;
      const bottomMetrics = bottomCandidate.metrics;
      const overlap = getAxisOverlap(
        metrics.left,
        metrics.right,
        Math.max(topMetrics.left, bottomMetrics.left),
        Math.min(topMetrics.right, bottomMetrics.right),
      );
      if (
        overlap < WHITEBOARD_SPACING_GUIDE_MIN_OVERLAP ||
        topMetrics.bottom > metrics.top ||
        bottomMetrics.top < metrics.bottom ||
        topMetrics.bottom >= bottomMetrics.top
      ) {
        return;
      }

      const desiredCenterY = (topMetrics.bottom + bottomMetrics.top) / 2;
      const distance = Math.abs(desiredCenterY - metrics.centerY);
      const gap = (bottomMetrics.top - topMetrics.bottom - metrics.heightPx) / 2;
      if (
        gap < 0 ||
        gap > WHITEBOARD_SPACING_GUIDE_MAX_DISTANCE ||
        distance > WHITEBOARD_OBJECT_SNAP_THRESHOLD
      ) {
        return;
      }

      if (!bestVertical || distance < bestVertical.distance) {
        bestVertical = {
          desiredCenterY,
          distance,
          topMetrics,
          bottomMetrics,
          gap,
        };
      }
    });
  });

  const snappedTransform = {
    ...transform,
    centerX: bestHorizontal ? bestHorizontal.desiredCenterX : transform.centerX,
    centerY: bestVertical ? bestVertical.desiredCenterY : transform.centerY,
  };
  const snappedMetrics = getTransformMetrics(snappedTransform);
  const guideLines = [];

  if (bestHorizontal && snappedMetrics) {
    const guideTop = Math.max(
      snappedMetrics.top,
      bestHorizontal.leftMetrics.top,
      bestHorizontal.rightMetrics.top,
    );
    const guideBottom = Math.min(
      snappedMetrics.bottom,
      bestHorizontal.leftMetrics.bottom,
      bestHorizontal.rightMetrics.bottom,
    );
    const guideY = (guideTop + guideBottom) / 2;
    const label = `${Math.round(bestHorizontal.gap)}`;
    guideLines.push(
      {
        orientation: "horizontal",
        position: guideY,
        start: bestHorizontal.leftMetrics.right,
        size: Math.max(0, snappedMetrics.left - bestHorizontal.leftMetrics.right),
        kind: "spacing",
        label,
      },
      {
        orientation: "horizontal",
        position: guideY,
        start: snappedMetrics.right,
        size: Math.max(0, bestHorizontal.rightMetrics.left - snappedMetrics.right),
        kind: "spacing",
        label,
      },
    );
  }

  if (bestVertical && snappedMetrics) {
    const guideLeft = Math.max(
      snappedMetrics.left,
      bestVertical.topMetrics.left,
      bestVertical.bottomMetrics.left,
    );
    const guideRight = Math.min(
      snappedMetrics.right,
      bestVertical.topMetrics.right,
      bestVertical.bottomMetrics.right,
    );
    const guideX = (guideLeft + guideRight) / 2;
    const label = `${Math.round(bestVertical.gap)}`;
    guideLines.push(
      {
        orientation: "vertical",
        position: guideX,
        start: bestVertical.topMetrics.bottom,
        size: Math.max(0, snappedMetrics.top - bestVertical.topMetrics.bottom),
        kind: "spacing",
        label,
      },
      {
        orientation: "vertical",
        position: guideX,
        start: snappedMetrics.bottom,
        size: Math.max(0, bestVertical.bottomMetrics.top - snappedMetrics.bottom),
        kind: "spacing",
        label,
      },
    );
  }

  return {
    transform: snappedTransform,
    guideLines: guideLines.filter((line) => (line?.size || 0) > 0),
  };
};

const resolveResizeSnap = (transform, transformState, candidates) => {
  if (!transform || !transformState?.corner) {
    return {
      transform,
      guideLines: [],
    };
  }

  const metrics = getTransformMetrics(transform);
  if (!metrics || !Array.isArray(candidates) || !candidates.length) {
    return {
      transform,
      guideLines: [],
    };
  }

  const signX = transformState.corner.includes("right") ? 1 : -1;
  const signY = transformState.corner.includes("bottom") ? 1 : -1;
  const fixedX = Number(transformState.fixedCornerWorld?.x);
  const fixedY = Number(transformState.fixedCornerWorld?.y);
  if (!Number.isFinite(fixedX) || !Number.isFinite(fixedY)) {
    return {
      transform,
      guideLines: [],
    };
  }

  const activePoint = getResizeHandlePoint(transform, transformState.corner);
  if (!activePoint) {
    return {
      transform,
      guideLines: [],
    };
  }
  let bestX = null;
  let bestY = null;

  candidates.forEach((candidate) => {
    const candidateMetrics = candidate?.metrics;
    if (!candidateMetrics || !Array.isArray(candidate.snapPoints) || candidate.snapPoints.length === 0) {
      return;
    }

    candidate.snapPoints.forEach((targetPoint) => {
      const distance = Math.abs(targetPoint.x - activePoint.x);
      if (distance > WHITEBOARD_OBJECT_SNAP_THRESHOLD) {
        return;
      }
      if (!bestX || distance < bestX.distance) {
        bestX = {
          position: targetPoint.x,
          distance,
          candidateMetrics,
        };
      }
    });

    candidate.snapPoints.forEach((targetPoint) => {
      const distance = Math.abs(targetPoint.y - activePoint.y);
      if (distance > WHITEBOARD_OBJECT_SNAP_THRESHOLD) {
        return;
      }
      if (!bestY || distance < bestY.distance) {
        bestY = {
          position: targetPoint.y,
          distance,
          candidateMetrics,
        };
      }
    });
  });

  let widthPx = transform.widthPx;
  let heightPx = transform.heightPx;
  let centerX = transform.centerX;
  let centerY = transform.centerY;
  let fontPixelSize = transform.fontPixelSize;
  const snappedActivePoint = {
    x: bestX ? bestX.position : activePoint.x,
    y: bestY ? bestY.position : activePoint.y,
  };
  const inverseRotation = -(Number(transform.rotation) || 0);
  const rotatedActivePoint = rotateScenePoint(
    snappedActivePoint,
    transformState.fixedCornerWorld,
    inverseRotation,
  );
  const fixedLocal = rotateScenePoint(
    transformState.fixedCornerWorld,
    transformState.fixedCornerWorld,
    inverseRotation,
  );
  const vectorLocal = {
    x: rotatedActivePoint.x - fixedLocal.x,
    y: rotatedActivePoint.y - fixedLocal.y,
  };
  widthPx = Math.max(18, Math.abs(vectorLocal.x));
  heightPx = Math.max(18, Math.abs(vectorLocal.y));
  const centerOffsetLocal = {
    x: vectorLocal.x / 2,
    y: vectorLocal.y / 2,
  };
  const centerWorld = rotateScenePoint(
    {
      x: transformState.fixedCornerWorld.x + centerOffsetLocal.x,
      y: transformState.fixedCornerWorld.y + centerOffsetLocal.y,
    },
    transformState.fixedCornerWorld,
    Number(transform.rotation) || 0,
  );
  centerX = centerWorld.x;
  centerY = centerWorld.y;

  if (transformState.stroke?.tool === "text") {
    const startWidth = Math.max(1, Number(transformState.startTransform.widthPx) || 1);
    const startHeight = Math.max(1, Number(transformState.startTransform.heightPx) || 1);
    const uniformScale = Math.max(0.25, Math.max(widthPx / startWidth, heightPx / startHeight));
    widthPx = startWidth * uniformScale;
    heightPx = startHeight * uniformScale;
    fontPixelSize = Math.max(
      8,
      (transformState.startTransform.fontPixelSize || transform.fontPixelSize || 16) * uniformScale,
    );
    const textCenterWorld = rotateScenePoint(
      {
        x: transformState.fixedCornerWorld.x + signX * widthPx / 2,
        y: transformState.fixedCornerWorld.y + signY * heightPx / 2,
      },
      transformState.fixedCornerWorld,
      Number(transform.rotation) || 0,
    );
    centerX = textCenterWorld.x;
    centerY = textCenterWorld.y;
  }

  const snappedTransform = {
    ...transform,
    centerX,
    centerY,
    widthPx,
    heightPx,
    fontPixelSize,
  };
  const snappedMetrics = getTransformMetrics(snappedTransform);
  const guideLines = [];

  if (bestX && snappedMetrics) {
    const line = buildGuideLine(
      "vertical",
      bestX.position,
      snappedMetrics,
      bestX.candidateMetrics,
    );
    if (line) {
      guideLines.push(line);
    }
  }

  if (bestY && snappedMetrics) {
    const line = buildGuideLine(
      "horizontal",
      bestY.position,
      snappedMetrics,
      bestY.candidateMetrics,
    );
    if (line) {
      guideLines.push(line);
    }
  }

  return {
    transform: snappedTransform,
    guideLines,
  };
};

const resolveMoveSnap = (transform, candidates) => {
  const metrics = getTransformMetrics(transform);
  if (!metrics || !Array.isArray(candidates) || !candidates.length) {
    return {
      transform,
      guideLines: [],
    };
  }

  const sourcePoints = getTransformSnapPoints(transform);
  let bestX = null;
  let bestY = null;

  candidates.forEach((candidate) => {
    if (!candidate?.metrics || !Array.isArray(candidate.snapPoints) || candidate.snapPoints.length === 0) {
      return;
    }

    sourcePoints.forEach((sourcePoint) => {
      candidate.snapPoints.forEach((targetPoint) => {
        const delta = targetPoint.x - sourcePoint.x;
        const distance = Math.abs(delta);
        if (distance > WHITEBOARD_OBJECT_SNAP_THRESHOLD) {
          return;
        }

        if (!bestX || distance < bestX.distance) {
          bestX = {
            delta,
            distance,
            position: targetPoint.x,
            candidateMetrics: candidate.metrics,
          };
        }
      });
    });

    sourcePoints.forEach((sourcePoint) => {
      candidate.snapPoints.forEach((targetPoint) => {
        const delta = targetPoint.y - sourcePoint.y;
        const distance = Math.abs(delta);
        if (distance > WHITEBOARD_OBJECT_SNAP_THRESHOLD) {
          return;
        }

        if (!bestY || distance < bestY.distance) {
          bestY = {
            delta,
            distance,
            position: targetPoint.y,
            candidateMetrics: candidate.metrics,
          };
        }
      });
    });
  });

  const snappedTransform = {
    ...transform,
    centerX: transform.centerX + (bestX?.delta || 0),
    centerY: transform.centerY + (bestY?.delta || 0),
  };
  const snappedMetrics = getTransformMetrics(snappedTransform);
  const guideLines = [];

  if (bestX && snappedMetrics) {
    const verticalLine = buildGuideLine(
      "vertical",
      bestX.position,
      snappedMetrics,
      bestX.candidateMetrics,
    );
    if (verticalLine) {
      guideLines.push(verticalLine);
    }
  }

  if (bestY && snappedMetrics) {
    const horizontalLine = buildGuideLine(
      "horizontal",
      bestY.position,
      snappedMetrics,
      bestY.candidateMetrics,
    );
    if (horizontalLine) {
      guideLines.push(horizontalLine);
    }
  }

  return {
    transform: snappedTransform,
    guideLines,
  };
};

const buildTransformGuideState = (transform, mode, extraGuideLines = []) => {
  if (!transform || (mode !== "move" && mode !== "resize")) {
    return null;
  }

  const lines = [];
  const safeSurfaceWidth = Math.max(1, Number(transform.surfaceWidth) || 0);
  const safeSurfaceHeight = Math.max(1, Number(transform.surfaceHeight) || 0);
  const centerGuideX = safeSurfaceWidth / 2;
  const centerGuideY = safeSurfaceHeight / 2;
  if (Math.abs((transform.centerX || 0) - centerGuideX) <= WHITEBOARD_TRANSFORM_GUIDE_THRESHOLD) {
    lines.push({
      orientation: "vertical",
      position: centerGuideX,
      start: 0,
      size: safeSurfaceHeight,
      kind: "center",
    });
  }
  if (Math.abs((transform.centerY || 0) - centerGuideY) <= WHITEBOARD_TRANSFORM_GUIDE_THRESHOLD) {
    lines.push({
      orientation: "horizontal",
      position: centerGuideY,
      start: 0,
      size: safeSurfaceWidth,
      kind: "center",
    });
  }
  if (Array.isArray(extraGuideLines) && extraGuideLines.length) {
    lines.push(...extraGuideLines.filter(Boolean));
  }
  const widthPx = Math.max(1, Math.round(Number(transform.widthPx) || 0));
  const heightPx = Math.max(1, Math.round(Number(transform.heightPx) || 0));
  const labelX = clampValue(transform.centerX || centerGuideX, 68, safeSurfaceWidth - 68);
  const labelY = clampValue(
    (transform.centerY || centerGuideY) - (transform.heightPx || 0) / 2 - 16,
    22,
    safeSurfaceHeight - 22,
  );

  return {
    mode,
    lines,
    label: `${widthPx} × ${heightPx}`,
    labelX,
    labelY,
  };
};

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
  bottom: 18px;
  right: 18px;
  background: rgba(0, 0, 0, 0.55);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  overflow: visible;
  -webkit-overflow-scrolling: touch;
  pointer-events: auto;

  @media (max-width: 768px) {
    width: calc(100% - 16px);
    max-width: calc(100% - 16px);
    overflow-x: auto;
    overflow-y: visible;
    scrollbar-width: none;
    touch-action: pan-x;
    justify-content: flex-start;

    &::-webkit-scrollbar {
      display: none;
    }
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
  overflow: visible;
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

const GuestSyncButton = styled.button`
  position: absolute;
  right: 18px;
  bottom: 86px;
  z-index: 7;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border: 1px solid rgba(99, 102, 241, 0.28);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.96);
  color: #4f46e5;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14);
  backdrop-filter: blur(12px);
  pointer-events: auto;

  @media (max-width: 768px) {
    right: 14px;
    bottom: 78px;
  }
`;

const RemoteCursorLayer = styled.div`
  position: absolute;
  z-index: 9;
  pointer-events: none;
`;

const RemoteCursorWrap = styled.div`
  position: absolute;
  left: ${(p) => `${p.$x * 100}%`};
  top: ${(p) => `${p.$y * 100}%`};
  transform: translate(-2px, -2px);
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const RemoteCursorGlyph = styled.div`
  width: 18px;
  height: 18px;
  color: #2563eb;
  filter: drop-shadow(0 1px 2px rgba(15, 23, 42, 0.2));
`;

const RemoteCursorLabel = styled.div`
  max-width: 160px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.82);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  background: linear-gradient(180deg, rgba(249, 250, 252, 0.98), rgba(241, 244, 248, 0.98));
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
  background-color: #fcfdff;
  overflow: hidden;
`;

const BoardSceneGrid = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(p) => `${p.$frameWidth}px`};
  height: ${(p) => `${p.$frameHeight}px`};
  border-radius: inherit;
  pointer-events: none;
  background-color: #fcfdff;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.16) 1px, transparent 1px),
    linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px);
  background-size: ${(p) => `${24 * p.$scale}px ${24 * p.$scale}px`},
    ${(p) => `${24 * p.$scale}px ${24 * p.$scale}px`},
    ${(p) => `${120 * p.$scale}px ${120 * p.$scale}px`},
    ${(p) => `${120 * p.$scale}px ${120 * p.$scale}px`};
  background-position:
    ${(p) => `${p.$offsetLeft - 1}px ${p.$offsetTop - 1}px`},
    ${(p) => `${p.$offsetLeft - 1}px ${p.$offsetTop - 1}px`},
    ${(p) => `${p.$offsetLeft - 1}px ${p.$offsetTop - 1}px`},
    ${(p) => `${p.$offsetLeft - 1}px ${p.$offsetTop - 1}px`};
`;

const getBoardFrameOffset = (viewport, frame) => {
  if (!viewport) {
    return { left: 0, top: 0 };
  }

  const frameWidth = Math.max(
    0,
    frame?.offsetWidth || frame?.clientWidth || frame?.getBoundingClientRect?.().width || 0,
  );
  const frameHeight = Math.max(
    0,
    frame?.offsetHeight || frame?.clientHeight || frame?.getBoundingClientRect?.().height || 0,
  );

  return {
    left: Math.max(0, (viewport.clientWidth - frameWidth) / 2),
    top: Math.max(0, (viewport.clientHeight - frameHeight) / 2),
  };
};

const PdfViewport = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: ${(p) => (p.$allowHorizontal ? "auto" : "hidden")};
  border-radius: 0 0 18px 18px;
  background:
    linear-gradient(180deg, rgba(239,242,247,0.98), rgba(228,232,238,0.98)),
    radial-gradient(circle at top, rgba(255,255,255,0.38), transparent 45%);
  padding: 0 20px;
  scroll-padding-top: ${WHITEBOARD_VIEWPORT_TOP_SAFE_SPACE}px;
  scroll-padding-bottom: ${WHITEBOARD_VIEWPORT_BOTTOM_SAFE_SPACE}px;
  overscroll-behavior: contain;
  touch-action: pan-x pan-y;
`;

const RemoteViewportShell = styled.div`
  position: absolute;
  inset: 0;
  flex: 0 0 auto;
  margin: auto;
  overflow: hidden;
`;

const RemoteViewportScaleLayer = styled.div`
  position: absolute;
  inset: 0 auto auto 0;
  transform-origin: top left;
  will-change: transform;
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
  max-width: 100vw;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.14);

  @media (max-width: 768px) {
    max-width: calc(100vw - 24px);
    margin: 0 auto;
  }
`;

const PdfPageScaleLayer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform-origin: top center;
  will-change: transform;
`;

const PdfPageCanvas = styled.canvas`
  display: block;
  width: 100%;
  height: auto;
  transform: rotate(0deg) translateZ(0);
  transform-origin: top left;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  ${(p) =>
    p.$hidden
      ? `
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
  `
      : ""}
`;

const PdfRasterImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
  transform: rotate(0deg) translateZ(0);
  transform-origin: top left;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
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
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
  pointer-events: none;
`;

// Active layer — on top, receives pointer events
const ActiveCanvasEl = styled.canvas`
  display: block;
  position: absolute;
  inset: 0;
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

const TransformGuideLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
`;

const TransformGuideLine = styled.div`
  position: absolute;
  background: rgba(107, 108, 255, 0.48);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.72);
`;

const TransformGuideBadge = styled.div`
  position: absolute;
  z-index: 6;
  min-width: 86px;
  padding: 6px 10px;
  transform: translate(-50%, -100%);
  border: 1px solid rgba(107, 108, 255, 0.28);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
  color: #4c51bf;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
  text-align: center;
  white-space: nowrap;
`;

const TransformGuideHint = styled.div`
  position: absolute;
  z-index: 6;
  padding: 4px 8px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.1);
  color: #b45309;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  pointer-events: none;
  white-space: nowrap;
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
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--call-text);
  font-size: 14px;
  font-weight: 700;
  min-height: 200px;
  padding: 40px 20px;
  z-index: 3;
`;

const PdfLoadingSkeleton = styled.div`
  width: min(100%, 540px);
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border-radius: 24px;
  border: 1px solid var(--call-border);
  background: var(--call-panel);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    width: calc(100% - 12px);
    padding: 14px;
    gap: 10px;
    border-radius: 20px;
  }
`;

const PdfLoadingHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PdfLoadingLine = styled.div`
  position: relative;
  overflow: hidden;
  height: ${(p) => p.$height || "14px"};
  width: ${(p) => p.$width || "100%"};
  border-radius: 999px;
  background: color-mix(in srgb, var(--call-text) 12%, transparent);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in srgb, var(--call-surface) 72%, transparent),
      transparent
    );
    animation: whiteboardPdfSkeletonPulse 1.3s ease-in-out infinite;
  }
`;

const PdfLoadingCanvas = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: clamp(220px, 44vh, 420px);
  border-radius: 20px;
  background: color-mix(in srgb, var(--call-text) 4%, var(--call-panel));
  border: 1px solid var(--call-border);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in srgb, var(--call-surface) 60%, transparent),
      transparent
    );
    animation: whiteboardPdfSkeletonPulse 1.5s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    min-height: clamp(180px, 36vh, 300px);
    border-radius: 16px;
  }
`;

const PdfLoadingCaption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: color-mix(in srgb, var(--call-text) 64%, transparent);
  font-size: 13px;
  font-weight: 700;
`;

const PdfLoadingDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--call-primary);
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--call-primary) 12%, transparent);
`;

const PdfLoadingText = styled.span`
  min-width: 0;
`;

const PdfStatusText = styled.span`
  text-align: center;
`;

const PdfStatusContent = styled.div`
  width: min(100%, 540px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  border-radius: 24px;
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);

  @media (max-width: 768px) {
    width: calc(100% - 12px);
    padding: 16px;
    border-radius: 18px;
  }
`;

const PdfPagesLoadingSkeleton = styled.div`
  width: min(100%, 720px);
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 168px;
  gap: 14px;
  overflow-x: hidden;
  align-items: start;

  @media (max-width: 768px) {
    width: 100%;
    grid-auto-columns: 140px;
    gap: 10px;
  }
`;

const PdfPageThumbSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border-radius: 18px;
  border: 1px solid var(--call-border);
  background: var(--call-panel);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
`;

const PdfPageThumbFrame = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 0.72;
  border-radius: 14px;
  background: color-mix(in srgb, var(--call-text) 6%, var(--call-panel));

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in srgb, var(--call-surface) 64%, transparent),
      transparent
    );
    animation: whiteboardPdfSkeletonPulse 1.4s ease-in-out infinite;
  }
`;

const PdfPageThumbMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PdfPageThumbLabel = styled(PdfLoadingLine)`
  width: 56%;
  height: 11px;
`;

const PdfPageThumbSubLabel = styled(PdfLoadingLine)`
  width: 78%;
  height: 9px;
`;

const SkeletonMotion = styled.div`
  display: none;

  @keyframes whiteboardPdfSkeletonPulse {
    100% {
      transform: translateX(100%);
    }
  }
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
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

const PdfLibraryCard = styled.button`
  min-height: 140px;
  border-radius: 18px;
  border: 2px solid rgba(255, 255, 255, 0.18);
  background: color-mix(in srgb, var(--call-panel) 92%, white 8%);
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  text-align: left;
  cursor: pointer;
  box-shadow: none;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--call-primary) 58%, white 22%);
    background: color-mix(in srgb, var(--call-panel) 86%, white 14%);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PdfLibraryTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--call-text);
  line-height: 1.4;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PdfLibraryMeta = styled.div`
  font-size: 12px;
  color: color-mix(in srgb, var(--call-text) 60%, transparent);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PdfUploadCard = styled(PdfLibraryCard)`
  align-items: center;
  justify-content: center;
  text-align: center;
  color: color-mix(in srgb, var(--call-text) 70%, transparent);
  border-style: dashed;
  border-color: color-mix(in srgb, var(--call-primary) 40%, var(--call-border));
  background: color-mix(in srgb, var(--call-primary) 4%, var(--call-panel));

  &:hover {
    background: color-mix(in srgb, var(--call-primary) 8%, var(--call-panel));
    border-color: color-mix(in srgb, var(--call-primary) 60%, var(--call-border));
  }
`;

const PdfLibraryEmpty = styled.div`
  padding: 24px;
  color: color-mix(in srgb, var(--call-text) 60%, transparent);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  background: var(--call-panel);
  border-radius: 16px;
  border: 1px dashed var(--call-border);
`;

const PdfPickerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
`;

const PdfPickerMeta = styled.div`
  font-size: 12px;
  color: color-mix(in srgb, var(--call-text) 62%, transparent);
`;

const PageSelectionToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: color-mix(in srgb, var(--call-text) 2%, var(--call-panel));
  border-radius: 16px;
  border: 1px solid var(--call-border);
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
        : "var(--call-border)"};
  background: ${(p) =>
    p.$active
      ? "color-mix(in srgb, var(--call-primary) 12%, var(--call-panel))"
      : "var(--call-panel)"};
  color: var(--call-text);
  cursor: pointer;
  overflow: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: ${(p) =>
    p.$active ? "0 16px 30px rgba(59, 130, 246, 0.14)" : "0 12px 24px rgba(0, 0, 0, 0.08)"};
  transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${(p) =>
      p.$active ? "0 18px 34px rgba(59, 130, 246, 0.18)" : "0 16px 28px rgba(0, 0, 0, 0.12)"};
  }
`;

const PagePreviewViewport = styled.div`
  position: relative;
  width: 100%;
  min-height: 188px;
  border-radius: 14px;
  overflow: hidden;
  background: color-mix(in srgb, var(--call-text) 4%, var(--call-panel));
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PagePreviewCanvas = styled.canvas`
  display: block;
  width: 100%;
  height: auto;
  background: var(--call-surface);
`;

const PagePreviewPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: color-mix(in srgb, var(--call-text) 44%, transparent);
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
  color: ${(p) =>
    p.$active ? "var(--call-primary)" : "color-mix(in srgb, var(--call-text) 46%, transparent)"};
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
      const scale = Math.max(0.01, targetWidth / Math.max(1, baseViewport.width));
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
  // Layer 1: persisted strokes (redraws only when committed strokes change)
  const canvasRef = useRef(null);
  // Layer 2: active drawing — draft stroke + shape preview (60fps loop)
  const activeCanvasRef = useRef(null);
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
  // Cached surface bounding rect — updated on pointerdown, reused in pointermove to avoid layout thrashing
  const surfaceRectCacheRef = useRef(null);
  // Active layer RAF handle
  const activeLayerRafRef = useRef(0);
  const [surfaceSize, setSurfaceSize] = useState({ width: 0, height: 0 });
  const [textEditor, setTextEditor] = useState(null);
  const [selectedShapeId, setSelectedShapeId] = useState("");
  const [shapePreviewStroke, setShapePreviewStroke] = useState(null);
  const [shapeTransformGuides, setShapeTransformGuides] = useState(null);
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

  // Keep refs to avoid stale closure in RAF — avoids triggering new RAF on every state change
  const redrawRafRef = useRef(0);
  const redrawPendingRef = useRef(false);
  const strokesRef = useRef(strokes);
  const shapePreviewStrokeRef = useRef(shapePreviewStroke);
  const zoomScaleRef = useRef(zoomScale);
  const surfaceModeRef = useRef(surfaceMode);
  const textEditorStrokeIdRef = useRef(textEditor?.strokeId || "");

  strokesRef.current = strokes;
  shapePreviewStrokeRef.current = shapePreviewStroke;
  zoomScaleRef.current = zoomScale;
  surfaceModeRef.current = surfaceMode;
  textEditorStrokeIdRef.current = textEditor?.strokeId || "";

  // ─── Persisted layer (Layer 1): only committed strokes, viewport-culled ────────
  const performRedraw = useCallback(() => {
    redrawPendingRef.current = false;
    redrawRafRef.current = 0;

    const canvas = canvasRef.current;
    const { width, height } = canvasSizeRef.current;
    if (!canvas || width <= 0 || height <= 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentStrokes = strokesRef.current;
    const currentZoom = zoomScaleRef.current;
    const currentSurfaceMode = surfaceModeRef.current;
    const editingStrokeId = textEditorStrokeIdRef.current;
    const previewShapeStrokeId = shapePreviewStrokeRef.current?.id || "";
    const draftStrokeId = draftStrokeRef.current?.id || "";

    // Build viewport in normalized coords for culling (page mode only)
    const viewport = currentSurfaceMode === "page" ? {
      left: 0, top: 0, right: 1, bottom: 1,
    } : null;

    ctx.clearRect(0, 0, width, height);
    const strokeList = Array.isArray(currentStrokes) ? currentStrokes : [];
    for (let i = 0; i < strokeList.length; i++) {
      const stroke = strokeList[i];
      if (!stroke) continue;
      // Skip strokes rendered on active layer
      if ((editingStrokeId && stroke.id === editingStrokeId) ||
          (previewShapeStrokeId && stroke.id === previewShapeStrokeId) ||
          (draftStrokeId && stroke.id === draftStrokeId)) continue;
      // Viewport culling — skip off-screen strokes
      if (viewport && !isStrokeInViewport(stroke, viewport, currentSurfaceMode)) continue;
      drawStroke(ctx, stroke, width, height, currentZoom, currentSurfaceMode);
    }
  }, []);

  // ─── Active layer (Layer 2): draft stroke + shape preview, runs at 60fps ──────
  const renderActiveLayer = useCallback(() => {
    const canvas = activeCanvasRef.current;
    const { width, height } = canvasSizeRef.current;
    if (!canvas || width <= 0 || height <= 0) {
      activeLayerRafRef.current = window.requestAnimationFrame(renderActiveLayer);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      activeLayerRafRef.current = window.requestAnimationFrame(renderActiveLayer);
      return;
    }
    const currentZoom = zoomScaleRef.current;
    const currentSurfaceMode = surfaceModeRef.current;
    const hasDraft = Boolean(draftStrokeRef.current);
    const hasPreview = Boolean(shapePreviewStrokeRef.current);

    if (hasDraft || hasPreview) {
      ctx.clearRect(0, 0, width, height);
      if (shapePreviewStrokeRef.current) {
        drawStroke(ctx, shapePreviewStrokeRef.current, width, height, currentZoom, currentSurfaceMode);
      }
      if (draftStrokeRef.current) {
        drawStroke(ctx, draftStrokeRef.current, width, height, currentZoom, currentSurfaceMode);
      }
    } else {
      // Nothing active — clear once then stop clearing every frame
      ctx.clearRect(0, 0, width, height);
    }
    activeLayerRafRef.current = window.requestAnimationFrame(renderActiveLayer);
  }, []);

  const redrawCanvas = useCallback(() => {
    // Skip if RAF already scheduled — batches multiple sync calls into one frame
    if (redrawRafRef.current) return;
    redrawPendingRef.current = true;
    redrawRafRef.current = window.requestAnimationFrame(performRedraw);
  }, [performRedraw]);

  // Immediate redraw (no RAF) used for resize only
  const redrawCanvasImmediate = useCallback(() => {
    if (redrawRafRef.current) {
      window.cancelAnimationFrame(redrawRafRef.current);
      redrawRafRef.current = 0;
    }
    performRedraw();
  }, [performRedraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const activeCanvas = activeCanvasRef.current;
    const surface = surfaceRef.current;
    if (!canvas || !surface) {
      return undefined;
    }

    const resizeCanvas = () => {
      const width = Math.max(
        1,
        Math.round(surface.clientWidth || surface.offsetWidth || surface.getBoundingClientRect().width),
      );
      const height = Math.max(
        1,
        Math.round(
          surface.clientHeight || surface.offsetHeight || surface.getBoundingClientRect().height,
        ),
      );
      const ratio = getSafeWhiteboardCanvasPixelRatio(width, height);

      // Resize persisted layer
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Resize active layer
      if (activeCanvas) {
        activeCanvas.width = interactive ? Math.max(1, Math.round(width * ratio)) : 1;
        activeCanvas.height = interactive ? Math.max(1, Math.round(height * ratio)) : 1;
        activeCanvas.style.width = `${width}px`;
        activeCanvas.style.height = `${height}px`;
        const actx = activeCanvas.getContext("2d");
        if (actx) actx.setTransform(interactive ? ratio : 1, 0, 0, interactive ? ratio : 1, 0, 0);
      }

      canvasSizeRef.current = { width, height };
      setSurfaceSize({ width, height });
      redrawCanvasImmediate();
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(surface);

    // Guests only need the persisted layer; a second full-size canvas is expensive on iOS Safari.
    if (interactive) {
      activeLayerRafRef.current = window.requestAnimationFrame(renderActiveLayer);
    }

    return () => {
      resizeObserver.disconnect();
      if (redrawRafRef.current) {
        window.cancelAnimationFrame(redrawRafRef.current);
        redrawRafRef.current = 0;
      }
      if (activeLayerRafRef.current) {
        window.cancelAnimationFrame(activeLayerRafRef.current);
        activeLayerRafRef.current = 0;
      }
    };
  }, [interactive, redrawCanvasImmediate, renderActiveLayer]);

  // Trigger redraw when strokes/zoom/mode change — RAF-batched so rapid updates don't pile up
  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas, strokes, zoomScale, surfaceMode, shapePreviewStroke]);

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
    }, 40);
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
    // Use cached rect during an active drag to avoid getBoundingClientRect layout thrashing
    // (causes jitter at high zoom levels). Cache is refreshed on every pointerdown.
    const rect = surfaceRectCacheRef.current ?? surfaceRef.current?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) {
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

      const activeCanvas = activeCanvasRef.current;
      if (activeCanvas && event?.pointerId) {
        try {
          activeCanvas.releasePointerCapture(event.pointerId);
        } catch {}
      }

      // Release the cached surface rect so it's re-measured on next pointerdown
      surfaceRectCacheRef.current = null;
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

      // Snapshot the surface rect here so pointermove can reuse it without triggering
      // layout recalculation on every frame (main cause of jitter at high zoom).
      surfaceRectCacheRef.current = surfaceRef.current?.getBoundingClientRect() ?? null;

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

        activeCanvasRef.current?.setPointerCapture?.(event.pointerId);
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
        activeCanvasRef.current?.setPointerCapture?.(event.pointerId);
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

      activeCanvasRef.current?.setPointerCapture?.(event.pointerId);
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

  const snapCandidates = useMemo(() => {
    const sourceStrokes = Array.isArray(strokes) ? strokes : [];
    if (!sourceStrokes.length || surfaceSize.width <= 0 || surfaceSize.height <= 0) {
      return [];
    }

    const measureContext = getMeasureContext();
    return sourceStrokes
      .filter(
        (stroke) =>
          stroke?.id &&
          stroke.id !== selectedShapeId &&
          (isShapeTool(stroke.tool) || stroke.tool === "text"),
      )
      .map((stroke) => {
        const bounds = getStrokeSelectionBounds(
          stroke,
          surfaceSize.width,
          surfaceSize.height,
          zoomScale,
          measureContext,
          surfaceMode,
        );
        const metrics = getGuideMetricsFromBounds(bounds);
        if (!bounds || !metrics) {
          return null;
        }

        return {
          id: stroke.id,
          metrics,
          snapPoints: getTransformSnapPoints(bounds),
        };
      })
      .filter(Boolean);
  }, [
    getMeasureContext,
    selectedShapeId,
    strokes,
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

      let extraGuideLines = [];
      if (transformState.mode === "move") {
        const snapResult = resolveMoveSnap(nextTransform, snapCandidates);
        nextTransform = snapResult.transform;
        const balancedSpacingResult = resolveBalancedSpacingSnap(nextTransform, snapCandidates);
        nextTransform = balancedSpacingResult.transform;
        extraGuideLines = balancedSpacingResult.guideLines.length
          ? [...snapResult.guideLines, ...balancedSpacingResult.guideLines]
          : [...snapResult.guideLines, ...findNearestSpacingGuides(nextTransform, snapCandidates)];
      } else if (transformState.mode === "resize") {
        const resizeSnapResult = resolveResizeSnap(nextTransform, transformState, snapCandidates);
        nextTransform = resizeSnapResult.transform;
        extraGuideLines = resizeSnapResult.guideLines;
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
      setShapeTransformGuides(
        buildTransformGuideState(nextTransform, transformState.mode, extraGuideLines),
      );
    };

    const handleShapeTransformEnd = (event) => {
      const transformState = shapeTransformStateRef.current;
      if (!transformState || transformState.pointerId !== event.pointerId) {
        return;
      }

      shapeTransformStateRef.current = null;
      const nextStroke = transformState.lastStroke;
      setShapePreviewStroke(null);
      setShapeTransformGuides(null);
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
  }, [onStrokeUpdate, pageNumber, snapCandidates, tabId]);

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
      setShapeTransformGuides(buildTransformGuideState(selectedStrokeBounds, mode));

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
      {/* Layer 1: persisted strokes */}
      <StrokeCanvasEl ref={canvasRef} />
      {/* Layer 2: active draft + shape preview + pointer events */}
      <ActiveCanvasEl
        ref={activeCanvasRef}
        $interactive={interactive}
        $tool={tool}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrawing}
        onPointerCancel={stopDrawing}
      />
      {shapeTransformGuides ? (
        <TransformGuideLayer>
          {shapeTransformGuides.lines?.map((line, index) =>
            line?.orientation === "vertical" ? (
              <React.Fragment key={`vertical-${index}`}>
                <TransformGuideLine
                  style={{
                    left: `${line.position}px`,
                    top: `${line.start || 0}px`,
                    width: "1px",
                    height: `${line.size || 0}px`,
                    transform: "translateX(-0.5px)",
                    background:
                      line.kind === "spacing"
                        ? "rgba(245, 158, 11, 0.62)"
                        : line.kind === "snap"
                          ? "rgba(16, 185, 129, 0.58)"
                          : "rgba(107, 108, 255, 0.48)",
                  }}
                />
                {line.label ? (
                  <TransformGuideHint
                    style={{
                      left: `${line.position}px`,
                      top: `${(line.start || 0) + (line.size || 0) / 2}px`,
                    }}
                  >
                    {line.label}
                  </TransformGuideHint>
                ) : null}
              </React.Fragment>
            ) : (
              <React.Fragment key={`horizontal-${index}`}>
                <TransformGuideLine
                  style={{
                    left: `${line.start || 0}px`,
                    top: `${line.position}px`,
                    width: `${line.size || 0}px`,
                    height: "1px",
                    transform: "translateY(-0.5px)",
                    background:
                      line.kind === "spacing"
                        ? "rgba(245, 158, 11, 0.62)"
                        : line.kind === "snap"
                          ? "rgba(16, 185, 129, 0.58)"
                          : "rgba(107, 108, 255, 0.48)",
                  }}
                />
                {line.label ? (
                  <TransformGuideHint
                    style={{
                      left: `${(line.start || 0) + (line.size || 0) / 2}px`,
                      top: `${line.position}px`,
                    }}
                  >
                    {line.label}
                  </TransformGuideHint>
                ) : null}
              </React.Fragment>
            ),
          )}
          <TransformGuideBadge
            style={{
              left: `${shapeTransformGuides.labelX}px`,
              top: `${shapeTransformGuides.labelY}px`,
            }}
          >
            {shapeTransformGuides.label}
          </TransformGuideBadge>
        </TransformGuideLayer>
      ) : null}
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
  onCursorMove,
  onCursorLeave,
  onRecordSurfaceChange,
  onToggleRecording,
  isRecording = false,
  recordingElapsedMs = 0,
  recordingReady = false,
  showToolbar = false,
  remoteCursor = null,
  participantCount = 1,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const pdfViewportRef = useRef(null);
  const boardViewportRef = useRef(null);
  const boardFrameRef = useRef(null);
  const workspaceBodyRef = useRef(null);
  const scrollSyncRef = useRef({ lock: false, timeoutId: null, lastTabId: "" });
  const boardScrollSyncRef = useRef({ lock: false, timeoutId: null });
  const pdfViewportSyncTimeoutRef = useRef(0);
  const boardViewportSyncTimeoutRef = useRef(0);
  const boardGuestGestureRef = useRef({ active: false, timeoutId: 0 });
  const pdfDocumentRef = useRef(null);
  const pdfPickerDocumentRef = useRef(null);
  const pdfPickerDocumentKeyRef = useRef("");
  const pdfObserverRef = useRef(null);
  const pdfPageCountCacheRef = useRef({});
  const pdfPageBitmapCacheRef = useRef(new Map());
  const pdfPinchScrollRef = useRef({ left: 0, top: 0 });
  const pdfZoomAnchorRef = useRef(null);
  const pdfUserGestureRef = useRef(false);
  const livePdfZoomRef = useRef(1);
  const liveBoardZoomRef = useRef(1);
  const boardZoomAnimationRafRef = useRef(0);
  const boardZoomAnimationTargetRef = useRef(null);
  const boardZoomAnimationAnchorRef = useRef(null);
  const boardZoomCommitTimeoutRef = useRef(0);
  const boardWheelAnchorRef = useRef(null);
  const boardWheelZoomTargetRef = useRef(null);
  const pendingInteractivePdfZoomRef = useRef(null);
  const pendingInteractiveBoardZoomRef = useRef(null);
  const lastPdfTabIdRef = useRef(null);
  const lastBoardTabIdRef = useRef(null);
  const boardInitialViewportSeededRef = useRef(false);
  const pinchStateRef = useRef({
    active: false,
    distance: 0,
    zoom: 1,
    anchorX: 0,
    anchorY: 0,
    contentX: 0,
    contentY: 0,
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
  const [cursorOverlayBounds, setCursorOverlayBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [workspaceViewportSize, setWorkspaceViewportSize] = useState({
    width: 0,
    height: 0,
  });
  const [currentPdfPage, setCurrentPdfPage] = useState(1);
  const [guestPdfOverride, setGuestPdfOverride] = useState(false);
  const [guestPdfZoom, setGuestPdfZoom] = useState(1);
  const [guestBoardOverride, setGuestBoardOverride] = useState(false);
  const [guestBoardZoom, setGuestBoardZoom] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(null);
  const [isPdfLibraryOpen, setIsPdfLibraryOpen] = useState(false);
  const [visiblePdfPages, setVisiblePdfPages] = useState([]);
  const [pdfPageMetrics, setPdfPageMetrics] = useState({});
  const [pdfPageImages, setPdfPageImages] = useState({});
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
  const cursorBroadcastRafRef = useRef(0);
  const cursorBroadcastPointRef = useRef(null);
  const cursorBroadcastLastTimeRef = useRef(0);
  const cursorBroadcastLastEmitRef = useRef({ x: -1, y: -1 });
  // Adaptive throttle: fewer updates when many participants (saves socket bandwidth)
  const CURSOR_BROADCAST_INTERVAL_MS =
    participantCount >= 50 ? 250 :
    participantCount >= 30 ? 150 :
    participantCount >= 10 ? 100 : 80;
  // Dead-zone: skip emit if cursor barely moved (saves ~40% of cursor events)
  const CURSOR_DEAD_ZONE_SQ = 0.0008 * 0.0008;

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
  const hasSyncedBoardScrollLeftRatio = Number.isFinite(Number(boardTab?.scrollLeftRatio));
  const hasSyncedBoardScrollTopRatio = Number.isFinite(Number(boardTab?.scrollTopRatio));
  const syncedBoardScrollLeftRatio = clampViewportRatio(boardTab?.scrollLeftRatio);
  const syncedBoardScrollTopRatio = clampViewportRatio(boardTab?.scrollTopRatio);
  const syncedPdfViewportBaseHeight =
    activeTab?.type === "pdf" && Number.isFinite(Number(activeTab.viewportBaseHeight))
      ? Math.max(
          WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
          Math.round(Number(activeTab.viewportBaseHeight)),
        )
      : Math.max(
          WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
          pdfViewportHeight || WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
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
  const getCursorSurfaceNode = useCallback(() => {
    if (activeTab?.type === "pdf") {
      return pdfViewportRef.current;
    }

    return boardViewportRef.current;
  }, [activeTab?.type]);

  const resolveCursorSurfaceBounds = useCallback(() => {
    const workspaceNode = workspaceBodyRef.current;
    if (!workspaceNode) {
      return null;
    }

    const workspaceRect = workspaceNode.getBoundingClientRect();
    if (workspaceRect.width <= 0 || workspaceRect.height <= 0) {
      return null;
    }

    const surfaceNode = getCursorSurfaceNode();
    const surfaceRect = surfaceNode?.getBoundingClientRect?.();
    if (!surfaceRect || surfaceRect.width <= 0 || surfaceRect.height <= 0) {
      return {
        left: 0,
        top: 0,
        width: workspaceRect.width,
        height: workspaceRect.height,
      };
    }

    return {
      left: Math.max(0, surfaceRect.left - workspaceRect.left),
      top: Math.max(0, surfaceRect.top - workspaceRect.top),
      width: Math.min(workspaceRect.width, surfaceRect.width),
      height: Math.min(workspaceRect.height, surfaceRect.height),
    };
  }, [getCursorSurfaceNode]);

  useEffect(() => {
    const workspaceNode = workspaceBodyRef.current;
    const surfaceNode = getCursorSurfaceNode();
    if (!workspaceNode) {
      return undefined;
    }

    const updateCursorOverlayBounds = () => {
      const nextBounds = resolveCursorSurfaceBounds();
      if (!nextBounds) {
        return;
      }

      setCursorOverlayBounds((prev) =>
        Math.abs(prev.left - nextBounds.left) <= 0.5 &&
        Math.abs(prev.top - nextBounds.top) <= 0.5 &&
        Math.abs(prev.width - nextBounds.width) <= 0.5 &&
        Math.abs(prev.height - nextBounds.height) <= 0.5
          ? prev
          : nextBounds,
      );
    };

    updateCursorOverlayBounds();

    const resizeObserver = new ResizeObserver(updateCursorOverlayBounds);
    resizeObserver.observe(workspaceNode);
    if (surfaceNode instanceof HTMLElement && surfaceNode !== workspaceNode) {
      resizeObserver.observe(surfaceNode);
    }

    window.addEventListener("resize", updateCursorOverlayBounds);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateCursorOverlayBounds);
    };
  }, [activeTab?.id, getCursorSurfaceNode, resolveCursorSurfaceBounds]);

  const activeBoardZoom = Math.min(
    WHITEBOARD_MAX_ZOOM,
    Math.max(
      WHITEBOARD_MIN_ZOOM,
      !interactive
        ? guestBoardOverride
          ? Number(guestBoardZoom) || syncedBoardZoom || 1
          : syncedBoardZoom || 1
        : Number(boardZoom) || syncedBoardZoom || 1,
    ),
  );
  const syncedPdfZoom =
    activeTab?.type === "pdf"
      ? Math.min(WHITEBOARD_MAX_ZOOM, Math.max(WHITEBOARD_MIN_ZOOM, Number(activeTab.zoom) || 1))
      : 1;
  const activeBoardBaseWidth = Math.max(
    WHITEBOARD_MIN_BOARD_BASE_WIDTH,
    syncedBoardBaseWidth,
  );
  const activeBoardBaseHeight = Math.max(
    WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
    syncedBoardBaseHeight,
  );
  const remoteBoardContainScale =
    !interactive &&
    activeTab?.type !== "pdf" &&
    workspaceViewportSize.width > 0 &&
    workspaceViewportSize.height > 0 &&
    activeBoardBaseWidth > 0 &&
    activeBoardBaseHeight > 0
      ? Math.max(
          0.05,
          Math.min(
            1,
            workspaceViewportSize.width / activeBoardBaseWidth,
            workspaceViewportSize.height / activeBoardBaseHeight,
          ),
        )
      : 1;
  const shouldContainRemoteBoardViewport =
    !interactive &&
    !guestBoardOverride &&
    activeTab?.type !== "pdf" &&
    workspaceViewportSize.width > 0 &&
    workspaceViewportSize.height > 0 &&
    activeBoardBaseWidth > 0 &&
    activeBoardBaseHeight > 0;
  const activePdfZoom =
    activeTab?.type === "pdf"
      ? interactive
        ? Math.min(
            WHITEBOARD_MAX_ZOOM,
            Math.max(
              WHITEBOARD_MIN_ZOOM,
              typeof pdfZoom === "number" ? pdfZoom : syncedPdfZoom || 1,
            ),
          )
        : guestPdfOverride
          ? Math.min(
              WHITEBOARD_MAX_ZOOM,
              Math.max(WHITEBOARD_MIN_ZOOM, Number(guestPdfZoom) || syncedPdfZoom || 1),
            )
          : syncedPdfZoom
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
  const getBoardRenderScale = useCallback(
    (logicalZoom) => Math.max(0.05, Number(logicalZoom) || 1),
    [],
  );
  const activeBoardRenderScale = getBoardRenderScale(activeBoardZoom);
  const activeBoardRenderScaleRef = useRef(activeBoardRenderScale);
  activeBoardRenderScaleRef.current = activeBoardRenderScale;
  const activeBoardWorldScale = activeBoardRenderScale * WHITEBOARD_BOARD_POINT_SPAN;
  const activeBoardFrameWidth = roundScenePixel(Math.max(
    1,
    activeBoardBaseWidth * activeBoardWorldScale,
  ));
  const activeBoardFrameHeight = roundScenePixel(Math.max(
    1,
    activeBoardBaseHeight * activeBoardWorldScale,
  ));
  const activeBoardSceneWidth = roundScenePixel(Math.max(
    1,
    activeBoardBaseWidth * activeBoardWorldScale,
  ));
  const activeBoardSceneHeight = roundScenePixel(Math.max(
    1,
    activeBoardBaseHeight * activeBoardWorldScale,
  ));
  const activeBoardSceneOffsetLeft = roundScenePixel(Math.max(
    0,
    (activeBoardFrameWidth - activeBoardSceneWidth) / 2,
  ));
  const activeBoardSceneOffsetTop = roundScenePixel(Math.max(
    0,
    (activeBoardFrameHeight - activeBoardSceneHeight) / 2,
  ));
  const shouldUseContainedMobilePdfViewport =
    interactive && isMobile && activeTab?.type === "pdf";
  const shouldMirrorRemotePdfViewportInsets =
    !interactive && activeTab?.type === "pdf";
  const activePdfViewportTopInset = shouldUseContainedMobilePdfViewport
    ? WHITEBOARD_VIEWPORT_TOP_SAFE_SPACE
    : interactive || isFullscreen || shouldMirrorRemotePdfViewportInsets
    ? WHITEBOARD_VIEWPORT_TOP_SAFE_SPACE
    : 0;
  const activePdfViewportBottomInset = shouldUseContainedMobilePdfViewport
    ? WHITEBOARD_VIEWPORT_BOTTOM_SAFE_SPACE
    : interactive || isFullscreen || shouldMirrorRemotePdfViewportInsets
    ? WHITEBOARD_VIEWPORT_BOTTOM_SAFE_SPACE
    : 0;
  const effectivePdfViewportHeight = Math.max(
    1,
    pdfViewportHeight - activePdfViewportTopInset - activePdfViewportBottomInset,
  );
  const syncedGuestPdfWidthFromHeight =
    !interactive &&
    activeTab?.type === "pdf" &&
    effectivePdfViewportHeight > 0 &&
    basePdfAspectRatio > 0 &&
    syncedViewportVisibleHeightRatio > 0
      ? Math.max(
          WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          Math.round(
            (effectivePdfViewportHeight / syncedViewportVisibleHeightRatio) *
              basePdfAspectRatio,
          ),
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
  const activePdfViewportBaseHeight = syncedPdfViewportBaseHeight;
  const activePdfViewportFrameWidth =
    activeTab?.type === "pdf" ? Math.max(1, activePdfViewportBaseWidth + 40) : 0;
  const shouldContainRemotePdfViewport =
    !interactive &&
    activeTab?.type === "pdf" &&
    workspaceViewportSize.width > 0 &&
    workspaceViewportSize.height > 0 &&
    activePdfViewportFrameWidth > 0 &&
    activePdfViewportBaseHeight > 0;
  const remotePdfContainScale =
    shouldContainRemotePdfViewport
      ? Math.max(
          0.05,
          Math.min(
            1,
            workspaceViewportSize.width / activePdfViewportFrameWidth,
            workspaceViewportSize.height / activePdfViewportBaseHeight,
          ),
        )
      : 1;
  const containedGuestPdfViewportWidth =
    shouldContainRemotePdfViewport
      ? Math.max(1, Math.round(activePdfViewportFrameWidth * remotePdfContainScale))
      : 0;
  const containedGuestPdfViewportHeight =
    shouldContainRemotePdfViewport
      ? Math.max(1, Math.round(activePdfViewportBaseHeight * remotePdfContainScale))
      : 0;
  const containedPdfWidthByHeight =
    activeTab?.type === "pdf" && effectivePdfViewportHeight > 0 && basePdfAspectRatio > 0
      ? Math.max(
          WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          Math.round(effectivePdfViewportHeight * basePdfAspectRatio),
        )
      : 0;
  const containedPdfBaseWidth = shouldUseContainedMobilePdfViewport
    ? Math.max(
        WHITEBOARD_MIN_PDF_RENDER_WIDTH,
        Math.round(
          interactive
            ? pdfRenderWidth || WHITEBOARD_MIN_PDF_RENDER_WIDTH
            : Math.min(
                containedPdfWidthByHeight || Number.POSITIVE_INFINITY,
                syncedGuestPdfWidth > 0
                  ? Math.min(syncedGuestPdfWidth, pdfRenderWidth || syncedGuestPdfWidth)
                  : pdfRenderWidth || WHITEBOARD_MIN_PDF_RENDER_WIDTH,
              ),
        ),
      )
    : 0;
  // Zoom is now applied via CSS transform on a scale-layer, so PDF raster width
  // stays independent of zoom level. This prevents expensive pdf.js re-rasterization
  // on every wheel tick and keeps the stroke overlay perfectly aligned with the PDF.
  // A debounced hi-res pass can still sharpen at zoom > 1 (see debounced effect below).
  const pdfRenderWidthBaseUnclamped = shouldUseContainedMobilePdfViewport
    ? containedPdfBaseWidth
    : shouldContainRemotePdfViewport && activePdfViewportBaseWidth > 0
      ? activePdfViewportBaseWidth
      : !interactive && activeTab?.type === "pdf" && activePdfViewportBaseWidth > 0
        ? pdfRenderWidth
        : activeTab?.type === "pdf" && pdfRenderWidth > 0
          ? pdfRenderWidth
          : pdfRenderWidth || WHITEBOARD_MIN_PDF_RENDER_WIDTH;
  const activePdfRenderWidth = Math.max(
    WHITEBOARD_MIN_PDF_RENDER_WIDTH,
    Math.round(pdfRenderWidthBaseUnclamped),
  );
  // Visual (rendered) width for the PdfPageFrame — this is what determines the
  // scrollable area and includes the zoom factor (always, not only mobile).
  const activePdfWidth = Math.max(
    WHITEBOARD_MIN_PDF_RENDER_WIDTH,
    Math.round(activePdfRenderWidth * activePdfZoom),
  );
  const activePdfRenderScale =
    activeTab?.type === "pdf"
      ? activePdfRenderWidth / activePdfViewportBaseWidth
      : 1;
  const shouldShowGuestPdfSyncButton =
    !interactive &&
    activeTab?.type === "pdf" &&
    (guestPdfOverride || Math.abs(activePdfZoom - syncedPdfZoom) > 0.001);
  const shouldShowGuestBoardSyncButton =
    !interactive &&
    activeTab?.type !== "pdf" &&
    (guestBoardOverride || Math.abs(activeBoardZoom - syncedBoardZoom) > 0.001);
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

  useEffect(() => {
    if (activeTab?.type !== "pdf") {
      setGuestPdfOverride(false);
      setGuestPdfZoom(1);
    } else if (!interactive && !guestPdfOverride) {
      setGuestPdfZoom(syncedPdfZoom);
    }

    if (activeTab?.type === "pdf") {
      setGuestBoardOverride(false);
      setGuestBoardZoom(1);
      return;
    }

    if (!interactive && !guestBoardOverride) {
      setGuestBoardZoom(syncedBoardZoom);
    }
  }, [
    activeTab?.id,
    activeTab?.type,
    guestBoardOverride,
    guestPdfOverride,
    interactive,
    syncedBoardZoom,
    syncedPdfZoom,
  ]);

  useEffect(() => {
    livePdfZoomRef.current = activePdfZoom;
  }, [activePdfZoom]);

  useEffect(() => {
    liveBoardZoomRef.current = activeBoardZoom;
  }, [activeBoardZoom]);

  useEffect(() => {
    return () => {
      if (boardZoomAnimationRafRef.current) {
        window.cancelAnimationFrame(boardZoomAnimationRafRef.current);
        boardZoomAnimationRafRef.current = 0;
      }
      boardZoomAnimationTargetRef.current = null;
      boardZoomAnimationAnchorRef.current = null;
      if (cursorBroadcastRafRef.current) {
        window.clearTimeout(cursorBroadcastRafRef.current);
        cursorBroadcastRafRef.current = 0;
      }
      if (pdfViewportSyncTimeoutRef.current) {
        window.clearTimeout(pdfViewportSyncTimeoutRef.current);
      }
      if (boardViewportSyncTimeoutRef.current) {
        window.clearTimeout(boardViewportSyncTimeoutRef.current);
      }
      if (boardZoomCommitTimeoutRef.current) {
        window.clearTimeout(boardZoomCommitTimeoutRef.current);
        boardZoomCommitTimeoutRef.current = 0;
      }
      if (boardGuestGestureRef.current.timeoutId) {
        window.clearTimeout(boardGuestGestureRef.current.timeoutId);
        boardGuestGestureRef.current.timeoutId = 0;
      }
    };
  }, []);

  const markBoardGuestGesture = useCallback(() => {
    if (interactive) {
      return;
    }

    boardGuestGestureRef.current.active = true;
    if (boardGuestGestureRef.current.timeoutId) {
      window.clearTimeout(boardGuestGestureRef.current.timeoutId);
    }
    boardGuestGestureRef.current.timeoutId = window.setTimeout(() => {
      boardGuestGestureRef.current.active = false;
      boardGuestGestureRef.current.timeoutId = 0;
    }, 320);
  }, [interactive]);

  useEffect(() => {
    const currentPdfTabId = activeTab?.type === "pdf" ? activeTab.id : null;
    if (lastPdfTabIdRef.current !== currentPdfTabId) {
      lastPdfTabIdRef.current = currentPdfTabId;
      pendingInteractivePdfZoomRef.current = null;
      if (pdfViewportSyncTimeoutRef.current) {
        window.clearTimeout(pdfViewportSyncTimeoutRef.current);
        pdfViewportSyncTimeoutRef.current = 0;
      }
      setPdfZoom(currentPdfTabId ? syncedPdfZoom : null);
      return;
    }

    if (activeTab?.type !== "pdf") {
      setPdfZoom(null);
      return;
    }

    if (!interactive) {
      pendingInteractivePdfZoomRef.current = null;
      setPdfZoom(syncedPdfZoom);
      return;
    }

    const pendingZoom = pendingInteractivePdfZoomRef.current;
    if (typeof pendingZoom === "number") {
      if (Math.abs(syncedPdfZoom - pendingZoom) <= 0.001) {
        pendingInteractivePdfZoomRef.current = null;
      } else {
        return;
      }
    }

    setPdfZoom((current) =>
      typeof current === "number" && Math.abs(current - syncedPdfZoom) <= 0.001
        ? current
        : syncedPdfZoom,
    );
  }, [activeTab?.id, activeTab?.type, interactive, syncedPdfZoom]);

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
      viewportBaseHeight,
    }) => {
      if (!activeTab || activeTab.type !== "pdf") {
        return;
      }

      const viewport = pdfViewportRef.current;
      const topInset = activePdfViewportTopInset;
      const bottomInset = activePdfViewportBottomInset;
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
        viewportBaseHeight:
          typeof viewportBaseHeight === "number"
            ? Math.max(
                WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
                Math.round(viewportBaseHeight),
              )
            : Math.max(
                WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
                pdfViewportHeight || WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
              ),
        zoom:
          typeof zoom === "number"
            ? Math.min(WHITEBOARD_MAX_ZOOM, Math.max(WHITEBOARD_MIN_ZOOM, zoom))
            : undefined,
      });
    },
    [
      activeTab,
      activePdfViewportBottomInset,
      activePdfViewportTopInset,
      interactive,
      onPdfViewportChange,
      pdfMeta.pages,
      pdfRenderWidth,
      pdfViewportHeight,
    ],
  );

  const schedulePdfViewportSync = useCallback(
    (payload) => {
      if (!interactive) {
        emitPdfViewport(payload);
        return;
      }

      if (pdfViewportSyncTimeoutRef.current) {
        window.clearTimeout(pdfViewportSyncTimeoutRef.current);
      }

      pdfViewportSyncTimeoutRef.current = window.setTimeout(() => {
        pdfViewportSyncTimeoutRef.current = 0;
        emitPdfViewport(payload);
      }, 32);
    },
    [emitPdfViewport, interactive],
  );

  const scheduleBoardViewportSync = useCallback(
    (payload) => {
      if (!interactive) {
        onBoardZoomChange?.(payload);
        return;
      }

      if (boardViewportSyncTimeoutRef.current) {
        window.clearTimeout(boardViewportSyncTimeoutRef.current);
      }

      boardViewportSyncTimeoutRef.current = window.setTimeout(() => {
        boardViewportSyncTimeoutRef.current = 0;
        onBoardZoomChange?.(payload);
      }, 32);
    },
    [interactive, onBoardZoomChange],
  );

  const syncCurrentBoardViewport = useCallback(
    (zoomValue = liveBoardZoomRef.current) => {
      const viewport = boardViewportRef.current;
      if (!viewport || activeTab?.type === "pdf") {
        return;
      }

      const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
      scheduleBoardViewportSync({
        tabId: WHITEBOARD_BOARD_TAB_ID,
        zoom: Math.min(
          WHITEBOARD_MAX_ZOOM,
          Math.max(WHITEBOARD_MIN_ZOOM, Number(zoomValue) || liveBoardZoomRef.current || 1),
        ),
        viewportBaseWidth: Math.max(
          WHITEBOARD_MIN_BOARD_BASE_WIDTH,
          Math.round(boardViewportSize.width || viewport.clientWidth || 0) ||
            WHITEBOARD_MIN_BOARD_BASE_WIDTH,
        ),
        viewportBaseHeight: Math.max(
          WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
          Math.round(boardViewportSize.height || viewport.clientHeight || 0) ||
            WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
        ),
        scrollLeftRatio: maxScrollLeft > 0 ? clampViewportRatio(viewport.scrollLeft / maxScrollLeft) : 0,
        scrollTopRatio: maxScrollTop > 0 ? clampViewportRatio(viewport.scrollTop / maxScrollTop) : 0,
      });
    },
    [activeTab?.type, boardViewportSize.height, boardViewportSize.width, scheduleBoardViewportSync],
  );

  const scheduleBoardZoomCommit = useCallback(
    (delay = WHITEBOARD_ZOOM_COMMIT_DELAY_MS) => {
      if (!interactive || activeTab?.type === "pdf") {
        return;
      }

      if (boardZoomCommitTimeoutRef.current) {
        window.clearTimeout(boardZoomCommitTimeoutRef.current);
      }

      boardZoomCommitTimeoutRef.current = window.setTimeout(() => {
        boardZoomCommitTimeoutRef.current = 0;
        boardWheelAnchorRef.current = null;
        boardWheelZoomTargetRef.current = null;
        syncCurrentBoardViewport(liveBoardZoomRef.current);
      }, delay);
    },
    [activeTab?.type, interactive, syncCurrentBoardViewport],
  );

  useEffect(() => {
    return () => {
      pdfPageBitmapCacheRef.current.clear();
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
    setPdfPageImages({});
  }, [activeTab?.id, activeTabSelectedPagesKey, initialVisiblePdfPages]);

  const handleTileClick = useCallback(() => {
    onSelect?.();
  }, [onSelect]);

  const emitCursorPosition = useCallback(
    (x, y) => {
      if (!interactive || !isActive) {
        return;
      }

      const clampedX = Math.min(1, Math.max(0, Number(x) || 0));
      const clampedY = Math.min(1, Math.max(0, Number(y) || 0));

      // Dead-zone: skip if position hasn't moved enough (normalized coords)
      const last = cursorBroadcastLastEmitRef.current;
      const dx = clampedX - last.x;
      const dy = clampedY - last.y;
      if (dx * dx + dy * dy < CURSOR_DEAD_ZONE_SQ) {
        return;
      }
      cursorBroadcastLastEmitRef.current = { x: clampedX, y: clampedY };

      onCursorMove?.({
        x: clampedX,
        y: clampedY,
      });
    },
    [interactive, isActive, onCursorMove, CURSOR_DEAD_ZONE_SQ],
  );

  const handleWorkspacePointerMove = useCallback(
    (event) => {
      if (!interactive || !isActive) {
        return;
      }

      const workspaceNode = workspaceBodyRef.current;
      if (!workspaceNode) {
        return;
      }

      const workspaceRect = workspaceNode.getBoundingClientRect();
      const surfaceBounds = resolveCursorSurfaceBounds();
      if (!surfaceBounds || surfaceBounds.width <= 0 || surfaceBounds.height <= 0) {
        return;
      }

      const x =
        (event.clientX - workspaceRect.left - surfaceBounds.left) /
        surfaceBounds.width;
      const y =
        (event.clientY - workspaceRect.top - surfaceBounds.top) /
        surfaceBounds.height;

      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return;
      }

      if (x < 0 || x > 1 || y < 0 || y > 1) {
        return;
      }

      cursorBroadcastPointRef.current = {
        x,
        y,
      };

      // Throttle to CURSOR_BROADCAST_INTERVAL_MS — RAF alone fires at 60fps which floods socket
      if (cursorBroadcastRafRef.current) {
        return;
      }

      const now = performance.now();
      const elapsed = now - cursorBroadcastLastTimeRef.current;
      if (elapsed < CURSOR_BROADCAST_INTERVAL_MS) {
        // Schedule for when the interval expires
        const remaining = CURSOR_BROADCAST_INTERVAL_MS - elapsed;
        cursorBroadcastRafRef.current = window.setTimeout(() => {
          cursorBroadcastRafRef.current = 0;
          const nextPoint = cursorBroadcastPointRef.current;
          if (!nextPoint) return;
          cursorBroadcastLastTimeRef.current = performance.now();
          emitCursorPosition(nextPoint.x, nextPoint.y);
        }, remaining);
        return;
      }

      cursorBroadcastLastTimeRef.current = now;
      emitCursorPosition(cursorBroadcastPointRef.current.x, cursorBroadcastPointRef.current.y);
    },
    [emitCursorPosition, interactive, isActive, resolveCursorSurfaceBounds],
  );

  const handleWorkspacePointerLeave = useCallback(() => {
    cursorBroadcastPointRef.current = null;
    if (cursorBroadcastRafRef.current) {
      window.clearTimeout(cursorBroadcastRafRef.current);
      cursorBroadcastRafRef.current = 0;
    }

    if (interactive && isActive) {
      onCursorLeave?.();
    }
  }, [interactive, isActive, onCursorLeave]);

  useEffect(() => {
    if (interactive && isActive) {
      return undefined;
    }

    handleWorkspacePointerLeave();
    return undefined;
  }, [activeTab?.id, handleWorkspacePointerLeave, interactive, isActive]);

  const handleToggleFullscreen = useCallback(
    (event) => {
      event.stopPropagation();
      onToggleFullscreen?.();
    },
    [onToggleFullscreen],
  );

  // ─── Cursor interpolation — lerp toward target for smooth movement ───────────
  const cursorDisplayRef = useRef({ x: remoteCursor?.x ?? 0.5, y: remoteCursor?.y ?? 0.5 });
  const cursorTargetRef = useRef({ x: remoteCursor?.x ?? 0.5, y: remoteCursor?.y ?? 0.5 });
  const cursorLerpRafRef = useRef(0);
  const [smoothCursor, setSmoothCursor] = useState(remoteCursor);

  // Update target when prop changes
  useEffect(() => {
    if (remoteCursor?.peerId) {
      cursorTargetRef.current = { x: remoteCursor.x, y: remoteCursor.y };
    }
  }, [remoteCursor?.x, remoteCursor?.y, remoteCursor?.peerId]);

  // Lerp loop — runs when cursor is visible
  useEffect(() => {
    if (!remoteCursor?.peerId || interactive) return undefined;

    const LERP_FACTOR = 0.22; // 0.22 = smooth but responsive
    const STOP_THRESHOLD_SQ = 0.000001;

    const tick = () => {
      const display = cursorDisplayRef.current;
      const target = cursorTargetRef.current;
      const dx = target.x - display.x;
      const dy = target.y - display.y;
      if (dx * dx + dy * dy > STOP_THRESHOLD_SQ) {
        display.x += dx * LERP_FACTOR;
        display.y += dy * LERP_FACTOR;
        setSmoothCursor((prev) => prev ? { ...prev, x: display.x, y: display.y } : prev);
      }
      cursorLerpRafRef.current = window.requestAnimationFrame(tick);
    };
    cursorLerpRafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (cursorLerpRafRef.current) {
        window.cancelAnimationFrame(cursorLerpRafRef.current);
        cursorLerpRafRef.current = 0;
      }
    };
  }, [remoteCursor?.peerId, interactive]);

  // Sync smoothCursor metadata (displayName, peerId) when remoteCursor identity changes
  useEffect(() => {
    setSmoothCursor(remoteCursor
      ? { ...remoteCursor, x: cursorDisplayRef.current.x, y: cursorDisplayRef.current.y }
      : null);
  }, [remoteCursor?.peerId, remoteCursor?.displayName]); // eslint-disable-line react-hooks/exhaustive-deps

  const remoteCursorLayerStyle = !interactive
    ? {
        left: `${cursorOverlayBounds.left}px`,
        top: `${cursorOverlayBounds.top}px`,
        width: `${Math.max(0, cursorOverlayBounds.width)}px`,
        height: `${Math.max(0, cursorOverlayBounds.height)}px`,
      }
    : undefined;

  useEffect(() => {
    const viewport = workspaceBodyRef.current;
    if (!viewport) {
      return undefined;
    }

    const updateWorkspaceViewportSize = () => {
      setWorkspaceViewportSize({
        width: Math.max(1, Math.floor(viewport.clientWidth)),
        height: Math.max(1, Math.floor(viewport.clientHeight)),
      });
    };

    updateWorkspaceViewportSize();
    const resizeObserver = new ResizeObserver(updateWorkspaceViewportSize);
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeTab?.id, isFullscreen]);

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
      setPdfViewportHeight(Math.max(1, Math.floor(viewport.clientHeight)));
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(viewport);
    return () => {
      resizeObserver.disconnect();
    };
  }, [activeTab?.id, isFullscreen]);

  useEffect(() => {
    const viewport = boardViewportRef.current;
    if (!viewport) {
      return undefined;
    }

    const handleGuestGestureStart = () => {
      markBoardGuestGesture();
    };

    const updateBoardViewportSize = () => {
      setBoardViewportSize({
        width: Math.max(1, Math.floor(viewport.clientWidth)),
        height: Math.max(1, Math.floor(viewport.clientHeight)),
      });
    };

    viewport.addEventListener("pointerdown", handleGuestGestureStart, { passive: true });
    viewport.addEventListener("touchstart", handleGuestGestureStart, { passive: true });
    viewport.addEventListener("wheel", handleGuestGestureStart, { passive: true });
    updateBoardViewportSize();
    const resizeObserver = new ResizeObserver(updateBoardViewportSize);
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
      viewport.removeEventListener("pointerdown", handleGuestGestureStart);
      viewport.removeEventListener("touchstart", handleGuestGestureStart);
      viewport.removeEventListener("wheel", handleGuestGestureStart);
    };
  }, [activeTab?.id, markBoardGuestGesture]);

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
      scrollLeftRatio: clampViewportRatio(
        (() => {
          const viewport = boardViewportRef.current;
          if (!viewport) {
            return boardTab?.scrollLeftRatio;
          }
          const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
          return maxScrollLeft > 0 ? viewport.scrollLeft / maxScrollLeft : 0;
        })(),
      ),
      scrollTopRatio: clampViewportRatio(
        (() => {
          const viewport = boardViewportRef.current;
          if (!viewport) {
            return boardTab?.scrollTopRatio;
          }
          const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
          return maxScrollTop > 0 ? viewport.scrollTop / maxScrollTop : 0;
        })(),
      ),
    });
  }, [
    activeBoardZoom,
    activeTab?.type,
    boardTab?.scrollLeftRatio,
    boardTab?.scrollTopRatio,
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
      const frameOffset = getBoardFrameOffset(viewport, frame);
      const frameOffsetLeft = frameOffset.left;
      const frameOffsetTop = frameOffset.top;

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

    pdfDocumentRef.current = null;
    pdfPageBitmapCacheRef.current.clear();
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
    setPdfPageImages({});

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

    const priorityPageNumber =
      Number(activeTab.viewportPageNumber) || Number(currentPdfPage) || 1;
    const visiblePageSet = new Set(
      [
        ...(visiblePdfPages.length > 0 ? visiblePdfPages : initialVisiblePdfPages),
        priorityPageNumber,
        priorityPageNumber - 1,
        priorityPageNumber + 1,
      ].filter((pageNumber) => Number.isFinite(pageNumber) && pageNumber > 0),
    );
    if (visiblePageSet.size === 0) {
      return undefined;
    }

    const renderPages = async () => {
      try {
        const pdfDocument = pdfDocumentRef.current;
        const pagesToRender = pdfMeta.pages
          .filter((pageMeta) => visiblePageSet.has(pageMeta.pageNumber))
          .sort(
            (left, right) =>
              Math.abs(left.pageNumber - priorityPageNumber) -
              Math.abs(right.pageNumber - priorityPageNumber),
          );

        for (const pageMeta of pagesToRender) {
          if (disposed) {
            break;
          }

          const canvas = document.getElementById(
            `pdf-page-${activeTab.id}-${pageMeta.pageNumber}`,
          );
          if (!(canvas instanceof HTMLCanvasElement)) {
            continue;
          }

          const renderSignature = `${WHITEBOARD_PDF_RENDER_VERSION}:${activeTab.fileUrl}:${pageMeta.pageNumber}:${Math.round(
            activePdfRenderWidth,
          )}`;
          const cachedBitmap = pdfPageBitmapCacheRef.current.get(renderSignature);
          if (cachedBitmap) {
            // Re-insert for LRU ordering
            pdfPageBitmapCacheRef.current.delete(renderSignature);
            pdfPageBitmapCacheRef.current.set(renderSignature, cachedBitmap);
            const context = canvas.getContext("2d");
            if (context) {
              // Only resize the canvas if dimensions actually changed — resizing
              // a canvas implicitly clears it (which causes the white-flash on
              // page turns). Reusing the pixel buffer means the previous frame
              // stays visible until drawImage completes in the same tick.
              if (
                canvas.width !== cachedBitmap.width ||
                canvas.height !== cachedBitmap.height
              ) {
                canvas.width = cachedBitmap.width;
                canvas.height = cachedBitmap.height;
              }
              canvas.style.width = `${cachedBitmap.viewportWidth}px`;
              canvas.style.height = `${cachedBitmap.viewportHeight}px`;
              context.setTransform(1, 0, 0, 1, 0, 0);
              context.drawImage(cachedBitmap.canvas, 0, 0);
              canvas.dataset.renderKey = renderSignature;
              delete canvas.dataset.pendingRenderKey;
              setPdfPageMetrics((prev) => {
                const current = prev[pageMeta.pageNumber];
                if (
                  current &&
                  Math.abs(current.width - cachedBitmap.viewportWidth) < 1 &&
                  Math.abs(current.height - cachedBitmap.viewportHeight) < 1
                ) {
                  return prev;
                }

                return {
                  ...prev,
                  [pageMeta.pageNumber]: {
                    width: cachedBitmap.viewportWidth,
                    height: cachedBitmap.viewportHeight,
                  },
                };
              });
            }
          }
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
          const scale = Math.max(0.01, activePdfRenderWidth / baseViewport.width);
          const viewport = page.getViewport({ scale, rotation });
          const isMobilePdfClient = isMobilePdfBrowser();
          const ratio = isMobilePdfClient
            ? Math.max(
                1,
                Math.min(
                  2,
                  window.devicePixelRatio || 1,
                  WHITEBOARD_MOBILE_PDF_MAX_RENDER_EDGE /
                    Math.max(1, viewport.width, viewport.height),
                ),
              )
            : Math.min(2, window.devicePixelRatio || 1);
          const renderScaleCap =
            shouldUseContainedMobilePdfViewport
              ? Math.min(
                  1,
                  WHITEBOARD_MOBILE_PDF_MAX_RENDER_EDGE /
                    Math.max(1, viewport.width, viewport.height),
                )
              : 1;
          const rasterViewport =
            renderScaleCap < 0.999
              ? page.getViewport({ scale: scale * renderScaleCap, rotation })
              : viewport;
          const context = canvas.getContext("2d");
          if (!context) {
            continue;
          }
          const needsStabilizationPass =
            rotation !== 0 && canvas.dataset.stableRenderKey !== renderSignature;

          if (shouldUseContainedMobilePdfViewport) {
            // Raster ratio is zoom-independent: zoom is applied via CSS transform
            // on the scale-layer, so we only need enough pixels for 1x display
            // (plus devicePixelRatio headroom for crispness).
            const mobileRasterRatio = Math.max(
              1,
              Math.min(
                2,
                window.devicePixelRatio || 1,
                WHITEBOARD_MOBILE_PDF_MAX_RENDER_EDGE /
                  Math.max(1, viewport.width, viewport.height),
              ),
            );
            const nextWidth = Math.max(1, Math.floor(Math.max(1, viewport.width) * mobileRasterRatio));
            const nextHeight = Math.max(1, Math.floor(Math.max(1, viewport.height) * mobileRasterRatio));
            if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
              canvas.width = nextWidth;
              canvas.height = nextHeight;
            }
            canvas.style.width = `${Math.max(1, viewport.width)}px`;
            canvas.style.height = `${Math.max(1, viewport.height)}px`;
            context.setTransform(mobileRasterRatio, 0, 0, mobileRasterRatio, 0, 0);

            const renderDirectly = async () => {
              // Don't clear before render: pdf.js draws opaque page background
              // over the whole canvas itself. Clearing creates a white flash.
              const renderTask = page.render({
                canvasContext: context,
                viewport,
              });
              await renderTask.promise;
            };

            await renderDirectly();
            if (disposed || canvas.dataset.pendingRenderKey !== renderSignature) {
              continue;
            }

            if (needsStabilizationPass) {
              await waitForAnimationFrame();
              if (disposed || canvas.dataset.pendingRenderKey !== renderSignature) {
                continue;
              }
              await renderDirectly();
              if (disposed || canvas.dataset.pendingRenderKey !== renderSignature) {
                continue;
              }
              canvas.dataset.stableRenderKey = renderSignature;
            }

            canvas.dataset.renderKey = renderSignature;
            delete canvas.dataset.pendingRenderKey;
            // Guests (remote) read directly from the canvas — no expensive
            // toDataURL per render. The canvas itself is kept in the DOM.
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
            continue;
          }

          const renderCanvas = document.createElement("canvas");
          const renderContext = renderCanvas.getContext("2d");
          if (!renderContext) {
            continue;
          }

          renderCanvas.width = Math.max(1, Math.floor(Math.max(1, rasterViewport.width) * ratio));
          renderCanvas.height = Math.max(1, Math.floor(Math.max(1, rasterViewport.height) * ratio));
          renderContext.setTransform(ratio, 0, 0, ratio, 0, 0);

          const renderIntoCanvas = async () => {
            // Offscreen canvas is freshly allocated (already transparent/black)
            // and pdf.js renders an opaque page background, so no clear needed.
            const renderTask = page.render({
              canvasContext: renderContext,
              viewport: rasterViewport,
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

          if (
            canvas.width !== renderCanvas.width ||
            canvas.height !== renderCanvas.height
          ) {
            canvas.width = renderCanvas.width;
            canvas.height = renderCanvas.height;
          }
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.drawImage(renderCanvas, 0, 0);
          const cacheCanvas = document.createElement("canvas");
          cacheCanvas.width = renderCanvas.width;
          cacheCanvas.height = renderCanvas.height;
          const cacheContext = cacheCanvas.getContext("2d");
          cacheContext?.drawImage(renderCanvas, 0, 0);
          pdfPageBitmapCacheRef.current.set(renderSignature, {
            canvas: cacheCanvas,
            width: cacheCanvas.width,
            height: cacheCanvas.height,
            viewportWidth: viewport.width,
            viewportHeight: viewport.height,
          });
          while (
            pdfPageBitmapCacheRef.current.size >
            WHITEBOARD_PDF_BUFFER_CACHE_MAX_ITEMS
          ) {
            const oldestKey = pdfPageBitmapCacheRef.current.keys().next().value;
            if (!oldestKey) break;
            pdfPageBitmapCacheRef.current.delete(oldestKey);
          }
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
    currentPdfPage,
    pdfMeta,
    pdfRenderWidth,
    activePdfRenderWidth,
    initialVisiblePdfPages,
    isMobile,
    shouldUseContainedMobilePdfViewport,
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
    if (!interactive || !activeTab || activeTab.type !== "pdf" || pdfRenderWidth <= 0) {
      return;
    }

    const nextViewportBaseWidth = Math.max(
      WHITEBOARD_MIN_PDF_RENDER_WIDTH,
      pdfRenderWidth || WHITEBOARD_MIN_PDF_RENDER_WIDTH,
    );
    const nextViewportBaseHeight = Math.max(
      WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
      pdfViewportHeight || WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
    );
    if (
      Math.abs(
        nextViewportBaseWidth -
          Math.max(
            WHITEBOARD_MIN_PDF_RENDER_WIDTH,
            Number(activeTab.viewportBaseWidth) || WHITEBOARD_MIN_PDF_RENDER_WIDTH,
          ),
      ) < 2 &&
      Math.abs(
        nextViewportBaseHeight -
          Math.max(
            WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
            Number(activeTab.viewportBaseHeight) || WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
          ),
      ) < 2
    ) {
      return;
    }

    emitPdfViewport({
      viewportBaseWidth: nextViewportBaseWidth,
      viewportBaseHeight: nextViewportBaseHeight,
    });
  }, [activeTab, emitPdfViewport, interactive, pdfRenderWidth, pdfViewportHeight]);

  const handlePdfZoomChange = useCallback(
    (nextZoom) => {
      if (!activeTab || activeTab.type !== "pdf") {
        return;
      }

      const clampedZoom = Math.min(
        WHITEBOARD_MAX_ZOOM,
        Math.max(WHITEBOARD_MIN_ZOOM, nextZoom),
      );
      if (!interactive) {
        setGuestPdfOverride(true);
        setGuestPdfZoom(clampedZoom);
        return;
      }

      pendingInteractivePdfZoomRef.current = clampedZoom;
      setPdfZoom((current) =>
        typeof current === "number" && Math.abs(current - clampedZoom) <= 0.001
          ? current
          : clampedZoom,
      );
      schedulePdfViewportSync({
        zoom: clampedZoom,
      });
    },
    [activeTab, interactive, schedulePdfViewportSync],
  );

  const handleBoardZoomChange = useCallback(
    (nextZoom, anchor = null, options = {}) => {
      if (activeTab?.type === "pdf") {
        return;
      }

      const shouldSync = options.sync !== false;
      const clampedZoom = Math.min(
        WHITEBOARD_MAX_ZOOM,
        Math.max(WHITEBOARD_MIN_ZOOM, nextZoom),
      );
      if (!interactive) {
        setGuestBoardOverride(true);
        setGuestBoardZoom(clampedZoom);
        return;
      }
      const nextRenderZoom = getBoardRenderScale(clampedZoom);
      const nextWorldScale = nextRenderZoom * WHITEBOARD_BOARD_POINT_SPAN;
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
        const frameOffset = getBoardFrameOffset(viewport, frame);
        const frameOffsetLeft = frameOffset.left;
        const frameOffsetTop = frameOffset.top;
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

        const nextFrameWidth = roundScenePixel(Math.max(
          1,
          activeBoardBaseWidth * nextWorldScale,
        ));
        const nextFrameHeight = roundScenePixel(Math.max(
          1,
          activeBoardBaseHeight * nextWorldScale,
        ));
        const nextFrameOffsetLeft = roundScenePixel(
          nextFrameWidth < viewport.clientWidth
            ? (viewport.clientWidth - nextFrameWidth) / 2
            : 0,
        );
        const nextFrameOffsetTop = roundScenePixel(
          nextFrameHeight < viewport.clientHeight
            ? (viewport.clientHeight - nextFrameHeight) / 2
            : 0,
        );
        const nextMaxScrollLeft = Math.max(0, nextFrameWidth - viewport.clientWidth);
        const nextMaxScrollTop = Math.max(0, nextFrameHeight - viewport.clientHeight);
        const nextScrollLeft = Math.min(
          nextMaxScrollLeft,
          Math.max(0, nextFrameOffsetLeft + boardX * nextRenderZoom - anchorX),
        );
        const nextScrollTop = Math.min(
          nextMaxScrollTop,
          Math.max(0, nextFrameOffsetTop + boardY * nextRenderZoom - anchorY),
        );

        pendingInteractiveBoardZoomRef.current = clampedZoom;
        liveBoardZoomRef.current = clampedZoom;
        const applyBoardZoom = () =>
          setBoardZoom((current) =>
            Math.abs((Number(current) || clampedZoom) - clampedZoom) <= 0.001
              ? current
              : clampedZoom,
          );
        applyBoardZoom();
        if (shouldSync) {
          scheduleBoardViewportSync({
            tabId: WHITEBOARD_BOARD_TAB_ID,
            zoom: clampedZoom,
            viewportBaseWidth: Math.max(
              WHITEBOARD_MIN_BOARD_BASE_WIDTH,
              Math.round(boardViewportSize.width || viewport.clientWidth || 0) ||
                WHITEBOARD_MIN_BOARD_BASE_WIDTH,
            ),
            viewportBaseHeight: Math.max(
              WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
              Math.round(boardViewportSize.height || viewport.clientHeight || 0) ||
                WHITEBOARD_MIN_BOARD_BASE_HEIGHT,
            ),
            scrollLeftRatio:
              nextMaxScrollLeft > 0 ? clampViewportRatio(nextScrollLeft / nextMaxScrollLeft) : 0,
            scrollTopRatio:
              nextMaxScrollTop > 0 ? clampViewportRatio(nextScrollTop / nextMaxScrollTop) : 0,
          });
        }
        return;
      }

      pendingInteractiveBoardZoomRef.current = clampedZoom;
      liveBoardZoomRef.current = clampedZoom;
      const applyBoardZoom = () =>
        setBoardZoom((current) =>
          Math.abs((Number(current) || clampedZoom) - clampedZoom) <= 0.001
            ? current
            : clampedZoom,
        );
      applyBoardZoom();
      if (shouldSync) {
        scheduleBoardViewportSync({
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
          scrollLeftRatio: clampViewportRatio(
            (() => {
              const maxScrollLeft = viewport
                ? Math.max(0, viewport.scrollWidth - viewport.clientWidth)
                : 0;
              return maxScrollLeft > 0 ? viewport.scrollLeft / maxScrollLeft : 0;
            })(),
          ),
          scrollTopRatio: clampViewportRatio(
            (() => {
              const maxScrollTop = viewport
                ? Math.max(0, viewport.scrollHeight - viewport.clientHeight)
                : 0;
              return maxScrollTop > 0 ? viewport.scrollTop / maxScrollTop : 0;
            })(),
          ),
        });
      }
    },
    [
      activeBoardRenderScale,
      activeTab?.type,
      boardViewportSize.height,
      boardViewportSize.width,
      getBoardRenderScale,
      getBoardViewportAnchor,
      interactive,
      scheduleBoardViewportSync,
    ],
  );

  const handleBoardScroll = useCallback(() => {
    const viewport = boardViewportRef.current;
    if (!viewport || activeTab?.type === "pdf" || boardScrollSyncRef.current.lock) {
      return;
    }

    if (!interactive && !guestBoardOverride && boardGuestGestureRef.current.active) {
      setGuestBoardOverride(true);
      setGuestBoardZoom(syncedBoardZoom);
    }

    if (boardScrollSyncRef.current.timeoutId) {
      window.clearTimeout(boardScrollSyncRef.current.timeoutId);
    }

    if (!interactive) {
      return;
    }

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    const scrollLeftRatio = maxScrollLeft > 0 ? viewport.scrollLeft / maxScrollLeft : 0;
    const scrollTopRatio = maxScrollTop > 0 ? viewport.scrollTop / maxScrollTop : 0;

    boardScrollSyncRef.current.timeoutId = window.setTimeout(() => {
      onBoardZoomChange?.({
        tabId: WHITEBOARD_BOARD_TAB_ID,
        scrollLeftRatio,
        scrollTopRatio,
      });
    }, 72);
  }, [activeTab?.type, guestBoardOverride, interactive, onBoardZoomChange, syncedBoardZoom]);

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

  const animateBoardZoomChange = useCallback(
    (nextZoom, anchor = null) => {
      if (activeTab?.type === "pdf") {
        handlePdfZoomChange(nextZoom);
        return;
      }

      if (!interactive) {
        handleBoardZoomChange(nextZoom, anchor, { sync: true });
        return;
      }

      const clampedTarget = Math.min(
        WHITEBOARD_MAX_ZOOM,
        Math.max(WHITEBOARD_MIN_ZOOM, Number(nextZoom) || liveBoardZoomRef.current || 1),
      );
      if (boardZoomAnimationRafRef.current) {
        window.cancelAnimationFrame(boardZoomAnimationRafRef.current);
        boardZoomAnimationRafRef.current = 0;
      }
      boardZoomAnimationTargetRef.current = clampedTarget;
      boardZoomAnimationAnchorRef.current = anchor;
      boardZoomAnimationRafRef.current = window.requestAnimationFrame(() => {
        boardZoomAnimationRafRef.current = 0;
        const targetZoom = boardZoomAnimationTargetRef.current;
        const targetAnchor = boardZoomAnimationAnchorRef.current;
        boardZoomAnimationTargetRef.current = null;
        boardZoomAnimationAnchorRef.current = null;
        if (!Number.isFinite(targetZoom)) {
          return;
        }
        handleBoardZoomChange(targetZoom, targetAnchor, { sync: false });
        scheduleBoardZoomCommit();
      });
    },
    [
      activeTab?.type,
      handleBoardZoomChange,
      handlePdfZoomChange,
      interactive,
      scheduleBoardZoomCommit,
    ],
  );

  const handleWorkspaceZoomStep = useCallback(
    (delta) => {
      const currentZoom =
        activeTab?.type === "pdf" ? livePdfZoomRef.current : liveBoardZoomRef.current;
      if (activeTab?.type === "pdf") {
        handleWorkspaceZoomChange(currentZoom + delta);
        return;
      }
      const nextZoom =
        currentZoom * (delta > 0 ? WHITEBOARD_BUTTON_ZOOM_IN_FACTOR : WHITEBOARD_BUTTON_ZOOM_OUT_FACTOR);
      animateBoardZoomChange(nextZoom);
    },
    [activeTab?.type, animateBoardZoomChange, handleWorkspaceZoomChange],
  );

  useEffect(() => {
    const currentBoardTabId = activeTab?.type === "pdf" ? null : activeTab?.id || WHITEBOARD_BOARD_TAB_ID;
    if (lastBoardTabIdRef.current !== currentBoardTabId) {
      lastBoardTabIdRef.current = currentBoardTabId;
      if (boardZoomAnimationRafRef.current) {
        window.cancelAnimationFrame(boardZoomAnimationRafRef.current);
        boardZoomAnimationRafRef.current = 0;
      }
      boardZoomAnimationTargetRef.current = null;
      boardZoomAnimationAnchorRef.current = null;
      boardWheelAnchorRef.current = null;
      boardInitialViewportSeededRef.current = false;
      pendingInteractiveBoardZoomRef.current = null;
      if (boardViewportSyncTimeoutRef.current) {
        window.clearTimeout(boardViewportSyncTimeoutRef.current);
        boardViewportSyncTimeoutRef.current = 0;
      }
      if (boardZoomCommitTimeoutRef.current) {
        window.clearTimeout(boardZoomCommitTimeoutRef.current);
        boardZoomCommitTimeoutRef.current = 0;
      }
      boardWheelAnchorRef.current = null;
      boardWheelZoomTargetRef.current = null;
      if (currentBoardTabId) {
        setBoardZoom(syncedBoardZoom);
      }
      return;
    }

    if (activeTab?.type === "pdf") {
      return;
    }

    if (!interactive) {
      pendingInteractiveBoardZoomRef.current = null;
      setBoardZoom(syncedBoardZoom);
      return;
    }

    const pendingZoom = pendingInteractiveBoardZoomRef.current;
    if (typeof pendingZoom === "number") {
      if (Math.abs(syncedBoardZoom - pendingZoom) <= 0.001) {
        pendingInteractiveBoardZoomRef.current = null;
      } else {
        return;
      }
    }

    setBoardZoom((current) =>
      Math.abs((Number(current) || syncedBoardZoom) - syncedBoardZoom) <= 0.001
        ? current
        : syncedBoardZoom,
    );
  }, [activeTab?.id, activeTab?.type, interactive, syncedBoardZoom]);

  useLayoutEffect(() => {
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

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    const frameOffset = getBoardFrameOffset(viewport, boardFrameRef.current);
    const frameOffsetLeft = frameOffset.left;
    const frameOffsetTop = frameOffset.top;
    const nextLeft = Math.min(
      maxScrollLeft,
      Math.max(
        0,
        frameOffsetLeft +
          pendingAnchor.boardX * activeBoardRenderScale -
          pendingAnchor.anchorX,
      ),
    );
    const nextTop = Math.min(
      maxScrollTop,
      Math.max(
        0,
        frameOffsetTop +
          pendingAnchor.boardY * activeBoardRenderScale -
          pendingAnchor.anchorY,
      ),
    );

    boardScrollSyncRef.current.lock = true;
    viewport.scrollLeft = nextLeft;
    viewport.scrollTop = nextTop;
    boardZoomAnchorRef.current = null;
    const unlockId = window.setTimeout(() => {
      boardScrollSyncRef.current.lock = false;
    }, 80);

    return () => {
      window.clearTimeout(unlockId);
      boardScrollSyncRef.current.lock = false;
    };
  }, [activeBoardRenderScale, activeTab?.type]);

  useLayoutEffect(() => {
    if (
      activeTab?.type === "pdf" ||
      boardInitialViewportSeededRef.current ||
      hasSyncedBoardScrollLeftRatio ||
      hasSyncedBoardScrollTopRatio
    ) {
      return;
    }

    const viewport = boardViewportRef.current;
    if (!viewport) {
      return;
    }

    const boardRegionWidth = activeBoardBaseWidth * activeBoardRenderScale;
    const boardRegionHeight = activeBoardBaseHeight * activeBoardRenderScale;
    const boardRegionLeft = activeBoardBaseWidth * activeBoardRenderScale * (0 - WHITEBOARD_BOARD_POINT_MIN);
    const boardRegionTop = activeBoardBaseHeight * activeBoardRenderScale * (0 - WHITEBOARD_BOARD_POINT_MIN);
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    const targetLeft = Math.min(
      maxScrollLeft,
      Math.max(0, boardRegionLeft + boardRegionWidth / 2 - viewport.clientWidth / 2),
    );
    const targetTop = Math.min(
      maxScrollTop,
      Math.max(0, boardRegionTop + boardRegionHeight / 2 - viewport.clientHeight / 2),
    );

    viewport.scrollLeft = targetLeft;
    viewport.scrollTop = targetTop;
    boardInitialViewportSeededRef.current = true;
  }, [
    activeBoardBaseHeight,
    activeBoardBaseWidth,
    activeBoardRenderScale,
    activeTab?.id,
    activeTab?.type,
    hasSyncedBoardScrollLeftRatio,
    hasSyncedBoardScrollTopRatio,
  ]);

  useEffect(() => {
    if (interactive || guestBoardOverride || activeTab?.type === "pdf") {
      return undefined;
    }

    const viewport = boardViewportRef.current;
    if (!viewport) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
      const nextLeft = maxScrollLeft > 0 ? maxScrollLeft * syncedBoardScrollLeftRatio : 0;
      const nextTop = maxScrollTop > 0 ? maxScrollTop * syncedBoardScrollTopRatio : 0;

      if (
        Math.abs(viewport.scrollLeft - nextLeft) < 2 &&
        Math.abs(viewport.scrollTop - nextTop) < 2
      ) {
        return;
      }

      boardScrollSyncRef.current.lock = true;
      viewport.scrollLeft = nextLeft;
      viewport.scrollTop = nextTop;
      window.setTimeout(() => {
        boardScrollSyncRef.current.lock = false;
      }, 60);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [
    activeBoardBaseHeight,
    activeBoardBaseWidth,
    activeBoardRenderScale,
    activeTab?.id,
    activeTab?.type,
    guestBoardOverride,
    interactive,
    syncedBoardScrollLeftRatio,
    syncedBoardScrollTopRatio,
  ]);

  useEffect(() => {
    const viewport = pdfViewportRef.current;
    if (!viewport || !activeTab || activeTab.type !== "pdf") {
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
      const viewportRect = viewport.getBoundingClientRect();
      const anchorX = event.clientX - viewportRect.left;
      const anchorY = event.clientY - viewportRect.top;
      const liveZoom = livePdfZoomRef.current || 1;
      const safeZoom = Math.max(WHITEBOARD_MIN_ZOOM, liveZoom);
      pdfZoomAnchorRef.current = {
        anchorX,
        anchorY,
        contentX: (viewport.scrollLeft + anchorX) / safeZoom,
        contentY: (viewport.scrollTop + anchorY) / safeZoom,
      };
      const zoomFactor = Math.exp(-event.deltaY * WHITEBOARD_WHEEL_ZOOM_SENSITIVITY);
      scheduleZoom(liveZoom * zoomFactor);
    };

    const handleTouchStart = (event) => {
      if (event.touches.length < 2) {
        pdfUserGestureRef.current = event.touches.length === 1;
        pinchStateRef.current.active = false;
        return;
      }

      pdfUserGestureRef.current = true;
      const center = getTouchCenter(event.touches);
      const viewportRect = viewport.getBoundingClientRect();
      const anchorX = center.clientX - viewportRect.left;
      const anchorY = center.clientY - viewportRect.top;
      const liveZoom = livePdfZoomRef.current;
      pinchStateRef.current = {
        active: true,
        distance: getTouchDistance(event.touches),
        zoom: liveZoom,
        anchorX,
        anchorY,
        contentX: (viewport.scrollLeft + anchorX) / Math.max(WHITEBOARD_MIN_ZOOM, liveZoom),
        contentY: (viewport.scrollTop + anchorY) / Math.max(WHITEBOARD_MIN_ZOOM, liveZoom),
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
      const zoomRatio = amplifyZoomRatio(nextDistance / pinchStateRef.current.distance);
      const nextZoom = Math.min(
        WHITEBOARD_MAX_ZOOM,
        Math.max(WHITEBOARD_MIN_ZOOM, pinchStateRef.current.zoom * zoomRatio),
      );
      if (Math.abs(nextZoom - livePdfZoomRef.current) < 0.002) {
        return;
      }
      pdfZoomAnchorRef.current = {
        anchorX: pinchStateRef.current.anchorX,
        anchorY: pinchStateRef.current.anchorY,
        contentX: pinchStateRef.current.contentX,
        contentY: pinchStateRef.current.contentY,
      };
      scheduleZoom(nextZoom);
    };

    const handleTouchEnd = () => {
      pinchStateRef.current.active = false;
      window.setTimeout(() => {
        pdfUserGestureRef.current = false;
      }, 120);
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
  }, [activeTab?.id, activeTab?.type, handlePdfZoomChange]);

  useLayoutEffect(() => {
    const viewport = pdfViewportRef.current;
    const pendingAnchor = pdfZoomAnchorRef.current;
    if (!viewport || !activeTab || activeTab.type !== "pdf" || !pendingAnchor) {
      return undefined;
    }

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    viewport.scrollLeft = Math.min(
      maxScrollLeft,
      Math.max(0, pendingAnchor.contentX * activePdfZoom - pendingAnchor.anchorX),
    );
    viewport.scrollTop = Math.min(
      maxScrollTop,
      Math.max(0, pendingAnchor.contentY * activePdfZoom - pendingAnchor.anchorY),
    );
    pdfZoomAnchorRef.current = null;
  }, [activePdfZoom, activeTab?.id, activeTab?.type]);

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
      animateBoardZoomChange(nextZoom, anchor);
    };

    const handleWheelZoom = (event) => {
      if (!event.ctrlKey && !event.metaKey) {
        return;
      }

      event.preventDefault();
      const viewportRect = viewport.getBoundingClientRect();
      const anchorX = event.clientX - viewportRect.left;
      const anchorY = event.clientY - viewportRect.top;
      const previousAnchor = boardWheelAnchorRef.current;
      const shouldReuseAnchor =
        previousAnchor &&
        Math.abs(previousAnchor.clientX - event.clientX) < 24 &&
        Math.abs(previousAnchor.clientY - event.clientY) < 24;
      const boardAnchor = shouldReuseAnchor
        ? previousAnchor
        : {
            clientX: event.clientX,
            clientY: event.clientY,
            ...getBoardViewportAnchor(anchorX, anchorY, activeBoardRenderScaleRef.current),
          };
      boardWheelAnchorRef.current = boardAnchor;

      const zoomFactor = Math.exp(-event.deltaY * WHITEBOARD_WHEEL_ZOOM_SENSITIVITY);
      const baseZoom =
        typeof boardWheelZoomTargetRef.current === "number"
          ? boardWheelZoomTargetRef.current
          : liveBoardZoomRef.current || 1;
      const nextZoom = Math.min(
        WHITEBOARD_MAX_ZOOM,
        Math.max(WHITEBOARD_MIN_ZOOM, baseZoom * zoomFactor),
      );
      boardWheelZoomTargetRef.current = nextZoom;
      scheduleZoom(nextZoom, {
        clientX: event.clientX,
        clientY: event.clientY,
        boardX: boardAnchor.boardX,
        boardY: boardAnchor.boardY,
      });
    };

    let pendingPinchZoom = null;

    const flushPendingPinchZoom = () => {
      if (!pendingPinchZoom) {
        return;
      }

      const queuedZoom = pendingPinchZoom;
      pendingPinchZoom = null;
      const viewportRect = viewport.getBoundingClientRect();
      const liveAnchorX = queuedZoom.center.clientX - viewportRect.left;
      const liveAnchorY = queuedZoom.center.clientY - viewportRect.top;
      const liveAnchor = getBoardViewportAnchor(liveAnchorX, liveAnchorY, activeBoardRenderScaleRef.current);
      handleBoardZoomChange(
        queuedZoom.zoom,
        {
          clientX: queuedZoom.center.clientX,
          clientY: queuedZoom.center.clientY,
          boardX: liveAnchor.boardX,
          boardY: liveAnchor.boardY,
        },
        { sync: false },
      );
      boardPinchStateRef.current.distance = queuedZoom.distance;
      boardPinchStateRef.current.zoom = queuedZoom.zoom;
    };

    const schedulePinchZoom = (nextZoom, center, nextDistance) => {
      pendingPinchZoom = {
        zoom: nextZoom,
        center,
        distance: nextDistance,
      };
      if (zoomFrameRef.current) {
        return;
      }

      zoomFrameRef.current = window.requestAnimationFrame(() => {
        zoomFrameRef.current = 0;
        flushPendingPinchZoom();
      });
    };

    const handleTouchStart = (event) => {
      if (event.touches.length < 2) {
        boardPinchStateRef.current.active = false;
        return;
      }

      if (boardZoomAnimationRafRef.current) {
        window.cancelAnimationFrame(boardZoomAnimationRafRef.current);
        boardZoomAnimationRafRef.current = 0;
      }
      boardZoomAnimationTargetRef.current = null;
      boardZoomAnimationAnchorRef.current = null;
      boardWheelAnchorRef.current = null;
      boardWheelZoomTargetRef.current = null;

      const center = getTouchCenter(event.touches);
      const viewportRect = viewport.getBoundingClientRect();
      const anchorX = center.clientX - viewportRect.left;
      const anchorY = center.clientY - viewportRect.top;
      boardPinchStateRef.current = {
        active: true,
        distance: getTouchDistance(event.touches),
        zoom: liveBoardZoomRef.current || 1,
        ...getBoardViewportAnchor(anchorX, anchorY, activeBoardRenderScaleRef.current),
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
      const zoomRatio = amplifyZoomRatio(nextDistance / boardPinchStateRef.current.distance);
      const nextZoom = Math.min(
        WHITEBOARD_MAX_ZOOM,
        Math.max(WHITEBOARD_MIN_ZOOM, boardPinchStateRef.current.zoom * zoomRatio),
      );

      const currentZoom = liveBoardZoomRef.current || 1;
      if (Math.abs(nextZoom - currentZoom) > 0.001) {
        schedulePinchZoom(nextZoom, center, nextDistance);
        return;
      }

      const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
      const frameOffset = getBoardFrameOffset(viewport, boardFrameRef.current);
      const frameOffsetLeft = frameOffset.left;
      const frameOffsetTop = frameOffset.top;
      viewport.scrollLeft = Math.min(
        maxScrollLeft,
        Math.max(
          0,
          frameOffsetLeft +
            boardPinchStateRef.current.boardX * activeBoardRenderScaleRef.current -
            anchorX,
        ),
      );
      viewport.scrollTop = Math.min(
        maxScrollTop,
        Math.max(
          0,
          frameOffsetTop +
            boardPinchStateRef.current.boardY * activeBoardRenderScaleRef.current -
            anchorY,
        ),
      );
    };

    const handleTouchEnd = () => {
      const wasActive = boardPinchStateRef.current.active;
      boardPinchStateRef.current.active = false;
      if (zoomFrameRef.current) {
        window.cancelAnimationFrame(zoomFrameRef.current);
        zoomFrameRef.current = 0;
      }
      flushPendingPinchZoom();
      if (wasActive) {
        syncCurrentBoardViewport(liveBoardZoomRef.current);
      }
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
    activeTab?.type,
    animateBoardZoomChange,
    getBoardViewportAnchor,
    interactive,
    handleBoardZoomChange,
    syncCurrentBoardViewport,
  ]);

  useEffect(() => {
    const viewport = pdfViewportRef.current;
    if (
      !viewport ||
      !activeTab ||
      activeTab.type !== "pdf" ||
      interactive ||
      guestPdfOverride
    ) {
      return;
    }

    const targetFrame = document.getElementById(
      `pdf-page-frame-${activeTab.id}-${activeTab.viewportPageNumber || 1}`,
    );
    const targetPageNumber = Number(activeTab.viewportPageNumber) || 1;
    setVisiblePdfPages((prev) =>
      Array.from(
        new Set([...prev, targetPageNumber - 1, targetPageNumber, targetPageNumber + 1]),
      )
        .filter((pageNumber) => Number.isFinite(pageNumber) && pageNumber > 0)
        .sort((left, right) => left - right),
    );
    const topInset = activePdfViewportTopInset;
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
    const authoritativeVisibleWidth =
      shouldUseContainedMobilePdfViewport && syncedViewportVisibleWidthRatio > 0
        ? activePdfWidth * syncedViewportVisibleWidthRatio
        : viewport.clientWidth;
    const scrollWidth = Math.max(0, viewport.scrollWidth - authoritativeVisibleWidth);
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
    activePdfViewportTopInset,
    activePdfWidth,
    guestPdfOverride,
    pdfMeta.pages.length,
    pdfMeta.status,
    shouldUseContainedMobilePdfViewport,
    syncedViewportVisibleWidthRatio,
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
      !activeTab ||
      activeTab.type !== "pdf" ||
      !viewport ||
      scrollSyncRef.current.lock
    ) {
      return;
    }

    if (!interactive && !guestPdfOverride) {
      setGuestPdfOverride(true);
      setGuestPdfZoom(syncedPdfZoom);
    }

    const scrollHeight = viewport.scrollHeight - viewport.clientHeight;
    const topInset = activePdfViewportTopInset;
    const anchoredScrollTop = Math.min(
      scrollHeight,
      Math.max(0, viewport.scrollTop + topInset),
    );
    const scrollRatio = scrollHeight > 0 ? anchoredScrollTop / scrollHeight : 0;
    updateCurrentPdfPage();

    if (scrollSyncRef.current.timeoutId) {
      window.clearTimeout(scrollSyncRef.current.timeoutId);
    }

    if (!interactive) {
      return;
    }

    scrollSyncRef.current.timeoutId = window.setTimeout(() => {
      emitPdfViewport({
        scrollRatio,
      });
    }, 72);
  }, [
    activePdfViewportTopInset,
    activeTab,
    emitPdfViewport,
    guestPdfOverride,
    interactive,
    syncedPdfZoom,
    updateCurrentPdfPage,
  ]);

  const handleResetGuestPdfSync = useCallback(() => {
    setGuestPdfOverride(false);
    setGuestPdfZoom(syncedPdfZoom);
  }, [syncedPdfZoom]);

  const handleResetGuestBoardSync = useCallback(() => {
    setGuestBoardOverride(false);
    setGuestBoardZoom(syncedBoardZoom);
  }, [syncedBoardZoom]);

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

      // Always reload the PDF to ensure it's available
      const cachedPageCount = pdfPageCountCacheRef.current[item.id];
      
      // Release previous picker reference but keep shared cache alive.
      if (pdfPickerDocumentRef.current && pdfPickerDocumentKeyRef.current !== item.id) {
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
          fromCache: Boolean(pdfPickerDocumentRef.current && pdfPickerDocumentKeyRef.current === item.id),
        });
        
        // Use cached document if available for this item
        let pdfDocument;
        if (
          pdfPickerDocumentRef.current &&
          pdfPickerDocumentKeyRef.current === item.id &&
          isPdfDocumentUsable(pdfPickerDocumentRef.current)
        ) {
          pdfDocument = pdfPickerDocumentRef.current;
        } else {
          pdfDocument = await loadPdfDocument(item.fileUrl);
          pdfPickerDocumentRef.current = pdfDocument;
          pdfPickerDocumentKeyRef.current = item.id;
        }
        
        const pageCount = pdfDocument.numPages || 0;
        pdfPageCountCacheRef.current[item.id] = pageCount;

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
  const renderPdfLoadingState = useCallback(
    (label) => (
      <PdfStatus>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Spinner size={20} />
          <span style={{ color: 'var(--call-text)' }}>{label}</span>
        </div>
      </PdfStatus>
    ),
    [],
  );

  const renderPdfPagesLoadingState = useCallback(
    (label) => (
      <PdfStatus>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Spinner size={20} />
          <span style={{ color: 'var(--call-text)' }}>{label}</span>
        </div>
      </PdfStatus>
    ),
    [],
  );
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
  const shouldShowToolbar = showToolbar && (!isFullscreen || interactive);
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

                {pdfPickerState.status === "loading"
                  ? renderPdfPagesLoadingState(t("groupCall.whiteboard.loadingPdfPages"))
                  : null}

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
      handleWorkspaceZoomStep(-0.1);
    },
    {
      enabled: interactive && !isPdfLibraryOpen,
      preventDefault: true,
    },
    [handleWorkspaceZoomStep, interactive, isPdfLibraryOpen],
  );

  useHotkeys(
    "+,=",
    () => {
      handleWorkspaceZoomStep(0.1);
    },
    {
      enabled: interactive && !isPdfLibraryOpen,
      preventDefault: true,
    },
    [handleWorkspaceZoomStep, interactive, isPdfLibraryOpen],
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
          {isFullscreen ? <Minimize2 size={30} /> : <Maximize size={30} />}
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

        <WorkspaceBody
          ref={workspaceBodyRef}
          $compact={compact}
          onPointerMove={handleWorkspacePointerMove}
          onPointerLeave={handleWorkspacePointerLeave}
        >
          {smoothCursor?.peerId && !interactive ? (
            <RemoteCursorLayer style={remoteCursorLayerStyle}>
              <RemoteCursorWrap $x={smoothCursor.x} $y={smoothCursor.y}>
                <RemoteCursorGlyph>
                  <MousePointer2 size={18} strokeWidth={2.25} />
                </RemoteCursorGlyph>
                <RemoteCursorLabel>
                  {smoothCursor.displayName || t("groupCall.guest")}
                </RemoteCursorLabel>
              </RemoteCursorWrap>
            </RemoteCursorLayer>
          ) : null}
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
            shouldContainRemotePdfViewport ? (
              <RemoteViewportShell
                style={{
                  width: `${containedGuestPdfViewportWidth}px`,
                  height: `${containedGuestPdfViewportHeight}px`,
                }}
              >
                <RemoteViewportScaleLayer
                  style={{
                    width: `${activePdfViewportFrameWidth}px`,
                    height: `${activePdfViewportBaseHeight}px`,
                    transform: `scale(${remotePdfContainScale})`,
                  }}
                >
                  <PdfViewport
                    ref={handlePdfViewportRef}
                    data-record-surface-type="pdf"
                    onScroll={handlePdfScroll}
                    $interactive={interactive}
                    $allowHorizontal={activePdfZoom > 1.001}
                    style={{
                      width: `${activePdfViewportFrameWidth}px`,
                      height: `${activePdfViewportBaseHeight}px`,
                    }}
                  >
                    {pdfMeta.status === "loading"
                      ? renderPdfLoadingState(t("groupCall.whiteboard.loadingPdf"))
                      : null}
                    {pdfMeta.status === "error" ? (
                      <PdfStatus>
                        <PdfStatusContent>
                          <PdfStatusText>{t("groupCall.whiteboard.pdfLoadFailed")}</PdfStatusText>
                        </PdfStatusContent>
                      </PdfStatus>
                    ) : null}

                    <PdfStack>
                      {interactive || shouldUseContainedMobilePdfViewport || isFullscreen ? (
                        <PdfViewportSpacer $size={activePdfViewportTopInset} />
                      ) : null}
                      {pdfMeta.pages.map((pageMeta) => {
                        const pageMetric = pdfPageMetrics[pageMeta.pageNumber];
                        const pageHeight =
                          pageMetric?.height ||
                          (pdfRenderWidth > 0 && pageMeta.baseWidth > 0
                            ? Math.round(
                                (activePdfRenderWidth * pageMeta.baseHeight) /
                                  pageMeta.baseWidth,
                              )
                            : 720);
                        const displayedPageHeight = Math.max(1, Math.round(pageHeight * activePdfZoom));
                        const shouldRenderPage =
                          !interactive ||
                          visiblePdfPages.includes(pageMeta.pageNumber) ||
                          initialVisiblePdfPages.includes(pageMeta.pageNumber) ||
                          pageMeta.pageNumber === currentPdfPage ||
                          pageMeta.pageNumber === Number(activeTab.viewportPageNumber);
                        const pageStrokes = getPdfTabPageStrokes(activeTab, pageMeta.pageNumber);
                        const pdfImage =
                          !interactive && pdfPageImages[pageMeta.pageNumber]
                            ? pdfPageImages[pageMeta.pageNumber]
                            : "";

                        return (
                          <PdfPageFrame
                            key={pageMeta.pageNumber}
                            id={`pdf-page-frame-${activeTab.id}-${pageMeta.pageNumber}`}
                            data-page-number={pageMeta.pageNumber}
                            style={{
                              width: `${activePdfWidth}px`,
                              minWidth: `${activePdfWidth}px`,
                              height: `${displayedPageHeight}px`,
                            }}
                          >
                            <PageBadge>
                              {t("groupCall.whiteboard.pageShort", {
                                current: pageMeta.pageNumber,
                              })}
                            </PageBadge>
                            <PdfPageScaleLayer
                              style={{
                                width: `${activePdfRenderWidth}px`,
                                height: `${pageHeight}px`,
                                transform: `translateX(-50%) scale(${activePdfZoom})`,
                              }}
                            >
                              {shouldRenderPage ? (
                                <>
                                  {pdfImage ? (
                                    <PdfRasterImage src={pdfImage} alt="" draggable={false} />
                                  ) : null}
                                  <PdfPageCanvas
                                    id={`pdf-page-${activeTab.id}-${pageMeta.pageNumber}`}
                                    $hidden={Boolean(pdfImage)}
                                  />
                                </>
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
                            </PdfPageScaleLayer>
                          </PdfPageFrame>
                        );
                      })}
                      {interactive || shouldUseContainedMobilePdfViewport || isFullscreen ? (
                        <PdfViewportSpacer $size={activePdfViewportBottomInset} />
                      ) : null}
                    </PdfStack>
                    {!pdfMeta.pages.length && pdfMeta.status === "ready" ? (
                      <PdfStatus>{t("groupCall.whiteboard.emptyPdf")}</PdfStatus>
                    ) : null}
                  </PdfViewport>
                </RemoteViewportScaleLayer>
              </RemoteViewportShell>
            ) : (
              <PdfViewport
                ref={handlePdfViewportRef}
                data-record-surface-type="pdf"
                onScroll={handlePdfScroll}
                $interactive={interactive}
                $allowHorizontal={activePdfZoom > 1.001}
              >
                {pdfMeta.status === "loading"
                  ? renderPdfLoadingState(t("groupCall.whiteboard.loadingPdf"))
                  : null}
                {pdfMeta.status === "error" ? (
                  <PdfStatus>
                    <PdfStatusContent>
                      <PdfStatusText>{t("groupCall.whiteboard.pdfLoadFailed")}</PdfStatusText>
                    </PdfStatusContent>
                  </PdfStatus>
                ) : null}

                <PdfStack>
                  {interactive || shouldUseContainedMobilePdfViewport || isFullscreen ? (
                    <PdfViewportSpacer $size={activePdfViewportTopInset} />
                  ) : null}
                  {pdfMeta.pages.map((pageMeta) => {
                    const pageMetric = pdfPageMetrics[pageMeta.pageNumber];
                    const pageHeight =
                      pageMetric?.height ||
                      (pdfRenderWidth > 0 && pageMeta.baseWidth > 0
                        ? Math.round(
                            (activePdfRenderWidth * pageMeta.baseHeight) /
                              pageMeta.baseWidth,
                          )
                        : 720);
                    const displayedPageHeight = Math.max(1, Math.round(pageHeight * activePdfZoom));
                    const shouldRenderPage =
                      !interactive ||
                      visiblePdfPages.includes(pageMeta.pageNumber) ||
                      initialVisiblePdfPages.includes(pageMeta.pageNumber) ||
                      pageMeta.pageNumber === currentPdfPage ||
                      pageMeta.pageNumber === Number(activeTab.viewportPageNumber);
                    const pageStrokes = getPdfTabPageStrokes(activeTab, pageMeta.pageNumber);
                    const pdfImage =
                      !interactive && pdfPageImages[pageMeta.pageNumber]
                        ? pdfPageImages[pageMeta.pageNumber]
                        : "";

                    return (
                      <PdfPageFrame
                        key={pageMeta.pageNumber}
                        id={`pdf-page-frame-${activeTab.id}-${pageMeta.pageNumber}`}
                        data-page-number={pageMeta.pageNumber}
                        style={{
                          width: `${activePdfWidth}px`,
                          minWidth: `${activePdfWidth}px`,
                          height: `${displayedPageHeight}px`,
                        }}
                      >
                        <PageBadge>
                          {t("groupCall.whiteboard.pageShort", {
                            current: pageMeta.pageNumber,
                          })}
                        </PageBadge>
                        <PdfPageScaleLayer
                          style={{
                            width: `${activePdfRenderWidth}px`,
                            height: `${pageHeight}px`,
                            transform: `translateX(-50%) scale(${activePdfZoom})`,
                          }}
                        >
                          {shouldRenderPage ? (
                            <>
                              {pdfImage ? (
                                <PdfRasterImage src={pdfImage} alt="" draggable={false} />
                              ) : null}
                              <PdfPageCanvas
                                id={`pdf-page-${activeTab.id}-${pageMeta.pageNumber}`}
                                $hidden={Boolean(pdfImage)}
                              />
                            </>
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
                        </PdfPageScaleLayer>
                      </PdfPageFrame>
                    );
                  })}
                  {interactive || shouldUseContainedMobilePdfViewport || isFullscreen ? (
                    <PdfViewportSpacer $size={activePdfViewportBottomInset} />
                  ) : null}
                </PdfStack>
                {!pdfMeta.pages.length && pdfMeta.status === "ready" ? (
                  <PdfStatus>{t("groupCall.whiteboard.emptyPdf")}</PdfStatus>
                ) : null}
              </PdfViewport>
            )
          ) : shouldContainRemoteBoardViewport ? (
            <RemoteViewportShell
              style={{
                width: `${Math.max(1, Math.round(activeBoardBaseWidth * remoteBoardContainScale))}px`,
                height: `${Math.max(1, Math.round(activeBoardBaseHeight * remoteBoardContainScale))}px`,
              }}
            >
              <RemoteViewportScaleLayer
                style={{
                  width: `${activeBoardBaseWidth}px`,
                  height: `${activeBoardBaseHeight}px`,
                  transform: `scale(${remoteBoardContainScale})`,
                }}
              >
                <BoardViewport
                  ref={handleBoardViewportRef}
                  data-record-surface-type="board"
                  onScroll={handleBoardScroll}
                  style={{
                    width: `${activeBoardBaseWidth}px`,
                    height: `${activeBoardBaseHeight}px`,
                  }}
                >
                  <BoardViewportContent>
                    <BoardCanvasFrame
                      ref={boardFrameRef}
                      style={{
                        width: `${activeBoardFrameWidth}px`,
                        height: `${activeBoardFrameHeight}px`,
                      }}
                    >
                      <BoardSurface>
                        <BoardSceneGrid
                          $scale={activeBoardRenderScale}
                          $frameWidth={activeBoardFrameWidth}
                          $frameHeight={activeBoardFrameHeight}
                          $offsetLeft={activeBoardSceneOffsetLeft}
                          $offsetTop={activeBoardSceneOffsetTop}
                        />
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
              </RemoteViewportScaleLayer>
            </RemoteViewportShell>
          ) : (
            <BoardViewport
              ref={handleBoardViewportRef}
              data-record-surface-type="board"
              onScroll={handleBoardScroll}
            >
              <BoardViewportContent>
                <BoardCanvasFrame
                  ref={boardFrameRef}
                  style={{
                    width: `${activeBoardFrameWidth}px`,
                    height: `${activeBoardFrameHeight}px`,
                  }}
                >
                  <BoardSurface>
                    <BoardSceneGrid
                      $scale={activeBoardRenderScale}
                      $frameWidth={activeBoardFrameWidth}
                      $frameHeight={activeBoardFrameHeight}
                      $offsetLeft={activeBoardSceneOffsetLeft}
                      $offsetTop={activeBoardSceneOffsetTop}
                    />
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

          {shouldShowGuestPdfSyncButton || shouldShowGuestBoardSyncButton ? (
            <GuestSyncButton
              type="button"
              onClick={
                activeTab?.type === "pdf"
                  ? handleResetGuestPdfSync
                  : handleResetGuestBoardSync
              }
              aria-label="Asl"
              title="Asl"
            >
              Asl
            </GuestSyncButton>
          ) : null}

          {activeTab ? (
            <FloatingControls>
              <FloatingGroup>
                <ToolButton
                  type="button"
                  onClick={() => handleWorkspaceZoomStep(-0.1)}
                  aria-label={t("groupCall.whiteboard.zoomOut")}
                  title={zoomOutTitle}
                >
                  <Minus size={16} />
                </ToolButton>
                <FloatingZoomValue>{Math.round(activeWorkspaceZoom * 100)}%</FloatingZoomValue>
                <ToolButton
                  type="button"
                  onClick={() => handleWorkspaceZoomStep(0.1)}
                  aria-label={t("groupCall.whiteboard.zoomIn")}
                  title={zoomInTitle}
                >
                  <Plus size={16} />
                </ToolButton>
              </FloatingGroup>

              {interactive ? (
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
              ) : null}
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
