# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prismatica Labs is a Next.js 16 (React 19) application for a strategic consulting firm. The site features AI-generated dynamic content that updates every 6 hours based on current news, with an integrated AI chat assistant (Athena) for visitor interaction.

**Tech Stack:**
- Next.js 16.0.1 (App Router)
- React 19.2.0
- TypeScript 5
- Tailwind CSS v4
- Anthropic Claude API (Opus 4 for content, Sonnet 4.5 for chat)

## Development Commands

```bash
# Development server (hot reload enabled)
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint

# Content generation (manual trigger)
npm run generate-content

# Background scheduler (runs content generation every 15 minutes)
npm run start-scheduler
```

## Architecture Overview

### Dynamic Content System

The application's unique feature is AI-generated content that stays contextually current:

**Flow:**
1. GitHub Actions runs `scripts/generate-dynamic-content.js` every 6 hours
2. Script fetches RSS feeds from 9 news sources (BBC, NYT, Fast Company, Forbes, Marketing Week, HBR, Wired, Inc, The Atlantic)
3. Claude Opus 4 (`claude-opus-4-20250514`) analyzes headlines and generates 12 contextually-related content pieces
   - Temperature: 1.0
   - Max tokens: 2200
   - System prompt: `scripts/prompts/dynamic-content.md`
4. Content uploaded to **Vercel Blob Storage** and saved to markdown file:
   - **Vercel Blob**: `dynamic-content.json` (24-hour max-age safety limit, 6-hour refresh cycle, instant updates, no rebuilds)
   - **Local file**: `athena/knowledge/pages/dynamic-content.md` - Markdown for Athena's knowledge base
   - **Storage options**: Uses `allowOverwrite: true` and `addRandomSuffix: false` for deterministic file paths
5. Components fetch from Blob via `lib/getDynamicContent.ts` and `/api/dynamic-content`
6. Athena reads from markdown via `getPageContent()` in chat API
7. Fallback content ensures site never breaks if Blob fetch fails or content expires

**Athena Awareness:** Athena is always aware of current dynamic content because the generation script updates her knowledge base file in sync with the website content. This ensures she can reference what users are actually seeing on each page.

**Dynamic Components:**
- `DynamicNewsInsight` - Landing page insight
- `DynamicIntelligenceExample` - "What We Do" intelligence example
- `DynamicServiceDescription` - Service descriptions
- `DynamicESIDescription`, `DynamicAgencyDescription`, `DynamicKSODescription`, `DynamicTransactionDescription`, `DynamicTriptychDescription` - Product/service explanations
- `MarketObservation`, `InlineObservation` - Contextual market insights
- `UserContentReminder` - Cross-page continuity

All dynamic components follow the same pattern: fetch from cache, display with fade-in animation, fallback to hardcoded content if cache fails/expires.

### API Routes Structure

