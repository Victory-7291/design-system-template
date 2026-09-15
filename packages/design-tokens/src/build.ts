import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKENS_DIR = path.resolve(__dirname, "../../../tokens");
const DIST_DIR = path.resolve(__dirname, "../dist");

interface TokenNode {
  $value?: string | number;
  $type?: string;
  $description?: string;
  [key: string]: any;
}

// 1. Read tokens
const foundationPath = path.join(TOKENS_DIR, "foundation.tokens.json");
const semanticPath = path.join(TOKENS_DIR, "semantic.tokens.json");

const foundationRaw = JSON.parse(fs.readFileSync(foundationPath, "utf-8"));
const semanticRaw = JSON.parse(fs.readFileSync(semanticPath, "utf-8"));

const fullTokens = {
  ...foundationRaw,
  ...semanticRaw,
};

// 2. Helper to get value by dot path (e.g. "foundation.color.neutral.0")
function getByPath(obj: any, pathStr: string): any {
  const parts = pathStr.split(".");
  let curr = obj;
  for (const part of parts) {
    if (curr == null || typeof curr !== "object") return undefined;
    curr = curr[part];
  }
  return curr;
}

// 3. Resolve alias recursively (e.g. "{foundation.color.neutral.0}")
function resolveValue(val: any, allTokens: any, seen = new Set<string>()): any {
  if (typeof val !== "string") return val;
  const match = val.match(/^\{([\w.-]+)\}$/);
  if (!match) return val;

  const aliasPath = match[1];
  if (seen.has(aliasPath)) {
    throw new Error(`Circular reference detected in design token alias: ${aliasPath}`);
  }
  seen.add(aliasPath);

  const target = getByPath(allTokens, aliasPath);
  if (!target) {
    throw new Error(`Design token alias target not found: ${aliasPath}`);
  }
  const resolved = target.$value !== undefined ? target.$value : target;
  return resolveValue(resolved, allTokens, seen);
}

// Flatten all tokens into key-value map
interface FlattenedToken {
  key: string; // e.g. "ds-color-neutral-50"
  cssVar: string;
  value: string | number;
  type?: string;
  isDark?: boolean;
  baseKey?: string; // key without "-dark"
}

const tokensList: FlattenedToken[] = [];

function traverse(obj: any, currentPath: string[] = []) {
  if (!obj || typeof obj !== "object") return;

  if (obj.$value !== undefined) {
    const rawVal = obj.$value;
    const resolvedVal = resolveValue(rawVal, fullTokens);
    const fullPathStr = currentPath.join("-");
    const isDark = currentPath[currentPath.length - 1]?.endsWith("-dark");
    const baseKey = isDark
      ? currentPath.slice(0, -1).concat(currentPath[currentPath.length - 1].replace(/-dark$/, "")).join("-")
      : fullPathStr;

    tokensList.push({
      key: fullPathStr,
      cssVar: `--ds-${fullPathStr}`,
      value: resolvedVal,
      type: obj.$type,
      isDark,
      baseKey,
    });
    return;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    traverse(value, [...currentPath, key]);
  }
}

traverse(foundationRaw.foundation, ["foundation"]);
traverse(semanticRaw.semantic, ["semantic"]);

// Separate light and dark
const lightVars: string[] = [];
const darkVars: string[] = [];
const tailwindThemeVars: string[] = [];

for (const token of tokensList) {
  if (token.isDark) {
    darkVars.push(`  --ds-${token.baseKey}: ${token.value};`);
  } else {
    lightVars.push(`  ${token.cssVar}: ${token.value};`);

    // Map semantic tokens to Tailwind v4 @theme
    if (token.key.startsWith("semantic-color-")) {
      const twName = token.key.replace("semantic-color-", "--color-");
      tailwindThemeVars.push(`  ${twName}: var(${token.cssVar});`);
    } else if (token.key.startsWith("foundation-spacing-")) {
      const step = token.key.replace("foundation-spacing-", "");
      tailwindThemeVars.push(`  --spacing-${step}: var(${token.cssVar});`);
    } else if (token.key.startsWith("foundation-radius-")) {
      const step = token.key.replace("foundation-radius-", "");
      tailwindThemeVars.push(`  --radius-${step}: var(${token.cssVar});`);
    } else if (token.key === "foundation-font-family-sans") {
      tailwindThemeVars.push(`  --font-sans: var(${token.cssVar});`);
    } else if (token.key === "foundation-font-family-mono") {
      tailwindThemeVars.push(`  --font-mono: var(${token.cssVar});`);
    } else if (token.key.startsWith("foundation-motion-duration-")) {
      const step = token.key.replace("foundation-motion-duration-", "");
      tailwindThemeVars.push(`  --duration-${step}: var(${token.cssVar});`);
    } else if (token.key.startsWith("foundation-motion-easing-")) {
      const step = token.key.replace("foundation-motion-easing-", "");
      tailwindThemeVars.push(`  --ease-${step}: var(${token.cssVar});`);
    }
  }
}

