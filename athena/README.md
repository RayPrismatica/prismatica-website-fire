# Athena - AI Strategic Advisor

This directory contains all configuration, prompts, and knowledge for Athena, Prismatica's AI Strategic Advisor with context-aware intelligence.

## Structure

```
athena/
├── README.md                           # This file
├── CONTEXT_SYSTEM.md                   # Deep dive on viewing context & engagement tracking
├── KNOWLEDGE_BASE.md                   # Knowledge base architecture
├── config/
│   └── settings.json                  # Model configuration (Sonnet 4.5, temperature, tokens)
├── prompts/
│   ├── core.md                        # Core system prompt and personality
│   └── conversation-analysis.md       # Post-chat analysis template
├── knowledge/
│   ├── pages/                         # 12 page knowledge files
│   │   ├── homepage.md
│   │   ├── about.md
│   │   ├── solutions.md
│   │   ├── products.md
│   │   ├── demand.md
│   │   ├── incentives.md
│   │   ├── agentic.md
│   │   ├── prismatic.md
│   │   ├── triptych.md
│   │   ├── not-found.md               # 404 page with full site architecture
│   │   ├── consulting.md              # Legacy/reference
│   │   └── dynamic-content.md         # Auto-synced every 6 hours
│   ├── navigation-tree.md             # Complete navigation with 42 deep links
│   └── modals/                        # 30 modal knowledge files
│       ├── warehouse.md               # Case studies (8 files)
│       ├── particle-time.md           # Particles (7 files)
│       ├── molecule-demand.md         # Molecules (5 files)
│       ├── pattern-inertia.md         # Patterns (5 files)
│       └── model-demand.md            # Mental models (5 files)
└── intel/                             # Intelligence storage (Vercel Blob, git-ignored)
    └── layer1/
        ├── raw-conversations/         # Anonymous conversation transcripts
        └── summaries/                 # Automated conversation analyses
```

## Configuration

