import { NextRequest, NextResponse } from "next/server";
import { assignSalesperson } from "@/lib/lead-assignment";
import { saveLead } from "@/lib/lead-store";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwx7qOuIXLQSGv7UbDxyDNXsFcxi9i3TMuICL0FKnRJpLUFoFbsw2mm1zaTbOftOqFC/exec";
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// ── Validation ──────────────────────────────────────────────
const MAX_LENGTHS: Record<string, number> = {
  name: 100,
  email: 200,
  phone: 30,
  company: 150,
  country: 100,
  product: 200,
  quantity: 50,
  message: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Record<string, unknown>): {
  valid: boolean;
  error?: string;
  data?: Record<string, string>;
} {
  const fields = ["name", "email", "message"];
  for (const f of fields) {
    const v = body[f];
    if (typeof v !== "string" || v.trim().length === 0) {
      return { valid: false, error: `${f} is required.` };
    }
  }

  const name = String(body.name).trim();
  const email = String(body.email).trim().toLowerCase();
  const message = String(body.message).trim();

  if (name.length > MAX_LENGTHS.name) {
    return {
      valid: false,
      error: `Name must be under ${MAX_LENGTHS.name} characters.`,
    };
  }
  if (email.length > MAX_LENGTHS.email || !EMAIL_RE.test(email)) {
    return { valid: false, error: "A valid email address is required." };
  }
  if (message.length > MAX_LENGTHS.message) {
    return {
      valid: false,
      error: `Message must be under ${MAX_LENGTHS.message} characters.`,
    };
  }

  const data: Record<string, string> = {
    name,
    email,
    message,
    phone: String(body.phone || "").trim().slice(0, MAX_LENGTHS.phone),
    company: String(body.company || "").trim().slice(0, MAX_LENGTHS.company),
    country: String(body.country || "").trim().slice(0, MAX_LENGTHS.country),
    product: String(body.product || "General Inquiry")
      .trim()
      .slice(0, MAX_LENGTHS.product),
    quantity: String(body.quantity || "").trim().slice(0, MAX_LENGTHS.quantity),
  };

  return { valid: true, data };
}

// ── HTML entity escaping ────────────────────────────────────
function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Rate limiting (in-memory) ───────────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 5; // max 5 per minute

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count++;
  return true;
}

// Periodic cleanup of stale entries (every 5 min)
let lastCleanup = 0;
function cleanupRateMap() {
  const now = Date.now();
  if (now - lastCleanup < 300_000) return;
  lastCleanup = now;
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip);
  }
}

// ── Handler ─────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // CSRF check: require same-origin
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (
      origin &&
      host &&
      !origin.endsWith(host) &&
      origin !== "https://aikeruiclean.com" &&
      origin !== "https://www.aikeruiclean.com"
    ) {
      return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
    }

    // Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    cleanupRateMap();
    if (!checkRate(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const validation = validate(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const data = validation.data;

    // Assign to salesperson (same email → same person; new → round-robin)
    const assigned = assignSalesperson(data.email);

    // 1) Forward to Google Apps Script (Google Sheets)
    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({
        ...data,
        assignedTo: assigned.name,
        assignedEmail: assigned.email,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.error("Google Script error:", err));

    // 2) Also send email via Brevo if configured
    if (process.env.BREVO_API_KEY) {
      const emailHtml = `
        <html><body style="font-family:Arial,sans-serif;padding:20px">
          <h2>New Product Inquiry</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Name</td><td style="padding:8px;border:1px solid #ddd">${escHtml(data.name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px;border:1px solid #ddd">${escHtml(data.email)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Phone</td><td style="padding:8px;border:1px solid #ddd">${escHtml(data.phone)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Company</td><td style="padding:8px;border:1px solid #ddd">${escHtml(data.company)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Country</td><td style="padding:8px;border:1px solid #ddd">${escHtml(data.country)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Product</td><td style="padding:8px;border:1px solid #ddd">${escHtml(data.product)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Quantity</td><td style="padding:8px;border:1px solid #ddd">${escHtml(data.quantity)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Message</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${escHtml(data.message)}</td></tr>
          </table>
          <p style="color:#666;font-size:12px">Received: ${new Date().toISOString()}</p>
        </body></html>
      `;

      const res = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Aikerui Website", email: "noreply@aikeruiclean.com" },
          to: [{ email: "info@aikeruiclean.com" }],
          cc: [{ email: assigned.email, name: assigned.name }],
          replyTo: { email: data.email },
          subject: `[${assigned.name}] New Inquiry: ${data.product}`,
          htmlContent: emailHtml,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Brevo API error:", res.status, err);
      }
    }

    // Save locally for admin panel
    saveLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      country: data.country,
      product: data.product,
      quantity: data.quantity,
      message: data.message,
      assignedTo: assigned.name,
      assignedEmail: assigned.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      {
        error:
          "Failed to send. Please email us directly at info@aikeruiclean.com.",
      },
      { status: 500 }
    );
  }
}
