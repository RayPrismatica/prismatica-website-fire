# Prismatica App - Dynamic Content System Guide

> Last Updated: 2025-11-14
> Status: ✅ UPDATED - 48 HOUR THRESHOLD

---

## 🎉 FIXES APPLIED (2025-11-12)

### ✅ Issue #1: Cache Location Mismatch - FIXED
**Problem:** Script wrote to `/public/data/` but server read from `/data/`
**Fix:** Changed `scripts/generate-dynamic-content.js` lines 277 & 347 to write to `/data/` instead
**Result:** Script and server now use the same cache file location

### ✅ Issue #2: Missing Dynamic Components - FIXED
**Problem:** Transaction Architecture & Strategic Triptych used hardcoded text
**Fix:**
- Imported `DynamicTransactionDescription` and `DynamicTriptychDescription`
- Replaced hardcoded text with dynamic components on `/app/engagement/page.tsx`
**Result:** Now displays fresh news-driven content for these services

### ✅ Issue #3: InlineObservation Loading Wrong Field - FIXED
**Problem:** Component loaded `purposeContext` instead of `marketObservation`
**Fix:** Updated `components/InlineObservation.tsx` to fetch correct field
**Result:** Market observation now displays after "Most consultants optimise for resolution"

### ✅ Issue #4: InlineObservation Not Used - FIXED
**Problem:** Component imported but never rendered on page
**Fix:** Added `<InlineObservation />` to engagement page after line 42
**Result:** Market context now visible to visitors

### ✅ Issue #5: URL Mismatch - FIXED
**Problem:** Page at `/consulting` but should be `/engagement`
**Fix:**
- Renamed `/app/consulting/` to `/app/engagement/`
- Updated Sidebar navigation link from `/consulting` to `/engagement`
**Result:** URL now matches "Direct Engagement" branding

---

## 📊 CURRENT STATUS

### Dynamic Content Usage (10 of 12 pieces now displayed!)

| Piece | Field Name | Used On | Status |
|-------|-----------|---------|--------|
| 1. News Insight | `newsInsight` | Landing Page | ✅ Working |
| 2. Intelligence Example | `intelligenceExample` | What We Do | ✅ Working |
| 3. Consulting Insight | `consultingInsight` | What We Do | ✅ Working |
| 4. Content Reminder | `contentReminder` | Contact | ✅ Working |
| 5. Market Observation | `marketObservation` | Engagement | ✅ **FIXED** |
| 6. Purpose Context | `purposeContext` | *(unused)* | ⚠️ Unused |
| 7. Service Description | `serviceDescription` | Engagement (Pioneers) | ✅ Working |
| 8. ESI Description | `esiDescription` | Engagement (ESI) | ✅ Working |
| 9. Agency Description | `agencyDescription` | Engagement (Agency) | ✅ Working |
| 10. KSO Description | `ksoDescription` | Engagement (KSO) | ✅ Working |
| 11. Transaction Desc | `transactionDescription` | Engagement (Transaction) | ✅ **FIXED** |
| 12. Triptych Desc | `triptychDescription` | Engagement (Triptych) | ✅ **FIXED** |
| *Pattern Insight* | `patternInsight` | *(unused)* | ⚠️ Unused |

**Coverage:** 10 of 12 generated pieces (83%) now displayed
**Updated Pages:** Landing, What We Do, Engagement, Contact

---

## 🏗️ SYSTEM ARCHITECTURE

### Content Generation Flow

```
┌─────────────────────────────────────────────────────────────┐
│ GITHUB ACTIONS (Every 6 hours)                              │
│ .github/workflows/generate-content.yml                      │
│ • Runs: npm run generate-content                           │
│ • Checks: git diff data/dynamic-content.json               │
│ • Commits: New content to main branch                      │
│ • Triggers: Vercel deployment via webhook                  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ CONTENT GENERATION                                           │
│ scripts/generate-dynamic-content.js                         │
│                                                             │
│ 1. Fetch 9 RSS Feeds:                                      │
│    • BBC News (global)                                     │
│    • NYT (global)                                          │
│    • Fast Company (business)                               │
│    • Forbes (business)                                     │
│    • Marketing Week (business)                             │
│    • Harvard Business Review (leadership)                  │
│    • Wired (leadership)                                    │
│    • Inc (leadership)                                      │
│    • The Atlantic (leadership)                             │
│                                                             │
│ 2. Send to Claude Opus 4.1                                │
│    • Model: claude-opus-4-20250514                         │
│    • Prompt: 535-line detailed prompt                      │
│    • Output: 12 contextually-related pieces                │
│                                                             │
│ 3. Write to: /data/dynamic-content.json ✅                 │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ GITHUB ACTIONS DEPLOYMENT                                    │
│ • Commits new content to repo                               │
│ • Triggers Vercel deployment via $VERCEL_DEPLOY_HOOK       │
│ • Vercel rebuilds with fresh content                       │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ VERCEL PRODUCTION                                            │
│ • Serves fresh content via Next.js App Router               │
│ • Server-side: getDynamicContent() from /lib                │
│ • Client-side: fetch('/api/dynamic-content')               │
│ • Fallback: Hardcoded defaults if cache stale (70+ min)    │
└─────────────────────────────────────────────────────────────┘
```

