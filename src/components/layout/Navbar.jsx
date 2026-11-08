import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { useBag } from '../../context/BagContext.jsx';
import { products } from '../../data/products.js';
import { ScrollTrigger } from '../../animations/gsapAnimations.js';
import { useScrollProgress } from '../../hooks/useScrollProgress.js';

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/fragrances', label: 'Fragrances' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
];

const EASE = [0.22, 1, 0.36, 1];

/** Staggered entrance used once, on the first load of the site. */
const intro = (delay) => ({
  initial: { opacity: 0, y: -14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: EASE, delay },
});

export default function Navbar() {
  const { pathname } = useLocation();
  const { count, open: openBag } = useBag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progressRef = useRef(null);
  const toggleRef = useRef(null);

  // Solid backdrop after the first scroll; hide on scroll down, reveal on scroll up.
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        setScrolled(y > 40);
        setHidden(self.direction === 1 && y > 220);
      },
    });
    return () => trigger.kill();
  }, []);

  // Page progress hairline, written straight to the DOM (no re-render).
  useScrollProgress(
    (progress) => {
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    },
    { deps: [pathname] },
  );

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setHidden(false);
  }, [pathname]);

  // Lock scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      toggleRef.current?.focus();
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-luxe ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        } ${solid ? 'hairline border-b bg-midnight/80 backdrop-blur-md' : 'border-b border-transparent bg-transparent'}`}
      >
        <nav
          aria-label="Primary"
          className={`container-luxe flex items-center justify-between transition-[height] duration-700 ease-luxe ${
            scrolled ? 'h-[4.25rem]' : 'h-20 md:h-24'
          }`}
        >
          <motion.div {...intro(0.25)}>
            <Link to="/" aria-label="Quatréa — home" className="relative z-10 block py-2">
              <Logo />
            </Link>
          </motion.div>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-11 lg:flex">
            {NAV_LINKS.map((link, i) => (
              <motion.li key={link.to} {...intro(0.4 + i * 0.08)}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className="label py-2 text-pearl/75 transition-colors duration-500 hover:text-pearl"
                >
                  {({ isActive }) => (
                    <span className="link-underline" data-active={isActive}>
                      <span className={isActive ? 'text-pearl' : undefined}>{link.label}</span>
                    </span>
                  )}
                </NavLink>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-1 md:gap-3">
            <motion.button
              {...intro(0.75)}
              type="button"
              onClick={openBag}
              className="group relative flex h-11 items-center gap-3 px-2 text-pearl/80 transition-colors hover:text-ice"
              aria-label={`Open bag, ${count} ${count === 1 ? 'item' : 'items'}`}
            >
              <span className="label hidden md:inline">Bag</span>
              <span className="relative">
                <ShoppingBag aria-hidden="true" strokeWidth={1.1} className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ice px-1 text-[0.6rem] font-bold leading-none text-midnight">
                    {count}
                  </span>
                )}
              </span>
            </motion.button>

            <motion.button
              {...intro(0.85)}
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="relative z-10 flex h-11 w-11 items-center justify-center text-pearl lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <X aria-hidden="true" strokeWidth={1.1} className="h-6 w-6" />
              ) : (
                <Menu aria-hidden="true" strokeWidth={1.1} className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </nav>

        {/* Reading progress */}
        <span
          ref={progressRef}
          aria-hidden="true"
          className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-steel via-ice to-ice/0"
        />
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu pathname={pathname} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ pathname }) {
  const firstLinkRef = useRef(null);
  useEffect(() => firstLinkRef.current?.focus(), []);

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-midnight pt-28 lg:hidden"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-navy/60 blur-3xl"
      />
      <nav aria-label="Mobile" className="container-luxe relative flex flex-1 flex-col">
        <ul className="space-y-1">
          {NAV_LINKS.map((link, i) => (
            <li key={link.to} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                exit={{ y: '110%' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.07 }}
              >
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  to={link.to}
                  className="flex items-baseline gap-5 py-2"
                  aria-current={pathname === link.to ? 'page' : undefined}
                >
                  <span className="label text-mist">0{i + 1}</span>
                  <span
                    className={`text-[2.6rem] leading-tight ${
                      pathname === link.to ? 'italic text-ice' : 'text-pearl'
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>

        <motion.div
          className="hairline mt-12 border-t pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="label mb-5 text-mist">The Collection</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to={`/fragrance/${p.slug}`} className="group block">
                  <span className="label flex items-center gap-2 text-pearl/60">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45" style={{ background: p.accent }} />
                    {p.season}
                  </span>
                  <span className="mt-1 block text-lg text-pearl">{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="label pb-safe mt-auto pt-12 text-pearl/40">
          Four Seasons. Four Emotions. One Timeless Essence.
        </p>
      </nav>
    </motion.div>
  );
}
