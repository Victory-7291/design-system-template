# Local Fonts & Typography Infrastructure Specification

**Status:** Active Specification (v1.0)  
**Asset Directory:** `public/fonts/`  
**Core Binaries:** `InterVariable.woff2` (Roman), `InterVariable-Italic.woff2` (Italic), `NOTICE.md` (License Compliance)

---

## 1. Typography Philosophy & System Positioning

In modern enterprise Web applications and developer platforms, typography serves as the foundational skeleton and vehicle for information density. Unlike high-saturation marketing landing pages, operational dashboards, control planes, and SaaS tools demand: **high information density, rapid scannability, unambiguous glyph recognition, predictable rendering performance, and long-term maintainability**.

This design system standardizes on **Inter Variable** as the core platform typeface, governed by an industrial-grade engineering discipline: **"Locally bundled static assets, zero external network dependency, and strongly typed semantic token mappings."**

---

## 2. Technical Deep Dive: WOFF2 & Variable Fonts

### 2.1 WOFF2 Format Advantages
- **W3C Official Standard**: WOFF2 (Web Open Font Format 2.0) is the modern standard for web font distribution.
- **Google Brotli Compression**: Compared to legacy desktop formats (TTF / OTF), WOFF2 reduces binary size by **over 70%**. Compared to WOFF 1.0 (gzip), WOFF2 achieves an additional **30% to 50%** compression ratio.
- **Native Browser Coverage**: Modern desktop and mobile browsers (Chrome, Safari, Firefox, Edge, iOS Safari, Android WebKit) offer **>99.8% native support**. There is zero need for legacy TTF/EOT fallbacks.

### 2.2 Variable Font Mechanics vs. Static Slices

| Metric | Static Sliced Fonts | Variable Fonts (Adopted) |
| :--- | :--- | :--- |
| **File Count** | 5 to 9 separate files (Thin, Regular, Medium, SemiBold, Bold, etc.) | **Single file** (`InterVariable.woff2`) covers all weights |
| **HTTP Requests** | 5 to 9 parallel or queued network requests | **1 static request** |
| **Total Transfer** | 1.2 MB – 2.5 MB total payload | **~350 KB** total payload |
| **Weight Support** | Discrete steps only (400, 500, 600, 700) | **Continuous interpolation**: any value between `font-weight: 100` and `900` |
| **Rendering** | Rasterized from discrete hinting tables | Continuous variation axes calculated dynamically by browser engine |

By bundling a variable font, the system maximizes typographical nuance while minimizing network overhead and initial paint blocking.

---

## 3. Upstream Provenance & Open-Source Compliance

