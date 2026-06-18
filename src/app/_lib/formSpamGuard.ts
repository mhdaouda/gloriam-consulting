export const FORM_MIN_MS = 4000;
export const RATE_LIMIT_MAX = 3;
export const SESSION_RATE_MAX = 2;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
export const MIN_COOLDOWN_MS = 90_000;

export type SpamCheckInput = {
  honeypot?: string;
  formStartedAt: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export type SpamCheckResult =
  | { ok: true }
  | { ok: false; code: SpamErrorCode };

export type SpamErrorCode =
  | 'honeypot'
  | 'too_fast'
  | 'cooldown'
  | 'rate_limit'
  | 'session_limit'
  | 'invalid_email'
  | 'too_many_links'
  | 'spam_content'
  | 'message_short'
  | 'duplicate'
  | 'service_busy';

const RATE_KEY = 'gloriam_contact_submissions';
const SESSION_RATE_KEY = 'gloriam_contact_session_submissions';
const COOLDOWN_KEY = 'gloriam_contact_last_submit';
const DUP_KEY = 'gloriam_last_contact_hash';

const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|lottery|forex signal|crypto pump|buy followers)\b/i,
  /\b(seo services|link building|guest post)\b.*\b(cheap|guaranteed)\b/i,
  /\b(click here|act now|limited time)\b.*\b(http|www\.)/i,
  /\[url=/i,
  /<script/i,
];

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'tempmail.com',
  'yopmail.com',
  '10minutemail.com',
  'throwaway.email',
  'trashmail.com',
]);

function countUrls(text: string): number {
  const matches = text.match(/https?:\/\/|www\.\S+/gi);
  return matches ? matches.length : 0;
}

export function isValidContactEmail(email: string): boolean {
  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return false;
  const domain = trimmed.split('@')[1];
  if (DISPOSABLE_DOMAINS.has(domain)) return false;
  return true;
}

function readRateTimestamps(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RATE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as number[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRateTimestamps(timestamps: number[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(RATE_KEY, JSON.stringify(timestamps));
}

function readSessionRateTimestamps(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(SESSION_RATE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as number[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSessionRateTimestamps(timestamps: number[]) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SESSION_RATE_KEY, JSON.stringify(timestamps));
}

function contactFingerprint(email: string, message: string): string {
  return `${email.trim().toLowerCase()}|${message.trim().slice(0, 240)}`;
}

export function getCooldownRemainingMs(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const last = parseInt(sessionStorage.getItem(COOLDOWN_KEY) || '0', 10);
    if (!last) return 0;
    return Math.max(0, MIN_COOLDOWN_MS - (Date.now() - last));
  } catch {
    return 0;
  }
}

export function isWithinRateLimit(): boolean {
  const now = Date.now();
  const recent = readRateTimestamps().filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  writeRateTimestamps(recent);
  return recent.length < RATE_LIMIT_MAX;
}

function isWithinSessionRateLimit(): boolean {
  const now = Date.now();
  const recent = readSessionRateTimestamps().filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  writeSessionRateTimestamps(recent);
  return recent.length < SESSION_RATE_MAX;
}

export function recordContactSubmission() {
  const now = Date.now();
  const recent = readRateTimestamps().filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  writeRateTimestamps(recent);

  const sessionRecent = readSessionRateTimestamps().filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  sessionRecent.push(now);
  writeSessionRateTimestamps(sessionRecent);

  sessionStorage.setItem(COOLDOWN_KEY, String(now));
}

export function recordContactDuplicate(email: string, message: string) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(DUP_KEY, contactFingerprint(email, message));
}

function isDuplicateContact(email: string, message: string): boolean {
  if (typeof window === 'undefined') return false;
  const current = contactFingerprint(email, message);
  return sessionStorage.getItem(DUP_KEY) === current;
}

export function validateContactSpam(input: SpamCheckInput): SpamCheckResult {
  if (input.honeypot?.trim()) {
    return { ok: false, code: 'honeypot' };
  }

  if (Date.now() - input.formStartedAt < FORM_MIN_MS) {
    return { ok: false, code: 'too_fast' };
  }

  if (getCooldownRemainingMs() > 0) {
    return { ok: false, code: 'cooldown' };
  }

  if (!isWithinSessionRateLimit()) {
    return { ok: false, code: 'session_limit' };
  }

  if (!isWithinRateLimit()) {
    return { ok: false, code: 'rate_limit' };
  }

  if (isDuplicateContact(input.email, input.message)) {
    return { ok: false, code: 'duplicate' };
  }

  if (!isValidContactEmail(input.email)) {
    return { ok: false, code: 'invalid_email' };
  }

  const message = input.message.trim();
  if (message.length < 10) {
    return { ok: false, code: 'message_short' };
  }

  const blob = `${input.name} ${input.subject || ''} ${message}`;
  if (countUrls(blob) > 4) {
    return { ok: false, code: 'too_many_links' };
  }

  if (SPAM_PATTERNS.some((pattern) => pattern.test(blob))) {
    return { ok: false, code: 'spam_content' };
  }

  return { ok: true };
}

export function getTurnstileSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || '';
}

export function isTurnstileEnabled(): boolean {
  return !!getTurnstileSiteKey();
}

const CHATBOT_RATE_KEY = 'gloriam_chatbot_leads';
const CHATBOT_RATE_MAX = 5;

export function canSendChatbotLead(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const now = Date.now();
    const raw = localStorage.getItem(CHATBOT_RATE_KEY);
    const timestamps = raw ? (JSON.parse(raw) as number[]) : [];
    const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    return recent.length < CHATBOT_RATE_MAX;
  } catch {
    return true;
  }
}

export function recordChatbotLead() {
  if (typeof window === 'undefined') return;
  const now = Date.now();
  const raw = localStorage.getItem(CHATBOT_RATE_KEY);
  const timestamps = raw ? (JSON.parse(raw) as number[]) : [];
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  localStorage.setItem(CHATBOT_RATE_KEY, JSON.stringify(recent));
}
