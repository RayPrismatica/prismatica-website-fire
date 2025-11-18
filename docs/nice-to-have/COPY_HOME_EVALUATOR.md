# HOME PAGE - EVALUATOR STATE (Deep Returner)
**When:** Multiple sessions OR 4+ page visits in one session
**Objective:** Reveal the meta-layer (expose the adaptation system itself)
**User thinks:** "They're showing me that they're showing me. This IS the thinking."

---

## USER HAS ALREADY SEEN

From previous visits:
- ✅ Stranger state (first visit positioning)
- ✅ Explorer state (contextual homepage based on journey)
- ✅ Multiple pages of content

**They've noticed the homepage changes. Now we tell them why.**

---

## SECTION 1: THE REVEAL

### Hero (Same)
```
THINKING
AS A SERVICE
```

### Meta-Layer Intro
```
This homepage changes based on where you've been.

You noticed. That's the test.
```

---

## SECTION 2: THE EXPLANATION

```
Most sites repeat themselves because they assume you're not paying attention.

We assume the opposite.
```

---

## SECTION 3: THE DATA POINT

### Session Indicator
```
This is your [second/third/fourth/fifth] visit.

You're not browsing. You're deciding.
```

**Dynamic session count:**
- Calculate from localStorage `sessionCount`
- Use ordinal numbers (second, third, fourth, fifth)
- Cap at "fifth" (beyond that, just say "You keep coming back")

---

## SECTION 4: THE INSIGHT

```
The site adapts. The thinking behind it is what you're evaluating.

This IS the intelligence we're selling.
```

---

## SECTION 5: SIMPLIFIED NAVIGATION

### Primary CTA (Large, Prominent)
```
[Button - Red background, large]
Let's Talk
You've seen enough.
→ /contact
```

---

### Secondary Navigation (Smaller, Below)
```
[Two smaller cards side-by-side]

[Card 1]
How It Works
The methodology
→ /about

[Card 2]
What We Offer
Capabilities overview
→ /capabilities
```

---

## ALTERNATIVE VERSION: Keep Coming Back

**For users with 3+ sessions:**

### Hero (Same)
```
THINKING
AS A SERVICE
```

### Repeat Visitor Acknowledgment
```
You keep coming back.

That's either very good or we're terrible at closing.
```

---

### The Real Talk
```
Here's what's probably happening:

You get it. The thinking resonates.

But you're waiting for... something. A sign. Permission. The right moment.

Or maybe you're just not sure if we're the right fit for what you're actually building.
```

---

### The Direct Ask
```
Either way, there's a conversation worth having.

Not a pitch. A diagnostic.

30 minutes. We'll know if we can help. You'll know if we ask good questions.

No commitment. Just clarity.
```

---

### Primary CTA
```
[Button - Red background]
Let's Talk
Book 30 minutes.
→ /contact
```

---

## SECTION 6: PHILOSOPHY CALLBACK (Optional)

**Only for 3+ sessions:**

```
Remember when we said "welcome to the quietest room on the internet"?

You've been here before. You know it's quiet.

Time to break the silence.
```

---

## DYNAMIC CONTENT STRATEGY (Evaluator State)

**DO NOT show dynamic news/market insights at this stage.**

Why:
- User has seen multiple dynamic content pieces
- This state is about THE SYSTEM, not the content
- Meta-layer reveal is the dynamic content itself

**Exception:**
If you must include dynamic content, use it differently:

```
[Section: "What's Changed Since Your Last Visit"]

[DYNAMIC CONTENT: newsInsight]

This updates every 6 hours. The thinking adapts continuously.
That's how we work with clients too.
```

---

## COPY VARIATIONS BY SESSION COUNT

### Session 2 (Just Noticed the Pattern)
```
This is your second visit.

First visit: We showed you what we do.
Second visit: We showed you how we see you.

That's the difference between content and intelligence.
```

---

### Session 3 (Seriously Evaluating)
```
This is your third visit.

Most people decide in two.

You're either very thorough, or we're not making the case clearly enough.

Let's find out which.
```

---

### Session 4+ (Time for Real Talk)
```
This is your fourth visit.

We respect diligence. But at some point, more information isn't the blocker.

The question isn't "Do I have enough data?"

The question is "Is this the right move right now?"

Only one way to answer that.
```

---

## NAVIGATION LOGIC

### Standard Evaluator (Sessions 2-3)
```
PRIMARY: Let's Talk → /contact
SECONDARY: About, Capabilities
```

### Deep Evaluator (Sessions 4+)
```
ONLY PRIMARY: Let's Talk → /contact

(Remove secondary navigation)
```

**Rationale:** After 4 visits, additional navigation is procrastination. Drive to decision.

---

## PSYCHOLOGY

### Why This Works:

**1. Transparency**
- Revealing the system builds trust
- "They're not hiding the mechanism"

**2. Flattery Through Attribution**
- "You noticed" = compliment to user's intelligence
- Makes them feel smart for catching it

**3. Proof Through Meta-Layer**
- The homepage adaptation IS the product demo
- Showing the system = showing the thinking

**4. Progressive Pressure (Respectful)**
- Session 2: "You noticed" (neutral)
- Session 3: "You're thorough" (positive)
- Session 4: "Time to decide" (gentle push)

### The Reeves Reality Check:

**Bad advertising says:**
"We're intelligent. Trust us."

**Good advertising shows:**
"The homepage adapted to you. See the intelligence?"

**Great advertising reveals:**
"Here's HOW it adapted and WHY. That's how we think."

---

## IMPLEMENTATION NOTES

### Session Detection
```typescript
// From localStorage
const sessionCount = getSessionCount();
const visitedPages = getVisitedPages();

if (sessionCount >= 4) {
  return DeepEvaluatorHomepage;
} else if (sessionCount >= 2 || visitedPages.length >= 4) {
  return EvaluatorHomepage;
}
```

### Copy Selection
```typescript
const ordinals = ['first', 'second', 'third', 'fourth', 'fifth'];
const sessionOrdinal = sessionCount <= 5
  ? ordinals[sessionCount - 1]
  : 'fifth-plus';

if (sessionOrdinal === 'fifth-plus') {
  copy = "You keep coming back.";
} else {
  copy = `This is your ${sessionOrdinal} visit.`;
}
```

---

## CRITICAL SUCCESS FACTOR

**This state must feel like:**
- A reveal, not a trick
- Transparency, not manipulation
- Intelligence, not algorithms
- Respect, not pressure

**Bad tone:**
"Caught you! We tracked you!"

**Good tone:**
"You noticed the pattern. That's exactly what we do."

---

## CLOSING PRINCIPLE

**Sutherland's Costly Signaling:**

Most sites don't bother tracking user journeys and adapting content because it's complex and expensive.

By revealing that we DID it, we signal:
1. We have the technical capability
2. We care enough to build it
3. We respect user intelligence enough to show it

The reveal IS the close.

---

## NEXT STEPS

After Evaluator state, user either:
1. **Converts** → Contacts via /contact
2. **Leaves forever** → Not a fit (that's fine)
3. **Keeps returning** → Run "Deep Evaluator" variant with direct challenge

No need for State 4. Three states are sufficient:
- **Stranger:** Prove capability
- **Explorer:** Demonstrate awareness
- **Evaluator:** Reveal the system

Beyond this, it's either a conversion or it's not meant to be.
