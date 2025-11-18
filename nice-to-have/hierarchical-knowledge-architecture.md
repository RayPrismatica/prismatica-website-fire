# Hierarchical Knowledge Architecture for Athena
**Status:** Future Enhancement
**Priority:** Nice to Have
**Impact:** Massive token efficiency + scalable knowledge base

---

## The Problem

Currently, Athena's knowledge is either:
1. **Baked into core prompt** → Wastes tokens on every message, even if not needed
2. **Loaded from filesystem dynamically** → Better, but still loads entire files
3. **Limited scalability** → Can't add massive wisdom libraries without bloating prompts

**Token accumulation issue:** Once knowledge is fetched, it stays in conversation history. A 50k token deep dive makes every subsequent message expensive.

---

## The Solution: Layered Knowledge on Vercel Blob

Store knowledge in **hierarchical summaries** on Vercel Blob. Athena navigates from general → specific, fetching only what's needed.

### Architecture

```
athena-knowledge/  (on Vercel Blob)
├── _index.json                    (Master index: 200 tokens)
│
├── molecules/
│   ├── _summary.json              (150 tokens - "what molecules exist")
│   ├── demand/
│   │   ├── _summary.json          (50 tokens - quick overview)
│   │   └── full.json              (5000 tokens - complete framework)
│   ├── supply/
│   │   ├── _summary.json          (50 tokens)
│   │   └── full.json              (5000 tokens)
│   ├── friction/
│   ├── value/
│   └── risk/
│
├── services/
│   ├── _summary.json              (300 tokens - all 12 services overview)
│   ├── pioneers-of-purpose/
│   │   ├── _summary.json          (100 tokens - quick pitch)
│   │   └── full.json              (2000 tokens - complete details, pricing, process)
│   ├── esi-framework/
│   ├── strategic-triptych/
│   ├── transaction-architecture/
│   ├── secret-agency/
│   ├── ai-without-hallucination/
│   ├── kso-workshop/
│   ├── go-to-market/
│   ├── creative-that-converts/
│   ├── marketing-reality-check/
│   ├── design-thinking/
│   └── process-surgery/
│
├── mental-models/
│   ├── _summary.json              (200 tokens - all 5 models)
│   ├── demand-model/
│   │   ├── _summary.json          (100 tokens)
│   │   └── full.json              (3000 tokens)
│   ├── incentives-model/
│   ├── agentic-model/
│   ├── prismatic-model/
│   └── triptych-model/
│
├── case-studies/
│   ├── _summary.json              (150 tokens - all 8 cases)
│   ├── warehouse/
│   │   ├── _summary.json          (50 tokens)
│   │   └── full.json              (1500 tokens)
│   ├── search-nobody-needed/
│   ├── push-to-pull/
│   ├── misdiagnosed-bottleneck/
│   ├── 15k-canyon/
│   ├── retail-to-platform/
│   ├── classical-music-running/
│   └── coaching-wave/
│
├── wisdom/                         (NEW - world-class strategic thinking)
│   ├── _summary.json              (200 tokens - "strategic thinking library")
│   ├── strategic-thinking/
│   │   ├── _summary.json          (100 tokens)
│   │   └── full.json              (8000 tokens - deep frameworks)
│   ├── business-physics/
│   │   ├── _summary.json          (100 tokens)
│   │   └── full.json              (6000 tokens)
│   ├── game-theory/
│   └── cognitive-biases/
│
└── pages/                          (Current structure - keep for viewing context)
    ├── homepage.json
    ├── about.json
    ├── solutions.json
    └── ...
```

---

## How Athena Navigates Knowledge

### Layer 1: Always Loaded (Core Prompt)
**~1500 tokens total:**
- Identity, philosophy, tone guidelines (~500 tokens)
- Reading context intelligence instructions (~300 tokens)
- Master index from `_index.json` (~200 tokens)
- Top-level summaries (~500 tokens):
  - `molecules/_summary.json`
  - `services/_summary.json`
  - `mental-models/_summary.json`
  - `case-studies/_summary.json`
  - `wisdom/_summary.json`

**What Athena knows:** "I have molecules, services, mental models, case studies, and strategic wisdom. Here's a 1-sentence summary of each category."

### Layer 2: Category Summaries (Fetched on Demand)
**~50-100 tokens per fetch:**

User: "Tell me about demand"
→ Athena fetches `molecules/demand/_summary.json` (50 tokens)
→ Responds with overview

