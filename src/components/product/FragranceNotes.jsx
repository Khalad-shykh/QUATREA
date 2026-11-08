import SectionHeading from '../common/SectionHeading.jsx';
import { NOTE_TIERS } from '../../data/products.js';

/**
 * Top · Heart · Base as an editorial triptych. Read left to right it is also
 * a timeline: how the fragrance evolves on the skin.
 */
export default function FragranceNotes({ product }) {
  return (
    <section aria-labelledby="notes-title" className="relative overflow-hidden bg-abyss/40 py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full blur-[150px]"
        style={{ background: `${product.accent}14` }}
      />
      <div className="container-luxe relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="notes-title"
            className="lg:col-span-7"
            eyebrow="Fragrance Notes"
            lines={['The Anatomy', <em key="b">of a Season.</em>]}
          />
          <p data-reveal className="body-copy max-w-sm lg:col-span-4 lg:col-start-9 lg:pb-3">
            Like the season that inspired it, {product.name} unfolds over time — from a bright first
            impression to the memory it leaves behind.
          </p>
        </div>

        <div className="relative mt-16 md:mt-24">
          <span data-reveal="line" aria-hidden="true" className="absolute inset-x-0 top-0 block h-px bg-ice/20" />
          <ol data-reveal="stagger" className="grid md:grid-cols-3">
            {NOTE_TIERS.map((tier, i) => (
              <li
                key={tier.key}
                className={`hairline relative border-b py-10 md:border-b-0 md:py-14 ${
                  i > 0 ? 'md:border-l md:pl-10 lg:pl-14' : ''
                } ${i < 2 ? 'md:pr-10 lg:pr-14' : ''}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-[3px] left-0 hidden h-1.5 w-1.5 rotate-45 md:block"
                  style={{ background: product.accent, left: i > 0 ? '-3px' : '0' }}
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 md:flex-col md:items-start md:gap-3 lg:flex-row lg:items-baseline lg:justify-between lg:gap-4">
                  <span aria-hidden="true" className="text-6xl italic leading-none text-ice/25 md:text-7xl">
                    {tier.numeral}
                  </span>
                  <span className="label text-mist">{tier.caption}</span>
                </div>
                <h3 className="label mt-10 text-pearl">{tier.title}</h3>
                <ul className="mt-6 space-y-3">
                  {product.notes[tier.key].map((note) => (
                    <li key={note} className="text-2xl leading-snug text-pearl md:text-[1.65rem]">
                      {note}
                    </li>
                  ))}
                </ul>
                <p className="body-copy mt-8 text-[0.875rem]">{tier.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
