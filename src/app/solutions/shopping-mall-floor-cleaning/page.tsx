import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Send } from "@/lib/icons";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Shopping Mall Floor Cleaning Machines | Retail Center Scrubbers | Aikerui",
  description: "Floor scrubbers for shopping malls and retail centers. Quiet daytime operation, fast-drying for food courts, compact for escalator areas. Factory-direct pricing.",
  keywords: ["shopping mall floor scrubber", "retail center floor cleaning", "mall floor cleaning machine", "commercial retail scrubber"],
  alternates: { canonical: "https://aikeruiclean.com/solutions/shopping-mall-floor-cleaning" },
};

export default function MallSolutionPage() {
  return (
    <div>
      <JsonLd data={{"@context":"https://schema.org","@type":"Article","headline":"Shopping Mall Floor Cleaning Solutions","description":"Floor scrubbers and cleaning solutions for shopping malls and retail centers.","author":{"@type":"Organization","name":"Aikerui Cleaning Technology Co., Ltd."}}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
        {"@type":"Question","name":"What floor scrubber works best for shopping malls?","acceptedAnswer":{"@type":"Answer","text":"A mid-size ride-on scrubber (28-34 inch) for main concourses plus compact walk-behind units for food courts and restrooms. Multi-machine fleet approach covers all zones efficiently."}},
        {"@type":"Question","name":"Can floor scrubbers clean polished marble and tile mall floors?","acceptedAnswer":{"@type":"Answer","text":"Yes. Use soft nylon brushes or white polishing pads designed for polished stone. Adjustable brush pressure prevents etching or scratching delicate surfaces."}},
      ]}} />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Shopping Mall Floor Cleaning Machines</h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">Quiet, versatile scrubbers for mixed-use retail environments. Polish marble atriums, degrease food courts, and deep-clean tile corridors — all during business hours.</p>
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"><Send size={18} /> Get Mall Cleaning Quote</Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Zone-by-Zone Mall Cleaning</h2>
          <div className="space-y-4">
            {[
              {title:"Main Concourse & Atrium",desc:"Polished stone, marble, or terrazzo floors. Ride-on scrubber (28-34 inch) with soft pads. Clean during low-traffic morning hours. High-visibility areas — floors must be spotless.",specs:["Machine: Ride-on, 28-34 inch","Pad: White or red polishing pad","Frequency: Daily","Key concern: No streaks on polished stone"]},
              {title:"Food Court & Restaurants",desc:"Tile floors with food spills and grease. Walk-behind scrubber (20 inch) with degreasing capability. Clean after each meal rush. Quick-drying squeegee for immediate foot traffic.",specs:["Machine: Walk-behind, 20 inch","Brush: Medium-stiff nylon for tile","Frequency: After each meal service","Key concern: Grease removal + fast drying"]},
              {title:"Restrooms & Service Corridors",desc:"Compact walk-behind (17 inch) for tight spaces. Chemical-resistant for disinfectants. Clean during off-hours. Small enough to navigate through doorways and around fixtures.",specs:["Machine: Compact walk-behind, 17 inch","Chemical: Disinfectant-compatible","Frequency: Daily","Key concern: Maneuverability in tight spaces"]},
            ].map(item=>(
              <div key={item.title} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                <ul className="space-y-0.5">{item.specs.map(s=><li key={s} className="text-xs text-gray-500">• {s}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/best-floor-scrubber-small-business" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Best for Small Business</Link>
            <Link href="/guides/disc-brush-vs-roller-brush-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Disc vs Roller Brush</Link>
            <Link href="/guides/floor-scrubber-maintenance-checklist" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Maintenance Checklist</Link>
          </div>
        </section>

        <section className="p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Keep Your Mall Floors Spotless</h2>
          <p className="text-gray-200 mb-6 max-w-lg mx-auto">Tell us about your mall layout and floor types. We'll recommend the right equipment mix. Factory-direct pricing.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"><Send size={18} /> Get Quote</Link>
            <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing." className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"><Phone size={16} /> WhatsApp</a>
          </div>
        </section>
      </div>
    </div>
  );
}
