# BentoBox Content JSON Schema

Complete reference for all fields in a BentoBox content JSON file.

## Root Structure

```json
{
  "id": "unique-bento-id",
  "variant": "service | link | product",
  "enabled": true,
  "metadata": { /* optional metadata */ },
  "service": { /* optional, for consulting services only */ },
  "content": { /* required content fields */ },
  "footer": { /* optional footer */ },
  "actions": { /* optional actions */ },
  "style": { /* optional style overrides */ }
}
```

---

## Required Fields

### `id` (string, required)
Unique identifier for this bento.

**Format:** kebab-case
**Max length:** 50 characters
**Example:** `"pioneers-of-purpose"`, `"go-to-market"`, `"sir-alfie"`

### `variant` (string, required)
Determines the bento type and styling.

**Options:**
- `"service"` - Consulting services (hover effects, service bento styling)
- `"product"` - Product offerings (mobile scroll animations, product bento styling)
- `"link"` - Navigation links (subtle borders, link bento styling)

### `content` (object, required)
Contains all displayed content. See Content Fields section below.

---

## Optional Top-Level Fields

### `enabled` (boolean, optional)
Whether this bento should be displayed.

**Default:** `true`
**Example:** `"enabled": false` to hide without deleting

### `metadata` (object, optional)
Internal documentation about this bento.

**Fields:**
- `created` (string) - Creation date (YYYY-MM-DD)
- `lastUpdated` (string) - Last update date (YYYY-MM-DD)
- `author` (string) - Creator name
- `notes` (string) - Internal notes

**Example:**
```json
"metadata": {
  "created": "2025-11-16",
  "author": "Prismatica Labs",
  "notes": "Pioneers of Purpose Assessment - £50,000 consulting service"
}
```

### `service` (object, optional)
**Only for consulting services (variant: "service")**

Contains pricing and timeline configuration.

**Fields:**
- `durationWeeks` (number, required) - Service duration in weeks
- `bufferWeeks` (number, optional) - Buffer time to get started (default: 0)
- `basePrice` (number, required) - Base price in smallest currency unit

**How it works:**
- Delivery date = current date + (durationWeeks + bufferWeeks) × 7 days
- Enquiry modal reads duration and price from this config
- No code changes needed to update pricing/timeline

**Example:**
```json
"service": {
  "durationWeeks": 8,
  "bufferWeeks": 2,
  "basePrice": 50000
}
```

### `footer` (object, optional)
Footer content displayed at bottom of bento. See Footer Types section below.

### `actions` (object, optional)
CTA buttons and links. See Actions section below.

### `style` (object, optional)
CSS style overrides.

**Example:**
```json
"style": {
  "border": "1px solid #D43225",
  "padding": "40px 32px"
}
```

---

## Content Fields

The `content` object contains all displayed content.

### `content.title` (string, required)
Main heading for the bento.

**Max length:** 100 characters
**Example:** `"Pioneers of Purpose Assessment"`, `"Sir Alfie"`

### `content.prompt` (object, optional)
Problem statement that appears above the title with a red accent bar.

**Structure:**
```json
"prompt": {
  "type": "static",
  "text": "If your internal culture and external message feel misaligned..."
}
```

**Fields:**
- `type` (string) - `"static"` or `"dynamic"`
- `text` (string) - The prompt text
- `dynamicKey` (string, optional) - Key from getDynamicContent() if type is dynamic

**Best practice:** Start with "If you..." or "If your..."
**Max length:** 200 characters

### `content.badge` (string, optional)
Category tag displayed next to the title.

**Options:** `"Strategy"`, `"Marketing"`, `"Technology"`, `"Process"`
**Example:** `"badge": "Strategy"`

### `content.body` (array, required)
Main description content. Array of paragraph objects.

**Each paragraph can be:**

**1. Static text:**
```json
{
  "type": "text",
  "text": "Your paragraph content here."
}
```

**2. Dynamic content with fallback:**
```json
{
  "type": "dynamic",
  "field": "serviceDescription",
  "fallback": "Default text if AI content unavailable."
}
```

