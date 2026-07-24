import { defineConfig, mergeConfig } from "vitest/config";
import { baseVitestConfig } from "@trady-perch/config/vitest";

export default mergeConfig(
  defineConfig(baseVitestConfig),
  defineConfig({
    test: {
      include: ["src/**/*.test.{ts,tsx}"],
    },
  }),
);
