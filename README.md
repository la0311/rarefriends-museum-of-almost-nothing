# Museum of Almost Nothing

A first playable, session-only museum starring your selected canonical Rare Friend.

**Phase 3B.1: Token Activity pass; owner playtest required before G3.**

## Public preview

[Play the public preview](https://la0311.github.io/rarefriends-museum-of-almost-nothing/)

The owner reported real eligible-wallet gameplay passing on desktop and mobile. Phase 3B.1 gameplay needs an owner Token Activity playtest; an eligible Friend wallet is required.

## Run

Node >=22 and npm are required. From this repository:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173 in a browser with the eligible wallet extension. The normal SDK runtime handles connection, Friend selection and fresh ownership verification on Robinhood chain 4663 (hardwired Generations NFT, generation >=1). No live RF transaction or signing secret is needed. G1 real-wallet gameplay passed owner testing on desktop and mobile.

This machine uses a local npm download because npm was absent from PATH: `node .tooling/package/bin/npm-cli.js run dev`. That ignored tooling folder is not needed on a machine with npm installed. Native Windows verification passed with esbuild/browser processes outside the filesystem sandbox; the upstream documented Windows route is Ubuntu/WSL2.

## Playable session

One random Secret Exhibition target (THE ECHO or THE VARIETY) appears per runtime session. Buy permit → Send expedition → settle → reveal an owned object → Keep or redeem → collect for the target → arrange all three plinths → direct your Friend and explicitly Present → complete the Final Exhibition.

Tab and Enter/Space or pointer/touch operate the same visible controls. Select an owned type from Collection, select a numbered plinth, then Place or Replace; Remove returns a copy to undisplayed stock. THE ECHO needs a matching pair and one different object, with the different object Presented last. THE VARIETY needs three different objects in any Present order. The Friend changes position only when directed; arrival never presents automatically. Failed tours and retries cost nothing.

Redeem acts on one aggregate copy through runtime confirmation. Undisplayed stock is used first; if every copy is displayed, the highest-numbered matching plinth clears after the SDK state is re-read. Confirmed permit purchases, settlements and redemptions feed local Token Activity counters. The closing tableau shows the target, collection and simulated RF net spend with an explicit no-live-spend disclosure. Runtime menus pause local gameplay. There is no audio. The desktop frame is 960 × 640; the narrow host frame grows vertically so required current-state actions remain visible without game scrolling.

RF is simulated. Keep, placement and tours make no economic mutations. The SDK owns aggregate inventory. Full runtime reload resets the session and may select a new target; child reload re-reads retained ledger state but does not restore the local target, arrangement, tour or activity counters.

Final G2 economics: 6 RF per permit; Pebble 40% / fixed 2 RF, Twig 35% / fixed 2 RF, Paperclip 15% / fixed 3 RF, Button 10% / fixed 4 RF. The initial 20 RF funds three permits (18 RF), leaving 2 RF. Two ordinary 2 RF redemptions can fund another permit; weighted expected redemption is 2.35 RF, below the 6 RF permit. Tour results never change RF, odds or values.

## Checks

```sh
npm run typecheck
npm run check
npm run build
npm run test:game
node tests/museum-rules.mjs
```

Browser testing additionally needs `npx playwright install chromium --only-shell`. The test uses the normal SDK runtime with automated-only mock identity/RPC/artwork responses; no mock bypass is included in dev or public builds.

FriendSDK **0.1.4**, upstream commit **ca3bf183b809ecf22d87c63d88ce03969a3f8da2**, installed from the official release archive with lockfile integrity. Archive SHA-256: `72dfa8b8f2e0ccb4361a38f454a0c77e9340da8cf29313fc03d5049224523cac`. No SDK core modification or vendoring.

Canonical Friend artwork: Rare Friends via the SDK sprite API; see the installed SDK NOTICE.md. Object silhouettes and museum interface are project-authored CSS.

Start the canonical context at [CONTEXT_INDEX](docs/vibeathon/CONTEXT_INDEX.md). [STATUS](docs/vibeathon/STATUS.md) records progress; [ROADMAP](docs/vibeathon/ROADMAP.md) controls scope. GitHub Pages hosts the Phase 3B.1 playtest preview; G3 shipping and submission are not complete.
