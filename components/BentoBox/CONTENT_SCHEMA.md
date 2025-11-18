# BentoBox Content Schema

This document defines the content structure for BentoBox instances. Each bento is defined by a JSON file that contains all content, styling, and behavior.

---

## Philosophy

**Code defines structure. Data defines content.**

- BentoBox component = reusable UI structure
- JSON files = individual bento instances
- No hardcoded content in pages
- Easy to add/edit/remove bentos without touching code

---

## File Location

```
components/BentoBox/content/
├── template.json              # Template with instructions
├── sir-alfie.json            # Product bento example
├── go-to-market.json         # Service bento example
├── consulting-link.json      # Link bento example
└── [bento-name].json         # Your custom bentos
```

---

## JSON Schema

### Root Structure

```json
{
  "id": "unique-bento-id",
  "variant": "capability | service | link | product",
  "enabled": true,
  "deliveryModes": [
    {
      "type": "consulting | ai-product | framework",
      "available": true,
      "icon": "consultant | ai | framework",
      "label": "Accessibility label",
      "pricing": "Optional pricing display",
      "cta": {
        "text": "Button text",
        "action": "enquire | link | external",
        "modalId": "modal-id",
        "href": "/path"
      }
    }
  ],
  "athenaPrompt": "Contextual question for Athena chat? (optional)",
  "metadata": {
    "created": "2025-11-16",
    "lastUpdated": "2025-11-16",
    "author": "Your Name",
    "notes": "Internal notes about this bento"
  },
  "service": {
    "durationWeeks": 8,
    "bufferWeeks": 2,
    "basePrice": 50000
  },
  "content": { /* Content fields */ },
  "actions": { /* CTA configuration */ },
  "style": { /* Optional style overrides */ }
}
```

### Athena Prompt (Optional - For Contextual Chat)

**Used for:** Content-driven Athena chat prompts that update when a bento scrolls into viewport.

```json
"athenaPrompt": "Imagine culture and message perfectly aligned. Chat?"
```

**Key feature:** When a bento enters the viewport (gets `.in-viewport` class from MobileAnimations), its `athenaPrompt` appears in the Athena chat banner, inviting contextual conversation.

**How it works:**
- Athena chat banner watches for `.in-viewport` elements
- If element has `data-athena-prompt` attribute → uses that prompt
- If NO bento in viewport → uses page-level default prompt
- Prompts should be conversational and invite engagement (max 100 chars)

**Examples:**
- Service: `"Picture insights flowing straight into execution. Ask Athena."`
- Product: `"What if your CRM hunted opportunities while you slept? Ask more."`
- Navigation: `"Need custom work that adapts as the problem reveals itself?"`

**Best practices:**
- Keep it short, punchy, and conversational
- End with a question or call to action
- Match the tone of the bento content
- Avoid generic prompts like "Want to know more?"

### Delivery Modes (Recommended - For All Capabilities)

**Added:** November 2025 for unified `/solutions` page

**Used for:** Indicating how users can access a capability (consultant-led, AI product, or framework).

```json
"deliveryModes": [
  {
    "type": "consulting",           // consulting | ai-product | framework
    "available": true,              // Availability flag
    "icon": "consultant",           // consultant | ai | framework
    "label": "Available with consultant",  // Accessibility label
    "pricing": "From £50,000",      // Optional pricing (AI/framework only)
    "cta": {
      "text": "Book Discovery Call",  // Button text
      "action": "enquire",           // enquire | link | external
      "modalId": "service-id",       // Required for 'enquire'
      "href": "/path"                // Required for 'link' or 'external'
    }
  }
]
```

**Key features:**
- Single-mode capabilities (most common): Show one icon, use CTA directly
- Multi-mode capabilities: Show multiple icons, "Explore Options" modal appears
- Icons display in top-right corner: 👤 (consultant), 🤖 (AI), 📦 (framework)
- Full specification: See `DELIVERY_MODE_SCHEMA.md`

