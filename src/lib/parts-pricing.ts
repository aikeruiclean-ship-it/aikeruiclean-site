import type { Product } from "./products";

/**
 * 3-Tier Parts Pricing System
 *
 * L1 — Standard Consumables: fixed reference pricing, ready stock
 * L2 — Mid-Price Inquiry: quote needed, moderate customization possible
 * L3 — OEM Custom: fully customized, MOQ applies, lead time varies
 */
export type PricingTier = "L1" | "L2" | "L3";

export interface PricingInfo {
  tier: PricingTier;
  tierLabel: string;
  pricingModel: string;
  moq: string;
  leadTime: string;
  typicalRange: string;
}

const TIER_CONFIG: Record<PricingTier, Omit<PricingInfo, "tier" | "typicalRange">> = {
  L1: {
    tierLabel: "标准耗材",
    pricingModel: "Fixed reference pricing — price list available",
    moq: "1 piece (sample available)",
    leadTime: "48 hours (in stock)",
  },
  L2: {
    tierLabel: "中高价询价",
    pricingModel: "Quote based on quantity and specification",
    moq: "5-50 pieces (varies by part)",
    leadTime: "5-10 working days",
  },
  L3: {
    tierLabel: "OEM定制",
    pricingModel: "Custom design & manufacturing — quote after spec review",
    moq: "100+ pieces",
    leadTime: "15-30 working days",
  },
};

/** Numeric price ranges by tier (for schema.org priceSpecification) */
export const TIER_PRICE_RANGE: Record<PricingTier, { minPrice: number; maxPrice: number }> = {
  L1: { minPrice: 15, maxPrice: 75 },
  L2: { minPrice: 50, maxPrice: 300 },
  L3: { minPrice: 200, maxPrice: 2000 },
};

/** Typical price ranges by tier (informational only) */
const TIER_RANGES: Record<PricingTier, string> = {
  L1: "$15–75 per piece",
  L2: "$50–300 per piece",
  L3: "$200+ (quantity-dependent)",
};

/**
 * Map subcategory to pricing tier.
 * Based on replacement frequency and customization level.
 */
const SUBCATEGORY_TIERS: Record<string, PricingTier> = {
  // L1 — Frequent replacements, standard specs
  "Disc Brush / 盘刷": "L1",
  "Squeegee / 吸水胶条": "L1",
  "Brush / 刷类": "L1",
  "Hose / 水管": "L1",
  "Side Brush / 边刷": "L1",

  // L2 — Less frequent, moderate specs
  "Pad Holder / 针盘": "L2",
  "Clutch Plate / 离合器盘": "L2",
  "Roller Brush / 滚刷": "L2",
  "Lock & Flange / 锁扣·法兰": "L2",

  // L3 — Often custom / OEM
};

/** Default tier when subcategory not explicitly mapped */
const DEFAULT_TIER: PricingTier = "L2";

/**
 * Get pricing tier info for a single product.
 */
export function getPricingInfo(product: Product): PricingInfo {
  const sub = product.partSubcategory || "";
  const tier: PricingTier =
    SUBCATEGORY_TIERS[sub] || (product.category === "Parts" ? DEFAULT_TIER : "L2");

  return {
    tier,
    typicalRange: TIER_RANGES[tier],
    ...TIER_CONFIG[tier],
  };
}

/**
 * Get price range string for display on the landing page.
 * Uses actual product prices if available, otherwise tier-based estimates.
 */
export function getPriceDisplay(product: Product): string {
  if (product.price != null && product.price > 0) {
    if (product.salePrice != null && product.salePrice > 0) {
      return `$${product.salePrice.toFixed(0)} (was $${product.price.toFixed(0)})`;
    }
    return `From $${product.price.toFixed(0)}`;
  }
  return getPricingInfo(product).typicalRange;
}

/**
 * Group products by pricing tier.
 */
export function groupByTier(products: Product[]): Record<PricingTier, Product[]> {
  const groups: Record<PricingTier, Product[]> = { L1: [], L2: [], L3: [] };
  for (const p of products) {
    const { tier } = getPricingInfo(p);
    groups[tier].push(p);
  }
  return groups;
}
