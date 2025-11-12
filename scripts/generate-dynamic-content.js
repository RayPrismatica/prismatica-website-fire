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
  let bbcFeed, nytFeed, fastCompanyFeed, forbesFeed, marketingWeekFeed, hbrFeed, wiredFeed, incFeed, atlanticFeed;

  try {
    // 1. Fetch latest news from RSS feeds (global + business/marketing + leadership/performance)
    console.log('📰 Fetching all RSS feeds...');

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
      fastCompanyFeed = await parser.parseURL('https://www.fastcompany.com/latest/rss');
      console.log(`✓ Fast Company: ${fastCompanyFeed.items.length} articles fetched`);
    } catch (error) {
      console.error('✗ Fast Company feed failed:', error.message);
      fastCompanyFeed = { items: [] };
    }

    try {
      forbesFeed = await parser.parseURL('https://www.forbes.com/business/feed/');
      console.log(`✓ Forbes Business: ${forbesFeed.items.length} articles fetched`);
    } catch (error) {
      console.error('✗ Forbes feed failed:', error.message);
      forbesFeed = { items: [] };
    }

    try {
      marketingWeekFeed = await parser.parseURL('https://www.marketingweek.com/feed/');
      console.log(`✓ Marketing Week: ${marketingWeekFeed.items.length} articles fetched`);
    } catch (error) {
      console.error('✗ Marketing Week feed failed:', error.message);
      marketingWeekFeed = { items: [] };
    }

    try {
      hbrFeed = await parser.parseURL('https://feeds.hbr.org/harvardbusiness');
      console.log(`✓ HBR: ${hbrFeed.items.length} articles fetched`);
    } catch (error) {
      console.error('✗ HBR feed failed:', error.message);
      hbrFeed = { items: [] };
    }

    try {
      wiredFeed = await parser.parseURL('https://www.wired.com/feed/rss');
      console.log(`✓ Wired: ${wiredFeed.items.length} articles fetched`);
    } catch (error) {
      console.error('✗ Wired feed failed:', error.message);
      wiredFeed = { items: [] };
    }

    try {
      incFeed = await parser.parseURL('https://www.inc.com/rss/');
      console.log(`✓ Inc: ${incFeed.items.length} articles fetched`);
    } catch (error) {
      console.error('✗ Inc feed failed:', error.message);
      incFeed = { items: [] };
    }

    try {
      atlanticFeed = await parser.parseURL('https://www.theatlantic.com/feed/all/');
      console.log(`✓ The Atlantic: ${atlanticFeed.items.length} articles fetched`);
    } catch (error) {
      console.error('✗ The Atlantic feed failed:', error.message);
      atlanticFeed = { items: [] };
    }

    // Check if we have any headlines
    if (bbcFeed.items.length === 0 && nytFeed.items.length === 0 && fastCompanyFeed.items.length === 0 && forbesFeed.items.length === 0 && marketingWeekFeed.items.length === 0 && hbrFeed.items.length === 0) {
      throw new Error('All RSS feeds failed - no headlines available');
    }

    // Get top headlines from each for Claude to analyze
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

    const fastCompanyHeadlines = fastCompanyFeed.items.slice(0, 8).map((item, idx) => ({
      source: 'Fast Company',
      title: item.title,
      link: item.link,
      display: `[Fast Company] ${item.title}`
    }));

    const forbesHeadlines = forbesFeed.items.slice(0, 8).map((item, idx) => ({
      source: 'Forbes',
      title: item.title,
      link: item.link,
      display: `[Forbes] ${item.title}`
    }));

    const marketingWeekHeadlines = marketingWeekFeed.items.slice(0, 6).map((item, idx) => ({
      source: 'Marketing Week',
      title: item.title,
      link: item.link,
      display: `[Marketing Week] ${item.title}`
    }));

    const hbrHeadlines = hbrFeed.items.slice(0, 6).map((item, idx) => ({
      source: 'HBR',
      title: item.title,
      link: item.link,
      display: `[HBR] ${item.title}`
    }));

    const wiredHeadlines = wiredFeed.items.slice(0, 6).map((item, idx) => ({
      source: 'Wired',
      title: item.title,
      link: item.link,
      display: `[Wired] ${item.title}`
    }));

    const incHeadlines = incFeed.items.slice(0, 6).map((item, idx) => ({
      source: 'Inc',
      title: item.title,
      link: item.link,
      display: `[Inc] ${item.title}`
    }));

    const atlanticHeadlines = atlanticFeed.items.slice(0, 6).map((item, idx) => ({
      source: 'The Atlantic',
      title: item.title,
      link: item.link,
      display: `[The Atlantic] ${item.title}`
    }));

    const globalNewsHeadlines = [...bbcHeadlines, ...nytHeadlines];
    const businessHeadlines = [...fastCompanyHeadlines, ...forbesHeadlines, ...marketingWeekHeadlines];
    const leadershipHeadlines = [...wiredHeadlines, ...incHeadlines, ...atlanticHeadlines];

    const topGlobalNewsHeadlines = globalNewsHeadlines.map(h => h.display).join('\n- ');
    const topBusinessHeadlines = businessHeadlines.map(h => h.display).join('\n- ');
    const topLeadershipHeadlines = leadershipHeadlines.map(h => h.display).join('\n- ');
    const topHBRHeadlines = hbrHeadlines.map(h => h.display).join('\n- ');

    console.log(`\n🤖 Sending ${globalNewsHeadlines.length} global news + ${businessHeadlines.length} business + ${leadershipHeadlines.length} leadership + ${hbrHeadlines.length} HBR headlines to Claude Opus 4.1...`);

    // 2. Load prompt template and inject headlines
    const promptTemplate = loadPrompt();
    const prompt = promptTemplate
      .replace('{{GLOBAL_NEWS_HEADLINES}}', `\n- ${topGlobalNewsHeadlines}`)
      .replace('{{BUSINESS_HEADLINES}}', `\n- ${topBusinessHeadlines}`)
      .replace('{{LEADERSHIP_HEADLINES}}', `\n- ${topLeadershipHeadlines}`)
      .replace('{{HBR_HEADLINES}}', `\n- ${topHBRHeadlines}`);

    // 3. Have Claude select the most newsworthy and generate ALL TWELVE pieces
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 2200,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const responseText = response.content[0].text;

    // Parse the response
    const insightMatch = responseText.match(/INSIGHT:\s*(.+?)(?=\nQUESTION:)/s);
    const questionMatch = responseText.match(/QUESTION:\s*(.+?)(?=\nCONSULTING:)/s);
    const consultingMatch = responseText.match(/CONSULTING:\s*(.+?)(?=\nREMINDER:)/s);
    const reminderMatch = responseText.match(/REMINDER:\s*(.+?)(?=\nOBSERVATION:)/s);
    const observationMatch = responseText.match(/OBSERVATION:\s*(.+?)(?=\nPURPOSE:)/s);
    const purposeMatch = responseText.match(/PURPOSE:\s*(.+?)(?=\nSERVICE:)/s);
    const serviceMatch = responseText.match(/SERVICE:\s*(.+?)(?=\nESI:)/s);
    const esiMatch = responseText.match(/ESI:\s*(.+?)(?=\nAGENCY:)/s);
    const agencyMatch = responseText.match(/AGENCY:\s*(.+?)(?=\nKSO:)/s);
    const ksoMatch = responseText.match(/KSO:\s*(.+?)(?=\nTRANSACTION:)/s);
    const transactionMatch = responseText.match(/TRANSACTION:\s*(.+?)(?=\nTRIPTYCH:)/s);
    const triptychMatch = responseText.match(/TRIPTYCH:\s*(.+)/s);

    if (!insightMatch || !questionMatch || !consultingMatch || !reminderMatch || !observationMatch || !purposeMatch || !serviceMatch || !esiMatch || !agencyMatch || !ksoMatch || !transactionMatch || !triptychMatch) {
      throw new Error('Failed to parse Claude response');
    }

    const newsInsight = insightMatch[1].trim().replace(/```/g, '');
    const intelligenceExample = questionMatch[1].trim().replace(/```/g, '');
    const consultingInsight = consultingMatch[1].trim().replace(/```/g, '');
    const contentReminder = reminderMatch[1].trim().replace(/```/g, '');
    const marketObservation = observationMatch[1].trim().replace(/```/g, '');
    const purposeContext = purposeMatch[1].trim().replace(/```/g, '');
    const serviceDescription = serviceMatch[1].trim().replace(/```/g, '');
    const esiDescription = esiMatch[1].trim().replace(/```/g, '');
    const agencyDescription = agencyMatch[1].trim().replace(/```/g, '');
    const ksoDescription = ksoMatch[1].trim().replace(/```/g, '');
    const transactionDescription = transactionMatch[1].trim().replace(/```/g, '');
    const triptychDescription = triptychMatch[1].trim().replace(/```/g, '');

    const generationTime = Date.now() - startTime;
    console.log(`\n✓ Claude generated all twelve pieces in ${generationTime}ms`);

    // 3. Save to cache with metadata
    const content = {
      generated: new Date().toISOString(),
      expires: new Date(Date.now() + 3600000).toISOString(), // 1 hour
      content: {
        newsInsight: newsInsight,
        patternInsight: "You're still reading. That already puts you ahead.",
        intelligenceExample: intelligenceExample,
        consultingInsight: consultingInsight,
        contentReminder: contentReminder,
        marketObservation: marketObservation,
        purposeContext: purposeContext,
        serviceDescription: serviceDescription,
        esiDescription: esiDescription,
        agencyDescription: agencyDescription,
        ksoDescription: ksoDescription,
        transactionDescription: transactionDescription,
        triptychDescription: triptychDescription
      },
      metadata: {
        model: 'claude-opus-4-20250514',
        headlinesAnalyzed: globalNewsHeadlines.length + businessHeadlines.length + hbrHeadlines.length,
        sources: {
          bbc: bbcHeadlines.length,
          nyt: nytHeadlines.length,
          fastCompany: fastCompanyHeadlines.length,
          forbes: forbesHeadlines.length,
          marketingWeek: marketingWeekHeadlines.length,
          hbr: hbrHeadlines.length
        },
        generationTimeMs: generationTime,
        promptFile: 'content-generation-prompt.md'
      },
      fallbackUsed: false
    };

    // Create directory if doesn't exist
    const dataDir = join(__dirname, '..', 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = join(dataDir, 'dynamic-content.json');
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

    console.log('\n✅ CONTENT GENERATED SUCCESSFULLY');
    console.log('═══════════════════════════════════════');
    console.log(`📅 Generated: ${new Date().toISOString()}`);
    console.log(`⏱️  Generation time: ${generationTime}ms`);
    console.log(`📊 Headlines analyzed: ${globalNewsHeadlines.length + businessHeadlines.length + hbrHeadlines.length} (BBC: ${bbcHeadlines.length}, NYT: ${nytHeadlines.length}, Fast Company: ${fastCompanyHeadlines.length}, Forbes: ${forbesHeadlines.length}, Marketing Week: ${marketingWeekHeadlines.length}, HBR: ${hbrHeadlines.length})`);
    console.log(`\n📰 News Insight:`);
    console.log(`   ${newsInsight}`);
    console.log(`\n🧠 Intelligence Example:`);
    console.log(`   ${intelligenceExample}`);
    console.log(`\n💼 Consulting Insight:`);
    console.log(`   ${consultingInsight}`);
    console.log(`\n🔔 Content Reminder:`);
    console.log(`   ${contentReminder}`);
    console.log(`\n📊 Market Observation:`);
    console.log(`   ${marketObservation}`);
    console.log(`\n🎯 Purpose Context:`);
    console.log(`   ${purposeContext}`);
    console.log(`\n📝 Service Description:`);
    console.log(`   ${serviceDescription}`);
    console.log(`\n⚙️  ESI Framework Description:`);
    console.log(`   ${esiDescription}`);
    console.log(`\n🔐 Secret Agency Description:`);
    console.log(`   ${agencyDescription}`);
    console.log(`\n🔍 KSO Workshop Description:`);
    console.log(`   ${ksoDescription}`);
    console.log(`\n🏗️  Transaction Architecture Description:`);
    console.log(`   ${transactionDescription}`);
    console.log(`\n🔬 Strategic Triptych Description:`);
    console.log(`   ${triptychDescription}`);
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
        consultingInsight: "We were just reading about how the big consulting firms built something remarkable. World class thinking, rigorous frameworks, proven methodologies. But what if that caliber of strategic insight wasn't locked behind day rates? What if the mental models that transform Fortune 500 companies could be infrastructure instead of scarcity?",
        contentReminder: "Remember how the landing page showed CEOs hiring for predictability, and the What We Do page wondered which skills are becoming obsolete?",
        marketObservation: "Right now we're watching companies panic about efficiency while missing the real pattern: their best people are solving the wrong problems brilliantly.",
        purposeContext: "The companies surviving best are the ones whose teams already knew the answer to 'why do we exist beyond making money?'",
        serviceDescription: "Dissect your business from its root reason to exist. Then cascade that purpose through every system and touchpoint. Inside-out authenticity that strengthens both internal culture and external message. Purpose as operating system, not marketing tagline.",
        esiDescription: "Explore, Synthesize, Ignite. Our operating system for transformation. Explore uncovers truth. Synthesize turns discovery into clarity. Ignite makes clarity executable. Research, strategy, and execution as a continuous loop.",
        agencyDescription: "For high-performers who realize their 70-hour weeks produce 40 hours of value. Secret Agency: where executives learn to optimize for impact, not inbox zero. Because busy and effective stopped being the same thing years ago.",
        ksoDescription: "The future of discoverability isn't about links. It's about ideas. In a world where AI systems index knowledge instead of URLs, authority belongs to those who own the narrative. We dissect your business DNA and rebuild it as a knowledge graph of authority."
      },
      metadata: {
        error: error.message,
        errorTime: new Date().toISOString()
      },
      fallbackUsed: true
    };

    const dataDir = join(__dirname, '..', 'public', 'data');
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