**Behavior:**
- `deliveryModes.length === 1`: Direct CTA from mode's config
- `deliveryModes.length > 1`: "Explore Options" button → modal with all modes

### Service Configuration (Optional - For Consulting Services)

**Used for:** Consulting services that need delivery date calculations and enquiry modals.

```json
"service": {
  "durationWeeks": 8,        // Service duration in weeks
  "bufferWeeks": 2,          // Time to get started (optional, defaults to 0)
  "basePrice": 50000         // Price in smallest unit (e.g., 50000 = £50,000)
}
```

**Key feature:** All service configuration lives in the JSON. No hardcoded configs in code.

**How it works:**
- Delivery date automatically calculated: `today + (durationWeeks + bufferWeeks) weeks`
- Enquiry modal reads `durationWeeks` and `basePrice` directly from JSON
- Change pricing/timeline? Edit the JSON file. Done.

---

## Content Fields

### 1. Basic Content

```json
"content": {
  "prompt": {
    "type": "static | dynamic",
    "text": "If you're saying yes to everything and achieving nothing...",
    "dynamicKey": "focusMatrixPrompt" // Optional: key from getDynamicContent()
  },
  "title": "The Focus Matrix",
  "badge": "Strategy", // Optional
  "body": [
    {
      "type": "text",
      "text": "Poker players calculate expected value on every bet..."
    },
    {
      "type": "text",
      "text": "This runs game theory on your entire calendar..."
    },
    {
      "type": "dynamic",
      "dynamicKey": "focusMatrixDescription"
    }
  ],
  "metadata": {
    "type": "static | dynamic",
    "text": "Eight weeks. Delivered by {deliveryDate}.",
    "variables": {
      "deliveryDate": {
        "type": "dynamic",
        "function": "getDeliveryDate",
        "args": ["focus-matrix"]
      }
    }
  }
}
```

### 2. Footer Content

#### Option A: Price + CTAs (Service/Link Bentos)

```json
"footer": {
  "type": "price-cta",
  "price": "From £50,000",
  "primaryText": "Tagline here",
  "secondaryText": "Subtitle here"
}
```

#### Option B: Custom Footer (Product Bentos)

```json
"footer": {
  "type": "custom",
  "primaryText": "Turns 'busy' into 'lethal'.",
  "secondaryText": "Stop drowning. Start compounding."
}
```

---

## Actions Configuration

### CTA Types

#### 1. Share Email

```json
"actions": {
  "share": {
    "enabled": true,
    "subject": "Worth looking at: {title}",
    "body": "Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\n{description}\n\n{price}. {timeline}.\n\nHere's the link: {url}\n\nWorth a conversation?"
  }
}
```

**Variables available:**
- `{title}` - Bento title
- `{description}` - First body paragraph
- `{price}` - Price from footer
- `{timeline}` - Metadata text
- `{url}` - Current page URL + anchor

#### 2. Enquire Modal

```json
"actions": {
  "enquire": {
    "enabled": true,
    "modalId": "go-to-market", // Opens ProductsEnquiryModal or custom modal
    "buttonText": "Enquire" // Optional, default: "Enquire"
  }
}
```

#### 3. External Link

```json
"actions": {
  "link": {
    "enabled": true,
    "href": "/consulting#go-to-market",
    "text": "Learn More",
    "target": "_self | _blank"
  }
}
```

#### 4. Custom Action

```json
"actions": {
  "custom": {
    "enabled": true,
    "type": "function",
    "handler": "handleCustomAction",
    "label": "Get Started"
  }
}
```

---

## Complete Examples

### Example 1: Capability with Single Delivery Mode (Sir Alfie - AI Product)

