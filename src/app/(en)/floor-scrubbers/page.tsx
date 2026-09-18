import type { Metadata } from "next";
import { MachineCategoryPage } from "@/components/machine-category-page";
import { MACHINE_CATEGORIES } from "@/lib/machine-categories";

const SITE_URL = "https://aikeruiclean.com";
const def = MACHINE_CATEGORIES.find((c) => c.slug === "floor-scrubbers")!;

export const metadata: Metadata = {
  title: def.title,
  description: def.description,
  alternates: { canonical: `${SITE_URL}/${def.slug}` },
  openGraph: {
    title: def.title,
    description: def.description,
    url: `${SITE_URL}/${def.slug}`,
    type: "website",
  },
};

export default function Page() {
  return <MachineCategoryPage def={def} />;
}
