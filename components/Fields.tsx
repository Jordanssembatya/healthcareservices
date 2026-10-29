import type { ComponentType, ReactNode, SVGProps } from "react";
import { NOT_PROVIDED, SAMPLE_LABEL, type BenefitLimit } from "@/lib/products";
import { Check, Clipboard, Cross, Gauge, Help, Info } from "./Icons";
import { TextWithTerms } from "./TextWithTerms";

export type Variant = "coverage" | "exclusions" | "limits" | "enrol" | "neutral";

type Style = { icon: ComponentType<SVGProps<SVGSVGElement>>; tile: string; ring: string; head: string; dot: string; row: string; eyebrow: string };

export const variantStyles: Record<Variant, Style> = {
  coverage: { icon: Check, tile: "bg-emerald-500 text-white", ring: "ring-emerald-200", head: "bg-emerald-50", dot: "bg-emerald-100 text-emerald-700", row: "bg-emerald-50/60", eyebrow: "text-emerald-700" },
  exclusions: { icon: Cross, tile: "bg-rose-500 text-white", ring: "ring-rose-200", head: "bg-rose-50", dot: "bg-rose-100 text-rose-700", row: "bg-rose-50/60", eyebrow: "text-rose-700" },
  limits: { icon: Gauge, tile: "bg-amber-400 text-amber-950", ring: "ring-amber-200", head: "bg-amber-50", dot: "bg-amber-100 text-amber-800", row: "bg-amber-50/70", eyebrow: "text-amber-700" },
  enrol: { icon: Clipboard, tile: "bg-sky-500 text-white", ring: "ring-sky-200", head: "bg-sky-50", dot: "bg-sky-100 text-sky-700", row: "bg-sky-50/60", eyebrow: "text-sky-700" },
  neutral: { icon: Info, tile: "bg-ink text-white", ring: "ring-line", head: "bg-white", dot: "bg-slate-100 text-slate-700", row: "bg-slate-50", eyebrow: "text-muted" },
};

export function VariantTile({ variant, size = "md" }: { variant: Variant; size?: "sm" | "md" }) {
  const s = variantStyles[variant];
  const Icon = s.icon;
  const dims = size === "sm" ? "h-7 w-7 rounded-lg text-[15px]" : "h-10 w-10 rounded-xl text-[20px]";
  return (
    <span className={`grid shrink-0 place-items-center ${dims} ${s.tile}`}>
      <Icon strokeWidth={2.6} />
    </span>
  );
}

export function NotProvided({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 bg-white px-2.5 py-1 text-[13px] font-medium text-slate-500 ${className}`}>
      <Help className="h-3.5 w-3.5" />
      {NOT_PROVIDED}
    </span>
  );
}

export function SampleTag({ tone = "default" }: { tone?: "default" | "light" }) {
  return (
    <span
      title={SAMPLE_LABEL}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
        tone === "light" ? "bg-white/15 text-white/90" : "bg-slate-100 text-slate-500"
      }`}
    >
      Sample plan
    </span>
  );
}

export function Section({ id, variant, eyebrow, title, count, children }: { id?: string; variant: Variant; eyebrow: string; title: ReactNode; count?: number | null; children: ReactNode }) {
  const s = variantStyles[variant];
  return (
    <section id={id} className={`overflow-hidden rounded-[28px] bg-white shadow-card ring-1 ${s.ring}`}>
      <div className={`flex items-center gap-3.5 px-5 py-4 ${s.head}`}>
        <VariantTile variant={variant} />
        <div className="min-w-0 flex-1">
          <p className={`text-[11px] font-bold uppercase tracking-[0.12em] ${s.eyebrow}`}>{eyebrow}</p>
          <h2 className="text-lg font-extrabold tracking-tight text-ink">{title}</h2>
        </div>
        {count != null && <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${s.dot}`}>{count}</span>}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

export function ItemList({ items, variant, compact = false }: { items: string[] | null; variant: Variant; compact?: boolean }) {
  if (!items || items.length === 0) return <NotProvided />;
  const s = variantStyles[variant];
  const Icon = s.icon;
  return (
    <ul className={compact ? "space-y-2" : "space-y-2.5"}>
      {items.map((item) => (
        <li key={item} className={`flex gap-3 ${compact ? "text-[13.5px]" : "text-[15px]"} leading-snug text-ink/85`}>
          <span className={`mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full text-[12px] ${s.dot}`}>
            <Icon strokeWidth={3} />
          </span>
          <span>
            <TextWithTerms text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function LimitList({ limits, compact = false }: { limits: BenefitLimit[] | null; compact?: boolean }) {
  if (!limits || limits.length === 0) return <NotProvided />;
  return (
    <dl className={compact ? "space-y-2" : "grid gap-2.5 sm:grid-cols-2"}>
      {limits.map((l) => (
        <div key={l.benefit} className={`rounded-2xl bg-amber-50/80 ring-1 ring-amber-100 ${compact ? "p-2.5" : "p-4"}`}>
          <dt className={`font-semibold text-amber-800 ${compact ? "text-[12px]" : "text-[13px]"}`}>
            <TextWithTerms text={l.benefit} />
          </dt>
          <dd className={`mt-1 font-bold leading-snug text-ink ${compact ? "text-[13.5px]" : "text-[16px]"}`}>{l.limit ?? <NotProvided />}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TextOrMissing({ value }: { value: string | null }) {
  return value ? <TextWithTerms text={value} /> : <NotProvided />;
}
