"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./intro-sequence.module.css";

const SESSION_KEY = "tp-intro-shown";

type Phase = "silence" | "revealing" | "wordmark" | "tagline" | "hold" | "dissolving" | "done";

// Full-motion timings (ms). Master Vision §9.2 gives qualitative sequencing
// (silence, then ignition, then a held pause, then a dissolve) but no exact
// durations — these are a reasonable, disclosed first-canonical proposal,
// the same status Ch.15 itself claims for its own token values. `dissolving`
// specifically must equal `--motion-duration-deliberate` (500ms) exactly —
// it's both a JS wait and the CSS transition duration the overlay's own
// opacity fade runs on (intro-sequence.module.css's `.overlay`), and the
// two silently drifting apart was Milestone 5 review Finding #3.
const TIMINGS: Partial<Record<Phase, number>> = {
  silence: 400,
  revealing: 1400, // golden line ignition (0–55%) + metallic reflection sweep (55–100%), see the CSS
  wordmark: 500,
  tagline: 500,
  hold: 700,
  dissolving: 500, // must match --motion-duration-deliberate
};

// Ch.15 §4: Ceremonial's reduced-motion companion is "full static
// presentation, no animation" — not a faster version of the same
// animation, a genuinely different, instant path (§9.5: "must degrade...
// rather than being skipped entirely" — still shown once per session,
// just never animated). `dissolving` must match `--motion-duration-
// deliberate`'s own reduced-motion companion (150ms) for the same reason
// as the full-motion value above.
const REDUCED_TIMINGS: Partial<Record<Phase, number>> = {
  hold: 900,
  dissolving: 150,
};

const FULL_ORDER: Phase[] = ["silence", "revealing", "wordmark", "tagline", "hold", "dissolving"];
const REDUCED_ORDER: Phase[] = ["hold", "dissolving"];

const SKIP_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"] as const;

function markSessionShown() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Private-browsing/storage-disabled contexts — the intro simply shows
    // again next load, a harmless degradation, not a crash.
  }
}

/**
 * Master Vision §9.2 (Intro Experience). Homepage-only, not the root
 * layout — step 7 is explicitly "dissolve into the homepage... hero
 * content beneath already faintly present," which only makes sense
 * arriving at the homepage specifically. A visitor landing directly on an
 * interior page (a shared /solutions/ai-agents link, say) never sees this
 * at all: there's no hero underneath to dissolve into.
 *
 * No literal vector trace of the TP monogram's exact geometry — there's
 * no vector source art in this repo, only the raster /logo-mark.jpeg, and
 * hand-approximating its bezier curves risks a visible mismatch against
 * the real mark on the site's single most scrutinized moment. Instead,
 * the real asset is progressively revealed via a sliding cover panel
 * (transform only — see the CSS for why this replaced an earlier
 * clip-path approach, Ch.40 Ag-1), paired with a leading bright edge that
 * reads as the line "switching on" the geometry as it goes (§9.2 step 2's
 * own language) — genuinely accurate to the mark, not an approximation of
 * it. The reflection sweep (step 3) is masked to the logo image's own
 * luminance, so it only lights up the gold letterforms, never the black
 * square around them.
 */
