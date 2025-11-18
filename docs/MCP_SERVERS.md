# MCP Servers Documentation

This document describes the Model Context Protocol (MCP) servers available for the Prismatica Labs application.

## What are MCP Servers?

MCP servers are standalone tools that extend Claude's capabilities with custom functionality. They run as separate processes and communicate with Claude via the Model Context Protocol, providing:

- **Custom Tools** - Specialized functions Claude can invoke
- **Resources** - Data sources Claude can access
- **Real-time Monitoring** - Background processes that watch for changes

## Available MCP Servers

### 1. 404 Compliance Monitor

**Location:** `mcp-servers/404-compliance-monitor/`

**Purpose:** Automatically monitor website architecture and maintain 404 error page accuracy.

#### Key Features

- **Real-time File Watching** - Monitors routes, modals, and bento boxes
- **Automated Audits** - Scans architecture and compares against 404 navigation tree
- **Smart Notifications** - Alerts when files are added/removed/changed
- **Compliance Scoring** - Generates 0-100 score with prioritized issues
- **Fix Suggestions** - Provides actionable recommendations

#### Quick Start

1. Install dependencies:
   ```bash
   cd mcp-servers/404-compliance-monitor
   npm install
   ```

2. Add to Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):
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

3. Restart Claude Desktop

#### Available Tools

| Tool | Purpose | Example Use |
|------|---------|-------------|
| `start_monitoring` | Watch files for changes | "Start monitoring for 404 changes" |
| `stop_monitoring` | Stop file watching | "Stop monitoring" |
| `run_audit` | Full compliance audit | "Run a 404 compliance audit" |
| `get_notifications` | Retrieve pending alerts | "Show me what changed" |
| `check_404_sync` | Quick sync status | "Is the 404 page in sync?" |

#### Available Resources

| Resource | Content | Access |
|----------|---------|--------|
| `compliance://audit/latest` | Most recent audit results | "Read latest audit" |
| `compliance://notifications/pending` | Unread notifications | "Read pending notifications" |

#### Common Workflows

**Daily Development:**
```
1. "Start monitoring for 404 compliance changes"
2. (Work on the site)
3. "Show me compliance notifications"
4. "Run a full 404 audit"
```

**Pre-Deployment Check:**
```
1. "Run a 404 compliance audit with suggestions"
2. (Review and fix issues)
3. "Quick check: is 404 page in sync?"
```

**Automated Agent:**
```
Set up an agent to:
- Start monitoring each morning
- Check notifications hourly
- Run full audit weekly
- Alert if compliance score < 90
```

#### Integration with 404-compliance-auditor Skill

The MCP server complements the Claude Code skill:

- **MCP Server** → Continuous monitoring, real-time notifications
- **Skill** → Manual invocation, detailed Rory Sutherland tone analysis

**Recommended workflow:**
1. MCP server monitors continuously
2. Notifications accumulate → agent runs MCP `run_audit`
3. Issues found → agent invokes skill for tone analysis
4. Agent applies fixes and commits
5. MCP server detects update, clears notifications

#### What It Monitors

| File Pattern | Triggers | Impact |
|--------------|----------|--------|
| `app/**/page.tsx` | New/removed routes | 404 navigation needs update |
| `app/about/page.tsx` | Modal changes in `briefs` object | Modal links need update |
| `components/BentoBox/content/*.json` | Bento box changes | Service/product links need update |
| `app/not-found.tsx` | 404 page edits | Tracks compliance fixes |

#### Issue Priority Levels

**Scoring Impact:**
- Critical: -25 points each
- High: -15 points each
- Medium: -10 points each
- Low: -5 points each

**Grading Scale:**
- 95-100: A+ (Excellent)
- 90-94: A (Very Good)
- 80-89: B (Good)
- 70-79: C (Needs Attention)
- 60-69: D (Poor)
- 0-59: F (Critical Issues)

#### Full Documentation