```json
{
  "id": "sir-alfie",
  "variant": "capability",
  "enabled": true,
  "deliveryModes": [
    {
      "type": "ai-product",
      "available": true,
      "icon": "ai",
      "label": "AI product available",
      "pricing": "Included in £299/mo suite",
      "cta": {
        "text": "Launch Product",
        "action": "link",
        "href": "/products/sir-alfie"
      }
    }
  ],
  "athenaPrompt": "What if your CRM hunted opportunities while you slept? Ask more.",
  "metadata": {
    "created": "2025-11-16",
    "author": "Prismatica Labs",
    "notes": "Product showcase for Sir Alfie CRM"
  },
  "content": {
    "prompt": {
      "type": "static",
      "text": "If your CRM is a graveyard and your pipeline is a prayer..."
    },
    "title": "Sir Alfie",
    "body": [
      {
        "type": "text",
        "text": "Most CRMs are graveyards. Data sitting still. Sir Alfie is hunting."
      },
      {
        "type": "text",
        "text": "Agents browse the internet for real opportunities. Build GTM strategy based on your objectives and constraints. Dashboard shows value drops at every conversion step."
      },
      {
        "type": "text",
        "text": "Maximum human in the loop. Maximum heavy lifting. You make the calls. It gives you superhuman pattern recognition."
      }
    ]
  },
  "footer": {
    "type": "custom",
    "primaryText": "Your CRM with a pulse.",
    "secondaryText": "While you sleep, it hunts."
  },
  "actions": {
    "enquire": {
      "enabled": false
    }
  }
}
```

### Example 2: Capability with Consulting Delivery Mode (Go-to-Market)

```json
{
  "id": "go-to-market",
  "variant": "capability",
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
        "modalId": "go-to-market"
      }
    }
  ],
  "athenaPrompt": "Launch once, launch right, no budget burned. Questions?",
  "metadata": {
    "created": "2025-11-16",
    "author": "Prismatica Labs"
  },
  "content": {
    "prompt": {
      "type": "static",
      "text": "If you've built something people need but they're not buying..."
    },
    "title": "Go-to-Market Intelligence",
    "badge": "Strategy",
    "body": [
      {
        "type": "dynamic",
        "dynamicKey": "gtmDescription"
      }
    ],
    "metadata": {
      "type": "static",
      "text": "Eight weeks. Delivered by {deliveryDate}.",
      "variables": {
        "deliveryDate": {
          "type": "dynamic",
          "function": "getDeliveryDate",
          "args": ["go-to-market"]
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
      "subject": "Worth looking at: Go-to-Market Intelligence",
      "body": "Hey,\n\nI came across this and thought it might help with your GTM challenges.\n\nIt's called Go-to-Market Intelligence - strategic consulting that maps your entire market position and creates a plan that actually works.\n\nEight weeks, starts at £50,000. They've helped companies go from stuck to scale.\n\nHere's the link: {url}\n\nWorth a conversation?"
    },
    "enquire": {
      "enabled": true,
      "modalId": "go-to-market"
    }
  }
}
```

### Example 3: Multi-Mode Capability (Future Enhancement)

```json
{
  "id": "esi-framework-multi",
  "variant": "capability",
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
    "body": [
      {
        "type": "text",
        "text": "Available as guided consulting or self-service framework."
      }
    ]
  }
}
```

**Result:** Shows both 👤 and 📦 icons. CTA button becomes "Explore Options" which opens modal.

### Example 4: Link Bento (Navigation Card - Legacy)

```json
{
  "id": "consulting-services",
  "variant": "link",
  "enabled": true,
  "athenaPrompt": "Need custom work that adapts as the problem reveals itself?",
  "content": {
    "title": "Consulting Services",
    "body": [
      {
        "type": "text",
        "text": "We fix things. Then we leave. High-stakes problems. Measurable outcomes. No retainers."
      }
    ]
  },
  "footer": {
    "type": "custom",
    "primaryText": "We fix things. Then we leave.",
    "secondaryText": ""
  },
  "actions": {
    "link": {
      "enabled": true,
      "href": "/consulting",
      "text": "Explore Services",
      "target": "_self"
    }
  },
  "style": {
    "border": "1px solid #D43225",
    "padding": "40px 32px"
  }
}
```

