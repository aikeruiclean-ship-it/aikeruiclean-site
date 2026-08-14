// 产品名称规范化：清理垃圾词 + 品牌拼写修正 + 格式整理
// 用法: node clean-product-names.cjs preview   (生成对照表，不写入)
//       node clean-product-names.cjs apply     (写入 products.json)
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'src/lib/products.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const arr = Array.isArray(data) ? data : data.products;

const JUNK = [
  'Factory Directly Sale', 'Factory Direct Sales', 'Factory Direct Sales', 'Wholesale', 'High Quality',
  'Best Sale', 'Hot Sale', 'Hot Product', 'China Factory', 'From China', 'Professional Brush Factory',
  'Good Quantity Assured', 'Good Quality', 'Long Lasting', 'The Manufacturer Recommended', 'Big Sales',
  'The Newest', 'New Anhui', 'Excellent Quality', 'Custom Wholesale', 'Competitive Price',
  'The Sense of Goods Is Easy to Use', 'Easy to Use', 'Factory Price',
  'High Cost Performance New Anhui Plastic Customized Washing Low Cost',
  'for Commercial Equipment', 'for Commercial Use', 'for Commercial Cleaning', 'for Commercial Cleaning Equipment',
  'Cleaning Equipment Parts', 'Cleaning Equipment Part', 'Cleaning Machine Spare Part',
  'Floor Scrubber Spare Part', 'Floor Scrubber Spare Parts', 'Floor Scrubber Machine Spare Part',
  'Floor Cleaning Equipment Spare Part', 'Floor Cleaning Equipment Spare Parts', 'Floor Scrubber Machine Parts',
  'Cleaning Equipment Floor Scrubber Machine Parts', 'Auto Floor Scrubber Cleaning Equipment Parts',
  'Floor Scrubber Dryer Spare Parts', 'Floor Scrubber Spare Parts Disc', 'Sweeper Disc Brush',
];

const BRAND_FIX = [
  [/\bKacher\b/g, 'Karcher'], [/\bKarche\b/g, 'Karcher'], [/\bKarchr\b/g, 'Karcher'],
  [/\bTenant\b/g, 'Tennant'], [/\bTennat\b/g, 'Tennant'], [/\bTennnt\b/g, 'Tennant'],
  [/\bKARCH\b/g, 'KARCHER'], [/\bKarcherr\b/g, 'Karcher'],
];

function cleanName(name) {
  let n = name;
  JUNK.forEach(w => { n = n.split(w).join(' '); });
  BRAND_FIX.forEach(([re, g]) => { n = n.replace(re, g); });
  n = n.replace(/\s+-\s+/g, ' - ').replace(/\s*--+/g, ' - ').replace(/\s+/g, ' ').trim();
  n = n.replace(/^[-,\s]+|[-,\s]+$/g, '');
  // 重复词清理（如 "Disc Brush ... Disc Brush"）
  n = n.replace(/\b(\w+)\s+\1\b/gi, '$1');
  return n;
}

const mode = process.argv[2] || 'preview';
const changes = [];
arr.filter(p => p.category === 'Parts').forEach(p => {
  const c = cleanName(p.name);
  if (c !== p.name) changes.push({ id: p.id, from: p.name, to: c });
});

if (mode === 'apply') {
  arr.forEach(p => { if (p.category === 'Parts') p.name = cleanName(p.name); });
  fs.writeFileSync(FILE, JSON.stringify(Array.isArray(data) ? arr : data, null, 2), 'utf8');
  console.log('已写入', changes.length, '个名称修改');
} else {
  console.log('预览模式：共', changes.length, '个产品名称将被修改\n');
  changes.slice(0, 40).forEach(c => {
    console.log('原: ' + c.from.slice(0, 88));
    console.log('新: ' + c.to.slice(0, 88));
    console.log();
  });
  // 保存完整对照表
  const OUT = 'C:/Users/8/Desktop/seo计划表/产品名称规范化对照.txt';
  fs.writeFileSync(OUT, changes.map(c => c.id + '\t' + c.from + '\t' + c.to).join('\n'), 'utf8');
  console.log('完整对照表已存: ' + OUT);
}
