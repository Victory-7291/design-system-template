// src/components/ui/ holds only shadcn/ui registry files, in stock upstream form.
// scripts/shadcn-stock.json records the sha256 of every file the shadcn CLI wrote; the injection / weekly sync regenerates it:
//   bunx shadcn@latest add $(cat scripts/shadcn-components.txt) --overwrite --yes
//   bun scripts/check-ui-stock.mjs --write
// Fails when ui/ contains a file outside the manifest, a manifest file is missing, or a file was edited.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const UI = resolve(ROOT, "src/components/ui");
const MANIFEST = resolve(ROOT, "scripts/shadcn-stock.json");
// Registry items may also write outside ui/ (the sidebar item writes this hook).
const EXTRA_REGISTRY_FILES = ["src/hooks/use-mobile.ts"];

const sha = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const rel = (file) => relative(ROOT, file).split("\\").join("/");

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function current() {
  const files = walk(UI).map(rel);
  for (const f of EXTRA_REGISTRY_FILES) if (existsSync(resolve(ROOT, f))) files.push(f);
  return Object.fromEntries(files.sort().map((f) => [f, sha(resolve(ROOT, f))]));
}

if (process.argv.includes("--write")) {
  const files = current();
  writeFileSync(MANIFEST, JSON.stringify({ source: "shadcn@latest registry, new-york / Tailwind v4 (components.json)", files }, null, 2) + "\n");
  console.log(`wrote ${rel(MANIFEST)} (${Object.keys(files).length} files)`);
  process.exit(0);
}

if (!existsSync(MANIFEST)) {
  console.error(`✗ ${rel(MANIFEST)} missing — run the injection, then bun scripts/check-ui-stock.mjs --write`);
  process.exit(1);
}
const expected = JSON.parse(readFileSync(MANIFEST, "utf8")).files;
const actual = current();
const problems = [];
for (const [f, h] of Object.entries(actual)) {
  if (!(f in expected)) problems.push(`${f}: not a shadcn/ui registry file — template and app components go in src/components/*.tsx`);
  else if (expected[f] !== h) problems.push(`${f}: modified — ui/ stays in stock upstream form; wrap or compose it outside ui/ instead`);
}
for (const f of Object.keys(expected)) if (!(f in actual)) problems.push(`${f}: missing — restore with bunx shadcn@latest add <name> --overwrite --yes`);

if (problems.length) {
  for (const p of problems) console.error(`✗ ${p}`);
  process.exit(1);
}
console.log(`✓ ${Object.keys(actual).length} shadcn/ui files match the stock manifest`);
