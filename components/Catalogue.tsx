"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { audiences, type Audience, type Product } from "@/lib/products";
import { ArrowRight, Columns, Cross } from "./Icons";
import { PlanCard } from "./PlanCard";

export function Catalogue({ products, initialAudience }: { products: Product[]; initialAudience?: Audience }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState<Audience | null>(initialAudience ?? null);

  const toggle = (id: string) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id].slice(-2)));

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (audience && !p.audience.includes(audience)) return false;
      if (!q) return true;
      const hay = [p.name, p.insurer, p.type, p.targetGroup, p.summary, ...(p.coverage ?? [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [products, query, audience]);

  const names = selected.map((id) => products.find((p) => p.id === id)?.name).filter(Boolean);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-4 bg-canvas/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative block md:w-80">
            <span className="sr-only">Search plans</span>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <circle cx="11" cy="11" r="6.5" />
              <path d="M20 20l-4-4" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. maternity, accident"
              className="w-full rounded-2xl border-0 bg-white py-3.5 pl-12 pr-4 text-[15px] shadow-card outline-none ring-1 ring-line placeholder:text-muted/70 focus:ring-2 focus:ring-brand-500"
            />
          </label>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
            <Chip active={audience === null} onClick={() => setAudience(null)}>
              All plans
            </Chip>
            {audiences.map((a) => (
              <Chip key={a.id} active={audience === a.id} onClick={() => setAudience(audience === a.id ? null : a.id)}>
                {a.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-2 text-sm text-muted">
        {visible.length} {visible.length === 1 ? "plan" : "plans"} · tick <span className="font-semibold text-ink">Compare</span> on two to see them side by side
      </p>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-[28px] border border-dashed border-line bg-white/60 p-10 text-center">
          <p className="text-lg font-bold">No plans match that search</p>
          <button type="button" onClick={() => { setQuery(""); setAudience(null); }} className="mt-3 font-semibold text-brand-700">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((p, i) => (
            <div key={p.id} className="animate-rise" style={{ animationDelay: `${i * 60}ms` }}>
              <PlanCard p={p} selected={selected.includes(p.id)} onToggle={() => toggle(p.id)} />
            </div>
          ))}
        </div>
      )}

      {selected.length > 0 && (
        <div className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+76px)] z-30 mx-auto max-w-lg animate-rise md:bottom-6">
          <div className="flex items-center gap-3 rounded-[22px] bg-ink p-2.5 pl-4 text-white shadow-float">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-lime">
              <Columns className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold">{selected.length === 1 ? "Pick one more plan" : "Ready to compare"}</p>
              <p className="truncate text-[12px] text-white/60">{names.join(" vs ")}</p>
            </div>
            {selected.length === 2 ? (
              <Link href={`/compare?a=${selected[0]}&b=${selected[1]}`} className="flex items-center gap-1.5 rounded-2xl bg-lime px-4 py-3 text-sm font-extrabold text-ink">
                Compare <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <button type="button" onClick={() => setSelected([])} aria-label="Clear selection" className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
                <Cross className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${active ? "bg-ink text-white" : "bg-white text-ink/75 ring-1 ring-line hover:text-ink"}`}
    >
      {children}
    </button>
  );
}
