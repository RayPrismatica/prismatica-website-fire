'use client';

import { useEffect, useState } from 'react';

export default function InlineObservation() {
  const [observation, setObservation] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/api/dynamic-content');
        const data = await response.json();
        if (data.marketObservation) {
          setObservation(data.content.marketObservation);
        } else {
          // Fallback if field doesn't exist
        }
      } catch (error) {
        // Fallback content
        setObservation("Right now we're watching companies panic about efficiency while missing the real pattern: their best people are solving the wrong problems brilliantly.");
      }
    }
    loadContent();
  }, []);

  if (!observation) return null;

  return <>{observation}</>;
}
