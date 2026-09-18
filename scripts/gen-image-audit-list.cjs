// 生成 Parts 产品-图片对照清单（供用户对照图册标记对错）
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const XLSX = require('C:/Users/8/AppData/Roaming/reasonix/global-workspace/node_modules/xlsx');

const ROOT = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/lib/products.json'), 'utf8'));
const arr = Array.isArray(data) ? data : data.products;

// 重复内容组（md5 → 文件名列表）
const dir = path.join(ROOT, 'public/images/parts');
const md5Map = {};
if (fs.existsSync(dir)) {
  fs.readdirSync(dir).forEach(f => {
    if (!/\.(webp|jpg|jpeg|png)$/i.test(f)) return;
    const md5 = crypto.createHash('md5').update(fs.readFileSync(path.join(dir, f))).digest('hex');
    (md5Map[md5] = md5Map[md5] || []).push(f);
  });
}
const dupGroups = Object.entries(md5Map).filter(([k, v]) => v.length > 1);

const rows = [['id', '产品名称', 'SKU', 'partSubcategory 分类', '当前图片文件', '图片类型', '重复组', '处理状态']];
arr.filter(p => p.category === 'Parts').forEach(p => {
  const imgs = Array.isArray(p.images) ? p.images : (p.images ? [p.images] : []);
  imgs.forEach(img => {
    const f = img.split('/').pop();
    const isNum = /^\d+\./.test(f);
    // 找该文件所在重复组
    let group = '';
    if (fs.existsSync(path.join(dir, f))) {
      const md5 = crypto.createHash('md5').update(fs.readFileSync(path.join(dir, f))).digest('hex');
      const g = md5Map[md5];
      if (g && g.length > 1) group = g.join(' / ').slice(0, 60);
    }
    rows.push([p.id, p.name, p.sku || '', (p.partSubcategory || '').replace(/^Parts > /, ''), f, isNum ? '数字导入图' : 'slug命名', group, '待核对']);
  });
});

const ws = XLSX.utils.aoa_to_sheet(rows);
ws['!cols'] = [{ wch: 8 }, { wch: 60 }, { wch: 18 }, { wch: 22 }, { wch: 45 }, { wch: 12 }, { wch: 60 }, { wch: 12 }];
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Parts产品-图片对照');
// 统计 sheet
const statRows = [
  ['统计'], [],
  ['Parts 产品数', arr.filter(p => p.category === 'Parts').length],
  ['数字导入图产品', rows.filter(r => r[5] === '数字导入图').length],
  ['slug 命名图产品', rows.filter(r => r[5] === 'slug命名').length],
  ['重复内容组数', dupGroups.length],
  ['重复组涉及文件数', dupGroups.reduce((a, [, v]) => a + v.length, 0)],
  [],
  ['使用说明'], [],
  ['1. 打开图册/实拍图，逐行核对「当前图片文件」是否与「产品名称」匹配'],
  ['2. 不匹配的行，把正确图片文件名或路径填到最后一列「处理状态」'],
  ['3. 处理完发回给我，我批量替换 images 字段'],
];
const ws2 = XLSX.utils.aoa_to_sheet(statRows);
ws2['!cols'] = [{ wch: 30 }, { wch: 60 }];
XLSX.utils.book_append_sheet(wb, ws2, '说明与统计');

const OUT = 'C:/Users/8/Desktop/seo计划表/Parts产品-图片对照清单.xlsx';
XLSX.writeFile(wb, OUT);
console.log('已生成: ' + OUT);
console.log('行数（含表头）:', rows.length);
