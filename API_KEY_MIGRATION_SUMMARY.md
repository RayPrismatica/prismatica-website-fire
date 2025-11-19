# API Key Migration - Quick Start Guide

**For:** Rob @ Prismatica Labs
**Date:** 2025-11-19
**Full Documentation:** See `API_KEY_ARCHITECTURE_ROADMAP.md`

---

## What We're Doing

Moving from a partially separated API key system to a fully centralized, scalable architecture that makes it easy to:
- Track costs per service in Anthropic Console
- Add new AI advisors in minutes
- Isolate security risks
- Debug API issues faster

---

## Quick Implementation (2 hours total)

### 1. Create API Key Manager (30 mins)

**Create:** `/Users/raytarantino/A Code Space/Prism/prismatica-app/lib/apiKeyManager.js`

**Create:** `/Users/raytarantino/A Code Space/Prism/prismatica-app/lib/apiKeyManager.ts`

(Full code in roadmap document)

### 2. Update 4 Core Files (1 hour)

| File | Change |
|------|--------|
| `scripts/generate-dynamic-content.js` | Replace `process.env.ANTHROPIC_API_KEY_CONTENT \|\| process.env.ANTHROPIC_API_KEY` with `getApiKey(ServiceType.CONTENT_GENERATION)` |
| `app/api/chat/route.ts` | Replace API key loading with `getApiKey(ServiceType.ATHENA_CHAT)` |
| `app/api/chat/end/route.ts` | Replace API key loading with `getApiKey(ServiceType.ATHENA_ANALYSIS)` |
| `app/api/generate-content/route.ts` | Replace `process.env.ANTHROPIC_API_KEY` with `getApiKey(ServiceType.CONTENT_GENERATION)` |

### 3. Update Environment Variables (15 mins)

**Vercel Dashboard:**
- Add: `ANTHROPIC_API_KEY_CONTENT`
- Add: `ANTHROPIC_API_KEY_CHAT`
- Keep: `ANTHROPIC_API_KEY` (as fallback)

**GitHub Secrets:**
- Add: `ANTHROPIC_API_KEY_CONTENT`
- Keep: `BLOB_READ_WRITE_TOKEN`

### 4. Update Workflow File (5 mins)

**File:** `.github/workflows/generate-content.yml`

Change line 36 from:
```yaml
ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

To:
```yaml
ANTHROPIC_API_KEY_CONTENT: ${{ secrets.ANTHROPIC_API_KEY_CONTENT }}
ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}  # Fallback
```

### 5. Test Locally (10 mins)

```bash
# Add to .env.local:
ANTHROPIC_API_KEY_CONTENT=sk-ant-api03-xxxxx
ANTHROPIC_API_KEY_CHAT=sk-ant-api03-xxxxx
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx  # fallback

# Test content generation
npm run generate-content

# Test chat
npm run dev
# Open http://localhost:3000 and test Athena chat
```

---

## Current vs. New Architecture

### Current (Partially Separated)

```
scripts/generate-dynamic-content.js
  ↓
  process.env.ANTHROPIC_API_KEY_CONTENT || process.env.ANTHROPIC_API_KEY

app/api/chat/route.ts
  ↓
  process.env.ANTHROPIC_API_KEY_CHAT || process.env.ANTHROPIC_API_KEY

app/api/generate-content/route.ts  ← PROBLEM!
  ↓
  process.env.ANTHROPIC_API_KEY  (no fallback, no separation)
```

**Issues:**
- ❌ Inconsistent patterns
- ❌ One file doesn't use separate keys
- ❌ No validation
- ❌ Hard to audit which key is used
- ❌ Repeated fallback code

### New (Centralized)

```
All files
  ↓
  lib/apiKeyManager.ts
    ↓
    getApiKey(ServiceType.CONTENT_GENERATION)
    getApiKey(ServiceType.ATHENA_CHAT)
    getApiKey(ServiceType.ATHENA_ANALYSIS)
      ↓
      Automatic fallback, validation, logging
```

**Benefits:**
- ✅ Single source of truth
- ✅ Consistent everywhere
- ✅ Clear error messages
- ✅ Detailed logging
- ✅ Easy to extend

---

## Key Naming Convention

```bash
# Claude-based services
ANTHROPIC_API_KEY_CONTENT      # Content generation (Opus 4)
ANTHROPIC_API_KEY_CHAT         # Athena chat (Sonnet 4.5)
ANTHROPIC_API_KEY_ANALYSIS     # Post-chat analysis (Sonnet 4.5)
ANTHROPIC_API_KEY_[PURPOSE]    # Future advisors

# Generic fallback
ANTHROPIC_API_KEY              # Used if specific key not set

