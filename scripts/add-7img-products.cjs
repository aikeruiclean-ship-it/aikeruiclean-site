// 生成 5 个 7 图产品条目并追加到 products.json
const fs = require("fs");
const path = require("path");

const PRODUCTS_JSON = path.join(process.cwd(), "src", "lib", "products.json");
const arr = require(PRODUCTS_JSON);

const exported = JSON.parse(fs.readFileSync(path.join(process.cwd(), ".reasonix-exported.json"), "utf8"));

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// 5 款产品定义（数据来自 产品简介表-20260915.xlsx）
const PRODUCTS = [
  {
    sku: "AK-DB-009",
    name: "18 inch XMD 50/50 Disc Brush",
    categoryFull: "Parts > Disc Brush / 盘刷",
    partSubcategory: "Disc Brush / 盘刷",
    spec: "0.5 Orange PP (Tufted after plate coating, See photo)",
    material: "Hard Composite / Black PP",
    filament: "Orange PP Straight Filament",
    machine: "XMD 50/50",
    price: 22,
    weight: "1.1",
    rowKey: "floor-scrubber-disc-brush-18-xmd-50-50-disc",
  },
  {
    sku: "AK-DB-013",
    name: "i-scrub 30 Disc Brush",
    categoryFull: "Parts > Disc Brush / 盘刷",
    partSubcategory: "Disc Brush / 盘刷",
    spec: "0.5 Orange PP Crimped; 9.5 inch; Bristle Spread 260; 2 Tuft Rings",
    material: "Hard Composite / Black PP",
    filament: "Orange PP Crimped",
    machine: "i-scrub 30",
    price: 14,
    weight: "0.9",
    rowKey: "floor-scrubber-disc-brush-i-scrub-30",
  },
  {
    sku: "AK-DB-017",
    name: "13 inch SG Disc Brush",
    categoryFull: "Parts > Disc Brush / 盘刷",
    partSubcategory: "Disc Brush / 盘刷",
    spec: "0.5 White PP",
    material: "Hard Composite / Black PP",
    filament: "White PP",
    machine: "2500/3500",
    price: 60,
    weight: "1.2",
    rowKey: "floor-scrubber-disc-brush-13-sg-disc",
  },
  {
    sku: "AK-DB-018",
    name: "16 inch SG Disc Brush",
    categoryFull: "Parts > Disc Brush / 盘刷",
    partSubcategory: "Disc Brush / 盘刷",
    spec: "0.5 White PP",
    material: "Hard Composite / Black PP",
    filament: "White PP",
    machine: "2500/3500",
    price: 67,
    weight: "1.4",
    rowKey: "floor-scrubber-disc-brush-16-sg-disc",
  },
  {
    sku: "AK-SB-018",
    name: "S 48 Side Brush",
    categoryFull: "Parts > Side Brush / 边刷",
    partSubcategory: "Side Brush / 边刷",
    spec: "328*550 1.2 Black PET Straight Filament + 0.4 Copper-plated Fine Steel Wire Single Wave",
    material: "Hard Composite / Black PP",
    filament: "Black PET Straight Filament + Copper-plated Fine Steel Wire",
    machine: "S 48",
    price: 57,
    weight: "1.6",
    rowKey: "floor-scrubber-side-brush-s-48-side",
  },
];

const expMap = {};
for (const e of exported) expMap[e.prefix] = e.files;

// 计算新 id 起点
let maxId = Math.max(...arr.map((p) => p.id));
const newProducts = [];

for (const def of PRODUCTS) {
  maxId += 1;
  const images = expMap[def.rowKey] || [];
  const slug = slugify(def.name);
  const tags = ["parts", "floor scrubber", ...def.name.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1)];

  const shortDescription = `${def.name} — factory-direct replacement ${def.partSubcategory === "Side Brush / 边刷" ? "side brush" : "disc brush"} for ${def.machine}. CE & ISO 9001 factory. Compatible replacement, not OEM-branded.`;

  const description =
    `<h3>Overview</h3>\n<div>${def.name} for ${def.machine}. Factory-direct replacement part manufactured in our Anqing facility. Engineered to match OEM dimensions and bristle specs — not an OEM-branded item.</div>\n` +
    `<h3>Key Features</h3>\n<ul><li>${def.filament} bristles for consistent scrubbing performance</li><li>${def.material} backing for stable bristle anchoring</li><li>Specification: ${def.spec}</li><li>Replacement consumable — keep spares on hand to avoid downtime</li></ul>\n` +
    `<h3>Specifications</h3>\n<div>${def.spec}. Filament: ${def.filament}. Block: ${def.material}. Fits: ${def.machine}.</div>\n` +
    `<h3>Compatibility Notes</h3>\n<div>Mounting style and centre hole may vary between machine generations. Send your machine model and OEM part number and we will confirm fitment within 24 hours.</div>`;

  const specs = {
    Specification: def.spec,
    Filament: def.filament,
    Block: def.material,
    "Fits": def.machine,
  };

  newProducts.push({
    id: maxId,
    name: def.name,
    slug,
    sku: def.sku,
    type: "simple",
    published: true,
    featured: false,
    visible: true,
    category: "Parts",
    categoryFull: def.categoryFull,
    partSubcategory: def.partSubcategory,
    shortDescription,
    description,
    price: def.price,
    salePrice: null,
    stock: null,
    weight: def.weight,
    images,
    brand: "Aikerui",
    tags,
    specs,
    inStock: true,
  });
}

arr.push(...newProducts);
fs.writeFileSync(PRODUCTS_JSON, JSON.stringify(arr, null, 2));
console.log(`已追加 ${newProducts.length} 个产品，总产品数 ${arr.length}`);
newProducts.forEach((p) => console.log(`${p.id} | ${p.sku} | ${p.name} | ${p.images.length} 图`));