User: "What services help with marketing?"
→ Athena fetches `services/_summary.json` (300 tokens)
→ Scans all services, identifies KSO Workshop, Go-to-Market, Creative That Converts
→ Responds with recommendations

### Layer 3: Deep Dive (Only When Needed)
**~2000-8000 tokens per fetch:**

User: "Explain the Demand Model in detail with examples"
→ Athena fetches `molecules/demand/full.json` (5000 tokens)
→ Provides comprehensive explanation
→ **This 5000 tokens stays in conversation from now on**

User: "What's the Secret Agency service exactly?"
→ Athena fetches `services/secret-agency/full.json` (2000 tokens)
→ Detailed explanation of pricing, process, outcomes

---

## Token Economics

### Current Approach (All Knowledge in Prompt)
```
Message 1: 25,000 tokens (full knowledge always loaded)
Message 2: 25,000 + prev messages = ~30,000 tokens
Message 3: ~35,000 tokens
Message 10: ~60,000 tokens
```

### Proposed Approach (Layered Knowledge)
```
Message 1: 1,500 tokens (summaries only)
Message 2: 1,500 + prev messages = ~2,000 tokens
Message 3: ~2,500 tokens

[User asks deep question about Demand]
Message 4: 1,500 + 5,000 (demand full) + prev = ~8,000 tokens
Message 5: ~9,000 tokens
Message 10: ~14,000 tokens
```

**Savings:** 60-70% token reduction on typical conversations

**Cost Impact:**
- Light conversation (summaries only): **~$0.01 per 10 messages**
- Medium depth (1-2 deep dives): **~$0.05 per 10 messages**
- Deep expertise (multiple frameworks): **~$0.15 per 10 messages**

---

## Implementation Plan

### Phase 1: Structure Creation ✅ COMPLETED
1. ✅ Created folder structure on Vercel Blob
2. ✅ Wrote `_summary.json` for each category (particles, molecules, services, models, cases, wisdom)
3. ✅ Uploaded to Blob: `athena-knowledge/_index.json` and 6 category summaries
4. ✅ Updated `getKnowledgeContext.ts` to fetch summaries from Blob
5. ✅ Athena now loads ~1500 tokens of knowledge summaries on every conversation
6. ❌ **NOT DONE:** Individual `full.json` files for each item (still need to migrate from .md files)

**Current Status:** Summaries live on Blob, full content still on filesystem. Next phase will migrate full content.

### Phase 2: Full Content Migration (TODO)

**Task:** Migrate all existing knowledge files to Blob with full.json structure

**What Needs Migration:**

1. **Molecules** (5 items):
   - Copy `athena/knowledge/modals/molecule-demand.md` → `athena-knowledge-blob/molecules/demand/full.json`
   - Copy `athena/knowledge/modals/molecule-supply.md` → `athena-knowledge-blob/molecules/supply/full.json`
   - Copy `athena/knowledge/modals/molecule-friction.md` → `athena-knowledge-blob/molecules/friction/full.json`
   - Copy `athena/knowledge/modals/molecule-value.md` → `athena-knowledge-blob/molecules/value/full.json`
   - Copy `athena/knowledge/modals/molecule-risk.md` → `athena-knowledge-blob/molecules/risk/full.json`

2. **Mental Models** (5 items):
   - Copy `athena/knowledge/modals/model-demand.md` → `athena-knowledge-blob/mental-models/demand-model/full.json`
   - Copy `athena/knowledge/modals/model-incentives.md` → `athena-knowledge-blob/mental-models/incentives-model/full.json`
   - Copy `athena/knowledge/modals/model-agentic.md` → `athena-knowledge-blob/mental-models/agentic-model/full.json`
   - Copy `athena/knowledge/modals/model-prismatic.md` → `athena-knowledge-blob/mental-models/prismatic-model/full.json`
   - Copy `athena/knowledge/modals/model-triptych.md` → `athena-knowledge-blob/mental-models/triptych-model/full.json`

3. **Particles** (7 items):
   - Copy `athena/knowledge/modals/particle-time.md` → `athena-knowledge-blob/particles/time/full.json`
   - Copy `athena/knowledge/modals/particle-actors.md` → `athena-knowledge-blob/particles/actors/full.json`
   - Copy `athena/knowledge/modals/particle-resources.md` → `athena-knowledge-blob/particles/resources/full.json`
   - Copy `athena/knowledge/modals/particle-objectives.md` → `athena-knowledge-blob/particles/objectives/full.json`
   - Copy `athena/knowledge/modals/particle-constraints.md` → `athena-knowledge-blob/particles/constraints/full.json`
   - Copy `athena/knowledge/modals/particle-information.md` → `athena-knowledge-blob/particles/information/full.json`
   - Copy `athena/knowledge/modals/particle-incentives.md` → `athena-knowledge-blob/particles/incentives/full.json`

