"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Factory, Truck, BadgeCheck, Phone, Send, CheckCircle, MapPin } from "@/lib/icons";
import { JsonLd } from "@/components/json-ld";
import { YouTubeLink } from "@/components/youtube-link";
import { ReviewForm } from "@/components/review-form";
import { ReviewsDisplay } from "@/components/reviews-display";
import { persistAttribution, attachAttribution } from "@/lib/attribution";

// ── 整机产品线（自然流主询价页：以整机为核心）──
const MACHINES = [
  {
    name: "Walk-Behind Scrubbers",
    img: "/images/WALK-BEHIND-K500.webp",
    desc: 'Compact 17"-28" decks for aisles, retail and mid-size floors',
    href: "/floor-scrubbers",
  },
  {
    name: "Ride-On Scrubbers",
    img: "/images/RIDE-ON-A860.webp",
    desc: 'High-productivity 28"-40" decks for warehouses and large areas',
    href: "/floor-scrubbers",
  },
  {
    name: "Floor Sweepers",
    img: "/images/RIDE-ON-S1250.webp",
    desc: "Ride-on and walk-behind sweepers for dry debris and dust",
    href: "/floor-sweepers",
  },
  {
    name: "Carpet Extractors",
    img: "/images/WALK-BEHIND-D15.webp",
    desc: "Deep carpet and upholstery extraction for hotels and offices",
    href: "/carpet-extractors",
  },
];

// 应用场景（替代"兼容品牌"——整机买家的真实决策维度）
const APPLICATIONS = [
  { name: "Warehouse & Logistics", href: "/solutions/warehouse-floor-cleaning" },
  { name: "Factory & Production", href: "/solutions/factory-floor-cleaning" },
  { name: "Supermarket & Retail", href: "/solutions/supermarket-floor-cleaning" },
  { name: "Shopping Mall", href: "/solutions/shopping-mall-floor-cleaning" },
  { name: "Airport & Transit", href: "/solutions/airport-floor-cleaning" },
  { name: "Hotel & Hospitality", href: "/solutions/hotel-floor-cleaning" },
  { name: "Hospital & Healthcare", href: "/solutions/pharmaceutical-cleanroom-floor-cleaning" },
  { name: "Cold Storage", href: "/solutions/cold-storage-floor-cleaning" },
];

// 首屏价格带（与站内 guides 口径一致：整机见 how-much-does-floor-scrubber-cost，配件见 The Price Reality 段）
const PRICE_BANDS = [
  { item: 'Walk-behind scrubber, 17-28"', dealer: "$3,000-12,000", direct: "30-40% less", lead: "15-30 days" },
  { item: 'Ride-on scrubber, 28-50"', dealer: "$9,000-35,000", direct: "$6,000-24,000", lead: "15-30 days" },
  { item: "Auto scrubber brush (disc / roller)", dealer: "$100-250 / $120-300", direct: "$45-75 / $55-95", lead: "In stock, 24-48h" },
  { item: "Squeegee blade / pad driver", dealer: "$25-90", direct: "$10-40", lead: "In stock, 24-48h" },
];

// 配件速查表（尺寸与兼容口径取自站内配件指南，避免与 /parts 页产生数字冲突）
const PARTS_TABLE = [
  { part: "Disc brush", sizes: '13-28"', direct: "$45-75", dealer: "$100-250", fits: "NP-9200 2-lug: Tennant, Nilfisk, Viper, Comac (Karcher with adapter)" },
  { part: "Roller brush", sizes: "Matched to deck width", direct: "$55-95", dealer: "$120-300", fits: "Roller-deck walk-behind and ride-on scrubbers" },
  { part: "Squeegee blade", sizes: '24-36"', direct: "$10-25", dealer: "$25-60", fits: "Straight and curved assemblies, most deck widths" },
  { part: "Pad driver", sizes: "Matched to deck width", direct: "$15-40", dealer: "$40-90", fits: "2-lug and 3-lug mounts" },
];