**Model:** Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`)
**Temperature:** 0.7
**Max Tokens:** 1024

See `config/settings.json` for full configuration.

## Core Features

### 1. Hyper-Accurate Navigation

Athena has access to the complete site navigation tree with **42 deep links**:
- Direct links to all pages, sections, modals, services, and products
- Can link to specific case studies: `[The Warehouse That Wasn't](/about#warehouse)`
- Can link to specific services: `[ESI Framework](/solutions#esi-framework)`
- Can link to specific concepts: `[Friction](/about#molecule-friction)`
- Matches user problems to exact resources with surgical precision

See `knowledge/navigation-tree.md` for the complete structure.

### 2. Context-Aware Intelligence

Athena knows exactly what users have seen on the website through three layers of tracking:

**Page Tracking:**
- Automatically tracks all pages visited in the session
- Loads relevant knowledge files for context

**Section Tracking:**
- Uses IntersectionObserver to detect when sections become 50%+ visible
- Tracks time spent on each section
- Classifies engagement: skimmed, viewed, read, or engaged

**Modal Tracking:**
- Tracks when modals/case studies are opened
- Measures time spent before closing
- Classifies engagement level based on content length

See `CONTEXT_SYSTEM.md` for technical details.

### 2. Reading Engagement Analysis

Beyond knowing WHAT users viewed, Athena knows HOW they engaged:

**Engagement Levels:**
- **skimmed** - Spent <30% of expected read time
- **viewed** - Spent 30-80% of expected read time
- **read** - Spent 80-120% of expected read time
- **engaged** - Spent >120% of expected read time (deep focus)

**Formula:**
```
Expected Read Time = (Word Count / 225 WPM) × 60 × 1.2 (buffer)
Engagement = classifyEngagement(actualDuration, expectedDuration)
```

**Why This Matters:**
Athena can distinguish between "opened the Warehouse case study for 3 seconds" (skimmed) vs "spent 45 seconds reading it" (engaged), and calibrate responses accordingly.

### 3. Knowledge Base (41 Files)

**11 Page Files:**
Extract complete page content for context. When users visit a page, Athena loads the corresponding knowledge file to understand what they're seeing.

**30 Modal Files:**
Detailed case studies, particle/molecule/pattern explanations, and mental model summaries. Loaded only when users actually open the modals.

See `KNOWLEDGE_BASE.md` for architecture details.

### 4. Dynamic Content Synchronization

The `dynamic-content.md` file is **automatically synced** with website content every 6 hours:

**How it works:**
1. GitHub Actions triggers `scripts/generate-dynamic-content.js`
2. Script fetches RSS feeds from 9 news sources (BBC, NYT, Fast Company, Forbes, Marketing Week, HBR, Wired, Inc, The Atlantic)
3. Claude Opus 4 (`claude-opus-4-20250514`) analyzes headlines and generates 12 content pieces
4. Script writes **two files simultaneously**:
   - `data/dynamic-content.json` → Website components read from this
   - `athena/knowledge/pages/dynamic-content.md` → Athena reads from this
5. Both files stay perfectly in sync

**Why this matters:**
When a user sees "Arctic blast hits UK" on the homepage and asks Athena about it, she knows exactly what they're referring to because her knowledge file was updated at the same moment the website content changed.

### 5. Intelligence Layers

**Layer 1 - Anonymous Behavioral Intelligence (ACTIVE):**
- Stores conversation transcripts in Vercel Blob (`athena/intel/layer1/raw-conversations/`)
- Automated post-chat analysis when conversation has 6+ messages
- Analysis saved to `athena/intel/layer1/summaries/`
- Web research tools (Google search, webpage fetching)
- Optional session continuity via username parameter

**Layer 2 - Named Session Notes (PLANNED):**
- Placeholder infrastructure for opt-in session persistence
- Would store to `athena/intel/layer2/sessions/`
- Not yet implemented

See `INTELLIGENCE_SYSTEM.md` for intelligence architecture.

## System Prompt

The core system prompt (`prompts/core.md`) defines:
- Athena's identity and role ("Athero" persona)
- How she's introduced to users
- Operating principles (quiet confidence, zero noise, maximum clarity)
- Using viewing context naturally (presumptive, not definitive)
- Reading engagement data calibration
- Knowledge of Prismatica's services and philosophy
- Conversational guidelines
- Security protocol ("sun-on-elba" verification code)

## How It Works

**Full Request Flow:**

1. **User scrolls page** → `useScrollTracking()` hook tracks sections (50%+ visibility)
2. **User opens modal** → `trackModalOpen()` starts timer
3. **User closes modal** → `trackModalClose()` calculates duration and engagement
4. **User sends message** → `app/api/chat/route.ts`
5. **API receives:**
   - Message content
   - Conversation ID
   - Optional username (for session continuity)
   - **Viewing context** (pages visited, sections viewed with engagement data, modals opened with engagement data)
6. **API builds system prompt:**
   - Core prompt from `athena/prompts/core.md`
   - Dynamic content from `dynamic-content.md`
   - Knowledge context from `lib/getKnowledgeContext.ts`:
     - Loads page MD files for visited pages
     - Loads modal MD files for opened modals
     - Formats with engagement data: `section-name (engagement-level, duration / wordCount)`
   - Optional session notes if username provided
7. **Sends to Claude API** with conversation history and tools
8. **Returns response** to user
9. **Saves conversation** to Vercel Blob for intelligence layer

**Context Format Example:**
```markdown
### /about
- hero (read, 12s / 45 words)
- status-quo (engaged, 38s / 120 words)
- case-studies (skimmed, 4s / 200 words)

### Modals Opened
- warehouse (viewed, 15s / 180 words)
[Full warehouse modal content...]
```

## Development

**Hot Reload in Development:**
The core prompt file is reloaded on every request in development mode, so you can edit `prompts/core.md` and see changes immediately without server restart.

**Production Caching:**
In production, the core prompt is cached once on server start for performance.

**Testing Engagement Tracking:**
1. Visit `/about` page
2. Open React DevTools → Components → AthenaChatProvider
3. Watch `viewingHistory.sectionsViewed` update as you scroll
4. Open a few modals, watch `viewingHistory.modalsOpened` update
5. Open Athena chat, send message
6. Check Network tab → `/api/chat` request includes `viewingContext`

## Maintenance

**Updating Knowledge:**
1. Edit relevant `.md` files in `knowledge/pages/` or `knowledge/modals/`
2. Changes take effect immediately in development
3. Deploy to production for live updates

**Updating Configuration:**
1. Edit `config/settings.json`
2. Update `app/api/chat/route.ts` if model/settings change
3. Deploy to production

**Updating System Prompt:**
1. Edit `prompts/core.md`
2. Test in development (hot-reloads automatically)
3. Deploy to production (cached on server start)

**Dynamic Content:**
Automatically updates every 6 hours via GitHub Actions. No manual intervention needed.

**Engagement Tracking:**
Runs automatically via IntersectionObserver and Page Visibility API. No maintenance needed.

## API Cost Optimization

**Before Context System:**
- System prompt: ~50k tokens (entire site content)
- Cost per message: ~$0.15

**After Context System:**
- System prompt base: ~2k tokens
- Dynamic context (1-3 pages): ~3k tokens
- Total: ~5k tokens
- Cost per message: ~$0.016

**90% cost reduction** while improving response precision.

## Security

**Verification Protocol:**
- Embedded code "sun-on-elba" in core prompt
- Team members must verify before discussing internal matters
- Privacy: Conversation data folders git-ignored, never committed

**Rate Limiting:**
- 10 messages per 60 seconds per client
- IP-based identification with proxy header support
- Returns 429 with retry-after headers when exceeded

## Files

**Key Implementation Files:**
- `contexts/AthenaChatContext.tsx` - Global state, viewing history, modal tracking
- `hooks/useScrollTracking.ts` - Section tracking with IntersectionObserver
- `lib/getKnowledgeContext.ts` - Knowledge loader and formatter
- `lib/wordCount.ts` - Word counting and engagement classification utilities
- `components/GlobalAthenaChat.tsx` - Desktop chat interface
- `components/MobileBottomSheetAthena.tsx` - Mobile chat interface
- `app/api/chat/route.ts` - Chat API endpoint
- `app/api/chat/end/route.ts` - Post-chat analysis endpoint

**Related Documentation:**
- `CONTEXT_SYSTEM.md` - Technical details on viewing context and engagement tracking
- `KNOWLEDGE_BASE.md` - Knowledge base architecture and file structure
- `INTELLIGENCE_SYSTEM.md` - Intelligence layers and conversation storage
- Root `CLAUDE.md` - Project-wide documentation including Athena system overview
