const Anthropic = require('@anthropic-ai/sdk');
const Parser = require('rss-parser');
const fs = require('fs');
const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '..', '.env.local') });

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; Synapsed/1.0; +https://github.com/RayPrismatica)',
  },
});

async function generateContent() {
  console.log('\n═══════════════════════════════════════');
  console.log('🧠 SYNAPSED - Content Generation');
  console.log('═══════════════════════════════════════\n');

  try {
    const startTime = Date.now();

    // Fetch RSS feeds
    console.log('📡 Fetching news feeds...\n');

    const [bbcFeed, nytFeed] = await Promise.allSettled([
      parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml'),
      parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'),
    ]);

    // Extract headlines
    const bbcHeadlines = bbcFeed.status === 'fulfilled'
      ? bbcFeed.value.items.slice(0, 8).map(item => item.title)
      : [];

    const nytHeadlines = nytFeed.status === 'fulfilled'
      ? nytFeed.value.items.slice(0, 8).map(item => item.title)
      : [];

    console.log(`✓ BBC News: ${bbcHeadlines.length} headlines`);
    console.log(`✓ New York Times: ${nytHeadlines.length} headlines\n`);

    if (bbcHeadlines.length === 0 && nytHeadlines.length === 0) {
      throw new Error('No headlines fetched from any source');
    }

    // Format headlines for Claude
    const headlinesText = `
BBC NEWS (${bbcHeadlines.length} headlines):
${bbcHeadlines.map((h, i) => `${i + 1}. ${h}`).join('\n')}

NEW YORK TIMES (${nytHeadlines.length} headlines):
${nytHeadlines.map((h, i) => `${i + 1}. ${h}`).join('\n')}
`.trim();

    // Read system prompt
    const promptPath = join(__dirname, 'content-generation-prompt.md');
    const promptTemplate = fs.readFileSync(promptPath, 'utf8');
    const systemPrompt = promptTemplate.replace('{{HEADLINES}}', headlinesText);

    // Generate content with Claude
    console.log('🤖 Generating content with Claude Opus...\n');

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 1000,
      temperature: 1,
      messages: [{
        role: 'user',
        content: systemPrompt
      }]
    });

    const response = message.content[0].text;

    // Parse response
    const newsInsightMatch = response.match(/NEWS INSIGHT:\s*\n\n([\s\S]*?)(?=\n\nINTELLIGENCE EXAMPLE:|$)/);
    const intelligenceExampleMatch = response.match(/INTELLIGENCE EXAMPLE:\s*\n\n([\s\S]*?)$/);

    const newsInsight = newsInsightMatch ? newsInsightMatch[1].trim() : '';
    const intelligenceExample = intelligenceExampleMatch ? intelligenceExampleMatch[1].trim() : '';

    if (!newsInsight || !intelligenceExample) {
      throw new Error('Failed to parse generated content');
    }

    const generationTime = Date.now() - startTime;

    // Build content object
    const content = {
      generated: new Date().toISOString(),
      expires: new Date(Date.now() + 3600000).toISOString(),
      content: {
        newsInsight,
        intelligenceExample,
      },
      metadata: {
        model: 'claude-opus-4-20250514',
        headlinesAnalyzed: bbcHeadlines.length + nytHeadlines.length,
        sources: {
          bbc: bbcHeadlines.length,
          nyt: nytHeadlines.length,
        },
        generationTimeMs: generationTime,
        promptFile: 'content-generation-prompt.md'
      },
      fallbackUsed: false
    };

    // Save to file
    const dataDir = join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = join(dataDir, 'dynamic-content.json');
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

    console.log('✅ GENERATION SUCCESSFUL');
    console.log('═══════════════════════════════════════');
    console.log(`⏱️  Generation time: ${generationTime}ms`);
    console.log(`📊 Headlines analyzed: ${content.metadata.headlinesAnalyzed}`);
    console.log(`💾 Saved to: ${filePath}`);
    console.log('═══════════════════════════════════════\n');

    console.log('📰 News Insight:');
    console.log(`   ${newsInsight}`);
    console.log(`\n🧠 Intelligence Example:`);
    console.log(`   ${intelligenceExample}`);
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ GENERATION FAILED');
    console.error('═══════════════════════════════════════');
    console.error(`Error: ${error.message}`);
    console.error(`Time: ${new Date().toISOString()}`);
    console.error('═══════════════════════════════════════\n');

    // Write fallback content
    const fallback = {
      generated: new Date().toISOString(),
      expires: new Date(Date.now() + 3600000).toISOString(),
      content: {
        newsInsight: "Notice how every CEO says they want innovation but hires for predictability? That's not contradiction. That's institutional self-preservation disguised as strategy.",
        intelligenceExample: "Unemployment hitting 5%, for example. We read that and our mind goes to: what industries are hardest hit, and what does that tell us about which skills are becoming obsolete?",
      },
      metadata: {
        error: error.message,
        errorTime: new Date().toISOString()
      },
      fallbackUsed: true
    };

    const dataDir = join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = join(dataDir, 'dynamic-content.json');
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
    console.log('⚠️  Fallback content saved - system will continue with safe defaults\n');
  }
}

// Run immediately
generateContent();
