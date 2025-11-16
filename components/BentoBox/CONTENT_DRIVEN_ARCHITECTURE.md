# BentoBox Content-Driven Architecture

## ✅ What You Have Now

A complete **content-driven system** for creating BentoBox instances using JSON files instead of hardcoded JSX.

---

## 📁 File Structure

```
components/BentoBox/
├── index.ts                          # Main component export
├── BentoBox.tsx                      # UI component (structure only)
├── BentoBox.module.css              # Responsive styles
├── BentoBox.README.md               # Component API documentation
├── BentoBox.examples.tsx            # JSX usage examples
│
├── CONTENT_SCHEMA.md                # ⭐ THIS DOCUMENT - JSON schema definition
├── CONTENT_DRIVEN_ARCHITECTURE.md   # ⭐ THIS SUMMARY - How it all works
│
└── content/                         # ⭐ CONTENT FILES
    ├── template.json                # Template with inline instructions
    ├── sir-alfie.json              # Example product bento
    └── [your-bento].json           # Add new bentos here
```

---

## 🎯 Philosophy

### Before (Code-Driven)

**Problem:** Content mixed with code
```tsx
// app/products/page.tsx
<BentoBox variant="product" title="Sir Alfie" prompt="...">
  <p>Most CRMs are graveyards...</p>
  <p>Agents browse the internet...</p>
  <p>Maximum human in the loop...</p>
</BentoBox>
```

❌ Hard to edit content
❌ Need developer to add new bentos
❌ Content changes require code changes
❌ Can't reuse bentos across pages

### After (Content-Driven)

**Solution:** Content in JSON, code defines structure
```json
// components/BentoBox/content/sir-alfie.json
{
  "id": "sir-alfie",
  "variant": "product",
  "content": {
    "title": "Sir Alfie",
    "prompt": { "text": "..." },
    "body": [
      { "text": "Most CRMs are graveyards..." },
      { "text": "Agents browse the internet..." }
    ]
  }
}
```

```tsx
// app/products/page.tsx
import sirAlfie from '@/components/BentoBox/content/sir-alfie.json';
<BentoBoxFromContent content={sirAlfie} />
```

✅ Content editors can change text
✅ Add new bentos by copying template
✅ Version control for content
✅ Reuse same bento on multiple pages

---

## 🚀 How to Create a New Bento

### Step 1: Copy Template

```bash
cd components/BentoBox/content/
cp template.json my-new-product.json
```

### Step 2: Fill in Content

Open `my-new-product.json` and fill in:

```json
{
  "id": "my-new-product",
  "variant": "product",
  "enabled": true,
  "metadata": {
    "created": "2025-11-16",
    "author": "Your Name"
  },
  "service": {
    "durationWeeks": 8,
    "bufferWeeks": 2,
    "basePrice": 50000
  },
  "content": {
    "prompt": {
      "type": "static",
      "text": "If [your problem statement]..."
    },
    "title": "My New Product",
    "body": [
      { "type": "text", "text": "First paragraph..." },
      { "type": "text", "text": "Second paragraph..." }
    ]
  },
  "footer": {
    "type": "price-cta",
    "price": "From £50,000"
  },
  "actions": {
    "enquire": { "enabled": true }
  }
}
```

**Note:** The `service` object is optional - only needed for consulting services with delivery dates and modals.

### Step 3: Remove Comments

Delete all `_notes`, `_comment`, and `_instructions` fields.

### Step 4: Use in Page

```tsx
import myProduct from '@/components/BentoBox/content/my-new-product.json';

<BentoBoxFromContent content={myProduct} />
```

**That's it!** No code changes needed.

---

## 📋 Content Schema Quick Reference

### Minimal Required Fields

```json
{
  "id": "unique-id",
  "variant": "product",
  "content": {
    "title": "Title Here"
  }
}
```

### Full Example (All Fields)

```json
{
  "id": "full-example",
  "variant": "service",
  "enabled": true,
  "metadata": { "author": "You" },
  "content": {
    "prompt": { "type": "static", "text": "Problem..." },
    "title": "Service Name",
    "badge": "Strategy",
    "body": [
      { "type": "text", "text": "Para 1..." },
      { "type": "dynamic", "dynamicKey": "key" }
    ],
    "metadata": {
      "type": "static",
      "text": "8 weeks. By {date}.",
      "variables": {
        "date": {
          "type": "dynamic",
          "function": "getDeliveryDate",
          "args": ["service-id"]
        }
      }
    }
  },
  "footer": {
    "type": "price-cta",
    "price": "From £50,000"
  },
  "actions": {
    "share": {
      "enabled": true,
      "subject": "Check this out",
      "body": "Email body..."
    },
    "enquire": {
      "enabled": true,
      "modalId": "service-id"
    }
  }
}
```

