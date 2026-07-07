import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Factory Floor Cleaning Machines | Heavy-Duty Industrial Scrubbers | Aikerui",
  description:
    "Heavy-duty factory floor cleaning solutions for manufacturing plants. Ride-on and walk-behind scrubbers for oil, grease, and heavy soil. CE certified, factory-direct pricing.",
  keywords: [
    "factory floor cleaning machine",
    "industrial factory scrubber",
    "manufacturing plant cleaning equipment",
    "heavy duty floor scrubber",
    "factory floor sweeper",
  ],
  alternates: { canonical: "/solutions/factory-floor-cleaning" },
};

export default function FactorySolutionPage() {
  return (
    <div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Factory Floor Cleaning Solutions",
        description: "Heavy-duty industrial floor cleaning machines for factories and manufacturing plants.",
        author: { "@type": "Organization", name: "Aikerui Cleaning Technology Co., Ltd." },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the best floor scrubber for a factory?", acceptedAnswer: { "@type": "Answer", text: "For factories over 30,000 sq ft, a ride-on scrubber with heavy-duty brush pressure (60-100kg) and oil-resistant squeegee is recommended. For smaller production areas, a walk-behind scrubber with degreasing capability works well." } },
          { "@type": "Question", name: "How do you clean oil and grease off factory floors?", acceptedAnswer: { "@type": "Answer", text: "Use a scrubber with degreasing injection system and oil-resistant squeegee rubber. High brush pressure (80-100kg) cuts through oil deposits. For extreme grease, pre-treat with industrial degreaser before scrubbing." } },
          { "@type": "Question", name: "Can floor scrubbers handle metal shavings on factory floors?", acceptedAnswer: { "@type": "Answer", text: "Yes. Use a sweeper-scrubber combination machine that sweeps metal debris first, then scrubs. For heavy metal debris, a dedicated industrial sweeper should run before the scrubber to prevent brush damage." } },
        ],
      }} />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Factory Floor Cleaning Machines
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Heavy-duty scrubbers and sweepers built for manufacturing environments. Handle oil, grease, metal shavings, and heavy soil with industrial-grade cleaning power.
            </p>
            <Link
              href="/industrial-floor-scrubber-quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
            >
              Get a Factory Cleaning Quote <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The Challenge of Factory Floor Cleaning
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Manufacturing plants face unique cleaning challenges: oil spills, metal debris, chemical residues, and 24/7 operations. Standard cleaning equipment cannot handle these demands. You need industrial-grade machines designed for continuous duty in harsh environments.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recommended Machines for Factories
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Ride-On Scrubbers — For Large Production Floors",
                desc: "When your factory floor is 30,000+ sq ft and runs multiple shifts, a ride-on scrubber is essential. These machines cover more area per hour and reduce operator fatigue, allowing continuous cleaning across shifts.",
                specs: [
                  "Cleaning width up to 50 inches",
                  "Productivity up to 80,000 sq ft/hour",
                  "Large solution/recovery tanks for long runs",
                  "Heavy-duty steel frame for industrial durability",
                ],
              },
              {
                title: "Heavy-Degreasing Scrubbers — For Oil & Grease",
                desc: "Automotive plants, metal fabrication shops, and food processing facilities need machines that can handle oil and grease. Our scrubbers with high-pressure deck and degreasing capability cut through heavy soil.",
                specs: [
                  "High brush pressure (up to 100 kg)",
                  "Compatible with industrial degreasers",
                  "Oil-resistant squeegee blades",
                  "Stainless steel components for chemical resistance",
                ],
              },
              {
                title: "Industrial Sweepers — For Debris Removal",
                desc: "Before scrubbing, remove metal shavings, wood chips, and production waste with an industrial sweeper. Ride-on sweepers clear debris fast, preventing it from being spread by forklift traffic.",
                specs: [
                  "Cleaning width up to 60 inches",
                  "Large hopper capacity",
                  "Dust filtration system",
                  "Suitable for indoor and outdoor use",
                ],
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.desc}</p>
                <ul className="space-y-1">
                  {item.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-green-600 mt-0.5 shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Industry-Specific Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { industry: "Automotive Manufacturing", need: "Oil & grease removal, tire mark cleaning, high-traffic aisles" },
              { industry: "Food Processing", need: "Food-grade cleaning, grease removal, frequent sanitization" },
              { industry: "Metal Fabrication", need: "Metal shaving pickup, cutting fluid cleanup, spark-proof options" },
              { industry: "Textile / Garment", need: "Dust control, lint removal, light debris sweeping" },
              { industry: "Pharmaceutical", need: "Clean room compatible, HEPA filtration, chemical resistant" },
              { industry: "Plastics / Packaging", need: "Plastic pellet sweeping, static control, frequent cleaning" },
            ].map((item) => (
              <div key={item.industry} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1">{item.industry}</h3>
                <p className="text-sm text-gray-600">{item.need}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/industrial-floor-scrubber-complete-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Industrial Floor Scrubber Guide</Link>
            <Link href="/guides/disc-brush-vs-roller-brush-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Disc vs Roller Brush</Link>
            <Link href="/guides/floor-scrubber-maintenance-checklist" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Maintenance Checklist</Link>
            <Link href="/guides/floor-scrubber-food-processing-plants" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Food Processing Guide</Link>
          </div>
        </section>

        <section className="p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Get a Custom Factory Cleaning Plan</h2>
          <p className="text-gray-200 mb-6 max-w-xl mx-auto">
            Tell us about your factory operations. We&apos;ll recommend the right equipment for your specific industry.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors">
              Get Your Quote
            </Link>
            <a href="https://wa.me/8619965236428" className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors">
              <Phone size={16} /> WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
