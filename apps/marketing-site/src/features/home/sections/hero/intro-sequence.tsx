"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ParticleField, type FieldStage } from "./field-lines";
import styles from "./intro-sequence.module.css";

const SESSION_KEY = "tp-intro-shown";
const WORDMARK = "TRADY PERCH";

/**
 * FIELD LINES — the eight-beat opening sequence.
 *
 * The conceit: the wordmark is not assembled by particles, it is the shape of
 * an invisible magnetic field that suspended metallic dust reveals. Beat 3
 * (ignition — rotation only, no translation) is the signature moment; beat 8
 * (the pull-back, which discovers the wordmark was etched on an object all
 * along) is the reveal.
 *
 * Total 5000ms. Skippable at any moment, once per session. Both are kept
 * because they protect the effect rather than dilute it — an unskippable
 * five-second ceremony on a third visit converts the site's most memorable
 * moment into its most irritating one.
 *
 * The hero underneath is fully server-rendered and present in the DOM from the
 * first byte; this overlay sits on top of it. A skip, a slow connection, a JS
 * failure, or reduced motion therefore all resolve to a finished hero rather
 * than to an empty screen.
 */

type Beat =
  | "black"
  | "charge"
  | "ignition"
  | "migration"
  | "settle"
  | "sweep"
  | "tagline"
  | "pullback"
  | "done";

type ActiveBeat = Exclude<Beat, "done">;

/** Beat durations in ms. Sum: 5000. */
const BEAT_MS: Record<ActiveBeat, number> = {
  black: 400,
  charge: 500,
  ignition: 700,
  migration: 1200,
  settle: 400,
  sweep: 600,
  tagline: 400,
  pullback: 800,
};

const BEAT_ORDER: ActiveBeat[] = [
  "black",
  "charge",
  "ignition",
  "migration",
  "settle",
  "sweep",
  "tagline",
  "pullback",
];

/** Which physics stage each beat drives the field into. */
const BEAT_STAGE: Record<ActiveBeat, FieldStage> = {
  black: "charge",
  charge: "charge",
  ignition: "align",
  migration: "migrate",
  settle: "settle",
  sweep: "formed",
  tagline: "formed",
  pullback: "formed",
};

const SKIP_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"] as const;

/** How long the static (reduced-motion / no-canvas) presentation is held
 *  before dissolving. Content is still delivered — §9.5 requires the intro
 *  degrade rather than be skipped outright. */
const STATIC_HOLD_MS = 1400;

function markSessionShown(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Storage-disabled contexts simply show the sequence again next load —
    // a harmless degradation, not a failure worth handling further.
  }
}

