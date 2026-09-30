> Historical evidence, preserved on 2026-09-30 from the completed Phase 1B assistant output in Codex thread 01a0f07b-12c9-7700-8b79-14d4709b8628. No standalone source file existed. The recorded output below is reproduced verbatim; historical paths and superseded choices remain evidence, not current instructions. See ../CONTEXT_INDEX.md and SOURCE_PROVENANCE.md.

---

The pinned checkout is still **FriendSDK v0.1.4 at `ca3bf183b809ecf22d87c63d88ce03969a3f8da2`**, with a clean working tree. I read the baseline and the Phase 1A concepts, inspected source and fixtures, and performed read-only analysis of the two recorded sprite samples. No builds, tests, file changes, or network artwork reads were performed in this phase.

The main findings are:

- **Museum:** existing inventory quantities can support curation and redemption directly.
- **Three Moves:** the tactical game fits the runtime, but SDK rewards cannot represent tactical performance. Their retention value would be a separate collection experience.
- **Shadow Locksmith:** canonical pixel masks are accessible. Robust, interesting puzzles across eligible Friends are **not established** by the repository.

All repository citations below refer to the pinned commit. Proposed game behavior is distinguished from existing SDK behavior.

## Shared evidence and integration boundary

These mappings apply to all three concepts.

