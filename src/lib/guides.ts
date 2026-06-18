export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: "buying-guide" | "maintenance" | "comparison" | "troubleshooting";
  readTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  published: string;
  sections: GuideSection[];
  relatedProducts?: string[];
}

interface GuideSection {
  heading: string;
  content: string;
  items?: string[];
}

const guides: Guide[] = [
  {
    slug: "how-to-choose-a-floor-scrubber",
    title: "How to Choose a Floor Scrubber: Complete Buying Guide",
    description:
      "Learn how to select the right floor scrubber for your facility. Compare walk-behind vs ride-on, battery types, cleaning widths, and key specifications to make an informed decision.",
    category: "buying-guide",
    readTime: "8 min",
    difficulty: "beginner",
    published: "2026-06-01",
    sections: [
      {
        heading: "What Type of Floor Scrubber Do You Need?",
        content:
          "Floor scrubbers come in two main types: walk-behind and ride-on. Walk-behind scrubbers are ideal for small to medium facilities under 20,000 sq ft, offering maneuverability in tight spaces at a lower cost. Ride-on scrubbers are designed for large industrial spaces over 20,000 sq ft, allowing operators to clean more area in less time with reduced fatigue. For facilities with heavy debris, consider a sweeper-scrubber combination machine that can sweep and scrub in one pass.",
        items: [
          "Walk-behind: Best for 5,000–20,000 sq ft spaces, tight aisles, lower budget",
          "Ride-on: Best for 20,000+ sq ft, high productivity needs, operator comfort",
          "Sweeper-scrubber: Best for heavy debris environments, construction, warehouses",
        ],
      },
      {
        heading: "Key Specifications to Compare",
        content:
          "When comparing floor scrubbers, focus on the specifications that directly impact cleaning performance and efficiency. The cleaning width determines how much area you can cover per pass, while the tank sizes affect how long you can clean before needing to refill and empty.",
        items: [
          "Cleaning Width: 17–36 inches (walk-behind), 28–48 inches (ride-on)",
          "Solution Tank: 10–30 gallons determines runtime between refills",
          "Recovery Tank: Should match solution tank capacity",
          "Brush Speed: 150–300 RPM affects scrubbing effectiveness",
          "Battery Runtime: 3–5 hours typical, lithium options available",
          "Productivity: 20,000–70,000 sq ft/hour depending on model",
        ],
      },
      {
        heading: "Battery Type: Lead-Acid vs Lithium",
        content:
          "Battery choice significantly affects your total cost of ownership. Lead-acid batteries are cheaper upfront but require regular maintenance and have a shorter lifespan. Lithium batteries cost more initially but offer longer life, no maintenance, faster charging, and lighter weight. For facilities that run multiple shifts, lithium batteries with opportunity charging provide better productivity as they can be charged during breaks without memory effect.",
        items: [
          "Lead-Acid: Lower cost, 1–2 year lifespan, requires watering, 8-hour charge time",
          "Lithium: Higher cost, 3–5 year lifespan, no maintenance, 2–3 hour charge time",
          "Best for multi-shift: Lithium with opportunity charging capability",
        ],
      },
      {
        heading: "Matching the Machine to Your Floor Type",
        content:
          "Different floor types require different brush types and scrubber settings. Hard floors like tile, concrete, and epoxy need stiff brushes for effective cleaning. Polished or coated floors require softer brushes or pads to avoid damage. For facilities with multiple floor types, look for machines with adjustable brush pressure and easy pad/brush changeover.",
        items: [
          "Concrete/Epoxy: Medium to stiff brushes, high pressure settings",
          "Tile/Marble: Soft brushes or pads, medium pressure",
          "Wood/ laminate: Very soft brushes, low pressure, dry immediately",
          "Rubber/ sports floors: Specialized pads, low moisture",
        ],
      },
      {
        heading: "Total Cost of Ownership Considerations",
        content:
          "Beyond the purchase price, consider ongoing costs: replacement brushes and squeegees, battery replacement, maintenance parts, and operator training. A cheaper machine may cost more in the long run if it requires frequent repairs or consumes more water and cleaning solution. Factor in a 3–5 year total cost of ownership including parts, service, and consumables.",
      },
      {
        heading: "Why Choose Aikerui Floor Scrubbers?",
        content:
          "Aikerui offers a full range of walk-behind and ride-on scrubbers designed for global industrial applications. Our machines feature durable steel frames, reliable motor systems, and easy-to-service components. With CE certification, competitive pricing, and a 1-year warranty, Aikerui provides excellent value for distributors, rental companies, and facility managers worldwide. All machines come with detailed manuals and video support.",
      },
    ],
    relatedProducts: [
      "AK-560B",
      "AK-700LPG",
      "K500BT",
    ],
  },
  {
    slug: "walk-behind-vs-ride-on-scrubber",
    title: "Walk-Behind vs Ride-On Floor Scrubber: Which Is Better?",
    description:
      "A detailed comparison of walk-behind and ride-on floor scrubbers. Compare productivity, cost, operator experience, and find the right match for your facility size and cleaning needs.",
    category: "comparison",
    readTime: "6 min",
    difficulty: "beginner",
    published: "2026-06-01",
    sections: [
      {
        heading: "Walk-Behind Floor Scrubbers",
        content:
          "Walk-behind scrubbers are the most common type of floor scrubber for small to medium facilities. The operator walks behind the machine, guiding it across the floor. They are generally more affordable, easier to transport, and suitable for facilities with narrow aisles and multiple rooms.",
        items: [
          "Price Range: $3,000–$15,000",
          "Cleaning Width: 17–34 inches",
          "Productivity: 12,000–35,000 sq ft/hour",
          "Best For: Retail stores, restaurants, small warehouses, clinics",
          "Pros: Lower cost, maneuverable, easier to transport, simpler maintenance",
          "Cons: Operator fatigue over long shifts, slower coverage of large areas",
        ],
      },
      {
        heading: "Ride-On Floor Scrubbers",
        content:
          "Ride-on scrubbers allow the operator to sit or stand while cleaning, significantly reducing fatigue and increasing productivity. These machines are built for large facilities where cleaning efficiency and operator comfort are priorities. Most ride-on models offer larger tanks and wider cleaning paths.",
        items: [
          "Price Range: $12,000–$40,000+",
          "Cleaning Width: 28–50 inches",
          "Productivity: 25,000–80,000 sq ft/hour",
          "Best For: Warehouses, factories, airports, shopping malls, parking garages",
          "Pros: High productivity, operator comfort, larger tanks, better water recovery",
          "Cons: Higher cost, requires more space to maneuver, heavier, difficult to transport",
        ],
      },
      {
        heading: "Cost Comparison: Total Cost of Ownership",
        content:
          "While ride-on scrubbers have a higher upfront cost, they often provide better ROI for large facilities. A ride-on scrubber cleaning 50,000 sq ft per hour vs a walk-behind at 20,000 sq ft per hour means the ride-on pays for itself in labor savings over time. For facilities under 20,000 sq ft, a walk-behind is typically more cost-effective.",
      },
      {
        heading: "Decision Matrix",
        content:
          "Use this simple matrix to decide: if your facility is under 20,000 sq ft, has narrow aisles (under 5 ft wide), or requires cleaning across multiple floors, choose a walk-behind. If your facility is over 40,000 sq ft with wide aisles, operates on a single level, and you clean for 4+ hours per day, choose a ride-on. Between 20,000–40,000 sq ft, consider factors like budget, operator availability, and growth plans.",
      },
    ],
    relatedProducts: ["AK-560B", "AK-700LPG", "K500BT", "K300BT"],
  },
  {
    slug: "how-to-maintain-floor-scrubber-battery",
    title: "Floor Scrubber Battery Maintenance Guide",
    description:
      "Extend the life of your floor scrubber battery with proper maintenance. Step-by-step guide for lead-acid and lithium batteries, including charging, storage, and troubleshooting tips.",
    category: "maintenance",
    readTime: "5 min",
    difficulty: "beginner",
    published: "2026-06-01",
    sections: [
      {
        heading: "Lead-Acid Battery Maintenance",
        content:
          "Lead-acid batteries are the most common type in floor scrubbers. Proper maintenance can extend their life from 1 year to 2+ years. The key is regular watering, proper charging, and keeping terminals clean. Check water levels weekly and refill with distilled water only — never add acid. Charge after each use, and never leave the battery discharged for extended periods as sulfation will permanently reduce capacity.",
        items: [
          "Check water levels every 5–10 charging cycles",
          "Use ONLY distilled water, fill to 1/4 below fill well",
          "Charge after each use — never leave discharged",
          "Keep terminals clean and coated with anti-corrosion gel",
          "Equalize charge every 10–20 cycles for deep-cycle batteries",
        ],
      },
      {
        heading: "Lithium Battery Maintenance",
        content:
          "Lithium batteries require significantly less maintenance than lead-acid. They do not need watering, have no memory effect, and can be opportunity charged. However, they are more sensitive to extreme temperatures and require compatible chargers. Store lithium batteries at 50% charge if not used for extended periods, and avoid complete discharge.",
        items: [
          "No watering required — zero maintenance",
          "Use only the charger provided with the battery",
          "Avoid extreme temperatures: do not charge below 0°C / 32°F",
          "Opportunity charging is acceptable — no memory effect",
          "Store at 50% charge if not using for 30+ days",
        ],
      },
      {
        heading: "Charging Best Practices",
        content:
          "Proper charging habits significantly impact battery lifespan. For lead-acid batteries, always charge in a well-ventilated area as charging produces hydrogen gas. Never interrupt a charging cycle. For lithium batteries, the built-in battery management system (BMS) handles most safety functions, but using the wrong charger can permanently damage the battery.",
        items: [
          "Charge in a well-ventilated area (lead-acid produces hydrogen gas)",
          "Allow batteries to cool before charging if hot from use",
          "Replace charger if damaged — never use a modified charger",
          "For lead-acid: never interrupt a charge cycle",
          "For lithium: use only manufacturer-approved charger",
        ],
      },
      {
        heading: "Troubleshooting Common Battery Issues",
        content:
          "If your scrubber runs for less time than usual, check the battery voltage, water levels (lead-acid), and charging cycle. For lead-acid, sulfation from undercharging is the most common failure. For lithium, cell imbalance or BMS failure are more common but rare. A multimeter reading of less than 20V for a 24V system (below 10V per battery) indicates failed cells that need replacement.",
      },
    ],
    relatedProducts: ["K500BT", "K300BT", "AK-560B", "AK-700LPG"],
  },
];

