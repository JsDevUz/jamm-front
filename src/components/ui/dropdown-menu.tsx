import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenu components must be used inside DropdownMenu");
  }
  return context;
}

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      triggerRef,
    }),
    [open],
  );

  return (
    <DropdownMenuContext.Provider value={value}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  asChild = false,
}: {
  children: React.ReactElement;
  asChild?: boolean;
}) {
  const { open, setOpen, triggerRef } = useDropdownMenuContext();

  if (!asChild) {
    return (
      <button ref={triggerRef} type="button" onClick={() => setOpen((prev) => !prev)}>
        {children}
      </button>
    );
  }

  return React.cloneElement(children, {
    ref: (node: HTMLButtonElement) => {
      triggerRef.current = node;
      const { ref } = children as unknown as { ref?: (instance: HTMLButtonElement | null) => void };
      if (typeof ref === "function") {
        ref(node);
      }
    },
    "aria-expanded": open,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      children.props.onClick?.(event);
      setOpen((prev) => !prev);
    },
  });
}

export function DropdownMenuContent({
  children,
  className,
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}) {
  const { open, setOpen, triggerRef } = useDropdownMenuContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 220 });

  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const left =
      align === "start"
        ? rect.left
        : align === "end"
          ? rect.right - 220
          : rect.left + rect.width / 2 - 110;

    setPosition({
      top: rect.top - 12,
      left: Math.max(12, Math.min(left, window.innerWidth - 232)),
      width: Math.max(rect.width, 220),
    });
  }, [align, open, triggerRef]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        contentRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("touchstart", handlePointerDown);
    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open, setOpen, triggerRef]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={contentRef}
      className={cn(
        "fixed z-[120] min-w-[220px] rounded-2xl border border-[var(--meet-border-color)] bg-[var(--meet-panel-muted-bg)] p-2 text-[var(--meet-text-color)] shadow-[var(--meet-shadow-color)] backdrop-blur-2xl",
        className,
      )}
      style={{
        top: position.top,
        left: position.left,
        transform: "translateY(-100%)",
        width: position.width,
      }}
    >
      {children}
    </div>,
    document.body,
  );
}

export function DropdownMenuLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--meet-text-muted-color)]", className)}>
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  className,
  onSelect,
}: {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}) {
  const { setOpen } = useDropdownMenuContext();

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-[var(--meet-text-color)] transition-colors hover:bg-[var(--meet-control-hover-bg)]",
        className,
      )}
      onClick={() => {
        onSelect?.();
        setOpen(false);
      }}
    >
      {children}
    </button>
  );
}
