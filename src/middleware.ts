import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 强制 www → 裸域 301（消除重复内容/权重分裂）
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  if (host === "www.aikeruiclean.com") {
    const url = request.nextUrl.clone();
    url.host = "aikeruiclean.com";
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)"],
};
