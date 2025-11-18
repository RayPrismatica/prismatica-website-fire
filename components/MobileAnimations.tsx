'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ViewportAnimations - Viewport-based bento activation
 *
 * Manages viewport-based interactions for ALL devices (mobile + desktop):
 * - Red accent activation when elements in viewport
 * - Auto-triggered "in-focus" states on scroll
 * - Replaces hover-based interactions with scroll-based
 *
 * Uses IntersectionObserver for performance-optimized scroll detection
 */
export default function MobileAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Run on all viewports (mobile AND desktop)
    if (typeof window === 'undefined') {
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

    // Observer for "in-viewport" red accent state
    // Desktop: triggers when more centered (later scroll)
    // Mobile: triggers earlier (60% from top)
    // IMPORTANT: Only ONE element should have .in-viewport at a time
    const isDesktop = window.innerWidth > 768;
    const focusObserver = new IntersectionObserver(
      (entries) => {
        // Process all entries to determine which should be active
        const intersectingEntries = entries.filter((e) => e.isIntersecting);

        if (intersectingEntries.length > 0) {
          // If multiple elements are intersecting, choose the one closest to viewport center
          const viewportCenter = window.innerHeight * 0.5;
          let closestEntry = intersectingEntries[0];
          let closestDistance = Math.abs(intersectingEntries[0].boundingClientRect.top - viewportCenter);

          for (const entry of intersectingEntries) {
            const distance = Math.abs(entry.boundingClientRect.top - viewportCenter);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestEntry = entry;
            }
          }

          // Remove .in-viewport from ALL elements
          document.querySelectorAll('.in-viewport').forEach((el) => {
            el.classList.remove('in-viewport');
          });

          // Add to the closest one
          closestEntry.target.classList.add('in-viewport');
        } else {
          // Remove from entries that are no longer intersecting
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              entry.target.classList.remove('in-viewport');
            }
          });
        }
      },
      {
        threshold: 0,
        // Desktop: trigger when element is high on screen (-300px top = element must scroll 300px into viewport)
        // Mobile: trigger earlier (-60% top = element at 60% from top = current behavior)
        // Reduced bottom margin to allow last elements to trigger
        rootMargin: isDesktop ? '-300px 0px -20% 0px' : '-60% 0px -10% 0px'
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
        const viewportHeight = window.innerHeight;

        // Add 'revealed' class if any part is visible
        if (rect.top < viewportHeight && rect.bottom > 0) {
          el.classList.add('revealed');
        }

        // Add 'in-viewport' class if element is in the activation zone
        // Desktop: 300px from top (high on screen), Mobile: 60% from top (earlier)
        const activationTop = isDesktop ? 300 : viewportHeight * 0.6;
        const activationBottom = isDesktop ? viewportHeight * 0.8 : viewportHeight * 0.4;
        if (rect.top <= activationTop && rect.bottom >= activationBottom) {
          el.classList.add('in-viewport');
        }

        revealObserver.observe(el);  // For fade-in animation
        focusObserver.observe(el);   // For red accent state
      });
    };

    // Initial observation
    observeElements();

    // Re-observe after delays to catch dynamically rendered content
    setTimeout(observeElements, 500);
    setTimeout(observeElements, 1000);
    setTimeout(observeElements, 1500);

    // Cleanup
    return () => {
      revealObserver.disconnect();
      focusObserver.disconnect();
      document.body.classList.remove('animations-ready');
    };
  }, [pathname]);

  return null; // This component only handles side effects
}
