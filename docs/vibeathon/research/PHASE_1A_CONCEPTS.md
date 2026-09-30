> Historical evidence, preserved on 2026-09-30 from the completed Phase 1A assistant output in Codex thread 01a0f07b-12c9-7700-8b79-14d4709b8628. No standalone source file existed. The recorded output below is reproduced verbatim; historical paths and superseded choices remain evidence, not current instructions. See ../CONTEXT_INDEX.md and SOURCE_PROVENANCE.md.

---

These concepts use the verified [Phase 0 baseline](C:/Users/DELL/Documents/Codex/2026-09-30/to/outputs/FRIENDSDK_BASELINE.md). No files, code, or assets were created or changed.

A few rules apply to all ten:

- The selected canonical Friend is an active participant inside the 960 × 640 frame. No invented NFT stats, powers, or eligibility rules.
- Each concept uses **one consumable and one fixed outcome table**. Player performance cannot change SDK reward probabilities or redemption values.
- `read()` loads the session; `buy` purchases consumables; `play` consumes them; `settle` determines the reward. **Keep means leaving it in inventory—there is no separate keep API.**
- Scores, puzzle progress, audience reactions, and compositions are temporary gameplay state—not currencies, SDK items, or redeemable assets.
- Confirmations happen at round boundaries. Gameplay failure never destroys an already-owned SDK reward or prevents its redemption.
- **Token Activity below means simulated RF spending and redemption, not actual burning or live activity.**

## 1. Pendulum Post

**Gameplay family:** Timing / skill.

**Product thesis:** One readable timing mechanic can make the Friend’s physical journey satisfying enough to replay.

**One-sentence fantasy:** Your Friend is an airborne postal worker hopping between swinging platforms to deliver an oversized letter.

**Rare Friend role:** The selected Friend is the jumper you control and must land safely. Its canonical silhouette stays visible throughout the route and on the final delivery stamp.

**Core loop — 35–45 seconds:** Observe two swinging platforms, choose the safer or shorter route, then press Space or tap to jump at each alignment. Complete three transfers and reach the mailbox.

**Session arc:** Minute one teaches generous landing windows; by minute five, familiar platform arrangements overlap in more demanding sequences. Improvement appears as cleaner deliveries and fewer missed jumps.

**RF integration:** RF funds dispatch tickets. `buy` purchases tickets; `play` starts a dispatch; `settle` issues a random commemorative postal seal after the attempt; `redeem` exchanges that seal at its listed value. The seal is independent of delivery performance.

**Visual hook:** Your tiny Friend hangs between enormous swinging envelopes, one landing away from a mailbox snapping shut.

**Player decision:** Wait for an easy alignment or take a tighter shortcut to improve the delivery time.

**Skill vs chance:** Timing determines delivery success and score. SDK chance determines only the seal.

**Build surface:** **MEDIUM.**

**Main technical risk:** Making jump timing feel fair across keyboard, touch, and different frame rates.

**Vibeathon connection:**

- **Character Spotlight:** The Friend’s movement is the entire interaction.
- **Token Activity:** Dispatch tickets provide a clear repeated RF expense.
- **Economy Potential:** A bounded ticket-and-souvenir loop with visible fixed redemption terms.

## 2. Last Lantern

**Gameplay family:** Survival / spatial awareness.

**Product thesis:** Protecting one small character can create tension without combat systems or a large world.

**One-sentence fantasy:** Your Friend carries the last working lantern through a courtyard swept by waves of darkness.

**Rare Friend role:** The Friend physically carries the safe area; moving it changes which approaching threats must be handled.

**Core loop — 40–50 seconds:** Move between three refuge points, watch warning lanes, and rotate the lantern toward the next shadow wave. Survive a short sequence and reach the illuminated exit. Keyboard directions or large directional touch controls suffice.

**Session arc:** Early rounds teach single-direction threats; later rounds combine alternating directions and moving refuge points. The session culminates in one final storm, rather than indefinite survival.

**RF integration:** RF purchases lantern charges. `buy` obtains charges; `play` consumes one for an expedition; `settle` grants an expedition memento after success or failure; `redeem` returns its fixed RF value.

**Visual hook:** A huge dark wave parts around a tiny island of light with your Friend at its center.

**Player decision:** Stay in a defensible refuge or cross an exposed lane before the next warning resolves.

**Skill vs chance:** Positioning and attention determine survival. Reward chance does not become better because the player survives longer.

**Build surface:** **MEDIUM.**

**Main technical risk:** Readable threat telegraphs that remain fair in the small viewport and reduced-motion mode.

**Vibeathon connection:**

