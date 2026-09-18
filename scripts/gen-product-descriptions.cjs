// 产品描述重写：按 partSubcategory 生成规范英文描述（Overview + Key Features）
// 用法: node gen-product-descriptions.cjs preview | apply
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'src/lib/products.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const arr = Array.isArray(data) ? data : data.products;

const BRANDS = ['Tennant', 'Nilfisk', 'Karcher', 'Viper', 'Comac', 'Hako', 'Advance', 'Taski', 'Numatic', 'Gaomei', 'GaoMei', 'IPC', 'Fimap', 'Dulevo', 'Johnston', 'Scarab', 'Minuteman', 'Weizhuo', 'Kelenco', 'Bennett', 'Diamond', 'Aditek', 'Hawk', 'Ghibli', 'I-MOP', 'Tanjie'];

// 各分类的描述模板
const CATS = {
  'Disc Brush / 盘刷': {
    overview: 'Floor scrubber disc brush for daily deep cleaning with even liquid application and strong scrubbing power. Suitable for tile, concrete, epoxy and sealed floors.',
    features: ['Abrasion resistance 8.2 or higher', 'Service life up to 1000 hours', 'Fits standard 2-lug, 3-lug or 4-lug mounting', 'Custom sizes, materials and colors available'],
  },
  'Brush / 刷类': {
    overview: 'Replacement brush for floor scrubbers and sweepers. Built with quality bristles for consistent cleaning performance on a wide range of floor types.',
    features: ['Virgin nylon, PP or abrasive bristles', 'Compatible with most floor scrubber and sweeper models', 'Custom diameters and materials available', 'Factory-direct pricing'],
  },
  'Clutch Plate / 离合器盘': {
    overview: 'Clutch plate that connects the brush to the drive motor of your floor scrubber. Precision machined for secure engagement and reliable power transfer.',
    features: ['Aluminum alloy construction for durability', 'Standard NP-9200, 3-lug and 4-lug patterns available', 'Direct replacement for major brands', 'OEM quality at factory-direct prices'],
  },
  'Lock & Flange / 锁扣·法兰': {
    overview: 'Center lock and flange components that secure the brush or pad to the scrubber drive. Snap-fit, dual thread and left-rotate options to match your machine.',
    features: ['Snap-fit and threaded versions available', 'Fits standard center hole sizes', 'Precision machined for wobble-free operation', 'Brand-specific patterns for major machines'],
  },
  'Squeegee / 吸水胶条': {
    overview: 'Squeegee blades and assemblies that recover water after scrubbing. Made from natural rubber or polyurethane for streak-free pickup and long service life.',
    features: ['NR and PU materials available', 'Front and back blade kits', 'Precision cut to match original dimensions', 'Quick and easy installation'],
  },
  'Pad Holder / 针盘': {
    overview: 'Pad holder (pad driver) that mounts cleaning pads to your floor scrubber or buffer. Rigid design for even pad contact across the full working width.',
    features: ['3-lug and NP-9200 mounting options', 'Rigid steel or aluminum construction', 'Fits 13 to 20 inch machines', 'Quick pad changes'],
  },
  'Roller Brush / 滚刷': {
    overview: 'Cylindrical roller brush for floor scrubbers and sweepers. PP, abrasive and steel-wire options deliver the right aggression for your floor.',
    features: ['Cylindrical design for continuous cleaning', 'PP, nylon and steel wire bristles', 'Custom lengths available', 'Long service life with heavy use'],
  },
  'Side Brush / 边刷': {
    overview: 'Side brush (gutter broom) for sweepers that cleans along edges and corners. Steel wire and PP mixed bristles handle heavy debris.',
    features: ['Steel wire and PP mixed bristles', 'Edge and corner cleaning', 'Fits major sweeper brands', 'Durable, wear-resistant design'],
  },
  'Hose / 水管': {
    overview: 'Drain, vacuum and suction hoses for floor scrubbers. Flexible and durable construction for reliable water and debris transfer.',
    features: ['Drain and vacuum hose assemblies', 'Correct length and fitting for your model', 'Durable flexible construction', 'Direct replacement quality'],
  },
  'Vacuum Motor / 真空电机': {
    overview: 'Vacuum motor that powers the recovery system of your floor scrubber. High suction, 2-stage and 3-stage options for standard machines.',
    features: ['2-stage and 3-stage versions', '24V and 36V models', 'High suction performance', 'Direct replacement for major brands'],
  },
  'Pad / 百洁垫': {
    overview: 'Floor cleaning pads for scrubbing, polishing, stripping and burnishing. Consistent density for even results on all floor types.',
    features: ['White, red and black pads', 'Scrubbing, polishing and stripping grades', 'Standard diameters 13 to 20 inch', 'Consistent quality and thickness'],
  },
  'Solenoid Valve / 电磁阀': {
    overview: 'Water solenoid valve that controls cleaning solution flow on your floor scrubber. Reliable 24V operation for precise water delivery.',
    features: ['24V solenoid operation', 'Precise water flow control', 'Fits major scrubber brands', 'Direct replacement quality'],
  },
  'Motor / 电机': {
    overview: 'Drive, suction and brush motors for floor scrubbers. Matched power and mounting for reliable operation.',
    features: ['Drive, brush and suction motors', 'Correct voltage and mounting', 'Reliable performance', 'Direct replacement for major brands'],
  },
  'Mat / 地垫': {
    overview: 'Commercial floor mats for entrances, kitchens and work areas. Durable PVC and rubber construction.',
    features: ['Anti-slip surface', 'Durable PVC and rubber', 'Various sizes and colors', 'Easy to clean'],
  },
  'Filter / 过滤器': {
    overview: 'Solution line and vacuum filters for floor scrubbers. Keeps water lines and motors free of debris.',
    features: ['Water and vacuum filters', 'Prevents line blockage', 'Fits major scrubber brands', 'Easy replacement'],
  },
  'Bumper / 保险杠': {
    overview: 'Impact-resistant bumpers that protect your floor scrubber and walls during operation.',
    features: ['Impact-resistant material', 'Protects machine and surfaces', 'Fits major scrubber models', 'Easy installation'],
  },
  'Carbon Brush / 碳刷': {
    overview: 'Carbon brushes for floor scrubber motors. Quality carbon material for stable current transfer and long motor life.',
    features: ['Correct size for standard motors', 'Stable current transfer', 'Long service life', 'Easy replacement'],
  },
  'Wheel / 轮子': {
    overview: 'Drive wheels and casters for floor scrubbers. Durable construction for smooth movement and traction.',
    features: ['Drive and caster wheels', 'Durable tread', 'Correct size for your machine', 'Easy installation'],
  },
  'Electrical / 电气件': {
    overview: 'Contactors, relays and electrical components for floor scrubbers. Reliable switching for control systems.',
    features: ['Contactors and relays', 'Reliable switching', 'Fits major scrubber brands', 'Direct replacement quality'],
  },
  'Battery / 电池': {
    overview: 'Batteries and related components for ride-on floor scrubbers. Consistent power delivery for full shift operation.',
    features: ['Correct voltage for your machine', 'Consistent discharge', 'Reliable performance', 'Direct replacement'],
  },
  'Other / 其他': {
    overview: 'Universal spare parts and accessories for floor scrubbers and sweepers. Quality components for maintenance and repair.',
    features: ['Universal compatibility', 'Quality materials', 'Factory-direct pricing', 'Custom orders welcome'],
  },
};

