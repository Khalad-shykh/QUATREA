import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ContactForm from '../components/common/ContactForm.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import { CONTACT_EMAIL } from '../components/layout/Footer.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const SOCIAL = [
  { href: 'https://www.instagram.com/', label: 'Instagram' },
  { href: 'https://www.pinterest.com/', label: 'Pinterest' },
  { href: 'https://www.facebook.com/', label: 'Facebook' },
];

export default function Contact() {
  const ref = useRef(null);
  useDocumentTitle('Contact');
  useScrollReveal(ref);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-24 h-[38rem] w-[38rem] rounded-full bg-navy/50 blur-[160px]"
      />
      <section aria-labelledby="contact-title" className="relative pb-24 pt-36 md:pb-36 md:pt-48">
        <div className="container-luxe grid gap-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              as="h1"
              id="contact-title"
              size="display-xl"
              eyebrow="Contact"
              lines={['Write to', <em key="b">the Atelier.</em>]}
              description="Searching for your season, choosing a gift, or curious about a note? We would love to hear from you."
            />

            <dl data-reveal="stagger" className="mt-14 space-y-0">
              <div className="hairline border-t py-6">
                <dt className="label text-mist">Email</dt>
                <dd className="mt-2">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline text-lg text-pearl hover:text-ice">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="hairline border-t py-6">
                <dt className="label text-mist">Fragrance Advice</dt>
                <dd className="mt-2 text-lg text-pearl">Personal recommendations, by email</dd>
              </div>
              <div className="hairline border-t py-6">
                <dt className="label text-mist">Hours</dt>
                <dd className="mt-2 text-lg text-pearl">Monday – Friday, 10:00 – 18:00</dd>
              </div>
              <div className="hairline border-y py-6">
                <dt className="label text-mist">Follow</dt>
                <dd className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-pearl/80 hover:text-pearl"
                    >
                      <span className="link-underline">{s.label}</span>
                      <ArrowUpRight aria-hidden="true" strokeWidth={1} className="h-3.5 w-3.5 opacity-60" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div data-reveal className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
