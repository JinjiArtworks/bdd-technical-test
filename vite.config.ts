import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const basenameProd = "/react-shadcn-starter/"; // Ensure it ends with "/"

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? basenameProd : "/", // Ensure "/" in dev mode
    build: {
      outDir: "dist", // Vercel serves from "dist"
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: {
        basename: isProd ? basenameProd : "/",
      },
    },
  };
});
