# Design System Starter Template & Asset Suite

An **out-of-the-box, fully autonomous, token-first design system starter template** built on **Tailwind CSS v4, React 19, Radix UI Primitives, and OKLCH color spaces**. Designed as an enterprise-grade foundation for production web applications, SaaS platforms, and developer tooling.

---

## 1. Package Architecture

```text
.
├── DESIGN.md                                      # Design system charter & engineering principles
├── README.md                                      # Main documentation & getting started guide
│
├── package.json                                   # Standard standalone package configuration
├── tsconfig.json                                  # TypeScript configuration with @/* path aliases
├── components.json                                # shadcn/ui configuration metadata
├── vite.config.ts                                 # High-performance Vite build configuration
├── vitest.config.ts & vitest.setup.ts             # Unit testing & DOM mock environment
├── index.html                                     # Workshop kitchen sink host page
│
├── src/                                           # Core source code
│   ├── index.css                                  # Single token source of truth (Tailwind v4 @theme + OKLCH)
│   ├── motion-tokens.css                          # Two-tier mechanical motion token definitions
│   ├── main.tsx                                   # Workshop application mount entry
│   ├── components/
│   │   ├── ui/                                    # 26 pure atomic primitives (Button, Card, Dialog, Input, etc.)
│   │   ├── EmptyState.tsx                         # Universal empty state container
│   │   ├── ThemeToggle.tsx                        # Light / dark theme toggle (Lucide React)
│   │   ├── InlineBanner.tsx                       # Status banner notifications
│   │   ├── StatusBadge.tsx                        # Systematic telemetry badge
│   │   ├── StatusGlyph.tsx                        # Geometry-distinct status glyphs
│   │   ├── StatusIcon.tsx                         # Interactive status indicator & popover
│   │   └── ToastViewport.tsx                      # Toast notification viewport
│   ├── context/
│   │   ├── ThemeContext.tsx                       # Theme management context (system preference & persistence)
│   │   ├── ToastContext.tsx                       # Toast notification dispatch context
│   │   ├── DialogContext.tsx                      # Modal state management
│   │   ├── SidebarContext.tsx                     # Navigation sidebar state
│   │   └── BreadcrumbContext.tsx                  # Breadcrumb trail state
│   ├── hooks/
│   │   ├── usePrefersReducedMotion.ts             # Accessibility motion reduction listener
│   │   └── useSecondTick.ts                       # Clock and tick pulse hook
│   ├── lib/
│   │   ├── utils.ts                               # cn() style merger & formatting helpers
│   │   ├── status-colors.ts                       # Telemetry status color maps
│   │   ├── color-contrast.ts                      # WCAG AA contrast helpers
│   │   ├── use-copy-action.ts                     # Robust clipboard copy feedback hook
│   │   └── timeAgo.ts                             # Relative time natural language formatter
│   └── pages/
│       └── DesignGuide.tsx                        # Living kitchen sink & interactive component workshop
│
├── public/                                        # Static assets
│   ├── brands/apps/                               # 120+ authentic developer & SaaS service SVG logos
│   │   └── manifest.json                          # Identity provider metadata & security manifest
│   └── fonts/                                     # Bundled local high-performance variable fonts
│       ├── InterVariable.woff2                    # Inter v4.1 variable font (100-900 weights)
│       ├── InterVariable-Italic.woff2             # Inter v4.1 italic variable font
│       └── NOTICE.md                              # SIL Open Font License 1.1 compliance notice
│
├── scripts/                                       # Automated engineering guard scripts
│   ├── check-token-gates.mjs                      # Four hard gates: no hex/rgb literals, no arbitrary brackets, no raw text sizes
│   ├── check-app-brand-assets.mjs                 # Brand vector asset scanner
│   ├── app-brand-validation.mjs & .test.mjs       # SVG XSS security & structure validation tests
│   ├── serve-storybook-static.mjs                 # Zero-dependency local static preview server
│   ├── storybook-visual-baseline.mjs              # Playwright visual baseline manager
│   └── publish-storybook.cjs / verify-...         # Storybook deployment verification utilities
│
├── storybook/                                     # Storybook 10 configuration & component stories
│   ├── .storybook/                                # main.ts / preview.tsx
│   └── stories/                                   # Foundations and primitive coverage stories
│
├── tests/                                         # Automated E2E & visual regression tests
│   └── storybook-visual/                          # Playwright pixel-exact snapshot suite (0 diff tolerance)
│
├── doc/                                           # Architecture & engineering specifications
│   └── FONTS.md                                   # Local font engineering & typography infrastructure spec
│
└── .github/workflows/                             # CI/CD workflows (Quality check, build, releases)
```

