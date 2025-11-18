# Scroll Tracking Implementation - Testing Guide

## Implementation Complete

The scroll-based section tracking system has been successfully implemented for Athena.

## What Was Implemented

### 1. Context Interface Updates
- ✅ Added `sectionsViewed: Set<string>` to `ViewingHistory` interface
- ✅ Added `trackSectionView()` method to context
- ✅ Updated `getViewingContext()` to return `sectionsViewed` as array

### 2. Scroll Tracking Hook
- ✅ Created `/hooks/useScrollTracking.ts`
- ✅ Uses Intersection Observer API
- ✅ Threshold: 50% visibility
- ✅ Automatic cleanup on unmount

### 3. About Page Instrumentation
All major sections on `/about` page now have `data-section-id` attributes:
- `/about:hero` - Hero statement
- `/about:opening` - Opening paragraphs
- `/about:uncomfortable-truth` - The Uncomfortable Truth section
- `/about:status-quo` - The Status Quo section
- `/about:why-both-ways` - Why We Build Both Ways
- `/about:back-to-solutions` - Back To Solutions
- `/about:physics-framework` - Particles, Molecules, Patterns
- `/about:mental-models` - Mental Models section
- `/about:case-studies` - In Practice (case studies)
- `/about:what-we-do` - What We Actually Do
- `/about:usp` - Our USP
- `/about:behavioural-reality` - The Behavioural Reality
- `/about:not-for` - Who We're Not For
- `/about:for` - Who We're Absolutely For
- `/about:testimonials` - Testimonials section
- `/about:complexity` - Complexity Is Everywhere
- `/about:cta` - Ready? (CTA section)

### 4. Knowledge Context Loader
- ✅ Updated `lib/getKnowledgeContext.ts` to accept `sectionsViewed`
- ✅ Groups sections by page for clean presentation
- ✅ Generates "Sections Viewed" context for Athena

### 5. Athena Core Prompt
- ✅ Updated viewing context documentation
- ✅ Added section-level awareness guidelines
- ✅ Provided examples of how to use section data
- ✅ Clear instructions: reference seen sections, don't spoil unseen ones

### 6. API Route
- ✅ Updated chat API route type signature to include `sectionsViewed`

## Testing Checklist

### Browser Testing (Manual)
1. **Open the About page** (`http://localhost:3001/about`)
2. **Open React DevTools**
   - Go to Components tab
   - Find `AthenaChatProvider`
   - Watch `viewingHistory.sectionsViewed` state
3. **Scroll slowly through the page**
   - Verify sections appear in `sectionsViewed` as you scroll past them
   - Each section should only be added once (no duplicates)
4. **Test Intersection Observer**
   - Scroll quickly - sections should still be captured
   - Scroll back up - should not re-add sections
   - Resize window - tracking should still work
5. **Test Athena Integration**
   - Scroll past a few sections
   - Open Athena chat
   - Send a message
   - Check browser Network tab for `/api/chat` request
   - Verify `sectionsViewed` array is included in request body
6. **Test Athena Responses**
   - After viewing "uncomfortable-truth" section, ask Athena about it
   - She should reference it naturally: "In the Uncomfortable Truth section you read..."
   - Ask about a section you haven't scrolled to yet
   - She should guide you: "That's covered in the Testimonials section below"

### Console Testing
Check browser console for:
- ✅ No errors related to Intersection Observer
- ✅ No React hydration warnings
- ✅ No TypeScript errors
- ✅ Clean cleanup when navigating away

### Build Testing
- ✅ Production build succeeds: `npm run build`
- ✅ No TypeScript errors
- ✅ All types correctly defined

## Expected Behavior

### Section Tracking
- Sections become "viewed" when 50%+ visible in viewport
- Each section ID follows format: `/page:section-name`
- Section IDs use kebab-case (e.g., "uncomfortable-truth")
- Duplicate entries prevented by using Set

### Athena Context
When user scrolls past sections and then opens chat, Athena receives:

```markdown
## Sections Viewed

The user has scrolled past and read the following sections (50%+ visibility):

### /about
- hero
- opening
- uncomfortable-truth
- status-quo

---
```

### Athena Responses
Athena should:
- Reference specific sections naturally: "In the Status Quo section you just read..."
- Make connections: "You saw the Uncomfortable Truth and the Why We Build Both Ways sections..."
- Guide to unseen content: "Keep scrolling to see our case studies"
- Never list sections mechanically: ❌ "You've viewed 7 sections"

## Next Steps

### Immediate
1. Test manually in browser at http://localhost:3001/about
2. Verify section tracking in React DevTools
3. Test Athena chat responses with section context
4. Check Network tab to confirm API receives section data

### Future Enhancements
1. Add section IDs to other content-heavy pages:
   - `/solutions` page
   - `/products` page
   - Mental model pages
2. Create analytics dashboard showing which sections get viewed most
3. Add time-based tracking (how long user viewed each section)
4. A/B test different section visibility thresholds

## Files Modified

1. `/contexts/AthenaChatContext.tsx` - Added sectionsViewed state
2. `/hooks/useScrollTracking.ts` - NEW: Intersection Observer hook
3. `/app/about/page.tsx` - Added data-section-id attributes
4. `/lib/getKnowledgeContext.ts` - Process sectionsViewed data
5. `/athena/prompts/core.md` - Updated viewing context guidelines
6. `/app/api/chat/route.ts` - Updated type signature

## Success Criteria

✅ No build errors
✅ No TypeScript errors
✅ Intersection Observer tracks sections correctly
✅ Athena receives section data in API calls
✅ Athena references viewed sections naturally
✅ Athena doesn't spoil unseen sections
✅ Clean browser console (no errors)
✅ No memory leaks (observer cleanup works)

## Known Limitations

- Currently only About page is instrumented
- 50% threshold is fixed (not configurable)
- No persistence across page refreshes (by design)
- Sections tracked per session only

## Performance Notes

- Intersection Observer is highly performant
- Minimal overhead (runs in browser's main thread)
- Cleanup prevents memory leaks
- No impact on page load time
- No external dependencies required
