// HubSpot CRM sync module (free tier compatible)
// Sends new inquiries to HubSpot via Private App token + CRM Contacts API.
// Failures are silent — HubSpot sync must never block the inquiry response.

const HUBSPOT_API_URL = "https://api.hubapi.com/crm/v3/objects/contacts";

export interface HubSpotLeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  product?: string;
  quantity?: string;
  message?: string;
  assignedTo: string; // e.g. "Keke" / "Rosy"
  source?: string; // e.g. "quote page" / "ad landing"
  timestamp: string;
  // Google Ads attribution (step: GCLID/UTM closed loop)
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
}

/**
 * Create/update a HubSpot contact for an inquiry.
 * Returns true on success, false on any failure (never throws).
 */
export async function syncLeadToHubSpot(
  lead: HubSpotLeadInput,
  token?: string
): Promise<boolean> {
  const apiToken = token || process.env.HUBSPOT_API_TOKEN;
  if (!apiToken) {
    console.warn(
      "[HubSpot] HUBSPOT_API_TOKEN not configured — skipping sync."
    );
    return false;
  }

  // Split name into first/last
  const cleanName = (lead.name || "").replace(/\(.*?\)/g, "").trim();
  const nameParts = cleanName.split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || cleanName;
  const lastName = nameParts.slice(1).join(" ") || "";

  // HubSpot contact properties — standard fields only (no custom props needed)
  const properties: Record<string, string> = {
    firstname: firstName,
    lastname: lastName,
    email: lead.email.toLowerCase().trim(),
    hs_lead_status: "NEW", // NEW / OPEN / IN_PROGRESS / CLOSED_WON / CLOSED_LOST
  };
  if (lead.phone) properties.phone = lead.phone;
  if (lead.company) properties.company = lead.company;
  if (lead.country) properties.country = lead.country;

  // Google Ads click ID → HubSpot standard property (used by Ads offline conversion)
  if (lead.gclid) properties.hs_google_click_id = lead.gclid;

  // Bundle product/quantity/source into the standard message field so nothing is lost
  const detailParts: string[] = [];
  if (lead.product) detailParts.push(`Product: ${lead.product}`);
  if (lead.quantity) detailParts.push(`Qty: ${lead.quantity}`);
  if (lead.source) detailParts.push(`Source: ${lead.source}`);
  if (lead.assignedTo) detailParts.push(`Assigned to: ${lead.assignedTo}`);
  if (lead.landing_page) detailParts.push(`Landing: ${lead.landing_page}`);
  if (lead.utm_source) detailParts.push(`utm_source: ${lead.utm_source}`);
  if (lead.utm_medium) detailParts.push(`utm_medium: ${lead.utm_medium}`);
  if (lead.utm_campaign) detailParts.push(`utm_campaign: ${lead.utm_campaign}`);
  if (lead.utm_term) detailParts.push(`utm_term: ${lead.utm_term}`);
  if (lead.utm_content) detailParts.push(`utm_content: ${lead.utm_content}`);
  if (lead.message) detailParts.push(`Details: ${lead.message}`);
  const combined = detailParts.join(" | ").slice(0, 2000);
  if (combined) properties.message = combined;

  // Owner: all contacts belong to the shared inbox user (info@).
  // Salesperson routing is tracked in the message field ("Assigned to: Xxx")
  // and handled manually by the operator — no per-salesperson HubSpot seats.
  const SHARED_OWNER_ID = "168006740"; // info@aikeruiclean.com
  if (lead.assignedTo) {
    const ownerId = await resolveOwnerId(lead.assignedTo, apiToken);
    properties.hubspot_owner_id = ownerId || SHARED_OWNER_ID;
  } else {
    properties.hubspot_owner_id = SHARED_OWNER_ID;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    // ── Dedup: search for existing contact by email first ──
    const existingId = await findContactByEmail(lead.email, apiToken);

    const url = existingId
      ? `${HUBSPOT_API_URL}/${existingId}` // PATCH update
      : HUBSPOT_API_URL; // POST create
    const method = existingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({ properties }),
    });

    if (!res.ok) {
      // Fallback: if PATCH failed because record vanished, try POST once
      const errText = await res.text();
      if (existingId && res.status === 404) {
        const retry = await fetch(HUBSPOT_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ properties }),
        });
        if (!retry.ok) {
          console.error("[HubSpot] create-after-404 failed:", await retry.text());
          return false;
        }
        return true;
      }
      console.error("[HubSpot] API error:", res.status, errText.slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[HubSpot] sync error (non-blocking):", err);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

/** Search a contact by email; returns contact id or null. */
async function findContactByEmail(
  email: string,
  token: string
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts/search",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          filterGroups: [
            { filters: [{ propertyName: "email", operator: "EQ", value: email.toLowerCase().trim() }] },
          ],
          limit: 1,
        }),
      }
    );
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    const results = data.results || [];
    return results.length ? results[0].id : null;
  } catch (err) {
    console.error("[HubSpot] search error:", err);
    return null;
  }
}

// Map our salesperson names to HubSpot users.
// Owners resolved at runtime; falls back to the account admin (mark xu) so every
// contact still gets an owner even before sales-user accounts are created.
let ownerCache: Record<string, string> = {};

async function resolveOwnerId(
  name: string,
  token: string
): Promise<string | undefined> {
  const nameLower = name.toLowerCase().trim();
  if (ownerCache[nameLower]) return ownerCache[nameLower];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch("https://api.hubapi.com/crm/v3/owners?limit=100", {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return undefined;

    const data = await res.json();
    const owners: Array<{
      id: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      type?: string;
    }> = data.results || [];

    // 1) Exact: salesperson name equals owner first/last name (case-insensitive)
    for (const o of owners) {
      const full = `${o.firstName || ""} ${o.lastName || ""}`.toLowerCase();
      const first = (o.firstName || "").toLowerCase();
      if (
        full.includes(nameLower) ||
        first.includes(nameLower) ||
        nameLower.includes(first)
      ) {
        ownerCache[nameLower] = o.id;
        return o.id;
      }
    }

    // 2) Email prefix match (keke@czhclean.com, wisdom@czhclean.com, ...)
    const emailPrefixByOwner: Record<string, string[]> = {
      keke: ["keke", "wanglanlan"],
      rosy: ["wisdom", "rosy", "nieruya"],
      alan: ["liv", "alan", "wuzhengdong"],
      jennifer: ["jennifer", "chenjuan"],
    };
    const prefixes = emailPrefixByOwner[nameLower] || [];
    if (prefixes.length) {
      for (const o of owners) {
        const email = (o.email || "").toLowerCase();
        if (prefixes.some((p) => email.startsWith(p))) {
          ownerCache[nameLower] = o.id;
          return o.id;
        }
      }
    }

    // 3) Fallback: account admin (mark xu) — first PERSON owner in the list
    const admin = owners.find((o) => o.type === "PERSON");
    if (admin) {
      ownerCache[nameLower] = admin.id;
      return admin.id;
    }
  } catch (err) {
    console.error("[HubSpot] owner lookup error:", err);
  }
  return undefined;
}
