import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "whatsapp-clicks.json");

type WaClick = {
  id: number;
  time: string;
  page: string;
  salesName: string;
  salesPhone: string;
  referrer: string;
  utm?: string;
};

function readClicks(): WaClick[] {
  try {
    if (existsSync(FILE)) return JSON.parse(readFileSync(FILE, "utf8"));
  } catch {}
  return [];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { salesName, salesPhone, page, referrer } = body;
    if (!salesName || !salesPhone) {
      return NextResponse.json({ error: "salesName and salesPhone required" }, { status: 400 });
    }
    const clicks = readClicks();
    const id = clicks.length > 0 ? Math.max(...clicks.map((c) => c.id)) + 1 : 1;
    const click: WaClick = {
      id,
      time: new Date().toISOString(),
      page: page || "/",
      salesName,
      salesPhone,
      referrer: referrer || "",
    };
    clicks.push(click);
    try {
      mkdirSync(DATA_DIR, { recursive: true });
      writeFileSync(FILE, JSON.stringify(clicks, null, 2));
    } catch (err) {
      // Vercel read-only fs — non-fatal, log only
      console.error("Failed to persist wa click:", err);
    }
    return NextResponse.json({ success: true, id });
  } catch (e) {
    console.error("wa-track error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(readClicks());
}
