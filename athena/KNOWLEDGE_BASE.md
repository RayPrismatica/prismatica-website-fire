# Athena Knowledge Base

Documentation for the 41 markdown files that provide Athena with contextual knowledge about website content.

## Overview

The knowledge base is structured into two categories:

1. **Page Knowledge** (11 files) - Complete page content for context
2. **Modal Knowledge** (30 files) - Case studies, particles, molecules, patterns, and mental models

Files are loaded dynamically based on user viewing history, ensuring Athena only receives content users have actually seen.

## Structure

```
athena/knowledge/
├── pages/                    # 11 page knowledge files
│   ├── homepage.md           # Landing page content
│   ├── about.md              # About page manifesto
│   ├── solutions.md          # Solutions/consulting overview
│   ├── products.md           # Product offerings
│   ├── contact.md            # Contact page
│   ├── articles.md           # Content hub
│   ├── demand.md             # Demand mental model page
│   ├── incentives.md         # Incentives mental model page
│   ├── agentic.md            # Agentic mental model page
│   ├── prismatic.md          # Prismatic mental model page
│   ├── triptych.md           # Triptych mental model page
│   ├── consulting.md         # Legacy/reference file
│   └── dynamic-content.md    # Auto-synced every 6 hours
│
└── modals/                   # 30 modal knowledge files
    ├── Case Studies (8 files)
    │   ├── warehouse.md
    │   ├── search.md
    │   ├── push-pull.md
    │   ├── bottleneck.md
    │   ├── canyon.md
    │   ├── platform.md
    │   ├── music.md
    │   └── coaching.md
    │
    ├── Particles (7 files)
    │   ├── particle-time.md
    │   ├── particle-actors.md
    │   ├── particle-resources.md
    │   ├── particle-objectives.md
    │   ├── particle-constraints.md
    │   ├── particle-information.md
    │   └── particle-incentives.md
    │
    ├── Molecules (5 files)
    │   ├── molecule-demand.md
    │   ├── molecule-supply.md
    │   ├── molecule-friction.md
    │   ├── molecule-value.md
    │   └── molecule-risk.md
    │
    ├── Patterns (5 files)
    │   ├── pattern-inertia.md
    │   ├── pattern-momentum.md
    │   ├── pattern-growth.md
    │   ├── pattern-decay.md
    │   └── pattern-equilibrium.md
    │
    └── Mental Models (5 files)
        ├── model-demand.md
        ├── model-incentives.md
        ├── model-agentic.md
        ├── model-prismatic.md
        └── model-triptych.md
```

## File Naming Conventions

### Page Files

Pattern: `{page-name}.md`

**Mapping:**
```
Route           → File Name
/               → homepage.md
/about          → about.md
/solutions      → solutions.md
/products       → products.md
/contact        → contact.md
/articles       → articles.md
/demand         → demand.md
/incentives     → incentives.md
/agentic        → agentic.md
/prismatic      → prismatic.md
/triptych       → triptych.md
```

Defined in `lib/getKnowledgeContext.ts`:
```typescript
const PAGE_KNOWLEDGE_MAP: Record<string, string> = {
  '/': 'homepage',
  '/about': 'about',
  '/solutions': 'solutions',
  '/products': 'products',
  '/contact': 'contact',
  '/articles': 'articles',
  '/demand': 'demand',
  '/incentives': 'incentives',
  '/agentic': 'agentic',
  '/prismatic': 'prismatic',
  '/triptych': 'triptych'
};
```

### Modal Files

Pattern: `{category}-{name}.md` or `{name}.md` for case studies

**Examples:**
- Case studies: `warehouse.md`, `search.md`
- Particles: `particle-time.md`, `particle-actors.md`
- Molecules: `molecule-demand.md`, `molecule-supply.md`
- Patterns: `pattern-inertia.md`, `pattern-momentum.md`
- Mental models: `model-demand.md`, `model-incentives.md`

Modal IDs match the `briefId` in `app/about/page.tsx` and the `data-modal-id` attribute.

## Content Format

### Page Files

**Standard Structure:**
```markdown
# Page Title

## Section 1

Content for section 1...

## Section 2

Content for section 2...

[Additional sections...]
```

