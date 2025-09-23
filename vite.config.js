import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/abstract/components"),
      "@fullyComponents": path.resolve(
        __dirname,
        "src/abstract/fullyComponents"
      ),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@functions": path.resolve(__dirname, "src/abstract/functions"),
      "@hooks": path.resolve(__dirname, "src/abstract/hooks"),
    },
  },
});
