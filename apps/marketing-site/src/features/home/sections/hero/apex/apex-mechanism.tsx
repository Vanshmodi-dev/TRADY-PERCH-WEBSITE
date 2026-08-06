"use client";

/**
 * THE APEX — the mechanism.
 *
 * The heart of the object, and the only thing in the scene that emits its own
 * light. Three gimbal rings on three different axes, two turned discs, a
 * bladed aperture, a ring of micro bearings, and a gold emitter at the centre
 * of all of it.
 *
 * The gold is generated *inside* the machine and escapes outward through the
 * shell's apertures. It is never applied to a face, never a rim light, never a
 * glow layered over the top. That distinction is the entire brand argument:
 * the value is in the working part, and the housing's job is to be plain
 * enough to say so.
 *
 * Nothing here spins like a loading indicator. Each ring runs at its own rate,
 * in its own direction, on its own axis, and none of the rates share a common
 * factor — so the assembly never returns to a pose it has held before and
 * never reads as a loop.
 */

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import {
  AdditiveBlending,
  MeshStandardMaterial,
  type Group,
  type Material,
  type Mesh,
} from "three";
import { MECHANISM, PALETTE, RATES, SEEDS } from "./apex-config";
import {
  bearingPositions,
  createIrisBladeGeometry,
  createRingGeometry,
  createTurnedDiscGeometry,
} from "./apex-geometry";
import { createSeededRandom, stepSpring, type SpringState } from "./apex-math";
import { createFalloffTexture, createTurnedSurface, disposeSurface } from "./apex-surfaces";

/**
 * Iris proportions. Blade length is held just above hub radius: any longer and
 * the blades overshoot the centre and stack into a solid disc instead of
 * closing onto an opening.
 *
 * The opening's radius is hubRadius · sin(swing) — which is why the travel and
 * the rest setting below are chosen against the emitter's radius rather than
 * picked to look right. At rest the aperture clears the emitter by a hair, so
 * the source is visible through it; at the detent extremes it stops down to a
 * slot and opens to twice clear.
 */
const IRIS_HUB_RADIUS = 0.222;
const IRIS_BLADE_LENGTH = 0.225;
const IRIS_BLADE_WIDTH = 0.075;
/** Where the aperture assembly sits along the mechanism's own axis. */
const IRIS_PLANE_Z = 0.132;
/** Full swing of a blade about its hub, radians. */
const IRIS_TRAVEL = 0.62;
/** The still pose: the setting the assembly is designed to rest at. */
const IRIS_REST = 0.68;

export interface ApexMechanismProps {
  still: boolean;
}

