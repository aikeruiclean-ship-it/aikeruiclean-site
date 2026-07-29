import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuideBySlug, getGuides, guideCategories } from "@/lib/guides";
import { Clock, BookOpen, ArrowLeft, Tag } from "@/lib/icons";
import type { Metadata } from "next";
import { YouTubeLink } from "@/components/youtube-link";

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
    title: `${guide.title.length > 50 ? guide.title.slice(0, 47).trim().replace(/[,:;/-]+$/, "") + "..." : guide.title} | Aikerui Guides`,
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

  // Generate FAQPage schema from guide sections that look like questions or problem descriptions
  const faqSection = guide.sections.filter(
    (s) =>
      s.heading.includes("?") ||
      s.heading.includes("How ") ||
      s.heading.includes("Why ") ||
      s.heading.includes("What ") ||
      s.heading.includes("Which ") ||
      s.heading.includes("When ") ||
      s.heading.includes("Symptom") ||
      s.heading.includes("Cause")
  );
  const faqJsonLd =
    faqSection.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSection.slice(0, 10).map((s) => ({
            "@type": "Question",
            name: s.heading.replace(/\d+分钟|Step \d+:?\s*/g, "").trim(),
            acceptedAnswer: {
              "@type": "Answer",
              text: (s.content + (s.items ? " " + s.items.join(" ") : "")).slice(0, 500),
            },
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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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

          {/* Video embed */}
          {guide.videoId && (
            <div className="mt-6">
              <YouTubeLink videoId={guide.videoId} title={guide.title} />
            </div>
          )}

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
                  <Link
                    key={sku}
                    href={`/products?q=${encodeURIComponent(sku)}`}
                    className="px-3 py-1.5 bg-white text-sm text-primary rounded-lg border border-blue-100 hover:border-primary transition-colors"
                  >
                    {sku}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:text-primary-light transition-colors"
              >
                <BookOpen size={14} />
                Get a Quote for These Products
              </Link>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-primary text-white rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ready to Get Factory-Direct Pricing?
            </h2>
            <p className="text-gray-200 mb-6 max-w-lg mx-auto">
              Get a quote within 24 hours. No middlemen — buy direct from the
              manufacturer and save 30-50%.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/floor-scrubber-parts-quote"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"
              >
                Get Your Quote Now
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing."
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      

      {/* Author Bio */}
      <div className="border-t border-gray-200 pt-6 mt-12">
        <p className="text-sm font-semibold text-gray-900">About the Author</p>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          <Link href="/about/mark-xu" className="text-primary hover:underline font-medium">Mark Xu</Link> is Sales Director at Aikerui with 15+ years of experience in industrial floor cleaning equipment. He has helped 2,000+ facilities across 50+ countries source factory-direct cleaning equipment.
        </p>
      </div></article>

      {/* Back to guides */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to all guides
          </Link>
          <Link
            href="/parts"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            Browse 360+ floor scrubber parts →
          </Link>
        </div>
      </section>
    </div>
  );
}
