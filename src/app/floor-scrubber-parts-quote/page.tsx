"use client";

import { useState } from "react";
import Image from "next/image";
import { Factory, Truck, BadgeCheck, Phone, Send, CheckCircle } from "@/lib/icons";
import { JsonLd } from "@/components/json-ld";
import { YouTubeLink } from "@/components/youtube-link";
import { ReviewForm } from "@/components/review-form";
import { ReviewsDisplay } from "@/components/reviews-display";

const PRODUCTS = [
  { name: "Disc Brush", img: "/images/categories/Disc-Brush.webp" },
  { name: "Squeegee Rubber", img: "/images/categories/Squeegee-Rubber.webp" },
  { name: "Pad Driver", img: "/images/categories/Pad-Driver.webp" },
  { name: "Roller Brush", img: "/images/categories/Roller-Brush.webp" },
  { name: "Clutch Plate", img: "/images/categories/Clutch-Plate.webp" },
  { name: "Side Brush", img: "/images/categories/Sweeper-Side-Brush.webp" },
];

export default function PartsQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

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
      // Push conversion events to dataLayer — GTM (GTM-54SKR85R) + direct gtag
      if (typeof window !== "undefined") {
        const w = window as any;
        if (w.dataLayer) w.dataLayer.push({ event: "quote_submit", product: "Floor Scrubber Parts (Ad Landing)" });
        // Full Google Ads conversion ID (with conversion label)
        if (typeof w.gtag === "function") {
          w.gtag("event", "conversion", { send_to: "AW-18359776225/AKHbCP6CodwcEOHnz7JE" });
        } else if (w.dataLayer) {
          w.dataLayer.push({ event: "conversion", send_to: "AW-18359776225/AKHbCP6CodwcEOHnz7JE" });
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
        name: "Floor Scrubber Replacement Parts — Factory Direct",
        description: "Factory-direct floor scrubber parts. Disc brushes, squeegee rubber, pad holders. 30-50% less than dealer. OEM quality, global shipping.",
      }} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-4">
            <Factory size={14} /> Factory-Direct — No Middlemen
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Floor Scrubber Parts at 30-50% Less Than Dealer Price
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Disc brushes, squeegee rubber, pad holders — same OEM quality from our ISO 9001 factory. Compatible with Dulevo, Nilfisk, Gaomei, Tennant, Karcher, flange mounts, clutch plates Karcher & 15+ brands 15+ brands.
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
            { icon: Truck, text: "Global Shipping — 360+ Parts in Stock" },
          ].map(i => (
            <span key={i.text} className="flex items-center gap-1.5"><i.icon size={14} className="text-green-600"/>{i.text}</span>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Consumable Parts — Always in Stock
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PRODUCTS.map(p => (
              <div key={p.name} className="text-center">
                <div className="aspect-square rounded-xl bg-gray-50 border border-gray-200 overflow-hidden mb-2 relative">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-3" sizes="150px" />
                </div>
                <p className="text-sm font-medium text-gray-700">{p.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/parts" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-colors text-sm">
              Browse All 360+ Parts →
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
          <YouTubeLink videoId="factorytour" title="Aikerui Factory Tour — Floor Scrubber Manufacturing" />
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📚 Related Guides</h2>
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

      {/* Form */}
      <section id="form" className="py-12 bg-gray-50">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Get Your Parts Quote</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Reply within 24 hours</p>

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
                <input type="text" name="phone" placeholder="Phone / WhatsApp" value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <textarea name="message" required rows={4} placeholder="Tell us which part you need (OEM number, machine model, or description) *" value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                <button type="submit" disabled={sending}
                  className="w-full py-3.5 bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors">
                  {sending ? "Sending..." : "Send Quote Request"}
                </button>
              </form>
            )}
          </div>

          <div className="text-center mt-4">
            <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20parts." target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 text-sm text-green-600 font-semibold hover:underline">
              <Phone size={14} /> Or WhatsApp us directly
            </a>
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
