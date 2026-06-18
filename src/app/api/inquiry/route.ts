import { NextRequest, NextResponse } from "next/server";

var SCRIPT_URL = "https://script.google.com/macros/s/AKfycby20GTtVktqsVny34_kEJA3wg0LvbwxmZd4JNDqqqYFZgC88L6ZG2j5m-mQoPl0Wv7c/exec";

export async function POST(request: NextRequest) {
  try {
    var body = await request.json();
    var { name, email, phone, company, message, product, quantity, country } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    // 转发到 Google Apps Script
    var result = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, email, phone: phone || "", company: company || "",
        country: country || "", product: product || "General Inquiry",
        quantity: quantity || "", message,
        timestamp: new Date().toISOString(),
      }),
    });

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully." });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json({
      error: "Failed to send. Please email us directly at info@aikeruiclean.com."
    }, { status: 500 });
  }
}
