import { Catalogue } from "@/components/Catalogue";
import { Term } from "@/components/Term";
import { audiences, products, type Audience } from "@/lib/products";

export const metadata = { title: "All plans · CoverGuide" };

export default async function PlansPage({ searchParams }: { searchParams: Promise<{ for?: string }> }) {
  const { for: f } = await searchParams;
  const initial = audiences.find((a) => a.id === f)?.id as Audience | undefined;

  return (
    <>
      <header className="max-w-2xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">All plans</p>
        <h1 className="mt-2 text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[44px]">Find a plan that fits</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink/70">
          Every plan shows its <Term id="premium">premium</Term>, what&apos;s covered, the <Term id="exclusion">exclusions</Term> and the{" "}
          <Term id="benefit-limit">benefit limits</Term>. Tap any underlined word to see what it means.
        </p>
      </header>
      <div className="mt-4">
        <Catalogue key={initial ?? "all"} products={products} initialAudience={initial} />
      </div>
    </>
  );
}
