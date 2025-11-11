import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const parser = new Parser();

export async function GET() {
  try {
    // 1. Fetch latest news from BBC and NYT RSS
    const bbcFeed = await parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml');
    const nytFeed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');

    // Get top 8 headlines from each for Claude to analyze
    const bbcHeadlines = bbcFeed.items.slice(0, 8).map(item => `[BBC] ${item.title}`);
    const nytHeadlines = nytFeed.items.slice(0, 8).map(item => `[NYT] ${item.title}`);

    const topHeadlines = [...bbcHeadlines, ...nytHeadlines].join('\n- ');

    console.log('Analyzing headlines for most newsworthy story...');

    // 2. Have Claude select the most newsworthy and generate BOTH pieces
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 350,
      messages: [{
        role: 'user',
        content: `You are a senior consultant at Prismatica Labs with 25 years experience. Sharp. Witty. Sees patterns others miss.

Here are today's top headlines from BBC and New York Times:
- ${topHeadlines}

Your task: Generate TWO pieces of content that work together perfectly.

PIECE 1 - NEWS INSIGHT (for the manifesto page):
1. Pick the MOST globally significant story - something business leaders in London, New York, Singapore, and Berlin would all recognize and care about. Avoid purely local/regional stories.
2. Write 2-3 sentences (under 45 words) super casually, like chatting with a smart friend
3. This appears as the OPENING PARAGRAPH right after the heading "FINALLY. THINKING AS A SERVICE. NO PERFORMANCE. JUST PERFORMANCE." - it's the very first body text readers see on the manifesto page.
4. The next paragraph after yours will be: "Are you optimizing the right variable?"
5. CRITICAL: Start with a clear news reference that signals recency. Use phrases like: "UK just released...", "This week...", "Today's data shows...", "[Country/Company] announced...", "Just in...", "NYT reports..."
6. Make it OBVIOUS this is current news, not old analysis
7. Choose stories with global business implications, not just regional politics

PIECE 2 - INTELLIGENCE EXAMPLE (for the "What We Do" page):
This will appear AFTER the sentence: "But if you're solving the wrong problem, execution excellence just gets you to the wrong destination faster."
So write ONLY the continuation that comes next.
Reference the SAME news story from Piece 1 and show what QUESTION immediately comes to mind.
Format: "[Brief reference to the news], for example. We read that and our mind goes to: [specific penetrating question]"
Under 40 words total.
DO NOT include the previous sentence in your response. Start directly with the news reference.

CRITICAL RULES FOR BOTH:
- NO DASHES. Not em-dashes, not hyphens between words. Use periods or commas instead.
- Super informal. Conversational. Like you're texting a CEO friend.
- Universal appeal. Reference things everyone knows (markets, tech, governments, companies).
- Unique thinking. Connect dots no one else connects.
- BOTH pieces must reference the SAME news story for perfect coherence

AVOID:
- Regional/local stories only UK readers would know
- Academic or philosophical language
- Obvious observations everyone already made

Examples of good PIECE 1:
"Tesla just slashed prices 20% and everyone's panicking about demand collapse. That's not desperation. That's margin testing at scale. Most companies spend millions on focus groups to learn what Elon learns by Tuesday."

"UK just released unemployment data showing 5% jobless rate. Everyone sees recession. We see something else. When job listings hit record highs the same week unemployment spikes, that's not economic decline. That's a matching crisis."

Examples of good PIECE 2:
"The Tesla price cuts, for example. We read that and our mind goes to: is this margin testing or demand panic, and what does the timing tell us about Q4 guidance?"

Format your response EXACTLY like this:
INSIGHT: [your piece 1 here]
QUESTION: [your piece 2 here]

Write ONLY those two pieces. No preamble. Start immediately.`
      }]
    });

    const responseText = response.content[0].text;

    // Parse the response
    const insightMatch = responseText.match(/INSIGHT:\s*(.+?)(?=\nQUESTION:)/s);
    const questionMatch = responseText.match(/QUESTION:\s*(.+)/s);

    if (!insightMatch || !questionMatch) {
      throw new Error('Failed to parse Claude response');
    }

    const newsInsight = insightMatch[1].trim();
    const intelligenceExample = questionMatch[1].trim();

    console.log(`Generated both pieces from single analysis`);

    // 3. Save to cache (use /tmp for Vercel compatibility)
    const content = {
      generated: new Date().toISOString(),
      expires: new Date(Date.now() + 3600000).toISOString(), // 1 hour
      content: {
        newsInsight: newsInsight,
        patternInsight: "You're still reading. That already puts you ahead.",
        intelligenceExample: intelligenceExample
      },
      fallbackUsed: false
    };

    // Use /tmp directory on Vercel, data directory locally
    const dataDir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');

    // Create directory if doesn't exist (only for local)
    if (!process.env.VERCEL && !fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, 'dynamic-content.json');
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

    console.log('✓ Content generated successfully at', new Date().toISOString());

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      newsInsight: content.content.newsInsight,
      intelligenceExample: content.content.intelligenceExample
    });

  } catch (error) {
    console.error('✗ Generation failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate content',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
