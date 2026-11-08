import { useRef } from 'react';
import { useParams } from 'react-router';
import ProductHero from '../components/product/ProductHero.jsx';
import ProductIntro from '../components/product/ProductIntro.jsx';
import FragranceNotes from '../components/product/FragranceNotes.jsx';
import ProductStory from '../components/product/ProductStory.jsx';
import ProductSpecs from '../components/product/ProductSpecs.jsx';
import RelatedProducts from '../components/product/RelatedProducts.jsx';
import NotFound from './NotFound.jsx';
import { getProduct } from '../data/products.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

/** Shared template for /fragrance/:slug, populated from data/products.js. */
export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const ref = useRef(null);

  useDocumentTitle(product ? `${product.name} · ${product.season}` : 'Fragrance not found');
  useScrollReveal(ref, [slug]);

  if (!product) return <NotFound />;

  return (
    <div ref={ref} style={{ '--accent': product.accent }}>
      <ProductHero product={product} />
      <ProductIntro product={product} />
      <FragranceNotes product={product} />
      <ProductStory product={product} />
      <ProductSpecs product={product} />
      <RelatedProducts product={product} />
    </div>
  );
}
