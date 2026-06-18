import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// ============================================================
// 👇 在这里添加业务员邮箱，线索会按顺序轮流分配
//    有几个写几个
// ============================================================
const SALES_TEAM = [
  { name: "业务员A", email: "sales1@aikeruiclean.com" },
  { name: "业务员B", email: "sales2@aikeruiclean.com" },
  // { name: "业务员C", email: "sales3@aikeruiclean.com" },
];
// ============================================================

function getCounterPath() {
  return path.join(process.cwd(), "src", "lib", "lead-counter.json");
}

function getCurrentIndex(): number {
  try {
    const raw = fs.readFileSync(getCounterPath(), "utf8");
    const data = JSON.parse(raw);
    return data.index ?? 0;
  } catch {
    return 0;
  }
}

function saveIndex(index: number) {
  try {
    fs.writeFileSync(getCounterPath(), JSON.stringify({ index }), "utf8");
  } catch (e) {
    console.error("Failed to save lead counter:", e);
  }
}

function getNextSalesperson() {
  const total = SALES_TEAM.length;
  if (total === 0) return null;

  const idx = getCurrentIndex();
  const next = idx % total;
  saveIndex(idx + 1);
  return SALES_TEAM[next];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, product, quantity, country } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const inquiry = {
      name, email, phone: phone || "", company: company || "",
      country: country || "", product: product || "General Inquiry",
      quantity: quantity || "", message,
      timestamp: new Date().toISOString(),
    };

    // 确定分配给谁
    const assigned = getNextSalesperson();
    const assigneeEmail = assigned?.email || "info@aikeruiclean.com";
    const assigneeName = assigned?.name || "Sales Team";

    if (process.env.BREVO_API_KEY) {
      const emailHtml = `
        <html><body style="font-family:Arial,sans-serif;padding:20px">
          <h2>🔔 New Lead Assigned to: ${assigneeName}</h2>
          <p style="color:#666;font-size:13px">This lead was automatically assigned by round-robin.</p>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Name</td><td style="padding:8px;border:1px solid #ddd">${inquiry.name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px;border:1px solid #ddd">${inquiry.email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Phone</td><td style="padding:8px;border:1px solid #ddd">${inquiry.phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Company</td><td style="padding:8px;border:1px solid #ddd">${inquiry.company}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Country</td><td style="padding:8px;border:1px solid #ddd">${inquiry.country}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Product</td><td style="padding:8px;border:1px solid #ddd">${inquiry.product}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Quantity</td><td style="padding:8px;border:1px solid #ddd">${inquiry.quantity}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5">Message</td><td style="padding:8px;border:1px solid #ddd">${inquiry.message}</td></tr>
          </table>
          <p style="color:#666;font-size:12px">Received: ${inquiry.timestamp}</p>
          <hr>
          <p style="font-size:12px;color:#999">This lead was assigned to ${assigneeName}. Reply directly to this email to respond.</p>
        </body></html>
      `;

      const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: { "api-key": process.env.BREVO_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "Aikerui Website", email: "noreply@aikeruiclean.com" },
          to: [{ email: assigneeEmail, name: assigneeName }],
          // 同时 CC 所有业务员，方便大家看到
          cc: SALES_TEAM.filter(s => s.email !== assigneeEmail).map(s => ({ email: s.email, name: s.name })),
          replyTo: { email },
          subject: `[${assigneeName}] New Inquiry: ${inquiry.product}`,
          htmlContent: emailHtml,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("Brevo API error:", response.status, err);
        throw new Error(`Brevo API returned ${response.status}`);
      }

      console.log(`Lead assigned to ${assigneeName} (${assigneeEmail})`);
    } else {
      console.log("BREVO_API_KEY not configured. Inquiry logged:", JSON.stringify(inquiry, null, 2));
    }

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully." });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json({
      error: "Failed to send inquiry. Please email us directly at info@aikeruiclean.com."
    }, { status: 500 });
  }
}
