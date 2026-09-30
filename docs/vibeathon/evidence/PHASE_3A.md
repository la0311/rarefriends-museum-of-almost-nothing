# Phase 3A verification

Environment: Node 24.19.0, local npm 10.9.2, native Windows PowerShell. SDK 0.1.4 official release package; tag commit and SHA-256 verified against GitHub release metadata. Package lock records dependency integrity. No SDK source changed.

Existing planning baseline fb1a6a7ddce82edff11d0e1421d9f9db0ba49835 was clean at start; reused instead of creating an empty checkpoint.

G0: typecheck, SDK checker/build, dev startup and SDK automated runtime smoke PASS. Screenshot g0.png. Initial checker failed due to esbuild ancestor-directory sandbox access; rerun outside filesystem sandbox passed. First browser attempt lacked the matching Chromium; installed matching headless shell and reran successfully.

G1 browser: `node tests/museum.mjs` PASS at 960px keyboard and 360px touch. Runtime sandbox and fresh fixture identity checks are performed by public testGame helper. Checks assert cancelled buy retains 20 RF; repeated synchronous buy triggers one confirmed purchase; play settles once; actual fixture Pebble is owned; Keep preserves authoritative ledger; one plinth; Begin Tour; destination change without Present; runtime pause blocks Present; explicit Present resolves Opening Remarks; no new economic mutations and no RF/inventory changes after Keep/curation/tour. No horizontal overflow. Screenshots captured from actual browser runtime; fixture identity is not real-wallet evidence.

Narrow viewport is scrollable inside fixed SDK 3:2 frame. Screenshot records the final scrolled position, not an entire-page mobile composition. No shipped mock route, wallet layer, live transaction, SDK core edit or deployment.

Owner playtest pending at http://127.0.0.1:4173. Stop before G2.

Final commands: npm run check — PASS; npm run build — PASS; npm run typecheck — PASS (invoked through node .tooling/package/bin/npm-cli.js). node tests/museum.mjs — PASS. git diff --check — PASS. Development runner remains active at http://127.0.0.1:4173.
