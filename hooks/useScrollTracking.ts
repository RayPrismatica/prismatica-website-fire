'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAthenaChat } from '@/contexts/AthenaChatContext';
import type { EngagementData } from '@/contexts/AthenaChatContext';
import { countWords, classifyEngagement } from '@/lib/wordCount';

/**
 * Hook to track reading engagement - not just visibility, but actual time spent reading content.
 * Uses Intersection Observer to detect when sections become visible (50% threshold).
 * Tracks duration and classifies engagement level (skimmed, viewed, read, engaged).
 * Pauses timing when tab is inactive using Page Visibility API.
 *
 * Usage: Call this hook at the top of any page component that has sections with data-section-id attributes.
 *
 * Example:
 * ```tsx
 * export default function AboutPage() {
 *   useScrollTracking();
 *   return <div data-section-id="/about:hero">Content...</div>
 * }
 * ```
 */
export function useScrollTracking() {
  const pathname = usePathname();
  const { trackSectionEngagement } = useAthenaChat();

  // Track start times for sections currently in view
  const sectionTimers = useRef<Map<string, number>>(new Map());

  // Track page visibility state (for pausing timers when tab inactive)
  const pageVisible = useRef<boolean>(true);

  // Track paused time accumulation (when tab is hidden)
  const pausedAt = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // Page Visibility API - pause timers when tab inactive
    const handleVisibilityChange = () => {
      const wasVisible = pageVisible.current;
      const isVisible = !document.hidden;
      pageVisible.current = isVisible;

      const now = Date.now();

      if (!isVisible && wasVisible) {
        // Tab just became hidden - record pause time for all active timers
        sectionTimers.current.forEach((startTime, sectionId) => {
          pausedAt.current.set(sectionId, now);
        });
      } else if (isVisible && !wasVisible) {
        // Tab just became visible - adjust start times to account for pause
        pausedAt.current.forEach((pauseTime, sectionId) => {
          const pauseDuration = now - pauseTime;
          const currentStart = sectionTimers.current.get(sectionId);
          if (currentStart) {
            // Push start time forward by pause duration
            sectionTimers.current.set(sectionId, currentStart + pauseDuration);
          }
        });
        pausedAt.current.clear();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Set up Intersection Observer to watch for section visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (!sectionId) return;

          // Section entered viewport (50%+ visible)
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Start timer if not already tracking this section
            if (!sectionTimers.current.has(sectionId)) {
              sectionTimers.current.set(sectionId, Date.now());
            }
          }
          // Section exited viewport or dropped below 50% visible
          else if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
            const startTime = sectionTimers.current.get(sectionId);
            if (!startTime) return;

            // Calculate duration (accounting for current pause if tab is hidden)
            let endTime = Date.now();
            if (!pageVisible.current && pausedAt.current.has(sectionId)) {
              // If currently paused, use pause time as end time
              endTime = pausedAt.current.get(sectionId)!;
            }

            const duration = Math.floor((endTime - startTime) / 1000);

            // Only track if duration is at least 1 second (avoid rapid scrolling noise)
            if (duration >= 1) {
              // Count words in section
              const wordCount = countWords(entry.target.textContent || '');

              // Classify engagement level
              const engagement = classifyEngagement(duration, wordCount);

              const engagementData: EngagementData = {
                id: sectionId,
                engagement,
                duration,
                wordCount,
                firstViewed: startTime,
                lastViewed: endTime
              };

              // Track engagement
              trackSectionEngagement(engagementData);
            }

            // Clean up timers
            sectionTimers.current.delete(sectionId);
            pausedAt.current.delete(sectionId);
          }
        });
      },
      {
        // Section must be 50% visible to trigger tracking
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    // Find all sections with data-section-id attribute and observe them
    const sections = document.querySelectorAll('[data-section-id]');
    sections.forEach(section => observer.observe(section));

    // Cleanup: flush all active timers and stop observing
    return () => {
      // Flush all active section timers before unmounting
      const now = Date.now();
      sectionTimers.current.forEach((startTime, sectionId) => {
        let endTime = now;
        if (!pageVisible.current && pausedAt.current.has(sectionId)) {
          endTime = pausedAt.current.get(sectionId)!;
        }

        const duration = Math.floor((endTime - startTime) / 1000);

        if (duration >= 1) {
          const section = document.querySelector(`[data-section-id="${sectionId}"]`);
          if (section) {
            const wordCount = countWords(section.textContent || '');
            const engagement = classifyEngagement(duration, wordCount);

            const engagementData: EngagementData = {
              id: sectionId,
              engagement,
              duration,
              wordCount,
              firstViewed: startTime,
              lastViewed: endTime
            };

            trackSectionEngagement(engagementData);
          }
        }
      });

      // Clear all timers
      sectionTimers.current.clear();
      pausedAt.current.clear();

      // Disconnect observer
      sections.forEach(section => observer.unobserve(section));
      observer.disconnect();

      // Remove visibility listener
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname, trackSectionEngagement]);
}
