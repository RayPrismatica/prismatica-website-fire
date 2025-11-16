# AI-Generated Contextual UX Prompts

## Overview
Enhance the Athena bottom sheet with AI-generated, deeply contextual prompts that evolve based on user behavior and session data.

## Current Implementation
- Simple template-based prompts: `Want to explore ${serviceName} for your situation?`
- Real-time DOM extraction from visible service boxes
- Zero API costs, instant, reliable

## Future Vision

### 1. AI-Generated Contextual Prompts
Instead of template-based prompts, use Claude to generate compelling, unique questions for each service based on:
- Service description
- Target audience
- User journey stage
- Page context

**Example transformations:**
- Current: "Want to explore Pioneers of Purpose for your situation?"
- AI-generated: "Ready to discover what drives your organization beyond profit?"

- Current: "Want to explore ESI Framework for your situation?"
- AI-generated: "Want to see how intelligence compounds in your market?"

### 2. UX Master Model
Build a specialized Claude model that:
- **Tracks user session data**: What they viewed, how long, scroll patterns
- **Records contextual state**: Which services they focused on, in what order
- **Learns patterns**: Common user journeys, drop-off points, engagement signals
- **Generates adaptive prompts**: Questions that guide users based on their behavior

**Session tracking:**
```typescript
interface SessionContext {
  viewedServices: string[];
  timeOnService: Record<string, number>;
  scrollDepth: number;
  previousPages: string[];
  engagementSignals: {
    expandedBottomSheet: boolean;
    startedConversation: boolean;
    viewedMultipleServices: boolean;
  };
}
```

**Adaptive prompt generation:**
- First service viewed: "Want to explore X?"
- After viewing 3+ services: "See how these approaches connect?"
- Long time on one service: "Ready to dive deeper into X?"
- Returned visitor: "Back to continue exploring X?"

### 3. Caching & Generation Strategy
- **Build-time generation**: Generate prompts during content generation (6-hour cycle)
- **Cache in dynamic-content.json**: Store alongside other dynamic content
- **Fallback gracefully**: If generation fails, use template-based prompts
- **A/B test effectiveness**: Track which prompts lead to chat engagement

### 4. Implementation Approach

**Phase 1: Basic AI Prompts**
- Add prompt generation to `scripts/generate-dynamic-content.js`
- Generate one unique prompt per service/product
- Cache alongside existing dynamic content
- Use in MobileBottomSheetAthena when available

**Phase 2: Session Awareness**
- Add client-side session tracking
- Store in localStorage/sessionStorage
- Send context with chat API requests
- Use for prompt selection logic

**Phase 3: UX Master Model**
- Dedicated Claude model with UX optimization prompt
- Analyzes session patterns across users
- Generates hypothesis-driven prompts
- Measures conversion to chat engagement

### 5. Success Metrics
- **Engagement rate**: % of users who expand bottom sheet
- **Conversation starts**: % who click "Start Conversation"
- **Prompt relevance**: Subjective quality of AI-generated prompts
- **Performance**: Generation time, cache hit rate, API costs

### 6. Considerations
- **API costs**: Additional Claude API calls for prompt generation
- **Complexity**: More moving parts, potential failure points
- **Maintenance**: Prompt quality monitoring and iteration
- **Privacy**: Session tracking must be transparent and ethical

## Why Not Now?
Current implementation is:
- Simple, fast, reliable
- Zero additional costs
- Already better than 99% of websites
- Delivers the core magical experience

Save this for v2 when you have:
- More users to justify complexity
- Session data to analyze and learn from
- Budget for additional API usage
- Time to build and iterate properly

## Priority: Nice to Have
Ship the simple version first. Get real user feedback. Then enhance with AI if data shows it's valuable.
