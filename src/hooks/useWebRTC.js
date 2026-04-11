import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import axiosInstance from "../api/axiosInstance";
import useAuthStore from "../store/authStore";
import { API_BASE_URL } from "../config/env";
import { isValidMeetRoomId } from "../utils/meetStore";
import { APP_LIMITS, getTierLimit } from "../constants/appLimits";

const SIGNAL_URL = API_BASE_URL;
const MOBILE_CAMERA_MEDIA_QUERY = "(max-width: 768px)";

const TURN_URLS = import.meta.env.VITE_TURN_URLS
  ? import.meta.env.VITE_TURN_URLS.split(",").map((item) => item.trim())
  : [];

const buildFallbackIceConfig = () => ({
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    ...(TURN_URLS.length > 0
      ? [
          {
            urls: TURN_URLS,
            username: import.meta.env.VITE_TURN_USERNAME || "",
            credential: import.meta.env.VITE_TURN_CREDENTIAL || "",
          },
        ]
      : []),
  ],
});

const CALL_QUALITY_PROFILES = {
  balanced: {
    key: "balanced",
    label: "balanced",
    width: 640,
    height: 360,
    frameRate: 18,
    videoBitrate: 380_000,
    audioBitrate: 32_000,
    scaleResolutionDownBy: 1,
  },
  crowded: {
    key: "crowded",
    label: "crowded",
    width: 480,
    height: 270,
    frameRate: 15,
    videoBitrate: 220_000,
    audioBitrate: 32_000,
    scaleResolutionDownBy: 1.2,
  },
  poor: {
    key: "poor",
    label: "audio-priority",
    width: 320,
    height: 180,
    frameRate: 10,
    videoBitrate: 110_000,
    audioBitrate: 40_000,
    scaleResolutionDownBy: 1.6,
  },
  screen: {
    key: "screen",
    label: "screen-share",
    width: 1920,
    height: 1080,
    frameRate: 12,
    videoBitrate: 2_400_000,
    audioBitrate: 32_000,
    scaleResolutionDownBy: 1,
  },
  screenLimited: {
    key: "screen-limited",
    label: "screen-fast",
    width: 1600,
    height: 900,
    frameRate: 10,
    videoBitrate: 1_600_000,
    audioBitrate: 32_000,
    scaleResolutionDownBy: 1,
  },
  screenPoor: {
    key: "screen-poor",
    label: "screen-lite",
    width: 1280,
    height: 720,
    frameRate: 8,
    videoBitrate: 900_000,
    audioBitrate: 32_000,
    scaleResolutionDownBy: 1,
  },
  screenCamera: {
    key: "screen-camera",
    label: "camera-low",
    width: 320,
    height: 180,
    frameRate: 6,
    videoBitrate: 90_000,
    audioBitrate: 32_000,
    scaleResolutionDownBy: 2,
  },
};

const WHITEBOARD_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
const WHITEBOARD_DEFAULT_COLOR = "#0f172a";
const WHITEBOARD_DEFAULT_SIZE = 4;
const WHITEBOARD_MAX_STROKES = 320;
const WHITEBOARD_MAX_POINTS_PER_STROKE = 1200;
const WHITEBOARD_APPEND_BATCH_LIMIT = 24;
const WHITEBOARD_MAX_TEXT_CHARS = 240;
const WHITEBOARD_BOARD_TAB_ID = "board";
const WHITEBOARD_TAB_ID_PATTERN = /^[a-zA-Z0-9_-]{1,80}$/;
const WHITEBOARD_MAX_TABS = 6;
const WHITEBOARD_PDF_LIBRARY_MAX_ITEMS = 24;
const WHITEBOARD_MIN_ZOOM = 0.5;
const WHITEBOARD_MAX_ZOOM = 3;
const WHITEBOARD_BOARD_POINT_MIN = -0.5;
const WHITEBOARD_BOARD_POINT_MAX = 1.5;
const WHITEBOARD_MIN_VIEWPORT_BASE_WIDTH = 120;
const WHITEBOARD_MAX_VIEWPORT_BASE_WIDTH = 4096;
const WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT = 120;
const WHITEBOARD_MAX_VIEWPORT_BASE_HEIGHT = 4096;
const WHITEBOARD_TEXT_FONT_FAMILY_OPTIONS = ["sans", "serif", "mono", "hand"];
const WHITEBOARD_TEXT_SIZE_OPTIONS = ["s", "m", "l", "xl"];
const WHITEBOARD_TEXT_ALIGN_OPTIONS = ["left", "center", "right"];
const WHITEBOARD_SHAPE_EDGE_OPTIONS = ["sharp", "rounded"];
const WHITEBOARD_SHAPE_TOOLS = ["rectangle", "diamond", "triangle", "circle"];
const WHITEBOARD_VECTOR_TOOLS = [...WHITEBOARD_SHAPE_TOOLS, "arrow"];

const createWhiteboardBoardTab = () => ({
  id: WHITEBOARD_BOARD_TAB_ID,
  type: "board",
  title: "board",
  zoom: 1,
  viewportBaseWidth: WHITEBOARD_MIN_VIEWPORT_BASE_WIDTH,
  viewportBaseHeight: WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
  strokes: [],
});

const createInitialWhiteboardState = () => ({
  isActive: false,
  ownerPeerId: "",
  ownerDisplayName: "",
  activeTabId: WHITEBOARD_BOARD_TAB_ID,
  tabs: [createWhiteboardBoardTab()],
  pdfLibrary: [],
});

const clampUnitValue = (value) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) {
    return null;
  }

  return Math.min(WHITEBOARD_BOARD_POINT_MAX, Math.max(WHITEBOARD_BOARD_POINT_MIN, nextValue));
};

const normalizeWhiteboardPoint = (point) => {
  if (!point || typeof point !== "object") {
    return null;
  }

  const x = clampUnitValue(point.x);
  const y = clampUnitValue(point.y);
  if (x === null || y === null) {
    return null;
  }

  return { x, y };
};

const normalizeWhiteboardTabId = (tabId) => {
  if (typeof tabId !== "string") {
    return "";
  }

  const nextTabId = tabId.trim();
  return WHITEBOARD_TAB_ID_PATTERN.test(nextTabId) ? nextTabId : "";
};

const normalizeWhiteboardTitle = (title) =>
  typeof title === "string"
    ? title
        .replace(/[\u0000-\u001F\u007F]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80)
    : "";

const normalizeWhiteboardFileUrl = (fileUrl) => {
  if (typeof fileUrl !== "string") {
    return "";
  }

  const nextFileUrl = fileUrl.trim().slice(0, 2048);
  if (
    nextFileUrl.startsWith("http://") ||
    nextFileUrl.startsWith("https://") ||
    nextFileUrl.startsWith("/")
  ) {
    return nextFileUrl;
  }

  return "";
};

const normalizeWhiteboardFileName = (fileName) =>
  typeof fileName === "string"
    ? fileName
        .replace(/[\u0000-\u001F\u007F]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 120)
    : "";

const normalizeWhiteboardPoints = (
  points,
  limit = WHITEBOARD_APPEND_BATCH_LIMIT,
) => {
  if (!Array.isArray(points)) {
    return [];
  }

  return points
    .slice(0, limit)
    .map((point) => normalizeWhiteboardPoint(point))
    .filter(Boolean);
};

const trimWhiteboardStrokes = (strokes) => {
  if (!Array.isArray(strokes)) {
    return [];
  }

  if (strokes.length <= WHITEBOARD_MAX_STROKES) {
    return strokes;
  }

  return strokes.slice(strokes.length - WHITEBOARD_MAX_STROKES);
};

const normalizeWhiteboardPageNumber = (pageNumber) => {
  const nextPageNumber = Number(pageNumber);
  if (!Number.isFinite(nextPageNumber)) {
    return 1;
  }

  return Math.min(5000, Math.max(1, Math.round(nextPageNumber)));
};

const normalizeWhiteboardSelectedPages = (selectedPages) => {
  if (!Array.isArray(selectedPages)) {
    return [];
  }

  return Array.from(
    new Set(
      selectedPages
        .slice(0, 240)
        .map((pageNumber) => normalizeWhiteboardPageNumber(pageNumber))
        .filter((pageNumber) => Number.isFinite(pageNumber) && pageNumber > 0),
    ),
  ).sort((left, right) => left - right);
};

const normalizeWhiteboardSelectedPagesMode = (selectedPagesMode, selectedPages) =>
  selectedPagesMode === "custom" || normalizeWhiteboardSelectedPages(selectedPages).length > 0
    ? "custom"
    : "all";

const normalizeWhiteboardScrollRatio = (scrollRatio) => {
  const nextScrollRatio = Number(scrollRatio);
  if (!Number.isFinite(nextScrollRatio)) {
    return 0;
  }

  return Math.min(1, Math.max(0, nextScrollRatio));
};

const normalizeWhiteboardViewportLeftRatio = (leftRatio) => {
  const nextLeftRatio = Number(leftRatio);
  if (!Number.isFinite(nextLeftRatio)) {
    return 0;
  }

  return Math.min(1, Math.max(0, nextLeftRatio));
};

const normalizeWhiteboardViewportVisibleWidthRatio = (widthRatio) => {
  const nextWidthRatio = Number(widthRatio);
  if (!Number.isFinite(nextWidthRatio)) {
    return 0;
  }

  return Math.min(1, Math.max(0, nextWidthRatio));
};

const normalizeWhiteboardZoom = (zoom) => {
  const nextZoom = Number(zoom);
  if (!Number.isFinite(nextZoom)) {
    return 1;
  }

  return Math.min(WHITEBOARD_MAX_ZOOM, Math.max(WHITEBOARD_MIN_ZOOM, nextZoom));
};

const normalizeWhiteboardViewportBaseWidth = (value) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) {
    return WHITEBOARD_MIN_VIEWPORT_BASE_WIDTH;
  }

  return Math.min(
    WHITEBOARD_MAX_VIEWPORT_BASE_WIDTH,
    Math.max(WHITEBOARD_MIN_VIEWPORT_BASE_WIDTH, Math.round(nextValue)),
  );
};

const normalizeWhiteboardViewportBaseHeight = (value) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) {
    return WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT;
  }

  return Math.min(
    WHITEBOARD_MAX_VIEWPORT_BASE_HEIGHT,
    Math.max(WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT, Math.round(nextValue)),
  );
};

const normalizeWhiteboardText = (value) =>
  typeof value === "string" ? value.replace(/\s+$/g, "").slice(0, 240) : "";

const normalizeWhiteboardTextFontFamily = (value) =>
  WHITEBOARD_TEXT_FONT_FAMILY_OPTIONS.includes(value) ? value : "sans";

const normalizeWhiteboardTextSize = (value) =>
  WHITEBOARD_TEXT_SIZE_OPTIONS.includes(value) ? value : "m";

const normalizeWhiteboardTextAlign = (value) =>
  WHITEBOARD_TEXT_ALIGN_OPTIONS.includes(value) ? value : "left";

const normalizeWhiteboardFontPixelSize = (value) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) {
    return 0;
  }

  return Math.min(240, Math.max(8, Math.round(nextValue)));
};

const normalizeWhiteboardFillColor = (value) =>
  typeof value === "string" && WHITEBOARD_COLOR_PATTERN.test(value.trim())
    ? value.trim().toLowerCase()
    : "";

const normalizeWhiteboardShapeEdge = (value) =>
  WHITEBOARD_SHAPE_EDGE_OPTIONS.includes(value) ? value : "sharp";

