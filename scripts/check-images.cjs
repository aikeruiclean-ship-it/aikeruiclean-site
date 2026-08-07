const fs = require("fs");
const path = require("path");

// 收集 public/images 实际存在的所有文件
const publicFiles = new Set();
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else {
      const rel = "/" + p.split(path.sep).join("/").replace(/^public\//, "");
      publicFiles.add(rel);
    }
  }
}
walk("public");

// 收集 src 里所有 /images/ 引用
const refs = new Map(); // path -> [files]
function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (f === "node_modules" || f === ".next" || f === "public") continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) scan(p);
    else if (/\.(tsx?|jsx?|json)$/.test(f)) {
      const content = fs.readFileSync(p, "utf8");
      const matches = content.match(/["'`](\/images\/[^"'`]+?)["'`]/g) || [];
      for (const m of matches) {
        let imgPath = m.replace(/^["'`]/, "").replace(/["'`]$/, "");
        imgPath = imgPath.split("?")[0];
        if (imgPath.includes("${") || imgPath.includes("{")) continue;
        if (!refs.has(imgPath)) refs.set(imgPath, []);
        refs.get(imgPath).push(p);
      }
    }
  }
}
scan("src");

// 找出引用但文件不存在的
console.log("=== 死图（引用但文件不存在）===");
let deadCount = 0;
for (const [imgPath, files] of refs) {
  if (publicFiles.has(imgPath)) continue;
  deadCount++;
  console.log("MISS", imgPath, "<-", files[0]);
}
console.log("死图数:", deadCount);
console.log("");
console.log("public/images 文件总数:", publicFiles.size);
console.log("引用总数:", refs.size);

// 额外：找出 public 里有但可能没被引用的孤立图片（前 30 个）
const usedSet = new Set(refs.keys());
let orphan = 0;
console.log("");
console.log("=== 孤立图片（存在但可能未引用，抽查前 40 个）===");
for (const f of publicFiles) {
  if (!usedSet.has(f)) {
    orphan++;
    if (orphan <= 40) console.log("ORPHAN", f);
  }
}
console.log("孤立图总数:", orphan);
