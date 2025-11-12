'use client';

import { useEffect, useState } from 'react';

export default function DynamicServiceDescription() {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/data/dynamic-content.json');
        const data = await response.json();
        if (data.content?.serviceDescription) {
          setDescription(data.content.serviceDescription);
        }
      } catch (error) {
        // Fallback content
        setDescription("Dissect your business from its root reason to exist. Then cascade that purpose through every system and touchpoint. Inside-out authenticity that strengthens both internal culture and external message. Purpose as operating system, not marketing tagline.");
      }
    }
    loadContent();
  }, []);

  if (!description) return null;

  return <>{description}</>;
}
