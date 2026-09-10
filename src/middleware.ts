import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["es", "ar", "ru", "fr"];

// www → 裸域 301（消除重复内容/权重分裂）
// + 其他语言路径的兜底重写：/{locale}/xxx → /xxx（英语页）
//   （阶段1：外语只翻译了首页；其余路径保留语言前缀的 URL，
//     实际渲染英语内容，避免 404，且为阶段2接入做好准备）
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // 1) www → 裸域
  if (host === "www.aikeruiclean.com") {
    const url = request.nextUrl.clone();
    url.host = "aikeruiclean.com";
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }

  // 2) Locale fallback: /{locale}/xxx（xxx 尚未翻译）→ 301 到英语 /xxx
  //    避免"英语内容 + 外语 URL"的重复内容问题（阶段2翻译后再放开）
  const { pathname } = request.nextUrl;
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
