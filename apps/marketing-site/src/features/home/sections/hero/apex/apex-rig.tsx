"use client";

/**
 * THE APEX — the lighting rig and the ground.
 *
 * Four sources, every one of them motivated:
 *
 *   KEY        a hard spot, upper left at rest, pointer-driven, casting the
 *              only shadows in the scene. This is the light that reveals
 *              machining, and the only one the visitor can move.
 *   FILL       cool, opposite the key, roughly eight stops down. Shadow is
 *              retained, never lifted — a lifted shadow is what makes a render
 *              look like a render.
 *   RIM        a cool kicker from behind. Invisible when it is working, badly
 *              missed when it is absent: without it the housing muddies into
 *              the black field and the silhouette disappears.
 *   PRACTICAL  the emitter, inside the mechanism. Owned by apex-mechanism.tsx,
 *              because it belongs to the part that generates it.
 *
 * THE OBJECT NEVER TURNS TOWARD THE CURSOR. The light moves instead. Rotating
 * an object to face the pointer is the conventional choice and it is the wrong
 * one — real objects do not do it, it reads as a toy, and it reveals nothing.
 * Raking a key across machined metal reveals the machining, which is the whole
 * reason to machine it.
 */

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Lightformer } from "@react-three/drei";
import { AdditiveBlending, Object3D, type Group, type SpotLight, type Vector3 } from "three";
import { PALETTE, RATES, RIG } from "./apex-config";
import { ApexEnvironment } from "./apex-environment";
import { aimFromPointer, aimToPosition, stepSpring, type SpringState } from "./apex-math";
import { useApexPointer } from "./apex-pointer";
import { createFalloffTexture } from "./apex-surfaces";

const AIM_RANGE = {
  azimuthRange: RIG.keyAzimuthRange,
  high: RIG.keyElevation.high,
  low: RIG.keyElevation.low,
};

const REST_AIM = aimFromPointer(RIG.keyRest.x, RIG.keyRest.y, AIM_RANGE);

export interface ApexRigProps {
  /** Written every frame: the unit vector from the object toward the key. */
  keyDirection: React.RefObject<Vector3>;
  still: boolean;
}

