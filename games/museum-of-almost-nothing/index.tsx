import { useEffect, useRef, useState } from 'react';
import type { GameComponentProps } from '@rarefriends/friendsdk/runtime';
import { RF, type GameSnapshot } from '@rarefriends/friendsdk/game';
import { createFriendReader, spriteFrame, type GenerationSprites } from '@rarefriends/friendsdk/sprites';
import { objects } from './catalog';
import { assign, available, displayed, emptySlots, evaluateBrief, evaluateFinale, feasible, finaleTarget, offeredBriefs, reconcile, redeemAffectedPlinth, type Brief, type Slots } from './rules';
import './style.css';

type Tour = 'curate' | 'entrance' | 'at-plinth' | 'complete' | 'closed';
const briefNames: Record<Brief, string> = {
  opening: 'Opening Remarks',
  resemblance: 'A Remarkable Resemblance',
  different: 'Two Entirely Different Things',
};
const briefDirections: Record<Brief, string> = {
  opening: 'Display exactly one object and Present it.',
  resemblance: 'Display exactly two of the same type; Present left before right.',
  different: 'Display exactly two different types; Present left before right.',
};
const amount = (value: bigint) => String(value / RF) + (value % RF ? '.' + (value % RF).toString().padStart(18, '0').replace(/0+$/, '') : '');
function ObjectArt({ id }: { id: number }) {
  return <span aria-hidden="true" className={'object ' + objects[id - 1].shape} />;
}

