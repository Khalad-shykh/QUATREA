/** Fragrance introduction — one editorial statement and its paragraph. */
export default function ProductIntro({ product }) {
  return (
    <section aria-label={`About ${product.name}`} className="relative py-24 md:py-36">
      <div className="container-luxe">
        <div className="mx-auto max-w-4xl text-center">
          <p data-reveal className="label mb-10 text-mist">
            The Fragrance
          </p>
          <p data-reveal="lines" className="display-md italic text-pearl">
            <span className="line-mask">
              <span className="line-inner">{product.intro.statement}</span>
            </span>
          </p>
          <span
            data-reveal="line"
            aria-hidden="true"
            className="mx-auto my-12 block h-px w-24"
            style={{ background: product.accent }}
          />
          <p data-reveal className="body-copy mx-auto max-w-2xl text-base md:text-[1.05rem] md:leading-[2]">
            {product.intro.body}
          </p>
        </div>
      </div>
    </section>
  );
}
