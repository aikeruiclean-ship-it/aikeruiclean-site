import type { Metadata } from "next";
import Link from "next/link";
import { getGuides } from "@/lib/guides";
import { JsonLd } from "@/components/json-ld";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Floor Scrubber Guides & Resources | Buying Tips, Maintenance & Comparison | Aikerui",
  description:
    "Expert floor scrubber guides covering buying advice, maintenance tips, troubleshooting, product comparisons, and industry-specific recommendations. Free resources for facility managers and business owners.",
  keywords: [
    "floor scrubber guide",
    "floor scrubber buying guide",
    "scrubber maintenance guide",
    "floor scrubber comparison",
    "industrial cleaning guide",
  ],
  alternates: { canonical: "https://aikeruiclean.com/guides" },
};

const CATEGORY_LABELS: Record<string, { label: string; icon: string }> = {
  "buying-guide": { label: "Buying Guides", icon: "📖" },
  maintenance: { label: "Maintenance", icon: "🔧" },
  comparison: { label: "Comparisons", icon: "⚖️" },
  troubleshooting: { label: "Troubleshooting", icon: "🩺" },
  "product-showcase": { label: "Product Showcase", icon: "🏭" },
};

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Floor Scrubber Guides & Resources",
          description:
            "Expert guides on floor scrubber buying, maintenance, troubleshooting, and industry solutions.",
        }}
      />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Floor Scrubber Guides & Resources
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Expert advice on buying, maintaining, and troubleshooting floor
            scrubbers. Free resources for facility managers, business owners, and
            cleaning professionals.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {["buying-guide", "maintenance", "troubleshooting", "comparison", "product-showcase"].map(
          (cat) => {
            const catGuides = guides.filter((g) => g.category === cat);
            if (catGuides.length === 0) return null;
            const info = CATEGORY_LABELS[cat] || {
              label: cat,
              icon: "📄",
            };
            return (
              <section key={cat} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {info.icon} {info.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {guide.difficulty}
                        </span>
                        <span className="text-xs text-gray-400">
                          {guide.readTime}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {guide.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          }
        )}
      </div>
    </div>
  );
}
// force rebuild
