# Design System Starter Template

This is a design system starter template built to stop AI assistants from degrading UI quality during automated coding. Use it as the frontend foundation for a new product, or as an isolated design system workspace inside an enterprise monorepo.

The template makes Tailwind CSS v4 the single source of truth for design tokens. It ships the full shadcn/ui registry plus a template extension layer, an air-gapped local variable font, an OKLCH color system, a single-knob radius scale, and an automated gate pipeline enforced locally and in CI.

The repository is self-contained. All architectural principles, design tokens, typography specifications, and quality gate standards are defined within this document.

---

## 1. Motivation

With AI coding assistants such as Cursor, Claude Code, and GitHub Copilot writing frontend code, UI quality deteriorates rapidly across iterations. This degradation happens because large language models lack persistent spatial awareness and long-term memory, optimizing instead for local token probabilities. Common failure modes include:

1. **Color Drift**: Models frequently introduce raw hex literals (`#3b82f6` or `#18181b`) or ad-hoc `rgba(...)` calls for new elements. These hardcoded values bypass global theme variables, breaking dark mode and causing primary colors and background tints to diverge across pages.
2. **Arbitrary Bracket Proliferation**: To align a card or align table items, models introduce arbitrary Tailwind bracket classes (`w-[347px]`, `p-[13px]`, `rounded-[11px]`, `text-[13px]`). This destroys the 4px and 8px rhythmic spacing scale and produces mismatched visual proportions across components.
3. **Low-Density Template Stacking (AI Slop)**: Models default to low-density nested cards, diffuse blur backdrops, glowing borders, and excessive empty space. In enterprise command consoles, ticket boards, and dense data tables, this pattern slows scanning speed and wastes screen real estate.
4. **Paper Specifications Fail to Constrain Code**: Writing design rules in Figma files, PDFs, or online wikis does not prevent AI assistants from breaking them. Rules only hold when backed by mechanical, automated gates that block non-compliant code from merging.

The template counters with two mechanisms:

- **Tailwind CSS v4 as the Single Source of Truth (Code as Design)**: We eliminated intermediate translation layers where DTCG JSON files were compiled into CSS variables. All tokens are declared directly in `src/index.css` via native CSS custom properties and `@theme inline`, so the code is the design specification.
- **Automated Hard Gates**: Static analysis rules in `scripts/check-token-gates.mjs` and related audit tools run during pre-commit and CI. If an AI assistant introduces a hardcoded color, an arbitrary value-bearing bracket, or an untokenized font size, the build halts immediately with actionable errors.

---

## 2. Structure

```text
.
├── README.md                                      # Design system charter and specifications (single source of truth)
├── package.json                                   # Package configuration (design-system-template)
├── tsconfig.json                                  # TypeScript configuration with @/* path aliases
├── components.json                                # shadcn/ui component library metadata
├── vite.config.ts                                 # Vite build configuration (Tailwind v4 + React 19)
├── vitest.config.ts & vitest.setup.ts             # Unit test suite and DOM mock environment
├── index.html                                     # Local living kitchen sink workshop mount point
│
├── src/                                           # Core source code
│   ├── index.css                                  # Token single source of truth: OKLCH semantic tiers and Tailwind v4 @theme
│   ├── motion-tokens.css                          # Physical and scoped motion tokens with reduced-motion fallback
│   ├── main.tsx                                   # Local workshop application entry point
│   ├── components/
│   │   ├── ui/                                    # shadcn/ui primitives (full registry injection, updated via the shadcn CLI)
│   │   ├── EmptyState.tsx                         # Universal empty state container
│   │   ├── ThemeToggle.tsx                        # Light and dark theme switcher
│   │   ├── InlineBanner.tsx                       # Token-backed banner with info / warning / danger tones
│   │   ├── StatusBadge.tsx                        # Status badges (agent / task / run / approval vocabularies)
│   │   ├── StatusGlyph.tsx                        # Geometry-first unified status glyph
│   │   ├── StatusIcon.tsx                         # Interactive status indicator with popover picker
│   │   └── ToastViewport.tsx                      # Toast notification viewport
│   ├── context/
│   │   ├── ThemeContext.tsx                       # Theme management and local storage persistence
│   │   ├── ToastContext.tsx                       # Notification dispatch context
│   │   ├── DialogContext.tsx                      # Modal dialog state stack
│   │   ├── SidebarContext.tsx                     # Collapsible sidebar and mobile drawer state
│   │   └── BreadcrumbContext.tsx                  # Breadcrumb hierarchy and document title management
│   ├── hooks/
│   │   ├── usePrefersReducedMotion.ts             # System reduced motion preference listener
│   │   └── useSecondTick.ts                       # High-precision second-interval tick generator
│   ├── lib/
│   │   ├── utils.ts                               # cn() class merging utility (clsx + tailwind-merge)
│   │   ├── status-colors.ts                       # Five-phase lifecycle status color dictionaries
│   │   ├── color-contrast.ts                      # Mathematical WCAG AA contrast ratio helpers
│   │   ├── use-copy-action.ts                     # Clipboard copy interaction hook
│   │   └── timeAgo.ts                             # Relative time natural language formatter
│   └── app/
│       └── brand/
│           └── page.tsx                           # Brand guide (Next.js App Router page): tokens, primitives, status language
│
├── public/                                        # Static assets and asset libraries
│   ├── brands/                                    # Curated vector SVG library of 120+ developer and SaaS services
│   │   ├── apps/                                  # Audited SVG and PNG brand assets
│   │   └── apps/manifest.json                     # Asset metadata, alias mappings, and security hashes
│   └── fonts/                                     # Bundled air-gapped typography assets
│       ├── InterVariable.woff2                    # Inter v4.1 Roman variable font (100 to 900 weight)
│       ├── InterVariable-Italic.woff2             # Inter v4.1 Italic variable font
│       └── NOTICE.md                              # SIL Open Font License 1.1 compliance notice
│
├── scripts/                                       # Automated engineering quality gates
│   ├── check-token-gates.mjs                      # Gates 1-4: zero color literals, zero value brackets, zero raw font-size
│   ├── check-app-brand-assets.mjs                 # Brand vector asset completeness and manifest validation
│   ├── app-brand-validation.mjs & .test.mjs       # Brand SVG security parser (anti-XSS and structural hygiene)
│   ├── check-a11y-wcag.mjs                        # WCAG 2.1 AA mathematical verification, a11y static scan, axe-core audit
│   ├── serve-storybook-static.mjs                 # Lightweight local static file server
│   ├── storybook-visual-baseline.mjs              # Visual snapshot baseline comparison utility
│   └── publish-storybook.cjs / verify-...         # Storybook distribution verification scripts
│
├── storybook/                                     # Storybook 10 documentation workshop
│   ├── .storybook/                                # Storybook configuration (main.ts, preview.tsx, styles.css)
│   └── stories/                                   # Foundation and primitive coverage stories
│
├── tests/                                         # Automated end-to-end and visual regression testing
│   └── storybook-visual/                          # Playwright-driven zero-drift visual snapshot regression suite
│
└── .github/workflows/                             # GitHub Actions CI workflows (gates, test, build, release)
```