### Cache File Location (✅ Fixed)

**Single Source of Truth:** `/data/dynamic-content.json`

- ✅ Script writes to: `/data/dynamic-content.json`
- ✅ Server reads from: `/data/dynamic-content.json`
- ✅ API reads from: `/data/dynamic-content.json`

**No more diverging cache files!**

---

## 📄 PAGE IMPLEMENTATIONS

### 1. Landing Page (`/app/page.tsx`)
- **Dynamic Content:** `newsInsight`
- **Display Location:** After main heading "FINALLY. THINKING AS A SERVICE..."
- **Loading:** Server-side via `getDynamicContent()`
- **Revalidation:** `revalidate = 0` (always fresh)
- **Status:** ✅ Working

### 2. What We Do Page (`/app/what/page.tsx`)
- **Dynamic Content:**
  - `intelligenceExample` - After "We believe intelligence lives in questions..."
  - `consultingInsight` - In "Consulting Paradox" section
- **Loading:** Server-side via `getDynamicContent()`
- **Status:** ✅ Working

### 3. Direct Engagement Page (`/app/engagement/page.tsx`) ✅ Updated
- **Dynamic Content:**
  - `marketObservation` - After "Most consultants optimise for resolution" ✅ **NEW**
  - `serviceDescription` - Pioneers of Purpose service
  - `esiDescription` - ESI Framework service
  - `agencyDescription` - Secret Agency service
  - `ksoDescription` - KSO Workshop service
  - `transactionDescription` - Transaction Architecture ✅ **FIXED**
  - `triptychDescription` - Strategic Triptych ✅ **FIXED**
- **Loading:** Client-side components via `fetch('/data/dynamic-content.json')`
- **Status:** ✅ Fully Integrated
- **URL:** Changed from `/consulting` to `/engagement` ✅ **FIXED**

### 4. Contact Page (`/app/contact/page.tsx`)
- **Dynamic Content:** `contentReminder`
- **Display Location:** Callback section referencing previous pages
- **Loading:** Server-side with age checking
- **Staleness Indicator:** Shows if content >15 minutes old
- **Status:** ✅ Working

---

## 🕐 CONTACT PAGE TIMING INTELLIGENCE

The contact page has a sophisticated dual-timing system that personalizes the experience and guides user behavior.

### Two Different Time Checks (Each With Purpose)

**1. 15-Minute Staleness Check** (`contact/page.tsx:10-13`)

```typescript
const isContentStale = content.generated
  ? (new Date().getTime() - new Date(content.generated).getTime()) / 60000 >= 15
  : false;
```

**Purpose:** User behavior guidance - tells visitors when to revisit

**Display Logic:**
- **Fresh (<15 min):** "Still probably the same. Check back in 15."
- **Stale (≥15 min):** "Go back now. They're probably showing something completely different."

**Why This Matters:**
- Encourages repeat engagement with landing/what-we-do pages
- Creates curiosity about what changed
- Makes the dynamic content feel alive and worth checking
- Subtle behavioral nudge that demonstrates "code that thinks"

**2. 48-Hour Cache Validity** (`lib/getDynamicContent.ts:53`)

```typescript
const ageInMinutes = (now.getTime() - generated.getTime()) / 60000;
if (ageInMinutes > 2880) { // 48 hours
  return fallbackContent;
}
```

**Purpose:** System reliability - safety fallback in case GitHub Actions/Vercel systems fail

**Rationale:**
- Generation runs every 6 hours
- 48 hours = 8 failed generation attempts
- This is an emergency fallback only - GitHub and Vercel handle normal content updates
- Prevents serving extremely stale content if systems completely fail