const normalizeWhiteboardRotation = (value) => {
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

const normalizeWhiteboardStroke = (stroke) => {
  if (!stroke || typeof stroke !== "object") {
    return null;
  }

  const strokeId =
    typeof stroke.id === "string" && stroke.id.trim()
      ? stroke.id.trim().slice(0, 80)
      : "";
  if (!strokeId) {
    return null;
  }

  const points = normalizeWhiteboardPoints(
    stroke.points,
    WHITEBOARD_MAX_POINTS_PER_STROKE,
  );
  if (points.length === 0) {
    return null;
  }

  const normalizedTool =
    stroke.tool === "eraser"
      ? "eraser"
      : stroke.tool === "text"
        ? "text"
        : WHITEBOARD_VECTOR_TOOLS.includes(stroke.tool)
          ? stroke.tool
          : "pen";

  return {
    id: strokeId,
    tool: normalizedTool,
    color:
      typeof stroke.color === "string" &&
      WHITEBOARD_COLOR_PATTERN.test(stroke.color.trim())
        ? stroke.color.trim().toLowerCase()
        : WHITEBOARD_DEFAULT_COLOR,
    size: Math.min(
      24,
      Math.max(2, Math.round(Number(stroke.size) || WHITEBOARD_DEFAULT_SIZE)),
    ),
    points,
    text: normalizeWhiteboardText(stroke.text),
    fillColor: normalizeWhiteboardFillColor(stroke.fillColor),
    fontFamily: normalizeWhiteboardTextFontFamily(stroke.fontFamily),
    textSize: normalizeWhiteboardTextSize(stroke.textSize),
    textAlign: normalizeWhiteboardTextAlign(stroke.textAlign),
    fontPixelSize:
      normalizedTool === "text"
        ? normalizeWhiteboardFontPixelSize(stroke.fontPixelSize)
        : 0,
    edgeStyle:
      ["rectangle", "diamond", "triangle"].includes(normalizedTool)
        ? normalizeWhiteboardShapeEdge(stroke.edgeStyle)
        : "sharp",
    rotation:
      WHITEBOARD_SHAPE_TOOLS.includes(normalizedTool) || normalizedTool === "text"
        ? normalizeWhiteboardRotation(stroke.rotation)
        : 0,
  };
};

const normalizeWhiteboardPdfPageState = (pageState) => {
  if (!pageState || typeof pageState !== "object") {
    return null;
  }

  return {
    pageNumber: normalizeWhiteboardPageNumber(pageState.pageNumber),
    strokes: trimWhiteboardStrokes(
      (Array.isArray(pageState.strokes) ? pageState.strokes : [])
        .map((stroke) => normalizeWhiteboardStroke(stroke))
        .filter(Boolean),
    ),
  };
};

const normalizeWhiteboardTab = (tab) => {
  if (!tab || typeof tab !== "object") {
    return null;
  }

  const tabId = normalizeWhiteboardTabId(tab.id);
  if (!tabId) {
    return null;
  }

  if (tab.type === "pdf") {
    const fileUrl = normalizeWhiteboardFileUrl(tab.fileUrl);
    const fileName = normalizeWhiteboardFileName(tab.fileName);
    if (!fileUrl || !fileName) {
      return null;
    }

    return {
      id: tabId,
      type: "pdf",
      title:
        normalizeWhiteboardTitle(tab.title) ||
        fileName.replace(/\.pdf$/i, "") ||
        "PDF",
      fileUrl,
      fileName,
      fileSize: Math.max(0, Math.round(Number(tab.fileSize) || 0)),
      scrollRatio: normalizeWhiteboardScrollRatio(tab.scrollRatio),
      zoom: normalizeWhiteboardZoom(tab.zoom),
      viewportPageNumber: normalizeWhiteboardPageNumber(tab.viewportPageNumber),
      viewportPageOffsetRatio: normalizeWhiteboardScrollRatio(tab.viewportPageOffsetRatio),
      viewportLeftRatio: normalizeWhiteboardViewportLeftRatio(tab.viewportLeftRatio),
      viewportVisibleHeightRatio: normalizeWhiteboardScrollRatio(tab.viewportVisibleHeightRatio),
      viewportVisibleWidthRatio: normalizeWhiteboardViewportVisibleWidthRatio(
        tab.viewportVisibleWidthRatio,
      ),
      viewportBaseWidth: normalizeWhiteboardViewportBaseWidth(tab.viewportBaseWidth),
      selectedPagesMode: normalizeWhiteboardSelectedPagesMode(
        tab.selectedPagesMode,
        tab.selectedPages,
      ),
      selectedPages: normalizeWhiteboardSelectedPages(tab.selectedPages),
      pages: (Array.isArray(tab.pages) ? tab.pages : [])
        .map((pageState) => normalizeWhiteboardPdfPageState(pageState))
        .filter(Boolean)
        .sort((left, right) => left.pageNumber - right.pageNumber),
    };
  }

  return {
    id: WHITEBOARD_BOARD_TAB_ID,
    type: "board",
    title: normalizeWhiteboardTitle(tab.title) || "board",
    zoom: normalizeWhiteboardZoom(tab.zoom),
    viewportBaseWidth: normalizeWhiteboardViewportBaseWidth(tab.viewportBaseWidth),
    viewportBaseHeight: normalizeWhiteboardViewportBaseHeight(tab.viewportBaseHeight),
    strokes: trimWhiteboardStrokes(
      (Array.isArray(tab.strokes) ? tab.strokes : [])
        .map((stroke) => normalizeWhiteboardStroke(stroke))
        .filter(Boolean),
    ),
  };
};

const normalizeWhiteboardPdfLibraryItem = (item) => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const itemId = normalizeWhiteboardTabId(item.id);
  const fileUrl = normalizeWhiteboardFileUrl(item.fileUrl);
  const fileName = normalizeWhiteboardFileName(item.fileName);
  if (!itemId || !fileUrl || !fileName) {
    return null;
  }

  const createdAt = Number(item.createdAt);

  return {
    id: itemId,
    title:
      normalizeWhiteboardTitle(item.title) ||
      fileName.replace(/\.pdf$/i, "") ||
      "PDF",
    fileUrl,
    fileName,
    fileSize: Math.max(0, Math.round(Number(item.fileSize) || 0)),
    createdAt:
      Number.isFinite(createdAt) && createdAt > 0 ? Math.round(createdAt) : Date.now(),
  };
};

const mergeWhiteboardPdfLibraryItems = (...collections) =>
  collections
    .flatMap((collection) => (Array.isArray(collection) ? collection : []))
    .map((item) => normalizeWhiteboardPdfLibraryItem(item))
    .filter(Boolean)
    .reduce((accumulator, item) => {
      const existingIndex = accumulator.findIndex(
        (entry) => entry.id === item.id || entry.fileUrl === item.fileUrl,
      );
      if (existingIndex >= 0) {
        accumulator[existingIndex] =
          accumulator[existingIndex].createdAt >= item.createdAt
            ? accumulator[existingIndex]
            : item;
      } else {
        accumulator.push(item);
      }
      return accumulator;
    }, [])
    .sort((left, right) => right.createdAt - left.createdAt)
    .slice(0, WHITEBOARD_PDF_LIBRARY_MAX_ITEMS);

const getWhiteboardPdfLibraryStorageKey = (userId) =>
  `jamm:whiteboard-pdf-library:${String(userId || "anon")}`;

const sumWhiteboardPdfLibraryBytes = (items) =>
  (Array.isArray(items) ? items : []).reduce(
    (total, item) => total + Math.max(0, Number(item?.fileSize || 0)),
    0,
  );

const formatWhiteboardBytesLabel = (bytes) => {
  const nextBytes = Math.max(0, Number(bytes || 0));
  const megaBytes = nextBytes / (1024 * 1024);
  return `${Number.isInteger(megaBytes) ? megaBytes : megaBytes.toFixed(1)} MB`;
};

const readStoredWhiteboardPdfLibrary = (userId) => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(
      getWhiteboardPdfLibraryStorageKey(userId),
    );
    if (!rawValue) {
      return [];
    }

    return mergeWhiteboardPdfLibraryItems(JSON.parse(rawValue));
  } catch {
    return [];
  }
};

const writeStoredWhiteboardPdfLibrary = (userId, items) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      getWhiteboardPdfLibraryStorageKey(userId),
      JSON.stringify(mergeWhiteboardPdfLibraryItems(items)),
    );
  } catch {}
};

const ensureWhiteboardTabs = (tabs) => {
  const normalizedTabs = Array.isArray(tabs)
    ? tabs.map((tab) => normalizeWhiteboardTab(tab)).filter(Boolean)
    : [];
  const boardTab =
    normalizedTabs.find((tab) => tab.type === "board") || createWhiteboardBoardTab();
  const pdfTabs = normalizedTabs
    .filter((tab) => tab.type === "pdf")
    .slice(0, WHITEBOARD_MAX_TABS - 1);

  return [boardTab, ...pdfTabs];
};

const normalizeWhiteboardState = (rawState) => ({
  isActive: Boolean(rawState?.isActive),
  ownerPeerId:
    typeof rawState?.ownerPeerId === "string" ? rawState.ownerPeerId : "",
  ownerDisplayName:
    typeof rawState?.ownerDisplayName === "string"
      ? rawState.ownerDisplayName
      : "",
  activeTabId: (() => {
    const tabs = ensureWhiteboardTabs(rawState?.tabs);
    const normalizedTabId = normalizeWhiteboardTabId(rawState?.activeTabId);
    return tabs.some((tab) => tab.id === normalizedTabId)
      ? normalizedTabId
      : WHITEBOARD_BOARD_TAB_ID;
  })(),
  tabs: ensureWhiteboardTabs(rawState?.tabs),
  pdfLibrary: (Array.isArray(rawState?.pdfLibrary) ? rawState.pdfLibrary : [])
    .map((item) => normalizeWhiteboardPdfLibraryItem(item))
    .filter(Boolean)
    .sort((left, right) => right.createdAt - left.createdAt),
});

const mergeWhiteboardTabsWithPreservedSelections = (nextState, prevState) => {
  const prevTabs = Array.isArray(prevState?.tabs) ? prevState.tabs : [];

  return {
    ...nextState,
    tabs: ensureWhiteboardTabs(
      (Array.isArray(nextState.tabs) ? nextState.tabs : []).map((tab) => {
        if (tab.type !== "pdf") {
          return tab;
        }

        const previousTab =
          prevTabs.find((entry) => entry.id === tab.id) ||
          prevTabs.find(
            (entry) =>
              entry.type === "pdf" &&
              entry.fileUrl === tab.fileUrl &&
              entry.title === tab.title,
          );

        if (
          tab.selectedPagesMode === "custom" &&
          tab.selectedPages.length === 0 &&
          previousTab?.type === "pdf" &&
          previousTab.selectedPagesMode === "custom" &&
          previousTab.selectedPages.length > 0
        ) {
          return {
            ...tab,
            selectedPages: previousTab.selectedPages,
          };
        }

        return tab;
      }),
    ),
  };
};

const resolveWhiteboardTargetTabId = (state, tabId) => {
  const normalizedTabId = normalizeWhiteboardTabId(tabId);
  if (normalizedTabId && state.tabs.some((tab) => tab.id === normalizedTabId)) {
    return normalizedTabId;
  }

  return WHITEBOARD_BOARD_TAB_ID;
};

const updateWhiteboardTabs = (state, updater) => {
  const nextTabs = ensureWhiteboardTabs(updater(Array.isArray(state.tabs) ? state.tabs : []));
  const activeTabId = nextTabs.some((tab) => tab.id === state.activeTabId)
    ? state.activeTabId
    : WHITEBOARD_BOARD_TAB_ID;

  return {
    ...state,
    tabs: nextTabs,
    activeTabId,
  };
};

const updateWhiteboardTabById = (state, tabId, updater) =>
  updateWhiteboardTabs(state, (tabs) =>
    tabs.map((tab) => (tab.id === tabId ? updater(tab) || tab : tab)),
  );

const upsertWhiteboardStrokeInState = (state, { tabId, pageNumber, stroke }) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, tabId);

  return {
    ...updateWhiteboardTabById(state, targetTabId, (tab) => {
      if (tab.type === "pdf") {
        const targetPageNumber = normalizeWhiteboardPageNumber(pageNumber);
        const pages = [...tab.pages];
        const pageIndex = pages.findIndex((page) => page.pageNumber === targetPageNumber);
        const nextPage =
          pageIndex >= 0
            ? pages[pageIndex]
            : { pageNumber: targetPageNumber, strokes: [] };
        const nextPageState = {
          ...nextPage,
          strokes: trimWhiteboardStrokes([
            ...nextPage.strokes.filter((existingStroke) => existingStroke.id !== stroke.id),
            stroke,
          ]),
        };

        if (pageIndex >= 0) {
          pages[pageIndex] = nextPageState;
        } else {
          pages.push(nextPageState);
        }

        return {
          ...tab,
          pages: pages.sort((left, right) => left.pageNumber - right.pageNumber),
        };
      }

      return {
        ...tab,
        strokes: trimWhiteboardStrokes([
          ...tab.strokes.filter((existingStroke) => existingStroke.id !== stroke.id),
          stroke,
        ]),
      };
    }),
    isActive: true,
    activeTabId: targetTabId,
  };
};

const appendWhiteboardStrokePointsInState = (state, { tabId, pageNumber, strokeId, points }) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, tabId);

  return {
    ...updateWhiteboardTabById(state, targetTabId, (tab) => {
      if (tab.type === "pdf") {
        const targetPageNumber = normalizeWhiteboardPageNumber(pageNumber);
        return {
          ...tab,
          pages: tab.pages.map((page) =>
            page.pageNumber !== targetPageNumber
              ? page
              : {
                  ...page,
                  strokes: page.strokes.map((stroke) =>
                    stroke.id !== strokeId
                      ? stroke
                      : {
                          ...stroke,
                          points: [...stroke.points, ...points].slice(
                            0,
                            WHITEBOARD_MAX_POINTS_PER_STROKE,
                          ),
                        },
                  ),
                },
          ),
        };
      }

      return {
        ...tab,
        strokes: tab.strokes.map((stroke) =>
          stroke.id !== strokeId
            ? stroke
            : {
                ...stroke,
                points: [...stroke.points, ...points].slice(
                  0,
                  WHITEBOARD_MAX_POINTS_PER_STROKE,
                ),
              },
        ),
      };
    }),
    isActive: true,
    activeTabId: targetTabId,
  };
};

const updateWhiteboardStrokeInState = (
  state,
  {
    tabId,
    pageNumber,
    strokeId,
    point,
    points,
    text,
    color,
    size,
    fillColor,
    fontFamily,
    textSize,
    textAlign,
    fontPixelSize,
    edgeStyle,
    rotation,
  },
) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, tabId);

  const applyStrokeUpdate = (stroke) =>
    stroke.id !== strokeId
      ? stroke
      : {
          ...stroke,
          points:
            Array.isArray(points) && points.length > 0
              ? normalizeWhiteboardPoints(points, WHITEBOARD_MAX_POINTS_PER_STROKE)
              : point && Number.isFinite(point.x) && Number.isFinite(point.y)
                ? [{ x: point.x, y: point.y }]
              : stroke.points,
          text: typeof text === "string" ? text : stroke.text,
          color:
            typeof color === "string" && WHITEBOARD_COLOR_PATTERN.test(color.trim())
              ? color.trim().toLowerCase()
              : stroke.color,
          size:
            typeof size === "number"
              ? Math.min(24, Math.max(2, Math.round(size)))
              : stroke.size,
          fillColor:
            typeof fillColor === "string"
              ? normalizeWhiteboardFillColor(fillColor)
              : stroke.fillColor,
          fontFamily:
            typeof fontFamily === "string"
              ? normalizeWhiteboardTextFontFamily(fontFamily)
              : stroke.fontFamily,
          textSize:
            typeof textSize === "string"
              ? normalizeWhiteboardTextSize(textSize)
              : stroke.textSize,
          textAlign:
            typeof textAlign === "string"
              ? normalizeWhiteboardTextAlign(textAlign)
              : stroke.textAlign,
          fontPixelSize:
            typeof fontPixelSize === "number"
              ? normalizeWhiteboardFontPixelSize(fontPixelSize)
              : stroke.fontPixelSize,
          edgeStyle:
            typeof edgeStyle === "string"
              ? normalizeWhiteboardShapeEdge(edgeStyle)
              : stroke.edgeStyle,
          rotation:
            typeof rotation === "number"
              ? normalizeWhiteboardRotation(rotation)
              : stroke.rotation,
        };

  return {
    ...updateWhiteboardTabById(state, targetTabId, (tab) => {
      if (tab.type === "pdf") {
        const targetPageNumber = normalizeWhiteboardPageNumber(pageNumber);
        return {
          ...tab,
          pages: tab.pages.map((page) =>
            page.pageNumber !== targetPageNumber
              ? page
              : {
                  ...page,
                  strokes: page.strokes.map(applyStrokeUpdate),
                },
          ),
        };
      }

      return {
        ...tab,
        strokes: tab.strokes.map(applyStrokeUpdate),
      };
    }),
    activeTabId: targetTabId,
  };
};

