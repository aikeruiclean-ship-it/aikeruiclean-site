const XLSX = require("xlsx");
const https = require("https");
const http = require("http");

const wb = XLSX.readFile(
  "C:/Users/8/AppData/Roaming/reasonix/global-workspace/.reasonix/attachments/clipboard-20260810-143301.208363-000001.xlsx"
);
const ws = wb.Sheets["表格"];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

const urls = new Map();
for (let i = 1; i < rows.length; i++) {
  const url = String(rows[i][0] || "").trim();
  if (url) urls.set(url, true);
}

function check(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      const status = res.statusCode;
      if (status >= 300 && status < 400 && res.headers.location) {
        // 跟随重定向（最多 5 跳）
        let loc = res.headers.location;
        if (loc.startsWith("/")) loc = "https://aikeruiclean.com" + loc;
        res.resume();
        follow(loc, 1).then(resolve);
      } else {
        res.resume();
        resolve({ status, final: url });
      }
    });
    req.on("error", () => resolve({ status: 0, final: url }));
    function follow(u, depth) {
      return new Promise((resolve2) => {
        if (depth > 5) return resolve2({ status: "LOOP", final: u });
        const m2 = u.startsWith("https") ? https : http;
        const r2 = m2.get(u, { headers: { "User-Agent": "Mozilla/5.0" } }, (res2) => {
          const s2 = res2.statusCode;
          if (s2 >= 300 && s2 < 400 && res2.headers.location) {
            let l2 = res2.headers.location;
            if (l2.startsWith("/")) l2 = "https://aikeruiclean.com" + l2;
            res2.resume();
            follow(l2, depth + 1).then(resolve2);
          } else {
            res2.resume();
            resolve2({ status: s2, final: u });
          }
        });
        r2.on("error", () => resolve2({ status: 0, final: u }));
      });
    }
  });
}

(async () => {
  let ok = 0, still404 = 0;
  const bad = [];
  const urlList = [...urls.keys()];
  console.log("测试", urlList.length, "个 URL...");
  // 限并发 8
  for (let i = 0; i < urlList.length; i += 8) {
    const batch = urlList.slice(i, i + 8);
    const results = await Promise.all(batch.map((u) => check(u)));
    results.forEach((r, j) => {
      const u = batch[j];
      if (r.status === 200 || r.status === 301) {
        ok++;
      } else {
        still404++;
        bad.push({ u, status: r.status, final: r.final });
      }
    });
  }
  console.log("正常(200/301):", ok);
  console.log("仍失败:", still404);
  console.log("");
  console.log("=== 仍 404 的 URL ===");
  bad.forEach((b) => console.log(b.status, b.u));
})();
