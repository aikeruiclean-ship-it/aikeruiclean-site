import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "@/lib/icons";
import { InquiryButton } from "@/components/inquiry-button";
import { CollapsibleDescription } from "@/components/collapsible-description";
import { JsonLd } from "@/components/json-ld";
import { getProductBySlug, getProducts } from "@/lib/products";
import { TIER_PRICE_RANGE } from "@/lib/parts-pricing";
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

  // ── Truncate long product names for title tag (Google shows ~60 chars) ──
  const maxNameLen = 55;
  const shortName = product.name.length > maxNameLen
    ? product.name.slice(0, maxNameLen - 3).trim().replace(/[,/&;:]+$/, "") + "..."
    : product.name;

  // ── Strip HTML for plain-text description ──
  const cleanDesc = product.description
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // ── Build a rich, product-specific description ──
  let description = product.shortDescription || "";
  // If shortDescription is just the product name repeated, regenerate from specs
  if (!description || description.startsWith(product.name)) {
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
  // ── Append SKU for uniqueness when description is generic ──
  if (description.length < 60 && product.sku) description += ` — SKU: ${product.sku}`;
  if (description.length > 160) description = description.slice(0, 157) + "...";

  // ── Build a keyword-rich title ──
  let title = shortName;
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
    `${shortName} — professional ${product.category?.toLowerCase() || "cleaning"} equipment by Aikerui. Factory-direct pricing. CE certified. Global shipping.`;

  // ── OG images: use all available ──
  const ogImages = product.images.slice(0, 6).map((url) => ({
    url,
    width: 800,
    height: 800,
    alt: shortName,
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
      title: `${shortName} | Aikerui`,
      description: ogDesc.slice(0, 200),
      images: ogImages.length > 0 ? ogImages : [],
    },
    twitter: {
      card: "summary_large_image",
      title: shortName,
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
            name: "Anhui Aikerui Environmental Protection Technology CO.,LTD",
            url: "https://aikeruiclean.com",
          },
          brand: { "@type": "Brand", name: "Aikerui" },
          category: product.category,
          image: product.images,
          ...(isMachine && { countryOfOrigin: "CN" }),
          ...(weight && { weight }),
          ...(dims && { ...dims }),
          offers: (() => {
            // 有真实价格 → 完整 Offer；无价格 → priceRange（与页面显示一致，绝不出 0）
            if (product.price != null && product.price > 0) {
              return {
                "@type": "Offer",
                url: productUrl,
                availability: product.inStock
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
                priceCurrency: "USD",
                price: product.price,
                ...(product.salePrice != null && product.salePrice > 0
                  ? { priceValidUntil: undefined }
                  : {}),
              };
            }
            return {
              "@type": "Offer",
              url: "https://aikeruiclean.com/floor-scrubber-parts-quote",
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              priceSpecification: (() => {
                // Parts: tier-based range; Machines: broad range (quote-based)
                if (product.category === "Parts") {
                  const sub = (product as any).partSubcategory || "";
                  const tier = /Disc Brush|Squeegee|Brush|Hose|Side Brush/.test(sub)
                    ? "L1"
                    : /Pad Holder|Clutch Plate|Roller Brush|Lock & Flange/.test(sub)
                      ? "L2"
                      : "L2";
                  const r = TIER_PRICE_RANGE[tier];
                  return {
                    "@type": "PriceSpecification",
                    priceCurrency: "USD",
                    minPrice: r.minPrice,
                    maxPrice: r.maxPrice,
                  };
                }
                return {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  minPrice: 1800,
                  maxPrice: 30000,
                };
              })(),
            };
          })(),
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
              {(product.shortDescription || product.description.replace(/<[^>]*>/g, "")).slice(0, 300)}
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
          <CollapsibleDescription html={sanitizeHtml(product.description)} />
        )}

        {/* Auto-generated supplementary content for all products */}
        {(true) && (
          <section className="mb-12">
            {product.category === "Parts" ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Compatibility & Fitment</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200 mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Brand</th>
                        <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Compatibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["Tennant","Nilfisk","Karcher","Comac","Viper","Hako","Fimap","IPC","NSS","Dulevo"].map((brand, i) => (
                        <tr key={brand} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-2 text-gray-800 font-medium">{brand}</td>
                          <td className="px-4 py-2 text-green-700 text-xs">✓ Compatible — confirm with OEM part number</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mb-4">Not listed? Send us your OEM part number and machine model — we'll confirm fitment within 24 hours.</p>
                <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Replacement Tips</h3>
                <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
                  <li>Inspect your part regularly — worn components reduce cleaning performance and can damage your machine</li>
                  <li>Always keep 1-2 spares in stock to avoid downtime</li>
                  <li>Factory-direct pricing saves 30-50% compared to dealer parts — same OEM quality</li>
                </ul>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Scenarios</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  This {product.category || "floor cleaning machine"} is built for demanding commercial and industrial environments:
                </p>
                <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2">
                  <li><strong>Warehouses & Distribution Centers:</strong> High-productivity cleaning for concrete and epoxy floors</li>
                  <li><strong>Manufacturing Plants:</strong> Heavy-duty scrubbing for oil, grease, and production debris</li>
                  <li><strong>Retail & Supermarkets:</strong> Quiet operation for daytime cleaning, fast-drying for customer safety</li>
                  <li><strong>Airports & Transportation:</strong> Large-area coverage with lithium battery for continuous operation</li>
                </ul>
                {product.specs["Working width"] && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Coverage & Productivity</h3>
                    <p className="text-gray-600 leading-relaxed">
                      With a {product.specs["Working width"]} cleaning width{product.specs["Productivity"] ? ` and productivity of ${product.specs["Productivity"]}` : ""}, this machine handles {product.specs["Working width"]?.toString().includes('34') || product.specs["Working width"]?.toString().includes('42') || product.specs["Working width"]?.toString().includes('50') ? "large" : "small to medium"} facilities efficiently. For facilities over 30,000 sq ft, a ride-on model like this pays for itself in labor savings within 12-18 months.
                    </p>
                  </>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">How to Get Your Quote</h3>
                <ol className="list-decimal list-inside text-gray-600 leading-relaxed space-y-2">
                  <li>Tell us your facility size and floor type using the inquiry form below</li>
                  <li>We'll recommend the right configuration (battery, brush type, squeegee material)</li>
                  <li>Receive a detailed quote with shipping options within 24 hours</li>
                  <li>For sample evaluation, we ship single units for quality verification before volume orders</li>
                </ol>
              </>
            )}
          </section>
        )}

        {/* Specifications Table — skip if description already contains specs */}
        {Object.keys(product.specs).length > 0 && !product.description.toLowerCase().includes("technical specification") && (
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
          {product.category !== "Parts" && (
            <p className="text-gray-300 text-sm mt-4">
              Need <Link href="/parts" className="text-accent font-semibold underline hover:text-white transition-colors">replacement scrubber parts</Link>? We stock 360+ disc brushes, squeegees, pad holders & more — factory direct.
            </p>
          )}
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