4. **Case Studies** (8 items):
   - Copy from modals: warehouse.md, search.md, push.md, bottleneck.md, canyon.md, platform.md, music.md, coaching.md

5. **Services** (12 items):
   - Extract from `athena/knowledge/pages/solutions.md` or create from component content

6. **Pages** (keep as-is for viewing context):
   - No change needed - still load from filesystem based on viewing history

**Script Needed:**
```bash
# scripts/migrate-knowledge-to-blob.js
# Reads all .md files from athena/knowledge/
# Converts to JSON format
# Uploads to Blob under appropriate paths
```

**Estimated Effort:** 2-3 hours to write migration script and test

### Phase 3: Knowledge Fetching Logic (PARTIALLY DONE)

```typescript
// New function
async function fetchKnowledgeFromBlob(path: string): Promise<string> {
  const blobUrl = process.env.BLOB_URL?.replace('/dynamic-content.json', '');
  const response = await fetch(`${blobUrl}/athena-knowledge/${path}`);
  return response.json();
}

// Updated getKnowledgeContext
export async function getKnowledgeContext(viewingContext: ViewingContext): Promise<string> {
  // Always load top-level summaries
  const summaries = await fetchKnowledgeFromBlob('_index.json');

  // Load viewing context (pages user visited)
  const pageKnowledge = await loadPageKnowledge(viewingContext.pagesVisited);

  return formatContext(summaries, pageKnowledge);
}
```

### Phase 3: Athena Intelligence (Tool/Function)
Give Athena a `fetch_deep_knowledge` tool:

```typescript
{
  name: "fetch_deep_knowledge",
  description: "Fetch detailed knowledge on a specific topic when summaries aren't enough",
  parameters: {
    category: "molecules | services | mental-models | case-studies | wisdom",
    topic: "specific topic name (e.g., 'demand', 'pioneers-of-purpose')"
  }
}
```

**Athena's decision making:**
- User asks general question → Use summaries (already loaded)
- User wants details → Call `fetch_deep_knowledge('molecules', 'demand')`
- User wants pricing for service → Call `fetch_deep_knowledge('services', 'pioneers-of-purpose')`

### Phase 4: Core Prompt Updates
**Remove:** All static knowledge (molecules, services, etc.)
**Add:** Instructions on when to fetch deep knowledge

```markdown
## Knowledge Navigation

You have summaries of all Prismatica knowledge (loaded automatically). When users:
- Ask general questions → Use summaries
- Want specific details → Fetch deep knowledge using fetch_deep_knowledge tool
- Need pricing/process → Fetch service full.json
- Want framework explanation → Fetch model full.json

Be strategic: Don't fetch deep knowledge unless needed. Summaries cover 80% of questions.
```

### Phase 5: Conversation Limits
Add to core prompt:

```markdown
## Conversation Management

Keep conversations focused and efficient:
- Target: 10-15 exchanges for most questions
- After 20 exchanges, suggest: "We've covered a lot. Want to switch to a paid consultation for deeper strategic work?"
- Deep technical discussions accumulate tokens → Natural limit to free tier
```

---

## Benefits

### 1. Massive Token Efficiency
- 60-70% reduction on typical conversations
- Only pay for knowledge actually used
- Summaries cover most questions without deep dives

### 2. Unlimited Knowledge Scaling
- Can add massive wisdom libraries without bloating core prompt
- Each topic self-contained (add/update without touching other topics)
- Easy to maintain (update one JSON file, not entire prompt)

### 3. Natural Conversation Flow
- Start broad, dive deep only when needed
- Matches how humans actually learn (overview → details)
- Token cost matches conversation value (deep expertise = higher cost = fair)

### 4. Clear Upgrade Path
- Free tier: Summaries + 2-3 deep dives per conversation
- After 20 exchanges or 3+ deep dives → Suggest paid tier
- Natural friction that guides high-value users to consulting

### 5. Better User Experience
- Faster responses (smaller prompts)
- More accurate (fetches latest knowledge from Blob)
- Feels more "intelligent" (strategic about what she loads)

