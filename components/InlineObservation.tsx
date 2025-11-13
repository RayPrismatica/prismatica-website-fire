'use client';

import { useEffect, useState } from 'react';

interface InlineObservationProps {
  content?: string;
}

export default function InlineObservation({ content: propContent }: InlineObservationProps = {}) {
  const fallback = "Right now we're watching companies panic about efficiency while missing the real pattern: their best people are solving the wrong problems brilliantly.";

  const [observation, setObservation] = useState<string>(propContent || '');

  useEffect(() => {
    // If content provided as prop, use it immediately
    if (propContent) {
      setObservation(propContent);
      return;
    }

    // Otherwise fetch
    async function loadContent() {
      try {
        const response = await fetch('/api/dynamic-content');
        const data = await response.json();
        if (data.marketObservation) {
          setObservation(data.marketObservation);
        } else {
          setObservation(fallback);
        }
      } catch (error) {
        setObservation(fallback);
      }
    }
    loadContent();
  }, [propContent]);

  if (!observation) return null;

  return <>{observation}</>;
}
