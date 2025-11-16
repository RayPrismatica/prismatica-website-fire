# Athena - AI Strategic Advisor

This directory contains all configuration, prompts, and knowledge for Athena, Prismatica's AI Strategic Advisor.

## Structure

```
athena/
├── README.md                      # This file
├── config/
│   └── settings.json             # Model configuration (Sonnet 4.5, temperature, tokens)
├── prompts/
│   └── core.md                   # Core system prompt and personality
└── knowledge/
    └── pages/
        ├── consulting.md         # Consulting services knowledge
        ├── dynamic-content.md    # Current dynamic content (updates every 6 hours)
        └── ...                   # Other page-specific knowledge
```

## Configuration

**Model:** Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`)
**Temperature:** 0.7
**Max Tokens:** 1024

See `config/settings.json` for full configuration.

## System Prompt

The core system prompt (`prompts/core.md`) defines:
- Athena's identity and role
- How she's introduced to users
- Operating principles
- Knowledge of Prismatica's services
- Conversational guidelines

## Knowledge Base

### Page-Specific Knowledge
Located in `knowledge/pages/`, these markdown files contain detailed information about each page of the website:
- `consulting.md` - All 12 consulting services with pricing and details
- `dynamic-content.md` - Current AI-generated content displayed on the site
- More files as needed

### Dynamic Content
The `dynamic-content.md` file is automatically regenerated every 6 hours by `scripts/generate-dynamic-content.js`. It contains:
- News insights
- Service descriptions
- Market observations
- Cross-page continuity content

This ensures Athena knows what users are actually seeing on the site.

## How It Works

1. **User sends message** → `app/api/chat/route.ts`
2. **API reads:**
   - Core prompt from `athena/prompts/core.md`
   - Page-specific content from `athena/knowledge/pages/{pathname}.md`
3. **Builds system prompt** with current page context
4. **Sends to Claude API** with conversation history
5. **Returns response** to user

## Development

**Hot Reload in Development:**
The core prompt file is reloaded on every request in development mode, so you can edit `prompts/core.md` and see changes immediately.

**Production Caching:**
In production, the core prompt is cached once on server start for performance.

## Maintenance

**Updating Knowledge:**
1. Edit relevant `.md` files in `knowledge/pages/`
2. Changes take effect immediately in development
3. Deploy to production for live updates

**Updating Configuration:**
1. Edit `config/settings.json`
2. Update `app/api/chat/route.ts` if model/settings change
3. Deploy to production

**Dynamic Content:**
Automatically updates every 6 hours via GitHub Actions. No manual intervention needed.
