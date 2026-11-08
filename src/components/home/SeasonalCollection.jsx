import { useRef } from 'react';
import Button from '../common/Button.jsx';
import ProductCard from '../common/ProductCard.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { products } from '../../data/products.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

/**
 * The four signature fragrances as an editorial sequence rather than a
 * shop grid: alternating vertical offsets, generous gutters, and the
 * photography doing the talking.
 */
export default function SeasonalCollection() {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      aria-labelledby="collection-title"
      className="relative overflow-hidden bg-midnight pb-28 pt-24 md:pb-44 md:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 h-[34rem] w-[34rem] rounded-full bg-navy/45 blur-[140px]"
      />

      <div className="container-luxe relative">
        <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="collection-title"
            className="lg:col-span-7"
            eyebrow="The Collection"
            lines={['Four Seasons.', <em key="b">Four Essences.</em>]}
          />
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-3">
            <p data-reveal className="body-copy max-w-sm">
              Discover four distinctive fragrances inspired by the beauty and character of
              nature&rsquo;s changing seasons.
            </p>
            <div data-reveal className="mt-7">
              <Button to="/fragrances" variant="ghost">
                View all fragrances
              </Button>
            </div>
          </div>
        </div>

        <div
          data-reveal="stagger"
          className="grid gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:pb-24"
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              className={i % 2 === 1 ? 'sm:mt-20 lg:mt-28' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
