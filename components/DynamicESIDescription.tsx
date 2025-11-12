'use client';

import { useEffect, useState } from 'react';

export default function DynamicESIDescription() {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/api/dynamic-content');
        const data = await response.json();
        if (data.esiDescription) {
          setDescription(data.content.esiDescription);
        }
      } catch (error) {
        // Fallback content
        setDescription("Explore, Synthesize, Ignite. Our operating system for transformation. Explore uncovers truth. Synthesize turns discovery into clarity. Ignite makes clarity executable. Research, strategy, and execution as a continuous loop.");
      }
    }
    loadContent();
  }, []);

  if (!description) return null;

  return <>{description}</>;
}
