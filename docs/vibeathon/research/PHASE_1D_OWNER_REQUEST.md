We have completed:

- Phase 0 — FriendSDK / Vibeathon baseline
- Phase 1A — Concept exploration
- Phase 1B — Shortlist feasibility
- Phase 1C — Product Spec Lock

Phase 1C concluded:

READY FOR IMPLEMENTATION PLANNING: YES

The selected product is:

MUSEUM OF ALMOST NOTHING

We are now entering:

PHASE 1D — CONTEXT FREEZE & STANDALONE PROJECT HANDOFF

This phase IS allowed to create a new repository/project structure and documentation.

It is NOT allowed to implement gameplay yet.

The purpose is to eliminate dependency on previous Codex conversation context and on the FriendSDK research checkout.

After this phase, a brand-new Codex conversation must be able to understand the project by reading repository files only.

---

# 0. NEW PROJECT IDENTITY

Create a new standalone Codex project / Git repository named:

`rarefriends-museum-of-almost-nothing`

Product/display name:

`Museum of Almost Nothing`

The new project must live OUTSIDE the existing FriendSDK checkout.

Do not develop the game inside:

`work/friendsdk`

or any other FriendSDK source directory.

If the Codex environment cannot create a UI-level "Project" object directly, create a standalone repository directory named:

`rarefriends-museum-of-almost-nothing`

under the user's normal Codex workspace and report its exact absolute path so it can be opened as a separate Codex project.

Do not delete, move, or mutate the original research workspace.

The existing FriendSDK checkout remains research/reference evidence only.

---

# 1. IMPORTANT NEW OWNER INFORMATION

The owner has confirmed:

A browser wallet is already available that owns a Rare Friend NFT satisfying the FriendSDK eligibility requirement.

Record this fact in the project documentation as:

REAL_WALLET_TEST_CAPABILITY: AVAILABLE

This changes validation planning:

- Real-wallet / real-NFT testing is no longer blocked by asset availability.
- It is still a later QA milestone, not part of Phase 1D.
- Do not connect the wallet during Phase 1D.
- Do not request, store, copy, print, log, or commit:
  - private keys
  - seed phrases
  - recovery phrases
  - wallet export files
  - signing secrets
- Real-wallet validation must use the normal browser wallet/runtime flow when that milestone arrives.

Do not record wallet addresses unless the owner explicitly requests it later.

---

# 2. PINNED SDK BASELINE

The project remains based on:

FriendSDK version:
`0.1.4`

Pinned upstream commit:
`ca3bf183b809ecf22d87c63d88ce03969a3f8da2`

Do not silently update to another FriendSDK version or commit.

Do not copy FriendSDK core source into the new project.

Do not vendor SDK internals merely to make the project standalone.

Phase 2 will choose the exact supported package/integration mechanism based on the verified FriendSDK distribution and build guidance.

For Phase 1D, preserve the pinned dependency decision and supporting evidence.

---

# 3. SOURCE MATERIAL

Locate and read the completed outputs from the previous phases.

At minimum:

Phase 0:
- FRIENDSDK_BASELINE.md
- BASELINE_RUN_LOG.txt if available

Phase 1A:
- concept exploration output containing the 10 concepts

Phase 1B:
- shortlist feasibility study covering:
  - Museum of Almost Nothing
  - Three Moves to Midnight
  - Shadow Locksmith

Phase 1C:
- Museum of Almost Nothing — Product Spec Lock

Use the actual existing files/results from the previous workspace.

Do not reconstruct these from memory if their source files are available.

Copy the research outputs into the new repository for historical evidence.

COPY them.

Do not move or delete the originals.

---

# 4. TARGET REPOSITORY STRUCTURE

Create the standalone repository with approximately this documentation structure:

rarefriends-museum-of-almost-nothing/
│
├── README.md
├── AGENTS.md
├── .gitignore
│
└── docs/
    └── vibeathon/
        ├── CONTEXT_INDEX.md
        ├── PROJECT_CHARTER.md
        ├── PRODUCT_SPEC.md
        ├── SDK_CONSTRAINTS.md
        ├── DECISION_LOG.md
        ├── STATUS.md
        │
        └── research/
            ├── PHASE_0_BASELINE.md
            ├── PHASE_0_RUN_LOG.txt
            ├── PHASE_1A_CONCEPTS.md
            ├── PHASE_1B_FEASIBILITY.md
            └── PHASE_1C_PRODUCT_SPEC.md

Use the closest available source artifact for each research file.

If one source artifact does not exist as a standalone file, reconstruct that specific research artifact from the recorded prior output and clearly mark its provenance.

