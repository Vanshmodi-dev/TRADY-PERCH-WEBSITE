import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { repositoryPayload } from "@/test/project-fixtures";

/**
 * `env` is captured at module-import time, so every test here re-imports the
 * module graph after setting `process.env`. `vi.resetModules()` in
 * `beforeEach` is what makes that re-import actually re-evaluate rather than
 * hand back the cached instance from the previous test.
 */
async function loadApi(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return import("./github-api");
}

function repoPayload(overrides: Record<string, unknown> = {}) {
  return repositoryPayload({ name: "example-website", ...overrides });
}

function jsonResponse(body: unknown, init: { status?: number; headers?: Record<string, string> } = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { "content-type": "application/json", ...init.headers },
  });
}

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  // Server-side diagnostics are deliberate here (a misconfigured token must
  // be loud in production logs), so they are silenced rather than asserted
  // away — except where a test explicitly checks one.
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  process.env = { ...ORIGINAL_ENV };
});

describe("fetchRepositories", () => {
  it("returns 'not-configured' without issuing a request when no username is set", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const { fetchRepositories } = await loadApi({
      MARKETING_SITE_GITHUB_USERNAME: undefined,
      MARKETING_SITE_GITHUB_TOKEN: undefined,
    });

    expect(await fetchRepositories()).toEqual({ status: "error", reason: "not-configured" });
    // The point of the guard: no wasted request against `/users/undefined`.
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("sends a bearer token and the pinned API version when configured", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(jsonResponse([repoPayload()]));
    vi.stubGlobal("fetch", fetchSpy);

    const { fetchRepositories } = await loadApi({
      MARKETING_SITE_GITHUB_USERNAME: "acme",
      MARKETING_SITE_GITHUB_TOKEN: "ghp_test",
    });
    await fetchRepositories();

    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer ghp_test");
    expect(headers["X-GitHub-Api-Version"]).toBe("2022-11-28");
    expect(headers["User-Agent"]).toBeTruthy();
    expect(url).toContain("/users/acme/repos");
  });

  it("omits the Authorization header entirely when no token is set", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(jsonResponse([repoPayload()]));
    vi.stubGlobal("fetch", fetchSpy);

    const { fetchRepositories } = await loadApi({
      MARKETING_SITE_GITHUB_USERNAME: "acme",
      MARKETING_SITE_GITHUB_TOKEN: undefined,
    });
    await fetchRepositories();

    const [, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    // Not `Bearer undefined`, and not an empty bearer — absent, so GitHub
    // serves the unauthenticated path instead of rejecting with a 401.
    expect(init.headers).not.toHaveProperty("Authorization");
  });

  it("treats an empty-string token as absent, not as a credential", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(jsonResponse([repoPayload()]));
    vi.stubGlobal("fetch", fetchSpy);

    const { fetchRepositories } = await loadApi({
      MARKETING_SITE_GITHUB_USERNAME: "acme",
      // How an unfilled row in a hosting dashboard actually arrives.
      MARKETING_SITE_GITHUB_TOKEN: "",
    });
    await fetchRepositories();

    const [, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(init.headers).not.toHaveProperty("Authorization");
  });

  it("sorts by push activity rather than metadata updates", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(jsonResponse([repoPayload()]));
    vi.stubGlobal("fetch", fetchSpy);

    const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
    await fetchRepositories();

    // `sort=updated` would let a stranger starring an abandoned repo push it
    // to the top of the portfolio.
    expect(fetchSpy.mock.calls[0]?.[0]).toContain("sort=pushed");
    expect(fetchSpy.mock.calls[0]?.[0]).toContain("type=owner");
  });

  it("requests server-side caching with a revalidation window and a tag", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(jsonResponse([repoPayload()]));
    vi.stubGlobal("fetch", fetchSpy);

    const { fetchRepositories, GITHUB_REVALIDATE_SECONDS, GITHUB_CACHE_TAG } = await loadApi({
      MARKETING_SITE_GITHUB_USERNAME: "acme",
    });
    await fetchRepositories();

    const [, init] = fetchSpy.mock.calls[0] as [string, { next?: { revalidate?: number; tags?: string[] } }];
    expect(init.next?.revalidate).toBe(GITHUB_REVALIDATE_SECONDS);
    expect(init.next?.tags).toContain(GITHUB_CACHE_TAG);
  });

  describe("failure mapping", () => {
    it.each([
      [401, {}, "unauthorized"],
      [404, {}, "account-not-found"],
      [429, {}, "rate-limited"],
      [500, {}, "unavailable"],
      [502, {}, "unavailable"],
    ])("maps HTTP %i to %s", async (status, headers, expected) => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ message: "nope" }, { status, headers })));
      const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
      expect(await fetchRepositories()).toEqual({ status: "error", reason: expected });
    });

    /**
     * GitHub overloads 403 for both "bad credentials" and "rate limited", and
     * the two want different visitor-facing copy. The remaining-count header
     * is the only thing that distinguishes them.
     */
    it("distinguishes a rate-limited 403 from an unauthorised one", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(jsonResponse({}, { status: 403, headers: { "x-ratelimit-remaining": "0" } })),
      );
      const rateLimited = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
      expect(await rateLimited.fetchRepositories()).toEqual({ status: "error", reason: "rate-limited" });

      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(jsonResponse({}, { status: 403, headers: { "x-ratelimit-remaining": "4999" } })),
      );
      const unauthorized = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
      expect(await unauthorized.fetchRepositories()).toEqual({ status: "error", reason: "unauthorized" });
    });

    it("returns 'unavailable' instead of throwing when the network fails", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));
      const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
      expect(await fetchRepositories()).toEqual({ status: "error", reason: "unavailable" });
    });

    it("returns 'unavailable' instead of throwing on an unparseable body", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(new Response("<html>proxy error</html>", { status: 200 })),
      );
      const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
      expect(await fetchRepositories()).toEqual({ status: "error", reason: "unavailable" });
    });

    it("returns 'unavailable' when a 200 body is valid JSON but not an array", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ message: "Not Found" })));
      const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
      expect(await fetchRepositories()).toEqual({ status: "error", reason: "unavailable" });
    });
  });

  describe("payload validation", () => {
    it("discards a malformed entry but keeps the rest of the page", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          jsonResponse([repoPayload({ id: 1 }), { id: "not-a-number" }, null, repoPayload({ id: 2 })]),
        ),
      );
      const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
      const result = await fetchRepositories();

      // One bad object should cost one card, not the whole portfolio.
      expect(result.status).toBe("ok");
      if (result.status !== "ok") return;
      expect(result.repositories.map((r) => r.id)).toEqual([1, 2]);
    });
  });

  describe("pagination", () => {
    it("stops after a short page rather than requesting an empty one", async () => {
      const fetchSpy = vi.fn().mockResolvedValue(jsonResponse([repoPayload()]));
      vi.stubGlobal("fetch", fetchSpy);
      const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
      await fetchRepositories();
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it("follows to the next page when a full page comes back", async () => {
      const fullPage = Array.from({ length: 100 }, (_, i) => repoPayload({ id: i + 1 }));
      const fetchSpy = vi
        .fn()
        .mockResolvedValueOnce(jsonResponse(fullPage))
        .mockResolvedValueOnce(jsonResponse([repoPayload({ id: 999 })]));
      vi.stubGlobal("fetch", fetchSpy);

      const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
      const result = await fetchRepositories();

      expect(fetchSpy).toHaveBeenCalledTimes(2);
      expect(fetchSpy.mock.calls[1]?.[0]).toContain("page=2");
      if (result.status !== "ok") throw new Error("expected ok");
      expect(result.repositories).toHaveLength(101);
    });

    it("stops at the page ceiling rather than looping unboundedly", async () => {
      const fullPage = Array.from({ length: 100 }, (_, i) => repoPayload({ id: i + 1 }));
      // A fresh Response per call, not one shared instance: a Response body
      // is a single-use stream, so `mockResolvedValue(response)` would hand
      // back an already-drained body on call two and the loop would exit on a
      // parse failure rather than on the ceiling this test is asserting.
      const fetchSpy = vi.fn().mockImplementation(() => Promise.resolve(jsonResponse(fullPage)));
      vi.stubGlobal("fetch", fetchSpy);

      const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
      await fetchRepositories();
      expect(fetchSpy).toHaveBeenCalledTimes(3);
    });
  });

  it("warns when the rate-limit budget drops below a quarter", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse([repoPayload()], {
          headers: {
            "x-ratelimit-limit": "5000",
            "x-ratelimit-remaining": "100",
            "x-ratelimit-reset": "1800000000",
          },
        }),
      ),
    );

    const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme" });
    await fetchRepositories();

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("Rate limit at 100/5000"));
  });

  it("escapes the username so it cannot alter the request path", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(jsonResponse([]));
    vi.stubGlobal("fetch", fetchSpy);

    const { fetchRepositories } = await loadApi({ MARKETING_SITE_GITHUB_USERNAME: "acme/../../evil" });
    await fetchRepositories();

    // A misconfigured (or hostile) env value must not traverse to another
    // GitHub API endpoint.
    expect(fetchSpy.mock.calls[0]?.[0]).toContain("acme%2F..%2F..%2Fevil");
  });
});

