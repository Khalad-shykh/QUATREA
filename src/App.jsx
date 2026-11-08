import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Navbar from './components/layout/Navbar.jsx';
import BagDrawer from './components/layout/BagDrawer.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import { BagProvider } from './context/BagContext.jsx';
import { ScrollTrigger } from './animations/gsapAnimations.js';
import Home from './pages/Home.jsx';
import Fragrances from './pages/Fragrances.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

const page = (Component) => (
  <PageTransition>
    <Component />
  </PageTransition>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      // The outgoing page is fully covered by the curtain at this point.
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={page(Home)} />
        <Route path="/fragrances" element={page(Fragrances)} />
        <Route path="/fragrance/:slug" element={page(ProductDetails)} />
        <Route path="/about" element={page(About)} />
        <Route path="/contact" element={page(Contact)} />
        <Route path="*" element={page(NotFound)} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  // Web fonts change line heights once they load; re-measure triggers.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BagProvider>
        <a
          href="#main"
          className="label fixed left-4 top-4 z-[100] -translate-y-24 bg-ice px-4 py-3 text-midnight transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        <AnimatedRoutes />
        <BagDrawer />
      </BagProvider>
    </MotionConfig>
  );
}
