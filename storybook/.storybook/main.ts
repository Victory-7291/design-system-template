import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";

const storybookConfigDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx|mdx)"],
  staticDirs: ["../../public", "../public"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  viteFinal: async (baseConfig) =>
    mergeConfig(baseConfig, {
      plugins: [tailwindcss()],
      optimizeDeps: { include: ["react", "react-dom"] },
      resolve: {
        dedupe: ["react", "react-dom"],
        alias: {
          "@": path.resolve(storybookConfigDir, "../../src"),
        },
      },
    }),
};

export default config;
