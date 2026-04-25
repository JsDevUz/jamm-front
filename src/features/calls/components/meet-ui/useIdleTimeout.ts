import { useEffect, useMemo, useRef, useState } from "react";

type UseIdleTimeoutOptions = {
  desktopDelay?: number;
  mobileDelay?: number;
};

const detectMobile = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches;
};

export function useIdleTimeout(options: UseIdleTimeoutOptions = {}) {
  const { desktopDelay = 2000, mobileDelay = 3000 } = options;
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(detectMobile);
  const [isLandscape, setIsLandscape] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(orientation: landscape)").matches;
  });
  const timeoutRef = useRef<number | null>(null);

  const delay = useMemo(() => (isMobile ? mobileDelay : desktopDelay), [desktopDelay, isMobile, mobileDelay]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(detectMobile());
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsVisible(true);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return undefined;
    }

    const clearExisting = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };

    const showAndScheduleHide = () => {
      setIsVisible(true);
      clearExisting();
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, delay);
    };

    showAndScheduleHide();

    const events: Array<keyof WindowEventMap> = ["mousemove", "mousedown", "touchstart", "touchmove", "keydown"];
    events.forEach((eventName) => window.addEventListener(eventName, showAndScheduleHide, { passive: true }));

    return () => {
      clearExisting();
      events.forEach((eventName) => window.removeEventListener(eventName, showAndScheduleHide));
    };
  }, [delay, isMobile]);

  return {
    isVisible,
    reveal: () => setIsVisible(true),
    isMobile,
    isLandscape,
  };
}
