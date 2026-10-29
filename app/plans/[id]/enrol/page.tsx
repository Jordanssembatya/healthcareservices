import Link from "next/link";
import { notFound } from "next/navigation";
import { Checklist } from "@/components/Checklist";
import { ContactCard } from "@/components/ContactCard";
import { SampleTag } from "@/components/Fields";
import { ArrowLeft, Lock } from "@/components/Icons";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `How to enrol: ${getProduct(id)?.name ?? "Plan"} · CoverGuide` };
}

export default async function EnrolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href={`/plans/${p.id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to {p.name}
      </Link>

      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">Enrolment checklist</p>
          {p.isSample && <SampleTag />}
        </div>
        <h1 className="mt-2 text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[42px]">How to join {p.name}</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink/70">
          Work through the list, get your documents ready, then contact {p.insurer ?? "the insurer"}. You enrol and pay with them
          directly, not on CoverGuide.
        </p>
      </header>

      <div className="mt-6">
        <Checklist
          groups={[
            { key: "req", title: "Check you qualify", subtitle: "Make sure these apply to you", items: p.enrolment.requirements },
            { key: "docs", title: "Get your documents ready", subtitle: "Bring originals, plus copies if you can", items: p.enrolment.documents },
            { key: "steps", title: "Follow the steps", subtitle: "What happens when you sign up", items: p.enrolment.steps, numbered: true },
          ]}
        />
      </div>

      <div className="relative mt-6 pl-14">
        <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-lime text-[15px] font-extrabold text-ink ring-4 ring-canvas">4</span>
        <h2 className="pt-1.5 text-lg font-extrabold tracking-tight">Contact the insurer</h2>
        <p className="text-[14px] text-muted">Confirm the price, cover and documents before you pay anything.</p>
      </div>
      <div className="mt-4">
        <ContactCard product={p} />
      </div>

      <p className="mt-6 flex gap-2.5 text-[13px] leading-relaxed text-muted">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
        CoverGuide never asks for your health information or payment. If anyone asks you to pay through this website, it isn&apos;t us.
      </p>
    </div>
  );
}
