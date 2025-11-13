'use client';

import { useEffect } from 'react';

interface ContentTrackerProps {
  newsInsight: string;
  intelligenceExample: string;
}

export default function ContentTracker({ newsInsight, intelligenceExample }: ContentTrackerProps) {
  useEffect(() => {
    // Always update with the most recent content
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('userSeenContent', JSON.stringify({
        newsInsight,
        intelligenceExample,
        timestamp: new Date().toISOString()
      }));
    }
  }, [newsInsight, intelligenceExample]);

  return null; // This component doesn't render anything
}
