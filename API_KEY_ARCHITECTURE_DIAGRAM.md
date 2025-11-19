# API Key Architecture - Visual Guide

## Current Architecture (Before Migration)

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENVIRONMENT VARIABLES                         │
├─────────────────────────────────────────────────────────────────┤
│  ANTHROPIC_API_KEY_CONTENT = sk-ant-api03-xxxxx                │
│  ANTHROPIC_API_KEY_CHAT = sk-ant-api03-xxxxx                   │
│  ANTHROPIC_API_KEY = sk-ant-api03-xxxxx (fallback)             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ↓                     ↓                     ↓
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Content Gen  │    │  Athena Chat  │    │   Webhook     │
│   (Script)    │    │   (API Route) │    │  (API Route)  │
├───────────────┤    ├───────────────┤    ├───────────────┤
│ Manual        │    │ Manual        │    │ Direct        │
│ fallback      │    │ fallback      │    │ access        │
│ logic ✅      │    │ logic ✅      │    │ ❌ No         │
│               │    │               │    │ separation    │
│ CONTENT ||    │    │ CHAT ||       │    │ Uses base     │
│ ANTHROPIC     │    │ ANTHROPIC     │    │ key only      │
└───────────────┘    └───────────────┘    └───────────────┘
```

**Problems:**
- 🔴 Inconsistent patterns (each file has different logic)
- 🔴 Code duplication (fallback logic repeated)
- 🔴 Webhook endpoint doesn't use separate key
- 🔴 Hard to audit which key is actually used
- 🔴 Adding new services requires repeating fallback code

---

## New Architecture (After Migration)

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENVIRONMENT VARIABLES                         │
├─────────────────────────────────────────────────────────────────┤
│  ANTHROPIC_API_KEY_CONTENT = sk-ant-api03-xxxxx                │
│  ANTHROPIC_API_KEY_CHAT = sk-ant-api03-xxxxx                   │
│  ANTHROPIC_API_KEY_ANALYSIS = sk-ant-api03-xxxxx               │
│  ANTHROPIC_API_KEY = sk-ant-api03-xxxxx (universal fallback)   │
│  RESEND_API_KEY = re_xxxxx                                     │
│  BLOB_READ_WRITE_TOKEN = vercel_blob_rw_xxxxx                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
        ┌─────────────────────────────────────────┐
        │    lib/apiKeyManager.ts                 │
        │    (Single Source of Truth)             │
        ├─────────────────────────────────────────┤
        │  ✅ Automatic fallback                  │
        │  ✅ Validation & error messages         │
        │  ✅ Logging (which key used)            │
        │  ✅ Type-safe service enumeration       │
        └─────────────────────────────────────────┘
                              │
                              ↓
        ┌─────────────────────┼─────────────────────┬─────────────────────┐
        │                     │                     │                     │
        ↓                     ↓                     ↓                     ↓
┌───────────────┐    ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Content Gen  │    │  Athena Chat  │    │   Analysis    │    │   Webhook     │
│   (Script)    │    │   (API Route) │    │  (API Route)  │    │  (API Route)  │
├───────────────┤    ├───────────────┤    ├───────────────┤    ├───────────────┤
│ getApiKey(    │    │ getApiKey(    │    │ getApiKey(    │    │ getApiKey(    │
│   CONTENT_    │    │   ATHENA_     │    │   ATHENA_     │    │   CONTENT_    │
│   GENERATION) │    │   CHAT)       │    │   ANALYSIS)   │    │   GENERATION) │
└───────────────┘    └───────────────┘    └───────────────┘    └───────────────┘
```

**Benefits:**
- 🟢 Single source of truth
- 🟢 Consistent everywhere
- 🟢 Clear logging shows which key used
- 🟢 Easy to add new services
- 🟢 Automatic validation

---

## API Key Manager - Internal Flow

