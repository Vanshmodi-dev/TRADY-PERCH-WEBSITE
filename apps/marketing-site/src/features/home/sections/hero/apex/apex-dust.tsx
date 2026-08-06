"use client";

/**
 * THE APEX — suspended particulate.
 *
 * Metallic filings and gold dust hanging in the volume around the object.
 * Not sparks, not glitter, not snow, and emphatically not a particle system
 * with a velocity field: these are heavy, they have settled, and they are
 * going nowhere.
 *
 * What changes is not where they are but whether they are catching the light.
 * Each fleck is assigned a fixed facet direction at build time, and its
 * brightness is the response of that facet to the key — so as the key sweeps,
 * a scatter of flecks flares and dies across the volume, and the air itself
 * reads as part of the material story rather than as decoration on top of it.
 *
 * The whole field is one draw call, and the drift is computed on the GPU from
 * a single time uniform, so the CPU cost of five hundred flecks per frame is
 * writing two floats.
 */

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Vector3,
  type ShaderMaterial,
} from "three";
import { DUST, PALETTE, SEEDS } from "./apex-config";
import { createSeededRandom } from "./apex-math";

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform vec3 uLightDirection;

  attribute float aSeed;
  attribute float aScale;
  attribute float aTint;

  varying float vBrightness;
  varying float vTint;

  void main() {
    // Suspension, not motion. Three incommensurate periods per fleck, with a
    // total excursion of about four centimetres over a minute — enough that
    // the volume is never quite still, far too little to track.
    float t = uTime * 0.055;
    vec3 drifted = position + vec3(
      sin(t + aSeed * 6.2831),
      sin(t * 0.73 + aSeed * 12.566),
      cos(t * 0.61 + aSeed * 9.4248)
    ) * 0.045;

    vec4 viewPosition = modelViewMatrix * vec4(drifted, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = (uSize * aScale) / max(-viewPosition.z, 0.001);

    // A filing is a flat chip of metal with one dominant facet. It is dark
    // until that facet happens to face the key, and then briefly it is the
    // brightest thing in the frame.
    vec3 facet = normalize(vec3(
      sin(aSeed * 21.17),
      cos(aSeed * 13.31),
      sin(aSeed * 7.71 + 1.3)
    ));
    float alignment = max(dot(facet, uLightDirection), 0.0);
    vBrightness = (0.16 + 0.84 * pow(alignment, 6.0)) * (0.22 + 0.78 * aScale);
    vTint = aTint;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uTitanium;
  uniform vec3 uGold;

  varying float vBrightness;
  varying float vTint;

  void main() {
    // Round, with a soft shoulder. A square point sprite is the single most
    // recognisable tell of an untreated particle system.
    vec2 offset = gl_PointCoord - 0.5;
    float radial = dot(offset, offset);
    if (radial > 0.25) discard;

    float falloff = 1.0 - radial * 4.0;
    falloff *= falloff;

    vec3 tint = mix(uTitanium, uGold, vTint);
    gl_FragColor = vec4(tint, falloff * vBrightness);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export interface ApexDustProps {
  /** Written by the rig each frame: the unit vector from object to key light. */
  keyDirection: React.RefObject<Vector3>;
  still: boolean;
}

export function ApexDust({ keyDirection, still }: ApexDustProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const viewport = useThree((state) => state.size);
  const pixelRatio = useThree((state) => state.viewport.dpr);

  // Fewer flecks on a phone, where the object is smaller in frame and the
  // fill-rate cost of hundreds of overlapping additive sprites is highest.
  const count = viewport.width < 768 ? DUST.mobileCount : DUST.desktopCount;

  const geometry = useMemo(() => {
    const random = createSeededRandom(SEEDS.dust);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const scales = new Float32Array(count);
    const tints = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      // Biased outward, so the object sits in a clearing rather than in a fog.
      const radius = DUST.innerRadius + (DUST.outerRadius - DUST.innerRadius) * Math.pow(random(), 0.62);
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const ring = Math.sin(phi) * radius;

      positions[i * 3] = ring * Math.cos(theta);
      // Flattened vertically: this is a horizontal volume of air, not a ball.
      positions[i * 3 + 1] = Math.cos(phi) * radius * 0.68;
      positions[i * 3 + 2] = ring * Math.sin(theta);

      seeds[i] = random();
      // Squared, so almost every fleck is at the edge of resolvable and a
      // handful are large enough to notice.
      scales[i] = 0.3 + Math.pow(random(), 2) * 1.15;
      tints[i] = random() < DUST.goldFraction ? 1 : 0;
    }

    const buffer = new BufferGeometry();
    buffer.setAttribute("position", new Float32BufferAttribute(positions, 3));
    buffer.setAttribute("aSeed", new Float32BufferAttribute(seeds, 1));
    buffer.setAttribute("aScale", new Float32BufferAttribute(scales, 1));
    buffer.setAttribute("aTint", new Float32BufferAttribute(tints, 1));
    return buffer;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: DUST.size },
      uLightDirection: { value: new Vector3(0, 1, 0) },
      uTitanium: { value: new Color(PALETTE.titaniumLit) },
      uGold: { value: new Color(PALETTE.goldHot) },
    }),
    [],
  );

  // Point size is in device pixels, so it has to track both the display's
  // pixel ratio and the canvas height, or the flecks are chunky on a phone and
  // invisible on a 5K panel.
  useLayoutEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    const { uSize } = material.uniforms;
    if (uSize) uSize.value = DUST.size * pixelRatio * (viewport.height / 820);
  }, [pixelRatio, viewport.height]);

  // R3F disposes what it constructed; the geometry was built here, so it is
  // released here.
  useLayoutEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    const { uLightDirection, uTime } = material.uniforms;

    // The rig owns the key's direction; the dust follows it one frame later,
    // which is imperceptible and saves threading it through the scene graph.
    const direction = keyDirection.current;
    if (uLightDirection && direction) uLightDirection.value.copy(direction);

    // In the still presentation the drift is frozen, but the flecks still
    // resolve against the key at its resting angle — the field is present, it
    // simply is not moving.
    if (uTime && !still) uTime.value = state.clock.elapsedTime;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
