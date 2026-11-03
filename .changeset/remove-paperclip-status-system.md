---
"design-system-template": major
---

**Remove the Paperclip status system** (domain-specific legacy, not generic design-system material):

- Deleted `StatusBadge.tsx` (incl. `AgentStatusBadge` / `AgentStatusCapsule` / `IssueStatusBadge`), `StatusGlyph.tsx`, `StatusIcon.tsx`, their tests, and `src/lib/status-colors.ts`.
- Removed the `--status-task-*`, `--status-agent-*`, and `--status-task-icon-*` token sets, the `.status-chip` / `.status-fill` / `hb-pulse` / `hb-blink` helpers, and the dead `--tc-mode-*` block from `src/index.css`.
- Added a generic `--success` semantic token; `ToggleSwitch`'s on-state now uses `var(--success)` (same green as before).
- The brand guide's "States & status" section was removed; sections renumbered (Utilities → 09, Design tokens → 10). The Brand-tier swatches now showcase `--success` and the `--banner-*` tones.
- The a11y gate no longer checks status-icon glyph contrast (tokens removed).
