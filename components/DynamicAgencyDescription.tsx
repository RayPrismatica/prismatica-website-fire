'use client';

import { useEffect, useState } from 'react';

export default function DynamicAgencyDescription() {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/api/dynamic-content');
        const data = await response.json();
        if (data.content?.agencyDescription) {
          setDescription(data.content.agencyDescription);
        }
      } catch (error) {
        // Fallback content
        setDescription("For high-performers who realize their 70-hour weeks produce 40 hours of value. Secret Agency: where executives learn to optimize for impact, not inbox zero. Because busy and effective stopped being the same thing years ago.");
      }
    }
    loadContent();
  }, []);

  if (!description) return null;

  return <>{description}</>;
}
