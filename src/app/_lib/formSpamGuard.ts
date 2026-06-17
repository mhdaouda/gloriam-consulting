export const FORM_MIN_MS = 3500;
export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

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
  | 'rate_limit'
  | 'invalid_email'
  | 'too_many_links'
  | 'spam_content'
  | 'message_short'
  | 'duplicate';

const RATE_KEY = 'gloriam_contact_submissions';

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

export function isWithinRateLimit(): boolean {
  const now = Date.now();
  const recent = readRateTimestamps().filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  writeRateTimestamps(recent);
  return recent.length < RATE_LIMIT_MAX;
}

export function recordContactSubmission() {
  const now = Date.now();
  const recent = readRateTimestamps().filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  writeRateTimestamps(recent);
}

export function validateContactSpam(input: SpamCheckInput): SpamCheckResult {
  if (input.honeypot?.trim()) {
    return { ok: false, code: 'honeypot' };
  }

  if (Date.now() - input.formStartedAt < FORM_MIN_MS) {
    return { ok: false, code: 'too_fast' };
  }

  if (!isWithinRateLimit()) {
    return { ok: false, code: 'rate_limit' };
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
const CHATBOT_RATE_MAX = 8;

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
