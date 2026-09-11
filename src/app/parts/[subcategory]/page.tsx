import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { VariantProductCard } from "@/components/variant-product-card";
import { getPartsBySubcategory } from "@/lib/products";
import { buildVariantGroups } from "@/lib/variant-groups";
import { PART_CATEGORIES } from "@/lib/part-categories";
import { breadcrumbJsonLd, PARTS_BREADCRUMB } from "@/lib/breadcrumb";
import { Send } from "@/lib/icons";

const SITE_URL = "https://aikeruiclean.com";

// 只生成配置里定义的 8 个分类；其他 slug 直接 404（避免无限 URL）
export const dynamicParams = false;

export function generateStaticParams() {
  return PART_CATEGORIES.map((c) => ({ subcategory: c.slug }));
}

function findCategory(slug: string) {
  return PART_CATEGORIES.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}): Promise<Metadata> {
  const { subcategory } = await params;
  const cat = findCategory(subcategory);
  if (!cat) return {};

  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: `${SITE_URL}/parts/${cat.slug}` },
    openGraph: {
      title: cat.title,
      description: cat.description,
      url: `${SITE_URL}/parts/${cat.slug}`,
      type: "website",
    },
  };
}

export default async function PartSubcategoryPage({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;
  const cat = findCategory(subcategory);
  if (!cat) notFound();

  const products = getPartsBySubcategory(cat.subcategory);
  const groups = buildVariantGroups(products);
  const groupedIds = new Set(groups.flatMap((g) => g.products.map((p) => p.id)));
  const standalone = products.filter((p) => !groupedIds.has(p.id));

  const breadcrumb = [
    ...PARTS_BREADCRUMB.slice(0, -1),
    { name: "Parts", item: "/parts" },
    { name: cat.breadcrumb, item: `/parts/${cat.slug}` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cat.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.h1,
    description: cat.description,
    url: `${SITE_URL}/parts/${cat.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 50).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          url: `${SITE_URL}/products/${p.slug}`,
        },
      })),
    },
  };

  const otherCats = PART_CATEGORIES.filter((c) => c.slug !== cat.slug);

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
            <Link href="/parts" className="hover:text-white">
              Parts
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{cat.breadcrumb}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{cat.h1}</h1>
          <p className="text-lg text-gray-200 max-w-3xl">
            {products.length} replacement parts in this category — factory direct, OEM &amp; custom available.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/floor-scrubber-parts-quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
            >
              <Send size={18} /> Get a Quote
            </Link>
            <Link
              href="/parts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
            >
              All Parts
            </Link>
          </div>
        </div>
      </section>

      {/* Intro copy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl space-y-4 text-gray-700 leading-relaxed">
          {cat.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Related categories (internal links) */}
        <div className="mt-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Other part categories
          </p>
          <div className="flex flex-wrap gap-2">
            {otherCats.map((c) => (
              <Link
                key={c.slug}
                href={`/parts/${c.slug}`}
                className="px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-primary hover:border-primary transition-colors"
              >
                {c.breadcrumb}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid (SSR — crawlable) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">
          {cat.h1} — {products.length} products
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-500 py-10 text-center">
            No products in this category yet. <Link href="/parts" className="text-accent underline">Browse all parts</Link>.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            {cat.faq.map((f, i) => (
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
          Need a price on {cat.breadcrumb}?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Send us your machine model or the part dimensions and we will quote factory-direct pricing —
          30-50% below dealer rates, with OEM and private-label options.
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
