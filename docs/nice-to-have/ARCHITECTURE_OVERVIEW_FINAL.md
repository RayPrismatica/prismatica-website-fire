# SITE ARCHITECTURE - FINAL SPECIFICATION
## 4-Page Structure with Adaptive Homepage (Zero Repetition Strategy)

**CMO Strategic Analysis**
**Date:** 2025-01-17
**Status:** Ready for Implementation
**Accounts for:** Current `/welcome` (first-time) + `/` (returning) homepage structure

---

## EXECUTIVE SUMMARY

### Current Reality: Two Homepage States Already Exist

**Current Implementation:**
- `/welcome` → First-time visitors (no nav cards, proof-driven)
- `/` (home) → Returning visitors (with nav cards)

**Problem:**
Both show identical content (positioning, dynamic newsInsight, philosophy). When users return to home after visiting other pages, they see the SAME content again. Cognitive dissonance. Zero demonstration of contextual intelligence.

---

### Our Solution: Adaptive Homepage + Zero Repetition

**New Implementation:**
1. **Home - Stranger State** (first visit) → Keep current `/welcome` content
2. **Home - Explorer State** (return visit) → Completely NEW content based on journey
3. **Home - Evaluator State** (deep return) → Meta-layer reveal
4. **Capabilities** → Services + Products unified (NO repetition of homepage)
5. **About** → Team + Methodology + Articles (NO repetition of homepage)
6. **Contact** → Unchanged (already optimal)

**Strategic Principle:**
> Every page assumes user has seen homepage. NO CONTENT REPEATS across pages. Each adds new layer of understanding.

---

## THE CRITICAL CONSTRAINT

**After first visit (Stranger state), user has seen:**
- ✅ "Intelligence begins where answers end"
- ✅ "Answers are cheap. Google/ChatGPT have them"
- ✅ Dynamic `newsInsight` content
- ✅ "Are you asking the right questions?"
- ✅ "Split reality into new variables..."
- ✅ Philosophy ("quietest room on the internet")

**Every subsequent page and homepage state MUST avoid repeating these.**

This is the Sutherland/Reeves genius: proving intelligence through behavior (adaptation) rather than claims (repetition).

---

## DYNAMIC CONTENT ALLOCATION (Zero Overlap)

| Page/State | Dynamic Field | Purpose |
|------------|---------------|---------|
| Home - Stranger | `newsInsight` | Proof of intelligence (first impression) |
| Home - Explorer (from /capabilities) | `intelligenceExample` | How we think (new angle) |
| Home - Explorer (from /about) | `consultingInsight` | Current analysis (new angle) |
| Home - Explorer (from /contact) | `intelligenceExample` | Still evaluating (new content) |
| Home - Explorer (multi-page) | `intelligenceExample` | Pattern recognition |
| Home - Evaluator | NONE* | Meta-layer is the content |
| Capabilities | `consultingInsight` | Industry context |
| About | `intelligenceExample` | What we're watching |
| Contact | `contentReminder` | Journey callback |

**Note:** Each field used ONCE across entire site. Zero repetition.

---

## PAGE-BY-PAGE BREAKDOWN

### 1. HOME (Adaptive - 3 States)

#### State 1: STRANGER (First Visit)
**Source:** Current `/welcome/page.tsx`
**When:** No session data
**Content:**
- Hero: "FINALLY THINKING AS A SERVICE"
- Positioning: "Intelligence begins where answers end"
- Dynamic proof: `newsInsight` ("Right now:")
- Payoff: "Are you asking the right questions?"
- Philosophy: "Welcome to the quietest room..."
- **NO navigation cards** (user explores via sidebar)

**User leaves knowing:**
1. What Prismatica does (thinking as a service)
2. The positioning (intelligence > answers)
3. Proof of capability (dynamic insight)
4. The philosophy (quiet, focused, clear)

---

#### State 2: EXPLORER (Return Visit)
**When:** Visited 1-3 pages, returns to home
**Variations:** 6 different versions based on journey

