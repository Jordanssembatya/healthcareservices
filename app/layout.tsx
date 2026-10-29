import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { BottomNav, Logo, TopNav } from "@/components/Nav";
import { Lock } from "@/components/Icons";

export const metadata: Metadata = {
  title: "CoverGuide · Health insurance, simply",
  description: "Understand health insurance plans in plain language, compare them side by side and find out how to enrol.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f2ec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/85 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Logo />
            <TopNav />
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-16 pt-5 sm:px-6 md:pt-8">{children}</main>

        <footer className="bg-ink text-white/70">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-32 pt-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] md:pb-12">
            <div>
              <p className="text-lg font-extrabold text-white">CoverGuide</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed">
                Health insurance explained in plain language, so you can choose with confidence and know exactly who to call.
              </p>
              <p className="mt-5 flex max-w-sm gap-2.5 rounded-2xl bg-white/5 p-3.5 text-[13px] leading-relaxed ring-1 ring-white/10">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                No accounts and no health questions. We take no payments and do not enrol you. Plans shown are samples for
                illustration.
              </p>
            </div>
            <FooterCol title="Explore" links={[["/plans", "All plans"], ["/compare", "Compare plans"], ["/glossary", "Insurance words"]]} />
            <FooterCol title="Help" links={[["/help", "How it works"], ["/help#faq", "Questions & answers"], ["/help#privacy", "Your privacy"]]} />
          </div>
        </footer>

        <BottomNav />
      </body>
    </html>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
