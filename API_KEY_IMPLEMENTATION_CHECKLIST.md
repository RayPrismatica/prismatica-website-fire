# API Key Migration - Implementation Checklist

**Use this checklist to track your progress during the migration.**

Print this out or keep it open in a separate window as you work through the implementation.

---

## Pre-Migration

- [ ] Read `API_KEY_ARCHITECTURE_ROADMAP.md` (full documentation)
- [ ] Read `API_KEY_MIGRATION_SUMMARY.md` (quick overview)
- [ ] Review `API_KEY_ARCHITECTURE_DIAGRAM.md` (visual guide)
- [ ] Back up current `.env.local` file
- [ ] Note current Vercel deployment URL for rollback
- [ ] Get separate API keys from Anthropic Console if using different keys

---

## Phase 1: Create API Key Manager (30 mins)

### TypeScript Version

- [ ] Create `/Users/raytarantino/A Code Space/Prism/prismatica-app/lib/apiKeyManager.ts`
- [ ] Copy TypeScript code from roadmap document
- [ ] Verify no syntax errors: `npx tsc --noEmit lib/apiKeyManager.ts`

### JavaScript Version (for scripts)

- [ ] Create `/Users/raytarantino/A Code Space/Prism/prismatica-app/lib/apiKeyManager.js`
- [ ] Copy JavaScript code from roadmap document
- [ ] Test import: `node -e "import('./lib/apiKeyManager.js').then(console.log)"`

### Optional: Tests

- [ ] Create `lib/__tests__/apiKeyManager.test.ts`
- [ ] Copy test code from roadmap document
- [ ] Run tests: `npm test` (if Jest configured)

---

## Phase 2: Update Existing Files (1 hour)

### File 1: Content Generation Script

**File:** `scripts/generate-dynamic-content.js`

- [ ] Find line 21: `const apiKey = process.env.ANTHROPIC_API_KEY_CONTENT || process.env.ANTHROPIC_API_KEY;`
- [ ] Add import: `import { getApiKey, ServiceType } from '../lib/apiKeyManager.js';`
- [ ] Replace line 21: `const apiKey = getApiKey(ServiceType.CONTENT_GENERATION);`
- [ ] Save file
- [ ] Test locally: `npm run generate-content`
- [ ] Verify logs show: `✓ CONTENT_GENERATION: Using ANTHROPIC_API_KEY_CONTENT`

### File 2: Athena Chat Route

**File:** `app/api/chat/route.ts`

- [ ] Add import at top: `import { getApiKey, ServiceType, ApiKeyError } from '@/lib/apiKeyManager';`
- [ ] Find lines 444-451 (API key loading code)
- [ ] Replace with new code from roadmap (try/catch with getApiKey)
- [ ] Save file
- [ ] Test locally: `npm run dev` → Open Athena chat → Send message
- [ ] Verify terminal shows: `✓ ATHENA_CHAT: Using ANTHROPIC_API_KEY_CHAT`

### File 3: Post-Chat Analysis Route

**File:** `app/api/chat/end/route.ts`

- [ ] Add import at top: `import { getApiKey, ServiceType, ApiKeyError } from '@/lib/apiKeyManager';`
- [ ] Find lines 56-63 (API key loading code)
- [ ] Replace with new code from roadmap (using ATHENA_ANALYSIS)
- [ ] Save file
- [ ] Test: Complete a 6+ message chat conversation and close it
- [ ] Verify analysis runs without errors

### File 4: Legacy Webhook Endpoint

**File:** `app/api/generate-content/route.ts`

- [ ] Add import at top: `import { getApiKey, ServiceType } from '@/lib/apiKeyManager';`
- [ ] Find lines 7-9: `const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });`
- [ ] Replace with: `const anthropic = new Anthropic({ apiKey: getApiKey(ServiceType.CONTENT_GENERATION) });`
- [ ] Save file
- [ ] Test: `curl http://localhost:3000/api/generate-content` (or use Postman)

### File 5 & 6: Email Routes (Optional)

