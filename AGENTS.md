# AI Agent UI Specification & Governance Contract (UI Contract & Rules)

> **Audience**: All AI Coding Agents (Cursor, Codex, Claude Code, Antigravity, etc.) and human engineers developing, extending, or consuming the design system.  
> **Core Principle**: Code, versioned tokens, and component APIs are the sole source of truth; Storybook is the visual review surface; Playwright is the automated regression gate. Hallucinated UI and arbitrary styling are strictly prohibited.

---

## 1. Technical Conventions & Standards
- **UI Primitives**: Built on **shadcn/ui** (Radix UI unstyled primitives), located in `packages/ui`.
- **Styling Architecture**: **Tailwind CSS v4** native syntax. Design tokens are compiled and injected directly into `@theme` via `@design-system/tokens`.
- **Type Safety**: **TypeScript Strict Mode** across all packages. Every component must export typed prop interfaces.
- **Monorepo Tooling**: **Bun Workspaces** + **Turborepo** for topological task execution and caching.
- **Font Policy**: Decoupled from runtime framework loaders, exposing CSS variables `--font-sans` and `--font-mono`.

---

## 2. Component Placement & 3-Step Promotion Pipeline for `reference/`
1. **No Cross-App Demand, No Upstream Promotion**:
   - Views, layouts, or mockups specific to a single application must remain in that application's codebase. Never bloat shared system packages with single-use components.
2. **Package Responsibilities**:
   - **`@design-system/ui`**: Contains 53 standard shadcn/ui primitives. Zero business logic, accessible by construction, driven by design tokens.
   - **`@design-system/content-ui`**: Dedicated editorial content layout blocks (`ArticleShell`, `Callout`, `Prose`).
3. **External Reference Isolation (`reference/`) & 3-Step Promotion Rule**:
   - Code in `reference/` (e.g., `galaxy`, `react-bits`) is strictly read-only reference material. Direct imports into application code are prohibited.
   - Promoting external components into the design system requires passing a three-step pipeline:
     1. **Token Cleanse**: Strip all raw hardcoded hex/rgb colors and arbitrary dimensions, rebinding them to DTCG Semantic Tokens (`var(--color-...)`).
     2. **Accessibility & Tactile Re-engineering**: Add keyboard Tab focus indicators, ARIA roles, Escape-key dismiss, `active:scale-[0.97]` tactile feedback, and `@media (prefers-reduced-motion: reduce)` fallbacks.
     3. **Storybook 1-to-1 Story & Visual Regression Baseline**: Create a dedicated story in `apps/storybook/src/stories/` passing `@storybook/addon-a11y` and Playwright visual snapshot tests.

---

## 3. Three-Tier Design Constraint Pyramid
When generating or modifying UI, agents must adhere to the three-tier constraint hierarchy:
1. **Tier 1: `DESIGN.md` (Design Rationale & Aesthetic Baseline)**:
   - Plain-text Google Stitch specification. Defines visual DNA, palettes, typography scales, elevation tiers, and the Anti-Slop checklist. Injected as system context for new product generation to ensure aesthetic fidelity.
2. **Tier 2: `AGENTS.md` (Operational Contract)**:
   - Governs developer and AI behavior: prohibits hallucinated props, forbids raw color values, mandates edge-case story coverage, and requires checklist verification.
3. **Tier 3: Automated Quality Gates (Machine Enforcement)**:
   - `build:tokens` enforces unidirectional token compilation;
   - `lint:design` (@google/design.md CLI) validates specification syntax and WCAG contrast compliance;
   - TypeScript 5+ enforces strict type contracts;
   - `@storybook/addon-a11y` (axe-core) halts accessibility violations;
   - Playwright automated visual diffs prevent unintended pixel regressions.

---

## 4. Accessibility, Contrast & Motion Guidelines
1. **High-Contrast Text**:
   - Normal text must guarantee ≥ 4.5:1 contrast against its background in both light and dark modes.
2. **Multi-Tier Surface Elevation**:
   - In dark mode, depth is expressed through calibrated surface lightness steps (`surface.canvas-dark` → `surface.subtle-dark` → `surface.raised-dark` → `surface.overlay-dark`) combined with subtle borders, rather than heavy drop shadows.
3. **Reduced-Motion Compliance**:
   - All animations must respect `prefers-reduced-motion: reduce`. When active, transition durations collapse to `0.01ms`.

---

## 5. Storybook 1-to-1 Mapping & Token Consumption
1. **Storybook 1-to-1 Coverage**:
   - Every component must have an individual story file in `apps/storybook/src/stories/` named `[ComponentName].stories.tsx`.
   - Grouping: UI primitives under `title: "ui/<ComponentName>"`, editorial blocks under `title: "Content/<ComponentName>"`.
   - Stories must enable `tags: ["autodocs"]` and cover Default, Variants, Sizes, and Disabled/Loading states.
2. **Token Layering Permissions**:
   - **Foundation** (`tokens/foundation.tokens.json`): Private to the compiler and primitive implementations.
   - **Semantic** (`tokens/semantic.tokens.json`): The sole authorized layer for application pages and component variants.

---

## 6. Binding Agent Rules
1. **No Hallucinated Props**: Inspect Storybook or component type exports before writing JSX. Never invent non-existent props or variants.
2. **No Hardcoded Raw Values**: Never hardcode hex/rgb strings, inline box-shadows, or arbitrary pixel font sizes. Use semantic tokens or system primitives.
3. **Composition Over Abstraction**: Compose interfaces from existing primitives before requesting new components in the design system.
4. **All Gates Must Pass**: Code must pass `lint:design`, `typecheck`, `build`, and `test:visual` prior to review.

---

## 7. Component Creation Workflow & Checklist
### Execution Workflow
1. **Verify Reuse**: Confirm the component satisfies cross-application utility criteria.
2. **Implement Primitive**: Add component to `packages/ui` using relative internal imports (e.g., `../../lib/utils.js`).
3. **Export Types**: Export the component and its prop types in `packages/ui/src/index.ts`.
4. **Write Story**: Create a dedicated 1-to-1 story in `apps/storybook/src/stories/` with autodocs.
5. **Verify Gates**: Run `bun run build:tokens && bun run lint:design && bun run typecheck && bun run build && bun run test:visual`.

### Self-Checklist
- [ ] Primitive is domain-neutral with no application-specific logic.
- [ ] Internal imports use pure relative paths (`../../lib/utils.js`).
- [ ] Component is exported in `packages/ui/src/index.ts`.
- [ ] Storybook story exists with proper namespace and autodocs.
- [ ] Story covers Default, Variants, Sizes, and Disabled/Loading states.
- [ ] Local `lint:design`, `typecheck`, and `test:visual` pass with 0 errors.

---

## 8. CLI Command Reference
```bash
bun run build:tokens       # Compile DTCG JSON tokens to CSS / Tailwind v4 / TS
bun run lint:design        # Validate Google Stitch DESIGN.md & contrast compliance
bun run typecheck          # Run workspace-wide TypeScript type checking
bun run build              # Build all packages and applications via Turborepo
bun run storybook          # Launch local Storybook sandbox (port 6006)
bun run storybook:build    # Build static Storybook site
bun run test:visual        # Run Playwright dual-viewport visual regression tests
bun run test:visual:update # Update visual golden snapshots after approved updates
```
