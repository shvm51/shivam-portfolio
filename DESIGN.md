# DESIGN.md — Shivam Aghera Portfolio

## Palette — base colors + one accent
- Paper (light surface): `#F4F1EA` warm off-white
- Ink (dark surface): `#141311` near-black charcoal
- Graphite (mid): `#2A2925`
- Silver (muted line/text): `#8E8B82`
- Accent: signal orange-red `#FF4D00` (used sparingly: key headlines words, markers, active states, cursor)
- Paper-ink and ink-paper sections alternate for editorial rhythm

## Typography — body + display
- Display: "Space Grotesk" — oversized, tight tracking, uppercase for section titles; lowercase editorial for hero name
- Hero wordmark: "Anton" condensed (hero only) — massive two-line SHIVAM / AGHERA. composition; line one solid warm-white, line two mixes solid (AGH) and hairline-outlined (ERA) letterforms as a deliberate graphic treatment, closed by the orange accent period; a faint outline "ghost echo" of the name drifts behind for typographic depth
- Serif editorial accent: "Fraunces" italic for quotes, section kickers, pull-lines
- Body/mono: "Inter" body; "JetBrains Mono" for labels, indexes, technical annotations
- Scale: hero name clamp(4rem, 14vw, 13rem); section titles clamp(2.5rem, 7vw, 6rem); body 1.0625rem/1.7

## Layout
- 12-col architectural grid, max-width 1440px, generous margins (gutter 24–96px)
- Asymmetry: offset columns, broken grid for project features, rotated index numbers
- Section rhythm: alternate paper/ink surfaces; each section opens with index label ("01 — About") in mono
- Whitespace is structural: min 12vh section padding desktop, 8vh mobile

## Mood
Editorial-engineering: a printed technical journal that is alive. Precise, confident, warm paper, sharp ink, one hot accent. Not cyberpunk, not corporate.

## Density
Balanced → spacious. No more than one idea per viewport.

## Components
- Buttons: pill or sharp rect, 1px ink border on paper / paper border on ink; hover fill accent; magnetic on desktop
- Cards: no cards for projects — full-bleed editorial features instead. Skill "cards" are typographic index rows
- Borders: 1px hairlines (`ink/12` on paper, `paper/15` on ink); section dividers rule lines
- Radius: 0–6px max. Sharp edges.
- Texture: subtle film grain overlay (SVG noise, opacity 0.05) + faint baseline grid in hero

## Motion
- Framer Motion + IntersectionObserver reveals; cubic-bezier(0.22,1,0.36,1) ("out-expo-ish"), 0.7–0.9s
- Staggered display-type entrances (per-line, 60ms stagger)
- One signature hero element: interactive "signal field" — canvas particle lattice that reacts to pointer, evoking infrastructure/AI networks (the single 3D-adjacent visual; 2D canvas, cheap)
- Custom cursor ring on desktop pointer devices only
- Preloader: minimal counter + name mask, max 1.2s, skippable
- Never animates: body copy readability, nav labels. All motion respects prefers-reduced-motion.

## Exclusions
- No purple/blue neon gradients, no floating blobs, no glassmorphism
- No fake terminal windows, no code rain
- No proficiency percentage bars
- No stock photos; project visuals are custom-built SVG/CSS mockups (dashboards, diagrams), replaceable
- No scroll-jacking, no full-screen transitions between sections

## Responsive
- Breakpoints: 640 / 900 / 1200. Mobile rethinks compositions (stack, collapse grid to 4-col), disables cursor + heavy canvas (static fallback), touch-friendly 44px targets, zero horizontal overflow.

