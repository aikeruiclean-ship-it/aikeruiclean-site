import { getProducts } from "@/lib/products";
import { getGuides } from "@/lib/guides";
import { PART_CATEGORIES } from "@/lib/part-categories";
import { MACHINE_CATEGORIES } from "@/lib/machine-categories";
import { translatedLocales } from "@/i18n/config";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aikeruiclean.com";
  const products = getProducts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/parts`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about/mark-xu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/industrial-floor-scrubber-quote`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/floor-scrubber-parts-quote`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/floor-scrubber-price-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/floor-scrubber-supplier`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/solutions/warehouse-floor-cleaning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/solutions/factory-floor-cleaning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/solutions/supermarket-floor-cleaning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/solutions/airport-floor-cleaning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/solutions/shopping-mall-floor-cleaning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/solutions/pharmaceutical-cleanroom-floor-cleaning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/solutions/cold-storage-floor-cleaning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/solutions/hotel-floor-cleaning`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const partsCategoryPages: MetadataRoute.Sitemap = PART_CATEGORIES.map((c) => ({
    url: `${baseUrl}/parts/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const machineCategoryPages: MetadataRoute.Sitemap = MACHINE_CATEGORIES.map((c) => ({
    url: `${baseUrl}/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const guidePages: MetadataRoute.Sitemap = getGuides().map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Translated homepages (es/ar/ru/fr) with hreflang alternates
  const languageHomepages: MetadataRoute.Sitemap = translatedLocales.map((loc) => ({
    url: `${baseUrl}/${loc}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
    alternates: {
      languages: {
        en: baseUrl,
        es: `${baseUrl}/es`,
        ar: `${baseUrl}/ar`,
        ru: `${baseUrl}/ru`,
        fr: `${baseUrl}/fr`,
      },
    },
  }));

  return [
    ...staticPages,
    ...machineCategoryPages,
    ...partsCategoryPages,
    ...languageHomepages,
    ...productPages,
    ...guidePages,
  ];
}
