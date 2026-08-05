import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  headingId,
  isRenderableImageHost,
  renderableImageHosts,
  resolveImageUrl,
  resolveUrl,
  toRawContentUrl,
} from "./markdown-url";

const BASE = "https://raw.githubusercontent.com/acme/widget/main/";

/**
 * URL policy for rendered README content — the security boundary of the
 * markdown feature. A README is written by whoever owns the repository, so
 * every href and src on this page originates outside this codebase.
 */

describe("resolveUrl", () => {
  it("resolves a relative path against the repository's raw base", () => {
    expect(resolveUrl("./docs/setup.md", BASE)).toBe(
      "https://raw.githubusercontent.com/acme/widget/main/docs/setup.md",
    );
    expect(resolveUrl("assets/logo.png", BASE)).toBe(
      "https://raw.githubusercontent.com/acme/widget/main/assets/logo.png",
    );
  });

  it("leaves an absolute URL alone", () => {
    expect(resolveUrl("https://example.com/x", BASE)).toBe("https://example.com/x");
  });

  it("allows mailto, which READMEs legitimately use for contact links", () => {
    expect(resolveUrl("mailto:hi@example.com", BASE)).toBe("mailto:hi@example.com");
  });

  /**
   * The allowlist's whole purpose. A blocklist loses to case variation and to
   * whitespace inside the scheme; three permitted protocols cannot be talked
   * around.
   */
  it.each([
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "data:text/html;base64,PHNjcmlwdD4=",
    "vbscript:msgbox(1)",
    "file:///etc/passwd",
  ])("rejects %s", (hostile) => {
    expect(resolveUrl(hostile, BASE)).toBeNull();
  });

  it("returns null for an in-page anchor, whose target ids are not GitHub's", () => {
    expect(resolveUrl("#installation", BASE)).toBeNull();
  });

  it("returns null for empty or whitespace input rather than a bare base URL", () => {
    expect(resolveUrl("", BASE)).toBeNull();
    expect(resolveUrl("   ", BASE)).toBeNull();
  });
});

describe("toRawContentUrl", () => {
  it("rewrites a github.com blob URL into raw content", () => {
    expect(toRawContentUrl("https://github.com/acme/widget/blob/main/logo.png")).toBe(
      "https://raw.githubusercontent.com/acme/widget/main/logo.png",
    );
  });

  it("leaves other github.com URLs untouched", () => {
    const releases = "https://github.com/acme/widget/releases";
    expect(toRawContentUrl(releases)).toBe(releases);
  });

  it("leaves non-github hosts untouched", () => {
    expect(toRawContentUrl("https://example.com/a.png")).toBe("https://example.com/a.png");
  });
});

describe("resolveImageUrl", () => {
  it("accepts an allowlisted host", () => {
    expect(resolveImageUrl("https://img.shields.io/badge/build-passing-green.svg", BASE)).toBe(
      "https://img.shields.io/badge/build-passing-green.svg",
    );
  });

  /**
   * Not merely a rendering preference: an unrestricted host list turns this
   * site's image optimiser into an open proxy for arbitrary remote fetches.
   */
  it("rejects a host that is not on the allowlist", () => {
    expect(resolveImageUrl("https://evil.example.com/tracker.gif", BASE)).toBeNull();
  });

  it("rejects a hostile scheme before host checking even applies", () => {
    expect(resolveImageUrl("javascript:alert(1)", BASE)).toBeNull();
  });

  it("rebases a relative image onto raw content, which is allowlisted", () => {
    expect(resolveImageUrl("./docs/screenshot.png", BASE)).toBe(
      "https://raw.githubusercontent.com/acme/widget/main/docs/screenshot.png",
    );
  });
});

describe("isRenderableImageHost", () => {
  it("matches case-insensitively", () => {
    expect(isRenderableImageHost("RAW.GithubUserContent.com")).toBe(true);
  });

  it("does not match a lookalike subdomain", () => {
    // `raw.githubusercontent.com.evil.test` must not pass — the check is
    // equality, never a suffix test.
    expect(isRenderableImageHost("raw.githubusercontent.com.evil.test")).toBe(false);
  });
});

/**
 * The two lists that must agree.
 *
 * `next.config.ts` decides which hosts the optimizer will fetch; this module
 * decides which the renderer will emit an `<Image>` for. A host in the
 * renderer's list but not the config's throws at render time and breaks the
 * page; the reverse silently widens the proxy's reach.
 */
describe("host allowlist parity with next.config.ts", () => {
  it("lists exactly the hosts configured for next/image", () => {
    // `process.cwd()` rather than `import.meta.url`: Vite rewrites the
    // `new URL(<literal>, import.meta.url)` pattern at transform time and a
    // path that climbs out of the source tree comes back as a dev-server URL.
    // Vitest's `root` is this app, so cwd is stable.
    const config = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");

    const block = /const GITHUB_IMAGE_HOSTS = \[([\s\S]*?)\];/.exec(config);
    expect(block, "GITHUB_IMAGE_HOSTS not found in next.config.ts").not.toBeNull();

    const configured = [...(block![1] ?? "").matchAll(/"([^"]+)"/g)].map((match) => match[1]);
    expect([...configured].sort()).toEqual([...renderableImageHosts()].sort());
  });
});

describe("headingId", () => {
  it("slugs text into a URL-safe id", () => {
    expect(headingId("Getting Started!", new Map())).toBe("getting-started");
  });

  /**
   * Two "Usage" headings in one README is ordinary. Without the counter both
   * anchors get the same id and the contents list sends every click to the
   * first one.
   */
  it("disambiguates repeated headings", () => {
    const seen = new Map<string, number>();
    expect(headingId("Usage", seen)).toBe("usage");
    expect(headingId("Usage", seen)).toBe("usage-2");
    expect(headingId("Usage", seen)).toBe("usage-3");
  });

  it("falls back to a usable id when the text slugs to nothing", () => {
    expect(headingId("🚀 ✨", new Map())).toBe("section");
  });
});