---

## 2. Getting Started & Integration Guide

This template is designed for two primary usage patterns: as an **independent package in a monorepo** or as a **starter repository for a new product**.

### Scenario A: Monorepo Package Integration (Recommended)
In a monorepo workspace (e.g. `pnpm`, `bun`, `turborepo`, or `next-forge`):

1. **Copy the directory**: Place this repository into your workspace at `packages/design-system/`.
2. **Define package metadata**: In `package.json`, set the package name (e.g. `@workspace/design-system` or `@repo/design-system`).
3. **Export components and styles**:
   ```json
   {
     "exports": {
       ".": "./src/main.tsx",
       "./styles.css": "./src/index.css"
     }
   }
   ```
4. **Consume in applications**:
   - In your app's global stylesheet (`globals.css` or layout):
     ```css
     @import "@repo/design-system/styles.css";
     ```
   - Import atomic components directly in React 19 pages:
     ```tsx
     import { Button } from "@repo/design-system/components/ui/button";
     import { Card, CardHeader, CardTitle, CardContent } from "@repo/design-system/components/ui/card";
     import { ThemeToggle } from "@repo/design-system/components/ThemeToggle";
     ```

### Scenario B: Standalone Application Boilerplate
To bootstrap a new SaaS or developer tool:
1. Clone this repository and run `bun install` or `pnpm install`.
2. Run `bun run dev` to preview the interactive workshop living kitchen sink at `http://localhost:5173`.
3. Add your application routes and pages directly under `src/pages/`.

### Scenario C: Brand Customization Workflow
Rebranding does not require rewriting component code. Adjust two core design levers:
1. **Color Palette (OKLCH)**: Open [`src/index.css`](./src/index.css) and customize the `--primary`, `--accent`, and `--background` variables under `:root` and `.dark`.
2. **Global Geometry (Single-Knob Radius)**:
   - For ultra-sharp technical/industrial aesthetics: set `--radius: 0rem;`
   - For dense, precise tooling (default): set `--radius: 0.5rem;`
   - For playful, consumer-facing SaaS: set `--radius: 0.75rem;`
   All buttons, inputs, dialogs, cards, and dropdowns automatically rescale with concentric geometric precision.

### Scenario D: Continuous Integration Quality Gates
Add a single command to your CI pipeline:
```bash
bun run check
```
This automatically executes:
1. `check-token-gates.mjs`: Strict enforcement preventing any hardcoded hex/rgb color literals, arbitrary bracket sizes, or raw font-size declarations.
2. `check-app-brand-assets.mjs`: Validates all SVG brand assets against strict structural security policies.

---

## 3. Design System Specifications

### 1. Single Token Source of Truth
- The single source of truth for all design values is [`src/index.css`](./src/index.css).
- Built entirely on native CSS Custom Properties and Tailwind CSS v4 `@theme inline`.
- Runtime-dynamic tokens (light/dark theme variables) are kept in `:root` and `.dark` blocks to enable live client-side theme switching without rebuilds.

