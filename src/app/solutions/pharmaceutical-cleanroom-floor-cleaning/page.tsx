import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Send, CheckCircle } from "@/lib/icons";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Pharmaceutical Cleanroom Floor Cleaning | GMP-Compliant Scrubbers | Aikerui",
  description: "GMP-compliant floor scrubbers for pharmaceutical cleanrooms and labs. HEPA filtration, stainless steel, chemical-resistant. ISO 14644 compatible.",
  keywords: ["pharmaceutical cleanroom floor scrubber", "GMP floor cleaning", "cleanroom scrubber", "lab floor cleaning machine"],
  alternates: { canonical: "https://aikeruiclean.com/solutions/pharmaceutical-cleanroom-floor-cleaning" },
};

export default function PharmaSolutionPage() {
  return (
    <div>
      <JsonLd data={{"@context":"https://schema.org","@type":"Article","headline":"Pharmaceutical Cleanroom Floor Cleaning","description":"GMP-compliant floor cleaning equipment for pharmaceutical cleanrooms and laboratories.","author":{"@type":"Organization","name":"Anhui Aikerui Environmental Protection Technology CO.,LTD"}}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
        {"@type":"Question","name":"What floor scrubber is suitable for pharmaceutical cleanrooms?","acceptedAnswer":{"@type":"Answer","text":"A compact walk-behind scrubber with HEPA H13/H14 filtration, stainless steel components, and chemical-resistant seals. Must be compatible with GMP cleaning validation protocols."}},
        {"@type":"Question","name":"Do cleanroom scrubbers require HEPA filtration?","acceptedAnswer":{"@type":"Answer","text":"Yes. HEPA filtration on the vacuum exhaust captures 99.97% of particles ≥0.3μm, preventing aerosolized contamination — a critical requirement for ISO 14644 Class 5-8 cleanrooms."}},
      ]}} />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Pharmaceutical Cleanroom Floor Cleaning</h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">GMP-compliant floor scrubbers for ISO 5-8 cleanrooms. HEPA filtration, 316L stainless steel, full chemical compatibility with sporicidal agents and disinfectants.</p>
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"><Send size={18} /> Get Cleanroom Equipment Quote</Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cleanroom Floor Cleaning Requirements</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Pharmaceutical facilities operate under strict GMP (Good Manufacturing Practice) regulations. Floor cleaning isn't just about appearance — it's a validated process with documented protocols, specified chemicals, and particle count limits. The cleaning equipment itself must not introduce contamination.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {["HEPA H13/H14 filtration on vacuum exhaust","316L stainless steel all wetted parts","Smooth, crevice-free design for CIP compatibility","Chemical-resistant seals (Viton/PTFE)","Validatable cleaning logs and documentation","ISO 14644 Class 5-8 compatible"].map(s=>(
              <div key={s} className="flex items-start gap-2 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg"><CheckCircle size={14} className="text-green-600 mt-0.5 shrink-0" />{s}</div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/hospital-medical-facility-floor-cleaning-equipment" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Healthcare Facility Guide</Link>
            <Link href="/guides/floor-scrubber-food-processing-plants" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Food Processing Guide</Link>
            <Link href="/guides/floor-scrubber-maintenance-checklist" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Maintenance Checklist</Link>
          </div>
        </section>

        <section className="p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">GMP Cleaning Equipment Quote</h2>
          <p className="text-gray-200 mb-6 max-w-lg mx-auto">Tell us your cleanroom classification and cleaning protocols. We'll configure a compliant machine. Factory-direct pricing.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/industrial-floor-scrubber-quote" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"><Send size={18} /> Get Quote</Link>
            <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing." className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"><Phone size={16} /> WhatsApp</a>
          </div>
        </section>
      </div>
    </div>
  );
}
