import { NextRequest, NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, product, quantity, country } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const inquiry = { name, email, phone: phone || "", company: company || "", country: country || "", product: product || "General Inquiry", quantity: quantity || "", message, timestamp: new Date().toISOString() };

    if (process.env.BREVO_API_KEY) {
      const emailHtml = `
        <html><body style="font-family:Arial,sans-serif;padding:20px">
          <h2>New Product Inquiry</h2>
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
        </body></html>
      `;

      const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Aikerui Website", email: "noreply@aikeruiclean.com" },
          to: [{ email: "info@aikeruiclean.com" }],
          replyTo: { email },
          subject: `New Inquiry: ${inquiry.product}`,
          htmlContent: emailHtml,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("Brevo API error:", response.status, err);
        throw new Error(`Brevo API returned ${response.status}`);
      }
    } else {
      console.log("BREVO_API_KEY not configured. Inquiry logged:", JSON.stringify(inquiry, null, 2));
    }

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully." });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json({ error: "Failed to send inquiry. Please email us directly at info@aikeruiclean.com." }, { status: 500 });
  }
}
