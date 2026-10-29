import type { ReactNode } from "react";
import { termIdFor, termPattern } from "@/lib/glossary";
import { Term } from "./Term";

// Wraps glossary words in tap-to-explain buttons (first occurrence of each term per string).
export function TextWithTerms({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const used = new Set<string>();
  let last = 0;

  for (const match of text.matchAll(termPattern)) {
    const id = termIdFor(match[0]);
    if (!id || used.has(id)) continue;
    used.add(id);
    const start = match.index ?? 0;
    parts.push(text.slice(last, start));
    parts.push(
      <Term key={`${id}-${start}`} id={id}>
        {match[0]}
      </Term>,
    );
    last = start + match[0].length;
  }
  parts.push(text.slice(last));

  return <>{parts}</>;
}
