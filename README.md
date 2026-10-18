# Design System Starter Template

This is a design system starter template built to stop AI assistants from degrading UI quality during automated coding. Use it as the frontend foundation for a new product, or as an isolated design system workspace inside an enterprise monorepo.

The template makes Tailwind CSS v4 the single source of truth for design tokens. It ships the full shadcn/ui registry plus a template extension layer, an air-gapped local variable font, an OKLCH color system, a single-knob radius scale, and an automated gate pipeline enforced locally and in CI.

The repository is self-contained: architectural principles, design tokens, typography specifications, and quality gate standards are all defined in this document.

## 1. Motivation

With AI coding assistants such as Cursor, Claude Code, and GitHub Copilot writing frontend code, UI quality deteriorates rapidly across iterations. The cause is that large language models lack persistent spatial awareness and long-term memory; they optimize for local token probabilities. Common failure modes:

1. **Color drift**: models introduce raw hex literals (`#3b82f6`, `#18181b`) or ad-hoc `rgba(...)` calls. These bypass theme variables, break dark mode, and let primary colors and background tints diverge across pages.
2. **Arbitrary bracket proliferation**: to nudge a card into place or align table items, models emit arbitrary Tailwind classes (`w-[347px]`, `p-[13px]`, `rounded-[11px]`, `text-[13px]`). This destroys the 4px/8px spacing rhythm and produces mismatched proportions.
3. **Low-density template stacking (AI slop)**: nested cards, diffuse blur backdrops, glowing borders, and excessive whitespace. In command consoles, ticket boards, and dense data tables this slows scanning and wastes screen space.
4. **Paper specifications do not constrain code**: design rules written in Figma, PDFs, or wikis do not stop an AI assistant. Rules hold only when mechanical gates block non-compliant code from merging.

The template counters with two mechanisms:

