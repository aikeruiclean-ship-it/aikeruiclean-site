// 价格区间（共用模块）—— 产品页 + 商品卡都用
// 工厂直销 B2B：有明确价 → 具体价；无 → 区间（避免单一标价 + 满足 Schema 要求）

export interface PriceRange {
  low: number;
  high: number;
  count: number;
}

export const PART_PRICE_RANGES: Record<string, PriceRange> = {
  "Disc Brush / 盘刷": { low: 5, high: 60, count: 95 },
  "Brush / 刷类": { low: 5, high: 60, count: 37 },
  "Squeegee / 吸水胶条": { low: 3, high: 40, count: 31 },
  "Pad Holder / 针盘": { low: 15, high: 80, count: 27 },
  "Clutch Plate / 离合器盘": { low: 10, high: 60, count: 24 },
  "Hose / 水管": { low: 5, high: 50, count: 20 },
  "Roller Brush / 滚刷": { low: 15, high: 100, count: 15 },
  "Side Brush / 边刷": { low: 5, high: 40, count: 14 },
  "Vacuum Motor / 真空电机": { low: 50, high: 200, count: 5 },
  "Solenoid Valve / 电磁阀": { low: 15, high: 80, count: 4 },
  "Mat / 地垫": { low: 10, high: 80, count: 3 },
  "Filter / 过滤器": { low: 5, high: 50, count: 3 },
  "Pad / 百洁垫": { low: 3, high: 30, count: 3 },
  "Wheel / 轮子": { low: 10, high: 60, count: 2 },
  "Electrical / 电气件": { low: 20, high: 150, count: 2 },
  "Motor / 电机": { low: 80, high: 400, count: 2 },
  "Carbon Brush / 碳刷": { low: 3, high: 20, count: 1 },
  "Lock & Flange / 锁扣·法兰": { low: 5, high: 50, count: 1 },
  "Bumper / 保险杠": { low: 10, high: 60, count: 1 },
  "Other / 其他": { low: 5, high: 100, count: 1 },
};

export const CATEGORY_PRICE_RANGES: Record<string, PriceRange> = {
  "Floor Scrubbers": { low: 300, high: 2500, count: 15 },
  "Floor Sweepers": { low: 600, high: 4000, count: 7 },
  "Carpet Extractor Washers": { low: 300, high: 2000, count: 3 },
  "Dust-pushing carts": { low: 100, high: 800, count: 4 },
};

const FALLBACK: PriceRange = { low: 5, high: 100, count: 20 };

/** 按 Parts 子分类 → 整机类别 → 兜底，取价格区间 */
export function getPriceRange(product: {
  partSubcategory?: string;
  category?: string;
}): PriceRange {
  return (
    (product.partSubcategory && PART_PRICE_RANGES[product.partSubcategory]) ||
    (product.category && CATEGORY_PRICE_RANGES[product.category]) ||
    FALLBACK
  );
}

/** 是否有明确单价 */
export function hasFixedPrice(product: { price?: number | null }): boolean {
  return product.price != null && product.price > 0;
}

/**
 * 商品卡/产品页显示的价格文案
 *  - 有明确价 → "$16.00"
 *  - 无 → "$5 - $60"（区间）
 */
export function formatPrice(product: {
  price?: number | null;
  partSubcategory?: string;
  category?: string;
}): string {
  if (hasFixedPrice(product)) return `$${product.price!.toFixed(2)}`;
  const r = getPriceRange(product);
  return `$${r.low} - $${r.high}`;
}
