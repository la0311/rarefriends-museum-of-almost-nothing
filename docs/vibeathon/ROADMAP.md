# Phase 2 — 4-Gate Emergency Implementation Roadmap

Authored 2026-09-30. Planning only; implementation NOT STARTED. Current gate: G0; next task: **G0-T1**. Gate/task execution requires the subsequent implementation instruction. No install, scaffold, wallet connection, deployment or commit is authorized by this planning document alone.

## Baseline and execution contract

Read PROJECT_CHARTER, STATUS, this roadmap and relevant PRODUCT_SPEC sections; respect SDK_CONSTRAINTS and DECISION_LOG. Research is needed only for a specific evidence gap.

Read-only baseline: Git root `C:/Users/DELL/Documents/Codex/rarefriends-museum-of-almost-nothing`; branch `main`; initial short status `?? .gitignore`, `?? AGENTS.md`, `?? README.md`, `?? docs/`. File inventory contains documentation/research only: no gameplay, package setup or ROADMAP existed. Museum is the sole active concept. FriendSDK **0.1.4 / ca3bf183b809ecf22d87c63d88ce03969a3f8da2** is the documentary pin; no installed SDK is claimed. Eligible-wallet capability AVAILABLE; real-wallet gameplay NOT verified.

Integration choice: install the official v0.1.4 GitHub release `.tgz` as the standalone package dependency in G0, locking its resolved artifact/integrity and verifying release provenance against the pinned commit. Do not substitute npm latest, a moving Git branch, SDK core vendoring or the old research checkout. Use the package CLI and public exports. Preserved evidence: [baseline §C–D](research/PHASE_0_BASELINE.md), [constraints](SDK_CONSTRAINTS.md). Exact release asset and installed commands must be confirmed in G0-T1; this task has not downloaded or installed them.

Proposed game directory `games/museum-of-almost-nothing/` (abbreviated **GAME** below): default-exported `index.tsx`, `game.json`, `README.md`, simple `style.css`, small `catalog.ts`, `rules.ts`, and focused tests only as needed. Root package/lockfile and typecheck setup supply the standalone toolchain. No generic engine, state framework, plugin/ECS, inventory framework or speculative abstraction. One primary React component, fixed arrays, three explicit slots and explicit predicates suffice.

Always preserve: one room, three plinths, four locked outcomes, canonical selected Friend, simulated RF, session-only 3–8 minute experience, 960 × 640 presentation, keyboard/touch parity, pause and reduced motion; mute whenever audio exists. SDK owns RF/permits/aggregate inventory/plays; local state owns placements and tours. Settle before curation; Keep is no mutation; tours never change odds, fixed values or RF. No backend, persistence, unique specimens, extra currency, crafting, upgrades, trading, custom identity layer or live contracts.

## Deadline execution policy

Approximately five hours is a planning envelope, not a coding-duration promise. Reserve roughly 10% for G0, 60% for G1 plus core G2, and **30% (about 90 minutes) for G3**. Record the actual cutoff/timezone and shipping-window start when implementation begins; do not silently assume the event time is verified. Start release/account readiness checks early without deploying or connecting a wallet before G3.

G3 must begin even if optional G2 polish remains unfinished. At the shipping window: **STOP adding features → validation → wallet → deploy → submission**. Only submission-blocking fixes continue. If minimum G1/G2 or wallet validation cannot pass, record the blocked gate honestly; the clock does not waive acceptance. Optional polish never delays G3.

**FIRST_PLAYABLE_GATE = G1.** Rendering G0 is not playable. G1 requires an economic action, an actual settled SDK outcome, a usable owned object, placement, player-directed Friend movement, explicit Present and a resolved local brief.

**Shared stop rule S (applies to every gate):** stop affected work, record evidence in STATUS, and ask the owner if SDK evidence contradicts PRODUCT_SPEC, unsupported SDK behavior is required, a locked product decision must change, or economic mutations cannot be safely reconciled. Never improvise a replacement system. Continue independent authorized work. D-029 records explicit deadline allowances; other locked rules remain binding.

