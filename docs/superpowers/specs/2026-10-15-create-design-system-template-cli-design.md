# create-design-system-template CLI Design Specification

- **Date:** 2026-10-15
- **Status:** Approved (Ready for Implementation Planning)
- **Package Name:** `create-design-system-template`
- **Target Repository:** `Victory-7291/design-system-template`
- **Reference Standard:** `vercel/next-forge` CLI Architecture

---

## 1. Executive Summary & Intent

### 1.1 Problem Statement
The `design-system-template` repository is an autonomous, production-grade anti-slop Tailwind CSS v4 design system. Previously, developers integrated this template via manual `git clone` or copying files, which introduces unwanted Git commit history, proprietary internal maintenance configurations (such as release workflows and changesets), and tedious manual setup steps.

### 1.2 Objective
Deliver an official, zero-friction scaffolding CLI (`create-design-system-template`) adhering to the exact engineering and UX standards of `vercel/next-forge`. 
Developers will be able to scaffold a fresh project in seconds with:
```bash
# Interactive mode
npx create-design-system-template

# Command-line arguments mode (one-shot execution)
npx create-design-system-template my-design-system --mode standalone --package-manager bun
npm create design-system-template my-design-system
```

---

## 2. Package Architecture & Code Layout

The CLI is maintained directly inside the root repository under a dedicated `cli/` directory, co-located for tight coordination while maintaining absolute isolation from the template payload itself.

### 2.1 File Organization
```text
design-system-template/
├── cli/
│   ├── package.json          # Package definition for "create-design-system-template"
│   ├── tsconfig.json         # Node.js ESM TypeScript configuration
│   ├── tsup.config.ts        # Bundler configuration (bundles to dist/index.js)
│   ├── src/
│   │   ├── index.ts          # CLI entry point, commander definitions, banner
│   │   ├── initialize.ts     # Main orchestrator (prompts, download, transform, install, git)
│   │   ├── download.ts       # giget template download engine + git clone fallback
│   │   ├── transform.ts      # Template post-processing for Standalone vs. Monorepo modes
│   │   ├── cleanup.ts        # Removal of internal maintenance files (cli/, .changeset, etc.)
│   │   └── utils.ts          # Shell execution, package manager detection (nypm), logging
│   └── README.md             # Public NPM documentation for create-design-system-template
├── package.json              # Template root package.json, with script "build:cli"
└── ...                       # Design system source files
```

### 2.2 CLI Dependencies
To match `next-forge` with modern lightweight standards:
* **`@clack/prompts` (`^1.1.0`)**: Terminal UI prompts with modern spinners, selects, and text inputs.
* **`commander` (`^14.0.3`)**: Command-line flag and argument parsing.
* **`giget` (`^3.3.1`)**: Direct HTTPS GitHub tarball extraction without requiring local Git installation.
* **`nypm` (`^0.6.5`)**: Automatic package manager detection and cross-manager execution (`bun`, `pnpm`, `npm`, `yarn`).
* **`tsup` (`^8.5.1`)** *(dev)*: Fast ESBuild bundler compiling `cli/src/index.ts` into a standalone, minified, executable `cli/dist/index.js` file with `#!/usr/bin/env node` shebang.

---

## 3. CLI Command Interface & UX Specification

### 3.1 Invocation Patterns
The CLI seamlessly supports both positional arguments and interactive input:

1. **Positional Argument & Flags (Non-Interactive / CI)**:
   ```bash
   npx create-design-system-template [name] [options]
   # Examples:
   npx create-design-system-template my-app --mode standalone --package-manager bun
   npx create-design-system-template @repo/design-system --mode package --package-manager pnpm --dir packages/design-system
   ```
2. **Interactive Prompts (Developer Guided)**:
   When arguments or flags are omitted, `@clack/prompts` triggers an intuitive questionnaire:
   - **Project Name (`text`)**: Prompts for destination folder and project name (Default: `my-design-system`).
   - **Template Mode (`select`)**:
     * `Standalone Application (Next.js / Vite)`: Complete autonomous app with UI components, Storybook 10, quality gates, and live dev server.
     * `Monorepo Shared Package`: Lightweight library package designed for Turborepo / pnpm workspaces (e.g., `@repo/design-system`).
   - **Package Manager (`select`)**: Auto-detected via `nypm`, defaults to `bun`, options: `bun`, `pnpm`, `npm`, `yarn`.
   - **Initialize Git (`select` or flag)**: Defaults to `Yes` (skipped if in monorepo package mode).
   - **Install Dependencies (`select` or flag)**: Defaults to `Yes`.