export function ApexMechanism({ still }: ApexMechanismProps) {
  const yawRef = useRef<Group>(null);
  const gimbalXRef = useRef<Group>(null);
  const gimbalYRef = useRef<Group>(null);
  const gimbalZRef = useRef<Group>(null);
  const discInnerRef = useRef<Group>(null);
  const discOuterRef = useRef<Group>(null);
  const bearingsRef = useRef<Group>(null);
  const emitterRef = useRef<Mesh>(null);
  const bladeRefs = useRef<(Group | null)[]>([]);

  /** Aperture setting, 0 closed to 1 open, plus its detent schedule. */
  const iris = useRef<SpringState>({ value: IRIS_REST, velocity: 0 });
  const irisTarget = useRef(IRIS_REST);
  const sinceDetent = useRef(0);
  const nextSetting = useMemo(() => createSeededRandom(SEEDS.mechanismSurface), []);

  const ringGeometries = useMemo(() => {
    const { radius, ringBand, ringHeight, ringChamfer, ringSegments } = MECHANISM;
    return [1, 0.83, 0.66].map((scale) => {
      const outer = radius * scale;
      return createRingGeometry(
        outer - ringBand,
        outer,
        ringHeight * (0.75 + scale * 0.25),
        ringChamfer,
        ringSegments,
      );
    });
  }, []);

  const discGeometries = useMemo(
    () => [
      createTurnedDiscGeometry(0.132, 0.246, 0.026, 5, MECHANISM.discSegments),
      createTurnedDiscGeometry(0.096, 0.191, 0.021, 4, MECHANISM.discSegments),
    ],
    [],
  );

  const bladeGeometry = useMemo(
    () => createIrisBladeGeometry(IRIS_BLADE_LENGTH, IRIS_BLADE_WIDTH),
    [],
  );

  const turnedSurface = useMemo(() => createTurnedSurface(SEEDS.mechanismSurface), []);
  const falloff = useMemo(() => createFalloffTexture(2.6), []);
  const bearings = useMemo(() => bearingPositions(), []);

  /*
   * One material instance per finish, shared by every part that has that
   * finish. Declaring `<meshStandardMaterial>` inline on each of the seven
   * machined meshes would build seven identical materials, each with its own
   * uniform block and its own texture bindings — the classic way a scene with
   * one material ends up costing like a scene with seven.
   */
  const machined = useMemo(
    () =>
      new MeshStandardMaterial({
        /*
         * Bare machined titanium, not the anodised housing. It is the lightest
         * value in the object by a wide margin and it is meant to be: the
         * mechanism has to survive being seen through a hole, at a distance,
         * against a shell that absorbs almost everything falling on it.
         */
        color: PALETTE.titaniumLit,
        metalness: 0.96,
        roughness: turnedSurface.roughnessMap ? 1 : 0.3,
        roughnessMap: turnedSurface.roughnessMap,
        normalMap: turnedSurface.normalMap,
        envMapIntensity: 1.35,
      }),
    [turnedSurface],
  );

  const bearingMetal = useMemo(
    () =>
      new MeshStandardMaterial({
        color: PALETTE.titaniumLit,
        metalness: 1,
        roughness: 0.16,
        envMapIntensity: 1.3,
      }),
    [],
  );

  const goldMetal = useMemo(
    () =>
      new MeshStandardMaterial({
        color: PALETTE.gold,
        metalness: 1,
        roughness: 0.26,
        envMapIntensity: 1.2,
      }),
    [],
  );

  useLayoutEffect(() => {
    const geometries = [...ringGeometries, ...discGeometries, bladeGeometry];
    const materials: Material[] = [machined, bearingMetal, goldMetal];
    return () => {
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      disposeSurface(turnedSurface);
      falloff?.dispose();
    };
  }, [
    ringGeometries,
    discGeometries,
    bladeGeometry,
    turnedSurface,
    falloff,
    machined,
    bearingMetal,
    goldMetal,
  ]);

  useFrame((state, rawDelta) => {
    if (still) return;
    const delta = Math.min(rawDelta, 0.1);

    if (yawRef.current) yawRef.current.rotation.y += RATES.mechanismYaw * delta;

    // Three axes, three rates, two directions. A ring turning about its own
    // axis of revolution would be invisible, so each pivots about a diameter
    // instead — which is what a gimbal actually does.
    if (gimbalXRef.current) gimbalXRef.current.rotation.x += RATES.gimbal[0] * delta;
    if (gimbalYRef.current) gimbalYRef.current.rotation.y += RATES.gimbal[1] * delta;
    if (gimbalZRef.current) gimbalZRef.current.rotation.z += RATES.gimbal[2] * delta;

    if (discInnerRef.current) discInnerRef.current.rotation.y += RATES.disc[0] * delta;
    if (discOuterRef.current) discOuterRef.current.rotation.y += RATES.disc[1] * delta;
    if (bearingsRef.current) bearingsRef.current.rotation.y -= RATES.gimbal[0] * 1.7 * delta;

    /*
     * The aperture does not breathe on a sine. It holds a setting, then takes
     * a new one — a critically damped step that arrives fast and stops dead,
     * the way a real mechanism seats against its detent. A sinusoid here would
     * read as an animation loop; this reads as an instrument adjusting itself.
     */
    sinceDetent.current += delta;
    if (sinceDetent.current >= RATES.irisIntervalSeconds) {
      sinceDetent.current = 0;
      irisTarget.current = 0.24 + nextSetting() * 0.62;
    }
    iris.current = stepSpring(iris.current, irisTarget.current, RATES.irisOmega, delta);

    const swing = IRIS_TRAVEL * iris.current.value;
    for (let index = 0; index < bladeRefs.current.length; index += 1) {
      const blade = bladeRefs.current[index];
      if (!blade) continue;
      blade.rotation.z = (index / MECHANISM.irisBlades) * Math.PI * 2 + Math.PI + swing;
    }

    // The emitter is not perfectly steady. A working part under load never is,
    // and a source that never varies reads as a texture rather than as light.
    // The variation is ±1.5%: felt, not seen.
    if (emitterRef.current) {
      emitterRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.42) * 0.015);
    }
  });

  return (
    <group ref={yawRef} position={[0, MECHANISM.centreY, 0]}>
      {/* Gimbals. Each ring's fixed orientation puts its own plane
          perpendicular to the axis its parent pivots about. */}
      <group ref={gimbalXRef}>
        <mesh geometry={ringGeometries[0]} material={machined} castShadow receiveShadow />
      </group>
      <group ref={gimbalYRef}>
        <mesh
          geometry={ringGeometries[1]}
          material={machined}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        />
      </group>
      <group ref={gimbalZRef}>
        <mesh
          geometry={ringGeometries[2]}
          material={machined}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
          receiveShadow
        />
      </group>

      {/* Turned discs, counter-rotating. The grooves are what make the
          rotation visible at all — a smooth disc revolving about its own axis
          is a still image. */}
      <group ref={discInnerRef} position={[0, 0.085, 0]}>
        <mesh geometry={discGeometries[0]} material={machined} castShadow receiveShadow />
      </group>
      <group ref={discOuterRef} position={[0, -0.098, 0]}>
        <mesh geometry={discGeometries[1]} material={machined} castShadow receiveShadow />
      </group>

      {/* Micro bearings riding an inner race. */}
      <group ref={bearingsRef}>
        {bearings.map((position, index) => (
          <mesh key={index} position={position} material={bearingMetal} castShadow>
            <sphereGeometry args={[MECHANISM.bearingRadius, 10, 8]} />
          </mesh>
        ))}
      </group>

      {/* The aperture. Gold-edged, because these are the only blades the
          emitter's light passes directly through. */}
      <group position={[0, 0, IRIS_PLANE_Z]}>
        {Array.from({ length: MECHANISM.irisBlades }, (_, index) => {
          const hub = (index / MECHANISM.irisBlades) * Math.PI * 2;
          return (
            <group
              key={index}
              ref={(node) => {
                bladeRefs.current[index] = node;
              }}
              position={[
                Math.cos(hub) * IRIS_HUB_RADIUS,
                Math.sin(hub) * IRIS_HUB_RADIUS,
                // Alternating by a tenth of a millimetre, so adjacent blades
                // pass each other instead of intersecting.
                (index % 2) * 0.006,
              ]}
              rotation={[0, 0, hub + Math.PI + IRIS_TRAVEL * IRIS_REST]}
            >
              <mesh geometry={bladeGeometry} material={goldMetal} castShadow receiveShadow />
            </group>
          );
        })}
      </group>

      {/* THE EMITTER — the source. Everything warm in this scene begins here
          and is occluded, reflected or absorbed on its way out. */}
      <mesh ref={emitterRef}>
        <sphereGeometry args={[MECHANISM.emitterRadius, 24, 16]} />
        <meshBasicMaterial color={PALETTE.goldHot} toneMapped={false} />
      </mesh>

      <pointLight
        color={PALETTE.gold}
        /* Inverse-square with a cutoff just outside the shell: the interior
           surfaces are close enough to be washed, the room is not. */
        intensity={3.8}
        distance={5.5}
        decay={2}
      />

      {/* The bloom, as two billboarded falloffs rather than a post-processing
          pass. A full-screen bloom would cost more than the entire rest of this
          scene, blow the gold out into a neon smear, and bleed across the
          headline sitting beside it. */}
      {falloff && (
        <Billboard>
          <mesh>
            <planeGeometry args={[0.86, 0.86]} />
            <meshBasicMaterial
              map={falloff}
              color={PALETTE.gold}
              transparent
              opacity={0.55}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          <mesh>
            <planeGeometry args={[2.4, 2.4]} />
            <meshBasicMaterial
              map={falloff}
              color={PALETTE.gold}
              transparent
              opacity={0.16}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </Billboard>
      )}
    </group>
  );
}
