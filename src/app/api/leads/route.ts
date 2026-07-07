import { NextRequest, NextResponse } from "next/server";
import { getLeads, updateLead } from "@/lib/lead-store";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "aikerui2026";

function checkAuth(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  if (!auth) return false;
  const token = auth.replace("Bearer ", "");
  return token === ADMIN_PASSWORD;
}

// GET: list all leads
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getLeads());
}

// PATCH: update lead status/notes
export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, status, notes } = await request.json();
    const updated = updateLead(Number(id), { status, notes });
    if (!updated) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