Record task evidence and gate status in STATUS with links to `docs/vibeathon/evidence/` logs/screenshots when created. Never capture wallet addresses without authorization, or secrets. Mark failed/not-run checks honestly.

# G0 — Bootstrap

## OBJECTIVE
Enter a minimal museum using the pinned SDK runtime and read initial state.

## WHY THIS GATE EXISTS
Expose package, runtime, art and checker blockers before gameplay consumes the deadline.

## IN SCOPE
Standalone toolchain, package CLI, required game entry/schema, canonical art, minimal room, initial read and pause.

## OUT OF SCOPE
Economy interaction, curation/tours, polish, real-wallet validation and deployment.

## TASKS
| ID | Objective | Likely files | SDK touchpoints | Completion evidence |
|---|---|---|---|---|
| G0-T1 | Verify Node >=22/npm/Git and the pinned release artifact/exports; establish standalone package and locked dependency. Record exact dev/build/check/typecheck commands. Prefer documented Ubuntu/WSL2 if available; do not repair unrelated Windows SDK tests. | Root package.json, package-lock.json, tsconfig.json; STATUS | Official v0.1.4 release package and CLI; no SDK source changes | Version, artifact provenance/integrity and independent package resolution recorded; no research-checkout dependency |
| G0-T2 | Create checker-compatible GAME entry, schema, README and crude 960 × 640 room. Receive GameComponentProps (friendId, client, paused); call client.read(); render selected canonical art with loading/retry. Disable gameplay inputs while paused. | GAME/index.tsx, game.json, style.css, README.md | Public GameComponentProps, client.read(), canonical sprite exports verified from package | Initial ledger and selected Friend visible; art failure blocks entry; checker accepts structure |
| G0-T3 | Run local server, build/typecheck and automated verified-identity fixture smoke; confirm pause and art. Record toolchain blockers immediately. | Root scripts; GAME test fixture if needed; evidence; STATUS | friendsdk dev/check/build/test with GAME path; mocks only in automated fixtures | Successful run/build/check logs and scene screenshot; no shipped mock identity bypass |

## LIKELY FILE SURFACE
Root package/lock/typecheck files; GAME entry/schema/style/README; evidence and STATUS only.

## SDK TOUCHPOINTS
Package/runtime supplies host, child sandbox, private bridge and identity. Initial read is mandatory. Minimal schema terms are provisional, valid positive terms with four outcomes, to be finalized in G2-T1; no economy UI yet.

## VERIFICATION
Check package pin, independent imports, dev startup, read result, art, pause and build. Historical Phase 0 successes are not current-game passes.

## OWNER PLAYTEST / OWNER ACTION
No wallet action required for automated fixtures. Resolve an unavailable supported release/toolchain with owner evidence, without substituting SDK internals.

## ACCEPTANCE GATE
A verified session (or automated mocked SDK identity session) enters a minimal museum, reads initial SDK state and renders selected canonical Friend; project builds/runs without SDK core changes.

## STOP CONDITIONS
Rule S; unverified release provenance, unsupported standalone imports, or an identity bypass required to mount.

## EVIDENCE TO RECORD
Package/version/provenance, exact commands/results, initial-read and scene evidence, environment limitations. G0 is initialization only.

# G1 — Playable Vertical Slice

## OBJECTIVE
Complete one meaningful expedition-to-presentation loop on one operational plinth.

## WHY THIS GATE EXISTS
This is the most important implementation gate: prove the game before expanding it.

## IN SCOPE
One permit/expedition, settled object, Keep, one plinth, directed Friend and Opening Remarks; basic equivalent keyboard/touch input.

## OUT OF SCOPE
Three-slot expansion, redemption UI, other briefs, finale and decorative polish.

