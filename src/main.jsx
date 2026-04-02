import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./i18n";
import "./index.css";

const queryClient = new QueryClient();

let viewportSyncFrame = null;
let lastViewportSnapshot = "";

const syncAppHeight = () => {
  if (viewportSyncFrame) {
    window.cancelAnimationFrame(viewportSyncFrame);
  }

  viewportSyncFrame = window.requestAnimationFrame(() => {
    const viewport = window.visualViewport;
    const layoutViewportHeight = Math.max(
      document.documentElement?.clientHeight || 0,
      window.innerHeight || 0,
    );
    const visualViewportHeight = viewport?.height || layoutViewportHeight || 0;
    const visualViewportOffsetTop = viewport?.offsetTop || 0;
    const snapshot = `${layoutViewportHeight}|${visualViewportHeight}|${visualViewportOffsetTop}`;

    if (snapshot === lastViewportSnapshot) {
      viewportSyncFrame = null;
      return;
    }

    lastViewportSnapshot = snapshot;

    document.documentElement.style.setProperty(
      "--app-height",
      `${layoutViewportHeight}px`,
    );
    document.documentElement.style.setProperty(
      "--visual-viewport-height",
      `${visualViewportHeight}px`,
    );
    document.documentElement.style.setProperty(
      "--visual-viewport-offset-top",
      `${visualViewportOffsetTop}px`,
    );
    viewportSyncFrame = null;
  });
};

const preventBrowserZoom = () => {
  const blockedZoomKeys = new Set(["+", "-", "=", "_", "0"]);

  const handleWheel = (event) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
    }
  };

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && blockedZoomKeys.has(event.key)) {
      event.preventDefault();
    }
  };

  const preventDefault = (event) => event.preventDefault();

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("keydown", handleKeyDown, { passive: false });
  window.addEventListener("gesturestart", preventDefault, { passive: false });
  window.addEventListener("gesturechange", preventDefault, { passive: false });
  window.addEventListener("gestureend", preventDefault, { passive: false });
};

preventBrowserZoom();
syncAppHeight();
window.addEventListener("resize", syncAppHeight, { passive: true });
window.visualViewport?.addEventListener("resize", syncAppHeight, { passive: true });
window.visualViewport?.addEventListener("scroll", syncAppHeight, { passive: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
