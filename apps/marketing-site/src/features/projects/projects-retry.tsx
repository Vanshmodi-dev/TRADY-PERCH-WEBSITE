"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@trady-perch/ui";
import styles from "./projects-states.module.css";

/**
 * The retry control for the portfolio error state — the only client
 * JavaScript in this entire feature.
 *
 * Scoped to exactly this button on purpose. Marking the whole error panel
 * `"use client"` would be simpler and would also pull its heading, body copy
 * and 20-node inline SVG into the client bundle to support one `onClick`.
 *
 * `router.refresh()` rather than `location.reload()`: a full reload discards
 * the client router cache, re-downloads every asset and re-runs hydration for
 * the whole document. `refresh()` re-runs only the Server Components for the
 * current route, so a successful retry swaps the error panel for a populated
 * grid in place — no white flash, no scroll position lost.
 *
 * Note this only helps for a *transient* upstream failure. It cannot fix a
 * missing environment variable, which is precisely why `github-service.ts`
 * routes `not-configured` to the empty state instead of here: offering a
 * retry button for a condition retrying cannot resolve is a dead end
 * dressed up as an action.
 */
export function ProjectsRetryButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [attempted, setAttempted] = useState(false);

  return (
    <>
      <Button
        emphasis="primary"
        status={isPending ? "loading" : "idle"}
        onClick={() => {
          setAttempted(true);
          startTransition(() => {
            router.refresh();
          });
        }}
      >
        {isPending ? "Retrying" : "Try again"}
      </Button>

      {/*
        A completed refresh that changes nothing on screen is silent to a
        screen-reader user, who has no way to tell the button worked. This
        live region announces the outcome. It stays empty until the first
        attempt so it does not announce anything on page load.
      */}
      <span role="status" aria-live="polite" className={styles.srOnly}>
        {attempted && !isPending ? "Retry finished. If the projects are still missing, GitHub is not responding yet." : ""}
      </span>
    </>
  );
}
