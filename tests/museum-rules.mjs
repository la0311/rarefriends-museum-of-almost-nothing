import assert from 'node:assert/strict';
import { assign, available, displayReady, displayed, echoDisplay, echoOwnership, emptyActivity, emptySlots, evaluateExhibition, pickSecretTarget, reconcile, recordActivity, redeemAffectedPlinth, targetReady, varietyDisplay, varietyOwnership } from '../games/museum-of-almost-nothing/rules.ts';

assert.equal(pickSecretTarget(() => 0), 'echo');
assert.equal(pickSecretTarget(() => 0.499), 'echo');
assert.equal(pickSecretTarget(() => 0.5), 'variety');
assert.equal(pickSecretTarget(() => 0.999), 'variety');
for (let index = 0; index < 100; index++) assert(['echo', 'variety'].includes(pickSecretTarget()), 'selector only yields two targets');

const pairOnly = [2n, 0n, 0n, 0n];
const pairDifferent = [2n, 1n, 0n, 0n];
const threeDistinct = [1n, 1n, 1n, 0n];
assert.deepEqual(echoOwnership(pairDifferent), { pair: true, different: true, ready: true });
for (const stock of [pairOnly, threeDistinct, [3n, 0n, 0n, 0n]]) assert.equal(targetReady('echo', stock), false);
assert.equal(targetReady('echo', pairDifferent), true);
assert.deepEqual(varietyOwnership(threeDistinct), { distinct: 3, ready: true });
assert.equal(targetReady('variety', threeDistinct), true);
for (const stock of [pairOnly, pairDifferent, [0n, 0n, 0n, 0n]]) assert.equal(targetReady('variety', stock), false);

assert.deepEqual(echoDisplay([1, 2, 1]), { ready: true, oddPlinth: 2 });
assert.equal(displayReady('echo', [1, 1, 2]), true);
assert.equal(displayReady('echo', [1, 1, 1]), false);
assert.equal(displayReady('echo', [1, 2, 3]), false);
assert.equal(varietyDisplay([1, 2, 3]), true);
assert.equal(varietyDisplay([1, 1, 2]), false);
assert.equal(evaluateExhibition('echo', [1, 1, 2], [2, 1, 3]), null);
assert.match(evaluateExhibition('echo', [1, 1, 2], [3, 1, 2]), /different object last/);
assert.match(evaluateExhibition('echo', [1, 1, 2], [1, 1, 3]), /exactly once/);
assert.equal(evaluateExhibition('variety', [1, 2, 3], [3, 1, 2]), null);
assert.equal(evaluateExhibition('variety', [1, 2, 3], [2, 3, 1]), null);
assert.match(evaluateExhibition('variety', [1, 1, 2], [1, 2, 3]), /three different/);

let slots = emptySlots();
slots = assign([3n, 1n, 0n, 0n], slots, 0, 1);
slots = assign([3n, 1n, 0n, 0n], slots, 1, 1);
slots = assign([3n, 1n, 0n, 0n], slots, 2, 2);
assert.deepEqual(slots, [1, 1, 2]);
assert.equal(displayed(slots, 1), 2n);
assert.equal(available([3n, 1n, 0n, 0n], slots, 1), 1n);
assert.equal(redeemAffectedPlinth([3n, 1n, 0n, 0n], slots, 1), null);
assert.equal(redeemAffectedPlinth(pairDifferent, slots, 1), 2);
assert.deepEqual(reconcile([1n, 1n, 0n, 0n], slots), [1, null, 2]);
assert.equal(targetReady('echo', [1n, 1n, 0n, 0n]), false, 'redeem can remove readiness');
assert.equal(echoOwnership([1n, 1n, 0n, 0n]).pair, false, 'checklist updates after redeem');
assert.deepEqual(reconcile([0n, 1n, 0n, 0n], slots), [null, null, 2]);
assert.deepEqual(assign([2n, 1n, 0n, 0n], [1, 1, 2], 2, 1), [1, 1, 2], 'cannot over-allocate');

const start = emptyActivity();
const bought = recordActivity(start, 'buy', 6n);
const settled = recordActivity(bought, 'settle');
const redeemed = recordActivity(settled, 'redeem', 2n);
assert.deepEqual(redeemed, { permitsPurchased: 1, expeditionsSettled: 1, simulatedRfSpent: 6n, simulatedRfRedeemed: 2n, objectsRedeemed: 1 });
assert.equal(redeemed.simulatedRfSpent - redeemed.simulatedRfRedeemed, 4n);
assert.deepEqual(start, emptyActivity(), 'cancelled actions and tours do not mutate activity');
console.log('PASS museum rules: deterministic target selection, both ownership/display/tour predicates, redeem reconciliation, session activity.');
