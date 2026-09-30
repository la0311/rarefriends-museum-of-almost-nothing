import assert from 'node:assert/strict';
import { testGame } from '@rarefriends/friendsdk/testing';
const directory='games/museum-of-almost-nothing';
for (const width of [960,360]) {
 await testGame(directory,{width,height:820,timeout:20000,screenshot:`docs/vibeathon/evidence/g1-complete-${width}.png`,check:async({page,game})=>{
  const button=name=>game.getByRole('button',{name,exact:true});
  const activate=async name=>{const target=button(name);if(width===360)await target.tap();else{await target.focus();await target.press('Enter');}};
  const ledger=()=>game.getByTestId('ledger').textContent();
  await game.getByRole('img',{name:'Your selected Rare Friend'}).waitFor();
  await button('Buy permit · 6 RF').waitFor();
  await game.locator('body').evaluate(()=>{
   window.__museumCalls=[];
   const post=MessagePort.prototype.postMessage;
   MessagePort.prototype.postMessage=function(message,...args){if(message?.method)window.__museumCalls.push(message.method);return post.call(this,message,...args)};
  });
  await activate('Buy permit · 6 RF');
  await page.getByRole('button',{name:'Cancel',exact:true}).click();
  await game.getByText('Action cancelled or not completed. Collection checked; nothing will retry automatically.').waitFor();
  assert.match(await ledger(),/20 simulated RF.*0 permits.*0 owned/);
  // Synchronous repeated input must open only one economic request.
  await button('Buy permit · 6 RF').evaluate(el=>{el.click();el.click();});
  await page.getByRole('button',{name:'Confirm preview',exact:true}).click();
  await button('Send expedition').waitFor();
  assert.match(await ledger(),/14 simulated RF.*1 permits.*0 owned/);
  await activate('Send expedition');
  await page.getByRole('button',{name:'Confirm preview',exact:true}).click();
  await button('Keep for exhibition').waitFor();
  await game.getByRole('heading',{name:'Unremarkable Pebble',exact:true}).waitFor();
  assert.match(await ledger(),/14 simulated RF.*0 permits.*1 owned/);
  if(width===960)await page.locator('.rf-game-frame').screenshot({path:'docs/vibeathon/evidence/g1-reveal.png'});
  const callsBefore=await game.locator('body').evaluate(()=>window.__museumCalls.filter(m=>['buy','play','settle','redeem'].includes(m)));
  assert.deepEqual(callsBefore,['buy','buy','play','settle']);
  const beforeKeep=await ledger();
  await activate('Keep for exhibition');
  assert.equal(await ledger(),beforeKeep);
  await activate('Place on plinth 1');
  await game.locator('.exhibit .object').waitFor();
  if(width===960)await page.locator('.rf-game-frame').screenshot({path:'docs/vibeathon/evidence/g1-displayed.png'});
  await activate('Begin tour');
  assert.equal(await game.locator('.friend').getAttribute('data-position'),'entrance');
  await activate('Direct Friend to plinth 1');
  assert.equal(await game.locator('.friend').getAttribute('data-position'),'plinth');
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
  assert.equal(await ledger(),beforeKeep);
  const callsAfter=await game.locator('body').evaluate(()=>window.__museumCalls.filter(m=>['buy','play','settle','redeem'].includes(m)));
  assert.deepEqual(callsAfter,callsBefore,'Keep, place, tour and Present make no economic mutations');
  assert.equal(await game.locator('body').evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'No horizontal overflow');
  console.log(`PASS ${width}px: runtime entry, canonical art, cancelled buy, duplicate protection, buy/play/settle, Keep, place, directed Friend, pause, explicit Present, unchanged RF/inventory; ${width===360?'touch':'keyboard'} path.`);
 }});
}
