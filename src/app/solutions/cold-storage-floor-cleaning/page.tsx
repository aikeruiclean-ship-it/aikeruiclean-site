import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Send, CheckCircle } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Cold Storage & Freezer Floor Scrubbers | Sub-Zero Cleaning Machines | Aikerui",
  description: "Floor scrubbers engineered for cold storage and freezer warehouses (-25°C to +5°C). Lithium batteries, ice-resistant squeegees, anti-condensation electronics.",
  keywords: ["cold storage floor scrubber", "freezer floor cleaning machine", "cold room scrubber", "sub zero floor cleaner", "refrigerated warehouse scrubber"],
  alternates: { canonical: "https://aikeruiclean.com/solutions/cold-storage-floor-cleaning" },
};

export default function ColdStorageSolutionPage() {
  return (
    <div>
      <JsonLd data={{"@context":"https://schema.org","@type":"Article","headline":"Cold Storage Floor Cleaning Solutions","description":"Specialized floor scrubbers for cold storage, freezer warehouses, and refrigerated facilities.","author":{"@type":"Organization","name":"Aikerui Cleaning Technology Co., Ltd."}}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
        {"@type":"Question","name":"Can regular floor scrubbers work in cold storage?","acceptedAnswer":{"@type":"Answer","text":"No. Standard lead-acid batteries fail below 5°C. Standard rubber squeegees harden and crack. Electronics develop condensation. You need a cold-storage-specific machine with lithium batteries, specialized rubber, and sealed electronics."}},
        {"@type":"Question","name":"What temperature range can cold storage scrubbers handle?","acceptedAnswer":{"@type":"Answer","text":"Cold-storage-rated scrubbers operate from -25°C to +5°C. Lithium batteries maintain performance down to -20°C. Below -25°C, additional heating elements may be required for critical components."}},
      ]}} />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Cold Storage & Freezer Floor Scrubbers</h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">Purpose-built scrubbers for sub-zero environments. Lithium batteries, ice-resistant squeegees, and sealed electronics. Clean safely at -25°C to +5°C.</p>
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"><Send size={18} /> Get Cold Storage Quote</Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Cold Storage Needs Specialized Equipment</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Standard floor scrubbers fail catastrophically in cold environments. Lead-acid batteries lose 50%+ capacity below 5°C. Rubber squeegees harden like plastic and crack. Electronics collect condensation that causes short circuits. Ice build-up on floors requires different brush types than room-temperature concrete. A cold-storage-specific machine addresses all of these issues.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {["Lithium battery: maintains 80%+ capacity at -20°C","Ice-resistant squeegee: stays flexible to -30°C","IP67 sealed electronics: prevents condensation damage","Heated solution tank option: prevents freezing","Anti-slip drive wheels: grip on icy surfaces","Stainless steel frame: corrosion-resistant","Wide temperature range: -25°C to +5°C operation","Rapid battery swap: minimize operator cold exposure"].map(s=>(
              <div key={s} className="flex items-start gap-2 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg"><CheckCircle size={14} className="text-green-600 mt-0.5 shrink-0" />{s}</div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/lead-acid-vs-lithium-battery-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Battery Comparison</Link>
            <Link href="/guides/warehouse-cleaning-equipment-complete-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Warehouse Setup</Link>
            <Link href="/guides/floor-scrubber-food-processing-plants" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Food Processing Guide</Link>
          </div>
        </section>

        <section className="p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Cold Storage Scrubber Quote</h2>
          <p className="text-gray-200 mb-6 max-w-lg mx-auto">Tell us your temperature range and floor area. We'll configure a cold-rated machine. Factory-direct pricing.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"><Send size={18} /> Get Quote</Link>
            <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing." className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"><Phone size={16} /> WhatsApp</a>
          </div>
        </section>
      </div>
    </div>
  );
}