function extractBrand(name) {
  for (const b of BRANDS) if (new RegExp('\\b' + b + '\\b', 'i').test(name)) return b;
  return '';
}

function genDescription(cat, name) {
  const tpl = CATS[cat] || CATS['Other / 其他'];
  const brand = extractBrand(name);
  const brandLine = brand ? brand + ' compatible' : 'Universal';
  const model = name.replace(/\s*-\s*.*$/, '').trim();
  const overview = brandLine + ' ' + tpl.overview.charAt(0).toLowerCase() + tpl.overview.slice(1);
  const feats = tpl.features.map(f => '<li>' + f + '</li>').join('');
  return '<h3>Overview</h3>\n<div>' + overview + '</div>\n<h3>Key Features</h3>\n<ul>' + feats + '<li>Factory-direct pricing and OEM customization available</li></ul>';
}

const mode = process.argv[2] || 'preview';
const parts = arr.filter(p => p.category === 'Parts');
if (mode === 'apply') {
  parts.forEach(p => { p.description = genDescription(p.partSubcategory || 'Other / 其他', p.name); });
  fs.writeFileSync(FILE, JSON.stringify(Array.isArray(data) ? arr : data, null, 2), 'utf8');
  console.log('已重写', parts.length, '个产品描述');
} else {
  // 每个分类抽 1 个展示
  const seen = {};
  parts.forEach(p => {
    const cat = p.partSubcategory || '?';
    if (seen[cat]) return;
    seen[cat] = 1;
    console.log('=== [' + cat + '] ' + p.name.slice(0, 50));
    console.log(genDescription(cat, p.name).slice(0, 260));
    console.log();
  });
}
