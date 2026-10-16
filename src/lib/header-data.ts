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

/**
 * products.json 的 category → 顶层静态页 slug 的映射。
 * 静态页权重传递优于 /products?category=X 带参 URL（见 machine-categories.ts 的说明）。
 * 若某个 category 没有对应静态页，则回退到带参 URL。
 */
export const categoryStaticSlug: Record<string, string> = {
  "Floor Scrubbers": "floor-scrubbers",
  "Floor Sweepers": "floor-sweepers",
  "Carpet Extractor Washers": "carpet-extractors",
  "Dust-pushing carts": "dust-carts",
};

/**
 * 整机导航项（含两条产品线子类）。
 * 子类页与 /floor-scrubbers 共享同一 category，靠 slugFilter 细分，
 * 这里单独列出以便把权重直接引到子类页。
 */
export const machineNav: { href: string; label: string; count?: number }[] = [
  { href: "/floor-scrubbers", label: "Floor Scrubbers", count: categoryCounts["Floor Scrubbers"] },
  { href: "/walk-behind-floor-scrubbers", label: "Walk-Behind Scrubbers", count: 10 },
  { href: "/ride-on-floor-scrubbers", label: "Ride-On Scrubbers", count: 5 },
  { href: "/floor-sweepers", label: "Floor Sweepers", count: categoryCounts["Floor Sweepers"] },
  {
    href: "/carpet-extractors",
    label: "Carpet Extractors",
    count: categoryCounts["Carpet Extractor Washers"],
  },
  { href: "/dust-carts", label: "Dust Carts", count: categoryCounts["Dust-pushing carts"] },
];
