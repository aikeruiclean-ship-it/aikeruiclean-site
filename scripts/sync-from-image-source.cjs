// 按图源重建：只保留有图源图的产品，分类按图源文件夹对齐，无图产品删除
// 用法: node sync-from-image-source.cjs preview | apply
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'src/lib/products.json');
const SRC = 'C:/整机站/产品图片/全部产品图片';
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const arr = Array.isArray(data) ? data : data.products;

// 图源索引：文件名 → 分类（文件夹名 "Disc Brush _ 盘刷" → "Disc Brush / 盘刷"）
const norm = n => { const m = n.match(/^(.+?) _ (.+)$/); return m ? m[1] + ' / ' + m[2] : n; };
const srcIndex = {};
fs.readdirSync(SRC, { withFileTypes: true }).forEach(d => {
  if (!d.isDirectory()) return;
  const cat = norm(d.name);
  fs.readdirSync(path.join(SRC, d.name)).forEach(f => { srcIndex[f] = cat; });
});

// 恢复之前被改成旗舰图的 7 个产品的原数字图（图源里有）
const RESTORE = {
  8009: '102013107468.webp', 8129: '101562835129.webp', 8119: '12146263221.webp',
  8111: '12062630493.webp', 8158: '103851372125.webp', 8235: '101558344300.webp',
  8228: '104414711336.webp',
};

const mode = process.argv[2] || 'preview';
const parts = arr.filter(p => p.category === 'Parts');
const keep = [], drops = [], catFixes = [];

parts.forEach(p => {
  let f = String(p.images || '').split('/').pop();
  if (RESTORE[p.id]) f = RESTORE[p.id];
  const srcCat = srcIndex[f];
  if (!srcCat) { drops.push({ id: p.id, name: p.name, img: f }); return; }
  // 对齐分类
  const newCat = srcCat.replace(/^Parts > /, '');
  const oldCat = (p.partSubcategory || '').replace(/^Parts > /, '');
  if (oldCat !== newCat) catFixes.push({ id: p.id, name: p.name.slice(0, 40), from: oldCat, to: newCat });
  if (RESTORE[p.id]) p.images = ['/images/parts/' + RESTORE[p.id]];
  p.categoryFull = 'Parts > ' + newCat;
  p.partSubcategory = newCat;
  keep.push(p);
});

// relatedProducts 悬空检查
const keepSkus = new Set(keep.concat(arr.filter(p => p.category !== 'Parts')).map(p => String(p.sku || '').trim().toLowerCase()).filter(Boolean));
const guides = fs.readFileSync(path.resolve(__dirname, '..', 'src/lib/guides.ts'), 'utf8');
const guideRefs = [...new Set((guides.match(/relatedProducts:\s*\[([^\]]+)\]/g) || []).join('\n').match(/'[^']+'/g) || [])].map(s => s.replace(/'/g, '').toLowerCase());
const dangling = guideRefs.filter(sku => !keepSkus.has(sku));

if (mode === 'apply') {
  const result = arr.filter(p => p.category !== 'Parts').concat(keep);
  fs.writeFileSync(FILE, JSON.stringify(Array.isArray(data) ? result : data, null, 2), 'utf8');
  console.log('已应用: 保留', keep.length, '| 删除', drops.length, '| 分类修正', catFixes.length);
} else {
  console.log('预览: 保留', keep.length, '| 删除', drops.length, '| 分类修正', catFixes.length);
  console.log('\n--- 待删除清单 (' + drops.length + ') ---');
  drops.forEach(d => console.log('  [' + d.id + '] ' + d.name.slice(0, 55) + ' | ' + d.img));
  console.log('\n--- 分类修正 (' + catFixes.length + ') ---');
  catFixes.forEach(c => console.log('  [' + c.id + '] ' + c.name + ' | ' + c.from + ' → ' + c.to));
  console.log('\n--- guides relatedProducts 悬空 (' + dangling.length + ') ---');
  dangling.forEach(s => console.log('  ' + s));
  // 存档删除清单
  fs.writeFileSync('C:/Users/8/Desktop/seo计划表/删除产品清单.txt',
    drops.map(d => d.id + '\t' + d.name + '\t' + d.img).join('\n'), 'utf8');
  console.log('\n删除清单已存桌面 seo计划表/删除产品清单.txt');
}
