'use client';

import { useEffect, useState } from 'react';

export default function InlineObservation() {
  const [observation, setObservation] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/data/dynamic-content.json');
        const data = await response.json();
        if (data.content?.purposeContext) {
          setObservation(data.content.purposeContext);
        }
      } catch (error) {
        // Fallback content
        setObservation("The companies surviving best are the ones whose teams already knew the answer to 'why do we exist beyond making money?'");
      }
    }
    loadContent();
  }, []);

  if (!observation) return null;

  return <>{observation}</>;
}
