import { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { products } from '../../data/products.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

export const CONTACT_EMAIL = 'atelier@quatrea.example';

const EXPLORE = [
  { to: '/', label: 'Home' },
  { to: '/fragrances', label: 'Fragrances' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
];

const CONNECT = [
  { href: 'https://www.instagram.com/', label: 'Instagram' },
  { href: 'https://www.pinterest.com/', label: 'Pinterest' },
  { href: 'https://www.facebook.com/', label: 'Facebook' },
  { href: `mailto:${CONTACT_EMAIL}`, label: 'Email' },
];

function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="label mb-7 text-mist">{title}</h2>
      <ul className="space-y-3.5">{children}</ul>
    </div>
  );
}

const linkClass =
  'group inline-flex items-center gap-2 text-[0.9rem] text-pearl/70 transition-colors duration-500 hover:text-pearl';

export default function Footer() {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-abyss">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-navy/40 blur-[120px]"
      />

      <div className="container-luxe relative pt-24 md:pt-32">
        <div data-reveal="stagger" className="grid gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5 lg:pr-16">
            <Link to="/" aria-label="Quatréa, home" className="inline-block">
              <Logo size="lg" />
            </Link>
            <p className="mt-8 text-xl italic leading-snug text-ice/90 md:text-2xl">
              Four seasons. Four emotions.
              <br />
              One timeless essence.
            </p>
            <p className="body-copy mt-6 max-w-sm text-[0.875rem]">
              Quatréa is an expression of nature, memories, and individuality, captured through four
              extraordinary seasonal fragrances.
            </p>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Explore">
              {EXPLORE.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    <span className="link-underline">{item.label}</span>
                  </Link>
                </li>
              ))}
            </FooterColumn>
          </div>

          <div className="lg:col-span-3">
            <FooterColumn title="Collections">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link to={`/fragrance/${p.slug}`} className={linkClass}>
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rotate-45 opacity-70 transition-opacity group-hover:opacity-100"
                      style={{ background: p.accent }}
                    />
                    <span className="link-underline">
                      <span>
                        {p.season}, <span className="italic">{p.name}</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Connect">
              {CONNECT.map((item) => {
                const external = item.href.startsWith('http');
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={linkClass}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className="link-underline">{item.label}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        strokeWidth={1}
                        className="h-3.5 w-3.5 opacity-50 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </li>
                );
              })}
            </FooterColumn>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div data-reveal="lines" aria-hidden="true" className="mt-24 select-none md:mt-32">
          <span className="line-mask pt-[0.18em]">
            <span className="line-inner text-outline block text-center text-[17.5vw] font-bold leading-[0.8] tracking-[0.06em] lg:text-[14.5rem] 3xl:text-[16rem]">
              QUATRÉA
            </span>
          </span>
        </div>

        <div className="hairline label pb-safe flex flex-col gap-3 border-t py-8 text-[0.625rem] text-pearl/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 QUATRÉA. ALL RIGHTS RESERVED.</p>
          <p>CRAFTED WITH AN EYE FOR DETAIL.</p>
        </div>
      </div>
    </footer>
  );
}
