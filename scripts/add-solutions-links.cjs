const fs = require('fs');
const path = require('path');

// 8 个 solutions 及其标题
const solutions = [
  { slug: 'airport-floor-cleaning', title: 'Airport' },
  { slug: 'cold-storage-floor-cleaning', title: 'Cold Storage' },
  { slug: 'factory-floor-cleaning', title: 'Factory' },
  { slug: 'hotel-floor-cleaning', title: 'Hotel' },
  { slug: 'pharmaceutical-cleanroom-floor-cleaning', title: 'Cleanroom / Pharma' },
  { slug: 'shopping-mall-floor-cleaning', title: 'Shopping Mall' },
  { slug: 'supermarket-floor-cleaning', title: 'Supermarket' },
  { slug: 'warehouse-floor-cleaning', title: 'Warehouse' },
];

const dir = 'src/app/solutions';

let added = 0;
for (const s of solutions) {
  const file = path.join(dir, s.slug + '/page.tsx');
  let c = fs.readFileSync(file, 'utf8');
  if (c.includes('Other Solutions') || c.includes('More Solutions')) { console.log('已有互链区块:', s.slug); continue; }

  // 其他 solutions 链接
  const others = solutions.filter((x) => x.slug !== s.slug);
  const links = others
    .map((x) => `            <Link href="/solutions/${x.slug}" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">${x.title}</Link>`)
    .join('\n');

  // 在 Related Guides section 前插入
  const anchor = '        <section className="mb-12">\n          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides</h2>';
  const block = `        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Industry Solutions</h2>
          <div className="flex flex-wrap gap-3">
${links}
          </div>
        </section>

`;
  if (!c.includes(anchor)) { console.log('找不到锚点:', s.slug); continue; }
  c = c.replace(anchor, block + anchor);
  fs.writeFileSync(file, c);
  added++;
}
console.log('已加互链区块:', added, '/ 8');
