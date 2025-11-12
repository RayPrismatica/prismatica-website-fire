# Synapsed

> **You've been Synapsed.**

If you're reading this, you probably came across a website that felt... different. Not static. Not stale. **Alive.** Content that changed when you refreshed. Commentary that referenced what's happening *right now*. A site that reads the world and responds.

That's what being Synapsed means.

**Synapsed** is a dynamic content system implemented by [Ray Tarantino](https://github.com/RayPrismatica) for [Prismatica Labs Limited](https://prismaticalab.com). It transforms static websites into living, thinking entities that wake up every morning, read the news you read, and update themselves with commentary in your voice.

## The Vision

We believe **thinking should be infrastructure, not a privilege.**

For decades, keeping content fresh has meant one of three paths:
1. **Hire humans** - Writers, editors, content strategists ($$$)
2. **Use a CMS** - WordPress, Contentful, Sanity (lock-in + monthly fees)
3. **Let it die** - Launch once, watch it slowly fossilize

All three are broken. Humans are expensive. CMSs are cages. Fossil sites repel visitors.

**Synapsed is the fourth path.**

Your website becomes a neural endpoint. Connected to reality. Processing signals. Responding in real-time. Not because you're manually updating it. Because it's **Synapsed** - wired directly into the world's information stream.

## What It Does

Every 15 minutes, Synapsed:

1. **Reads** - Fetches headlines from BBC and New York Times
2. **Thinks** - Sends them to Claude AI with prompts that encode your worldview
3. **Writes** - Generates fresh commentary in your voice
4. **Publishes** - Commits to git, triggers deployment, goes live

No database. No CMS. No humans in the loop. Just **synaptic automation** - your thinking, encoded once, firing forever.

## Why It Matters

### For Your Visitors
- Content feels current, not dated
- References what's happening *right now*
- Demonstrates sophistication without screaming about it
- Proves you're paying attention

### For You
- Set once, runs forever
- Costs ~$5/month (less than a coffee)
- No content calendar, no editorial meetings, no deadlines
- Your site stays fresh while you sleep, travel, build

### The Philosophy

Most websites are **fossils** - beautiful artifacts of the day they launched, slowly decaying.

Dynamic CMSs are **cages** - you trade freedom for convenience, pay monthly to fill their forms.

**Synapsed sites are organisms.** They breathe with the news cycle. They wake up and have something to say. Not because they're magical. Because they're **connected** - one synapse from reality to your homepage.

That's the future. Not websites that need feeding. **Websites that feed themselves.**

## Live Example

See it live: [prismaticalab.com](https://prismaticalab.com)

The opening paragraph changes every 15 minutes. So does the "What We Do" page. All automatic. All in our voice. All contextually aware of what's happening in the world.

**It's been Synapsed.**

## How It Works

```
┌─────────────────┐
│  BBC + NYT RSS  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Claude AI     │  ← Your worldview, encoded in prompts
│  Reads + Thinks │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Generated Text  │  ← In YOUR voice
│  (2-3 sentences)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Git Commit     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Deployment      │  ← Vercel, Netlify, wherever
│  Triggers       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Fresh Content  │
│      LIVE       │
└─────────────────┘
```

**Every 15 minutes. Automatically. Forever.**

## What You Get

Everything needed to Synapse your site:

- ✅ GitHub Actions workflow (orchestrates the whole thing)
- ✅ Content generation script (Node.js)
- ✅ System prompt template (encode your thinking)
- ✅ Next.js components (display fresh content)
- ✅ Fallback system (never breaks, even when things fail)
- ✅ Complete documentation (you're reading it)

**Setup time:** 30 minutes
**Monthly cost:** ~$5
**Maintenance:** Zero

## Quick Start

### Prerequisites

- Next.js 14+ site
- GitHub repo
- [Anthropic API key](https://console.anthropic.com) (free tier works)
- Vercel/Netlify deployment (or any git-based platform)

### Installation

**1. Clone this repo**
```bash
git clone https://github.com/RayPrismatica/prismaticalab-dynamic-ai-website-content.git
cd prismaticalab-dynamic-ai-website-content
```

**2. Copy files to your project**
```bash
# Copy the Synapsed system
cp -r scripts/ YOUR_PROJECT/
cp -r components/ YOUR_PROJECT/
cp -r lib/ YOUR_PROJECT/
cp .github/workflows/generate-content.yml YOUR_PROJECT/.github/workflows/

# Create cache directory
mkdir -p YOUR_PROJECT/data
```

**3. Install dependencies**
```bash
cd YOUR_PROJECT
npm install @anthropic-ai/sdk rss-parser dotenv
```

**4. Set environment variables**

Create `.env.local`:
```bash
ANTHROPIC_API_KEY=your_api_key_here
```

Add GitHub Secrets (Settings → Secrets → Actions):
- `ANTHROPIC_API_KEY` - Your API key
- `VERCEL_DEPLOY_HOOK` - Webhook from Vercel project settings

**5. Encode your voice**

Edit `scripts/content-generation-prompt.md`:
```markdown
You are [your perspective]. [Your worldview].

Tone:
- [How you sound]
- [What makes you different]

Focus on:
- [What you care about]
- [What others miss]

Examples:
[3-5 samples of your actual writing]
```

**6. Add to your pages**

```tsx
// app/page.tsx
import { getDynamicContent } from '@/lib/getDynamicContent';

export default async function HomePage() {
  const content = await getDynamicContent();

  return (
    <main>
      <h1>Welcome</h1>
      <p>{content.newsInsight}</p> {/* ← This is Synapsed */}
    </main>
  );
}
```

**7. Generate first content**

```bash
npm run generate-content
```

**8. Push and deploy**

```bash
git add .
git commit -m "Synapse this site"
git push
```

**Congratulations. You've been Synapsed.**

GitHub Actions runs every 15 minutes now. Your site is alive.

## Configuration

### Change Update Frequency

Edit `.github/workflows/generate-content.yml`:

```yaml
schedule:
  - cron: '*/15 * * * *'  # Every 15 minutes
  # - cron: '0 * * * *'   # Hourly
  # - cron: '0 9 * * *'   # Daily at 9 AM
```

### Add More RSS Feeds

Edit `scripts/generate-dynamic-content.js`:

```javascript
const feeds = [
  'https://feeds.bbci.co.uk/news/rss.xml',
  'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  'https://techcrunch.com/feed/',  // Add yours
];
```

### Tune Your Voice

The magic lives in `scripts/content-generation-prompt.md`. This is where you encode **how you think**.

**Tips:**
- Be specific ("like texting a friend at 2am" not "casual")
- Show examples (your actual writing, 3-5 samples)
- Define boundaries (topics to avoid, tones to skip)
- Test locally (`npm run generate-content`)
- Iterate until it sounds like you

## System Architecture

### File Structure

```
your-project/
├── .github/workflows/
│   └── generate-content.yml      # The heartbeat
├── scripts/
│   ├── generate-dynamic-content.js   # The brain
│   └── content-generation-prompt.md  # Your voice
├── lib/
│   └── getDynamicContent.ts      # Content loader
├── components/
│   └── DynamicNewsInsight.tsx    # Display component
├── data/
│   └── dynamic-content.json      # Generated cache
└── .env.local                    # Secrets
```

### How Generation Works

**Every 15 minutes:**

1. GitHub Actions wakes up
2. Fetches BBC + NYT RSS feeds
3. Extracts top 8 headlines from each
4. Sends to Claude with your prompt
5. Claude generates 2 pieces in your voice
6. Saves to `data/dynamic-content.json`
7. Commits: "Update dynamic content"
8. Webhook triggers Vercel deployment
9. Site rebuilds with fresh content
10. Visitors see new text

**All automatic. Zero manual work.**

### Triple-Fallback Protection

Your site never breaks, even when things fail:

**Level 1: Generation Failure**
- If Claude API errors → writes safe fallback
- Marks with `fallbackUsed: true`
- Site continues serving content

**Level 2: Cache Miss**
- If cache file missing or >70 min old
- Server returns hardcoded fallback
- Indistinguishable from live content

**Level 3: Component Failure**
- Each component has inline fallback
- Gracefully degrades
- No errors shown to visitors

**Result:** Your site never shows broken content. Ever.

## Content Structure

Synapsed generates two pieces per cycle:

### 1. News Insight (Landing Page)
A sharp 2-3 sentence take on the day's most significant story. Written like you'd text a smart friend.

**Example:**
> "Tesla slashed prices 20% and everyone's panicking about demand collapse. That's not desperation. That's margin testing at scale. Most companies spend millions on focus groups to learn what Elon learns by Tuesday."

### 2. Intelligence Example (Secondary Page)
A callback to the same story, showing how you think about it differently.

**Example:**
> "The Tesla price cuts, for example. We read that and our mind goes to: is this margin testing or demand panic, and what does the timing tell us about Q4 guidance?"

**Both pieces:**
- Reference the same story (coherence)
- Written in your encoded voice
- Under 45 words each
- Zero fluff

## Production Checklist

Before going live:

- [ ] Anthropic API key in `.env.local`
- [ ] GitHub Secrets configured
- [ ] System prompt customized
- [ ] Tested locally: `npm run generate-content`
- [ ] Dynamic components added to pages
- [ ] Fallback content updated
- [ ] Workflow file committed
- [ ] First generation successful

Visit GitHub Actions → should see "Generate Dynamic Content" running.

## Monitoring

### Is it working?

**Check GitHub Actions:**
```
https://github.com/YOUR_USER/YOUR_REPO/actions
```
Look for workflow runs every 15 minutes.

**Check content freshness:**
```bash
# View last generation timestamp
cat data/dynamic-content.json | jq '.generated'

# How old is it?
node -e "console.log((Date.now() - new Date('$(cat data/dynamic-content.json | jq -r .generated)').getTime()) / 60000, 'minutes old')"
```

**Check deployments:**
- Vercel dashboard should show auto-deploys
- Message: "Update dynamic content"
- Triggered by GitHub webhook

### Common Issues

**Content not updating**
- Check GitHub Actions for errors
- Verify API key is valid
- Test RSS feeds are reachable
- Confirm webhook URL correct

**Seeing fallback content**
- Look for `"fallbackUsed": true` in cache
- Check error in metadata field
- Verify Anthropic account has credits

**Generation working but not deploying**
- Check Vercel webhook URL
- Test webhook manually with curl
- Verify repo has push access

## Cost Breakdown

**Anthropic API:**
- 96 generations/day (every 15 min)
- ~16 headlines analyzed each time
- Claude Opus: $15 per 1M input tokens
- **~$3-5/month**

**GitHub Actions:**
- 2,000 free minutes/month
- ~2 minutes per run
- 96 runs/day = ~5,760 min/month
- **~$0-2/month over free tier**

**Total: ~$5/month**

Compare to:
- Content writer: $500+/month
- CMS subscription: $50-500/month
- Your time: Priceless

## Advanced Usage

### Multiple Content Pieces

Generate more fields:

```markdown
# In content-generation-prompt.md

## PIECE 3: Product Insight
[Instructions for additional content]

## PIECE 4: Market Commentary
[Another piece]
```

Update the script to parse them.

### Multiple Pages

Use the same cache everywhere:

```tsx
// Different pages, same cache
const content = await getDynamicContent();

// Landing
<p>{content.newsInsight}</p>

// About
<p>{content.additionalField}</p>

// Services
<p>{content.productInsight}</p>
```

### Industry-Specific Feeds

Add niche RSS sources:

```javascript
// Tech
'https://techcrunch.com/feed/'

// Finance
'https://www.ft.com/?format=rss'

// Marketing
'https://feeds.adweek.com/adweek/digitaleast'
```

### Custom AI Models

Swap Claude for OpenAI, Gemini, etc:

```javascript
// Replace Anthropic SDK
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
```

Architecture stays the same.

## Philosophy

### What We're Building

A world where:
- **Thinking is infrastructure** - Available always, never scarce
- **Websites are organisms** - They read, respond, evolve
- **Intelligence compounds** - Sites get smarter over time
- **Small teams compete** - No content team needed

This isn't about replacing human creativity. It's about **multiplying it.**

You think once (encode your voice). The system thinks forever (applies your lens to every news cycle).

### The Bigger Picture

Today, Synapsed updates your landing page.

Tomorrow, it could:
- Write your weekly newsletter
- Generate personalized emails
- Draft social media posts
- Create product descriptions
- Respond to common questions
- Summarize your thinking on any topic

**We're not building a content tool. We're building infrastructure for thought.**

One day, every website will be Synapsed. Static sites will feel as quaint as GeoCities. The question isn't *if* sites will think. It's *whose thinking will they embody.*

We built this so the answer can be: **Yours.**

## Contributing

Want to make Synapsed better?

1. Fork this repo
2. Create a feature branch: `git checkout -b feature/neural-upgrade`
3. Make changes
4. Test: `npm run generate-content`
5. Commit: `git commit -m "Add neural upgrade"`
6. Push: `git push origin feature/neural-upgrade`
7. Open a Pull Request

### More From Our Workshop

- [ ] Multi-model support (GPT-4, Gemini, Llama)
- [ ] Visual content generation
- [ ] Multi-language support
- [ ] Real-time webhook triggers
- [ ] Analytics dashboard
- [ ] A/B testing framework
- [ ] Content versioning
- [ ] Rollback capability
- [ ] Slack/Discord notifications

## FAQ

**Q: Does this work with WordPress/Webflow?**
A: Synapsed is built for git-based deployments (Next.js, Gatsby, Astro). For other platforms, you'd need custom deployment triggers.

**Q: Can I use a different AI?**
A: Yes! Swap the Anthropic SDK for OpenAI, Google, or any API. The architecture is model-agnostic.

**Q: What if I want to edit generated content?**
A: Edit `data/dynamic-content.json` manually. Next generation overwrites it, but you can pause the workflow temporarily.

**Q: Is this SEO-friendly?**
A: Absolutely. Content is server-rendered. Search engines see static HTML. Plus, fresh content helps rankings.

**Q: Can some content stay static?**
A: Yes. Only wrapped components update. Everything else stays as you write it.

**Q: What if Claude generates something wrong?**
A: The prompt has guardrails. You control fallbacks. And you can review changes in GitHub before deploying.

**Q: How do I stop it?**
A: Delete the workflow file or disable it in repo settings. Your site returns to static.

**Q: Is my API key secure?**
A: Yes. Stored in GitHub Secrets, never exposed in code or logs.

## License

MIT License - Free to use, modify, distribute.

We just ask you keep the attribution to Prismatica Labs. And maybe star the repo if it changed how you build.

## Credits

**Created by:** [Ray Tarantino](https://github.com/RayPrismatica)
**For:** [Prismatica Labs Limited](https://prismaticalab.com)
**Philosophy:** Thinking should be infrastructure, not a privilege

**Special thanks to:**
- Claude (Anthropic) - For being a good thinking partner
- The Next.js team - For making this architecture possible
- Everyone who believed static sites could evolve

## Support

**Bug?** → [Open an issue](https://github.com/RayPrismatica/prismaticalab-dynamic-ai-website-content/issues)
**Question?** → Check FAQ or start a discussion
**Want custom implementation?** → [prismaticalab.com](https://prismaticalab.com)

## What's Next

1. **Follow the Quick Start** (30 minutes)
2. **Customize your voice** (prompt engineering)
3. **Watch it run** (GitHub Actions in 15 min)
4. **Tell someone** (Twitter, blog, wherever)

Your website is about to wake up.

---

<p align="center">
  <strong>You've been Synapsed.</strong><br>
  Now go Synapse someone else.
</p>

<p align="center">
  <a href="https://github.com/RayPrismatica/prismaticalab-dynamic-ai-website-content">⭐ Star this repo</a> if it changed how you build websites.
</p>

<p align="center">
  Made with ❤️  by people who believe websites should think
</p>
