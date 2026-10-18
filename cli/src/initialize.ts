import { basename, join, relative, resolve } from "node:path";
import {
  cancel,
  intro,
  isCancel,
  log,
  outro,
  select,
  spinner,
  text,
} from "@clack/prompts";
import type { PackageManagerName } from "nypm";
import { cleanupInternalContent } from "./cleanup.js";
import { download } from "./download.js";
import { type TemplateMode, transformProject } from "./transform.js";
import {
  detectPM,
  installDependencies,
  run,
  supportedPackageManagers,
} from "./utils.js";

export interface InitializeOptions {
  name?: string;
  mode?: TemplateMode;
  packageManager?: PackageManagerName;
  pm?: PackageManagerName;
  path?: string;
  dir?: string;
  disableGit?: boolean;
  skipInstall?: boolean;
  branch?: string;
}

const resolveProjectDirectory = (
  cwd: string,
  parentOrFullPath: string,
  folderName: string
): string => {
  const trimmed = parentOrFullPath.trim().replace(/[/\\]+$/, "");
  if (!trimmed || trimmed === ".") {
    return resolve(cwd, folderName);
  }
  if (basename(trimmed) === folderName) {
    return resolve(cwd, trimmed);
  }
  return resolve(cwd, trimmed, folderName);
};

