# Handoff status

Updated: 2026-09-30

PROJECT: Museum of Almost Nothing
CURRENT PHASE: G3 — Final Ship
STATE: Final validation and public preview PASS; submission in progress
ROADMAP: AUTHORED
IMPLEMENTATION: PHASE 3B.1 COMPLETE
DEADLINE MODE: ACTIVE
CURRENT GATE: G3 — Final Ship
G0: PASS
G1: PASS — REAL WALLET VERIFIED DESKTOP + MOBILE
G2: PASS
TOKEN ACTIVITY PASS: PASS — owner UI/UX verified
G3: IN PROGRESS — final checks and real-wallet smoke PASS; organizer PR pending
FIRST PLAYABLE: AVAILABLE
MOBILE: PASS — owner real-wallet playtest
NEXT: Publish final source and open organizer submission PR
NEXT ACTION: Finish G3 submission and record PR URL

SELECTED CONCEPT: Museum of Almost Nothing
SDK: v0.1.4
PINNED COMMIT: ca3bf183b809ecf22d87c63d88ce03969a3f8da2
REAL_WALLET_TEST_CAPABILITY: AVAILABLE
REAL-WALLET GAMEPLAY VERIFIED: PASS — owner-reported desktop and mobile
REAL_WALLET_DESKTOP: PASS — owner-reported
REAL_WALLET_MOBILE: PASS — owner-reported
FINAL REAL-WALLET SMOKE: PASS — owner verified on public Token Activity build; no wallet address recorded
PUBLIC PREVIEW: AVAILABLE — https://la0311.github.io/rarefriends-museum-of-almost-nothing/
PUBLIC PREVIEW REVISION: gh-pages a8e742c70b36beb5cf9c28ff36844ed2ace878a8
SOURCE: https://github.com/la0311/rarefriends-museum-of-almost-nothing
SUBMISSION: organizer PR pending

## Execution

Latest owner instruction authorizes G3 feature-frozen shipping and reports Phase 3B.1 UI/UX passing. G0, G1, G2 and the Token Activity pass are complete. The owner verified the final public eligible-wallet, Friend, Secret Exhibition and simulated permit/expedition smoke.

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

Phase 3B.1 UI/UX and final public real-wallet smoke are owner-verified PASS. No further product iteration is authorized in G3.

## Current limitations / validation debt

- G1 real-wallet identity/gameplay, eligible ownership and canonical artwork passed owner testing on desktop and mobile. G2-specific real-wallet behavior remains for the G2 owner playtest.
- The Phase 3A.1 layout hotfix removes required child scrolling at 360px and passed the owner's real-wallet recheck.
- Movement/reveal are immediate and silent. Rules remain identical under reduced motion.
- Final G2 terms: permit 6 RF; weights 40/35/15/10%; fixed values 2/2/3/4 RF. Weighted expected redemption 2.35 RF. Initial 20 RF funds three permits and leaves 2 RF; two common 2 RF redemptions can fund another permit, subject to SDK backing.
- Native Windows esbuild failed inside filesystem sandbox, passed outside it. Matching Playwright Chromium installed. No Ubuntu WSL distribution available. Unrelated historical SDK Windows failures were not rerun or repaired.
- Full runtime reset loses session; child reload loses local placement/tour. Uncertain read failure blocks mutations pending successful Retry; no automatic economic retry.
- In Phase 3B.1, a child-only reload also rerolls the local target and loses local Token Activity counters while the SDK ledger survives. Random outcomes plus the unchanged 20 simulated RF opening balance can leave a target unattainable in a particular session; no compensating economy or fallback finale was authorized.
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

## Phase 3B.1 Token Activity validation

- One randomized local Secret Exhibition target replaces the selectable brief buttons and adaptive finale. THE ECHO requires A/A/B and the different object Presented last; THE VARIETY requires A/B/C and permits any Present order. The target rule and live ownership/display checklist sit above the museum room. Collection and contextual Actions are separate; reveal exposes both Keep and Redeem. The existing player-directed tour and free retry remain.
- Confirmed local activity records permits purchased, expeditions settled, simulated RF spent on permits, simulated RF returned through redemption and objects redeemed. The final DOM tableau derives net simulated RF spent and explicitly says no live RF was burned or spent. No persistence, backend or live-chain path was added.
- `node tests/museum-rules.mjs`, `npm run typecheck`, `npm run check`, `npm run build`: PASS. FriendSDK check retained 2.35 RF expected fixed redemption; `game.json` still has 6 RF permit and Pebble/Twig/Paperclip/Button 40/35/15/10% with 2/2/3/4 RF values.
- `node tests/museum.mjs`: PASS for both deterministic targets at 960px keyboard and 360px touch. Coverage includes cancelled buy/redeem, duplicate-action lock, confirmed activity counts, target readiness and loss after redemption, Echo failure/free retry, Variety any-order success, player-directed Friend, pause, no tour economy mutation and per-state frame fit without child scroll.
- Visual evidence: [Echo mobile collection](evidence/token-activity-echo-collection-360.png), [Variety mobile collection](evidence/token-activity-variety-collection-360.png), [Echo mobile finale](evidence/token-activity-echo-finale-360.png), [Variety desktop finale](evidence/token-activity-variety-finale-960.png).
- Static build published to the existing gh-pages root as `a8e742c70b36beb5cf9c28ff36844ed2ace878a8`. `node tests/public-preview.mjs`: PASS; public `index.html`, `game.js`, `game.css`, `runtime.js` and `runtime.css` SHA-256 hashes match the validated build, all HTTP 200. Public Chromium at 960×640 and 360×480 shows the normal wallet gate, with no browser errors. Headless public checking cannot use an eligible wallet; owner real-wallet evaluation of the new target flow remains the next checkpoint. URL: https://la0311.github.io/rarefriends-museum-of-almost-nothing/.
- The older Phase 3B brief/finale notes above document the previous preview; D-034 and PRODUCT_SPEC.md's Phase 3B.1 section are current.

## G3 final ship validation

- `npm run typecheck`, `npm run check`, `npm run build`, `node tests/museum-rules.mjs` and `npm run test:game`: PASS. Browser cases covered both targets at 960px keyboard and 360px touch, Keep/Redeem, activity counters, final tour, no tour RF mutation, duplicate request protection, pause and frame fit.
- Final public static `index.html`, `game.js`, `game.css`, `runtime.js` and `runtime.css` SHA-256 match the fresh production build. `node tests/public-preview.mjs`: PASS; desktop 960×640 and mobile 360×480 HTTP 200, normal SDK wallet gate, no page or console errors. Since the rebuilt assets are byte-identical, the existing gh-pages revision `a8e742c70b36beb5cf9c28ff36844ed2ace878a8` remains the deployed final candidate.
- Final public real-wallet smoke: PASS — owner verified eligible wallet/Friend access, Secret Exhibition, one simulated permit/expedition interaction, and usable new UI. No wallet address or secret recorded.
- RNG limitation confirmed from the finite 20 simulated RF start, 6 RF permits, and fixed redemption values: an unlucky sequence can leave a target unattainable. The final README and submission disclose this; no mechanic was changed.
- High-confidence credential pattern, tracked sensitive filename, and wallet-address pattern scans found no matches. Generated build and local tooling remain ignored. Submission copy explicitly discloses that no live RF is burned or spent.
