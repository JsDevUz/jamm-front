import React, { createContext, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

type SheetContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [internalOpen, setInternalOpen] = useState(open);

  React.useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  const value = useMemo(
    () => ({
      open: internalOpen,
      setOpen: (next: React.SetStateAction<boolean>) => {
        const resolved = typeof next === "function" ? next(internalOpen) : next;
        setInternalOpen(resolved);
        onOpenChange(resolved);
      },
    }),
    [internalOpen, onOpenChange],
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
  const { open, setOpen } = useSheetContext();

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[110]">
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
        aria-label="Close panel"
      />
      <aside
        className={cn(
          "absolute inset-x-0 bottom-0 flex h-[min(78dvh,680px)] w-full flex-col rounded-t-[28px] border-t border-[var(--meet-border-color)] bg-[var(--meet-panel-muted-bg)] text-[var(--meet-text-color)] shadow-[var(--meet-shadow-color)] backdrop-blur-2xl transition-transform duration-200 md:inset-y-0 md:left-auto md:right-0 md:top-0 md:h-full md:max-w-[420px] md:rounded-none md:border-l md:border-t-0",
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
