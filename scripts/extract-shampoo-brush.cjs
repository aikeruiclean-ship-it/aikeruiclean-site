const products = require("../src/lib/products.json");

const p = products.find(
  (x) => x.slug && x.slug.includes("shampoo-disc-brush-custom")
);
if (!p) {
  console.log("未找到，搜索相近:");
  products
    .filter((x) => x.slug && x.slug.includes("shampoo"))
    .forEach((x) => console.log(" -", x.slug));
  process.exit(0);
}

console.log("=== 产品名:", p.name);
console.log("=== sku:", p.sku);
console.log("=== category:", p.category, "| subcategory:", p.partSubcategory);
console.log("=== 规格 specs:");
console.log(JSON.stringify(p.specs, null, 2));
console.log("=== 短描述:", (p.shortDescription || "").substring(0, 300));
console.log("=== tags:", JSON.stringify(p.tags));
console.log("=== 描述全文（前500字）:");
console.log((p.description || "").replace(/<[^>]*>/g, " ").substring(0, 500));
