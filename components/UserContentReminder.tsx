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
          const { newsInsight, intelligenceExample } = JSON.parse(storedContent);

          // Extract brief references from the actual content they saw
          const newsRef = extractBriefReference(newsInsight);
          const questionRef = extractBriefReference(intelligenceExample);

          setReminder(`Remember how the landing page showed ${newsRef}, and the What We Do page wondered ${questionRef}?`);
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
