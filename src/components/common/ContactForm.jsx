import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, LoaderCircle } from 'lucide-react';
import Button from './Button.jsx';

const EMPTY = { name: '', email: '', subject: '', message: '' };
const MIN_MESSAGE = 20;
const MAX_MESSAGE = 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER = ['name', 'email', 'subject', 'message'];

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';

  const email = values.email.trim();
  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address, e.g. name@example.com.';

  if (values.subject.trim().length < 3) errors.subject = 'Please add a short subject.';

  const message = values.message.trim();
  if (!message) errors.message = 'Please write your message.';
  else if (message.length < MIN_MESSAGE)
    errors.message = `Please write at least ${MIN_MESSAGE} characters (${message.length}/${MIN_MESSAGE}).`;
  else if (message.length > MAX_MESSAGE) errors.message = `Please keep your message under ${MAX_MESSAGE} characters.`;

  return errors;
}

function Field({ id, label, error, children, aside }) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="label text-mist transition-colors duration-500 group-focus-within:text-ice">
          {label}
        </label>
        {aside}
      </div>
      {children}
      <p id={`${id}-error`} className="mt-2 min-h-[1.25rem] text-[0.8rem] leading-snug text-[#eab0b0]">
        {error}
      </p>
    </div>
  );
}

/**
 * Contact form with client-side validation.
 * There is no backend: on a valid submit it simulates sending and says
 * plainly that nothing was transmitted.
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [sentName, setSentName] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const fieldRefs = useRef({});
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const errors = validate(values);
  const errorFor = (field) => ((touched[field] || attempted) && errors[field]) || '';

  const bind = (field) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    ref: (el) => {
      fieldRefs.current[field] = el;
    },
    onChange: (e) => setValues((v) => ({ ...v, [field]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [field]: true })),
    'aria-invalid': errorFor(field) ? true : undefined,
    'aria-describedby': `contact-${field}-error`,
    className: 'field mt-1.5',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);
    const invalid = ORDER.filter((f) => errors[f]);
    if (invalid.length) {
      setAnnouncement(`Please check ${invalid.length} ${invalid.length === 1 ? 'field' : 'fields'}.`);
      fieldRefs.current[invalid[0]]?.focus();
      return;
    }
    setStatus('sending');
    setAnnouncement('Sending…');
    timer.current = setTimeout(() => {
      setSentName(values.name.trim().split(/\s+/)[0]);
      setStatus('sent');
      setAnnouncement('Message validated. This is a demonstration — nothing was sent.');
      setValues(EMPTY);
      setTouched({});
      setAttempted(false);
    }, 1400);
  };

  const reset = () => {
    setStatus('idle');
    setAnnouncement('');
  };

  return (
    <div className="relative">
      <p className="sr-only" aria-live="polite" role="status">
        {announcement}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hairline border p-8 md:p-12"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ice/40 text-ice">
              <Check aria-hidden="true" strokeWidth={1.2} className="h-5 w-5" />
            </span>
            <h2 className="mt-8 text-3xl text-pearl md:text-4xl">
              Thank you{sentName ? `, ${sentName}` : ''}.
            </h2>
            <p className="body-copy mt-5 max-w-md">
              Your message passed validation. Please note this website is a portfolio
              demonstration with no backend — <strong className="font-normal text-pearl">your message
              has not been sent</strong> to anyone.
            </p>
            <div className="mt-10">
              <Button type="button" variant="ghost" onClick={reset}>
                Write another message
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7"
            aria-describedby="contact-demo-note"
          >
            <div className="grid gap-7 sm:grid-cols-2 sm:gap-8">
              <Field id="contact-name" label="Name" error={errorFor('name')}>
                <input type="text" autoComplete="name" placeholder="Your full name" {...bind('name')} />
              </Field>
              <Field id="contact-email" label="Email" error={errorFor('email')}>
                <input type="email" autoComplete="email" inputMode="email" placeholder="name@example.com" {...bind('email')} />
              </Field>
            </div>

            <Field id="contact-subject" label="Subject" error={errorFor('subject')}>
              <input type="text" list="contact-subjects" placeholder="Fragrance advice, a gift, a question…" {...bind('subject')} />
              <datalist id="contact-subjects">
                <option value="Fragrance advice" />
                <option value="Gift enquiry" />
                <option value="A question about a fragrance" />
                <option value="Press & collaborations" />
              </datalist>
            </Field>

            <Field
              id="contact-message"
              label="Message"
              error={errorFor('message')}
              aside={
                <span
                  aria-hidden="true"
                  className={`text-[0.7rem] tabular-nums ${
                    values.message.length > MAX_MESSAGE ? 'text-[#eab0b0]' : 'text-pearl/35'
                  }`}
                >
                  {values.message.length} / {MAX_MESSAGE}
                </span>
              }
            >
              <textarea
                rows={6}
                placeholder="Tell us about the moments you love…"
                {...bind('message')}
                className="field mt-1.5 resize-none leading-relaxed"
              />
            </Field>

            <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" disabled={status === 'sending'} arrow={status !== 'sending'}>
                {status === 'sending' ? (
                  <>
                    <LoaderCircle aria-hidden="true" strokeWidth={1.2} className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
              <p id="contact-demo-note" className="max-w-[17rem] text-xs leading-relaxed text-pearl/45">
                Front-end demonstration: messages are validated in your browser and are not sent.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
