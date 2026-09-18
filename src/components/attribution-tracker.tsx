"use client";

import { useEffect } from "react";
import { persistAttribution } from "@/lib/attribution";

/**
 * 全局 gclid / UTM 捕获（挂在 root layout，覆盖所有页面）。
 *
 * 为什么必须在全局：
 *   Google Ads 的 ?gclid= 只出现在「广告落地页」的 URL 上。如果客户从首页或
 *   guide 进入再跳到询盘页，询盘页自身的 URL 已无 gclid —— 只在询盘页调用
 *   persistAttribution() 会漏掉这种情况。
 *
 * 实现说明：
 *   广告点击是整页加载（硬导航），layout 会重新挂载，因此 mount 时捕获一次即可；
 *   捕获后写入 localStorage，后续 SPA 导航不再需要重读 URL。
 *   （不依赖 usePathname/useSearchParams，避免触发 Suspense 边界要求。）
 */
export function AttributionTracker() {
  useEffect(() => {
    persistAttribution();
  }, []);

  return null;
}
