import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { AudioPresets, Room, RoomEvent } from "livekit-client";
import axiosInstance from "../api/axiosInstance";
import { createLivekitToken, fetchLivekitConfig } from "../api/livekitApi";
import useAuthStore from "../store/authStore";
import { API_BASE_URL, LIVEKIT_URL } from "../config/env";
import { isValidMeetRoomId } from "../utils/meetStore";
import { APP_LIMITS, getTierLimit } from "../constants/appLimits";
import { playJoinRequestTone } from "../features/calls/utils/ringtone";

const SIGNAL_URL = API_BASE_URL;
const MOBILE_CAMERA_MEDIA_QUERY = "(max-width: 768px)";

const TURN_URLS = import.meta.env.VITE_TURN_URLS
  ? import.meta.env.VITE_TURN_URLS.split(",").map((item) => item.trim())
  : [];

if (TURN_URLS.length > 0) {
  const hasCreds =
    import.meta.env.VITE_TURN_USERNAME && import.meta.env.VITE_TURN_CREDENTIAL;
  if (!hasCreds) {
    console.warn(
      "[useWebRTC] VITE_TURN_URLS is set but VITE_TURN_USERNAME / VITE_TURN_CREDENTIAL are missing. " +
        "TURN server will likely reject unauthenticated requests.",
    );
  }
}

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

const LIVEKIT_DEBUG_PREFIX = "[Jamm RTC]";

const logRtcInfo = (message, details) => {
  if (details === undefined) {
    console.info(`${LIVEKIT_DEBUG_PREFIX} ${message}`);
    return;
  }
  console.info(`${LIVEKIT_DEBUG_PREFIX} ${message}`, details);
};

const logRtcWarn = (message, details) => {
  if (details === undefined) {
    console.warn(`${LIVEKIT_DEBUG_PREFIX} ${message}`);
    return;
  }
  console.warn(`${LIVEKIT_DEBUG_PREFIX} ${message}`, details);
};

const logRtcError = (message, details) => {
  if (details === undefined) {
    console.error(`${LIVEKIT_DEBUG_PREFIX} ${message}`);
    return;
  }
  console.error(`${LIVEKIT_DEBUG_PREFIX} ${message}`, details);
};

const summarizeIceServers = (rtcConfig) => {
  const iceServers = Array.isArray(rtcConfig?.iceServers) ? rtcConfig.iceServers : [];

  return iceServers.map((server, index) => {
    const rawUrls = Array.isArray(server?.urls) ? server.urls : [server?.urls];
    const urls = rawUrls.map((value) => String(value || "").trim()).filter(Boolean);
    const hasTurn = urls.some((value) => value.startsWith("turn:") || value.startsWith("turns:"));
    const hasStun = urls.some((value) => value.startsWith("stun:") || value.startsWith("stuns:"));

    return {
      index,
      urls,
      transport: hasTurn ? "turn" : hasStun ? "stun" : "unknown",
      hasCredential: Boolean(server?.username || server?.credential),
    };
  });
};

const extractSelectedIcePairSummary = async (pcTransport) => {
  if (!pcTransport?.getStats) {
    return null;
  }

  const stats = await pcTransport.getStats();
  let selectedPair = null;
  const localCandidates = new Map();
  const remoteCandidates = new Map();

  stats.forEach((report) => {
    if (report?.type === "local-candidate") {
      localCandidates.set(report.id, report);
      return;
    }

    if (report?.type === "remote-candidate") {
      remoteCandidates.set(report.id, report);
    }
  });

  stats.forEach((report) => {
    if (report?.type !== "candidate-pair") {
      return;
    }

    const isSelected =
      report.selected === true ||
      report.nominated === true ||
      report.state === "succeeded";

    if (!isSelected) {
      return;
    }

    if (!selectedPair || report.selected === true || report.nominated === true) {
      selectedPair = report;
    }
  });

  if (!selectedPair) {
    return {
      path: "unknown",
      reason: "no-selected-candidate-pair",
    };
  }

  const localCandidate = localCandidates.get(selectedPair.localCandidateId) || null;
  const remoteCandidate = remoteCandidates.get(selectedPair.remoteCandidateId) || null;
  const localType = String(localCandidate?.candidateType || "").toLowerCase();
  const remoteType = String(remoteCandidate?.candidateType || "").toLowerCase();
  const path =
    localType === "relay" || remoteType === "relay"
      ? "turn"
      : localType === "srflx" || remoteType === "srflx"
        ? "stun"
        : localType === "host" && remoteType === "host"
          ? "direct"
          : "unknown";

  return {
    path,
    localCandidateType: localType || "unknown",
    remoteCandidateType: remoteType || "unknown",
    protocol:
      String(localCandidate?.protocol || remoteCandidate?.protocol || "").toLowerCase() ||
      "unknown",
    currentRoundTripTime: Number(selectedPair.currentRoundTripTime || 0),
    availableOutgoingBitrate: Number(selectedPair.availableOutgoingBitrate || 0),
    bytesSent: Number(selectedPair.bytesSent || 0),
    bytesReceived: Number(selectedPair.bytesReceived || 0),
    networkType: String(localCandidate?.networkType || "").toLowerCase() || "unknown",
  };
};

const buildLivekitAudioCaptureOptions = () => ({
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
  channelCount: 1,
  sampleRate: 48000,
  sampleSize: 16,
  latency: 0.01,
  voiceIsolation: true,
});

const buildLivekitAudioPublishOptions = () => ({
  audioPreset: AudioPresets.speech,
  dtx: true,
  red: true,
  forceStereo: false,
  stopMicTrackOnMute: false,
});

const getLivekitCameraProfile = (qualityProfile, withScreenShare = false) => {
  const key = String(qualityProfile?.key || "");

  if (withScreenShare) {
    if (key === "screen-poor") {
      return {
        width: 854,
        height: 480,
        frameRate: 14,
        maxBitrate: 700_000,
        maxFramerate: 14,
      };
    }

    if (key === "screen-limited") {
      return {
        width: 960,
        height: 540,
        frameRate: 18,
        maxBitrate: 1_200_000,
        maxFramerate: 18,
      };
    }

    return {
      width: 1280,
      height: 720,
      frameRate: 24,
      maxBitrate: 1_900_000,
      maxFramerate: 24,
    };
  }

  if (key === "poor") {
    return {
      width: 640,
      height: 360,
      frameRate: 15,
      maxBitrate: 500_000,
      maxFramerate: 15,
    };
  }

  if (key === "crowded") {
    return {
      width: 960,
      height: 540,
      frameRate: 20,
      maxBitrate: 950_000,
      maxFramerate: 20,
    };
  }

  return {
    width: 1280,
    height: 720,
    frameRate: 24,
    maxBitrate: 1_800_000,
    maxFramerate: 24,
  };
};

const getLivekitScreenProfile = (qualityProfile) => {
  const key = String(qualityProfile?.key || "");

  if (key === "screen-poor") {
    return {
      width: 1600,
      height: 900,
      frameRate: 8,
      maxBitrate: 2_500_000,
      maxFramerate: 8,
    };
  }

  if (key === "screen-limited") {
    return {
      width: 1920,
      height: 1080,
      frameRate: 12,
      maxBitrate: 4_500_000,
      maxFramerate: 12,
    };
  }

  return {
    width: 2560,
    height: 1440,
    frameRate: 15,
    maxBitrate: 8_000_000,
    maxFramerate: 15,
  };
};

const buildLivekitCameraCaptureOptions = (
  qualityProfile,
  withScreenShare = false,
  facingMode = "user",
) => {
  const profile = getLivekitCameraProfile(qualityProfile, withScreenShare);

  return {
    resolution: {
      width: profile.width,
      height: profile.height,
      frameRate: profile.frameRate,
    },
    ...(isLikelyMobileDevice() ? { facingMode } : {}),
  };
};

const buildLivekitCameraPublishOptions = (qualityProfile, withScreenShare = false) => {
  const profile = getLivekitCameraProfile(qualityProfile, withScreenShare);

  return {
    simulcast: true,
    videoEncoding: {
      maxBitrate: profile.maxBitrate,
      maxFramerate: profile.maxFramerate,
    },
  };
};

const buildLivekitScreenShareOptions = (qualityProfile) => {
  const profile = getLivekitScreenProfile(qualityProfile);

  return {
    resolution: {
      width: profile.width,
      height: profile.height,
      frameRate: profile.frameRate,
    },
  };
};

const buildLivekitScreenSharePublishOptions = (qualityProfile) => {
  const profile = getLivekitScreenProfile(qualityProfile);

  return {
    simulcast: false,
    videoEncoding: {
      maxBitrate: profile.maxBitrate,
      maxFramerate: profile.maxFramerate,
    },
  };
};

const CALL_QUALITY_PROFILES = {
  balanced: {
    key: "balanced",
    label: "balanced",
    width: 960,
    height: 540,
    frameRate: 24,
    videoBitrate: 700_000,
    audioBitrate: 64_000,
    scaleResolutionDownBy: 1,
  },
  crowded: {
    key: "crowded",
    label: "crowded",
    width: 640,
    height: 360,
    frameRate: 18,
    videoBitrate: 320_000,
    audioBitrate: 64_000,
    scaleResolutionDownBy: 1.2,
  },
  poor: {
    key: "poor",
    label: "audio-priority",
    width: 320,
    height: 180,
    frameRate: 10,
    videoBitrate: 90_000,
    audioBitrate: 56_000,
    scaleResolutionDownBy: 1.6,
  },
  screen: {
    key: "screen",
    label: "screen-share",
    width: 1920,
    height: 1080,
    frameRate: 12,
    videoBitrate: 2_400_000,
    audioBitrate: 64_000,
    scaleResolutionDownBy: 1,
  },
  screenLimited: {
    key: "screen-limited",
    label: "screen-fast",
    width: 1600,
    height: 900,
    frameRate: 10,
    videoBitrate: 1_600_000,
    audioBitrate: 64_000,
    scaleResolutionDownBy: 1,
  },
  screenPoor: {
    key: "screen-poor",
    label: "screen-lite",
    width: 1280,
    height: 720,
    frameRate: 8,
    videoBitrate: 900_000,
    audioBitrate: 56_000,
    scaleResolutionDownBy: 1,
  },
  screenCamera: {
    key: "screen-camera",
    label: "camera-low",
    width: 960,
    height: 540,
    frameRate: 15,
    videoBitrate: 900_000,
    audioBitrate: 56_000,
    scaleResolutionDownBy: 1.1,
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

const normalizeWhiteboardCursor = (rawCursor) => {
  if (!rawCursor || typeof rawCursor !== "object") {
    return null;
  }

  const x = Number(rawCursor.x);
  const y = Number(rawCursor.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return null;
  }

  const peerId =
    typeof rawCursor.peerId === "string" ? rawCursor.peerId.trim() : "";
  if (!peerId) {
    return null;
  }

  return {
    peerId,
    displayName:
      typeof rawCursor.displayName === "string" ? rawCursor.displayName.trim().slice(0, 60) : "",
    x: Math.min(WHITEBOARD_BOARD_POINT_MAX, Math.max(WHITEBOARD_BOARD_POINT_MIN, x)),
    y: Math.min(WHITEBOARD_BOARD_POINT_MAX, Math.max(WHITEBOARD_BOARD_POINT_MIN, y)),
    updatedAt: Number(rawCursor.updatedAt) || Date.now(),
  };
};

const areWhiteboardPointsEqual = (leftPoint, rightPoint) =>
  Boolean(leftPoint) &&
  Boolean(rightPoint) &&
  Number(leftPoint.x) === Number(rightPoint.x) &&
  Number(leftPoint.y) === Number(rightPoint.y);

const areWhiteboardPointArraysEqual = (leftPoints, rightPoints) => {
  if (!Array.isArray(leftPoints) || !Array.isArray(rightPoints)) {
    return false;
  }

  if (leftPoints.length !== rightPoints.length) {
    return false;
  }

  return leftPoints.every((point, index) =>
    areWhiteboardPointsEqual(point, rightPoints[index]),
  );
};

const shouldIgnoreIncomingWhiteboardEvent = (payload, localPeerId) => {
  const normalizedLocalPeerId =
    typeof localPeerId === "string" ? localPeerId.trim() : "";
  if (!normalizedLocalPeerId || !payload || typeof payload !== "object") {
    return false;
  }

  const candidatePeerIds = [
    payload.peerId,
    payload.senderId,
    payload.ownerPeerId,
    payload.sourcePeerId,
  ]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);

  return candidatePeerIds.includes(normalizedLocalPeerId);
};

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
      viewportBaseHeight: normalizeWhiteboardViewportBaseHeight(tab.viewportBaseHeight),
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
    scrollLeftRatio: normalizeWhiteboardViewportLeftRatio(tab.scrollLeftRatio),
    scrollTopRatio: normalizeWhiteboardScrollRatio(tab.scrollTopRatio),
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
  updatedAt: typeof rawState?.updatedAt === "number" ? rawState.updatedAt : 0,
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

  const appendPointsToStroke = (stroke) => {
    if (stroke.id !== strokeId) {
      return stroke;
    }

    const existingPoints = Array.isArray(stroke.points) ? stroke.points : [];
    const nextPoints = Array.isArray(points) ? points : [];

    if (nextPoints.length === 0) {
      return stroke;
    }

    if (existingPoints.length >= nextPoints.length) {
      const existingTail = existingPoints.slice(existingPoints.length - nextPoints.length);
      if (areWhiteboardPointArraysEqual(existingTail, nextPoints)) {
        return stroke;
      }
    }

    if (existingPoints.length >= WHITEBOARD_MAX_POINTS_PER_STROKE) {
      return stroke;
    }
    const remaining = WHITEBOARD_MAX_POINTS_PER_STROKE - existingPoints.length;
    return {
      ...stroke,
      points: existingPoints.concat(nextPoints.slice(0, remaining)),
    };
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
                  strokes: page.strokes.map(appendPointsToStroke),
                },
          ),
        };
      }

      return {
        ...tab,
        strokes: tab.strokes.map(appendPointsToStroke),
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
    viewportBaseHeight: WHITEBOARD_MIN_VIEWPORT_BASE_HEIGHT,
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
    viewportBaseHeight,
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
            viewportBaseHeight:
              typeof viewportBaseHeight === "undefined"
                ? normalizeWhiteboardViewportBaseHeight(tab.viewportBaseHeight)
                : normalizeWhiteboardViewportBaseHeight(viewportBaseHeight),
          },
    ),
    activeTabId: targetTabId,
  };
};

