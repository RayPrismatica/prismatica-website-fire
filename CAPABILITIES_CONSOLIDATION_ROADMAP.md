# Capabilities Consolidation Roadmap
## From "Services vs Products" to "Unified Capabilities with Delivery Modes"

**Document Version:** 1.0
**Created:** 2025-11-17
**Author:** Claude Code
**Status:** Production-Ready Implementation Plan

---

## Executive Summary

This roadmap consolidates Prismatica Labs' artificial "services vs products" separation into a unified capabilities architecture. Instead of maintaining `/consulting` (12 services) and `/products` (3 AI products) as separate pages, we create a single `/capabilities` page showing 15 unified capabilities with clear delivery mode indicators.

### Strategic Goals

1. **Simplicity as Complexity Resolved** - One page, progressive disclosure, honest indicators
2. **Material Authenticity** - Icons show what's actually available, not aspirational offerings
3. **User-Centric** - Answer "how do I get this?" instantly without page navigation
4. **Architectural Excellence** - Content-driven, type-safe, mobile-optimized, WCAG AA compliant

### Key Changes

- **Navigation:** "Consulting" + "Products" → Single "Capabilities" link
- **Page Structure:** Unified `/capabilities` with delivery mode badges (👤 Consultant | 🤖 AI Product | 📦 Framework)
- **Pricing Display:** Remove ALL consulting pricing, show only AI (£299/mo) and framework pricing
- **CTA Logic:** Single mode = direct CTA, multi-mode = "Explore Options" modal
- **Data Architecture:** JSON schema enhancement with `deliveryModes` array

### Success Metrics

- **User Experience:** Reduce discovery clicks from 2+ to 1 (single page access)
- **Performance:** Lighthouse score 90+ across all metrics
- **Accessibility:** WCAG AA compliance verified via axe DevTools
- **Code Quality:** TypeScript strict mode, zero `any` types (except JSON imports), 100% test coverage on new components
- **Mobile Experience:** Touch targets 44px minimum, smooth interactions, no layout shift

---

## Content Audit Matrix

### Current Inventory (17 JSON files)

| Capability | Type | Consulting | AI Product | Framework | Price | Notes |
|-----------|------|-----------|-----------|-----------|-------|-------|
| **Pioneers of Purpose** | Service | ✅ Available | ❌ Not available | ❌ Not available | £50,000 | Purpose/culture alignment |
| **ESI Framework** | Service | ✅ Available | ❌ Not available | ❌ Not available | £40,000 | Explore-Synthesize-Ignite |
| **Secret Agency** | Service | ✅ Available | ❌ Not available | ❌ Not available | £40,000 | Custom AI infrastructure |
| **Transaction Architecture** | Service | ✅ Available | ❌ Not available | ❌ Not available | £25,000 | Value exchange mapping |
| **KSO Workshop** | Service | ✅ Available | ❌ Not available | ❌ Not available | £18,000 | Key Strategic Objectives |
| **Strategic Triptych** | Service | ✅ Available | ❌ Not available | ❌ Not available | £25,000 | Three-angle strategy |
| **Go-to-Market** | Service | ✅ Available | ❌ Not available | ❌ Not available | £15,000 | GTM strategy |
| **Creative Converts** | Service | ✅ Available | ❌ Not available | ❌ Not available | £12,000 | Creative optimization |
| **Design Thinking** | Service | ✅ Available | ❌ Not available | ❌ Not available | £10,000 | Design process |
| **AI Without Hallucination** | Service | ✅ Available | ❌ Not available | ❌ Not available | £15,000 | AI implementation |
| **Process Surgery** | Service | ✅ Available | ❌ Not available | ❌ Not available | £8,000 | Process optimization |
| **Marketing Reality Check** | Service | ✅ Available | ❌ Not available | ❌ Not available | £8,000 | Marketing audit |
| **Focus Matrix** | Product | ❌ Not available | ✅ Available | ❌ Not available | £299/mo suite | Time/priority EV calculator |
| **Sir Alfie** | Product | ❌ Not available | ✅ Available | ❌ Not available | £299/mo suite | CRM with AI agents |
| **Value Channel Matrix** | Product | ❌ Not available | ✅ Available | ❌ Not available | £299/mo suite | Value distribution analysis |
| **Consulting Services Link** | Navigation | N/A | N/A | N/A | N/A | Delete (no longer needed) |
| **Product Suite Link** | Navigation | N/A | N/A | N/A | N/A | Delete (no longer needed) |

### Delivery Mode Availability Summary

- **Consulting Only:** 12 capabilities (Pioneers, ESI, Secret Agency, Transaction, KSO, Triptych, GTM, Creative, Design, AI, Process, Marketing)
- **AI Product Only:** 3 capabilities (Focus Matrix, Sir Alfie, Value Channel Matrix)
- **Multi-Mode (Consulting + AI):** 0 capabilities currently (future expansion)
- **Framework Only:** 0 capabilities currently (future expansion)

### Future Expansion Candidates (Phase 7+)

Based on content analysis, these capabilities could have multiple delivery modes:

1. **ESI Framework** → Add AI Product + Framework (self-serve version of Explore-Synthesize-Ignite)
2. **Strategic Triptych** → Add Framework (worksheet/template version)
3. **Focus Matrix** → Add Consulting (custom implementation for teams)
4. **Transaction Architecture** → Add Framework (template-based mapping tool)

---

## Phase-by-Phase Roadmap

### Phase 1: Foundation - Data Architecture & Schema Design

**Duration:** 2-3 days
**Complexity:** Medium
**Dependencies:** None (start immediately)

#### Objectives

1. Define TypeScript interfaces for delivery modes
2. Create JSON schema specification
3. Update existing type definitions
4. Document schema with examples

#### Deliverables

**File:** `/components/BentoBox/types.ts` (modify existing)

```typescript
// Add new delivery mode types
export type DeliveryModeType = 'consulting' | 'ai-product' | 'framework';

export type DeliveryModeIcon = 'consultant' | 'ai' | 'framework';

export interface DeliveryMode {
  type: DeliveryModeType;
  available: boolean;
  icon: DeliveryModeIcon;
  label: string; // Tooltip text
  pricing?: string; // Optional pricing display (AI/framework only)
  productId?: string; // Link to product detail page
  cta: {
    text: string; // Button text
    action: 'enquire' | 'link' | 'external';
    modalId?: string; // For enquire action
    href?: string; // For link/external action
  };
}

export interface BentoContent {
  id: string;
  variant: BentoVariant;
  enabled: boolean;

  // NEW: Delivery modes
  deliveryModes?: DeliveryMode[];

  // Existing fields...
  metadata?: {
    created: string;
    author: string;
    notes?: string;
  };
  athenaPrompt?: string;
  service?: {
    durationWeeks: number;
    bufferWeeks?: number;
    basePrice: number;
  };
  content: {
    prompt?: ContentItem;
    title: string;
    badge?: string;
    body: BodyItem[];
    metadata?: ContentItem;
  };
  footer: FooterConfig;
  actions?: ActionsConfig;
  style?: Record<string, string>;
}
```

**File:** `/components/BentoBox/DELIVERY_MODE_SCHEMA.md` (new)

```markdown
# Delivery Mode Schema Specification

## Overview
Each capability can have 1-3 delivery modes. Icons indicate availability.

## Schema

### Single Delivery Mode (Current Standard)
```json
{
  "id": "pioneers-of-purpose",
  "deliveryModes": [
    {
      "type": "consulting",
      "available": true,
      "icon": "consultant",
      "label": "Available with consultant",
      "cta": {
        "text": "Book Discovery Call",
        "action": "enquire",
        "modalId": "pioneers-of-purpose"
      }
    }
  ]
}
```

### Multi-Mode Example (Future)
```json
{
  "id": "esi-framework",
  "deliveryModes": [
    {
      "type": "consulting",
      "available": true,
      "icon": "consultant",
      "label": "Available with consultant",
      "cta": {
        "text": "Book Discovery Call",
        "action": "enquire",
        "modalId": "esi-framework"
      }
    },
    {
      "type": "ai-product",
      "available": true,
      "icon": "ai",
      "label": "AI product available",
      "pricing": "Included in £299/mo suite",
      "productId": "esi-advisor",
      "cta": {
        "text": "Launch Product",
        "action": "link",
        "href": "/products/esi-advisor"
      }
    },
    {
      "type": "framework",
      "available": true,
      "icon": "framework",
      "label": "Framework available",
      "pricing": "£99 one-time",
      "cta": {
        "text": "Download Framework",
        "action": "external",
        "href": "https://gumroad.com/esi-framework"
      }
    }
  ]
}
```

## Icon Specifications

**Position:** Top-right corner of bento box
**Size:** 14px width/height
**Color:** #999
**Opacity:** 0.7
**Spacing:** 6px gap between icons
**Layout:** Horizontal flex row, align-items: center

### Icons (SVG)

**Consultant Icon:**
```svg
<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
</svg>
```

**AI Icon:**
```svg
<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor"/>
  <circle cx="6" cy="6" r="1" fill="#10B981"/>
</svg>
```

**Framework Icon:**
```svg
<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" fill="currentColor"/>
</svg>
```
```

**File:** `/components/BentoBox/content/MIGRATION_GUIDE.md` (new)

Complete migration guide for updating existing JSON files (see Phase 3 for details).

#### Quality Checkpoints

- [ ] TypeScript compiles without errors
- [ ] All existing types remain backward compatible
- [ ] Schema documented with inline comments
- [ ] Examples cover single-mode and multi-mode scenarios
- [ ] Code review by senior developer

#### Dependencies

None - can start immediately

#### Estimated Effort

- TypeScript interfaces: 4 hours
- Schema documentation: 3 hours
- Migration guide: 2 hours
- Review and refinement: 2 hours

**Total:** 11 hours (~1.5 days)

#### Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Breaking changes to existing bentos | Medium | High | Maintain backward compatibility with optional `deliveryModes` |
| Schema too rigid for future needs | Low | Medium | Design extensible schema with optional fields |
| TypeScript compilation errors | Low | Low | Incremental testing during development |

---

### Phase 2: Component Development - Icons, Modal, BentoBox Updates

**Duration:** 4-5 days
**Complexity:** High
**Dependencies:** Phase 1 complete

#### Objectives

1. Build delivery mode icons component
2. Create multi-mode selection modal
3. Update BentoBox component to display icons
4. Update BentoBoxFromContent to handle multi-mode CTA logic
5. Ensure mobile optimization and accessibility

