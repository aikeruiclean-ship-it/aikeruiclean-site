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

function fetchUrl(url, headers) {
  return new Promise((resolve) => {
    https
      .get(url, { headers }, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve({ status: res.statusCode, buf: Buffer.concat(chunks) }));
      })
      .on("error", (e) => resolve({ status: 0, buf: null, error: e.message }));
  });
}

(async () => {
  // 模拟浏览器请求：带 Referer 和 UA
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
    Referer: "https://aikeruiclean.com/parts?subcategory=Lock%20%26%20Flange",
    Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
  };

  let bad = 0, ok = 0;
  const failures = [];
  for (const imgPath of imgPaths) {
    // 测试两个关键宽度（浏览器通常会请求 640 或 1280）
    for (const w of [640, 1280]) {
      const encoded = imgPath.split("/").map((s) => encodeURIComponent(s)).join("/");
      const url = `https://aikeruiclean.com/_next/image?url=${encodeURIComponent(encoded)}&w=${w}&q=75`;
      const res = await fetchUrl(url, headers);
      if (res.status !== 200) {
        failures.push(`${imgPath} w=${w} HTTP ${res.status}`);
        bad++;
        continue;
      }
      try {
        const meta = await sharp(res.buf).metadata();
        if (!meta.width) {
          failures.push(`${imgPath} w=${w} 0尺寸 (${res.buf.length}b)`);
          bad++;
        } else ok++;
      } catch (e) {
        failures.push(`${imgPath} w=${w} 解码失败 ${res.buf.length}b`);
        bad++;
      }
    }
  }
  console.log("=== 模拟浏览器双宽度验证:", imgPaths.size, "图 x 2 宽度 ===");
  console.log("正常:", ok, "| 失败:", bad);
  failures.slice(0, 20).forEach((f) => console.log("FAIL", f));
})();
