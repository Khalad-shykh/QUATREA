import { useRef } from 'react';
import { Link } from 'react-router';
import Button from '../components/common/Button.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import SmartImage from '../components/common/SmartImage.jsx';
import SplitLines from '../components/common/SplitLines.jsx';
import { products } from '../data/products.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const PRINCIPLES = [
  {
    numeral: 'I',
    title: 'The Memory',
    text: 'Every composition begins with a moment rather than a material — a window opened in April, salt drying on warm skin, the first frost on a quiet street.',
  },
  {
    numeral: 'II',
    title: 'The Palette',
    text: 'Notes are chosen to translate what a season feels like: its light, its temperature, its texture. Petals for brightness, citrus for heat, resins for warmth, woods for stillness.',
  },
  {
    numeral: 'III',
    title: 'The Balance',
    text: 'Top, heart and base are arranged so each fragrance unfolds the way a day does — a bright opening, a full heart, and a trail that lingers long after.',
  },
  {
    numeral: 'IV',
    title: 'The Flacon',
    text: 'One bottle holds all four seasons. Its faceted crystal cap is set on its corner — four faces, four seasons — while the colour within tells you which one you are wearing.',
  },
];

export default function About() {
  const ref = useRef(null);
  useDocumentTitle('Our Story');
  useScrollReveal(ref);

  return (
    <div ref={ref}>
      {/* 1 · Opening */}
      <section aria-labelledby="about-title" className="relative overflow-hidden pb-24 pt-36 md:pb-36 md:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-20 h-[34rem] w-[34rem] rounded-full bg-navy/50 blur-[150px]"
        />
        <div className="container-luxe relative grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              as="h1"
              id="about-title"
              size="display-xl"
              eyebrow="Our Story"
              lines={['More Than', 'a Fragrance.', <em key="c">A Feeling.</em>]}
            />
            <p data-reveal className="body-copy mt-10 max-w-lg text-base md:text-[1.05rem] md:leading-[2]">
              Quatréa was imagined around a simple idea: that the seasons shape who we are as much as
              where we are. Each one carries its own light, its own pace, its own emotion — and each
              deserves a fragrance of its own.
            </p>
          </div>
          <figure className="lg:col-span-5">
            <div data-reveal="mask" className="relative aspect-[3/4] overflow-hidden bg-navy/30">
              <SmartImage
                name="branding/atelier"
                priority
                sizes="(min-width: 1024px) 38vw, 92vw"
                alt="An atelier still life: glass vials and a pipette beside a blossom sprig, a slice of citrus, a piece of amber resin and a frosted pine sprig."
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <figcaption data-reveal className="label mt-5 flex justify-between text-pearl/45">
              <span>The four seasons, in raw materials</span>
              <span>N° 00</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2 · Fragrance & memory */}
      <section aria-labelledby="memory-title" className="hairline border-t py-24 md:py-40">
        <div className="container-luxe">
          <p data-reveal className="label mb-10 text-center text-mist">
            Scent &amp; Memory
          </p>
          <h2 id="memory-title" data-reveal="lines" className="display-lg mx-auto max-w-5xl text-center italic text-pearl">
            <SplitLines
              lines={['A scent can return us to a moment', 'more vividly than any photograph.']}
              lineClassName="lg:whitespace-nowrap"
            />
          </h2>
          <span data-reveal="line" aria-hidden="true" className="mx-auto my-14 block h-px w-24 bg-ice/40" />
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:gap-14">
            <p data-reveal className="body-copy">
              Of all our senses, smell is the one most closely tied to memory and emotion. A single
              breath of cut grass, warm stone or woodsmoke can carry us back years — to a garden, a
              coastline, a winter evening we had almost forgotten.
            </p>
            <p data-reveal className="body-copy">
              Quatréa works with that quiet power. Our fragrances are not designed to describe a
              season, but to help you remember one — and to create new memories each time you wear
              them.
            </p>
          </div>
        </div>
      </section>

      {/* 3 · Why four seasons */}
      <section aria-labelledby="seasons-title" className="relative overflow-hidden bg-abyss/40 py-24 md:py-36">
        <div className="container-luxe">
          <div className="mb-16 grid gap-10 md:mb-20 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              id="seasons-title"
              className="lg:col-span-7"
              eyebrow="The Inspiration"
              lines={['Why Four', <em key="b">Seasons.</em>]}
            />
            <p data-reveal className="body-copy max-w-sm lg:col-span-4 lg:col-start-9 lg:pb-3">
              The year is the oldest story we know: renewal, warmth, reflection and stillness. Each
              chapter changes the air around us — and the way we want to feel within it.
            </p>
          </div>

          <ul data-reveal="stagger" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to={`/fragrance/${p.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-navy/30">
                    <SmartImage
                      name={p.background}
                      alt=""
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw"
                      className="absolute inset-0 h-full w-full object-cover object-[70%_50%] transition-transform duration-[1800ms] ease-luxe group-hover:scale-110"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6">
                      <p className="label flex items-center gap-3" style={{ color: p.accent }}>
                        <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45" style={{ background: p.accent }} />
                        {p.index} · {p.season}
                      </p>
                      <p className="mt-3 text-2xl italic text-pearl">{p.emotion}.</p>
                    </div>
                  </div>
                  <p className="body-copy mt-5 text-[0.875rem]">{p.tagline}</p>
                  <p className="label link-underline mt-3 text-pearl/70 group-hover:text-ice">{p.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · The art of composition */}
      <section aria-labelledby="craft-title" className="py-24 md:py-40">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="craft-title"
                eyebrow="The Art of Creation"
                lines={['The Art of', <em key="b">Composition.</em>]}
                description="A fragrance is built like a piece of music — in layers, in movements, in time. These are the principles behind every Quatréa composition."
              />
              <div data-reveal="mask" className="relative mt-12 hidden aspect-[4/3] overflow-hidden bg-navy/30 lg:block">
                <SmartImage
                  name="hero/signature"
                  sizes="38vw"
                  alt="The Quatréa signature flacon with its faceted crystal cap, lit in blue."
                  className="absolute inset-0 h-full w-full object-cover object-[66%_50%]"
                />
              </div>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {PRINCIPLES.map((item) => (
              <li key={item.numeral} data-reveal className="hairline grid grid-cols-[4rem_1fr] gap-6 border-t py-10 md:grid-cols-[6rem_1fr] md:py-14">
                <span aria-hidden="true" className="text-5xl italic leading-none text-ice/30 md:text-6xl">
                  {item.numeral}
                </span>
                <div>
                  <h3 className="text-2xl text-pearl md:text-[1.75rem]">{item.title}</h3>
                  <p className="body-copy mt-4">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · Timeless elegance */}
      <section aria-labelledby="philosophy-title" className="relative flex min-h-[90svh] items-end overflow-hidden py-24 md:items-center md:py-32">
        <div aria-hidden="true" className="absolute inset-0">
          <div data-parallax="8" className="absolute -inset-y-[12%] inset-x-0">
            <SmartImage name="branding/collection" alt="" sizes="100vw" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-midnight/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/20 to-midnight" />
        </div>
        <div className="container-luxe relative text-center">
          <p data-reveal className="label mb-10 text-ice/85">
            The Philosophy
          </p>
          <h2 id="philosophy-title" data-reveal="lines" className="display-lg mx-auto max-w-5xl text-pearl">
            <SplitLines lines={['Timeless elegance is not standing still.', <em key="b">It is knowing what endures.</em>]} />
          </h2>
          <p data-reveal className="body-copy mx-auto mt-10 max-w-xl text-pearl/80">
            Seasons pass; the feeling of them stays. We create fragrances to be worn for years, not
            moments — refined, quiet and entirely personal.
          </p>
          <div data-reveal className="mt-12 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
            <Button to="/fragrances">Discover the Collection</Button>
            <Button to="/contact" variant="ghost">
              Contact the Atelier
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