**`/api/chat`** - Athena chat assistant
- Model: Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`)
- Temperature: 0.7, Max tokens: 1024
- System prompt: `scripts/prompts/athena-chat.md`
- Rate limited: 10 messages per 60 seconds per client
- Development: hot-reloads prompt file changes
- Production: caches prompt file for performance

**`/api/enquiry`** - Contact form submissions via Resend
**`/api/products-enquiry`** - Product enquiry form
**`/api/dynamic-content`** - Serves cached dynamic content
**`/api/generate-content`** - Webhook endpoint for content regeneration
**`/api/chat/end`** - Post-chat analysis endpoint (triggers automated conversation summarization)

### Athena Intelligence System

Athena implements a dual-layer intelligence system for learning from user interactions while maintaining privacy:

**Layer 1 - Anonymous Behavioral Intelligence (IMPLEMENTED)**

Stores anonymous conversation data in Vercel Blob Storage at `athena/intel/layer1/`:

- **Raw Conversations**: Saved to `raw-conversations/{YYYY-MM}/` as JSON files
  - Conversation matching logic associates new messages with existing conversation IDs
  - Uses blob prefix listing to find and continue existing conversations
  - Files use deterministic naming with `allowOverwrite: true` for continuation

- **Post-Chat Analysis**: Triggered by `/api/chat/end` endpoint
  - Requires 6+ messages (3+ exchanges) to trigger analysis
  - Uses dedicated prompt: `athena/prompts/conversation-analysis.md`
  - Analysis saved to `summaries/{YYYY-MM}/` as markdown files
  - Summaries publicly accessible for future analytics/dashboard features

- **Web Research Tools**: Athena can research user context
  - `search_web` - Google search with fallback
  - `fetch_webpage` - JSDOM-based content extraction
  - 10-second timeout on web requests
  - Used for company research, LinkedIn profiles, etc.

- **Session Continuity**: Optional username parameter enables session persistence
  - Loads previous session notes if username provided
  - Searches current month, then previous month (YYYY-MM folder structure)
  - Session context injected into system prompt with "RETURNING USER" marker

**Layer 2 - Named Session Notes (PLANNED)**

Placeholder infrastructure exists for opt-in session persistence:
- Designed for explicit user permission (after 3-4 exchanges demonstrate value)
- Would store to `sessions/{YYYY-MM}/` under sanitized user identifiers
- Not yet implemented - infrastructure only

**Page-Specific Contextual Prompts**

Athena adapts opening questions based on current page:
- `PAGE_PROMPTS` constant defines 15 unique contextual questions
- Implemented in both `GlobalAthenaChat.tsx` (desktop) and `MobileBottomSheetAthena.tsx` (mobile)
- Fallback to generic prompt if page not in list
- Examples: "/consulting" asks about project timelines, "/products" about transformation goals

**Prompt Caching Strategy**

- **Development**: Prompts reload from filesystem on every request (hot-reload enabled)
- **Production**: Core Athena prompt (`athena/prompts/core.md`) cached once at server startup
- Allows rapid iteration on prompts without server restarts during development

**Security Protocol**

- Embedded verification code "sun-on-elba" in core prompt for team access
- Forces team verification before discussing internal matters
- Privacy: Conversation data folders git-ignored, never committed

### Environment Variables

Required in `.env.local`:

```bash
# Separate API keys for different services (can fallback to single ANTHROPIC_API_KEY)
ANTHROPIC_API_KEY_CONTENT=  # For content generation (uses Opus 4)
ANTHROPIC_API_KEY_CHAT=     # For Athena chat (uses Sonnet 4.5)
ANTHROPIC_API_KEY=          # Fallback for both

RESEND_API_KEY=             # Email notifications

