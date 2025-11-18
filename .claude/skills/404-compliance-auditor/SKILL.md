# 404 Page Compliance Auditor

**Purpose:** Audit the 404 error page (`app/not-found.tsx`) against current website architecture to ensure 100% accuracy, complete navigation coverage, and Rory Sutherland-style tone compliance.

---

## Your Mission

When invoked, you will:

1. **Scan the entire website architecture** to build a complete sitemap
2. **Compare against the 404 navigation tree** to identify gaps or outdated content
3. **Verify tone of voice compliance** for all descriptions
4. **Generate a prioritized task list** to restore 100% compliance

---

## Website Architecture Discovery

### Step 1: Identify All Routes

**Scan these locations:**

```bash
app/**/page.tsx           # All pages
app/api/**/route.ts       # API routes (ignore)
components/BentoBox/content/*.json  # All bento box content files
```

**Expected Routes to Verify:**

**Primary Pages:**
- `/` (homepage)
- `/about` (philosophy + modals)
- `/solutions` (consulting + products)
- `/products` (AI product suite)
- `/contact`
- `/articles`
- `/privacy`
- `/terms`

**Mental Model Pages:**
- `/demand`
- `/incentives`
- `/agentic`
- `/prismatic`
- `/triptych`

**Test/Dev Pages (ignore these):**
- `/about-test`
- `/bento-test`
- `/test-mobile`

### Step 2: Extract Modal IDs from /about Page

**File:** `app/about/page.tsx`

**What to extract:**
- All modal IDs from the `briefs` object
- Count by category:
  - Case Studies (should be 8)
  - Particles (should be 7)
  - Molecules (should be 5)
  - Patterns (should be 5)
  - Mental Models (should be 0 - these are now standalone pages)

**Current expected count:** 25 modals total (8 + 7 + 5 + 5)

### Step 3: Extract All Bento Box Services/Products

**Directory:** `components/BentoBox/content/`

**What to extract from each JSON file:**
1. `id` field (used for hash navigation)
2. `content.prompt.text` field (the "If..." pain point)
3. `content.title` field (the service/product name)
4. `enabled` field (skip if false)

**Expected count:** 15 active bento boxes

**Categorize by pricing tier:**
- Big Picture Services: £40k-50k (3 items)
- Mid-tier Services: £18k-25k (3 items)
- Tactical Services: £8k-15k (6 items)
- AI Products: Variable pricing (3 items)

---

## 404 Page Structure Verification

### Current 404 Navigation Tree Structure

**File:** `app/not-found.tsx`

**Expected structure:**

```
1. Opening philosophical reframe (lines ~51-92)
2. Collapsible navigation box (lines ~96-350)
   ├── /home
   ├── /about
   │   ├── Description
   │   └── Nested subsections:
   │       ├── Case Studies (8)
   │       ├── Particles (7)
   │       ├── Molecules (5)
   │       ├── Patterns (5)
   │       └── Mental Models (5 standalone page links)
   ├── /solutions
   │   ├── Description
   │   └── Nested subsections:
   │       └── Services & Products (15 "If..." prompts)
   ├── /products
   ├── /contact
   ├── /articles
   ├── /privacy
   └── /terms
3. Meta-reveal section (lines ~371-395)
4. Back button (lines ~397-421)
```

### Verification Checklist

For each section, verify:

**✓ Route exists** - Page file exists in `app/`
**✓ Link is correct** - href matches actual route
**✓ Description exists** - Non-empty contextual description
**✓ Description tone** - Matches Rory Sutherland guidelines (see below)
**✓ Hash links work** - For modals and bento boxes, ID exists in source
**✓ Hash navigation scrolls correctly** - Links to modals and bento boxes must scroll to the relevant page segment when clicked (like current bento box behavior in /solutions)
**✓ Count matches** - Number of items matches actual architecture
**✓ Order is logical** - Grouped by category, maintains hierarchy

---

## Tone of Voice Guidelines (Rory Sutherland Edge)

Every description must follow these principles:

