# Bento Box Component Roadmap

## Executive Summary

Transform the existing inline bento box patterns into a unified, reusable component system that maintains design consistency across the site while dramatically reducing code duplication.

**Current State:** 17+ bento box implementations with duplicated styles and inconsistent patterns
**Target State:** Single `<BentoBox>` component with variants covering all use cases

---

## Phase 1: Component Architecture Design

### 1.1 Identified Bento Box Variants

Based on analysis of `app/products/page.tsx`, `app/what/page.tsx`, and `components/EngagementClient.tsx`:

**Primary Variants:**
1. **`bento-link`** - Navigation/CTA cards with links (used in `/what` page)
2. **`service-bento`** - Service offering cards with pricing and enquiry CTAs (used in `/consulting`)
3. **`product-bento`** - Product showcase cards (used in `/products`)

**Common Patterns Across All:**
- White background (`#fff`)
- 12px border radius
- 32px padding (some 40px for primary emphasis)
- Red accent bar (3px, left: -20px, color: #D43225)
- Divider line at bottom (1px solid #e0e0e0)
- Hover effects (transform scale/translateY + red accent on divider)
- Consistent typography hierarchy

### 1.2 Proposed Component API

```typescript
interface BentoBoxProps {
  // Content
  prompt?: string;                    // Top accent line (e.g., "If you're saying yes to everything...")
  title: string;                      // Main heading
  badge?: string;                     // Optional tag (e.g., "Strategy", "Live")
  children: React.ReactNode;          // Main body content (paragraphs, etc.)

  // Footer/CTA Area
  footer?: {
    primary: string;                  // Main CTA text (e.g., "From £50,000" or "Turns 'busy' into 'lethal'")
    secondary?: string;               // Subtitle text (e.g., "Stop drowning. Start compounding.")
    metadata?: string;                // Small italic text (e.g., "Eight weeks. Purpose architecture...")
    cta?: BentoBoxCTA | BentoBoxCTA[];  // Action buttons/links
  };

  // Variants
  variant?: 'default' | 'primary' | 'product';

  // Dynamic Content Support
  dynamicContent?: boolean;           // Enable fade-in animation

  // Link behavior (makes entire card clickable)
  href?: string;
  onClick?: () => void;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

interface BentoBoxCTA {
  label: string;
  href?: string;                      // For links
  onClick?: () => void;               // For buttons
  variant?: 'link' | 'button' | 'share' | 'enquire';
  icon?: React.ReactNode;             // Optional icon
}
```

### 1.3 Visual Specifications (from VISUAL_IDENTITY.md)

**Base Styles:**
```css
.bento-box {
  background-color: #fff;
  padding: 32px;
  border-radius: 12px;
  transition: transform 0.3s ease;
  border: 1px solid #e0e0e0;
  position: relative;
}

.bento-box--primary {
  padding: 40px 32px;
  border: 1px solid #D43225;  /* Red border for emphasis */
}

.bento-box--product {
  padding: 32px;
  border: none;
  cursor: pointer;
}
```

**Hover Behaviors:**
- `bento-link`: scale(1.02) + divider turns red
- `service-bento`: scale(1.02) + divider turns red
- `product-bento`: translateY(-2px) + divider turns red

**Typography Hierarchy:**
- Prompt: 16px, position: relative, left accent bar
- Title: 17px, 700 weight, uppercase, 1px letter-spacing
- Badge: 10px, 600 weight, uppercase, gray background
- Body: 16-17px, line-height 1.6, color #444
- Footer Primary: 18px, 600 weight, color #222
- Footer Secondary: 14px, color #666
- Metadata: 14px, italic, color #666

---

## Phase 2: Implementation Plan

### 2.1 Create Component Structure

**File:** `components/BentoBox.tsx`

```typescript
'use client';

import React from 'react';
import Link from 'next/link';

export default function BentoBox({
  prompt,
  title,
  badge,
  children,
  footer,
  variant = 'default',
  dynamicContent = false,
  href,
  onClick,
  className = '',
  style = {}
}: BentoBoxProps) {
  // Implementation details below...
}
```

**Key Features:**
1. Conditional wrapper (Link vs div vs button)
2. Accent bar on prompt lines
3. Flexible CTA rendering (multiple buttons/links)
4. Variant-specific styling
5. Dynamic content fade-in support

### 2.2 Create Sub-components

**File:** `components/BentoBox/index.tsx` (barrel export)
- `BentoBox` (main component)
- `BentoBox.Prompt` (accent line with text)
- `BentoBox.Title` (heading with optional badge)
- `BentoBox.Footer` (divider + CTA area)
- `BentoBox.CTA` (action buttons/links)

### 2.3 CSS Module or Tailwind Classes

**Option A: CSS Module** (`components/BentoBox.module.css`)
```css
.bento {
  background-color: #fff;
  padding: 32px;
  border-radius: 12px;
  transition: transform 0.3s ease;
  border: 1px solid #e0e0e0;
}

.bento--primary { ... }
.bento--product { ... }
.prompt { ... }
.title { ... }
.badge { ... }
.footer { ... }
.divider { ... }
```

**Option B: Tailwind Utility Classes** (recommended for this project)
- Use existing Tailwind v4 setup
- Define custom classes in `globals.css` if needed
- Leverage existing `.bento-link`, `.service-bento`, `.product-bento` styles

---

## Phase 3: Migration Strategy

### 3.1 Gradual Rollout

**Week 1: Core Component + Documentation**
1. Build `BentoBox` component with all variants
2. Create Storybook/documentation examples
3. Test with one simple page (e.g., `/what` page - 2 boxes)

**Week 2: Service Pages Migration**
1. Migrate `/consulting` page (12 service boxes)
2. Validate dynamic content integration
3. Test enquiry modal integration

**Week 3: Product Pages Migration**
1. Migrate `/products` page (3 product boxes)
2. Ensure hover animations work correctly

**Week 4: Edge Cases + Polish**
1. Handle any custom one-off implementations
2. Remove old inline styles
3. Update CSS to remove unused bento classes

### 3.2 Backward Compatibility

During migration:
- Keep existing `.bento-link`, `.service-bento`, `.product-bento` CSS
- Component should accept `className` prop for custom overrides
- Allow `style` prop for edge cases

---

## Phase 4: Usage Examples

### Example 1: Simple Link Card (from `/what` page)

**Before:**
```tsx
<div
  className="bento-link"
  style={{
    backgroundColor: '#fff',
    padding: '40px 32px',
    borderRadius: '12px',
    transition: 'transform 0.3s ease',
    border: '1px solid #D43225'
  }}>
  <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', color: '#222' }}>Consulting Services</h3>
  <p style={{ marginBottom: '16px', fontSize: '16px', lineHeight: '1.6', color: '#444' }}>
    <strong>Some problems need custom work.</strong> Every consultancy...
  </p>
  <div className="cta-divider" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
    <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '4px', color: '#222' }}>We fix things. Then we leave.</p>
    <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>No retainers. No dependency.</p>
    <Link href="/consulting">Explore Services</Link>
  </div>
</div>
```

**After:**
```tsx
<BentoBox
  variant="primary"
  title="Consulting Services"
  footer={{
    primary: "We fix things. Then we leave.",
    secondary: "No retainers. No dependency.",
    cta: {
      label: "Explore Services",
      href: "/consulting",
      variant: "button"
    }
  }}
>
  <p><strong>Some problems need custom work.</strong> Every consultancy...</p>
  <p>We work directly with you and adapt as the problem reveals itself...</p>
</BentoBox>
```

### Example 2: Service Card with Dynamic Content

**Before:** (see `EngagementClient.tsx` lines 78-126)

**After:**
```tsx
<BentoBox
  variant="default"
  prompt="If your internal culture and external message feel misaligned..."
  title="Pioneers of Purpose Assessment"
  badge="Strategy"
  footer={{
    metadata: `Eight weeks. Purpose architecture mapped across every system and touchpoint by ${getDeliveryDate('pioneers-of-purpose')}.`,
    primary: "From £50,000",
    cta: [
      {
        label: "Share",
        href: `mailto:?subject=...&body=...`,
        variant: "share"
      },
      {
        label: "Enquire",
        onClick: () => setEnquiryModalOpen('pioneers-of-purpose'),
        variant: "enquire"
      }
    ]
  }}
>
  <DynamicServiceDescription content={serviceDescription} />
</BentoBox>
```

### Example 3: Product Card

**Before:** (see `app/products/page.tsx` lines 49-79)

**After:**
```tsx
<BentoBox
  variant="product"
  prompt="If you're saying yes to everything and achieving nothing..."
  title="The Focus Matrix"
  footer={{
    primary: "Turns \"busy\" into \"lethal\".",
    secondary: "Stop drowning. Start compounding."
  }}
>
  <p>Poker players calculate expected value on every bet. You should too...</p>
  <p>This runs game theory on your entire calendar...</p>
  <p>Your time is finite. Most people spend it on what screams loudest...</p>
</BentoBox>
```

---

## Phase 5: Benefits & Impact

### Code Reduction
- **Current:** ~2,500 lines of duplicated bento box code
- **After:** ~200 lines of component code + ~300 lines of usage
- **Savings:** ~80% reduction in bento-related code

### Consistency Guarantees
- ✅ Red accent always 3px, left: -20px, #D43225
- ✅ Hover animations consistent across all variants
- ✅ Typography hierarchy enforced
- ✅ Spacing/padding standardized
- ✅ Dynamic content integration unified

### Developer Experience
- ✅ Single source of truth for bento styling
- ✅ TypeScript autocomplete for all props
- ✅ Easy to add new variants
- ✅ Clear documentation and examples
- ✅ Reduced cognitive load when building new pages

### Maintainability
- ✅ Design changes propagate automatically
- ✅ A/B testing variants becomes trivial
- ✅ Accessibility improvements centralized
- ✅ Performance optimizations apply everywhere

---

## Phase 6: Testing & Quality Assurance

### 6.1 Visual Regression Testing
- Screenshot comparison of before/after migration
- Test all hover states
- Verify mobile responsive behavior
- Check dynamic content fade-in animations

### 6.2 Functional Testing
- Click handlers work correctly
- Links navigate properly
- Modals open on enquiry CTAs
- Share links generate correct mailto: URLs
- Dynamic content loads and displays

### 6.3 Accessibility Testing
- Keyboard navigation (tab through CTAs)
- Screen reader compatibility
- Focus states visible
- Semantic HTML structure

---

## Phase 7: Documentation

### 7.1 Developer Documentation

Create `components/BentoBox/README.md`:
- Props API reference
- Variant descriptions
- Usage examples
- Migration guide
- Design rationale

### 7.2 Design System Integration

Update `PrismaticaSoul/VISUAL_IDENTITY.md`:
- Add BentoBox component section
- Document variants and when to use each
- Include code examples
- Link to component README

### 7.3 CLAUDE.md Update

Add to component architecture section:
```markdown
### BentoBox Component

Universal card component used across the site for services, products, and navigation.

**Variants:**
- `default` - Standard service/offering cards
- `primary` - Emphasized cards with red border
- `product` - Product showcase cards

**Usage:**
All bento boxes use the `<BentoBox>` component from `components/BentoBox.tsx`.
Do not create inline bento box styles. Use the component with appropriate variant.
```

---

## Phase 8: Future Enhancements

### 8.1 Animation Improvements
- Stagger animations when multiple boxes appear
- Loading skeleton states
- Micro-interactions (subtle hover reveals)

### 8.2 Advanced Features
- Grid layout helper for bento collections
- Filtering/sorting for service cards
- Comparison mode (side-by-side bentos)
- Bookmark/favorite functionality

### 8.3 Performance Optimizations
- Lazy load bento content below fold
- Optimize re-renders with React.memo
- Reduce animation jank with CSS containment

---

## Implementation Checklist

### Phase 1: Design ✅
- [x] Analyze existing implementations
- [ ] Finalize component API
- [ ] Create design spec document
- [ ] Get stakeholder approval

### Phase 2: Build
- [ ] Create `BentoBox.tsx` component
- [ ] Build sub-components (Prompt, Title, Footer, CTA)
- [ ] Add TypeScript interfaces
- [ ] Write CSS/Tailwind styles
- [ ] Create unit tests

### Phase 3: Documentation
- [ ] Write component README
- [ ] Create usage examples
- [ ] Add Storybook stories (if available)
- [ ] Update VISUAL_IDENTITY.md
- [ ] Update CLAUDE.md

### Phase 4: Migration
- [ ] Migrate `/what` page (2 boxes)
- [ ] Migrate `/consulting` page (12 boxes)
- [ ] Migrate `/products` page (3 boxes)
- [ ] Update any other pages using bentos
- [ ] Remove deprecated inline styles

### Phase 5: Testing
- [ ] Visual regression tests
- [ ] Functional tests
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Mobile responsive testing

### Phase 6: Cleanup
- [ ] Remove unused CSS classes
- [ ] Update git history/comments
- [ ] Performance audit
- [ ] Final code review

---

## Success Metrics

1. **Code Health:**
   - 80%+ reduction in bento-related code
   - Zero new inline bento box styles after migration
   - 100% TypeScript type coverage

2. **Design Consistency:**
   - 100% of bentos use standard red accent (#D43225, 3px, left: -20px)
   - 100% of bentos use consistent hover animations
   - 100% of bentos follow typography hierarchy

3. **Developer Velocity:**
   - New bento boxes take <5 minutes to implement
   - Zero design questions about bento styling
   - 90%+ developer satisfaction with component API

4. **Performance:**
   - No regression in page load times
   - No layout shift (CLS) issues
   - Smooth 60fps hover animations

---

## Timeline Estimate

**Total Time:** 3-4 weeks

- **Week 1:** Design, API finalization, core component build
- **Week 2:** Testing, documentation, initial migration (`/what` page)
- **Week 3:** Full migration (`/consulting`, `/products`)
- **Week 4:** Polish, cleanup, final testing, launch

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Breaking existing layouts | Medium | High | Visual regression testing, gradual rollout |
| Component API too rigid | Low | Medium | Accept `className` and `style` props for escape hatches |
| Performance regression | Low | Medium | Benchmark before/after, use React.memo |
| Accessibility issues | Low | High | ARIA audit, keyboard navigation testing |
| Dynamic content integration breaks | Medium | High | Test with all dynamic content components first |

---

## Notes

- This roadmap assumes the existing design system in `PrismaticaSoul/VISUAL_IDENTITY.md` remains stable
- All measurements and colors reference the current design spec
- Component should be flexible enough to handle future design iterations
- Keep the "quiet confidence, zero noise, maximum clarity" philosophy in mind
