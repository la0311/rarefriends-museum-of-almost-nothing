import assert from 'node:assert/strict';
import { testGame } from '@rarefriends/friendsdk/testing';
const directory='games/museum-of-almost-nothing';
for (const width of [960,360]) {
 await testGame(directory,{width,height:820,timeout:20000,screenshot:`docs/vibeathon/evidence/g1-hotfix-complete-${width}.png`,check:async({page,game})=>{
  const button=name=>game.getByRole('button',{name,exact:true});
  const activate=async name=>{const target=button(name);if(width===360)await target.tap();else{await target.focus();await target.press('Enter');}};
  const ledger=()=>game.getByTestId('ledger').textContent();
  const frameShot=stage=>page.locator('.rf-game-frame').screenshot({path:`docs/vibeathon/evidence/g1-hotfix-${stage}-${width}.png`});
  const assertFit=async stage=>{
   const host=await page.locator('.rf-game-frame').evaluate(frame=>{
    const iframe=frame.querySelector('iframe').getBoundingClientRect();
    const toolbar=frame.querySelector('.rf-frame-toolbar').getBoundingClientRect();
    return {safeBottom:toolbar.top-iframe.top-4,iframeHeight:iframe.height};
   });
   const child=await game.locator('body').evaluate(()=>{
    const box=el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom};};
    const selectors=['h1','.ledger','.brief','.room','.plinth','.exhibit','.friend','.controls','.instruction','.actions','.collection','.reveal','.result','.terms-toggle','.terms'];
    return {width:innerWidth,height:innerHeight,scrollHeight:document.documentElement.scrollHeight,scrollTop:document.scrollingElement?.scrollTop??0,
     items:[...selectors.map(selector=>[selector,document.querySelector(selector)]),...[...document.querySelectorAll('button')].map((el,index)=>[`button ${index}: ${el.textContent}`,el])]
      .filter(([,el])=>el&&getComputedStyle(el).display!=='none').map(([name,el])=>({name,box:box(el)})),
     room:box(document.querySelector('.room')),brief:box(document.querySelector('.brief')),exhibit:box(document.querySelector('.exhibit')),friend:box(document.querySelector('.friend'))};
   });
   assert.equal(child.scrollTop,0,`${width}px ${stage}: child must not scroll`);
   assert(child.scrollHeight<=child.height+1,`${width}px ${stage}: document exceeds child frame (${child.scrollHeight} > ${child.height})`);
   assert(host.iframeHeight>=child.height-1,`${width}px ${stage}: unexpected iframe height`);
   for(const {name,box} of child.items){
    assert(box.left>=-1&&box.right<=child.width+1&&box.top>=-1&&box.bottom<=host.safeBottom+1,
     `${width}px ${stage}: ${name} outside usable frame ${JSON.stringify({box,safeBottom:host.safeBottom})}`);
   }
   for(const [name,box] of [['brief',child.brief],['exhibit',child.exhibit],['friend',child.friend]]){
    assert(box.top>=child.room.top-1&&box.bottom<=child.room.bottom+1,`${width}px ${stage}: ${name} clipped by room`);
   }
  };
  await game.getByRole('img',{name:'Your selected Rare Friend'}).waitFor();
  await button('Buy permit · 6 RF').waitFor();
  await assertFit('ready');
  await frameShot('ready');
  await activate('Expedition terms');
  const terms=game.getByRole('dialog',{name:'Expedition terms'});
  await terms.waitFor();
  assert.match(await terms.innerText(),/6 simulated RF.*Unremarkable Pebble.*40%.*2 RF.*Very Short Twig.*35%.*2 RF.*Unbent Paperclip.*15%.*3 RF.*Unattached Button.*10%.*4 RF.*Tour performance never changes/s);
  assert.equal(await button('Buy permit · 6 RF').isDisabled(),true,'Terms panel must block gameplay');
  await assertFit('terms');
  if(width===360)await frameShot('terms');
  if(width===360)await activate('Close terms');else await button('Close terms').press('Escape');
  await terms.waitFor({state:'hidden'});
  await game.locator('body').evaluate(()=>{
   window.__museumCalls=[];
   const post=MessagePort.prototype.postMessage;
   MessagePort.prototype.postMessage=function(message,...args){if(message?.method)window.__museumCalls.push(message.method);return post.call(this,message,...args)};
  });
  await activate('Buy permit · 6 RF');
  await page.getByRole('button',{name:'Cancel',exact:true}).click();
  await game.getByText('Action cancelled or not completed. Collection checked; nothing will retry automatically.').waitFor();
  assert.match(await ledger(),/20 simulated RF.*0 permits.*0 owned/);
  await assertFit('cancelled-buy');
  // Synchronous repeated input must open only one economic request.
  await button('Buy permit · 6 RF').evaluate(el=>{el.click();el.click();});
  await page.getByRole('button',{name:'Confirm preview',exact:true}).click();
  await button('Send expedition').waitFor();
  assert.match(await ledger(),/14 simulated RF.*1 permits.*0 owned/);
  await assertFit('permit-ready');
  await activate('Send expedition');
  await page.getByRole('button',{name:'Confirm preview',exact:true}).click();
  await button('Keep for exhibition').waitFor();
  await game.getByRole('heading',{name:'Unremarkable Pebble',exact:true}).waitFor();
  assert.match(await ledger(),/14 simulated RF.*0 permits.*1 owned/);
  await assertFit('reveal');
  if(width===960)await frameShot('reveal');
  const callsBefore=await game.locator('body').evaluate(()=>window.__museumCalls.filter(m=>['buy','play','settle','redeem'].includes(m)));
  assert.deepEqual(callsBefore,['buy','buy','play','settle']);
  const beforeKeep=await ledger();
  await activate('Keep for exhibition');
  assert.equal(await ledger(),beforeKeep);
  await assertFit('kept');
  await activate('Place on plinth 1');
  await game.locator('.exhibit .object').waitFor();
  await assertFit('curation');
  await frameShot('curation');
  await activate('Begin tour');
  assert.equal(await game.locator('.friend').getAttribute('data-position'),'entrance');
  await assertFit('tour-entrance');
  await activate('Direct Friend to plinth 1');
  assert.equal(await game.locator('.friend').getAttribute('data-position'),'plinth');
  await assertFit('present');
  await frameShot('present');
  assert.equal(await game.getByText('Tour result only — no RF awarded.',{exact:true}).count(),0);
  await page.getByRole('button',{name:'Open Friend wallet',exact:true}).click();
  await game.locator('main[data-paused="true"]').waitFor();
  assert.equal(await button('Present').isDisabled(),true);
  await button('Present').evaluate(el=>el.click());
  assert.equal(await game.getByText('Tour result only — no RF awarded.',{exact:true}).count(),0);
  await page.getByRole('button',{name:'Close Friend wallet',exact:true}).click();
  await game.locator('main[data-paused="false"]').waitFor();
  await activate('Present');
  await game.getByText('Tour result only — no RF awarded.',{exact:true}).waitFor();
  await assertFit('complete');
  assert.equal(await ledger(),beforeKeep);
  const callsAfter=await game.locator('body').evaluate(()=>window.__museumCalls.filter(m=>['buy','play','settle','redeem'].includes(m)));
  assert.deepEqual(callsAfter,callsBefore,'Keep, place, tour and Present make no economic mutations');
  assert.equal(await game.locator('body').evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'No horizontal overflow');
  console.log(`PASS ${width}px: runtime entry, canonical art, cancelled buy, duplicate protection, buy/play/settle, Keep, place, directed Friend, pause, explicit Present, unchanged RF/inventory; ${width===360?'touch':'keyboard'} path.`);
 }});
}
