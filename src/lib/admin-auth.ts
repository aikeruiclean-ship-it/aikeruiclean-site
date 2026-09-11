/**
 * 后台统一认证（与 middleware.ts 的校验保持一致）
 *
 * 两条认证通道：
 *  1) Cookie `aikerui_admin` —— 浏览器访问后台时自动携带（/admin/login 签发）
 *  2) `Authorization: Bearer <ADMIN_PASSWORD>` —— 兼容脚本 / 外部调用
 */

export const ADMIN_COOKIE = "aikerui_admin";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "aikerui2026";
}

/** 由密码派生的 token（SHA-256），作为 cookie 值 */
export async function adminToken(password = adminPassword()) {
  const data = new TextEncoder().encode("aikerui-admin:" + password);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function expectedToken() {
  return adminToken(adminPassword());
}

/** 从 Cookie 头里取指定 cookie 值 */
function readCookie(request: Request, name: string): string | null {
  const raw = request.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

/** 校验请求是否已通过后台认证（cookie 优先，Bearer 兼容） */
export async function isAdminRequest(request: Request): Promise<boolean> {
  // 1) 统一 cookie
  const cookieToken = readCookie(request, ADMIN_COOKIE);
  if (cookieToken) {
    if (cookieToken === (await expectedToken())) return true;
  }

  // 2) Bearer 密码（兼容旧调用方式）
  const auth = request.headers.get("authorization");
  if (auth) {
    const bearer = auth.replace(/^Bearer\s+/i, "").trim();
    if (bearer === adminPassword()) return true;
    // 也接受 Bearer <token>
    if (bearer === (await expectedToken())) return true;
  }

  return false;
}
