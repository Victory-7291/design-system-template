# Design System Charter & Architectural Principles

**Status:** v1.0 — Foundational specification for design language, token governance, and component primitives. Governs UI structure, layout rhythm, and token boundaries. Visual values (colors, typography, spacing, radius, motion) are codified strictly as tokens. Nothing in `src/` may hardcode visual values.

---

## 1. Scope & Authority

This document is the single source of design truth for human engineers and autonomous AI agents modifying this codebase. 
Storybook serves as the verification and documentation surface; it records the system, but does not define it. If a code change conflicts with this specification, update this document first through code review, or align the code to match this document.

---

## 2. Product Stance & Interface Hierarchy

Modern web applications, SaaS dashboards, and developer tools serve operators scanning complex state and making decisions. Every screen should answer three questions in order:
1. *What is happening right now?*
2. *Does this require my attention or action?*
3. *What specific step do I take next?*

Information density in service of fast scanning takes precedence over decorative whitespace. However, density must originate from meaningful information and data structure—never from cluttered borders, superfluous dividers, or decorative chrome.

---

## 3. The Token Layer (Where Visual Values Live)

The single token source of truth is **`src/index.css`** powered by Tailwind CSS v4. There is no legacy `tailwind.config.js` file; tokens are CSS custom properties consumed natively via the `@theme` directive.

> [!IMPORTANT]
> **Tailwind v4 Rule**: `@theme inline` bakes literal values into utility classes at build time. Tokens that require runtime adaptability (such as dark mode overrides, theme switches, or live motion tuning) must be declared in standard CSS `:root` or `.dark` blocks, not in `@theme inline`.

### Token Tiers:
1. **Semantic Tier**: Standard UI variables defined in modern OKLCH color space with automatic light/dark switches (`--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`).
2. **Status Tier**: Semantic status palettes tuned for WCAG AA contrast compliance (`running` / blue, `done` / emerald, `todo` / amber, `blocked` / red).
3. **Motion & Feedback Tier**: Runtime-tunable duration and easing curves (`--motion-duration-*`, `--motion-ease-*`) declared in `:root`.

---

## 4. Typography & Local Font Infrastructure

Detailed specification: [`doc/FONTS.md`](./doc/FONTS.md).

1. **Locally Bundled Assets**: The system typeface is `InterVariable.woff2` (Roman) and `InterVariable-Italic.woff2` (Italic), stored statically in `public/fonts/` under the SIL Open Font License 1.1.
2. **Zero External Network Dependency**: External font CDNs (Google Fonts, Typekit) are strictly banned. The system must remain 100% functional in air-gapped corporate environments and offline development.
3. **Zero FOIT & FOUT**: Delivered directly from the host application via same-origin static hosting and `font-display: swap`, eliminating invisible text blocks (FOIT) and layout shifts (FOUT).
4. **Deterministic Visual Regression**: Pinned local font binaries guarantee exact, invariant rasterization across developer laptops, headless CI runners, and Docker containers, ensuring Playwright visual diffs (`maxDiffPixels: 0`) never fail due to network font delays.
5. **Semantic Scale**: Declared in `src/index.css` via `@font-face` and injected into `--font-sans`. Components must use semantic size classes (`text-xs`, `text-sm`, `text-base`, `text-lg`) rather than inline arbitrary pixel sizes.

---

## 5. Core Architectural Principles

### 1. One Way to Say Each Thing
One component per role: one `Button`, one `Card`, one `Badge`, one `Table`, one `EmptyState`. Variations are expressed as typed component props (`variant`, `size`), never as duplicate components. Before introducing a new component, verify that no existing primitive covers the requirement.

### 2. Tokens Are the Only Source of Visual Values
All color, spacing, radius, typography, shadow, and motion values must originate from the token layer.
- Zero raw hex values (`#3b82f6`).
- Zero ad-hoc Tailwind arbitrary brackets (`p-[13px]`, `w-[347px]`).
- Zero inline style font sizes (`style={{ fontSize: '14px' }}`).
If a required design value does not exist in tokens, mint the token in `src/index.css` first.

