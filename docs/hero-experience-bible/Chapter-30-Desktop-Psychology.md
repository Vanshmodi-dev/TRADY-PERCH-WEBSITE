# CHAPTER 30 — DESKTOP PSYCHOLOGY

**Trady Perch Hero Experience Bible · Part IX: Context**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision §6.2 (measure held on wide desktop viewports), §5.1. Design System Bible Ch. 51 (Desktop Design Standards), Ch. 8. Hero Experience Bible Ch. 7, 9, 19, 20.
**Governs:** What is different about the hero when it is encountered on a desktop, and what that changes.
**Does Not Govern:** Layout or breakpoint specifications (DSB Ch. 8, Ch. 51).

---

## 1. THE POSITION

**Abundance is the desktop's difficulty.** Mobile's constraint is scarcity — every element competes for a small area, and the discipline is forced. Desktop's constraint is the opposite and is harder to hold: there is room for everything, so nothing forces a decision.

This is why desktop heroes bloat and mobile heroes rarely do. The stakeholder request that cannot fit on a phone always fits on a 1440px display, and Chapter 20's pressure asymmetry does the rest — the space is spent, nobody records the cost, and five releases later the hero is dense. **Desktop space is not capacity, it is composition.** The wide viewport is where Chapter 20's allocation table earns its place, because it is the only mechanism treating abundant space as already-allocated rather than available.

**Peripheral vision is real here.** On a phone the entire viewport is close to foveal. On a desktop at typical viewing distance only a small central region is sharp; the rest is peripheral — highly sensitive to motion and luminance, largely insensitive to detail and text. Two consequences:

- **Motion in the periphery is more disruptive on desktop, not less.** An ambient animation in a corner of a wide hero is outside the visitor's focus and inside their motion detection — the worst combination, capturing attention without offering anything to look at. Desktop is where At-2's cost is highest.
- **Composition is read peripherally before foveally.** Overall luminance structure, the shape of the text block, the amount of emptiness — all processed in the pre-attentive window from peripheral input. This is exactly what the blur test simulates, and it is more diagnostic on desktop than on mobile.

**The pointer reports intent — and this Bible declines to use it.** Cu-3 forbids cursor-driven effects; Ix-2 forbids decorative response. The pointer's value here is *diagnostic, not interactive*: enormously useful in usability observation (a cursor drifting to the tab bar at T+6 is a signal; a cursor hovering the CTA without clicking is a signal) and not a channel the hero should exploit. The one legitimate use is the ordinary one — precise targeting permits smaller hit areas than touch requires and makes hover states meaningful. Neither is an invitation to do more.

---

## 2. CORE PRINCIPLES

**Dk-1 — Width is not capacity.** Additional viewport width does not license additional hero content. The single most important desktop principle, because it is the mechanism by which a governed hero becomes ungoverned: every constraint in this Bible — four chunks, three rungs, one CTA, four type sizes — is device-independent, and desktop is where they are most easily forgotten. *Desktop and mobile differ in composition, spacing, and scale — not in content quantity.*

**Dk-2 — Measure is held at every width.** Line length stays within 60–75 characters regardless of viewport width. §6.2 states this with explicit emphasis on wide desktop viewports; Ty-3 makes it a credibility constraint rather than a comfort one. Desktop is the only context where this fails, and it fails silently — nothing breaks, the text simply becomes harder to read and the claim less believable. *Constraining measure and constraining the container are different decisions with different compositional consequences.*

**Dk-3 — Peripheral motion is held to a higher bar.** Motion outside the central focal region is subject to the same prohibitions as central motion, and is more damaging when violated. This principle exists because the intuitive argument runs the other way — "it's off to the side, it won't distract" — and that argument is precisely backwards.

**Dk-4 — The composition must hold at every width, not every breakpoint.** Verified by continuous resizing across the desktop range, not by checking named breakpoints. Real desktop widths are continuous and frequently non-standard: a half-screen window, a scaled display, a browser with a sidebar open. A hero excellent at three named widths and awkward between them is optimised for a review, not for use. *A requirement that the composition be fluid — usually achieved by getting the ratios right rather than by adding breakpoints.*

**Dk-5 — Desktop is where the hero is judged in company.** It must hold up when displayed to a second person — screen-shared, projected, or looked at over a shoulder. §5.1's buyer "often requir[es]... to convince a colleague or a partner," and that conversation happens on a desktop with the site on screen. A hero that would embarrass the person showing it has cost the deal regardless of any metric. *A demand for composure, not impressiveness — the quality that survives being shown to a skeptic by an advocate.*

---

## 3. THE DESKTOP CONTEXT

| Property | Desktop reality | Hero obligation |
|---|---|---|
| **Posture** | Seated, at work, evaluating | Serve the Comparison Shopper and Returning Decider without adapting (Ui-3) |
| **Attention** | Divided across tabs; interruptible | Comprehensible from a cold restart at any moment |
| **Space** | Abundant | Governed, not filled (Dk-1) |
| **Vision** | Central detail, peripheral motion sensitivity | No peripheral motion (Dk-3); composition legible when blurred |
| **Input** | Precise pointer; full keyboard | Hover states meaningful; keyboard path complete (Ax-5) |
| **Connection** | Usually good, occasionally corporate-throttled | Still no dependency for the claim (Pf-1) |
| **Display** | 1024 to ultra-wide; scaled and unscaled | Measure held (Dk-2); composition fluid (Dk-4) |
| **Social context** | Frequently viewed with or by others | Composed enough to be shown (Dk-5) |
| **Environment** | Controlled lighting; good contrast conditions | No relaxation of contrast obligations — Ax-3 is absolute |

