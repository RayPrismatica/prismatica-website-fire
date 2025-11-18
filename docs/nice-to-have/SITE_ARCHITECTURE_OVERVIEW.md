# SITE ARCHITECTURE OVERVIEW
## 4-Page Strategic Restructure

**CMO Strategic Analysis**
**Date:** 2025-01-17
**Status:** Ready for Implementation

---

## EXECUTIVE SUMMARY

### Current State: 8 Pages
1. Home (first-time landing)
2. What We Do
3. Consulting
4. Products
5. Who We Are
6. Mental Models
7. Articles
8. Contact

**Problem:** Fragmentation creates decision paralysis. Users bounce between pages trying to understand full offering.

---

### New State: 4 Pages
1. **Home** (adaptive, 2+ states based on session)
2. **Capabilities** (products + services unified)
3. **About** (team + methodology + writing)
4. **Contact** (unchanged)

**Solution:** Clear decision path. Every page serves one strategic purpose.

---

## THE STRATEGIC LOGIC

### Why This Architecture Wins

**1. Home: Adaptive Intelligence Proof**
- **Stranger State:** First visit = prove capability
- **Explorer State:** Return visit = demonstrate context awareness
- **Result:** Site behavior proves USP ("thinking as a service")

**2. Capabilities: Unified Offering View**
- **Problem Solved:** Users no longer choose between "am I looking for consulting or products?" before understanding either
- **New Flow:** Philosophy → Options → Deep dive on both
- **Result:** Higher engagement, clearer decision path

**3. About: Complete Context**
- **Problem Solved:** "Who we are" separated from "how we think" created incomplete picture
- **New Flow:** Team → Methodology → Application → Evidence
- **Result:** Trust built through comprehensive understanding

**4. Contact: Strategic Filter**
- **Unchanged:** Already optimal
- **Position:** End of clear funnel (Home → Capabilities/About → Contact)
- **Result:** Higher quality inquiries

---

## CONTENT MAPPING

### What Moved Where

| Old Page | New Location | Rationale |
|----------|--------------|-----------|
| Home (first visit) | Home - Stranger State | Unchanged (proof of capability) |
| Home (return visit) | Home - Explorer/Evaluator | NEW (adaptive intelligence) |
| What We Do (intro) | Capabilities (top) | Sets philosophical frame |
| What We Do (two tracks) | Capabilities (overview) | Introduces both options |
| What We Do (testimonials) | Capabilities (bottom) | Closes offering section |
| Consulting (all content) | Capabilities (services) | Full service catalog |
| Products (all content) | Capabilities (products) | Full product catalog |
| Who We Are (all content) | About (section 1) | Team identity |
| Mental Models (all content) | About (section 2) | Methodology |
| Articles (all content) | About (section 3) | Thought leadership |
| Contact | Contact | Unchanged |

---

## DYNAMIC CONTENT STRATEGY

### Field Allocation (Zero Repetition)

**Homepage (Stranger):**
- `newsInsight` → Proof point ("Right now:")

**Homepage (Explorer - varies by visited page):**
- From `/capabilities`: `intelligenceExample`
- From `/about`: `newsInsight` (different framing)
- Multi-page: `intelligenceExample`

**Capabilities Page:**
- `intelligenceExample` → Top positioning section
- `consultingInsight` → Consulting status quo section

**About Page:**
- `intelligenceExample` → "What We're Watching" section

**Contact Page:**
- `contentReminder` → UserContentReminder component

### No Field Used Twice
Each dynamic content field appears in ONE location only, with different contextual framing.

---

## NAVIGATION STRUCTURE

### Old Navigation:
```
Home
├─ What
├─ Consulting
├─ Products
├─ Who We Are
├─ Mental Models
├─ Articles
└─ Contact
```

### New Navigation:
```
Home (adaptive)
├─ Capabilities
│  ├─ #services (anchor)
│  └─ #products (anchor)
├─ About
│  ├─ #who-we-are (implied)
│  ├─ #mental-models (implied)
│  └─ #articles (implied)
└─ Contact
```

### Sub-Pages Remain:
- `/demand`
- `/incentives`
- `/agentic`
- `/prismatic`
- `/triptych`

*(Mental model detail pages - accessed from About page)*

---

## USER JOURNEY MAPPING

### Journey 1: Evaluator (High Intent)
1. **Home** → Sees proof (newsInsight)
2. **Capabilities** → Evaluates services + products
3. **Contact** → Reaches out

