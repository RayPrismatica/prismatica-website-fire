# Athena Intelligence System

**Date:** November 16, 2025 (Updated Architecture)
**Purpose:** Capture behavioral intelligence and enable session continuity for Athena conversations
**Status:** Layer 1 IMPLEMENTED ✅ | Layer 2 PLANNED

---

## Overview

Athena's intelligence system operates on two distinct layers, each with different privacy implications and value propositions:

**Layer 1 - Anonymous Intelligence** ✅ ACTIVE
Post-conversation analysis that captures behavioral patterns, language resonance, and strategic insights. No personal information, completely anonymous. Implemented and running.

**Layer 2 - Named Session Notes** 📋 PLANNED
Full conversation context stored under the user's name, enabling true continuity when they return. This creates the "actual relationship, not a chatbot" experience. Not yet implemented.

---

## Layer 1: Anonymous Intelligence

### What Gets Captured

- **Problem Types:** What challenges people bring to Athena
- **Language Patterns:** How people describe their situations, what terminology resonates
- **Engagement Patterns:** Where conversations get stuck, what questions land, what doesn't resonate
- **Concept Resonance:** Which mental models click, which need better explanation
- **Navigation Patterns:** What pages people are on when they engage, where they go after
- **Question Effectiveness:** Which of Athena's questions unlock clarity vs create confusion
- **Conversion Indicators:** Signs someone is moving from exploration to decision

### What Does NOT Get Captured

- Names
- Email addresses
- Company names
- Specific situations or details
- Any personally identifiable information

### Storage Structure (IMPLEMENTED)

```
athena/intel/
├── layer1/                           # Anonymous intelligence
│   ├── raw-conversations/            # Full conversation transcripts (JSON)
│   │   └── 2025-11-16/
│   │       ├── conversation-14-23-45.json
│   │       └── conversation-16-42-12.json
│   ├── summaries/                    # Athena's analysis (Markdown)
│   │   └── 2025-11-16/
│   │       ├── conversation-14-23-45.md
│   │       └── conversation-16-42-12.md
│   └── weekly-briefs/                # Aggregated insights (future)
│       └── 2025-week-46.md
└── layer2/                           # Named sessions (not yet implemented)
    └── sessions/
        └── 2025-11/
            └── [future implementation]
```

### Data Format

Each daily file contains:
```markdown
# Daily Intelligence: 2025-11-16

## Conversations: 23

## Problem Types Mentioned
- Supply chain friction: 5
- Market positioning: 3
- Internal alignment: 8
- Demand generation: 4
- Other: 3

## High-Resonance Moments
- When Athena used "Water finds its way" analogy for incentives → user said "exactly"
- Breaking down demand into Actors + Objectives + Information → led to breakthrough

## Low-Resonance Moments
- Prismatic model explanation felt abstract without concrete example
- User asked "what does that mean practically?" 3 times in one conversation

## Questions That Landed
- "Does this problem evolve as you think about it?"
- "What happens when you're not in the room?"

## Questions That Confused
- "How do constraints interact with your objectives?" (too academic)

## Conversion Signals
- 4 users asked about consulting pricing
- 2 users clicked through to contact page after conversation
- 1 user said "I need to bring this to my team"

## New Patterns Observed
- Users struggling with "strategy vs tactics" distinction
- Need better bridge from mental models to practical application
```

### Implementation (ACTIVE)

**How It Works:**

1. **During Conversation** (`/api/chat`)
   - Each message exchange saves full conversation transcript to JSON file
   - File: `athena/intel/layer1/raw-conversations/YYYY-MM-DD/conversation-HH-MM-SS.json`
   - Contains: messages array, timestamp, pathname, conversation ID

