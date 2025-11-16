# Bento Box Component - Complete Specification

**Source of Truth:** `/components/EngagementClient.tsx` (Consulting Page)

This document contains the **EXACT** specifications extracted from the consulting page bento boxes. These are the canonical rules that the BentoBox component must follow.

---

## Visual Specifications (Extracted from Consulting Page)

### Container Styles

```css
/* Base Bento Box */
.bento-box {
  background-color: #fff;
  padding: 32px;
  border-radius: 12px;
  margin-bottom: 24px;
  transition: transform 0.3s ease;
}
```

**From EngagementClient.tsx lines 80-86:**
```tsx
style={{
  backgroundColor: '#fff',
  padding: '32px',
  borderRadius: '12px',
  marginBottom: '24px',
  transition: 'transform 0.3s ease'
}}
```

### Hover Effects

```css
/* Service Bento Hover (from globals.css:217-225) */
.service-bento:hover {
  transform: scale(1.02);
}

.service-bento:hover > div:last-child {
  border-top-color: #D43225 !important;
}

.service-bento:hover .delivery-date {
  color: #D43225 !important;
}
```

**Bento Link Hover (from globals.css:180-188):**
```css
.bento-link:hover {
  transform: scale(1.02);
}

.bento-link:hover > div:last-child {
  border-top-color: #D43225 !important;
}

.bento-link:hover .delivery-date {
  color: #D43225 !important;
}
```

---

## Typography Hierarchy (Consulting Page Reference)

### 1. Prompt Text (Red Accent Line)

**From EngagementClient.tsx line 88-91:**
```tsx
<p style={{
  position: 'relative',
  fontSize: '16px',
  marginBottom: '16px'
}}>
  <span style={{
    position: 'absolute',
    left: '-20px',
    top: '0',
    bottom: '0',
    width: '3px',
    backgroundColor: '#D43225'
  }}></span>
  If your internal culture and external message feel misaligned...
</p>
```

**Specification:**
```css
.bento-prompt {
  position: relative;
  font-size: 16px;
  margin-bottom: 16px;
}

.bento-prompt::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #D43225;
}
```

### 2. Title (with optional badge)

**From EngagementClient.tsx line 93-96:**
```tsx
<h3 style={{
  fontSize: '17px',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  marginBottom: '20px',
  color: '#222',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap'
}}>
  Pioneers of Purpose Assessment
  <span style={{
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '1px',
    padding: '4px 8px',
    background: '#f5f5f5',
    color: '#666',
    borderRadius: '4px',
    textTransform: 'uppercase'
  }}>Strategy</span>
</h3>
```

**Specification:**
```css
.bento-title {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #222;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.bento-badge {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 4px 8px;
  background: #f5f5f5;
  color: #666;
  border-radius: 4px;
  text-transform: uppercase;
}
```

### 3. Body Text (Main Description)

**From EngagementClient.tsx line 98:**
```tsx
<p style={{
  marginBottom: '16px',
  fontSize: '17px',
  lineHeight: '1.6',
  color: '#444'
}}>
  <DynamicServiceDescription content={serviceDescription} />
</p>
```

**Specification:**
```css
.bento-body {
  margin-bottom: 16px;
  font-size: 17px;
  line-height: 1.6;
  color: #444;
}
```

### 4. Metadata Text (Timeline/Duration)

**From EngagementClient.tsx line 100-102:**
```tsx
<p style={{
  marginBottom: '20px',
  fontSize: '14px',
  color: '#666',
  fontStyle: 'italic'
}}>
  Eight weeks. Purpose architecture mapped across every system and touchpoint by
  <span className="delivery-date">{getDeliveryDate('pioneers-of-purpose')}</span>.
</p>
```

**Specification:**
```css
.bento-metadata {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  font-style: italic;
}

.delivery-date {
  /* Inherits color, turns red on hover via parent hover state */
}
```

**Alternative Metadata Size (from lines 253, 308):**
```tsx
style={{
  fontSize: '13px',
  color: '#666',
  marginBottom: '20px',
  fontStyle: 'italic'
}}
```

---

## Footer/CTA Section

### Divider + CTA Container

**From EngagementClient.tsx line 104:**
```tsx
<div className="cta-divider" style={{
  marginTop: 'auto',
  paddingTop: '20px',
  borderTop: '1px solid #e0e0e0',
  transition: 'border-color 0.3s ease'
}}>
```

**Specification:**
```css
.cta-divider {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  transition: border-color 0.3s ease;
}

/* On parent hover, divider turns red */
.bento-box:hover .cta-divider {
  border-top-color: #D43225 !important;
}
```

### Pricing Text

**From EngagementClient.tsx line 105:**
```tsx
<p style={{
  fontWeight: 600,
  fontSize: '18px',
  marginBottom: '12px',
  color: '#222'
}}>
  From £50,000
</p>
```

**Specification:**
```css
.bento-price {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 12px;
  color: #222;
}
```

### CTA Actions Container

