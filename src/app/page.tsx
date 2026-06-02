"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, HeadphonesIcon, Brush } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { JsonLd } from "@/components/json-ld";
import { getFeaturedProducts, categories, getCategoryCounts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const counts = getCategoryCounts();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aikerui Cleaning Technology Co., Ltd.",
    url: "https://aikeruiclean.com",
    logo: "https://aikeruiclean.com/wp-content/uploads/2025/11/WALK-BEHIND-K500BT.webp",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86-199-6523-6428",
      contactType: "sales",
      email: "info@aikeruiclean.com",
      availableLanguage: ["English", "Chinese"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hefei",
      addressRegion: "Anhui",
      addressCountry: "CN",
    },
    description: "Professional manufacturer of industrial floor scrubbers, sweepers, and cleaning accessories.",
  };

  const categoryImages: Record<string, string> = {
    "Floor Scrubbers": "/images/categories/floor-scrubbers.webp",
    "Floor Sweepers": "/images/categories/floor-sweepers.webp",
    "Dust-pushing carts": "/images/categories/dust-carts.webp",
    "Carpet Extractor Washers": "/images/categories/carpet-extractors.webp",
    Parts: "/images/categories/parts.png",
  };

  return (
    <div>
      <JsonLd data={organizationSchema} />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-light text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Industrial Floor Cleaning Machines Built to Perform
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
              Aikerui manufactures high-quality floor scrubbers, sweepers, and cleaning accessories for industrial and commercial use. B2B wholesale, custom solutions, global shipping.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors text-base"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Brush, title: "Factory Direct", desc: "Manufacturer pricing, no middlemen" },
            { icon: Shield, title: "Quality Guaranteed", desc: "CE, ISO certified machines" },
            { icon: Truck, title: "Global Shipping", desc: "Sea, air, express available" },
            { icon: HeadphonesIcon, title: "24/7 Support", desc: "Technical support & after-sales" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <item.icon size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Product Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete range of industrial cleaning equipment for every application
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "Parts" ? "/parts" : `/products?category=${encodeURIComponent(cat)}`}
                className="group p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-accent hover:bg-accent/5 transition-all duration-200 text-center"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-3 border border-gray-200 bg-white">
                  <Image
                    src={categoryImages[cat] || ""}
                    alt={cat}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {cat}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{counts[cat] || 0} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Our most popular industrial cleaning machines</p>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-primary hover:text-primary-light font-medium text-sm transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-primary font-medium text-sm"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Aikerui?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are a trusted manufacturer of industrial cleaning equipment with years of experience serving global clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Factory Direct Pricing",
                desc: "As a manufacturer, we offer competitive pricing without middleman markups. Custom OEM/ODM solutions available.",
              },
              {
                title: "Quality & Certification",
                desc: "All machines meet CE and ISO standards. Rigorous quality control at every production stage ensures reliable performance.",
              },
              {
                title: "Global Service Network",
                desc: "We provide technical documentation, remote support, and spare parts delivery worldwide. Training available.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find the Right Machine?</h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Tell us your cleaning requirements and our team will recommend the perfect solution for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Get a Free Quote <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "2000+", label: "Machines Sold" },
            { number: "50+", label: "Export Countries" },
            { number: "10+", label: "Years Experience" },
            { number: "30+", label: "Machine Models" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
