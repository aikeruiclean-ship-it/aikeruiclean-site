import { NextResponse } from "next/server";

async function adminToken(password: string) {
  const data = new TextEncoder().encode("aikerui-admin:" + password);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: Request) {
  let body: { password?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD || "aikerui2026";
  if (!body.password || body.password !== expected) {
    return NextResponse.json({ ok: false, error: "密码错误" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("aikerui_admin", await adminToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 天
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("aikerui_admin", "", { path: "/", maxAge: 0 });
  return res;
}
