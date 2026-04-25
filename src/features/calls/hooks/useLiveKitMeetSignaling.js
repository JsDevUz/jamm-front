import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axiosInstance from "../../../api/axiosInstance";
import { API_BASE_URL, buildSocketOptions } from "../../../config/env";
import { APP_LIMITS, getTierLimit } from "../../../constants/appLimits";
import useAuthStore from "../../../store/authStore";
import { isValidMeetRoomId, updateMeetPrivacy } from "../../../utils/meetStore";
import { playJoinRequestTone, playMeetStartedTone } from "../utils/ringtone";

const WHITEBOARD_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
const WHITEBOARD_DEFAULT_COLOR = "#0f172a";
const WHITEBOARD_DEFAULT_SIZE = 4;
const WHITEBOARD_MAX_STROKES = 320;
const WHITEBOARD_MAX_POINTS_PER_STROKE = 1200;
const WHITEBOARD_APPEND_BATCH_LIMIT = 32;
const WHITEBOARD_MAX_TEXT_CHARS = 240;
const WHITEBOARD_BOARD_TAB_ID = "board";
const WHITEBOARD_TAB_ID_PATTERN = /^[a-zA-Z0-9_-]{1,80}$/;
const WHITEBOARD_MAX_TABS = 6;
const WHITEBOARD_PDF_LIBRARY_MAX_ITEMS = 80;
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
const WHITEBOARD_PDF_LIBRARY_STORAGE_PREFIX = "jamm:whiteboard-pdf-library";

const SIGNAL_URL = `${API_BASE_URL}/video`;

const createWhiteboardBoardTab = () => ({
  id: WHITEBOARD_BOARD_TAB_ID,
  type: "board",
  title: "board",
  zoom: 1,
  viewportBaseWidth: WHITEBOARD_MIN_VIEWPORT_BASE_WIDTH,
  viewportBaseHeight: WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
  scrollLeftRatio: 0,
  scrollTopRatio: 0,
  strokes: [],
});

const createInitialWhiteboardState = () => ({
  isActive: false,
  ownerPeerId: "",
  ownerDisplayName: "",
  activeTabId: WHITEBOARD_BOARD_TAB_ID,
  tabs: [createWhiteboardBoardTab()],
  pdfLibrary: [],
  updatedAt: 0,
});

const clampWhiteboardCoordinate = (value) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) return null;
  return Math.min(
    WHITEBOARD_BOARD_POINT_MAX,
    Math.max(WHITEBOARD_BOARD_POINT_MIN, nextValue),
  );
};

const normalizeWhiteboardPoint = (point) => {
  if (!point || typeof point !== "object") return null;
  const x = clampWhiteboardCoordinate(point.x);
  const y = clampWhiteboardCoordinate(point.y);
  if (x === null || y === null) return null;
  return { x, y };
};

const normalizeWhiteboardPoints = (
  points,
  limit = WHITEBOARD_APPEND_BATCH_LIMIT,
) =>
  Array.isArray(points)
    ? points.slice(0, limit).map(normalizeWhiteboardPoint).filter(Boolean)
    : [];

const normalizeWhiteboardTabId = (tabId) => {
  if (typeof tabId !== "string") return "";
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
  if (typeof fileUrl !== "string") return "";
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

const normalizeWhiteboardText = (value) =>
  typeof value === "string"
    ? value.replace(/\s+$/g, "").slice(0, WHITEBOARD_MAX_TEXT_CHARS)
    : "";

const normalizeWhiteboardTextFontFamily = (value) =>
  WHITEBOARD_TEXT_FONT_FAMILY_OPTIONS.includes(value) ? value : "sans";

const normalizeWhiteboardTextSize = (value) =>
  WHITEBOARD_TEXT_SIZE_OPTIONS.includes(value) ? value : "m";

const normalizeWhiteboardTextAlign = (value) =>
  WHITEBOARD_TEXT_ALIGN_OPTIONS.includes(value) ? value : "left";

const normalizeWhiteboardFontPixelSize = (value) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) return 0;
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
  if (!Number.isFinite(nextValue)) return 0;

  const fullTurn = Math.PI * 2;
  let normalized = nextValue % fullTurn;
  if (normalized > Math.PI) normalized -= fullTurn;
  if (normalized < -Math.PI) normalized += fullTurn;
  return normalized;
};

const normalizeWhiteboardPageNumber = (pageNumber) => {
  const nextPageNumber = Number(pageNumber);
  if (!Number.isFinite(nextPageNumber)) return 1;
  return Math.min(5000, Math.max(1, Math.round(nextPageNumber)));
};

const normalizeWhiteboardScrollRatio = (scrollRatio) => {
  const nextScrollRatio = Number(scrollRatio);
  if (!Number.isFinite(nextScrollRatio)) return 0;
  return Math.min(1, Math.max(0, nextScrollRatio));
};

const normalizeWhiteboardViewportLeftRatio = (leftRatio) => {
  const nextLeftRatio = Number(leftRatio);
  if (!Number.isFinite(nextLeftRatio)) return 0;
  return Math.min(1, Math.max(0, nextLeftRatio));
};

const normalizeWhiteboardViewportVisibleWidthRatio = (widthRatio) => {
  const nextWidthRatio = Number(widthRatio);
  if (!Number.isFinite(nextWidthRatio)) return 0;
  return Math.min(1, Math.max(0, nextWidthRatio));
};

const normalizeWhiteboardZoom = (zoom) => {
  const nextZoom = Number(zoom);
  if (!Number.isFinite(nextZoom)) return 1;
  return Math.min(WHITEBOARD_MAX_ZOOM, Math.max(WHITEBOARD_MIN_ZOOM, nextZoom));
};

const normalizeWhiteboardViewportBaseWidth = (value) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) return WHITEBOARD_MIN_VIEWPORT_BASE_WIDTH;
  return Math.min(
    WHITEBOARD_MAX_VIEWPORT_BASE_WIDTH,
    Math.max(WHITEBOARD_MIN_VIEWPORT_BASE_WIDTH, Math.round(nextValue)),
  );
};

const normalizeWhiteboardViewportBaseHeight = (value) => {
  const nextValue = Number(value);
  if (!Number.isFinite(nextValue)) return WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT;
  return Math.min(
    WHITEBOARD_MAX_VIEWPORT_BASE_HEIGHT,
    Math.max(WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT, Math.round(nextValue)),
  );
};

const normalizeWhiteboardSelectedPages = (selectedPages) =>
  Array.isArray(selectedPages)
    ? Array.from(
        new Set(
          selectedPages
            .slice(0, 240)
            .map(normalizeWhiteboardPageNumber)
            .filter((pageNumber) => Number.isFinite(pageNumber) && pageNumber > 0),
        ),
      ).sort((left, right) => left - right)
    : [];

const normalizeWhiteboardSelectedPagesMode = (
  selectedPagesMode,
  selectedPages,
) =>
  selectedPagesMode === "custom" ||
  normalizeWhiteboardSelectedPages(selectedPages).length > 0
    ? "custom"
    : "all";

