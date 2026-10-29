import { telLink, whatsappLink, type Product } from "@/lib/products";
import { initials } from "@/lib/theme";
import { NotProvided } from "./Fields";
import { Chat, Clock, Globe, MapPin, Phone } from "./Icons";

export function ContactCard({ product }: { product: Product }) {
  const c = product.contact;

  return (
    <section id="contact" className="overflow-hidden rounded-[32px] bg-ink text-white shadow-float">
      <div className="relative p-6 sm:p-8">
        <div aria-hidden className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-500/25 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime text-base font-extrabold text-ink">{initials(product.insurer)}</span>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/50">Contact the insurer</p>
            <p className="text-lg font-extrabold leading-tight">{product.insurer ?? "Insurer not provided"}</p>
            {c.agentName && <p className="text-[13px] text-white/60">{c.agentName}</p>}
          </div>
        </div>

        <div className="relative mt-6 grid gap-2.5 sm:grid-cols-3">
          {c.phone ? (
            <a href={telLink(c.phone)} className="flex items-center gap-3 rounded-2xl bg-lime p-4 text-ink transition hover:brightness-95">
              <Phone className="h-5 w-5" />
              <span>
                <span className="block text-[15px] font-extrabold">Call</span>
                <span className="block text-[12px] font-semibold opacity-70">{c.phone}</span>
              </span>
            </a>
          ) : (
            <Missing icon={<Phone className="h-5 w-5" />} label="Phone" />
          )}
          {c.whatsapp ? (
            <a href={whatsappLink(c.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#25d366] p-4 text-ink transition hover:brightness-95">
              <Chat className="h-5 w-5" />
              <span>
                <span className="block text-[15px] font-extrabold">WhatsApp</span>
                <span className="block text-[12px] font-semibold opacity-70">Send a message</span>
              </span>
            </a>
          ) : (
            <Missing icon={<Chat className="h-5 w-5" />} label="WhatsApp" />
          )}
          {c.website ? (
            <a href={c.website} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:bg-white/15">
              <Globe className="h-5 w-5 shrink-0" />
              <span className="min-w-0">
                <span className="block text-[15px] font-extrabold">Website</span>
                <span className="block truncate text-[12px] font-semibold text-white/60">{c.website.replace(/^https?:\/\//, "")}</span>
              </span>
            </a>
          ) : (
            <Missing icon={<Globe className="h-5 w-5" />} label="Website" />
          )}
        </div>
      </div>

      <dl className="grid gap-px bg-white/10 sm:grid-cols-2">
        <Detail icon={<MapPin className="h-4 w-4" />} label="Office" value={c.officeAddress} />
        <Detail icon={<Clock className="h-4 w-4" />} label="Opening hours" value={c.hours} />
      </dl>
      {product.isSample && <p className="bg-white/5 px-6 py-3 text-[12px] text-white/45 sm:px-8">Sample contact details for illustration.</p>}
    </section>
  );
}

function Missing({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/20 p-4 text-white/55">
      {icon}
      <span>
        <span className="block text-[15px] font-bold">{label}</span>
        <span className="block text-[12px]">Not provided. Ask the insurer.</span>
      </span>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null }) {
  return (
    <div className="flex gap-3 bg-ink px-6 py-4 sm:px-8">
      <span className="mt-0.5 text-white/50">{icon}</span>
      <div>
        <dt className="text-[12px] font-bold uppercase tracking-wider text-white/45">{label}</dt>
        <dd className="mt-0.5 text-[14px] font-semibold">{value ?? <NotProvided className="mt-1 border-white/20 bg-white/5 text-white/60" />}</dd>
      </div>
    </div>
  );
}
