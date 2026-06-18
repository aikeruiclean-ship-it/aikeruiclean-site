import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "aikeruiclean@gmail.com",
    pass: "akr13855623601",
  },
});

export async function POST(request: NextRequest) {
  try {
    var body = await request.json();
    var { name, email, phone, company, message, product, quantity, country } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    var inquiry = {
      name, email, phone: phone || "", company: company || "",
      country: country || "", product: product || "General Inquiry",
      quantity: quantity || "", message,
      timestamp: new Date().toISOString(),
    };

    var emailHtml = [
      '<html><body style="font-family:Arial,sans-serif;padding:20px">',
      "<h2>New Website Inquiry</h2>",
      '<table style="border-collapse:collapse;width:100%">',
      "<tr><td style=\"padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5\">Name</td><td style=\"padding:8px;border:1px solid #ddd\">" + inquiry.name + "</td></tr>",
      "<tr><td style=\"padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5\">Email</td><td style=\"padding:8px;border:1px solid #ddd\">" + inquiry.email + "</td></tr>",
      "<tr><td style=\"padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5\">Phone</td><td style=\"padding:8px;border:1px solid #ddd\">" + inquiry.phone + "</td></tr>",
      "<tr><td style=\"padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5\">Company</td><td style=\"padding:8px;border:1px solid #ddd\">" + inquiry.company + "</td></tr>",
      "<tr><td style=\"padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5\">Country</td><td style=\"padding:8px;border:1px solid #ddd\">" + inquiry.country + "</td></tr>",
      "<tr><td style=\"padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5\">Product</td><td style=\"padding:8px;border:1px solid #ddd\">" + inquiry.product + "</td></tr>",
      "<tr><td style=\"padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5\">Quantity</td><td style=\"padding:8px;border:1px solid #ddd\">" + inquiry.quantity + "</td></tr>",
      "<tr><td style=\"padding:8px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5\">Message</td><td style=\"padding:8px;border:1px solid #ddd\">" + inquiry.message + "</td></tr>",
      "</table>",
      '<p style="color:#666;font-size:12px">Received: ' + inquiry.timestamp + "</p>",
      "</body></html>",
    ].join("\n");

    await transporter.sendMail({
      from: '"Aikerui Website" <aikeruiclean@gmail.com>',
      to: "aikeruiclean@gmail.com",
      replyTo: inquiry.email,
      subject: "New Inquiry: " + inquiry.product,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully." });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json({
      error: "Failed to send. Please email us directly at info@aikeruiclean.com."
    }, { status: 500 });
  }
}
