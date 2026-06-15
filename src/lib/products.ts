import raw from "./products.json";

export interface ProductSpecs {
  [key: string]: string | number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  type: string;
  published: boolean;
  featured: boolean;
  visible: boolean;
  category: string;
  categoryFull: string;
  partSubcategory?: string;
  shortDescription: string;
  description: string;
  price: number | null;
  salePrice: number | null;
  stock: number | null;
  weight: number | null;
  images: string[];
  brand: string;
  tags: string[];
  specs: ProductSpecs;
  inStock: boolean;
  variantGroupId?: string;
  variantLabel?: string;
}

const products = raw as Product[];

export const categories = [
  ...new Set(products.map((p) => p.category).filter(Boolean)),
].sort();

export function getProducts(): Product[] {
  return products.filter((p) => p.published && p.visible);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.published && p.visible && p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.published && p.visible && p.category === category
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug && p.published && p.visible);
}

export function getPartSubcategories(): { name: string; count: number; slug: string }[] {
  const map = new Map<string, number>();
  for (const p of products) {
    if (p.published && p.visible && p.category === "Parts" && p.partSubcategory) {
      map.set(p.partSubcategory, (map.get(p.partSubcategory) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") }))
    .sort((a, b) => b.count - a.count);
}

export function getPartsBySubcategory(subcategory: string): Product[] {
  return products.filter(
    (p) => p.published && p.visible && p.category === "Parts" && p.partSubcategory === subcategory
  );
}

export function getPartsProducts(): Product[] {
  return products.filter((p) => p.published && p.visible && p.category === "Parts");
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of products) {
    if (p.published && p.visible && p.category) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
  }
  return counts;
}

export function getAllSlugs(): string[] {
  return products
    .filter((p) => p.published && p.visible)
    .map((p) => p.slug);
}

export const categoryMeta: Record<string, { title: string; description: string }> = {
  "Floor Scrubbers": {
    title: "Industrial Floor Scrubbers for Sale | Walk-Behind & Ride-On | Aikerui",
    description: "Professional industrial floor scrubbers for warehouses, factories, and commercial facilities. Walk-behind and ride-on models with CE certification. B2B wholesale and OEM available.",
  },
  "Floor Sweepers": {
    title: "Industrial Floor Sweepers | Walk-Behind & Ride-On | Aikerui",
    description: "Heavy-duty industrial floor sweepers for warehouses, parking lots, and large facilities. Efficient debris collection with reliable performance. Global shipping.",
  },
  "Dust Collection Carts": {
    title: "Dust Collection Carts & Trolleys for Industrial Cleaning | Aikerui",
    description: "Industrial dust collection carts and waste collection trolleys for efficient debris management in factories, warehouses, and cleaning operations.",
  },
  "Carpet Extractor Washers": {
    title: "Carpet Extractor Washers & Upholstery Cleaners | Aikerui",
    description: "Professional carpet extractor washers for deep cleaning carpets, rugs, and upholstery in commercial and industrial settings.",
  },
  Parts: {
    title: "Industrial Floor Scrubber Parts & Accessories | Replacement Parts | Aikerui",
    description: "Genuine and compatible replacement parts for floor scrubbers and sweepers. Disc brushes, squeegees, filters, batteries, controllers, and OEM components. Global shipping.",
  },
};
