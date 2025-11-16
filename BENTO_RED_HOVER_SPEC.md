# BentoBox - Red Hover Rules Specification

**Source:** Consulting page (`/components/EngagementClient.tsx` + `/app/globals.css`)

This document specifies the exact "red on hover" behavior for all BentoBox variants, ensuring consistency with the consulting page.

---

## Philosophy

**Red (#D43225) reveals on hover to create visual feedback and emphasis.**

On hover, these elements turn or stay red:
1. **Divider line** (bottom border) - turns red
2. **Delivery dates** - turn red
3. **Accent bar** (left border on prompt) - stays red (already red)

---

## Service Bento & Bento Link (Consulting Page)

**From globals.css lines 217-225:**

```css
/* Service Bento Box Hover */
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

**From globals.css lines 180-188:**

```css
/* Bento Link Hover */
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

### What Happens on Hover

| Element | Default State | Hover State |
|---------|---------------|-------------|
| Container | `scale(1)` | `scale(1.02)` |
| Divider line (footer border) | `#e0e0e0` | **#D43225** ✅ |
| Delivery date text | `#666` (gray) | **#D43225** ✅ |
| Accent bar (prompt left border) | **#D43225** | **#D43225** (stays) |

---

## Product Bento (Products Page)

**Updated globals.css lines 263-281:**

```css
/* Products Page Hover Effects */
.product-bento:hover {
    transform: translateY(-2px) !important;
}

/* Red accent bar on hover - same as consulting page */
.product-bento:hover .divider-line {
    border-color: #D43225 !important;
}

/* Red accent on prompt line accent bar (if present) */
.product-bento:hover p[style*="position: relative"] span[style*="position: absolute"][style*="backgroundColor: #D43225"],
.product-bento:hover p[style*="position: relative"] span[class*="accentBar"] {
    background-color: #D43225 !important; /* Already red, but ensure it stays */
}

/* Any delivery date or dynamic date elements turn red */
.product-bento:hover .delivery-date {
    color: #D43225 !important;
}
```

### What Happens on Hover

| Element | Default State | Hover State |
|---------|---------------|-------------|
| Container | `translateY(0)` | `translateY(-2px)` |
| Divider line (`.divider-line`) | `#e0e0e0` | **#D43225** ✅ |
| Delivery date text | `#666` (gray) | **#D43225** ✅ |
| Accent bar (prompt left border) | **#D43225** | **#D43225** (stays) |

---

## Differences Between Variants

| Aspect | Service/Link | Product |
|--------|--------------|---------|
| **Transform** | `scale(1.02)` | `translateY(-2px)` |
| **Divider class** | `.cta-divider` | `.divider-line` |
| **Divider selector** | `> div:last-child` | `.divider-line` |
| **Red on hover** | ✅ Divider, dates | ✅ Divider, dates |

**Key difference:** Only the transform animation differs. Red accent behavior is identical.

---

## Red Elements Inventory

All red elements in a BentoBox:

### 1. Left Accent Bar (Vertical Line)

**Location:** Left side of prompt paragraph

**CSS:**
```css
span.accentBar {
  position: absolute;
  left: -20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #D43225;
}
```

**Desktop Behavior:**
- **Default:** Red (#D43225)
- **Hover:** Red (#D43225) - no change
- **Purpose:** Visual emphasis on prompt question

**Mobile Behavior (scroll-based):**
- **Default:** Gray (#e0e0e0)
- **In viewport:** Red (#D43225) ✅
- **Out of viewport:** Gray (#e0e0e0)

---

### 2. Top Border (Mobile Only)

**Location:** Top edge of bento box container

**CSS:**
```css
.product-bento,
.service-bento,
.bento-link {
  border-top: 3px solid transparent;
}
```

**Desktop Behavior:**
- Not visible (transparent)

**Mobile Behavior (scroll-based):**
- **Default:** Transparent
- **In viewport:** Red (#D43225), 3px solid ✅
- **Out of viewport:** Transparent

---

### 3. Divider Line (Footer Top Border)

**Location:** Top border of footer/CTA section

**CSS:**
```css
.cta-divider,
.divider-line {
  border-top: 1px solid #e0e0e0;
  transition: border-color 0.3s ease;
}
```

**Desktop Behavior:**
- **Default:** Gray (#e0e0e0)
- **Hover:** Red (#D43225) ✅
- **Purpose:** Visual feedback that card is interactive

**Mobile Behavior (scroll-based):**
- **Default:** Gray (#e0e0e0)
- **In viewport:** Red (#D43225) ✅
- **Out of viewport:** Gray (#e0e0e0)

---

### 4. Delivery Date Text

**Location:** Within metadata paragraph

**HTML:**
```html
<span className="delivery-date">{getDeliveryDate('service-id')}</span>
```

**Desktop Behavior:**
- **Default:** Gray (#666)
- **Hover:** Red (#D43225) ✅
- **Purpose:** Draw attention to timeline

**Mobile Behavior (scroll-based):**
- **Default:** Gray (#666)
- **In viewport:** Red (#D43225) ✅
- **Out of viewport:** Gray (#666)

---

### 5. CTA Text (Share/Enquire Links)

**Location:** Footer CTA section

**HTML:**
```html
<a className="service-cta-link">Share</a>
<button className="service-cta-btn">Enquire</button>
```

**Desktop Behavior:**
- **Default:** Gray (#666)
- **Hover (individual CTA):** Red (#D43225) + underline ✅
- **Hover (entire bento box):** Red (#D43225) ✅
- **Purpose:** Interactive feedback

**Mobile Behavior (scroll-based):**
- **Default:** Gray (#666)
- **In viewport:** Red (#D43225) ✅
- **Out of viewport:** Gray (#666)

---

## Complete Hover State Specification

### Service Bento Example

```html
<div class="service-bento">
  <!-- Accent bar: Red → Red (no change) -->
  <p style="position: relative;">
    <span class="accentBar"></span>
    Prompt text...
  </p>

  <h3>Service Title</h3>
  <p>Body content...</p>

  <!-- Delivery date: Gray → Red on hover -->
  <p class="metadata">
    Eight weeks. Delivered by <span class="delivery-date">15 March</span>.
  </p>

  <!-- Divider: Gray → Red on hover -->
  <div class="cta-divider">
    <p>Price</p>
    <div>
      <a>Share</a> · <button>Enquire</button>
    </div>
  </div>
</div>
```

**On hover:**
1. Container scales: `scale(1.02)`
2. Accent bar: stays #D43225 ✅
3. Divider border: #e0e0e0 → #D43225 ✅
4. Delivery date text: #666 → #D43225 ✅

### Product Bento Example

```html
<div class="product-bento">
  <!-- Accent bar: Red → Red (no change) -->
  <p style="position: relative;">
    <span class="accentBar"></span>
    Prompt text...
  </p>

  <h3>Product Title</h3>
  <p>Body content...</p>

  <!-- Divider: Gray → Red on hover -->
  <div class="divider-line">
    <p>Tagline</p>
    <p>Subtitle</p>
  </div>
</div>
```

**On hover:**
1. Container lifts: `translateY(-2px)`
2. Accent bar: stays #D43225 ✅
3. Divider border: #e0e0e0 → #D43225 ✅
4. Delivery date text (if present): #666 → #D43225 ✅

---

## BentoBox Component Implementation

The BentoBox component uses these classes automatically:

```tsx
<BentoBox variant="service"> {/* or "link" or "product" */}
  ...
</BentoBox>
```

**CSS classes applied:**
- `variant="service"` → `.service-bento`
- `variant="link"` → `.bento-link`
- `variant="product"` → `.product-bento`

All hover states work automatically via `globals.css`.

---

## Testing Checklist

Visit `/products` and hover over the BentoBox Sir Alfie card:

### Visual Inspection

- [ ] Card lifts slightly (`translateY(-2px)`)
- [ ] Divider line turns red (#D43225)
- [ ] Transition is smooth (0.3s ease)
- [ ] Accent bar stays red (doesn't flicker)

### DevTools Inspection

**Before hover:**
```css
.divider-line {
  border-top-color: rgb(224, 224, 224); /* #e0e0e0 */
}
```

**On hover:**
```css
.product-bento:hover .divider-line {
  border-top-color: rgb(212, 50, 37); /* #D43225 */
}
```

### Color Values

| Color | RGB | Hex | Usage |
|-------|-----|-----|-------|
| Prismatica Red | `rgb(212, 50, 37)` | `#D43225` | Accent bar, hover states |
| Border Gray | `rgb(224, 224, 224)` | `#e0e0e0` | Default divider |
| Text Gray | `rgb(102, 102, 102)` | `#666` | Default delivery date |

---

## Common Issues & Fixes

### Issue 1: Divider Doesn't Turn Red

**Symptom:** Divider stays gray on hover

**Cause:** Wrong class name or selector

**Fix:**
```css
/* Service/Link uses: */
.service-bento:hover > div:last-child {
  border-top-color: #D43225 !important;
}

/* Product uses: */
.product-bento:hover .divider-line {
  border-color: #D43225 !important;
}
```

### Issue 2: Accent Bar Disappears on Hover

**Symptom:** Red accent bar vanishes or changes color

**Cause:** Overriding background-color on hover

**Fix:** Ensure accent bar stays red:
```css
.product-bento:hover .accentBar {
  background-color: #D43225 !important;
}
```

### Issue 3: Delivery Date Doesn't Change

**Symptom:** Date text stays gray on hover

**Cause:** Missing `.delivery-date` class

**Fix:** Add class to date span:
```html
<span className="delivery-date">{date}</span>
```

### Issue 4: Hover State Too Subtle

**Symptom:** Hard to tell when hovering

**Cause:** Multiple visual changes should occur simultaneously

**Fix:** Verify all three changes happen:
1. Transform (scale or translateY)
2. Divider turns red
3. Date turns red (if present)

---

## Consistency Rules

**All BentoBox variants must:**

1. ✅ Have a transform animation on hover
2. ✅ Turn the divider border red (#D43225)
3. ✅ Turn delivery dates red (if present)
4. ✅ Keep accent bar red (if present)
5. ✅ Use 0.3s ease transition
6. ✅ Use `!important` for hover overrides

**Do NOT:**

❌ Add red to title text
❌ Add red to body text
❌ Add red to badge backgrounds
❌ Change accent bar color (already red)

---

## Browser Compatibility

All hover states use standard CSS supported by:

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (with :hover support)

**Note:** Hover states don't trigger on touch devices. This is intentional.

---

## Summary

### Desktop (Hover-Based)

**Red (#D43225) appears on hover in exactly FOUR places:**

1. **Left accent bar** (vertical line) - stays red (already red)
2. **Divider line** (footer border) - turns red (from gray)
3. **Delivery dates** - turn red (from gray)
4. **CTA text** (Share/Enquire) - turns red (from gray) + underline

### Mobile (Scroll-Based - when in viewport)

**Red (#D43225) appears when scrolled into view in FIVE places:**

1. **Top border** (3px) - appears red (from transparent)
2. **Left accent bar** (vertical line) - turns red (from gray)
3. **Divider line** (footer border) - turns red (from gray)
4. **Delivery dates** - turn red (from gray)
5. **CTA text** (Share/Enquire) - turns red (from gray)

**These rules are now identical across all variants:**
- `service-bento` ✅
- `bento-link` ✅
- `product-bento` ✅

---

**Updated:** `globals.css` lines 263-281 now match consulting page behavior

**Test:** Visit `/products` and hover over Sir Alfie BentoBox card
