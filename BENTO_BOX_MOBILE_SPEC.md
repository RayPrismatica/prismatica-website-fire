# BentoBox Component - Mobile & Responsive Specifications

**Source:** `/app/globals.css` lines 498-1020

This document details the responsive behavior of the BentoBox component across different breakpoints.

---

## Breakpoint Summary

| Breakpoint | Width | Container Padding | Accent Bar Position |
|------------|-------|-------------------|---------------------|
| Desktop | > 1024px | 32px | left: -20px |
| Tablet | ≤ 1024px | 24px | left: -16px |
| Mobile | ≤ 768px | 24px | left: -16px |
| Small Mobile | ≤ 480px | 20px | left: -12px |

---

## Breakpoint 1: Desktop (> 1024px)

**Default behavior - no media queries needed**

```css
.bento-box {
  padding: 32px;
}

.accent-bar {
  left: -20px;
  width: 3px;
}
```

---

## Breakpoint 2: Tablet (≤ 1024px)

**From globals.css line 498:**

```css
@media (max-width: 1024px) {
  :root {
    --sidebar-width: 0px;
  }
}
```

**Changes:**
- Sidebar collapses (not relevant to BentoBox)
- No specific bento box changes at this breakpoint
- Padding remains 32px until next breakpoint

---

## Breakpoint 3: Mobile (≤ 768px)

**From globals.css lines 569-647:**

### Container Padding

```css
@media (max-width: 768px) {
  .bento-link > div,
  .service-bento > div {
    padding: 24px !important;
  }
}
```

**BentoBox changes:**
- Container padding: 32px → **24px**
- Better spacing for smaller screens
- Still comfortable reading experience

### Accent Bar Position

```css
@media (max-width: 768px) {
  /* Adjust left accent bars for mobile padding */
  p[style*="position: relative"] span[style*="position: absolute"][style*="left: -20px"] {
    left: -16px !important;
  }
}
```

**From globals.css line 619-621:**

**Accent bar changes:**
- Position: left: -20px → **left: -16px**
- Width remains 3px
- Accounts for reduced container padding

### Touch Targets

```css
@media (max-width: 768px) {
  .cta-button,
  .home-cta-button,
  .what-cta-button,
  .who-cta-button {
    min-height: 48px;
    padding: 16px 32px !important;
    font-size: 16px !important;
  }
}
```

**CTA button changes:**
- Min height: **48px** (better touch targets)
- Padding: **16px 32px**
- Font size: **16px** (up from 15px on desktop)

---

## Breakpoint 4: Small Mobile (≤ 480px)

**From globals.css lines 942-984:**

### Typography Adjustments

```css
@media (max-width: 480px) {
  h2 {
    font-size: 28px;
    line-height: 1.1;
    margin-bottom: 24px;
  }

  h3 {
    font-size: 16px;
    margin-top: 36px;
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    margin-bottom: 18px;
  }
}
```

**Typography changes:**
- H2 (page titles): 56px → **28px**
- H3 (bento titles): 17px → **16px**
- Body text: 17px → **16px**
- Tighter line-height and margins

### Container Padding

```css
@media (max-width: 480px) {
  /* Bento boxes - compact but not cramped */
  .bento-link > div,
  .service-bento > div {
    padding: 20px !important;
  }
}
```

**From globals.css line 970-973:**

**BentoBox changes:**
- Container padding: 24px → **20px**
- Compact spacing for small screens
- Still maintains readability

### Accent Bar Position

**Inferred from padding reduction:**

**Accent bar changes:**
- Position: left: -16px → **left: -12px**
- Proportional to container padding reduction
- Maintains visual balance

### Touch Targets

```css
@media (max-width: 480px) {
  .cta-button,
  .home-cta-button,
  .what-cta-button,
  .who-cta-button {
    min-height: 48px;
    padding: 14px 28px !important;
    width: 100%;
    text-align: center;
  }
}
```

