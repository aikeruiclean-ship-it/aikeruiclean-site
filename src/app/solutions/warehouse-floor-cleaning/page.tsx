import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Phone, Factory, Truck, Clock } from "@/lib/icons";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Warehouse Floor Cleaning Machines | Industrial Scrubbers & Sweepers | Aikerui",
  description:
    "Professional warehouse floor cleaning solutions. Walk-behind and ride-on floor scrubbers for warehouses up to 100,000+ sq ft. Factory-direct pricing, CE certified, global shipping.",
  keywords: [
    "warehouse floor cleaning machine",
    "warehouse floor scrubber",
    "industrial warehouse cleaning equipment",
    "warehouse sweeper",
    "concrete floor cleaning machine",
  ],
  alternates: { canonical: "/solutions/warehouse-floor-cleaning" },
};

export default function WarehouseSolutionPage() {
  return (
    <div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Warehouse Floor Cleaning Solutions",
        description:
          "Complete guide to choosing industrial floor cleaning machines for warehouses. Walk-behind and ride-on scrubbers, sweepers, and combination machines.",
        author: { "@type": "Organization", name: "Anhui Aikerui Environmental Protection Technology CO.,LTD" },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the best floor scrubber for a warehouse?", acceptedAnswer: { "@type": "Answer", text: "Under 20,000 sq ft: walk-behind scrubber (17-28 inch). Over 30,000 sq ft: ride-on scrubber (28-50 inch) for 2-3x higher productivity." } },
          { "@type": "Question", name: "How often should warehouse floors be cleaned?", acceptedAnswer: { "@type": "Answer", text: "High-traffic aisles: daily. Low-traffic zones: 2-3x/week. Loading docks: daily due to forklift traffic and outdoor debris." } },
          { "@type": "Question", name: "What brush type works best on concrete warehouse floors?", acceptedAnswer: { "@type": "Answer", text: "Unsealed concrete: medium-stiff nylon or PPL brush. Sealed concrete/epoxy: soft nylon or white pad. Heavy soil requires 60-100kg brush pressure." } },
        ],
      }} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Warehouse Floor Cleaning Machines
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Keep your warehouse floors clean, safe, and compliant. Industrial scrubbers and sweepers for concrete, epoxy, and polished floors — from 5,000 to 100,000+ sq ft.
            </p>
            <Link
              href="/industrial-floor-scrubber-quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
            >
              Get a Warehouse Cleaning Quote <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Problem */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Warehouse Floor Cleaning Matters
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Warehouse floors accumulate dust, tire marks, oil spills, and debris from daily operations. Dirty floors create safety hazards, damage inventory, and leave a poor impression on clients and auditors. A proper industrial cleaning machine keeps your facility compliant with OSHA and ISO standards.
          </p>
        </section>

        {/* Machine types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Choosing the Right Machine for Your Warehouse
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "Walk-Behind Scrubbers — Best for Small to Medium Warehouses",
                desc: "For warehouses under 20,000 sq ft, walk-behind scrubbers offer the best balance of cost and performance. They're maneuverable in narrow aisles and easy to operate with minimal training.",
                specs: [
                  "Cleaning width: 17–34 inches",
                  "Productivity: 12,000–35,000 sq ft/hour",
                  "Ideal for: Distribution centers, cold storage, small warehouses",
                ],
              },
              {
                title: "Ride-On Scrubbers — Best for Large Warehouses",
                desc: "When your facility exceeds 30,000 sq ft, a ride-on scrubber dramatically improves productivity. Operators can clean 3–4x more area per shift with less fatigue.",
                specs: [
                  "Cleaning width: 28–50 inches",
                  "Productivity: 25,000–80,000 sq ft/hour",
                  "Ideal for: Logistics centers, 3PL warehouses, big-box retail DCs",
                ],
              },
              {
                title: "Sweeper-Scrubber Combos — For Heavy Debris Warehouses",
                desc: "If your warehouse deals with wood chips, metal shavings, or packing debris, a sweeper-scrubber combination machine sweeps debris first, then scrubs the floor — all in one pass.",
                specs: [
                  "One-pass sweep + scrub",
                  "Reduces labor by 50% vs separate machines",
                  "Ideal for: Lumber yards, metal fabrication, recycling centers",
                ],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {item.desc}
                </p>
                <ul className="space-y-1">
                  {item.specs.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle
                        size={14}
                        className="text-green-600 mt-0.5 shrink-0"
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Floor types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Matching Brush Type to Your Warehouse Floor
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Floor Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Recommended Brush</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Pressure</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Concrete (unsealed)", "Medium-stiff nylon or PPL brush", "High"],
                  ["Epoxy / sealed concrete", "Soft nylon brush or white pad", "Medium"],
                  ["Polished concrete", "Very soft brush or red pad", "Low"],
                  ["Asphalt", "Stiff nylon or wire-mixed brush", "High"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-gray-600">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Industry Solutions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/solutions/airport-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Airport</Link>
            <Link href="/solutions/cold-storage-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Cold Storage</Link>
            <Link href="/solutions/factory-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Factory</Link>
            <Link href="/solutions/hotel-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Hotel</Link>
            <Link href="/solutions/pharmaceutical-cleanroom-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Cleanroom / Pharma</Link>
            <Link href="/solutions/shopping-mall-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Shopping Mall</Link>
            <Link href="/solutions/supermarket-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Supermarket</Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/industrial-floor-scrubber-complete-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Industrial Floor Scrubber Guide</Link>
            <Link href="/guides/walk-behind-vs-ride-on-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Walk-Behind vs Ride-On</Link>
            <Link href="/guides/how-much-does-floor-scrubber-cost" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Floor Scrubber Cost Guide</Link>
            <Link href="/guides/warehouse-cleaning-equipment-complete-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Warehouse Equipment Setup</Link>
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Upgrade Your Warehouse Cleaning?
          </h2>
          <p className="text-gray-200 mb-6 max-w-xl mx-auto">
            Tell us your warehouse size and floor type. We&apos;ll recommend the best machine and send a quote within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/industrial-floor-scrubber-quote"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"
            >
              Get Your Quote
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing."
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