### 2. OKLCH Wide-Gamut Semantic Colors
- Adopts the modern **OKLCH** color space, delivering uniform perceptual lightness, rich chroma, and accurate contrast across high-gamut displays (Display P3).
- Uses paired semantic tokens ensuring contrast invariants:
  - Surface: `--background` / `--foreground`
  - Container: `--card` / `--card-foreground`
  - Popover: `--popover` / `--popover-foreground`
  - Primary Action: `--primary` / `--primary-foreground`
  - Muted Neutral: `--muted` / `--muted-foreground`
  - Destructive: `--destructive` / `--destructive-foreground`
- Symmetric dark mode mapping: components never write ad-hoc `dark:bg-[#111]` overrides; colors resolve cleanly from CSS variables.

### 3. Systematic Telemetry Status Colors & Accessibility
- Statuses are normalized into five orthogonal states:
  - Ready / Running: `success` (green spectrum)
  - Blocked / Failed: `error` (red spectrum)
  - Attention / Waiting: `warning` (amber/orange spectrum)
  - Queued / In Progress: `pending` (blue/purple spectrum)
  - Inactive / Idle: `idle` (neutral zinc spectrum)
- Strict compliance with **WCAG AA** contrast ratios (minimum 4.5:1).
- **Non-color-reliant indicators**: Statuses are never conveyed by color alone. Components like [`StatusGlyph`](./src/components/StatusGlyph.tsx) and [`StatusIcon`](./src/components/StatusIcon.tsx) pair colors with distinct geometric shapes for complete color-blind accessibility.

### 4. Single-Knob Multiplicative Radius Scale
- Geometry derives from a single root variable: `--radius: 0.5rem;`.
- Concentric mathematical scaling ensures nested corners align perfectly:
  - `rounded-lg`: `var(--radius)` (8px base)
  - `rounded-md`: `calc(var(--radius) - 2px)` (6px interior)
  - `rounded-sm`: `calc(var(--radius) - 4px)` (4px compact elements)
  - `rounded-xl`: `calc(var(--radius) + 4px)` (12px outer modals)
- Arbitrary bracket corner values (`rounded-[7px]`) are strictly banned by automated gates.

### 5. Dual-Mode Card Architecture
- **Default Bordered Card**: `border border-border bg-card text-card-foreground` for main dashboard sections and elevated panels.
- **Inset Subdued Card**: `bg-muted/50 border-border/50` for nested sub-tasks, code snippets, and telemetry lists, preventing visual nesting fatigue.

### 6. Local Variable Fonts & Zero-Dependency Typography
- Bundles the official **Inter v4.1** variable font locally at `public/fonts/InterVariable.woff2`.
- Zero external CDN requests: completely immune to CDN outages and fully functional in air-gapped / enterprise intranet deployments.
- Zero FOIT/FOUT font flickering and deterministic pixel rendering for visual regression tests (see [`doc/FONTS.md`](./doc/FONTS.md)).

### 7. Industrial Mechanical Motion Tokens
- Defined in [`src/motion-tokens.css`](./src/motion-tokens.css).
- Two-tier separation: physical baseline primitives (`--motion-duration-*`, `--motion-ease-*`) and semantic state tokens (`--motion-fade-*`, `--motion-popover-*`).
- Automated accessibility degradation: `@media (prefers-reduced-motion: reduce)` instantly collapses animation durations to zero.

### 8. Component Atomicity (One Way to Say Each Thing)
- Single authoritative component per responsibility: one `Button`, one `Card`, one `Dialog`, one `Input`, one `EmptyState`.
- Variants are driven via `class-variance-authority` (CVA), preventing duplicate component sprawl.

---

## 4. Automated Hard Gates & Quality Standards

