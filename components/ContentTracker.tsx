'use client';

import { useEffect } from 'react';

interface ContentTrackerProps {
  newsInsight: string;
}

export default function ContentTracker({ newsInsight }: ContentTrackerProps) {
  useEffect(() => {
    // Always update with the most recent content
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('userSeenContent', JSON.stringify({
        newsInsight,
        timestamp: new Date().toISOString()
      }));
    }
  }, [newsInsight]);

  return null; // This component doesn't render anything
}
