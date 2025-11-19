# Multi-API Key Architecture Roadmap

**Date:** 2025-11-19
**Author:** Claude Code Analysis
**Purpose:** Comprehensive guide for implementing a scalable multi-API key system for Prismatica Labs

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Proposed Architecture](#proposed-architecture)
4. [Implementation Plan](#implementation-plan)
5. [Vercel Configuration](#vercel-configuration)
6. [GitHub Actions Configuration](#github-actions-configuration)
7. [Testing Plan](#testing-plan)
8. [Rollback Strategy](#rollback-strategy)
9. [Future Extensibility](#future-extensibility)

---

## Executive Summary

### Current Challenges

- API keys are partially separated (CONTENT vs CHAT) but inconsistently used
- `/api/generate-content` route still uses single `ANTHROPIC_API_KEY`
- No centralized API key management utility
- Adding new advisors/agents requires manual updates across multiple files
- Unclear naming conventions for future services

### Solution Overview

Implement a centralized API key management system with:
- Clear, consistent key naming convention
- Single source of truth for API key loading
- Graceful fallback mechanisms
- Easy extensibility for future advisors
- Comprehensive testing and rollback plan

### Benefits

- **Cost Tracking**: Separate keys enable per-service cost monitoring in Anthropic Console
- **Rate Limiting**: Independent rate limits per service
- **Security**: Isolation prevents one compromised key from affecting all services
- **Scalability**: Adding new advisors is a simple 3-step process
- **Debugging**: Clear which service is making which API calls

---

## Current State Analysis

### Files Using Anthropic API Keys

| File | Current Key Usage | Model | Purpose |
|------|------------------|-------|---------|
| `scripts/generate-dynamic-content.js` | `ANTHROPIC_API_KEY_CONTENT` (fallback: `ANTHROPIC_API_KEY`) | Opus 4 | Content generation |
| `app/api/chat/route.ts` | `ANTHROPIC_API_KEY_CHAT` (fallback: `ANTHROPIC_API_KEY`) | Sonnet 4.5 | Athena chat |
| `app/api/chat/end/route.ts` | `ANTHROPIC_API_KEY_CHAT` (fallback: `ANTHROPIC_API_KEY`) | Sonnet 4.5 | Post-chat analysis |
| `app/api/generate-content/route.ts` | ❌ `ANTHROPIC_API_KEY` (no fallback) | Opus 4 | Legacy webhook endpoint |

### Other Service Keys

| File | Key | Purpose |
|------|-----|---------|
| `app/api/enquiry/route.ts` | `RESEND_API_KEY` | Contact form emails |
| `app/api/products-enquiry/route.ts` | `RESEND_API_KEY` | Product enquiry emails |
| `scripts/generate-dynamic-content.js` | `BLOB_READ_WRITE_TOKEN` | Vercel Blob uploads |

### Current Fallback Pattern

```javascript
// Pattern used in scripts/generate-dynamic-content.js and app/api/chat/route.ts
const apiKey = process.env.ANTHROPIC_API_KEY_CONTENT || process.env.ANTHROPIC_API_KEY;
```

**Issues:**
1. ❌ Not consistently used (`/api/generate-content` doesn't use this pattern)
2. ❌ No validation or error messages for missing keys
3. ❌ Repeated code across multiple files
4. ❌ Hard to audit which key is actually being used

---

## Proposed Architecture

### Centralized API Key Manager

Create `/Users/raytarantino/A Code Space/Prism/prismatica-app/lib/apiKeyManager.ts`:

```typescript
/**
 * Centralized API key management for Prismatica Labs
 * Provides consistent key loading, validation, and fallback behavior
 */

export enum ServiceType {
  CONTENT_GENERATION = 'CONTENT_GENERATION',
  ATHENA_CHAT = 'ATHENA_CHAT',
  ATHENA_ANALYSIS = 'ATHENA_ANALYSIS', // Future: separate analysis key
  EMAIL = 'EMAIL',
  BLOB_STORAGE = 'BLOB_STORAGE'
}

interface KeyConfig {
  primaryEnvVar: string;
  fallbackEnvVar?: string;
  required: boolean;
  description: string;
}

const KEY_CONFIG: Record<ServiceType, KeyConfig> = {
  [ServiceType.CONTENT_GENERATION]: {
    primaryEnvVar: 'ANTHROPIC_API_KEY_CONTENT',
    fallbackEnvVar: 'ANTHROPIC_API_KEY',
    required: true,
    description: 'Claude Opus 4 for dynamic content generation'
  },
  [ServiceType.ATHENA_CHAT]: {
    primaryEnvVar: 'ANTHROPIC_API_KEY_CHAT',
    fallbackEnvVar: 'ANTHROPIC_API_KEY',
    required: true,
    description: 'Claude Sonnet 4.5 for Athena chat interactions'
  },
  [ServiceType.ATHENA_ANALYSIS]: {
    primaryEnvVar: 'ANTHROPIC_API_KEY_ANALYSIS',
    fallbackEnvVar: 'ANTHROPIC_API_KEY_CHAT', // Falls back to chat key
    required: false,
    description: 'Claude Sonnet 4.5 for post-chat analysis (optional, uses CHAT key if not set)'
  },
  [ServiceType.EMAIL]: {
    primaryEnvVar: 'RESEND_API_KEY',
    required: false,
    description: 'Resend API for email notifications'
  },
  [ServiceType.BLOB_STORAGE]: {
    primaryEnvVar: 'BLOB_READ_WRITE_TOKEN',
    required: true,
    description: 'Vercel Blob storage for dynamic content and intelligence data'
  }
};

export class ApiKeyError extends Error {
  constructor(
    public service: ServiceType,
    public message: string,
    public envVar?: string
  ) {
    super(message);
    this.name = 'ApiKeyError';
  }
}

/**
 * Get API key for a specific service with fallback support
 * Throws ApiKeyError if required key is missing
 */
export function getApiKey(service: ServiceType): string {
  const config = KEY_CONFIG[service];

  // Try primary key first
  let key = process.env[config.primaryEnvVar];
  let usedEnvVar = config.primaryEnvVar;

  // Try fallback if primary is missing
  if (!key && config.fallbackEnvVar) {
    key = process.env[config.fallbackEnvVar];
    usedEnvVar = config.fallbackEnvVar;

    if (key) {
      console.warn(
        `⚠️  ${service}: Using fallback key ${config.fallbackEnvVar} ` +
        `(${config.primaryEnvVar} not set)`
      );
    }
  }

  // Validate required keys
  if (!key && config.required) {
    const errorMsg = config.fallbackEnvVar
      ? `Missing API key for ${service}. Set either ${config.primaryEnvVar} or ${config.fallbackEnvVar}.`
      : `Missing required API key for ${service}. Set ${config.primaryEnvVar}.`;

    throw new ApiKeyError(service, errorMsg, config.primaryEnvVar);
  }

  // Log which key is being used (for debugging)
  if (key) {
    console.log(`✓ ${service}: Using ${usedEnvVar}`);
  }

  return key || '';
}

/**
 * Validate all required API keys are present
 * Useful for startup checks
 */
export function validateRequiredKeys(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const [service, config] of Object.entries(KEY_CONFIG)) {
    if (config.required) {
      try {
        getApiKey(service as ServiceType);
      } catch (error) {
        if (error instanceof ApiKeyError) {
          errors.push(error.message);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get diagnostic info about current API key configuration
 * Useful for debugging and health checks
 */
export function getKeyDiagnostics(): Record<ServiceType, {
  configured: boolean;
  usingFallback: boolean;
  envVar: string | null;
}> {
  const diagnostics: any = {};

  for (const service of Object.values(ServiceType)) {
    const config = KEY_CONFIG[service];
    const primaryKey = process.env[config.primaryEnvVar];
    const fallbackKey = config.fallbackEnvVar ? process.env[config.fallbackEnvVar] : null;

    diagnostics[service] = {
      configured: !!(primaryKey || fallbackKey),
      usingFallback: !primaryKey && !!fallbackKey,
      envVar: primaryKey ? config.primaryEnvVar : (fallbackKey ? config.fallbackEnvVar : null)
    };
  }

  return diagnostics;
}
```

### Naming Convention for Future Services

```bash
# Claude-based services (AI advisors/agents)
ANTHROPIC_API_KEY_CONTENT=     # Content generation (Opus 4)
ANTHROPIC_API_KEY_CHAT=        # Athena chat (Sonnet 4.5)
ANTHROPIC_API_KEY_ANALYSIS=    # Post-chat analysis (Sonnet 4.5)
ANTHROPIC_API_KEY_ADVISOR2=    # Future: Second advisor agent
ANTHROPIC_API_KEY_ADVISOR3=    # Future: Third advisor agent

# Other services
RESEND_API_KEY=                # Email service
BLOB_READ_WRITE_TOKEN=         # Vercel Blob storage
BLOB_URL=                      # Vercel Blob public URL

# Generic fallback (for backward compatibility)
ANTHROPIC_API_KEY=             # Fallback for all Claude services
```

**Convention Rules:**
1. Claude services: `ANTHROPIC_API_KEY_[SERVICE]`
2. Service name should be UPPERCASE, SNAKE_CASE
3. Service name should describe the PURPOSE (e.g., CHAT, CONTENT, ANALYSIS)
4. Maintain `ANTHROPIC_API_KEY` as universal fallback

---

## Implementation Plan

### Phase 1: Create API Key Manager (30 mins)

**Step 1.1: Create the utility file**

```bash
# File: /Users/raytarantino/A Code Space/Prism/prismatica-app/lib/apiKeyManager.ts
# (Use the full TypeScript code from "Proposed Architecture" section above)
```

**Step 1.2: Add tests (optional but recommended)**

Create `/Users/raytarantino/A Code Space/Prism/prismatica-app/lib/__tests__/apiKeyManager.test.ts`:

```typescript
import { getApiKey, ServiceType, ApiKeyError } from '../apiKeyManager';

describe('apiKeyManager', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('should return primary key when available', () => {
    process.env.ANTHROPIC_API_KEY_CHAT = 'primary-key';
    process.env.ANTHROPIC_API_KEY = 'fallback-key';

    expect(getApiKey(ServiceType.ATHENA_CHAT)).toBe('primary-key');
  });

  test('should fallback to generic key when primary missing', () => {
    process.env.ANTHROPIC_API_KEY = 'fallback-key';
    delete process.env.ANTHROPIC_API_KEY_CHAT;

    expect(getApiKey(ServiceType.ATHENA_CHAT)).toBe('fallback-key');
  });

  test('should throw ApiKeyError for missing required key', () => {
    delete process.env.ANTHROPIC_API_KEY_CONTENT;
    delete process.env.ANTHROPIC_API_KEY;

    expect(() => getApiKey(ServiceType.CONTENT_GENERATION))
      .toThrow(ApiKeyError);
  });
});
```

### Phase 2: Update Existing Files (1 hour)

**Step 2.1: Update content generation script**

File: `/Users/raytarantino/A Code Space/Prism/prismatica-app/scripts/generate-dynamic-content.js`

```javascript
// BEFORE (line 21):
const apiKey = process.env.ANTHROPIC_API_KEY_CONTENT || process.env.ANTHROPIC_API_KEY;
const anthropic = new Anthropic({
  apiKey: apiKey,
});

// AFTER:
import { getApiKey, ServiceType } from '../lib/apiKeyManager.js';

const apiKey = getApiKey(ServiceType.CONTENT_GENERATION);
const anthropic = new Anthropic({
  apiKey: apiKey,
});
```

**Note:** Since this is a `.js` file (not TypeScript), you'll need to either:
1. Convert it to TypeScript (`.ts`), OR
2. Create a JavaScript-compatible version of the key manager

**Recommended:** Create `/Users/raytarantino/A Code Space/Prism/prismatica-app/lib/apiKeyManager.js`:

```javascript
/**
 * JavaScript version of API key manager for use in Node scripts
 * For full TypeScript version, see apiKeyManager.ts
 */

export const ServiceType = {
  CONTENT_GENERATION: 'CONTENT_GENERATION',
  ATHENA_CHAT: 'ATHENA_CHAT',
  ATHENA_ANALYSIS: 'ATHENA_ANALYSIS',
  EMAIL: 'EMAIL',
  BLOB_STORAGE: 'BLOB_STORAGE'
};

const KEY_CONFIG = {
  [ServiceType.CONTENT_GENERATION]: {
    primaryEnvVar: 'ANTHROPIC_API_KEY_CONTENT',
    fallbackEnvVar: 'ANTHROPIC_API_KEY',
    required: true,
    description: 'Claude Opus 4 for dynamic content generation'
  },
  [ServiceType.ATHENA_CHAT]: {
    primaryEnvVar: 'ANTHROPIC_API_KEY_CHAT',
    fallbackEnvVar: 'ANTHROPIC_API_KEY',
    required: true,
    description: 'Claude Sonnet 4.5 for Athena chat interactions'
  },
  [ServiceType.ATHENA_ANALYSIS]: {
    primaryEnvVar: 'ANTHROPIC_API_KEY_ANALYSIS',
    fallbackEnvVar: 'ANTHROPIC_API_KEY_CHAT',
    required: false,
    description: 'Claude Sonnet 4.5 for post-chat analysis'
  },
  [ServiceType.EMAIL]: {
    primaryEnvVar: 'RESEND_API_KEY',
    required: false,
    description: 'Resend API for email notifications'
  },
  [ServiceType.BLOB_STORAGE]: {
    primaryEnvVar: 'BLOB_READ_WRITE_TOKEN',
    required: true,
    description: 'Vercel Blob storage'
  }
};

export class ApiKeyError extends Error {
  constructor(service, message, envVar) {
    super(message);
    this.name = 'ApiKeyError';
    this.service = service;
    this.envVar = envVar;
  }
}

export function getApiKey(service) {
  const config = KEY_CONFIG[service];

  let key = process.env[config.primaryEnvVar];
  let usedEnvVar = config.primaryEnvVar;

  if (!key && config.fallbackEnvVar) {
    key = process.env[config.fallbackEnvVar];
    usedEnvVar = config.fallbackEnvVar;

    if (key) {
      console.warn(
        `⚠️  ${service}: Using fallback key ${config.fallbackEnvVar} ` +
        `(${config.primaryEnvVar} not set)`
      );
    }
  }

  if (!key && config.required) {
    const errorMsg = config.fallbackEnvVar
      ? `Missing API key for ${service}. Set either ${config.primaryEnvVar} or ${config.fallbackEnvVar}.`
      : `Missing required API key for ${service}. Set ${config.primaryEnvVar}.`;

    throw new ApiKeyError(service, errorMsg, config.primaryEnvVar);
  }

  if (key) {
    console.log(`✓ ${service}: Using ${usedEnvVar}`);
  }

  return key || '';
}

export function validateRequiredKeys() {
  const errors = [];

  for (const [service, config] of Object.entries(KEY_CONFIG)) {
    if (config.required) {
      try {
        getApiKey(service);
      } catch (error) {
        if (error instanceof ApiKeyError) {
          errors.push(error.message);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
```

**Step 2.2: Update Athena chat route**

File: `/Users/raytarantino/A Code Space/Prism/prismatica-app/app/api/chat/route.ts`

```typescript
// BEFORE (lines 444-451):
const apiKey = process.env.ANTHROPIC_API_KEY_CHAT || process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  return NextResponse.json(
    { error: 'ANTHROPIC_API_KEY_CHAT or ANTHROPIC_API_KEY environment variable is not set' },
    { status: 500 }
  );
}

// AFTER:
import { getApiKey, ServiceType, ApiKeyError } from '@/lib/apiKeyManager';

try {
  const apiKey = getApiKey(ServiceType.ATHENA_CHAT);
  const anthropic = new Anthropic({ apiKey });

  // ... rest of code
} catch (error) {
  if (error instanceof ApiKeyError) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  // ... other error handling
}
```

**Step 2.3: Update post-chat analysis route**

File: `/Users/raytarantino/A Code Space/Prism/prismatica-app/app/api/chat/end/route.ts`

```typescript
// BEFORE (lines 56-63):
const apiKey = process.env.ANTHROPIC_API_KEY_CHAT || process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  return NextResponse.json(
    { error: 'API key not configured' },
    { status: 500 }
  );
}

// AFTER:
import { getApiKey, ServiceType, ApiKeyError } from '@/lib/apiKeyManager';

try {
  const apiKey = getApiKey(ServiceType.ATHENA_ANALYSIS); // Use separate analysis key
  const anthropic = new Anthropic({ apiKey });

  // ... rest of code
} catch (error) {
  if (error instanceof ApiKeyError) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  // ... other error handling
}
```

**Step 2.4: Update legacy webhook endpoint**

File: `/Users/raytarantino/A Code Space/Prism/prismatica-app/app/api/generate-content/route.ts`

```typescript
// BEFORE (lines 7-9):
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// AFTER:
import { getApiKey, ServiceType } from '@/lib/apiKeyManager';

const anthropic = new Anthropic({
  apiKey: getApiKey(ServiceType.CONTENT_GENERATION),
});
```

**Step 2.5: Update email routes (optional - for consistency)**

Files:
- `/Users/raytarantino/A Code Space/Prism/prismatica-app/app/api/enquiry/route.ts`
- `/Users/raytarantino/A Code Space/Prism/prismatica-app/app/api/products-enquiry/route.ts`

```typescript
// BEFORE:
if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️  RESEND_API_KEY not set - email not sent');
  // ... continue without email
}
const resend = new Resend(process.env.RESEND_API_KEY);

// AFTER:
import { getApiKey, ServiceType } from '@/lib/apiKeyManager';

const emailKey = getApiKey(ServiceType.EMAIL);
if (!emailKey) {
  console.warn('⚠️  RESEND_API_KEY not set - email not sent');
  // ... continue without email
}
const resend = new Resend(emailKey);
```

### Phase 3: Update Documentation (15 mins)

**Step 3.1: Update CLAUDE.md**

File: `/Users/raytarantino/A Code Space/Prism/prismatica-app/CLAUDE.md`

Find the Environment Variables section and update:

```markdown
### Environment Variables

Required in `.env.local`:

```bash
# Separate API keys for different Claude-based services
ANTHROPIC_API_KEY_CONTENT=  # For content generation (uses Opus 4)
ANTHROPIC_API_KEY_CHAT=     # For Athena chat (uses Sonnet 4.5)
ANTHROPIC_API_KEY_ANALYSIS= # For post-chat analysis (optional, uses CHAT key if not set)
ANTHROPIC_API_KEY=          # Universal fallback for all Claude services

# Other services
RESEND_API_KEY=             # Email notifications (optional)
BLOB_READ_WRITE_TOKEN=      # Vercel Blob storage (required)
BLOB_URL=                   # Public URL of your blob (set by Vercel)
```

**API Key Management:**
- All API keys are managed through `lib/apiKeyManager.ts`
- Keys follow pattern: `ANTHROPIC_API_KEY_[SERVICE]`
- Graceful fallback to `ANTHROPIC_API_KEY` if service-specific key not set
- See API_KEY_ARCHITECTURE_ROADMAP.md for adding new services
```

**Step 3.2: Update README.md**

File: `/Users/raytarantino/A Code Space/Prism/prismatica-app/README.md`

```markdown
## Environment Setup

Create `.env.local` with:

```bash
# Claude API keys (separate keys for cost tracking)
ANTHROPIC_API_KEY_CONTENT=  # For content generation
ANTHROPIC_API_KEY_CHAT=     # For Athena chat
ANTHROPIC_API_KEY=          # Fallback for both

# Other services
RESEND_API_KEY=             # Email notifications
BLOB_READ_WRITE_TOKEN=      # Vercel Blob storage
```

See [API_KEY_ARCHITECTURE_ROADMAP.md](./API_KEY_ARCHITECTURE_ROADMAP.md) for details.
```

**Step 3.3: Create .env.example file**

File: `/Users/raytarantino/A Code Space/Prism/prismatica-app/.env.example`

```bash
# Anthropic Claude API Keys
# For separate cost tracking and rate limiting per service

# Content generation (Claude Opus 4)
ANTHROPIC_API_KEY_CONTENT=sk-ant-api03-xxxxx

# Athena chat assistant (Claude Sonnet 4.5)
ANTHROPIC_API_KEY_CHAT=sk-ant-api03-xxxxx

# Post-chat analysis (Claude Sonnet 4.5)
# Optional - falls back to ANTHROPIC_API_KEY_CHAT if not set
ANTHROPIC_API_KEY_ANALYSIS=sk-ant-api03-xxxxx

# Universal fallback for all Claude services
# Used if service-specific key not set
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Email service (Resend)
# Optional - emails won't be sent if not set
RESEND_API_KEY=re_xxxxx

# Vercel Blob Storage
# Required for dynamic content and Athena intelligence storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
BLOB_URL=https://your-blob-store.public.blob.vercel-storage.com/dynamic-content.json
```

---

## Vercel Configuration

### Step 1: Access Vercel Dashboard

1. Go to https://vercel.com
2. Select your Prismatica Labs project
3. Navigate to **Settings** → **Environment Variables**

### Step 2: Add New Environment Variables

Add the following environment variables for **All Environments** (Production, Preview, Development):

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `ANTHROPIC_API_KEY_CONTENT` | `sk-ant-api03-[your-content-key]` | For content generation (Opus 4) |
| `ANTHROPIC_API_KEY_CHAT` | `sk-ant-api03-[your-chat-key]` | For Athena chat (Sonnet 4.5) |
| `ANTHROPIC_API_KEY_ANALYSIS` | `sk-ant-api03-[your-analysis-key]` | For post-chat analysis (optional) |

**Keep existing:**
- `ANTHROPIC_API_KEY` (as fallback)
- `RESEND_API_KEY`
- `BLOB_READ_WRITE_TOKEN`
- `BLOB_URL`

### Step 3: Environment-Specific Configuration (Optional)

If you want different keys for development vs production:

**Production:**
```
ANTHROPIC_API_KEY_CONTENT = sk-ant-api03-[prod-content-key]
ANTHROPIC_API_KEY_CHAT = sk-ant-api03-[prod-chat-key]
```

**Preview/Development:**
```
ANTHROPIC_API_KEY_CONTENT = sk-ant-api03-[dev-content-key]
ANTHROPIC_API_KEY_CHAT = sk-ant-api03-[dev-chat-key]
```

### Step 4: Redeploy

After adding environment variables:

```bash
# Option 1: Trigger via git push
git commit -m "Update API key architecture"
git push origin main

# Option 2: Manual redeploy from Vercel dashboard
# Go to Deployments → [latest deployment] → Redeploy
```

**Important:** Environment variable changes require a redeploy to take effect.

---

## GitHub Actions Configuration

### Step 1: Access GitHub Repository Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### Step 2: Add/Update Secrets

Add these repository secrets:

| Secret Name | Value | Used By |
|-------------|-------|---------|
| `ANTHROPIC_API_KEY_CONTENT` | `sk-ant-api03-[your-content-key]` | Content generation workflow |
| `BLOB_READ_WRITE_TOKEN` | `vercel_blob_rw_[your-token]` | Blob storage uploads |

**Keep existing:**
- `GITHUB_TOKEN` (automatically provided by GitHub)

### Step 3: Update GitHub Actions Workflow

File: `/Users/raytarantino/A Code Space/Prism/prismatica-app/.github/workflows/generate-content.yml`

```yaml
# BEFORE (lines 34-38):
- name: Generate dynamic content
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
    BLOB_READ_WRITE_TOKEN: ${{ secrets.BLOB_READ_WRITE_TOKEN }}
  run: npm run generate-content

# AFTER:
- name: Generate dynamic content
  env:
    ANTHROPIC_API_KEY_CONTENT: ${{ secrets.ANTHROPIC_API_KEY_CONTENT }}
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}  # Fallback
    BLOB_READ_WRITE_TOKEN: ${{ secrets.BLOB_READ_WRITE_TOKEN }}
  run: npm run generate-content
```

### Step 4: Test Workflow

```bash
# Trigger manual workflow run from GitHub UI
# Go to: Actions → Generate Dynamic Content → Run workflow → Run workflow
```

Watch the logs to verify:
- ✓ Content generation uses correct API key
- ✓ No "missing API key" errors
- ✓ Blob upload succeeds

---

## Testing Plan

### Pre-Deployment Testing (Local)

**Test 1: Verify API Key Manager Works**

```bash
# Create a test file: /Users/raytarantino/A Code Space/Prism/prismatica-app/scripts/test-api-keys.js

import { getApiKey, ServiceType, validateRequiredKeys } from '../lib/apiKeyManager.js';

console.log('Testing API Key Manager...\n');

// Test individual keys
try {
  console.log('Content Generation Key:', getApiKey(ServiceType.CONTENT_GENERATION) ? '✓ Found' : '✗ Missing');
} catch (error) {
  console.error('✗ Content Generation:', error.message);
}

try {
  console.log('Athena Chat Key:', getApiKey(ServiceType.ATHENA_CHAT) ? '✓ Found' : '✗ Missing');
} catch (error) {
  console.error('✗ Athena Chat:', error.message);
}

// Validate all required keys
console.log('\nValidating all required keys...');
const validation = validateRequiredKeys();
if (validation.valid) {
  console.log('✓ All required keys configured');
} else {
  console.error('✗ Missing required keys:');
  validation.errors.forEach(err => console.error('  -', err));
}
```

Run test:
```bash
node scripts/test-api-keys.js
```

**Test 2: Content Generation with New System**

```bash
# Ensure .env.local has both keys:
ANTHROPIC_API_KEY_CONTENT=sk-ant-api03-xxxxx
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx  # fallback

# Run content generation
npm run generate-content

# Verify output shows:
# ✓ CONTENT_GENERATION: Using ANTHROPIC_API_KEY_CONTENT
```

**Test 3: Fallback Behavior**

```bash
# Temporarily remove specific key from .env.local
# Keep only: ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Run content generation
npm run generate-content

# Verify output shows:
# ⚠️  CONTENT_GENERATION: Using fallback key ANTHROPIC_API_KEY (ANTHROPIC_API_KEY_CONTENT not set)
```

**Test 4: Chat API Locally**

```bash
# Start dev server
npm run dev

# Open http://localhost:3000
# Open browser console
# Click Athena chat icon
# Send a message

# Check terminal logs for:
# ✓ ATHENA_CHAT: Using ANTHROPIC_API_KEY_CHAT
```

**Test 5: Missing Required Key Error**

```bash
# Remove both keys from .env.local
# ANTHROPIC_API_KEY_CONTENT=
# ANTHROPIC_API_KEY=

# Run content generation
npm run generate-content

# Verify it throws error:
# Missing API key for CONTENT_GENERATION. Set either ANTHROPIC_API_KEY_CONTENT or ANTHROPIC_API_KEY.
```

### Post-Deployment Testing (Production)

**Test 1: Verify Vercel Environment Variables**

```bash
# Deploy to production
git push origin main

# Check Vercel deployment logs for:
# ✓ CONTENT_GENERATION: Using ANTHROPIC_API_KEY_CONTENT
# ✓ ATHENA_CHAT: Using ANTHROPIC_API_KEY_CHAT
```

**Test 2: Test Live Chat**

1. Go to production site
2. Open Athena chat
3. Send test message
4. Verify response works correctly

**Test 3: Verify GitHub Actions**

1. Go to **Actions** → **Generate Dynamic Content**
2. Click **Run workflow**
3. Wait for completion
4. Check logs for:
   - ✓ Content generation succeeded
   - ✓ Blob upload succeeded
   - No API key errors

**Test 4: Monitor Anthropic Console**

1. Go to https://console.anthropic.com
2. Check **Usage** dashboard
3. Verify separate API keys show separate usage:
   - Content generation key: Shows Opus 4 usage
   - Chat key: Shows Sonnet 4.5 usage

### Monitoring (Ongoing)

**Daily Checks:**
- GitHub Actions runs successfully every 6 hours
- No "missing API key" errors in Vercel logs
- Athena chat responds correctly on live site

**Weekly Checks:**
- Review Anthropic Console for cost per service
- Check Vercel logs for any fallback warnings

---

## Rollback Strategy

### If Something Goes Wrong

**Scenario 1: Deployment breaks chat functionality**

```bash
# Quick rollback on Vercel:
# 1. Go to Vercel Dashboard → Deployments
# 2. Find previous working deployment
# 3. Click "..." → Promote to Production

# Or via CLI:
vercel rollback [deployment-url]
```

**Scenario 2: GitHub Actions fails**

```bash
# Restore old workflow file:
git revert [commit-hash]
git push origin main

# Or manually edit .github/workflows/generate-content.yml
# Change back to:
env:
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

**Scenario 3: API key manager has bugs**

```bash
# Revert all changes:
git revert [commit-hash]
git push origin main

# Or hotfix by bypassing key manager:
# In each affected file, replace:
import { getApiKey, ServiceType } from '@/lib/apiKeyManager';
const apiKey = getApiKey(ServiceType.CONTENT_GENERATION);

# With old pattern:
const apiKey = process.env.ANTHROPIC_API_KEY_CONTENT || process.env.ANTHROPIC_API_KEY;
```

### Rollback Checklist

- [ ] Verify old deployment is working
- [ ] Check GitHub Actions runs successfully
- [ ] Test chat on live site
- [ ] Remove any new environment variables from Vercel if needed
- [ ] Document what went wrong for future reference

---

## Future Extensibility

### Adding a New AI Advisor (Example: Marketing Advisor)

**Step 1: Add to API Key Manager**

Edit `/Users/raytarantino/A Code Space/Prism/prismatica-app/lib/apiKeyManager.ts`:

```typescript
export enum ServiceType {
  CONTENT_GENERATION = 'CONTENT_GENERATION',
  ATHENA_CHAT = 'ATHENA_CHAT',
  ATHENA_ANALYSIS = 'ATHENA_ANALYSIS',
  MARKETING_ADVISOR = 'MARKETING_ADVISOR', // ← NEW
  EMAIL = 'EMAIL',
  BLOB_STORAGE = 'BLOB_STORAGE'
}

const KEY_CONFIG: Record<ServiceType, KeyConfig> = {
  // ... existing configs ...

  [ServiceType.MARKETING_ADVISOR]: { // ← NEW
    primaryEnvVar: 'ANTHROPIC_API_KEY_MARKETING',
    fallbackEnvVar: 'ANTHROPIC_API_KEY',
    required: true,
    description: 'Claude Haiku for quick marketing insights'
  }
};
```

**Step 2: Create API Route**

Create `/Users/raytarantino/A Code Space/Prism/prismatica-app/app/api/marketing-advisor/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getApiKey, ServiceType } from '@/lib/apiKeyManager';

export async function POST(request: NextRequest) {
  try {
    const apiKey = getApiKey(ServiceType.MARKETING_ADVISOR);
    const anthropic = new Anthropic({ apiKey });

    const { message } = await request.json();

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }]
    });

    return NextResponse.json({ response: response.content[0].text });
  } catch (error) {
    console.error('Marketing advisor error:', error);
    return NextResponse.json({ error: 'Failed to get marketing advice' }, { status: 500 });
  }
}
```

**Step 3: Add Environment Variables**

**Local (.env.local):**
```bash
ANTHROPIC_API_KEY_MARKETING=sk-ant-api03-xxxxx
```

**Vercel:**
- Settings → Environment Variables
- Add: `ANTHROPIC_API_KEY_MARKETING` = `sk-ant-api03-xxxxx`

**GitHub Actions (if needed):**
- Settings → Secrets → Actions
- Add: `ANTHROPIC_API_KEY_MARKETING`

**That's it!** The new advisor is fully integrated with:
- ✓ Separate API key for cost tracking
- ✓ Graceful fallback to `ANTHROPIC_API_KEY`
- ✓ Consistent error handling
- ✓ Clear logging

### Adding Non-Claude Services

**Example: OpenAI Integration**

```typescript
// In apiKeyManager.ts:
export enum ServiceType {
  // ... existing ...
  OPENAI_GPT = 'OPENAI_GPT'
}

const KEY_CONFIG: Record<ServiceType, KeyConfig> = {
  // ... existing ...

  [ServiceType.OPENAI_GPT]: {
    primaryEnvVar: 'OPENAI_API_KEY',
    required: false,
    description: 'OpenAI GPT-4 for specialized tasks'
  }
};
```

### Best Practices for New Services

1. **Always use the key manager** - Never bypass it with direct `process.env` calls
2. **Document in CLAUDE.md** - Add to environment variables section
3. **Update .env.example** - Help future developers know what's needed
4. **Choose descriptive names** - `ANTHROPIC_API_KEY_MARKETING` not `ANTHROPIC_API_KEY_2`
5. **Set required flag correctly** - Only mark as `required: true` if app can't function without it
6. **Test fallback behavior** - Ensure graceful degradation when optional keys missing

---

## Summary Checklist

### Implementation Checklist

**Phase 1: API Key Manager**
- [ ] Create `lib/apiKeyManager.ts` (TypeScript version)
- [ ] Create `lib/apiKeyManager.js` (JavaScript version for scripts)
- [ ] (Optional) Create tests in `lib/__tests__/apiKeyManager.test.ts`

**Phase 2: Update Files**
- [ ] Update `scripts/generate-dynamic-content.js`
- [ ] Update `app/api/chat/route.ts`
- [ ] Update `app/api/chat/end/route.ts`
- [ ] Update `app/api/generate-content/route.ts`
- [ ] (Optional) Update `app/api/enquiry/route.ts`
- [ ] (Optional) Update `app/api/products-enquiry/route.ts`

**Phase 3: Documentation**
- [ ] Update `CLAUDE.md` environment variables section
- [ ] Update `README.md` environment setup section
- [ ] Create `.env.example` file

**Phase 4: Configuration**
- [ ] Add Vercel environment variables
- [ ] Update GitHub Actions secrets
- [ ] Update `.github/workflows/generate-content.yml`

**Phase 5: Testing**
- [ ] Run local API key manager tests
- [ ] Test content generation locally
- [ ] Test fallback behavior
- [ ] Test chat API locally
- [ ] Deploy to production
- [ ] Test live chat
- [ ] Verify GitHub Actions
- [ ] Monitor Anthropic Console

### Rollback Preparation
- [ ] Document current working state
- [ ] Know how to rollback Vercel deployment
- [ ] Have git revert command ready
- [ ] Test rollback procedure in development

---

## Questions & Answers

**Q: Can I use the same API key for all services?**
A: Yes, just set `ANTHROPIC_API_KEY` and leave the service-specific keys empty. The system will fallback automatically.

**Q: How do I know which API key is being used?**
A: Check the logs - the key manager logs which key it's using on every request:
```
✓ CONTENT_GENERATION: Using ANTHROPIC_API_KEY_CONTENT
✓ ATHENA_CHAT: Using ANTHROPIC_API_KEY_CHAT
```

**Q: What happens if I forget to set a required key?**
A: The application will throw an `ApiKeyError` with a clear message telling you which key to set.

**Q: Can I have different keys for development vs production?**
A: Yes! Use Vercel's environment-specific variables. Set different values for "Production" vs "Preview/Development".

**Q: How do I add a new advisor?**
A: Follow the 3-step process in "Future Extensibility" section:
1. Add to `ServiceType` enum and `KEY_CONFIG`
2. Create API route using `getApiKey(ServiceType.YOUR_ADVISOR)`
3. Add environment variables to .env.local, Vercel, and GitHub

**Q: Do I need to restart the server after changing API keys?**
A:
- **Local development:** Yes, restart `npm run dev`
- **Vercel production:** Yes, redeploy the application
- **GitHub Actions:** No, it loads fresh on each run

**Q: What if one of my API keys gets revoked?**
A: Replace just that one key:
1. Generate new key in Anthropic Console
2. Update in Vercel environment variables (for that specific key only)
3. Redeploy
4. Other services continue working with their own keys

---

**End of Roadmap**

*For questions or issues, refer to CLAUDE.md or create a GitHub issue.*
