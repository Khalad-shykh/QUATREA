/**
 * QUATRÉA wordmark. The diamond mark echoes the faceted, corner-set cap of
 * the signature flacon; its four quadrants stand for the four seasons.
 */
export function LogoMark({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect
        x="5.5"
        y="5.5"
        width="13"
        height="13"
        transform="rotate(45 12 12)"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
    </svg>
  );
}

export default function Logo({ className = '', size = 'md' }) {
  const text = size === 'lg' ? 'text-xl md:text-2xl' : 'text-[0.95rem]';
  return (
    <span className={`inline-flex items-center gap-3 text-ice ${className}`}>
      <LogoMark className={size === 'lg' ? 'h-6 w-6' : 'h-[1.05rem] w-[1.05rem]'} />
      <span className={`${text} font-bold tracking-wordmark leading-none text-pearl`}>
        QUATRÉA
      </span>
    </span>
  );
}
