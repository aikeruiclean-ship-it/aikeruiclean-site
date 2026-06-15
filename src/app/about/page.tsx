import Link from "next/link";
import Image from "next/image";
import { Shield, Award, Globe, CheckCircle, Factory, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, ABOUT_BREADCRUMB } from "@/lib/breadcrumb";

const factoryImages = [
  { src: "/images/factory/1.jpg", alt: "Aikerui factory entrance", label: "Factory Entrance" },
  { src: "/images/factory/2.jpg", alt: "Aikerui production line", label: "Production Workshop" },
  { src: "/images/factory/3.jpg", alt: "Aikerui assembly line", label: "Assembly Line" },
  { src: "/images/factory/5.jpg", alt: "Aikerui quality control", label: "Quality Control" },
  { src: "/images/factory/_MG_3280.JPG", alt: "Aikerui manufacturing equipment", label: "CNC Workshop" },
  { src: "/images/factory/_MG_3285.JPG", alt: "Aikerui warehouse", label: "Warehouse & Inventory" },
];

export default function AboutPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd(ABOUT_BREADCRUMB)} />

      {/* Hero - Full-width factory image */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <Image src="/images/factory/_MG_3302.JPG" alt="Aikerui factory - We are the manufacturer" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-4">Manufacturer Direct — Since 2015</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                We <span className="text-accent">Own</span> the Factory.<br />You Get the <span className="text-accent">Best Price</span>.
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">Aikerui is not a trading company. We design, manufacture, and export industrial floor cleaning machines from our own 10,000+㎡ facility in Hefei, China.</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors">Browse Products <ArrowRight size={18} /></Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "10,000+", label: "㎡ Factory Area" }, { number: "50+", label: "Skilled Workers" },
            { number: "15+", label: "R&amp;D Engineers" }, { number: "30+", label: "Machine Models" },
          ].map((s) => (
            <div key={s.label} className="border-r border-white/20 last:border-0">
              <p className="text-3xl md:text-4xl font-bold">{s.number}</p>
              <p className="text-sm text-gray-300 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Factory</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">We Are the Factory Behind the Machines</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p><strong>Aikerui Cleaning Technology Co., Ltd.</strong> was founded in 2015 with one mission: build high-quality industrial cleaning machines at factory-direct prices. Located in Hefei City, Anhui Province — a key manufacturing hub in China — our facility spans over 10,000 square meters.</p>
              <p>Unlike many sellers in this industry, <strong>we design, engineer, and manufacture every machine in-house</strong>. From frame fabrication and welding to motor assembly, electrical integration, and final quality testing — it all happens under one roof.</p>
              <p>This gives us complete control over quality, costs, and delivery. No middlemen, no trading company markups — just factory-direct pricing with full transparency.</p>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/images/factory/_MG_3304.JPG" alt="Aikerui factory workshop" fill className="object-cover" sizes="600px" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <Image src="/images/factory/_MG_3285.JPG" alt="Factory detail" fill className="object-cover" sizes="200px" />
            </div>
          </div>
        </div>
      </section>

      {/* Factory Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Facility</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Take a Tour of Our Factory</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From raw materials to finished machines — see how we build quality cleaning equipment at our manufacturing facility in Hefei, China.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {factoryImages.map((img, i) => (
              <div key={i} className={`relative rounded-xl overflow-hidden group cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} style={{ minHeight: i === 0 ? "400px" : "200px" }}>
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Direct */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why Factory Direct</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Why Work With a Factory Direct Partner</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">When you buy from Aikerui, you&apos;re buying from the people who actually build the machines.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Factory, title: "Factory Direct Pricing", desc: "No middlemen, no trading company markups. You get the true manufacturer price directly from our production line.", tag: "Save 20-40% vs trading company prices" },
              { icon: Shield, title: "In-House Quality Control", desc: "Every machine is tested in our facility before shipment — brush pressure, water recovery, battery cycle, and structural integrity checks.", tag: "CE & ISO 9001 Certified" },
              { icon: Globe, title: "Global Shipping & Support", desc: "We export to 50+ countries. Sea freight, air freight, express — we handle all logistics, customs, and documentation for you.", tag: "Door-to-Door Delivery Available" },
            ].map((item) => (
              <div key={item.title} className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"><item.icon size={28} className="text-primary" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications & Standards</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "CE Certified", desc: "EU Safety Standards" }, { name: "ISO 9001", desc: "Quality Management" },
              { name: "SGS Verified", desc: "Third-Party Audited" }, { name: "RoHS Compliant", desc: "Environmental Standard" },
            ].map((cert) => (
              <div key={cert.name} className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl border border-gray-200 min-w-[180px]">
                <CheckCircle size={24} className="text-green-600 shrink-0" />
                <div className="text-left"><p className="font-semibold text-gray-900 text-sm">{cert.name}</p><p className="text-xs text-gray-500">{cert.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><Image src="/images/factory/_MG_3307.JPG" alt="" fill className="object-cover" /></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We Welcome You to Visit Our Factory</h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">See our production lines, meet our team, and inspect the quality for yourself. We regularly host distributors, partners, and OEM clients at our facility in Hefei, China.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors text-lg">Schedule a Factory Tour <ArrowRight size={20} /></Link>
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors">Browse Our Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
