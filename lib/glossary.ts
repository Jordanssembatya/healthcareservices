import data from "@/data/glossary.json";

export type GlossaryTerm = {
  id: string;
  term: string;
  matches: string[];
  definition: string;
  example: string | null;
};

export const glossary: GlossaryTerm[] = data;

export function getTerm(id: string): GlossaryTerm | undefined {
  return glossary.find((t) => t.id === id);
}

const matchToId = new Map<string, string>();
for (const t of glossary) for (const m of t.matches) matchToId.set(m.toLowerCase(), t.id);

// Longest first so "waiting period" wins over shorter overlaps.
const patterns = [...matchToId.keys()]
  .sort((a, b) => b.length - a.length)
  .map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

export const termPattern = new RegExp(`\\b(${patterns.join("|")})\\b`, "gi");

export function termIdFor(match: string): string | undefined {
  return matchToId.get(match.toLowerCase());
}
