export type Slots = [number | null, number | null, number | null];
export type Brief = 'opening' | 'resemblance' | 'different';
export const emptySlots = (): Slots => [null, null, null];

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

export function feasible(inventory: readonly bigint[], brief: Brief): boolean {
  if (brief === 'opening') return inventory.some(quantity => quantity > 0n);
  if (brief === 'resemblance') return inventory.some(quantity => quantity >= 2n);
  return inventory.filter(quantity => quantity > 0n).length >= 2;
}

export function offeredBriefs(inventory: readonly bigint[], completedTours: number): Brief[] {
  if (!feasible(inventory, 'opening')) return [];
  if (completedTours === 0) return ['opening'];
  const pairs: Brief[] = ['resemblance', 'different'];
  const offered = pairs.filter(brief => feasible(inventory, brief));
  return offered.length ? offered : ['opening'];
}

export function evaluateBrief(brief: Brief, slots: Slots, order: readonly number[]): string | null {
  const occupied = slots.map((id, index) => id === null ? -1 : index + 1).filter(index => index > 0);
  const uniqueOrder = order.length === occupied.length && new Set(order).size === order.length && order.every(index => occupied.includes(index));
  if (!uniqueOrder) return 'Present every occupied plinth exactly once.';
  if (brief === 'opening') return occupied.length === 1 ? null : 'Opening Remarks needs exactly one displayed object.';
  if (occupied.length !== 2) return 'This brief needs exactly two displayed objects.';
  const [left, right] = occupied;
  const same = slots[left - 1] === slots[right - 1];
  if (brief === 'resemblance' && !same) return 'Display two copies of the same object.';
  if (brief === 'different' && same) return 'Display two different object types.';
  return order[0] === left && order[1] === right ? null : 'Present the left occupied plinth before the right.';
}

export function finaleTarget(inventory: readonly bigint[]): number {
  return Math.min(3, Number(inventory.reduce((sum, quantity) => sum + quantity, 0n)));
}

export function evaluateFinale(inventory: readonly bigint[], slots: Slots, order: readonly number[]): string | null {
  const target = finaleTarget(inventory);
  if (target === 0) return 'Nothing remained on loan.';
  const occupied = slots.map((id, index) => id === null ? -1 : index + 1).filter(index => index > 0);
  if (occupied.length !== target) return `Display exactly ${target} owned ${target === 1 ? 'object' : 'objects'} for the Final Exhibition.`;
  if (target === 1 && occupied[0] !== 2) return 'Place the single object on the center plinth.';
  if (order.length !== target || new Set(order).size !== target || !order.every(index => occupied.includes(index))) return 'Present every displayed plinth exactly once.';
  if (target === 2) {
    const relationship: Brief = slots[occupied[0] - 1] === slots[occupied[1] - 1] ? 'resemblance' : 'different';
    return evaluateBrief(relationship, slots, order);
  }
  if (target === 3 && order.at(-1) !== 2) return 'Save the center plinth for the final presentation.';
  return null;
}