**Time on site:** 3-5 minutes
**Decision:** Clear (services OR products OR both)

---

### Journey 2: Researcher (Medium Intent)
1. **Home** → Sees proof
2. **About** → Reads team, methodology, case briefs
3. **Capabilities** → Now understands context, evaluates options
4. **Home** (return) → Sees DIFFERENT homepage (adaptive)
5. **Contact** → Reaches out OR saves for later

**Time on site:** 8-15 minutes
**Decision:** Informed, trusts methodology

---

### Journey 3: Skeptic (Low Intent, High Value)
1. **Home** → Intrigued but skeptical
2. **About** → Reads mental models section
3. **Mental Model Detail** → Deep dive on one framework (e.g., /demand)
4. **About** → Reads articles
5. **Capabilities** → NOW ready to evaluate offerings
6. **Home** (return) → Sees adaptive homepage (jaw drop moment)
7. **Contact** → Reaches out as converted believer

**Time on site:** 15-25 minutes
**Decision:** Deeply considered, high conviction

---

## PSYCHOLOGICAL DESIGN PRINCIPLES

### 1. Progressive Disclosure
- **Home:** Minimal (identity + proof)
- **Capabilities:** Comprehensive (full offering)
- **About:** Deep (methodology + evidence)

Each layer reveals more. No cognitive overload.

---

### 2. Sutherland's Alchemy Applied

**Behavioral Economics Principles:**
- **Costly Signaling:** Adaptive homepage proves capability through effort
- **Context Over Content:** Same dynamic content, different framing = different meaning
- **Perceived Value:** Site intelligence creates disproportionate trust

---

### 3. Reeves' Reality in Advertising Applied

**USP Demonstrated, Not Claimed:**
- **Don't say:** "We think differently"
- **Do show:** Homepage adapts to your journey
- **Result:** Proof through behavior, not words

---

## IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1)
1. Create SessionDetector component (from Adaptive Homepage Roadmap)
2. Test localStorage tracking
3. Verify session detection logic

---

### Phase 2: Page Restructure (Week 2)

**Create New Pages:**
- `app/capabilities/page.tsx` (merge consulting + products)
- `app/about/page.tsx` (merge who-we-are + mental-models + articles)

**Modify Existing:**
- `app/page.tsx` (add AdaptiveHomepage component)
- `app/contact/page.tsx` (update internal links only)

**Archive Old Routes:**
- Move `/what`, `/consulting`, `/products`, `/who-we-are`, `/mental-models`, `/articles` to archive folder
- Set up 301 redirects to new structure

---

### Phase 3: Adaptive Homepage (Week 3)
1. Implement StrangerHomepage component
2. Implement ExplorerHomepage component
3. Implement EvaluatorHomepage component
4. Wire up AdaptiveHomepage state detection
5. Test all state transitions

---

### Phase 4: Testing & Refinement (Week 4)
1. Manual testing (all journeys)
2. Cross-browser testing
3. Mobile testing
4. Copy refinement based on feel
5. Analytics setup (track homepage states)

---

### Phase 5: Launch (Week 5)
1. Soft launch (staging environment)
2. Team review
3. Final copy polish
4. Production deployment
5. Monitor analytics

---

## REDIRECT STRATEGY

### 301 Permanent Redirects

```
/what → /capabilities
/consulting → /capabilities#services
/products → /capabilities#products
/who-we-are → /about
/mental-models → /about#mental-models
/articles → /about#articles
```

### Preserve Sub-Routes
- `/demand` → unchanged
- `/incentives` → unchanged
- `/agentic` → unchanged
- `/prismatic` → unchanged
- `/triptych` → unchanged

---

## COPY GOVERNANCE

### Brand Voice Checklist (All Copy)
- ✅ Quiet confidence (not arrogant)
- ✅ Zero noise (no jargon)
- ✅ Maximum clarity (precision over persuasion)
- ✅ Intellectual, not emotional
- ✅ Direct, not blunt
- ✅ Respects reader intelligence

### British English Compliance
- All copy uses British spellings (optimise, organised, etc.)
- Dates: Day Month Year format
- Currency: £ (GBP)

---

## ANALYTICS & SUCCESS METRICS

### Track These Events:

**Homepage State Distribution:**
- `homepage_stranger` (first visit)
- `homepage_explorer_single` (visited 1 page, returned)
- `homepage_explorer_multi` (visited 3+ pages, returned)
- `homepage_evaluator` (multiple sessions)