2. **When Chat Closes** (`components/GlobalAthenaChat.tsx`)
   - Frontend triggers `/api/chat/end` endpoint with conversation ID
   - Only triggers if conversation has 6+ messages (3+ real exchanges)
   - Non-blocking call (doesn't slow down UX)

3. **Post-Conversation Analysis** (`/api/chat/end`)
   - Reads conversation transcript
   - Sends to Athena (Claude Sonnet 4.5) with analysis prompt
   - Athena writes comprehensive markdown summary
   - File: `athena/intel/layer1/summaries/YYYY-MM-DD/conversation-HH-MM-SS.md`

4. **Analysis Prompt** (`athena/prompts/conversation-analysis.md`)
   - Structured template for capturing insights
   - Privacy-first: explicitly forbids PII
   - Focuses on: problem types, resonance moments, confusion points, questions that worked, conversion signals, language patterns, knowledge gaps

**Current Status:**
- ✅ Conversation transcript saving
- ✅ Post-chat analysis trigger
- ✅ Athena analysis prompt
- ✅ Summary generation
- 📋 Weekly aggregation (planned)
- 📋 Analytics dashboard (planned)

---

## Layer 2: Named Session Notes

### What Gets Captured

- Full conversation history with context
- User's actual situation and challenges
- What was uncovered together
- Where the conversation left off
- Action items or hypotheses to test
- Athena's strategic observations about the user's situation

### Permission Model

**When Permission is Asked:**
After value has been established (typically 3-4 meaningful exchanges), Athena asks naturally:

> "This has been useful. Want me to keep notes so when you come back we can pick up where we left off? Otherwise this stays between us for this session only."

**What Permission Enables:**
- Session storage under the user's name
- Ability to resume conversations seamlessly
- "Last time we were working through X and you were going to test Y" continuity

**User Control:**
- Explicit opt-in required
- Can request deletion at any time
- Can see their notes on request

### Storage Structure

```
athena/sessions/
├── 2025-11/
│   ├── john-smith-acme-corp.md
│   ├── sarah-chen-techstart.md
│   └── michael-ross-consultant.md
└── 2025-12/
    └── [continues monthly organization]
```

### Session File Format

```markdown
# Session: John Smith - Acme Corp

**First Contact:** 2025-11-16
**Last Updated:** 2025-11-18
**Total Conversations:** 3
**Permission Granted:** Yes (2025-11-16)

---

## User Context

**Name:** John Smith
**Company:** Acme Corp (B2B SaaS, Series B)
**Role:** Head of Product
**Initial Problem:** Market positioning confusion - not sure if product/market fit or messaging issue

---

## Conversation History

### Session 1: 2025-11-16 (14:23 GMT)

**What Brought Them In:**
Saw Prismatica's demand model on the site. Struggling with stagnant growth despite "doing everything right" - content marketing, paid ads, sales outreach.

**Key Exchanges:**
- Asked: "Does this problem evolve as you think about it?" → Response: "Constantly. We keep changing our hypothesis about what's wrong."
- Identified: Classic Demand issue (Actors + Objectives + Information misalignment)
- Breakthrough moment: When explained that their Information (how they describe the product) doesn't match their Actors' Objectives (what customers actually need solved)

**Where We Left Off:**
Going to map their current messaging against actual customer conversations from last 3 months. Looking for language gaps between what they say and what customers ask for.

**Athena's Strategic Notes:**
- This isn't a product problem, it's a translation problem
- They have product/market fit with 20% of their audience, terrible fit with the other 80% they're targeting
- Need to either narrow Actors or expand product to match broader Objectives

---

### Session 2: 2025-11-18 (09:45 GMT)

**What They Shared:**
Did the exercise. Found that 70% of their messaging talks about "workflow optimization" but 70% of customer conversations are about "team alignment." Same underlying product, completely different framing.

**Key Exchanges:**
- Discussed whether to pivot messaging or build new features
- Used Transaction Architecture lens: customers buy alignment, experience optimization
- The gap between what they buy (alignment promise) and what they experience (optimization tool) is causing churn

**Where We Left Off:**
Testing hypothesis: reframe entire product around "alignment" instead of "optimization." Going to A/B test landing pages before rebuilding anything.

**Next Session Goals:**
- Review A/B test results
- If hypothesis validates, discuss consulting engagement for full repositioning
- If not, dig deeper into what customers actually want vs what they say they want

**Athena's Strategic Notes:**
- This is a textbook case for Transaction Architecture consulting (£15k, 5 weeks)
- They're self-aware enough to test before committing
- High probability of converting to consulting client if test validates

---

## Conversion Status

**Current Stage:** Exploration → Testing → Decision pending
**Likely Path:** Transaction Architecture consulting
**Timeline:** Decision expected after A/B test (2 weeks)
**Engagement Signals:** High - doing the work between sessions, clear hypothesis testing

---

## Privacy Notes

- Permission granted: 2025-11-16
- User aware notes are stored
- Can request deletion anytime via email to hello@prismatica-labs.com
```

### Implementation

**Session Storage Tool:**
- Athena has access to `save_session_notes` tool (only after permission granted)
- Tool writes markdown files to `athena/sessions/{YYYY-MM}/`
- Filenames: sanitized name + company slug for easy identification

**Session Retrieval:**
- When user returns, Athena checks for existing session file
- If found, loads previous context before responding
- Opens with: "Welcome back. Last time we were working through [X]..."

**Permission Flow:**
1. User engages with Athena (no storage yet)
2. After 3-4 meaningful exchanges, Athena offers continuity
3. User agrees → Athena asks for name
4. Tool activates, session gets saved
5. Future visits: automatic context loading

---

## Privacy & Security

### Layer 1 (Anonymous)
- No personal data collected
- Aggregated patterns only
- No way to trace back to individual users
- Stored indefinitely for intelligence improvement

### Layer 2 (Named)
- Explicit opt-in required
- User controls their data
- Can request to see notes anytime
- Can request deletion anytime
- Stored in plaintext markdown (not database)
- Access restricted to authorized team members only

### Security Protocol
- Session files stored server-side only
- Not accessible via public URLs
- Requires server filesystem access to view
- Team verification code required for Athena to discuss internal matters

---

## Value Proposition

### For Users (Layer 2)
- True conversational continuity
- No need to re-explain context on return visits
- Athena remembers where you left off and what you were testing
- Feels like working with a human advisor, not a chatbot

### For Prismatica (Both Layers)

**Layer 1 Intelligence:**
- Real-time feedback on what messaging works
- Identify gaps in Athena's knowledge base
- Spot emerging patterns in market problems
- Refine mental models based on what resonates
- Improve question patterns that unlock clarity

**Layer 2 Intelligence:**
- Understand decision journeys from first contact to conversion
- Identify high-intent prospects before they explicitly signal
- Personalized follow-up based on actual conversation context
- Convert exploratory conversations into consulting engagements
- Build relationship history that compounds over time

---

## Future Enhancements

### Potential Layer 1 Additions
- Sentiment analysis on concept resonance
- Time-to-clarity metrics (how many exchanges until breakthrough)
- Path analysis (which pages + conversations → conversions)
- A/B testing different question patterns

### Potential Layer 2 Additions
- Email notifications when high-intent users return
- Automatic CRM sync for sales handoff
- Smart suggestions for which consulting service fits best
- Athena proactively reaching out: "You were testing X - how did it go?"

---

## Implementation Timeline

**Phase 1: Layer 1 Anonymous Intelligence** (Week 1)
- Set up analytics folder structure
- Build conversation logging system
- Create daily aggregation script
- Test pattern recognition

**Phase 2: Layer 2 Session Storage** (Week 2)
- Build session storage tool for Athena
- Add permission request flow to prompts
- Implement session retrieval on return visits
- Test continuity experience

**Phase 3: Intelligence Synthesis** (Week 3)
- Weekly intelligence brief automation
- Insight categorization
- Dashboard for reviewing patterns
- CRM integration (optional)

---

## Questions to Resolve

1. **Session Identification:** How do we identify returning users?
   - Ask for name/email when permission granted?
   - Browser fingerprinting (IP + User-Agent hash)?
   - Give them a unique session code?

2. **Data Delivery:** What happens to Layer 2 data?
   - Auto-email new sessions to team?
   - Daily digest?
   - Manual review only?

3. **Retention Policy:** How long do we keep Layer 2 sessions?
   - Indefinitely?
   - Delete after 6 months of inactivity?
   - Let users set their own retention?

4. **Analytics Depth:** For Layer 1, how deep do we go?
   - Just high-level patterns?
   - Detailed behavioral analysis?
   - Predictive modeling for conversion likelihood?

---

**Status:** Design phase - awaiting implementation decisions