const getStandalonePath = async (): Promise<string> => {
  const value = await text({
    message: "Where should the design-system project be created?",
    placeholder: "./",
    defaultValue: "./",
    validate(val?: string) {
      if (!val || val.trim().length === 0) {
        return "Please enter a valid directory path.";
      }
    },
  });

  if (isCancel(value)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return value.trim();
};

const getPackagePath = async (): Promise<string> => {
  const value = await text({
    message: "Where should the package be created? (parent directory)",
    placeholder: "packages",
    defaultValue: "packages",
    validate(val?: string) {
      if (!val || val.trim().length === 0) {
        return "Please enter a valid directory path.";
      }
    },
  });

  if (isCancel(value)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return value.trim();
};

const getMode = async (): Promise<TemplateMode> => {
  const value = await select({
    message: "Select template mode:",
    options: [
      {
        value: "standalone" as TemplateMode,
        label: "Standalone Application (Next.js / Vite)",
        hint: "Complete app with live dev server, Storybook, and full quality gates",
      },
      {
        value: "package" as TemplateMode,
        label: "Monorepo Shared Package",
        hint: "Lightweight package for Turborepo/pnpm (e.g. @repo/design-system)",
      },
    ],
    initialValue: "standalone" as TemplateMode,
  });

  if (isCancel(value)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return value as TemplateMode;
};

const getPackageManager = async (
  detected: PackageManagerName
): Promise<PackageManagerName> => {
  const value = await select({
    message: "Which package manager would you like to use?",
    options: supportedPackageManagers.map((pm) => ({
      value: pm,
      label: pm,
      hint: pm === detected ? "detected" : undefined,
    })),
    initialValue: detected,
  });

  if (isCancel(value)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return value as PackageManagerName;
};

const initializeGit = (projectDir: string) => {
  try {
    run("git", ["init"], { cwd: projectDir });
    run("git", ["add", "-A"], { cwd: projectDir });
    run("git", ["commit", "-m", "chore: initial commit from create-design-system-template"], {
      cwd: projectDir,
    });
  } catch {
    // Git init is optional; silently ignore if git is not available
  }
};

export const initialize = async (
  targetArg?: string,
  options: InitializeOptions = {}
) => {
  try {
    intro("✨ Welcome to create-design-system-template!");

    const cwd = process.cwd();
    const mode = options.mode || (await getMode());

    let projectDir: string;
    let projectName: string;
    let displayDir: string;

    const inputPath = options.path || options.dir;

    if (mode === "standalone") {
      const explicitName = options.name || (targetArg && !targetArg.includes("/") && !targetArg.startsWith(".") ? targetArg : undefined);
      const folderName = explicitName || "design-system";

      let rawPath: string;
      if (inputPath) {
        rawPath = inputPath;
      } else if (targetArg && (targetArg.includes("/") || targetArg.startsWith("."))) {
        rawPath = targetArg;
      } else if (explicitName) {
        rawPath = "./";
      } else {
        rawPath = await getStandalonePath();
      }

      projectDir = resolveProjectDirectory(cwd, rawPath, folderName);
      projectName = explicitName || basename(projectDir);
      const rel = relative(cwd, projectDir);
      displayDir = rel && !rel.startsWith("..") ? rel : projectDir;
    } else {
      // Mode: "package"
      let rawPath: string;
      if (inputPath) {
        rawPath = inputPath;
      } else if (targetArg && !targetArg.startsWith("@")) {
        rawPath = targetArg;
      } else {
        rawPath = await getPackagePath();
      }

      projectDir = resolveProjectDirectory(cwd, rawPath, "design-system");
      const rel = relative(cwd, projectDir);
      displayDir = rel && !rel.startsWith("..") ? rel : projectDir;

      if (options.name) {
        projectName = options.name;
      } else if (targetArg && targetArg.startsWith("@")) {
        projectName = targetArg;
      } else {
        const folderName = basename(projectDir);
        projectName = `@repo/${folderName}`;
      }
    }

    const detectedPM = await detectPM(cwd);
    const pmChoice = options.packageManager || options.pm;
    const packageManager =
      pmChoice ||
      (mode === "standalone" ? await getPackageManager(detectedPM) : detectedPM);

    if (!supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Unsupported package manager: ${packageManager}`);
    }

    const s = spinner();

    // 1. Download
    s.start("Downloading design system template from GitHub...");
    await download(projectDir, options.branch || "main");

    // 2. Cleanup maintainer files
    s.message("Cleaning template maintainer files...");
    await cleanupInternalContent(projectDir);

    // 3. Transform package.json
    s.message("Configuring project structure...");
    await transformProject({
      projectDir,
      projectName,
      mode,
      packageManager,
    });

    // 4. Install dependencies
    if (!options.skipInstall) {
      s.message(`Installing dependencies using ${packageManager}...`);
      await installDependencies(projectDir, packageManager);
    }

    // 5. Git repository initialization
    if (mode === "standalone" && !options.disableGit) {
      s.message("Initializing git repository...");
      initializeGit(projectDir);
    }

    s.stop("Design system template initialized successfully! 🎉");

    // Outro banner
    const runCmd = packageManager === "npm" ? "npm run" : packageManager;
    log.info(`Project created at: ${projectDir}`);

    if (mode === "standalone") {
      log.step("Next steps:");
      console.log(`  cd ${displayDir}`);
      console.log(`  ${runCmd} dev          # Start local Vite development server`);
      console.log(`  ${runCmd} storybook    # Open Storybook 10 component workshop`);
      console.log(`  ${runCmd} check        # Run 4 automated anti-slop token gates`);
    } else {
      log.step("Next steps for Monorepo package:");
      console.log(`  cd ${displayDir}`);
      console.log(`  ${runCmd} check        # Run quality and token governance checks`);
      console.log(`  ${runCmd} storybook    # Preview components in Storybook`);
      log.info(
        "CI workflows ship in this package's workflows/ folder (GitHub only runs .github/ at the repository root). Migrate them manually when ready:"
      );
      console.log("  mkdir -p .github/workflows");
      console.log(`  cp ${displayDir}/workflows/*.yml .github/workflows/`);
      console.log(
        "  # Optional: add paths: [packages/design-system/**] to shadcn-sync.yml push filters so sync PRs only fire for design-system changes"
      );
    }

    outro("Happy building with zero AI slop!");
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : `Failed to initialize project: ${error}`;

    log.error(message);
    process.exit(1);
  }
};
