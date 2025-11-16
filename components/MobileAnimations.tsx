'use client';

import { useEffect } from 'react';

/**
 * MobileAnimations - Production mobile enhancements
 *
 * Manages viewport-based animations for mobile devices:
 * - Bento box reveal animations (fade + scale-in)
 * - Red accent activation when elements in viewport
 * - Auto-triggered hover states on scroll
 *
 * Uses IntersectionObserver for performance-optimized scroll detection
 */
export default function MobileAnimations() {
  useEffect(() => {
    // Only run on mobile viewports
    if (typeof window === 'undefined' || window.innerWidth > 768) {
      return;
    }

    // Add animations-ready class after a brief delay for red accent draw-in
    setTimeout(() => {
      document.body.classList.add('animations-ready');
    }, 100);

    // Set up IntersectionObserver for bento boxes
    // Separate observers: one for initial reveal, one for "in focus" state

    // Observer for initial reveal (happens early - 10% visible)
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observer for "in-viewport" red accent state (happens at ~60% from top)
    const focusObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport');
          } else {
            entry.target.classList.remove('in-viewport');
          }
        });
      },
      {
        threshold: 0, // Trigger as soon as any part is in the zone
        rootMargin: '-60% 0px -40% 0px' // Top of element at 60% from top of screen
      }
    );

    // Observe all bento boxes and similar containers
    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.bento-box, .product-bento, .service-bento, .contact-box, .bento-link, [style*="backgroundColor: #fff"][style*="borderRadius"]'
      );

      elements.forEach((el) => {
        // Immediately reveal elements that are already in viewport on page load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('revealed');
        }

        revealObserver.observe(el);  // For fade-in animation
        focusObserver.observe(el);   // For red accent state
      });
    };

    // Initial observation
    observeElements();

    // Re-observe after a delay to catch dynamically rendered content
    setTimeout(observeElements, 500);

    // Cleanup
    return () => {
      revealObserver.disconnect();
      focusObserver.disconnect();
      document.body.classList.remove('animations-ready');
    };
  }, []);

  return null; // This component only handles side effects
}