# Other services
RESEND_API_KEY                 # Email
BLOB_READ_WRITE_TOKEN          # Vercel Blob storage
```

**Rule:** Purpose over sequence (MARKETING not ADVISOR2)

---

## Adding New Advisors (Future)

### 3-Step Process

**Step 1:** Add to key manager (1 line each)

```typescript
// lib/apiKeyManager.ts
export enum ServiceType {
  // ... existing ...
  NEW_ADVISOR = 'NEW_ADVISOR'  // ← Add this
}

const KEY_CONFIG = {
  // ... existing ...
  [ServiceType.NEW_ADVISOR]: {  // ← Add this
    primaryEnvVar: 'ANTHROPIC_API_KEY_NEWADVISOR',
    fallbackEnvVar: 'ANTHROPIC_API_KEY',
    required: true,
    description: 'Description of what this advisor does'
  }
};
```

**Step 2:** Create API route

```typescript
// app/api/new-advisor/route.ts
import { getApiKey, ServiceType } from '@/lib/apiKeyManager';

export async function POST(request: NextRequest) {
  const apiKey = getApiKey(ServiceType.NEW_ADVISOR);
  const anthropic = new Anthropic({ apiKey });
  // ... rest of logic
}
```

**Step 3:** Add environment variables

- Local: `.env.local`
- Vercel: Settings → Environment Variables
- GitHub: Secrets (if needed)

**Done!** 🎉

---

## Testing Checklist

**Local:**
- [ ] Content generation works: `npm run generate-content`
- [ ] Chat works: Test Athena on http://localhost:3000
- [ ] Logs show correct keys being used

**Production:**
- [ ] Redeploy to Vercel
- [ ] Test live chat on production site
- [ ] GitHub Actions runs successfully
- [ ] Check Anthropic Console for separate usage

**If Anything Breaks:**
- See "Rollback Strategy" in full roadmap document
- Quick fix: Revert deployment in Vercel dashboard

---

## Cost Tracking Benefits

### Before (Single Key)

```
Anthropic Console → Usage Dashboard
└── ANTHROPIC_API_KEY
    └── $500 total (everything mixed together)
```

Can't tell how much chat vs. content generation costs.

### After (Separate Keys)

```
Anthropic Console → Usage Dashboard
├── ANTHROPIC_API_KEY_CONTENT
│   └── $300 (all Opus 4 content generation)
└── ANTHROPIC_API_KEY_CHAT
    └── $200 (all Sonnet 4.5 chat)
```

Clear visibility into costs per service.

---

## Files Changed Summary

| File | Type | Lines Changed |
|------|------|---------------|
| `lib/apiKeyManager.ts` | NEW | ~200 |
| `lib/apiKeyManager.js` | NEW | ~150 |
| `scripts/generate-dynamic-content.js` | EDIT | 3 |
| `app/api/chat/route.ts` | EDIT | 10 |
| `app/api/chat/end/route.ts` | EDIT | 10 |
| `app/api/generate-content/route.ts` | EDIT | 3 |
| `.github/workflows/generate-content.yml` | EDIT | 2 |
| `CLAUDE.md` | EDIT | 10 |
| `README.md` | EDIT | 5 |
| `.env.example` | NEW | ~30 |

**Total:** 2 new files, 7 edited files, ~420 lines

---

## Common Questions

**Q: Can I still use one key for everything?**
**A:** Yes! Just set `ANTHROPIC_API_KEY` and the system automatically uses it as fallback.

**Q: What if I only set CONTENT key but not CHAT key?**
**A:** CHAT will fallback to `ANTHROPIC_API_KEY`. You'll see a warning in logs but everything works.

**Q: Do I need to do this all at once?**
**A:** No. The fallback system means you can:
1. Deploy the key manager first
2. Add service-specific keys gradually
3. Old `ANTHROPIC_API_KEY` keeps everything working during transition

**Q: How do I verify it's working?**
**A:** Check logs for:
```
✓ CONTENT_GENERATION: Using ANTHROPIC_API_KEY_CONTENT
✓ ATHENA_CHAT: Using ANTHROPIC_API_KEY_CHAT
```

---

## Next Steps

1. **Read full roadmap:** `API_KEY_ARCHITECTURE_ROADMAP.md`
2. **Create API key manager:** Start with `lib/apiKeyManager.js`
3. **Test locally:** Verify everything works before deploying
4. **Deploy incrementally:** Update one service at a time if preferred
5. **Monitor:** Check Anthropic Console for separate usage

---

**Questions?** See full roadmap or ask Claude Code for help.

**Ready to start?** Begin with Phase 1 in the roadmap document.
