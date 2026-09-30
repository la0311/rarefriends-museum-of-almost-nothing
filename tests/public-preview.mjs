import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright';

const base = 'https://la0311.github.io/rarefriends-museum-of-almost-nothing/';
const dist = 'games/museum-of-almost-nothing/.friendsdk/';
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
for (const name of ['index.html', 'game.js', 'game.css', 'runtime.js', 'runtime.css']) {
  const expected = digest(await readFile(dist + name));
  const response = await fetch(base + name + '?verify=' + expected.slice(0, 10), { cache: 'no-store' });
  assert.equal(response.status, 200, `${name} HTTP status`);
  const actual = digest(Buffer.from(await response.arrayBuffer()));
  assert.equal(actual, expected, `${name} public SHA-256`);
  console.log(`PASS public ${name}: HTTP 200, SHA-256 ${actual}`);
}

await mkdir('docs/vibeathon/evidence', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [960, 360]) {
    const context = await browser.newContext({ viewport: { width, height: 820 }, hasTouch: width === 360 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const response = await page.goto(base + '?verify=' + Date.now(), { waitUntil: 'networkidle', timeout: 30000 });
    assert.equal(response?.status(), 200, `${width}px page HTTP status`);
    await page.getByRole('button', { name: 'Check for wallet' }).waitFor();
    const frame = await page.locator('.rf-game-frame').boundingBox();
    assert(frame, 'SDK frame should render');
    assert(frame.width <= width + 1, `${width}px frame should fit viewport`);
    assert(Math.abs(frame.height / frame.width - (width === 360 ? 4 / 3 : 2 / 3)) < 0.02, `${width}px host frame aspect ratio`);
    await page.screenshot({ path: `docs/vibeathon/evidence/public-token-activity-${width}.png`, fullPage: true });
    assert.deepEqual(errors, [], `${width}px browser errors`);
    console.log(`PASS public ${width}px: HTTP 200, SDK wallet gate, frame ${Math.round(frame.width)}×${Math.round(frame.height)}, no browser errors.`);
    await context.close();
  }
} finally { await browser.close(); }
