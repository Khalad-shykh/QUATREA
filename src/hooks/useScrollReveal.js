import { initScrollReveals } from '../animations/gsapAnimations.js';
import { useGsap } from './useGsap.js';

/** Wire up every `data-reveal` / `data-parallax` element inside `scopeRef`. */
export function useScrollReveal(scopeRef, deps = []) {
  useGsap(() => initScrollReveals(scopeRef.current), deps, scopeRef);
}