```
┌─────────────────────────────────────────────────────────────┐
│  Application calls: getApiKey(ServiceType.ATHENA_CHAT)      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  1. Look up config for ATHENA_CHAT                          │
│     primaryEnvVar: "ANTHROPIC_API_KEY_CHAT"                 │
│     fallbackEnvVar: "ANTHROPIC_API_KEY"                     │
│     required: true                                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  2. Try primary: process.env.ANTHROPIC_API_KEY_CHAT         │
└────────────┬───────────────────────────────┬────────────────┘
             │                               │
       Found │                               │ Not found
             ↓                               ↓
┌──────────────────────┐        ┌──────────────────────────────┐
│  Return primary key  │        │  3. Try fallback:            │
│  Log: "✓ Using       │        │     process.env.ANTHROPIC_   │
│   PRIMARY_KEY"       │        │     API_KEY                  │
└──────────────────────┘        └────────────┬─────────────────┘
                                             │
                                       Found │    Not found
                                             ↓         ↓
                              ┌──────────────────┐  ┌────────────┐
                              │  Return fallback │  │  Throw     │
                              │  Log: "⚠️  Using │  │  ApiKey    │
                              │   fallback"      │  │  Error     │
                              └──────────────────┘  └────────────┘
```

---

## Service Type Enumeration

```typescript
enum ServiceType {
  CONTENT_GENERATION,  // ← Claude Opus 4 for news-based content
  ATHENA_CHAT,         // ← Claude Sonnet 4.5 for real-time chat
  ATHENA_ANALYSIS,     // ← Claude Sonnet 4.5 for post-chat summaries
  EMAIL,               // ← Resend for notifications
  BLOB_STORAGE         // ← Vercel Blob for content storage
}
```

**Adding new service:**
```typescript
enum ServiceType {
  // ... existing ...
  MARKETING_ADVISOR    // ← Just add new line here
}

// Then add to KEY_CONFIG:
[ServiceType.MARKETING_ADVISOR]: {
  primaryEnvVar: 'ANTHROPIC_API_KEY_MARKETING',
  fallbackEnvVar: 'ANTHROPIC_API_KEY',
  required: true,
  description: 'Claude for marketing insights'
}
```

---

## Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. LOCAL DEVELOPMENT                                        │
├─────────────────────────────────────────────────────────────┤
│  .env.local                                                  │
│  ├── ANTHROPIC_API_KEY_CONTENT                              │
│  ├── ANTHROPIC_API_KEY_CHAT                                 │
│  └── ANTHROPIC_API_KEY (fallback)                           │
│                                                              │
│  Test: npm run dev                                           │
│  Logs: ✓ ATHENA_CHAT: Using ANTHROPIC_API_KEY_CHAT         │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ git push origin main
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  2. VERCEL PRODUCTION                                        │
├─────────────────────────────────────────────────────────────┤
│  Environment Variables (Vercel Dashboard)                    │
│  ├── ANTHROPIC_API_KEY_CONTENT = sk-ant-xxxxx               │
│  ├── ANTHROPIC_API_KEY_CHAT = sk-ant-xxxxx                  │
│  └── ANTHROPIC_API_KEY = sk-ant-xxxxx (fallback)            │
│                                                              │
│  Build + Deploy                                              │
│  Logs: ✓ CONTENT_GENERATION: Using ANTHROPIC_API_KEY_CONTENT│
└─────────────────────────────────────────────────────────────┘
                         │
                         │ Scheduled: 0 */6 * * *
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  3. GITHUB ACTIONS                                           │
├─────────────────────────────────────────────────────────────┤
│  Secrets (GitHub Settings)                                   │
│  ├── ANTHROPIC_API_KEY_CONTENT                              │
│  ├── BLOB_READ_WRITE_TOKEN                                  │
│  └── ANTHROPIC_API_KEY (fallback)                           │
│                                                              │
│  Workflow: generate-content.yml                              │
│  Runs: scripts/generate-dynamic-content.js                   │
│  Logs: ✓ CONTENT_GENERATION: Using ANTHROPIC_API_KEY_CONTENT│
└─────────────────────────────────────────────────────────────┘
```

---

## Cost Tracking Visibility

### Before (Single Key)

```
┌────────────────────────────────────────┐
│  Anthropic Console - Usage Dashboard   │
├────────────────────────────────────────┤
│  ANTHROPIC_API_KEY                     │
│  ├── Requests: 10,000                  │
│  ├── Tokens: 5M                        │
│  └── Cost: $500                        │
│                                        │
│  ❌ Can't tell chat vs content costs   │
└────────────────────────────────────────┘
```

### After (Separate Keys)

```
┌────────────────────────────────────────┐
│  Anthropic Console - Usage Dashboard   │
├────────────────────────────────────────┤
│  ANTHROPIC_API_KEY_CONTENT             │
│  ├── Requests: 720 (6hrs × 30 days)   │
│  ├── Model: claude-opus-4-20250514    │
│  ├── Tokens: 1.5M                      │
│  └── Cost: $300 💰                     │
├────────────────────────────────────────┤
│  ANTHROPIC_API_KEY_CHAT                │
│  ├── Requests: 8,500                   │
│  ├── Model: claude-sonnet-4-5-20250929│
│  ├── Tokens: 2.5M                      │
│  └── Cost: $150 💰                     │
├────────────────────────────────────────┤
│  ANTHROPIC_API_KEY_ANALYSIS            │
│  ├── Requests: 500                     │
│  ├── Model: claude-sonnet-4-5-20250929│
│  ├── Tokens: 800K                      │
│  └── Cost: $40 💰                      │
├────────────────────────────────────────┤
│  Total: $490                           │
│  ✅ Clear cost breakdown per service   │
└────────────────────────────────────────┘
```

---

## Error Handling Flow

```
┌──────────────────────────────────────┐
│  Request arrives at API route         │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│  try {                                │
│    const apiKey = getApiKey(          │
│      ServiceType.ATHENA_CHAT          │
│    );                                 │
│  }                                    │
└────────────┬─────────────────────────┘
             │
     ┌───────┴───────┐
     │               │
  Success          Failure
     │               │
     ↓               ↓
