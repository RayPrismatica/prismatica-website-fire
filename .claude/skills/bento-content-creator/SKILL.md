---
name: bento-content-creator
description: This skill should be used when users want to create new BentoBox content or need help determining what content should go into a bento box. Use this skill for queries like "I want to create a new service bento", "Help me figure out what to put in this bento box", "I need to add a new product", or "What content do I need for a consulting service?". This is an interactive guidance skill that helps users plan bento content through strategic questions, not for building the component itself.
---

# BentoBox Content Creator

## Overview

Guide users through determining what content belongs in a BentoBox by asking strategic questions about their offering. This skill helps users choose the right variant, structure content fields, configure actions, and output a complete JSON structure ready to save as a bento content file.

## When to Use This Skill

Trigger this skill when users:
- Want to create a new bento (service, product, or link)
- Need help planning bento content
- Ask "what should go in this bento?"
- Want to add a new offering to a page

Do NOT use this skill when users want to:
- Modify existing bento JSON files (just edit directly)
- Build or modify the BentoBox component code
- Understand the BentoBox architecture (use documentation instead)

## Interactive Guidance Workflow

Follow this workflow to help users create bento content. Ask questions conversationally, not all at once. Gather information progressively and provide guidance at each step.

### Phase 1: Determine the Offering Type

Start by understanding what they're creating:

**Key questions:**
1. "What are you offering?" (service, product, navigation link)
2. "Is this a consulting service, a product, or a link to another page?"

**Load `references/content-types.md`** to understand the three variants and help the user choose the right one.

**Output from this phase:** Variant type (`service`, `product`, or `link`)

### Phase 2: Gather Core Content

**Required fields for all bentos:**
- `id` (kebab-case, unique identifier)
- `title` (the offering name)
- `body` (description paragraphs)

**Questions to ask:**
1. "What should we call this?" (for title)
2. "What's a unique ID for this? I suggest [generate from title in kebab-case]"
3. "How would you describe this offering?" (for body)
4. "Should any part of the description be AI-generated and update dynamically?" (static vs dynamic content)

**Optional fields:**
- `prompt` - Problem statement that appears above title with red accent
  - Ask: "What problem does this solve? If someone is facing [blank], this helps them..."
- `badge` - Category tag (Strategy, Marketing, Technology, Process)
  - Ask: "What category is this? Strategy, Marketing, Technology, or Process?"

**For dynamic content:**
- If they want AI-generated content, ask which dynamic field from `getDynamicContent()` to use
- Always require a fallback: "What should show if the AI content isn't available yet?"

### Phase 3: Configure Service Details (If Applicable)

**Only for consulting services (variant: "service"):**

The `service` object contains pricing and timeline configuration:

**Questions to ask:**
1. "How many weeks does this service take to deliver?"
2. "How many weeks buffer time to get started?" (default: 0)
3. "What's the base price in the smallest currency unit?" (e.g., 50000 for £50,000)

**Output:** Service configuration object
```json
"service": {
  "durationWeeks": 8,
  "bufferWeeks": 2,
  "basePrice": 50000
}
```

### Phase 4: Configure Footer

**For services:** Usually `price-cta` footer
```json
"footer": {
  "type": "price-cta",
  "price": "From £50,000"
}
```

**For products:** Usually `custom` footer with tagline
```json
"footer": {
  "type": "custom",
  "primaryText": "Your tagline here",
  "secondaryText": "Supporting text"
}
```

**For links:** Custom footer with optional link button

**Questions to ask:**
1. "What price should show?" (for services)
2. "What's the main footer message?" (for products/links)
3. "Any secondary text or note?"

### Phase 5: Configure Actions

**Available actions:**
- `share` - Email sharing with pre-filled content
- `enquire` - Opens enquiry modal
- `link` - Navigation to another page (for link bentos)

**Questions to ask:**
1. "Should users be able to share this via email?" (if yes, configure share action)
2. "Should there be an 'Enquire' button?" (for services/products)
3. "Does this link to another page?" (for link bentos)

**For share action:**
- Generate smart defaults for email subject/body based on their content
- Offer to customize if they want

**For enquire action:**
- Set `modalId` to the bento's `id`

### Phase 6: Metadata (Optional)

Metadata shows timeline or duration information below the body.

**For services with delivery dates:**
```json
"metadata": {
  "type": "function",
  "function": "getDeliveryDate",
  "args": ["bento-id"],
  "template": "Eight weeks. Results by {result}."
}
```

**For static metadata:**
```json
"metadata": {
  "type": "static",
  "text": "Timeline or duration text here"
}
```

**Question to ask:**
"Should we show a delivery date or timeline?"

### Phase 7: Generate Complete JSON

Once all information is gathered, generate the complete JSON structure.

**Use `assets/template.json`** as the base structure and fill in all collected information.

**Load `references/schema.md`** if you need to verify field structures or see detailed schema documentation.

**Load `references/examples.md`** to see real-world examples and ensure the output matches the established patterns.

**Present the JSON to the user and ask:**
1. "Here's the complete JSON for your bento. Does this look right?"
2. "Where should I save this? I suggest `/components/BentoBox/content/[id].json`"

**After confirmation, write the file.**

## Best Practices

### Question Strategy
- Ask questions conversationally, one or two at a time
- Provide smart defaults based on previous answers
- Explain WHY you're asking (e.g., "This helps determine which variant to use")
- Show examples when helpful

### Content Guidance
- Problem statements (prompts) should start with "If you..." or "If your..."
- Body text should be concise and scannable (2-4 short paragraphs)
- Always include fallback text for dynamic content
- IDs should be kebab-case and descriptive

### Dynamic Content
- Only suggest dynamic content if it makes sense (news-related, market observations)
- Always require fallback text
- Explain that dynamic content updates every 6 hours via AI

### Service Configuration
- Delivery date = today + (durationWeeks + bufferWeeks) weeks
- Price should be in smallest unit (50000 not 50,000)
- Buffer weeks typically 0-2 weeks

## Resources

### references/
Reference documentation loaded into context as needed:

- **schema.md** - Complete JSON schema with all field definitions
- **content-types.md** - Detailed explanation of variants (service/product/link)
- **examples.md** - Real examples from the codebase

### assets/
Template file used in output:

- **template.json** - Clean template structure to fill in
