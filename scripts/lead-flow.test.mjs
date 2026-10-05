import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';

const source = readFileSync(new URL('../src/components/ContactForm.astro', import.meta.url), 'utf8');
const formCode = stripTypeScriptTypes(source.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/import .*?;\s*/, ''));
const analyticsCode = stripTypeScriptTypes(readFileSync(new URL('../src/scripts/analytics.ts', import.meta.url), 'utf8'));
// Use the actual form markup and handlers. Only provider/network boundaries are mocked.
const markup = source.slice(source.indexOf('<form'), source.indexOf('</form>') + 7);
const tick = () => new Promise(resolve => setTimeout(resolve, 0));
function fixture({ consent = true, status = 200, token = 'test-only-token', reject = false } = {}) {
  const dom = new JSDOM(`<link rel="canonical" href="https://chrowmdesigns.com/contact/"><main id="main-content"></main><div id="analytics-runtime"></div>${markup}`, { url: 'https://chrowmdesigns.com/contact/', runScripts: 'outside-only' });
  const w = dom.window, d = w.document, requests = [];
  if (consent) w.localStorage.setItem('chrowm.analytics-consent.v1', JSON.stringify({choice:'accepted',expires:Date.now()+60000}));
  w.setupContactVerification = () => ({ response: () => token, ensure: async () => {}, reset: () => {} });
  w.fetch = async (url, options) => { requests.push({url,options}); if (reject) throw Error('network'); return {ok: status >= 200 && status < 300,status}; };
  w.eval(analyticsCode); w.eval(formCode);
  for (const field of d.querySelectorAll('input.contact-form__input,textarea.contact-form__textarea')) field.value = field.type === 'email' ? 'test-person@example.invalid' : 'Automated test only';
  return { w,d,requests,events: () => (w.dataLayer || []).map(a => Array.from(a)).filter(a => a[0] === 'event'),
    async submit() { d.getElementById('contact-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true})); await tick(); }, close: () => w.close() };
}
test('confirmed inquiry emits one consented generate_lead with no personal data', async () => {
  const f=fixture(); try { await f.submit(); assert.equal(f.requests.length,1); assert.equal(f.requests[0].url,'/');
    const leads=f.events().filter(e=>e[1]==='generate_lead'); assert.equal(leads.length,1); assert.equal(JSON.stringify(leads[0][2]),JSON.stringify({form_id:'studio_contact'}));
    assert.ok(!JSON.stringify(f.events()).includes('test-person')); assert.ok(!f.events().some(e=>e[1]==='consultation_booked'));
  } finally {f.close();}
});
for (const status of [400,403,429,500]) test(`HTTP ${status} does not count as an inquiry`,async()=>{
  const f=fixture({status});try{await f.submit();assert.equal(f.requests.length,1);assert.ok(!f.events().some(e=>e[1]==='generate_lead'));assert.equal(f.d.getElementById('cf-email').value,'test-person@example.invalid');}finally{f.close();}
});
test('network failure preserves the form and records no lead',async()=>{const f=fixture({reject:true});try{await f.submit();assert.ok(!f.events().some(e=>e[1]==='generate_lead'));assert.equal(f.d.getElementById('cf-email').value,'test-person@example.invalid');}finally{f.close();}});
test('no CAPTCHA response prevents submission and lead recording',async()=>{const f=fixture({token:''});try{await f.submit();assert.equal(f.requests.length,0);assert.ok(!f.events().some(e=>e[1]==='generate_lead'));}finally{f.close();}});
test('invalid email prevents submission and lead recording',async()=>{const f=fixture();try{f.d.getElementById('cf-email').value='bad';await f.submit();assert.equal(f.requests.length,0);assert.ok(!f.events().some(e=>e[1]==='generate_lead'));}finally{f.close();}});
test('successful inquiry without consent is not tracked',async()=>{const f=fixture({consent:false});try{await f.submit();assert.equal(f.requests.length,1);assert.equal(f.events().length,0);assert.equal(f.d.querySelectorAll('#analytics-runtime script').length,0);}finally{f.close();}});
test('duplicate submit while request is pending records one lead',async()=>{const f=fixture();try{const form=f.d.getElementById('contact-form');form.dispatchEvent(new f.w.Event('submit',{cancelable:true}));form.dispatchEvent(new f.w.Event('submit',{cancelable:true}));await tick();assert.equal(f.requests.length,1);assert.equal(f.events().filter(e=>e[1]==='generate_lead').length,1);}finally{f.close();}});
