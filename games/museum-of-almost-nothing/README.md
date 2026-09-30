# Museum of Almost Nothing

G2 minimum playable session. Four fixed SDK outcomes, three local plinth assignments, feasible briefs, one-copy redemption and an adaptive Final Exhibition. Simulated RF only; full runtime reload resets the session.

Run from project root: npm run dev. Validate: npm run typecheck, npm run check, npm run build, node tests/museum-rules.mjs and npm run test:game.

Final economy: one permit 6 RF. Unremarkable Pebble 40% / 2 RF, Very Short Twig 35% / 2 RF, Unbent Paperclip 15% / 3 RF, Unattached Button 10% / 4 RF. Weights total 10,000 basis points. Expected redemption is 2.35 RF. Starting 20 RF buys three permits and leaves 2 RF; two common redemptions can make a fourth possible, subject to SDK backing.

Controls: Tab / Enter / Space or tap. Select a type in the owned inventory tray; select plinth 1–3; Place/Replace or Remove. Owned, Displayed and Available are based on the SDK's aggregate inventory. Choose a feasible brief, Begin tour, direct the Friend to occupied plinths and explicitly Present each one. Opening Remarks uses one object; the two required relationship briefs use an identical or different pair with left-before-right order. Tour failure/retry is local and free.

Final Exhibition opens after the first successful tour. It uses one centered copy, two copies in the applicable relationship with left-before-right presentation, or three copies with the center presented last. Every nonempty collection can finish; an empty closure is explicitly non-successful. No tour outcome awards RF.

Redeem previews the fixed value, new owned count and affected plinth before runtime confirmation. It redeems one copy, preferring undisplayed stock; otherwise the highest-numbered matching plinth clears only after an authoritative re-read. Uncertain mutation outcomes require another SDK read; read failure blocks mutations until Retry succeeds. Keep and curation never mutate SDK state.

Canonical Friend artwork uses the pinned FriendSDK sprite API; art credits: Rare Friends, see SDK NOTICE.md. Runtime pause blocks actions; reduced motion uses the same immediate movement rules. No audio. At widths up to 500px the supported host frame uses a taller 3:4 ratio, with current-state actions above the trusted runtime controls and no child scrolling. Expedition Terms and Redeem previews use contained keyboard-accessible dialogs.

Owner confirmed G1 real-wallet gameplay, ownership and canonical art on desktop and mobile. G2 needs owner playtest before G3 shipping.
