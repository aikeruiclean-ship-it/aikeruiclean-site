import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, HeadphonesIcon, Brush, Factory, CheckCircle, Phone, Video, Award, Globe } from "@/lib/icons";
import { ProductCard } from "@/components/product-card";
import { WhatsAppHeroButton } from "@/components/whatsapp-hero-button";
import { JsonLd } from "@/components/json-ld";
import { getFeaturedProducts, getPartsProducts, categories, getCategoryCounts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const parts = getPartsProducts().slice(0, 8);
  const counts = getCategoryCounts();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Anhui Aikerui Environmental Protection Technology CO.,LTD",
    url: "https://aikeruiclean.com",
    logo: "https://aikeruiclean.com/aikerui-logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86-199-6523-6428",
      contactType: "sales",
      email: "info@aikeruiclean.com",
      availableLanguage: ["English", "Chinese"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Anqing",
      addressRegion: "Anhui",
      addressCountry: "CN",
    },
    description: "Real manufacturer of industrial floor scrubbers, sweepers, and cleaning accessories. Factory-direct pricing.",
  };

  const categoryImages: Record<string, string> = {
    "Floor Scrubbers": "/images/categories/floor-scrubbers.webp",
    "Floor Sweepers": "/images/categories/floor-sweepers.webp",
    "Dust-pushing carts": "/images/categories/dust-carts.webp",
    "Carpet Extractor Washers": "/images/categories/carpet-extractors.webp",
    Parts: "/images/categories/parts.webp",
  };

  // Reorder: Parts first, then the rest
  const orderedCategories = ["Parts", ...categories.filter((c) => c !== "Parts")];

  return (
    <div>
      <JsonLd data={organizationSchema} />

      {/* ===== HERO ===== */}
      <section className="relative h-[80vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <Image src="/images/factory-opt/hero-v3.webp" alt="Aikerui real factory" fill className="object-cover" sizes="100vw" priority fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-4">
                <Factory size={14} /> Verified Manufacturer — Since 2008
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Buying Cleaning Machines?<br />
                <span className="text-accent">Buy Direct</span> from the Factory.
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed mb-8">
                Aikerui is a real manufacturer with our own 10,000+㎡ factory in Anqing, China. 
                30+ machine models, 360+ parts. Factory-direct pricing, no middlemen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/floor-scrubber-parts-quote" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors text-base shadow-lg shadow-accent/30">
                  Get Factory Price <ArrowRight size={18} />
                </Link>
                <WhatsAppHeroButton />
              </div>
              <p className="text-sm text-gray-300 mt-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                24-Hour Quote Response — Engineer-Level Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Products</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-3">Built in Our Factory, Shipped to You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Every machine is designed, manufactured, and tested in our Anqing facility before export.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {orderedCategories.map((cat) => (
              <Link key={cat} href={cat === "Parts" ? "/parts" : `/products?category=${encodeURIComponent(cat)}`}
                className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-accent hover:shadow-md transition-all duration-200 text-center">
                <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-3 border border-gray-200 bg-white">
                  <Image src={categoryImages[cat] || ""} alt={cat} width={80} height={80} className="w-full h-full object-contain p-1" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">{cat}</h3>
                <p className="text-xs text-gray-500 mt-1">{counts[cat] || 0} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FACTORY GALLERY STRIP ===== */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-900">📸 Real photos from our factory floor</p>
            <Link href="/about" className="text-xs text-primary hover:text-primary-light font-medium transition-colors">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["/images/factory-opt/1.webp","/images/factory-opt/3.webp","/images/factory-opt/5.webp","/images/factory-opt/_MG_3280.webp"].map((src, i) => (
              <Link key={i} href="/about" className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 group">
                <Image src={src} alt="Aikerui factory" fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 25vw" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            {[
              { icon: Factory, text: "Own 10,000+㎡ Factory" },
              { icon: Award, text: "CE & ISO Certified" },
              { icon: Globe, text: "Export to 50+ Countries" },
              { icon: Phone, text: "Talk to Our Sales Team" },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2">
                <item.icon size={16} className="text-accent shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUICK VERIFICATION ===== */}
      <section className="py-10 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="text-green-600 shrink-0" />
              <span className="text-sm text-gray-700"><strong>Not sure if we are real?</strong> Here are 3 ways to verify:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/about#verify" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors">
                <Video size={14} /> Live Video Tour
              </Link>
              <Link href="/about#verify" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors">
                <CheckCircle size={14} /> Third-Party Inspection
              </Link>
              <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing." className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors">
                <Phone size={14} /> Call Factory Floor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FACTORY STATS ===== */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Aikerui by the Numbers</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Real factory, real capacity, real results.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "㎡ Factory" },
              { number: "50+", label: "Skilled Workers" },
              { number: "30+", label: "Machine Models" },
              { number: "2000+", label: "Machines Sold" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-bold text-primary">{s.number}</p>
                <p className="text-sm text-gray-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Our most popular industrial cleaning machines — factory direct</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1 text-primary hover:text-primary-light font-medium text-sm transition-colors">View All <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-1 text-primary font-medium text-sm">View All Products <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ===== PARTS ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Replacement Parts & Accessories</h2>
              <p className="text-gray-600">Disc brushes, squeegees, batteries, and more — manufactured to OEM specs</p>
            </div>
            <Link href="/parts" className="hidden sm:flex items-center gap-1 text-primary hover:text-primary-light font-medium text-sm transition-colors">View All Parts <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {parts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/parts" className="inline-flex items-center gap-1 text-primary font-medium text-sm">View All Parts <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ===== WHY AIKERUI ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Buy Direct from Aikerui?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">When you buy from the factory, you save money, get better quality, and talk to the people who build the machines.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Factory, title: "Factory Direct Pricing", desc: "No middlemen markups. You pay the same price as our domestic distributors. Save 20-40% vs trading companies." },
              { icon: Shield, title: "Quality You Can Verify", desc: "Every machine tested before shipment. CE certified, ISO 9001. Schedule a video call to see our QC process live." },
              { icon: HeadphonesIcon, title: "Direct Engineer Support", desc: "When you need help, you talk to our engineers — not a sales rep. Spare parts shipped within 24 hours." },
            ].map((item) => (
              <div key={item.title} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"><item.icon size={24} className="text-primary" /></div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Expert Guides ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Floor Scrubber Buying Guides</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Expert guides on brushes, parts, and maintenance — written by the manufacturer.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/guides/floor-scrubber-brush-complete-guide", title: "Floor Scrubber Brush Guide", desc: "Types, materials, sizing" },
              { href: "/guides/floor-scrubber-brush-replacement-guide", title: "Brush Replacement Guide", desc: "When & how to replace" },
              { href: "/guides/floor-scrubber-disc-brush-buying-guide", title: "Disc Brush Buying Guide", desc: "Nylon, PPL, abrasive" },
              { href: "/guides/top-10-floor-scrubber-roller-brushes", title: "Roller Brushes 2026", desc: "Top picks for cylinder machines" },
              { href: "/guides/top-10-floor-scrubber-squeegee-blades", title: "Squeegee Blades 2026", desc: "NR vs PU ranked" },
              { href: "/guides/floor-scrubber-pad-holder-replacement-guide", title: "Pad Holder Guide", desc: "Types & compatibility" },
              { href: "/guides/floor-scrubber-parts-guide-types-lifespan-cost", title: "Parts & Cost Guide", desc: "Lifespan & pricing" },
              { href: "/guides/floor-scrubber-brush-pads-guide", title: "Brush Pads Guide", desc: "Types & color codes" },
              { href: "/guides/replacement-floor-scrubber-parts-guide", title: "Replacement Parts", desc: "Wear items & buying" },
              { href: "/guides/auto-scrubber-brush-guide", title: "Auto Scrubber Brush", desc: "Compatible options" },
              { href: "/guides/cylindrical-brush-floor-scrubber-guide", title: "Cylindrical Brush", desc: "Roller machines explained" },
              { href: "/guides/how-to-buy-floor-scrubber-parts-from-china", title: "Buy Parts From China", desc: "Sourcing step-by-step" },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">{g.title}</h3>
                <p className="text-sm text-gray-500">{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><Image src="/images/factory-opt/_MG_3307.webp" alt="" fill className="object-cover" /></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Not Sure Yet? Let Us Show You.</h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">Schedule a live video tour of our factory. See the production line, meet the team, and inspect the quality — all from your phone.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors text-lg">
              <Video size={18} /> Request Live Video Tour
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors">Browse Products</Link>
          </div>
          <p className="text-gray-400 text-sm mt-6">Or call us directly: <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing." className="text-white underline font-semibold">WhatsApp Sales Team</a></p>
        </div>
      </section>

      {/* ===== SEO Company Description ===== */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              Aikerui is a professional floor scrubber manufacturer and industrial cleaning equipment supplier based in Anhui, China.
              Since 2008, our factory has designed and produced walk-behind floor scrubbers, ride-on scrubber dryers, industrial sweepers,
              and a complete range of floor scrubber replacement parts — including floor scrubber brushes, disc brushes, cylindrical brushes,
              roller brushes, squeegee blades, pad drivers, and other cleaning machine accessories.
            </p>
            <p>
              Our floor scrubber brushes and spare parts are engineered as direct replacement options compatible with leading brands such as
              Tennant, Nilfisk, Karcher, Hako, Comac, and IPC. We serve distributors, wholesalers, facility management companies, and
              cleaning contractors across North America, Europe, Australia, and the Middle East.
            </p>
            <p>
              Every order is backed by factory-direct pricing, OEM and ODM customization, private label service, and quality inspection before
              shipment. Whether you need a single replacement brush or a full container of cleaning machine parts, contact us for a quotation —
              our sales team responds within 24 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
