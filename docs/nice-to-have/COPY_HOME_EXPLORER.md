# HOME PAGE - EXPLORER STATE (Return Visit)
**When:** Visited 1-3 other pages, returns to home
**Objective:** Demonstrate contextual awareness, NO repetition
**User thinks:** "Wait... this changed. They're tracking my journey."

---

## CRITICAL CONSTRAINT

User has ALREADY seen on first visit:
- ❌ "Intelligence begins where answers end"
- ❌ `newsInsight` dynamic content
- ❌ "Are you asking the right questions?"
- ❌ Philosophy section ("quietest room...")

**We CANNOT repeat any of this. Must show NEW content based on their journey.**

---

## VARIATION 1: Visited /capabilities

### Hero (Same)
```
THINKING
AS A SERVICE
```

### Contextual Intro (NEW)
```
You just looked at what we fix.

Here's how we think about fixing.
```

### Dynamic Proof (DIFFERENT field)
```
[No label - just content]

[DYNAMIC CONTENT: intelligenceExample]
```

### Payoff (NEW)
```
Most consulting shows you the menu.
We showed you the kitchen.

Now you know why the food tastes different.
```

### Navigation Cards
```
Card 1: Capabilities (where they just were)
Card 2: About
Card 3: Contact (primary)
```

---

## VARIATION 2: Visited /about

### Hero (Same)
```
THINKING
AS A SERVICE
```

### Contextual Intro (NEW)
```
You just met the team.

Here's what the team is thinking about right now.
```

### Dynamic Proof (DIFFERENT field)
```
[DYNAMIC CONTENT: consultingInsight]
```

### Payoff (NEW)
```
Small team. Big questions.

This is what we're asking this week.
```

### Navigation Cards
```
Card 1: Capabilities
Card 2: About (where they just were)
Card 3: Contact (primary)
```

---

## VARIATION 3: Visited /contact (then returned)

### Hero (Same)
```
THINKING
AS A SERVICE
```

### Contextual Intro (NEW)
```
You came. You looked. You left.

Fair.
```

### Dynamic Proof (DIFFERENT field)
```
[DYNAMIC CONTENT: intelligenceExample]
```

### Payoff (NEW)
```
Decision-making is pattern recognition.

You're still looking for the pattern.
Take your time.
```

### Navigation Cards
```
Card 1: Capabilities
Card 2: About
Card 3: Contact (primary - where they just were)
```

---

## VARIATION 4: Visited Multiple Pages (3+)

### Hero (Same)
```
THINKING
AS A SERVICE
```

### Contextual Intro (NEW)
```
You've been exploring.

We've been tracking patterns.
```

### Journey Map
```
You viewed: [List of pages visited, cleaned up]

Examples:
- "Capabilities, About, Contact"
- "About, Capabilities"
- "Capabilities, About, Mental Models"
```

### Dynamic Proof (DIFFERENT field)
```
[DYNAMIC CONTENT: intelligenceExample]
```

### Payoff (NEW)
```
Here's the pattern: You're not comparison shopping.

You're testing if we think like you think.

The answer is either obvious by now, or we're not a fit.
Both are useful signals.
```

### Navigation Cards (SIMPLIFIED)
```
Only ONE card - primary CTA:

[Large card]
Let's Talk
You're ready.
→ /contact
```

---

## VARIATION 5: Visited Capabilities → Read Services → Returned

### Hero (Same)
```
THINKING
AS A SERVICE
```

### Contextual Intro (NEW)
```
You saw the problems we solve.

Here's the thinking behind the solutions.
```

### Dynamic Proof (DIFFERENT field)
```
[DYNAMIC CONTENT: consultingInsight]
```

### Payoff (NEW)
```
Every service uses the same lens.

Different scale. Different industry. Same structure underneath.
```

### Navigation Cards
```
Card 1: Capabilities
Card 2: About (suggested next)
Card 3: Contact (primary)
```

---

## VARIATION 6: Visited Capabilities → Read Products → Returned

### Hero (Same)
```
THINKING
AS A SERVICE
```

