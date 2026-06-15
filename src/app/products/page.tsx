import { Suspense } from "react";
import { ProductsContent } from "./products-content";
import { categoryMeta } from "@/lib/products";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category, q } = await searchParams;

  if (q) {
    return {
      title: `Search Results for "${q}" | Aikerui Products`,
      description: `Browse search results for "${q}" in our industrial cleaning equipment catalog. Floor scrubbers, sweepers, parts and accessories.`,
    };
  }

  if (category && categoryMeta[category]) {
    return {
      title: categoryMeta[category].title,
      description: categoryMeta[category].description,
    };
  }

  return {
    title: "Industrial Floor Cleaning Machines | Floor Scrubbers & Sweepers | Aikerui",
    description: "Professional industrial floor scrubbers, sweepers, and cleaning accessories. B2B wholesale, custom OEM solutions. Walk-behind and ride-on models.",
  };
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
