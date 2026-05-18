import { Suspense } from "react";
import { ProductsContent } from "./products-content";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