/**
 * A source-level assertion, not a behavioural one.
 *
 * `vitest.config.ts` aliases `server-only` to a harmless stub so these tests
 * can import the module at all — which means a runtime test could never catch
 * the marker being deleted. Reading the file is the only way to verify the
 * guardrail is still in place, and this is the guardrail that keeps a GitHub
 * token out of the browser bundle.
 */
describe("client-bundle safety", () => {
  const read = (relativePath: string) =>
    readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

  it.each(["./github-api.ts", "./github-service.ts"])(
    "%s is marked server-only",
    (path) => {
      expect(read(path)).toMatch(/^import ["']server-only["'];$/m);
    },
  );

  it("never gives the token a NEXT_PUBLIC_ prefix, which would inline it into the client bundle", () => {
    const envSource = read("../../shared/env.ts");
    expect(envSource).not.toMatch(/NEXT_PUBLIC_[A-Z_]*(GITHUB|TOKEN)/);
  });

  it("keeps the token out of every client component in the feature", () => {
    for (const file of ["./project-card.tsx", "./projects-states.tsx", "./projects-retry.tsx", "./project-format.ts"]) {
      const source = read(file);
      expect(source, `${file} must not read the GitHub token`).not.toContain("MARKETING_SITE_GITHUB_TOKEN");
      expect(source, `${file} must not import the server-only API layer`).not.toMatch(
        /from ["']\.\/github-api["']/,
      );
    }
  });

  it("keeps the only client component in the feature free of any service import", () => {
    // projects-retry.tsx is the feature's single "use client" module. If it
    // ever imports the service, the whole server-only chain enters the
    // client graph and the build breaks — better to catch it here, named.
    const retry = read("./projects-retry.tsx");
    expect(retry).toContain('"use client"');
    expect(retry).not.toMatch(/from ["']\.\/github-(api|service)["']/);
  });
});
