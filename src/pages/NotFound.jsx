import Button from '../components/common/Button.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <section
      aria-labelledby="nf-title"
      className="relative flex min-h-[85svh] items-center overflow-hidden pb-20 pt-36"
    >
      <span
        aria-hidden="true"
        className="text-outline pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[34vw] font-bold leading-none"
      >
        404
      </span>
      <div className="container-luxe relative text-center">
        <p className="label text-mist">Page not found</p>
        <h1 id="nf-title" className="display-lg mx-auto mt-8 max-w-3xl text-pearl">
          This season has <em className="text-ice">not arrived yet.</em>
        </h1>
        <p className="body-copy mx-auto mt-8 max-w-md">
          The page you are looking for may have moved, or never existed. Let us take you somewhere
          more fragrant.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
          <Button to="/fragrances">Explore Collection</Button>
          <Button to="/" variant="ghost">
            Return Home
          </Button>
        </div>
      </div>
    </section>
  );
}
