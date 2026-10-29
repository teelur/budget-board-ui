import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.DOCS_BASE_PATH ?? "/",
  root: resolve(import.meta.dirname, "docs"),
  plugins: [react()],
  server: {
    port: 5150,
  },
  build: {
    outDir: resolve(import.meta.dirname, "docs-dist"),
    emptyOutDir: true,
  },
});
