"use client";

import { useState } from "react";
import { NotProvided } from "./Fields";
import { Check } from "./Icons";
import { TextWithTerms } from "./TextWithTerms";

type Group = { key: string; title: string; subtitle: string; items: string[] | null; numbered?: boolean };

// Ticks live in memory only: nothing is stored or sent.
export function Checklist({ groups }: { groups: Group[] }) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const total = groups.reduce((n, g) => n + (g.items?.length ?? 0), 0);
  const pct = total ? Math.round((done.size / total) * 100) : 0;

  const toggle = (k: string) =>
    setDone((cur) => {
      const next = new Set(cur);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  return (
    <div>
      <div className="flex items-center gap-4 rounded-[24px] bg-white p-4 shadow-card ring-1 ring-line/70">
        <Ring pct={pct} />
        <div>
          <p className="text-[15px] font-extrabold">{done.size === total && total > 0 ? "You're ready to contact the insurer" : "Your progress"}</p>
          <p className="text-[13px] text-muted">
            {done.size} of {total} ticked · nothing is saved or sent
          </p>
        </div>
      </div>

      <ol className="relative mt-6 space-y-6 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-0.5 before:bg-line">
        {groups.map((g, gi) => {
          const groupDone = g.items?.length ? g.items.every((_, i) => done.has(`${g.key}-${i}`)) : false;
          return (
            <li key={g.key} className="relative pl-14">
              <span className={`absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full text-[15px] font-extrabold ring-4 ring-canvas transition ${groupDone ? "bg-brand-600 text-white" : "bg-white text-ink shadow-card"}`}>
                {groupDone ? <Check strokeWidth={3} /> : gi + 1}
              </span>
              <h2 className="pt-1.5 text-lg font-extrabold tracking-tight">{g.title}</h2>
              <p className="text-[14px] text-muted">{g.subtitle}</p>
              {!g.items || g.items.length === 0 ? (
                <div className="mt-3">
                  <NotProvided />
                </div>
              ) : (
                <ul className="mt-3 space-y-2">
                  {g.items.map((item, i) => {
                    const k = `${g.key}-${i}`;
                    const checked = done.has(k);
                    return (
                      <li key={k}>
                        <label className={`flex cursor-pointer gap-3 rounded-2xl bg-white p-4 ring-1 transition ${checked ? "ring-brand-400" : "ring-line/80 hover:ring-ink/20"}`}>
                          <input type="checkbox" checked={checked} onChange={() => toggle(k)} className="peer sr-only" />
                          <span className={`mt-px grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[13px] ring-1 transition peer-focus-visible:outline-2 peer-focus-visible:outline-brand-500 ${checked ? "bg-brand-600 text-white ring-brand-600" : "ring-slate-300"}`}>
                            {checked && <Check strokeWidth={3.5} />}
                          </span>
                          <span className={`text-[15px] leading-snug ${checked ? "text-muted line-through decoration-muted/50" : "text-ink"}`}>
                            {g.numbered && <span className="font-bold">Step {i + 1}. </span>}
                            <TextWithTerms text={item} />
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Ring({ pct }: { pct: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90" aria-hidden>
        <circle cx="28" cy="28" r={r} fill="none" stroke="var(--color-line)" strokeWidth="6" />
        <circle cx="28" cy="28" r={r} fill="none" stroke="var(--color-brand-500)" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} className="transition-[stroke-dashoffset] duration-500" />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[13px] font-extrabold">{pct}%</span>
    </div>
  );
}
