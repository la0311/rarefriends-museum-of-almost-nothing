# Museum of Almost Nothing — Product Spec Lock

This specification carries forward the Phase 1A concept and Phase 1B feasibility findings, using the [verified baseline](research/PHASE_0_BASELINE.md). The SDK baseline is pinned to **FriendSDK v0.1.4**, commit `ca3bf183b809ecf22d87c63d88ce03969a3f8da2`.

The rules below are product decisions. SDK constraints are cited where they determine behavior. This canonical specification preserves Phase 1C decisions; Phase 1D only makes source references portable. See [SDK constraints](SDK_CONSTRAINTS.md) and [decision log](DECISION_LOG.md).

## Phase 2 deadline execution overlay

The explicit 2026-09-30 owner instruction and D-029 authorize the four-gate roadmap. The Phase 1C design below remains the reference; these bounded submission-scope allowances take precedence where they narrow its required presentation or brief breadth:

- Audio may be omitted entirely. If audio survives, mute remains mandatory.
- Decorative walking/reveal/spotlight animation may be cut. The canonical Friend may snap to a player-chosen presentation position in normal or reduced-motion mode; Present and sequence decisions remain explicit and identical.
- Opening Remarks and both intermediate briefs remain required. Minimum Final Exhibition may reuse the existing smaller-collection predicates on a feasible owned subset: one copy centered, or an applicable two-copy same/different brief with left-before-right order, even when more copies are owned. The player still arranges and directs the finale. Additional three-copy final variants below are optional for this deadline; no new brief system is implied. Every nonempty collection can finish; empty closure is not a successful exhibition.
- Sophisticated recovery messages and extra test coverage may be cut. Uncertain mutations still require re-read/reconciliation; unsupported pending recovery must block new expeditions safely and be documented, never duplicate a play or invent inventory.

All other locked identity, aggregate inventory, economy separation, three-plinth/four-object, session-only, keyboard/touch and pause rules remain binding. Record actual cuts and never claim unimplemented reference features shipped.
## A. PRODUCT THESIS

**Ordinary objects become worth keeping when the player can give them a small, personal moment of importance.**

Museum of Almost Nothing turns SDK inventory into a temporary exhibition. Random expeditions supply objects; the player decides what deserves scarce display space, what can fund another expedition, and how their selected Friend presents the collection.

The central tension is **preserving a satisfying exhibition versus sacrificing part of it for another possibility**.

The museum has one room, three plinths and no permanent progression. Success means finishing an exhibition the player deliberately composed.

## B. PLAYER PROMISE

> Find almost nothing. Decide it matters. Let your Friend explain why.

Within a short session, the player will:

- Discover four possible kinds of wonderfully unimportant objects.
- Make understandable keep/redeem decisions.
- Arrange up to three owned objects.
- Direct their Friend through a brief, purposeful tour.
- Close the museum with a final exhibition.

The game promises gentle decisions and comic attachment. It has no timed failure, collection-completion requirement or financial-performance score.

The opening identifies the experience as **“A session exhibition · Simulated RF · Resets on full reload.”**

## C. ONE-MINUTE EXPERIENCE

The reference minute begins **after the runtime has verified identity and the initial state/artwork have loaded**. Wallet interaction and network latency cannot be included in a guaranteed duration.

| Time | What the player sees and does |
|---|---|
| **0–8 seconds** | Their Friend stands beside three empty plinths. A wall inscription reads **“An institution of very little consequence.”** One instruction appears: **“Fund your first expedition.”** |
| **8–20 seconds** | Select **Buy permit**, inspect the runtime confirmation, then select **Send expedition** and confirm play. The two actions remain distinct. |
| **20–28 seconds** | Settlement finishes. A small object appears under a disproportionately serious spotlight. Its name, one-sentence description, owned quantity and fixed redemption value are visible. |
| **28–35 seconds** | Choose **Keep for exhibition**. Supporting copy says **“Available to display. You can redeem it later.”** |
| **35–43 seconds** | The object is selected in the tray. Tap a plinth or press its numbered control to place it. The brief reads **“Opening Remarks: display and present one object.”** |
| **43–55 seconds** | Select **Begin tour**, choose the occupied plinth, watch the Friend walk there, then press **Present**. The plaque appears when the player presents. |
| **55–60 seconds** | A restrained stamp reads **“Brief met. Of considerable importance.”** A separate line states **“Tour result only — no RF awarded.”** Choices become **Another expedition** and **Rearrange exhibition**. |

