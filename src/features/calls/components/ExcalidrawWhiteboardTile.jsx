import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Excalidraw, getSceneVersion } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { RoomEvent } from "livekit-client";

const EXCALIDRAW_WHITEBOARD_KIND = "excalidraw-whiteboard";
const EXCALIDRAW_WHITEBOARD_CHUNK_KIND = "excalidraw-whiteboard-chunk";
const MAX_DATA_CHUNK_SIZE = 12000;
const SCENE_SYNC_DEBOUNCE_MS = 450;
const STALE_CHUNK_TTL_MS = 30000;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const createEmptyScene = () => ({
  elements: [],
  appState: {
    viewBackgroundColor: "#ffffff",
    currentItemStrokeColor: "#0f172a",
  },
  files: {},
});

const sanitizeAppState = (appState = {}) => ({
  viewBackgroundColor: appState.viewBackgroundColor || "#ffffff",
  currentItemStrokeColor: appState.currentItemStrokeColor,
  currentItemBackgroundColor: appState.currentItemBackgroundColor,
  currentItemFillStyle: appState.currentItemFillStyle,
  currentItemStrokeWidth: appState.currentItemStrokeWidth,
  currentItemStrokeStyle: appState.currentItemStrokeStyle,
  currentItemRoughness: appState.currentItemRoughness,
  currentItemOpacity: appState.currentItemOpacity,
  currentItemFontFamily: appState.currentItemFontFamily,
  currentItemFontSize: appState.currentItemFontSize,
  currentItemTextAlign: appState.currentItemTextAlign,
  gridSize: appState.gridSize,
  theme: appState.theme,
  zoom: appState.zoom,
  scrollX: appState.scrollX,
  scrollY: appState.scrollY,
});

const createScenePayload = (scene) => ({
  kind: EXCALIDRAW_WHITEBOARD_KIND,
  action: "scene",
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  sentAt: Date.now(),
  scene: {
    elements: Array.isArray(scene?.elements) ? scene.elements : [],
    appState: sanitizeAppState(scene?.appState),
    files: scene?.files && typeof scene.files === "object" ? scene.files : {},
  },
});

const tryParsePayload = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};

const publishJson = async (room, payload) => {
  const raw = JSON.stringify(payload);

  if (raw.length <= MAX_DATA_CHUNK_SIZE) {
    await room.localParticipant.publishData(encoder.encode(raw), { reliable: true });
    return;
  }

  const messageId = payload.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const total = Math.ceil(raw.length / MAX_DATA_CHUNK_SIZE);
  for (let index = 0; index < total; index += 1) {
    const chunk = raw.slice(index * MAX_DATA_CHUNK_SIZE, (index + 1) * MAX_DATA_CHUNK_SIZE);
    await room.localParticipant.publishData(
      encoder.encode(
        JSON.stringify({
          kind: EXCALIDRAW_WHITEBOARD_CHUNK_KIND,
          messageId,
          index,
          total,
          chunk,
          sentAt: Date.now(),
        }),
      ),
      { reliable: true },
    );
  }
};

