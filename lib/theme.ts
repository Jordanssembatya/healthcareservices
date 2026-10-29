import { products } from "./products";

// Visual accent per product (styling only, not data).
const accents = [
  { from: "#0f5c4a", to: "#1d9071", soft: "#e3f4ee", text: "#0f5c4a" },
  { from: "#9a3412", to: "#ea580c", soft: "#fdeee3", text: "#9a3412" },
  { from: "#4c1d95", to: "#7c3aed", soft: "#efe9fd", text: "#5b21b6" },
  { from: "#075985", to: "#0284c7", soft: "#e2f1fa", text: "#075985" },
];

export function accentFor(id: string) {
  const i = Math.max(0, products.findIndex((p) => p.id === id));
  return accents[i % accents.length];
}

export function initials(name: string | null): string {
  if (!name) return "?";
  return name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}
