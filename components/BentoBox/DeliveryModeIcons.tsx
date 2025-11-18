'use client';

import React from 'react';
import type { DeliveryMode } from './types';

interface DeliveryModeIconsProps {
  deliveryModes: DeliveryMode[];
  className?: string;
}

/**
 * DeliveryModeIcons Component
 *
 * Displays small icons (14px) in the top-right corner of bento boxes
 * indicating available delivery modes (consultant, AI, framework).
 *
 * Specifications:
 * - Size: 14px × 14px
 * - Color: #777 (accessibility improvement from #999)
 * - Opacity: 0.7
 * - Position: absolute, top: 16px, right: 16px
 * - Gap: 6px between icons
 * - Tooltips: Via title attribute
 * - Accessibility: aria-label on each icon
 */
export default function DeliveryModeIcons({ deliveryModes, className = '' }: DeliveryModeIconsProps) {
  const availableModes = deliveryModes.filter(mode => mode.available);

  if (availableModes.length === 0) return null;

  return (
    <div
      className={`delivery-mode-icons ${className}`}
      style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
        zIndex: 1,
      }}
      role="group"
      aria-label="Delivery modes"
    >
      {availableModes.map((mode) => (
        <div
          key={mode.type}
          className="delivery-mode-icon"
          title={mode.label}
          style={{
            width: '14px',
            height: '14px',
            color: '#777',
            opacity: 0.7,
            cursor: 'help',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={mode.label}
          role="img"
        >
          {getIconSVG(mode.icon)}
        </div>
      ))}
    </div>
  );
}

/**
 * Returns the appropriate SVG icon for each delivery mode type
 */
function getIconSVG(icon: 'consultant' | 'ai' | 'framework'): React.ReactNode {
  switch (icon) {
    case 'consultant':
      // User/consultant icon (person silhouette)
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            fill="currentColor"
          />
        </svg>
      );
    case 'ai':
      // AI/robot icon (chat bubble with green dot indicator)
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
            fill="currentColor"
          />
          <circle cx="6" cy="6" r="1" fill="#10b981" />
        </svg>
      );
    case 'framework':
      // Framework/document icon (document with folded corner)
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
            fill="currentColor"
          />
        </svg>
      );
  }
}