**Guidelines:**
- Clean markdown, no JSX or HTML tags
- No inline styling or React components
- British English spelling throughout
- "Spatial poetry" formatting (strategic line breaks, emphasis)
- Maintains brand voice (quiet confidence, zero noise, maximum clarity)

**Example (about.md):**
```markdown
# About Prismatica

Physics governs the universe.
It should govern how we think.

Light through a prism reveals what was always there but invisible. That's what we're passionate about. **The tangible invisible.**

That's why we're called Prismatica.
And this is how we think.

## The Uncomfortable Truth

You are not here to fix success. You're here to fix problems.

The less time you spend on the problem, the more time you have for solutions.
```

### Modal Files

**Standard Structure:**
```markdown
# Modal Title

**Category:** {Category Name}

**Problem:**
Problem statement...

**How We Saw It:**
Our analysis and approach...

**Result:**
Outcome and impact...
```

**Example (warehouse.md):**
```markdown
# The Warehouse That Wasn't

**Category:** Supply Chain Diagnostics

**Problem:**
A logistics company was losing money. Everyone blamed the warehouse. "Too slow, too many mistakes, too expensive."

**How We Saw It:**
We watched the warehouse for three days. It wasn't slow. It was waiting. Orders arrived in bursts. Staff stood idle, then got slammed. The problem wasn't the warehouse. It was upstream.

Poor demand forecasting created chaos. The warehouse was just where the chaos became visible.

**Result:**
We didn't touch the warehouse. We fixed forecasting. £2.1M saved annually. Staff morale improved. Warehouse manager got a bonus.

The warehouse was never the problem.
```

## Loading Logic

**File:** `lib/getKnowledgeContext.ts`

### Function: loadKnowledgeFile()

```typescript
function loadKnowledgeFile(filename: string): string | null {
  try {
    const filePath = path.join(process.cwd(), 'athena', 'knowledge', filename);
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.warn(`Knowledge file not found: ${filename}`);
    return null;
  }
}
```

### Function: getKnowledgeContext()

**Purpose:** Load only relevant knowledge based on viewing history

**Logic:**

1. **Group sections by page** (already have full page files)
2. **Format section engagement** (not full content, just engagement metrics)
3. **Load and include modal content** (full MD content for opened modals)

**Why different treatment:**
- **Pages**: User can see entire page at once, but we track which sections they engaged with
- **Modals**: User explicitly opens them, load full content when opened

**Example Output:**

```markdown
### /about
- hero (read, 12s / 45 words)
- status-quo (engaged, 38s / 120 words)
- physics-framework (skimmed, 4s / 200 words)

### warehouse (viewed, 15s / 180 words)

# The Warehouse That Wasn't

**Category:** Supply Chain Diagnostics

**Problem:**
A logistics company was losing money...

[Full modal content...]

### particle-incentives (read, 25s / 160 words)

# Incentives Particle

What people say drives them. What actually drives them...

[Full modal content...]
```

## Content Sources

### Page Files - Extracted From:

| File | Source | Extraction Method |
|------|--------|-------------------|
| `homepage.md` | `app/page.tsx` | Manual extraction, clean markdown |
| `about.md` | `app/about/page.tsx` | Extracted main content (not modals) |
| `solutions.md` | `app/solutions/page.tsx` | Header copy, philosophy sections |
| `products.md` | `app/products/page.tsx` | Product descriptions, pricing model |
| `contact.md` | `app/contact/page.tsx` | Contact page content |
| `articles.md` | `app/articles/page.tsx` | Articles hub content |
| Mental models | `app/{demand,incentives,etc}/page.tsx` | Mental model page content |

### Modal Files - Extracted From:

**Source:** `app/about/page.tsx` → `briefs` object (lines 44-600+)

**Structure:**
```typescript
const briefs: {
  [key: string]: {
    title: string;
    category: string;
    problem: string;
    howWeSawIt: string;
    result: string;
  }
} = {
  'warehouse': {
    title: 'The Warehouse That Wasn\'t',
    category: 'Supply Chain Diagnostics',
    problem: '...',
    howWeSawIt: '...',
    result: '...'
  },
  // ... 29 more modals
};
```

**Extraction:** Each modal's fields converted to markdown format.

## Dynamic Content Special Case

**File:** `dynamic-content.md`