# Vercel Blob Storage (dual-purpose: dynamic content + Athena intelligence)
BLOB_READ_WRITE_TOKEN=      # Token from Vercel dashboard (for writing content)
BLOB_URL=                   # Public URL of your blob (set by Vercel)
```

### Vercel Blob Storage Architecture

The application uses Vercel Blob Storage for two distinct, independent data streams:

**A. Dynamic Content Storage**
- File: `dynamic-content.json`
- Cache strategy: 24-hour max-age safety limit, 6-hour refresh via GitHub Actions
- Accessed via: `lib/getDynamicContent.ts` and `/api/dynamic-content` endpoint
- Fallback: Hardcoded content matching brand voice if Blob fetch fails or expires

**B. Athena Intelligence Storage**
- Conversation transcripts: `athena/intel/layer1/raw-conversations/{YYYY-MM}/`
- Analysis summaries: `athena/intel/layer1/summaries/{YYYY-MM}/`
- Accessed via: `/api/chat/route.ts` (save) and `/api/chat/end/route.ts` (analyze)
- Public access for summaries enables future analytics/dashboard features

**Both use consistent Blob options:**
- `allowOverwrite: true` - Enables conversation continuation and content updates
- `addRandomSuffix: false` - Deterministic file paths for reliable retrieval
- Prefix-based listing for conversation discovery and matching

### Rate Limiting

Implemented in `lib/rateLimiter.ts`:
- Sliding window algorithm (in-memory, singleton instance)
- Chat: 10 requests per 60 seconds
- Client identification: IP-based with X-Forwarded-For, X-Real-IP, CF-Connecting-IP support
- Returns 429 with retry-after headers when exceeded
- Automatic cleanup every 5 minutes (removes old entries)

**Production Consideration:** Current implementation is in-memory (single server). For production deployments with multiple servers, consider migrating to Redis-backed rate limiting to share state across instances.

### Page Layout Pattern

Pages use a consistent two-column layout:
- `components/PageLayout.tsx` wraps content with `Sidebar` navigation
- Main content area uses responsive grid
- Global Athena chat overlay available on all pages via `components/GlobalAthenaChat.tsx`
- Mobile users see `MobileBottomSheetAthena.tsx` - a bottom sheet with contextual page-specific prompts
- Context managed by `contexts/AthenaChatContext.tsx`

### Styling

- Tailwind CSS v4 with custom configuration
- CSS variables defined in `app/globals.css`
- Fonts: Noto Sans (body), Passion One (headings)
- Custom classes: `.container`, `.main`, `.card`, `.button-primary`, etc.

### Page Routes

**Public Pages:**
- `/` - Landing page with dynamic news insight (Focus)
- `/what` - What We Do (services overview)
- `/consulting` - Consulting services and engagement types
- `/products` - Product offerings
- `/about` - About page (team identity + mental models combined)
- `/mental-models`, `/triptych`, `/prismatic`, `/agentic`, `/demand`, `/incentives` - Service detail pages
- `/articles` - Content hub
- `/contact`, `/terms`, `/privacy` - Standard pages

## Design System

Complete visual identity and styling guidelines are documented in `PrismaticaSoul/VISUAL_IDENTITY.md`. This comprehensive guide covers:

- **Color System**: Primary palette (Prismatica Red #D43225), text hierarchy, accent colors, borders
- **Typography**: Font families, type scale, responsive sizing, letter spacing
- **Layout & Spacing**: Grid system, spacing scale, border radius scale
- **Components**: Buttons, cards (bento boxes), forms, modals, sidebar, Athena chat
- **Animations**: Transitions, keyframes, hover effects
- **Interactive States**: Navigation, buttons, form inputs, cards
- **Responsive Design**: Breakpoints and mobile-specific behaviors
- **Design Patterns**: Left accent bars, underline emphasis, bento box structure

**When making UI changes**, always consult `PrismaticaSoul/VISUAL_IDENTITY.md` to maintain design consistency. The design philosophy is: **quiet confidence, zero noise, maximum clarity**.

### Critical Naming Conventions

**Accent Terminology** (defined in VISUAL_IDENTITY.md):
- "Accent" or "red accent" = **Left accent bar** (3px vertical red bar, `position: relative` with `::before` pseudo-element)
- "Red underline" = 4px `border-bottom` on text
- "Red text" = Colored text (`color: #D43225`)

**AI Assistant Name**: The chat assistant is called **Athena** (not Carmen). All references must use "Athena":
- CSS classes: `.athena-*` (not `.carmen-*`)
- Component names: `GlobalAthenaChat`, `MobileBottomSheetAthena`, `AthenaChatContext`
- User-facing text: "Athena (our AI chat)"
- Image files: `/images/athena-advisor.jpg`
- Internal name in prompts: "Athero" (system prompt persona)

## Important File Locations

**Configuration:**
- `scripts/configs/generation-config.json` - Content generation and chat model settings
- `scripts/prompts/dynamic-content.md` - Content generation system prompt
- `athena/prompts/core.md` - Core Athena system prompt (includes security protocol)
- `athena/prompts/conversation-analysis.md` - Post-chat analysis template
- `athena/config/settings.json` - Athena model configuration (Sonnet 4.5, temperature 0.7, max tokens 1024)
- `.github/workflows/generate-content.yml` - GitHub Actions workflow for automated content generation

**Design:**
- `PrismaticaSoul/VISUAL_IDENTITY.md` - Complete visual design system and styling guidelines

**Data:**
- `data/dynamic-content.json` - Generated content cache (24-hour validity, 6-hour refresh)
- **Athena Intelligence** (Vercel Blob Storage, git-ignored):
  - `athena/intel/layer1/raw-conversations/{YYYY-MM}/` - Anonymous conversation transcripts
  - `athena/intel/layer1/summaries/{YYYY-MM}/` - Automated conversation analyses
  - `athena/intel/layer2/sessions/{YYYY-MM}/` - Named session notes (planned, not implemented)

**Athena Knowledge Base:**
- `athena/knowledge/pages/` - Page-specific knowledge files
  - `dynamic-content.md` - Synced with website dynamic content every 6 hours
  - `consulting.md` - Consulting services knowledge
  - Additional page knowledge files as needed
- Accessed via `getPageContent()` function in chat API

**Scripts:**
- `scripts/generate-dynamic-content.js` - Content generation logic
- `scripts/scheduler.js` - Background cron scheduler
- `scripts/sync-substack.js` - Newsletter sync utility

