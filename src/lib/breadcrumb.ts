// Breadcrumb JSON-LD helper and shared breadcrumb data
// See: https://schema.org/BreadcrumbList

interface BreadcrumbItem {
  name: string;
  item?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.item ? { item: `https://aikeruiclean.com${item.item}` } : {}),
    })),
  };
}

export const CONTACT_BREADCRUMB: BreadcrumbItem[] = [
  { name: "Home", item: "/" },
  { name: "Contact", item: "/contact" },
];

export const ABOUT_BREADCRUMB: BreadcrumbItem[] = [
  { name: "Home", item: "/" },
  { name: "About Us", item: "/about" },
];

export const PRODUCTS_BREADCRUMB: BreadcrumbItem[] = [
  { name: "Home", item: "/" },
  { name: "Products", item: "/products" },
];

export const PARTS_BREADCRUMB: BreadcrumbItem[] = [
  { name: "Home", item: "/" },
  { name: "Parts", item: "/parts" },
];
