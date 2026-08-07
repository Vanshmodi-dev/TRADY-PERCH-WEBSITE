"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ParticleField, type FieldStage } from "./field-lines";
import { releaseIntroGate } from "./intro-gate";
import { IntroWordmark, WORDMARK } from "./intro-wordmark";
import styles from "./intro-sequence.module.css";

const SESSION_KEY = "tp-intro-shown";

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

  /*
   * Let the Apex renderer start.
   *
   * Released the moment the overlay is out of the way — either because the
   * ceremony has finished, or because this visitor was never going to see it.
   * A returning visitor therefore waits for nothing: the environment check
   * resolves on the next tick and the gate opens with it.
   *
   * See intro-gate.ts for why the renderer must not begin any earlier.
   */
  useEffect(() => {
    if (!environmentResolved) return;
    if (alreadyShown || beat === "done") releaseIntroGate();
  }, [environmentResolved, alreadyShown, beat]);

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

    let field: ParticleField | null = null;
    let resizeFrame = 0;
    let cancelled = false;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => field && applySize(field));
    };

    const applySize = (instance: ParticleField) => {
      const scale = Math.min(2, window.devicePixelRatio || 1);
      instance.resize(window.innerWidth, window.innerHeight, scale);
    };

    const build = () => {
      if (cancelled) return;
      const instance = new ParticleField(canvas, { wordmark: WORDMARK });
      applySize(instance);

      if (!instance.isReady()) {
        // No 2D context, or the wordmark rasterised to nothing. Degrade to
        // the static path rather than holding an empty black overlay.
        instance.destroy();
        setFieldFailed(true);
        return;
      }

      field = instance;
      fieldRef.current = instance;
      instance.start();
      window.addEventListener("resize", onResize);
    };

    /*
     * Wait for the webfont before shaping the poles.
     *
     * The rasteriser shapes the letterform with whatever face is resolvable at
     * the moment it runs. Build it before `next/font`'s face has loaded and
     * the particles form the *fallback* typeface's outline, then the SVG
     * wordmark lights up in the real one on top of it — two different shapes,
     * registered, which is exactly the doubled, blurred look this sequence was
     * reported for.
     *
     * Beat 1 is 400ms of black and the font is preloaded, so in practice this
     * has already resolved. The race guard exists for the case where it has
     * not: a font that is still loading must not hold the ceremony, so the
     * field is built anyway after a short grace period.
     */
    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      const grace = new Promise<void>((resolve) => window.setTimeout(resolve, 300));
      void Promise.race([fontsReady.then(() => undefined), grace]).then(build);
    } else {
      build();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
      field?.destroy();
      field = null;
      fieldRef.current = null;
    };
  }, [shouldRunCeremony]);

  /*
   * BEAT CLOCK — driven by elapsed wall-clock time, not by a chain of timers.
   *
   * This is a correctness fix, not a style preference. A `setTimeout` chain
   * measures each beat from *whenever the previous timer actually fired*, so
   * every millisecond the main thread is blocked is added to the sequence
   * rather than absorbed by it. Measured on a production build, with the Apex
   * renderer compiling underneath: a 5.0s ceremony took 17.4s to reach the
   * hero, twelve of those on a frozen frame.
   *
   * Reading `performance.now()` each frame means a blocked thread costs
   * dropped frames instead of added duration — the sequence resumes at the
   * beat it *should* be on, and if the block outlasts the whole ceremony it is
   * simply over, which is the right answer. The overlay's designed length is
   * five seconds; it is now five seconds on every machine.
   *
   * (The gate in intro-gate.ts removes the contention itself. This makes the
   * sequence robust to contention from anything else — an extension, a slow
   * font, a background tab returning.)
   */
  useEffect(() => {
    if (!shouldRunCeremony) return;

    const start = performance.now();
    let frameId = 0;
    let lastBeat: Beat | null = null;

    const tick = (now: number) => {
      const elapsed = now - start;

      let cursor = 0;
      let current: ActiveBeat | null = null;
      for (const candidate of BEAT_ORDER) {
        cursor += BEAT_MS[candidate];
        if (elapsed < cursor) {
          current = candidate;
          break;
        }
      }

      if (current === null) {
        finish();
        return;
      }

      if (current !== lastBeat) {
        lastBeat = current;
        fieldRef.current?.setStage(BEAT_STAGE[current]);
        setBeat(current);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [shouldRunCeremony, finish]);

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

      {/*
        The plate is absolutely positioned rather than flex-centred, and the
        tagline is displaced by a transform rather than by a gap.
        A flex column centres the *stack*, which put the wordmark's optical
        centre above the viewport's — while the rasteriser lays its poles out
        around `height / 2`. The two forms were vertically offset by half the
        tagline's height for as long as this sequence has existed. Here the
        wordmark occupies the exact centre the field is built around, and the
        tagline hangs off it without moving it.
      */}
      <div className={styles.plate}>
        <IntroWordmark lit={wordmarkLit} immediate={staticPath} />
        <p
          className={[styles.tagline, taglineVisible && styles.taglineVisible]
            .filter(Boolean)
            .join(" ")}
        >
          Build. Automate. Grow.
        </p>
      </div>

      {/*
        THE PROGRESS RULE — the loading signal.

        A hairline that fills across the wordmark's own measure over the length
        of the sequence, then leaves with it. It is the only element in the
        overlay that tells a visitor how long this lasts, and it is a rule
        rather than a spinner or a percentage because those two both say
        "something is wrong and we are working on it", where a rule filling at
        a steady rate says "this is a designed length and it is nearly over".

        Driven by a CSS animation with a total duration equal to the beat
        clock's, so it cannot drift out of sync with it.
      */}
      {shouldRunCeremony ? <span className={styles.progress} aria-hidden="true" /> : null}
    </div>
  );
}
