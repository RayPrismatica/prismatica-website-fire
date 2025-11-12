# Installation Guide

## Quick Setup (30 minutes)

### 1. Copy Files to Your Project

```bash
# From this repo, copy to your Next.js project
cp -r scripts/ YOUR_PROJECT/
cp -r lib/ YOUR_PROJECT/
cp -r components/ YOUR_PROJECT/
cp .github/workflows/generate-content.yml YOUR_PROJECT/.github/workflows/

# Create data directory
mkdir -p YOUR_PROJECT/data
```

### 2. Install Dependencies

```bash
cd YOUR_PROJECT
npm install @anthropic-ai/sdk rss-parser dotenv
```

### 3. Set Up Environment Variables

**Create `.env.local`:**
```bash
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key at: https://console.anthropic.com

**Add to GitHub Secrets** (Settings → Secrets → Actions):
- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `VERCEL_DEPLOY_HOOK` - Webhook URL from Vercel project settings

To get your Vercel Deploy Hook:
1. Go to Vercel project → Settings → Git
2. Scroll to "Deploy Hooks"
3. Create new hook
4. Copy the URL

### 4. Customize Your Voice

Edit `scripts/content-generation-prompt.md`:

- Replace the perspective with yours
- Add 3-5 examples of your writing
- Define topics to avoid
- Set your tone

### 5. Test Locally

```bash
npm run generate-content
```

Check `data/dynamic-content.json` - does it sound like you?

If not, edit the prompt and try again.

### 6. Add to Your Pages

**Server-side (recommended):**
```tsx
// app/page.tsx
import { getDynamicContent } from '@/lib/getDynamicContent';

export const revalidate = 0;

export default async function HomePage() {
  const content = await getDynamicContent();

  return (
    <main>
      <h1>Welcome</h1>
      <p>{content.newsInsight}</p>
    </main>
  );
}
```

**Or client-side:**
```tsx
// app/page.tsx
'use client';

import DynamicNewsInsight from '@/components/DynamicNewsInsight';

export default function HomePage() {
  return (
    <main>
      <h1>Welcome</h1>
      <p><DynamicNewsInsight /></p>
    </main>
  );
}
```

### 7. Update Fallback Content

Edit `lib/getDynamicContent.ts` and `components/*.tsx`:

Replace the fallback text with content that matches your brand voice.

### 8. Push to GitHub

```bash
git add .
git commit -m "Add Synapsed dynamic content system"
git push
```

### 9. Verify It's Working

**Check GitHub Actions:**
- Go to: `https://github.com/YOUR_USER/YOUR_REPO/actions`
- Look for "Generate Dynamic Content" workflow
- Should run every 15 minutes

**Check Content:**
```bash
cat data/dynamic-content.json
```

**Check Vercel:**
- Dashboard should show auto-deployments
- Message: "Update dynamic content"

---

## That's It!

Your site is now Synapsed. It will update every 15 minutes automatically.

## Troubleshooting

**Content not generating:**
- Check GitHub Actions logs for errors
- Verify API key is valid at console.anthropic.com
- Test RSS feeds are accessible

**Not deploying:**
- Verify Vercel Deploy Hook URL in GitHub Secrets
- Check Vercel dashboard for deployment errors

**Sounds wrong:**
- Edit `scripts/content-generation-prompt.md`
- Add more examples of your writing
- Be more specific about tone and perspective

## Next Steps

1. Monitor for a few days
2. Tune the prompt if needed
3. Add dynamic content to more pages
4. Consider adding more RSS feeds

---

**Questions?** Open an issue on GitHub
**Need help?** Visit [prismaticalab.com](https://prismaticalab.com)
