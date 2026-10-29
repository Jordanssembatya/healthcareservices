"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Columns, Grid, Help } from "./Icons";

const links = [
  { href: "/plans", label: "Plans", icon: Grid },
  { href: "/compare", label: "Compare", icon: Columns },
  { href: "/glossary", label: "Words", icon: Book },
  { href: "/help", label: "Help", icon: Help },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-800 text-lime shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
      <span className="text-[18px] font-extrabold tracking-tight text-ink">CoverGuide</span>
    </Link>
  );
}

export function TopNav() {
  const pathname = usePathname();
  return (
    <div className="hidden items-center gap-3 md:flex">
      <nav className="flex items-center gap-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive(pathname, l.href) ? "bg-white text-ink shadow-card ring-1 ring-line" : "text-muted hover:text-ink"}`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <Link href="/compare" className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-900">
        Compare plans
      </Link>
    </div>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {links.map((l) => {
          const active = isActive(pathname, l.href);
          const Icon = l.icon;
          return (
            <Link key={l.href} href={l.href} className="flex flex-col items-center gap-0.5 pb-2 pt-2 text-[11px] font-semibold">
              <span className={`grid h-8 w-14 place-items-center rounded-full transition ${active ? "bg-brand-100 text-brand-800" : "text-muted"}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className={active ? "text-brand-800" : "text-muted"}>{l.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
