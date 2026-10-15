import { type SpawnSyncOptions, spawnSync } from "node:child_process";
import {
  detectPackageManager,
  installDependencies as nypmInstallDependencies,
  type PackageManagerName,
} from "nypm";

export const GITHUB_REPO = "Victory-7291/design-system-template";
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

export const supportedPackageManagers: PackageManagerName[] = [
  "bun",
  "pnpm",
  "npm",
  "yarn",
];

const isWindows = process.platform === "win32";

export const run = (
  command: string,
  args: string[],
  options?: SpawnSyncOptions
) => {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: isWindows,
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const stderr = result.stderr?.toString().trim();
    const message = stderr
      ? `Command failed: ${command} ${args.join(" ")}\n${stderr}`
      : `Command failed with exit code ${result.status}: ${command} ${args.join(" ")}`;
    throw new Error(message);
  }

  return result;
};

export const detectPM = async (cwd: string): Promise<PackageManagerName> => {
  try {
    const detected = await detectPackageManager(cwd);
    if (detected && supportedPackageManagers.includes(detected.name)) {
      return detected.name;
    }
  } catch {
    // fallback
  }
  return "bun";
};

export const installDependencies = async (
  cwd: string,
  packageManager: PackageManagerName
) => {
  await nypmInstallDependencies({
    cwd,
    packageManager: { name: packageManager, command: packageManager },
    silent: true,
  });
};