Do not invent missing research findings.

Do NOT create ROADMAP.md yet.

ROADMAP.md belongs to Phase 2.

Do NOT create game source files yet.

Do NOT create:
- index.tsx
- game.json
- gameplay components
- gameplay CSS
- assets
- tests

unless required merely by the tooling to initialize an empty repository, in which case keep them empty/minimal and explain why.

Prefer no implementation scaffold at all.

---

# 5. PROJECT_CHARTER.md

Create a compact project charter intended to be read at the beginning of every future Codex session.

Keep it concise enough to serve as high-value persistent context.

Include:

## Identity

Product:
Museum of Almost Nothing

Repository:
rarefriends-museum-of-almost-nothing

Event:
Rare Friends Vibeathon

SDK:
FriendSDK v0.1.4

Pinned commit:
ca3bf183b809ecf22d87c63d88ce03969a3f8da2

## Product thesis

Preserve the locked Phase 1C thesis:

Ordinary objects become worth keeping when the player can give them a small, personal moment of importance.

## Player promise

Preserve the Phase 1C player promise:

"Find almost nothing. Decide it matters. Let your Friend explain why."

## Product shape

Record the locked scope:

- one museum room
- three plinths
- four object outcome types
- selected canonical Rare Friend as curator
- simulated RF economy
- session length approximately 3–8 minutes
- no permanent progression
- no backend requirement
- keyboard and touch
- mute
- reduced motion
- 960 × 640 Vibeathon presentation unless later explicitly changed

## Core loop

Summarize:

read
→ acquire permit if needed
→ expedition
→ settle
→ reveal object
→ keep or redeem
→ curate
→ direct Friend through tour
→ evaluate local brief
→ continue or final exhibition

Make clear:

- settlement happens before curation
- tour success never changes RF odds or redemption values
- KEEP is not an SDK mutation
- full runtime reload begins another session

## Rare Friend role

Identity depth is level 2.

The selected Friend is a player-directed curator.

The Friend's route and explicit Present actions determine presentation order.

Do not reduce it to decorative automatic animation.

## Economy principle

RF enables expeditions.

SDK outcome becomes owned aggregate inventory.

Keeping preserves exhibition options.

Redeeming removes one owned copy and returns its fixed simulated RF value.

RF results and tour results are separate systems.

## Real wallet readiness

Record:

- Eligible Rare Friend wallet available: YES
- Real-wallet validation planned: YES
- Secrets stored in repository: NEVER

## Primary non-goals

Include the locked major non-goals from Phase 1C.

Keep this section short and strong.

---

# 6. PRODUCT_SPEC.md

Create the canonical implementation-facing product specification.

Use Phase 1C as the authoritative source.

Do not rewrite the design into a new concept.

Preserve all decisions that materially affect implementation, including:

- product thesis
- player promise
- one-minute experience
- five-minute session
- core state machine
- state ownership
- four-object catalog
- tour brief catalog and feasibility rules
- keep/redeem behavior
- duplicate semantics
- three-plinth interaction
- Friend curator behavior
- keyboard/touch equivalence
- 960 × 640 visual hierarchy
- audio/motion requirements
- reduced motion
- failure/recovery UX
- MUST SHIP
- OUT OF SCOPE
- acceptance experience
- prototype risks

Do not copy repository-specific absolute paths from the old workspace as canonical references.

Where necessary, replace old absolute-path references with:

- pinned upstream GitHub paths/commit references
or
- references to SDK_CONSTRAINTS.md
or
- references to the preserved Phase 0 research document.

PRODUCT_SPEC.md becomes the canonical current product design.

PHASE_1C_PRODUCT_SPEC.md remains immutable historical research evidence.

---

# 7. SDK_CONSTRAINTS.md

Create a concise implementation guardrail document.

This is NOT a copy of the full Phase 0 report.

Extract the invariants future implementation agents must not violate.

At minimum record:

## Version lock

FriendSDK v0.1.4
commit ca3bf183b809ecf22d87c63d88ce03969a3f8da2

No upgrade without explicit owner decision.

## Runtime ownership

Do not implement:

- custom wallet connection
- custom NFT discovery
- another ownership gate
- another Friend selector
- collection-wide token scanning
- custom checkout

Use the SDK runtime boundary.

## Identity

Playable runtime requires verified eligible Rare Friend ownership.

Current owner has an eligible NFT wallet available for later real validation.

Mocks are test fixtures only.

## Economy

Supported bounded lifecycle:

read
buy
play
settle
redeem

Keep = no SDK mutation.

Inventory = aggregate outcome quantities.

Do not invent unique specimen identity.

