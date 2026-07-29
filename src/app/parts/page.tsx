import { Suspense } from "react";
import { PartPageContent } from "./parts-content";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, PARTS_BREADCRUMB } from "@/lib/breadcrumb";

export const metadata = {
  title: "Floor Scrubber Parts | OEM Replacement Parts Factory Direct | Aikerui",
  description: "Factory-direct floor scrubber parts — disc brushes, squeegee blades, pad holders, roller brushes, clutch plates & more. Compatible with Tennant, Nilfisk, Karcher, Dulevo, Gaomei. Same OEM quality at 30-50% less. 360+ parts in stock.",
};

export default function PartsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(PARTS_BREADCRUMB)} />
      <Suspense fallback={<PartsLoading />}>
        <PartPageContent />
      </Suspense>
    </>
  );
}

function PartsLoading() {
  return (
    <div>
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white/70">Floor Scrubber Parts — Factory Direct Pricing</h1>
          <div className="h-6 w-72 bg-white/20 rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-12 bg-gray-100 rounded-xl animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                <div className="h-10 bg-gray-100 rounded-lg animate-pulse mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
