'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { DeliveryMode } from './types';

interface DeliveryModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  capabilityName: string;
  deliveryModes: DeliveryMode[];
  onEnquire?: (modalId: string) => void;
}

/**
 * DeliveryModeModal Component
 *
 * Modal that displays when user clicks "Explore Options" on capabilities
 * with 2+ delivery modes. Shows each available mode with pricing (AI/framework only)
 * and appropriate CTAs.
 *
 * Desktop Specifications:
 * - Max width: 480px
 * - Padding: 32px
 * - Border radius: 12px
 * - Background: #FFFFFF
 * - Overlay: rgba(0, 0, 0, 0.25)
 * - Option cards: 16px padding, 1px border #e0e0e0, hover border #D43225
 *
 * Mobile Specifications:
 * - Position: fixed bottom (bottom sheet style)
 * - Border radius: 16px 16px 0 0
 * - Animation: slide up 300ms ease-out
 * - Touch targets: 44px minimum
 *
 * Critical: NO consulting pricing shown. Only AI (£299/mo suite) and framework pricing.
 */
export default function DeliveryModeModal({
  isOpen,
  onClose,
  capabilityName,
  deliveryModes,
  onEnquire,
}: DeliveryModeModalProps) {
  const availableModes = deliveryModes.filter(mode => mode.available);

  if (availableModes.length === 0) return null;

  const handleModeSelect = (mode: DeliveryMode) => {
    switch (mode.cta.action) {
      case 'enquire':
        if (onEnquire && mode.cta.modalId) {
          onEnquire(mode.cta.modalId);
        }
        onClose();
        break;
      case 'link':
        if (mode.cta.href) {
          window.location.href = mode.cta.href;
        }
        onClose();
        break;
      case 'external':
        if (mode.cta.href) {
          window.open(mode.cta.href, '_blank', 'noopener,noreferrer');
        }
        onClose();
        break;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* Modal container */}
        <div className="fixed inset-0 overflow-y-auto">
          {/* Desktop: Centered modal */}
          <div className="hidden md:flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all"
                style={{
                  maxWidth: '480px',
                  padding: '32px',
                  borderRadius: '12px',
                }}
              >
                {/* Modal header */}
                <Dialog.Title
                  as="h3"
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#222',
                    marginBottom: '8px',
                    fontFamily: '"Noto Sans", sans-serif',
                  }}
                >
                  {capabilityName}
                </Dialog.Title>

                <p
                  style={{
                    fontSize: '15px',
                    color: '#666',
                    marginBottom: '24px',
                    fontFamily: '"Noto Sans", sans-serif',
                  }}
                >
                  Choose how you want to access this capability:
                </p>

                {/* Delivery mode options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {availableModes.map((mode) => (
                    <button
                      key={mode.type}
                      onClick={() => handleModeSelect(mode)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        background: '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        width: '100%',
                        minHeight: '44px', // Touch target minimum
                      }}
                      className="delivery-mode-option"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#D43225';
                        e.currentTarget.style.backgroundColor = '#fafafa';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                        e.currentTarget.style.backgroundColor = '#fff';
                      }}
                      aria-label={`Select ${getModeLabel(mode.type)}`}
                    >
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#222',
                          marginBottom: mode.pricing ? '4px' : '8px',
                          fontFamily: '"Noto Sans", sans-serif',
                        }}
                      >
                        {getModeLabel(mode.type)}
                      </span>

                      {/* Only show pricing for AI products and frameworks (NOT consulting) */}
                      {mode.pricing && mode.type !== 'consulting' && (
                        <span
                          style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '8px',
                            fontFamily: '"Noto Sans", sans-serif',
                          }}
                        >
                          {mode.pricing}
                        </span>
                      )}

                      <span
                        style={{
                          fontSize: '14px',
                          color: '#D43225',
                          fontWeight: 500,
                          fontFamily: '"Noto Sans", sans-serif',
                        }}
                      >
                        {mode.cta.text} →
                      </span>
                    </button>
                  ))}
                </div>

                {/* Cancel button */}
                <button
                  onClick={onClose}
                  style={{
                    marginTop: '24px',
                    width: '100%',
                    padding: '12px',
                    minHeight: '44px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    background: '#fff',
                    color: '#666',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: '"Noto Sans", sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                  aria-label="Cancel and close modal"
                >
                  Cancel
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>

          {/* Mobile: Bottom sheet */}
          <div className="flex md:hidden min-h-full items-end">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="ease-in duration-200"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-full opacity-0"
            >
              <Dialog.Panel
                className="w-full transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all"
                style={{
                  borderRadius: '16px 16px 0 0',
                  padding: '24px',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                }}
              >
                {/* Modal header */}
                <Dialog.Title
                  as="h3"
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#222',
                    marginBottom: '8px',
                    fontFamily: '"Noto Sans", sans-serif',
                  }}
                >
                  {capabilityName}
                </Dialog.Title>

                <p
                  style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '20px',
                    fontFamily: '"Noto Sans", sans-serif',
                  }}
                >
                  Choose how you want to access this capability:
                </p>

                {/* Delivery mode options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {availableModes.map((mode) => (
                    <button
                      key={mode.type}
                      onClick={() => handleModeSelect(mode)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        background: '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        width: '100%',
                        minHeight: '64px', // Larger touch target on mobile
                      }}
                      className="delivery-mode-option"
                      aria-label={`Select ${getModeLabel(mode.type)}`}
                    >
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#222',
                          marginBottom: mode.pricing ? '4px' : '8px',
                          fontFamily: '"Noto Sans", sans-serif',
                        }}
                      >
                        {getModeLabel(mode.type)}
                      </span>

                      {/* Only show pricing for AI products and frameworks (NOT consulting) */}
                      {mode.pricing && mode.type !== 'consulting' && (
                        <span
                          style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '8px',
                            fontFamily: '"Noto Sans", sans-serif',
                          }}
                        >
                          {mode.pricing}
                        </span>
                      )}

                      <span
                        style={{
                          fontSize: '14px',
                          color: '#D43225',
                          fontWeight: 500,
                          fontFamily: '"Noto Sans", sans-serif',
                        }}
                      >
                        {mode.cta.text} →
                      </span>
                    </button>
                  ))}
                </div>

                {/* Cancel button */}
                <button
                  onClick={onClose}
                  style={{
                    marginTop: '20px',
                    width: '100%',
                    padding: '14px',
                    minHeight: '48px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    background: '#fff',
                    color: '#666',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: '"Noto Sans", sans-serif',
                  }}
                  aria-label="Cancel and close modal"
                >
                  Cancel
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/**
 * Helper function to get human-readable labels for delivery mode types
 */
function getModeLabel(type: string): string {
  switch (type) {
    case 'consulting':
      return 'Work with a Consultant';
    case 'ai-product':
      return 'AI Product';
    case 'framework':
      return 'Self-Serve Framework';
    default:
      return type;
  }
}
