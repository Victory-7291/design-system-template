# design-system-template

## 1.3.0

### Minor Changes

- **Full shadcn/ui Registry Injection**:
  - Injected every component available in the official `new-york-v4` registry — `ui/` now ships 60+ primitives (accordion, alert, calendar, carousel, chart, combobox, context-menu, drawer, form primitives via `field`, input-otp, menubar, navigation-menu, pagination, progress, radio-group, sidebar, slider, sonner, switch, table, toggle / toggle-group, hover-card, and the agentic `message` / `message-scroller` / `bubble` / `attachment` / `spinner` / `item` / `kbd` / `empty` / `button-group` / `input-group` / `native-select` building blocks) alongside the 26 template-extended primitives.
  - The ai-elements base primitives are part of the injection; the higher-level ai-elements patterns are copy-paste compositions per the official docs.
  - The seven newest registry items (`code-block`, `data-table`, `date-picker`, `questionnaire`, `toast`, `trace`, `typography`) exist only in the new multi-style registry and are intentionally not mixed into the radix-based `new-york-v4` set.
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
