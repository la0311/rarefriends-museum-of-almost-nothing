# FriendSDK / Rare Friends Vibeathon baseline

Inspected on 2026-09-30. Analysis only: no game scaffold, game implementation, SDK source changes, contract deployment, or submission was made.

All SDK links below are pinned to commit `ca3bf183b809ecf22d87c63d88ce03969a3f8da2`; event links are pinned to `de18f6ab942f00b4310c227d583df80d05ca0f4a`. These distinguish the inspected baseline from future upstream changes.

## A. REPO_BASELINE

| Item | Verified baseline |
|---|---|
| SDK | `@rarefriends/friendsdk` **0.1.4** |
| Git | `main`, tag `v0.1.4`, commit `ca3bf183b809ecf22d87c63d88ce03969a3f8da2` |
| Commit | 2026-09-29 17:40:46 +02:00, “Release FriendSDK v0.1.4: trim preview transaction code” |
| Event repository | `de18f6ab942f00b4310c227d583df80d05ca0f4a`, 2026-09-20; its README still references SDK v0.1.2 |
| Required tooling | Node >=22, npm, Git; documented Windows route is Ubuntu under WSL2 |
| Package distribution | GitHub release `.tgz`; npm registry publication is not planned |
| Dependencies | viem 2.56.3, esbuild 0.28.2; development React/React DOM 19.2.8, TypeScript 6.0.3, Playwright 1.63.0 |

