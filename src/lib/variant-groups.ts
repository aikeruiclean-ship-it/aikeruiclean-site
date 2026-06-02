import type { Product } from "./products";

export interface VariantGroup {
  id: string;
  name: string;
  attribute: string;
  products: Product[];
}

export function buildVariantGroups(products: Product[]): VariantGroup[] {
  const groupMap = new Map<string, Product[]>();

  for (const p of products) {
    if (p.variantGroupId) {
      const list = groupMap.get(p.variantGroupId) || [];
      list.push(p);
      groupMap.set(p.variantGroupId, list);
    }
  }

  const result: VariantGroup[] = [];

  for (const [id, members] of groupMap) {
    // Only show as variant if the group actually has multiple products
    if (members.length < 2) continue;

    // Derive group name from common name prefix
    const commonName = deriveGroupName(members, id);
    const attribute = deriveAttribute(id);

    result.push({ id, name: commonName, attribute, products: members });
  }

  return result.sort((a, b) => a.id.localeCompare(b.id));
}

function deriveAttribute(groupId: string): string {
  const attrMap: Record<string, string> = {
    "cz-f1": "Thread Type",
    "cz-f2": "Thread Type",
    "cz-f3": "Thread Type",
    "cz-f5": "Thread Type",
    "cz-f6": "Type",
    "cz-f7": "Thread Type",
    "cz-f10": "Thread Type",
    "cz-f11": "Thread Type",
    "cz-f13": "Thread Type",
    "cz-f14": "Rotation",
    "cz-f15": "Thread Type",
    "cz-f17": "Thread Type",
    "cz-f19": "Thread Type",
    "cz-f20": "Thread Type",
    "cz-f21": "Thread Type",
    "cz-f22": "Thread Type",
  };
  return attrMap[groupId] || "Type";
}

function deriveGroupName(products: Product[], groupId: string): string {
  // Extract common prefix from all product names
  const names = products.map((p) => p.name);
  const first = names[0].split(" ");
  const common = first.filter((word) =>
    names.every((n) => n.toLowerCase().includes(word.toLowerCase()))
  );
  // Remove very generic words
  const filtered = common.filter(
    (w) =>
      ![
        "for",
        "the",
        "compatible",
        "floor",
        "scrubber",
        " - ",
        "",
      ].includes(w.toLowerCase())
  );
  return filtered.join(" ").trim() || `Flange Set (${groupId.toUpperCase()})`;
}
