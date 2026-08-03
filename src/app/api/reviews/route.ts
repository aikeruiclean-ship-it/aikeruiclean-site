import { NextRequest, NextResponse } from "next/server";
import { saveReview, getReviews, approveReview, rejectReview } from "@/lib/review-store";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "aikerui2026";

function checkAuth(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  if (!auth) return false;
  return auth.replace("Bearer ", "") === ADMIN_PASSWORD;
}

// POST: submit a new review (public, no auth)
export async function POST(request: NextRequest) {
  try {
    const { name, company, country, rating, message, product } = await request.json();

    // 基本校验
    if (!name || !message || !rating) {
      return NextResponse.json({ error: "Name, rating and message are required" }, { status: 400 });
    }
    const r = Number(rating);
    if (r < 1 || r > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: "Message too long (max 1000 chars)" }, { status: 400 });
    }

    const review = saveReview({
      name: String(name).slice(0, 80),
      company: String(company || "").slice(0, 80),
      country: String(country || "").slice(0, 60),
      rating: r,
      message: String(message).slice(0, 1000),
      product: String(product || "").slice(0, 120),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: review.id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// GET: list reviews (admin, requires auth)
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getReviews());
}

// PATCH: approve or reject a review (admin)
export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, action } = await request.json();
    if (action === "approve") {
      const updated = approveReview(Number(id));
      if (!updated) return NextResponse.json({ error: "Review not found" }, { status: 404 });
      return NextResponse.json(updated);
    }
    if (action === "reject") {
      const ok = rejectReview(Number(id));
      if (!ok) return NextResponse.json({ error: "Review not found" }, { status: 404 });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
