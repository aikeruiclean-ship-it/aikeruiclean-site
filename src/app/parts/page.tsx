import { Suspense } from "react";
import { PartPageContent } from "./parts-content";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, PARTS_BREADCRUMB } from "@/lib/breadcrumb";

export const metadata = {
  title: "Floor Scrubber Parts | OEM Replacement Parts Factory Direct | Aikerui",
  description: "Factory-direct floor scrubber parts — disc brushes, squeegee blades, pad holders, roller brushes, clutch plates & more. Compatible with Tennant, Nilfisk, Karcher, Dulevo, Gaomei. Same OEM quality at 30-50% less. 360+ parts in stock.",
  alternates: { canonical: "https://aikeruiclean.com/parts" },
};

const partsFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What floor scrubber parts do you manufacture?",
      acceptedAnswer: { "@type": "Answer", text: "We manufacture 360+ replacement floor scrubber parts including disc brushes, squeegee blades, pad holders, roller brushes, clutch plates, side brushes, batteries, and chargers. All parts are produced in our ISO 9001 certified factory." }
    },
    {
      "@type": "Question",
      name: "Are your parts compatible with Tennant, Nilfisk, and other brands?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Our replacement floor scrubber parts are compatible with Tennant, Nilfisk, Viper, Kärcher, Hako, Dulevo, Gaomei, Comac, and 15+ other major brands. Check your machine model for specific compatibility." }
    },
    {
      "@type": "Question",
      name: "How do your prices compare to dealer pricing?",
      acceptedAnswer: { "@type": "Answer", text: "Our factory-direct pricing is typically 30-50% less than dealer prices for equivalent OEM quality parts. A disc brush that costs $150 at a dealer is $45-75 from our factory." }
    },
    {
      "@type": "Question",
      name: "What is the minimum order quantity for parts?",
      acceptedAnswer: { "@type": "Answer", text: "We accept orders of all sizes — from single replacement brushes to bulk OEM orders. No minimum order quantity for stocked items." }
    },
    {
      "@type": "Question",
      name: "How quickly do you ship floor scrubber parts?",
      acceptedAnswer: { "@type": "Answer", text: "In-stock parts ship within 24 hours via express courier. Global shipping to 50+ countries. Sea freight available for bulk orders." }
    },
  ],
};

export default function PartsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(PARTS_BREADCRUMB)} />
      <JsonLd data={partsFaqSchema} />
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
