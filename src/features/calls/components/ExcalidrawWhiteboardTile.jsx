import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Excalidraw,
  convertToExcalidrawElements,
  getSceneVersion,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { RoomEvent } from "livekit-client";
import { FileText, Move, Pencil, Upload, X } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorkerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";

const EXCALIDRAW_WHITEBOARD_KIND = "excalidraw-whiteboard";
const EXCALIDRAW_WHITEBOARD_CHUNK_KIND = "excalidraw-whiteboard-chunk";
const MAX_DATA_CHUNK_SIZE = 12000;
const SCENE_SYNC_DEBOUNCE_MS = 450;
const STALE_CHUNK_TTL_MS = 30000;
const PDF_IMAGE_PREFIX = "jamm-excalidraw-pdf-page";
const PDF_IMAGE_MAX_WIDTH = 1400;
const PDF_IMAGE_GAP = 32;
const PDF_IMAGE_X = 0;
const PDF_IMAGE_Y = 0;

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

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
  viewBackgroundColor:
    typeof appState.viewBackgroundColor === "string"
      ? appState.viewBackgroundColor
      : "#ffffff",
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

const normalizePdfItem = (item) => {
  const fileUrl = String(item?.fileUrl || item?.url || "").trim();
  if (!fileUrl) return null;
  const fileName = String(item?.fileName || item?.name || "PDF").slice(0, 180);
  return {
    id: String(item?.id || `pdf-${Date.now()}`),
    title: String(item?.title || fileName.replace(/\.pdf$/i, "") || "PDF").slice(0, 180),
    fileUrl,
    fileName,
    fileSize: Number(item?.fileSize || 0) || 0,
    updatedAt: Number(item?.updatedAt || Date.now()) || Date.now(),
  };
};

const createPdfPayload = (pdfItem) => ({
  kind: EXCALIDRAW_WHITEBOARD_KIND,
  action: "pdf-set",
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  sentAt: Date.now(),
  pdf: normalizePdfItem(pdfItem),
});

const isPdfImageElement = (element) =>
  typeof element?.id === "string" && element.id.startsWith(`${PDF_IMAGE_PREFIX}-`);

const withoutPdfImages = (elements = []) =>
  (Array.isArray(elements) ? elements : []).filter((element) => !isPdfImageElement(element));

const withoutPdfFiles = (files = {}) =>
  Object.fromEntries(
    Object.entries(files && typeof files === "object" ? files : {}).filter(
      ([fileId]) => !String(fileId).startsWith(`${PDF_IMAGE_PREFIX}-`),
    ),
  );

const scrollToElements = (api, elements) => {
  if (!api || !Array.isArray(elements) || elements.length === 0) return;
  window.setTimeout(() => {
    api.scrollToContent?.(elements, {
      fitToContent: true,
      animate: false,
    });
  }, 0);
};

