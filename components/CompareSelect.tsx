"use client";

import { useRouter } from "next/navigation";

type Option = { id: string; name: string; insurer: string | null; accent: string; isSample: boolean };

export function CompareSelect({ products, a, b }: { products: Option[]; a: string; b: string }) {
  const router = useRouter();
  const go = (na: string, nb: string) => router.replace(`/compare?a=${na}&b=${nb}`, { scroll: false });

  const slots = [
    { label: "Plan 1", value: a, onChange: (v: string) => go(v, b) },
    { label: "Plan 2", value: b, onChange: (v: string) => go(a, v) },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {slots.map((s) => {
        const current = products.find((p) => p.id === s.value);
        return (
          <label key={s.label} className="relative block overflow-hidden rounded-2xl text-white shadow-card" style={{ background: current?.accent }}>
            <span className="sr-only">{s.label}</span>
            <span className="pointer-events-none block p-3 pr-8 sm:p-4">
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                {s.label}
                {current?.isSample && " · Sample"}
              </span>
              <span className="mt-0.5 block truncate text-[15px] font-extrabold leading-tight sm:text-[17px]">{current?.name}</span>
              <span className="block truncate text-[12px] text-white/70">{current?.insurer}</span>
            </span>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/80" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
              <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <select value={s.value} onChange={(e) => s.onChange(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" aria-label={`Choose ${s.label}`}>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        );
      })}
    </div>
  );
}
