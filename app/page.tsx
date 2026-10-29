import Link from "next/link";
import { Faq } from "@/components/Faq";
import { ArrowRight, Check, Chat, Clipboard, Columns, Cross, Gauge, Grid, Lock, Shield, Sparkle, Users } from "@/components/Icons";
import { PlanCard } from "@/components/PlanCard";
import { SectionHead } from "@/components/SectionHead";
import { Term } from "@/components/Term";
import { glossary } from "@/lib/glossary";
import { audiences, headlineLimit, NOT_PROVIDED, products } from "@/lib/products";
import { faqs } from "@/lib/faq";

export default function HomePage() {
  const preview = products[0];
  const limit = headlineLimit(preview);

  return (
    <div className="space-y-20 md:space-y-28">
      {/* Hero */}
      <section className="relative -mx-4 overflow-hidden bg-brand-950 px-5 pb-10 pt-10 text-white sm:mx-0 sm:rounded-[36px] sm:px-10 md:px-14 md:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-lime/15 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
        </div>

        <div className="relative grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/85 ring-1 ring-white/15">
              <Sparkle className="h-3.5 w-3.5 text-lime" /> Free · No sign-up · Plain language
            </span>
            <h1 className="mt-5 text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-[54px] md:text-[60px]">
              Health cover you can <span className="text-lime">actually understand.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/75">
              See what each plan pays for, what it doesn&apos;t, and the limits, in everyday words. Compare two side by side,
              then get a checklist and the right number to call.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/plans" className="group flex items-center justify-center gap-2 rounded-2xl bg-lime px-6 py-4 text-[16px] font-extrabold text-ink transition hover:brightness-95">
                Browse plans <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
              </Link>
              <Link href="/compare" className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-6 py-4 text-[16px] font-bold ring-1 ring-white/20 transition hover:bg-white/15">
                <Columns className="h-5 w-5" /> Compare two plans
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <Stat value={products.length} label="plans explained" />
              <Stat value={glossary.length} label="words made simple" />
              <Stat value={0} label="forms to fill" />
            </dl>
          </div>

          {/* Preview built from a real record in products.json */}
          <div className="relative mx-auto w-full max-w-sm animate-rise [animation-delay:120ms]">
            <div aria-hidden className="absolute -inset-4 rotate-3 rounded-[36px] bg-white/5 ring-1 ring-white/10" />
            <div className="relative rounded-[30px] bg-white p-5 text-ink shadow-float">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">At a glance</p>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Sample</span>
              </div>
              <p className="mt-1 text-xl font-extrabold tracking-tight">{preview.name}</p>
              <div className="mt-4 space-y-2.5">
                <PreviewRow tone="emerald" icon={<Check strokeWidth={3} />} label="Covered" text={preview.coverage?.[1] ?? NOT_PROVIDED} />
                <PreviewRow tone="rose" icon={<Cross strokeWidth={3} />} label="Not covered" text={preview.exclusions?.[2] ?? NOT_PROVIDED} />
                <PreviewRow tone="amber" icon={<Gauge />} label="Limit" text={limit ? `${limit.benefit}: ${limit.limit ?? NOT_PROVIDED}` : NOT_PROVIDED} />
              </div>
              <Link href={`/plans/${preview.id}`} className="mt-4 flex items-center justify-center gap-1.5 rounded-2xl bg-ink py-3 text-sm font-bold text-white">
                See full plan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="-mt-10 grid gap-3 sm:grid-cols-3 md:-mt-16">
        <Trust icon={<Lock />} title="Nothing to sign up for" text="No account, no password, no health questions. Ever." />
        <Trust icon={<Shield />} title="Honest about gaps" text="If an insurer hasn't told us something, we say so. We never guess." />
        <Trust icon={<Chat />} title="Straight to a real person" text="Every plan ends with the agent's phone, WhatsApp or website." />
      </section>

      {/* How it works */}
      <section>
        <SectionHead eyebrow="How it works" title="From confused to covered in three steps" />
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: <Grid />, title: "Browse plans", text: "Each plan shows what's covered, what's not, and the most it will pay, colour-coded so you can't mix them up." },
            { icon: <Columns />, title: "Compare two", text: "Put any two plans side by side. Same questions, same order, easy to spot the difference." },
            { icon: <Clipboard />, title: "Get ready to enrol", text: "Follow a checklist of documents and steps, then call or WhatsApp the insurer directly." },
          ].map((s, i) => (
            <li key={s.title} className="relative rounded-[28px] bg-white p-6 shadow-card ring-1 ring-line/70">
              <span className="absolute right-6 top-5 text-5xl font-extrabold tracking-tighter text-line">0{i + 1}</span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-[22px] text-brand-700">{s.icon}</span>
              <h3 className="mt-5 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Featured plans */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <SectionHead eyebrow="Plans" title="Popular plans right now" />
          <Link href="/plans" className="hidden shrink-0 items-center gap-1.5 font-bold text-brand-700 sm:flex">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 3).map((p) => (
            <PlanCard key={p.id} p={p} />
          ))}
        </div>
        <Link href="/plans" className="mt-5 flex items-center justify-center gap-1.5 rounded-2xl bg-white py-4 font-bold text-ink ring-1 ring-line sm:hidden">
          See all {products.length} plans <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Who it's for */}
      <section>
        <SectionHead eyebrow="Find your fit" title="Plans for the way you work" />
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {audiences.map((a, i) => (
            <Link
              key={a.id}
              href={`/plans?for=${a.id}`}
              className="group relative overflow-hidden rounded-[24px] p-5 text-white transition hover:-translate-y-0.5"
              style={{ background: ["#0f5c4a", "#c2410c", "#6d28d9", "#0369a1"][i] }}
            >
              <div aria-hidden className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 transition group-hover:scale-125" />
              <Users className="relative h-6 w-6 text-white/80" />
              <p className="relative mt-8 text-[17px] font-extrabold leading-tight">{a.label}</p>
              <p className="relative mt-1 text-[13px] leading-snug text-white/75">{a.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Glossary teaser */}
      <section className="rounded-[36px] bg-white p-6 shadow-card ring-1 ring-line/70 sm:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div>
            <SectionHead eyebrow="Insurance words" title="Never get lost in the jargon" />
            <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
              Tap any word with a dotted underline anywhere on CoverGuide to see what it means, with a real example. Try one:
            </p>
            <Link href="/glossary" className="mt-5 inline-flex items-center gap-1.5 font-bold text-brand-700">
              See all words <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {glossary.slice(0, 8).map((t) => (
              <Term key={t.id} id={t.id} tone="chip">
                {t.term}
              </Term>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
        <div>
          <SectionHead eyebrow="Questions" title="Things people often ask" />
          <Link href="/help#faq" className="mt-5 inline-flex items-center gap-1.5 font-bold text-brand-700">
            All questions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Faq items={faqs.slice(0, 4)} />
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-[36px] bg-lime p-8 sm:p-12">
        <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/30" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Ready to find your plan?</h2>
            <p className="mt-2 max-w-md text-[16px] text-ink/70">It takes a few minutes, and you never have to share anything about your health.</p>
          </div>
          <Link href="/plans" className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-ink px-7 py-4 text-[16px] font-extrabold text-white">
            Browse plans <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="text-3xl font-extrabold tracking-tight text-white">{value}</dd>
      <dd className="text-[12px] leading-tight text-white/55">{label}</dd>
    </div>
  );
}

function PreviewRow({ tone, icon, label, text }: { tone: "emerald" | "rose" | "amber"; icon: React.ReactNode; label: string; text: string }) {
  const t = {
    emerald: "bg-emerald-50 ring-emerald-100 [&_.i]:bg-emerald-500 [&_.l]:text-emerald-700",
    rose: "bg-rose-50 ring-rose-100 [&_.i]:bg-rose-500 [&_.l]:text-rose-700",
    amber: "bg-amber-50 ring-amber-100 [&_.i]:bg-amber-400 [&_.l]:text-amber-800",
  }[tone];
  return (
    <div className={`flex gap-3 rounded-2xl p-3 ring-1 ${t}`}>
      <span className="i grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[14px] text-white">{icon}</span>
      <div className="min-w-0">
        <p className="l text-[11px] font-bold uppercase tracking-wider">{label}</p>
        <p className="text-[13.5px] font-semibold leading-snug">{text}</p>
      </div>
    </div>
  );
}

function Trust({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="relative flex gap-4 rounded-[24px] bg-white p-5 shadow-card ring-1 ring-line/70">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-[20px] text-brand-700">{icon}</span>
      <div>
        <p className="font-extrabold">{title}</p>
        <p className="mt-0.5 text-[14px] leading-snug text-ink/65">{text}</p>
      </div>
    </div>
  );
}
