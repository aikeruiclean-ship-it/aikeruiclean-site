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
          // Query parameter URLs — prevent crawl of search/filter/sort params
          "/*?*q=",
          "/*?*search=",
          "/*?*sort=",
          "/*?*filter=",
          "/*?*category=",
          "/*?*subcategory=",
          "/*?*page=",
          "/*?*utm_",
          // Prevent duplicate content from generic query params
          "/*?*ref=",
          "/*?*source=",
          "/*?*fbclid=",
          "/*?*gclid=",
          "/*?*msclkid=",
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