const trimWhiteboardStrokes = (strokes) =>
  Array.isArray(strokes) && strokes.length > WHITEBOARD_MAX_STROKES
    ? strokes.slice(strokes.length - WHITEBOARD_MAX_STROKES)
    : Array.isArray(strokes)
      ? strokes
      : [];

const normalizeWhiteboardStroke = (stroke) => {
  if (!stroke || typeof stroke !== "object") return null;

  const strokeId =
    typeof stroke.id === "string" && stroke.id.trim()
      ? stroke.id.trim().slice(0, 80)
      : "";
  if (!strokeId) return null;

  const points = normalizeWhiteboardPoints(
    stroke.points,
    WHITEBOARD_MAX_POINTS_PER_STROKE,
  );
  if (points.length === 0) return null;

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
      WHITEBOARD_SHAPE_TOOLS.includes(normalizedTool) ||
      normalizedTool === "text"
        ? normalizeWhiteboardRotation(stroke.rotation)
        : 0,
  };
};

const normalizeWhiteboardPdfPageState = (pageState) => {
  if (!pageState || typeof pageState !== "object") return null;
  return {
    pageNumber: normalizeWhiteboardPageNumber(pageState.pageNumber),
    strokes: trimWhiteboardStrokes(
      (Array.isArray(pageState.strokes) ? pageState.strokes : [])
        .map(normalizeWhiteboardStroke)
        .filter(Boolean),
    ),
  };
};

const getWhiteboardStableHash = (value) => {
  const input = String(value || "");
  let hash = 5381;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 33) ^ input.charCodeAt(index);
  }
  return (hash >>> 0).toString(36);
};

