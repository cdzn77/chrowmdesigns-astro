/** Load Netlify's injected CAPTCHA only when a visitor starts the form. */
type CaptchaApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => number;
  getResponse: (id: number) => string;
  reset: (id: number) => void;
};
type CaptchaWindow = Window & { grecaptcha?: CaptchaApi; chrowmCaptchaReady?: () => void };
const captchaWindow = window as CaptchaWindow;
let loading: Promise<CaptchaApi> | undefined;

function loadApi(): Promise<CaptchaApi> {
  if (captchaWindow.grecaptcha?.render) return Promise.resolve(captchaWindow.grecaptcha);
  if (loading) return loading;
  loading = new Promise<CaptchaApi>((resolve, reject) => {
    const script = document.createElement('script');
    const fail = () => {
      window.clearTimeout(timer);
      script.remove();
      delete captchaWindow.chrowmCaptchaReady;
      reject(new Error('Security check unavailable'));
    };
    const timer = window.setTimeout(fail, 20000);
    captchaWindow.chrowmCaptchaReady = () => {
      window.clearTimeout(timer);
      delete captchaWindow.chrowmCaptchaReady;
      if (captchaWindow.grecaptcha?.render) resolve(captchaWindow.grecaptcha);
      else fail();
    };
    script.src = 'https://www.google.com/recaptcha/api.js?onload=chrowmCaptchaReady&render=explicit';
    script.async = true;
    script.defer = true;
    script.onerror = fail;
    document.head.append(script);
  }).catch(error => { loading = undefined; throw error; });
  return loading;
}

export function setupContactVerification(form: HTMLFormElement, signal: AbortSignal, onError: () => void) {
  const template = form.querySelector<HTMLTemplateElement>('#cf-verification-template');
  const target = form.querySelector<HTMLElement>('#cf-verification');
  const button = form.querySelector<HTMLButtonElement>('#cf-verification-load');
  let widgetId: number | undefined;
  let pending = false;
  const showRetry = () => {
    if (signal.aborted) return;
    if (button) { button.hidden = false; button.disabled = false; button.textContent = 'Retry security check'; }
    if (target) target.removeAttribute('aria-busy');
    onError();
  };
  async function ensure(retry = false) {
    if (signal.aborted || pending) return;
    if (widgetId !== undefined) {
      if (retry) {
        captchaWindow.grecaptcha?.reset(widgetId);
        if (button && document.activeElement === button) target?.focus();
        if (button) button.hidden = true;
      }
      return;
    }
    // Netlify post-processing supplies this markup inside an inert template.
    // No shared key is hardcoded and no secret is sent to the browser.
    const sitekey = template?.content.querySelector<HTMLElement>('.g-recaptcha')?.dataset.sitekey;
    if (!sitekey || !target) { showRetry(); return; }
    pending = true;
    target.setAttribute('aria-busy', 'true');
    if (button) { button.disabled = true; button.textContent = 'Loading security check…'; }
    try {
      const api = await loadApi();
      if (signal.aborted) return;
      widgetId = api.render(target, {
        sitekey,
        theme: 'light',
        size: target.clientWidth < 304 ? 'compact' : 'normal',
        'error-callback': showRetry,
      });
      if (button && document.activeElement === button) target.focus();
      if (button) button.hidden = true;
      target.removeAttribute('aria-busy');
    } catch { showRetry(); }
    finally { pending = false; }
  }
  // Focus covers keyboard navigation and autofill; input covers other input methods.
  const start = () => { if (widgetId === undefined) void ensure(); };
  form.addEventListener('focusin', start, { signal });
  form.addEventListener('input', start, { signal });
  button?.addEventListener('click', () => { void ensure(true); }, { signal });
  return {
    ensure,
    response: () => widgetId === undefined ? '' : captchaWindow.grecaptcha?.getResponse(widgetId) || '',
    reset: () => { if (widgetId !== undefined) captchaWindow.grecaptcha?.reset(widgetId); },
  };
}
