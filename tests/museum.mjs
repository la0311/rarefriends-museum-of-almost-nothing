import assert from 'node:assert/strict';
import { testGame } from '@rarefriends/friendsdk/testing';

const directory = 'games/museum-of-almost-nothing';
for (const width of [960, 360]) {
  await testGame(directory, {
    width, height: 820, timeout: 30000,
    screenshot: 'docs/vibeathon/evidence/g2-complete-' + width + '.png',
    check: async ({ page, game }) => {
      const browserErrors = [];
      page.on('pageerror', error => browserErrors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') browserErrors.push(message.text()); });
      const button = name => game.getByRole('button', { name, exact: true });
      const activate = async name => {
        const target = button(name);
        assert.equal(await target.isDisabled(), false, name + ' should be enabled');
        if (width === 360) await target.tap();
        else { await target.focus(); await target.press('Enter'); }
      };
      const ledger = () => game.getByTestId('ledger').textContent();
      const frameShot = stage => page.locator('.rf-game-frame').screenshot({ path: 'docs/vibeathon/evidence/g2-' + stage + '-' + width + '.png' });
      const assertFit = async stage => {
        const host = await page.locator('.rf-game-frame').evaluate(frame => {
          const iframe = frame.querySelector('iframe').getBoundingClientRect();
          const toolbar = frame.querySelector('.rf-frame-toolbar').getBoundingClientRect();
          return { safeBottom: toolbar.top - iframe.top - 4, iframeHeight: iframe.height };
        });
        const child = await game.locator('body').evaluate(() => {
          const box = el => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; };
          const selectors = ['h1', '.ledger', '.brief', '.room', '.exhibits', '.friend', '.controls', '.instruction', '.actions', '.collection', '.reveal', '.result', '.terms-toggle', '.terms'];
          return {
            width: innerWidth, height: innerHeight, scrollHeight: document.documentElement.scrollHeight,
            scrollTop: document.scrollingElement?.scrollTop ?? 0,
            items: [...selectors.map(selector => [selector, document.querySelector(selector)]), ...[...document.querySelectorAll('button')].map((el, index) => ['button ' + index + ': ' + el.textContent, el])]
              .filter(([, el]) => el && getComputedStyle(el).display !== 'none').map(([name, el]) => ({ name, box: box(el) })),
            room: box(document.querySelector('.room')), brief: box(document.querySelector('.brief')),
            exhibits: box(document.querySelector('.exhibits')), friend: box(document.querySelector('.friend')),
          };
        });
        assert.equal(child.scrollTop, 0, width + 'px ' + stage + ': child must not scroll');
        assert(child.scrollHeight <= child.height + 1, width + 'px ' + stage + ': document exceeds frame');
        assert(host.iframeHeight >= child.height - 1, width + 'px ' + stage + ': unexpected iframe height');
        for (const { name, box } of child.items) {
          assert(box.left >= -1 && box.right <= child.width + 1 && box.top >= -1 && box.bottom <= host.safeBottom + 1,
            width + 'px ' + stage + ': ' + name + ' outside usable frame ' + JSON.stringify({ box, safeBottom: host.safeBottom }));
        }
        for (const [name, box] of [['brief', child.brief], ['exhibits', child.exhibits], ['friend', child.friend]]) {
          assert(box.top >= child.room.top - 1 && box.bottom <= child.room.bottom + 1,
            width + 'px ' + stage + ': ' + name + ' clipped by room ' + JSON.stringify({ box, room: child.room }));
        }
      };
      const expedition = async () => {
        await activate('Buy permit · 6 RF');
        await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
        await button('Send expedition').waitFor();
        await activate('Send expedition');
        await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
        await button('Keep for exhibition').waitFor();
        await activate('Keep for exhibition');
      };
      const tourTo = async index => {
        await activate('Direct Friend to plinth ' + index);
        assert.equal(await game.locator('.friend').getAttribute('data-position'), 'plinth-' + index);
        await activate('Present plinth ' + index);
      };
      await game.getByRole('img', { name: 'Your selected Rare Friend' }).waitFor();
      await button('Buy permit · 6 RF').waitFor();
      await assertFit('ready');
      await frameShot('ready');
      await activate('Expedition terms');
      const terms = game.getByRole('dialog', { name: 'Expedition terms' });
      await terms.waitFor();
      assert.match(await terms.innerText(), /6 simulated RF.*Unremarkable Pebble.*40%.*2 RF.*Very Short Twig.*35%.*2 RF.*Unbent Paperclip.*15%.*3 RF.*Unattached Button.*10%.*4 RF.*Tour performance never changes/s);
      assert.equal(await button('Buy permit · 6 RF').isDisabled(), true);
      await assertFit('terms');
      await activate('Close terms');
      await terms.waitFor({ state: 'hidden' });
      await game.locator('body').evaluate(() => {
        window.__museumCalls = [];
        const post = MessagePort.prototype.postMessage;
        MessagePort.prototype.postMessage = function(message, ...args) {
          if (message?.method) window.__museumCalls.push(message.method);
          return post.call(this, message, ...args);
        };
      });
      await activate('Buy permit · 6 RF');
      await page.getByRole('button', { name: 'Cancel', exact: true }).click();
      await game.getByText('Action cancelled or not completed. Collection checked; nothing will retry automatically.').waitFor();
      assert.match(await ledger(), /20 simulated RF.*0 permits.*0 owned/);
      await assertFit('cancelled-buy');
      await button('Buy permit · 6 RF').evaluate(el => { el.click(); el.click(); });
      await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
      await button('Send expedition').waitFor();
      await activate('Send expedition');
      await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
      await button('Keep for exhibition').waitFor();
      assert.match(await ledger(), /14 simulated RF.*0 permits.*1 owned/);
      await assertFit('reveal');
      await activate('Keep for exhibition');
      await activate('Select plinth 1');
      await activate('Place on plinth 1');
      await game.locator('.exhibit .object').waitFor();
      await assertFit('one-plinth');
      await activate('Begin tour');
      assert.equal(await game.locator('.friend').getAttribute('data-position'), 'entrance');
      await activate('Direct Friend to plinth 1');
      await page.getByRole('button', { name: 'Open Friend wallet', exact: true }).click();
      await game.locator('main[data-paused="true"]').waitFor();
      assert.equal(await button('Present plinth 1').isDisabled(), true);
      await page.getByRole('button', { name: 'Close Friend wallet', exact: true }).click();
      await game.locator('main[data-paused="false"]').waitFor();
      await activate('Present plinth 1');
      await game.locator('.result strong').getByText('Brief met. Of considerable importance.', { exact: true }).waitFor();
      await assertFit('opening-result');
      await activate('Return to curation');

      await expedition();
      await activate('Select plinth 2');
      await activate('Place on plinth 2');
      await button('A Remarkable Resemblance').waitFor();
      assert.equal(await button('Two Entirely Different Things').count(), 0, 'infeasible distinct brief hidden');
      await activate('A Remarkable Resemblance');
      await assertFit('two-plinth');
      await frameShot('two-plinth');
      await activate('Begin tour');
      await tourTo(2);
      await tourTo(1);
      await game.getByText(/Present the left occupied plinth before the right/).first().waitFor();
      await assertFit('wrong-order');
      await activate('Retry tour');
      await tourTo(1);
      await tourTo(2);
      await game.locator('.result strong').getByText('Brief met. Of considerable importance.', { exact: true }).waitFor();
      assert.match(await ledger(), /8 simulated RF.*0 permits.*2 owned/);
      await activate('Return to curation');

      await expedition();
      await activate('Select plinth 3');
      await activate('Place on plinth 3');
      assert.equal(await game.locator('.exhibit .object').count(), 3);
      await assertFit('three-plinth');
      await frameShot('three-plinth');
      await activate('Final Exhibition');
      await activate('Begin Final Exhibition');
      await tourTo(1);
      await tourTo(3);
      await tourTo(2);
      await game.getByText('Final Exhibition complete.', { exact: true }).waitFor();
      await game.getByText(/Presented plinths 1 → 3 → 2/).waitFor();
      assert.match(await ledger(), /2 simulated RF.*0 permits.*3 owned/);
      await assertFit('finale');
      await frameShot('finale');
      const callsBeforeRedeem = await game.locator('body').evaluate(() => window.__museumCalls.filter(method => ['buy', 'play', 'settle', 'redeem'].includes(method)));
      assert.equal(callsBeforeRedeem.filter(method => method === 'buy').length, 4, 'cancelled buy plus three permits');
      assert.equal(callsBeforeRedeem.filter(method => method === 'play').length, 3);
      assert.equal(callsBeforeRedeem.filter(method => method === 'settle').length, 3);
      await activate('Return to curation');
      await activate('Return to briefs');
      await activate('Unremarkable Pebble Owned 3 · Displayed 3 · Available 0');
      await activate('Redeem one · 2 RF');
      const redeemDialog = game.getByRole('dialog', { name: /Redeem one Unremarkable Pebble/ });
      await redeemDialog.waitFor();
      assert.match(await redeemDialog.innerText(), /Owned after redemption: 2.*Plinth 3 will be cleared/s);
      await assertFit('redeem-preview');
      await activate('Cancel');
      assert.equal(await game.locator('.exhibit .object').count(), 3, 'local cancellation retains all displays');
      await activate('Redeem one · 2 RF');
      await activate('Continue to confirmation');
      await page.getByRole('button', { name: 'Cancel', exact: true }).click();
      await game.getByText('Redemption cancelled or uncertain. Collection rechecked; no automatic retry.').waitFor();
      assert.equal(await game.locator('.exhibit .object').count(), 3, 'runtime cancellation retains all displays');
      await activate('Redeem one · 2 RF');
      await activate('Continue to confirmation');
      await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
      await game.getByText(/Plinth 3 was cleared/).waitFor();
      assert.match(await ledger(), /4 simulated RF.*0 permits.*2 owned/);
      assert.equal(await game.locator('.exhibit .object').count(), 2, 'confirmed redemption reconciles highest numbered plinth');
      await assertFit('redeemed');
      await frameShot('redeemed');
      await activate('Select plinth 3');
      assert.equal(await button('Replace plinth 3').count(), 0);
      assert.equal(await button('Place on plinth 3').isDisabled(), true, 'cannot over-allocate beyond owned');
      await activate('A Remarkable Resemblance');
      await activate('Redeem one · 2 RF');
      assert.match(await redeemDialog.innerText(), /Owned after redemption: 1.*Plinth 2 will be cleared/s);
      await activate('Continue to confirmation');
      await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
      await game.getByText('Redeeming made the selected brief impossible. Choose a feasible brief.').waitFor();
      assert.equal(await button('A Remarkable Resemblance').count(), 0);
      assert.equal(await game.locator('.exhibit .object').count(), 1);
      await activate('Redeem one · 2 RF');
      assert.match(await redeemDialog.innerText(), /Owned after redemption: 0.*Plinth 1 will be cleared/s);
      await activate('Continue to confirmation');
      await page.getByRole('button', { name: 'Confirm preview', exact: true }).click();
      await game.getByText(/Plinth 1 was cleared/).waitFor();
      assert.equal(await game.locator('.exhibit .object').count(), 0);
      await activate('Final Exhibition');
      await activate('Close empty exhibition');
      await game.locator('.result strong').getByText('Nothing remained on loan.').waitFor();
      assert.match(await ledger(), /8 simulated RF.*0 permits.*0 owned/);
      await assertFit('empty-closure');
      assert.equal(await game.locator('body').evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(browserErrors, [], 'no browser console/page errors');
      console.log('PASS ' + width + 'px: G2 runtime, duplicate curation, ordered brief failure/retry, three-plinth finale, redeem cancellation/reconciliation, pause and frame fit.');
    },
  });
}
