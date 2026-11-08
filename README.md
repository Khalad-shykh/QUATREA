# QUATRÉA — Seasonal Fragrance House

**Four Seasons. Four Emotions. One Timeless Essence.**

QUATRÉA is a portfolio website for a fictional luxury perfume house. It is built as a multi-page React app. Its four eaux de parfum (Spring *Éclat de Fleur*, Summer *Soléa*, Autumn *Ambre Nocturne* and Winter *Nuit de Glace*) are presented as an immersive digital campaign rather than as a shop.

---

## Quick start

```bash
npm install
npm run assets   # recommended: download + optimise the campaign images (see below)
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build → dist/
npm run preview  # serve the build locally
```

Requires Node 20.19+ (or 22.12+).

---

## Stack

React 19 · Vite 7 · React Router 7 · Tailwind CSS 4 · GSAP 3 + ScrollTrigger · Framer Motion 12 · Lucide React · Libre Baskerville (Google Fonts)

`sharp` is a dev dependency. Only the asset script uses it.

---

## Routes

| Route | Page |
| --- | --- |
| `/` | Hero → Seasonal Collection → *Four Seasons. One Journey.* scrollytelling → Footer |
| `/fragrances` | Editorial collection page |
| `/fragrance/:slug` | Shared product template (`spring`, `summer`, `autumn`, `winter`) |
| `/about` | Brand story: memory, the four seasons, the art of composition, philosophy |
| `/contact` | Contact details + validated form (front-end demo) |
| `*` | 404 page |

Direct URL navigation works in dev and preview. For hosting, `public/_redirects` (Netlify) and `vercel.json` (Vercel) rewrite all routes to `index.html`.

---

## Project structure

```
src/
  animations/   gsapAnimations.js (motion language + declarative scroll reveals)
                particles.js      (canvas engine for seasonal particles)
  assets/images/ hero/ products/ seasons/ branding/   ← filled by `npm run assets`
  components/
    layout/     Navbar, Footer, PageTransition, BagDrawer
    common/     Button, SectionHeading, ProductCard, SmartImage, SplitLines,
                SeasonParticles, ContactForm, Logo
    home/       Hero, SeasonalCollection, SeasonalScrollytelling,
                SeasonalScene, SeasonalJourneyStacked
    product/    ProductHero, ProductIntro, FragranceNotes, ProductStory,
                ProductSpecs, RelatedProducts
  context/      BagContext (front-end bag, persisted to localStorage)
  data/         products.js (all copy, notes, prices), imageSources.js,
                assets.js, localImages.js
  hooks/        useGsap, useScrollReveal, useScrollProgress, useMediaQuery,
                useDocumentTitle
  pages/        Home, Fragrances, ProductDetails, About, Contact, NotFound
  styles/       index.css (Tailwind v4 theme tokens + base styles)
```

---

## Visual assets (Higgsfield)

All 11 campaign images were generated with **Higgsfield (GPT Image 2)**:

| Key | Use |
| --- | --- |
| `hero/signature` | Hero: the signature flacon in a midnight studio (16:9) |
| `products/{season}` ×4 | Seasonal product photography (3:4) |
| `seasons/{season}` ×4 | Atmospheric backgrounds (16:9) |
| `branding/atelier` | About page: raw materials still life (3:4) |
| `branding/collection` | All four bottles side by side (16:9) |

**Consistency:** the hero render defines the bottle: a thick crystal flacon with a solid-glass base, a silver collar, a faceted cap set on its corner, and etched *QUATRÉA* lettering. That render was the reference image for each seasonal product shot, so geometry and branding stay the same. Only the liquid colour, the environment and the light change per season. The line-up shot was generated from the four product shots.

**Serving:** `src/data/imageSources.js` lists the CDN originals. Run `npm run assets` once. It downloads each image and writes responsive WebP variants to `src/assets/images/<group>/<name>-<width>w.webp`. The app finds these files automatically (via `import.meta.glob`) and serves them with `srcset`. Until then it falls back to the CDN originals, so the site works either way. Commit the generated WebPs when you deploy.

> Transparent cut-outs were not available on the Higgsfield plan used. That's why the bottles are shown inside framed photography, with clip-path masks, rather than as floating cut-outs.

---

## Motion system

* **One motion language** (`animations/gsapAnimations.js`): long, decelerating reveals (`expo.out` / `power3.out`) and calm, symmetrical scene changes (`power2.inOut`).
* **Hero intro:** a single GSAP timeline. The background fades in, the nav enters with a stagger (Framer Motion, first load only), then the eyebrow tracking settles, the heading reveals line by line, and the copy, CTAs and bottle rise into place. After that come a slow floating loop, pointer parallax (precise pointers only) and a scroll-out parallax.
* **Scroll reveals:** declarative `data-reveal="lines | mask | stagger | line"` and `data-parallax` attributes, wired once per page by `useScrollReveal`. Every tween and ScrollTrigger lives in a `gsap.context` and is reverted on unmount, so nothing leaks between routes.
* **Scrollytelling** (`SeasonalScrollytelling.jsx`): the stage is held with CSS `position: sticky`. One GSAP timeline, scrubbed by ScrollTrigger across ~380vh of scroll, drives every layer:
  - atmospheric backgrounds and accent light cross-fade, with a slow "breathing" zoom;
  - the next bottle is unmasked over the previous one (clip-path), while the outgoing shot drifts and scales;
  - an outlined season word slides past;
  - the copy is exchanged line by line;
  - canvas particles change season (petals → light motes → leaves → frost);
  - the 01–04 progress indicator fills and the active season updates. You can click it to jump between seasons.

  Sticky positioning was used instead of a pin-spacer so React's DOM is never re-parented and the route transitions stay stable.
* **Route transitions** (Framer Motion): a midnight curtain rises over the outgoing page, the scroll resets behind it, and the curtain lifts from the new page.
* **Reduced motion:** `prefers-reduced-motion` disables the intro, parallax, floating and particles, replaces the pinned journey with the stacked version, and `MotionConfig reducedMotion="user"` covers Framer Motion.

## Responsive strategy

* **≥ 1024 px and ≥ 600 px tall:** full cinematic scrollytelling.
* **Tablet and mobile:** a purpose-built stacked journey with no pinning. Each season is a full-bleed chapter with light reveals and a sticky season index.
* The hero switches to an image-top / copy-bottom composition below `lg` (including portrait tablets).
* The navigation becomes a full-screen menu below `lg`.

## Accessibility & performance

* Semantic landmarks, one `h1` per page, a skip link, visible focus styles, descriptive `alt` text (decorative imagery uses `alt=""`), breadcrumb `nav`, and a radio-group size selector.
* Reveals animate opacity rather than visibility, so links stay keyboard-reachable. Inactive scrollytelling scenes are `inert`.
* Below-the-fold images lazy-load and fade in on decode. Aspect-ratio boxes prevent layout shift.
* The particle canvas pauses off-screen and in hidden tabs, and caps device pixel ratio at 1.75.
* GSAP and Framer Motion are split into their own long-cached chunk.

## Demo notes

* **Bag:** "Add to Bag" and the bag drawer work in the browser only. Checkout is disabled and labelled as a demo.
* **Contact form:** the form validates in the browser and simulates sending. The success message says clearly that **nothing was sent**. There is no backend.
* The brand, products, copy and contact address (`atelier@quatrea.example`) are fictional. Social links point to the platforms' home pages.
