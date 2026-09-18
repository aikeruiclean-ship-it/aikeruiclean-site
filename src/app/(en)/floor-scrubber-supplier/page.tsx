import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://aikeruiclean.com";

const TITLE = "Floor Scrubber Supplier | Factory Direct from China | Aikerui";
const DESCRIPTION =
  "Source industrial floor scrubbers direct from the Chinese factory that builds them. 30+ models, 360+ spare parts, CE and ISO 9001, OEM support, 50+ countries served.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/floor-scrubber-supplier` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/floor-scrubber-supplier`,
    type: "website",
  },
};

const COMPARISON = [
  ["Who you buy from", "The factory that builds the machine", "A reseller who buys from a factory"],
  ["Pricing", "Factory-direct, no dealer markup", "Factory price plus trading margin"],
  ["Spare parts", "Produced on the same line", "Sourced from a third party"],
  ["OEM and private label", "Available from 1 unit upward", "Rarely offered"],
  ["Technical answers", "From the team that designs it", "Relayed from the factory"],
  ["Factory audit", "On-site or live video walkthrough", "Usually not possible"],
];

const FACTS = [
  ["Founded", "2008"],
  ["Production facility", "10,000+ square meters, Anqing, Anhui, China"],
  ["Machine models", "30+ (walk-behind, ride-on, sweepers, extractors)"],
  ["Spare parts", "360+ SKUs produced in-house"],
  ["Certification", "CE, ISO 9001"],
  ["Export markets", "50+ countries"],
  ["Middle East warehouse", "Dubai, UAE (regional stock and service)"],
  ["OEM / private label", "Available"],
];

const SUPPLY = [
  ["Industrial floor scrubbers", "Walk-behind 17-28 inch decks, ride-on 28-40 inch decks, battery or propane"],
  ["Floor sweepers", "Walk-behind and ride-on sweepers for warehouses, yards and logistics sites"],
  ["Carpet extractors", "Spot and full-width extraction machines for hospitality and offices"],
  ["Floor scrubber parts", "Disc, cylindrical and roller brushes, squeegee blades, pad holders, hoses and clutches"],
  ["OEM and private label", "Your brand, packaging and documentation on machines built to your specification"],
];

const STEPS = [
  ["1. Send your requirement", "Floor area, surface type, shift pattern and target budget. A photo of the floor or a site plan helps."],
  ["2. Receive a factory quote", "Model recommendation, unit price, MOQ, lead time and shipping terms, usually inside one working day."],
  ["3. Sample or video verification", "Order a sample unit or request a live video walkthrough of the production line before committing."],
  ["4. Production and inspection", "Your order is built, then inspected. Third-party inspection is welcome."],
  ["5. Shipping and after-sales", "Export packing, documentation and spare-part supply from the same production line."],
];

