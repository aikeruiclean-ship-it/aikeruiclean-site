"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Factory, Truck, Clock, Shield, BadgeCheck, Repeat,
  Phone, Send, CheckCircle, Star, ArrowRight,
  Disc, Wrench, Droplets, Circle,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";

const PART_CATEGORIES = [
  { value: "Disc Brush", label: "Disc Brush", icon: Disc, count: 98 },
  { value: "Squeegee Rubber", label: "Squeegee Rubber", icon: Droplets, count: 33 },
  { value: "Pad Holder", label: "Pad Holder", icon: Circle, count: 28 },
  { value: "Roller Brush", label: "Roller Brush", icon: Disc, count: 16 },
  { value: "Side Brush", label: "Side Brush", icon: Disc, count: 15 },
  { value: "Clutch Plate", label: "Clutch Plate", icon: Wrench, count: 22 },
  { value: "Hose", label: "Hose", icon: Droplets, count: 21 },
  { value: "Other", label: "Other Part", icon: Wrench, count: 127 },
];

const COMPATIBLE_BRANDS = [
  "Tennant", "Nilfisk / Advance", "Karcher", "Comac", "Viper / Clarke",
  "Hako", "Fimap", "IPC Gansow", "Taski", "Gaomei", "Dulevo", "Weizhuo",
];

