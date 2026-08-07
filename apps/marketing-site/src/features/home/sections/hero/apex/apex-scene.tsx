"use client";

/**
 * THE APEX — the scene.
 *
 * The WebGL half of the object, and the only module in this directory that
 * ever reaches a GPU. It is the default export because it is loaded through
 * `next/dynamic` — nothing in this file, and nothing it imports, is in the
 * marketing site's initial JavaScript.
 *
 * Three primary elements, and no more: the shell, the mechanism, the
 * particulate. Everything else in the frame is light.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { ACESFilmicToneMapping, Vector3, type Group } from "three";
import { RATES, RIG } from "./apex-config";
import { ApexDust } from "./apex-dust";
import { stepSpring, type SpringState } from "./apex-math";
import { ApexMechanism } from "./apex-mechanism";
import { useApexPointer } from "./apex-pointer";
import { ApexRig } from "./apex-rig";
import { ApexShell } from "./apex-shell";

export interface ApexSceneProps {
  /**
   * Reduced motion. Not a slower version of the animation — the object holds
   * the pose it was composed in, lit by the key at its designed resting angle.
   * The still is the original; the movement is what was added to it.
   */
  still: boolean;
  /**
   * Whether the hero is on screen and the tab is in the foreground. False
   * stops the render loop dead: an off-screen canvas costs nothing.
   */
  active: boolean;
  /** Fired once the first frame is on the glass, to cross-fade the poster out. */
  onReady?: () => void;
}

const TAU = Math.PI * 2;

/**
 * The suspension.
 *
 * A forty-kilogram instrument hanging in air does not hold perfectly still and
 * it does not bob on a sine either. Three incommensurate periods per axis give
 * a drift that never repeats within any plausible visit, at an amplitude of
 * under two centimetres — below the threshold of "it is moving", above the
 * threshold of "it is alive".
 *
 * ── Parallax ──────────────────────────────────────────────────────────────
 *
 * The whole assembly also slides a few millimetres against the frame as the
 * cursor crosses the page, opposed on the horizontal so the object drifts
 * *away* from the pointer rather than following it. Following is the
 * conventional choice and it turns a subject into a widget; opposing it is
 * what a real subject does when the camera moves, and it is the difference
 * between an object photographed in a room and an image pasted onto a page.
 *
 * It rides on a spring slower than the key light's, so on a fast sweep the
 * light leads and the object follows — the order those two happen in when
 * someone walks a lamp around a table.
 */
function Suspension({ still, children }: { still: boolean; children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  const width = useThree((state) => state.size.width);
  const invalidate = useThree((state) => state.invalidate);
  const pointer = useApexPointer(!still, invalidate);

  const offsetX = useRef<SpringState>({ value: 0, velocity: 0 });
  const offsetY = useRef<SpringState>({ value: 0, velocity: 0 });

  /*
   * The lens does not change on a phone; the object's size in frame does.
   * A narrow canvas is proportionally wider than the desktop one, so at a
   * fixed camera distance the same object lands smaller against far less
   * competing content. Scaling the subject rather than dollying the camera
   * keeps the long-lens compression that the whole look depends on.
   */
  const scale = width < 768 ? 1.24 : 1;

  useFrame((state, rawDelta) => {
    const group = ref.current;
    if (!group || still) return;
    const t = state.clock.elapsedTime;
    const delta = Math.min(rawDelta, 0.1);

    const { amplitude, slowHz, fastHz, driftHz } = RATES.shellDrift;
    const bob =
      (Math.sin(t * TAU * slowHz) +
        Math.sin(t * TAU * fastHz) * 0.55 +
        // The third term is the one that removes the audible beat between the
        // other two — slow, quiet, and sharing no factor with either.
        Math.sin(t * TAU * driftHz + 0.9) * 0.34) *
      amplitude;

    offsetX.current = stepSpring(
      offsetX.current,
      pointer.current.x * RIG.parallax.x,
      RIG.parallaxOmega,
      delta,
    );
    offsetY.current = stepSpring(
      offsetY.current,
      pointer.current.y * RIG.parallax.y,
      RIG.parallaxOmega,
      delta,
    );

    group.position.x = offsetX.current.value;
    group.position.y = RIG.objectOffsetY + bob + offsetY.current.value;

    const sway = RATES.shellSway;
    group.rotation.x = Math.sin(t * TAU * sway.slowHz) * sway.amplitude;
    group.rotation.z = Math.sin(t * TAU * sway.fastHz + 1.7) * sway.amplitude * 0.8;
  });

  return (
    <group ref={ref} position={[0, RIG.objectOffsetY, 0]} scale={scale}>
      {children}
    </group>
  );
}

/**
 * In the still presentation the loop runs on demand, which means it renders
 * only when something asks it to. The environment's cube map, the shadow map
 * and the first material compile all need a frame to happen in, so a short
 * burst of them is requested at mount and then the loop goes quiet for good.
 */
function PrimeStillFrame() {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    let frame = 0;
    let remaining = 8;
    const prime = () => {
      invalidate();
      remaining -= 1;
      if (remaining > 0) frame = requestAnimationFrame(prime);
    };
    frame = requestAnimationFrame(prime);
    return () => cancelAnimationFrame(frame);
  }, [invalidate]);

  return null;
}

