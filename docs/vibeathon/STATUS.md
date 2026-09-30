# Handoff status

Updated: 2026-09-30

PROJECT: Museum of Almost Nothing
CURRENT PHASE: Phase 3B — G2 Minimum Viable Vibeathon Game
STATE: G2 minimum validated; owner G2 playtest required
ROADMAP: AUTHORED
IMPLEMENTATION: G2 MINIMUM COMPLETE
DEADLINE MODE: ACTIVE
CURRENT GATE: G2 — Minimum Viable Vibeathon Game
G0: PASS
G1: PASS — REAL WALLET VERIFIED DESKTOP + MOBILE
G2: PASS — OWNER PLAYTEST REQUIRED
G3: NOT STARTED
FIRST PLAYABLE: AVAILABLE
MOBILE: PASS — owner real-wallet playtest
NEXT: Owner G2 playtest, then immediate G3 shipping
NEXT ACTION: Owner checks curation, duplicates, Keep/Redeem, Friend agency and finale

SELECTED CONCEPT: Museum of Almost Nothing
SDK: v0.1.4
PINNED COMMIT: ca3bf183b809ecf22d87c63d88ce03969a3f8da2
REAL_WALLET_TEST_CAPABILITY: AVAILABLE
REAL-WALLET GAMEPLAY VERIFIED: PASS — owner-reported desktop and mobile
REAL_WALLET_DESKTOP: PASS — owner-reported
REAL_WALLET_MOBILE: PASS — owner-reported
PUBLIC PREVIEW: AVAILABLE — https://la0311.github.io/rarefriends-museum-of-almost-nothing/
PUBLIC PREVIEW REVISION: gh-pages f3d17dca822e436220c50019d3718696cab25bb5

## Execution

Latest owner instruction authorizes bounded G2 and reports completed G1 real-wallet playtests on desktop and mobile. G0, G1 and minimum G2 technical acceptance pass. Owner G2 playtest remains a separate checkpoint before G3.

Existing clean baseline commit: fb1a6a7ddce82edff11d0e1421d9f9db0ba49835. Verified G1/G1.1 changes and owner validation were checkpointed locally as 54fd0fa. D-030 authorized G1 preview publishing; the Phase 3B instruction authorized the G2 preview.

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

Evaluate three-plinth curation, Owned/Displayed clarity, duplicate usefulness, Keep/Redeem consequences, destination + Present agency, and whether the Final Exhibition feels like a natural ending. Stop before G3 until the owner G2 playtest is reported.

## Current limitations / validation debt

- G1 real-wallet identity/gameplay, eligible ownership and canonical artwork passed owner testing on desktop and mobile. G2-specific real-wallet behavior remains for the G2 owner playtest.
- The Phase 3A.1 layout hotfix removes required child scrolling at 360px and passed the owner's real-wallet recheck.
- Movement/reveal are immediate and silent. Rules remain identical under reduced motion.
- Final G2 terms: permit 6 RF; weights 40/35/15/10%; fixed values 2/2/3/4 RF. Weighted expected redemption 2.35 RF. Initial 20 RF funds three permits and leaves 2 RF; two common 2 RF redemptions can fund another permit, subject to SDK backing.
- Native Windows esbuild failed inside filesystem sandbox, passed outside it. Matching Playwright Chromium installed. No Ubuntu WSL distribution available. Unrelated historical SDK Windows failures were not rerun or repaired.
- Full runtime reset loses session; child reload loses local placement/tour. Uncertain read failure blocks mutations pending successful Retry; no automatic economic retry.
- Event cutoff/timezone, source publication and submission fields still need shipping-phase verification. G1 public preview deployment was authorized separately under D-030; G2 is now authorized.

## G1 GitHub Pages preview

