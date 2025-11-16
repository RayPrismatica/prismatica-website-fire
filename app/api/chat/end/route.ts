import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

// Analysis prompt for Athena to summarize conversations
function getAnalysisPrompt(): string {
  return fs.readFileSync(
    path.join(process.cwd(), 'athena', 'prompts', 'conversation-analysis.md'),
    'utf8'
  );
}

export async function POST(request: NextRequest) {
  try {
    const { conversationId } = await request.json();

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId is required' },
        { status: 400 }
      );
    }

    // Find the conversation file
    const today = new Date().toISOString().split('T')[0];
    const conversationsDir = path.join(
      process.cwd(),
      'athena',
      'intel',
      'layer1',
      'raw-conversations',
      today
    );

    const transcriptFile = path.join(conversationsDir, `${conversationId}.json`);

    if (!fs.existsSync(transcriptFile)) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Read the conversation
    const conversationData = JSON.parse(fs.readFileSync(transcriptFile, 'utf8'));

    // Skip analysis if conversation is too short (less than 3 exchanges)
    if (conversationData.message_count < 6) {
      console.log(`⏭️  Skipping analysis for ${conversationId} (too short)`);
      return NextResponse.json({
        status: 'skipped',
        reason: 'Conversation too short for meaningful analysis'
      });
    }

    // Use API key
    const apiKey = process.env.ANTHROPIC_API_KEY_CHAT || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    // Ask Athena to analyze the conversation
    const analysisResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2000,
      temperature: 0.3, // Lower temperature for more consistent analysis
      system: getAnalysisPrompt(),
      messages: [
        {
          role: 'user',
          content: `Analyze this conversation and create a summary following the template provided.

**Conversation ID:** ${conversationId}
**Page:** ${conversationData.pathname}
**Message Count:** ${conversationData.message_count}
**Timestamp:** ${conversationData.timestamp}

**Full Conversation:**
${JSON.stringify(conversationData.messages, null, 2)}`
        }
      ]
    });

    // Extract the summary text
    const textBlock = analysisResponse.content.find(
      (block): block is Anthropic.TextBlock => block.type === 'text'
    );

    const summary = textBlock?.text || 'Failed to generate summary';

    // Save the summary
    const summariesDir = path.join(
      process.cwd(),
      'athena',
      'intel',
      'layer1',
      'summaries',
      today
    );

    if (!fs.existsSync(summariesDir)) {
      fs.mkdirSync(summariesDir, { recursive: true });
    }

    const summaryFile = path.join(summariesDir, `${conversationId}.md`);
    fs.writeFileSync(summaryFile, summary);

    console.log(`📝 Analysis complete: ${conversationId}`);

    return NextResponse.json({
      status: 'analyzed',
      conversationId,
      summaryPath: `athena/intel/layer1/summaries/${today}/${conversationId}.md`
    });

  } catch (error) {
    console.error('Error analyzing conversation:', error);
    return NextResponse.json(
      { error: 'Failed to analyze conversation' },
      { status: 500 }
    );
  }
}
