import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '../animations/gsapAnimations.js';

/**
 * Report scroll progress (0 → 1) of a target — or of the whole page when no
 * target is given — to `onProgress`, without causing React re-renders.
 * Ideal for driving styles directly through refs (progress bars, indicators).
 */
export function useScrollProgress(onProgress, { targetRef, start = 'top top', end = 'bottom bottom', deps = [] } = {}) {
  const callback = useRef(onProgress);
  callback.current = onProgress;

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: targetRef?.current ?? document.documentElement,
      start: targetRef ? start : 0,
      end: targetRef ? end : 'max',
      onUpdate: (self) => callback.current(self.progress, self),
      onRefresh: (self) => callback.current(self.progress, self),
    });
    return () => trigger.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