---

## 🔧 Content Types

### 1. Static Text (Hardcoded)

```json
{
  "type": "text",
  "text": "Your content here..."
}
```

### 2. Dynamic Content (From Cache)

```json
{
  "type": "dynamic",
  "dynamicKey": "fieldNameFromDynamicContentJSON"
}
```

Fetches from `/data/dynamic-content.json` via `getDynamicContent()`.

### 3. Variable Substitution

```json
{
  "type": "static",
  "text": "Delivered by {deliveryDate}.",
  "variables": {
    "deliveryDate": {
      "type": "dynamic",
      "function": "getDeliveryDate",
      "args": ["service-id"]
    }
  }
}
```

Calls `getDeliveryDate('service-id')` and replaces `{deliveryDate}` in text.

---

## 🎨 Variants

### Product Bento
```json
{
  "variant": "product",
  "footer": {
    "type": "custom",
    "primaryText": "Tagline.",
    "secondaryText": "Subtitle."
  }
}
```
- No price
- No CTAs
- Custom messaging in footer

### Service Bento
```json
{
  "variant": "service",
  "footer": {
    "type": "price-cta",
    "price": "From £50,000"
  },
  "actions": {
    "share": { "enabled": true },
    "enquire": { "enabled": true }
  }
}
```
- Shows price
- Share + Enquire CTAs

### Link Bento
```json
{
  "variant": "link",
  "actions": {
    "link": {
      "enabled": true,
      "href": "/consulting",
      "text": "Learn More"
    }
  }
}
```
- Navigation card
- Single link action

---

## 🔗 Actions

### Share Email
```json
"share": {
  "enabled": true,
  "subject": "Worth looking at: {title}",
  "body": "Hey,\n\nCheck this out: {url}"
}
```
Opens mailto link with pre-filled subject/body.

### Enquire Modal
```json
"enquire": {
  "enabled": true,
  "modalId": "service-name"
}
```
Opens ProductsEnquiryModal with ID.

### Navigation Link
```json
"link": {
  "enabled": true,
  "href": "/page#anchor",
  "text": "Learn More",
  "target": "_self"
}
```
Navigates to URL.

### Custom Action
```json
"custom": {
  "enabled": true,
  "handler": "myCustomFunction",
  "label": "Do Something"
}
```
Calls JavaScript function (advanced).

---

## 📊 Comparison

| Aspect | Code-Driven (Old) | Content-Driven (New) |
|--------|------------------|---------------------|
| **Add New Bento** | Edit JSX code | Copy JSON file |
| **Change Content** | Find code, edit JSX | Edit JSON file |
| **Who Can Edit** | Developers only | Content editors |
| **Reusability** | Copy-paste code | Import same file |
| **Version Control** | Mixed with code | Separate content commits |
| **A/B Testing** | Duplicate components | Swap JSON files |
| **Type Safety** | TypeScript props | JSON schema validation |

---

## 🎯 Next Steps (Implementation)

To fully enable this system, you need to build:

### 1. BentoBoxFromContent Component

```tsx
// components/BentoBox/BentoBoxFromContent.tsx
export function BentoBoxFromContent({ content, dynamicData }) {
  // Parse JSON content
  // Resolve dynamic content
  // Render BentoBox with parsed props
}
```

### 2. Content Loader Utility

```tsx
// lib/bentoLoader.ts
export async function loadBentosByPage(page: string) {
  // Load all JSON files from content/
  // Filter by page/category
  // Return array of content objects
}
```

### 3. Dynamic Content Integration

