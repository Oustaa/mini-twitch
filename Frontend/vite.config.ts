import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Force a single React copy — required when consuming npm-linked
    // packages, otherwise each linked @kousta-ui/* package can resolve its
    // own nested react/react-dom and hooks break with "Invalid hook call".
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    // Don't pre-bundle/cache the linked packages — Vite's dep optimizer
    // otherwise snapshots them once and won't notice source rebuilds.
    exclude: [
      "@kousta-ui/components",
      "@kousta-ui/hooks",
      "@kousta-ui/table",
      "@kousta-ui/helpers",
    ],
  },
  server: {
    // Allow serving files from the symlink targets outside this project root.
    fs: { allow: [".."] },
  },
});
