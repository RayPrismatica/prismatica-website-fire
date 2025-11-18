# BentoBox Component

Universal card component for services, products, and navigation cards across the Prismatica Labs site.

## Overview

The BentoBox component replaces all inline bento box implementations with a single, consistent, type-safe component that enforces the design system rules documented in `BENTO_BOX_SPEC.md`.

### Design Reference
- **Specification:** `/BENTO_BOX_SPEC.md` (exact measurements, colors, typography)
- **Visual Identity:** `/PrismaticaSoul/VISUAL_IDENTITY.md` (design philosophy)
- **Source of Truth:** `/components/EngagementClient.tsx` (consulting page implementation)

---

## Recent Updates

**November 2025 - Solutions Consolidation & Delivery Modes:**
- All 15 solutions now use `variant="capability"` (replaces "service" and "product")
- Added `deliveryModes` array for indicating consultant, AI, or framework delivery
- Consolidated `/consulting` and `/products` into unified `/solutions` page
- Delivery mode icons (👤 🤖 📦) display in top-right corner
- Multi-mode capabilities show "Explore Options" modal

---

## Quick Start

```tsx
import BentoBox from '@/components/BentoBox';

<BentoBox
  variant="capability"
  prompt="If your internal culture and external message feel misaligned..."
  title="Pioneers of Purpose Assessment"
  badge="Strategy"
  price="From £50,000"
  deliveryModes={[
    {
      type: "consulting",
      available: true,
      icon: "consultant",
      label: "Available with consultant",
      cta: { text: "Book Discovery Call", action: "enquire", modalId: "pioneers-of-purpose" }
    }
  ]}
  onEnquire={() => openModal('pioneers-of-purpose')}
>
  <p>Your service description goes here...</p>
</BentoBox>
```

---

## Props API

### Content Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | Service/product title (displayed in UPPERCASE, 17px, 700 weight) |
| `prompt` | `string` | ❌ | Leading question with red accent bar (16px) |
| `badge` | `string` | ❌ | Category badge (e.g., "Strategy", "Marketing") |
| `children` | `ReactNode` | ✅ | Body content (paragraphs, dynamic components) |
| `metadata` | `string \| ReactNode` | ❌ | Timeline/duration text (14px, italic, gray) |
| `deliveryModes` | `DeliveryMode[]` | ❌ | Array of delivery options (consultant, AI, framework) |

### Footer Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `price` | `string` | ❌ | Pricing text (e.g., "From £50,000") |
| `shareEmail` | `ShareEmailConfig` | ❌ | Share link configuration (subject + body) |
| `onEnquire` | `() => void` | ❌ | Enquire button click handler |
| `customFooter` | `ReactNode` | ❌ | Custom footer content (replaces standard price/CTA pattern) |

### Variant & Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'capability' \| 'service' \| 'link' \| 'product'` | `'capability'` | Determines hover behavior and CSS class |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Inline style overrides |

**Note:** `capability` is the recommended variant going forward. Legacy `service` and `product` variants are maintained for backward compatibility.

---

## Variants

### `variant="capability"` (Recommended)
- CSS class: `.capability-bento`
- Hover: `scale(1.02)`
- Use for: All solutions (consulting services, AI products, frameworks)
- Pattern: Prompt + Title + Badge + Delivery Icons + Body + Metadata + Price + Share/Enquire CTAs
- **Introduced:** November 2025 for unified `/solutions` page
- **Features:** Supports `deliveryModes` array for multi-channel delivery

### `variant="service"` (Legacy)
- CSS class: `.service-bento`
- Hover: `scale(1.02)`
- Use for: High-tier consulting services (£40k+)
- Pattern: Prompt + Title + Badge + Body + Metadata + Price + Share/Enquire CTAs
- **Status:** Maintained for backward compatibility

### `variant="link"`
- CSS class: `.bento-link`
- Hover: `scale(1.02)` (same as service)
- Use for: Navigation cards to other pages
- Pattern: Identical to service variant

### `variant="product"` (Legacy)
- CSS class: `.product-bento`
- Hover: `translateY(-2px)`
- Divider class: `.divider-line`
- Use for: Product showcase cards
- Pattern: Prompt + Title + Body + Custom Footer (no pricing)
- **Status:** Maintained for backward compatibility

---

## Typography Specifications

All measurements extracted from `/components/EngagementClient.tsx`:

| Element | Font Size | Weight | Color | Letter Spacing |
|---------|-----------|--------|-------|----------------|
| Prompt | 16px | 400 | default | 0 |
| Title | 17px | 700 | #222 | 1px |
| Badge | 10px | 600 | #666 | 1px |
| Body | 17px | 400 | #444 | 0 |
| Metadata | 14px | 400 | #666 | 0 |
| Price | 18px | 600 | #222 | 0 |
| CTAs | 15px | 500 | #666 | 0.3px |

---

## Delivery Mode Icons

**Added:** November 2025

Display delivery options visually in the top-right corner of bento boxes:

### Icon Types