const FAQ = [
  [
    "Walk-behind or ride-on — which machine do I need?",
    "Walk-behind scrubbers suit floors under roughly 2,000 sqm and areas with obstacles, aisles or ramps. Ride-on machines cover 3,000-6,000 sqm per hour and are the usual choice for warehouses and large retail floors.",
  ],
  [
    "What is the difference between a scrubber and a sweeper?",
    "A scrubber applies solution, scrubs and vacuums up the dirty water, so it cleans and leaves the floor dry. A sweeper only collects dry debris. For mixed environments we also supply scrubber-sweeper combination machines.",
  ],
  [
    "Can you supply auto scrubber parts and brushes after purchase?",
    "Yes. We make auto scrubber parts in the same factory as our machines — disc and roller brushes, squeegee blades and pad drivers. Consumables therefore cost less than third-party parts.",
  ],
  [
    "How much does a machine or a part cost?",
    "A walk-behind scrubber runs $3,000-12,000 and a ride-on $9,000-35,000 at dealer prices; our factory-direct price is 30-40% lower. Disc brushes are $45-75 and squeegee blades $10-25. Send your requirement for a fixed quote.",
  ],
  [
    "What is the MOQ and lead time?",
    "For stock models, MOQ is typically 1 unit for sample evaluation and 5+ units for wholesale pricing. Lead time is 15-30 days depending on model and customization. In-stock brushes and blades ship in 24-48 hours.",
  ],
  [
    "Do you offer OEM branding on machines?",
    "Yes. We apply your brand, colour scheme and specification sheet for volume orders, produced on the same line as our own models. CE certification is included.",
  ],
  [
    "How do I know which model fits my floor area?",
    "Send us your floor area, surface type and daily cleaning hours. We recommend the right working width and tank size, and quote factory-direct — usually within 24 hours.",
  ],
];

