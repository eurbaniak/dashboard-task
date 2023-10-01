import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@interfaces": path.resolve(__dirname, "src/utils/types"),
      "@mock": path.resolve(__dirname, "src/mock"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
});