**Core Utilities:**
- `lib/getDynamicContent.ts` - Dynamic content cache reader with fallback system
- `lib/rateLimiter.ts` - Rate limiting implementation for API routes
- `contexts/AthenaChatContext.tsx` - Global state management for Athena chat
- `contexts/MobilePrototypeContext.tsx` - Mobile prototype feature flags

**Mobile Components:**
- `components/MobileBottomSheetAthena.tsx` - Mobile-specific Athena chat interface
- `components/MobileAnimations.tsx` - Viewport-triggered animations
- `components/MobilePrototypeAnimations.tsx` - Experimental mobile interactions
- `components/MobilePrototypeToggle.tsx` - UI control for mobile prototype mode

**UI Components:**
- `components/BentoBox.tsx` - Universal bento box component for services, products, and navigation cards
  - Documentation: `components/BentoBox.README.md`
  - Examples: `components/BentoBox.examples.tsx`
  - Specification: `BENTO_BOX_SPEC.md`
  - Roadmap: `BENTO_BOX_ROADMAP.md`

## Development Guidelines

### Working with Bento Boxes

**BentoBox Component** - Universal card component for consistent design across the site.

When creating new service cards, product cards, or navigation cards, **always use the BentoBox component** instead of inline styles:

```tsx
import BentoBox from '@/components/BentoBox';

<BentoBox
  variant="service"  // 'service' | 'link' | 'product'
  prompt="If your problem statement..."
  title="Service Name"
  badge="Strategy"
  price="From £50,000"
  shareEmail={{ subject: '...', body: '...' }}
  onEnquire={() => openModal('service-id')}
>
  <p style={{ marginBottom: '16px', fontSize: '17px', lineHeight: '1.6', color: '#444' }}>
    Service description...
  </p>
</BentoBox>
```

**Key Rules:**
- Use `variant="service"` or `variant="link"` for consulting services
- Use `variant="product"` for product showcase cards
- Body text must be 17px (not 16px!)
- CTA links are 15px, 500 weight, 0.3px letter-spacing
- Red accent bar is always 3px width, left: -20px, #D43225

**Documentation:**
- Full API: `components/BentoBox.README.md`
- Examples: `components/BentoBox.examples.tsx`
- Specifications: `BENTO_BOX_SPEC.md`

### Working with Dynamic Content

1. All content pieces are generated together as a cohesive narrative
2. When adding new dynamic content fields, update:
   - `scripts/generate-dynamic-content.js` (parsing logic)
   - `scripts/prompts/dynamic-content.md` (generation instructions)
   - `lib/getDynamicContent.ts` (TypeScript interface and fallback content)
   - Create corresponding `Dynamic*` component in `components/`
3. All dynamic components use the same pattern:
   ```typescript
   const content = await getDynamicContent();
   return <div className="fade-in">{content.fieldName}</div>;
   ```
4. Fallback content in `getDynamicContent.ts` must match the brand voice exactly

### Modifying AI Prompts

**Chat (Athena):**
- Core system prompt: Edit `athena/prompts/core.md`
- Conversation analysis: Edit `athena/prompts/conversation-analysis.md`
- Changes hot-reload in development (cached in production)
- Test locally before deploying
- Security protocol embedded in core prompt (never modify "sun-on-elba" code)

**Content Generation:**
- Edit `scripts/prompts/dynamic-content.md`
- Run `npm run generate-content` to test
- Check output in `data/dynamic-content.json` and `athena/knowledge/pages/dynamic-content.md`
- Verify all 12 pieces parse correctly
- Ensure British English compliance (template includes spelling guide)

### Adding API Routes

- Follow existing rate limiting patterns
- Use separate API keys when appropriate
- Always include error handling and fallbacks
- Return appropriate HTTP status codes and headers

### Cache Management

**Dynamic Content Caching Strategy:**

- **API Layer** (`/api/dynamic-content`):
  - Next.js: `export const dynamic = 'force-dynamic'` and `export const revalidate = 0`
  - HTTP headers: `Cache-Control: no-cache, no-store, must-revalidate`
  - Ensures fresh content on every request

- **Client Layer** (dynamic components):
  - All dynamic components use `'use client'` directive
  - Fetch with `cache: 'no-store'` option
  - `useEffect` with mounted flag prevents hydration mismatches
  - Individual fallback strings in each component if API fails

