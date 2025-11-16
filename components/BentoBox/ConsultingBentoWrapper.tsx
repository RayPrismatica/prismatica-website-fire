'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { BentoBoxFromContent } from './index';
import EnquiryModal from '@/components/EnquiryModal';
import type { BentoContent } from './types';

/**
 * Helper function to calculate delivery date from service config
 * Reads durationWeeks and bufferWeeks directly from the bento's service config
 */
function getDeliveryDate(bento: BentoContent): string {
  if (!bento.service) return '[DATE]';
  const totalWeeks = bento.service.durationWeeks + (bento.service.bufferWeeks || 0);
  if (typeof window === 'undefined') return '[DATE]';
  return new Date(Date.now() + (totalWeeks * 7 * 24 * 60 * 60 * 1000))
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
}

/**
 * Wrapper component that handles:
 * - Dynamic content fetching from API
 * - Function registry for delivery date calculations
 * - Enquire modal state management
 * - Passing all props to BentoBoxFromContent
 *
 * This removes boilerplate from page components.
 */
interface ConsultingBentoWrapperProps {
  content: BentoContent;
  className?: string;
}

export function ConsultingBentoWrapper({ content, className }: ConsultingBentoWrapperProps) {
  const [dynamicContent, setDynamicContent] = useState<any>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState<BentoContent | null>(null);

  // Load dynamic content from API on mount
  useEffect(() => {
    fetch('/api/dynamic-content')
      .then(res => res.json())
      .then(setDynamicContent)
      .catch(err => console.error('Failed to load dynamic content:', err));
  }, []);

  // Function registry for dynamic content
  const functionRegistry = {
    getDeliveryDate: () => getDeliveryDate(content)
  };

  // Handler for enquire action
  const handleEnquire = () => {
    setEnquiryModalOpen(content);
  };

  return (
    <>
      <BentoBoxFromContent
        content={content}
        dynamicData={dynamicContent}
        functionRegistry={functionRegistry}
        onEnquire={handleEnquire}
        className={className}
      />

      {enquiryModalOpen && enquiryModalOpen.service && (
        <EnquiryModal
          serviceName={enquiryModalOpen.id}
          serviceDurationWeeks={enquiryModalOpen.service.durationWeeks}
          basePrice={String(enquiryModalOpen.service.basePrice)}
          onClose={() => setEnquiryModalOpen(null)}
        />
      )}
    </>
  );
}

/**
 * Provider component for pages with multiple consulting bentos.
 * Centralizes dynamic content fetching and modal state for all bentos on the page.
 */
interface ConsultingBentoProviderProps {
  bentos: BentoContent[];
  children: (props: {
    dynamicContent: any;
    functionRegistry: Record<string, (...args: any[]) => any>;
    onEnquire: (modalId: string) => void;
  }) => ReactNode;
}

export function ConsultingBentoProvider({ bentos, children }: ConsultingBentoProviderProps) {
  const [dynamicContent, setDynamicContent] = useState<any>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState<string | null>(null);

  // Create lookup map from bento ID to bento object
  const bentoMap = React.useMemo(() => {
    const map: Record<string, BentoContent> = {};
    bentos.forEach(bento => {
      map[bento.id] = bento;
    });
    return map;
  }, [bentos]);

  // Load dynamic content from API on mount
  useEffect(() => {
    fetch('/api/dynamic-content')
      .then(res => res.json())
      .then(setDynamicContent)
      .catch(err => console.error('Failed to load dynamic content:', err));
  }, []);

  // Function registry for dynamic content - now accepts service ID to look up bento
  const functionRegistry = {
    getDeliveryDate: (serviceId: string) => {
      const bento = bentoMap[serviceId];
      return bento ? getDeliveryDate(bento) : '[DATE]';
    }
  };

  // Handler for enquire action
  const handleEnquire = (modalId: string) => {
    setEnquiryModalOpen(modalId);
  };

  // Get the bento for the modal
  const modalBento = enquiryModalOpen ? bentoMap[enquiryModalOpen] : null;

  return (
    <>
      {children({
        dynamicContent,
        functionRegistry,
        onEnquire: handleEnquire
      })}

      {modalBento && modalBento.service && (
        <EnquiryModal
          serviceName={modalBento.id}
          serviceDurationWeeks={modalBento.service.durationWeeks}
          basePrice={String(modalBento.service.basePrice)}
          onClose={() => setEnquiryModalOpen(null)}
        />
      )}
    </>
  );
}
