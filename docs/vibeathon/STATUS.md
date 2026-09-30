# Handoff status

Updated: 2026-09-30

PROJECT: Museum of Almost Nothing
CURRENT PHASE: Phase 3A — Emergency Implementation (G0 → G1)
STATE: First playable verified with automated SDK fixtures; owner checkpoint pending
ROADMAP: AUTHORED
IMPLEMENTATION: IN PROGRESS
DEADLINE MODE: ACTIVE
CURRENT GATE: G1 — Playable Vertical Slice
G0: PASS
G1: PASS — OWNER PLAYTEST REQUIRED
FIRST PLAYABLE: AVAILABLE
NEXT: Owner evaluates G1 before G2 expansion
NEXT ACTION: G1-T4 — owner playtest checkpoint

SELECTED CONCEPT: Museum of Almost Nothing
SDK: v0.1.4
PINNED COMMIT: ca3bf183b809ecf22d87c63d88ce03969a3f8da2
REAL_WALLET_TEST_CAPABILITY: AVAILABLE
REAL-WALLET GAMEPLAY VERIFIED: NO

## Execution

Latest owner instruction authorizes G0 through G1 and explicitly stops before G2. G0-T1–T3 and G1-T1–T3 implemented; G1-T4 automated checks pass, owner assessment pending. “PASS” here means technical first-playable validation, not completed human acceptance.

Existing clean baseline commit: fb1a6a7ddce82edff11d0e1421d9f9db0ba49835. No new baseline commit was needed: all planning files were already committed with no changes. Local G1 checkpoint authorized after verification; no push authorized or performed.

Official v0.1.4 release tag resolves to the pinned commit. Downloaded archive SHA-256 matches GitHub's published digest: 72dfa8b8f2e0ccb4361a38f454a0c77e9340da8cf29313fc03d5049224523cac. Standalone package-lock retains URL/integrity. No SDK edits or research-checkout dependency.

## Checks and evidence

- G0 typecheck / FriendSDK check / build: PASS.
- G0 SDK test: PASS, [scene](evidence/g0.png).
- G1 typecheck / FriendSDK check / build: PASS; see [execution log](evidence/PHASE_3A.md).
- `node tests/museum.mjs`: PASS at 960px keyboard and 360px touch; normal runtime with automated-only identity/RPC/canonical-art fixtures.
- Verified cancellation, duplicate buy protection, buy/play/settle, actual owned reveal, Keep without mutation, placement, player-directed position, explicit Present, pause lock, and unchanged RF/inventory through tour.
- Screenshots: [reveal](evidence/g1-reveal.png), [displayed object](evidence/g1-displayed.png), [Opening Remarks](evidence/g1-complete-960.png), [narrow viewport](evidence/g1-complete-360.png).
- Development server: http://127.0.0.1:4173. Normal entry requires owner's eligible wallet; no agent wallet interaction performed.

## Owner checkpoint

Evaluate expedition → object → Keep clarity; placement; destination + Present agency; separate RF/tour results; confirmation overhead. Do not begin G2 until owner evaluation/instruction.

## Current limitations / validation debt

- Real-wallet identity/gameplay unverified; automated fixtures do not establish ownership or real network reliability. Reserved full validation remains G3.
- Narrow frame requires vertical scrolling; touch loop passes, deeper mobile polish is outside G1.
- Movement/reveal are immediate and silent. Rules remain identical under reduced motion.
- Provisional G1 terms: permit 6 RF; weights 40/35/15/10%; fixed values 2/2/3/4 RF. G2-T1 balance review pending.
- Native Windows esbuild failed inside filesystem sandbox, passed outside it. Matching Playwright Chromium installed. No Ubuntu WSL distribution available. Unrelated historical SDK Windows failures were not rerun or repaired.
- Full runtime reset loses session; child reload loses local placement/tour. Uncertain read failure blocks mutations pending successful Retry; no automatic economic retry.
- Event cutoff/timezone, hosting/source publication and submission fields still need shipping-phase verification. No deployment or G2 work performed.
