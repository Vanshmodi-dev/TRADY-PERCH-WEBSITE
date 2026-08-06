/**
 * THE APEX — procedural geometry.
 *
 * Every part of this object is generated from numbers at run time. There is no
 * GLB, no mesh download, and nothing to lazy-load but code. That is partly a
 * performance decision — the whole assembly is a few tens of kilobytes of
 * float arrays built in under a millisecond — and partly an honest one: a
 * machined part is defined by its dimensions, so the dimensions are what the
 * repository stores.
 *
 * Two rules govern everything here:
 *
 *   Bevels, always. Every edge that would exist on a real machined part gets a
 *   chamfer. A zero-radius edge catches no light at all, which is precisely why
 *   untextured 3D reads as plastic — there is no highlight to run along.
 *
 *   Lathe over triangulation. Anything with an axis of revolution is built as
 *   a revolved profile, because that is how it would actually be made. It also
 *   gives correct, continuous normals for free, which a hand-built ring does
 *   not.
 */

import {
  CylinderGeometry,
  ExtrudeGeometry,
  LatheGeometry,
  Path,
  Shape,
  Vector2,
  type BufferGeometry,
} from "three";
import { MECHANISM, SHELL } from "./apex-config";
import { bandPoint, faceSlant, insetTriangle, type Point2, type Triangle } from "./apex-math";

/* ------------------------------------------------------------------ *
 * UVs
 * ------------------------------------------------------------------ */

/**
 * Reproject a geometry's UVs as a flat plan view of its own XY bounds.
 *
 * ExtrudeGeometry's default UV generator emits shape-space coordinates in
 * modelling units, which is unusable for a texture that has to land specific
 * marks — a serial etch, a monogram — at specific places on the part. A
 * normalised plan projection is exactly how the machining drawing would be
 * dimensioned, and it puts texel (0,0) at a known corner of the plate.
 */
export function applyPlanarUv(geometry: BufferGeometry): void {
  geometry.computeBoundingBox();
  const bounds = geometry.boundingBox;
  if (!bounds) return;

  const width = bounds.max.x - bounds.min.x || 1;
  const height = bounds.max.y - bounds.min.y || 1;

  const position = geometry.getAttribute("position");
  const uv = geometry.getAttribute("uv");
  if (!position || !uv) return;

  for (let i = 0; i < position.count; i += 1) {
    uv.setXY(
      i,
      (position.getX(i) - bounds.min.x) / width,
      (position.getY(i) - bounds.min.y) / height,
    );
  }
  uv.needsUpdate = true;
}

/* ------------------------------------------------------------------ *
 * The shell
 * ------------------------------------------------------------------ */

/**
 * The outline of one face plate, in the plate's own 2D space: origin at the
 * midpoint of the base edge, +Y running up the slope toward the apex.
 */
export function facePlateOutline(): Triangle {
  const slant = faceSlant(SHELL.baseHalfWidth, SHELL.height);
  return [
    { x: -SHELL.baseHalfWidth, y: 0 },
    { x: SHELL.baseHalfWidth, y: 0 },
    { x: 0, y: slant },
  ];
}

function traceTriangle(target: Shape | Path, triangle: Triangle): void {
  const [a, b, c] = triangle;
  target.moveTo(a.x, a.y);
  target.lineTo(b.x, b.y);
  target.lineTo(c.x, c.y);
  target.closePath();
}

/**
 * One face plate: a triangular frame of plate stock with a triangular aperture
 * cut through it, chamfered on every edge.
 *
 * The aperture is what makes the object hollow rather than solid, and it is
 * self-similar to the plate on purpose — the same triangle, inset. A circular
 * or rectangular window would be a hole in a pyramid; a triangular one is the
 * part's own geometry, repeated, which is what machined design language
 * actually looks like.
 *
 * The geometry is returned with its inner face on local z = 0, so a plate can
 * be positioned at the ideal pyramid plane and grow outward from it.
 */
export function createFacePlateGeometry(): ExtrudeGeometry {
  const outline = facePlateOutline();
  const aperture = insetTriangle(outline, SHELL.apertureMargin);

  const shape = new Shape();
  traceTriangle(shape, outline);

  if (aperture) {
    const hole = new Path();
    // Reversed winding: a hole must run opposite to its shape, or the
    // triangulator fills it in as solid.
    traceTriangle(hole, [aperture[2], aperture[1], aperture[0]]);
    shape.holes.push(hole);
  }

  const bevel = SHELL.plateBevel;
  const geometry = new ExtrudeGeometry(shape, {
    depth: SHELL.plateThickness - 2 * bevel,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: 0,
    bevelSegments: 2,
    steps: 1,
    curveSegments: 1,
  });

  applyPlanarUv(geometry);
  // ExtrudeGeometry runs the bevel from -bevelThickness; shifting by that much
  // puts the plate's flat inner face exactly on the pyramid's ideal plane.
  geometry.translate(0, 0, bevel);
  geometry.computeVertexNormals();
  return geometry;
}

