import { useCallback, useRef } from "react";

const DEFAULT_MIN_DISTANCE = 58;
const DEFAULT_DIRECTION_LOCK = 1.2;

const shouldIgnoreSwipeTarget = (target) =>
  target instanceof Element &&
  Boolean(
    target.closest(
      [
        "[data-disable-tab-swipe]",
        "[data-disable-feed-tab-swipe]",
        "[data-disable-layout-swipe]",
        "input",
        "textarea",
        "select",
        "[contenteditable='true']",
      ].join(", "),
    ),
  );

export default function useHorizontalSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  minDistance = DEFAULT_MIN_DISTANCE,
  directionLock = DEFAULT_DIRECTION_LOCK,
} = {}) {
  const gestureRef = useRef(null);

  const onTouchStart = useCallback((event) => {
    if (event.touches.length !== 1 || shouldIgnoreSwipeTarget(event.target)) {
      gestureRef.current = null;
      return;
    }

    const touch = event.touches[0];
    gestureRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
    };
  }, []);

  const onTouchEnd = useCallback(
    (event) => {
      if (!gestureRef.current || event.changedTouches.length !== 1) {
        gestureRef.current = null;
        return;
      }

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - gestureRef.current.startX;
      const deltaY = touch.clientY - gestureRef.current.startY;
      gestureRef.current = null;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (absX < minDistance || absX < absY * directionLock) return;

      if (deltaX < 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    },
    [directionLock, minDistance, onSwipeLeft, onSwipeRight],
  );

  const onTouchCancel = useCallback(() => {
    gestureRef.current = null;
  }, []);

  return {
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
  };
}