**Available dynamic fields** (from `/lib/getDynamicContent.ts`):
- `newsInsight`
- `intelligenceExample`
- `consultingInsight`
- `serviceDescription`
- `esiDescription`
- `agencyDescription`
- `ksoDescription`
- `transactionDescription`
- `triptychDescription`
- `marketObservation`
- `inlineObservation`
- `userContentReminder`

**Best practices:**
- Keep body concise (2-4 paragraphs)
- Each paragraph should be scannable
- Always include fallback for dynamic content
- Max 5 paragraphs total

### `content.metadata` (object, optional)
Timeline or duration information displayed below the body in italics.

**For static metadata:**
```json
"metadata": {
  "type": "static",
  "text": "Six weeks. Results by end of March."
}
```

**For function-based metadata (delivery dates):**
```json
"metadata": {
  "type": "function",
  "function": "getDeliveryDate",
  "args": ["bento-id"],
  "template": "Eight weeks. Purpose architecture mapped by {result}."
}
```

The `{result}` placeholder will be replaced with the function output.

---

## Footer Types

### Price CTA Footer
For consulting services. Shows price and automatically includes Share/Enquire actions.

```json
"footer": {
  "type": "price-cta",
  "price": "From £50,000"
}
```

### Custom Footer
Complete control over footer content.

**Basic custom footer:**
```json
"footer": {
  "type": "custom",
  "primaryText": "Your CRM with a pulse.",
  "secondaryText": "While you sleep, it hunts."
}
```

**With optional note:**
```json
"footer": {
  "type": "custom",
  "primaryText": "£299/month",
  "secondaryText": "per seat + API credits*",
  "note": "*API costs separate. Most users: £50-200/month."
}
```

**With link button (for navigation bentos):**
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

**Link button styles:**
- `"primary"` - Red background, white text
- `"secondary"` - White background, gray text, border

---

## Actions

### Share Action
Email sharing with pre-filled content.

```json
"actions": {
  "share": {
    "enabled": true,
    "subject": "Worth looking at: {title}",
    "body": "Hey,\n\nThought this might help: {url}\n\nWorth a conversation?"
  }
}
```

**Available variables:**
- `{title}` - Bento title
- `{url}` - Current page URL
- `{deliveryDate}` - Calculated delivery date (if using function registry)

### Enquire Action
Opens enquiry modal.

```json
"actions": {
  "enquire": {
    "enabled": true,
    "modalId": "your-service-id",
    "buttonText": "Enquire"
  }
}
```

**Fields:**
- `enabled` (boolean, required)
- `modalId` (string, required) - Usually the bento's `id`
- `buttonText` (string, optional) - Button label (default: "Enquire")

### Link Action
For navigation bentos.

```json
"actions": {
  "link": {
    "enabled": true,
    "href": "/consulting#go-to-market",
    "text": "Learn More",
    "target": "_self"
  }
}
```

**Fields:**
- `enabled` (boolean, required)
- `href` (string, required) - Destination URL
- `text` (string, required) - Link text
- `target` (string, optional) - `"_self"` or `"_blank"` (default: `"_self"`)

---

## Validation Rules

### Required Fields
- `id` (unique, kebab-case, max 50 chars)
- `variant` (service | link | product)
- `content.title` (max 100 chars)
- `content.body` (array with at least 1 paragraph)

### Field Limits
- `content.prompt`: max 200 chars
- `content.body`: max 5 paragraphs
- `id`: max 50 chars

### Variant-Specific Rules
- **Service bentos** should have:
  - `service` object with pricing/timeline
  - `footer.type: "price-cta"`
  - `actions.share` and `actions.enquire` enabled

- **Product bentos** should have:
  - `footer.type: "custom"` with tagline
  - Optional `actions.enquire`

- **Link bentos** must have:
  - Navigation action (either `actions.link` or `footer.linkButton`)
  - Optional red border styling

---

## Complete Minimal Example

```json
{
  "id": "my-service",
  "variant": "service",
  "enabled": true,
  "content": {
    "title": "My Service Name",
    "body": [
      {
        "type": "text",
        "text": "Service description goes here."
      }
    ]
  }
}
```

## Complete Full Example

See `references/examples.md` for real-world examples from the codebase.
