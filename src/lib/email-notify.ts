// Email notification via Namecheap Private Email SMTP.
// Sends inquiry notifications to info@aikeruiclean.com (no IP whitelist
// restriction like Brevo had — Namecheap SMTP accepts any authenticated sender).
// Failure is silent — email must never block the inquiry response.

import nodemailer from "nodemailer";

export interface InquiryEmailInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  product?: string;
  quantity?: string;
  message?: string;
  assignedTo?: string;
  gclid?: string;
  landing_page?: string;
  utm_source?: string;
  utm_campaign?: string;
}

function escHtml(s?: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Send inquiry notification email to info@ via Namecheap SMTP.
 * Returns true on success, false on failure (never throws).
 */
export async function sendInquiryEmail(
  input: InquiryEmailInput
): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER; // e.g. info@aikeruiclean.com
  const pass = process.env.SMTP_PASS;
  const to = process.env.SMTP_TO || user;

  if (!host || !user || !pass) {
    console.warn(
      "[Email] SMTP env not configured (SMTP_HOST/USER/PASS) — skipping."
    );
    return false;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host, // smtp.gmail.com or mail.privateemail.com
    port,
    secure: port === 465, // 465 = implicit SSL; 587 = STARTTLS
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
  });

  const html = `
    <html><body style="font-family:Arial,sans-serif;padding:20px">
      <h2>New Product Inquiry</h2>
      <p style="color:#666">Logged in HubSpot CRM · Suggested owner: ${escHtml(input.assignedTo || "-")}</p>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Name</td><td style="padding:8px;border:1px solid #ddd">${escHtml(input.name)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px;border:1px solid #ddd">${escHtml(input.email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Phone</td><td style="padding:8px;border:1px solid #ddd">${escHtml(input.phone)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Company</td><td style="padding:8px;border:1px solid #ddd">${escHtml(input.company)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Country</td><td style="padding:8px;border:1px solid #ddd">${escHtml(input.country)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Product</td><td style="padding:8px;border:1px solid #ddd">${escHtml(input.product)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Quantity</td><td style="padding:8px;border:1px solid #ddd">${escHtml(input.quantity)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Google Click ID</td><td style="padding:8px;border:1px solid #ddd">${escHtml(input.gclid || "-")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Landing</td><td style="padding:8px;border:1px solid #ddd">${escHtml(input.landing_page || "-")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">UTM</td><td style="padding:8px;border:1px solid #ddd">${escHtml(input.utm_source ? `${input.utm_source}/${input.utm_campaign || ""}` : "-")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Message</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${escHtml(input.message)}</td></tr>
      </table>
      <p style="color:#666;font-size:12px">Received: ${new Date().toISOString()} · Suggest assign to ${escHtml(input.assignedTo || "-")}</p>
    </body></html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Aikerui Website" <${user}>`,
      to, // info@aikeruiclean.com
      subject: `New Inquiry: ${escHtml(input.product || "General")} (assign ${escHtml(input.assignedTo || "-")})`,
      html,
    });
    console.log("[Email] inquiry notification sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("[Email] SMTP send error (non-blocking):", err);
    return false;
  }
}