- **Blob Storage Layer**:
  - 24-hour max-age safety limit (serves fallback if content older than 24 hours)
  - Primary refresh: 6-hour cycle via GitHub Actions
  - Fallback content in `lib/getDynamicContent.ts` matches brand voice exactly

- **Component Pattern**:
  ```typescript
  // All dynamic components follow this pattern:
  const [content, setContent] = useState<string>('');
  useEffect(() => {
    fetch('/api/dynamic-content', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setContent(data.fieldName))
      .catch(() => setContent('Fallback content'));
  }, []);
  ```

**Prompt Caching:**
- Chat prompt: cached in production (loaded once at startup), reloaded on every request in development
- Enables hot-reload during development without server restarts

**State Management:**
- Components include loading states for async data fetching
- Fade-in animations on content load for smooth UX

### Component Architecture

**Server vs Client Components:**
- Pages are Server Components by default (for `getDynamicContent()` calls)
- Interactive components use `'use client'` directive (chat, modals, forms)
- `GlobalAthenaChat` uses Headless UI's Dialog component for accessibility
- State management via React Context API (`AthenaChatContext`)

**Key Patterns:**
- PageLayout wraps all pages with Sidebar navigation
- Dynamic content components are async Server Components
- Client-side interactivity isolated to specific components
- Image optimization via Next.js Image component with preloading for critical assets

### Mobile Experience

**Athena Chat Interface:**
- Desktop: `GlobalAthenaChat` - Modal overlay using Headless UI Dialog
- Mobile: `MobileBottomSheetAthena` - Bottom sheet with:
  - Contextual page-specific prompts (defined in `PAGE_PROMPTS` constant)
  - Persistent conversation state (survives navigation)
  - User-facing introduction: "Athena knows Prismatica."
  - Emphasizes continuity: "Once you start, she stays with you"

**Animation System:**
- `MobileAnimations.tsx` - Viewport-triggered entrance animations
- `MobilePrototypeAnimations.tsx` - Experimental mobile interactions
- `MobilePrototypeContext.tsx` - Feature flag system for mobile prototypes (localStorage-based)

## Testing Dynamic Content

```bash
# Generate new content locally
npm run generate-content

# Start scheduler for continuous regeneration
npm run start-scheduler

# Check cache file
cat data/dynamic-content.json
```

Verify all fields populated and no parsing errors in console output.

## Deployment

Vercel deployment with GitHub Actions integration:
1. Push to main triggers Vercel build
2. GitHub Action (`.github/workflows/generate-content.yml`) generates fresh content every 6 hours
3. Content commit (with `[skip ci]` tag) triggers new deployment
4. Production uses environment variables from Vercel dashboard
5. Manual content generation can be triggered via GitHub Actions UI

**GitHub Actions Setup:**
- Cron schedule: `0 */6 * * *` (every 6 hours)
- Requires `ANTHROPIC_API_KEY` secret in repository settings
- Commits as "Content Generator Bot" to avoid triggering recursive builds
- Only commits if content actually changed

## Path Aliases

TypeScript configured with `@/*` mapping to root directory:
```typescript
import { getDynamicContent } from '@/lib/getDynamicContent';
import PageLayout from '@/components/PageLayout';
```

## Build & Linting Configuration

**ESLint Setup (ESLint 9+ Flat Config):**
- Config file: `eslint.config.mjs` (flat config format)
- Presets: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Custom global ignores: `.next/`, `out/`, `build/`
- No Prettier config - code style governed by ESLint only
- Run with: `npm run lint`

**Next.js Configuration:**
- `next.config.ts` - Minimal configuration (default Next.js 16 settings)
- PostCSS: Uses `@tailwindcss/postcss` plugin only
- Tailwind CSS v4 with custom variables in `app/globals.css`

**TypeScript Configuration:**
- Strict mode enabled
- Path aliases: `@/*` maps to root directory
- Target: ES2015+
- Module: ESNext with bundler resolution

**Font Configuration:**
- Google Fonts: Noto Sans (body) and Passion One (headings)
- Weights: Noto Sans (300, 400, 600, 700), Passion One (400, 700, 900)
- CSS variables: `--font-noto-sans` and `--font-passion`
- Applied globally in `app/layout.tsx`
