// Branded confirmation email sent to a visitor after they submit the enquiry form.
// It deliberately does NOT repeat the visitor's message: otherwise anyone could type someone
// else's address and use the form to send that person text of their choosing.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { company } from '../../data/company';

const BRAND = { green: '#27A247', deep: '#1F5B2F', ink: '#202521', muted: '#666D68', mist: '#F3F4F1', line: '#DDE1DC' };
const LOGO_CID = 'musenga-logo';
const WEBSITE = 'www.musenga.co.za';
const HOURS = 'Monday – Friday, 08:00 – 17:00';

// The logo is embedded in the email (not linked), so it shows even before the site is live.
// In development it lives in public/; in a production build it is copied to dist/client/.
let logo: Buffer | null | undefined;
const loadLogo = () => {
  if (logo !== undefined) return logo;
  const candidates = ['public/assets/Musenga-Logo.png', 'dist/client/assets/Musenga-Logo.png', 'client/assets/Musenga-Logo.png'].map((p) => join(process.cwd(), p));
  const found = candidates.find((p) => existsSync(p));
  logo = found ? readFileSync(found) : null;
  if (!logo) console.warn('[enquiry] Logo not found for the auto-reply email; sending without it.');
  return logo;
};

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function autoReplyEmail({ name, service, reference, submittedAt }: { name: string; service: string; reference: string; submittedAt: string }) {
  const firstName = name.split(/\s+/)[0];
  const logoBuffer = loadLogo();
  const phoneHref = `tel:${company.phone.replace(/\s/g, '')}`;

  const text = [
    `Hi ${firstName},`,
    '',
    `Thank you for contacting ${company.legalName}. We have received your enquiry and a member of our team will get back to you as soon as possible.`,
    '',
    'Your enquiry',
    `  Reference: ${reference}`,
    `  Service:   ${service}`,
    `  Received:  ${submittedAt}`,
    '',
    `Please quote your reference number (${reference}) if you contact us about this enquiry.`,
    '',
    'Kind regards,',
    '',
    'The Musenga Investments Team',
    company.legalName,
    `T  ${company.phone}`,
    `E  ${company.email}`,
    `W  ${WEBSITE}`,
    `A  ${company.address}`,
    `Office hours: ${HOURS}`,
    '',
    '------------------------------------------------------------',
    'PLEASE DO NOT REPLY TO THIS EMAIL. This is an automated message and replies to this address are not monitored.',
    `For assistance, email ${company.email} or call ${company.phone}.`,
    '------------------------------------------------------------',
    '',
    `You received this email because this address was used on the enquiry form on the ${company.legalName} website. If this wasn't you, please ignore this email.`,
  ].join('\n');

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>We have received your enquiry</title></head>
<body style="margin:0;padding:0;background:${BRAND.mist};">
  <!-- Preheader (inbox preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Thanks ${escapeHtml(firstName)}, we've received your enquiry (ref ${reference}). Our team will be in touch soon.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.mist};">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:${BRAND.ink};">
        <!-- Brand bar + logo -->
        <tr><td style="height:5px;background:${BRAND.green};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 40px 20px;border-bottom:1px solid ${BRAND.line};">
          ${logoBuffer
            ? `<img src="cid:${LOGO_CID}" width="175" height="50" alt="${escapeHtml(company.legalName)}" style="display:block;border:0;width:175px;height:auto;">`
            : `<span style="font-size:20px;font-weight:bold;color:${BRAND.deep};">MUSENGA <span style="color:${BRAND.green};font-weight:normal;">INVESTMENTS</span></span>`}
        </td></tr>

        <!-- Message -->
        <tr><td style="padding:36px 40px 8px;font-size:15px;line-height:1.65;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;color:${BRAND.green};">Enquiry received</p>
          <h1 style="margin:0 0 20px;font-size:24px;line-height:1.3;color:${BRAND.ink};">Thank you, ${escapeHtml(firstName)}.</h1>
          <p style="margin:0 0 16px;">Thank you for contacting <strong>${escapeHtml(company.legalName)}</strong>. We have received your enquiry, and a member of our team will get back to you as soon as possible.</p>
        </td></tr>

        <!-- Enquiry summary -->
        <tr><td style="padding:8px 40px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.mist};font-size:14px;">
            <tr><td colspan="2" style="padding:16px 20px 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;color:${BRAND.muted};">Your enquiry</td></tr>
            <tr><td style="padding:6px 20px;color:${BRAND.muted};width:110px;">Reference</td><td style="padding:6px 20px 6px 0;font-weight:bold;">${reference}</td></tr>
            <tr><td style="padding:6px 20px;color:${BRAND.muted};">Service</td><td style="padding:6px 20px 6px 0;">${escapeHtml(service)}</td></tr>
            <tr><td style="padding:6px 20px 16px;color:${BRAND.muted};">Received</td><td style="padding:6px 20px 16px 0;">${escapeHtml(submittedAt)}</td></tr>
          </table>
          <p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:${BRAND.muted};">Please quote your reference number if you contact us about this enquiry.</p>
        </td></tr>

        <!-- Signature -->
        <tr><td style="padding:28px 40px 32px;font-size:15px;line-height:1.6;">
          <p style="margin:0 0 18px;">Kind regards,</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-left:3px solid ${BRAND.green};">
            <tr><td style="padding:2px 0 2px 16px;font-size:14px;line-height:1.7;">
              <strong style="font-size:15px;color:${BRAND.ink};">The Musenga Investments Team</strong><br>
              <span style="color:${BRAND.muted};">${escapeHtml(company.legalName)}</span><br>
              <span style="color:${BRAND.muted};">T</span>&nbsp; <a href="${phoneHref}" style="color:${BRAND.deep};text-decoration:none;">${company.phone}</a><br>
              <span style="color:${BRAND.muted};">E</span>&nbsp; <a href="mailto:${company.email}" style="color:${BRAND.deep};text-decoration:none;">${company.email}</a><br>
              <span style="color:${BRAND.muted};">W</span>&nbsp; <a href="https://${WEBSITE}" style="color:${BRAND.deep};text-decoration:none;">${WEBSITE}</a><br>
              <span style="color:${BRAND.muted};">A</span>&nbsp; ${escapeHtml(company.address)}<br>
              <span style="color:${BRAND.muted};font-size:13px;">Office hours: ${HOURS}</span>
            </td></tr>
          </table>
        </td></tr>

        <!-- Do not reply notice -->
        <tr><td style="padding:0 40px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.line};">
            <tr><td style="padding:14px 18px;font-size:13px;line-height:1.6;color:${BRAND.ink};">
              <strong>Please do not reply to this email.</strong> This is an automated message and replies to this address are not monitored.
              For assistance, email <a href="mailto:${company.email}" style="color:${BRAND.deep};">${company.email}</a> or call <a href="${phoneHref}" style="color:${BRAND.deep};">${company.phone}</a>.
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 40px 28px;background:${BRAND.ink};font-size:12px;line-height:1.6;color:#b9c0ba;">
          <strong style="color:#ffffff;">${escapeHtml(company.legalName)}</strong>${company.registrationNumber ? ` · Reg. no. ${escapeHtml(company.registrationNumber)}` : ''}<br>
          ${escapeHtml(company.address)}<br><br>
          You received this email because this address was used on the enquiry form on our website. If this wasn't you, please ignore this email.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return {
    subject: `We've received your enquiry (Ref ${reference}) — Musenga Investments`,
    text,
    html,
    attachments: logoBuffer ? [{ filename: 'musenga-logo.png', content: logoBuffer, cid: LOGO_CID }] : [],
  };
}
