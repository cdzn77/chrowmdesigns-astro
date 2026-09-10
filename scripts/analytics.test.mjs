import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const code = stripTypeScriptTypes(readFileSync(new URL('../src/scripts/analytics.ts', import.meta.url), 'utf8'));
function fixture({ host = 'chrowmdesigns.com', stored = null, noindex = false, storageError = false } = {}) {
  const handlers = {}, windowHandlers = {}, scripts = [], cookies = [];
  let canonical = 'https://chrowmdesigns.com/';
  let reloaded = 0;
  class Element {
    constructor(data = {}) { this.dataset = data; this.hidden = true; this.focused = false; }
    closest() { return this; }
    hasAttribute(name) { return name === 'data-analytics-settings' && this.settings; }
    focus() { this.focused = true; }
  }
  class Anchor extends Element { constructor(href) { super(); this.href = href; } }
  const banner = new Element(), setting = new Element(), accept = new Element({ analyticsChoice: 'accepted' }), decline = new Element({ analyticsChoice: 'declined' }), main = new Element();
  setting.settings = true;
  const document = {
    title: 'ChrowmDesigns', referrer: 'https://referrer.example/private?email=secret@example.com', documentElement: { dataset: {} },
    head: { appendChild(script) { scripts.push(script); } },
    createElement() { return {}; },
    querySelector(selector) {
      if (selector.includes('robots')) return { getAttribute: () => noindex ? 'noindex, follow' : 'index, follow' };
      if (selector.includes('canonical')) return { href: canonical };
      return accept;
    },
    querySelectorAll() { return [setting]; },
    getElementById(id) { return id === 'analytics-consent' ? banner : main; },
    addEventListener(name, fn) { handlers[name] = fn; },
    set cookie(value) { cookies.push(value); },
  };
  const window = { addEventListener(name, fn) { windowHandlers[name] = fn; } };
  const localStorage = {
    getItem() { if (storageError) throw Error('storage blocked'); return stored; },
    setItem(key, value) { if (storageError) throw Error('storage blocked'); stored = value; },
  };
  const location = { hostname: host, protocol: 'https:', origin: `https://${host}`, pathname: '/', reload() { reloaded++; } };
  vm.runInNewContext(code, { window, document, location, localStorage, URL, Date, Element, HTMLAnchorElement: Anchor });
  const events = () => (window.dataLayer ?? []).map(args => Array.from(args)).filter(args => args[0] === 'event');
  return { window, scripts, cookies, banner, setting, main, events,
    click(target) { handlers.click?.({ target }); }, accept, decline,
    route(path) { canonical = `https://chrowmdesigns.com${path}`; handlers['astro:page-load']?.(); },
    lead() { handlers['chrowm:inquiry-sent']?.(); },
    resume() { handlers.click?.({ target: new Anchor('https://chrowmdesigns.com/resume.pdf') }); },
    repeat() { handlers['astro:page-load']?.(); },
    get reloaded() { return reloaded; }, get stored() { return stored; },
  };
}

test('no Google script or events before consent, including form success', () => {
  const f = fixture(); f.lead(); f.resume(); assert.equal(f.scripts.length, 0); assert.equal(f.events().length, 0); assert.equal(f.banner.hidden, false);
});
test('decline remains off and persists', () => {
  const f = fixture(); f.click(f.decline); f.route('/info/'); assert.equal(f.scripts.length, 0); assert.equal(f.events().length, 0); assert.equal(JSON.parse(f.stored).choice, 'declined');
});
test('accept loads once and initial/router duplicate events count only once', () => {
  const f = fixture(); f.click(f.accept); f.repeat(); assert.equal(f.scripts.length, 1); assert.equal(f.events().length, 1);
  f.route('/info/'); f.repeat(); f.route('/cases/'); assert.equal(f.events().length, 3); assert.equal(f.scripts.length, 1);
  assert.equal(f.events()[0][2].page_referrer, 'https://referrer.example/'); assert.equal(f.events()[1][2].page_referrer, 'https://chrowmdesigns.com/');
  assert.equal(JSON.stringify(f.events()).includes('secret@example.com'), false);
});
test('accepted contact and resume events have only fixed non-personal parameters', () => {
  const f = fixture(); f.click(f.accept); f.lead(); f.resume();
  assert.equal(JSON.stringify(f.events()[1]), JSON.stringify(['event', 'generate_lead', { form_id: 'studio_contact' }]));
  assert.equal(JSON.stringify(f.events()[2]), JSON.stringify(['event', 'file_download', { file_name: 'resume.pdf', file_extension: 'pdf' }]));
});
test('revocation disables collection, clears only GA cookies and reloads', () => {
  const f = fixture(); f.click(f.accept); f.click(f.setting); assert.equal(f.banner.hidden, false); f.click(f.decline); f.lead();
  assert.equal(f.window['ga-disable-G-HP8BSKC4SC'], true); assert.equal(f.reloaded, 1); assert.equal(f.events().length, 1);
  assert.equal(f.cookies.length, 6); assert.ok(f.cookies.every(cookie => cookie.startsWith('_ga')));
});
test('saved consent resumes; expired or malformed preferences stay off', () => {
  const choice = JSON.stringify({ choice: 'accepted', expires: Date.now() + 100000 }); assert.equal(fixture({ stored: choice }).scripts.length, 1);
  for (const stored of ['broken', JSON.stringify({ choice: 'accepted', expires: 1 })]) assert.equal(fixture({ stored }).scripts.length, 0);
});
test('local, preview and noindex pages never load Analytics', () => {
  const stored = JSON.stringify({ choice: 'accepted', expires: Date.now() + 100000 });
  for (const options of [{ host: '127.0.0.1' }, { host: 'cdzn.netlify.app' }, { noindex: true }]) assert.equal(fixture({ stored, ...options }).scripts.length, 0);
});
test('blocked preference storage does not crash or activate tracking on its own', () => {
  const f = fixture({ storageError: true }); assert.equal(f.scripts.length, 0); f.click(f.accept); assert.equal(f.scripts.length, 1);
});
