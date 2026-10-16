// 整机分类静态页配置（SEO 语义化目录）
// 把 /products?category=X（带参、权重传递差）升级为 /floor-scrubbers 这类顶层静态页
// 承接工业 B2B 大词：commercial floor scrubber / ride-on floor sweeper 等

export interface MachineCategoryDef {
  /** 顶层静态 URL slug（不含前导 /） */
  slug: string;
  /** products.json 里 category 的精确值（用于筛产品） */
  category: string;
  /**
   * 可选二级筛选：在同一 category 内按产品 slug 再过滤。
   * 用于 walk-behind / ride-on 这类「同一个 category、不同产品线」的子类页。
   * 不填则取该 category 下全部产品（原行为）。
   */
  slugFilter?: RegExp;
  /** 可选：父分类 slug。子类页面会显示「返回父类」链接，用于建立内链层级 */
  parentSlug?: string;
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
      "Commercial and industrial floor scrubbers built in our own factory — walk-behind and ride-on, 17\"-40\" decks, CE certified. Factory-direct B2B pricing.",
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
    // 子类页：与 /floor-scrubbers 共享 category，靠 slugFilter 分出 walk-behind 产品线
    // 目标词：walk behind floor scrubber (6,600/KD31/CPC$5.50)、walk behind automatic scrubber (4,400/KD21)、
    //         walk behind auto scrubber (1,600/KD20)、walk behind floor scrubber machine (1,600/KD17)
    // 差异化要点：不重复父页的"全系概览"，改写「空间受限场景 + 人工操作」这条线
    slug: "walk-behind-floor-scrubbers",
    category: "Floor Scrubbers",
    slugFilter: /^walk-behind-/,
    parentSlug: "floor-scrubbers",
    h1: "Walk-Behind Floor Scrubbers",
    breadcrumb: "Walk-Behind Scrubbers",
    title: "Walk-Behind Floor Scrubbers | Battery & Corded | Aikerui",
    description:
      "Walk-behind floor scrubbers for narrow aisles, ramps and obstacle-heavy floors — 17\"-24\" decks, battery or corded, CE certified. Factory-direct from our own plant.",
    intro: [
      "Walk-behind floor scrubbers are the right machine when a ride-on cannot physically get there. Narrow aisles, U-shaped racking, ramps, mezzanine access, lift doors and shop floors crowded with machinery all rule out a seated machine — a walk-behind still scrubs and dries the full width in one pass.",
      "The trade-off is productivity per hour, so the deciding numbers are deck width and tank size. Our walk-behind range runs from compact 17-inch units for back-of-house and retail, up to 24-inch battery machines that hold enough solution for a full shift without a refill stop.",
      "We build these on the same line as our ride-on machines, which means the disc brushes, squeegees and pad drivers you replace later come from the same factory — not from a third-party parts channel.",
    ],
    faq: [
      {
        q: "What floor area suits a walk-behind scrubber?",
        a: "As a working rule, walk-behind scrubbers are the better value below roughly 2,000 sqm of cleanable area, or wherever the layout prevents a ride-on from manoeuvring. Above that, a ride-on usually pays for itself through labour hours saved.",
      },
      {
        q: "Battery or corded walk-behind scrubber?",
        a: "Corded units cost less up front and suit fixed routes near a power point. Battery models remove the trip hazard and cable management entirely, which is why most commercial buyers choose battery for anything above occasional use. We supply both lead-acid and lithium variants.",
      },
      {
        q: "How wide are your walk-behind scrubber decks?",
        a: "Our walk-behind models cover 17 to 24 inch working widths. Narrower decks fit tight aisles and doorways; wider decks cut the number of passes on open shop floors. Tell us your aisle width and we will match the model.",
      },
      {
        q: "Can a walk-behind scrubber climb a ramp?",
        a: "Traction is the limiting factor rather than power. For ramps and dock levellers we recommend the drive-assisted models, and we will ask for the gradient so we can confirm the specification before quoting.",
      },
    ],
  },
  {
    // 子类页：同上，分出 ride-on 产品线
    // 目标词：ride on floor scrubber (2,900/KD13/CPC$5.62)、ride-on floor scrubber (260/KD14)、
    //         ride on floor scrubber machine (390/KD20)、industrial ride on floor scrubber (110/KD17)
    // 差异化要点：主打「大面积效率 + 单位时间成本」，与父页概览和 walk-behind 页互补
    slug: "ride-on-floor-scrubbers",
    category: "Floor Scrubbers",
    slugFilter: /^ride-on-/,
    parentSlug: "floor-scrubbers",
    h1: "Ride-On Floor Scrubbers",
    breadcrumb: "Ride-On Scrubbers",
    title: "Ride-On Floor Scrubbers | Industrial Scrubber Machines",
    description:
      "Ride-on floor scrubbers for warehouses, logistics centres and large retail floors — 28\"-40\" decks, 3,000-6,000 sqm/h, CE certified. Factory-direct B2B pricing.",
    intro: [
      "A ride-on floor scrubber is bought for throughput, not for the specification sheet. Once cleanable area passes roughly 2,000-3,000 sqm, the labour cost of walking a machine behind you overtakes the price difference, and a seated machine typically covers 3,000 to 6,000 sqm per hour against a fraction of that for a walk-behind.",
      "That changes what matters in the specification: larger solution and recovery tanks to avoid dump-and-refill stops, wider decks to reduce pass count, and a serviceability layout that lets one operator keep the machine running across a shift. We build ride-on scrubbers for warehouses, distribution centres, airports, supermarkets and factory floors.",
      "OEM branding, private label and fleet configurations are available on volume orders, with spare brushes, squeegees and pad drivers supplied from the same production line.",
    ],
    faq: [
      {
        q: "How much area can a ride-on floor scrubber clean per hour?",
        a: "Typically 3,000-6,000 sqm per hour depending on deck width, travel speed and the number of dump-and-refill stops. On large open floors the practical limit is usually tank capacity rather than the machine's speed.",
      },
      {
        q: "At what floor size does a ride-on become worth it?",
        a: "The economics usually flip somewhere between 2,000 and 3,000 sqm of regularly cleaned area. Below that a walk-behind is generally the better buy; above it, the operator hours saved by not walking behind the machine exceed the price difference fairly quickly.",
      },
      {
        q: "What deck widths do your ride-on scrubbers come in?",
        a: "Our ride-on range runs from compact machines around 28 inch up to 40 inch decks for wide-aisle warehouses. Deck width is the biggest single lever on productivity, so we size it against your aisle width and racking layout.",
      },
      {
        q: "Do ride-on scrubbers work on rough or uneven concrete?",
        a: "Yes, with the right brush and squeegee setup. Industrial concrete with expansion joints and uneven patches needs a more compliant squeegee and often a heavier brush pressure, which is why we ask about surface condition before recommending a model.",
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
