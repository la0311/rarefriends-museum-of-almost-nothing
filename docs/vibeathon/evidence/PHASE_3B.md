# Phase 3B — G2 minimum validation

Date: 2026-09-30. Gate: G2 PASS, owner playtest required. G3 has not started.

## Owner G1 validation and checkpoint

The owner reported eligible real-wallet G1 gameplay, ownership verification, canonical Friend artwork and the public preview passing on desktop and mobile. No wallet address or secret was recorded. The G1/G1.1 local checkpoint is `54fd0fa feat: stabilize playable museum vertical slice`.

## Exact simulated economy

| Outcome | Weight | Fixed redemption |
|---|---:|---:|
| Unremarkable Pebble | 4,000 bps / 40% | 2 RF |
| Very Short Twig | 3,500 bps / 35% | 2 RF |
| Unbent Paperclip | 1,500 bps / 15% | 3 RF |
| Unattached Button | 1,000 bps / 10% | 4 RF |

Permit price: 6 RF. Weights sum to 10,000 bps. Expected redemption is `0.40×2 + 0.35×2 + 0.15×3 + 0.10×4 = 2.35 RF`, below price. Initial 20 RF buys three permits for 18 RF, leaving 2 RF. Two ordinary 2 RF redemptions can reach 6 RF for another permit if SDK backing permits. No tour result changes the ledger, terms or odds.

## Rules and runtime validation

- `node tests/museum-rules.mjs`: PASS. Checks triple duplicate placement, allocation limit, remove/replace, surplus and displayed reconciliation, final-copy clearance, feasible-only briefs, both pair relationships, wrong order, and one/two/three-copy finale including mixed inventory.
- `node tests/museum.mjs`: PASS at 960px keyboard and 360px touch in the normal SDK runtime with automated-only identity/RPC/art fixtures. Three consecutive settled Pebbles were displayed on three plinths. The matching brief failed on wrong Present order and passed on free retry. The three-plinth Final Exhibition passed with center presented last and showed the closing tableau/order/RF disclosure. A cancelled buy, local redeem cancellation, runtime redeem cancellation, confirmed all-displayed redemption, selected brief invalidation, final-copy clearance, empty non-successful closure, pause lock and repeated buy suppression all passed. Browser console and page errors: none. Every tested state fit above the runtime toolbar without child scroll.
- `npm run typecheck`, `npm run check`, `npm run build`: PASS. SDK check reported expected redemption `2350000000000000000` base units = 2.35 RF.
- Desktop and mobile screenshots: [three plinths 960](g2-three-plinth-960.png), [three plinths 360](g2-three-plinth-360.png), [finale 960](g2-finale-960.png), [finale 360](g2-finale-360.png), [redeemed 360](g2-redeemed-360.png).

## Public preview

Existing gh-pages path published the G2 build once: `f3d17dca822e436220c50019d3718696cab25bb5`. URL: https://la0311.github.io/rarefriends-museum-of-almost-nothing/. Public `index.html`, `game.js` and `game.css` SHA-256 hashes matched the local G2 build. Public Chromium at 960px and 360px returned HTTP 200 with the normal wallet/Friend gate and no console/page errors. Owner G2 real-wallet playtest remains to be done; prior G1 real-wallet verification remains PASS.

## Bounded cuts and next gate

Audio, decorative movement/spotlight polish, the optional named three-copy final variants and advanced recovery prose were cut. The implemented single adaptive finale supports any nonempty owned collection with a feasible one-, two- or three-plinth close. Next: owner tests three-plinth curation, duplicates, Keep/Redeem, directed Friend agency and the ending; then immediate G3 shipping.