## TASKS
| ID | Objective | Likely files | SDK touchpoints | Completion evidence |
|---|---|---|---|---|
| G1-T1 | Add read → buy one permit → play → retain pending ID → settle → re-read → reveal owned outcome. Skip buy if permit exists. Lock repeated actions; after cancellation/uncertainty read before retry. | GAME/index.tsx, catalog.ts | client.read(), buy(1n), play(1n), settle(playId); runtime confirmations | Actual settled outcome and inventory agree; no fabricated outcome or queued spending |
| G1-T2 | Keep locally selects settled owned outcome; place one copy on one operational plinth with visible object/count. | GAME/index.tsx, rules.ts, style.css | Read aggregate outcome quantities; Keep/place make no SDK calls | Kept object becomes displayable; unowned placement blocked |
| G1-T3 | Begin Tour freezes arrangement and starts Friend at entrance. Player chooses plinth destination, then explicitly Presents. Resolve Opening Remarks (exactly one displayed/presented object); show “Tour result only — no RF awarded.” | GAME/index.tsx, rules.ts, style.css | Canonical sprites; paused prop; no tour mutation | Player-directed position and Present determine result; keyboard/touch work; pause blocks input; immediate movement allowed |
| G1-T4 | Run end-to-end fixture and OWNER PLAYTEST; record pacing and screenshots of reveal, curation and local result. Fix blocking comprehension/interaction issues within this slice. | GAME focused browser fixture if needed; evidence; STATUS | Real runtime with automated identity fixture; separate buy/play confirmations | One complete loop passes, owner observations recorded; compile-only success rejected |

## LIKELY FILE SURFACE
GAME primary component, catalog/rules/CSS and focused fixture; evidence and STATUS.

## SDK TOUCHPOINTS
Economy lifecycle above; bigint play IDs retained; inventory indexed by outcome ID. Keep and tour are local. Use recorded settled results, never settle twice; unknown state blocks further spending.

## VERIFICATION
Run the entire lifecycle through the runtime. Show ownership after settlement, no SDK action for Keep, no RF award for tour, and no input through pause/dialogs.

## OWNER PLAYTEST / OWNER ACTION
Observe: expedition → object → Keep is understandable; placement is discoverable; choosing destination + Present feels like directing the curator; RF outcome is separate from tour outcome; runtime confirmations do not make the loop unusable. Use the automated test harness for owner-observed loop evidence and feedback without adding a manual/shipped identity bypass. If hands-on owner playtest cannot occur before the reserved G3 wallet flow, record that checkpoint pending, continue independent work, and complete it in G3 before claiming G1 accepted.

## ACCEPTANCE GATE
One end-to-end loop works: read → buy(1n) → play(1n) → settle existing ID → reveal owned outcome → Keep → place on one plinth → Begin Tour → direct Friend → explicit Present → Opening Remarks result with no RF award. Screenshot evidence and owner playtest checkpoint recorded; unresolved owner playtest is pending, not passed.

## STOP CONDITIONS
Rule S; settlement/ownership cannot be confirmed, Keep mutates SDK, or Present happens automatically. Do not advance on component compilation alone.

## EVIDENCE TO RECORD
Loop trace, screenshots, input/pause checks, confirmation overhead and owner feedback; first playable status.

# G2 — Minimum Viable Vibeathon Game

## OBJECTIVE
Expand the proven slice into the smallest complete, submit-worthy Museum session.

## WHY THIS GATE EXISTS
Add curation decisions, redemption consequences and a deliberate ending without building the ideal full spec.

## IN SCOPE
Four objects, three plinths, redeem-one, three required briefs, one adaptive finale, essential failures and functional accessibility.

## OUT OF SCOPE
Additional systems, generalized inventory/engine architecture, drag-and-drop, mandatory audio/animation or all optional final brief variants.

