import { useEffect } from 'react';

const BASE = 'QUATRÉA';
const DEFAULT = `${BASE} Four Seasons. Four Emotions. One Timeless Essence.`;

/** Set a descriptive document title per route. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : DEFAULT;
  }, [title]);
}
