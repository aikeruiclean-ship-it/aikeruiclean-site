"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Factory,
  Truck,
  Clock,
  Shield,
  Award,
  Globe,
  Phone,
  Send,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { getFeaturedProducts } from "@/lib/products";

export default function IndustrialFloorScrubberQuotePage() {
  const featured = getFeaturedProducts()
    .filter((p) => p.category === "Floor Scrubbers")
    .slice(0, 6);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
          product: "Industrial Floor Scrubber (Landing Page)",
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
      // Track conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-XXXXXXX/YYYYYYYY",
        });
      }
    } catch {
      alert(
        "Failed to send. Please email us directly at info@aikeruiclean.com"
      );
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
          name: "Industrial Floor Scrubber Quote",
          description:
            "Get factory-direct pricing on industrial floor scrubbers. Walk-behind and ride-on models with CE certification. 24-hour quote response.",
        }}
      />

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/factory/_MG_3302.webp"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: headline + CTA */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-6">
                <Factory size={14} /> Factory Direct — No Middlemen
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Industrial Floor Cleaning Machines
                <br />
                <span className="text-accent">Factory Direct Price</span>
              </h1>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
                Get your quote in 24 hours. CE certified, ISO 9001 factory.
                Walk-behind &amp; ride-on scrubbers exported to 50+ countries.
                Save 20–40% vs trading companies.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href="#quote-form"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors text-lg shadow-lg"
                >
                  <Send size={18} /> Get Your Quote Now
                </a>
                <a
                  href="https://wa.me/8619965236428"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors text-lg"
                >
                  <Phone size={18} /> WhatsApp: +86 199 6523 6428
                </a>
              </div>

              {/* Trust badges inline */}
              <div className="flex flex-wrap gap-4 text-sm">
                {[
                  { icon: Award, text: "CE & ISO Certified" },
                  { icon: Globe, text: "50+ Countries" },
                  { icon: Truck, text: "Global Shipping" },
                ].map((item) => (
                  <span
                    key={item.text}
                    className="flex items-center gap-1.5 text-gray-200"
                  >
                    <item.icon size={16} className="text-accent" />
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: factory image */}
            <div className="hidden lg:block relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image
                  src="/images/factory/_MG_3285.webp"
                  alt="Aikerui factory workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-accent text-white px-5 py-3 rounded-xl shadow-lg">
                <p className="text-2xl font-bold">10,000+</p>
                <p className="text-xs opacity-90">㎡ Factory</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-white text-gray-900 px-5 py-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-xs font-medium">2000+ Machines Sold</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THREE SELLING POINTS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Buy Direct from Aikerui?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Skip the middlemen. Get the same machines at factory price with
              full warranty and support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Factory,
                title: "Factory Direct Pricing",
                desc: "No dealer markups. You pay our domestic distributor price. Save 20–40% compared to buying from trading companies or dealers.",
                highlight: "Save 20-40%",
              },
              {
                icon: Truck,
                title: "Global Shipping, Ready Stock",
                desc: "30+ models in stock at our Hefei warehouse. Professional export packing. We handle customs documentation and shipping worldwide.",
                highlight: "Fast Dispatch",
              },
              {
                icon: Clock,
                title: "24-Hour Quote Response",
                desc: "Submit the form below and our engineering team will reply with a detailed quote within 24 hours — not a sales script.",
                highlight: "Direct Engineer Support",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                  {item.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Our Best-Selling Floor Scrubbers
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Walk-behind and ride-on models for facilities from 5,000 to
              100,000+ sq ft.
            </p>
          </div>

          {featured.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Loading products...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="block relative aspect-[4/3] bg-gray-100"
                  >
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                        sizes="400px"
                      />
                    )}
                  </Link>
                  <div className="p-5 flex flex-col flex-1">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="text-xs text-gray-500 space-y-0.5 mb-4">
                      {product.specs["Working width"] && (
                        <p>Width: {product.specs["Working width"]}</p>
                      )}
                      {product.specs["Productivity"] && (
                        <p>Rate: {product.specs["Productivity"]}</p>
                      )}
                      {product.specs["Battery"] && (
                        <p>Battery: {product.specs["Battery"]}</p>
                      )}
                    </div>
                    <div className="mt-auto flex gap-2">
                      <a
                        href="#quote-form"
                        className="flex-1 text-center px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        Get Quote
                      </a>
                      <Link
                        href={`/products/${product.slug}`}
                        className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-accent transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/products?category=Floor%20Scrubbers"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors"
            >
              View All Floor Scrubbers <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRUST / CERTIFICATIONS ===== */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Factory, text: "Own 10,000+㎡ Factory" },
              { icon: Award, text: "CE & ISO 9001 Certified" },
              { icon: Globe, text: "Export to 50+ Countries" },
              { icon: Shield, text: "1-Year Full Warranty" },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center gap-2">
                <item.icon size={32} className="text-primary" />
                <span className="text-sm font-semibold text-gray-900">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUOTE FORM ===== */}
      <section id="quote-form" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Get Your Factory-Direct Quote
            </h2>
            <p className="text-gray-600">
              Fill out the form below. Our engineering team will reply within 24
              hours with pricing, specifications, and shipping options.
            </p>
          </div>

          {submitted ? (
            <div className="p-10 bg-green-50 rounded-2xl border border-green-200 text-center">
              <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Quote Request Received!
              </h3>
              <p className="text-gray-600 mb-2">
                Thank you. Our team will send your detailed quote within 24
                hours.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                For urgent requests, call us:{" "}
                <a
                  href="https://wa.me/8619965236428"
                  className="text-primary font-bold"
                >
                  +86 199 6523 6428
                </a>
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    country: "",
                    quantity: "",
                    message: "",
                  });
                }}
                className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Include country code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Your country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity Needed
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  >
                    <option value="">Select</option>
                    <option value="1">1 (Sample / Test)</option>
                    <option value="2-5">2–5 (Small batch)</option>
                    <option value="6-20">6–20 (Medium)</option>
                    <option value="21+">21+ (Wholesale)</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Requirements *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                  placeholder={`Tell us about your needs, e.g.:
- Facility size (sq ft / sq m)
- Floor type (concrete / epoxy / tile)
- Cleaning frequency
- Any specific models you're interested in`}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors text-lg shadow-md"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send size={20} />
                    Send Quote Request — We Reply Within 24h
                  </>
                )}
              </button>
              <p className="text-xs text-center text-gray-400">
                Your information is kept confidential. No spam, no third-party
                sharing.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to See Our Factory First?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Schedule a live WhatsApp video tour. Walk through our production
            line, meet the team, and inspect quality — all from your phone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/8619965236428"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              <Phone size={18} /> Call Factory on WhatsApp
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors"
            >
              See Factory Photos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
