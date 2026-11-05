# design-system-template

## 1.4.0

### Minor Changes

- 59d21f1: **Purge Paperclip-legacy dead CSS** (~2,700 lines removed from `src/index.css`, plus `src/motion-tokens.css` slimmed to the 4 core motion primitives):

  - Deleted all consumer-less extracted token families: the `--sz-*` / `--rad-*` / `--pct-*` Batch 3-4 transcriptions, the `--hex-*` / `--app-logo-tile-*` / `--gradient-extract-*` / `--shadow-extract-*` verbatim block, `--agent-1a…10b` gradients, `--pill-guy-*`, `--folder-color-*`, `--gtc-*`, `--dashboard-*`, `--chip-match-*`, `--ds-doc-annotation-*`, `--bubble-agent*`, `--side-panel-*` / streamlined chrome, `--organization-popover-*`, and the dead `--profile-popover-*` members (row-height / row-gap / label-line-height kept — ThemeToggle consumes them).
  - Deleted all consumer-less animation classes and keyframes: the `tc-*` chat-thread family, `agent-cap-*` capsule motif, `hb-*` remnants' sibling blocks (scrollbar auto-hide / while-scrolling, mobile nav / toolbars, dashboard rows, cot ticker, transcript live-tail, decision-disclosure, quicklook, pill-guy, ds-markdown / ds-mdxeditor / mention chips / mermaid themes, ds-thinking), plus their reduced-motion blocks.
  - Deleted consumer-less scoped `--motion-*` tokens (marker/bubble/tool enter, status enter/exit, approval pulse, plan/question, turn fold/meta, line scroll, scroll-pill, pane glide, side-panel tab, mobile nav, count tween, interstitial dwell, scrollbar idle delay, duration deliberate/swap/enter/exit, scroll-pill easings) and the 21 `--onboarding-motion-*` tokens.
  - The machine-readable token-gate allowlist was trimmed to the three entries whose files still exist; kept tokens: `--tp-transform-opacity`, `--tp-border-color-background-color`, `--z-120`, `--text-nano/micro/compact`, `--native-select-*`, `--success`, `--banner-*`.

  No TSX/TS API changes — every removed token, class, and keyframe had zero consumers in the template. Brand-guide copy referencing the removed agent gradients and capsule motif was updated.

- 422f6c9: **Remove Paperclip-legacy dead contexts and hooks** (zero consumers — the brand guide and `main.tsx` only ever mount `ThemeProvider` + `ToastProvider`):

  - Deleted `DialogContext` (NewIssue/NewGoal/NewAgent dialog stacks, the `IssueWorkMode` type, and the onboarding wizard API — the `/onboarding` route it references does not exist in the template).
  - Deleted `SidebarContext` (mobile drawer + retired icon-rail compatibility shim: `collapsed`/`peeking`/`forceCollapsed`/`routeRequestsCollapsed` were all inert by design).
  - Deleted `BreadcrumbContext` (breadcrumb hierarchy + company-name page-title builder for a product surface that no longer exists).
  - Deleted `hooks/usePrefersReducedMotion` (no consumers; reduced-motion is handled globally in CSS).
  - Trimmed `ToastContext` dead exports: `useToast` and `useOptionalToastState` (`useOptionalToastActions` stays — `lib/use-copy-action.ts` consumes it).
  - Storybook preview now wraps only Theme + Toast + Tooltip providers.

  This continues the repo's stated lifecycle rule: a file in `context/`/`hooks/`/`lib/` earns its place by having a real consumer. Tests updated accordingly (6 suites, 16 tests).

- 418148b: **Remove the Paperclip status system** (domain-specific legacy, not generic design-system material):

  - Deleted `StatusBadge.tsx` (incl. `AgentStatusBadge` / `AgentStatusCapsule` / `IssueStatusBadge`), `StatusGlyph.tsx`, `StatusIcon.tsx`, their tests, and `src/lib/status-colors.ts`.
  - Removed the `--status-task-*`, `--status-agent-*`, and `--status-task-icon-*` token sets, the `.status-chip` / `.status-fill` / `hb-pulse` / `hb-blink` helpers, and the dead `--tc-mode-*` block from `src/index.css`.
  - Added a generic `--success` semantic token; `ToggleSwitch`'s on-state now uses `var(--success)` (same green as before).
  - The brand guide's "States & status" section was removed; sections renumbered (Utilities → 09, Design tokens → 10). The Brand-tier swatches now showcase `--success` and the `--banner-*` tones.
  - The a11y gate no longer checks status-icon glyph contrast (tokens removed).

## 1.3.0

### Minor Changes

- **Full shadcn/ui Registry Injection**:
  - Injected every component available in the official `new-york-v4` registry — `ui/` now ships 60+ primitives (accordion, alert, calendar, carousel, chart, combobox, context-menu, drawer, form primitives via `field`, input-otp, menubar, navigation-menu, pagination, progress, radio-group, sidebar, slider, sonner, switch, table, toggle / toggle-group, hover-card, and the agentic `message` / `message-scroller` / `bubble` / `attachment` / `spinner` / `item` / `kbd` / `empty` / `button-group` / `input-group` / `native-select` building blocks) alongside the 26 template-extended primitives.
  - The ai-elements base primitives are part of the injection; the higher-level ai-elements patterns are copy-paste compositions per the official docs.
  - The seven newest registry items (`code-block`, `data-table`, `date-picker`, `questionnaire`, `toast`, `trace`, `typography`) exist only in the new multi-style registry and are intentionally not mixed into the radix-based `new-york-v4` set.