## Validation notes (2026-10-13)
- ui-ux-pro-max catalog query confirmed direction: monochrome + single accent, bold/asymmetric variance (8/10), scroll-triggered storytelling pattern, brutalist-adjacent raw editorial style, spacious density.
- Catalog typography suggestion (handwritten) rejected: brief demands premium engineering feel → Space Grotesk + Fraunces stands.
- Pinterest pins (pin.it/7KyIDtrat, pin.it/2FLrGUTSZ): text fetch blocked (403); live-browser inspection in progress — findings to be folded into the polish pass if they arrive before final verification.
- Pin analysis received 2026-10-13 via live browser (both pins viewable without login):
  - Pin 1 "CINE DAILY" hero mockup: black/white/red, massive condensed sans as poster architecture with imagery living inside the type, dotted film-strip dividers, small-caps nav, pill CTAs.
  - Pin 2 "Portfolio Website Hero Section": oversized cream condensed wordmark layered over portrait on near-black, tiny corner labels, near-monochrome + one warm accent; the wordmark IS the hero.
  - Borrowed: full-viewport condensed wordmark hero with the visual behind the type; dotted dividers + small-caps micro-labels giving projects a "featured release" feel; dark hero flowing into lighter sections (never all-dark).
  - Avoided: literal character-over-type pop-culture treatment; uniform heavy dark pages with no breathing room.

## Build log (2026-10-13)

Implemented per contract, single-page + modal case studies (no router):

- `src/components/ui.tsx` — Reveal/LineReveal (Framer Motion + IO, ease
  cubic-bezier(0.22,1,0.36,1), 60–90ms staggers), Magnetic (desktop pointer
  only), SectionHeading (mono "0N — label" + display title), button classes,
  inline GitHub/LinkedIn SVG marks (lucide v1.55 dropped brand icons).
- `Preloader.tsx` — counter + name mask, ≤1.2s, click/Enter to skip, bypassed
  entirely under prefers-reduced-motion.
- `Cursor.tsx` — custom ring + dot, `(pointer: fine)` only, enlarges over
  interactive elements.
- `Navbar.tsx` — fixed, transparent → blurred ink on scroll, full-screen mobile
  menu with staggered links.
- `Hero.tsx` — full-viewport architectural wordmark ("SHIVAM AGHERA",
  clamp(3.6rem,16.5vw,15rem)), canvas "signal field" particle lattice behind/
  around the type (pointer-reactive, pauses offscreen, static frame on
  touch/reduced-motion), kicker, tagline + intro, CTAs (Explore my work →
  #work, Get in touch → #contact, Résumé → /resume.pdf), GitHub live icon +
  LinkedIn "soon" note, scroll indicator.
- `About.tsx` — editorial split: display lede, fact strip
  (degree/university/CGPA), interests index, offset "path so far" timeline.
- `Work.tsx` — featured "release" features: dotted divider rows, mono
  micro-labels (index, category), alternating asymmetric text/visual columns,
  custom SVG mockup per project (`ProjectVisuals.tsx`: agri dashboard,
  geospatial map, medical charts, security graph), case-study modal
  (problem/solution/role/stack/approach/outcomes/live links only, Esc to close,
  body scroll lock, focus management); secondary projects as typographic
  index rows with "details coming soon".
- `Skills.tsx` — typographic index grouped by 8 categories, category notes
  ("no proficiency claims"), no bars.
- `Experience.tsx` — editorial 3-role timeline grid; `Achievements.tsx` —
  restrained year/title/detail list.
- `Contact.tsx` — "Got an idea worth building?" headline, live GitHub button,
  muted "Email — soon" / "LinkedIn — soon" notes (no mailto, no fake form);
  `Footer.tsx` — name, year, nav.
- `public/og-cover.svg` — branded 1200×630 OG image; `public/resume.pdf`
  intentionally absent (user adds later; link already points at it).

Deviations from contract: none material. Reduced motion respected globally
(CSS + framer-motion `useReducedMotion` + canvas static fallback); semantic
landmarks, skip link, focus-visible ring, aria labels on icon buttons/modal.

Pin-reference refinements folded in (2026-10-13): hero as full-viewport
architectural wordmark with canvas living behind/around the type; featured
projects as "featured release" rows with dotted dividers + small-caps mono
micro-labels; strict ink/paper section alternation so the page breathes;
vermilion #FF4D00 accent kept.
