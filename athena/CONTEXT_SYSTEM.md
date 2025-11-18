# Athena Context System

Technical documentation for the context-aware viewing and engagement tracking system that powers Athena's contextual intelligence.

## Overview

The Context System tracks three levels of user engagement with website content:

1. **Page Visits** - Which pages users navigate to
2. **Section Views** - Which sections they scroll past (50%+ visible)
3. **Modal Opens** - Which modals/case studies they interact with

For sections and modals, the system also tracks **duration** and classifies **engagement level** to determine if content was actually read or just glanced at.

## Architecture

### Core Components

```
contexts/
└── AthenaChatContext.tsx          # Global state management

hooks/
└── useScrollTracking.ts           # Section visibility tracking

lib/
├── getKnowledgeContext.ts         # Knowledge loader & formatter
└── wordCount.ts                   # Engagement classification utilities

app/
├── about/page.tsx                 # Modal tracking integration
└── api/chat/route.ts              # API endpoint with context handling
```

### Data Flow

```
User Action → Tracking → State Update → Session Storage → API Request → Knowledge Loader → System Prompt → Athena Response
```

**Detailed Flow:**

1. **User scrolls page** → IntersectionObserver detects section visibility
2. **Section becomes 50%+ visible** → Timer starts, word count calculated
3. **Section exits viewport or drops below 50%** → Duration calculated, engagement classified
4. **State updates** → `ViewingHistory` Map updated with `EngagementData`
5. **SessionStorage persists** → Data survives navigation/chat collapse
6. **User sends chat message** → `getViewingContext()` serializes Maps to arrays
7. **API receives context** → `getKnowledgeContext()` loads relevant MD files
8. **System prompt built** → Context formatted with engagement data
9. **Athena receives** → Can reference specific content with precision

## Data Structures

### EngagementData Interface

```typescript
interface EngagementData {
  id: string;                    // Section or modal ID (e.g., "/about:hero" or "warehouse")
  engagement: 'skimmed' | 'viewed' | 'read' | 'engaged';
  duration: number;               // Seconds spent viewing
  wordCount: number;              // Words in content
  firstViewed: number;            // Timestamp when first viewed
  lastViewed: number;             // Timestamp when last viewed/exited
}
```

### ViewingHistory Interface

```typescript
interface ViewingHistory {
  currentPage: string;                          // Current pathname
  pagesVisited: Set<string>;                    // All pages visited this session
  sectionsViewed: Map<string, EngagementData>;  // Sections with engagement data
  modalsOpened: Map<string, EngagementData>;    // Modals with engagement data
}
```

### Engagement Classification (Human-Centered)

**NEW APPROACH:** Classification is based on **pause time** (viewport stillness), not word count ratios.

```typescript
// HUMAN BEHAVIOR PATTERNS:
// - Only count time when viewport is STILL (not scrolling)
// - Filter out very short sections (< 30 words)
// - Cap max engagement at 120 seconds (distraction detection)
// - Minimum 3-second pause to count as engagement
// - Minimum 10-second total page time to prevent drive-by false positives

function classifyEngagement(pauseTime: number): EngagementLevel {
  if (pauseTime < 10) return 'skimmed';    // 3-9s: Quick scan
  if (pauseTime < 25) return 'viewed';     // 10-24s: Actually read some
  if (pauseTime < 60) return 'read';       // 25-59s: Engaged with content
  return 'engaged';                        // 60-120s: Deep focus
}
```

**Examples:**

| Behavior | Pause Time | Classification | Reasoning |
|----------|-----------|----------------|-----------|
| Quick scroll through | 0-2s | *ignored* | Not tracked (< 3s threshold) |
| Glanced at headline | 5s | **skimmed** | Caught a few lines |
| Read one paragraph | 15s | **viewed** | Actually read some content |
| Read full section | 40s | **read** | Engaged with content |
| Deep focus, re-reading | 90s | **engaged** | Really thinking about it |
| Left tab open | 150s | **engaged** (capped at 120s) | Likely distracted, capped |

