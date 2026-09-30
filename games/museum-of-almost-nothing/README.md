# Museum of Almost Nothing — game package

The current Vibeathon build selects THE ECHO or THE VARIETY as a local Secret Exhibition target. Players buy 6 simulated RF permits, settle random expeditions, Keep or Redeem finds, arrange three owned objects, direct their canonical Friend through a player-chosen tour, and explicitly Present each plinth. THE ECHO needs an A/A/B display with B Presented last; THE VARIETY needs A/B/C in any Present order. A failed tour can be retried without an RF cost.

FriendSDK v0.1.4 owns the simulated RF ledger, permits, outcomes, and aggregate inventory. The four outcomes are Pebble 40% / 2 RF, Twig 35% / 2 RF, Paperclip 15% / 3 RF, and Button 10% / 4 RF fixed redemption. Tour results never mutate RF or odds. The Token Activity summary records only local confirmed permit, settlement, and redemption activity. No live RF is burned or spent.

Use Tab / Enter / Space or touch. Select an owned type and a numbered plinth, then Place, Replace, or Remove. Prepare and begin the Final Exhibition once the target display is ready; direct the Friend to each occupied plinth and press Present. Redeem previews the fixed value and affected display before runtime confirmation. Keep and curation make no SDK economic mutation.

Run from the project root with `npm ci` and `npm run dev`. Validate with `npm run typecheck`, `npm run check`, `npm run build`, `node tests/museum-rules.mjs`, and `npm run test:game`. See the [root README](../../README.md) for preview, wallet, controls, credits, and limitations.
