import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Mark Xu — Sales Director & Floor Cleaning Equipment Expert | Aikerui",
  description:
    "Mark Xu, Sales Director at Aikerui Cleaning Technology. 15+ years experience in industrial floor cleaning equipment manufacturing, OEM parts, and global B2B equipment sales.",
  alternates: { canonical: "https://aikeruiclean.com/about/mark-xu" },
};

export default function AuthorPage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mark Xu",
          jobTitle: "Sales Director",
          worksFor: {
            "@type": "Organization",
            name: "Aikerui Cleaning Technology Co., Ltd.",
          },
          description:
            "Sales Director with 15+ years experience in industrial floor cleaning equipment manufacturing, OEM parts, and global B2B equipment sales.",
          url: "https://aikeruiclean.com/about/mark-xu",
          sameAs: [
            "https://youtube.com/@markxu-u8h",
            "https://x.com/mark_xu71710",
            "https://quora.com/profile/Mark-Xu-110",
          ],
        }}
      />

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-5xl shrink-0">
              MX
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Mark Xu</h1>
              <p className="text-xl text-gray-200 mb-1">Sales Director</p>
              <p className="text-gray-300">
                Aikerui Cleaning Technology Co., Ltd.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            With over 15 years of experience in the industrial cleaning equipment
            industry, I help businesses worldwide source high-quality floor
            scrubbers, sweepers, and replacement parts at factory-direct prices.
          </p>
          <p className="text-gray-600 leading-relaxed mb-3">
            As Sales Director at Aikerui, I work directly with facility
            managers, procurement specialists, and distributors across 50+
            countries. My focus is on eliminating middleman markup — helping
            buyers get the same CE-certified, ISO 9001 equipment at 30-50% less
            than dealer prices.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I personally oversee every inquiry that comes through our website.
            When you submit a quote request, I'm the one who reviews it and
            ensures you get a detailed, accurate response within 24 hours.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Industrial Floor Scrubbers & Sweepers",
              "OEM & Aftermarket Parts Sourcing",
              "Factory-Direct B2B Equipment Sales",
              "International Logistics & Export",
              "Floor Scrubber Maintenance & Troubleshooting",
              "Battery Technology (Lead-Acid & Lithium)",
              "China Manufacturing & Supply Chain",
              "Custom OEM/ODM Equipment Specification",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-4 py-3 rounded-lg"
              >
                <span className="text-primary font-bold">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Articles by Mark Xu
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            I write all the technical guides and buying advice on this site.
            These articles reflect real-world experience from 15+ years in the
            cleaning equipment industry — not marketing copy.
          </p>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Browse all guides →
          </Link>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              📧 Email:{" "}
              <a
                href="mailto:info@aikeruiclean.com"
                className="text-primary hover:underline"
              >
                info@aikeruiclean.com
              </a>
            </p>
            <p>
              📱 WhatsApp:{" "}
              <a
                href="https://api.whatsapp.com/send?phone=8619159116875"
                className="text-primary hover:underline"
              >
                +86 191 5911 6875
              </a>
            </p>
            <p>
              ▶ YouTube:{" "}
              <a
                href="https://youtube.com/@markxu-u8h"
                className="text-primary hover:underline"
              >
                @markxu-u8h
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
