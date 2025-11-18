# 404 Compliance Monitor MCP Server

**Purpose:** Automatically monitor the Prismatica website architecture and notify when the 404 error page falls out of sync.

## What It Does

This MCP server provides real-time monitoring and compliance auditing for the 404 error page (`app/not-found.tsx`). It watches critical files and notifies you when changes require 404 page updates.

### Key Features

1. **File Monitoring** - Watches routes, modals, and bento boxes for changes
2. **Automatic Audits** - Scans architecture and compares against 404 navigation tree
3. **Smart Notifications** - Alerts when files are added/removed/changed
4. **Compliance Scoring** - Generates 0-100 compliance score with prioritized issues
5. **Fix Suggestions** - Provides actionable recommendations

## Installation

### 1. Install Dependencies

```bash
cd mcp-servers/404-compliance-monitor
npm install
```

### 2. Configure Claude Desktop

Add to your `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "404-compliance-monitor": {
      "command": "node",
      "args": [
        "/Users/raytarantino/A Code Space/Prism/prismatica-app/mcp-servers/404-compliance-monitor/index.js"
      ],
      "env": {
        "PROJECT_ROOT": "/Users/raytarantino/A Code Space/Prism/prismatica-app"
      }
    }
  }
}
```

**Important:** Update the paths to match your actual project location.

### 3. Restart Claude Desktop

Quit and relaunch Claude Desktop to load the MCP server.

## Available Tools

### 1. `start_monitoring`

Start watching files for changes.

**Parameters:**
- `notify_on_change` (boolean, default: true) - Send notifications when changes detected

**Example:**
```
Use the start_monitoring tool to begin watching for 404 compliance changes
```

**What it watches:**
- `app/**/page.tsx` - All route pages
- `app/about/page.tsx` - Modal definitions
- `components/BentoBox/content/*.json` - Bento box services/products
- `app/not-found.tsx` - The 404 page itself

### 2. `stop_monitoring`

Stop all file monitoring.

**Example:**
```
Use the stop_monitoring tool
```

### 3. `run_audit`

Run a full compliance audit.

**Parameters:**
- `include_suggestions` (boolean, default: true) - Include fix suggestions

**Returns:**
```json
{
  "timestamp": "2025-01-18T...",
  "compliance_score": 95,
  "issues": {
    "critical": [],
    "high": [
      {
        "type": "missing_route",
        "route": "/products",
        "message": "Route /products not found in 404 navigation tree"
      }
    ],
    "medium": [],
    "low": []
  },
  "architecture": {
    "pages": [...],
    "modals": [...],
    "bentoBoxes": [...]
  },
  "suggestions": [
    {
      "priority": "high",
      "action": "Add missing routes to 404 navigation tree",
      "routes": ["/products"]
    }
  ]
}
```

**Example:**
```
Use the run_audit tool to check 404 compliance
```

### 4. `get_notifications`

Retrieve all pending notifications.

**Parameters:**
- `clear_after_read` (boolean, default: true) - Clear notifications after reading

**Returns:**
```json
{
  "count": 2,
  "notifications": [
    {
      "timestamp": "2025-01-18T...",
      "type": "file_added",
      "file": "app/new-page/page.tsx",
      "message": "New file added: app/new-page/page.tsx. Update 404 navigation tree."
    },
    {
      "timestamp": "2025-01-18T...",
      "type": "file_changed",
      "file": "components/BentoBox/content/new-service.json",
      "message": "File changed: components/BentoBox/content/new-service.json. Consider running compliance audit."
    }
  ]
}
```

**Example:**
```
Use the get_notifications tool to see what changed
```

### 5. `check_404_sync`

Quick sync check (lightweight, fast).

**Returns:**
```json
{
  "timestamp": "2025-01-18T...",
  "in_sync": false,
  "warnings": [
    "Missing route: /products"
  ]
}
```

**Example:**
```
Use the check_404_sync tool for a quick status check
```

## Available Resources

### 1. `compliance://audit/latest`

Access the most recent audit results.

**Example:**
```
Read the compliance://audit/latest resource
```

### 2. `compliance://notifications/pending`

Access pending notifications.

**Example:**
```
Read the compliance://notifications/pending resource
```

## Typical Workflows

### Workflow 1: Daily Monitoring

**Setup:**
1. Start monitoring when you begin work
2. Get notifications throughout the day
3. Run audit when notifications accumulate

**Commands:**
```
1. Use start_monitoring tool
2. (Work on the site normally)
3. Use get_notifications tool
4. Use run_audit tool if needed
5. Use stop_monitoring tool when done
```

### Workflow 2: Pre-Deployment Check

**Before deploying:**
1. Run full audit
2. Fix any critical/high priority issues
3. Verify sync status

**Commands:**
```
1. Use run_audit tool with include_suggestions=true
2. (Fix reported issues)
3. Use check_404_sync tool to verify
```

