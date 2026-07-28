/**
 * Lightweight header-only data — pre-computed from products.json.
 * Import this instead of @/lib/products in client components
 * to avoid bundling the full 624KB products.json.
 */
import raw from "./header-data.json";

export interface PartSubcategory {
  name: string;
  count: number;
  slug: string;
}

export const categories: string[] = raw.categories;
export const categoryCounts: Record<string, number> = raw.categoryCounts;
export const partSubcategories: PartSubcategory[] = raw.partSubcategories;
