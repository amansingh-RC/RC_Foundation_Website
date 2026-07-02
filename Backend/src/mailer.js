const nodemailer = require('nodemailer');
const { contactAdminTemplate } = require('./emailTemplates');

let transporter = null;
let warned = false;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    if (!warned) {
      console.warn('[mailer] SMTP not configured (SMTP_HOST/SMTP_USER/SMTP_PASS missing) — contact emails are disabled.');
      warned = true;
    }
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true', // true for 465, false for 587
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

async function sendContactNotification({ name, email, message }) {
  const t = getTransporter();
  if (!t) return false;

  const to = process.env.MAIL_TO || process.env.SMTP_USER;
  const from = process.env.MAIL_FROM || `"Royal Care Foundation" <${process.env.SMTP_USER}>`;
  const { subject, html, text } = contactAdminTemplate({ name, email, message });

  try {
    await t.sendMail({ from, to, replyTo: email, subject, html, text });
    console.log(`[mailer] contact notification sent to ${to}`);
    return true;
  } catch (err) {
    console.error('[mailer] failed to send contact notification:', err.message);
    return false;
  }
}

module.exports = { sendContactNotification, getTransporter };