## TASKS
| ID | Objective | Likely files | SDK touchpoints | Completion evidence |
|---|---|---|---|---|
| G2-T1 | One bounded balance pass: select permit price, four weights and four fixed positive redemption values. Use exactly Unremarkable Pebble, Very Short Twig, Unbent Paperclip, Unattached Button with §F descriptions/categories. Show exact terms before buy. | GAME/game.json, catalog.ts, README.md | 18-decimal RF bigint values; weights total 10,000; preview 20 RF, stake 10 × max reward | Quick arithmetic: approximately three buys from 20 RF, fourth makes redemption worth considering, common copies meaningfully fund it, weighted expected redemption < price; backing sanity check; terms recorded, no economy optimizer |
| G2-T2 | Add three explicit slots, place/replace/remove, duplicate allocation and owned/displayed/undisplayed counts; forbid allocations above owned quantities. | GAME/index.tsx, rules.ts, style.css | Read-only aggregate inventory; no specimen IDs | Multiple copies placed; replacement returns availability; same-type same-slot is no-op; focused quantity cases pass |
| G2-T3 | Add redeem-one with fixed value and affected-plinth preview. Prefer undisplayed stock; otherwise clear highest-numbered matching plinth only after refreshed SDK confirmation. Revalidate selected brief explicitly. | GAME/index.tsx, rules.ts | Public client redemption method/signature from pinned types; one copy; read after action | Surplus, all-displayed, final-copy and cancelled redemption cases; current RF/inventory/slots agree; infeasible brief explained, never silently switched |
| G2-T4 | Implement exact Opening Remarks, A Remarkable Resemblance and Two Entirely Different Things predicates (§G). Extend directed destinations to all three plinths; actual explicit Present order is sequence. | GAME/rules.ts, index.tsx | No SDK mutations during tours; canonical art/paused | One/two same/two different cases and wrong-order retry; two-object briefs require left occupied before right; arrangement frozen; each occupied slot presented once; no automatic advancement |
| G2-T5 | Add Final Exhibition after first completed tour, feasible arrangement, adaptive finale and closing tableau with order/result/RF separate. Minimum adaptive route reuses §G smaller-collection predicates: one copy centered, or applicable two-copy brief from any larger inventory. Additional three-copy finals are optional. Preserve local prompts (§D), empty closing state, inspect/return to curation and session-reset disclosure. | GAME/rules.ts, index.tsx, README.md | Local finale only; current simulated RF readout | Successful finale for all-same, mixed and single-copy inventories; empty collection closes honestly without success; player still directs every Present |
| G2-T6 | Finish high-value failure/input handling and owner checks. Cancel buy/play/redeem safely; re-read failures disable mutations; handle insufficient RF/backing, repeated inputs, art retry, pause/blur/hidden, reduced motion and identity invalidation. Recover pending IDs with supported API; otherwise safely block new expeditions and document limitation. | GAME/index.tsx, style.css, focused rules tests; evidence; STATUS | read/reconciliation, plays, paused, canonical artwork; runtime owns identity reset | Focused cancellation/reconciliation checks; functional keyboard/touch; mute if audio exists; coherent short owner session with duplicate, redemption, multi-object tour and ending |

## LIKELY FILE SURFACE
GAME component/schema/catalog/rules/style/README, minimal tests and evidence; no new service/storage layers.

## SDK TOUCHPOINTS
One economic request at a time. canBuy reflects backing, not player RF; check actual balance too. Redemption does not replenish free backing. Terms never vary with tour performance. Child reload may retain ledger but loses local tour; re-read and reconcile without promising restoration. Full runtime reload resets session.

## VERIFICATION
Check arithmetic once; focus tests on quantity reconciliation and brief order where meaningful. Exercise cancellation, all displayed copies, final owned copy, nonempty finale feasibility and paused/reduced-motion parity. Recovery presentation can be cut; authoritative reconciliation cannot.

## OWNER PLAYTEST / OWNER ACTION
Curation: three plinths, duplicate usefulness and place/replace/remove are understandable. Keep/redeem: owner finds a real reason for each and sees exhibition change. Friend: destination + Present feels active, not decorative. Session: a first-time player finishes a coherent short exhibition, understands ending/reset, and confirmations do not dominate. Record defects and bounded fixes; no new system to compensate.

## ACCEPTANCE GATE
A first-time player obtains multiple objects, uses duplicates meaningfully, arranges three plinths, redeems a copy and sees correct reconciliation, completes a multi-object brief with directed presentation order, and finishes a final exhibition. Functional input and safe mutation handling pass. Optional variants/polish may remain cut.

## STOP CONDITIONS
Rule S; displayed > owned, stale outcomes treated as owned, finale luck-gated, or redemption/confirmation state guessed. At shipping cutoff stop feature additions; incomplete mandatory acceptance stays explicitly blocked while G3 independent work begins.