## Section Tracking

### Implementation: useScrollTracking Hook

**File:** `hooks/useScrollTracking.ts`

**Technology:** Scroll event + IntersectionObserver API + Pause detection

**Key Features:**
- **Pause-based tracking:** Only counts time when viewport is STILL (not scrolling)
- **Scroll velocity detection:** 150ms debounce to detect when user stops scrolling
- **Smart filters:**
  - Sections < 30 words = ignored (too short to matter)
  - Pauses < 3 seconds = ignored (just passing through)
  - Page time < 10 seconds = ignored (drive-by visit)
  - Pauses > 120 seconds = capped (distraction detection)
- **Tab visibility:** Discards data if user away > 30 seconds
- **Cumulative pauses:** Multiple pause periods on same section are added together
- **Real human patterns:** Scroll → Pause → Read → Scroll (not continuous visibility)

**Usage:**

```typescript
// In any page component
import { useScrollTracking } from '@/hooks/useScrollTracking';

export default function AboutPage() {
  useScrollTracking(); // Automatically tracks all data-section-id elements

  return (
    <section data-section-id="/about:hero">
      <h1>Hero Section</h1>
      {/* Content... */}
    </section>
  );
}
```

**Section ID Convention:**
```
data-section-id="{pathname}:{section-name}"

Examples:
- /about:hero
- /about:status-quo
- /solutions:how-it-works
- /products:pricing
```

### IntersectionObserver Configuration

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      const sectionId = entry.target.getAttribute('data-section-id');

      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        // Start timer if not already tracking
        if (!sectionTimers.current.has(sectionId)) {
          sectionTimers.current.set(sectionId, Date.now());
        }
      } else if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
        // Calculate duration and classify engagement
        const startTime = sectionTimers.current.get(sectionId);
        if (startTime) {
          const duration = Math.floor((Date.now() - startTime) / 1000);

          // Skip if less than 1 second (rapid scrolling)
          if (duration >= 1) {
            const wordCount = countWords(entry.target.textContent || '');
            const engagement = classifyEngagement(duration, wordCount);

            trackSectionEngagement({
              id: sectionId,
              engagement,
              duration,
              wordCount,
              firstViewed: startTime,
              lastViewed: Date.now()
            });
          }

          sectionTimers.current.delete(sectionId);
        }
      }
    });
  },
  { threshold: 0.5 } // Trigger when 50% visible
);
```

### Page Visibility API Integration

```typescript
const pageVisible = useRef<boolean>(true);