- **Character Spotlight:** The Friend is visibly vulnerable and indispensable.
- **Token Activity:** Charges finance discrete expeditions.
- **Economy Potential:** Repeatable admission spending with transparent, separately backed mementos.

## 3. Midnight Diner

**Gameplay family:** Management / scheduling.

**Product thesis:** Managing one worker creates meaningful pressure without needing a restaurant simulation.

**One-sentence fantasy:** Your Friend runs the last food counter open in a city of impatient night owls.

**Rare Friend role:** The selected Friend is the sole worker. Its travel and occupied hands make task ordering tangible rather than abstract menu management.

**Core loop — 45–60 seconds:** Three orders arrive. Send the Friend between preparation, heating, and serving stations; choose what to start next while another item finishes. Use station hotkeys or tap the stations directly.

**Session arc:** Begin with identical orders, then introduce overlapping preparation times and one shared station bottleneck. Minute five is the closing rush using the same three stations.

**RF integration:** RF pays for a service batch. `buy` purchases batches; `play` opens one service window; `settle` returns a randomized supplier rebate voucher; `redeem` recovers its listed RF amount. Customer satisfaction produces a local service grade, not RF tips.

**Visual hook:** Your Friend stands between three ringing order bells as the entire counter briefly synchronizes into a perfect service.

**Player decision:** Save an almost-late order or complete two simpler orders first.

**Skill vs chance:** Scheduling determines service quality. The clearly labeled supplier rebate is independent of that grade.

**Build surface:** **MEDIUM.**

**Main technical risk:** Making task state, movement, and station availability understandable at a glance.

**Vibeathon connection:**

- **Character Spotlight:** Every order passes through the selected Friend’s actions.
- **Token Activity:** RF visibly funds operating supplies.
- **Economy Potential:** Demonstrates expenditure and partial recovery without inventing customer-payment APIs.

## 4. Three Moves to Midnight

**Gameplay family:** Tactical decision / programming puzzle.

**Product thesis:** Planning three moves, then watching the consequences, creates a compact and watchable tactical game.

**One-sentence fantasy:** Your Friend is a courier crossing a clockwork security floor before its mechanisms advance.

**Rare Friend role:** The selected Friend executes the player’s instructions on the board; its position determines danger, access, and success.

**Core loop — 25–45 seconds:** Inspect a small grid with telegraphed hazards. Queue three moves, execute them, then adjust the next sequence to reach the exit. Arrow inputs or tapping adjacent tiles supports both devices.

**Session arc:** Start with one moving hazard; later boards combine a conveyor and alternating safe lanes. The progression is a short sequence of increasingly expressive problems, not new abilities.

**RF integration:** RF purchases courier assignments. `buy` obtains assignments; `play` starts a board; `settle` grants a randomly selected dispatch keepsake after the attempt; `redeem` exchanges it at its published value.

**Visual hook:** Three ghost arrows unfold, then your Friend slips through a closing mechanical pattern by one tile.

**Player decision:** Take the shortest route or spend a move waiting for a safer hazard phase.

**Skill vs chance:** The board is deterministic and previewable. Chance affects only the keepsake.

**Build surface:** **LOW.**

**Main technical risk:** Designing a small set of readable, solvable boards with a useful difficulty curve.

**Vibeathon connection:**

- **Character Spotlight:** The Friend is the piece whose journey the player plans.
- **Token Activity:** RF buys discrete assignments.
- **Economy Potential:** Clear assignment pricing and reward liabilities; no combat-stat or upgrade economy required.

## 5. Shadow Locksmith

**Gameplay family:** Spatial puzzle / observation.

**Product thesis:** The selected Friend’s actual artwork can become puzzle material rather than decorative identity.

**One-sentence fantasy:** Your Friend opens impossible doors by placing its shadow into the right frame.

**Rare Friend role:** Puzzle targets derive from the selected Friend’s canonical silhouette. Selecting another Friend changes the visual material of the puzzle without granting stronger stats.

**Core loop — 30–60 seconds:** Move the Friend among marked floor positions and switch between three lamp directions until its cast shadow aligns with a door stencil. Keyboard selection or tapping large floor markers works.

**Session arc:** First align one silhouette; later doors add an occluding panel or a second alignment condition. The final chamber combines previously learned relationships.

**RF integration:** RF purchases lamp cells. `buy` acquires cells; `play` starts a chamber; `settle` issues an independently drawn locksmith’s seal after the attempt; `redeem` exchanges the seal. Solving the door grants local chamber completion only.

**Visual hook:** A door-sized silhouette suddenly matches your tiny Friend perfectly and the surrounding wall separates.

