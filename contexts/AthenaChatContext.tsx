'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export interface EngagementData {
  id: string;
  engagement: 'skimmed' | 'viewed' | 'read' | 'engaged';
  duration: number; // seconds spent
  wordCount: number; // estimated words in section
  firstViewed: number; // timestamp
  lastViewed: number; // timestamp
}

interface ViewingHistory {
  currentPage: string;
  pagesVisited: Set<string>;
  modalsOpened: Map<string, EngagementData>;
  sectionsViewed: Map<string, EngagementData>;
}

interface AthenaChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  viewingHistory: ViewingHistory;
  trackModalOpen: (modalId: string) => void;
  trackModalClose: (modalId: string) => void;
  trackSectionEngagement: (engagement: EngagementData) => void;
  getViewingContext: () => {
    currentPage: string;
    pagesVisited: string[];
    modalsOpened: EngagementData[];
    sectionsViewed: EngagementData[];
  };
}

const AthenaChatContext = createContext<AthenaChatContextType | undefined>(undefined);

export function AthenaChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const modalTimers = useRef<Map<string, number>>(new Map());

  // Initialize viewing history - restore from sessionStorage if available
  const [viewingHistory, setViewingHistory] = useState<ViewingHistory>(() => {
    if (typeof window === 'undefined') {
      return {
        currentPage: pathname || '/',
        pagesVisited: new Set([pathname || '/']),
        modalsOpened: new Map<string, EngagementData>(),
        sectionsViewed: new Map<string, EngagementData>()
      };
    }

    try {
      const saved = sessionStorage.getItem('athena-viewing-history');
      if (saved) {
        const data = JSON.parse(saved);
        return {
          currentPage: data.currentPage || pathname || '/',
          pagesVisited: new Set(data.pagesVisited || [pathname || '/']),
          modalsOpened: new Map(data.modalsOpened || []),
          sectionsViewed: new Map(data.sectionsViewed || [])
        };
      }
    } catch (error) {
      console.warn('Failed to restore viewing history from sessionStorage:', error);
    }

    return {
      currentPage: pathname || '/',
      pagesVisited: new Set([pathname || '/']),
      modalsOpened: new Map<string, EngagementData>(),
      sectionsViewed: new Map<string, EngagementData>()
    };
  });

  // Save viewing history to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const serialized = {
        currentPage: viewingHistory.currentPage,
        pagesVisited: Array.from(viewingHistory.pagesVisited),
        modalsOpened: Array.from(viewingHistory.modalsOpened.entries()),
        sectionsViewed: Array.from(viewingHistory.sectionsViewed.entries())
      };
      sessionStorage.setItem('athena-viewing-history', JSON.stringify(serialized));
    } catch (error) {
      console.warn('Failed to save viewing history to sessionStorage:', error);
    }
  }, [viewingHistory]);

  // Track page visits whenever pathname changes
  useEffect(() => {
    if (pathname) {
      setViewingHistory(prev => ({
        currentPage: pathname,
        pagesVisited: new Set([...prev.pagesVisited, pathname]),
        modalsOpened: prev.modalsOpened,
        sectionsViewed: prev.sectionsViewed
      }));
    }
  }, [pathname]);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  // Track modal opens - start timer
  const trackModalOpen = (modalId: string) => {
    modalTimers.current.set(modalId, Date.now());
  };

  // Track modal closes - calculate engagement
  const trackModalClose = (modalId: string) => {
    const startTime = modalTimers.current.get(modalId);
    if (!startTime) return;

    const duration = Math.floor((Date.now() - startTime) / 1000);

    // Import word count utilities dynamically
    import('@/lib/wordCount').then(({ countWords, classifyEngagement }) => {
      // Try to get modal content word count
      // This is a best-effort approach - if modal is still in DOM, count words
      const modalElement = document.querySelector('[data-modal-id="' + modalId + '"]');
      const wordCount = modalElement
        ? countWords(modalElement.textContent || '')
        : 150; // Default estimate if modal already closed

      const engagement = classifyEngagement(duration, wordCount);

      const engagementData: EngagementData = {
        id: modalId,
        engagement,
        duration,
        wordCount,
        firstViewed: startTime,
        lastViewed: Date.now()
      };

      setViewingHistory(prev => {
        const updated = new Map(prev.modalsOpened);
        updated.set(modalId, engagementData);
        return { ...prev, modalsOpened: updated };
      });

      modalTimers.current.delete(modalId);
    });
  };

  // Track section engagement (called from useScrollTracking hook)
  const trackSectionEngagement = (engagement: EngagementData) => {
    setViewingHistory(prev => {
      const updated = new Map(prev.sectionsViewed);

      // If section already viewed, update with cumulative data
      const existing = updated.get(engagement.id);
      if (existing) {
        const cumulativeEngagement: EngagementData = {
          ...engagement,
          duration: existing.duration + engagement.duration,
          firstViewed: existing.firstViewed, // Keep original first view time
        };
        updated.set(engagement.id, cumulativeEngagement);
      } else {
        updated.set(engagement.id, engagement);
      }

      return { ...prev, sectionsViewed: updated };
    });
  };

  // Get serializable viewing context for API calls
  const getViewingContext = () => ({
    currentPage: viewingHistory.currentPage,
    pagesVisited: Array.from(viewingHistory.pagesVisited),
    modalsOpened: Array.from(viewingHistory.modalsOpened.values()),
    sectionsViewed: Array.from(viewingHistory.sectionsViewed.values())
  });

  return (
    <AthenaChatContext.Provider value={{
      isOpen,
      openChat,
      closeChat,
      viewingHistory,
      trackModalOpen,
      trackModalClose,
      trackSectionEngagement,
      getViewingContext
    }}>
      {children}
    </AthenaChatContext.Provider>
  );
}

export function useAthenaChat() {
  const context = useContext(AthenaChatContext);
  if (context === undefined) {
    throw new Error('useAthenaChat must be used within an AthenaChatProvider');
  }
  return context;
}