### 1. Anti-Marketing Honesty

**Do:**
- "Not blog posts. Not thought leadership."
- "If you want validation, skip this."
- "Overkill if you're just browsing or useless if you're in a rush."

**Don't:**
- "Cutting-edge insights that will transform your business"
- "Industry-leading solutions"
- "World-class expertise"

### 2. Self-Selection Filters

Tell people when NOT to read:
- "If you're paranoid, read it. If you trust us, don't."
- "95% of businesses need consulting. 5% need what we do."
- "Read before you subscribe."

### 3. Behavioral Precision

Use specific time/effort estimates:
- "Takes 8 minutes. Saves you 8 months."
- "6 minutes and actually want to think with us"
- "Minimum 25 meaningful interactions per month"

### 4. Negation as Signal

Define by what it's NOT:
- "No trackers. No analytics. No selling your data."
- "No retainers. No dependency."
- "No calendar. No chatbot. Just email."

### 5. Contrarian Truth-Telling

Challenge conventional wisdom:
- "This one deliberately adds it [friction]."
- "We limit clients per industry so your competitors don't get the same advantage."
- "Calendars are convenient. Email is intentional."

### 6. Strategic Scarcity

Signal exclusivity honestly:
- "We work with the ones who hire for intelligence."
- "The 5% we work with"
- "Limited spots monthly"

### 7. Linguistic Economy

Short sentences. Direct language. No fluff.
- "The rules."
- "Use our stuff, you agree."
- "That's it."

---

## Compliance Audit Process

### Phase 1: Architecture Discovery (20 min)

1. **Scan all route files** and build complete sitemap
2. **Extract modal IDs** from about/page.tsx briefs object
3. **Extract bento box metadata** from all JSON files in components/BentoBox/content/
4. **Document counts:**
   - Total pages: X
   - Total modals: X (by category)
   - Total bento boxes: X (by tier)

### Phase 2: 404 Page Analysis (15 min)

1. **Read** `app/not-found.tsx` completely
2. **Extract all links** from navigation tree
3. **Extract all descriptions**
4. **Map structure:**
   - Which routes are included?
   - Which are missing?
   - Which links are broken?
   - Which descriptions exist?

### Phase 3: Gap Analysis (10 min)

**Compare Phase 1 vs Phase 2:**

**Missing Routes:**
- Routes that exist in architecture but NOT in 404 page

**Broken Links:**
- Links in 404 that point to non-existent routes/modals/IDs

**Outdated Counts:**
- "8 case studies" but only 7 exist
- "15 services" but 16 bento boxes found

**Missing Descriptions:**
- Routes listed without contextual copy

**Tone Violations:**
- Descriptions that use marketing speak
- Missing self-selection filters
- No time/effort estimates
- Generic language

### Phase 4: Task Generation (10 min)

**Output Format:**

```markdown
## 404 Compliance Audit Report

**Audit Date:** [timestamp]
**Compliance Score:** X/100

---

### Critical Issues (Fix Immediately)

1. **[BROKEN LINK]** /about#modal-xyz points to deleted modal
   - **Impact:** 404 within a 404
   - **Fix:** Remove link or update to correct modal ID
   - **File:** app/not-found.tsx:XXX

2. **[MISSING ROUTE]** /new-page exists but not in 404 nav
   - **Impact:** Users can't discover this page from 404
   - **Fix:** Add to navigation tree with Rory-style description
   - **File:** app/not-found.tsx:XXX

---

### High Priority (Fix This Week)

3. **[OUTDATED COUNT]** "8 case studies" but only 7 exist
   - **Impact:** Credibility loss, looks unmaintained
   - **Fix:** Update count to "7" or add missing case study
   - **File:** app/not-found.tsx:XXX

4. **[MISSING DESCRIPTION]** /new-route has no contextual copy
   - **Impact:** User doesn't know what to expect
   - **Fix:** Write Rory-style description following tone guidelines
   - **File:** app/not-found.tsx:XXX

---

### Medium Priority (Next Sprint)

5. **[TONE VIOLATION]** /products description too generic
   - **Current:** "Explore our product offerings"
   - **Should be:** "[Specific, honest, self-selecting copy]"
   - **Fix:** Rewrite following Section 6 tone guidelines
   - **File:** app/not-found.tsx:XXX

---

### Low Priority (Nice to Have)

6. **[OPTIMIZATION]** Mental model links could include 1-line hook
   - **Current:** Just the title
   - **Could add:** Brief value prop per Rory guidelines
   - **File:** app/not-found.tsx:XXX

---

### Summary

**Total Issues:** X
- Critical: X
- High: X
- Medium: X
- Low: X

**Estimated Fix Time:** X hours

**Next Steps:**
1. [Specific action item]
2. [Specific action item]
3. [Specific action item]
```

