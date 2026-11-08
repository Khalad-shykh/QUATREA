import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import SmartImage from './SmartImage.jsx';
import { formatPrice, fromPrice } from '../../data/products.js';

/**
 * Editorial product card. The whole card is one link to the detail page.
 * Hover: the photograph slowly scales, the season label opens its tracking,
 * a hairline in the season's accent draws across, and the card gains depth.
 */
export default function ProductCard({ product, variant = 'editorial', sizes, className = '' }) {
  const compact = variant === 'compact';

  return (
    <article className={`group relative ${className}`} style={{ '--accent': product.accent }}>
      <Link
        to={`/fragrance/${product.slug}`}
        className="block outline-offset-8"
        aria-label={`${product.name} — ${product.season} fragrance, from ${formatPrice(fromPrice(product))}. Explore fragrance`}
      >
        <div
          className={`relative overflow-hidden bg-navy/30 transition-[transform,box-shadow] duration-1000 ease-luxe group-hover:-translate-y-1.5 group-hover:shadow-[0_45px_70px_-35px_rgba(0,0,0,0.9)] ${
            compact ? 'aspect-[4/5]' : 'aspect-[3/4]'
          }`}
        >
          <SmartImage
            name={product.image}
            alt={product.alt}
            sizes={sizes ?? '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
            className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1800ms] ease-luxe group-hover:scale-[1.07] group-hover:brightness-110"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/10 to-midnight/30"
          />

          {/* Index + season label */}
          <div className="absolute inset-x-5 top-5 flex items-start justify-between">
            <span className="label text-pearl/70">{product.index}</span>
            <span className="label flex items-center gap-2.5 text-pearl transition-[letter-spacing] duration-1000 ease-luxe group-hover:tracking-[0.46em]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45" style={{ background: product.accent }} />
              {product.season}
            </span>
          </div>

          {/* Bottom: family, reveals upward on hover */}
          {!compact && (
            <div className="absolute inset-x-5 bottom-5 overflow-hidden">
              <p className="label translate-y-full text-pearl/80 opacity-0 transition-all duration-700 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
                {product.personality.join(' · ')}
              </p>
            </div>
          )}

          {/* Accent hairline */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-1000 ease-luxe group-hover:scale-x-100"
            style={{ background: product.accent }}
          />
        </div>

        <div className={compact ? 'pt-5' : 'pt-7'}>
          <div className="flex items-baseline justify-between gap-4">
            <h3
              className={`text-pearl transition-colors duration-700 group-hover:text-ice ${
                compact ? 'text-xl' : 'text-[1.6rem] leading-tight'
              }`}
            >
              {product.name}
            </h3>
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1}
              className="h-5 w-5 shrink-0 text-mist transition-transform duration-700 ease-luxe group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ice"
            />
          </div>
          <p className="label mt-3 text-mist">{product.family}</p>

          {!compact && (
            <p className="body-copy mt-4 text-[0.875rem] leading-[1.8] text-pearl/60 transition-colors duration-700 group-hover:text-pearl/80">
              {product.short}
            </p>
          )}

          <div className={`hairline flex items-center justify-between border-t ${compact ? 'mt-4 pt-3' : 'mt-6 pt-4'}`}>
            <span className="text-sm text-pearl/80">
              <span className="label mr-2 text-mist/80">From</span>
              {formatPrice(fromPrice(product))}
            </span>
            {!compact && (
              <span className="label link-underline text-pearl/80 group-hover:text-ice">Explore</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
