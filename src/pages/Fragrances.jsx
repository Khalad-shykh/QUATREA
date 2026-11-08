import { useRef } from 'react';
import { Link } from 'react-router';
import Button from '../components/common/Button.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import SmartImage from '../components/common/SmartImage.jsx';
import SplitLines from '../components/common/SplitLines.jsx';
import { formatPrice, fromPrice, products } from '../data/products.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function Fragrances() {
  const ref = useRef(null);
  useDocumentTitle('The Collection');
  useScrollReveal(ref);

  const jump = (e, slug) => {
    e.preventDefault();
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={ref}>
      {/* Header */}
      <section aria-labelledby="fragrances-title" className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-20 h-[36rem] w-[36rem] rounded-full bg-navy/50 blur-[150px]"
        />
        <div className="container-luxe relative grid gap-12 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            as="h1"
            id="fragrances-title"
            size="display-xl"
            className="lg:col-span-8"
            eyebrow="The Collection"
            lines={['One House.', <em key="b">Four Seasons.</em>]}
          />
          <div className="lg:col-span-4 lg:pb-4">
            <p data-reveal className="body-copy max-w-sm">
              Four eaux de parfum, one flacon. Each fragrance translates the light, temperature and
              mood of a season into a scent you can wear.
            </p>
            <ol data-reveal="stagger" className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`#${p.slug}`}
                    onClick={(e) => jump(e, p.slug)}
                    className="group label flex items-center gap-3 py-1 text-pearl/60 transition-colors hover:text-pearl"
                  >
                    <span className="text-mist/70">{p.index}</span>
                    <span className="link-underline">{p.season}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="container-luxe relative mt-16 md:mt-24">
          <div data-reveal="mask" className="relative aspect-[4/3] overflow-hidden bg-navy/30 sm:aspect-[16/9] lg:aspect-[21/9]">
            <SmartImage
              name="branding/collection"
              priority
              sizes="(min-width: 1536px) 1400px, 92vw"
              alt="The four Quatréa eaux de parfum side by side — blush, gold, amber and silver-blue liquids in the same crystal flacon."
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Editorial rows */}
      {products.map((product, i) => (
        <CollectionRow key={product.slug} product={product} reverse={i % 2 === 1} />
      ))}

      {/* Advice */}
      <section className="hairline border-t py-24 md:py-32">
        <div className="container-luxe text-center">
          <SectionHeading
            align="center"
            eyebrow="Fragrance Advice"
            size="display-md"
            lines={['Not sure which season', <em key="b">is yours?</em>]}
            description="Tell us about the moments you love and we will suggest the fragrance that fits them."
          />
          <div data-reveal className="mt-10">
            <Button to="/contact">Ask the Atelier</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CollectionRow({ product, reverse }) {
  return (
    <article
      id={product.slug}
      aria-labelledby={`${product.slug}-title`}
      className="hairline relative scroll-mt-20 overflow-hidden border-t py-20 md:py-32"
    >
      <span
        aria-hidden="true"
        data-parallax="14"
        className={`text-outline pointer-events-none absolute top-[2%] select-none whitespace-nowrap text-[15vw] font-bold leading-none ${
          reverse ? '-left-[1vw]' : '-right-[1vw]'
        }`}
      >
        {product.season}
      </span>

      <div className="container-luxe relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-6 ${reverse ? 'lg:order-2 lg:col-start-7' : ''}`}>
          <Link
            to={`/fragrance/${product.slug}`}
            data-reveal="mask"
            aria-label={`Explore ${product.name}`}
            className={`group relative block aspect-[3/4] w-full max-w-[34rem] overflow-hidden bg-navy/30 ${
              reverse ? 'lg:ml-auto' : ''
            }`}
          >
            <div data-parallax="6" className="absolute -inset-y-[8%] inset-x-0">
              <SmartImage
                name={product.image}
                alt={product.alt}
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="h-full w-full object-cover transition-transform duration-[1800ms] ease-luxe group-hover:scale-105"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-1000 ease-luxe group-hover:scale-x-100"
              style={{ background: product.accent }}
            />
          </Link>
        </div>

        <div className={`lg:col-span-5 ${reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
          <p data-reveal className="label flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10" style={{ background: product.accent }} />
            <span className="text-pearl/70">{product.index}</span>
            <span style={{ color: product.accent }}>{product.season}</span>
          </p>
          <h2 id={`${product.slug}-title`} data-reveal="lines" className="display-lg mt-7 text-pearl">
            <SplitLines lines={[product.name]} />
          </h2>
          <p data-reveal className="mt-5 text-xl italic text-ice">
            {product.tagline}
          </p>
          <p data-reveal className="body-copy mt-6 max-w-md">
            {product.short}
          </p>
          <dl data-reveal className="hairline mt-9 grid max-w-md grid-cols-2 gap-6 border-t pt-6">
            <div>
              <dt className="label text-mist">Family</dt>
              <dd className="mt-2 text-pearl">{product.family}</dd>
            </div>
            <div>
              <dt className="label text-mist">From</dt>
              <dd className="mt-2 text-pearl">{formatPrice(fromPrice(product))}</dd>
            </div>
          </dl>
          <div data-reveal className="mt-10">
            <Button to={`/fragrance/${product.slug}`}>Explore Fragrance</Button>
          </div>
        </div>
      </div>
    </article>
  );
}
