"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { VariantProductCard } from "@/components/variant-product-card";
import { getProducts, getPartSubcategories } from "@/lib/products";
import { buildVariantGroups } from "@/lib/variant-groups";
import { cn } from "@/lib/utils";

const PER_PAGE = 28;

function subEn(name: string) {
  return name.split(" / ")[0].trim();
}

function pageHref(basePath: string, page: number) {
  const sep = basePath.includes("?") ? "&" : "?";
  return `${basePath}${sep}page=${page}`;
}

function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {currentPage > 1 && (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:border-accent hover:text-accent transition-colors"
        >
          Previous
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((p) => {
          if (p === 1 || p === totalPages) return true;
          if (Math.abs(p - currentPage) <= 2) return true;
          return false;
        })
        .map((p, idx, arr) => (
          <span key={p} className="flex items-center">
            {idx > 0 && arr[idx - 1] !== p - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            {p === currentPage ? (
              <span className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white">
                {p}
              </span>
            ) : (
              <Link
                href={pageHref(basePath, p)}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:border-accent hover:text-accent transition-colors"
              >
                {p}
              </Link>
            )}
          </span>
        ))}

      {currentPage < totalPages && (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:border-accent hover:text-accent transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
}

export function PartPageContent() {
  const searchParams = useSearchParams();
  const activeSub = searchParams.get("subcategory") || "";
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const subcategories = useMemo(() => getPartSubcategories(), []);
  const allParts = useMemo(
    () => getProducts().filter((p) => p.category === "Parts"),
    []
  );

  const filtered = useMemo(() => {
    if (!activeSub) return allParts;
    return allParts.filter((p) => p.partSubcategory === activeSub);
  }, [activeSub, allParts]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const pageProducts = useMemo(() => {
    const start = (safePage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, safePage]);

  const { standaloneProducts, variantGroups } = useMemo(() => {
    const variantGrouped = new Set<number>();
    const groups = buildVariantGroups(pageProducts);
    for (const g of groups) {
      for (const p of g.products) {
        variantGrouped.add(p.id);
      }
    }
    const standalone = pageProducts.filter((p) => {
      if (!p.variantGroupId) return true;
      if (!variantGrouped.has(p.id)) return true;
      return false;
    });
    return { standaloneProducts: standalone, variantGroups: groups };
  }, [pageProducts]);

  const baseParams = new URLSearchParams(searchParams.toString());
  baseParams.delete("page");
  const basePath = `/parts${baseParams.toString() ? `?${baseParams.toString()}` : ""}`;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Floor Scrubber Parts — Factory Direct Pricing</h1>
            <p className="text-gray-200 text-lg leading-relaxed">
              Looking for <strong>floor scrubber parts</strong> that fit Tennant, Nilfisk, Karcher, Dulevo, Gaomei, and more? 
              We manufacture 360+ replacement parts — disc brushes, squeegee blades, pad holders, roller brushes, clutch plates, 
              side brushes, batteries, and chargers — in our ISO 9001 certified factory. <strong>Same OEM quality at 30-50% less.</strong> In stock and ready to ship.
            </p>
            <p className="text-gray-300 text-base mt-4">
              Whether you need <strong>OEM replacement floor scrubber parts</strong> for a Tennant T7, Viper AS510B, Nilfisk SC500, 
              Kärcher BD50, or any other major brand, we stock the <strong>disc brushes, squeegee rubber, pad drivers, and clutch plates</strong> 
              you need to keep your machine running. Factory-direct — no dealer markup.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Subcategory nav */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/parts"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                !activeSub
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:border-accent hover:text-accent"
              )}
            >
              All Parts ({allParts.length})
            </Link>
            {subcategories.map((sub) => (
              <Link
                key={sub.name}
                href={`/parts?subcategory=${encodeURIComponent(sub.name)}`}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                  activeSub === sub.name
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-accent hover:text-accent"
                )}
              >
                {subEn(sub.name)} ({sub.count})
              </Link>
            ))}
          </div>
        </div>

        {/* Brush category description — SEO focused */}
        {activeSub && ["Disc Brush","Brush","Roller Brush","Side Brush","Carbon Brush"].some(b => activeSub.includes(b)) && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {activeSub.includes("Disc") ? "Floor Scrubber Disc Brushes" :
               activeSub.includes("Roller") ? "Floor Scrubber Roller Brushes" :
               activeSub.includes("Side") ? "Floor Scrubber Side Brushes" :
               "Floor Scrubber Brushes"} — Factory Direct
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              High-quality {activeSub.toLowerCase().includes("disc") ? "disc brushes (rotary brushes)" :
                activeSub.toLowerCase().includes("roller") ? "roller brushes (cylindrical brushes)" :
                activeSub.toLowerCase().includes("side") ? "side brushes (gutter brooms)" :
                "replacement scrubber brushes"} for floor scrubbers.
              Compatible with Tennant, Nilfisk, Karcher, Viper, Hako, Dulevo, Gaomei, and more.
              Manufactured in nylon, PPL, abrasive, and steel wire materials.
              Factory-direct pricing — 30-50% less than dealer prices. {" "}
              <Link href="/guides/floor-scrubber-brush-complete-guide" className="text-primary hover:underline font-medium">
                Full Brush Guide →
              </Link>
            </p>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {pageProducts.length} product{pageProducts.length !== 1 ? "s" : ""}
          {activeSub && ` in "${subEn(activeSub)}"`}
          {totalPages > 1 && ` — Page ${safePage} of ${totalPages}`}
        </p>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-2">No parts found in this category.</p>
            <Link href="/parts" className="text-primary hover:text-primary-light font-medium">
              View all parts
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {variantGroups.map((group) => (
                <VariantProductCard key={group.id} group={group} />
              ))}
              {standaloneProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination currentPage={safePage} totalPages={totalPages} basePath={basePath} />
          </>
        )}
      </div>
    </div>
  );
}