const removeWhiteboardStrokeFromState = (state, { tabId, pageNumber, strokeId }) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, tabId);

  return {
    ...updateWhiteboardTabById(state, targetTabId, (tab) => {
      if (tab.type === "pdf") {
        const targetPageNumber = normalizeWhiteboardPageNumber(pageNumber);
        return {
          ...tab,
          pages: tab.pages.map((page) =>
            page.pageNumber !== targetPageNumber
              ? page
              : {
                  ...page,
                  strokes: page.strokes.filter((stroke) => stroke.id !== strokeId),
                },
          ),
        };
      }

      return {
        ...tab,
        strokes: tab.strokes.filter((stroke) => stroke.id !== strokeId),
      };
    }),
    activeTabId: targetTabId,
  };
};

const clearWhiteboardTargetInState = (state, { tabId, pageNumber }) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, tabId);

  return {
    ...updateWhiteboardTabById(state, targetTabId, (tab) => {
      if (tab.type === "pdf") {
        const targetPageNumber = normalizeWhiteboardPageNumber(pageNumber);
        return {
          ...tab,
          pages: tab.pages.map((page) =>
            page.pageNumber !== targetPageNumber ? page : { ...page, strokes: [] },
          ),
        };
      }

      return {
        ...tab,
        strokes: [],
      };
    }),
    activeTabId: targetTabId,
  };
};

const addWhiteboardPdfTabToState = (state, nextTab) => {
  const normalizedTab = normalizeWhiteboardTab({
    ...nextTab,
    type: "pdf",
    pages: [],
    scrollRatio: 0,
    zoom: 1,
    viewportPageNumber: 1,
    viewportPageOffsetRatio: 0,
    viewportLeftRatio: 0,
    viewportVisibleHeightRatio: 0,
    viewportVisibleWidthRatio: 0,
    viewportBaseWidth: WHITEBOARD_MIN_VIEWPORT_BASE_WIDTH,
    selectedPagesMode:
      nextTab.selectedPagesMode ||
      normalizeWhiteboardSelectedPagesMode("custom", nextTab.selectedPages),
    selectedPages: nextTab.selectedPages,
  });
  if (!normalizedTab || normalizedTab.type !== "pdf") {
    return state;
  }

  const filteredTabs = (Array.isArray(state.tabs) ? state.tabs : []).filter(
    (tab) => tab.id !== normalizedTab.id,
  );
  const nextTabs = ensureWhiteboardTabs([...filteredTabs, normalizedTab]).slice(
    0,
    WHITEBOARD_MAX_TABS,
  );

  return {
    ...state,
    isActive: true,
    activeTabId: normalizedTab.id,
    tabs: nextTabs,
  };
};

const addWhiteboardPdfLibraryItemToState = (state, item) => {
  const normalizedItem = normalizeWhiteboardPdfLibraryItem(item);
  if (!normalizedItem) {
    return state;
  }

  const nextLibrary = mergeWhiteboardPdfLibraryItems(state.pdfLibrary, [normalizedItem]);

  return {
    ...state,
    pdfLibrary: nextLibrary,
  };
};

const removeWhiteboardTabFromState = (state, tabId) => {
  const normalizedTabId = normalizeWhiteboardTabId(tabId);
  if (!normalizedTabId || normalizedTabId === WHITEBOARD_BOARD_TAB_ID) {
    return state;
  }

  const nextTabs = ensureWhiteboardTabs(
    (Array.isArray(state.tabs) ? state.tabs : []).filter((tab) => tab.id !== normalizedTabId),
  );

  return {
    ...state,
    tabs: nextTabs,
    activeTabId:
      state.activeTabId === normalizedTabId ? WHITEBOARD_BOARD_TAB_ID : state.activeTabId,
  };
};

const setWhiteboardActiveTabInState = (state, tabId) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, tabId);
  return {
    ...state,
    isActive: true,
    activeTabId: targetTabId,
  };
};

const setWhiteboardPdfViewportInState = (
  state,
  {
    tabId,
    scrollRatio,
    zoom,
    viewportPageNumber,
    viewportPageOffsetRatio,
    viewportLeftRatio,
    viewportVisibleHeightRatio,
    viewportVisibleWidthRatio,
    viewportBaseWidth,
  },
) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, tabId);

  return {
    ...updateWhiteboardTabById(state, targetTabId, (tab) =>
      tab.type !== "pdf"
        ? tab
        : {
            ...tab,
            scrollRatio:
              typeof scrollRatio === "undefined"
                ? tab.scrollRatio
                : normalizeWhiteboardScrollRatio(scrollRatio),
            zoom:
              typeof zoom === "undefined"
                ? normalizeWhiteboardZoom(tab.zoom)
                : normalizeWhiteboardZoom(zoom),
            viewportPageNumber:
              typeof viewportPageNumber === "undefined"
                ? normalizeWhiteboardPageNumber(tab.viewportPageNumber)
                : normalizeWhiteboardPageNumber(viewportPageNumber),
            viewportPageOffsetRatio:
              typeof viewportPageOffsetRatio === "undefined"
                ? normalizeWhiteboardScrollRatio(tab.viewportPageOffsetRatio)
                : normalizeWhiteboardScrollRatio(viewportPageOffsetRatio),
            viewportLeftRatio:
              typeof viewportLeftRatio === "undefined"
                ? normalizeWhiteboardViewportLeftRatio(tab.viewportLeftRatio)
                : normalizeWhiteboardViewportLeftRatio(viewportLeftRatio),
            viewportVisibleHeightRatio:
              typeof viewportVisibleHeightRatio === "undefined"
                ? normalizeWhiteboardScrollRatio(tab.viewportVisibleHeightRatio)
                : normalizeWhiteboardScrollRatio(viewportVisibleHeightRatio),
            viewportVisibleWidthRatio:
              typeof viewportVisibleWidthRatio === "undefined"
                ? normalizeWhiteboardViewportVisibleWidthRatio(tab.viewportVisibleWidthRatio)
                : normalizeWhiteboardViewportVisibleWidthRatio(viewportVisibleWidthRatio),
            viewportBaseWidth:
              typeof viewportBaseWidth === "undefined"
                ? normalizeWhiteboardViewportBaseWidth(tab.viewportBaseWidth)
                : normalizeWhiteboardViewportBaseWidth(viewportBaseWidth),
          },
    ),
    activeTabId: targetTabId,
  };
};

const setWhiteboardBoardZoomInState = (
  state,
  { tabId, zoom, viewportBaseWidth, viewportBaseHeight },
) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, tabId);

  return {
    ...updateWhiteboardTabById(state, targetTabId, (tab) =>
      tab.type !== "board"
        ? tab
        : {
            ...tab,
            zoom:
              typeof zoom === "undefined"
                ? normalizeWhiteboardZoom(tab.zoom)
                : normalizeWhiteboardZoom(zoom),
            viewportBaseWidth:
              typeof viewportBaseWidth === "undefined"
                ? normalizeWhiteboardViewportBaseWidth(tab.viewportBaseWidth)
                : normalizeWhiteboardViewportBaseWidth(viewportBaseWidth),
            viewportBaseHeight:
              typeof viewportBaseHeight === "undefined"
                ? normalizeWhiteboardViewportBaseHeight(tab.viewportBaseHeight)
                : normalizeWhiteboardViewportBaseHeight(viewportBaseHeight),
          },
    ),
    activeTabId: targetTabId,
  };
};

const getNavigatorConnectionState = () => {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  return {
    saveData: Boolean(connection?.saveData),
    effectiveType: connection?.effectiveType || "unknown",
    downlink: Number(connection?.downlink || 0),
  };
};

const isLikelyMobileDevice = () => {
  if (typeof window === "undefined") return false;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches;
  const mobileViewport = window.matchMedia?.(MOBILE_CAMERA_MEDIA_QUERY).matches;
  return Boolean(coarsePointer && mobileViewport);
};

const resolveCallQualityProfile = ({
  peerCount,
  isScreenSharing,
  networkQuality,
  navigatorState,
}) => {
  const isVeryWeakNetwork =
    networkQuality === "poor" ||
    navigatorState.saveData ||
    navigatorState.effectiveType === "slow-2g" ||
    navigatorState.effectiveType === "2g" ||
    (navigatorState.downlink > 0 && navigatorState.downlink < 1);

  if (isScreenSharing) {
    if (isVeryWeakNetwork || peerCount >= 8) {
      return CALL_QUALITY_PROFILES.screenPoor;
    }
    if (
      networkQuality === "limited" ||
      navigatorState.effectiveType === "3g" ||
      peerCount >= 5
    ) {
      return CALL_QUALITY_PROFILES.screenLimited;
    }
    return CALL_QUALITY_PROFILES.screen;
  }

  if (isVeryWeakNetwork) return CALL_QUALITY_PROFILES.poor;
  if (peerCount >= 6 || networkQuality === "limited") {
    return CALL_QUALITY_PROFILES.crowded;
  }
  return CALL_QUALITY_PROFILES.balanced;
};

/**
 * useWebRTC — self-hosted WebRTC hook
 *
 * @param {string}  roomId       – unique room identifier
 * @param {string}  displayName  – local user's display name
 * @param {boolean} enabled      – start when true
 * @param {boolean} isCreator    – creator vs guest
 * @param {boolean} isPrivate    – creator only: create private room (approval required)
 *
 * Returns:
 *   localStream      – MediaStream of local camera+mic
 *   remoteStreams     – Array<{ peerId, stream, displayName }>
 *   knockRequests     – Array<{ peerId, displayName }> (creator only)
 *   approveKnock(peerId)  – approve a waiting guest
 *   rejectKnock(peerId)   – reject a waiting guest
 *   joinStatus        – 'idle' | 'connecting' | 'waiting' | 'rejected' | 'joined'
 *   isMicOn / isCamOn
 *   toggleMic / toggleCam
 *   leaveCall
 *   error
 */
