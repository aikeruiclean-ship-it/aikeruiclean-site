import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Supermarket Floor Cleaning Machines | Retail Store Scrubbers | Aikerui",
  description:
    "Quiet, compact floor cleaning machines for supermarkets and retail stores. Walk-behind scrubbers for daytime cleaning with low noise. Factory-direct pricing, global shipping.",
  keywords: [
    "supermarket floor cleaning machine",
    "retail store floor scrubber",
    "grocery store floor cleaner",
    "quiet floor scrubber",
    "commercial retail cleaning equipment",
  ],
  alternates: { canonical: "/solutions/supermarket-floor-cleaning" },
};

export default function SupermarketSolutionPage() {
  return (
    <div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Supermarket Floor Cleaning Solutions",
        description: "Quiet, compact floor cleaning machines designed for supermarkets, grocery stores, and retail environments.",
        author: { "@type": "Organization", name: "Aikerui Cleaning Technology Co., Ltd." },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Can floor scrubbers be used during supermarket business hours?", acceptedAnswer: { "@type": "Answer", text: "Yes. Ultra-quiet scrubbers operating at 58-62dB can clean during business hours without disturbing customers. Fast-drying squeegees leave floors walkable immediately, eliminating wet floor hazards." } },
          { "@type": "Question", name: "What is the best floor scrubber for a grocery store?", acceptedAnswer: { "@type": "Answer", text: "A compact 17-20 inch walk-behind scrubber with quiet operation and fast-drying capability. Compact size navigates narrow supermarket aisles and checkout areas." } },
          { "@type": "Question", name: "How often should supermarket floors be cleaned?", acceptedAnswer: { "@type": "Answer", text: "Entrance and lobby: multiple times daily. Main aisles: daily. Produce section: daily with spot cleaning. Checkout area: daily. Backroom: 2-3x per week." } },
        ],
      }} />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Supermarket Floor Cleaning Machines
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Quiet, compact scrubbers designed for retail environments. Clean during business hours without disturbing customers. Safe for tile, vinyl, and polished concrete floors.
            </p>
            <Link
              href="/industrial-floor-scrubber-quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
            >
              Get a Supermarket Cleaning Quote <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Supermarket Floors Need Special Attention
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Supermarket floors see thousands of shoppers daily — tracking in dirt, spilling liquids, and leaving scuff marks. A clean floor is not just about appearance; it&apos;s about safety, health code compliance, and customer experience. Studies show that store cleanliness directly impacts shopper dwell time and basket size.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Requirements for Retail Floor Cleaning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Ultra-Quiet Operation",
                desc: "Supermarkets need machines that can run during business hours. Our ECO-mode scrubbers operate at just 60–65 dB — quieter than a conversation. No need for overnight cleaning shifts.",
                icon: "🔇",
              },
              {
                title: "Compact & Maneuverable",
                desc: "Navigate narrow supermarket aisles and crowded checkout areas. Our compact walk-behind scrubbers are designed for tight spaces with zero-turn capability.",
                icon: "🔄",
              },
              {
                title: "Safe for All Floor Types",
                desc: "From polished tile to vinyl and sealed concrete — our machines adjust brush pressure and solution flow to match the floor type without causing damage.",
                icon: "🛡️",
              },
              {
                title: "Fast Drying — No Slip Hazard",
                desc: "Powerful vacuum recovery leaves floors nearly dry immediately after cleaning. No &apos;wet floor&apos; signs needed for extended periods.",
                icon: "💨",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recommended Machines
          </h2>
          <div className="space-y-4">
            {[
              {
                model: "Walk-Behind Compact Scrubber (17–20 inch)",
                best: "Best for: Small to medium supermarkets (5,000–15,000 sq ft)",
                why: "Lightweight, easy to maneuver between aisles. Low noise for daytime cleaning. Affordable entry point.",
              },
              {
                model: "Walk-Behind Mid-Size Scrubber (20–28 inch)",
                best: "Best for: Large supermarkets and hypermarkets (15,000–40,000 sq ft)",
                why: "Wider cleaning path for efficiency. Larger tanks for extended runtime. Still compact enough for aisles.",
              },
              {
                model: "Ride-On Compact Scrubber (28–34 inch)",
                best: "Best for: Supercenters and wholesale clubs (40,000+ sq ft)",
                why: "Maximum productivity with operator comfort. Ideal for main aisles and open areas. Covers more area per shift.",
              },
            ].map((item) => (
              <div key={item.model} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">{item.model}</h3>
                <p className="text-sm text-primary font-medium mb-2">{item.best}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Cleaning Schedule Recommendations
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Area</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Frequency</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Method</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Entrance / Lobby", "Daily, multiple times", "Walk-behind scrubber, quick pass"],
                  ["Main aisles", "Daily after closing or during quiet hours", "Walk-behind or ride-on scrubber"],
                  ["Produce section", "Daily, spot cleaning as needed", "Compact scrubber, low moisture"],
                  ["Checkout area", "Daily", "Compact scrubber with fast drying"],
                  ["Backroom / Storage", "2–3 times per week", "Sweeper + scrubber"],
                  ["Loading dock", "Weekly or as needed", "Heavy-duty sweeper-scrubber"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-gray-600">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/best-floor-scrubber-small-business" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Best Scrubber for Small Business</Link>
            <Link href="/guides/walk-behind-vs-ride-on-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Walk-Behind vs Ride-On</Link>
            <Link href="/guides/how-much-does-floor-scrubber-cost" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Floor Scrubber Cost Guide</Link>
            <Link href="/guides/floor-scrubber-maintenance-checklist" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Maintenance Checklist</Link>
          </div>
        </section>

        <section className="p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">
            Keep Your Store Looking Its Best
          </h2>
          <p className="text-gray-200 mb-6 max-w-xl mx-auto">
            Tell us about your store size and floor type. We&apos;ll recommend the right machine for spotless floors that impress customers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors">
              Get Your Quote
            </Link>
            <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing." className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors">
              <Phone size={16} /> WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
