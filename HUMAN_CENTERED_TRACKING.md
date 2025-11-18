# Human-Centered Scroll Tracking - Implementation Summary

## What Changed

Replaced the old **word-count-based** engagement tracking with a new **pause-based** system that tracks real human reading behavior.

## The Problem We Fixed

**Old System Issues:**
- 15-word hero sections were classified as "read" after just 5 seconds of quick scrolling
- Continuous scrolling counted as "reading time" even though users weren't actually reading
- Word count ratios didn't match real human behavior (30% of expected time = "viewed" was too low)
- Quick browsing through pages triggered false "viewed" and "read" classifications

**Example of the bug:**
```
Hero section: "PATTERNS ARE LIKE GRAVITY. THEY EXIST WHETHER YOU SEE THEM OR NOT."
- 15 words
- Expected read time: ~5 seconds
- If visible for 2 seconds during quick scroll → classified as "viewed" (42%)
- If visible for 5 seconds → classified as "read" (104%)

Result: Athena thought you read the page when you just scrolled through it!
```

## The New System

### Core Principle: **Only Count Pause Time**

The system now tracks **viewport stillness** (not just visibility):
- When you're scrolling → timers pause
- When you stop scrolling → timers start
- Only counts time when viewport hasn't moved for 150ms+

### Human Behavior Patterns

```typescript
PAUSE-BASED CLASSIFICATION:

3-9 seconds pause    → "skimmed"   (caught a few lines, got the headline)
10-24 seconds pause  → "viewed"    (actually read some paragraphs)
25-59 seconds pause  → "read"      (engaged with the full content)
60-120 seconds pause → "engaged"   (deep focus, re-reading, thinking)

120+ seconds → Capped (likely distracted - tab switch, phone call, friend chatting)
```

### Smart Filters

The system now **ignores**:

1. **Very short sections** (< 30 words)
   - Hero banners, short headlines don't trigger false positives

2. **Quick passes** (< 3 seconds pause)
   - Just scrolling through, no content absorbed

3. **Drive-by visits** (< 10 seconds total page time)
   - User landed and left immediately, no meaningful engagement

4. **Long distractions** (> 120 seconds)
   - Caps at 2 minutes max - anything longer = user was probably distracted

5. **Tab away** (> 30 seconds hidden)
   - If user switches tabs for more than 30s, discards accumulated data

6. **Continuous scrolling**
   - While scrolling = no reading happening
   - Only pauses count

## Real-World Examples

### Quick Browse Scenario (Now Ignored)
```
User behavior: Scroll through /about page quickly
- Sections visible for 2-5 seconds each while scrolling
- No pauses, continuous movement
- Total page time: 8 seconds

Old system: "viewed" 5 sections, "skimmed" 3 sections
New system: Nothing tracked (page time < 10s, no pauses > 3s)

✅ Correct: User was just browsing, didn't read anything
```

### Actual Reading Scenario (Now Accurate)
```
User behavior: Land on /about, read opening section, pause
- Scroll to section
- Stop scrolling (pause detected after 150ms)
- Read for 18 seconds
- Scroll to next section

Old system: "viewed" (based on word count ratio)
New system: "viewed" (18s pause = actually read some content)

✅ Correct: User actually engaged with the content
```

### Deep Engagement Scenario
```
User behavior: Read case study modal, re-read key parts
- Open modal
- Read for 35 seconds
- Scroll back up to re-read intro
- Another 20 seconds pause
- Total: 55 seconds of accumulated pause time

Old system: "read" (based on single continuous view)
New system: "read" (55s accumulated pauses = engaged with content)

✅ Correct: Multiple pauses tracked cumulatively
```

## Technical Implementation

**File Changed:** `hooks/useScrollTracking.ts` (completely rewritten)

**New Tracking Mechanisms:**

1. **Scroll Event Listener**
   - Detects when user is scrolling
   - 150ms debounce to detect "pause" state
   - Pauses all active section timers during scroll

2. **Pause Accumulation**
   - Tracks multiple pause periods per section
   - Cumulative: Pause 1 (10s) + Pause 2 (15s) = 25s total → "read"

3. **Page Time Tracking**
   - Tracks total time on page from mount
   - Filters out drive-by visits (< 10s)

4. **Tab Visibility**
   - Pauses timers when tab hidden
   - Discards data if user away > 30 seconds

5. **Smart Viewport Detection**
   - Only tracks sections that are 20-80% in viewport
   - Prevents edge-of-screen false positives

## How to Test

### Test 1: Quick Scroll (Should be Ignored)
1. Visit `/about`
2. Quickly scroll from top to bottom (< 5 seconds)
3. Open Athena chat
4. Ask: "What have I looked at?"

**Expected:** Athena should say you just arrived or briefly browsed, NOT that you "read" sections.

### Test 2: Actual Reading (Should Track)
1. Visit `/about`
2. Stop at "Status Quo" section
3. Read for 15-20 seconds without scrolling
4. Open Athena chat
5. Ask: "What have I looked at?"

**Expected:** Athena should mention you "viewed" or "read" the Status Quo section with ~15-20s engagement.

### Test 3: Multiple Pauses (Should Accumulate)
1. Visit `/about`
2. Read "Physics Framework" for 15 seconds
3. Scroll down, then scroll back up to same section
4. Read another 15 seconds
5. Open Athena chat

**Expected:** Athena should show 30 seconds total engagement (accumulated).

### Test 4: Distraction Detection (Should Cap)
1. Visit `/about`
2. Scroll to a section
3. Leave tab open and walk away for 3 minutes
4. Come back, open Athena

**Expected:** Section capped at 120s max, or data discarded if tab was hidden > 30s.

## Debugging

Open browser DevTools console and check for:
- No errors on scroll
- SessionStorage key: `athena-viewing-history`
- Check `sectionsViewed` array for engagement data

```javascript
// In browser console:
JSON.parse(sessionStorage.getItem('athena-viewing-history'))
```

Should show:
```json
{
  "sectionsViewed": [
    ["/about:status-quo", {
      "id": "/about:status-quo",
      "engagement": "viewed",
      "duration": 18,
      "wordCount": 245,
      "firstViewed": 1234567890,
      "lastViewed": 1234567908
    }]
  ]
}
```

## What Stays the Same

- Modal tracking (still time-based, works well)
- Page visit tracking (still works)
- SessionStorage persistence (still works)
- Context sent to Athena (same format)
- Knowledge base loading (same)

## Performance Impact

**Old system:**
- IntersectionObserver only (lightweight)

**New system:**
- IntersectionObserver + Scroll listener + 150ms debounce
- Slightly more CPU during scroll, but still very lightweight
- Passive scroll listener (no scroll blocking)

**Impact:** Negligible. Modern browsers handle this efficiently.

## Next Steps

1. **Test in dev:** `npm run dev` and browse the site naturally
2. **Check tracking:** Open DevTools → Application → Session Storage
3. **Test Athena:** Open chat and ask what you've viewed
4. **Verify accuracy:** Should match your actual reading behavior

## Rollback Plan

If issues arise, the old implementation is in git history:
```bash
git log --oneline hooks/useScrollTracking.ts
git show <commit-hash>:hooks/useScrollTracking.ts
```

Or just ask Claude to restore the old word-count-based system.
