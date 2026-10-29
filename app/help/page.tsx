import Link from "next/link";
import { Faq } from "@/components/Faq";
import { ArrowRight, Chat, Check, Clipboard, Columns, Cross, Gauge, Grid, Help, Lock } from "@/components/Icons";
import { SectionHead } from "@/components/SectionHead";
import { faqs } from "@/lib/faq";

export const metadata = { title: "Help & how it works · CoverGuide" };

export default function HelpPage() {
  return (
    <div className="space-y-16">
      <header className="max-w-2xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">Help</p>
        <h1 className="mt-2 text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[44px]">How CoverGuide works</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink/70">
          CoverGuide helps you understand health insurance before you spend money on it. Here&apos;s how to get the most out of it.
        </p>
      </header>

      <section>
        <SectionHead eyebrow="Reading a plan" title="Four colours, always the same meaning" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Legend tone="bg-emerald-500 text-white" icon={<Check strokeWidth={3} />} title="Green: covered" text="Things the plan pays for." />
          <Legend tone="bg-rose-500 text-white" icon={<Cross strokeWidth={3} />} title="Red: not covered" text="Exclusions. You pay these yourself." />
          <Legend tone="bg-amber-400 text-amber-950" icon={<Gauge />} title="Amber: limits" text="The most the plan will pay." />
          <Legend tone="bg-sky-500 text-white" icon={<Clipboard />} title="Blue: enrolment" text="Who can join and what to bring." />
        </div>
      </section>

      <section>
        <SectionHead eyebrow="Step by step" title="Your path to cover" />
        <ol className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            { icon: <Grid />, t: "Browse", d: "Filter plans by who they're for, or search for what you need." },
            { icon: <Columns />, t: "Compare", d: "Tick two plans and see them side by side, field by field." },
            { icon: <Clipboard />, t: "Prepare", d: "Use the checklist to get your documents ready." },
            { icon: <Chat />, t: "Contact", d: "Call or WhatsApp the insurer to enrol and pay with them." },
          ].map((s, i) => (
            <li key={s.t} className="rounded-[24px] bg-white p-5 shadow-card ring-1 ring-line/70">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-[20px] text-brand-700">{s.icon}</span>
                <span className="text-sm font-extrabold text-line">STEP {i + 1}</span>
              </div>
              <p className="mt-4 text-lg font-extrabold">{s.t}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-ink/70">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="scroll-mt-24">
        <SectionHead eyebrow="Questions & answers" title="Frequently asked" />
        <div className="mt-6">
          <Faq items={faqs} />
        </div>
      </section>

      <section id="privacy" className="scroll-mt-24 grid gap-6 rounded-[32px] bg-ink p-6 text-white sm:p-10 md:grid-cols-[auto_1fr]">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lime text-[26px] text-ink">
          <Lock />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Your privacy</h2>
          <ul className="mt-4 grid gap-3 text-[15px] text-white/75 sm:grid-cols-2">
            {[
              "No accounts or passwords",
              "No health questions, ever",
              "No payments on this website",
              "Checklist ticks stay on your screen and are never sent",
            ].map((x) => (
              <li key={x} className="flex gap-2.5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-lime" strokeWidth={3} />
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] leading-relaxed text-white/55">
            The plans currently listed are samples for illustration. Always confirm prices, cover and documents with the insurer before you pay.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 rounded-[28px] bg-white p-6 shadow-card ring-1 ring-line/70 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-[22px] text-brand-700">
            <Help />
          </span>
          <div>
            <p className="text-lg font-extrabold">Stuck on a word?</p>
            <p className="text-[14px] text-ink/70">Look it up in our plain-language glossary.</p>
          </div>
        </div>
        <Link href="/glossary" className="flex items-center gap-1.5 rounded-2xl bg-ink px-5 py-3.5 font-bold text-white">
          Open glossary <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}

function Legend({ tone, icon, title, text }: { tone: string; icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3.5 rounded-[24px] bg-white p-5 shadow-card ring-1 ring-line/70">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[19px] ${tone}`}>{icon}</span>
      <div>
        <p className="font-extrabold">{title}</p>
        <p className="text-[14px] text-ink/65">{text}</p>
      </div>
    </div>
  );
}
