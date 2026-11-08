import SmartImage from '../common/SmartImage.jsx';
import SplitLines from '../common/SplitLines.jsx';

/** Seasonal storytelling over the season's atmospheric photograph. */
export default function ProductStory({ product }) {
  const { story } = product;
  return (
    <section
      aria-labelledby="story-title"
      className="relative flex min-h-[92svh] items-center overflow-hidden py-28 md:py-36"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div data-parallax="8" className="absolute -inset-y-[12%] inset-x-0">
          <SmartImage name={product.background} alt="" sizes="100vw" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-midnight/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/75 to-midnight/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" />
      </div>

      <div className="container-luxe relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p data-reveal className="label flex items-center gap-4 text-ice/85">
            <span aria-hidden="true" className="h-px w-10" style={{ background: product.accent }} />
            {story.eyebrow}
          </p>
          <h2 id="story-title" data-reveal="lines" className="display-lg mt-8 text-pearl">
            <SplitLines lines={[story.title]} />
          </h2>
          <div className="mt-10 max-w-lg space-y-6">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} data-reveal className="body-copy text-pearl/80">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <figure data-reveal className="self-end lg:col-span-5 lg:col-start-8">
          <blockquote className="text-[clamp(1.6rem,2.6vw,2.5rem)] italic leading-[1.3] text-ice">
            &ldquo;{story.quote}&rdquo;
          </blockquote>
          <figcaption className="label mt-8 flex items-center gap-4 text-mist">
            <span aria-hidden="true" className="h-px w-8 bg-mist/60" />
            {product.name} · {product.season}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
