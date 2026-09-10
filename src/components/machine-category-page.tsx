import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { VariantProductCard } from "@/components/variant-product-card";
import { getProductsByCategory } from "@/lib/products";
import { buildVariantGroups } from "@/lib/variant-groups";
import { MACHINE_CATEGORIES, type MachineCategoryDef } from "@/lib/machine-categories";
import { breadcrumbJsonLd, PRODUCTS_BREADCRUMB } from "@/lib/breadcrumb";
import { Send } from "@/lib/icons";

const SITE_URL = "https://aikeruiclean.com";

/** 整机分类页共享渲染（/floor-scrubbers、/floor-sweepers 等 4 个顶层静态页复用） */
export function MachineCategoryPage({ def }: { def: MachineCategoryDef }) {
  const products = getProductsByCategory(def.category);
  const groups = buildVariantGroups(products);
  const groupedIds = new Set(groups.flatMap((g) => g.products.map((p) => p.id)));
  const standalone = products.filter((p) => !groupedIds.has(p.id));

  const breadcrumb = [
    ...PRODUCTS_BREADCRUMB.slice(0, -1),
    { name: "Products", href: "/products" },
    { name: def.breadcrumb, href: `/${def.slug}` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: def.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: def.h1,
    description: def.description,
    url: `${SITE_URL}/${def.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 50).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/products/${p.slug}`,
        name: p.name,
      })),
    },
  };

  const otherCats = MACHINE_CATEGORIES.filter((c) => c.slug !== def.slug);

  return (
    <div>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd data={faqSchema} />
      <JsonLd data={collectionSchema} />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-sm text-gray-300 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-white">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{def.breadcrumb}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{def.h1}</h1>
          <p className="text-lg text-gray-200 max-w-3xl">
            {products.length} models available — factory direct, OEM &amp; wholesale, CE certified.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/floor-scrubber-parts-quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
            >
              <Send size={18} /> Get Machine Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
            >
              All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Intro + related categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl space-y-4 text-gray-700 leading-relaxed">
          {def.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Other machine categories
          </p>
          <div className="flex flex-wrap gap-2">
            {otherCats.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-primary hover:border-primary transition-colors"
              >
                {c.breadcrumb}
              </Link>
            ))}
            <Link
              href="/parts"
              className="px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-primary hover:border-primary transition-colors"
            >
              Replacement Parts
            </Link>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">
          {def.h1} — {products.length} models
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-500 py-10 text-center">
            No models listed yet.{" "}
            <Link href="/products" className="text-accent underline">
              Browse all products
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <VariantProductCard key={group.id} group={group} />
            ))}
            {standalone.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {def.faq.map((f, i) => (
              <details key={i} className="bg-white rounded-lg border border-gray-200 p-5">
                <summary className="font-semibold text-primary cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          Need pricing on {def.breadcrumb}?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Tell us your floor area, surface type and daily cleaning hours — we will recommend the right
          model and quote factory-direct. OEM branding and spare parts available.
        </p>
        <Link
          href="/floor-scrubber-parts-quote"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"
        >
          <Send size={18} /> Request a Quote
        </Link>
      </section>
    </div>
  );
}
