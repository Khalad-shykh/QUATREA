import { useCallback, useRef, useState } from 'react';
import SeasonalScene from './SeasonalScene.jsx';
import SeasonalJourneyStacked from './SeasonalJourneyStacked.jsx';
import SeasonParticles from '../common/SeasonParticles.jsx';
import SmartImage from '../common/SmartImage.jsx';
import { products } from '../../data/products.js';
import { useGsap } from '../../hooks/useGsap.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { EASE, gsap, ScrollTrigger } from '../../animations/gsapAnimations.js';

/* Timeline units. Each season holds, then dissolves into the next. */
const HOLD = 0.6;
const TRANS = 0.9;
const STEP = HOLD + TRANS;
const COUNT = products.length;
const TOTAL = COUNT * HOLD + (COUNT - 1) * TRANS;
/* Extra scroll distance (in vh) the visitor travels while the stage is held. */
const SCROLL_VH = 380;

/** Which season the timeline is in at `time` (switches mid-transition). */
const sceneAt = (time) => {
  let index = 0;
  for (let i = 0; i < COUNT - 1; i += 1) {
    if (time >= i * STEP + HOLD + TRANS / 2) index = i + 1;
  }
  return index;
};

/** 0 → 1 progress of the indicator bar belonging to scene `i`. */
const segmentProgress = (time, i) => {
  const start = i === 0 ? 0 : i * STEP - TRANS / 2;
  const end = i === COUNT - 1 ? TOTAL : i * STEP + HOLD + TRANS / 2;
  return Math.min(1, Math.max(0, (time - start) / (end - start)));
};

export default function SeasonalScrollytelling() {
  const cinematic = useMediaQuery(
    '(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)',
  );
  return cinematic ? <PinnedJourney /> : <SeasonalJourneyStacked />;
}

/**
 * "Four Seasons. One Journey." — desktop scrollytelling.
 *
 * The stage is held in place with CSS `position: sticky` while a single GSAP
 * timeline, scrubbed by ScrollTrigger across the section's scroll distance,
 * drives every layer: atmospheric backgrounds and accent light cross-fade,
 * the next bottle is unmasked over the last, an outlined season word drifts
 * past, copy is exchanged line by line, and the particles change season.
 * Sticky (rather than a pin-spacer) keeps React's DOM untouched and plays
 * nicely with the route transitions.
 */