const getWhiteboardFileNameFromUrl = (fileUrl) => {
  const value = normalizeWhiteboardFileUrl(fileUrl);
  if (!value) return "";

  try {
    const baseUrl =
      typeof window !== "undefined" && window.location?.origin
        ? window.location.origin
        : "https://jamm.local";
    const pathname = new URL(value, baseUrl).pathname;
    const lastSegment = pathname.split("/").filter(Boolean).pop() || "";
    return normalizeWhiteboardFileName(decodeURIComponent(lastSegment));
  } catch {
    const lastSegment = (value.split(/[?#]/)[0] || "")
      .split("/")
      .filter(Boolean)
      .pop();
    try {
      return normalizeWhiteboardFileName(decodeURIComponent(lastSegment || ""));
    } catch {
      return normalizeWhiteboardFileName(lastSegment || "");
    }
  }
};

const getWhiteboardPdfFileName = (item, fileUrl) => {
  const explicitName = normalizeWhiteboardFileName(item?.fileName || item?.name);
  if (explicitName) return explicitName;

  const urlName = getWhiteboardFileNameFromUrl(fileUrl);
  if (urlName) return urlName;

  const title = normalizeWhiteboardTitle(item?.title || item?.name) || "PDF";
  return `${title.replace(/\.pdf$/i, "") || "PDF"}.pdf`;
};

const getWhiteboardPdfLibraryItemId = (item, fileUrl, fileName) => {
  const explicitId = normalizeWhiteboardTabId(
    item?.id || item?.itemId || item?.libraryItemId || item?.tabId,
  );
  if (explicitId) return explicitId;

  return normalizeWhiteboardTabId(
    `pdf-lib-${getWhiteboardStableHash(`${fileUrl || ""}:${fileName || ""}`)}`,
  );
};

const normalizeWhiteboardPdfLibraryItem = (item) => {
  if (!item || typeof item !== "object") return null;

  const fileUrl = normalizeWhiteboardFileUrl(
    item.fileUrl || item.url || item.src || item.href,
  );
  const fileName = getWhiteboardPdfFileName(item, fileUrl);
  const itemId = getWhiteboardPdfLibraryItemId(item, fileUrl, fileName);
  if (!itemId || !fileUrl || !fileName) return null;

  const createdAt = Number(item.createdAt);
  return {
    id: itemId,
    title:
      normalizeWhiteboardTitle(item.title || item.name) ||
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
    .flatMap((collection) =>
      Array.isArray(collection)
        ? collection
        : Array.isArray(collection?.items)
          ? collection.items
          : [],
    )
    .map(normalizeWhiteboardPdfLibraryItem)
    .filter(Boolean)
    .reduce((items, item) => {
      const existingIndex = items.findIndex(
        (entry) => entry.id === item.id || entry.fileUrl === item.fileUrl,
      );
      if (existingIndex >= 0) {
        items[existingIndex] =
          items[existingIndex].createdAt >= item.createdAt
            ? items[existingIndex]
            : item;
      } else {
        items.push(item);
      }
      return items;
    }, [])
    .sort((left, right) => right.createdAt - left.createdAt)
    .slice(0, WHITEBOARD_PDF_LIBRARY_MAX_ITEMS);

const getWhiteboardPdfLibraryItemsFromTabs = (tabs, updatedAt) =>
  (Array.isArray(tabs) ? tabs : [])
    .filter((tab) => tab?.type === "pdf" && tab.fileUrl)
    .map((tab) =>
      normalizeWhiteboardPdfLibraryItem({
        id: tab.libraryItemId || tab.id,
        title: tab.title,
        fileUrl: tab.fileUrl,
        fileName: tab.fileName,
        fileSize: tab.fileSize,
        createdAt: Number(tab.createdAt || updatedAt || Date.now()),
      }),
    )
    .filter(Boolean);

const getWhiteboardPdfLibraryStorageKey = (userId) =>
  `${WHITEBOARD_PDF_LIBRARY_STORAGE_PREFIX}:${String(userId || "anon")}`;

const readStoredWhiteboardPdfLibrary = (userId) => {
  if (typeof window === "undefined") return [];
  const keys = Array.from(
    new Set([
      getWhiteboardPdfLibraryStorageKey(userId),
      getWhiteboardPdfLibraryStorageKey("anon"),
      WHITEBOARD_PDF_LIBRARY_STORAGE_PREFIX,
    ]),
  );

  try {
    return mergeWhiteboardPdfLibraryItems(
      ...keys.map((key) => {
        const rawValue = window.localStorage.getItem(key);
        if (!rawValue) return [];
        try {
          return JSON.parse(rawValue);
        } catch {
          return [];
        }
      }),
    );
  } catch {
    return [];
  }
};

const writeStoredWhiteboardPdfLibrary = (userId, items) => {
  if (typeof window === "undefined") return;
  const normalizedItems = mergeWhiteboardPdfLibraryItems(items);
  if (normalizedItems.length === 0) return;

  try {
    window.localStorage.setItem(
      getWhiteboardPdfLibraryStorageKey(userId),
      JSON.stringify(normalizedItems),
    );
  } catch {}
};

const normalizeWhiteboardTab = (tab) => {
  if (!tab || typeof tab !== "object") return null;
  const tabId = normalizeWhiteboardTabId(tab.id);
  if (!tabId) return null;

  if (tab.type === "pdf") {
    const fileUrl = normalizeWhiteboardFileUrl(
      tab.fileUrl || tab.url || tab.src || tab.href,
    );
    const fileName = getWhiteboardPdfFileName(tab, fileUrl);
    if (!fileUrl || !fileName) return null;

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
      viewportPageOffsetRatio: normalizeWhiteboardScrollRatio(
        tab.viewportPageOffsetRatio,
      ),
      viewportLeftRatio: normalizeWhiteboardViewportLeftRatio(tab.viewportLeftRatio),
      viewportVisibleHeightRatio: normalizeWhiteboardScrollRatio(
        tab.viewportVisibleHeightRatio,
      ),
      viewportVisibleWidthRatio: normalizeWhiteboardViewportVisibleWidthRatio(
        tab.viewportVisibleWidthRatio,
      ),
      viewportBaseWidth: normalizeWhiteboardViewportBaseWidth(tab.viewportBaseWidth),
      viewportBaseHeight: normalizeWhiteboardViewportBaseHeight(tab.viewportBaseHeight),
      selectedPagesMode: normalizeWhiteboardSelectedPagesMode(
        tab.selectedPagesMode,
        tab.selectedPages,
      ),
      selectedPages: normalizeWhiteboardSelectedPages(tab.selectedPages),
      pages: (Array.isArray(tab.pages) ? tab.pages : [])
        .map(normalizeWhiteboardPdfPageState)
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
    scrollLeftRatio: normalizeWhiteboardViewportLeftRatio(tab.scrollLeftRatio),
    scrollTopRatio: normalizeWhiteboardScrollRatio(tab.scrollTopRatio),
    strokes: trimWhiteboardStrokes(
      (Array.isArray(tab.strokes) ? tab.strokes : [])
        .map(normalizeWhiteboardStroke)
        .filter(Boolean),
    ),
  };
};

const ensureWhiteboardTabs = (tabs) => {
  const normalizedTabs = Array.isArray(tabs)
    ? tabs.map(normalizeWhiteboardTab).filter(Boolean)
    : [];
  const boardTab =
    normalizedTabs.find((tab) => tab.type === "board") || createWhiteboardBoardTab();
  const pdfTabs = normalizedTabs
    .filter((tab) => tab.type === "pdf")
    .slice(0, WHITEBOARD_MAX_TABS - 1);
  return [boardTab, ...pdfTabs];
};

const normalizeWhiteboardState = (rawState) => {
  const tabs = ensureWhiteboardTabs(rawState?.tabs);
  const requestedActiveTabId = normalizeWhiteboardTabId(rawState?.activeTabId);
  const updatedAt = Number(rawState?.updatedAt) || 0;

  return {
    isActive: Boolean(rawState?.isActive),
    ownerPeerId:
      typeof rawState?.ownerPeerId === "string" ? rawState.ownerPeerId : "",
    ownerDisplayName:
      typeof rawState?.ownerDisplayName === "string"
        ? rawState.ownerDisplayName
        : "",
    activeTabId: tabs.some((tab) => tab.id === requestedActiveTabId)
      ? requestedActiveTabId
      : WHITEBOARD_BOARD_TAB_ID,
    tabs,
    pdfLibrary: mergeWhiteboardPdfLibraryItems(
      Array.isArray(rawState?.pdfLibrary) ? rawState.pdfLibrary : [],
      getWhiteboardPdfLibraryItemsFromTabs(tabs, updatedAt),
    ),
    updatedAt,
  };
};

const resolveWhiteboardTargetTabId = (state, tabId) => {
  const normalizedTabId = normalizeWhiteboardTabId(tabId);
  return normalizedTabId &&
    state.tabs.some((tab) => tab.id === normalizedTabId)
    ? normalizedTabId
    : WHITEBOARD_BOARD_TAB_ID;
};

const updateWhiteboardTabs = (state, updater) => {
  const nextTabs = ensureWhiteboardTabs(updater(Array.isArray(state.tabs) ? state.tabs : []));
  return {
    ...state,
    tabs: nextTabs,
    activeTabId: nextTabs.some((tab) => tab.id === state.activeTabId)
      ? state.activeTabId
      : WHITEBOARD_BOARD_TAB_ID,
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
          pageIndex >= 0 ? pages[pageIndex] : { pageNumber: targetPageNumber, strokes: [] };
        const nextPageState = {
          ...nextPage,
          strokes: trimWhiteboardStrokes([
            ...nextPage.strokes.filter((entry) => entry.id !== stroke.id),
            stroke,
          ]),
        };
        if (pageIndex >= 0) pages[pageIndex] = nextPageState;
        else pages.push(nextPageState);
        return { ...tab, pages: pages.sort((left, right) => left.pageNumber - right.pageNumber) };
      }

      return {
        ...tab,
        strokes: trimWhiteboardStrokes([
          ...tab.strokes.filter((entry) => entry.id !== stroke.id),
          stroke,
        ]),
      };
    }),
    isActive: true,
    activeTabId: targetTabId,
  };
};

const appendWhiteboardStrokePointsInState = (
  state,
  { tabId, pageNumber, strokeId, points },
) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, tabId);
  const appendPoints = (stroke) =>
    stroke.id !== strokeId
      ? stroke
      : {
          ...stroke,
          points: trimWhiteboardStrokes([
            {
              ...stroke,
              points: [
                ...(Array.isArray(stroke.points) ? stroke.points : []),
                ...(Array.isArray(points) ? points : []),
              ].slice(0, WHITEBOARD_MAX_POINTS_PER_STROKE),
            },
          ])[0].points,
        };

  return {
    ...updateWhiteboardTabById(state, targetTabId, (tab) => {
      if (tab.type === "pdf") {
        const targetPageNumber = normalizeWhiteboardPageNumber(pageNumber);
        return {
          ...tab,
          pages: tab.pages.map((page) =>
            page.pageNumber === targetPageNumber
              ? { ...page, strokes: page.strokes.map(appendPoints) }
              : page,
          ),
        };
      }
      return { ...tab, strokes: tab.strokes.map(appendPoints) };
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
                ? [point]
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
            page.pageNumber === targetPageNumber
              ? { ...page, strokes: page.strokes.map(applyStrokeUpdate) }
              : page,
          ),
        };
      }
      return { ...tab, strokes: tab.strokes.map(applyStrokeUpdate) };
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
            page.pageNumber === targetPageNumber
              ? { ...page, strokes: page.strokes.filter((stroke) => stroke.id !== strokeId) }
              : page,
          ),
        };
      }
      return { ...tab, strokes: tab.strokes.filter((stroke) => stroke.id !== strokeId) };
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
            page.pageNumber === targetPageNumber ? { ...page, strokes: [] } : page,
          ),
        };
      }
      return { ...tab, strokes: [] };
    }),
    activeTabId: targetTabId,
  };
};