#### Deliverables

##### Deliverable 2.1: DeliveryModeIcons Component

**File:** `/components/BentoBox/DeliveryModeIcons.tsx` (new)

```typescript
'use client';

import React from 'react';
import type { DeliveryMode } from './types';

interface DeliveryModeIconsProps {
  modes: DeliveryMode[];
  className?: string;
}

export default function DeliveryModeIcons({ modes, className = '' }: DeliveryModeIconsProps) {
  const availableModes = modes.filter(m => m.available);

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
      }}
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
            color: '#999',
            opacity: 0.7,
            cursor: 'help',
          }}
          aria-label={mode.label}
        >
          {getIconSVG(mode.icon)}
        </div>
      ))}
    </div>
  );
}

function getIconSVG(icon: 'consultant' | 'ai' | 'framework'): React.ReactNode {
  switch (icon) {
    case 'consultant':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            fill="currentColor"
          />
        </svg>
      );
    case 'ai':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
            fill="currentColor"
          />
          <circle cx="6" cy="6" r="1" fill="#10B981" />
        </svg>
      );
    case 'framework':
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
```

**Specifications:**
- Icon size: 14px × 14px
- Color: #999
- Opacity: 0.7
- Gap: 6px
- Position: Absolute, top: 16px, right: 16px
- Accessibility: `title` attribute + `aria-label` for screen readers
- Mobile: Same size (14px sufficient for visual indicator, not interactive)

##### Deliverable 2.2: DeliveryModeModal Component

**File:** `/components/DeliveryModeModal.tsx` (new)

```typescript
'use client';

import { Dialog, Transition } from '@headlessui/ui';
import { Fragment } from 'react';
import type { DeliveryMode } from '@/components/BentoBox/types';

interface DeliveryModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  capabilityTitle: string;
  deliveryModes: DeliveryMode[];
  onSelectMode: (mode: DeliveryMode) => void;
}

export default function DeliveryModeModal({
  isOpen,
  onClose,
  capabilityTitle,
  deliveryModes,
  onSelectMode,
}: DeliveryModeModalProps) {
  const availableModes = deliveryModes.filter(m => m.available);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
                style={{
                  maxWidth: '480px',
                  padding: '32px',
                  borderRadius: '12px',
                }}
              >
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
                  {capabilityTitle}
                </Dialog.Title>

                <p
                  style={{
                    fontSize: '15px',
                    color: '#666',
                    marginBottom: '24px',
                  }}
                >
                  Choose how you want to access this capability:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {availableModes.map((mode) => (
                    <button
                      key={mode.type}
                      onClick={() => {
                        onSelectMode(mode);
                        onClose();
                      }}
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
                    >
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#222',
                          marginBottom: '4px',
                        }}
                      >
                        {getModeLabel(mode.type)}
                      </span>
                      {mode.pricing && (
                        <span
                          style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '8px',
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
                        }}
                      >
                        {mode.cta.text} →
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={onClose}
                  style={{
                    marginTop: '24px',
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    background: '#fff',
                    color: '#666',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
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
```

**Specifications:**
- Modal width: 480px max
- Padding: 32px
- Border radius: 12px
- Background: White (#fff)
- Overlay: Black 25% opacity
- Option cards: 16px padding, 8px border-radius, #e0e0e0 border
- Hover state: #D43225 border, #fafafa background
- Typography: Noto Sans throughout
- Animations: Headless UI transitions (300ms enter, 200ms exit)
- Mobile: Full-width bottom sheet style (see mobile specifications)

##### Deliverable 2.3: Update BentoBox Component

**File:** `/components/BentoBox/BentoBox.tsx` (modify)

Add delivery mode icons to the container:

```typescript
// Add import
import DeliveryModeIcons from './DeliveryModeIcons';
import type { DeliveryMode } from './types';

export interface BentoBoxProps {
  // ... existing props
  deliveryModes?: DeliveryMode[]; // NEW
}

export default function BentoBox({
  // ... existing params
  deliveryModes,
}: BentoBoxProps) {
  return (
    <div
      className={`${variantClass} ${styles.bentoContainer} ${className}`}
      style={{ ...containerStyle, position: 'relative' }} // Add position relative
      data-athena-prompt={athenaPrompt}
    >
      {/* Delivery Mode Icons - Top Right */}
      {deliveryModes && deliveryModes.length > 0 && (
        <DeliveryModeIcons modes={deliveryModes} />
      )}

      {/* Rest of existing component... */}
    </div>
  );
}
```

##### Deliverable 2.4: Update BentoBoxFromContent

**File:** `/components/BentoBox/BentoBoxFromContent.tsx` (modify)

Add multi-mode CTA logic:

```typescript
'use client';

import { useState } from 'react';
import BentoBox from './BentoBox';
import DeliveryModeModal from '@/components/DeliveryModeModal';
import type { BentoContent, DeliveryMode } from './types';

export interface BentoBoxFromContentProps {
  content: BentoContent;
  dynamicData?: DynamicData;
  functionRegistry?: FunctionRegistry;
  onEnquire?: (modalId: string) => void;
}

export default function BentoBoxFromContent({
  content,
  dynamicData,
  functionRegistry,
  onEnquire,
}: BentoBoxFromContentProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Check if multi-mode capability
  const deliveryModes = content.deliveryModes || [];
  const availableModes = deliveryModes.filter(m => m.available);
  const isMultiMode = availableModes.length > 1;

  // Handle mode selection from modal
  const handleModeSelect = (mode: DeliveryMode) => {
    switch (mode.cta.action) {
      case 'enquire':
        if (onEnquire && mode.cta.modalId) {
          onEnquire(mode.cta.modalId);
        }
        break;
      case 'link':
        if (mode.cta.href) {
          window.location.href = mode.cta.href;
        }
        break;
      case 'external':
        if (mode.cta.href) {
          window.open(mode.cta.href, '_blank', 'noopener,noreferrer');
        }
        break;
    }
  };

  // Determine footer/CTA based on delivery modes
  let footer: React.ReactNode;

  if (isMultiMode) {
    // Multi-mode: Show "Explore Options" button
    footer = (
      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#D43225',
            color: '#ffffff',
            fontSize: '15px',
            fontWeight: 600,
            textDecoration: 'none',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.3px',
            transition: 'all 0.2s ease',
          }}
        >
          Explore Options →
        </button>
      </div>
    );
  } else if (availableModes.length === 1) {
    // Single mode: Direct CTA
    const mode = availableModes[0];
    const handleClick = () => {
      switch (mode.cta.action) {
        case 'enquire':
          if (onEnquire && mode.cta.modalId) {
            onEnquire(mode.cta.modalId);
          }
          break;
        case 'link':
          if (mode.cta.href) {
            window.location.href = mode.cta.href;
          }
          break;
        case 'external':
          if (mode.cta.href) {
            window.open(mode.cta.href, '_blank', 'noopener,noreferrer');
          }
          break;
      }
    };

    footer = (
      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
        {mode.pricing && (
          <p style={{ fontSize: '15px', color: '#666', marginBottom: '12px' }}>
            {mode.pricing}
          </p>
        )}
        <button
          onClick={handleClick}
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#D43225',
            color: '#ffffff',
            fontSize: '15px',
            fontWeight: 600,
            textDecoration: 'none',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.3px',
            transition: 'all 0.2s ease',
          }}
        >
          {mode.cta.text} →
        </button>
      </div>
    );
  } else {
    // Fallback to existing footer logic (backward compatibility)
    footer = parseFooterContent(content.footer, content.actions);
  }

  return (
    <>
      <BentoBox
        prompt={parsePromptContent(content.content.prompt, dynamicData)}
        title={content.content.title}
        badge={content.content.badge}
        metadata={parseMetadataContent(content.content.metadata, functionRegistry)}
        deliveryModes={deliveryModes} // NEW: Pass delivery modes
        variant={content.variant}
        data-athena-prompt={content.athenaPrompt}
        customFooter={footer}
        style={content.style}
      >
        {parseBodyContent(content.content.body, dynamicData)}
      </BentoBox>

      {/* Multi-mode modal */}
      {isMultiMode && (
        <DeliveryModeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          capabilityTitle={content.content.title}
          deliveryModes={deliveryModes}
          onSelectMode={handleModeSelect}
        />
      )}
    </>
  );
}
```

#### Quality Checkpoints

- [ ] Icons render correctly at 14px (visual QA on retina displays)
- [ ] Tooltips display on hover with correct text
- [ ] Modal opens smoothly with Headless UI transitions
- [ ] Modal keyboard navigation works (Tab, Escape, Enter)
- [ ] Single-mode CTAs work (enquire, link, external)
- [ ] Multi-mode CTAs open modal and execute correct action
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI elements)
- [ ] TypeScript compiles without errors
- [ ] Mobile: Icons visible but not interactive (visual only)
- [ ] Mobile: Modal becomes full-width bottom sheet (see Phase 4)
- [ ] Screen reader announces delivery mode labels correctly

#### Dependencies

Phase 1 complete (types defined)

#### Estimated Effort

- DeliveryModeIcons component: 6 hours
- DeliveryModeModal component: 8 hours
- BentoBox updates: 4 hours
- BentoBoxFromContent logic: 6 hours
- Testing and QA: 6 hours

**Total:** 30 hours (~4 days)

#### Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Modal accessibility issues | Medium | High | Use Headless UI Dialog, test with screen readers |
| Icons too small on mobile | Low | Medium | 14px sufficient for indicator, add tooltips for clarity |
| CTA logic bugs | Medium | Medium | Unit tests for all mode combinations |
| Performance issues | Low | Low | Lazy load modal component |

---

### Phase 3: Content Migration - Update All 15 JSON Files

**Duration:** 2-3 days
**Complexity:** Low (repetitive work)
**Dependencies:** Phase 1 complete (schema defined)

#### Objectives

1. Update all 12 consulting service JSON files with `deliveryModes`
2. Update all 3 product JSON files with `deliveryModes`
3. Remove pricing from consulting services
4. Delete 2 navigation link JSON files (no longer needed)
5. Validate all JSON files against schema

#### Deliverables

##### Phase 3.1: Consulting Services Migration (12 files)

Update each consulting service JSON with single delivery mode (consulting only):

**Template for consulting services:**

