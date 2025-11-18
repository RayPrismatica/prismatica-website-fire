'use client';

import React from 'react';
import styles from './BentoBox.module.css';
import DeliveryModeIcons from './DeliveryModeIcons';
import type { DeliveryMode } from './types';

// ============================================================================
// TypeScript Interfaces
// ============================================================================

interface BentoBoxCTA {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

interface ShareEmailConfig {
  subject: string;
  body: string;
}

export interface BentoBoxProps {
  // Content
  prompt?: string;
  title: string;
  badge?: string; // Category badge (e.g., "Strategy", "Marketing")
  children: React.ReactNode;

  // Metadata (timeline/duration)
  metadata?: string | React.ReactNode;

  // Footer
  price?: string;

  // Standard CTAs (Share + Enquire pattern from consulting page)
  shareEmail?: ShareEmailConfig;
  onEnquire?: () => void;

  // Or custom footer content
  customFooter?: React.ReactNode;

  // Variant
  variant?: 'service' | 'link' | 'product';

  // Delivery modes (Capabilities Consolidation Phase 2)
  deliveryModes?: DeliveryMode[];

  // Athena prompt (for contextual chat)
  'data-athena-prompt'?: string;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

// ============================================================================
// BentoBox Component
// ============================================================================

export default function BentoBox({
  prompt,
  title,
  badge,
  children,
  metadata,
  price,
  shareEmail,
  onEnquire,
  customFooter,
  variant = 'service',
  deliveryModes,
  'data-athena-prompt': athenaPrompt,
  className = '',
  style = {},
}: BentoBoxProps) {
  // Determine CSS class based on variant
  const variantClass = variant === 'product' ? 'product-bento' :
                       variant === 'link' ? 'bento-link' :
                       'service-bento';

  // Base styles (from EngagementClient.tsx lines 80-86)
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    marginBottom: '24px',
    transition: 'transform 0.3s ease',
    position: 'relative', // Required for absolute positioned icons
    overflow: 'hidden', // Ensure zones don't overflow rounded corners
    ...style,
  };

  return (
    <div
      className={`${variantClass} ${styles.bentoContainer} ${className}`}
      style={containerStyle}
      data-athena-prompt={athenaPrompt}
    >
      {/* Prompt - pure typography, no decoration (Ive's approach) */}
      {prompt && (
        <p
          style={{
            fontSize: '28px',
            lineHeight: '1.3',
            fontWeight: 300,
            color: '#222',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
          }}
        >
          {prompt}
        </p>
      )}

      {/* Title */}
      <h3
        style={{
          fontSize: '17px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '20px',
          color: '#222',
        }}
      >
        {title}
      </h3>

      {/* Body content - styled paragraphs */}
      <div className="bento-body">
        {children}
      </div>

      {/* Metadata (timeline/duration) */}
      {metadata && (
        <p
          style={{
            marginBottom: '20px',
            fontSize: '13px',
            color: '#666',
            fontStyle: 'italic',
            lineHeight: '1.6',
          }}
        >
          {metadata}
        </p>
      )}

      {/* Footer section with CTAs */}
      {(price || shareEmail || onEnquire || customFooter) && (
        <>
          {customFooter ? (
            // Custom footer handles its own styling (e.g., multi-mode zones)
            customFooter
          ) : (
            <div
              className={`${variant === 'product' ? 'divider-line' : 'cta-divider'} ${styles.ctaDivider}`}
              style={{
                marginTop: 'auto',
                paddingTop: '20px',
                borderTop: '1px solid #e0e0e0',
                transition: 'border-color 0.3s ease',
                padding: prompt ? '20px 32px 0 32px' : '20px 0 0 0',
              }}
            >
            <>
              {/* Price */}
              {price && (
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: '18px',
                    marginBottom: '12px',
                    color: '#222',
                  }}
                >
                  {price}
                </p>
              )}

              {/* CTA Actions */}
              {(shareEmail || onEnquire) && (
                <div
                  className={styles.ctaActions}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                  }}
                >
                  {/* Share Link */}
                  {shareEmail && (
                    <a
                      href={`mailto:?subject=${encodeURIComponent(shareEmail.subject)}&body=${encodeURIComponent(shareEmail.body)}`}
                      title="Send to a colleague"
                      className={`service-cta-link ${styles.ctaLink}`}
                      style={{
                        color: '#666',
                        fontSize: '17px',
                        fontWeight: 400,
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        letterSpacing: '0.3px',
                        textTransform: 'none',
                      }}
                    >
                      Ask a friend?
                    </a>
                  )}

                  {/* Separator dot */}
                  {shareEmail && onEnquire && (
                    <span style={{ color: '#e0e0e0' }}>·</span>
                  )}

                  {/* Enquire Button */}
                  {onEnquire && (
                    <button
                      title="Enquire about this service"
                      className={`service-cta-btn ${styles.ctaButton}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        color: '#666',
                        fontSize: '15px',
                        fontWeight: 500,
                        transition: 'color 0.2s',
                        letterSpacing: '0.3px',
                      }}
                      onClick={onEnquire}
                    >
                      Enquire
                    </button>
                  )}
                </div>
              )}
            </>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ============================================================================
// Sub-components (for advanced composition)
// ============================================================================

/**
 * BentoBox.Body - Styled wrapper for body paragraphs
 * Ensures consistent 17px font size, 1.6 line-height, #444 color
 */
BentoBox.Body = function BentoBoxBody({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: '16px',
        fontSize: '17px',
        lineHeight: '1.6',
        color: '#444',
      }}
    >
      {children}
    </div>
  );
};

/**
 * BentoBox.Prompt - Standalone prompt line with accent bar
 */
BentoBox.Prompt = function BentoBoxPrompt({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ position: 'relative', fontSize: '16px', marginBottom: '16px' }}>
      <span className={styles.accentBar}></span>
      {children}
    </p>
  );
};
