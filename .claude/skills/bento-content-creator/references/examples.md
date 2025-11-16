# Real BentoBox Examples from the Codebase

These are actual, working examples from the Prismatica Labs codebase. Use these as reference when creating new bentos.

---

## Example 1: Consulting Service (Full-Featured)

**File:** `pioneers-of-purpose.json`
**Variant:** `service`
**Price:** £50,000
**Duration:** 8 weeks + 2 buffer

```json
{
  "id": "pioneers-of-purpose",
  "variant": "service",
  "enabled": true,
  "metadata": {
    "created": "2025-11-16",
    "author": "Prismatica Labs",
    "notes": "Pioneers of Purpose Assessment - £50,000 consulting service"
  },
  "service": {
    "durationWeeks": 8,
    "bufferWeeks": 2,
    "basePrice": 50000
  },
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
        "fallback": "Your brand is what people experience. Your purpose is why you exist. When those misalign, everything fractures. Culture suffers. Messaging rings hollow. We map your core reason to exist and cascade it through every system and customer touchpoint. Inside-out authenticity that strengthens both culture and message."
      }
    ],
    "metadata": {
      "type": "function",
      "function": "getDeliveryDate",
      "args": ["pioneers-of-purpose"],
      "template": "Eight weeks. Purpose architecture mapped across every system and touchpoint by {result}."
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
      "body": "Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called Pioneers of Purpose - they dissect your business from its core reason to exist and cascade that purpose through every system and customer touchpoint. Inside-out authenticity that actually strengthens both culture and message.\n\nEight weeks, starts at £50,000. They map purpose as operating system, not marketing tagline.\n\nIf we talk to them next week, we could have results by {deliveryDate} or earlier.\n\nHere's the link: {url}\n\nWorth a conversation?"
    },
    "enquire": {
      "enabled": true,
      "modalId": "pioneers-of-purpose"
    }
  }
}
```

**Key features:**
- ✅ Service config with pricing and timeline
- ✅ Dynamic content with comprehensive fallback
- ✅ Function-based metadata for delivery dates
- ✅ Price-CTA footer
- ✅ Both share and enquire actions
- ✅ Problem-focused prompt
- ✅ Category badge

---

## Example 2: Consulting Service (Lower Price Point)

**File:** `strategic-triptych.json`
**Variant:** `link` (Note: This should probably be "service" but shows variant flexibility)
**Price:** £18,000
**Duration:** 4 weeks + 2 buffer

```json
{
  "id": "strategic-triptych",
  "variant": "link",
  "enabled": true,
  "metadata": {
    "created": "2025-11-16",
    "author": "Prismatica Labs",
    "notes": "Strategic Triptych Assessment - £18,000 consulting service"
  },
  "service": {
    "durationWeeks": 4,
    "bufferWeeks": 2,
    "basePrice": 18000
  },
  "content": {
    "prompt": {
      "type": "static",
      "text": "If you know something's off but can't pinpoint where..."
    },
    "title": "The Strategic Triptych Assessment",
    "badge": "Strategy",
    "body": [
      {
        "type": "dynamic",
        "field": "triptychDescription",
        "fallback": "We examine your business through three lenses simultaneously: how you market, how you compete, how you build. Most problems live in the gaps between these. Most opportunities too."
      }
    ],
    "metadata": {
      "type": "function",
      "function": "getDeliveryDate",
      "args": ["strategic-triptych"],
      "template": "Four weeks. By {result} you'll know exactly where you're leaving money on the table and what to do about it."
    }
  },
  "footer": {
    "type": "price-cta",
    "price": "From £18,000"
  },
  "actions": {
    "share": {
      "enabled": true,
      "subject": "Worth looking at: Strategic Triptych Assessment",
      "body": "Hey,\n\nI came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].\n\nIt's called Strategic Triptych - they examine your business through three lenses at once: how you market, compete, and build. Most problems live in the gaps between these. Most opportunities too.\n\nFour weeks, starts at £18,000. They show you exactly where you're leaving money on the table.\n\nIf we talk to them next week, we could have results by {deliveryDate}.\n\nHere's the link: {url}\n\nWorth a conversation?"
    },
    "enquire": {
      "enabled": true,
      "modalId": "strategic-triptych"
    }
  }
}
```