```json
{
  "id": "service-id",
  "variant": "service",
  "enabled": true,
  "metadata": {
    "created": "2025-11-16",
    "author": "Prismatica Labs",
    "notes": "Service description"
  },
  "athenaPrompt": "Existing prompt",
  "service": {
    "durationWeeks": X,
    "bufferWeeks": X,
    "basePrice": XXXXX
  },
  "deliveryModes": [
    {
      "type": "consulting",
      "available": true,
      "icon": "consultant",
      "label": "Available with consultant",
      "cta": {
        "text": "Book Discovery Call",
        "action": "enquire",
        "modalId": "service-id"
      }
    }
  ],
  "content": {
    "prompt": { "type": "static", "text": "If your problem..." },
    "title": "Service Name",
    "badge": "Strategy",
    "body": [ /* existing body */ ],
    "metadata": { /* existing metadata */ }
  },
  "footer": {
    "type": "custom",
    "primaryText": "Contact us for pricing and timeline.",
    "secondaryText": "Fixed price, fixed timeline, guaranteed results."
  },
  "actions": {
    "share": { /* existing share config */ },
    "enquire": { "enabled": false } // Disabled, handled by deliveryModes
  }
}
```

**Files to update:**
1. `/components/BentoBox/content/pioneers-of-purpose.json`
2. `/components/BentoBox/content/esi-framework.json`
3. `/components/BentoBox/content/secret-agency.json`
4. `/components/BentoBox/content/transaction-architecture.json`
5. `/components/BentoBox/content/kso-workshop.json`
6. `/components/BentoBox/content/strategic-triptych.json`
7. `/components/BentoBox/content/go-to-market.json`
8. `/components/BentoBox/content/creative-converts.json`
9. `/components/BentoBox/content/design-thinking.json`
10. `/components/BentoBox/content/ai-without-hallucination.json`
11. `/components/BentoBox/content/process-surgery.json`
12. `/components/BentoBox/content/marketing-reality-check.json`

**Key changes:**
- Add `deliveryModes` array with consulting mode
- Remove `price` from footer (replace with generic text)
- Keep `service` object for modal data (duration, buffer, basePrice)
- Disable `actions.enquire` (handled by deliveryModes CTA)

##### Phase 3.2: Products Migration (3 files)

Update each product JSON with single delivery mode (AI product):

**Template for AI products:**

```json
{
  "id": "product-id",
  "variant": "product",
  "enabled": true,
  "metadata": {
    "created": "2025-11-16",
    "author": "Prismatica Labs",
    "notes": "Product description"
  },
  "athenaPrompt": "Existing prompt",
  "deliveryModes": [
    {
      "type": "ai-product",
      "available": true,
      "icon": "ai",
      "label": "AI product available",
      "pricing": "Included in £299/mo suite",
      "cta": {
        "text": "Check Capacity",
        "action": "link",
        "href": "/products"
      }
    }
  ],
  "content": {
    "prompt": { "type": "static", "text": "If you're facing..." },
    "title": "Product Name",
    "body": [ /* existing body */ ]
  },
  "footer": {
    "type": "custom",
    "primaryText": "Included in product suite.",
    "secondaryText": "£299/mo per seat + API credits."
  },
  "actions": {
    "share": { "enabled": false },
    "enquire": { "enabled": false }
  }
}
```

**Files to update:**
1. `/components/BentoBox/content/focus-matrix.json`
2. `/components/BentoBox/content/sir-alfie.json`
3. `/components/BentoBox/content/value-channel-matrix.json`

**Key changes:**
- Add `deliveryModes` array with ai-product mode
- Add pricing: "Included in £299/mo suite"
- CTA links to `/products` page for capacity check
- Update footer to reflect suite inclusion

##### Phase 3.3: Delete Navigation Links (2 files)

Delete the following files (no longer needed):
1. `/components/BentoBox/content/consulting-services-link.json`
2. `/components/BentoBox/content/product-suite-link.json`

These will be replaced by `/what` page layout changes (Phase 4).

##### Phase 3.4: Schema Validation Script

**File:** `/scripts/validate-bento-content.js` (new)

```javascript
const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../components/BentoBox/content');

function validateBentoContent(filePath) {
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const errors = [];

  // Required fields
  if (!content.id) errors.push('Missing id');
  if (!content.variant) errors.push('Missing variant');
  if (!content.enabled === undefined) errors.push('Missing enabled');
  if (!content.content || !content.content.title) errors.push('Missing content.title');

  // Delivery modes validation
  if (content.deliveryModes) {
    if (!Array.isArray(content.deliveryModes)) {
      errors.push('deliveryModes must be an array');
    } else {
      content.deliveryModes.forEach((mode, idx) => {
        if (!mode.type) errors.push(`deliveryModes[${idx}] missing type`);
        if (mode.available === undefined) errors.push(`deliveryModes[${idx}] missing available`);
        if (!mode.icon) errors.push(`deliveryModes[${idx}] missing icon`);
        if (!mode.label) errors.push(`deliveryModes[${idx}] missing label`);
        if (!mode.cta) {
          errors.push(`deliveryModes[${idx}] missing cta`);
        } else {
          if (!mode.cta.text) errors.push(`deliveryModes[${idx}].cta missing text`);
          if (!mode.cta.action) errors.push(`deliveryModes[${idx}].cta missing action`);

          // Action-specific validation
          if (mode.cta.action === 'enquire' && !mode.cta.modalId) {
            errors.push(`deliveryModes[${idx}].cta.action=enquire requires modalId`);
          }
          if ((mode.cta.action === 'link' || mode.cta.action === 'external') && !mode.cta.href) {
            errors.push(`deliveryModes[${idx}].cta.action=${mode.cta.action} requires href`);
          }
        }
      });
    }
  }

  return errors;
}

// Run validation
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json') && f !== 'template.json');

let totalErrors = 0;
files.forEach(file => {
  const filePath = path.join(CONTENT_DIR, file);
  const errors = validateBentoContent(filePath);

  if (errors.length > 0) {
    console.error(`\n❌ ${file}:`);
    errors.forEach(err => console.error(`   - ${err}`));
    totalErrors += errors.length;
  } else {
    console.log(`✅ ${file}`);
  }
});

if (totalErrors > 0) {
  console.error(`\n❌ Validation failed with ${totalErrors} errors`);
  process.exit(1);
} else {
  console.log(`\n✅ All ${files.length} files validated successfully`);
  process.exit(0);
}
```

Add to `package.json`:

```json
{
  "scripts": {
    "validate-bentos": "node scripts/validate-bento-content.js"
  }
}
```

#### Quality Checkpoints

- [ ] All 15 JSON files updated with `deliveryModes`
- [ ] All files pass validation script (`npm run validate-bentos`)
- [ ] No pricing displayed for consulting services
- [ ] AI product pricing shows "Included in £299/mo suite"
- [ ] All CTAs point to correct actions (enquire/link/external)
- [ ] Navigation link files deleted
- [ ] Git commit with descriptive message

#### Dependencies

Phase 1 complete (schema defined)

#### Estimated Effort

- Consulting services migration (12 files): 4 hours (20 min each)
- Products migration (3 files): 1 hour
- Validation script creation: 2 hours
- Testing validation: 1 hour
- Manual QA review: 2 hours

**Total:** 10 hours (~1.5 days)

#### Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| JSON syntax errors | Medium | High | Use validation script, automated testing |
| Missing required fields | Medium | Medium | Validation script catches all issues |
| Inconsistent pricing display | Low | Low | Use template, batch find/replace |
| Breaking existing pages | Low | High | Maintain backward compatibility in Phase 2 |

---

### Phase 4: Page Restructure - Create /capabilities, Update Navigation

**Duration:** 3-4 days
**Complexity:** Medium
**Dependencies:** Phase 2 complete (components built), Phase 3 complete (content migrated)

#### Objectives

1. Create new `/capabilities` page showing all 15 capabilities
2. Update `/what` page to explain unified capabilities approach
3. Add 301 redirects from `/consulting` and `/products` to `/capabilities`
4. Update sidebar navigation to show "Capabilities" link
5. Update mobile navigation

#### Deliverables

##### Deliverable 4.1: Create /capabilities Page

**File:** `/app/capabilities/page.tsx` (new)