**Files:** `app/api/enquiry/route.ts` and `app/api/products-enquiry/route.ts`

- [ ] Add import: `import { getApiKey, ServiceType } from '@/lib/apiKeyManager';`
- [ ] Replace `process.env.RESEND_API_KEY` with `getApiKey(ServiceType.EMAIL)`
- [ ] Update error handling to check for empty string instead of undefined
- [ ] Save both files
- [ ] Test: Submit contact form on live site

---

## Phase 3: Update Documentation (15 mins)

### File 1: CLAUDE.md

- [ ] Find "Environment Variables" section
- [ ] Update environment variable list with new keys
- [ ] Add reference to API_KEY_ARCHITECTURE_ROADMAP.md
- [ ] Save file

### File 2: README.md

- [ ] Find "Environment Setup" section
- [ ] Update `.env.local` example
- [ ] Add link to roadmap document
- [ ] Save file

### File 3: Create .env.example

- [ ] Create new file: `.env.example`
- [ ] Copy template from roadmap document
- [ ] Replace example keys with placeholder format
- [ ] Save file

---

## Phase 4: Update Local Environment (5 mins)

### Update .env.local

- [ ] Open `.env.local`
- [ ] Verify these keys exist:
  - `ANTHROPIC_API_KEY_CONTENT`
  - `ANTHROPIC_API_KEY_CHAT`
  - `ANTHROPIC_API_KEY` (fallback)
  - `RESEND_API_KEY`
  - `BLOB_READ_WRITE_TOKEN`
  - `BLOB_URL`
- [ ] Save file

---

## Phase 5: Local Testing (30 mins)

### Test 1: API Key Manager

- [ ] Create test script: `scripts/test-api-keys.js` (from roadmap)
- [ ] Run: `node scripts/test-api-keys.js`
- [ ] Verify output shows all keys found
- [ ] Check: `✓ All required keys configured`

### Test 2: Content Generation

- [ ] Run: `npm run generate-content`
- [ ] Check logs for: `✓ CONTENT_GENERATION: Using ANTHROPIC_API_KEY_CONTENT`
- [ ] Verify: `data/dynamic-content.json` updated
- [ ] Verify: `athena/knowledge/pages/dynamic-content.md` updated
- [ ] No errors in output

### Test 3: Fallback Behavior

- [ ] Comment out `ANTHROPIC_API_KEY_CONTENT` in `.env.local`
- [ ] Run: `npm run generate-content`
- [ ] Check logs for: `⚠️ CONTENT_GENERATION: Using fallback key ANTHROPIC_API_KEY`
- [ ] Verify: Still works, just uses fallback
- [ ] Restore `ANTHROPIC_API_KEY_CONTENT`

### Test 4: Development Server

- [ ] Run: `npm run dev`
- [ ] Open: http://localhost:3000
- [ ] Click Athena chat icon
- [ ] Send test message: "Hello Athena"
- [ ] Verify response works
- [ ] Check terminal for: `✓ ATHENA_CHAT: Using ANTHROPIC_API_KEY_CHAT`

### Test 5: Post-Chat Analysis

- [ ] Continue chat for 6+ messages (3+ exchanges)
- [ ] Close chat
- [ ] Wait 2-3 seconds
- [ ] Check terminal for analysis logs
- [ ] Verify no errors

### Test 6: Missing Key Error

- [ ] Stop dev server
- [ ] Comment out both: `ANTHROPIC_API_KEY_CONTENT` and `ANTHROPIC_API_KEY`
- [ ] Run: `npm run generate-content`
- [ ] Verify error: "Missing API key for CONTENT_GENERATION..."
- [ ] Restore keys
- [ ] Verify works again

---

## Phase 6: Git Commit (10 mins)

### Before Committing

- [ ] Review all changes: `git diff`
- [ ] Ensure `.env.local` is NOT staged: `git status`
- [ ] Verify `.env.local` in `.gitignore`

### Commit Changes

- [ ] Stage files: `git add .`
- [ ] Commit: `git commit -m "Implement centralized API key management system"`
- [ ] Review commit: `git show`

