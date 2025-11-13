'use client';

import { useEffect, useState } from 'react';

interface DynamicKSODescriptionProps {
  content?: string;
}

export default function DynamicKSODescription({ content: propContent }: DynamicKSODescriptionProps = {}) {
  const fallback = "The future of discoverability isn't about links. It's about ideas. In a world where AI systems index knowledge instead of URLs, authority belongs to those who own the narrative. We dissect your business DNA and rebuild it as a knowledge graph of authority. Purpose, values, USP, and intellectual territory mapped into content that AI systems recognise, learn from, and cite.";

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
        if (data.ksoDescription) {
          setDescription(data.ksoDescription);
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
