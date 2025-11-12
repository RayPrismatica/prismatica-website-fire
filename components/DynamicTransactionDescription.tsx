'use client';

import { useEffect, useState } from 'react';

export default function DynamicTransactionDescription() {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/api/dynamic-content');
        const data = await response.json();
        if (data.transactionDescription) {
          setDescription(data.content.transactionDescription);
        }
      } catch (error) {
        // Fallback content
        setDescription("Vision to transaction to validation. Map how value exchanges actually happen across three dimensions: spiritual (emotional resonance), cognitive (understanding shifts), and tangible (measurable actions). Then design every touchpoint to trigger those transactions. Surface-level appeal meets deep-level truth. Conversion through understanding, not manipulation.");
      }
    }
    loadContent();
  }, []);

  if (!description) return null;

  return <>{description}</>;
}
