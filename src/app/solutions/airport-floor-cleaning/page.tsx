import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Send } from "@/lib/icons";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Airport Floor Cleaning Machines | Large-Area Industrial Scrubbers | Aikerui",
  description: "High-productivity floor scrubbers for airports, terminals, and concourses. Ride-on machines covering 80,000+ sq ft/hr. Factory-direct pricing, CE certified, global shipping.",
  keywords: ["airport floor cleaning machine", "airport floor scrubber", "terminal floor cleaner", "large area floor scrubber", "concourse cleaning equipment"],
  alternates: { canonical: "https://aikeruiclean.com/solutions/airport-floor-cleaning" },
};

export default function AirportSolutionPage() {
  return (
    <div>
      <JsonLd data={{"@context":"https://schema.org","@type":"Article","headline":"Airport Floor Cleaning Solutions","description":"High-productivity industrial floor cleaning machines for airports and terminals.","author":{"@type":"Organization","name":"Anhui Aikerui Environmental Protection Technology CO.,LTD"}}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
        {"@type":"Question","name":"What type of floor scrubber is best for airports?","acceptedAnswer":{"@type":"Answer","text":"Full-size ride-on scrubbers (42-50 inch) with lithium batteries for continuous operation. Airports need maximum productivity — 80,000+ sq ft/hr cleaning rates."}},
        {"@type":"Question","name":"Can floor scrubbers clean airport terminal floors during passenger hours?","acceptedAnswer":{"@type":"Answer","text":"Yes. Modern ride-on scrubbers with ultra-quiet operation (<65dB) can clean during low-traffic hours. Lithium batteries enable opportunity charging during breaks."}},
      ]}} />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Airport Floor Cleaning Machines</h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">High-productivity ride-on scrubbers and sweepers for terminals, concourses, baggage claim, and hangars. Cover 80,000+ sq ft per hour. Lithium batteries for 24/7 operation.</p>
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"><Send size={18} /> Get Airport Cleaning Quote</Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Airport Cleaning Challenge</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Airports operate 24/7 with millions of passengers tracking in dirt, food spills, and luggage wheel marks. Terminal floors span hundreds of thousands of square feet across multiple materials — polished stone in atriums, tile in corridors, carpet in lounges, and concrete in back-of-house. Downtime windows are short and tightly scheduled. You need machines that clean fast, run long, and require minimal maintenance.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Equipment for Airports</h2>
          <div className="space-y-4">
            {[
              {title:"Full-Size Ride-On Scrubber (42-50 inch)",desc:"For main concourses and open terminal areas. 80,000+ sq ft/hr productivity. Lithium battery essential for opportunity charging between shifts. Large tanks for extended runtime without refill.",specs:["Width: 42-50 inch","Productivity: 80,000+ sq ft/hr","Battery: Lithium, 4-5hr runtime","Best for: Concourses, check-in halls, baggage claim"]},
              {title:"Mid-Size Ride-On Scrubber (34-42 inch)",desc:"For gate areas, corridors, and retail zones. Maneuverable enough for tighter spaces while maintaining high productivity. Quiet operation for passenger areas.",specs:["Width: 34-42 inch","Productivity: 50,000-80,000 sq ft/hr","Noise: <65dB for passenger areas","Best for: Gate lounges, retail corridors, jet bridges"]},
              {title:"Ride-On Sweeper",desc:"For parking structures, roadways, and outdoor walkways. Airport parking facilities accumulate tire dust, road salt, and debris 24/7. Dedicated sweeper handles this before scrubbing.",specs:["Clears debris before scrubbing","Handles outdoor conditions","Large hopper capacity","Best for: Parking garages, curb-side, cargo areas"]},
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Industry Solutions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/solutions/cold-storage-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Cold Storage</Link>
            <Link href="/solutions/factory-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Factory</Link>
            <Link href="/solutions/hotel-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Hotel</Link>
            <Link href="/solutions/pharmaceutical-cleanroom-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Cleanroom / Pharma</Link>
            <Link href="/solutions/shopping-mall-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Shopping Mall</Link>
            <Link href="/solutions/supermarket-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Supermarket</Link>
            <Link href="/solutions/warehouse-floor-cleaning" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Warehouse</Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/industrial-floor-scrubber-complete-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Industrial Scrubber Guide</Link>
            <Link href="/guides/lead-acid-vs-lithium-battery-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Battery Comparison</Link>
            <Link href="/guides/warehouse-cleaning-equipment-complete-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Large Facility Setup</Link>
          </div>
        </section>

        <section className="p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Upgrade Your Airport Cleaning Fleet</h2>
          <p className="text-gray-200 mb-6 max-w-lg mx-auto">Tell us your terminal size and floor types. We'll design a cleaning fleet with the right equipment mix. Factory-direct pricing for airport operators.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"><Send size={18} /> Get Quote</Link>
            <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing." className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"><Phone size={16} /> WhatsApp</a>
          </div>
        </section>
      </div>
    </div>
  );
}
