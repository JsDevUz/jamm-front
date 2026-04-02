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
  };
};

const isEditableElement = (element) => {
  if (!element) return false;

  const tagName = String(element.tagName || "").toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    element.isContentEditable === true
  );
};

const resetViewportVariables = (root) => {
  if (typeof window === "undefined" || !root) return;

  root.style.setProperty("--keyboard-height", "0px");
  root.dataset.mobileKeyboardOpen = "false";
};

export default function useKeyboardAvoid(containerRef) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const isiOS = useMemo(() => isIosDevice(), []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const viewport = window.visualViewport;
    const root = document.documentElement;
    let frameId = null;
    let resetTimeoutId = null;
    let lastKeyboardHeight = -1;

    const syncViewport = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        const { keyboardHeight: nextKeyboardHeight } = getViewportMetrics();

        if (nextKeyboardHeight !== lastKeyboardHeight) {
          lastKeyboardHeight = nextKeyboardHeight;
          root.style.setProperty("--keyboard-height", `${nextKeyboardHeight}px`);
          root.dataset.mobileKeyboardOpen =
            nextKeyboardHeight > 0 ? "true" : "false";
          setKeyboardHeight(nextKeyboardHeight);
        }

        frameId = null;
      });
    };

    syncViewport();

    const scheduleKeyboardReset = (delay = 0) => {
      if (resetTimeoutId) {
        window.clearTimeout(resetTimeoutId);
      }

      resetTimeoutId = window.setTimeout(() => {
        const activeElement = document.activeElement;
        if (!isEditableElement(activeElement)) {
          lastKeyboardHeight = 0;
          setKeyboardHeight(0);
          resetViewportVariables(root);
        }
      }, delay);
    };

    const handleFocusOut = () => {
      scheduleKeyboardReset(0);
      window.setTimeout(() => {
        scheduleKeyboardReset(0);
      }, 120);
    };

    const handlePageShow = () => {
      scheduleKeyboardReset(0);
      syncViewport();
    };

    window.addEventListener("resize", syncViewport, { passive: true });
    window.addEventListener("focusout", handleFocusOut, { passive: true });
    window.addEventListener("pageshow", handlePageShow, { passive: true });
    window.addEventListener("popstate", handlePageShow, { passive: true });

    if (viewport) {
      viewport.addEventListener("resize", syncViewport, { passive: true });
      viewport.addEventListener("scroll", syncViewport, { passive: true });
    }

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (resetTimeoutId) {
        window.clearTimeout(resetTimeoutId);
      }
      window.removeEventListener("resize", syncViewport);
      window.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePageShow);
      viewport?.removeEventListener("resize", syncViewport);
      viewport?.removeEventListener("scroll", syncViewport);
      resetViewportVariables(root);
    };
  }, []);

  const scrollIntoViewOnFocus = useCallback(
    (element) => {
      if (!element?.scrollIntoView) return;

      const scrollTarget = () => {
        element.scrollIntoView({
          behavior: isiOS ? "auto" : "smooth",
          block: "nearest",
          inline: "nearest",
        });

        if (containerRef?.current) {
          containerRef.current.scrollIntoView({
            behavior: isiOS ? "auto" : "smooth",
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
