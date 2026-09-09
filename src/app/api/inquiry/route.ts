import { NextRequest, NextResponse } from "next/server";
import { assignSalesperson } from "@/lib/lead-assignment";
import { saveLead } from "@/lib/lead-store";
import { syncLeadToHubSpot } from "@/lib/hubspot-sync";
import { sendInquiryEmail } from "@/lib/email-notify";

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
  const fields = ["name", "email"];
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

    // 2) Notify info@ via Namecheap SMTP (no IP whitelist issue like Brevo).
    //    Route B: salesperson routing is manual in HubSpot — email is info@ only.
    await sendInquiryEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      country: data.country,
      product: data.product,
      quantity: data.quantity,
      message: data.message,
      assignedTo: assigned.name,
      gclid: typeof body.gclid === "string" ? body.gclid : undefined,
      landing_page: typeof body.landing_page === "string" ? body.landing_page : undefined,
      utm_source: typeof body.utm_source === "string" ? body.utm_source : undefined,
      utm_campaign: typeof body.utm_campaign === "string" ? body.utm_campaign : undefined,
    });

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

    // 3) Sync to HubSpot CRM (free tier via Private App token)
    // Await with internal 4s timeout — guarantees execution before the
    // serverless function is frozen after the response (fire-and-forget gets killed).
    if (process.env.HUBSPOT_API_TOKEN) {
      try {
        await syncLeadToHubSpot({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          country: data.country,
          product: data.product,
          quantity: data.quantity,
          message: data.message,
          assignedTo: assigned.name,
          source: "website-quote",
          timestamp: new Date().toISOString(),
          // Google Ads attribution passthrough (from attribution.ts)
          gclid: typeof body.gclid === "string" ? body.gclid.slice(0, 200) : undefined,
          utm_source: typeof body.utm_source === "string" ? body.utm_source.slice(0, 100) : undefined,
          utm_medium: typeof body.utm_medium === "string" ? body.utm_medium.slice(0, 100) : undefined,
          utm_campaign: typeof body.utm_campaign === "string" ? body.utm_campaign.slice(0, 100) : undefined,
          utm_term: typeof body.utm_term === "string" ? body.utm_term.slice(0, 100) : undefined,
          utm_content: typeof body.utm_content === "string" ? body.utm_content.slice(0, 100) : undefined,
          landing_page: typeof body.landing_page === "string" ? body.landing_page.slice(0, 200) : undefined,
        });
      } catch (syncErr) {
        // Never let HubSpot failure fail the inquiry response
        console.error("[HubSpot] sync failed:", syncErr);
      }
    }

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
