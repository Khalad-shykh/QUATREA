import SectionHeading from '../common/SectionHeading.jsx';
import { SIZES } from '../../data/products.js';

/** Product details as a quiet definition list. */
export default function ProductSpecs({ product }) {
  const rows = [
    { term: 'Concentration', value: product.details.concentration },
    { term: 'Fragrance Family', value: product.family },
    { term: 'Character', value: product.details.character },
    { term: 'Season', value: product.season },
    { term: 'Best Worn', value: product.details.moment },
    { term: 'Longevity', value: product.details.longevity },
    { term: 'Sillage', value: product.details.sillage },
    { term: 'Sizes', value: SIZES.map((s) => `${s} ml`).join(' · ') },
  ];

  return (
    <section aria-labelledby="details-title" className="relative py-24 md:py-36">
      <div className="container-luxe grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="details-title"
            eyebrow="Product Details"
            size="display-md"
            lines={['The', <em key="b">Details.</em>]}
          />
          <p data-reveal className="body-copy mt-8 max-w-xs text-[0.875rem]">
            Apply to pulse points the wrists, the base of the throat, behind the ears and let the
            fragrance settle rather than rubbing it in.
          </p>
        </div>

        <dl data-reveal="stagger" className="grid gap-x-14 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {rows.map((row) => (
            <div key={row.term} className="hairline border-b py-6">
              <dt className="label text-mist">{row.term}</dt>
              <dd className="mt-2.5 text-lg leading-snug text-pearl">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