- **Tailwind CSS v4 as the single source of truth (code as design)**: there is no intermediate token pipeline. All tokens are declared directly in `src/index.css` via native CSS custom properties and `@theme inline`, so the code is the design specification.
- **Automated hard gates**: `scripts/check-token-gates.mjs` and related audits run in pre-commit and CI. A hardcoded color, an arbitrary bracket, or an untokenized font size halts the build with actionable errors.

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
│   │   ├── use-mobile.ts                          # Breakpoint detection (sidebar primitive dependency)
│   │   ├── usePrefersReducedMotion.ts             # System reduced motion preference listener
│   │   └── useSecondTick.ts                       # Shared one-second tick generator
│   ├── lib/
│   │   ├── utils.ts                               # cn() class merging (clsx + tailwind-merge) and date formatting
│   │   ├── status-colors.ts                       # Status color dictionaries and demo palettes
│   │   ├── color-contrast.ts                      # WCAG AA contrast ratio helpers
│   │   ├── use-copy-action.ts                     # Clipboard copy interaction hook
│   │   └── timeAgo.ts                             # Relative time formatter
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
└── .github/workflows/                             # GitHub Actions: CI, release, weekly shadcn sync
```

### Registry components

`src/components/ui/` contains the full shadcn/ui registry, injected with the official CLI: 60+ primitives covering accordion, chart, sidebar, calendar, carousel, sonner, form primitives, and the agentic `message` / `bubble` / `attachment` building blocks. `components.json` pins the `new-york` style on Tailwind v4, so `npx shadcn@latest add <component>` adds or updates any of them. 26 files carry a template extension layer (divergences under [Quality gates](#5-quality-gates)); the rest are stock upstream files.

The library is layered; only the top layer is Paperclip-specific.

| Layer | Location | What it is | Relationship to shadcn/ui |
| :--- | :--- | :--- | :--- |
| 1. Atomic primitives | `src/components/ui/` | Full shadcn/ui registry, CLI-injected | Stock shadcn/ui `new-york` (Tailwind v4) code, managed through `components.json` |
| 2. Primitive extensions | 26 of the same files | Additive variants: Button `cta` / `xs` / `icon-*` sizes, Card `interactive`, Avatar sizes + group, Select `sm`, Tabs `line`, Badge `ghost` / `link` | Additive props on the stock API; no stock variant was removed or reshaped |
| 3. Template components | `src/components/*.tsx` | `EmptyState`, `InlineBanner`, `ThemeToggle`, `ToastViewport`, `RadioCard`, `ToggleSwitch`, `ResizablePanels` | Not in the shadcn registry; built from tokens and Layer-1 primitives |
| 4. Status language | `src/components/Status*.tsx` + `src/lib/status-colors.ts` | `StatusBadge`, `StatusGlyph`, `StatusIcon` + the status palette | Paperclip-specific domain vocabulary (task lifecycle, agent heartbeat, run / goal / approval outcomes). Flat files; delete them if your product does not need it |

The agentic-interface primitives (`message`, `message-scroller`, `bubble`, `attachment`, `spinner`, `item`, `kbd`, `empty`) ship as part of the injection. They are presentational: plain props and callbacks, no Vercel AI SDK imports. The higher-level ai-elements patterns (plan, tool, chain-of-thought, …) are officially copy-paste compositions and are deliberately not vendored, so that `ui/` stays fully CLI-managed and machine-updatable.

### Weekly updates

`.github/workflows/shadcn-sync.yml` re-injects every component tracked in `scripts/shadcn-components.txt` every Monday with `shadcn add --overwrite`, and opens a sync PR when upstream moved. Dependabot covers the npm packages the components installed; this workflow covers the vendored source files, which Dependabot cannot see.

A sync cannot break application code for two reasons. First, the primitives keep a fixed API surface (exports, props, `data-slot` attributes, cva variants), so code written against `Button` or `Dialog` survives an overwrite. Second, the token gates do not scan `ui/`, so upstream's class conventions never fail a check; CI still runs the a11y gates and the test suite on every sync PR.

One caveat: an overwrite reverts the 26 extended files to stock. The sync PR diff shows exactly which files were touched, and the re-apply list is `button.tsx`, `badge.tsx`, `card.tsx`, `avatar.tsx`, `select.tsx`, `tabs.tsx`, `alert-dialog.tsx`, `dialog.tsx`, `sheet.tsx`, `command.tsx`. Adopting a newly published component is one command plus one line in the tracked list.

The extended files diverge from upstream in three documented ways:

- Values are tokenized: `ring-[3px]` becomes `ring-(length:--rad-3)`, `transition-[color,box-shadow]` becomes `transition-(--tp-color-box-shadow)`, and geometry resolves through `src/index.css` tokens (`top-(--pct-50)`, `max-w-(--sz-calc-25)`). Class order may differ from upstream; the API does not.
- Physical directions are replaced with logical RTL properties (`ps-8`, `pe-2`, `start-2`, `end-2`), per the i18n pass.
- Interactive surfaces carry explicit `motion-reduce:` fallbacks and mobile-safe typography (`text-base md:text-sm` on editable controls).

### The Radix UI rule

Template-authored interactive components build on the `radix-ui` package or compose `ui/` primitives. Do not introduce a second headless base (Base UI, React Aria) into template code: one focus and keyboard model per product is what keeps dialog focus management, menu keyboard maps, and screen-reader output consistent across surfaces.

The vendored registry follows upstream wherever upstream went. 36 files import `radix-ui`; one (`combobox.tsx`) uses Base UI because upstream chose it for that pattern. The exception ships because `ui/` tracks upstream file-for-file. It is not a pattern to copy into template code.

### Directories

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

### The brand guide

`src/app/brand/page.tsx` is both the showcase and the reference implementation. Every primitive in `ui/`, every template component, the status language, and every utility in `lib/` has a working demo there, written the way application code should be written: composition over `ui/` primitives, tokens everywhere, no hardcoded values. When you add a component to the template, add its demo to the brand guide in the same change; when a file cannot earn a demo, question whether it belongs in the template.

## 3. Usage

### Quick start

Run the wizard without arguments:

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

1. **Template mode**: `Standalone Application (Next.js / Vite)` or `Monorepo Shared Package`.
2. **Destination path**: standalone mode creates `./design-system` (or your custom directory); package mode creates `packages/design-system`.
3. **Package manager** (standalone only): `bun`, `pnpm`, `npm`, or `yarn`. Package mode reuses the monorepo's package manager.

Or pass everything as flags:

```bash
# Standalone application (automatically creates <dir>/design-system)
bun create design-system-template -p <dir> --mode standalone --pm bun

# Custom project name
bun create design-system-template -n <project-name> --mode standalone --pm bun

# Monorepo shared package (automatically creates packages/design-system)
bun create design-system-template -p packages --mode package
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

### Scenario: standalone application

1. Scaffold: `bun create design-system-template -p <dir> --mode standalone --pm bun`
2. Preview: `cd design-system && bun run dev`, then open `http://localhost:5173`. The brand guide demos every registry primitive, the OKLCH palettes, status badges, form controls, and card modes.
3. Customize brand tokens per [4.1 Brand customization](#brand-customization).
4. Add application routes under `src/app/` (App Router convention; the shipped brand guide lives at `src/app/brand/page.tsx`), consuming primitives directly from `src/components/ui/`.

### Scenario: monorepo package

1. Scaffold inside the monorepo root: `bun create design-system-template -p packages --mode package`. The CLI sets `"name"` in `package.json` to `@repo/design-system` (or `@repo/<folder-basename>`).
2. The generated `package.json` exposes standardized exports:

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

3. Consume from applications:

```css
@import "@repo/design-system/styles.css";
```

```tsx
import { Button } from "@repo/design-system/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/design-system/components/ui/card";
import { ThemeToggle } from "@repo/design-system/components/ThemeToggle";
```

## 4. Build and release

### Brand customization

Brand identity is controlled through two knobs, without touching component JSX:

1. **Color (OKLCH)**: update the OKLCH values for `--primary`, `--accent`, and related variables in the `:root` and `.dark` blocks of `src/index.css`. All components pick up the change automatically.
2. **Geometry (single-knob radius)**: adjust `--radius` in `src/index.css`:
   - Rigid industrial or developer console aesthetic: `--radius: 0rem;`
   - Compact professional tool aesthetic (default): `--radius: 0.5rem;`
   - Soft consumer SaaS aesthetic: `--radius: 0.75rem;`

   Every button, input, card, dialog, and nested container recalculates in proportion and stays concentric: nested controls keep tighter radii than their containers.

### Commands

```bash
# Local brand guide workshop (http://localhost:5173)
bun run dev

# Production application bundle
bun run build

# Storybook 10 workshop (http://localhost:6006) and static build
bun run storybook
bun run build-storybook

# Quality gates
bun run check:tokens   # Gates 1-4: zero hex colors, zero value brackets, zero raw font-size
bun run check:brand    # Brand SVG asset security and manifest validation
bun run check:a11y     # WCAG 2.1 AA contrast math, a11y static scan, axe-core DOM audit
bun run check          # All of the above in sequence

# Tests and types
bun run test           # Vitest unit tests
bun run typecheck      # TypeScript strict verification

# Release operations
bun run build:cli          # Build the CLI distribution bundle
bun run changeset          # Create a changeset version entry
bun run version-packages   # Bump versions and update CHANGELOG.md
bun run release            # Tag the release commit
bun run clean              # Remove build artifacts and caches
```

### Release automation

`.github/workflows/release.yml` builds the template and CLI on every push to `main`. The changesets action opens a Version Packages PR from pending changesets; merging it bumps versions, updates `CHANGELOG.md`, and tags the release. Independently, `create-design-system-template` publishes to npm with provenance whenever `cli/package.json` version is ahead of the published version.

## 5. Quality gates

All code, whether authored by humans or generated by AI, passes these gates in pre-commit and CI.

### Token gates

`scripts/check-token-gates.mjs` performs static analysis across `src/components/**` and `src/app/**`:

| Gate | Check | Blocked pattern | Compliant form |
| :--- | :--- | :--- | :--- |
| **Gate 1** | Zero hardcoded color literals (hex, raw `rgb/rgba/hsl/oklch` channels) | `color: "#ffffff"`, `bg-[#18181b]`, `rgba(0, 0, 0, 0.5)` | `bg-background text-foreground`, `text-primary` |
| **Gate 2** | Zero value-bearing arbitrary brackets (sizes, margins, paddings, radii) | `p-[13px]`, `w-[320px]`, `rounded-[7px]` | `p-3`, `w-80` / `max-w-md`, `rounded-md` |
| **Gate 3** | Zero raw font-size declarations | `text-[13px]`, `style={{ fontSize: "14px" }}` | `text-xs`, `text-sm`, `text-base` |
| **Gate 4** | Zero legacy HSL wrappers around OKLCH tokens | `hsl(var(--primary))` | `var(--primary)` |

Allowlist rules: state selectors (`data-[state=open]:opacity-100`, `aria-[checked=true]:bg-primary`, `max-[480px]:hidden`) are predicates and fully permitted. Third-party overrides must be registered in `src/index.css` under the `/* ── ALLOWLIST ── */` section with explicit paths and rationales (`* allow <path> — <reason>`); unregistered overrides fail the build.

### Brand asset security

`scripts/app-brand-validation.mjs` audits every third-party SVG in `public/brands/apps/`: valid `viewBox` or intrinsic dimensions, and rejection of XSS vectors (`<script>`, `<foreignObject>`, `<iframe|object|embed>`, `onload=`, `javascript:` URIs) plus external `@import` or un-embedded image references, so the library is fully safe offline.

### Accessibility

The gate is three checks in one (`scripts/check-a11y-wcag.mjs`):

- **Token contrast mathematics**: extracts every semantic foreground/background pair in light and dark modes (`foreground`/`background`, `card`, `popover`, `primary`, `secondary`, `muted`, `destructive`, `sidebar`) plus status glyphs, and computes WCAG 2.1 AA ratios (≥ 4.5:1 text, ≥ 3.0:1 graphics) and APCA Lc scores.
- **Static anti-pattern scan**: every component file is checked for `<img>` without `alt`, clickable non-interactive elements without `role` and keyboard handlers, and icon-only buttons without accessible text or `aria-label`.
- **Headless DOM audit**: rendered component trees are evaluated against WCAG 2.1 A and AA rules with JSDOM and axe-core.

The template's accessibility standard is behavior-first, inherited from shadcn/ui. The headless primitives own the hard parts: focus trapping in dialogs and focus return to the trigger, roving tabindex and typeahead in menus, ARIA wiring (`DialogTitle` becomes `aria-labelledby`, `DialogDescription` becomes `aria-describedby`), `aria-expanded` and `aria-haspopup` on triggers, and live regions for toasts. The shadcn layer adds consistent conventions: a `focus-visible:ring` driven by the `--ring` token, `aria-invalid:` styling hooks, and `data-state` attributes so state styling cannot drift from semantic state. Application code composes `ui/` primitives and never reimplements interaction; the gates verify the composed result. The full registry passes with zero violations, and a weekly sync that introduces a regression fails CI on the sync PR.

Contrast targets: WCAG 2.1 AA relative luminance `(L1 + 0.05) / (L2 + 0.05)` with ≥ 4.5:1 for body text below 18pt (24px, or 14pt bold) and ≥ 3.0:1 for large text and essential graphics; APCA (WCAG 3.0 candidate) targets of `Lc ≥ 60 to 75` for body text and `Lc ≥ 45` for secondary copy, accounting for polarity asymmetry and spatial frequency. Verification is automated in Storybook (`@storybook/addon-a11y`) and in this gate.

### Unit tests

Vitest with JSDOM (`vitest.config.ts`, `vitest.setup.ts`): 12 suites, 59 tests, covering the context state machines (`Theme`, `Dialog`, `Toast`, `Sidebar`, `Breadcrumb`), interactive components (`ThemeToggle`, `ToggleSwitch`, `StatusBadge`, `StatusGlyph`, `StatusIcon`), and the hooks and utilities (`useSecondTick`, `usePrefersReducedMotion`, `timeAgo`, `formatDateTime`).

### Visual regression

`tests/storybook-visual/` screenshots Storybook stories with headless Playwright Chromium under `reducedMotion: "reduce"`, disabled animations, and hidden carets, with `maxDiffPixels: 0`. Any unintended layout shift fails the build.

## 6. Architecture decisions

### No shared component package

A common pattern is a centralized multi-brand npm package (`@org/design-tokens`, `@org/ui`) that every application installs as an upstream dependency. Sub-applications may only override CSS variables, and new components need a multi-team review.

In production this pattern fails in four ways:

1. **Variable overrides cannot express brand differences**: brand identity lives in information density, layout geometry, whitespace rhythm, and domain-specific interaction. Marketing sites need editorial layouts; operations consoles need dense data tables. One shared library degrades both into color-swapped generics.
2. **Blast radius**: with several products on one package, changing a button's padding means retesting every downstream app. Primitives stop being refactored and the system stagnates.
3. **Promotion bureaucracy**: domain-specific components (a ticket workflow card, an SLA countdown) rarely help other products, so cross-repo review adds cost without reuse, and developers escape through inline styles.
4. **Lost independence**: a business unit that needs to evolve or spin out inherits refactoring costs from the shared package.

This template takes a different trade: shared engineering standards, decoupled implementations. Each brand or application owns its UI code and tokens, and evolves them without waiting for an upstream release cycle. What stays shared is the tooling: token naming, OKLCH color math, radius mathematics, the gate scripts, and the living workshop.

### OKLCH color

The system standardizes on the OKLCH color space (`oklch(L C H)`), built on the CIE Oklab standard, for three reasons:

- **Perceptual uniformity**: in HSL, the same lightness value renders as very different perceived brightness across hues. OKLCH's L, C, and H channels are orthogonal, so changing hue preserves perceived brightness.
- **Mathematical contrast derivation**: accessible foreground/background pairs are computed from the L channel deterministically, without trial and error across themes.
- **Wide-gamut support**: OKLCH addresses P3 displays, keeping state accents vivid and dark-mode surfaces rich.

### Typography

Dense enterprise interfaces need a typeface that holds up under high information density, fast scanning, and air-gapped deployment. The system standardizes on Inter Variable v4.1 (Rasmus Andersson), pinned locally under the SIL Open Font License 1.1 (`public/fonts/NOTICE.md`).

| Dimension | Static font slices | Variable font (this template) |
| :--- | :--- | :--- |
| Files | 5 to 9 (Thin through Bold) | 1 (`InterVariable.woff2`) |
| Requests | 5 to 9 | 1 |
| Transfer | 1.2MB to 2.5MB | ~350KB for all weights |
| Weights | Discrete 400/500/600/700 | Continuous `font-weight: 100` to `900` |

Four rules govern local typography:

1. **Zero external font requests**: no component, stylesheet, or HTML entry may reference `fonts.googleapis.com` or any font CDN. The interface renders identically in air-gapped clouds, intranets, and offline.
2. **Zero FOIT and zero FOUT**: external CDNs hide text or swap fallback fonts, causing layout shift (CLS). Same-origin hosting with `font-display: swap` removes both.
3. **Deterministic visual baselines**: visual regression enforces `maxDiffPixels: 0`; CDN latency makes headless Chromium capture fallback fonts intermittently. A pinned local binary rasterizes identically on laptops, Docker, and CI runners.
4. **Immutable glyph geometry**: public CDNs can silently push revisions that change kerning or bounding boxes and break line wraps in dense dashboards. Pinning v4.1 preserves layout geometry for the product's life.

Integration: `@font-face` declarations and the `--font-sans` / `--font-mono` mappings live in `src/index.css` (`@theme inline`). Weight conventions: `font-normal` (400) body, `font-medium` (500) labels and inputs, `font-semibold` (600) headings and buttons, `font-bold` (700) hero stats. Raw pixel sizes are prohibited by Gate 3. Host apps preload the font in `<head>`:

```html
<link rel="preload" href="/fonts/InterVariable.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
```

### Standing decisions

- **Icons**: `lucide-react` is the standard icon library and must not be removed; all interactive primitives use it for consistent weights, stroke terminals, and accessibility tags.
- **Brand vectors**: a curated library of 120+ verified developer and SaaS SVGs under `public/brands/apps/`, backed by `manifest.json`, standardizes OAuth and integration logos so teams never download mismatched or insecure logos from the web.
- **Flat package**: the template is one root-level package, not a nested sub-directory, so it works as a standalone repository or an isolated monorepo workspace without path resolution overhead.
- **Machine-readable contract**: the README-plus-gates pairing applies the lesson of the Google design CLI, which showed that plain-text Markdown works as a machine-readable design specification, and that design changes should be diffed for regressions automatically rather than reviewed by hand.

## 7. Design rules

### Atomicity

One canonical primitive per scenario: one Button, one Card, one Dialog, one Table, one EmptyState. Variations are parameterized through `class-variance-authority` (cva); duplicating a component for a visual tweak is prohibited.

### Tokens

All tokens live in `src/index.css` across four tiers:

1. **Semantic**: foreground/background pairs in OKLCH that flip across light and dark: `--background` / `--foreground`, `--card` / `--card-foreground`, `--popover` / `--popover-foreground`, `--primary` / `--primary-foreground`, `--secondary` / `--secondary-foreground`, `--muted` / `--muted-foreground`, `--destructive` / `--destructive-foreground`, plus `--border`, `--input`, `--ring`.
2. **Status**: lifecycle and severity hues, for example `--status-task-todo`, `--status-task-done`, `--status-task-blocked`.
3. **Domain and brand**: specialized tokens such as syntax-highlight backgrounds and data chips.
4. **Motion**: durations, easing curves, and scoped animation tokens in `src/motion-tokens.css`.

### Radius

Nested controls must never look rounder than the card they sit in, so the scale is multiplicative off a single anchor:

```css
:root {
  --radius: 0.5rem; /* Primary control knob (8px) */
}