### Push to GitHub (Don't push yet - wait for Vercel/GitHub setup)

- [ ] **STOP** - Don't push yet!
- [ ] First complete Phase 7 (Vercel) and Phase 8 (GitHub Actions)
- [ ] Then come back and push

---

## Phase 7: Vercel Configuration (15 mins)

### Access Dashboard

- [ ] Go to https://vercel.com
- [ ] Select Prismatica Labs project
- [ ] Navigate to: Settings → Environment Variables

### Add New Variables

For **All Environments** (Production, Preview, Development):

- [ ] Add: `ANTHROPIC_API_KEY_CONTENT` = `sk-ant-api03-[your-content-key]`
- [ ] Add: `ANTHROPIC_API_KEY_CHAT` = `sk-ant-api03-[your-chat-key]`
- [ ] Add: `ANTHROPIC_API_KEY_ANALYSIS` = `sk-ant-api03-[your-analysis-key]` (optional)

### Verify Existing Variables

- [ ] Check: `ANTHROPIC_API_KEY` still exists (fallback)
- [ ] Check: `RESEND_API_KEY` still exists
- [ ] Check: `BLOB_READ_WRITE_TOKEN` still exists
- [ ] Check: `BLOB_URL` still exists

### Screenshot (Optional)

- [ ] Take screenshot of environment variables for reference

---

## Phase 8: GitHub Actions Configuration (10 mins)

### Access Repository Secrets

- [ ] Go to GitHub repository
- [ ] Navigate to: Settings → Secrets and variables → Actions

### Add/Update Secrets

- [ ] Check: `ANTHROPIC_API_KEY_CONTENT` exists
  - If not, create: New repository secret
  - Name: `ANTHROPIC_API_KEY_CONTENT`
  - Value: `sk-ant-api03-[your-content-key]`
- [ ] Verify: `BLOB_READ_WRITE_TOKEN` exists
- [ ] Verify: `GITHUB_TOKEN` exists (automatic)

### Update Workflow File

**File:** `.github/workflows/generate-content.yml`

- [ ] Find line 36: `ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}`
- [ ] Replace with:
  ```yaml
  ANTHROPIC_API_KEY_CONTENT: ${{ secrets.ANTHROPIC_API_KEY_CONTENT }}
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}  # Fallback
  ```
- [ ] Save file
- [ ] Commit: `git commit -m "Update GitHub Actions workflow for new API key system"`

---

## Phase 9: Deployment (15 mins)

### Push to GitHub

- [ ] Push all commits: `git push origin main`
- [ ] Wait for Vercel deployment to start
- [ ] Monitor deployment: https://vercel.com/[your-project]/deployments

### Monitor Deployment

- [ ] Click on latest deployment
- [ ] Check build logs for errors
- [ ] Wait for "Ready" status
- [ ] Copy production URL

### Test Production Deployment

- [ ] Open production URL
- [ ] Test Athena chat
- [ ] Send test message
- [ ] Verify response works
- [ ] Check Vercel logs for: `✓ ATHENA_CHAT: Using ANTHROPIC_API_KEY_CHAT`

### Test GitHub Actions

- [ ] Go to: Actions → Generate Dynamic Content
- [ ] Click: Run workflow → Run workflow
- [ ] Wait for workflow to complete
- [ ] Check logs for: `✓ CONTENT_GENERATION: Using ANTHROPIC_API_KEY_CONTENT`
- [ ] Verify: Blob upload succeeded
- [ ] Check: No errors in output

---

## Phase 10: Verification (30 mins)

### Anthropic Console Verification

- [ ] Go to: https://console.anthropic.com
- [ ] Navigate to: Usage dashboard
- [ ] Verify separate keys showing separate usage:
  - `ANTHROPIC_API_KEY_CONTENT` → Opus 4 requests
  - `ANTHROPIC_API_KEY_CHAT` → Sonnet 4.5 requests
- [ ] Check: Costs tracked separately

### Production Testing