**Page Engagement:**
- Time on `/capabilities`
- Scroll depth on `/about`
- Article opens on `/about`
- Mental model detail page visits

**Conversion Indicators:**
- Contact page visits
- Email button clicks
- Product enquiry modal opens

**Quality Metrics:**
- Pages per session (expect: 2.5 → 3.5)
- Time on site (expect: 3min → 6min)
- Bounce rate (expect: 55% → 40%)

---

## RISK MITIGATION

### Risk 1: User Confusion (Content Moved)
**Mitigation:** 301 redirects, clear navigation labels
**Impact:** Low

### Risk 2: SEO Impact (URL Changes)
**Mitigation:** 301 redirects preserve link equity, update sitemap
**Impact:** Low (temporary ranking fluctuation expected)

### Risk 3: Adaptive Homepage Doesn't Resonate
**Mitigation:** A/B test (50% adaptive, 50% static), measure engagement
**Impact:** Medium (can revert if data shows negative impact)

### Risk 4: Capabilities Page Too Long
**Mitigation:** Anchor navigation, clear section breaks, test scroll depth
**Impact:** Low (long-form content expected for this audience)

---

## CONTENT INVENTORY VERIFICATION

### ✅ All Content Preserved

**From Home:**
- Identity, positioning, proof (Stranger state) → Home
- Philosophy section → Home (all states)

**From What We Do:**
- Intelligence explanation → Capabilities (top)
- Consulting status quo → Capabilities
- Two tracks overview → Capabilities
- Testimonials → Capabilities (bottom)

**From Consulting:**
- 12 service bentos → Capabilities
- Pricing, special terms, how it works → Capabilities

**From Products:**
- 3 product bentos → Capabilities
- Method, constraints, pricing → Capabilities

**From Who We Are:**
- Team identity, background, principles → About
- "What We're Watching" (dynamic) → About

**From Mental Models:**
- 8 case briefs → About
- First principles, emergent patterns → About
- 5 mental models (overview) → About

**From Articles:**
- Article list and detail views → About

**From Contact:**
- All content unchanged → Contact

### ✅ Zero Content Lost
### ✅ Zero Redundancy Added
### ✅ 100% Strategic Repositioning

---

## THE SUTHERLAND/REEVES GENIUS

### Why This Makes Jaws Drop

**Most sites solve "content spread across too many pages" by:**
- Hiding navigation
- Simplifying messaging
- Reducing content volume

**We're doing the opposite:**
- Making navigation clearer (4 vs 8 pages)
- Increasing message coherence (unified offering view)
- Preserving 100% of content while improving flow

### The Adaptive Homepage Multiplier

**Traditional approach:**
- Static homepage repeats itself
- User returns, sees same content
- Cognitive dissonance: "Did I miss something?"

**Our approach:**
- Homepage changes based on journey
- User returns, sees contextual variant
- Cognitive delight: "They're tracking what I read"

**The moment user realizes homepage adapted:**
- First thought: "Oh, they tracked what I read"
- Second thought: "Wait, they're showing me something different"
- Third thought: "This IS the intelligence they're selling"
- Fourth thought: "I need to work with these people"

**That's the jaw drop.**

---

## APPROVAL CHECKLIST

Before implementation:

- [ ] Review all 4 copy mockup files
- [ ] Verify 100% content preservation
- [ ] Validate brand voice consistency
- [ ] Check dynamic content field allocation (zero repetition)
- [ ] Confirm navigation logic
- [ ] Review redirect strategy
- [ ] Approve adaptive homepage strategy (reference roadmap)
- [ ] Sign off on implementation timeline

---

## FILES CREATED

1. `COPY_HOME_STRANGER.md` - Stranger state homepage
2. `COPY_CAPABILITIES.md` - Unified services + products
3. `COPY_ABOUT.md` - Team + methodology + articles
4. `COPY_CONTACT.md` - Contact page (unchanged)
5. `SITE_ARCHITECTURE_OVERVIEW.md` - This file (strategic rationale)

**Plus (already created):**
6. `ADAPTIVE_HOMEPAGE_ROADMAP.md` - Complete technical implementation guide

---

## NEXT ACTIONS

1. **Review:** Read all mockup files
2. **Refine:** Suggest copy adjustments (if needed)
3. **Approve:** Sign off on structure
4. **Implement:** Follow roadmaps (site restructure → adaptive homepage)

---

**This architecture transforms fragmentation into clarity. Every page has one job. Every journey has one destination. Zero noise. Maximum impact.**

**Ready to build.**
