import { NextRequest, NextResponse } from 'next/server';
import { chatRateLimiter, getClientIdentifier } from '@/lib/rateLimiter';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

// In production, load and cache the core prompt once
const corePromptPath = path.join(process.cwd(), 'athena', 'prompts', 'core.md');
let CACHED_CORE_PROMPT: string | null = null;

// Only cache in production
if (process.env.NODE_ENV === 'production') {
  CACHED_CORE_PROMPT = fs.readFileSync(corePromptPath, 'utf8');
}

// Function to get the core prompt - uses cache in production, reloads in development
function getCorePrompt(): string {
  if (process.env.NODE_ENV === 'production' && CACHED_CORE_PROMPT) {
    return CACHED_CORE_PROMPT;
  }
  // In development, always read fresh from file
  return fs.readFileSync(corePromptPath, 'utf8');
}

// Function to get page-specific content
function getPageContent(pathname: string): string {
  try {
    // Handle root path
    const pagePath = pathname === '/' ? '/index' : pathname;
    const pageFilePath = path.join(process.cwd(), 'athena', 'knowledge', 'pages', `${pagePath}.md`);

    if (fs.existsSync(pageFilePath)) {
      return fs.readFileSync(pageFilePath, 'utf8');
    }

    // Fallback if page file doesn't exist
    return `# ${pathname}\n\nNo specific content available for this page yet.`;
  } catch (error) {
    console.error(`Error loading page content for ${pathname}:`, error);
    return `# ${pathname}\n\nContent temporarily unavailable.`;
  }
}

// Build the complete system prompt with page context
function buildSystemPrompt(pathname: string): string {
  const corePrompt = getCorePrompt();
  const pageContent = getPageContent(pathname);

  return `${corePrompt}

---

## CURRENT PAGE CONTEXT

The user is currently viewing: ${pathname}

### Page Content:

${pageContent}

---

Use the page content above to provide contextual, relevant responses. The user can see this page, so reference specific sections, prices, or details from it naturally.`;
}

// Simple web page fetcher
async function fetchWebPage(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AthenaBot/1.0; +https://prismatica-labs.com)',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      return `Failed to fetch page: ${response.status} ${response.statusText}`;
    }

    const html = await response.text();

    // Dynamic import of jsdom (ES Module)
    const { JSDOM } = await import('jsdom');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Remove script and style elements
    document.querySelectorAll('script, style, nav, footer, aside').forEach(el => el.remove());

    // Get text content
    const bodyText = document.body.textContent || '';

    // Clean up whitespace and limit length
    const cleanText = bodyText
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 5000); // Limit to 5000 chars

    return cleanText || 'No readable content found on this page.';
  } catch (error: any) {
    return `Error fetching page: ${error.message}`;
  }
}

// Save conversation transcript for post-chat analysis
function saveConversationTranscript(messages: any[], pathname: string, existingConversationId?: string | null): string {
  try {
    const timestamp = new Date().toISOString();
    const date = timestamp.split('T')[0]; // YYYY-MM-DD

    // Create directory structure
    const conversationsDir = path.join(process.cwd(), 'athena', 'intel', 'layer1', 'raw-conversations', date);
    if (!fs.existsSync(conversationsDir)) {
      fs.mkdirSync(conversationsDir, { recursive: true });
    }

    // Try to find existing conversation file if we don't have an ID
    let conversationId: string = '';
    if (existingConversationId) {
      conversationId = existingConversationId;
    } else {
      // Check if there's already a file with fewer messages (same conversation)
      const existingFiles = fs.readdirSync(conversationsDir).filter(f => f.endsWith('.json'));
      let foundExisting = false;

      for (const file of existingFiles) {
        const filePath = path.join(conversationsDir, file);
        try {
          const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          // Check if this is the same conversation (first messages match and this has more messages)
          if (existingData.messages.length < messages.length &&
              existingData.messages.length > 0 &&
              messages.length > 0 &&
              existingData.messages[0].content === messages[0].content &&
              existingData.pathname === pathname) {
            // Check if all existing messages match
            let allMatch = true;
            for (let i = 0; i < existingData.messages.length; i++) {
              if (existingData.messages[i].content !== messages[i].content ||
                  existingData.messages[i].role !== messages[i].role) {
                allMatch = false;
                break;
              }
            }
            if (allMatch) {
              conversationId = existingData.id;
              foundExisting = true;
              console.log(`📁 Found existing conversation: ${conversationId}`);
              break;
            }
          }
        } catch (e) {
          // Skip invalid files
          continue;
        }
      }

      if (!foundExisting) {
        const timeSlug = timestamp.split('T')[1].replace(/:/g, '-').split('.')[0]; // HH-MM-SS
        conversationId = `conversation-${timeSlug}`;
        console.log(`🆕 New conversation: ${conversationId}`);
      }
    }

    const transcriptFile = path.join(conversationsDir, `${conversationId}.json`);

    // Save conversation data
    const conversationData = {
      id: conversationId,
      timestamp,
      pathname,
      messages,
      message_count: messages.length
    };

    fs.writeFileSync(transcriptFile, JSON.stringify(conversationData, null, 2));
    console.log(`💾 Conversation saved: ${conversationId}`);

    return conversationId;
  } catch (error: any) {
    console.error('Error saving conversation:', error.message);
    return '';
  }
}