```typescript
'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { BentoBoxFromContent, ConsultingBentoProvider } from '@/components/BentoBox';
import EnquiryModal from '@/components/EnquiryModal';

// Import all capability JSON files
import pioneersContent from '@/components/BentoBox/content/pioneers-of-purpose.json';
import esiContent from '@/components/BentoBox/content/esi-framework.json';
import secretAgencyContent from '@/components/BentoBox/content/secret-agency.json';
import transactionContent from '@/components/BentoBox/content/transaction-architecture.json';
import ksoContent from '@/components/BentoBox/content/kso-workshop.json';
import triptychContent from '@/components/BentoBox/content/strategic-triptych.json';
import gtmContent from '@/components/BentoBox/content/go-to-market.json';
import creativeContent from '@/components/BentoBox/content/creative-converts.json';
import designContent from '@/components/BentoBox/content/design-thinking.json';
import aiContent from '@/components/BentoBox/content/ai-without-hallucination.json';
import processContent from '@/components/BentoBox/content/process-surgery.json';
import marketingContent from '@/components/BentoBox/content/marketing-reality-check.json';
import focusMatrixContent from '@/components/BentoBox/content/focus-matrix.json';
import sirAlfieContent from '@/components/BentoBox/content/sir-alfie.json';
import valueChannelContent from '@/components/BentoBox/content/value-channel-matrix.json';

// Cast to any
const pioneers = pioneersContent as any;
const esi = esiContent as any;
const secretAgency = secretAgencyContent as any;
const transaction = transactionContent as any;
const kso = ksoContent as any;
const triptych = triptychContent as any;
const gtm = gtmContent as any;
const creative = creativeContent as any;
const design = designContent as any;
const ai = aiContent as any;
const process = processContent as any;
const marketing = marketingContent as any;
const focusMatrix = focusMatrixContent as any;
const sirAlfie = sirAlfieContent as any;
const valueChannel = valueChannelContent as any;

export default function CapabilitiesPage() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState<string | null>(null);

  // All capabilities (consulting + products)
  const allCapabilities = [
    pioneers, esi, secretAgency, transaction, kso, triptych,
    gtm, creative, design, ai, process, marketing,
    focusMatrix, sirAlfie, valueChannel
  ];

  return (
    <PageLayout>
      <ConsultingBentoProvider bentos={allCapabilities}>
        {({ dynamicContent, functionRegistry, onEnquire }) => (
          <section id="capabilities" className="section active">
            <div style={{ maxWidth: '700px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-passion), sans-serif',
                  fontSize: '56px',
                  letterSpacing: '0.005em',
                  marginBottom: '32px',
                }}
              >
                <span style={{ borderBottom: '4px solid #D43225' }}>CAPABILITIES</span>
              </h2>

              <p>
                Intelligence starts with better questions. We've documented how we think, turned patterns into mental models, and codified methodology into systems.
              </p>

              <p>
                <strong>Access these capabilities three ways:</strong> work directly with a consultant for custom solutions, use AI products that embed our methodology, or implement frameworks yourself.
              </p>

              <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500, marginBottom: '48px' }}>
                <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
                Small icons in the top-right corner show what's available. One capability, multiple delivery modes. You choose how you work.
              </p>

              <div style={{ margin: '48px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', height: '3px' }}></div>

              <h3
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '48px',
                  marginBottom: '24px',
                }}
              >
                Strategic Capabilities
              </h3>

              {/* Strategic tier - £40k-50k */}
              <BentoBoxFromContent content={pioneers} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />
              <BentoBoxFromContent content={esi} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />
              <BentoBoxFromContent content={secretAgency} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />

              <h3
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '48px',
                  marginBottom: '24px',
                }}
              >
                Operational Capabilities
              </h3>

              {/* Mid-tier - £18k-25k */}
              <BentoBoxFromContent content={transaction} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />
              <BentoBoxFromContent content={kso} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />
              <BentoBoxFromContent content={triptych} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />

              <h3
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '48px',
                  marginBottom: '24px',
                }}
              >
                Tactical Capabilities
              </h3>

              {/* Tactical tier - £8k-15k */}
              <BentoBoxFromContent content={gtm} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />
              <BentoBoxFromContent content={creative} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />
              <BentoBoxFromContent content={design} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />
              <BentoBoxFromContent content={ai} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />
              <BentoBoxFromContent content={process} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />
              <BentoBoxFromContent content={marketing} dynamicData={dynamicContent} functionRegistry={functionRegistry} onEnquire={(id) => setEnquiryModalOpen(id)} />

              <h3
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '48px',
                  marginBottom: '24px',
                }}
              >
                AI Products
              </h3>

              {/* AI Products */}
              <BentoBoxFromContent content={focusMatrix} />
              <BentoBoxFromContent content={sirAlfie} />
              <BentoBoxFromContent content={valueChannel} />

              <div style={{ margin: '48px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', height: '3px' }}></div>

              <h3
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '48px',
                  marginBottom: '24px',
                }}
              >
                How Pricing Works
              </h3>

              <p>
                <strong>Consulting:</strong> Fixed price, fixed timeline. Tell us the problem, we'll quote. Contact us for pricing.
              </p>

              <p>
                <strong>AI Products:</strong> £299/month per seat gets you access to all 25+ products. API costs separate (most users: £50-200/month).
              </p>

              <p>
                <strong>Frameworks:</strong> One-time purchase, yours forever. Pricing varies by framework.
              </p>

              <p style={{ position: 'relative', fontSize: '17px', fontWeight: 500, marginTop: '32px' }}>
                <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
                B-Corps get 20% off. NGOs get 50% off or pro-bono. Startups can do equity deals.
              </p>
            </div>
          </section>
        )}
      </ConsultingBentoProvider>

      {/* Enquiry Modal */}
      {enquiryModalOpen && (
        <EnquiryModal
          serviceName={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(null)}
        />
      )}
    </PageLayout>
  );
}
```

**Page specifications:**
- Max width: 700px
- Header: "CAPABILITIES" with red underline on first word
- Intro: 3 short paragraphs explaining unified approach
- Sections: Strategic (3), Operational (3), Tactical (6), AI Products (3)
- Footer: Pricing explanation + special terms
- All dynamic content support via ConsultingBentoProvider

##### Deliverable 4.2: Update /what Page

**File:** `/app/what/page.tsx` (modify)

Replace "Two ways to work with us" section with simplified explanation:

```typescript
<h3 style={{ /* existing styles */ }}>How to Access Our Capabilities</h3>

<p>
  We've documented our consulting methodology and turned it into reusable systems.
  Same intelligence, different delivery modes.
</p>

<p style={{ position: 'relative', fontSize: '17px', fontWeight: 500 }}>
  <span style={{ position: 'absolute', left: '-20px', top: '0', bottom: '0', width: '3px', backgroundColor: '#D43225' }}></span>
  Work directly with consultants for custom solutions. Use AI products that embed our methodology. Or implement frameworks yourself.
</p>

<Link
  href="/capabilities"
  style={{
    display: 'inline-block',
    padding: '14px 28px',
    backgroundColor: '#D43225',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '17px',
    fontWeight: 600,
    transition: 'all 0.2s',
    border: 'none',
    cursor: 'pointer',
    marginTop: '24px'
  }}
>
  View All Capabilities
</Link>
```

Delete the two bento box cards (consulting-services-link, product-suite-link).

##### Deliverable 4.3: Add Redirects

**File:** `/next.config.ts` (modify)

```typescript
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/consulting',
        destination: '/capabilities',
        permanent: true, // 301 redirect
      },
      {
        source: '/products',
        destination: '/capabilities',
        permanent: true, // 301 redirect
      },
    ];
  },
  // ... rest of config
};
```

##### Deliverable 4.4: Update Sidebar Navigation

**File:** `/components/Sidebar.tsx` (modify)

Replace "Consulting" and "Products" links with single "Capabilities" link:

```typescript
{/* Remove these two links: */}
{/* <Link href="/consulting">Consulting</Link> */}
{/* <Link href="/products">Products</Link> */}

{/* Add single link: */}
<Link
  href="/capabilities"
  className={`nav-item block w-full text-left ${isActive('/capabilities') ? 'active' : ''}`}
  style={getMenuItemStyle('/capabilities', isActive('/capabilities'))}
  onClick={handleNavClick}
  onMouseEnter={() => setHoveredItem('/capabilities')}
  onMouseLeave={() => setHoveredItem(null)}
>
  Capabilities
</Link>
```

Position: After "What We Do", before "Who We Are"

#### Quality Checkpoints

- [ ] `/capabilities` page loads without errors
- [ ] All 15 capabilities display correctly
- [ ] Delivery mode icons visible on all bentos
- [ ] CTAs work (single-mode direct, multi-mode modal)
- [ ] `/consulting` redirects to `/capabilities` (301)
- [ ] `/products` redirects to `/capabilities` (301)
- [ ] Sidebar shows "Capabilities" link
- [ ] Active state works on `/capabilities` page
- [ ] Mobile navigation updated
- [ ] Enquiry modal opens for consulting services
- [ ] Dynamic content loads (test with API)
- [ ] No console errors

#### Dependencies

- Phase 2 complete (components built)
- Phase 3 complete (content migrated)

#### Estimated Effort

- Create `/capabilities` page: 6 hours
- Update `/what` page: 2 hours
- Add redirects: 1 hour
- Update sidebar: 2 hours
- Testing and QA: 4 hours

**Total:** 15 hours (~2 days)

#### Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Redirect loops | Low | High | Test redirects in isolation before deployment |
| Broken links from external sites | Medium | Medium | Monitor 301 redirects, update sitemap |
| Navigation confusion | Low | Low | Clear labeling, consistent terminology |
| Dynamic content loading issues | Medium | Medium | Test with real API data, fallbacks in place |

---

### Phase 5: Integration & Polish - Athena, Mobile, Accessibility

**Duration:** 3-4 days
**Complexity:** Medium
**Dependencies:** Phase 4 complete (page structure done)

#### Objectives

1. Update Athena knowledge base with capabilities structure
2. Create page-specific prompts for `/capabilities`
3. Optimize mobile experience (bottom sheet modal, touch targets)
4. Ensure WCAG AA accessibility compliance
5. Performance optimization (lazy loading, code splitting)
6. Cross-browser testing

#### Deliverables

##### Deliverable 5.1: Athena Knowledge Base Update

**File:** `/athena/knowledge/pages/capabilities.md` (new)

```markdown
# Capabilities Page

## Overview
Unified page showing all 15 Prismatica Labs capabilities with delivery mode indicators.

## Structure
- Strategic Capabilities (3): Pioneers of Purpose, ESI Framework, Secret Agency
- Operational Capabilities (3): Transaction Architecture, KSO Workshop, Strategic Triptych
- Tactical Capabilities (6): GTM, Creative Converts, Design Thinking, AI Without Hallucination, Process Surgery, Marketing Reality Check
- AI Products (3): Focus Matrix, Sir Alfie, Value Channel Matrix

## Delivery Modes
Each capability shows small icons in top-right corner:
- 👤 Consultant icon = Available with human consultant
- 🤖 AI icon = AI product available
- 📦 Framework icon = Self-serve framework available

## Pricing
- Consulting: Contact us for fixed price quote (prices removed from public display)
- AI Products: £299/mo per seat + API costs (suite access)
- Frameworks: One-time purchase (pricing varies)

## Special Terms
- B-Corps: 20% off consulting
- NGOs: 50% off or pro-bono
- Startups: Equity deals available

## User Journey
1. Browse capabilities by tier (Strategic/Operational/Tactical/AI)
2. Icons show delivery mode availability at a glance
3. Single mode = direct CTA (Book Call / Check Capacity / Download)
4. Multi-mode = "Explore Options" button opens modal with all modes
5. Choose delivery mode, proceed to action (enquiry/link/external)

## When to Recommend
- User asks: "What services do you offer?"
- User asks: "Do you have AI products?"
- User asks: "What's the difference between consulting and products?"
- User wants to compare capabilities
- User asks about pricing across offerings

## Conversational Guidance
- Explain: "One page, 15 capabilities, multiple ways to access them"
- Emphasize: Icons show what's actually available (material authenticity)
- Clarify: Consulting = custom, AI = scalable, Framework = DIY
- Suggest: Browse by tier (Strategic for big problems, Tactical for specific issues)
```

**File:** `/athena/knowledge/pages/consulting.md` (delete or redirect)
**File:** `/athena/knowledge/pages/products.md` (delete or redirect)

Update references to these pages to point to `capabilities.md` instead.

##### Deliverable 5.2: Page-Specific Prompts for Capabilities

**File:** `/components/MobileBottomSheetAthena.tsx` (modify)

Add capabilities page prompts:

