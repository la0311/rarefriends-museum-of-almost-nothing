# Handoff status

Updated: 2026-09-30

PROJECT: Museum of Almost Nothing
CURRENT PHASE: Phase 3B — G2 Minimum Viable Vibeathon Game
STATE: G1 owner-validated with eligible real wallet on desktop and mobile; G2 authorized
ROADMAP: AUTHORED
IMPLEMENTATION: IN PROGRESS
DEADLINE MODE: ACTIVE
CURRENT GATE: G2 — Minimum Viable Vibeathon Game
G0: PASS
G1: PASS — REAL WALLET VERIFIED DESKTOP + MOBILE
FIRST PLAYABLE: AVAILABLE
MOBILE: PASS — owner real-wallet playtest
NEXT: Execute bounded G2, then owner G2 playtest
NEXT ACTION: G2-T1–T6

SELECTED CONCEPT: Museum of Almost Nothing
SDK: v0.1.4
PINNED COMMIT: ca3bf183b809ecf22d87c63d88ce03969a3f8da2
REAL_WALLET_TEST_CAPABILITY: AVAILABLE
REAL-WALLET GAMEPLAY VERIFIED: PASS — owner-reported desktop and mobile
PUBLIC PREVIEW: AVAILABLE — https://la0311.github.io/rarefriends-museum-of-almost-nothing/

## Execution

Latest owner instruction authorizes bounded G2 and reports completed G1 real-wallet playtests on desktop and mobile. G0 and G1 pass. G2 implementation and owner playtest are separate checkpoints.

Existing clean baseline commit: fb1a6a7ddce82edff11d0e1421d9f9db0ba49835. No new baseline commit was needed: all planning files were already committed with no changes. Local G1 checkpoint authorized after verification; no push was performed during Phase 3A; D-030 subsequently authorizes public preview publishing.

Official v0.1.4 release tag resolves to the pinned commit. Downloaded archive SHA-256 matches GitHub's published digest: 72dfa8b8f2e0ccb4361a38f454a0c77e9340da8cf29313fc03d5049224523cac. Standalone package-lock retains URL/integrity. No SDK edits or research-checkout dependency.

## Checks and evidence

- G0 typecheck / FriendSDK check / build: PASS.
- G0 SDK test: PASS, [scene](evidence/g0.png).
- G1 typecheck / FriendSDK check / build: PASS; see [execution log](evidence/PHASE_3A.md).
- `node tests/museum.mjs`: PASS at 960px keyboard and 360px touch; normal runtime with automated-only identity/RPC/canonical-art fixtures.
- Verified cancellation, duplicate buy protection, buy/play/settle, actual owned reveal, Keep without mutation, placement, player-directed position, explicit Present, pause lock, and unchanged RF/inventory through tour.
- Original G1 screenshots: [reveal](evidence/g1-reveal.png), [displayed object](evidence/g1-displayed.png), [Opening Remarks](evidence/g1-complete-960.png), [narrow viewport](evidence/g1-complete-360.png). Corrected frame-fit evidence is below.
- Development server: http://127.0.0.1:4173. Normal entry requires owner's eligible wallet; no agent wallet interaction performed.

## Owner checkpoint

Evaluate expedition → object → Keep clarity; placement; destination + Present agency; separate RF/tour results; confirmation overhead. Do not begin G2 until owner evaluation/instruction.

## Current limitations / validation debt

- G1 real-wallet identity/gameplay, eligible ownership and canonical artwork passed owner testing on desktop and mobile. G2-specific real-wallet behavior remains for the G2 owner playtest.
- The Phase 3A.1 layout hotfix removes required child scrolling at 360px and passed the owner's real-wallet recheck.
- Movement/reveal are immediate and silent. Rules remain identical under reduced motion.
- Provisional G1 terms: permit 6 RF; weights 40/35/15/10%; fixed values 2/2/3/4 RF. G2-T1 balance review pending.
- Native Windows esbuild failed inside filesystem sandbox, passed outside it. Matching Playwright Chromium installed. No Ubuntu WSL distribution available. Unrelated historical SDK Windows failures were not rerun or repaired.
- Full runtime reset loses session; child reload loses local placement/tour. Uncertain read failure blocks mutations pending successful Retry; no automatic economic retry.
- Event cutoff/timezone, source publication and submission fields still need shipping-phase verification. G1 public preview deployment was authorized separately under D-030; G2 is now authorized.

## G1 GitHub Pages preview

Owner explicitly authorized publishing G1 (D-030). Full static SDK build from b3c1f47 first published on gh-pages as d58a8ce8866d1d8d26eb450c029b338f20970afb. Phase 3A.1 hotfix then published as de7e3b3a1515a20f349ebb8ddd3edbed07a44084. Pages source: gh-pages / root; URL: https://la0311.github.io/rarefriends-museum-of-almost-nothing/. GitHub reports the hotfix build successful; clean public browser checks passed at 960px and 360px with no asset/browser errors. No mock identity included; real-wallet gameplay remains unverified. This preview is not completion of G3.

## Phase 3A.1 frame-fit verification

Owner playtest found the original desktop terms overflowing and the original 360 × 240 host clipping all actions. D-031 records the bounded presentation change. Desktop remains 960 × 640; the SDK-supported host CSS gives widths up to 500px a 3:4 frame. The child uses a height-bound grid, reserves the runtime toolbar band, and opens Expedition terms in a contained dialog. Economy values and gameplay rules are unchanged.

- `npm run typecheck` — PASS; `npm run check` — PASS; `npm run build` — PASS.
- `node tests/museum.mjs` — PASS at 960px keyboard and 360px touch: full G1 loop, confirmation cancellation, duplicate protection, pause, unchanged economy, modal terms, and per-state no-scroll/visible-control geometry assertions.
- Public HTTPS — PASS: 960 × 640 desktop and 360 × 480 narrow frame, SDK wallet gate, expected MIME/asset responses, no browser errors. Owner's eligible-wallet interaction is still needed.
- Frame-fit screenshots: [desktop curation](evidence/g1-hotfix-curation-960.png), [desktop Present](evidence/g1-hotfix-present-960.png), [360px curation](evidence/g1-hotfix-curation-360.png), [360px Present](evidence/g1-hotfix-present-360.png), [360px terms](evidence/g1-hotfix-terms-360.png).
- [Diagnostic and validation detail](evidence/PHASE_3A_1.md). Do not begin G2 before owner recheck.