---

## 2.1 Components

### Component sources

`src/components/ui/` contains the full shadcn/ui registry, injected with the official CLI: 60+ primitives covering accordion, chart, sidebar, calendar, carousel, sonner, form primitives, and the agentic `message` / `bubble` / `attachment` building blocks. `components.json` in the repo root pins the `new-york` style on Tailwind v4, so `npx shadcn@latest add <component>` is the supported way to add or update any of them. 26 of the files carry a template extension layer (documented below); the rest are stock upstream files.

The library is layered; only the top layer is Paperclip-specific.

| Layer | Location | What it is | Relationship to shadcn/ui |
| :--- | :--- | :--- | :--- |
| 1. Atomic primitives | `src/components/ui/` | Full shadcn/ui registry, CLI-injected | Stock shadcn/ui `new-york` (Tailwind v4) code, managed through `components.json` |
| 2. Primitive extensions | 26 of the same files | Additive variants: Button `cta` / `xs` / `icon-*` sizes, Card `interactive`, Avatar sizes + group, Select `sm`, Tabs `line`, Badge `ghost` / `link` | Additive props on the stock API; no stock variant was removed or reshaped |
| 3. Template components | `src/components/*.tsx` | `EmptyState`, `InlineBanner`, `ThemeToggle`, `ToastViewport`, `RadioCard`, `ToggleSwitch`, `ResizablePanels` | Not in the shadcn registry; built from tokens and Layer-1 primitives |
| 4. Status language | `src/components/Status*.tsx` + `src/lib/status-colors.ts` | `StatusBadge`, `StatusGlyph`, `StatusIcon` + the status palette | Paperclip-specific domain vocabulary (task lifecycle, agent heartbeat, run / goal / approval outcomes). Flat files; delete them if your product does not need it |

The agentic-interface primitives (`message`, `message-scroller`, `bubble`, `attachment`, `spinner`, `item`, `kbd`, `empty`) ship as part of the registry injection. They are presentational: plain props and callbacks, no Vercel AI SDK imports. The higher-level ai-elements patterns (plan, tool, chain-of-thought, …) are officially copy-paste compositions and are deliberately not vendored here, so that `ui/` stays fully CLI-managed and machine-updatable. Compose those patterns in feature code on top of the injected primitives.

### Weekly updates

`.github/workflows/shadcn-sync.yml` re-injects every component tracked in `scripts/shadcn-components.txt` every Monday with `shadcn add --overwrite`, and opens a sync PR when upstream moved. Dependabot covers the npm packages the components installed; this workflow covers the vendored source files, which Dependabot cannot see.

A sync cannot break application code for two reasons. First, the primitives keep a fixed API surface (exports, props, `data-slot` attributes, cva variants), so code written against `Button` or `Dialog` survives an overwrite. Second, the token gates do not scan `ui/`, so upstream's class conventions never fail a check; CI still runs the a11y gates and the test suite on every sync PR.

One caveat: an overwrite reverts the 26 extended files to stock. The sync PR diff shows exactly which files were touched, and the re-apply list is `button.tsx`, `badge.tsx`, `card.tsx`, `avatar.tsx`, `select.tsx`, `tabs.tsx`, `alert-dialog.tsx`, `dialog.tsx`, `sheet.tsx`, `command.tsx`. Adopting a newly published component is one command plus one line in the tracked list.

The extended files diverge from upstream in three documented ways:

- Values are tokenized: `ring-[3px]` becomes `ring-(length:--rad-3)`, `transition-[color,box-shadow]` becomes `transition-(--tp-color-box-shadow)`, and geometry resolves through `src/index.css` tokens (`top-(--pct-50)`, `max-w-(--sz-calc-25)`). Class order may differ from upstream; the API does not.
- Physical directions are replaced with logical RTL properties (`ps-8`, `pe-2`, `start-2`, `end-2`), per the i18n pass.
- Interactive surfaces carry explicit `motion-reduce:` fallbacks and mobile-safe typography (`text-base md:text-sm` on editable controls).

### Accessibility