function PinnedJourney() {
  const root = useRef(null);
  const triggerRef = useRef(null);
  const barRefs = useRef([]);
  const [active, setActive] = useState(0);

  useGsap(
    () => {
      const q = gsap.utils.selector(root);
      const bgs = q('[data-bg]');
      const glows = q('[data-glow]');
      const words = q('[data-word]');
      const shots = q('[data-shot]');
      const shotImgs = q('[data-shot] img');
      const captions = q('[data-caption]');
      const scenes = q('[data-scene]');
      const lines = scenes.map((s) => s.querySelectorAll('.line-inner'));
      const items = scenes.map((s) => s.querySelectorAll('[data-scene-item]'));
      const first = (i) => i === 0;

      // Resting state: the first season is on stage, the others wait.
      gsap.set(bgs, { autoAlpha: (i) => (first(i) ? 1 : 0), scale: 1.12 });
      gsap.set(glows, { autoAlpha: (i) => (first(i) ? 1 : 0) });
      gsap.set(words, { autoAlpha: (i) => (first(i) ? 1 : 0), xPercent: (i) => (first(i) ? 0 : 14) });
      gsap.set(shots, { clipPath: (i) => (first(i) ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)') });
      gsap.set(shotImgs, { scale: (i) => (first(i) ? 1 : 1.3) });
      gsap.set(captions, { autoAlpha: (i) => (first(i) ? 1 : 0), yPercent: (i) => (first(i) ? 0 : 100) });
      scenes.forEach((scene, i) => {
        gsap.set(scene, { autoAlpha: first(i) ? 1 : 0 });
        if (!first(i)) {
          gsap.set(lines[i], { yPercent: 115 });
          gsap.set(items[i], { autoAlpha: 0, y: 28 });
        }
      });

      const tl = gsap.timeline({ defaults: { ease: EASE.scene } });

      // Slow "breathing" zoom on each background for as long as it is visible.
      bgs.forEach((bg, i) => {
        const start = Math.max(0, i * STEP - TRANS);
        const end = i === COUNT - 1 ? TOTAL : i * STEP + HOLD + TRANS;
        tl.to(bg, { scale: 1, duration: end - start, ease: 'none' }, start);
      });

      // The framed bottle drifts upward across the whole journey.
      tl.fromTo(q('[data-frame]'), { yPercent: 4 }, { yPercent: -4, duration: TOTAL, ease: 'none' }, 0);

      for (let c = 0; c < COUNT - 1; c += 1) {
        const n = c + 1;
        const t = c * STEP + HOLD;
        const mid = t + TRANS * 0.5;

        tl
          // atmosphere & light
          .to(bgs[c], { autoAlpha: 0, duration: TRANS }, t)
          .to(bgs[n], { autoAlpha: 1, duration: TRANS }, t)
          .to(glows[c], { autoAlpha: 0, duration: TRANS }, t)
          .to(glows[n], { autoAlpha: 1, duration: TRANS }, t)
          .to(words[c], { autoAlpha: 0, xPercent: -14, duration: TRANS }, t)
          .to(words[n], { autoAlpha: 1, xPercent: 0, duration: TRANS }, t)
          // bottle: the next season is unmasked over the last
          .to(shots[n], { clipPath: 'inset(0% 0% 0% 0%)', duration: TRANS, ease: 'power3.inOut' }, t)
          .to(shotImgs[n], { scale: 1, duration: TRANS, ease: 'power2.out' }, t)
          .to(shotImgs[c], { scale: 1.1, yPercent: -7, duration: TRANS, ease: 'power2.in' }, t)
          .to(captions[c], { autoAlpha: 0, yPercent: -100, duration: TRANS * 0.45 }, t)
          .to(captions[n], { autoAlpha: 1, yPercent: 0, duration: TRANS * 0.45 }, mid)
          // copy: lines leave upward, the next season's lines rise in
          .to(lines[c], { yPercent: -115, duration: TRANS * 0.42, stagger: 0.05, ease: 'power2.in' }, t)
          .to(items[c], { autoAlpha: 0, y: -24, duration: TRANS * 0.38, stagger: 0.03, ease: 'power2.in' }, t)
          .set(scenes[c], { autoAlpha: 0 }, mid)
          .set(scenes[n], { autoAlpha: 1 }, mid)
          .to(lines[n], { yPercent: 0, duration: TRANS * 0.5, stagger: 0.06, ease: 'power3.out' }, mid)
          .to(items[n], { autoAlpha: 1, y: 0, duration: TRANS * 0.45, stagger: 0.05, ease: 'power3.out' }, mid + 0.05);
      }
      // Let the final season rest before the section scrolls away.
      tl.to({}, { duration: HOLD }, TOTAL - HOLD);

      // Indicator + active season follow the (smoothed) timeline, not raw scroll.
      tl.eventCallback('onUpdate', () => {
        const time = tl.time();
        barRefs.current.forEach((bar, i) => {
          if (bar) bar.style.transform = `scaleX(${segmentProgress(time, i)})`;
        });
        setActive(sceneAt(time));
      });

      triggerRef.current = ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        animation: tl,
        scrub: 1,
      });

      // Entrance as the section arrives.
      const enter = { trigger: root.current, start: 'top 70%', once: true };
      gsap.fromTo(
        q('[data-enter-frame]'),
        { clipPath: 'inset(14% 10% 14% 10%)', autoAlpha: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          autoAlpha: 1,
          duration: 1.8,
          ease: 'expo.out',
          clearProps: 'clipPath',
          scrollTrigger: enter,
        },
      );
      gsap.fromTo(
        q('[data-enter-text]'),
        { autoAlpha: 0, y: 48 },
        { autoAlpha: 1, y: 0, duration: 1.5, ease: EASE.soft, scrollTrigger: { ...enter, start: 'top 55%' } },
      );

      ScrollTrigger.refresh();
    },
    [],
    root,
  );

  const goTo = useCallback((i) => {
    const st = triggerRef.current;
    if (!st) return;
    const time = i === 0 ? 0 : i * STEP + HOLD * 0.3;
    window.scrollTo({ top: st.start + (st.end - st.start) * (time / TOTAL), behavior: 'smooth' });
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="journey-title"
      className="relative bg-midnight"
      style={{ height: `calc(100svh + ${SCROLL_VH}vh)` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* 1 · Atmospheric backgrounds */}
        <div aria-hidden="true" className="absolute inset-0">
          {products.map((p) => (
            <div key={p.slug} data-bg className="absolute inset-0 will-change-transform">
              <SmartImage name={p.background} alt="" sizes="100vw" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        {/* 2 · Grading, light and legibility */}
        <div aria-hidden="true" className="absolute inset-0 bg-midnight/40" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/5" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-midnight/85 via-transparent to-midnight/90" />
        {products.map((p) => (
          <div
            key={p.slug}
            data-glow
            aria-hidden="true"
            className="absolute inset-0 mix-blend-screen"
            style={{ background: `radial-gradient(38% 52% at 74% 52%, ${p.accent}40 0%, transparent 72%)` }}
          />
        ))}

        {/* 3 · Outlined season word */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {products.map((p) => (
            <span
              key={p.slug}
              data-word
              className="text-outline absolute bottom-[13vh] right-[-1vw] select-none whitespace-nowrap text-[16vw] font-bold leading-[0.8] tracking-[-0.03em]"
            >
              {p.season}
            </span>
          ))}
        </div>

        {/* 4 · Seasonal particles */}
        <SeasonParticles type={products[active].particles} density={0.9} className="z-[1]" />

        {/* 5 · The framed flacon */}
        <div className="absolute right-[6vw] top-1/2 z-[2] -translate-y-1/2 xl:right-[9vw]">
          <div data-enter-frame>
            <div data-frame className="relative aspect-[3/4] h-[min(68svh,46rem)]">
              <span aria-hidden="true" className="hairline absolute -inset-4 border" />
              <div className="relative h-full w-full overflow-hidden bg-navy/50 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]">
                {products.map((p, i) => (
                  <div key={p.slug} data-shot className="absolute inset-0">
                    <SmartImage
                      name={p.image}
                      alt={p.alt}
                      aria-hidden={i !== active}
                      sizes="(min-width: 1024px) 36vw, 50vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div aria-hidden="true" className="absolute -bottom-12 left-0 right-0 h-5 overflow-hidden">
                {products.map((p) => (
                  <p key={p.slug} data-caption className="label absolute inset-x-0 flex justify-between text-pearl/55">
                    <span>
                      N° {p.index} {p.name}
                    </span>
                    <span>Eau de Parfum</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6 · Copy */}
        <div className="container-luxe relative z-[3] flex h-full items-center">
          <div data-enter-text className="relative h-[min(30rem,60svh)] w-full max-w-[30rem] xl:max-w-[34rem]">
            {products.map((p, i) => (
              <SeasonalScene key={p.slug} product={p} active={active === i} total={COUNT} />
            ))}
          </div>
        </div>

        {/* Section title */}
        <div className="container-luxe pointer-events-none absolute inset-x-0 top-0 z-[3] flex items-start justify-between pt-28 [@media(max-height:760px)]:hidden">
          <h2 id="journey-title" className="label flex items-center gap-4 text-ice/80">
            <span aria-hidden="true" className="h-px w-10 bg-ice/50" />
            Four Seasons. One Journey.
          </h2>
          <p className="label hidden text-pearl/40 xl:block">Scroll to travel through the year</p>
        </div>

        {/* 7 · Season progress */}
        <nav aria-label="Seasons" className="container-luxe absolute inset-x-0 bottom-0 z-[3] pb-9">
          <ol className="grid max-w-[40rem] grid-cols-4 gap-6">
            {products.map((p, i) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={active === i ? 'step' : undefined}
                  className="group block w-full py-2 text-left"
                >
                  <span
                    className={`label flex items-center gap-3 transition-colors duration-700 ${
                      active === i ? 'text-pearl' : 'text-pearl/40 group-hover:text-pearl/75'
                    }`}
                  >
                    <span>{p.index}</span>
                    <span>{p.season}</span>
                  </span>
                  <span className="relative mt-3 block h-px w-full overflow-hidden bg-ice/15">
                    <span
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className="absolute inset-0 origin-left scale-x-0"
                      style={{ background: p.accent }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