**From EngagementClient.tsx line 106:**
```tsx
<div style={{
  display: 'flex',
  gap: '16px',
  alignItems: 'center'
}}>
```

**Specification:**
```css
.bento-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}
```

---

## CTA Buttons/Links

### Share Link

**From EngagementClient.tsx lines 107-114:**
```tsx
<a
  href={`mailto:...`}
  title="Share with your team"
  className="service-cta-link"
  style={{
    color: '#666',
    fontSize: '15px',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'color 0.2s',
    letterSpacing: '0.3px'
  }}
>
  Share
</a>
```

**Specification:**
```css
.service-cta-link {
  color: #666;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  letter-spacing: 0.3px;
}

.service-cta-link:hover {
  text-decoration: underline !important;
}
```

### Separator Dot

**From EngagementClient.tsx line 115:**
```tsx
<span style={{ color: '#e0e0e0' }}>·</span>
```

**Specification:**
```css
.bento-separator {
  color: #e0e0e0;
}
```

### Enquire Button

**From EngagementClient.tsx lines 116-123:**
```tsx
<button
  title="Enquire about this service"
  className="service-cta-btn"
  style={{
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: '#666',
    fontSize: '15px',
    fontWeight: 500,
    transition: 'color 0.2s',
    letterSpacing: '0.3px'
  }}
  onClick={() => setEnquiryModalOpen('pioneers-of-purpose')}
>
  Enquire
</button>
```

**Specification:**
```css
.service-cta-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #666;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
  letter-spacing: 0.3px;
}

.service-cta-btn:hover {
  text-decoration: underline !important;
}
```

---

## Component Structure

Based on the consulting page, here's the exact element hierarchy:

```html
<div class="bento-box service-bento">

  <!-- Prompt (optional) -->
  <p class="bento-prompt">
    <span class="accent-bar"></span>
    If your internal culture and external message feel misaligned...
  </p>

  <!-- Title with Badge -->
  <h3 class="bento-title">
    Pioneers of Purpose Assessment
    <span class="bento-badge">Strategy</span>
  </h3>

  <!-- Body Content -->
  <p class="bento-body">
    [Dynamic content or static description]
  </p>

  <!-- Metadata (duration, timeline) -->
  <p class="bento-metadata">
    Eight weeks. Purpose architecture mapped by <span class="delivery-date">15 March</span>.
  </p>

  <!-- Footer with CTA -->
  <div class="cta-divider">
    <p class="bento-price">From £50,000</p>

    <div class="bento-actions">
      <a href="mailto:..." class="service-cta-link">Share</a>
      <span class="bento-separator">·</span>
      <button class="service-cta-btn" onClick={...}>Enquire</button>
    </div>
  </div>

</div>
```

---

## Variant Differences

### Service Bento (`.service-bento`)
- Standard 32px padding
- No border (just white background)
- Always has prompt, title, badge, body, metadata, footer
- CTA pattern: Share · Enquire

### Bento Link (`.bento-link`)
- Same as service-bento
- Used for lower-tier services (from £8,000 - £25,000)
- Identical styling to service-bento

### Product Bento (`.product-bento`)
- Different hover: `translateY(-2px)` instead of `scale(1.02)`
- Divider class: `.divider-line` instead of `.cta-divider`
- No pricing in footer (just tagline)
- Structure from `/products` page (see lines 49-79 of products/page.tsx)

---

## React Component Interface (Derived from Usage)

```typescript
interface BentoBoxProps {
  // Content
  prompt?: string;                     // "If your internal culture..."
  title: string;                       // "Pioneers of Purpose Assessment"
  badge?: string;                      // "Strategy" | "Marketing" | "Technology" | "Process"
  children: React.ReactNode;           // Body paragraphs (can include dynamic components)

  // Metadata
  metadata?: string | React.ReactNode; // "Eight weeks. Delivered by 15 March."

  // Footer
  price?: string;                      // "From £50,000" | "£25,000"

  // CTAs
  shareEmail?: {
    subject: string;
    body: string;
  };
  onEnquire?: () => void;

  // Or custom CTAs
  customActions?: React.ReactNode;

  // Variant
  variant?: 'service' | 'link' | 'product';

  // Styling
  className?: string;
  style?: React.CSSProperties;
}
```

---

## Usage Examples (From Consulting Page)

### Example 1: Service Bento with All Features

```tsx
<BentoBox
  variant="service"
  prompt="If your internal culture and external message feel misaligned..."
  title="Pioneers of Purpose Assessment"
  badge="Strategy"
  metadata={
    <>
      Eight weeks. Purpose architecture mapped across every system and touchpoint by{' '}
      <span className="delivery-date">{getDeliveryDate('pioneers-of-purpose')}</span>.
    </>
  }
  price="From £50,000"
  shareEmail={{
    subject: 'Worth looking at: Pioneers of Purpose Assessment',
    body: `Hey,\n\nI came across this and thought it might help...`
  }}
  onEnquire={() => setEnquiryModalOpen('pioneers-of-purpose')}
>
  <DynamicServiceDescription content={serviceDescription} />
</BentoBox>
```