- [ ] Test chat on live site (5+ messages)
- [ ] Test contact form
- [ ] Verify dynamic content loads
- [ ] Check Vercel logs for any warnings

### Scheduled Job Verification

- [ ] Wait for next scheduled run (every 6 hours)
- [ ] Go to: GitHub Actions → Generate Dynamic Content
- [ ] Verify: Latest scheduled run succeeded
- [ ] Check: Blob updated with new content

### Log Review

- [ ] Vercel logs: No API key errors
- [ ] Vercel logs: All services using correct keys
- [ ] GitHub Actions logs: Content generation successful
- [ ] No fallback warnings (unless intentional)

---

## Phase 11: Monitoring (Week 1)

### Daily Checks

- [ ] **Day 1:** Check Vercel logs for errors
- [ ] **Day 1:** Verify chat working on live site
- [ ] **Day 2:** Check GitHub Actions ran successfully
- [ ] **Day 3:** Review Anthropic Console usage
- [ ] **Day 4:** Test content generation manual trigger
- [ ] **Day 5:** Verify cost separation in Anthropic Console
- [ ] **Day 6:** Check for any fallback warnings
- [ ] **Day 7:** Full system health check

### Week 1 Report

- [ ] Total API calls per service
- [ ] Costs per service
- [ ] Any errors or warnings
- [ ] Performance compared to before
- [ ] Document any issues found

---

## Rollback Plan (If Needed)

### If Deployment Fails

- [ ] Go to: Vercel Dashboard → Deployments
- [ ] Find: Previous working deployment
- [ ] Click: "..." → Promote to Production
- [ ] Verify: Site working again

### If GitHub Actions Fails

- [ ] Revert workflow file: `git revert [commit-hash]`
- [ ] Push: `git push origin main`
- [ ] Verify: Next scheduled run succeeds

### If API Key Issues

- [ ] Check Vercel environment variables are correct
- [ ] Check GitHub secrets are correct
- [ ] Verify keys are valid in Anthropic Console
- [ ] Check `.env.local` for local testing

### Nuclear Option (Complete Rollback)

- [ ] Revert all changes: `git revert [commit-hash]`
- [ ] Push: `git push origin main`
- [ ] Remove new Vercel environment variables
- [ ] Remove new GitHub secrets
- [ ] Verify: System back to original state

---

## Success Criteria

### All Tests Pass

- [x] Content generation works locally
- [x] Chat works locally
- [x] Content generation works in production
- [x] Chat works in production
- [x] GitHub Actions runs successfully
- [x] Separate cost tracking visible in Anthropic Console

### No Errors

- [x] No API key errors in Vercel logs
- [x] No API key errors in GitHub Actions logs
- [x] No runtime errors on live site
- [x] Chat responds correctly

### Documentation Updated

- [x] CLAUDE.md updated
- [x] README.md updated
- [x] .env.example created
- [x] Roadmap documents created

### Monitoring Active

- [x] Anthropic Console showing separate usage
- [x] Vercel logs showing correct key usage
- [x] GitHub Actions running on schedule

---

## Completion

- [ ] All phases completed
- [ ] All tests passed
- [ ] No critical errors
- [ ] Monitoring in place
- [ ] Team notified of changes

**Date Completed:** _______________

**Completed By:** _______________

**Notes:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Post-Migration

### Optional Enhancements

- [ ] Set up cost alerts in Anthropic Console
- [ ] Create dashboard for API usage monitoring
- [ ] Add rate limiting per service type
- [ ] Implement retry logic for failed API calls

### Future Services Planning

- [ ] Document process for adding new advisors
- [ ] Create template for new API routes
- [ ] Plan which advisors to add next

---

**Next Steps After Completion:**

1. Monitor for 1 week
2. Review cost tracking data
3. Plan next advisor to add
4. Share learnings with team

---

**Questions or Issues?**

- See: `API_KEY_ARCHITECTURE_ROADMAP.md` for detailed solutions
- See: `API_KEY_ARCHITECTURE_DIAGRAM.md` for visual guides
- Ask Claude Code for help with specific problems
