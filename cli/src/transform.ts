import { readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { PackageManagerName } from "nypm";

export type TemplateMode = "standalone" | "package";

export interface TransformOptions {
  projectDir: string;
  projectName: string;
  mode: TemplateMode;
  packageManager: PackageManagerName;
}

export const transformProject = async ({
  projectDir,
  projectName,
  mode,
  packageManager,
}: TransformOptions): Promise<void> => {
  const packageJsonPath = join(projectDir, "package.json");
  const packageJsonRaw = await readFile(packageJsonPath, "utf-8");
  const pkg = JSON.parse(packageJsonRaw);

  // Set project name & initial version
  pkg.name = projectName;
  pkg.version = "0.1.0";
  pkg.private = true;

  // Clean out template maintainer scripts
  if (pkg.scripts) {
    delete pkg.scripts.changeset;
    delete pkg.scripts["version-packages"];
    delete pkg.scripts.release;
    delete pkg.scripts["build:cli"];
  }

  // Update package manager field
  if (packageManager === "bun") {
    pkg.packageManager = "bun@1.3.5";
  } else if (packageManager === "pnpm") {
    pkg.packageManager = "pnpm@10.5.0";
  } else if (packageManager === "npm") {
    pkg.packageManager = "npm@10.8.0";
  } else if (packageManager === "yarn") {
    pkg.packageManager = "yarn@1.22.22";
  }

  if (mode === "package") {
    // Mode 2: Monorepo Shared Package
    pkg.description = "Shared anti-slop Tailwind CSS v4 design system package";
    pkg.exports = {
      ".": "./src/main.tsx",
      "./components/*": "./src/components/ui/*",
      "./styles.css": "./src/index.css",
      "./motion.css": "./src/motion-tokens.css",
    };

    // Remove standalone application host files
    await rm(join(projectDir, "index.html"), { force: true });
  } else {
    // Mode 1: Standalone Application
    pkg.description = "Autonomous anti-slop Tailwind CSS v4 design system application";
  }

  // Write formatted package.json
  await writeFile(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
};
