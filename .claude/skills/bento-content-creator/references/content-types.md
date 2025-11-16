# BentoBox Content Types Guide

Understanding the three bento variants and when to use each.

## The Three Variants

### 1. Service Bento (`variant: "service"`)

**Use for:** High-value consulting services and engagements

**Visual characteristics:**
- Service bento styling with hover effects
- Red accent bar on prompt
- Delivery dates turn red on hover (desktop) / scroll (mobile)
- Metadata shows timeline/delivery dates
- Price CTA footer

**Typical structure:**
- Problem statement (prompt)
- Service title
- Category badge (Strategy, Marketing, Technology, Process)
- AI-generated description with fallback
- Timeline metadata with calculated delivery date
- Price footer ("From £X")
- Share and Enquire actions

**When to choose this variant:**
- Offering is a consulting service
- Has a defined scope and timeline
- Priced as a project engagement
- Users should be able to enquire
- Delivery date is important to communicate

**Examples from codebase:**
- Pioneers of Purpose Assessment (£50,000, 8 weeks)
- ESI Framework (£40,000, 6 weeks)
- Go-to-Market Intelligence (£15,000, 7 weeks)
- Strategic Triptych Assessment (£18,000, 4 weeks)

**Required fields:**
- `service` object with `durationWeeks`, `bufferWeeks`, `basePrice`
- `footer.type: "price-cta"`
- `actions.share` enabled
- `actions.enquire` enabled
- `content.metadata` with delivery date function

---

### 2. Product Bento (`variant: "product"`)

**Use for:** Product offerings, SaaS tools, productized services

**Visual characteristics:**
- Product bento styling
- Mobile scroll animations (viewport-triggered)
- Custom footer with tagline
- No delivery dates (products are always available)
- Optional enquire action

**Typical structure:**
- Problem statement (prompt)
- Product title
- Static description (products don't need dynamic content as often)
- Custom footer with compelling tagline
- Share action (enquire optional)

**When to choose this variant:**
- Offering is a product or SaaS tool
- No delivery timeline (always available)
- Pricing might be subscription-based
- Focus on product benefits and use cases
- Less formal than services

**Examples from codebase:**
- Sir Alfie (CRM with AI agents)
- The Focus Matrix (Priority management tool)
- The Demand Engine (Marketing tool)

**Typical footer patterns:**
```json
"footer": {
  "type": "custom",
  "primaryText": "Turns 'busy' into 'lethal'.",
  "secondaryText": "Stop drowning. Start compounding."
}
```

or

```json
"footer": {
  "type": "custom",
  "primaryText": "£299/month",
  "secondaryText": "per seat + API credits*",
  "note": "*API costs separate. Most users: £50-200/month."
}
```

**Do NOT include:**
- `service` object (no delivery dates for products)
- Delivery date metadata
- Price-CTA footer

---

### 3. Link Bento (`variant: "link"`)

**Use for:** Navigation cards that link to other pages or sections

**Visual characteristics:**
- Link bento styling with subtle borders
- Often has red border (`border: "1px solid #D43225"`)
- Footer includes link button
- Minimal content (just enough to entice)
- No actions (navigation handled by footer button)

**Typical structure:**
- Title (no prompt usually)
- Brief description (1-2 sentences)
- Custom footer with link button
- Optional red border styling

**When to choose this variant:**
- Main purpose is navigation to another page
- Not selling a specific service or product
- Acting as a category card or section link
- Bridging between pages

**Examples from codebase:**
- "Consulting Services" link card (navigates to /consulting)
- "Product Suite" link card (navigates to /products)
- Category overview cards

**Typical structure:**
```json
{
  "id": "consulting-services",
  "variant": "link",
  "enabled": true,
  "content": {
    "title": "Consulting Services",
    "body": [
      {
        "type": "text",
        "text": "We fix things. Then we leave. High-stakes problems. Measurable outcomes."
      }
    ]
  },
  "footer": {
    "type": "custom",
    "primaryText": "No retainers. No dependency.",
    "secondaryText": "",
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

**Do NOT include:**
- `service` object
- Enquire action
- Share action (usually)
- Price information

---

## Decision Tree

Use this to help users choose the right variant:

```
START: What are you creating?

├─ "A consulting service or engagement"
│  ├─ Has defined scope and timeline? → YES
│  ├─ Users can enquire? → YES
│  ├─ Has pricing? → YES
│  └─ **USE: variant = "service"**
│
├─ "A product, tool, or SaaS offering"
│  ├─ Always available (no delivery timeline)? → YES
│  ├─ Focus on product benefits? → YES
│  └─ **USE: variant = "product"**
│
└─ "A link to another page or category"
   ├─ Main purpose is navigation? → YES
   ├─ Acting as a bridge/overview? → YES
   └─ **USE: variant = "link"**
```

---

## Comparison Table

| Feature | Service | Product | Link |
|---------|---------|---------|------|
| **Purpose** | Sell consulting | Sell product | Navigate |
| **Timeline** | Delivery dates | None | None |
| **Pricing** | Project-based | Subscription/one-time | None |
| **Actions** | Share + Enquire | Share (+ optional Enquire) | Link button |
| **Footer** | Price-CTA | Custom tagline | Custom + button |
| **Dynamic content** | Common | Less common | Rare |
| **Service config** | Required | Not used | Not used |
| **Metadata** | Delivery date | Optional | Rare |
| **Border** | No | No | Often red |

---

## Common Mistakes

### ❌ Using "service" for products
**Problem:** Product has delivery dates and service config
**Solution:** Use `variant: "product"` and remove `service` object

### ❌ Using "product" for consulting
**Problem:** Consulting service lacks delivery dates and enquire modal
**Solution:** Use `variant: "service"` and add `service` object

### ❌ Using "link" with enquire actions
**Problem:** Link bento has enquire button instead of navigation
**Solution:** Use footer `linkButton` for navigation, not actions

### ❌ Mixing footer types incorrectly
**Problem:** Service bento has custom footer instead of price-cta
**Solution:** Services should use `footer.type: "price-cta"`

---

## Quick Reference

**When user says:**
- "consulting service" → `service`
- "engagement" → `service`
- "assessment" → `service`
- "workshop" → `service`
- "product" → `product`
- "tool" → `product`
- "SaaS" → `product`
- "software" → `product`
- "link to..." → `link`
- "navigation card" → `link`
- "overview" → `link`
