const BASE_URL = process.env.NEXT_PUBLIC_GLORIAM_API_URL?.trim() || '';

type ApiResult = { ok: boolean; error?: string; [key: string]: unknown };

function getReferrerChannel(referrer: string): string {
  if (!referrer) return 'direct';
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host.includes('google.')) return 'google';
    if (host.includes('bing.')) return 'bing';
    if (host.includes('facebook.') || host.includes('fb.')) return 'facebook';
    if (host.includes('linkedin.')) return 'linkedin';
    if (host.includes('twitter.') || host.includes('x.com')) return 'twitter';
    if (host.includes('instagram.')) return 'instagram';
    if (typeof window !== 'undefined' && host === window.location.hostname) return 'direct';
    return 'referral';
  } catch {
    return 'direct';
  }
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  const key = 'gloriam_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

async function request(action: string, payload: Record<string, unknown>): Promise<ApiResult> {
  if (!BASE_URL) return { ok: false, error: 'API non configurée' };

  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, ...payload }),
    });
    const text = await res.text();
    let data: ApiResult;
    try {
      data = JSON.parse(text) as ApiResult;
    } catch {
      return { ok: false, error: 'Réponse API invalide' };
    }
    if (!res.ok || data.error) {
      return { ok: false, error: (data.error as string) || 'Erreur serveur' };
    }
    return { ...data, ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Réseau' };
  }
}

export function isGloriamApiConfigured(): boolean {
  return !!BASE_URL;
}

export type ContactPayload = {
  source?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  location?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  project_details?: string;
  hp_field?: string;
  form_ts?: number;
  turnstile_token?: string;
  client_id?: string;
};

export async function insertGloriamContact(payload: ContactPayload): Promise<ApiResult> {
  const row = {
    source: payload.source || 'form',
    name: payload.name.trim().slice(0, 200),
    email: payload.email.trim().slice(0, 200),
    phone: (payload.phone || '').trim().slice(0, 50),
    company: (payload.company || '').trim().slice(0, 300),
    subject: (payload.subject || '').trim().slice(0, 300),
    message: payload.message.trim().slice(0, 8000),
    location: (payload.location || '').trim().slice(0, 200),
    service: payload.service || '',
    budget: payload.budget || '',
    timeline: payload.timeline || '',
    project_details: payload.project_details || '',
  };

  if (!row.name || !row.email || !row.message) {
    return { ok: false, error: 'Champs requis manquants' };
  }

  return request('contact', {
    ...row,
    hp_field: payload.hp_field || '',
    form_ts: payload.form_ts || 0,
    turnstile_token: payload.turnstile_token || '',
    client_id: payload.client_id || getSessionId(),
  });
}

export async function trackGloriamPageView(): Promise<void> {
  if (!BASE_URL || typeof window === 'undefined') return;
  if (window.location.pathname.includes('/admin/')) return;

  const path = window.location.pathname + window.location.search;
  const dedupeKey = `gloriam_tracked_${path}`;
  if (sessionStorage.getItem(dedupeKey)) return;
  sessionStorage.setItem(dedupeKey, '1');

  const referrer = document.referrer || '';
  await request('visit', {
    session_id: getSessionId(),
    page_path: path.slice(0, 500),
    page_title: (document.title || '').slice(0, 300),
    referrer: referrer.slice(0, 500),
    referrer_channel: getReferrerChannel(referrer),
    user_agent: (navigator.userAgent || '').slice(0, 500),
    language: (navigator.language || '').slice(0, 20),
  });
}
