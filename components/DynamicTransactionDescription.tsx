'use client';

import { useEffect, useState } from 'react';

interface DynamicTransactionDescriptionProps {
  content?: string;
}

export default function DynamicTransactionDescription({ content: propContent }: DynamicTransactionDescriptionProps = {}) {
  const fallback = "Vision to transaction to validation. Map how value exchanges actually happen across three dimensions: spiritual (emotional resonance), cognitive (understanding shifts), and tangible (measurable actions). Then design every touchpoint to trigger those transactions. Surface-level appeal meets deep-level truth. Conversion through understanding, not manipulation.";

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
        if (data.transactionDescription) {
          setDescription(data.transactionDescription);
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
