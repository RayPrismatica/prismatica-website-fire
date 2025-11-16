# Limbo - Athena Backup Files

**Date:** November 16, 2025
**Reason:** Athena system restructured into dedicated `athena/` folder

## What's Here

This folder contains backup copies of all old Athena files before the restructure:

### Prompts
- `athena-core.md` - Original core system prompt (now at `athena/prompts/core.md`)
- `athena-chat.md` - Old/deprecated chat prompt

### Knowledge
- `knowledge/pages/*.md` - Original knowledge files (now at `athena/knowledge/pages/`)

## Why Keep These?

Safety. These are working backups in case anything breaks during the transition. Once you're confident the new `athena/` structure is working perfectly in production, you can safely delete this entire `limbo_athena_backup/` folder.

## Active Files (Now in Use)

All Athena functionality now lives in:
```
athena/
├── README.md
├── config/settings.json
├── prompts/core.md
└── knowledge/pages/*.md
```

## Safe to Delete?

✅ **YES** - Once you've verified everything works in production
❌ **NOT YET** - Keep as insurance during the transition period

---

**Note:** The name starts with "limbo_" so it's clearly marked as temporary backup files.