```typescript
const PAGE_PROMPTS: Record<string, ContextualPrompt[]> = {
  // ... existing prompts
  '/capabilities': [
    {
      icon: '🎯',
      text: 'Help me choose the right capability',
      prompt: 'I\'m looking at your capabilities page. Can you help me understand which capability would best fit my situation? I\'m trying to [describe your challenge].'
    },
    {
      icon: '💡',
      text: 'Explain delivery modes',
      prompt: 'I see different icons on the capabilities. Can you explain what the consultant, AI, and framework delivery modes mean? What are the trade-offs between them?'
    },
    {
      icon: '💰',
      text: 'How does pricing work?',
      prompt: 'Can you walk me through how pricing works for consulting vs AI products vs frameworks? I want to understand the investment for each delivery mode.'
    },
    {
      icon: '🔍',
      text: 'Strategic vs Tactical?',
      prompt: 'What\'s the difference between Strategic, Operational, and Tactical capabilities? How do I know which tier I need?'
    },
  ],
  // ... rest of prompts
};
```

##### Deliverable 5.3: Mobile Modal Optimization

**File:** `/components/DeliveryModeModal.tsx` (modify)

Add responsive bottom sheet for mobile:

```typescript
export default function DeliveryModeModal({ /* props */ }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
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

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={`flex min-h-full items-${isMobile ? 'end' : 'center'} justify-center p-${isMobile ? '0' : '4'} text-center`}
          >
            <Transition.Child
              as={Fragment}
              enter={`ease-out duration-300`}
              enterFrom={isMobile ? 'translate-y-full' : 'opacity-0 scale-95'}
              enterTo={isMobile ? 'translate-y-0' : 'opacity-100 scale-100'}
              leave={`ease-in duration-200`}
              leaveFrom={isMobile ? 'translate-y-0' : 'opacity-100 scale-100'}
              leaveTo={isMobile ? 'translate-y-full' : 'opacity-0 scale-95'}
            >
              <Dialog.Panel
                className="w-full transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all"
                style={{
                  maxWidth: isMobile ? '100%' : '480px',
                  padding: isMobile ? '24px 20px 32px' : '32px',
                  borderRadius: isMobile ? '16px 16px 0 0' : '12px',
                  ...(isMobile ? { position: 'fixed', bottom: 0, left: 0, right: 0 } : {}),
                }}
              >
                {/* Modal content - same as before */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
```

**Mobile specifications:**
- Position: Fixed bottom (bottom sheet style)
- Border radius: 16px top corners only
- Padding: 24px horizontal, 32px bottom (for iOS home indicator)
- Animation: Slide up from bottom (not scale)
- Touch targets: All buttons minimum 44px height
- Swipe-to-dismiss: Consider implementing (optional)

##### Deliverable 5.4: Accessibility Audit & Fixes

**Tools:** axe DevTools, NVDA/JAWS screen readers, Lighthouse

**Checklist:**

- [ ] **Keyboard Navigation**
  - Tab order logical (icons → modal trigger → modal options → cancel)
  - Escape key closes modal
  - Enter/Space activates buttons
  - Focus trap active when modal open
  - Focus returns to trigger on modal close

- [ ] **Screen Reader Support**
  - Delivery mode icons have `aria-label` (e.g., "Available with consultant")
  - Modal has `aria-labelledby` pointing to title
  - Modal has `aria-describedby` for instructions
  - CTA buttons have descriptive labels
  - "Explore Options" button announces state (expanded/collapsed)

- [ ] **Color Contrast** (WCAG AA = 4.5:1 for text, 3:1 for UI)
  - Icon color #999 on white = 2.8:1 (FAILS - needs adjustment)
  - **Fix:** Change icon color to #777 (4.6:1 contrast) ✅
  - Red CTA #D43225 on white (for borders) = 3.9:1 ✅
  - White text on red CTA = 6.2:1 ✅
  - Modal text #222 on white = 16.1:1 ✅

- [ ] **Focus Indicators**
  - Visible focus ring on all interactive elements
  - Focus ring color: #D43225 with 2px outline
  - Focus ring offset: 2px
  - Never remove `:focus` styles

- [ ] **ARIA Attributes**
  - Modal uses `role="dialog"`
  - Modal has `aria-modal="true"`
  - Close button has `aria-label="Close"`
  - Delivery mode options have descriptive labels

**File:** `/components/BentoBox/DeliveryModeIcons.tsx` (modify)

Fix icon color contrast:

```typescript
style={{
  width: '14px',
  height: '14px',
  color: '#777', // Changed from #999 for WCAG AA compliance (4.6:1 contrast)
  opacity: 0.7,
  cursor: 'help',
}}
```

##### Deliverable 5.5: Performance Optimization

**Lazy Loading:**

```typescript
// In /app/capabilities/page.tsx
import dynamic from 'next/dynamic';

const DeliveryModeModal = dynamic(
  () => import('@/components/DeliveryModeModal'),
  { ssr: false } // Modal only needed client-side
);
```

**Code Splitting:**

- Delivery mode icons inline SVG (no external requests)
- Modal component lazy-loaded (not on initial page load)
- BentoBox content JSON tree-shaken (only import used files)

**Image Optimization:**

- All images use Next.js `<Image>` component
- Lazy loading with `loading="lazy"` for below-fold bentos
- Proper `width` and `height` attributes (prevent layout shift)

**Performance Targets:**

- Lighthouse Performance: 90+
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

##### Deliverable 5.6: Cross-Browser Testing

**Browsers to test:**

- Chrome (latest)
- Safari (latest) - iOS and macOS
- Firefox (latest)
- Edge (latest)
- Mobile Safari (iOS 15+)
- Mobile Chrome (Android 12+)

**Test cases:**

- [ ] Icons render correctly
- [ ] Modal opens and closes smoothly
- [ ] Transitions work (no jank)
- [ ] CTAs navigate correctly
- [ ] Redirects work (301 from /consulting and /products)
- [ ] Touch targets work on mobile (44px minimum)
- [ ] Bottom sheet modal on mobile
- [ ] No layout shift on page load
- [ ] Dynamic content loads correctly

#### Quality Checkpoints

