// 导出绿色框 7 图产品的详情图到 public/images/parts/
// 5 款产品（Excel 行号从 drawing1.xml 锚点 row 解析）
// AK-DB-009(row3) / AK-DB-013(row5) / AK-DB-017(row6) / AK-DB-018(row7) / AK-SB-018(row22)
const fs = require("fs");
const path = require("path");

const TMP = path.join(process.env.TEMP, "akxlsx");
const DRAW = path.join(TMP, "xl", "drawings", "drawing1.xml");
const RELS = path.join(TMP, "xl", "drawings", "_rels", "drawing1.xml.rels");
const MEDIA = path.join(TMP, "xl", "media");
const OUT_ROOT = path.join(process.cwd(), "public", "images", "parts");

// rId -> media 文件名
const relsXml = fs.readFileSync(RELS, "utf8");
const ridMap = {};
for (const m of relsXml.matchAll(/Id="(rId\d+)"[^>]*Target="\.\.\/media\/([^"]+)"/g)) {
  ridMap[m[1]] = m[2];
}

// 解析 anchor：row -> [rId...]
const drawXml = fs.readFileSync(DRAW, "utf8");
const rowRids = {};
for (const m of drawXml.matchAll(/<xdr:(?:oneCellAnchor|twoCellAnchor)>[\s\S]*?<\/xdr:(?:oneCellAnchor|twoCellAnchor)>/g)) {
  const a = m[0];
  const row = /<xdr:row>(\d+)<\/xdr:row>/.exec(a)?.[1];
  const rid = /r:embed="(rId\d+)"/.exec(a)?.[1];
  if (!row || !rid) continue;
  (rowRids[row] = rowRids[row] || []).push(rid);
}

// 5 款产品：Excel 行号 -> 输出子目录 + 文件前缀
const PRODUCTS = [
  { row: "3",  dir: "DB-disc-brush", prefix: "floor-scrubber-disc-brush-18-xmd-50-50-disc" },
  { row: "5",  dir: "DB-disc-brush", prefix: "floor-scrubber-disc-brush-i-scrub-30" },
  { row: "6",  dir: "DB-disc-brush", prefix: "floor-scrubber-disc-brush-13-sg-disc" },
  { row: "7",  dir: "DB-disc-brush", prefix: "floor-scrubber-disc-brush-16-sg-disc" },
  { row: "22", dir: "SB-side-brush", prefix: "floor-scrubber-side-brush-s-48-side" },
];

let allExported = [];
for (const p of PRODUCTS) {
  const rids = rowRids[p.row] || [];
  const outDir = path.join(OUT_ROOT, p.dir);
  fs.mkdirSync(outDir, { recursive: true });
  const files = [];
  rids.forEach((rid, i) => {
    const mediaName = ridMap[rid];
    if (!mediaName) return;
    const ext = path.extname(mediaName); // .webp/.jpg/.png/.jpeg
    const num = String(i + 1).padStart(2, "0");
    const outName = `${p.prefix}-${num}${ext}`;
    const outPath = path.join(outDir, outName);
    fs.copyFileSync(path.join(MEDIA, mediaName), outPath);
    files.push(`/images/parts/${p.dir}/${outName}`);
  });
  console.log(`[${p.row}] ${p.prefix}: ${files.length} 图`);
  console.log("  " + files.join("\n  "));
  allExported = allExported.concat({ row: p.row, prefix: p.prefix, files });
}
fs.writeFileSync(path.join(process.cwd(), ".reasonix-exported.json"), JSON.stringify(allExported, null, 2));
console.log("\nDONE. 共导出", allExported.reduce((s, x) => s + x.files.length, 0), "张图");
