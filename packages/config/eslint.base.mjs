// Shared ESLint flat-config base. Consuming packages/apps spread this array
// into their own eslint.config.mjs and append framework-specific configs
// (e.g. eslint-config-next) on top.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

/**
 * Core rules only — no plugin registration for react-hooks/jsx-a11y here,
 * since a consumer that also extends eslint-config-next (which registers
 * both plugins itself) would otherwise collide on the same plugin key
 * ("Cannot redefine plugin"). Non-Next consumers should also spread
 * `a11yAndHooksConfig` below; Next.js apps get both from eslint-config-next.
 * @type {import("eslint").Linter.Config[]}
 */
export const baseConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Product Implementation Constitution Ch.12 §3: no untyped escape hatch.
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    ignores: ["dist/**", ".next/**", "node_modules/**", "out/**"],
  },
];

/**
 * React Hooks + JSX a11y rules for packages that do NOT already extend
 * eslint-config-next (e.g. packages/ui, which is framework-agnostic).
 * @type {import("eslint").Linter.Config[]}
 */
export const a11yAndHooksConfig = [
  {
    plugins: {
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
  },
];

export default baseConfig;
