import { NextRequest, NextResponse } from "next/server";
import { getLeads, updateLead } from "@/lib/lead-store";
import { isAdminRequest } from "@/lib/admin-auth";

// GET: list all leads
export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getLeads());
}

// PATCH: update lead status/notes
export async function PATCH(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
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
