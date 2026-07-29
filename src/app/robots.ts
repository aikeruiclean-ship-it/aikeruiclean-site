import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
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
    ],
    sitemap: "https://aikeruiclean.com/sitemap.xml",
  };
}
