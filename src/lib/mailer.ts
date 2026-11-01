// Shared helpers for the form endpoints (enquiry form, project work registration):
// .env settings, the SMTP transport, validation rules, a simple rate limiter and small utilities.
import nodemailer from 'nodemailer';

// Settings from .env (read once at server start; restart the server after editing .env).
// Static `import.meta.env.X` references are what Astro/Vite reliably fill in on the server.
const config = {
  SMTP_HOST: import.meta.env.SMTP_HOST ?? process.env.SMTP_HOST,
  SMTP_PORT: import.meta.env.SMTP_PORT ?? process.env.SMTP_PORT,
  SMTP_USER: import.meta.env.SMTP_USER ?? process.env.SMTP_USER,
  SMTP_PASS: import.meta.env.SMTP_PASS ?? process.env.SMTP_PASS,
  ENQUIRY_TO: import.meta.env.ENQUIRY_TO ?? process.env.ENQUIRY_TO,
  ENQUIRY_FROM_NAME: import.meta.env.ENQUIRY_FROM_NAME ?? process.env.ENQUIRY_FROM_NAME,
  SEND_AUTO_REPLY: import.meta.env.SEND_AUTO_REPLY ?? process.env.SEND_AUTO_REPLY,
} as Record<string, string | undefined>;
export const env = (key: string) => config[key]?.trim() || undefined;

/** The SMTP transport plus sender/recipient, or null when .env isn't filled in. */
export function getMailer() {
  const host = env('SMTP_HOST');
  const user = env('SMTP_USER');
  const pass = env('SMTP_PASS')?.replace(/\s+/g, ''); // Google shows app passwords with spaces; SMTP needs them without
  const to = env('ENQUIRY_TO') ?? user;
  if (!host || !user || !pass || !to) return null;
  const port = Number(env('SMTP_PORT') ?? 465);
  return {
    transporter: nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } }),
    user,
    to,
    from: { name: env('ENQUIRY_FROM_NAME') ?? 'Musenga Website', address: user }, // Gmail requires sending as the authenticated account
  };
}

// Validation rules shared by the forms (the same rules run in the browser).
export const isValidName = (v: string) => v.length >= 2 && v.length <= 80 && /^[\p{L}][\p{L}\s.'-]*$/u.test(v);
export const isValidEmail = (v: string) => v.length <= 120 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
export const isValidSaPhone = (v: string) => /^(\+27|0)\d{9}$/.test(v.replace(/[\s\-()]/g, ''));

/** Per-IP rate limiter: at most `max` submissions per `windowMs` (in memory; resets when the server restarts). */
export function createRateLimiter(max = 5, windowMs = 10 * 60 * 1000) {
  const recent = new Map<string, number[]>();
  return (ip: string) => {
    const now = Date.now();
    const hits = (recent.get(ip) ?? []).filter((t) => now - t < windowMs);
    hits.push(now);
    recent.set(ip, hits);
    return hits.length > max;
  };
}

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
export const json = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
export const methodNotAllowed = (what: string) => () =>
  new Response(JSON.stringify({ ok: false, message: `This address only accepts ${what} submissions (POST).` }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });

/** Reference like MUS-261017-4K7Q (prefix + date in SAST + 4 random characters). */
export function makeReference(prefix = 'MUS') {
  const now = new Date();
  const datePart = new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', year: '2-digit', month: '2-digit', day: '2-digit' })
    .formatToParts(now).filter((p) => p.type !== 'literal').map((p) => p.value).join('');
  const reference = `${prefix}-${datePart}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const submittedAt = new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', dateStyle: 'long', timeStyle: 'short' }).format(now) + ' (SAST)';
  return { reference, submittedAt };
}