Only the next relevant instruction appears. No introductory tutorial panel is required.

**If the player redeems the first find:** show the RF increase and the empty collection, then offer another expedition. Do not fabricate an exhibit or force a keep. The suggested first-minute path teaches the whole loop; deviations remain valid.

## D. FIVE-MINUTE SESSION

This is a pacing reference, not a countdown or required outcome sequence.

| Session point | Experience |
|---|---|
| **Opening** | Fresh SDK balance and no exhibits. The Friend introduces the room through the first interaction rather than dialogue. |
| **Minute 1** | First expedition, first keep, first one-object exhibition. |
| **Minute 2** | A second find enables either a matching pair or a contrast. The player learns that identical copies can occupy separate plinths. |
| **Minute 3** | A third find creates a fuller exhibition. The player chooses between feasible briefs and changes the presentation sequence. |
| **Minute 4** | The player considers another expedition against keeping their current collection. Redemption can fund further exploration while removing an available exhibit. A replacement may improve variety or create a useful duplicate. |
| **Minute 5** | The player selects **Final exhibition**, chooses an achievable final brief, makes the final arrangement and personally guides the Friend through it. The room remains visible as the closing tableau. |

**Escalation:** one object → relationships between two objects → composition and order across three. No new movement system, resource or upgrade appears.

**Finale availability:** unlocked after the first completed tour. It becomes the suggested next action after two successful tours and at least three owned copies, or after four settled expeditions, whichever happens first. These are local prompts, not rewards or compulsory gates.

There is no hard expedition cap. Further exploration is optional and subject to actual RF, permits and backing.

**End state:** the final scene shows the exhibited objects, their presentation order, brief result and current simulated RF separately. The player can inspect it or return to curating the same session. Nothing is saved.

An empty collection can be closed with **“Nothing remained on loan.”** This is an honest closing state, not a completed exhibition. Any nonempty collection can support a successful finale.

## E. CORE STATE MACHINE

**Entry → read/reconcile → museum ready → permit purchase if needed → expedition play → settlement → object reveal → keep/redeem → curation → directed tour → local evaluation → continue or final exhibition.**

| State | Rule |
|---|---|
| **Entry / reconcile** | Read SDK state and load the selected Friend. Resolve any existing pending expedition before starting another. |
| **Museum ready** | Curate existing inventory, acquire/use a permit, redeem an owned copy or prepare the finale. |
| **Buy permit** | `buy(1n)` through runtime confirmation. No bundled or custom checkout. Skip if a permit is already owned. |
| **Send expedition** | `play(1n)` consumes a permit and supplies a pending play ID. The expedition is a short presentation transition, not a separate minigame. |
| **Settle** | Settle that existing play ID. No curation or reward reveal claims an outcome before settlement is confirmed. |
| **Reveal** | Show the settled outcome and fixed value. **Keep** leaves inventory untouched. **Redeem** requests redemption of one copy of that outcome. |
| **Curate** | Assign owned quantities to plinths and choose an achievable brief. |
| **Tour** | Freeze arrangement. Player directs the Friend and explicitly presents each occupied plinth once. |
| **Evaluate** | Compare the arrangement and actual presentation sequence with the brief. No SDK mutation. |
| **Continue / finale** | Revise freely, acquire another find, or complete a final tour and close the exhibition. |

**State ownership**

- **SDK:** simulated RF, permits, aggregate outcome quantities, pending and settled plays.
- **Local session:** plinth assignments, chosen brief, tour sequence, Friend position, completed-tour count and finale state.
- **Derived presentation:** undisplayed quantities, feasible briefs, highlighted destinations and brief results.

Keep and placement are not SDK transactions. Inventory represents quantities of outcome types, not uniquely identifiable specimens. These boundaries follow the [client and ledger definitions](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L5).

## F. OBJECT CATALOG

**Four types.** Two descriptive categories—**Found outdoors** and **Left behind**—provide understandable relationships. Categories are local catalog labels, not NFT traits or additional SDK properties.