Evidence: [SDK package.json:1–9,170–193](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/package.json#L1-L9), [SDK commit](https://github.com/spokesz/friendsdk/commit/ca3bf183b809ecf22d87c63d88ce03969a3f8da2), [dependencies](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/package.json#L170-L193), [README:42–100](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/README.md#L42-L100), [distribution:299–333](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/README.md#L299-L333), [event README:11](https://github.com/spokesz/rarefriends-vibeathon/blob/de18f6ab942f00b4310c227d583df80d05ca0f4a/README.md#L11).

Read in full: AGENTS.md, README.md, API.md, HOST_INTEGRATION.md, WORLD_RULES.md and package.json. Also inspected the starter README/component/style/economy definition, scrolling-world and embedded references, runtime/identity/bridge/economy source, CLI/check/test scripts, CI, changelog and artwork notices. The starter has no nested AGENTS.md. Contract code was not changed.

The generic starter is **Garden Packs**: walk to a dispenser, buy a simulated pack, open it, then keep or redeem the reward. It includes keyboard/tap movement, inventory, mute, reduced motion and artwork retry. This is reference gameplay, not a required design. [Starter README:3–40](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/examples/starter/README.md#L3-L40)

Local execution results are recorded in the verification addendum below. Local tooling observations are measured results, not claims that the repository guarantees native Windows support.

## B. SDK_INVARIANTS

1. **Real identity even in simulation.** Builders and players need a connected wallet owning a hardwired Generations NFT, generation >=1, on Robinhood mainnet **4663**. No additional activation/tier/weight condition. Before play, the trusted runtime performs fresh `readGenerationEligibility`; art, a token ID, discovery results or an `owned` label are insufficient. Errors fail closed. [AGENTS:70–94](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/AGENTS.md#L70-L94), [identity.ts:17–34](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/identity.ts#L17-L34)
2. **Runtime owns wallet and selection.** Do not add wallet connection, NFT discovery, another ownership gate, Friend selector or checkout. Never scan/enumerate the whole collection. Existing identity context uses `ConnectedGameHost`. Providers and transaction clients stay outside game code. [AGENTS:35–68](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/AGENTS.md#L35-L68)
3. **Session invalidation is mandatory.** Account/network/Friend changes cancel confirmations, close stale bridges and reverify. Inventory/rewards belong to the selected NFT's canonical wallet. Mocks are automated fixtures only. Read-only connection/eligibility needs no private key or signing transaction. [HOST_INTEGRATION:225–252](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L225-L252)
4. **Preserve isolation.** One runtime frame; developer iframe is `sandbox="allow-scripts"`, without same-origin, popup, form or navigation powers. No parent-page UI access, signer, arbitrary calldata, deployment or withdrawal powers. Use the private SDK bridge and in-frame trusted confirmations; honor `paused`. [HOST_INTEGRATION:270–287](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L270-L287)
5. **Keep the supplied CSP.** Default deny; scripts/fonts local, local/blob/data images, local/blob media, connections limited to self and the Robinhood RPC; no child frames or form actions. Arbitrary remote APIs/assets are not automatically available. [scripts/dev-game.mjs:13–19](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/dev-game.mjs#L13-L19)
6. **Simulation is the authorized scope.** Label balances/results simulated. Do not add live adapters, contracts, deployment or funding. Preview connection and real ownership reads remain required. [AGENTS:96–116](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/AGENTS.md#L96-L116)
7. **Gameplay/accessibility.** Pause gameplay for runtime menus; stop movement on blur/hidden tabs. When movement exists, collision, reach, camera transforms and layering must agree. Provide loading/error/retry states, usable controls, mute for audio and reduced-motion alternatives. The event additionally calls for keyboard and touch. [WORLD_RULES:26–37](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/WORLD_RULES.md#L26-L37), [event README:13–17](https://github.com/spokesz/rarefriends-vibeathon/blob/de18f6ab942f00b4310c227d583df80d05ca0f4a/README.md#L13-L17)

## C. AVAILABLE_CAPABILITIES

**Smallest required integration:** for the requested `games/<project-name>` route, supply default-exported `index.tsx`, `game.json`, README and local assets/styles. The runner supplies `GameHost`, `GameSession`, child document, bridge, bundling and serving. Props are `friendId: bigint`, `client: GameClient`, `paused: boolean`. Call `client.read()` at startup, including for non-economic games. Nothing reviewed requires a new backend, wallet layer or SDK-core change for a prototype using these capabilities. [API:7–84](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/API.md#L7-L84), [HOST_INTEGRATION:197–206](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L197-L206)

| Fixed action | Purpose |
|---|---|
| `read()` | Snapshot: balance, inventory, consumables, plays, backing/liabilities |
| `canBuy(quantity)` | Purchase-backing feasibility; preview implementation does **not** also test the player's RF balance |
| `buy(quantity)` | Charge simulated RF and reserve backing for consumables |
| `play(quantity = 1n)` | Consume items and create pending play IDs |
| `settle(playId)` | Resolve a pending play once, adding its reward |
| `redeem(outcomeId, quantity)` | Exchange held rewards for their fixed simulated RF value |

Action quantities across the bridge are 1–99. Buy/play/redeem receive runtime confirmations; live settlement also would, but is outside scope. Friend/play IDs and quantities are bigint; outcome IDs are numbers. [src/game.ts:7–23,102–166](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L7-L23), [preview implementation](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L102-L166), [API:258–284,353–358](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/API.md#L258-L284), [bridge rules](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/API.md#L353-L358)

**Simulated economy:** one consumable, one fixed weighted outcome table; 10,000 basis points total; `1 RF = 10n ** 18n`, encoded as decimal strings in JSON. Purchased and pending consumables reserve their maximum prize; kept rewards retain separate liabilities and no redemption expiry. Purchases require sufficient backing; settlement cannot reroll. The low-level ledger's funding/withdrawal controls are separate from the game client. These reserve rules apply to the supplied chance economy/RF redemption promises, not automatically to non-redeemable cosmetics. [API:258–284](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/API.md#L258-L284), [game.ts:92–177](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L92-L177)

The runtime starts each preview ledger with **20 RF** and **10 × maximum prize** stake. Thus the starter starts with 30 RF backing; its 1 RF pack yields 0.5 RF at 60%, 1 RF at 30%, or 3 RF at 10% (expected reward 0.9 RF). These are existing reference terms, not a decision for our game. [game-host.tsx:191–196](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game-host.tsx#L191-L196), [starter game.json:1–10](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/examples/starter/game.json#L1-L10)

**Optional tools:** world renderer, collision/navigation/movement, sprites/art loading, HUD/menus/inventory UI, sound kit, reward reveal with skip/reduced motion. Custom renderers and larger worlds are supported through the same runtime. The scrolling example demonstrates a 2400 × 1600 world without economy actions. These do not mandate a walking game, a renderer choice or additional architecture. [API module table:86–110](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/API.md#L86-L110), [scrolling-world README](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/examples/scrolling-world/README.md)

## D. KNOWN_LIMITATIONS

- **No durable saves:** opaque sandbox has no localStorage/IndexedDB; no save bridge. Full runtime reload resets simulation. Child-only reload can preserve the host ledger, as the starter recovery test demonstrates. [HOST_INTEGRATION:274–279](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L274-L279), [starter browser test:108–116](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/check-starter-browser.mjs#L108-L116)
- **No supplied APIs** for upgrades, additional currencies, multiple consumable tiers, arbitrary pack/NFT minting, player trading/listing/bidding/swaps, creator fees or wearable NFTs. Such ideas are permitted but require separately scoped integration. [capability matrix:299–317](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L299-L317)
- **Non-economic games still need the chance schema:** positive price, 10,000 total weight and at least one positive prize. Unused fields must be documented as schema-only, not advertised mechanics. [HOST_INTEGRATION:197–206](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L197-L206)
- **Mobile wallet access is limited:** EIP-6963/injected EIP-1193 supported; no WalletConnect/native-wallet deep links supplied. Discovery depends on complete filtered RPC history and has no collection-scan fallback. [capability matrix:300–302](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L300-L302)
- **Small-screen constraints:** default 3:2 viewport is about 360 × 240 on a 360px-wide screen. Runtime controls occupy lower corners. Actual phone readability and touch targets need review. SDK supports `host.css` resizing, but event rules conflict; see G. [HOST_INTEGRATION:208–223,274–279](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L208-L223)
- **Future live features are not readiness guarantees:** existing live transport has Dice delivery dependencies; planned RNG subsidy, refunds and unattended settlement are not implemented. None is needed for our simulated prototype. [capability matrix:310–314](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L310-L314)

## E. DEVELOPMENT_COMMANDS

Run from the SDK checkout with Node >=22 and npm. The documented Windows environment is Ubuntu/WSL2. Commands below are reference instructions; **no `init`/scaffolding command was executed**.

```sh
npm ci
npm run dev:game -- examples/starter  # normally http://localhost:4173

npm run build
npm run typecheck
npm test
npm run check:games
npx playwright install chromium      # Linux: --with-deps if needed
npm run check:starter
npm run check:runtime
npm run check:browser

# Once a game exists, in a later task:
npx friendsdk check games/<project-name>
npx friendsdk test games/<project-name> --screenshot artifacts/game.png
npx friendsdk test games/<project-name> --width 360
npx friendsdk build games/<project-name>
npm run dev:game -- games/<project-name>
```

`npm test` rebuilds before Node tests. `check:browser` runs fishing, embedded, runtime, starter, session and mocked-live fixtures. Foundry is optional for SDK-only work; missing local contract tooling produces an integration-test skip. Contract build/deploy/play commands exist but are outside this task. [package.json:147–168](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/package.json#L147-L168), [README:383–401](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/README.md#L383-L401), [CLI guide:65–81](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L65-L81)

## F. TEST_AND_PREVIEW_PIPELINE

1. **Static/build checks:** typecheck, game validation and relevant unit tests. CLI validator requires README, valid economy and permitted imports; rejects host transport and unrelated outside sources. [scripts/check-games.mjs:10–48](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/check-games.mjs#L10-L48)
2. **Automated browser tests:** `friendsdk test` uses the real runtime with mocked wallet/RPC/sprites; detects startup/browser errors and validates sandbox boundaries. Use its `check` callback for the actual full game loop. Test desktop and 360px touch, runtime pause, retry and accessibility controls. Generic smoke success is not gameplay coverage. [API:161–190](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/API.md#L161-L190)
3. **Identity/lifecycle cases:** disconnected, wrong chain, non-owner, generation zero and failed reads cannot play; identity changes cancel pending actions. Mock tests cannot validate live RPC or ownership. A real eligible-wallet playtest remains necessary before delivering a playable prototype. [HOST_INTEGRATION checks](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L337-L364), [README:351–354](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/README.md#L351-L354)
4. **Preview:** build without `--deployment`; output is `.friendsdk/`. Publish its entire contents to HTTPS static hosting, preserving paths, MIME types and child CSP. No backend/custom CORS headers required. GitHub Pages is allowed; keep `.nojekyll` with its branch-based route. No deployment is performed in this analysis. [HOST_INTEGRATION:254–268](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L254-L268), [README:262–285](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/README.md#L262-L285)
5. **Submission:** PR adding `submissions/<project>/README.md`; include project/builder/contact/category, one-sentence Rare Friends connection, source/assets/setup/run instructions, SDK version, public playable URL, wallet/network requirements, controls/rules, applicable costs/probabilities/rewards/consumables, asset credits, checks and known issues. Include these in both submission README and PR description. Public preview permission is distinct from official Rare Friends publication review. [event README:25–38](https://github.com/spokesz/rarefriends-vibeathon/blob/de18f6ab942f00b4310c227d583df80d05ca0f4a/README.md#L25-L38)

## G. RISKS_FOR_THE_VIBEATHON

| Risk | Consequence / bounded response |
|---|---|
| **Rule conflict** | Event guide says v0.1.2, original character artwork and 960 × 640. SDK v0.1.4 explicitly permits changed artwork and flexible layouts. Do not assume SDK flexibility overrides event judging. Conservative interim choice: preserve canonical art and reference frame; ask organizers before departing. |
| **Deadline uncertainty** | Due September 30, 2026, which is today's inspection date; cutoff time/timezone still TBA. Confirm with organizers immediately. |
| **Judge access** | Public URL still requires an eligible NFT and supported wallet. Verify the real flow and prominently document requirements; do not ship a mock-identity bypass. |
| **Scope expansion** | Persistent progression, many currencies, upgrades and trading exceed supplied APIs. Favor a complete session-based core interaction unless later explicitly scoped. |
| **Phone usability** | Small frame plus missing WalletConnect/deep links can impair judging on phones; choose and test a supported wallet/browser/device combination. |
| **Tooling portability** | Upstream documents native Windows as unverified and CI uses Ubuntu. Local success does not establish supported Windows portability; preserve exact failures. |
| **Judging ambiguity** | How simulated entries count toward Token Activity, remaining payouts and NFT valuations are TBA. Avoid treating live spending as necessary to compete. |

Evidence: [event rules:11–17](https://github.com/spokesz/rarefriends-vibeathon/blob/de18f6ab942f00b4310c227d583df80d05ca0f4a/README.md#L11-L17), [SDK art/layout rules:3–14,39–46](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/WORLD_RULES.md#L3-L46), [deadline:27](https://github.com/spokesz/rarefriends-vibeathon/blob/de18f6ab942f00b4310c227d583df80d05ca0f4a/README.md#L27), [capabilities](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L299-L317), [Windows instructions](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/README.md#L82-L100), [CI](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/.github/workflows/check.yml), [judging unknowns:44–50](https://github.com/spokesz/rarefriends-vibeathon/blob/de18f6ab942f00b4310c227d583df80d05ca0f4a/README.md#L44-L50).

## H. QUESTIONS THAT REQUIRE PRODUCT DECISIONS

These decisions can wait until the next phase; no implementation has started.

1. What is the single complete interaction and intended session length? The event explicitly says one working core interaction is enough. [Event README:5](https://github.com/spokesz/rarefriends-vibeathon/blob/de18f6ab942f00b4310c227d583df80d05ca0f4a/README.md#L5)
2. Which category is primary: Character Spotlight, Token Activity or Economy Potential? What project name and builder/contact should appear in the eventual submission? [Event README:31,44–50](https://github.com/spokesz/rarefriends-vibeathon/blob/de18f6ab942f00b4310c227d583df80d05ca0f4a/README.md#L31-L50)
3. Will the core loop use the supplied simulated chance economy, or no economy actions? If used, decide exact costs, outcomes, probabilities and rewards; otherwise document schema-only terms. [HOST_INTEGRATION:197–206](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L197-L206)
4. Can progress reset on full reload? If persistence is essential, it is a capability gap to scope before implementation. [HOST_INTEGRATION:274–279](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L274-L279)
5. Which desktop/mobile wallet-browser combinations must be supported, and who can perform the real eligible-wallet playtest? No private key is needed or requested. [README:42–52](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/README.md#L42-L52)
6. Keep canonical art and the reference frame for this entry, or seek organizer clarification before customizing them? This is an unresolved event-rule conflict, not an SDK technical restriction. [Event:13–15](https://github.com/spokesz/rarefriends-vibeathon/blob/de18f6ab942f00b4310c227d583df80d05ca0f4a/README.md#L13-L15), [SDK WORLD_RULES](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/WORLD_RULES.md#L3-L46)
7. Which source repository and static hosting destination should the later public preview use? Also obtain the exact cutoff and simulated Token Activity judging guidance from organizers. [Event:27–38,50](https://github.com/spokesz/rarefriends-vibeathon/blob/de18f6ab942f00b4310c227d583df80d05ca0f4a/README.md#L27-L50)

## Verification addendum

**Result: the unchanged starter runs locally and its relevant browser checks pass; the overall native-Windows unit suite is not green. Real-wallet gameplay was not verified.**

Environment measured here: native Windows PowerShell, Git 2.53.0.windows.2, Node 24.19.0. npm was initially absent from PATH; npm 10.9.2 was downloaded into `work/tooling/` rather than installed globally. WSL listed only `docker-desktop`, not Ubuntu. The checkout is `work/friendsdk` under this task workspace. Dependencies, npm cache and Chromium were installed locally; tracked SDK files and package-lock remained unchanged (`git status --porcelain` empty after checks).

| Check actually run | Result |
|---|---|
| `npm ci --ignore-scripts --no-audit --no-fund` | PASS, 24 locked packages installed; lifecycle scripts disabled, consistent with upstream CI's installation approach |
| `npm run build` | PASS on retry outside the filesystem sandbox; first sandboxed attempt failed on esbuild ancestor-directory access |
| `npm run typecheck` | PASS |
| `node scripts/check-games.mjs` (`check:games` script body) | PASS: fishing, scrolling-world and starter |
| `node --test tests/*.test.mjs` after successful build (`npm test` test phase) | **118 total: 111 passed, 5 failed, 2 skipped** |
| `node scripts/check-starter-browser.mjs` (`check:starter` script body) | PASS at 1100px and 360px: movement/touch, buy/open/keep/redeem, recovery, mute/reduced motion, bounds; artwork failure/retry also passed |
| `node scripts/check-runtime-browser.mjs` (`check:runtime` script body) | PASS at 1100px and 360px: connection/discovery/fresh gate, sandbox, simulated purchase, account/network/disconnect cancellation; unowned/unhardwired/changed-owner/RPC-error rejection |
| `node scripts/dev-game.mjs dev examples/starter` after build | PASS: served `http://127.0.0.1:4173`; equivalent runner stage of `npm run dev:game -- examples/starter` |
| Ordinary browser inspection | Expected “No browser wallet found” identity gate; gameplay unavailable; no captured browser warning/error logs |
| Full `check:browser`, contract/Foundry checks, public hosting | Not run |
| Real wallet, real ownership/RPC and actual phone-wallet play | Not verified; requires an available eligible wallet/browser |

The five unit failures are preserved without modifying SDK core:

1. Validator fixture: Windows `EPERM` creating a directory symlink. [tests/check-games.test.mjs:11–19](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/tests/check-games.test.mjs#L11-L19)
2. Manifest permission test: expected POSIX `0600`, observed `0666`. [tests/contracts-cli.test.mjs:210–215](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/tests/contracts-cli.test.mjs#L210-L215)
3. Browser bundle test: URL `.pathname` produced unresolved `/C:/.../src/friend-world.ts`. [tests/friend-world.test.mjs:244](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/tests/friend-world.test.mjs#L244)
4. Custom-art validation actually returned a valid build, but its assertion expected slash-separated `games/custom-art` instead of Windows backslashes. [tests/game-assets.test.mjs](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/tests/game-assets.test.mjs)
5. Watch-rebuild test did not observe a new hashed asset within its polling window. Root cause is **unresolved**; do not claim this is only a path issue or that hot asset rebuilding is verified. [tests/runner.test.mjs:95–119](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/tests/runner.test.mjs#L95-L119)

Two Anvil integration tests skipped because the required Foundry/Anvil/artifacts were unavailable. No live contracts or real transactions were used. These results support starting bounded game work once product choices are made, but not claiming a fully passing SDK baseline or submission readiness. Before delivery, rerun relevant checks in the documented Ubuntu/WSL2 environment and complete the eligible-wallet playtest.

Evidence artifacts: [complete run log](BASELINE_RUN_LOG.txt), [ordinary starter wallet-gate screenshot](starter-wallet-gate.png). The local preview server was stopped after verification.
