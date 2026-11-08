import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Motion language
 * ----------------
 * One family of easings and durations shared by every animation so the
 * site moves with a single, consistent rhythm: long, decelerating
 * reveals (expo/power3 out) and calm, symmetrical scene changes (power2.inOut).
 */
export const EASE = {
  reveal: 'expo.out',
  soft: 'power3.out',
  scene: 'power2.inOut',
  float: 'sine.inOut',
};

export const DURATION = {
  fast: 0.6,
  base: 1.1,
  slow: 1.6,
};

gsap.defaults({ ease: EASE.soft, duration: DURATION.base });

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Reveal masked lines (`.line-mask > .line-inner`) from below. */
export function revealLines(lines, vars = {}) {
  return gsap.fromTo(
    lines,
    { yPercent: 115 },
    { yPercent: 0, duration: 1.3, ease: EASE.reveal, stagger: 0.12, ...vars },
  );
}

/**
 * Declarative scroll reveals. Inside `scope`, any element with:
 *  - data-reveal            fades & rises in
 *  - data-reveal="lines"    reveals its `.line-inner` children line by line
 *  - data-reveal="mask"     un-masks (clip-path) and settles its first <img>
 *  - data-reveal="stagger"  fades & rises its direct children in sequence
 *  - data-reveal="line"     draws a hairline across (scaleX)
 *  - data-parallax="12"     drifts vertically by ±12% while scrolling
 * Reveals animate opacity (not visibility) so links stay keyboard-focusable
 * before they are revealed; focusing one scrolls it into view and plays it.
 * Call inside a gsap.context so everything is cleaned up on unmount.
 */
export function initScrollReveals(scope) {
  if (!(scope instanceof Element)) return;
  const root = scope;
  const reduce = prefersReducedMotion();
  const q = (sel) => Array.from(root.querySelectorAll(sel));

  q('[data-reveal]').forEach((el) => {
    const type = el.dataset.reveal;
    const start = el.dataset.revealStart || 'top 86%';
    const scrollTrigger = { trigger: el, start, once: true };

    if (reduce) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    if (type === 'lines') {
      const lines = el.querySelectorAll('.line-inner');
      gsap.set(el, { autoAlpha: 1 });
      revealLines(lines, { scrollTrigger });
    } else if (type === 'mask') {
      const media = el.querySelector('img, [data-mask-media]');
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', scrollTrigger },
      );
      if (media) {
        gsap.fromTo(
          media,
          { scale: 1.25 },
          { scale: 1, duration: 2.2, ease: EASE.reveal, scrollTrigger },
        );
      }
    } else if (type === 'line') {
      gsap.fromTo(
        el,
        { scaleX: 0, autoAlpha: 1, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.8, ease: 'expo.inOut', scrollTrigger },
      );
    } else if (type === 'stagger') {
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: EASE.soft, scrollTrigger },
      );
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.3, ease: EASE.soft, scrollTrigger },
      );
    }
  });

  if (reduce) return;

  q('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax) || 10;
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

export { gsap, ScrollTrigger };