export default function FloorScrubberQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", machineModel: "", brushType: "", quantity: "", message: "" });

  // Capture GCLID / UTM from the landing URL once on mount (persisted for later submissions)
  useEffect(() => {
    persistAttribution();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const body = attachAttribution({ ...form, product: "Industrial Floor Scrubber (Organic Quote)" });
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      if (typeof window !== "undefined") {
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event: "quote_submit", product: "Industrial Floor Scrubber (Organic Quote)" });
        w.dataLayer.push(["event", "conversion", { send_to: "AW-18359776225/AKHbCP6CodwcEOHnz7JE" }]);

        // 增强型转化：Ads 后台已启用 → 发送用户数据提升匹配率（gtag 自动哈希）
        const sendUserData = () => {
          const email = String(form.email || "").trim().toLowerCase();
          const phone = String(form.phone || "").replace(/[^\d+]/g, "");
          if (email || phone) {
            w.gtag("set", "user_data", {
              ...(email ? { email } : {}),
              ...(phone ? { phone_number: phone } : {}),
            });
          }
        };

        const fireConversion = () => {
          if (typeof w.gtag === "function") {
            sendUserData();
            w.gtag("event", "conversion", { send_to: "AW-18359776225/AKHbCP6CodwcEOHnz7JE" });
          }
        };
        fireConversion();
        if (typeof w.gtag !== "function") {
          let tries = 0;
          const retry = setInterval(() => {
            tries++;
            if (typeof w.gtag === "function") {
              clearInterval(retry);
              sendUserData();
              w.gtag("event", "conversion", { send_to: "AW-18359776225/AKHbCP6CodwcEOHnz7JE" });
            } else if (tries >= 15) {
              clearInterval(retry);
            }
          }, 200);
        }
      }
    } catch {
      alert("Something went wrong. Please WhatsApp us: +86 199 6523 6428");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Floor Scrubber & Auto Scrubber Parts Quote",
          description:
            "Get factory-direct pricing on floor scrubbers and sweepers, plus auto scrubber parts and brushes from the same factory. CE certified, OEM available.",
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-4">
            <Factory size={14} /> Factory-Direct — No Middlemen
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Industrial Floor Scrubbers, Sweepers &amp; Auto Scrubber Parts — Factory Direct Price
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-8">
            We manufacture walk-behind and ride-on floor scrubbers, industrial sweepers and carpet
            extractors. Every machine is built in our own ISO 9001 factory in Anqing, China, and we
            ship to 50+ countries. Buy direct at 30-50% below dealer pricing.
          </p>
          <a href="#form" className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors text-lg shadow-lg">
            <Send size={18} /> Get Your Machine Quote
          </a>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-gray-50 border-b py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {[
            { icon: BadgeCheck, text: "CE & ISO 9001 Certified" },
            { icon: Factory, text: "10,000+㎡ Own Factory" },
            { icon: Truck, text: "Ships to 50+ Countries" },
          ].map(i => (
            <span key={i.text} className="flex items-center gap-1.5"><i.icon size={14} className="text-green-600"/>{i.text}</span>
          ))}
        </div>
      </section>

      {/* ── 首屏即时信息：价格带 + 选型（降低跳出率与首屏即走的比例）── */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            Floor Scrubber &amp; Auto Scrubber Parts Prices at a Glance
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            These are direct-from-factory ranges, not dealer list prices. Tell us your floor area or
            the part you need and we confirm the exact model, price and lead time within 24 hours.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse bg-white rounded-xl overflow-hidden border border-gray-200">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left font-semibold">What you need</th>
                  <th className="p-3 text-left font-semibold">Typical dealer price</th>
                  <th className="p-3 text-left font-semibold">Our factory-direct price</th>
                  <th className="p-3 text-left font-semibold">Lead time</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_BANDS.map((r, i) => (
                  <tr key={r.item} className={i % 2 ? "bg-gray-50 border-b border-gray-200" : "border-b border-gray-200"}>
                    <td className="p-3 font-medium text-gray-900">{r.item}</td>
                    <td className="p-3 text-gray-500 line-through">{r.dealer}</td>
                    <td className="p-3 font-semibold text-green-700">{r.direct}</td>
                    <td className="p-3 text-gray-600">{r.lead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-10 text-center">
            {[
              { t: "MOQ 1 unit", d: "Order a sample machine before committing to volume" },
              { t: "Reply in 24 hours", d: "Model recommendation and fixed price, from the factory" },
              { t: "30-50% below dealers", d: "No importer margin, spare parts from the same line" },
            ].map(b => (
              <div key={b.t} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="font-semibold text-gray-900">{b.t}</p>
                <p className="text-xs text-gray-600 mt-1">{b.d}</p>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
            Walk-Behind or Ride-On? Choose by Floor Area
          </h3>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
            The single biggest factor in choosing a scrubber is how much floor you clean per shift.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse bg-white rounded-xl overflow-hidden border border-gray-200">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left font-semibold">Machine Type</th>
                  <th className="p-3 text-left font-semibold">Best For</th>
                  <th className="p-3 text-left font-semibold">Coverage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200"><td className="p-3 font-medium">Walk-Behind</td><td className="p-3 text-gray-600">Aisles, retail, restaurants, under 2,000 sqm</td><td className="p-3 text-gray-600">~1,500-2,500 sqm/h</td></tr>
                <tr className="border-b border-gray-200 bg-gray-50"><td className="p-3 font-medium">Ride-On</td><td className="p-3 text-gray-600">Warehouses, malls, airports, over 3,000 sqm</td><td className="p-3 text-gray-600">~3,000-6,000 sqm/h</td></tr>
                <tr><td className="p-3 font-medium">Sweeper</td><td className="p-3 text-gray-600">Dry debris, dust, packaging, outdoor areas</td><td className="p-3 text-gray-600">~8,000-20,000 sqm/h</td></tr>
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <a href="#form" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors text-sm">
              <Send size={16} /> Ask for the exact price of your machine
            </a>
          </div>
        </div>
      </section>

      {/* ── Machine range ── */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            Our Floor Cleaning Machine Range
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            We design, manufacture and test every machine in our Anqing facility before export.
            Working widths run from 17" walk-behind units to 40" ride-on platforms.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {MACHINES.map(p => (
              <a key={p.name} href={p.href} className="text-center p-4 rounded-xl border border-gray-200 hover:border-primary transition-colors block">
                <div className="aspect-square rounded-lg bg-gray-50 overflow-hidden mb-3 relative">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-3" sizes="200px" />
                </div>
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Applications ── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Built for Your Facility
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Tell us your environment and we will configure the right machine — deck width, tank size,
            battery type and brush specification.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {APPLICATIONS.map(a => (
              <a key={a.name} href={a.href} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors">
                {a.name}
              </a>
            ))}
          </div>
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <p className="text-gray-700">
              Not sure which model fits? Send us your floor area, surface type and daily cleaning hours.
              We recommend the right machine and quote factory-direct — usually within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── Spare parts cross-sell ── */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Replacement Parts &amp; Consumables
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Auto scrubber parts wear out long before the machine does. Disc and roller brushes,
            squeegee blades and pad drivers are the parts you replace most often, and they decide
            how clean the floor looks after every pass. We make these auto scrubber parts on the
            same line as our machines. A replacement{" "}
            <a href="/guides/auto-scrubber-brush-guide" className="text-primary hover:underline">auto scrubber brush</a>{" "}
            therefore costs well below dealer pricing, with the same lug pattern and bristle
            specification. Send us your machine brand and model, or a photo of the part you need,
            and we confirm fit within 24 hours.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse bg-white rounded-xl overflow-hidden border border-gray-200">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left font-semibold">Part</th>
                  <th className="p-3 text-left font-semibold">Common sizes</th>
                  <th className="p-3 text-left font-semibold">Factory-direct</th>
                  <th className="p-3 text-left font-semibold">Dealer price</th>
                  <th className="p-3 text-left font-semibold">Fits</th>
                </tr>
              </thead>
              <tbody>
                {PARTS_TABLE.map((r, i) => (
                  <tr key={r.part} className={i % 2 ? "bg-gray-50 border-b border-gray-200" : "border-b border-gray-200"}>
                    <td className="p-3 font-medium text-gray-900">{r.part}</td>
                    <td className="p-3 text-gray-600">{r.sizes}</td>
                    <td className="p-3 font-semibold text-green-700">{r.direct}</td>
                    <td className="p-3 text-gray-500 line-through">{r.dealer}</td>
                    <td className="p-3 text-gray-600">{r.fits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Disc Brushes", img: "/images/categories/Disc-Brush.webp", href: "/parts/disc-brushes" },
              { name: "Roller Brushes", img: "/images/categories/Roller-Brush.webp", href: "/parts/roller-brushes" },
              { name: "Squeegee Blades", img: "/images/categories/Squeegee-Rubber.webp", href: "/parts/squeegee-blades" },
            ].map(p => (
              <a key={p.name} href={p.href} className="text-center p-4 rounded-xl border border-gray-200 bg-white hover:border-primary transition-colors block">
                <div className="aspect-square rounded-lg bg-gray-50 overflow-hidden mb-3 relative">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-3" sizes="200px" />
                </div>
                <p className="font-semibold text-gray-900">{p.name}</p>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/parts" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-colors text-sm">
              Browse All Replacement Parts
            </a>
          </div>
        </div>
      </section>

      {/* ── Price highlight ── */}
      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg font-bold text-gray-900 mb-1">Don't Pay Dealer Markup</p>
          <p className="text-gray-600">
            Importers add two layers of margin before a machine reaches you. We build our own
            machines, so you pay factory price. Every order includes CE certification, spare-part
            support and OEM options.
          </p>
        </div>
      </section>

      {/* ── Video ── */}
      <section className="py-8 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-4">Inside Our Factory</h2>
          <YouTubeLink videoId="factorytour01" title="Aikerui Factory Tour, Floor Scrubber Manufacturing" />
        </div>
      </section>

      {/* ── Related Guides ── */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/guides/how-much-does-floor-scrubber-cost" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Floor Scrubber Cost 2026</a>
            <a href="/guides/industrial-floor-scrubber-complete-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Buyer's Guide</a>
            <a href="/guides/walk-behind-vs-ride-on-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Walk-Behind vs Ride-On</a>
            <a href="/guides/top-floor-scrubber-brands-buyers-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Brands Compared</a>
            <a href="/guides/auto-scrubber-brush-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Auto Scrubber Brush Guide</a>
            <a href="/floor-scrubber-price-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Price Guide</a>
            <a href="/floor-scrubbers" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">All Scrubber Models</a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Floor Scrubber Buyer FAQs</h2>
          <div className="space-y-3">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold text-gray-900 pr-4">{q}</h3>
                  <span className="text-primary shrink-0">+</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-gray-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section id="form" className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Get Your Machine Quote</h2>
          <p className="text-sm text-gray-500 text-center mb-8">4 fields to fill — reply within 24 hours, from a real factory, not a middleman</p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Company trust info */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-3">Who You're Dealing With</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Anhui Aikerui Environmental Protection Technology Co., Ltd. — a floor scrubber and
                  sweeper manufacturer in Anqing, China since 2008. We own the production line, so you
                  buy direct with no dealer markup.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><Factory size={16} className="text-primary shrink-0 mt-0.5" /> 10,000+ sqm factory, 50-100 employees</li>
                  <li className="flex items-start gap-2"><CheckCircle size={16} className="text-primary shrink-0 mt-0.5" /> ISO 9001 &amp; CE certified</li>
                  <li className="flex items-start gap-2"><CheckCircle size={16} className="text-primary shrink-0 mt-0.5" /> Spare parts and brushes from the same factory</li>
                  <li className="flex items-start gap-2"><CheckCircle size={16} className="text-primary shrink-0 mt-0.5" /> Exported to 50+ countries</li>
                  <li className="flex items-start gap-2"><MapPin size={16} className="text-primary shrink-0 mt-0.5" /> Yuantan, Anqing, Anhui, China</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-3">How It Works</h3>
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-3"><span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span> Tell us your floor area, surface type and daily cleaning hours</li>
                  <li className="flex gap-3"><span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span> We recommend the right model and send factory-direct pricing</li>
                  <li className="flex gap-3"><span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span> Order a sample unit or bulk — CE certified, shipped worldwide</li>
                </ol>
              </div>

              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 text-center">
                <p className="text-sm font-semibold text-gray-800">Save 30-50% vs dealer prices</p>
                <p className="text-xs text-gray-600 mt-1">Factory-direct. No middlemen. Spare parts included.</p>
              </div>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
              <p className="text-sm text-gray-500 mb-6">Fill 4 fields and get a reply within 24 hours</p>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
                  <p className="font-bold text-gray-900 text-lg mb-1">Quote Request Received!</p>
                  <p className="text-sm text-gray-600">We'll reply within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="name" required placeholder="Your Name *" value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  <input type="email" name="email" required placeholder="Email Address *" value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  <select name="brushType" required value={form.brushType}
                    onChange={e => setForm({...form, brushType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                    <option value="">What do you need? *</option>
                    <option>Walk-behind floor scrubber</option>
                    <option>Ride-on floor scrubber</option>
                    <option>Floor sweeper</option>
                    <option>Carpet extractor</option>
                    <option>Scrubber + sweeper combination</option>
                    <option>Auto scrubber parts / brushes</option>
                    <option>Not sure — please advise</option>
                  </select>
                  <input type="text" name="machineModel" required placeholder="Floor area or part needed * (e.g. 5,000 sqm warehouse / NP-9200 20-inch disc brush)" value={form.machineModel}
                    onChange={e => setForm({...form, machineModel: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />

                  <details className="rounded-lg border border-gray-200 bg-gray-50">
                    <summary className="px-4 py-3 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 rounded-lg">Add optional details (company, quantity, phone)</summary>
                    <div className="p-4 pt-0 space-y-4">
                      <input type="text" name="company" placeholder="Company Name" value={form.company}
                        onChange={e => setForm({...form, company: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                      <input type="text" name="quantity" placeholder="Quantity (e.g. 1 unit / 5 units)" value={form.quantity}
                        onChange={e => setForm({...form, quantity: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                      <input type="text" name="phone" placeholder="Phone / WhatsApp" value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                      <textarea name="message" rows={3} placeholder="Floor type, cleaning hours per day, or anything else" value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                    </div>
                  </details>

                  <button type="submit" disabled={sending}
                    className="w-full py-3.5 bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors">
                    {sending ? "Sending..." : "Get Factory Price & Model Recommendation"}
                  </button>
                  <p className="text-xs text-gray-500 text-center">No newsletter, no spam. We only reply to your inquiry.</p>
                </form>
              )}

              <div className="text-center mt-4">
                <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20an%20industrial%20floor%20scrubber." target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 text-sm text-green-600 font-semibold hover:underline">
                  <Phone size={14} /> Or WhatsApp us directly
                </a>
              </div>
            </div>
          </div>

          {/* Customer review form */}
          <div className="mt-10">
            <ReviewForm />
            <ReviewsDisplay />
          </div>
        </div>
      </section>
    </div>
  );
}
