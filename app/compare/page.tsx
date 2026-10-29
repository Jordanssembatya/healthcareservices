import Link from "next/link";
import type { ReactNode } from "react";
import { CompareSelect } from "@/components/CompareSelect";
import { ItemList, LimitList, NotProvided, TextOrMissing, VariantTile, variantStyles, type Variant } from "@/components/Fields";
import { ArrowRight } from "@/components/Icons";
import { Term } from "@/components/Term";
import { getProduct, products, type Product } from "@/lib/products";
import { accentFor } from "@/lib/theme";

export const metadata = { title: "Compare plans · CoverGuide" };

type Row = { label: ReactNode; variant: Variant; render: (p: Product) => ReactNode };

const rows: Row[] = [
  { label: "Insurer", variant: "neutral", render: (p) => p.insurer ?? <NotProvided /> },
  {
    label: <Term id="premium" />,
    variant: "neutral",
    render: (p) =>
      p.premium ? (
        <span>
          <span className="block text-[17px] font-extrabold">
            {p.premium.currency} {p.premium.amount.toLocaleString("en-US")}
          </span>
          <span className="text-muted">per {p.premium.period}{p.premium.note && ` · ${p.premium.note}`}</span>
        </span>
      ) : (
        <NotProvided />
      ),
  },
  { label: "Who it's for", variant: "neutral", render: (p) => p.targetGroup ?? <NotProvided /> },
  { label: "What's covered", variant: "coverage", render: (p) => <ItemList items={p.coverage} variant="coverage" compact /> },
  { label: <>Not covered (<Term id="exclusion">exclusions</Term>)</>, variant: "exclusions", render: (p) => <ItemList items={p.exclusions} variant="exclusions" compact /> },
  { label: <Term id="benefit-limit">Benefit limits</Term>, variant: "limits", render: (p) => <LimitList limits={p.benefitLimits} compact /> },
  { label: <Term id="waiting-period" />, variant: "neutral", render: (p) => <TextOrMissing value={p.waitingPeriod} /> },
  { label: <Term id="co-pay" />, variant: "neutral", render: (p) => <TextOrMissing value={p.coPay} /> },
  { label: "Enrolment requirements", variant: "enrol", render: (p) => <ItemList items={p.enrolment.requirements} variant="enrol" compact /> },
];

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ a?: string; b?: string }> }) {
  const { a, b } = await searchParams;
  const left = (a && getProduct(a)) || products[0];
  const right = (b && getProduct(b)) || products.find((p) => p.id !== left.id) || products[1];
  const pair = [left, right];

  return (
    <>
      <header className="max-w-2xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">Compare</p>
        <h1 className="mt-2 text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[44px]">Side by side</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink/70">Same questions, same order. Colours match the plan pages, so green is always covered, red is never covered and amber shows the limits.</p>
      </header>

      <div className="sticky top-16 z-30 -mx-4 mt-6 bg-canvas/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <CompareSelect products={products.map((p) => ({ id: p.id, name: p.name, insurer: p.insurer, accent: accentFor(p.id).from, isSample: p.isSample }))} a={left.id} b={right.id} />
      </div>

      <div className="mt-3 space-y-3">
        {rows.map((row, i) => {
          const s = variantStyles[row.variant];
          return (
            <section key={i} className={`overflow-hidden rounded-[24px] bg-white shadow-card ring-1 ${s.ring}`}>
              <h2 className={`flex items-center gap-2.5 px-4 py-3 text-[14px] font-extrabold sm:px-5 ${s.head}`}>
                <VariantTile variant={row.variant} size="sm" />
                <span>{row.label}</span>
              </h2>
              <div className="grid grid-cols-2 divide-x divide-line/70">
                {pair.map((p) => (
                  <div key={p.id} className="min-w-0 break-words p-4 text-[14px] leading-snug text-ink/85 sm:p-5">
                    {row.render(p)}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {pair.map((p) => (
          <div key={p.id} className="grid gap-2">
            <Link href={`/plans/${p.id}/enrol`} className="flex items-center justify-center gap-1.5 rounded-2xl bg-ink px-2 py-3.5 text-center text-[14px] font-bold text-white">
              Enrol <span className="hidden sm:inline">in {p.name}</span> <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/plans/${p.id}`} className="rounded-2xl bg-white px-2 py-3 text-center text-[14px] font-bold text-ink ring-1 ring-line">
              Full details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
