'use client';

import { useEffect, useState } from 'react';

interface UserContentReminderProps {
  fallbackReminder: string;
}

export default function UserContentReminder({ fallbackReminder }: UserContentReminderProps) {
  const [reminder, setReminder] = useState<string>(fallbackReminder);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedContent = sessionStorage.getItem('userSeenContent');

      if (storedContent) {
        try {
          const { newsInsight } = JSON.parse(storedContent);

          // Extract brief reference from the actual content they saw
          const newsRef = extractBriefReference(newsInsight);

          setReminder(`Remember that bit on the landing page about ${newsRef}? Well, the pattern holds.`);
        } catch (error) {
          // If parsing fails, use fallback
          setReminder(fallbackReminder);
        }
      }
    }
  }, [fallbackReminder]);

  return <p>{reminder}</p>;
}

// Helper to extract a brief reference from the full text
function extractBriefReference(text: string): string {
  // Take first ~50 characters and find natural break
  const brief = text.substring(0, 60);
  const lastSpace = brief.lastIndexOf(' ');
  return lastSpace > 30 ? brief.substring(0, lastSpace) + '...' : brief + '...';
}
