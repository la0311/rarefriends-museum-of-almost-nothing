import { useEffect, useRef, useState } from 'react';
import type { GameComponentProps } from '@rarefriends/friendsdk/runtime';
import { RF, type GameSnapshot } from '@rarefriends/friendsdk/game';
import { createFriendReader, spriteFrame, type GenerationSprites } from '@rarefriends/friendsdk/sprites';
import { objects } from './catalog';
import './style.css';

type Tour = 'curate' | 'entrance' | 'plinth' | 'complete';
const amount = (value: bigint) => `${value / RF}${value % RF ? '.' + (value % RF).toString().padStart(18,'0').replace(/0+$/,'') : ''}`;
function ObjectArt({id}: {id:number}) {
 return <span aria-hidden="true" className={`object ${objects[id-1].shape}`}/>;
}
export default function Museum({friendId, client, paused}: GameComponentProps) {
 const [snapshot,setSnapshot]=useState<GameSnapshot>();
 const [sprites,setSprites]=useState<GenerationSprites>();
 const [artError,setArtError]=useState(false);
 const [readError,setReadError]=useState(false);
 const [retryArt,setRetryArt]=useState(0);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState('Loading your collection…');
 const [reveal,setReveal]=useState<number|null>(null);
 const [selected,setSelected]=useState<number|null>(null);
 const [plinth,setPlinth]=useState<number|null>(null);
 const [tour,setTour]=useState<Tour>('curate');
 const [hidden,setHidden]=useState(document.hidden);
 const [terms,setTerms]=useState(false);
 const locked=useRef(false);
 const termsButton=useRef<HTMLButtonElement>(null);

 const mounted=useRef(true);
 const stopped=paused||hidden;
 const canInteract=!stopped&&!busy&&!readError&&!terms&&!!snapshot&&!!sprites;
 const owned=(id:number,state=snapshot)=>state?.inventory[id-1]??0n;
 const pending=snapshot?.plays.find(play=>play.outcomeId===null);
 const apply=(state:GameSnapshot)=>{
   if(!mounted.current)return;
   if(state.friendId!==friendId||state.mode!=='preview')throw new Error('Unexpected session');
   setSnapshot(state); setReadError(false);
   setPlinth(id=>id&&state.inventory[id-1]>0n?id:null);
   setSelected(id=>id&&state.inventory[id-1]>0n?id:null);
   setReveal(id=>id&&state.inventory[id-1]>0n?id:null);
 };
 const read=async()=>{const state=await client.read();apply(state);return state;};
 useEffect(()=>{
   mounted.current=true;
   setSnapshot(undefined);setPlinth(null);setSelected(null);setReveal(null);setTour('curate');
   read().then(()=>{if(mounted.current)setMessage('Fund your first expedition.');}).catch(()=>{if(mounted.current){setReadError(true);setMessage('Collection unavailable. Retry before continuing.');}});
   return()=>{mounted.current=false;};
 },[client,friendId]);
 useEffect(()=>{
   let active=true;setSprites(undefined);setArtError(false);
   createFriendReader().read(friendId).then(art=>{if(active)setSprites(art)}).catch(()=>{if(active)setArtError(true)});
   return()=>{active=false};
 },[friendId,retryArt]);
 useEffect(()=>{const change=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change);},[]);
 async function action(kind:'buy'|'play'|'resume'|'read') {
   if(locked.current||stopped||(!canInteract&&kind!=='read')||tour==='entrance'||tour==='plinth')return;
   locked.current=true;setBusy(true);setMessage(kind==='buy'?'Confirm your permit in the runtime.':kind==='read'?'Checking your collection…':'Preparing your expedition…');
   try {
     if(kind==='read'){await read();setMessage('Collection checked. Your owned objects are available.');return;}
     if(client.mode!=='preview')throw new Error('Preview only');
     let state=await read();
     if(kind==='buy'){
       if(state.plays.some(play=>play.outcomeId===null)||state.consumables>0n){setMessage('Use your existing expedition before buying another permit.');return;}
       if(state.rfBalance<client.definition.price){setMessage('Not enough simulated RF for a permit. You can still curate your collection.');return;}
       if(!await client.canBuy(1n)){setMessage('The simulation cannot back another permit. You can still curate.');return;}
       await client.buy(1n);await read();setMessage('One permit ready. Send your expedition.');return;
     }
     let play=state.plays.find(item=>item.outcomeId===null);
     if(!play&&kind==='resume'){setMessage('No pending expedition. Collection checked.');return;}
     if(!play){
       if(state.consumables<1n){setMessage('Buy one permit first.');return;}
       const plays=await client.play(1n);play=plays[0];
       if(!play)throw new Error('No play returned');
     }
     // Check the authoritative record before settling an existing ID. Never reroll.
     state=await read();
     const recorded=state.plays.find(item=>item.id===play!.id);
     if(!recorded)throw new Error('Play not confirmed');
     if(recorded.outcomeId===null){setMessage('Settling your expedition…');await client.settle(recorded.id);}
     state=await read();
     const settled=state.plays.find(item=>item.id===recorded.id);
     if(!settled?.outcomeId||!objects[settled.outcomeId-1]||state.inventory[settled.outcomeId-1]<1n)throw new Error('Outcome not confirmed');
     setReveal(settled.outcomeId);setSelected(null);setTour('curate');setMessage('Settled and owned. Decide it matters.');
   } catch {
     try {await read();setMessage('Action cancelled or not completed. Collection checked; nothing will retry automatically.');}
     catch {setReadError(true);setMessage('We could not confirm your collection. Actions are locked until Retry succeeds.');}
   } finally {locked.current=false;if(mounted.current)setBusy(false);}
 }
 function local(fn:()=>void){if(canInteract)fn();}
 function keep(){local(()=>{if(reveal&&owned(reveal)>0n){setSelected(reveal);setReveal(null);setMessage('Kept for exhibition. Your SDK inventory is unchanged. Choose Place on plinth 1.');}});}
 function place(){local(()=>{if(selected&&owned(selected)>0n&&tour==='curate'){setPlinth(selected);setMessage('One object displayed. Begin your tour when ready.');}});}
 function begin(){local(()=>{if(plinth&&owned(plinth)>0n){setTour('entrance');setMessage('Choose a destination for your curator.');}});}
 function visit(){local(()=>{if(tour==='entrance'){setTour('plinth');setMessage('Your curator is in position. Select Present.');}});}
 function present(){local(()=>{if(tour==='plinth'&&plinth&&owned(plinth)>0n){setTour('complete');setMessage('Brief met. Of considerable importance.');}});}
 function closeTerms(){setTerms(false);requestAnimationFrame(()=>termsButton.current?.focus());}
 const atPlinth=tour==='plinth'||tour==='complete';
 const rows=sprites?spriteFrame(sprites,atPlinth?'up':'down',false,0).frame.rows:[];
 const activeTour=tour==='entrance'||tour==='plinth';
 return <main className="museum" data-paused={stopped}>
   <header><h1>Museum of Almost Nothing</h1><p className="disclosure">A session exhibition · Simulated RF · Resets on full reload</p>
    <div className="ledger" data-testid="ledger"><span>{snapshot?amount(snapshot.rfBalance):'…'} simulated RF</span><span>{snapshot?.consumables.toString()??'…'} permits</span><span>{snapshot?.inventory.reduce((a,b)=>a+b,0n).toString()??'…'} owned</span></div>
   </header>
   <section className="room" aria-label="Museum room">
    <div className="inscription">An institution of very little consequence.</div>
    <div className="brief"><h2>Opening Remarks</h2><p>Display exactly one owned object. Direct your Friend, then Present.</p></div>
    <div className="exhibit">{plinth&&<ObjectArt id={plinth}/>}<div className="plinth"><span>1</span></div><p>{plinth?objects[plinth-1].name:'An empty plinth. For now.'}</p></div>
    {sprites&&<svg role="img" aria-label="Your selected Rare Friend" viewBox="0 0 16 16" className={`friend ${atPlinth?'at-plinth':''}`} data-position={atPlinth?'plinth':'entrance'}>{rows.flatMap((row,y)=>[...row].map((pixel,x)=>pixel==='#'?<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1"/>:null))}</svg>}
   </section>
   <section className="controls" aria-label="Museum actions">
    {artError?<><p role="alert">Your curator couldn’t be loaded.</p><button disabled={stopped} onClick={()=>setRetryArt(v=>v+1)}>Retry artwork</button></>:!sprites?<p>Loading canonical Friend artwork…</p>:null}
    {readError&&<button disabled={stopped||busy} onClick={()=>void action('read')}>Retry collection</button>}
    <p className="instruction" aria-live="polite">{stopped?'Museum paused.':message}</p>
    {tour==='complete'&&<div className="result" role="status"><strong>Brief met. Of considerable importance.</strong><p>{plinth&&objects[plinth-1].description}</p><b>Tour result only — no RF awarded.</b></div>}
    {reveal?<div className="reveal" aria-label="Settled object"><ObjectArt id={reveal}/><div><h2>{objects[reveal-1].name}</h2><p>{objects[reveal-1].description}</p><p>Owned {owned(reveal).toString()} · Fixed value {amount(client.definition.outcomes[reveal-1].reward)} simulated RF</p></div><button disabled={!canInteract} onClick={keep}>Keep for exhibition</button><small>Already in your collection. Keep makes no SDK transaction.</small></div>:<>
     <div className="actions">
      {!activeTour&&tour!=='complete'&&<>
       {pending?<button className={selected||plinth?'secondary':undefined} disabled={!canInteract} onClick={()=>void action('resume')}>Resume expedition</button>:snapshot&&snapshot.consumables>0n?<button className={selected||plinth?'secondary':undefined} disabled={!canInteract} onClick={()=>void action('play')}>Send expedition</button>:<button className={selected||plinth?'secondary':undefined} disabled={!canInteract} onClick={()=>void action('buy')}>Buy permit · {amount(client.definition.price)} RF</button>}
       {selected&&selected!==plinth&&<button disabled={!canInteract||owned(selected)<1n} onClick={place}>Place on plinth 1</button>}
       {plinth&&<button disabled={!canInteract} onClick={begin}>Begin tour</button>}
      </>}
      {tour==='entrance'&&<button disabled={!canInteract} onClick={visit}>Direct Friend to plinth 1</button>}
      {tour==='plinth'&&<button disabled={!canInteract} onClick={present}>Present</button>}
      {activeTour&&<button className="secondary" disabled={!canInteract} onClick={()=>local(()=>{setTour('curate');setMessage('Rehearsal ended. Nothing was spent.');})}>End rehearsal</button>}
      {tour==='complete'&&<button disabled={!canInteract} onClick={()=>local(()=>{setTour('curate');setMessage('Arrange again or fund another expedition.');})}>Return to curation</button>}
     </div>
     {!activeTour&&tour==='curate'&&snapshot&&snapshot.inventory.some(q=>q>0n)&&<div className="collection" aria-label="Owned objects">{objects.map((object,index)=>owned(index+1)>0n&&<button key={object.name} aria-pressed={selected===index+1} disabled={!canInteract} onClick={()=>local(()=>{setSelected(index+1);setMessage('Object selected. Place it on plinth 1.');})}>{object.name} · {owned(index+1).toString()} owned</button>)}</div>}
    </>}
    <button ref={termsButton} className="terms-toggle" disabled={stopped||busy} aria-haspopup="dialog" aria-expanded={terms} onClick={()=>setTerms(true)}>Expedition terms</button>
   </section>
   {terms&&<div className="terms-backdrop"><div className="terms" role="dialog" aria-modal="true" aria-labelledby="terms-title" onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();closeTerms();}if(event.key==='Tab'){event.preventDefault();(event.currentTarget.querySelector('button') as HTMLButtonElement)?.focus();}}}>
     <h2 id="terms-title">Expedition terms</h2>
     <p>One permit costs <strong>{amount(client.definition.price)} simulated RF</strong>.</p>
     <div className="terms-list">{client.definition.outcomes.map(o=><p key={o.name}><span>{o.name}</span><span>{o.chanceBps/100}% · {amount(o.reward)} RF fixed value</span></p>)}</div>
     <p>Tour performance never changes these probabilities or values. No real RF transactions.</p>
     <button autoFocus onClick={closeTerms}>Close terms</button>
   </div></div>}
 </main>;
}