### Personalized Content Reminder System

The contact page references **what the user actually saw**, not the current cache content. This creates a personalized experience that feels intentional, not accidental.

**How It Works:**

**Step 1: Track What User Saw** (`ContentTracker.tsx`)

```typescript
// On Landing & What We Do pages
useEffect(() => {
  if (typeof window !== 'undefined' && !sessionStorage.getItem('userSeenContent')) {
    sessionStorage.setItem('userSeenContent', JSON.stringify({
      newsInsight,           // What they saw on landing
      intelligenceExample,   // What they saw on what-we-do
      timestamp: new Date().toISOString()
    }));
  }
}, [newsInsight, intelligenceExample]);
```

- Saves content to browser `sessionStorage` on first visit
- Only captures ONCE per session (prevents overwriting)
- Includes timestamp for future features

**Step 2: Personalize Contact Page** (`UserContentReminder.tsx`)

```typescript
const storedContent = sessionStorage.getItem('userSeenContent');
if (storedContent) {
  const { newsInsight, intelligenceExample } = JSON.parse(storedContent);

  // Extract first ~50 chars for brief reference
  const newsRef = extractBriefReference(newsInsight);
  const questionRef = extractBriefReference(intelligenceExample);

  setReminder(`Remember how the landing page showed ${newsRef},
               and the What We Do page wondered ${questionRef}?`);
}
```

- Reads what THEY saw from sessionStorage
- Extracts brief snippet (first ~50 chars)
- Creates personalized reminder referencing their specific experience

**Step 3: Fallback for Direct Visitors**

If user lands directly on contact page (no sessionStorage):
- Uses `content.contentReminder` from current cache
- Generated by Claude to reference the current news story
- Still contextual, just not personalized

### Why This System Is Clever

**1. Temporal Accuracy**
- If content updates while user browses, reminder stays accurate
- Shows what THEY saw, not what's current
- Prevents confusing "I don't remember seeing that" moments

**2. Behavioral Psychology**
- Proves the content is actually dynamic
- Creates "wait, it tracks what I saw?" moment
- Demonstrates the sophistication of the system
- Makes the sales pitch ("Want this on your site?") more credible

**3. Graceful Degradation**
- Works perfectly if user follows landing → what-we-do → contact path
- Works fine if user skips pages (uses fallback)
- Handles direct contact page visits without breaking

**4. Session-Based (Not Cookie-Based)**
- Privacy-friendly (no tracking across sessions)
- Clears when browser closes
- No consent banners needed
- Perfect for single-session browsing behavior

### Files Involved

| File | Purpose | What It Does |
|------|---------|-------------|
| `app/page.tsx` | Landing page tracker | Includes `<ContentTracker>` component |
| `app/what/page.tsx` | What-we-do tracker | Includes `<ContentTracker>` component |
| `components/ContentTracker.tsx` | Storage logic | Saves content to sessionStorage on first visit |
| `app/contact/page.tsx` | Display & timing | 15-min staleness check + reminder display |
| `components/UserContentReminder.tsx` | Personalization | Reads sessionStorage, creates personalized message |
| `lib/getDynamicContent.ts` | System fallback | 70-min cache validity check |

### Example User Journey

**Scenario 1: Normal Flow**
1. User lands on homepage at 10:00 AM
   - Sees: "Tesla just slashed prices 20%..."
   - ContentTracker saves to sessionStorage
