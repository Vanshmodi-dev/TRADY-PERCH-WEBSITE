"use client";

/**
 * THE APEX — the shell.
 *
 * Four machined face plates, a truncated apex fitting, a plinth, and twelve
 * fastener heads. Nothing is welded and nothing is moulded: this is an
 * assembly, and it is built to read as one, because an object that could
 * plausibly be taken apart is an object someone had to design.
 *
 * The plates are the brand argument made physical. The housing is the least
 * interesting surface in the frame — deliberately plain, deliberately dark —
 * and it is cut open so that the only thing worth looking at is what is
 * working inside it.
 */

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Matrix4, Quaternion, Vector2, Vector3, type Group, type InstancedMesh } from "three";
import { PALETTE, RATES, SEEDS, SHELL } from "./apex-config";
import {
  createApexCapGeometry,
  createFacePlateGeometry,
  createPlinthGeometry,
  createScrewGeometry,
  facePlateScrewPoints,
} from "./apex-geometry";
import { faceAnchor, faceAzimuth, faceNormal, faceTilt } from "./apex-math";
import { createMachinedSurface, disposeSurface } from "./apex-surfaces";

const UP = new Vector3(0, 1, 0);
const RIGHT = new Vector3(1, 0, 0);

/**
 * Which plate carries the etched markings and the monogram. Plate 0 faces the
 * camera in the rest pose: the reward for looking closely has to be on the
 * face someone is already looking at.
 */
const MARKED_PLATE = 0;

interface PlatePlacement {
  position: [number, number, number];
  quaternion: [number, number, number, number];
  normal: Vector3;
}

/**
 * A plate's rotation is a tilt about its own base edge, then a quarter turn
 * about the vertical. Composed as quaternions rather than Euler angles because
 * the order those two are applied in is the whole difference between a pyramid
 * and a pile of plates, and an Euler triple does not say which order it means.
 */
function computePlacements(): PlatePlacement[] {
  const tilt = faceTilt(SHELL.baseHalfWidth, SHELL.height);

  return [0, 1, 2, 3].map((index) => {
    const quaternion = new Quaternion()
      .setFromAxisAngle(UP, faceAzimuth(index))
      .multiply(new Quaternion().setFromAxisAngle(RIGHT, -tilt));

    return {
      position: faceAnchor(index, SHELL.baseHalfWidth),
      quaternion: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
      normal: new Vector3(...faceNormal(index, tilt)),
    };
  });
}

export interface ApexShellProps {
  /**
   * Reduced motion. The shell holds its designed pose rather than slowing
   * down — a still is the designed presentation, not a degraded one.
   */
  still: boolean;
}

