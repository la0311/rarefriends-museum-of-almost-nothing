export type Slots = [number | null, number | null, number | null];
export type SecretTarget = 'echo' | 'variety';
export const emptySlots = (): Slots => [null, null, null];

export function pickSecretTarget(random: () => number = Math.random): SecretTarget {
  return random() < 0.5 ? 'echo' : 'variety';
}

export function displayed(slots: Slots, outcomeId: number): bigint {
  return BigInt(slots.filter(id => id === outcomeId).length);
}

export function available(inventory: readonly bigint[], slots: Slots, outcomeId: number): bigint {
  return (inventory[outcomeId - 1] ?? 0n) - displayed(slots, outcomeId);
}

export function assign(inventory: readonly bigint[], slots: Slots, index: number, outcomeId: number | null): Slots {
  if (index < 0 || index > 2 || !Number.isInteger(index)) return slots;
  if (outcomeId !== null && (outcomeId < 1 || outcomeId > 4 || !Number.isInteger(outcomeId))) return slots;
  if (slots[index] === outcomeId) return slots;
  if (outcomeId !== null && available(inventory, slots, outcomeId) < 1n) return slots;
  const next = [...slots] as Slots;
  next[index] = outcomeId;
  return next;
}

// SDK inventory is authoritative. Trim only the copies no longer backed by it.
// The highest-numbered matching plinth is cleared first.
export function reconcile(inventory: readonly bigint[], slots: Slots): Slots {
  const next = [...slots] as Slots;
  for (let outcomeId = 1; outcomeId <= 4; outcomeId++) {
    while (displayed(next, outcomeId) > (inventory[outcomeId - 1] ?? 0n)) {
      const index = next.lastIndexOf(outcomeId);
      if (index < 0) break;
      next[index] = null;
    }
  }
  return next;
}

export function redeemAffectedPlinth(inventory: readonly bigint[], slots: Slots, outcomeId: number): number | null {
  if (available(inventory, slots, outcomeId) > 0n) return null;
  const index = slots.lastIndexOf(outcomeId);
  return index < 0 ? null : index + 1;
}

export function echoOwnership(inventory: readonly bigint[]): { pair: boolean; different: boolean; ready: boolean } {
  const pair = inventory.some(quantity => quantity >= 2n);
  const different = inventory.some((quantity, index) => quantity >= 2n && inventory.some((other, otherIndex) => otherIndex !== index && other > 0n));
  return { pair, different, ready: different };
}

export function varietyOwnership(inventory: readonly bigint[]): { distinct: number; ready: boolean } {
  const distinct = inventory.filter(quantity => quantity > 0n).length;
  return { distinct, ready: distinct >= 3 };
}

export function echoDisplay(slots: Slots): { ready: boolean; oddPlinth: number | null } {
  if (slots.some(id => id === null)) return { ready: false, oddPlinth: null };
  for (let index = 0; index < 3; index++) {
    if (slots[index] !== slots[(index + 1) % 3] && slots[(index + 1) % 3] === slots[(index + 2) % 3]) {
      return { ready: true, oddPlinth: index + 1 };
    }
  }
  return { ready: false, oddPlinth: null };
}

export function varietyDisplay(slots: Slots): boolean {
  return slots.every(id => id !== null) && new Set(slots).size === 3;
}

export function targetReady(target: SecretTarget, inventory: readonly bigint[]): boolean {
  return target === 'echo' ? echoOwnership(inventory).ready : varietyOwnership(inventory).ready;
}

export function displayReady(target: SecretTarget, slots: Slots): boolean {
  return target === 'echo' ? echoDisplay(slots).ready : varietyDisplay(slots);
}

export function evaluateExhibition(target: SecretTarget, slots: Slots, order: readonly number[]): string | null {
  if (!displayReady(target, slots)) return target === 'echo' ? 'Display a matching pair and one different object.' : 'Display three different objects.';
  if (order.length !== 3 || new Set(order).size !== 3 || !order.every(index => index >= 1 && index <= 3)) return 'Present every displayed plinth exactly once.';
  if (target === 'echo' && order[2] !== echoDisplay(slots).oddPlinth) return 'Present the different object last.';
  return null;
}

export type SessionActivity = {
  permitsPurchased: number;
  expeditionsSettled: number;
  simulatedRfSpent: bigint;
  simulatedRfRedeemed: bigint;
  objectsRedeemed: number;
};
export const emptyActivity = (): SessionActivity => ({ permitsPurchased: 0, expeditionsSettled: 0, simulatedRfSpent: 0n, simulatedRfRedeemed: 0n, objectsRedeemed: 0 });
export function recordActivity(activity: SessionActivity, action: 'buy' | 'settle' | 'redeem', rf: bigint = 0n): SessionActivity {
  if (action === 'buy') return { ...activity, permitsPurchased: activity.permitsPurchased + 1, simulatedRfSpent: activity.simulatedRfSpent + rf };
  if (action === 'settle') return { ...activity, expeditionsSettled: activity.expeditionsSettled + 1 };
  return { ...activity, objectsRedeemed: activity.objectsRedeemed + 1, simulatedRfRedeemed: activity.simulatedRfRedeemed + rf };
}
