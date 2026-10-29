export function SectionHead({ eyebrow, title, as: H = "h2" }: { eyebrow: string; title: string; as?: "h1" | "h2" }) {
  return (
    <div>
      <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">{eyebrow}</p>
      <H className="mt-2 text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[38px]">{title}</H>
    </div>
  );
}
