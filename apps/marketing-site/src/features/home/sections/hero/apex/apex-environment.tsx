"use client";

/**
 * THE APEX — the studio, captured once.
 *
 * Machined metal is only as convincing as what it has to reflect. With no
 * environment at all, every bevel on the object returns pure black and the
 * whole assembly reads as matte plastic no matter how the lights are placed —
 * which is why the softboxes here matter as much as the key does.
 *
 * This renders a handful of emissive panels into a cube map exactly once, at
 * mount, and hands the result to the scene as its environment. It replaces
 * drei's `<Environment>`, which does the same job and does it well, but which
 * also drags in three-stdlib's Radiance HDR and OpenEXR loaders and its
 * ground-projection sphere — roughly 60KB gzipped of image decoders for a
 * scene that loads no images. The panels are geometry, so none of that
 * machinery is reachable.
 *
 * One capture, six faces, 128px. It happens in well under a frame and never
 * happens again: the studio does not move, and a cube map re-rendered every
 * frame would show precisely the same thing.
 */

import { useEffect, useMemo } from "react";
import { createPortal, useThree } from "@react-three/fiber";
import { Color, CubeCamera, HalfFloatType, Scene, WebGLCubeRenderTarget } from "three";

/** Enough to hold a soft vertical highlight; far too little to hold detail. */
const RESOLUTION = 128;

export interface ApexEnvironmentProps {
  /** The room: emissive panels, positioned in world space around the object. */
  children: React.ReactNode;
}

export function ApexEnvironment({ children }: ApexEnvironmentProps) {
  const gl = useThree((state) => state.gl);

  const studio = useMemo(() => {
    const room = new Scene();
    // Not pure black: a room with nothing in it still has walls, and a
    // reflection that falls to absolute zero reads as a hole rather than as a
    // dark surface.
    room.background = new Color("#050506");

    const target = new WebGLCubeRenderTarget(RESOLUTION, { type: HalfFloatType });
    return { room, target, camera: new CubeCamera(0.1, 100, target) };
  }, []);

  useEffect(() => {
    const { room, camera, target } = studio;
    // Portal children are committed before this effect runs, so the panels
    // are already in the room by the time it is photographed.
    camera.update(gl, room);
    return () => target.dispose();
  }, [studio, gl]);

  return (
    <>
      {createPortal(children, studio.room)}
      {/* Attached declaratively rather than assigned to `scene.environment`,
          so React owns the binding and tears it down on unmount. */}
      <primitive object={studio.target.texture} attach="environment" />
    </>
  );
}
