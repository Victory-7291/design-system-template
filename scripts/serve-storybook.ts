import { serve } from "bun";
import path from "node:path";
import fs from "node:fs";

const STATIC_DIR = path.resolve(import.meta.dir, "../apps/storybook/dist");

if (!fs.existsSync(STATIC_DIR)) {
  console.error("Storybook static build not found in apps/storybook/dist. Please run 'bun run build' first.");
  process.exit(1);
}

const server = serve({
  port: 6006,
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = path.join(STATIC_DIR, decodeURIComponent(url.pathname));
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return new Response(Bun.file(filePath));
    }
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Storybook static server running at http://localhost:${server.port}`);
