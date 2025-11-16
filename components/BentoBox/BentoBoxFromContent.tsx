'use client';

import React from 'react';
import Link from 'next/link';
import BentoBox from './BentoBox';
import type { BentoBoxFromContentProps } from './types';
import {
  parsePromptContent,
  parseBodyContent,
  parseMetadataContent,
  parseEmailTemplate,
  validateBentoContent,
  buildShareEmailUrl
} from './contentParser';

/**
 * BentoBoxFromContent
 *
 * Renders a BentoBox from JSON content definition.
 * This component bridges JSON data → BentoBox props.
 *
 * @example
 * ```tsx
 * import sirAlfie from '@/components/BentoBox/content/sir-alfie.json';
 *
 * <BentoBoxFromContent content={sirAlfie} />
 * ```
 */
export default function BentoBoxFromContent({
  content,
  dynamicData,
  functionRegistry: externalFunctionRegistry,
  onEnquire: externalOnEnquire,
  className
}: BentoBoxFromContentProps) {
  // ============================================================================
  // Validation
  // ============================================================================

  const errors = validateBentoContent(content);
  if (errors) {
    console.error(`BentoBox validation errors for "${content.id}":`, errors);
    return (
      <div style={{ padding: '20px', border: '2px solid red', borderRadius: '8px' }}>
        <h3 style={{ color: 'red' }}>BentoBox Error: {content.id}</h3>
        <ul>
          {errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
      </div>
    );
  }

  // Skip disabled bentos
  if (content.enabled === false) {
    return null;
  }

  // ============================================================================
  // Function Registry (for dynamic variables)
  // ============================================================================

  // Use external function registry if provided, otherwise use default
  const functionRegistry = externalFunctionRegistry || {
    getDeliveryDate: (serviceId: string) => {
      // Placeholder - replace with actual implementation
      const date = new Date();
      date.setDate(date.getDate() + 56); // 8 weeks from now
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
    }
  };

  // ============================================================================
  // Parse Content
  // ============================================================================

  const prompt = parsePromptContent(content.content.prompt, dynamicData);
  const title = content.content.title;
  const badge = content.content.badge;
  const bodyParagraphs = parseBodyContent(content.content.body, dynamicData);

  // Parse metadata and wrap delivery dates in <span className="delivery-date">
  const metadataText = parseMetadataContent(
    content.content.metadata,
    dynamicData,
    functionRegistry
  );

  // Convert metadata to JSX if it contains {result} replacement (dynamic dates)
  let metadata: React.ReactNode = metadataText;

  if (metadataText && content.content.metadata?.type === 'function' && content.content.metadata.template) {
    // Get the raw date value
    const dateValue = functionRegistry[content.content.metadata.function]
      ? functionRegistry[content.content.metadata.function](...(content.content.metadata.args || []))
      : '';

    // Split template by {result} to wrap date in span
    const parts = content.content.metadata.template.split('{result}');
    if (parts.length === 2 && dateValue) {
      metadata = (
        <>
          {parts[0]}
          <span className="delivery-date">{dateValue}</span>
          {parts[1]}
        </>
      );
    }
  }

  // ============================================================================
  // Parse Footer
  // ============================================================================

  const price = content.footer?.type === 'price-cta'
    ? content.footer.price
    : undefined;

  const customFooter = content.footer?.type === 'custom'
    ? (
      <div>
        <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '0', color: '#222' }}>
          {content.footer.primaryText}
        </p>
        {content.footer.secondaryText && (
          <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
            {content.footer.secondaryText}
          </p>
        )}
        {content.footer.linkButton && (
          <Link
            href={content.footer.linkButton.href}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: content.footer.linkButton.style === 'primary' ? '#D43225' : '#fff',
              color: content.footer.linkButton.style === 'primary' ? '#ffffff' : '#666',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '4px',
              transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
              border: content.footer.linkButton.style === 'primary' ? 'none' : '1px solid #e0e0e0',
              cursor: 'pointer',
              letterSpacing: '0.3px',
              marginTop: '16px'
            }}
          >
            {content.footer.linkButton.text}
          </Link>
        )}
        {content.footer.note && (
          <p style={{ fontSize: '12px', color: '#999', marginTop: '12px' }}>
            {content.footer.note}
          </p>
        )}
      </div>
    )
    : undefined;

  // ============================================================================
  // Parse Actions
  // ============================================================================

  const shareEmail = content.actions?.share?.enabled
    ? {
        subject: parseEmailTemplate(
          content.actions.share.subject || 'Worth looking at: {title}',
          content,
          typeof window !== 'undefined' ? window.location.href : ''
        ),
        body: parseEmailTemplate(
          content.actions.share.body || 'Check this out: {url}',
          content,
          typeof window !== 'undefined' ? window.location.href : ''
        )
      }
    : undefined;

  const onEnquire = content.actions?.enquire?.enabled
    ? () => {
        if (externalOnEnquire && content.actions?.enquire?.modalId) {
          externalOnEnquire(content.actions.enquire.modalId);
        } else {
          console.log('Open enquiry modal for:', content.actions?.enquire?.modalId);
        }
      }
    : undefined;

  // ============================================================================
  // Build Children (Body Paragraphs)
  // ============================================================================

  const children = (
    <>
      {bodyParagraphs.map((paragraph, index) => (
        <p
          key={index}
          style={{
            marginBottom: index === bodyParagraphs.length - 1 ? '20px' : '16px',
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#444'
          }}
        >
          {paragraph}
        </p>
      ))}
    </>
  );

  // ============================================================================
  // Render BentoBox
  // ============================================================================

  return (
    <BentoBox
      variant={content.variant}
      prompt={prompt || undefined}
      title={title}
      badge={badge}
      metadata={metadata || undefined}
      price={price}
      shareEmail={shareEmail}
      onEnquire={onEnquire}
      customFooter={customFooter}
      className={className}
      style={content.style}
    >
      {children}
    </BentoBox>
  );
}
