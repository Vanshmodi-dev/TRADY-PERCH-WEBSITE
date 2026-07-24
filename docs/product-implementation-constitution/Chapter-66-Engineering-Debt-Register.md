# CHAPTER 66 — ENGINEERING DEBT REGISTER

**Trady Perch Product Implementation Constitution · Part XIV: Governance & Continuous Improvement**

**Inherited From:** Design System Bible Chapter 69 (Design Debt Register & Management — Dd-1 "Every Documented Limitation Becomes a Register Entry," Dd-2 "Debt Is Prioritized by Blast Radius," Dd-3 "Resolution Is Logged With the Same Rigor as Creation"). Chapter 64 (Quality Governance Model) is this chapter's direct premise.

---

## 1. INTRODUCTION

This register has been cited throughout this Constitution as the destination for every logged exception, every "documented limitation," every gap between what a chapter requires and what the codebase currently does. This chapter is where that register is actually specified — its format, its prioritization, and its resolution discipline — so that the many individual citations scattered across sixty-five prior chapters all point to one real, consistently structured artifact rather than an assumed, informal notion of "tracking it somewhere."

---

## 2. WHAT BECOMES AN ENTRY

Per Dd-1, extended from design debt to engineering debt directly: every deviation from this Constitution's standard — a chapter's own documented limitation, a temporary exception logged per Chapter 62, a self-review or reconciliation gap per Chapter 32/53, a missed SLA per Chapter 45 §5 — becomes a register entry the moment it's identified, not retroactively once someone remembers to write it down. An identified deviation with no register entry is, per this chapter's own success criterion, itself treated as a governance failure when the deviation concerns a P0-priority chapter — the same severity this Constitution's own architecture document already assigns P0 status.

---

## 3. ENTRY FORMAT

Every entry states: the specific chapter and requirement being deviated from, the reason the deviation exists, its owner, and — per Dd-2 — its priority, determined by blast radius rather than by how recently or urgently it was raised. A P0-chapter deviation affecting a live, in-production surface per Chapter 2 is higher priority than a P3-chapter deviation in a not-yet-built future surface, regardless of which was logged first.

---

## 4. PRIORITIZATION BY BLAST RADIUS

Per Dd-2, applied here exactly as Design System Bible Chapter 69 already applies it to design debt: a deviation's priority is a function of how many other parts of the system depend on the standard being deviated from, and how severe the consequence of the deviation actually is — not a function of urgency alone. A deviation in a foundational chapter (Chapter 1, Chapter 2, Chapter 7) that other chapters build directly on top of carries inherently higher blast radius than an equivalent deviation in a narrower, less-depended-upon chapter, mirroring Chapter 64 §2's Gov-4 principle applied to debt specifically rather than to decision authority.

---

## 5. RESOLUTION

Per Dd-3, resolving a debt entry is logged with the same rigor as creating one — what was actually done, when, and verified against the entry's original stated requirement, never simply deleted once someone believes it's been addressed. A resolved entry remains in the register's history rather than disappearing, so a pattern of similar entries recurring over time (per Chapter 65 §4's amendment-trigger logic) remains visible across resolved and open entries alike, not only the currently-open ones.

---

## 6. ENFORCEMENT & MEASUREMENT

This chapter's own success criterion — every P0-chapter deviation has a corresponding entry — is checked directly per Chapter 65's quarterly cadence, cross-referencing every P0 chapter's own stated requirements against the register for gaps with no corresponding entry. An unregistered P0 deviation discovered this way is treated with the severity this chapter's own opening section already states — a governance failure, escalated per Chapter 64 rather than quietly added to the register as though its earlier absence were unremarkable.

---

## 7. BEHAVIORAL RULES

**When any deviation from this Constitution is identified, by anyone or any process.** A register entry is created immediately per Section 3 — never deferred until a convenient moment, which per Chapter 5 §2 (F2) is exactly how an undocumented exception starts.

**When prioritizing the register for attention.** Section 4's blast-radius model is used, not recency or the loudest current complaint.

**When a debt entry is resolved.** Section 5's resolution-logging discipline is followed in full, with verification against the entry's original requirement, before it's marked closed.

---

## 8. DO / DON'T

**Do** create a register entry the moment a deviation is identified, regardless of how minor it seems.

**Do** prioritize the register by blast radius per Section 4, not by whichever entry is most recent or most loudly raised.

**Don't** delete a resolved entry — log its resolution per Dd-3 and keep it in the register's history.

**Don't** let a P0-chapter deviation go unregistered — this is treated as a governance failure, not an oversight to fix quietly.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Does every identified deviation from this Constitution have a register entry, per Section 2?
- [ ] Does every entry state its chapter, requirement, reason, owner, and blast-radius-based priority?
- [ ] Is every P0-chapter deviation registered, with none discovered unregistered during Chapter 65's quarterly audit?
- [ ] Is every resolved entry logged with the same rigor as its creation, per Dd-3, and retained in the register's history?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Nearly every prior chapter, as the destination for their own logged exceptions and limitations. Chapter 5 §2 (F2, the risk behind Section 7's first rule). Chapter 32, Chapter 53 §6 (self-review and reconciliation gaps, a specific entry source). Chapter 45 §5 (SLA misses, a specific entry source). Chapter 62 (temporary exceptions, a specific entry source). Chapter 64 §2 (Gov-4, mirrored in Section 4). Chapter 65 (the quarterly cadence enforcing Section 6).

**Within the five documents above this Constitution:** Design System Bible Chapter 69 (in full).

---

## 11. FUTURE EXPANSION

**Documented limitations.** This chapter does not yet specify a maximum acceptable register size or age before an entry is escalated automatically; that mechanism is a plausible future addition once real register volume makes the need for it empirically clear, per Chapter 1's IP3.

---

*End of Chapter 66. The next chapter, Engineering Anti-Pattern Library, is this register's companion — the living catalog of the specific patterns that produce the deviations logged here.*
