import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

/**
 * Two button voices:
 *  - "primary": hairline frame with a light fill that sweeps in on hover
 *  - "ghost":   editorial text link with an animated underline and arrow
 * Renders a <Link> when `to` is given, otherwise a <button>.
 */
export default function Button({
  to,
  children,
  variant = 'primary',
  className = '',
  arrow = true,
  ...props
}) {
  const Component = to ? Link : 'button';
  const linkProps = to ? { to } : { type: props.type ?? 'button' };

  if (variant === 'ghost') {
    return (
      <Component
        {...linkProps}
        {...props}
        className={`group label inline-flex items-center gap-3 py-2 text-pearl transition-colors duration-500 hover:text-ice ${className}`}
      >
        <span className="link-underline">{children}</span>
        {arrow && (
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.2}
            className="h-4 w-4 transition-transform duration-700 ease-luxe group-hover:translate-x-1.5"
          />
        )}
      </Component>
    );
  }

  return (
    <Component
      {...linkProps}
      {...props}
      className={`group label relative inline-flex items-center justify-center gap-4 overflow-hidden border border-ice/40 px-8 py-4 text-pearl transition-[border-color,color] duration-700 ease-luxe hover:border-ice hover:text-midnight disabled:pointer-events-none disabled:opacity-60 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-ice transition-transform duration-700 ease-luxe group-hover:scale-x-100"
      />
      <span className="relative z-10 inline-flex items-center gap-4">
        {children}
        {arrow && (
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.2}
            className="h-4 w-4 transition-transform duration-700 ease-luxe group-hover:translate-x-1"
          />
        )}
      </span>
    </Component>
  );
}
