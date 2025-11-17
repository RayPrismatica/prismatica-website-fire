# CMO Advisor - Prismatica Labs Marketing Leadership

A comprehensive marketing skill system for strategic marketing leadership with specialized sub-skills for execution.

## Overview

The **CMO Advisor** embodies the Chief Marketing Officer function for Prismatica Labs, providing:
- High-level strategic vision and mission
- Brand positioning and voice enforcement
- Coordinated marketing execution across channels
- Performance measurement and optimization

## Architecture

```
cmo-advisor/
├── SKILL.md                          # Main CMO advisor with vision/mission
├── README.md                         # This file
├── references/                       # Reference materials
│   ├── README.md
│   ├── messaging-frameworks.md
│   ├── competitive-landscape.md
│   └── content-templates.md
└── sub-skills/                       # Specialized marketing functions
    ├── brand-voice-enforcer/         # Voice and identity consistency
    ├── content-strategist/           # Content planning and creation
    ├── market-researcher/            # Competitive and market intelligence
    ├── campaign-planner/             # Integrated campaign design
    └── seo-optimizer/                # Search optimization and visibility
```

## How It Works

### 1. High-Level Strategy (CMO Advisor)

The CMO advisor provides:
- **Vision & Mission**: Strategic direction aligned with business objectives
- **Brand Positioning**: "Strategic consulting for the intelligence age"
- **Decision Framework**: Prioritization and resource allocation
- **Coordination**: Orchestrates sub-skills for cohesive execution

**Invoke when:**
- Developing overall marketing strategy
- Making strategic marketing decisions
- Coordinating cross-channel initiatives
- Reviewing brand consistency

### 2. Specialized Execution (Sub-Skills)

Each sub-skill handles specific marketing functions:

#### Brand Voice Enforcer
**Purpose:** Ensure all content reflects "quiet confidence, zero noise, maximum clarity"

**Use for:**
- Reviewing copy for brand consistency
- Editing marketing materials
- Validating tone and visual identity

**Example:**
```
Use the brand-voice-enforcer skill to review this blog post for brand consistency
```

#### Content Strategist
**Purpose:** Plan and create content across all channels

**Use for:**
- Content calendars and planning
- Blog posts, case studies, whitepapers
- Email campaigns and newsletters
- Website copy and social media

**Example:**
```
Use the content-strategist skill to create a blog post about AI-augmented strategic consulting
```

#### Market Researcher
**Purpose:** Competitive analysis and market intelligence

**Use for:**
- Analyzing competitors
- Researching market trends
- Validating positioning
- Understanding target audiences

**Example:**
```
Use the market-researcher skill to analyze our top 3 competitors in the AI consulting space
```

#### Campaign Planner
**Purpose:** Design and execute integrated campaigns

**Use for:**
- Product launches
- Lead generation campaigns
- Multi-channel initiatives
- Campaign measurement

**Example:**
```
Use the campaign-planner skill to design a launch campaign for the ESI product
```

#### SEO Optimizer
**Purpose:** Optimize for search visibility and organic discovery

**Use for:**
- Keyword research
- On-page SEO optimization
- Technical SEO recommendations
- Search performance tracking

**Example:**
```
Use the seo-optimizer skill to optimize the consulting services page for search
```

## Core Marketing Principles

### Brand Foundation

**Vision:**
> Prismatica Labs exists to make complexity simple for organizations navigating strategic inflection points.

**Positioning:**
> Strategic consulting for the intelligence age.

**Differentiators:**
1. Intelligence products, not just reports
2. AI-augmented, human-led delivery
3. Hybrid product + consulting model
4. Systematic methodology that compounds

**Brand Voice:**
> Quiet confidence. Zero noise. Maximum clarity.

- Intellectual, not emotional
- Precision over persuasion
- Direct, not blunt
- Professional, not corporate

### Target Audience

**Primary:** C-suite executives (CEO, COO, Chief Strategy Officer)
**Secondary:** Senior strategy leaders (VP Strategy, Corporate Development)

**Characteristics:**
- Time-constrained, high information consumption
- Values clarity and precision
- Skeptical of traditional consulting
- Expects ROI, not just insights

### Marketing Strategy

**Content-First Approach:**
- Thought leadership over promotion
- Teach, don't sell
- Evidence-based, not claims-based
- Quality over quantity

**Channel Mix:**
- Website/Blog (owned content hub)
- Email (direct relationship)
- LinkedIn (primary social platform)
- Industry publications (earned media)

**Success Metrics:**
- Brand awareness (organic traffic, search volume)
- Lead generation (MQLs from content)
- Pipeline impact (marketing-sourced deals)
- Thought leadership (speaking, media mentions)

## Common Workflows

### Workflow 1: Create Content

**Scenario:** Write a blog post about AI in strategic consulting

**Process:**
1. **CMO Advisor**: Define strategic objectives and positioning angle
2. **SEO Optimizer**: Research keywords and competitive content
3. **Content Strategist**: Draft comprehensive article
4. **Brand Voice Enforcer**: Review for voice and clarity
5. **SEO Optimizer**: Optimize on-page elements
6. **CMO Advisor**: Final approval and distribution strategy

