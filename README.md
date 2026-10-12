# Shivam Aghera — Portfolio

A single-page editorial portfolio: ink/paper surfaces, Space Grotesk display
type, one vermilion accent, an interactive canvas "signal field" hero, and
project case studies with custom SVG mockups.

## Commands

```bash
npm install     # install dependencies
npm run dev     # local dev server (http://localhost:5173)
npm run build   # typecheck + production build → dist/
npm run lint    # oxlint
npm run preview # serve the production build locally
```

## Environment

None required. The site is fully static — no API keys, no backend.

## Editing content

Everything lives in one file: `src/data/portfolio.ts`.

- `profile` — name, role, degree, CGPA, tagline, about paragraphs, interests,
  email, resume path
- `socials` — GitHub / LinkedIn. Set `status: "live"` with a real `href`, or
  leave `"todo"` and the UI shows an elegant "coming soon" note (never a dead link)
- `projects` — title, category, problem, solution, role, stack, approach,
  outcomes, links, `visual` (one of `geospatial | medical | security | agri |
  generic`), `featured`. Missing details render as "details coming soon".
- `skillCategories`, `experiences`, `achievements`, `contact`, `navLabels`

Rules: never invent achievements, metrics, testimonials, or experience. Items
marked `"todo"` must never become dead links or fake buttons.

## Adding the résumé

Drop the PDF at `public/resume.pdf` — the hero "Résumé" button already links
to `/resume.pdf`. No code change needed.

## Replacing project mockups

Project visuals are custom SVG components in
`src/components/ProjectVisuals.tsx`, chosen per project via the `visual`
field in `src/data/portfolio.ts`. Swap any of them for real screenshots later.

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import it in Vercel — the Vite preset works with zero config
   (build command `npm run build`, output dir `dist`).
3. Every push to `main` redeploys automatically.

## Notes

- Custom cursor and magnetic buttons are desktop-pointer only; the canvas
  signal field draws one static frame on touch devices or when
  `prefers-reduced-motion` is set.
- Preloader is skippable (click / Enter) and never exceeds ~1.2s.
