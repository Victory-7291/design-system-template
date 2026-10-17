import type { LucideIcon } from "lucide-react";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type BannerTone = "info" | "warning" | "danger";

const TONE_ICON: Record<BannerTone, LucideIcon> = {
  info: Info,
  warning: AlertTriangle,
  danger: AlertCircle,
};

export interface InlineBannerProps {
  /** Visual tone. `info` for context, `warning` for attention, `danger` for failures. */
  tone?: BannerTone;
  /** Optional bold heading rendered above the body. */
  title?: ReactNode;
  /** Body content. */
  children?: ReactNode;
  /** Override the leading icon, or pass `false` to omit it. */
  icon?: LucideIcon | false;
  /** Optional trailing actions (buttons/links) rendered on the right at ≥sm, wrapped below on mobile. */
  actions?: ReactNode;
  /** Denser padding for embedding inside modals/dialogs. */
  compact?: boolean;
  className?: string;
}

/**
 * Token-backed inline banner used for full-width informational and warning
 * notices. Color comes from the `.banner-tone` token helper in `index.css`:
 * `data-tone` points `--sc` at one of the `--banner-*` base hues and the
 * helper derives the soft fill / AA text / translucent border per mode —
 * feature surfaces never hand-roll `bg-yellow-*`/`bg-blue-*` recipes.
 */
export function InlineBanner({
  tone = "info",
  title,
  children,
  icon,
  actions,
  compact = false,
  className,
}: InlineBannerProps) {
  const Icon = icon === false ? null : icon ?? TONE_ICON[tone];
  return (
    <div
      role="note"
      data-tone={tone}
      className={cn(
        "banner-tone flex flex-col gap-2 rounded-lg border sm:flex-row sm:items-start sm:justify-between",
        compact ? "p-3" : "p-4",
        className
      )}
    >
      <div className="flex items-start gap-2.5">
        {Icon && (
          <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        )}
        <div className="space-y-1 text-sm">
          {title && <p className="font-medium leading-tight">{title}</p>}
          {children && (
            <div className="leading-snug opacity-90">{children}</div>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2 ps-6 sm:ps-0">
          {actions}
        </div>
      )}
    </div>
  );
}