---

## Content Creation Requirements

### Summaries to Write (One-Time Effort)

**Top-Level Summaries (~200 tokens each):**
- `molecules/_summary.json` - "The 5 molecular patterns and what they reveal"
- `services/_summary.json` - "All 12 services at a glance: strategy, tech, marketing, process"
- `mental-models/_summary.json` - "5 mental models: Demand, Incentives, Agentic, Prismatic, Triptych"
- `case-studies/_summary.json` - "8 cases showing molecules in action"
- `wisdom/_summary.json` - "Strategic thinking library: business physics, game theory, cognitive patterns"

**Individual Summaries (~50-100 tokens each):**
- 5 molecule summaries
- 12 service summaries
- 5 mental model summaries
- 8 case study summaries
- 4+ wisdom topic summaries

**Total writing effort:** ~30 summaries × 75 words avg = **~2,250 words of summary content**

**Full content:** Already exists (current knowledge files), just needs to be copied to `full.json` structure

---

## Migration Strategy

### Option A: Big Bang (All at Once)
1. Write all summaries in one session
2. Upload entire structure to Blob
3. Update code to fetch from Blob
4. Deploy

**Pros:** Clean cutover, immediate benefits
**Cons:** High upfront effort, risky

### Option B: Gradual Migration
1. Start with molecules (5 summaries)
2. Test with real conversations
3. Add services, then models, then cases
4. Add wisdom library last

**Pros:** Safer, learn as you go
**Cons:** Slower to full benefits

### Option C: Hybrid (Recommended)
1. Create folder structure + `_index.json` (1 hour)
2. Write top-level summaries only (2 hours)
3. Deploy with fallback to current system
4. Fill in individual summaries over time
5. Add wisdom library when ready

**Pros:** Quick win, iterative improvement
**Cons:** None really

---

## Success Metrics

After implementation, track:
- **Average tokens per conversation** (expect 60-70% reduction)
- **Deep knowledge fetches per conversation** (expect 0-2 on average)
- **Conversation length before upgrade suggestion** (target: 15-20 exchanges)
- **User satisfaction** (faster responses, better answers?)

---

## Risks & Mitigations

**Risk 1: Blob fetch latency**
- Mitigation: Cache fetched knowledge in memory for conversation duration
- Mitigation: Pre-fetch likely topics based on viewing history

**Risk 2: Athena fetches too much**
- Mitigation: Clear prompt instructions: "Be conservative with deep fetches"
- Mitigation: Track fetch patterns, tune instructions

**Risk 3: Summaries aren't good enough**
- Mitigation: Start with high-quality summaries (75-100 words each)
- Mitigation: Iterate based on when users need deep dives

**Risk 4: Breaking existing functionality**
- Mitigation: Keep current system as fallback during migration
- Mitigation: A/B test with small % of users first

---

## Future Enhancements

Once core system works:

1. **Wisdom Library Expansion**
   - Add 20+ strategic thinking frameworks
   - Business model patterns
   - Cognitive biases and decision-making
   - Game theory applications

2. **Smart Pre-fetching**
   - Based on viewing history, pre-fetch likely topics
   - Example: User on /about page → pre-fetch mental models summaries

3. **Knowledge Graph**
   - Link related topics (Demand → Friction → Value)
   - Athena suggests: "Since you asked about demand, you might want to explore friction..."

4. **Usage Analytics**
   - Track which knowledge gets fetched most
   - Identify gaps (topics people ask about but we don't have)
   - Optimize summary quality based on fetch patterns

5. **Multi-Language Knowledge**
   - Same structure, different language files
   - `molecules/demand/full-es.json` (Spanish)
   - `molecules/demand/full-fr.json` (French)

---

## Conclusion

This architecture transforms Athena from a fixed-knowledge chatbot into a **strategic knowledge navigator** with:
- Massive scalability (unlimited knowledge without token bloat)
- Natural conversation flow (broad → specific)
- Clear economics (cost matches value)
- Easy maintenance (update JSON files, not code)

**Recommended next step:** Start with Option C (Hybrid) - create structure, write top-level summaries, deploy with fallback, iterate from there.

**Estimated effort:**
- Initial setup: 4-6 hours
- Full implementation: 15-20 hours
- Ongoing maintenance: Minimal (add knowledge as needed)

**ROI:** 60-70% token reduction = significant cost savings at scale, plus ability to add unlimited strategic wisdom without performance penalty.
