// Parts 子分类静态页配置（SEO 语义化目录）
// 把原来的 /parts?subcategory=XXX（客户端筛选、内容重复）改为静态可索引页 /parts/{slug}
// 只收录高价值分类（产品数 >= 14 的前 8 个），其余继续走 /parts 筛选

export interface PartCategoryDef {
  /** 静态 URL slug */
  slug: string;
  /** products.json 里的 partSubcategory 精确值（用于筛产品） */
  subcategory: string;
  /** 页面 H1 */
  h1: string;
  /** 面包屑名称 */
  breadcrumb: string;
  /** SEO title（<=60 字符） */
  title: string;
  /** meta description */
  description: string;
  /** 内页介绍段（1-2 段，含关键词） */
  intro: string[];
  /** 页面 FAQ */
  faq: { q: string; a: string }[];
}

export const PART_CATEGORIES: PartCategoryDef[] = [
  {
    slug: "disc-brushes",
    subcategory: "Disc Brush / 盘刷",
    h1: "Floor Scrubber Disc Brushes",
    breadcrumb: "Disc Brushes",
    title: "Floor Scrubber Disc Brushes | Factory Direct | Aikerui",
    description:
      "OEM-quality replacement disc brushes for floor scrubbers — nylon, PP and abrasive bristles, 10\"-20\" diameters, fits Tennant, Karcher, Nilfisk & Viper. Factory direct.",
    intro: [
      "Disc brushes are the workhorse of any auto scrubber. Aikerui manufactures replacement disc brushes with nylon, polypropylene (PP) and abrasive-impregnated bristles, in diameters from 10\" to 20\" and block styles matched to the most common scrubber decks.",
      "Every brush is built to the original equipment dimensions — block diameter, bore/lug pattern, bristle length and tuft density — so it drops into your machine without adapters. Available with cylindrical or tapered bristles, and in standard or heavy-duty fill for aggressive floor prep.",
    ],
    faq: [
      {
        q: "What is the difference between a disc brush and a pad?",
        a: "A disc brush uses bristles bonded into a round block, so it scrubs into grout lines and textured floors. A pad driver holds a flat abrasive pad for lighter surface cleaning. Disc brushes last far longer and handle rougher surfaces.",
      },
      {
        q: "How do I know which disc brush size my machine needs?",
        a: "Measure the old brush block diameter and count the lugs (or note the bore type). Standard sizes are 10, 11, 13, 14, 17, 18 and 20 inches. Send us your machine model and we will confirm the correct brush.",
      },
      {
        q: "Do you offer abrasive or heavy-duty disc brushes?",
        a: "Yes. We supply nylon for general cleaning, PP for economy/high-volume work, and abrasive-filled bristles for stripping, concrete prep and heavy grime removal.",
      },
      {
        q: "What is the MOQ and lead time?",
        a: "MOQ is typically 50-100 pieces per size for stock specifications, or 200+ for fully custom blocks. Standard sizes ship in 7-15 days; custom tooling adds 20-30 days.",
      },
    ],
  },
  {
    slug: "scrubber-brushes",
    subcategory: "Brush / 刷类",
    h1: "Floor Scrubber Brushes",
    breadcrumb: "All Brushes",
    title: "Floor Scrubber Brushes | Replacement Brush | Aikerui",
    description:
      "Replacement floor scrubber brushes for all major brands — disc, roller, side and specialty brushes. Factory direct, custom OEM, 30-50% below dealer price.",
    intro: [
      "This is our general catalogue of floor scrubber brushes — the replacement brushes that fit walk-behind and ride-on scrubbers across all major brands. If you are not sure which specific type you need, start here and we will match your machine.",
      "Aikerui has manufactured cleaning brushes since 2008 in our own Anhui factory. We produce nylon, PP, abrasive and hybrid bristle brushes, with custom block tooling available for volume orders.",
    ],
    faq: [
      {
        q: "How often should floor scrubber brushes be replaced?",
        a: "Replace when bristles wear to about 1/4 inch (6mm) or roughly half their original length. Most commercial scrubbers need new brushes every 3-6 months depending on use hours and floor type.",
      },
      {
        q: "Can you supply brushes for a specific machine model?",
        a: "Yes. Send us the brand and model (for example Tennant T300 or Nilfisk SC250) and we will confirm the exact brush spec, or produce it as a custom item.",
      },
    ],
  },
  {
    slug: "squeegee-blades",
    subcategory: "Squeegee / 吸水胶条",
    h1: "Floor Scrubber Squeegee Blades",
    breadcrumb: "Squeegee Blades",
    title: "Floor Scrubber Squeegee Blades | Replacement | Aikerui",
    description:
      "Replacement squeegee blades for floor scrubbers — gum rubber, nitrile and polyurethane in straight, linatex and curved profiles. Factory direct, cut to length.",
    intro: [
      "The squeegee blade is what makes a scrubber leave a dry floor. Once the rubber edge wears or curls, water streaks and the machine needs multiple passes. We supply replacement squeegee blades in gum rubber, nitrile and polyurethane.",
      "Blades are available as straight strips (cut to your length) or as complete assemblies with the backer, and in standard or heavy-duty thicknesses for high-hour operations.",
    ],
    faq: [
      {
        q: "How do I know when to replace a squeegee blade?",
        a: "Look for a rounded or nicked edge, and check whether the machine leaves streaks after one pass. Most commercial applications replace blades every 3-6 months.",
      },
      {
        q: "Do you sell complete squeegee assemblies or just the rubber?",
        a: "Both. We supply raw rubber blades cut to length, and complete assemblies including the metal backer where required.",
      },
    ],
  },
  {
    slug: "pad-holders",
    subcategory: "Pad Holder / 针盘",
    h1: "Floor Scrubber Pad Holders",
    breadcrumb: "Pad Holders",
    title: "Floor Scrubber Pad Drivers & Holders | Aikerui",
    description:
      "Replacement pad holders and pad drivers for floor scrubbers — universal and machine-specific lug patterns, riser styles, factory direct pricing.",
    intro: [
      "Pad holders (also called pad drivers) carry the abrasive pad on a scrubber deck. We manufacture holders matched to common scrubber drive lugs and center-lock systems, in all standard diameters.",
      "Available styles include standard riser, low-profile and center-lock versions. Custom lug patterns and sizes can be tooled for volume orders.",
    ],
    faq: [
      {
        q: "How do I identify my pad holder type?",
        a: "Note the drive lug pattern (three-lug, five-lug or center-lock), the block diameter, and your machine brand. Send a photo or the model number and we will confirm.",
      },
      {
        q: "Are your pad holders compatible with standard floor pads?",
        a: "Yes. Our holders accept standard industry pad diameters — tell us your pad size and we will match the holder.",
      },
    ],
  },
  {
    slug: "clutch-plates",
    subcategory: "Clutch Plate / 离合器盘",
    h1: "Floor Scrubber Clutch Plates",
    breadcrumb: "Clutch Plates",
    title: "Floor Scrubber Clutch Plates | Replacement Parts | Aikerui",
    description:
      "Replacement clutch plates for floor scrubbers — original-equipment fit, hardened steel, factory direct. Compatible with major scrubber drive systems.",
    intro: [
      "The clutch plate transfers drive from the motor to the brush and is a common wear item on walk-behind scrubbers. A worn plate causes the brush to slip, chatter or stop turning under load.",
      "We manufacture replacement clutch plates to original dimensions using hardened steel, so they engage cleanly and hold torque on heavy scrubbing jobs.",
    ],
    faq: [
      {
        q: "How do I know my clutch plate is worn?",
        a: "Symptoms include the brush losing drive under pressure, a chattering sound, or the machine needing higher motor speed to turn the brush.",
      },
      {
        q: "Do clutch plates fit all scrubber brands?",
        a: "No — plate geometry is machine-specific. Tell us the brand and model and we will confirm the correct plate or supply it as a custom part.",
      },
    ],
  },
  {
    slug: "hoses",
    subcategory: "Hose / 水管",
    h1: "Floor Scrubber Hoses & Tubing",
    breadcrumb: "Hoses",
    title: "Floor Scrubber Hoses | Replacement Hose Parts | Aikerui",
    description:
      "Replacement floor scrubber hoses, drain and suction tubing — OEM fit for major scrubber brands. Factory direct, custom lengths available.",
    intro: [
      "Solution delivery, recovery suction and drain hoses are all wear items on a scrubber. We supply replacement hoses in the correct inner and outer diameter with matched fittings.",
      "Available coiled, straight and pre-formed bends, in the standard lengths used by major scrubber platforms. Custom lengths and fitting combinations are available for OEM orders.",
    ],
    faq: [
      {
        q: "Can I cut your hoses to length?",
        a: "Yes, most of our straight hoses can be cut to length on site. Pre-formed hoses with fixed bends must be ordered to the correct original length.",
      },
      {
        q: "Do you supply hoses with fittings attached?",
        a: "Yes — tell us the fitting type and thread and we will supply the hose ready to fit.",
      },
    ],
  },
  {
    slug: "roller-brushes",
    subcategory: "Roller Brush / 滚刷",
    h1: "Floor Scrubber Roller Brushes",
    breadcrumb: "Roller Brushes",
    title: "Floor Scrubber Roller & Cylindrical Brushes | Aikerui",
    description:
      "Replacement cylindrical roller brushes for floor scrubbers — nylon and PP bristles, OEM lengths and core fittings, factory direct pricing.",
    intro: [
      "Cylindrical (roller) brushes are used on scrubbers that pre-sweep as they clean — the brush sweeps debris into the recovery path while scrubbing. We manufacture replacement rollers in nylon and PP bristle.",
      "Rollers are built to the original length, core diameter and drive-coupling pattern, so they mount without modification. Bristle stiffness can be specified for light, standard or heavy-duty cleaning.",
    ],
    faq: [
      {
        q: "What is the advantage of a cylindrical brush over a disc?",
        a: "A cylindrical brush sweeps and scrubs in one pass, so it handles debris-heavy floors without a separate pre-sweep. Disc brushes reach better into grout and uneven surfaces.",
      },
      {
        q: "How do I measure a roller brush?",
        a: "Measure the overall brush length, the core diameter, and note the drive coupling type at each end. Send these plus your machine model and we will confirm.",
      },
    ],
  },
  {
    slug: "side-brushes",
    subcategory: "Side Brush / 边刷",
    h1: "Floor Sweeper Side Brushes",
    breadcrumb: "Side Brushes",
    title: "Floor Sweeper Side Brushes | Replacement Brushes | Aikerui",
    description:
      "Replacement side brushes for floor sweepers and ride-on sweepers — flat and cup styles, nylon and PP, OEM fit. Factory direct.",
    intro: [
      "Side brushes sweep debris from edges and corners into the path of the main broom. We manufacture replacement side brushes for walk-behind and ride-on sweepers in both flat-disc and cup styles.",
      "Available in nylon for general sweeping and PP for abrasive outdoor surfaces, with the correct hub and clip pattern for common sweeper brands.",
    ],
    faq: [
      {
        q: "Flat or cup side brush — which do I need?",
        a: "Cup brushes suit flat indoor surfaces and throw debris inward efficiently; flat disc brushes are more tolerant of uneven outdoor ground. We can match either style.",
      },
      {
        q: "How long do side brushes last?",
        a: "Bristles typically wear out in 3-6 months in daily commercial use. Replace when they are splayed or shortened enough that debris is left behind.",
      },
    ],
  },
];
