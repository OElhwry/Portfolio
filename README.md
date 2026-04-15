# Omar El Hawary — Portfolio

Personal portfolio site, live at **[oelhawary.com](https://oelhawary.com)**.

Built as a proper project in its own right: statically exported Next.js 15 app deployed to GitHub Pages via a custom domain, with full TypeScript, animated interactions, and a per-project page for each piece of work.

---

## Pages

### Home (`/`)
Split-panel layout with a sticky left panel (name, title, availability pills, section nav, social links, CV download) and a scrollable right panel.

- **About** — background, what I build, what I'm looking for
- **Experience** — PWR Events (Box Office) and NHS Test & Trace (Call Handler)
- **Projects** — cards linking to each individual project page

### Project pages

| Route | Project |
|---|---|
| `/peerfitv2` | PeerFit v2 — full-stack social sports platform, live at peerfit.co.uk |
| `/peerfitv1` | PeerFit v1 — original PHP / MySQL prototype, the origin of the idea |
| `/deadcenter` | Deadcenter — browser precision-timing game with 20 levels |
| `/kvit` | Kvit — offline bill splitter, calculates minimum transfer set |
| `/aphelion` | Aphelion — interactive space visualisation with NASA APIs |

Each project page follows the same split layout: sticky left panel with tech stack, section nav, and CTAs; right panel with About, Screenshots (direction-aware slideshow), and a closing section (design notes, lessons, etc.).

### 404 (`/not-found.tsx`)
Custom not-found page matching the home page aesthetic — indigo aurora, dot field, links back to the portfolio and projects.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Fonts | Geist Sans + Geist Mono (next/font) |
| Images | `next/image` with `unoptimized: true` (required for static export) |
| Deployment | GitHub Pages via `gh-pages`, custom domain via CNAME |

---

## Folder structure

```
my-portfolio/
├── app/
│   ├── layout.tsx              # Root layout — metadata, fonts, OG tags
│   ├── globals.css             # Base styles, focus rings, reduced-motion rule
│   ├── not-found.tsx           # Custom 404 page
│   ├── (site)/
│   │   └── page.tsx            # Home page
│   └── (projects)/
│       ├── peerfitv2/page.tsx
│       ├── peerfitv1/page.tsx
│       ├── deadcenter/page.tsx
│       ├── kvit/page.tsx
│       └── aphelion/page.tsx
├── lib/
│   └── project-media.ts        # Centralised image imports + screenshot arrays
├── public/
│   ├── images/projects/        # All project screenshots, organised per project
│   │   ├── peerfit-v1/
│   │   ├── peerfit-v2/
│   │   ├── deadcenter/
│   │   ├── Kvit/
│   │   └── Aphelion/
│   ├── omar-elhawary-cv-software.pdf   # CV — linked from the download icon in the header
│   └── CNAME                   # Custom domain for GitHub Pages
├── next.config.ts              # output: "export", trailingSlash, unoptimized images
└── package.json
```

---

## Local setup

```bash
# Clone the repo
git clone https://github.com/OElhwry/Portfolio.git
cd Portfolio/my-portfolio

# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm run dev
```

Requires Node 18+.

---

## Build and deploy

```bash
# Static export to my-portfolio/out/
npm run build

# Build + push to GitHub Pages (sets CNAME to oelhawary.com)
npm run deploy
```

`npm run deploy` runs `next build` followed by `gh-pages -d out --nojekyll --cname oelhawary.com`. The `--nojekyll` flag is required so GitHub Pages serves the Next.js static export correctly without stripping underscore-prefixed files.

The `output: "export"` setting in `next.config.ts` means this is a fully static site — no server, no edge functions. All pages are pre-rendered at build time to `out/`.

---

## Supporting assets

| Asset | Location |
|---|---|
| CV (PDF) | `my-portfolio/public/omar-elhawary-cv-software.pdf` |
| Project screenshots | `my-portfolio/public/images/projects/<project>/` |
| Image imports + screenshot metadata | `my-portfolio/lib/project-media.ts` |

To update the CV, replace the file in `public/` and keep the same filename, or update the `href` on the download button in `app/(site)/page.tsx` (search for `omar-elhawary-cv-software.pdf`).

---

## Accessibility

- `:focus-visible` rings on all interactive elements (defined globally in `globals.css`)
- `prefers-reduced-motion` media query disables decorative animation site-wide
- Cursor glow and mouse-tracking effects skip touch devices and reduced-motion users at the JS level
- `aria-label` attributes on all icon-only buttons and nav landmarks

---

## Contact

**omar.elhawary@hotmail.co.uk** · [oelhawary.com](https://oelhawary.com) · [linkedin.com/in/oelhawary](https://linkedin.com/in/oelhawary)