| Gate | Check & Rule | Blocked Pattern | Compliant Standard |
| :--- | :--- | :--- | :--- |
| **Gate 1** | **Zero Hardcoded Color Literals**<br>Forbids hex colors and raw numeric arguments in rgb/rgba/hsl/oklch functions within JSX. | `color: "#fff"`<br>`className="bg-[#18181b]"` | `className="bg-background text-foreground"` |
| **Gate 2** | **Zero Value-Bearing Arbitrary Brackets**<br>Bans ad-hoc sizes, margins, paddings, and radii in Tailwind brackets. | `p-[13px]`<br>`w-[320px]`<br>`rounded-[7px]` | `p-3`<br>`w-80`<br>`rounded-md` |
| **Gate 3** | **Zero Raw Font-Size Declarations**<br>Bans custom font sizes in classes and inline styles. | `text-[13px]`<br>`style={{ fontSize: "14px" }}` | `text-xs`, `text-sm`, `text-base` |
| **Gate 4** | **Zero Legacy HSL Wrappers**<br>Forbids wrapping modern OKLCH tokens in legacy `hsl()`. | `hsl(var(--primary))` | `var(--primary)` |

### Allowlist Rules
- Conditional state selectors (e.g. `data-[state=open]:opacity-100`, `aria-[checked=true]:bg-primary`, `max-[480px]:hidden`) are state predicates and are fully permitted.
- Third-party overrides are machine-audited via the `/* ── ALLOWLIST ── */` block in `src/index.css`.

### Brand SVG Security Scanning (`scripts/app-brand-validation.mjs`)
- Enforces strict SVG vector safety across `public/brands/apps/`.
- Rejects any SVG containing `<script>`, `<foreignObject>`, `<iframe|object|embed>`, `onload=`, or `javascript:` URI vectors.
- Rejects external resource links, ensuring 100% offline security.

### Visual Regression Testing (`tests/storybook-visual/`)
- Powered by Playwright headless Chromium.
- Enforces `animations: "disabled"`, `caret: "hide"`, and `reducedMotion: "reduce"`.
- Target: **Zero visual drift (`maxDiffPixels: 0`)**.

---

## 5. Architectural Standards & Declarative Statements

### Iconography Infrastructure
- The design system designates `lucide-react` as its standard atomic icon infrastructure. All interactive primitives (Buttons, Dialogs, Selects, Dropdowns, and Theme Toggles) utilize Lucide icons to maintain visual consistency across weights, stroke terminals, and accessibility tags.

### Ecosystem Brand Vector Assets
- The design system maintains a curated, verified library of 120+ authentic developer and SaaS service vector SVGs under `public/brands/apps/`, backed by `manifest.json`. This standardizes third-party OAuth logins, integration hubs, and webhook targets across products.

### Local Font Autonomy
- The design system packages `InterVariable.woff2` locally, completely eliminating external Google Fonts or Adobe Typekit CDN links. This guarantees zero font layout shifts (FOIT/FOUT), air-gapped readiness, and deterministic visual regression testing.

### Flattened Standalone Package Layout
- The design system operates as a unified, root-level package rather than a nested sub-directory. This ensures zero-friction installation in both standalone codebases and monorepo workspaces.

---

## 6. Available Scripts

```bash
# Start local workshop living kitchen sink (http://localhost:5173)
bun run dev

# Run automated token hard gates (Gate 1-4)
bun run check:tokens

# Validate brand SVG vector assets & security
bun run check:brand

# Run all quality & security gates
bun run check

# Run unit tests via Vitest
bun run test

# Run TypeScript type check
bun run typecheck

# Build production bundle
bun run build

# Start Storybook 10 (http://localhost:6006)
bun run storybook
```

---

## 7. Documentation Index

- [`DESIGN.md`](./DESIGN.md) — Comprehensive design system principles, token rules, and mobile ergonomics.
- [`doc/FONTS.md`](./doc/FONTS.md) — Technical specification for local font infrastructure, WOFF2 compression, and variable font mechanics.
- [`public/fonts/NOTICE.md`](./public/fonts/NOTICE.md) — SIL Open Font License 1.1 font distribution notice.
- [`public/brands/apps/manifest.json`](./public/brands/apps/manifest.json) — Official registry and metadata for all 120+ bundled integration brand assets.