Accessibility lives in the behavior layer, below the styling. The primitives are headless (Radix UI) and own the parts that are hard to get right: focus trapping in dialogs and focus return to the trigger, roving tabindex and typeahead in menus, ARIA wiring (`DialogTitle` becomes `aria-labelledby`, `DialogDescription` becomes `aria-describedby`), `aria-expanded` and `aria-haspopup` on triggers, and live regions for toasts. The shadcn layer adds consistent conventions on top: a `focus-visible:ring` driven by the `--ring` token on every interactive element, `aria-invalid:` styling hooks for form validation, and `data-state` attributes so state styling cannot drift from semantic state.

This template verifies the result instead of trusting it. The a11y gates run a static anti-pattern scan and an axe-core WCAG 2.1 AA audit over every component, `ui/` included, and the full registry passes with zero violations. A weekly sync that introduces a regression fails CI on the sync PR.

That behavior-first model is the template's accessibility standard. Application and template components compose `ui/` primitives rather than reimplementing interaction; focus, keyboard, and ARIA concerns are inherited from the primitive, and the gates check the composed result.

### The Radix UI rule

Template-authored interactive components build on the `radix-ui` package or compose `ui/` primitives. Do not introduce a second headless base (Base UI, React Aria) into template code: one focus and keyboard model per product is what keeps dialog focus management, menu keyboard maps, and screen-reader output consistent across surfaces.

The vendored registry follows upstream wherever upstream went. 36 files import `radix-ui`; one (`combobox.tsx`) uses Base UI because upstream chose it for that pattern. The exception ships because `ui/` tracks upstream file-for-file. It is not a pattern to copy into template code.

### Directory responsibilities

| Directory | Role | Gates |
| :--- | :--- | :--- |
| `src/app/` | Routes and pages (App Router). The brand guide lives at `src/app/brand/page.tsx`. | token + a11y |
| `src/components/ui/` | shadcn/ui registry code, CLI-managed, never hand-edited | a11y only |
| `src/components/*.tsx` | Template components and your application components, composed from `ui/` primitives and tokens | token + a11y |
| `src/context/` | Global state providers, one per real consumer (`Theme`, `Toast`) | vitest |
| `src/hooks/` | Shared hooks (`use-mobile` ships with the sidebar primitive) | vitest |
| `src/lib/` | Pure utilities (`cn`, `timeAgo`, `formatDateTime`, copy feedback, contrast math) and the status palette | vitest |
| `src/index.css` | Token single source of truth | n/a |

Placement is a one-question test: did the registry give you this file, or did you write it? Registry files live in `ui/` and stay stock. Everything written by a person, template or application, is a flat file in `src/components/` with a co-located `*.test.tsx`. Two lifecycle rules keep the tree honest: a file in `context/`, `hooks/`, or `lib/` earns its place by having a real consumer, and deleting a component takes its dedicated state and palette with it.

### Usage example

`src/app/brand/page.tsx` is both the showcase and the reference implementation. Every primitive in `ui/`, every template component, the status language, and every utility in `lib/` has a working demo there, written the way application code should be written: composition over `ui/` primitives, tokens everywhere, no hardcoded values. When you add a component to the template, add its demo to the brand guide in the same change; when a file cannot earn a demo, question whether it belongs in the template.

---

## 3. Usage

The recommended way to scaffold a project is using the official `create-design-system-template` CLI initializer. It supports interactive guided prompts and one-shot command-line execution, for standalone applications and monorepo shared packages.

### 3.1 Quick Start

#### Option A: Interactive wizard

Run without arguments to launch the step-by-step terminal wizard:

```bash
# Bun (recommended)
bun create design-system-template

# npm
npm create design-system-template@latest

# pnpm
pnpm create design-system-template

# or npx (zero-install)
npx -y create-design-system-template@latest
```

The wizard asks:
1. **Template Mode**: Choose between `Standalone Application (Next.js / Vite)` or `Monorepo Shared Package`.
2. **Destination Path**:
   - In *Standalone Mode*: Enter the directory where `design-system` will be created (default: `./`, automatically creates `./design-system`).
   - In *Monorepo Package Mode*: Enter the parent directory where `design-system` will be stored (default: `packages`, automatically creates `packages/design-system`).
