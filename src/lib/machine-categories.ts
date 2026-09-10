// 整机分类静态页配置（SEO 语义化目录）
// 把 /products?category=X（带参、权重传递差）升级为 /floor-scrubbers 这类顶层静态页
// 承接工业 B2B 大词：commercial floor scrubber / ride-on floor sweeper 等

export interface MachineCategoryDef {
  /** 顶层静态 URL slug（不含前导 /） */
  slug: string;
  /** products.json 里 category 的精确值（用于筛产品） */
  category: string;
  /** 页面 H1 */
  h1: string;
  /** 面包屑名称 */
  breadcrumb: string;
  /** SEO title（<=60 字符） */
  title: string;
  /** meta description */
  description: string;
  /** 内页介绍段 */
  intro: string[];
  /** 页面 FAQ */
  faq: { q: string; a: string }[];
}

export const MACHINE_CATEGORIES: MachineCategoryDef[] = [
  {
    slug: "floor-scrubbers",
    category: "Floor Scrubbers",
    h1: "Industrial Floor Scrubbers",
    breadcrumb: "Floor Scrubbers",
    title: "Industrial Floor Scrubbers | Walk-Behind & Ride-On | Aikerui",
    description:
      "Commercial and industrial floor scrubbers built in our own factory — walk-behind and ride-on models, 17\"-40\" decks, CE certified. Factory-direct B2B pricing, OEM available.",
    intro: [
      "Aikerui manufactures industrial floor scrubbers for warehouses, factories, supermarkets, airports and commercial facilities. Our range covers walk-behind scrubbers for tight areas through to ride-on machines for large open floors, with working widths from 17 to 40 inches.",
      "Every machine is built in our own factory in Anhui, China and ships CE certified. We supply distributors, importers and facility-service companies with factory-direct pricing, OEM branding and spare-part support from the same production line.",
    ],
    faq: [
      {
        q: "Walk-behind or ride-on — which scrubber do I need?",
        a: "Walk-behind scrubbers suit floors under roughly 2,000 sqm and areas with obstacles, aisles or ramps. Ride-on scrubbers are more productive above that, covering 3,000-6,000 sqm per hour, and are the usual choice for warehouses and large retail floors.",
      },
      {
        q: "What is the difference between a scrubber and a sweeper?",
        a: "A scrubber applies solution, scrubs and vacuums up the dirty water, so it cleans and leaves the floor dry. A sweeper only collects dry debris. For mixed environments, a scrubber-sweeper combination machine does both.",
      },
      {
        q: "Do you provide spare parts and brushes after purchase?",
        a: "Yes. We manufacture the brushes and consumables in the same factory, so replacement disc brushes, squeegee blades and pad holders are available directly — usually at a lower cost than third-party parts.",
      },
      {
        q: "What is the MOQ and lead time for scrubbers?",
        a: "For stock models, MOQ is typically 1 unit for sample evaluation and 5+ units for wholesale pricing. Lead time is 15-30 days depending on model and customization.",
      },
    ],
  },
  {
    slug: "floor-sweepers",
    category: "Floor Sweepers",
    h1: "Industrial Floor Sweepers",
    breadcrumb: "Floor Sweepers",
    title: "Industrial Floor Sweepers | Ride-On & Walk-Behind | Aikerui",
    description:
      "Ride-on and walk-behind industrial floor sweepers for warehouses, parking lots and factories. Factory-direct B2B pricing, CE certified.",
    intro: [
      "Our industrial floor sweepers handle dry debris — dust, packaging, grit and light rubbish — on warehouse floors, loading docks, parking areas and factory aisles. The range includes walk-behind models for aisles and ride-on sweepers for large open areas.",
      "Machines are built with main broom and side-brush systems, dust filtration and a hopper sized for high-volume picking. We manufacture the side brushes and main brooms in-house, so consumables are available as long-term replacements.",
    ],
    faq: [
      {
        q: "How much area can a ride-on floor sweeper cover?",
        a: "A typical ride-on sweeper covers roughly 8,000-20,000 sqm per hour depending on working width and speed, which is why they are standard in warehouses and large logistics facilities.",
      },
      {
        q: "Can a sweeper be used outdoors?",
        a: "Yes, with the right broom type. Outdoor sweeping usually needs a stiffer or more abrasive bristle to handle grit and uneven surfaces — we supply both indoor nylon and outdoor-grade brushes.",
      },
      {
        q: "Do you offer OEM branding for sweepers?",
        a: "Yes. We can apply your brand, colour scheme and specification sheet for volume orders, with the same production line used for our own models.",
      },
    ],
  },
  {
    slug: "carpet-extractors",
    category: "Carpet Extractor Washers",
    h1: "Carpet Extractor Washers",
    breadcrumb: "Carpet Extractors",
    title: "Carpet Extractor Washers | Commercial Cleaners | Aikerui",
    description:
      "Commercial carpet extractor washers for deep cleaning carpet, rugs and upholstery in hotels, offices and retail. Factory direct B2B pricing, OEM available.",
    intro: [
      "Carpet extractor washers spray solution into the carpet pile, agitate it and vacuum the dirty water back out — the deepest of the standard carpet cleaning methods. We supply extractors for hotels, offices, showrooms and contract cleaning companies.",
      "Available in walk-behind and portable formats, with heated or cold-water variants, fresh-water and recovery tanks sized for commercial duty cycles.",
    ],
    faq: [
      {
        q: "How is an extractor different from a scrubber?",
        a: "A scrubber is designed for hard floors and uses a disc brush plus squeegee. An extractor is built for carpet — it uses a spray jet and suction wand or brush head to pull water out of the pile.",
      },
      {
        q: "What areas are carpet extractors used in?",
        a: "Hotels and guest corridors, offices, conference venues, car showrooms, retail and contract cleaning. Anywhere fitted carpet needs periodic deep extraction.",
      },
    ],
  },
  {
    slug: "dust-carts",
    category: "Dust-pushing carts",
    h1: "Industrial Dust Collection Carts",
    breadcrumb: "Dust Carts",
    title: "Industrial Dust Collection Carts & Trolleys | Aikerui",
    description:
      "Industrial dust collection carts and waste trolleys for factories and warehouses — heavy-duty steel construction, swivel casters, factory direct pricing.",
    intro: [
      "Dust collection carts and trolleys move collected waste and debris around a facility without lifting. We supply heavy-duty steel and industrial plastic carts sized for factory, warehouse and janitorial use.",
      "Models include swivel-caster trolleys, tilt-and-empty carts and larger collection bins, with optional liners and lids.",
    ],
    faq: [
      {
        q: "What load do your dust carts handle?",
        a: "Standard industrial carts are rated from around 100 kg up to 500 kg depending on the model and caster specification. Tell us your load and floor type and we will recommend the right one.",
      },
      {
        q: "Are spare parts available?",
        a: "Yes — casters, wheels, handles and lids are all supplied as replacements.",
      },
    ],
  },
];