/** Where the three fastener heads sit on a plate, in plate-local 2D. */
export function facePlateScrewPoints(): Point2[] {
  const outline = facePlateOutline();
  // 0.74 of the way from the incentre to each vertex lands mid-band for this
  // plate's proportions, wherever the aperture inset leaves the band.
  return [0, 1, 2].map((index) => bandPoint(outline, index, 0.74));
}

/**
 * The apex fitting: a short truncated pyramid capping the point where the four
 * plates converge.
 *
 * Truncated rather than pointed, because a mathematically perfect point is the
 * one thing a machinist cannot deliver — real tooling leaves a small flat, and
 * its absence is a tell. It also mercifully hides the four-way mitre.
 */
export function createApexCapGeometry(): CylinderGeometry {
  const capHeight = SHELL.height * SHELL.apexCapFraction;
  // Half-width of the pyramid where the cap begins; × √2 for the circumradius
  // of that square cross-section.
  const circumradius = SHELL.baseHalfWidth * SHELL.apexCapFraction * Math.SQRT2 * SHELL.apexCapProud;

  const geometry = new CylinderGeometry(circumradius * 0.075, circumradius, capHeight, 4, 1, false);
  // A 4-segment cylinder puts its corners on the axes; the shell's corners sit
  // at 45°, so the cap has to be indexed round to match.
  geometry.rotateY(Math.PI / 4);
  geometry.translate(0, SHELL.height - capHeight / 2, 0);
  return geometry;
}

/**
 * The plinth: a square collar the four plates land on, overhanging slightly.
 *
 * It does the same job as the apex fitting at the other end — it terminates
 * the plates in a machined part rather than in mid-air, and gives the object a
 * base that reads as engineered rather than cropped.
 */
export function createPlinthGeometry(): ExtrudeGeometry {
  const outer = SHELL.baseHalfWidth + SHELL.plinthOverhang;
  const inner = SHELL.baseHalfWidth - SHELL.plinthInset;
  const bevel = SHELL.plateBevel;
  const depth = SHELL.plinthHeight - 2 * bevel;

  const shape = new Shape();
  shape.moveTo(-outer, -outer);
  shape.lineTo(outer, -outer);
  shape.lineTo(outer, outer);
  shape.lineTo(-outer, outer);
  shape.closePath();

  const hole = new Path();
  hole.moveTo(-inner, -inner);
  hole.lineTo(-inner, inner);
  hole.lineTo(inner, inner);
  hole.lineTo(inner, -inner);
  hole.closePath();
  shape.holes.push(hole);

  const geometry = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: 0,
    bevelSegments: 2,
    steps: 1,
    curveSegments: 1,
  });

  applyPlanarUv(geometry);
  // Extruded in XY, so it is lying on its side; stand it up and drop it so its
  // top face is level with the base plane the plates start from.
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, -(depth + bevel), 0);
  geometry.computeVertexNormals();
  return geometry;
}

/* ------------------------------------------------------------------ *
 * The mechanism
 * ------------------------------------------------------------------ */

/**
 * A machined ring with a rectangular section and a chamfer on all four
 * corners, revolved about Y.
 *
 * The profile is traced starting from the middle of the bottom face rather
 * than from a corner. LatheGeometry averages the normals where a closed
 * profile meets itself; starting mid-face means the two averaged neighbours
 * are collinear, so the average is the true normal and the seam is invisible.
 * Starting at a corner puts a softened normal on a chamfer that is supposed to
 * be the sharpest thing in the frame.
 */
export function createRingGeometry(
  innerRadius: number,
  outerRadius: number,
  height: number,
  chamfer: number,
  segments: number,
): LatheGeometry {
  const halfHeight = height / 2;
  const mid = (innerRadius + outerRadius) / 2;

  const profile = [
    new Vector2(mid, -halfHeight),
    new Vector2(outerRadius - chamfer, -halfHeight),
    new Vector2(outerRadius, -halfHeight + chamfer),
    new Vector2(outerRadius, halfHeight - chamfer),
    new Vector2(outerRadius - chamfer, halfHeight),
    new Vector2(innerRadius + chamfer, halfHeight),
    new Vector2(innerRadius, halfHeight - chamfer),
    new Vector2(innerRadius, -halfHeight + chamfer),
    new Vector2(innerRadius + chamfer, -halfHeight),
    new Vector2(mid, -halfHeight),
  ];

  return new LatheGeometry(profile, segments);
}