### Contextual Intro (NEW)
```
You saw thinking as code.

Here's why code needs thinking.
```

### Dynamic Proof (DIFFERENT field)
```
[DYNAMIC CONTENT: newsInsight - BUT different framing than first visit]

Label: "The context changes:"
```

### Payoff (NEW)
```
Products scale method.

But method needs context.

This is the context that changes daily.
```

### Navigation Cards
```
Card 1: Capabilities
Card 2: About
Card 3: Contact (primary)
```

---

## DYNAMIC CONTENT STRATEGY (Explorer State)

**Fields to rotate (NEVER use newsInsight again):**
- `intelligenceExample` (most versatile)
- `consultingInsight` (for capabilities-related returns)
- `marketObservation` (if available)

**Field allocation by visited page:**

| Visited Page | Dynamic Field | Why |
|--------------|---------------|-----|
| `/capabilities` | `intelligenceExample` | Shows thinking process |
| `/about` | `consultingInsight` | Team → current analysis |
| `/contact` | `intelligenceExample` | Still evaluating |
| Multiple pages | `intelligenceExample` | Pattern recognition theme |
| Capabilities/Services | `consultingInsight` | Deep dive on approach |
| Capabilities/Products | `newsInsight` (reframed) | Context for code |

---

## COPY PRINCIPLES (All Variations)

### What Changes:
- ✅ Intro text (references their journey)
- ✅ Dynamic content field (never repeat `newsInsight`)
- ✅ Payoff statement (new insight, not repetition)
- ✅ Navigation emphasis (highlights logical next step)

### What Stays:
- Hero (consistent branding)
- Structure (hero → intro → proof → payoff → nav)
- Tone (quiet confidence, zero noise)

### What's GONE:
- ❌ "Intelligence begins where answers end" (they saw it)
- ❌ "Are you asking the right questions?" (they saw it)
- ❌ Philosophy section (they saw it)

---

## NAVIGATION CARD LOGIC

### Standard Configuration (Most Variations)
```
[Card 1] Capabilities
    Consulting & Products

[Card 2] About
    How we think

[Card 3 - PRIMARY] Contact
    Start here
```

### Multi-Page Configuration (3+ pages visited)
```
[SINGLE LARGE CARD]
Let's Talk
You're ready.
→ /contact
```

**Rationale:** If they've visited 3+ pages, they're evaluating seriously. Reduce friction. One clear CTA.

---

## IMPLEMENTATION LOGIC

```typescript
// Pseudo-code for variation selection

if (visitedPages.length === 0) {
  return StrangerHomepage; // First visit
}

if (visitedPages.length >= 3) {
  return MultiPageVariation; // Serious evaluation
}

const lastVisited = visitedPages[visitedPages.length - 1];

switch(lastVisited) {
  case '/capabilities':
    return CapabilitiesVariation;
  case '/about':
    return AboutVariation;
  case '/contact':
    return ContactVariation;
  default:
    return GenericExplorerVariation;
}
```

---

## PSYCHOLOGY

### Why This Works:

**1. Recognition**
- "They noticed where I went"
- Feels personalized, not algorithmic

**2. No Repetition**
- Shows respect for user's time
- Demonstrates they're paying attention

**3. Contextual Insight**
- Each variation adds NEW information
- Builds on what they've already learned

**4. Progressive Commitment**
- Multi-page visitors get simplified CTA
- Reduces decision friction at high-intent stage

### The Sutherland Moment:

**First visit:**
"Interesting positioning. Let me explore."

**Second visit (Explorer state):**
"Wait. The homepage changed."
↓
"They're showing me something different based on where I went."
↓
"This IS the intelligence they're selling."
↓
"Jaw drop."

---

## NOTES

- Each variation uses DIFFERENT dynamic content field
- No variation repeats first-visit content
- Multi-page variation (3+) simplifies to single CTA
- All variations reference user's specific journey
- Copy is shorter, punchier (they've seen the long-form already)

---

## NEXT STATE

If user visits 2+ times (multiple sessions), trigger **Evaluator State** (meta-layer reveal).