**Source:** Automatically generated by `scripts/generate-dynamic-content.js`

**Update Frequency:** Every 6 hours via GitHub Actions

**Synchronization:**
```
1. GitHub Actions triggers script
2. Script fetches 9 RSS news feeds
3. Claude Opus 4 analyzes headlines
4. Generates 12 contextually-related content pieces
5. Writes TWO files simultaneously:
   - data/dynamic-content.json (for website components)
   - athena/knowledge/pages/dynamic-content.md (for Athena)
```

**Format:**
```markdown
# Dynamic Content

Last updated: {timestamp}

## Landing Page Insight
{AI-generated insight based on current news}

## Pattern Insight
{AI-generated pattern observation}

## Intelligence Examples
{Examples for "What We Do" page}

[... additional fields ...]

## Source Headlines
- BBC: "Arctic blast hits UK"
- NYT: "Tech layoffs continue"
[... additional sources ...]
```

**Why This Matters:**
When a user sees "Arctic blast hits UK" on the homepage and asks Athena about it, she knows exactly what they're referring to because her knowledge file was updated at the same moment the website content changed.

## Maintenance

### Adding a New Page

1. **Create knowledge file:**
   ```bash
   touch athena/knowledge/pages/new-page.md
   ```

2. **Extract content from page component:**
   - Read `app/new-page/page.tsx`
   - Convert JSX to clean markdown
   - Remove styling, keep content
   - Maintain British English and brand voice

3. **Update page knowledge map:**
   ```typescript
   // In lib/getKnowledgeContext.ts
   const PAGE_KNOWLEDGE_MAP: Record<string, string> = {
     // ... existing mappings
     '/new-page': 'new-page'
   };
   ```

4. **Test:**
   - Visit `/new-page`
   - Open Athena chat
   - Verify she can reference page content

### Adding a New Modal

1. **Create knowledge file:**
   ```bash
   touch athena/knowledge/modals/new-modal.md
   ```

2. **Extract from briefs object:**
   - Find modal in `app/about/page.tsx` → `briefs` object
   - Convert to standard modal format
   - Include all sections (title, category, problem, how we saw it, result)

3. **Ensure modal tracking:**
   - Modal should call `trackModalOpen('new-modal')` on open
   - Modal should call `trackModalClose('new-modal')` on close
   - Dialog.Panel should have `data-modal-id="new-modal"`

4. **Test:**
   - Open modal
   - Close modal
   - Send Athena message
   - Verify modal content appears in viewing context

### Updating Existing Files

**Page files:**
1. Edit the relevant `.md` file in `athena/knowledge/pages/`
2. Changes apply immediately in development (hot-reload)
3. Deploy to production for live updates

**Modal files:**
1. Edit the relevant `.md` file in `athena/knowledge/modals/`
2. Changes apply immediately in development
3. Deploy to production

**Dynamic content:**
- Automatically updates every 6 hours
- No manual intervention needed
- Can trigger manually via GitHub Actions UI

## Word Count Considerations

**Why Word Count Matters:**
Engagement classification relies on expected read time, which is calculated from word count.

**Accuracy Requirements:**
- Word counts should be reasonably accurate (±10%)
- Includes body text, not markdown formatting
- Excludes navigation, buttons, form labels
- Focuses on actual readable content

**Implementation:**
```typescript
// From lib/wordCount.ts
export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .length;
}
```

**For Files:**
- Automatically counted from text content when section/modal tracked
- Stored in `EngagementData.wordCount`
- Used for engagement classification

## File Size Guidelines

**Page Files:**
- Target: 500-2000 words
- Maximum: 3000 words
- Larger pages should be split into multiple sections for better tracking

**Modal Files:**
- Target: 150-300 words
- Maximum: 500 words
- Modals are typically focused, concise explanations

**Reasoning:**
- Keeps API payload size manageable
- Better engagement classification accuracy
- Matches typical user attention spans

## Quality Guidelines

### Content Extraction

**Do:**
- ✅ Convert JSX to clean markdown
- ✅ Preserve semantic structure (headers, lists, emphasis)
- ✅ Maintain British English spelling
- ✅ Keep "spatial poetry" formatting where appropriate
- ✅ Include all substantive content
- ✅ Preserve brand voice and tone

