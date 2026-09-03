"use client";

import { useState } from "react";
import Image from "next/image";
import { Factory, Truck, BadgeCheck, Phone, Send, CheckCircle, MapPin } from "@/lib/icons";
import { JsonLd } from "@/components/json-ld";
import { YouTubeLink } from "@/components/youtube-link";
import { ReviewForm } from "@/components/review-form";
import { ReviewsDisplay } from "@/components/reviews-display";

const BRUSHES = [
  { name: "Disc Brush", img: "/images/categories/Disc-Brush.webp", desc: "Flat rotary brushes for walk-behind & ride-on scrubbers" },
  { name: "Roller Brush", img: "/images/categories/Roller-Brush.webp", desc: "Cylindrical brushes for horizontal-rotation machines" },
  { name: "Side Brush", img: "/images/categories/Sweeper-Side-Brush.webp", desc: "Edge-cleaning brushes for walls and corners" },
  { name: "Shampoo Disc Brush", img: "/images/categories/Shampoo-Disc-Brush.webp", desc: "Shampoo brushes for carpet & deep cleaning" },
];

const PARTS = [
  { name: "Squeegee Rubber", img: "/images/categories/Squeegee-Rubber.webp", desc: "Blades that recover water after scrubbing" },
  { name: "Pad Driver", img: "/images/categories/Pad-Driver.webp", desc: "Connects motor shaft to brush or pad" },
  { name: "Clutch Plate", img: "/images/categories/Clutch-Plate.webp", desc: "Transmission parts for brush drive systems" },
];

