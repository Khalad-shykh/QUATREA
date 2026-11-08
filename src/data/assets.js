import { IMAGE_SOURCES } from './imageSources.js';
import { localImages } from './localImages.js';

/**
 * Resolve an image key (e.g. "products/spring") to `{ src, srcSet }`.
 * Prefers the responsive local WebP files written by `npm run assets`;
 * falls back to the CDN original when they don't exist yet.
 */
export function getImage(key) {
  const variants = localImages[key];

  if (variants?.length) {
    const sorted = [...variants].sort((a, b) => a.width - b.width);
    return {
      src: sorted[sorted.length - 1].url,
      srcSet: sorted.map((v) => `${v.url} ${v.width}w`).join(', '),
    };
  }

  return { src: IMAGE_SOURCES[key], srcSet: undefined };
}
