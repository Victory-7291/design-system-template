---
version: alpha
name: design-system-template
description: "Production-ready, AI-native plain-text design system template. Engineered with accessible neutral palette, strict W3C DTCG token compilation, multi-tier surface elevation, CSS-first micro-motions, and complete 53-component shadcn/ui suite."

colors:
  primary: "#09090b"
  on-primary: "#ffffff"
  primary-hover: "#27272a"
  primary-active: "#18181b"
  ink: "#fafafa"
  ink-inverse: "#09090b"
  ink-muted: "#a1a1aa"
  ink-subtle: "#71717a"
  canvas: "#ffffff"
  canvas-dark: "#09090b"
  surface-sunken: "#000000"
  surface-subtle: "#18181b"
  surface-raised: "#27272a"
  surface-overlay: "#3f3f46"
  border-default: "#e4e4e7"
  border-dark: "#27272a"
  border-dark-strong: "#3f3f46"
  accent: "#16a34a"
  accent-dark: "#15803d"
  status-destructive: "#dc2626"
  status-warning: "#d97706"
  status-success: "#15803d"
  status-info: "#2563eb"

typography:
  display-xl:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 56px
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -0.04em
  display-lg:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.03em
  h1:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.025em
  h2:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  h3:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  caption:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.01em
  button:
    fontFamily: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: 0em
  eyebrow:
    fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0.2em
  mono:
    fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 24px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  3xl: 64px
  section: 96px
  section-lg: 128px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 24px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 24px
  button-accent:
    backgroundColor: "{colors.accent-dark}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 24px
  button-destructive:
    backgroundColor: "{colors.status-destructive}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 24px
  card-canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-inverse}"
    typography: "{typography.body}"
    rounded: "{rounded.xxl}"
    padding: 24px 32px
  card-default:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xxl}"
    padding: 24px 32px
  card-elevated:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xxl}"
    padding: 24px 32px
  card-overlay:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xxl}"
    padding: 24px 32px
  card-sunken:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.mono}"
    rounded: "{rounded.lg}"
    padding: 16px 20px
  badge-default:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  badge-accent:
    backgroundColor: "{colors.accent-dark}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  badge-destructive:
    backgroundColor: "{colors.status-destructive}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  badge-warning:
    backgroundColor: "{colors.status-warning}"
    textColor: "{colors.primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  badge-success:
    backgroundColor: "{colors.status-success}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  badge-info:
    backgroundColor: "{colors.status-info}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  text-input:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 10px 14px
  text-input-focus:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 10px 14px
  callout-info:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 16px 20px
  callout-accent:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 16px 20px
  dialog-modal:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xxl}"
    padding: 24px 32px
  dropdown-menu:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 6px 8px
---

# Design System Template Specification

## Overview

This document specifies the design tokens, visual grammar, constraints, and component rules for this design system. It is formatted according to the Google Stitch plain-text design system standard (@google/design.md) so that AI coding agents and automated CLI tooling can parse, validate, and enforce design fidelity deterministically.

The design system establishes a minimal, clean, neutral foundation suitable for modern web applications, marketing sites, dashboards, and developer tools.

## Design Principles

1. **Anti-Slop Restraint**: Zero decorative linear gradients across cards, zero rainbow color clutter, zero card-in-a-card nestings. Structure is created through whitespace, subtle borders (border-border), and surface elevation.
2. **Single Primary Action Signal**: Exactly one high-contrast primary CTA per viewport. All supporting interactions use secondary, ghost, or outline variants.
3. **Pill Geometry Grammar**: Primary interactive triggers (buttons, badges, tabs, pills) strictly use full border radius (rounded-full). Structured content containers (cards, dialogs, sheets) use calibrated geometric radii (rounded-xl, rounded-2xl).
4. **Accessible Contrast by Construction**: Every text-to-background pairing strictly satisfies WCAG 2.1 AA (at least 4.5:1 for normal text, at least 3:1 for large text and UI components) and APCA contrast criteria.
5. **CSS-First Micro-Motion**: High-performance CSS transform animations (active:scale-[0.97], transition-all, duration-fast, ease-default) with full support for accessibility reduced motion (@media (prefers-reduced-motion: reduce)).

## Colors

The color palette is built on a neutral grayscale ladder complemented by a calibrated accent color and semantic status signals.

