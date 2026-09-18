import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floor Scrubber Parts | Pad Holders, Disc Brushes, Squeegees & More | Dulevo, Nilfisk, Gaomei Compatible | Aikerui",
  description:
    "Factory-direct floor scrubber parts: pad holders, pad drivers, disc brushes, squeegee rubber. Compatible with Dulevo, Nilfisk, Gaomei, Tennant, Karcher. 30-50% less than dealer. 360+ parts in stock.",
  keywords: [
    "floor scrubber parts",
    "scrubber pad holder",
    "floor care pad driver",
    "utility pad holder",
    "disc brush replacement",
    "scrubber squeegee rubber",
    "dulevo scrubber parts",
    "dulevo sweeper parts",
    "nilfisk scrubber parts",
    "gaomei gm50b",
    "scrubber cost",
    "floor scrubber consumables",
    "floor scrubber brush OEM",
    "scrubber parts manufacturer China",
    "replacement parts for floor scrubber",
  ],
  openGraph: {
    title: "Floor Scrubber Parts — Factory Direct, 30-50% Less Than Dealer | Aikerui",
    description:
      "360+ parts in stock. Disc brushes, squeegee rubber, pad holders. Compatible with Tennant, Nilfisk, Karcher + 20 brands. 24h quote.",
  },
  alternates: { canonical: "https://aikeruiclean.com/floor-scrubber-parts-quote" },
};

export default function PartsQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