| Icon | Type | Meaning | Use Case |
|------|------|---------|----------|
| 👤 | `consultant` | Human consultant-led | Consulting services |
| 🤖 | `ai` | AI-powered product | Self-service AI tools |
| 📦 | `framework` | Downloadable template | Worksheets, frameworks |

### Configuration

```tsx
deliveryModes={[
  {
    type: "consulting",
    available: true,
    icon: "consultant",
    label: "Available with consultant",
    cta: {
      text: "Book Discovery Call",
      action: "enquire",
      modalId: "pioneers-of-purpose"
    }
  }
]}
```

### Single vs Multi-Mode Behavior

**Single Mode (Most Common):**
- Shows one icon in top-right corner
- CTA button uses mode's specified text and action
- Example: "Book Discovery Call" → Opens enquiry modal

**Multi-Mode (Future):**
- Shows 2-3 icons in top-right corner
- CTA button becomes "Explore Options"
- Clicking opens modal with all delivery options
- User selects preferred mode → executes that mode's CTA

**Full Specification:** See `DELIVERY_MODE_SCHEMA.md` for complete details.

---

## Usage Examples

See `BentoBox.examples.tsx` for complete examples. Here are the most common patterns:

### Example 1: Standard Service Card

```tsx
<BentoBox
  variant="service"
  prompt="If your internal culture and external message feel misaligned..."
  title="Pioneers of Purpose Assessment"
  badge="Strategy"
  metadata={
    <>
      Eight weeks. Delivered by{' '}
      <span className="delivery-date">{getDeliveryDate('pioneers-of-purpose')}</span>.
    </>
  }
  price="From £50,000"
  shareEmail={{
    subject: 'Worth looking at: Pioneers of Purpose Assessment',
    body: 'Hey,\n\nI came across this...'
  }}
  onEnquire={() => setEnquiryModalOpen('pioneers-of-purpose')}
>
  <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
    Most companies treat purpose like a poster on the wall. We treat it like the operating system...
  </p>
</BentoBox>
```

### Example 2: Product Card (Custom Footer)

```tsx
<BentoBox
  variant="product"
  prompt="If you're saying yes to everything and achieving nothing..."
  title="The Focus Matrix"
  customFooter={
    <>
      <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '0', color: '#222' }}>
        Turns "busy" into "lethal".
      </p>
      <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
        Stop drowning. Start compounding.
      </p>
    </>
  }
>
  <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>
    Poker players calculate expected value on every bet. You should too...
  </p>
</BentoBox>
```

### Example 3: Navigation Card (Primary Variant)

```tsx
<BentoBox
  variant="link"
  title="Consulting Services"
  customFooter={
    <>
      <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '4px', color: '#222' }}>
        We fix things. Then we leave.
      </p>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
        No retainers. No dependency.
      </p>
      <Link href="/consulting" className="button-primary">
        Explore Services
      </Link>
    </>
  }
  style={{ border: '1px solid #D43225', padding: '40px 32px' }}
>
  <p><strong>Some problems need custom work.</strong> Every consultancy...</p>
</BentoBox>
```

---

## Hover States

All hover states are handled automatically via CSS classes in `globals.css`:

### Service/Link Hover
```css
.service-bento:hover,
.bento-link:hover {
  transform: scale(1.02);
}

.service-bento:hover > div:last-child,
.bento-link:hover > div:last-child {
  border-top-color: #D43225 !important;
}

.service-bento:hover .delivery-date,
.bento-link:hover .delivery-date {
  color: #D43225 !important;
}
```

### Product Hover
```css
.product-bento:hover {
  transform: translateY(-2px) !important;
}

.product-bento:hover .divider-line {
  border-color: #D43225 !important;
}
```

### CTA Hover
```css
.service-cta-link:hover,
.service-cta-btn:hover {
  text-decoration: underline !important;
}
```

---

## Styling Body Content

The component accepts any React children, but for consistent typography, wrap paragraphs with inline styles:

```tsx
<BentoBox {...props}>
  {/* Standard body paragraph */}
  <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
    Your content here...
  </p>

  {/* Dynamic content component */}
  <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
    <DynamicServiceDescription content={dynamicContent} />
  </p>
</BentoBox>
```

Or use the sub-component:

```tsx
<BentoBox {...props}>
  <BentoBox.Body>
    <p>Your content here...</p>
  </BentoBox.Body>
</BentoBox>
```

---

## Share Email Configuration

The `shareEmail` prop generates a `mailto:` link with pre-filled subject and body:

```tsx
shareEmail={{
  subject: 'Worth looking at: [Service Name]',
  body: `Hey,

I came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].

It's called [Service Name] - [brief description].

[Duration], starts at [Price]. [Key benefit].

If we talk to them next week, we could have results by [Date].

Here's the link: ${window.location.href}

Worth a conversation?`
}}
```

The component automatically URL-encodes the subject and body.

---

## Dynamic Content Integration

The BentoBox component works seamlessly with dynamic content components:

```tsx
import { getDynamicContent } from '@/lib/getDynamicContent';
import DynamicServiceDescription from '@/components/DynamicServiceDescription';

export default async function ConsultingPage() {
  const content = await getDynamicContent();

  return (
    <BentoBox
      title="Service Name"
      badge="Strategy"
      price="From £40,000"
    >
      <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
        <DynamicServiceDescription content={content.serviceDescription} />
      </p>
    </BentoBox>
  );
}
```

