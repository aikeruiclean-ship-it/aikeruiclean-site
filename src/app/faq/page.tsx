import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Floor Scrubber FAQ | Frequently Asked Questions | Aikerui",
  description:
    "Frequently asked questions about floor scrubbers. Pricing, shipping, parts, maintenance, OEM, and factory-direct buying. Get answers from the manufacturer.",
  keywords: [
    "floor scrubber FAQ",
    "floor scrubber questions",
    "scrubber buying FAQ",
    "floor scrubber shipping",
    "OEM floor scrubber questions",
  ],
  alternates: { canonical: "https://aikeruiclean.com/faq" },
};

const FAQ_DATA = [
  {
    q: "How much does a floor scrubber cost?",
    a: "Walk-behind scrubbers range from $3,000-12,000. Ride-on scrubbers range from $9,000-35,000. Factory-direct pricing saves 30-40% off dealer prices. See our complete <a href='/guides/how-much-does-floor-scrubber-cost'>Cost Guide</a> for detailed breakdowns.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. We export to 50+ countries across North America, Europe, Middle East, Southeast Asia, Africa, and South America. Shipping methods include sea freight (FCL/LCL), air freight, and express courier (DHL/FedEx) for parts. Typical transit time is 25-40 days by sea, 3-7 days by air.",
  },
  {
    q: "What are your payment terms?",
    a: "We accept T/T (30% deposit, 70% before shipment), Letter of Credit (L/C), PayPal, Trade Assurance (Alibaba), Western Union, and 30/70 payment terms. Payment details are confirmed on your proforma invoice.",
  },
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "Standard models: MOQ is 1 unit — sample orders are welcome. Custom/OEM orders: MOQ varies by specification, typically 5-50 units. Parts and consumables: MOQ is 1 piece for most items.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard models in stock ship within 5-10 working days. Custom orders take 15-30 working days depending on configuration. Parts ship within 48 hours. Transit time depends on your shipping method and destination.",
  },
  {
    q: "What warranty do you offer?",
    a: "All machines come with a 1-year warranty on manufacturing defects. Extended warranty options are available. Warranty covers parts; labor is not covered internationally. We provide technical support and replacement parts throughout the warranty period.",
  },
  {
    q: "Can I visit your factory?",
    a: "Yes, we welcome factory visits. You can also request a live video tour via WhatsApp — we'll walk you through our production lines, show you machines being built, and answer your questions in real-time. Third-party inspection (SGS/Bureau Veritas) is also available.",
  },
  {
    q: "Are your parts compatible with Tennant / Nilfisk / Karcher?",
    a: "Yes. Our replacement parts — disc brushes, squeegee rubber, pad holders, clutch plates, and more — are compatible with Tennant, Nilfisk, Karcher, Comac, Viper, Hako, Fimap, IPC, and 15+ other major brands. Send us your OEM part number for confirmation.",
  },
  {
    q: "Do you offer OEM / private label manufacturing?",
    a: "Yes. We provide OEM and ODM services including custom branding, color options, specification modifications, and private label packaging. MOQ for OEM orders starts at 5-50 units depending on the level of customization.",
  },
  {
    q: "What certifications do your machines have?",
    a: "Our machines are CE certified (European Conformity) and manufactured in an ISO 9001:2015 certified facility. Materials are SGS tested and RoHS compliant. Certification documents are provided with every shipment.",
  },
  {
    q: "How do I order replacement parts?",
    a: "Browse our <a href='/parts'>360+ parts catalog</a> or send us your OEM part number, machine model, and a photo of the existing part. We'll confirm compatibility and provide a quote within 24 hours. Express shipping available for urgent orders.",
  },
  {
    q: "What is the difference between disc brush and roller brush scrubbers?",
    a: "Disc brush scrubbers use flat rotating brushes — best for smooth, even floors like sealed concrete and tile. Roller brush scrubbers use horizontal cylinders — better for textured floors, grout lines, and uneven surfaces. Read our <a href='/guides/disc-brush-vs-roller-brush-scrubber'>full comparison guide</a>.",
  },
  {
    q: "Should I choose lead-acid or lithium batteries?",
    a: "Lead-acid: lower upfront cost ($400-800), 1-3 year lifespan, requires monthly maintenance. Lithium: higher upfront ($1,200-2,400), 3-5 year lifespan, zero maintenance, charges 3x faster. For multi-shift operations, lithium is recommended. See our <a href='/guides/lead-acid-vs-lithium-battery-scrubber'>battery comparison guide</a>.",
  },
  {
    q: "How often should I replace squeegee blades?",
    a: "Squeegee blades typically last 2-4 months with daily use. Replace when the edge becomes rounded (no longer square), visible cracks appear, or water is left on the floor after cleaning. Most blades can be rotated once before full replacement to double their lifespan.",
  },
  {
    q: "How do I get a quote?",
    a: "Fill out the form on our <a href='/floor-scrubber-parts-quote'>Get a Quote</a> page, email us at <a href='mailto:info@aikeruiclean.com'>info@aikeruiclean.com</a>, or WhatsApp us at <a href='https://wa.me/8619965236428'>+86 199 6523 6428</a>. We respond within 24 hours with detailed pricing, specifications, and shipping options.",
  },
];

export default function FAQPage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_DATA.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a.replace(/<[^>]*>/g, ""),
            },
          })),
        }}
      />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Common questions about floor scrubber pricing, shipping, parts,
            warranty, and factory-direct purchasing.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {FAQ_DATA.map((item, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <h2 className="text-base font-semibold text-gray-900 pr-4">
                  {item.q}
                </h2>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg shrink-0">
                  ▼
                </span>
              </summary>
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: item.a }} />
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 p-8 bg-primary text-white rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-gray-200 mb-6">
            Contact us directly. We&lsquo;re happy to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/8619965236428"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