export function ApexRig({ keyDirection, still }: ApexRigProps) {
  const keyRef = useRef<SpotLight>(null);
  const poolRef = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  const keyTarget = useMemo(() => new Object3D(), []);
  const pool = useMemo(() => createFalloffTexture(2.2, 256), []);

  const azimuth = useRef<SpringState>({ value: REST_AIM.azimuth, velocity: 0 });
  const elevation = useRef<SpringState>({ value: REST_AIM.elevation, velocity: 0 });

  useLayoutEffect(() => () => pool?.dispose(), [pool]);

  /*
   * Pointer tracking is against the viewport rather than the canvas. The
   * conceit is a lamp in the room, not a cursor over an object: moving the
   * mouse anywhere on the page swings it, so the object is already responding
   * before the visitor has worked out that it is responding to them.
   *
   * Shared with the suspension's parallax (see apex-pointer.ts), so the light
   * and the object can never answer two different samples of the same input.
   */
  const pointer = useApexPointer(!still, invalidate);

  useFrame((_, rawDelta) => {
    const key = keyRef.current;
    if (!key) return;
    const delta = Math.min(rawDelta, 0.1);

    const aim = still
      ? REST_AIM
      : aimFromPointer(pointer.current.x, pointer.current.y, AIM_RANGE);

    /*
     * Critically damped, at a natural frequency of about 3 rad/s — roughly
     * 1.2 seconds to settle. This single number is where the luxury lives.
     * Track the pointer instantly and the same geometry, the same materials
     * and the same shaders read as a cheap cursor follower; let the light
     * arrive late and heavy and it reads as a lamp on a boom that somebody is
     * walking around the object.
     */
    azimuth.current = stepSpring(azimuth.current, aim.azimuth, RATES.lightOmega, delta);
    elevation.current = stepSpring(elevation.current, aim.elevation, RATES.lightOmega, delta);

    const [x, y, z] = aimToPosition(
      { azimuth: azimuth.current.value, elevation: elevation.current.value },
      RIG.keyDistance,
    );
    key.position.set(x, y, z);

    const direction = keyDirection.current;
    if (!direction) return;
    direction.set(x, y, z).normalize();

    // The pool of light on the ground slides fractionally away from the key,
    // the way a real spill does, which is what stops it reading as a decal
    // stuck under the object.
    if (poolRef.current) {
      poolRef.current.position.x = -direction.x * 0.42;
      poolRef.current.position.z = -direction.z * 0.28;
    }
  });

  return (
    <>
      {/* Barely there: enough to keep the deepest shadow from crushing to
          pure black, not enough to be a light. */}
      <ambientLight intensity={0.07} color={PALETTE.fill} />

      <primitive object={keyTarget} position={[0, 0, 0]} />
      <spotLight
        ref={keyRef}
        color={PALETTE.key}
        /* decay 0: a studio head far enough away that its falloff across the
           object is negligible. It also keeps the exposure constant as the
           light orbits — with inverse-square the object would visibly brighten
           and dim as the pointer moved, which is not what happens when someone
           walks a lamp around a table. */
        intensity={3.6}
        decay={0}
        /*
         * Tight, with a long penumbra. A cone wide enough to wash the whole
         * object lights every plate equally, and equal light across a matte
         * black surface is the flattest thing there is. At this angle the
         * cone's own falloff lands across the object, so one plate sits in the
         * hot centre, one in the shoulder and the rest in shadow — which is
         * what makes the pyramid read as having four separate faces rather
         * than as a triangle.
         */
        angle={0.52}
        penumbra={0.72}
        target={keyTarget}
        position={aimToPosition(REST_AIM, RIG.keyDistance)}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={3}
        shadow-camera-far={14}
        /* Thin plates at grazing angles are the worst case for shadow acne;
           normalBias does the work here, and the negative depth bias cleans up
           the self-shadowing on the mechanism's chamfers. */
        shadow-bias={-0.0006}
        shadow-normalBias={0.022}
      />

      {/* FILL — opposite the key's resting side, and low, so it opens the
          shadowed plates without ever competing. */}
      <directionalLight color={PALETTE.fill} intensity={0.45} position={[5.5, -0.5, 3.5]} />
      {/* RIM — behind and above. This is what separates the silhouette from
          the black field; remove it and the object dissolves into the page.
          A step up from 1.15: the rim is the cheapest separation in the scene
          and the one thing that reliably survives a dim laptop panel, which
          is what a good share of visitors are looking at this on. */}
      <directionalLight color={PALETTE.fill} intensity={1.28} position={[-1.6, 2.4, -6]} />

      {/* THE GROUND — two layers, no floor.
          A pool of light, and the object's own shadow falling into it. There
          is no surface here: the shadow lands on nothing, which is exactly the
          product-photography convention of an object on seamless black. */}
      {pool && (
        <group ref={poolRef} position={[0, RIG.groundY, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.52, 1]} renderOrder={1}>
            <planeGeometry args={[7.2, 7.2]} />
            <meshBasicMaterial
              map={pool}
              color={PALETTE.fill}
              transparent
              opacity={0.2}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {/* A hint of the emitter's own warmth on the ground, directly under
              the object. Not a mirror — just enough to anchor it. */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[0.42, 0.2, 1]} renderOrder={2}>
            <planeGeometry args={[7.2, 7.2]} />
            <meshBasicMaterial
              map={pool}
              color={PALETTE.gold}
              transparent
              opacity={0.34}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, RIG.groundY + 0.004, 0]}
        renderOrder={3}
        receiveShadow
      >
        <planeGeometry args={[9, 9]} />
        <shadowMaterial opacity={0.62} depthWrite={false} />
      </mesh>

      {/*
       * The room the object is standing in — four panels, no HDRI. Nothing to
       * download, nothing for the Content-Security-Policy to refuse, and exact
       * control over what every bevel returns.
       */}
      <ApexEnvironment>
        {/* The tall softbox, camera left. The long vertical highlight this
            leaves down the plate bevels is the single most "photographed"
            thing about the object. */}
        <Lightformer
          form="rect"
          /* Up from 2.2, and taller. The highlight it leaves is the object's
             single most photographed-looking feature, and it was running out
             of length before it reached the plinth — so the bottom third of
             every bevel had nothing to catch. */
          intensity={2.5}
          color={PALETTE.key}
          scale={[1.4, 7, 1]}
          position={[-4.5, 1.6, 3]}
        />
        {/* A narrow cool strip, camera right, purely for edge separation. */}
        <Lightformer
          form="rect"
          intensity={1.25}
          color={PALETTE.titaniumLit}
          scale={[0.5, 5, 1]}
          position={[4.6, 1, 1.5]}
        />
        {/* Overhead, broad and weak — the ceiling of the room. */}
        <Lightformer
          form="rect"
          intensity={0.55}
          color={PALETTE.key}
          scale={[7, 7, 1]}
          position={[0, 7, 0]}
        />
        {/* One warm card, low and behind, so the outside faces have some gold
            of their own to find. One percent of the frame. */}
        <Lightformer
          form="circle"
          intensity={0.5}
          color={PALETTE.gold}
          scale={[2.5, 2.5, 1]}
          position={[1.5, -2.5, -3]}
        />
      </ApexEnvironment>
    </>
  );
}