- **Primary Canvas**: Pure white (#ffffff) in light mode; Obsidian Black (#09090b) in dark mode.
- **Text Ladder**: 
  - Primary text: High-contrast ink (#09090b light / #fafafa dark) providing > 18:1 contrast.
  - Secondary text: Readable neutral (#52525b light / #a1a1aa dark) strictly maintaining > 4.5:1 contrast.
  - Muted text: Supporting captions and metadata (#71717a light / #71717a dark).
- **Surface Elevation Hierarchy**:
  - canvas: The foundation surface for pages.
  - sunken: Recessed areas such as code blocks, inset search inputs, and table footers.
  - subtle: Background for muted panels and cards in flat layouts.
  - raised: Primary card and widget elevation layer.
  - overlay: Floating layer for dropdowns, popovers, and modal dialogs.
- **Semantic Status Signals**:
  - destructive: Danger and error states (#dc2626).
  - warning: Cautionary notices (#d97706).
  - success: Confirmations and success states (#16a34a).
  - info: Informational indicators (#2563eb).

## Typography

The typography system is built on Geist Sans for clean readability and Geist Mono for code, metrics, and tabular data.

- **Display Scales**: High-impact titles (display-xl, display-lg) feature negative letter tracking (-0.04em to -0.03em) and tight line height (0.95 to 1.1).
- **Headings**: h1, h2, and h3 maintain clear hierarchical contrast with calibrated proportional leading.
- **Body Hierarchy**: body-lg (18px), body (16px), and body-sm (14px) prioritize sustained reading comfort with 1.5–1.6 line height.
- **Metadata & Eyebrows**: Set in Geist Mono with uppercase transformation and wide letter-spacing (+0.2em).

## Layout & Spacing Grid

- **Base Unit**: 4px base increment (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px).
- **Container Max-Widths**:
  - Prose reading column: max-w-3xl (65–75 characters per line).
  - Standard application view: max-w-7xl.
  - Full-width responsive canvas with padded gutters (px-4 sm:px-6 lg:px-8).
- **Bento Grids**: High-density layouts use 12-column or 3-column asymmetric CSS grids with uniform gap (gap-4 to gap-6).

## Elevation & Depth

- Light mode depth is communicated through crisp 1px borders (border-border) and subtle ambient shadows (shadow-xs, shadow-sm).
- Dark mode depth is communicated strictly through surface lightness steps (sunken -> canvas -> subtle -> raised -> overlay), avoiding muddy black shadows.

## Shapes

- **Pill (rounded-full)**: Buttons, badges, tags, search bars, segmented pills.
- **Card & Dialog (rounded-xl to rounded-2xl)**: Modals, large feature cards, callout containers.
- **Control (rounded-md)**: Text fields, select triggers, checkboxes, popovers.

## Components

The system provides 53 shadcn/ui primitive components and custom editorial layout components:

- **Button**: Supports default, secondary, outline, ghost, destructive, and link variants across default, sm, lg, and icon sizes. Includes tactile active:scale-[0.97] feedback.
- **Card**: Provides CardHeader, CardTitle, CardDescription, CardContent, and CardFooter with unified elevation tokens.
- **Dialog & Sheet**: Fully accessible modal and slide-out sheet containers using Radix UI primitives with managed focus traps and backdrop blurs.
- **Form Controls**: Input, Select, Checkbox, RadioGroup, Switch, Slider, and Textarea with accessible validation ring states.
- **Data Display**: Table, Chart, Empty, Item, Badge, and Kbd for dense, legible operational dashboards.

## Micro-Motion & Interaction

- **Duration Tokens**:
  - instant: 100ms (micro-toggles, press feedback).
  - fast: 150ms (button hover, tooltip display).
  - base: 200ms (dropdown open, accordion expand).
  - moderate: 300ms (drawer slide, dialog scale).
  - deliberate: 500ms (view transitions, page loading).
- **Easing**: Exponential decelerate curve (cubic-bezier(0.16, 1, 0.3, 1)).
- **Accessibility**: When prefers-reduced-motion: reduce is detected, transitions and animations are collapsed to 0.01ms.

## Do's and Don'ts

### Do:
- Use semantic token classes (bg-background, text-foreground, border-border) instead of raw hex values.
- Apply active:scale-[0.97] to interactive clickable elements.
- Ensure all custom text color combinations pass WCAG 2.1 AA (at least 4.5:1).
- Keep one distinct primary call to action per viewport.

### Don't:
- Do not apply decorative multi-color gradients to card backgrounds or borders.
- Do not nest cards inside cards inside cards.
- Do not use arbitrary hardcoded pixel colors in component templates.
- Do not override prefers-reduced-motion safeguards.

## Responsive Behavior

- Mobile (< 640px): Single-column stack, edge-to-edge padded containers (px-4), touch-friendly 44px minimum tap targets.
- Tablet (640px – 1024px): 2-column bento grids, responsive sheet drawers replacing complex modal flyouts.
- Desktop (at least 1024px): Full multi-column dashboard layouts, sticky navigation sidebars, and fluid typography.
