import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import Button from '../common/Button.jsx';
import SmartImage from '../common/SmartImage.jsx';
import SplitLines from '../common/SplitLines.jsx';
import { useGsap } from '../../hooks/useGsap.js';
import { EASE, gsap, prefersReducedMotion } from '../../animations/gsapAnimations.js';

/**
 * Cinematic opening. Choreography (seconds):
 *  0.00  background glow fades in        (nav enters 0.25–0.85, see Navbar)
 *  0.35  signature flacon rises out of the dark (scale + opacity)
 *  0.80  eyebrow, tracking settles
 *  0.95  heading, line by line
 *  1.45  supporting copy → CTAs → meta details
 * Then: a slow floating loop, pointer parallax, and a scroll-out parallax.
 */
export default function Hero() {
  const root = useRef(null);

  useGsap(
    () => {
      const q = gsap.utils.selector(root);

      if (prefersReducedMotion()) {
        gsap.set(q('[data-hero-fade]'), { autoAlpha: 1 });
        return undefined;
      }

      gsap
        .timeline({ defaults: { ease: EASE.reveal } })
        .fromTo(q('[data-hero-bg]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.8, ease: 'power2.out' }, 0)
        .fromTo(
          q('[data-hero-media]'),
          { autoAlpha: 0, scale: 1.16 },
          { autoAlpha: 1, scale: 1, duration: 3 },
          0.35,
        )
        .fromTo(
          q('[data-hero-eyebrow]'),
          { autoAlpha: 0, y: 14, letterSpacing: '0.62em' },
          { autoAlpha: 1, y: 0, letterSpacing: '0.32em', duration: 1.8 },
          0.8,
        )
        .fromTo(q('[data-hero-title] .line-inner'), { yPercent: 115 }, { yPercent: 0, duration: 1.5, stagger: 0.14 }, 0.95)
        .fromTo(q('[data-hero-copy]'), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1.3 }, 1.45)
        .fromTo(q('[data-hero-cta] > *'), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.12 }, 1.6)
        .fromTo(q('[data-hero-meta]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, stagger: 0.12 }, 1.95);

      // The flacon breathes: a slow, barely-there float.
      gsap.to(q('[data-hero-float]'), {
        y: -12,
        duration: 4.8,
        ease: EASE.float,
        yoyo: true,
        repeat: -1,
      });

      // Scroll-out: the image sinks and deepens while the copy lifts away.
      gsap.to(q('[data-hero-parallax]'), {
        yPercent: 14,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(q('[data-hero-content]'), {
        yPercent: -22,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '75% top', scrub: true },
      });

      // Gentle pointer parallax on precise pointers only.
      if (!window.matchMedia('(pointer: fine)').matches) return undefined;
      const layer = q('[data-hero-pointer]')[0];
      const xTo = gsap.quickTo(layer, 'x', { duration: 1.4, ease: 'power3.out' });
      const yTo = gsap.quickTo(layer, 'y', { duration: 1.4, ease: 'power3.out' });
      const onMove = (e) => {
        xTo((e.clientX / window.innerWidth - 0.5) * -22);
        yTo((e.clientY / window.innerHeight - 0.5) * -14);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      return () => window.removeEventListener('pointermove', onMove);
    },
    [],
    root,
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-midnight"
    >
      {/* Base atmosphere */}
      <div
        data-hero-bg
        data-hero-fade
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_45%,#0b3570_0%,#052659_22%,#021024_62%)]"
      />

      {/* Signature flacon — nested layers keep each motion independent */}
      <div data-hero-parallax className="absolute inset-x-0 top-0 bottom-[30%] sm:bottom-[24%] lg:bottom-0">
        <div data-hero-pointer className="absolute -inset-[3%]">
          <div data-hero-float className="absolute inset-0">
            <div data-hero-media data-hero-fade className="absolute inset-0">
              <SmartImage
                name="hero/signature"
                priority
                sizes="100vw"
                alt="The Quatréa signature flacon a faceted crystal bottle of pale ice-blue eau de parfum on a mirrored surface, lit in a midnight-blue studio."
                className="h-full w-full object-cover object-[66%_50%] lg:object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Light around the bottle + legibility gradients */}
      <div
        aria-hidden="true"
        className="animate-slow-pulse pointer-events-none absolute left-1/2 top-[34%] lg:left-[66%] lg:top-[46%] h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ice/10 mix-blend-screen blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/45 to-midnight/10 lg:bg-gradient-to-r lg:from-midnight lg:via-midnight/70 lg:to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-midnight to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-midnight/80 to-transparent" />

      {/* Copy */}
      <div className="container-luxe relative z-10 flex h-full items-end pb-16 sm:pb-24 lg:items-center lg:pb-0">
        <div data-hero-content className="max-w-[46rem] lg:pt-10">
          <p data-hero-eyebrow data-hero-fade className="label mb-6 text-ice/85 lg:mb-9">
            The Art of Seasonal Fragrance
          </p>
          <h1 id="hero-title" data-hero-title className="text-[clamp(2.35rem,5.6vw,6.1rem)] leading-[1.04] tracking-[-0.025em]">
            <SplitLines
              lines={[
                'Every Season Has',
                <em key="l2" className="text-ice">
                  Its Own Essence.
                </em>,
              ]}
              lineClassName="lg:whitespace-nowrap"
            />
          </h1>
          <p data-hero-copy data-hero-fade className="body-copy mt-6 max-w-[25rem] lg:mt-9">
            Four extraordinary fragrances. Four expressions of nature. Discover the art of capturing
            moments that never fade.
          </p>
          <div data-hero-cta className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-4 lg:mt-11">
            <Button to="/fragrances">Explore Collection</Button>
            <Button to="/about" variant="ghost">
              Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Meta details */}
      <div className="container-luxe pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden items-end justify-between pb-9 lg:flex">
        <div data-hero-meta data-hero-fade className="flex items-center gap-4 text-pearl/60">
          <span className="relative block h-12 w-px overflow-hidden bg-ice/15">
            <span className="animate-scroll-cue absolute inset-x-0 top-0 block h-1/2 bg-ice" />
          </span>
          <span className="label flex items-center gap-2">
            Scroll <ArrowDown aria-hidden="true" strokeWidth={1} className="h-3.5 w-3.5" />
          </span>
        </div>
        <p data-hero-meta data-hero-fade className="label text-right text-pearl/50">
          Spring · Summer · Autumn · Winter
          <span className="mt-1 block text-mist/70">Four Eaux de Parfum</span>
        </p>
      </div>
    </section>
  );
}
