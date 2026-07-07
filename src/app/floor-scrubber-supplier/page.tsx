import type { Metadata } from "next";
import Link from "next/link";
import { Factory, Globe, BadgeCheck, Shield, Truck, Phone, Send, Clock, CheckCircle } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Floor Scrubber Manufacturer & Supplier China | Factory Direct OEM | Aikerui",
  description:
    "Direct from our 10,000+㎡ factory. CE & ISO 9001 certified floor scrubber manufacturer. OEM/ODM available. Wholesale pricing, 24h quotes, global shipping to 50+ countries.",
  keywords: [
    "floor scrubber manufacturer China",
    "floor scrubber supplier",
    "industrial floor scrubber factory",
    "OEM floor scrubber",
    "floor cleaning machine manufacturer",
    "floor scrubber wholesale",
    "China floor scrubber factory",
  ],
  alternates: { canonical: "https://aikeruiclean.com/floor-scrubber-supplier" },
};

export default function SupplierPage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Aikerui Cleaning Technology Co., Ltd.",
          description:
            "Professional floor scrubber manufacturer and supplier. 10,000+㎡ factory, CE & ISO certified, OEM/ODM available.",
          url: "https://aikeruiclean.com",
          logo: "https://aikeruiclean.com/opengraph-image",
          address: {
            "@type": "PostalAddress",
            streetAddress: "No. 058, Yuantan Road, Yuantan Town, Qianshan City",
            addressLocality: "Anqing",
            addressRegion: "Anhui",
            postalCode: "246300",
            addressCountry: "CN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+86-199-6523-6428",
            email: "info@aikeruiclean.com",
            contactType: "sales",
            availableLanguage: ["English", "Chinese"],
          },
        }}
      />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-6">
              <Factory size={14} /> Direct Manufacturer — No Middlemen
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Floor Scrubber Manufacturer & Supplier
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Buy floor scrubbers and parts direct from our 10,000+㎡ factory in
              Anhui, China. CE & ISO 9001 certified. OEM/ODM available. Export
              to 50+ countries.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/floor-scrubber-parts-quote"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
              >
                <Send size={18} /> Request a Quote
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing."
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Phone size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Why choose us */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Aikerui Over Other Chinese Floor Scrubber Suppliers?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Factory,
                title: "Real Manufacturer, Not a Trading Company",
                desc: "We own our production facility. You can visit, video tour, or send a third-party inspector. Most 'suppliers' on Alibaba are traders who add 20-30% markup.",
                highlight: "Verified: 10,000+㎡ Owned Factory",
              },
              {
                icon: BadgeCheck,
                title: "International Certifications",
                desc: "CE certified for EU market access. ISO 9001 quality management system. SGS-tested materials. RoHS compliant for environmental safety.",
                highlight: "CE · ISO 9001 · SGS · RoHS",
              },
              {
                icon: Globe,
                title: "50+ Countries Export Experience",
                desc: "Machines and parts shipped to North America, Europe, Middle East, Southeast Asia, and Africa. We handle all export documentation and logistics.",
                highlight: "Customs-Ready Export Documentation",
              },
              {
                icon: Shield,
                title: "Quality You Can Verify Before Paying",
                desc: "Request a video inspection of your specific order before shipment. Accept third-party quality inspection (SGS/Bureau Veritas). Sample orders welcome.",
                highlight: "Pre-Shipment Inspection Available",
              },
              {
                icon: Clock,
                title: "24-Hour Quote Response",
                desc: "Most Chinese suppliers take 3-5 days to quote. Our engineering team responds within 24 hours with detailed specifications and pricing.",
                highlight: "Engineer-Level Response, Not Sales Script",
              },
              {
                icon: Truck,
                title: "Parts Stocked for Fast Shipping",
                desc: "360+ replacement parts in stock at our Hefei warehouse. Express shipping available for urgent orders. No 2-week wait for consumables.",
                highlight: "360+ Parts in Stock",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.desc}</p>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                  {item.highlight}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Verification checklist */}
        <section className="mb-12 p-8 bg-amber-50 rounded-2xl border border-amber-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How to Verify Any Chinese Floor Scrubber Supplier
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Before placing an order with any Chinese supplier, verify these 5
            things. We pass all of them.
          </p>
          <div className="space-y-3">
            {[
              "✅ Request a live video factory tour — we'll walk you through production lines on WhatsApp video",
              "✅ Check business registration on Chinese government database — our license is public",
              "✅ Ask for customer references in your country — we can provide contacts",
              "✅ Order a sample unit first — we ship single units for evaluation",
              "✅ Use Trade Assurance or Letter of Credit — we accept both",
            ].map((item) => (
              <p key={item} className="text-sm text-gray-700 flex items-start gap-2">
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">
            Start Your Sourcing Journey Today
          </h2>
          <p className="text-gray-200 mb-6 max-w-lg mx-auto">
            Send us your requirements — facility size, floor type, quantity
            needed. Our engineering team will reply with a detailed proposal
            within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/floor-scrubber-parts-quote"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"
            >
              <Send size={18} /> Get Your Factory Quote
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing."
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              <Phone size={16} /> WhatsApp Video Tour
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
