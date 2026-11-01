// "Register for project work" endpoint (Careers page): validates the registration and emails it to the team.
// No auto-reply: many registrants won't have email; the team contacts them by phone.
import type { APIRoute } from 'astro';
import { getMailer, isValidName, isValidEmail, isValidSaPhone, createRateLimiter, escapeHtml, json, methodNotAllowed as notAllowed, makeReference } from '../../lib/mailer';

export const prerender = false;

const SKILLS = ['General labour', 'Cleaning', 'Bricklaying / building', 'Plumbing', 'Electrical', 'Painting', 'Driving (with licence)', 'Waste collection & sorting', 'Security', 'Other'];
const EXPERIENCE = ['No experience yet', 'Less than 1 year', '1–3 years', '3–5 years', 'More than 5 years'];

const rules: Record<string, (v: string) => string> = {
  name: (v) => (!v ? 'Please enter your name.' : !isValidName(v) ? 'Please enter a valid name.' : ''),
  phone: (v) => (!v ? 'Please enter a phone number.' : !isValidSaPhone(v) ? 'Please enter a valid South African phone number.' : ''),
  area: (v) => (v.length < 2 || v.length > 80 ? 'Please tell us your area or township.' : ''),
  email: (v) => (!v || isValidEmail(v) ? '' : 'Please enter a valid email address, or leave it blank.'),
  skill: (v) => (SKILLS.includes(v) ? '' : 'Please choose your main skill.'),
  experience: (v) => (EXPERIENCE.includes(v) ? '' : 'Please choose your experience.'),
  consent: (v) => (v === 'yes' ? '' : 'Please tick the box so we can keep your details.'),
};

const isRateLimited = createRateLimiter();
const methodNotAllowed: APIRoute = notAllowed('project work registration');
export const GET = methodNotAllowed;
export const ALL = methodNotAllowed;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, message: 'Invalid request.' }, 400);
  }
  if (typeof data.company_website === 'string' && data.company_website.trim() !== '') return json({ ok: true }); // honeypot
  if (isRateLimited(clientAddress ?? 'unknown')) return json({ ok: false, message: 'Too many registrations from this connection. Please try again in a few minutes.' }, 429);

  const values = Object.fromEntries(Object.keys(rules).map((k) => [k, String(data[k] ?? '').trim()]));
  const errors = Object.fromEntries(Object.entries(rules).map(([k, rule]) => [k, rule(values[k])]).filter(([, m]) => m));
  if (Object.keys(errors).length) return json({ ok: false, message: 'Please fix the highlighted fields.', errors }, 422);

  const mailer = getMailer();
  if (!mailer) {
    console.error('[project-work] SMTP is not configured. Copy .env.example to .env and fill it in.');
    return json({ ok: false, message: 'Registration is temporarily unavailable. Please try again later.' }, 500);
  }

  const { reference, submittedAt } = makeReference('WRK');
  const { name, phone, area, email, skill, experience } = values;
  const rows: [string, string][] = [
    ['Reference', reference], ['Name', name], ['Phone', phone], ['Area', area], ['Email', email || '-'],
    ['Main skill', skill], ['Experience', experience], ['Consent', 'Agreed to be kept on file for 12 months'], ['Received', submittedAt],
  ];
  const text = `New project work registration\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n`;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#202521;max-width:600px">
      <h2 style="margin:0 0 4px;font-size:18px">New project work registration</h2>
      <p style="margin:0 0 16px;color:#666D68">${escapeHtml(skill)} · ${escapeHtml(area)}</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows.map(([k, v]) => `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #DDE1DC;color:#666D68;width:110px">${k}</td><td style="padding:8px 0;border-bottom:1px solid #DDE1DC">${escapeHtml(v)}</td></tr>`).join('')}
      </table>
      <p style="margin:24px 0 0;font-size:12px;color:#9aa19c">Sent from the Careers page of the Musenga Investments website. POPIA: delete this registration after 12 months, or sooner if the person asks.</p>
    </div>`;

  try {
    await mailer.transporter.sendMail({
      from: mailer.from,
      to: mailer.to,
      ...(email ? { replyTo: { name, address: email } } : {}),
      subject: `Project work registration: ${skill} — ${name}, ${area} (Ref ${reference})`,
      text,
      html,
    });
    return json({ ok: true });
  } catch (error) {
    console.error('[project-work] Failed to send email:', error);
    return json({ ok: false, message: 'Sorry, your registration could not be sent right now. Please try again.' }, 502);
  }
};
