import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floor Scrubber Quote — Factory Direct | Aikerui",
  description:
    "Get factory-direct pricing on industrial floor scrubbers, sweepers and carpet extractors. Walk-behind and ride-on models, CE certified, OEM available. 24-hour quote response.",
  alternates: { canonical: "https://aikeruiclean.com/floor-scrubber-parts-quote" },
};

export default function PartsQuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