---

## Migration Guide

### Before (Inline Styles)
```tsx
<div className="service-bento" style={{ backgroundColor: '#fff', padding: '32px', ... }}>
  <p style={{ position: 'relative', fontSize: '16px', ... }}>
    <span style={{ position: 'absolute', left: '-20px', ... }}></span>
    Prompt text
  </p>
  <h3 style={{ fontSize: '17px', fontWeight: 700, ... }}>
    Title
    <span style={{ fontSize: '10px', ... }}>Badge</span>
  </h3>
  <p style={{ marginBottom: '16px', fontSize: '17px', ... }}>Body</p>
  <p style={{ marginBottom: '20px', fontSize: '14px', ... }}>Metadata</p>
  <div className="cta-divider" style={{ marginTop: 'auto', ... }}>
    <p style={{ fontWeight: 600, ... }}>Price</p>
    <div style={{ display: 'flex', ... }}>
      <a href={...} style={...}>Share</a>
      <span>·</span>
      <button onClick={...} style={...}>Enquire</button>
    </div>
  </div>
</div>
```

### After (BentoBox Component)
```tsx
<BentoBox
  variant="service"
  prompt="Prompt text"
  title="Title"
  badge="Badge"
  metadata="Metadata"
  price="Price"
  shareEmail={{ subject: '...', body: '...' }}
  onEnquire={() => {...}}
>
  <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>Body</p>
</BentoBox>
```

**Reduction:** ~50 lines → ~15 lines (70% less code)

---

## TypeScript Interface

```typescript
interface BentoBoxProps {
  // Content
  prompt?: string;
  title: string;
  badge?: string;
  children: React.ReactNode;

  // Metadata
  metadata?: string | React.ReactNode;

  // Footer
  price?: string;
  shareEmail?: {
    subject: string;
    body: string;
  };
  onEnquire?: () => void;
  customFooter?: React.ReactNode;

  // Variant
  variant?: 'service' | 'link' | 'product';

  // Styling
  className?: string;
  style?: React.CSSProperties;
}
```

---

## Design System Compliance

The BentoBox component enforces all design system rules from `VISUAL_IDENTITY.md`:

✅ **Red accent bar:** Always 3px width, left: -20px, #D43225
✅ **Typography hierarchy:** Exact font sizes, weights, letter-spacing
✅ **Hover animations:** Consistent scale/translateY + red accent reveal
✅ **Spacing:** 32px padding, 16px gaps, 24px margin-bottom
✅ **Colors:** #222 (titles), #444 (body), #666 (metadata/CTAs), #D43225 (accents)
✅ **Transitions:** 0.3s ease (transform), 0.2s (color)

---

## Testing

To verify the component matches the original implementation:

1. **Visual regression:** Screenshot before/after side-by-side
2. **Hover states:** Verify scale, divider color, date color all change correctly
3. **Typography:** Inspect font sizes with dev tools (must match spec exactly)
4. **Spacing:** Check padding, margins, gaps match BENTO_BOX_SPEC.md
5. **CTAs:** Test Share mailto link and Enquire onClick handler

---

## Responsive Design

The BentoBox component is fully responsive and adapts to different screen sizes automatically.

### Breakpoints

| Breakpoint | Width | Container Padding | Accent Bar |
|------------|-------|-------------------|------------|
| Desktop | > 1024px | 32px | left: -20px |
| Tablet | ≤ 1024px | 24px | left: -16px |
| Mobile | ≤ 768px | 24px | left: -16px |
| Small Mobile | ≤ 480px | 20px | left: -12px |

### Mobile Optimizations

✅ **Touch-friendly CTAs:** 48px min-height on mobile
✅ **Adjusted spacing:** Padding reduces from 32px → 20px on small screens
✅ **Repositioned accent bars:** Move from -20px to -12px to prevent clipping
✅ **Full-width buttons:** CTAs span 100% on small mobile screens
✅ **Enhanced typography:** Font sizes adjust for optimal mobile readability

**Full mobile specification:** `/BENTO_BOX_MOBILE_SPEC.md`

---

## Related Files

- **Component:** `/components/BentoBox.tsx`
- **Responsive CSS:** `/components/BentoBox.module.css`
- **Examples:** `/components/BentoBox.examples.tsx`
- **Desktop Spec:** `/BENTO_BOX_SPEC.md`
- **Mobile Spec:** `/BENTO_BOX_MOBILE_SPEC.md`
- **Roadmap:** `/BENTO_BOX_ROADMAP.md`
- **Global CSS:** `/app/globals.css` (lines 180-230, 263-270, 498-1020, 1266-1285)
- **Visual Identity:** `/PrismaticaSoul/VISUAL_IDENTITY.md`

---

## Support

For questions or issues with the BentoBox component:
1. Check `BENTO_BOX_SPEC.md` for exact specifications
2. Review `BentoBox.examples.tsx` for usage patterns
3. Consult `BENTO_BOX_ROADMAP.md` for migration strategy
