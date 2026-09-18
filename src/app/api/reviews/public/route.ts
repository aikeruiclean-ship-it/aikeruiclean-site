import { NextResponse } from "next/server";
import { getApprovedReviews } from "@/lib/review-store";

// GET: public — return only approved reviews (no auth needed)
export async function GET() {
  try {
    const approved = getApprovedReviews().map((r) => ({
      name: r.name,
      company: r.company,
      country: r.country,
      rating: r.rating,
      message: r.message,
      product: r.product,
      timestamp: r.timestamp,
    }));
    return NextResponse.json({ reviews: approved });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}