┌─────────┐   ┌──────────────────────┐
│ Get key │   │ catch (error) {      │
│ Use key │   │   if (error          │
│ Call    │   │     instanceof       │
│ Claude  │   │     ApiKeyError) {   │
│ API     │   │     return 500 with  │
└─────────┘   │     clear message    │
              │   }                  │
              │ }                    │
              └──────────────────────┘
                        │
                        ↓
              ┌──────────────────────┐
              │ Response to client:  │
              │                      │
              │ {                    │
              │   "error": "Missing  │
              │   API key for        │
              │   ATHENA_CHAT. Set   │
              │   either ANTHROPIC_  │
              │   API_KEY_CHAT or    │
              │   ANTHROPIC_API_KEY" │
              │ }                    │
              └──────────────────────┘
```

---

## File Structure

```
prismatica-app/
├── lib/
│   ├── apiKeyManager.ts          ← NEW: TypeScript version
│   ├── apiKeyManager.js          ← NEW: JavaScript version
│   └── __tests__/
│       └── apiKeyManager.test.ts ← NEW: Tests (optional)
│
├── scripts/
│   └── generate-dynamic-content.js  ← UPDATED: Use getApiKey()
│
├── app/api/
│   ├── chat/
│   │   ├── route.ts              ← UPDATED: Use getApiKey()
│   │   └── end/route.ts          ← UPDATED: Use getApiKey()
│   └── generate-content/
│       └── route.ts              ← UPDATED: Use getApiKey()
│
├── .github/workflows/
│   └── generate-content.yml      ← UPDATED: Add CONTENT key
│
├── .env.local                    ← UPDATED: Add separate keys
├── .env.example                  ← NEW: Template for devs
├── CLAUDE.md                     ← UPDATED: Document new system
├── README.md                     ← UPDATED: Quick start guide
│
└── API_KEY_ARCHITECTURE_ROADMAP.md  ← NEW: This document
```

---

## Comparison: Adding New Service

### OLD WAY (Manual, Error-Prone)

```typescript
// 1. Add to EVERY file that needs it:
const marketingKey = process.env.ANTHROPIC_API_KEY_MARKETING ||
                     process.env.ANTHROPIC_API_KEY;

