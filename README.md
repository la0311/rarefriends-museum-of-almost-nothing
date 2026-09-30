# Museum of Almost Nothing

A Rare Friends session game where a Friend curates almost-worthless objects while the player repeatedly spends and recycles simulated RF to complete a Secret Exhibition.

## Play

[Play the public preview](https://la0311.github.io/rarefriends-museum-of-almost-nothing/). The FriendSDK runtime requires a browser wallet holding an eligible Rare Friends Generations NFT (generation 1 or higher) on Robinhood mainnet, chain 4663. Connect the wallet and select your Friend in the runtime to enter the museum.

## Category

Token Activity.

## How it works

Each fresh session selects one Secret Exhibition target. Buy a 6 simulated RF expedition permit, send an expedition, and reveal a random object. **Keep** a find for the three-plinth exhibition, or **Redeem** one copy for its fixed simulated RF value to help fund another attempt. Arrange three owned objects, direct your Friend to each plinth, and explicitly Present them to complete the Final Exhibition. The closing tableau shows the session's Token Activity totals.

**THE ECHO** needs a matching pair and one different object, with the different object Presented last. **THE VARIETY** needs three different object types, Presented in any order. A failed presentation can be retried without an RF cost. Tour results never change the economy.

## Simulation disclosure

This Vibeathon preview uses FriendSDK's simulated RF economy. No live RF is burned or spent. Activity totals are local session metrics, not blockchain history or a persistent score.

## Economics

One expedition permit costs **6 simulated RF**. The SDK starts a fresh session with 20 simulated RF.

| Outcome | Probability | Fixed redemption for one copy |
| --- | ---: | ---: |
| Unremarkable Pebble | 40% | 2 simulated RF |
| Very Short Twig | 35% | 2 simulated RF |
| Unbent Paperclip | 15% | 3 simulated RF |
| Unattached Button | 10% | 4 simulated RF |

The weighted expected redemption is 2.35 simulated RF, below the permit price. Keep, placement, and tours do not change these terms.

## Controls

Use **Tab / Shift+Tab** and **Enter / Space** on desktop, or tap the same visible controls on touch screens. Select an owned object in Collection, select a numbered plinth, then Place, Replace, or Remove. When the three-plinth arrangement matches the target, prepare and begin the Final Exhibition. Direct your Friend to each occupied plinth and select **Present**; arrival does not Present automatically. The runtime's menu can pause play. The game has no audio, and reduced-motion mode keeps the same decisions.

## FriendSDK

Built with FriendSDK **v0.1.4**, pinned to upstream commit [`ca3bf183b809ecf22d87c63d88ce03969a3f8da2`](https://github.com/spokesz/friendsdk/commit/ca3bf183b809ecf22d87c63d88ce03969a3f8da2). FriendSDK supplies wallet and Friend selection, canonical Friend artwork, simulated RF, permits, outcomes, and inventory. No SDK core is copied or modified.

## Development

Requires Node.js 22 or later and npm. From the repository root:

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4173` with an eligible browser wallet. To validate and build:

```sh
npm run typecheck
npm run check
npm run build
node tests/museum-rules.mjs
npm run test:game
```

The focused browser test uses Playwright Chromium; install its browser with `npx playwright install chromium --only-shell` if needed. Its identity, RPC, and artwork fixtures are confined to automation. The public build uses the normal FriendSDK wallet gate.

## Known limitations

- A full runtime reload starts another session and can choose another target. A child-only reload retains the SDK ledger but loses local target, arrangement, tour, and activity counters.
- Random draws and the finite simulated RF balance can leave a Secret Exhibition incomplete in a particular session. Completion is not guaranteed.
- There is no backend or global leaderboard. All displayed Token Activity is simulated and local to the session.

Canonical Friend art is credited to Rare Friends through the FriendSDK sprite API. Museum UI and object silhouettes are project-authored. See [submission details](docs/vibeathon/SUBMISSION_README.md) and [project status](docs/vibeathon/STATUS.md).