### Workflow 3: Automated Agent Monitoring

**Setup an agent to monitor continuously:**

Create a scheduled task or agent that:
1. Starts monitoring on system startup
2. Checks notifications every hour
3. Runs full audit weekly
4. Sends you a summary report

**Example agent prompt:**
```
You are the 404 Compliance Guardian. Your job:

1. Use start_monitoring tool at the beginning of each day
2. Every hour, use get_notifications tool (don't clear after reading)
3. If 5+ notifications accumulated, run full audit
4. Every Monday at 9am, run full audit regardless
5. If compliance score drops below 90, alert me with specific fixes needed
6. Use stop_monitoring tool at end of day

Always include the compliance score and top 3 priority issues in your reports.
```

## Issue Priority Levels

### Critical (25 points each)
- 404 page syntax errors
- Broken navigation structure
- Security vulnerabilities

### High (15 points each)
- Missing primary routes (/about, /solutions, /contact, etc.)
- Broken hash links to modals
- Missing /products route

### Medium (10 points each)
- Missing modal links
- Missing bento box links
- Outdated descriptions

### Low (5 points each)
- Minor tone inconsistencies
- Non-critical ordering issues
- Missing count annotations

**Compliance Score Formula:**
```
Score = 100 - (critical × 25 + high × 15 + medium × 10 + low × 5)
```

**Grading Scale:**
- 95-100: A+ (Excellent)
- 90-94: A (Very Good)
- 80-89: B (Good)
- 70-79: C (Needs Attention)
- 60-69: D (Poor)
- 0-59: F (Critical Issues)

## File Watch Patterns

The server monitors these file patterns:

| Pattern | What It Catches | Why It Matters |
|---------|----------------|----------------|
| `app/**/page.tsx` | All route pages | New routes need 404 navigation entries |
| `app/about/page.tsx` | Modal definitions in `briefs` object | Modal additions/removals need 404 updates |
| `components/BentoBox/content/*.json` | Service/product bento boxes | New offerings need 404 navigation links |
| `app/not-found.tsx` | The 404 page itself | Track when compliance fixes are made |

## Architecture Detection

The audit scans and categorizes:

### 1. Pages
- Scans `app/` directory recursively
- Identifies all `page.tsx` files
- Builds route map (e.g., `app/about/page.tsx` → `/about`)
- Ignores: `_` directories, `/api` routes, test pages

### 2. Modals
- Parses `app/about/page.tsx`
- Extracts modal IDs from `briefs` object
- Categorizes: case studies, particles, molecules, patterns, mental models
- Expected count: 25 modals (8+7+5+5)

### 3. Bento Boxes
- Scans `components/BentoBox/content/*.json`
- Reads `id`, `title`, and `prompt.text` fields
- Filters out disabled items (`enabled: false`)
- Expected count: 15 active bento boxes

## Troubleshooting

### "Cannot find module '@modelcontextprotocol/sdk'"

Run `npm install` in the `mcp-servers/404-compliance-monitor` directory.

### "Project root not found"

Check the `PROJECT_ROOT` environment variable in your Claude config matches your actual project path.

### "No audit run yet"

Run `run_audit` tool at least once to populate the audit resource.

### Tools not appearing in Claude

1. Verify config file path is correct for your OS
2. Check JSON syntax is valid
3. Restart Claude Desktop completely (quit, not just close window)
4. Check Claude Desktop logs: `~/Library/Logs/Claude/` (macOS)

## Development

**Run in development mode with auto-reload:**

```bash
npm run dev
```

**Test the server manually:**

```bash
node index.js
```

The server uses stdio transport, so you'll need to interact via JSON-RPC messages or through Claude Desktop.

## Integration with 404-compliance-auditor Skill

This MCP server complements the Claude Code skill:

**Skill** (`.claude/skills/404-compliance-auditor/`) - Manual audit invocation with detailed Rory Sutherland tone analysis
**MCP Server** - Automated monitoring and real-time notifications

**Recommended workflow:**
1. MCP server runs continuously, monitoring changes
2. When notifications accumulate, agent uses MCP `run_audit` tool
3. If issues found, agent invokes the skill for detailed tone analysis and fix generation
4. Agent applies fixes, commits changes
5. MCP server detects 404 page update, clears notifications

## Future Enhancements

Potential additions:

- [ ] Slack/Discord webhook notifications
- [ ] GitHub Actions integration (PR comments with audit results)
- [ ] Automated fix suggestions with code diffs
- [ ] Tone analysis using Claude API (Rory Sutherland compliance)
- [ ] Historical compliance tracking (trend charts)
- [ ] Custom rule definitions via config file
- [ ] Auto-fix mode (automatically update 404 page)

## License

MIT - Prismatica Labs

## Maintainer

Ray Tarantino / Prismatica Labs
