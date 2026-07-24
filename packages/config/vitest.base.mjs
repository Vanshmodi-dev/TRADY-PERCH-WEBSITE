// Shared Vitest config. Consuming packages spread this into their own
// vitest.config.ts via `mergeConfig`.
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

/** @type {import("vitest/config").UserConfig} */
export const baseVitestConfig = {
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: [fileURLToPath(new URL("./vitest.setup.ts", import.meta.url))],
    css: false,
  },
};

export default baseVitestConfig;
