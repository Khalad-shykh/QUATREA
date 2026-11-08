import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useBag } from '../../context/BagContext.jsx';
import { formatPrice, getProduct } from '../../data/products.js';
import SmartImage from '../common/SmartImage.jsx';

const EASE = [0.22, 1, 0.36, 1];

/** Slide-in bag panel. Checkout is intentionally disabled (front-end demo). */
export default function BagDrawer() {
  const { items, isOpen, close, remove } = useBag();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  const lines = items
    .map((item) => ({ ...item, product: getProduct(item.slug) }))
    .filter((line) => line.product);
  const subtotal = lines.reduce((sum, l) => sum + l.product.prices[l.size] * l.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Close bag"
            className="absolute inset-0 h-full w-full cursor-default bg-abyss/70 backdrop-blur-[2px]"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
            className="hairline absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l bg-midnight"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="hairline flex items-center justify-between border-b px-7 py-6">
              <h2 id="bag-title" className="label text-pearl">
                Your Bag <span className="text-mist">({lines.reduce((n, l) => n + l.qty, 0)})</span>
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="-mr-2 flex h-10 w-10 items-center justify-center text-pearl/80 hover:text-ice"
                aria-label="Close bag"
              >
                <X aria-hidden="true" strokeWidth={1.1} className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
                <p className="text-2xl italic text-pearl/90">Your bag is empty.</p>
                <p className="body-copy mt-3 text-sm">Discover a season that feels like you.</p>
                <Link to="/fragrances" onClick={close} className="label link-underline mt-8 text-ice">
                  Explore the collection
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ice/10 overflow-y-auto px-7">
                  {lines.map(({ product, size, qty }) => (
                    <li key={`${product.slug}-${size}`} className="flex gap-5 py-6">
                      <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-navy/40">
                        <SmartImage
                          name={product.image}
                          alt=""
                          sizes="80px"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="label text-mist">{product.season}</p>
                        <p className="mt-1 text-lg text-pearl">{product.name}</p>
                        <p className="mt-1 text-sm text-pearl/60">
                          {size} ml · Qty {qty}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <span className="text-sm text-pearl">
                            {formatPrice(product.prices[size] * qty)}
                          </span>
                          <button
                            type="button"
                            onClick={() => remove(product.slug, size)}
                            className="label link-underline text-[0.6rem] text-pearl/50 hover:text-pearl"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="hairline border-t px-7 py-7">
                  <div className="flex items-baseline justify-between">
                    <span className="label text-mist">Subtotal</span>
                    <span className="text-xl text-pearl">{formatPrice(subtotal)}</span>
                  </div>
                  <button
                    type="button"
                    disabled
                    className="label mt-6 w-full border border-ice/30 py-4 text-pearl/50"
                  >
                    Checkout unavailable
                  </button>
                  <p className="mt-4 text-center text-xs leading-relaxed text-pearl/45">
                    Portfolio demonstration no orders are placed and no payment is taken.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