**Player decision:** Move the Friend or change the light direction—which fixes the mismatch without breaking another alignment?

**Skill vs chance:** Spatial reasoning solves the door. The seal’s value is random and disclosed separately.

**Build surface:** **HIGH.**

**Main technical risk:** Ensuring puzzles remain legible and distinguishable across eligible Friend silhouettes.

**Vibeathon connection:**

- **Character Spotlight:** The particular Friend’s visual identity changes what the player solves.
- **Token Activity:** Lamp cells support repeated chamber attempts.
- **Economy Potential:** A simple consumable loop; no paid character advantages.

## 6. Museum of Almost Nothing

**Gameplay family:** Collection / curation.

**Product thesis:** A collection becomes more interesting when limited display space makes keeping everything an imperfect choice.

**One-sentence fantasy:** Your Friend curates a tiny museum where ordinary objects receive absurdly serious exhibitions.

**Rare Friend role:** The selected Friend is the curator and tour guide. The player moves it through the exhibition to establish the viewing order and complete each tour.

**Core loop — 40–60 seconds:** Acquire one expedition find, inspect its category, place or rearrange it among three plinths, then guide the Friend through a short tour. Each tour presents a visible brief such as “three different objects” or “a matching pair.”

**Session arc:** Minute one introduces the first exhibit; by minute five, duplicates, limited plinths, and a shrinking RF balance create curation choices. The ending is a final exhibition, not a permanent collection.

**RF integration:** `buy` purchases expedition permits; `play` consumes one; `settle` reveals the inventory item **before** curation. Keep it for display or `redeem` it to finance another expedition. Plinth placement never consumes or upgrades the item.

**Visual hook:** Your Friend solemnly presents a single pebble beneath an enormous museum spotlight.

**Player decision:** Preserve a useful exhibit or redeem it for another uncertain find.

**Skill vs chance:** Chance supplies the collection; the player controls arrangement and how well it satisfies tour briefs. Briefs award no RF.

**Build surface:** **LOW.**

**Main technical risk:** Keeping displayed objects consistent with inventory after redemption.

**Vibeathon connection:**

- **Character Spotlight:** The Friend actively leads the exhibition.
- **Token Activity:** Keeping versus redeeming directly affects further spending.
- **Economy Potential:** Demonstrates why a player might retain a backed reward for experiential value.

## 7. Pocket Billiards Bureau

**Gameplay family:** Arcade / geometric precision.

**Product thesis:** A three-shot challenge offers immediate comprehension and visible mastery with very few rules.

**One-sentence fantasy:** Your Friend delivers oversized parcels by banking them around a miniature pneumatic sorting table.

**Rare Friend role:** The Friend is the physical striker. Its position sets the shot’s origin; the player moves it to choose the angle.

**Core loop — 30–45 seconds:** Inspect one parcel, two bumpers, and a delivery chute. Position the Friend, aim, and choose shot strength. Finish within three shots. Desktop uses click/drag or directional controls; touch uses drag-and-release.

**Session arc:** Early tables teach one-wall rebounds; later tables introduce a moving gate or narrower chute. The session ends with a final sorting table that combines those rules.

**RF integration:** RF purchases sorting shifts. `buy` acquires shifts; `play` admits one three-shot challenge; `settle` issues an independent bureau souvenir; `redeem` exchanges it. Shots are local attempt limits, not separately purchased consumables.

**Visual hook:** A parcel ricochets through a perfect zigzag while the tiny Friend waits beside the launch line.

**Player decision:** Attempt a difficult direct shot or use a safer bank that consumes another shot.

**Skill vs chance:** Aim and geometry determine completion. The souvenir follows the fixed SDK table.

**Build surface:** **MEDIUM.**

**Main technical risk:** Predictable collision behavior and equally usable aiming on touch.

**Vibeathon connection:**

- **Character Spotlight:** The selected Friend initiates every shot.
- **Token Activity:** RF pays for bounded sorting challenges.
- **Economy Potential:** Understandable admission pricing without selling aim advantages or extra currencies.

## 8. Friend Printworks

**Gameplay family:** Crafting-like presentation / composition.

**Product thesis:** Making a distinctive object can be rewarding even when the object has no persistence or market value.

**One-sentence fantasy:** Your Friend operates a tiny printshop producing extravagant commemorative posters of itself.

**Rare Friend role:** The canonical Friend is both printer and poster subject. The selected artwork remains unchanged; the player composes the surrounding frame, text blocks, and background shapes.

**Core loop — 40–60 seconds:** Read a visual brief, choose three surrounding design elements, align their positions, and send the Friend through the printing stations. Reveal the assembled poster. Use selectable controls with keyboard access or touch.

