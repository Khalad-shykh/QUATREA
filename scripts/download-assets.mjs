/**
 * Download the Higgsfield-generated visuals and save responsive WebP
 * variants into src/assets/images/<group>/<name>-<width>w.webp.
 *
 *   npm run assets
 *
 * The app picks the files up automatically (src/data/localImages.js) and
 * stops requesting the CDN originals. Safe to re-run.
 */
import { mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { IMAGE_SOURCES, IMAGE_WIDTHS } from '../src/data/imageSources.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src', 'assets', 'images');

async function clearVariants(dir, name) {
  try {
    const files = await readdir(dir);
    await Promise.all(
      files
        .filter((f) => f.startsWith(`${name}-`) && f.endsWith('w.webp'))
        .map((f) => rm(path.join(dir, f))),
    );
  } catch {
    /* folder does not exist yet */
  }
}

let ok = 0;
for (const [key, url] of Object.entries(IMAGE_SOURCES)) {
  const [group, name] = key.split('/');
  const dir = path.join(outDir, group);
  process.stdout.write(`• ${key.padEnd(22)} `);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    const { width: original } = await sharp(input).metadata();

    const widths = [...new Set((IMAGE_WIDTHS[group] ?? [1600]).map((w) => Math.min(w, original)))];
    await mkdir(dir, { recursive: true });
    await clearVariants(dir, name);

    for (const width of widths) {
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(path.join(dir, `${name}-${width}w.webp`));
    }
    ok += 1;
    console.log(`✓ ${widths.map((w) => `${w}w`).join(', ')}`);
  } catch (err) {
    console.log(`✗ ${err.message}`);
  }
}

console.log(`\n${ok}/${Object.keys(IMAGE_SOURCES).length} images saved to src/assets/images/`);
if (ok < Object.keys(IMAGE_SOURCES).length) process.exitCode = 1;
