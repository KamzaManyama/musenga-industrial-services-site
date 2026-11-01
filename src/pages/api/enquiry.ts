// Enquiry form endpoint: validates the submission on the server and emails it via SMTP (Gmail for now).
// Runs on the server (not pre-built), so SMTP credentials from .env never reach the browser.
import type { APIRoute } from 'astro';
import { autoReplyEmail } from '../../lib/emails/autoReply';
import { env, getMailer, isValidName, isValidEmail, isValidSaPhone, createRateLimiter, escapeHtml, json, methodNotAllowed as notAllowed, makeReference } from '../../lib/mailer';

export const prerender = false;


const SERVICES = [
  'Waste management',
  'Cleaning and hygiene',
  'Building construction and maintenance',
  'Partnership or procurement enquiry',
  'Job application',
  'Other',
];

// Same rules as the browser-side validation in ContactSection.astro.
const isRateLimited = createRateLimiter();
const rules: Record<string, (v: string) => string> = {
  name: (v) => (!v ? 'Please enter your name.' : !isValidName(v) ? 'Please enter a valid name.' : ''),
  email: (v) => (!v ? 'Please enter your email address.' : !isValidEmail(v) ? 'Please enter a valid email address.' : ''),
  phone: (v) => (!v ? '' : isValidSaPhone(v) ? '' : 'Please enter a valid South African phone number.'),
  service: (v) => (SERVICES.includes(v) ? '' : 'Please choose a service.'),
  message: (v) => (!v ? 'Please tell us what you need.' : v.length < 10 || v.length > 2000 ? 'Your message must be between 10 and 2000 characters.' : ''),
};



// Opening the endpoint in a browser (or any method other than POST) explains what it is
// instead of showing the 404 page.
const methodNotAllowed: APIRoute = notAllowed('enquiry form');
export const GET = methodNotAllowed;
export const ALL = methodNotAllowed;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, message: 'Invalid request.' }, 400);
  }

  // Honeypot: real visitors never see or fill the "company_website" field; bots usually do.
  // Pretend success so bots don't learn they were caught.
  if (typeof data.company_website === 'string' && data.company_website.trim() !== '') {
    return json({ ok: true });
  }

  if (isRateLimited(clientAddress ?? 'unknown')) {
    return json({ ok: false, message: 'Too many enquiries from this connection. Please try again in a few minutes.' }, 429);
  }

  const values = Object.fromEntries(Object.keys(rules).map((k) => [k, String(data[k] ?? '').trim()]));
  const errors = Object.fromEntries(Object.entries(rules).map(([k, rule]) => [k, rule(values[k])]).filter(([, m]) => m));
  if (Object.keys(errors).length) {
    return json({ ok: false, message: 'Please fix the highlighted fields.', errors }, 422);
  }

  const mailer = getMailer();
  if (!mailer) {
    console.error('[enquiry] SMTP is not configured. Copy .env.example to .env and fill it in.');
    return json({ ok: false, message: 'Our enquiry form is temporarily unavailable.' }, 500);
  }
  const { transporter, user, to } = mailer;

  const { name, email, phone, service, message } = values;
  const { reference, submittedAt } = makeReference('MUS');
  const rows: [string, string][] = [['Reference', reference], ['Name', name], ['Email', email], ['Phone', phone || '-'], ['Service', service]];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${message}\n`;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#202521;max-width:600px">
      <h2 style="margin:0 0 4px;font-size:18px">New website enquiry</h2>
      <p style="margin:0 0 16px;color:#666D68">${escapeHtml(service)}</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows.map(([k, v]) => `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #DDE1DC;color:#666D68;width:90px">${k}</td><td style="padding:8px 0;border-bottom:1px solid #DDE1DC">${escapeHtml(v)}</td></tr>`).join('')}
      </table>
      <p style="margin:20px 0 6px;color:#666D68">Message</p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
      <p style="margin:24px 0 0;font-size:12px;color:#9aa19c">Sent from the Musenga Investments website. Reply to this email to respond to ${escapeHtml(name)}.</p>
    </div>`;

  const { from } = mailer;

  // 1. The enquiry itself, to the team inbox.
  try {
    await transporter.sendMail({ from, to, replyTo: { name, address: email }, subject: `Website enquiry: ${service} — ${name} (Ref ${reference})`, text, html });
  } catch (error) {
    console.error('[enquiry] Failed to send email:', error);
    return json({ ok: false, message: 'Sorry, your enquiry could not be sent right now. Please try again.' }, 502);
  }

  // 2. Auto-reply to the visitor. If this fails the enquiry has still been delivered, so we only log it.
  if (env('SEND_AUTO_REPLY') !== 'false') {
    try {
      await transporter.sendMail({
        from: { name: 'Musenga Investments (No Reply)', address: user },
        to: { name, address: email },
        ...autoReplyEmail({ name, service, reference, submittedAt }),
      });
    } catch (error) {
      console.error('[enquiry] Enquiry sent, but the auto-reply failed:', error);
    }
  }

  return json({ ok: true });
};