// Web search function - tries Google first, falls back to DuckDuckGo
async function searchWeb(query: string): Promise<string> {
  try {
    // Try Google search first (simpler HTML structure)
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error(`Search returned status ${response.status}`);
      return `I tried to search for "${query}" but the search service returned an error. Could you share more details directly or provide a URL I can browse?`;
    }

    const html = await response.text();

    // Dynamic import of jsdom (ES Module)
    const { JSDOM } = await import('jsdom');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract search results from Google
    const results: { title: string; snippet: string; url: string }[] = [];

    // Google search results are in divs with specific data attributes or classes
    const searchDivs = document.querySelectorAll('div.g, div[data-sokoban-container]');

    for (let i = 0; i < Math.min(5, searchDivs.length); i++) {
      const div = searchDivs[i];

      // Try to find title (h3 inside an anchor)
      const titleEl = div.querySelector('h3');
      const linkEl = div.querySelector('a[href]');

      // Try to find snippet (various possible selectors)
      const snippetEl = div.querySelector('div[data-sncf], div.VwiC3b, span.aCOpRe, div.s');

      if (titleEl && linkEl) {
        const url = linkEl.getAttribute('href') || '';
        // Only include real URLs (not Google internal links)
        if (url.startsWith('http') && !url.includes('google.com')) {
          results.push({
            title: titleEl.textContent?.trim() || '',
            snippet: snippetEl?.textContent?.trim() || '',
            url: url
          });
        }
      }
    }

    if (results.length === 0) {
      console.log('No results found in Google search');
      return `I searched for "${query}" but couldn't find clear results. If you can share a direct link (like your LinkedIn or company website), I can read that directly. Or tell me more about what I should know.`;
    }

    // Format results for Athena
    let formatted = `Search results for "${query}":\n\n`;
    results.forEach((r, i) => {
      formatted += `${i + 1}. ${r.title}\n`;
      if (r.snippet) {
        formatted += `${r.snippet}\n`;
      }
      formatted += `URL: ${r.url}\n\n`;
    });

    console.log(`Found ${results.length} search results`);
    return formatted.trim();
  } catch (error: any) {
    console.error('Search error:', error.message);
    return `I had trouble searching for "${query}". If you can share a direct URL (LinkedIn, company site, etc.), I can browse that instead. Or just tell me what I should know.`;
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting check
  const clientId = getClientIdentifier(request);
  const rateLimitResult = chatRateLimiter.check(clientId);

  if (!rateLimitResult.allowed) {
    const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
    return NextResponse.json(
      {
        error: 'Too many requests. Please slow down.',
        retryAfter
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
        }
      }
    );
  }

  try {
    const { messages, pathname, conversationId: existingConversationId } = await request.json();

    // Use separate API key for chat (fallback to main key for backward compatibility)
    const apiKey = process.env.ANTHROPIC_API_KEY_CHAT || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY_CHAT or ANTHROPIC_API_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    // Define tools for Athena
    const tools: Anthropic.Tool[] = [
      {
        name: 'search_web',
        description: 'Search the web for information about companies, people, topics, or current events. Use this when you need to find information that isn\'t provided directly by the user.',
        input_schema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query (e.g., "Acme Corp London", "John Smith CEO", "latest AI trends")'
            }
          },
          required: ['query']
        }
      },
      {
        name: 'fetch_webpage',
        description: 'Fetch and read content from a specific web page. Use this when you have a URL and want to read its contents.',
        input_schema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'The complete URL to fetch (must start with http:// or https://)'
            },
            purpose: {
              type: 'string',
              description: 'Why you\'re fetching this page (e.g., "to understand the user\'s company" or "to read about their background")'
            }
          },
          required: ['url', 'purpose']
        }
      }
    ];

    // Make initial API call
    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: buildSystemPrompt(pathname || '/'),
      messages: messages,
      tools: tools
    });

    // Handle tool use (web search & browsing)
    while (response.stop_reason === 'tool_use') {
      const toolUse = response.content.find((block): block is Anthropic.ToolUseBlock =>
        block.type === 'tool_use'
      );

      if (!toolUse) break;

      let toolResult = '';

      if (toolUse.name === 'search_web') {
        const { query } = toolUse.input as { query: string };
        console.log(`🔍 Athena is searching: ${query}`);
        toolResult = await searchWeb(query);
      } else if (toolUse.name === 'fetch_webpage') {
        const { url } = toolUse.input as { url: string; purpose: string };
        console.log(`🌐 Athena is browsing: ${url}`);
        toolResult = await fetchWebPage(url);
      }

      // Continue conversation with tool result
      messages.push({
        role: 'assistant',
        content: response.content
      });

      messages.push({
        role: 'user',
        content: [
          {
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: toolResult
          }
        ]
      });

      // Get next response
      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        system: buildSystemPrompt(pathname || '/'),
        messages: messages,
        tools: tools
      });
    }

    // Extract final text response
    const textBlock = response.content.find((block): block is Anthropic.TextBlock =>
      block.type === 'text'
    );

    // Save conversation transcript for post-chat analysis (Layer 1 Intelligence)
    const conversationId = saveConversationTranscript(messages, pathname || '/', existingConversationId);

    return NextResponse.json(
      {
        message: textBlock?.text || 'Sorry, I encountered an issue processing your request.',
        conversationId // Return ID for potential post-chat analysis trigger
      },
      {
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
        }
      }
    );
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
