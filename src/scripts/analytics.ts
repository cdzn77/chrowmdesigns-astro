// Basic consent mode: no Google script or request until the visitor opts in.
const measurementId = 'G-HP8BSKC4SC';
const preferenceKey = 'chrowm.analytics-consent.v1';
const lifetime = 180 * 24 * 60 * 60 * 1000;
type Choice = 'accepted' | 'declined' | null;
const analyticsWindow = window as typeof window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [key: `ga-disable-${string}`]: boolean;
};
let choice: Choice = null;
let loaded = false;
let lastPage = '';
let returnFocus: HTMLElement | null = null;
const production = location.hostname === 'chrowmdesigns.com' && location.protocol === 'https:';

function readChoice(): Choice {
  try {
    const value = JSON.parse(localStorage.getItem(preferenceKey) ?? 'null');
    return value && ['accepted', 'declined'].includes(value.choice) && value.expires > Date.now() ? value.choice : null;
  } catch { return null; }
}
function eligible() {
  return production && !document.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex');
}
function canonical() {
  const value = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;
  return value ? new URL(value).origin + new URL(value).pathname : location.origin + location.pathname;
}
function tag(...args: unknown[]) { analyticsWindow.gtag?.(...args); }
function start() {
  if (loaded || choice !== 'accepted' || !eligible()) return;
  loaded = true;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.gtag = function () { analyticsWindow.dataLayer!.push(arguments); };
  analyticsWindow[`ga-disable-${measurementId}`] = false;
  tag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  tag('consent', 'update', { analytics_storage: 'granted' });
  tag('js', new Date());
  tag('config', measurementId, {
    send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
    page_location: canonical(), page_referrer: referrer(), cookie_domain: 'none',
    cookie_flags: 'SameSite=Lax;Secure', cookie_expires: lifetime / 1000,
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.getElementById('analytics-runtime')?.appendChild(script);
}
function referrer() {
  if (lastPage) return lastPage;
  try { return document.referrer ? new URL(document.referrer).origin + '/' : ''; } catch { return ''; }
}
function pageView() {
  if (!eligible() || choice !== 'accepted') {
    analyticsWindow[`ga-disable-${measurementId}`] = true;
    return;
  }
  start();
  analyticsWindow[`ga-disable-${measurementId}`] = false;
  const page = canonical();
  if (page === lastPage) return;
  const context = { page_location: page, page_title: document.title, page_referrer: referrer() };
  // Update defaults for engagement events without sending another automatic view.
  tag('config', measurementId, { ...context, send_page_view: false });
  tag('event', 'page_view', context);
  lastPage = page;
}
function render(open = false) {
  const notice = document.getElementById('analytics-consent');
  if (notice) notice.hidden = !eligible() || (!open && choice !== null);
  document.querySelectorAll<HTMLElement>('[data-analytics-settings]').forEach(button => { button.hidden = !eligible(); });
  document.documentElement.dataset.analyticsConsent = choice ?? 'unset';
}
function clearCookies() {
  // Only our two Analytics cookies; never touch form-verification cookies.
  for (const name of ['_ga', `_ga_${measurementId.slice(2).replaceAll('-', '_')}`]) {
    for (const domain of ['', '; Domain=chrowmdesigns.com', '; Domain=.chrowmdesigns.com'])
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure${domain}`;
  }
}
function choose(next: Exclude<Choice, null>) {
  choice = next;
  try { localStorage.setItem(preferenceKey, JSON.stringify({ choice, expires: Date.now() + lifetime })); } catch { /* Session-only choice when storage is unavailable. */ }
  render();
  (returnFocus ?? document.getElementById('main-content'))?.focus({ preventScroll: true });
  returnFocus = null;
  if (choice === 'accepted') pageView();
  else {
    analyticsWindow[`ga-disable-${measurementId}`] = true;
    clearCookies();
    // A reload removes all handlers installed by the third-party SDK after revocation.
    if (loaded) location.reload();
  }
}
function init() { render(); pageView(); }
if (production) {
  choice = readChoice();
  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-analytics-choice], [data-analytics-settings], a[href]') : null;
    if (!target) return;
    if (target.hasAttribute('data-analytics-settings')) {
      returnFocus = target; render(true);
      document.querySelector<HTMLElement>('[data-analytics-choice]')?.focus({ preventScroll: true });
    } else if (target.dataset.analyticsChoice === 'accepted' || target.dataset.analyticsChoice === 'declined') choose(target.dataset.analyticsChoice);
    else if (choice === 'accepted' && eligible() && target instanceof HTMLAnchorElement && new URL(target.href).origin === location.origin && new URL(target.href).pathname === '/resume.pdf') {
      tag('event', 'file_download', { file_name: 'resume.pdf', file_extension: 'pdf' });
    }
  });
  document.addEventListener('chrowm:inquiry-sent', () => {
    if (choice === 'accepted' && eligible()) tag('event', 'generate_lead', { form_id: 'studio_contact' });
  });
  window.addEventListener('storage', event => {
    if (event.key !== preferenceKey) return;
    choice = readChoice();
    if (choice !== 'accepted' && loaded) { analyticsWindow[`ga-disable-${measurementId}`] = true; clearCookies(); location.reload(); }
    else init();
  });
  document.addEventListener('astro:page-load', init);
  init();
}
