import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floor Scrubber & Auto Scrubber Parts Quote | Aikerui",
  description:
    "Get factory-direct pricing on floor scrubbers and sweepers, plus auto scrubber parts and brushes from the same factory. CE certified, OEM available.",
  alternates: { canonical: "https://aikeruiclean.com/floor-scrubber-parts-quote" },
};

export default function PartsQuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
