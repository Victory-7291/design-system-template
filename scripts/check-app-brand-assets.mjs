import fs from "node:fs";
import path from "node:path";
import { validateManifest } from "./app-brand-validation.mjs";

const root = process.cwd();
const publicDir = fs.existsSync(path.join(root, "public")) ? path.join(root, "public") : path.join(root, "ui/public");
const manifest = JSON.parse(fs.readFileSync(path.join(publicDir, "brands/apps/manifest.json"), "utf8"));
const count = validateManifest(manifest, (asset) => fs.readFileSync(path.join(publicDir, asset)));
console.log(`Validated ${count} brand identities: local paths, aliases and artwork safety.`);
