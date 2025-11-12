'use client';

import { useEffect, useState } from 'react';

export default function DynamicIntelligenceExample() {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/data/dynamic-content.json');
        const data = await response.json();
        if (data.content?.intelligenceExample) {
          setContent(data.content.intelligenceExample);
        }
      } catch (error) {
        // Fallback content
        setContent("Unemployment hitting 5%, for example. We read that and our mind goes to: what industries are hardest hit, and what does that tell us about which skills are becoming obsolete?");
      }
    }
    loadContent();
  }, []);

  if (!content) return null;

  return <>{content}</>;
}