export function IntroSequence() {
  const [phase, setPhase] = useState<Phase>("silence");
  const [reducedMotion, setReducedMotion] = useState(false);
  // Defaults to true (render nothing) until the real session check
  // resolves client-side — safer than defaulting to false, which would
  // briefly show the overlay to a returning visitor before hiding it.
  const [skippedThisSession, setSkippedThisSession] = useState(true);
  // Milestone 5 review Finding #5: skipping while still in "silence" (the
  // mark has never appeared yet) must not let the mark/reflection start
  // their entrance animation in the same instant the overlay starts
  // dissolving — that's a fresh 2-element animation stacked on top of the
  // overlay's own fade, a 3-way-simultaneous moment that also looks like
  // a flicker, not a dismissal. This flag keeps the mark suppressed for
  // the rest of this visit once that specific case happens.
  const [skippedFromSilence, setSkippedFromSilence] = useState(false);

  useEffect(() => {
    // Reading sessionStorage/matchMedia is a one-time environment check,
    // not a subscription to an external system's changes — there's
    // nothing to "call setState in a callback" in response to. Deferred
    // one tick (react-hooks/set-state-in-effect) purely to keep this a
    // callback rather than a synchronous effect-body call; the practical
    // delay is imperceptible, and computing it during render instead
    // would read `window`/`sessionStorage` on the server, which don't exist.
    const timeoutId = window.setTimeout(() => {
      let alreadyShown = true;
      try {
        alreadyShown = Boolean(sessionStorage.getItem(SESSION_KEY));
      } catch {
        alreadyShown = false;
      }
      setSkippedThisSession(alreadyShown);
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (skippedThisSession || phase === "done") return;

    const order = reducedMotion ? REDUCED_ORDER : FULL_ORDER;
    const currentIndex = order.indexOf(phase);
    // `phase` starts at "silence", which isn't on the reduced-motion
    // path — treated as "jump straight to that path's own first step,
    // immediately" (duration 0) rather than a separate synchronous
    // setState call.
    const duration = currentIndex === -1 ? 0 : ((reducedMotion ? REDUCED_TIMINGS[phase] : TIMINGS[phase]) ?? 0);

    const timeoutId = window.setTimeout(() => {
      const next = currentIndex === -1 ? order[0] : order[currentIndex + 1];
      if (next) {
        setPhase(next);
      } else {
        markSessionShown();
        setPhase("done");
      }
    }, duration);
    return () => window.clearTimeout(timeoutId);
  }, [phase, reducedMotion, skippedThisSession]);

  // Milestone 5 review Finding #4: while the overlay is up, the real
  // homepage underneath must not scroll — a visitor's most natural
  // "get me past this" gesture is to scroll, which is also a skip
  // trigger below, and without a lock that same scroll would move the
  // real page behind the opaque overlay, so it can land partway down the
  // page once the overlay dissolves instead of at the hero (contradicting
  // §9.2 step 7's "dissolve into the homepage... hero content beneath").
  useEffect(() => {
    if (skippedThisSession || phase === "done" || phase === "dissolving") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [skippedThisSession, phase]);

  const phaseRef = useRef(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Registers once (not per phase change) — `phaseRef` keeps `skip` reading
  // the current phase regardless, so there's nothing to gain from tearing
  // listeners down and re-adding them on every transition.
  useEffect(() => {
    if (skippedThisSession) return;

    function skip() {
      if (phaseRef.current === "dissolving" || phaseRef.current === "done") return;
      if (phaseRef.current === "silence") setSkippedFromSilence(true);
      setPhase("dissolving");
    }

    for (const eventName of SKIP_EVENTS) {
      window.addEventListener(eventName, skip, { once: true });
    }
    return () => {
      for (const eventName of SKIP_EVENTS) {
        window.removeEventListener(eventName, skip);
      }
    };
  }, [skippedThisSession]);

  // Milestone 8 (Ch.36 LCP budget): "done" still unmounts entirely — by
  // then the sequence has fully played and LCP has long since resolved,
  // so there's nothing left to preserve in the DOM. "skippedThisSession"
  // no longer does — see styles.hidden (and its own comment) for why the
  // markup, and specifically the <Image priority> below, now renders
  // unconditionally instead of being kept out of the DOM behind an early
  // `return null` until a client-side sessionStorage check resolved. That
  // check previously delayed the image's own existence in the DOM (and
  // therefore the browser's ability to even discover and start fetching
  // it) until after hydration — measured as 1.4s of pure "Load Delay" on
  // the homepage's LCP, since this image is the LCP element.
  if (phase === "done") return null;

  const markVisible = phase !== "silence" && !skippedFromSilence;
  const wordmarkVisible = phase === "wordmark" || phase === "tagline" || phase === "hold";
  const taglineVisible = phase === "tagline" || phase === "hold";

  return (
    <div
      className={[
        styles.overlay,
        skippedThisSession && styles.hidden,
        phase === "dissolving" && styles.dissolving,
      ]
        .filter(Boolean)
        .join(" ")}
      role="presentation"
      aria-hidden="true"
    >
      <div
        className={[
          styles.mark,
          markVisible && !reducedMotion && styles.revealing,
          markVisible && reducedMotion && styles.instant,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Image
          className={styles.logoImg}
          src="/logo-mark.jpeg"
          alt=""
          fill
          sizes="220px"
          priority
        />
        {!reducedMotion ? (
          <>
            <span className={styles.wipeCover} />
            <span className={styles.reflection} />
          </>
        ) : null}
      </div>
      <p className={[styles.wordmark, wordmarkVisible && styles.visible].filter(Boolean).join(" ")}>
        TRADY PERCH
      </p>
      <p className={[styles.tagline, taglineVisible && styles.visible].filter(Boolean).join(" ")}>
        Build. Automate. Grow.
      </p>
    </div>
  );
}
