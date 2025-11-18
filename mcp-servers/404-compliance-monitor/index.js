#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import chokidar from 'chokidar';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assume the server runs from the project root or provide PROJECT_ROOT env var
const PROJECT_ROOT = process.env.PROJECT_ROOT || path.resolve(__dirname, '../..');

class ComplianceMonitor {
  constructor() {
    this.server = new Server(
      {
        name: '404-compliance-monitor',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.watchers = new Map();
    this.lastAudit = null;
    this.notifications = [];

    this.setupToolHandlers();
    this.setupResourceHandlers();

    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.cleanup();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'start_monitoring',
          description: 'Start monitoring files for 404 compliance changes. Watches app routes, BentoBox content, and about page modals.',
          inputSchema: {
            type: 'object',
            properties: {
              notify_on_change: {
                type: 'boolean',
                description: 'Send notifications when changes detected (default: true)',
                default: true,
              },
            },
          },
        },
        {
          name: 'stop_monitoring',
          description: 'Stop all file monitoring',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'run_audit',
          description: 'Run a full 404 compliance audit and generate detailed report',
          inputSchema: {
            type: 'object',
            properties: {
              include_suggestions: {
                type: 'boolean',
                description: 'Include fix suggestions in the report (default: true)',
                default: true,
              },
            },
          },
        },
        {
          name: 'get_notifications',
          description: 'Get all pending compliance change notifications',
          inputSchema: {
            type: 'object',
            properties: {
              clear_after_read: {
                type: 'boolean',
                description: 'Clear notifications after retrieving (default: true)',
                default: true,
              },
            },
          },
        },
        {
          name: 'check_404_sync',
          description: 'Quick check if 404 page is in sync with current architecture',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'start_monitoring':
          return await this.startMonitoring(args?.notify_on_change ?? true);

        case 'stop_monitoring':
          return await this.stopMonitoring();

        case 'run_audit':
          return await this.runAudit(args?.include_suggestions ?? true);

        case 'get_notifications':
          return await this.getNotifications(args?.clear_after_read ?? true);

        case 'check_404_sync':
          return await this.checkSync();

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  setupResourceHandlers() {
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'compliance://audit/latest',
          name: 'Latest 404 Compliance Audit',
          description: 'Most recent compliance audit results',
          mimeType: 'application/json',
        },
        {
          uri: 'compliance://notifications/pending',
          name: 'Pending Notifications',
          description: 'Unread compliance change notifications',
          mimeType: 'application/json',
        },
      ],
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      if (uri === 'compliance://audit/latest') {
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(this.lastAudit || { message: 'No audit run yet' }, null, 2),
            },
          ],
        };
      }

      if (uri === 'compliance://notifications/pending') {
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(this.notifications, null, 2),
            },
          ],
        };
      }

      throw new Error(`Unknown resource: ${uri}`);
    });
  }

  async startMonitoring(notifyOnChange = true) {
    // Stop existing watchers
    await this.stopMonitoring();

    const watchPaths = [
      path.join(PROJECT_ROOT, 'app/**/page.tsx'),
      path.join(PROJECT_ROOT, 'app/about/page.tsx'),
      path.join(PROJECT_ROOT, 'components/BentoBox/content/*.json'),
      path.join(PROJECT_ROOT, 'app/not-found.tsx'),
      path.join(PROJECT_ROOT, 'athena/knowledge/navigation-tree.md'),
    ];

    const watcher = chokidar.watch(watchPaths, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: true,
    });

    watcher.on('change', async (filepath) => {
      const relativePath = path.relative(PROJECT_ROOT, filepath);

      if (notifyOnChange) {
        this.notifications.push({
          timestamp: new Date().toISOString(),
          type: 'file_changed',
          file: relativePath,
          message: `File changed: ${relativePath}. Consider running compliance audit.`,
        });
      }

      console.log(`[404 Monitor] Change detected: ${relativePath}`);
    });

    watcher.on('add', async (filepath) => {
      const relativePath = path.relative(PROJECT_ROOT, filepath);

      if (notifyOnChange) {
        this.notifications.push({
          timestamp: new Date().toISOString(),
          type: 'file_added',
          file: relativePath,
          message: `New file added: ${relativePath}. Update 404 navigation tree.`,
        });
      }

      console.log(`[404 Monitor] File added: ${relativePath}`);
    });

    watcher.on('unlink', async (filepath) => {
      const relativePath = path.relative(PROJECT_ROOT, filepath);

      if (notifyOnChange) {
        this.notifications.push({
          timestamp: new Date().toISOString(),
          type: 'file_removed',
          file: relativePath,
          message: `File removed: ${relativePath}. Remove from 404 navigation tree.`,
        });
      }

      console.log(`[404 Monitor] File removed: ${relativePath}`);
    });

    this.watchers.set('main', watcher);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            status: 'monitoring_started',
            watching: watchPaths,
            notify_on_change: notifyOnChange,
            message: 'File monitoring active. Changes will be tracked.',
          }, null, 2),
        },
      ],
    };
  }

  async stopMonitoring() {
    for (const [key, watcher] of this.watchers.entries()) {
      await watcher.close();
      this.watchers.delete(key);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            status: 'monitoring_stopped',
            message: 'All file watchers closed.',
          }, null, 2),
        },
      ],
    };
  }

  async runAudit(includeSuggestions = true) {
    const audit = {
      timestamp: new Date().toISOString(),
      compliance_score: 0,
      issues: {
        critical: [],
        high: [],
        medium: [],
        low: [],
      },
      architecture: {
        pages: [],
        modals: [],
        bentoBoxes: [],
      },
      suggestions: [],
    };

    try {
      // Scan app routes
      const appDir = path.join(PROJECT_ROOT, 'app');
      const pages = await this.scanPages(appDir);
      audit.architecture.pages = pages;

      // Scan about page modals
      const aboutPath = path.join(PROJECT_ROOT, 'app/about/page.tsx');
      const modals = await this.scanModals(aboutPath);
      audit.architecture.modals = modals;

      // Scan BentoBox content
      const bentoDir = path.join(PROJECT_ROOT, 'components/BentoBox/content');
      const bentos = await this.scanBentoBoxes(bentoDir);
      audit.architecture.bentoBoxes = bentos;

      // Read 404 page
      const notFoundPath = path.join(PROJECT_ROOT, 'app/not-found.tsx');
      const notFoundContent = await fs.readFile(notFoundPath, 'utf-8');

      // Read navigation tree
      const navTreePath = path.join(PROJECT_ROOT, 'athena/knowledge/navigation-tree.md');
      let navTreeContent = '';
      try {
        navTreeContent = await fs.readFile(navTreePath, 'utf-8');
      } catch (error) {
        audit.issues.critical.push({
          type: 'missing_nav_tree',
          message: 'Navigation tree file (athena/knowledge/navigation-tree.md) not found',
        });
      }

      // Check for missing routes in 404 page
      for (const page of pages) {
        if (!notFoundContent.includes(`href="${page.route}"`)) {
          audit.issues.high.push({
            type: 'missing_route',
            route: page.route,
            message: `Route ${page.route} not found in 404 navigation tree`,
          });
        }
      }

      // Check for missing routes in navigation-tree.md
      if (navTreeContent) {
        for (const page of pages) {
          // Skip test pages and special routes
          if (page.route.includes('test') || page.route.includes('api')) continue;

          if (!navTreeContent.includes(`](${page.route})`)) {
            audit.issues.high.push({
              type: 'missing_nav_tree_route',
              route: page.route,
              message: `Route ${page.route} not found in navigation-tree.md`,
            });
          }
        }
      }

      // Check for missing modals in 404 page
      for (const modal of modals) {
        if (!notFoundContent.includes(`#${modal.id}`)) {
          audit.issues.medium.push({
            type: 'missing_modal',
            modal: modal.id,
            message: `Modal #${modal.id} not linked in 404 page`,
          });
        }
      }

      // Check for missing modals in navigation-tree.md
      if (navTreeContent) {
        for (const modal of modals) {
          if (!navTreeContent.includes(`#${modal.id}`)) {
            audit.issues.medium.push({
              type: 'missing_nav_tree_modal',
              modal: modal.id,
              message: `Modal #${modal.id} not linked in navigation-tree.md`,
            });
          }
        }
      }

      // Check for missing bento boxes in 404 page
      for (const bento of bentos) {
        if (!notFoundContent.includes(`#${bento.id}`)) {
          audit.issues.medium.push({
            type: 'missing_bento',
            bento: bento.id,
            message: `Bento box #${bento.id} not linked in 404 page`,
          });
        }
      }

      // Check for missing bento boxes in navigation-tree.md
      if (navTreeContent) {
        for (const bento of bentos) {
          if (!navTreeContent.includes(`#${bento.id}`)) {
            audit.issues.medium.push({
              type: 'missing_nav_tree_bento',
              bento: bento.id,
              message: `Bento box #${bento.id} not linked in navigation-tree.md`,
            });
          }
        }
      }

      // Calculate compliance score
      const totalIssues =
        audit.issues.critical.length * 25 +
        audit.issues.high.length * 15 +
        audit.issues.medium.length * 10 +
        audit.issues.low.length * 5;

      audit.compliance_score = Math.max(0, 100 - totalIssues);

      // Generate suggestions
      if (includeSuggestions) {
        audit.suggestions = this.generateSuggestions(audit);
      }

      this.lastAudit = audit;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(audit, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: error.message,
              stack: error.stack,
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }

  async scanPages(appDir) {
    const pages = [];

    async function scan(dir, route = '') {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          // Skip certain directories
          if (entry.name.startsWith('_') || entry.name === 'api') continue;

          await scan(path.join(dir, entry.name), `${route}/${entry.name}`);
        } else if (entry.name === 'page.tsx') {
          const fullRoute = route || '/';
          pages.push({
            route: fullRoute,
            file: path.relative(PROJECT_ROOT, path.join(dir, entry.name)),
          });
        }
      }
    }

    await scan(appDir);
    return pages;
  }

  async scanModals(aboutPath) {
    const content = await fs.readFile(aboutPath, 'utf-8');
    const modals = [];

    // Extract modal IDs from briefs object
    const briefsMatch = content.match(/const briefs[^=]*=\s*{([^}]+)}/s);
    if (briefsMatch) {
      const briefsContent = briefsMatch[1];
      const idMatches = [...briefsContent.matchAll(/'([^']+)':/g)];

      for (const match of idMatches) {
        modals.push({
          id: match[1],
          category: this.categorizeModal(match[1]),
        });
      }
    }

    return modals;
  }

  async scanBentoBoxes(bentoDir) {
    const bentos = [];

    try {
      const files = await fs.readdir(bentoDir);

      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filepath = path.join(bentoDir, file);
        const content = await fs.readFile(filepath, 'utf-8');
        const data = JSON.parse(content);

        if (data.enabled !== false && data.id) {
          bentos.push({
            id: data.id,
            title: data.content?.title || 'Untitled',
            prompt: data.content?.prompt?.text || '',
            file: file,
          });
        }
      }
    } catch (error) {
      console.error('Error scanning bento boxes:', error);
    }

    return bentos;
  }

  categorizeModal(id) {
    const categories = {
      warehouse: 'case-study',
      search: 'case-study',
      'push-pull': 'case-study',
      bottleneck: 'case-study',
      canyon: 'case-study',
      platform: 'case-study',
      music: 'case-study',
      coaching: 'case-study',
      behavioral: 'particle',
      evolutionary: 'particle',
      contextual: 'particle',
      observational: 'particle',
      social: 'particle',
      cognitive: 'particle',
      temporal: 'particle',
      value: 'molecule',
      trust: 'molecule',
      perception: 'molecule',
      transaction: 'molecule',
      choice: 'molecule',
      costliness: 'pattern',
      commitment: 'pattern',
      optionality: 'pattern',
      reciprocity: 'pattern',
      scarcity: 'pattern',
    };

    return categories[id] || 'unknown';
  }

  generateSuggestions(audit) {
    const suggestions = [];

    // Critical issues
    if (audit.issues.critical.length > 0) {
      const navTreeMissing = audit.issues.critical.find(i => i.type === 'missing_nav_tree');
      if (navTreeMissing) {
        suggestions.push({
          priority: 'critical',
          action: 'Create navigation-tree.md file in athena/knowledge/',
          details: 'This file is essential for Athena to provide hyper-accurate deep links',
        });
      }
    }

    // High priority issues
    if (audit.issues.high.length > 0) {
      const missing404Routes = audit.issues.high
        .filter(i => i.type === 'missing_route')
        .map(i => i.route);

      if (missing404Routes.length > 0) {
        suggestions.push({
          priority: 'high',
          action: 'Add missing routes to 404 page navigation tree',
          routes: missing404Routes,
        });
      }

      const missingNavTreeRoutes = audit.issues.high
        .filter(i => i.type === 'missing_nav_tree_route')
        .map(i => i.route);

      if (missingNavTreeRoutes.length > 0) {
        suggestions.push({
          priority: 'high',
          action: 'Add missing routes to navigation-tree.md',
          routes: missingNavTreeRoutes,
          details: 'Update athena/knowledge/navigation-tree.md with these routes',
        });
      }
    }

    // Medium priority issues
    if (audit.issues.medium.length > 0) {
      const missing404Modals = audit.issues.medium
        .filter(i => i.type === 'missing_modal')
        .map(i => i.modal);

      if (missing404Modals.length > 0) {
        suggestions.push({
          priority: 'medium',
          action: 'Add missing modal links to 404 page',
          modals: missing404Modals,
        });
      }

      const missingNavTreeModals = audit.issues.medium
        .filter(i => i.type === 'missing_nav_tree_modal')
        .map(i => i.modal);

      if (missingNavTreeModals.length > 0) {
        suggestions.push({
          priority: 'medium',
          action: 'Add missing modal deep links to navigation-tree.md',
          modals: missingNavTreeModals,
          details: 'Format: [Modal Name](/about#modal-id)',
        });
      }

      const missing404Bentos = audit.issues.medium
        .filter(i => i.type === 'missing_bento')
        .map(i => i.bento);

      if (missing404Bentos.length > 0) {
        suggestions.push({
          priority: 'medium',
          action: 'Add missing bento box links to 404 page',
          bentos: missing404Bentos,
        });
      }

      const missingNavTreeBentos = audit.issues.medium
        .filter(i => i.type === 'missing_nav_tree_bento')
        .map(i => i.bento);

      if (missingNavTreeBentos.length > 0) {
        suggestions.push({
          priority: 'medium',
          action: 'Add missing service/product deep links to navigation-tree.md',
          bentos: missingNavTreeBentos,
          details: 'Format: [Service Name](/solutions#service-id)',
        });
      }
    }

    return suggestions;
  }

  async checkSync() {
    const quick = {
      timestamp: new Date().toISOString(),
      in_sync: true,
      warnings: [],
    };

    try {
      const notFoundPath = path.join(PROJECT_ROOT, 'app/not-found.tsx');
      const notFoundContent = await fs.readFile(notFoundPath, 'utf-8');

      // Quick checks
      const requiredRoutes = ['/about', '/solutions', '/products', '/contact', '/articles'];

      for (const route of requiredRoutes) {
        if (!notFoundContent.includes(`href="${route}"`)) {
          quick.in_sync = false;
          quick.warnings.push(`Missing route: ${route}`);
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(quick, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: error.message,
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }

  async getNotifications(clearAfterRead = true) {
    const notifications = [...this.notifications];

    if (clearAfterRead) {
      this.notifications = [];
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            count: notifications.length,
            notifications,
          }, null, 2),
        },
      ],
    };
  }

  async cleanup() {
    await this.stopMonitoring();
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('404 Compliance Monitor MCP server running on stdio');
  }
}

const monitor = new ComplianceMonitor();
monitor.run().catch(console.error);
