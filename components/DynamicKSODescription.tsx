'use client';

import { useEffect, useState } from 'react';

export default function DynamicKSODescription() {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/data/dynamic-content.json');
        const data = await response.json();
        if (data.content?.ksoDescription) {
          setDescription(data.content.ksoDescription);
        }
      } catch (error) {
        // Fallback content
        setDescription("The future of discoverability isn't about links. It's about ideas. In a world where AI systems index knowledge instead of URLs, authority belongs to those who own the narrative. We dissect your business DNA and rebuild it as a knowledge graph of authority. Purpose, values, USP, and intellectual territory mapped into content that AI systems recognise, learn from, and cite.");
      }
    }
    loadContent();
  }, []);

  if (!description) return null;

  return <>{description}</>;
}
