# Delivery Mode Schema Specification

**Version:** 1.0
**Created:** 2025-11-17
**Purpose:** Define delivery mode architecture for unified capabilities system

---

## Overview

Each capability can have 1-3 delivery modes indicating how users can access that capability. Icons are displayed in the top-right corner of bento boxes to indicate availability.

**Delivery Modes:**
- **Consulting** - Human consultant-led engagement
- **AI Product** - Self-service AI-powered product
- **Framework** - Downloadable template/worksheet

---

## TypeScript Interfaces

```typescript
export type DeliveryModeType = 'consulting' | 'ai-product' | 'framework';
export type DeliveryModeIcon = 'consultant' | 'ai' | 'framework';

export interface DeliveryModeCTA {
  text: string;
  action: 'enquire' | 'link' | 'external';
  modalId?: string;  // Required for 'enquire' action
  href?: string;     // Required for 'link' or 'external' action
}

export interface DeliveryMode {
  type: DeliveryModeType;
  available: boolean;
  icon: DeliveryModeIcon;
  label: string;              // Tooltip text for accessibility
  pricing?: string;           // Optional pricing display (AI/framework only)
  productId?: string;         // Optional link to product detail page
  cta: DeliveryModeCTA;      // Call-to-action configuration
}
```

---

## JSON Schema Examples

### Single Delivery Mode (Current Standard)

Most capabilities have only one delivery mode. For single-mode capabilities, the CTA button action is used directly (no modal).

```json
{
  "id": "pioneers-of-purpose",
  "variant": "service",
  "enabled": true,
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
  ],
  "content": {
    "title": "Pioneers of Purpose",
    "badge": "Strategy",
    "body": [...]
  }
}
```

### Multi-Mode Example (Future Expansion)

For capabilities with multiple delivery modes, the primary CTA becomes "Explore Options" which opens a modal for mode selection.

```json
{
  "id": "esi-framework",
  "variant": "service",
  "enabled": true,
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
  ],
  "content": {
    "title": "ESI Framework",
    "badge": "Strategy",
    "body": [...]
  }
}
```

### AI Product Example

```json
{
  "id": "focus-matrix",
  "variant": "product",
  "enabled": true,
  "deliveryModes": [
    {
      "type": "ai-product",
      "available": true,
      "icon": "ai",
      "label": "AI product available",
      "pricing": "Included in £299/mo suite",
      "productId": "focus-matrix",
      "cta": {
        "text": "Launch Product",
        "action": "link",
        "href": "/products/focus-matrix"
      }
    }
  ],
  "content": {
    "title": "Focus Matrix",
    "badge": "AI Tools",
    "body": [...]
  }
}
```

---

## Icon Specifications

**Visual Design:**
- **Position:** Absolute, top-right corner of bento box
  - `top: 16px`
  - `right: 16px`
- **Size:** 14px width × 14px height
- **Color:** `#777` (accessible contrast requirement)
- **Opacity:** `0.7`
- **Gap:** `6px` horizontal spacing between icons
- **Layout:** Horizontal flex row, `align-items: center`

**Accessibility:**
- Each icon has `title` attribute with descriptive text
- Each icon has `aria-label` matching the `label` field
- Container has `aria-label="Delivery modes"`
- Cursor: `help` (indicates tooltip available)

### Icon SVG Markup

#### Consultant Icon
```svg
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path
    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
    fill="currentColor"
  />
</svg>
```

#### AI Icon
```svg
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path
    d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
    fill="currentColor"
  />
  <circle cx="6" cy="6" r="1" fill="#10B981" />
</svg>
```

#### Framework Icon
```svg
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path
    d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
    fill="currentColor"
  />
</svg>
```

---

## CTA Logic

### Single-Mode Capabilities
When `deliveryModes.length === 1`:
- Display the single mode's CTA directly
- Button text from `deliveryModes[0].cta.text`
- Button action from `deliveryModes[0].cta.action`

