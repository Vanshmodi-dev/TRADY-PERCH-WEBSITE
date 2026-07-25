// Shared by every scripts/*.mjs that needs a real running instance of this
// app (a11y-audit.mjs, keyboard-nav-audit.mjs, performance-audit.mjs) —
// extracted once a second script needed the identical boot/wait/cleanup
// sequence, extended with a production-mode variant once a third script
// (performance-audit.mjs) needed real, minified, tree-shaken output —
// `next dev` bundles are unrepresentative of Chapter 36's shipped-bytes
// budgets and unrepresentative of real Core Web Vitals timing.
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const APP_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const ROOT_DIR = fileURLToPath(new URL("../../../..", import.meta.url));

function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    (function poll() {
      fetch(url)
        .then(() => resolve())
        .catch(() => {
          if (Date.now() > deadline) {
            reject(new Error(`Server at ${url} did not respond within ${timeoutMs}ms`));
          } else {
            setTimeout(poll, 500);
          }
        });
    })();
  });
}

// shell:true is deliberate everywhere below, not an oversight Node's
// deprecation warning is nudging toward removing: on Windows, npm/npx
// resolve to .cmd shims, and spawning those directly without a shell fails
// with EINVAL (confirmed the hard way — this briefly shipped without it and
// broke the exact cold-start path these scripts exist to run). The warning
// targets unescaped shell metacharacters in dynamic/untrusted args; every
// argument here is a hardcoded literal, never user input.

function spawnServer(command, args) {
  return spawn(command, args, { cwd: APP_ROOT, stdio: "ignore", shell: true });
}

async function stopServer(serverProcess) {
  if (!serverProcess.pid) return;
  // serverProcess.kill() only signals the immediate child — with
  // shell:true on Windows that's the shell, not next's own process
  // underneath it, leaving an orphaned server bound to the port on every
  // run (confirmed: it did, until this fix). taskkill /T kills the whole
  // tree; POSIX process groups don't have this gap.
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(serverProcess.pid), "/T", "/F"]);
  } else {
    serverProcess.kill();
  }
}

/**
 * Boots a `next dev` instance on `port`, unless `BASE_URL` is already set
 * (in which case the caller is expected to already have a server running
 * there, and this is a no-op). Returns `{ baseUrl, stop }`.
 */
export async function ensureDevServer(port) {
  const baseUrl = process.env.BASE_URL ?? `http://localhost:${port}`;
  if (process.env.BASE_URL) {
    return { baseUrl, stop: async () => {} };
  }

  // Mirrors package.json's `predev` hook — next dev doesn't build these
  // itself, and spawning it directly here (rather than via `npm run dev`)
  // bypasses that lifecycle hook.
  console.log("Building tokens and motion packages...");
  spawnSync("npm", ["run", "build", "--workspace=@trady-perch/tokens"], {
    cwd: ROOT_DIR,
    stdio: "inherit",
    shell: true,
  });
  spawnSync("npm", ["run", "build", "--workspace=@trady-perch/motion"], {
    cwd: ROOT_DIR,
    stdio: "inherit",
    shell: true,
  });

  console.log(`Starting dev server on port ${port}...`);
  const serverProcess = spawnServer("npx", ["next", "dev", "--port", String(port)]);
  await waitForServer(baseUrl, 60_000);

  return { baseUrl, stop: () => stopServer(serverProcess) };
}

/**
 * Builds a real production bundle and boots `next start` on `port`, unless
 * `BASE_URL` is already set. Returns `{ baseUrl, stop }`. Slower than
 * `ensureDevServer` (a real build, not a dev-mode on-demand compile) but
 * the only mode whose bundle sizes and timing are representative of what
 * Chapter 36's budgets actually govern.
 */
export async function ensureProdServer(port) {
  const baseUrl = process.env.BASE_URL ?? `http://localhost:${port}`;
  if (process.env.BASE_URL) {
    return { baseUrl, stop: async () => {} };
  }

  console.log("Building production bundle...");
  spawnSync("npm", ["run", "build", "--workspace=@trady-perch/marketing-site"], {
    cwd: ROOT_DIR,
    stdio: "inherit",
    shell: true,
  });

  console.log(`Starting production server on port ${port}...`);
  const serverProcess = spawnServer("npx", ["next", "start", "--port", String(port)]);
  await waitForServer(baseUrl, 60_000);

  return { baseUrl, stop: () => stopServer(serverProcess) };
}
