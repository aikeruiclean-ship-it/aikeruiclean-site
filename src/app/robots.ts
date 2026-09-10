import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        crawlDelay: 2,
        disallow: [
          // API & internal
          "/api/",
          // Cart/order (not implemented yet)
          "/cart/",
          "/order/",
          // ── 只封「无内容价值」的参数 ──
          // 站内搜索/排序/筛选：产出的是同一批产品的不同排列，无独立内容
          "/*?*q=",
          "/*?*search=",
          "/*?*sort=",
          "/*?*filter=",
          // 纯跟踪参数：不影响内容，无需抓取
          "/*?*utm_",
          "/*?*ref=",
          "/*?*source=",
          "/*?*fbclid=",
          "/*?*gclid=",
          "/*?*msclkid=",
          // ── 不再封禁分类/分页参数 ──
          // /*?*category=  /*?*subcategory=  /*?*page=
          // 重复内容问题改由 canonical 处理（Google 官方建议：优先 canonical，而非 robots 封杀，
          // 因为 robots 封禁会阻断链接权重传递，canonical 可以合并信号）
          // Admin
          "/admin/",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/_next/image"],
      },
      // ── AI Crawlers (GEO) — explicitly allowed for AI training & citation ──
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      {
        userAgent: "Bytespider",
        allow: "/",
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      {
        userAgent: "AI2Bot",
        allow: "/",
      },
      // Bing / Copilot AI search
      {
        userAgent: "CopilotBot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      // Other AI search engines
      {
        userAgent: "Amazonbot",
        allow: "/",
      },
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
      },
      {
        userAgent: "SamsungBot",
        allow: "/",
      },
      {
        userAgent: "YandexBot",
        allow: "/",
      },
      {
        userAgent: "Exabot",
        allow: "/",
      },
      {
        userAgent: "PetalBot",
        allow: "/",
      },
      {
        userAgent: "Perplexity-User",
        allow: "/",
      },
    ],
    sitemap: "https://aikeruiclean.com/sitemap.xml",
  };
}