**Session arc:** Early briefs emphasize simple balance; later briefs introduce awkward placements or contrasting compositions. Finish with a temporary gallery of three favorite posters.

**RF integration:** RF buys print runs. `buy` acquires runs; `play` consumes one; `settle` produces a random supplier-credit voucher; `redeem` recovers its fixed value. **The poster is local presentation, not an SDK inventory item, NFT, or redeemable creation.**

**Visual hook:** A giant finished poster slides from the press, with the same tiny Friend standing proudly beside it.

**Player decision:** Follow the brief precisely or make a stranger composition that the player personally prefers.

**Skill vs chance:** Composition is player-controlled. Supplier credit is independent of aesthetic quality.

**Build surface:** **MEDIUM.**

**Main technical risk:** Making a small set of composition choices produce visibly distinct results without turning into a full editor.

**Vibeathon connection:**

- **Character Spotlight:** The particular Friend’s artwork defines every creation.
- **Token Activity:** RF funds each production run.
- **Economy Potential:** Paid creative experiences without unsupported minting, sales, or creator royalties.

## 9. One More Floor

**Gameplay family:** Risk/reward / construction.

**Product thesis:** “Stop with something good or attempt one more improvement” can create tension without wagering RF rewards.

**One-sentence fantasy:** Your Friend builds a precarious tower and must decide when it is impressive enough to declare finished.

**Rare Friend role:** The Friend stands on the current floor and places each incoming section. Its height and precarious position make the accumulated achievement visible.

**Core loop — 30–60 seconds:** Slide an incoming floor into place, inspect the remaining support area, then choose another floor or finish the tower. Overhang reduces the next placement’s margin; a failed placement collapses the current attempt.

**Session arc:** Early towers use generous support. Later challenges change the visible floor sequence and invite the player to exceed their session best. The finale displays the tallest completed tower.

**RF integration:** RF purchases building permits. `buy` acquires permits; `play` starts one tower; `settle` grants a fixed-table commemorative plaque after finishing or collapse; `redeem` exchanges it. Height and stopping decisions never multiply or jeopardize RF.

**Visual hook:** Your Friend stands atop a wildly offset tower with one tiny strip of support beneath the next floor.

**Player decision:** Finish now or risk losing the current tower’s local achievement for greater height.

**Skill vs chance:** Placement and stopping are player-controlled; upcoming pieces are visible. Only the plaque is an SDK chance outcome.

**Build surface:** **MEDIUM.**

**Main technical risk:** Communicating the support threshold so collapse feels earned rather than arbitrary.

**Vibeathon connection:**

- **Character Spotlight:** The Friend’s increasingly precarious climb is the spectacle.
- **Token Activity:** Each construction attempt consumes an RF-funded permit.
- **Economy Potential:** Separates entertaining gameplay risk from backed financial rewards.

## 10. The Friend Show

**Gameplay family:** Spectator-style fantasy / performance direction.

**Product thesis:** A tiny character can feel like a celebrity through staging and audience reaction, without real multiplayer.

**One-sentence fantasy:** You direct your Friend’s forty-second television appearance before an increasingly excitable fictional audience.

**Rare Friend role:** The selected Friend is the performer, moving between stage marks and responding to cues. Camera framing celebrates its canonical appearance rather than replacing it with costumes or new animation assets.

**Core loop — 35–50 seconds:** Read a cue—entrance, surprise, finale—then choose the Friend’s stage position, spotlight, and reveal timing. Three large controls or their keyboard equivalents are sufficient.

**Session arc:** The first segment teaches the controls; later segments combine tighter cues and different audience preferences. The session ends with a closing number and a local applause grade.

**RF integration:** RF funds broadcast slots. `buy` purchases slots; `play` starts a segment; `settle` issues a random sponsor souvenir; `redeem` exchanges it. Audience applause has no RF value and does not alter sponsor odds.

**Visual hook:** The curtains part around your Friend while oversized fictional audience silhouettes erupt in applause.

**Player decision:** Deliver the expected cue cleanly or delay the reveal for a more dramatic finish and risk missing it.

**Skill vs chance:** Cue interpretation and timing control the performance. Sponsor souvenirs use the fixed table.

**Build surface:** **MEDIUM.**

**Main technical risk:** Producing expressive reactions with a tightly limited set of scenes and effects.

**Vibeathon connection:**

- **Character Spotlight:** The whole presentation exists to celebrate the selected Friend.
- **Token Activity:** RF buys bounded performance opportunities.
- **Economy Potential:** A production-budget and souvenir loop without real sponsors, tips, voting payments, or revenue sharing.

