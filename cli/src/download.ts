import { rm } from "node:fs/promises";
import { join } from "node:path";
import { downloadTemplate } from "giget";
import { GITHUB_REPO, GITHUB_URL, run } from "./utils.js";

export const download = async (
  targetDir: string,
  branch = "main"
): Promise<void> => {
  const templateSource = `github:${GITHUB_REPO}#${branch}`;

  try {
    await downloadTemplate(templateSource, {
      dir: targetDir,
      force: true,
      preferOffline: false,
    });
  } catch (err) {
    // Graceful fallback to git clone
    run("git", [
      "clone",
      "--depth",
      "1",
      "-b",
      branch,
      `${GITHUB_URL}.git`,
      targetDir,
    ]);
  }

  // Ensure any cloned .git directory is removed
  const gitDir = join(targetDir, ".git");
  await rm(gitDir, { recursive: true, force: true });
};
