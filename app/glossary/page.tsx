import { GlossaryList } from "@/components/GlossaryList";
import { glossary } from "@/lib/glossary";

export const metadata = { title: "Insurance words explained · CoverGuide" };

export default function GlossaryPage() {
  return (
    <>
      <header className="max-w-2xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">Insurance words</p>
        <h1 className="mt-2 text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[44px]">Jargon, made simple</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink/70">
          {glossary.length} words you&apos;ll see on insurance plans, explained in everyday language. You can also tap any dotted-underlined word anywhere on the site.
        </p>
      </header>
      <div className="mt-4">
        <GlossaryList terms={glossary} />
      </div>
    </>
  );
}
