'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAthenaChat } from '@/contexts/AthenaChatContext';
import type { EngagementData } from '@/contexts/AthenaChatContext';
import { countWords } from '@/lib/wordCount';

/**
 * HUMAN-CENTERED SCROLL TRACKING
 *
 * This hook tracks REAL reading behavior, not just viewport visibility.
 *
 * KEY PRINCIPLES:
 * - Only count time when viewport is STILL (not scrolling)
 * - Detect scroll velocity to ignore rapid browsing
 * - Filter out very short sections (< 30 words)
 * - Cap max engagement time (distraction detection)
 * - Track pause patterns, not continuous visibility
 *
 * HUMAN BEHAVIOR PATTERNS:
 * - 3-8s pause = Skimmed (caught a few lines)
 * - 10-25s pause = Viewed (actually read some)
 * - 25-60s pause = Read (engaged with content)
 * - 60-120s pause = Deep engagement (really thinking)
 * - 120s+ = Likely distracted (tab switch, phone, friend)
 *
 * Usage: Call this hook at the top of any page component.
 */
export function useScrollTracking() {
  const pathname = usePathname();
  const { trackSectionEngagement } = useAthenaChat();

  // Track pause durations (time viewport is STILL with section visible)
  const sectionPauseTimes = useRef<Map<string, number>>(new Map());

  // Track when section first became visible
  const sectionFirstSeen = useRef<Map<string, number>>(new Map());

  // Track accumulated pause time per section
  const sectionAccumulatedTime = useRef<Map<string, number>>(new Map());

  // Track last scroll time (for velocity detection)
  const lastScrollTime = useRef<number>(Date.now());
  const lastScrollY = useRef<number>(0);

  // Track if currently scrolling (for pause detection)
  const isScrolling = useRef<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Track page visibility
  const pageVisible = useRef<boolean>(true);

  // Track page entry time (for total time on page)
  const pageEntryTime = useRef<number>(0);

  // Track if chat is in state 3 (covering content)
  const chatCoveringContent = useRef<boolean>(false);

  useEffect(() => {
    // Set page entry time on mount
    pageEntryTime.current = Date.now();

    // Scroll velocity detection
    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;

      // Track scroll position changes (for future velocity-based filtering if needed)
      lastScrollTime.current = now;
      lastScrollY.current = currentScrollY;

      // If scrolling, pause all section timers
      if (!isScrolling.current) {
        isScrolling.current = true;

        // Pause all active section timers
        sectionPauseTimes.current.forEach((pauseStart, sectionId) => {
          const pauseDuration = Math.floor((now - pauseStart) / 1000);

          // Only accumulate if pause was meaningful (> 1 second)
          if (pauseDuration >= 1) {
            const accumulated = sectionAccumulatedTime.current.get(sectionId) || 0;
            sectionAccumulatedTime.current.set(sectionId, accumulated + pauseDuration);
          }

          // Clear the pause timer
          sectionPauseTimes.current.delete(sectionId);
        });
      }

      // Reset scroll timeout (debounce)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // After 150ms of no scrolling, consider it "paused"
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;

        // Start new pause timers for all visible sections
        const visibleSections = document.querySelectorAll('[data-section-id]');
        visibleSections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          const isSignificantlyVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;

          if (isVisible && isSignificantlyVisible && pageVisible.current && !chatCoveringContent.current) {
            const sectionId = section.getAttribute('data-section-id');
            if (sectionId && !sectionPauseTimes.current.has(sectionId)) {
              sectionPauseTimes.current.set(sectionId, Date.now());

              // Track first seen time if not already tracked
              if (!sectionFirstSeen.current.has(sectionId)) {
                sectionFirstSeen.current.set(sectionId, Date.now());
              }
            }
          }
        });
      }, 150);
    };

    // Page visibility detection
    const handleVisibilityChange = () => {
      const wasVisible = pageVisible.current;
      const isVisible = !document.hidden;
      pageVisible.current = isVisible;

      const now = Date.now();

      if (!isVisible && wasVisible) {
        // Tab hidden - pause all timers
        sectionPauseTimes.current.forEach((pauseStart, sectionId) => {
          const pauseDuration = Math.floor((now - pauseStart) / 1000);

          if (pauseDuration >= 1) {
            const accumulated = sectionAccumulatedTime.current.get(sectionId) || 0;
            sectionAccumulatedTime.current.set(sectionId, accumulated + pauseDuration);
          }
        });

        sectionPauseTimes.current.clear();
      } else if (isVisible && !wasVisible) {
        // Tab visible again - only restart if pause was < 30 seconds (not distracted)
        const hiddenDuration = Math.floor((now - lastScrollTime.current) / 1000);

        if (hiddenDuration > 30) {
          // User was away too long - discard accumulated time
          sectionAccumulatedTime.current.clear();
          sectionFirstSeen.current.clear();
        }
      }
    };

    // Chat overlay detection (state 3 only - when chat fully covers content)
    const handleChatCover = () => {
      chatCoveringContent.current = true;
      const now = Date.now();

      // Pause all active section timers (same logic as tab hidden)
      sectionPauseTimes.current.forEach((pauseStart, sectionId) => {
        const pauseDuration = Math.floor((now - pauseStart) / 1000);

        if (pauseDuration >= 1) {
          const accumulated = sectionAccumulatedTime.current.get(sectionId) || 0;
          sectionAccumulatedTime.current.set(sectionId, accumulated + pauseDuration);
        }
      });

      sectionPauseTimes.current.clear();
    };

    const handleChatUncover = () => {
      chatCoveringContent.current = false;
      // Resume tracking - scroll handler will restart timers naturally
    };

    // Intersection Observer for section entry/exit
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (!sectionId) return;

          // Section completely exited viewport
          if (!entry.isIntersecting) {
            // Finalize engagement tracking
            const accumulated = sectionAccumulatedTime.current.get(sectionId) || 0;
            const firstSeen = sectionFirstSeen.current.get(sectionId);

            // Check if there's a current pause timer running
            const currentPause = sectionPauseTimes.current.get(sectionId);
            if (currentPause) {
              const pauseDuration = Math.floor((Date.now() - currentPause) / 1000);
              if (pauseDuration >= 1) {
                const totalTime = accumulated + pauseDuration;
                finalizeSectionEngagement(sectionId, entry.target, totalTime, firstSeen || Date.now());
              }
            } else if (accumulated > 0) {
              // Use accumulated time only
              finalizeSectionEngagement(sectionId, entry.target, accumulated, firstSeen || Date.now());
            }

            // Clean up
            sectionPauseTimes.current.delete(sectionId);
            sectionAccumulatedTime.current.delete(sectionId);
            sectionFirstSeen.current.delete(sectionId);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    // Helper function to finalize and classify engagement
    const finalizeSectionEngagement = (
      sectionId: string,
      element: Element,
      totalPauseTime: number,
      firstSeen: number
    ) => {
      // Count words in section
      const wordCount = countWords(element.textContent || '');

      // FILTER 1: Ignore sections with < 30 words (too short to matter)
      if (wordCount < 30) {
        return;
      }

      // FILTER 2: Ignore very short pauses (< 3 seconds = just passing through)
      if (totalPauseTime < 3) {
        return;
      }

      // FILTER 3: Cap max engagement at 120 seconds (anything longer = distracted)
      const cappedTime = Math.min(totalPauseTime, 120);

      // FILTER 4: Check total time on page (< 10s = drive-by visit, ignore all)
      const totalPageTime = Math.floor((Date.now() - pageEntryTime.current) / 1000);
      if (totalPageTime < 10) {
        return;
      }

      // HUMAN-CENTERED CLASSIFICATION (pause-based, not word-count based)
      let engagement: 'skimmed' | 'viewed' | 'read' | 'engaged';

      if (cappedTime < 10) {
        engagement = 'skimmed'; // 3-9s: Quick scan
      } else if (cappedTime < 25) {
        engagement = 'viewed'; // 10-24s: Actually read some
      } else if (cappedTime < 60) {
        engagement = 'read'; // 25-59s: Engaged with content
      } else {
        engagement = 'engaged'; // 60-120s: Deep focus
      }

      const engagementData: EngagementData = {
        id: sectionId,
        engagement,
        duration: cappedTime,
        wordCount,
        firstViewed: firstSeen,
        lastViewed: Date.now()
      };

      trackSectionEngagement(engagementData);
    };

    // Find all sections and observe them
    const sections = document.querySelectorAll('[data-section-id]');
    sections.forEach(section => observer.observe(section));

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('athena:chat-cover', handleChatCover);
    window.addEventListener('athena:chat-uncover', handleChatUncover);

    // Trigger initial scroll handler to detect visible sections
    handleScroll();

    // Cleanup
    return () => {
      // Finalize all active sections
      const now = Date.now();
      sectionPauseTimes.current.forEach((pauseStart, sectionId) => {
        const pauseDuration = Math.floor((now - pauseStart) / 1000);
        const accumulated = sectionAccumulatedTime.current.get(sectionId) || 0;
        const totalTime = accumulated + pauseDuration;
        const firstSeen = sectionFirstSeen.current.get(sectionId) || now;

        const section = document.querySelector(`[data-section-id="${sectionId}"]`);
        if (section && totalTime > 0) {
          finalizeSectionEngagement(sectionId, section, totalTime, firstSeen);
        }
      });

      // Clear all timers
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      sectionPauseTimes.current.clear();
      sectionAccumulatedTime.current.clear();
      sectionFirstSeen.current.clear();

      // Disconnect observer
      sections.forEach(section => observer.unobserve(section));
      observer.disconnect();

      // Remove listeners
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('athena:chat-cover', handleChatCover);
      window.removeEventListener('athena:chat-uncover', handleChatUncover);
    };
  }, [pathname, trackSectionEngagement]);
}
