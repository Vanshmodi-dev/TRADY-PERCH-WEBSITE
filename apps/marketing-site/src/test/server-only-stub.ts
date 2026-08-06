/**
 * Test-environment stand-in for the `server-only` package.
 *
 * The real package throws the moment it is imported outside a React Server
 * Component graph — that throw is the guardrail keeping the GitHub token out
 * of the client bundle. Vitest runs under plain Node with no `react-server`
 * export condition, so it would trip that guardrail on every service-layer
 * test.
 *
 * Aliased in `vitest.config.ts` only. Production builds resolve the real
 * package, so nothing about the guarantee changes; and
 * `features/projects/github-api.test.ts` asserts the `import "server-only"`
 * line is still present in the source, so this stub cannot mask its removal.
 */
export {};