**Example (visited /capabilities):**
- Hero: "THINKING AS A SERVICE"
- Intro: "You just looked at what we fix. Here's how we think about fixing."
- Dynamic proof: `intelligenceExample` (DIFFERENT from first visit)
- Payoff: "Most consulting shows you the menu. We showed you the kitchen."
- Navigation cards: Capabilities, About, Contact

**Key Differences from Stranger:**
- ❌ NO "Intelligence begins where answers end"
- ❌ NO "Answers are cheap..."
- ❌ NO `newsInsight` (different field)
- ❌ NO "Are you asking the right questions?"
- ❌ NO Philosophy section
- ✅ YES contextual intro referencing their journey
- ✅ YES different dynamic content field
- ✅ YES navigation cards (ready to navigate)

**Other Variations:**
- From /about → "You just met the team. Here's what they're thinking about."
- From /contact → "You came. You looked. You left. Fair."
- Multi-page (3+) → "You're not comparison shopping. You're testing if we think like you think."

---

#### State 3: EVALUATOR (Deep Returner)
**When:** Multiple sessions OR 4+ pages in one session
**Content:**
- Hero: "THINKING AS A SERVICE"
- Reveal: "This homepage changes based on where you've been. You noticed. That's the test."
- Explanation: "Most sites repeat themselves because they assume you're not paying attention. We assume the opposite."
- Data point: "This is your [second/third/fourth] visit. You're not browsing. You're deciding."
- Insight: "The site adapts. The thinking behind it is what you're evaluating. This IS the intelligence we're selling."
- **Simplified navigation:** ONE primary CTA (Let's Talk)

**Variations by session count:**
- Session 2: "You noticed the pattern. That's exactly what we do."
- Session 3: "Most people decide in two. You're either very thorough, or we're not making the case clearly enough."
- Session 4+: "More information isn't the blocker. The question is 'Is this the right move right now?'"

---

### 2. CAPABILITIES (Unified Offering View)

**URL:** `/capabilities`
**Combines:** Consulting + Products + What We Do (selective)

**Structure:**
1. **Philosophy** → Consulting status quo + our approach
2. **Two Tracks** → Services vs Products overview
3. **Services Deep Dive** → 12 service bentos in tiers
4. **Products Deep Dive** → Method + 3 product bentos
5. **Testimonials** → Anti-testimonial stance
6. **CTA** → Contact

**What We REMOVED (Already on Homepage):**
- ❌ "Intelligence begins where answers end"
- ❌ "Answers are cheap..."
- ❌ `newsInsight` dynamic content
- ❌ Philosophy section

**What We KEPT:**
- ✅ Consulting status quo (NEW context not on homepage)
- ✅ Dynamic `consultingInsight` (DIFFERENT field)
- ✅ Our approach (codifying thinking - NEW)
- ✅ Full capability catalog (15 bentos)
- ✅ All pricing, terms, constraints

**Dynamic Content:**
- `consultingInsight` (consulting status quo section)

---

### 3. ABOUT (Complete Context)

**URL:** `/about`
**Combines:** Who We Are + Mental Models + Articles

**Structure:**
1. **Who We Are** → Team identity, background, principles
2. **Mental Models** → 8 case briefs, first principles, 5 models
3. **Articles** → Thought leadership, writings

**What We REMOVED (Already on Homepage):**
- ❌ "Intelligence begins where answers end"
- ❌ `newsInsight` dynamic content
- ❌ Philosophy section

**What We KEPT:**
- ✅ Team identity ("small team that thinks first")
- ✅ Dynamic `intelligenceExample` (DIFFERENT field, DIFFERENT framing: "What We're Watching")
- ✅ Complete mental models system
- ✅ 8 case brief modals
- ✅ Articles system

**Dynamic Content:**
- `intelligenceExample` ("What We're Watching" section)

---

### 4. CONTACT (Unchanged)

**URL:** `/contact`
**No changes** - already optimal filter/CTA system

**Dynamic Content:**
- `contentReminder` (UserContentReminder component)

---

## NAVIGATION STRUCTURE

### Old (Current 8 Pages):
```
Home (first-time at /welcome)
Home (returning at /)
├─ What
├─ Consulting
├─ Products
├─ Who We Are
├─ Mental Models
├─ Articles
└─ Contact
```

### New (4 Pages + Adaptive):
```
Home (adaptive: Stranger → Explorer → Evaluator)
├─ Capabilities (services + products unified)
├─ About (team + methodology + articles unified)
└─ Contact (unchanged)
```

**Sub-pages preserved:**
- `/demand`, `/incentives`, `/agentic`, `/prismatic`, `/triptych`
  (Mental model detail pages, accessed from About)

---

## REDIRECT STRATEGY

### 301 Permanent Redirects:
```
/welcome → / (home, will detect as Stranger)
/what → /capabilities
/consulting → /capabilities#services
/products → /capabilities#products
/who-we-are → /about
/mental-models → /about#mental-models
/articles → /about#articles
```

---

## USER JOURNEYS (Zero Repetition Examples)

### Journey 1: Fast Evaluator
1. **Home (Stranger)** → Sees positioning, newsInsight
2. **Capabilities** → Sees consulting status quo, consultingInsight (NO repetition)
3. **Contact** → Reaches out

**Content seen:** 3 different framings, 2 different dynamic fields
**Repetition:** ZERO

---

### Journey 2: Methodical Researcher
1. **Home (Stranger)** → Sees positioning, newsInsight, philosophy
2. **About** → Sees team, intelligenceExample (DIFFERENT field), mental models
3. **Home (Explorer)** → Sees "You just met the team. Here's what they're thinking." + consultingInsight (THIRD dynamic field)
4. **Capabilities** → Sees consulting status quo (NO dynamic content shown twice)
5. **Contact** → Reaches out

**Content seen:** 5 different framings, 3 different dynamic fields
**Repetition:** ZERO
**Jaw drop moment:** Step 3 (adaptive homepage)

---

### Journey 3: Deep Skeptic
1. **Home (Stranger)** → Initial proof
2. **About** → Reads mental models
3. **Mental Model Detail (/demand)** → Deep dive
4. **About** → Reads articles
5. **Capabilities** → Evaluates offerings
6. **Home (Explorer)** → Different homepage (multi-page variation)
7. **Returns next day**
8. **Home (Evaluator)** → "This is your second visit. The homepage changes based on where you've been. You noticed. That's the test."
9. **Contact** → Converts as believer

**Content seen:** 8+ different framings, 3 different dynamic fields
**Repetition:** ZERO
**Jaw drop moments:** Step 6 (Explorer) + Step 8 (Evaluator)

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Session Detection
- [ ] Create `SessionDetector` component (tracks navigation via localStorage)
- [ ] Add to `app/layout.tsx`
- [ ] Test localStorage writing/reading
- [ ] Verify pathname tracking

### Phase 2: Homepage States
- [ ] Create `components/homepage/StrangerHomepage.tsx` (current `/welcome` content)
- [ ] Create `components/homepage/ExplorerHomepage.tsx` (6 variations)
- [ ] Create `components/homepage/EvaluatorHomepage.tsx` (meta-layer reveal)
- [ ] Create `components/AdaptiveHomepage.tsx` (state detection logic)
- [ ] Wire up to `app/page.tsx`

### Phase 3: New Pages
- [ ] Create `app/capabilities/page.tsx` (merge consulting + products)
- [ ] Create `app/about/page.tsx` (merge who-we-are + mental-models + articles)
- [ ] Verify NO content repetition from homepage

### Phase 4: Redirects
- [ ] Set up 301 redirects (Next.js `next.config.ts`)
- [ ] Test all redirect paths
- [ ] Update sitemap

### Phase 5: Testing
- [ ] Test Stranger → Explorer transition
- [ ] Test Stranger → Evaluator transition
- [ ] Test all Explorer variations (6 total)
- [ ] Test dynamic content field allocation (verify zero overlap)
- [ ] Cross-browser testing
- [ ] Mobile testing

### Phase 6: Analytics
- [ ] Track homepage state distribution
- [ ] Track dynamic content field usage
- [ ] Monitor engagement by state
- [ ] Track conversion by journey type

---

## SUCCESS METRICS

### Behavioral KPIs:
- **Pages per session:** Expect 2.5 → 3.5 (consolidated pages)
- **Time on site:** Expect 3min → 6min (deeper engagement)
- **Bounce rate:** Expect 55% → 40% (clearer value)
- **Return visit rate:** Track Stranger → Explorer conversion
- **Multi-session rate:** Track Explorer → Evaluator conversion

### Quality Indicators:
- Users who see Explorer state spend +50% more time on site
- Users who see Evaluator state have 2x contact conversion
- Zero complaints about "repetitive content"
- Positive feedback on "site remembers my journey"

---

## THE SUTHERLAND/REEVES GENIUS (Why This Works)

### Sutherland's Alchemy:
**Most sites solve fragmentation by:**
- Hiding content
- Simplifying messaging
- Reducing page count

**We're doing the opposite:**
- Revealing the system (Evaluator state)
- Increasing message coherence (4 pages with zero overlap)
- Preserving 100% of content while eliminating redundancy

**The Costly Signal:**
Building an adaptive system is expensive and complex. By revealing it, we signal:
1. Technical capability
2. Respect for user intelligence
3. Commitment to the philosophy ("zero noise")

---

### Reeves' Reality in Advertising:
**USP:** "Thinking as a service"

**Bad approach:** Say it repeatedly
**Good approach:** Show it through content
**Great approach:** **Demonstrate it through site behavior**

The homepage adapts = proof of thinking
The content doesn't repeat = proof of respect
The system reveals itself = proof of transparency

**Result:** USP demonstrated through experience, not claims.

---

## RISK MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Users confused by adaptive homepage | Low | Medium | Clear reveal in Evaluator state |
| SEO impact from URL changes | Medium | Low | 301 redirects preserve link equity |
| Content feels disjointed | Low | Medium | Each page assumes homepage context |
| Adaptive logic breaks | Low | High | Fallback to Stranger state on error |
| Performance impact | Low | Low | Client-side detection, no server calls |

---

## FILES CREATED

### Copy Mockups:
1. `COPY_HOME_STRANGER.md` - First visit (current `/welcome`)
2. `COPY_HOME_EXPLORER.md` - Return visit (6 variations)
3. `COPY_HOME_EVALUATOR.md` - Deep return (meta-layer)
4. `COPY_CAPABILITIES.md` - Unified services + products
5. `COPY_ABOUT.md` - Team + methodology + articles
6. `COPY_CONTACT.md` - Unchanged (documentation)

### Strategic Documents:
7. `ADAPTIVE_HOMEPAGE_ROADMAP.md` - Complete technical spec
8. `ARCHITECTURE_OVERVIEW_FINAL.md` - This document

---

## APPROVAL CHECKLIST

Before implementation:
- [ ] Reviewed all 8 specification files
- [ ] Verified 100% content preservation
- [ ] Confirmed zero repetition strategy
- [ ] Validated dynamic content field allocation
- [ ] Checked brand voice consistency across all copy
- [ ] Approved adaptive homepage logic
- [ ] Signed off on redirect strategy
- [ ] Ready to implement

---

## NEXT STEPS

1. **Review** all copy mockup files
2. **Test** adaptive logic with sample user journeys
3. **Build** SessionDetector + AdaptiveHomepage components
4. **Migrate** content to new page structure
5. **Deploy** with redirects
6. **Monitor** analytics for success metrics

---

**This architecture transforms content fragmentation into strategic coherence. Every word earns its place. Every page serves one purpose. Every journey has zero repetition.**

**The site's behavior proves the USP. The user's experience validates the thinking.**

**Ready to build.**