useEffect(() => {
  const handleVisibilityChange = () => {
    const wasVisible = pageVisible.current;
    pageVisible.current = !document.hidden;

    if (!wasVisible && pageVisible.current) {
      // Tab became visible - adjust all active timers
      const now = Date.now();
      const hiddenDuration = now - (lastVisibilityChange.current || now);

      sectionTimers.current.forEach((startTime, sectionId) => {
        // Adjust start time to exclude hidden duration
        sectionTimers.current.set(sectionId, startTime + hiddenDuration);
      });
    }

    lastVisibilityChange.current = Date.now();
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

## Modal Tracking

### Implementation: Context Methods

**File:** `contexts/AthenaChatContext.tsx`

**Key Features:**
- Manual tracking via `trackModalOpen()` and `trackModalClose()`
- Word count from modal content via `data-modal-id` attribute
- Falls back to 150-word estimate if modal already closed
- Engagement classification based on duration and word count

### Usage

```typescript
// In page component with modals
import { useAthenaChat } from '@/contexts/AthenaChatContext';

const { trackModalOpen, trackModalClose } = useAthenaChat();

const openModal = (modalId: string) => {
  setActiveModal(modalId);
  trackModalOpen(modalId); // Start timer
};

const closeModal = () => {
  if (activeModal) {
    trackModalClose(activeModal); // Calculate duration & engagement
  }
  setActiveModal(null);
};

// In Dialog component
<Dialog.Panel data-modal-id={activeModal}>
  {/* Modal content */}
</Dialog.Panel>
```

### Modal Engagement Tracking

```typescript
const trackModalClose = (modalId: string) => {
  const startTime = modalTimers.current.get(modalId);
  if (!startTime) return;

  const duration = Math.floor((Date.now() - startTime) / 1000);

  // Get word count from modal content
  const modalElement = document.querySelector(`[data-modal-id="${modalId}"]`);
  const wordCount = modalElement
    ? countWords(modalElement.textContent || '')
    : 150; // Fallback estimate

  const engagement = classifyEngagement(duration, wordCount);

  setViewingHistory(prev => {
    const updated = new Map(prev.modalsOpened);
    updated.set(modalId, {
      id: modalId,
      engagement,
      duration,
      wordCount,
      firstViewed: startTime,
      lastViewed: Date.now()
    });
    return { ...prev, modalsOpened: updated };
  });

  modalTimers.current.delete(modalId);
};
```

## SessionStorage Persistence

**File:** `contexts/AthenaChatContext.tsx`

**Why:** Viewing history should survive:
- Navigation between pages
- Chat interface collapse/expand
- Page refresh (debatable, currently supported)

**Implementation:**

```typescript
// Save to sessionStorage on every change
useEffect(() => {
  try {
    const serialized = {
      currentPage: viewingHistory.currentPage,
      pagesVisited: Array.from(viewingHistory.pagesVisited),
      sectionsViewed: Array.from(viewingHistory.sectionsViewed.entries()),
      modalsOpened: Array.from(viewingHistory.modalsOpened.entries())
    };
    sessionStorage.setItem('athena-viewing-history', JSON.stringify(serialized));
  } catch (error) {
    console.warn('Failed to save viewing history to sessionStorage:', error);
  }
}, [viewingHistory]);

// Restore on mount
useEffect(() => {
  try {
    const saved = sessionStorage.getItem('athena-viewing-history');
    if (saved) {
      const data = JSON.parse(saved);
      setViewingHistory({
        currentPage: data.currentPage || pathname,
        pagesVisited: new Set(data.pagesVisited || []),
        sectionsViewed: new Map(data.sectionsViewed || []),
        modalsOpened: new Map(data.modalsOpened || [])
      });
    }
  } catch (error) {
    console.warn('Failed to restore viewing history from sessionStorage:', error);
  }
}, []);
```

## Knowledge Context Generation

**File:** `lib/getKnowledgeContext.ts`

**Purpose:** Loads only relevant knowledge files based on viewing history and formats them for Athena's system prompt.

### Logic

```typescript
export function getKnowledgeContext(viewingHistory: ViewingHistory): string {
  let context = '';

  // 1. Group sections by page
  const sectionsByPage = new Map<string, EngagementData[]>();
  Array.from(viewingHistory.sectionsViewed.values()).forEach(section => {
    const [page] = section.id.split(':');
    if (!sectionsByPage.has(page)) sectionsByPage.set(page, []);
    sectionsByPage.get(page)!.push(section);
  });

  // 2. Format section engagement
  sectionsByPage.forEach((sections, page) => {
    context += `\n### ${page}\n`;
    sections.forEach(section => {
      const [, sectionName] = section.id.split(':');
      context += `- ${sectionName} (${section.engagement}, ${section.duration}s / ${section.wordCount} words)\n`;
    });
  });

  // 3. Load and format modals with full content
  if (viewingHistory.modalsOpened.size > 0) {
    context += `\n### Modals Opened\n`;
    Array.from(viewingHistory.modalsOpened.values()).forEach(modal => {
      const modalContent = loadKnowledgeFile(`modals/${modal.id}.md`);
      if (modalContent) {
        context += `\n### ${modal.id} (${modal.engagement}, ${modal.duration}s / ${modal.wordCount} words)\n`;
        context += modalContent + '\n';
      }
    });
  }

  return context;
}
```

### Output Example

```markdown
### /about
- hero (read, 12s / 45 words)
- opening (viewed, 8s / 85 words)
- status-quo (engaged, 38s / 120 words)
- physics-framework (skimmed, 4s / 200 words)