## Constraint screening and removal

**None of the ten bounded concepts above requires an unsupported SDK capability. Therefore, none is removed on SDK grounds at this stage.** Removing one merely to force a smaller list would be premature shortlisting.

Several concepts have important boundaries:

| Concept | Boundary that must remain intact | Screening result |
|---|---|---|
| Shadow Locksmith | Targets must work with the selected canonical artwork; no fabricated NFT traits or altered character art. | Retain; substantial content/legibility risk, not an API gap. |
| Museum of Almost Nothing | Exhibition briefs cannot mint rewards, consume sets, or increase redemption values. | Retain as session curation of existing inventory. |
| Friend Printworks | Posters cannot become persistent collectibles, minted NFTs, or saleable inventory. | Retain as temporary creative output. |
| One More Floor | Tower height cannot multiply RF, and collapse cannot confiscate owned rewards. | Retain with risk confined to local achievement. |
| The Friend Show | Audience and sponsors are explicitly fictional; no live spectators, remote votes, tips, or shared leaderboard. | Retain as a single-player performance fantasy. |
| All performance-based concepts | Success cannot improve SDK odds or trigger an additional RF payout. | Retain only with clearly independent rewards. |

The unsupported versions described in that table are excluded from further consideration.

There is also a **product-fit concern across several concepts**: an independent souvenir or rebate can feel incidental to the actual game. That is not a technical violation, but it matters when deciding how central RF should feel. Museum of Almost Nothing makes retention and redemption part of the player’s main decision; other concepts use RF primarily to finance an experience.

## Grouping the remaining concepts

These are groups by dominant player motivation, not rankings.

| Group | Concepts | Primary attraction |
|---|---|---|
| **Skill-first** | Pendulum Post; Last Lantern; Three Moves to Midnight; Pocket Billiards Bureau; One More Floor | Learn, execute, improve, and decide how much gameplay risk to take. |
| **Economy-first** | Midnight Diner; Museum of Almost Nothing | Manage a short operating session or decide what to retain versus redeem. The diner’s management challenge remains separate from RF yield. |
| **Spectacle-first** | Shadow Locksmith; Friend Printworks; The Friend Show | Produce a striking transformation, composition, or performance centered on the selected Friend. |

## Strong design ideas shared across them

- **Make the Friend causally necessary.** Its position should determine a jump, shot, route, service action, silhouette, or performance—not merely decorate the HUD.
- **Teach through one complete round.** The first 30–60 seconds should demonstrate the entire verb and its consequence, rather than explain a progression system.
- **Use a finite session finale.** A closing rush, final chamber, tallest tower, exhibition, or closing number gives a five-minute session a satisfying ending without durable saves.
- **Escalate combinations rather than features.** Reuse the same controls with tighter timing, competing priorities, or more interesting arrangements.
- **Make the screenshot a consequence of play.** The perfect landing, impossible tower, finished poster, or matching shadow should be something the player caused.
- **Let rewards have experiential value without inventing utility APIs.** Existing inventory can be displayed and curated; it need not become equipment, crafting material, or a new currency.
- **Keep gameplay success and RF outcome legible.** A great performance deserves strong local feedback even when the independently drawn SDK reward is ordinary.
- **Treat confirmations as part of the pacing.** Purchases and admissions belong before an attempt; redemption belongs between attempts. Repeated prompts inside the action would weaken these concepts.

## PRODUCT DECISIONS NEEDED BEFORE SHORTLISTING

1. **What should the player primarily feel?** Mastery, tension, thoughtful satisfaction, attachment, creative pride, or comic delight?

2. **How central should RF be to the experience?** The main decision—keep versus redeem—or a clearly explained budget for otherwise compelling gameplay?

3. **Is independent RF reward chance acceptable?** Several concepts rely on skill determining achievement while the SDK determines a separate reward. If that separation feels unsatisfying, it should materially narrow the shortlist.

4. **What should “my particular Friend” mean?** A beloved protagonist with visual continuity, or artwork that directly changes the puzzle/composition as in Shadow Locksmith and Printworks?

5. **How much failure pressure should the game create?** Gentle completion, repeat-until-mastered challenges, or voluntarily risking the current attempt’s local achievement?

6. **What should the player leave the session remembering?** A personal best, a completed sequence, a curated collection, a creation, or a dramatic performance?

7. **Which presentation tone fits the entry?** Cozy and affectionate, strange and funny, or tense and theatrical?

8. **Which Vibeathon connection should lead the product thesis?** Character Spotlight, simulated Token Activity, or Economy Potential—while treating the other two as supporting dimensions?