---

## Content Types Reference

### Static Text
Simple hardcoded string.
```json
{
  "type": "text",
  "text": "Your content here..."
}
```

### Dynamic Content
From `getDynamicContent()` cache.
```json
{
  "type": "dynamic",
  "dynamicKey": "keyFromDynamicContentJSON"
}
```

### Variable Substitution
Replace placeholders with dynamic values.
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

### HTML/Markdown (Future)
```json
{
  "type": "markdown",
  "text": "This is **bold** and *italic*."
}
```

---

## Style Overrides (Optional)

Override component defaults:

```json
"style": {
  "border": "1px solid #D43225",
  "padding": "40px 32px",
  "backgroundColor": "#fff"
}
```

---

## Validation Rules

1. **Required Fields:**
   - `id` (unique)
   - `variant` (capability | service | link | product)
   - `content.title`

2. **Recommended Fields (capability variant):**
   - `deliveryModes` array with at least one mode
   - `deliveryModes[].cta` with valid action and required fields

3. **Field Limits:**
   - `id`: kebab-case, max 50 chars
   - `title`: max 100 chars
   - `body`: max 5 paragraphs
   - `prompt`: max 200 chars

4. **Variant-Specific:**
   - `capability` bentos SHOULD have `deliveryModes` array
   - `service` bentos (legacy) SHOULD have price + CTAs
   - `product` bentos (legacy) SHOULD have custom footer
   - `link` bentos MUST have navigation action

5. **Delivery Mode Validation:**
   - At least one mode must have `available: true`
   - CTA action `enquire` requires `modalId`
   - CTA actions `link` or `external` require `href`
   - Consulting modes should NOT have `pricing` field

---

## Usage in Code

### 1. Load Content

```tsx
import bentoContent from '@/components/BentoBox/content/sir-alfie.json';
import { BentoBoxFromContent } from '@/components/BentoBox';

<BentoBoxFromContent content={bentoContent} />
```

### 2. Load Multiple Bentos

```tsx
import { loadBentosByPage } from '@/lib/bentoLoader';

const bentos = await loadBentosByPage('products');

{bentos.map(bento => (
  <BentoBoxFromContent key={bento.id} content={bento} />
))}
```

### 3. Dynamic Content Integration

```tsx
import { getDynamicContent } from '@/lib/getDynamicContent';
import bentoContent from '@/components/BentoBox/content/sir-alfie.json';

const dynamicData = await getDynamicContent();

<BentoBoxFromContent
  content={bentoContent}
  dynamicData={dynamicData}
/>
```

---

## Migration Path

### Phase 1: Add Content Files
1. Create JSON files for existing bentos
2. Keep hardcoded versions working
3. Test content-driven rendering

### Phase 2: Parallel Systems
1. Add `BentoBoxFromContent` component
2. Migrate one page at a time
3. Compare rendered output

### Phase 3: Full Migration
1. Replace all hardcoded bentos
2. Remove old JSX code
3. Update documentation

---

## Benefits

✅ **Separation of Concerns** - Content editors don't touch code
✅ **Easy to Add Bentos** - Copy template, fill in content, done
✅ **Version Control** - Track content changes separately
✅ **Reusability** - Same bento on multiple pages
✅ **A/B Testing** - Easy to swap content files
✅ **Type Safety** - JSON schema validation
✅ **Dynamic + Static** - Mix both content types seamlessly
✅ **Multi-Channel Delivery** - Single capability, multiple delivery options
✅ **Scalable Architecture** - Add 100 solutions without code complexity

---

## Next Steps

1. **Create template.json** with inline instructions
2. **Build BentoBoxFromContent** component
3. **Create bentoLoader utility** for loading/filtering
4. **Migrate products page** as proof of concept
5. **Add JSON schema validation**
