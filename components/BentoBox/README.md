# BentoBox System - Complete Guide

## Table of Contents
1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Creating Your First Bento](#creating-your-first-bento)
4. [Content Types](#content-types)
5. [Dynamic Content with Fallbacks](#dynamic-content-with-fallbacks)
6. [Footer Types](#footer-types)
7. [Actions (Share, Enquire, Links)](#actions)
8. [Complete JSON Schema Reference](#complete-json-schema-reference)
9. [Examples](#examples)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The BentoBox system is a **content-driven architecture** that separates content from code. Instead of hardcoding content in React components, you define it in JSON files. This makes content easy to:

- ✅ Update without touching code
- ✅ Manage by non-developers
- ✅ Version control
- ✅ Reuse across pages
- ✅ Generate dynamically with AI

### Benefits

**Before (Old System):**
```tsx
<div className="service-bento">
  <p>If your internal culture...</p>
  <h3>Pioneers of Purpose</h3>
  <p>{dynamicContent.serviceDescription || fallback}</p>
  {/* 50+ more lines of JSX... */}
</div>
```

**After (New System):**
```tsx
<BentoBoxFromContent content={pioneersContent} dynamicData={dynamicContent} />
```

---

## Quick Start

### 1. Create a JSON File

Create a new file in `/components/BentoBox/content/your-bento.json`:

```json
{
  "id": "your-bento-id",
  "variant": "product",
  "enabled": true,
  "content": {
    "title": "Your Product Name",
    "body": [
      {
        "type": "text",
        "text": "Your product description goes here."
      }
    ]
  },
  "footer": {
    "type": "custom",
    "primaryText": "£299/month",
    "secondaryText": "per seat"
  }
}
```

### 2. Import and Use

```tsx
import { BentoBoxFromContent } from '@/components/BentoBox';
import yourBento from '@/components/BentoBox/content/your-bento.json';

const bento = yourBento as any;

export default function YourPage() {
  return <BentoBoxFromContent content={bento} />;
}
```

That's it! Your bento is live.

---

## Creating Your First Bento

### Step 1: Use the Template

Copy `/components/BentoBox/content/template.json` and rename it:

```bash
cp components/BentoBox/content/template.json components/BentoBox/content/my-product.json
```

### Step 2: Fill in Required Fields

**Minimum required fields:**

```json
{
  "id": "my-product",
  "variant": "product",
  "enabled": true,
  "content": {
    "title": "My Product Name",
    "body": [
      {
        "type": "text",
        "text": "Product description."
      }
    ]
  }
}
```

### Step 3: Import in Your Page

```tsx
import myProduct from '@/components/BentoBox/content/my-product.json';
const product = myProduct as any;

<BentoBoxFromContent content={product} />
```

---

## Content Types

### Variants

There are 3 bento variants, each with different styling:

#### 1. `"service"` - Consulting Services
- **Use for:** High-value consulting services
- **Style:** Service bento with hover effects
- **Example:** Pioneers of Purpose, ESI Framework

```json
{
  "variant": "service"
}
```

#### 2. `"product"` - Products
- **Use for:** Product offerings
- **Style:** Product bento with mobile scroll animations
- **Example:** Focus Matrix, Sir Alfie

```json
{
  "variant": "product"
}
```

#### 3. `"link"` - Navigation Links
- **Use for:** Links to other pages or sections
- **Style:** Link bento with subtle borders
- **Example:** Consulting Services link, Product Suite link

```json
{
  "variant": "link"
}
```

### Optional Fields

#### Prompt (Problem Statement)
Shows above the title with a red accent bar:

```json
"content": {
  "prompt": {
    "type": "static",
    "text": "If you're facing this problem..."
  }
}
```

#### Badge (Category Tag)
Small label next to the title:

```json
"content": {
  "badge": "Strategy"
}
```

Options: `"Strategy"`, `"Marketing"`, `"Technology"`, `"Process"`

#### Metadata (Timeline/Duration)
Shows below the body content in italics:

```json
"content": {
  "metadata": {
    "type": "static",
    "text": "Six weeks. Results by end of March."
  }
}
```

---

## Dynamic Content with Fallbacks

### The Problem
AI-generated content might not always be available. You need fallback text.

### The Solution
Use `type: "dynamic"` with a `fallback` field:

```json
"body": [
  {
    "type": "dynamic",
    "field": "serviceDescription",
    "fallback": "Default description that shows if AI content isn't available yet."
  }
]
```

### How It Works

1. **System checks:** Is `dynamicData.serviceDescription` available?
2. **If YES:** Shows the AI-generated content
3. **If NO:** Shows your fallback text
4. **Never fails:** Always displays something meaningful

### Available Dynamic Fields

From `/lib/getDynamicContent.ts`:

- `newsInsight` - Current news-based insight
- `intelligenceExample` - Intelligence example
- `consultingInsight` - Consulting insight
- `serviceDescription` - Service description
- `esiDescription` - ESI Framework description
- `agencyDescription` - Secret Agency description
- `ksoDescription` - KSO Workshop description
- `transactionDescription` - Transaction Architecture description
- `triptychDescription` - Strategic Triptych description
- `marketObservation` - Market observation
- `inlineObservation` - Inline observation
- `userContentReminder` - User content reminder

### Example: Multiple Paragraphs (Static + Dynamic)

```json
"body": [
  {
    "type": "text",
    "text": "This intro paragraph is always the same."
  },
  {
    "type": "dynamic",
    "field": "serviceDescription",
    "fallback": "Default service description. Gets replaced by AI-generated content every 6 hours."
  },
  {
    "type": "text",
    "text": "This closing paragraph is static."
  }
]
```

### Passing Dynamic Data

In your page component:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { BentoBoxFromContent } from '@/components/BentoBox';
import myBento from '@/components/BentoBox/content/my-bento.json';

export default function MyPage() {
  const [dynamicContent, setDynamicContent] = useState(null);

  useEffect(() => {
    fetch('/api/dynamic-content')
      .then(res => res.json())
      .then(setDynamicContent);
  }, []);

  return (
    <BentoBoxFromContent
      content={myBento as any}
      dynamicData={dynamicContent}
    />
  );
}
```

---

## Footer Types

### 1. Price CTA Footer

Shows a price and automatically includes Share/Enquire actions:

```json
"footer": {
  "type": "price-cta",
  "price": "From £50,000"
}
```

### 2. Custom Footer

Complete control over footer content:

```json
"footer": {
  "type": "custom",
  "primaryText": "£299/month",
  "secondaryText": "per seat + API credits*",
  "note": "*API costs separate. Most users: £50-200/month."
}
```

### 3. Custom Footer with Link Button

For navigation bentos:

```json
"footer": {
  "type": "custom",
  "primaryText": "We fix things. Then we leave.",
  "secondaryText": "No retainers. No dependency.",
  "linkButton": {
    "text": "Explore Services",
    "href": "/consulting",
    "style": "primary"
  }
}
```

Button styles:
- `"primary"` - Red background, white text
- `"secondary"` - White background, gray text, border

---

## Actions

### Share Action (Email)

Adds a "Share" link that opens email with pre-filled content:

```json
"actions": {
  "share": {
    "enabled": true,
    "subject": "Worth looking at: {title}",
    "body": "Check this out: {url}\n\nI thought you might find this useful."
  }
}
```

**Available variables:**
- `{title}` - Bento title
- `{url}` - Current page URL
- `{deliveryDate}` - Calculated delivery date (if using function registry)

### Enquire Action (Modal)

Adds an "Enquire" button that opens a modal:

```json
"actions": {
  "enquire": {
    "enabled": true,
    "modalId": "your-service-id"
  }
}
```

**In your page:**

```tsx
const [enquiryModalOpen, setEnquiryModalOpen] = useState(null);

<BentoBoxFromContent
  content={myBento}
  onEnquire={(modalId) => setEnquiryModalOpen(modalId)}
/>

{enquiryModalOpen && (
  <EnquiryModal
    serviceName={enquiryModalOpen}
    onClose={() => setEnquiryModalOpen(null)}
  />
)}
```

### Link Action

For navigation bentos, use a link button in the footer instead (see Footer Types above).

---

## Complete JSON Schema Reference

```json
{
  "id": "unique-bento-id",
  "variant": "service" | "link" | "product",
  "enabled": true | false,
  "metadata": {
    "created": "2025-11-16",
    "author": "Prismatica Labs",
    "notes": "Optional notes about this bento"
  },
  "service": {
    "durationWeeks": 8,
    "bufferWeeks": 2,
    "basePrice": 50000
  },
  "content": {
    "prompt": {
      "type": "static",
      "text": "Problem statement with red accent bar"
    },
    "title": "Bento Title",
    "badge": "Strategy" | "Marketing" | "Technology" | "Process",
    "body": [
      {
        "type": "text",
        "text": "Static paragraph text"
      },
      {
        "type": "dynamic",
        "field": "dynamicFieldName",
        "fallback": "Fallback text if dynamic content unavailable"
      }
    ],
    "metadata": {
      "type": "static",
      "text": "Timeline or duration information"
    }
  },
  "footer": {
    "type": "price-cta",
    "price": "From £50,000"
  },
  "actions": {
    "share": {
      "enabled": true,
      "subject": "Email subject line",
      "body": "Email body with {variables}"
    },
    "enquire": {
      "enabled": true,
      "modalId": "modal-identifier"
    }
  },
  "style": {
    "border": "1px solid #D43225"
  }
}
```

### Service Configuration (For Consulting Services)

The `service` object is **optional** and only needed for consulting services that have enquire modals and delivery date calculations.

- **`durationWeeks`** (number, required): Service duration in weeks
- **`bufferWeeks`** (number, optional): Buffer time to get started (defaults to 0)
- **`basePrice`** (number, required): Base price in the smallest currency unit (e.g., 50000 for £50,000)

**How it works:**
- Delivery date = current date + (durationWeeks + bufferWeeks) × 7 days
- Modal shows `serviceDurationWeeks` and `basePrice` from this config
- **No code changes needed** to add/modify services - just edit the JSON

---

## Examples

### Example 1: Simple Product Bento

```json
{
  "id": "focus-matrix",
  "variant": "product",
  "enabled": true,
  "content": {
    "prompt": {
      "type": "static",
      "text": "If you're saying yes to everything and achieving nothing..."
    },
    "title": "The Focus Matrix",
    "body": [
      {
        "type": "text",
        "text": "Poker players calculate expected value on every bet. You should too. But for your hours, not your chips."
      },
      {
        "type": "text",
        "text": "This runs game theory on your entire calendar. EV vs. CV for every commitment."
      }
    ]
  },
  "footer": {
    "type": "custom",
    "primaryText": "Turns \"busy\" into \"lethal\".",
    "secondaryText": "Stop drowning. Start compounding."
  },
  "actions": {
    "share": {
      "enabled": true,
      "subject": "Check out Focus Matrix",
      "body": "Thought you might find this useful: {url}"
    }
  }
}
```

### Example 2: Consulting Service with Dynamic Content

```json
{
  "id": "pioneers-of-purpose",
  "variant": "service",
  "enabled": true,
  "content": {
    "prompt": {
      "type": "static",
      "text": "If your internal culture and external message feel misaligned..."
    },
    "title": "Pioneers of Purpose Assessment",
    "badge": "Strategy",
    "body": [
      {
        "type": "dynamic",
        "field": "serviceDescription",
        "fallback": "Your brand is what people experience. Your purpose is why you exist. When those misalign, everything fractures. We map your core reason to exist and cascade it through every system and customer touchpoint."
      }
    ],
    "metadata": {
      "type": "function",
      "function": "getDeliveryDate",
      "args": ["pioneers-of-purpose"],
      "template": "Eight weeks. Purpose architecture mapped by {result}."
    }
  },
  "footer": {
    "type": "price-cta",
    "price": "From £50,000"
  },
  "actions": {
    "share": {
      "enabled": true,
      "subject": "Worth looking at: Pioneers of Purpose Assessment",
      "body": "Hey,\n\nThought this might help: {url}"
    },
    "enquire": {
      "enabled": true,
      "modalId": "pioneers-of-purpose"
    }
  }
}
```

### Example 3: Navigation Link Bento

```json
{
  "id": "consulting-services-link",
  "variant": "link",
  "enabled": true,
  "content": {
    "title": "Consulting Services",
    "body": [
      {
        "type": "text",
        "text": "Some problems need custom work. We work directly with you and adapt as the problem reveals itself."
      }
    ]
  },
  "footer": {
    "type": "custom",
    "primaryText": "We fix things. Then we leave.",
    "secondaryText": "No retainers. No dependency.",
    "linkButton": {
      "text": "Explore Services",
      "href": "/consulting",
      "style": "primary"
    }
  },
  "style": {
    "border": "1px solid #D43225"
  }
}
```

---

## Troubleshooting

### Issue: `[Missing: fieldName]` Shows Instead of Content

**Problem:** Dynamic content field not found and no fallback provided.

**Solution:** Add a `fallback` field:

```json
{
  "type": "dynamic",
  "field": "yourField",
  "fallback": "Your fallback text here"
}
```

### Issue: Bento Not Showing

**Check:**
1. Is `"enabled": true` in your JSON?
2. Did you import the JSON file correctly?
3. Did you cast it as `as any`?

```tsx
import myBento from '@/path/to/bento.json';
const bento = myBento as any; // Important!

<BentoBoxFromContent content={bento} />
```

### Issue: Share Email Not Working

**Check:**
1. Is `actions.share.enabled` set to `true`?
2. Did you provide both `subject` and `body`?

### Issue: Enquire Button Not Working

**Required setup:**

```tsx
const [enquiryModalOpen, setEnquiryModalOpen] = useState(null);

<BentoBoxFromContent
  onEnquire={(id) => setEnquiryModalOpen(id)}
/>
```

### Issue: Function-based Metadata Not Working

**Required setup:**

```tsx
const functionRegistry = {
  getDeliveryDate: (serviceKey) => {
    // Your delivery date calculation
    return "15 March 2025";
  }
};

<BentoBoxFromContent
  functionRegistry={functionRegistry}
/>
```

---

## Advanced: Using Function Registry

For calculated values like delivery dates:

### In JSON:

```json
"metadata": {
  "type": "function",
  "function": "getDeliveryDate",
  "args": ["service-id"],
  "template": "Six weeks. Ready by {result}."
}
```

### In Page Component:

```tsx
const getDeliveryDate = (serviceId) => {
  const config = { duration: 6, buffer: 2 };
  const totalWeeks = config.duration + config.buffer;
  const date = new Date(Date.now() + (totalWeeks * 7 * 24 * 60 * 60 * 1000));
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
};

const functionRegistry = { getDeliveryDate };

<BentoBoxFromContent
  content={myBento}
  functionRegistry={functionRegistry}
/>
```

---

## File Structure

```
components/BentoBox/
├── README.md                          # This file
├── BentoBox.tsx                       # Core component (don't edit)
├── BentoBox.module.css               # Styles (don't edit)
├── BentoBoxFromContent.tsx           # JSON parser (don't edit)
├── types.ts                          # TypeScript types
├── contentParser.ts                  # Content parsing logic
├── index.ts                          # Exports
├── content/                          # Your JSON files go here
│   ├── template.json                 # Template with instructions
│   ├── your-bento.json              # Your custom bentos
│   └── ...
├── CONTENT_SCHEMA.md                 # Technical schema docs
└── CONTENT_DRIVEN_ARCHITECTURE.md    # Architecture guide
```

---

## Getting Help

1. **Check the template:** `/components/BentoBox/content/template.json`
2. **See examples:** Look at existing JSON files in `/content/`
3. **Read technical docs:** `CONTENT_SCHEMA.md` for detailed specs
4. **Architecture guide:** `CONTENT_DRIVEN_ARCHITECTURE.md` for system design

---

## Best Practices

✅ **DO:**
- Always include `fallback` for dynamic content
- Use semantic IDs (kebab-case)
- Keep body text concise and scannable
- Test with and without dynamic content
- Version control your JSON files

❌ **DON'T:**
- Hardcode content in React components
- Skip the `enabled` field
- Forget to cast JSON imports as `any`
- Use HTML in text fields (plain text only)
- Create duplicate IDs

---

Made with ❤️ by Prismatica Labs
