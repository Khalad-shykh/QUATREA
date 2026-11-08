/**
 * Source manifest for every generated campaign visual.
 *
 * All images were generated with Higgsfield (GPT Image 2). The hero render
 * defines the signature flacon; it was then passed as the reference image
 * for each seasonal product shot so the bottle geometry, faceted cap and
 * engraving stay consistent across the collection. The collection line-up
 * was generated from the four product shots.
 *
 * Keys mirror the local folder structure in `src/assets/images/`.
 * Run `npm run assets` once to download, resize and convert these files to
 * responsive WebP inside `src/assets/images/` — the app then serves the
 * optimised local copies automatically (see `src/data/assets.js`). Until
 * then it falls back to the CDN originals below.
 *
 * Plain JS (no Vite APIs) so the Node download script can import it.
 */
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3Lh9uy4wx3Ctjwqzm14mWrbeDmf/';

export const IMAGE_SOURCES = {
  // Hero — signature flacon in a midnight studio (16:9)
  'hero/signature': `${CDN}hf_20261105_163445_c70395c5-2d87-4fec-8b27-5da770ba4a6b.png`,

  // Seasonal product photography (3:4)
  'products/spring': `${CDN}hf_20261105_164219_21650736-7b42-425a-ab8a-ace8a0186ba2.png`,
  'products/summer': `${CDN}hf_20261105_163749_3677b897-d615-423a-b5a2-5411c06e4cb9.png`,
  'products/autumn': `${CDN}hf_20261105_164340_c8d80854-b48b-4f1c-a5a0-c4da18b1e3df.png`,
  'products/winter': `${CDN}hf_20261105_164449_c5aeae0b-80b1-4907-ab89-36b05e7eee85.png`,

  // Seasonal atmospheric backgrounds (16:9)
  'seasons/spring': `${CDN}hf_20261105_164539_bc3ddad0-3894-49fd-9e83-fc17c0844313.png`,
  'seasons/summer': `${CDN}hf_20261105_164634_c17a125d-427a-47c4-b253-39080477c2a5.png`,
  'seasons/autumn': `${CDN}hf_20261105_164726_4376ec52-28b3-469d-a24d-7c308169d973.png`,
  'seasons/winter': `${CDN}hf_20261105_164821_095b7323-c22d-4368-b094-5d37aa880c34.png`,

  // Brand editorial imagery
  'branding/atelier': `${CDN}hf_20261105_164942_a08c4cb8-43bb-4056-bd85-4d64e7746775.png`, // 3:4
  'branding/collection': `${CDN}hf_20261105_165046_ee2e02b5-28b7-4ea1-9191-96d647cd9b3a.png`, // 16:9
};

/** Target widths (px) for the responsive WebP variants produced by `npm run assets`. */
export const IMAGE_WIDTHS = {
  hero: [960, 1600, 2400],
  products: [480, 800, 1200],
  seasons: [960, 1600, 2400],
  branding: [800, 1600],
};