const addWhiteboardPdfLibraryItemToState = (state, item) => {
  const normalizedItem = normalizeWhiteboardPdfLibraryItem(item);
  if (!normalizedItem) return state;
  return {
    ...state,
    pdfLibrary: mergeWhiteboardPdfLibraryItems(state.pdfLibrary, [normalizedItem]),
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
    viewportBaseHeight: WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
    selectedPagesMode:
      nextTab.selectedPagesMode ||
      normalizeWhiteboardSelectedPagesMode("custom", nextTab.selectedPages),
    selectedPages: nextTab.selectedPages,
  });

  if (!normalizedTab || normalizedTab.type !== "pdf") return state;

  return {
    ...state,
    isActive: true,
    activeTabId: normalizedTab.id,
    tabs: ensureWhiteboardTabs([
      ...(Array.isArray(state.tabs) ? state.tabs : []).filter(
        (tab) => tab.id !== normalizedTab.id,
      ),
      normalizedTab,
    ]).slice(0, WHITEBOARD_MAX_TABS),
  };
};

const removeWhiteboardTabFromState = (state, tabId) => {
  const normalizedTabId = normalizeWhiteboardTabId(tabId);
  if (!normalizedTabId || normalizedTabId === WHITEBOARD_BOARD_TAB_ID) return state;

  const nextTabs = ensureWhiteboardTabs(
    (Array.isArray(state.tabs) ? state.tabs : []).filter(
      (tab) => tab.id !== normalizedTabId,
    ),
  );
  return {
    ...state,
    tabs: nextTabs,
    activeTabId:
      state.activeTabId === normalizedTabId
        ? WHITEBOARD_BOARD_TAB_ID
        : state.activeTabId,
  };
};

const setWhiteboardActiveTabInState = (state, tabId) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, tabId);
  return { ...state, isActive: true, activeTabId: targetTabId };
};

const setWhiteboardPdfViewportInState = (state, payload) => {
  const targetTabId = resolveWhiteboardTargetTabId(state, payload.tabId);
  return {
    ...updateWhiteboardTabById(state, targetTabId, (tab) =>
      tab.type !== "pdf"
        ? tab
        : {
            ...tab,
            scrollRatio:
              typeof payload.scrollRatio === "undefined"
                ? tab.scrollRatio
                : normalizeWhiteboardScrollRatio(payload.scrollRatio),
            zoom:
              typeof payload.zoom === "undefined"
                ? tab.zoom
                : normalizeWhiteboardZoom(payload.zoom),
            viewportPageNumber:
              typeof payload.viewportPageNumber === "undefined"
                ? tab.viewportPageNumber
                : normalizeWhiteboardPageNumber(payload.viewportPageNumber),
            viewportPageOffsetRatio:
              typeof payload.viewportPageOffsetRatio === "undefined"
                ? tab.viewportPageOffsetRatio
                : normalizeWhiteboardScrollRatio(payload.viewportPageOffsetRatio),
            viewportLeftRatio:
              typeof payload.viewportLeftRatio === "undefined"
                ? tab.viewportLeftRatio
                : normalizeWhiteboardViewportLeftRatio(payload.viewportLeftRatio),
            viewportVisibleHeightRatio:
              typeof payload.viewportVisibleHeightRatio === "undefined"
                ? tab.viewportVisibleHeightRatio
                : normalizeWhiteboardScrollRatio(payload.viewportVisibleHeightRatio),
            viewportVisibleWidthRatio:
              typeof payload.viewportVisibleWidthRatio === "undefined"
                ? tab.viewportVisibleWidthRatio
                : normalizeWhiteboardViewportVisibleWidthRatio(
                    payload.viewportVisibleWidthRatio,
                  ),
            viewportBaseWidth:
              typeof payload.viewportBaseWidth === "undefined"
                ? tab.viewportBaseWidth
                : normalizeWhiteboardViewportBaseWidth(payload.viewportBaseWidth),
            viewportBaseHeight:
              typeof payload.viewportBaseHeight === "undefined"
                ? tab.viewportBaseHeight
                : normalizeWhiteboardViewportBaseHeight(payload.viewportBaseHeight),
          },
    ),
    activeTabId: targetTabId,
  };
};

const setWhiteboardBoardZoomInState = (state, payload) => {
  const targetTabId = resolveWhiteboardTargetTabId(
    state,
    payload.tabId || WHITEBOARD_BOARD_TAB_ID,
  );
  return {
    ...updateWhiteboardTabById(state, targetTabId, (tab) =>
      tab.type !== "board"
        ? tab
        : {
            ...tab,
            zoom:
              typeof payload.zoom === "undefined"
                ? tab.zoom
                : normalizeWhiteboardZoom(payload.zoom),
            viewportBaseWidth:
              typeof payload.viewportBaseWidth === "undefined"
                ? tab.viewportBaseWidth
                : normalizeWhiteboardViewportBaseWidth(payload.viewportBaseWidth),
            viewportBaseHeight:
              typeof payload.viewportBaseHeight === "undefined"
                ? tab.viewportBaseHeight
                : normalizeWhiteboardViewportBaseHeight(payload.viewportBaseHeight),
            scrollLeftRatio:
              typeof payload.scrollLeftRatio === "undefined"
                ? tab.scrollLeftRatio
                : normalizeWhiteboardViewportLeftRatio(payload.scrollLeftRatio),
            scrollTopRatio:
              typeof payload.scrollTopRatio === "undefined"
                ? tab.scrollTopRatio
                : normalizeWhiteboardScrollRatio(payload.scrollTopRatio),
          },
    ),
    activeTabId: targetTabId,
  };
};

const normalizeWhiteboardCursor = (rawCursor) => {
  if (!rawCursor || typeof rawCursor !== "object") return null;
  const x = Number(rawCursor.x);
  const y = Number(rawCursor.y);
  const peerId =
    typeof rawCursor.peerId === "string" ? rawCursor.peerId.trim() : "";
  if (!peerId || !Number.isFinite(x) || !Number.isFinite(y)) return null;
  return {
    peerId,
    displayName:
      typeof rawCursor.displayName === "string"
        ? rawCursor.displayName.trim().slice(0, 60)
        : "",
    x: Math.min(WHITEBOARD_BOARD_POINT_MAX, Math.max(WHITEBOARD_BOARD_POINT_MIN, x)),
    y: Math.min(WHITEBOARD_BOARD_POINT_MAX, Math.max(WHITEBOARD_BOARD_POINT_MIN, y)),
    updatedAt: Number(rawCursor.updatedAt) || Date.now(),
  };
};

const sumWhiteboardPdfLibraryBytes = (items) =>
  (Array.isArray(items) ? items : []).reduce(
    (total, item) => total + Math.max(0, Number(item?.fileSize || 0)),
    0,
  );

const formatWhiteboardBytesLabel = (bytes) => {
  const megabytes = Math.max(0, Number(bytes || 0)) / (1024 * 1024);
  return `${Number.isInteger(megabytes) ? megabytes : megabytes.toFixed(1)} MB`;
};

