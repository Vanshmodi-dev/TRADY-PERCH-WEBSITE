import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Vitest's `globals` mode is intentionally off (explicit imports are
// preferred, see eslint config) — so Testing Library's auto-cleanup, which
// relies on a global `afterEach`, is wired up explicitly here instead.
afterEach(() => {
  cleanup();
});
