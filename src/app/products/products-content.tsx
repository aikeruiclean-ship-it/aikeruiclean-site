"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getProducts, categories, getCategoryCounts } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductsContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const counts = getCategoryCounts();

  const filtered = useMemo(
    () =>
      activeCategory
        ? getProducts().filter((p) => p.category === activeCategory)
        : getProducts(),
    [activeCategory]
  );

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-200 text-lg">
            {activeCategory || "Complete range of industrial cleaning machines"}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/products"
                    className={cn(
                      "block px-3 py-2 text-sm rounded-lg transition-colors",
                      !activeCategory
                        ? "bg-primary text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    All Products ({getProducts().length})
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-lg transition-colors",
                        activeCategory === cat
                          ? "bg-primary text-white font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {cat} ({counts[cat] || 0})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-4">
              Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              {activeCategory && ` in "${activeCategory}"`}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">No products found in this category.</p>
                <Link href="/products" className="text-primary hover:text-primary-light font-medium">
                  View all products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