**Key features:**
- ✅ Shorter timeline (4 weeks)
- ✅ Lower price point (£18,000)
- ✅ Template customized to service value proposition
- ✅ Specific outcome in metadata ("you'll know exactly where...")

---

## Example 3: Product Bento (Minimal)

**File:** `sir-alfie.json` (hypothetical - based on codebase patterns)
**Variant:** `product`

```json
{
  "id": "sir-alfie",
  "variant": "product",
  "enabled": true,
  "metadata": {
    "created": "2025-11-16",
    "author": "Prismatica Labs",
    "notes": "Sir Alfie CRM product"
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

**Key features:**
- ✅ No service config (products don't have delivery dates)
- ✅ Custom footer with compelling tagline
- ✅ Static content only (product descriptions don't change)
- ✅ Multiple body paragraphs building the story
- ✅ No pricing shown (might be subscription-based)

---

## Example 4: Product with Pricing

**Variant:** `product`

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
    "primaryText": "£299/month",
    "secondaryText": "per seat + API credits*",
    "note": "*API costs separate. Most users: £50-200/month."
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

**Key features:**
- ✅ Pricing in custom footer
- ✅ Footnote for pricing details
- ✅ Share action enabled
- ✅ Short, punchy copy

---

## Example 5: Navigation Link Bento

**Variant:** `link`

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

**Key features:**
- ✅ No prompt (link bentos are simple)
- ✅ Single body paragraph
- ✅ Footer with link button
- ✅ Red border for visual emphasis
- ✅ No actions (navigation handled by footer button)

---

## Pattern Analysis

### Service Bento Pattern
```
Prompt (problem statement)
  ↓
Title + Badge
  ↓
Dynamic body with fallback
  ↓
Metadata (delivery date)
  ↓
Price-CTA footer
  ↓
Share + Enquire actions
```

### Product Bento Pattern
```
Prompt (problem statement)
  ↓
Title
  ↓
Static body (2-3 paragraphs)
  ↓
Custom footer (tagline or pricing)
  ↓
Optional share action
```

### Link Bento Pattern
```
Title (no prompt)
  ↓
Single body paragraph
  ↓
Custom footer + link button
  ↓
Optional red border
```

---

## Writing Style Patterns

### Prompts (Problem Statements)
- "If your [PROBLEM]..."
- "If you're [STRUGGLING WITH]..."
- "If you know [SYMPTOM] but can't [ACTION]..."

Examples:
- "If your internal culture and external message feel misaligned..."
- "If you're saying yes to everything and achieving nothing..."
- "If your CRM is a graveyard and your pipeline is a prayer..."

### Body Copy (Services)
- Start with the problem/pain
- Explain the solution approach
- Emphasize outcomes/results
- 2-4 short paragraphs

### Body Copy (Products)
- Hook with contrast ("Most CRMs are graveyards. Sir Alfie is hunting.")
- Explain what it does
- Show the benefit/outcome
- 2-3 punchy paragraphs

### Metadata (Timeline)
- "[Duration]. [Outcome] by {result}."
- Examples:
  - "Eight weeks. Purpose architecture mapped by {result}."
  - "Four weeks. By {result} you'll know exactly where you're leaving money on the table."

### Footer Taglines (Products)
- Short, punchy, memorable
- Often a contrast or transformation
- Examples:
  - "Your CRM with a pulse. While you sleep, it hunts."
  - "Turns 'busy' into 'lethal'. Stop drowning. Start compounding."

### Share Email Body
Pattern:
```
Hey,

I came across this and thought it might help with [ADD_YOUR_CHALLENGE_HERE].

[One sentence explanation of what it is and what it does]

[Timeline], starts at [Price]. [Key differentiator].

If we talk to them next week, we could have results by {deliveryDate}.

Here's the link: {url}

Worth a conversation?
```

---

## Best Practices from Real Examples

1. **Always include fallback text** for dynamic content
2. **Problem statements** should be specific and relatable
3. **Delivery date templates** should include context (not just the date)
4. **Share email bodies** should be personal and actionable
5. **Footer taglines** should be memorable and benefit-focused
6. **Service configs** use realistic timelines (4-12 weeks typical)
7. **Buffer weeks** are usually 0-2 weeks
8. **Badge usage** is consistent (Strategy, Marketing, Technology, Process)