export function useWebRTC({
  roomId,
  displayName,
  enabled,
  isCreator = false,
  isPrivate = false,
  chatTitle = "",
  initialMicOn = true,
  initialCamOn = true,
}) {
  const currentUser = useAuthStore((state) => state.user);
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionsRef = useRef({});
  const iceConfigRef = useRef(buildFallbackIceConfig());

  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [remotePeerStates, setRemotePeerStates] = useState({});
  const [screenStream, setScreenStream] = useState(null);
  const [remoteScreenStreams, setRemoteScreenStreams] = useState([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [knockRequests, setKnockRequests] = useState([]);
  const [isMicOn, setIsMicOn] = useState(initialMicOn);
  const [isCamOn, setIsCamOn] = useState(initialCamOn);
  const [micLocked, setMicLocked] = useState(false);
  const [camLocked, setCamLocked] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [raisedHands, setRaisedHands] = useState(new Set());
  const [joinStatus, setJoinStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [roomTitle, setRoomTitle] = useState(chatTitle || "");
  const [roomIsPrivate, setRoomIsPrivate] = useState(isPrivate);
  const [remoteIsRecording, setRemoteIsRecording] = useState(false);
  const [networkQuality, setNetworkQuality] = useState("good");
  const [qualityProfile, setQualityProfile] = useState(
    CALL_QUALITY_PROFILES.balanced,
  );
  const [whiteboardState, setWhiteboardState] = useState(() =>
    createInitialWhiteboardState(),
  );
  const [cameraFacingMode, setCameraFacingMode] = useState("user");
  const [videoInputCount, setVideoInputCount] = useState(0);
  const screenStreamRef = useRef(null);
  const knownStreamsRef = useRef({});
  const knownPeerNamesRef = useRef({});
  const candidateQueuesRef = useRef({}); // Store candidates until remote sdp is set
  const screenPeerConnectionsRef = useRef({});
  const screenCandidateQueuesRef = useRef({});
  const negotiationTasksRef = useRef({});
  const makingOfferRef = useRef({});
  const ignoreOfferRef = useRef({});
  const settingRemoteAnswerPendingRef = useRef({});
  const mediaSendersRef = useRef({});
  const peerDisconnectTimeoutsRef = useRef({});
  const screenPeerDisconnectTimeoutsRef = useRef({});
  const statsIntervalRef = useRef(null);
  const qualityProfileRef = useRef(CALL_QUALITY_PROFILES.balanced);
  const cameraFacingModeRef = useRef("user");
  const whiteboardStateRef = useRef(createInitialWhiteboardState());
  const storedPdfLibraryRef = useRef([]);
  const currentUserId = String(currentUser?._id || currentUser?.id || "");
  const whiteboardPdfTabLimit = getTierLimit(APP_LIMITS.whiteboardPdfTabs, currentUser);
  const whiteboardPdfLibraryBytesLimit = getTierLimit(
    APP_LIMITS.whiteboardPdfLibraryBytes,
    currentUser,
  );

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const syncRemotePeerDisplayName = useCallback((peerId, name) => {
    const nextName =
      typeof name === "string" && name.trim()
        ? name.trim()
        : knownPeerNamesRef.current[peerId] || "";
    if (!peerId || !nextName) {
      return;
    }

    knownPeerNamesRef.current[peerId] = nextName;
    setRemoteStreams((prev) =>
      prev.map((item) =>
        item.peerId === peerId ? { ...item, displayName: nextName } : item,
      ),
    );
    setRemoteScreenStreams((prev) =>
      prev.map((item) =>
        item.peerId === peerId ? { ...item, displayName: nextName } : item,
      ),
    );
    setRemotePeerStates((prev) => ({
      ...prev,
      [peerId]: {
        ...(prev[peerId] || {}),
        displayName: nextName,
      },
    }));
  }, []);

  const addRemoteStream = useCallback((peerId, stream, name) => {
    const resolvedName =
      (typeof name === "string" && name.trim()) ||
      knownPeerNamesRef.current[peerId] ||
      peerId;
    setRemoteStreams((prev) => {
      if (prev.find((r) => r.peerId === peerId)) {
        return prev.map((r) =>
          r.peerId === peerId
            ? { ...r, stream, displayName: resolvedName }
            : r,
        );
      }
      return [...prev, { peerId, stream, displayName: resolvedName }];
    });
    setRemotePeerStates((prev) => ({
      ...prev,
      [peerId]: {
        hasVideo: Boolean(stream?.getVideoTracks?.().length),
        hasAudio: Boolean(stream?.getAudioTracks?.().length),
        videoMuted: false,
        audioMuted: false,
        connectionState: prev[peerId]?.connectionState || "connecting",
        displayName: resolvedName || prev[peerId]?.displayName || peerId,
      },
    }));
  }, []);

  const updateRemotePeerState = useCallback((peerId, patch) => {
    setRemotePeerStates((prev) => ({
      ...prev,
      [peerId]: {
        ...(prev[peerId] || {}),
        ...patch,
      },
    }));
  }, []);

  const commitWhiteboardState = useCallback((updater) => {
    setWhiteboardState((prev) => {
      const nextState =
        typeof updater === "function" ? updater(prev) : updater;
      whiteboardStateRef.current = nextState;
      return nextState;
    });
  }, []);

  const clearPeerDisconnectTimeout = useCallback((peerId, isScreen = false) => {
    const timeoutMap = isScreen
      ? screenPeerDisconnectTimeoutsRef.current
      : peerDisconnectTimeoutsRef.current;
    const timeoutId = timeoutMap[peerId];
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      delete timeoutMap[peerId];
    }
  }, []);

  const schedulePeerDisconnectCleanup = useCallback(
    (peerId, cleanup, isScreen = false) => {
      const timeoutMap = isScreen
        ? screenPeerDisconnectTimeoutsRef.current
        : peerDisconnectTimeoutsRef.current;
      if (timeoutMap[peerId]) {
        return;
      }

      timeoutMap[peerId] = window.setTimeout(() => {
        delete timeoutMap[peerId];
        cleanup(peerId);
      }, 8000);
    },
    [],
  );

  const getPeerConnectionSender = useCallback((pc, kind, preferredTrackId = "") => {
    if (!pc || typeof pc.getSenders !== "function") {
      return null;
    }

    const activeSenders = pc.getSenders();
    const trackedSender = mediaSendersRef.current?.[pc.__jammPeerId || ""]?.[kind];
    if (trackedSender && activeSenders.includes(trackedSender)) {
      return trackedSender;
    }

    const preferredSender =
      preferredTrackId &&
      activeSenders
        .find(
          (sender) =>
            sender.track?.kind === kind && sender.track?.id === preferredTrackId,
        );
    if (preferredSender) {
      return preferredSender;
    }

    const directSender = activeSenders.find((sender) => sender.track?.kind === kind);
    if (directSender) {
      return directSender;
    }

    return null;
  }, []);

  const renegotiatePeerConnection = useCallback(
    async (peerId, pc) => {
      if (
        !peerId ||
        !pc ||
        !socketRef.current ||
        pc.signalingState !== "stable" ||
        makingOfferRef.current[peerId]
      ) {
        return false;
      }

      if (negotiationTasksRef.current[peerId]) {
        return negotiationTasksRef.current[peerId];
      }

      const task = (async () => {
        try {
          if (pc.signalingState !== "stable") {
            return false;
          }

          makingOfferRef.current[peerId] = true;
          const offer = await pc.createOffer();
          if (pc.signalingState !== "stable") {
            return false;
          }

          await pc.setLocalDescription(offer);
          socketRef.current?.emit("offer", { targetId: peerId, sdp: offer });
          return true;
        } catch {
          return false;
        } finally {
          makingOfferRef.current[peerId] = false;
          delete negotiationTasksRef.current[peerId];
        }
      })();

      negotiationTasksRef.current[peerId] = task;
      return task;
    },
    [],
  );

  const resetWhiteboardState = useCallback(() => {
    const nextState = createInitialWhiteboardState();
    whiteboardStateRef.current = nextState;
    setWhiteboardState(nextState);
  }, []);

  useEffect(() => {
    const storedLibrary = readStoredWhiteboardPdfLibrary(currentUserId);
    storedPdfLibraryRef.current = storedLibrary;
    if (storedLibrary.length === 0) {
      return;
    }

    commitWhiteboardState((prev) => ({
      ...prev,
      pdfLibrary: mergeWhiteboardPdfLibraryItems(prev.pdfLibrary, storedLibrary),
    }));
  }, [commitWhiteboardState, currentUserId]);

  useEffect(() => {
    const mergedLibrary = mergeWhiteboardPdfLibraryItems(
      storedPdfLibraryRef.current,
      whiteboardState.pdfLibrary,
    );
    storedPdfLibraryRef.current = mergedLibrary;
    writeStoredWhiteboardPdfLibrary(currentUserId, mergedLibrary);
  }, [currentUserId, whiteboardState.pdfLibrary]);

  const removeRemoteStream = useCallback((peerId) => {
    clearPeerDisconnectTimeout(peerId);
    setRemoteStreams((prev) => prev.filter((r) => r.peerId !== peerId));
    setRemoteScreenStreams((prev) => prev.filter((r) => r.peerId !== peerId));
    setRemotePeerStates((prev) => {
      const next = { ...prev };
      delete next[peerId];
      return next;
    });
    delete knownStreamsRef.current[peerId];
    if (peerConnectionsRef.current[peerId]) {
      peerConnectionsRef.current[peerId].close();
      delete peerConnectionsRef.current[peerId];
    }
    if (screenPeerConnectionsRef.current[peerId]) {
      screenPeerConnectionsRef.current[peerId].close();
      delete screenPeerConnectionsRef.current[peerId];
    }
    delete candidateQueuesRef.current[peerId];
    delete screenCandidateQueuesRef.current[peerId];
    delete negotiationTasksRef.current[peerId];
    delete makingOfferRef.current[peerId];
    delete ignoreOfferRef.current[peerId];
    delete settingRemoteAnswerPendingRef.current[peerId];
    delete mediaSendersRef.current[peerId];
  }, [clearPeerDisconnectTimeout]);

  const removeRemoteScreenStream = useCallback((peerId) => {
    clearPeerDisconnectTimeout(peerId, true);
    setRemoteScreenStreams((prev) => prev.filter((r) => r.peerId !== peerId));
    if (screenPeerConnectionsRef.current[peerId]) {
      screenPeerConnectionsRef.current[peerId].close();
      delete screenPeerConnectionsRef.current[peerId];
    }
    delete screenCandidateQueuesRef.current[peerId];
  }, [clearPeerDisconnectTimeout]);

  const emitLocalMediaState = useCallback(() => {
    if (!socketRef.current || !roomId) {
      return;
    }

    const audioTrack = localStreamRef.current?.getAudioTracks?.()[0] || null;
    const videoTrack = localStreamRef.current?.getVideoTracks?.()[0] || null;

    socketRef.current.emit("media-state-changed", {
      roomId,
      hasAudio: Boolean(audioTrack),
      hasVideo: Boolean(videoTrack),
      audioMuted: !audioTrack || audioTrack.enabled === false,
      videoMuted: !videoTrack || videoTrack.enabled === false,
    });
  }, [roomId]);

  const refreshVideoInputCount = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return 0;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const count = devices.filter((device) => device.kind === "videoinput").length;
      setVideoInputCount(count);
      return count;
    } catch {
      return 0;
    }
  }, []);

  const buildCameraConstraints = useCallback(
    (facingMode = cameraFacingModeRef.current) => ({
      width: { ideal: 640, max: 640 },
      height: { ideal: 360, max: 360 },
      frameRate: { ideal: 18, max: 18 },
      ...(isLikelyMobileDevice() ? { facingMode: { ideal: facingMode } } : {}),
    }),
    [],
  );

  const syncLocalStreamState = useCallback((sourceStream) => {
    const nextStream =
      sourceStream instanceof MediaStream
        ? new MediaStream(sourceStream.getTracks())
        : new MediaStream();
    localStreamRef.current = nextStream;
    setLocalStream(nextStream);
    return nextStream;
  }, []);

  const applyMediaOptimization = useCallback(async (profile) => {
    const stream = localStreamRef.current;
    if (!stream) return;
    const hasActiveScreenShare = Boolean(isScreenSharing || screenStreamRef.current);
    const screenProfile =
      hasActiveScreenShare && profile.key.startsWith("screen")
        ? profile
        : CALL_QUALITY_PROFILES.screenLimited;
    const cameraProfile = hasActiveScreenShare
      ? CALL_QUALITY_PROFILES.screenCamera
      : profile;

    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      try {
        audioTrack.contentHint = "speech";
        await audioTrack.applyConstraints({
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        });
      } catch {}
    }

    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      try {
        videoTrack.contentHint = "motion";
        await videoTrack.applyConstraints({
          width: { ideal: cameraProfile.width, max: cameraProfile.width },
          height: { ideal: cameraProfile.height, max: cameraProfile.height },
          frameRate: { ideal: cameraProfile.frameRate, max: cameraProfile.frameRate },
        });
      } catch {}
    }

    const screenTrack = screenStreamRef.current?.getVideoTracks?.()[0];
    if (screenTrack) {
      try {
        screenTrack.contentHint = "detail";
        await screenTrack.applyConstraints({
          width: { ideal: screenProfile.width, max: screenProfile.width },
          height: { ideal: screenProfile.height, max: screenProfile.height },
          frameRate: { ideal: screenProfile.frameRate, max: screenProfile.frameRate },
        });
      } catch {}
    }

    const senderTasks = [];

    [
      ...Object.values(peerConnectionsRef.current),
      ...Object.values(screenPeerConnectionsRef.current),
    ].forEach((pc) => {
      pc.getSenders().forEach((sender) => {
        if (!sender.track) return;
        senderTasks.push(
          (async () => {
            const params = sender.getParameters();
            const encodings =
              params.encodings && params.encodings.length > 0
                ? [...params.encodings]
                : [{}];

            if (sender.track.kind === "audio") {
              encodings[0] = {
                ...encodings[0],
                maxBitrate: profile.audioBitrate,
                networkPriority: "high",
              };
              params.encodings = encodings;
            }

            if (screenTrack && sender.track.id === screenTrack.id) {
              encodings[0] = {
                ...encodings[0],
                maxBitrate: screenProfile.videoBitrate,
                maxFramerate: screenProfile.frameRate,
                scaleResolutionDownBy: screenProfile.scaleResolutionDownBy,
                networkPriority: "high",
                priority: "high",
              };
              params.encodings = encodings;
              params.degradationPreference = "maintain-resolution";
            } else if (sender.track.id === videoTrack?.id) {
              encodings[0] = {
                ...encodings[0],
                maxBitrate: cameraProfile.videoBitrate,
                maxFramerate: cameraProfile.frameRate,
                scaleResolutionDownBy: cameraProfile.scaleResolutionDownBy,
                networkPriority: hasActiveScreenShare ? "low" : "medium",
              };
              params.encodings = encodings;
              params.degradationPreference = "maintain-framerate";
            }

            try {
              await sender.setParameters(params);
            } catch {}
          })(),
        );
      });
    });

    await Promise.all(senderTasks);
  }, [isScreenSharing]);

  const replaceCameraTrack = useCallback(
    async (nextTrack, { enabled = true } = {}) => {
      const stream = localStreamRef.current;
      if (!stream || !nextTrack) return false;

      const previousTrack = stream.getVideoTracks()[0] || null;
      nextTrack.enabled = enabled;
      stream.addTrack(nextTrack);
      if (previousTrack) {
        stream.removeTrack(previousTrack);
      }

      const peersToRenegotiate = [];
      const replaceTasks = Object.entries(peerConnectionsRef.current).map(
        async ([peerId, pc]) => {
          const matchingSender = getPeerConnectionSender(
            pc,
            "video",
            previousTrack?.id || "",
          );

        if (matchingSender) {
          try {
            await matchingSender.replaceTrack(nextTrack);
            mediaSendersRef.current[peerId] = {
              ...(mediaSendersRef.current[peerId] || {}),
              video: matchingSender,
            };
            return;
          } catch {}
        }

        try {
          const sender = pc.addTrack(nextTrack, stream);
          mediaSendersRef.current[peerId] = {
            ...(mediaSendersRef.current[peerId] || {}),
            video: sender,
          };
          peersToRenegotiate.push([peerId, pc]);
        } catch {}
      },
      );

      await Promise.all(replaceTasks);
      await Promise.all(
        peersToRenegotiate.map(([peerId, pc]) =>
          renegotiatePeerConnection(peerId, pc),
        ),
      );
      previousTrack?.stop();
      syncLocalStreamState(stream);
      await applyMediaOptimization(qualityProfileRef.current);
      return true;
    },
    [
      applyMediaOptimization,
      getPeerConnectionSender,
      renegotiatePeerConnection,
      syncLocalStreamState,
    ],
  );

  const ensureLocalAudioTrack = useCallback(async () => {
    const stream = localStreamRef.current;
    if (!stream || !navigator.mediaDevices?.getUserMedia) return false;

      const existingTrack = stream.getAudioTracks()[0] || null;
    if (existingTrack) {
      existingTrack.enabled = true;
      setIsMicOn(true);
      emitLocalMediaState();
      return true;
    }

    try {
      const nextStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
        video: false,
      });
      const nextTrack = nextStream.getAudioTracks()[0];
      if (!nextTrack) {
        nextStream.getTracks().forEach((track) => track.stop());
        return false;
      }

      nextTrack.enabled = true;
      stream.addTrack(nextTrack);

      const peersToRenegotiate = [];
      const senderTasks = Object.entries(peerConnectionsRef.current).map(async ([peerId, pc]) => {
        const existingSender = getPeerConnectionSender(pc, "audio");

        if (existingSender) {
          try {
            await existingSender.replaceTrack(nextTrack);
            mediaSendersRef.current[peerId] = {
              ...(mediaSendersRef.current[peerId] || {}),
              audio: existingSender,
            };
            return;
          } catch {}
        }

        try {
          const sender = pc.addTrack(nextTrack, stream);
          mediaSendersRef.current[peerId] = {
            ...(mediaSendersRef.current[peerId] || {}),
            audio: sender,
          };
          peersToRenegotiate.push([peerId, pc]);
        } catch {}
      });

      await Promise.all(senderTasks);
      await Promise.all(
        peersToRenegotiate.map(([peerId, pc]) =>
          renegotiatePeerConnection(peerId, pc),
        ),
      );
      syncLocalStreamState(stream);
      setIsMicOn(true);
      await applyMediaOptimization(qualityProfileRef.current);
      emitLocalMediaState();
      return true;
    } catch (err) {
      console.error("Enable microphone error:", err);
      return false;
    }
  }, [
    applyMediaOptimization,
    emitLocalMediaState,
    getPeerConnectionSender,
    renegotiatePeerConnection,
    syncLocalStreamState,
  ]);

  const disableLocalVideoTrack = useCallback(async () => {
    const stream = localStreamRef.current;
    const currentTrack = stream?.getVideoTracks?.()[0] || null;
    if (!stream || !currentTrack) {
      setIsCamOn(false);
      emitLocalMediaState();
      return true;
    }

    const peersToRenegotiate = [];
    const replaceTasks = Object.entries(peerConnectionsRef.current).map(async ([peerId, pc]) => {
      const videoSender = getPeerConnectionSender(
        pc,
        "video",
        currentTrack.id,
      );

      if (!videoSender) {
        return;
      }

      try {
        await videoSender.replaceTrack(null);
        mediaSendersRef.current[peerId] = {
          ...(mediaSendersRef.current[peerId] || {}),
          video: videoSender,
        };
        peersToRenegotiate.push([peerId, pc]);
      } catch {}
    });

    await Promise.all(replaceTasks);
    await Promise.all(
      peersToRenegotiate.map(([peerId, pc]) =>
        renegotiatePeerConnection(peerId, pc),
      ),
    );
    stream.removeTrack(currentTrack);
    currentTrack.stop();
    syncLocalStreamState(stream);
    setIsCamOn(false);
    emitLocalMediaState();
    return true;
  }, [
    emitLocalMediaState,
    getPeerConnectionSender,
    renegotiatePeerConnection,
    syncLocalStreamState,
  ]);

  const ensureLocalVideoTrack = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) return false;

    const existingTrack = localStreamRef.current?.getVideoTracks()[0] || null;
    if (existingTrack) {
      existingTrack.enabled = true;
      setIsCamOn(true);
      emitLocalMediaState();
      return true;
    }

    try {
      const nextStream = await navigator.mediaDevices.getUserMedia({
        video: buildCameraConstraints(),
        audio: false,
      });
      const nextTrack = nextStream.getVideoTracks()[0];
      if (!nextTrack) {
        nextStream.getTracks().forEach((track) => track.stop());
        return false;
      }

      const replaced = await replaceCameraTrack(nextTrack, { enabled: true });
      if (!replaced) {
        nextTrack.stop();
        return false;
      }

      setIsCamOn(true);
      await refreshVideoInputCount();
      emitLocalMediaState();
      return true;
    } catch (err) {
      console.error("Enable camera error:", err);
      return false;
    }
  }, [buildCameraConstraints, emitLocalMediaState, refreshVideoInputCount, replaceCameraTrack]);

  const refreshQualityProfile = useCallback(async () => {
    const peerCount =
      remoteStreams.length + remoteScreenStreams.length + (isScreenSharing ? 1 : 0);
    const navigatorState = getNavigatorConnectionState();
    const nextProfile = resolveCallQualityProfile({
      peerCount,
      isScreenSharing,
      networkQuality,
      navigatorState,
    });

    if (qualityProfileRef.current.key === nextProfile.key) return;
    qualityProfileRef.current = nextProfile;
    setQualityProfile(nextProfile);
    await applyMediaOptimization(nextProfile);
  }, [
    applyMediaOptimization,
    isScreenSharing,
    networkQuality,
    remoteScreenStreams.length,
    remoteStreams.length,
  ]);

  const evaluateConnectionHealth = useCallback(async () => {
    let nextQuality = "good";

    for (const pc of Object.values(peerConnectionsRef.current)) {
      try {
        const stats = await pc.getStats();
        let rtt = 0;
        let availableBitrate = 0;

        stats.forEach((report) => {
          if (
            report.type === "candidate-pair" &&
            report.state === "succeeded" &&
            report.nominated
          ) {
            rtt = Math.max(rtt, Number(report.currentRoundTripTime || 0));
            availableBitrate = Math.max(
              availableBitrate,
              Number(report.availableOutgoingBitrate || 0),
            );
          }
        });

        if (rtt > 0.45 || (availableBitrate > 0 && availableBitrate < 180_000)) {
          nextQuality = "poor";
          break;
        }

        if (
          nextQuality !== "poor" &&
          (rtt > 0.25 || (availableBitrate > 0 && availableBitrate < 420_000))
        ) {
          nextQuality = "limited";
        }
      } catch {}
    }

    setNetworkQuality((prev) => (prev === nextQuality ? prev : nextQuality));
  }, []);

  // ─── Peer connection factory ──────────────────────────────────────────────────

  const createPeerConnection = useCallback(
    (peerId, peerDisplayName) => {
      const pc = new RTCPeerConnection(iceConfigRef.current);
      pc.__jammPeerId = peerId;
      updateRemotePeerState(peerId, {
        displayName: peerDisplayName || peerId,
        connectionState: "connecting",
      });

      mediaSendersRef.current[peerId] = {
        audio: null,
        video: null,
      };

      if (localStreamRef.current) {
        localStreamRef.current.getAudioTracks().forEach((track) => {
          try {
            const sender = pc.addTrack(track, localStreamRef.current);
            mediaSendersRef.current[peerId].audio = sender;
          } catch {}
        });
        localStreamRef.current.getVideoTracks().forEach((track) => {
          try {
            const sender = pc.addTrack(track, localStreamRef.current);
            mediaSendersRef.current[peerId].video = sender;
          } catch {}
        });
      }

      pc.ontrack = (e) => {
        const [s] = e.streams;
        if (!s) return;

        const syncTrackState = () => {
          const videoTracks = s.getVideoTracks();
          const audioTracks = s.getAudioTracks();

          updateRemotePeerState(peerId, {
            hasVideo: videoTracks.some((track) => track.readyState === "live"),
            hasAudio: audioTracks.some((track) => track.readyState === "live"),
            videoMuted:
              videoTracks.length > 0
                ? videoTracks.every(
                    (track) =>
                      track.readyState !== "live" || track.muted === true,
                  )
                : true,
            audioMuted:
              audioTracks.length > 0
                ? audioTracks.every(
                    (track) =>
                      track.readyState !== "live" || track.muted === true,
                  )
                : true,
            });
        };

        s.onaddtrack = syncTrackState;
        s.onremovetrack = syncTrackState;
        [...s.getVideoTracks(), ...s.getAudioTracks()].forEach((track) => {
          track.onmute = syncTrackState;
          track.onunmute = syncTrackState;
          track.onended = syncTrackState;
        });
        syncTrackState();

        // Main peer connection always carries the participant camera/mic stream.
        // Screen share uses the dedicated screen peer connection below.
        knownStreamsRef.current[peerId] = s.id;
        addRemoteStream(peerId, s, peerDisplayName);
      };

      pc.onicecandidate = (e) => {
        if (e.candidate && socketRef.current) {
          socketRef.current.emit("ice-candidate", {
            targetId: peerId,
            candidate: e.candidate,
          });
        }
      };

      pc.onconnectionstatechange = () => {
        updateRemotePeerState(peerId, {
          connectionState: pc.connectionState,
        });
        if (["connected", "completed"].includes(pc.connectionState)) {
          clearPeerDisconnectTimeout(peerId);
          return;
        }

        if (pc.connectionState === "disconnected") {
          try {
            pc.restartIce?.();
          } catch {}
          schedulePeerDisconnectCleanup(peerId, removeRemoteStream);
          return;
        }

        if (["failed", "closed"].includes(pc.connectionState)) {
          clearPeerDisconnectTimeout(peerId);
          removeRemoteStream(peerId);
        }
      };

      peerConnectionsRef.current[peerId] = pc;
      return pc;
    },
    [
      addRemoteStream,
      clearPeerDisconnectTimeout,
      removeRemoteStream,
      schedulePeerDisconnectCleanup,
      updateRemotePeerState,
    ],
  );

  const createScreenPeerConnection = useCallback(
    (peerId, peerDisplayName, { initiator = false } = {}) => {
      const existing = screenPeerConnectionsRef.current[peerId];
      if (existing) {
        return existing;
      }

      const pc = new RTCPeerConnection(iceConfigRef.current);

      if (initiator && screenStreamRef.current) {
        screenStreamRef.current
          .getTracks()
          .forEach((track) => pc.addTrack(track, screenStreamRef.current));
      }

      pc.ontrack = (event) => {
        const [stream] = event.streams;
        if (!stream) return;

        setRemoteScreenStreams((prev) => {
          if (prev.find((item) => item.peerId === peerId)) {
            return prev.map((item) =>
              item.peerId === peerId
                ? {
                    ...item,
                    stream,
                    displayName:
                      peerDisplayName ||
                      knownPeerNamesRef.current[peerId] ||
                      item.displayName,
                  }
                : item,
            );
          }

          return [
            ...prev,
            {
              peerId,
              stream,
              displayName: peerDisplayName || knownPeerNamesRef.current[peerId] || peerId,
            },
          ];
        });
      };

      pc.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit("screen-ice-candidate", {
            targetId: peerId,
            candidate: event.candidate,
          });
        }
      };

      pc.onconnectionstatechange = () => {
        if (["connected", "completed"].includes(pc.connectionState)) {
          clearPeerDisconnectTimeout(peerId, true);
          return;
        }

        if (pc.connectionState === "disconnected") {
          schedulePeerDisconnectCleanup(peerId, removeRemoteScreenStream, true);
          return;
        }

        if (["failed", "closed"].includes(pc.connectionState)) {
          clearPeerDisconnectTimeout(peerId, true);
          removeRemoteScreenStream(peerId);
        }
      };

      screenPeerConnectionsRef.current[peerId] = pc;
      return pc;
    },
    [clearPeerDisconnectTimeout, removeRemoteScreenStream, schedulePeerDisconnectCleanup],
  );

  const flushScreenCandidateQueue = useCallback(async (peerId) => {
    const pc = screenPeerConnectionsRef.current[peerId];
    const queue = screenCandidateQueuesRef.current[peerId] || [];
    if (!pc || !queue.length || !pc.remoteDescription?.type) {
      return;
    }

    while (queue.length > 0) {
      const candidate = queue.shift();
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch {}
    }
  }, []);

  // ─── Socket signaling listeners ──────────────────────────────────────────────

  const attachSignalingListeners = useCallback(
    (socket) => {
      socket.on("offer", async ({ senderId, sdp }) => {
        let pc = peerConnectionsRef.current[senderId];
        if (!pc) {
          pc = createPeerConnection(
            senderId,
            knownPeerNamesRef.current[senderId] || senderId,
          );
        }
        const politePeer =
          String(socket.id || "").localeCompare(String(senderId || "")) > 0;
        const readyForOffer =
          !makingOfferRef.current[senderId] &&
          (pc.signalingState === "stable" ||
            settingRemoteAnswerPendingRef.current[senderId]);
        const offerCollision = !readyForOffer;

        ignoreOfferRef.current[senderId] = !politePeer && offerCollision;
        if (ignoreOfferRef.current[senderId]) {
          return;
        }

        if (offerCollision && pc.signalingState !== "stable") {
          try {
            await pc.setLocalDescription({ type: "rollback" });
          } catch {
            return;
          }
        }

        await pc.setRemoteDescription(new RTCSessionDescription(sdp));

        // Process queued ice candidates
        const queue = candidateQueuesRef.current[senderId] || [];
        while (queue.length > 0) {
          const cand = queue.shift();
          await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
        }

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { targetId: senderId, sdp: answer });
      });

      socket.on("answer", async ({ senderId, sdp }) => {
        const pc = peerConnectionsRef.current[senderId];
        if (pc) {
          if (pc.signalingState !== "have-local-offer") {
            return;
          }
          settingRemoteAnswerPendingRef.current[senderId] = true;
          try {
            await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          } finally {
            settingRemoteAnswerPendingRef.current[senderId] = false;
          }
          // Process queued ice candidates
          const queue = candidateQueuesRef.current[senderId] || [];
          while (queue.length > 0) {
            const cand = queue.shift();
            await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
          }
        }
      });

      socket.on("ice-candidate", async ({ senderId, candidate }) => {
        const pc = peerConnectionsRef.current[senderId];
        if (pc && pc.remoteDescription && pc.remoteDescription.type) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch {}
        } else {
          // Queue candidates if connection not ready for them
          if (!candidateQueuesRef.current[senderId]) {
            candidateQueuesRef.current[senderId] = [];
          }
          candidateQueuesRef.current[senderId].push(candidate);
        }
      });

      socket.on("peer-joined", async ({ peerId, displayName: peerName }) => {
        if (peerName) {
          syncRemotePeerDisplayName(peerId, peerName);
        }
        updateRemotePeerState(peerId, {
          displayName: peerName || knownPeerNamesRef.current[peerId] || peerId,
          connectionState: "connecting",
          hasVideo: false,
          hasAudio: false,
          videoMuted: true,
          audioMuted: true,
        });
        const pc = createPeerConnection(peerId, peerName);
        await renegotiatePeerConnection(peerId, pc);

        if (screenStreamRef.current) {
          const screenPc = createScreenPeerConnection(peerId, peerName, {
            initiator: true,
          });
          const screenOffer = await screenPc.createOffer();
          await screenPc.setLocalDescription(screenOffer);
          socket.emit("screen-offer", { targetId: peerId, sdp: screenOffer });
        }
      });

      socket.on("existing-peers", ({ peers }) => {
        (peers || []).forEach((peer) => {
          if (peer?.peerId && peer?.displayName) {
            syncRemotePeerDisplayName(peer.peerId, peer.displayName);
            updateRemotePeerState(peer.peerId, {
              displayName: peer.displayName,
              connectionState: "connecting",
              hasVideo: false,
              hasAudio: false,
              videoMuted: true,
              audioMuted: true,
            });
          }
        });
        // Server confirmed we're in the room
        setJoinStatus("joined");
        // Don't create offers here — existing peers will send us
        // offers via their "peer-joined" handler to avoid glare
      });

      socket.on("peer-left", ({ peerId }) => {
        removeRemoteStream(peerId);
      });

      socket.on(
        "media-state-changed",
        ({ peerId, hasAudio, hasVideo, audioMuted, videoMuted }) => {
          if (typeof peerId !== "string" || !peerId.trim()) {
            return;
          }

          updateRemotePeerState(peerId, {
            ...(typeof hasAudio === "boolean" ? { hasAudio } : {}),
            ...(typeof hasVideo === "boolean" ? { hasVideo } : {}),
            ...(typeof audioMuted === "boolean" ? { audioMuted } : {}),
            ...(typeof videoMuted === "boolean" ? { videoMuted } : {}),
          });
        },
      );

      socket.on("screen-offer", async ({ senderId, sdp }) => {
        const peerName = knownPeerNamesRef.current[senderId] || senderId;
        const pc = createScreenPeerConnection(senderId, peerName);
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        await flushScreenCandidateQueue(senderId);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("screen-answer", { targetId: senderId, sdp: answer });
      });

      socket.on("screen-answer", async ({ senderId, sdp }) => {
        const pc = screenPeerConnectionsRef.current[senderId];
        if (!pc) {
          return;
        }

        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        await flushScreenCandidateQueue(senderId);
      });

      socket.on("screen-ice-candidate", async ({ senderId, candidate }) => {
        const pc = screenPeerConnectionsRef.current[senderId];
        if (pc && pc.remoteDescription && pc.remoteDescription.type) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch {}
        } else {
          if (!screenCandidateQueuesRef.current[senderId]) {
            screenCandidateQueuesRef.current[senderId] = [];
          }
          screenCandidateQueuesRef.current[senderId].push(candidate);
        }
      });
    },
    [
      createPeerConnection,
      createScreenPeerConnection,
      emitLocalMediaState,
      flushScreenCandidateQueue,
      renegotiatePeerConnection,
      removeRemoteStream,
      syncRemotePeerDisplayName,
      updateRemotePeerState,
    ],
  );

  // ─── Main effect ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!enabled || !roomId) return;
    let isMounted = true;

    const start = async () => {
      setJoinStatus("connecting");
      setError(null);

      try {
        if (currentUser?._id || currentUser?.id) {
          try {
            const { data } = await axiosInstance.get("/video/ice-config");
            if (Array.isArray(data?.iceServers) && data.iceServers.length > 0) {
              iceConfigRef.current = { iceServers: data.iceServers };
            } else {
              iceConfigRef.current = buildFallbackIceConfig();
            }
          } catch {
            iceConfigRef.current = buildFallbackIceConfig();
          }
        } else {
          iceConfigRef.current = buildFallbackIceConfig();
        }

        // 1. Get only the tracks that should really start enabled.
        const shouldStartWithMic = Boolean(initialMicOn);
        const shouldStartWithCam = Boolean(initialCamOn);
        const stream =
          shouldStartWithMic || shouldStartWithCam
            ? await navigator.mediaDevices.getUserMedia({
                video: shouldStartWithCam ? buildCameraConstraints() : false,
                audio: shouldStartWithMic
                  ? {
                      echoCancellation: true,
                      noiseSuppression: true,
                      autoGainControl: true,
                      channelCount: 1,
                    }
                  : false,
              })
            : new MediaStream();
        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        syncLocalStreamState(stream);
        await refreshVideoInputCount();
        await applyMediaOptimization(qualityProfileRef.current);

        // Keep state aligned with the tracks we actually opened.
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = shouldStartWithMic;
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) videoTrack.enabled = shouldStartWithCam;
        setIsMicOn(Boolean(audioTrack?.enabled));
        setIsCamOn(Boolean(videoTrack?.enabled));

        // 2. Connect to signaling server
        const socket = io(`${SIGNAL_URL}/video`, {
          transports: ["websocket"],
          withCredentials: true,
        });
        socketRef.current = socket;

        // 3. Attach signaling
        attachSignalingListeners(socket);

        // 4. Creator: knock-request listener
        if (isCreator) {
          socket.on("knock-request", ({ peerId, displayName: guestName }) => {
            setKnockRequests((prev) => {
              const existingIndex = prev.findIndex((item) => item.peerId === peerId);

              if (existingIndex !== -1) {
                return prev.map((item, index) =>
                  index === existingIndex
                    ? { ...item, displayName: guestName || item.displayName }
                    : item,
                );
              }

              return [...prev, { peerId, displayName: guestName }];
            });
          });
        }

        // 5. Guest: approval / rejection listeners
        if (!isCreator) {
          socket.on("waiting-for-approval", () => {
            setJoinStatus("waiting");
          });

          socket.on("knock-approved", ({ mediaLocked }) => {
            setJoinStatus("joined");
            // Safety fallback: older backend may still send a locked flag.
            if (mediaLocked) {
              setMicLocked(true);
              setCamLocked(true);
              const audio = localStreamRef.current?.getAudioTracks()[0];
              if (audio) {
                audio.enabled = false;
                setIsMicOn(false);
              }
              const video = localStreamRef.current?.getVideoTracks()[0];
              if (video) {
                video.enabled = false;
                setIsCamOn(false);
              }
              return;
            }
            setMicLocked(false);
            setCamLocked(false);
          });

          socket.on("knock-rejected", ({ reason }) => {
            setJoinStatus("rejected");
            setError(reason || "Rad etildi");
          });
        }

        // 5b. Listen for room-info (title, isPrivate) from server
        socket.on("room-info", ({ title, isPrivate: nextIsPrivate }) => {
          if (title) setRoomTitle(title);
          if (typeof nextIsPrivate === "boolean") {
            setRoomIsPrivate(nextIsPrivate);
          }
        });

        // 5c. Whiteboard sync
        socket.on("whiteboard-state", (payload) => {
          const nextState = normalizeWhiteboardState(payload);
          const mergedState = {
            ...mergeWhiteboardTabsWithPreservedSelections(
              nextState,
              whiteboardStateRef.current,
            ),
            pdfLibrary: mergeWhiteboardPdfLibraryItems(
              nextState.pdfLibrary,
              storedPdfLibraryRef.current,
            ),
          };
          storedPdfLibraryRef.current = mergedState.pdfLibrary;
          whiteboardStateRef.current = mergedState;
          setWhiteboardState(mergedState);
        });

        socket.on("whiteboard-started", (payload) => {
          commitWhiteboardState((prev) => ({
            ...prev,
            isActive: true,
            ownerPeerId: payload?.ownerPeerId || prev.ownerPeerId,
            ownerDisplayName:
              payload?.ownerDisplayName || prev.ownerDisplayName,
            activeTabId:
              normalizeWhiteboardTabId(payload?.activeTabId) || prev.activeTabId,
          }));
        });

        socket.on("whiteboard-stopped", ({ ownerPeerId }) => {
          commitWhiteboardState((prev) => ({
            ...prev,
            isActive: false,
            ownerPeerId:
              typeof ownerPeerId === "string" ? ownerPeerId : prev.ownerPeerId,
          }));
        });

        socket.on("whiteboard-cleared", () => {
          commitWhiteboardState((prev) =>
            clearWhiteboardTargetInState(prev, {
              tabId: prev.activeTabId,
              pageNumber: 1,
            }),
          );
        });

        socket.on("whiteboard-stroke-started", ({ tabId, pageNumber, stroke }) => {
          const normalizedStroke = normalizeWhiteboardStroke(stroke);
          if (!normalizedStroke) {
            return;
          }

          commitWhiteboardState((prev) =>
            upsertWhiteboardStrokeInState(prev, {
              tabId,
              pageNumber,
              stroke: normalizedStroke,
            }),
          );
        });

        socket.on("whiteboard-stroke-appended", ({ tabId, pageNumber, strokeId, points }) => {
          if (typeof strokeId !== "string" || !strokeId.trim()) {
            return;
          }

          const normalizedPoints = normalizeWhiteboardPoints(points);
          if (normalizedPoints.length === 0) {
            return;
          }

          commitWhiteboardState((prev) =>
            appendWhiteboardStrokePointsInState(prev, {
              tabId,
              pageNumber,
              strokeId,
              points: normalizedPoints,
            }),
          );
        });

        socket.on("whiteboard-stroke-removed", ({ tabId, pageNumber, strokeId }) => {
          if (typeof strokeId !== "string" || !strokeId.trim()) {
            return;
          }

          commitWhiteboardState((prev) =>
            removeWhiteboardStrokeFromState(prev, {
              tabId,
              pageNumber,
              strokeId,
            }),
          );
        });

        socket.on(
          "whiteboard-stroke-updated",
          ({
            tabId,
            pageNumber,
            strokeId,
            point,
            points,
            text,
            color,
            size,
            fillColor,
            fontFamily,
            textSize,
            textAlign,
            fontPixelSize,
            edgeStyle,
            rotation,
          }) => {
            if (typeof strokeId !== "string" || !strokeId.trim()) {
              return;
            }

            commitWhiteboardState((prev) =>
              updateWhiteboardStrokeInState(prev, {
                tabId,
                pageNumber,
                strokeId,
                point: normalizeWhiteboardPoint(point),
                points: normalizeWhiteboardPoints(points, WHITEBOARD_MAX_POINTS_PER_STROKE),
                text: typeof text === "string" ? text.slice(0, WHITEBOARD_MAX_TEXT_CHARS) : undefined,
                color,
                size: typeof size === "number" ? size : undefined,
                fillColor:
                  typeof fillColor === "string"
                    ? normalizeWhiteboardFillColor(fillColor)
                    : undefined,
                fontFamily:
                  typeof fontFamily === "string"
                    ? normalizeWhiteboardTextFontFamily(fontFamily)
                    : undefined,
                textSize:
                  typeof textSize === "string"
                    ? normalizeWhiteboardTextSize(textSize)
                    : undefined,
                textAlign:
                  typeof textAlign === "string"
                    ? normalizeWhiteboardTextAlign(textAlign)
                    : undefined,
                fontPixelSize:
                  typeof fontPixelSize === "number"
                    ? normalizeWhiteboardFontPixelSize(fontPixelSize)
                    : undefined,
                edgeStyle:
                  typeof edgeStyle === "string"
                    ? normalizeWhiteboardShapeEdge(edgeStyle)
                    : undefined,
                rotation:
                  typeof rotation === "number"
                    ? normalizeWhiteboardRotation(rotation)
                    : undefined,
              }),
            );
          },
        );

        // 5d. Screen share signals from peers
        socket.on("screen-share-stopped", ({ peerId: sharerPeerId }) => {
          removeRemoteScreenStream(sharerPeerId);
        });

        // 5e. Recording signals from peers
        socket.on("recording-started", () => setRemoteIsRecording(true));
        socket.on("recording-stopped", () => setRemoteIsRecording(false));

        // 5f. Kicked signal
        socket.on("kicked", () => {
          setError("Siz yaratuvchi tomonidan chiqarib yuborildingiz");
          setJoinStatus("rejected");
          leaveCall();
        });

        // 5g. Creator media control signals
        socket.on("force-mute-mic", () => {
          const t = localStreamRef.current?.getAudioTracks()[0];
          if (t) {
            t.enabled = false;
            setIsMicOn(false);
          }
          setMicLocked(true);
          emitLocalMediaState();
        });
        socket.on("force-mute-cam", () => {
          const t = localStreamRef.current?.getVideoTracks()[0];
          if (t) {
            t.enabled = false;
            setIsCamOn(false);
          }
          setCamLocked(true);
          emitLocalMediaState();
        });
        socket.on("allow-mic", () => {
          setMicLocked(false);
        });
        socket.on("allow-cam", () => {
          setCamLocked(false);
        });

        // 5h. Hand raise signals
        socket.on("hand-raised", ({ peerId: pid }) => {
          setRaisedHands((prev) => new Set([...prev, pid]));
        });
        socket.on("hand-lowered", ({ peerId: pid }) => {
          setRaisedHands((prev) => {
            const s = new Set(prev);
            s.delete(pid);
            return s;
          });
        });

        // 5i. Server-side error (e.g. premium limit, auth failed)
        socket.on("error", ({ message }) => {
          if (!isMounted) return;

          // If Room not found and we are a guest, we have retry logic below
          if (message === "Room not found" && !isCreator) {
            return;
          }

          setError(message || "Server xatosi yuz berdi");
          setJoinStatus("idle");
        });

        socket.on("connect_error", (err) => {
          if (isMounted) {
            setError("Serverga ulanib bo'lmadi: " + err.message);
            setJoinStatus("idle");
          }
        });

        // 6. Join or create room
        if (!isValidMeetRoomId(roomId)) {
          setError("Room ID noto‘g‘ri");
          setJoinStatus("idle");
          return;
        }

        if (isCreator) {
          socket.emit("create-room", {
            roomId,
            displayName,
            isPrivate,
            title: chatTitle,
          });
          socket.once("room-created", () => {
            setJoinStatus("joined");
          });
        } else {
          // Join with retry if room not found (creator might still be creating)
          let retryCount = 0;
          const MAX_RETRIES = 6; // ~10 seconds total

          const join = () => {
            if (!socketRef.current) return;
            socketRef.current.emit("join-room", { roomId, displayName });
          };

          const handleRoomError = ({ message }) => {
            if (message === "Room not found" && isMounted) {
              if (retryCount < MAX_RETRIES) {
                retryCount++;
                console.log(
                  `[useWebRTC] Room not found, retrying join (${retryCount}/${MAX_RETRIES})...`,
                );
                setTimeout(join, 1500); // Retry after 1.5s
              } else {
                setError("Xona topilmadi yoki hali boshlanmagan");
                setJoinStatus("idle");
              }
            }
          };
          socket.on("error", handleRoomError);
          join();
        }
      } catch (err) {
        console.error("[useWebRTC]", err);
        if (isMounted) {
          setError(err.message || "Kamera/mikrofonga ruxsat berilmadi");
          setJoinStatus("idle");
        }
      }
    };

    start();

    return () => {
      isMounted = false;
      Object.values(peerConnectionsRef.current).forEach((pc) => pc.close());
      peerConnectionsRef.current = {};
      Object.values(screenPeerConnectionsRef.current).forEach((pc) => pc.close());
      screenPeerConnectionsRef.current = {};
      screenCandidateQueuesRef.current = {};
      negotiationTasksRef.current = {};
      makingOfferRef.current = {};
      ignoreOfferRef.current = {};
      settingRemoteAnswerPendingRef.current = {};
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;
      }
      setLocalStream(null);
      setRemoteStreams([]);
      setRemotePeerStates({});
      knownPeerNamesRef.current = {};
      setNetworkQuality("good");
      setQualityProfile(CALL_QUALITY_PROFILES.balanced);
      qualityProfileRef.current = CALL_QUALITY_PROFILES.balanced;
      resetWhiteboardState();
      setKnockRequests([]);
      Object.values(peerDisconnectTimeoutsRef.current).forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      Object.values(screenPeerDisconnectTimeoutsRef.current).forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      peerDisconnectTimeoutsRef.current = {};
      screenPeerDisconnectTimeoutsRef.current = {};
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.emit("leave-room", { roomId });
        socketRef.current.disconnect();
      }
    };
  }, [
    enabled,
    roomId,
    displayName,
    isCreator,
    isPrivate,
    attachSignalingListeners,
    buildCameraConstraints,
    commitWhiteboardState,
    currentUser?._id,
    currentUser?.id,
    emitLocalMediaState,
    refreshVideoInputCount,
    removeRemoteScreenStream,
    resetWhiteboardState,
  ]);

  useEffect(() => {
    if (joinStatus !== "joined") {
      return;
    }

    emitLocalMediaState();
  }, [emitLocalMediaState, isCamOn, isMicOn, joinStatus, localStream]);

  // ─── Creator: approve / reject ────────────────────────────────────────────────

  const approveKnock = useCallback(
    (peerId) => {
      if (socketRef.current) {
        socketRef.current.emit("approve-knock", { roomId, peerId });
        setKnockRequests((prev) => prev.filter((r) => r.peerId !== peerId));
      }
    },
    [roomId],
  );

  const rejectKnock = useCallback(
    (peerId) => {
      if (socketRef.current) {
        socketRef.current.emit("reject-knock", { roomId, peerId });
        setKnockRequests((prev) => prev.filter((r) => r.peerId !== peerId));
      }
    },
    [roomId],
  );

  const toggleMic = useCallback(async () => {
    if (micLocked) return; // creator locked
    const t = localStreamRef.current?.getAudioTracks()[0];
    if (t) {
      t.enabled = !t.enabled;
      setIsMicOn(t.enabled);
      emitLocalMediaState();
      return;
    }
    await ensureLocalAudioTrack();
  }, [emitLocalMediaState, ensureLocalAudioTrack, micLocked]);

  const toggleCam = useCallback(async () => {
    if (camLocked) return; // creator locked
    const t = localStreamRef.current?.getVideoTracks()[0];
    if (t) {
      await disableLocalVideoTrack();
      return;
    }
    await ensureLocalVideoTrack();
  }, [camLocked, disableLocalVideoTrack, ensureLocalVideoTrack]);

  const switchCamera = useCallback(async () => {
    if (camLocked) return false;
    if (!isLikelyMobileDevice() || !navigator.mediaDevices?.getUserMedia) {
      return false;
    }

    const currentTrack = localStreamRef.current?.getVideoTracks()[0] || null;
    const nextFacingMode =
      cameraFacingModeRef.current === "user" ? "environment" : "user";

    try {
      const nextStream = await navigator.mediaDevices.getUserMedia({
        video: buildCameraConstraints(nextFacingMode),
        audio: false,
      });
      const nextTrack = nextStream.getVideoTracks()[0];
      if (!nextTrack) {
        nextStream.getTracks().forEach((track) => track.stop());
        return false;
      }

      const replaced = await replaceCameraTrack(nextTrack, {
        enabled: currentTrack?.enabled ?? isCamOn,
      });
      if (!replaced) {
        nextTrack.stop();
        return false;
      }

      cameraFacingModeRef.current = nextFacingMode;
      setCameraFacingMode(nextFacingMode);
      await refreshVideoInputCount();
      return true;
    } catch (err) {
      console.error("Switch camera error:", err);
      return false;
    }
  }, [
    buildCameraConstraints,
    camLocked,
    isCamOn,
    refreshVideoInputCount,
    replaceCameraTrack,
  ]);

  const leaveCall = useCallback(() => {
    try {
      if (socketRef.current) {
        socketRef.current.emit("leave-room", { roomId });
        socketRef.current.disconnect();
      }
      Object.values(peerConnectionsRef.current).forEach((pc) => pc.close());
      peerConnectionsRef.current = {};
      Object.values(screenPeerConnectionsRef.current).forEach((pc) => pc.close());
      screenPeerConnectionsRef.current = {};
      screenCandidateQueuesRef.current = {};
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
      negotiationTasksRef.current = {};
      makingOfferRef.current = {};
      ignoreOfferRef.current = {};
      settingRemoteAnswerPendingRef.current = {};
    } catch (e) {
      console.error("Error in leaveCall:", e);
    } finally {
      setLocalStream(null);
      setScreenStream(null);
      setIsScreenSharing(false);
      setRemoteStreams([]);
      setRemoteScreenStreams([]);
      setRemotePeerStates({});
      setJoinStatus("idle");
      setNetworkQuality("good");
      setQualityProfile(CALL_QUALITY_PROFILES.balanced);
      qualityProfileRef.current = CALL_QUALITY_PROFILES.balanced;
      resetWhiteboardState();
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }
    }
  }, [resetWhiteboardState, roomId]);

  // ─── Screen Share ─────────────────────────────────────────────────────────────

  const toggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
      setScreenStream(null);
      setIsScreenSharing(false);
      Object.values(screenPeerConnectionsRef.current).forEach((pc) => pc.close());
      screenPeerConnectionsRef.current = {};
      screenCandidateQueuesRef.current = {};
      if (socketRef.current) {
        socketRef.current.emit("screen-share-stopped", { roomId });
      }
      await applyMediaOptimization(qualityProfileRef.current);
      return true;
    }

    try {
      const navigatorState = getNavigatorConnectionState();
      const nextScreenProfile = resolveCallQualityProfile({
        peerCount:
          remoteStreams.length +
          remoteScreenStreams.length +
          Object.keys(peerConnectionsRef.current).length +
          1,
        isScreenSharing: true,
        networkQuality,
        navigatorState,
      });
      const screen = await navigator.mediaDevices.getDisplayMedia({
        video: {
          logicalSurface: true,
          cursor: "always",
          width: { ideal: nextScreenProfile.width, max: nextScreenProfile.width },
          height: { ideal: nextScreenProfile.height, max: nextScreenProfile.height },
          frameRate: {
            ideal: nextScreenProfile.frameRate,
            max: nextScreenProfile.frameRate,
          },
        },
        audio: false,
      });
      screenStreamRef.current = screen;
      setScreenStream(screen);
      setIsScreenSharing(true);
      qualityProfileRef.current = nextScreenProfile;
      setQualityProfile(nextScreenProfile);

      screen.getVideoTracks()[0].onended = () => {
        toggleScreenShare();
      };

      await applyMediaOptimization(nextScreenProfile);

      if (socketRef.current) {
        socketRef.current.emit("screen-share-started", { roomId });
      }

      for (const [peerId] of Object.entries(peerConnectionsRef.current)) {
        try {
          const screenPc = createScreenPeerConnection(peerId, knownPeerNamesRef.current[peerId], {
            initiator: true,
          });
          const offer = await screenPc.createOffer();
          await screenPc.setLocalDescription(offer);
          socketRef.current?.emit("screen-offer", { targetId: peerId, sdp: offer });
        } catch {}
      }
      return true;
    } catch (err) {
      console.error("Screen share error:", err);
      return false;
    }
  }, [
    applyMediaOptimization,
    createScreenPeerConnection,
    isScreenSharing,
    networkQuality,
    remoteScreenStreams.length,
    remoteStreams.length,
    roomId,
  ]);

  useEffect(() => {
    refreshQualityProfile();
  }, [refreshQualityProfile]);

  useEffect(() => {
    if (!enabled || joinStatus !== "joined") return undefined;

    evaluateConnectionHealth();
    statsIntervalRef.current = setInterval(evaluateConnectionHealth, 5000);

    return () => {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }
    };
  }, [enabled, evaluateConnectionHealth, joinStatus]);

  // ─── Recording signal ─────────────────────────────────────────────────────────

  const emitRecording = useCallback(
    (started) => {
      if (socketRef.current) {
        socketRef.current.emit(
          started ? "recording-started" : "recording-stopped",
          { roomId },
        );
      }
    },
    [roomId],
  );

  // ─── Creator media controls ─────────────────────────────────────────────────

  const forceMuteMic = useCallback(
    (peerId) => {
      socketRef.current?.emit("force-mute-mic", { roomId, peerId });
      updateRemotePeerState(peerId, {
        hasAudio: true,
        audioMuted: true,
      });
    },
    [roomId, updateRemotePeerState],
  );

  const forceMuteCam = useCallback(
    (peerId) => {
      socketRef.current?.emit("force-mute-cam", { roomId, peerId });
      updateRemotePeerState(peerId, {
        hasVideo: true,
        videoMuted: true,
      });
    },
    [roomId, updateRemotePeerState],
  );

  const allowMic = useCallback(
    (peerId) => {
      socketRef.current?.emit("allow-mic", { roomId, peerId });
      updateRemotePeerState(peerId, {
        hasAudio: true,
        audioMuted: false,
      });
    },
    [roomId, updateRemotePeerState],
  );

  const allowCam = useCallback(
    (peerId) => {
      socketRef.current?.emit("allow-cam", { roomId, peerId });
      updateRemotePeerState(peerId, {
        hasVideo: true,
        videoMuted: false,
      });
    },
    [roomId, updateRemotePeerState],
  );

  const kickPeer = useCallback(
    (peerId) => {
      socketRef.current?.emit("kick-peer", { roomId, peerId });
    },
    [roomId],
  );

  // ─── Hand raise ─────────────────────────────────────────────────────────

  const toggleHandRaise = useCallback(() => {
    const next = !isHandRaised;
    setIsHandRaised(next);
    socketRef.current?.emit(next ? "hand-raised" : "hand-lowered", { roomId });
  }, [isHandRaised, roomId]);

  const setRoomPrivacy = useCallback(
    (nextIsPrivate) => {
      setRoomIsPrivate(Boolean(nextIsPrivate));
      socketRef.current?.emit("set-room-privacy", {
        roomId,
        isPrivate: Boolean(nextIsPrivate),
      });
    },
    [roomId],
  );

  const toggleWhiteboard = useCallback(() => {
    if (!isCreator || !socketRef.current) {
      return false;
    }

    const nextActive = !whiteboardStateRef.current.isActive;
    const ownerPeerId = socketRef.current.id || whiteboardStateRef.current.ownerPeerId;

    commitWhiteboardState((prev) => ({
      ...prev,
      isActive: nextActive,
      ownerPeerId,
      ownerDisplayName: displayName || prev.ownerDisplayName || "Host",
    }));

    socketRef.current.emit(nextActive ? "whiteboard-start" : "whiteboard-stop", {
      roomId,
    });

    return true;
  }, [commitWhiteboardState, displayName, isCreator, roomId]);

  const clearWhiteboard = useCallback(() => {
    if (!isCreator || !socketRef.current) {
      return false;
    }

    const activeTabId = resolveWhiteboardTargetTabId(
      whiteboardStateRef.current,
      whiteboardStateRef.current.activeTabId,
    );

    commitWhiteboardState((prev) =>
      clearWhiteboardTargetInState(prev, {
        tabId: activeTabId,
        pageNumber: 1,
      }),
    );
    socketRef.current.emit("whiteboard-clear", { roomId, tabId: activeTabId });
    return true;
  }, [commitWhiteboardState, isCreator, roomId]);

  const clearWhiteboardPage = useCallback(
    ({ tabId, pageNumber }) => {
      if (!isCreator || !socketRef.current) {
        return false;
      }

      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );

      commitWhiteboardState((prev) =>
        clearWhiteboardTargetInState(prev, {
          tabId: targetTabId,
          pageNumber,
        }),
      );
      socketRef.current.emit("whiteboard-clear", {
        roomId,
        tabId: targetTabId,
        pageNumber,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const undoWhiteboard = useCallback(
    ({ tabId, pageNumber }) => {
      if (!isCreator || !socketRef.current) {
        return false;
      }

      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );
      socketRef.current.emit("whiteboard-undo", {
        roomId,
        tabId: targetTabId,
        pageNumber,
      });
      return true;
    },
    [isCreator, roomId],
  );

  const redoWhiteboard = useCallback(
    ({ tabId, pageNumber }) => {
      if (!isCreator || !socketRef.current) {
        return false;
      }

      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );
      socketRef.current.emit("whiteboard-redo", {
        roomId,
        tabId: targetTabId,
        pageNumber,
      });
      return true;
    },
    [isCreator, roomId],
  );

  const setWhiteboardActiveTab = useCallback(
    (tabId) => {
      if (!isCreator || !socketRef.current) {
        return false;
      }

      const targetTabId = resolveWhiteboardTargetTabId(whiteboardStateRef.current, tabId);
      commitWhiteboardState((prev) => setWhiteboardActiveTabInState(prev, targetTabId));
      socketRef.current.emit("whiteboard-tab-activate", {
        roomId,
        tabId: targetTabId,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const uploadWhiteboardPdf = useCallback(
    async (file) => {
      if (!isCreator || !socketRef.current || !(file instanceof File)) {
        return { ok: false, error: "PDF upload unavailable" };
      }

      const currentLibrary = Array.isArray(whiteboardStateRef.current?.pdfLibrary)
        ? whiteboardStateRef.current.pdfLibrary
        : [];
      const nextLibrary = mergeWhiteboardPdfLibraryItems(currentLibrary, [
        {
          id: `preview-${file.name}-${file.size}`,
          title: file.name.replace(/\.pdf$/i, ""),
          fileUrl: "/preview",
          fileName: file.name,
          fileSize: file.size || 0,
          createdAt: Date.now(),
        },
      ]);
      const nextLibraryBytes = sumWhiteboardPdfLibraryBytes(nextLibrary);

      if (nextLibraryBytes > whiteboardPdfLibraryBytesLimit) {
        return {
          ok: false,
          error: `PDF kutubxona limiti ${formatWhiteboardBytesLabel(
            whiteboardPdfLibraryBytesLimit,
          )}`,
        };
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const { data } = await axiosInstance.post("/courses/upload-media", formData);
        const itemId =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? `pdf-lib-${crypto.randomUUID()}`
            : `pdf-lib-${Date.now().toString(36)}-${Math.random()
                .toString(36)
                .slice(2, 8)}`;
        const nextItem = {
          id: itemId,
          title: file.name.replace(/\.pdf$/i, ""),
          fileUrl: data?.fileUrl || data?.url || "",
          fileName: data?.fileName || file.name,
          fileSize: data?.fileSize || file.size || 0,
          createdAt: Date.now(),
        };

        if (!normalizeWhiteboardFileUrl(nextItem.fileUrl)) {
          return { ok: false, error: "PDF URL missing" };
        }

        commitWhiteboardState((prev) =>
          addWhiteboardPdfLibraryItemToState(prev, nextItem),
        );
        socketRef.current.emit("whiteboard-pdf-library-add", {
          roomId,
          itemId: nextItem.id,
          title: nextItem.title,
          fileUrl: nextItem.fileUrl,
          fileName: nextItem.fileName,
          fileSize: nextItem.fileSize,
          createdAt: nextItem.createdAt,
        });
        return { ok: true, item: nextItem };
      } catch (error) {
        return {
          ok: false,
          error:
            error?.response?.data?.message ||
            error?.message ||
            "PDF upload failed",
        };
      }
    },
    [
      commitWhiteboardState,
      isCreator,
      roomId,
      whiteboardPdfLibraryBytesLimit,
    ],
  );

  const addWhiteboardPdfTab = useCallback(
    (item, options = {}) => {
      if (!isCreator || !socketRef.current) {
        return { ok: false, error: "PDF open unavailable" };
      }

      const libraryItem = normalizeWhiteboardPdfLibraryItem(item);
      const selectedPages = normalizeWhiteboardSelectedPages(options?.selectedPages);
      if (!libraryItem) {
        return { ok: false, error: "PDF item missing" };
      }

      const currentPdfTabsCount = (Array.isArray(whiteboardStateRef.current?.tabs)
        ? whiteboardStateRef.current.tabs
        : []
      ).filter((tab) => tab?.type === "pdf").length;

      if (currentPdfTabsCount >= whiteboardPdfTabLimit) {
        return {
          ok: false,
          error: `Bu tarifda ${whiteboardPdfTabLimit} ta PDF tab ochish mumkin`,
        };
      }

      const tabId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? `pdf-${crypto.randomUUID()}`
          : `pdf-${Date.now().toString(36)}-${Math.random()
              .toString(36)
              .slice(2, 8)}`;

      commitWhiteboardState((prev) => ({
        ...addWhiteboardPdfTabToState(prev, {
          id: tabId,
          title: libraryItem.title,
          fileUrl: libraryItem.fileUrl,
          fileName: libraryItem.fileName,
          fileSize: libraryItem.fileSize,
          selectedPagesMode: selectedPages.length > 0 ? "custom" : "all",
          selectedPages,
        }),
        pdfLibrary: addWhiteboardPdfLibraryItemToState(prev, libraryItem).pdfLibrary,
        ownerPeerId: socketRef.current.id || prev.ownerPeerId,
        ownerDisplayName: displayName || prev.ownerDisplayName || "Host",
      }));
      socketRef.current.emit("whiteboard-pdf-add", {
        roomId,
        tabId,
        libraryItemId: libraryItem.id,
        title: libraryItem.title,
        fileUrl: libraryItem.fileUrl,
        fileName: libraryItem.fileName,
        fileSize: libraryItem.fileSize,
        createdAt: libraryItem.createdAt,
        selectedPagesMode: selectedPages.length > 0 ? "custom" : "all",
        selectedPages,
      });
      return { ok: true, tabId };
    },
    [
      commitWhiteboardState,
      displayName,
      isCreator,
      roomId,
      whiteboardPdfTabLimit,
    ],
  );

  const removeWhiteboardTab = useCallback(
    (tabId) => {
      if (!isCreator || !socketRef.current) {
        return false;
      }

      const normalizedTabId = normalizeWhiteboardTabId(tabId);
      if (!normalizedTabId || normalizedTabId === WHITEBOARD_BOARD_TAB_ID) {
        return false;
      }

      commitWhiteboardState((prev) => removeWhiteboardTabFromState(prev, normalizedTabId));
      socketRef.current.emit("whiteboard-tab-remove", {
        roomId,
        tabId: normalizedTabId,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const syncWhiteboardPdfViewport = useCallback(
    ({
      tabId,
      scrollRatio,
      zoom,
      viewportPageNumber,
      viewportPageOffsetRatio,
      viewportLeftRatio,
      viewportVisibleHeightRatio,
      viewportVisibleWidthRatio,
      viewportBaseWidth,
    }) => {
      if (!isCreator || !socketRef.current) {
        return false;
      }

      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );
      commitWhiteboardState((prev) =>
        setWhiteboardPdfViewportInState(prev, {
          tabId: targetTabId,
          scrollRatio,
          zoom,
          viewportPageNumber,
          viewportPageOffsetRatio,
          viewportLeftRatio,
          viewportVisibleHeightRatio,
          viewportVisibleWidthRatio,
          viewportBaseWidth,
        }),
      );
      socketRef.current.emit("whiteboard-pdf-viewport", {
        roomId,
        tabId: targetTabId,
        scrollRatio,
        zoom,
        viewportPageNumber,
        viewportPageOffsetRatio,
        viewportLeftRatio,
        viewportVisibleHeightRatio,
        viewportVisibleWidthRatio,
        viewportBaseWidth,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const syncWhiteboardBoardZoom = useCallback(
    ({ tabId, zoom, viewportBaseWidth, viewportBaseHeight }) => {
      if (!isCreator || !socketRef.current) {
        return false;
      }

      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || WHITEBOARD_BOARD_TAB_ID,
      );
      commitWhiteboardState((prev) =>
        setWhiteboardBoardZoomInState(prev, {
          tabId: targetTabId,
          zoom,
          viewportBaseWidth,
          viewportBaseHeight,
        }),
      );
      socketRef.current.emit("whiteboard-board-zoom", {
        roomId,
        tabId: targetTabId,
        zoom,
        viewportBaseWidth,
        viewportBaseHeight,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const startWhiteboardStroke = useCallback(
    ({
      tabId,
      pageNumber,
      strokeId,
      tool,
      color,
      size,
      point,
      points,
      text,
      fillColor,
      fontFamily,
      textSize,
      textAlign,
      fontPixelSize,
      edgeStyle,
      rotation,
    }) => {
      if (!isCreator || !socketRef.current) {
        return false;
      }

      const normalizedPoints = normalizeWhiteboardPoints(
        Array.isArray(points) && points.length > 0 ? points : [point],
        WHITEBOARD_MAX_POINTS_PER_STROKE,
      );
      const firstPoint = normalizedPoints[0];
      const stroke = normalizeWhiteboardStroke({
        id: strokeId,
        tool,
        color,
        size,
        points: normalizedPoints,
        text,
        fillColor,
        fontFamily,
        textSize,
        textAlign,
        fontPixelSize,
        edgeStyle,
        rotation,
      });

      if (!stroke || !firstPoint) {
        return false;
      }

      const ownerPeerId = socketRef.current.id || whiteboardStateRef.current.ownerPeerId;
      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );
      commitWhiteboardState((prev) => ({
        ...upsertWhiteboardStrokeInState(prev, {
          tabId: targetTabId,
          pageNumber,
          stroke,
        }),
        ownerPeerId,
        ownerDisplayName: displayName || prev.ownerDisplayName || "Host",
      }));

      socketRef.current.emit("whiteboard-stroke-start", {
        roomId,
        tabId: targetTabId,
        pageNumber,
        strokeId: stroke.id,
        tool: stroke.tool,
        color: stroke.color,
        size: stroke.size,
        point: firstPoint,
        points: stroke.points,
        text: stroke.text,
        fillColor: stroke.fillColor,
        fontFamily: stroke.fontFamily,
        textSize: stroke.textSize,
        textAlign: stroke.textAlign,
        fontPixelSize: stroke.fontPixelSize,
        edgeStyle: stroke.edgeStyle,
        rotation: stroke.rotation,
      });
      return true;
    },
    [commitWhiteboardState, displayName, isCreator, roomId],
  );

  const appendWhiteboardStroke = useCallback(
    ({ tabId, pageNumber, strokeId, points }) => {
      if (!isCreator || !socketRef.current || typeof strokeId !== "string") {
        return false;
      }

      const normalizedPoints = normalizeWhiteboardPoints(points);
      if (normalizedPoints.length === 0) {
        return false;
      }

      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );
      commitWhiteboardState((prev) =>
        appendWhiteboardStrokePointsInState(prev, {
          tabId: targetTabId,
          pageNumber,
          strokeId,
          points: normalizedPoints,
        }),
      );

      socketRef.current.emit("whiteboard-stroke-append", {
        roomId,
        tabId: targetTabId,
        pageNumber,
        strokeId,
        points: normalizedPoints,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const removeWhiteboardStroke = useCallback(
    ({ tabId, pageNumber, strokeId }) => {
      if (
        !isCreator ||
        !socketRef.current ||
        typeof strokeId !== "string" ||
        !strokeId.trim()
      ) {
        return false;
      }

      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );
      commitWhiteboardState((prev) =>
        removeWhiteboardStrokeFromState(prev, {
          tabId: targetTabId,
          pageNumber,
          strokeId,
        }),
      );

      socketRef.current.emit("whiteboard-stroke-remove", {
        roomId,
        tabId: targetTabId,
        pageNumber,
        strokeId: strokeId.trim(),
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const updateWhiteboardStroke = useCallback(
    ({
      tabId,
      pageNumber,
      strokeId,
      point,
      points,
      text,
      color,
      size,
      fillColor,
      fontFamily,
      textSize,
      textAlign,
      fontPixelSize,
      edgeStyle,
      rotation,
    }) => {
      if (
        !isCreator ||
        !socketRef.current ||
        typeof strokeId !== "string" ||
        !strokeId.trim()
      ) {
        return false;
      }

      const normalizedPoint = point ? normalizeWhiteboardPoint(point) : null;
      const normalizedPoints =
        Array.isArray(points) && points.length > 0
          ? normalizeWhiteboardPoints(points, WHITEBOARD_MAX_POINTS_PER_STROKE)
          : undefined;
      const normalizedText =
        typeof text === "string"
          ? text.slice(0, WHITEBOARD_MAX_TEXT_CHARS)
          : undefined;
      const normalizedFillColor =
        typeof fillColor === "string" ? normalizeWhiteboardFillColor(fillColor) : undefined;
      const normalizedFontFamily =
        typeof fontFamily === "string"
          ? normalizeWhiteboardTextFontFamily(fontFamily)
          : undefined;
      const normalizedTextSize =
        typeof textSize === "string" ? normalizeWhiteboardTextSize(textSize) : undefined;
      const normalizedTextAlign =
        typeof textAlign === "string"
          ? normalizeWhiteboardTextAlign(textAlign)
          : undefined;
      const normalizedFontPixelSize =
        typeof fontPixelSize === "number"
          ? normalizeWhiteboardFontPixelSize(fontPixelSize)
          : undefined;
      const normalizedEdgeStyle =
        typeof edgeStyle === "string"
          ? normalizeWhiteboardShapeEdge(edgeStyle)
          : undefined;
      const normalizedRotation =
        typeof rotation === "number"
          ? normalizeWhiteboardRotation(rotation)
          : undefined;
      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );

      commitWhiteboardState((prev) =>
        updateWhiteboardStrokeInState(prev, {
          tabId: targetTabId,
          pageNumber,
          strokeId: strokeId.trim(),
          point: normalizedPoint,
          points: normalizedPoints,
          text: normalizedText,
          color,
          size: typeof size === "number" ? size : undefined,
          fillColor: normalizedFillColor,
          fontFamily: normalizedFontFamily,
          textSize: normalizedTextSize,
          textAlign: normalizedTextAlign,
          fontPixelSize: normalizedFontPixelSize,
          edgeStyle: normalizedEdgeStyle,
          rotation: normalizedRotation,
        }),
      );

      socketRef.current.emit("whiteboard-stroke-update", {
        roomId,
        tabId: targetTabId,
        pageNumber,
        strokeId: strokeId.trim(),
        point: normalizedPoint || undefined,
        points: normalizedPoints,
        text: normalizedText,
        color,
        size: typeof size === "number" ? size : undefined,
        fillColor: normalizedFillColor,
        fontFamily: normalizedFontFamily,
        textSize: normalizedTextSize,
        textAlign: normalizedTextAlign,
        fontPixelSize: normalizedFontPixelSize,
        edgeStyle: normalizedEdgeStyle,
        rotation: normalizedRotation,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  return {
    localStream,
    remoteStreams,
    remotePeerStates,
    screenStream,
    remoteScreenStreams,
    isScreenSharing,
    toggleScreenShare,
    knockRequests,
    approveKnock,
    rejectKnock,
    joinStatus,
    isMicOn,
    isCamOn,
    micLocked,
    camLocked,
    toggleMic,
    toggleCam,
    switchCamera,
    leaveCall,
    error,
    roomTitle,
    roomIsPrivate,
    remoteIsRecording,
    emitRecording,
    forceMuteMic,
    forceMuteCam,
    allowMic,
    allowCam,
    isHandRaised,
    raisedHands,
    toggleHandRaise,
    kickPeer,
    setRoomPrivacy,
    networkQuality,
    qualityProfile,
    whiteboardState,
    toggleWhiteboard,
    clearWhiteboard,
    clearWhiteboardPage,
    undoWhiteboard,
    redoWhiteboard,
    setWhiteboardActiveTab,
    uploadWhiteboardPdf,
    addWhiteboardPdfTab,
    removeWhiteboardTab,
    syncWhiteboardPdfViewport,
    syncWhiteboardBoardZoom,
    startWhiteboardStroke,
    appendWhiteboardStroke,
    removeWhiteboardStroke,
    updateWhiteboardStroke,
    cameraFacingMode,
    canSwitchCamera: isLikelyMobileDevice() && videoInputCount > 1,
  };
}
