'use client';

import { useEffect, useState } from 'react';

export default function DynamicTriptychDescription() {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/api/dynamic-content');
        const data = await response.json();
        if (data.triptychDescription) {
          setDescription(data.triptychDescription);
        }
      } catch (error) {
        // Fallback content
        setDescription("We examine your business through three lenses simultaneously: how you market, how you compete, how you build. Most problems live in the gaps between these. Most opportunities too.");
      }
    }
    loadContent();
  }, []);

  if (!description) return null;

  return <>{description}</>;
}
