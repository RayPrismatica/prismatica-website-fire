'use client';

import { useEffect, useState } from 'react';

export default function DynamicNewsInsight() {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/data/dynamic-content.json');
        const data = await response.json();
        if (data.content?.newsInsight) {
          setContent(data.content.newsInsight);
        }
      } catch (error) {
        // Fallback content
        setContent("Notice how every CEO says they want innovation but hires for predictability? That's not contradiction. That's institutional self-preservation disguised as strategy.");
      }
    }
    loadContent();
  }, []);

  if (!content) return null;

  return <>{content}</>;
}
