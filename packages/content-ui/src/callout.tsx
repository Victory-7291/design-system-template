import * as React from "react";
import { cn } from "@design-system/ui";

export interface CalloutProps {
  variant?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  variant = "info",
  title,
  children,
  className,
}) => {
  const accentBorder =
    variant === "warning"
      ? "border-l-amber-500"
      : variant === "tip"
      ? "border-l-[var(--color-action-accent)]"
      : variant === "danger"
      ? "border-l-rose-500"
      : "border-l-[var(--color-action-primary)]";

  return (
    <div
      className={cn(
        "my-6 p-4 md:p-5 rounded-r-[var(--radius-md)] bg-[var(--color-surface-subtle)] border-l-4 border-t border-r border-b border-[var(--color-border-subtle)] text-sm leading-relaxed",
        accentBorder,
        className
      )}
    >
      {title && (
        <div className="font-semibold text-[var(--color-text-primary)] mb-1.5 flex items-center gap-2">
          {title}
        </div>
      )}
      <div className="text-[var(--color-text-secondary)]">{children}</div>
    </div>
  );
};
