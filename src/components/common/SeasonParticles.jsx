import { useEffect, useRef } from 'react';
import { ParticleField } from '../../animations/particles.js';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery.js';

/**
 * Canvas layer of seasonal particles. Pauses automatically when off-screen
 * or when the tab is hidden, and renders nothing for reduced-motion users.
 */
export default function SeasonParticles({ type, density = 1, className = '' }) {
  const canvasRef = useRef(null);
  const fieldRef = useRef(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce || !canvasRef.current) return undefined;
    const canvas = canvasRef.current;
    const field = new ParticleField(canvas, { density });
    fieldRef.current = field;
    let visible = false;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) field.start();
      else field.stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden || !visible ? field.stop() : field.start());
    const ro = new ResizeObserver(() => field.resize());
    ro.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      field.destroy();
      fieldRef.current = null;
    };
  }, [reduce, density]);

  useEffect(() => {
    fieldRef.current?.setType(type);
  }, [type, reduce, density]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