// Standard shadcn/ui & Application Tailwind v4 @theme dynamic token bindings (Zero hardcoding)
tailwindThemeVars.push(`  --color-background: var(--ds-semantic-color-surface-canvas);`);
tailwindThemeVars.push(`  --color-foreground: var(--ds-semantic-color-text-primary);`);
tailwindThemeVars.push(`  --color-card: var(--ds-semantic-color-surface-raised);`);
tailwindThemeVars.push(`  --color-card-foreground: var(--ds-semantic-color-text-primary);`);
tailwindThemeVars.push(`  --color-popover: var(--ds-semantic-color-surface-overlay);`);
tailwindThemeVars.push(`  --color-popover-foreground: var(--ds-semantic-color-text-primary);`);
tailwindThemeVars.push(`  --color-primary: var(--ds-semantic-color-action-primary);`);
tailwindThemeVars.push(`  --color-primary-foreground: var(--ds-semantic-color-action-primary-text);`);
tailwindThemeVars.push(`  --color-secondary: var(--ds-semantic-color-surface-subtle);`);
tailwindThemeVars.push(`  --color-secondary-foreground: var(--ds-semantic-color-text-primary);`);
tailwindThemeVars.push(`  --color-muted: var(--ds-semantic-color-surface-subtle);`);
tailwindThemeVars.push(`  --color-muted-foreground: var(--ds-semantic-color-text-muted);`);
tailwindThemeVars.push(`  --color-accent: var(--ds-semantic-color-surface-subtle);`);
tailwindThemeVars.push(`  --color-accent-foreground: var(--ds-semantic-color-text-primary);`);
tailwindThemeVars.push(`  --color-destructive: var(--ds-semantic-color-status-destructive);`);
tailwindThemeVars.push(`  --color-destructive-foreground: var(--ds-semantic-color-status-destructive-foreground);`);
tailwindThemeVars.push(`  --color-warning: var(--ds-semantic-color-status-warning);`);
tailwindThemeVars.push(`  --color-warning-foreground: var(--ds-semantic-color-status-warning-foreground);`);
tailwindThemeVars.push(`  --color-success: var(--ds-semantic-color-status-success);`);
tailwindThemeVars.push(`  --color-success-foreground: var(--ds-semantic-color-status-success-foreground);`);
tailwindThemeVars.push(`  --color-info: var(--ds-semantic-color-status-info);`);
tailwindThemeVars.push(`  --color-info-foreground: var(--ds-semantic-color-status-info-foreground);`);
tailwindThemeVars.push(`  --color-border: var(--ds-semantic-color-border-default);`);
tailwindThemeVars.push(`  --color-input: var(--ds-semantic-color-border-default);`);
tailwindThemeVars.push(`  --color-ring: var(--ds-semantic-color-action-accent);`);

const cssContent = `/**
 * DO NOT EDIT MANUALLY
 * Generated by @design-system/tokens build pipeline
 * Standard: W3C DTCG Format Specification
 */

:root {
${lightVars.join("\n")}
}

.dark {
${darkVars.join("\n")}
}

@theme {
${tailwindThemeVars.join("\n")}
}

/* WCAG 2.1 Criteria 2.3.3 Accessibility Motion Guardrail */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

// Generate TS definitions
const tokensRecord: Record<string, string | number> = {};
for (const token of tokensList) {
  tokensRecord[token.key] = token.value;
}

const tsCode = `/**
 * DO NOT EDIT MANUALLY
 * Generated by @design-system/tokens build pipeline
 */

export const tokens = ${JSON.stringify(tokensRecord, null, 2)} as const;

export type TokenName = keyof typeof tokens;

export const cssVariables = {
${tokensList
  .filter((t) => !t.isDark)
  .map((t) => `  "${t.key}": "var(${t.cssVar})"`)
  .join(",\n")}
} as const;
`;

const dtsCode = `export declare const tokens: {
${tokensList.map((t) => `  readonly "${t.key}": ${JSON.stringify(t.value)};`).join("\n")}
};

export type TokenName = keyof typeof tokens;

export declare const cssVariables: {
${tokensList
  .filter((t) => !t.isDark)
  .map((t) => `  readonly "${t.key}": string;`)
  .join("\n")}
};
`;

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

fs.writeFileSync(path.join(DIST_DIR, "tokens.css"), cssContent, "utf-8");
fs.writeFileSync(path.join(DIST_DIR, "index.js"), tsCode, "utf-8");
fs.writeFileSync(path.join(DIST_DIR, "index.d.ts"), dtsCode, "utf-8");
fs.writeFileSync(
  path.join(DIST_DIR, "tokens.json"),
  JSON.stringify({ tokensList, tokensRecord }, null, 2),
  "utf-8"
);

console.log("✅ [@design-system/tokens] Build completed successfully!");