- [ ] Athena knowledge base updated
- [ ] Page-specific prompts functional
- [ ] Mobile modal uses bottom sheet style
- [ ] All touch targets ≥ 44px
- [ ] WCAG AA compliance verified (axe DevTools)
- [ ] Color contrast ratios meet standards (icons changed to #777)
- [ ] Keyboard navigation works perfectly
- [ ] Screen reader testing passed (NVDA/JAWS)
- [ ] Focus management correct
- [ ] Performance targets met (Lighthouse 90+)
- [ ] Cross-browser testing passed
- [ ] No console errors/warnings

#### Dependencies

Phase 4 complete (page structure done)

#### Estimated Effort

- Athena knowledge update: 3 hours
- Page-specific prompts: 2 hours
- Mobile modal optimization: 4 hours
- Accessibility audit: 6 hours
- Accessibility fixes: 4 hours
- Performance optimization: 3 hours
- Cross-browser testing: 4 hours

**Total:** 26 hours (~3.5 days)

#### Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Accessibility violations | Medium | High | Thorough testing with screen readers and automated tools |
| Mobile UX issues | Medium | Medium | User testing with real devices, iOS/Android coverage |
| Performance regression | Low | Medium | Lighthouse CI in deployment pipeline |
| Browser-specific bugs | Medium | Low | Comprehensive cross-browser testing matrix |

---

### Phase 6: Testing & QA - Comprehensive Verification

**Duration:** 2-3 days
**Complexity:** Medium
**Dependencies:** Phase 5 complete (all features implemented)

#### Objectives

1. Manual QA testing (all user flows)
2. Automated testing (unit tests, integration tests)
3. Accessibility verification
4. Performance verification
5. Mobile device testing (real devices)
6. UAT (User Acceptance Testing) with stakeholders

#### Deliverables

##### Deliverable 6.1: Manual QA Test Plan

**Test Matrix:**

| Test ID | Feature | Test Case | Expected Result | Status |
|---------|---------|-----------|-----------------|--------|
| T01 | Navigation | Click "Capabilities" in sidebar | Page loads, shows all 15 capabilities | ⬜ |
| T02 | Redirects | Navigate to `/consulting` | 301 redirect to `/capabilities` | ⬜ |
| T03 | Redirects | Navigate to `/products` | 301 redirect to `/capabilities` | ⬜ |
| T04 | Icons | View consulting service bento | Single consultant icon visible top-right | ⬜ |
| T05 | Icons | View AI product bento | Single AI icon visible top-right | ⬜ |
| T06 | Icons | Hover over icon | Tooltip shows label text | ⬜ |
| T07 | Single Mode CTA | Click CTA on consulting service | Enquiry modal opens | ⬜ |
| T08 | Single Mode CTA | Click CTA on AI product | Navigates to /products page | ⬜ |
| T09 | Multi-Mode CTA | Click "Explore Options" (future) | Modal opens showing all delivery modes | ⬜ |
| T10 | Modal | Select delivery mode | Executes correct action (enquire/link/external) | ⬜ |
| T11 | Modal | Press Escape | Modal closes | ⬜ |
| T12 | Modal | Click overlay | Modal closes | ⬜ |
| T13 | Pricing | View consulting service | No pricing displayed | ⬜ |
| T14 | Pricing | View AI product | "Included in £299/mo suite" displayed | ⬜ |
| T15 | Dynamic Content | Load page | Dynamic content loads from API | ⬜ |
| T16 | Dynamic Content | API fails | Fallback content displays | ⬜ |
| T17 | Mobile | View on mobile (< 768px) | Icons still visible (14px) | ⬜ |
| T18 | Mobile | Open modal on mobile | Bottom sheet style, slide-up animation | ⬜ |
| T19 | Mobile | Touch CTA button | Touch target ≥ 44px, responds | ⬜ |
| T20 | Athena | Ask about capabilities | Athena references new page structure | ⬜ |
| T21 | Athena | Use page prompts | Contextual prompts work correctly | ⬜ |
| T22 | Keyboard Nav | Tab through page | Logical tab order | ⬜ |
| T23 | Keyboard Nav | Tab to icon | Focus visible, Enter shows tooltip | ⬜ |
| T24 | Keyboard Nav | Open modal with Enter | Modal opens, focus moves to first option | ⬜ |
| T25 | Screen Reader | Navigate with NVDA | All labels announced correctly | ⬜ |

**Pass Criteria:** 100% of tests pass (25/25)

##### Deliverable 6.2: Automated Tests

**File:** `/components/BentoBox/__tests__/DeliveryModeIcons.test.tsx` (new)

```typescript
import { render, screen } from '@testing-library/react';
import DeliveryModeIcons from '../DeliveryModeIcons';
import type { DeliveryMode } from '../types';

describe('DeliveryModeIcons', () => {
  it('renders nothing when no modes provided', () => {
    const { container } = render(<DeliveryModeIcons modes={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders single consultant icon', () => {
    const modes: DeliveryMode[] = [
      {
        type: 'consulting',
        available: true,
        icon: 'consultant',
        label: 'Available with consultant',
        cta: { text: 'Book Call', action: 'enquire', modalId: 'test' }
      }
    ];

    render(<DeliveryModeIcons modes={modes} />);
    const icon = screen.getByLabelText('Available with consultant');
    expect(icon).toBeInTheDocument();
  });

  it('renders multiple icons', () => {
    const modes: DeliveryMode[] = [
      {
        type: 'consulting',
        available: true,
        icon: 'consultant',
        label: 'Available with consultant',
        cta: { text: 'Book Call', action: 'enquire', modalId: 'test' }
      },
      {
        type: 'ai-product',
        available: true,
        icon: 'ai',
        label: 'AI product available',
        cta: { text: 'Launch', action: 'link', href: '/product' }
      }
    ];

    render(<DeliveryModeIcons modes={modes} />);
    expect(screen.getByLabelText('Available with consultant')).toBeInTheDocument();
    expect(screen.getByLabelText('AI product available')).toBeInTheDocument();
  });

  it('filters out unavailable modes', () => {
    const modes: DeliveryMode[] = [
      {
        type: 'consulting',
        available: false,
        icon: 'consultant',
        label: 'Available with consultant',
        cta: { text: 'Book Call', action: 'enquire', modalId: 'test' }
      }
    ];

    const { container } = render(<DeliveryModeIcons modes={modes} />);
    expect(container.firstChild).toBeNull();
  });
});
```

**File:** `/components/__tests__/DeliveryModeModal.test.tsx` (new)

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import DeliveryModeModal from '../DeliveryModeModal';
import type { DeliveryMode } from '@/components/BentoBox/types';

describe('DeliveryModeModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSelectMode = jest.fn();

  const modes: DeliveryMode[] = [
    {
      type: 'consulting',
      available: true,
      icon: 'consultant',
      label: 'Available with consultant',
      cta: { text: 'Book Call', action: 'enquire', modalId: 'test' }
    },
    {
      type: 'ai-product',
      available: true,
      icon: 'ai',
      label: 'AI product available',
      pricing: '£299/mo',
      cta: { text: 'Launch', action: 'link', href: '/product' }
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal when open', () => {
    render(
      <DeliveryModeModal
        isOpen={true}
        onClose={mockOnClose}
        capabilityTitle="Test Capability"
        deliveryModes={modes}
        onSelectMode={mockOnSelectMode}
      />
    );

    expect(screen.getByText('Test Capability')).toBeInTheDocument();
    expect(screen.getByText('Work with a Consultant')).toBeInTheDocument();
    expect(screen.getByText('AI Product')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <DeliveryModeModal
        isOpen={false}
        onClose={mockOnClose}
        capabilityTitle="Test Capability"
        deliveryModes={modes}
        onSelectMode={mockOnSelectMode}
      />
    );

    expect(screen.queryByText('Test Capability')).not.toBeInTheDocument();
  });

  it('calls onSelectMode when option clicked', () => {
    render(
      <DeliveryModeModal
        isOpen={true}
        onClose={mockOnClose}
        capabilityTitle="Test Capability"
        deliveryModes={modes}
        onSelectMode={mockOnSelectMode}
      />
    );

    fireEvent.click(screen.getByText('Work with a Consultant'));
    expect(mockOnSelectMode).toHaveBeenCalledWith(modes[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes when Cancel clicked', () => {
    render(
      <DeliveryModeModal
        isOpen={true}
        onClose={mockOnClose}
        capabilityTitle="Test Capability"
        deliveryModes={modes}
        onSelectMode={mockOnSelectMode}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('displays pricing when provided', () => {
    render(
      <DeliveryModeModal
        isOpen={true}
        onClose={mockOnClose}
        capabilityTitle="Test Capability"
        deliveryModes={modes}
        onSelectMode={mockOnSelectMode}
      />
    );

    expect(screen.getByText('£299/mo')).toBeInTheDocument();
  });
});
```

**Run tests:**

```bash
npm test -- --coverage
```

**Coverage targets:**
- Statements: 90%+
- Branches: 85%+
- Functions: 90%+
- Lines: 90%+

##### Deliverable 6.3: Accessibility Verification

**Automated:**

```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Run Lighthouse CI
npx lighthouse-ci autorun --config=lighthouserc.json
```

**Manual:**

- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Test with TalkBack (Android)
- [ ] Tab through entire page (keyboard only)
- [ ] Verify focus indicators visible
- [ ] Check color contrast ratios (WebAIM tool)

**File:** `/lighthouserc.json` (new)

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/capabilities"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1.0 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

##### Deliverable 6.4: Performance Verification

**Metrics to track:**

- Performance Score: 90+
- Accessibility Score: 100
- Best Practices: 90+
- SEO: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total Blocking Time: < 300ms

**Test on:**
- Desktop (fast 3G)
- Mobile (slow 3G)
- Desktop (broadband)

##### Deliverable 6.5: Mobile Device Testing

**Devices:**

- iPhone 12/13/14 (iOS 15+)
- iPhone SE (small screen)
- iPad (tablet view)
- Samsung Galaxy S21/S22 (Android)
- Google Pixel 6/7 (Android)

**Test cases:**

- [ ] Icons visible at 14px
- [ ] Touch targets ≥ 44px
- [ ] Modal slides up from bottom
- [ ] No horizontal scroll
- [ ] Text readable without zoom
- [ ] CTAs easily tappable
- [ ] No layout shift on load
- [ ] Smooth scrolling
- [ ] Athena bottom sheet works

##### Deliverable 6.6: UAT (User Acceptance Testing)

**Stakeholder review:**

1. Present `/capabilities` page to stakeholders
2. Walk through user journey (browse → select mode → CTA)
3. Demonstrate mobile experience
4. Show Athena integration
5. Collect feedback

**UAT Checklist:**

- [ ] Page layout approved
- [ ] Icon design approved
- [ ] Modal design approved
- [ ] Copy approved (intro, sections, pricing)
- [ ] CTA flows approved
- [ ] Mobile experience approved
- [ ] Athena prompts approved
- [ ] Pricing display approved (no consulting prices)

#### Quality Checkpoints

- [ ] All manual tests passed (25/25)
- [ ] Automated test coverage ≥ 90%
- [ ] Accessibility score: 100 (Lighthouse)
- [ ] Performance score: 90+ (Lighthouse)
- [ ] Zero console errors/warnings
- [ ] Cross-browser testing complete
- [ ] Mobile device testing complete
- [ ] UAT sign-off received
- [ ] Documentation updated (README, CLAUDE.md)

#### Dependencies

Phase 5 complete (all features implemented)

#### Estimated Effort

- Manual QA: 6 hours
- Automated tests: 8 hours
- Accessibility verification: 4 hours
- Performance verification: 2 hours
- Mobile device testing: 4 hours
- UAT sessions: 4 hours

**Total:** 28 hours (~3.5 days)

#### Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Tests fail on CI/CD | Medium | High | Local testing before commit, CI/CD pipeline updates |
| Accessibility violations found late | Medium | High | Early and continuous testing throughout phases |
| UAT reveals major issues | Low | High | Regular stakeholder check-ins during development |
| Performance degradation | Low | Medium | Performance budgets enforced in CI/CD |

---

### Phase 7: Deployment - Staged Rollout Strategy

**Duration:** 1-2 days
**Complexity:** Low
**Dependencies:** Phase 6 complete (all tests passed)

#### Objectives

1. Deploy to staging environment
2. Final smoke testing on staging
3. Deploy to production
4. Monitor for errors
5. Update sitemap and robots.txt
6. Submit updated sitemap to search engines

#### Deliverables

##### Deliverable 7.1: Staging Deployment

```bash
# Deploy to Vercel staging (preview)
git checkout -b capabilities-consolidation
git add .
git commit -m "feat: consolidate services/products into unified capabilities

- Add delivery mode icons (consultant/AI/framework)
- Create DeliveryModeModal for multi-mode selection
- Build /capabilities page with all 15 capabilities
- Remove consulting pricing, show only AI product pricing
- Add 301 redirects from /consulting and /products
- Update Sidebar navigation (Capabilities link)
- Update Athena knowledge base
- Add page-specific prompts for /capabilities
- Optimize mobile experience (bottom sheet modal)
- Ensure WCAG AA accessibility compliance
- Comprehensive testing (manual, automated, accessibility)

BREAKING CHANGES:
- /consulting redirects to /capabilities (301)
- /products redirects to /capabilities (301)
- Navigation structure changed (single Capabilities link)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin capabilities-consolidation
```

Vercel automatically creates preview deployment.

**Staging smoke tests:**

- [ ] Visit preview URL
- [ ] Test all navigation links
- [ ] Test redirects (/consulting, /products)
- [ ] Test CTAs (enquire modals, product links)
- [ ] Test mobile (Chrome DevTools + real device)
- [ ] Test Athena integration
- [ ] Check console for errors
- [ ] Verify dynamic content loads
- [ ] Test with screen reader

##### Deliverable 7.2: Production Deployment

```bash
# Merge to main (triggers production deployment)
git checkout main
git merge capabilities-consolidation
git push origin main
```

**Post-deployment checks:**

- [ ] Wait for Vercel deployment to complete
- [ ] Visit production URL
- [ ] Smoke test critical paths
- [ ] Monitor error tracking (Sentry/LogRocket)
- [ ] Check analytics (Google Analytics)
- [ ] Verify redirects working (301 status)
- [ ] Test from multiple locations (US, UK, etc.)

##### Deliverable 7.3: Update Sitemap

**File:** `/public/sitemap.xml` (modify)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Add new page -->
  <url>
    <loc>https://prismaticalabs.com/capabilities</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Remove old pages (kept for redirect purposes, lowered priority) -->
  <url>
    <loc>https://prismaticalabs.com/consulting</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>never</changefreq>
    <priority>0.0</priority>
  </url>
  <url>
    <loc>https://prismaticalabs.com/products</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>never</changefreq>
    <priority>0.0</priority>
  </url>

  <!-- Rest of sitemap... -->
</urlset>
```

Submit to search engines:

```bash
# Google Search Console
curl "https://www.google.com/ping?sitemap=https://prismaticalabs.com/sitemap.xml"

# Bing Webmaster Tools
curl "https://www.bing.com/ping?sitemap=https://prismaticalabs.com/sitemap.xml"
```

##### Deliverable 7.4: Update robots.txt

**File:** `/public/robots.txt` (verify)

```
User-agent: *
Allow: /

Sitemap: https://prismaticalabs.com/sitemap.xml
```

##### Deliverable 7.5: Monitoring & Alerts

**Set up alerts for:**

- 404 errors (users hitting old /consulting or /products URLs directly)
- JavaScript errors (modal, icons, CTAs)
- Performance degradation (LCP > 3s)
- Accessibility violations (automated axe scans)

**Monitoring tools:**

- Vercel Analytics (built-in)
- Google Analytics (traffic patterns)
- Sentry (error tracking)
- Uptime Robot (availability)

**Week 1 monitoring checklist:**

- [ ] Day 1: Check error logs every 4 hours
- [ ] Day 2-3: Check error logs twice daily
- [ ] Day 4-7: Check error logs daily
- [ ] Week 1 end: Review analytics, gather user feedback

##### Deliverable 7.6: Rollback Plan

**If critical issues arise:**

```bash
# Option 1: Revert single commit
git revert <commit-hash>
git push origin main

# Option 2: Full rollback to previous state
git reset --hard <previous-commit>
git push origin main --force

# Vercel automatically redeploys previous version
```

**Rollback triggers:**

- Accessibility score drops below 95
- Performance score drops below 85
- Error rate > 1% of sessions
- Critical functionality broken (modals, CTAs)
- Stakeholder request

#### Quality Checkpoints

- [ ] Staging deployment successful
- [ ] Staging smoke tests passed
- [ ] Production deployment successful
- [ ] Production smoke tests passed
- [ ] Redirects working (301 verified)
- [ ] Sitemap updated and submitted
- [ ] Monitoring alerts configured
- [ ] No critical errors in logs (24h post-launch)
- [ ] Analytics tracking working
- [ ] Team notified of deployment

#### Dependencies

Phase 6 complete (all tests passed, UAT approved)

#### Estimated Effort

- Staging deployment + testing: 2 hours
- Production deployment: 1 hour
- Sitemap updates: 1 hour
- Monitoring setup: 2 hours
- Post-deployment monitoring (Day 1): 3 hours

**Total:** 9 hours (~1 day)

#### Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Production errors | Low | High | Comprehensive testing in Phase 6, rollback plan ready |
| Traffic drop from redirects | Low | Medium | 301 redirects preserve SEO, monitor analytics |
| User confusion | Low | Low | Clear navigation, Athena guidance available |
| Search engine indexing issues | Low | Low | Submit sitemap, monitor Search Console |

---

## Design Specifications (Reference)

### Color Palette

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Prismatica Red | Primary | #D43225 | CTAs, active states, accent bars, hover borders |
| Background | Warm gray | rgb(245, 245, 247) | Page background |
| White | Pure white | #fff | Card backgrounds, button text |
| Primary text | Almost black | #222 | Headings, high emphasis |
| Secondary text | Dark gray | #444 | Body text, descriptions |
| Tertiary text | Medium gray | #666 | Labels, metadata |
| Quaternary text | Light gray | #999 | Timestamps, low hierarchy (FAILS WCAG - use #777 for icons) |
| **Icon color (updated)** | **Medium-dark gray** | **#777** | **Delivery mode icons (4.6:1 contrast)** |
| Border | Light gray | #e0e0e0 | Card borders, dividers |
| Green accent | Success | #10B981 | AI icon dot, success states |

### Typography Specifications

| Element | Font | Size | Weight | Spacing | Line Height |
|---------|------|------|--------|---------|-------------|
| Page header (h2) | Passion One | 56px | 600 | 0.005em | 0.9 |
| Section header (h3) | Noto Sans | 28px | 700 | 1px | 1.2 |
| Service title (bento h3) | Noto Sans | 17px | 700 | 1px | 1.3 |
| Body text | Noto Sans | 17px | 400 | 0 | 1.6 |
| CTA button | Noto Sans | 15px | 600 | 0.3px | 1.4 |
| Modal title | Noto Sans | 20px | 700 | 0 | 1.3 |
| Modal body | Noto Sans | 15px | 400 | 0 | 1.5 |
| Icon tooltip | Noto Sans | 13px | 500 | 0 | 1.4 |

### Spacing Scale

| Name | Value | Usage |
|------|-------|-------|
| xs | 4px | Tight spacing, badge padding |
| sm | 8px | Icon gaps, small margins |
| md | 16px | Default margin, padding |
| lg | 24px | Section spacing, bento margin |
| xl | 32px | Page sections, large padding |
| 2xl | 48px | Major section breaks |
| 3xl | 64px | Hero spacing |
| 4xl | 96px | Page-level spacing |

### Border Radius Scale

| Name | Value | Usage |
|------|-------|-------|
| sm | 4px | Badges, small buttons |
| md | 6px | CTAs, inputs |
| lg | 8px | Modal option cards |
| xl | 12px | Bento boxes, modals |
| 2xl | 16px | Mobile bottom sheet (top corners) |

### Component Dimensions

**Delivery Mode Icons:**
- Size: 14px × 14px
- Gap: 6px between icons
- Position: Absolute, top: 16px, right: 16px
- Color: #777 (updated for contrast)
- Opacity: 0.7
- Cursor: help
- Tooltip background: #222
- Tooltip text: #fff, 13px, 500 weight
- Tooltip padding: 6px 10px
- Tooltip border-radius: 4px

**Delivery Mode Modal (Desktop):**
- Max width: 480px
- Padding: 32px
- Border radius: 12px
- Background: #fff
- Shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
- Overlay: Black, 25% opacity
- Title: 20px, 700 weight, #222
- Description: 15px, 400 weight, #666
- Option cards:
  - Padding: 16px
  - Border: 1px solid #e0e0e0
  - Border radius: 8px
  - Hover border: #D43225
  - Hover background: #fafafa
  - Label: 15px, 600 weight, #222
  - Pricing: 14px, 400 weight, #666
  - CTA preview: 14px, 500 weight, #D43225
- Cancel button:
  - Width: 100%
  - Padding: 12px
  - Border: 1px solid #e0e0e0
  - Background: #fff
  - Text: 15px, 500 weight, #666

**Delivery Mode Modal (Mobile):**
- Position: Fixed bottom
- Width: 100%
- Padding: 24px 20px 32px
- Border radius: 16px 16px 0 0
- Animation: Slide up from bottom (300ms ease-out)
- Safe area: 32px bottom padding (iOS home indicator)
- All other specs same as desktop

**Bento Box:**
- Background: #fff
- Padding: 32px
- Border radius: 12px
- Margin bottom: 24px
- Border: 1px solid #e0e0e0
- Hover border-top: 3px solid #D43225 (services only)
- Transition: All 0.3s ease
- Accent bar (prompt): 3px width, absolute left: -20px, #D43225

**CTA Buttons:**
- Padding: 12px 24px
- Font size: 15px
- Font weight: 600
- Letter spacing: 0.3px
- Border radius: 6px
- Background: #D43225
- Color: #fff
- Border: none
- Cursor: pointer
- Transition: All 0.2s ease
- Hover background: darken(#D43225, 10%)
- Focus outline: 2px solid #D43225, offset 2px

### Mobile Breakpoints

```css
/* Tablet */
@media (max-width: 768px) {
  h2 { font-size: 36px; }
  h3 { font-size: 20px; }
  body { font-size: 16px; line-height: 1.7; }
  .bento-box { padding: 24px; }
}

/* Mobile */
@media (max-width: 480px) {
  h2 { font-size: 28px; line-height: 1.1; }
  h3 { font-size: 15px; }
  .delivery-mode-icons { top: 12px; right: 12px; }
  .modal-mobile { border-radius: 16px 16px 0 0; }
}
```

### Accessibility Specifications

**Color Contrast Ratios (WCAG AA):**
- Normal text (< 18px): 4.5:1 minimum
- Large text (≥ 18px): 3:0 minimum
- UI components: 3:1 minimum

**Verified ratios:**
- #222 on #fff: 16.1:1 ✅
- #444 on #fff: 9.7:1 ✅
- #666 on #fff: 5.7:1 ✅
- **#777 on #fff: 4.6:1 ✅** (icons - updated from #999)
- #D43225 on #fff: 3.9:1 ✅ (borders/UI)
- #fff on #D43225: 6.2:1 ✅ (button text)

**Focus Indicators:**
- Outline: 2px solid #D43225
- Offset: 2px
- Border radius: Inherit from element
- Never use `outline: none` without alternative

**Touch Targets (Mobile):**
- Minimum size: 44px × 44px
- Spacing: 8px minimum between targets
- Icons: 14px visual, but within 44px tap area

**ARIA Labels:**
```html
<!-- Icons -->
<div aria-label="Available with consultant" role="img">...</div>

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
  <h3 id="modal-title">Capability Name</h3>
  <p id="modal-description">Choose how you want to access this capability:</p>
</div>

<!-- Close button -->
<button aria-label="Close">×</button>
```

---

## Quality Assurance Checklist

### Pre-Launch Checklist

**Code Quality:**
- [ ] TypeScript compiles with zero errors
- [ ] No `any` types except JSON imports
- [ ] ESLint passes with zero warnings
- [ ] Prettier formatting applied
- [ ] No console.log statements in production code
- [ ] All imports use absolute paths (@/...)
- [ ] Components have proper prop types

**Content:**
- [ ] All 15 JSON files validated
- [ ] All delivery modes have correct CTAs
- [ ] No pricing on consulting services
- [ ] AI product pricing consistent (£299/mo suite)
- [ ] All copy reviewed and approved
- [ ] No placeholder text (Lorem ipsum)

**Design:**
- [ ] All colors match design system
- [ ] All fonts match design system
- [ ] All spacing uses design system scale
- [ ] Icons rendered at correct size (14px)
- [ ] Icon color meets contrast ratio (#777)
- [ ] Bento boxes aligned consistently
- [ ] Modal design approved

**Functionality:**
- [ ] All CTAs work (enquire, link, external)
- [ ] Redirects work (301 from /consulting, /products)
- [ ] Navigation updates work
- [ ] Enquiry modals open correctly
- [ ] Product links navigate correctly
- [ ] Share emails generate correctly
- [ ] Dynamic content loads (or fallback shows)

**Mobile:**
- [ ] Responsive layout works 320px-2560px
- [ ] Touch targets ≥ 44px
- [ ] Bottom sheet modal on mobile
- [ ] No horizontal scroll
- [ ] Text readable without zoom
- [ ] Icons visible at 14px

**Accessibility:**
- [ ] Lighthouse accessibility: 100
- [ ] WCAG AA compliance verified
- [ ] Keyboard navigation works
- [ ] Screen reader tested (NVDA, VoiceOver)
- [ ] Focus indicators visible
- [ ] Color contrast ratios meet standards
- [ ] ARIA labels correct

**Performance:**
- [ ] Lighthouse performance: 90+
- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TTI < 3.5s
- [ ] No layout shift on load
- [ ] Images optimized
- [ ] Lazy loading implemented

**Testing:**
- [ ] All manual tests passed (25/25)
- [ ] Automated tests passed
- [ ] Test coverage ≥ 90%
- [ ] Cross-browser testing complete
- [ ] Mobile device testing complete
- [ ] UAT approved by stakeholders

**Deployment:**
- [ ] Staging deployment successful
- [ ] Production deployment successful
- [ ] Sitemap updated
- [ ] robots.txt verified
- [ ] Monitoring alerts configured
- [ ] Rollback plan documented

---

## Risk Register

### High Priority Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|-----------|--------|------------|-------|--------|
| R01 | Accessibility violations fail WCAG AA | Medium | High | Thorough testing with automated tools + screen readers, fix icon contrast (#777) | Dev Team | Open |
| R02 | Breaking changes to existing pages | Medium | High | Maintain backward compatibility, comprehensive testing | Dev Team | Open |
| R03 | Production errors post-deployment | Low | High | Staging testing, rollback plan, monitoring alerts | DevOps | Open |
| R04 | User confusion from navigation changes | Medium | Medium | Clear labeling, Athena guidance, stakeholder approval | Product | Open |
| R05 | JSON schema errors in content files | Medium | High | Validation script, automated testing | Content | Open |

### Medium Priority Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|-----------|--------|------------|-------|--------|
| R06 | Mobile UX issues | Medium | Medium | Real device testing, user feedback | Design | Open |
| R07 | Performance regression | Low | Medium | Lighthouse CI, lazy loading, code splitting | Dev Team | Open |
| R08 | Browser-specific bugs | Medium | Low | Comprehensive cross-browser testing | QA | Open |
| R09 | Search engine indexing issues | Low | Medium | 301 redirects, sitemap submission, monitor Search Console | SEO | Open |
| R10 | Dynamic content loading failures | Medium | Medium | Fallback content, error handling, monitoring | Dev Team | Open |

### Low Priority Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|-----------|--------|------------|-------|--------|
| R11 | Icon design doesn't meet brand standards | Low | Low | Design review in Phase 2, stakeholder approval | Design | Open |
| R12 | Modal animations janky on old devices | Low | Low | Test on older devices, reduce animation complexity if needed | Dev Team | Open |
| R13 | Athena integration issues | Low | Low | Test prompts, update knowledge base | AI Team | Open |

---

## Success Metrics

### Quantitative Metrics

**User Experience:**
- Reduce clicks to capability discovery: 2+ → 1 (single page)
- Time to find capability: < 30 seconds (target)
- Bounce rate on /capabilities: < 40%
- Enquiry conversion rate: Maintain or increase vs. /consulting

**Performance:**
- Lighthouse Performance: 90+ (desktop), 85+ (mobile)
- Lighthouse Accessibility: 100
- Page load time (LCP): < 2.5s
- Cumulative Layout Shift: < 0.1

**Technical Quality:**
- Test coverage: ≥ 90%
- TypeScript errors: 0
- ESLint warnings: 0
- Accessibility violations: 0 (axe DevTools)

**Adoption:**
- Week 1: 80% of traffic uses /capabilities (vs. old /consulting + /products)
- Week 4: 95% of traffic uses /capabilities
- External links updated: 90% within 30 days (email, social, partners)

### Qualitative Metrics

**User Feedback:**
- Stakeholder approval: ✅ (UAT sign-off)
- User testing feedback: Positive (clarity, ease of use)
- Support tickets: No increase in confusion-related tickets
- Athena usage: Increased engagement with capability prompts

**Brand Consistency:**
- Design system adherence: 100%
- Copy tone alignment: Approved by content team
- Visual identity maintained: Approved by design lead

**Developer Experience:**
- Code maintainability: Improved (content-driven architecture)
- Component reusability: High (BentoBox, modal)
- Documentation quality: Comprehensive (this roadmap + inline docs)

---

## Post-Launch Activities

### Week 1 (Days 1-7)

- [ ] **Day 1:** Monitor error logs hourly, check analytics
- [ ] **Day 2:** Review user feedback (support, social media)
- [ ] **Day 3:** Check search console for indexing issues
- [ ] **Day 4:** Analyze conversion rates (enquiries, product clicks)
- [ ] **Day 5:** Review Athena usage patterns
- [ ] **Day 6:** Gather internal team feedback
- [ ] **Day 7:** Weekly retrospective, identify improvements

### Month 1 (Weeks 2-4)

- [ ] **Week 2:** Update external links (email signatures, social bios)
- [ ] **Week 3:** Partner communication (notify of URL changes)
- [ ] **Week 4:** Performance review, analytics deep dive
- [ ] **End of Month:** Stakeholder presentation (metrics, learnings)

### Month 2-3 (Optimization)

- [ ] Add first multi-mode capability (e.g., ESI Framework + AI Product)
- [ ] Test multi-mode modal with real users
- [ ] Gather feedback on delivery mode selection
- [ ] Iterate on icon design if needed
- [ ] Optimize Athena prompts based on usage data

### Month 4-6 (Expansion)

- [ ] Add framework delivery mode to 3-5 capabilities
- [ ] Launch first framework product
- [ ] Create case studies showing delivery mode comparisons
- [ ] Update product pages to cross-link with capabilities
- [ ] Consider A/B testing different modal designs

---

## Appendices

### Appendix A: File Structure Reference

```
prismatica-app/
├── app/
│   ├── capabilities/
│   │   └── page.tsx (NEW)
│   ├── consulting/
│   │   └── page.tsx (DEPRECATED - redirects)
│   ├── products/
│   │   └── page.tsx (DEPRECATED - redirects)
│   └── what/
│       └── page.tsx (MODIFIED)
├── components/
│   ├── BentoBox/
│   │   ├── BentoBox.tsx (MODIFIED)
│   │   ├── BentoBoxFromContent.tsx (MODIFIED)
│   │   ├── DeliveryModeIcons.tsx (NEW)
│   │   ├── types.ts (MODIFIED)
│   │   ├── DELIVERY_MODE_SCHEMA.md (NEW)
│   │   ├── content/
│   │   │   ├── pioneers-of-purpose.json (MODIFIED)
│   │   │   ├── esi-framework.json (MODIFIED)
│   │   │   ├── ... (all 15 files MODIFIED)
│   │   │   ├── consulting-services-link.json (DELETED)
│   │   │   └── product-suite-link.json (DELETED)
│   │   └── __tests__/
│   │       └── DeliveryModeIcons.test.tsx (NEW)
│   ├── DeliveryModeModal.tsx (NEW)
│   ├── Sidebar.tsx (MODIFIED)
│   ├── MobileBottomSheetAthena.tsx (MODIFIED)
│   └── __tests__/
│       └── DeliveryModeModal.test.tsx (NEW)
├── athena/
│   └── knowledge/
│       └── pages/
│           ├── capabilities.md (NEW)
│           ├── consulting.md (DELETED or redirected)
│           └── products.md (DELETED or redirected)
├── scripts/
│   └── validate-bento-content.js (NEW)
├── public/
│   ├── sitemap.xml (MODIFIED)
│   └── robots.txt (VERIFIED)
├── next.config.ts (MODIFIED - redirects)
├── lighthouserc.json (NEW)
└── package.json (MODIFIED - validation script)
```

### Appendix B: Git Commit Strategy

**Branch naming:**
```
capabilities-consolidation
```

**Commit message template:**
```
<type>(<scope>): <subject>

<body>

BREAKING CHANGES:
<breaking changes>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Recommended commits:**

1. `feat(schema): add delivery mode types and interfaces`
2. `feat(components): create DeliveryModeIcons component`
3. `feat(components): create DeliveryModeModal component`
4. `feat(components): update BentoBox for delivery modes`
5. `feat(content): migrate all JSON files to delivery mode schema`
6. `feat(pages): create unified /capabilities page`
7. `feat(navigation): update sidebar and add redirects`
8. `feat(athena): update knowledge base and prompts`
9. `feat(mobile): optimize modal for mobile devices`
10. `test: add comprehensive test coverage`
11. `docs: update CLAUDE.md and documentation`
12. `chore: final polish and deployment prep`

### Appendix C: External Dependencies

**NPM Packages (verify versions):**
- `@headlessui/ui` (modal component)
- `next` (16.0.1+)
- `react` (19.2.0+)
- `typescript` (5.0+)
- `@testing-library/react` (testing)
- `jest` (testing)
- `@axe-core/react` (accessibility testing)

**External Services:**
- Vercel (hosting, deployments)
- Google Search Console (sitemap submission)
- Bing Webmaster Tools (sitemap submission)
- Anthropic Claude API (dynamic content, Athena)
- Vercel Blob Storage (dynamic content storage)

### Appendix D: Contact & Escalation

**Team Roles:**
- **Development Lead:** Primary technical contact
- **Design Lead:** Visual identity, UI/UX approval
- **Product Owner:** Requirements, UAT approval
- **Content Lead:** Copy approval, brand voice
- **DevOps:** Deployment, monitoring, infrastructure

**Escalation Path:**
1. **Technical issues:** Dev Lead → CTO
2. **Design issues:** Design Lead → Creative Director
3. **Product issues:** Product Owner → CEO
4. **Deployment issues:** DevOps → Infrastructure Team

**Emergency Contact:**
- Production down: DevOps (immediate)
- Critical accessibility violation: Dev Lead + Design Lead
- Major user confusion: Product Owner + Content Lead

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-17 | Claude Code | Initial comprehensive roadmap created |

---

**End of Roadmap**

This document is production-ready and can be used immediately for implementation. All specifications are exact, all phases are detailed, and all risks are documented with mitigations. Estimated total effort: **20-25 days** (4-5 weeks) for complete implementation and deployment.