export function getGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: Guide["category"]): Guide[] {
  return guides.filter((g) => g.category === category);
}

export const guideCategories = [
  { slug: "buying-guide" as const, label: "Buying Guides" },
  { slug: "maintenance" as const, label: "Maintenance" },
  { slug: "comparison" as const, label: "Comparisons" },
  { slug: "troubleshooting" as const, label: "Troubleshooting" }
,
  {
    slug: "how-to-set-up-your-floor-scrubber",
    title: "How to Set Up Your Floor Scrubber: Complete Installation Guide",
    description: "Step-by-step installation guide for Aikerui floor scrubbers. Learn how to unpack, assemble the squeegee, install brushes, connect the battery, and prepare your machine for first use.",
    category: "installation",
    readTime: "5 min",
    difficulty: "beginner",
    published: "2026-06-08",
    videoUrl: "https://youtube.com/shorts/pEDsME4b-98",
    sections: [
      { heading: "Unpacking and Initial Inspection", content: "When your Aikerui floor scrubber arrives, carefully inspect the packaging.", items: ["Inspect packaging for shipping damage before opening", "Verify all components against the packing list", "Check the machine model and serial number match your order"] },
      { heading: "Assembling the Squeegee", content: "The squeegee is critical for water recovery. Attach it to the mounting bracket at the rear of the machine.", items: ["Mount squeegee frame to the rear bracket", "Insert front blade (harder) and rear blade (softer)", "Adjust tilt angle to 45-degree for optimal contact"] },
      { heading: "Installing Brushes", content: "Install disc brushes or pad drivers depending on your floor type.", items: ["Turn off machine and raise brush deck", "Align brush with drive hub and twist until locked", "Lower deck and test at low speed"] },
      { heading: "Pre-Operation Checklist", content: "Before your first cleaning run, complete this checklist.", items: ["Fill solution tank with water", "Test all controls: drive, brush, squeegee", "Watch the installation video on YouTube for visual guidance"] },
    ],
    relatedProducts: ["K500BT", "A650T", "A380"],
  },
  {
    slug: "floor-scrubber-daily-operation-best-practices",
    title: "Floor Scrubber Daily Operation: Best Practices Guide",
    description: "Learn proper daily operation procedures for industrial floor scrubbers from pre-operation checks to cleaning techniques.",
    category: "maintenance",
    readTime: "6 min",
    difficulty: "beginner",
    published: "2026-06-08",
    videoUrl: "https://x.com/mark_xu71710/status/2062744516939919806",
    sections: [
      { heading: "Pre-Operation Daily Checks", content: "A thorough pre-operation check takes just 5 minutes but prevents costly downtime.", items: ["Battery charge: minimum 80%", "Brushes: check for wear", "Squeegee blades: inspect for nicks", "Solution tank: fill with water"] },
      { heading: "Proper Scrubbing Technique", content: "Overlap each pass by 4-6 inches to avoid streaks.", items: ["Overlap passes by 4-6 inches", "Slow down on heavily soiled areas", "Raise squeegee when turning", "Work from cleanest to dirtiest areas"] },
      { heading: "Post-Operation Maintenance", content: "After each shift, empty and rinse both tanks.", items: ["Empty and rinse both tanks", "Remove and rinse squeegee blades", "Wipe down machine body", "Charge lead-acid batteries immediately"] },
    ],
    relatedProducts: ["K500BT", "A500BT", "A1000"],
  },
  {
    slug: "a50-walk-behind-scrubber-features",
    title: "A50 Walk-Behind Floor Scrubber: Features and Capabilities",
    description: "Discover the key features of the Aikerui A50 walk-behind floor scrubber.",
    category: "product-showcase",
    readTime: "4 min",
    difficulty: "beginner",
    published: "2026-06-08",
    videoUrl: "https://x.com/mark_xu71710/status/2064637551541878998",
    sections: [
      { heading: "Compact Design", content: "The A50 is designed with a compact footprint of 1300x550x1100mm.", items: ["Dimensions: 1300x550x1100mm", "Cleaning width: 500mm", "Ideal for facilities under 10,000 sq ft"] },
      { heading: "Cleaning Performance", content: "The 550W brush motor delivers effective scrubbing on various floor types.", items: ["Brush motor: 550W", "Productivity: ~2,200 m²/hour", "Noise level: 65dB"] },
      { heading: "Battery and Runtime", content: "Powered by a 24V system with maintenance-free battery.", items: ["Voltage: 24V", "Runtime: 3-4 hours", "Charging time: 5-6 hours"] },
    ],
    relatedProducts: ["A50", "A380", "A330"],
  }
,
  {
    slug: "top-10-floor-scrubber-manufacturers-2026",
    title: "Top 10 Floor Scrubber Manufacturers in 2026 — Complete Comparison",
    description: "Compare the top 10 floor scrubber manufacturers in 2026. From global brands like Tennant and Karcher to factory-direct options like Aikerui. Find the best manufacturer for your needs.",
    category: "buying-guide",
    readTime: "10 min",
    difficulty: "beginner",
    published: "2026-06-17",
    sections: [
      {
        heading: "Introduction",
        content: "The floor scrubber market has grown significantly, with dozens of manufacturers competing globally. Choosing the right manufacturer is critical — it affects not just the purchase price but also spare parts availability, technical support, and long-term reliability. This guide compares the top 10 floor scrubber manufacturers in 2026 based on product quality, pricing, global reach, and customer reputation."
      },
      {
        heading: "How We Selected These Manufacturers",
        content: "We evaluated manufacturers based on five criteria: production capability (factory size and output), product range (walk-behind, ride-on, sweepers, parts), quality certifications (CE, ISO, SGS), global distribution network, and customer reviews across multiple markets. This list includes both well-known global brands and emerging factory-direct manufacturers."
      },
      {
        heading: "1. Tennant (USA)",
        content: "Tennant is widely regarded as the gold standard in industrial floor cleaning. Founded in 1870, the company has decades of experience and a massive dealer network worldwide. Their T7 and T300 models are industry benchmarks. Pros: excellent build quality, strong dealer network, innovative technology. Cons: premium pricing, expensive spare parts. Best for: facilities with large budgets that prioritize brand reliability."
      },
      {
        heading: "2. Karcher (Germany)",
        content: "Karcher is one of the largest cleaning equipment manufacturers globally, producing everything from pressure washers to industrial scrubbers. Their BD and BR series are popular in Europe. However, recent user reviews on platforms like Reddit indicate declining quality — with complaints about plastic components breaking and pad design issues. Pros: wide product range, global presence. Cons: quality concerns on newer models, parts can be expensive. Best for: buyers who need a well-known brand with local service."
      },
      {
        heading: "3. Nilfisk / Advance (Denmark)",
        content: "Nilfisk (parent company of Advance) is another European giant with a strong presence in North America. Their SC550 and SC600 models are popular in commercial settings. Pros: good dealer network, reliable mid-range machines. Cons: premium pricing, limited factory-direct options."
      },
      {
        heading: "4. Hako (Germany)",
        content: "Hako specializes in municipal and industrial cleaning equipment. Their machines are known for durability and German engineering. Pros: excellent build quality, strong in European markets. Cons: limited presence in North America and Asia, higher price point."
      },
      {
        heading: "5. Comac (Italy)",
        content: "Comac is an Italian manufacturer known for innovative designs and good value. Their machines are popular in Europe and increasingly in Asia. Pros: good design, competitive pricing. Cons: smaller dealer network compared to Tennant and Karcher."
      },
      {
        heading: "6. NSS Enterprises (USA)",
        content: "NSS manufactures floor cleaning equipment in Toledo, Ohio. They are known for robust, American-made machines. Their 2016DB model has a reputation as a workhorse. Pros: American-made, durable. Cons: limited technology features, smaller product range."
      },
      {
        heading: "7. Viper / Clarke (USA)",
        content: "Viper (owned by Nilfisk) and Clarke are established brands in the US market. The Clarke Boost is a popular 28-inch model valued for its productivity and large tank capacity. Pros: strong US dealer network, good parts availability. Cons: can be expensive, limited direct sales."
      },
      {
        heading: "8. IPC Gansow (Italy)",
        content: "IPC Gansow is another Italian manufacturer offering a wide range of scrubbers and sweepers. They have a strong presence in Europe and growing distribution in Asia. Pros: competitive pricing, diverse product line. Cons: limited presence in North America."
      },
      {
        heading: "9. Aikerui (China)",
        content: "Aikerui is a fast-growing Chinese manufacturer operating from a 10,000+ square meter factory in Hefei, Anhui. Unlike many Chinese suppliers, Aikerui owns and operates their own factory — they are not a trading company. They offer 30+ machine models and 360+ spare parts. Key advantages: factory-direct pricing (20-40% less than major brands), CE and ISO certifications, in-house R&D team, and direct WhatsApp/email support. They welcome factory visits and third-party inspections. Aikerui has exported to 50+ countries and serves distributors, rental companies, and facility managers worldwide. Best for: budget-conscious buyers who want quality machines at factory-direct prices."
      },
      {
        heading: "10. Minuteman / Ice (USA)",
        content: "Minuteman (now part of Ice) produces a range of floor cleaning equipment for the North American market. Their machines are known for simplicity and ease of maintenance. Pros: good value for money, easy to service. Cons: limited product range compared to top competitors, smaller dealer network."
      },
      {
        heading: "Manufacturer Comparison Table",
        content: "When comparing manufacturers, key factors include: factory ownership (trading company vs real manufacturer), pricing model (dealer/distributor vs factory direct), quality certifications, spare parts availability, and after-sales support. Factory-direct manufacturers like Aikerui offer significant cost advantages, while established brands like Tennant offer broader service networks. The best choice depends on your budget, location, and specific needs."
      },
      {
        heading: "How to Choose the Right Manufacturer",
        content: "Start by defining your requirements: facility size, floor type, cleaning frequency, and budget. For facilities under 20,000 sq ft, walk-behind models are sufficient. For larger facilities, ride-on scrubbers improve productivity. Consider total cost of ownership, not just purchase price — factor in spare parts, maintenance, and battery replacement over 3-5 years. Always request a factory video tour and ask for customer references before committing to a manufacturer."
      },
      {
        heading: "Conclusion",
        content: "The floor scrubber market offers options for every budget and requirement. Established global brands provide peace of mind but at a premium price. Factory-direct manufacturers offer significant savings but require more due diligence. For buyers who value transparency and cost savings, Aikerui offers a compelling combination of quality, factory-direct pricing, and responsive support. Whichever manufacturer you choose, always verify their credentials, request references, and inspect the product before purchasing."
      }
    ],
    relatedProducts: ["K500BT", "A650T", "K660", "A380"],
  }
];
