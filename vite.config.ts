import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // CRITICAL: This ensures kleancode.tech finds your files
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
