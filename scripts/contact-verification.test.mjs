import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const code = stripTypeScriptTypes(readFileSync(new URL('../src/lib/contact-verification.ts', import.meta.url), 'utf8')).replace('export function', 'function');
const tick = () => new Promise(resolve => setImmediate(resolve));
function fixture({ key = 'public-test-key', width = 320 } = {}) {
  const scripts = [], renders = [], resets = [], listeners = {}, clicks = {};
  let errors = 0, token = '';
  const controller = new AbortController();
  const document = {
    activeElement: null,
    createElement: () => ({ remove() { this.removed = true; } }),
    head: { append(script) { scripts.push(script); } },
  };
  const target = { clientWidth: width, setAttribute() {}, removeAttribute() {}, focus() { document.activeElement = target; } };
  const button = { hidden: false, addEventListener(name, fn) { clicks[name] = fn; } };
  const template = { content: { querySelector() { return key ? { dataset: { sitekey: key } } : null; } } };
  const form = {
    querySelector(selector) { return selector.endsWith('-template') ? template : selector.endsWith('-load') ? button : target; },
    addEventListener(name, fn) { listeners[name] = fn; },
  };
  const window = { setTimeout: () => 1, clearTimeout() {} };
  const context = vm.createContext({ window, document, Promise, Error });
  vm.runInContext(code + '\nglobalThis.setup = setupContactVerification;', context);
  const verification = context.setup(form, controller.signal, () => errors++);
  return { scripts, renders, resets, target, button, document, verification, controller,
    get errors() { return errors; },
    event(name) { listeners[name]?.(); },
    click() { document.activeElement = button; clicks.click(); },
    token(value) { token = value; },
    ready() {
      window.grecaptcha = {
        render(target, options) { renders.push({ target, options }); return 0; },
        getResponse(id) { assert.equal(id, 0); return token; },
        reset(id) { resets.push(id); token = ''; },
      };
      window.chrowmCaptchaReady();
    },
  };
}

test('initial page does not request Google; first interaction starts one async explicit load', async () => {
  const f = fixture(); assert.equal(f.scripts.length, 0); assert.equal(f.verification.response(), '');
  f.event('focusin'); f.event('input'); f.event('focusin');
  assert.equal(f.scripts.length, 1); assert.ok(f.scripts[0].async && f.scripts[0].defer);
  assert.match(f.scripts[0].src, /render=explicit/);
  f.ready(); await tick(); assert.equal(f.renders.length, 1); assert.equal(f.button.hidden, true);
  assert.equal(f.renders[0].options.sitekey, 'public-test-key');
});
test('ordinary typing and ensure preserve a completed token; reset clears it', async () => {
  const f = fixture(); f.event('input'); f.ready(); await tick(); f.token('valid-response');
  f.event('input'); f.event('focusin'); await f.verification.ensure();
  assert.equal(f.verification.response(), 'valid-response'); assert.equal(f.resets.length, 0);
  f.verification.reset(); assert.equal(f.verification.response(), ''); assert.deepEqual(f.resets, [0]);
});
test('missing Netlify markup fails visibly without requesting an unrelated CAPTCHA', async () => {
  const f = fixture({ key: '' }); await f.verification.ensure();
  assert.equal(f.scripts.length, 0); assert.equal(f.errors, 1); assert.equal(f.button.disabled, false);
});
test('a failed script can be retried and renders once after recovery', async () => {
  const f = fixture(); f.event('input'); f.scripts[0].onerror(); await tick();
  assert.equal(f.errors, 1); assert.equal(f.scripts[0].removed, true);
  f.click(); assert.equal(f.scripts.length, 2); f.ready(); await tick();
  assert.equal(f.renders.length, 1); assert.equal(f.document.activeElement, f.target);
});
test('leaving the page during loading does not render into its old form', async () => {
  const f = fixture(); f.event('input'); f.controller.abort(); f.ready(); await tick();
  assert.equal(f.renders.length, 0); assert.equal(f.errors, 0);
});
test('keyboard activation transfers focus before hiding its button; typing focus is preserved', async () => {
  const f = fixture(); f.click(); f.ready(); await tick(); assert.equal(f.document.activeElement, f.target);
  const typed = fixture(); const field = {}; typed.document.activeElement = field;
  typed.event('input'); typed.ready(); await tick(); assert.equal(typed.document.activeElement, field);
});
test('widget errors expose a retry; retry resets the existing widget without another script', async () => {
  const f = fixture({ width: 280 }); f.event('input'); f.ready(); await tick();
  assert.equal(f.renders[0].options.size, 'compact'); f.renders[0].options['error-callback']();
  assert.equal(f.button.hidden, false); f.click(); await tick();
  assert.deepEqual(f.resets, [0]); assert.equal(f.scripts.length, 1); assert.equal(f.button.hidden, true);
});
