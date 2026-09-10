import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Shield, Phone, Factory, CheckCircle, Award, Globe, HeadphonesIcon, Video } from "@/lib/icons";
import { ProductCardServer } from "@/components/product-card-server";
import { WhatsAppHeroButton } from "@/components/whatsapp-hero-button";
import { DubaiWarehouse } from "@/components/dubai-warehouse";
import { getFeaturedProducts, getPartsProducts, categories, getCategoryCounts } from "@/lib/products";
import { getHomeDict } from "@/i18n/home";
import { translatedLocales, SITE_URL, isLocale, type Locale } from "@/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return translatedLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") return {};
  const d = getHomeDict(locale as Locale);
  return {
    title: `${d.hero.h1a} | ${d.hero.h1b} — Aikerui`,
    description: d.hero.sub.slice(0, 160),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: SITE_URL,
        es: `${SITE_URL}/es`,
        ar: `${SITE_URL}/ar`,
        ru: `${SITE_URL}/ru`,
        fr: `${SITE_URL}/fr`,
        "x-default": SITE_URL,
      },
    },
  };
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  const d = getHomeDict(locale as Locale);

  const featured = getFeaturedProducts().slice(0, 4);
  const parts = getPartsProducts().slice(0, 4);
  const counts = getCategoryCounts();

  const categoryImages: Record<string, string> = {
    "Floor Scrubbers": "/images/categories/floor-scrubbers.webp",
    "Floor Sweepers": "/images/categories/floor-sweepers.webp",
    "Dust-pushing carts": "/images/categories/dust-carts.webp",
    "Carpet Extractor Washers": "/images/categories/carpet-extractors.webp",
    Parts: "/images/categories/parts.webp",
  };
  const orderedCategories = ["Parts", ...categories.filter((c) => c !== "Parts")];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative h-[70vh] min-h-[460px] max-h-[640px] overflow-hidden">
        <Image src="/images/factory-opt/hero-v3.webp" alt="Aikerui factory" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-4">
                <Factory size={14} /> {d.hero.badge}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {d.hero.h1a}
                <br />
                <span className="text-accent">{d.hero.h1b}</span> — {d.hero.h1c}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed mb-8">{d.hero.sub}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/floor-scrubber-parts-quote" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors text-base shadow-lg shadow-accent/30">
                  {d.hero.cta} <ArrowRight size={18} />
                </Link>
                <WhatsAppHeroButton />
              </div>
              <p className="text-sm text-gray-300 mt-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {d.hero.assurance}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">{d.categories.kicker}</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-3">{d.categories.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{d.categories.sub}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {orderedCategories.map((cat) => (
              <Link key={cat} href={cat === "Parts" ? "/parts" : `/products?category=${encodeURIComponent(cat)}`}
                className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-accent hover:shadow-md transition-all duration-200 text-center">
                <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-3 border border-gray-200 bg-white">
                  <Image src={categoryImages[cat] || ""} alt={cat} width={80} height={80} className="w-full h-full object-contain p-1" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">{cat}</h3>
                <p className="text-xs text-gray-500 mt-1">{counts[cat] || 0} {d.categories.products}</p>
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
              { icon: Factory, text: d.trust[0] },
              { icon: Award, text: d.trust[1] },
              { icon: Globe, text: d.trust[2] },
              { icon: Phone, text: d.trust[3] },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2">
                <item.icon size={16} className="text-accent shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{d.stats.title}</h2>
            <p className="text-gray-600 max-w-xl mx-auto">{d.stats.sub}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {d.stats.items.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-bold text-primary">{s.num}</p>
                <p className="text-sm text-gray-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{d.featured.title}</h2>
              <p className="text-gray-600">{d.featured.sub}</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1 text-primary hover:text-primary-light font-medium text-sm transition-colors">
              {d.featured.viewAll} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => <ProductCardServer key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* ===== PARTS ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{d.parts.title}</h2>
              <p className="text-gray-600">{d.parts.sub}</p>
            </div>
            <Link href="/parts" className="hidden sm:flex items-center gap-1 text-primary hover:text-primary-light font-medium text-sm transition-colors">
              {d.parts.viewAll} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {parts.map((product) => <ProductCardServer key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* ===== DUBAI WAREHOUSE ===== */}
      <DubaiWarehouse dict={d.dubai} />

      {/* ===== WHY ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{d.why.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{d.why.sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Factory, ...d.why.items[0] },
              { icon: Shield, ...d.why.items[1] },
              { icon: HeadphonesIcon, ...d.why.items[2] },
            ].map((item) => (
              <div key={item.title} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><Image src="/images/factory-opt/_MG_3307.webp" alt="" fill className="object-cover" /></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">{d.cta.title}</h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">{d.cta.sub}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors text-lg">
              <Video size={18} /> {d.cta.tour}
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors">
              {d.cta.browse}
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            {d.cta.orCall}{" "}
            <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing." className="text-white underline font-semibold">
              {d.cta.whatsapp}
            </a>
          </p>
        </div>
      </section>

      {/* ===== VERIFY ===== */}
      <section className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="text-green-600 shrink-0" />
              <span className="text-sm text-gray-700">{d.verify.lead}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/about#verify" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors">
                <Video size={14} /> {d.verify.video}
              </Link>
              <Link href="/about#verify" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors">
                <CheckCircle size={14} /> {d.verify.inspection}
              </Link>
              <a href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing." className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors">
                <Phone size={14} /> {d.verify.call}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