export default function PartsLandingPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", country: "",
    partCategory: "", brand: "", quantity: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          product: `Parts Inquiry: ${formData.partCategory || "Parts"} for ${formData.brand || "various brands"}`,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-XXXXXXX/YYYYYYYY",
        });
      }
    } catch {
      alert("Failed to send. Please WhatsApp us at +86 199 6523 6428");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Floor Scrubber Replacement Parts & Consumables",
        description: "Factory-direct replacement parts for floor scrubbers. Disc brushes, squeegee rubber, pad holders. Compatible with Tennant, Nilfisk, Karcher, and more. OEM quality, 30-50% less than dealer price.",
      }} />

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/categories/Disc-Brush.webp" alt="" fill className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-6">
                <Factory size={14} /> Factory-Direct Consumables
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                Floor Scrubber Parts
                <br />
                <span className="text-accent">30–50% Less Than Dealer Price</span>
              </h1>
              <p className="text-lg text-gray-200 mb-3 leading-relaxed max-w-xl">
                Disc brushes, squeegee rubber, pad holders, clutch plates — manufactured to OEM specs in our own factory.
              </p>
              <p className="text-base text-gray-300 mb-8 leading-relaxed max-w-xl">
                Compatible with <strong>Tennant, Nilfisk, Karcher, Comac, Viper, Hako</strong> and 20+ other brands. Ready stock, global shipping.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#quote-form" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors text-lg shadow-lg">
                  <Send size={18} /> Get Parts Quote Now
                </a>
                <a href="https://wa.me/8619965236428" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors text-lg">
                  <Phone size={18} /> WhatsApp
                </a>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                {[
                  { icon: BadgeCheck, text: "OEM Quality" },
                  { icon: Truck, text: "Ready Stock" },
                  { icon: Clock, text: "24h Quote" },
                ].map((item) => (
                  <span key={item.text} className="flex items-center gap-1.5 text-gray-200">
                    <item.icon size={16} className="text-accent" /> {item.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero right: key numbers */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { number: "360+", label: "Parts in Stock" },
                { number: "98", label: "Disc Brush Models" },
                { number: "20+", label: "Compatible Brands" },
                { number: "50+", label: "Countries Shipped" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/20">
                  <p className="text-3xl font-bold text-accent">{item.number}</p>
                  <p className="text-sm text-gray-300 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY BUY PARTS FROM US ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Pay Dealer Prices for the Same Parts?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We manufacture the brushes, squeegees, and pads that OEMs put their label on. Buy direct from the factory and cut your consumable costs by 30-50%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Factory,
                title: "We Make the Parts",
                desc: "We are not a reseller. Disc brushes, squeegee rubber, and pad holders are manufactured on our own production lines — same materials, same specs as OEM.",
              },
              {
                icon: Repeat,
                title: "Compatible with All Major Brands",
                desc: "Our parts fit Tennant, Nilfisk, Karcher, Comac, Viper, Hako, Fimap, and 15+ other brands. Send us your OEM part number and we'll match it.",
              },
              {
                icon: Truck,
                title: "Ready Stock, Fast Shipping",
                desc: "360+ part SKUs in our Hefei warehouse. Most orders ship within 48 hours. Air freight available for urgent replacements.",
              },
              {
                icon: Shield,
                title: "Quality Guaranteed",
                desc: "CE certified materials. Every batch tested for wear resistance and compatibility. If a part doesn't fit, we replace it free of charge.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PART CATEGORIES ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Consumable Parts — Always in Stock
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              These are the parts our customers reorder most. Click to browse or submit a quote request below.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {PART_CATEGORIES.slice(0, 8).map((cat) => (
              <Link
                key={cat.value}
                href={`/parts?subcategory=${encodeURIComponent(cat.value)}`}
                className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-accent hover:shadow-md transition-all text-center"
              >
                <cat.icon size={28} className="mx-auto mb-3 text-primary group-hover:text-accent transition-colors" />
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{cat.count} products</p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/parts" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors">
              Browse All 360+ Parts <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== COMPATIBLE BRANDS ===== */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            Compatible with Major Floor Scrubber Brands
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {COMPATIBLE_BRANDS.map((brand) => (
              <span key={brand} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                {brand}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Don&apos;t see your brand? Send us your OEM part number — we can match it.
          </p>
        </div>
      </section>

      {/* ===== COST COMPARISON ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              What You Save Buying Factory Direct
            </h2>
            <p className="text-gray-600">Typical price comparison for replacement consumables.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-4 font-semibold text-gray-900">Part Type</th>
                  <th className="text-center px-5 py-4 font-semibold text-gray-900">OEM Dealer Price</th>
                  <th className="text-center px-5 py-4 font-semibold text-green-700 bg-green-50">Aikerui Factory Price</th>
                  <th className="text-center px-5 py-4 font-semibold text-green-700 bg-green-50">You Save</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["20\" Disc Brush (Nylon)", "$120–180", "$45–75", "~50%"],
                  ["Squeegee Rubber Set (Front + Rear)", "$80–140", "$30–55", "~55%"],
                  ["Pad Driver (17\")", "$90–150", "$35–65", "~55%"],
                  ["Clutch Plate", "$40–80", "$15–30", "~55%"],
                  ["Side Brush (Sweeper)", "$60–110", "$20–45", "~55%"],
                  ["Drain Hose Assembly", "$50–90", "$18–35", "~60%"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-5 py-3.5 font-medium text-gray-900">{row[0]}</td>
                    <td className="px-5 py-3.5 text-center text-gray-500">{row[1]}</td>
                    <td className="px-5 py-3.5 text-center text-green-700 font-semibold bg-green-50/50">{row[2]}</td>
                    <td className="px-5 py-3.5 text-center text-green-700 font-bold bg-green-50/50">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            * Indicative prices. Actual quote depends on quantity, material, and specifications.
          </p>
        </div>
      </section>

      {/* ===== QUOTE FORM ===== */}
      <section id="quote-form" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Get Your Parts Quote — Within 24 Hours
            </h2>
            <p className="text-gray-600">
              Tell us which part you need. We&apos;ll confirm compatibility, price, and shipping to your country.
            </p>
          </div>

          {submitted ? (
            <div className="p-10 bg-green-50 rounded-2xl border border-green-200 text-center">
              <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Received!</h3>
              <p className="text-gray-600 mb-2">Our parts team will reply with pricing and compatibility confirmation within 24 hours.</p>
              <p className="text-sm text-gray-500 mb-6">
                Urgent? WhatsApp us:{" "}
                <a href="https://wa.me/8619965236428" className="text-primary font-bold">+86 199 6523 6428</a>
              </p>
              <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", company: "", country: "", partCategory: "", brand: "", quantity: "", message: "" }); }}
                className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors">
                Request Another Quote
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-5">
              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Company name" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input type="text" name="country" required value={formData.country} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Your country" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Needed</label>
                  <select name="quantity" value={formData.quantity} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option value="">Select</option>
                    <option value="1-5">1–5 (Sample / Small)</option>
                    <option value="6-50">6–50 (Medium)</option>
                    <option value="51-200">51–200 (Bulk)</option>
                    <option value="200+">200+ (Wholesale)</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>
              </div>

              {/* Part-specific fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Part Type *</label>
                  <select name="partCategory" required value={formData.partCategory} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option value="">Select part type</option>
                    {PART_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label} ({cat.count})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Machine Brand</label>
                  <select name="brand" value={formData.brand} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option value="">Select (optional)</option>
                    {COMPATIBLE_BRANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                    <option value="Other">Other / Not sure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Details *
                </label>
                <textarea name="message" required rows={4} value={formData.message} onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                  placeholder={`Help us give you an accurate quote. Tell us:

• OEM part number (if you have it)
• Machine model (e.g., Tennant T7, Karcher BD50/50)
• Dimensions or specifications
• Material preference (nylon, PPL, steel wire, etc.)`}
                />
              </div>

              <button type="submit" disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors text-lg shadow-md">
                {sending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send size={20} />
                    Send Quote Request — Reply Within 24h
                  </>
                )}
              </button>
              <p className="text-xs text-center text-gray-400">
                No spam. Your information is only used to send your parts quote.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ===== BOTTOM ===== */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Parts Urgently?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Call or WhatsApp us directly. Tell us the part number — we&apos;ll confirm stock and ship same day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/8619965236428" className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors">
              <Phone size={18} /> WhatsApp: +86 199 6523 6428
            </a>
            <Link href="/parts" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors">
              Browse All Parts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