/**
 * A turned disc: a ring whose top face carries concentric grooves, exactly as
 * it would if it had been cut on a lathe with a parting tool.
 *
 * The grooves are the reason this part is worth having. They are the only
 * surface in the assembly with real relief at this scale, so they are what the
 * key light breaks across when it rakes over the mechanism — a flat disc, no
 * matter how well shaded, reads as a decal.
 */
export function createTurnedDiscGeometry(
  innerRadius: number,
  outerRadius: number,
  thickness: number,
  grooveCount: number,
  segments: number,
): LatheGeometry {
  const halfThickness = thickness / 2;
  const chamfer = Math.min(0.006, thickness * 0.22);
  const span = outerRadius - innerRadius;
  const grooveDepth = thickness * 0.3;
  const pitch = span / (grooveCount + 1);
  const grooveWidth = pitch * 0.42;

  const profile: Vector2[] = [
    new Vector2((innerRadius + outerRadius) / 2, -halfThickness),
    new Vector2(outerRadius - chamfer, -halfThickness),
    new Vector2(outerRadius, -halfThickness + chamfer),
    new Vector2(outerRadius, halfThickness - chamfer),
    new Vector2(outerRadius - chamfer, halfThickness),
  ];

  // Cut inward across the top face, one groove per pitch.
  for (let i = grooveCount; i >= 1; i -= 1) {
    const centre = innerRadius + pitch * i;
    profile.push(
      new Vector2(centre + grooveWidth / 2, halfThickness),
      new Vector2(centre + grooveWidth / 2, halfThickness - grooveDepth),
      new Vector2(centre - grooveWidth / 2, halfThickness - grooveDepth),
      new Vector2(centre - grooveWidth / 2, halfThickness),
    );
  }

  profile.push(
    new Vector2(innerRadius + chamfer, halfThickness),
    new Vector2(innerRadius, halfThickness - chamfer),
    new Vector2(innerRadius, -halfThickness + chamfer),
    new Vector2(innerRadius + chamfer, -halfThickness),
    new Vector2((innerRadius + outerRadius) / 2, -halfThickness),
  );

  return new LatheGeometry(profile, segments);
}

/**
 * One blade of the mechanical aperture.
 *
 * The leading edge is dead straight from hub to tip, and that is the whole
 * design: eight straight edges are what make an aperture read as an aperture,
 * because the opening they leave is a clean octagon that visibly grows and
 * shrinks. Curve that edge — the intuitive choice, since real iris leaves look
 * curved — and eight blades pile into an indistinct rosette instead.
 *
 * The trailing edge does sweep, because that is what lets the blades nest past
 * one another as they close rather than collide.
 */
export function createIrisBladeGeometry(length: number, width: number): ExtrudeGeometry {
  const shape = new Shape();
  shape.moveTo(0, -width / 2);
  shape.lineTo(length, -width * 0.2);
  shape.lineTo(length * 0.93, width * 0.24);
  shape.quadraticCurveTo(length * 0.44, width * 0.66, 0, width / 2);
  shape.closePath();

  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.008,
    bevelEnabled: true,
    bevelThickness: 0.0022,
    bevelSize: 0.0022,
    bevelOffset: 0,
    bevelSegments: 1,
    steps: 1,
    curveSegments: 6,
  });

  applyPlanarUv(geometry);
  geometry.computeVertexNormals();
  return geometry;
}

/** A fastener head: a shallow chamfered cylinder, seated proud of the plate. */
export function createScrewGeometry(): CylinderGeometry {
  return new CylinderGeometry(
    SHELL.screwRadius * 0.82,
    SHELL.screwRadius,
    SHELL.screwHeight,
    14,
    1,
    false,
  );
}

/** Positions of the micro bearings that ride the innermost gimbal. */
export function bearingPositions(): [number, number, number][] {
  const radius = MECHANISM.radius * 0.52;
  return Array.from({ length: MECHANISM.bearingCount }, (_, i) => {
    const theta = (i / MECHANISM.bearingCount) * Math.PI * 2;
    return [Math.cos(theta) * radius, 0, Math.sin(theta) * radius];
  });
}
