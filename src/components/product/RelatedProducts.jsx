import Button from '../common/Button.jsx';
import ProductCard from '../common/ProductCard.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { getRelated } from '../../data/products.js';

/** The three other seasons, to continue the journey. */
export default function RelatedProducts({ product }) {
  const related = getRelated(product.slug);

  return (
    <section aria-labelledby="related-title" className="hairline relative border-t bg-abyss/40 py-24 md:py-32">
      <div className="container-luxe">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
          <SectionHeading
            id="related-title"
            eyebrow="Continue the Journey"
            size="display-md"
            lines={['The Other', <em key="b">Seasons.</em>]}
          />
          <div data-reveal>
            <Button to="/fragrances" variant="ghost">
              All fragrances
            </Button>
          </div>
        </div>

        <div data-reveal="stagger" className="grid gap-x-6 gap-y-14 sm:grid-cols-3 lg:gap-x-10">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} variant="compact" sizes="(min-width: 640px) 33vw, 100vw" />
          ))}
        </div>
      </div>
    </section>
  );
}
