import Link from "next/link";
import { notFound } from "next/navigation";
import { ItemList, LimitList, NotProvided, SampleTag, Section, TextOrMissing } from "@/components/Fields";
import { ArrowLeft, ArrowRight, Clipboard, Clock, Coins, Columns, Users } from "@/components/Icons";
import { Term } from "@/components/Term";
import { getProduct, products } from "@/lib/products";
import { accentFor, initials } from "@/lib/theme";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `${getProduct(id)?.name ?? "Plan"} · CoverGuide` };
}

const anchors = [
  ["covered", "Covered"],
  ["not-covered", "Not covered"],
  ["limits", "Limits"],
  ["terms", "Key terms"],
  ["enrol", "Enrolment"],
] as const;

export default async function PlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) notFound();

  const a = accentFor(p.id);
  const other = products.find((x) => x.id !== p.id);

  return (
    <article>
      <Link href="/plans" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> All plans
      </Link>

      {/* Hero */}
      <header className="relative mt-4 overflow-hidden rounded-[32px] p-6 text-white sm:p-10" style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}>
        <div aria-hidden className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/10" />
        <div aria-hidden className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-white/5" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-extrabold" style={{ color: a.text }}>
              {initials(p.insurer)}
            </span>
            <span className="text-[14px] font-semibold text-white/85">{p.insurer ?? "Insurer not provided"}</span>
            {p.isSample && <SampleTag tone="light" />}
          </div>
          <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.16em] text-white/60">{p.type}</p>
          <h1 className="mt-1 text-[38px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[52px]">{p.name}</h1>
          {p.summary && <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-white/80">{p.summary}</p>}

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            <HeroFact icon={<Coins />} label={<Term id="premium" tone="light">Premium</Term>}>
              {p.premium ? (
                <>
                  <span className="text-2xl font-extrabold tracking-tight">
                    {p.premium.currency} {p.premium.amount.toLocaleString("en-US")}
                  </span>
                  <span className="text-white/75"> / {p.premium.period}</span>
                  {p.premium.note && <span className="block text-[12px] text-white/60">{p.premium.note}</span>}
                </>
              ) : (
                "Not provided. Ask the insurer."
              )}
            </HeroFact>
            <HeroFact icon={<Users />} label="Who it's for">
              {p.targetGroup ?? "Not provided. Ask the insurer."}
            </HeroFact>
            <HeroFact icon={<Clock />} label={<Term id="waiting-period" tone="light">Waiting period</Term>}>
              {p.waitingPeriod ?? "Not provided. Ask the insurer."}
            </HeroFact>
          </dl>
        </div>
      </header>

      {/* Section nav */}
      <nav className="no-scrollbar sticky top-16 z-30 -mx-4 mt-4 flex gap-2 overflow-x-auto bg-canvas/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        {anchors.map(([href, label]) => (
          <a key={href} href={`#${href}`} className="shrink-0 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-ink/80 ring-1 ring-line hover:text-ink">
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <div className="space-y-5">
          <Section id="covered" variant="coverage" eyebrow="What the plan pays for" title="What's covered" count={p.coverage?.length}>
            <ItemList items={p.coverage} variant="coverage" />
          </Section>

          <Section
            id="not-covered"
            variant="exclusions"
            eyebrow="What you pay for yourself"
            title={<>Not covered (<Term id="exclusion">exclusions</Term>)</>}
            count={p.exclusions?.length}
          >
            <ItemList items={p.exclusions} variant="exclusions" />
          </Section>

          <Section id="limits" variant="limits" eyebrow="The most the plan pays" title={<Term id="benefit-limit">Benefit limits</Term>} count={p.benefitLimits?.length}>
            <LimitList limits={p.benefitLimits} />
          </Section>

          <Section id="terms" variant="neutral" eyebrow="Before you pay" title="Other key terms">
            <dl className="grid gap-3 sm:grid-cols-2">
              <TermBox label={<Term id="waiting-period" />}>
                <TextOrMissing value={p.waitingPeriod} />
              </TermBox>
              <TermBox label={<Term id="co-pay" />}>
                <TextOrMissing value={p.coPay} />
              </TermBox>
            </dl>
          </Section>

          <Section id="enrol" variant="enrol" eyebrow="Who can join" title="Enrolment requirements" count={p.enrolment.requirements?.length}>
            <ItemList items={p.enrolment.requirements} variant="enrol" />
            <Link href={`/plans/${p.id}/enrol`} className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-sky-600 py-3.5 font-bold text-white hover:bg-sky-700">
              <Clipboard className="h-5 w-5" /> Open the enrolment checklist
            </Link>
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-36">
          <div className="rounded-[28px] bg-ink p-6 text-white shadow-float">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/50">Next step</p>
            <p className="mt-2 text-xl font-extrabold leading-tight">Ready to join {p.name}?</p>
            <p className="mt-2 text-[14px] leading-relaxed text-white/65">Get the full list of documents and steps, then contact the insurer directly.</p>
            <Link href={`/plans/${p.id}/enrol`} className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-lime py-3.5 font-extrabold text-ink">
              How to enrol <ArrowRight className="h-4 w-4" />
            </Link>
            {other && (
              <Link href={`/compare?a=${p.id}&b=${other.id}`} className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-white/10 py-3.5 font-bold ring-1 ring-white/15">
                <Columns className="h-4 w-4" /> Compare with another plan
              </Link>
            )}
          </div>
          <div className="rounded-[24px] bg-white p-5 text-[14px] leading-relaxed text-ink/70 shadow-card ring-1 ring-line/70">
            <p className="font-bold text-ink">Seeing “Not provided”?</p>
            <p className="mt-1">
              That means the insurer hasn&apos;t shared it with us. Ask them before you pay. <NotProvided className="mt-2" />
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}

function HeroFact({ icon, label, children }: { icon: React.ReactNode; label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
      <dt className="flex items-center gap-2 text-[12px] font-semibold text-white/70">
        <span className="text-[15px]">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1.5 text-[15px] font-semibold leading-snug">{children}</dd>
    </div>
  );
}

function TermBox({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-line/70">
      <dt className="text-[13px] font-bold text-muted">{label}</dt>
      <dd className="mt-1 text-[15px] font-semibold text-ink">{children}</dd>
    </div>
  );
}
