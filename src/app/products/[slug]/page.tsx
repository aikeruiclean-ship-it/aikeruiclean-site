import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { InquiryButton } from "@/components/inquiry-button";
import { JsonLd } from "@/components/json-ld";
import { getProductBySlug, getProducts } from "@/lib/products";
import { sanitizeHtml } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  // ── Strip HTML for plain-text description ──
  const cleanDesc = product.description
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // ── Build a rich, product-specific description ──
  let description = product.shortDescription || "";
  if (!description) {
    const parts: string[] = [];
    if (product.category) parts.push(product.category);
    if (product.specs?.["Working width"])
      parts.push(`Width: ${product.specs["Working width"]}`);
    if (product.specs?.["Tank Capacity"])
      parts.push(`Tank: ${product.specs["Tank Capacity"]}`);
    if (product.specs?.["Battery"])
      parts.push(`Battery: ${product.specs["Battery"]}`);
    if (product.specs?.["Productivity"])
      parts.push(`Capacity: ${product.specs["Productivity"]}`);
    description = parts.join(". ") + ".";
  }
  if (description.length > 160) description = description.slice(0, 157) + "...";

  // ── Build a keyword-rich title ──
  let title = product.name;
  // Add key spec if title is short
  if (title.length < 60 && product.specs?.["Working width"]) {
    title += ` — ${product.specs["Working width"]} ${product.category || "Cleaning Equipment"}`;
  }
  if (!title.includes("Aikerui")) title += " | Aikerui";

  // ── OG description: use short description or clean intro ──
  const ogDesc =
    (product.shortDescription && product.shortDescription.length >= 80
      ? product.shortDescription
      : cleanDesc.slice(0, 200)) ||
    `${product.name} — professional ${product.category?.toLowerCase() || "cleaning"} equipment by Aikerui. Factory-direct pricing. CE certified. Global shipping.`;

  // ── OG images: use all available ──
  const ogImages = product.images.slice(0, 6).map((url) => ({
    url,
    width: 800,
    height: 800,
    alt: product.name,
  }));

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      product.sku,
      ...product.tags.slice(0, 5),
    ].filter(Boolean),
    openGraph: {
      title: `${product.name} | Aikerui`,
      description: ogDesc.slice(0, 200),
      images: ogImages.length > 0 ? ogImages : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: ogDesc.slice(0, 200),
      images: product.images[0] ? [product.images[0]] : [],
    },
    alternates: {
      canonical: `https://aikeruiclean.com/products/${slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProducts()
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div>
      <JsonLd data={(() => {
        const productUrl = `https://aikeruiclean.com/products/${slug}`;
        const isMachine = product.category !== "Parts";

        // Parse "1300*800*1060mm" dimensions → depth/width/height
        let dims: Record<string, unknown> | null = null;
        const dimRaw = product.specs?.["Dimensions"];
        if (dimRaw) {
          const dm = String(dimRaw).match(/^([\d.]+)\s*\*\s*([\d.]+)\s*\*\s*([\d.]+)\s*(mm|cm|m)?$/);
          if (dm) {
            const uc = dm[4] === "cm" ? "CMT" : dm[4] === "m" ? "MTR" : "MMT";
            dims = {
              depth: { "@type": "QuantitativeValue", value: parseFloat(dm[1]), unitCode: uc },
              width: { "@type": "QuantitativeValue", value: parseFloat(dm[2]), unitCode: uc },
              height: { "@type": "QuantitativeValue", value: parseFloat(dm[3]), unitCode: uc },
            };
          }
        }

        // Parse Net weight / Weight / Product Weight
        let weight: Record<string, unknown> | null = null;
        const rawWt = product.specs?.["Net weight"] || product.specs?.["Weight"] || product.specs?.["Product Weight"];
        if (rawWt != null) {
          const wm = String(rawWt).replace(/\s+/g, "").match(/^([\d.]+)(kg|lbs)?$/i);
          if (wm) {
            weight = {
              "@type": "QuantitativeValue",
              value: parseFloat(wm[1]),
              unitCode: wm[2]?.toLowerCase() === "lbs" ? "LBR" : "KGM",
            };
          }
        }

        return {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.shortDescription || product.description.replace(/<[^>]*>/g, "").slice(0, 300),
          sku: product.sku,
          mpn: product.sku,
          manufacturer: {
            "@type": "Organization",
            name: "Aikerui Cleaning Technology Co., Ltd.",
            url: "https://aikeruiclean.com",
          },
          brand: { "@type": "Brand", name: "Aikerui" },
          category: product.category,
          image: product.images,
          ...(isMachine && { countryOfOrigin: "CN" }),
          ...(weight && { weight }),
          ...(dims && { ...dims }),
          ...(isMachine && {
            warranty: {
              "@type": "WarrantyPromise",
              durationOfWarranty: "P1Y",
              warrantyScope: "https://schema.org/PartsAndLaborBasis",
            },
          }),
          ...(product.price != null && {
            offers: {
            "@type": "Offer",
            url: productUrl,
            availability: product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            priceCurrency: "USD",
            ...(product.price != null && { price: product.price }),
            ...(isMachine && {
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingDestination: {
                  "@type": "DefinedRegion",
                  addressCountry: "US",
                },
              },
              hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "US",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 30,
                returnMethod: "https://schema.org.ReturnByMail",
                returnFees: "https://schema.org.FreeReturn",
              },
            })
          },
        };
      })()} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://aikeruiclean.com/" },
          { "@type": "ListItem", position: 2, name: product.category === "Parts" ? "Parts" : "Products", item: `https://aikeruiclean.com/${product.category === "Parts" ? "parts" : "products"}` },
          { "@type": "ListItem", position: 3, name: product.name },
        ],
      }} />
      <JsonLd data={(() => {
        const faqs: { q: string; a: string }[] = [];
        const s = product.specs;
        if (s["Working width"]) faqs.push({ q: `What is the cleaning width of ${product.name}?`, a: `The ${product.name} has a working width of ${s["Working width"]}.` });
        if (s["Productivity"]) faqs.push({ q: `How much area can ${product.name} clean per hour?`, a: `The ${product.name} can clean up to ${s["Productivity"]}.` });
        if (s["Battery"]) faqs.push({ q: `What battery does ${product.name} use?`, a: `The ${product.name} uses ${s["Battery"]}.` });
        if (s["Tank Capacity"] || s["Tank of fresh"]) faqs.push({ q: `What is the tank capacity?`, a: `Tank capacity: ${s["Tank Capacity"] || s["Tank of fresh"]}.` });
        if (s["Dimensions"]) faqs.push({ q: `What are the dimensions?`, a: `Dimensions: ${s["Dimensions"]}.` });
        return faqs.length >= 2 ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) } : {};
      })()} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={14} />
            <Link href={product.category === "Parts" ? "/parts" : "/products"} className="hover:text-primary">
              {product.category === "Parts" ? "Parts" : "Products"}
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden relative mb-3">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200">
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-contain p-2"
                      sizes="150px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.shortDescription || product.description.replace(/<[^>]*>/g, "").slice(0, 300)}
            </p>

            <InquiryButton productName={product.name} />

            {/* Quick highlights */}
            {Object.keys(product.specs).length > 0 && (
              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Highlights</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {product.specs["Working width"] && (
                    <span className="text-gray-600">Working Width: <strong>{String(product.specs["Working width"])}</strong></span>
                  )}
                  {product.specs["Cleaning path"] && (
                    <span className="text-gray-600">Cleaning Path: <strong>{String(product.specs["Cleaning path"])}</strong></span>
                  )}
                  {product.specs["Productivity"] && (
                    <span className="text-gray-600">Productivity: <strong>{String(product.specs["Productivity"])}</strong></span>
                  )}
                  {product.specs["Tank of fresh"] && (
                    <span className="text-gray-600">Fresh Tank: <strong>{String(product.specs["Tank of fresh"])}</strong></span>
                  )}
                  {product.specs["Tank of dirty"] && (
                    <span className="text-gray-600">Dirty Tank: <strong>{String(product.specs["Tank of dirty"])}</strong></span>
                  )}
                  {product.specs["Battery"] && (
                    <span className="text-gray-600">Battery: <strong>{String(product.specs["Battery"])}</strong></span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Description */}
        {product.description && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <div
              className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description) }}
            />
          </section>
        )}

        {/* Specifications Table */}
        {Object.keys(product.specs).length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-3 font-medium text-gray-700 w-1/3">{key}</td>
                      <td className="px-4 py-3 text-gray-600">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Inquiry CTA */}
        <section className="mb-12 p-8 bg-gradient-to-r from-primary to-primary-light rounded-xl text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Interested in This Machine?</h2>
          <p className="text-gray-200 mb-6 max-w-xl mx-auto">
            Contact us for pricing, specifications, shipping quotes, and customization options.
          </p>
          <InquiryButton productName={product.name} />
        </section>

        {/* Related Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">
              📖 All Buying Guides
            </Link>
            <Link href="/guides/walk-behind-vs-ride-on-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">
              Walk-Behind vs Ride-On
            </Link>
            <Link href="/guides/disc-brush-vs-roller-brush-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">
              Disc vs Roller Brush
            </Link>
            <Link href="/guides/lead-acid-vs-lithium-battery-scrubber" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-primary hover:border-primary transition-colors">
              Lead-Acid vs Lithium Battery
            </Link>
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.slug}`} className="group">
                  <div className="aspect-[4/3] rounded-lg bg-gray-100 overflow-hidden relative mb-3">
                    {rp.images[0] ? (
                      <Image
                        src={rp.images[0]}
                        alt={rp.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="300px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {rp.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{rp.category}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
