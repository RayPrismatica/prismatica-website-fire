import Anthropic from '@anthropic-ai/sdk';
import Parser from 'rss-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const parser = new Parser();

// Load the system prompt from markdown file
function loadPrompt() {
  const promptPath = join(__dirname, 'content-generation-prompt.md');
  return fs.readFileSync(promptPath, 'utf8');
}

async function generateContent() {
  const startTime = Date.now();
  let bbcFeed, nytFeed, hbrFeed;

  try {
    // 1. Fetch latest news from BBC, NYT, and HBR RSS
    console.log('📰 Fetching RSS feeds...');

    try {
      bbcFeed = await parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml');
      console.log(`✓ BBC: ${bbcFeed.items.length} articles fetched`);
    } catch (error) {
      console.error('✗ BBC feed failed:', error.message);
      bbcFeed = { items: [] };
    }

    try {
      nytFeed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
      console.log(`✓ NYT: ${nytFeed.items.length} articles fetched`);
    } catch (error) {
      console.error('✗ NYT feed failed:', error.message);
      nytFeed = { items: [] };
    }

    try {
      hbrFeed = await parser.parseURL('https://feeds.hbr.org/harvardbusiness');
      console.log(`✓ HBR: ${hbrFeed.items.length} articles fetched`);
    } catch (error) {
      console.error('✗ HBR feed failed:', error.message);
      hbrFeed = { items: [] };
    }

    // Check if we have any headlines
    if (bbcFeed.items.length === 0 && nytFeed.items.length === 0 && hbrFeed.items.length === 0) {
      throw new Error('All RSS feeds failed - no headlines available');
    }

    // Get top 8 headlines from each for Claude to analyze
    const bbcHeadlines = bbcFeed.items.slice(0, 8).map((item, idx) => ({
      source: 'BBC',
      title: item.title,
      link: item.link,
      display: `[BBC] ${item.title}`
    }));

    const nytHeadlines = nytFeed.items.slice(0, 8).map((item, idx) => ({
      source: 'NYT',
      title: item.title,
      link: item.link,
      display: `[NYT] ${item.title}`
    }));

    const hbrHeadlines = hbrFeed.items.slice(0, 6).map((item, idx) => ({
      source: 'HBR',
      title: item.title,
      link: item.link,
      display: `[HBR] ${item.title}`
    }));

    const newsHeadlines = [...bbcHeadlines, ...nytHeadlines];
    const topNewsHeadlines = newsHeadlines.map(h => h.display).join('\n- ');
    const topHBRHeadlines = hbrHeadlines.map(h => h.display).join('\n- ');

    console.log(`\n🤖 Sending ${newsHeadlines.length} news + ${hbrHeadlines.length} HBR headlines to Claude Opus 4.1...`);

    // 2. Load prompt template and inject headlines
    const promptTemplate = loadPrompt();
    const prompt = promptTemplate
      .replace('{{NEWS_HEADLINES}}', `\n- ${topNewsHeadlines}`)
      .replace('{{HBR_HEADLINES}}', `\n- ${topHBRHeadlines}`);

    // 3. Have Claude select the most newsworthy and generate ALL THREE pieces
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const responseText = response.content[0].text;

    // Parse the response
    const insightMatch = responseText.match(/INSIGHT:\s*(.+?)(?=\nQUESTION:)/s);
    const questionMatch = responseText.match(/QUESTION:\s*(.+?)(?=\nCONSULTING:)/s);
    const consultingMatch = responseText.match(/CONSULTING:\s*(.+)/s);

    if (!insightMatch || !questionMatch || !consultingMatch) {
      throw new Error('Failed to parse Claude response');
    }

    const newsInsight = insightMatch[1].trim().replace(/```/g, '');
    const intelligenceExample = questionMatch[1].trim().replace(/```/g, '');
    const consultingInsight = consultingMatch[1].trim().replace(/```/g, '');

    const generationTime = Date.now() - startTime;
    console.log(`\n✓ Claude generated all three pieces in ${generationTime}ms`);

    // 3. Save to cache with metadata
    const content = {
      generated: new Date().toISOString(),
      expires: new Date(Date.now() + 3600000).toISOString(), // 1 hour
      content: {
        newsInsight: newsInsight,
        patternInsight: "You're still reading. That already puts you ahead.",
        intelligenceExample: intelligenceExample,
        consultingInsight: consultingInsight
      },
      metadata: {
        model: 'claude-opus-4-20250514',
        headlinesAnalyzed: newsHeadlines.length + hbrHeadlines.length,
        sources: {
          bbc: bbcHeadlines.length,
          nyt: nytHeadlines.length,
          hbr: hbrHeadlines.length
        },
        generationTimeMs: generationTime,
        promptFile: 'content-generation-prompt.md'
      },
      fallbackUsed: false
    };

    // Create directory if doesn't exist
    const dataDir = join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = join(dataDir, 'dynamic-content.json');
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

    console.log('\n✅ CONTENT GENERATED SUCCESSFULLY');
    console.log('═══════════════════════════════════════');
    console.log(`📅 Generated: ${new Date().toISOString()}`);
    console.log(`⏱️  Generation time: ${generationTime}ms`);
    console.log(`📊 Headlines analyzed: ${newsHeadlines.length + hbrHeadlines.length} (BBC: ${bbcHeadlines.length}, NYT: ${nytHeadlines.length}, HBR: ${hbrHeadlines.length})`);
    console.log(`\n📰 News Insight:`);
    console.log(`   ${newsInsight}`);
    console.log(`\n🧠 Intelligence Example:`);
    console.log(`   ${intelligenceExample}`);
    console.log(`\n💼 Consulting Insight:`);
    console.log(`   ${consultingInsight}`);
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
        patternInsight: "You're still reading. That already puts you ahead.",
        intelligenceExample: "Unemployment hitting 5%, for example. We read that and our mind goes to: what industries are hardest hit, and what does that tell us about which skills are becoming obsolete?",
        consultingInsight: "The big firms built something remarkable. World class thinking, rigorous frameworks, proven methodologies. But here's what we imagine: what if that caliber of strategic thinking wasn't locked behind day rates? What if the mental models that transform Fortune 500 companies could be infrastructure instead of scarcity?"
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
