import Link from "next/link";
import { headlineLimit, type Product } from "@/lib/products";
import { accentFor, initials } from "@/lib/theme";
import { NotProvided, SampleTag } from "./Fields";
import { ArrowRight, Check, Clock, Cross, Gauge, Users } from "./Icons";
import { Term } from "./Term";

export function PlanCard({ p, selected, onToggle }: { p: Product; selected?: boolean; onToggle?: () => void }) {
  const a = accentFor(p.id);
  const limit = headlineLimit(p);

  return (
    <article className={`flex flex-col overflow-hidden rounded-[28px] bg-white shadow-card ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-float ${selected ? "ring-2 ring-brand-500" : "ring-line/70"}`}>
      <div className="relative overflow-hidden p-5 text-white" style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}>
        <div aria-hidden className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10" />
        <div aria-hidden className="absolute -bottom-16 right-16 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[13px] font-extrabold" style={{ color: a.text }}>
              {initials(p.insurer)}
            </span>
            <span className="truncate text-[13px] font-semibold text-white/85">{p.insurer ?? "Insurer not provided"}</span>
          </div>
          {p.isSample && <SampleTag tone="light" />}
        </div>
        <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">{p.type}</p>
        <h3 className="relative text-[26px] font-extrabold leading-tight tracking-tight">{p.name}</h3>
        <div className="relative mt-4">
          <p className="text-[12px] font-medium text-white/70">
            <Term id="premium" tone="light">Premium</Term>
          </p>
          {p.premium ? (
            <p className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-[13px] font-bold text-white/80">{p.premium.currency}</span>
              <span className="text-3xl font-extrabold tracking-tight">{p.premium.amount.toLocaleString("en-US")}</span>
              <span className="text-sm font-medium text-white/75">/ {p.premium.period}</span>
            </p>
          ) : (
            <p className="mt-1 text-sm font-semibold">Not provided. Ask the insurer.</p>
          )}
          {p.premium?.note && <p className="text-[12px] text-white/65">{p.premium.note}</p>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {p.summary && <p className="text-[15px] leading-relaxed text-ink/75">{p.summary}</p>}
        <ul className="mt-4 space-y-2.5 text-[14px]">
          <Fact icon={<Users />} tint="bg-slate-100 text-slate-600">
            {p.targetGroup ?? <NotProvided />}
          </Fact>
          <Fact icon={<Check strokeWidth={3} />} tint="bg-emerald-100 text-emerald-700">
            {p.coverage?.length ? `${p.coverage.length} things covered` : <NotProvided />}
          </Fact>
          <Fact icon={<Cross strokeWidth={3} />} tint="bg-rose-100 text-rose-700">
            {p.exclusions?.length ? `${p.exclusions.length} exclusions listed` : <span className="flex flex-wrap items-center gap-1.5">Exclusions <NotProvided /></span>}
          </Fact>
          <Fact icon={<Gauge />} tint="bg-amber-100 text-amber-800">
            {limit ? (
              <span>
                <span className="font-semibold">{limit.benefit}:</span> {limit.limit ?? <NotProvided />}
              </span>
            ) : (
              <NotProvided />
            )}
          </Fact>
          <Fact icon={<Clock />} tint="bg-sky-100 text-sky-700">
            {p.waitingPeriod ? <span><Term id="waiting-period">Waiting period</Term>: {p.waitingPeriod}</span> : <span className="flex flex-wrap items-center gap-1.5">Waiting period <NotProvided /></span>}
          </Fact>
        </ul>

        <div className="mt-auto flex gap-2 pt-5">
          <Link href={`/plans/${p.id}`} className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 text-[15px] font-bold text-white transition hover:bg-brand-900">
            View plan <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          {onToggle && (
            <button
              type="button"
              onClick={onToggle}
              aria-pressed={selected}
              className={`flex items-center gap-2 rounded-2xl px-4 py-3.5 text-[14px] font-bold ring-1 transition ${selected ? "bg-brand-50 text-brand-800 ring-brand-400" : "bg-white text-ink ring-line hover:ring-ink/30"}`}
            >
              <span className={`grid h-5 w-5 place-items-center rounded-md text-[12px] ring-1 ${selected ? "bg-brand-600 text-white ring-brand-600" : "ring-slate-300"}`}>
                {selected && <Check strokeWidth={3.5} />}
              </span>
              Compare
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function Fact({ icon, tint, children }: { icon: React.ReactNode; tint: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-ink/80">
      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[13px] ${tint}`}>{icon}</span>
      <span className="min-w-0 pt-0.5 leading-snug">{children}</span>
    </li>
  );
}
