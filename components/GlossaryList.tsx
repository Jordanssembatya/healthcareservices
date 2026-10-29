"use client";

import { useState } from "react";
import type { GlossaryTerm } from "@/lib/glossary";

export function GlossaryList({ terms }: { terms: GlossaryTerm[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const visible = [...terms]
    .sort((a, b) => a.term.localeCompare(b.term))
    .filter((t) => !query || `${t.term} ${t.definition}`.toLowerCase().includes(query));

  return (
    <>
      <div className="sticky top-16 z-30 -mx-4 bg-canvas/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <label className="relative block max-w-md">
          <span className="sr-only">Search words</span>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <circle cx="11" cy="11" r="6.5" />
            <path d="M20 20l-4-4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a word, e.g. co-pay"
            className="w-full rounded-2xl border-0 bg-white py-3.5 pl-12 pr-4 text-[15px] shadow-card outline-none ring-1 ring-line placeholder:text-muted/70 focus:ring-2 focus:ring-brand-500"
          />
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-[24px] border border-dashed border-line p-8 text-center text-muted">No words match “{q}”.</p>
      ) : (
        <dl className="mt-3 grid gap-4 md:grid-cols-2">
          {visible.map((t) => (
            <div key={t.id} id={t.id} className="scroll-mt-36 rounded-[24px] bg-white p-6 shadow-card ring-1 ring-line/70">
              <dt className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-lg font-extrabold text-brand-700">{t.term[0]}</span>
                <span className="text-xl font-extrabold tracking-tight">{t.term}</span>
              </dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-ink/75">{t.definition}</dd>
              {t.example && (
                <dd className="mt-4 rounded-2xl bg-brand-50/70 p-4 text-[14px] leading-relaxed text-ink/75 ring-1 ring-brand-100">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-brand-700">Example</span>
                  {t.example}
                </dd>
              )}
            </div>
          ))}
        </dl>
      )}
    </>
  );
}