### 3.1 Lineage & Design Intent
- **Project**: Inter
- **Lead Designer**: Rasmus Andersson (former Design Director at Spotify, early interface architect at Figma).
- **Design Rationale**: Crafted specifically for high-resolution screens, dense data tables, UI controls, and mixed code/text environments. Features rigorous micro-typographic optimizations for x-height, letter spacing (kerning), and disambiguation of easily confused glyphs (e.g. `0` vs `O`, `l` vs `I`, `1` vs `l`).
- **Industry Standard**: Adopted as the primary UI typeface by Figma, GitHub, Vercel, Linear, Raycast, Stripe, and leading developer platforms.
- **Upstream Repository**: [https://github.com/rsms/inter](https://github.com/rsms/inter) (Pinned version: **v4.1**).

### 3.2 Licensing & Commercial Safety
- **License**: **SIL Open Font License 1.1 (OFL)** (full text in [`public/fonts/NOTICE.md`](../public/fonts/NOTICE.md)).
- **Permitted Rights**:
  - Free for commercial products, proprietary software, and open-source projects.
  - Bundling font binaries within software repositories, packages, and Docker images is explicitly authorized.
  - Royalty-free worldwide distribution across web, mobile, and desktop applications.
  - No domain restrictions, tracking beacons, or recurring license fees.

---

## 4. The Four Engineering Hard Rules

Many front-end projects inject fonts via Google Fonts or third-party CDNs. In an enterprise design system, this introduces operational fragility. This template enforces four strict rules:

### Rule 1: Zero External Network Dependency (Air-Gapped Ready)
- **Principle**: Components, stylesheets, and HTML documents **must never issue network requests to external font CDNs** (such as `fonts.googleapis.com` or `fonts.gstatic.com`).
- **Value**: Guarantees that private deployments, air-gapped corporate intranets, offline development environments, and cross-border edge networks render identical UI without risking CDN outages or regulatory blocks.

### Rule 2: Zero FOIT & Zero FOUT
- **FOIT (Flash of Invisible Text)**: Browsers block text rendering while waiting for remote CDN connections, leaving interfaces blank.
- **FOUT (Flash of Unstyled Text)**: Slow CDN connections cause browsers to paint fallback system serif/sans fonts, followed by an abrupt layout jump when the font arrives (Cumulative Layout Shift, CLS).
- **Solution**: Same-origin static hosting with `font-display: swap`. Delivered directly from Vite / CDN edge alongside HTML/CSS, font files arrive virtually synchronously with the DOM, preventing flicker and shift.

### Rule 3: Deterministic Visual Regression Testing
- **Challenge**: Automated visual snapshot testing (Playwright executing Storybook stories with `maxDiffPixels: 0`) fails if fonts render inconsistently across test runners. External CDNs introduce network latency, intermittent fallbacks, and anti-aliasing variations across environments.
- **Solution**: The pinned local `InterVariable.woff2` binary ensures identical font rasterization across macOS workstations, Linux CI containers, and headless Chromium runners, eliminating flaky CI builds.

### Rule 4: Immutable Typeface Integrity
- **Challenge**: Public CDNs periodically deploy minor font revisions that subtly alter glyph metrics or character widths, triggering unexpected word wraps and broken data table alignments.
- **Solution**: Pinned SHA-256 binary integrity locks font geometry throughout the application lifecycle.

---

## 5. Implementation & Integration Pipeline

### 5.1 CSS `@font-face` Declarations
Declared in [`src/index.css`](../src/index.css) with variable weight ranges:

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

### 5.2 Tailwind CSS v4 Theme Token Injection
Registered in the `@theme inline` block with a defensive fallback stack:

```css
@theme inline {
  --font-sans: "InterVariable", "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
```

### 5.3 Component-Level Usage Guidelines
- **Global Inheritance**: Applied to `<body>` by default; all primitives inherit `--font-sans`.
- **Weight Semantics**:
  - `font-normal` (400): Body copy, table cells, descriptions.
  - `font-medium` (500): Subheadings, form labels, navigation links.
  - `font-semibold` (600): Card headers, action buttons, status badges.
  - `font-bold` (700): Metric values, hero titles.
- **No Arbitrary Sizing**: Use semantic size utilities (`text-xs`, `text-sm`, `text-base`, `text-lg`). Arbitrary classes like `text-[13px]` are blocked by CI Gate 3.

### 5.4 Production HTML Preloading
In [`index.html`](../index.html) (or Next.js `layout.tsx`), preload the primary variable font for optimal First Contentful Paint:

```html
<link
  rel="preload"
  href="/fonts/InterVariable.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

---

## 6. Custom Brand Font Migration Guide

To replace Inter with a custom brand typeface (e.g. Geist, Plus Jakarta Sans, or custom proprietary fonts):

1. **Format Validation**: Ensure the asset is a `.woff2` variable font. Reject uncompressed `.ttf` / `.otf` files.
2. **License Audit**: Verify commercial redistribution rights (OFL 1.1 or commercial license), and update `public/fonts/NOTICE.md`.
3. **Asset Placement**: Copy the `.woff2` binaries into `public/fonts/`.
4. **Update `@font-face`**: Adjust `font-family` and file paths in `src/index.css`.
5. **Regenerate Visual Baselines**: Run `bun run check` and update Playwright visual snapshot baselines (`bun run test:visual`).
