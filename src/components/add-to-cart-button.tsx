"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import { ShoppingCart, CheckCircle } from "@/lib/icons";

/**
 * 加入购物车按钮（仅用于有明确价格的产品）
 * 与 InquiryButton 并存，客户可买也可问
 */
export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const price = product.price != null ? product.price : 0;

  return (
    <button
      onClick={() => {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2200);
      }}
      className={`inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-lg transition-colors text-base ${
        added
          ? "bg-green-600 text-white"
          : "bg-accent hover:bg-accent-hover text-white"
      }`}
    >
      {added ? <CheckCircle size={18} /> : <ShoppingCart size={18} />}
      {added ? "Added to Cart" : `Add to Cart — $${price.toFixed(2)}`}
    </button>
  );
}
