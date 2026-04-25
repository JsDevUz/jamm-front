import React, { createContext, useContext, useMemo } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import MobileModalSheet, { useMobileSheetViewport } from "./mobile-sheet";

type SheetContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
};

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used within Sheet");
  }
  return context;
}

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const isMobile = useMobileSheetViewport();
  const value = useMemo(
    () => ({
      open,
      isMobile,
      setOpen: (next: React.SetStateAction<boolean>) => {
        const resolved = typeof next === "function" ? next(open) : next;
        onOpenChange(resolved);
      },
    }),
    [isMobile, onOpenChange, open],
  );

  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
}

export function SheetContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen, isMobile } = useSheetContext();

  if (!open || typeof document === "undefined") return null;

  if (isMobile) {
    return (
      <MobileModalSheet open={open} onClose={() => setOpen(false)} contentClassName={className}>
        {children}
      </MobileModalSheet>
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-[10040]">
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
        aria-label="Close panel"
      />
      <aside
        className={cn(
          "absolute inset-x-0 bottom-0 flex h-[min(82dvh,720px)] w-full flex-col rounded-t-[28px] border-t border-[var(--meet-border-color)] bg-[var(--meet-panel-muted-bg)] text-[var(--meet-text-color)] shadow-[var(--meet-shadow-color)] backdrop-blur-2xl transition-transform duration-200 md:inset-y-4 md:left-auto md:right-4 md:top-4 md:h-[calc(100dvh-2rem)] md:max-w-[420px] md:rounded-[28px] md:border md:border-[var(--meet-border-color)]",
          className,
        )}
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {children}
      </aside>
    </div>,
    document.body,
  );
}
