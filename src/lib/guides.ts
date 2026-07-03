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
  },
  // ── Troubleshooting Guides ──
  {
    slug: "squeegee-not-picking-up-water",
    title: "Floor Scrubber Squeegee Not Picking Up Water? Fix It in 10 Minutes",
    description:
      "Is your floor scrubber leaving puddles? Diagnose and fix squeegee problems — worn blades, incorrect angle, clogged vacuum hose. Step-by-step troubleshooting for all brands.",
    category: "troubleshooting",
    readTime: "5 min",
    difficulty: "beginner",
    published: "2026-06-26",
    sections: [
      {
        heading: "Symptom: Clean Water Left on Floor After Scrubbing",
        content:
          "When your floor scrubber leaves puddles or streaks of dirty water behind, the problem is almost always in the squeegee system. The squeegee assembly is responsible for directing water toward the vacuum pickup, and any issue in this chain results in poor water recovery.",
      },
      {
        heading: "Step 1: Check the Squeegee Blades for Wear",
        content:
          "The squeegee blades are the most common wear item. Run your finger along the edge of both the front and rear rubber blades. A sharp, square edge means the blade is in good condition. If the edge is rounded, rippled, or has visible cracks, the blade needs to be replaced.",
        items: [
          "Front blade: scrapes large debris and guides water toward the rear blade",
          "Rear blade: wipes the floor clean — this is the critical one",
          "Replace when: edge is rounded (no longer square), blade is less than 5mm thick at the edge, or visible tears/cracks",
          "Pro tip: Most squeegee blades can be rotated (turned over) once before replacement, doubling lifespan",
        ],
      },
      {
        heading: "Step 2: Adjust Squeegee Angle and Height",
        content:
          "The squeegee assembly must be level and at the correct angle. If tilted forward or backward, it won't make proper contact with the floor. Loosen the adjustment knob, lower the squeegee until both ends contact the floor evenly, then tighten. The rear blade should deflect slightly (about 2-3mm) when in contact with the floor.",
        items: [
          "Check: both sides are equal height — an uneven squeegee leaves stripes",
          "Check: the assembly is centered on the machine — not pushed to one side",
          "Check: the squeegee mount is not bent or damaged (common after hitting obstacles)",
        ],
      },
      {
        heading: "Step 3: Clear the Vacuum Hose",
        content:
          "A clogged vacuum hose is the second most common cause of poor water pickup. Disconnect the hose from the squeegee and the recovery tank. Check for debris, dried sludge, or small objects that may have been sucked up. Flush the hose with warm water. In cold climates, check for ice blockage.",
        items: [
          "Inspect both ends of the hose for cracks or loose connections",
          "Check the recovery tank filter/screen — if clogged, vacuum airflow is reduced",
          "Check the tank lid gasket — air leaks here reduce suction",
        ],
      },
      {
        heading: "Step 4: Clean the Recovery Tank Drain",
        content:
          "If the recovery tank drain valve or hose is partially clogged, water backs up in the tank and overflows onto the floor. Clean the drain thoroughly and check the tank for sludge buildup. A full tank should be emptied when 80% capacity is reached — do not wait until it overflows.",
      },
    ],
    relatedProducts: [],
  },
  {
    slug: "brush-motor-not-spinning",
    title: "Floor Scrubber Brush Not Spinning? Complete Diagnostic Guide",
    description:
      "Brush motor won't start or makes grinding noise? Diagnose belt drive, electrical, and deck clearance issues. Troubleshooting guide for walk-behind and ride-on scrubbers.",
    category: "troubleshooting",
    readTime: "6 min",
    difficulty: "intermediate",
    published: "2026-06-26",
    sections: [
      {
        heading: "Symptom: Brush Deck Motor Not Engaging",
        content:
          "The brush motor spins the main disc brush or roller brush that scrubs the floor. When it fails to engage, the machine moves but doesn't actually clean. Common causes range from simple operator errors to motor failure. Work through these steps in order — most fixes are quick and don't require a technician.",
      },
      {
        heading: "Step 1: Check the Brush Engage Lever / Button",
        content:
          "On walk-behind machines, the brush motor typically activates via a lever on the control handle. On ride-on models, it's a pedal or dashboard switch. Verify the mechanical linkage is intact — a disconnected cable or broken switch will prevent motor activation even if the electronics are fine.",
        items: [
          "Walk-behind: check the squeeze lever is fully engaged and returns smoothly",
          "Ride-on: check the foot pedal switch is not stuck or obstructed",
          "Listen: when you engage the brush, you should hear a 'click' (relay) even if the motor doesn't spin",
        ],
      },
      {
        heading: "Step 2: Check Brush Deck Clearance",
        content:
          "If the brush is pressed too hard against the floor or caught on an obstacle, the motor's overload protection will cut power to prevent damage. Raise the brush deck using the lift pedal/lever and try again. Inspect the area around the brush for debris, tangled string, or plastic wrap that may be binding the brush.",
        items: [
          "Remove the brush/pad holder and check for foreign objects wrapped around the drive hub",
          "Check that the brush or pad driver is properly seated and centered",
          "Try spinning the brush by hand — it should rotate freely with slight resistance",
        ],
      },
      {
        heading: "Step 3: Inspect the Drive Belt (Belt-Drive Machines)",
        content:
          "Many scrubbers use a belt to transfer power from the motor to the brush deck. A broken, loose, or slipped belt is the most common mechanical failure. Access the belt cover (usually on top of the brush deck), remove it, and check belt condition.",
        items: [
          "Broken belt: replace with identical OEM specification (length and tooth count)",
          "Loose belt: tighten using the tensioner adjustment — belt should deflect about 10mm when pressed",
          "Worn belt: if glazed, cracked, or missing teeth — replace immediately",
        ],
      },
      {
        heading: "Step 4: Check the Motor Overload / Circuit Breaker",
        content:
          "If the motor hums but doesn't spin, or stops suddenly during operation, the thermal overload protector may have tripped. This is a safety feature, not a defect. Allow the motor to cool for 10-15 minutes and try again. If it trips repeatedly with no obvious cause, the motor may be drawing excessive current due to worn bearings or an electrical fault.",
        items: [
          "Locate the circuit breaker or overload reset button — typically on the control panel",
          "Press to reset — a firm click confirms reset",
          "If it trips immediately: disconnect power and check for shorted wiring or seized motor bearings",
        ],
      },
    ],
    relatedProducts: [],
  },
  {
    slug: "battery-not-charging-short-runtime",
    title: "Floor Scrubber Battery Not Charging or Short Runtime? Full Troubleshooting Guide",
    description:
      "Scrubber battery dies quickly or won't charge? Diagnose charger issues, battery cell failure, and parasitic drain. Covers lead-acid and lithium battery troubleshooting.",
    category: "troubleshooting",
    readTime: "7 min",
    difficulty: "intermediate",
    published: "2026-06-26",
    sections: [
      {
        heading: "Symptom: Battery Won't Hold a Charge",
        content:
          "Battery problems are the most frustrating and expensive scrubber issues. A machine that dies after 30 minutes instead of the expected 3-4 hours, or one that won't charge at all, can halt operations. The problem could be the charger, the batteries, or the machine's electrical system.",
      },
      {
        heading: "Step 1: Test the Charger Output",
        content:
          "Before assuming the batteries are bad, verify the charger is working. Plug in the charger (not connected to the machine) and use a multimeter to check output voltage at the connector. For a 24V system, the charger should output 28-30V. For 36V, expect 42-44V. If output is zero or significantly low, the charger is faulty.",
        items: [
          "Check the charger fuse — many chargers have an internal fuse that blows",
          "Check the AC power cord for damage, especially near the plug",
          "Some smart chargers won't output voltage unless connected to a battery (safety feature)",
        ],
      },
      {
        heading: "Step 2: Check Individual Battery Voltage",
        content:
          "Most industrial scrubbers use multiple 6V or 12V batteries wired in series. A single bad battery in the series reduces the entire pack's performance. Disconnect the batteries and measure each one individually with a multimeter.",
        items: [
          "6V battery: should read 6.2-6.4V when fully charged, below 5.8V is suspect",
          "12V battery: should read 12.6-12.8V fully charged, below 12.0V is suspect",
          "If one battery reads significantly lower than others: replace that one first",
          "Load test: a battery may show good voltage but drop sharply under load — needs replacement",
        ],
      },
      {
        heading: "Step 3: Check for Parasitic Drain",
        content:
          "If the batteries charge fully but drain quickly even when the machine is off, something is drawing power continuously. Disconnect the negative battery cable and place a multimeter (in current/amp mode) between the cable and battery terminal. Any reading above 50mA indicates parasitic drain.",
        items: [
          "Common drains: dashboard displays, hour meters, GPS trackers — some are normal",
          "Check for: stuck relays, shorted wiring, corroded terminals creating resistance",
          "Battery disconnect switch: install one to isolate batteries during storage (highly recommended)",
        ],
      },
      {
        heading: "Step 4: Battery Maintenance Best Practices",
        content:
          "For lead-acid batteries, proper maintenance dramatically extends life. Check water levels monthly and top up with distilled water (never tap water) to just above the plates. Keep terminals clean and tight — corroded connections cause voltage drop and heat buildup. For lithium batteries, avoid deep discharge — recharge when the indicator shows 20% remaining.",
        items: [
          "Lead-acid: water check monthly, equalization charge every 3 months, terminal cleaning",
          "Lithium: no maintenance required, but avoid storing at 100% charge for extended periods",
          "Storage: store at 50-60% charge in cool, dry location — never leave fully discharged",
          "Lifespan: lead-acid 1-3 years, lithium 3-5 years with proper use",
        ],
      },
    ],
    relatedProducts: [],
  },
  {
    slug: "scrubber-leaving-streaks-on-floor",
    title: "Floor Scrubber Leaving Streaks? 7 Causes and Quick Fixes",
    description:
      "Why your floor scrubber leaves dirty streaks or swirl marks. Fix brush pressure, solution flow, dirty pads, and pad centering issues. Get streak-free floors in minutes.",
    category: "troubleshooting",
    readTime: "5 min",
    difficulty: "beginner",
    published: "2026-06-26",
    sections: [
      {
        heading: "Symptom: Streaks or Swirl Marks After Cleaning",
        content:
          "Nothing is more frustrating than running a floor scrubber across a floor only to see dirty streaks or swirl marks left behind. Streaks are usually caused by issues in the brush/pad system or the squeegee, and most can be fixed without tools.",
      },
      {
        heading: "Cause 1: Dirty or Over-Saturated Pad/Brush",
        content:
          "A pad or brush that's loaded with dirt and soap residue will smear rather than scrub. If you're seeing dirty streaks, remove the pad and check it. A pad that's black, heavily matted, or dripping with dirty water needs to be cleaned or replaced. Never scrub with yesterday's dirty pad.",
      },
      {
        heading: "Cause 2: Incorrect Solution Flow Rate",
        content:
          "Too much cleaning solution can leave streaks because the squeegee can't recover all the water. Too little solution means the brush is scrubbing dry, spreading dirt instead of suspending it. Adjust the solution flow valve — start at 50% and increase until the floor is evenly wet behind the machine, then back off slightly.",
      },
      {
        heading: "Cause 3: Centering Ring / Pad Driver Off-Center",
        content:
          "If the pad or brush isn't centered on the drive plate, it wobbles and creates uneven pressure, leading to swirl marks. Remove the pad, clean the centering ring, and re-install ensuring it snaps into place securely. A bent centering ring must be replaced.",
      },
      {
        heading: "Cause 4: Worn or Cracked Squeegee Blade",
        content:
          "Even if water pickup seems 'okay,' a squeegee blade with micro-cracks leaves thin streaks. Check the rear blade edge under good light — any nicks, cracks, or unevenness will leave streaks exactly where the damage is. Rotate or replace the blade.",
      },
      {
        heading: "Cause 5: Dirty Squeegee Assembly",
        content:
          "Debris caught between the squeegee blades acts like a dam, letting water leak past unevenly. Remove the squeegee assembly, separate the blades, clean between them, and re-assemble. Pay special attention to the corners where debris accumulates.",
      },
      {
        heading: "Cause 6: Machine Speed Too High",
        content:
          "Walking too fast or driving the ride-on scrubber at full speed reduces the time the squeegee has to recover water, leaving a trail. On heavily soiled floors, reduce speed to 50-60% of maximum. Clean passes should overlap by 2-3 inches.",
      },
      {
        heading: "Cause 7: Wrong Cleaning Solution or Concentration",
        content:
          "Using the wrong chemical or too much detergent creates excessive foam and residue. Foam in the recovery tank reduces vacuum efficiency. Use manufacturer-recommended neutral floor cleaner at the correct dilution ratio. If you see foam, reduce detergent concentration by 50%.",
      },
    ],
    relatedProducts: [],
  },
  {
    slug: "water-solution-not-dispensing",
    title: "Floor Scrubber Not Dispensing Water? Diagnose and Fix in 15 Minutes",
    description:
      "Solution not reaching the brush? Troubleshoot clogged filter, failed solenoid valve, kinked hose, and pump issues. Step-by-step diagnostic with multimeter testing instructions.",
    category: "troubleshooting",
    readTime: "6 min",
    difficulty: "intermediate",
    published: "2026-06-26",
    sections: [
      {
        heading: "Symptom: No Water / Solution Coming Out of the Brush Deck",
        content:
          "When you engage the scrub function but no water or cleaning solution reaches the floor, the machine is just a dry sweeper. The solution delivery system has several components that can fail individually — most fixes are simple and don't require a technician.",
      },
      {
        heading: "Step 1: Check the Solution Tank — Is It Empty?",
        content:
          "It sounds obvious, but the solution level indicator is often unreliable. Open the fill cap and visually check that the tank has solution. If the tank has a float level sensor, verify it moves freely and isn't stuck in the 'full' position (falsely indicating liquid).",
      },
      {
        heading: "Step 2: Clean the Solution Filter",
        content:
          "Every scrubber has an inline solution filter between the tank and the solenoid valve. If it's clogged with debris, scale, or chemical residue, no water passes through. Unscrew the filter housing (turn off the solution valve first), remove the screen, and rinse with warm water.",
        items: [
          "Filter location: follow the hose from the solution tank — it's the first component",
          "Clean: remove screen, rinse under running water, reinstall",
          "If the screen is torn or missing: replace — debris will now clog the solenoid valve",
        ],
      },
      {
        heading: "Step 3: Check the Solenoid Valve",
        content:
          "The solenoid valve is an electrically operated water valve that opens when you engage the scrub function. Listen for a 'click' when you press the solution button — no click means no power to the solenoid. If you hear the click but no water flows, the valve may be stuck closed.",
        items: [
          "Test with multimeter: 12-24V should be present at the solenoid connector when activated",
          "If voltage present but no click: replace solenoid",
          "If no voltage: check the solution switch and wiring",
          "Manual test: apply 12V directly from a spare battery to test (briefly!)",
        ],
      },
      {
        heading: "Step 4: Inspect the Hose for Kinks or Blockage",
        content:
          "A kinked or collapsed hose between the tank and the brush deck stops water flow. Trace the entire hose path from tank to deck, looking for sharp bends, pinch points, or areas where the hose may have been crushed during maintenance. Disconnect both ends and try blowing through the hose.",
      },
      {
        heading: "Step 5: Check the Solution Pump (If Equipped)",
        content:
          "Some scrubbers use a pump instead of (or in addition to) gravity feed. If your machine has a pump, verify it runs when the solution is activated. A pump that runs but delivers no water may have a clogged inlet or failed impeller.",
        items: [
          "Listen: pump should hum when activated — no sound = electrical issue",
          "Check pump inlet: disconnect and clean the strainer",
          "Pump outlet: disconnect and check for water flow when pump runs",
        ],
      },
    ],
    relatedProducts: [],
  },
  // ── Comparison Guides ──
  {
    slug: "walk-behind-vs-ride-on-scrubber",
    title: "Walk-Behind vs Ride-On Floor Scrubber: Which One Does Your Facility Need?",
    description:
      "Compare walk-behind and ride-on floor scrubbers by cost, productivity, maneuverability, and best use cases. Detailed comparison table and decision guide for facility managers.",
    category: "comparison",
    readTime: "6 min",
    difficulty: "beginner",
    published: "2026-06-26",
    sections: [
      {
        heading: "The Core Difference",
        content:
          "The most fundamental choice when buying a floor scrubber is walk-behind versus ride-on. A walk-behind machine is pushed by an operator walking behind it, while a ride-on machine has a seat and steering wheel for the operator. The right choice depends on your facility size, aisle width, budget, and cleaning frequency.",
      },
      {
        heading: "Comparison Table",
        content: "Here is a head-to-head comparison of the key factors:",
        items: [
          "Cost: Walk-behind $3,000-$6,000 | Ride-on $8,000-$25,000+",
          "Productivity: Walk-behind 15,000-35,000 sq ft/hr | Ride-on 30,000-80,000+ sq ft/hr",
          "Cleaning Width: Walk-behind 17-28 inches | Ride-on 28-50+ inches",
          "Maneuverability: Walk-behind excellent in tight spaces | Ride-on requires wider aisles (36+ inches)",
          "Operator Fatigue: Walk-behind moderate after 4+ hours | Ride-on minimal",
          "Training Required: Walk-behind 30 minutes | Ride-on 1-2 hours",
          "Battery Runtime: Walk-behind 3-4 hours | Ride-on 3-5 hours (larger batteries)",
          "Maintenance Cost: Walk-behind lower (fewer components) | Ride-on moderate",
        ],
      },
      {
        heading: "Choose Walk-Behind If…",
        content:
          "Your facility is under 20,000 sq ft, has narrow aisles (less than 36 inches), or you clean multiple small areas on different floors. Walk-behind scrubbers are also ideal for businesses with a lower initial budget or those that need to move the machine between buildings. Their compact size makes storage and transport easier.",
      },
      {
        heading: "Choose Ride-On If…",
        content:
          "Your facility is over 30,000 sq ft, has primarily open areas with wide aisles, and you clean daily for extended periods. The 2-3x productivity gain of a ride-on scrubber pays for itself in labor savings within the first year for large facilities. Ride-on machines also offer better ergonomics for operators who clean 6+ hours per day.",
      },
      {
        heading: "The Hybrid Option: Stand-On Scrubbers",
        content:
          "Some manufacturers offer a 'stand-on' scrubber that splits the difference — the operator stands on a rear platform rather than sitting. These combine the maneuverability of a walk-behind with the speed of a ride-on, and are increasingly popular for medium-sized facilities. However, they are less common and may have fewer options for attachments and accessories.",
      },
    ],
    relatedProducts: ["K500BT", "A660T", "RS32", "K660"],
  },
  {
    slug: "disc-brush-vs-roller-brush-scrubber",
    title: "Disc Brush vs Roller Brush Scrubber: Complete Performance Comparison",
    description:
      "Disc brush or roller brush for your floor scrubber? Compare cleaning performance, floor type compatibility, maintenance cost, and best applications with detailed comparison table.",
    category: "comparison",
    readTime: "5 min",
    difficulty: "beginner",
    published: "2026-06-26",
    sections: [
      {
        heading: "Two Different Cleaning Mechanisms",
        content:
          "Disc brush scrubbers use flat round brushes or pads that rotate horizontally against the floor. Roller brush (also called cylindrical brush) scrubbers use one or two horizontal rollers that spin vertically, picking up debris and scrubbing simultaneously. Each design has distinct advantages depending on your floor type and cleaning needs.",
      },
      {
        heading: "Disc Brush — Best for Smooth, Even Floors",
        content:
          "Disc brushes excel on smooth surfaces like sealed concrete, polished tile, epoxy, and vinyl. The flat rotating motion provides even pressure distribution for consistent scrubbing. Disc brushes are also easier to change and offer more material options (nylon, PPL, steel-wire mix), making them versatile for different soil types. However, they struggle on uneven surfaces because contact is limited to the flat plane of the brush.",
        items: [
          "Best for: supermarkets, hospitals, schools, offices, retail",
          "Advantages: even pressure, easy pad changes, many material options",
          "Limitations: struggles on grouted tile and uneven floors",
        ],
      },
      {
        heading: "Roller Brush — Best for Textured or Uneven Floors",
        content:
          "Roller brushes can reach into grout lines, textured surfaces, and slight floor unevenness because the roller's bristles penetrate into surface irregularities. The rotating action also helps pick up small debris while scrubbing, reducing the need for pre-sweeping. Roller scrubbers are the preferred choice for ceramic tile with grout, safety flooring with texture, and older concrete with surface variations.",
        items: [
          "Best for: factories, warehouses, kitchens, loading docks, outdoor areas",
          "Advantages: cleans grout lines, picks up debris, handles uneven surfaces",
          "Limitations: higher brush cost, more complex brush changes",
        ],
      },
      {
        heading: "Maintenance Cost Comparison",
        content:
          "Disc brushes and pads are generally cheaper to replace than roller brushes — typically $30-80 per disc brush versus $150-400 per roller brush. However, roller brushes often last longer on rough floors because the wear is distributed across a larger surface. For most smooth-floor facilities, disc brushes offer the lowest ongoing consumable cost. For textured floors where disc brushes wear quickly, roller brushes are more economical in the long run.",
      },
    ],
    relatedProducts: ["K500BT", "A660T"],
  },
  {
    slug: "lead-acid-vs-lithium-battery-scrubber",
    title: "Lead-Acid vs Lithium Battery Floor Scrubber: 5-Year Cost Comparison",
    description:
      "Should you choose lead-acid or lithium batteries for your floor scrubber? Compare upfront cost, lifespan, maintenance, charge time, and total cost of ownership over 5 years.",
    category: "comparison",
    readTime: "5 min",
    difficulty: "beginner",
    published: "2026-06-26",
    sections: [
      {
        heading: "Why Battery Choice Matters",
        content:
          "The battery system is the heart of any cordless floor scrubber. It determines runtime, maintenance requirements, lifespan, and a significant portion of the total cost of ownership. Choosing the wrong battery type can double your operating costs over 5 years.",
      },
      {
        heading: "Detailed Comparison",
        content: "A side-by-side evaluation of lead-acid versus lithium battery systems:",
        items: [
          "Upfront Cost (24V system): Lead-Acid $400-800 | Lithium $1,200-2,400",
          "Lifespan: Lead-Acid 1-3 years (300-500 cycles) | Lithium 3-5 years (1,500-2,000 cycles)",
          "Charge Time: Lead-Acid 8-10 hours | Lithium 2-3 hours (full), 1 hour (80%)",
          "Maintenance: Lead-Acid monthly watering + terminal cleaning | Lithium none required",
          "Weight: Lead-Acid 2-3x heavier than equivalent lithium",
          "Opportunity Charging: Lead-Acid no (memory effect) | Lithium yes (charge during breaks)",
          "Temperature Range: Lead-Acid -20°C to 50°C | Lithium 0°C to 45°C (reduced below 5°C)",
          "Recycling: Lead-Acid 98% recyclable | Lithium developing infrastructure",
        ],
      },
      {
        heading: "5-Year Total Cost Example (24V, Daily Use)",
        content:
          "For a facility that runs a scrubber 5 days per week: Lead-acid batteries need replacement every 2 years (2 replacements over 5 years = $800-1,600) plus 60 hours of maintenance labor. Lithium typically lasts the full 5 years with zero maintenance. Factoring in electricity costs (lead-acid uses 40% more power due to charging inefficiency), lithium becomes cheaper after year 3. For multi-shift operations that require 2+ charge cycles per day, lithium is the clear winner due to fast charge capability.",
        items: [
          "Lead-Acid 5-year cost: $1,200-2,400 (batteries) + $600 maintenance labor = $1,800-3,000",
          "Lithium 5-year cost: $1,200-2,400 (one purchase, zero maintenance) = $1,200-2,400",
          "Multi-shift advantage: lithium charges during breaks = no second battery bank needed",
        ],
      },
      {
        heading: "When Lead-Acid Still Makes Sense",
        content:
          "Lead-acid batteries remain a good choice for facilities with low daily usage, tight initial budgets, or operations in very cold environments where lithium performance degrades. They're also appropriate for backup or occasional-use machines where the battery sits idle for extended periods — lead-acid tolerates deep discharge better if recharged immediately afterward.",
      },
    ],
    relatedProducts: ["K500BT", "K660", "A380"],
  },
];
