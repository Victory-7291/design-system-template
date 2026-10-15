import { program } from "commander";
import { initialize } from "./initialize.js";

program
  .name("create-design-system-template")
  .description("Official CLI to scaffold an autonomous anti-slop Tailwind CSS v4 design system")
  .argument("[target]", "Target directory path or project name")
  .option("-n, --name <name>", "Project or package name")
  .option("-p, --path <path>", "Destination directory path where design-system is stored")
  .option("-d, --dir <dir>", "Alias for --path")
  .option("-m, --mode <mode>", "Template mode: 'standalone' or 'package'")
  .option(
    "--pm, --package-manager <manager>",
    "Package manager to use (bun, pnpm, npm, yarn)"
  )
  .option("--disable-git", "Skip git repository initialization")
  .option("--skip-install", "Skip automatic dependency installation")
  .option("--branch <branch>", "Git branch or tag to download (default: main)")
  .action((target, options) => {
    initialize(target, options);
  });

program
  .command("init")
  .description("Initialize a new design system project (alias to root command)")
  .argument("[target]", "Target directory path or project name")
  .option("-n, --name <name>", "Project or package name")
  .option("-p, --path <path>", "Destination directory path where design-system is stored")
  .option("-d, --dir <dir>", "Alias for --path")
  .option("-m, --mode <mode>", "Template mode: 'standalone' or 'package'")
  .option(
    "--pm, --package-manager <manager>",
    "Package manager to use (bun, pnpm, npm, yarn)"
  )
  .option("--disable-git", "Skip git repository initialization")
  .option("--skip-install", "Skip automatic dependency installation")
  .option("--branch <branch>", "Git branch or tag to download (default: main)")
  .action((target, options) => {
    initialize(target, options);
  });

program.parse(process.argv);