if (!marketingKey) {
  throw new Error('Missing marketing API key');
}

// 2. Add validation everywhere
// 3. Add logging everywhere
// 4. Hope you didn't miss anything
// 5. 🤞 Cross your fingers
```

### NEW WAY (Centralized, Type-Safe)

```typescript
// 1. Add to key manager (one place):
enum ServiceType {
  MARKETING_ADVISOR = 'MARKETING_ADVISOR'  // ← Add here
}

KEY_CONFIG[ServiceType.MARKETING_ADVISOR] = {
  primaryEnvVar: 'ANTHROPIC_API_KEY_MARKETING',
  fallbackEnvVar: 'ANTHROPIC_API_KEY',
  required: true,
  description: 'Marketing insights'
};

// 2. Use everywhere:
const apiKey = getApiKey(ServiceType.MARKETING_ADVISOR);

// 3. ✅ Done! Validation, logging, fallback all automatic
```

---

## Fallback Behavior Examples

### Example 1: All Keys Set

```bash
# .env.local
ANTHROPIC_API_KEY_CONTENT=sk-ant-content-xxx
ANTHROPIC_API_KEY_CHAT=sk-ant-chat-xxx
ANTHROPIC_API_KEY=sk-ant-fallback-xxx
```

**Result:**
```
✓ CONTENT_GENERATION: Using ANTHROPIC_API_KEY_CONTENT
✓ ATHENA_CHAT: Using ANTHROPIC_API_KEY_CHAT
```

### Example 2: Only Fallback Set

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-fallback-xxx
```

**Result:**
```
⚠️  CONTENT_GENERATION: Using fallback key ANTHROPIC_API_KEY
    (ANTHROPIC_API_KEY_CONTENT not set)
⚠️  ATHENA_CHAT: Using fallback key ANTHROPIC_API_KEY
    (ANTHROPIC_API_KEY_CHAT not set)
```

### Example 3: Partial Setup

```bash
# .env.local
ANTHROPIC_API_KEY_CHAT=sk-ant-chat-xxx
ANTHROPIC_API_KEY=sk-ant-fallback-xxx
```

**Result:**
```
⚠️  CONTENT_GENERATION: Using fallback key ANTHROPIC_API_KEY
    (ANTHROPIC_API_KEY_CONTENT not set)
✓ ATHENA_CHAT: Using ANTHROPIC_API_KEY_CHAT
```

### Example 4: Missing Required Key

```bash
# .env.local
# (empty)
```

**Result:**
```
❌ ApiKeyError: Missing API key for CONTENT_GENERATION.
   Set either ANTHROPIC_API_KEY_CONTENT or ANTHROPIC_API_KEY.
```

---

## Migration Timeline

```
┌─────────────────────────────────────────────────────────────┐
│  Week 1: Preparation                                         │
├─────────────────────────────────────────────────────────────┤
│  Day 1-2: Create API key manager                            │
│  Day 3-4: Update files locally, test thoroughly             │
│  Day 5:   Create documentation                              │
└─────────────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  Week 2: Deployment                                          │
├─────────────────────────────────────────────────────────────┤
│  Day 1:   Set up Vercel environment variables               │
│  Day 2:   Deploy to staging (if available)                  │
│  Day 3:   Deploy to production                              │
│  Day 4-5: Monitor, verify cost tracking                     │
└─────────────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  Week 3: Validation                                          │
├─────────────────────────────────────────────────────────────┤
│  Day 1-7: Monitor Anthropic Console for separate usage      │
│           Verify GitHub Actions working                     │
│           Check for any fallback warnings                   │
└─────────────────────────────────────────────────────────────┘
```

---

**END OF DIAGRAM**

For implementation details, see:
- `API_KEY_ARCHITECTURE_ROADMAP.md` (full guide)
- `API_KEY_MIGRATION_SUMMARY.md` (quick reference)