| Requirement | Smallest supported integration and evidence |
|---|---|
| Runtime | Default-export a component accepting `friendId`, `client`, `paused`. The CLI supplies `GameHost`, `GameSession`, and the child document. No additional host or wallet implementation is needed. [game-session.tsx:7–12](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game-session.tsx#L7-L12), [dev-game.mjs:138–158](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/dev-game.mjs#L138-L158) |
| Initial state | Call `client.read()` to initialize the runtime. Snapshot includes RF balance, consumables, inventory quantities, plays, stake, reserves, and liabilities. [HOST_INTEGRATION.md:197–206](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L197-L206), [game.ts:5–23](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L5-L23) |
| Economy | `buy(quantity)` acquires consumables; `play(quantity)` consumes them and creates pending plays; `settle(playId)` determines an outcome and adds inventory; `redeem(outcomeId, quantity)` removes inventory and returns fixed RF. There are no score, puzzle-result, equipment, or crafting arguments. [game.ts:117–154](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L117-L154) |
| Confirmations | Buy, play, and redeem require runtime confirmation. Preview settlement does not. The bridge permits quantities 1–99 and serializes requests. Local gameplay must also respect `paused`. [frame-bridge.ts:3–13,58–87](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/frame-bridge.ts#L58-L87) |
| Character art | `@rarefriends/friendsdk/sprites`: `createFriendReader().read(friendId)` and `spriteFrame(...)`. This is a public, read-only artwork path—not a wallet or ownership implementation. [friend-sprites.ts:1–11](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/friend-sprites.ts#L1-L11) |
| Minimal UI | `GameMenu` for contained dialogs; `/ui` offers `formatGameAmount`, `ItemArt`, and `ItemPicker`. `ItemPicker` supports at most six visible choices; that is a component limit, not an economy-schema limit. [game-frame.tsx:28–48](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game-frame.tsx#L28-L48), [experience-ui.tsx:17–63](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/experience-ui.tsx#L17-L63) |
| Optional feedback | `/reveal` presents an already-selected item; it cannot award inventory. It supports skip and reduced motion. `/sounds` supplies playback, mute, stop, and disposal. Neither is essential to the game rules. [reward-reveal.tsx:8–24,42–50](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/reward-reveal.tsx#L8-L50), [friend-sounds.ts:99–115](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/friend-sounds.ts#L99-L115) |

Two important consequences follow:

1. **Keep is not an API call.** It means leaving an existing reward quantity in inventory.
2. **Gameplay resolution and SDK settlement are separate.** In preview, the random draw happens inside `settle`; neither winning nor delaying settlement improves the fixed odds. [game.ts:135–154](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L135-L154)

For all proposed state machines, cancelled confirmation returns to the preceding state. Errors trigger a fresh read before another economy action. A pending play is recovered by its existing ID; an already-settled result is read rather than settled again.

A full runtime reload resets everything. A child-only reload can preserve the host ledger while losing local gameplay. The existing starter explicitly tests this distinction. Recovery cannot reconstruct an unrecorded puzzle victory or tour result. [game-host.tsx:130–135,191–198](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game-host.tsx#L130-L135), [check-starter-browser.mjs:93–103](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/check-starter-browser.mjs#L93-L103)

---

## 1. Museum of Almost Nothing

### A. Exact game loop

**Proposed playable round:**

`ENTRY / read inventory`
→ `BUY expedition permit if needed`
→ `PLAY one permit`
→ `SETTLE expedition find`
→ `KEEP for curation or REDEEM`
→ `ARRANGE owned objects`
→ `GUIDE Friend through exhibition`
→ `RESOLVE local tour brief`
→ `NEXT ROUND or final exhibition`

**The settlement placement matters:** the find must exist before the player can curate it. Museum therefore settles **before its main curation interaction**, not as a reward for completing that interaction.

A complete first round could be:

1. Buy and use one permit through the runtime.
2. Settle its play and receive one object.
3. Keep it.
4. Place it on a plinth.
5. Move the Friend to that plinth and present it.
6. Complete a simple introductory brief.
7. Start another expedition or revisit the exhibition.

Later rounds can ask for “a matching pair followed by a different object.” Selecting the tour order makes the Friend’s movement consequential.

**State separation:**

- **Local gameplay:** placement, tour order, Friend location, brief completion.
- **SDK inventory:** quantities of each configured outcome, permits, pending/settled plays.
- **Simulated RF:** purchase cost and redemption proceeds only.
- Completing a tour produces no SDK item, RF, or other spendable resource.

### B. FriendSDK mapping

| Concept action | Actual mapping |
|---|---|
| Enter museum | Shared runtime integration; `client.read()` |
| Fund an expedition | `buy(1n)` |
| Dispatch expedition | `play(1n)` |
| Discover object | `settle(playId)`, then `read()` |
| Keep object | No mutation |
| Display object | Local placement referencing an outcome ID and available quantity |
| Redeem object | `redeem(outcomeId, 1n)`, then reconcile displayed quantities |
| Select exhibits | Optional `ItemPicker` and `ItemArt` |
| Present curator | `/sprites` reader and canonical frames |
| Reveal find | Optional `RewardReveal`, after settlement |

The inventory is an array of counts aligned with the outcome table. Settlement increments `inventory[outcomeId - 1]`; redemption decrements that same entry. It contains **no unique object-instance IDs or placement data**. [game.ts:8–11,135–154](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L135-L154)

Local exhibit descriptions and artwork can be display metadata. `GameItem` explicitly describes display data, not an independently managed inventory. [items.ts:1–13](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/items.ts#L1-L13)

**World/movement modules:** unnecessary for three plinths and a small set of fixed walking destinations. Using the optional world renderer would introduce scenery/navigation concerns without solving the curation problem.

### C. Required game state

| State | Classification |
|---|---|
| Selected Friend, client, runtime pause flag | SDK-provided state/context |
| RF balance, permits, inventory counts, plays, backing | SDK state; snapshot is a read model |
| Active play ID | SDK state referenced by the local round |
| Loading, error, busy, current dialog, round phase | Local ephemeral gameplay/UI state |
| Plinth assignments by outcome ID | Local ephemeral gameplay state |
| Friend’s current plinth/path step; chosen tour order | Local ephemeral gameplay state |
| Current brief, completed tours, session round | Local ephemeral gameplay state |
| Artwork load/cache and mute/reduced-motion preferences | Local ephemeral presentation state |
| Undisplayed available counts; visible exhibits | Derived presentation state |
| Brief satisfaction and displayed RF redemption values | Derived presentation state |

Placement must satisfy:

**Displayed quantity of an outcome ≤ its current SDK inventory quantity.**

Redeeming the last copy removes that outcome from its display position. Where duplicates exist, the game reconciles counts; it cannot identify a particular specimen as the redeemed one.

**Full reload:** mechanically safe because both exhibition and simulated collection reset. The experience must explicitly promise a session exhibition, not a permanent museum.

### D. Visual implementation

The frame would contain:

- A central room with three large plinths and the canonical Friend.
- A compact top strip showing simulated RF, permits, and the current tour brief.
- An inventory tray or contained inventory dialog.
- Large “place,” “remove,” and “present” actions; no drag-only interaction.
- A tour result such as “Matching pair presented first,” clearly separate from RF.
- A post-settlement card showing the actual object, owned count, fixed value, and **Keep / Redeem**.

The lower corners remain clear for runtime controls. On smaller displays, inventory should become a contained panel rather than squeezing all cards beside the museum. The SDK documents those overlays and the default 360 × 240 effective frame. [HOST_INTEGRATION.md:274–279](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L274-L279)

### E. Friend identity depth

**Level 2: gameplay position/animation matters.**

The Friend determines the order in which exhibits are presented. Its selected artwork provides visual identity, but different Friend artwork does not change curation rules.

**Product risk:** if “tour” becomes an automatic decorative animation after an inventory puzzle, identity drops toward level 1. Player-directed presentation order must remain meaningful to retain level 2.

### F. Economy coherence

The causal loop is supported:

`Want another exhibit`
→ `RF buys permit`
→ `settlement supplies an inventory outcome`
→ `keep it for exhibition combinations or redeem it`
→ `owned assortment and spendable RF change subsequent choices`

This can use **current snapshot counts directly**. No crafting, equipment, minting, or inventory-extension API is required.

Three qualifications matter:

- A brief demanding an unavailable rare item can become a luck gate. Early briefs should be satisfiable using available inventory; the game must tolerate duplicates.
- Retention is meaningful only if different arrangements or collections matter to the session. Merely displaying every result is not automatically a decision.
- Redemption increases player RF but **does not increase free stake**: stake and reward liability fall by the same amount. It does not guarantee that another purchase passes backing checks. This follows from the ledger arithmetic. [game.ts:101–107,146–154](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L101-L107)

The default runtime grants 20 simulated RF. Whether redemption becomes consequential within 3–8 minutes depends on eventual prices and pacing; it cannot be assumed from the starter’s terms. [game-host.tsx:191–195](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game-host.tsx#L191-L195)

### G. Core interaction testability

A future test could:

1. Enter through the mock runtime; buy and use one permit.
2. Settle the predictable fixture outcome.
3. Assert exactly one new inventory unit.
4. Keep, select the item, assign a plinth, and guide the Friend there.
5. Assert the expected tour result with no additional RF change.
6. Redeem that object; assert inventory decrement, correct RF increase, and removal from display.

**Keyboard:** focus inventory choice, select plinth, move/present using discrete controls.

**Touch:** tap item, tap plinth, tap tour destination; no precision dragging required.

**Pause:** while the runtime wallet dialog is open, placement, presentation, and tour advancement must stop.

**Reduced motion:** Friend movement may snap between destinations; presentation order and results must remain identical.

**Expected screenshots:** first exhibit, a multi-object arrangement, keep/redeem card, and post-redemption empty plinth.

Also test repeated identical outcomes, insufficient quantity for duplicate placements, and a brief with no currently satisfiable advanced combination.

### H. Implementation surface

**MEDIUM:** the principal work is inventory reconciliation and making curation a game rather than a menu.

Probable files under `games/museum-of-almost-nothing/`, not created:

- `index.tsx` — round flow, SDK actions, museum and dialogs.
- `game.json` — permit and outcome definition.
- `curation.ts` — placement counts, tour evaluation, reconciliation.
- `content.ts` — object display metadata and briefs.
- `style.css`, `README.md`.
- A focused game test file.

These do not require separate subsystems or a general movement engine.

### I. Concept-specific failure modes

**Technical evidence**

- Treating aggregate inventory as unique specimens would exceed the actual model.
- Redeeming without reconciling displays produces exhibits the player no longer owns.
- More than six items requires a different presentation than the unmodified `ItemPicker`.
- Child reload loses exhibit placement even if inventory survives.

**Product judgment**

- Placement may have an obvious answer and little replay value.
- Random duplicates may prevent satisfying collection goals.
- The Friend may feel like an ornamental guide.
- Cheap permits may make redemption irrelevant within the target session.
- Too many item cards can obscure the museum itself.

### J. Critical unknowns resolved

**RESOLVED**

- Existing inventory supports owned exhibit quantities.
- Keep/redeem can change both display availability and spending capacity.
- No persistence or new economy actions are necessary.
- Unique specimen histories are not supported or required.

**UNRESOLVED**

- Whether briefs create interesting choices with a small outcome catalog.
- Whether directing the Friend adds agency.
- Whether collection attachment develops before the session ends.
- Which prices make retention versus redemption consequential without encouraging repetitive purchasing.

---

## 2. Three Moves to Midnight

### A. Exact game loop

**Proposed bounded round:**

`ENTRY / read`
→ `BUY assignment if needed`
→ `PLAY one assignment`
→ `PLAN three commands`
→ `EXECUTE commands against telegraphed hazards`
→ `PLAN/EXECUTE another batch if still active`
→ `RESOLVE success, collision, command limit, or abandonment`
→ `SETTLE existing play`
→ `KEEP/REDEEM dispatch stamp`
→ `NEXT ROUND`

A round can use a small fixed command limit, such as two three-command batches. That is a proposed gameplay rule, not an SDK restriction.

- Moving, waiting, hazards, and winning are entirely local.
- SDK settlement occurs after either success or failure.
- Abandonment must not strand the pending play.
- Success can advance the local board sequence; failure can repeat a board.
- Neither changes reward odds or RF values.

If the child reloads mid-board, the pending SDK play remains recoverable but the lost tactical result cannot be reconstructed. Recovery should settle it as an interrupted attempt without fabricating a completion.

### B. FriendSDK mapping

| Concept action | Actual mapping |
|---|---|
| Load session | Shared runtime + `read()` |
| Purchase assignment | `buy(1n)` |
| Begin board | `play(1n)` |
| Queue/execute moves | Local rules; no SDK action |
| Resolve board | Local rules; no SDK action |
| Obtain dispatch stamp | `settle(existingPlayId)` |
| Retain/redeem stamp | Leave inventory unchanged or `redeem(outcomeId, quantity)` |

The fixed client has no “submit solution,” “award victory,” or “advance level” operation. The local game owns those rules. [game.ts:14–23](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L14-L23)

Use `/sprites` for the selected character and `/frame` for contained dialogs. `formatGameAmount` is sufficient for the RF readout. A simple inventory list may be smaller than adopting the whole `ExperiencePanel`.

**World/movement modules:** not useful for a discrete tactical grid. Continuous world navigation would not supply command queues, hazard phases, collision order, or board rules.

**Optional sound/reveal:** short action cues and a settled stamp reveal; neither controls game resolution.

### C. Required game state

| State | Classification |
|---|---|
| Friend ID, client, pause flag; assignment counts, inventory, RF, plays | SDK state/context |
| Active play ID | SDK state referenced by the round |
| Current board index and completed-board record | Local ephemeral gameplay state |
| Friend grid cell and facing | Local ephemeral gameplay state |
| Three-command queue and execution cursor | Local ephemeral gameplay state |
| Hazard phase, commands used, attempt status | Local ephemeral gameplay state |
| Busy/error/dialog/art-loading/settings state | Local ephemeral state |
| Optional display slots for retained stamps | Local ephemeral presentation choices |
| Legal cells, hazard telegraphs, route preview | Derived presentation state |
| Sprite frame, displayed stamp counts, RF text | Derived presentation state |

Board definitions are authored content, not SDK state. A local record that a board was solved is not an owned collectible.

**Full reload:** returns to the initial board and fresh preview ledger. No mechanical dependency on saved progress exists.

### D. Visual implementation

- A clearly bounded grid occupies most of the frame.
- The Friend is the moving piece, with distinct start, exit, blocked, and threatened cells.
- A side or bottom strip holds exactly three command slots.
- Large directional and Wait buttons accompany keyboard commands.
- A compact RF/assignment display stays separate from the board.
- Success/failure feedback explains the decisive step.
- A subsequent stamp panel distinguishes **“Board completed/failed”** from **“Random dispatch stamp.”**

A real-time countdown is unnecessary for the minimum concept. “Midnight” can describe hazard turns, preserving deliberate decisions and touch viability.

### E. Friend identity depth

**Level 2: gameplay position/animation matters.**

The selected Friend is the tactical unit. Different sprites do not change movement, collision bounds, or hazard rules.

This establishes material participation, but **not mechanically unique gameplay per NFT**. Replacing the selected artwork would change the protagonist, not the puzzle solution.

### F. Economy coherence

The beginning is natural:

`Want another courier assignment`
→ `RF purchases admission`
→ `attempt concludes`
→ `SDK dispatch stamp appears`

The retention step is weaker.

A technically valid option is a **session dispatch album** showing currently owned stamp types. Keeping fills the album; redeeming removes an available stamp and restores RF. A local “complete a varied album” objective supplies experiential value without power or a new currency.

However:

- The album does not affect tactical decisions.
- Stamps cannot truthfully signify successful missions, because failed attempts receive the same outcome distribution.
- Giving stamps keys, equipment effects, improved odds, or bonus RF would exceed this bounded model.
- Associating each retained copy with a specific solved mission is not represented by SDK inventory; that history would be local and disappear on child reload.

**Assessment:** admission fits; retention can support a side collection. Repository evidence does **not** establish a natural connection between retained stamps and the core tactical puzzle. That separation must be a deliberate product choice.

### G. Core interaction testability

Use a fixed authored board with a known successful command sequence.

**Meaningful assertions:**

- Buying reduces RF once and adds one assignment.
- Starting consumes one assignment and creates one play.
- Queued commands do not move the Friend before Execute.
- Each step applies the documented movement/hazard order.
- Success and failure are deterministic for known command sequences.
- Settlement adds exactly one reward regardless of tactical result.
- Keep does not mutate inventory; redemption changes it and RF correctly.
- Rapid repeated Execute clicks cannot advance two batches.
- A cancelled purchase/use confirmation does not begin gameplay.

**Keyboard:** arrows/Wait to compose; explicit Execute; allow editing before execution.

**Touch:** tap equivalent command buttons and Execute.

**Pause:** no commands accepted or logical execution steps advanced during runtime menus; resume without skipping steps.

**Reduced motion:** use discrete cell changes with step feedback; preserve hazard timing in logical turns.

**Expected screenshots:** planned route, decisive failure cell, successful exit, and clearly separate stamp result.

### H. Implementation surface

**MEDIUM:** SDK integration is small; deterministic rules, content, and understandable telegraphs account for most work.

Probable files under `games/three-moves-to-midnight/`:

- `index.tsx` — session flow, input, board display, SDK actions.
- `rules.ts` — command execution and terminal conditions.
- `boards.ts` — compact authored board definitions.
- `game.json`, `style.css`, `README.md`.
- Focused rule and round tests.

No camera, physics engine, pathfinder, or world renderer is required.

### I. Concept-specific failure modes

**Technical evidence**

- There is no SDK board engine or verified performance submission.
- Local attempt state disappears independently of a surviving host ledger.
- Reward provenance cannot be treated as a durable per-mission record.

**Product judgment**

- Ambiguous movement-versus-hazard ordering makes losses feel unfair.
- Too few boards turn the session into memorization; too many increase content burden.
- Confirmation dialogs may feel heavy relative to a short puzzle.
- Rewards may feel unrelated to success.
- The Friend may function as an interchangeable board piece unless presentation creates attachment.

### J. Critical unknowns resolved

**RESOLVED**

- A discrete tactical game can use the ordinary runtime and fixed action client.
- No continuous world tooling, persistence, or wallet extension is needed.
- Logical rules are amenable to deterministic testing.
- SDK settlement cannot encode tactical performance.

**UNRESOLVED**

- Whether three-command planning is understandable in the first minute.
- Whether a small board set supports the target session.
- Whether independent dispatch stamps feel worthwhile.
- Whether paid admission and repeated failures feel appropriate for the intended tone.

---

## 3. Shadow Locksmith

### A. Exact game loop

**Conditional loop, requiring a usable mask and valid puzzle target:**

`ENTRY / read + load selected Friend artwork`
→ `VALIDATE usable canonical pose and target`
→ `BUY lamp cell if needed`
→ `PLAY one lamp cell`
→ `MOVE among marked positions / choose lamp setting`
→ `COMPARE projected mask against target`
→ `RESOLVE match or voluntary abandonment`
→ `SETTLE existing play`
→ `KEEP/REDEEM locksmith seal`
→ `NEXT CHAMBER`

Artwork and target validation should precede consuming a cell. An unusable mask must not lead to paying for an impossible chamber.

The smallest defensible version is a **2D pixel-mask projection puzzle** with discrete positions/settings. The SDK supplies no 3D body geometry, physical lighting model, or shadow solver.

The canonical Friend remains unchanged. A separate projected-mask effect supplies the puzzle. Whether that effect meets the organizer’s artwork-preservation interpretation remains distinct from technical feasibility.

### B. FriendSDK mapping

| Concept action | Actual mapping |
|---|---|
| Enter and establish identity | Shared runtime; `client.read()` |
| Load canonical pixels | `createFriendReader().read(friendId)` |
| Select a supported pose | `spriteFrame(sprites, facing, walking, frame, fallback)` |
| Obtain mask | Returned `frame.bitmap` or `frame.rows` |
| Project/match target | Entirely local game logic |
| Purchase/start chamber | `buy(1n)`, then `play(1n)` |
| Obtain seal | `settle(playId)` |
| Keep/redeem | No mutation or `redeem(outcomeId, quantity)` |

The exact sprite structures and decoding are supplied by the SDK. Projection, mask comparison, target generation, ambiguity checks, and difficulty rules are **not**. [generation-sprites.ts:32–44,62–110](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/generation-sprites.ts#L32-L110)

Use `GameMenu` and simple controls. `/reveal` is optional for settled seals. Neither `GameWorld` nor continuous movement/navigation is necessary for marked floor positions.

### C. Required game state

| State | Classification |
|---|---|
| Friend ID, pause, lamp-cell count, RF, seal counts, plays | SDK state/context |
| Active play ID | SDK state referenced by the chamber |
| Loaded `GenerationSprites`, artwork error/retry status | Local ephemeral presentation data |
| Selected canonical pose and fixed frame | Local ephemeral gameplay state |
| Chamber configuration and selected floor/lamp setting | Local ephemeral gameplay state |
| Target mask chosen from a reachable configuration | Local ephemeral gameplay state |
| Match/abandon status and completed chamber count | Local ephemeral gameplay state |
| Busy/dialog/settings state | Local ephemeral state |
| Current projected mask and mismatch feedback | Derived presentation state |
| Displayed seal gallery and RF values | Derived presentation state |

**Full reload:** safe for a session puzzle sequence. Child-only recovery can settle a pending cell but cannot restore the previous lamp arrangement or prove that its chamber was solved.

### D. Visual implementation

- A large wall/stencil occupies the main upper area.
- The unchanged canonical Friend stands on a small set of marked floor positions below.
- Three explicit lamp-setting controls accompany keyboard shortcuts.
- Current shadow and target remain visually distinguishable without relying only on color.
- A compact lamp-cell/RF readout sits outside the comparison area.
- Match feedback identifies alignment rather than overwhelming the pixels with effects.
- The seal result appears only after gameplay resolution and settlement.

The mask comparison needs substantially more screen space than the character itself. Tiny pixel differences become especially problematic when the entire 960 × 640 frame scales down.

### E. Friend identity depth and artwork findings

**Potential level 3: selected artwork materially changes gameplay.** That depth is conditional on shape affecting meaningful choices rather than merely changing the appearance of an otherwise identical alignment exercise.

**What exact representation exists?**

`GenerationSprites` includes:

- Token ID, family ID/name, seed, and cache key.
- **64 bigint bitmaps**.
- Idle and walk clips.
- Four facings, eight frames per facing/action.
- Each decoded frame supplies both a `bigint` and sixteen strings containing `#`/`.` pixels.

Bit 0 is top-left; bit 255 is bottom-right. These are **16 × 16 one-bit masks**, not screenshots, texture URLs, semantic body parts, or 3D geometry. [generation-sprites.ts:32–44,62–95](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/generation-sprites.ts#L32-L95)

The canonical reference appearance renders those pixels at 5× into an 80 × 80 box. The white halo is renderer presentation and should not be mistaken for mask data. Genesis 8 × 8 portraits are separate artwork. [WORLD_RULES.md:48–53](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/WORLD_RULES.md#L48-L53)

**Can game code safely read/use it?**

Yes, through the public `/sprites` module. The reader requests `familyOf`, `seedOf`, and `frames` from the pinned registry using a read-only public client. The child CSP permits the configured Robinhood RPC. No wallet provider or parent-page access is required. [generation-sprites.ts:113–143](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/generation-sprites.ts#L113-L143), [friend-sprites.ts:7–10](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/friend-sprites.ts#L7-L10), [dev-game.mjs:16](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/dev-game.mjs#L16)

The scrolling-world example already reads and paints canonical rows inside a game. [scrolling-world/index.tsx:87–95,123–126](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/examples/scrolling-world/index.tsx#L87-L95)

**Are shapes sufficiently distinct?**

**Not established across eligible Friends.** The repository contains two recorded canonical samples, not a representative corpus of every family or token.

Read-only analysis of those existing constants found:

| Recorded sample | Unique masks among 64 frames | Idle down/up frame-0 difference | Same occupied row extents down/up? |
|---|---:|---:|---|
| #7730, Hoverer | 16 | 2 pixels | Yes |
| #3412, Skeleton | 16 | 4 pixels | Yes |

For #7730, all corresponding idle/walk bitmaps are also identical in the recorded sample.

These measurements come from [sample-sprites.ts:3–42](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/examples/fishing/sample-sprites.ts#L3-L42). They show that **64 slots do not imply 64 distinct puzzle shapes**. An outer-envelope silhouette can discard the very pixels that distinguish directions.

**Would target generation be robust?**

Two separate answers:

- **Solvability can be constructed:** derive a target from a known reachable position/lamp configuration using the same fixed mask.
- **Uniqueness, readability, and interesting difficulty are unproven:** different configurations may yield identical or nearly identical masks. A solvable puzzle may still be trivial or visually unfair.

A finite, discrete projection model could validate candidate configurations locally. That validation would be new game logic, not an existing SDK feature.

**Does it require altered artwork or invented metadata?**

No, if it uses the original mask as input and displays a separate projection. It needs no invented traits or stats.

However, a true volumetric shadow from arbitrary lighting cannot be recovered from these 2D bitmaps. Claiming physical 3D lighting would introduce unsupported assumptions. The viable interpretation is a stylized stencil/projection puzzle.

**Known failure cases**

- **Colossus lacks vertical frames.** `spriteFrame` explicitly substitutes a horizontal direction; four distinct directional poses cannot be assumed. [generation-sprites.ts:99–110](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/generation-sprites.ts#L99-L110)
- Zero or fully filled masks are valid decoder inputs. Validation checks format, not puzzle usefulness. This does not prove such masks occur among live eligible Friends. [generation-sprites.test.mjs:43–53,73–95](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/tests/generation-sprites.test.mjs#L43-L95)
- Frames can repeat, be symmetric, contain disconnected pixels, or differ only internally.
- Animating the source frame can change the target during comparison. Puzzle evaluation needs a stable pose/frame.
- RPC errors or malformed results require retry; ownership success does not guarantee artwork availability.
- The SDK pins an artwork registry/version; it does not promise to follow every future renderer change. [generation-sprites.ts:3–14](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/generation-sprites.ts#L3-L14)

**Conclusion:** mask access is resolved. General-purpose shadow-puzzle quality and coverage remain a material technical dependency.

### F. Economy coherence

The lamp-cell admission fiction is coherent. The seal after a chamber is less directly connected.

A bounded experiential use would be a **session wall of retained seals**, optionally presented beside locally recorded chamber impressions. Redemption removes a currently owned seal from that display and restores RF for another chamber.

Restrictions remain:

- A seal cannot unlock lamps, rooms, hints, or stronger abilities under this study.
- It cannot certify success: settlement can follow failure or abandonment.
- A locally recorded solved-shadow impression is not an SDK collectible.
- An impression cannot acquire a unique RF redemption value.
- Aggregate inventory does not preserve a seal’s association with a particular chamber.

**Assessment:** keeping can support a visual souvenir collection, but it does not naturally deepen the shadow-solving rules. If “retention must affect the core puzzle” is required, no suitable integration has been established within the constraints.

### G. Core interaction testability

A future round test can use a fixed pose and discrete known solution:

1. Load the mock selected Friend’s actual fixture mask.
2. Verify target generation completes before consuming a cell.
3. Buy/use one cell.
4. Select a known wrong configuration; assert no completion.
5. Select a known matching configuration; assert one completion.
6. Settle the existing play exactly once.
7. Keep or redeem the seal and verify inventory/RF changes.

**Keyboard and touch:** equivalent floor-position and lamp-setting buttons; no pixel-perfect drag requirement.

**Pause:** freeze position, lamp selection, attempt progression, and queued transitions during runtime menus.

**Reduced motion:** use the same stable mask; eliminate sweeps/bobbing without changing matching logic.

**Expected screenshots:** clear mismatch, successful alignment, canonical Friend beside its projection, artwork-error state, and seal result.

**Additional required coverage:** Colossus fallback, duplicate masks, symmetric masks, empty/full masks, and thin/disconnected patterns. Synthetic masks are acceptable test fixtures but not substitutes for a player’s real artwork.

The standard `testGame` harness selects **#7730** and uses that artwork fixture. Its options do not provide a general multi-Friend corpus. Broader coverage would require game-owned tests, with an additional Playwright fixture using the public build/serve tooling—not SDK modification or shipped mock identities. [testing.mjs:12–50](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/testing.mjs#L12-L50), [browser-fixture.mjs:116–130](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/browser-fixture.mjs#L116-L130), [API.md:127–136](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/API.md#L127-L136)

### H. Implementation surface

**LARGE relative to the other two**, if the requirement is robust artwork-dependent puzzles across eligible Friends.

Probable files under `games/shadow-locksmith/`:

- `index.tsx` — round flow, controls, SDK actions.
- `masks.ts` — canonical-mask handling and comparison.
- `puzzles.ts` — reachable targets, ambiguity checks, chamber definitions.
- `ShadowScene.tsx` — Friend, target, and projected-mask presentation.
- `game.json`, `style.css`, `README.md`.
- Focused mask and browser tests.

The additional surface comes from proving useful puzzles and failure handling, not from accessing the sprite API. A simpler translation-only matching game would reduce surface but may weaken the original concept; that is a product change.

### I. Concept-specific failure modes

**Technical evidence**

- Missing directional frames and repeated masks invalidate assumptions about pose diversity.
- No semantic body geometry or shadow engine exists.
- No repository evidence guarantees unique or nondegenerate art across eligible tokens.
- Standard browser fixtures cover one selected artwork.
- Artwork RPC failure must block the art-dependent round safely.

**Product judgment**

- Exhaustively tapping a few floor/lamp combinations may be faster than reasoning.
- Tiny pixel mismatches may feel arbitrary.
- A guaranteed-solvable generator may repeatedly produce the same effective puzzle.
- Extensive normalization could make the selected artwork irrelevant.
- The kept seals may feel disconnected from solving.
- An impressive shadow effect alone may not sustain five minutes.

### J. Critical unknowns resolved

**RESOLVED**

- Exact canonical mask data is accessible in the sandbox through supported APIs.
- No image extraction, wallet logic, metadata invention, or SDK mutation is necessary.
- The representation is 16 × 16 binary artwork with explicit clip/fallback rules.
- Targets can be derived from known reachable configurations.
- Four distinct facings and 64 distinct shapes cannot be assumed.

**UNRESOLVED**

- Whether useful puzzle variation survives across real eligible artwork.
- Whether differences remain readable on touch-sized frames.
- Whether generated puzzles reward reasoning rather than enumeration.
- Whether a stylized projection satisfies the owner’s intended fantasy.
- Whether organizers accept the separate derived shadow effect under the conservative artwork rule.

---

## Common test and feasibility limits

For all three concepts, `friendsdk test` provides the ordinary runtime, mocked identity/RPC/art, a `check` callback, screenshot capture, and browser-error checks. At widths below 500 it enables touch; it starts with reduced motion enabled. The fixture fixes the preview random draw to 1500, making the relevant outcome predictable from the future game’s weights. It does not itself test the full gameplay loop. [testing.mjs:12–60](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/testing.mjs#L12-L60), [browser-fixture.mjs:52–54](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/browser-fixture.mjs#L52-L54)

Each eventual suite should cover confirmation cancellation, repeated input, pending-play recovery, full reload, and identity changes. No concept should use a copied sample Friend as an artwork fallback.

All three also inherit the Phase 0 environment findings: real-wallet play remains unverified, and the native-Windows unit suite had five failures. Those were not rerun or resolved during this read-only study.

## Final comparison

These are implementation requirements and structural findings, not preference scores.

| Dimension | Museum of Almost Nothing | Three Moves to Midnight | Shadow Locksmith |
|---|---|---|---|
| SDK integration surface | Runtime, fixed economy client, sprites; optional item picker/reveal | Runtime, fixed economy client, sprites; simple dialogs | Same runtime/economy plus direct canonical-mask use |
| Friend identity depth | **2:** player-directed curator position/order | **2:** tactical unit position determines results | **Potential 3:** artwork enters matching rules; depth depends on meaningful shape variation |
| Economy coherence | Retained quantities directly supply curation; redemption removes available exhibits | Admission plus separate stamp collection; no effect on tactics | Admission plus separate souvenir display; no effect on puzzle capability |
| Gameplay-system complexity | Placement/count reconciliation, briefs, discrete tour order | Command queue, deterministic movement/hazard order, authored boards | Projection/matching, target validity, ambiguity and degenerate-mask handling |
| Art/content burden | Small object catalog, exhibit descriptions, tour briefs | Board layouts, clear hazard vocabulary, stamp display | Chamber compositions, target variety, cross-artwork quality validation |
| Touch complexity | Select item, select plinth, select tour destination | Large discrete command buttons | Discrete controls are simple; mask readability is the harder issue |
| Automated testability | Deterministic placement and inventory arithmetic | Deterministic rules and known board solutions | Deterministic once mask/target are fixed; substantially broader fixture coverage needed |
| Dependency on persistence | None; exhibition and inventory are session-local | None; board sequence is session-local | None; chambers and gallery are session-local |
| Major technical uncertainty | No fundamental API gap; placement reconciliation must be correct | No fundamental API gap; interruption recovery cannot restore lost tactical state | Useful, readable, nontrivial puzzles across eligible masks are unproven |
| Estimated implementation surface | **MEDIUM** | **MEDIUM** | **LARGE** for robust artwork-dependent generation |

No shortlisted concept is proven technically impossible. Shadow Locksmith remains **conditional**, rather than technically cleared. One More Floor therefore remains the reserve; this study does not promote it or select a winner.

## DECISIONS THAT NOW REQUIRE THE OWNER

1. **Must keeping a reward affect the core interaction?** Museum can use retained inventory directly. The two puzzle concepts currently offer a separate collection/display reason to keep rewards.

2. **Are rewards independent of performance acceptable?** Under the supported action model, victory, failure, and abandonment cannot alter the fixed outcome table. Puzzle results and economic results must remain visibly separate.

3. **For Museum, what constitutes a satisfying exhibition?** Completing explicit arrangement/tour briefs, expressing personal taste, or collecting variety? This determines whether curation has a meaningful goal.

4. **For Three Moves, what should failure mean?** A completed paid attempt followed by another assignment, or additional local retries within the same assignment before settlement? Both can fit the SDK; they produce different pressure and pacing.

5. **For Shadow Locksmith, is a stylized 2D stencil-projection puzzle acceptable?** The repository cannot support a claim of physical 3D shadows from the available artwork.

6. **How much artwork-dependent uncertainty is acceptable for Shadow?** Can a simpler valid configuration handle difficult masks, or must every eligible Friend support comparably rich puzzles? The latter requirement is not yet substantiated.

7. **Does the separate projected-shadow effect meet the intended artwork-preservation rule?** The original character can remain unchanged, but organizer interpretation—not repository inspection—must settle the event-rule ambiguity.