**Don't:**
- ❌ Include JSX or React components
- ❌ Include inline styles or CSS
- ❌ Include navigation or UI elements
- ❌ Include placeholder text or Lorem Ipsum
- ❌ Change American to British spelling inconsistently
- ❌ Over-format or add unnecessary markdown

### Brand Voice Consistency

All knowledge files should match Prismatica's brand voice:

**Characteristics:**
- Quiet confidence, zero noise, maximum clarity
- Direct, no fluff
- Physics/systems thinking metaphors
- British English throughout
- Strategic use of bold for emphasis
- Choppy, poetic rhythm in key sections

**Example (Good):**
```markdown
You are not here to fix success. You're here to fix problems.

The less time you spend on the problem, the more time you have for solutions.

**That's all.**
```

**Example (Bad):**
```markdown
We're here to help you solve your business problems! Our team of experts will work with you to develop comprehensive solutions that drive results.
```

## Validation

### Manual Validation Checklist

For each knowledge file:

- [ ] Clean markdown (no JSX, HTML, or styling)
- [ ] British English spelling
- [ ] Consistent brand voice
- [ ] Reasonable word count (not too short or too long)
- [ ] Proper markdown headers and structure
- [ ] No broken links or references
- [ ] Content matches actual page/modal content
- [ ] File name matches convention

### Automated Validation (Future)

Could implement:
- Spell check (British English dictionary)
- Word count validation
- Markdown linting
- Link checking
- Content freshness monitoring

## Troubleshooting

### Knowledge File Not Loading

**Symptom:** Athena doesn't reference page/modal content

**Check:**
1. Does file exist at correct path?
2. Is filename correct in `PAGE_KNOWLEDGE_MAP`?
3. Is modal ID correct in tracking calls?
4. Check console for "Knowledge file not found" warnings
5. Verify file has read permissions

### Engagement Data Inaccurate

**Symptom:** Engagement classification doesn't match actual behavior

**Check:**
1. Is word count accurate? (Compare manual count to tracked count)
2. Is content extracted correctly? (No missing sections)
3. Is tracking working? (Check section IDs and modal IDs)
4. Is duration accurate? (Check timer logic)

### Content Out of Sync

**Symptom:** Knowledge file doesn't match current website content

**Check:**
1. When was file last updated?
2. Has page content changed since extraction?
3. Is dynamic content refreshing? (Check timestamps)
4. Compare file content to actual page in browser

## Performance

### File Loading Performance

**Current Implementation:**
- Synchronous file reads (`fs.readFileSync`)
- Files read on every API request in development
- Files cached in production (prompt caching)

**Typical Performance:**
- Single file read: <1ms
- 3-5 files per request: <5ms
- Negligible impact on API response time

**Optimization Opportunities:**
- Cache file contents in memory (production)
- Use async file reads (`fs.readFile`)
- Lazy load files only when needed

### API Payload Impact

**Typical Payload:**
- Empty viewing history: 0 bytes
- 2 pages, 3 sections: ~1KB
- 2 pages, 3 sections, 2 modals: ~2-3KB

**Impact:**
- Minimal (compressed by HTTP/2)
- Well within Claude API limits
- Offset by 90% token reduction from context-aware loading

## Future Enhancements

### 1. Multi-Language Support

Structure for different languages:
```
athena/knowledge/
├── pages/
│   ├── en/
│   │   ├── about.md
│   │   └── ...
│   └── es/
│       ├── about.md
│       └── ...
```

### 2. Version Control

Track content versions to detect when pages change:
```markdown
---
version: 2.1
last_updated: 2025-11-18
checksum: abc123
---

# Page Content
```

### 3. Content Tags

Tag content for better categorization:
```markdown
---
tags: [philosophy, methodology, case-study]
difficulty: intermediate
reading_time: 3min
---
```

### 4. Automated Extraction

Script to automatically extract and update knowledge files when pages change:
```bash
npm run extract-knowledge
```

### 5. Analytics Integration

Track which knowledge files are most frequently loaded/referenced by Athena.

## Related Documentation

- **README.md** - Athena system overview
- **CONTEXT_SYSTEM.md** - Viewing context and engagement tracking
- **INTELLIGENCE_SYSTEM.md** - Conversation storage and analysis
- **Root CLAUDE.md** - Project-wide documentation
