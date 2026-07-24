# CHAPTER 38 — RENDERING STRATEGY STANDARD

**Trady Perch Product Implementation Constitution · Part VII: Performance Engineering**

**Inherited From:** Design System Bible Chapter 55 (Performance-Conscious Design Patterns); UX / Experience Blueprint Chapter 60 (Website Experience Standard). Chapter 2 (Product Architecture Philosophy) and Chapter 25 (Data Fetching & Caching Strategy) are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 2 §4 fixed a rendering posture per surface — static-first for the Marketing Site, client-heavy for the Client Portal. This chapter is the decision framework a specific route within either surface uses to choose its exact rendering strategy — static generation, server rendering, incremental regeneration, or client-side rendering — consistent with its surface's default posture, but resolving the per-route exceptions Chapter 2 explicitly deferred here.

---

## 2. THE FOUR STRATEGIES

**Static generation** — rendered once at build time, served identically to every visitor until the next build. The Marketing Site's default per Chapter 2 §4.

**Server rendering** — rendered per request, on the server, allowing per-request personalization or genuinely current data that static generation cannot provide.

**Incremental regeneration** — rendered at build time like static generation, but automatically re-rendered in the background after a defined staleness window, per Chapter 25 §3's staleness-contract model applied to whole-page rendering rather than individual data values.

**Client-side rendering** — rendered in the browser after an initial, minimal shell loads. The Client Portal's default per Chapter 2 §4, for content that is per-account and not meaningfully shareable as a static or server-rendered page.

---

## 3. THE DECISION TREE

For any new route, in this order:

1. **Which surface does this route belong to, per Chapter 2 §6's classification?** This sets the default: static generation for the Marketing Site, client-side rendering for the Client Portal.
2. **Does the route's content genuinely change per request or per visitor** (Chapter 21's server-state category, needed before first paint rather than fetched after)? If yes and the route is on the Marketing Site, it overrides the static default to server rendering — the specific, justified exception Chapter 2 §4 already anticipated.
3. **Does the route's content change periodically, but not per-request, and does Design System Bible Chapter 55's performance reasoning favor avoiding a full rebuild per change** (a case-study index that updates when new content is published, but not on every visitor)? If yes, it uses incremental regeneration instead of pure static generation.
4. **Does the route require authentication per Chapter 2 §5's trust boundary?** If yes, it is Client Portal territory by definition, and uses client-side rendering for its data per Chapter 2 §4, though its outermost frame may still be server-rendered or statically shelled per that same section.

A route that reaches the end of this tree without a clear answer is a signal, per Chapter 2 §6, that its surface classification itself may need revisiting before its rendering strategy can be correctly decided.

---

## 4. THE SEO INTERACTION

Per UX / Experience Blueprint Chapter 60's website experience standard and Part VIII's SEO requirements, any route intended to be indexed and ranked by search engines is biased toward static generation or incremental regeneration over client-side rendering, because both produce fully-formed HTML available at first response — the rendering strategy Part VIII's technical SEO standard can most reliably work with. A route requiring client-side rendering for a genuinely SEO-relevant page (rare, given Chapter 2's surface split, but not impossible) requires an explicit justification per Chapter 1's IP1 citing why server rendering — which still produces indexable HTML while permitting per-request logic — was insufficient.

---

## 5. THE PERFORMANCE-BUDGET INTERACTION

Every rendering-strategy decision from Section 3 is checked against Chapter 36's budgets as part of the same design-review step Chapter 35 §5 already requires — a route that would technically qualify for static generation under Section 3's tree but whose static build would be so large or complex that Chapter 36's bundle ceiling is threatened is reconsidered at the design stage, not discovered as a budget failure after implementation. This is the direct mechanism behind this chapter's own success criterion: a route's chosen strategy is verified against Chapter 36's budgets post-implementation, closing the loop the design-time estimate opened.

---

## 6. ENFORCEMENT & MEASUREMENT

Section 3's decision tree is recorded explicitly for every route, per Chapter 3's translation-ledger discipline — a route's rendering strategy is stated, with the tree's specific branch that produced it, in the pull request introducing the route. A mismatch between a route's declared strategy and its actual build-time behavior (a route declared static that actually performs a per-request fetch) is caught by a build-time check flagging the inconsistency. Chapter 48's automated performance testing verifies the resulting Chapter 36 budget compliance per Section 5.

---

## 7. BEHAVIORAL RULES

**When creating any new route.** Section 3's decision tree is run explicitly and the resulting strategy, with its branch justification, is stated in the introducing pull request — never chosen by copying whatever the most recently created, superficially similar route happened to use.

**When a route's content requirements change** — a previously static page needs to start showing per-visitor data. Section 3's tree is re-run, and the strategy is explicitly updated (with the change and its reasoning recorded), never left static with per-visitor logic awkwardly bolted on client-side to work around the mismatch.

**When SEO and performance considerations point in different directions** for a specific route. Section 4's SEO bias and Section 5's budget check are both surfaced explicitly at design review, and the tension is resolved per Chapter 1 §4's derivation test rather than defaulting silently to whichever consideration the implementer personally weighted more heavily.

---

## 8. DO / DON'T

**Do** run Section 3's decision tree explicitly for every new route, recording the resulting strategy and its justification.

**Do** bias an SEO-relevant route toward static generation or incremental regeneration over client-side rendering, per Section 4.

**Don't** choose a route's rendering strategy by copying a similar-looking existing route without independently running the decision tree.

**Don't** discover a Chapter 36 budget violation only after a route is fully implemented — check it at the design stage per Section 5.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Was Section 3's decision tree run explicitly for this route, with the resulting strategy and branch justification recorded?
- [ ] Does the route's actual build-time behavior match its declared rendering strategy, with no inconsistency?
- [ ] If the route is SEO-relevant, does it use static generation, incremental regeneration, or server rendering rather than client-side rendering, per Section 4?
- [ ] Was the route's likely Chapter 36 budget impact checked at design review, per Section 5?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, and §4's derivation test for Section 7's tension case). Chapter 2 §4–§6 (the surface postures and classification procedure this chapter's tree extends). Chapter 3 (translation-ledger discipline behind Section 6). Chapter 21 (server-state category referenced in Section 3, step 2). Chapter 25 §3 (the staleness-contract model behind incremental regeneration). Chapter 35 §5 (the design-review step Section 5 integrates with). Chapter 36 (the budgets Section 5 checks against). Chapter 39–41 (Part VIII's SEO standards, the destination of Section 4's bias). Chapter 48 (automated performance testing, verifying Section 5).

**Within the five documents above this Constitution:** Design System Bible Chapter 55; UX / Experience Blueprint Chapter 60.

---

## 11. FUTURE EXPANSION

**Documented limitations.** Section 3's decision tree assumes the four strategies in Section 2 remain exhaustive; a genuinely new rendering paradigm would be added only once shown insufficient against the existing four, mirroring Chapter 2 §6's own restraint around inventing a fifth rendering posture ahead of demonstrated need.

---

*End of Chapter 38, and of Part VII. Part VIII, SEO & Discoverability Implementation, is where this chapter's Section 4 bias becomes a full technical standard.*
