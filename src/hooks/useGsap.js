import { useEffect, useLayoutEffect } from 'react';
import { gsap } from '../animations/gsapAnimations.js';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Run GSAP code inside a gsap.context scoped to `scopeRef`.
 * Every tween and ScrollTrigger created in `callback` is reverted on
 * unmount (or when deps change) — no leaked triggers between routes.
 */
export function useGsap(callback, deps = [], scopeRef) {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(callback, scopeRef?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
