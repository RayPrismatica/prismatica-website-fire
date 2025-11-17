# Prismatica Labs - Skills Overview

This document provides an overview of all custom skills available for the Prismatica Labs project.

## Available Skills

### 1. CMO Advisor (`cmo-advisor/`)

**Purpose:** Complete marketing leadership system with strategic vision and specialized execution capabilities.

**When to use:**
- Developing marketing strategy
- Creating or reviewing brand messaging
- Planning content or campaigns
- Making marketing decisions
- Coordinating cross-channel initiatives

**Architecture:**
- **Main Skill**: High-level CMO with vision/mission, brand strategy
- **Sub-Skills**: 5 specialized marketing functions

**Sub-Skills:**
1. **brand-voice-enforcer** - Voice and identity consistency
2. **content-strategist** - Content planning and creation
3. **market-researcher** - Competitive and market intelligence
4. **campaign-planner** - Integrated campaign design
5. **seo-optimizer** - Search optimization

**Example Usage:**
```
Use the cmo-advisor skill to develop our Q2 marketing strategy

Use the brand-voice-enforcer skill to review this blog post

Use the content-strategist skill to create a case study
```

**Read more:** `.claude/skills/cmo-advisor/README.md`

---

### 2. Jony Ive Design Philosophy (`ive-design-philosophy/`)

**Purpose:** Analyze and redesign UI/UX based on Jony Ive's design philosophy.

**When to use:**
- Analyzing existing designs for minimalist principles
- Redesigning interfaces for simplicity and clarity
- Evaluating design decisions against Ive's methodology
- Reviewing attention to detail in components
- Planning design systems

**Core Principles:**
1. Simplicity as Complexity Resolved
2. Care and Craftsmanship
3. Material Authenticity and Consistency
4. User-Centric Design
5. Obsessive Attention to Detail
6. Less, But Better (Dieter Rams influence)

**Includes:**
- Comprehensive research compendium (references/)
- Automated design system analysis script (scripts/)
- 6-step evaluation workflow
- Component-by-component redesign framework

**Example Usage:**
```
Use the ive-design-philosophy skill to analyze the homepage design

Use the ive-design-philosophy skill to evaluate our BentoBox component
```

**Read more:** `.claude/skills/ive-design-philosophy/SKILL.md`

---

### 3. Bento Content Creator (`bento-content-creator/`)

**Purpose:** Interactive guidance for creating BentoBox content for services and products.

**When to use:**
- Creating new service bento boxes
- Determining what content goes in a bento
- Planning product showcase cards
- Structuring consulting service descriptions

**Approach:**
- Strategic questioning to uncover content needs
- Guidance for services, products, and navigation cards
- Integration with BentoBox component system

**Example Usage:**
```
Use the bento-content-creator skill to help me create a new service bento

I need to add a new product - use bento-content-creator to figure out the content
```

**Read more:** `.claude/skills/bento-content-creator/` (managed skill)

---

### 4. Skill Creator (`skill-creator/`)

**Purpose:** Guide for creating effective custom skills that extend Claude's capabilities.

**When to use:**
- Creating new skills
- Updating existing skills
- Learning skill best practices
- Understanding skill architecture

**Provides:**
- Skill creation process (6 steps)
- Best practices and templates
- Progressive disclosure design principles
- Validation and packaging tools

**Example Usage:**
```
Use the skill-creator skill to help me create a new analytics skill
```

**Read more:** `.claude/skills/skill-creator/SKILL.md`

---

## Skill Relationships

```
prismatica-app/
└── .claude/skills/
    ├── cmo-advisor/                    ← Marketing leadership system
    │   ├── SKILL.md                   ← Main CMO with vision/mission
    │   ├── sub-skills/                ← Specialized execution
    │   │   ├── brand-voice-enforcer/
    │   │   ├── content-strategist/
    │   │   ├── market-researcher/
    │   │   ├── campaign-planner/
    │   │   └── seo-optimizer/
    │   └── references/                ← Marketing frameworks
    │
    ├── ive-design-philosophy/         ← UI/UX analysis & redesign
    │   ├── SKILL.md                   ← Main design principles
    │   ├── references/                ← Comprehensive research
    │   └── scripts/                   ← Automated analysis tools
    │
    ├── bento-content-creator/         ← Bento box content guidance
    │
    └── skill-creator/                 ← Skill creation guide
```

## Hierarchical Skills

The **CMO Advisor** demonstrates a hierarchical skill architecture:

**Level 1: Strategic Leadership (CMO Advisor)**
- Vision, mission, brand strategy
- Decision-making framework
- Cross-functional coordination