const setWhiteboardBoardZoomInState = (
  state,
  { tabId, zoom, viewportBaseWidth, viewportBaseHeight, scrollLeftRatio, scrollTopRatio },
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
            scrollLeftRatio:
              typeof scrollLeftRatio === "undefined"
                ? normalizeWhiteboardViewportLeftRatio(tab.scrollLeftRatio)
                : normalizeWhiteboardViewportLeftRatio(scrollLeftRatio),
            scrollTopRatio:
              typeof scrollTopRatio === "undefined"
                ? normalizeWhiteboardScrollRatio(tab.scrollTopRatio)
                : normalizeWhiteboardScrollRatio(scrollTopRatio),
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
  const displayNameRef = useRef(displayName);
  useEffect(() => { displayNameRef.current = displayName; }, [displayName]);
  const socketRef = useRef(null);
  // Stores cleanup functions for socket event listeners registered in start()
  const socketDetachRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionsRef = useRef({});
  const iceConfigRef = useRef(buildFallbackIceConfig());
  const livekitRoomRef = useRef(null);
  const livekitConnectPromiseRef = useRef(null);
  const [resolvedLivekitUrl, setResolvedLivekitUrl] = useState(() => LIVEKIT_URL || "");
  const shouldUseLiveKit = Boolean(resolvedLivekitUrl);

  const [localStream, setLocalStream] = useState(null);
  const [livekitLocalMedia, setLivekitLocalMedia] = useState({
    cameraTrack: null,
    microphoneTrack: null,
    screenVideoTrack: null,
    screenAudioTrack: null,
  });
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
  const [isLivekitReconnecting, setIsLivekitReconnecting] = useState(false);
  const [error, setError] = useState(null);
  const [roomTitle, setRoomTitle] = useState(chatTitle || "");
  const [roomIsPrivate, setRoomIsPrivate] = useState(isPrivate);
  const [roomCreatorId, setRoomCreatorId] = useState(null);
  const [remoteIsRecording, setRemoteIsRecording] = useState(false);
  const [networkQuality, setNetworkQuality] = useState("good");
  const [qualityProfile, setQualityProfile] = useState(
    CALL_QUALITY_PROFILES.balanced,
  );
  const [whiteboardState, setWhiteboardState] = useState(() =>
    createInitialWhiteboardState(),
  );
  const [whiteboardCursor, setWhiteboardCursor] = useState(null);
  const [cameraFacingMode, setCameraFacingMode] = useState("user");
  const [videoInputCount, setVideoInputCount] = useState(0);
  const screenStreamRef = useRef(null);
  const screenShareAbortControllerRef = useRef(null);
  // Guard against onended + interval both calling toggleScreenShare concurrently
  const screenShareStoppingRef = useRef(false);
  const remoteStreamsRef = useRef([]);
  const compositeRemoteStreamsRef = useRef({});
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
  const iceRestartAttemptsRef = useRef({});
  const mediaStateSyncIntervalRef = useRef(null);
  const lastEmittedMediaStateRef = useRef(null);
  const qualityProfileRef = useRef(CALL_QUALITY_PROFILES.balanced);
  const cameraFacingModeRef = useRef("user");
  const whiteboardStateRef = useRef(createInitialWhiteboardState());
  const whiteboardCursorRef = useRef(null);
  const storedPdfLibraryRef = useRef([]);
  const lastWhiteboardUpdatedAtRef = useRef(
    Number(createInitialWhiteboardState()?.updatedAt) || 0,
  );
  const remotePeerStatesRef = useRef({});
  const isMicOnRef = useRef(initialMicOn);
  const isCamOnRef = useRef(initialCamOn);
  const removedPeerIdsRef = useRef(new Set());
  const livekitRemoteMediaRef = useRef({});
  const currentUserId = String(currentUser?._id || currentUser?.id || "");
  const whiteboardPdfTabLimit = getTierLimit(APP_LIMITS.whiteboardPdfTabs, currentUser);
  const whiteboardPdfLibraryBytesLimit = getTierLimit(
    APP_LIMITS.whiteboardPdfLibraryBytes,
    currentUser,
  );

  useEffect(() => {
    setRoomTitle(chatTitle || "");
    setRoomIsPrivate(Boolean(isPrivate));
    setRoomCreatorId(null);
  }, [roomId, chatTitle, isPrivate]);

  useEffect(() => {
    let cancelled = false;

    if (LIVEKIT_URL) {
      logRtcInfo("LiveKit URL env'dan olindi", { url: LIVEKIT_URL });
      setResolvedLivekitUrl(LIVEKIT_URL);
      return undefined;
    }

    fetchLivekitConfig()
      .then((config) => {
        if (cancelled) {
          return;
        }
        const nextUrl = String(config?.url || "").trim();
        if (nextUrl) {
          logRtcInfo("LiveKit config API'dan olindi", { url: nextUrl });
          setResolvedLivekitUrl(nextUrl);
        }
      })
      .catch(() => {
        if (!cancelled) {
          logRtcWarn("LiveKit config API olinmadi");
          setResolvedLivekitUrl("");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const applyLocalMediaStream = useCallback((tracks) => {
    const nextTracks = Array.isArray(tracks) ? tracks.filter(Boolean) : [];
    const nextStream = nextTracks.length > 0 ? new MediaStream(nextTracks) : null;
    localStreamRef.current = nextStream;
    setLocalStream(nextStream);
    return nextStream;
  }, []);

  const applyScreenMediaStream = useCallback((tracks) => {
    const nextTracks = Array.isArray(tracks) ? tracks.filter(Boolean) : [];
    const nextStream = nextTracks.length > 0 ? new MediaStream(nextTracks) : null;
    screenStreamRef.current = nextStream;
    setScreenStream(nextStream);
    setIsScreenSharing(nextTracks.length > 0);
    return nextStream;
  }, []);

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const syncRemotePeerDisplayName = useCallback((peerId, name) => {
    const nextName =
      typeof name === "string" && name.trim()
        ? name.trim()
        : knownPeerNamesRef.current[peerId] || "";
    if (!peerId || !nextName) {
      return;
    }

    removedPeerIdsRef.current.delete(peerId);
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
    if (!peerId) {
      return;
    }

    removedPeerIdsRef.current.delete(peerId);
    const resolvedName =
      (typeof name === "string" && name.trim()) ||
      knownPeerNamesRef.current[peerId] ||
      peerId;
    const compositeStream =
      compositeRemoteStreamsRef.current[peerId] || new MediaStream();
    compositeRemoteStreamsRef.current[peerId] = compositeStream;

    [...(stream?.getTracks?.() || [])].forEach((track) => {
      const alreadyExists = compositeStream
        .getTracks()
        .some((existingTrack) => existingTrack.id === track.id);
      if (!alreadyExists) {
        compositeStream.addTrack(track);
      }
    });

    const videoTracks = compositeStream.getVideoTracks?.() || [];
    const audioTracks = compositeStream.getAudioTracks?.() || [];
    const nextActualHasVideo = videoTracks.some((track) => track.readyState === "live");
    const nextActualHasAudio = audioTracks.some((track) => track.readyState === "live");
    const nextActualVideoMuted =
      videoTracks.length > 0
        ? videoTracks.every(
            (track) => track.readyState !== "live" || track.muted === true,
          )
        : true;
    const nextActualAudioMuted =
      audioTracks.length > 0
        ? audioTracks.every(
            (track) => track.readyState !== "live" || track.muted === true,
          )
        : true;
    setRemoteStreams((prev) => {
      if (prev.find((r) => r.peerId === peerId)) {
        return prev.map((r) =>
          r.peerId === peerId
            ? { ...r, stream: compositeStream, displayName: resolvedName }
            : r,
        );
      }
      return [...prev, { peerId, stream: compositeStream, displayName: resolvedName }];
    });
    setRemotePeerStates((prev) => {
      const prevState = prev[peerId] || {};
      return {
        ...prev,
        [peerId]: {
          ...prevState,
          actualHasVideo: nextActualHasVideo,
          actualHasAudio: nextActualHasAudio,
          actualVideoMuted: nextActualVideoMuted,
          actualAudioMuted: nextActualAudioMuted,
          hasVideo:
            typeof prevState.signaledHasVideo === "boolean"
              ? prevState.hasVideo
              : nextActualHasVideo,
          hasAudio:
            typeof prevState.signaledHasAudio === "boolean"
              ? prevState.hasAudio
              : nextActualHasAudio,
          videoMuted:
            typeof prevState.signaledVideoMuted === "boolean"
              ? prevState.videoMuted
              : nextActualVideoMuted,
          audioMuted:
            typeof prevState.signaledAudioMuted === "boolean"
              ? prevState.audioMuted
              : nextActualAudioMuted,
          connectionState: prevState.connectionState || "connecting",
          displayName: resolvedName || prevState.displayName || peerId,
        },
      };
    });
  }, []);

  const updateRemotePeerState = useCallback((peerId, patch) => {
    if (!peerId || removedPeerIdsRef.current.has(peerId)) {
      return;
    }

    setRemotePeerStates((prev) => ({
      ...prev,
      [peerId]: {
        ...(prev[peerId] || {}),
        ...patch,
      },
    }));
  }, []);

  useEffect(() => {
    remoteStreamsRef.current = remoteStreams;
  }, [remoteStreams]);

  useEffect(() => {
    remotePeerStatesRef.current = remotePeerStates;
  }, [remotePeerStates]);

  useEffect(() => {
    isMicOnRef.current = isMicOn;
  }, [isMicOn]);

  useEffect(() => {
    isCamOnRef.current = isCamOn;
  }, [isCamOn]);

  const commitWhiteboardState = useCallback((updater) => {
    setWhiteboardState((prev) => {
      const nextState =
        typeof updater === "function" ? updater(prev) : updater;
      lastWhiteboardUpdatedAtRef.current = Math.max(
        lastWhiteboardUpdatedAtRef.current || 0,
        Number(nextState?.updatedAt || 0),
      );
      whiteboardStateRef.current = nextState;
      return nextState;
    });
  }, []);

  const commitWhiteboardCursor = useCallback((nextCursor) => {
    whiteboardCursorRef.current = nextCursor;
    setWhiteboardCursor(nextCursor);
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
    lastWhiteboardUpdatedAtRef.current = 0;
    storedPdfLibraryRef.current = [];
    setWhiteboardState(nextState);
  }, []);

  const isLivekitScreenSource = useCallback((source) => {
    const normalizedSource = String(source || "").toLowerCase();
    return normalizedSource === "screen_share" || normalizedSource === "screen_share_audio";
  }, []);

  const getLivekitPublicationTrack = useCallback((publication) => {
    if (!publication) {
      return null;
    }

    return publication.track || publication.videoTrack || publication.audioTrack || null;
  }, []);

  const getLivekitPublicationMediaStreamTrack = useCallback(
    (publication) => getLivekitPublicationTrack(publication)?.mediaStreamTrack || null,
    [getLivekitPublicationTrack],
  );

  const optimizeLivekitScreenShareTrack = useCallback(
    (publication, profile) => {
      if (!isLivekitScreenSource(publication?.source)) {
        return;
      }

      const mediaStreamTrack = getLivekitPublicationMediaStreamTrack(publication);
      if (mediaStreamTrack?.kind !== "video") {
        return;
      }

      const screenProfile = getLivekitScreenProfile(profile);

      try {
        mediaStreamTrack.contentHint = "detail";
      } catch {}

      try {
        mediaStreamTrack
          .applyConstraints?.({
            width: {
              ideal: screenProfile.width,
              max: screenProfile.width,
            },
            height: {
              ideal: screenProfile.height,
              max: screenProfile.height,
            },
            frameRate: {
              ideal: screenProfile.frameRate,
              max: screenProfile.frameRate,
            },
          })
          ?.catch?.(() => {});
      } catch {}
    },
    [getLivekitPublicationMediaStreamTrack, isLivekitScreenSource],
  );

  const optimizeLivekitCameraTrack = useCallback(
    (publication, profile, withScreenShare = false) => {
      if (isLivekitScreenSource(publication?.source)) {
        return;
      }

      const mediaStreamTrack = getLivekitPublicationMediaStreamTrack(publication);
      if (mediaStreamTrack?.kind !== "video") {
        return;
      }

      const cameraProfile = getLivekitCameraProfile(profile, withScreenShare);

      try {
        mediaStreamTrack.contentHint = "motion";
      } catch {}

      try {
        mediaStreamTrack
          .applyConstraints?.({
            width: {
              ideal: cameraProfile.width,
              max: cameraProfile.width,
            },
            height: {
              ideal: cameraProfile.height,
              max: cameraProfile.height,
            },
            frameRate: {
              ideal: cameraProfile.frameRate,
              max: cameraProfile.frameRate,
            },
          })
          ?.catch?.(() => {});
      } catch {}
    },
    [getLivekitPublicationMediaStreamTrack, isLivekitScreenSource],
  );

  const optimizeLivekitLocalTracks = useCallback(
    (room, profile) => {
      if (!room?.localParticipant) {
        return;
      }

      const hasActiveScreenShare = Boolean(
        room.localParticipant.isScreenShareEnabled || screenStreamRef.current,
      );

      room.localParticipant.trackPublications.forEach((publication) => {
        optimizeLivekitCameraTrack(publication, profile, hasActiveScreenShare);
        optimizeLivekitScreenShareTrack(publication, profile);
      });
    },
    [optimizeLivekitCameraTrack, optimizeLivekitScreenShareTrack],
  );

  const logLivekitTransportDiagnostics = useCallback(
    async (room, phase) => {
      const pcManager = room?.engine?.pcManager;
      if (!pcManager) {
        logRtcWarn(`LiveKit ${phase}: pcManager topilmadi`);
        return;
      }

      const logTransport = async (label, transport) => {
        if (!transport) {
          logRtcWarn(`LiveKit ${phase}: ${label} transport topilmadi`);
          return;
        }

        try {
          const summary = await extractSelectedIcePairSummary(transport);
          logRtcInfo(`LiveKit ${phase}: ${label} ICE`, summary);
        } catch (error) {
          logRtcWarn(`LiveKit ${phase}: ${label} ICE stat olinmadi`, {
            error: error instanceof Error ? error.message : String(error),
          });
        }
      };

      try {
        const connectedAddress = await room?.engine?.getConnectedServerAddress?.();
        if (connectedAddress) {
          logRtcInfo(`LiveKit ${phase}: server address`, { connectedAddress });
        }
      } catch (error) {
        logRtcWarn(`LiveKit ${phase}: server address olinmadi`, {
          error: error instanceof Error ? error.message : String(error),
        });
      }

      await Promise.all([
        logTransport("publisher", pcManager.publisher),
        logTransport("subscriber", pcManager.subscriber),
      ]);
    },
    [],
  );

  const attachLivekitIceCandidateErrorLogging = useCallback((room) => {
    const pcManager = room?.engine?.pcManager;
    if (!pcManager) {
      return;
    }

    const bindLogger = (label, transport) => {
      if (!transport) {
        return;
      }

      transport.onIceCandidateError = (event) => {
        logRtcWarn(`LiveKit ${label} ICE candidate error`, {
          address: event?.address || "",
          port: Number(event?.port || 0),
          url: String(event?.url || ""),
          errorCode: Number(event?.errorCode || 0),
          errorText: String(event?.errorText || ""),
        });
      };
    };

    bindLogger("publisher", pcManager.publisher);
    bindLogger("subscriber", pcManager.subscriber);
  }, []);

  const ensureLivekitParticipantSubscriptions = useCallback((participant) => {
    if (!participant?.trackPublications) {
      return;
    }

    participant.trackPublications.forEach((publication) => {
      if (typeof publication?.setSubscribed === "function") {
        publication.setSubscribed(true);
      }
    });
  }, []);

  const setLivekitRemoteTrack = useCallback((participant, publication, track) => {
    const peerId = String(participant?.identity || "").trim();
    if (!peerId || !track) {
      return;
    }

    const source = String(publication?.source || "").toLowerCase();
    const kind = track?.kind || publication?.kind || track?.mediaStreamTrack?.kind || null;
    const currentEntry = livekitRemoteMediaRef.current[peerId] || {};
    const nextEntry = {
      ...currentEntry,
      displayName:
        String(participant?.name || "").trim() ||
        currentEntry.displayName ||
        knownPeerNamesRef.current[peerId] ||
        peerId,
    };

    if (source === "screen_share" || source === "screen_share_audio") {
      if (kind === "video") {
        nextEntry.screenVideoTrack = track;
      }
      if (kind === "audio") {
        nextEntry.screenAudioTrack = track;
      }
    } else {
      if (kind === "video") {
        nextEntry.videoTrack = track;
      }
      if (kind === "audio") {
        nextEntry.audioTrack = track;
      }
    }

    livekitRemoteMediaRef.current[peerId] = nextEntry;
  }, []);

  const clearLivekitRemoteTrack = useCallback((participant, publication, track) => {
    const peerId = String(participant?.identity || "").trim();
    if (!peerId) {
      return;
    }

    const currentEntry = livekitRemoteMediaRef.current[peerId];
    if (!currentEntry) {
      return;
    }

    const source = String(publication?.source || "").toLowerCase();
    const kind = track?.kind || publication?.kind || track?.mediaStreamTrack?.kind || null;
    const nextEntry = { ...currentEntry };

    if (source === "screen_share" || source === "screen_share_audio") {
      if (kind === "video") {
        nextEntry.screenVideoTrack = null;
      }
      if (kind === "audio") {
        nextEntry.screenAudioTrack = null;
      }
    } else {
      if (kind === "video") {
        nextEntry.videoTrack = null;
      }
      if (kind === "audio") {
        nextEntry.audioTrack = null;
      }
    }

    if (
      !nextEntry.videoTrack &&
      !nextEntry.audioTrack &&
      !nextEntry.screenVideoTrack &&
      !nextEntry.screenAudioTrack
    ) {
      delete livekitRemoteMediaRef.current[peerId];
      return;
    }

    livekitRemoteMediaRef.current[peerId] = nextEntry;
  }, []);

  const syncLivekitLocalState = useCallback(
    (room) => {
      if (!room?.localParticipant) {
        applyLocalMediaStream([]);
        applyScreenMediaStream([]);
        setLivekitLocalMedia({
          cameraTrack: null,
          microphoneTrack: null,
          screenVideoTrack: null,
          screenAudioTrack: null,
        });
        setIsMicOn(false);
        setIsCamOn(false);
        return;
      }

      const mainTracks = [];
      const screenTracks = [];
      let hasLiveAudio = false;
      let hasLiveVideo = false;
      let cameraTrack = null;
      let microphoneTrack = null;
      let screenVideoTrack = null;
      let screenAudioTrack = null;

      room.localParticipant.trackPublications.forEach((publication) => {
        const track = getLivekitPublicationTrack(publication);
        const mediaStreamTrack = getLivekitPublicationMediaStreamTrack(publication);
        const trackKind = mediaStreamTrack?.kind || publication?.kind || track?.kind || null;

        if (isLivekitScreenSource(publication.source)) {
          if (mediaStreamTrack) {
            screenTracks.push(mediaStreamTrack);
          }
          if (trackKind === "video" && !screenVideoTrack) {
            screenVideoTrack = track;
          }
          if (trackKind === "audio" && !screenAudioTrack) {
            screenAudioTrack = track;
          }
          return;
        }

        if (mediaStreamTrack) {
          mainTracks.push(mediaStreamTrack);
        }
        if (trackKind === "audio" && publication.isMuted !== true) {
          hasLiveAudio = true;
          if (!microphoneTrack) {
            microphoneTrack = track;
          }
        }
        if (trackKind === "video" && publication.isMuted !== true) {
          hasLiveVideo = true;
          if (!cameraTrack) {
            cameraTrack = track;
          }
        }
      });

      applyLocalMediaStream(mainTracks);
      applyScreenMediaStream(screenTracks);
      setLivekitLocalMedia({
        cameraTrack,
        microphoneTrack,
        screenVideoTrack,
        screenAudioTrack,
      });
      setIsMicOn(hasLiveAudio);
      setIsCamOn(hasLiveVideo);
    },
    [
      applyLocalMediaStream,
      applyScreenMediaStream,
      getLivekitPublicationTrack,
      getLivekitPublicationMediaStreamTrack,
      isLivekitScreenSource,
    ],
  );

  const syncLivekitRemoteParticipants = useCallback(
    (room) => {
      if (!room) {
        setRemoteStreams([]);
        setRemoteScreenStreams([]);
        setRemotePeerStates({});
        return;
      }

      const nextRemoteStreams = [];
      const nextRemoteScreenStreams = [];
      const nextPeerStates = {};

      room.remoteParticipants.forEach((participant) => {
        const peerId = String(participant?.identity || "").trim();
        if (!peerId) {
          return;
        }

        const participantName =
          String(participant?.name || "").trim() ||
          knownPeerNamesRef.current[peerId] ||
          peerId;
        knownPeerNamesRef.current[peerId] = participantName;
        removedPeerIdsRef.current.delete(peerId);

        const mainTracks = [];
        const screenTracks = [];
        let hasAudio = false;
        let hasVideo = false;
        let audioMuted = true;
        let videoMuted = true;
        let videoTrack = null;
        let audioTrack = null;
        let screenVideoTrack = null;
        let screenAudioTrack = null;
        const trackedMedia = livekitRemoteMediaRef.current[peerId] || {};

        participant.trackPublications.forEach((publication) => {
          const track = getLivekitPublicationTrack(publication);
          const mediaStreamTrack = getLivekitPublicationMediaStreamTrack(publication);
          const isScreenTrack = isLivekitScreenSource(publication?.source);
          const trackKind = mediaStreamTrack?.kind || publication?.kind || track?.kind || null;

          if (mediaStreamTrack) {
            if (isScreenTrack) {
              screenTracks.push(mediaStreamTrack);
              if (trackKind === "video" && !screenVideoTrack) {
                screenVideoTrack = track;
              }
              if (trackKind === "audio" && !screenAudioTrack) {
                screenAudioTrack = track;
              }
            } else {
              mainTracks.push(mediaStreamTrack);
              if (trackKind === "video" && !videoTrack) {
                videoTrack = track;
              }
              if (trackKind === "audio" && !audioTrack) {
                audioTrack = track;
              }
            }
          } else if (!isScreenTrack) {
            if (trackKind === "video" && !videoTrack) {
              videoTrack = track;
            }
            if (trackKind === "audio" && !audioTrack) {
              audioTrack = track;
            }
          } else {
            if (trackKind === "video" && !screenVideoTrack) {
              screenVideoTrack = track;
            }
            if (trackKind === "audio" && !screenAudioTrack) {
              screenAudioTrack = track;
            }
          }

          if (!isScreenTrack && publication?.kind === "audio") {
            hasAudio = Boolean(track);
            audioMuted = publication?.isMuted !== false;
          }

          if (!isScreenTrack && publication?.kind === "video") {
            hasVideo = Boolean(track);
            videoMuted = publication?.isMuted !== false;
          }
        });

        videoTrack = videoTrack || trackedMedia.videoTrack || null;
        audioTrack = audioTrack || trackedMedia.audioTrack || null;
        screenVideoTrack = screenVideoTrack || trackedMedia.screenVideoTrack || null;
        screenAudioTrack = screenAudioTrack || trackedMedia.screenAudioTrack || null;

        if (videoTrack && !hasVideo) {
          hasVideo = true;
          videoMuted = Boolean(videoTrack?.isMuted);
        }

        if (audioTrack && !hasAudio) {
          hasAudio = true;
          audioMuted = Boolean(audioTrack?.isMuted);
        }

        if (videoTrack?.mediaStreamTrack && mainTracks.length === 0) {
          mainTracks.push(videoTrack.mediaStreamTrack);
        }

        if (audioTrack?.mediaStreamTrack) {
          const alreadyHasAudio = mainTracks.some(
            (existingTrack) => existingTrack.id === audioTrack.mediaStreamTrack.id,
          );
          if (!alreadyHasAudio) {
            mainTracks.push(audioTrack.mediaStreamTrack);
          }
        }

        if (screenVideoTrack?.mediaStreamTrack && screenTracks.length === 0) {
          screenTracks.push(screenVideoTrack.mediaStreamTrack);
        }

        if (screenAudioTrack?.mediaStreamTrack) {
          const alreadyHasScreenAudio = screenTracks.some(
            (existingTrack) => existingTrack.id === screenAudioTrack.mediaStreamTrack.id,
          );
          if (!alreadyHasScreenAudio) {
            screenTracks.push(screenAudioTrack.mediaStreamTrack);
          }
        }

        nextRemoteStreams.push({
          peerId,
          stream: mainTracks.length > 0 ? new MediaStream(mainTracks) : null,
          displayName: participantName,
          videoTrack,
          audioTrack,
        });

        // Only add screen stream if there are actual screen tracks with valid MediaStreamTracks
        if (screenTracks.length > 0 && screenVideoTrack?.mediaStreamTrack) {
          nextRemoteScreenStreams.push({
            peerId,
            stream: screenTracks.length > 0 ? new MediaStream(screenTracks) : null,
            displayName: participantName,
            videoTrack: screenVideoTrack,
            audioTrack: screenAudioTrack,
          });
        }

        nextPeerStates[peerId] = {
          ...(remotePeerStatesRef.current[peerId] || {}),
          displayName: participantName,
          connectionState: "connected",
          hasAudio,
          hasVideo,
          audioMuted,
          videoMuted,
          actualHasAudio: hasAudio,
          actualHasVideo: hasVideo,
          actualAudioMuted: audioMuted,
          actualVideoMuted: videoMuted,
        };
      });

      setRemoteStreams(nextRemoteStreams);
      setRemoteScreenStreams(nextRemoteScreenStreams);
      setRemotePeerStates(nextPeerStates);
    },
    [getLivekitPublicationMediaStreamTrack, isLivekitScreenSource],
  );

  const disconnectLivekitRoom = useCallback(() => {
    const room = livekitRoomRef.current;
    livekitConnectPromiseRef.current = null;
    livekitRoomRef.current = null;

      if (room) {
        try {
          room.disconnect();
        } catch {}
      }

    livekitRemoteMediaRef.current = {};
    applyLocalMediaStream([]);
    applyScreenMediaStream([]);
    setLivekitLocalMedia({
      cameraTrack: null,
      microphoneTrack: null,
      screenVideoTrack: null,
      screenAudioTrack: null,
    });
    setRemoteStreams([]);
    setRemoteScreenStreams([]);
    setRemotePeerStates({});
    setIsLivekitReconnecting(false);
  }, [applyLocalMediaStream, applyScreenMediaStream]);

  const connectLivekitRoom = useCallback(
    async ({
      microphoneEnabled = isMicOnRef.current,
      cameraEnabled = isCamOnRef.current,
    } = {}) => {
      if (!shouldUseLiveKit || !roomId) {
        return null;
      }

      const existingRoom = livekitRoomRef.current;
      if (existingRoom) {
        return existingRoom;
      }

      if (livekitConnectPromiseRef.current) {
        return livekitConnectPromiseRef.current;
      }

      const connectTask = (async () => {
        const tokenPayload = await createLivekitToken({
          roomId,
          participantName: displayNameRef.current,
          canPublish: true,
          canPublishData: true,
          canSubscribe: true,
        });

      const rtcConfig = buildFallbackIceConfig();
      logRtcInfo("LiveKit ulanish boshlandi", {
        roomId,
        url: tokenPayload?.url || resolvedLivekitUrl,
        participantName: displayName,
        turnConfigured: TURN_URLS.length > 0,
        iceServers: summarizeIceServers(rtcConfig),
      });

      const room = new Room({
          dynacast: true,
          adaptiveStream: true,
          rtcConfig,
          publishDefaults: {
            audioPreset: AudioPresets.speech,
            dtx: true,
            red: true,
            stopMicTrackOnMute: false,
          },
        });

        const syncLocal = () => syncLivekitLocalState(room);
        const syncRemote = () => syncLivekitRemoteParticipants(room);

        room
          .on(RoomEvent.ParticipantConnected, (participant) => {
            ensureLivekitParticipantSubscriptions(participant);
            const peerId = String(participant?.identity || "").trim();
            if (peerId) {
              syncRemotePeerDisplayName(peerId, participant?.name || peerId);
              updateRemotePeerState(peerId, {
                displayName: participant?.name || peerId,
                connectionState: "connected",
              });
            }
            syncRemote();
          })
          .on(RoomEvent.ParticipantDisconnected, (participant) => {
            const peerId = String(participant?.identity || "").trim();
            if (peerId) {
              removedPeerIdsRef.current.add(peerId);
              delete knownPeerNamesRef.current[peerId];
              delete livekitRemoteMediaRef.current[peerId];
            }
            syncRemote();
          })
          .on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
            setLivekitRemoteTrack(participant, publication, track);
            syncRemote();
          })
          .on(RoomEvent.TrackPublished, (publication, participant) => {
            ensureLivekitParticipantSubscriptions(participant);
            if (typeof publication?.setSubscribed === "function") {
              publication.setSubscribed(true);
            }
            syncRemote();
          })
          .on(RoomEvent.TrackUnsubscribed, (track, publication, participant) => {
            clearLivekitRemoteTrack(participant, publication, track);
            syncRemote();
          })
          .on(RoomEvent.TrackSubscriptionFailed, (trackSid, participant, error) => {
            logRtcWarn("LiveKit track subscription failed", {
              trackSid: String(trackSid || ""),
              participant: participant?.identity || participant?.name || "unknown",
              error: error instanceof Error ? error.message : String(error || ""),
            });
            syncRemote();
          })
          .on(RoomEvent.TrackStreamStateChanged, (publication, streamState, participant) => {
            logRtcInfo("LiveKit track stream state o'zgardi", {
              participant: participant?.identity || participant?.name || "unknown",
              source: String(publication?.source || ""),
              streamState: String(streamState || ""),
              trackSid: publication?.trackSid || publication?.trackSid || "",
            });
          })
          .on(RoomEvent.TrackSubscriptionStatusChanged, (publication, status, participant) => {
            logRtcInfo("LiveKit track subscription status o'zgardi", {
              participant: participant?.identity || participant?.name || "unknown",
              source: String(publication?.source || ""),
              status: String(status || ""),
              trackSid: publication?.trackSid || "",
            });
          })
          .on(RoomEvent.TrackMuted, () => {
            syncLocal();
            syncRemote();
          })
          .on(RoomEvent.TrackUnmuted, () => {
            syncLocal();
            syncRemote();
          })
          .on(RoomEvent.SignalConnected, () => {
            logRtcInfo("LiveKit signal connected", { roomId });
            attachLivekitIceCandidateErrorLogging(room);
          })
          .on(RoomEvent.ConnectionQualityChanged, (quality, participant) => {
            logRtcInfo("LiveKit connection quality o'zgardi", {
              participant: participant?.identity || participant?.name || "local",
              quality: String(quality || ""),
            });
          })
          .on(RoomEvent.LocalTrackPublished, () => {
            syncLocal();
          })
          .on(RoomEvent.LocalTrackSubscribed, () => {
            syncLocal();
          })
          .on(RoomEvent.LocalTrackUnpublished, () => {
            syncLocal();
          })
          .on(RoomEvent.Reconnecting, () => {
            logRtcWarn("LiveKit reconnecting", { roomId });
            setIsLivekitReconnecting(true);
          })
          .on(RoomEvent.Reconnected, () => {
            logRtcInfo("LiveKit reconnected", { roomId });
            setIsLivekitReconnecting(false);
            syncLocal();
            syncRemote();
            attachLivekitIceCandidateErrorLogging(room);
            logLivekitTransportDiagnostics(room, "reconnected");
          })
          .on(RoomEvent.Disconnected, (reason) => {
            logRtcWarn("LiveKit disconnected", {
              roomId,
              reason: reason ? String(reason) : "unknown",
            });
            livekitRoomRef.current = null;
            livekitConnectPromiseRef.current = null;
          });

        livekitRoomRef.current = room;
        await room.connect(tokenPayload?.url || resolvedLivekitUrl, tokenPayload.token, {
          autoSubscribe: true,
        });
        attachLivekitIceCandidateErrorLogging(room);
        logRtcInfo("LiveKit connected", {
          roomId,
          participantIdentity: tokenPayload?.participantIdentity || "",
          participantName: tokenPayload?.participantName || displayNameRef.current,
        });
        logLivekitTransportDiagnostics(room, "connected");
        room.remoteParticipants.forEach((participant) => {
          ensureLivekitParticipantSubscriptions(participant);
        });
        await room.localParticipant.setMicrophoneEnabled(
          Boolean(microphoneEnabled),
          buildLivekitAudioCaptureOptions(),
          buildLivekitAudioPublishOptions(),
        );
        await room.localParticipant.setCameraEnabled(
          Boolean(cameraEnabled),
          buildLivekitCameraCaptureOptions(
            qualityProfileRef.current,
            false,
            cameraFacingModeRef.current,
          ),
          buildLivekitCameraPublishOptions(qualityProfileRef.current, false),
        );
        optimizeLivekitLocalTracks(room, qualityProfileRef.current);
        syncLocal();
        syncRemote();
        setNetworkQuality("good");
        return room;
      })();

      livekitConnectPromiseRef.current = connectTask;

      try {
        return await connectTask;
      } catch (error) {
        logRtcError("LiveKit ulanish yiqildi", {
          roomId,
          error: error instanceof Error ? error.message : String(error),
        });
        throw error;
      } finally {
        if (livekitConnectPromiseRef.current === connectTask) {
          livekitConnectPromiseRef.current = null;
        }
      }
    },
    [
      ensureLivekitParticipantSubscriptions,
      attachLivekitIceCandidateErrorLogging,
      logLivekitTransportDiagnostics,
      roomId,
      optimizeLivekitLocalTracks,
      resolvedLivekitUrl,
      shouldUseLiveKit,
      syncLivekitLocalState,
      syncLivekitRemoteParticipants,
      syncRemotePeerDisplayName,
      updateRemotePeerState,
    ],
  );

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
    removedPeerIdsRef.current.add(peerId);
    clearPeerDisconnectTimeout(peerId);
    setRemoteStreams((prev) => prev.filter((r) => r.peerId !== peerId));
    setRemoteScreenStreams((prev) => prev.filter((r) => r.peerId !== peerId));
    setRemotePeerStates((prev) => {
      const next = { ...prev };
      delete next[peerId];
      return next;
    });
    delete knownStreamsRef.current[peerId];
    delete knownPeerNamesRef.current[peerId];
    delete compositeRemoteStreamsRef.current[peerId];
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

  const emitLocalMediaState = useCallback((overrides = {}) => {
    if (!socketRef.current?.connected || !roomId) {
      return;
    }

    const audioTrack = localStreamRef.current?.getAudioTracks?.()[0] || null;
    const videoTrack = localStreamRef.current?.getVideoTracks?.()[0] || null;

    const payload = {
      roomId,
      hasAudio: Boolean(audioTrack),
      hasVideo: Boolean(videoTrack),
      audioMuted: !audioTrack || audioTrack.enabled === false,
      videoMuted: !videoTrack || videoTrack.enabled === false,
      ...overrides,
    };

    const stateKey = `${payload.hasAudio}|${payload.hasVideo}|${payload.audioMuted}|${payload.videoMuted}`;
    const hasOverrides = Object.keys(overrides).length > 0;
    if (!hasOverrides && lastEmittedMediaStateRef.current === stateKey) {
      return;
    }
    lastEmittedMediaStateRef.current = stateKey;

    socketRef.current.emit("media-state-changed", {
      roomId: payload.roomId,
      hasAudio: typeof payload.hasAudio === "boolean" ? payload.hasAudio : undefined,
      hasVideo: typeof payload.hasVideo === "boolean" ? payload.hasVideo : undefined,
      audioMuted:
        typeof payload.audioMuted === "boolean" ? payload.audioMuted : undefined,
      videoMuted:
        typeof payload.videoMuted === "boolean" ? payload.videoMuted : undefined,
    });
  }, [roomId]);

  // ─── Periodic Media State Sync ────────────────────────────────────────────────

  useEffect(() => {
    if (joinStatus !== "joined" || !socketRef.current) {
      if (mediaStateSyncIntervalRef.current) {
        clearInterval(mediaStateSyncIntervalRef.current);
        mediaStateSyncIntervalRef.current = null;
      }
      return;
    }

    // Emit media state every 5 seconds to keep peers in sync
    mediaStateSyncIntervalRef.current = setInterval(() => {
      emitLocalMediaState();
    }, 5000);

    return () => {
      if (mediaStateSyncIntervalRef.current) {
        clearInterval(mediaStateSyncIntervalRef.current);
        mediaStateSyncIntervalRef.current = null;
      }
    };
  }, [joinStatus, emitLocalMediaState]);

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

  const pickVideoInputDeviceId = useCallback(
    async (preferredFacingMode = cameraFacingModeRef.current) => {
      if (!navigator.mediaDevices?.enumerateDevices) {
        return null;
      }

      try {
        const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
          (device) => device.kind === "videoinput",
        );

        if (devices.length <= 1) {
          return null;
        }

        const currentTrack = localStreamRef.current?.getVideoTracks?.()?.[0] || null;
        const currentSettings =
          typeof currentTrack?.getSettings === "function" ? currentTrack.getSettings() : {};
        const currentDeviceId = String(currentSettings?.deviceId || "").trim();
        const normalizedFacing = preferredFacingMode === "environment" ? "environment" : "user";
        const preferredPatterns =
          normalizedFacing === "environment"
            ? /(back|rear|environment|world)/i
            : /(front|user|facetime)/i;

        const preferredDevice = devices.find((device) => {
          if (!device?.deviceId || device.deviceId === currentDeviceId) {
            return false;
          }

          return preferredPatterns.test(String(device.label || ""));
        });

        if (preferredDevice?.deviceId) {
          return preferredDevice.deviceId;
        }

        const fallbackDevice = devices.find((device) => device.deviceId !== currentDeviceId);
        return fallbackDevice?.deviceId || null;
      } catch {
        return null;
      }
    },
    [],
  );

  const buildCameraConstraints = useCallback(
    (facingMode = cameraFacingModeRef.current, deviceId = null) => {
      const cameraProfile = getLivekitCameraProfile(
        qualityProfileRef.current || CALL_QUALITY_PROFILES.balanced,
        Boolean(screenStreamRef.current),
      );
      const constraints = {
        width: { ideal: cameraProfile.width, max: cameraProfile.width },
        height: { ideal: cameraProfile.height, max: cameraProfile.height },
        frameRate: { ideal: cameraProfile.frameRate, max: cameraProfile.frameRate },
      };

      if (deviceId) {
        constraints.deviceId = { exact: deviceId };
      } else if (isLikelyMobileDevice()) {
        constraints.facingMode = { ideal: facingMode };
      }

      return constraints;
    },
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

  const applyLivekitMediaOptimization = useCallback(
    async (profile) => {
      const room = livekitRoomRef.current;
      if (!room?.localParticipant) {
        return;
      }

      const hasActiveScreenShare = Boolean(
        room.localParticipant.isScreenShareEnabled || screenStreamRef.current,
      );

      if (isCamOnRef.current) {
        await room.localParticipant.setCameraEnabled(
          true,
          buildLivekitCameraCaptureOptions(
            profile,
            hasActiveScreenShare,
            cameraFacingModeRef.current,
          ),
          buildLivekitCameraPublishOptions(profile, hasActiveScreenShare),
        );
      }

      if (hasActiveScreenShare) {
        await room.localParticipant.setScreenShareEnabled(
          true,
          buildLivekitScreenShareOptions(profile),
          buildLivekitScreenSharePublishOptions(profile),
        );
      }

      optimizeLivekitLocalTracks(room, profile);
    },
    [optimizeLivekitLocalTracks],
  );

  const applyMediaOptimization = useCallback(async (profile) => {
    if (shouldUseLiveKit) {
      await applyLivekitMediaOptimization(profile);
      return;
    }

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
              await renegotiatePeerConnection(peerId, pc);
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
    if (shouldUseLiveKit) {
      const room = livekitRoomRef.current || (await connectLivekitRoom());
      if (!room?.localParticipant) return false;
      await room.localParticipant.setMicrophoneEnabled(true);
      syncLivekitLocalState(room);
      emitLocalMediaState({
        hasAudio: true,
        audioMuted: false,
      });
      return true;
    }

    const stream = localStreamRef.current;
    if (!stream || !navigator.mediaDevices?.getUserMedia) return false;

    const existingTrack = stream.getAudioTracks()[0] || null;
    if (existingTrack?.readyState === "live") {
      existingTrack.enabled = true;
      syncLocalStreamState(stream);
      setIsMicOn(true);
      emitLocalMediaState({
        hasAudio: true,
        audioMuted: false,
      });
      return true;
    }

    if (existingTrack) {
      stream.removeTrack(existingTrack);
      existingTrack.stop();
      syncLocalStreamState(stream);
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
            await renegotiatePeerConnection(peerId, pc);
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
      emitLocalMediaState({
        hasAudio: true,
        audioMuted: false,
      });
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
    shouldUseLiveKit,
    syncLivekitLocalState,
    connectLivekitRoom,
  ]);

  const disableLocalAudioTrack = useCallback(async () => {
    if (shouldUseLiveKit) {
      const room = livekitRoomRef.current || (await connectLivekitRoom());
      if (!room?.localParticipant) {
        setIsMicOn(false);
        return true;
      }
      await room.localParticipant.setMicrophoneEnabled(false);
      syncLivekitLocalState(room);
      setIsMicOn(false);
      emitLocalMediaState({
        hasAudio: false,
        audioMuted: true,
      });
      return true;
    }

    const stream = localStreamRef.current;
    const currentTrack = stream?.getAudioTracks?.()[0] || null;
    if (!stream || !currentTrack) {
      setIsMicOn(false);
      emitLocalMediaState({
        hasAudio: false,
        audioMuted: true,
      });
      return true;
    }

    currentTrack.enabled = false;
    syncLocalStreamState(stream);
    setIsMicOn(false);
    emitLocalMediaState({
      hasAudio: true,
      audioMuted: true,
    });
    return true;
  }, [
    emitLocalMediaState,
    syncLocalStreamState,
    shouldUseLiveKit,
    syncLivekitLocalState,
    connectLivekitRoom,
  ]);

  const disableLocalVideoTrack = useCallback(async () => {
    if (shouldUseLiveKit) {
      const room = livekitRoomRef.current || (await connectLivekitRoom());
      if (!room?.localParticipant) {
        setIsCamOn(false);
        return true;
      }
      await room.localParticipant.setCameraEnabled(false);
      syncLivekitLocalState(room);
      setIsCamOn(false);
      emitLocalMediaState({
        hasVideo: false,
        videoMuted: true,
      });
      return true;
    }

    const stream = localStreamRef.current;
    const currentTrack = stream?.getVideoTracks?.()[0] || null;
    if (!stream || !currentTrack) {
      setIsCamOn(false);
      emitLocalMediaState({
        hasVideo: false,
        videoMuted: true,
      });
      return true;
    }

    setIsCamOn(false);
    emitLocalMediaState({
      hasVideo: false,
      videoMuted: true,
    });

    const peersToRenegotiate = [];
    const replaceTasks = Object.entries(peerConnectionsRef.current).map(async ([peerId, pc]) => {
      const videoSender = getPeerConnectionSender(pc, "video", currentTrack.id);
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
    emitLocalMediaState({
      hasVideo: false,
      videoMuted: true,
    });
    return true;
  }, [
    emitLocalMediaState,
    getPeerConnectionSender,
    renegotiatePeerConnection,
    syncLocalStreamState,
    shouldUseLiveKit,
    syncLivekitLocalState,
    connectLivekitRoom,
  ]);

  const ensureLocalVideoTrack = useCallback(async () => {
    if (shouldUseLiveKit) {
      const room = livekitRoomRef.current || (await connectLivekitRoom());
      if (!room?.localParticipant) return false;
      await room.localParticipant.setCameraEnabled(
        true,
        buildLivekitCameraCaptureOptions(
          qualityProfileRef.current,
          Boolean(room.localParticipant.isScreenShareEnabled),
          cameraFacingModeRef.current,
        ),
        buildLivekitCameraPublishOptions(
          qualityProfileRef.current,
          Boolean(room.localParticipant.isScreenShareEnabled),
        ),
      );
      optimizeLivekitLocalTracks(room, qualityProfileRef.current);
      syncLivekitLocalState(room);
      emitLocalMediaState({
        hasVideo: true,
        videoMuted: false,
      });
      await refreshVideoInputCount();
      return true;
    }

    if (!navigator.mediaDevices?.getUserMedia) return false;

    const existingTrack = localStreamRef.current?.getVideoTracks()[0] || null;
    if (existingTrack?.readyState === "live") {
      existingTrack.enabled = true;
      syncLocalStreamState(localStreamRef.current);
      setIsCamOn(true);
      emitLocalMediaState({
        hasVideo: true,
        videoMuted: false,
      });
      return true;
    }

    if (existingTrack) {
      localStreamRef.current?.removeTrack(existingTrack);
      existingTrack.stop();
      syncLocalStreamState(localStreamRef.current);
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

      setIsCamOn(true);
      emitLocalMediaState({
        hasVideo: true,
        videoMuted: false,
      });
      const replaced = await replaceCameraTrack(nextTrack, { enabled: true });
      if (!replaced) {
        setIsCamOn(false);
        emitLocalMediaState({
          hasVideo: false,
          videoMuted: true,
        });
        nextTrack.stop();
        return false;
      }

      await refreshVideoInputCount();
      emitLocalMediaState({
        hasVideo: true,
        videoMuted: false,
      });
      return true;
    } catch (err) {
      console.error("Enable camera error:", err);
      return false;
    }
  }, [
    buildCameraConstraints,
    connectLivekitRoom,
    emitLocalMediaState,
    optimizeLivekitLocalTracks,
    refreshVideoInputCount,
    replaceCameraTrack,
    shouldUseLiveKit,
    syncLivekitLocalState,
  ]);

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
  }, [applyLivekitMediaOptimization, shouldUseLiveKit]);

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
        const remoteTrack = e.track || null;

        const syncTrackState = () => {
          const compositeStream =
            compositeRemoteStreamsRef.current[peerId] ||
            remoteStreamsRef.current.find((item) => item.peerId === peerId)?.stream ||
            s;
          const videoTracks = compositeStream.getVideoTracks();
          const audioTracks = compositeStream.getAudioTracks();
          const nextActualHasVideo = videoTracks.some((track) => track.readyState === "live");
          const nextActualHasAudio = audioTracks.some((track) => track.readyState === "live");
          const nextActualVideoMuted =
            videoTracks.length > 0
              ? videoTracks.every(
                  (track) => track.readyState !== "live" || track.muted === true,
                )
              : true;
          const nextActualAudioMuted =
            audioTracks.length > 0
              ? audioTracks.every(
                  (track) => track.readyState !== "live" || track.muted === true,
                )
              : true;

          updateRemotePeerState(peerId, {
            actualHasVideo: nextActualHasVideo,
            actualHasAudio: nextActualHasAudio,
            actualVideoMuted: nextActualVideoMuted,
            actualAudioMuted: nextActualAudioMuted,
          });
        };

        s.onaddtrack = syncTrackState;
        s.onremovetrack = syncTrackState;
        if (remoteTrack) {
          remoteTrack.onended = () => {
            const compositeStream = compositeRemoteStreamsRef.current[peerId];
            if (compositeStream) {
              compositeStream.removeTrack(remoteTrack);
            }
            syncTrackState();
          };
          remoteTrack.onmute = syncTrackState;
          remoteTrack.onunmute = syncTrackState;
        }
        [...s.getVideoTracks(), ...s.getAudioTracks()].forEach((track) => {
          track.onmute = syncTrackState;
          track.onunmute = syncTrackState;
          track.onended = () => {
            const compositeStream = compositeRemoteStreamsRef.current[peerId];
            if (compositeStream) {
              compositeStream.removeTrack(track);
            }
            syncTrackState();
          };
        });
        syncTrackState();

        // Main peer connection always carries the participant camera/mic stream.
        // Screen share uses the dedicated screen peer connection below.
        knownStreamsRef.current[peerId] = s.id;
        addRemoteStream(peerId, s, peerDisplayName);
      };

      pc.onicecandidate = (e) => {
        if (e.candidate && socketRef.current?.connected) {
          socketRef.current.emit("ice-candidate", {
            targetId: peerId,
            candidate: e.candidate,
          });
        }
      };

      pc.onconnectionstatechange = async () => {
        updateRemotePeerState(peerId, {
          connectionState: pc.connectionState,
        });
        if (["connected", "completed"].includes(pc.connectionState)) {
          clearPeerDisconnectTimeout(peerId);
          // Reset ICE restart attempts on successful connection
          iceRestartAttemptsRef.current[peerId] = 0;
          return;
        }

        if (pc.connectionState === "disconnected") {
          // Try ICE restart first before cleaning up
          const attempts = iceRestartAttemptsRef.current[peerId] || 0;
          if (attempts < 3) {
            iceRestartAttemptsRef.current[peerId] = attempts + 1;
            try {
              pc.restartIce?.();
            } catch {}
            // Give ICE restart time to work before cleanup
            setTimeout(() => {
              const currentPc = peerConnectionsRef.current[peerId];
              if (currentPc?.connectionState === "disconnected" || currentPc?.connectionState === "failed") {
                schedulePeerDisconnectCleanup(peerId, removeRemoteStream);
              }
            }, 4000);
          } else {
            schedulePeerDisconnectCleanup(peerId, removeRemoteStream);
          }
          return;
        }

        if (pc.connectionState === "failed") {
          // Attempt reconnection with new offer
          const attempts = iceRestartAttemptsRef.current[peerId] || 0;
          if (attempts < 3 && socketRef.current?.connected) {
            iceRestartAttemptsRef.current[peerId] = attempts + 1;
            try {
              // Create new offer with ICE restart
              const offer = await pc.createOffer({ iceRestart: true });
              await pc.setLocalDescription(offer);
              socketRef.current.emit("offer", { targetId: peerId, sdp: offer });
              return;
            } catch {}
          }
          clearPeerDisconnectTimeout(peerId);
          removeRemoteStream(peerId);
        }

        if (pc.connectionState === "closed") {
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
        if (event.candidate && socketRef.current?.connected) {
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
          // Try ICE restart for screen share connection
          try {
            pc.restartIce?.();
          } catch {}
          schedulePeerDisconnectCleanup(peerId, removeRemoteScreenStream, true);
          return;
        }

        if (pc.connectionState === "failed") {
          // Attempt reconnection
          if (socketRef.current && screenStreamRef.current) {
            try {
              const offer = pc.createOffer({ iceRestart: true });
              pc.setLocalDescription(offer);
              socketRef.current.emit("screen-offer", { targetId: peerId, sdp: offer });
              return;
            } catch {}
          }
          clearPeerDisconnectTimeout(peerId, true);
          removeRemoteScreenStream(peerId);
        }

        if (pc.connectionState === "closed") {
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
      // Track all registered handlers so we can remove them on cleanup
      const registeredHandlers = [];
      const on = (event, handler) => {
        socket.on(event, handler);
        registeredHandlers.push([event, handler]);
      };
      const detachAll = () => {
        registeredHandlers.forEach(([event, handler]) => socket.off(event, handler));
        registeredHandlers.length = 0;
      };

      if (!shouldUseLiveKit) {
        on("offer", async ({ senderId, sdp }) => {
          removedPeerIdsRef.current.delete(senderId);
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

          const queue = candidateQueuesRef.current[senderId] || [];
          while (queue.length > 0) {
            const cand = queue.shift();
            await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
          }

          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("answer", { targetId: senderId, sdp: answer });
        });

        on("answer", async ({ senderId, sdp }) => {
          if (removedPeerIdsRef.current.has(senderId)) {
            return;
          }
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
            const queue = candidateQueuesRef.current[senderId] || [];
            while (queue.length > 0) {
              const cand = queue.shift();
              await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
            }
          }
        });

        on("ice-candidate", async ({ senderId, candidate }) => {
          if (removedPeerIdsRef.current.has(senderId)) {
            return;
          }
          const pc = peerConnectionsRef.current[senderId];
          if (pc && pc.remoteDescription && pc.remoteDescription.type) {
            try {
              await pc.addIceCandidate(new RTCIceCandidate(candidate));
            } catch {}
          } else {
            if (!candidateQueuesRef.current[senderId]) {
              candidateQueuesRef.current[senderId] = [];
            }
            candidateQueuesRef.current[senderId].push(candidate);
          }
        });
      }

      on("peer-joined", async ({ peerId, displayName: peerName }) => {
        removedPeerIdsRef.current.delete(peerId);
        // Cancel any pending disconnect timeout so a quick rejoin doesn't
        // trigger stale cleanup after the peer has already reconnected
        clearPeerDisconnectTimeout(peerId);
        clearPeerDisconnectTimeout(peerId, true);
        if (peerName) {
          syncRemotePeerDisplayName(peerId, peerName);
        }
        updateRemotePeerState(peerId, {
          displayName: peerName || knownPeerNamesRef.current[peerId] || "",
          connectionState: "connecting",
          hasVideo: false,
          hasAudio: false,
          videoMuted: true,
          audioMuted: true,
        });
        if (!shouldUseLiveKit) {
          const pc = createPeerConnection(peerId, peerName);
          await renegotiatePeerConnection(peerId, pc);
          emitLocalMediaState();

          if (screenStreamRef.current) {
            const screenPc = createScreenPeerConnection(peerId, peerName, {
              initiator: true,
            });
            const screenOffer = await screenPc.createOffer();
            await screenPc.setLocalDescription(screenOffer);
            socket.emit("screen-offer", { targetId: peerId, sdp: screenOffer });
          }
        }
      });

      on("existing-peers", async ({ peers }) => {
        (peers || []).forEach((peer) => {
          if (peer?.peerId && peer?.displayName) {
            removedPeerIdsRef.current.delete(peer.peerId);
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
        setJoinStatus("joined");
        if (shouldUseLiveKit) {
          try {
            await connectLivekitRoom();
            emitLocalMediaState();
          } catch (livekitError) {
            console.error("LiveKit connect error:", livekitError);
            setError(livekitError?.message || "LiveKit roomga ulanib bo'lmadi");
          }
        }
      });

      on("peer-left", ({ peerId }) => {
        removeRemoteStream(peerId);
      });

      on(
        "media-state-changed",
        ({ peerId, hasAudio, hasVideo, audioMuted, videoMuted }) => {
          if (typeof peerId !== "string" || !peerId.trim()) {
            return;
          }
          if (removedPeerIdsRef.current.has(peerId)) {
            return;
          }
          if (
            !peerConnectionsRef.current[peerId] &&
            !remotePeerStatesRef.current[peerId] &&
            !knownPeerNamesRef.current[peerId]
          ) {
            return;
          }

          updateRemotePeerState(peerId, {
            ...(typeof hasAudio === "boolean"
              ? { hasAudio, signaledHasAudio: hasAudio }
              : {}),
            ...(typeof hasVideo === "boolean"
              ? { hasVideo, signaledHasVideo: hasVideo }
              : {}),
            ...(typeof audioMuted === "boolean"
              ? { audioMuted, signaledAudioMuted: audioMuted }
              : {}),
            ...(typeof videoMuted === "boolean"
              ? { videoMuted, signaledVideoMuted: videoMuted }
              : {}),
          });
        },
      );

      if (!shouldUseLiveKit) {
        on("screen-offer", async ({ senderId, sdp }) => {
          removedPeerIdsRef.current.delete(senderId);
          const peerName = knownPeerNamesRef.current[senderId] || senderId;
          const pc = createScreenPeerConnection(senderId, peerName);
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          await flushScreenCandidateQueue(senderId);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("screen-answer", { targetId: senderId, sdp: answer });
        });

        on("screen-answer", async ({ senderId, sdp }) => {
          if (removedPeerIdsRef.current.has(senderId)) {
            return;
          }
          const pc = screenPeerConnectionsRef.current[senderId];
          if (!pc) {
            return;
          }

          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          await flushScreenCandidateQueue(senderId);
        });

        on("screen-ice-candidate", async ({ senderId, candidate }) => {
          if (removedPeerIdsRef.current.has(senderId)) {
            return;
          }
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
      }

      return detachAll;
    },
    [
      clearPeerDisconnectTimeout,
      connectLivekitRoom,
      createPeerConnection,
      createScreenPeerConnection,
      emitLocalMediaState,
      flushScreenCandidateQueue,
      renegotiatePeerConnection,
      removeRemoteStream,
      shouldUseLiveKit,
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
        if (!shouldUseLiveKit && (currentUser?._id || currentUser?.id)) {
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

        const shouldStartWithMic = Boolean(initialMicOn);
        const shouldStartWithCam = Boolean(initialCamOn);
        if (!shouldUseLiveKit) {
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

          const audioTrack = stream.getAudioTracks()[0];
          if (audioTrack) audioTrack.enabled = shouldStartWithMic;
          const videoTrack = stream.getVideoTracks()[0];
          if (videoTrack) videoTrack.enabled = shouldStartWithCam;
          setIsMicOn(Boolean(audioTrack?.enabled));
          setIsCamOn(Boolean(videoTrack?.enabled));
        } else {
          setIsMicOn(shouldStartWithMic);
          setIsCamOn(shouldStartWithCam);
        }

        const socket = io(`${SIGNAL_URL}/video`, {
          transports: ["websocket"],
          withCredentials: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 2000,
          reconnectionDelayMax: 10000,
        });
        socketRef.current = socket;

        // 3. Attach signaling
        const detachSignaling = attachSignalingListeners(socket);

        // Track all remaining socket.on() calls so they can be removed on cleanup
        const mainHandlers = [];
        const reg = (event, handler) => {
          socket.on(event, handler);
          mainHandlers.push([event, handler]);
        };
        const detachMain = () => {
          mainHandlers.forEach(([event, handler]) => socket.off(event, handler));
          mainHandlers.length = 0;
        };
        socketDetachRef.current = () => {
          detachSignaling?.();
          detachMain();
        };

        // Re-attach signaling listeners after socket reconnects
        reg("reconnect", () => {
          detachSignaling?.();
          attachSignalingListeners(socket);
        });

        // 4. Creator: knock-request listener
        if (isCreator) {
          reg("knock-request", ({ peerId, displayName: guestName }) => {
            let didAddNewRequest = false;
            setKnockRequests((prev) => {
              const existingIndex = prev.findIndex((item) => item.peerId === peerId);

              if (existingIndex !== -1) {
                return prev.map((item, index) =>
                  index === existingIndex
                    ? { ...item, displayName: guestName || item.displayName }
                    : item,
                );
              }

              didAddNewRequest = true;
              return [...prev, { peerId, displayName: guestName }];
            });

            if (didAddNewRequest) {
              playJoinRequestTone().catch(() => {});
            }
          });
        }

        // 5. Guest: approval / rejection listeners
        if (!isCreator) {
          reg("waiting-for-approval", () => {
            setJoinStatus("waiting");
          });

          reg("knock-approved", async ({ mediaLocked }) => {
            setJoinStatus("joined");
            if (mediaLocked) {
              setMicLocked(true);
              setCamLocked(true);
              void disableLocalAudioTrack();
              void disableLocalVideoTrack();
            } else {
              setMicLocked(false);
              setCamLocked(false);
            }
            if (shouldUseLiveKit) {
              try {
                await connectLivekitRoom({
                  microphoneEnabled: mediaLocked ? false : shouldStartWithMic,
                  cameraEnabled: mediaLocked ? false : shouldStartWithCam,
                });
                emitLocalMediaState();
              } catch (livekitError) {
                console.error("[useWebRTC] LiveKit connect after knock-approved:", livekitError);
                setError(livekitError?.message || "LiveKit roomga ulanib bo'lmadi");
              }
            }
          });

          reg("knock-rejected", ({ reason }) => {
            setJoinStatus("rejected");
            setError(reason || "Rad etildi");
          });
        }

        // 5b. Listen for room-info (title, isPrivate, creatorUserId) from server
        reg("room-info", ({ title, isPrivate: nextIsPrivate, creatorUserId }) => {
          if (title) setRoomTitle(title);
          if (typeof nextIsPrivate === "boolean") {
            setRoomIsPrivate(nextIsPrivate);
          }
          if (creatorUserId) {
            setRoomCreatorId(String(creatorUserId));
          }
        });

        reg("whiteboard-started", (payload) => {
          if (shouldIgnoreIncomingWhiteboardEvent(payload, socket.id)) {
            return;
          }

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

        reg("whiteboard-stopped", (payload) => {
          if (shouldIgnoreIncomingWhiteboardEvent(payload, socket.id)) {
            return;
          }

          commitWhiteboardCursor(null);
          commitWhiteboardState((prev) => ({
            ...prev,
            isActive: false,
            ownerPeerId:
              typeof payload?.ownerPeerId === "string"
                ? payload.ownerPeerId
                : prev.ownerPeerId,
          }));
        });

        reg("whiteboard-cleared", (payload) => {
          if (shouldIgnoreIncomingWhiteboardEvent(payload, socket.id)) {
            return;
          }

          commitWhiteboardState((prev) =>
            clearWhiteboardTargetInState(prev, {
              tabId: prev.activeTabId,
              pageNumber: 1,
            }),
          );
        });

        reg("whiteboard-cursor", (payload) => {
          if (shouldIgnoreIncomingWhiteboardEvent(payload, socket.id)) {
            return;
          }

          const nextCursor = normalizeWhiteboardCursor(payload);
          if (!nextCursor) {
            return;
          }

          commitWhiteboardCursor(nextCursor);
        });

        reg("whiteboard-cursor-clear", ({ peerId }) => {
          const normalizedPeerId =
            typeof peerId === "string" ? peerId.trim() : "";
          if (!normalizedPeerId) {
            commitWhiteboardCursor(null);
            return;
          }

          commitWhiteboardCursor(
            whiteboardCursorRef.current?.peerId === normalizedPeerId
              ? null
              : whiteboardCursorRef.current,
          );
        });

        reg("whiteboard-stroke-started", (payload) => {
          if (shouldIgnoreIncomingWhiteboardEvent(payload, socket.id)) {
            return;
          }

          const normalizedStroke = normalizeWhiteboardStroke(payload?.stroke);
          if (!normalizedStroke) {
            return;
          }

          commitWhiteboardState((prev) =>
            upsertWhiteboardStrokeInState(prev, {
              tabId: payload?.tabId,
              pageNumber: payload?.pageNumber,
              stroke: normalizedStroke,
            }),
          );
        });

        reg("whiteboard-stroke-appended", (payload) => {
          if (shouldIgnoreIncomingWhiteboardEvent(payload, socket.id)) {
            return;
          }

          if (typeof payload?.strokeId !== "string" || !payload.strokeId.trim()) {
            return;
          }

          const normalizedPoints = normalizeWhiteboardPoints(payload?.points);
          if (normalizedPoints.length === 0) {
            return;
          }

          commitWhiteboardState((prev) =>
            appendWhiteboardStrokePointsInState(prev, {
              tabId: payload?.tabId,
              pageNumber: payload?.pageNumber,
              strokeId: payload.strokeId,
              points: normalizedPoints,
            }),
          );
        });

        reg("whiteboard-stroke-removed", (payload) => {
          if (shouldIgnoreIncomingWhiteboardEvent(payload, socket.id)) {
            return;
          }

          if (typeof payload?.strokeId !== "string" || !payload.strokeId.trim()) {
            return;
          }

          commitWhiteboardState((prev) =>
            removeWhiteboardStrokeFromState(prev, {
              tabId: payload?.tabId,
              pageNumber: payload?.pageNumber,
              strokeId: payload.strokeId,
            }),
          );
        });

        reg("whiteboard-stroke-updated", (payload) => {
          if (shouldIgnoreIncomingWhiteboardEvent(payload, socket.id)) {
            return;
          }

          if (typeof payload?.strokeId !== "string" || !payload.strokeId.trim()) {
            return;
          }

          commitWhiteboardState((prev) =>
            updateWhiteboardStrokeInState(prev, {
              tabId: payload?.tabId,
              pageNumber: payload?.pageNumber,
              strokeId: payload.strokeId,
              point: normalizeWhiteboardPoint(payload?.point),
              points: normalizeWhiteboardPoints(
                payload?.points,
                WHITEBOARD_MAX_POINTS_PER_STROKE,
              ),
              text:
                typeof payload?.text === "string"
                  ? payload.text.slice(0, WHITEBOARD_MAX_TEXT_CHARS)
                  : undefined,
              color: payload?.color,
              size: typeof payload?.size === "number" ? payload.size : undefined,
              fillColor:
                typeof payload?.fillColor === "string"
                  ? normalizeWhiteboardFillColor(payload.fillColor)
                  : undefined,
              fontFamily:
                typeof payload?.fontFamily === "string"
                  ? normalizeWhiteboardTextFontFamily(payload.fontFamily)
                  : undefined,
              textSize:
                typeof payload?.textSize === "string"
                  ? normalizeWhiteboardTextSize(payload.textSize)
                  : undefined,
              textAlign:
                typeof payload?.textAlign === "string"
                  ? normalizeWhiteboardTextAlign(payload.textAlign)
                  : undefined,
              fontPixelSize:
                typeof payload?.fontPixelSize === "number"
                  ? normalizeWhiteboardFontPixelSize(payload.fontPixelSize)
                  : undefined,
              edgeStyle:
                typeof payload?.edgeStyle === "string"
                  ? normalizeWhiteboardShapeEdge(payload.edgeStyle)
                  : undefined,
              rotation:
                typeof payload?.rotation === "number"
                  ? normalizeWhiteboardRotation(payload.rotation)
                  : undefined,
            }),
          );
        });

        // Handle full whiteboard state sync (includes PDF tabs, library updates)
        reg("whiteboard-state", (nextState) => {
          const nextUpdatedAt = Number(nextState?.updatedAt || 0);
          if (nextUpdatedAt > 0 && nextUpdatedAt < (lastWhiteboardUpdatedAtRef.current || 0)) {
            return;
          }
          const normalizedState = normalizeWhiteboardState(nextState);
          const mergedState = {
            ...normalizedState,
            tabs: mergeWhiteboardTabsWithPreservedSelections(
              normalizedState,
              whiteboardStateRef.current,
            ).tabs,
            pdfLibrary: mergeWhiteboardPdfLibraryItems(
              normalizedState.pdfLibrary,
              storedPdfLibraryRef.current,
            ),
          };
          storedPdfLibraryRef.current = mergedState.pdfLibrary;
          lastWhiteboardUpdatedAtRef.current = Math.max(
            lastWhiteboardUpdatedAtRef.current || 0,
            Number(mergedState?.updatedAt || 0),
          );
          whiteboardStateRef.current = mergedState;
          setWhiteboardState(mergedState);
          if (!mergedState.isActive) {
            commitWhiteboardCursor(null);
          }
        });

        // 5d. Screen share signals from peers
        reg("screen-share-stopped", ({ peerId: sharerPeerId }) => {
          removeRemoteScreenStream(sharerPeerId);
        });

        // 5e. Recording signals from peers
        reg("recording-started", () => setRemoteIsRecording(true));
        reg("recording-stopped", () => setRemoteIsRecording(false));

        // 5f. Kicked signal
        reg("kicked", () => {
          setError("Siz yaratuvchi tomonidan chiqarib yuborildingiz");
          setJoinStatus("rejected");
          leaveCall();
        });

        // 5g. Creator media control signals
        reg("force-mute-mic", () => {
          setMicLocked(true);
          void disableLocalAudioTrack();
        });
        reg("force-mute-cam", () => {
          setCamLocked(true);
          void disableLocalVideoTrack();
        });
        reg("allow-mic", () => {
          setMicLocked(false);
        });
        reg("allow-cam", () => {
          setCamLocked(false);
        });

        // 5h. Hand raise signals
        reg("hand-raised", ({ peerId: pid }) => {
          setRaisedHands((prev) => new Set([...prev, pid]));
        });
        reg("hand-lowered", ({ peerId: pid }) => {
          setRaisedHands((prev) => {
            const s = new Set(prev);
            s.delete(pid);
            return s;
          });
        });

        // 5i. Server-side error (e.g. premium limit, auth failed)
        reg("error", ({ message }) => {
          if (!isMounted) return;

          // If Room not found and we are a guest, we have retry logic below
          if (message === "Room not found" && !isCreator) {
            return;
          }

          setError(message || "Server xatosi yuz berdi");
          setJoinStatus("idle");
        });

        reg("connect_error", (err) => {
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
          socket.once("room-created", async () => {
            setJoinStatus("joined");
            if (shouldUseLiveKit) {
              try {
                await connectLivekitRoom({
                  microphoneEnabled: shouldStartWithMic,
                  cameraEnabled: shouldStartWithCam,
                });
                emitLocalMediaState();
              } catch (livekitError) {
                console.error("LiveKit connect error:", livekitError);
                setError(livekitError?.message || "LiveKit roomga ulanib bo'lmadi");
              }
            }
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
                if (shouldUseLiveKit && !isPrivate) {
                  console.warn(
                    "[useWebRTC] Socket room not found for guest; continuing with LiveKit-only public meet flow.",
                  );
                  setError("");
                  setJoinStatus("joined");
                  connectLivekitRoom({
                    microphoneEnabled: shouldStartWithMic,
                    cameraEnabled: shouldStartWithCam,
                  })
                    .then(() => {
                      emitLocalMediaState();
                    })
                    .catch((livekitError) => {
                      console.error("LiveKit connect fallback error:", livekitError);
                      if (!isMounted) return;
                      setError(
                        livekitError?.message || "LiveKit roomga ulanib bo'lmadi",
                      );
                      setJoinStatus("idle");
                    });
                  return;
                }

                setError("Xona topilmadi yoki hali boshlanmagan");
                setJoinStatus("idle");
              }
            }
          };
          reg("error", handleRoomError);
          join();
        }
      } catch (err) {
        console.error("[useWebRTC]", err);
        if (isMounted) {
          let userMessage = "Kamera/mikrofonga ruxsat berilmadi";
          if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
            userMessage = "Kamera yoki mikrofon ruxsati rad etildi. Brauzer sozlamalarida ruxsat bering.";
          } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
            userMessage = "Kamera yoki mikrofon topilmadi. Qurilma ulangan-ligini tekshiring.";
          } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
            userMessage = "Kamera yoki mikrofon boshqa dastur tomonidan ishlatilmoqda.";
          } else if (err.name === "OverconstrainedError") {
            userMessage = "Kamera sozlamalari mos kelmadi. Pastroq sifatda urinib ko'ring.";
          }
          setError(userMessage);
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
      candidateQueuesRef.current = {};
      iceRestartAttemptsRef.current = {};
      negotiationTasksRef.current = {};
      makingOfferRef.current = {};
      ignoreOfferRef.current = {};
      settingRemoteAnswerPendingRef.current = {};
      lastEmittedMediaStateRef.current = null;
      // Stop local screen share tracks if still active
      if (screenStreamRef.current) {
        screenShareAbortControllerRef.current?.abort();
        screenShareAbortControllerRef.current = null;
        screenStreamRef.current.getTracks().forEach((t) => { t.onended = null; t.stop(); });
        screenStreamRef.current = null;
        setScreenStream(null);
        setIsScreenSharing(false);
        screenShareStoppingRef.current = false;
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;
      }
      setLocalStream(null);
      setRemoteStreams([]);
      setRemotePeerStates({});
      knownPeerNamesRef.current = {};
      removedPeerIdsRef.current.clear();
      setNetworkQuality("good");
      setQualityProfile(CALL_QUALITY_PROFILES.balanced);
      qualityProfileRef.current = CALL_QUALITY_PROFILES.balanced;
      resetWhiteboardState();
      setKnockRequests([]);
      disconnectLivekitRoom();
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
      if (mediaStateSyncIntervalRef.current) {
        clearInterval(mediaStateSyncIntervalRef.current);
        mediaStateSyncIntervalRef.current = null;
      }
      if (socketRef.current) {
        socketDetachRef.current?.();
        socketDetachRef.current = null;
        socketRef.current.emit("leave-room", { roomId });
        // Slight delay so the leave-room packet is sent before the socket closes
        setTimeout(() => {
          socketRef.current?.disconnect();
          socketRef.current = null;
        }, 100);
      }
    };
  }, [
    enabled,
    roomId,
    displayName,
    isCreator,
    attachSignalingListeners,
    buildCameraConstraints,
    commitWhiteboardState,
    currentUser?._id,
    currentUser?.id,
    connectLivekitRoom,
    disconnectLivekitRoom,
    disableLocalAudioTrack,
    disableLocalVideoTrack,
    emitLocalMediaState,
    refreshVideoInputCount,
    removeRemoteScreenStream,
    resetWhiteboardState,
    shouldUseLiveKit,
  ]);

  useEffect(() => {
    if (joinStatus !== "joined") {
      return;
    }

    emitLocalMediaState();
  }, [emitLocalMediaState, isCamOn, isMicOn, joinStatus, localStream]);

  // ─── Mobile background: pause video track when tab hidden ─────────────────────

  useEffect(() => {
    if (joinStatus !== "joined") return;

    const handleVisibilityChange = () => {
      const videoTrack = localStreamRef.current?.getVideoTracks?.()[0];
      if (!videoTrack) return;

      if (document.visibilityState === "hidden") {
        // Disable video to save battery/bandwidth when backgrounded
        videoTrack.enabled = false;
        emitLocalMediaState();
      } else {
        // Restore video state when foregrounded
        videoTrack.enabled = isCamOnRef.current;
        emitLocalMediaState();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [joinStatus, emitLocalMediaState]);

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
    if (shouldUseLiveKit) {
      const room = livekitRoomRef.current || (await connectLivekitRoom());
      if (!room?.localParticipant) {
        return;
      }
      await room.localParticipant.setMicrophoneEnabled(
        !isMicOn,
        buildLivekitAudioCaptureOptions(),
        buildLivekitAudioPublishOptions(),
      );
      syncLivekitLocalState(room);
      emitLocalMediaState();
      return;
    }
    const t = localStreamRef.current?.getAudioTracks()[0];
    if (t?.readyState === "live" && t.enabled) {
      await disableLocalAudioTrack();
      return;
    }
    await ensureLocalAudioTrack();
  }, [
    connectLivekitRoom,
    disableLocalAudioTrack,
    emitLocalMediaState,
    ensureLocalAudioTrack,
    isMicOn,
    micLocked,
    shouldUseLiveKit,
    syncLivekitLocalState,
  ]);

  const toggleCam = useCallback(async () => {
    if (camLocked) return; // creator locked
    if (shouldUseLiveKit) {
      const room = livekitRoomRef.current || (await connectLivekitRoom());
      if (!room?.localParticipant) {
        return;
      }
      const nextIsCamOn = !isCamOn;
      if (nextIsCamOn) {
        await room.localParticipant.setCameraEnabled(
          true,
          buildLivekitCameraCaptureOptions(
            qualityProfileRef.current,
            Boolean(room.localParticipant.isScreenShareEnabled),
            cameraFacingModeRef.current,
          ),
          buildLivekitCameraPublishOptions(
            qualityProfileRef.current,
            Boolean(room.localParticipant.isScreenShareEnabled),
          ),
        );
        optimizeLivekitLocalTracks(room, qualityProfileRef.current);
      } else {
        await room.localParticipant.setCameraEnabled(false);
      }
      syncLivekitLocalState(room);
      emitLocalMediaState();
      return;
    }
    const t = localStreamRef.current?.getVideoTracks()[0];
    if (t?.readyState === "live" && t.enabled) {
      await disableLocalVideoTrack();
      return;
    }
    await ensureLocalVideoTrack();
  }, [
    buildLivekitCameraCaptureOptions,
    buildLivekitCameraPublishOptions,
    camLocked,
    connectLivekitRoom,
    disableLocalVideoTrack,
    emitLocalMediaState,
    ensureLocalVideoTrack,
    isCamOn,
    optimizeLivekitLocalTracks,
    shouldUseLiveKit,
    syncLivekitLocalState,
  ]);

  const switchCamera = useCallback(async () => {
    if (camLocked) return false;
    if (!isLikelyMobileDevice() || !navigator.mediaDevices?.getUserMedia) {
      return false;
    }

    const nextFacingMode =
      cameraFacingModeRef.current === "user" ? "environment" : "user";

    if (shouldUseLiveKit) {
      try {
        cameraFacingModeRef.current = nextFacingMode;
        setCameraFacingMode(nextFacingMode);

        const room = livekitRoomRef.current;
        if (room?.localParticipant && isCamOn) {
          await room.localParticipant.setCameraEnabled(false);
          await room.localParticipant.setCameraEnabled(
            true,
            buildLivekitCameraCaptureOptions(
              qualityProfileRef.current,
              Boolean(room.localParticipant.isScreenShareEnabled),
              nextFacingMode,
            ),
            buildLivekitCameraPublishOptions(
              qualityProfileRef.current,
              Boolean(room.localParticipant.isScreenShareEnabled),
            ),
          );
          optimizeLivekitLocalTracks(room, qualityProfileRef.current);
          syncLivekitLocalState(room);
          emitLocalMediaState({
            hasVideo: true,
            videoMuted: false,
          });
        }

        await refreshVideoInputCount();
        return true;
      } catch (err) {
        console.error("Switch camera error:", err);
        return false;
      }
    }

    const currentTrack = localStreamRef.current?.getVideoTracks()[0] || null;

    try {
      const nextDeviceId = await pickVideoInputDeviceId(nextFacingMode);
      const nextStream = await navigator.mediaDevices.getUserMedia({
        video: buildCameraConstraints(nextFacingMode, nextDeviceId),
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
    buildLivekitCameraPublishOptions,
    buildLivekitCameraCaptureOptions,
    buildCameraConstraints,
    camLocked,
    emitLocalMediaState,
    isCamOn,
    optimizeLivekitLocalTracks,
    pickVideoInputDeviceId,
    refreshVideoInputCount,
    replaceCameraTrack,
    shouldUseLiveKit,
    syncLivekitLocalState,
  ]);

  const leaveCall = useCallback(() => {
    try {
      disconnectLivekitRoom();
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
  }, [disconnectLivekitRoom, resetWhiteboardState, roomId]);

  // ─── Screen Share ─────────────────────────────────────────────────────────────

  const toggleScreenShare = useCallback(async () => {
    if (shouldUseLiveKit) {
      try {
        const room = livekitRoomRef.current || (await connectLivekitRoom());
        if (!room?.localParticipant) {
          logRtcWarn("LiveKit screen share yoqilmadi: localParticipant topilmadi");
          return false;
        }

        const nextIsScreenSharing = !isScreenSharing;
        logRtcInfo(
          nextIsScreenSharing
            ? "LiveKit screen share yoqish boshlandi"
            : "LiveKit screen share o'chirish boshlandi",
          {
            roomId,
            profile: qualityProfileRef.current?.key || "unknown",
            options: buildLivekitScreenShareOptions(qualityProfileRef.current),
            publishOptions: buildLivekitScreenSharePublishOptions(
              qualityProfileRef.current,
            ),
          },
        );
        await room.localParticipant.setScreenShareEnabled(
          nextIsScreenSharing,
          buildLivekitScreenShareOptions(qualityProfileRef.current),
          buildLivekitScreenSharePublishOptions(qualityProfileRef.current),
        );
        if (isCamOnRef.current) {
          await room.localParticipant.setCameraEnabled(
            true,
            buildLivekitCameraCaptureOptions(
              qualityProfileRef.current,
              nextIsScreenSharing,
              cameraFacingModeRef.current,
            ),
            buildLivekitCameraPublishOptions(
              qualityProfileRef.current,
              nextIsScreenSharing,
            ),
          );
        }
        optimizeLivekitLocalTracks(room, qualityProfileRef.current);
        syncLivekitLocalState(room);
        await logLivekitTransportDiagnostics(
          room,
          nextIsScreenSharing ? "screen-share-started" : "screen-share-stopped",
        );
        return true;
      } catch (err) {
        logRtcError("LiveKit screen share xatosi", {
          roomId,
          error: err instanceof Error ? err.message : String(err),
        });
        return false;
      }
    }

    if (isScreenSharing) {
      screenShareStoppingRef.current = false; // reset guard for future toggles
      // Stop abort controller first
      if (screenShareAbortControllerRef.current) {
        screenShareAbortControllerRef.current.abort();
        screenShareAbortControllerRef.current = null;
      }
      // Stop all tracks
      screenStreamRef.current?.getTracks().forEach((t) => {
        t.onended = null;
        t.stop();
      });
      screenStreamRef.current = null;
      setScreenStream(null);
      setIsScreenSharing(false);
      // Close all screen peer connections
      Object.values(screenPeerConnectionsRef.current).forEach((pc) => {
        try {
          pc.close();
        } catch {}
      });
      screenPeerConnectionsRef.current = {};
      screenCandidateQueuesRef.current = {};
      // Notify server
      if (socketRef.current) {
        socketRef.current.emit("screen-share-stopped", { roomId });
      }
      // Restore quality profile
      qualityProfileRef.current = CALL_QUALITY_PROFILES.balanced;
      setQualityProfile(CALL_QUALITY_PROFILES.balanced);
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

      // Observe all tracks for ended state
      const observeScreenTracks = () => {
        const tracks = screen.getTracks();
        let endedCount = 0;
        const totalTracks = tracks.length;

        const triggerStop = () => {
          if (screenShareStoppingRef.current) return;
          screenShareStoppingRef.current = true;
          toggleScreenShare();
        };

        tracks.forEach((track) => {
          const originalOnEnded = track.onended;
          track.onended = () => {
            endedCount++;
            if (originalOnEnded) originalOnEnded();
            // When all tracks end, cleanup screen share
            if (endedCount >= totalTracks && isScreenSharing) {
              triggerStop();
            }
          };
        });

        // Also monitor via stream events for browser-native stop
        const checkTrackState = () => {
          const liveTracks = screen.getTracks().filter((t) => t.readyState === 'live');
          if (liveTracks.length === 0 && isScreenSharing) {
            triggerStop();
          }
        };

        // Check every 500ms for track state changes
        const intervalId = setInterval(checkTrackState, 500);
        screenShareAbortControllerRef.current = {
          abort: () => {
            clearInterval(intervalId);
          },
        };

        // Initial check
        checkTrackState();
      };

      observeScreenTracks();

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
    connectLivekitRoom,
    isScreenSharing,
    networkQuality,
    optimizeLivekitLocalTracks,
    remoteScreenStreams.length,
    remoteStreams.length,
    roomId,
    shouldUseLiveKit,
    syncLivekitLocalState,
  ]);

  useEffect(() => {
    refreshQualityProfile();
  }, [refreshQualityProfile]);

  useEffect(() => {
    if (shouldUseLiveKit) {
      return undefined;
    }
    if (!enabled || joinStatus !== "joined") return undefined;

    evaluateConnectionHealth();
    statsIntervalRef.current = setInterval(evaluateConnectionHealth, 5000);

    return () => {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }
    };
  }, [enabled, evaluateConnectionHealth, joinStatus, shouldUseLiveKit]);

  // ─── Recording info ───────────────────────────────────────────────────────────

  const getRecordingMetadata = useCallback(() => {
    return {
      roomId,
      roomCreatorId,
      isCreator,
      currentUserId,
    };
  }, [roomId, roomCreatorId, isCreator, currentUserId]);

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
      senderId: socketRef.current.id,
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
    socketRef.current.emit("whiteboard-clear", { roomId,
      senderId: socketRef.current.id, 
      tabId: activeTabId });
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
          senderId: socketRef.current.id, 
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
      viewportBaseHeight,
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
          viewportBaseHeight,
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
        viewportBaseHeight,
      });
      return true;
    },
    [commitWhiteboardState, isCreator, roomId],
  );

  const syncWhiteboardBoardZoom = useCallback(
    ({ tabId, zoom, viewportBaseWidth, viewportBaseHeight, scrollLeftRatio, scrollTopRatio }) => {
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
          scrollLeftRatio,
          scrollTopRatio,
        }),
      );
      socketRef.current.emit("whiteboard-board-zoom", {
        roomId,
        tabId: targetTabId,
        zoom,
        viewportBaseWidth,
        viewportBaseHeight,
        scrollLeftRatio,
        scrollTopRatio,
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

      const nextCursor = normalizeWhiteboardCursor({
        senderId: socketRef.current.id,
        peerId: socketRef.current.id || whiteboardStateRef.current.ownerPeerId || "whiteboard-owner",
        displayName: displayName || whiteboardStateRef.current.ownerDisplayName || "",
        x,
        y,
        updatedAt: Date.now(),
      });
      if (!nextCursor) {
        return false;
      }

      commitWhiteboardCursor(nextCursor);
      socketRef.current.emit("whiteboard-cursor", {
        roomId,
        ...nextCursor,
      });
      return true;
    },
    [commitWhiteboardCursor, displayName, isCreator, roomId],
  );

  const clearWhiteboardCursor = useCallback(() => {
    if (!isCreator || !socketRef.current) {
      return false;
    }

    const peerId = socketRef.current.id || whiteboardStateRef.current.ownerPeerId;
    commitWhiteboardCursor(null);
    socketRef.current.emit("whiteboard-cursor-clear", {
      roomId,
      peerId,
    });
    return true;
  }, [commitWhiteboardCursor, isCreator, roomId]);

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
        updatedAt: Date.now(),
      }));

      socketRef.current.emit("whiteboard-stroke-start", {
        roomId,
        tabId: targetTabId,
        senderId: socketRef.current.id,   
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
        ({
          ...appendWhiteboardStrokePointsInState(prev, {
            tabId: targetTabId,
            pageNumber,
            strokeId,
            points: normalizedPoints,
          }),
          updatedAt: Date.now(),
        }),
      );

      socketRef.current.emit("whiteboard-stroke-append", {
        roomId,
        tabId: targetTabId,
        pageNumber,
        senderId: socketRef.current.id, 
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
         senderId: socketRef.current.id, 
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

      commitWhiteboardState((prev) => ({
        ...updateWhiteboardStrokeInState(prev, {
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
        updatedAt: Date.now(),
      }));

      socketRef.current.emit("whiteboard-stroke-update", {
        roomId,
        tabId: targetTabId,
        pageNumber,
          senderId: socketRef.current.id,
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
    livekitLocalMedia,
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
    isLivekitReconnecting,
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
    roomCreatorId,
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
    cameraFacingMode,
    canSwitchCamera: isLikelyMobileDevice() && (shouldUseLiveKit || videoInputCount > 1),
  };
}
