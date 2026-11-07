---
"design-system-template": minor
---

**Enforce stock `src/components/ui/`** with a new `check:ui` gate:

- `scripts/check-ui-stock.mjs` compares every registry file (`src/components/ui/**` plus `src/hooks/use-mobile.ts`) with the sha256 manifest in `scripts/shadcn-stock.json`, and fails on hand edits, non-registry files, or missing files. `bun run check` runs it first.
- The weekly shadcn sync regenerates the manifest after `--overwrite`, so upstream changes pass and hand edits do not.
- Moved the three template components that lived in `ui/` despite not being registry items to `src/components/`: `ui/radio-card.tsx` → `RadioCard.tsx`, `ui/toggle-switch.tsx` (+ test) → `ToggleSwitch.tsx`, `ui/resizable-panels.tsx` → `ResizablePanels.tsx`. Import paths change from `@/components/ui/<kebab>` to `@/components/<Pascal>`; APIs are unchanged. They are now covered by the token gates.
