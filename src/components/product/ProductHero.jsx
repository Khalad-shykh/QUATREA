import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Check } from 'lucide-react';
import Button from '../common/Button.jsx';
import SmartImage from '../common/SmartImage.jsx';
import SplitLines from '../common/SplitLines.jsx';
import { useBag } from '../../context/BagContext.jsx';
import { DEFAULT_SIZE, SIZES, formatPrice } from '../../data/products.js';
import { useGsap } from '../../hooks/useGsap.js';
import { EASE, gsap, prefersReducedMotion } from '../../animations/gsapAnimations.js';

export default function ProductHero({ product }) {
  const root = useRef(null);
  const { add, open } = useBag();
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const t = setTimeout(() => setAdded(false), 3200);
    return () => clearTimeout(t);
  }, [added]);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ delay: 0.45, defaults: { ease: EASE.reveal } })
        .fromTo(
          q('[data-ph-frame]'),
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.inOut' },
          0,
        )
        .fromTo(q('[data-ph-img]'), { scale: 1.3 }, { scale: 1, duration: 2.4 }, 0)
        .fromTo(q('[data-ph-title] .line-inner'), { yPercent: 115 }, { yPercent: 0, duration: 1.4, stagger: 0.1 }, 0.55)
        .fromTo(q('[data-ph-item]'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.07 }, 0.75)
        .fromTo(q('[data-ph-aside]'), { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, duration: 1.6 }, 1);

      gsap.to(q('[data-ph-parallax]'), {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    [product.slug],
    root,
  );

  const handleAdd = () => {
    add(product.slug, size);
    setAdded(true);
  };

  return (
    <section
      ref={root}
      aria-labelledby="product-title"
      className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36"
    >
      {/* Seasonal atmosphere */}
      <div aria-hidden="true" className="absolute inset-0">
        <SmartImage name={product.background} alt="" priority sizes="100vw" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/85 to-midnight" />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(40% 50% at 30% 45%, ${product.accent}26 0%, transparent 70%)` }}
        />
      </div>

      <div className="container-luxe relative grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Imagery */}
        <div className="relative lg:col-span-6 xl:col-span-7">
          <div className="relative mx-auto w-full max-w-[34rem] lg:mx-0 lg:ml-auto lg:mr-8">
            <div
              data-ph-frame
              className="relative aspect-[3/4] overflow-hidden bg-navy/40 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]"
            >
              <div data-ph-parallax className="absolute -inset-y-[6%] inset-x-0">
                <SmartImage
                  data-ph-img
                  name={product.image}
                  alt={product.alt}
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <span aria-hidden="true" className="hairline pointer-events-none absolute -inset-4 border" />

            {/* Editorial details around the frame */}
            <p
              data-ph-aside
              className="label absolute -left-3 top-1/2 hidden origin-center -translate-x-full -translate-y-1/2 -rotate-90 whitespace-nowrap text-pearl/45 xl:block"
            >
              N° {product.index} Eau de Parfum
            </p>
            <div
              data-ph-aside
              aria-hidden="true"
              className="absolute -bottom-10 -right-6 hidden aspect-square w-36 overflow-hidden border-[6px] border-midnight shadow-2xl md:block xl:-right-16 xl:w-44"
            >
              <SmartImage name={product.background} alt="" sizes="180px" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Purchase panel */}
        <div className="lg:col-span-6 xl:col-span-5">
          <nav data-ph-item aria-label="Breadcrumb">
            <ol className="label flex items-center gap-3 text-pearl/45">
              <li>
                <Link to="/fragrances" className="link-underline hover:text-pearl">
                  Fragrances
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-pearl/75">
                {product.name}
              </li>
            </ol>
          </nav>

          <p data-ph-item className="label mt-10 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10" style={{ background: product.accent }} />
            <span className="text-pearl/70">{product.index}</span>
            <span style={{ color: product.accent }}>{product.season}</span>
          </p>

          <h1 id="product-title" data-ph-title className="display-lg mt-6 text-pearl">
            <SplitLines lines={[product.name]} />
          </h1>
          <p data-ph-item className="mt-5 text-xl italic text-ice md:text-2xl">
            {product.tagline}
          </p>
          <p data-ph-item className="body-copy mt-6 max-w-md">
            {product.short}
          </p>

          <dl data-ph-item className="hairline mt-9 grid grid-cols-2 gap-6 border-y py-6">
            <div>
              <dt className="label text-mist">Fragrance Family</dt>
              <dd className="mt-2 text-pearl">{product.family}</dd>
            </div>
            <div>
              <dt className="label text-mist">Price</dt>
              <dd className="mt-2 text-pearl">
                <span className="text-2xl">{formatPrice(product.prices[size])}</span>
                <span className="ml-2 text-sm text-pearl/55">/ {size} ml</span>
              </dd>
            </div>
          </dl>

          <fieldset data-ph-item className="mt-8">
            <legend className="label mb-4 text-mist">Size</legend>
            <div className="grid grid-cols-3 gap-3 sm:max-w-sm">
              {SIZES.map((s) => {
                const selected = size === s;
                return (
                  <label
                    key={s}
                    className={`relative cursor-pointer border px-3 py-3.5 text-center transition-colors duration-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-ice ${
                      selected ? 'border-ice bg-ice/[0.06] text-pearl' : 'border-ice/20 text-pearl/60 hover:border-ice/50 hover:text-pearl'
                    }`}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={s}
                      checked={selected}
                      onChange={() => setSize(s)}
                      className="sr-only"
                    />
                    <span className="block text-[0.95rem]">{s} ml</span>
                    <span className="label mt-1 block text-[0.6rem] text-mist">
                      {formatPrice(product.prices[s])}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div data-ph-item className="mt-9 flex flex-col gap-4 sm:max-w-sm">
            <Button type="button" onClick={handleAdd} arrow={!added} className="w-full">
              {added ? (
                <>
                  <Check aria-hidden="true" strokeWidth={1.3} className="h-4 w-4" /> Added to Bag
                </>
              ) : (
                'Add to Bag'
              )}
            </Button>
            <p aria-live="polite" className="min-h-[1.5rem] text-sm text-pearl/60">
              {added && (
                <>
                  {product.name}, {size} ml added.{' '}
                  <button type="button" onClick={open} className="link-underline text-ice">
                    View bag
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
