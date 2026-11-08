import Hero from '../components/home/Hero.jsx';
import SeasonalCollection from '../components/home/SeasonalCollection.jsx';
import SeasonalScrollytelling from '../components/home/SeasonalScrollytelling.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

/** Homepage: Hero → Seasonal Collection → Seasonal Journey (→ Footer). */
export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <SeasonalCollection />
      <SeasonalScrollytelling />
    </>
  );
}
