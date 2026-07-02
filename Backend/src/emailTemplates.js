// HTML + plain-text email templates for the CMS.

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/**
 * Notification sent to the admin when someone submits the Contact form.
 * Returns { subject, html, text }.
 */
function contactAdminTemplate({ name, email, message, date }) {
  const safeName = esc(name);
  const safeEmail = esc(email);
  const safeMessage = esc(message).replace(/\n/g, '<br>');
  const when = date || new Date().toLocaleString();

  const subject = `New contact message from ${name}`;

  const text =
    `New contact form submission — Royal Care Foundation\n\n` +
    `Name:    ${name}\n` +
    `Email:   ${email}\n` +
    `Date:    ${when}\n\n` +
    `Message:\n${message}\n`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f6f4ef;font-family:Arial,Helvetica,sans-serif;color:#1c1a17;">
    <div style="max-width:600px;margin:0 auto;padding:24px;">
      <div style="background:#17150f;border-radius:14px 14px 0 0;padding:24px 28px;">
        <div style="display:inline-block;width:38px;height:38px;line-height:38px;text-align:center;border-radius:50%;background:linear-gradient(135deg,#d4a24e,#b58a1f);color:#fff;font-weight:bold;font-size:18px;">R</div>
        <span style="color:#f4ecdc;font-size:18px;font-weight:bold;vertical-align:middle;margin-left:10px;">Royal Care <span style="color:#d4a24e;">Foundation</span></span>
      </div>
      <div style="background:#ffffff;border:1px solid rgba(28,26,23,0.1);border-top:none;border-radius:0 0 14px 14px;padding:28px;">
        <p style="margin:0 0 4px;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#b58a1f;">New Contact Message</p>
        <h2 style="margin:0 0 20px;font-size:22px;color:#1c1a17;">You've received a new enquiry</h2>

        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:10px 0;color:#8a847a;width:90px;vertical-align:top;">Name</td>
            <td style="padding:10px 0;font-weight:bold;color:#1c1a17;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#8a847a;vertical-align:top;border-top:1px solid rgba(28,26,23,0.08);">Email</td>
            <td style="padding:10px 0;border-top:1px solid rgba(28,26,23,0.08);"><a href="mailto:${safeEmail}" style="color:#b58a1f;text-decoration:none;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#8a847a;vertical-align:top;border-top:1px solid rgba(28,26,23,0.08);">Date</td>
            <td style="padding:10px 0;color:#1c1a17;border-top:1px solid rgba(28,26,23,0.08);">${esc(when)}</td>
          </tr>
        </table>

        <div style="margin-top:18px;padding:16px 18px;background:#faf7f0;border:1px solid rgba(28,26,23,0.08);border-left:3px solid #b58a1f;border-radius:8px;">
          <p style="margin:0 0 6px;text-transform:uppercase;letter-spacing:1px;font-size:11px;color:#8a847a;">Message</p>
          <p style="margin:0;line-height:1.7;color:#1c1a17;">${safeMessage}</p>
        </div>

        <a href="mailto:${safeEmail}" style="display:inline-block;margin-top:22px;padding:11px 22px;background:linear-gradient(135deg,#d4a24e,#b58a1f);color:#ffffff;text-decoration:none;border-radius:999px;font-weight:bold;font-size:14px;">Reply to ${safeName}</a>
      </div>
      <p style="text-align:center;color:#8a847a;font-size:12px;margin:16px 0 0;">This is an automated notification from the Royal Care Foundation website.</p>
    </div>
  </body>
</html>`;

  return { subject, html, text };
}

module.exports = { contactAdminTemplate };