2. Navigates to What We Do at 10:03 AM
   - Sees: "The Tesla price cuts, for example..."
   - ContentTracker has already saved (doesn't overwrite)
3. Navigates to Contact at 10:05 AM
   - Reminder: "Remember how the landing page showed Tesla just slashed prices..."
   - Staleness check: Fresh (<15 min) → "Still probably the same. Check back in 15."

**Scenario 2: Content Updates Mid-Browse**
1. User lands on homepage at 10:00 AM
   - Sees Story A about Tesla
   - ContentTracker saves Story A
2. At 10:15 AM: GitHub Actions generates new content (Story B about unemployment)
3. User navigates to Contact at 10:20 AM
   - Reminder: Still shows Story A (what THEY saw)
   - Staleness check: Stale (≥15 min) → "Go back now. They're probably showing something completely different."
4. User goes back, sees Story B
   - Proof that it actually changed
   - Increases trust in system

**Scenario 3: Direct to Contact**
1. User lands directly on contact page
   - No sessionStorage exists
   - Falls back to `content.contentReminder` from current cache
   - Still shows contextual dynamic content, just not personalized

### Monitoring Timing Accuracy

**Check content freshness:**
```bash
# View current cache timestamp
cat data/dynamic-content.json | jq '.generated'

# Calculate age in minutes
node -e "console.log((Date.now() - new Date('$(cat data/dynamic-content.json | jq -r .generated)').getTime()) / 60000, 'minutes old')"
```

**Test staleness display:**
1. Visit contact page within 15 min of generation → see "Still probably the same"
2. Visit after 15+ min → see "Go back now"
3. Check if cached timestamp matches server timestamp

**Test personalization:**
1. Open browser devtools → Application → Session Storage
2. Visit landing page → verify `userSeenContent` stored
3. Visit contact page → verify reminder uses stored content
4. Clear sessionStorage → verify fallback works

---

## 🧩 DYNAMIC COMPONENTS

### Active Components (All Working ✅)

| Component | Loads Field | Used On | Status |
|-----------|------------|---------|--------|
| `DynamicServiceDescription` | `serviceDescription` | Engagement | ✅ Working |
| `DynamicESIDescription` | `esiDescription` | Engagement | ✅ Working |
| `DynamicAgencyDescription` | `agencyDescription` | Engagement | ✅ Working |
| `DynamicKSODescription` | `ksoDescription` | Engagement | ✅ Working |
| `DynamicTransactionDescription` | `transactionDescription` | Engagement | ✅ **FIXED** |
| `DynamicTriptychDescription` | `triptychDescription` | Engagement | ✅ **FIXED** |
| `InlineObservation` | `marketObservation` | Engagement | ✅ **FIXED** |

### Component Implementation Pattern

All components follow this structure:

```typescript
'use client';

export default function DynamicComponentName() {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/data/dynamic-content.json');
        const data = await response.json();
        if (data.content?.fieldName) {
          setContent(data.content.fieldName);
        }
      } catch (error) {
        setContent("Fallback content...");
      }
    }
    loadContent();
  }, []);

  if (!content) return null;
  return <>{content}</>;
}
```

---

## 📝 CONTENT GENERATION PROMPT

**File:** `scripts/content-generation-prompt.md` (535 lines)

### Prompt Structure

1. **British English Rules** - Uses -ise, -our, -re, etc.
2. **Source Selection Guide** - Maps headlines to specific pieces
3. **12 Piece Specifications:**
   - PIECE 1: News Insight (landing page)
   - PIECE 2: Intelligence Example (callback to same news)
   - PIECE 3: Consulting Insight (HBR-based)
   - PIECE 4: Content Reminder (cross-page callback)
   - PIECE 5: Market Observation (premium positioning)
   - PIECE 6: Purpose Context (inline in service description)
   - PIECE 7-12: Six service descriptions with news hooks

### Key Rules
- **NO DASHES** - Uses periods/commas instead
- **Conversational Tone** - Like texting a CEO friend
- **Coherence** - Pieces 1, 2, 4, 5, 6 reference same news story
- **Guardrails** - Avoids war, sexual assault, Trump/Biden, culture wars

### News Selection Strategy
- **Global News (BBC, NYT):** Pieces 1-2 (landing/what-we-do)
- **Business News (Fast Co, Forbes, Marketing Week):** Pieces 7-8, 10-12
- **Leadership News (Wired, Inc, Atlantic):** Piece 9 (Secret Agency)
- **HBR:** Piece 3 (consulting insight)

---

## 🔄 GITHUB ACTIONS WORKFLOW

**File:** `.github/workflows/generate-content.yml`

### Workflow Configuration

```yaml
name: Generate Dynamic Content

on:
  schedule:
    - cron: '0 */6 * * *'   # Every 6 hours
  workflow_dispatch:         # Manual trigger available

jobs:
  generate-content:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js 20
      - Install dependencies (npm ci)
      - Generate content (npm run generate-content)
      - Check if data/dynamic-content.json changed
      - If changed:
          - Commit to main branch
          - Trigger Vercel deployment via webhook
```

### Environment Secrets Required
- `ANTHROPIC_API_KEY` - Claude API access
- `VERCEL_DEPLOY_HOOK` - Webhook URL for triggering deployments

### Workflow Logic
1. Runs every 6 hours automatically
2. Generates fresh content using Claude
3. Only commits if content actually changed
4. Triggers Vercel rebuild when new content committed
5. Reports success/failure with timestamps

---

## 🛡️ ERROR HANDLING & FALLBACKS

### Three Levels of Protection

**Level 1: Generation Failure**
```javascript
// In scripts/generate-dynamic-content.js
catch (error) {
  const fallback = {
    newsInsight: "Notice how every CEO says...",
    // ... all 12 fields with safe defaults
    fallbackUsed: true
  };
  fs.writeFileSync(filePath, JSON.stringify(fallback));
}
```

**Level 2: Cache Miss or Stale Cache**
```typescript
// In lib/getDynamicContent.ts
const ageInMinutes = (now - generated) / 60000;
if (!fs.existsSync(dataPath) || ageInMinutes > 2880) { // 48 hours
  return fallbackContent;  // Hardcoded defaults
}
```

**Level 3: Component Fetch Failure**
```typescript
// In components/Dynamic*.tsx
catch (error) {
  setContent("Fallback text specific to this component...");
}
```

### Cache Validity
- **Generation Interval:** Every 6 hours
- **Cache Validity:** 48 hours (6 hours × 8 attempts)
- **Rationale:** Emergency fallback only - GitHub Actions and Vercel handle normal updates

---

## 🔧 ENVIRONMENT SETUP

### Required Environment Variables

**File:** `.env.local`

```bash
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
RESEND_API_KEY=re_xxxxx               # For contact form
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=ray@prismaticalab.com
```

### Package Dependencies

```json
{
  "@anthropic-ai/sdk": "^0.68.0",    // Claude API
  "rss-parser": "^3.13.0",           // RSS feed parsing
  "next": "16.0.1",                   // App framework
  "react": "19.2.0"                   // UI library
}
```

### NPM Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "generate-content": "node scripts/generate-dynamic-content.js"
}
```

---

## 📈 MONITORING & DEBUGGING

### Check Generation Status

**Local Development:**
```bash
# Generate content manually
npm run generate-content