### 3.2 Command Options (Commander)
```typescript
program
  .name("create-design-system-template")
  .description("Scaffold an autonomous, anti-slop Tailwind CSS v4 design system")
  .argument("[name]", "Project or directory name")
  .option("-m, --mode <mode>", "Template mode: 'standalone' or 'package'")
  .option("-p, --package-manager <manager>", "Package manager (bun, pnpm, npm, yarn)")
  .option("-d, --dir <directory>", "Target directory path")
  .option("--disable-git", "Skip git repository initialization")
  .option("--skip-install", "Skip automated dependency installation")
  .option("--branch <branch>", "Git branch or tag to fetch (default: main)");
```

---

## 4. Dual Initialization Modes Specification

### 4.1 Mode 1: Standalone Application Starter (`--mode standalone`)
* **Use Case**: Starting a brand-new application or a standalone design system showcase.
* **Output Structure**:
  * Full application workspace with `index.html`, Vite / Next dev server, Storybook 10.
  * Retains all 4 automated Anti-Slop token quality gates (`check:tokens`, `check:brand`, `check:a11y`, `check`).
  * Retains full Vitest test suite (59 unit tests) and local Inter Variable fonts.
* **Transformations**:
  * Updates `package.json` with user-defined `"name": "<projectName>"`.
  * Resets `"version": "0.1.0"`.
  * Retains private flag `"private": true`.
  * Runs fresh `git init`, `git add -A`, and `git commit -m "chore: initial commit from create-design-system-template"`.

### 4.2 Mode 2: Monorepo Shared Package (`--mode package`)
* **Use Case**: Injecting a shared design system package into an existing or new Turborepo / pnpm monorepo (identical to `next-forge/packages/design-system`).
* **Output Structure**:
  * Strips standalone application shell files (removes `index.html`, root dev server configurations).
  * Retains all 26+ Radix/CVA UI primitives (`src/components/ui/*`), OKLCH design tokens (`src/index.css`), motion tokens (`src/motion-tokens.css`), local variable fonts, and quality validation gates.
  * Preserves Storybook workshop configuration (`storybook/`) for package-level previewing.
* **Transformations**:
  * Sets `"name": "<projectName>"` (e.g. `@repo/design-system`).
  * Adjusts `"exports"` to export package entrypoints:
    ```json
    "exports": {
      ".": "./src/main.tsx",
      "./components/*": "./src/components/ui/*",
      "./styles.css": "./src/index.css"
    }
    ```
  * Omits `git init` to prevent creating a nested repository inside an existing monorepo.

---

## 5. Template Extraction & Post-Processing Pipeline

The execution pipeline follows 6 strict lifecycle phases:

```text
[Phase 1: Input Resolution] -> Resolve args/flags or prompt interactively via @clack/prompts
[Phase 2: Remote Download]  -> giget downloads Victory-7291/design-system-template (fallback: git clone)
[Phase 3: Deep Cleansing]   -> Purge cli/, .changeset/, .github/workflows/release.yml, CHANGELOG.md
[Phase 4: Transformation]   -> Apply Mode 1 (Standalone) or Mode 2 (Monorepo Package) package.json rules
[Phase 5: Dependencies]     -> Run <pm> install via nypm (unless --skip-install)
[Phase 6: Finalization]     -> Git init (if standalone), display outro banner with next steps
```

### 5.1 Internal File Cleansing Rules
To guarantee zero residue of template maintainer configurations, the following paths are unconditionally deleted from the created project:
* `cli/` (CLI source and dist)
* `.changeset/` (Changesets configuration)
* `CHANGELOG.md`
* `.github/workflows/release.yml`
* `docs/superpowers/` (Internal specifications)

---

## 6. Build, Publishing & Verification Strategy

### 6.1 Building the CLI
* Root `package.json` provides a convenience script:
  ```json
  "build:cli": "cd cli && bun run build"
  ```
* `cli/tsup.config.ts`:
  ```typescript
  import { defineConfig } from "tsup";

  export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm"],
    target: "node18",
    clean: true,
    minify: true,
    banner: {
      js: "#!/usr/bin/env node",
    },
  });
  ```

### 6.2 Testing Strategy
1. **Local Linking Test**:
   Execute `cd cli && bun link` followed by `bun create-design-system-template test-standalone --mode standalone --skip-install`.
2. **Quality Gates Verification**:
   Inside the generated `test-standalone`, run `bun run check` to verify that all 4 token quality gates and WCAG 2.1 AA contrast checks pass cleanly.
3. **Monorepo Package Verification**:
   Execute `bun create-design-system-template @repo/design-system --mode package --skip-install`, verify `package.json` exports and lack of standalone shell files.
4. **End-to-End Build**:
   Verify `bun run build` and `bun run build-storybook` in generated outputs.