const renderPdfToExcalidrawImages = async (fileUrl) => {
  const loadingTask = pdfjsLib.getDocument({ url: fileUrl });
  const pdfDocument = await loadingTask.promise;
  const files = [];
  const skeletons = [];
  let nextY = PDF_IMAGE_Y;

  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
    const page = await pdfDocument.getPage(pageNumber);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = Math.min(2, PDF_IMAGE_MAX_WIDTH / Math.max(1, baseViewport.width));
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: false });

    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    await page.render({ canvasContext: context, viewport }).promise;

    const fileId = `${PDF_IMAGE_PREFIX}-${pageNumber}`;
    const dataURL = canvas.toDataURL("image/jpeg", 0.88);
    files.push({
      id: fileId,
      mimeType: "image/jpeg",
      dataURL,
      created: Date.now(),
    });
    skeletons.push({
      id: fileId,
      type: "image",
      x: PDF_IMAGE_X,
      y: nextY,
      width: canvas.width,
      height: canvas.height,
      fileId,
      status: "saved",
      locked: true,
      customData: {
        jammPdfPage: true,
        pageNumber,
      },
    });
    nextY += canvas.height + PDF_IMAGE_GAP;
    canvas.width = 1;
    canvas.height = 1;
  }

  await pdfDocument.destroy?.();

  return {
    files,
    elements: convertToExcalidrawElements(skeletons, { regenerateIds: false }),
  };
};

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
  onPdfUpload,
}) {
  const apiRef = useRef(null);
  const lastSceneRef = useRef(createEmptyScene());
  const lastSceneVersionRef = useRef(0);
  const pendingRemoteSceneRef = useRef(null);
  const applyingRemoteRef = useRef(false);
  const syncTimerRef = useRef(0);
  const chunkBuffersRef = useRef(new Map());
  const [status, setStatus] = useState("LiveKit sync");
  const [pdfItem, setPdfItem] = useState(null);
  const [pdfMode, setPdfMode] = useState("draw");
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState("");
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
    (scene = lastSceneRef.current) =>
      publishJson(
        room,
        createScenePayload({
          ...scene,
          elements: withoutPdfImages(scene?.elements),
          files: withoutPdfFiles(scene?.files),
        }),
      ),
    [room],
  );

  const publishPdf = useCallback(
    (item) => publishJson(room, createPdfPayload(item)),
    [room],
  );

  const clearPdf = useCallback(async () => {
    setPdfItem(null);
    setPdfMode("draw");
    if (apiRef.current) {
      const nextElements = withoutPdfImages(lastSceneRef.current.elements);
      const nextScene = {
        ...lastSceneRef.current,
        elements: nextElements,
        files: withoutPdfFiles(lastSceneRef.current.files),
        appState: {
          ...lastSceneRef.current.appState,
          viewBackgroundColor: "#ffffff",
        },
      };
      lastSceneRef.current = nextScene;
      apiRef.current.updateScene(nextScene);
    }
    await publishJson(room, {
      kind: EXCALIDRAW_WHITEBOARD_KIND,
      action: "pdf-clear",
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      sentAt: Date.now(),
    });
  }, [room]);

  const loadPdfIntoScene = useCallback(async (nextPdfItem) => {
    if (!nextPdfItem?.fileUrl || !apiRef.current) return;

    setStatus("Rendering PDF...");
    setPdfError("");
    try {
      const renderedPdf = await renderPdfToExcalidrawImages(nextPdfItem.fileUrl);
      const drawingElements = withoutPdfImages(lastSceneRef.current.elements);
      const nextElements = [...renderedPdf.elements, ...drawingElements];
      const nextFiles = {
        ...withoutPdfFiles(lastSceneRef.current.files),
        ...Object.fromEntries(renderedPdf.files.map((file) => [file.id, file])),
      };
      const nextScene = {
        ...lastSceneRef.current,
        elements: nextElements,
        files: nextFiles,
        appState: {
          ...lastSceneRef.current.appState,
          viewBackgroundColor: "#ffffff",
        },
      };

      apiRef.current.addFiles?.(renderedPdf.files);
      apiRef.current.updateScene(nextScene);
      scrollToElements(apiRef.current, renderedPdf.elements);
      lastSceneRef.current = nextScene;
      lastSceneVersionRef.current = getSceneVersion(nextElements);
      setStatus("LiveKit sync");
    } catch (error) {
      setPdfError(error?.message || "PDF rasmga aylantirilmadi");
      setStatus("PDF render failed");
    }
  }, []);

  const applyRemoteScene = useCallback(
    (scene) => {
      if (!scene) return;
      if (!apiRef.current) {
        pendingRemoteSceneRef.current = scene;
        return;
      }
      const pdfElements = Array.isArray(lastSceneRef.current.elements)
        ? lastSceneRef.current.elements.filter(isPdfImageElement)
        : [];
      const elements = [...pdfElements, ...withoutPdfImages(scene.elements)];
      const appState = sanitizeAppState(scene.appState);
      const files = {
        ...Object.fromEntries(
          Object.entries(lastSceneRef.current.files || {}).filter(([fileId]) =>
            String(fileId).startsWith(`${PDF_IMAGE_PREFIX}-`),
          ),
        ),
        ...withoutPdfFiles(scene.files),
      };
      const nextVersion = getSceneVersion(elements);
      const previousHadContent = Array.isArray(lastSceneRef.current.elements)
        ? lastSceneRef.current.elements.length > 0
        : false;

      if (nextVersion < lastSceneVersionRef.current) {
        return;
      }

      applyingRemoteRef.current = true;
      lastSceneRef.current = { elements, appState, files };
      lastSceneVersionRef.current = nextVersion;
      apiRef.current.updateScene({ elements, appState, files });
      if (!interactive && !previousHadContent) {
        scrollToElements(apiRef.current, elements);
      }
      window.setTimeout(() => {
        applyingRemoteRef.current = false;
      }, 0);
    },
    [interactive],
  );

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
        if (pdfItem) {
          void publishPdf(pdfItem);
        }
        return;
      }

      if (payload.action === "scene") {
        applyRemoteScene(payload.scene);
        return;
      }

      if (payload.action === "pdf-set") {
        const nextPdfItem = normalizePdfItem(payload.pdf);
        if (nextPdfItem) {
          setPdfItem(nextPdfItem);
          setPdfMode("draw");
          setPdfError("");
          void loadPdfIntoScene(nextPdfItem);
        }
        return;
      }

      if (payload.action === "pdf-clear") {
        setPdfItem(null);
        setPdfMode("draw");
        setPdfError("");
        if (apiRef.current) {
          const nextElements = withoutPdfImages(lastSceneRef.current.elements);
          const nextScene = {
            ...lastSceneRef.current,
            elements: nextElements,
            files: withoutPdfFiles(lastSceneRef.current.files),
            appState: {
              ...lastSceneRef.current.appState,
              viewBackgroundColor: "#ffffff",
            },
          };
          lastSceneRef.current = nextScene;
          apiRef.current.updateScene(nextScene);
        }
      }
    },
    [applyRemoteScene, loadPdfIntoScene, pdfItem, publishPdf, publishScene],
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
    [interactive, pdfItem, publishScene],
  );

  const handlePdfInputChange = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file || !interactive) return;

      setPdfBusy(true);
      setPdfError("");
      try {
        const result = await onPdfUpload?.(file);
        if (!result?.ok || !result?.item) {
          throw new Error(result?.error || "PDF yuklanmadi");
        }
        const nextPdfItem = normalizePdfItem({
          ...result.item,
          updatedAt: Date.now(),
        });
        if (!nextPdfItem) {
          throw new Error("PDF URL missing");
        }
        setPdfItem(nextPdfItem);
        setPdfMode("draw");
        await loadPdfIntoScene(nextPdfItem);
        await publishPdf(nextPdfItem);
      } catch (error) {
        setPdfError(error?.message || "PDF yuklanmadi");
      } finally {
        setPdfBusy(false);
      }
    },
    [interactive, loadPdfIntoScene, onPdfUpload, publishPdf],
  );

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-white">
      <div className="absolute inset-0 z-10">
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
      </div>

      <div className="absolute bottom-14 left-3 z-10 flex max-w-[calc(100%-24px)] items-center gap-2 rounded-full border border-black/10 bg-white/95 p-1 text-xs font-medium text-slate-700 shadow-sm">
        {interactive ? (
          <label className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 transition hover:bg-slate-100">
            <Upload className="h-3.5 w-3.5" />
            <span>{pdfBusy ? "Uploading..." : "PDF"}</span>
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              disabled={pdfBusy}
              onChange={handlePdfInputChange}
            />
          </label>
        ) : null}

        {pdfItem ? (
          <>
            <div className="hidden max-w-[220px] items-center gap-1.5 truncate px-2 sm:inline-flex">
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{pdfItem.title}</span>
            </div>
            <button
              type="button"
              className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 transition ${
                pdfMode === "draw" ? "bg-slate-900 text-white" : "hover:bg-slate-100"
              }`}
              onClick={() => {
                setPdfMode("draw");
                apiRef.current?.setActiveTool?.({ type: "freedraw" });
              }}
              title="Draw on PDF"
            >
              <Pencil className="h-3.5 w-3.5" />
              <span>Draw</span>
            </button>
            <button
              type="button"
              className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 transition ${
                pdfMode === "pdf" ? "bg-slate-900 text-white" : "hover:bg-slate-100"
              }`}
              onClick={() => {
                setPdfMode("pdf");
                apiRef.current?.setActiveTool?.({ type: "hand" });
              }}
              title="Move the PDF and drawings together"
            >
              <Move className="h-3.5 w-3.5" />
              <span>Move</span>
            </button>
            {interactive ? (
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-slate-100"
                onClick={() => {
                  void clearPdf();
                }}
                title="Remove PDF"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </>
        ) : null}
      </div>

      {pdfError ? (
        <div className="absolute bottom-28 left-3 z-10 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 shadow-sm">
          {pdfError}
        </div>
      ) : null}

      <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
        {interactive ? "Excalidraw" : "View only"} - {participantCount} - {status}
      </div>
    </div>
  );
}