Gameplay/tour performance cannot alter:

- reward probabilities
- settlement result
- redemption value

## State

SDK state:
- simulated RF
- permits/consumables
- inventory quantities
- plays

Local ephemeral state:
- plinth placements
- brief selection
- tour order
- Friend position
- local completion/finale status

Full runtime reload resets the preview session.

Do not promise persistent museum progress.

## Security / sandbox

Game code must not gain signer access, arbitrary calldata powers, deployment powers, parent-page UI access, or wallet secrets.

Respect the SDK sandbox/CSP/bridge.

## Scope

Simulation only for this Vibeathon build.

No contract deployment or live economic actions unless separately authorized later.

## Accessibility / interaction

Respect:
- `paused`
- keyboard/touch parity
- mute
- reduced motion
- loading/error/retry states

Add source references back to the preserved baseline and pinned upstream files.

---

# 8. DECISION_LOG.md

Create a durable chronological decision log.

Every entry must have:

ID
DATE
DECISION
RATIONALE
ALTERNATIVES / REJECTED OPTIONS
STATUS
SOURCE

Use stable IDs:

D-001, D-002, ...

At minimum record these existing decisions:

- Participate in Rare Friends Vibeathon using FriendSDK.
- Pin FriendSDK v0.1.4 / exact commit.
- Build a standalone project rather than modifying FriendSDK core.
- Select Museum of Almost Nothing.
- Reject Three Moves to Midnight as primary because RF reward retention is structurally separate from tactical gameplay.
- Do not proceed with Shadow Locksmith because robust artwork-dependent puzzle quality is unproven.
- One More Floor remains historical reserve only, not active scope.
- Use simulated RF economy.
- Settlement occurs before curation.
- Keep/redeem affects available exhibition inventory.
- One room.
- Three plinths.
- Four outcome types.
- Session-only experience.
- No permanent persistence.
- Friend identity depth level 2.
- Player-directed tours; no automatic tour progression.
- Tour results do not alter RF economics.
- Canonical Friend art.
- 960 × 640 Vibeathon build unless explicitly revisited.
- No precision-drag requirement.
- Keyboard/touch parity.
- Eligible real-wallet test capability is now available.
- No wallet secrets stored anywhere in project files.

Do not create fake dates.
Use the actual current project date / prior phase date when supported.

Do not turn rejected concepts back into active roadmap work.

---

# 9. CONTEXT_INDEX.md

This file is the startup router for future agents.

Keep it short.

It must explain:

READ ORDER FOR A NEW AGENT

