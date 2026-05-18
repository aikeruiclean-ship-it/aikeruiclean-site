"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0] || "";

  // Extract key specs for display
  const specLines: string[] = [];
  if (product.specs["Working width"]) specLines.push(`Width: ${product.specs["Working width"]}`);
  if (product.specs["Cleaning path"]) specLines.push(`Path: ${product.specs["Cleaning path"]}`);
  if (product.specs["Productivity"]) specLines.push(`Rate: ${product.specs["Productivity"]}`);
  if (product.specs["Tank of fresh"] && product.specs["Tank of dirty"]) {
    specLines.push(`Tanks: ${product.specs["Tank of fresh"]}/${product.specs["Tank of dirty"]}L`);
  }
  if (product.specs["Battery"]) specLines.push(`Battery: ${product.specs["Battery"]}`);
  if (product.specs["Dimensions"]) specLines.push(`Size: ${product.specs["Dimensions"]}`);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex flex-col">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] rounded-t-xl overflow-hidden bg-gray-100">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-0.5 bg-primary/90 text-white text-[10px] font-medium rounded">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Quick specs */}
        {specLines.length > 0 && (
          <div className="mt-2 space-y-0.5">
            {specLines.slice(0, 4).map((line, i) => (
              <p key={i} className="text-xs text-gray-500">{line}</p>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4">
          <Link
            href={`/products/${product.slug}`}
            className="block w-full text-center px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Inquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}
