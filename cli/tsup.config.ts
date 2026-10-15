import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "node18",
  clean: true,
  minify: true,
  dts: false,
  banner: {
    js: "#!/usr/bin/env node",
  },
});