# Check cache file
cat data/dynamic-content.json | jq '.generated'

# Check if content is stale
node -e "console.log((Date.now() - new Date('$(cat data/dynamic-content.json | jq -r .generated)').getTime()) / 60000, 'minutes old')"
```

**GitHub Actions:**
- Go to: https://github.com/{your-org}/{your-repo}/actions
- Check "Generate Dynamic Content" workflow runs
- View logs for generation success/failure

**Vercel Deployments:**
- Go to: https://vercel.com/{your-team}/{your-project}
- Check deployment logs
- Verify webhook triggers from GitHub Actions

### Common Issues & Solutions

**Issue:** Content not updating
- ✅ Check GitHub Actions is running successfully
- ✅ Verify `data/dynamic-content.json` file exists
- ✅ Check file modified time is recent
- ✅ Ensure Vercel deployment triggered after commit

**Issue:** Seeing placeholder content
- ✅ Verify cache file location is `/data/` not `/public/data/` ✅ **FIXED**
- ✅ Check cache file age (must be <70 minutes old)
- ✅ Ensure components are imported and used ✅ **FIXED**

**Issue:** GitHub Actions failing
- ✅ Check `ANTHROPIC_API_KEY` secret is set
- ✅ Verify RSS feeds are accessible
- ✅ Review action logs for specific error

---

## 🎯 BEST PRACTICES

### Content Generation
- ✅ Always use British English spelling
- ✅ Reference globally recognizable news stories
- ✅ Maintain coherence across all 12 pieces
- ✅ Avoid controversial topics (see prompt guidelines)
- ✅ Keep tone conversational and sharp

### Caching Strategy
- ✅ Single cache location: `/data/dynamic-content.json` ✅ **FIXED**
- ✅ 48-hour validity window (emergency fallback for system failures)
- ✅ Always provide fallback content
- ✅ Track generation metadata (timestamp, sources, model)

### Deployment Flow
- ✅ GitHub Actions → Generate → Commit → Trigger Vercel
- ✅ Never commit if content unchanged (saves deployments)
- ✅ Use `[skip ci]` in commit message to prevent recursion
- ✅ Monitor both GitHub Actions AND Vercel for issues

---

## 📚 FILE REFERENCE

### Key Files

| File | Purpose | Status |
|------|---------|--------|
| `scripts/generate-dynamic-content.js` | Main generation script | ✅ Fixed |
| `scripts/content-generation-prompt.md` | Claude prompt (535 lines) | ✅ Working |
| `.github/workflows/generate-content.yml` | GitHub Actions workflow | ✅ Working |
| `lib/getDynamicContent.ts` | Server-side content loader | ✅ Working |
| `app/api/dynamic-content/route.ts` | API endpoint for client components | ✅ Working |
| `data/dynamic-content.json` | Content cache (single source) | ✅ Fixed |
| `components/Dynamic*.tsx` | Client-side components (7 total) | ✅ All integrated |

### Page Files

| Page | File | Dynamic Content |
|------|------|----------------|
| Landing | `app/page.tsx` | newsInsight |
| What We Do | `app/what/page.tsx` | intelligenceExample, consultingInsight |
| Engagement | `app/engagement/page.tsx` | 7 fields ✅ **Updated** |
| Contact | `app/contact/page.tsx` | contentReminder |

---

## ✅ SYSTEM HEALTH CHECKLIST

Use this checklist to verify the system is fully operational:

- [x] Cache location consistent (`/data/` everywhere) ✅ **FIXED**
- [x] GitHub Actions workflow enabled and running
- [x] `ANTHROPIC_API_KEY` secret configured in GitHub
- [x] `VERCEL_DEPLOY_HOOK` secret configured in GitHub
- [x] All RSS feeds accessible (9 sources)
- [x] All 7 dynamic components imported and used ✅ **FIXED**
- [x] URL changed from `/consulting` to `/engagement` ✅ **FIXED**
- [x] InlineObservation loading correct field ✅ **FIXED**
- [x] Transaction & Triptych using dynamic components ✅ **FIXED**
- [x] Fallback content defined for all 12 fields
- [x] Cache validity set to 70 minutes
- [x] Generation metadata tracked

**System Status: 🟢 FULLY OPERATIONAL**

---

## 🚀 FUTURE ENHANCEMENTS

### Potential Improvements

1. **Edge Config Integration**
   - Move from file-based cache to Vercel Edge Config
   - Provides global CDN caching
   - Faster content delivery

2. **Content Monitoring Dashboard**
   - `/api/content-status` endpoint
   - Shows cache age, generation history, RSS feed health
   - Admin UI for manual regeneration

3. **A/B Testing**
   - Generate multiple variations
   - Track which content performs better
   - Optimize prompt based on engagement

4. **Semantic Versioning**
   - Version each content generation
   - Allow rollback to previous versions
   - Track content evolution over time

5. **Multi-Language Support**
   - Generate content in multiple languages
   - Use URL-based locale detection
   - British English, American English, etc.

---

## 📞 SUPPORT & MAINTENANCE

### Regular Maintenance Tasks

**Weekly:**
- Review GitHub Actions logs for failures
- Check content freshness across all pages
- Verify RSS feeds still accessible

**Monthly:**
- Review fallback content relevance
- Update prompt if needed
- Check Claude API usage and costs

**Quarterly:**
- Evaluate content quality and coherence
- Consider prompt improvements
- Review system performance metrics

### Getting Help

**System Issues:**
- Check this guide first
- Review GitHub Actions logs
- Verify environment variables

**Content Quality Issues:**
- Review `scripts/content-generation-prompt.md`
- Check which RSS feeds were used
- Verify news story selections

**Deployment Issues:**
- Check Vercel deployment logs
- Verify webhook triggers
- Ensure cache file committed to git

---

## 🎉 SUMMARY

The Prismatica dynamic content system is now **fully operational** with all architectural issues resolved:

✅ **10 of 12 pieces actively displayed** across 4 pages
✅ **Single cache location** (`/data/`) eliminates inconsistencies
✅ **All dynamic components integrated** into engagement page
✅ **URL updated** from `/consulting` to `/engagement`
✅ **GitHub Actions workflow** running every 15 minutes
✅ **Vercel deployments** triggered automatically on content changes

**The system successfully:**
- Generates fresh content every 15 minutes using Claude Opus 4.1
- Analyzes 9 news sources across global, business, and leadership categories
- Creates 12 contextually-related pieces with narrative coherence
- Provides 3 levels of fallback protection for reliability
- Delivers news-driven content that keeps the site feeling current

**Content Flow:**
RSS Feeds → Claude → Cache → GitHub → Vercel → Visitors see fresh insights!
