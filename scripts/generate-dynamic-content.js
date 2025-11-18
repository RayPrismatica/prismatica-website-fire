import Anthropic from '@anthropic-ai/sdk';
import Parser from 'rss-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { put } from '@vercel/blob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Load configuration
const configPath = join(__dirname, 'configs', 'generation-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const contentConfig = config.dynamicContent;

// Use separate API key for content generation (fallback to main key for backward compatibility)
const apiKey = process.env.ANTHROPIC_API_KEY_CONTENT || process.env.ANTHROPIC_API_KEY;
const anthropic = new Anthropic({
  apiKey: apiKey,
});

const parser = new Parser();

// Load the system prompt from markdown file
function loadPrompt() {
  const promptPath = join(__dirname, contentConfig.promptFile);
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
      model: contentConfig.model,
      max_tokens: contentConfig.maxTokens,
      temperature: contentConfig.temperature,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const responseText = response.content[0].text;

    // Parse the response (now 16 pieces)
    const insightMatch = responseText.match(/INSIGHT:\s*(.+?)(?=\nREMINDER:)/s);
    const reminderMatch = responseText.match(/REMINDER:\s*(.+?)(?=\nSERVICE:)/s);
    const serviceMatch = responseText.match(/SERVICE:\s*(.+?)(?=\nESI:)/s);
    const esiMatch = responseText.match(/ESI:\s*(.+?)(?=\nAGENCY:)/s);
    const agencyMatch = responseText.match(/AGENCY:\s*(.+?)(?=\nKSO:)/s);
    const ksoMatch = responseText.match(/KSO:\s*(.+?)(?=\nTRANSACTION:)/s);
    const transactionMatch = responseText.match(/TRANSACTION:\s*(.+?)(?=\nTRIPTYCH:)/s);
    const triptychMatch = responseText.match(/TRIPTYCH:\s*(.+?)(?=\nGTM:)/s);
    const gtmMatch = responseText.match(/GTM:\s*(.+?)(?=\nCREATIVE:)/s);
    const creativeMatch = responseText.match(/CREATIVE:\s*(.+?)(?=\nDESIGN:)/s);
    const designMatch = responseText.match(/DESIGN:\s*(.+?)(?=\nAI:)/s);
    const aiMatch = responseText.match(/AI:\s*(.+?)(?=\nPROCESS:)/s);
    const processMatch = responseText.match(/PROCESS:\s*(.+?)(?=\nMARKETING:)/s);
    const marketingMatch = responseText.match(/MARKETING:\s*(.+?)(?=\nFOCUS:)/s);
    const focusMatch = responseText.match(/FOCUS:\s*(.+?)(?=\nVALUE:)/s);
    const valueMatch = responseText.match(/VALUE:\s*(.+)/s);

    if (!insightMatch || !reminderMatch || !serviceMatch || !esiMatch || !agencyMatch || !ksoMatch || !transactionMatch || !triptychMatch || !gtmMatch || !creativeMatch || !designMatch || !aiMatch || !processMatch || !marketingMatch || !focusMatch || !valueMatch) {
      throw new Error('Failed to parse Claude response - missing required pieces');
    }

    const newsInsight = insightMatch[1].trim().replace(/```/g, '');
    const contentReminder = reminderMatch[1].trim().replace(/```/g, '');
    const serviceDescription = serviceMatch[1].trim().replace(/```/g, '');
    const esiDescription = esiMatch[1].trim().replace(/```/g, '');
    const agencyDescription = agencyMatch[1].trim().replace(/```/g, '');
    const ksoDescription = ksoMatch[1].trim().replace(/```/g, '');
    const transactionDescription = transactionMatch[1].trim().replace(/```/g, '');
    const triptychDescription = triptychMatch[1].trim().replace(/```/g, '');
    const gtmDescription = gtmMatch[1].trim().replace(/```/g, '');
    const creativeDescription = creativeMatch[1].trim().replace(/```/g, '');
    const designDescription = designMatch[1].trim().replace(/```/g, '');
    const aiDescription = aiMatch[1].trim().replace(/```/g, '');
    const processDescription = processMatch[1].trim().replace(/```/g, '');
    const marketingDescription = marketingMatch[1].trim().replace(/```/g, '');
    const focusDescription = focusMatch[1].trim().replace(/```/g, '');
    const valueDescription = valueMatch[1].trim().replace(/```/g, '');

    const generationTime = Date.now() - startTime;
    console.log(`\n✓ Claude generated all sixteen pieces in ${generationTime}ms`);

    // 3. Save to cache with metadata
    const content = {
      generated: new Date().toISOString(),
      expires: new Date(Date.now() + 86400000).toISOString(), // 24 hours
      content: {
        newsInsight: newsInsight,
        patternInsight: "You're still reading. That already puts you ahead.",
        consultingInsight: "Every firm guards their thinking like gold. Makes sense. Scarcity creates value.", // Static fallback
        contentReminder: contentReminder,
        marketObservation: "Most consultants optimize for retention. We optimize for resolution.", // Static fallback
        purposeContext: "Dissect your business from its root reason to exist.", // Static fallback
        serviceDescription: serviceDescription,
        esiDescription: esiDescription,
        agencyDescription: agencyDescription,
        ksoDescription: ksoDescription,
        transactionDescription: transactionDescription,
        triptychDescription: triptychDescription,
        gtmDescription: gtmDescription,
        creativeDescription: creativeDescription,
        designDescription: designDescription,
        aiDescription: aiDescription,
        processDescription: processDescription,
        marketingDescription: marketingDescription,
        focusDescription: focusDescription,
        valueDescription: valueDescription
      },
      metadata: {
        model: contentConfig.model,
        temperature: contentConfig.temperature,
        maxTokens: contentConfig.maxTokens,
        headlinesAnalyzed: globalNewsHeadlines.length + businessHeadlines.length + leadershipHeadlines.length + hbrHeadlines.length,
        sources: {
          bbc: bbcHeadlines.length,
          nyt: nytHeadlines.length,
          fastCompany: fastCompanyHeadlines.length,
          forbes: forbesHeadlines.length,
          marketingWeek: marketingWeekHeadlines.length,
          hbr: hbrHeadlines.length,
          wired: wiredHeadlines.length,
          inc: incHeadlines.length,
          atlantic: atlanticHeadlines.length
        },
        generationTimeMs: generationTime,
        promptFile: contentConfig.promptFile
      },
      fallbackUsed: false
    };

    // Upload JSON to Vercel Blob
    console.log('☁️  Uploading JSON to Vercel Blob...');
    const jsonBlob = await put('dynamic-content.json', JSON.stringify(content, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true, // Allow overwriting existing blob
      cacheControlMaxAge: 21600, // 6 hours
      contentType: 'application/json'
    });
    console.log(`✓ JSON uploaded: ${jsonBlob.url}`);

    // Generate markdown file for Athena's knowledge base
    const knowledgeDir = join(__dirname, '..', 'athena', 'knowledge', 'pages');
    if (!fs.existsSync(knowledgeDir)) {
      fs.mkdirSync(knowledgeDir, { recursive: true });
    }

    // Find the primary news story that was used (first headline from the selected source)
    const primaryNewsStory = [...globalNewsHeadlines, ...businessHeadlines, ...leadershipHeadlines][0];

    const markdownContent = `# Hey Athena - Current Dynamic Content Update

**Last Updated:** ${new Date(content.generated).toLocaleString()}
**Expires:** ${new Date(content.expires).toLocaleString()}
**Content Status:** ${content.fallbackUsed ? '⚠️ USING FALLBACK CONTENT (generation failed)' : '✅ FRESH CONTENT (AI-generated)'}

---

## What You Need To Know

This file tells you EXACTLY what content is currently live on the website. Users are seeing this content RIGHT NOW.

**16 pieces were AI-generated** based on current news (listed below).
**5 pieces are static** (same every time, listed with [STATIC] markers).

When users reference what they're reading, check this file. When they ask "where did that come from?", you can share the news source link below.

---

## Primary News Story (What Inspired The Content)

**Source:** ${primaryNewsStory.source}
**Headline:** ${primaryNewsStory.title}
**Link:** ${primaryNewsStory.link}

This is the main news story that informed today's content generation. PIECE 1 and PIECE 2 both reference this story.

---

## PIECE 1: Landing Page - News Insight (✨ AI-GENERATED)

**WHERE:** Homepage, first paragraph after main heading
**WHAT:** ${content.content.newsInsight}

---

## PIECE 2: Contact Page - Content Reminder (✨ AI-GENERATED)

**WHERE:** Contact page, reminds them of what they saw on landing page
**WHAT:** ${content.content.contentReminder}

---

## [STATIC] Landing Page - Pattern Insight

**WHERE:** Landing page, second paragraph
**WHAT:** ${content.content.patternInsight}
**NOTE:** This is the same every time. Not generated.

---

## [STATIC] Consulting Insight

**WHERE:** Not currently displayed on site
**WHAT:** ${content.content.consultingInsight}
**NOTE:** Legacy field, not in use.

---

## [STATIC] Market Observation

**WHERE:** Not currently displayed on site
**WHAT:** ${content.content.marketObservation}
**NOTE:** Legacy field, not in use.

---

## [STATIC] Purpose Context

**WHERE:** Not currently displayed on site
**WHAT:** ${content.content.purposeContext}
**NOTE:** Legacy field, not in use.

---

## Solutions Page - Service Descriptions (All ✨ AI-GENERATED)

### PIECE 3: Pioneers of Purpose
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.serviceDescription}

### PIECE 4: ESI Framework (Explore, Synthesise, Ignite)
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.esiDescription}

### PIECE 5: Secret Agency
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.agencyDescription}

### PIECE 6: KSO Workshop (Knowledge Search Optimization)
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.ksoDescription}

### PIECE 7: Transaction Architecture
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.transactionDescription}

### PIECE 8: Strategic Triptych Assessment
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.triptychDescription}

### PIECE 9: Go-to-Market
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.gtmDescription}

### PIECE 10: Creative That Converts
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.creativeDescription}

### PIECE 11: Design Thinking
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.designDescription}

### PIECE 12: AI Without the Hallucination
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.aiDescription}

### PIECE 13: Process Surgery
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.processDescription}

### PIECE 14: Marketing Reality Check
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.marketingDescription}

### PIECE 15: Focus Matrix
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.focusDescription}

### PIECE 16: Value Channel Matrix
**WHERE:** Solutions page, full service description
**WHAT:** ${content.content.valueDescription}

---

## Generation Metadata (For Your Reference)

- **Headlines Analyzed:** ${content.metadata.headlinesAnalyzed}
- **News Sources:** BBC (${content.metadata.sources.bbc} headlines), NYT (${content.metadata.sources.nyt}), Fast Company (${content.metadata.sources.fastCompany}), Forbes (${content.metadata.sources.forbes}), Marketing Week (${content.metadata.sources.marketingWeek}), HBR (${content.metadata.sources.hbr}), Wired (${content.metadata.sources.wired}), Inc (${content.metadata.sources.inc}), The Atlantic (${content.metadata.sources.atlantic})
- **AI Model Used:** ${content.metadata.model}
- **Generation Time:** ${content.metadata.generationTimeMs}ms
- **Temperature:** ${content.metadata.temperature}
- **Prompt File:** ${content.metadata.promptFile}

---

## Important Notes For You, Athena

1. **This content updates every 6 hours** (0:00, 6:00, 12:00, 18:00 UTC)
2. **Users are seeing these exact words** on the website right now
3. **PIECE 1 and PIECE 2** both reference the same news story (for coherence)
4. **PIECES 3-16** each use different business/leadership/marketing headlines to make services feel current and inevitable
5. **When users ask about the news**, share the source link above
6. **If fallback is active** (see status at top), the AI generation failed and static content is being used
7. **Reference this naturally** - don't say "according to my knowledge file", just know what users saw
8. **Cross-page continuity**: The contact page reminder (PIECE 2) explicitly references the landing page insight (PIECE 1)

---

**Status:** ${content.fallbackUsed ? '⚠️ Using fallback content - generation script failed' : '✅ Content is fresh and current'}
`;

    // Write markdown locally for development
    const mdFilePath = join(knowledgeDir, 'dynamic-content.md');
    fs.writeFileSync(mdFilePath, markdownContent);
    console.log('✓ Markdown written locally: athena/knowledge/pages/dynamic-content.md');

    // Upload markdown to Vercel Blob for production
    console.log('☁️  Uploading Markdown to Vercel Blob...');
    const mdBlob = await put('athena-dynamic-content.md', markdownContent, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 21600, // 6 hours
      contentType: 'text/markdown'
    });
    console.log(`✓ Markdown uploaded: ${mdBlob.url}`);

    console.log('\n✅ CONTENT GENERATED SUCCESSFULLY');
    console.log('═══════════════════════════════════════');
    console.log(`📅 Generated: ${new Date().toISOString()}`);
    console.log(`⏱️  Generation time: ${generationTime}ms`);
    console.log(`📊 Headlines analyzed: ${globalNewsHeadlines.length + businessHeadlines.length + leadershipHeadlines.length + hbrHeadlines.length} (BBC: ${bbcHeadlines.length}, NYT: ${nytHeadlines.length}, Fast Company: ${fastCompanyHeadlines.length}, Forbes: ${forbesHeadlines.length}, Marketing Week: ${marketingWeekHeadlines.length}, HBR: ${hbrHeadlines.length}, Wired: ${wiredHeadlines.length}, Inc: ${incHeadlines.length}, Atlantic: ${atlanticHeadlines.length})`);
    console.log(`\n📰 PIECE 1 - News Insight (Landing):`);
    console.log(`   ${newsInsight}`);
    console.log(`\n🔔 PIECE 2 - Content Reminder (Contact):`);
    console.log(`   ${contentReminder}`);
    console.log(`\n💼 PIECE 3 - Pioneers of Purpose:`);
    console.log(`   ${serviceDescription.substring(0, 100)}...`);
    console.log(`\n🔄 PIECE 4 - ESI Framework:`);
    console.log(`   ${esiDescription.substring(0, 100)}...`);
    console.log(`\n🔐 PIECE 5 - Secret Agency:`);
    console.log(`   ${agencyDescription.substring(0, 100)}...`);
    console.log(`\n🔍 PIECE 6 - KSO Workshop:`);
    console.log(`   ${ksoDescription.substring(0, 100)}...`);
    console.log(`\n🏗️  PIECE 7 - Transaction Architecture:`);
    console.log(`   ${transactionDescription.substring(0, 100)}...`);
    console.log(`\n🔬 PIECE 8 - Strategic Triptych:`);
    console.log(`   ${triptychDescription.substring(0, 100)}...`);
    console.log(`\n🚀 PIECE 9 - Go-to-Market:`);
    console.log(`   ${gtmDescription.substring(0, 100)}...`);
    console.log(`\n🎨 PIECE 10 - Creative That Converts:`);
    console.log(`   ${creativeDescription.substring(0, 100)}...`);
    console.log(`\n⚡ PIECE 11 - Design Thinking:`);
    console.log(`   ${designDescription.substring(0, 100)}...`);
    console.log(`\n🤖 PIECE 12 - AI Without the Hallucination:`);
    console.log(`   ${aiDescription.substring(0, 100)}...`);
    console.log(`\n⚙️  PIECE 13 - Process Surgery:`);
    console.log(`   ${processDescription.substring(0, 100)}...`);
    console.log(`\n📊 PIECE 14 - Marketing Reality Check:`);
    console.log(`   ${marketingDescription.substring(0, 100)}...`);
    console.log(`\n🎯 PIECE 15 - Focus Matrix:`);
    console.log(`   ${focusDescription.substring(0, 100)}...`);
    console.log(`\n💎 PIECE 16 - Value Channel Matrix:`);
    console.log(`   ${valueDescription.substring(0, 100)}...`);
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
        ksoDescription: "The future of discoverability isn't about links. It's about ideas. In a world where AI systems index knowledge instead of URLs, authority belongs to those who own the narrative. We dissect your business DNA and rebuild it as a knowledge graph of authority.",
        transactionDescription: "Vision to transaction to validation. Map how value exchanges actually happen across three dimensions: spiritual (emotional resonance), cognitive (understanding shifts), and tangible (measurable actions). Then design every touchpoint to trigger those transactions. Conversion through understanding, not manipulation.",
        triptychDescription: "We examine your business through three lenses simultaneously: how you market, how you compete, how you build. Most problems live in the gaps between these. Most opportunities too."
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
