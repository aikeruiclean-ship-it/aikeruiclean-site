import { NextRequest, NextResponse } from "next/server";

var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwx7qOuIXLQSGv7UbDxyDNXsFcxi9i3TMuICL0FKnRJpLUFoFbsw2mm1zaTbOftOqFC/exec";

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
      redirect: "follow",
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
