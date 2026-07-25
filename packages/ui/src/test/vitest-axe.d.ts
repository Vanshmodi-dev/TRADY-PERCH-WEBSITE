// vitest-axe@0.1.0 ships its own type augmentation (vitest-axe/extend-expect)
// written against an older Vitest major version's matcher-extension
// convention (a global `Vi.Assertion` namespace). This project's Vitest 4
// exposes that extension point differently — @vitest/expect's own
// `Matchers<T>` interface, designed for exactly this kind of consumer
// augmentation (see its source: `interface Matchers<T = any> {}`) — so it's
// augmented directly here instead of pulling in the package's incompatible
// bundled types. The runtime matcher itself (expect.extend, in
// packages/config/vitest.setup.ts) is unaffected; this file only restores
// the type for `expect(results).toHaveNoViolations()`.
export {};

declare module "@vitest/expect" {
  // `T` must stay in the parameter list — declaration merging requires
  // matching arity against the base `Matchers<T>` interface — even though
  // this one member doesn't reference it.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Matchers<T> {
    toHaveNoViolations(): void;
  }
}
