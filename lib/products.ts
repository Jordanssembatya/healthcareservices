import data from "@/data/products.json";

export type Premium = {
  amount: number;
  currency: string;
  period: string;
  note: string | null;
};

export type BenefitLimit = {
  benefit: string;
  limit: string | null;
};

export type Contact = {
  agentName: string | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  officeAddress: string | null;
  hours: string | null;
};

export type Audience = "vendors" | "riders" | "families" | "individuals";

// Any field may be null. null means "not supplied" and must never be filled in by the UI.
export type Product = {
  id: string;
  isSample: boolean;
  name: string;
  insurer: string | null;
  type: string | null;
  audience: Audience[];
  targetGroup: string | null;
  summary: string | null;
  premium: Premium | null;
  coverage: string[] | null;
  exclusions: string[] | null;
  benefitLimits: BenefitLimit[] | null;
  waitingPeriod: string | null;
  coPay: string | null;
  enrolment: {
    requirements: string[] | null;
    documents: string[] | null;
    steps: string[] | null;
  };
  contact: Contact;
};

export const products: Product[] = data.products as Product[];

export const audiences: { id: Audience; label: string; blurb: string }[] = [
  { id: "vendors", label: "Market vendors", blurb: "Cover that fits a trader's budget" },
  { id: "riders", label: "Boda riders", blurb: "Accident-first protection on the road" },
  { id: "families", label: "Families", blurb: "One plan for the whole household" },
  { id: "individuals", label: "Individuals", blurb: "Simple cover just for you" },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatAmount(p: Premium): string {
  return `${p.currency} ${p.amount.toLocaleString("en-US")}`;
}

export function formatPremium(p: Premium | null): string | null {
  if (!p) return null;
  const base = `${formatAmount(p)} per ${p.period}`;
  return p.note ? `${base} (${p.note})` : base;
}

export function headlineLimit(p: Product): BenefitLimit | undefined {
  return p.benefitLimits?.find((l) => /inpatient/i.test(l.benefit)) ?? p.benefitLimits?.[0];
}

export function whatsappLink(number: string): string {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}

export function telLink(number: string): string {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}

export const SAMPLE_LABEL = "Sample plan for illustration, not a real product";
export const NOT_PROVIDED = "Not provided. Ask the insurer.";
