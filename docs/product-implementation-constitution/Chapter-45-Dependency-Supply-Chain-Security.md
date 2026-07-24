# CHAPTER 45 — DEPENDENCY & SUPPLY CHAIN SECURITY

**Trady Perch Product Implementation Constitution · Part IX: Security Implementation**

**Inherited From:** No direct upstream citation — this is an engineering-operations concern, as stated in this chapter's own scope. Chapter 10 (Configuration & Environment Management) and Chapter 43 (Application Security Standard) are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 43 §7 named vulnerable and outdated components as an OWASP category and deferred its full treatment here. This chapter is that treatment: how a third-party package enters this codebase, how it's pinned and verified, and — the harder, ongoing half of the problem — how a vulnerability disclosed after a package is already in use is caught and remediated on a defined timeline rather than discovered by chance during an unrelated audit.

---

## 2. VETTING A NEW DEPENDENCY

Before any new dependency is added, per Chapter 1's IP3, its need is justified per Chapter 6 §3 or Chapter 7 §4's package-justification standard, whichever applies. Beyond that justification, a new dependency is checked for: an active maintenance history (not abandoned), a license compatible with this product's own licensing posture, and no currently known, unpatched critical vulnerability. A dependency failing any of these checks requires an explicit, documented exception per Chapter 62 before it's added, not a silent addition that assumes it's probably fine.

---

## 3. LOCKED, VERIFIED INSTALLATION

Every dependency, direct and transitive, is installed from a single lockfile per Chapter 7 §7, with an integrity hash verified at install time in every environment — local, CI, and deployment — per Chapter 43 §9's integrity requirement. No environment installs from an unpinned version range that could silently resolve to a different, unverified package version than another environment used.

---

## 4. CONTINUOUS VULNERABILITY MONITORING

An automated scanning tool, run on a defined schedule (at minimum, daily) and on every pull request touching the lockfile, checks every direct and transitive dependency against a current vulnerability database. This is not a manual, periodic audit someone has to remember to run — it is a scheduled, automatic process, exactly the same enforcement model Chapter 44 §6 already applies to data retention.

---

## 5. THE REMEDIATION SLA

A newly disclosed vulnerability is triaged by severity immediately upon detection: a **critical** severity finding triggers an automated alert and blocks any new deployment until remediated or explicitly, temporarily accepted through Chapter 62's exception process with a named owner and a re-review date; a **high** severity finding is remediated within a defined number of days per Chapter 64's governance-set SLA; **medium** and **low** severity findings are tracked in Chapter 66's debt register and addressed on a regular maintenance cadence rather than blocking deployment individually. This tiered SLA is the direct mechanism behind this chapter's own success criterion: a critical vulnerability is caught and blocks deployment automatically, within a defined window, never discovered first during an unrelated manual audit.

---

## 6. TRANSITIVE DEPENDENCY VISIBILITY

Section 4's scanning covers the full dependency tree, not only direct dependencies — a vulnerability in a transitive dependency several levels deep is exactly the kind of gap a manual review focused on a project's own explicit dependency list would miss, and is exactly the case this chapter's automated, full-tree scanning exists to catch instead.

---

## 7. ENFORCEMENT & MEASUREMENT

Section 4's scan result is a required CI status check per Chapter 56 — a pull request cannot merge with an unaddressed critical finding, mirroring Chapter 43's SAST gate exactly. Section 5's SLA compliance is itself tracked and reported per Chapter 65's continuous-improvement cadence, so a pattern of missed SLAs is visible and addressed structurally, not treated as a series of unrelated, isolated misses.

---

## 8. BEHAVIORAL RULES

**When adding any new dependency.** Section 2's vetting checks run before it's added, with the result documented in the introducing pull request.

**When a critical vulnerability is detected in an existing dependency.** Section 5's SLA is treated as a hard deadline, with deployment blocked until remediation or an explicit, governed exception — never quietly ignored because the affected package "probably isn't exploitable in our specific usage," which is a judgment call requiring the same explicit exception process, not an informal bypass.

**When a dependency is found abandoned or unmaintained during Section 4's ongoing monitoring, not only at initial vetting.** It is flagged for replacement per Chapter 66's debt register, since an unmaintained dependency's risk compounds over time even absent a currently disclosed vulnerability.

---

## 9. DO / DON'T

**Do** vet every new dependency against Section 2's checks before adding it, with the result documented.

**Do** treat Section 5's critical-severity SLA as a hard deployment-blocking deadline.

**Don't** install any dependency from an unpinned, unverified source in any environment.

**Don't** dismiss a critical finding informally as "probably not exploitable here" — route it through Chapter 62's explicit exception process instead.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Was every new dependency vetted per Section 2 before being added, with the result documented?
- [ ] Is every dependency installed from a locked, integrity-verified source in every environment?
- [ ] Does the automated vulnerability scan run on the full dependency tree, on schedule and on every relevant pull request?
- [ ] Does a critical-severity finding block deployment per Section 5's SLA, with no informal bypass?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP3). Chapter 6 §3, Chapter 7 §4 (dependency-justification standards behind Section 2). Chapter 10 (configuration discipline this chapter's scanning integrates with). Chapter 43 §7, §9 (the OWASP category and integrity requirement this chapter fulfills). Chapter 56 (CI pipeline running Section 7's check). Chapter 62 (exception process for Section 2 and Section 5). Chapter 64 (governance-set SLA values). Chapter 65 (continuous-improvement tracking of SLA compliance). Chapter 66 (debt register for medium/low findings and unmaintained dependencies).

**Within the five documents above this Constitution:** None — purely an engineering-operations concern, as stated in this chapter's own front matter.

---

## 12. FUTURE EXPANSION

**Documented limitations.** Section 5's specific SLA day-counts for high/medium/low severity are set by Chapter 64's governance process and are not fixed numerically in this chapter itself, since they may reasonably need adjustment as the team's actual remediation capacity becomes clearer over time.

---

*End of Chapter 45, and of Part IX. Part X, Testing & Quality Assurance, is where "it works" becomes a claim backed by evidence rather than confidence.*