@theme inline {
  --radius-sm:  calc(var(--radius) * 0.6);  /* ~4.8px : micro chips, small badges */
  --radius-md:  calc(var(--radius) * 0.8);  /* ~6.4px : input controls, default buttons */
  --radius-lg:  var(--radius);              /*  8.0px : base container cards (anchor) */
  --radius-xl:  calc(var(--radius) * 1.4);  /* 11.2px : sheets, modal dialogs */
  --radius-2xl: calc(var(--radius) * 1.8);  /* 14.4px : large dashboard panels */
  --radius-3xl: calc(var(--radius) * 2.2);  /* 17.6px */
  --radius-4xl: calc(var(--radius) * 2.6);  /* 20.8px */
}
```

Changing `--radius` once recalculates every corner in the app.

### Dual-mode cards

The Card primitive has two modes. Static container (default): `bg-card text-card-foreground border border-border`, grouping content with no hover behavior. Interactive (`interactive` prop): a clickable surface with `cursor-pointer`, a border shift to `border-foreground/20` on hover, and subtle elevation plus focus ring.

### Status

Five canonical lifecycle phases: `success` (green, healthy completion), `error` (red, failures or required intervention), `warning` (amber, thresholds or pending approvals), `pending` (blue/violet, queued or in-flight work), and `idle` (neutral slate, not started or archived).

Status never relies on color alone. `StatusGlyph` adds geometric micro-glyphs (discs, checkmarks, clocks, warning triangles, obstruction bars) and `StatusBadge` adds explicit text labels, so color-vision-deficient users and screen readers get the same information.

### Motion

Motion tokens live in `src/motion-tokens.css` as native custom properties on `:root`, so durations and easings can be tuned live in developer tools. A `@media (prefers-reduced-motion: reduce)` block collapses durations and delays to zero globally.

### i18n

The component library is i18n-ready without forcing a translation framework:

1. **CSS logical properties**: physical directions (`pl-*`, `pr-*`, `left-*`, `right-*`, `border-l`) are replaced with logical ones (`ps-*`, `pe-*`, `start-*`, `end-*`, `border-s`, `border-e`). Under `<html dir="rtl">` (Arabic, Hebrew, Persian), drawers, close buttons, check slots, and paddings mirror automatically; chevrons flip via `rtl:rotate-180`.
2. **Text-expansion tolerance**: German or Russian often needs 30-50% more width. Primitives use intrinsic sizing, flexbox stretching, and `min-w-0` overflow management; fixed pixel widths are blocked by Gate 2.
3. **Parametric microcopy**: primitives contain no hardcoded user-facing strings; text arrives through props or `children`. Built-in screen-reader strings can be overridden via props, integrating with `next-intl`, `react-i18next`, or any localization package.