See [`mcp-servers/404-compliance-monitor/README.md`](../mcp-servers/404-compliance-monitor/README.md) for complete documentation including:
- Detailed tool parameters
- Audit output formats
- Architecture detection logic
- Troubleshooting guide
- Development instructions

---

## Adding New MCP Servers

To add a new MCP server to this project:

### 1. Create Server Directory

```bash
mkdir -p mcp-servers/your-server-name
cd mcp-servers/your-server-name
npm init -y
```

### 2. Install MCP SDK

```bash
npm install @modelcontextprotocol/sdk
```

### 3. Create Server Implementation

**Minimal example (`index.js`):**

```javascript
#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  {
    name: 'your-server-name',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'example_tool',
      description: 'Does something useful',
      inputSchema: {
        type: 'object',
        properties: {
          input: {
            type: 'string',
            description: 'Example input',
          },
        },
        required: ['input'],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'example_tool') {
    return {
      content: [
        {
          type: 'text',
          text: `Processed: ${args.input}`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('MCP server running on stdio');
```

### 4. Add to Claude Config

Update `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "your-server-name": {
      "command": "node",
      "args": ["/full/path/to/mcp-servers/your-server-name/index.js"],
      "env": {
        "PROJECT_ROOT": "/full/path/to/project"
      }
    }
  }
}
```

### 5. Document It

Create `mcp-servers/your-server-name/README.md` with:
- Purpose and features
- Installation instructions
- Available tools and resources
- Usage examples
- Troubleshooting

Then add a section to this file.

### 6. Test It

```bash
# Start Claude Desktop
# Verify tools appear in Claude interface
# Test each tool with example inputs
```

---

## MCP Best Practices

### Security

- **Never expose sensitive data** through resources or tool outputs
- **Validate all inputs** before processing
- **Use environment variables** for sensitive configuration
- **Sanitize file paths** to prevent directory traversal

### Performance

- **Use stdio transport** for local servers (fastest)
- **Cache expensive operations** when possible
- **Implement timeouts** for long-running operations
- **Close file watchers** on shutdown

### Error Handling

- **Return structured errors** with helpful messages
- **Log errors to stderr** (stdout is for MCP protocol)
- **Handle cleanup** on SIGINT/SIGTERM
- **Validate tool arguments** before processing

### Documentation

- **Document all tools** with clear descriptions
- **Provide examples** for common use cases
- **Explain resource URIs** and their data formats
- **Include troubleshooting** for common issues

---

## Troubleshooting MCP Servers

### Tools Not Appearing in Claude

1. **Check config file location** (varies by OS)
2. **Validate JSON syntax** (no trailing commas!)
3. **Use absolute paths** for command and args
4. **Restart Claude Desktop** completely (quit, not just close)
5. **Check logs** at `~/Library/Logs/Claude/` (macOS)

### Server Crashes on Startup

1. **Check Node.js version** (requires 18+)
2. **Install dependencies** with `npm install`
3. **Verify file permissions** (should be executable)
4. **Check environment variables** in config
5. **Run manually** to see error output: `node index.js`

### Tools Work But Return Errors

1. **Check PROJECT_ROOT** environment variable
2. **Verify file paths** exist and are readable
3. **Check tool input** matches schema
4. **Review server logs** (stderr output)

### Changes Not Detected

1. **Verify watch patterns** include your files
2. **Check file system events** work (some filesystems don't support watching)
3. **Restart monitoring** if it was stopped
4. **Check ignored patterns** (dotfiles are ignored by default)

---

## Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP SDK on GitHub](https://github.com/modelcontextprotocol/sdk)
- [Claude Desktop Config Guide](https://modelcontextprotocol.io/quickstart/user)
- [Building MCP Servers](https://modelcontextprotocol.io/quickstart/server)

---

## Maintainer

Ray Tarantino / Prismatica Labs

**Questions or issues?** Open an issue or contact the team.
