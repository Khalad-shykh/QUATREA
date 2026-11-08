import { forwardRef, useState } from 'react';
import { getImage } from '../../data/assets.js';

/**
 * Resolves an asset key to responsive sources, lazy-loads by default and
 * fades in once decoded so images never "pop" onto the dark canvas.
 * Callers size the image through its parent (aspect-ratio boxes), which
 * keeps layout stable while loading.
 */
const SmartImage = forwardRef(function SmartImage(
  { name, alt = '', sizes = '100vw', priority = false, className = '', ...rest },
  ref,
) {
  const { src, srcSet } = getImage(name);
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      aria-hidden={alt === '' ? true : undefined}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable="false"
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-1000 ease-luxe ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      {...rest}
    />
  );
});

export default SmartImage;