---

## Quality Standards

### 100% Compliance Means:

**✓ Architecture Coverage**
- Every public route appears in 404 nav (except test pages)
- Every modal ID links correctly
- Every bento box ID links correctly
- All counts are accurate

**✓ Tone Compliance**
- Every description follows Rory Sutherland guidelines
- No marketing speak
- Includes self-selection filters
- Uses specific time/effort estimates where relevant
- Employs negation and contrarian truth-telling

**✓ Technical Accuracy**
- All links work (no 404s within the 404)
- All hash navigation points to valid IDs
- Class names and CSS match expected behavior
- Hover states work as designed

**✓ User Experience**
- Descriptions help users self-select
- Navigation hierarchy is logical
- Content is scannable (not walls of text)
- Maintains Prismatica brand voice throughout

---

## Example Audit Output

```markdown
## 404 Compliance Audit Report

**Audit Date:** 2025-11-18 14:30
**Compliance Score:** 73/100

---

### Critical Issues (2)

1. **[BROKEN LINK]** /about#model-demand points to deleted modal
   - Modal was converted to standalone page at /demand
   - Fix: Link already updated to /demand (✓ RESOLVED)
   - File: app/not-found.tsx:247

2. **[MISSING ROUTE]** /products/focus-matrix exists but not discoverable from 404
   - Impact: New product page orphaned
   - Fix: Add to /solutions subsection with "If yes to all achieves nothing..."
   - File: app/not-found.tsx:283

---

### High Priority (3)

3. **[OUTDATED COUNT]** "30 modals" but only 25 exist after mental model migration
   - Fix: Update count to "25 modals" in description
   - File: app/not-found.tsx:182

4. **[MISSING DESCRIPTION]** /privacy has no contextual copy
   - Fix: Add Rory-style description
   - Suggested: "Written for humans, not lawyers. No trackers..."
   - File: app/not-found.tsx:315

5. **[TONE VIOLATION]** /home description too bland
   - Current: "Sets the tone, but you probably saw it..."
   - Should add: Self-selection filter or specific value
   - File: app/not-found.tsx:180

---

### Summary

**Compliance Score Breakdown:**
- Architecture Coverage: 85/100 (missing 1 route, 1 broken link)
- Tone Compliance: 70/100 (3 violations, 1 missing description)
- Technical Accuracy: 95/100 (1 broken modal reference)
- User Experience: 80/100 (counts outdated, reduces trust)

**Estimated Fix Time:** 2 hours

**Next Steps:**
1. Update modal count from 30 → 25
2. Add /privacy description following tone guidelines
3. Add /products/focus-matrix to navigation tree
4. Rewrite /home description with Rory edge
```

---

## How to Use This Skill

**Invoke the skill when:**
- Adding new pages to the website
- Modifying modal structure in /about
- Adding/removing bento boxes in /solutions
- Updating any page content that affects navigation
- Quarterly maintenance audits

**Expected output:**
- Complete audit report in markdown
- Prioritized task list
- Specific line numbers for fixes
- Estimated time to restore compliance
- Before/after examples for tone violations

**Success criteria:**
- 100/100 compliance score
- Zero broken links
- All descriptions follow Rory guidelines
- Complete architecture coverage
