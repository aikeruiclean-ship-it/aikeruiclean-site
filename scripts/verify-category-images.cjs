const https = require("https");
const sharp = require("sharp");
const products = require("../src/lib/products.json");

const sub = products.filter(
  (p) =>
    (p.partSubcategory || "").includes("Lock") ||
    (p.partSubcategory || "").includes("锁扣") ||
    (p.partSubcategory || "").includes("Flange") ||
    (p.partSubcategory || "").includes("法兰")
);

const imgPaths = new Set();
sub.forEach((p) => {
  const imgs = Array.isArray(p.images) ? p.images : [p.images];
  imgs.forEach((i) => imgPaths.add(i));
});

function fetchUrl(url) {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve({ status: res.statusCode, buf: Buffer.concat(chunks) }));
      })
      .on("error", (e) => resolve({ status: 0, buf: null, error: e.message }));
  });
}

(async () => {
  let bad = 0, ok = 0, total = imgPaths.size;
  console.log("待验证图片:", total);
  for (const imgPath of imgPaths) {
    const encoded = imgPath.split("/").map((s) => encodeURIComponent(s)).join("/");
    const url = `https://aikeruiclean.com/_next/image?url=${encodeURIComponent(encoded)}&w=1280&q=75`;
    const res = await fetchUrl(url);
    if (res.status !== 200) {
      bad++;
      console.log("HTTP失败", res.status, imgPath);
      continue;
    }
    // 验证内容是否为有效图片
    try {
      const meta = await sharp(res.buf).metadata();
      if (!meta.width || !meta.height) {
        bad++;
        console.log("0尺寸", imgPath);
      } else {
        ok++;
      }
    } catch (e) {
      bad++;
      console.log("解码失败", imgPath, "-", res.buf.length, "bytes -", e.message.substring(0, 40));
    }
  }
  console.log("");
  console.log("=== 结果: 共", total, "| 正常", ok, "| 失败", bad, "===");
})();
