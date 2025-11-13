'use client';

import { useEffect, useState } from 'react';

interface DynamicServiceDescriptionProps {
  content?: string;
}

export default function DynamicServiceDescription({ content: propContent }: DynamicServiceDescriptionProps = {}) {
  const fallback = "Dissect your business from its root reason to exist. Then cascade that purpose through every system and touchpoint. Inside-out authenticity that strengthens both internal culture and external message. Purpose as operating system, not marketing tagline.";

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
        if (data.serviceDescription) {
          setDescription(data.serviceDescription);
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
