// ✅ iOS Safari ✅ Android Chrome ✅ visualViewport API
import { useCallback, useEffect, useMemo, useState } from "react";

const IOS_KEYBOARD_SCROLL_DELAY = 350;

const isIosDevice = () =>
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream;

const getViewportMetrics = () => {
  if (typeof window === "undefined") {
    return {
      keyboardHeight: 0,
      viewportHeight: 0,
      offsetTop: 0,
      appHeight: 0,
    };
  }

  const viewport = window.visualViewport;
  const viewportHeight = viewport?.height || window.innerHeight || 0;
  const offsetTop = viewport?.offsetTop || 0;
  const keyboardHeight = Math.max(
    0,
    (window.innerHeight || 0) - viewportHeight - offsetTop,
  );

  return {
    keyboardHeight,
    viewportHeight,
    offsetTop,
    appHeight: viewportHeight + offsetTop,
  };
};

export default function useKeyboardAvoid(containerRef) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const isiOS = useMemo(() => isIosDevice(), []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const viewport = window.visualViewport;
    const root = document.documentElement;

    const syncViewport = () => {
      const { keyboardHeight: nextKeyboardHeight, appHeight, viewportHeight } =
        getViewportMetrics();

      setKeyboardHeight(nextKeyboardHeight);
      root.style.setProperty("--keyboard-height", `${nextKeyboardHeight}px`);
      root.style.setProperty("--app-height", `${appHeight}px`);
      root.style.setProperty(
        "--visual-viewport-height",
        `${viewportHeight}px`,
      );
      root.dataset.mobileKeyboardOpen = nextKeyboardHeight > 0 ? "true" : "false";
    };

    syncViewport();

    window.addEventListener("resize", syncViewport, { passive: true });

    if (viewport) {
      viewport.addEventListener("resize", syncViewport, { passive: true });
      viewport.addEventListener("scroll", syncViewport, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", syncViewport);
      viewport?.removeEventListener("resize", syncViewport);
      viewport?.removeEventListener("scroll", syncViewport);
      root.style.setProperty("--keyboard-height", "0px");
      root.dataset.mobileKeyboardOpen = "false";
    };
  }, []);

  const scrollIntoViewOnFocus = useCallback(
    (element) => {
      if (!element?.scrollIntoView) return;

      const scrollTarget = () => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        if (containerRef?.current) {
          containerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      };

      if (isiOS) {
        window.setTimeout(scrollTarget, IOS_KEYBOARD_SCROLL_DELAY);
        return;
      }

      scrollTarget();
    },
    [containerRef, isiOS],
  );

  return { keyboardHeight, scrollIntoViewOnFocus };
}