3. **Package Manager** *(Standalone only)*: Select `bun`, `pnpm`, `npm`, or `yarn`. (Package mode automatically detects and reuses your repository's existing package manager).

#### Option B: CLI flags

Provide target paths and options directly for non-interactive or CI execution:

```bash
# Standalone application starter (automatically creates <dir>/design-system)
bun create design-system-template -p <dir> --mode standalone --pm bun
# or specifying a custom project name:
bun create design-system-template -n <project-name> --mode standalone --pm bun
# or using pnpm / npm
pnpm create design-system-template -n <project-name> --mode standalone --pm pnpm
npx -y create-design-system-template@latest -n <project-name> --mode standalone --pm npm

# Monorepo shared package (automatically creates <dir>/design-system)
bun create design-system-template -p packages --mode package
# or using pnpm / npm
pnpm create design-system-template -p packages --mode package
npx -y create-design-system-template@latest -p packages --mode package
```

### CLI options

| Flag | Description | Default |
| :--- | :--- | :--- |
| `-p, --path <path>` | Destination directory path where `design-system` is stored (auto-creates `design-system` subdirectory) | `./` (standalone) / `packages` (package) |
| `-n, --name <name>` | Project name (standalone) or package name (package) | `design-system` or `@repo/<dirname>` |
| `-d, --dir <dir>` | Alias for `-p, --path` | Same as `--path` |
| `-m, --mode <mode>` | Template mode: `standalone` or `package` | Interactive prompt |
| `--pm, --package-manager <pm>` | Package manager: `bun`, `pnpm`, `npm`, `yarn` | Auto-detected / `bun` |
| `--disable-git` | Skip Git repository initialization (standalone only) | `false` |
| `--skip-install` | Skip automated dependency installation | `false` |
| `--branch <branch>` | Git branch or tag to download | `main` |

---

### Scenario 1: Standalone app

To create a new product or establish a dedicated brand codebase:

1. **Scaffold via CLI**:
   - **Interactive prompt**:
     ```bash
     bun create design-system-template
     # or: npm create design-system-template@latest
     ```
     *(Select `Standalone Application` -> enter destination directory e.g. `./` -> select package manager -> automatically creates `./design-system`)*.
   - **CLI arguments**:
     ```bash
     # Specify destination directory (automatically creates <dir>/design-system):
     bun create design-system-template -p <dir> --mode standalone --pm bun

     # Or specify custom project name:
     bun create design-system-template -n <project-name> --mode standalone --pm bun
     ```
2. **Navigate and preview living workshop**:
   ```bash
   cd design-system # or cd <project-name>
   bun run dev
   ```
   Open `http://localhost:5173` in your browser. The brand guide demos every registry primitive, the OKLCH palettes, status badges, form controls, and card modes.
3. **Customize brand tokens**:
   Follow [4.1 Brand customization](#41-brand-customization) to adjust OKLCH brand variables and corner radius knobs.
4. **Develop application views**:
   Add routes under `src/app/` (App Router convention; the shipped brand guide lives at `src/app/brand/page.tsx`), consuming primitives directly from `src/components/ui/`.

---

### Scenario 2: Monorepo package

In projects built on `next-forge`, `pnpm workspaces`, or `turborepo` (such as `saas-template`):

1. **Scaffold into packages directory**:
   - **Interactive prompt**:
     ```bash
     # Run inside your monorepo root
     bun create design-system-template
     # or: pnpm create design-system-template
     ```
     *(Select `Monorepo Shared Package` -> enter parent path `packages` -> automatically creates `packages/design-system` and reuses monorepo package manager)*.
   - **CLI arguments**:
     ```bash
     bun create design-system-template -p packages --mode package
     # or
     pnpm create design-system-template -p packages --mode package
     ```
2. **Configured package name**:
   The CLI automatically sets `"name"` in `package.json` to `@repo/design-system` (or `@repo/<folder-basename>`).
3. **Export components and styles**:
   The generated `package.json` configures standardized exports:
   ```json
   {
     "exports": {
       ".": "./src/main.tsx",
       "./components/*": "./src/components/ui/*",
       "./styles.css": "./src/index.css",
       "./motion.css": "./src/motion-tokens.css"
     }
   }
   ```
4. **Consume in applications**:
   - In your app entry point (e.g., Next.js `app/globals.css` or root layout):
     ```css
     @import "@repo/design-system/styles.css";
     ```
   - In application pages:
     ```tsx
     import { Button } from "@repo/design-system/components/ui/button";
     import { Card, CardHeader, CardTitle, CardContent } from "@repo/design-system/components/ui/card";
     import { ThemeToggle } from "@repo/design-system/components/ThemeToggle";
     ```

---

## 4. Build

### 4.1 Brand customization

Customizing brand identity does not require modifying component JSX. It is controlled through two core design knobs:

1. **Brand Color Reshaping (OKLCH)**:
   Open `src/index.css` and update the OKLCH values for `--primary`, `--accent`, and related variables in the `:root` and `.dark` blocks. All components update their themes automatically.
2. **Form Factor & Geometry Tuning (Single-Knob Corner Radius)**:
   Adjust `--radius` in `src/index.css`:
   - Rigid industrial or developer console aesthetic: `--radius: 0rem;`
   - Compact professional tool aesthetic (default): `--radius: 0.5rem;`
   - Soft consumer SaaS aesthetic: `--radius: 0.75rem;`
   All buttons, inputs, cards, dialogs, and nested containers recalculate in proportion and stay concentric: nested controls keep tighter radii than their containers.

### 4.2 Commands

```bash
# Start local living kitchen sink workshop (http://localhost:5173)
bun run dev

# Build production application bundle
bun run build

# Preview production build locally
bun run preview

# Start Storybook 10 interactive workshop (http://localhost:6006)
bun run storybook

# Build static Storybook artifacts to storybook-static/
bun run build-storybook
```

### 4.3 Quality gates

```bash
# Run automated token hard gates (Gate 1-4: zero hex colors, zero value brackets, zero raw font-size)
bun run check:tokens

# Run brand SVG asset security & manifest validation (anti-XSS and viewBox audit)
bun run check:brand

# Run accessibility & contrast hard gate (WCAG 2.1 AA mathematical verification + a11y static scan + axe-core DOM audit)
bun run check:a11y

# Run all quality, security, and accessibility gates in sequence
bun run check

# Run unit and context state tests via Vitest (59 tests)
bun run test

# Run TypeScript strict type verification
bun run typecheck
```

### 4.4 Release

The repository provides automated maintenance and publishing tooling for the design system template and its companion CLI (`create-design-system-template`):

```bash
# Build standalone CLI distribution bundle (bundles cli/src to cli/dist/index.js)
bun run build:cli

# Generate Changeset versioning entry for changes
bun run changeset

# Bump version numbers and update CHANGELOG.md via Changeset
bun run version-packages

# Tag git release commit
bun run release

# Clean build artifacts and TypeScript cache
bun run clean
```

#### CLI publishing
- **NPM Package**: `create-design-system-template`
- **Release Automation**: GitHub Actions ([`.github/workflows/release.yml`](.github/workflows/release.yml)) automatically builds the template and CLI on pushes to `main`. When `cli/package.json` version is incremented relative to npm, the workflow automatically publishes the new version with `--provenance` and `--access public`.

---

## 5. Architecture

### 5.1 No shared package

A common pattern is a centralized multi-brand npm package (`@org/design-tokens`, `@org/ui`) that every application installs as an upstream dependency. Sub-applications may only override CSS variables, and new components need a multi-team review.

In production this pattern fails in four ways:

1. **Variable overrides cannot express brand differences**: brand identity lives in information density, layout geometry, whitespace rhythm, and domain-specific interaction. Marketing sites need editorial layouts; operations consoles need dense data tables. One shared library degrades both into color-swapped generics.
2. **Blast radius**: with several products on one package, changing a button's padding means retesting every downstream app. Primitives stop being refactored and the system stagnates.
3. **Promotion bureaucracy**: domain-specific components (a ticket workflow card, an SLA countdown) rarely help other products, so cross-repo review adds cost without reuse, and developers escape through inline styles.
4. **Lost independence**: a business unit that needs to evolve or spin out inherits refactoring costs from the shared package.

This template takes a different trade: shared engineering standards, decoupled implementations.

- Each brand or application owns its UI code and tokens. Primitives live alongside the product and evolve without waiting for an upstream release cycle.
- Engineering standards and tooling stay shared: token naming, OKLCH color math, single-knob radius mathematics, the hard gate scripts, and the living workshop.

### 5.2 OKLCH color

The system standardizes on the OKLCH color space (`oklch(L C H)`), built on the CIE Oklab standard:

- **Perceptual Uniformity**: In traditional HSL, setting Lightness to 50% yields wildly different perceptual brightness across hues (at the same nominal lightness, yellow renders far brighter than blue). OKLCH's Lightness (L), Chroma (C), and Hue (H) channels are orthogonal. Changing the hue preserves identical perceived brightness.
- **Mathematical Contrast Derivation**: Using L channel values, accessible foreground and background pairs can be calculated deterministically without manual trial and error across light and dark themes.
- **P3 Wide-Gamut Display Support**: OKLCH addresses wide-gamut Liquid Retina and OLED displays, delivering vibrant state accents while keeping dark-mode surfaces rich rather than washed out.

### 5.3 Contrast

Contrast standards balance current legal compliance with modern perceptual research:

1. **WCAG 2.1 AA (Statutory Requirement)**:
   - Relative luminance formula: `(L1 + 0.05) / (L2 + 0.05)`.
   - Body text (< 18pt / 24px, or < 14pt bold): minimum **≥ 4.5:1**.
   - Large text (≥ 18pt / 24px) and essential graphical UI controls: minimum **≥ 3.0:1**.
   - All status colors, badge text, and body tokens in this template are mathematically verified to satisfy WCAG 2.1 AA.
2. **APCA (Accessible Perceptual Contrast Algorithm, WCAG 3.0 Candidate)**:
   - Accounts for polarity asymmetry (white-on-black text spreads differently on human retinas compared to black-on-white text) and spatial frequency.
   - Recommended target: body text maintains `Lc ≥ 60 to 75`, secondary explanatory copy maintains `Lc ≥ 45`.
3. **Automated Verification**:
   Storybook integrates `@storybook/addon-a11y` (powered by axe-core), while `scripts/check-a11y-wcag.mjs` runs mathematical checks and DOM audits locally and in CI.

### 5.4 Lessons from the Google design CLI

The `@google/design.md` CLI demonstrated that plain-text Markdown can serve as a machine-readable design specification. We drew two insights from this work:

1. **Design Specifications as Machine-Readable Contracts**: Writing principles, color tokens, and layout constraints in structured Markdown gives AI coding assistants an explicit boundary, suppressing unprompted deviations.
2. **Automated Semantic Diffing**: Changes to design systems should be checked for regressions automatically. Code introducing accessibility violations or orphaned styles should fail CI immediately.

This template applies both in a lightweight form: this README is the human and AI contract, and `scripts/check-token-gates.mjs` enforces it without a compiler toolchain.

### 5.5 Engineering decisions

Four standing engineering decisions:

#### 1. Iconography Dependency Standard
- The design system designates `lucide-react` as its standard atomic icon infrastructure. It must not be removed.
- All interactive primitives (Buttons, Dialogs, Selects, Theme Toggles, Status Icons) utilize Lucide icons to maintain visual consistency across weights, stroke terminals, and accessibility tags.

#### 2. Ecosystem Brand Vector Assets Standard
- The design system maintains a curated, verified library of 120+ authentic developer and SaaS service vector SVGs under `public/brands/apps/`, backed by `manifest.json`.
- This standardizes third-party OAuth logins, integration hubs, and webhook targets across products, preventing teams from downloading mismatched, insecure logos from public websites.

#### 3. Local Font Autonomy Decision
- The design system packages `InterVariable.woff2` locally, completely eliminating external Google Fonts or Adobe Typekit CDN links.
- Local static fonts guarantee air-gapped deployment readiness, eliminate font flicker (zero FOIT and zero FOUT), and provide deterministic pixel rendering baselines in automated visual regression tests.

#### Flat single package
- The design system operates as a unified, root-level package rather than a nested sub-directory structure.
- This flattened layout eliminates path resolution overhead in build scripts, allowing the directory to function as a standalone repository or as an isolated workspace package inside a monorepo.

---

## 6. Constraints

Text alone does not constrain AI assistants reliably, so quality is enforced through three tiers: Tier 1 is the rules and negative patterns in this document, Tier 2 is the operational guardrails in `AGENTS.md`, and Tier 3 is the automated gate scripts (token gates, brand vector anti-XSS, Vitest, WCAG 2.1 AA / a11y audits, Playwright visual snapshots).

### 6.1 Tier 1: this README

This document establishes foundational constraints and negative patterns:
- One way to express each scenario: do not duplicate components for minor styling variations.
- No gratuitous linear gradients, heavy glassmorphism, or blurry drop shadows.
- Density serves fast scanning; whitespace serves information hierarchy. Every border, divider, and surface fill must serve a functional layout purpose.

### 6.2 Tier 2: AGENTS.md

Explicit operational rules for AI assistants:
- Always inspect existing primitives in `src/components/ui/` and Storybook before creating new UI elements.
- Never invent new Button or Card variants in business pages; compose existing `variant` and `size` attributes.
- Never write hardcoded color literals or arbitrary bracket classes in component JSX.

### 6.3 Tier 3: gate scripts

All code, whether authored by humans or generated by AI, must pass automated hard gates during pre-commit and CI:

#### Token gates

The gate script performs static AST analysis across all TSX files in `src/components/**` and `src/app/**`:

| Gate | Check & Rule | Blocked Pattern | Compliant Standard |
| :--- | :--- | :--- | :--- |
| **Gate 1** | **Zero Hardcoded Color Literals**<br>Forbids hex colors and raw numeric arguments in rgb/rgba/hsl/oklch functions within JSX. | `color: "#ffffff"`<br>`className="bg-[#18181b]"`<br>`rgba(0, 0, 0, 0.5)` | `className="bg-background text-foreground"`<br>`className="text-primary"` |
| **Gate 2** | **Zero Value-Bearing Arbitrary Brackets**<br>Bans ad-hoc sizes, margins, paddings, and radii in Tailwind brackets. | `p-[13px]`<br>`w-[320px]`<br>`rounded-[7px]` | `p-3` (standard scale)<br>`w-80` or `max-w-md`<br>`rounded-md` (derived radius) |
| **Gate 3** | **Zero Raw Font-Size Declarations**<br>Bans custom font sizes in classes and inline styles. | `text-[13px]`<br>`style={{ fontSize: "14px" }}` | `text-xs`, `text-sm`, `text-base` |
| **Gate 4** | **Zero Legacy HSL Wrappers**<br>Forbids wrapping modern OKLCH tokens in legacy `hsl()`. | `hsl(var(--primary))` | `var(--primary)` |

**Allowlist Rules**:
- Conditional state selectors (e.g. `data-[state=open]:opacity-100`, `aria-[checked=true]:bg-primary`, `max-[480px]:hidden`) are state predicates and are fully permitted.
- Third-party library overrides must be registered in `src/index.css` under the `/* ── ALLOWLIST ── */` section with explicit paths and technical rationales (`* allow <path> — <reason>`). Unregistered overrides trigger build errors.

#### Brand asset security

Performs security and structural audits across all third-party vector SVGs in `public/brands/apps/`:
- Enforces valid `viewBox` coordinates or intrinsic dimensions.
- Rejects potential XSS vectors: `<script>`, `<foreignObject>`, `<iframe|object|embed>`, `onload=`, and `javascript:` URIs.
- Blocks external network `@import` references and un-embedded external image links, ensuring 100% offline air-gapped safety.

#### Unit tests

The template configures a headless DOM test suite via `vitest.config.ts` and `vitest.setup.ts`:
- **Command**: `bun run test` or `npm run test`.
- **Environment**: Happy-DOM / JSDOM with pre-configured `ResizeObserver`, `matchMedia`, and DOM stubs.
- **Coverage**: 12 test suites, 59 tests.
  - **Context State Machines**: covers `ThemeContext` (theme toggling and local storage persistence), `DialogContext` (modal stack management), `ToastContext` (toast notification lifecycles and timeouts), `SidebarContext` (desktop navigation and mobile drawer toggles), and `BreadcrumbContext` (route hierarchy tracking and document title derivation).
  - **Interactive Primitives**: Behavioral assertions for `ThemeToggle` (click and keyboard triggers), `ToggleSwitch` (accessibility states and debounce protection), `StatusBadge`, `StatusGlyph`, and `StatusIcon` (severity level styling and hover popover rendering).
  - **Custom Hooks and Utilities**: Verification for `useSecondTick` (high-precision second ticks), `usePrefersReducedMotion` (system motion preference listeners), and `timeAgo` / `formatDateTime` date helpers.
- **Engineering Role**: Serves as a millisecond-fast regression barrier, verifying state transitions and event callbacks during package refactoring and dependency upgrades.

#### Accessibility gate

Executes a three-in-one accessibility gate during component maintenance and CI:
- **Token Contrast Mathematics**: Extracts all semantic foreground and background pairs in light and dark modes (`foreground`/`background`, `card`, `popover`, `primary`, `secondary`, `muted`, `destructive`, `sidebar`) and status glyphs, calculating WCAG 2.1 AA contrast ratios ($\ge 4.5:1$ text, $\ge 3.0:1$ graphics) and APCA $L_c$ perceptual scores.
- **Static AST Anti-Pattern Audit**: Scans all UI components, verifying that `<img>` tags declare `alt` text, non-interactive elements with `onClick` declare `role` and keyboard focus handlers, and icon-only buttons include accessible text or `aria-label`.
- **Headless DOM Audit**: Evaluates rendered component trees against WCAG 2.1 A and AA rules using JSDOM and axe-core.

#### Visual regression

- Runs automated screenshots using Playwright headless Chromium.
- Enforces `reducedMotion: "reduce"` and disables CSS animations (`animations: "disabled"`).
- Hides blinking carets (`caret: "hide"`).
- Strict tolerance: **Zero visual drift (`maxDiffPixels: 0`)**. Unintended layout shifts fail the build immediately.

---

## 7. Design

### 7.1 Tokens

All tokens are declared in `src/index.css` across four structured tiers:

1. **Semantic Tier**:
   Pairs foreground and background tokens in OKLCH, flipping automatically across light and dark modes:
   - Canvas: `--background` / `--foreground`
   - Card surfaces: `--card` / `--card-foreground`
   - Popovers and dialogs: `--popover` / `--popover-foreground`
   - Actions: `--primary` / `--primary-foreground`, `--secondary` / `--secondary-foreground`
   - Explanatory and destructive states: `--muted` / `--muted-foreground`, `--destructive` / `--destructive-foreground`
   - Control boundaries: `--border`, `--input`, `--ring`
2. **Status Tier**:
   Lifecycle and severity tokens:
   - In-progress / active: `--status-task-todo` or semantic blue (`#2563eb`)
   - Completed / success: `--status-task-done` (green palette)
   - Blocked / failed: `--status-task-blocked` (red palette)
3. **Domain & Brand Tier**:
   Specialized tokens, including syntax highlighting backgrounds and data chips.
4. **Motion Tier**:
   Declared in `src/motion-tokens.css`, defining physical durations, easing curves, and scoped animation tokens.

### 7.2 Radius

To eliminate optical disharmony where nested buttons appear rounder than their container cards, the system uses a single-knob multiplicative radius scale:

$$\text{Target Radius} = \text{Anchor Knob} \times \text{Multiplier}$$

```css
:root {
  --radius: 0.5rem; /* Primary control knob (8px) */
}

@theme inline {
  --radius-sm:  calc(var(--radius) * 0.6);  /* ~4.8px : micro chips, small badges */
  --radius-md:  calc(var(--radius) * 0.8);  /* ~6.4px : input controls, default buttons */
  --radius-lg:  var(--radius);              /*  8.0px : base container cards (Anchor) */
  --radius-xl:  calc(var(--radius) * 1.4);  /* 11.2px : sheets, modal dialogs */
  --radius-2xl: calc(var(--radius) * 1.8);  /* 14.4px : large dashboard panels */
  --radius-3xl: calc(var(--radius) * 2.2);  /* 17.6px */
  --radius-4xl: calc(var(--radius) * 2.6);  /* 20.8px */
}
```

- **Global Calibration**: Updating `--radius` once recalculates buttons, inputs, cards, and modal dialogs in geometric proportion.
- **Concentric Geometry**: Nested controls (`md`, 6.4px) remain tighter than outer container cards (`lg`, 8.0px), creating natural visual nesting.

### 7.3 Dual-mode cards

The `Card` primitive supports two distinct usage patterns:

- **Static Container Mode (Default Mode)**:
  Declared with `variant="default"`. Provides a clean background and subtle border (`bg-card text-card-foreground border border-border`). Groups related content without hover scaling or elevation shifts, preventing visual clutter.
- **Interactive Container Mode (Interactive Mode)**:
  Declared with `variant="interactive"`. Converts the card into a clickable surface: cursor becomes `cursor-pointer`, border smoothly shifts to `border-foreground/20` on hover, and the element responds with subtle elevation and focus rings.

### 7.4 Status

Status presentation follows two rules:

1. **Five Canonical Lifecycle Phases**:
   - `success`: Green palette. Indicates smooth completion or healthy service operations.
   - `error`: Red palette. Indicates execution failures, missing credentials, or required human intervention.
   - `warning`: Yellow / amber palette. Indicates threshold capacity, pending approvals, or non-fatal risks.
   - `pending`: Blue / violet palette. Indicates queued tasks or in-flight background processing.
   - `idle`: Neutral slate palette. Indicates tasks not yet started or archived resources.
2. **Non-Color Dependence**:
   Status information must never rely solely on color. Users with color vision deficiencies cannot differentiate states by hue alone. All status presentations combine color with geometric micro-glyphs and text:
   - Geometric micro-glyphs: `StatusGlyph` renders solid discs, checkmarks, clock icons, warning triangles, or obstruction bars.
   - Text labels: Critical statuses declare explicit text via `StatusBadge`, allowing screen readers and visually impaired users to recognize states unambiguously.

### 7.5 Typography

Dense enterprise interfaces need a typeface that holds up under high information density, fast scanning, and air-gapped deployment. This system standardizes on Inter Variable, hosted locally.

#### WOFF2 and variable fonts

- **WOFF2 Compression**:
  WOFF2 (Web Open Font Format 2.0) is the W3C recommended web font standard. Utilizing Google Brotli compression, WOFF2 reduces file sizes by **over 70%** compared to TTF/OTF, and **30% to 50%** compared to WOFF 1.0. Modern browsers (Chrome, Safari, Firefox, Edge, iOS Safari, Android WebKit) deliver **>99.8% support**, eliminating the need for legacy TTF/EOT fallbacks.
- **Variable Fonts vs Static Slices**:

| Dimension | Legacy Static Slices | Variable Fonts (This Template) |
| :--- | :--- | :--- |
| **File Count** | 5 to 9 separate files (Thin, Regular, Medium, SemiBold, Bold) | **Single file** (`InterVariable.woff2`) |
| **HTTP Requests** | 5 to 9 parallel or sequential requests | **1 request** |
| **Total Transfer** | 1.2MB to 2.5MB total size | **~350KB** covering all weights |
| **Weight Range** | Discrete steps (400, 500, 600, 700) | **Continuous interpolation**: `font-weight: 100` through `900` |
| **Raster Smoothing** | Hard-coded glyph outlines | Real-time variation axis interpolation |

#### Source and licensing

- **Upstream Source**:
  Created by Rasmus Andersson (former Design Director at Spotify and early systems designer at Figma), Inter was built for computer displays, high-density data tables, and mixed code reading. Andersson engineered optical kerning, tall x-height, and character distinction (differentiating `0` vs `O`, `1` vs `l`, and uppercase `I`). Inter is deployed as the screen standard by Figma, GitHub, Vercel, Linear, Raycast, and Stripe. We pin upstream version **v4.1** (`https://github.com/rsms/inter`).
- **Open Source Licensing**:
  Licensed under the **SIL Open Font License 1.1 (OFL)** (see `public/fonts/NOTICE.md`). It permits commercial deployment, royalty-free bundling in open source or proprietary software, and offline distribution without recurring fees.

#### Four typography rules

1. **Rule 1: Zero External Network Dependencies (Air-Gapped Ready)**:
   No component, stylesheet, or HTML entry point may issue requests to external font CDNs (`fonts.googleapis.com` or `fonts.gstatic.com`). The interface renders reliably in air-gapped private clouds, corporate intranets, and offline environments.
2. **Rule 2: Zero FOIT & Zero FOUT**:
   - FOIT (Flash of Invisible Text): Browsers hide text while waiting for external font CDNs, blocking readability.
   - FOUT (Flash of Unstyled Text): Slow CDN responses cause pages to render fallback fonts and jump when external fonts load, triggering Cumulative Layout Shift (CLS).
   - Solution: Same-origin static hosting with `font-display: swap`. Because assets are served from the local origin, TTFB is minimal, eliminating layout jitter.
3. **Rule 3: Deterministic Visual Regression Baselines**:
   Visual regression tests (Playwright snapshot comparisons) enforce `maxDiffPixels: 0`. External font CDNs introduce network latency variations that cause headless Chromium to capture fallback fonts intermittently, triggering flaky test runs. Bundled `InterVariable.woff2` ensures identical anti-aliasing rasterization across local laptops, Docker containers, and GitHub Actions runners.
4. **Rule 4: Immutable Typography Geometry**:
   Public CDNs can silently push minor font revisions that alter glyph bounding boxes or kerning pairs, causing unexpected line wraps in dense dashboards. Pinning local v4.1 SHA-256 binaries preserves layout geometry throughout the product lifecycle.

#### CSS integration

- **`@font-face` Declarations**:
  Declared in `src/index.css`:
  ```css
  @font-face {
    font-family: "InterVariable";
    src: url("/fonts/InterVariable.woff2") format("woff2");
    font-display: swap;
    font-style: normal;
    font-weight: 100 900;
  }

  @font-face {
    font-family: "InterVariable";
    src: url("/fonts/InterVariable-Italic.woff2") format("woff2");
    font-display: swap;
    font-style: italic;
    font-weight: 100 900;
  }
  ```
- **Tailwind CSS v4 Token Registration**:
  Mapped inside `@theme inline`:
  ```css
  @theme inline {
    --font-sans: "InterVariable", "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }
  ```
- **Semantic Weight Conventions**:
  - `font-normal` (400): Body copy and dense table cells.
  - `font-medium` (500): Subheaders, form input text, field labels.
  - `font-semibold` (600): Card headings, action buttons, badge text.
  - `font-bold` (700): Hero statistics, KPI metrics, primary console headers.
  - Raw pixel sizing (`text-[13px]`, `style={{ fontSize: "14px" }}`) is prohibited. Always use standard font-size tokens (`text-xs`, `text-sm`, `text-base`, `text-lg`).
- **Production Preloading**:
  Add preloading directives to the `<head>` of your host HTML (`index.html` or Next.js `layout.tsx`):
  ```html
  <link
    rel="preload"
    href="/fonts/InterVariable.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  ```

### 7.6 Motion

Motion tokens are declared in `src/motion-tokens.css`:

- **Runtime Mutation via `:root`**: Motion tokens reside in `:root` as native CSS custom properties rather than static utility classes, allowing developers to tune animation durations and easing curves dynamically in developer tools.
- **Global Reduced-Motion Fallback**: Configured with `@media (prefers-reduced-motion: reduce)`. When users enable reduced motion in their operating systems, animation durations and delays collapse to zero globally, preventing vestibular discomfort.

### 7.7 Atomicity

- **Single Responsibility**: Each scenario has one canonical primitive (one Button, one Card, one Dialog, one Table, one EmptyState).
- **Variant Attribution**: Visual variations and sizes are parameterized through `class-variance-authority` (cva). Deriving duplicate components for small visual tweaks is prohibited.

### 7.8 i18n

The component library architecture is completely i18n-ready out of the box. It does not force an external translation framework, but provides three structural mechanisms that guarantee zero-overhead localization:

1. **CSS Logical Properties and RTL Layouts (Right-to-Left Ready)**:
   - Physical direction properties (`pl-*`, `pr-*`, `ml-*`, `mr-*`, `left-*`, `right-*`, `border-l`, `border-r`) are completely replaced with CSS logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `border-s`, `border-e`).
   - When a host application sets `<html dir="rtl">` (e.g. for Arabic, Hebrew, or Persian), drawer slide directions, modal close buttons, dropdown check slots, and control paddings mirror automatically. Nested menu chevrons mirror via `rtl:rotate-180` without custom styling.
2. **Intrinsic Sizing & Text Expansion Tolerance (Anti-Truncation)**:
   - Languages like German and Russian often require 30% to 50% more horizontal space than English.
   - Primitives utilize intrinsic sizing, flexbox stretching, and `min-w-0` overflow management. Hardcoding fixed pixel widths on buttons, badges, or menu items (`w-[120px]`) is prohibited and blocked by Gate 2.
3. **Parametric Microcopy & Zero Business Coupling**:
   - Primitives contain zero hardcoded user-facing strings.
   - All text is passed through props or `children` (such as `title`, `message`, and `action` in `EmptyState`).
   - Essential built-in microcopy (such as screen reader announcements on modal close buttons) can be overridden via props, integrating with `next-intl`, `react-i18next`, or standalone localization packages.