**Level 2: Specialized Execution (Sub-Skills)**
- Brand voice enforcement
- Content creation
- Market research
- Campaign planning
- SEO optimization

**Benefits:**
- Strategic coherence maintained at top level
- Tactical expertise in specialized domains
- Modular and reusable components
- Clear separation of concerns

## Integration with Project

### CMO Advisor + Visual Identity

The CMO skill system integrates with:
- `PrismaticaSoul/VISUAL_IDENTITY.md` - Complete visual design system
- `CLAUDE.md` - Project architecture and guidelines
- Dynamic content system (`data/dynamic-content.json`)
- Athena AI chat (`scripts/prompts/athena-chat.md`)

### Ive Design Philosophy + Visual Identity

The Ive skill can analyze Prismatica's design against:
- Visual identity guidelines
- Component design patterns (BentoBox, etc.)
- Tailwind CSS design system
- Interactive states and animations

### Bento Content Creator + BentoBox Component

Works with:
- `components/BentoBox.tsx` - Universal bento component
- `components/BentoBox.README.md` - Component documentation
- `BENTO_BOX_SPEC.md` - Component specification

## When to Use Which Skill

### Marketing & Content

**Use CMO Advisor when:**
- Strategic marketing decisions
- Brand consistency questions
- Cross-channel coordination
- Marketing ROI and measurement

**Use specific sub-skills when:**
- `brand-voice-enforcer`: Reviewing copy
- `content-strategist`: Creating content
- `market-researcher`: Analyzing competitors
- `campaign-planner`: Planning campaigns
- `seo-optimizer`: Optimizing for search

### Design & User Experience

**Use Ive Design Philosophy when:**
- Evaluating design simplicity
- Redesigning for clarity
- Analyzing component detail
- Reviewing design systems
- Applying minimalist principles

### Content Structure

**Use Bento Content Creator when:**
- Creating service descriptions
- Planning product content
- Structuring offerings
- Determining bento box content

### Skill Development

**Use Skill Creator when:**
- Building new skills
- Learning skill architecture
- Updating existing skills
- Understanding best practices

## Best Practices

### 1. Start with Strategy

For marketing: Begin with CMO Advisor before sub-skills
For design: Start with Ive principles before detailed decisions

### 2. Combine Skills

Example workflow:
```
1. Use ive-design-philosophy to analyze current design
2. Use cmo-advisor to ensure redesign aligns with brand
3. Use bento-content-creator to structure service content
```

### 3. Maintain Consistency

- All marketing through CMO → brand-voice-enforcer
- All design through Ive philosophy evaluation
- All bento content through bento-content-creator

### 4. Measure and Iterate

- Track skill effectiveness
- Update based on results
- Refine based on usage patterns

## Creating New Skills

To create a new skill:

1. **Consult skill-creator**:
   ```
   Use the skill-creator skill to help me create a [type] skill
   ```

2. **Define purpose clearly**:
   - What problem does it solve?
   - When should it be used?
   - What makes it different from existing skills?

3. **Consider hierarchy**:
   - Standalone skill?
   - Sub-skill of existing system?
   - New hierarchical system?

4. **Follow conventions**:
   - Progressive disclosure (metadata → SKILL.md → resources)
   - Clear description for triggering
   - References for detailed information
   - Scripts for automation

## Skill Maintenance

### Regular Reviews

**Quarterly:**
- CMO sub-skills (update market intelligence)
- Design philosophy (update examples)

**Bi-annually:**
- Strategic messaging (CMO vision/mission)
- Design principles validation

**As Needed:**
- New features or products
- Market shifts
- Brand evolution

### Update Process

1. Identify what needs updating
2. Edit relevant SKILL.md or references
3. Test with example scenarios
4. Document changes
5. Communicate to team

## Future Skill Ideas

Potential skills to develop:

**Analytics Advisor**
- Performance measurement
- Data analysis and insights
- Reporting and dashboards

**Sales Enablement**
- Pitch deck creation
- Demo script development
- Objection handling frameworks

**Customer Success**
- Onboarding workflows
- Engagement strategies
- Retention playbooks

**Product Manager**
- Feature prioritization
- Roadmap planning
- User story creation

---

## Quick Reference

**View all skills:**
```bash
ls .claude/skills/
```

**Read skill documentation:**
```bash
cat .claude/skills/[skill-name]/SKILL.md
cat .claude/skills/[skill-name]/README.md
```

**Invoke a skill:**
```
Use the [skill-name] skill to [task]
```

**Invoke a sub-skill:**
```
Use the [sub-skill-name] skill to [task]
```

---

**Skills are how we extend Claude's capabilities with specialized domain knowledge, workflows, and tools. Use them strategically to maintain consistency and excellence across all work.**
