# Dynamic Content System - Complete Implementation

## Overview

Your Prismatica app now has a fully functional dynamic content system that generates fresh, witty business insights every 15 minutes using BBC & NYT RSS feeds + Claude Opus 4.1.

## What's Working

✅ **15-minute update cycle** - Fresh content every 15 minutes
✅ **BBC + New York Times RSS feeds** - Analyzes top 8 headlines from each
✅ **Claude Opus 4.1 (claude-opus-4-20250514)** - Best model for sharp insights
✅ **Editable system prompt** - Located in `scripts/content-generation-prompt.md`
✅ **Two dynamic sections:**
   - Landing page: News insight (right after the main heading)
   - What We Do page: Intelligence example (after the questions intro)
✅ **Rich metadata tracking** - Generation time, sources, headlines analyzed
✅ **Graceful fallbacks** - If generation fails, serves safe defaults
✅ **Smart error handling** - Individual RSS feed failures won't break the system

## File Structure

```
prismatica-app/
├── scripts/
│   ├── generate-dynamic-content.js      # Main generator (improved)
│   ├── content-generation-prompt.md     # ⭐ EDIT THIS to change content style
│   └── scheduler.js                     # Runs every 15 minutes
├── components/
│   ├── DynamicNewsInsight.tsx          # Landing page component
│   └── DynamicIntelligenceExample.tsx  # What We Do page component
├── app/
│   ├── page.tsx                        # Landing page (updated)
│   ├── what/page.tsx                   # What We Do page (updated)
│   └── api/dynamic-content/route.ts    # API endpoint
└── data/
    └── dynamic-content.json            # Cache file (auto-generated)
```

## How To Use

### 1. Start the scheduler (for automatic updates)

```bash
npm run start-scheduler
```

This will:
- Generate content immediately
- Run every 15 minutes automatically
- Keep running in the background
- Survive errors without crashing

### 2. Manual content generation (for testing)

```bash
npm run generate-content
```

### 3. Start the dev server

```bash
npm run dev
```

Visit:
- http://localhost:3000 - Landing page with news insight
- http://localhost:3000/what - What We Do page with intelligence example

## Customizing the Content

### Edit the System Prompt

Open `scripts/content-generation-prompt.md` and modify:
- Tone/style instructions
- Length constraints
- Examples
- Rules and guidelines

No need to touch any JavaScript code!

### Change Update Frequency

Edit `scripts/scheduler.js` line 22:

```javascript
// Current: every 15 minutes
cron.schedule('*/15 * * * *', () => {

// Hourly:
cron.schedule('0 * * * *', () => {

// Every 5 minutes:
cron.schedule('*/5 * * * *', () => {
```

## Improvements Made

### 1. **Editable Prompt System**
- Prompt now lives in `content-generation-prompt.md`
- Easy to edit without touching code
- Template uses `{{HEADLINES}}` placeholder

### 2. **Better Error Handling**
- Individual RSS feed failures don't crash the system
- If BBC fails, NYT continues (and vice versa)
- Graceful fallbacks at every level
- Detailed error logging

### 3. **Rich Metadata Tracking**
```json
{
  "metadata": {
    "model": "claude-opus-4-20250514",
    "headlinesAnalyzed": 16,
    "sources": { "bbc": 8, "nyt": 8 },
    "generationTimeMs": 6616,
    "promptFile": "content-generation-prompt.md"
  }
}
```

### 4. **Better Logging**
- Clear visual formatting with emojis
- Shows which feeds succeeded/failed
- Displays generation time
- Shows the actual content generated

### 5. **Smooth Frontend Updates**
- Content fades in smoothly
- Shows fallback immediately, then updates
- No jarring loading states

## Current Content Example

**Landing Page (News Insight):**
> UK government just announced they're reconsidering compensation for 3.8 million women caught in pension age changes. Everyone's debating fairness. We're watching something else. When governments suddenly find money for decades-old grievances, they're usually buying social peace before announcing something unpopular.

**What We Do Page (Intelligence Example):**
> The UK pension compensation reversal, for example. We read that and our mind goes to: what policy bomb needs this much goodwill cushioning, and why announce it now?

## Production Deployment

### On Vercel (recommended)

1. The system already works on Vercel
2. Set up Vercel Cron Jobs to run generation:
   - Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/generate-content",
    "schedule": "*/15 * * * *"
  }]
}
```

3. Create `/app/api/generate-content/route.ts` that calls the generator

### Alternative: External Cron

Use a service like:
- **EasyCron** - https://www.easycron.com
- **Cron-job.org** - https://cron-job.org

Hit your endpoint every 15 minutes:
```
GET https://your-app.vercel.app/api/generate-content
```

## Monitoring

### Check if content is fresh

```bash
cat data/dynamic-content.json | grep generated
```

### View current content

```bash
cat data/dynamic-content.json
```

### Test API endpoint

```bash
curl http://localhost:3000/api/dynamic-content
```

## Troubleshooting

### Content not updating
1. Check if scheduler is running: `ps aux | grep scheduler`
2. Check generation logs
3. Verify API key in `.env.local`
4. Try manual generation: `npm run generate-content`

### Fallback content showing
- Check `data/dynamic-content.json` for `"fallbackUsed": true`
- Look for error messages in the metadata
- Verify BBC/NYT RSS feeds are accessible
- Check Anthropic API key is valid

### Scheduler crashed
- Restart it: `npm run start-scheduler`
- It has built-in error recovery, so this should be rare

## Next Steps

**Ideas for enhancement:**
1. Add more news sources (Reuters, Bloomberg, etc.)
2. Create a dashboard to view past insights
3. Email alerts when generation fails
4. A/B test different prompt variations
5. Add admin panel to manually regenerate
6. Track which insights get the most engagement

---

**Everything is ready to go!** 🚀

Just run `npm run start-scheduler` to keep content fresh, or let Vercel Cron handle it in production.
