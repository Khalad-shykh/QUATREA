import Button from '../common/Button.jsx';
import SplitLines from '../common/SplitLines.jsx';

/**
 * The copy for one season inside the scrollytelling stage. All four scenes
 * are stacked; the scroll timeline swaps them line by line. Inactive scenes
 * are hidden from assistive tech and the tab order.
 */
export default function SeasonalScene({ product, active, total }) {
  return (
    <article
      data-scene
      aria-hidden={!active}
      inert={!active ? true : undefined}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
    >
      <p data-scene-item className="label flex items-center gap-4 text-pearl/80">
        <span aria-hidden="true" className="h-px w-10" style={{ background: product.accent }} />
        <span>
          {product.index} <span className="text-pearl/40">/ 0{total}</span>
        </span>
        <span style={{ color: product.accent }}>{product.season}</span>
      </p>

      <h3 className="mt-7 text-[clamp(2.2rem,3.7vw,4rem)] leading-[1.08] tracking-[-0.02em] text-pearl">
        <SplitLines lines={product.scene.lines} lineClassName="whitespace-nowrap" />
      </h3>

      <p data-scene-item className="body-copy mt-7 max-w-[25rem]">
        {product.scene.description}
      </p>

      <div data-scene-item className="hairline mt-8 flex max-w-[25rem] items-baseline justify-between border-t pt-5">
        <span className="text-xl italic text-ice">{product.name}</span>
        <span className="label text-mist">{product.family}</span>
      </div>

      <div data-scene-item className="mt-8">
        <Button to={`/fragrance/${product.slug}`} variant="ghost" tabIndex={active ? 0 : -1}>
          Discover the fragrance
        </Button>
      </div>
    </article>
  );
}