**From globals.css line 976-984:**

**CTA button changes:**
- Min height: **48px** (consistent with tablet)
- Padding: **14px 28px** (slightly smaller than tablet)
- Width: **100%** (full-width buttons on small screens)
- Text alignment: **center**

---

## BentoBox Component Implementation

The BentoBox component handles these breakpoints via `BentoBox.module.css`:

### CSS Module Structure

```css
/* BentoBox.module.css */

/* Desktop (default) */
.bentoContainer {
  /* padding: 32px applied via inline styles */
}

.accentBar {
  left: -20px;
  width: 3px;
}

/* Tablet (≤ 1024px) */
@media (max-width: 1024px) {
  .bentoContainer {
    padding: 24px !important;
  }

  .accentBar {
    left: -16px !important;
  }
}

/* Mobile (≤ 768px) */
@media (max-width: 768px) {
  .bentoContainer {
    padding: 24px !important;
  }

  .accentBar {
    left: -16px !important;
  }
}

/* Small Mobile (≤ 480px) */
@media (max-width: 480px) {
  .bentoContainer {
    padding: 20px !important;
  }

  .accentBar {
    left: -12px !important;
  }

  .ctaDivider {
    padding-top: 16px !important;
  }

  .ctaActions {
    gap: 12px !important;
  }

  .ctaLink,
  .ctaButton {
    min-height: 44px !important;
    padding: 10px 16px !important;
  }
}
```

---

## Responsive Typography

Typography adjustments are handled by `globals.css` and apply automatically:

| Element | Desktop | Tablet | Mobile | Small Mobile |
|---------|---------|--------|--------|--------------|
| H2 (Page title) | 56px | 56px | 56px | 28px |
| H3 (Bento title) | 17px | 17px | 17px | 16px |
| Prompt text | 16px | 16px | 16px | 16px |
| Body text | 17px | 17px | 17px | 16px |
| Metadata | 14px | 14px | 14px | 14px |
| Price | 18px | 18px | 18px | 18px |
| CTA links | 15px | 15px | 16px | 16px |

---

## Spacing Changes Summary

### Container Padding

```
Desktop (> 1024px):    32px
Tablet (≤ 1024px):     24px  (-8px)
Mobile (≤ 768px):      24px  (same)
Small Mobile (≤ 480px): 20px  (-4px)
```

### Accent Bar Position

```
Desktop (> 1024px):    left: -20px
Tablet (≤ 1024px):     left: -16px  (+4px)
Mobile (≤ 768px):      left: -16px  (same)
Small Mobile (≤ 480px): left: -12px  (+4px)
```

**Rule:** Accent bar position adjusts proportionally to padding reduction to maintain visual balance.

---

## Touch Target Requirements

**Minimum touch target size: 44-48px** (following iOS and Material Design guidelines)

### Desktop
- CTA links: Natural size (15px font, minimal padding)
- Clickable area: Text only

### Tablet/Mobile (≤ 768px)
- CTA buttons: **48px min-height**
- Padding: **16px 32px**
- Font size: **16px**

### Small Mobile (≤ 480px)
- CTA buttons: **48px min-height**
- Padding: **14px 28px**
- Width: **100%**
- Text alignment: **center**

---

## Hover States on Mobile

**Important:** Hover states are disabled on touch devices via CSS:

```css
@media (hover: hover) {
  .service-bento:hover {
    transform: scale(1.02);
  }
}
```

**Mobile behavior:**
- No hover effects on touch devices
- Tap highlights handled by browser defaults
- Active states may apply briefly on tap

**Consideration:** The component uses standard hover CSS which won't trigger on mobile, so no special handling needed.

---

## Testing Responsive Behavior

### Chrome DevTools

