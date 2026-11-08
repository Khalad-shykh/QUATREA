import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer.jsx';
import { ScrollTrigger } from '../../animations/gsapAnimations.js';

const CURTAIN_EASE = [0.76, 0, 0.24, 1];
let isFirstPage = true;

/**
 * Route transition: a midnight curtain rises to cover the outgoing page,
 * the scroll resets behind it, then the curtain lifts away from the new
 * page. Skipped on the very first load so the hero intro plays cleanly.
 * Each page carries its own footer so its entrance animation replays.
 */
export default function PageTransition({ children }) {
  const [first] = useState(() => isFirstPage);

  useEffect(() => {
    isFirstPage = false;
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: first ? 1 : 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: first ? 0 : 0.25 } }}
        exit={{ opacity: 0, transition: { duration: 0.45, delay: 0.2 } }}
        onAnimationComplete={() => ScrollTrigger.refresh()}
      >
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </motion.div>

      {/* Outgoing curtain: grows up from the bottom on exit */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-gradient-to-b from-navy to-abyss"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.75, ease: CURTAIN_EASE }}
      />
      {/* Incoming curtain: lifts away toward the top on enter */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-gradient-to-b from-navy to-abyss"
        initial={{ scaleY: first ? 0 : 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: CURTAIN_EASE, delay: 0.1 }}
      />
    </>
  );
}
