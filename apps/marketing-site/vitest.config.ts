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
        /**
         * `server-only` throws on import by design — that is the entire point
         * of the package, and it is what makes importing
         * `features/projects/github-api.ts` from a client component a build
         * error rather than a token leak.
         *
         * Vitest is neither environment: it runs under Node without the
         * `react-server` export condition, so the package resolves to its
         * throwing entry point and any test touching the service layer would
         * fail on import alone. Stubbing it to an empty module here restores
         * testability without weakening the guarantee — the real build still
         * resolves the real package, and `github-api.test.ts` separately
         * asserts that the `server-only` marker is present in the source.
         */
        "server-only": fileURLToPath(new URL("./src/test/server-only-stub.ts", import.meta.url)),
      },
    },
  }),
);