const getSocketPeerId = (socket) =>
  typeof socket?.id === "string" ? socket.id.trim() : "";

export function useLiveKitMeetSignaling({
  roomId,
  displayName,
  enabled,
  isCreator = false,
  isPrivate = false,
  chatTitle = "",
}) {
  const currentUser = useAuthStore((state) => state.user);
  const currentUserId = String(currentUser?._id || currentUser?.id || "");
  const [joinStatus, setJoinStatus] = useState("idle");
  const [error, setError] = useState("");
  const [roomTitle, setRoomTitle] = useState(chatTitle || "");
  const [roomIsPrivate, setRoomIsPrivate] = useState(Boolean(isPrivate));
  const [roomCreatorId, setRoomCreatorId] = useState("");
  const [knockRequests, setKnockRequests] = useState([]);
  const [roomPrivacyUpdating, setRoomPrivacyUpdating] = useState(false);
  const [localMediaLocks, setLocalMediaLocks] = useState({
    micLocked: false,
    camLocked: false,
  });
  const [remoteMediaLocks, setRemoteMediaLocks] = useState({});
  const [whiteboardState, setWhiteboardState] = useState(() =>
    createInitialWhiteboardState(),
  );
  const [whiteboardCursor, setWhiteboardCursor] = useState(null);
  const socketRef = useRef(null);
  const whiteboardStateRef = useRef(createInitialWhiteboardState());
  const storedPdfLibraryRef = useRef([]);
  const joinRetryCountRef = useRef(0);
  const didFallbackLiveKitOnlyRef = useRef(false);
  const displayNameRef = useRef(displayName);
  const meetStartedToneRoomRef = useRef("");
  const knockRequestTonePeerIdsRef = useRef(new Set());

  const whiteboardPdfTabLimit = getTierLimit(APP_LIMITS.whiteboardPdfTabs, currentUser);
  const whiteboardPdfLibraryBytesLimit = getTierLimit(
    APP_LIMITS.whiteboardPdfLibraryBytes,
    currentUser,
  );

  useEffect(() => {
    displayNameRef.current = displayName;
  }, [displayName]);

  useEffect(() => {
    setRoomTitle(chatTitle || "");
    setRoomIsPrivate(Boolean(isPrivate));
    setRoomCreatorId("");
    setRoomPrivacyUpdating(false);
    meetStartedToneRoomRef.current = "";
    knockRequestTonePeerIdsRef.current = new Set();
    setLocalMediaLocks({ micLocked: false, camLocked: false });
    setRemoteMediaLocks({});
  }, [chatTitle, isPrivate, roomId]);

  useEffect(() => {
    if (joinStatus !== "joined" || !enabled || !roomId) return;
    if (meetStartedToneRoomRef.current === roomId) return;
    meetStartedToneRoomRef.current = roomId;
    playMeetStartedTone().catch(() => {});
  }, [enabled, joinStatus, roomId]);

  useEffect(() => {
    const storedLibrary = readStoredWhiteboardPdfLibrary(currentUserId);
    storedPdfLibraryRef.current = storedLibrary;
    setWhiteboardState((previousState) => {
      const nextState = {
        ...previousState,
        pdfLibrary: mergeWhiteboardPdfLibraryItems(
          previousState.pdfLibrary,
          storedLibrary,
        ),
      };
      whiteboardStateRef.current = nextState;
      return nextState;
    });
  }, [currentUserId]);

  useEffect(() => {
    writeStoredWhiteboardPdfLibrary(currentUserId, whiteboardState.pdfLibrary);
  }, [currentUserId, whiteboardState.pdfLibrary]);

  const commitWhiteboardState = useCallback((updater) => {
    setWhiteboardState((previousState) => {
      const nextState =
        typeof updater === "function" ? updater(previousState) : updater;
      whiteboardStateRef.current = nextState;
      return nextState;
    });
  }, []);

  const commitWhiteboardCursor = useCallback((nextCursor) => {
    setWhiteboardCursor((previousCursor) =>
      typeof nextCursor === "function" ? nextCursor(previousCursor) : nextCursor,
    );
  }, []);

  useEffect(() => {
    if (!enabled || !roomId) {
      return undefined;
    }

    if (!isValidMeetRoomId(roomId)) {
      setError("Room ID noto'g'ri");
      setJoinStatus("idle");
      return undefined;
    }

    let cancelled = false;
    const socket = io(
      SIGNAL_URL,
      buildSocketOptions({
        auth: currentUserId ? undefined : { guest: true },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 8000,
        randomizationFactor: 0.4,
      }),
    );
    socketRef.current = socket;
    joinRetryCountRef.current = 0;
    didFallbackLiveKitOnlyRef.current = false;
    setJoinStatus("connecting");
    setError("");
    setKnockRequests([]);
    knockRequestTonePeerIdsRef.current = new Set();

    const emitAdmission = () => {
      if (!socket.connected) return;
      if (isCreator) {
        socket.emit("create-room", {
          roomId,
          displayName: displayNameRef.current,
          isPrivate,
          title: chatTitle,
        });
        return;
      }
      socket.emit("join-room", {
        roomId,
        displayName: displayNameRef.current,
      });
    };

    const handleRoomInfo = ({ title, isPrivate: nextIsPrivate, creatorUserId }) => {
      if (title) setRoomTitle(title);
      if (typeof nextIsPrivate === "boolean") setRoomIsPrivate(nextIsPrivate);
      if (creatorUserId) setRoomCreatorId(String(creatorUserId));
    };

    const handleServerError = ({ message } = {}) => {
      if (cancelled) return;
      if (message === "Room not found" && !isCreator) {
        if (joinRetryCountRef.current < 2) {
          joinRetryCountRef.current += 1;
          window.setTimeout(emitAdmission, 1500);
          return;
        }

        if (!isPrivate) {
          didFallbackLiveKitOnlyRef.current = true;
          setError("");
          setJoinStatus("joined");
          return;
        }
      }

      setError(message || "Meet signal serverida xatolik yuz berdi");
      setJoinStatus("idle");
    };

    socket.on("connect", emitAdmission);
    socket.on("room-created", () => {
      setJoinStatus("joined");
      setError("");
    });
    socket.on("existing-peers", () => {
      setJoinStatus("joined");
      setError("");
    });
    socket.on("waiting-for-approval", () => {
      setJoinStatus("waiting");
      setError("");
    });
    socket.on("knock-approved", ({ title, creatorUserId }) => {
      if (title) setRoomTitle(title);
      if (creatorUserId) setRoomCreatorId(String(creatorUserId));
      setJoinStatus("joined");
      setError("");
    });
    socket.on("knock-rejected", ({ reason } = {}) => {
      setJoinStatus("rejected");
      setError(reason || "Meetga kirish rad etildi");
    });
    socket.on("room-info", handleRoomInfo);
    socket.on("error", handleServerError);
    socket.on("connect_error", (socketError) => {
      setError(socketError?.message || "Signal serverga ulanib bo'lmadi");
    });
    socket.on("auth-error", ({ message } = {}) => {
      if (currentUserId) {
        setError(message || "Video socket autentifikatsiya xatosi");
        setJoinStatus("idle");
      }
    });

    socket.on("knock-request", ({ peerId, displayName: guestName }) => {
      if (!isCreator || !peerId) return;
      const shouldPlayTone = !knockRequestTonePeerIdsRef.current.has(peerId);
      if (shouldPlayTone) {
        knockRequestTonePeerIdsRef.current.add(peerId);
        playJoinRequestTone().catch(() => {});
      }
      setKnockRequests((previousRequests) => {
        const existingIndex = previousRequests.findIndex(
          (request) => request.peerId === peerId,
        );
        if (existingIndex >= 0) {
          return previousRequests.map((request, index) =>
            index === existingIndex
              ? { ...request, displayName: guestName || request.displayName }
              : request,
          );
        }
        return [...previousRequests, { peerId, displayName: guestName || "Guest" }];
      });
    });

    socket.on("whiteboard-started", (payload = {}) => {
      commitWhiteboardState((previousState) => ({
        ...previousState,
        isActive: true,
        ownerPeerId: payload.ownerPeerId || previousState.ownerPeerId,
        ownerDisplayName:
          payload.ownerDisplayName || previousState.ownerDisplayName,
        activeTabId:
          normalizeWhiteboardTabId(payload.activeTabId) ||
          previousState.activeTabId,
      }));
    });

    socket.on("whiteboard-stopped", (payload = {}) => {
      commitWhiteboardCursor(null);
      commitWhiteboardState((previousState) => ({
        ...previousState,
        isActive: false,
        ownerPeerId: payload.ownerPeerId || previousState.ownerPeerId,
      }));
    });

    socket.on("whiteboard-cleared", () => {
      commitWhiteboardState((previousState) =>
        clearWhiteboardTargetInState(previousState, {
          tabId: previousState.activeTabId,
          pageNumber: 1,
        }),
      );
    });

    socket.on("whiteboard-state", (nextState) => {
      const normalizedState = normalizeWhiteboardState(nextState);
      const mergedState = {
        ...normalizedState,
        pdfLibrary: mergeWhiteboardPdfLibraryItems(
          normalizedState.pdfLibrary,
          storedPdfLibraryRef.current,
        ),
      };
      storedPdfLibraryRef.current = mergedState.pdfLibrary;
      commitWhiteboardState(mergedState);
      if (!mergedState.isActive) commitWhiteboardCursor(null);
    });

    socket.on("whiteboard-cursor", (payload) => {
      const localPeerId = getSocketPeerId(socket);
      if (payload?.peerId && payload.peerId === localPeerId) return;
      const nextCursor = normalizeWhiteboardCursor(payload);
      if (nextCursor) commitWhiteboardCursor(nextCursor);
    });

    socket.on("cursors-batch", ({ cursors } = {}) => {
      const localPeerId = getSocketPeerId(socket);
      if (!Array.isArray(cursors)) return;
      cursors.forEach((payload) => {
        if (payload?.peerId && payload.peerId === localPeerId) return;
        const nextCursor = normalizeWhiteboardCursor(payload);
        if (nextCursor) commitWhiteboardCursor(nextCursor);
      });
    });

    socket.on("whiteboard-cursor-clear", ({ peerId } = {}) => {
      commitWhiteboardCursor((currentCursor) =>
        !peerId || currentCursor?.peerId === peerId ? null : currentCursor,
      );
    });

    socket.on("whiteboard-stroke-started", ({ tabId, pageNumber, stroke }) => {
      const normalizedStroke = normalizeWhiteboardStroke(stroke);
      if (!normalizedStroke) return;
      commitWhiteboardState((previousState) =>
        upsertWhiteboardStrokeInState(previousState, {
          tabId,
          pageNumber,
          stroke: normalizedStroke,
        }),
      );
    });

    socket.on("whiteboard-stroke-appended", ({ tabId, pageNumber, strokeId, points }) => {
      if (!strokeId) return;
      const normalizedPoints = normalizeWhiteboardPoints(points);
      if (normalizedPoints.length === 0) return;
      commitWhiteboardState((previousState) =>
        appendWhiteboardStrokePointsInState(previousState, {
          tabId,
          pageNumber,
          strokeId,
          points: normalizedPoints,
        }),
      );
    });

    socket.on("whiteboard-stroke-removed", ({ tabId, pageNumber, strokeId }) => {
      if (!strokeId) return;
      commitWhiteboardState((previousState) =>
        removeWhiteboardStrokeFromState(previousState, {
          tabId,
          pageNumber,
          strokeId,
        }),
      );
    });

    socket.on("whiteboard-stroke-updated", (payload) => {
      if (!payload?.strokeId) return;
      commitWhiteboardState((previousState) =>
        updateWhiteboardStrokeInState(previousState, {
          ...payload,
          point: normalizeWhiteboardPoint(payload.point),
          points: normalizeWhiteboardPoints(
            payload.points,
            WHITEBOARD_MAX_POINTS_PER_STROKE,
          ),
        }),
      );
    });
    socket.on("force-mute-mic", () => {
      setLocalMediaLocks((current) => ({ ...current, micLocked: true }));
    });
    socket.on("force-mute-cam", () => {
      setLocalMediaLocks((current) => ({ ...current, camLocked: true }));
    });
    socket.on("allow-mic", () => {
      setLocalMediaLocks((current) => ({ ...current, micLocked: false }));
    });
    socket.on("allow-cam", () => {
      setLocalMediaLocks((current) => ({ ...current, camLocked: false }));
    });

    const timeoutId = window.setTimeout(() => {
      if (!cancelled) {
        setJoinStatus((previousStatus) => {
          if (previousStatus !== "connecting") return previousStatus;
          setError("Meet signal serveriga ulanib bo'lmadi");
          return "idle";
        });
      }
    }, 30_000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      try {
        socket.emit("leave-room", { roomId });
      } catch {}
      socket.removeAllListeners();
      socket.disconnect();
      if (socketRef.current === socket) {
        socketRef.current = null;
      }
      setKnockRequests([]);
      setLocalMediaLocks({ micLocked: false, camLocked: false });
      setRemoteMediaLocks({});
      commitWhiteboardCursor(null);
      commitWhiteboardState({
        ...createInitialWhiteboardState(),
        pdfLibrary: storedPdfLibraryRef.current,
      });
    };
  }, [
    chatTitle,
    commitWhiteboardCursor,
    commitWhiteboardState,
    currentUserId,
    enabled,
    isCreator,
    isPrivate,
    roomId,
  ]);

  const approveKnock = useCallback(
    (peerId) => {
      if (!socketRef.current || !peerId) return false;
      socketRef.current.emit("approve-knock", { roomId, peerId });
      setKnockRequests((requests) =>
        requests.filter((request) => request.peerId !== peerId),
      );
      return true;
    },
    [roomId],
  );

  const rejectKnock = useCallback(
    (peerId) => {
      if (!socketRef.current || !peerId) return false;
      socketRef.current.emit("reject-knock", { roomId, peerId });
      setKnockRequests((requests) =>
        requests.filter((request) => request.peerId !== peerId),
      );
      return true;
    },
    [roomId],
  );

  const forceMuteMic = useCallback(
    (peerId) => {
      if (!isCreator || !socketRef.current || !peerId) return false;
      socketRef.current.emit("force-mute-mic", { roomId, peerId });
      setRemoteMediaLocks((current) => ({
        ...current,
        [peerId]: {
          micLocked: true,
          camLocked: Boolean(current?.[peerId]?.camLocked),
        },
      }));
      return true;
    },
    [isCreator, roomId],
  );

  const forceMuteCam = useCallback(
    (peerId) => {
      if (!isCreator || !socketRef.current || !peerId) return false;
      socketRef.current.emit("force-mute-cam", { roomId, peerId });
      setRemoteMediaLocks((current) => ({
        ...current,
        [peerId]: {
          micLocked: Boolean(current?.[peerId]?.micLocked),
          camLocked: true,
        },
      }));
      return true;
    },
    [isCreator, roomId],
  );

  const allowMic = useCallback(
    (peerId) => {
      if (!isCreator || !socketRef.current || !peerId) return false;
      socketRef.current.emit("allow-mic", { roomId, peerId });
      setRemoteMediaLocks((current) => ({
        ...current,
        [peerId]: {
          micLocked: false,
          camLocked: Boolean(current?.[peerId]?.camLocked),
        },
      }));
      return true;
    },
    [isCreator, roomId],
  );

  const allowCam = useCallback(
    (peerId) => {
      if (!isCreator || !socketRef.current || !peerId) return false;
      socketRef.current.emit("allow-cam", { roomId, peerId });
      setRemoteMediaLocks((current) => ({
        ...current,
        [peerId]: {
          micLocked: Boolean(current?.[peerId]?.micLocked),
          camLocked: false,
        },
      }));
      return true;
    },
    [isCreator, roomId],
  );

  const setRoomPrivacy = useCallback(
    async (nextIsPrivate) => {
      if (!isCreator || roomPrivacyUpdating) return false;
      const normalizedValue = Boolean(nextIsPrivate);
      if (roomIsPrivate === normalizedValue) return true;

      const previousValue = roomIsPrivate;
      setRoomPrivacyUpdating(true);
      setRoomIsPrivate(normalizedValue);
      socketRef.current?.emit("set-room-privacy", {
        roomId,
        isPrivate: normalizedValue,
      });

      try {
        await updateMeetPrivacy(roomId, normalizedValue);
        return true;
      } catch (error) {
        setRoomIsPrivate(previousValue);
        socketRef.current?.emit("set-room-privacy", {
          roomId,
          isPrivate: previousValue,
        });
        throw error;
      } finally {
        setRoomPrivacyUpdating(false);
      }
    },
    [isCreator, roomId, roomIsPrivate, roomPrivacyUpdating],
  );

  const toggleWhiteboard = useCallback(() => {
    if (!isCreator || !socketRef.current) return false;
    const nextActive = !whiteboardStateRef.current.isActive;
    const ownerPeerId =
      getSocketPeerId(socketRef.current) || whiteboardStateRef.current.ownerPeerId;
    commitWhiteboardState((previousState) => ({
      ...previousState,
      isActive: nextActive,
      ownerPeerId,
      ownerDisplayName:
        displayNameRef.current || previousState.ownerDisplayName || "Host",
    }));
    socketRef.current.emit(nextActive ? "whiteboard-start" : "whiteboard-stop", {
      roomId,
    });
    return true;
  }, [commitWhiteboardState, isCreator, roomId]);

  const clearWhiteboard = useCallback(() => {
    if (!isCreator || !socketRef.current) return false;
    const activeTabId = resolveWhiteboardTargetTabId(
      whiteboardStateRef.current,
      whiteboardStateRef.current.activeTabId,
    );
    commitWhiteboardState((previousState) =>
      clearWhiteboardTargetInState(previousState, {
        tabId: activeTabId,
        pageNumber: 1,
      }),
    );
    socketRef.current.emit("whiteboard-clear", { roomId, tabId: activeTabId });
    return true;
  }, [commitWhiteboardState, isCreator, roomId]);

  const clearWhiteboardPage = useCallback(
    ({ tabId, pageNumber }) => {
      if (!isCreator || !socketRef.current) return false;
      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );
      commitWhiteboardState((previousState) =>
        clearWhiteboardTargetInState(previousState, {
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
    ({ tabId, pageNumber } = {}) => {
      if (!isCreator || !socketRef.current) return false;
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
    ({ tabId, pageNumber } = {}) => {
      if (!isCreator || !socketRef.current) return false;
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
      if (!isCreator || !socketRef.current) return false;
      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId,
      );
      commitWhiteboardState((previousState) =>
        setWhiteboardActiveTabInState(previousState, targetTabId),
      );
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
      const previewLibrary = mergeWhiteboardPdfLibraryItems(currentLibrary, [
        {
          id: `preview-${file.name}-${file.size}`,
          title: file.name.replace(/\.pdf$/i, ""),
          fileUrl: "/preview",
          fileName: file.name,
          fileSize: file.size || 0,
          createdAt: Date.now(),
        },
      ]);

      if (sumWhiteboardPdfLibraryBytes(previewLibrary) > whiteboardPdfLibraryBytesLimit) {
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

        commitWhiteboardState((previousState) =>
          addWhiteboardPdfLibraryItemToState(previousState, nextItem),
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
      } catch (uploadError) {
        return {
          ok: false,
          error:
            uploadError?.response?.data?.message ||
            uploadError?.message ||
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
      if (!libraryItem) return { ok: false, error: "PDF item missing" };

      const currentPdfTabsCount = (whiteboardStateRef.current?.tabs || []).filter(
        (tab) => tab?.type === "pdf",
      ).length;
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

      commitWhiteboardState((previousState) => ({
        ...addWhiteboardPdfTabToState(previousState, {
          id: tabId,
          title: libraryItem.title,
          fileUrl: libraryItem.fileUrl,
          fileName: libraryItem.fileName,
          fileSize: libraryItem.fileSize,
          selectedPagesMode: selectedPages.length > 0 ? "custom" : "all",
          selectedPages,
        }),
        pdfLibrary: addWhiteboardPdfLibraryItemToState(
          previousState,
          libraryItem,
        ).pdfLibrary,
        ownerPeerId:
          getSocketPeerId(socketRef.current) || previousState.ownerPeerId,
        ownerDisplayName:
          displayNameRef.current || previousState.ownerDisplayName || "Host",
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
    [commitWhiteboardState, isCreator, roomId, whiteboardPdfTabLimit],
  );

  const removeWhiteboardTab = useCallback(
    (tabId) => {
      if (!isCreator || !socketRef.current) return false;
      const normalizedTabId = normalizeWhiteboardTabId(tabId);
      if (!normalizedTabId || normalizedTabId === WHITEBOARD_BOARD_TAB_ID) {
        return false;
      }
      commitWhiteboardState((previousState) =>
        removeWhiteboardTabFromState(previousState, normalizedTabId),
      );
      socketRef.current.emit("whiteboard-tab-remove", {
        roomId,
        tabId: normalizedTabId,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const syncWhiteboardPdfViewport = useCallback(
    (payload) => {
      if (!isCreator || !socketRef.current) return false;
      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        payload?.tabId || whiteboardStateRef.current.activeTabId,
      );
      const nextPayload = { ...payload, tabId: targetTabId };
      commitWhiteboardState((previousState) =>
        setWhiteboardPdfViewportInState(previousState, nextPayload),
      );
      socketRef.current.emit("whiteboard-pdf-viewport", {
        roomId,
        ...nextPayload,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const syncWhiteboardBoardZoom = useCallback(
    (payload) => {
      if (!isCreator || !socketRef.current) return false;
      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        payload?.tabId || WHITEBOARD_BOARD_TAB_ID,
      );
      const nextPayload = { ...payload, tabId: targetTabId };
      commitWhiteboardState((previousState) =>
        setWhiteboardBoardZoomInState(previousState, nextPayload),
      );
      socketRef.current.emit("whiteboard-board-zoom", {
        roomId,
        ...nextPayload,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const syncWhiteboardCursor = useCallback(
    ({ x, y }) => {
      if (!isCreator || !socketRef.current || !whiteboardStateRef.current.isActive) {
        return false;
      }
      const peerId =
        getSocketPeerId(socketRef.current) ||
        whiteboardStateRef.current.ownerPeerId ||
        "whiteboard-owner";
      const nextCursor = normalizeWhiteboardCursor({
        peerId,
        displayName:
          displayNameRef.current ||
          whiteboardStateRef.current.ownerDisplayName ||
          "Host",
        x,
        y,
        updatedAt: Date.now(),
      });
      if (!nextCursor) return false;
      socketRef.current.emit("whiteboard-cursor", { roomId, ...nextCursor });
      return true;
    },
    [isCreator, roomId],
  );

  const clearWhiteboardCursor = useCallback(() => {
    if (!isCreator || !socketRef.current) return false;
    commitWhiteboardCursor(null);
    socketRef.current.emit("whiteboard-cursor-clear", {
      roomId,
      peerId: getSocketPeerId(socketRef.current),
    });
    return true;
  }, [commitWhiteboardCursor, isCreator, roomId]);

  const startWhiteboardStroke = useCallback(
    (payload) => {
      if (!isCreator || !socketRef.current) return false;
      const normalizedPoints = normalizeWhiteboardPoints(
        Array.isArray(payload?.points) && payload.points.length > 0
          ? payload.points
          : [payload?.point],
        WHITEBOARD_MAX_POINTS_PER_STROKE,
      );
      const stroke = normalizeWhiteboardStroke({
        id: payload?.strokeId,
        tool: payload?.tool,
        color: payload?.color,
        size: payload?.size,
        points: normalizedPoints,
        text: payload?.text,
        fillColor: payload?.fillColor,
        fontFamily: payload?.fontFamily,
        textSize: payload?.textSize,
        textAlign: payload?.textAlign,
        fontPixelSize: payload?.fontPixelSize,
        edgeStyle: payload?.edgeStyle,
        rotation: payload?.rotation,
      });
      if (!stroke) return false;

      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        payload?.tabId || whiteboardStateRef.current.activeTabId,
      );
      commitWhiteboardState((previousState) => ({
        ...upsertWhiteboardStrokeInState(previousState, {
          tabId: targetTabId,
          pageNumber: payload?.pageNumber,
          stroke,
        }),
        ownerPeerId:
          getSocketPeerId(socketRef.current) || previousState.ownerPeerId,
        ownerDisplayName:
          displayNameRef.current || previousState.ownerDisplayName || "Host",
      }));
      socketRef.current.emit("whiteboard-stroke-start", {
        roomId,
        tabId: targetTabId,
        pageNumber: payload?.pageNumber,
        strokeId: stroke.id,
        tool: stroke.tool,
        color: stroke.color,
        size: stroke.size,
        point: stroke.points[0],
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
    [commitWhiteboardState, isCreator, roomId],
  );

  const appendWhiteboardStroke = useCallback(
    ({ tabId, pageNumber, strokeId, points }) => {
      if (!isCreator || !socketRef.current || !strokeId) return false;
      const normalizedPoints = normalizeWhiteboardPoints(points);
      if (normalizedPoints.length === 0) return false;
      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );
      commitWhiteboardState((previousState) =>
        appendWhiteboardStrokePointsInState(previousState, {
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
      if (!isCreator || !socketRef.current || !strokeId) return false;
      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        tabId || whiteboardStateRef.current.activeTabId,
      );
      commitWhiteboardState((previousState) =>
        removeWhiteboardStrokeFromState(previousState, {
          tabId: targetTabId,
          pageNumber,
          strokeId,
        }),
      );
      socketRef.current.emit("whiteboard-stroke-remove", {
        roomId,
        tabId: targetTabId,
        pageNumber,
        strokeId,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const updateWhiteboardStroke = useCallback(
    (payload) => {
      if (!isCreator || !socketRef.current || !payload?.strokeId) return false;
      const targetTabId = resolveWhiteboardTargetTabId(
        whiteboardStateRef.current,
        payload.tabId || whiteboardStateRef.current.activeTabId,
      );
      const nextPayload = {
        ...payload,
        tabId: targetTabId,
        point: normalizeWhiteboardPoint(payload.point),
        points: normalizeWhiteboardPoints(
          payload.points,
          WHITEBOARD_MAX_POINTS_PER_STROKE,
        ),
      };
      commitWhiteboardState((previousState) =>
        updateWhiteboardStrokeInState(previousState, nextPayload),
      );
      socketRef.current.emit("whiteboard-stroke-update", {
        roomId,
        ...nextPayload,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const leaveSignaling = useCallback(() => {
    socketRef.current?.emit("leave-room", { roomId });
  }, [roomId]);

  return {
    joinStatus,
    canConnectLiveKit: joinStatus === "joined",
    signalFallbackLiveKitOnly: didFallbackLiveKitOnlyRef.current,
    error,
    roomTitle,
    roomIsPrivate,
    roomPrivacyUpdating,
    roomCreatorId,
    localMediaLocks,
    remoteMediaLocks,
    knockRequests,
    approveKnock,
    rejectKnock,
    forceMuteMic,
    forceMuteCam,
    allowMic,
    allowCam,
    setRoomPrivacy,
    whiteboardState,
    whiteboardCursor,
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
    syncWhiteboardCursor,
    clearWhiteboardCursor,
    startWhiteboardStroke,
    appendWhiteboardStroke,
    removeWhiteboardStroke,
    updateWhiteboardStroke,
    leaveSignaling,
  };
}