### Modals Opened

### warehouse (viewed, 15s / 180 words)

# The Warehouse That Wasn't

**Category:** Supply Chain Diagnostics

**Problem:**
A logistics company was losing money. Everyone blamed the warehouse...

[Full modal content...]

### particle-incentives (read, 25s / 160 words)

# Incentives Particle

What people say drives them. What actually drives them...

[Full modal content...]
```

## System Prompt Integration

**File:** `app/api/chat/route.ts`

**Integration Point:** `buildSystemPrompt()` function

```typescript
function buildSystemPrompt(
  pathname: string,
  username?: string,
  viewingContext?: ViewingContext
): string {
  const corePrompt = getCorePrompt();
  const dynamicContent = getDynamicContent();
  const sessionContext = getSessionContext(username);

  // Generate knowledge context from viewing history
  const knowledgeContext = viewingContext
    ? getKnowledgeContext(viewingContext)
    : '';

  return `${corePrompt}

---

## CURRENT DYNAMIC CONTENT

${dynamicContent}

---

## USER VIEWING HISTORY & CONTEXT

${knowledgeContext || 'User has just arrived - no viewing history yet.'}

---

## CURRENT PAGE

The user is currently viewing: ${pathname}

---

Use the content above to provide contextual, relevant responses.${sessionContext}`;
}
```

## Athena's Interpretation

**File:** `athena/prompts/core.md`

The system prompt teaches Athena how to use engagement data:

**Key Principles:**
1. Use engagement level to calibrate assumptions
2. "skimmed" = explain fresh, don't assume understanding
3. "viewed" = reference lightly, offer to elaborate
4. "read" = can reference specifics and build on it
5. "engaged" = they're deeply interested, go deeper

**Natural Language Guidelines:**
- Use presumptive language: "I presume you saw..." not "You read..."
- Don't list viewing history mechanically
- Make connections across viewed content
- Don't spoil unseen content

## Edge Cases Handled

### 1. Rapid Scrolling

**Problem:** User scrolls quickly through page, triggers many section enter/exit events

**Solution:**
- 1-second minimum threshold
- Sections viewed for <1 second are not tracked
- Prevents noise in engagement data

### 2. Tab Switching

**Problem:** User switches tabs mid-scroll, timer keeps running

**Solution:**
- Page Visibility API pauses all timers when tab becomes hidden
- Adjusts start times when tab becomes visible again
- Excluded time doesn't count toward engagement

### 3. Page Navigation

**Problem:** User navigates away while sections are being tracked

**Solution:**
- `useEffect` cleanup function flushes all active timers on unmount
- Final durations calculated and classified before component unmounts

### 4. Multiple Views of Same Section

**Problem:** User scrolls back up to re-read a section

**Solution:**
- If section ID already exists in Map, update with cumulative duration
- Engagement level may upgrade (e.g., "viewed" → "read")

### 5. Modal Closed Before Word Count Retrieved

**Problem:** Modal closed too quickly to get accurate word count

**Solution:**
- Falls back to 150-word estimate
- Still classifies engagement based on duration vs estimate

### 6. SessionStorage Quota Exceeded

**Problem:** Large viewing history exceeds storage quota

**Solution:**
- Graceful error handling with console warning
- System continues working without persistence
- Rare in practice (typical session ~5-10KB)

## Performance Considerations

### IntersectionObserver Efficiency

- Native browser API, highly optimized
- No polling or interval timers
- Lazy loading compatible
- Minimal CPU/memory overhead

### Map vs Array for Storage

- Maps for O(1) lookups during updates
- Converted to Arrays only when serializing for API
- Efficient for frequent updates during scrolling

### SessionStorage Size

- Typical session: 5-10KB
- Worst case (visit all pages, open all modals): ~30KB
- Well within 5-10MB sessionStorage limits

### API Payload Size

- Viewing context adds ~1-3KB per message
- Negligible compared to conversation history
- Compressed by HTTP/2 automatically

## Testing

### Manual Testing

1. **Visit `/about` page**
2. **Open React DevTools** → Components → AthenaChatProvider
3. **Watch `viewingHistory` state** as you:
   - Scroll through sections
   - Open modals
   - Close modals
   - Navigate to other pages
4. **Verify:**
   - `sectionsViewed` Map updates with engagement data
   - `modalsOpened` Map updates with engagement data
   - `pagesVisited` Set includes current page
   - SessionStorage contains serialized data

### Network Testing

1. **Open Athena chat**
2. **Send a message**
3. **Open Network tab** → Find POST to `/api/chat`
4. **Verify request payload includes:**
   ```json
   {
     "message": "...",
     "conversationId": "...",
     "viewingContext": {
       "currentPage": "/about",
       "pagesVisited": ["/", "/about"],
       "sectionsViewed": [
         {
           "id": "/about:hero",
           "engagement": "read",
           "duration": 12,
           "wordCount": 45,
           "firstViewed": 1234567890,
           "lastViewed": 1234567902
         }
       ],
       "modalsOpened": []
     }
   }
   ```

### Engagement Classification Testing

**Test Cases:**

| Test | Word Count | Duration | Expected |
|------|-----------|----------|----------|
| Quick glance | 100 | 5s | skimmed |
| Speed read | 200 | 30s | viewed |
| Normal read | 200 | 50s | read |
| Deep study | 150 | 80s | engaged |

## Future Enhancements

### 1. Scroll Depth Tracking

Track how far down the page users scroll, not just which sections are visible.

### 2. Mouse Hover Tracking

Detect which elements users hover over for extended periods (indicates interest).

### 3. Re-read Detection

Distinguish between first read and subsequent re-reads of same content.

### 4. Engagement Heatmaps

Visual representation of which sections get most/least engagement across users.

### 5. A/B Testing Integration

Test different content lengths and see impact on engagement metrics.

### 6. Redis-Backed Persistence

For multi-server deployments, move from sessionStorage to Redis for cross-server state.

## Troubleshooting

### Sections Not Tracking

**Symptom:** `sectionsViewed` Map not updating

**Check:**
1. Does element have `data-section-id` attribute?
2. Is `useScrollTracking()` called in component?
3. Is section 50%+ visible in viewport?
4. Check console for errors

### Modals Not Tracking

**Symptom:** `modalsOpened` Map not updating

**Check:**
1. Is `trackModalOpen()` called on modal open?
2. Is `trackModalClose()` called on modal close?
3. Does modal Dialog.Panel have `data-modal-id` attribute?
4. Check console for errors

### Engagement Classification Wrong

**Symptom:** Content shows "skimmed" when user clearly read it

**Check:**
1. Word count accurate? (Check `entry.target.textContent`)
2. Timer paused when tab was hidden? (Page Visibility API)
3. Duration calculated correctly? (Check timestamps)
4. Reading speed assumption reasonable? (225 WPM is average)

### SessionStorage Not Persisting

**Symptom:** Viewing history lost on page refresh

**Check:**
1. Browser in private/incognito mode? (sessionStorage disabled)
2. SessionStorage quota exceeded? (Check console warnings)
3. Errors during serialization? (Check try/catch blocks)

## Related Documentation

- **README.md** - Overview of Athena system
- **KNOWLEDGE_BASE.md** - Knowledge file structure
- **INTELLIGENCE_SYSTEM.md** - Conversation storage and analysis
- **Root CLAUDE.md** - Project-wide documentation
