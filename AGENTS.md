# Design System: Agent Building & Maintenance Specification (UI Contract)

> **Target Audience**: All AI Coding Agents (Cursor, Codex, Claude Code, Antigravity, etc.) and human engineers contributing to the design system or consuming it in downstream applications.
> **Core Tech Stack**: **Tailwind CSS v4** + **TypeScript (Strict Mode)** + **shadcn/ui (Radix UI Primitives)** + **Bun Workspaces** + **Turborepo**.
> **Core Principle**: Code, versioned tokens, and component APIs are the sole source of truth; Storybook is the visual review surface; Playwright visual regression is the automated quality gate; AI agents MUST compose within the authoritative catalog.

---

## 1. Core Technical Conventions

- **UI Primitives**: Built on **shadcn/ui** (Radix UI accessible primitives), located in `@design-system/ui/components/ui/*`.
- **Styling**: **Tailwind CSS v4** native syntax. CSS variables are compiled and injected into `@theme` via `@design-system/tokens`.
- **Type System**: **TypeScript 5+** in strict mode. All components export strong prop types.
- **Runtime & Build**: Unified on **Bun Workspaces** and **Turborepo** for topological task orchestration and caching.
- **Font Policy**: Decoupled from framework-specific runtimes (no hard dependency on `next/font`). Font variables `--font-sans` and `--font-mono` are declared by `@design-system/tokens`.

---

## 2. Binding UI Contract for AI Agents

When writing or modifying UI code, agents must strictly follow these 5 rules:

1. **Query Before Generating (Query First)**
   - Always query the Storybook catalog or inspect `@design-system/ui` exports before writing UI components. Never hallucinate non-existent props or variants.
2. **Mandatory State Coverage**
   - When introducing or altering a component in the design system, corresponding Storybook stories must be added/updated.
   - Must cover edge states: `default`, `hover/active`, `focus`, `loading`, `disabled`, `empty`, `error`, `long-content`, and `mobile`.
   - **UI changes without stories must not be merged.**
3. **Token Authority (No Raw Values)**
   - Never hardcode arbitrary hex/rgb color codes, inline box-shadows, arbitrary font sizes, or uncalibrated animations.
   - Always compose using Semantic Tokens or primitives exposed by the design system.
4. **Composition Over Proliferation**
   - When faced with a new design requirement, compose from existing primitives first. Do not abstract one-off marketing blocks into system components prematurely.
5. **Automated Verification Before Commit**
   - Run `bun run typecheck`, `bun run build`, and `bun run test:visual` locally.
   - Snapshot updates (`bun run test:visual:update`) require human design approval; automated CI must never silently overwrite golden baselines.

---

## 3. Token Hierarchy & Consumption Permissions

| Layer | Examples | Source Location | Allowed Consumers |
| :--- | :--- | :--- | :--- |
| **1. Foundation** | `foundation.color.neutral.950`<br/>`foundation.spacing.4` | `tokens/foundation.tokens.json` | Token compiler & internal primitive implementations only. |
| **2. Semantic** | `color.text.primary`<br/>`color.surface.canvas`<br/>`color.action.primary` | `tokens/semantic.tokens.json` | Consuming applications, component variants, and theme definitions. |
| **3. Component** | `button.primary.bg`<br/>`callout.warning.border` | Component internal implementation | Private to that specific component and its story. |

---

## 4. Standard Commands (CLI)

```bash
# 1. Compile DTCG JSON tokens to CSS variables and TypeScript types
bun run build:tokens

# 2. Workspace-wide typecheck and build
bun run typecheck
bun run build

# 3. Launch local Storybook sandbox (port 6006)
bun run storybook

# 4. Build static Storybook site
bun run storybook:build

# 5. Run Playwright visual regression tests
bun run test:visual

# 6. Update visual golden snapshots after approved visual changes
bun run test:visual:update
```