export default function Museum({ friendId, client, paused }: GameComponentProps) {
  const [snapshot, setSnapshot] = useState<GameSnapshot>();
  const [sprites, setSprites] = useState<GenerationSprites>();
  const [artError, setArtError] = useState(false);
  const [readError, setReadError] = useState(false);
  const [retryArt, setRetryArt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('Loading your collection…');
  const [reveal, setReveal] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [slots, setSlots] = useState<Slots>(emptySlots);
  const [brief, setBrief] = useState<Brief | null>('opening');
  const [completedTours, setCompletedTours] = useState(0);
  const [finale, setFinale] = useState(false);
  const [tour, setTour] = useState<Tour>('curate');
  const [tourSlots, setTourSlots] = useState<Slots | null>(null);
  const [destination, setDestination] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [redeemPreview, setRedeemPreview] = useState<number | null>(null);
  const [hidden, setHidden] = useState(document.hidden);
  const [terms, setTerms] = useState(false);
  const locked = useRef(false);
  const termsButton = useRef<HTMLButtonElement>(null);
  const redeemButton = useRef<HTMLButtonElement>(null);
  const mounted = useRef(true);
  const stopped = paused || hidden;
  const canInteract = !stopped && !busy && !readError && !terms && redeemPreview === null && !!snapshot && !!sprites;
  const inventory: readonly bigint[] = snapshot?.inventory ?? [0n, 0n, 0n, 0n];
  const owned = (id: number, state = snapshot) => state?.inventory[id - 1] ?? 0n;
  const pending = snapshot?.plays.find(play => play.outcomeId === null);
  const activeTour = tour === 'entrance' || tour === 'at-plinth';
  const currentSlots = tourSlots && tour !== 'curate' ? tourSlots : slots;
  const occupied = currentSlots.map((id, index) => id === null ? -1 : index + 1).filter(index => index > 0);
  const offered = offeredBriefs(inventory, completedTours);
  const finalTarget = finaleTarget(inventory);

  const apply = (state: GameSnapshot) => {
    if (!mounted.current) return;
    if (state.friendId !== friendId || state.mode !== 'preview') throw new Error('Unexpected session');
    setSnapshot(state);
    setReadError(false);
    setSlots(previous => reconcile(state.inventory, previous));
    setSelected(id => id && state.inventory[id - 1] > 0n ? id : null);
    setReveal(id => id && state.inventory[id - 1] > 0n ? id : null);
    setBrief(current => current && feasible(state.inventory, current) ? current : completedTours === 0 && feasible(state.inventory, 'opening') ? 'opening' : null);
  };
  const read = async () => { const state = await client.read(); apply(state); return state; };
  useEffect(() => {
    mounted.current = true;
    setSnapshot(undefined); setSlots(emptySlots()); setSelected(null); setSelectedSlot(null);
    setReveal(null); setBrief('opening'); setCompletedTours(0); setFinale(false);
    setTour('curate'); setTourSlots(null); setDestination(null); setOrder([]); setResult(null);
    read().then(() => { if (mounted.current) setMessage('Fund your first expedition.'); })
      .catch(() => { if (mounted.current) { setReadError(true); setMessage('Collection unavailable. Retry before continuing.'); } });
    return () => { mounted.current = false; };
  }, [client, friendId]);
  useEffect(() => {
    let active = true; setSprites(undefined); setArtError(false);
    createFriendReader().read(friendId).then(art => { if (active) setSprites(art); }).catch(() => { if (active) setArtError(true); });
    return () => { active = false; };
  }, [friendId, retryArt]);
  useEffect(() => {
    const change = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', change);
    return () => document.removeEventListener('visibilitychange', change);
  }, []);

  async function action(kind: 'buy' | 'play' | 'resume' | 'read') {
    if (locked.current || stopped || (kind !== 'read' && (!canInteract || tour !== 'curate' || finale))) return;
    locked.current = true; setBusy(true);
    setMessage(kind === 'buy' ? 'Confirm your permit in the runtime.' : kind === 'read' ? 'Checking your collection…' : 'Preparing your expedition…');
    try {
      if (kind === 'read') {
        const state = await read();
        if (brief && !feasible(state.inventory, brief)) { setBrief(null); setMessage('Collection changed; selected brief is no longer feasible. Choose another.'); }
        else setMessage('Collection checked.');
        return;
      }
      if (client.mode !== 'preview') throw new Error('Preview only');
      let state = await read();
      if (kind === 'buy') {
        if (state.plays.some(play => play.outcomeId === null) || state.consumables > 0n) { setMessage('Use your existing expedition before buying another permit.'); return; }
        if (state.rfBalance < client.definition.price) { setMessage('Not enough simulated RF. You can curate or redeem a copy.'); return; }
        if (!await client.canBuy(1n)) { setMessage('The simulation cannot back another permit. You can still curate.'); return; }
        await client.buy(1n); await read(); setMessage('One permit ready. Send your expedition.'); return;
      }
      let play = state.plays.find(item => item.outcomeId === null);
      if (!play && kind === 'resume') { setMessage('No pending expedition. Collection checked.'); return; }
      if (!play) {
        if (state.consumables < 1n) { setMessage('Buy one permit first.'); return; }
        const plays = await client.play(1n); play = plays[0];
        if (!play) throw new Error('No play returned');
      }
      state = await read();
      const recorded = state.plays.find(item => item.id === play!.id);
      if (!recorded) throw new Error('Play not confirmed');
      if (recorded.outcomeId === null) { setMessage('Settling your expedition…'); await client.settle(recorded.id); }
      state = await read();
      const settled = state.plays.find(item => item.id === recorded.id);
      if (!settled?.outcomeId || !objects[settled.outcomeId - 1] || state.inventory[settled.outcomeId - 1] < 1n) throw new Error('Outcome not confirmed');
      setReveal(settled.outcomeId); setSelected(null); setMessage('Settled and owned. Decide it matters.');
    } catch {
      try { await read(); setMessage('Action cancelled or not completed. Collection checked; nothing will retry automatically.'); }
      catch { setReadError(true); setMessage('We could not confirm your collection. Actions are locked until Retry succeeds.'); }
    } finally { locked.current = false; if (mounted.current) setBusy(false); }
  }

  function local(fn: () => void) { if (canInteract) fn(); }
  function keep() {
    local(() => {
      if (reveal && owned(reveal) > 0n) { setSelected(reveal); setReveal(null); setMessage('Kept for exhibition. Choose a plinth, then Place.'); }
    });
  }
  function selectPlinth(index: number) {
    local(() => {
      if (tour === 'curate') { setSelectedSlot(index); setMessage('Plinth ' + (index + 1) + ' selected.'); return; }
      if (tour === 'entrance' && currentSlots[index] !== null && !order.includes(index + 1)) {
        setDestination(index + 1); setTour('at-plinth');
        setMessage('Your curator is at plinth ' + (index + 1) + '. Select Present.');
      }
    });
  }
  function place() {
    local(() => {
      if (tour !== 'curate' || selected === null || selectedSlot === null) return;
      const next = assign(inventory, slots, selectedSlot, selected);
      if (next === slots) {
        setMessage(slots[selectedSlot] === selected ? 'That object is already here.' : 'No undisplayed copy is available for that plinth.');
        return;
      }
      setSlots(next); setMessage('Plinth ' + (selectedSlot + 1) + ' now displays ' + objects[selected - 1].name + '.');
    });
  }
  function remove() {
    local(() => {
      if (tour !== 'curate' || selectedSlot === null || slots[selectedSlot] === null) return;
      setSlots(assign(inventory, slots, selectedSlot, null)); setMessage('Plinth ' + (selectedSlot + 1) + ' cleared. The copy remains owned.');
    });
  }
  function begin() {
    local(() => {
      if (tour !== 'curate' || occupied.length === 0) return;
      if (!finale && !brief) { setMessage('Choose a feasible brief first.'); return; }
      setTourSlots([...slots] as Slots); setTour('entrance'); setDestination(null); setOrder([]); setResult(null);
      setMessage('Choose an occupied plinth for your Friend.');
    });
  }
  function present() {
    local(() => {
      if (tour !== 'at-plinth' || destination === null || order.includes(destination) || currentSlots[destination - 1] === null) return;
      const next = [...order, destination];
      setOrder(next);
      if (next.length < occupied.length) {
        setTour('entrance'); setDestination(null);
        setMessage('Presented plinth ' + destination + '. Choose another occupied plinth.');
        return;
      }
      const mismatch = finale ? evaluateFinale(inventory, currentSlots, next) : evaluateBrief(brief!, currentSlots, next);
      setResult(mismatch);
      if (mismatch) { setTour('complete'); setMessage('Brief missed. ' + mismatch + ' Retry costs nothing.'); }
      else if (finale) { setTour('closed'); setMessage('Final Exhibition complete. The museum closes for this session.'); }
      else { setTour('complete'); setCompletedTours(value => value + 1); setMessage('Brief met. Of considerable importance.'); }
    });
  }
  function endTour() {
    local(() => { setTour('curate'); setTourSlots(null); setDestination(null); setOrder([]); setResult(null); setMessage('Rehearsal ended. Nothing was spent.'); });
  }
  function retry() {
    local(() => { setTour('entrance'); setDestination(null); setOrder([]); setResult(null); setMessage('Choose an occupied plinth for a free retry.'); });
  }
  function returnToCuration() {
    local(() => {
      setTour('curate'); setTourSlots(null); setDestination(null); setOrder([]); setResult(null);
      if (!finale && completedTours > 0) setBrief(null);
      setMessage('Arrange again, choose a brief or fund another expedition.');
    });
  }
  function startFinale() {
    local(() => { setFinale(true); setBrief(null); setResult(null); setMessage(finalTarget ? 'Arrange ' + finalTarget + ' owned ' + (finalTarget === 1 ? 'object' : 'objects') + ' for the Final Exhibition.' : 'Nothing remained on loan.'); });
  }
  function leaveFinale() {
    local(() => { setFinale(false); setBrief(null); setResult(null); setMessage('Choose a feasible brief or continue curating.'); });
  }
  function closeRedeem() { setRedeemPreview(null); requestAnimationFrame(() => redeemButton.current?.focus()); }
  async function redeem() {
    const id = redeemPreview;
    if (!id || locked.current || stopped || busy || readError || tour !== 'curate' || finale || !snapshot) return;
    locked.current = true; setBusy(true);
    setMessage('Confirm one-copy redemption in the runtime.');
    try {
      const before = await read();
      if (before.inventory[id - 1] < 1n || before.inventory[id - 1] !== snapshot.inventory[id - 1]) {
        setMessage('Collection changed. Review redemption again.'); return;
      }
      const affected = redeemAffectedPlinth(before.inventory, slots, id);
      await client.redeem(id, 1n);
      const after = await read();
      if (after.inventory[id - 1] !== before.inventory[id - 1] - 1n) throw new Error('Redemption not confirmed');
      if (brief && !feasible(after.inventory, brief)) {
        setBrief(null);
        setMessage('Redeeming made the selected brief impossible. Choose a feasible brief.');
      } else {
        setMessage('Redeemed one ' + objects[id - 1].name + ' for simulated RF.' + (affected ? ' Plinth ' + affected + ' was cleared.' : ' Display unchanged.'));
      }
    } catch {
      try {
        const after = await read();
        if (brief && !feasible(after.inventory, brief)) { setBrief(null); setMessage('Inventory changed; selected brief is no longer feasible. Choose another.'); }
        else if (after.inventory[id - 1] === snapshot.inventory[id - 1] - 1n) {
          const affected = redeemAffectedPlinth(snapshot.inventory, slots, id);
          setMessage('Redemption confirmed after recheck.' + (affected ? ' Plinth ' + affected + ' was cleared.' : ' Display unchanged.'));
        } else setMessage('Redemption cancelled or uncertain. Collection rechecked; no automatic retry.');
      } catch { setReadError(true); setMessage('Redemption state could not be confirmed. Actions are locked until Retry succeeds.'); }
    } finally { closeRedeem(); locked.current = false; if (mounted.current) setBusy(false); }
  }
  function closeTerms() { setTerms(false); requestAnimationFrame(() => termsButton.current?.focus()); }

  const atPlinth = destination !== null && tour !== 'curate';
  const rows = sprites ? spriteFrame(sprites, atPlinth ? 'up' : 'down', false, 0).frame.rows : [];
  const tourResult = tour === 'complete' || tour === 'closed';
  const briefTitle = finale ? 'Final Exhibition' : brief ? briefNames[brief] : 'Choose a brief';
  const finalPair = occupied.length === 2 ? currentSlots[occupied[0] - 1] === currentSlots[occupied[1] - 1] ? briefNames.resemblance : briefNames.different : 'Two owned objects';
  const finalDirection = finalTarget === 1 ? 'One owned object on the center plinth; Present it.' :
    finalTarget === 2 ? finalPair + '; Present left before right.' :
      finalTarget === 3 ? 'Three owned objects; Present the center plinth last.' : 'Nothing remained on loan.';
  return <main className="museum" data-paused={stopped} data-phase={tour}>
    <header><h1>Museum of Almost Nothing</h1><p className="disclosure">A session exhibition · Simulated RF · Resets on full reload</p>
      <div className="ledger" data-testid="ledger"><span>{snapshot ? amount(snapshot.rfBalance) : '…'} simulated RF</span><span>{snapshot?.consumables.toString() ?? '…'} permits</span><span>{snapshot?.inventory.reduce((a, b) => a + b, 0n).toString() ?? '…'} owned</span></div>
    </header>
    <section className="room" aria-label="Museum room">
      <div className="inscription">An institution of very little consequence.</div>
      <div className="brief"><h2>{briefTitle}</h2><p>{finale ? finalDirection : brief ? briefDirections[brief] : 'Choose a brief from the feasible collection below.'}</p></div>
      <div className="exhibits">
        {currentSlots.map((id, index) => <button key={index} type="button" className={'exhibit' + (selectedSlot === index && tour === 'curate' ? ' chosen' : '') + (order.includes(index + 1) ? ' presented' : '')}
          aria-label={tour === 'entrance' ? 'Direct Friend to plinth ' + (index + 1) : 'Select plinth ' + (index + 1)}
          aria-pressed={tour === 'curate' && selectedSlot === index}
          disabled={!canInteract || (tour !== 'curate' && (tour !== 'entrance' || id === null || order.includes(index + 1)))}
          onClick={() => selectPlinth(index)}>
          <span className="exhibit-art">{id ? <ObjectArt id={id} /> : null}</span>
          <span className="plinth">{index + 1}</span>
          <span className="exhibit-label">{id ? objects[id - 1].name : 'Empty'}</span>
          {order.includes(index + 1) && <span className="order-marker">{order.indexOf(index + 1) + 1}</span>}
        </button>)}
      </div>
      {sprites && <svg role="img" aria-label="Your selected Rare Friend" viewBox="0 0 16 16"
        className={'friend' + (atPlinth ? ' at-plinth' : '')}
        style={atPlinth ? { left: String(16 + (destination! - 1) * 34) + '%' } : undefined}
        data-position={atPlinth ? 'plinth-' + destination : 'entrance'}>
        {rows.flatMap((row, y) => [...row].map((pixel, x) => pixel === '#' ? <rect key={x + '-' + y} x={x} y={y} width="1" height="1" /> : null))}
      </svg>}
    </section>
    <section className="controls" aria-label="Museum actions">
      {artError ? <><p role="alert">Your curator couldn’t be loaded.</p><button disabled={stopped} onClick={() => setRetryArt(value => value + 1)}>Retry artwork</button></> : !sprites ? <p>Loading canonical Friend artwork…</p> : null}
      {readError && <button disabled={stopped || busy} onClick={() => void action('read')}>Retry collection</button>}
      <p className="instruction" aria-live="polite">{stopped ? 'Museum paused.' : message}</p>
      {tourResult && <div className="result" role="status">
        <strong>{tour === 'closed' && result ? 'Nothing remained on loan.' : result ? 'Brief missed.' : tour === 'closed' ? 'Final Exhibition complete.' : 'Brief met. Of considerable importance.'}</strong>
        <p>{result ?? 'Presented plinths ' + order.join(' → ') + '.'}</p>
        <b>{tour === 'closed' && result ? 'No successful exhibition · No RF awarded.' : 'Tour result only — no RF awarded.'}</b>
        {tour === 'closed' && <small>Session exhibition · {snapshot ? amount(snapshot.rfBalance) : '…'} simulated RF · Resets on full reload</small>}
      </div>}
      {reveal ? <div className="reveal" aria-label="Settled object"><ObjectArt id={reveal} /><div><h2>{objects[reveal - 1].name}</h2><p>{objects[reveal - 1].description}</p><p>Owned {owned(reveal).toString()} · Fixed value {amount(client.definition.outcomes[reveal - 1].reward)} simulated RF</p></div><button disabled={!canInteract} onClick={keep}>Keep for exhibition</button><small>Already in your collection. Keep makes no SDK transaction.</small></div> : <>
        {tour === 'curate' && !finale && <div className="actions economy">
          {pending ? <button disabled={!canInteract} onClick={() => void action('resume')}>Resume expedition</button> : snapshot && snapshot.consumables > 0n ? <button disabled={!canInteract} onClick={() => void action('play')}>Send expedition</button> : <button disabled={!canInteract} onClick={() => void action('buy')}>Buy permit · {amount(client.definition.price)} RF</button>}
          {selected && owned(selected) > 0n && <button ref={redeemButton} className="secondary" disabled={!canInteract} onClick={() => setRedeemPreview(selected)}>Redeem one · {amount(client.definition.outcomes[selected - 1].reward)} RF</button>}
        </div>}
        {tour === 'curate' && snapshot && inventory.some(quantity => quantity > 0n) && <div className="collection" aria-label="Owned objects">
          {objects.map((object, index) => owned(index + 1) > 0n && <button key={object.name} aria-pressed={selected === index + 1} disabled={!canInteract}
            onClick={() => local(() => { setSelected(index + 1); setMessage(object.name + ' selected. Choose a plinth, then Place.'); })}>
            <span className="inventory-name">{object.name}</span><span className="inventory-count">Owned {owned(index + 1).toString()} · Displayed {displayed(slots, index + 1).toString()} · Available {available(inventory, slots, index + 1).toString()}</span>
          </button>)}
        </div>}
        {tour === 'curate' && <div className="actions curation">
          {selected && selectedSlot !== null && <button disabled={!canInteract || (slots[selectedSlot] !== selected && available(inventory, slots, selected) < 1n)} onClick={place}>{slots[selectedSlot] ? 'Replace plinth ' : 'Place on plinth '}{selectedSlot + 1}</button>}
          {selectedSlot !== null && slots[selectedSlot] !== null && <button className="secondary" disabled={!canInteract} onClick={remove}>Remove plinth {selectedSlot + 1}</button>}
          {finale ? <button className="secondary" disabled={!canInteract} onClick={leaveFinale}>Return to briefs</button> : completedTours > 0 && <button className="secondary" disabled={!canInteract} onClick={startFinale}>Final Exhibition</button>}
        </div>}
        {tour === 'curate' && !finale && offered.length > 0 && <div className="brief-options" aria-label="Feasible briefs">
          {offered.map(id => <button key={id} className="secondary" aria-pressed={brief === id} disabled={!canInteract}
            onClick={() => local(() => { setBrief(id); setMessage(briefDirections[id]); })}>{briefNames[id]}</button>)}
        </div>}
        {tour === 'curate' && <div className="actions"><button disabled={!canInteract || occupied.length === 0 || (!finale && !brief) || (finale && finalTarget === 0)} onClick={begin}>{finale ? 'Begin Final Exhibition' : 'Begin tour'}</button>
          {finale && finalTarget === 0 && <button disabled={!canInteract} onClick={() => local(() => { setTour('closed'); setResult('Nothing remained on loan.'); setMessage('Nothing remained on loan.'); })}>Close empty exhibition</button>}
        </div>}
        {tour === 'at-plinth' && <div className="actions"><button disabled={!canInteract} onClick={present}>Present plinth {destination}</button><button className="secondary" disabled={!canInteract} onClick={endTour}>End rehearsal</button></div>}
        {tour === 'entrance' && <div className="actions"><span className="destination-prompt">Choose an occupied, unpresented plinth above.</span><button className="secondary" disabled={!canInteract} onClick={endTour}>End rehearsal</button></div>}
        {tour === 'complete' && <div className="actions">{result && <button disabled={!canInteract} onClick={retry}>Retry tour</button>}<button disabled={!canInteract} onClick={returnToCuration}>Return to curation</button></div>}
        {tour === 'closed' && <div className="actions"><button disabled={!canInteract} onClick={returnToCuration}>Return to curation</button></div>}
      </>}
      <button ref={termsButton} className="terms-toggle" disabled={stopped || busy || redeemPreview !== null} aria-haspopup="dialog" aria-expanded={terms} onClick={() => setTerms(true)}>Expedition terms</button>
    </section>
    {redeemPreview !== null && <div className="terms-backdrop"><div className="terms" role="dialog" aria-modal="true" aria-labelledby="redeem-title"
      onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); if (!busy) closeRedeem(); } if (event.key === 'Tab') { const buttons = [...event.currentTarget.querySelectorAll('button')]; if (buttons.length) { event.preventDefault(); (document.activeElement === buttons[0] ? buttons[1] : buttons[0]).focus(); } } }}>
      <h2 id="redeem-title">Redeem one {objects[redeemPreview - 1].name}?</h2>
      <p>Fixed value: <strong>{amount(client.definition.outcomes[redeemPreview - 1].reward)} simulated RF</strong>.</p>
      <p>Owned after redemption: <strong>{owned(redeemPreview) > 0n ? (owned(redeemPreview) - 1n).toString() : '0'}</strong>.</p>
      <p>{redeemAffectedPlinth(inventory, slots, redeemPreview) ? 'Plinth ' + redeemAffectedPlinth(inventory, slots, redeemPreview) + ' will be cleared after confirmation.' : 'Displayed objects stay in place; an undisplayed copy is redeemed.'}</p>
      <p>The runtime asks for confirmation next. No particular specimen is identified.</p>
      <div className="dialog-actions"><button autoFocus disabled={stopped || busy} onClick={() => void redeem()}>Continue to confirmation</button><button className="secondary" disabled={busy} onClick={closeRedeem}>Cancel</button></div>
    </div></div>}
    {terms && <div className="terms-backdrop"><div className="terms" role="dialog" aria-modal="true" aria-labelledby="terms-title"
      onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); closeTerms(); } if (event.key === 'Tab') { event.preventDefault(); (event.currentTarget.querySelector('button') as HTMLButtonElement)?.focus(); } }}>
      <h2 id="terms-title">Expedition terms</h2>
      <p>One permit costs <strong>{amount(client.definition.price)} simulated RF</strong>.</p>
      <div className="terms-list">{client.definition.outcomes.map(outcome => <p key={outcome.name}><span>{outcome.name}</span><span>{outcome.chanceBps / 100}% · {amount(outcome.reward)} RF fixed value</span></p>)}</div>
      <p>Tour performance never changes these probabilities or values. No real RF transactions.</p>
      <button autoFocus onClick={closeTerms}>Close terms</button>
    </div></div>}
  </main>;
}
