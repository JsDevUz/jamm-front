import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./i18n";
import "./index.css";

const queryClient = new QueryClient();

const syncAppHeight = () => {
  const viewport = window.visualViewport;
  const viewportHeight = viewport?.height || window.innerHeight || 0;
  const viewportOffsetTop = viewport?.offsetTop || 0;
  const appHeight = viewportHeight + viewportOffsetTop;

  document.documentElement.style.setProperty("--app-height", `${appHeight}px`);
  document.documentElement.style.setProperty(
    "--visual-viewport-height",
    `${viewportHeight}px`,
  );
  document.documentElement.style.setProperty(
    "--visual-viewport-offset-top",
    `${viewportOffsetTop}px`,
  );
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