export function IntroSequence() {
  const [beat, setBeat] = useState<Beat>("black");
  const [reducedMotion, setReducedMotion] = useState(false);
  // Defaults to "already shown" so a returning visitor never sees a flash of
  // overlay before the session check resolves.
  const [alreadyShown, setAlreadyShown] = useState(true);
  const [environmentResolved, setEnvironmentResolved] = useState(false);
  const [fieldFailed, setFieldFailed] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fieldRef = useRef<ParticleField | null>(null);
  // Mirrored into a ref so the skip listener, which is registered once, can
  // read the live beat without being torn down and re-added on every
  // transition. Synced in an effect rather than during render — a ref write
  // during render is not a rendering concern and React lints it as such.
  const beatRef = useRef<Beat>(beat);
  useEffect(() => {
    beatRef.current = beat;
  }, [beat]);

  // One-time environment read, deferred a tick so this stays a callback rather
  // than a synchronous setState in an effect body, and so `window` is never
  // touched during server render.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      let shown = true;
      try {
        shown = Boolean(sessionStorage.getItem(SESSION_KEY));
      } catch {
        shown = false;
      }
      setAlreadyShown(shown);
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setEnvironmentResolved(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const staticPath = reducedMotion || fieldFailed;
  const shouldRunCeremony = environmentResolved && !alreadyShown && !staticPath;

  const finish = useCallback(() => {
    markSessionShown();
    setBeat("done");
  }, []);

  // Reduced motion: Ch.15 Mt-4's Ceremonial companion is a full static
  // presentation, not a faster animation. The wordmark shows as plain type for
  // a held moment, then dissolves.
  useEffect(() => {
    if (!environmentResolved || alreadyShown || !staticPath) return;
    const timeoutId = window.setTimeout(finish, STATIC_HOLD_MS);
    return () => window.clearTimeout(timeoutId);
  }, [environmentResolved, alreadyShown, staticPath, finish]);

  // Field lifecycle. Created only once the ceremony is confirmed to be
  // running, so returning and reduced-motion visitors never pay for any canvas
  // work at all.
  useEffect(() => {
    if (!shouldRunCeremony) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const field = new ParticleField(canvas, { wordmark: WORDMARK });
    fieldRef.current = field;

    const applySize = () => {
      const scale = Math.min(2, window.devicePixelRatio || 1);
      field.resize(window.innerWidth, window.innerHeight, scale);
    };

    applySize();

    if (!field.isReady()) {
      // No 2D context, or the wordmark rasterised to nothing. Degrade to the
      // static path rather than holding an empty black overlay.
      field.destroy();
      fieldRef.current = null;
      setFieldFailed(true);
      return;
    }

    field.start();

    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(applySize);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
      field.destroy();
      fieldRef.current = null;
    };
  }, [shouldRunCeremony]);

  // Beat clock.
  useEffect(() => {
    if (!shouldRunCeremony || beat === "done") return;

    const activeBeat = beat as ActiveBeat;
    const index = BEAT_ORDER.indexOf(activeBeat);
    if (index === -1) return;

    fieldRef.current?.setStage(BEAT_STAGE[activeBeat]);

    const timeoutId = window.setTimeout(() => {
      const next = BEAT_ORDER[index + 1];
      if (next) setBeat(next);
      else finish();
    }, BEAT_MS[activeBeat]);

    return () => window.clearTimeout(timeoutId);
  }, [beat, shouldRunCeremony, finish]);

  // The sweep (beat 6) is driven per frame rather than by CSS, because the
  // particles themselves must brighten as it crosses them — that is what sells
  // the state change from dust to solid metal.
  useEffect(() => {
    if (!shouldRunCeremony || beat !== "sweep") return;
    const field = fieldRef.current;
    if (!field) return;

    const start = performance.now();
    let frameId = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / BEAT_MS.sweep);
      field.setSweep(progress);
      if (progress < 1) frameId = requestAnimationFrame(tick);
      else field.setSweep(-1);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      field.setSweep(-1);
    };
  }, [beat, shouldRunCeremony]);

  // Scroll lock while the overlay is up. A visitor's most natural "get past
  // this" gesture is to scroll, which is also a skip trigger — without the
  // lock, that same scroll moves the real page behind the overlay and the
  // sequence resolves partway down the document instead of at the hero.
  useEffect(() => {
    const overlayUp = environmentResolved && !alreadyShown && beat !== "done";
    if (!overlayUp) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [environmentResolved, alreadyShown, beat]);

  // Skip. Registered once; reads the live beat through a ref.
  useEffect(() => {
    if (!environmentResolved || alreadyShown) return;

    const skip = () => {
      if (beatRef.current === "done") return;
      finish();
    };

    for (const eventName of SKIP_EVENTS) {
      window.addEventListener(eventName, skip, { once: true, passive: true });
    }
    return () => {
      for (const eventName of SKIP_EVENTS) {
        window.removeEventListener(eventName, skip);
      }
    };
  }, [environmentResolved, alreadyShown, finish]);

  const overlayClassName = useMemo(
    () =>
      [
        styles.overlay,
        alreadyShown && styles.hidden,
        beat === "pullback" && styles.pullback,
        staticPath && styles.staticPath,
      ]
        .filter(Boolean)
        .join(" "),
    [alreadyShown, beat, staticPath],
  );

  if (beat === "done") return null;

  // During the ceremony the etched wordmark stays dark until the sweep lights
  // it — at that moment the dust has "become" this solid form, and the
  // particles still on screen behind it read as the same object.
  const wordmarkLit = staticPath || beat === "sweep" || beat === "tagline" || beat === "pullback";
  const taglineVisible = staticPath || beat === "tagline" || beat === "pullback";

  return (
    <div className={overlayClassName} role="presentation" aria-hidden="true">
      {shouldRunCeremony ? <canvas ref={canvasRef} className={styles.canvas} /> : null}

      <div className={styles.plate}>
        <p
          className={[styles.wordmark, wordmarkLit && styles.wordmarkLit].filter(Boolean).join(" ")}
        >
          {WORDMARK}
        </p>
        <p
          className={[styles.tagline, taglineVisible && styles.taglineVisible]
            .filter(Boolean)
            .join(" ")}
        >
          Build. Automate. Grow.
        </p>
      </div>
    </div>
  );
}
