import React from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "default" | "ghost" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClassName: Record<ButtonVariant, string> = {
  default:
    "bg-white text-black hover:bg-white/90",
  secondary:
    "border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]",
  ghost:
    "bg-transparent text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variantClassName[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export { Button };
