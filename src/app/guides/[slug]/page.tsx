import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuideBySlug, getGuides, guideCategories } from "@/lib/guides";
import { Clock, BookOpen, ArrowLeft, Tag } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };

  return {
    title: `${guide.title} | Aikerui Guides`,
    description: guide.description,
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  const categoryLabel =
    guideCategories.find((c) => c.slug === guide.category)?.label ||
    guide.category;

  // HowTo schema for step-by-step guides
  const hasSteps = guide.sections.some((s) => s.items && s.items.length > 0);
  const howToJsonLd = hasSteps
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: guide.title,
        description: guide.description,
        totalTime: guide.readTime,
        step: guide.sections
          .filter((s) => s.items && s.items.length > 0)
          .map((s) => ({
            "@type": "HowToStep",
            name: s.heading,
            text: s.items?.join(". ") || s.content,
          })),
      }
    : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aikeruiclean.com/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: "https://aikeruiclean.com/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
      },
    ],
  };

  return (
    <div>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

      {/* Top navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/guides"
              className="hover:text-primary transition-colors"
            >
              Guides
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate">{guide.title}</span>
          </nav>
        </div>
      </div>

      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize flex items-center gap-1">
              <Tag size={12} />
              {categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={12} />
              {guide.readTime} read
            </span>
            <span className="text-xs text-gray-400">{guide.published}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {guide.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {guide.description}
          </p>

          {/* Table of Contents */}
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-10">
            <h2 className="font-bold text-gray-900 mb-3">
              In This Guide
            </h2>
            <ul className="space-y-2">
              {guide.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="text-sm text-primary hover:text-primary-light transition-colors"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Content sections */}
          <div className="space-y-10">
            {guide.sections.map((section, i) => (
              <section key={i} id={`section-${i}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {section.content}
                </p>
                {section.items && section.items.length > 0 && (
                  <ul className="space-y-2 pl-5">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-gray-600 leading-relaxed list-disc"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Related products */}
          {guide.relatedProducts && guide.relatedProducts.length > 0 && (
            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-3">
                Related Products
              </h3>
              <div className="flex flex-wrap gap-2">
                {guide.relatedProducts.map((sku) => (
                  <span
                    key={sku}
                    className="px-3 py-1.5 bg-white text-sm text-gray-700 rounded-lg border border-blue-100"
                  >
                    {sku}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:text-primary-light transition-colors"
              >
                <BookOpen size={14} />
                Inquire about these products
              </Link>
            </div>
          )}
        </div>
      

      {/* Author Bio */}
      <div className="border-t border-gray-200 pt-6 mt-12">
        <p className="text-sm font-semibold text-gray-900">About the Author</p>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          Zhang Hengming is a cleaning equipment engineer at Aikerui with 8+ years
          of experience in industrial floor cleaning solutions. He has helped 200+
          facilities across 50+ countries select the right cleaning equipment.
        </p>
      </div></article>

      {/* Back to guides */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to all guides
          </Link>
        </div>
      </section>
    </div>
  );
}