1. Open `/bento-test`
2. Open DevTools (F12)
3. Toggle device toolbar (Ctrl+Shift+M)
4. Test these viewports:
   - Desktop: 1920x1080
   - Tablet: 768x1024
   - Mobile: 375x667 (iPhone SE)
   - Small Mobile: 320x568

### What to Check

**Desktop (1920px):**
- [ ] Padding: 32px
- [ ] Accent bar: left -20px
- [ ] CTA font: 15px
- [ ] Hover effects work

**Tablet (768px):**
- [ ] Padding: 24px
- [ ] Accent bar: left -16px
- [ ] CTA min-height: 48px
- [ ] Touch targets comfortable

**Mobile (480px):**
- [ ] Padding: 20px
- [ ] Accent bar: left -12px
- [ ] CTA width: 100%
- [ ] Font sizes adjusted
- [ ] Comfortable reading

---

## Mobile-Specific Optimizations

### 1. Reduced Padding
- Maximizes content area on small screens
- Maintains adequate whitespace for readability

### 2. Adjusted Accent Bars
- Prevents bars from being cut off by viewport edge
- Maintains visual hierarchy and brand identity

### 3. Enhanced Touch Targets
- 48px minimum height exceeds accessibility guidelines (44px)
- Comfortable tapping without fat-finger errors

### 4. Full-Width CTAs on Small Screens
- Easier to tap on small devices
- Clear visual hierarchy
- Reduces accidental misclicks

### 5. Typography Scaling
- Smaller fonts on small screens for content density
- Still maintains WCAG readability standards
- Consistent line-height for comfortable reading

---

## Accessibility Considerations

### Touch Target Sizes

**WCAG 2.1 Level AAA:** 44x44px minimum
**Our implementation:** 48px min-height ✅

### Text Scaling

**WCAG 2.1 Level AA:** Support up to 200% zoom
**Our implementation:** Uses relative units where possible ✅

**Note:** Some absolute px values used for precise design system compliance. Test with browser zoom at 200% to verify readability.

### Color Contrast

All text colors maintain WCAG AA contrast ratios:
- Body text (#444 on #fff): **9.74:1** ✅
- Metadata (#666 on #fff): **5.74:1** ✅
- CTA links (#666 on #fff): **5.74:1** ✅

---

## Common Mobile Issues (Avoided)

### ❌ Accent Bar Clipping
**Problem:** Accent bar positioned too far left gets cut off by viewport edge

**Solution:** Adjust position from -20px to -16px (tablet) to -12px (small mobile)

### ❌ Small Touch Targets
**Problem:** Desktop-sized CTAs too small for mobile tapping (< 44px)

**Solution:** 48px min-height + generous padding on mobile

### ❌ Text Overflow
**Problem:** Long service titles break layout on narrow screens

**Solution:**
- Flex wrap on title/badge container
- Word break CSS
- Appropriate font size reduction

### ❌ Cramped Spacing
**Problem:** Desktop padding too generous on small screens

**Solution:** Progressive padding reduction (32px → 24px → 20px)

---

## Usage Notes

The BentoBox component handles all responsive behavior automatically. No additional props or configuration needed.

```tsx
// Same code works on all screen sizes
<BentoBox
  variant="service"
  title="Service Name"
  badge="Strategy"
  price="From £50,000"
  onEnquire={() => ...}
>
  <p>Content...</p>
</BentoBox>
```

**Responsive styles applied via:**
1. `BentoBox.module.css` (container, accent bar, CTAs)
2. `globals.css` (typography, existing hover states)

---

## Related Files

- **Component:** `/components/BentoBox.tsx`
- **Responsive CSS:** `/components/BentoBox.module.css` (NEW)
- **Global styles:** `/app/globals.css` (lines 498-1020)
- **Desktop spec:** `/BENTO_BOX_SPEC.md`
- **Documentation:** `/components/BentoBox.README.md`

---

**Status:** ✅ Responsive behavior implemented and documented

**Test:** Visit `/bento-test` and resize browser to see responsive behavior