```tsx
// Combine static content with dynamic data
const dynamicData = await getDynamicContent();
<BentoBoxFromContent content={bentoJSON} dynamicData={dynamicData} />
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `CONTENT_SCHEMA.md` | Complete JSON schema reference |
| `CONTENT_DRIVEN_ARCHITECTURE.md` | This file - overview and guide |
| `template.json` | Copy this to create new bentos |
| `sir-alfie.json` | Real example to learn from |

---

## ✅ What's Already Done

✅ Complete content schema designed
✅ Template file with inline instructions
✅ Example content file (Sir Alfie)
✅ Documentation (schema + architecture)
✅ File structure organized

---

## 🚧 What's Needed Next

To actually use this system in production:

⬜ Build `BentoBoxFromContent` component
⬜ Create `bentoLoader` utility
⬜ Add JSON schema validation (optional)
⬜ Migrate existing bentos to JSON
⬜ Test on products page
⬜ Update BentoBox.README.md with new approach

**Would you like me to build the BentoBoxFromContent component next?**

---

## 💡 Benefits Summary

**For Developers:**
- Less repetitive JSX code
- Cleaner page components
- Easier to maintain

**For Content Editors:**
- Edit content without touching code
- Clear template with instructions
- Can't break the UI

**For the Business:**
- Faster to launch new products/services
- A/B test content easily
- Scale content creation

---

## 🏆 Zero-Config Architecture (Current State)

### The Big Win: No Hardcoded Configs

**Before this update:**
```typescript
// Had to maintain service config in code
const SERVICE_CONFIG = {
  'pioneers-of-purpose': { duration: 8, price: '50000' },
  'esi-framework': { duration: 6, price: '40000' },
  // ... 12 more services
};
```

**Now:**
```json
// Everything lives in the JSON file
{
  "id": "pioneers-of-purpose",
  "service": {
    "durationWeeks": 8,
    "bufferWeeks": 2,
    "basePrice": 50000
  }
}
```

**Result:** Add a new £75,000, 12-week service by creating ONE JSON file. Zero code changes needed.

---

## 📦 Using ConsultingBentoProvider

For pages with multiple consulting bentos (like /consultingtest):

```tsx
'use client';
import { BentoBoxFromContent, ConsultingBentoProvider } from '@/components/BentoBox';
import pioneersContent from '@/components/BentoBox/content/pioneers-of-purpose.json';
import esiContent from '@/components/BentoBox/content/esi-framework.json';

export default function ConsultingPage() {
  const bentos = [pioneersContent as any, esiContent as any];

  return (
    <ConsultingBentoProvider bentos={bentos}>
      {({ dynamicContent, functionRegistry, onEnquire }) => (
        <>
          <BentoBoxFromContent 
            content={bentos[0]} 
            dynamicData={dynamicContent} 
            functionRegistry={functionRegistry} 
            onEnquire={onEnquire} 
          />
          <BentoBoxFromContent 
            content={bentos[1]} 
            dynamicData={dynamicContent} 
            functionRegistry={functionRegistry} 
            onEnquire={onEnquire} 
          />
        </>
      )}
    </ConsultingBentoProvider>
  );
}
```

**What ConsultingBentoProvider handles automatically:**
- ✅ Fetches dynamic content from `/api/dynamic-content`
- ✅ Calculates delivery dates: `today + (durationWeeks + bufferWeeks) weeks`
- ✅ Opens enquiry modals with correct pricing and duration from JSON
- ✅ Manages modal state for all bentos on the page
- ✅ Passes props to all child bentos

---

## ✨ Current Feature Set

**System Status: Production-Ready ✅**

- ✅ `BentoBoxFromContent` - Renders bentos from JSON
- ✅ `ConsultingBentoProvider` - Handles multiple bentos on a page
- ✅ `ConsultingBentoWrapper` - Handles single bentos
- ✅ JSON schema with full TypeScript types
- ✅ Service config in JSON (pricing, duration, modals)
- ✅ Dynamic content with fallbacks
- ✅ Delivery date calculations from JSON
- ✅ Share email templates
- ✅ Enquire modals
- ✅ Red accent animations (desktop hover, mobile viewport)
- ✅ Comprehensive documentation

---

## 🎯 Architecture Summary

**What's in JSON:**
- Content (titles, descriptions, body text)
- Service config (duration, pricing, buffer time)
- Actions (share templates, enquire modals)
- Dynamic content fallbacks
- Styling overrides

**What's in Code:**
- UI structure (BentoBox component)
- Responsive styles (CSS modules)
- Provider logic (fetch, state management)
- Function registry (date calculations)

**Result:** True separation of concerns. Content changes = edit JSON. UI changes = edit components.