- **Automated Weekly Registry Sync**:
  - Added `.github/workflows/shadcn-sync.yml`: every Monday the tracked components (`scripts/shadcn-components.txt`) are re-injected with `shadcn add --overwrite` and a sync PR opens when upstream moved — Dependabot-style updates for vendored registry code (Dependabot itself covers the npm dependencies).
- **Brand Guide Doubles as the Usage Example**:
  - Every injected registry component now has a working demo on the brand page (accordion, chart, sidebar, calendar, carousel, combobox, drawer, menubar, navigation-menu, table, input-otp, sonner, the agentic message / bubble / attachment primitives, and more), organized into six new subsections plus a Utilities section that demos every `lib/` and `hooks/` utility with live consumers.
  - Documented the directory responsibility model and the two placement rules (registry files in `ui/`, everything hand-written as flat files in `components/`; utilities earn their place through a real consumer).
- **Upstream-Managed `ui/` Directory**:
  - The token and a11y quality gates no longer scan `src/components/ui/` — stock registry code keeps its upstream form so `npx shadcn@latest add <component> --overwrite` stays a no-conflict update path. The gates govern template-authored surfaces (`src/app/**`, `src/components/*.tsx`, `src/lib`, `src/hooks`).
  - Files carrying template-local extensions (RTL, reduced-motion, tokenization, additive variants) are listed in the README for re-application after an overwrite.

## 1.2.0

### Minor Changes

- **Brand-Book Guide Page (Next.js App Router Location)**:
  - Rebuilt the showcase page following the paperclip.ing/brand presentation: fixed sidebar table of contents with scroll-spy, numbered section pills, display headings, spec tables, radius ladder with highlighted anchor, icon grid, and live motion signals.
  - Moved the page from `src/pages/DesignGuide.tsx` to `src/app/brand/page.tsx` (App Router convention): default export + `"use client"`, so the template drops into Next.js bases unchanged.
  - Reorganized coverage into ten numbered sections: foundations, typography, color, spacing, radius, iconography, motion, components, states & status, design tokens.
- **Component Layering Audit & shadcn/ui Alignment**:
  - Audited all 16 stock primitives against the official `new-york-v4` registry; APIs are compatible. Adopted the upstream `AlertDialogContent` `size` (`"default" | "sm"`) prop; every other divergence is a deliberate tokenization (`--rad-*`, `--sz-*`, `--tp-*`), RTL logical properties, or reduced-motion/mobile improvements documented in the README.
  - Documented the four-layer component model (primitives / extensions / template components / optional status module) in the README.
- **Token-Backed Banner Tones**:
  - Decoupled `InlineBanner` from the status palette: banner tones are now the `.banner-tone` helper (`--banner-info/warning/danger` base hues + color-mix recipes in `index.css`), replacing hardcoded hex className strings.
- **Fixes**:
  - Removed the shell-residue `body { overflow: hidden }` so the standalone document scrolls natively.
  - The displayed guide version is now sourced from `package.json` instead of hardcoded strings.

## 1.1.0

### Minor Changes

- **i18n-Ready Architecture & RTL Layout Support**:
  - Upgraded all 26 UI components to Tailwind CSS v4 CSS logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `border-s`, `border-e`, `rtl:rotate-180`) for automatic bi-directional mirroring under `<html dir="rtl">`.
  - Added intrinsic sizing and text-expansion tolerance to avoid string truncation across languages.
  - Fully parameterized component microcopy to enable plug-and-play integration with any localization framework.
- **Automated Accessibility & WCAG 2.1 AA Gate**:
  - Added `scripts/check-a11y-wcag.mjs` running mathematical relative luminance contrast checks ($\ge 4.5:1$ text, $\ge 3.0:1$ graphics) and APCA $L_c$ calculations across all light/dark token pairs.
  - Added AST accessibility anti-pattern scanning (`alt` text, interactive keyboard roles, `aria-label`).
  - Added headless axe-core DOM accessibility audit to pre-commit and CI workflows.
- **Autonomous Standalone Storybook Workshop**:
  - Completely decoupled Storybook preview configuration from monolithic legacy app imports, providing a clean, standalone, zero-friction component preview environment.
  - Replaced legacy story container classes with standardized `.ds-story` layout wrappers.
- **Unified Self-Contained Documentation**:
  - Consolidated all architectural principles, design specifications, font infrastructure guides, and quality standards into a single 100% English self-contained `README.md`.
  - Completely purged all proprietary and legacy vendor namespaces across the entire codebase.

## 1.0.0

### Major Changes

- Initial release of the Anti-Slop Tailwind CSS v4 design system starter template.
  - Strict design standards and token-first architecture to eliminate generic AI slop during AI coding.
  - Built on Tailwind CSS v4, React 19, and Radix UI primitives.
  - Single-knob radius scaling and dual-mode Card surfaces.
  - Locally bundled Inter Variable WOFF2 font with zero external network dependencies and zero FOIT/FOUT.
  - Four automated token gates for color, bracket, typography, and motion governance.
  - 59 unit tests, Storybook component matrix, and Playwright visual snapshot infrastructure.
