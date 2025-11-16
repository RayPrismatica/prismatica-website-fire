# Vercel Blob Storage Setup Guide

This document explains how to set up Vercel Blob Storage for the dynamic content system.

## Overview

The dynamic content system now uses **Vercel Blob Storage** instead of committing JSON files to the repository. This provides:

- ✅ **No unnecessary rebuilds** - Content updates don't trigger Vercel deployments
- ✅ **Instant content updates** - New content available immediately (no build wait)
- ✅ **24-hour validity** - Content stays fresh for a full day
- ✅ **Persistent storage** - Content accessible across all serverless functions
- ✅ **Fallback system** - Graceful degradation if Blob is unavailable

## Architecture Changes

### Before (File-based)
```
GitHub Action → data/dynamic-content.json → Git commit → Vercel redeploy → API reads file
```

### After (Blob-based)
```
GitHub Action → Vercel Blob Storage → API reads from Blob URL (no redeployment!)
```

## Setup Instructions

### 1. Create a Vercel Blob Store

1. Go to https://vercel.com/dashboard/stores
2. Click "Create Database" or "Create Store"
3. Select **Blob**
4. Choose a name (e.g., `prismatica-dynamic-content`)
5. Select your preferred region
6. Click "Create"

### 2. Get Your Blob Credentials

After creating the store, Vercel will show you:

- **BLOB_READ_WRITE_TOKEN** - Authentication token
- **BLOB_URL** - Public URL pattern (will be auto-set)

Copy the `BLOB_READ_WRITE_TOKEN`.

### 3. Configure Environment Variables

#### Local Development (.env.local)

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_ABC123XYZ
```

You don't need to set `BLOB_URL` locally - it will be auto-generated when you upload.

#### Vercel Dashboard (Production)

1. Go to your project settings on Vercel
2. Navigate to **Environment Variables**
3. Add:
   - `BLOB_READ_WRITE_TOKEN` = your token from step 2
4. Click "Save"

#### GitHub Secrets (for Actions)

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add:
   - Name: `BLOB_READ_WRITE_TOKEN`
   - Value: your token from step 2
5. Click "Add secret"

### 4. First Content Generation

Run the content generation script manually to populate the Blob:

```bash
npm run generate-content
```

This will:
1. Fetch news from RSS feeds
2. Generate content via Claude Opus 4
3. Upload JSON to Vercel Blob
4. Save markdown to Athena's knowledge base
5. Print the Blob URL

**Important:** Copy the Blob URL printed in the console (looks like `https://xxx.public.blob.vercel-storage.com/dynamic-content.json`)

### 5. Set BLOB_URL Environment Variable

Now that you have the actual Blob URL:

#### Vercel Dashboard
1. Go back to Environment Variables
2. Add `BLOB_URL` = the URL from step 4

#### Local .env.local
```bash
BLOB_URL=https://xxx.public.blob.vercel-storage.com/dynamic-content.json
```

### 6. Redeploy Vercel

Trigger a new deployment so the environment variables take effect:

```bash
git commit --allow-empty -m "chore: trigger redeploy for Blob env vars"
git push
```

## Testing

### Test Local Generation
```bash
npm run generate-content
```

Should output:
```
☁️  Uploading to Vercel Blob...
✓ Uploaded to Vercel Blob: https://xxx.public.blob.vercel-storage.com/dynamic-content.json
```

### Test API Endpoint

Visit: `https://your-site.vercel.app/api/dynamic-content`

You should see all 12 content fields in JSON format.

### Test Frontend

Navigate to your site's homepage. Dynamic content should load instead of placeholders.

## Content Refresh Schedule

- **GitHub Action**: Runs every **6 hours** (`0 */6 * * *`)
- **Content validity**: **24 hours** (1440 minutes)
- **Cache headers**: 6-hour CDN cache on Blob URL

## Monitoring

### Check if content generation is working

```bash
# View latest GitHub Action run
# https://github.com/your-username/your-repo/actions

# Manually trigger generation
# Go to Actions → Generate Dynamic Content → Run workflow
```

### Check Blob contents

The Blob URL is publicly accessible:
```bash
curl https://xxx.public.blob.vercel-storage.com/dynamic-content.json
```

### Check content age

Look for the `generated` timestamp in the JSON response. If it's older than 24 hours, the system will serve fallback content.

## Troubleshooting

### "Failed to fetch from Blob: 404"

**Cause:** `BLOB_URL` environment variable not set or incorrect.

**Fix:**
1. Run `npm run generate-content` locally
2. Copy the printed Blob URL
3. Set `BLOB_URL` in Vercel environment variables
4. Redeploy

### "Placeholders still showing"

**Cause:** Content might be older than 24 hours.

**Fix:**
1. Manually trigger GitHub Action
2. Or run `npm run generate-content` locally
3. Check the `generated` timestamp in the Blob

### "BLOB_READ_WRITE_TOKEN is not defined"

**Cause:** Token not set in environment.

**Fix:**
1. Add token to `.env.local` for local development
2. Add to Vercel environment variables for production
3. Add to GitHub Secrets for Actions

### Components show fallback content even with fresh Blob

**Cause:** `BLOB_URL` environment variable might not be set, causing the code to use a placeholder URL.

**Fix:**
1. Verify `BLOB_URL` is set in Vercel dashboard
2. Check the API route logs for "Failed to fetch from Blob"
3. Ensure the URL is the full public Blob URL

## Migration Notes

### What Changed

| File | Change |
|------|--------|
| `scripts/generate-dynamic-content.js` | Now uploads to Blob instead of writing to `data/` |
| `app/api/dynamic-content/route.ts` | Fetches from Blob URL instead of filesystem |
| `lib/getDynamicContent.ts` | Fetches from Blob URL instead of filesystem |
| `.github/workflows/generate-content.yml` | Removed git commit/push steps, added `BLOB_READ_WRITE_TOKEN` |
| `CLAUDE.md` | Updated architecture documentation |

### What Stayed the Same

- Content generation logic (Claude Opus 4 with RSS feeds)
- 12 content fields structure
- Fallback content system
- Athena markdown knowledge base
- 6-hour refresh schedule
- Dynamic component structure

### Old Files (Safe to Remove)

After confirming Blob storage works:

- `data/dynamic-content.json` (no longer used, can be deleted or kept for reference)

## Cost Considerations

Vercel Blob pricing (as of documentation):

- **Storage**: Minimal (single ~5KB JSON file)
- **Bandwidth**: ~5KB per read, cached for 6 hours
- **Operations**:
  - Write (`put`): 4 times per day (every 6 hours)
  - Read: Cached, minimal API calls due to 6-hour cache

**Expected cost**: Negligible for free tier (well within limits)

## Support

If you encounter issues:

1. Check Vercel Blob dashboard for store status
2. Review GitHub Actions logs for generation errors
3. Check Vercel deployment logs for fetch errors
4. Verify all environment variables are set correctly
