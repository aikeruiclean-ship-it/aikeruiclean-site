const XLSX = require("xlsx");
const https = require("https");
const path = require("path");

const files = {
  noindex: "C:/Users/8/AppData/Roaming/reasonix/global-workspace/.reasonix/attachments/clipboard-20260810-143315.202224-000002.xlsx",
  redirect: "C:/Users/8/AppData/Roaming/reasonix/global-workspace/.reasonix/attachments/clipboard-20260810-143330.171861-000003.xlsx",
  robots: "C:/Users/8/AppData/Roaming/reasonix/global-workspace/.reasonix/attachments/clipboard-20260810-143342.739379-000004.xlsx",
  unindexed: "C:/Users/8/AppData/Roaming/reasonix/global-workspace/.reasonix/attachments/clipboard-20260810-143353.187965-000005.xlsx",
};

function getUrls(file) {
  const wb = XLSX.readFile(file);
  const ws = wb.Sheets["表格"];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  return [...new Set(rows.slice(1).map((x) => String(x[0]).trim()).filter(Boolean))];
}

function fetchStatus(url, depth = 0) {
  return new Promise((resolve) => {
    const mod = url.startsWith("https") ? https : require("http");
    const req = mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      const status = res.statusCode;
      if (status >= 300 && status < 400 && res.headers.location && depth < 5) {
        let loc = res.headers.location;
        if (loc.startsWith("/")) loc = "https://aikeruiclean.com" + loc;
        res.resume();
        // 取 redirect 目标
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          fetchStatus(loc, depth + 1).then((inner) => {
            resolve({ finalStatus: inner.finalStatus, redirectTo: inner.redirectTo || loc, noindex: inner.noindex, title: inner.title });
          });
        });
        return;
      }
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        resolve({
          finalStatus: status,
          noindex: /name="robots" content="noindex"/.test(body),
          title: (body.match(/<title>([^<]*)<\/title>/) || [])[1]?.substring(0, 50) || "",
        });
      });
    });
    req.on("error", () => resolve({ finalStatus: 0 }));
  });
}

(async () => {
  for (const [name, file] of Object.entries(files)) {
    const urls = getUrls(file);
    console.log(`\n========== ${name} (${urls.length} URL) ==========`);
    const results = { ok: [], noindex404: [], redirect: [], real404: [], noindex200: [] };
    for (let i = 0; i < urls.length; i += 6) {
      const batch = urls.slice(i, i + 6);
      const res = await Promise.all(batch.map((u) => fetchStatus(u)));
      res.forEach((r, j) => {
        const u = batch[j];
        const pathPart = u.replace("https://aikeruiclean.com", "");
        if (r.finalStatus === 200 && !r.noindex) results.ok.push(pathPart);
        else if (r.finalStatus === 200 && r.noindex && r.title.includes("Not Found")) results.noindex404.push(pathPart + " | " + r.title);
        else if (r.finalStatus === 200 && r.noindex) results.noindex200.push(pathPart + " | " + r.title);
        else if (r.finalStatus >= 300 && r.finalStatus < 400) results.redirect.push(pathPart + " → " + (r.redirectTo || "").replace("https://aikeruiclean.com", ""));
        else results.real404.push(pathPart + " | HTTP " + r.finalStatus);
      });
    }
    console.log("  正常可索引(200):", results.ok.length);
    console.log("  200+noindex(真页面被noindex!):", results.noindex200.length);
    if (results.noindex200.length) results.noindex200.slice(0, 15).forEach((x) => console.log("    ⚠️", x));
    console.log("  200+noindex(404页,正常):", results.noindex404.length);
    console.log("  重定向(301/308):", results.redirect.length);
    if (results.redirect.length) results.redirect.slice(0, 10).forEach((x) => console.log("    ↪", x));
    console.log("  真404(需要处理):", results.real404.length);
    if (results.real404.length) results.real404.slice(0, 15).forEach((x) => console.log("    ❌", x));
  }
})();
