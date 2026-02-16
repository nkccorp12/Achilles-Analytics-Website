import { useEffect, useState } from 'react';

/**
 * Custom React hook for responsive breakpoint detection.
 *
 * @param {string} query - Media query string (e.g., "(max-width: 640px)")
 * @returns {boolean} - True if the media query matches, false otherwise
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * const isTablet = useMediaQuery('(max-width: 1024px)');
 */
export function useMediaQuery(query) {
  // SSR-safe: Start with false to prevent hydration mismatch
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create media query matcher
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Handler for changes
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
