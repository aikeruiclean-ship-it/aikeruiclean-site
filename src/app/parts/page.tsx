import { Suspense } from "react";
import { PartPageContent } from "./parts-content";

export const metadata = {
  title: "Replacement Parts & Accessories | Aikerui Cleaning Technology",
  description:
    "Browse 340+ replacement parts for floor scrubbers and sweepers. Disc brushes, squeegees, pad holders, rollers, hoses, and more. B2B wholesale, global shipping.",
  openGraph: {
    title: "Replacement Parts & Accessories | Aikerui",
    description: "Find genuine and compatible replacement parts for all major floor cleaning machine brands.",
  },
};

export default function PartsPage() {
  return (
    <Suspense fallback={<PartsLoading />}>
      <PartPageContent />
    </Suspense>
  );
}

function PartsLoading() {
  return (
    <div>
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="h-9 w-48 bg-white/20 rounded-lg animate-pulse mb-2" />
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
}{/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Replacement Parts & Accessories</h1>
            <p className="text-gray-200 text-lg">Genuine replacement parts manufactured to OEM specs. In stock at our factory warehouse in Hefei, China.</p>
          </div>
        </div>
      </section>Suspense } from "react";
import { PartPageContent } from "./parts-content";

export const metadata = {
  title: "Replacement Parts & Accessories | Aikerui Cleaning Technology",
  description:
    "Browse 340+ replacement parts for floor scrubbers and sweepers. Disc brushes, squeegees, pad holders, rollers, hoses, and more. B2B wholesale, global shipping.",
  openGraph: {
    title: "Replacement Parts & Accessories | Aikerui",
    description: "Find genuine and compatible replacement parts for all major floor cleaning machine brands.",
  },
};

export default function PartsPage() {
  return (
    <Suspense fallback={<PartsLoading />}>
      <PartPageContent />
    </Suspense>
  );
}

function PartsLoading() {
  return (
    <div>
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="h-9 w-48 bg-white/20 rounded-lg animate-pulse mb-2" />
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
