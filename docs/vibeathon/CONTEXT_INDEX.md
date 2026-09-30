# Context index

## Read order for a new agent

1. [PROJECT_CHARTER.md](PROJECT_CHARTER.md)
2. [STATUS.md](STATUS.md)
3. [PRODUCT_SPEC.md](PRODUCT_SPEC.md)
4. [SDK_CONSTRAINTS.md](SDK_CONSTRAINTS.md)
5. [DECISION_LOG.md](DECISION_LOG.md) — entries relevant to current work
6. [ROADMAP.md](ROADMAP.md) — four-gate deadline sequence; execute only the authorized current gate/task
7. [research/](research/SOURCE_PROVENANCE.md) — only for provenance or deeper evidence

The chat history is not authoritative. Repository documents are the source of truth.

## Precedence

1. Latest explicit owner instruction
2. DECISION_LOG.md
3. PRODUCT_SPEC.md
4. SDK_CONSTRAINTS.md
5. PROJECT_CHARTER.md
6. ROADMAP.md for implementation sequencing, once created
7. STATUS.md for current progress
8. Preserved research documents
9. Old chat context

If a new explicit owner instruction conflicts with canonical documents, follow that instruction, update the affected canonical documents and DECISION_LOG, and do not silently diverge. Do not treat an old research option as active scope.

If PRODUCT_SPEC and implementation disagree, stop affected work and surface the discrepancy. If a technical discovery contradicts a locked decision, record evidence and surface the conflict to the owner; do not improvise a replacement decision. Do not reopen decisions just because a new agent prefers another approach.


