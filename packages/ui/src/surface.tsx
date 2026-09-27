import * as React from "react";
import { cn } from "./lib/utils.js";

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "canvas" | "raised" | "subtle";
  bordered?: boolean;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, variant = "raised", bordered = true, children, ...props }, ref) => {
    const bgClass =
      variant === "canvas"
        ? "bg-[var(--color-surface-canvas)]"
        : variant === "subtle"
        ? "bg-[var(--color-surface-subtle)]"
        : "bg-[var(--color-surface-raised)]";

    return (
      <div
        ref={ref}
        className={cn(
          bgClass,
          "rounded-[var(--radius-lg)] p-6 transition-colors duration-150",
          bordered && "border border-[var(--color-border-default)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Surface.displayName = "Surface";