### Multi-Mode Capabilities
When `deliveryModes.length > 1`:
- Primary CTA button displays "Explore Options"
- Clicking opens `DeliveryModeModal` component
- Modal displays all available modes as selectable cards
- User selects preferred mode → executes that mode's CTA

---

## Pricing Display Rules

**Consulting Services:**
- NEVER display pricing in bento box
- Pricing discussion happens during discovery call
- Footer displays "Custom pricing" or similar

**AI Products:**
- Display pricing in delivery mode: `"pricing": "Included in £299/mo suite"`
- Show in modal option card
- Can display in footer if single-mode AI product

**Frameworks:**
- Display pricing in delivery mode: `"pricing": "£99 one-time"`
- Show in modal option card
- Can display in footer if single-mode framework

---

## Backward Compatibility

The `deliveryModes` field is **optional** to maintain backward compatibility:

```typescript
export interface BentoContent {
  id: string;
  variant: BentoVariant;
  enabled?: boolean;
  deliveryModes?: DeliveryMode[];  // Optional - existing bentos work without it
  // ... other fields
}
```

**Migration Strategy:**
- Existing bento boxes without `deliveryModes` continue to work
- Components check for `deliveryModes` presence before rendering icons
- CTA logic falls back to existing `actions` configuration if `deliveryModes` is undefined

---

## Validation Rules

1. **At least one mode must be available:**
   ```typescript
   deliveryModes.filter(m => m.available).length >= 1
   ```

2. **CTA action must match required fields:**
   - `action: 'enquire'` requires `modalId`
   - `action: 'link'` requires `href`
   - `action: 'external'` requires `href`

3. **Pricing constraints:**
   - Consulting modes should NOT have `pricing` field
   - AI/framework modes MAY have `pricing` field

4. **Icon consistency:**
   - `type: 'consulting'` → `icon: 'consultant'`
   - `type: 'ai-product'` → `icon: 'ai'`
   - `type: 'framework'` → `icon: 'framework'`

---

## Mobile Considerations

**Icon Display:**
- Same 14px size on mobile (sufficient for visual indicator)
- Icons are NOT interactive (no tap target requirement)
- Tooltips shown via `title` attribute (native browser behavior)

**Modal Display:**
- Mobile: Bottom sheet animation (`slide-up 300ms ease-out`)
- Border radius: `16px 16px 0 0` (top corners only)
- Full width, fixed position bottom
- Smooth gesture-friendly close behavior

**Touch Targets:**
- Modal option cards: Minimum 44px height
- Close button: 44px × 44px minimum
- CTA buttons: 44px minimum height

---

## Future Enhancements

### Phase 7+ Possibilities

1. **Dynamic Availability:**
   ```json
   "available": { "type": "function", "check": "checkInventory" }
   ```

2. **Waitlist Support:**
   ```json
   "available": false,
   "waitlist": {
     "enabled": true,
     "cta": { "text": "Join Waitlist", "action": "enquire" }
   }
   ```

3. **Combo Pricing:**
   ```json
   "comboPricing": {
     "consulting+ai": "£45,000 + £299/mo",
     "ai+framework": "£299/mo + £99 one-time"
   }
   ```

4. **Availability Windows:**
   ```json
   "availableFrom": "2025-12-01",
   "availableUntil": "2026-03-31"
   ```

---

## Related Documentation

- **Component Implementation:** `/components/BentoBox/DeliveryModeIcons.tsx`
- **Modal Component:** `/components/DeliveryModeModal.tsx`
- **Type Definitions:** `/components/BentoBox/types.ts`
- **Migration Guide:** `/components/BentoBox/content/MIGRATION_GUIDE.md` (Phase 3)
- **Complete Roadmap:** `/CAPABILITIES_CONSOLIDATION_ROADMAP.md`

---

**Last Updated:** 2025-11-17
**Status:** Phase 1 Complete - Ready for Component Development
