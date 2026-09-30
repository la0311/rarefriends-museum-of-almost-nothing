# SDK constraints

## Version lock and distribution

FriendSDK **v0.1.4**, commit **ca3bf183b809ecf22d87c63d88ce03969a3f8da2**. No upgrade without explicit owner decision.

This standalone repository must not depend on the old research checkout. Do not copy SDK core or vendor internals. Phase 2 chooses the exact supported package/integration mechanism. Verified distribution is a GitHub release .tgz, not planned npm-registry publication; Node >=22, npm and Git are documented, with Ubuntu/WSL2 the documented Windows route.
Sources: [distribution](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/README.md#L299), [tooling](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/README.md#L42), [preserved baseline](research/PHASE_0_BASELINE.md).

## Runtime ownership and identity

Runtime supplies wallet connection, NFT discovery, eligibility gate, Friend selection and trusted checkout. Do not implement competing flows, collection-wide scanning or another ownership gate. Game entry receives friendId, client and paused; initial client.read() is required.

Playable identity requires fresh verified ownership of an eligible hardwired Generations NFT, generation >=1, Robinhood chain 4663. Account/network/Friend changes invalidate the session. Mocks are automated test fixtures only, never a shipped bypass.

REAL_WALLET_TEST_CAPABILITY: AVAILABLE — owner-confirmed in Phase 1D. G1 real-wallet gameplay, eligible ownership flow and canonical art passed owner testing on desktop and mobile in the public preview. Do not record wallet addresses/secrets.
Sources: [runtime ownership](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/AGENTS.md#L35), [eligibility](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/AGENTS.md#L70), [entry/read](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L197), [session invalidation](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L225).

## Economy

Bounded lifecycle: read → buy → play → settle → redeem. KEEP = no SDK mutation. Museum settles before curation.

Inventory is aggregate outcome quantities, indexed by outcome ID; no unique specimen identity. Displayed quantities must never exceed owned quantities. Redeem removes owned quantities and returns fixed simulated RF. Local descriptions/categories/placements do not create SDK inventory.

Tour performance cannot alter probabilities, settlement results or redemption values, mint inventory or award RF. One consumable and fixed weighted outcome table; total weight 10,000 basis points; RF uses 18-decimal bigint units. SDK schema requires positive price and at least one positive reward; Museum product requires all four rewards positive. Exact terms remain product balance parameters.

Runtime starts preview with 20 RF and 10 × maximum prize stake. canBuy checks backing, not player RF balance. Redemption does not increase free stake. Do not promise another purchase after redemption. Buy/play/redeem use trusted runtime confirmations; quantities across bridge are 1–99. Museum UI uses one copy/permit at a time.

After uncertain mutations, read before retrying. Recover pending plays by existing ID; use recorded settled results without settling twice. Keep one economic action active, respect paused, never queue repeated spending inputs.
Sources: [client/ledger](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L5), [reserve/redeem arithmetic](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L101), [preview initial state](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game-host.tsx#L191), [economy schema](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/API.md#L258), [bridge](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/API.md#L353).

## State

SDK state: simulated RF, permits/consumables, aggregate inventory, plays and backing.
Local ephemeral state: plinth placements, brief selection, tour order, Friend position, completion/finale status.

Full runtime reload resets the preview session. Child reload may preserve host ledger while losing local arrangement/tour state: read and reconcile; never promise reconstruction of a local tour. No localStorage/IndexedDB/save bridge; no persistent museum promise.
Sources: [sandbox/storage](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L274), [recovery fixture](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/check-starter-browser.mjs#L93).

## Security / sandbox

Respect SDK sandbox, CSP and private bridge. No signer access, arbitrary calldata/deployment powers, parent-page UI access or wallet secrets. Do not add remote APIs/assets outside the allowed CSP. Never request, store, copy, print, log or commit private keys, seed/recovery phrases, export files or signing secrets. Do not record wallet addresses without explicit owner instruction.
Sources: [sandbox](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L270), [CSP](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/dev-game.mjs#L13).

## Scope, art and accessibility

Simulation only; no live contracts, deployment or live economic actions unless separately authorized. No unsupported upgrade/crafting/trading/equipment/currency APIs.

Use canonical selected Friend artwork, without invented stats/traits. Level 2 identity means player-directed movement and explicit Present actions, not artwork-derived mechanical advantages.

Respect paused; stop movement on blur/hidden pages. Preserve keyboard/touch parity, mute, reduced motion with identical rules, and loading/error/retry states. Keep runtime lower corners unobstructed. Target 960 × 640; small touch frame needs real validation. No WalletConnect or additional wallet infrastructure.
Sources: [simulation](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/AGENTS.md#L96), [capability gaps](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L299), [world interaction rules](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/WORLD_RULES.md#L26), [sprite API](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/friend-sprites.ts#L1).

## Validation evidence

[Baseline](research/PHASE_0_BASELINE.md) and [historical run log](research/PHASE_0_RUN_LOG.txt) preserve measured results and limitations. Existing commands describe SDK checks, not an already-installed project toolchain. Future game checks require Phase 2 integration decisions. Real-wallet capability does not establish passing gameplay or submission readiness.
