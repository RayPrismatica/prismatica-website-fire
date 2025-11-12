'use client';

import { useEffect } from 'react';

interface ContentTrackerProps {
  newsInsight: string;
  intelligenceExample: string;
}

export default function ContentTracker({ newsInsight, intelligenceExample }: ContentTrackerProps) {
  useEffect(() => {
    // Only store if user hasn't already seen content this session
    if (typeof window !== 'undefined' && !sessionStorage.getItem('userSeenContent')) {
      sessionStorage.setItem('userSeenContent', JSON.stringify({
        newsInsight,
        intelligenceExample,
        timestamp: new Date().toISOString()
      }));
    }
  }, [newsInsight, intelligenceExample]);

  return null; // This component doesn't render anything
}