| Object | Visual idea | Museum description | Outcome role / conceptual fixed reward tier | Reason to keep |
|---|---|---|---|---|
| **Unremarkable Pebble** | A squat grey oval with one pale edge | “Its previous location was slightly to the left.” | Found outdoors. Common, low redemption tier. | Strong visual anchor; duplicate pebbles make an absurdly solemn matching display. |
| **Very Short Twig** | A narrow brown fork with two unequal arms | “A branch whose ambitions were revised.” | Found outdoors. Common, low redemption tier. | Contrasts clearly with the pebble while supporting an outdoors grouping. |
| **Unbent Paperclip** | A tall, clearly outlined silver loop | “Held nothing together. Remains qualified.” | Left behind. Less common, middle redemption tier. | Introduces category contrast and a distinctive upright silhouette. |
| **Unattached Button** | A large cream disc with four dark holes | “The garment has declined to comment.” | Left behind. Least common, higher redemption tier. | Visually memorable; useful as the distinct ending to a matching pair. |

All four outcomes have a **positive, fixed redemption value**. Reward tier never means greater curatorial worth. No brief requires a specific object or rare outcome.

Quantities of the same type share appearance and description. There are no specimen names, provenance records, quality rolls or collectible metadata.

**Economy tuning boundary:** exact prices, weights and RF amounts remain balance parameters, as requested. The intended balance is:

- The initial budget funds approximately three expeditions without redemption.
- A modest additional expedition creates a real reason to consider redemption.
- Ordinary copies contribute meaningfully toward that cost.
- Expected redemption is below permit cost.
- No tour result changes any term.