---

## 4. THE WIDE-VIEWPORT FAILURE MODES

Ordered by frequency.

| Failure | Cause | Fix |
|---|---|---|
| **Measure runs long** | Text block scales with the container | Constrain measure independently of the container (Dk-2) |
| **The block disperses** | Grouping ratios inherited rather than re-checked | Re-check internal-to-surrounding space ratios at width (Ns-3) |
| **Content added because it fits** | Width read as capacity | Dk-1; re-run the four-chunk budget at desktop |
| **The composition floats** | Elements centred in a space too large for their visual weight | Re-compose rather than resize (Px-5) |
| **Ambient motion introduced** | Space feels empty; motion added to fill it | Mo-2, Dk-3; the emptiness is Chapter 20's asset |
| **Focal structure lost** | Everything comfortably visible, so nothing dominates | Restore isolation — the wide viewport makes it *easier*, not harder |

**On the last row.** Counterintuitive and worth stating: a wide viewport should make primary saliency *easier* to establish, because there is more room to isolate the claim. Heroes that lose focal structure at width have usually spent the extra space on additional elements (row 3) rather than on isolation.

---

## 5. DO / DON'T

**Do.** Verify by dragging the browser window continuously from the narrowest desktop width to the widest supported one, watching for the moment the composition stops holding. Named-breakpoint checking reliably misses every failure in §4, because those failures occur *between* breakpoints where nothing was designed and nothing was checked. The drag takes fifteen seconds and finds most of them.

**Don't.** Add a decorative element to fill the lateral space at wide widths — a secondary visual, an ambient graphic, a repeated motif. It fails Dk-1 (width read as capacity), Chapter 20's Ns-1 (the space already had a job: standing), and — if it moves — Dk-3 at the location where peripheral motion costs most. The lateral space at ultra-wide is doing the single most valuable thing available to it, which is nothing.

---

## 6. ANTI-PATTERNS

**Desktop-first bloat.** Designing at 1440px, where every constraint has slack, and discovering at 375px that the hero was never governed. Detected by which width the composition was authored at. Fixed by Chapter 31's Mb-1 ordering — compose for mobile, elaborate for desktop.

**Breakpoint theatre.** Verifying at three named widths and declaring the range covered. Detected by asking whether anyone dragged the window. Fixed by Dk-4.

**Container-driven measure.** Letting the text block inherit the container's width because nothing visibly breaks. Detected by counting characters per line at the widest supported width. The most common desktop typographic defect and entirely silent.

**Peripheral licence.** Permitting in the corners what would be refused in the centre. Detected by applying Mo-2 uniformly. The reasoning that permits it is exactly inverted (§1).

---

## 7. ACCEPTANCE CRITERIA

- [ ] Content quantity is identical to mobile; only composition differs. *(Dk-1)*
- [ ] Measure verified within 60–75 characters at the widest supported width. *(Dk-2)*
- [ ] No motion anywhere in the hero, central or peripheral. *(Dk-3, Mo-2)*
- [ ] The composition verified by continuous resizing, not named breakpoints. *(Dk-4)*
- [ ] Grouping ratios re-checked at width, not inherited. *(Ns-3)*
- [ ] The blur test passes at desktop widths. *(§1)*
- [ ] The hero has been viewed screen-shared or projected, as a second person would see it. *(Dk-5)*
- [ ] No element exists solely to occupy lateral space. *(§5)*

---

## 8. CROSS REFERENCES

Ch. 6 (Phase 1; the blur test) · Ch. 7 (At-2) · Ch. 9 (Px-5) · Ch. 12 (the forwarded and shown hero) · Ch. 13 (Ui-3) · Ch. 19 (Ty-3) · Ch. 20 (Ns-1, Ns-3) · Ch. 21 (Mo-2) · Ch. 25 · Ch. 26 · Ch. 31 (the composing case). Master Vision §5.1, §6.2. Design System Bible Ch. 8, Ch. 51.

---

## 9. STATUS

This chapter introduces no new constraints — every principle here restates a device-independent rule and explains why desktop is where it is most likely to be forgotten. That is its purpose: the desktop failures in §4 are not violations of desktop-specific rules but relaxations of general ones, permitted because the viewport offered room.

**Documented limitation.** §1's peripheral-vision reasoning is well established perceptually but its practical threshold — how far from the focal region motion must be before Dk-3's higher cost applies — is not quantified anywhere, and depends on viewing distance and display size, neither of which the hero knows. Dk-3 is therefore written as a uniform prohibition rather than a distance-dependent one, which is the correct conservative reading and slightly over-inclusive by construction.

---

*End of Chapter 30. Chapter 31 addresses the context most visitors actually arrive in.*
