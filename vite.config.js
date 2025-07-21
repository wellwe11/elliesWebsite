import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/abstract/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@functions": path.resolve(__dirname, "src/abstract/functions"),
    },
  },
});
