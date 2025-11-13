'use client';

import { useEffect, useState } from 'react';

interface DynamicESIDescriptionProps {
  content?: string;
}

export default function DynamicESIDescription({ content: propContent }: DynamicESIDescriptionProps = {}) {
  const fallback = "Explore, Synthesize, Ignite. Our operating system for transformation. Explore uncovers truth. Synthesize turns discovery into clarity. Ignite makes clarity executable. Research, strategy, and execution as a continuous loop.";

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
        if (data.esiDescription) {
          setDescription(data.esiDescription);
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
