"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { getTerm } from "@/lib/glossary";
import { Sparkle } from "./Icons";

const tones = {
  default: "underline decoration-dotted decoration-2 underline-offset-[5px] decoration-brand-400 hover:bg-brand-50",
  light: "underline decoration-dotted decoration-2 underline-offset-[5px] decoration-lime/80 hover:bg-white/10",
  chip: "rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-card ring-1 ring-line hover:ring-brand-300",
};

export function Term({ id, children, tone = "default" }: { id: string; children?: ReactNode; tone?: keyof typeof tones }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const term = getTerm(id);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!term) return <>{children}</>;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        aria-haspopup="dialog"
        className={`inline cursor-help rounded text-left font-[inherit] transition focus-visible:outline-2 focus-visible:outline-brand-500 ${tones[tone]}`}
      >
        {children ?? term.term}
        <span className="sr-only"> (tap for meaning)</span>
      </button>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[60] flex animate-fade items-end justify-center bg-ink/50 backdrop-blur-[2px] sm:items-center sm:p-6" onClick={() => setOpen(false)}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md animate-sheet rounded-t-[28px] bg-white px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-3 shadow-float sm:rounded-[28px] sm:pb-6"
            >
              <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line sm:hidden" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700">
                <Sparkle className="h-3.5 w-3.5" /> In plain words
              </span>
              <h2 id={titleId} className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
                {term.term}
              </h2>
              <p className="mt-2 text-[16px] leading-relaxed text-ink/80">{term.definition}</p>
              {term.example && (
                <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700">Example</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/80">{term.example}</p>
                </div>
              )}
              <button type="button" autoFocus onClick={() => setOpen(false)} className="mt-5 w-full rounded-2xl bg-ink py-3.5 font-bold text-white transition active:scale-[0.99]">
                Got it
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
