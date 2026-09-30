import assert from 'node:assert/strict';
import { testGame } from '@rarefriends/friendsdk/testing';

const directory = 'games/museum-of-almost-nothing';
const cases = [
  { target: 'echo', random: 0.1, rolls: [1500, 1500, 5000], names: ['Unremarkable Pebble', 'Unremarkable Pebble', 'Very Short Twig'], odd: 3, redeemed: 2 },
  { target: 'variety', random: 0.9, rolls: [1500, 5000, 8000], names: ['Unremarkable Pebble', 'Very Short Twig', 'Unbent Paperclip'], odd: 3, redeemed: 3 },
];
for (const width of [960, 360]) for (const scenario of cases) {
  await testGame(directory, {
    width, height: 820, timeout: 30000,
    screenshot: `docs/vibeathon/evidence/token-activity-${scenario.target}-${width}.png`,
    check: async ({ page, game }) => {
      const browserErrors = [];
      page.on('pageerror', error => browserErrors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') browserErrors.push(message.text()); });
      // This script applies to the next host and sandbox navigation, forcing only
      // the local target selector. The published game has no target override.
      await page.addInitScript({ content: `Math.random = () => ${scenario.random};` });
      await page.reload();
      await page.getByRole('button', { name: /^Connect (wallet|Browser wallet)$/ }).click();
      await page.getByRole('button', { name: /^Friend #7730\b/ }).click();
      await game.getByRole('img', { name: 'Your selected Rare Friend' }).waitFor();
      await game.locator(`.target-panel[data-target="${scenario.target}"]`).waitFor();
      await page.evaluate(rolls => {
        const original = crypto.getRandomValues.bind(crypto);
        let index = 0;
        crypto.getRandomValues = array => array instanceof Uint32Array && array.length === 1
          ? (array[0] = rolls[index++] ?? 1500, array) : original(array);
      }, scenario.rolls);
      const button = name => game.getByRole('button', { name, exact: true });
      const activate = async name => {
        const target = button(name);
        assert.equal(await target.isDisabled(), false, `${width}px ${scenario.target}: ${name} enabled`);
        if (width === 360) await target.tap();
        else { await target.focus(); await target.press('Enter'); }
      };
      const stats = () => game.locator('.target-activity').textContent();
      const assertFit = async stage => {
        const host = await page.locator('.rf-game-frame').evaluate(frame => {
          const iframe = frame.querySelector('iframe').getBoundingClientRect();
          const toolbar = frame.querySelector('.rf-frame-toolbar').getBoundingClientRect();
          return { safeBottom: toolbar.top - iframe.top - 4, iframeHeight: iframe.height };
        });
        const child = await game.locator('body').evaluate(() => {
          const box = el => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; };
          const selectors = ['h1', '.ledger', '.target-panel', '.room', '.exhibits', '.friend', '.collection-section', '.controls', '.instruction', '.actions', '.reveal', '.result', '.closing-tableau', '.terms-toggle', '.terms'];
          return { width: innerWidth, height: innerHeight, scrollHeight: document.documentElement.scrollHeight,
            scrollTop: document.scrollingElement?.scrollTop ?? 0,
            items: [...selectors.map(selector => [selector, document.querySelector(selector)]), ...[...document.querySelectorAll('button')].map((el, index) => ['button ' + index + ': ' + el.textContent, el])]
              .filter(([, el]) => el && getComputedStyle(el).display !== 'none').map(([name, el]) => ({ name, box: box(el) })),
            room: box(document.querySelector('.room')), exhibits: box(document.querySelector('.exhibits')), friend: box(document.querySelector('.friend')) };
        });
        assert.equal(child.scrollTop, 0, `${width}px ${scenario.target} ${stage}: child must not scroll`);
        assert(child.scrollHeight <= child.height + 1, `${width}px ${scenario.target} ${stage}: document exceeds frame`);
        assert(host.iframeHeight >= child.height - 1, `${width}px ${scenario.target} ${stage}: unexpected iframe height`);
        for (const { name, box } of child.items) assert(box.left >= -1 && box.right <= child.width + 1 && box.top >= -1 && box.bottom <= host.safeBottom + 1,
          `${width}px ${scenario.target} ${stage}: ${name} outside usable frame ${JSON.stringify({ box, safeBottom: host.safeBottom })}`);
        for (const [name, box] of [['exhibits', child.exhibits], ['friend', child.friend]]) assert(box.top >= child.room.top - 1 && box.bottom <= child.room.bottom + 1,
          `${width}px ${scenario.target} ${stage}: ${name} clipped by room ${JSON.stringify({ box, room: child.room })}`);
      };
      const buy = async () => { await activate('Buy permit · 6 RF'); await page.getByRole('button', { name: 'Confirm preview', exact: true }).click(); await button('Send expedition').waitFor(); };
      const expedition = async name => {
        await buy(); await activate('Send expedition'); await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
        await game.getByRole('region', { name: 'Actions' }).getByText(name, { exact: true }).waitFor();
        assert.equal(await button('Keep for exhibition').count(), 1);
        assert.equal(await button('Redeem one · ' + (name === 'Unbent Paperclip' ? '3' : '2') + ' RF').count(), 1);
        await assertFit('reveal'); await activate('Keep for exhibition');
      };
      const present = async index => { await activate('Direct Friend to plinth ' + index); assert.equal(await game.locator('.friend').getAttribute('data-position'), 'plinth-' + index); await activate('Present plinth ' + index); };

      await assertFit('ready');
      assert.match(await game.locator('.target-panel').innerText(), new RegExp(scenario.target === 'echo' ? 'THE ECHO.*Matching pair found.*One different object' : 'THE VARIETY.*Three different types collected', 's'));
      assert.equal(await button('A Remarkable Resemblance').count(), 0);
      assert.equal(await button('Two Entirely Different Things').count(), 0);
      assert.equal(await game.getByRole('region', { name: 'Collection' }).count(), 1);
      assert.equal(await game.getByRole('region', { name: 'Actions' }).count(), 1);
      await activate('Expedition terms');
      const terms = game.getByRole('dialog', { name: 'Expedition terms' });
      assert.match(await terms.innerText(), /6 simulated RF.*Unremarkable Pebble.*40%.*2 RF.*Very Short Twig.*35%.*2 RF.*Unbent Paperclip.*15%.*3 RF.*Unattached Button.*10%.*4 RF/s);
      assert.equal(await button('Buy permit · 6 RF').isDisabled(), true);
      await assertFit('terms'); await activate('Close terms');
      await game.locator('body').evaluate(() => {
        window.__museumCalls = [];
        const post = MessagePort.prototype.postMessage;
        MessagePort.prototype.postMessage = function(message, ...args) { if (message?.method) window.__museumCalls.push(message.method); return post.call(this, message, ...args); };
      });
      await activate('Buy permit · 6 RF'); await page.getByRole('button', { name: 'Cancel', exact: true }).click();
      await game.getByText('Action cancelled or not completed. Collection checked; nothing will retry automatically.').waitFor();
      assert.match(await stats(), /0 expeditions · 0 permits purchased · 0 simulated RF spent · 0 simulated RF redeemed · 0 objects redeemed/);
      await assertFit('cancelled-buy');
      await button('Buy permit · 6 RF').evaluate(el => { el.click(); el.click(); });
      await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
      await button('Send expedition').waitFor();
      await activate('Send expedition'); await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
      await button('Keep for exhibition').waitFor();
      await activate('Keep for exhibition');
      assert.match(await stats(), /1 expedition · 1 permit purchased · 6 simulated RF spent/);
      await activate('Select plinth 1'); await activate('Place on plinth 1');
      await assertFit('one-plinth');
      await expedition(scenario.names[1]);
      if (scenario.target === 'echo') { await activate('Select plinth 2'); await activate('Place on plinth 2'); }
      else { await activate('Very Short Twig Owned 1 · Displayed 0'); await activate('Select plinth 2'); await activate('Place on plinth 2'); }
      await expedition(scenario.names[2]);
      if (scenario.target === 'echo') await activate('Very Short Twig Owned 1 · Displayed 0');
      else await activate('Unbent Paperclip Owned 1 · Displayed 0');
      await activate('Select plinth 3'); await activate('Place on plinth 3');
      assert.equal(await game.locator('.exhibit .object').count(), 3);
      assert.match(await game.locator('.target-panel').innerText(), /TARGET READY/);
      assert.match(await stats(), /3 expeditions · 3 permits purchased · 18 simulated RF spent · 0 simulated RF redeemed · 0 objects redeemed/);
      await assertFit('three-plinth');
      await page.locator('.rf-game-frame').screenshot({ path: `docs/vibeathon/evidence/token-activity-${scenario.target}-collection-${width}.png` });
      await activate('Prepare Final Exhibition');
      await activate('Begin Final Exhibition');
      await activate('Direct Friend to plinth 1');
      await page.getByRole('button', { name: 'Open Friend wallet', exact: true }).click();
      await game.locator('main[data-paused="true"]').waitFor();
      assert.equal(await button('Present plinth 1').isDisabled(), true);
      await page.getByRole('button', { name: 'Close Friend wallet', exact: true }).click();
      await game.locator('main[data-paused="false"]').waitFor();
      await activate('Present plinth 1');
      if (scenario.target === 'echo') {
        await present(3); await present(2);
        await game.getByText('Exhibition missed.', { exact: true }).waitFor();
        await assertFit('wrong-order');
        await activate('Retry tour');
        await present(2); await present(1); await present(3);
      } else { await present(3); await present(2); }
      await game.getByText('Final Exhibition', { exact: true }).last().waitFor();
      const tableau = await game.locator('.closing-tableau').innerText();
      assert.match(tableau, /Friend #7730.*Secret Exhibition: THE (ECHO|VARIETY).*Displayed objects:/s);
      assert.match(tableau, /Expeditions: 3.*Permits purchased: 3.*Objects redeemed: 0.*RF spent: 18.*RF redeemed: 0.*Net simulated RF spent: 18/s);
      assert.match(tableau, /FriendSDK simulated economy — no live RF was burned or spent/);
      assert.match(await stats(), /3 expeditions · 3 permits purchased · 18 simulated RF spent · 0 simulated RF redeemed · 0 objects redeemed/, 'tour does not change metrics');
      await assertFit('finale');
      await page.locator('.rf-game-frame').screenshot({ path: `docs/vibeathon/evidence/token-activity-${scenario.target}-finale-${width}.png` });
      const calls = await game.locator('body').evaluate(() => window.__museumCalls.filter(method => ['buy', 'play', 'settle', 'redeem'].includes(method)));
      assert.equal(calls.filter(method => method === 'buy').length, 4, 'cancelled buy plus three confirmed buys');
      assert.equal(calls.filter(method => method === 'play').length, 3);
      assert.equal(calls.filter(method => method === 'settle').length, 3);
      await activate('Return to curation');
      await activate(scenario.names[2] + ' Owned 1 · Displayed 1');
      await activate('Redeem one · ' + scenario.redeemed + ' RF');
      const redeemDialog = game.getByRole('dialog', { name: new RegExp('Redeem one ' + scenario.names[2]) });
      assert.match(await redeemDialog.innerText(), /Owned after redemption: 0.*Plinth 3 will be cleared/s);
      await assertFit('redeem-preview');
      await activate('Cancel');
      assert.equal(await game.locator('.exhibit .object').count(), 3);
      await activate('Redeem one · ' + scenario.redeemed + ' RF');
      await activate('Continue to confirmation');
      await page.getByRole('button', { name: 'Cancel', exact: true }).click();
      await game.getByText('Redemption cancelled or uncertain. Collection rechecked; no automatic retry.').waitFor();
      assert.match(await stats(), /0 simulated RF redeemed/);
      await activate('Redeem one · ' + scenario.redeemed + ' RF');
      await activate('Continue to confirmation');
      await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
      await game.getByText(/Plinth 3 was cleared/).waitFor();
      assert.equal(await game.locator('.exhibit .object').count(), 2);
      assert.equal(await button('Prepare Final Exhibition').count(), 0, 'redeem removes target readiness');
      assert.match(await stats(), new RegExp(`3 expeditions · 3 permits purchased · 18 simulated RF spent · ${scenario.redeemed} simulated RF redeemed · 1 object redeemed`));
      await assertFit('redeemed');
      assert.deepEqual(browserErrors, []);
      console.log(`PASS ${scenario.target} ${width}px: target, activity, curation, tour, redemption, pause and frame fit.`);
    },
  });
}
