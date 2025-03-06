import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    base: "/", // Vercel does NOT need a subdirectory base path
    build: {
      outDir: "dist", // Ensure it's "dist" (default for Vercel)
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
