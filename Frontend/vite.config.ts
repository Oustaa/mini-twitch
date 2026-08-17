import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@features": path.resolve(import.meta.dirname, "src/features"),
      "@hooks": path.resolve(import.meta.dirname, "src/hooks"),
      "@store": path.resolve(import.meta.dirname, "src/store"),
      "@components": path.resolve(import.meta.dirname, "src/components"),
      "@utils": path.resolve(import.meta.dirname, "src/utils"),
      "@pages": path.resolve(import.meta.dirname, "src/pages"),
      "@type": path.resolve(import.meta.dirname, "src/types"),
    },
  },
  optimizeDeps: {
    exclude: [
      "@kousta-ui/components",
      "@kousta-ui/hooks",
      "@kousta-ui/table",
      "@kousta-ui/helpers",
    ],
  },
  server: {
    fs: { allow: [".."] },
  },
});
