import { useRef, useState } from 'react';
import Button from '../common/Button.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import SmartImage from '../common/SmartImage.jsx';
import SplitLines from '../common/SplitLines.jsx';
import { products } from '../../data/products.js';
import { useGsap } from '../../hooks/useGsap.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { gsap, ScrollTrigger } from '../../animations/gsapAnimations.js';

/**
 * Mobile, tablet and reduced-motion version of the seasonal journey.
 * No pinning: each season is its own full-bleed chapter with light reveals,
 * and a sticky season index tracks where you are in the year.
 */
export default function SeasonalJourneyStacked() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useScrollReveal(root);
  useGsap(
    () => {
      gsap.utils.toArray('[data-season-panel]', root.current).forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    [],
    root,
  );

  const jump = (e, slug) => {
    e.preventDefault();
    document.getElementById(`season-${slug}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={root} aria-labelledby="journey-title" className="relative bg-midnight">
      <div className="container-luxe pb-14 pt-24 md:pb-20 md:pt-32">
        <SectionHeading
          id="journey-title"
          eyebrow="The Journey"
          lines={['Four Seasons.', <em key="b">One Journey.</em>]}
          description="Travel through the year, one fragrance at a time."
        />
      </div>

      {/* Sticky season index */}
      <nav aria-label="Seasons" className="hairline sticky top-0 z-20 border-y bg-midnight/85 backdrop-blur-md">
        <ol className="container-luxe grid grid-cols-4">
          {products.map((p, i) => (
            <li key={p.slug}>
              <a
                href={`#season-${p.slug}`}
                onClick={(e) => jump(e, p.slug)}
                aria-current={active === i ? 'step' : undefined}
                className={`label block py-3.5 text-center text-[0.6rem] transition-colors duration-500 sm:text-[0.6875rem] ${
                  active === i ? 'text-pearl' : 'text-pearl/40'
                }`}
              >
                <span className="block text-mist/70">{p.index}</span>
                {p.season}
                <span
                  aria-hidden="true"
                  className="mx-auto mt-2 block h-px w-8 origin-center transition-transform duration-700 ease-luxe"
                  style={{ background: p.accent, transform: `scaleX(${active === i ? 1 : 0})` }}
                />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {products.map((p) => (
        <article
          key={p.slug}
          id={`season-${p.slug}`}
          data-season-panel
          aria-labelledby={`season-${p.slug}-title`}
          className="relative scroll-mt-16 overflow-hidden py-20 md:py-28"
        >
          <div aria-hidden="true" className="absolute inset-0">
            <SmartImage name={p.background} alt="" sizes="100vw" className="h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/55 to-midnight" />
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(60% 40% at 50% 35%, ${p.accent}2e 0%, transparent 70%)` }}
            />
          </div>

          <div className="container-luxe relative grid items-center gap-12 md:grid-cols-2 md:gap-14">
            <div
              data-reveal="mask"
              className="relative mx-auto aspect-[3/4] w-[80%] max-w-[22rem] overflow-hidden bg-navy/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] md:w-full"
            >
              <SmartImage
                name={p.image}
                alt={p.alt}
                sizes="(min-width: 768px) 45vw, 80vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div>
              <p data-reveal className="label flex items-center gap-4 text-pearl/80">
                <span aria-hidden="true" className="h-px w-10" style={{ background: p.accent }} />
                {p.index}
                <span style={{ color: p.accent }}>{p.season}</span>
              </p>
              <h3
                id={`season-${p.slug}-title`}
                data-reveal="lines"
                className="mt-6 text-[clamp(2rem,7.4vw,3.3rem)] leading-[1.1] tracking-[-0.02em]"
              >
                <SplitLines lines={p.scene.lines} />
              </h3>
              <p data-reveal className="body-copy mt-6 max-w-md">
                {p.scene.description}
              </p>
              <div data-reveal className="hairline mt-7 flex max-w-md items-baseline justify-between gap-4 border-t pt-4">
                <span className="text-lg italic text-ice">{p.name}</span>
                <span className="label text-right text-mist">{p.family}</span>
              </div>
              <div data-reveal className="mt-7">
                <Button to={`/fragrance/${p.slug}`} variant="ghost">
                  Discover the fragrance
                </Button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
