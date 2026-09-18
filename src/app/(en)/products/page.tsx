import { Suspense } from "react";
import { ProductsContent } from "./products-content";
import { categoryMeta } from "@/lib/products";
import { MACHINE_CATEGORIES } from "@/lib/machine-categories";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, PRODUCTS_BREADCRUMB } from "@/lib/breadcrumb";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category, q } = await searchParams;
  if (q) return { title: `Search Results for "${q}" | Aikerui Products`, description: `Browse search results for "${q}" in our cleaning equipment catalog.` };
  if (category && categoryMeta[category]) {
    // 有对应静态分类页的（floor-scrubbers 等）→ canonical 指向静态页，合并重复
    const machineCat = MACHINE_CATEGORIES.find((c) => c.category === category);
    const canonical = machineCat
      ? `https://aikeruiclean.com/${machineCat.slug}`
      : `https://aikeruiclean.com/products?category=${category}`;
    return {
      title: categoryMeta[category].title,
      description: categoryMeta[category].description,
      alternates: { canonical },
    };
  }
  return { title: "Industrial Floor Cleaning Machines | Factory Direct | Aikerui", description: "Professional floor scrubbers, sweepers, and cleaning accessories. Manufactured in our own 10,000+㎡ factory. B2B wholesale, OEM available.", alternates: { canonical: "https://aikeruiclean.com/products" } };
}

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(PRODUCTS_BREADCRUMB)} />
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading products...</div>}>
        <ProductsContent />
      </Suspense>
    </>
  );
}
