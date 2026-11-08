/**
 * Discovers the optimised local copies written by `npm run assets`.
 *
 * The script saves each visual as `<group>/<name>-<width>w.webp` in several
 * widths. `import.meta.glob` returns an empty object when no files exist yet,
 * so the app keeps working (with CDN originals) before the script has run.
 */
const files = import.meta.glob('../assets/images/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const localImages = Object.entries(files).reduce((acc, [path, url]) => {
  const match = path.match(/assets\/images\/(.+)-(\d+)w\.webp$/);
  if (!match) return acc;
  const [, key, width] = match;
  (acc[key] ||= []).push({ url, width: Number(width) });
  return acc;
}, {});
