import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Send } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title:
    "Floor Scrubber Price Guide 2026 — Walk-Behind, Ride-On & Parts Cost | Aikerui",
  description:
    "Complete 2026 floor scrubber price guide. Walk-behind $3,000-$6,000, ride-on $8,000-$25,000. Compare by type, brand, and features. Factory-direct pricing saves 30-50%.",
  keywords: [
    "floor scrubber price",
    "floor scrubber cost",
    "walk behind scrubber price",
    "ride on scrubber price",
    "commercial floor scrubber cost",
    "industrial floor scrubber price list",
    "floor scrubber parts price",
  ],
  alternates: { canonical: "https://aikeruiclean.com/floor-scrubber-price-guide" },
};

export default function PriceGuidePage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Floor Scrubber Price Guide 2026: Walk-Behind, Ride-On & Parts Cost",
          description:
            "Complete price guide for commercial and industrial floor scrubbers. Compare costs by type, size, and features.",
          author: {
            "@type": "Organization",
            name: "Aikerui Cleaning Technology Co., Ltd.",
          },
        }}
      />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Floor Scrubber Price Guide 2026
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Real price ranges for walk-behind, ride-on, and industrial floor
              scrubbers. Factory-direct prices included — see how much you can
              save by buying from the manufacturer.
            </p>
            <Link
              href="/floor-scrubber-parts-quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
            >
              <Send size={18} /> Get Factory-Direct Quote
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Summary Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Floor Scrubber Price Ranges at a Glance
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold">Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Cleaning Width</th>
                  <th className="text-left px-4 py-3 font-semibold">Dealer Price</th>
                  <th className="text-left px-4 py-3 font-semibold bg-green-50 text-green-800">Factory Direct</th>
                  <th className="text-left px-4 py-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Walk-Behind (Compact)", '17-20"', "$3,000-$5,000", "$1,800-$3,200", "Small shops, restaurants, supermarkets"],
                  ["Walk-Behind (Mid)", '20-28"', "$4,500-$8,000", "$2,800-$5,000", "Warehouses, schools, hospitals"],
                  ["Walk-Behind (Heavy)", '28-34"', "$6,000-$12,000", "$3,800-$7,500", "Factories, large warehouses"],
                  ["Ride-On (Compact)", '28-34"', "$9,000-$15,000", "$6,000-$10,000", "Medium warehouses, distribution centers"],
                  ["Ride-On (Mid)", '34-42"', "$14,000-$22,000", "$9,000-$15,000", "Large warehouses, airports, convention centers"],
                  ["Ride-On (Heavy)", '42-50"', "$20,000-$35,000", "$14,000-$24,000", "Massive logistics centers, automotive plants"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-4 py-3 ${
                          j === 3
                            ? "bg-green-50/50 text-green-800 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            * Prices are estimates. Actual quote depends on configuration,
            quantity, and shipping destination. Factory-direct prices are
            Aikerui estimates.
          </p>
        </section>

        {/* What affects price */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Affects Floor Scrubber Prices?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Cleaning Width",
                desc: "The single biggest price factor. A 17\" scrubber costs $3,000. A 50\" unit is $25,000+. Wider = more area per pass = higher cost.",
              },
              {
                title: "Battery Type",
                desc: "Lithium batteries add $800-$2,000 upfront but last 2-3x longer than lead-acid. Opportunity charging capability adds another $500-$1,000.",
              },
              {
                title: "Drive System",
                desc: "Self-propelled walk-behind models cost $1,000-$2,000 more than push-only. Ride-on models add $5,000-$15,000 for the drive system.",
              },
              {
                title: "Tank Capacity",
                desc: "Larger solution/recovery tanks let you clean longer between refills. Each 10-gallon increase adds roughly $500-$1,000.",
              },
              {
                title: "Brush/Pad System",
                desc: "Disc brush systems are standard. Roller/cylindrical brush systems add $2,000-$5,000 but handle uneven floors better.",
              },
              {
                title: "Special Features",
                desc: "Auto-dosing ($500), traction drive ($1,000), LCD display ($300), and eco-mode ($400) each add to the price tag.",
              },
            ].map((item) => (
              <div key={item.title} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Consumable costs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ongoing Parts & Consumable Costs
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold">Part</th>
                  <th className="text-left px-4 py-3 font-semibold">Replacement Frequency</th>
                  <th className="text-left px-4 py-3 font-semibold">Dealer Price</th>
                  <th className="text-left px-4 py-3 font-semibold bg-green-50 text-green-800">Factory Direct</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Disc Brush", "Every 3-6 months", "$120-$180", "$45-$75"],
                  ["Squeegee Rubber Set", "Every 2-4 months", "$80-$140", "$30-$55"],
                  ["Pad Driver (17\")", "Every 6-12 months", "$90-$150", "$35-$65"],
                  ["Battery (24V Lead-Acid)", "Every 1-3 years", "$500-$800", "$300-$500"],
                  ["Battery (24V Lithium)", "Every 3-5 years", "$1,500-$2,500", "$1,000-$1,800"],
                  ["Vacuum Motor", "Every 2-4 years", "$300-$600", "$150-$350"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-4 py-2.5 ${
                          j === 3 ? "bg-green-50/50 text-green-800 font-semibold" : "text-gray-600"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href="/floor-scrubber-parts-quote"
            className="text-primary font-semibold hover:underline"
          >
            Get a quote for replacement parts →
          </Link>
        </section>

        {/* CTA */}
        <section className="p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">
            Get Your Factory-Direct Price Quote
          </h2>
          <p className="text-gray-200 mb-6 max-w-lg mx-auto">
            Tell us your facility size and cleaning needs. We&apos;ll recommend the
            right machine and send a detailed quote within 24 hours. No
            obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/floor-scrubber-parts-quote"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"
            >
              <Send size={18} /> Get Quote Now
            </Link>
            <a
              href="https://wa.me/8619965236428"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              <Phone size={16} /> WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
