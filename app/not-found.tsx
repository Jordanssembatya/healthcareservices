import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <p className="text-7xl font-extrabold tracking-tighter text-line">404</p>
      <h1 className="mt-4 text-2xl font-extrabold">We couldn&apos;t find that page</h1>
      <p className="mt-2 text-ink/70">The plan may have moved or the link may be wrong.</p>
      <Link href="/plans" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-3.5 font-bold text-white">
        Browse all plans <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