export function ApexShell({ still }: ApexShellProps) {
  const spinRef = useRef<Group>(null);
  const screwsRef = useRef<InstancedMesh>(null);

  const placements = useMemo(() => computePlacements(), []);
  const plateGeometry = useMemo(() => createFacePlateGeometry(), []);
  const capGeometry = useMemo(() => createApexCapGeometry(), []);
  const plinthGeometry = useMemo(() => createPlinthGeometry(), []);
  const screwGeometry = useMemo(() => createScrewGeometry(), []);

  const plainSurface = useMemo(() => createMachinedSurface(SEEDS.shellSurface), []);
  const markedSurface = useMemo(() => createMachinedSurface(SEEDS.markedSurface, true), []);
  const normalScale = useMemo(() => new Vector2(0.62, 0.62), []);

  useLayoutEffect(() => {
    const geometries = [plateGeometry, capGeometry, plinthGeometry, screwGeometry];
    return () => {
      for (const geometry of geometries) geometry.dispose();
      disposeSurface(plainSurface);
      disposeSurface(markedSurface);
    };
  }, [plateGeometry, capGeometry, plinthGeometry, screwGeometry, plainSurface, markedSurface]);

  // Fastener heads: three per plate, seated proud of the plate face and
  // aligned to that face's normal. One instanced draw call for all twelve.
  useLayoutEffect(() => {
    const instanced = screwsRef.current;
    if (!instanced) return;

    const matrix = new Matrix4();
    const position = new Vector3();
    const orientation = new Quaternion();
    const scale = new Vector3(1, 1, 1);
    const toNormal = new Quaternion().setFromAxisAngle(RIGHT, Math.PI / 2);
    const screwPoints = facePlateScrewPoints();
    let index = 0;

    for (const placement of placements) {
      const plateRotation = new Quaternion(...placement.quaternion);
      orientation.copy(plateRotation).multiply(toNormal);

      for (const point of screwPoints) {
        position
          .set(point.x, point.y, SHELL.plateThickness + SHELL.screwHeight / 2 - 0.004)
          .applyQuaternion(plateRotation)
          .add(new Vector3(...placement.position));

        instanced.setMatrixAt(index, matrix.compose(position, orientation, scale));
        index += 1;
      }
    }

    instanced.count = index;
    instanced.instanceMatrix.needsUpdate = true;
  }, [placements]);

  useFrame((_, delta) => {
    const spin = spinRef.current;
    if (!spin || still) return;
    // Roughly eleven minutes per revolution. Below the threshold at which
    // rotation registers as animation, above the threshold at which a returning
    // visitor notices the light falls differently than it did.
    spin.rotation.y += RATES.shellYaw * Math.min(delta, 0.1);
  });

  return (
    <group ref={spinRef} rotation={[0, SHELL.restYaw, 0]}>
      {placements.map((placement, index) => {
        const surface = index === MARKED_PLATE ? markedSurface : plainSurface;
        return (
          <mesh
            key={index}
            geometry={plateGeometry}
            position={placement.position}
            quaternion={placement.quaternion}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial
              color={PALETTE.anodised}
              /*
               * Black anodising is an oxide layer over metal, which is to say
               * a dielectric — not a metal. Authoring it as one (metalness 1)
               * is the single commonest way to get this material wrong: a
               * metal's specular is tinted by its base colour, so a black
               * metal reflects almost nothing and the object disappears. Held
               * low, the dielectric's flat ~4% reflectance survives, and the
               * bevels catch the key exactly as anodised aluminium does.
               */
              metalness={0.22}
              roughness={surface.roughnessMap ? 1 : 0.62}
              roughnessMap={surface.roughnessMap}
              normalMap={surface.normalMap}
              normalScale={normalScale}
              /* The sealed top coat: present, but weak and rough. A strong
                 clearcoat puts a second, tighter specular lobe on top of the
                 first, and two overlapping lobes on a dark surface is exactly
                 how matte black turns into wet-look plastic. */
              clearcoat={0.24}
              clearcoatRoughness={0.46}
              envMapIntensity={0.5}
            />
          </mesh>
        );
      })}

      {/* The apex fitting is finished a shade finer than the plates — a small
          part machined to a tighter tolerance, which is what happens on real
          assemblies and reads here as a highlight that runs cleanly down the
          four hips. */}
      <mesh geometry={capGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={PALETTE.anodised}
          metalness={0.3}
          roughness={0.52}
          clearcoat={0.3}
          clearcoatRoughness={0.38}
          envMapIntensity={0.6}
        />
      </mesh>

      <mesh geometry={plinthGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={PALETTE.anodised}
          metalness={0.34}
          roughness={plainSurface.roughnessMap ? 1 : 0.58}
          roughnessMap={plainSurface.roughnessMap}
          normalMap={plainSurface.normalMap}
          normalScale={normalScale}
          clearcoat={0.26}
          clearcoatRoughness={0.42}
          envMapIntensity={0.55}
        />
      </mesh>

      {/* Bare titanium, not anodised — a fastener is a bought-in part and
          would not have been finished with the housing. */}
      <instancedMesh
        ref={screwsRef}
        args={[screwGeometry, undefined, 12]}
        castShadow
        frustumCulled={false}
      >
        <meshStandardMaterial
          color={PALETTE.titanium}
          metalness={0.95}
          roughness={0.34}
          envMapIntensity={0.9}
        />
      </instancedMesh>
    </group>
  );
}
