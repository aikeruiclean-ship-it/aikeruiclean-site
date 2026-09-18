import type { Metadata } from "next";
import Link from "next/link";
import { BrushQuoteForm } from "./brush-quote-form";
import { JsonLd } from "@/components/json-ld";
import { Factory, Truck, BadgeCheck, CheckCircle, Send } from "@/lib/icons";

// Google Ads 专用落地页（brush 主题，CPC 低、ROI 可控）
// noindex：避免与 /parts/disc-brushes 等自然页抢同一批词（站内相食）
export const metadata: Metadata = {
  title: "Floor Scrubber Brushes | Factory Direct Quote | Aikerui",
  description:
    "Replacement floor scrubber brushes direct from our factory — disc, roller, side and cylindrical. Save 30-50% vs dealer. Free samples, OEM, 24-hour quote.",
  robots: { index: false, follow: true },
};

const HIGHLIGHTS = [
  { icon: Factory, title: "Factory Direct", desc: "We manufacture the brushes — no dealer margin" },
  { icon: BadgeCheck, title: "Save 30-50%", desc: "Below typical dealer and parts-house pricing" },
  { icon: Truck, title: "Free Samples", desc: "Test a brush on your machine before you commit" },
  { icon: CheckCircle, title: "24-Hour Quote", desc: "Send your model, get price + compatibility" },
];

const BRUSH_TYPES = [
  {
    name: "Disc Brushes",
    desc: 'Standard 10"-20" discs for walk-behind and ride-on scrubbers. Nylon, PP or abrasive bristle.',
    href: "/parts/disc-brushes",
  },
  {
    name: "Roller / Cylindrical Brushes",
    desc: "Pre-sweeping cylindrical brushes that sweep and scrub in one pass.",
    href: "/parts/roller-brushes",
  },
  {
    name: "Side Brushes",
    desc: "Flat-disc and cup styles for sweepers — edges and corners.",
    href: "/parts/side-brushes",
  },
  {
    name: "All Replacement Brushes",
    desc: "Full brush catalogue plus squeegees, pad holders and other parts.",
    href: "/parts",
  },
];

const FAQ = [
  {
    q: "How do I know which brush fits my machine?",
    a: "Send us the machine brand and model (for example Tennant T300 or Nilfisk SC250), or the old brush diameter plus the lug/bore pattern. We confirm compatibility before quoting.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Stock specifications start at 50-100 pieces per size. Fully custom blocks and bristle combinations start higher — we will tell you exactly once we see your requirement.",
  },
  {
    q: "Can you make brushes with our brand?",
    a: "Yes. OEM and private-label brushes are a core part of what we do — your branding on the block and packaging, to your spec.",
  },
  {
    q: "How long does shipping take?",
    a: "Stock items ship in 7-15 days after payment. Custom tooling adds 20-30 days. We ship worldwide and have a UAE hub for Middle East and Africa customers.",
  },
  {
    q: "Nylon, PP or abrasive — which bristle do I need?",
    a: "Nylon is the daily default for most floors. PP is stiffer and more economical for heavy grease on unsealed concrete. Abrasive fill is for stripping, concrete prep and heavy grime.",
  },
];

export default function BrushQuoteLandingPage() {
  return (
    <div className="bg-gray-50">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Floor Scrubber Brushes — Factory Direct Quote",
          description:
            "Replacement floor scrubber brushes direct from our factory. Disc, roller, side and cylindrical brushes. Free samples, OEM, 24-hour quotes.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      {/* ── Hero + form (首屏即转化点) ── */}
      <section className="bg-gradient-to-br from-primary to-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: copy */}
            <div className="text-white lg:pt-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-5">
                <Factory size={14} /> Verified Manufacturer — Since 2008
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                Floor Scrubber Brushes<br />
                <span className="text-accent">Factory Direct</span> — Save 30-50%
              </h1>
              <p className="text-lg text-gray-200 leading-relaxed mb-6 max-w-xl">
                Disc, roller, side and cylindrical replacement brushes for Tennant, Karcher, Nilfisk,
                Viper and most machines. Made in our own factory in Anhui, China — free samples,
                custom OEM, 24-hour quotes.
              </p>

              <ul className="space-y-2.5 mb-6">
                {[
                  "Send your machine model — we confirm compatibility",
                  "Nylon, PP and abrasive bristle options",
                  "Custom diameters, block styles and branding",
                  "Shipping to 50+ countries, UAE hub for MEA",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-gray-100">
                    <CheckCircle className="text-accent shrink-0 mt-0.5" size={17} />
                    <span className="text-sm">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck size={15} className="text-accent" /> CE &amp; ISO 9001
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Factory size={15} className="text-accent" /> 10,000+㎡ own factory
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck size={15} className="text-accent" /> 50+ countries served
                </span>
              </div>
            </div>

            {/* Right: form */}
            <div id="quote" className="lg:sticky lg:top-6 scroll-mt-24">
              <BrushQuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="bg-white rounded-xl border border-gray-200 p-5">
              <h.icon className="text-accent mb-3" size={22} />
              <h3 className="font-bold text-primary text-sm md:text-base mb-1">{h.title}</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brush types ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">What We Manufacture</h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Every brush is built to original equipment dimensions — block diameter, bore and lug pattern,
          bristle length and tuft density — so it mounts without adapters.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BRUSH_TYPES.map((b) => (
            <Link
              key={b.name}
              href={b.href}
              className="group bg-white rounded-xl border border-gray-200 hover:border-accent hover:shadow-md transition-all p-5 flex flex-col"
            >
              <h3 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                {b.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{b.desc}</p>
              <span className="text-sm text-accent font-semibold mt-3 inline-flex items-center gap-1">
                View specs →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why factory direct ── */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Why Buy Brushes From the Factory
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Most replacement brushes you buy online are made by a factory, sold to a distributor,
                  then marked up again by a parts house. We are the factory — so you skip two layers of
                  margin.
                </p>
                <p>
                  Because we control bristle sourcing and block moulding, we can also match original
                  specifications exactly, instead of selling a "close enough" universal brush that
                  wobbles or cleans unevenly.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { n: "2008", l: "Manufacturing since" },
                  { n: "50+", l: "Countries served" },
                  { n: "10,000+", l: "㎡ factory area" },
                ].map((s) => (
                  <div key={s.l} className="bg-gray-50 rounded-lg py-4">
                    <div className="text-xl md:text-2xl font-bold text-accent">{s.n}</div>
                    <div className="text-xs text-gray-600 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-primary mb-3">What to send us</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                {[
                  "Machine brand and model (or the old brush diameter)",
                  "Brush type — disc, roller, side or cylindrical",
                  "Bristle preference — nylon, PP or abrasive",
                  "Quantity and destination country",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{t}</span>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-gray-500 mt-5">
                No spec sheet? Send a photo of the old brush with a ruler next to it — that is usually enough.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Common Questions</h2>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <details key={i} className="bg-white rounded-lg border border-gray-200 p-5">
              <summary className="font-semibold text-primary cursor-pointer">{f.q}</summary>
              <p className="mt-3 text-gray-700 leading-relaxed text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Get your brush price today
          </h2>
          <p className="text-gray-300 mb-7 max-w-2xl mx-auto">
            Send your machine model or brush dimensions — we reply with pricing, compatibility
            confirmation and sample options within 24 hours.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"
            >
              <Send size={18} /> Fill the Quote Form
            </a>
            <a
              href="https://wa.me/8619965236428"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