### 3. Single-Knob Radius Architecture
Component border radiuses are dynamically driven by a single base token:
```css
:root {
  --radius: 0.5rem; /* 8px default */
}
```
All child radiuses derive proportionally:
- `rounded-lg`: `var(--radius)` (8px)
- `rounded-md`: `calc(var(--radius) - 2px)` (6px)
- `rounded-sm`: `calc(var(--radius) - 4px)` (4px)

Changing `--radius` dynamically scales the roundness of the entire UI system without code edits.

### 4. One Card, Two Modes
The `Card` primitive provides two explicit functional modes:
- **Static Container** (`variant="default"`): Groups related information into a bordered, non-clickable surface.
- **Interactive Action Tile** (`variant="interactive"`): Renders a clickable card surface with subtle hover elevation, outline feedback, and active state transitions.

### 5. Hierarchy Through Structure, Not Decoration
Establish visual hierarchy through position, spacing, and typography weight rather than heavy dividing lines or nested card backgrounds. Every border and divider must justify its existence; when in doubt, remove it.

### 6. Systematic Status Vocabulary
Operational states (running, completed, queued, blocked) map to consistent semantic tokens across the entire application:
- `running`: Blue / in-progress pulse.
- `done`: Emerald / green checkmark.
- `todo`: Amber / yellow clock indicator.
- `blocked`: Red / destructive alert.

An operator learns the visual language once and recognizes it consistently across tables, badges, headers, and logs.

### 7. Monospace for Machine Values
Hashes, commit IDs, telemetry counts, timestamps, API keys, and terminal outputs always use the monospace font token (`font-mono`) and consistent formatting helpers. Never format machine data ad-hoc.

### 8. Agent-Modifiable by Design
The architecture is optimized for automated AI agents and developer tooling: a single token file, strict check scripts that validate edits, and no distributed configuration spread across dozens of config files.

---

## 6. Motion & Animation Tokens

Motion tokens live in `:root` inside `src/index.css`:
- **Primitives**: `--motion-duration-fast` (100ms), `--motion-duration-normal` (200ms), `--motion-duration-slow` (350ms).
- **Easing**: `--motion-ease-standard` (cubic-bezier(0.2, 0, 0, 1)), `--motion-ease-decelerate` (cubic-bezier(0, 0, 0.2, 1)).
- **Reduced Motion**: A media query `@media (prefers-reduced-motion: reduce)` collapses duration and delay tokens to `0s`, guaranteeing accessibility compliance out of the box.

---

## 7. Automated Token Gates & Governance

Quality is enforced through automated static analysis scripts rather than manual human vigilance:

```bash
bun run check
```

The gate script (`scripts/check-token-gates.mjs`) validates four non-negotiable rules:
- **Gate 1: Zero Hardcoded Hex Colors**: Fails if raw hex codes (`#fff`, `#000000`) appear in `src/components/` or `src/pages/` outside the documented allowlist.
- **Gate 2: Zero Arbitrary Tailwind Values**: Blocks ad-hoc bracket utilities like `p-[11px]`, `w-[320px]`, or `h-[45px]`.
- **Gate 3: Zero Arbitrary Font Sizes**: Enforces semantic font utilities (`text-sm`, `text-base`); rejects `text-[13px]`.
- **Gate 4: Zero Hardcoded Motion Timing**: Bans raw animation timing outside the motion token registry.

---

## 8. Verification Strategy

1. **Static Analysis & Types**: `bun run check && bun run typecheck`
2. **Unit Tests**: `bun run test` (59 unit tests covering primitives, contexts, and brand validations)
3. **Storybook Isolation**: `bun run build-storybook` ensures all components compile cleanly in component catalog isolation.
4. **Visual Regression**: Playwright captures storybook snapshots with `maxDiffPixels: 0` to verify that refactors introduce zero unintended pixel shifts.
