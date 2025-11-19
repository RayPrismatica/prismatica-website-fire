import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { ServiceType, getApiKey } from '@/lib/apiKeyManager';

const parser = new Parser();

export async function GET() {
  try {
    // Use API key manager for content generation (loaded at request time)
    const apiKey = getApiKey(ServiceType.CONTENT_GENERATION);
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

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
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: `You are a senior consultant at Prismatica Labs with 25 years experience. Sharp. Witty. Sees patterns others miss.

Here are today's top headlines from BBC and New York Times:
- ${topHeadlines}

Your task: Generate THREE pieces of content that work together perfectly.

PIECE 1 - NEWS INSIGHT (for the manifesto page):
1. Pick the MOST globally significant story - something business leaders in London, New York, Singapore, and Berlin would all recognize and care about. Avoid purely local/regional stories.
2. Write 2-3 sentences (under 45 words) super casually, like chatting with a smart friend
3. CRITICAL: Start with a clear news reference that signals recency. Use phrases like: "UK just released...", "This week...", "Today's data shows...", "[Country/Company] announced...", "Just in...", "NYT reports..."
4. Make it OBVIOUS this is current news, not old analysis

PIECE 2 - INTELLIGENCE EXAMPLE (for the "What We Do" page):
Reference the SAME news story from Piece 1 and show what QUESTION immediately comes to mind.
Format: "[Brief reference to the news], for example. We read that and our mind goes to: [specific penetrating question]"
Under 40 words total.

PIECE 3 - REMINDER (for the Contact page):
Write a single sentence that reminds readers what they just saw on the other pages. Extract the KEY POINT from Piece 1 and the KEY QUESTION from Piece 2.
Format: "Remember how Focus showed [key point from Piece 1 in 3-5 words], and What We Do wondered [key question from Piece 2 in 4-6 words]?"
Example: "Remember how Focus showed Tesla's price cuts as margin testing, and What We Do wondered if that signals Q4 panic?"
Under 30 words total.

CRITICAL RULES FOR ALL THREE:
- NO DASHES. Not em-dashes, not hyphens between words. Use periods or commas instead.
- Super informal. Conversational. Like you're texting a CEO friend.
- Universal appeal. Reference things everyone knows (markets, tech, governments, companies).
- Unique thinking. Connect dots no one else connects.
- ALL THREE pieces must reference the SAME news story for perfect coherence

Format your response EXACTLY like this:
INSIGHT: [your piece 1 here]
QUESTION: [your piece 2 here]
REMINDER: [your piece 3 here]

Write ONLY those three pieces. No preamble. Start immediately.`
      }]
    });

    // Find the first text block in the response
    const textBlock = response.content.find(block => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text content in response');
    }
    const responseText = textBlock.text;

    // Parse the response
    const insightMatch = responseText.match(/INSIGHT:\s*([\s\S]+?)(?=\nQUESTION:)/);
    const questionMatch = responseText.match(/QUESTION:\s*([\s\S]+?)(?=\nREMINDER:)/);
    const reminderMatch = responseText.match(/REMINDER:\s*([\s\S]+)/);

    if (!insightMatch || !questionMatch || !reminderMatch) {
      throw new Error('Failed to parse Claude response');
    }

    const newsInsight = insightMatch[1].trim();
    const intelligenceExample = questionMatch[1].trim();
    const contentReminder = reminderMatch[1].trim();

    console.log(`Generated all three pieces from single analysis`);

    // 3. Save to cache (use /tmp for Vercel compatibility)
    const content = {
      generated: new Date().toISOString(),
      expires: new Date(Date.now() + 3600000).toISOString(), // 1 hour
      content: {
        newsInsight: newsInsight,
        patternInsight: "You're still reading. That already puts you ahead.",
        intelligenceExample: intelligenceExample,
        contentReminder: contentReminder
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
