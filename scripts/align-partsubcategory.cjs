// 对齐 partSubcategory 与 categoryFull（Parts 页筛选字段）
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'src/lib/products.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const arr = Array.isArray(data) ? data : data.products;

let aligned = 0;
const changes = [];
for (const p of arr) {
  if (p.category === 'Parts' && p.categoryFull) {
    const target = p.categoryFull.replace(/^Parts > /, '');
    if (p.partSubcategory !== target) {
      changes.push({ id: p.id, name: p.name.slice(0, 45), from: p.partSubcategory, to: target });
      p.partSubcategory = target;
      aligned++;
    }
  }
}
fs.writeFileSync(FILE, JSON.stringify(Array.isArray(data) ? arr : data, null, 2), 'utf8');
console.log('对齐产品数:', aligned);
changes.forEach(c => console.log(`[${c.id}] ${c.name} | ${c.from} → ${c.to}`));

// 验证：partSubcategory 分布 vs categoryFull 分布
const after = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const aarr = Array.isArray(after) ? after : after[Object.keys(after).find(k => Array.isArray(after[k]))];
const sub = {}, full = {};
aarr.forEach(p => {
  if (p.category === 'Parts') {
    sub[p.partSubcategory] = (sub[p.partSubcategory] || 0) + 1;
    full[(p.categoryFull || '').replace(/^Parts > /, '')] = (full[(p.categoryFull || '').replace(/^Parts > /, '')] || 0) + 1;
  }
});
const subK = Object.keys(sub).sort().join('|');
const fullK = Object.keys(full).sort().join('|');
console.log('partSubcategory 与 categoryFull 完全一致:', subK === fullK);
console.log('Parts 产品数:', Object.values(sub).reduce((a, b) => a + b, 0));
