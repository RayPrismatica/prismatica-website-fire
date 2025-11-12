'use client';

import { useEffect, useState } from 'react';

interface DynamicContentData {
  newsInsight: string;
  patternInsight: string;
  intelligenceExample: string;
}

export default function DynamicIntelligenceExample() {
  const [content, setContent] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchContent() {
      try {
        const response = await fetch('/api/dynamic-content', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data: DynamicContentData = await response.json();

        if (mounted && data.intelligenceExample) {
          setContent(data.intelligenceExample);
          setIsLoaded(true);
        }
      } catch (error) {
        console.log('Using fallback content');
        if (mounted) {
          setContent("Markets shifted yesterday, for example. We read that and our mind goes to: what changed in the underlying incentive structure?");
          setIsLoaded(true);
        }
      }
    }

    fetchContent();

    return () => {
      mounted = false;
    };
  }, []);

  if (!content) return null;

  return (
    <p>
      {content}
    </p>
  );
}
