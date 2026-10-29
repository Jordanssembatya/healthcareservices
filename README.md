# CoverGuide

A mobile-first information and referral website that helps people, especially informal-sector workers, understand health insurance plans, compare them and find out how to enrol.

No accounts, no health questions, no payments, no real enrolment. Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4. There is no backend. All content lives in two JSON files.

## Run it

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

The font is bundled locally (`@fontsource-variable/plus-jakarta-sans`), so after installing, the site builds and runs with no internet connection.

To use it on a phone on the same Wi-Fi network, run `npm run dev -- -H 0.0.0.0` and open `http://<laptop-ip>:3000`. You can also use the browser's device toolbar (F12 → phone icon).

To deploy, push to GitHub and import the repo into Vercel. No environment variables are needed.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Landing page: hero, how it works, featured plans, audience shortcuts, glossary preview, FAQ |
| `/plans` | Catalogue with search, filters by audience (`?for=riders`), and the compare tray |
| `/plans/[id]` | Plan detail: insurer, premium, coverage, exclusions, benefit limits, waiting period, co-pay, enrolment requirements |
| `/compare?a=&b=` | Two plans side by side, with the same fields in the same order |
| `/plans/[id]/enrol` | Enrolment checklist (requirements → documents → steps) ending with the insurer's Call, WhatsApp and website links |
| `/glossary` | Searchable list of insurance words |
| `/help` | Colour legend, step-by-step guide, FAQ, privacy |

## Demo path (rehearse this)

1. Open `/` on mobile, tap **Browse plans**, then tap the dotted-underlined **Premium** to show a term explanation.
2. Tap **Compare** on *Essential Care* and *Clinic Starter*, then tap **Compare** in the tray at the bottom.
3. Read one exclusion in the red row (e.g. "Dental and eye care") and one benefit limit in the amber row ("Inpatient: up to UGX 5,000,000 per year"). Point out **"Not provided. Ask the insurer."** for Clinic Starter. We never invent missing information.
4. Tap **Enrol** under Essential Care. Tick through the checklist.
5. Finish on the contact card with the **Call**, **WhatsApp** and **Website** buttons.

## Data

- `data/products.json`: the plan records. `data/glossary.json`: the term definitions.
- **Any field can be `null`.** `null` is shown as "Not provided. Ask the insurer." Never replace it with a guess.
- `isSample: true` shows a small "Sample plan" tag on the plan, compare and contact screens. The current 4 plans, their insurers and phone numbers are fictional, and the websites use the reserved `example.com` / `example.org` domains. Set `isSample` to `false` only for data an insurer has confirmed. The tags then disappear.
- Glossary words in product text are underlined automatically and open a bottom sheet when tapped. To add a word, add it to `glossary.json` along with the word forms to match.
- `audience` tags (`vendors`, `riders`, `families`, `individuals`) drive the catalogue filters.

Section colour code (also explained on `/help`): green ✓ = covered, red ✕ = exclusions, amber gauge = benefit limits, blue clipboard = enrolment. Each section also has an icon and a heading, so the meaning never depends on colour alone.

## Code layout

```
app/                 Routes (see table above)
components/          PlanCard, Catalogue, Fields (sections, Not-provided), Term (popup),
                     TextWithTerms, Checklist, ContactCard, CompareSelect, Nav, Faq, Icons
lib/products.ts      Types and helpers (formatting, tel/WhatsApp links)
lib/glossary.ts      Term lookup and auto-matching in text
lib/theme.ts         Visual accent colour per plan
lib/faq.ts           FAQ content
```