1. PROJECT_CHARTER.md
2. STATUS.md
3. PRODUCT_SPEC.md
4. SDK_CONSTRAINTS.md
5. DECISION_LOG.md — only entries relevant to current work
6. ROADMAP.md — once Phase 2 creates it
7. research/* only when provenance or deeper evidence is required

State explicitly:

The chat history is not authoritative.

The repository documents are the source of truth.

If chat instructions conflict with canonical repository documents:

- follow the newest explicit owner instruction
- update the canonical documents and DECISION_LOG
- do not silently diverge

If PRODUCT_SPEC and implementation disagree:
stop and surface the discrepancy.

Do not reopen locked decisions merely because a new agent prefers another approach.

---

# 10. STATUS.md

Create the initial handoff status.

It should be compact and frequently replaceable.

Use a structure similar to:

PROJECT:
Museum of Almost Nothing

CURRENT PHASE:
Phase 1D — Context Freeze

STATE:
Context freeze being completed

COMPLETED:
- Phase 0 baseline
- Phase 1A exploration
- Phase 1B feasibility
- Phase 1C product lock

SELECTED CONCEPT:
Museum of Almost Nothing

SDK:
v0.1.4
ca3bf183b809ecf22d87c63d88ce03969a3f8da2

REAL WALLET TEST CAPABILITY:
AVAILABLE

IMPLEMENTATION:
NOT STARTED

ROADMAP:
NOT YET AUTHORED

CURRENT BLOCKERS:
None known for Phase 2 planning

KNOWN VALIDATION DEBT:
- Real-wallet gameplay has not yet been executed
- Phase 0 native-Windows suite had five known failures
- documented Ubuntu/WSL validation remains relevant before delivery

NEXT PHASE:
Phase 2 — Master Implementation Roadmap

NEXT ACTION:
Create a decision-complete implementation roadmap from the frozen product/spec constraints.

Do not populate future implementation progress.

---

# 11. AGENTS.md

Create a root AGENTS.md specifically for future coding agents.

It should be short enough to be read automatically but strong enough to prevent drift.

Require agents to:

1. Read CONTEXT_INDEX.md.
2. Read PROJECT_CHARTER.md and STATUS.md.
3. Read the relevant section of PRODUCT_SPEC.md before changing behavior.
4. Respect SDK_CONSTRAINTS.md.
5. Consult DECISION_LOG.md before reopening product decisions.
6. Work only on the current ROADMAP milestone once ROADMAP.md exists.
7. Keep changes scoped.
8. Prefer repository evidence over assumptions.
9. Never copy or modify FriendSDK core merely for convenience.
10. Never add wallet secrets or request private keys.
11. Never silently add persistence, backend, currencies, upgrades, trading or live-chain behavior.
12. Treat tour results and SDK economy as separate systems.
13. Preserve accessibility and `paused` behavior.
14. Update STATUS.md when a milestone/task materially changes.
15. Add a DECISION_LOG entry when an owner-level decision changes.

For future implementation phases:

Subagents should receive only:

- current milestone objective
- relevant constraints
- relevant files
- acceptance criteria

Do not dump the entire roadmap or research archive into every delegated task.

---

# 12. README.md

Create a concise root repository README.

This is an engineering/project README, not yet the final Vibeathon submission README.

Include:

- Product name
- One-sentence concept
- Current development status
- Pinned FriendSDK version
- Simulation-only statement
- Session-reset statement
- Repository document map
- Current phase
- Safe note that real eligible-wallet validation is available later

Do not claim:

- public playable URL
- completed implementation
- submission readiness
- real-wallet validation completed
- contract deployment

because none has happened yet.

---

# 13. GIT INITIALIZATION

If the new directory is not already its own Git repository:

initialize Git in the new standalone project.

Do not nest its `.git` directory inside the FriendSDK repository.

Do not add the FriendSDK research checkout as project source.

Do not push to GitHub yet unless a repository already explicitly exists and the owner previously authorized using it.

Do not create a public remote automatically.

A clean local standalone Git repository is sufficient.

After creating the context-freeze files:

run:

`git status --short`

and report the result.

Do not commit automatically unless existing Codex rules explicitly authorize autonomous commits.

If commits are allowed by the current workspace rules, prefer a single documentation/bootstrap commit:

`chore: freeze product context before implementation planning`

Otherwise leave the changes staged or unstaged and report them exactly.

---

# 14. SOURCE-OF-TRUTH RULES

After Phase 1D, these precedence rules apply:

1. Latest explicit owner instruction
2. DECISION_LOG.md
3. PRODUCT_SPEC.md
4. SDK_CONSTRAINTS.md
5. PROJECT_CHARTER.md
6. ROADMAP.md for implementation sequencing once created
7. STATUS.md for current progress
8. Preserved research documents
9. Old chat context

Do not silently modify a higher-level product decision inside implementation code.

If a future technical discovery contradicts a locked decision:

STOP that affected work,
record the evidence,
surface the conflict to the owner,
and do not improvise a replacement product decision.

---

# 15. PHASE 1D VERIFICATION

Before completing this task verify:

- New project is outside FriendSDK checkout.
- It has its own Git root.
- Old FriendSDK/research workspace was not modified.
- Research source outputs were preserved/copied.
- Canonical docs no longer depend on old absolute paths for understanding.
- Product name is consistent.
- SDK version/commit is consistent everywhere.
- Museum remains the only active concept.
- Rejected concepts appear only as historical decisions/research.
- Real wallet capability is recorded as AVAILABLE, not VERIFIED.
- No wallet address/private key/seed phrase was recorded.
- No gameplay implementation was created.
- No SDK source was copied into the game project.
- No roadmap was prematurely invented.
- STATUS points to Phase 2.
- Git status is reported.

---

# FINAL RESPONSE

Return:

A. NEW PROJECT

- project name
- exact path
- Git root
- current branch if applicable

B. CREATED / COPIED FILES

List each canonical file and research artifact.

C. CONTEXT FREEZE SUMMARY

State what future agents can now recover without chat history.

D. SOURCE OF TRUTH

Confirm the precedence rules and startup reading order.

E. WALLET READINESS

State exactly:

- Eligible Rare Friend wallet available: YES
- Real-wallet gameplay verified: NO
- Wallet secrets stored: NO

F. OLD WORKSPACE

Confirm whether any old FriendSDK/research file was modified.

G. GIT STATUS

Report exact status.

H. PHASE TRANSITION

End with:

PHASE 1D: COMPLETE
READY FOR PHASE 2 — MASTER IMPLEMENTATION ROADMAP: YES/NO

If NO, list only the blocking issues.

Do not create the Phase 2 roadmap in this task.
Do not begin gameplay implementation.