The runtime’s initial **20 RF** is established SDK behavior; these pacing targets must fit it without modifying core. [Initial preview ledger](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game-host.tsx#L191)

## G. TOUR BRIEF SYSTEM

Briefs are **small curatorial constraints**, not riddles with hidden rules. Each shows its complete requirements before the tour.

### Brief catalog

| Stage | Brief | Exact requirement |
|---|---|---|
| Introductory | **Opening Remarks** | Display exactly one object on any plinth and present it. |
| Intermediate | **A Remarkable Resemblance** | Display exactly two copies of the same type; present the left occupied plinth before the right. |
| Intermediate | **Two Entirely Different Things** | Display exactly two different types; present the left occupied plinth before the right. |
| Final: three identical | **An Exhaustive Study** | Display three copies of one type; present the center plinth last. |
| Final: pair plus different | **The Unexpected Conclusion** | Display two copies of one type and one different type; present the matching pair before the different object. |
| Final: three different | **Outside, Then Inside** | Display three different types; present all “Found outdoors” objects before all “Left behind” objects. |
| Final: smaller collection | **A Small but Complete Account** | With two owned copies, use the applicable two-object brief. With one, display it on the center plinth and present it. |

With this four-object catalog, any three different types necessarily span both categories.

### Selection rules

- The first brief is always **Opening Remarks**.
- Subsequently, show at most two feasible briefs appropriate to the collection.
- Feasibility considers **owned quantities**, including displayed copies—not just distinct types or undisplayed stock.
- Prefer an uncompleted feasible brief; if several qualify, use a fixed catalog order. The player may choose either offered brief.
- Final selection considers every legal three-copy combination. Offer up to two feasible final briefs.
- If fewer than three copies are owned, use the smaller-collection finale. It receives a complete ending, without a punitive grade.

Brief selection does not require buying anything.

**After redemption:** recheck feasibility. If the selected brief becomes impossible, explain the missing quantity and offer the available alternatives. Do not silently change the brief.

**During a tour:** the chosen brief stays fixed. No inventory operations or rearrangement occur.

**Failed brief:** show the exact mismatch—such as **“The different object was presented second; this brief asks for it last.”** Offer free retry or return to curation. No object, RF or permit is lost.

Duplicates support matching pairs, repeated three-object exhibitions and alternative routes. Even a collection containing only pebbles can complete the full experience.

## H. KEEP / REDEEM DESIGN

| Decision | Rational motivation | Consequence |
|---|---|---|
| **Keep an ordinary object** | It supplies an exhibit, a category relationship or an object the player likes. | Preserves future arrangement options. |
| **Keep a duplicate** | Two copies enable matching briefs; three enable the repetition finale. | More compositional possibilities, with less RF recovered. |
| **Redeem a surplus copy** | It adds little to the intended three-plinth exhibition and helps fund another find. | Reduces reserves of that outcome and increases spendable RF. |
| **Redeem the final displayed copy** | The player willingly abandons one exhibition idea to pursue another. | The plinth becomes empty and some briefs may become unavailable. |

**Keep copy:** “Keep for exhibition — redeem later if you choose.”

**Redeem copy:** “Redeem one for [fixed value] simulated RF.” Show resulting owned quantity and any affected plinth before the runtime confirmation.

Keeping everything preserves flexibility but eventually limits exploration through available RF. Redeeming everything prevents a successful exhibition. Neither behavior earns a special score or bonus.

Three plinths limit the active composition, **not total inventory**. There is no storage tax, decay or artificial disposal requirement. Players may reasonably keep their favorite collection and finish early.

The design must make redemption tempting, not mandatory. Whether it creates enough tension within five minutes remains a prototype question.

Redemption returns the configured value and removes inventory. It **does not guarantee purchase backing becomes available**; the ledger reduces stake and reward liability together. [Redemption arithmetic](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/game.ts#L146)

## I. FRIEND ROLE

**Identity depth is locked at level 2.**

The selected Friend is the curator whose location enables presentation and whose player-directed route determines the brief outcome.

Minimum behavior:

- Canonical idle and walking frames.
- Walk between the entrance and fixed presentation positions in front of the three plinths.
- Face the relevant exhibit on arrival.
- Wait for the player’s **Present** action.
- Hold position while the object’s museum label appears.
- Respond to another destination only when the player chooses it.

A tour never automatically advances to the next exhibit. Arrival alone does not present an object.

The Friend does not gain traits, movement advantages, powers or custom costume animations. Different Friends retain identical rules. Canonical frame access is supplied by the [sprite API](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/friend-sprites.ts#L1).

## J. INTERACTION MODEL

### Curation

1. Select an owned type in the four-entry inventory tray.
2. Select plinth **1, 2 or 3** to place one available copy.
3. Selecting an occupied plinth replaces its assignment if the new copy is available. The previous assignment returns to undisplayed availability.
4. Select an occupied plinth and **Remove** to clear it without changing SDK inventory.
5. Selecting the same type on the same plinth has no effect.

Each displayed copy requires one owned unit. The tray states both counts, for example **“Owned 3 · Displayed 2.”**

There is no dragging requirement and no physical movement needed for inventory management.

### Duplicate redemption

The interface redeems **one copy at a time**.

- Remove an undisplayed allocation first.
- If every copy is displayed, clear the highest-numbered occupied plinth containing that type.
- Preview the affected plinth before redemption.
- Apply the removal only after the refreshed SDK state confirms it.
- Redeeming the final copy clears its remaining display assignment.

This is quantity reconciliation, not the identification of a particular specimen.

### Tour

- Select **Begin tour** to freeze the arrangement and return the Friend to the entrance.
- Choose an occupied, unpresented plinth.
- The Friend walks to its presentation point.
- Select **Present** to record that plinth in the tour sequence.
- Repeat until every occupied plinth has been presented once.
- Evaluate automatically after the final presentation.

The **actual sequence of Present actions is the presentation order**. No separate route planner is required.

Walking is untimed. While moving, further movement/presentation input is ignored rather than queued. A presented plinth cannot be counted twice. **End rehearsal** returns to curation without a penalty.

### Equivalent controls

| Action | Keyboard | Pointer / touch |
|---|---|---|
| Select object or action | Tab / Shift+Tab, Enter or Space | Tap visible control |
| Place or visit plinth | Focused plinth control; optional 1–3 shortcuts | Tap large numbered plinth target |
| Present | Focused Present control; Space when no dialog is open | Tap Present |
| Remove / redeem | Focused labeled action | Tap labeled action |
| Return from local panel / rehearsal | Escape | Visible Back control |

Shortcuts are inactive in dialogs and while the runtime pauses gameplay. Focus and selection are visibly distinct.

## K. VISUAL / AUDIO DIRECTION

### 960 × 640 composition

- **Top, approximately y=16–100:** museum name and compact simulated RF/permit readout; current brief immediately below.
- **Room, approximately y=110–500:** visually dominant, with quiet warm walls and a broad floor.
- **Plinth centers:** approximately **x=270, 480 and 690**, aligned near **y=320**. Large numbered floor targets sit beneath them.
- **Friend:** begins near the lower center of the room; presentation positions sit in front of each plinth.
- **Inventory/action band, approximately y=510–570:** four compact object choices and contextual actions within the central area.
- **Lower corners:** contain no game actions, inventory targets or essential text. Reserve generous space for trusted runtime controls; their actual footprints take precedence.

Object silhouettes must remain legible without relying on color. Descriptions appear on selection or presentation rather than permanently covering the room.

The settled-find reveal is a temporary central panel with the object, one description and two large decisions. The room remains visible behind it. No full-screen card collection replaces the museum.

On narrow touch displays, preserve the approximately 3:2 museum scene while exposing inventory and decisions through a readable contained panel. Phase 3A.1 owner playtest found that the SDK's default 360 × 240 host frame clipped required actions; D-031 permits a taller 3:4 host frame at widths up to 500px while retaining the 960 × 640 desktop presentation. All required G1 controls must fit above the trusted runtime control band without child scrolling. Simplify visible copy and enlarge active targets rather than shrinking every desktop control proportionally. Touch readability remains an acceptance requirement. [Runtime frame constraints](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/HOST_INTEGRATION.md#L274)

### Representative screenshot/GIF

The Friend has just presented **two identical pebbles followed by a button**. The button receives an enormous spotlight and the caption:

> **THE UNEXPECTED CONCLUSION**  
> The garment has declined to comment.

The other two plinths remain visible, with small presentation-order markers. The image communicates an arrangement the player made and a tour the player directed.

### Audio and motion

Minimum sound palette: placement click, reveal accent, presentation chime and brief-completion stamp. No music or voice acting is required.

- Audio begins only after user interaction.
- A visible mute control applies to all game audio.
- Pausing stops active game audio and movement.
- Normal motion uses short walks, a restrained spotlight transition and a simple reveal.
- Reduced motion replaces travel with a position change, reveals immediately and uses static feedback.
- **Present remains explicit in both modes.** Order, permissions and evaluation rules are unchanged.
- No camera shake, confetti system or reward-tier spectacle is required.

The SDK provides optional mute controls and reduced-motion reveal support. [Sound controls](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/friend-sounds.ts#L99), [reveal options](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/src/reward-reveal.tsx#L8)

## L. FAILURE / RECOVERY EXPERIENCE

| Situation | Player-facing behavior |
|---|---|
| **Cancelled buy confirmation** | Return to the museum without starting an expedition. Refresh state before another economic action. |
| **Cancelled play confirmation** | Return to the ready state. Show the refreshed permit count; do not automatically retry. |
| **Cancelled redemption** | Keep the confirmed inventory and arrangement. Do not clear a plinth optimistically. |
| **SDK error or uncertain response** | Show **“We couldn’t confirm that action. Checking your collection…”** Read current state before offering another action. If reading also fails, disable economic actions and offer Retry. Do not guess whether the mutation occurred. |
| **Pending expedition found** | Offer **Resume expedition**, using its existing play ID. Do not buy or play again to recover it. |
| **Already-settled expedition found** | Use the recorded outcome and current inventory. Do not settle again or manufacture another reward. A historical outcome is not proof that a copy remains owned. |
| **Artwork load error** | Show **“Your curator couldn’t be loaded”** with Retry. Keep tours and new expeditions unavailable until canonical art loads. Do not substitute a sample Friend. |
| **Insufficient RF** | Show permit cost and current balance. Offer collection review for possible redemption, free curation or the finale. Use an existing permit if available. |
| **Backing rejection** | Explain that the simulation cannot currently support another permit, when that reason is available. Offer curation/finale. Never promise that redeeming fixes backing. |
| **Child reload; host ledger survives** | Read retained RF, permits, inventory and plays. Clear unrecoverable local placement/tour progress. Say **“Your collection is available; arrange the exhibition again.”** Recover pending plays before new expeditions. |
| **Full runtime reload** | Start a fresh session with the runtime’s initial ledger. Do not imply restoration. The session-reset notice remains visible in help. |
| **Displayed copy redeemed** | Reconcile quantities, clear affected plinths and report the exact change. Revalidate the selected brief. |
| **Repeated inputs** | One economic request at a time. Disable its controls while pending. Do not queue buys, plays, redemptions or presentation actions. |
| **Runtime pause / hidden page** | Stop gameplay movement and ignore game inputs. Resume from the same logical tour position without a time penalty. Confirmed SDK results are reconciled on return. |
| **Friend/account/network change** | Follow runtime invalidation and re-entry. Discard the previous local tour; show only the newly verified identity’s state. |

Error text must remain conservative because SDK errors may be sanitized. The product promises reconciliation, not automatic refunds, rollback or restoration of local tours.

The child/full reload distinction is supported by the [starter recovery fixture](https://github.com/spokesz/friendsdk/blob/ca3bf183b809ecf22d87c63d88ce03969a3f8da2/scripts/check-starter-browser.mjs#L93).

## M. MUST SHIP

- One museum room, three plinths and the canonical selected Friend.
- Four outcomes with distinct silhouettes, concise descriptions and fixed positive redemption values.
- Simulated permit → expedition → settlement → keep/redeem lifecycle.
- Current cost, probabilities and redemption terms available before purchase.
- Correct aggregate quantity handling and post-redemption display reconciliation.
- Introductory, two-object and final briefs, selected only when achievable.
- A complete finale for any nonempty collection, including duplicates.
- Player-directed movement and explicit presentation order.
- Free rearrangement and tour retries.
- Clear separation between RF outcomes and local tour results.
- Keyboard and touch parity, mute, reduced motion and runtime pause handling.
- Honest loading, cancellation, error and reload behavior.
- Session-only messaging and a satisfying final tableau.

## N. OUT OF SCOPE

- Permanent museum progression, durable collections or saves.
- Multiple rooms, construction or decoration editors.
- Crafting, upgrades, equipment or item powers.
- Extra currencies, score shops or RF rewards for tours.
- Trading, minting, wearable items or unique specimen histories.
- Leaderboards, multiplayer visitors or social services.
- Custom wallet connection, NFT discovery or checkout.
- Live smart contracts or transactions.
- Free-roaming expeditions, combat, platforming or additional minigames.
- Complex pathfinding, visitor simulation, procedural object descriptions or authored Friend traits.
- Export/share systems, production music and voice acting.

## O. ACCEPTANCE EXPERIENCE

The design succeeds when a first-time player can:

1. Complete an expedition and explain that it supplied a random, already-settled inventory outcome.
2. Understand that keeping preserves display availability and redeeming exchanges a copy for a known RF value.
3. Place an owned object and complete the first tour without reading a tutorial page.
4. Use a duplicate deliberately, rather than interpret it as a useless failure.
5. Choose between feasible arrangements or briefs.
6. Deliberately redeem something they could have displayed because they prefer another expedition opportunity.
7. Notice the corresponding inventory/display change.
8. Direct the Friend’s destinations and presentation sequence, including correcting an unsuccessful order.
9. Complete a final exhibition using the collection actually obtained.
10. Explain that the tour result earned no RF and that a full reload starts another session exhibition.

The acceptance session must expose a genuine redemption tradeoff; a scripted forced redemption does not establish that the design works.

Successful use with keyboard, touch and reduced motion must preserve these same decisions.

## P. PRODUCT RISKS STILL REQUIRING A PLAYABLE PROTOTYPE

- **Curation depth:** brief requirements may become obvious chores rather than satisfying composition.
- **Friend agency:** discrete destinations and Present actions must feel like directing a curator, not clicking through labels.
- **Attachment:** four objects and short descriptions may or may not generate affection within five minutes.
- **Economy pacing:** exact fixed terms must create opportunity cost without excessive purchasing or premature exhaustion.
- **Confirmation overhead:** separate runtime buy/play confirmations may dominate the opening minute.
- **Duplicate delight:** repeated objects need to feel intentionally funny beyond the first matching pair.
- **Gentle finale:** inventory-adaptive briefs must feel accommodating without making the ending feel automatic.
- **Touch readability:** the small frame must retain clear object selection, brief text and runtime-safe controls.
- **Visual restraint:** the absurd spotlight and solemn labels need sufficient impact without requiring a larger asset scope.

These are validation and balance risks. They do not require another core system or unresolved owner decision before planning.

**READY FOR IMPLEMENTATION PLANNING: YES**