/** Reports the first completed frame, so the poster knows when to hand over. */
function ReportFirstFrame({ onReady }: { onReady?: () => void }) {
  const fired = useRef(false);

  useFrame(() => {
    if (fired.current) return;
    fired.current = true;
    onReady?.();
  });

  return null;
}

export default function ApexScene({ still, active, onReady }: ApexSceneProps) {
  const keyDirection = useRef(new Vector3());
  const [dprCeiling, setDprCeiling] = useState(1.75);

  const camera = useMemo(
    () => ({
      fov: RIG.fov,
      position: [...RIG.position] as [number, number, number],
      near: RIG.near,
      far: RIG.far,
    }),
    [],
  );

  return (
    <Canvas
      /*
       * "never" is a hard stop, not a slow loop: no rAF is scheduled at all
       * while the hero is off screen or the tab is backgrounded. "demand"
       * renders only on invalidate(), which is what the still presentation
       * wants. "always" is the ordinary case.
       */
      frameloop={!active ? "never" : still ? "demand" : "always"}
      /*
       * Capped below the display's own ratio. Above about 1.75 the extra
       * pixels buy nothing on an object made of soft gradients and thin
       * highlights, and cost quadratically.
       */
      dpr={[1, dprCeiling]}
      gl={{
        antialias: true,
        /* The razor edges are the object. MSAA is the only thing that keeps
           them from stairstepping, and it is cheaper here than any
           post-process alternative. */
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      /* Percentage-closer filtering. three deprecated its soft variant in
         r185 and silently falls back to exactly this, so asking for it by
         name is the honest version of the same behaviour. */
      shadows="percentage"
      camera={camera}
      onCreated={(state) => {
        state.gl.toneMapping = ACESFilmicToneMapping;
        // Slightly under 1: the frame should sit dark, and the gold should be
        // the only thing approaching the top of the range.
        state.gl.toneMappingExposure = 0.94;
        state.camera.lookAt(RIG.target[0], RIG.target[1], RIG.target[2]);
      }}
    >
      {/*
       * Resolution is the first thing to give up under load, and the last
       * thing anyone notices. Geometry, materials and the light rig are the
       * object's identity; pixel density is not.
       */}
      <PerformanceMonitor
        ms={240}
        iterations={6}
        onDecline={() => setDprCeiling(1.15)}
        onFallback={() => setDprCeiling(1)}
      />

      <ApexRig keyDirection={keyDirection} still={still} />

      <Suspension still={still}>
        <ApexShell still={still} />
        <ApexMechanism still={still} />
      </Suspension>

      <ApexDust keyDirection={keyDirection} still={still} />

      {still && <PrimeStillFrame />}
      <ReportFirstFrame onReady={onReady} />
    </Canvas>
  );
}
