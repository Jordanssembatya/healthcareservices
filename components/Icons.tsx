import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden width="1em" height="1em" {...props}>
      {children}
    </svg>
  );
}

export const Check = (p: P) => <Base {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Base>;
export const Cross = (p: P) => <Base {...p}><path d="M7 7l10 10M17 7L7 17" /></Base>;
export const Gauge = (p: P) => (
  <Base {...p}>
    <path d="M4 19a8 8 0 1 1 16 0" />
    <path d="M12 19l4-6" />
  </Base>
);
export const Clipboard = (p: P) => (
  <Base {...p}>
    <rect x="5" y="4" width="14" height="17" rx="2.5" />
    <path d="M9 4h6v3H9zM9 12h6M9 16h4" />
  </Base>
);
export const Clock = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);
export const Coins = (p: P) => (
  <Base {...p}>
    <ellipse cx="12" cy="7" rx="7" ry="3" />
    <path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
  </Base>
);
export const Users = (p: P) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .7 3.2 2.4 3.5 5.2" />
  </Base>
);
export const Shield = (p: P) => (
  <Base {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" />
    <path d="M9 12l2 2 4-4" />
  </Base>
);
export const Phone = (p: P) => (
  <Base {...p}>
    <path d="M5 4h3.5l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Base>
);
export const Chat = (p: P) => (
  <Base {...p}>
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
    <path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01" strokeWidth={2.6} />
  </Base>
);
export const Globe = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5z" />
  </Base>
);
export const MapPin = (p: P) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </Base>
);
export const ArrowLeft = (p: P) => <Base {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Base>;
export const ArrowRight = (p: P) => <Base {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Base>;
export const Columns = (p: P) => (
  <Base {...p}>
    <rect x="3.5" y="4.5" width="7" height="15" rx="2" />
    <rect x="13.5" y="4.5" width="7" height="15" rx="2" />
  </Base>
);
export const Book = (p: P) => (
  <Base {...p}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
    <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />
  </Base>
);
export const Grid = (p: P) => (
  <Base {...p}>
    <rect x="4" y="4" width="7" height="7" rx="2" />
    <rect x="13" y="4" width="7" height="7" rx="2" />
    <rect x="4" y="13" width="7" height="7" rx="2" />
    <rect x="13" y="13" width="7" height="7" rx="2" />
  </Base>
);
export const Info = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8h.01" strokeWidth={2.4} />
  </Base>
);
export const Help = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.7 9.5a2.4 2.4 0 0 1 4.6.8c0 1.6-2.3 2.2-2.3 3.4M12 16.8h.01" strokeWidth={2.2} />
  </Base>
);
export const Lock = (p: P) => (
  <Base {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </Base>
);
export const Sparkle = (p: P) => (
  <Base {...p}>
    <path d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8z" />
  </Base>
);
