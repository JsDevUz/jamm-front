import React, { useEffect, useState } from "react";
import { Sheet as ModalSheet } from "react-modal-sheet";
import { cn } from "../../lib/utils";

function subscribeMediaQuery(
  mediaQuery: MediaQueryList,
  listener: (matches: boolean) => void,
) {
  const handleChange = (event: MediaQueryListEvent) => listener(event.matches);

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }

  mediaQuery.addListener(handleChange);
  return () => mediaQuery.removeListener(handleChange);
}

export function useMobileSheetViewport(breakpoint = 768) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(query).matches
      : false,
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    setIsMobile(mediaQuery.matches);
    return subscribeMediaQuery(mediaQuery, setIsMobile);
  }, [query]);

  return isMobile;
}

type MobileModalSheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  detent?: "default" | "content" | "full";
  disableDismiss?: boolean;
  disableDrag?: boolean;
  snapPoints?: number[];
  initialSnap?: number;
};

export default function MobileModalSheet({
  open,
  onClose,
  children,
  className,
  contentClassName,
  detent = "default",
  disableDismiss = false,
  disableDrag = false,
  snapPoints,
  initialSnap,
}: MobileModalSheetProps) {
  if (typeof document === "undefined") return null;

  return (
    <ModalSheet
      isOpen={open}
      onClose={onClose}
      detent={detent}
      disableDismiss={disableDismiss}
      disableDrag={disableDrag}
      disableScrollLocking
      avoidKeyboard
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      mountPoint={document.body}
      unstyled
    >
      <ModalSheet.Backdrop
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
        style={{ zIndex: 10040 }}
      />
      <ModalSheet.Container
        className={cn(
          "mx-auto flex w-full max-w-[560px] flex-col overflow-hidden rounded-t-[28px] border-t border-[var(--meet-border-color)] bg-[var(--meet-panel-muted-bg)] text-[var(--meet-text-color)] shadow-[var(--meet-shadow-color)] backdrop-blur-2xl",
          className,
        )}
        style={{
          zIndex: 10041,
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <ModalSheet.Header className="flex justify-center px-4 py-3">
          <ModalSheet.DragIndicator className="h-1.5 w-12 rounded-full bg-[var(--meet-border-color)]" />
        </ModalSheet.Header>
        <ModalSheet.Content
          className={cn("flex min-h-0 flex-1 flex-col", contentClassName)}
          scrollClassName="flex h-full min-h-0 flex-col"
        >
          {children}
        </ModalSheet.Content>
      </ModalSheet.Container>
    </ModalSheet>
  );
}