### Example 2: Bento Link (Lower Tier Service)

```tsx
<BentoBox
  variant="link"
  prompt="If you're launching something new and can't afford to get it wrong..."
  title="Go-to-Market"
  badge="Marketing"
  metadata={
    <>
      Six weeks beats six months of "let's try this and see." Launch strategy ready by{' '}
      <span className="delivery-date">{getDeliveryDate('go-to-market')}</span>, budget intact.
    </>
  }
  price="From £15,000"
  shareEmail={{
    subject: 'Worth looking at: Go-to-Market Strategy',
    body: `Hey,\n\n...`
  }}
  onEnquire={() => setEnquiryModalOpen('go-to-market')}
>
  <p>Launch right the first time. We build your complete go-to-market strategy from positioning to channels to messaging to timeline...</p>
</BentoBox>
```

### Example 3: Product Bento (No Pricing, Different Footer)

```tsx
<BentoBox
  variant="product"
  prompt="If you're saying yes to everything and achieving nothing..."
  title="The Focus Matrix"
  customActions={
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
  <p>Poker players calculate expected value on every bet. You should too...</p>
  <p>This runs game theory on your entire calendar...</p>
  <p>Your time is finite. Most people spend it on what screams loudest...</p>
</BentoBox>
```

---

## Key Rules Summary

### ✅ Typography Rules
1. **Prompt:** 16px, regular weight, with 3px red accent bar at left: -20px
2. **Title:** 17px, 700 weight, 1px letter-spacing, UPPERCASE
3. **Badge:** 10px, 600 weight, 1px letter-spacing, gray background (#f5f5f5)
4. **Body:** 17px, line-height 1.6, color #444
5. **Metadata:** 14px (sometimes 13px), italic, color #666
6. **Price:** 18px, 600 weight, color #222
7. **CTAs:** 15px, 500 weight, 0.3px letter-spacing, color #666

### ✅ Layout Rules
1. **Container:** 32px padding, 12px border radius, white background
2. **Spacing:** 16px between elements, 24px margin-bottom between bentos
3. **Footer:** 20px padding-top, 1px solid #e0e0e0 border-top
4. **Actions:** Flex layout, 16px gap, separated by · (color #e0e0e0)

### ✅ Interaction Rules
1. **Hover:** Scale 1.02 (or translateY(-2px) for products)
2. **Hover Effect:** Divider border turns #D43225
3. **Hover Effect:** Delivery date turns #D43225
4. **CTA Hover:** Text underline on Share and Enquire links
5. **Transition:** 0.3s ease for transform, 0.2s for color

### ✅ Color Rules
1. **Red accent:** #D43225 (3px bar, hover states)
2. **Text primary:** #222 (title, price)
3. **Text secondary:** #444 (body)
4. **Text tertiary:** #666 (metadata, CTAs)
5. **Border/divider:** #e0e0e0 (default), #D43225 (hover)
6. **Badge background:** #f5f5f5
7. **Badge text:** #666

---

## Migration Checklist

When converting existing bento boxes to the component:

- [ ] Match prompt text exactly (word-for-word)
- [ ] Title case preserved (UPPERCASE in component)
- [ ] Badge text matches category
- [ ] Body content wrapped in component children
- [ ] Metadata includes delivery date calculation
- [ ] Price format matches ("From £XX,XXX" or "£XX,XXX")
- [ ] Share email subject and body ported correctly
- [ ] Enquire onClick handler connected
- [ ] Hover states work (scale, divider color, date color)
- [ ] Typography sizes match spec (17px body, not 16px!)
- [ ] Spacing matches (32px padding, 16px gaps)

---

## Common Mistakes to Avoid

❌ **Wrong font size for body:** 16px instead of 17px
❌ **Wrong letter-spacing on title:** 0.5px instead of 1px
❌ **Wrong accent bar position:** left: -16px instead of -20px
❌ **Wrong hover transform:** scale(1.05) instead of scale(1.02)
❌ **Wrong CTA font weight:** 400 instead of 500
❌ **Wrong CTA letter-spacing:** Missing 0.3px
❌ **Wrong divider color on hover:** Using opacity instead of border-color
❌ **Wrong badge background:** #f0f0f0 instead of #f5f5f5

---

## Testing Protocol

1. **Visual Comparison:** Screenshot before/after side by side
2. **Hover States:** Verify scale, divider color, date color all change
3. **Typography:** Inspect font sizes with dev tools (must match exactly)
4. **Spacing:** Check padding, margins, gaps with dev tools
5. **Responsive:** Test mobile breakpoints (padding should adjust)
6. **Accessibility:** Tab through CTAs, verify focus states
7. **Dynamic Content:** Test with actual API data, verify fade-in

---

This specification is the **single source of truth** for the BentoBox component implementation.
