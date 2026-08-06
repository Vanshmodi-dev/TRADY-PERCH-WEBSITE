import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { HeroApex } from "./apex";
import styles from "./hero.module.css";

/**
 * THE HERO — asymmetric composition, type left, the Apex right.
 *
 * Deliberately not centred. Centring turns the object into a hero image;
 * placing it off-axis makes it a subject in a room, with the type block
 * holding the entry point. On narrow viewports the two stack, type first —
 * the claim is never below the object at any width.
 *
 * This is a server component. The headline, supporting copy and both CTAs are
 * in the initial HTML, so the intro overlay always dissolves into a finished
 * hero and a JS failure or slow connection still delivers the full message.
 * Only the Apex, which is decorative, is client-side.
 *
 * Choreography: eyebrow, headline, supporting copy, actions, then the object —
 * a staggered settle on the Entrance curve, mount-triggered rather than
 * scroll-triggered, because the hero is the one section already in view.
 *
 * ── The object ────────────────────────────────────────────────────────────
 *
 * `HeroApex` — the real-time render specified by ADR-0011. It replaces the
 * layered-CSS Core that shipped here previously: a disc housing with a gold
 * rotor behind an aperture, whose material was painted with gradients rather
 * than lit, and which therefore had no silhouette, no self-shadowing and no
 * surface for a raking light to find.
 *
 * Worth knowing, because it caused a real incident: ADR-0011 was written and
 * the Apex was built, but this line was never changed — the render sat in the
 * tree importing three.js while the page went on rendering the CSS Core, so
 * the decision looked shipped and was not. It is wired now. If it is ever
 * swapped out again, delete the implementation in the same commit rather than
 * leaving it orphaned.
 *
 * The Apex is deferred by construction (see apex.tsx): nothing is fetched
 * until WebGL is available, the hero is near the viewport, and the main thread
 * is idle. Its designed still ships in the first byte of HTML and reserves the
 * exact box, so the hand-off costs no layout shift and a visitor without WebGL
 * keeps a composed object rather than a hole.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Build. Automate. Grow.</p>

          <h1 id="hero-heading" className={styles.headline}>
            The manual work slowing your business down, rebuilt into systems that run themselves.
          </h1>

          <p className={styles.subheadline}>
            Trady Perch designs and deploys AI agents, workflow automation, and custom integrations
            for established businesses ready to stop doing everything by hand.
          </p>

          <div className={styles.actions}>
            <Button href="/contact" linkComponent={NextLinkAdapter} size="lg">
              Book a Strategy Call
            </Button>
            <Button
              href="/#ai-demo-heading"
              linkComponent={NextLinkAdapter}
              emphasis="ghost"
              size="lg"
            >
              See it in action
            </Button>
          </div>
        </div>

        <div className={styles.object}>
          <HeroApex />
        </div>
      </div>
    </section>
  );
}
