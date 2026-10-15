import { program } from "commander";
import { initialize } from "./initialize.js";

program
  .name("create-design-system-template")
  .description("Official CLI to scaffold an autonomous anti-slop Tailwind CSS v4 design system")
  .argument("[name]", "Project name or destination directory")
  .option("-m, --mode <mode>", "Template mode: 'standalone' or 'package'")
  .option(
    "-p, --package-manager <manager>",
    "Package manager to use (bun, pnpm, npm, yarn)"
  )
  .option("-d, --dir <dir>", "Custom destination directory path")
  .option("--disable-git", "Skip git repository initialization")
  .option("--skip-install", "Skip automatic dependency installation")
  .option("--branch <branch>", "Git branch or tag to download (default: main)")
  .action((name, options) => {
    initialize(name, options);
  });

program
  .command("init")
  .description("Initialize a new design system project (alias to root command)")
  .argument("[name]", "Project name or destination directory")
  .option("-m, --mode <mode>", "Template mode: 'standalone' or 'package'")
  .option(
    "-p, --package-manager <manager>",
    "Package manager to use (bun, pnpm, npm, yarn)"
  )
  .option("-d, --dir <dir>", "Custom destination directory path")
  .option("--disable-git", "Skip git repository initialization")
  .option("--skip-install", "Skip automatic dependency installation")
  .option("--branch <branch>", "Git branch or tag to download (default: main)")
  .action((name, options) => {
    initialize(name, options);
  });

program.parse(process.argv);
