'use client';

import { useEffect, useState } from 'react';

interface DynamicAgencyDescriptionProps {
  content?: string;
}

export default function DynamicAgencyDescription({ content: propContent }: DynamicAgencyDescriptionProps = {}) {
  const fallback = "For high-performers who realize their 70-hour weeks produce 40 hours of value. Secret Agency: where executives learn to optimize for impact, not inbox zero. Because busy and effective stopped being the same thing years ago.";

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
        if (data.agencyDescription) {
          setDescription(data.agencyDescription);
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
