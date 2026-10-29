import type { FaqItem } from "@/lib/faq";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[28px] bg-white shadow-card ring-1 ring-line/70">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[16px] font-bold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-canvas text-lg transition group-open:rotate-45 group-open:bg-ink group-open:text-white">+</span>
          </summary>
          <p className="-mt-1 px-6 pb-5 text-[15px] leading-relaxed text-ink/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
