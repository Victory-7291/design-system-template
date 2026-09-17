/**
 * tokens:export — styles/globals.css → W3C DTCG JSON (interchange format).
 *
 * globals.css is the source of truth; this tool exports its variables as
 * DTCG so platform teams can translate tokens to Swift / Kotlin / React
 * Native, or import them into Figma via the Tokens Studio plugin.
 *
 * Output: tokens/foundation.tokens.json + tokens/semantic.tokens.json
 * (generated artifacts — do not hand-edit; safe to gitignore).
 *
 * Run: bun run tokens:export
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const CSS = readFileSync("./packages/design-tokens/styles/tokens.css", "utf8");

interface Token {
  $value: string;
  $type: "color" | "dimension" | "fontFamily" | "duration" | "other";
}

/** Extract `var: value` pairs from a CSS block body. */
function parseBlock(body: string): Map<string, string> {
  const vars = new Map<string, string>();
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(body)) !== null) {
    vars.set(match[1], match[2].trim());
  }
  return vars;
}

function typeOf(value: string): Token["$type"] {
  if (/^oklch|^#[0-9a-f]+|^rgba?\(|color-mix/.test(value)) return "color";
  if (/^-?[\d.]+px$/.test(value)) return "dimension";
  if (/^\d+ms$/.test(value)) return "duration";
  if (/font|^Geist|^Newsreader/.test(value)) return "fontFamily";
  return "other";
}

function toDtcg(vars: Map<string, string>, filter: (name: string) => boolean) {
  const tokens: Record<string, Token> = {};
  for (const [name, value] of vars) {
    if (!filter(name)) continue;
    // --ds-foundation-color-neutral-950 → "color-neutral-950"
    tokens[name.replace("--ds-foundation-", "").replace("--ds-semantic-", "")] = {
      $value: value,
      $type: typeOf(value),
    };
  }
  return tokens;
}

// Split the stylesheet into its top-level blocks.
const blocks = new Map<string, string>(); // ":root" | ".dark" → body
const re = /(^|\n)(:root|\.dark)\s*\{/g;
let match: RegExpExecArray | null;
const matches: Array<{ selector: string; start: number }> = [];
while ((match = re.exec(CSS)) !== null) {
  matches.push({ selector: match[2], start: match.index + match[1].length });
}
for (let i = 0; i < matches.length; i++) {
  const open = CSS.indexOf("{", matches[i].start);
  let depth = 1;
  let cursor = open + 1;
  while (cursor < CSS.length && depth > 0) {
    if (CSS[cursor] === "{") depth += 1;
    else if (CSS[cursor] === "}") depth -= 1;
    cursor += 1;
  }
  if (!blocks.has(matches[i].selector)) {
    blocks.set(matches[i].selector, "");
  }
  blocks.set(
    matches[i].selector,
    blocks.get(matches[i].selector) + "\n" + CSS.slice(open + 1, cursor - 1),
  );
}

const rootVars = parseBlock(blocks.get(":root") ?? "");
const darkOverrides = parseBlock(blocks.get(".dark") ?? "");

const foundation = toDtcg(rootVars, (name) =>
  name.startsWith("--ds-foundation-"),
);
const semanticLight = toDtcg(
  rootVars,
  (name) => name.startsWith("--ds-semantic-") && !name.endsWith("-dark"),
);
const semanticFixedDark = toDtcg(rootVars, (name) =>
  name.startsWith("--ds-semantic-") && name.endsWith("-dark"),
);

// Invariant check: every .dark override must match its fixed -dark twin.
let mismatches = 0;
for (const [name, value] of darkOverrides) {
  const fixed = `--ds-semantic-${name.replace("--ds-semantic-", "")}-dark`;
  const fixedValue = rootVars.get(fixed);
  if (fixedValue === undefined) continue; // shadcn-only bindings etc.
  if (fixedValue !== value) {
    console.warn(
      `⚠ ${name} (.dark override ${value}) ≠ ${fixed} (${fixedValue})`,
    );
    mismatches += 1;
  }
}

mkdirSync("./dtcg", { recursive: true });
writeFileSync(
  "./dtcg/foundation.tokens.json",
  JSON.stringify(
    { $schema: "https://designtokens.org/tr/drafts/format/", foundation },
    null,
    2,
  ) + "\n",
);
writeFileSync(
  "./dtcg/semantic.tokens.json",
  JSON.stringify(
    {
      $schema: "https://designtokens.org/tr/drafts/format/",
      semantic: { light: semanticLight, fixedDark: semanticFixedDark },
    },
    null,
    2,
  ) + "\n",
);

console.log(
  `Exported ${Object.keys(foundation).length} foundation + ${
    Object.keys(semanticLight).length
  } semantic (light) + ${Object.keys(semanticFixedDark).length} semantic (fixed dark) tokens to ./dtcg/`,
);
if (mismatches > 0) {
  console.warn(`⚠ ${mismatches} .dark override mismatch(es) — review globals.css`);
}
