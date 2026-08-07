"use client";

/**
 * THE APEX — one pointer, read by everything that responds to it.
 *
 * Two things in the scene now answer the cursor: the key light swings, and the
 * whole object shifts a few millimetres against the frame. They must answer
 * the *same* number. Two independent listeners would each sample on their own
 * event and drift by a frame, and the object would appear to lag its own
 * lighting — a tell that is almost impossible to name and immediately reads as
 * cheap.
 *
 * A module-scope store rather than context: there is exactly one Apex on the
 * page, the value is written on a hot input path, and pushing it through React
 * state would re-render the tree on every pointer move for a value only the
 * render loop reads.
 *
 * Coarse pointers never subscribe. There is no hover on a touch screen, so
 * tracking taps would make the light jump and the object twitch; the resting
 * pose is the designed one and it stays.
 */

import { useEffect, useRef } from "react";
import { RIG } from "./apex-config";

export interface PointerPosition {
  /** -1 (left) .. 1 (right), relative to the viewport. */
  x: number;
  /** -1 (top) .. 1 (bottom), relative to the viewport. */
  y: number;
}

const position: PointerPosition = { x: RIG.keyRest.x, y: RIG.keyRest.y };

type Subscriber = () => void;
const subscribers = new Set<Subscriber>();
let detach: (() => void) | null = null;

function notify() {
  for (const subscriber of subscribers) subscriber();
}

function attach() {
  if (detach || typeof window === "undefined") return;

  const onPointerMove = (event: PointerEvent) => {
    position.x = (event.clientX / window.innerWidth - 0.5) * 2;
    position.y = (event.clientY / window.innerHeight - 0.5) * 2;
    notify();
  };

  const onPointerOut = (event: PointerEvent) => {
    // Only when the pointer actually leaves the window, not when it crosses
    // into a child element.
    if (event.relatedTarget !== null) return;
    position.x = RIG.keyRest.x;
    position.y = RIG.keyRest.y;
    notify();
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerout", onPointerOut);

  detach = () => {
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerout", onPointerOut);
  };
}

/**
 * Subscribe to the shared pointer for as long as this component is mounted and
 * `enabled`.
 *
 * `onChange` is called on every move — pass the render loop's `invalidate` so
 * an on-demand loop wakes up for it. The returned ref is read per frame; it is
 * never a re-render trigger.
 */
export function useApexPointer(
  enabled: boolean,
  onChange?: () => void,
): React.RefObject<PointerPosition> {
  const ref = useRef(position);
  const changeRef = useRef(onChange);

  // Synced in an effect rather than during render: a ref write during render
  // is not a rendering concern and React lints it as one. This runs before
  // the subscribe effect below on every commit, so the callback the
  // subscriber reads is never a stale one.
  useEffect(() => {
    changeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const subscriber = () => changeRef.current?.();
    subscribers.add(subscriber);
    attach();

    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        detach?.();
        detach = null;
        // Back to the designed resting aim, so a remount does not inherit
        // wherever the cursor happened to be when the last subscriber left.
        position.x = RIG.keyRest.x;
        position.y = RIG.keyRest.y;
      }
    };
  }, [enabled]);

  return ref;
}
