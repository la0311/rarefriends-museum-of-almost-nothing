# Museum of Almost Nothing

G0 bootstrap / G1 vertical slice. Simulated RF only; full runtime reload resets the session.
Run from project root: npm run dev. Build: npm run build. Check: npm run check.
Canonical Friend artwork uses the pinned FriendSDK public sprite API; artwork credits: Rare Friends, see SDK NOTICE.md.
Provisional G1 terms (G2 balance pending): permit 6 RF; Pebble 40% / 2 RF, Twig 35% / 2 RF, Paperclip 15% / 3 RF, Button 10% / 4 RF. Redemption values are fixed SDK terms; redemption UI is outside G1.

Controls: Tab / Enter / Space or tap. Buy permit, Send expedition, Keep, Place, Begin tour, Direct Friend, Present. One active plinth, Opening Remarks only. Keep and tour make no SDK mutations. Immediate position changes preserve reduced-motion rules. Runtime pause blocks actions. At widths up to 500px the supported host frame uses a taller 3:4 ratio, leaving every G1 action above the trusted runtime controls without child scrolling. Expedition terms open in a contained, keyboard-accessible panel before purchase. No audio. Automated fixture test: npm run test:game. Real wallet validation remains pending.