const FAQ = [
  {
    q: "Are you a factory or a trading company?",
    a: "A factory. Aikerui has manufactured floor cleaning equipment in Anqing, Anhui since 2008 and operates its own production facility of more than 10,000 square meters. Machines, brushes and most spare parts are produced in-house, which is why pricing sits below reseller levels.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "One unit for most standard models. OEM and private-label orders usually start at a small batch, depending on the branding and packaging you need. Replacement brushes and consumables ship in smaller quantities.",
  },
  {
    q: "Can I visit the factory or arrange an inspection?",
    a: "Yes. Factory visits are welcome, and if travel is not practical we run a live video walkthrough of the production line. Independent third-party inspection before shipment is also accepted without restriction.",
  },
  {
    q: "Do you supply spare parts for machines already in service?",
    a: "Yes. Brushes, squeegee blades, pad holders, hoses and clutch plates are produced on the same line as the machines, so parts stay available after the machine is delivered.",
  },
  {
    q: "Which markets do you ship to?",
    a: "Aikerui has exported to more than 50 countries, with regular shipments to North America, Europe, the Middle East, Southeast Asia and South America. A Dubai warehouse supports regional stock and faster delivery in the Gulf.",
  },
  {
    q: "How do I get pricing?",
    a: "Send your floor area, surface type and target budget through the quote form. You receive a model recommendation and factory price, normally within one working day.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Anhui Aikerui Environmental Protection Technology Co., Ltd.",
        alternateName: "Aikerui",
        url: SITE_URL,
        foundingDate: "2008",
        description:
          "Chinese manufacturer of industrial floor scrubbers, sweepers and floor cleaning equipment, exporting to 50+ countries.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Floor Scrubber Supplier",
            item: `${SITE_URL}/floor-scrubber-supplier`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
            Factory-direct supplier
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Floor Scrubber Supplier — Buying Direct from the Factory
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-200">
            Aikerui is an industrial floor scrubber manufacturer and supplier based in Anhui,
            China. We build walk-behind and ride-on scrubbers, sweepers, carpet extractors and
            the brushes and spare parts that keep them running, and we sell them direct to
            distributors, importers and facility-service companies in more than 50 countries.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/floor-scrubber-parts-quote"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Request a floor scrubber quote
            </Link>
            <Link
              href="/floor-scrubbers"
              className="rounded-lg border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-slate-400"
            >
              Browse machine models
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        {/* 对比表 */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Factory Supplier or Trading Company
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Most floor scrubber listings online come from trading companies. The price looks
            similar, but the machine, the parts and the technical answers all pass through an
            extra layer. Here is the difference that matters when you place an order.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-3 font-semibold text-slate-900">
                    Point of comparison
                  </th>
                  <th className="border border-slate-200 px-4 py-3 font-semibold text-slate-900">
                    Buying from Aikerui (factory)
                  </th>
                  <th className="border border-slate-200 px-4 py-3 font-semibold text-slate-900">
                    Buying from a trading company
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row[0]} className="even:bg-slate-50">
                    <td className="border border-slate-200 px-4 py-3 font-medium text-slate-900">
                      {row[0]}
                    </td>
                    <td className="border border-slate-200 px-4 py-3 text-slate-700">{row[1]}</td>
                    <td className="border border-slate-200 px-4 py-3 text-slate-700">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 供应商事实 */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">Supplier Profile</h2>
          <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {FACTS.map(([k, v]) => (
              <div key={k} className="border-b border-slate-100 pb-3">
                <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {k}
                </dt>
                <dd className="mt-1 text-slate-800">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 供应范围 */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">What We Supply</h2>
          <div className="mt-6 space-y-5">
            {SUPPLY.map(([k, v]) => (
              <div key={k}>
                <h3 className="font-semibold text-slate-900">{k}</h3>
                <p className="mt-1 leading-relaxed text-slate-700">{v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 采购流程 */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">How Ordering Works</h2>
          <ol className="mt-6 space-y-5">
            {STEPS.map(([k, v]) => (
              <li key={k}>
                <h3 className="font-semibold text-slate-900">{k}</h3>
                <p className="mt-1 leading-relaxed text-slate-700">{v}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 leading-relaxed text-slate-700">
            Before you commit, it is worth knowing how to verify floor scrubber manufacturer
            claims in general: ask for the production address, request a live video walkthrough,
            and confirm certifications directly rather than relying on profile pages. We expect
            the question and answer it the same way.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">Buyer Questions</h2>
          <div className="mt-6 space-y-6">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-slate-900">{f.q}</h3>
                <p className="mt-2 leading-relaxed text-slate-700">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-xl bg-slate-900 px-6 py-10 text-center">
          <h2 className="text-2xl font-bold text-white">Get Factory Pricing</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-200">
            Send your floor area, surface type and target budget. You will receive a model
            recommendation and a factory quote, normally within one working day.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/floor-scrubber-parts-quote"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Request a quote
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-slate-400"
            >
              Contact the team
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            Full machine range at aikeruiclean.com/floor-scrubbers. Spare parts and brushes at
            aikeruiclean.com/parts.
          </p>
        </section>
      </div>
    </>
  );
}