Owner explicitly authorized publishing G1 (D-030). Full static SDK build from b3c1f47 first published on gh-pages as d58a8ce8866d1d8d26eb450c029b338f20970afb. Phase 3A.1 hotfix then published as de7e3b3a1515a20f349ebb8ddd3edbed07a44084. Pages source: gh-pages / root; URL: https://la0311.github.io/rarefriends-museum-of-almost-nothing/. GitHub reported the hotfix build successful; clean public browser checks passed at 960px and 360px with no asset/browser errors. No mock identity was included; owner real-wallet gameplay passed on desktop and mobile. This preview history is not completion of G3.

## Phase 3A.1 frame-fit verification

Owner playtest found the original desktop terms overflowing and the original 360 × 240 host clipping all actions. D-031 records the bounded presentation change. Desktop remains 960 × 640; the SDK-supported host CSS gives widths up to 500px a 3:4 frame. The child uses a height-bound grid, reserves the runtime toolbar band, and opens Expedition terms in a contained dialog. Economy values and gameplay rules are unchanged.

- `npm run typecheck` — PASS; `npm run check` — PASS; `npm run build` — PASS.
- `node tests/museum.mjs` — PASS at 960px keyboard and 360px touch: full G1 loop, confirmation cancellation, duplicate protection, pause, unchanged economy, modal terms, and per-state no-scroll/visible-control geometry assertions.
- Public HTTPS — PASS: 960 × 640 desktop and 360 × 480 narrow frame, SDK wallet gate, expected MIME/asset responses, no browser errors. Owner's eligible-wallet interaction passed on desktop and mobile.
- Frame-fit screenshots: [desktop curation](evidence/g1-hotfix-curation-960.png), [desktop Present](evidence/g1-hotfix-present-960.png), [360px curation](evidence/g1-hotfix-curation-360.png), [360px Present](evidence/g1-hotfix-present-360.png), [360px terms](evidence/g1-hotfix-terms-360.png).
- [Diagnostic and validation detail](evidence/PHASE_3A_1.md). Owner recheck passed before G2 began.

## Phase 3B minimum G2 validation

- Exactly four locked object outcomes and three explicit plinths. SDK aggregate inventory is authoritative; local slots are reconciled after every economic read. Duplicate copies can fill multiple plinths; no allocation can exceed ownership.
- Redeem acts on one copy through runtime confirmation. The preview shows fixed value, resulting owned count and affected plinth. Cancelled requests preserve assignments; confirmed requests reconcile the highest-numbered matching plinth only when all copies were displayed. An infeasible selected brief is explained and cleared.
- Opening Remarks, A Remarkable Resemblance and Two Entirely Different Things are feasible-only local briefs. The player chooses each occupied destination and explicitly Presents in order. A failed order and free retry were exercised with no RF mutation.
- Final Exhibition uses one centered copy, two copies with the applicable relationship and left-before-right order, or three copies with the center presented last. Three Pebbles can finish. Empty closure is non-successful. No finale RF reward.
- Typecheck, FriendSDK check/build, pure rules tests and 960px keyboard / 360px touch runtime tests: PASS. Runtime browser console/page errors: NONE. No child scrolling or controls beneath the toolbar at tested states. Owner G2 real-wallet playtest remains required.
- Screenshots: [three plinths desktop](evidence/g2-three-plinth-960.png), [three plinths mobile](evidence/g2-three-plinth-360.png), [finale desktop](evidence/g2-finale-960.png), [finale mobile](evidence/g2-finale-360.png), [redeem reconciliation mobile](evidence/g2-redeemed-360.png).
- Scope cuts: audio, decorative movement/spotlight polish, optional three-copy final brief variants, advanced recovery prose. No G3 submission claim.
- G2 static build published once to gh-pages as f3d17dca822e436220c50019d3718696cab25bb5. Public index.html, game.js and game.css SHA-256 match the local G2 build. Clean public Chromium visits at 960px and 360px returned HTTP 200, loaded the normal wallet/Friend gate and reported no console or page errors. The public URL is the owner G2 playtest candidate.
- [Detailed G2 evidence](evidence/PHASE_3B.md).
