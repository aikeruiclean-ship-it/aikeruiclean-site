import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, product, quantity, country } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const inquiry = {
      name,
      email,
      phone: phone || "",
      company: company || "",
      country: country || "",
      product: product || "General Inquiry",
      quantity: quantity || "",
      message,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "",
    };

    console.log("New inquiry received:", JSON.stringify(inquiry, null, 2));

    // TODO: Integrate with email service (e.g., Resend, SendGrid, SMTP)
    // Example with Resend:
    // await resend.emails.send({
    //   from: "Aikerui Website <noreply@aikeruiclean.com>",
    //   to: ["info@aikeruiclean.com"],
    //   subject: `New Inquiry: ${inquiry.product}`,
    //   html: `<p>Name: ${inquiry.name}</p>...`,
    // });

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully." });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
