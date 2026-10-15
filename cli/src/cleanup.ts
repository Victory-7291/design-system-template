import { rm } from "node:fs/promises";
import { join } from "node:path";

export const internalDirectories = [
  "cli",
  ".changeset",
  join("docs", "superpowers"),
];

export const internalFiles = [
  "CHANGELOG.md",
  join(".github", "workflows", "release.yml"),
];

export const cleanupInternalContent = async (projectDir: string): Promise<void> => {
  for (const dir of internalDirectories) {
    await rm(join(projectDir, dir), { recursive: true, force: true });
  }

  for (const file of internalFiles) {
    await rm(join(projectDir, file), { force: true });
  }
};
