import * as React from "react";
import { cn } from "@design-system/ui";

export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Prose: React.FC<ProseProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "prose text-[var(--color-text-secondary)] leading-relaxed space-y-6 text-base md:text-lg",
        "[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-[var(--color-text-primary)] [&_h2]:tracking-tight [&_h2]:pt-6",
        "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--color-text-primary)] [&_h3]:pt-4",
        "[&_p]:leading-[1.75]",
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-[var(--color-border-strong)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--color-text-muted)]",
        "[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-[var(--radius-xs)] [&_code]:bg-[var(--color-surface-subtle)] [&_code]:font-mono [&_code]:text-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
