import SplitLines from './SplitLines.jsx';

/**
 * Editorial section heading: tracked eyebrow, masked display lines and an
 * optional supporting paragraph. Reveals are driven by `useScrollReveal`.
 */
export default function SectionHeading({
  eyebrow,
  lines,
  description,
  as = 'h2',
  id,
  size = 'display-lg',
  align = 'left',
  className = '',
  children,
}) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <p data-reveal className="label mb-7 flex items-center gap-4 text-mist">
          {!centered && <span aria-hidden="true" className="h-px w-10 bg-mist/60" />}
          {eyebrow}
        </p>
      )}
      <div data-reveal="lines">
        <SplitLines as={as} id={id} lines={lines} className={`${size} text-pearl`} />
      </div>
      {description && (
        <p
          data-reveal
          className={`body-copy mt-8 max-w-md ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