export default function ExcalidrawWhiteboardTile({
  room,
  interactive = false,
  participantCount = 0,
}) {
  const apiRef = useRef(null);
  const lastSceneRef = useRef(createEmptyScene());
  const lastSceneVersionRef = useRef(0);
  const pendingRemoteSceneRef = useRef(null);
  const applyingRemoteRef = useRef(false);
  const syncTimerRef = useRef(0);
  const chunkBuffersRef = useRef(new Map());
  const [status, setStatus] = useState("LiveKit sync");

  const initialData = useMemo(
    () => ({
      ...createEmptyScene(),
      appState: {
        ...createEmptyScene().appState,
        viewModeEnabled: !interactive,
      },
    }),
    [interactive],
  );

  const publishScene = useCallback(
    (scene = lastSceneRef.current) => publishJson(room, createScenePayload(scene)),
    [room],
  );

  const applyRemoteScene = useCallback((scene) => {
    if (!scene) return;
    if (!apiRef.current) {
      pendingRemoteSceneRef.current = scene;
      return;
    }
    const elements = Array.isArray(scene.elements) ? scene.elements : [];
    const appState = sanitizeAppState(scene.appState);
    const files = scene.files && typeof scene.files === "object" ? scene.files : {};
    const nextVersion = getSceneVersion(elements);

    if (nextVersion < lastSceneVersionRef.current) {
      return;
    }

    applyingRemoteRef.current = true;
    lastSceneRef.current = { elements, appState, files };
    lastSceneVersionRef.current = nextVersion;
    apiRef.current.updateScene({ elements, appState, files });
    window.setTimeout(() => {
      applyingRemoteRef.current = false;
    }, 0);
  }, []);

  const handleDataPayload = useCallback(
    (payload) => {
      if (!payload || typeof payload !== "object") return;

      if (payload.kind === EXCALIDRAW_WHITEBOARD_CHUNK_KIND) {
        const messageId = String(payload.messageId || "");
        const index = Number(payload.index);
        const total = Number(payload.total);
        const chunk = typeof payload.chunk === "string" ? payload.chunk : "";
        if (!messageId || !Number.isInteger(index) || !Number.isInteger(total) || total < 1) {
          return;
        }

        const now = Date.now();
        for (const [key, value] of chunkBuffersRef.current.entries()) {
          if (now - value.createdAt > STALE_CHUNK_TTL_MS) {
            chunkBuffersRef.current.delete(key);
          }
        }

        const existing =
          chunkBuffersRef.current.get(messageId) || {
            total,
            chunks: new Array(total),
            received: 0,
            createdAt: now,
          };
        if (!existing.chunks[index]) {
          existing.received += 1;
        }
        existing.chunks[index] = chunk;
        chunkBuffersRef.current.set(messageId, existing);

        if (existing.received === existing.total) {
          chunkBuffersRef.current.delete(messageId);
          handleDataPayload(tryParsePayload(existing.chunks.join("")));
        }
        return;
      }

      if (payload.kind !== EXCALIDRAW_WHITEBOARD_KIND) return;

      if (payload.action === "request-scene") {
        if (lastSceneRef.current) {
          void publishScene(lastSceneRef.current);
        }
        return;
      }

      if (payload.action === "scene") {
        applyRemoteScene(payload.scene);
      }
    },
    [applyRemoteScene, publishScene],
  );

  useEffect(() => {
    const handleDataReceived = (data) => {
      handleDataPayload(tryParsePayload(decoder.decode(data)));
    };

    room.on(RoomEvent.DataReceived, handleDataReceived);
    void publishJson(room, {
      kind: EXCALIDRAW_WHITEBOARD_KIND,
      action: "request-scene",
      id: `${room.localParticipant.identity}-request-${Date.now()}`,
      sentAt: Date.now(),
    });

    return () => {
      room.off(RoomEvent.DataReceived, handleDataReceived);
      if (syncTimerRef.current) {
        window.clearTimeout(syncTimerRef.current);
      }
    };
  }, [handleDataPayload, room]);

  const handleChange = useCallback(
    (elements, appState, files) => {
      const scene = {
        elements,
        appState: sanitizeAppState(appState),
        files,
      };
      lastSceneRef.current = scene;
      lastSceneVersionRef.current = getSceneVersion(elements);

      if (!interactive || applyingRemoteRef.current) {
        return;
      }

      if (syncTimerRef.current) {
        window.clearTimeout(syncTimerRef.current);
      }
      syncTimerRef.current = window.setTimeout(() => {
        setStatus("Syncing...");
        void publishScene(scene)
          .then(() => setStatus("LiveKit sync"))
          .catch(() => setStatus("Sync failed"));
      }, SCENE_SYNC_DEBOUNCE_MS);
    },
    [interactive, publishScene],
  );

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-white">
      <Excalidraw
        excalidrawAPI={(api) => {
          apiRef.current = api;
          if (pendingRemoteSceneRef.current) {
            applyRemoteScene(pendingRemoteSceneRef.current);
            pendingRemoteSceneRef.current = null;
          }
        }}
        initialData={initialData}
        onChange={handleChange}
        viewModeEnabled={!interactive}
        UIOptions={{
          canvasActions: {
            loadScene: false,
            saveToActiveFile: false,
            export: false,
          },
        }}
      />
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
        {interactive ? "Excalidraw" : "View only"} - {participantCount} - {status}
      </div>
    </div>
  );
}
