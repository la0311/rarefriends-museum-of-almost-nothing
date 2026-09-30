# Museum of Almost Nothing

A first playable, session-only museum starring your selected canonical Rare Friend.

**Phase 3A: G0 passed; G1 automated validation passed. Owner playtest required before G2.**

## Run

Node >=22 and npm are required. From this repository:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173 in a browser with the eligible wallet extension. The normal SDK runtime handles connection, Friend selection and fresh ownership verification on Robinhood chain 4663 (hardwired Generations NFT, generation >=1). No live RF transaction or signing secret is needed. Real-wallet gameplay remains unverified.

This machine uses a local npm download because npm was absent from PATH: `node .tooling/package/bin/npm-cli.js run dev`. That ignored tooling folder is not needed on a machine with npm installed. Native Windows verification passed with esbuild/browser processes outside the filesystem sandbox; the upstream documented Windows route is Ubuntu/WSL2.

## First playable

Buy permit → Send expedition → settle → reveal actual owned object → Keep → Place on plinth 1 → Begin tour → Direct Friend to plinth 1 → Present → Opening Remarks.

Tab and Enter/Space or pointer/touch operate the same visible controls. The Friend changes position immediately; arrival never presents automatically. Runtime menus pause local gameplay. There is no audio. At narrow widths, scroll within the fixed 3:2 game frame to reach controls.

RF is simulated. Keep, placement and tours make no economic mutations. The SDK owns aggregate inventory. Full runtime reload resets the session; child reload re-reads retained ledger state but does not restore local arrangements.

Provisional G1 economics: 6 RF per permit; Pebble 40% / fixed 2 RF, Twig 35% / fixed 2 RF, Paperclip 15% / fixed 3 RF, Button 10% / fixed 4 RF. These are the configured redemption terms; G1 does not expose redemption. Bounded balance review belongs to G2.

## Checks

```sh
npm run typecheck
npm run check
npm run build
npm run test:game
```

Browser testing additionally needs `npx playwright install chromium --only-shell`. The test uses the normal SDK runtime with automated-only mock identity/RPC/artwork responses; no mock bypass is included in dev or public builds.

FriendSDK **0.1.4**, upstream commit **ca3bf183b809ecf22d87c63d88ce03969a3f8da2**, installed from the official release archive with lockfile integrity. Archive SHA-256: `72dfa8b8f2e0ccb4361a38f454a0c77e9340da8cf29313fc03d5049224523cac`. No SDK core modification or vendoring.

Canonical Friend artwork: Rare Friends via the SDK sprite API; see the installed SDK NOTICE.md. Object silhouettes and museum interface are project-authored CSS.

Start the canonical context at [CONTEXT_INDEX](docs/vibeathon/CONTEXT_INDEX.md). [STATUS](docs/vibeathon/STATUS.md) records progress; [ROADMAP](docs/vibeathon/ROADMAP.md) controls scope. No public preview or submission is claimed.