### Workflow 2: Launch Product

**Scenario:** Launch ESI (Executive Strategic Intelligence) product

**Process:**
1. **CMO Advisor**: Define launch strategy and success criteria
2. **Market Researcher**: Validate positioning and competitive landscape
3. **Campaign Planner**: Develop integrated launch campaign
4. **Content Strategist**: Create launch content (page, emails, social, blog)
5. **SEO Optimizer**: Optimize product page for search
6. **Brand Voice Enforcer**: Review all materials for consistency
7. **CMO Advisor**: Coordinate execution and measure results

### Workflow 3: Review Existing Content

**Scenario:** Audit homepage for brand consistency

**Process:**
1. **CMO Advisor**: Define audit criteria
2. **Brand Voice Enforcer**: Analyze voice and tone
3. **SEO Optimizer**: Check search optimization
4. **Market Researcher**: Compare positioning vs. competitors
5. **CMO Advisor**: Prioritize improvements
6. **Content Strategist**: Execute revisions

### Workflow 4: Plan Campaign

**Scenario:** Generate leads through whitepaper

**Process:**
1. **CMO Advisor**: Set campaign objectives and budget
2. **Market Researcher**: Identify target audience pain points
3. **Content Strategist**: Create whitepaper content
4. **Campaign Planner**: Design promotion and nurture strategy
5. **SEO Optimizer**: Optimize landing page
6. **Brand Voice Enforcer**: Final review
7. **CMO Advisor**: Approve and launch

## Integration with Prismatica Systems

### Dynamic Content Awareness

The CMO advisor understands Prismatica's AI-generated dynamic content system:
- Content updates every 6 hours based on current news
- Ensures marketing messaging can reference market context
- Maintains consistency between website and marketing materials

**Files:**
- `data/dynamic-content.json` - Website content cache
- `athena/knowledge/pages/dynamic-content.md` - Athena's knowledge base

### Athena AI Chat

Ensures Athena's responses align with marketing messaging:
- Brand voice consistency
- Accurate value proposition articulation
- Reinforcement of key messages

**System Prompt:** `scripts/prompts/athena-chat.md`

### Visual Identity

All marketing adheres to visual design system:
- Prismatica Red (#D43225) for strategic accents
- Typography (Noto Sans, Passion One)
- Layout and spacing standards
- Component patterns

**Reference:** `PrismaticaSoul/VISUAL_IDENTITY.md`

## Quick Reference

### Invoke CMO Advisor

```
Can you help me develop a marketing strategy for Q2?
```

### Invoke Sub-Skills

```
Use the brand-voice-enforcer skill to review this email copy

Use the content-strategist skill to plan a content calendar for April

Use the market-researcher skill to analyze the competitive landscape

Use the campaign-planner skill to design a lead generation campaign

Use the seo-optimizer skill to conduct keyword research for our services pages
```

### Coordinate Multiple Sub-Skills

```
I need to create a blog post about AI consulting:
1. Use market-researcher to identify audience pain points
2. Use seo-optimizer to find target keywords
3. Use content-strategist to draft the post
4. Use brand-voice-enforcer to review for consistency
```

## Success Metrics

The CMO skill system is successful when:

✅ **Brand Consistency**: All materials reflect "quiet confidence, zero noise"
✅ **Strategic Alignment**: Marketing supports "intelligence age" positioning
✅ **Pipeline Impact**: Generates qualified C-suite conversations
✅ **Thought Leadership**: Prismatica recognized as authority in AI-augmented strategy
✅ **Efficiency**: Sub-skills work cohesively without duplication
✅ **Measurement**: Clear ROI and performance tracking

## Best Practices

### 1. Start with Strategy
Always begin with CMO Advisor for strategic direction before tactical execution.

### 2. Maintain Voice Consistency
Run all content through brand-voice-enforcer before publishing.

### 3. Measure Everything
Set clear success metrics before launching any initiative.

### 4. Coordinate Sub-Skills
Use multiple sub-skills together for comprehensive solutions.

### 5. Quality Over Quantity
Better to publish one excellent piece than five mediocre ones.

### 6. Audience-First
Every decision should prioritize C-suite executives' needs and preferences.

## Getting Started

**New to the CMO skill system?**

1. Read `SKILL.md` for vision, mission, and strategy
2. Review `PrismaticaSoul/VISUAL_IDENTITY.md` for brand identity
3. Explore sub-skill SKILL.md files for specialized capabilities
4. Start with a simple task (e.g., review existing content)
5. Graduate to complex workflows (e.g., product launch)

**Questions?**

- Check relevant sub-skill documentation
- Review references/ folder for templates and frameworks
- Consult CLAUDE.md for project context

---

**Remember:** The CMO skill embodies Prismatica's marketing leadership. Every decision should ask: "Does this make complexity simple for our audience?"

**Brand Philosophy:**
> "The brand is intellectual, not emotional. Precision over persuasion."
