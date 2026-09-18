// Parts 分类修正：20 处错位归位 + 10 个无关产品移入 Other + 5 个重复去重
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'src/lib/products.json');
const raw = fs.readFileSync(FILE, 'utf8');
const data = JSON.parse(raw);
const arr = Array.isArray(data) ? data : data.products;
const isWrapper = !Array.isArray(data);

// 1) 分类错位（id → 目标 categoryFull）
const FIX = {
  // Clutch Plate 归位（从 Disc Brush / Pad Holder）
  7998: 'Parts > Clutch Plate / 离合器盘',
  8035: 'Parts > Clutch Plate / 离合器盘',
  8260: 'Parts > Clutch Plate / 离合器盘',
  8049: 'Parts > Clutch Plate / 离合器盘',
  // Lug Fixing / 中心定位件 → Lock & Flange
  8018: 'Parts > Lock & Flange / 锁扣·法兰',
  8256: 'Parts > Lock & Flange / 锁扣·法兰',
  // 刷子归位到 Disc Brush
  8235: 'Parts > Disc Brush / 盘刷',
  8034: 'Parts > Disc Brush / 盘刷',
  8240: 'Parts > Disc Brush / 盘刷',
  8279: 'Parts > Disc Brush / 盘刷',
  8054: 'Parts > Disc Brush / 盘刷',
  8062: 'Parts > Disc Brush / 盘刷',
  8070: 'Parts > Disc Brush / 盘刷',
  8090: 'Parts > Disc Brush / 盘刷',
  8120: 'Parts > Disc Brush / 盘刷',
  8157: 'Parts > Disc Brush / 盘刷',
  8164: 'Parts > Disc Brush / 盘刷',
  // Main Broom → Roller Brush
  8084: 'Parts > Roller Brush / 滚刷',
  // Street Side → Side Brush
  8187: 'Parts > Side Brush / 边刷',
  // 刷子从 Mat 归位
  8045: 'Parts > Brush / 刷类',
};

// 2) 无关产品 → Other
const JUNK_TO_OTHER = [8103, 8189, 8232, 8163, 8180, 8126, 8146, 8188, 8134, 8266];

// 3) 重复去重（保留每组第一个 id）
const DUP_DELETE = [8062, 8070, 8151];

let moved = 0, junked = 0, deleted = 0;
const result = [];
for (const p of arr) {
  if (DUP_DELETE.includes(p.id)) { deleted++; continue; }
  if (FIX[p.id]) { p.categoryFull = FIX[p.id]; moved++; }
  if (JUNK_TO_OTHER.includes(p.id)) { p.categoryFull = 'Parts > Other / 其他'; junked++; }
  result.push(p);
}

// 写回
if (isWrapper) {
  const key = Object.keys(data).find(k => Array.isArray(data[k]));
  data[key] = result;
} 
fs.writeFileSync(FILE, JSON.stringify(isWrapper ? data : result, null, 2), 'utf8');

console.log(`分类错位归位: ${moved} | 无关→Other: ${junked} | 重复删除: ${deleted}`);
console.log(`产品总数: ${arr.length} → ${result.length}`);

// 验证
const after = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const aarr = Array.isArray(after) ? after : after[Object.keys(after).find(k => Array.isArray(after[k]))];
const byFull = {};
aarr.forEach(p => { const k = p.categoryFull || '?'; byFull[k] = (byFull[k]||0)+1; });
console.log('--- 修正后分类分布 ---');
Object.entries(byFull).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(v, k));
// 检查剩余错位
const leftover = aarr.filter(p => (p.categoryFull||'').includes('Disc Brush') && /Clutch Plate/i.test(p.name) && !/Pad Driver/i.test(p.name));
console.log('Disc Brush 残留 Clutch Plate:', leftover.length);
