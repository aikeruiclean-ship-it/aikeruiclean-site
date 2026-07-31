import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Send, CheckCircle } from "@/lib/icons";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Hotel Floor Cleaning Machines | Hospitality Scrubbers for Guest Areas | Aikerui",
  description: "Ultra-quiet floor scrubbers for hotels and resorts. Clean guest corridors, lobbies, and kitchens during business hours without disturbing guests. Factory-direct pricing.",
  keywords: ["hotel floor scrubber", "hospitality floor cleaning", "hotel cleaning machine", "resort floor scrubber", "quiet floor scrubber for hotels"],
  alternates: { canonical: "https://aikeruiclean.com/solutions/hotel-floor-cleaning" },
};

export default function HotelSolutionPage() {
  return (
    <div>
      <JsonLd data={{"@context":"https://schema.org","@type":"Article","headline":"Hotel Floor Cleaning Solutions","description":"Ultra-quiet floor cleaning machines designed for hotels, resorts, and hospitality environments.","author":{"@type":"Organization","name":"Anhui Aikerui Environmental Protection Technology CO.,LTD"}}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
        {"@type":"Question","name":"What is the quietest floor scrubber for hotels?","acceptedAnswer":{"@type":"Answer","text":"Hotel-grade scrubbers operate at 58-62dB — quieter than normal conversation. Sound-dampening materials, enclosed motors, and soft-start drives enable cleaning in occupied guest corridors without complaints."}},
        {"@type":"Question","name":"How do hotels clean floors during guest hours?","acceptedAnswer":{"@type":"Answer","text":"Hotels schedule cleaning during mid-morning (10 AM-2 PM) when guests are out. Ultra-quiet scrubbers with fast-drying squeegees clean corridors and lobbies without disrupting guests. Ballrooms are cleaned between events."}},
      ]}} />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Hotel Floor Cleaning Machines</h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">Ultra-quiet scrubbers for 5-star environments. Clean guest corridors, marble lobbies, and restaurant kitchens during business hours — no guest complaints, no disruption.</p>
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"><Send size={18} /> Get Hotel Cleaning Quote</Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel Zone Cleaning Guide</h2>
          <div className="space-y-4">
            {[
              {title:"Guest Corridors (Daily, 10 AM-2 PM)",desc:"Ultra-quiet walk-behind (17-20 inch). <60dB operation. Fast-drying squeegee — guests walk on floors immediately. Compact profile fits under wall art and handrails. Lithium battery for opportunity charging.",specs:["Machine: Compact walk-behind, 17-20 inch","Noise: <60dB (quieter than conversation)","Schedule: Mid-morning, when guests are out","Key metric: Zero noise complaints"]},
              {title:"Lobby & Atrium (Daily, 2-5 AM)",desc:"Ride-on or walk-behind (20-28 inch). Polished marble/stone — soft pads only. High-visibility area — zero streaks or residue. Large tanks for extended runtime without refill interruption.",specs:["Machine: Mid-size, 20-28 inch","Pad: White/red polishing for stone","Schedule: Overnight, before 6 AM","Key metric: Spotless presentation"]},
              {title:"Ballroom & Event Spaces (Between Events)",desc:"Multi-purpose scrubber with quick-change pads. Rapid setup/teardown cleaning between events. Variable speed for delicate flooring. Compact storage in service corridors.",specs:["Machine: Multi-purpose, 20-28 inch","Pad: Quick-change system","Schedule: Between events","Key metric: Turnaround time under 30 min"]},
              {title:"Restaurant & Kitchen (After Service)",desc:"Stainless steel machine with degreasing. Oil-resistant squeegee. Clean after dinner service. Non-slip floor treatment. Chemical-resistant for kitchen disinfectants.",specs:["Machine: Walk-behind with degreaser","Brush: Heavy-duty, degreasing capable","Schedule: After dinner service","Key metric: Oil and grease removal"]},
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
            <Link href="/guides/hotel-hospitality-floor-cleaning-solutions" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Hotel & Hospitality Guide</Link>
            <Link href="/guides/walk-behind-vs-ride-on-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Walk-Behind vs Ride-On</Link>
            <Link href="/guides/how-much-does-floor-scrubber-cost" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Cost Guide</Link>
          </div>
        </section>

        <section className="p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Hotel Cleaning Equipment Quote</h2>
          <p className="text-gray-200 mb-6 max-w-lg mx-auto">Tell us your property size and floor types. We'll recommend the right equipment for your hotel. Factory-direct pricing for hospitality groups.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"><Send size={18} /> Get Quote</Link>
            <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing." className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"><Phone size={16} /> WhatsApp</a>
          </div>
        </section>
      </div>
    </div>
  );
}
