import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vitest/config";
import { baseVitestConfig } from "@trady-perch/config/vitest";

export default mergeConfig(
  defineConfig(baseVitestConfig),
  defineConfig({
    test: {
      include: ["src/**/*.test.{ts,tsx}"],
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  }),
);
