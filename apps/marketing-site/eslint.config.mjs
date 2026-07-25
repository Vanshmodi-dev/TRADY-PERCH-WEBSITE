import { baseConfig } from "@trady-perch/config/eslint";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...baseConfig,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Standalone Node CLI tooling (e.g. the Ch.48 §2 integration-layer a11y
    // audit) — console output IS the product here, unlike application code.
    files: ["scripts/**/*.mjs"],
    rules: {
      "no-console": "off",
    },
  },
];

export default eslintConfig;
