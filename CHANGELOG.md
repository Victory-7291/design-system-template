# design-system-template

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
