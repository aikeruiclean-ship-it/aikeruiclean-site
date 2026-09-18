import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["es", "ar", "ru", "fr"];

/** 后台认证 token（与 /api/admin/login 签发的一致） */
async function adminToken() {
  const pwd = process.env.ADMIN_PASSWORD || "aikerui2026";
  const data = new TextEncoder().encode("aikerui-admin:" + pwd);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // 1) www → 裸域 301（消除重复内容/权重分裂）
  if (host === "www.aikeruiclean.com") {
    const url = request.nextUrl.clone();
    url.host = "aikeruiclean.com";
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = request.nextUrl;

  // 2) 后台统一认证：/admin/* 需登录（登录页本身除外）
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("aikerui_admin")?.value;
    const expected = await adminToken();
    if (token !== expected) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = pathname === "/admin" ? "" : `?from=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
  }

  // 3) Locale fallback: /{locale}/xxx（xxx 尚未翻译）→ 301 到英语 /xxx
  //    避免"英语内容 + 外语 URL"的重复内容问题（阶段2翻译后再放开）
  const seg = pathname.split("/")[1];
  if (LOCALES.includes(seg)) {
    const rest = pathname.slice(seg.length + 1);
    if (rest && rest !== "") {
      const url = request.nextUrl.clone();
      url.pathname = rest.startsWith("/") ? rest : `/${rest}`;
      return NextResponse.redirect(url, 301);
    }
    // /{locale} 本身 → 由 app/[locale]/page.tsx 渲染（不重定向）
  }

  return NextResponse.next();
}

export const config = {
  // 排除静态资源与内部路径，避免无谓的 middleware 调用
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|videos/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|txt|xml|webmanifest)$).*)",
  ],
};
