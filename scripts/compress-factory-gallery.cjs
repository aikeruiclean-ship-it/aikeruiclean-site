// 压缩 factory-opt gallery 图到 .new.webp（不覆盖原文件，由 PowerShell 覆盖）
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const DIR = path.join(process.cwd(), "public/images/factory-opt");

const GALLERY = [
  "1.webp", "2.webp", "3.webp", "5.webp",
  "_MG_3280.webp", "_MG_3285.webp", "_MG_3304.webp",
];

async function main() {
  for (const f of GALLERY) {
    const src = path.join(DIR, f);
    const out = src + ".new";
    if (!fs.existsSync(src)) { console.log("SKIP:", f); continue; }
    const before = fs.statSync(src).size;
    await sharp(src)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(out);
    const after = fs.statSync(out).size;
    console.log(`${f}: ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB`);
  }
  console.log("GENERATED");
}

main().catch((e) => { console.error(e); process.exit(1); });
