const fs = require('fs');
const path = require('path');
const publicFiles = new Set();
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else publicFiles.add('/' + p.replace(/\\/g, '/').replace(/^public\//, ''));
  }
}
walk('public');

const refs = new Set();
function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (['node_modules', '.next', 'public'].includes(f)) continue;
    if (fs.statSync(p).isDirectory()) scan(p);
    else if (/\.(tsx?|js)$/.test(f)) {
      const c = fs.readFileSync(p, 'utf8');
      const m = c.match(/["'`](\/images\/[^"'`]+?)["'`]/g) || [];
      m.forEach((x) => {
        const img = x.slice(1, -1).split('?')[0];
        if (!img.includes('${') && !img.includes('{')) refs.add(img);
      });
    }
  }
}
scan('src');

let dead = [];
refs.forEach((r) => { if (!publicFiles.has(r)) dead.push(r); });
console.log('引用总数:', refs.size);
console.log('死图:', dead.length);
dead.forEach((d) => console.log('  MISS', d));