## EVIDENCE TO RECORD
Exact economics and arithmetic, brief/reconciliation results, owner session observations, screenshots and explicit cuts/limitations.

# G3 — Ship

## OBJECTIVE
Produce a public, honestly documented and real-wallet-verified submission candidate.

## WHY THIS GATE EXISTS
Protect validation, owner wallet time and public delivery from feature creep.

## IN SCOPE
Targeted checks, real identity/runtime flow, static public preview and submission material.

## OUT OF SCOPE
New features, broad SDK repairs, backend/custom hosting, live transactions/contracts and optional polish.

## TASKS
| ID | Objective | Likely files | SDK touchpoints | Completion evidence |
|---|---|---|---|---|
| G3-T1 | Targeted validation: build/typecheck, friendsdk check GAME, meaningful existing focused tests, desktop core loop, 360px functional touch, reduced motion and pause. Fix only submission blockers. | GAME fixes only; evidence; STATUS | Installed package CLI check/build/test; runtime | Exact commands/results and screenshots; identify game failures separately from historical upstream Windows failures |
| G3-T2 | Late real-wallet validation through normal browser runtime: discovered wallet → owner connection → owned eligible Friend → selection → fresh eligibility → canonical art → simulated Museum mount → core interaction. | Evidence/STATUS only; no wallet data files | SDK EIP-6963/injected provider flow; Robinhood 4663 eligible Generations generation >=1 | Owner-observed identity and at least one Museum interaction recorded; no mocked pass, live RF transaction or contract deployment |
| G3-T3 | Build without --deployment; publish all generated .friendsdk contents to static HTTPS, preferably GitHub Pages when account/repository access permits. Preserve paths/MIME/CSP/sandbox and .nojekyll for branch Pages. Check clean-browser public load and runtime resources. | Root hosting configuration only if needed; generated output; README; evidence | SDK static build, complete host/child assets and bridge | Public URL loads cleanly; no asset/CSP/MIME errors; supported runtime gate works; no shipped fixture bypass; public result precedes candidate declaration |
| G3-T4 | Prepare submission README and synchronize actual shipped facts, source/public URLs, credits, validation and cuts. Resolve owner builder/contact/category fields and verified cutoff/submission route; do not invent them. | submissions/museum-of-almost-nothing/README.md; root README; STATUS | Document exact pinned SDK, simulated terms and supported identity requirements | All fields below complete; source accessible; final candidate checklist evaluated; no unimplemented feature claimed |

## LIKELY FILE SURFACE
Evidence, STATUS, root/game/submission README, minimal static-host configuration and only blocking game fixes. Publication/submission actions follow the subsequent owner implementation/shipping authorization; no autonomous commit permission is inferred.

## SDK TOUCHPOINTS
Use installed pinned CLI: `friendsdk check games/museum-of-almost-nothing`, `friendsdk build games/museum-of-almost-nothing` without live deployment flags. Whole `.friendsdk/` output is required, not just the child game bundle. Runtime owns wallet and eligibility; no custom selector, WalletConnect or transaction layer.

## VERIFICATION
Do not require unrelated native-Windows SDK suite failures to pass: Phase 0 recorded 111/118 passed, five failed, two skipped (symlink, permissions, paths/assertion, unresolved watch rebuild). Preserve as upstream/baseline limitations; use documented Ubuntu/WSL2 for relevant blocking toolchain checks if needed. Avoid broad expensive suites. Clean public load is distinct from an authenticated interaction; finish any outstanding public-host identity checks with owner before claiming full success.

## OWNER PLAYTEST / OWNER ACTION
**OWNER ACTION REQUIRED** for browser wallet consent/connection/selection and any necessary network confirmation, hosting account access or missing submission identity fields. Continue independent validation, static build and README work while waiting; never treat waiting as consent or verification. No live RF transaction; never request/store/print/log/commit keys, seed/recovery phrases, exports or signing secrets. Do not record addresses without explicit authorization.

## ACCEPTANCE GATE
Targeted game checks pass; real eligible-wallet flow and interaction verified; clean-browser public HTTPS works; source and exact truthful submission README ready. Public preview must precede submission readiness. Pending wallet/hosting/owner fields block candidate status, not independent shipping preparation.

