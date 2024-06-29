import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import assert from "node:assert";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  };

  assert.strict(process.env.VITE_DEV_PORT, "VITE_DEV_PORT is required");

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      vanillaExtractPlugin(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true
        }
      }),
      visualizer({
        filename: "./dist/stats.html",
        open: true
      })
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          }
        }
      },
      chunkSizeWarningLimit: 500
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts"]
    },
    server: {
      host: true,
      port: parseInt(process.env.VITE_DEV_PORT)
    }
  };
});