export default function PartsQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", machineModel: "", brushType: "", quantity: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, product: "Floor Scrubber Parts (Ad Landing)" }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      // Push conversion events — GTM object format + direct gtag array format (works even if gtag not yet loaded)
      if (typeof window !== "undefined") {
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        // GTM 触发器格式
        w.dataLayer.push({ event: "quote_submit", product: "Floor Scrubber Parts (Ad Landing)" });
        // gtag.js 原生格式（数组）— gtag.js 加载后会自动处理队列中未消费的数组事件
        w.dataLayer.push(["event", "conversion", { send_to: "AW-18359776225/AKHbCP6CodwcEOHnz7JE" }]);
        // 若 gtag 已就绪，直接调用（双保险）
        const fireConversion = () => {
          if (typeof w.gtag === "function") {
            w.gtag("event", "conversion", { send_to: "AW-18359776225/AKHbCP6CodwcEOHnz7JE" });
          }
        };
        fireConversion();
        // 兜底：gtag 可能还没加载完（afterInteractive），轮询重试最多 3 秒
        if (typeof w.gtag !== "function") {
          let tries = 0;
          const retry = setInterval(() => {
            tries++;
            if (typeof w.gtag === "function") {
              clearInterval(retry);
              w.gtag("event", "conversion", { send_to: "AW-18359776225/AKHbCP6CodwcEOHnz7JE" });
            } else if (tries >= 15) {
              clearInterval(retry);
            }
          }, 200);
        }
      }
    } catch {
      alert("Please WhatsApp us: +86 199 6523 6428");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Floor Scrubber Brushes & Replacement Parts Factory Direct",
        description: "Factory-direct floor scrubber brushes and parts. Disc brushes, roller brushes, squeegee rubber, pad holders. 30-50% less than dealer. OEM quality, global shipping.",
      }} />

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How long does a floor scrubber brush last?", acceptedAnswer: { "@type": "Answer", text: "With daily use on smooth floors, a brush lasts 3-6 months. On rough concrete, expect 1-3 months. Replace it when bristles are flattened or under 12 mm." } },
          { "@type": "Question", name: "Which floor scrubber brush fits my machine?", acceptedAnswer: { "@type": "Answer", text: "Match the diameter and mounting system. The NP-9200 2-lug standard fits most Tennant, Nilfisk, Viper and Chinese OEM machines. Send us your machine model and we confirm compatibility within 24 hours." } },
          { "@type": "Question", name: "What is the difference between nylon and PPL brushes?", acceptedAnswer: { "@type": "Answer", text: "Nylon is the daily default for most floors. PPL is stiffer for heavy grease on unsealed concrete. Use nylon on sealed or polished floors to avoid scratches." } },
          { "@type": "Question", name: "Do you offer OEM or private label brushes?", acceptedAnswer: { "@type": "Answer", text: "Yes. We make custom brushes with your branding, bristle material and dimensions. MOQ for OEM brushes is typically 50-200 pieces." } },
          { "@type": "Question", name: "Can I order a brush sample first?", acceptedAnswer: { "@type": "Answer", text: "Yes, sample orders are welcome. In-stock samples ship within 24-48 hours, and the sample cost is deducted from your first bulk order." } },
          { "@type": "Question", name: "Do your brushes work with Tennant, Karcher or Nilfisk machines?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our brushes are compatible with Tennant, Nilfisk, Karcher, Hako, Viper, Fimap, Comac, IPC and 15+ brands. Send us your OEM part number for confirmation." } },
        ],
      }} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-4">
            <Factory size={14} /> Factory-Direct No Middlemen
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Floor Scrubber Brushes &amp; Replacement Parts — Factory Direct
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-8">
            Manufacturer of replacement floor scrubber brushes, disc brushes, roller brushes, side brushes, pad drivers and squeegee blades for commercial and industrial floor scrubber machines. Same OEM quality at 30-50% less, from our ISO 9001 factory in Anqing, China.
          </p>
          <a href="#form" className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors text-lg shadow-lg">
            <Send size={18} /> Get Your Quote Now
          </a>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-gray-50 border-b py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {[
            { icon: BadgeCheck, text: "CE & ISO 9001 Certified" },
            { icon: Factory, text: "10,000+㎡ Factory" },
            { icon: Truck, text: "Global Shipping, 360+ Parts in Stock" },
          ].map(i => (
            <span key={i.text} className="flex items-center gap-1.5"><i.icon size={14} className="text-green-600"/>{i.text}</span>
          ))}
        </div>
      </section>

      {/* Floor Scrubber Brushes */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            Floor Scrubber Brushes for Commercial &amp; Industrial Machines
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            We manufacture replacement floor scrubber brushes in different diameters, bristle materials, hardness levels and mounting configurations, to match different machines and cleaning applications.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {BRUSHES.map(p => (
              <div key={p.name} className="text-center p-4 rounded-xl border border-gray-200 hover:border-primary transition-colors">
                <div className="aspect-square rounded-lg bg-gray-50 overflow-hidden mb-3 relative">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-3" sizes="200px" />
                </div>
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brush Material */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Choose the Right Floor Scrubber Brush Material
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            We manufacture brushes in four bristle materials for different cleaning jobs and floor types.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left font-semibold">Material</th>
                  <th className="p-3 text-left font-semibold">Best Application</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200"><td className="p-3 font-medium">Nylon</td><td className="p-3 text-gray-600">Daily cleaning and general floor maintenance</td></tr>
                <tr className="border-b border-gray-200 bg-gray-50"><td className="p-3 font-medium">PPL (Polypropylene)</td><td className="p-3 text-gray-600">Heavy-duty cleaning and grease removal</td></tr>
                <tr className="border-b border-gray-200"><td className="p-3 font-medium">Abrasive (Silicon Carbide)</td><td className="p-3 text-gray-600">Stripping and aggressive cleaning</td></tr>
                <tr className="border-b border-gray-200 bg-gray-50"><td className="p-3 font-medium">Steel Wire</td><td className="p-3 text-gray-600">Heavy industrial cleaning on rough concrete</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Machine Compatibility */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Compatible with Major Floor Scrubber Machines
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Our brushes fit most commercial floor scrubber machines on the market, including:
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["Tennant", "Nilfisk", "Karcher", "Hako", "Viper", "Fimap", "Comac", "IPC", "Gaomei", "Dulevo"].map(b => (
              <span key={b} className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">{b}</span>
            ))}
          </div>
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <p className="text-gray-700">
              Need a replacement brush for a specific machine model? Send us your machine model, old brush photo or brush dimensions. Our team confirms compatibility before production.
            </p>
          </div>
        </div>
      </section>

      {/* Other Parts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Other Floor Scrubber Replacement Parts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PARTS.map(p => (
              <div key={p.name} className="text-center p-4 rounded-xl border border-gray-200 bg-white hover:border-primary transition-colors">
                <div className="aspect-square rounded-lg bg-gray-50 overflow-hidden mb-3 relative">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-3" sizes="200px" />
                </div>
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/parts" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-colors text-sm">
              Browse All 360+ Parts
            </a>
          </div>
        </div>
      </section>

      {/* Price highlight */}
      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg font-bold text-gray-900 mb-1">Don't Overpay for OEM Parts</p>
          <p className="text-gray-600">
            Dealer price: $150/disc brush → <span className="text-green-700 font-bold">Our price: $45-75</span>. Same nylon/PPL materials. Same quality. Just no dealer markup.
          </p>
        </div>
      </section>

      {/* Video */}
      <section className="py-8 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-4">See Our Clutch Plates & Pad Drivers in Action</h2>
          <YouTubeLink videoId="factorytour" title="Aikerui Factory Tour, Floor Scrubber Manufacturing" />
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/guides/floor-scrubber-parts-guide-types-lifespan-cost" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Parts Guide: Types &amp; Cost</a>
            <a href="/guides/oem-vs-aftermarket-floor-scrubber-parts" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">OEM vs Aftermarket</a>
            <a href="/guides/floor-scrubber-clutch-plate-pad-driver-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Clutch Plate Guide</a>
            <a href="/guides/squeegee-not-picking-up-water" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Squeegee Fix Guide</a>
            <a href="/guides/disc-brush-vs-roller-brush-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Disc vs Roller Brush</a>
            <a href="/guides/how-much-does-floor-scrubber-cost" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">Cost Guide 2026</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Floor Scrubber Brush FAQs</h2>
          <div className="space-y-3">
            {[
              ["How long does a floor scrubber brush last?", "With daily use on smooth floors, a brush lasts 3-6 months. On rough concrete, expect 1-3 months. Replace it when bristles are flattened or under 12 mm."],
              ["Which floor scrubber brush fits my machine?", "Match the diameter and mounting system. The NP-9200 2-lug standard fits most Tennant, Nilfisk, Viper and Chinese OEM machines. Send us your machine model and we confirm compatibility within 24 hours."],
              ["What is the difference between nylon and PPL brushes?", "Nylon is the daily default for most floors. PPL is stiffer for heavy grease on unsealed concrete. Use nylon on sealed or polished floors to avoid scratches."],
              ["Do you offer OEM or private label brushes?", "Yes. We make custom brushes with your branding, bristle material and dimensions. MOQ for OEM brushes is typically 50-200 pieces."],
              ["Can I order a brush sample first?", "Yes, sample orders are welcome. In-stock samples ship within 24-48 hours, and the sample cost is deducted from your first bulk order."],
              ["Do your brushes work with Tennant, Karcher or Nilfisk machines?", "Yes. Our brushes are compatible with Tennant, Nilfisk, Karcher, Hako, Viper, Fimap, Comac, IPC and 15+ brands. Send us your OEM part number for confirmation."],
            ].map(([q, a]) => (
              <details key={q} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
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

      {/* Form */}
      <section id="form" className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Get Your Parts Quote</h2>
          <p className="text-sm text-gray-500 text-center mb-8">Reply within 24 hours — from a real factory, not a middleman</p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Company trust info */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-3">Who You're Dealing With</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Anhui Aikerui Environmental Protection Technology Co., Ltd — a floor scrubber
                  brush and parts factory in Anqing, China since 2008. We own the production line,
                  so you buy direct with no dealer markup.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><Factory size={16} className="text-primary shrink-0 mt-0.5" /> 10,000+ sqm factory, 50-100 employees</li>
                  <li className="flex items-start gap-2"><CheckCircle size={16} className="text-primary shrink-0 mt-0.5" /> ISO 9001 &amp; CE certified</li>
                  <li className="flex items-start gap-2"><CheckCircle size={16} className="text-primary shrink-0 mt-0.5" /> 360+ parts in stock, ships in 24-48h</li>
                  <li className="flex items-start gap-2"><CheckCircle size={16} className="text-primary shrink-0 mt-0.5" /> Exported to 50+ countries</li>
                  <li className="flex items-start gap-2"><MapPin size={16} className="text-primary shrink-0 mt-0.5" /> Yuantan, Anqing, Anhui, China</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-3">How It Works</h3>
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-3"><span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span> Tell us your machine model or OEM part number</li>
                  <li className="flex gap-3"><span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span> We confirm compatibility and send factory-direct pricing</li>
                  <li className="flex gap-3"><span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span> Order samples or bulk — shipped worldwide in 24-48h</li>
                </ol>
              </div>

              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 text-center">
                <p className="text-sm font-semibold text-gray-800">Save 30-50% vs dealer prices</p>
                <p className="text-xs text-gray-600 mt-1">Factory-direct. No middlemen. Same OEM quality.</p>
              </div>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
              <p className="text-sm text-gray-500 mb-6">Fill the form and get a reply within 24 hours</p>

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
                  <input type="text" name="company" placeholder="Company Name" value={form.company}
                    onChange={e => setForm({...form, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  <input type="text" name="machineModel" placeholder="Machine Brand & Model (e.g. Tennant T7, Karcher BD50)" value={form.machineModel}
                    onChange={e => setForm({...form, machineModel: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  <select name="brushType" value={form.brushType}
                    onChange={e => setForm({...form, brushType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                    <option value="">Brush Type (optional)</option>
                    <option>Disc Brush</option>
                    <option>Roller Brush</option>
                    <option>Side Brush</option>
                    <option>Squeegee Blade</option>
                    <option>Pad Driver</option>
                    <option>Other / Not sure</option>
                  </select>
                  <input type="text" name="quantity" placeholder="Quantity Needed" value={form.quantity}
                    onChange={e => setForm({...form, quantity: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  <input type="text" name="phone" placeholder="Phone / WhatsApp" value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  <textarea name="message" rows={4} placeholder="Part details, old brush photo link, or anything else (optional)" value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                  <button type="submit" disabled={sending}
                    className="w-full py-3.5 bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors">
                    {sending ? "Sending..." : "Check Compatibility & Get Factory Quote"}
                  </button>
                </form>
              )}

              <div className="text-center mt-4">
                <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20parts." target="_blank" rel="noopener"
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