## STOP CONDITIONS
Rule S; identity fails fresh eligibility, secrets would be required, public sandbox/CSP fails, package pin differs, or mandatory evidence is missing. Do not claim mock results as wallet verification or simulation as live RF.

## EVIDENCE TO RECORD
Validation matrix, wallet flow pass/fail without sensitive identifiers, public URL and clean-browser check, source URL, current cuts, submission README and candidate decision.

Submission README must include: project name; builder/contact; primary category if required; Rare Friends connection; source repository and public playable URLs; FriendSDK v0.1.4 and full pinned commit; wallet/network requirements; controls and loop; simulated RF and full-runtime-reset disclosure; **exact implemented** permit cost, all four probabilities and all fixed redemption values; Keep/redeem explanation; asset credits; setup/run instructions; performed validation; known issues/cuts. Do not describe optional/unimplemented spec features as shipped.

## DEADLINE SCOPE CUT ORDER

1. Music.
2. Optional sound (no mute control required if there is no audio).
3. Decorative walking/reveal animations (snap to selected destination; Present stays explicit).
4. Sophisticated spotlight transitions.
5. Additional final brief variants (retain one adaptive feasible finale).
6. Sophisticated recovery messages (retain safe read/reconcile/block behavior).
7. Extra automated test coverage (retain meaningful submission-risk checks).
8. Advanced mobile polish (retain functional touch and readable required controls).

Keep if at all possible: real SDK runtime, selected Rare Friend, buy/play/settle, Keep, Redeem, owned-object curation decision, directed Present, three plinths, meaningful multi-object brief, final exhibition, public preview, simulation disclosure and submission README. These minimum gate criteria are not silently waived. Cut any lower-priority feature threatening G3; record it, never invent a replacement system.

## DEADLINE RISK REGISTER

| Risk | EARLIEST GATE TO TEST | FAILURE SIGNAL | EMERGENCY RESPONSE WITHIN CURRENT SCOPE |
|---|---|---|---|
| Curation feels like a menu | G1 | Player cannot explain placement choice | Clarify room selection/occupied slots and visible brief consequence |
| Friend feels decorative | G1 | Present described as opening a label | Improve destination choice, position and explicit Present feedback; no new movement system |
| Duplicates disappoint | G2 | Player discards pairs as useless | Show feasible matching brief and separate copy placement |
| Keep/redeem tension weak | G2 | Neither option has an understood cost | One bounded price/value adjustment within §F; clarify lost display option |
| Buy/play confirmations dominate | G1 | Owner finds loop unusable | Shorten local transitions/copy, avoid redundant actions; never bypass trusted confirmations |
| Finale feels automatic | G2 | Player need not choose route/Present | Keep arrangement and explicit ordered presentation visible; reuse exact predicates |
| Small-screen readability | G1 basic; G3 360px | Required controls unreadable/occluded | Simplify copy and contained panel, enlarge targets, preserve runtime corners |
| Polish consumes deadline | G0 onward | Optional work reaches shipping cutoff | Apply cut order and begin protected G3 immediately |

# VIBEATHON SUBMISSION CANDIDATE — DEFINITION OF DONE

- [ ] G0 passed; G1 passed; minimum G2 passed.
- [ ] Build/typecheck and FriendSDK game check pass.
- [ ] Desktop core loop works; touch flow is functional.
- [ ] Reduced motion preserves rules; pause works; mute works if audio exists.
- [ ] Real eligible-wallet identity flow and core interaction verified.
- [ ] Simulated RF and full-runtime-reset behavior clearly disclosed.
- [ ] Public HTTPS preview works; source repository available.
- [ ] Implemented permit cost, four probabilities and fixed redemption values documented exactly.
- [ ] Known issues and cuts documented; submission README complete and ready.
- [ ] No wallet secret exists in repository; no unauthorized address recorded.
- [ ] No FriendSDK core mutation; no false claim of live RF usage.

Optional polish does not block candidate status. Missing mandatory evidence does.

