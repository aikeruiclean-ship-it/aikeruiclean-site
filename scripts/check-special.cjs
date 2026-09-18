const fs = require("fs");
const path = require("path");

const files = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(webp|png|jpg|jpeg)$/i.test(f)) files.push(p.split(path.sep).join("/"));
  }
}
walk("public/images");

// 含特殊字符的文件名（非字母数字下划线连字符）
const special = files.filter((f) => {
  const name = f.split("/").pop();
  return /[^a-zA-Z0-9_\-.]/.test(name);
});
console.log("=== 含特殊字符文件:", special.length, "===");
special.forEach((f) => console.log("SPECIAL", f));

// 统计特殊字符类型
const types = {};
for (const f of special) {
  const name = f.split("/").pop();
  for (const ch of name) {
    if (!/[a-zA-Z0-9_\-.]/.test(ch)) {
      const code = ch.charCodeAt(0);
      const label = ch === " " ? "空格" : ch === "&" ? "&" : code > 127 ? `中文/非ASCII(\\u${code.toString(16)})` : ch;
      types[label] = (types[label] || 0) + 1;
    }
  }
}
console.log("");
console.log("=== 特殊字符类型统计 ===");
Object.entries(types).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(k, ":", v));
