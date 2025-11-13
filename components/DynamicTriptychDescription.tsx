'use client';

import { useEffect, useState } from 'react';

interface DynamicTriptychDescriptionProps {
  content?: string;
}

export default function DynamicTriptychDescription({ content: propContent }: DynamicTriptychDescriptionProps = {}) {
  const fallback = "We examine your business through three lenses simultaneously: how you market, how you compete, how you build. Most problems live in the gaps between these. Most opportunities too.";

  const [description, setDescription] = useState<string>(propContent || '');

  useEffect(() => {
    // If content provided as prop, use it immediately
    if (propContent) {
      setDescription(propContent);
      return;
    }

    // Otherwise fetch
    async function loadContent() {
      try {
        const response = await fetch('/api/dynamic-content');
        const data = await response.json();
        if (data.triptychDescription) {
          setDescription(data.triptychDescription);
        } else {
          setDescription(fallback);
        }
      } catch (error) {
        setDescription(fallback);
      }
    }
    loadContent();
  }, [propContent]);

  if (!description) return null;

  return <>{description}</>;
}
