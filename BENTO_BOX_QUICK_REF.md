# BentoBox Component - Quick Reference

**For full documentation, see:** `/components/BentoBox.README.md`

---

## Import

```tsx
import BentoBox from '@/components/BentoBox';
```

---

## Basic Usage

```tsx
<BentoBox
  variant="service"
  title="Service Name"
  price="From £50,000"
>
  <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
    Description...
  </p>
</BentoBox>
```

---

## Complete Example

```tsx
<BentoBox
  variant="service"
  prompt="If your problem statement..."
  title="Service Name"
  badge="Strategy"
  metadata="Duration. Delivered by date."
  price="From £50,000"
  shareEmail={{
    subject: 'Worth looking at: Service Name',
    body: 'Email body...'
  }}
  onEnquire={() => openModal('service-id')}
>
  <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
    Description...
  </p>
</BentoBox>
```

---

## Props Cheatsheet

| Prop | Type | Required | Example |
|------|------|----------|---------|
| `variant` | `'service' \| 'link' \| 'product'` | No (default: service) | `variant="service"` |
| `title` | `string` | ✅ Yes | `title="Go-to-Market"` |
| `prompt` | `string` | No | `prompt="If your problem..."` |
| `badge` | `string` | No | `badge="Strategy"` |
| `children` | `ReactNode` | ✅ Yes | `<p>Description</p>` |
| `metadata` | `string \| ReactNode` | No | `metadata="8 weeks. Done by..."` |
| `price` | `string` | No | `price="From £50,000"` |
| `shareEmail` | `{subject, body}` | No | See example above |
| `onEnquire` | `() => void` | No | `onEnquire={() => ...}` |
| `customFooter` | `ReactNode` | No | Custom footer content |

---

## Variants

### Service (default)
```tsx
<BentoBox variant="service" ... />
```
- For high-tier consulting services
- Hover: scale(1.02)
- Standard Share + Enquire CTAs

### Link
```tsx
<BentoBox variant="link" ... />
```
- For lower-tier services & navigation cards
- Hover: scale(1.02)
- Identical to service variant

### Product
```tsx
<BentoBox variant="product" ... />
```
- For product showcase cards
- Hover: translateY(-2px)
- Usually uses customFooter instead of price

---

## Typography Rules ⚠️

**Body paragraphs MUST use these exact styles:**
```tsx
<p style={{
  marginBottom: '16px',
  fontSize: '17px',      // NOT 16px!
  lineHeight: '1.6',
  color: '#444'
}}>
  Your content...
</p>
```

**Why?** The consulting page uses 17px for body text. This is non-negotiable.

---

## Common Patterns

### Service Card
```tsx
<BentoBox
  variant="service"
  prompt="If problem..."
  title="Service Name"
  badge="Strategy"
  price="From £50,000"
  onEnquire={() => openModal('service-id')}
>
  <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
    Description...
  </p>
</BentoBox>
```

### Product Card
```tsx
<BentoBox
  variant="product"
  prompt="If problem..."
  title="Product Name"
  customFooter={
    <>
      <p style={{ fontWeight: 600, fontSize: '18px', color: '#222' }}>
        Tagline here.
      </p>
      <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
        Subtitle here.
      </p>
    </>
  }
>
  <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>
    Description...
  </p>
</BentoBox>
```

### Navigation Card
```tsx
<BentoBox
  variant="link"
  title="Consulting Services"
  customFooter={
    <>
      <p style={{ fontWeight: 600, fontSize: '18px', color: '#222' }}>
        We fix things. Then we leave.
      </p>
      <Link href="/consulting" className="button-primary">
        Explore Services
      </Link>
    </>
  }
  style={{ border: '1px solid #D43225', padding: '40px 32px' }}
>
  <p>Description...</p>
</BentoBox>
```

---

## Dynamic Content

```tsx
import DynamicServiceDescription from '@/components/DynamicServiceDescription';

<BentoBox title="Service" price="£50k">
  <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
    <DynamicServiceDescription content={dynamicContent} />
  </p>
</BentoBox>
```

---

## Metadata with Dynamic Date

```tsx
metadata={
  <>
    Eight weeks. Delivered by{' '}
    <span className="delivery-date">{getDeliveryDate('service-id')}</span>.
  </>
}
```

The `delivery-date` class turns red on hover automatically.

---

## Share Email Format

```tsx
shareEmail={{
  subject: 'Worth looking at: Service Name',
  body: `Hey,

I came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].

It's called [Service Name] - [brief description].

[Duration], starts at [Price]. [Key benefit].

If we talk to them next week, we could have results by [Date].

Here's the link: ${window.location.href}

Worth a conversation?`
}}
```

Component automatically URL-encodes subject and body.

---

## Testing

**Test page:** `/bento-test`

Visit `http://localhost:3000/bento-test` to see all variants.

**Delete after testing:**
```bash
rm -rf app/bento-test
```

---

## Key Measurements

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Prompt | 16px | 400 | default |
| Title | 17px | 700 | #222 |
| Badge | 10px | 600 | #666 |
| Body | 17px | 400 | #444 |
| Metadata | 14px | 400 | #666 |
| Price | 18px | 600 | #222 |
| CTAs | 15px | 500 | #666 |

**Red accent:** #D43225 (3px width, left: -20px)
**Badge bg:** #f5f5f5
**Divider:** #e0e0e0 → #D43225 on hover

---

## Common Mistakes ❌

| Wrong | Right |
|-------|-------|
| Body font 16px | Body font 17px |
| Accent bar left: -16px | Accent bar left: -20px |
| CTA letter-spacing: 0 | CTA letter-spacing: 0.3px |
| Badge bg #f0f0f0 | Badge bg #f5f5f5 |
| Hover scale(1.05) | Hover scale(1.02) |

---

## Migration

**Before:** 50 lines of inline styles
**After:** 15 lines with BentoBox

See `BentoBox.examples.tsx` for before/after examples.

---

## Responsive Design

| Breakpoint | Width | Padding | Accent Bar |
|------------|-------|---------|------------|
| Desktop | > 1024px | 32px | left: -20px |
| Tablet | ≤ 1024px | 24px | left: -16px |
| Mobile | ≤ 768px | 24px | left: -16px |
| Small Mobile | ≤ 480px | 20px | left: -12px |

**Mobile optimizations:**
- ✅ 48px min-height CTAs (touch-friendly)
- ✅ Full-width buttons on small screens
- ✅ Adjusted typography for readability
- ✅ Auto-adjusting accent bars (no clipping)

---

**Full docs:** `/components/BentoBox.README.md`
**Examples:** `/components/BentoBox.examples.tsx`
**Desktop spec:** `/BENTO_BOX_SPEC.md`
**Mobile spec:** `/BENTO_BOX_MOBILE_SPEC.md`
